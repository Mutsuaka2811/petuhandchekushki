/* init · 738 declarations · var SRC = { wool: '/assets/img/wool.webp', rooster: '/assets/img/rooster.webp', bottle: '/assets/img/bottle.webp', bDirt */

var SRC = {
    wool: '/assets/img/wool.webp',
    rooster: '/assets/img/rooster.webp',
    bottle: '/assets/img/bottle.webp',
    bDirty: '/assets/img/bDirty.webp',
    bLegend: '/assets/img/bLegend.webp',
    bSuper: '/assets/img/bSuper.webp',
    bMyth: '/assets/img/bMyth.webp',
    npcDriver: '/assets/img/npcDriver.webp',
    npcPilot: '/assets/img/npcPilot.webp',
    npcCollector: '/assets/img/npcCollector.webp',
    sqRun: '/assets/img/sqRun.webp',
    sqCarry: '/assets/img/sqCarry.webp',
    hero: '/assets/img/hero.webp',
    boss: '/assets/img/boss.webp',
    mell: '/assets/img/mell.webp',
    mogg: '/assets/img/mogg.webp',
    icev: '/assets/img/icev.webp',
    ghost: '/assets/img/ghost.webp',
    priest: '/assets/img/priest.webp',
    worker: '/assets/img/worker.webp',
    guard: '/assets/img/guard.webp',
    muscle: '/assets/img/muscle.webp',
    doc: '/assets/img/doc.webp',
    sci: '/assets/img/sci.webp'
  };

var img = {};

Object.keys(SRC).forEach(function (k) { var i = new Image(); i.src = SRC[k]; img[k] = i; });

document.getElementById('hudBottle').src = SRC.bottle;

document.getElementById('hudWool').src = SRC.wool;

document.getElementById('hudSuper').src = SRC.bSuper;

document.getElementById('rewardImg').src = SRC.bSuper;

var CHICKEN_TOKEN_IMG = '/assets/img/chicken-token.png';

var WORLD_W = 20000;

var SHOP_X = 250, SHOP_W = 250;

var PRICE = 5;

var SPEED = 285, JUMP_V = 650, GRAV = 1750;

var BOTTLE_H = 60, PLAYER_H = 150;

var TARGET_BOTTLES = 100;

var UP_X = 770, UP_W = 250;

var BB_X = 1320, BB_W = 230;

var BASE_PRICE = 5, MIN_PRICE = 1.5, MAX_PRICE = 100, FALL_TIME = 5;

var RATE_CD = 25, LOW_LIMIT = 3, LOW_TIME = 60, REBOUND = 5, NOBAD_TIME = 300;

var MAX_AW = 5, MAX_ARMY = 5, NUT_PRICE = 40, NUT_PRICE5 = 180, SPEC_PRICE = 400;

var WASH_X = 1100, WASH_W = 190;

var BUS_HOME_X = 640;

var BOSS_CD = 180, BUS_WASH_BOOST = 3;

var MAX_UP = 10;

var AP_PRICE = 900, OB_PRICE = 1500, OB_MAX = { ebus: 5, tbus: 5, mbus: 3, kbus: 4, wmg: 3, wrk: 3, wtr: 3, abus: 5, sbus: 4, rbus: 3, cbus: 3 };

var CLEAN_MULT = 1.5;

var STOPS = [
    { x: 3600, name: 'Сосновая', price: 10 }, { x: 7000, name: 'Родник', price: 20 }, { x: 10400, name: 'Дубрава', price: 35 },
    { x: 13800, name: 'Овраг', price: 55 }, { x: 17600, name: 'Глушь', price: 80 }
  ];

var CITY_END = 1950, FUEL_PRICE = 2;

var CC_MIN = 20, CC_MAX = 900, CC_TICK = 20, UP5 = 5;

var FUEL = [1780, 5300, 8700, 12100, 15700, 19100].map(function (x) { return { x: x }; });

var ALL_STOPS = [{ x: BUS_HOME_X, name: 'Город', home: true, price: 0 }].concat(STOPS);

var GLOVES_COST = 150, WOOL_PRICE = 30, WOOL_DMG = 50;

var RAR = [
    { n: 'Обычная',     m: 1,   c: '#e6edf7', glow: '255,245,170', w: 62 },
    { n: 'Необычная',   m: 1.5, c: '#5bd16f', glow: '91,209,111',  w: 24 },
    { n: 'Редкая',      m: 3,   c: '#4aa3ff', glow: '74,163,255',  w: 10 },
    { n: 'Эпическая',   m: 6,   c: '#c07bff', glow: '192,123,255', w: 3.4 },
    { n: 'Легендарная', m: 15,  c: '#ffb020', glow: '255,176,32',  w: 0.6 },
    { n: 'Мифическая',  m: 40,  c: '#ff3b3b', glow: '255,59,59',   w: 0.05 }
  ];

var SKEY = 'chekushka-world-v1';

var hadLocal = false;

var save = { coins: 0, carried: 0, pocket: 0, air: 0, rate: 5, base: 5, speed: 0, jump: 0, wool: 0, gloves: 0, busup: 0, autowash: 0, nuts: 0, army: 0, wins: 0, special: 0, superSp: 0, sec: 0, cj: 0, cjn: 0, cjp: 0, cjd: 0, sqFed: 0, sqSec: 1, sqcarry: 0, bossUntil: 0, ownBus: 0, apilot: 0, wmg: 0, wrk: 0, wtr: 0, fuel: 0, avOwn: 0, avEng: 0, avSel: 0, avFuel: 0, avLoc: 3, avX: 3080, kbus: 0, abus: 0, sbus: 0, rbus: 0, cbus: 0, ebus: 0, tbus: 0, mbus: 0, phone: 0, dataMB: 0, dataUnl: 0, dataOn: 1, cc: 0, ccCost: 0, ccp: 100, cch: [], cct: 0, nutdmg: 0, sqfast: 0, hpup: 0, regen: 0, sqOff: 0, sqF: [1, 1, 1, 1, 1, 1], qi: 0, qSold: 0, qClean: 0, qRare: 0, tickets: 0, promo: {}, mx: { mi: 0, mb: null, qb: null, pn: 0, ln: 0, lk: [0, 0, 0], lab: [0, 0, 0], labT: 0, sf: 0, hd: 0, fe: 0, p5: 0, lr: 0, gy: 0, cq: [], cs: 0, ct: 0, pu: 0, rr: 0, chickenToken: 0, chickenUntil: 0, chPity: 0 }, pl: [], plt: 0, fs: { boat: 0, sub: 0, rod: 0, reel: 0, bait: 0, motor: 0, sd: 0, sh: 0, ss: 0, harp: 0 }, kw: 0, kc: 0, fb: {}, fc: {}, trk: { d: [0, 0, 0, 0, 0, 0], c: [0, 0, 0, 0, 0, 0] }, inv: { d: [0, 0, 0, 0, 0, 0], c: [0, 0, 0, 0, 0, 0] } };

try {
    var raw = localStorage.getItem(SKEY);
    if (raw) {
      var s = JSON.parse(raw);
      hadLocal = true; save.t = +s.t || 0;
      if (typeof s.coins === 'number') save.coins = s.coins;
      if (typeof s.carried === 'number') save.carried = s.carried;
      if (typeof s.pocket === 'number') save.pocket = s.pocket;
      if (typeof s.air === 'number') save.air = s.air;
      if (typeof s.speed === 'number') save.speed = Math.min(MAX_UP, Math.max(0, Math.floor(s.speed)));
      if (typeof s.jump === 'number') save.jump = Math.min(MAX_UP, Math.max(0, Math.floor(s.jump)));
      if (typeof s.busup === 'number') save.busup = Math.min(MAX_UP, Math.max(0, Math.floor(s.busup)));
      if (typeof s.autowash === 'number') save.autowash = Math.min(MAX_AW, Math.max(0, Math.floor(s.autowash)));
      if (typeof s.nuts === 'number') save.nuts = Math.max(0, Math.floor(s.nuts));
      if (typeof s.army === 'number') { var army0 = Math.max(0, Math.floor(s.army)); save.army = Math.min(MAX_ARMY, army0); if (army0 > MAX_ARMY) save.nuts += army0 - MAX_ARMY; }
      if (typeof s.wins === 'number') save.wins = Math.max(0, Math.floor(s.wins));
      if (typeof s.special === 'number') save.special = Math.max(0, Math.floor(s.special));
      if (typeof s.superSp === 'number') save.superSp = Math.max(0, Math.floor(s.superSp));
      if (typeof s.sec === 'number') save.sec = Math.max(0, Math.floor(s.sec));
      if (typeof s.cj === 'number') save.cj = Math.min(2, Math.max(0, Math.floor(s.cj)));
      ['cjn', 'cjp', 'cjd'].forEach(function (k9) { if (typeof s[k9] === 'number' && isFinite(s[k9])) save[k9] = Math.max(0, Math.min(1e7, Math.floor(s[k9]))); });
      if (save.cj && (!save.cjn || !save.cjp)) save.cj = 0;
      if (typeof s.sqFed === 'number') save.sqFed = Math.min(15, Math.max(0, Math.floor(s.sqFed)));
      if (typeof s.sqSec === 'number') save.sqSec = s.sqSec ? 1 : 0;
      if (typeof s.bossUntil === 'number' && isFinite(s.bossUntil)) save.bossUntil = Math.max(0, Math.min(s.bossUntil, Date.now() + 180000));
      if (s.ownBus) save.ownBus = 1;
      if (s.phone) save.phone = 1;
      if (s.sqOff) save.sqOff = 1;
      if (Array.isArray(s.sqF) && s.sqF.length >= 6) save.sqF = [0, 1, 2, 3, 4, 5].map(function (k) { return s.sqF[k] ? 1 : 0; });
      if (typeof s.qi === 'number') save.qi = Math.max(0, Math.min(9999, Math.floor(s.qi)));
      if (typeof s.qSold === 'number') save.qSold = Math.max(0, Math.floor(s.qSold));
      if (typeof s.qClean === 'number') save.qClean = Math.max(0, Math.floor(s.qClean));
      if (typeof s.qRare === 'number') save.qRare = Math.max(0, Math.floor(s.qRare));
      fishSan(s); promoSan(s); mxSan(s);
      if (typeof s.tickets === 'number') save.tickets = Math.max(0, Math.min(99, Math.floor(s.tickets)));
      if (typeof s.dataMB === 'number' && isFinite(s.dataMB)) save.dataMB = Math.max(0, Math.min(1e6, s.dataMB));
      if (s.dataUnl) save.dataUnl = 1;
      save.dataOn = s.dataOn === 0 ? 0 : 1;
      if (typeof s.cc === 'number' && isFinite(s.cc)) save.cc = Math.max(0, Math.min(1e9, Math.floor(s.cc)));
      if (typeof s.ccCost === 'number' && isFinite(s.ccCost)) save.ccCost = Math.max(0, Math.min(1e15, s.ccCost));
      if (typeof s.ccp === 'number' && isFinite(s.ccp)) save.ccp = Math.max(CC_MIN, Math.min(CC_MAX, s.ccp));
      if (Array.isArray(s.cch)) save.cch = s.cch.slice(-40).map(function (v) { return Math.max(CC_MIN, Math.min(CC_MAX, +v || 100)); });
      if (typeof s.cct === 'number' && isFinite(s.cct)) save.cct = s.cct;
      var nd0 = ['nutdmg', 'sqfast', 'hpup', 'regen', 'sqcarry'];
      for (var nd1 = 0; nd1 < nd0.length; nd1++) if (typeof s[nd0[nd1]] === 'number') save[nd0[nd1]] = Math.min(UP5, Math.max(0, Math.floor(s[nd0[nd1]])));
      if (s.apilot) save.apilot = 1;
      if (typeof s.avOwn === 'number') save.avOwn = Math.max(0, Math.min(63, Math.floor(s.avOwn)));
      if (typeof s.avEng === 'number') save.avEng = Math.max(0, Math.min(63, Math.floor(s.avEng)));
      if (typeof s.avSel === 'number') save.avSel = Math.max(0, Math.min(3, Math.floor(s.avSel)));
      if (typeof s.avFuel === 'number' && isFinite(s.avFuel)) save.avFuel = Math.max(0, Math.min(400, s.avFuel));
      if (typeof s.avLoc === 'number') save.avLoc = Math.max(0, Math.min(15, Math.floor(s.avLoc)));
      if (typeof s.avX === 'number' && isFinite(s.avX)) save.avX = Math.max(0, Math.min(25000, s.avX));
      if (typeof s.fuel === 'number' && isFinite(s.fuel)) save.fuel = Math.max(0, s.fuel);
      for (var ok0 in OB_MAX) if (typeof s[ok0] === 'number') save[ok0] = Math.min(OB_MAX[ok0], Math.max(0, Math.floor(s[ok0])));
      if (typeof s.fuel !== 'number' && save.ownBus) save.fuel = 40 + 15 * save.kbus;
      if (s.trk && Array.isArray(s.trk.d) && Array.isArray(s.trk.c) && s.trk.d.length >= 5 && s.trk.c.length >= 5) {
        for (var ti0 = 0; ti0 < 6; ti0++) { save.trk.d[ti0] = Math.max(0, Math.floor(+s.trk.d[ti0] || 0)); save.trk.c[ti0] = Math.max(0, Math.floor(+s.trk.c[ti0] || 0)); }
      }
      var rr0 = (typeof s.base === 'number') ? s.base : s.rate;
      if (typeof rr0 === 'number' && isFinite(rr0)) { rr0 = Math.min(MAX_PRICE, Math.max(MIN_PRICE, rr0)); save.base = rr0; save.rate = rr0; }
      if (s.inv && Array.isArray(s.inv.d) && Array.isArray(s.inv.c) && s.inv.d.length >= 5 && s.inv.c.length >= 5) {
        for (var ii = 0; ii < 6; ii++) {
          save.inv.d[ii] = Math.max(0, Math.floor(+s.inv.d[ii] || 0));
          save.inv.c[ii] = Math.max(0, Math.floor(+s.inv.c[ii] || 0));
        }
      } else { save.inv.d[0] = Math.max(0, Math.floor(save.carried || 0)); }
      var cs0 = 0; for (var jj = 0; jj < 6; jj++) cs0 += save.inv.d[jj] + save.inv.c[jj];
      save.wool = Math.max(0, Math.floor(+s.wool || 0)); save.gloves = s.gloves ? 1 : 0;
      save.carried = cs0 + save.wool;
    }
  } catch (e) {}

var onPersist = null, DEV = false;

var P = { x: 600, z: 0, vx: 0, vz: 0, face: -1, walk: 0, kb: 0 };

var OB_HOME = 1420, ob = { on: false, call: false, x: OB_HOME, v: 0, dir: -1, loc: 0 }, av = { on: false, v: 0, vy: 0, h: 0, dir: 1, fT: 0 }, chute = { on: false, h: 0 }, pax = { on: false, id: '', ah: 0, ty: 0 };

var input = { left: false, right: false };

var jumpTimer = 0;

var t = 0;

var paused = false, menuOpen = false, lobbyOpen = false, chatTyping = false;

var camX = 0;

var loc = { i: 0 };

var R = rng(20261005);

var trees = [];

(function () {
    var x = 40;
    while (x < WORLD_W - 40) {
      var kind = R();
      trees.push({
        x: x,
        h: 190 + R() * 150,
        type: kind < 0.5 ? 'birch' : (kind < 0.8 ? 'pine' : 'oak'),
        seed: R() * 1000
      });
      x += 120 + R() * 200;
    }
  })();

var farTrees = makeFar(130, 120, 190);

var midTrees = makeFar(170, 150, 230);

var bushes = [], rocks = [], flowers = [], tufts = [];

(function () {
    var x = 60;
    while (x < WORLD_W) { bushes.push({ x: x, s: 0.7 + R() * 0.8 }); x += 140 + R() * 260; }
    x = 600;
    while (x < WORLD_W) { rocks.push({ x: x, s: 0.6 + R() * 0.9 }); x += 300 + R() * 500; }
    x = 20;
    while (x < WORLD_W) { flowers.push({ x: x, c: ['#fff', '#ffd23f', '#ff7a8a', '#b79cff'][Math.floor(R() * 4)], h: 6 + R() * 8 }); x += 22 + R() * 50; }
    x = 0;
    while (x < WORLD_W) { tufts.push({ x: x, h: 6 + R() * 12 }); x += 11 + R() * 5; }
  })();

trees = trees.filter(function (a) { return !nearShops(a.x); });

bushes = bushes.filter(function (a) { return !nearShops(a.x); });

rocks = rocks.filter(function (a) { return !nearShops(a.x); });

var clouds = [];

for (var ci = 0; ci < 9; ci++) clouds.push({ x: R(), y: R(), s: 0.45 + R() * 0.7, v: 5 + R() * 9 });

var bottles = [];

(function () {
    var x = 2000;
    while (x < WORLD_W - 100 && bottles.length < TARGET_BOTTLES) { addBottle(x); x += 100 + Math.random() * 160; }
  })();

var respawnT = 0, fullHint = false;

var LIFE_NAT = 60, LIFE_DROP = 300;

var cv = document.getElementById('c');

var ctx = cv.getContext('2d');

var W = 0, H = 0, dpr = 1, scale = 1, vw = 600, gY = 400, gScreen = 400, touch = false;

var skyGrad = null, dirtPat = null;

var PERF = { q: 1, acc: 0, n: 0, slow: 0, cool: 0 };

var FPSV = { n: 0, t0: 0, v: 0 };

try { var pq = parseFloat(localStorage.getItem('chekushka-perf-q')); if (pq >= 0.5 && pq <= 1) PERF.q = pq; } catch (e) {}

window.addEventListener('resize', resize);

resize();

(function () {
    var c = document.createElement('canvas'); c.width = 160; c.height = 160;
    var g = c.getContext('2d');
    g.fillStyle = '#7b5334'; g.fillRect(0, 0, 160, 160);
    var r = rng(77);
    for (var i = 0; i < 90; i++) {
      g.fillStyle = r() < 0.5 ? 'rgba(60,35,18,.35)' : 'rgba(170,125,80,.30)';
      var s = 2 + r() * 5;
      g.beginPath(); g.ellipse(r() * 160, r() * 160, s * 1.6, s, 0, 0, 6.3); g.fill();
    }
    dirtPat = ctx.createPattern(c, 'repeat');
  })();

var MKEY = 'chekushka-music-v1';

var music = { apf: [1, 1, 1, 1, 1, 1, 1], on: true, vol: 0.5, track: 0, sfx: true, auto: true, mat: true, fps: false, ping: false, hq: false, bm: true,
    preset: 'hd', vignette: true, bloom: true, grain: false, particles: true, shake: true, uiAnim: true };

try {
    var mr = localStorage.getItem(MKEY);
    if (mr) {
      var ms = JSON.parse(mr);
      if (typeof ms.on === 'boolean') music.on = ms.on;
      if (typeof ms.sfx === 'boolean') music.sfx = ms.sfx;
      if (typeof ms.auto === 'boolean') music.auto = ms.auto;
      if (Array.isArray(ms.apf) && ms.apf.length === 7) music.apf = ms.apf.map(function (x) { return x ? 1 : 0; });
      if (typeof ms.mat === 'boolean') music.mat = ms.mat;
      if (typeof ms.fps === 'boolean') music.fps = ms.fps;
      if (typeof ms.ping === 'boolean') music.ping = ms.ping;
      if (typeof ms.hq === 'boolean') music.hq = ms.hq;
      if (typeof ms.bm === 'boolean') music.bm = ms.bm;
      if (ms.preset === 'lite' || ms.preset === 'hd' || ms.preset === 'ultra') music.preset = ms.preset;
      if (typeof ms.vignette === 'boolean') music.vignette = ms.vignette;
      if (typeof ms.bloom === 'boolean') music.bloom = ms.bloom;
      if (typeof ms.grain === 'boolean') music.grain = ms.grain;
      if (typeof ms.particles === 'boolean') music.particles = ms.particles;
      if (typeof ms.shake === 'boolean') music.shake = ms.shake;
      if (typeof ms.uiAnim === 'boolean') music.uiAnim = ms.uiAnim;
      if (typeof ms.vol === 'number') music.vol = Math.min(1, Math.max(0, ms.vol));
      if (typeof ms.track === 'number' && ms.track >= 0 && ms.track < TRACKS.length) music.track = ms.track;
    }
  } catch (e) {}

try {
    if (!localStorage.getItem('chk_auto_default_v2')) {
      music.auto = true;
      localStorage.setItem('chk_auto_default_v2', '1');
      saveMusic();
    }
  } catch (e) {}

var audio = new Audio();

audio.loop = true;

audio.preload = 'auto';

audio.volume = music.vol;

var retried = false, started = false;

audio.addEventListener('error', function () {
    if (retried) return;
    retried = true;
    try {
      var d = TRACKS[music.track].src; if (d.indexOf('data:') !== 0) return;
      var bin = atob(d.split(',')[1]), arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      audio.src = URL.createObjectURL(new Blob([arr], { type: 'audio/mp4' }));
      if (music.on && started) audio.play().catch(function () {});
    } catch (e) {}
  });

loadTrack();

document.addEventListener('pointerdown', firstTouch, true);

document.addEventListener('keydown', firstTouch, true);

document.addEventListener('visibilitychange', function () {
    if (document.hidden) audio.pause(); else if (started) tryPlay();
  });

var actx = null;

var BM = {
    fight: {
      bpm: 142, root: 45, sc: [0, 2, 3, 5, 7, 8, 10], wave: 'square', bass: 'oct', swing: 0,
      verse: [0, 5, 3, 6], chorus: [0, 6, 5, 4], brk: [5, 6, 4, 4],
      mv: [7, -1, -1, 7, -1, 8, -1, 7, -1, 5, -1, -1, 4, -1, 5, -1], mc: [7, -1, 9, -1, 11, -1, 9, 8, 7, -1, 8, -1, 9, -1, -1, -1],
      arp: [0, 2, 4, 2, 0, 2, 4, 7]
    },
    boss: {
      bpm: 158, root: 38, sc: [0, 1, 3, 5, 7, 8, 10], wave: 'sawtooth', bass: 'gallop', swing: 0,
      verse: [0, 0, 1, 0], chorus: [0, 1, 6, 5], brk: [1, 1, 0, 0],
      mv: [7, -1, 7, 8, -1, 7, -1, 5, 4, -1, 4, 5, -1, 4, -1, 1], mc: [11, -1, 10, -1, 9, 10, -1, 11, 12, -1, 11, -1, 9, -1, 8, -1],
      arp: [0, 3, 4, 3, 0, 3, 4, 7]
    },
    final: {
      bpm: 174, root: 40, sc: [0, 2, 3, 5, 7, 8, 11], wave: 'sawtooth', bass: 'drive', swing: 0,
      verse: [0, 5, 6, 4], chorus: [0, 5, 2, 6], brk: [5, 4, 5, 6],
      mv: [7, 7, -1, 9, -1, 7, -1, 6, 7, -1, 9, -1, 11, -1, 9, -1], mc: [14, -1, 11, 12, -1, 14, -1, 16, 14, -1, 12, -1, 11, -1, 9, -1],
      arp: [0, 4, 2, 7, 4, 2, 7, 9]
    }
  };

var bmS = { mode: '', c: null, g: null, step: 0, next: 0, noise: null, bus: null, paused: false };

var elCarry = document.getElementById('nCarry');

var elCoins = document.getElementById('nCoins');

var elClean = document.getElementById('nClean'), chipClean = document.getElementById('cleanChip');

var elWool = document.getElementById('nWool'), chipWool = document.getElementById('woolChip');

var seenRar = {}, washTip = false, stopHint = false;

var elNutMini = document.getElementById('nutMini'), elArmyMini = document.getElementById('armyMini');

var elNNut = document.getElementById('nNut'), elNArmy = document.getElementById('nArmy');

var bDn = document.getElementById('bDn'), bExit = document.getElementById('bExit'), bSonar = document.getElementById('bSonar');

var bThrow = document.getElementById('bThrow'), bFeed = document.getElementById('bFeed'), bAmmo = document.getElementById('bAmmo');

var elPill = document.getElementById('pill');

var elToast = document.getElementById('toast');

var bSell = document.getElementById('bSell');

var lastHud = '';

var elRateNum = document.getElementById('rateNum'), elRatePc = document.getElementById('ratePc');

var lastRate = '', elRateChip = document.getElementById('rateChip'), elNoSig = document.getElementById('noSig');

var airBtn = document.getElementById('airBtn');

var lastAir = '';

airBtn.addEventListener('click', function () { callAir(); });

var elReward = document.getElementById('reward'), rewardTimer = 0;

var toastTimer = null;

var tutorialDone = false;

setTimeout(function () {
    toast(touch
      ? 'Кнопки внизу: иди и прыгай. У чекушки жми «Подобрать» (автоподбор включается в настройках), потом неси в магазин слева.'
      : 'Стрелки: ходить, \u2191 или пробел: прыжок. Подойди к чекушке и нажми E, чтобы подобрать (автоподбор включается в настройках). Потом неси в магазин слева, там тоже E.', 7000);
  }, 300);

var KEY_ACTIONS = [
    { id: 'left', n: 'Влево' }, { id: 'right', n: 'Вправо' }, { id: 'jump', n: 'Прыжок' }, { id: 'act', n: 'Действие (подобрать, сдать, автобус)' },
    { id: 'air', n: 'Аирдроп' }, { id: 'throw', n: 'Бросить чекушку' }, { id: 'feed', n: 'Дать орешек белке' }, { id: 'ammo', n: 'Сменить снаряд' },
    { id: 'special', n: 'Особый аирдроп' }, { id: 'inv', n: 'Инвентарь' }, { id: 'chat', n: 'Быстрый чат' }, { id: 'phone', n: 'Телефон' },
    { id: 'magic', n: 'Донат-магия' }, { id: 'dive', n: 'Вниз (подлодка)' }, { id: 'harp', n: 'Гарпун (лодка, Кракен)' }, { id: 'sonar', n: 'Сонар (подлодка)' }, { id: 'exitv', n: 'Выйти из транспорта' }
  ];

var KEY_DEFAULTS = {
    left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'], jump: ['Space', 'KeyW'], act: ['KeyE', 'Enter'],
    air: ['KeyQ', ''], throw: ['KeyF', ''], feed: ['KeyR', ''], ammo: ['KeyV', ''], special: ['KeyZ', ''], inv: ['KeyI', ''], chat: ['KeyT', ''], mic: ['KeyM', ''], phone: ['KeyP', ''], magic: ['KeyG', ''], dive: ['KeyS', ''], sonar: ['KeyC', ''], harp: ['KeyH', ''], exitv: ['KeyX', '']
  };

var KEY_ALIAS = { ArrowUp: 'jump', ArrowDown: 'act', NumpadEnter: 'act' };

var KEYB = {};

keysReset();

try {
    var kr = JSON.parse(localStorage.getItem('chekushka-keys-v1') || 'null');
    if (kr && typeof kr === 'object') KEY_ACTIONS.forEach(function (a) {
      if (Array.isArray(kr[a.id])) KEYB[a.id] = [String(kr[a.id][0] || '').slice(0, 20), String(kr[a.id][1] || '').slice(0, 20)];
    });
  } catch (e) {}

var keyCapture = false;

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var kind = keyKind(e);
    if (!kind || paused || chatTyping) return;
    // чтобы пробел и Enter не нажимали заново последнюю нажатую кнопку
    var ae = document.activeElement;
    if (ae && ae.tagName === 'BUTTON') ae.blur();
    e.preventDefault();
    if (e.code === 'ArrowDown' && (subActive() || av.on)) { input.dn = true; return; }
    if (kind === 'left' || kind === 'right') input[kind] = true;
    else if (kind === 'dive') input.dn = true;
    else if (kind === 'exitv') { if (!e.repeat) exitVehicle(); }
    else if (kind === 'sonar') { if (!e.repeat) sonarPing(); }
    else if (kind === 'magic') { if (!e.repeat) magicCast(); }
    else if (kind === 'harp') { if (!e.repeat) krHarp(); }
    else if (kind === 'jump') { input.up = true; if (!e.repeat) jumpTimer = 0.14; }
    else if (kind === 'air') { if (!e.repeat) callAir(); }
    else if (kind === 'act') { if (!e.repeat) act(); }
    else if (kind === 'throw') { thr.key = true; if (!e.repeat) throwBottle(); }
    else if (kind === 'feed') { if (!e.repeat) feedSquirrel(); }
    else if (kind === 'ammo') { if (!e.repeat) cycleAmmo(); }
    else if (kind === 'special') { if (!e.repeat) callSpecial(); }
  });

document.addEventListener('keyup', function (e) {
    var kind = keyKind(e);
    if (e.code === 'ArrowDown') input.dn = false;
    if (kind === 'left' || kind === 'right') input[kind] = false;
    else if (kind === 'dive') input.dn = false;
    else if (kind === 'jump') input.up = false;
    else if (kind === 'throw') thr.key = false;
    if ((kind === 'jump' || kind === 'act') && !paused) e.preventDefault();
  });

window.addEventListener('blur', function () { input.left = input.right = input.up = input.dn = false; thr.key = thr.ptr = thr.btn = false; });

hold('bL', function () { input.left = true; }, function () { input.left = false; });

hold('bR', function () { input.right = true; }, function () { input.right = false; });

hold('bJ', function () { jumpTimer = 0.14; input.up = true; }, function () { input.up = false; });

hold('bDn', function () { input.dn = true; }, function () { input.dn = false; });

hold('bExit', function () { exitVehicle(); });

hold('bSonar', function () { sonarPing(); });

hold('bHarp', function () { krHarp(); });

hold('bMagic', function () { magicCast(); });

hold('bSell', function () { act(); });

hold('bThrow', function () { thr.btn = true; throwBottle(); }, function () { thr.btn = false; });

hold('bFeed', function () { feedSquirrel(); });

hold('bAmmo', function () { cycleAmmo(); });

cv.addEventListener('pointerdown', function () { if (paused || (!boss.on && !kk.on)) return; thr.ptr = true; throwBottle(); });

window.addEventListener('pointerup', function () { thr.ptr = false; });

window.addEventListener('pointercancel', function () { thr.ptr = false; });

var popups = [];

var fullT = 0;

var shopFlash = 0, sellMode = '', lastPill = '';

var wash = { on: false, acc: 0 };

var wools = [], woolT = 0, hp = maxHp(), hurtFlash = 0, woolSeen = false;

(function () { var x = 4000; while (x < WORLD_W - 200 && wools.length < 22) { addWool(x); x += 700 + Math.random() * 700; } })();

var elHurt = document.getElementById('hurt'), lastHurt = -1;

var dn = { on: false, t: 0 };

var gh = { on: false, x: 0, key: '' }, rvBoost = 0;

var bus = { on: false, st: '', x: 0, v: 0, t: 0, alpha: 1, hide: false, stop: null, dest: null, dir: -1, cross: null };

var EVENTS = [
    { name: 'Праздник',        m: 1.6,  txt: 'Праздник в посёлке! Тару разбирают, курс растёт.' },
    { name: 'Ярмарка',         m: 1.4,  txt: 'Ярмарка! Приёмщик берёт тару охотнее.' },
    { name: 'Дефицит стекла',  m: 1.8,  txt: 'На заводе стоят печи, стекла не хватает. Тара в цене!' },
    { name: 'Заготовитель',    m: 1.3,  txt: 'Приехал заготовитель из города и скупает тару.' },
    { name: 'Фестиваль',       m: 1.5,  txt: 'В посёлке фестиваль! Тары уходит море, курс растёт.' },
    { name: 'Оптовик',         m: 1.35, txt: 'Приехал оптовик и берёт тару крупными партиями.' },
    { name: 'Рейд',            m: 0.5,  txt: 'Рейд проверяющих! Приёмщик прячет кассу, курс упал.' },
    { name: 'Склад завален',   m: 0.6,  txt: 'Склад завален тарой, приёмщик снижает цену.' },
    { name: 'Санитарный день', m: 0.7,  txt: 'Санитарный день: магазин берёт тару неохотно.' },
    { name: 'Ревизия',         m: 0.55, txt: 'Ревизия! Приёмщик боится ошибиться в кассе.' }
  ];

var rate = { t: RATE_CD, dir: 0, hist: [save.rate], ev: null, evT: 15 + Math.random() * 15, last: -1, low: 0, noBad: 0 };

var elEv = document.getElementById('evChip'), lastEv = '';

var PHONE_PRICE = 300, DATA_UNL = 7000, DATA_RATE = 0.25;

var DATA_PACKS = [{ mb: 100, price: 60 }, { mb: 500, price: 250 }, { mb: 2000, price: 900 }];

var dataAcc = 0, dataWarn = false;

var mk = { t: CC_TICK, ch: 0, shown: -1 };

var mkHist = (save.cch && save.cch.length) ? save.cch.slice() : [Math.round(save.ccp)];

(function mkCatchUp() {
    var now = Date.now();
    if (save.cct > 0 && now > save.cct) {
      var n = Math.min(90, Math.floor((now - save.cct) / (CC_TICK * 1000)));
      for (var i = 0; i < n; i++) { save.ccp = mkNext(save.ccp); mkHist.push(save.ccp); }
    }
    save.cct = now;
    while (mkHist.length > 40) mkHist.shift();
    save.cch = mkHist.slice();
  })();

var phoneOpen = false, phTab = 'x';

var phOverlay = document.getElementById('phoneOverlay'), phBody = document.getElementById('phBody');

var phChart = document.getElementById('phChart');

document.getElementById('closePhone').addEventListener('click', closePhone);

phOverlay.addEventListener('pointerdown', function (e) { if (e.target === phOverlay) closePhone(); });

document.getElementById('phTabX').addEventListener('click', function () { phTab = 'x'; renderPhone(); });

document.getElementById('phTabD').addEventListener('click', function () { phTab = 'd'; renderPhone(); });

(function () { var tb = document.createElement('button'); tb.type = 'button'; tb.id = 'phTabB'; tb.textContent = 'Банк'; tb.addEventListener('click', function () { phTab = 'b'; renderPhone(); }); document.getElementById('phTabD').parentNode.appendChild(tb); })();

var phTapAt = 0;

var phMiniEl = document.getElementById('phoneMini');

phMiniEl.addEventListener('click', phToggle);

phMiniEl.addEventListener('pointerup', function (e) { if (e.pointerType && e.pointerType !== 'mouse') phToggle(e); });

phMiniEl.addEventListener('touchend', phToggle, { passive: false });

phMiniEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') phToggle(e); });

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape' && phoneOpen) { closePhone(); return; }
    if (e.repeat || (e.target && e.target.tagName === 'INPUT')) return;
    if (keyCapture || actionOf(e.code) !== 'phone') return;
    e.preventDefault();
    if (phoneOpen) closePhone(); else openPhone();
  });

var lastPhoneUi = '';

var air = { cd: 0, plane: null, crates: [] };

var squirrels = [], sqT = 12, sqToast = false;

var SQ_H = 74, SQ_RUN = 255, SQ_FLEE = 285;

var hero = { on: false, x: 0, y: 0, dir: -1 }, heroT = 25, heroHint = false, heroCycles = 0;

var NPC_FACTS = [
    'Факт: стекло можно переплавлять снова и снова без потери качества.',
    'Факт: у кур четыре типа цветовых рецепторов, цвета они видят богаче людей.',
    'Факт: петухи кукарекают не только на рассвете, а в течение всего дня.',
    'Факт: у кур есть третье веко, оно защищает глаз.',
    'Факт: цыплята начинают «разговаривать» с наседкой ещё в яйце.',
    'Факт: куры умеют летать, но недалеко и невысоко.',
    'Факт: переработка стекла экономит энергию по сравнению с выплавкой нового.',
    'Факт: мытая чекушка стоит дороже грязной: промой её на мойке.',
    'Факт: за городом курса не видно, пока не купишь мобильные данные.',
    'Факт: в Городе Чекушек связь работает всегда, а вот чекушек там мало.',
    'Факт: белок в Парке много, а армия у петуха не больше пяти.',
    'Факт: красная мифическая чекушка стоит ×40 от курса. Я такую ещё не видел.',
    'Факт: белки воруют только те чекушки, что лежат на земле.',
    'Факт: у каждого петуха свой характер: у меня, например, золотой.'
  ];

var NPCS = [
    { id: 'collector', name: 'Собиратель чекушек', img: 'npcCollector', h: 150, x: 1300, home: 1300, dir: 1, sit: false, t: 0, say: '', sayT: 0, nextT: 1.5, walk: 0, stoop: 0, pause: 0, lines: NPC_FACTS }
  ];

var LOCS = [
    { id: 0, name: 'Посёлок', w: 20000, left: 1, right: 2 },
    { id: 1, name: 'Город Чекушек', w: 3800, left: 3, right: 0, target: 12, resp: 14, luck: 0.15, wild: 0, theme: 'city' },
    { id: 2, name: 'Парк', w: 4800, left: 0, right: 11, target: 46, resp: 4, luck: 0.1, wild: 5, theme: 'park' },
    { id: 3, name: 'Аэропорт', w: 7300, left: 6, right: 1, wifi: [1050, 2350], target: 28, resp: 7, luck: 0.55, wild: 1, theme: 'airport' },
    { id: 4, name: 'Мальдивы', w: 4300, target: 44, resp: 4, luck: 0, wild: 0, theme: 'beach' },
    { id: 5, name: 'Открытое море', w: 22000, left: 4, right: 7, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'sea' },
    { id: 6, name: 'Город Белого Дома', w: 3600, left: 9, right: 3, target: 14, resp: 12, luck: 0.35, wild: 0, theme: 'wcity' },
    { id: 7, name: 'Необитаемый остров', w: 3400, left: 5, right: 8, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'island' },
    { id: 8, name: 'Пещера', w: 2700, left: 7, right: 12, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'cave' },
    { id: 9, name: 'Больница', w: 3000, left: 10, right: 6, target: 8, resp: 22, luck: 0.3, wild: 0, theme: 'hospital' },
    { id: 10, name: 'Город Моггити', w: 4200, right: 9, target: 8, resp: 20, luck: 0.3, wild: 0, theme: 'moggity' },
    { id: 11, name: 'Лес', w: 3600, left: 2, target: 24, resp: 7, luck: 0.12, wild: 0, theme: 'forest' },
    { id: 12, name: 'Секретная лаборатория', w: 2900, left: 8, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'seclab' },
    { id: 13, name: 'Больница (внутри)', w: 2700, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'hospin' },
    { id: 14, name: 'Офис Моггити', w: 2200, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'moffice' },
    { id: 15, name: 'Чало Хаус', w: 3200, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'farm' },
    { id: 16, name: 'Небо', w: 40000, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'sky' },
    { id: 17, name: 'Чало Хаус (руины)', w: 3200, left: 20, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'farmx' },
    { id: 18, name: 'Терминал (внутри)', w: 2400, wifi: [0, 2400], target: 0, resp: 99999, luck: 0, wild: 0, theme: 'termin' },
    { id: 19, name: 'Новая лаборатория', w: 3000, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'nlab' },
    { id: 20, name: 'Разрушенная лаборатория', w: 3000, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'blab' },
    { id: 21, name: 'Чикен Ган: лагерь бунта', w: 3600, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'cgcamp' },
    { id: 22, name: 'Чужая вселенная', w: 3400, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'uni' },
    { id: 23, name: 'Бургерная «Чекушка-Бургер»', w: 4200, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'burger' },
    { id: 24, name: 'Церковь', w: 2600, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'church' },
    { id: 25, name: 'Небеса', w: 3000, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'heaven' },
    { id: 26, name: 'Кладбище', w: 2600, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'cemetery' },
    { id: 27, name: 'Дом Кокича', w: 2100, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'khome' },
    { id: 28, name: 'Базар', w: 3200, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'bazaar' },
    { id: 29, name: 'Суд', w: 2400, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'court' },
    { id: 30, name: 'Тюрьма', w: 2200, target: 0, resp: 99999, luck: 0, wild: 0, theme: 'jail' }
  ];

var BG_X = 2420, BG_OUT = 140, BG_C = 800, BG_FAT = 250, BG_DBL = 600, BG_MEGA = 1200;

var LOC_STOPS = { 1: { x: 450, name: 'Город Чекушек', link: true, loc: 1 }, 3: { x: 420, name: 'Аэропорт', link: true, loc: 3 }, 6: { x: 450, name: 'Белый Дом', link: true, loc: 6 }, 9: { x: 300, name: 'Больница', link: true, loc: 9 }, 10: { x: 300, name: 'Город Моггити', link: true, loc: 10 }, 2: { x: 330, name: 'Парк', link: true, loc: 2 }, 11: { x: 330, name: 'Лес', link: true, loc: 11 } };

var LOC_RNAME = { 0: 'В посёлок', 1: 'В Город Чекушек', 3: 'В Аэропорт', 6: 'В Город Белого Дома', 9: 'В Больницу', 10: 'В Город Моггити', 2: 'В Парк', 11: 'В Лес' };

var LOC_ORDER = [10, 9, 6, 3, 1, 0, 2, 11];

var LINK_PRICE = {};

(function () { var seg = [100, 90, 80, 60, 60, 50, 60], nL = LOC_ORDER.length; for (var a = 0; a < nL; a++) for (var b = 0; b < nL; b++) if (a !== b) { var lo = Math.min(a, b), hi = Math.max(a, b), sum = 0; for (var q = lo; q < hi; q++) sum += seg[q]; LINK_PRICE[LOC_ORDER[a] + '-' + LOC_ORDER[b]] = sum; } })();

var locSt = {}, lt = { st: '', t: 0, dest: 0, side: 'left', warn: 0 };

var elFade = document.getElementById('fade');

var BB_TXT = ['ЧЕКУШКА ДНЯ', 'ДЕФИЦИТ БЕНЗИНА!', 'МАЛЬДИВЫ ЖДУТ', 'СДАЙ ТАРУ', 'КУРС ВЫРОС'];

var TRIP_COST = 1, TRIP_LEG = 15, TRIP_WAIT = 30, TICKET_PRICE = 10000;

var HOME_X = 430, MALD_ARRIVE_X = 640, AIR_BACK_X = 2250;

var trip = { st: '', by: '', n: '', end: 0, b: 0, t: 0, inn: false, depT: 0 };

var tripMenuOpen = false;

var drGear = -1, drRamp = 0, drEng = 15;

var jetA = mkJet(900, '#2a6fdb', 0.92, 14), jetM = mkJet(2450, '#e5484d', 1, 0);

var elTrip = document.getElementById('flOverlay'), elTripCost = document.getElementById('flCost'), elTripNote = document.getElementById('flNote');

var elTripBuy = document.getElementById('flBuy');

var elTripGo = document.getElementById('flGo'), elTripBanner = document.getElementById('flBanner');

document.getElementById('flImg').src = SRC.bMyth;

elTripBuy.addEventListener('click', function () {
    if (save.coins < TICKET_PRICE) { sfx('no'); toast('Не хватает коинов: билет стоит ' + TICKET_PRICE.toLocaleString('ru-RU') + '.', 2800); return; }
    if (!nearTripPlane()) { closeTripMenu(); return; }
    save.coins -= TICKET_PRICE; save.tickets = (save.tickets | 0) + 1; persist(); hud(); sfx('sell');
    popup(P.x, PLAYER_H + 20, '\u2212' + TICKET_PRICE.toLocaleString('ru-RU'), '#ffb4b4');
    toast('Билет куплен. Нажми «Купить билет» ещё раз, чтобы лететь.', 3500);
    openTripMenu();
  });

document.getElementById('flNo').addEventListener('click', closeTripMenu);

elTripGo.addEventListener('click', tripBuy);

elTrip.addEventListener('pointerdown', function (e) { if (e.target === elTrip) closeTripMenu(); });

var lastTripUi = '';

var QUESTS = [
    qNum(function () { return save.army; }, 1, 'Приручи 1 белку', { coins: 120 }),
    qNum(function () { return save.qSold; }, 40, 'Сдай в магазин 40 чекушек', { coins: 250 }),
    qNum(function () { return save.army; }, 3, 'Приручи 3 белки', { coins: 250, b: [[1, 3]] }),
    qFlag(function () { return save.phone; }, 'Купи телефон в гараже (вкладка «Связь»)', { coins: 150 }),
    qNum(function () { return save.qClean; }, 10, 'Помой и сдай 10 чекушек', { coins: 300 }),
    qFlag(function () { return qAch('park'); }, 'Зайди в Парк', { coins: 200, b: [[2, 1]] }),
    qFlag(function () { return qAch('airport'); }, 'Дойди до Аэропорта', { coins: 400, b: [[2, 2]] }),
    qNum(function () { return save.coins; }, 3000, 'Накопи 3000 коинов', { coins: 500 }),
    qFlag(function () { return save.ownBus; }, 'Купи личный автобус в гараже', { coins: 600, b: [[3, 1]] }),
    qNum(function () { return save.cc; }, 10, 'Держи на бирже 10 Чекушка-коинов', { coins: 500 }),
    qNum(function () { return save.army; }, 5, 'Собери армию из 5 белок', { coins: 600, b: [[4, 1]] }),
    qNum(function () { return save.qRare; }, 15, 'Сдай 15 редких чекушек и выше', { coins: 800, b: [[3, 1]] }),
    qNum(function () { return save.wins; }, 1, 'Победи Хоумлендера', { coins: 1500, b: [[4, 1]] }),
    qNum(function () { return save.wins; }, 2, 'Победи Хоумлендера второй раз', { coins: 2000, b: [[4, 2]] }),
    qNum(function () { return typeof achOwn !== 'undefined' ? Object.keys(achOwn).length : 0; }, 10, 'Получи 10 ачивок', { ticket: 1 })
  ];

var QM = 3;

var WEST_END = 2300;

var sea = { veh: 'boat' };

var sub = { d: 0, vy: 0, px: 300, bump: 0, bub: 0, lastBub: 0, grab: 0, pw: 0, pwT: 0 };

var camY = 0;

var bubbles = [];

var SUB_HALF = 30;

var PEARL_PRICE = 25, PEARL_CYCLE = 20 * 60 * 1000;

var PEARL_X = [880, 1700, 2650, 3500, 4300, 5100, 5900, 6600];

var ZONE2_X = 11000, KR_D0 = 2350, KR_D1 = 4500;

var SUB_DEPTH = [450, 1100, 2600, 5000], SUB_HULL = [100, 140, 190, 250], SUB_SONAR = [900, 1250, 1700, 2300], SUB_SONAR_CD = [8, 7, 6, 5];

var SUB_UP = { sd: [4000, 9000, 25000], sh: [3000, 7000, 14000], ss: [2500, 6000, 12000] };

var smpEl = {}, smpPlaying = {};

var kr = { t: 12, at: '', dived: false, hint: false, beachHint: false };

var SONAR_SHOW = 7, SONAR_RING = 2.2;

var sn = { cd: 0, age: -1, kT: 0, blips: [] };

var LAG_X = 2400, SHOP_FX = 3540, SUB_X = 3000, BOAT_X = 4200, PIER_FISH_X = 3700, BOAT_PRICE = 6000, SUB_PRICE = 15000;

var FISH = [
    { id: 'sardine', n: 'Сардинка', w: 'p', wt: 45, d: 0.10, pr: 20, c: '#9fc3e6', k: 'std' },
    { id: 'perch', n: 'Окунь', w: 'p', wt: 30, d: 0.20, pr: 45, c: '#79b866', k: 'std' },
    { id: 'clown', n: 'Рыба-клоун', w: 'p', wt: 18, d: 0.30, pr: 100, c: '#ff8a2b', k: 'clown' },
    { id: 'ray', n: 'Скат', w: 'p', wt: 7, d: 0.40, pr: 220, c: '#8a93b8', k: 'ray' },
    { id: 'tuna', n: 'Тунец', w: 's', wt: 38, d: 0.45, pr: 300, c: '#4f7fc4', k: 'std' },
    { id: 'barra', n: 'Барракуда', w: 's', wt: 28, d: 0.55, pr: 450, c: '#9aa7b3', k: 'long' },
    { id: 'sword', n: 'Рыба-меч', w: 's', wt: 18, d: 0.66, pr: 900, c: '#3e5f9a', k: 'sword' },
    { id: 'shark', n: 'Акула', w: 's', wt: 10, d: 0.80, pr: 2200, c: '#7f8c9a', k: 'shark' },
    { id: 'gold', n: 'Золотая рыба-чекушка', w: 's', wt: 3.5, d: 0.88, pr: 9000, c: '#ffc928', k: 'gold' },
    { id: 'google', n: 'Гугл-фиш', w: 'x', wt: 0, d: 1, pr: 50000, c: '#ffffff', k: 'rainbow', secret: 1 }
  ];

var FISH_BY = {};

FISH.forEach(function (f) { FISH_BY[f.id] = f; });

var ROD_NAMES = ['Палка с ниткой', 'Бамбуковая', 'Стекловолокно', 'Карбон', 'Титан', 'Золотая удочка'];

var FS_COST = { rod: 300, reel: 450, bait: 400, motor: 1200 };

var FS_MAXL = { rod: 5, reel: 4, bait: 4, motor: 4 };

var rip = { on: 0, x: 0, left: 0, cd: 80 + Math.random() * 80 };

var shoals = [];

(function () { var r = rng(777); for (var i = 0; i < 28; i++) shoals.push({ x: 700 + i * 640 + r() * 260, ph: r() * 6 }); })();

var fsh = { open: 0, st: 'ready', t: 0, wait: 0, win: 0, fish: null, prog: 0, cy: 0.5, cv: 0, fy: 0.5, ft: 0.5, fint: 0, hold: 0, lock: 0, msg: '', sea: false, spot: '', isNew: false, last: 0, bob: 0 };

var elFish = document.getElementById('fishOverlay'), elFishCv = document.getElementById('fishCv'), elFishMsg = document.getElementById('fishMsg');

var elFishBtn = document.getElementById('fishBtn'), fcx = elFishCv.getContext('2d');

var fishRaf = 0;

elFishBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); fishPress(); });

['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { elFishBtn.addEventListener(n, fishRelease); });

elFishBtn.addEventListener('contextmenu', function (e) { e.preventDefault(); });

document.getElementById('fishClose').addEventListener('click', fishClose);

elFish.addEventListener('pointerdown', function (e) { if (e.target === elFish) fishClose(); });

window.addEventListener('keydown', function (e) {
    if (!fsh.open) return;
    if (e.code === 'Escape') { e.stopPropagation(); fishClose(); return; }
    if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault(); e.stopPropagation();
      if (!e.repeat) fishPress(); else if (fsh.st === 'fight') fsh.hold = 1;
    }
  }, true);

window.addEventListener('keyup', function (e) {
    if (!fsh.open) return;
    if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter' || e.code === 'ArrowUp' || e.code === 'KeyW') { e.stopPropagation(); fishRelease(); }
  }, true);

var elFs = document.getElementById('fshopOverlay'), elFsBody = document.getElementById('fsBody'), fshopOpen = false, fsSure = false;

var FSAT_CAP = 30000, FSAT_COOL = 25;

var HARP_PRICE = 3500;

var SUB_UP_INFO = {
    sd: ['Глубина погружения', function (l) { return 'до ' + Math.round(SUB_DEPTH[l] / 10) + ' м'; }, 'Открывает глубокие зоны. Последний уровень (до 500 м) нужен для встречи с Кракеном: он живёт на глубине 235–450 м.'],
    sh: ['Прочность корпуса', function (l) { return SUB_HULL[l] + ' ед'; }, 'Корпус выдерживает больше ударов в бою с Кракеном.'],
    ss: ['Сонар', function (l) { return 'радиус ' + SUB_SONAR[l] / 10 + ' м, перезарядка ' + SUB_SONAR_CD[l] + ' с'; }, 'Видит дальше и заряжается быстрее.']
  };

elFsBody.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-fa]') : null; if (!b) return;
    var a = b.getAttribute('data-fa'), k;
    if (a !== 'sellg') fsSure = false;
    if (a === 'boat') {
      if (save.coins < BOAT_PRICE) { sfx('no'); toast('Не хватает коинов на лодку.', 2200); return; }
      save.coins -= BOAT_PRICE; save.fs.boat = 1; persist(); hud(); sfx('sell'); ach('boat'); toast('Лодка твоя! Она у причала справа.', 3500);
    } else if (a === 'sub') {
      if (save.fs.sub) { sfx('no'); return; }
      if (save.coins < SUB_PRICE) { sfx('no'); toast('Подлодка стоит ' + fmtN(SUB_PRICE) + '. Не хватает ' + fmtN(SUB_PRICE - save.coins) + ' коинов.', 3500); return; }
      save.coins -= SUB_PRICE; save.fs.sub = 1; persist(); hud(); sfx('sell'); ach('sub'); toast('Подводная лодка куплена! Она навсегда твоя.', 4000);
    } else if (a === 'harp') {
      if (save.fs.harp) { sfx('no'); return; }
      if (!save.fs.boat) { sfx('no'); toast('Сначала купи лодку.', 2200); return; }
      if (save.coins < HARP_PRICE) { sfx('no'); toast('Гарпун стоит ' + fmtN(HARP_PRICE) + '. Не хватает ' + fmtN(HARP_PRICE - save.coins) + '.', 3000); return; }
      save.coins -= HARP_PRICE; save.fs.harp = 1; persist(); hud(); sfx('sell'); toast('Гарпун куплен! В бою с Кракеном стреляй с лодки.', 3500);
    } else if (a === 'tp') {
      if (save.fs.tp) { sfx('no'); return; }
      if (!(save.mx.lr & 8) || !save.fs.sub || save.fs.sd < 3) { sfx('no'); toast('Торпеду мастер соберёт, когда ты узнаешь о сокровище (секретная лаборатория) и прокачаешь глубину до 500 м.', 4500); return; }
      if (save.coins < TORP_PRICE) { sfx('no'); toast('Торпеда стоит ' + fmtN(TORP_PRICE) + '. Не хватает ' + fmtN(TORP_PRICE - save.coins) + '.', 3000); return; }
      save.coins -= TORP_PRICE; save.fs.tp = 1; persist(); hud(); sfx('sell'); toast('Торпеда куплена! Ищи Ктулху у Глубинного сокровища.', 4500);
    } else if (a.indexOf('sup:') === 0) {
      k = a.slice(4);
      if (!SUB_UP[k] || !save.fs.sub) { sfx('no'); return; }
      var lv = save.fs[k];
      if (lv >= 3) { sfx('no'); return; }
      var sc = SUB_UP[k][lv];
      if (save.coins < sc) { sfx('no'); toast('Не хватает ' + fmtN(sc - save.coins) + ' коинов.', 2200); return; }
      save.coins -= sc; save.fs[k] = lv + 1; persist(); hud(); sfx('sell');
      toast(SUB_UP_INFO[k][0] + ': ' + SUB_UP_INFO[k][1](lv + 1) + '.', 3000);
      if (k === 'sd' && lv + 1 === 3) toast('Подлодка выдержит любую глубину. Теперь она готова к встрече с Кракеном под водой.', 5000);
    } else if (a.indexOf('up:') === 0) {
      k = a.slice(3);
      if (k === 'motor' && !save.fs.boat) { sfx('no'); return; }
      if (save.fs[k] >= FS_MAXL[k]) return;
      var cost = fsCost(k);
      if (save.coins < cost) { sfx('no'); toast('Не хватает коинов.', 2000); return; }
      save.coins -= cost; save.fs[k]++; persist(); hud(); sfx('sell');
    } else if (a === 'sell') {
      var raw = fishValue(false); if (raw <= 0) { sfx('no'); return; }
      var v = fishPayout(raw); save.fsat = Math.min(60000, fsatNow() + raw); save.fsatT = Date.now();
      save.coins += v; for (k in save.fb) if (!FISH_BY[k].secret) delete save.fb[k];
      persist(); hud(); sfx('sell'); toast('Продано рыбы на ' + fmtN(v) + ' коинов.', 2500);
    } else if (a === 'sellg') {
      if (!fsSure) { fsSure = true; renderFshop(); return; }
      var gv = FISH_BY.google.pr * (save.fb.google || 0); save.coins += gv; delete save.fb.google; fsSure = false; persist(); hud(); sfx('sell'); toast('Гугл-фиш продан за ' + fmtN(gv) + ' коинов.', 3000);
    }
    renderFshop();
  });

document.getElementById('fsClose').addEventListener('click', closeFshop);

elFs.addEventListener('pointerdown', function (e) { if (e.target === elFs) closeFshop(); });

var aw = { t: 0 };

var WH_X = 1800;

var LAB_KINDS = [
    { n: 'Мутант-чекушка', c: '#7dff3a', glow: '125,255,58', pr: 200 },
    { n: 'Кристальная чекушка', c: '#7fe4ff', glow: '127,228,255', pr: 600 },
    { n: 'Плазменная чекушка', c: '#ff5af0', glow: '255,90,240', pr: 1500 }
  ];

var LAB_RESTOCK = 10 * 60 * 1000;

var labSpr = {};

var MQ = [
    mqNum(function () { return fishCaughtAll(); }, 10, 'Поймай 10 рыб', { coins: 800 }),
    mqNum(function () { return save.coins; }, 10000, 'Накопи 10 000 коинов', { coins: 1500, b: [[4, 1]] }),
    mqNum(function () { return save.mx.pn; }, 5, 'Подними 5 жемчужин на дне моря', { coins: 1500 }),
    mqNum(function () { return save.mx.ln; }, 3, 'Принеси 3 образца из лаборатории на острове', { coins: 3000 }),
    mqNum(function () { return Math.min(save.mx.lk[0], save.mx.lk[1], save.mx.lk[2]); }, 1, 'Найди образцы всех трёх видов', { coins: 6000, b: [[5, 1]] }),
    mqNum(function () { return save.wins || 0; }, 3, 'Победи Хоумлендера-Петуха три раза за всё время', { coins: 5000, b: [[5, 1]] })
  ];

var whOpen = false, whSayT = 0, whLine = 0;

var elWh = document.getElementById('whOverlay'), whCv = document.getElementById('whCv'), whX = whCv.getContext('2d');

var elWhSay = document.getElementById('whSay'), elWhQ = document.getElementById('whQ'), elWhTake = document.getElementById('whTake'), elWhSell = document.getElementById('whSell');

var WH_LINES = [
    'Заходи. Банка пустая, зато задания полные.',
    'Сила не в руках. Сила в сданных чекушках. Ну и в руках тоже.',
    'Ты сперва принеси, потом я скажу, что это было круто.',
    'Лаборатория на острове? Слышал. Кто принесёт образцы, тот молодец.',
    'Кабинет большой, а дел ещё больше. Давай по делу.'
  ];

elWhTake.addEventListener('click', function () {
    var q = mqCur();
    if (!q.done()) { sfx('no'); elWhSay.textContent = 'Пока рано. Вернёшься, когда сделаешь: ' + q.t.toLowerCase() + '.'; return; }
    qGive(q.rw); save.mx.mi++; if (save.mx.mi >= MQ.length) save.mx.mb = mqSnap(); persist(); hud(); sfx('rare'); ach('mell');
    popup(P.x, PLAYER_H + 30, '+' + (q.rw.coins || 0) + ' ' + coinWord(q.rw.coins || 0), '#ffd23f');
    elWhSay.textContent = 'Принято. Держи награду: ' + qRwText(q.rw) + '. Дальше: ' + mqCur().t.toLowerCase() + '.'; whRender();
  });

elWhSell.addEventListener('click', function () {
    var v = labValue(); if (v <= 0) { sfx('no'); return; }
    save.coins += v; save.mx.lab = [0, 0, 0]; persist(); hud(); sfx('sell'); popup(P.x, PLAYER_H + 30, '+' + fmtN(v), '#ffd23f');
    elWhSay.textContent = 'Образцы беру. Держи ' + fmtN(v) + ' коинов.'; whRender();
  });

document.getElementById('whOut').addEventListener('click', closeWH);

elWh.addEventListener('pointerdown', function (e) { if (e.target === elWh) closeWH(); });

document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && whOpen) closeWH(); });

var whRaf = 0, whLast = 0, whT = 0;

var CRASH_P = 0.2, FLY_T = 9, LAND_T = 4;

var flt = { on: false, t: 0, dest: 4, atX: 640, crash: false, rescue: false, tc: 5.8, hit: false, warned: false, fin: false };

var isl = { crashed: false, dest: 4 };

var elFltSkip = document.getElementById('fltSkip');

elFltSkip.addEventListener('click', function () { if (flt.crash && !flt.hit) { flt.t = flt.tc + 4.2; flt.hit = true; } else if (flt.crash) flt.t = flt.tc + 4.2; else flt.t = FLY_T + LAND_T; });

var FLARE_X = 780, CAVE_X = 3180;

var LAB_X = 1500;

var KR_HP = 800, KR_HP_PLUS = 400, KR_SUB_HP = 650, KR_RES = 0.25, KR_TIME = 300, KR_SUB_TIME = 240, KR_CD = 480;

var HARP_DMG = 110, HARP_CD = 1.5, HARP_RANGE = 760;

var KR_COINS1 = 5000, KR_COINS = 2500, KR_BONUS = 1000, KR_FAIL = 150, BOAT_HP = 120;

var ST_BASE = [15, 30], ST_STEP = 2;

var storm = { z: 0, acc: 0, next: 0, chance: 15, cd: 0, k: 0, tk: 0, fl: 0, ft: 6, rainT: 0, smpT: 14 };

var kk = { cth: false, on: false, mode: '', st: '', t: 0, age: 0, hp: 0, max: 0, ph: 1, left: 0, x: 0, rise: 0, cy: 'up', cyT: 0, side: 1, cd: 2, boat: 0, hull: 0, iF: 0, minHull: 1, dealt: 0, np: 1, solo: true, hcd: 0, tcd: 0, flash: 0, dv: false, dy: 300, stock: [], stT: 0, dropT: 2, ink: 0, noise: 0, str: 0, lastUp: false, lastDn: false, warnTxt: '', warnT: 0, hit: 0, whCd: 0, hintH: false };

var ktn = [], kwv = [], kwh = [], kslam = [], kdrops = [], kshots = [], kharp = [];

var krSess = 0, krPaid = 0, krRole = '', krOwner = '', krSnT = 0, krSn = null, krHp0 = 0;

var elBossName = document.getElementById('bossName'), bHarp = document.getElementById('bHarp');

var KSURF = function () { return gY + 16; };

var stormAu = null, noiseBuf = null;

var FP_STEP = 5000, FP_MAX = 1000, FP_MIN = 2;

var EP_HP = 800, EP_FLOOR = 200, EP_FAIL_CD = 3 * 60 * 1000, EP_FOOD = 30;

var EP_R = 230;

var ep = { on: false };

var epAs = false, epBid = 0;

var EP_ST = ['call', 'mell', 'fight1', 'moggi', 'finish', 'fatwarn', 'food', 'final', 'kill', 'end'];

var dlgOpened = false;

var elDlg = document.getElementById('dlgOv'), elDlgImg = document.getElementById('dlgImg'), elDlgWho = document.getElementById('dlgWho');

var elDlgTx = document.getElementById('dlgTx'), elDlgInfo = document.getElementById('dlgInfo'), elDlgBtns = document.getElementById('dlgBtns');

var bMagic = document.getElementById('bMagic');

var dlgCine = true, dlgTT = 0, dlgFull = '', dlgSw = document.getElementById('dlgStySwitch');

try { dlgCine = localStorage.getItem('chekushka-dlg') !== 'old'; } catch (e) {}

if (dlgSw) dlgSw.addEventListener('click', function () { dlgCine = !dlgCine; try { localStorage.setItem('chekushka-dlg', dlgCine ? 'cine' : 'old'); } catch (e) {} dlgApply(); });

dlgApply();

elDlg.addEventListener('click', function (e) { if (dlgCine && dlgTT && elDlgTx.textContent.length < dlgFull.length && !(e.target.closest && e.target.closest('.flbuy'))) { clearInterval(dlgTT); elDlgTx.textContent = dlgFull; } });

var dlgGuardT = 0;

document.addEventListener('keydown', function (e) { if (dlgOpened && e.code === 'Escape') dlgClose(); });

var RV = [
    { t: 'Собери 3 магические чекушки', n: 3, rw: 1200, life: 50, hint: 'Они появляются рядом с тобой. Взять их можно только магией.' },
    { t: 'Собери 6 магических чекушек', n: 6, rw: 2000, life: 45, hint: 'Магия копит силу: если её мало, подожди.' },
    { t: 'Собери 8 магических чекушек в Городе Чекушек, Парке или Аэропорте', n: 8, locs: [1, 2, 3], rw: 3600, life: 35, hint: 'В посёлке они сейчас не появляются: иди в город, парк или аэропорт.' },
    { t: 'Собери по 4 магические чекушки в Парке, Аэропорте и Городе Белого Дома', n: 4, per: [2, 3, 6], rw: 6400, life: 30, flee: true, hint: 'Эти чекушки пугливые и убегают, если подойти близко. Бей магией издалека.' },
    { t: 'Собери 15 убегающих магических чекушек в любом городе, парке или аэропорте', n: 15, locs: [1, 2, 3, 6], rw: 12000, life: 22, flee: true, hint: 'Живут недолго и убегают. Магия достаёт издалека: следи за силой.' }
  ];

var mgMana = 100, mgCd = 0, mgb = [], mgBeams = [], mgLoc = -1, mgSpawnT = 2, mgNoManaT = 0;

var MG_COST = 30, MG_R = 560;

var SK = [
    { id: 'fat', n: 'Расширение жира', cost: [25000, 80000, 200000], d: ['Жир-территория усиливает урон на 25%.', 'Жир-территория усиливает урон на 50%.', 'Максимум: расширение можно включить когда захочешь, но оно съедает почти всю магию (90). 10 секунд: урон ×1,8, получаемый урон вдвое меньше.'] },
    { id: 'sh', n: 'Щит', cost: [6000, 20000, 55000], d: ['Щит держит 3 секунды. Магия 25, перезарядка 14 с.', 'Щит держит 4,5 секунды, перезарядка 11 с.', 'Щит держит 6 секунд, перезарядка 8 с.'] },
    { id: 'lz', n: 'Лазер жира', cost: [9000, 30000, 80000], d: ['Луч жира бьёт по боссу на 28 урона. Магия 35, перезарядка 6 с.', 'Луч бьёт на 48 урона.', 'Луч бьёт на 75 урона и прожигает всё впереди.'] }
,    { id: 'fh', n: 'Жировое лечение', cost: [10000, 35000, 90000], d: ['Лечит 40% здоровья, но съедает почти всю магию (95). Если рядом повержен друг, поднимает его с полным здоровьем за 15% магии (12 с буста скорости и урона). Перезарядка 25 с.', 'Лечит 65% здоровья. Перезарядка 20 с.', 'Лечит всё и даёт 3 секунды неуязвимости. Если друг уже призрак: за 90% магии втягивает его в твоё тело, и он встаёт с полным здоровьем. Перезарядка 16 с.'] }
  ];

var skCh = 0;

var mgShield = 0, mgFat = 0, mgFatB = false, mgFatMax = 10, skCd = [0, 0, 0, 0], skLz = null, skFlash = 0;

var skBtn = [0, 1, 2, 3].map(function (i) {
    var b = document.createElement('button'); b.type = 'button'; b.hidden = true; b.className = 'skbtn sk' + i;
    b.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); skUse(i); });
    if (i === 2) { b.addEventListener('pointerup', function (e) { e.preventDefault(); skUse(2, true); }); b.addEventListener('pointercancel', function () { skUse(2, true); }); }
    document.body.appendChild(b); return b;
  });

document.addEventListener('keyup', function (e) { if (e.code === 'Digit3') skUse(2, true); });

window.addEventListener('blur', function () { if (skCh > 0) skCh = 0; });

document.addEventListener('keydown', function (e) {
    if (e.repeat || chatTyping) return; var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
    if (e.code === 'Digit1') skUse(0); else if (e.code === 'Digit2') skUse(1); else if (e.code === 'Digit3') skUse(2); else if (e.code === 'Digit4') skUse(3);
  });

var HOSP_X = 1500, mellPort = null;

var gxNoTr = 0;

var HATCH_X = 1190;

var DN_CYC = 360, dnLastPh = '';

var dnNote = { dusk: 'Наступает вечер.', night: 'Наступила ночь.', dawn: 'Светает.', day: 'Наступил день.' };

var pfa = [], pfGl = {};

var P5_HW = 640;

var p5 = { on: false, auto: false, st: '', t: 0, stage: 0, ar: 0, glit: 0, flash: 0, line: '', lineT: 0, ttl: '', ttlS: '', ttlT: 0, ttlM: 1, bar: 0,
    en: [], es: [], ps: [], cov: [], hom: null, kills: 0, need: 0, burg: [], pw: 1, rem: false, fat: false, cd: 0, scd: 0, sp: 0, spt: 0, wave: 0, sk: 4, cols: [], mt: 3, endI: 0, endT: 0, clones: false, fade: 0, mx: 0, hs: 0, slo: 0, cmb: 0, cmbT: 0, cmbP: 0, hurtT: 0, gh: 1 };

var P5_END = [
    'Но назад уже не вернуться…',
    'Время встаёт на места. Учёные, врачи, коллекторы и все остальные снова обычные петухи и курицы.',
    'Меллстрой по-прежнему стримит из своего кабинета.',
    'Чекушки больше никто не собирает. Теперь это просто напиток.',
    'Кокич остаётся во временной петле: он исправил появление Хоумлендера, но выхода нет. Профессор и Меллстрой помнят всё.',
    'КОНЕЦ 5 ЧАСТИ|Часть 6 начинается…'
  ];

var P6_HW = 960;

var p6 = { on: false, auto: false, st: '', t: 0, got: [0, 0, 0], mini: null, line: '', lineT: 0, flash: 0, rift: 0, crack: 0, days: 1874, shk: 0 };

var P6S = [
    { id: 0, dx: -430, name: 'Антенна стрима', btn: 'Настроить', part: 'Кристалл частоты', col: '#6bc4ff', mini: { title: 'Поймай частоту стрима Меллстроя', n: 3, w: 0.2, v: 0.8 }, hint: 'Нажми E: настроить антенну' },
    { id: 1, dx: 40, name: 'Верстак шестерён', btn: 'Собрать', part: 'Хроно-шестерня', col: '#ffd23f', mini: { title: 'Вставь шестерню в такт механизма', n: 3, w: 0.15, v: 1.05 }, hint: 'Нажми E: собрать шестерню' },
    { id: 2, dx: 500, name: 'Кабинет кристаллов', btn: 'Открыть', part: 'Ядро времени', col: '#ff6bd0', mini: { title: 'Удержи нестабильное ядро', n: 4, w: 0.12, v: 1.3 }, hint: 'Нажми E: открыть кабинет' }
  ];

var P6_MELL = -800, P6_DEV = 880;

var p6FinT = 0;

var cs = { on: false, id: '', i: 0, t: 0, done: null };

var CS = {};

var csSeen = {};

try { csSeen = JSON.parse(localStorage.getItem('chekushka-cseen') || '{}') || {}; } catch (e0) { csSeen = {}; }

var elCsSkip = document.getElementById('csSkip');

document.getElementById('csSkipBtn').addEventListener('click', function (e) { e.stopPropagation(); if (csXs()) { p5Finish(); return; } if (!cs.on && typeof fin !== 'undefined' && fin.on) { fin.t = Math.max(fin.t, 30.6); return; } csSkipAll(); });

document.addEventListener('keydown', function (e) { if (e.code !== 'Escape') return; if (csXs()) { p5Finish(); return; } if (cs.on) csSkipAll(); else if (typeof fin !== 'undefined' && fin.on) fin.t = Math.max(fin.t, 30.6); });

var CS_COL = { 'Кокич': '#ffd23f', 'Меллстрой': '#9fd0ff', 'Профессор': '#bfe8ff', 'Чикен Моггити': '#ff9bf0', 'Остаток Хоумлендера': '#ff8a8a', 'Рассказчик': '#e6e6ff', 'Врач': '#8fe3c0', 'Генерал ганнеров': '#ffb86b', 'Система': '#9fe3ff', 'Курочкин LIVE': '#7dff9c', 'Зелёный Кокич': '#7dff9c', 'Кокич без чекушек': '#ffd86b', 'Хоумкокич': '#ff7a6b', 'Кокич-Моггити': '#ff9bf0', 'Тихий Кокич': '#9fd0ff' };

var MOG_STAND = 560;

CS.p5a = [
    { d: 4.6, say: [[0.2, 'Чикен Моггити', 'MOG!'], [2.2, 'Профессор', 'А-а-а!']],
      draw: function (ct) {
        ct += 3.8; bgG('#07131f', '#1c4636'); csTrees('#0c2a24'); flr('#1a3a2c'); circ(Math.min(1, 0.3 + ct / 3), ct > 5.4);
        var mx = MOG_STAND, hit = ct > 5.4, sx = hit ? 560 + (ct - 5.4) * 360 : 560, sy = hit ? -(ct - 5.4) * 120 : 0;
        aKok(330, 1, 1); aMell(430, 0.85); aSci(sx, -1, 1, 0); if (hit) { ctx.save(); ctx.translate(sx, 330 + sy); ctx.rotate((ct - 5.4) * 6); ctx.restore(); ctx.fillStyle = '#ff3030'; ctx.font = '40px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('MOGGED', sx, 250 + sy); ring0(mx - 40, 340, (ct - 5.4) * 260, '#ff6bf0'); }
        aMogg(mx, -1, 1.15, { jx: hit ? (Math.random() - 0.5) * 8 : 0 }); if (hit) glt(5);
      } },
    { d: 6, say: [[0.4, 'Меллстрой', 'Обряд ломается! Время идёт вразнос!'], [3, 'Кокич', 'Тогда сначала разберёмся с тобой, Моггити!']],
      draw: function (ct) {
        var ph = Math.floor(ct / 1.3) % 3; if (ph === 0) { bgG('#2a1458', '#8a5ac8'); flr('#d8c8f0'); } else if (ph === 1) { bgG('#1b2a55', '#e08a5a'); flr('#4a4a58'); } else { bgG('#16213a', '#58406e'); city('#2a2850', '#1e1c3a'); flr('#2a2a38'); }
        glt(6); aKok(300 + Math.sin(ct * 5) * 24, 1, 1.1, { dy: -Math.abs(Math.sin(ct * 4)) * 40 }); aMogg(660 - Math.sin(ct * 5) * 24, -1, 1.15, { dy: -Math.abs(Math.cos(ct * 4)) * 40 });
        bigTxt('ВРЕМЯ ГЛЮЧИТ', 'Часть 5', Math.min(1, ct / 0.8), 130);
      } }
  ];

CS.p5b = [
    { d: 10, say: [[0.3, 'Рассказчик', 'Меллстрой застыл посреди глюка.'], [2, 'Чикен Моггити', 'Сейчас я тебя могну, Меллстрой…'], [4.4, 'Остаток Хоумлендера', 'Где я?! Что происходит?!'], [6.2, 'Кокич', 'Он стреляет во все стороны! В укрытие!'], [8.2, 'Чикен Моггити', 'Друзья, на помощь!']],
      draw: function (ct) {
        bgG('#16213a', '#58406e'); city('#2a2850', '#1e1c3a'); flr('#2a2a38'); glt(2);
        aMell(480, 1, 'rgba(120,200,255,1)'); ctx.fillStyle = 'rgba(160,220,255,.5)'; for (var i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(400 + i * 32, 430); ctx.lineTo(412 + i * 32, 300 - (i % 3) * 20); ctx.lineTo(424 + i * 32, 430); ctx.fill(); }
        var ch = Math.min(1, ct / 3); aMogg(300, 1, 1.15, {}); ctx.save(); ctx.globalCompositeOperation = 'lighter'; csGlow(372, 340, 26 + 50 * ch, '255,170,60', 0.35 + 0.3 * Math.sin(ct * 14)); ctx.restore();
        ctx.fillStyle = '#14233f'; ctx.fillRect(300, 220, 140, 10); ctx.fillStyle = '#ff9a3c'; ctx.fillRect(300, 220, 140 * Math.min(1, ct / 4.4), 10);
        if (ct > 4) { var pa = Math.min(1, (ct - 4) / 1.2); ctx.save(); ctx.globalCompositeOperation = 'lighter'; csGlow(780, 320, 130 * pa, '255,50,50', 0.4 * pa); for (var bi = 0; bi < 4; bi++) csBolt(780, 330, ct * 2 + bi * 1.57, 90 * pa, 'rgba(255,120,120,' + (0.6 * pa) + ')', 2); ctx.restore(); aHom(780, -1, 0.95, { a: (0.4 + Math.random() * 0.3) * pa, jx: (Math.random() - 0.5) * 6 }); ctx.fillStyle = '#ffd23f'; ctx.font = '48px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('?!', 780, 200); if (ct > 5.2) { var ey = 238, ty = 330 + Math.sin(ct * 3) * 40, bw = Math.min(1, (ct - 5.2) / 0.35); ctx.save(); ctx.globalCompositeOperation = 'lighter'; csGlow(748, ey, 40 * bw, '255,60,60', 0.8); var lgz = ctx.createLinearGradient(748, 0, 60, 0); lgz.addColorStop(0, 'rgba(255,60,60,.9)'); lgz.addColorStop(1, 'rgba(255,60,60,.15)'); ctx.fillStyle = lgz; ctx.beginPath(); ctx.moveTo(748, ey - 7 * bw); ctx.lineTo(748 - 688 * bw, ty - 3); ctx.lineTo(748 - 688 * bw, ty + 3); ctx.lineTo(748, ey + 7 * bw); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(748, ey); ctx.lineTo(748 - 688 * bw, ty); ctx.stroke(); csGlow(748 - 688 * bw, ty, 60, '255,160,90', 0.6 * bw); ctx.restore(); } }
        ctx.fillStyle = '#5a4a6e'; ctx.fillRect(610, 330, 70, 100); ctx.fillRect(110, 330, 70, 100); aKok(645, -1, 0.8, {}); aSci(145, 1, 0.8, 0);
        if (ct > 8) { ring0(300, 340, (ct - 8) * 200, '#ff6bf0'); glt(4); }
      } }
  ];

CS.p5c = [
    { d: 13, say: [[0.4, 'Кокич', 'Расширение жира!'], [3, 'Чикен Моггити', 'Ты думал, это конец? Расширение территории…'], [5.4, 'Чикен Моггити', 'ЧИКЕН ГАН!'], [8.6, 'Кокич', 'Он превратился в Чикен ганера! И их тысячи!']],
      draw: function (ct) {
        bgG('#2b0f3d', '#0f2a58'); flr('#3a2a58');
        var ga = Math.min(1, ct / 2.5); var tg1 = ctx.createRadialGradient(250, 360, 20, 250, 360, 420); tg1.addColorStop(0, 'rgba(255,210,63,' + (0.2 * ga) + ')'); tg1.addColorStop(1, 'rgba(255,210,63,0)'); ctx.fillStyle = tg1; ctx.fillRect(0, 0, 960, 540); var tg2 = ctx.createRadialGradient(720, 340, 20, 720, 340, 380); tg2.addColorStop(0, 'rgba(107,196,255,' + (0.18 * Math.min(1, Math.max(0, ct - 3) / 2)) + ')'); tg2.addColorStop(1, 'rgba(107,196,255,0)'); ctx.fillStyle = tg2; ctx.fillRect(0, 0, 960, 540);
        csDomain(250, 400, 60 + ga * 230, 40 + ga * 120, '255,210,63', 0.55 * ga, ct);
        for (var i = 0; i < 8; i++) { var bx = 130 + i * 50, by = 420 - ((ct * 60 + i * 40) % 160); ctx.fillStyle = '#d6902a'; ctx.beginPath(); ctx.ellipse(bx, by, 14, 8, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#7a3a1c'; ctx.fillRect(bx - 14, by, 28, 4); }
        aKok(250, 1, 1.2 + ga * 0.2, {});
        var tr = ct < 3 ? 0 : Math.min(1, (ct - 3) / 4.5);
        if (ct >= 3) { ctx.save(); var gg = ctx.createRadialGradient(720, 330, 10, 720, 330, 80 + tr * 230); gg.addColorStop(0, 'rgba(160,220,255,' + (0.3 + tr * 0.4) + ')'); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.fillRect(400, 90, 560, 420); ctx.restore(); }
        if (tr < 0.55) aMogg(720, -1, 1.2, { jx: tr > 0 ? (Math.random() - 0.5) * tr * 30 : 0, a: 1 - tr * 1.2 }); 
        if (tr > 0.35) { var ga2 = Math.min(1, (tr - 0.35) / 0.4); ctx.save(); ctx.globalAlpha = ga2; aGun(720, 430, 2.5 * (0.5 + 0.5 * Math.min(1, ga2 * 1.4)), Math.PI + 0.1, tr < 0.6 ? 1 : 0); ctx.restore(); }
        if (tr > 0.4 && tr < 0.75) { var fa2 = Math.sin((tr - 0.4) / 0.35 * 3.14), fg2 = ctx.createRadialGradient(720, 330, 10, 720, 330, 340); fg2.addColorStop(0, 'rgba(255,255,255,' + fa2.toFixed(2) + ')'); fg2.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = fg2; ctx.fillRect(360, 0, 600, 540); }
        if (ct > 7.4) { for (var q = 0; q < 14; q++) { var gx = 500 + (q * 71) % 440, gy = ((ct - 7.4) * 260 + q * 90) % 500; aGun(gx, gy, 0.55, Math.PI + 0.3, 0); } bigTxt('ЧИКЕН ГАН', 'Расширение территории', Math.min(1, (ct - 7.4) / 1), 90); }
        if (ct > 10 && ct < 11) { ctx.globalAlpha = 0.2; glt(5); ctx.globalAlpha = 1; }
      } }
  ];

CS.p5d1 = [
    { d: 6, say: [[0.4, 'Рассказчик', 'Моггити мерцает и раздваивается: он глючит во времени.'], [3.2, 'Кокич', 'Сейчас или никогда: один решающий удар!']],
      draw: function (ct) {
        bgG('#16213a', '#58406e'); city('#2a2850', '#1e1c3a'); flr('#2a2a38'); glt(4);
        aMogg(640 + Math.sin(ct * 30) * 18, -1, 1.2, { a: 0.6 }); aMogg(660 - Math.sin(ct * 23) * 22, -1, 1.2, { a: 0.5, dy: Math.sin(ct * 11) * 10 }); aKok(300, 1, 1.15, {}); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3; clockSpiral(660, 250, 90, ct * 3, 'rgba(255,200,255,.6)');
      } }
  ];

CS.p5d2 = [
    { d: 7, say: [[0.8, 'Профессор', 'СТОЙ! Это сделает только хуже!'], [3, 'Профессор', 'У нас ещё есть шанс всё доделать!'], [5, 'Кокич', '…Ладно. Но что-то уже идёт не так.']],
      draw: function (ct) {
        bgG('#16213a', '#58406e'); city('#2a2850', '#1e1c3a'); flr('#2a2a38'); glt(3);
        var lp = Math.min(1, ct / 0.9), kx = 300 + lp * 260, ky = -Math.sin(lp * 3.14) * 120; if (ct > 0.9) { kx = 560; ky = 0; }
        aMogg(700 + Math.sin(ct * 25) * 6, -1, 1.2, { a: 0.75 }); aKok(kx, 1, 1.15, { dy: ky, rot: ct < 0.9 ? 0.2 : 0 });
        if (ct > 0.8) { var sx = 110 + Math.min(1, (ct - 0.8) / 0.7) * 380; aSci(sx, 1, 1, ct * 2); if (ct > 1.5) ring0(520, 340, 40 + Math.sin(ct * 5) * 6, '#bfe8ff'); }
      } },
    { d: 9, say: [[0.4, 'Рассказчик', 'Петля начала меняться: появилось 1000 клонов Хоумлендера.'], [3.8, 'Кокич', 'Один выход: прыгнуть в него и остановить всё изнутри.'], [6, 'Меллстрой', 'Кокич, не надо!']],
      draw: function (ct) {
        bgG('#2a0508', '#5a1020'); glt(4);
        for (var r = 0; r < 6; r++) for (var c = 0; c < 22; c++) { var hx = c * 46 + (r % 2) * 20 + Math.sin(ct * 2 + c + r) * 4; ctx.globalAlpha = 0.5; aSprite(img.boss, hx, -1, 90 + r * 12, { dy: -80 + r * 52 - 330 + 330 }); } ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, 960, 540); bigTxt('× 1000', 'клонов Хоумлендера', Math.min(1, ct / 1.2), 90);
        aHom(480, -1, 1.7, { a: 0.95 });
        if (ct > 4.2) { var jp = Math.min(1, (ct - 4.2) / 1.6); aKok(150 + jp * 330, 1, 1.1 - jp * 0.6, { dy: -Math.sin(jp * 3.14) * 150 - jp * 110 }); }
        if (ct > 6.4) { ctx.globalAlpha = Math.min(1, (ct - 6.4) / 1.2); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; }
      } }
  ];

CS.p5rem = [
    { d: 10, say: [[0.3, 'Кокич', 'Я проигрываю…'], [2.8, 'Кокич', 'Нет. Я помню, что делал до этого пути.'], [5.4, 'Кокич', 'Бургеры, жир-территория, всё это со мной!'], [7.6, 'Кокич', 'ЖИР-ТЕРРИТОРИЯ!']],
      draw: function (ct) {
        bgG('#0a0408', '#2a0a14'); var k = Math.min(1, ct / 10);
        var fl = [['#d6902a', 3, 220, 160], ['#ffd23f', 4.2, 700, 190], ['#9bff4f', 5.2, 340, 330], ['#ff6bf0', 6, 640, 300]];
        for (var i = 0; i < fl.length; i++) { var f = fl[i], a = Math.max(0, Math.min(1, (ct - f[1] + 2.2) / 0.8)) * Math.max(0, 1 - Math.max(0, ct - 8) / 1); ctx.globalAlpha = a * 0.7; var cy2 = f[3] + Math.sin(ct * 2 + i) * 8; ctx.fillStyle = 'rgba(16,14,36,.82)'; rrect(f[2] - 118, cy2 - 24, 236, 48, 12); ctx.fill(); ctx.fillStyle = f[0]; rrect(f[2] - 118, cy2 - 24, 10, 48, 5); ctx.fill(); ctx.strokeStyle = f[0]; ctx.lineWidth = 2; rrect(f[2] - 118, cy2 - 24, 236, 48, 12); ctx.stroke(); ctx.globalAlpha = a; ctx.fillStyle = '#fff'; ctx.font = '700 16px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(['бургеры', 'клэш жира', 'победа над Хоумлендером', 'Моггити спас Меллстроя'][i], f[2] + 4, cy2); }
        ctx.globalAlpha = 1; flr('#1a0a10');
        var up = ct < 5 ? 0 : Math.min(1, (ct - 5) / 3); aKok(480, 1, 1.4, { dy: ct < 2.8 ? 0 : 0, rot: ct < 3 ? 0.6 : Math.max(0, 0.6 - (ct - 3) * 0.4) });
        if (up > 0) csDomain(480, 400, 80 + up * 320, 60 + up * 170, '255,210,63', 0.45 + up * 0.35, ct);
        if (ct > 9) { ctx.globalAlpha = Math.min(1, (ct - 9) / 0.8); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; }
      } }
  ];

CS.p5mogjump = [
    { d: 8, say: [[0.4, 'Рассказчик', 'Кокич бьётся изнутри петли Хоумлендера. Клонов тысяча, а сил всё меньше.'], [4.2, 'Рассказчик', 'И тут рядом возникает Моггити. Он ничего не говорит.']],
      draw: function (ct) {
        bgG('#2a0508', '#5a1020'); glt(3); clockSpiral(480, 250, 200 + Math.sin(ct) * 12, ct * 2, 'rgba(255,120,140,.5)');
        aHom(560, -1, 1.7, { a: 0.9, jx: Math.sin(ct * 18) * 3 }); flr('#2a0a14');
        aKok(260, 1, 1.05, { jx: Math.sin(ct * 14) * 2 });
        if (ct > 4.2) { var mp = Math.min(1, (ct - 4.2) / 3); aMogg(80 + mp * 120, 1, 1.0, { a: mp }); }
      } },
    { d: 7, say: [[0.4, 'Рассказчик', 'Моггити молча прыгает в Хоумлендера вслед за Кокичем.'], [3.6, 'Кокич', 'Моггити…? Ладно. Вместе.']],
      draw: function (ct) {
        bgG('#3a0a10', '#7a1a28'); glt(4); aHom(600, -1, 1.8, { a: 0.95 }); flr('#2a0a14');
        var jp = Math.min(1, ct / 2.2); aMogg(180 + jp * 260, 1, 1.0, { dy: -Math.sin(jp * 3.14) * 170, rot: jp * 0.4 }); aKok(300, 1, 1.05, {});
        if (ct > 2.0) csGlow(480, 300, 60 + (ct - 2) * 70, '255,230,200', Math.min(0.5, (ct - 2) * 0.2));
      } }
  ];

CS.p5mogend = [
    { d: 7, say: [[0.4, 'Кокич', 'Давай! Вместе!'], [2.6, 'Рассказчик', 'Моггити и Кокич бьют по Хоумлендеру одновременно. Тот трескается изнутри.']],
      draw: function (ct) {
        bgG('#3a0a10', '#7a1a28'); glt(4); flr('#2a0a14'); var sh = Math.min(1, ct / 5);
        aHom(620, -1, 1.8 - sh * 0.4, { a: 1 - sh * 0.5, jx: Math.sin(ct * 40) * 6 * sh });
        aKok(330, 1, 1.05, { jx: Math.sin(ct * 20) }); aMogg(210, 1, 1.0, { jx: Math.sin(ct * 22) });
        if (ct > 2.4) { ring0(620, 300, (ct - 2.4) * 140, '#ffd23f'); csGlow(620, 300, 90 + (ct - 2.4) * 80, '255,240,200', Math.min(0.6, (ct - 2.4) * 0.25)); }
      } },
    { d: 7, say: [[0.4, 'Рассказчик', 'Петля рвётся и начинает схлопываться. Кокич успевает выпрыгнуть.'], [3.8, 'Кокич', 'МОГГИТИ!']],
      draw: function (ct) {
        bgG('#120a2a', '#3a1a5a'); clockSpiral(480, 250, 240 - ct * 22, ct * 3, 'rgba(255,230,255,.7)'); flr('#241038');
        var kp = Math.min(1, ct / 3); aKok(330 + kp * 420, 1, 1.05 - 0.1 * (1 - kp), { dy: -Math.sin(kp * 3.14) * 140 });
        aMogg(230, 1, 1.0, { a: 1 - Math.max(0, ct - 4.2) / 2.4, jx: Math.sin(ct * 10) * 2 });
        csGlow(300, 280, 140 - ct * 14, '255,220,255', 0.25);
      } },
    { d: 7, say: [[0.5, 'Рассказчик', 'Моггити остался внутри петли навсегда. Он так и не сказал ни слова.']],
      draw: function (ct) {
        bgG('#05030c', '#120a24'); clockSpiral(480, 270, 120 + Math.sin(ct) * 8, ct * 1.2, 'rgba(255,230,255,.35)');
        aMogg(480, 1, 0.8, { a: 0.9 - Math.min(0.6, ct / 9), dy: -20 + Math.sin(ct * 1.5) * 8 }); flr('#0a0614');
      } }
  ];

CS.p5end = [
    { d: 6, say: [[0.5, 'Рассказчик', 'Но назад уже не вернуться…']],
      draw: function (ct) { bgG('#120a2a', '#3a1a5a'); clockSpiral(480, 270, 230, ct * 0.9); flr('#241038'); aKok(480, 1, 0.9, { dy: 0 }); } },
    { d: 8, say: [[0.4, 'Рассказчик', 'Время встаёт на места.'], [3, 'Рассказчик', 'Учёные, врачи, коллекторы и все остальные снова обычные петухи и курицы.']],
      draw: function (ct) {
        bgG('#8ad0ff', '#d8f2ff'); ctx.fillStyle = '#6fbf6f'; ctx.fillRect(0, 430, 960, 110); ctx.fillStyle = '#fff'; for (var i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(120 + i * 250 + (ct * 8) % 40, 90 + (i % 2) * 40, 80, 22, 0, 0, 6.3); ctx.fill(); }
        var nm = ['Врач', 'Собиратель', 'Профессор', 'Водитель']; for (i = 0; i < 4; i++) { var x = 170 + i * 200; aRoost(x, i % 2 ? -1 : 1, 1.05, { dy: -Math.abs(Math.sin(ct * 3 + i)) * 6 }); ctx.fillStyle = 'rgba(20,35,63,.8)'; rrect(x - 50, 450, 100, 24, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(nm[i], x, 462); }
        if (ct > 4) { ctx.globalAlpha = Math.min(1, (ct - 4) / 1); ctx.fillStyle = 'rgba(20,35,63,.8)'; rrect(260, 50, 440, 44, 12); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 20px "Rubik", system-ui, sans-serif'; ctx.fillText('Обычные петухи и курицы', 480, 72); ctx.globalAlpha = 1; }
      } },
    { d: 7, say: [[0.4, 'Рассказчик', 'Меллстрой по-прежнему стримит из своего кабинета.']],
      draw: function (ct) {
        bgG('#1a1630', '#2a2248'); flr('#2e2650'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(250, 360, 460, 80); aMell(480, 1.7);
        ctx.fillStyle = 'rgba(255,255,255,.08)'; rrect(300, 95, 360, 270, 14); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; rrect(300, 95, 360, 270, 14); ctx.stroke(); ctx.fillStyle = 'rgba(20,35,63,.9)'; ctx.fillRect(300, 95, 360, 24); ctx.fillStyle = '#ff4b4b'; ctx.beginPath(); ctx.arc(316, 107, 5, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('стрим Меллстроя', 328, 108); ctx.textAlign = 'center';
        ctx.fillStyle = '#d33a3a'; rrect(30, 30, 90, 34, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 20px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('● LIVE', 75, 47);
        for (var i = 0; i < 6; i++) { var y = 500 - ((ct * 50 + i * 80) % 460), a = Math.max(0, Math.min(1, (500 - y) / 80)); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(740, y, 190, 30, 8); ctx.fill(); ctx.fillStyle = i % 2 ? '#ffd23f' : '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillText(i % 2 ? 'донат +100 коинов' : ['мелл топ', 'кто тут?', 'привет из лобби', 'пум'][i % 4], 835, y + 15); } ctx.globalAlpha = 1;
      } },
    { d: 6, say: [[0.4, 'Рассказчик', 'Чекушки больше никто не собирает. Теперь это просто напиток.']],
      draw: function (ct) {
        bgG('#2a1c14', '#4a3020'); flr('#5a3a22'); ctx.fillStyle = '#7a5230'; ctx.fillRect(100, 380, 760, 30); ctx.fillRect(100, 410, 760, 20);
        for (var i = 0; i < 7; i++) { var x = 170 + i * 100; if (ready(img.bottle)) { var bh = 150, bw = bh * img.bottle.naturalWidth / img.bottle.naturalHeight; ctx.drawImage(img.bottle, x - bw / 2, 380 - bh, bw, bh); } ctx.fillStyle = 'rgba(255,230,160,.7)'; ctx.fillRect(x + 28, 360, 18, 20); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x + 30, 346, 14, 14); }
        ctx.fillStyle = '#d6902a'; rrect(300, 100, 360, 46, 10); ctx.fill(); ctx.fillStyle = '#2a1a10'; ctx.font = '700 22px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('НАПИТОК «ЧЕКУШКА»', 480, 124);
      } },
    { d: 9, say: [[0.6, 'Рассказчик', 'Кокич остаётся во временной петле: он исправил появление Хоумлендера, но выхода уже нет.'], [4.4, 'Профессор', 'Он застрял там. Но мы помним всё.'], [6.4, 'Меллстрой', 'Мы вытащим его. Обязательно.']],
      draw: function (ct) {
        bgG('#120a2a', '#2a1a4a'); clockSpiral(700, 250, 190, ct * 1.3); flr('#241038'); var lp = (ct * 0.8) % 1; aKok(520 + lp * 160, 1, 1, { a: 1 - Math.abs(lp - 0.5) * 0.5 }); aKok(520 + ((lp + 0.5) % 1) * 160, 1, 1, { a: 0.3 });
        ctx.fillStyle = '#4a3a5a'; ctx.fillRect(60, 380, 260, 20); aMell(130, 0.9); aSci(260, 1, 1, 0);
        if (ct > 3.4) { ctx.globalAlpha = Math.min(1, (ct - 3.4) / 1); ctx.fillStyle = 'rgba(255,255,255,.9)'; rrect(230, 176, 120, 44, 14); ctx.fill(); ctx.beginPath(); ctx.moveTo(262, 218); ctx.lineTo(272, 240); ctx.lineTo(288, 218); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#222'; ctx.font = '700 20px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('помним', 290, 199); ctx.globalAlpha = 1; }
      } },
    { d: 8, say: [],
      draw: function (ct) { bgG('#000', '#0a0a1a'); var a = Math.min(1, ct / 1.2); bigTxt('КОНЕЦ 5 ЧАСТИ', 'Часть 6: Палата 1, Меллстрой, раздел «Сюжет»', a, 240); } }
  ];

CS.ritfun = [
    { d: 9, say: [[0.3, 'Кокич', 'Интересно, что будет, если просто начать ритуал? Ради прикола.'], [3.4, 'Рассказчик', 'Круг вспыхнул, и время застряло.'], [6, 'Рассказчик', 'Петля выбросила Кокича обратно.']],
      draw: function (ct) {
        bgG('#07131f', '#1c4636'); csTrees('#0c2a24'); flr('#1a3a2c'); circ(Math.min(1, ct / 2), ct > 3.4);
        aKok(480, 1, 1, { dy: ct > 6 ? -Math.min(1, (ct - 6) / 1) * 600 : 0 });
        if (ct > 3.2) { clockSpiral(480, 240, 150 * Math.min(1, (ct - 3.2) / 1), ct * 2.5, 'rgba(255,200,255,.7)'); glt(Math.floor((ct - 3) * 2)); }
        if (ct > 6.8) { ctx.globalAlpha = Math.min(1, (ct - 6.8) / 1.5); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; }
      } }
  ];

CS.ritfun2 = [{ d: CS.ritfun[0].d, say: [[0.3, 'Кокич', 'Я же уже в петле… а вдруг получится?'], [3.4, 'Рассказчик', 'Круг вспыхнул, и время застряло.'], [6, 'Рассказчик', 'Петля снова выбросила Кокича в начало.']], draw: CS.ritfun[0].draw }];

var TR_X = 16500, TORP_PRICE = 18000, TORP_DMG = 380, TORP_CD = 3, CTH_HP = KR_SUB_HP * 5, CTH_TIME = 420, CTH_RES = 0.05;

var cthF = false, cthCd = 0, cthMsgT = 0, trGot = 0;

var RIT_X = 2200, GYM_X = 1300, SD_X = 2630;

var REC_X = [520, 1000, 1480, 1960, 2340, 2600, 2780], REC_N = 7;

var STONE_X = [380, 700, 1020, 1240, 1400];

var STONE_NAME = ['Солнце', 'Луна', 'Звезда', 'Ромб', 'Крест'], STONE_COL = ['#ffcf4a', '#9fd0ff', '#ff8ad8', '#7dff9a', '#ff6b6b'], STONE_CH = ['☀', '☾', '★', '♦', '✚'];

var stoneLit = [false, false, false, false, false], stoneCp = 0, stoneBad = 0, sdAnim = 0, stoneGlow = [0, 0, 0, 0, 0];

var REC_TXT = [
    ['Журнал №1. Проект «Хоумлендер»', 'Мы вывели петуха, в котором живёт сила доната. Образец-донор: Меллстрой. Он отдал столько, что едва не растворился, а мы получили то, что хотели: сосуд.\nПетух ходит по людям и не знает, что он замок.'],
    ['Журнал №2. Замок', 'Пока Хоумлендер жив, сила заперта внутри него. Убери его насовсем, и замок падёт: магия доната пойдёт к тому, кто рядом. Мы не хотели этого. Но мы знали, что найдётся тот, кто захочет.'],
    ['Журнал №3. Серое стекло', 'Чекушки грязные не из-за пыли. Их портит осадок «серого стекла»: он появляется там, где замок закрыт слишком долго. Отмыть его можно только Глубинным сокровищем: тогда все чекушки станут чистыми навсегда.'],
    ['Журнал №4. Глубинное сокровище', 'Сокровище лежит на дне самой глубокой впадины Глубокого океана, на 500 метрах. Его охраняет Ктулху: он в 5 раз сильнее обычного Кракена, обычные чекушки ему как укусы комара.\nНужна торпеда для субмарины: её собрал мастер в лавке рыбака. Не опускайся к сокровищу без неё.'],
    ['Журнал №5. Чикен Моггити', 'Он не просто союзник. Он пришёл не из нашего проекта и не по нашей воле. Спроси Меллстроя, откуда он взялся. А ещё: тому, кто хочет жить в городе Моггити, придётся научиться могнуть в ответ.'],
    ['Журнал №6. Образец вышел из-под контроля', 'Образец H-1 в резервуаре на самом деле пустой: муляж. Настоящий образец, который вышел из-под контроля, это наш старший научный сотрудник. Он принял на себя часть силы доната, чтобы остановить эксперимент, и теперь прячется в этой лаборатории. Если ты читаешь это, он ещё жив.\nПоговори с ним: он стоит у стола в середине лаборатории и ответит на любые вопросы, если в истории остались дыры.'],
    ['Журнал №7. План возврата', 'Единственный способ исправить всё: перезапустить цикл. Нужны двое: тот, кто помнит эксперимент (профессор), и тот, кто дал начало силе (Меллстрой). Они знакомы. Вместе они проведут обряд в Лесу и вернут время до ошибки, оставив послание в будущее: чтобы никто не стал Хоумлендером, а чикены освободились и стали обычными курицами и петухами.\nОтведи профессора в Больницу: ему нужна помощь врачей, иначе он не доживёт до обряда.']
  ];

var mb = { on: false, m: null, v: 0.5, t: 0, hit: 0, combo: 0, last: 0, me: 0, him: 0, lim: 14 };

var elMb = document.createElement('div'), elMbBtn = document.createElement('button');

elMb.id = 'mogBattle';

elMb.hidden = true;

elMb.innerHTML = '<div class="mbt" id="mbT">МОГ-БАТЛ</div><div class="mbbar"><i id="mbFill"></i><b id="mbMid"></b></div><div class="mbl"><span id="mbMe">ТЫ</span><span id="mbCombo"></span><span id="mbHim">МОГЕР</span></div><div class="mbh">Тапай «МОГ» как можно чаще!</div>';

elMbBtn.id = 'mogBtn';

elMbBtn.type = 'button';

elMbBtn.hidden = true;

elMbBtn.textContent = 'МОГ';

document.body.appendChild(elMb);

document.body.appendChild(elMbBtn);

var elMbMe = elMb.querySelector('#mbMe'), elMbHim = elMb.querySelector('#mbHim'), elMbT = elMb.querySelector('#mbT'), elMbFill = elMb.querySelector('#mbFill'), elMbCombo = elMb.querySelector('#mbCombo');

elMbBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); mogAct(); });

var elMbRes = document.createElement('div'), mbResT = 0;

elMbRes.id = 'mbRes';

elMbRes.hidden = true;

document.body.appendChild(elMbRes);

var MOG_SAFE = 260, mogs = [], mogCd = 0, mogSpawnT = 3;

var gym = { on: false, t: 0, reps: 0, need: 10, lvl: 0, last: 0 };

var GYM_COST = [400, 1500, 5000, 14000, 40000];

var GYM_NAME = ['Новичок', 'Крепыш', 'Спортсмен', 'Качок', 'Монстр', 'Гигачикен'];

var mogCv = null;

var rit = { auto: false, on: false, t: 0, glow: 0, line: '', step: 0 };

var RIT_LINES = [
    [0.5, 'Собиратель: Встань в круг и не двигайся.'],
    [3.5, 'Звёзды сходятся над поляной…'],
    [6.5, 'Сила Меллстроя гудит в камнях.'],
    [9.5, 'Магия, что ты собрал, течёт в круг.'],
    [12.5, 'Собиратель: Он слышит. Он идёт обратно.']
  ];

var OFF_X = 3500, MO_DESK = 1560, MO_EXIT = 130, ofBoss = { x: MO_DESK + 20, boss: true, round: 0, face: -1, ph: 0, flash: 0, atk: 0, hp: 1 }, ofPortC = null;

CS.mogspare = [
    { d: 7, say: [[0.4, 'Кокич', 'Живи, Моггити. Ты проиграл честно.'], [3.6, 'Рассказчик', 'Моггити не ответил. Он молча смотрел в пол.']],
      draw: function (ct) { bgG('#2b1f48', '#4a3070'); flr('#2a1f40'); aMogg(700, -1, 0.95, { dy: 8 }); aKok(300, 1, 1.0, {}); csGlow(500, 300, 220, '255,210,120', 0.14 + 0.06 * Math.sin(ct * 3)); } },
    { d: 6, say: [[0.4, 'Рассказчик', 'Моггити поднялся и ушёл за стол. Ни слова.']],
      draw: function (ct) { bgG('#1a1030', '#2c1a4a'); flr('#241038'); aMogg(560 + Math.min(1, ct / 4) * 150, 1, 0.95, { dy: 0, a: 1 - Math.max(0, ct - 4) / 2 }); aKok(300, 1, 1.0, {}); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('МОГГИТИ ПОЩАЖЁН', 'Он ничего не сказал', Math.min(1, ct / 1.2), 240); } }
  ];

CS.mogkill = [
    { d: 7, say: [[0.4, 'Кокич', 'Прости. Другого выхода нет.'], [3.4, 'Рассказчик', 'Моггити не ответил. Его силуэт растаял.']],
      draw: function (ct) { bgG('#2b1f48', '#4a3070'); flr('#2a1f40'); var fall = Math.min(1, Math.max(0, (ct - 4.5) / 1.5)); aMogg(700, -1, 0.95, { dy: 8 + fall * 40, rot: -fall * 0.9, a: 1 - fall * 0.7 }); aKok(300, 1, 1.0, {}); if (fall > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; csGlow(700, 360, 160 * fall, '255,255,255', 0.5 * (1 - fall * 0.5)); ctx.restore(); } } },
    { d: 6, say: [[0.4, 'Меллстрой', 'Он больше не встанет… Странно, время вокруг дрожит.'], [3.4, 'Профессор', 'Держитесь поближе друг к другу.']],
      draw: function (ct) { bgG('#1a1630', '#2a2248'); flr('#2e2650'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(250, 360, 460, 80); aMell(480, 1.5); aSci(780, -1, 1.05, 0); clockSpiral(260, 220, 90 + ct * 6, ct * 2, 'rgba(255,200,255,.45)'); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('МОГГИТИ ПАЛ', '', Math.min(1, ct / 1.2), 240); } }
  ];

CS.altgun = [
    { d: 8, say: [[0.4, 'Меллстрой', 'Круг светится… получилось?!'], [3.6, 'Профессор', 'Время потекло, но не туда. Это не наш мир!'], [6, 'Кокич', 'ДЕРЖИТЕСЬ!']],
      draw: function (ct) { bgG('#120a2a', '#3a1a5a'); clockSpiral(480, 270, 190 + ct * 6, ct * 4, 'rgba(255,230,255,.7)'); flr('#241038'); var k = Math.min(1, ct / 5); aCrewK(480, 1, 0.9 - 0.3 * k, { dy: -80 * k, rot: ct * 2 * k }, 130); aMell(220, 0.6); aSci(740, -1, 0.7, 0); if (ct > 6.5) { ctx.globalAlpha = Math.min(1, (ct - 6.5) / 1.2); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; } } },
    { d: 10, say: [[0.5, 'Рассказчик', 'Вселенная Чикен Ган. Яркое небо, ящики с патронами и чикены с оружием на каждом шагу.'], [4.2, 'Чикен ганер', 'СТОЯТЬ! Вы убили Чикена Моггити. Руки вверх, будем обыскивать!'], [7.6, 'Меллстрой', 'Нас что, шманают за убийство?!']],
      draw: function (ct) { bgG('#7cc8ff', '#e8f7ff'); ctx.fillStyle = '#6fbf6f'; ctx.fillRect(0, 430, 960, 110); ctx.fillStyle = '#a07a46'; for (var q = 0; q < 5; q++) { ctx.fillRect(40 + q * 200, 380 - (q % 2) * 20, 70, 50); ctx.fillStyle = '#7a5a30'; ctx.fillRect(40 + q * 200, 380 - (q % 2) * 20, 70, 6); ctx.fillStyle = '#a07a46'; } aCrewK(330, 1, 1.0, {}, 62); aMell(100, 0.6); aSci(440, 1, 1.0, 0); for (var gq = 0; gq < 6; gq++) { var gx = 600 + (gq % 3) * 110, gy = 410 - Math.floor(gq / 3) * 30 + Math.sin(ct * 3 + gq) * 3; aGun(gx, gy, 0.75, Math.PI + 0.1, 0); } } },
    { d: 7, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ГЛАВА 2', 'Чало Хаус', Math.min(1, ct / 1.2), 240); } }
  ];

var SCI_X = 1740, HIN_DOOR = { exit: 110, reg: 430, doc: 830, r3: 1280, r2: 1680, r1: 2180 };

var sci = { fx: 0, walk: 0, loc: -1 }, resc = { on: false, t: 0, ax: 0, sx: 0, tx: 0 }, fin = { auto: false, on: false, t: 0, line: '', step: 0, mx: 0, ttl: false };

var sciPortC = null;

var docPortC = null;

var SCI_Q = [
    ['Кто вы?', 'Профессор Квохтин, бывший руководитель проекта «Хоумлендер». Образец H-1 в резервуаре это муляж. Настоящий образец, вышедший из-под контроля, это я: часть силы доната осела во мне, поэтому я прячусь здесь и держусь на последнем кофе.'],
    ['Что за эксперимент?', 'Мы хотели вывести чикена, способного на всё, и взяли за основу силу доната, которую отдал Меллстрой. Сосудом стал Хоумлендер. Он должен был стать защитником. Но замок оказался чужим: сила пошла против нас.'],
    ['Откуда взялся Хоумлендер?', 'Его собрали из удачных образцов: петух, лазеры, молоко для регенерации. Мы не рассчитывали, что он поймёт, что он замок. Он понял, и стал искать способ не быть запертым: летать, нападать, требовать больше.'],
    ['Почему чекушки грязные и чикены в заточении?', 'Чикены «в заточении» потому, что замок закрыт слишком долго. От этого появился осадок серого стекла: он портит чекушки и держит нас в одной роли: вечно собирать, сдавать и ждать. Глубинное сокровище смывает осадок, но корень в другом: замок надо открыть до того, как всё началось.'],
    ['Кто такой Чикен Моггити?', 'Он пришёл не из проекта. Он родился в городе Моггити от самой идеи «мог»: сильнее тот, кто перемогает. Он помог вам, потому что вам было что терять. Но он живёт благодаря тому, что мир остался как есть: это его свобода.'],
    ['Как всё исправить?', 'Перезапустить цикл. Нужны двое: я, помнящий эксперимент, и Меллстрой, давший начало силе. Мы проведём обряд в Лесу и вернём время до ошибки, оставив послание в будущее: чтобы Хоумлендер не появился, а чикены стали обычными курицами и петухами. Но мне нужна больница: без врачей я не дотяну до обряда.']
  ];

var FIN_LINES = [
    [0.6, 'Меллстрой: Встаём в круг. Профессор, начинайте.'],
    [4, 'Профессор: Время откатится до ошибки. Мы оставим послание в будущее.'],
    [8, 'Круг вспыхивает. Воздух трескается, как стекло.'],
    [11, 'Чикен Моггити: СТОЯТЬ!'],
    [14.5, 'Моггити: Если вы вернёте время, я снова стану обычным чикен ганером. Это моя свобода. Не позволю!'],
    [19, 'Меллстрой: Моггити, ты же нас спас…'],
    [22, 'Моггити: Спас, чтобы вы не отняли у меня то, что я получил. Круг мой!']
  ];

var FIN_LINES_K = [
    [0.6, 'Меллстрой: Встаём в круг. Профессор, начинайте.'],
    [4, 'Профессор: Время откатится до ошибки. Мы оставим послание в будущее.'],
    [8, 'Круг вспыхивает. Воздух трескается, как стекло.'],
    [11, 'Меллстрой: Моггити больше нет, и никто не мешает. Круг держится!'],
    [14.5, 'Профессор: Мы на пороге… но направление времени странное.'],
    [19, 'Меллстрой: Мы падаем не в прошлое. Это совсем другой мир!'],
    [22, 'Рассказчик: Петля держалась на Моггити. Без него ритуал уводит в чужую вселенную.']
  ];

var FIN_LINES_S = [
    [0.6, 'Меллстрой: Встаём в круг. Профессор, начинайте.'],
    [4, 'Профессор: Время откатится до ошибки. Мы оставим послание в будущее.'],
    [8, 'Круг вспыхивает. Воздух трескается, как стекло.'],
    [11, 'У круга появляется Чикен Моггити. Он молчит.'],
    [14.5, 'Кокич: Моггити? Я же тебя пощадил! Зачем ты здесь?'],
    [19, 'Моггити молчит и смотрит на круг.'],
    [22, 'Меллстрой: Он ничего не говорит… Круг ломается!']
  ];

CS.p6a = [
    { d: 10, say: [[0.4, 'Рассказчик', 'Часть 6. Кокич начинает со временной петли.'], [3.4, 'Кокич', 'Я вижу Меллстроя сквозь трещины времени. Он стримит… а я бегу по кругу.'], [7, 'Кокич', 'Сколько прошло? День? Год? Не понять.']],
      draw: function (ct) {
        bgG('#120a2a', '#2a1a4a'); clockSpiral(480, 250, 250, ct * 1.1); flr('#241038');
        p6Win(60, 80, 230, 120, 0, 'LIVE'); p6Win(660, 110, 230, 120, 0, 'LIVE'); p6Win(380, 40, 200, 100, 0, 'LIVE');
        var lp = (ct * 0.45) % 1; aKok(180 + lp * 600, 1, 1, { dy: -Math.abs(Math.sin(ct * 8)) * 8, a: 1 - Math.abs(lp - 0.5) * 0.4 }); aKok(180 + ((lp + 0.5) % 1) * 600, 1, 1, { a: 0.25, dy: -Math.abs(Math.sin(ct * 8)) * 8 });
        if (ct > 5) { glt(2); }
      } },
    { d: 11, say: [[0.4, 'Рассказчик', 'Меллстрой продолжает стримить. Каждый день, без выходных.'], [4, 'Меллстрой', 'Я уже постарел… а Кокича всё нет.'], [7.4, 'Рассказчик', 'Годы идут. Для Кокича в петле они пролетают за секунды.']],
      draw: function (ct) {
        bgG('#1a1630', '#2a2248'); flr('#2e2650');
        var labs = ['ДЕНЬ 1', 'ГОД 7', 'ГОД 25']; for (var i = 0; i < 3; i++) { var x = 40 + i * 310, a = Math.max(0, Math.min(1, ct / 1.2 - i * 0.6)); ctx.globalAlpha = a; p6Win(x, 120, 280, 160, 0.12 + i * 0.28, labs[i]); ctx.fillStyle = 'rgba(230,230,240,' + (0.15 + i * 0.3) + ')'; ctx.fillRect(x + 100, 200, 80, 14 + i * 10); ctx.globalAlpha = 1; }
        ctx.fillStyle = '#fff'; ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Дни стрима: ' + Math.floor(1 + ct * 300), 480, 80);
        var lp = (ct * 0.9) % 1; ctx.save(); ctx.globalAlpha = 0.6; clockSpiral(480, 400, 70, ct * 3); ctx.restore(); aKok(440 + lp * 100, 1, 0.6, {});
      } },
    { d: 11, say: [[0.4, 'Рассказчик', 'А в лаборатории профессор пытается воссоздать аппарат.'], [3.6, 'Профессор', 'Аппарат разрушился вместе с ритуалом. Я воссоздам его и спасу Кокича!'], [7.4, 'Рассказчик', 'Но деталей не хватает, а время всё ещё капризничает.']],
      draw: function (ct) {
        p6Lab(ct); var fl = Math.floor(ct * 6) % 2;
        ctx.fillStyle = '#55507a'; ctx.fillRect(400, 310, 160, 50); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(480, 300, 44, 0, 6.3); ctx.stroke(); ctx.save(); ctx.translate(480, 300); ctx.rotate(ct * 0.4); for (var i = 0; i < 6; i++) { ctx.rotate(1.047); ctx.fillStyle = '#6a6a88'; ctx.fillRect(38, -6, 16, 12); } ctx.restore();
        if (Math.random() < 0.5) { ctx.strokeStyle = '#bfe6ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(480, 300); ctx.lineTo(480 + (Math.random() - 0.5) * 140, 300 + (Math.random() - 0.5) * 120); ctx.stroke(); }
        aRoost(340 + Math.sin(ct * 1.2) * 14, 1, 1, { dy: -Math.abs(Math.sin(ct * 4)) * 4 }); if (fl) { ctx.fillStyle = '#ffd23f'; ctx.fillRect(560, 340, 8, 8); }
      } },
    { d: 10, say: [[0.4, 'Меллстрой', 'Я бы помог найти Кокича, но не знаю, где профессор.'], [4, 'Рассказчик', 'А профессор уже идёт к студии. Сам, на своих двоих.'], [7.2, 'Меллстрой', 'Кто-то стучится…']],
      draw: function (ct) {
        bgG('#1a1630', '#2a2248'); flr('#2e2650'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(130, 360, 360, 70); aMell(310, 1.4, 'rgba(200,200,210,.5)');
        ctx.fillStyle = '#3a2a1a'; ctx.fillRect(780, 250, 100, 180); ctx.fillStyle = '#ffd23f'; ctx.fillRect(860, 340, 8, 8);
        var sx = Math.max(700, 1000 - ct * 40); aRoost(sx, -1, 1, { dy: -Math.abs(Math.sin(ct * 5)) * 5 }); if (ct > 7) { ctx.fillStyle = '#fff'; ctx.font = '700 24px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('тук-тук', 820, 220); }
      } },
    { d: 12, say: [[0.4, 'Профессор', 'Я здесь, Меллстрой. Кокича можно достать только через разрез времени.'], [3.8, 'Меллстрой', 'Профессор?! Но ты же… был курицей. Что с тобой?'], [6.6, 'Рассказчик', 'Профессор вколол себе сыворотку: прежний облик вернулся, и время его больше не рвёт.'], [9.4, 'Профессор', 'Теперь я могу работать там, где другие не выживут.']],
      draw: function (ct) {
        bgG('#1a1630', '#2a2248'); flr('#2e2650'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(130, 360, 360, 70); aMell(310, 1.4, 'rgba(200,200,210,.5)');
        var inj = ct > 6.4, fa = inj ? Math.max(0, 1 - (ct - 6.4) / 1.4) : 0;
        var tk = Math.max(0, Math.min(1, (ct - 6.6) / 1.8));
        if (tk < 1) aRoost(640, -1, 1 + 0.15 * Math.sin(tk * 3.14), { a: 1 - tk, jx: ct > 6.4 ? Math.sin(ct * 40) * 3 * (1 - tk) : 0 });
        if (tk > 0) sciDraw(640, -1, 1.3 * (0.88 + 0.12 * tk) , 0, 0, tk);
        if (ct > 6.4) csGlow(640, 300, 90 + 80 * Math.sin(Math.min(1, (ct - 6.4) / 2) * 3.14), '125,255,154', 0.5);
        if (ct > 5 && ct < 7) { ctx.fillStyle = '#cfe8ff'; ctx.fillRect(660, 320, 40, 6); ctx.fillStyle = '#7dff9a'; ctx.fillRect(664, 322, 20, 2); }
        if (inj) { ctx.globalAlpha = fa * 0.4; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; ring0(640, 330, (ct - 6.4) * 220, 'rgba(125,255,154,.7)'); }
      } },
    { d: 10, say: [[0.4, 'Профессор', 'Хватит стримить в пустоту, Меллстрой. Пойдём за мной.'], [3.4, 'Меллстрой', 'Куда? Я даже не знал, где ты работаешь…'], [6.4, 'Профессор', 'Я построил новую лабораторию. Там соберём аппарат заново.']],
      draw: function (ct) {
        bgG('#1a1630', '#2a2248'); flr('#2e2650'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(130, 360, 360, 70); aMell(310, 1.4, 'rgba(200,200,210,.5)');
        ctx.fillStyle = '#3a2a1a'; ctx.fillRect(780, 250, 100, 180); ctx.fillStyle = '#ffd23f'; ctx.fillRect(860, 340, 8, 8);
        var sx = Math.max(560, 760 - ct * 60); aSci(sx, -1, 1, ct); if (ct > 6.6) { ctx.fillStyle = '#fff'; ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Идём!', sx, 250); }
      } },
    { d: 10, say: [[0.4, 'Рассказчик', 'Ночной город. Профессор шагает впереди, Меллстрой катится следом на стриминговом кресле. Они идут в новую лабораторию.'], [4.2, 'Меллстрой', 'Я двадцать пять лет не выходил из студии…'], [7, 'Профессор', 'Привыкай. Свежий воздух полезен даже стримерам.']],
      draw: function (ct) {
        bgG('#0a1226', '#223a6a'); city('#16224a', '#101a3a'); flr('#1d2440');
        for (var i = 0; i < 6; i++) { var lx = ((i * 220 - ct * 60) % 1320 + 1320) % 1320 - 180; ctx.fillStyle = '#2a3150'; ctx.fillRect(lx, 300, 6, 130); csGlow(lx + 3, 300, 70, '255,226,140', 0.32); }
        aSci(560, 1, 1, ct); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(318, 428, 14, 0, 6.3); ctx.arc(402, 428, 14, 0, 6.3); ctx.fill(); aMell(360, 0.8, 'rgba(200,200,210,.4)');
      } },
    { d: 10, say: [[0.4, 'Рассказчик', 'Новая лаборатория. Чистая, белая, без запаха жжёных проводов.'], [3.6, 'Профессор', 'Здесь соберём аппарат заново. Нужны три детали Часореза.'], [7, 'Меллстрой', 'Тогда я стримлю, а ты работай.']],
      draw: function (ct) { csLabN(ct, 0); aMell(190, 0.8, 'rgba(200,200,210,.4)'); aSci(420, 1, 1, 0); csGlow(700, 300, 90, '140,220,255', 0.15); } },
    { d: 7, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ЧАСТЬ 6', 'Разрез времени', Math.min(1, ct / 1), 230); ctx.save(); ctx.globalAlpha = Math.min(1, Math.max(0, ct - 1.6)); ctx.fillStyle = '#fff'; ctx.font = '700 20px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Теперь ты играешь за профессора', 480, 330); ctx.restore(); } }
  ];

CS.p6b = [
    { d: 12, say: [[0.4, 'Профессор', 'Есть! Разрез держится…'], [3, 'Меллстрой', 'Это он! Кокич!'], [5.6, 'Кокич', 'Профессор? Меллстрой?! Я здесь! Тяните!'], [8.8, 'Профессор', 'Держись! Мы тебя слышим!']],
      draw: function (ct) {
        bgG('#120a2a', '#2a1a4a'); flr('#241038'); var w = Math.min(1, ct / 3) * 160;
        csRift(660, 260, Math.min(1, ct / 3), ct);
        if (ct > 3) { var lp = (ct * 0.7) % 1; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,220,255,' + (0.35 * (1 - lp)).toFixed(2) + ')'; ctx.fillRect(660 - 3, 30, 6, 460 * lp); ctx.restore(); }
        aSci(230, 1, 1.05, 0); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(40, 380, 150, 50); aMell(110, 0.8, 'rgba(200,200,210,.5)');
        glt(2);
      } },
    { d: 9, say: [[0.4, 'Профессор', 'Разрез нестабилен: держать его можно недолго. Нам нужен якорь во времени.'], [4, 'Меллстрой', 'Значит, продолжаем искать. Кокич, не уходи!'], [6.6, 'Кокич', 'Куда я денусь… я же в петле.']],
      draw: function (ct) { bgG('#120a2a', '#2a1a4a'); flr('#241038'); clockSpiral(700, 240, 160, ct * 2, 'rgba(255,200,255,.6)'); aSci(260, 1, 1.05, 0); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(80, 380, 150, 50); aMell(150, 0.8, 'rgba(200,200,210,.5)'); aKok(700, -1, 0.9, { a: 0.5 + 0.4 * Math.sin(ct * 8) }); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ЧАСТЬ 6 ПРОЙДЕНА', 'Разрез открыт: Кокич слышит вас', Math.min(1, ct / 1.2), 240); } }
  ];

var atm = { p: [], birds: [], nb: 12, tp: 0 };

var fx = [];

var pets = [], petToast = false;

var PET_RUN = 300;

var SQ_CHANCE = [1, 0.6, 0.25, 0.07, 0.012, 0.002];

var sqOpen = false;

var sqOv = document.getElementById('sqOverlay'), sqRowsEl = document.getElementById('sqRows'), sqInfoEl = document.getElementById('sqInfo'), sqDisBtn = document.getElementById('sqDis'), sqFeedBtn = document.getElementById('sqFeed');

sqDisBtn.addEventListener('click', function () {
    if (save.army <= 0) { sfx('no'); return; }
    if (save.sqOff) sqGather(); else sqDisband();
    sqRender();
  });

sqFeedBtn.addEventListener('click', feedArmy);

document.getElementById('sqClose').addEventListener('click', sqClosePanel);

sqOv.addEventListener('pointerdown', function (e) { if (e.target === sqOv) sqClosePanel(); });

document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sqOpen) sqClosePanel(); });

var sqTapAt = 0;

var armyChip = document.getElementById('armyMini');

armyChip.title = 'Армия белок: нажми, чтобы дать команды';

armyChip.addEventListener('click', sqTap);

armyChip.addEventListener('pointerup', function (e) { if (e.pointerType && e.pointerType !== 'mouse') sqTap(e); });

var bins = [], BIN_CD = 70, STOP_CD = 90;

(function () {
    var xs = [2100, 2900, 4300, 5600, 6300, 7200, 8200, 9000, 10600, 11800, 13500, 14400, 15100, 16400, 17300, 18800];
    for (var i = 0; i < xs.length; i++) bins.push({ x: xs[i], cd: 0, ph: Math.random() * 6 });
  })();

var specBtn = document.getElementById('specBtn'), lastSpec = '';

specBtn.addEventListener('click', function () { callSpecial(); });

var bossBuff = 1, bossFast = 1, bossOut = 0;

var BOSS_PLAYER_HP = 250;

var BOSS_HP = 750, BOSS_TIME = 180, BOSS_ASPECT = 362 / 560, BOSS_COINS = 2500, SHIELD_MAX = 150;

var BOSS_PH = [0.7, 0.4, 0.15];

var bossSess = 0, bossPaid = 0;

var EYE_X = 0.41, EYE_Y = 0.168;

var BOT_DMG = [10, 15, 30, 60, 140, 320];

var boss = { on: false, hp: 0, max: BOSS_HP, x: 0, y: 0, vy: 0, face: -1, st: '', t: 0, age: 0, left: 0, cd: 0, flash: 0, rage: false, healed: false, dead: 0, gt: 0, ground: false, last: '', tx: 0, y0: 0, did: false, did2: false, shield: 0, blind: 0, immune: 0, milkAt: -99, big: false, phase: 1, queue: [], milkN: 0, healTot: 0, warn: '', warnT: 0 };

var beams = [], stars = [], shots = [], acorns = [], waves = [], orbs = [], flames = [];

var bossNp = 1, atkHint = {};

var bossRole = '', bossOwner = '', bossFcd = 0, bn = { x: 0, y: 0, has: false }, bsn = null, bossSnT = 0, bossPend = [];

var iFrames = 0, throwCd = 0, noAmmoT = 0, ammo = 0, coverHint = false;

var shakeX = 0, shakeY = 0, shk = 0;

var thr = { key: false, ptr: false, btn: false };

var elBossBar = document.getElementById('bossBar'), elBossFill = document.getElementById('bossFill');

var elBossTxt = document.getElementById('bossTxt'), elBossTime = document.getElementById('bossTime'), lastBossUi = '';

var elBossShield = document.getElementById('bossShield'), elBossShieldWrap = document.getElementById('bossShieldWrap'), elBossAmmo = document.getElementById('bossAmmo');

var bossWhite = null;

var AMMO_NAMES = ['Грязные', 'Мытые', 'Стекловата'];

var PH_NAME = ['', 'Разминка', 'Злость', 'Ярость', 'Финальная ярость'];

var BOSS_POOL = {
    1: ['laser', 'stars', 'stomp', 'dive', 'charge'],
    2: ['laser', 'stars', 'stomp', 'dive', 'charge', 'orb', 'barrage', 'combo'],
    3: ['laser', 'sweep', 'stomp', 'dive', 'charge', 'orb', 'barrage', 'meteor', 'combo', 'combo'],
    4: ['laser', 'sweep', 'nova', 'nova', 'meteor', 'barrage', 'charge', 'orb', 'combo', 'combo', 'combo']
  };

var BOSS_COMBO = {
    2: [['dive', 'stars'], ['charge', 'orb'], ['stomp', 'laser']],
    3: [['stomp', 'barrage'], ['laser', 'charge'], ['sweep', 'meteor'], ['dive', 'stomp', 'orb']],
    4: [['nova', 'laser'], ['charge', 'stomp', 'barrage'], ['sweep', 'nova'], ['meteor', 'laser', 'charge']]
  };

var BOSS_WARN = {
    laser: 'ЛАЗЕР! Прячься под крышу остановки', sweep: 'ЛУЧ ПО ЗЕМЛЕ! Прыгай или беги', stars: 'ЗВЁЗДЫ! Уходи с красных кругов', meteor: 'МЕТЕОРИТЫ! Двигайся',
    barrage: 'ОГНЕННЫЙ ЗАЛП! Не стой в огне', charge: 'РЫВОК! Перепрыгни его', dive: 'ПИКЕ! Беги в сторону', stomp: 'ТОПОТ! Прыгай через волны',
    orb: 'ТЁМНЫЙ ШАР! Уворачивайся', nova: 'СВЕРХНОВА! Прыгай через три волны', milk: 'Пьёт молоко: бей по щиту!'
  };

var elFuel = document.getElementById('fuelMini'), elFuelN = document.getElementById('nFuel'), lastFuel = '';

var elCall = document.getElementById('callBusBtn'), lastCall = '';

elCall.addEventListener('click', callOwnBus);

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || (e.target && e.target.tagName === 'INPUT')) return;
    var k = e.key;
    if (e.code === 'KeyB' || k === 'b' || k === 'B' || k === '\u0438' || k === '\u0418') callOwnBus();
  });

var ARM_C = ['#5b6471', '#6b7482', '#7d8796', '#8e99aa', '#c9a43a'];

var WPRICE = { wmg: [700, 1200, 2000], wrk: [900, 1500, 2400], wtr: [1200, 2000, 3200] };

var W_MG = { dmg: [0, 1.5, 2.2, 3], rate: [0, 4, 5, 6] };

var W_RK = { dmg: [0, 40, 60, 90], cd: [0, 8, 7, 6] };

var W_TR = { dmg: [0, 4, 6.5, 10], cd: [0, 0.85, 0.7, 0.55] };

var shotUid = 0;

var wT = { mg: 0, rk: 0, tr: 0 }, wF = { mg: 0, rk: 0, tr: 0 };

var ACH = [
    { id: 'first', n: 'Первая чекушка', d: 'Подними свою первую чекушку.' },
    { id: 'sell', n: 'Первая выручка', d: 'Сдай чекушки в магазин.' },
    { id: 'wash', n: 'Чистая работа', d: 'Помой чекушку на мойке.' },
    { id: 'b100', n: 'Коллекционер', d: 'Подними 100 чекушек за всё время.' },
    { id: 'b500', n: 'Стеклотарный магнат', d: 'Подними 500 чекушек за всё время.' },
    { id: 'rare', n: 'Что-то блестит', d: 'Найди редкую чекушку или лучше.' },
    { id: 'epic', n: 'Фиолетовая удача', d: 'Найди эпическую чекушку.' },
    { id: 'legend', n: 'Золотая находка', d: 'Найди легендарную чекушку.' },
    { id: 'myth', n: 'Красная мечта', d: 'Найди мифическую чекушку.' },
    { id: 'rich', n: 'Богач', d: 'Накопи 5000 коинов.' },
    { id: 'bus', n: 'Хозяин автобуса', d: 'Купи личный автобус.' },
    { id: 'wool', n: 'Больно!', d: 'Поймай стекловату.' },
    { id: 'forest', n: 'Лесной житель', d: 'Выберись за город.' },
    { id: 'boss', n: 'Хоумлендер повержен', d: 'Победи Хоумлендера-Петуха.' },
    { id: 'lobby', n: 'Не один', d: 'Зайди в лобби, где есть другой игрок.' },
    { id: 'chat', n: 'Болтун', d: 'Напиши сообщение в чат лобби.' },
    { id: 'pass', n: 'Пассажир', d: 'Сядь в автобус другого игрока.' },
    { id: 'phone', n: 'На связи', d: 'Купи телефон.' },
    { id: 'trader', n: 'Первая сделка', d: 'Купи Чекушка-коин на бирже.' },
    { id: 'broker', n: 'Биржевой волк', d: 'Заработай 500 коинов на одной продаже Чекушка-коинов.' },
    { id: 'unl', n: 'Всегда онлайн', d: 'Подключи безлимитный мобильный интернет.' },
    { id: 'city', n: 'Большой город', d: 'Зайди в Город Чекушек.' },
    { id: 'park', n: 'Белка в колесе', d: 'Зайди в Парк.' },
    { id: 'airport', n: 'Рейс подан', d: 'Дойди до Аэропорта через Город Чекушек.' },
    { id: 'kraken', n: 'Укротитель шторма', d: 'Победи Кракена.' },
    { id: 'kraken_solo', n: 'Один против Кракена', d: 'Победи Кракена в одиночку.' },
    { id: 'kraken_clean', n: 'Без потерь', d: 'Победи Кракена, сохранив больше половины прочности лодки или подлодки.' },
    { id: 'maldives', n: 'Отпуск мечты', d: 'Слетай на Мальдивы.' },
    { id: 'sub', n: 'Глубоководник', d: 'Купи подводную лодку.' },
    { id: 'boat', n: 'Капитан', d: 'Купи рыбацкую лодку на Мальдивах.' },
    { id: 'sea', n: 'Морской волк', d: 'Выйди на лодке в Открытое море.' },
    { id: 'fish25', n: 'Заядлый рыбак', d: 'Поймай 25 рыб.' },
    { id: 'gfish', n: 'Улов мечты', d: 'Поймай секретную рыбу.' },
    { id: 'wh', n: 'Белый дом', d: 'Дойди до Города Белого Дома.' },
    { id: 'mell', n: 'Задание от Меллстроя', d: 'Выполни задание Меллстроя.' },
    { id: 'island', n: 'Робинзон', d: 'Попади на необитаемый остров.' },
    { id: 'cave', n: 'В глубине пещеры', d: 'Зайди в пещеру на острове.' },
    { id: 'lab', n: 'Учёный', d: 'Возьми образец в лаборатории.' },
    { id: 'hmdown', n: 'Конец Хоумлендера', d: 'Победи Хоумлендера в Городе Белого Дома.' },
    { id: 'erase', n: 'Стёрт навсегда', d: 'Посмотри, как Хоумлендера стирают из мира.' },
    { id: 'magic', n: 'Сила доната', d: 'Получи донат-магию, которая остаётся навсегда.' },
    { id: 'revive', n: 'Вернуть нельзя оставить', d: 'Пройди 5 заданий Собирателя и воскреси Хоумлендера.' },
    { id: 'hosp', n: 'Больничная палата', d: 'Навести Меллстроя в Больнице.' },
    { id: 'stones', n: 'Порядок камней', d: 'Активируй все 5 камней в шахте в правильном порядке.' },
    { id: 'note', n: 'Смятый листок', d: 'Прочитай подсказку в лаборатории.' },
    { id: 'seclab', n: 'Секретная лаборатория', d: 'Войди в секретную лабораторию и прочитай запись.' },
    { id: 'lab3', n: 'Вся правда', d: 'Прочитай все 5 записей эксперимента.' },
    { id: 'mgcity', n: 'Город Моггити', d: 'Приди в город, где могают.' },
    { id: 'forest', n: 'Тихий Лес', d: 'Найди Лес справа от Парка.' },
    { id: 'cem', n: 'Память', d: 'Положи цветы на все могилы кладбища.' },
    { id: 'home', n: 'Дом, милый дом', d: 'Выспись в доме Кокича.' },
    { id: 'jack', n: 'Джекпот', d: 'Выиграй главный приз базарной лотереи.' },
    { id: 'crt', n: 'Закон на моей стороне', d: 'Сбей долг через суд.' },
    { id: 'escp', n: 'Побег', d: 'Сбеги из тюрьмы.' },
    { id: 'hvp', n: 'Исповедь священника', d: 'Выслушай священника и зажги три свечи.' },
    { id: 'hvs', n: 'Небеса', d: 'Поднимись в небесную канцелярию.' },
    { id: 'hv1', n: 'Книга сохранена', d: 'Концовка небес: сохрани копии вселенных.' },
    { id: 'hv2', n: 'Своя строка', d: 'Концовка небес: сотри копии и отвечай сам.' },
    { id: 'fin', n: 'Жил не зря', d: 'Увидь финал игры.' },
    { id: 'hv3', n: 'Небеса без судей', d: 'Победи Старшего Судью и перепиши книгу.' },
    { id: 'mgct', n: 'Мог и щупальца', d: 'Победи Моггити и Ктулху в офисе.' },
    { id: 'rush', n: 'Босс-раш пройден', d: 'Победи восьмерых боссов подряд в мини-режиме.' },
    { id: 'rush2', n: 'Скоростной раш', d: 'Пройди босс-раш быстрее 12 минут.' },
    { id: 'colf', n: 'Отбился от коллектора', d: 'Победи коллектора банка в испытании.' },
    { id: 'mgo', n: 'Король мога', d: 'Победи Чикена Моггити в его офисе.' },
    { id: 'mgs', n: 'Милосердие', d: 'Пощади Чикена Моггити.' },
    { id: 'mgk', n: 'Конец Моггити', d: 'Добей Чикена Моггити и узнай, куда ведёт ритуал.' },
    { id: 'office', n: 'Офис Моггити', d: 'Зайди в офис Чикена Моггити.' },
    { id: 'c2peace', n: 'Мир на ферме', d: 'Глава 2: заключи мир с ганнерами в Чало Хаусе.' },
    { id: 'c2geno', n: 'Конец вселенной', d: 'Глава 2: разрушь вселенную Чикен Гана.' },
    { id: 'avbuy', n: 'Пилот', d: 'Купи самолёт, вертолёт или грузовой самолёт в ангаре аэропорта.' },
    { id: 'avfly', n: 'Взлёт', d: 'Поднимись в воздух на своём борту.' },
    { id: 'c2late', n: 'Слишком поздно', d: 'Глава 2: вернись в город после пяти вселенных.' },
    { id: 'c2all', n: 'Последняя вселенная', d: 'Глава 2: уничтожь все пять вселенных пушкой телепорта.' },
    { id: 'secbot', n: 'Секретная чекушка', d: 'Найди секретную чекушку: она стоит ×100 от курса.' },
    { id: 'ruins', n: 'Руины фермы', d: 'Побывай в руинах Чало Хауса.' },
    { id: 'c2wake', n: 'Проснуться в огне', d: 'Глава 2: очнись в горящей лаборатории.' },
    { id: 'c2cg', n: 'Во вселенной Чикен Гана', d: 'Глава 2: заключи сделку и подними бунт в Чикен Гане.' },
    { id: 'c2flags', n: 'Пиратские флаги', d: 'Глава 2: подними все 5 пиратских флагов в лагере бунта.' },
    { id: 'c2srv', n: 'Сервера «бунт чг»', d: 'Глава 2: создай три сервера с именами «бунт чг».' },
    { id: 'c2yt', n: 'Ютуберы с нами', d: 'Глава 2: привлеки трёх ютуберов к бунту.' },
    { id: 'rescue', n: 'Спасатель', d: 'Вытащи из-под обломков мороженщика и врача.' },
    { id: 'faith', n: 'Верующий', d: 'Выбери веру у алтаря.' },
    { id: 'devout', n: 'Фанатик', d: 'Доведи благочестие до 5 из 5.' },
    { id: 'hn5', n: 'Пять ночей', d: 'Пройди все пять ночей в бургерной.' },
    { id: 'icecream', n: 'Сладкоежка', d: 'Донеси и съешь мороженое в Парке.' },
    { id: 'candle', n: 'Свечка за рожок', d: 'Поставь в церкви свечку за уроненное мороженое.' },
    { id: 'holy', n: 'Ученик священника', d: 'Пройди испытание веры и выучи святую магию.' },
    { id: 'loan0', n: 'Первый кредит', d: 'Возьми кредит в банке или в телефоне.' },
    { id: 'loan', n: 'Кредитная история', d: 'Полностью верни кредит.' },
    { id: 'debtor', n: 'Должник', d: 'Просрочь кредит.' },
    { id: 'hn', n: 'Голодная ночь', d: 'Отработай ночную смену в бургерной до шести утра.' },
    { id: 'c2k0', n: 'Зелёный Кокич повержен', d: 'Глава 2: уничтожь вселенную Зелёного Кокича.' },
    { id: 'c2k1', n: 'Кокич без чекушек повержен', d: 'Глава 2: уничтожь вселенную Кокича без чекушек.' },
    { id: 'c2k2', n: 'Хоумкокич повержен', d: 'Глава 2: уничтожь вселенную Хоумкокича.' },
    { id: 'c2k3', n: 'Кокич-Моггити повержен', d: 'Глава 2: уничтожь вселенную Кокича-Моггити.' },
    { id: 'c2endA', n: 'Под властью Прайма', d: 'Глава 2: помоги Прайму против Моггити.' },
    { id: 'c2endB', n: 'Своими руками', d: 'Глава 2: победи Прайма вместе с Моггити и восстанови мир без чудес.' },
    { id: 'c2primeDead', n: 'Прайм пал', d: 'Глава 2: помоги Моггити победить Прайма.' },
    { id: 'c2ending', n: 'Концовка: цена сделки', d: 'Глава 2: пройди концовку со сделкой Кокича Прайма.' },
    { id: 'c2deal', n: 'Цена сделки', d: 'Глава 2: заключи сделку с Кокичем Праймом ценой Меллстроя.' },
    { id: 'c2prime', n: 'Оригинал', d: 'Глава 2: победи Кокича Прайма в шестой вселенной.' },
    { id: 'c2k4', n: 'Тихий Кокич повержен', d: 'Глава 2: уничтожь вселенную Тихого Кокича.' },
    { id: 'endp', n: 'Обычная жизнь', d: 'Финал пощады: закрой временную петлю вместе с профессором и Меллстроем.' },
    { id: 'c2part1', n: 'Конец 1 части', d: 'Глава 2: заверши 1 часть, когда Чикен Ган обновится.' },
    { id: 'cargo', n: 'Курьер на грузовом', d: 'Доставь груз для пилота на Мальдивы.' },
    { id: 'sqbuf', n: 'Белки-имба', d: 'Скорми армии 15 орешков: бафф станет вечным.' },
    { id: 'c2multi', n: 'Мультивселенная', d: 'Глава 2: узнай, что разрез времени породил другие вселенные.' },
    { id: 'alt', n: 'Вселенная Чикен Ган', d: 'Проведи обряд после смерти Моггити и попади в Главу 2.' },
    { id: 'mog1', n: 'Могнул могера', d: 'Победи могера в городе Моггити.' },
    { id: 'gym1', n: 'Первая тренировка', d: 'Пройди тренировку в Качалке.' },
    { id: 'bg1', n: 'Первый бургер', d: 'Съешь бургер в бургерной.' },
    { id: 'bg10', n: 'Любитель бургеров', d: 'Съешь 10 бургеров. Награда: бургер-кулон.' },
    { id: 'bg30', n: 'Гурман «Чекушка-Бургера»', d: 'Съешь 30 бургеров.' },
    { id: 'gym5', n: 'Гигачикен', d: 'Прокачай Качалку на максимум и стань качком.' },
    { id: 'cthulhu', n: 'Ктулху повержен', d: 'Победи Ктулху торпедой.' },
    { id: 'pure', n: 'Чистые чекушки', d: 'Забери Глубинное сокровище: все чекушки станут чистыми.' },
    { id: 'sci', n: 'Выживший образец', d: 'Найди профессора в секретной лаборатории.' },
    { id: 'resc', n: 'Вызов спасателей', d: 'Отведи профессора в Больницу и вызови спасателей.' },
    { id: 'ward', n: 'Золотая палата', d: 'Зайди в Палату 1 к Меллстрою.' },
    { id: 'fin4', n: 'Конец 4 части', d: 'Начни обряд возврата и увидь, как Моггити встаёт барьером.' },
    { id: 'fin6', n: 'Разрез времени', d: 'Пройди 1 главу 6 части: открой разрез к Кокичу.' },
    { id: 'fin5', n: 'Конец 5 части', d: 'Победи глюк времени и пройди финал 5 части.' },
    { id: 'fatwin', n: 'Король бургеров', d: 'Выиграй битву за еду у Хоумлендера.' },
    { id: 'army5', n: 'Полная армия', d: 'Собери армию из 5 белок.' },
    { id: 'm1k', n: 'Первая тысяча', d: 'Накопи 1 000 коинов. Награда: кулон-коин.' },
    { id: 'm10k', n: 'Десять тысяч', d: 'Накопи 10 000 коинов. Награда: котелок.' },
    { id: 'm100k', n: 'Сто тысяч', d: 'Накопи 100 000 коинов. Награда: очки-монеты.' },
    { id: 'm1m', n: 'Миллионер', d: 'Накопи 1 000 000 коинов. Награда: золотой цилиндр.' },
    { id: 'm10m', n: 'Мультимиллионер', d: 'Накопи 10 000 000 коинов. Награда: платиновая цепь.' },
    { id: 'm100m', n: 'Король коинов', d: 'Накопи 100 000 000 коинов. Награда: нимб.' },
    { id: 'route', n: 'Пассажир автопилота', d: 'Доберись до другой локации автопилотом маршрута.' }
  ];

var ACH_KEY = 'chekushka-ach-v1', achOwn = {}, achCount = 0, achPrevBot = -1;

try {
    var ar = JSON.parse(localStorage.getItem(ACH_KEY) || '{}');
    if (ar && typeof ar === 'object') { achOwn = ar.o && typeof ar.o === 'object' ? ar.o : {}; achCount = Math.max(0, +ar.c || 0); }
  } catch (e) {}

setInterval(achTick, 600);

achRender();

var SKINS = [
    { n: 'Классика', c: null },
    { n: 'Золотой', c: '255,196,40', a: 0.4 },
    { n: 'Синий', c: '60,110,255', a: 0.38 },
    { n: 'Красный', c: '230,40,60', a: 0.36 },
    { n: 'Зелёный', c: '40,190,100', a: 0.36 },
    { n: 'Фиолетовый', c: '150,70,230', a: 0.38 },
    { n: 'Ночной', c: '10,15,45', a: 0.5 }
  ];

var mySkin = 0, skinCache = {};

try { mySkin = Math.max(0, Math.min(SKINS.length - 1, parseInt(localStorage.getItem('chekushka-skin'), 10) || 0)); } catch (e) {}

buildSkins();

var ACC = [
    [{ n: 'Без шапки' }, { n: 'Ковбойская шляпа' }, { n: 'Кепка' }, { n: 'Цилиндр', a: 'bus' }, { n: 'Корона', a: 'boss' }, { n: 'Колпак', a: 'sell' }, { n: 'Котелок', a: 'm10k' }, { n: 'Золотой цилиндр', a: 'm1m' }, { n: 'Нимб', a: 'm100m' }],
    [{ n: 'Без очков' }, { n: 'Круглые очки' }, { n: 'Тёмные очки', a: 'rich' }, { n: 'Монокль', a: 'b100' }, { n: 'Очки-монеты', a: 'm100k' }],
    [{ n: 'Без украшений' }, { n: 'Бабочка' }, { n: 'Шарф', a: 'forest' }, { n: 'Золотая цепь', a: 'myth' }, { n: 'Кулон-коин', a: 'm1k' }, { n: 'Платиновая цепь', a: 'm10m' }, { n: 'Бургер-кулон', a: 'bg10' }]
  ];

var ACC_TITLES = ['Шапка', 'Очки', 'На шею'];

var myAcc = [0, 0, 0];

try {
    var ac0 = (localStorage.getItem('chekushka-acc') || '').split(',');
    for (var as0 = 0; as0 < 3; as0++) { var v0 = parseInt(ac0[as0], 10) || 0; myAcc[as0] = (v0 > 0 && v0 < ACC[as0].length && accOk(as0, v0)) ? v0 : 0; }
  } catch (e) {}

buildAcc();

const socket = (typeof io === 'function') ? io({ reconnection: true, reconnectionDelay: 3000, reconnectionDelayMax: 15000, timeout: 8000 }) : null;

var MAX_ROOM = 15;

var net = { state: socket ? 'connecting' : 'none', room: null, rooms: [], others: {}, log: [], say: {}, sendT: 0, err: '' };

var bossT = 0;

var ride = { id: '' };

var elNetMini = document.getElementById('netMini'), elNetTxt = document.getElementById('netTxt'), lastNetUi = '';

var elFeed = document.getElementById('chatFeed');

if (socket) {
    socket.on('connect', function () { net.state = 'online'; net.err = ''; netProfile(); socket.emit('lobbies'); renderLobby(); });
    socket.on('disconnect', function () { net.state = 'offline'; net.room = null; net.others = {}; ride.id = ''; bossSolo(); krSolo(); tripNetLost(); renderLobby(); });
    socket.on('connect_error', function () { if (net.state !== 'online') { net.state = 'offline'; renderLobby(); } });
    socket.on('full', function () { net.state = 'full'; renderLobby(); });
    socket.on('lobbies', function (l) { net.rooms = l || []; if (PING.wait) { pingGot(); if (!lobbyOpen) return; } renderLobby(); });
    socket.on('room', function (r) {
      net.room = r || null;
      if (!r) { net.others = {}; net.log = []; ride.id = ''; bossSolo(); krSolo(); tripNetLost(); }
      renderLobby();
    });
    socket.on('err', function (m) { net.err = (m && m.t) || 'Ошибка'; toast(net.err, 3000); renderLobby(); });
    socket.on('left', function (id) { delete net.others[id]; });
    socket.on('chat', chatPush);
    socket.on('boss', bossNetMsg);
    socket.on('kr', krNetMsg);
    socket.on('flight', flightMsg);
    socket.on('nick', function (m) {
      if (!m || m.ok) return;
      try { localStorage.setItem('chekushka-nick', m.n); } catch (e) {}
      var f = document.getElementById('lbNick'); if (f) f.value = m.n;
      net.err = 'Ник «' + m.w + '» уже занят. Тебе выдан «' + m.n + '», можешь ввести другой.'; toast(net.err, 4000); renderLobby();
    });
    socket.on('rb', function (m) {
      if (!m || loc.i !== CGC) return;
      if (m.go !== undefined) {
        save.mx.rb = rb() | ((m.go | 0) & 8191); persist();
        if (!cs.on && rbReady()) { toast((m.n || 'Друг') + ' начинает бунт: вы вместе!', 3000); c2RiotGo(); }
        return;
      }
      var b = m.b | 0; if (b < 0 || b > 12 || ((rb() >> b) & 1)) return;
      rbAdd(b, true); sfx('rare');
      toast((m.n || 'Друг') + ' помог с бунтом: ' + (b < 5 ? 'флаг' : (b < 10 ? 'сервер' : 'ютубер')) + '. Флагов ' + rbFlags() + '/5, серверов ' + rbSrv() + '/3, ютуберов ' + rbYt() + '/3.', 3500);
      if (rbFlags() === 5) ach('c2flags'); if (rbSrv() === 3) ach('c2srv'); if (rbYt() === 3) ach('c2yt');
    });
    socket.on('rv', function (m) { dnRevive(m && m.n, m); });
    socket.on('paxno', function () {
      if (!pax.on) return;
      cab.on = false; paxExit(); toast('В борту нет свободных мест.', 3000);
    });
    socket.on('players', function (list) {
      var seen = {};
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        if (p.id === socket.id) continue;
        seen[p.id] = 1;
        var o = net.others[p.id];
        if (!o) o = net.others[p.id] = { rx: p.x, rbx: p.ox, x: p.x, vx: 0, t: 0 };
        var nowT = performance.now() / 1000, gapT = nowT - (o.t || 0);
        if (o.t && gapT > 0.02 && gapT < 0.6 && (p.l | 0) === (o.l | 0)) { var vv = (p.x - o.x) / gapT; o.vx = Math.abs(vv) > 900 ? 0 : (o.vx || 0) * 0.35 + vv * 0.65; } else o.vx = 0;
        o.t = nowT;
        o.n = p.n; o.s = p.s; o.a = p.a; o.rd = p.rd; o.x = p.x; o.z = p.z; o.f = p.f; o.b = p.b; o.own = p.own; o.bx = p.ox; o.bd = p.od; o.l = p.l | 0; o.ti = p.ti ? 1 : 0; o.sv = p.sv ? 1 : 0; o.dz = +p.dz || 0; o.bk = p.bk | 0; o.rc = p.rc ? 1 : 0; o.bl = p.bl | 0; o.av = (p.av | 0) > 0 && (p.av | 0) < AV.length ? p.av | 0 : 0; o.ah = +p.ah || 0; o.fg = p.fg ? 1 : 0; o.dw = p.dw ? 1 : 0; o.gh = p.gh ? 1 : 0; o.gx = +p.gx || 0; o.cb = p.cb ? 1 : 0; o.px = p.px || ''; o.cs = p.cs === undefined ? -1 : p.cs | 0; o.cx = p.cx | 0; o.cf = p.cf > 0 ? 1 : -1; o.ci = p.ci | 0; o.rr = p.rr === undefined ? 2 : p.rr | 0; o.rp = p.rp ? 1 : 0; o.avs = p.avs | 0; o.afu = p.afu | 0; if (o.rz === undefined) o.rz = o.dz;
      }
      for (var k in net.others) if (!seen[k]) delete net.others[k];
    });
  }

var PING = { ms: -1, t0: 0, wait: false, to: 0, hist: [] };

setInterval(function () { if (document.hidden) return; if (music.ping || settingsOpen) pingSend(); }, 3000);

var RC_X = 1940, rc = { st: '', end: 0, by: '' };

var elRc = document.createElement('div');

elRc.style.cssText = 'position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 58px);transform:translateX(-50%);z-index:55;background:rgba(10,40,24,.9);color:#d6ffe0;border:2px solid #5be08a;border-radius:14px;padding:8px 14px;font:700 14px "Rubik",system-ui,sans-serif;text-align:center;max-width:92vw;display:none;pointer-events:none';

document.body.appendChild(elRc);

if (socket) socket.on('rit', rcMsg);

var menuOverlay = document.getElementById('menuOverlay'), lobbyOverlay = document.getElementById('lobbyOverlay');

byId('btnRush').addEventListener('click', function () { if (net.room && socket) socket.emit('leave'); startPlay(); rrOffer(); });

byId('btnSolo').addEventListener('click', function () { if (net.room && socket) socket.emit('leave'); startPlay(); });

byId('btnMenu').addEventListener('click', function () { closeSheet(); showMenu(); });

if (!socket) {
    byId('btnMulti').disabled = true;
    byId('menuNote').textContent = 'Мультиплеер недоступен: запусти игру через сервер (npm start), а не прямо с диска. Одиночная игра работает.';
  } else {
    byId('menuNote').textContent = 'Мультиплеер: лобби от 1 до ' + MAX_ROOM + ' игроков и чат. Играть можно и в одиночную.';
    byId('btnMulti').addEventListener('click', function () { openLobby(false); });
    elNetMini.style.pointerEvents = 'auto'; elNetMini.style.cursor = 'pointer';
    elNetMini.addEventListener('click', function () { openLobby(false); });
    byId('closeLobby').addEventListener('click', closeLobby);
    byId('btnPlay').addEventListener('click', startPlay);
    byId('btnLeave').addEventListener('click', function () { socket.emit('leave'); });
    byId('btnCreate').addEventListener('click', function () { net.err = ''; socket.emit('create', { max: +byId('lbSize').value || 10 }); });
    byId('btnCode').addEventListener('click', function () { var c = byId('codeInput').value.trim().toUpperCase(); if (c) { net.err = ''; socket.emit('enter', { c: c }); } });
    (function () { var sel = byId('lbSize'); for (var n = 1; n <= MAX_ROOM; n++) { var op = document.createElement('option'); op.value = n; op.textContent = n; if (n === 10) op.selected = true; sel.appendChild(op); } })();
    (function () {
      var sel = byId('lbSize'), val = byId('lbSizeBtn');
      if (!sel || !val) return;
      function show() { val.textContent = sel.value || '10'; }
      byId('lbMinus').addEventListener('click', function () { sel.value = String(Math.max(1, (+sel.value || 10) - 1)); show(); });
      byId('lbPlus').addEventListener('click', function () { sel.value = String(Math.min(MAX_ROOM, (+sel.value || 10) + 1)); show(); });
      sel.addEventListener('change', show);
      show();
    })();
    byId('chatSend').addEventListener('click', sendChat);
    byId('chatInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); sendChat(); } });
    byId('lbNick').addEventListener('change', function () {
      var v = byId('lbNick').value.replace(/[<>]/g, '').trim().slice(0, 14) || netNick();
      byId('lbNick').value = v; try { localStorage.setItem('chekushka-nick', v); } catch (e) {} netProfile();
    });
    lobbyOverlay.addEventListener('pointerdown', function (e) { if (e.target === lobbyOverlay) closeLobby(); });
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Escape' && lobbyOpen) { closeLobby(); return; }
      if (!keyCapture && actionOf(e.code) === 'chat' && !e.repeat && !paused && !(e.target && e.target.tagName === 'INPUT') && net.room) { e.preventDefault(); qchatOpen(); }
    });
  }

var MAT_PRE = '(?:на|по|за|до|вы|от|об|при|раз|рас|пере|под|съ|с|у|о|не|ни|вз|в|пред|объ|подъ)?';

var MAT_RE = [
    new RegExp('^' + MAT_PRE + 'ху(?:й|е|я|и|ю)'),
    /пизд|пезд/,
    new RegExp('^' + MAT_PRE + '(?:еб(?:а|е|и|о|у|ы|ю|я|$)|ебл)'),
    /^бля(?:д|т)/,
    /^сук(?:а|и|у|е|ой|ам|ами)?$/,
    /^пид(?:о|а)р/, /^пидр/,
    /^г(?:о|а)ндон/,
    /^муд(?:ак|ил|ло|аш|ач)/,
    /залуп/, /^шлюх/, /^дроч(?:и|е|у)/,
    /^fuck/, /^bitch/, /^cunt/
  ];

var LOOK = { a: 'а', b: 'в', c: 'с', e: 'е', h: 'н', k: 'к', m: 'м', o: 'о', p: 'р', t: 'т', x: 'х', y: 'у', '0': 'о', '3': 'з', '@': 'а', '$': 'с' };

var qchatBox = document.getElementById('qchat'), qchatIn = document.getElementById('qchatInput');

if (socket) {
    var chip = document.getElementById('chatMini');
    chip.style.pointerEvents = 'auto'; chip.style.cursor = 'pointer';
    chip.addEventListener('click', function () { if (qchatBox.hidden) qchatOpen(); else qchatClose(); });
    document.getElementById('qchatSend').addEventListener('click', qchatSend);
    qchatIn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); qchatSend(); }
      else if (e.key === 'Escape') { e.preventDefault(); qchatClose(); }
      e.stopPropagation();
    });
    // вышли из лобби или открыли меню: закрываем строку
    setInterval(function () { if (!qchatBox.hidden && (!net.room || paused)) qchatClose(); }, 400);
  }

var RIFT_K = 0.85;

var spr = {};

var hintBtn = document.createElement('button');

hintBtn.type = 'button';

hintBtn.id = 'hintBtn';

hintBtn.textContent = '💡';

hintBtn.title = 'Подсказка: что делать дальше';

hintBtn.hidden = true;

hintBtn.style.cssText = 'position:fixed;left:12px;top:calc(env(safe-area-inset-top,0px) + 150px);z-index:30;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:rgba(14,26,48,.8);color:#fff;font-size:20px;cursor:pointer';

document.body.appendChild(hintBtn);

hintBtn.addEventListener('click', function (e) { e.stopPropagation(); sfx('pick'); dlgShow('Подсказка', null, hintNext(), [{ t: 'Понятно', out: true }]); });

hintBtn.addEventListener('keydown', function (e) { e.stopPropagation(); });

setInterval(function () { var show = !(paused || cs.on || fin.on || boss.on || ep.on || p5.on || p6.on || rit.on || kk.on || dlgOpened || lt.st || flt.on || cab.on || hn.on); if (hintBtn.hidden === show) hintBtn.hidden = !show; }, 400);

var postFx = createPostFx({
    get ctx() { return ctx; }, get dpr() { return dpr; },
    get W() { return W; }, get H() { return H; },
    get t() { return t; }, get GX() { return GX; }, get music() { return music; },
    get PERF() { return PERF; }
  });

var _shc = {}, _shn = 0;

var SPR = { map: new Map(), res: 0, bytes: 0, max: 24e6 };

var _birch0 = birch, _oak0 = oak, _pine0 = pine, _bush0 = bush, _rock0 = rock;

birch = function (x, h, seed) {
    var sp = sprite('bi' + h + '_' + Math.floor(seed), h * 1.2 + 12, h * 0.6 + 10, 14, function (cx) { _birch0(cx, h, seed); });
    if (sp) blit(sp, x); else _birch0(x, h, seed);
  };

oak = function (x, h, seed) {
    var sp = sprite('oa' + h + '_' + Math.floor(seed), h * 1.2 + 12, h * 0.6 + 10, 14, function (cx) { _oak0(cx, h, seed); });
    if (sp) blit(sp, x); else _oak0(x, h, seed);
  };

pine = function (x, h) {
    var sp = sprite('pi' + h, h * 1.2 + 12, h * 0.6 + 10, 14, function (cx) { _pine0(cx, h); });
    if (sp) blit(sp, x); else _pine0(x, h);
  };

bush = function (x, s) {
    var bry = ((x * 7) | 0) % 3 === 0;
    var sp = sprite('bu' + s + (bry ? 'b' : 'n'), 34 * s + 8, 36 * s + 8, 10, function (cx) { _bush0(cx, s, bry); });
    if (sp) blit(sp, x); else _bush0(x, s, bry);
  };

rock = function (x, s) {
    var sp = sprite('ro' + s, 26 * s + 6, 34 * s + 6, 6 * s + 8, function (cx) { _rock0(cx, s); });
    if (sp) blit(sp, x); else _rock0(x, s);
  };

drawFarTrees = function (list, par, c1, c2) {
    setCam(par);
    var x0 = camX * par - 80, x1 = x0 + vw + 160;
    for (var i = 0; i < list.length; i++) {
      var tr = list[i];
      if (tr.x < x0 || tr.x > x1) continue;
      var pn = tr.type === 'pine', th = tr.h;
      var sp = sprite((pn ? 'fp' : 'fr') + th + c1 + c2, th * 1.2 + 10, th * 0.55 + 8, 12, function (cx) { if (pn) pineShape(cx, gY, th, c1, c2); else roundShape(cx, gY, th, c1, c2); });
      if (sp) blit(sp, tr.x); else if (pn) pineShape(tr.x, gY, th, c1, c2); else roundShape(tr.x, gY, th, c1, c2);
    }
  };

var last = performance.now();

var frameErrs = 0;

hud();

requestAnimationFrame(frame);

var gear = document.getElementById('gear');

var overlay = document.getElementById('overlay');

var sw = document.getElementById('musicSwitch');

var swSfx = document.getElementById('sfxSwitch');

var swAuto = document.getElementById('autoSwitch');

var swMat = document.getElementById('matSwitch');

var swFps = document.getElementById('fpsSwitch'), swPing = document.getElementById('pingSwitch');

var swHq = document.getElementById('hqSwitch');

var swBm = document.getElementById('bmSwitch');

var settings = createSettings({
    music: music,
    onChange: function () { saveMusic(); sync(); sfx('pick'); },
    toast: function (txt, ms) { toast(txt, ms); },
    setGraphicsMode: function (on) {
      try {
        localStorage.setItem(GXMODE, on ? 'hd' : 'lite');
        localStorage.setItem('chk_gfx2_hd_default', '1');
        gxSet(on); gxSwUi();
      } catch (e) {}
    },
    setQuality: function (q) {
      PERF.q = q;
      try { localStorage.setItem('chekushka-perf-q', String(q)); } catch (e) {}
      resize();
    }
  });

var elPerf = document.getElementById('perfChip'), elPerfNow = document.getElementById('perfNow'), lastPerfUi = '', lastPerfNow = '';

var vol = document.getElementById('vol');

var trackBox = document.getElementById('tracks');

var trackBtns = [];

TRACKS.forEach(function (tk, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'track'; b.setAttribute('role', 'radio');
    b.innerHTML = '<span class="tn">' + tk.name + '</span><span class="td">' + tk.dur + '</span>';
    b.addEventListener('click', function () {
      music.track = i; music.on = true; loadTrack(); started = true; tryPlay(); saveMusic(); sync();
    });
    trackBox.appendChild(b); trackBtns.push(b);
  });

sw.addEventListener('click', function () {
    music.on = !music.on;
    if (music.on) { started = true; tryPlay(); } else audio.pause();
    saveMusic(); sync();
  });

swAuto.addEventListener('click', function () { music.auto = !music.auto; saveMusic(); sync(); sfx('pick'); });

swMat.addEventListener('click', function () { music.mat = !music.mat; saveMusic(); sync(); sfx('pick'); renderChat(); });

swHq.addEventListener('click', function () { music.hq = !music.hq; saveMusic(); sync(); sfx('pick'); if (music.hq && PERF.q < 1) { PERF.q = 1; try { localStorage.removeItem('chekushka-perf-q'); } catch (e) {} resize(); } });

swBm.addEventListener('click', function () { music.bm = !music.bm; saveMusic(); sync(); sfx('pick'); });

swFps.addEventListener('click', function () { music.fps = !music.fps; saveMusic(); sync(); sfx('pick'); perfUi(); });

swPing.addEventListener('click', function () { music.ping = !music.ping; saveMusic(); sync(); sfx('pick'); if (music.ping) pingSend(); perfUi(); });

swSfx.addEventListener('click', function () { music.sfx = !music.sfx; saveMusic(); sync(); if (music.sfx) sfx('pick'); });

vol.addEventListener('input', function () { music.vol = vol.value / 100; audio.volume = music.vol; saveMusic(); });

var settingsOpen = false, upOpen = false, logOpen = false, washOpen = false, busOpen = false, invOpen = false;

gear.addEventListener('click', openSheet);

document.getElementById('closeSheet').addEventListener('click', closeSheet);

overlay.addEventListener('pointerdown', function (e) { if (e.target === overlay) closeSheet(); });

var invOverlay = document.getElementById('invOverlay'), invList = document.getElementById('invList'), invSum = document.getElementById('invSum');

document.getElementById('invBtn').addEventListener('click', openInv);

document.getElementById('closeInv').addEventListener('click', closeInv);

invOverlay.addEventListener('pointerdown', function (e) { if (e.target === invOverlay) closeInv(); });

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape' && invOpen) { closeInv(); return; }
    if (e.repeat || (e.target && e.target.tagName === 'INPUT')) return;
    if (keyCapture || actionOf(e.code) !== 'inv') return;
    if (invOpen) { e.preventDefault(); closeInv(); return; }
    e.preventDefault(); openInv();
  });

(function () {
    var col = document.getElementById('hudcol');
    function f() { document.documentElement.style.setProperty('--hb', Math.round(col.getBoundingClientRect().bottom) + 'px'); }
    if (window.ResizeObserver) new ResizeObserver(f).observe(col);
    window.addEventListener('resize', f); f();
  })();

var upOverlay = document.getElementById('upOverlay');

var upBox = document.getElementById('ups');

var UP_TABS = [
    ['Петух', ['Большой карман', 'Скорость бега', 'Высота прыжка', 'Перчатки']],
    ['Аирдроп и белки', ['Аирдроп', 'Особый аирдроп', 'Орешки', 'Крепкие орешки', 'Быстрые лапки', 'Большая сумка']],
    ['Здоровье', ['Крепкое здоровье', 'Быстрая регенерация']],
    ['Связь', ['Телефон', 'Пакет 100 МБ', 'Пакет 500 МБ', 'Пакет 2 ГБ', 'Безлимит']],
    ['Мойка и такси', ['Автомойка', 'Быстрый автобус']],
    ['Свой автобус', ['Свой автобус', 'Двигатель автобуса', 'Багажник', 'Магнит автобуса', 'Бак автобуса', 'Автопилот', 'Эвакуатор']],
    ['Оружие автобуса', ['Пулемёт', 'Ракетница', 'Турель']]
  ];

var upTabs = {};

try { upTabs = JSON.parse(localStorage.getItem('chekushka-tabs') || '{}') || {}; } catch (e) { upTabs = {}; }

document.getElementById('closeUp').addEventListener('click', closeUp);

upOverlay.addEventListener('pointerdown', function (e) { if (e.target === upOverlay) closeUp(); });

document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!upOverlay.hidden) closeUp(); else if (!overlay.hidden) closeSheet();
  });

var keysList = document.getElementById('keysList'), keyBtns = {}, keyCap = null;

document.getElementById('keysReset').addEventListener('click', function () { keysReset(); keysSave(); keysRender(); toast('Клавиши сброшены.', 2000); });

keysRender();

var PROMOS = {
    ticket: function () {
      if ((save.tickets | 0) > 0) return { ok: false, msg: 'У тебя уже есть билет на Мальдивы. Код не потрачен: активируй его, когда билет будет использован.' };
      save.tickets = 1;
      return { ok: true, msg: 'Готово! Ты получил билет на Мальдивы. Он лежит в инвентаре, лети из Аэропорта.' };
    }
  };

PROMOS.chekushka = function () {
    if (save.carried >= cap()) return { ok: false, msg: 'Карман полон. Освободи место и введи код ещё раз: он не потрачен.' };
    save.inv.d[5]++; save.carried++;
    return { ok: true, msg: 'Готово! В кармане новая мифическая чекушка.' };
  };

PROMOS.chapter1end = function () {
    save.coins += 25000;
    return { ok: true, msg: 'Готово! +25 000 Чикен ган коинов за первую главу.' };
  };

PROMOS.chapter2begin = function () {
    save.coins += 50000;
    return { ok: true, msg: 'Готово! +50 000 Чикен ган коинов к началу второй главы.' };
  };

var PROMO_REP = { developermode123: 1 };

var devBox = document.getElementById('devBox'), devBadge = document.getElementById('devBadge');

PROMOS.developermode123 = function () {
    if (!DEV) { persist(); DEV = true; }
    devBox.hidden = false; devBox.open = true; devBadge.hidden = false;
    return { ok: true, msg: 'Режим разработчика включён. Ниже появилась выдача коинов. Пока он включён, прогресс НЕ сохраняется: после перезагрузки всё вернётся как было.' };
  };

Array.prototype.forEach.call(devBox.querySelectorAll('[data-dev]'), function (b) { b.addEventListener('click', function () { devGive(+b.getAttribute('data-dev')); }); });

document.getElementById('devGive').addEventListener('click', function () { devGive(+document.getElementById('devAmt').value); });

['keydown', 'keyup'].forEach(function (n) { document.getElementById('devAmt').addEventListener(n, function (e) { e.stopPropagation(); }); });

var elPromoIn = document.getElementById('promoIn'), elPromoMsg = document.getElementById('promoMsg');

document.getElementById('promoGo').addEventListener('click', promoActivate);

['keydown', 'keyup'].forEach(function (n) { elPromoIn.addEventListener(n, function (e) { e.stopPropagation(); if (n === 'keydown' && e.key === 'Enter') { e.preventDefault(); promoActivate(); } }); });

var washOverlay = document.getElementById('washOverlay');

var wcv = document.getElementById('washCv'), wctx = wcv.getContext('2d');

var elWFill = document.getElementById('washFill'), elWTime = document.getElementById('washTime');

var elWSub = document.getElementById('washSub'), elWHelp = document.getElementById('washHelp');

var wg = { batch: [], spots: [], left: 0, done: false, doneT: 0, side: 0, sx: 180, sy: 150, press: false, foam: [], sndT: 0 };

wcv.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    try { wcv.setPointerCapture(e.pointerId); } catch (x) {}
    wg.press = true; var p = wpos(e); wg.sx = p.x; wg.sy = p.y; scrubAt(p.x, p.y);
  });

wcv.addEventListener('pointermove', function (e) {
    var p = wpos(e); wg.sx = p.x; wg.sy = p.y;
    if (wg.press) scrubAt(p.x, p.y);
  });

wcv.addEventListener('pointerup', wUp);

wcv.addEventListener('pointercancel', wUp);

wcv.addEventListener('lostpointercapture', wUp);

document.getElementById('closeWash').addEventListener('click', finishWashGame);

washOverlay.addEventListener('pointerdown', function (e) { if (e.target === washOverlay) finishWashGame(); });

document.addEventListener('keydown', function (e) {
    if (!washOpen) return;
    var k = e.key, side = 0;
    if (k === 'Escape') { e.preventDefault(); finishWashGame(); return; }
    if (k === 'ArrowLeft' || k === 'a' || k === 'A' || k === 'ф' || k === 'Ф') side = -1;
    else if (k === 'ArrowRight' || k === 'd' || k === 'D' || k === 'в' || k === 'В') side = 1;
    if (!side) return;
    e.preventDefault();
    if (e.repeat || wg.done || side === wg.side) return;
    wg.side = side;
    var left = [];
    for (var i = 0; i < wg.spots.length; i++) if (!wg.spots[i].gone) left.push(wg.spots[i]);
    if (!left.length) return;
    var sp = left[Math.floor(Math.random() * left.length)];
    wg.sx = sp.x + side * 18; wg.sy = sp.y; wg.press = true;
    setTimeout(function () { wg.press = false; }, 120);
    scrubAt(sp.x, sp.y);
  });

var busOverlay = document.getElementById('busOverlay'), busFrom = null, busPick = null, busOpenAt = 0;

document.getElementById('closeBus').addEventListener('click', closeBusMenu);

busOverlay.addEventListener('pointerdown', function (e) { if (e.target === busOverlay) closeBusMenu(); });

document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && busOpen) closeBusMenu(); });

var FARM = { mell: 1500, sci: 1650, exit: 150 };

var GUN_X = 2050, C2U = [
    { n: 'Вселенная Зелёного Кокича', q: 'Я оригинал! Я помню петлю, это вы копии!', c: '120,255,160' },
    { n: 'Вселенная Кокича без чекушек', q: 'Мы никого не трогали. Кто вы такие?', c: '255,220,120' },
    { n: 'Вселенная Хоумкокича', q: 'Здесь я стал Хоумлендером. Поверь, мне хуже всех.', c: '255,120,120' },
    { n: 'Вселенная Кокича-Моггити', q: 'Могну вас всех… если смогу. А вы точно настоящие?', c: '230,140,255' },
    { n: 'Вселенная Тихого Кокича', q: 'Я просто хочу домой.', c: '140,190,255' },
    { n: 'Служебная: маг', q: '', c: '190,130,255' },
    { n: 'Вселенная Кокича Прайма', q: 'Вы закрыли пять окон. Я пришёл через шестое. Я и есть оригинал.', c: '255,70,60' },
    { n: 'Чикен Моггити', q: 'Я не знаю, как выбрался. Но Прайм пойдёт обратно в трещину.', c: '255,150,240' },
    { n: 'Офис Моггити: Ктулху', q: 'Хватит мог-батлов. Теперь по-настоящему.', c: '120,255,220' },
    { n: 'Небесная канцелярия', q: 'Запись не оспаривается.', c: '255,225,140' }
  ], c2cur = 0;

CS.c2fall = [
    { d: 7, say: [[0.4, 'Рассказчик', 'Ритуал свершился, но Моггити мёртв. Барьер между вселенными треснул.'], [3.6, 'Кокич', 'Мы падаем?!'], [5.2, 'Меллстрой', 'Держитесь друг за друга!']],
      draw: function (ct) { bgG('#120a2a', '#3a1a5a'); clockSpiral(480, 270, 180 + ct * 8, ct * 4, 'rgba(255,230,255,.7)'); var k = Math.min(1, ct / 6); aKok(480, 1, 0.8, { dy: -150 + 120 * k, rot: ct * 1.2 }); aMell(250, 0.55); aSci(730, -1, 0.7, 0); csGlow(480, 270, 140 + 30 * Math.sin(ct * 4), '255,200,255', 0.2); } },
    { d: 6, say: [[0.4, 'Профессор', 'Небо… яркое. Это не наш мир.']],
      draw: function (ct, k) { csSky('#58b4ff', '#d8f0ff'); var y = -200 + 520 * Math.min(1, k * 1.25); aKok(480, 1, 0.8, { dy: y - 430 + 430 }); aMell(300, 0.6); aSci(650, -1, 0.8, 0); ctx.fillStyle = 'rgba(255,255,255,' + (0.8 * (1 - k)).toFixed(2) + ')'; ctx.fillRect(0, 0, 960, 540); } },
    { d: 9, say: [[0.4, 'Рассказчик', 'Чало Хаус. Ферма во вселенной Чикен Гана: красный амбар, ветряк и тишина, в которой слышно, как взводят затворы.'], [4.6, 'Профессор', 'Смерть Моггити сломала их мир. Либо мы договариваемся, либо стираем эту вселенную.'], [7, 'Кокич', 'Мне решать, да?']],
      draw: function (ct) { csFarm(ct, '#58b4ff', '#d8f0ff'); aKok(300, 1, 1, {}); aMell(480, 0.85); aSci(620, -1, 1, 0); aGun(850, 430, 0.9, Math.PI, 0); aGun(110, 430, 0.9, 0, 0); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ГЛАВА 2', 'Чало Хаус', Math.min(1, ct / 1.2), 240); } }
  ];

CS.c2cut = [
    { d: 9, say: [[0.4, 'Профессор', 'Мир возможен только с Моггити. Я сделаю второй разрез времени и вытащу его из последней секунды до смерти.'], [4.2, 'Кокич', 'Он же нас убивал.'], [6.4, 'Меллстрой', 'Зато ганнеры послушают только его.']],
      draw: function (ct) { csFarm(ct, '#2a3a6a', '#7a8ac0', '#1d3a2a'); aKok(300, 1, 1, {}); aMell(450, 0.85); aSci(580, -1, 1, 0); var p = Math.min(1, ct / 6); ctx.strokeStyle = 'rgba(255,150,255,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(800, 330 - 120 * p); ctx.lineTo(800 + 10 * Math.sin(ct * 9), 330); ctx.lineTo(800, 330 + 120 * p); ctx.stroke(); csGlow(800, 330, 30 + 110 * p, '255,120,255', 0.25 + 0.15 * Math.sin(ct * 6)); } },
    { d: 9, say: [[0.4, 'Рассказчик', 'Разрез раскрылся. Из него шагнул Чикен Моггити, живой и злой.'], [3.6, 'Кокич', 'Ты жив. Остановись: больше никто не должен умирать.'], [6.4, 'Рассказчик', 'Моггити не сказал ни слова. Он просто повернулся к ганнерам.']],
      draw: function (ct) { csFarm(ct, '#3a2a5a', '#b07ac0', '#1d3a2a'); var a = Math.min(1, ct / 2); csGlow(800, 320, 160 * (1 - 0.3 * a), '255,120,255', 0.35); aKok(300, 1, 1, {}); aMell(440, 0.85); aSci(560, -1, 1, 0); aMogg(720 - 60 * a, -1, 1, { a: a }); aGun(150, 430, 0.9, -0.2, 0); aGun(60, 430, 0.9, -0.2, 0); } },
    { d: 9, say: [[0.4, 'Рассказчик', 'Ганнеры увидели своего лидера и опустили оружие. Мир на ферме держался на одном его взгляде.'], [4, 'Профессор', 'Его время вышло. Разрез закроется, и он вернётся обратно, туда, откуда пришёл.'], [6.8, 'Кокич', 'Прощай, Моггити.']],
      draw: function (ct, k) { csFarm(ct, '#ff9a5a', '#ffe2b0'); var d = Math.min(1, ct / 3), go = Math.max(0, (ct - 5) / 3); aKok(300, 1, 1, {}); aMell(440, 0.85); aSci(560, -1, 1, 0); aGun(150, 430, 0.9, Math.PI * 0.5 * d - 0.2, 0); aGun(60, 430, 0.9, Math.PI * 0.5 * d - 0.2, 0); csGlow(800, 330, 80 + 60 * go, '255,120,255', 0.3 * (1 - Math.max(0, go - 0.6))); aMogg(640 + 150 * go, -1, 1 - 0.3 * go, { a: 1 - go }); } }
  ];

CS.c2peace = [
    { d: 8, say: [[0.4, 'Кокич', 'Мы не за войной. Мы просто упали к вам на ферму.'], [3.4, 'Рассказчик', 'Ганнеры опустили оружие. Впервые за долгое время на ферме стало тихо.'], [6, 'Меллстрой', 'Я не думал, что скажу это, но спасибо, что не стал стрелять.']],
      draw: function (ct) { csFarm(ct, '#7cc4ff', '#f2f8ff'); aKok(320, 1, 1, {}); aMell(470, 0.85); aSci(600, -1, 1, 0); var d = Math.min(1, ct / 4); aGun(840, 430, 0.9, Math.PI + 0.5 * d, 0); aGun(110, 430, 0.9, -0.5 * d, 0); } },
    { d: 7, say: [[0.4, 'Профессор', 'Без Моггити их мир держится на честном слове. Мы поможем его починить.'], [4, 'Меллстрой', 'А потом вернёмся домой.']],
      draw: function (ct) { csFarm(ct, '#ff9a5a', '#ffe2b0'); csGlow(700, 250, 260, '255,200,120', 0.25); aKok(330, 1, 1, {}); aMell(480, 0.85); aSci(620, -1, 1, 0); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('МИР', 'Вселенная Чикен Гана спасена', Math.min(1, ct / 1.2), 240); } }
  ];

CS.c2geno = [
    { d: 7, say: [[0.4, 'Кокич', 'Они не остановятся. Значит, остановлю я.'], [3.4, 'Профессор', 'Кокич, это целая вселенная!'], [5, 'Меллстрой', 'Он уже решил.']],
      draw: function (ct) { csFarm(ct, '#7a1a1a', '#d85a3a', '#3a2a1a'); csGlow(480, 300, 380 + 30 * Math.sin(ct * 5), '255,80,60', 0.3); aKok(320, 1, 1.05, { jx: Math.sin(ct * 30) * 1.5 }); aMell(480, 0.85); aSci(620, -1, 1, 0); for (var q = 0; q < 10; q++) aGun(560 + (q * 83) % 380, 430 - ((q * 37) % 3) * 4, 0.6, Math.PI, 0); } },
    { d: 8, say: [[0.4, 'Рассказчик', 'Вселенная Чикен Гана пошла трещинами и рассыпалась на пиксели. Остался только дым над фермой.'], [4.4, 'Профессор', 'Мы разрушили целый мир…'], [6.2, 'Меллстрой', 'Назад дороги нет.']],
      draw: function (ct, k) { csFarm(ct, '#2a0a0a', '#7a3a2a', '#2a1a10'); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; for (var i = 0; i < 9; i++) { var a = i * 0.7, r = 40 + k * 700; ctx.beginPath(); ctx.moveTo(480, 270); ctx.lineTo(480 + Math.cos(a) * r * 0.5, 270 + Math.sin(a) * r * 0.5); ctx.lineTo(480 + Math.cos(a + 0.2) * r, 270 + Math.sin(a + 0.2) * r * 0.8); ctx.stroke(); } aKok(320, 1, 1, {}); aMell(480, 0.85); aSci(620, -1, 1, 0); ctx.fillStyle = 'rgba(0,0,0,' + (0.7 * k).toFixed(2) + ')'; ctx.fillRect(0, 0, 960, 540); } },
    { d: 5, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ВСЕЛЕННАЯ РАЗРУШЕНА', 'Выбор сделан', Math.min(1, ct / 1.2), 240); } }
  ];

var MACH_X = 2500, LABX_X = 2780;

var PILOT_X = 3235, CJ_KINDS = [
    { n: 'кейсы с чекушками', lo: 4, hi: 8, p0: 5000, p1: 10000 },
    { n: 'ящики «всякого» (запчасти, почта, продукты)', lo: 6, hi: 10, p0: 3000, p1: 8000 }
  ];

var sqBuf = 0;

var apfBox = null;

var crew = null;

var ALT0 = null;

var farmVisit = false;

var party = { on: false, host: '', ids: [], pend: null, vote: null };

var csMirror = false;

if (socket) socket.on('story', storyMsg);

if (socket) socket.on('uni', function (m) {
    if (!m || !Array.isArray(m.ids)) return;
    partySet(m.ids.slice(0, 4).map(String));
    if (m.kind === 'hn') { if (socket.id === m.ids[0] && loc.i === 23 && !hn.on && dnIsNight()) { if (m.ids.length < 2) toast('В бургерной никого нет, смена будет одному.', 3500); hnStart(true, undefined, false, (m.k | 0) + 1); } return; }
    if (m.kind === 'ep') { if (m.ids.length > 1 && socket.id === m.ids[0] && ep.on && !ep.assist) storyEmit({ epj: 1 }); return; }
    if (m.kind === 'hv') { if (m.ids.length > 1 && socket.id !== m.ids[0]) toast('Ведущий вызывает Старшего Судью. Когда начнётся бой, ты шагнёшь за ним.', 5000); return; }
    if (m.k === 8 && m.ids.length > 1 && socket.id !== m.ids[0]) toast('Ведущий зовёт Ктулху в офисе Моггити. Когда начнётся бой, ты прыгнешь за ним.', 5000);
    else if (m.ids.length > 1 && socket.id !== m.ids[0]) toast('Ведущий открывает портал во вселенную. Когда начнётся бой, ты прыгнешь за ним (нужна портальная пушка).', 5000);
  });

var hudArrow = document.getElementById('hudArrow'), hudOff = false;

try { hudOff = localStorage.getItem('chekushka-hudoff') === '1'; } catch (e) {}

hudArrow.addEventListener('click', function (e) { e.stopPropagation(); hudOff = !hudOff; try { localStorage.setItem('chekushka-hudoff', hudOff ? '1' : '0'); } catch (e2) {} hudArrowApply(); sfx('pick'); });

hudArrow.addEventListener('keydown', function (e) { e.stopPropagation(); });

hudArrowApply();

var PLAY = { total: 0, sess: 0, sv: 0, shown: -1 };

try { PLAY.total = Math.max(0, parseFloat(localStorage.getItem('chekushka-playtime')) || 0); } catch (e) {}

var elPlay = document.getElementById('playStat');

window.addEventListener('pagehide', playSave);

document.addEventListener('visibilitychange', function () { if (document.hidden) playSave(); });

var AV_PARK = 3990, AV_PUMP = 2860, AV_HANGAR = 3450, AV_PUMP4 = 1250, AV_TRIP_L = 25;

if (save.avLoc === 3 && (Math.abs(save.avX - 1750) < 3 || Math.abs(save.avX - 3080) < 3)) save.avX = AV_PARK;

var AV = [null,
    { n: 'Самолёт', price: 40000, sp: 720, cap: 180, burn: 0.0014, up: 210, down: 150, s: 0.85, col: '#3b8fe0', acc: 95, vr: 300, vs: 190, brk: 380, lim: 150, info: 'быстрый, бак 180 л, 15 мест' },
    { n: 'Вертолёт', price: 90000, sp: 380, cap: 120, burn: 0.0020, up: 280, down: 110, s: 0.95, col: '#1f6fd0', info: 'медленный, но очень манёвренный, бак 120 л, 4 места' },
    { n: 'Грузовой самолёт', price: 180000, sp: 560, cap: 400, burn: 0.0011, up: 150, down: 140, s: 1.5, col: '#7b8a52', acc: 62, vr: 270, vs: 170, brk: 330, lim: 130, info: 'огромный бак 400 л, экономный, 5 мест, грузовой люк' }
  ];

var avTc = { k: '', o: null };

var ENG_PRICE = [25000, 60000, 120000], ENG_MULT = [0, 1, 1.5, 2.2];

var PAID_EV = [
    { id: 'ad', name: 'Реклама', m: 1.25, dur: 60, cost: 600, txt: 'Расклеены объявления: приёмщик ждёт больше тары.' },
    { id: 'sale', name: 'Акция «Сдай тару»', m: 1.5, dur: 75, cost: 2200, txt: 'Акция «Сдай тару!» Приёмщик берёт дороже.' },
    { id: 'fest', name: 'Свой фестиваль', m: 1.9, dur: 90, cost: 7500, txt: 'Твой фестиваль собрал весь посёлок. Тара в цене!' },
    { id: 'tv', name: 'Репортаж по ТВ', m: 2.5, dur: 60, cost: 25000, txt: 'О тебе сняли репортаж по телевизору. Курс взлетел!' }
  ];

var evOrder = { cd: 0 };

EVENTS.push(
    { name: 'Телемарафон', m: 1.45, txt: 'Телемарафон «Сдай тару»: приёмщик берёт охотнее.' },
    { name: 'Экспорт', m: 1.7, txt: 'Открылся экспорт: чекушки уходят за границу.' },
    { name: 'Налоговые каникулы', m: 1.25, txt: 'Налоговые каникулы: приёмщик платит больше.' },
    { name: 'Забастовка', m: 0.65, txt: 'Забастовка перевозчиков: тара не вывозится, курс просел.' }
  );

if (socket) socket.on('mkt', function (m) {
    if (!m || typeof m.id !== 'string' || rate.ev) return;
    var e = PAID_EV.filter(function (q) { return q.id === m.id; })[0]; if (!e) return;
    evApply({ name: e.name, m: 1 + (e.m - 1) * 0.6, dur: Math.round(e.dur * 0.6), txt: e.txt }, false, String(m.n || 'Игрок').slice(0, 14));
  });

var TIN = { exit: 170, kassa: 760, board: 1280, cafe: 1740, field: 2230 };

var TERM_X = 1700;

var CAFE_L = ['Кофе тут за коины, а чекушки наливают только по билету.', 'Бариста: «Самый вкусный капучино у тех, кто опоздал на рейс».', 'На стене плакат: «Тормоза нужны не только автобусу».'];

var bgAmb = 0;

setInterval(function () {
    try {
      if (!actx || actx.state === 'suspended' || !music.on || !music.sfx || paused || menuOpen || cs.on || boss.on || p5.on || p6.on || fin.on || dlgOpened || loc.i !== 23) return;
      var mel = [523, 659, 784, 659, 587, 698, 880, 698], bass = [131, 131, 196, 196, 147, 147, 175, 175], v = 0.05 * Math.max(0.2, music.vol || 0.5), q;
      var sh = [0, 0, 0, 0, 2, 2, 2, 2][bgAmb % 8] ? 1 : 0; void sh;
      for (q = 0; q < 8; q++) { tone(mel[q] * (bgAmb % 2 ? 1 : 1.0), q * 0.25, 0.22, v * 0.7, 'square'); if (q % 2 === 0) tone(bass[q], q * 0.25, 0.4, v, 'triangle'); }
      bgAmb++;
    } catch (e) {}
  }, 2000);

var engS = null;

setInterval(function () { try { if (engS && performance.now() - engS.t > 400) engS.g.gain.setTargetAtTime(0, actx.currentTime, 0.1); } catch (e) {} }, 300);

var avPanel = document.createElement('div');

avPanel.id = 'avPanel';

avPanel.hidden = true;

avPanel.innerHTML = '<div class="avl"><div class="avt" id="avTrack"><div class="avh" id="avHandle"></div></div><div class="avp" id="avPct">АВТО</div></div><div class="avb"><button type="button" id="avAuto">АВТО</button><div class="avg" id="avEngs"></div><button type="button" id="avGear">Шасси</button><button type="button" id="avRamp">Рампа</button></div>';

document.body.appendChild(avPanel);

var avEls = { track: document.getElementById('avTrack'), handle: document.getElementById('avHandle'), pct: document.getElementById('avPct'), auto: document.getElementById('avAuto'), engs: document.getElementById('avEngs'), gear: document.getElementById('avGear'), ramp: document.getElementById('avRamp') };

var avPanelKey = '';

avEls.auto.addEventListener('click', function () { av.lev = av.lev == null ? Math.max(0, Math.min(1, av.thr || 0)) : null; sfx('pick'); });

avEls.gear.addEventListener('click', avGearToggle);

avEls.ramp.addEventListener('click', avRampToggle);

(function () {
    var drag = false;
    function setFrom(e) { var r = avEls.track.getBoundingClientRect(); avSetLev(1 - (e.clientY - r.top) / r.height); }
    avEls.track.addEventListener('pointerdown', function (e) { drag = true; try { avEls.track.setPointerCapture(e.pointerId); } catch (x) {} setFrom(e); e.stopPropagation(); e.preventDefault(); });
    avEls.track.addEventListener('pointermove', function (e) { if (drag) setFrom(e); });
    avEls.track.addEventListener('pointerup', function () { drag = false; }); avEls.track.addEventListener('pointercancel', function () { drag = false; });
  })();

document.addEventListener('keydown', function (e) {
    if (e.repeat || !av.on || cab.on || chatTyping) return; var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
    if (e.code === 'KeyL') avGearToggle(); else if (e.code === 'KeyK') avRampToggle();
    else if (e.code === 'KeyX') avSetLev((av.lev == null ? (av.thr || 0) : av.lev) + 0.1); else if (e.code === 'KeyC') avSetLev((av.lev == null ? (av.thr || 0) : av.lev) - 0.1);
    else if (e.code === 'Digit1') avEngToggle(0); else if (e.code === 'Digit2') avEngToggle(1); else if (e.code === 'Digit3') avEngToggle(2); else if (e.code === 'Digit4') avEngToggle(3);
  });

var RT_OK = [0, 1, 2, 3, 6, 9, 10, 11], rtT = 0;

document.addEventListener('keydown', function (e) { if (av.rt && rtT > 0.5 && /^(KeyA|KeyD|KeyW|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|Space)$/.test(e.code)) rtStop('Автопилот отключён: ты за штурвалом.'); else if (av.rt && e.code === 'Escape') rtStop('Автопилот отключён.'); }, true);

['bL', 'bR', 'bJ', 'bDn'].forEach(function (id) { var el = document.getElementById(id); if (el) el.addEventListener('pointerdown', function () { if (av.rt && rtT > 0.5) rtStop('Автопилот отключён: ты за штурвалом.'); }, true); });

var rtBtn = document.getElementById('apBtn');

rtBtn.title = 'Автопилот борта: лететь в выбранную локацию (P)';

rtBtn.addEventListener('click', function (e) { e.stopPropagation(); if (av.rt) rtStop('Автопилот отключён.'); else rtMenu(); });

document.addEventListener('keydown', function (e) { if (e.code === 'KeyP' && !e.repeat && av.on && !chatTyping && !(e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) { if (av.rt) rtStop('Автопилот отключён.'); else rtMenu(); } });

var cab = { on: false, ty: 1, x: 300, face: 1, seat: -1, hatch: 0, hatchTo: 0, pax: false, near: '', ph: 0, rq: 2 };

var TANK_PRICE = 60000, TANK_FEE = 500, SKY_FUEL = 10, SKY_ID = 16, skyS = { from: 3 };

var tnk = { on: false, x: 0, h: 0, dir: 1, v: 0, t: 0, st: '', ext: 0, got: 0, cost: 0, pay: 0, lt: 0, con: false, hT: 0, loc: 0 };

var AUTO_PRICE = 45000, REPAIR_PRICE = 6000;

var NLAB = 19, BLAB = 20, CGC = 21, UNI = 22, UNI_AX = 1700, UNI_PORTAL = 860, UNI_CORE = 2540, uniV = 0;

var SRV_N = ['БУНТ ЧГ #1 | ОБНОВИТЕ ИГРУ', 'БУНТ ЧГ | ПИРАТЫ ПРОТИВ ЛАГОВ', 'БУНТ ЧГ RU | ХОТИМ ПАТЧ', 'БУНТ ЧГ | ГАННЕРЫ ЗА ПЕРЕМЕНЫ', 'БУНТ ЧГ 24/7 | ПРИСОЕДИНЯЙСЯ'];

var CG_FX = [800, 1350, 1950, 2550, 3150], CG_YT = [1100, 2250, 2850], CG_SRV = 1650, CG_LEAD = 450, NL_DOOR = 170, NL_NPC = 950, NL_BOARD = 1450, BL_FIRE = [800, 1450, 2100];

var tintC = {};

var YT_N = ['Курочкин LIVE', 'Ган-Обзор', 'Мега-Петя'];

var UV = [
    { n: 'Зелёный Кокич', t: 'Он считает себя оригиналом', hp: 400, h: 155, tint: '#2dff7a', ta: 0.5, sky: ['#06200f', '#2f8a45'], gnd: '#1f4d24', col: '120,255,160' },
    { n: 'Кокич без чекушек', t: 'Быстрый и не любит драться', hp: 380, h: 150, tint: '#cfd6dd', ta: 0.55, sky: ['#6b7580', '#c3c9d0'], gnd: '#8b9096', col: '255,220,120' },
    { n: 'Хоумкокич', t: 'Сначала маг, потом он сам: лазеры и топот', hp: 480, h: 235, tint: null, ta: 0, sky: ['#240a10', '#c8503a'], gnd: '#3b2224', col: '255,120,120' },
    { n: 'Кокич-Моггити', t: 'Зовёт помощников и мог-волны', hp: 560, h: 175, tint: '#ff7ae8', ta: 0.35, sky: ['#1a0932', '#8a3ac0'], gnd: '#2c1a3f', col: '230,140,255' },
    { n: 'Тихий Кокич', t: 'Невидим, бьёт кольцами и лечится', hp: 360, h: 150, tint: '#7fb0ff', ta: 0.45, sky: ['#040a1c', '#2a4a8a'], gnd: '#14203f', col: '140,190,255' },
    { n: 'Кокич-маг', t: 'Маг с посохом. Когда падёт, позовёт хозяина', hp: 220, h: 165, tint: '#b07cff', ta: 0.5, sky: ['#240a10', '#c8503a'], gnd: '#3b2224', col: '190,130,255' },
    { n: 'Кокич Прайм', t: 'Оригинал из шестой вселенной: три фазы и все приёмы братьев', hp: 600, h: 205, tint: '#ff3b3b', ta: 0.42, sky: ['#14030a', '#7a1426'], gnd: '#2a0f16', col: '255,70,60' },
    { n: 'Чикен Моггити', t: 'Выбрался из петли: могает, зовёт помощников, бьёт топотом', hp: 600, h: 190, tint: null, ta: 0, sky: ['#14030a', '#7a1426'], gnd: '#2a0f16', col: '255,150,240' },
    { n: 'Моггити и Ктулху', t: 'Офис, щупальца и мог-волны: настоящая битва, лучше вдвоём', hp: 1100, h: 195, tint: null, ta: 0, sky: ['#02100f', '#0e4a44'], gnd: '#0a1f22', col: '120,255,220' },
    { n: 'Старший Судья', t: 'Свет приговора: кольца, столбы и ливень света', hp: 900, h: 215, tint: '#ffe9a0', ta: 0.3, sky: ['#fff3c8', '#f2b24c'], gnd: '#cbb88a', col: '255,225,140' }
  ];

var bgTalkOn = 0;

var HN_HOUR = 50, HN_PAY = 75000, HN_PAYS = [75000, 100000, 125000, 150000, 200000], CASH_X = 2700, GUARD_X = 3560;

var hn = { on: false, host: true, asst: false, t: 0, hour: 0, pw: 100, dl: 0, dr: 0, dlT: 0, drT: 0, ll: false, lr: false, en: [], over: 0, who: null, hum: 0, msg: '', msgT: 0, out: false, flash: 0, tut: 14, win: 0, night: 1, vn: 0, vnT: 0, bo: 0, boT: 25, mP: 0, ncams: 4, cam: false, camSel: 0, camV: {}, snT: 0 };

var HN_CAMS = ['Кухня', 'Зал', 'Левый коридор', 'Правый коридор', 'Вентиляция'];

var hnUi = document.createElement('div');

hnUi.id = 'hnUi';

hnUi.hidden = true;

hnUi.style.cssText = 'position:fixed;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);z-index:70;display:flex;justify-content:space-between;align-items:flex-end;gap:8px;padding:0 10px;pointer-events:none;flex-wrap:wrap';

hnUi.innerHTML = '<div style="display:flex;gap:6px;pointer-events:auto"><button type="button" data-k="0">🚪<span class="l"> Дверь слева [1]</span><span class="s"> 1</span></button><button type="button" data-k="1">💡<span class="l"> Свет слева [2]</span><span class="s"> 2</span></button></div><div style="display:flex;gap:6px;pointer-events:auto"><button type="button" data-k="4">📹<span class="l"> Камеры [C]</span><span class="s"> C</span></button><button type="button" data-k="5" style="display:none">🌀<span class="l"> Вент [5]</span><span class="s"> 5</span></button></div><div style="display:flex;gap:6px;pointer-events:auto"><button type="button" data-k="2">💡<span class="l"> Свет справа [3]</span><span class="s"> 3</span></button><button type="button" data-k="3">🚪<span class="l"> Дверь справа [4]</span><span class="s"> 4</span></button></div>';

var hnCamUi = document.createElement('div');

hnCamUi.id = 'hnCams';

hnCamUi.hidden = true;

hnCamUi.style.cssText = 'position:fixed;left:0;right:0;top:calc(env(safe-area-inset-top,0px) + 56px);z-index:71;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;pointer-events:none';

hnCamUi.innerHTML = HN_CAMS.map(function (n, i) { return '<button type="button" data-c="' + i + '" style="pointer-events:auto">CAM ' + (i + 1) + ' · ' + n + '</button>'; }).join('');

var hnStyle = document.createElement('style');

hnStyle.textContent = '#hnUi .s{display:none}@media (max-width:700px){#hnUi .l{display:none}#hnUi .s{display:inline}#hnUi button{min-width:0;padding:12px 10px;font-size:14px}#hnUi{flex-wrap:nowrap!important;gap:4px!important;padding:0 6px!important}#hnUi>div{gap:4px!important}#hnUi button{padding:12px 4px!important;font-size:13px!important;min-width:0!important;width:52px}}body.hnon #hudArrow,body.hnon #hudcol,body.hnon .acts,body.hnon #pill,body.hnon #gear,body.hnon #invBtn,body.hnon #apBtn,body.hnon #pad,body.hnon #chatFeed,body.hnon #qchat,body.hnon #perfChip,body.hnon #evChip,body.hnon #hintBtn{display:none!important}#hnUi[hidden],#hnCams[hidden]{display:none!important}#hnUi button,#hnCams button{font:700 13px "Rubik",system-ui,sans-serif;color:#fff;background:#3a2330;border:2px solid #ff9a6a;border-radius:12px;padding:10px 8px;min-width:84px;cursor:pointer;touch-action:manipulation}#hnCams button{padding:8px 10px;min-width:0;font-size:12px;background:#10261f;border-color:#6fd69a}#hnUi button.on,#hnCams button.on{background:#a8342b;border-color:#ffd23f}#hnCams button.on{background:#1f7a4a}#hnQuit{position:fixed;right:10px;top:calc(env(safe-area-inset-top,0px) + 10px);z-index:71;font:700 12px "Rubik",system-ui,sans-serif;color:#fff;background:rgba(14,26,48,.8);border:1px solid rgba(255,255,255,.35);border-radius:10px;padding:8px 10px;cursor:pointer}';

document.head.appendChild(hnStyle);

var hnQuit = document.createElement('button');

hnQuit.type = 'button';

hnQuit.id = 'hnQuit';

hnQuit.textContent = 'Уйти со смены';

hnQuit.hidden = true;

document.body.appendChild(hnUi);

document.body.appendChild(hnCamUi);

document.body.appendChild(hnQuit);

var HN_NAMES = { h: 'Голодный Хоумлендер', m: 'Голодный Моггити', f: 'Друг Чикен Моггити', k: 'Голодный Кокич' };

var HN_INFO = ['Слева лезет Хоумлендер (если стёрт, друг Моггити), справа Моггити. Двери, свет, камеры.', 'Добавился Голодный Кокич: он ползёт по вентиляции (камера 5). Вентиляцию закрывай кнопкой [5].', 'Появился Меллстрой: если долго не смотреть на кухню (камера 1), он крадёт энергию.', 'Свет мигает: камеры и лампы на пару секунд отключаются. Все злее.', 'Последняя ночь: всё сразу и ещё быстрее.'];

hnUi.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (b) { e.stopPropagation(); hnPress(+b.getAttribute('data-k')); } });

hnCamUi.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (b) { e.stopPropagation(); hn.camSel = Math.min(hn.ncams - 1, +b.getAttribute('data-c')); hnTone(600, 0, 0.05, 0.08, 'square'); hnSync(); if (hn.asst) storyEmit({ hc: hn.camSel + 1 }); } });

hnQuit.addEventListener('click', function (e) { e.stopPropagation(); if (hn.on && !hn.over && !hn.win) hnEnd(false, true); });

window.addEventListener('keydown', function (e) {
    if (!hn.on) return;
    var k = { Digit1: 0, Numpad1: 0, Digit2: 1, Numpad2: 1, Digit3: 2, Numpad3: 2, Digit4: 3, Numpad4: 3, Digit5: 5, Numpad5: 5, KeyV: 5, KeyC: 4 }[e.code];
    if (k !== undefined) { e.preventDefault(); e.stopImmediatePropagation(); if (!e.repeat) hnPress(k); return; }
    if (hn.cam && (e.code === 'ArrowLeft' || e.code === 'ArrowRight')) { e.preventDefault(); e.stopImmediatePropagation(); hn.camSel = (hn.camSel + (e.code === 'ArrowRight' ? 1 : hn.ncams - 1)) % hn.ncams; hnSync(); if (hn.asst) storyEmit({ hc: hn.camSel + 1 }); }
  }, true);

var ICE_X = 1950, CH_X = 900, CHI_OUT = 160, CHI_PR = 1350, CHI_CAN = 760, BANK_X = 3300, ICE_PRICE = 400, ICE_SEC = 75;

var iceT = 0, miniOpen = false, mini = null, miniEl = null, bkPrev = 0, bkSv = 0, bkUi = 0, bkChip = null, bkMsgT = 0;

var MN_SYM = ['✝', '☀', '☾', '★'], MN_COL = ['#ffd27a', '#ff9a4a', '#9cc4ff', '#d6a8ff'];

var MN_ALL = [gFlames, gTiming, gMemory, gBalance];

var bkOT = 0;

var relCd = 0;

var REL = [null,
    { n: 'Святой Свет', b: 'магия: ёмкость до +80, восстановление до +60%', m: 'скорость до −15%' },
    { n: 'Орден Рожка', b: 'скорость до +25%', m: 'максимум здоровья до −40' },
    { n: 'Культ Чекушки', b: 'доход от продажи чекушек до +25%', m: 'ёмкость магии до −50, а при просрочке долг растёт вдвое быстрее' }];

CS.c2deal = [
    { d: 10, say: [[0.4, 'Кокич Прайм', 'Решайте. Окно закроется само.'], [3.4, 'Меллстрой', 'Знаете что? Я двадцать пять лет стримил в пустоту. Теперь хоть по делу.'], [7, 'Кокич', 'Меллстрой, не надо…']],
      draw: function (ct) { csLabN(ct, 0); csPortalRing(700, 300, 140, ct, '255,70,60', Math.min(1, ct / 2.5)); aSci(380, 1, 1, 0); aKok(540, 1, 1, {}); aMell(190, 0.8, 'rgba(200,200,210,.4)'); if (ct > 1.5) primeDraw(780 - Math.min(1, (ct - 1.5) / 2) * 40, 1, 170, Math.min(1, (ct - 1.5) / 1.5)); } },
    { d: 10, say: [[0.4, 'Меллстрой', 'Чат, это не конец стрима. Это сюжетный поворот.'], [3.4, 'Профессор', 'Мы вытащим тебя, когда найдём способ.'], [6.6, 'Рассказчик', 'Меллстрой шагнул в портал. Окно схлопнулось.']],
      draw: function (ct) { csLabN(ct, 0); csPortalRing(700, 300, 140, ct, '255,70,60', 1); aSci(380, 1, 1, 0); aKok(540, 1, 1, {}); var f = Math.min(1, ct / 5); aMell(190 + f * 500, 0.8 * (1 - 0.3 * f), 'rgba(200,200,210,.4)'); if (ct > 5.2) { ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, (ct - 5.2) / 1.2).toFixed(2) + ')'; ctx.fillRect(0, 0, 960, 540); } } },
    { d: 12, say: [[0.4, 'Кокич Прайм', 'Сделка есть сделка. Смотрите.'], [3.4, 'Рассказчик', 'Прайм щёлкнул пальцами. Обломки поднялись, трещины в небе затянулись, город собрался заново.'], [8, 'Профессор', 'Всё на месте. Мороженщик, врач, церковь. Только в лаборатории стало тихо.']],
      draw: function (ct) {
        var k = Math.min(1, ct / 7); bgG('#2a1a3a', '#e8a86a'); var i, bx = 0;
        for (i = 0; i < 12; i++) { var bw = 70 + (i * 37) % 60, bh = (130 + (i * 53) % 170) * (0.35 + 0.65 * k); ctx.fillStyle = '#2a1e3a'; ctx.fillRect(bx, 440 - bh, bw - 6, bh); ctx.fillStyle = 'rgba(255,220,120,' + (0.2 + 0.4 * k).toFixed(2) + ')'; for (var wy = 440 - bh + 14; wy < 430; wy += 26) ctx.fillRect(bx + 10, wy, 8, 10); bx += bw; }
        ctx.fillStyle = '#1c1428'; ctx.fillRect(0, 440, 960, 100);
        csGlow(480, 300, 120 + 260 * k, '255,200,120', 0.35 * (1 - Math.abs(k - 0.5)));
        for (i = 0; i < 30; i++) { var px = (i * 97) % 960, py = 440 - ((ct * 40 + i * 53) % 220); ctx.fillStyle = 'rgba(255,210,150,.5)'; ctx.fillRect(px, py, 4, 4); }
        primeDraw(700, 1, 190, 1); aSci(330, 1, 1, 0); aKok(500, 1, 1, {}); } },
    { d: 7, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('КОНЦОВКА · ЦЕНА СДЕЛКИ', 'Мир восстановлен. Без Меллстроя', Math.min(1, ct / 1.2), 240); ctx.save(); ctx.globalAlpha = Math.min(1, Math.max(0, ct - 2)); ctx.fillStyle = '#fff'; ctx.font = '700 18px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Игру можно продолжать: теперь с Праймом.', 480, 320); ctx.restore(); } }
  ];

var uniSide = '';

CS.c2clash = [
    { d: 12, say: [[0.4, 'Рассказчик', 'Красное окно треснуло. Из него вышли двое.'], [3.4, 'Чикен Моггити', 'Где я? Я же остался в петле навсегда. Как я выбрался?'], [7, 'Кокич Прайм', 'И я не понимаю. Меня должны были стереть.']],
      draw: function (ct) { csLabN(ct, 0); csPortalRing(700, 300, 150, ct, '255,70,60', Math.min(1, ct / 2)); aSci(250, 1, 1, 0); aKok(400, 1, 1, {}); if (ct > 1.8) { var f = Math.min(1, (ct - 1.8) / 1.5); aMogg(560, 1, 1, { a: f }); primeDraw(780 - f * 70, 1, 190, f); } } },
    { d: 12, say: [[0.4, 'Рассказчик', 'Небеса отвергли обоих. Моггити застрял в петле, но петля не приняла и его. Прайм был чужим для любого мира, и небо его не взяло.'], [5.4, 'Профессор', 'Две отвергнутые души вышли через одну трещину. И они не друзья.'], [9, 'Кокич Прайм', 'Этот мир мой. Он будет по моим правилам.']],
      draw: function (ct) { csLabN(ct, 0); csGlow(480, 100, 220, '255,230,160', 0.25 + 0.1 * Math.sin(ct * 2)); ctx.strokeStyle = 'rgba(255,240,200,.5)'; ctx.lineWidth = 3; for (var i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(300 + i * 120, 0); ctx.lineTo(300 + i * 120 + 14, 90 + 40 * Math.sin(ct + i)); ctx.stroke(); } aSci(250, 1, 1, 0); aKok(400, 1, 1, {}); aMogg(560, 1, 1, {}); primeDraw(710, 1, 190, 1); } },
    { d: 9, say: [[0.4, 'Чикен Моггити', 'Могну тебя обратно в трещину.'], [3.4, 'Кокич Прайм', 'Попробуй. Кокич, ты с кем?']],
      draw: function (ct) { csLabN(ct, 0); aSci(180, 1, 1, 0); aKok(320, 1, 1, {}); var sh = Math.sin(ct * 14) * 4 * Math.min(1, ct / 3); aMogg(520 + sh, 1, 1, {}); primeDraw(760 - sh, 1, 190, 1); csGlow(640, 260, 90 + 40 * Math.sin(ct * 10), '255,120,120', 0.3); } }
  ];

CS.c2endA = [
    { d: 13, say: [[0.4, 'Рассказчик', 'Моггити упал. Прайм поднял руку, и красное окно втянуло его.'], [4, 'Чикен Моггити', 'Могнули… А я хотел только домой.'], [8, 'Рассказчик', 'Прайм щёлкнул пальцами: обломки поднялись, небо срослось. Но цена снова выросла: Меллстрой остался в красном окне.']],
      draw: function (ct) { csLabN(ct, 0); csPortalRing(700, 300, 140, ct, '255,70,60', 1); aSci(250, 1, 1, 0); aKok(400, 1, 1, {}); if (ct < 6) aMogg(560 + ct * 22, 1, 1, { a: Math.max(0, 1 - ct / 6), rot: ct * 0.1 }); primeDraw(780, 1, 190, 1); if (ct > 8) { ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, (ct - 8) / 2.5).toFixed(2) + ')'; ctx.fillRect(0, 0, 960, 540); } } },
    { d: 8, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('КОНЦОВКА · ПОД ВЛАСТЬЮ ПРАЙМА', 'Мир восстановлен. Моггити и Меллстроя больше нет', Math.min(1, ct / 1.2), 240); } }
  ];

CS.c2endB = [
    { d: 12, say: [[0.4, 'Рассказчик', 'Прайм упал на колени. Корона потускнела.'], [4, 'Кокич Прайм', 'Небеса вернули меня туда, где меня не было. Вот и всё.'], [8, 'Чикен Моггити', 'Он ушёл. А мир остался сломанным.']],
      draw: function (ct) { csLabN(ct, 0); aSci(250, 1, 1, 0); aKok(400, 1, 1, {}); aMogg(580, -1, 1, {}); var f = Math.min(1, ct / 8); primeDraw(740, 1, 190 * (1 - 0.3 * f), 1 - f); csGlow(740, 260, 100, '255,70,60', 0.3 * (1 - f)); } },
    { d: 8, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('ПРАЙМ ПАЛ', 'Теперь город придётся чинить своими руками', Math.min(1, ct / 1.2), 240); } }
  ];

CS.c2endB2 = [
    { d: 12, say: [[0.4, 'Рассказчик', 'Мороженщика и врача вытащили, церковь укрепили, а небо ты заделал сам.'], [4.4, 'Профессор', 'Без чудес и без жертв. Медленно, зато честно.'], [8, 'Чикен Моггити', 'Спасибо. Можно я останусь?']],
      draw: function (ct) { csLabN(ct, 0); aSci(250, 1, 1, 0); aKok(400, 1, 1, {}); aMell(170, 0.8, 'rgba(200,200,210,.4)'); aMogg(600, -1, 1, {}); } },
    { d: 8, say: [], draw: function (ct) { bgG('#000', '#0a0a1a'); bigTxt('КОНЦОВКА · СВОИМИ РУКАМИ', 'Мир восстановлен без жертв. Моггити остался', Math.min(1, ct / 1.2), 240); } }
  ];

var U_DM = [1, 0.45, 1, 0.68, 0.58, 1, 0.85, 0.78, 0.62, 0.64];

var K8_X = 820, RR_LIST = [0, 1, 3, 4, 2, 7, 6, 8], rr = { on: false, i: 0, t: 0, t0: 0, times: [], hp: 0, wait: 0 };

var col = { on: false, x: 0, loc: -1, cd: 50, face: 1, ph: 0, ru: 0 };

var fatDome = null, fatB = [], fatSp = 0, fatLoc = -1;

var HV_ST = 2300, HV_J = [900, 1500, 2100], HV_GATE = 2750;

var finOn = false;

var CEM = 26, HOME = 27, BAZ = 28, CRT = 29, JAIL = 30;

var CEM_G = 3250, HOME_G = 520, BAZ_G = 1250, CRT_G = 1950, NX_OUT = 120;

var HM_BED = 620, HM_VLT = 1150, HM_SHF = 1500, HM_PH = 1800;

var BZ_SELL = 700, BZ_LOT = 1450, BZ_FT = 2150, BZ_BRD = 2750;

var CR_J = 1000, CR_JAIL = 2100, CR_JURY = 1650;

var JL_INM = 900, JL_G = 1500;

var jailT = 0, crCd = 0, digCd = 0, runN = 0;

var GX = false, gxCv = {}, gxBud = 3, gxInkD = 0, gxInkP = 0, gxQ = 2, gxLastLoc = -1, gxFV = 0, gxErr = null;

var GXCH = 640, GXI = 'rgba(24,14,46,.74)';

try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { gxFV++; }); } catch (e) {}

var _drawSky0 = drawSky, _drawRift0 = drawRift, _drawCloud0 = drawCloud;

drawRift = function () { if (!GX) _drawRift0(); };

drawSky = function () {
    gxBud = (loc.i !== gxLastLoc) ? 40 : 3; gxLastLoc = loc.i;
    if (!GX) return _drawSky0();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, gScreen + 2);
    var nk = nightK(), day = 1 - nk, sx = W * 0.8, sy = Math.max(70, gScreen * 0.2), i;
    var hg = ctx.createLinearGradient(0, gScreen * 0.35, 0, gScreen + 2); hg.addColorStop(0, 'rgba(255,226,170,0)'); hg.addColorStop(1, 'rgba(255,208,140,' + (0.46 * day).toFixed(2) + ')');
    ctx.fillStyle = hg; ctx.fillRect(0, gScreen * 0.35, W, gScreen * 0.65 + 2);
    if (day > 0.05 && !dnIndoor()) {
      gxGlow(sx, sy, 340, '255,236,170', 0.62 * day);
      ctx.save(); ctx.translate(sx, sy); ctx.globalCompositeOperation = 'lighter';
      var rg = ctx.createLinearGradient(0, 0, 0, -600); rg.addColorStop(0, 'rgba(255,244,190,' + (0.17 * day).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(255,244,190,0)'); ctx.fillStyle = rg;
      for (i = 0; i < 9; i++) { ctx.save(); ctx.rotate(i * 0.698 + t * 0.03); ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.lineTo(50, -600); ctx.lineTo(-50, -600); ctx.closePath(); ctx.fill(); ctx.restore(); }
      ctx.restore();
      var sg = ctx.createRadialGradient(sx - 9, sy - 9, 4, sx, sy, 40); sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.55, '#fff4b8'); sg.addColorStop(1, '#ffd45e');
      ctx.globalAlpha = day; ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 37, 0, 6.3); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sx, sy, 43, 0, 6.3); ctx.stroke(); ctx.globalAlpha = 1;
    }
    drawNightSky();
  };

drawCloud = function (x, y, s) {
    if (!GX) return _drawCloud0(x, y, s);
    var c = gxCv.cl;
    if (!c) {
      c = gxCan(340, 180); var g = c.getContext('2d'); g.scale(2, 2); g.translate(50, 58);
      var Pf = [[0, 0, 26], [30, -14, 32], [64, -4, 28], [92, 6, 20], [-24, 8, 18], [46, -24, 22]];
      function puffs(dx, dy) { g.beginPath(); for (var q = 0; q < Pf.length; q++) { g.moveTo(Pf[q][0] + dx + Pf[q][2], Pf[q][1] + dy); g.arc(Pf[q][0] + dx, Pf[q][1] + dy, Pf[q][2], 0, 6.3); } g.rect(-24 + dx, 4 + dy, 116, 24); }
      g.fillStyle = 'rgba(134,158,200,.95)'; puffs(0, 5); g.fill();
      var gr = g.createLinearGradient(0, -46, 0, 30); gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.55, '#f2f7ff'); gr.addColorStop(1, '#c9d9f0'); g.fillStyle = gr; puffs(0, 0); g.fill();
      g.fillStyle = 'rgba(255,255,255,.95)'; g.beginPath(); g.arc(24, -24, 14, 0, 6.3); g.arc(58, -18, 11, 0, 6.3); g.arc(40, -36, 9, 0, 6.3); g.fill();
      g.fillStyle = 'rgba(255,226,180,.4)'; g.beginPath(); g.arc(70, -2, 18, 0.3, 3.3); g.fill();
      gxCv.cl = c;
    }
    ctx.drawImage(c, x - 50 * s, y - 58 * s, 170 * s, 90 * s);
  };

var _drawHills0 = drawHills, _pineShape0 = pineShape, _roundShape0 = roundShape, _parallaxSkyline0 = parallaxSkyline;

drawHills = function (par, base, color, a1, a2, ph) {
    if (!GX) return _drawHills0(par, base, color, a1, a2, ph);
    setCam(par);
    var x0 = camX * par - 20, x1 = x0 + vw + 40, xs = Math.floor(x0 / 12) * 12, x, top = gY - base - a1 - a2 - 14, yy, rr;
    var g = ctx.createLinearGradient(0, top, 0, gY + 4); g.addColorStop(0, shadeC(color, 0.32)); g.addColorStop(0.3, shadeC(color, 0.1)); g.addColorStop(0.7, color); g.addColorStop(1, shadeC(color, -0.26));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(xs, gY + 4);
    for (x = xs; x <= x1 + 12; x += 12) ctx.lineTo(x, gY - base - wave(x, a1, 0.004, a2, 0.011, ph));
    ctx.lineTo(x1 + 12, gY + 4); ctx.closePath(); ctx.fill();
    if (base > 40) {
      var xt = Math.floor(x0 / 22) * 22;
      ctx.fillStyle = shadeC(color, -0.18); ctx.beginPath();
      for (x = xt; x <= x1 + 22; x += 22) { yy = gY - base - wave(x, a1, 0.004, a2, 0.011, ph) + 3; rr = 6 + ((x * 7) % 5 + 5) % 5; ctx.moveTo(x + rr, yy); ctx.arc(x, yy, rr, 0, 6.3); }
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.17)'; ctx.beginPath();
      for (x = xt; x <= x1 + 22; x += 22) { yy = gY - base - wave(x, a1, 0.004, a2, 0.011, ph) + 1; rr = 4 + ((x * 7) % 5 + 5) % 5 * 0.6; ctx.moveTo(x - 2 + rr, yy - 2); ctx.arc(x - 2, yy - 2, rr, 0, 6.3); }
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 2; ctx.beginPath();
    for (x = xs; x <= x1 + 12; x += 12) { yy = gY - base - wave(x, a1, 0.004, a2, 0.011, ph) - 1; if (x === xs) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); }
    ctx.stroke();
    var hz = ctx.createLinearGradient(0, gY - base - 30, 0, gY + 4); hz.addColorStop(0, 'rgba(220,235,255,0)'); hz.addColorStop(1, 'rgba(220,235,255,' + (0.16 + 0.12 * Math.min(1, par)) + ')');
    ctx.fillStyle = hz; ctx.fillRect(xs, gY - base - 30, x1 - xs + 24, base + 34);
  };

pineShape = function (x, y, h, c1, c2) { if (!GX) return _pineShape0(x, y, h, c1, c2); gxPineShape(x, y, h, c1, c2); };

roundShape = function (x, y, h, c1, c2) {
    if (!GX) return _roundShape0(x, y, h, c1, c2);
    ctx.fillStyle = '#4e331f'; ctx.fillRect(x - h * 0.045, y - h * 0.44, h * 0.09, h * 0.44);
    gxBlob([{ x: x, y: y - h * 0.62, r: h * 0.31 }, { x: x - h * 0.2, y: y - h * 0.52, r: h * 0.19 }, { x: x + h * 0.2, y: y - h * 0.53, r: h * 0.2 }, { x: x, y: y - h * 0.46, r: h * 0.2 }], c1, { lw: Math.max(1.6, h * 0.02), seed: (x | 0), clean: true });
  };

parallaxSkyline = function (par, base, hmin, hspan, color, seed) {
    if (!GX) return _parallaxSkyline0(par, base, hmin, hspan, color, seed);
    setCam(par);
    var x0 = camX * par - 20, x1 = x0 + vw + 40, i0 = Math.floor(x0 / 90) - 1, nk = nightK(), lit = nk > 0.25 && par > 0.3;
    for (var i = i0; i * 90 < x1; i++) {
      var hh = hmin + (((i + seed) * 73) % 100 + 100) % 100 / 100 * hspan, bw = 70 + (((i + seed) * 37) % 40 + 40) % 40, bx = i * 90, ty = gY - base - hh, kind = ((i + seed) * 5 % 4 + 4) % 4;
      var g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, shadeC(color, 0.24)); g.addColorStop(0.7, shadeC(color, 0.08)); g.addColorStop(1, shadeC(color, -0.12));
      ctx.fillStyle = g; ctx.fillRect(bx, ty, bw, hh + base);
      if (kind === 1) { ctx.fillRect(bx + bw * 0.2, ty - 22, bw * 0.6, 24); ctx.fillRect(bx + bw * 0.4, ty - 36, bw * 0.2, 16); }
      else if (kind === 2) { ctx.beginPath(); ctx.moveTo(bx + bw * 0.5, ty - 44); ctx.lineTo(bx + bw * 0.58, ty); ctx.lineTo(bx + bw * 0.42, ty); ctx.fill(); }
      else if (kind === 3) { ctx.fillStyle = shadeC(color, -0.2); ctx.fillRect(bx + 8, ty - 12, 16, 12); ctx.fillRect(bx + bw - 26, ty - 8, 14, 8); }
      var gl = ctx.createLinearGradient(0, ty, 0, gY); gl.addColorStop(0, 'rgba(255,255,255,.12)'); gl.addColorStop(1, 'rgba(210,225,255,.4)'); ctx.fillStyle = gl; ctx.fillRect(bx, ty, bw, hh + base);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(bx, ty, bw, 3);
      if (lit) { ctx.fillStyle = 'rgba(255,214,130,' + (0.55 * nk).toFixed(2) + ')'; for (var r = 0; r < hh / 22; r++) for (var c = 0; c < bw / 15; c++) if ((((i + seed) * 11 + r * 7 + c * 3) % 5) < 2) ctx.fillRect(bx + 6 + c * 15, ty + 10 + r * 22, 7, 9); }
    }
  };

var _drawNightOverlay0 = drawNightOverlay;

drawNightOverlay = function () { _drawNightOverlay0(); if (GX) gxPost(); };

var _oak1 = _oak0, _birch1 = _birch0, _pine1 = _pine0, _bush1 = _bush0, _rock1 = _rock0;

_oak0 = function (x, h, seed) { if (!GX) return _oak1(x, h, seed); gxOak(x, h, seed); };

_birch0 = function (x, h, seed) { if (!GX) return _birch1(x, h, seed); gxBirch(x, h, seed); };

_pine0 = function (x, h) { if (!GX) return _pine1(x, h); gxPineT(x, h); };

_bush0 = function (x, s, bry) { if (!GX) return _bush1(x, s, bry); gxBushHD(x, s, bry === undefined ? (((x * 7) | 0) % 3 === 0) : bry); };

_rock0 = function (x, s) { if (!GX) return _rock1(x, s); gxRockHD(x, s); };

var GXG = {
    grass: { a: '#86dc58', b: '#52ae3c', lip: '#2c7326', s1: '#86603c', s2: '#4a301d', blade: '#63c447' },
    forest: { a: '#69b84e', b: '#3f8c3c', lip: '#22582a', s1: '#664830', s2: '#3a2616', blade: '#4f9e44' },
    sand: { a: '#fbeec2', b: '#efd592', lip: '#c9a45e', s1: '#e2c284', s2: '#bf9a60', blade: null },
    road: { a: '#9aa0ab', b: '#6c727e', lip: '#2f333c', s1: '#4d525d', s2: '#2c3038', blade: null },
    dirt: { a: '#b48a58', b: '#8a6238', lip: '#4a2e18', s1: '#7a5634', s2: '#3e2816', blade: '#7a9a4a' }
  };

var gxCityCols = ['#a9b6d0', '#d6b89a', '#9fb3d2', '#b6c8a4', '#d2a9b9'];

var _drawCity0 = drawCity, _drawGround0 = drawGround;

drawCity = function () {
    if (!GX) return _drawCity0();
    setCam(1); var x0 = camX - 20, x1 = Math.min(camX + vw + 20, CITY_END); if (x1 <= x0) return;
    gxLayer('c0', x0, x1, gxUp(), gxDown(), gxCityFn, nightK() > 0.25 ? 1 : 0);
  };

drawGround = function () {
    if (!GX || loc.i !== 0) return _drawGround0();
    setCam(1); gxLayer('g0', camX - 10, camX + vw + 10, gxUp(), gxDown(), gxG0, nightK() > 0.25 ? 1 : 0);
  };

var _drawShop0 = drawShop;
