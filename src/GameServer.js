'use strict';

const config = require('./config');
const U = require('./util');

const roomKey = (code) => 'room:' + code;

/**
 * Игровой сервер: лобби, чат, синхронизация игроков и все совместные режимы.
 * Клиент — это index.html; протокол выведен из его обработчиков socket.on(...).
 */
class GameServer {
  constructor(io) {
    this.io = io;
    this.players = new Map();    // socket.id -> игрок
    this.rooms = new Map();      // код -> комната
    this.nicks = new Map();      // ник в нижнем регистре -> socket.id
    this.recent = new Map();     // uid -> { room, at } для переподключения
    this.roomState = new Map();  // код -> состояние совместных режимов
    this.lastPaxNo = new Map();  // socket.id -> время последнего «нет мест»
    this.connections = 0;

    this.tickTimer = setInterval(() => this.tick(), config.tickMs);
    this.cleanupTimer = setInterval(() => this.cleanup(), 30000);
  }

  close() {
    clearInterval(this.tickTimer);
    clearInterval(this.cleanupTimer);
  }

  // ---------- базовые helpers ----------

  attach(socket) {
    this.connections++;
    const p = {
      id: socket.id,
      uid: socket.id,
      n: '',
      s: 0,
      a: 0,
      fm: 0,
      state: null,
      room: null,
      joined: false,
      connectedAt: Date.now(),
      rate: new Map(),
    };
    this.players.set(socket.id, p);

    if (this.connections >= config.maxConnections) socket.emit('full');

    socket.on('join', (m) => this.onJoin(socket, p, m));
    socket.on('lobbies', () => this.sendLobbies());
    socket.on('create', (m) => this.onCreate(socket, p, m));
    socket.on('enter', (m) => this.onEnter(socket, p, m));
    socket.on('leave', () => this.leaveRoom(socket, p));
    socket.on('state', (m) => this.onState(p, m));
    socket.on('chat', (m) => this.onChat(socket, p, m));

    socket.on('boss', (m) => this.onBoss(socket, p, m));
    socket.on('kr', (m) => this.onKr(socket, p, m));
    socket.on('flight', (m) => this.onFlight(p, m));
    socket.on('rit', (m) => this.onRit(p, m));
    socket.on('uni', (m) => this.onUni(p, m));
    socket.on('story', (m) => this.onStory(p, m));
    socket.on('rv', (m) => this.onRevive(p, m));
    socket.on('rb', (m) => this.onRiot(p, m));
    socket.on('mkt', (m) => this.onMarket(p, m));

    socket.on('disconnect', () => this.onDisconnect(socket, p));
  }

  err(socket, text) {
    socket.emit('err', { t: String(text).slice(0, 200) });
  }

  roomOf(p) {
    return p.room ? this.rooms.get(p.room) || null : null;
  }

  stateOf(code) {
    let st = this.roomState.get(code);
    if (!st) {
      st = {
        boss: null, kr: null, flight: null, ritual: null,
        bossCooldownUntil: 0, krCooldownUntil: 0,
        flightCooldownUntil: 0, ritualCooldownUntil: 0,
        party: null,
      };
      this.roomState.set(code, st);
    }
    return st;
  }

  roomInfo(room) {
    const members = [];
    for (const id of room.memberIds) {
      const pl = this.players.get(id);
      if (pl) members.push({ id, n: pl.n, s: pl.s, a: pl.a, fm: pl.fm });
    }
    return {
      code: room.code,
      name: room.name,
      host: room.host,
      max: room.max,
      members,
    };
  }

  sendRoom(socket) {
    const room = this.roomOf(this.players.get(socket.id));
    socket.emit('room', room ? this.roomInfo(room) : null);
  }

  sendRoomToAll(room) {
    const info = this.roomInfo(room);
    for (const id of room.memberIds) this.io.to(id).emit('room', info);
  }

  sendLobbies() {
    const list = [];
    for (const room of this.rooms.values()) {
      const host = this.players.get(room.host);
      list.push({
        name: room.name,
        host: host ? host.n : '?',
        c: room.code,
        n: room.memberIds.size,
        max: room.max,
      });
    }
    this.io.emit('lobbies', list);
  }

  // Отправить в комнату, кроме одного игрока (например, хоста босса —
  // иначе он получит m.start и перейдёт в роль «повторяющего»).
  emitRoom(room, ev, data, exceptId) {
    if (exceptId) {
      for (const id of room.memberIds) if (id !== exceptId) this.io.to(id).emit(ev, data);
    } else {
      this.io.to(roomKey(room.code)).emit(ev, data);
    }
  }

  rate(p, key, max, windowMs) {
    return U.allow(p.rate, key, max, windowMs);
  }

  // ---------- профиль, лобби ----------

  onJoin(socket, p, m) {
    if (!U.isObj(m)) return;
    p.uid = U.str(m.u, 60) || p.id;
    const wanted = U.str(m.n, config.maxNickLength) || ('Петух' + (100 + Math.floor(Math.random() * 900)));
    p.s = U.int(m.s, 0, 99);
    p.a = U.int(m.a, 0, 9999);
    p.fm = U.bool(m.fm);

    // Ники уникальны в пределах сервера: клиент понимает ответ {w, n}.
    const lower = wanted.toLowerCase();
    const holder = this.nicks.get(lower);
    let nick = wanted;
    if (holder && holder !== p.id) {
      let i = 2;
      do { nick = (wanted.slice(0, 11) + i++).slice(0, config.maxNickLength); }
      while (this.nicks.has(nick.toLowerCase()));
      socket.emit('nick', { ok: 0, w: wanted, n: nick });
    }
    if (p.n) this.nicks.delete(p.n.toLowerCase());
    p.n = nick;
    this.nicks.set(nick.toLowerCase(), p.id);
    p.joined = true;

    // Вернуться в свою комнату после переподключения (Render засыпает/будит).
    const rec = this.recent.get(p.uid);
    if (rec && Date.now() - rec.at < config.recentLifetime && rec.room && this.rooms.has(rec.room)) {
      const room = this.rooms.get(rec.room);
      if (room.memberIds.size < room.max && !p.room) this.addToRoom(socket, p, room);
    }
    this.sendRoom(socket);
    this.sendLobbies();
  }

  onCreate(socket, p, m) {
    if (!p.joined || !U.isObj(m)) return;
    if (!this.rate(p, 'create', 3, 10000)) return this.err(socket, 'Слишком часто создаёшь лобби. Подожди немного.');
    if (this.connections >= config.maxConnections) return this.err(socket, 'Сервер переполнен. Попробуй позже.');
    if (this.rooms.size >= config.maxRooms) return this.err(socket, 'Все лобби заняты. Попробуй позже.');
    if (p.room) this.leaveRoom(socket, p, true);

    const code = U.makeCode((c) => this.rooms.has(c));
    const room = {
      code,
      name: p.n,
      host: p.id,
      max: U.int(m.max, 1, config.maxRoomSize, 10),
      memberIds: new Set([p.id]),
      createdAt: Date.now(),
    };
    this.rooms.set(code, room);
    this.stateOf(code);
    socket.join(roomKey(code));
    p.room = code;
    this.rememberRoom(p, code);
    this.sendRoom(socket);
    this.sendLobbies();
  }

  onEnter(socket, p, m) {
    if (!p.joined || !U.isObj(m)) return;
    if (!this.rate(p, 'enter', 5, 10000)) return this.err(socket, 'Слишком много попыток входа. Подожди.');
    const code = U.str(m.c, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const room = this.rooms.get(code);
    if (!room) return this.err(socket, 'Такого кода нет. Проверь, что ты правильно его ввёл.');
    if (p.room === code) return this.sendRoom(socket);
    if (room.memberIds.size >= room.max) return this.err(socket, 'В этом лобби уже полно мест.');
    if (this.connections >= config.maxConnections) return this.err(socket, 'Сервер переполнен. Попробуй позже.');
    if (p.room) this.leaveRoom(socket, p, true);
    this.addToRoom(socket, p, room);
  }

  addToRoom(socket, p, room) {
    room.memberIds.add(p.id);
    p.room = room.code;
    socket.join(roomKey(room.code));
    this.rememberRoom(p, room.code);
    this.stateOf(room.code);
    this.sendRoomToAll(room);
    this.sendLobbies();
  }

  rememberRoom(p, code) {
    this.recent.set(p.uid, { room: code, at: Date.now() });
  }

  leaveRoom(socket, p, silent = false) {
    const room = this.roomOf(p);
    if (!room) return;
    const code = room.code;
    socket.leave(roomKey(code));
    room.memberIds.delete(p.id);
    p.room = null;
    p.state = null;
    this.recent.set(p.uid, { room: null, at: Date.now() });
    this.onMemberLeave(code, p);

    if (!silent) socket.emit('room', null);
    if (room.memberIds.size === 0) {
      this.rooms.delete(code);
      this.roomState.delete(code);
    } else {
      if (room.host === p.id) room.host = room.memberIds.values().next().value;
      this.io.to(roomKey(code)).emit('left', p.id);
      this.sendRoomToAll(room);
    }
    this.sendLobbies();
  }

  onMemberLeave(code, p) {
    const st = this.stateOf(code);
    if (st.boss && st.boss.owner === p.id) {
      st.boss = null;
      this.emitRoom(this.rooms.get(code), 'boss', { end: 1, w: 0 });
    }
    if (st.kr && st.kr.owner === p.id) {
      st.kr = null;
      this.emitRoom(this.rooms.get(code), 'kr', { end: 1, w: 0 });
    }
    if (st.flight && st.flight.by === p.id) {
      st.flight = null;
      st.flightCooldownUntil = Date.now() + config.tripCancelCooldown * 1000;
      this.emitRoom(this.rooms.get(code), 'flight', { st: 'idle' });
    } else if (st.flight) {
      st.flight.boarded.delete(p.id);
    }
    if (st.ritual && st.ritual.by === p.id) st.ritual = null;
    if (st.party) {
      st.party.ids = st.party.ids.filter((id) => id !== p.id);
      if (st.party.ids.length < 2) st.party = null;
    }
  }

  onDisconnect(socket, p) {
    const previousRoom = p.room;
    this.leaveRoom(socket, p);
    // При обрыве (а не при явном «Выйти») запоминаем комнату: если клиент
    // переподключится с тем же uid, onJoin вернёт его обратно.
    if (previousRoom) this.recent.set(p.uid, { room: previousRoom, at: Date.now() });
    if (p.n) this.nicks.delete(p.n.toLowerCase());
    this.connections = Math.max(0, this.connections - 1);
    this.players.delete(socket.id);
    this.lastPaxNo.delete(socket.id);
  }

  onState(p, m) {
    const room = this.roomOf(p);
    if (!room || !this.rate(p, 'state', 40, 1000)) return;
    p.state = U.sanitizeState(m);
  }

  onChat(socket, p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m) || !p.joined) return;
    if (!this.rate(p, 'chat', 1, 800)) return;
    const t = U.str(m.t, config.maxChatLength);
    if (!t) return;
    this.emitRoom(room, 'chat', { id: p.id, n: p.n, t });
  }

  // ---------- общие боссы ----------

  onBoss(socket, p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m)) return;
    const st = this.stateOf(room.code);

    if (m.start) {
      if (!this.rate(p, 'boss-start', 2, 20000)) return;
      if (st.boss) {
        socket.emit('boss', { deny: 1, own: st.boss.owner, l: st.boss.l, np: st.boss.np });
        return;
      }
      st.boss = {
        owner: p.id,
        l: U.int(m.l, 0, 999),
        np: U.int(m.np, 1, config.maxRoomSize, room.memberIds.size),
        startedAt: Date.now(),
      };
      this.emitRoom(room, 'boss', { start: 1, l: st.boss.l, np: st.boss.np, own: p.id }, p.id);
      socket.emit('boss', { own: p.id });
    } else if (m.join) {
      if (st.boss) socket.emit('boss', { deny: 1, own: st.boss.owner, l: st.boss.l, np: st.boss.np });
    } else if (m.sn) {
      if (!st.boss || st.boss.owner !== p.id || !this.rate(p, 'boss-sn', 20, 1000)) return;
      this.emitRoom(room, 'boss', { sn: U.sanitizePayload(m.sn, 2048) }, p.id);
    } else if (m.dmg !== undefined) {
      if (!st.boss) return;
      const dmg = U.num(m.dmg, 0, 100000);
      if (dmg > 0) this.io.to(st.boss.owner).emit('boss', { dmg: Math.round(dmg) });
    } else if (m.atk) {
      if (!st.boss || st.boss.owner !== p.id) return;
      this.emitRoom(room, 'boss', { atk: U.int(m.atk, 1, 99), cd: U.num(m.cd, 0, 10) }, p.id);
    } else if (m.blind) {
      if (!st.boss || st.boss.owner !== p.id) return;
      this.emitRoom(room, 'boss', {
        blind: U.num(m.blind, 0, 60),
        label: U.str(m.label, 60),
      }, p.id);
    } else if (m.end) {
      if (st.boss && st.boss.owner === p.id) {
        st.boss = null;
        st.bossCooldownUntil = Date.now() + 5000;
        this.emitRoom(room, 'boss', { end: 1, w: U.bool(m.w) }, p.id);
      }
    } else if (m.leave) {
      if (st.boss && st.boss.owner !== p.id) {
        // Повторяющий вышел — хозяину ничего делать не нужно.
      }
    }
  }

  onKr(socket, p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m)) return;
    const st = this.stateOf(room.code);

    if (m.start) {
      if (!this.rate(p, 'kr-start', 2, 20000)) return;
      if (st.kr) {
        socket.emit('kr', { deny: 1, own: st.kr.owner, np: st.kr.np, c: st.kr.c });
        return;
      }
      st.kr = {
        owner: p.id,
        np: U.int(m.np, 1, config.maxRoomSize, room.memberIds.size),
        c: U.bool(m.c),
        startedAt: Date.now(),
      };
      this.emitRoom(room, 'kr', { start: 1, np: st.kr.np, c: st.kr.c, own: p.id }, p.id);
      socket.emit('kr', { own: p.id });
    } else if (m.join) {
      if (st.kr) socket.emit('kr', { deny: 1, own: st.kr.owner, np: st.kr.np, c: st.kr.c });
    } else if (m.sn) {
      if (!st.kr || st.kr.owner !== p.id || !this.rate(p, 'kr-sn', 10, 1000)) return;
      this.emitRoom(room, 'kr', { sn: U.sanitizePayload(m.sn, 4096) }, p.id);
    } else if (m.dmg !== undefined) {
      if (!st.kr) return;
      const dmg = U.num(m.dmg, 0, 100000);
      if (dmg > 0) this.io.to(st.kr.owner).emit('kr', { dmg: Math.round(dmg * 10) / 10 });
    } else if (m.end) {
      if (st.kr && st.kr.owner === p.id) {
        st.kr = null;
        this.emitRoom(room, 'kr', { end: 1, w: U.bool(m.w) }, p.id);
      }
    }
  }

  // ---------- рейс на Мальдивы ----------

  flightWait(room, flight) {
    const left = Math.max(0, Math.ceil((flight.endAt - Date.now()) / 1000));
    this.emitRoom(room, 'flight', {
      st: 'wait',
      by: flight.by,
      n: flight.name,
      left,
      b: flight.boarded.size,
      t: room.memberIds.size,
    });
  }

  onFlight(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m)) return;
    const st = this.stateOf(room.code);
    const now = Date.now();

    if (m.start) {
      if (!this.rate(p, 'flight-start', 2, 30000)) return;
      if (st.flight) {
        if (p.id === st.flight.by) this.flightWait(room, st.flight);
        else this.io.to(p.id).emit('flight', {
          no: 'busy', left: Math.max(0, Math.ceil((st.flight.endAt - now) / 1000)),
        });
        return;
      }
      if (now < st.flightCooldownUntil) {
        return this.io.to(p.id).emit('flight', {
          no: 'left', left: Math.ceil((st.flightCooldownUntil - now) / 1000),
        });
      }
      st.flight = { by: p.id, name: p.n, endAt: now + config.tripWait * 1000, boarded: new Set([p.id]) };
      this.flightWait(room, st.flight);
    } else if (m.board) {
      if (!st.flight) return;
      st.flight.boarded.add(p.id);
      this.flightWait(room, st.flight);
    } else if (m.unboard) {
      if (!st.flight || st.flight.by === p.id) return;
      st.flight.boarded.delete(p.id);
      this.flightWait(room, st.flight);
    } else if (m.cancel) {
      if (!st.flight || st.flight.by !== p.id) return;
      st.flight = null;
      st.flightCooldownUntil = now + config.tripCancelCooldown * 1000;
      this.emitRoom(room, 'flight', { st: 'idle' });
    }
  }

  // ---------- обряд ----------

  onRit(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m) || !m.start) return;
    if (!this.rate(p, 'rit', 2, 30000)) return;
    const st = this.stateOf(room.code);
    const now = Date.now();
    if (st.ritual || now < st.ritualCooldownUntil) return this.io.to(p.id).emit('rit', { deny: 1 });
    st.ritual = { by: p.id, name: p.n, alt: U.bool(m.alt), endAt: now + config.ritualWait * 1000 };
    this.emitRoom(room, 'rit', { st: 'wait', by: p.n, left: config.ritualWait });
  }

  finishRitual(room, st) {
    const ids = [];
    for (const id of room.memberIds) {
      const pl = this.players.get(id);
      if (pl && pl.state && pl.state.rc === 1 && pl.state.l === 13) ids.push(id);
      if (ids.length >= 4) break;
    }
    this.emitRoom(room, 'rit', { go: 1, ids, alt: st.ritual.alt });
    st.ritual = null;
    st.ritualCooldownUntil = Date.now() + config.ritualCooldown * 1000;
  }

  // ---------- группы и совместные истории ----------

  onUni(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m)) return;
    if (!this.rate(p, 'uni', 4, 10000)) return;
    const st = this.stateOf(room.code);
    const hostState = p.state || {};
    const loc = U.int(m.l, 0, 999, U.int(hostState.l, 0, 999, -1));
    const ids = [p.id];
    const others = [];
    for (const id of room.memberIds) {
      if (id === p.id) continue;
      const pl = this.players.get(id);
      if (!pl) continue;
      // Зовём только тех, кто рядом: по локации и расстоянию по X.
      if (loc >= 0 && pl.state && (pl.state.l !== loc || Math.abs(pl.state.x - (hostState.x || 0)) > 600)) continue;
      others.push(pl);
    }
    others.sort((a, b) => Math.abs((a.state ? a.state.x : 0) - (hostState.x || 0)) - Math.abs((b.state ? b.state.x : 0) - (hostState.x || 0)));
    for (const pl of others) if (ids.length < 4) ids.push(pl.id);

    st.party = { ids, host: ids[0], expiresAt: Date.now() + config.partyLifetime * 1000 };
    this.emitRoom(room, 'uni', { ids, k: U.int(m.k, 0, 99), kind: U.str(m.kind, 12) });
  }

  onStory(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m) || !this.rate(p, 'story', 30, 1000)) return;
    const st = this.stateOf(room.code);
    if (!st.party || !st.party.ids.includes(p.id)) return;
    const clean = U.sanitizePayload(m);
    if (!clean) return;
    if (p.id === st.party.host) {
      for (const id of st.party.ids) if (id !== p.id) this.io.to(id).emit('story', clean);
    } else {
      this.io.to(st.party.host).emit('story', clean);
    }
  }

  // ---------- прочие взаимодействия ----------

  onRevive(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m)) return;
    const to = U.str(m.to, 40);
    if (!room.memberIds.has(to)) return;
    this.io.to(to).emit('rv', {
      n: p.n,
      f: U.bool(m.f),
      gh: U.bool(m.gh),
      x: U.int(m.x, -100000, 100000),
    });
  }

  onRiot(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m) || !this.rate(p, 'rb', 10, 10000)) return;
    if (m.go !== undefined) {
      this.emitRoom(room, 'rb', { go: U.int(m.go, 0, 8191) & 8191, n: p.n }, p.id);
    } else if (m.b !== undefined) {
      const bit = U.int(m.b, 0, 12, -1);
      if (bit >= 0 && bit <= 12) this.emitRoom(room, 'rb', { b: bit, n: p.n }, p.id);
    }
  }

  onMarket(p, m) {
    const room = this.roomOf(p);
    if (!room || !U.isObj(m) || !this.rate(p, 'mkt', 5, 10000)) return;
    const id = U.str(m.id, 40);
    if (id) this.emitRoom(room, 'mkt', { id }, p.id);
  }

  // ---------- тик ----------

  checkSeats(room, now) {
    const buses = new Map();
    for (const id of room.memberIds) {
      const pl = this.players.get(id);
      if (!pl || !pl.state || !pl.state.px || pl.state.cs < 0) continue;
      if (!room.memberIds.has(pl.state.px)) continue;
      if (!buses.has(pl.state.px)) buses.set(pl.state.px, []);
      buses.get(pl.state.px).push(pl);
    }
    for (const list of buses.values()) {
      if (list.length <= config.maxPassengers) continue;
      list.sort((a, b) => b.connectedAt - a.connectedAt);
      const victim = list[0];
      if (now - (this.lastPaxNo.get(victim.id) || 0) > 5000) {
        this.lastPaxNo.set(victim.id, now);
        this.io.to(victim.id).emit('paxno');
      }
    }
  }

  tick() {
    const now = Date.now();
    for (const room of this.rooms.values()) {
      const st = this.stateOf(room.code);

      // Позиции других игроков — collapse в один пакет раз в tickMs.
      if (room.memberIds.size) {
        const list = [];
        for (const id of room.memberIds) {
          const pl = this.players.get(id);
          if (pl && pl.state) list.push({ id, n: pl.n, s: pl.s, a: pl.a, ...pl.state });
        }
        if (list.length) this.io.to(roomKey(room.code)).emit('players', list);
      }

      if (st.flight && now >= st.flight.endAt) {
        const ids = [...st.flight.boarded].filter((id) => room.memberIds.has(id));
        this.emitRoom(room, 'flight', { go: 1, ids });
        st.flight = null;
        st.flightCooldownUntil = now + config.tripCooldown * 1000;
      }
      if (st.ritual && now >= st.ritual.endAt) this.finishRitual(room, st);
      if (st.boss && now - st.boss.startedAt > config.bossTimeout * 1000) {
        st.boss = null;
        this.emitRoom(room, 'boss', { end: 1, w: 0 });
      }
      if (st.kr && now - st.kr.startedAt > config.bossTimeout * 1000) {
        st.kr = null;
        this.emitRoom(room, 'kr', { end: 1, w: 0 });
      }
      if (st.party && now > st.party.expiresAt) st.party = null;
      this.checkSeats(room, now);
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [uid, rec] of this.recent) {
      if (now - rec.at > config.recentLifetime) this.recent.delete(uid);
    }
    for (const [id, t] of this.lastPaxNo) {
      if (now - t > 60000) this.lastPaxNo.delete(id);
    }
  }
}

module.exports = GameServer;
