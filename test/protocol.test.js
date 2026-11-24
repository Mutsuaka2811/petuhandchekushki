'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const { io: connect } = require('socket.io-client');

const PORT = 39000 + Math.floor(Math.random() * 1000);
const BASE = `http://127.0.0.1:${PORT}`;
let child;
const clients = [];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function once(socket, ev, ms = 3000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.off(ev, fn);
      reject(new Error(`таймаут ожидания события «${ev}»`));
    }, ms);
    const fn = (data) => { clearTimeout(timer); resolve(data); };
    socket.once(ev, fn);
  });
}

function waitFor(socket, ev, predicate, ms = 3000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.off(ev, fn);
      reject(new Error(`таймаут ожидания события «${ev}»`));
    }, ms);
    const fn = (data) => {
      if (!predicate(data)) return;
      clearTimeout(timer);
      socket.off(ev, fn);
      resolve(data);
    };
    socket.on(ev, fn);
  });
}

async function waitHealth() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return;
    } catch (_) { /* сервер ещё поднимается */ }
    await wait(100);
  }
  throw new Error('сервер не поднялся');
}

async function newClient(uid, nick) {
  const socket = connect(BASE, {
    transports: ['websocket'],
    reconnection: false,
    forceNew: true,
  });
  clients.push(socket);
  await once(socket, 'connect');
  socket.emit('join', { n: nick, s: 1, a: 0, fm: 0, u: uid });
  await wait(60);
  return socket;
}

before(async () => {
  child = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      PORT: String(PORT),
      HOST: '127.0.0.1',
      TRIP_WAIT: '1',
      RITUAL_WAIT: '1',
    },
    stdio: 'ignore',
  });
  await waitHealth();
});

after(() => {
  for (const c of clients) c.close();
  if (child) child.kill();
});

test('HTTP отдаёт клиент, socket.io и health-check', async () => {
  const page = await fetch(`${BASE}/`);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /<!DOCTYPE html>/);
  assert.match(html, /<script src="\/socket\.io\/socket\.io\.js"><\/script>/);
  assert.equal((html.match(/<html lang="ru">/g) || []).length, 1);
  assert.equal((html.match(/data:[a-z]+\/[\w+-]+;base64,/g) || []).length, 0, 'медиа должно быть вынесено из HTML');
  assert.match(html, /href="\/css\/game\.css"/);
  assert.match(html, /src="\/js\/game\.js"/);
  assert.doesNotMatch(html, /freezeNote|Важное объявление автора/);
  assert.equal((html.match(/data-tab="/g) || []).length, 5, 'должны быть 5 вкладок настроек');
  assert.equal((html.match(/data-preset="/g) || []).length, 3, 'должны быть 3 пресета графики');
  for (const id of ['vignetteSwitch', 'bloomSwitch', 'grainSwitch', 'particlesSwitch', 'shakeSwitch', 'uiAnimSwitch']) {
    assert.ok(html.includes('id="' + id + '"'), 'должен быть переключатель ' + id);
  }

  const clientJs = await fetch(`${BASE}/socket.io/socket.io.js`);
  assert.equal(clientJs.status, 200);
  assert.match(await clientJs.text(), /socket\.io/);

  const gameJs = await fetch(`${BASE}/js/game.js`);
  assert.equal(gameJs.status, 200);
  assert.match(gameJs.headers.get('content-type'), /javascript/);
  assert.doesNotMatch(await gameJs.text(), /data:image\/webp;base64,/);

  const css = await fetch(`${BASE}/css/game.css`);
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);
  assert.match(await css.text(), /url\("\/assets\/img\/coin\.webp"\)/);

  const img = await fetch(`${BASE}/assets/img/wool.webp`);
  assert.equal(img.status, 200);
  assert.match(img.headers.get('content-type'), /image\/webp/);

  const audio = await fetch(`${BASE}/assets/audio/bCall.m4a`, { headers: { range: 'bytes=0-99' } });
  assert.equal(audio.status, 206);
  assert.match(audio.headers.get('content-range'), /^bytes 0-99\//);
  assert.equal((await audio.arrayBuffer()).byteLength, 100);

  const traversal = await fetch(`${BASE}/../server.js`);
  assert.equal(traversal.status, 404);

  const health = await (await fetch(`${BASE}/health`)).json();
  assert.equal(health.ok, true);
});

test('лобби: создание, вход по коду, чат и синхронизация игроков', async () => {
  const a = await newClient('u-a', 'Альфа');
  const b = await newClient('u-b', 'Бета');

  const created = once(a, 'room');
  a.emit('create', { max: 5 });
  const roomA = await created;
  assert.equal(roomA.members.length, 1);
  assert.equal(roomA.max, 5);
  assert.match(roomA.code, /^[A-Z0-9]{4}$/);

  const rooms = once(b, 'lobbies');
  b.emit('lobbies');
  const list = await rooms;
  assert.ok(list.some((r) => r.c === roomA.code && r.n === 1));

  const bRoom = once(b, 'room');
  b.emit('enter', { c: roomA.code });
  assert.equal((await bRoom).members.length, 2);

  const chat = once(a, 'chat');
  b.emit('chat', { t: 'Привет!' });
  const msg = await chat;
  assert.equal(msg.t, 'Привет!');
  assert.equal(msg.n, 'Бета');
  assert.equal(msg.id, b.id);

  const players = waitFor(b, 'players', (list) => list.some((p) => p.id === a.id && p.x === 123));
  a.emit('state', { x: 123, z: 0, f: 1, l: 7, bk: 42 });
  const states = await players;
  const mine = states.find((p) => p.id === a.id);
  assert.ok(mine, 'игрок A должен быть в списке');
  assert.equal(mine.x, 123);
  assert.equal(mine.l, 7);
  assert.equal(mine.n, 'Альфа');

  const leftRoom = once(a, 'room');
  b.emit('leave');
  assert.equal((await leftRoom).members.length, 1);
});

test('ники уникальны, сервер выдаёт замену', async () => {
  const a = await newClient('u-nick-1', 'Кокич');

  const dup = connect(BASE, { transports: ['websocket'], reconnection: false, forceNew: true });
  clients.push(dup);
  await once(dup, 'connect');
  const nickPromise = once(dup, 'nick');
  dup.emit('join', { n: 'Кокич', s: 1, a: 0, fm: 0, u: 'u-nick-2' });
  const nick = await nickPromise;
  assert.equal(nick.ok, 0);
  assert.equal(nick.w, 'Кокич');
  assert.notEqual(nick.n, 'Кокич');

  const created = once(a, 'room');
  a.emit('create', { max: 4 });
  const room = await created;
  const dupRoom = once(dup, 'room');
  dup.emit('enter', { c: room.code });
  const info = await dupRoom;
  const names = info.members.map((m) => m.n);
  assert.equal(new Set(names).size, names.length, 'ники не должны повторяться');
});

test('общий босс: хост получает урон, последователь — deny и завершение', async () => {
  const a = await newClient('u-boss-a', 'Хост');
  const b = await newClient('u-boss-b', 'Гость');
  const created = once(a, 'room');
  a.emit('create', { max: 4 });
  const room = await created;
  const bRoom = once(b, 'room');
  b.emit('enter', { c: room.code });
  await bRoom;

  const started = once(b, 'boss');
  a.emit('boss', { start: 1, l: 3, np: 2 });
  const start = await started;
  assert.equal(start.start, 1);
  assert.equal(start.own, a.id);
  assert.equal(start.np, 2);

  const denied = once(b, 'boss');
  b.emit('boss', { join: 1 });
  assert.equal((await denied).own, a.id);

  const damage = once(a, 'boss');
  b.emit('boss', { dmg: 12 });
  assert.equal((await damage).dmg, 12);

  const ended = once(b, 'boss');
  a.emit('boss', { end: 1, w: 1 });
  assert.equal((await ended).w, 1);
});

test('рейс: ожидание, посадка и вылет со списком пассажиров', async () => {
  const a = await newClient('u-flight-a', 'Капитан');
  const b = await newClient('u-flight-b', 'Пассажир');
  const created = once(a, 'room');
  a.emit('create', { max: 4 });
  const room = await created;
  const bRoom = once(b, 'room');
  b.emit('enter', { c: room.code });
  await bRoom;

  const waitMsg = once(b, 'flight');
  a.emit('flight', { start: 1 });
  const w = await waitMsg;
  assert.equal(w.st, 'wait');
  assert.equal(w.by, a.id);

  const boarded = once(b, 'flight');
  b.emit('flight', { board: 1 });
  const bm = await boarded;
  assert.equal(bm.b, 2);

  const gone = once(b, 'flight');
  const gone2 = once(a, 'flight');
  const [m1, m2] = await Promise.all([gone, gone2]);
  assert.equal(m1.go, 1);
  assert.ok(m1.ids.includes(a.id) && m1.ids.includes(b.id));
  assert.equal(m2.go, 1);
});

test('переподключение с тем же uid возвращает игрока в лобби', async () => {
  const a = await newClient('u-reconnect', 'Феникс');
  const created = once(a, 'room');
  a.emit('create', { max: 4 });
  const room = await created;
  // Второй игрок остаётся — пустая комната после последнего выхода удаляется.
  const b = await newClient('u-reconnect-b', 'Страж');
  const bRoom = once(b, 'room');
  b.emit('enter', { c: room.code });
  await bRoom;

  a.close();
  await wait(150);

  const again = await newClient('u-reconnect', 'Феникс');
  again.emit('lobbies');
  const list = await once(again, 'lobbies');
  const restored = list.find((r) => r.c === room.code);
  assert.ok(restored, 'комната должна сохраниться');
  assert.equal(restored.n, 2, 'игрок должен вернуться в свою комнату');
});

test('обряд: в круг попадают только стоящие в нём игроки', async () => {
  const a = await newClient('u-rit-a', 'Шаман');
  const b = await newClient('u-rit-b', 'Гость');
  const created = once(a, 'room');
  a.emit('create', { max: 4 });
  const room = await created;
  const bRoom = once(b, 'room');
  b.emit('enter', { c: room.code });
  await bRoom;

  a.emit('state', { x: 100, z: 0, l: 13, rc: 1 });
  b.emit('state', { x: 100, z: 0, l: 3, rc: 0 });
  await wait(150);

  const result = waitFor(b, 'rit', (m) => m && m.go === 1);
  a.emit('rit', { start: 1, alt: 1 });
  const go = await result;
  assert.equal(go.go, 1);
  assert.deepEqual(go.ids, [a.id]);
  assert.equal(go.alt, 1);
});
