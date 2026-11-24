/* defs · 286 declarations · function ready(i) { return i && i.complete && i.naturalWidth > 0; } */

function ready(i) { return i && i.complete && i.naturalWidth > 0; }

function airCd(l) { return Math.max(20, 46 - l); }

function inCity() { return loc.i === 0 && (bus.on ? bus.x : P.x) < CITY_END; }

function airLuck(lv) { return lv < 1 ? 0 : 0.4 + 0.12 * (lv - 1); }

function rarePct(luck) { var sum = 0, rare = 0, i, v; for (i = 0; i < RAR.length; i++) { v = RAR[i].w * (i ? 1 + luck * 0.8 * i : 1); sum += v; if (i >= 2) rare += v; } return rare / sum * 100; }

function chickenBoostOn() { return !!(save && save.mx && save.mx.chickenUntil && Date.now() < save.mx.chickenUntil); }

function rollRar(x, extra, cap) {
    if (chickenBoostOn()) return 5;
    var luck = Math.min(cap || 1.2, Math.min(1, Math.max(0, (x - 2000) / 16000)) + (extra || 0));
    var w = [], sum = 0, i;
    for (i = 0; i < RAR.length; i++) { var v = RAR[i].w * (i ? 1 + luck * 0.8 * i : 1); w.push(v); sum += v; }
    var r = Math.random() * sum;
    for (i = 0; i < w.length; i++) { r -= w[i]; if (r <= 0) return i; }
    return 0;
  }

function fmtMult(m) { return '\u00D7' + String(m).replace('.', ','); }

function saveWrite() { localStorage.setItem(SKEY, JSON.stringify(save)); }

function fishSan(s) {
    var mx = { boat: 1, sub: 1, rod: 5, reel: 4, bait: 4, motor: 4, sd: 3, sh: 3, ss: 3, harp: 1, tp: 1 }, ids = ['sardine', 'perch', 'clown', 'ray', 'tuna', 'barra', 'sword', 'shark', 'gold', 'google'], k, i;
    save.fs = { boat: 0, sub: 0, rod: 0, reel: 0, bait: 0, motor: 0, sd: 0, sh: 0, ss: 0, harp: 0, tp: 0 }; save.kw = 0; save.kc = 0; save.fb = {}; save.fc = {}; save.pl = []; save.plt = 0; save.fsat = 0; save.fsatT = 0;
    if (!s || typeof s !== 'object') return;
    if (Array.isArray(s.pl)) for (i = 0; i < s.pl.length && i < 8; i++) { var pi0 = Math.floor(+s.pl[i]); if (pi0 >= 0 && pi0 < 8 && save.pl.indexOf(pi0) < 0) save.pl.push(pi0); }
    if (isFinite(+s.plt) && +s.plt > 0) save.plt = Math.min(+s.plt, Date.now() + 1000);
    if (isFinite(+s.fsat) && +s.fsat > 0 && isFinite(+s.fsatT)) { save.fsat = Math.min(60000, +s.fsat); save.fsatT = Math.min(+s.fsatT, Date.now()); }
    if (isFinite(+s.kw) && +s.kw > 0) save.kw = Math.min(9999, Math.floor(+s.kw)); if (+s.kc === 1) save.kc = 1;
    if (s.fs && typeof s.fs === 'object') for (k in mx) { var v = +s.fs[k]; if (isFinite(v)) save.fs[k] = Math.max(0, Math.min(mx[k], Math.floor(v))); }
    for (i = 0; i < ids.length; i++) {
      var b = s.fb && +s.fb[ids[i]], c = s.fc && +s.fc[ids[i]];
      if (b > 0 && isFinite(b)) save.fb[ids[i]] = Math.min(9999, Math.floor(b));
      if (c > 0 && isFinite(c)) save.fc[ids[i]] = Math.min(999999, Math.floor(c));
    }
  }

function mxSan(s) {
    var m = { fin: 0, c2d: 0, c2e: 0, c2p: 0, rel: 0, rdv: 0, rsc: 0, fri: 0, bkD: 0, bkT: 0, bkR: 0, bkO: 0, bkN: 0, hol: 0, cdl: 0, icn: 0, icd: 0, hn: 0, hnN: 0, c2l: 0, mq: 0, mi: 0, mb: null, qb: null, pn: 0, ln: 0, lk: [0, 0, 0], lab: [0, 0, 0], labT: 0, sn: 0, sT: 0, er: 0, mg: 0, ra: 0, rq: 0, rp: 0, rl: [0, 0, 0], rs: 0, hq: 0, mh: 0, cq: [], cs: 0, lr: 0, gy: 0, ct: 0, dt: 0, pu: 0, rr: 0, wm: 0, sf: 0, hd: 0, fe: 0, p5: 0, sk: [0, 0, 0, 0], pas: 0, rrb: 0, rrn: 0, rrc: 0, rrt: [0, 0, 0, 0, 0, 0, 0, 0], mgc: 0, cof: 0, hv: 0, hvj: 0, hvc: 0, cmt: 0, vlt: 0, arr: 0, lot: 0, crt: 0, gfx: 0, chickenToken: 0, chickenUntil: 0, chPity: 0 }, i, q = s && s.mx;
    function n(v, mx) { v = Math.floor(+v); return isFinite(v) && v > 0 ? Math.min(mx, v) : 0; }
    function snap(o) { if (!o || typeof o !== 'object') return null; var r = {}, k; for (k in o) if (/^[a-z]{1,2}$/.test(k)) r[k] = n(o[k], 1e9); return r; }
    if (q && typeof q === 'object') {
      m.mi = n(q.mi, 9999); m.pn = n(q.pn, 1e6); m.ln = n(q.ln, 1e6);
      for (i = 0; i < 3; i++) { m.lk[i] = n(q.lk && q.lk[i], 1e6); m.lab[i] = n(q.lab && q.lab[i], 9999); }
      m.labT = isFinite(+q.labT) && +q.labT > 0 ? Math.min(+q.labT, Date.now()) : 0;
      m.sn = n(q.sn, 9999); m.sT = isFinite(+q.sT) && +q.sT > 0 ? Math.min(+q.sT, Date.now() + 10 * 60 * 1000) : 0;
      m.er = q.er ? 1 : 0; m.mg = q.mg ? 1 : 0; m.ra = q.ra ? 1 : 0; m.rq = Math.min(5, n(q.rq, 5)); m.rp = n(q.rp, 999); m.rs = n(q.rs, 999); m.hq = Math.min(5, n(q.hq, 5));
      for (i = 0; i < 3; i++) m.rl[i] = n(q.rl && q.rl[i], 99);
      m.mh = q.mh ? 1 : 0; m.bfat = q.bfat ? 1 : 0; m.bb = Math.min(5, n(q.bb, 5)); m.bn = n(q.bn, 1e6); m.cs = q.cs ? 1 : 0; m.lr = Math.min(127, n(q.lr, 127)); m.sf = Math.min(2, n(q.sf, 2)); m.hd = Math.max(0, Math.min(9e15, +q.hd || 0)); m.fe = q.fe ? 1 : 0; m.p5 = Math.min(6, n(q.p5, 6)); if (m.p5 < 6) m.p5 = 0; m.p5r = (q.p5r || m.p5 >= 6) ? 1 : 0; m.p6 = q.p6 ? 1 : 0; m.c2 = Math.min(2, n(q.c2, 2)); m.c2e = Math.min(2, n(q.c2e, 2)); m.c2m = q.c2m ? 1 : 0; m.c2n = Math.min(4, n(q.c2n, 4)); m.sec1 = q.sec1 ? 1 : 0; m.c2u = Math.min(31, n(q.c2u, 31)); m.rb = Math.min(8191, n(q.rb, 8191)); m.mq = Math.min(5, n(q.mq, 5)); m.hn = n(q.hn, 9999); m.hnN = n(q.hnN, 5); m.c2l = q.c2l ? 1 : 0; m.rbo = q.rbo ? 1 : 0; m.endp = q.endp ? 1 : 0; m.p6q = q.p6q ? 1 : 0; m.mgv = q.mgv ? 1 : 0; m.mgo = Math.min(2, n(q.mgo, 2)); if (m.mgo === 1 && !m.mgv) m.mgo = 0; m.gy = Math.min(5, n(q.gy, 5)); m.ct = n(q.ct, 9999); m.dt = q.dt ? 1 : 0; m.pu = q.pu ? 1 : 0; m.rr = q.rr ? 1 : 0; m.wm = q.wm ? 1 : 0; for (i = 0; i < 4; i++) m.sk[i] = Math.min(3, n(q.sk && q.sk[i], 3)); m.pas = q.pas ? 1 : 0;
      if (Array.isArray(q.cq) && q.cq.length === 5) { var seen = {}, okq = true; for (i = 0; i < 5; i++) { var cv = Math.floor(+q.cq[i]); if (!(cv >= 0 && cv < 5) || seen[cv]) okq = false; seen[cv] = 1; } if (okq) m.cq = q.cq.map(function (x) { return Math.floor(+x); }); }
      m.mb = snap(q.mb); m.qb = snap(q.qb);
      m.chickenToken = q.chickenToken ? 1 : 0;
      m.chickenUntil = isFinite(+q.chickenUntil) && +q.chickenUntil > 0 ? Math.min(+q.chickenUntil, Date.now() + 10 * 60 * 1000) : 0;
      m.chPity = n(q.chPity, 98);
      m.bkD = n(q.bkD, 1e12); m.bkT = Math.min(3600, n(q.bkT, 3600)); m.bkR = Math.min(8, n(q.bkR, 8)); m.bkO = q.bkO ? 1 : 0; m.bkN = n(q.bkN, 9999); m.hol = q.hol ? 1 : 0; m.fin = q.fin ? 1 : 0; m.c2p = Math.min(3, n(q.c2p, 3)); m.c2e = Math.min(2, n(q.c2e, 2)); m.c2d = q.c2d ? 1 : 0; m.rel = Math.min(3, n(q.rel, 3)); m.rdv = Math.min(5, n(q.rdv, 5)); m.rsc = Math.min(3, n(q.rsc, 3)); m.fri = Math.min(3, n(q.fri, 3)); m.cdl = n(q.cdl, 99999); m.icn = n(q.icn, 99999); m.icd = n(q.icd, 99999); if (!m.bkD) { m.bkT = 0; m.bkO = 0; } m.rrb = n(q.rrb, 999999); m.rrn = Math.min(8, n(q.rrn, 8)); m.rrc = n(q.rrc, 9999); m.mgc = n(q.mgc, 9999); m.cof = n(q.cof, 9999); m.hv = Math.min(5, n(q.hv, 5)); m.hvj = Math.min(7, n(q.hvj, 7)); m.hvc = Math.min(7, n(q.hvc, 7)); m.cmt = Math.min(1023, n(q.cmt, 1023)); m.vlt = n(q.vlt, 1e12); m.arr = q.arr ? 1 : 0; m.lot = n(q.lot, 1e6); m.crt = isFinite(+q.crt) && +q.crt > 0 ? Math.min(+q.crt, Date.now()) : 0; m.gfx = q.gfx ? 1 : 0; if (Array.isArray(q.rrt)) for (i = 0; i < 8; i++) m.rrt[i] = n(q.rrt[i], 999999);
    }
    save.mx = m;
  }

function promoSan(s) {
    var known = ['ticket', 'chekushka', 'chapter1end', 'chapter2begin'], i;
    save.promo = {};
    if (s && s.promo && typeof s.promo === 'object') for (i = 0; i < known.length; i++) if (s.promo[known[i]]) save.promo[known[i]] = 1;
  }

function persist() { if (DEV) return; save.t = Date.now(); try { saveWrite(); } catch (e) {} if (onPersist) onPersist(); }

function dirtyN() { var n = 0; for (var i = 0; i < 6; i++) n += save.inv.d[i]; return n; }

function cleanN() { var n = 0; for (var i = 0; i < 6; i++) n += save.inv.c[i]; return n; }

function spd() { return loc.i === 5 ? boatSpd() : SPEED * (1 + 0.07 * save.speed) * (ep.on ? ep.pm : 1) * (iceT > 0 ? 1.4 : 1) * (rvBoost > 0 ? 1.25 : 1) * relSpd(); }

function jumpV() { return JUMP_V * (1 + 0.05 * save.jump); }

function maxHp() { return (typeof p5 !== 'undefined' && p5 && p5.on) ? 100 : Math.max(40, 100 + 20 * save.hpup - relHp() + ((primeAlly() || (save.mx.c2p | 0) === 3) ? 40 : 0)); }

function regenRate() { return 2 / 3 + 0.5 * save.regen; }

function busMul() { return 1 + 0.2 * save.busup; }

function bossCdLeft() { return Math.max(0, ((save.bossUntil || 0) - Date.now()) / 1000); }

function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var x = Math.imul(seed ^ seed >>> 15, 1 | seed);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };
  }

function makeFar(n, hmin, hmax) {
    var arr = [], x = 0;
    while (x < WORLD_W) {
      arr.push({ x: x, h: hmin + R() * (hmax - hmin), type: R() < 0.55 ? 'pine' : 'round', seed: R() * 100 });
      x += 60 + R() * n;
    }
    return arr;
  }

function nearShops(x) {
    if (x < CITY_END + 40) return true;
    for (var fi = 0; fi < FUEL.length; fi++) if (Math.abs(x - FUEL[fi].x) < 150) return true;
    for (var i = 0; i < STOPS.length; i++) if (Math.abs(x - STOPS[i].x) < 130) return true;
    return false;
  }

function addBottle(x) {
    var nb = { x: x, off: 0, ph: Math.random() * 6.28, r: loc.i ? rollRar(0, LOCS[loc.i].luck) : rollRar(x, 0) };
    if (loc.i === 4) { var mr = rollMald(); nb.r = mr.r; if (mr.sup) nb.sup = 1; if (mr.secret) nb.secret = 1; }
    bottles.push(nb);
  }

function ageBottles(arr, dt, cur) {
    for (var i = arr.length - 1; i >= 0; i--) {
      var b = arr[i], lim = b.dr ? LIFE_DROP : LIFE_NAT;
      if (b.lab !== undefined || b.secret) continue;
      b.age = (b.age || 0) + dt;
      if (b.age < lim) continue;
      if (cur && b.x > camX - 90 && b.x < camX + vw + 90) { b.age = lim; continue; }
      arr.splice(i, 1);
    }
  }

function updateBottleLife(dt) {
    ageBottles(bottles, dt, true);
    for (var k in locSt) { if (+k !== loc.i && locSt[k] && locSt[k].bottles) ageBottles(locSt[k].bottles, dt, false); }
  }

function perfTick(ms) {
    if (ms > 250 || ms <= 0) return;
    PERF.acc += ms; PERF.n++;
    if (PERF.n < 40) return;
    var avg = PERF.acc / PERF.n; PERF.acc = 0; PERF.n = 0;
    if (music.hq) { if (PERF.q < 1) { PERF.q = 1; try { localStorage.removeItem('chekushka-perf-q'); } catch (e) {} resize(); } return; }
    if (PERF.cool > 0) { PERF.cool--; return; }
    if (avg < 24 && PERF.q < 1) {
      PERF.fast = (PERF.fast || 0) + 1;
      if (PERF.fast >= 4) { PERF.fast = 0; PERF.cool = 2; PERF.q = Math.min(1, Math.round((PERF.q + 0.15) * 100) / 100); try { localStorage.setItem('chekushka-perf-q', String(PERF.q)); } catch (e) {} resize(); }
      return;
    } else PERF.fast = 0;
    if (avg > 36 && PERF.q > 0.5) {
      PERF.slow++;
      if (PERF.slow >= 2) {
        PERF.slow = 0; PERF.cool = 3; PERF.q = Math.max(0.5, Math.round((PERF.q - 0.15) * 100) / 100);
        try { localStorage.setItem('chekushka-perf-q', String(PERF.q)); } catch (e) {}
        resize();
      }
    } else PERF.slow = 0;
  }

function resize() {
    var tc = window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false;
    dpr = Math.max(0.5, Math.min(window.devicePixelRatio || 1, tc ? 1.25 : 1.5) * PERF.q);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    touch = window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : ('ontouchstart' in window);
    var margin = touch ? (H < 480 ? 96 : 176) : 84;
    gScreen = H - margin;
    scale = Math.min(H / 520, W / 580);
    if (scale < 0.35) scale = 0.35;
    vw = W / scale;
    gY = gScreen / scale;
    skyGrad = ctx.createLinearGradient(0, 0, 0, gScreen);
    skyGrad.addColorStop(0, '#4fb0e8');
    skyGrad.addColorStop(0.65, '#a9dcf3');
    skyGrad.addColorStop(1, '#e4f6fb');
    document.getElementById('pad').hidden = !touch;
  }

function saveMusic() { try { localStorage.setItem(MKEY, JSON.stringify(music)); } catch (e) {} }

function loadTrack() { retried = false; audio.src = TRACKS[music.track].src; }

function tryPlay() {
    if (!music.on || (typeof bmS !== 'undefined' && bmS.mode)) return;
    var pr = audio.play();
    if (pr && pr.then) pr.then(function () { started = true; }).catch(function () {});
  }

function firstTouch() {
    document.removeEventListener('pointerdown', firstTouch, true);
    document.removeEventListener('keydown', firstTouch, true);
    started = true; tryPlay();
  }

function bmMk(c) { var n = c.sampleRate * 0.6, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; }

function bmMidi(m) { return 440 * Math.pow(2, (m - 69) / 12); }

function bmBus(c, out, bpm) {
    var dry = c.createGain(), fx = c.createGain(), dl = c.createDelay(1.5), fb = c.createGain(), lp = c.createBiquadFilter(), wet = c.createGain(), cv = c.createConvolver(), rv = c.createGain();
    var n = Math.floor(c.sampleRate * 1.5), ib = c.createBuffer(2, n, c.sampleRate), ch, i;
    for (ch = 0; ch < 2; ch++) { var dd = ib.getChannelData(ch); for (i = 0; i < n; i++) dd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6); }
    cv.buffer = ib; dl.delayTime.value = 60 / bpm * 0.75; fb.gain.value = 0.34; lp.type = 'lowpass'; lp.frequency.value = 2600; wet.gain.value = 0.3; rv.gain.value = 0.2;
    dry.connect(out); fx.connect(out); fx.connect(dl); dl.connect(lp); lp.connect(fb); fb.connect(dl); lp.connect(wet); wet.connect(out); fx.connect(cv); cv.connect(rv); rv.connect(out);
    return { dry: dry, fx: fx };
  }

function bmNote(c, d, f, t0, dur, vol, type, lp, det, att) {
    var o = c.createOscillator(), g = c.createGain(), fl = null, o2 = null, a = att || 0.008;
    o.type = type; o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + a); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    if (lp) { fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(lp * 1.8, t0); fl.frequency.exponentialRampToValueAtTime(lp, t0 + Math.min(dur, 0.18)); o.connect(fl); fl.connect(g); } else o.connect(g);
    if (det) { o2 = c.createOscillator(); o2.type = type; o2.frequency.setValueAtTime(f, t0); o2.detune.value = det; if (fl) o2.connect(fl); else o2.connect(g); o2.start(t0); o2.stop(t0 + dur + 0.03); }
    g.connect(d); o.start(t0); o.stop(t0 + dur + 0.03);
  }

function bmKick(c, d, t0, v) {
    var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(165, t0); o.frequency.exponentialRampToValueAtTime(40, t0 + 0.13);
    g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26); o.connect(g); g.connect(d); o.start(t0); o.stop(t0 + 0.28);
  }

function bmNoise(c, d, nb, t0, dur, vol, hp, lpf) {
    var s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter(); s.buffer = nb; f.type = 'highpass'; f.frequency.value = hp;
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); s.connect(f);
    if (lpf) { var f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = lpf; f.connect(f2); f2.connect(g); } else f.connect(g);
    g.connect(d); s.start(t0); s.stop(t0 + dur + 0.02);
  }

function bmTom(c, d, t0, f0, v) {
    var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f0 * 0.5, t0 + 0.18);
    g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22); o.connect(g); g.connect(d); o.start(t0); o.stop(t0 + 0.25);
  }

function bmSec(bar) { return bar < 4 ? 0 : (bar < 12 ? 1 : (bar < 16 ? 2 : (bar < 24 ? 3 : (bar < 28 ? 4 : 5)))); }

function bmStep(c, B, nb, P, st, t0) {
    var s16 = 60 / P.bpm / 4, bar32 = Math.floor(st / 16) % 32, bar = bar32 % 4, k = st % 16, sec = bmSec(bar32), cyc = Math.floor(st / 512);
    var prog = sec === 3 || sec === 5 ? P.chorus : (sec === 4 ? P.brk : P.verse), deg = prog[bar], sc = P.sc, up = (sec === 5 || cyc % 2 === 1 && sec >= 3) ? 2 : 0;
    function nt(di, oct) { var n = ((di % 7) + 7) % 7, o = Math.floor(di / 7); return P.root + sc[n] + 12 * (o + oct) + up; }
    var d = B.dry, f = B.fx, drums = sec !== 4, full = sec === 3 || sec === 5, lastBar = bar === 3;
    // ---- барабаны ----
    if (drums) {
      var fin = P.bass === 'drive', kick = (k % 4 === 0) || (sec >= 2 && (k === 10 || (fin && k === 14))) || (full && P.bass === 'gallop' && (k === 6));
      if (sec === 0 && bar < 2) kick = k === 0 || k === 8;
      if (kick) bmKick(c, d, t0, 0.95);
      if (sec > 0 && (k === 4 || k === 12) && !(sec === 2 && bar32 === 15 && k === 12)) { bmNoise(c, d, nb, t0, 0.16, 0.42, 1200, 9000); bmNote(c, d, 200, t0, 0.1, 0.2, 'triangle'); }
      if (sec === 0 && bar >= 2 && (k === 4 || k === 12)) bmNoise(c, d, nb, t0, 0.12, 0.3, 1400, 8000);
      if (sec >= 1) { if (k % 2 === 0 && k % 4 !== 0) bmNoise(c, d, nb, t0, 0.045, 0.13, 7500); if (full && k % 2 === 1) bmNoise(c, d, nb, t0, 0.03, 0.06, 9000); }
      if (sec >= 1 && k === 14) bmNoise(c, d, nb, t0, 0.2, 0.1, 6500);
      if (lastBar && (bar32 % 8 === 7) && k >= 12) bmTom(c, d, t0, [220, 180, 150, 120][k - 12], 0.5);
      if (k === 0 && bar === 0 && (sec === 3 || sec === 5 || (sec === 1 && bar32 === 4))) bmNoise(c, d, nb, t0, 1.1, 0.26, 3500);
    }
    if (sec === 2) { var rp = (bar32 - 12) * 16 + k; bmNoise(c, f, nb, t0, s16 * 1.2, 0.02 + rp * 0.0012, 1000 + rp * 55); if (bar32 >= 14 && k % 2 === 0) bmKick(c, d, t0, 0.5 + (bar32 - 14) * 0.2); }
    // ---- бас ----
    var bf = bmMidi(nt(deg, -1)), bv = sec === 0 && bar < 2 ? 0.0 : 0.34;
    if (bv) {
      if (P.bass === 'oct') { if (k % 2 === 0) bmNote(c, d, bf * (k % 4 === 2 ? 2 : 1), t0, s16 * 1.8, bv, 'sawtooth', 500 + 400 * (sec >= 3 ? 1 : 0)); }
      else if (P.bass === 'gallop') { if (k % 4 !== 3 && !(k === 5 || k === 13)) bmNote(c, d, bf * (k % 8 === 6 ? 1.5 : 1), t0, s16 * 0.9, bv, 'sawtooth', 380 + (sec >= 3 ? 500 : 0)); }
      else { bmNote(c, d, bf * (k % 4 === 3 ? 2 : 1), t0, s16 * 1.1, bv * 0.95, 'sawtooth', 600 + (sec >= 3 ? 600 : 0)); }
      if (k % 4 === 0) bmNote(c, d, bf, t0, s16 * 3.5, 0.28, 'sine');
    }
    // ---- арпеджио ----
    if (sec >= 1 && sec !== 4 && k % 2 === 0 || sec === 4 && k % 2 === 0) { var ai = (k / 2) % 8; bmNote(c, f, bmMidi(nt(deg + P.arp[ai], 1)), t0, s16 * 1.4, sec === 4 ? 0.1 : 0.075, 'square', 3000); }
    // ---- мелодия ----
    if (sec === 1 && bar >= 2 || sec === 2 && bar >= 2 || full) {
      var m = full ? P.mc : P.mv, md = m[k];
      if (md >= 0) { var lo = md + (full || bar === 3 ? deg : deg * 0.5 | 0); if (sec === 2) lo = md + 0; var nl = full ? s16 * 2.3 : s16 * 1.6; bmNote(c, f, bmMidi(nt(lo, 1)), t0, nl, full ? 0.15 : 0.1, P.wave, 3800, 9, 0.012); if (full) bmNote(c, f, bmMidi(nt(lo, 0)), t0, nl, 0.06, 'square', 2200); }
    }
    if (sec === 4 && k === 0) { bmNote(c, f, bmMidi(nt(deg + 4, 2)), t0, s16 * 14, 0.09, 'sine', 0, 6, 0.4); bmNote(c, f, bmMidi(nt(deg, 2)), t0, s16 * 14, 0.07, 'triangle', 0, 6, 0.5); }
    // ---- пэд и аккорды ----
    if (k === 0 && sec !== 0) { var pv = full ? 0.085 : 0.055, i3; for (i3 = 0; i3 < 3; i3++) bmNote(c, f, bmMidi(nt(deg + i3 * 2, 1)), t0, s16 * 15.5, pv, 'sawtooth', 1100, 8, 0.25); }
    if (full && (k === 3 || k === 6 || k === 11)) { for (var q = 0; q < 3; q++) bmNote(c, f, bmMidi(nt(deg + q * 2, 1)), t0, s16 * 0.9, 0.05, 'sawtooth', 2400, 5); }
    if (sec === 0 && bar === 3 && k === 8) bmNoise(c, d, nb, t0, 0.8, 0.12, 2000);
  }

function bmWant() {
    if (!music.bm || !music.on) return '';
    if (cs.on || fin.on) return '';
    if (p5.on) {
      if (p5.st !== 'fight') return '';
      return p5.stage >= 5 ? 'final' : (p5.stage === 1 ? 'boss' : 'fight');
    }
    if (boss.on && boss.st !== 'intro') return 'boss';
    if (kk.on) return 'boss';
    return '';
  }

function bmStop() {
    if (!bmS.mode) return;
    bmS.mode = ''; try { if (bmS.g) { bmS.g.gain.cancelScheduledValues(bmS.c.currentTime); bmS.g.gain.setTargetAtTime(0.0001, bmS.c.currentTime, 0.15); } } catch (e) {}
    if (bmS.paused) { bmS.paused = false; if (music.on && started) tryPlay(); }
  }

function bmTick() {
    var w = ''; try { w = bmWant(); } catch (e) { w = ''; }
    if (w !== bmS.mode) {
      if (!w) { bmStop(); return; }
      try {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume();
        if (!bmS.g || bmS.c !== actx) { bmS.c = actx; bmS.g = actx.createGain(); var cp = actx.createDynamicsCompressor(); bmS.g.connect(cp); cp.connect(actx.destination); bmS.noise = bmMk(actx); bmS.bus = null; bmS.busBpm = 0; }
        if (!bmS.bus || bmS.busBpm !== BM[w].bpm) { bmS.bus = bmBus(actx, bmS.g, BM[w].bpm); bmS.busBpm = BM[w].bpm; }
        bmS.g.gain.cancelScheduledValues(actx.currentTime); bmS.g.gain.setTargetAtTime(Math.max(0.05, music.vol) * 0.6, actx.currentTime, 0.1);
        if (!bmS.mode) { bmS.step = 0; bmS.next = actx.currentTime + 0.08; }
        else { bmS.step = Math.ceil(bmS.step / 16) * 16; }
        bmS.mode = w; if (music.on && !audio.paused) { audio.pause(); bmS.paused = true; } else if (music.on) bmS.paused = true;
      } catch (e) { bmS.mode = ''; return; }
    }
    if (!bmS.mode || !bmS.c) return;
    try {
      var P = BM[bmS.mode], s16 = 60 / P.bpm / 4; bmS.g.gain.setTargetAtTime(Math.max(0.05, music.vol) * 0.6, bmS.c.currentTime, 0.2);
      if (bmS.next < bmS.c.currentTime - 0.5) bmS.next = bmS.c.currentTime + 0.05;
      while (bmS.next < bmS.c.currentTime + 0.3) { bmStep(bmS.c, bmS.bus, bmS.noise, P, bmS.step, bmS.next); bmS.next += s16; bmS.step++; }
    } catch (e) {}
  }

function tone(freq, start, dur, vol, type) {
    var o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    var t0 = actx.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(actx.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

function sfx(kind) {
    if (!music.sfx) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      if (kind === 'pick') { tone(740, 0, 0.09, 0.16); tone(1110, 0.06, 0.12, 0.14); }
      else if (kind === 'sell') { tone(988, 0, 0.12, 0.18, 'triangle'); tone(1319, 0.1, 0.12, 0.18, 'triangle'); tone(1760, 0.2, 0.22, 0.16, 'triangle'); }
      else if (kind === 'jump') { tone(300, 0, 0.12, 0.08, 'square'); }
      else if (kind === 'no') { tone(200, 0, 0.14, 0.12, 'sawtooth'); }
      else if (kind === 'rare') { tone(880, 0, 0.1, 0.16, 'triangle'); tone(1175, 0.08, 0.1, 0.16, 'triangle'); tone(1568, 0.16, 0.2, 0.16, 'triangle'); tone(2093, 0.26, 0.3, 0.12, 'triangle'); }
      else if (kind === 'wash') { tone(520, 0, 0.07, 0.07); tone(700, 0.05, 0.07, 0.06); }
      else if (kind === 'boom') { tone(70, 0, 0.6, 0.35, 'sawtooth'); tone(48, 0.04, 0.7, 0.35, 'square'); tone(120, 0, 0.25, 0.2, 'sawtooth'); }
      else if (kind === 'gulp') { tone(300, 0, 0.08, 0.15); tone(220, 0.1, 0.1, 0.15); tone(300, 0.22, 0.08, 0.15); }
    } catch (e) {}
  }

function miniUi() {
    elNutMini.hidden = save.nuts <= 0; elNNut.textContent = save.nuts;
    elArmyMini.hidden = save.army <= 0; elNArmy.textContent = save.army;
    document.getElementById('superMini').hidden = !(save.superSp > 0); document.getElementById('nSuper').textContent = save.superSp;
  }

function hud() {
    var cl = cleanN();
    var k = save.carried + '|' + save.coins + '|' + cap() + '|' + cl + '|' + save.wool + '|' + save.nuts + '|' + save.army + '|' + save.superSp;
    if (k === lastHud) return;
    lastHud = k;
    chipClean.hidden = cl <= 0; elClean.textContent = cl;
    chipWool.hidden = save.wool <= 0; elWool.textContent = save.wool;
    elCarry.textContent = save.carried + '/' + cap();
    miniUi();
    elCoins.textContent = save.coins.toLocaleString('ru-RU');
  }

function rateUi() {
    var city = hasSignal(), k = save.rate + '|' + rate.dir + '|' + city + '|' + sigKind();
    if (k === lastRate) return;
    lastRate = k;
    elRateChip.hidden = !city; elNoSig.hidden = city;
    elRateNum.textContent = fmtP(save.rate);
    var c = pctOf(save.rate);
    elRatePc.textContent = pctStr(save.rate);
    elRatePc.className = 'pc ' + (c > 0 ? 'up' : (c < 0 ? 'down' : ''));
  }

function airUi() {
    var show = save.air > 0 && airOk();
    if (airBtn.hidden === show) airBtn.hidden = !show;
    if (!show) return;
    var busy = air.cd > 0 || !!air.plane;
    var hot = !busy && heroOver();
    var txt = air.cd > 0 ? '\u2708 ' + Math.ceil(air.cd) + ' с' : '\u2708 Аирдроп' + (touch ? '' : ' (Q)');
    var k = txt + busy + hot;
    if (k === lastAir) return;
    lastAir = k;
    airBtn.classList.toggle('hot', hot);
    airBtn.textContent = txt;
    airBtn.classList.toggle('no', busy);
    airBtn.setAttribute('aria-disabled', busy ? 'true' : 'false');
  }

function showReward() {
    document.getElementById('rewardImg').src = SRC.bSuper;
    elReward.querySelector('.rt').textContent = 'Супер-Спирт';
    elReward.querySelector('.rs').textContent = '+15% к выручке в магазине';
    elReward.classList.add('on'); clearTimeout(rewardTimer);
    rewardTimer = setTimeout(function () { elReward.classList.remove('on'); }, 5200);
  }

function toast(msg, ms) {
    elToast.textContent = msg; elToast.hidden = false; elToast.style.opacity = 1;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      elToast.style.opacity = 0;
      setTimeout(function () { elToast.hidden = true; }, 500);
    }, ms || 5000);
  }

function keysReset() { KEY_ACTIONS.forEach(function (a) { KEYB[a.id] = KEY_DEFAULTS[a.id].slice(); }); }

function keysSave() { try { localStorage.setItem('chekushka-keys-v1', JSON.stringify(KEYB)); } catch (e) {} }

function actionOf(code) {
    if (!code) return '';
    for (var i = 0; i < KEY_ACTIONS.length; i++) { var id = KEY_ACTIONS[i].id; if (KEYB[id][0] === code || KEYB[id][1] === code) return id; }
    return KEY_ALIAS[code] || '';
  }

function keyKind(e) {
    if (keyCapture) return '';
    var a = actionOf(e.code);
    return (a === 'inv' || a === 'chat' || a === 'phone') ? '' : a;
  }

function hold(id, on, off) {
    var b = document.getElementById(id);
    function down(e) { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {} b.classList.add('on'); on(); }
    function up(e) { b.classList.remove('on'); if (off) off(); }
    b.addEventListener('pointerdown', down);
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
    b.addEventListener('lostpointercapture', up);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

function popup(x, z, text, color) { popups.push({ x: x, z: z, text: text, color: color || '#fff', age: 0 }); }

function inShop() { return loc.i === 0 && P.x > SHOP_X - 10 && P.x < SHOP_X + SHOP_W + 10; }

function inUp() { return loc.i === 0 && P.x > UP_X - 10 && P.x < UP_X + UP_W + 10; }

function inWash() { return loc.i === 0 && P.x > WASH_X - 10 && P.x < WASH_X + WASH_W + 10; }

function curStop() {
    if (loc.i !== 0) { var ls = LOC_STOPS[loc.i]; return (ls && Math.abs(P.x - ls.x) < 85) ? ls : null; }
    for (var i = 0; i < ALL_STOPS.length; i++) if (Math.abs(P.x - ALL_STOPS[i].x) < 85) return ALL_STOPS[i];
    return null;
  }

function cap() { return 5 + 5 * save.pocket; }

function airCount() { return 15 + 5 * save.air; }

function pocketCost() { return Math.round(40 * Math.pow(1.9, save.pocket) / 5) * 5; }

function speedCost() { return Math.round(70 * Math.pow(1.75, save.speed) / 5) * 5; }

function jumpCost() { return Math.round(60 * Math.pow(1.75, save.jump) / 5) * 5; }

function airCost() { return Math.round(150 * Math.pow(1.8, save.air) / 5) * 5; }

function act() {
    if (paused) return;
    if (cs.on) return;
    if (rit.on) return;
    if (gym.on) { gymRep(); return; }
    if (cab.on) { cabAct(); return; }
    if (pax.on) { paxAct(); return; }
    var spx = nearSpot(); if (spx && spx.fn) { spx.fn(); return; }
    if (trip.inn) { tripUnboard(); return; }
    if (ride.id) { rideStop(); return; }
    if (bus.on && bus.st === 'come') { busCancel(); return; }
    if (ob.on) { ownBusAct(); return; }
    if (av.on) { avAct(); return; }
    if (busLock()) return;
    if (!music.auto && (collectBottles(true) + collectWools(true)) > 0) return;
    if (fishAct()) return;
    if (nearTripPlane()) { tripAct(); return; }
    if (nearHomePlane()) { tripHome(); return; }
    if (nearHosp()) { hospEnter(); return; }
    if (nearWH()) { openWH(); return; }
    if (nearFlare()) { flareAct(); return; }
    if (nearCollector() && !inShop() && !inUp()) { talkCollector(); return; }
    if (inUp()) { openUp(); return; }
    if (inWash()) { startWash(); return; }
    if (nearOwnBus()) { boardOwnBus(); return; }
    var rb = nearOtherBus();
    if (rb) { rideStart(rb); return; }
    var bn = nearBin();
    if (bn) { searchBin(bn); return; }
    var stp = curStop();
    if (stp) { if (boss.on) { sfx('no'); toast('Пока идёт бой, автобус не ходит.', 2500); return; } openBusMenu(stp); return; }
    if (!inShop()) return;
    sellAll();
  }

function sellAll() {
    if (save.carried <= 0 && !(save.sec > 0)) { sfx('no'); toast('Принеси пустые чекушки: сейчас за обычную ' + fmtP(save.rate) + ' ' + coinWord(r1(save.rate)) + '.', 3000); return; }
    var n = save.carried, total = save.wool * WOOL_PRICE, nClean = 0, rare = 0, nWool = save.wool, nSec = save.sec | 0;
    save.wool = 0; total += nSec * 100 * save.rate; save.sec = 0;
    for (var r = 0; r < RAR.length; r++) {
      total += (save.inv.d[r] + save.inv.c[r] * CLEAN_MULT) * RAR[r].m * save.rate;
      nClean += save.inv.c[r];
      if (r > 0) rare += save.inv.d[r] + save.inv.c[r];
      save.inv.d[r] = 0; save.inv.c[r] = 0;
    }
    var gain = Math.max(1, Math.round(total * (1 + 0.15 * (save.superSp || 0)) * relInc()));
    save.coins += gain; save.carried = 0; save.qSold = (save.qSold || 0) + n - nWool; save.qClean = (save.qClean || 0) + nClean; save.qRare = (save.qRare || 0) + rare;
    persist(); hud(); sfx('sell');
    popup(P.x, PLAYER_H + 6, '+' + gain + ' ' + coinWord(gain), '#ffd23f');
    var msg = 'Сдано ' + n + '.';
    if (nSec) msg += ' Секретных чекушек: ' + nSec + ' (×100 от курса).';
    if (save.superSp) msg += ' Супер-Спирт: +' + (15 * save.superSp) + '%.';
    if (nClean) msg += ' Мытых: ' + nClean + '.';
    else if (!washTip) { washTip = true; msg += ' Помой чекушки на мойке: чистая стоит ' + fmtMult(CLEAN_MULT) + '.'; }
    if (rare) msg += ' Редких и выше: ' + rare + '.';
    if (nWool) msg += ' Стекловата: ' + nWool + ' по ' + WOOL_PRICE + '.';
    toast(msg, 3500);
    shopFlash = 1;
  }

function startWash() {
    if (dirtyN() === 0) {
      sfx('no');
      toast(save.carried ? 'Все чекушки в руках уже чистые.' : 'Принеси грязные чекушки, помою. Чистая стоит ' + fmtMult(CLEAN_MULT) + '.', 3000);
      return;
    }
    openWashGame();
  }

function updateWash(dt) {}

function addWool(x) { wools.push({ x: x, ph: Math.random() * 6.28 }); }

function hurtUi() {
    var o = hp >= maxHp() ? 0 : Math.min(0.85, (maxHp() - hp) / maxHp() * 1.7);
    o = Math.round(Math.min(0.95, o + hurtFlash) * 100) / 100;
    if (o !== lastHurt) { lastHurt = o; elHurt.style.opacity = o; }
  }

function faint() {
    var wasFight = !!(ep.on || p5.on);
    if (ep.on) epEnd('faint');
    if (p5.on) p5End('faint');
    var wasBoss = boss.on;
    if (ob.on) { ob.on = false; ob.v = 0; }
    avForceExit();
    if (wasBoss) endBoss(false, 'faint');
    if (loc.i !== 0) locEnter(0, 'left', 600);
    if (!wasFight) { save.carried -= save.wool; save.wool = 0; } hp = Math.round(maxHp() / 2);
    P.x = 600; P.vx = 0; P.z = 0; P.vz = 0; camX = Math.max(0, P.x - vw * 0.6);
    persist(); hud();
    toast(wasFight ? 'Ты проиграл бой. Очнулся у магазина, ничего не потеряно. Можно попробовать снова.' : (wasBoss ? 'Хоумлендер вырубил петуха. Ты очнулся у магазина, бой проигран.' : 'Петух потерял сознание. Стекловата в руках пропала, очнулся у магазина.'), 5000);
  }

function rvM() { return rvBoost > 0 ? 1.3 : 1; }

function fxHeal(x, y) { ring(x, y, 230, '#9dffb8'); ring(x, y, 130, '#ffd23f'); burst(x, y - 30, 24, '#9dffb8', 190, 1.2); burst(x, y, 14, '#ffd23f', 330, 0.8); burst(x, y - 90, 10, '#ffffff', 90, 1.4); }

function cpKey() { if (p5.on) { var b = (p5.uni && typeof uniBoss === 'function') ? uniBoss() : null; return 'p' + p5.stage + ':' + (b ? b.ph : 0); } if (ep.on) return 'e' + ep.st; return ''; }

function ghStart() { gh.on = true; gh.x = P.x; gh.key = cpKey(); hp = 1; iFrames = 2; sfx('no'); toast('Ты стал призраком: тело осталось лежать. Воскреснешь на новой контрольной точке боя (смена фазы). Если пали все, бой проигран.', 7000); }

function ghRevive() { gh.on = false; P.x = gh.x; hp = Math.max(1, Math.round(maxHp() * 0.5)); iFrames = 2.5; sfx('rare'); fxHeal(P.x, gY - 80); pfRing(P.x, gY - 80, 240, '#9dffb8', 0.6); toast('Контрольная точка! Ты воскрес у своего тела.', 4000); }

function drawGhostAt(x, face, a, up) {
    var im = img.ghost; if (!ready(im)) return; var h = PLAYER_H * 1.35, w = h * im.naturalWidth / im.naturalHeight, bob = Math.sin(t * 2.4 + x * 0.01) * 8;
    if (Math.random() < 0.3) burst(x + (Math.random() - 0.5) * 60, gY - (up || 0) - 40 - Math.random() * 120, 1, Math.random() < 0.5 ? '#8fdcff' : '#d6fbff', 36, 1);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, gY - (up || 0) - 14 + bob); ctx.scale(face > 0 ? -1 : 1, 1); ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore();
  }

function drawCorpseAt(x, face, sk, ac, nm) {
    var im = skinImg(sk); if (!ready(im)) return; var h = PLAYER_H, w = h * im.naturalWidth / im.naturalHeight;
    ctx.save(); ctx.globalAlpha = 0.8; ctx.translate(x, gY - 4); ctx.rotate(face > 0 ? 1.5 : -1.5); ctx.scale(face > 0 ? -1 : 1, 1); ctx.drawImage(im, -w / 2, -h, w, h); try { drawAcc(ctx, ac, w, h); } catch (e) {} ctx.restore();
    ctx.save(); ctx.textAlign = 'center'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#ffd2d2'; ctx.fillText('🪦 ' + (nm || 'друг'), x, gY - 70); ctx.restore();
  }

function dnAllies() {
    var n = 0, k, o; if (!partyOn()) return 0;
    for (k = 0; k < party.ids.length; k++) { if (party.ids[k] === myId()) continue; o = net.others[party.ids[k]]; if (o && o.fg && !o.dw && !o.gh && (o.l | 0) === loc.i) n++; }
    return n;
  }

function dnCan() { return !!(ep.on || p5.on) && partyOn() && dnAllies() > 0; }

function dnDown() {
    dn.on = true; dn.t = 30; hp = 1; iFrames = 1; sfx('no'); shk = Math.max(shk, 0.5);
    toast('Тебя повалили! Друзья могут поднять тебя (E рядом). Если не успеют за 30 секунд или все падут, бой проигран.', 5000);
  }

function updateDown(dt) {
    if (rvBoost > 0) rvBoost -= dt;
    if (gh.on) {
      if (!(ep.on || p5.on)) { gh.on = false; hp = Math.max(hp, Math.round(maxHp() / 2)); return; }
      hp = 1; iFrames = Math.max(iFrames, 0.4);
      if (cpKey() !== gh.key) { ghRevive(); return; }
      if (dnAllies() === 0) { gh.on = false; hp = 0; toast('Все пали. Бой проигран.', 3000); faint(); }
      return;
    }
    if (!dn.on) return;
    if (!(ep.on || p5.on)) { dn.on = false; hp = Math.max(hp, Math.round(maxHp() / 2)); return; }
    input.left = input.right = input.up = false; P.vx = 0; hp = 1; iFrames = Math.max(iFrames, 0.4);
    dn.t -= dt;
    if (dn.t <= 0 && dnAllies() > 0) { dn.on = false; ghStart(); return; }
    if (dn.t <= 0 || dnAllies() === 0) { dn.on = false; hp = 0; toast('Никто не успел поднять тебя.', 3000); faint(); }
  }

function dnRevive(who, m) {
    m = m || {};
    if (gh.on && m.gh) { gh.on = false; P.x = +m.x || gh.x; hp = maxHp(); iFrames = 2.5; rvBoost = 12; sfx('rare'); fxHeal(P.x, gY - 80); pfRing(P.x, gY - 80, 260, '#ffd23f', 0.6); pfRing(P.x, gY - 80, 160, '#9dffb8', 0.6); toast((who || 'Друг') + ' втянул тебя в своё тело и воскресил! 12 секунд ты быстрее и сильнее.', 5000); return; }
    if (!dn.on) return;
    dn.on = false; hp = m.f ? maxHp() : Math.max(1, Math.round(maxHp() * 0.5)); iFrames = 2.5; if (m.f) rvBoost = 12; sfx('rare'); fxHeal(P.x, gY - 80); pfRing(P.x, gY - 80, 200, '#9dffb8', 0.5);
    toast((who || 'Друг') + (m.f ? ' вылечил тебя жиром: полное здоровье, 12 секунд ты быстрее и сильнее!' : ' поднял тебя! Продолжай бой.'), 4000);
  }

function skRevive() {
    if (!partyOn() || !(ep.on || p5.on)) return false;
    var k, o, dw = null, gs = null;
    for (k in net.others) { o = net.others[k]; if (!o.fg || (o.l | 0) !== loc.i) continue; if (o.dw && !dw && Math.abs(o.rx - P.x) < 600) dw = k; if (o.gh && !gs) gs = k; }
    var tg = dw || gs; if (!tg) return false;
    var cost = mgC(Math.round(mgCap() * (dw ? 0.15 : 0.9)));
    if (mgMana < cost) { if (mgNoManaT <= 0) { mgNoManaT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Нужно магии: ' + cost, '#ff9a9a'); } return true; }
    mgMana -= cost; skCd[3] = 12;
    try { socket.emit('rv', { to: tg, f: 1, gh: dw ? 0 : 1, x: Math.round(P.x) }); } catch (e) {}
    sfx('rare'); pfRing(P.x, gY - 80, 240, '#ffd23f', 0.6); fxHeal(P.x, gY - 80); popup(P.x, PLAYER_H + 50, dw ? 'ЖИРОВОЕ ЛЕЧЕНИЕ: друг на ногах' : 'ДРУГ ВТЯНУТ В ТЕЛО', '#9dffb8');
    return true;
  }

function spotRevive() {
    if (dn.on || !(ep.on || p5.on) || !partyOn()) return null;
    var k, o;
    for (k in net.others) {
      o = net.others[k];
      if (o.dw && o.fg && (o.l | 0) === loc.i && Math.abs(P.x - o.rx) < 140) return { btn: 'Поднять', msg: 'Нажми E: поднять ' + (o.n || 'друга'), fn: (function (id, nm) { return function () { if (socket) socket.emit('rv', { to: id }); sfx('pick'); popup(P.x, PLAYER_H + 24, 'Поднимаешь ' + nm, '#9dffb8'); }; })(k, o.n || 'друга'), x: o.rx };
    }
    return null;
  }

function hurt(n) {
    if (gh.on) return;
    if (dn.on) return;
    if (typeof mgShield === 'number' && mgShield > 0) { popup(P.x, PLAYER_H + 24, 'Щит!', '#9fe3ff'); sfx('pick'); return; }
    if (typeof mgFat === 'number' && mgFat > 0) n = Math.max(1, Math.ceil(n * (mgFatB ? 0.3 : 0.5)));
    hp -= n; hurtFlash = 0.3; sfx('no');
    popup(P.x, PLAYER_H + 24, '\u2212' + n + ' HP', '#ff6b6b');
    if (hp <= 0) { if (dnCan()) dnDown(); else faint(); }
  }

function updateWool(dt, lock) {
    if (hp < maxHp()) hp = Math.min(maxHp(), hp + dt * regenRate());
    if (hurtFlash > 0) hurtFlash = Math.max(0, hurtFlash - dt);
    hurtUi();
    woolT += dt;
    if (woolT > 8 && wools.length < 14 && loc.i === 0) {
      woolT = 0;
      var x, tries = 0;
      do { x = 3000 + Math.random() * (WORLD_W - 3200); tries++; } while (Math.abs(x - P.x) < 500 && tries < 10);
      addWool(x);
    }
    for (var wi = 0; wi < wools.length; wi++) { var wn = wools[wi]; if (wn.np && Math.abs(P.x - wn.dx) > 100) wn.np = false; }
    if (lock || !music.auto) return;
    collectWools(false);
  }

function collectWools(manual) {
    if (noPick()) return 0;
    var got = 0;
    for (var i = wools.length - 1; i >= 0; i--) {
      var w = wools[i];
      if (w.np && !manual) continue;
      if (Math.abs(P.x - w.x) < 46 && P.z < 40) {
        if (save.carried >= cap()) {
          if (fullT <= 0) { fullT = 1.6; sfx('no'); popup(P.x, PLAYER_H + 24, 'Карман полон', '#ff9a9a'); }
          continue;
        }
        wools.splice(i, 1); save.wool++; save.carried++; persist(); hud(); got++;
        if (save.gloves) { sfx('pick'); popup(w.x, 90, 'Перчатки!', '#9dffb8'); }
        else hurt(WOOL_DMG);
        if (!woolSeen && hp > 0) {
          woolSeen = true;
          toast(save.gloves ? 'Стекловата в перчатках не колется. В магазине дают ' + WOOL_PRICE + ' коинов за штуку.'
            : 'Стекловата колется: \u2212' + WOOL_DMG + ' HP. В гараже есть перчатки. В магазине за неё дают ' + WOOL_PRICE + ' коинов.', 5500);
        }
        if (hp <= 0) break;
      }
    }
    return got;
  }

function busLock() { return (bus.on && bus.st !== 'leave') || ob.on || av.on || pax.on || !!ride.id || !!trip.inn; }

function callBus(from, dest) {
    if (bus.on || paused) return false;
    bus.on = true; bus.st = 'come'; bus.stop = from; bus.dest = dest; bus.t = 0; bus.v = 0; bus.alpha = 1; bus.hide = false;
    bus.dir = dest.dir || (dest.x > from.x ? 1 : -1); bus.cross = dest.cross || null; bus.paid = dest.price || 0; bus.door = 0; bus.acc = 0; bus.smoke = 0;
    bus.x = bus.dir < 0 ? Math.max(camX + vw + 700, from.x + 900) : Math.min(camX - 700, from.x - 900);
    input.left = input.right = false; jumpTimer = 0; P.vx = 0; P.vz = 0; wash.on = false;
    toast('Автобус едет. Подожди на остановке или нажми «Отменить».', 3000);
    sfx('pick');
    return true;
  }

function busCancel() {
    if (!bus.on || bus.st !== 'come') return;
    if (bus.paid > 0) { save.coins += bus.paid; persist(); hud(); popup(P.x, PLAYER_H + 30, '+' + bus.paid + ' ' + coinWord(bus.paid), '#9dffb8'); }
    bus.paid = 0; bus.on = false; bus.st = ''; bus.alpha = 1; bus.hide = false; bus.cross = null; bus.v = 0;
    toast('Вызов отменён, билет возвращён.', 2500); sfx('no');
  }

function busEmergency() {
    if (!bus.on || bus.st !== 'ride' || bus.cross) return;
    bus.st = 'drop'; bus.t = 0; bus.v = 0; P.x = bus.x; bus.door = 0.2;
    toast('Остановка по требованию. Выходим!', 2500); sfx('pick');
  }

function exitVehicle() {
    if (paused) return;
    if (pax.on) { paxAct(); return; }
    if (av.on) { avExit(); return; }
    if (ob.on) { exitOwnBus(); sfx('pick'); return; }
    if (ride.id) { rideStop(); sfx('pick'); return; }
    if (bus.on && bus.st === 'come') { busCancel(); return; }
    if (bus.on && bus.st === 'ride' && !bus.cross) { busEmergency(); return; }
  }

function busDrive(dt, rem, vmax, accel) {
    var want = Math.min(vmax, Math.sqrt(2 * accel * 0.8 * Math.max(0, rem)) + 30), pv = bus.v;
    var dv = want - bus.v, lim = accel * dt;
    bus.v += Math.max(-lim * 1.4, Math.min(lim, dv));
    if (bus.v < 0) bus.v = 0;
    bus.acc += ((bus.v - pv) / Math.max(dt, 0.001) - bus.acc) * Math.min(1, 8 * dt);
    return bus.v * dt;
  }

function updateBus(dt) {
    var s = bus.stop, d = bus.dest, door = 0;
    bus.t += dt;
    if (bus.st === 'come') {
      var rem = (s.x - bus.x) * bus.dir, step = busDrive(dt, rem, 700 * busMul(), 900 * busMul());
      bus.x += bus.dir * Math.min(step, Math.max(0, rem));
      if (rem < 3 || (bus.t > 25 && rem < 60)) { bus.x = s.x; bus.v = 0; bus.st = 'board'; bus.t = 0; sfx('pick'); }
      else if (bus.t > 40) { bus.x = s.x; bus.v = 0; bus.st = 'board'; bus.t = 0; } // страховка от зависания
    } else if (bus.st === 'board') {
      door = Math.min(1, bus.t / 0.25);
      P.x += ((bus.x - bus.dir * 40) - P.x) * Math.min(1, 9 * dt); P.z = 0; P.vz = 0; P.vx = 0;
      if (bus.t > 0.4) bus.hide = true;
      if (bus.t > 0.7) { bus.st = 'ride'; bus.t = 0; bus.v = 0; toast('Поехали: ' + d.name + '.' + (dirtyN() > 0 ? ' В пути чекушки моются в ' + BUS_WASH_BOOST + ' раза быстрее.' : ''), 3000); sfx('rare'); }
    } else if (bus.st === 'ride') {
      var rem2 = (d.x - bus.x) * bus.dir, st2 = busDrive(dt, d.cross ? 1e5 : rem2, 1250 * busMul(), 1600 * busMul());
      bus.x += bus.dir * Math.min(st2, Math.max(0, rem2));
      P.x = bus.x - bus.dir * 40; P.vx = 0; P.face = bus.dir;
      if (d.cross) {
        if (bus.t > 1.7 && !lt.st) { bus.st = 'xfer'; lt.st = 'out'; lt.t = 0; lt.dest = d.cross.loc; lt.side = bus.dir < 0 ? 'right' : 'left'; lt.atX = d.cross.x; }
      } else if (rem2 < 3 || (bus.t > 60 && rem2 < 80)) { bus.x = d.x; P.x = bus.x - bus.dir * 40; bus.v = 0; bus.st = 'drop'; bus.t = 0; sfx('sell'); }
    } else if (bus.st === 'drop') {
      bus.v = Math.max(0, bus.v - 1800 * dt); bus.x += bus.dir * bus.v * dt;
      door = Math.min(1, bus.t / 0.25);
      P.x = bus.x - bus.dir * 40;
      if (bus.t > 0.45) {
        bus.hide = false; P.x = bus.x - bus.dir * 70; P.z = 0; P.vz = 0; P.face = -bus.dir; bus.st = 'leave'; bus.t = 0; bus.v = Math.max(bus.v, 20);
        popup(P.x, PLAYER_H + 20, 'Приехали!', '#ffd23f');
      }
    } else if (bus.st === 'leave') {
      door = Math.max(0, 1 - bus.t / 0.3);
      bus.v = Math.min(420, bus.v + 700 * dt); bus.x += bus.dir * bus.v * dt; bus.alpha -= dt * 1.2;
      if (bus.alpha <= 0) { bus.on = false; bus.alpha = 1; bus.st = ''; bus.v = 0; bus.paid = 0; }
    }
    bus.door += (door - bus.door) * Math.min(1, 14 * dt);
    // дымок из выхлопной трубы
    if (bus.on && bus.v > 30) { bus.smoke -= dt; if (bus.smoke <= 0) { bus.smoke = 0.09; burst(bus.x + bus.dir * 104, gY - 22, 1, 'rgba(190,195,205,.8)', 60, 0.6); } }
  }

function r1(v) { return Math.round(v * 10) / 10; }

function coinWord(n) {
    if (n % 1 !== 0) return 'коина';
    n = Math.abs(n); var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 'коин';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'коина';
    return 'коинов';
  }

function fmtP(p) { return r1(p).toFixed(1).replace('.', ',').replace(/,0$/, ''); }

function pctOf(p) { return Math.round((p - BASE_PRICE) / BASE_PRICE * 100); }

function pctStr(p) { var c = pctOf(p); return (c > 0 ? '+' : (c < 0 ? '\u2212' : '')) + Math.abs(c) + '%'; }

function clampP(v) { return Math.min(MAX_PRICE, Math.max(MIN_PRICE, v)); }

function pushRate(np, dir) {
    save.rate = np; rate.dir = dir;
    rate.hist.push(np); if (rate.hist.length > 14) rate.hist.shift();
    persist();
  }

function applyRate() {
    var np = r1(clampP(save.base * (rate.ev ? rate.ev.m : 1)));
    if (np !== save.rate) pushRate(np, np > save.rate ? 1 : -1);
  }

function fmtTime(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

function evPct(m) { return (m > 1 ? '+' : '\u2212') + Math.round(Math.abs(m - 1) * 100) + '%'; }

function evUi() {
    var cityNow = hasSignal(), k = (rate.ev ? rate.ev.name + '|' + Math.ceil(rate.ev.left) : '') + '|' + cityNow;
    if (k === lastEv) return;
    lastEv = k;
    if (!rate.ev || !cityNow) { elEv.hidden = true; return; }
    var up = rate.ev.m > 1;
    elEv.hidden = false;
    elEv.className = 'evchip ' + (up ? 'up' : 'down');
    elEv.textContent = (up ? '\u25B2 ' : '\u25BC ') + rate.ev.name + ' ' + evPct(rate.ev.m) + ' \u00B7 ' + fmtTime(rate.ev.left);
  }

function startEvent() {
    var wantUp = Math.random() < 0.8 || save.base < 3 || rate.noBad > 0;
    var pool = [], k;
    for (k = 0; k < EVENTS.length; k++) if ((EVENTS[k].m > 1) === wantUp && k !== rate.last) pool.push(k);
    var i = pool[Math.floor(Math.random() * pool.length)];
    rate.last = i;
    var e = EVENTS[i];
    rate.ev = { name: e.name, m: e.m, left: 45 + Math.random() * 30 };
    applyRate();
    if (hasSignal()) toast(e.txt + ' Курс ' + evPct(e.m) + '.', 5000);
  }

function rebound() {
    rate.low = 0; rate.ev = null; rate.evT = 25 + Math.random() * 15; rate.t = RATE_CD; rate.noBad = NOBAD_TIME;
    save.base = REBOUND; lastEv = '';
    applyRate();
    if (hasSignal()) toast('Тара совсем подешевела, и курс отскочил: теперь ' + fmtP(save.rate) + ' коинов за чекушку! Плохих ивентов не будет 5 минут.', 5500);
  }

function updateRate(dt) {
    rate.t -= dt; if (typeof evOrder !== 'undefined' && evOrder.cd > 0) evOrder.cd -= dt;
    if (rate.noBad > 0) rate.noBad = Math.max(0, rate.noBad - dt);
    if (rate.t <= 0) {
      rate.t = RATE_CD;
      var p = save.base;
      var pUp = p > 25 ? 0.35 : (p < 3 ? 0.8 : 0.5);
      var up = Math.random() < pUp;
      var mag = Math.max(0.1, p * (0.06 + Math.random() * 0.2));
      var nb = r1(clampP(up ? p + mag : p - mag));
      if (nb === p) nb = r1(clampP(p + (up ? 0.1 : -0.1)));
      save.base = nb;
      if (nb !== p) { var before = save.rate; applyRate(); if (save.rate === before) persist(); } else persist();
    }
    if (rate.ev) {
      rate.ev.left -= dt;
      if (rate.ev.left <= 0) {
        var nm = rate.ev.name;
        rate.ev = null; rate.evT = 35 + Math.random() * 35;
        applyRate();
        if (hasSignal()) toast('Ивент «' + nm + '» закончился. Курс: ' + fmtP(save.rate) + '.', 3500);
      }
    } else {
      rate.evT -= dt;
      if (rate.evT <= 0) startEvent();
    }
    if (save.rate < LOW_LIMIT) { rate.low += dt; if (rate.low >= LOW_TIME) rebound(); }
    else rate.low = 0;
  }

function mbText(mb) { return mb >= 1000 ? (Math.round(mb / 100) / 10 + '').replace('.', ',') + ' ГБ' : Math.round(mb) + ' МБ'; }

function wifiHere() {
    var x = bus.on ? bus.x : P.x;
    if (loc.i === 1) return true;
    if (loc.i === 0) return x < CITY_END;
    if (loc.i === 3) { var w = LOCS[3].wifi; return x > w[0] && x < w[1]; }
    return false;
  }

function dataActive() { return !!save.dataUnl || save.dataMB > 0; }

function sigKind() { return wifiHere() ? 'wifi' : ((save.dataOn && dataActive()) ? 'data' : ''); }

function hasSignal() { return sigKind() !== ''; }

function updateData(dt) {
    if (wifiHere() || !save.dataOn || save.dataUnl || save.dataMB <= 0) return;
    save.dataMB = Math.max(0, save.dataMB - DATA_RATE * dt); dataAcc += dt;
    if (dataAcc >= 5) { dataAcc = 0; persist(); }
    if (save.dataMB <= 20 && save.dataMB > 0 && !dataWarn) { dataWarn = true; toast('Мобильные данные на исходе: осталось ' + mbText(save.dataMB) + '.', 3500); }
    if (save.dataMB <= 0) { persist(); sfx('no'); toast('Мобильные данные кончились. Курс и биржа вне Wi-Fi недоступны.', 4500); lastRate = ''; }
    if (save.dataMB > 40) dataWarn = false;
  }

function mkNext(p) {
    var pUp = 0.5 + Math.max(-0.22, Math.min(0.22, (150 - p) / 700));
    var up = Math.random() < pUp, mag = p * (0.03 + Math.random() * 0.13);
    var np = Math.round(up ? p + mag : p - mag);
    if (np === Math.round(p)) np += up ? 1 : -1;
    return Math.max(CC_MIN, Math.min(CC_MAX, np));
  }

function ccP() { return Math.round(save.ccp); }

function ccAvg() { return save.cc > 0 ? save.ccCost / save.cc : 0; }

function ccValue() { return save.cc * ccP(); }

function mkTick() {
    var old = ccP();
    save.ccp = mkNext(save.ccp);
    mkHist.push(save.ccp); if (mkHist.length > 40) mkHist.shift();
    save.cch = mkHist.slice(); save.cct = Date.now(); persist();
    mk.ch = (ccP() - old) / old;
    if (save.phone && save.cc > 0 && hasSignal() && Math.abs(mk.ch) >= 0.1 && !phoneOpen) {
      toast('Чекушка-коин ' + (mk.ch > 0 ? 'вырос' : 'упал') + ' на ' + Math.round(Math.abs(mk.ch) * 100) + '%: теперь ' + ccP() + '.', 3000);
    }
    if (phoneOpen) renderPhone();
  }

function updateMarket(dt) {
    mk.t -= dt;
    if (mk.t <= 0) { mk.t = CC_TICK; mkTick(); }
    if (phoneOpen) { var s = Math.ceil(mk.t); if (s !== mk.shown) { mk.shown = s; var e = document.getElementById('phNext'); if (e) e.textContent = 'Следующая цена через ' + s + ' с'; } }
  }

function needSignal() {
    if (hasSignal()) return true;
    sfx('no'); toast('Нет сети. Нужны Wi-Fi (город, аэропорт) или мобильные данные.', 3000);
    return false;
  }

function ccBuy(n) {
    if (!needSignal()) return;
    var p = ccP(), can = Math.floor(save.coins / p);
    if (n === 0) n = can;
    n = Math.min(n, can);
    if (n < 1) { sfx('no'); toast('Не хватает коинов: один Чекушка-коин стоит ' + p + '.', 2500); return; }
    save.coins -= n * p; save.cc += n; save.ccCost += n * p;
    persist(); hud(); sfx('sell'); renderPhone();
    popup(P.x, PLAYER_H + 20, '+' + n + ' ЧКН', '#ffd23f');
    if (typeof ach === 'function') ach('trader');
  }

function ccSell(n) {
    if (!needSignal()) return;
    if (save.cc < 1) { sfx('no'); toast('У тебя нет Чекушка-коинов.', 2500); return; }
    if (n === 0 || n > save.cc) n = save.cc;
    var p = ccP(), avg = ccAvg(), gain = n * p;
    save.ccCost = Math.max(0, save.ccCost - avg * n); save.cc -= n; if (save.cc <= 0) { save.cc = 0; save.ccCost = 0; }
    save.coins += gain; persist(); hud(); sfx('sell'); renderPhone();
    popup(P.x, PLAYER_H + 20, '+' + gain + ' ' + coinWord(gain), '#ffd23f');
    if (gain - avg * n >= 500 && typeof ach === 'function') ach('broker');
  }

function phBtn(txt, cls, fn, off) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'phb ' + (cls || '') + (off ? ' no' : '');
    b.setAttribute('aria-disabled', off ? 'true' : 'false'); b.textContent = txt; b.addEventListener('click', fn); return b;
  }

function drawChart() {
    if (!phChart) return;
    var g = phChart.getContext('2d'), w = phChart.width, h = phChart.height;
    g.clearRect(0, 0, w, h);
    var a = mkHist, mn = Infinity, mx = -Infinity, i;
    for (i = 0; i < a.length; i++) { if (a[i] < mn) mn = a[i]; if (a[i] > mx) mx = a[i]; }
    if (mx - mn < 10) { var mid = (mx + mn) / 2; mn = mid - 5; mx = mid + 5; }
    var live = hasSignal(), up = a.length < 2 || a[a.length - 1] >= a[a.length - 2];
    var col = !live ? '#8a93a5' : (up ? '#2fbf6b' : '#e5484d');
    g.strokeStyle = 'rgba(128,140,165,.25)'; g.lineWidth = 1;
    for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, h * i / 4); g.lineTo(w, h * i / 4); g.stroke(); }
    var px = function (k) { return 8 + (w - 16) * (a.length < 2 ? 1 : k / (a.length - 1)); };
    var py = function (v) { return h - 14 - (h - 28) * (v - mn) / (mx - mn); };
    var gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, col + '55'); gr.addColorStop(1, col + '00');
    g.beginPath(); g.moveTo(px(0), h);
    for (i = 0; i < a.length; i++) g.lineTo(px(i), py(a[i]));
    g.lineTo(px(a.length - 1), h); g.closePath(); g.fillStyle = gr; g.fill();
    g.beginPath();
    for (i = 0; i < a.length; i++) { if (i) g.lineTo(px(i), py(a[i])); else g.moveTo(px(i), py(a[i])); }
    g.strokeStyle = col; g.lineWidth = 2.5; g.lineJoin = 'round'; g.stroke();
    g.fillStyle = col; g.beginPath(); g.arc(px(a.length - 1), py(a[a.length - 1]), 4.5, 0, 6.3); g.fill();
    g.fillStyle = 'rgba(128,140,165,.9)'; g.font = '11px system-ui, sans-serif'; g.textAlign = 'left';
    g.fillText(Math.round(mx), 4, 12); g.fillText(Math.round(mn), 4, h - 3);
  }

function sigText() {
    var k = sigKind();
    if (k === 'wifi') return '📶 Wi-Fi: связь есть';
    if (k === 'data') return '📶 Мобильные данные: ' + (save.dataUnl ? 'безлимит' : 'осталось ' + mbText(save.dataMB));
    return '📵 Нет сети' + (save.dataOn ? '' : ' (мобильные данные выключены)');
  }

function renderPhone() {
    if (!phBody) return;
    document.getElementById('phCoins').textContent = save.coins.toLocaleString('ru-RU');
    document.getElementById('phSig').textContent = sigText();
    document.getElementById('phSig').className = 'phsig ' + (hasSignal() ? 'ok' : 'off');
    document.getElementById('phTabX').classList.toggle('on', phTab === 'x');
    document.getElementById('phTabD').classList.toggle('on', phTab === 'd');
    var phTb = document.getElementById('phTabB'); if (phTb) phTb.classList.toggle('on', phTab === 'b');
    phBody.textContent = '';
    var live = hasSignal(), d;
    if (phTab === 'x') {
      var p = ccP(), prev = mkHist.length > 1 ? Math.round(mkHist[mkHist.length - 2]) : p, pc = Math.round((p - prev) / prev * 100);
      d = document.createElement('div'); d.className = 'phprice';
      d.innerHTML = '<span class="pn">ЧКН</span><span class="pv">' + p + '</span><span class="pp ' + (pc >= 0 ? 'up' : 'down') + '">' + (pc >= 0 ? '▲ +' : '▼ −') + Math.abs(pc) + '%</span>';
      phBody.appendChild(d);
      var nx = document.createElement('div'); nx.className = 'phnext'; nx.id = 'phNext'; nx.textContent = live ? 'Следующая цена через ' + Math.ceil(mk.t) + ' с' : 'Цена устарела: нет сети'; phBody.appendChild(nx);
      phBody.appendChild(phChart);
      var hold = document.createElement('div'); hold.className = 'phhold';
      var pl = ccValue() - save.ccCost;
      hold.innerHTML = 'В кошельке: <b>' + save.cc + ' ЧКН</b> (' + ccValue().toLocaleString('ru-RU') + ' коинов)' +
        (save.cc > 0 ? '<br>Купил в среднем по ' + (Math.round(ccAvg() * 10) / 10).toString().replace('.', ',') + ', итог: <b class="' + (pl >= 0 ? 'up' : 'down') + '">' + (pl >= 0 ? '+' : '−') + Math.abs(Math.round(pl)).toLocaleString('ru-RU') + '</b>' : '');
      phBody.appendChild(hold);
      var row = document.createElement('div'); row.className = 'phrow';
      var can = Math.floor(save.coins / p);
      row.appendChild(phBtn('Купить 1', 'buy', function () { ccBuy(1); }, !live || can < 1));
      row.appendChild(phBtn('Купить 10', 'buy', function () { ccBuy(10); }, !live || can < 10));
      row.appendChild(phBtn('Купить макс.', 'buy', function () { ccBuy(0); }, !live || can < 1));
      phBody.appendChild(row);
      var row2 = document.createElement('div'); row2.className = 'phrow';
      row2.appendChild(phBtn('Продать 1', 'sell', function () { ccSell(1); }, !live || save.cc < 1));
      row2.appendChild(phBtn('Продать 10', 'sell', function () { ccSell(10); }, !live || save.cc < 10));
      row2.appendChild(phBtn('Продать всё', 'sell', function () { ccSell(0); }, !live || save.cc < 1));
      phBody.appendChild(row2);
      var h = document.createElement('div'); h.className = 'whelp';
      h.textContent = 'Цена Чекушка-коина меняется каждые ' + CC_TICK + ' секунд: то вверх, то вниз. Купи дешевле, продай дороже. Торговать можно только при связи.';
      phBody.appendChild(h);
      drawChart();
    } else if (phTab === 'b') {
      renderBankTab();
    } else {
      d = document.createElement('div'); d.className = 'phhold';
      d.innerHTML = save.dataUnl ? 'Тариф: <b>безлимит навсегда</b>.' : 'Осталось: <b>' + mbText(save.dataMB) + '</b>. Расход: примерно ' + Math.round(DATA_RATE * 60) + ' МБ в минуту вне Wi-Fi.';
      phBody.appendChild(d);
      var sw = document.createElement('div'); sw.className = 'phrow one';
      sw.appendChild(phBtn(save.dataOn ? 'Мобильные данные: включены' : 'Мобильные данные: выключены', save.dataOn ? 'buy' : 'sell', function () { save.dataOn = save.dataOn ? 0 : 1; persist(); lastRate = ''; renderPhone(); }));
      phBody.appendChild(sw);
      DATA_PACKS.forEach(function (pk) {
        var c = document.createElement('div'); c.className = 'upc';
        c.innerHTML = '<div class="top"><span class="nm">Пакет ' + mbText(pk.mb) + '</span><span class="lv">~' + Math.round(pk.mb / DATA_RATE / 60) + ' мин</span></div>';
        var ok = save.coins >= pk.price && !save.dataUnl;
        var b = document.createElement('button'); b.type = 'button'; b.className = 'buy' + (ok ? '' : ' no'); b.setAttribute('aria-disabled', ok ? 'false' : 'true');
        b.innerHTML = '<span class="coin"></span><span>' + pk.price + '</span>';
        b.addEventListener('click', function () { buyData(pk); });
        c.appendChild(b); phBody.appendChild(c);
      });
      var u = document.createElement('div'); u.className = 'upc';
      u.innerHTML = '<div class="top"><span class="nm">Безлимит</span><span class="lv">' + (save.dataUnl ? 'куплен' : 'навсегда') + '</span></div><div class="ds">Интернет без счётчика: курс и биржа работают где угодно, и так до конца игры.</div>';
      var ub = document.createElement('button'); ub.type = 'button';
      var uok = !save.dataUnl && save.coins >= DATA_UNL; ub.className = 'buy' + (uok ? '' : ' no'); ub.setAttribute('aria-disabled', uok ? 'false' : 'true');
      ub.innerHTML = save.dataUnl ? '<span>Куплено</span>' : '<span class="coin"></span><span>' + DATA_UNL.toLocaleString('ru-RU') + '</span>';
      ub.addEventListener('click', function () { buyData(null); });
      u.appendChild(ub); phBody.appendChild(u);
    }
  }

function buyData(pk) {
    if (save.dataUnl) return;
    var cost = pk ? pk.price : DATA_UNL;
    if (save.coins < cost) { sfx('no'); return; }
    save.coins -= cost;
    if (pk) { save.dataMB += pk.mb; dataWarn = false; toast('Пакет ' + mbText(pk.mb) + ' подключён.', 2500); }
    else { save.dataUnl = 1; toast('Безлимит подключён навсегда!', 3500); if (typeof ach === 'function') ach('unl'); }
    persist(); hud(); sfx('sell'); lastRate = '';
    renderPhone(); if (upOpen) renderUp();
  }

function openPhone() {
    if (paused && !phoneOpen) return;
    if (!save.phone) { sfx('no'); toast('Телефона нет: купи его в гараже, вкладка «Связь».', 3000); return; }
    if (busLock() && !ride.id) { toast('В автобусе не до телефона.', 2000); return; }
    phoneOpen = true; mk.shown = -1; syncPause(); renderPhone(); phOverlay.hidden = false;
    document.getElementById('closePhone').focus({ preventScroll: true });
  }

function closePhone() { phoneOpen = false; syncPause(); phOverlay.hidden = true; if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }

function phToggle(e) {
    var n = performance.now();
    if (n - phTapAt < 400) return;
    phTapAt = n;
    if (e && e.cancelable) e.preventDefault();
    if (phoneOpen) closePhone(); else openPhone();
  }

function phoneUi() {
    var show = !!save.phone, el = document.getElementById('phoneMini');
    if (el.hidden === show) el.hidden = !show;
    if (!show) return;
    var k = sigKind() + '|' + (save.cc > 0);
    if (k === lastPhoneUi) return;
    lastPhoneUi = k;
    el.firstChild.nodeValue = hasSignal() ? '📱 ' : '📵 ';
  }

function sendPlane(special) {
    var dir = Math.random() < 0.5 ? 1 : -1;
    air.plane = { x: dir > 0 ? camX - 280 : camX + vw + 280, y: 210, dir: dir, dropX: Math.max(60, Math.min(WORLD_W - 60, P.x)), dropped: false, special: !!special };
    sfx('pick');
  }

function airOk() { return !(loc.i === 16 || loc.i === 8 || loc.i === 12 || loc.i === 13 || loc.i === 14 || loc.i === 15 || loc.i === 17 || loc.i >= 18 || subActive() || p5.on || p6.on || cs.on || fin.on || rit.on || resc.on); }

function callAir() {
    if (paused || busLock() || save.air < 1 || air.cd > 0 || air.plane || !airOk()) return;
    air.cd = airCd(save.air);
    sendPlane(false);
    toast('Самолёт вылетел. Ящик упадёт на твоё место.', 3000);
    if (heroOver()) startBoss();
  }

function updateAir(dt) {
    if (air.cd > 0) air.cd = Math.max(0, air.cd - dt);
    var pl = air.plane;
    if (pl) {
      pl.x += pl.dir * 360 * dt;
      if (!pl.dropped && (pl.dir > 0 ? pl.x >= pl.dropX : pl.x <= pl.dropX)) {
        pl.dropped = true;
        var y0 = pl.y + 26;
        air.crates.push({ x: pl.dropX, y: y0, vy: Math.max(30, (gY - y0) / FALL_TIME), landed: false, ph: Math.random() * 6, sp: !!pl.special });
      }
      if (pl.dropped && (pl.x < camX - 460 || pl.x > camX + vw + 460)) air.plane = null;
    }
    for (var i = air.crates.length - 1; i >= 0; i--) {
      var c = air.crates[i];
      if (!c.landed) {
        c.y += c.vy * dt;
        if (c.y >= gY) { c.y = gY; c.landed = true; popup(c.x, 70, 'Ящик!', '#ffd23f'); sfx('pick'); }
      } else if (Math.abs(P.x - c.x) < 56 && P.z < 70) {
        openCrate(c); air.crates.splice(i, 1);
      }
    }
  }

function openCrate(c) {
    var n = airCount() + (c.sp ? 10 : 0);
    var span = 70 + n * 9;
    for (var i = 0; i < n; i++) {
      var f = (i + 0.5) / n * 2 - 1;
      var x = Math.max(40, Math.min(WORLD_W - 40, c.x + f * span + (Math.random() - 0.5) * 10));
      bottles.push({ x: x, off: 0, ph: Math.random() * 6.28, r: rollRar(c.x, airLuck(save.air), 3), c: !!c.sp && Math.random() < 0.3 });
    }
    sfx('sell');
    popup(c.x, 90, n + ' чекушек!', '#ffd23f');
    toast('Ящик открыт: собирай! В карман влезает ' + cap() + ', остальное сдай и возвращайся.', 4500);
  }

function viewGround() {
    var out = [];
    for (var i = 0; i < bottles.length; i++) {
      var b = bottles[i];
      if (b.off === 0 && !b.claimed && !b.np && b.x > camX - 120 && b.x < camX + vw + 120) out.push(b);
    }
    return out;
  }

function spawnSquirrel() {
    if (loc.i === 4 || loc.i === 5 || loc.i === 16) return false; // на Мальдивах и на воде белок нет
    if (squirrels.length >= wildMax()) return false;
    var c = viewGround();
    if (!c.length) return false;
    var tgt = c[Math.floor(Math.random() * c.length)];
    tgt.claimed = true;
    var sx = Math.random() < 0.5 ? camX - 170 : camX + vw + 170;
    sx = Math.max(-60, Math.min(WORLD_W + 60, sx));
    squirrels.push({ x: sx, dir: tgt.x > sx ? 1 : -1, state: 'run', tgt: tgt, ph: Math.random() * 6 });
    return true;
  }

function updateSquirrels(dt) {
    sqT -= dt;
    if (sqT <= 0) {
      sqT = loc.i === 2 ? 2.5 + Math.random() * 3 : (viewGround().length >= 6 ? 5 + Math.random() * 4 : 10 + Math.random() * 8) / (1 + (loc.i ? 0 : P.x) / 7000);
      spawnSquirrel();
    }
    for (var i = squirrels.length - 1; i >= 0; i--) {
      var s = squirrels[i];
      if (s.state === 'run') {
        var ti = bottles.indexOf(s.tgt);
        if (ti < 0) { s.state = 'scared'; s.dir = s.x < P.x ? -1 : 1; }
        else {
          s.dir = s.tgt.x > s.x ? 1 : -1;
          if (Math.abs(s.tgt.x - s.x) < 14) {
            bottles.splice(ti, 1);
            s.state = 'carry'; s.dir = s.x < P.x ? -1 : 1; s.r = s.tgt.r | 0;
            popup(s.x, SQ_H + 16, 'Украла!', '#ff9a9a'); sfx('no');
            if (!sqToast) { sqToast = true; toast('Белка украла чекушку! Догони её и отбери.', 4000); }
          }
        }
      }
      s.x += s.dir * (s.state === 'run' ? SQ_RUN : SQ_FLEE) * dt;
      // игрок пугает белку
      if ((s.state === 'run' || s.state === 'carry') && Math.abs(P.x - s.x) < 50 && P.z < 55) {
        if (s.state === 'carry') {
          bottles.push({ x: s.x, off: 0, ph: Math.random() * 6.28, r: s.r | 0 });
          popup(s.x, SQ_H + 16, 'Отобрал!', '#9dffb8'); sfx('pick');
        } else { s.tgt.claimed = false; popup(s.x, SQ_H + 16, 'Кыш!', '#ffffff'); }
        s.state = 'scared'; s.dir = P.x < s.x ? 1 : -1;
      }
      if (s.state !== 'run' && (s.x < camX - 240 || s.x > camX + vw + 240 || s.x < -40 || s.x > WORLD_W + 40)) squirrels.splice(i, 1);
    }
  }

function spawnHero() {
    hero.on = true;
    hero.dir = Math.random() < 0.5 ? -1 : 1;
    hero.x = hero.dir < 0 ? vw + 200 : -200;
    hero.y = 80 + Math.random() * Math.min(gY * 0.3, 230);
    heroT = 35 + Math.random() * 40;
    heroCycles++; hero.ambush = heroCycles % 4 === 0;
    if (!heroHint && save.air > 0) { heroHint = true; toast('Над тобой пролетает петух-герой. Вызови аирдроп, когда он прямо над петухом: он спустится на бой.', 6500); }
  }

function updateHero(dt) {
    if (boss.on || ep.on || subActive() || loc.i === 8 || loc.i === 9 || loc.i >= 10) { hero.on = false; heroT = Math.max(heroT, 20); return; }
    // Хоумлендер стёрт навсегда: не летает и ничего не делает, пока его не воскресят
    if (save.mx.er) { hero.on = false; heroT = Math.max(heroT, 60); return; }
    // после победы Хоумлендер отдыхает: не летает и не нападает
    if (bossCdLeft() > 0) { hero.on = false; heroT = Math.max(heroT, 25); return; }
    if (!hero.on) { heroT -= dt; if (heroT <= 0) spawnHero(); return; }
    hero.x += hero.dir * 140 * dt;
    if (hero.ambush && heroOver() && !busLock() && !air.plane && (save.carried - save.wool >= 5 || save.army >= 5)) {
      sendPlane(true); startBoss();
      toast('Хоумлендер-Петух заметил тебя и спустился сам! С неба падает ящик с чекушками.', 6500);
    }
    if (hero.dir < 0 ? hero.x < -280 : hero.x > vw + 280) hero.on = false;
  }

function npcNear(n) { return Math.abs(P.x - n.x) < 260; }

function updateNpcs(dt) {
    if (loc.i !== 0) return;
    for (var i = 0; i < NPCS.length; i++) {
      var n = NPCS[i];
      n.t += dt;
      if (n.sayT > 0) { n.sayT -= dt; if (n.sayT <= 0) n.say = ''; }
      if (npcNear(n)) {
        n.nextT -= dt;
        if (n.nextT <= 0 && !n.say) {
          var li = (n.id === 'collector' && typeof questLine === 'function' && (questReady() || Math.random() < 0.45) && questLine()) || n.lines[Math.floor(Math.random() * n.lines.length)];
          n.say = li; n.sayT = 6.5; n.nextT = 9 + Math.random() * 6;
        }
      } else if (n.say) { n.say = ''; n.sayT = 0; }
      if (n.sit) { n.dir = P.x < n.x ? -1 : 1; continue; }
      // собиратель ходит туда-сюда по городу, иногда наклоняется за чекушкой
      if (n.pause > 0) {
        n.pause -= dt; n.stoop = Math.min(1, n.stoop + dt * 3);
        if (n.pause <= 0) n.stoop = 0;
      } else {
        n.x += n.dir * 55 * dt; n.walk += dt * 8; n.stoop = Math.max(0, n.stoop - dt * 4);
        if (n.x > 1800) n.dir = -1; else if (n.x < 1100) n.dir = 1;
        if (Math.random() < dt * 0.25) n.pause = 1.2 + Math.random() * 1.2;
      }
    }
  }

function npcBubble(text, x, y) {
    ctx.font = '700 13px "Rubik", system-ui, sans-serif';
    var words = text.split(' '), lines = [], cur = '';
    words.forEach(function (w) { var t2 = cur ? cur + ' ' + w : w; if (ctx.measureText(t2).width > 190 && cur) { lines.push(cur); cur = w; } else cur = t2; });
    if (cur) lines.push(cur);
    var bw = 0; lines.forEach(function (l) { bw = Math.max(bw, ctx.measureText(l).width); });
    bw += 20; var bh = lines.length * 17 + 12, by = y - bh;
    ctx.fillStyle = 'rgba(255,255,255,.96)'; rrect(x - bw / 2, by, bw, bh, 10); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x - 6, by + bh); ctx.lineTo(x, by + bh + 8); ctx.lineTo(x + 6, by + bh); ctx.fill();
    ctx.fillStyle = '#14233f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach(function (l, k) { ctx.fillText(l, x, by + 6 + 8.5 + k * 17); });
  }

function drawNpcs() {
    if (loc.i !== 0) return;
    for (var i = 0; i < NPCS.length; i++) {
      var n = NPCS[i], im = img[n.img];
      if (!ready(im) || n.x < camX - 200 || n.x > camX + vw + 200) continue;
      var h = n.h, w = h * im.naturalWidth / im.naturalHeight;
      var bob = n.sit ? Math.sin(n.t * 1.8) * 1.2 : (n.pause > 0 ? 0 : -Math.abs(Math.sin(n.walk)) * 4);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(n.x, gY + 3, w * 0.36, 6, 0, 0, 6.3); ctx.fill();
      ctx.save(); ctx.translate(n.x, gY + bob);
      // собиратель на картинке смотрит вправо, водитель тоже вправо: отражаем, когда идёт/смотрит влево
      if (n.dir < 0) ctx.scale(-1, 1);
      if (!n.sit) ctx.rotate((n.stoop || 0) * 0.35 + Math.sin(n.walk) * (n.pause > 0 ? 0 : 0.04));
      ctx.drawImage(im, -w / 2, -h, w, h);
      ctx.restore();
      ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText(n.name, n.x, gY - h - 8); ctx.fillStyle = '#9fe3ff'; ctx.fillText(n.name, n.x, gY - h - 8);
      if (n.id === 'collector' && typeof questLine === 'function' && qCur()) { ctx.font = '700 22px system-ui, sans-serif'; ctx.fillStyle = questReady() ? '#ffd23f' : '#ffffff'; ctx.strokeStyle = '#14233f'; ctx.lineWidth = 4; var qy = gY - h - 32 + Math.sin(n.t * 4) * 2; if (!n.say) { ctx.strokeText(questReady() ? '❗' : '❓', n.x, qy); ctx.fillText(questReady() ? '❗' : '❓', n.x, qy); } }
      if (n.say) npcBubble(n.say, n.x, gY - h - 22);
    }
  }

function locEntryStop(i) { return i === 0 ? { x: BUS_HOME_X, name: 'Посёлок' } : LOC_STOPS[i]; }

function crossRoutes(from) {
    var here = from.link ? from.loc : 0, out = [];
    LOC_ORDER.forEach(function (to) {
      if (to === here) return;
      var dir = LOC_ORDER.indexOf(to) > LOC_ORDER.indexOf(here) ? 1 : -1, es = locEntryStop(to);
      out.push({ x: from.x + dir * 30000, name: LOC_RNAME[to], price: LINK_PRICE[here + '-' + to], dir: dir, tag: 'ярлык', cross: { loc: to, x: es.x, name: es.name } });
    });
    return out;
  }

function busArriveCross() {
    var c = bus.cross; if (!c) return;
    bus.cross = null; bus.stop = bus.dest = { x: c.x, name: c.name };
    bus.x = c.x; P.x = c.x; bus.st = 'drop'; bus.t = 0; bus.hide = true; bus.alpha = 1; P.vx = 0; bus.v = 0; bus.door = 0;
    camX = Math.max(0, Math.min(WORLD_W - vw, c.x - vw * 0.5));
  }

function locSnapshot() {
    return { bottles: bottles, wools: wools, bins: bins, squirrels: squirrels, crates: air.crates, trees: trees, bushes: bushes, rocks: rocks, flowers: flowers, tufts: tufts, farTrees: farTrees, midTrees: midTrees };
  }

function locRestore(s) {
    bottles = s.bottles; wools = s.wools; bins = s.bins; squirrels = s.squirrels; air.crates = s.crates;
    trees = s.trees; bushes = s.bushes; rocks = s.rocks; flowers = s.flowers; tufts = s.tufts; farTrees = s.farTrees; midTrees = s.midTrees;
  }

function locBuild(i) {
    var L = LOCS[i], r = rng(5000 + i * 131), w = L.w, k, x;
    var s = { bottles: [], wools: [], bins: [], squirrels: [], crates: [], trees: [], bushes: [], rocks: [], flowers: [], tufts: [], farTrees: [], midTrees: [] };
    function far(arr, gap, hmin, hmax) { for (var fx = 0; fx < w; fx += 60 + r() * gap) arr.push({ x: fx, h: hmin + r() * (hmax - hmin), type: r() < 0.55 ? 'pine' : 'round', seed: r() * 100 }); }
    if (L.theme === 'park' || L.theme === 'forest') {
      for (x = 40; x < w - 40; x += 80 + r() * 120) { var kd = r(); s.trees.push({ x: x, h: 200 + r() * 140, type: kd < 0.4 ? 'oak' : (kd < 0.8 ? 'birch' : 'pine'), seed: r() * 1000 }); }
      for (x = 60; x < w; x += 90 + r() * 160) s.bushes.push({ x: x, s: 0.7 + r() * 0.9 });
      for (x = 500; x < w; x += 500 + r() * 700) s.rocks.push({ x: x, s: 0.6 + r() * 0.7 });
      for (x = 20; x < w; x += 14 + r() * 26) s.flowers.push({ x: x, c: ['#fff', '#ffd23f', '#ff7a8a', '#b79cff', '#ff9a3c'][Math.floor(r() * 5)], h: 6 + r() * 9 });
      for (x = 0; x < w; x += 10 + r() * 5) s.tufts.push({ x: x, h: 6 + r() * 12 });
      far(s.farTrees, 110, 120, 190); far(s.midTrees, 150, 150, 230);
    } else if (L.theme === 'airport') {
      for (x = 80; x < w; x += 600 + r() * 500) s.bushes.push({ x: x, s: 0.6 + r() * 0.5 });
      far(s.farTrees, 420, 110, 160);
    }
    var n = L.target;
    for (k = 0; k < n; k++) {
      var nb = { x: 140 + r() * (w - 280), off: 0, ph: r() * 6.28, r: 0 };
      if (L.theme === 'beach') { var mr = rollMald(); nb.r = mr.r; if (mr.sup) nb.sup = 1; if (mr.secret) nb.secret = 1; } else nb.r = rollRar(0, L.luck);
      s.bottles.push(nb);
    }
    return s;
  }

function locEnter(i, side, atX) {
    if (i === BLAB && c2n() >= 4) { i = NLAB; side = 'left'; atX = 600; }
    if (kk.on && i !== 5) krAbort('leave');
    locSt[loc.i] = locSnapshot();
    var st = locSt[i] || (i ? locBuild(i) : null);
    if (!st) return;
    loc.i = i; WORLD_W = LOCS[i].w; locRestore(st);
    if (i !== 4 && i !== 5) { var haveN = 0, topN, tk; for (tk = 0; tk < bottles.length; tk++) if (!bottles[tk].dr) haveN++; topN = Math.floor(locTarget() * 0.6) - haveN; for (tk = 0; tk < topN; tk++) addBottle(locSpawnX()); }
    if (i === 17 && !save.mx.sec1 && !bottles.some(function (q) { return q.secret; })) bottles.push({ x: 1620, off: 0, ph: 0, r: 5, secret: 1, sc1: 1 });
    if (i === 3 && atX == null && side === 'right') atX = AV_PARK - 170;
    P.x = (atX != null) ? atX : (side === 'left' ? 110 : WORLD_W - 110);
    if (ob.on) { ob.loc = i; ob.x = P.x; }
    P.face = (atX != null) ? 1 : (side === 'left' ? 1 : -1);
    P.vx = 0; P.vz = 0; P.z = 0; P.kb = 0; input.left = input.right = false; input.up = input.dn = false; camY = 0; sub.d = 0; sub.vy = 0; sub.px = P.x; bubbles.length = 0;
    camX = Math.max(0, Math.min(WORLD_W - vw, P.x - vw * 0.5)); if (vw >= WORLD_W) camX = 0;
    if (i === 4 || i === 5) squirrels.length = 0;
    popups.length = 0; fx.length = 0; hero.on = false; heroT = Math.max(heroT, 20); air.plane = null; ob.call = false; ob.v = ob.on ? ob.v : 0;
    for (var pi = 0; pi < pets.length; pi++) { var pt = pets[pi]; if (pt.tgt) pt.tgt.claimed = false; pt.tgt = null; pt.st = 'follow'; pt.x = P.x - P.face * (60 + pi * 24); }
    respawnT = 0; lastPill = ''; sellMode = ''; bSell.hidden = true; lastRate = ''; lastEv = ''; lastPhoneUi = '';
    tripOnEnter(i);
    if (av.on && av.hSet != null) { av.h = av.hSet; av.hSet = null; av.vy = 0; }
    if (i === 8) labStock(); if (i === 7) islandEnter(); if (i === 6) whEnter();
    if (bus.on && bus.cross) busArriveCross();
    if (i === 5) { if (sea.veh === 'sub' && !save.fs.sub) sea.veh = 'boat'; else if (sea.veh !== 'sub' && !save.fs.boat && save.fs.sub) sea.veh = 'sub'; }
    if (i === 5 && av.on) toast('Открытое море. Лети вправо: остров, влево: Мальдивы. Над водой не сесть. Если кончится топливо, тебя подберёт спасатель.', 6500);
    else if (i === 5) toast(sea.veh === 'sub' ? 'Открытое море. Подлодка: ▲ вверх, ▼ вниз. Ищи жемчуг на дне. Назад: к острову слева, у поверхности.' : 'Открытое море. Плыви влево-вправо. В косяках и на радужной ряби клёв лучше. Домой: плыви влево.', 6500);
    else if (i === 16) toast('Небо. Над облаками летают борты. Нажми E в воздухе: спуститься или вызвать заправщик (если куплена система дозаправки).', 6500);
    else if (i === 9) toast('Больница. Зайди внутрь (вход в центре): Меллстрой лежит в Палате 1 за золотой дверью.', 6000);
    else if (i === 14) toast('Офис Моггити. Он сидит за столом: заговори с ним, чтобы вызвать на мог-батл. Выход слева.', 6000);
    else if (i === 13) toast('Больница внутри: регистратура, кабинет врача, палаты. Золотая Палата 1: Меллстрой. Выход слева.', 6000);
    else if (i === 10) toast('Город Моггити. Тут могеры: они бьют, отбирают коины и чекушки. Безопасно только у Качалки. Бросок = «мог». Качайся, чтобы мог сильнее.', 7000);
    else if (i === 11) toast(save.mx.rr === 1 ? 'Лес. Поляна с кругом ритуала. Обряд проводят только ночью.' : 'Тихий Лес. Тут много чекушек.', 5000);
    else if (i === 18) toast('Терминал аэропорта: слева выход в город, касса и табло, справа выход на лётное поле.', 5500);
    else if (i === NLAB) toast(save.mx.c2m ? 'Новая лаборатория. Справа портальная пушка: выбери вселенную.' : 'Новая лаборатория: профессор и Меллстрой у верстака, слева выход.', 6000);
    else if (i === BLAB) toast('Разрушенная лаборатория горит! Перепрыгивай огонь и беги вправо к выходу на ферму.', 6500);
    else if (i === CGC) toast('Лагерь бунта Чикен Гана: 5 флагов, 3 сервера «бунт чг», 3 ютубера.', 6000);
    else if (i === UNI && !rr.on && uniV !== 8 && uniV !== 9) toast('Чужая вселенная. Победи Кокича, заложи заряд на ядро справа и беги к порталу слева.', 6500);
    else if (i === 17) toast(c2n() >= 4 ? 'Руины Чало Хауса. Тут спрятана секретная чекушка.' : 'Руины Чало Хауса. Иди вправо к машине телепорта.', 6000);
    else if (i === 12) toast('Секретная лаборатория. Читай записи на терминалах.', 5000);
    else if (i !== 4 && i < 7) toast('Локация: ' + LOCS[i].name + (i === 6 ? (save.mx.mh ? '. Меллстроя в Белом доме нет: он лечится в Больнице слева.' : '. Справа Белый дом: зайди внутрь, там сидит Меллстрой.') : i === 1 ? '. Тут всегда есть связь, но чекушек мало.' : (i === 2 ? '. Много белок: корми их орешками.' : (i === 3 ? '. Чекушки редкие. Wi-Fi ловит у терминала.' : '.'))), 4500);
    if (i && typeof ach === 'function') ach(['', 'city', 'park', 'airport', 'maldives', 'sea', 'wh', 'island', 'cave', '', 'mgcity', 'forest', '', 'ward', 'office', '', '', 'ruins', ''][i]);
    hud();
  }

function locEdgeFree() { return !(paused || bus.on || ride.id || boss.on || ep.on || wash.on || washOpen || trip.inn || trip.st === 'dep'); }

function locEdgeUpdate(dt) {
    if (lt.st) {
      lt.t += dt; input.left = input.right = false; P.vx = 0;
      if (lt.st === 'out') {
        elFade.style.opacity = Math.min(1, lt.t / 0.28);
        if (lt.t >= 0.28) { locEnter(lt.dest, lt.side, lt.atX); lt.atX = null; lt.st = 'in'; lt.t = 0; }
      } else {
        elFade.style.opacity = Math.max(0, 1 - lt.t / 0.35);
        if (lt.t >= 0.35) { lt.st = ''; elFade.style.opacity = 0; }
      }
      return;
    }
    if (lt.warn > 0) lt.warn -= dt;
    if (!locEdgeFree()) return;
    var L = LOCS[loc.i], dest, side;
    if (loc.i === 5 && subActive()) { // под водой краёв океана не пересечь: на остров и к берегу только с поверхности
      if ((P.x <= 30 && input.left) || (P.x >= WORLD_W - 30 && input.right)) { if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast('Край океана. Подлодка дальше не пойдёт.', 2500); } }
      return;
    }
    var eg = (ob.on || av.on) ? 118 : 30;
    if (P.x <= eg && input.left) { dest = L.left; side = 'right'; }
    else if (P.x >= WORLD_W - eg && input.right) { dest = L.right; side = 'left'; }
    else return;
    if (av.on) { // на своём борту можно выйти с Мальдив в океан и долететь до острова
      if (loc.i === 4 && side === 'left' && dest === undefined) dest = 5;
      if (dest === 8) { if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast('В пещеру борт не пролезет. Разворачивайся.', 3000); } return; }
    }
    if (loc.i === 7 && dest === 5 && !av.on && !(save.fs.boat || save.fs.sub)) { if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast('Без лодки отсюда не уплыть. Зажги сигнальную ракету у обломков.', 3500); } return; }
    if (loc.i === 12 && dest === 8 && c2n() === 1) { if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast('Проход в пещеру завалило горящими обломками. Выход справа, к ферме.', 3500); } return; }
    if (dest === 12 && loc.i !== 17 && !save.mx.cs) { if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast('Стена завалена. Тут что-то скрыто: активируй камни в шахте магией.', 3500); } return; }
    if (dest === undefined) {
      if (lt.warn <= 0) { lt.warn = 4; sfx('no'); toast(loc.i === 16 ? 'Край неба. Разворачивайся.' : loc.i === 5 ? 'Дальше открытый океан. Лодка туда не пройдёт.' : loc.i === 4 ? 'Дальше океан. Выйти в море можно на лодке с причала справа.' : 'Дальше пока закрыто: здесь будет новая локация.', 3000); }
      return;
    }
    lt.st = 'out'; lt.t = 0; lt.dest = dest; lt.side = side; sfx('jump');
  }

function locHint() {
    if (lt.st) return '';
    var L = LOCS[loc.i];
    if (L.left !== undefined && P.x < 200) return '◀ ' + LOCS[L.left].name;
    if (L.right !== undefined && P.x > WORLD_W - 200 && loc.i !== 7) return LOCS[L.right].name + ' ▶';
    return '';
  }

function locTarget() { return loc.i ? LOCS[loc.i].target : TARGET_BOTTLES; }

function locRespawnGap() { return (loc.i === 5 ? 1e9 : loc.i === 4 ? LOCS[4].resp : 50 / locTarget()) / (1 + save.army * 0.2); }

function locSpawnX() { return loc.i ? 140 + Math.random() * (WORLD_W - 280) : 2000 + Math.random() * (WORLD_W - 2200); }

function wildMax() { return loc.i ? LOCS[loc.i].wild : 2; }

function drawGateSign(x, text, locked) {
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 36, 5, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#4a5360'; ctx.fillRect(x - 3, gY - 122, 6, 122);
    ctx.fillStyle = locked ? '#8a3b3b' : '#1f4aa8'; rrect(x - 66, gY - 150, 132, 40, 7); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, gY - 130);
    if (locked) {
      ctx.fillStyle = '#e8c23a';
      for (var k = 0; k < 4; k++) { ctx.fillRect(x - 40 + k * 22, gY - 52, 11, 8); }
      ctx.fillStyle = '#c8323c'; ctx.fillRect(x - 46, gY - 56, 92, 4); ctx.fillRect(x - 46, gY - 36, 92, 4);
    }
  }

function drawGates() {
    if (loc.i === 4 || loc.i === 5 || loc.i === 16 || loc.i === 15 || loc.i === 17 || loc.i >= 19) return;
    if (typeof drawLocDetail === 'function') drawLocDetail();
    if (loc.i === 13 && typeof rcDrawCircle === 'function') { setCam(1); rcDrawCircle(); }
    var L = LOCS[loc.i];
    var lx = 70, rx = WORLD_W - 70;
    if (lx > camX - 90 && lx < camX + vw + 90) drawGateSign(lx, L.left !== undefined ? '◀ ' + LOCS[L.left].name : 'Закрыто', L.left === undefined || false);
    if (loc.i !== 7 && !(loc.i === 12 && c2n() >= 1) && rx > camX - 90 && rx < camX + vw + 90) drawGateSign(rx, L.right !== undefined ? LOCS[L.right].name + ' ▶' : 'Закрыто', L.right === undefined || (L.right === 12 && !save.mx.cs));
  }

function drawWifiTower(x) {
    ctx.strokeStyle = '#59616f'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 22, gY); ctx.lineTo(x, gY - 300); ctx.lineTo(x + 22, gY); ctx.stroke();
    ctx.lineWidth = 2;
    for (var k = 1; k < 7; k++) { var yy = gY - k * 40, hw = 22 * (1 - k * 40 / 300); ctx.beginPath(); ctx.moveTo(x - hw, yy); ctx.lineTo(x + hw, yy); ctx.stroke(); }
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x, gY - 304, 5 + Math.sin(t * 5) * 1.2, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(80,190,255,.75)'; ctx.lineWidth = 3;
    for (var a = 0; a < 3; a++) { var rr = 22 + a * 18 + ((t * 30) % 18); ctx.globalAlpha = Math.max(0, 1 - (rr - 22) / 70); ctx.beginPath(); ctx.arc(x, gY - 304, rr, -2.4, -0.74); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }

function drawBourse(x) {
    var w = 250, h = 470;
    ctx.fillStyle = '#2b3b5c'; ctx.fillRect(x - w / 2, gY - h, w, h + 4);
    ctx.fillStyle = 'rgba(160,215,245,.28)';
    for (var r = 0; r < 12; r++) for (var c = 0; c < 6; c++) ctx.fillRect(x - w / 2 + 12 + c * 40, gY - h + 120 + r * 28, 30, 18);
    ctx.fillStyle = '#10182b'; rrect(x - w / 2 + 10, gY - h + 12, w - 20, 92, 8); ctx.fill();
    ctx.fillStyle = '#d8e6ff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('БИРЖА ЧЕКУШКА-КОИН', x, gY - h + 28);
    var p = ccP(), up = mkHist.length < 2 || mkHist[mkHist.length - 1] >= mkHist[mkHist.length - 2];
    ctx.fillStyle = up ? '#34e07f' : '#ff5a5f'; ctx.font = '700 34px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillText((up ? '▲ ' : '▼ ') + p, x, gY - h + 66);
    ctx.fillStyle = '#8fa3c7'; ctx.font = '11px "Rubik", system-ui, sans-serif'; ctx.fillText('обновляется каждые ' + CC_TICK + ' с', x, gY - h + 92);
    ctx.fillStyle = '#d8362f'; ctx.fillRect(x - 3, gY - h - 40, 6, 40);
    ctx.fillStyle = '#7a4a22'; ctx.fillRect(x - 30, gY - 54, 60, 54);
  }

function drawTerminal(x) {
    var w = 760, h = 200;
    ctx.fillStyle = '#d7dde8'; ctx.fillRect(x - w / 2, gY - h, w, h + 4);
    ctx.fillStyle = '#aeb8c8'; ctx.fillRect(x - w / 2 - 14, gY - h - 12, w + 28, 14);
    ctx.fillStyle = 'rgba(120,190,230,.9)';
    for (var c = 0; c < 12; c++) ctx.fillRect(x - w / 2 + 18 + c * 61, gY - h + 34, 50, 100);
    ctx.fillStyle = '#6b7788'; ctx.fillRect(x - 55, gY - 74, 110, 74); ctx.fillStyle = '#fff'; ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВХОД', x, gY - 86);
    ctx.fillStyle = '#1f4aa8'; rrect(x - 130, gY - h - 56, 260, 44, 8); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('АЭРОПОРТ', x, gY - h - 34);
    ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillText('📶 Wi-Fi бесплатно', x, gY - 28);
    ctx.strokeStyle = 'rgba(80,190,255,.5)'; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
    ctx.strokeRect(LOCS[3].wifi[0], gY - h - 80, LOCS[3].wifi[1] - LOCS[3].wifi[0], h + 80); ctx.setLineDash([]);
  }

function drawTower(x) {
    ctx.fillStyle = '#b9c2d0'; ctx.fillRect(x - 16, gY - 260, 32, 260);
    ctx.fillStyle = '#8a95a8'; ctx.fillRect(x - 40, gY - 300, 80, 44);
    ctx.fillStyle = 'rgba(120,205,235,.95)'; ctx.fillRect(x - 34, gY - 292, 68, 26);
    ctx.fillStyle = '#d8362f'; ctx.fillRect(x - 3, gY - 330, 6, 30);
    ctx.fillStyle = Math.sin(t * 4) > 0 ? '#ff5a5f' : '#7a2a2a'; ctx.beginPath(); ctx.arc(x, gY - 334, 4, 0, 6.3); ctx.fill();
  }

function drawSkyBack(x0, x1) {
    var k, i, og = gY, cols = ['#3b8fe0', '#e5484d', '#7b8a52', '#f2b233'];
    for (k = 0; k < 7; k++) {
      var par = 0.22 + (k % 3) * 0.12, sp = 30 + k * 11, dr = k % 2 ? -1 : 1, span = vw + 900;
      setCam(par);
      var px = camX * par - 300 + ((((k * 1731 + t * sp * dr) % span) + span) % span), py = gY - 190 - ((k * 47) % 200);
      gY = 100000; drawAirliner(px, py - 100000 + 100000, dr, 0.2 + 0.08 * (k % 3), cols[k % 4], 0, 120); gY = og;
    }
    setCam(0.6); ctx.fillStyle = '#d6e6f8';
    var a0 = camX * 0.6 - 20, a1 = a0 + vw + 40;
    for (i = Math.floor(a0 / 200) - 1; i * 200 < a1; i++) drawCloud(i * 200, gY + 50 + ((i * 53) % 24 + 24) % 24, 2.6);
    ctx.fillRect(a0, gY + 70, vw + 60, 900);
    setCam(1); ctx.fillStyle = '#f4f9ff';
    for (i = Math.floor(x0 / 170) - 1; i * 170 < x1; i++) drawCloud(i * 170 + ((i * 29) % 40), gY + 14 + (((i * 37) % 26) + 26) % 26, 2.2 + (((i * 7) % 5) + 5) % 5 * 0.15);
    ctx.fillRect(x0, gY + 40, x1 - x0, 900);
  }

function drawLocBack() {
    if (p5.on && !p5.farm && !p5.uni) { drawP5Back(); return; }
    if (p6.on) { drawP6Back(); return; }
    var L = LOCS[loc.i], x0 = camX - 10, x1 = camX + vw + 10, i;
    if (L.theme === 'city') {
      parallaxSkyline(0.25, 20, 150, 150, '#9fb4cf', 3);
      parallaxSkyline(0.45, 8, 120, 160, '#8497b6', 11);
      setCam(1);
      cityBlocks(x0, x1, L.w);
      for (var lx = 140; lx < L.w - 80; lx += 300) {
        if (lx < x0 - 40 || lx > x1 + 40) continue;
        ctx.fillStyle = '#3b4250'; ctx.fillRect(lx - 3, gY - 150, 6, 150); ctx.fillRect(lx - 3, gY - 152, 28, 5);
        ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.ellipse(lx + 22, gY - 146, 12, 5, 0, 0, 6.3); ctx.fill();
      }
      if (700 > x0 - 60 && 700 < x1 + 60) drawWifiTower(700);
      if (3100 > x0 - 60 && 3100 < x1 + 60) drawWifiTower(3100);
      if (1900 > x0 - 200 && 1900 < x1 + 200) drawBourse(1900);
      drawCityGround(x0, x1, L.w);
    } else if (L.theme === 'park') {
      drawHills(0.18, 150, '#a8d8a6', 38, 16, 1.2);
      drawHills(0.34, 96, '#86c485', 30, 14, 3.1);
      drawFarTrees(farTrees, 0.34, '#5f9d68', '#6aa874');
      drawHills(0.5, 52, '#6bb36b', 22, 10, 5.0);
      drawFarTrees(midTrees, 0.58, '#3f8a52', '#4a9a5c');
      drawGround();
      setCam(1);
      ctx.fillStyle = 'rgba(214,190,140,.85)'; ctx.fillRect(x0, gY + 2, x1 - x0, 12);
      ctx.fillStyle = 'rgba(180,150,100,.5)'; ctx.fillRect(x0, gY + 12, x1 - x0, 2);
    } else if (L.theme === 'airport') {
      drawHills(0.2, 110, '#b7d6c0', 26, 10, 0.7);
      drawHills(0.4, 60, '#9cc6a6', 20, 8, 2.2);
      drawFarTrees(farTrees, 0.4, '#7fae8a', '#8bb995');
      setCam(1);
      ctx.fillStyle = '#4c525c'; ctx.fillRect(x0, gY + 18, x1 - x0, H / scale);
      ctx.fillStyle = '#8a929e'; ctx.fillRect(x0, gY - 2, x1 - x0, 20);
      ctx.fillStyle = '#b6bcc6'; ctx.fillRect(x0, gY - 2, x1 - x0, 5);
      ctx.fillStyle = '#f4f1c8';
      for (var dx = Math.floor(x0 / 120) * 120; dx < x1; dx += 120) ctx.fillRect(dx, gY + 8, 60, 4);
      ctx.fillStyle = '#e8b830';
      for (var ey = Math.floor(x0 / 60) * 60; ey < x1; ey += 60) ctx.fillRect(ey, gY + 24, 24, 3);
      if (460 > x0 - 200 && 460 < x1 + 200) { ctx.fillStyle = '#7d8798'; ctx.fillRect(250, gY - 130, 420, 130); ctx.fillStyle = '#5c6677'; ctx.fillRect(250, gY - 138, 420, 10); ctx.fillStyle = '#3d4553'; ctx.fillRect(330, gY - 96, 260, 96); ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('АНГАР 2', 460, gY - 112); }
      if (1700 > x0 - 460 && 1700 < x1 + 460) drawTerminal(1700);
      if (2750 > x0 - 80 && 2750 < x1 + 80) drawTower(2750);
      drawJets(); drawRunwayExt(x0, x1);
    } else if (L.theme === 'sky') {
      drawSkyBack(x0, x1);
    } else if (L.theme === 'wcity') {
      drawWcityBack(x0, x1);
    } else if (L.theme === 'island') {
      drawIslandBack(x0, x1);
    } else if (L.theme === 'cave') {
      drawCaveBack(x0, x1);
    } else if (L.theme === 'beach') {
      drawBeachBack();
    } else if (L.theme === 'sea') {
      drawSeaBack();
    } else if (L.theme === 'hospital') {
      drawHospitalBack(x0, x1);
    } else if (L.theme === 'moggity') {
      drawMoggityBack(x0, x1);
    } else if (L.theme === 'forest') {
      drawForestBack(x0, x1);
    } else if (L.theme === 'seclab') {
      drawSeclabBack(x0, x1);
    } else if (L.theme === 'hospin') {
      drawHospInBack(x0, x1);
    } else if (L.theme === 'moffice') {
      drawMoffBack(x0, x1);
    } else if (L.theme === 'farm') {
      drawFarmBack(x0, x1);
    } else if (L.theme === 'farmx') {
      drawFarmxBack(x0, x1);
    } else if (L.theme === 'termin') {
      drawTerminBack(x0, x1);
    } else if (L.theme === 'nlab') {
      drawNlabBack(x0, x1);
    } else if (L.theme === 'blab') {
      drawBlabBack(x0, x1);
    } else if (L.theme === 'cgcamp') {
      drawCgcBack(x0, x1);
    } else if (L.theme === 'uni') {
      drawUniBack(x0, x1);
    } else if (L.theme === 'burger') {
      drawBurgerBack(x0, x1);
    } else if (L.theme === 'church') {
      drawChurchBack(x0, x1);
    } else if (L.theme === 'heaven') {
      drawHeavenBack(x0, x1);
    } else if (L.theme === 'cemetery') {
      drawCemBack(x0, x1);
    } else if (L.theme === 'khome') {
      drawHomeBack(x0, x1);
    } else if (L.theme === 'bazaar') {
      drawBazBack(x0, x1);
    } else if (L.theme === 'court') {
      drawCrtBack(x0, x1);
    } else if (L.theme === 'jail') {
      drawJailBack(x0, x1);
    }
  }

function decStep(x0, x1, step, off, fn) {
    var a = Math.floor((x0 - off) / step) - 1, b = Math.ceil((x1 - off) / step) + 1, k;
    for (k = a; k <= b; k++) { if (k < 0) continue; fn(off + k * step, k); }
  }

function drawLocDecor(L, x0, x1) {
    var th = L.theme;
    if (th === 'city') {
      drawBurgerFront(x0, x1); drawBankFront(x0, x1);
      decStep(x0, x1, 760, 520, function (x, k) {
        if (x > L.w - 260) return;
        ctx.fillStyle = '#3b4250'; ctx.fillRect(x - 4, gY - 210, 8, 210);
        ctx.fillStyle = '#20293a'; rrect(x - 82, gY - 290, 164, 80, 8); ctx.fill();
        var hue = ['#ffd23f', '#ff6b6b', '#5ec8ff', '#7dff9a', '#ffb347'][k % 5];
        ctx.fillStyle = hue; ctx.globalAlpha = 0.22 + 0.1 * Math.sin(t * 3 + k); rrect(x - 78, gY - 286, 156, 72, 6); ctx.fill(); ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff'; ctx.font = '700 15px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(BB_TXT[k % BB_TXT.length], x, gY - 250);
        ctx.fillStyle = hue; ctx.fillRect(x - 60, gY - 232, 120, 4);
      });
      decStep(x0, x1, 1100, 1250, function (x, k) {
        if (x > L.w - 200) return;
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        for (var z = -3; z <= 3; z++) ctx.fillRect(x + z * 16 - 5, gY + 5, 10, 11);
        ctx.fillStyle = '#2f3641'; ctx.fillRect(x + 62, gY - 120, 5, 120); rrect(x + 55, gY - 150, 19, 34, 4); ctx.fill();
        var ph = Math.floor(t * 0.5 + k) % 3;
        ctx.fillStyle = ph === 0 ? '#ff4b4b' : '#4a2323'; ctx.beginPath(); ctx.arc(x + 64.5, gY - 142, 4, 0, 6.3); ctx.fill();
        ctx.fillStyle = ph === 1 ? '#ffd23f' : '#4a4223'; ctx.beginPath(); ctx.arc(x + 64.5, gY - 132, 4, 0, 6.3); ctx.fill();
        ctx.fillStyle = ph === 2 ? '#4bff7a' : '#234a2b'; ctx.beginPath(); ctx.arc(x + 64.5, gY - 122, 4, 0, 6.3); ctx.fill();
      });
      decStep(x0, x1, 410, 300, function (x, k) {
        if (x > L.w - 120 || k % 3 === 0) return;
        ctx.fillStyle = '#5a6475'; rrect(x - 9, gY - 26, 18, 26, 3); ctx.fill(); ctx.fillStyle = '#7a8599'; ctx.fillRect(x - 11, gY - 29, 22, 4);
        if (k % 2) { ctx.fillStyle = '#6b3a1d'; ctx.fillRect(x + 22, gY - 14, 18, 14); ctx.fillStyle = ['#ff7aa8', '#ffd23f', '#9b7dff'][k % 3]; ctx.beginPath(); ctx.arc(x + 31, gY - 20 + Math.sin(t * 2 + k) * 1.2, 7, 0, 6.3); ctx.fill(); }
      });
    } else if (th === 'park') {
      decStep(x0, x1, 90, 60, function (x, k) {
        var h = fpHash(k * 7 + 3);
        if (h < 0.45 || (x > 2200 && x < 2800)) return;
        var sw = Math.sin(t * 1.6 + k) * 2, col = ['#ff7aa8', '#ffd23f', '#ffffff', '#b58cff', '#ff9a52'][k % 5];
        ctx.strokeStyle = '#3f8a52'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gY + 3); ctx.lineTo(x + sw, gY - 14 - h * 10); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + sw, gY - 16 - h * 10, 4.5, 0, 6.3); ctx.fill();
        ctx.fillStyle = '#ffe680'; ctx.beginPath(); ctx.arc(x + sw, gY - 16 - h * 10, 1.8, 0, 6.3); ctx.fill();
      });
      if (2500 > x0 - 280 && 2500 < x1 + 280) {
        for (var d = 0; d < 3; d++) {
          var dx = 2500 + Math.sin(t * 0.3 + d * 2.1) * (150 - d * 25), dr = Math.cos(t * 0.3 + d * 2.1) > 0 ? 1 : -1;
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(dx, gY + 2, 13, 7, 0, 0, 6.3); ctx.fill();
          ctx.beginPath(); ctx.arc(dx + dr * 11, gY - 6, 6, 0, 6.3); ctx.fill();
          ctx.fillStyle = '#ffa63a'; ctx.beginPath(); ctx.moveTo(dx + dr * 16, gY - 6); ctx.lineTo(dx + dr * 24, gY - 4); ctx.lineTo(dx + dr * 16, gY - 2); ctx.fill();
        }
      }
      decStep(x0, x1, 1300, 700, function (x, k) {
        var by = gY - 190 - Math.sin(t * 0.8 + k) * 18, bx = x + Math.sin(t * 0.5 + k * 2) * 120;
        var fl = Math.sin(t * 14 + k) * 4;
        ctx.fillStyle = k % 2 ? '#ff9a52' : '#7dd0ff';
        ctx.beginPath(); ctx.ellipse(bx - 3, by, 5, 3 + fl * 0.4, 0.4, 0, 6.3); ctx.ellipse(bx + 3, by, 5, 3 + fl * 0.4, -0.4, 0, 6.3); ctx.fill();
      });
    } else if (th === 'airport') {
      var wx = 1250;
      if (wx > x0 - 100 && wx < x1 + 100) {
        ctx.fillStyle = '#9aa3b2'; ctx.fillRect(wx - 3, gY - 120, 6, 120);
        var sw2 = Math.sin(t * 1.4) * 0.25;
        for (var sg = 0; sg < 4; sg++) { ctx.fillStyle = sg % 2 ? '#fff' : '#ff6a3a'; ctx.beginPath(); ctx.moveTo(wx + sg * 14 + 3, gY - 120 + sg * 2 + sw2 * sg * 6); ctx.lineTo(wx + sg * 14 + 17, gY - 120 + (sg + 1) * 2 + sw2 * (sg + 1) * 6); ctx.lineTo(wx + sg * 14 + 17, gY - 100 + (sg + 1) * 3 + sw2 * (sg + 1) * 6); ctx.lineTo(wx + sg * 14 + 3, gY - 100 + sg * 3 + sw2 * sg * 6); ctx.fill(); }
      }
      decStep(x0, x1, 240, 100, function (x, k) {
        ctx.fillStyle = Math.floor(t * 2 + k * 0.5) % 2 ? '#ffe680' : '#7a6a2a'; ctx.beginPath(); ctx.arc(x, gY + 21, 3, 0, 6.3); ctx.fill();
      });
      decStep(x0, x1, 900, 400, function (x, k) {
        if (x > L.w - 200) return;
        ctx.fillStyle = '#ff7a2e'; ctx.beginPath(); ctx.moveTo(x - 9, gY); ctx.lineTo(x, gY - 28); ctx.lineTo(x + 9, gY); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 5, gY - 14, 10, 4);
        ctx.fillStyle = '#5a6475'; ctx.fillRect(x + 40, gY - 20, 44, 12); ctx.fillStyle = '#c2a56b'; ctx.fillRect(x + 46, gY - 32, 14, 12); ctx.fillRect(x + 64, gY - 30, 14, 10);
        ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x + 50, gY - 6, 5, 0, 6.3); ctx.arc(x + 76, gY - 6, 5, 0, 6.3); ctx.fill();
      });
    }
  }

function drawLocFront() {
    if ((p5.on && !p5.farm && !p5.uni) || p6.on) return;
    var L = LOCS[loc.i], x0 = camX - 140, x1 = camX + vw + 140;
    if (L.theme === 'park') {
      // пруд, фонтан, скамейки, фонари, арка у входа
      if (2500 > x0 - 260 && 2500 < x1 + 260) {
        ctx.fillStyle = '#5eb6e0'; ctx.beginPath(); ctx.ellipse(2500, gY + 4, 250, 16, 0, 0, 6.3); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2;
        for (var rp = 0; rp < 3; rp++) { var rw = (t * 24 + rp * 70) % 210; ctx.globalAlpha = 1 - rw / 210; ctx.beginPath(); ctx.ellipse(2440 + rp * 60, gY + 4, rw * 0.5, rw * 0.06, 0, 0, 6.3); ctx.stroke(); }
        ctx.globalAlpha = 1;
      }
      if (1200 > x0 - 100 && 1200 < x1 + 100) {
        ctx.fillStyle = '#b9c2d0'; ctx.fillRect(1160, gY - 22, 80, 22); ctx.fillRect(1190, gY - 66, 20, 46);
        ctx.fillStyle = '#7fd0f2'; ctx.beginPath(); ctx.ellipse(1200, gY - 70, 18 + Math.sin(t * 6) * 3, 8, 0, 0, 6.3); ctx.fill();
        ctx.strokeStyle = 'rgba(127,208,242,.85)'; ctx.lineWidth = 3;
        for (var ws = -1; ws <= 1; ws += 2) { ctx.beginPath(); ctx.moveTo(1200, gY - 72); ctx.quadraticCurveTo(1200 + ws * 40, gY - 110 + Math.sin(t * 5) * 4, 1200 + ws * 62, gY - 24); ctx.stroke(); }
      }
      var bx = [800, 1700, 3100, 3900];
      for (var bi = 0; bi < bx.length; bi++) {
        if (bx[bi] < x0 - 60 || bx[bi] > x1 + 60) continue;
        ctx.fillStyle = '#7a4a22'; ctx.fillRect(bx[bi] - 32, gY - 30, 64, 8); ctx.fillRect(bx[bi] - 32, gY - 52, 64, 6);
        ctx.fillStyle = '#4a3016'; ctx.fillRect(bx[bi] - 28, gY - 22, 6, 22); ctx.fillRect(bx[bi] + 22, gY - 22, 6, 22);
      }
      for (var lp = 400; lp < L.w - 200; lp += 520) {
        if (lp < x0 - 40 || lp > x1 + 40) continue;
        ctx.fillStyle = '#2f3641'; ctx.fillRect(lp - 3, gY - 130, 6, 130);
        ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(lp, gY - 136, 9, 0, 6.3); ctx.fill();
      }
      if (330 > x0 - 150 && 330 < x1 + 150) {
        ctx.fillStyle = '#5b3d26'; ctx.fillRect(250, gY - 170, 14, 170); ctx.fillRect(396, gY - 170, 14, 170);
        ctx.fillStyle = '#2f8a52'; rrect(244, gY - 196, 172, 34, 12); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = '700 18px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ПАРК', 330, gY - 179);
      }
    }
    drawLocDecor(L, x0, x1);
    if (L.theme === 'park') drawIceFront(x0, x1);
    if (L.theme === 'forest') drawChurchFront(x0, x1);
    drawNxFront(L, x0, x1);
    if (L.theme === 'beach') drawBeachFront();
    if (L.theme === 'wcity') drawWcityFront(x0, x1);
    if (L.theme === 'island') drawIslandFront(x0, x1);
    if (L.theme === 'cave') drawCaveFront(x0, x1);
    if (L.theme === 'hospital') drawHospitalFront(x0, x1);
    if (L.theme === 'moggity') drawMoggityFront(x0, x1);
    if (L.theme === 'forest') drawForestFront(x0, x1);
    if (L.theme === 'airport' || L.theme === 'beach') drawAvAirport(x0, x1);
    if (loc.i === 4 && BOAT_X + 120 > camX && BOAT_X - 120 < camX + vw) drawBoatAt(BOAT_X, -1, 34, !!save.fs.boat);
    if (loc.i === 4 && SUB_X + 130 > camX && SUB_X - 130 < camX + vw) drawSubMoored(SUB_X, !!save.fs.sub);
    var lst = LOC_STOPS[loc.i];
    if (lst && lst.x + 90 > camX && lst.x - 90 < camX + vw) drawStop(lst);
    drawGates();
  }

function fusePath() {
    ctx.beginPath();
    ctx.moveTo(-124, -60);
    ctx.bezierCurveTo(-100, -71, -60, -73, -20, -73);
    ctx.lineTo(58, -73);
    ctx.bezierCurveTo(94, -73, 119, -59, 125, -50);
    ctx.bezierCurveTo(127, -43, 117, -36, 96, -34);
    ctx.lineTo(-30, -34);
    ctx.bezierCurveTo(-70, -34, -106, -44, -124, -53);
    ctx.closePath();
  }

function drawAirliner(x, y, dir, s, col, pitch, alt) {
    alt = alt || 0; pitch = pitch || 0;
    var sh = Math.max(0.2, 1 - alt / 420);
    ctx.fillStyle = 'rgba(0,0,0,' + (0.24 * sh).toFixed(3) + ')';
    ctx.beginPath(); ctx.ellipse(x, gY + 2, 120 * s * (0.55 + 0.45 * sh), 6 * s, 0, 0, 6.3); ctx.fill();
    if (alt > 40) { // инверсионный след
      var cg = ctx.createLinearGradient(x - dir * 40 * s, 0, x - dir * 520 * s, 0); cg.addColorStop(0, 'rgba(255,255,255,.55)'); cg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = cg; var cx0 = Math.min(x - dir * 40 * s, x - dir * 520 * s); ctx.fillRect(cx0, y - 30 * s, 480 * s, 3.2 * s); ctx.fillRect(cx0, y - 20 * s, 480 * s, 3.2 * s);
    }
    ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s); if (pitch) ctx.rotate(pitch);
    var i, g;
    // шасси
    var gk = drGear >= 0 ? drGear : (alt < 45 ? 1 : 0);
    if (gk > 0.03) {
      ctx.save(); ctx.translate(0, -36); ctx.scale(1, gk); ctx.translate(0, 36);
      ctx.strokeStyle = '#363d49'; ctx.lineWidth = 3.4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-8, -36); ctx.lineTo(-8, -9); ctx.moveTo(86, -36); ctx.lineTo(86, -8); ctx.moveTo(-14, -6); ctx.lineTo(-2, -6); ctx.stroke();
      var wh = [[-14, -6], [-2, -6], [86, -6]];
      for (i = 0; i < 3; i++) {
        ctx.fillStyle = '#14171c'; ctx.beginPath(); ctx.arc(wh[i][0], wh[i][1], 6, 0, 6.3); ctx.fill();
        ctx.fillStyle = '#9aa4b4'; ctx.beginPath(); ctx.arc(wh[i][0], wh[i][1], 2.3, 0, 6.3); ctx.fill();
      }
      ctx.restore();
    }
    // киль
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.moveTo(-64, -70); ctx.lineTo(-108, -134); ctx.lineTo(-90, -134); ctx.lineTo(-44, -70); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.24)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-93, -132); ctx.lineTo(-62, -72); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.93)'; ctx.beginPath(); ctx.arc(-82, -110, 6.5, 0, 6.3); ctx.fill();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(-82, -110, 3.2, 0, 6.3); ctx.fill();
    // фюзеляж
    g = ctx.createLinearGradient(0, -73, 0, -34);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#eaeff6'); g.addColorStop(1, '#a9b4c4');
    fusePath(); ctx.fillStyle = g; ctx.fill();
    ctx.save(); fusePath(); ctx.clip();
    ctx.fillStyle = col; // окраска хвоста
    ctx.beginPath(); ctx.moveTo(-132, -84); ctx.lineTo(-60, -84); ctx.quadraticCurveTo(-80, -56, -66, -28); ctx.lineTo(-132, -28); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 0.92; ctx.fillStyle = col; ctx.fillRect(-64, -53, 180, 3.4); ctx.globalAlpha = 1; // линия борта
    ctx.fillStyle = 'rgba(60,72,90,.2)'; ctx.fillRect(-132, -43, 270, 10);
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-58, -71, 150, 2.4);
    ctx.restore();
    ctx.strokeStyle = 'rgba(58,70,90,.6)'; ctx.lineWidth = 1.2; fusePath(); ctx.stroke();
    // окна, двери, кабина
    ctx.fillStyle = '#233149';
    for (i = 0; i < 16; i++) { ctx.beginPath(); ctx.ellipse(-52 + i * 7.6, -62.4, 1.9, 2.6, 0, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(58,70,90,.5)'; ctx.lineWidth = 1;
    ctx.strokeRect(79, -67, 6, 15); ctx.strokeRect(-72, -67, 6, 15);
    ctx.fillStyle = '#1b283d';
    ctx.beginPath(); ctx.moveTo(97, -65); ctx.lineTo(112, -61); ctx.lineTo(115, -56); ctx.lineTo(98, -57.5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(160,200,235,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(100, -63.5); ctx.lineTo(110, -60.5); ctx.stroke();
    // стабилизатор
    ctx.fillStyle = '#d3dae5';
    ctx.beginPath(); ctx.moveTo(-76, -61); ctx.lineTo(-126, -67); ctx.lineTo(-130, -62.5); ctx.lineTo(-92, -55); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8f9bad'; ctx.lineWidth = 1; ctx.stroke();
    // крыло и винглет
    ctx.fillStyle = '#cfd6e1';
    ctx.beginPath(); ctx.moveTo(36, -49); ctx.lineTo(-22, -20); ctx.lineTo(-42, -20); ctx.lineTo(-6, -47); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8f9bad'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.moveTo(-3, -46); ctx.lineTo(-32, -22); ctx.stroke();
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.moveTo(-22, -20); ctx.lineTo(-33, -35); ctx.lineTo(-40, -34); ctx.lineTo(-42, -20); ctx.closePath(); ctx.fill();
    // двигатель
    ctx.fillStyle = '#b3bcc9'; ctx.fillRect(12, -37, 9, 7);
    g = ctx.createLinearGradient(0, -36, 0, -15); g.addColorStop(0, '#f4f6fb'); g.addColorStop(1, '#98a3b4');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(16, -26, 23, 9.6, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#6c7787'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = '#4a5260'; ctx.beginPath(); ctx.ellipse(-6, -26, 2.8, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#171d27'; ctx.beginPath(); ctx.ellipse(36, -26, 4.6, 8.2, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#dbe2ec'; ctx.lineWidth = 1.7; ctx.stroke();
    ctx.strokeStyle = '#7b8699'; ctx.lineWidth = 1;
    for (i = 0; i < 3; i++) { var a = t * 16 + i * 2.1; ctx.beginPath(); ctx.moveTo(36, -26); ctx.lineTo(36 + Math.cos(a) * 3.2, -26 + Math.sin(a) * 7.4); ctx.stroke(); }
    // огни
    if (Math.sin(t * 6 + x) > 0.15) { ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.arc(-2, -74, 2.5, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#2fe36f'; ctx.beginPath(); ctx.arc(-41, -21, 1.8, 0, 6.3); ctx.fill();
    // v2.2: блик по борту, тёплые окна ночью, тепло двигателя, посадочная фара
    var nt = (typeof dnDark === 'function') ? dnDark(dnU()) : 0;
    ctx.save(); fusePath(); ctx.clip();
    var hl = ctx.createLinearGradient(-130, 0, 140, 0); hl.addColorStop(0, 'rgba(255,255,255,0)'); hl.addColorStop(0.5 + 0.3 * Math.sin(t * 0.7 + x * 0.002), 'rgba(255,255,255,.28)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl; ctx.fillRect(-132, -75, 270, 22); ctx.restore();
    if (nt > 0.2) { ctx.fillStyle = 'rgba(255,224,150,' + (0.9 * nt).toFixed(2) + ')'; for (i = 0; i < 16; i++) { ctx.beginPath(); ctx.ellipse(-52 + i * 7.6, -62.4, 1.9, 2.6, 0, 0, 6.3); ctx.fill(); } }
    if (!gxNoTr) {var hg = ctx.createRadialGradient(-30, -26, 2, -30, -26, 26); hg.addColorStop(0, 'rgba(255,170,90,' + (alt > 14 || Math.abs(pitch) > 0.02 ? 0.35 : 0.1) + ')'); hg.addColorStop(1, 'rgba(255,170,90,0)'); ctx.fillStyle = hg; ctx.fillRect(-60, -52, 60, 52);}
    if (alt > 0 && alt < 330 && nt > 0.15) { var lb = ctx.createLinearGradient(100, -48, 300, 20); lb.addColorStop(0, 'rgba(255,250,210,' + (0.4 * nt).toFixed(2) + ')'); lb.addColorStop(1, 'rgba(255,250,210,0)'); ctx.fillStyle = lb; ctx.beginPath(); ctx.moveTo(104, -50); ctx.lineTo(320, -10); ctx.lineTo(320, 26); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }

function mkJet(home, col, s, wait) { return { x: home, home: home, alt: 0, dir: 1, v: 0, st: 'park', t: wait, pitch: 0, col: col, s: s, touch: 0 }; }

function jetReset() {
    jetA.x = jetA.home; jetA.alt = 0; jetA.v = 0; jetA.pitch = 0; jetA.st = 'park'; jetA.t = 8 + Math.random() * 10;
    jetM.x = jetM.home; jetM.alt = 0; jetM.v = 0; jetM.pitch = 0; jetM.st = 'park'; jetM.t = 0;
  }

function jetArrive(j) {
    j.st = 'arrive'; j.dir = 1; j.v = 300; j.alt = 300; j.touch = j.home - 380;
    j.x = j.touch - j.alt / 0.16; j.pitch = 0;
  }

function updateJet(j, dt, ambient) {
    var k;
    if (j.st === 'park') {
      j.pitch = 0;
      if (ambient) { j.t -= dt; if (j.t <= 0) { j.st = 'takeoff'; j.v = 0; sfxFar(j); } }
    } else if (j.st === 'takeoff') {
      j.v = Math.min(340, j.v + 120 * dt); j.x += j.v * dt;
      if (j.v >= 285) { j.st = 'climb'; }
    } else if (j.st === 'climb') {
      j.v = Math.min(400, j.v + 40 * dt); j.x += j.v * dt;
      j.alt += j.v * 0.34 * dt;
      j.pitch += (-0.27 - j.pitch) * Math.min(1, dt * 2.2);
      if (j.alt > 900 || j.x > WORLD_W + 900) { j.st = 'away'; j.t = ambient ? 9 + Math.random() * 8 : 11; j.alt = 0; }
    } else if (j.st === 'away') {
      j.t -= dt; if (j.t <= 0) jetArrive(j);
    } else if (j.st === 'arrive') {
      j.x += j.v * dt;
      j.alt = Math.max(0, (j.touch - j.x) * 0.16);
      j.pitch += ((j.alt > 14 ? 0.05 : -0.1) - j.pitch) * Math.min(1, dt * 3);
      if (j.alt <= 0) { j.st = 'brake'; j.alt = 0; }
    } else if (j.st === 'brake') {
      j.v = Math.max(30, j.v - 132 * dt); j.x += j.v * dt; j.pitch += (0 - j.pitch) * Math.min(1, dt * 4);
      if (j.x >= j.home) { j.x = j.home; j.v = 0; j.st = 'park'; j.t = 14 + Math.random() * 14; j.pitch = 0; }
    }
  }

function sfxFar() {}

function updateJets(dt) {
    if (loc.i !== 3) return;
    updateJet(jetA, dt, true);
    updateJet(jetM, dt, false);
  }

function drawJet(j) {
    var x = j.x;
    if (x < camX - 320 || x > camX + vw + 320) return;
    drawAirliner(x, gY - 2 - j.alt, j.dir, j.s, j.col, j.pitch, j.alt);
  }

function drawRunwayExt(x0, x1) {
    if (x1 < 3700) return;
    decStep(x0, x1, 150, 3700, function (x, k) {
      if (x > 7200) return;
      ctx.fillStyle = (Math.floor(t * 2 + k) % 6 === 0) ? '#fff6b0' : '#e9b83a'; ctx.fillRect(x, gY + 2, 6, 4);
      ctx.fillStyle = 'rgba(255,230,120,.12)'; ctx.beginPath(); ctx.arc(x + 3, gY + 4, 14, 0, 6.3); ctx.fill();
    });
    [[3900, '09'], [7000, '27']].forEach(function (m) {
      if (m[0] < x0 - 200 || m[0] > x1 + 200) return;
      ctx.fillStyle = 'rgba(244,241,200,.9)'; ctx.font = '700 40px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(m[1], m[0], gY + 36);
      for (var q = -3; q <= 3; q++) ctx.fillRect(m[0] + q * 22 - 5, gY + 56, 10, 26);
    });
  }

function drawJets() {
    drawJet(jetA); drawJet(jetM);
    // стойка с табло у красного самолёта
    if (jetM.st === 'park' && jetM.x > camX - 200 && jetM.x < camX + vw + 200) {
      var sx = jetM.home - 170;
      ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 3, gY - 96, 6, 96);
      ctx.fillStyle = '#d6303b'; rrect(sx - 62, gY - 128, 124, 36, 7); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('✈ МАЛЬДИВЫ', sx, gY - 117); ctx.fillText('10 000 · 1 мифич. · 15 легенд.', sx, gY - 102);
    }
  }

function mythN() { return (save.inv.d[5] | 0) + (save.inv.c[5] | 0); }

function legN() { return (save.inv.d[4] | 0) + (save.inv.c[4] | 0); }

function canPayTrip() { return (save.tickets | 0) > 0 || mythN() >= TRIP_COST || legN() >= TRIP_LEG; }

function payTrip() { if ((save.tickets | 0) > 0) { save.tickets--; persist(); hud(); } else if (mythN() >= TRIP_COST) payMyth(TRIP_COST); else payLeg(TRIP_LEG); }

function payLeg(n) {
    for (var k = 0; k < n; k++) { if (save.inv.d[4] > 0) save.inv.d[4]--; else if (save.inv.c[4] > 0) save.inv.c[4]--; else break; save.carried = Math.max(0, save.carried - 1); }
    persist(); hud();
  }

function payMyth(n) {
    for (var k = 0; k < n; k++) { if (save.inv.d[5] > 0) save.inv.d[5]--; else if (save.inv.c[5] > 0) save.inv.c[5]--; else break; save.carried = Math.max(0, save.carried - 1); }
    persist(); hud();
  }

function tripMode() {
    if (trip.inn) return (trip.st === 'wait' && !(socket && trip.by === socket.id)) ? 'unboard' : '';
    if (paused || ob.on || av.on || bus.on || ride.id || boss.on || lt.st) return '';
    if (nearTripPlane()) return trip.st === 'wait' ? 'board' : 'trip';
    if (nearHomePlane()) return 'home';
    return '';
  }

function tripOnline() { return !!(socket && net.room && net.state === 'online'); }

function nearTripPlane() { return loc.i === 3 && jetM.st === 'park' && trip.st !== 'dep' && Math.abs(P.x - jetM.x) < 190 && P.z < 70; }

function nearHomePlane() { return loc.i === 4 && Math.abs(P.x - HOME_X) < 190 && P.z < 70; }

function tripWhy() {
    if (boss.on) return 'Пока идёт бой, самолёт не вылетает.';
    return '';
  }

function closeTripMenu() { tripMenuOpen = false; elTrip.hidden = true; syncPause(); }

function openTripMenu() {
    var why = tripWhy();
    if (why) { sfx('no'); toast(why, 2500); return; }
    var have = mythN(), ok = canPayTrip();
    elTripCost.textContent = (save.tickets | 0) > 0 ? 'У тебя есть билет на Мальдивы (' + save.tickets + '). Он будет использован.' : 'Билет: ' + TRIP_COST + ' мифическая чекушка (у тебя ' + have + ') или ' + TRIP_LEG + ' легендарных (у тебя ' + legN() + '). Или купи билет за ' + TICKET_PRICE.toLocaleString('ru-RU') + ' коинов.';
    elTripNote.textContent = tripOnline()
      ? 'Все игроки лобби получат уведомление. Они смогут сесть на борт бесплатно: если все успеют, самолёт вылетит сразу, иначе через ' + TRIP_WAIT + ' секунд. На Мальдивах чекушки от эпических до трофея Хоумлендера.'
      : 'На Мальдивах чекушки от эпических и выше, а с шансом ещё и Супер-Спирт Хоумлендера. Домой можно вернуться бесплатно.';
    var hasT = (save.tickets | 0) > 0, canBuy = save.coins >= TICKET_PRICE;
    elTripBuy.hidden = true;
    elTripBuy.className = 'flbuy' + (canBuy ? '' : ' no'); elTripBuy.setAttribute('aria-disabled', canBuy ? 'false' : 'true');
    elTripBuy.textContent = 'Купить билет в кассе за ' + TICKET_PRICE.toLocaleString('ru-RU') + ' коинов';
    elTripGo.className = 'go' + (ok ? '' : ' no'); elTripGo.setAttribute('aria-disabled', ok ? 'false' : 'true');
    elTripGo.textContent = ok ? 'Лететь' : 'Нужен билет из кассы терминала, 1 мифическая или 15 легендарных';
    tripMenuOpen = true; elTrip.hidden = false; syncPause();
  }

function tripBuy() {
    if (!canPayTrip()) { sfx('no'); return; }
    if (!nearTripPlane()) { closeTripMenu(); return; }
    closeTripMenu();
    if (tripOnline()) { socket.emit('flight', { start: 1 }); toast('Оформляем рейс…', 1800); return; }
    payTrip(); sfx('rare');
    tripGo();
  }

function tripAct() {
    if (trip.st === 'wait') { tripBoard(); return; }
    if (trip.st === 'dep') return;
    openTripMenu();
  }

function tripBoard() {
    if (!nearTripPlane() || trip.inn) return;
    trip.inn = true; P.vx = 0; input.left = input.right = false; sfx('jump');
    if (socket) socket.emit('flight', { board: 1 });
    toast('Ты на борту. Ждём остальных.', 2200);
  }

function tripUnboard() {
    if (!trip.inn || trip.st !== 'wait') return;
    if (socket && trip.by === socket.id) { sfx('no'); toast('Ты оплатил рейс: подожди остальных или вылет.', 2500); return; }
    trip.inn = false; sfx('jump');
    if (socket) socket.emit('flight', { unboard: 1 });
  }

function tripGo() { // я на борту, самолёт вылетает
    trip.st = 'dep'; trip.depT = 0; trip.inn = true; P.vx = 0; input.left = input.right = false;
    jetM.st = 'takeoff'; jetM.v = 0; sfx('jump');
    toast('Взлетаем! Пристегнись.', 2600);
  }

function tripHome() {
    if (lt.st) return;
    toast('Летим домой.', 2000);
    startFlight(3, AV_PARK - 170);
  }

function flightMsg(m) {
    if (!m || typeof m !== 'object') return;
    var mine = socket ? socket.id : '';
    if (m.no) { sfx('no'); toast(m.no === 'busy' ? 'Рейс уже оформлен другим игроком.' : 'Самолёт ещё готовится. Подожди ' + (m.left | 0) + ' с.', 3000); return; }
    if (m.go) {
      if (trip.inn && m.ids && m.ids.indexOf(mine) >= 0) { tripGo(); return; }
      trip.st = ''; trip.inn = false;
      if (loc.i === 3) { jetM.st = 'takeoff'; jetM.v = 0; }
      toast('Самолёт улетел на Мальдивы' + (loc.i === 3 ? ' без тебя.' : '.'), 3500);
      return;
    }
    if (m.st === 'idle') { trip.st = ''; trip.inn = false; return; }
    if (m.st === 'wait') {
      var first = trip.st !== 'wait';
      trip.st = 'wait'; trip.by = m.by; trip.n = m.n; trip.end = performance.now() + (m.left | 0) * 1000; trip.b = m.b | 0; trip.t = m.t | 0;
      if (first) {
        if (m.by === mine) {
          if (!canPayTrip()) { socket.emit('flight', { cancel: 1 }); return; }
          payTrip(); trip.inn = true; P.vx = 0; sfx('rare');
          toast('Билет оплачен. Остальные игроки получили уведомление: вылет через ' + (m.left | 0) + ' с.', 4000);
        } else {
          sfx('rare');
          toast(mat(m.n || 'Игрок') + ' оплатил(а) поездку на Мальдивы. Вылет через ' + (m.left | 0) + ' с.', 6000);
        }
      }
    }
  }

function tripReset() { if (trip.st === 'dep') trip.st = ''; trip.inn = false; }

function tripNetLost() { if (trip.st === 'wait') trip.st = ''; trip.inn = false; elTripBanner.hidden = true; }

function tripOnEnter(i) {
    tripReset();
    if (i === 3) jetReset();
    if (i === 4) toast('Мальдивы! Чекушки тут эпические и выше, а где-то лежит трофей Хоумлендера. Самолёт домой стоит слева, а справа причал: рыбалка и лодка.', 6000);
  }

function tripUi() {
    if (trip.st !== 'wait') { if (!elTripBanner.hidden) { elTripBanner.hidden = true; lastTripUi = ''; } return; }
    var left = Math.max(0, Math.ceil((trip.end - performance.now()) / 1000));
    var key = left + '|' + trip.b + '|' + trip.t + '|' + trip.inn + '|' + (loc.i === 3) + '|' + trip.n;
    if (key === lastTripUi) return;
    lastTripUi = key;
    elTripBanner.hidden = false; elTripBanner.className = 'flbanner' + (trip.inn ? ' in' : '');
    elTripBanner.textContent = '';
    var b = document.createElement('b'); b.textContent = '✈ Мальдивы: вылет через ' + left + ' с'; elTripBanner.appendChild(b);
    var s1 = document.createElement('span'); s1.className = 'fs'; s1.textContent = mat(trip.n || 'Игрок') + ' оплатил(а) поездку. На борту ' + trip.b + ' из ' + trip.t + '.'; elTripBanner.appendChild(s1);
    var s2 = document.createElement('span'); s2.className = 'fs';
    s2.textContent = trip.inn ? (touch ? 'Ты на борту. Кнопка «Выйти»: выйти из самолёта.' : 'Ты на борту. Кнопка действия: выйти из самолёта.') : (loc.i === 3 ? 'Подойди к красному самолёту и сядь: бесплатно.' : 'Беги в аэропорт: Город Чекушек, а за ним Аэропорт.');
    elTripBanner.appendChild(s2);
  }

function updateTrip(dt) {
    updateJets(dt);
    if (trip.st === 'dep') {
      trip.depT += dt;
      if (trip.depT > 3.7 && !lt.st && !flt.on && loc.i === 3) startFlight(4, MALD_ARRIVE_X);
    }
    tripUi();
  }

function rollMald() {
    var u = Math.random();
    if (u < 0.0025) return { r: 5, secret: 1 };
    if (u < 0.0025 + 0.03) return { r: 5, sup: 1 };
    if (u < 0.0025 + 0.03 + 0.0105) return { r: 5 };
    if (u < 0.2) return { r: 4 };
    return { r: 3 };
  }

function palm(x, h, lean, seed) {
    var tx = x + lean, ty = gY - h, i;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#8a5a2b'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(x, gY + 3); ctx.quadraticCurveTo(x + lean * 0.15, gY - h * 0.55, tx, ty); ctx.stroke();
    ctx.strokeStyle = 'rgba(58,34,12,.4)'; ctx.lineWidth = 1.6;
    for (i = 1; i < 8; i++) { var f = i / 8, qx = x + lean * f * f * 1.0, qy = gY - h * f; ctx.beginPath(); ctx.moveTo(qx - 5, qy); ctx.lineTo(qx + 5, qy + 2); ctx.stroke(); }
    for (i = 0; i < 9; i++) {
      var a = -Math.PI * (0.04 + i * 0.115), sw = Math.sin(t * 1.4 + seed + i) * 3.5, len = 88 + (i % 2) * 14;
      var ex = tx + Math.cos(a) * len, ey = ty + Math.sin(a) * len * 0.55 + 30 + sw;
      var cx = tx + Math.cos(a) * len * 0.5, cy = ty + Math.sin(a) * len * 0.9 - 8;
      ctx.strokeStyle = '#237a47'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(cx, cy, ex, ey); ctx.stroke();
      ctx.strokeStyle = '#4cc27c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(cx, cy - 2, ex, ey); ctx.stroke();
    }
    ctx.fillStyle = '#6b4220';
    ctx.beginPath(); ctx.arc(tx - 6, ty + 8, 5, 0, 6.3); ctx.arc(tx + 5, ty + 10, 5, 0, 6.3); ctx.arc(tx, ty + 4, 5, 0, 6.3); ctx.fill();
  }

function bungalow(x) {
    var by = gY - 20, k;
    ctx.fillStyle = '#6b4a2b';
    for (k = 0; k < 5; k++) ctx.fillRect(x - 56 + k * 28, by, 5, 32);
    ctx.fillStyle = '#b98a55'; ctx.fillRect(x - 66, by - 7, 132, 9);
    ctx.fillStyle = '#f5e9cc'; ctx.fillRect(x - 44, by - 54, 88, 48);
    ctx.fillStyle = '#4aa3bd'; ctx.fillRect(x - 32, by - 42, 22, 24); ctx.fillRect(x + 12, by - 42, 22, 24);
    ctx.fillStyle = '#c99a48';
    ctx.beginPath(); ctx.moveTo(x - 62, by - 50); ctx.lineTo(x, by - 96); ctx.lineTo(x + 62, by - 50); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8b6420'; ctx.lineWidth = 1.4;
    for (k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x + k * 9, by - 94 + Math.abs(k) * 4); ctx.lineTo(x + k * 17, by - 51); ctx.stroke(); }
  }

function umbrella(x, col) {
    ctx.fillStyle = '#e9e4d8'; ctx.fillRect(x - 2, gY - 66, 4, 66);
    for (var k = 0; k < 4; k++) {
      ctx.fillStyle = (k % 2) ? '#fff' : col;
      ctx.beginPath(); ctx.moveTo(x, gY - 70); ctx.lineTo(x - 46 + k * 23, gY - 52); ctx.lineTo(x - 23 + k * 23, gY - 52); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#f2f6fa'; ctx.fillRect(x + 14, gY - 12, 54, 7); ctx.fillStyle = col; ctx.fillRect(x + 14, gY - 18, 40, 6);
  }

function drawBeachBack() {
    var x0 = camX - 10, x1 = camX + vw + 10, i, wv;
    drawHills(0.15, 98, '#8fe0cf', 12, 8, 0.6);
    setCam(1);
    var sg = ctx.createLinearGradient(0, gY - 96, 0, gY + 4);
    sg.addColorStop(0, '#9be8ee'); sg.addColorStop(0.5, '#3fc3d8'); sg.addColorStop(1, '#14a0c4');
    ctx.fillStyle = sg; ctx.fillRect(x0, gY - 96, x1 - x0, 102);
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2;
    for (i = Math.floor(x0 / 90) - 1; i * 90 < x1; i++) {
      for (wv = 0; wv < 3; wv++) {
        var wx = i * 90 + wv * 31 + Math.sin(t * 0.8 + i + wv) * 10, wy = gY - 72 + wv * 22;
        ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 12, wy - 4, wx + 26, wy); ctx.stroke();
      }
    }
    var bgx = [620, 1480, 1900, 2210];
    drawWestBack(x0, x1);
    for (i = 0; i < bgx.length; i++) { var bx = bgx[i]; if (bx > x0 - 80 && bx < x1 + 80) bungalow(bx); }
    ctx.fillStyle = '#f3e3b0'; ctx.fillRect(x0, gY - 4, x1 - x0, H / scale);
    ctx.fillStyle = '#e4cf94'; ctx.fillRect(x0, gY + 14, x1 - x0, H / scale);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    for (i = Math.floor(x0 / 24) - 1; i * 24 < x1; i++) { ctx.beginPath(); ctx.ellipse(i * 24 + 12, gY - 4 + Math.sin(t * 1.6 + i * 0.7) * 1.5, 13, 3, 0, 0, 6.3); ctx.fill(); }
    var px = [140, 250, 420, 800, 980, 1130, 1360, 1590, 1840, 2100, 2270, 2360], ph = [210, 180, 200, 215, 230, 190, 195, 225, 220, 185, 205, 215];
    for (i = 0; i < px.length; i++) if (px[i] > x0 - 120 && px[i] < x1 + 120) palm(px[i], ph[i], (i % 2 ? 1 : -1) * (26 + i * 3), i * 1.7);
    drawPier(x0, x1);
    drawPierProps(x0, x1);
    if (SHOP_FX > x0 - 120 && SHOP_FX < x1 + 120) drawFishShopHut(SHOP_FX);
    if (3860 > x0 - 100 && 3860 < x1 + 100) drawPierSign();
    if (HOME_X > x0 - 200 && HOME_X < x1 + 200) {
      drawAirliner(HOME_X, gY - 2, 1, 1, '#e5484d', 0, 0);
      var sx = HOME_X + 160;
      ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 3, gY - 96, 6, 96);
      ctx.fillStyle = '#1f4aa8'; rrect(sx - 58, gY - 126, 116, 34, 7); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('✈ РЕЙС ДОМОЙ', sx, gY - 116); ctx.fillText('бесплатно', sx, gY - 101);
    }
  }

function drawBeachFront() {
    drawWestFront(camX - 140, camX + vw + 140);
    var x0 = camX - 140, x1 = camX + vw + 140, ux = [560, 1240, 1900, 2150, 700, 1650], uc = ['#e5484d', '#2a6fdb', '#ffb020', '#2fbf6b', '#e5484d', '#9b59d6'];
    for (var i = 0; i < ux.length; i++) if (ux[i] > x0 - 80 && ux[i] < x1 + 80) umbrella(ux[i], uc[i]);
  }

function qAch(id) { return !!(typeof achOwn !== 'undefined' && achOwn[id]); }

function qCnt(v, n) { return Math.min(v || 0, n) + '/' + n; }

function qNum(get, n, t, rw) { return { t: t, done: function () { return (get() || 0) >= n; }, prog: function () { return qCnt(get(), n); }, rw: rw }; }

function qFlag(get, t, rw) { return { t: t, done: function () { return !!get(); }, prog: function () { return get() ? '1/1' : '0/1'; }, rw: rw }; }

function qSnap() { return { s: save.qSold || 0, c: save.qClean || 0, r: save.qRare || 0, f: fishCaughtAll() }; }

function qExtra(n) {
    if (!save.mx.qb) { save.mx.qb = qSnap(); persist(); }
    var tier = Math.min(12, Math.floor(n / 4)), k = n % 4, b = save.mx.qb;
    if (k === 0) return { t: 'Сдай в магазин ' + (50 + 15 * tier) + ' чекушек', done: function () { return (save.qSold || 0) - b.s >= 50 + 15 * tier; }, prog: function () { return qCnt((save.qSold || 0) - b.s, 50 + 15 * tier); }, rw: { coins: 200 + 40 * tier } };
    if (k === 1) return { t: 'Помой и сдай ' + (10 + 3 * tier) + ' чекушек', done: function () { return (save.qClean || 0) - b.c >= 10 + 3 * tier; }, prog: function () { return qCnt((save.qClean || 0) - b.c, 10 + 3 * tier); }, rw: { coins: 300 + 50 * tier } };
    if (k === 2) return { t: 'Сдай ' + (12 + 3 * tier) + ' редких чекушек и выше', done: function () { return (save.qRare || 0) - b.r >= 12 + 3 * tier; }, prog: function () { return qCnt((save.qRare || 0) - b.r, 12 + 3 * tier); }, rw: tier % 2 ? { coins: 400 + 80 * tier, b: [[3, 1]] } : { coins: 400 + 80 * tier } };
    return { t: 'Поймай ' + (6 + 2 * tier) + ' рыб на Мальдивах', done: function () { return fishCaughtAll() - b.f >= 6 + 2 * tier; }, prog: function () { return qCnt(fishCaughtAll() - b.f, 6 + 2 * tier); }, rw: { coins: 350 + 60 * tier } };
  }

function qCur() { return QUESTS[save.qi] || qExtra(save.qi - QUESTS.length); }

function qRwText(rw) {
    var a = [];
    if (rw.coins) a.push(rw.coins * QM + ' ' + coinWord(rw.coins * QM));
    if (rw.b) rw.b.forEach(function (x) { a.push(RAR[x[0]].n + ' чекушка \u00D7' + x[1]); });
    if (rw.ticket) a.push('билет на Мальдивы');
    return a.join(', ');
  }

function qGive(rw) {
    if (rw.coins) save.coins += rw.coins * QM;
    if (rw.b) rw.b.forEach(function (x) { save.inv.d[x[0]] += x[1]; save.carried += x[1]; });
    if (rw.ticket) save.tickets = (save.tickets || 0) + rw.ticket;
  }

function questReady() { var q = qCur(); return !!(q && q.done()); }

function questLine() {
    var q = qCur(); if (!q) return '';
    return q.done() ? 'Ты справился! Подойди и нажми кнопку: заберёшь награду.' : 'Задание: ' + q.t.toLowerCase() + ' (' + q.prog() + '). Награда: ' + qRwText(q.rw) + '.';
  }

function nearCollector() {
    if (loc.i !== 0) return false;
    var n = NPCS[0];
    return !!n && Math.abs(P.x - n.x) < 110 && P.z < 80;
  }

function talkCollector() { if (rvTalk()) return; talkCollectorQ(); }

function talkCollectorQ() {
    var n = NPCS[0], q = qCur();
    if (!q) return;
    if (!q.done()) {
      sfx('pick');
      toast('Задание ' + (save.qi + 1) + (save.qi < QUESTS.length ? ' из ' + QUESTS.length : '') + ': ' + q.t + ' (' + q.prog() + '). Награда: ' + qRwText(q.rw) + '.', 6000);
      return;
    }
    var rw = q.rw;
    qGive(rw); save.qi++; if (save.qi >= QUESTS.length) save.mx.qb = qSnap(); persist(); hud(); sfx('rare');
    popup(n.x, 160, 'Задание выполнено!', '#ffd23f');
    var nx = qCur();
    toast('Задание выполнено: ' + q.t + '. Награда: ' + qRwText(rw) + '.' + (nx ? ' Следующее: ' + nx.t.toLowerCase() + '.' : ''), 7000);
    if (rw.ticket) setTimeout(function () { toast('Билет на Мальдивы лежит в инвентаре. Подойди к красному самолёту в Аэропорту: с билетом можно лететь вместе с друзьями.', 7000); }, 7200);
    n.say = ''; n.sayT = 0;
  }

function npcMode() {
    if (ob.on || av.on || bus.on || ride.id || boss.on || trip.inn) return '';
    if (nearSpot() && nearSpot().fn) return 'spot';
    if (nearWH()) return 'enter';
    if (nearFlare()) return 'flare';
    return (nearCollector() && !inShop() && !inUp()) ? 'talk' : '';
  }

function seaFloor(x) {
    var ramp = Math.max(0, Math.min(1, (x - 140) / 560));
    var base = 430 + Math.sin(x * 0.0041) * 70 + Math.sin(x * 0.013 + 2) * 32 + Math.sin(x * 0.031) * 10;
    // за рыбацкой бухтой дно уходит вниз: у правого края океана глубокая впадина (около 280 м)
    var u = Math.max(0, Math.min(1, (x - 4200) / 3400)), deep = u * u * (3 - 2 * u) * 2250;
    // за границей зон (x от 11 000) начинается глубокий океан с впадиной около 500 м
    var u2 = Math.max(0, Math.min(1, (x - ZONE2_X) / 4500)); deep += u2 * u2 * (3 - 2 * u2) * 2500;
    base += deep + (deep > 100 ? Math.sin(x * 0.0063 + 1) * 90 * Math.min(1, deep / 800) : 0);
    return base * ramp * ramp * (3 - 2 * ramp);
  }

function subMaxD() { return SUB_DEPTH[save.fs.sd || 0]; }

function hullMax() { return SUB_HULL[save.fs.sh || 0]; }

function sonarR() { return SUB_SONAR[save.fs.ss || 0]; }

function sonarCdV() { return SUB_SONAR_CD[save.fs.ss || 0]; }

function subActive() { return loc.i === 5 && sea.veh === 'sub' && !av.on; }

function pearlOpen(i) {
    if (!save.pl || save.pl.indexOf(i) < 0) return true;
    return !!save.plt && Date.now() - save.plt > PEARL_CYCLE;
  }

function pearlRefresh() {
    if (save.pl && save.pl.length && save.plt && Date.now() - save.plt > PEARL_CYCLE) { save.pl = []; save.plt = 0; persist(); }
  }

function playSmp(id, gain) {
    if (!music.sfx || document.hidden || !SMP_SRC[id]) return;
    try {
      var a = smpEl[id];
      if (!a) {
        a = smpEl[id] = new Audio(SMP_SRC[id]); a.preload = 'auto';
        a.addEventListener('error', function () {
          if (a.__r) return; a.__r = 1;
          try {
            var d = SMP_SRC[id]; if (d.indexOf('data:') !== 0) return;
            var bin = atob(d.split(',')[1]), arr = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
            a.src = URL.createObjectURL(new Blob([arr], { type: 'audio/mp4' }));
          } catch (e) {}
        });
      }
      a.volume = Math.max(0, Math.min(1, (0.3 + 0.7 * music.vol) * (gain || 1)));
      try { a.currentTime = 0; } catch (e) {}
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () {});
    } catch (e) {}
  }

function wpick(list) {
    var tot = 0, i; for (i = 0; i < list.length; i++) tot += list[i][1];
    var u = Math.random() * tot; for (i = 0; i < list.length; i++) { u -= list[i][1]; if (u <= 0) return list[i][0]; }
    return list[0][0];
  }

function updateKraken(dt) {
    var where = subActive() ? 'sub' : (loc.i === 4 ? 'beach' : '');
    if (where !== kr.at) { kr.at = where; kr.t = 6 + Math.random() * 14; kr.dived = false; }
    if (sn.cd > 0) sn.cd -= dt;
    if (sn.kT > 0) sn.kT -= dt;
    if (sn.age >= 0) { sn.age += dt; if (sn.age > SONAR_SHOW) sn.age = -1; }
    if (!where || paused) return;
    if (where === 'sub' && !kr.hint) { kr.hint = true; toast('Сонар: клавиша C или кнопка «Сонар». Он показывает жемчужины рядом.', 4500); }
    if (where === 'sub' && !kr.dived && sub.d > 140) { kr.dived = true; playSmp('sDive', 0.9); }
    kr.t -= dt;
    if (kr.t > 0) return;
    if (where === 'beach') {
      kr.t = 30 + Math.random() * 60;
      var b = wpick([['bAmb', 30], ['bCall', 25], ['bMove', 20], ['bSplash', 15], ['bRoar', 10]]);
      playSmp(b, b === 'bRoar' ? 1 : 0.8);
      if (b === 'bRoar') shk = Math.max(shk, 0.35);
      if (!kr.beachHint) { kr.beachHint = true; toast('Со стороны моря доносится что-то странное…', 3500); }
    } else {
      kr.t = 28 + Math.random() * 55;
      var k = wpick([['sGroan', 30], ['sRoar', 22], ['sStrike', 16], ['sDive', 12]]);
      playSmp(k, 1);
      if (k === 'sRoar' || k === 'sStrike') sn.kT = 25;
      if (k === 'sStrike') { shk = Math.max(shk, 0.5); popup(P.x, PLAYER_H + 30 - sub.d, 'Что-то задело корпус!', '#ffb4b4'); }
      else if (k === 'sRoar') shk = Math.max(shk, 0.2);
    }
  }

function sonarPing() {
    if (!subActive()) return;
    if (sn.cd > 0) { sfx('no'); popup(P.x, PLAYER_H + 24 - sub.d, 'Сонар остывает ' + Math.ceil(sn.cd) + ' с', '#ffd2a0'); return; }
    sn.cd = sonarCdV(); sn.age = 0; sn.blips = [];
    var i, py;
    for (i = 0; i < PEARL_X.length; i++) {
      if (!pearlOpen(i)) continue;
      py = seaFloor(PEARL_X[i]) - 12;
      var dx = PEARL_X[i] - P.x, dy = py - sub.d;
      if (dx * dx + dy * dy < sonarR() * sonarR()) sn.blips.push({ dx: dx, dy: dy, k: 'p' });
    }
    if (kk.on && kk.mode === 'sub' && !kk.dv) { var jt = kk.noise > 0 ? 260 : 0; sn.blips.push({ dx: kk.x - P.x + (Math.random() - 0.5) * jt, dy: kk.dy - sub.d + (Math.random() - 0.5) * jt, k: 'k', vx: 0 }); }
    else if (sn.kT > 0) { var sg = Math.random() < 0.5 ? -1 : 1; sn.blips.push({ dx: sg * (520 + Math.random() * 260), dy: 80 + Math.random() * 300, k: 'k', vx: -sg * 40 }); }
    playSmp('sSonar', 1);
  }

function drawSonar() {
    if (!subActive()) return;
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    var R = 46, hbp = parseFloat(document.documentElement.style.getPropertyValue('--hb')) || 150, cx = 14 + R + 4, cy = hbp / scale + 12 + R + 4, i, a;
    ctx.save();
    ctx.fillStyle = 'rgba(2,24,30,.82)'; ctx.beginPath(); ctx.arc(cx, cy, R + 4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(80,230,180,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R + 4, 0, 6.3); ctx.stroke();
    ctx.strokeStyle = 'rgba(80,230,180,.28)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.5, 0, 6.3); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.clip();
    // вращающийся луч
    a = t * 2.4;
    var sw = ctx.createLinearGradient(cx, cy, cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    sw.addColorStop(0, 'rgba(80,230,180,0)'); sw.addColorStop(1, 'rgba(80,230,180,.55)');
    ctx.strokeStyle = sw; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke();
    if (sn.age >= 0) {
      var rr = Math.min(1, sn.age / SONAR_RING) * R, fade = Math.max(0, 1 - sn.age / SONAR_SHOW);
      ctx.strokeStyle = 'rgba(160,255,220,' + (0.85 * (sn.age < SONAR_RING ? 1 : fade)).toFixed(2) + ')'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.3); ctx.stroke();
      for (i = 0; i < sn.blips.length; i++) {
        var bp = sn.blips[i], bx = bp.dx + (bp.vx || 0) * sn.age, by = bp.dy, d = Math.sqrt(bx * bx + by * by) / sonarR() * R;
        if (d > R || sn.age < d / R * SONAR_RING) continue;
        var px = cx + bx / sonarR() * R, py2 = cy + by / sonarR() * R, pulse = 1 + Math.sin(t * 8 + i) * 0.2;
        if (bp.k === 'k') { ctx.fillStyle = 'rgba(255,80,80,' + (0.35 + 0.65 * fade).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(px, py2, 11 * pulse, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', px, py2 + 1); }
        else { ctx.fillStyle = 'rgba(255,225,245,' + (0.4 + 0.6 * fade).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(px, py2, 4 * pulse, 0, 6.3); ctx.fill(); }
      }
    }
    ctx.restore();
    ctx.fillStyle = '#3df2b0'; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 6.3); ctx.fill();
    ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    var gap = Math.max(0, Math.round((seaFloor(P.x) - SUB_HALF - sub.d) / 10)), txt = 'Глубина ' + Math.round(sub.d / 10) + ' / ' + Math.round(subMaxD() / 10) + ' м';
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(2,24,30,.9)'; ctx.strokeText(txt, cx, cy + R + 18); ctx.fillStyle = '#b9fff0'; ctx.fillText(txt, cx, cy + R + 18);
    var txt2 = 'до дна ' + gap + ' м'; ctx.strokeText(txt2, cx, cy + R + 33); ctx.fillText(txt2, cx, cy + R + 33);
    var st = sn.cd > 0 ? 'сонар ' + Math.ceil(sn.cd) + ' с' : (touch ? 'сонар готов' : 'сонар готов (C)');
    ctx.strokeText(st, cx, cy + R + 48); ctx.fillStyle = sn.cd > 0 ? '#ffd2a0' : '#7dffc8'; ctx.fillText(st, cx, cy + R + 48);
  }

function updateSub(dt) {
    var want = subActive() ? 1 : 0;
    if (!want) { sub.d = 0; sub.vy = 0; return; }
    var vmax = 150 + 32 * save.fs.motor, dirv = (input.dn ? 1 : 0) - (input.up ? 1 : 0);
    sub.vy += (dirv * vmax - sub.vy) * Math.min(1, 4.5 * dt);
    if (!dirv && Math.abs(sub.vy) < 4) sub.vy = 0;
    if (sub.grab > 0) { sub.vy = 0; dirv = 0; }
    sub.d += sub.vy * dt;
    if (sub.d < 0) { sub.d = 0; sub.vy = 0; }
    // предел глубины по улучшению подлодки: давление не пускает глубже
    var lim = subMaxD();
    if (sub.pw > 0) sub.pw -= dt;
    if (sub.d > lim * 0.9 && sub.vy > 0 && sub.pw <= 0 && sub.d < seaFloor(P.x) - SUB_HALF - 5) { sub.pw = 6; sfx('no'); playSmp('sGroan', 0.8); shk = Math.max(shk, 0.25); popup(P.x, PLAYER_H + 30 - sub.d, 'Давление! Предел ' + Math.round(lim / 10) + ' м', '#ffb4b4'); if (!sub.pwT) { sub.pwT = 1; toast('Корпус скрипит от давления. Глубже не пойти: улучши глубину подлодки в лавке рыбака.', 4500); } }
    if (sub.d > lim) { sub.d = lim; if (sub.vy > 0) sub.vy = 0; }
    if (sub.bump > 0) sub.bump -= dt;
    // берег и дно: горизонтально не пускаем туда, где дно выше лодки
    if (seaFloor(P.x) - SUB_HALF < sub.d - 0.5) {
      P.x = sub.px; P.vx = 0;
      if (sub.bump <= 0) { sub.bump = 0.8; sfx('no'); popup(P.x, PLAYER_H + 20 - sub.d, 'Берег!', '#ffd2a0'); }
    }
    var fl = seaFloor(P.x) - SUB_HALF;
    if (sub.d > fl) {
      sub.d = Math.max(0, fl); if (sub.vy > 0) sub.vy = 0;
      if (dirv > 0 && sub.bump <= 0) { sub.bump = 0.8; sfx('no'); popup(P.x, PLAYER_H + 20 - sub.d, 'Дно!', '#ffd2a0'); }
    }
    sub.px = P.x;
    // пузыри
    sub.lastBub -= dt;
    if (sub.lastBub <= 0 && sub.d > 8) { sub.lastBub = 0.12 + Math.random() * 0.1; bubbles.push({ x: P.x - P.face * 70 + (Math.random() - 0.5) * 10, y: gY + sub.d - 6, v: 40 + Math.random() * 30, r: 2 + Math.random() * 3, age: 0 }); }
    for (var i = bubbles.length - 1; i >= 0; i--) { var b = bubbles[i]; b.age += dt; b.y -= b.v * dt; b.x += Math.sin(b.age * 6 + i) * 8 * dt; if (b.y < gY - 60 || b.age > 5) bubbles.splice(i, 1); }
    // жемчужины на дне
    pearlRefresh();
    for (var k = 0; k < PEARL_X.length; k++) {
      if (!pearlOpen(k)) continue;
      var py = seaFloor(PEARL_X[k]) - 12;
      if (Math.abs(P.x - PEARL_X[k]) < 55 && Math.abs(sub.d - py) < 55) {
        if (!save.pl) save.pl = [];
        if (save.pl.indexOf(k) < 0) save.pl.push(k);
        if (!save.plt || Date.now() - save.plt > PEARL_CYCLE) save.plt = Date.now();
        save.coins += PEARL_PRICE; save.mx.pn++; persist(); hud(); sfx('sell');
        popup(PEARL_X[k], PLAYER_H + 10 - py, '+' + PEARL_PRICE + ' жемчужина', '#ffeaf4');
        if (!sea.pt) { sea.pt = 1; toast('Жемчужина! Они лежат на дне, новые появятся через 20 минут.', 3500); }
      }
    }
  }

function updateSeaCam(dt) {
    var tgt = subActive() ? Math.max(0, sub.d - 40) : 0;
    camY += (tgt - camY) * Math.min(1, 5 * dt);
    if (Math.abs(camY - tgt) < 0.3) camY = tgt;
  }

function seaWater(x0, x1) {
    var top = gY - 80, bot = gY + 6400, dk = Math.min(0.93, Math.max(0, (camY + (subActive() ? sub.d * 0.3 : 0)) / 1000));
    function mix(c, k) { return 'rgb(' + Math.round(c[0] * (1 - k) + 6 * k) + ',' + Math.round(c[1] * (1 - k) + 20 * k) + ',' + Math.round(c[2] * (1 - k) + 48 * k) + ')'; }
    var sg = ctx.createLinearGradient(0, top, 0, bot);
    sg.addColorStop(0, mix([155, 232, 238], dk)); sg.addColorStop(0.0014, mix([69, 198, 220], dk)); sg.addColorStop(0.049, mix([20, 130, 190], Math.min(0.9, dk + 0.15))); sg.addColorStop(0.17, 'rgb(10,48,100)'); sg.addColorStop(0.34, 'rgb(5,22,56)'); sg.addColorStop(0.62, 'rgb(3,12,34)'); sg.addColorStop(1, 'rgb(2,8,22)');
    ctx.fillStyle = sg; ctx.fillRect(x0, top, x1 - x0, bot - top);
    var i, k;
    if (GX) gxSeaSurf(x0, x1, top, dk);
    // морское дно
    if (x1 > 0) {
      ctx.beginPath(); ctx.moveTo(x0, bot);
      for (var x = Math.floor(x0 / 20) * 20; x <= x1 + 20; x += 20) ctx.lineTo(x, gY + seaFloor(x));
      ctx.lineTo(x1 + 20, bot); ctx.closePath();
      var fg = ctx.createLinearGradient(0, gY, 0, gY + 500); fg.addColorStop(0, mix([233, 214, 160], dk * 0.8)); fg.addColorStop(1, mix([150, 130, 90], dk * 0.9));
      ctx.fillStyle = fg; ctx.fill();
    if (GX) gxSeaFloor(x0, x1, dk, mix); else {
      // камни, водоросли, кораллы, затонувший корабль, сундук
      for (i = Math.floor(x0 / 90) - 1; i * 90 < x1; i++) {
        var gx = i * 90 + ((i * 53) % 40), fy = gY + seaFloor(gx), kind = ((i * 7919) % 5 + 5) % 5;
        if (fy < gY + 20) continue;
        if (kind === 0) { ctx.strokeStyle = mix([40, 160, 90], dk * 0.7); ctx.lineWidth = 5; ctx.lineCap = 'round'; for (k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(gx + k * 8, fy + 4); ctx.quadraticCurveTo(gx + k * 8 + Math.sin(t * 1.4 + k + i) * 14, fy - 40, gx + k * 8 + Math.sin(t * 1.4 + k + i + 1) * 18, fy - 76 - k * 10); ctx.stroke(); } }
        else if (kind === 1) { ctx.fillStyle = mix([255, 110, 140], dk * 0.7); for (k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(gx + k * 9, fy - 6 - (k % 2) * 10, 9, 0, 6.3); ctx.fill(); } ctx.fillRect(gx - 4, fy - 6, 44, 10); }
        else if (kind === 2) { ctx.fillStyle = mix([110, 120, 135], dk * 0.7); ctx.beginPath(); ctx.ellipse(gx, fy, 40, 22, 0, Math.PI, 0); ctx.fill(); }
        else if (kind === 3) { ctx.fillStyle = mix([255, 200, 70], dk * 0.7); for (k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(gx + k * 14, fy + 2); ctx.lineTo(gx + k * 14 + 6, fy - 30 - k * 8); ctx.lineTo(gx + k * 14 + 12, fy + 2); ctx.fill(); } }
      }
      if (3600 > x0 - 200 && 3600 < x1 + 200) {
        var wy = gY + seaFloor(3600);
        ctx.save(); ctx.translate(3600, wy); ctx.rotate(-0.12); ctx.fillStyle = mix([84, 60, 40], dk * 0.6);
        ctx.beginPath(); ctx.moveTo(-110, -10); ctx.lineTo(110, -22); ctx.lineTo(90, -52); ctx.lineTo(-90, -44); ctx.closePath(); ctx.fill();
        ctx.fillRect(-4, -130, 8, 90); ctx.fillStyle = mix([200, 200, 190], dk * 0.7); ctx.beginPath(); ctx.moveTo(4, -125); ctx.lineTo(56, -85); ctx.lineTo(4, -85); ctx.fill();
        ctx.restore();
      }
      if (5200 > x0 - 80 && 5200 < x1 + 80) {
        var cy = gY + seaFloor(5200);
        ctx.fillStyle = mix([150, 95, 40], dk * 0.6); ctx.fillRect(5170, cy - 34, 60, 34); ctx.fillStyle = mix([225, 170, 50], dk * 0.6); ctx.fillRect(5170, cy - 40, 60, 10); ctx.fillRect(5196, cy - 30, 8, 12);
      }
    }
      drawDeepTreasure(x0, x1, dk);
      // жемчужины
      for (k = 0; k < PEARL_X.length; k++) {
        if (PEARL_X[k] < x0 - 40 || PEARL_X[k] > x1 + 40 || !pearlOpen(k)) continue;
        var py = gY + seaFloor(PEARL_X[k]) - 12, pg = ctx.createRadialGradient(PEARL_X[k], py, 1, PEARL_X[k], py, 22 + Math.sin(t * 4 + k) * 4);
        pg.addColorStop(0, 'rgba(255,240,250,.95)'); pg.addColorStop(0.35, 'rgba(255,200,230,.45)'); pg.addColorStop(1, 'rgba(255,200,230,0)');
        ctx.fillStyle = pg; ctx.fillRect(PEARL_X[k] - 28, py - 28, 56, 56);
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(PEARL_X[k], py, 7, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffd9ec'; ctx.beginPath(); ctx.arc(PEARL_X[k] - 2, py - 2, 3, 0, 6.3); ctx.fill();
      }
    }
    // глубоководные огоньки, медузы и морской снег (чем глубже, тем больше)
    if (camY > 250 || !subActive()) {
      var dz = Math.max(0, Math.min(1, (camY - 300) / 900));
      if (dz > 0.02) {
        for (i = 0; i < 44; i++) {
          var mx0 = (((i * 733 + t * (6 + i % 5) * (i % 2 ? 1 : -1)) % LOCS[5].w) + LOCS[5].w) % LOCS[5].w, my0 = 520 + (i * 197) % 5200 + Math.sin(t * 0.7 + i) * 14;
          if (mx0 < x0 - 60 || mx0 > x1 + 60 || my0 > seaFloor(mx0) - 20 || Math.abs(gY + my0 - gY - camY) > 700) continue;
          var gl = ctx.createRadialGradient(mx0, gY + my0, 1, mx0, gY + my0, 26);
          gl.addColorStop(0, i % 3 ? 'rgba(120,255,230,' + 0.55 * dz + ')' : 'rgba(255,150,230,' + 0.55 * dz + ')'); gl.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gl; ctx.fillRect(mx0 - 26, gY + my0 - 26, 52, 52);
          if (i % 4 === 0) { ctx.strokeStyle = 'rgba(190,255,240,' + 0.35 * dz + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx0 - 3, gY + my0); ctx.quadraticCurveTo(mx0 - 8, gY + my0 + 14, mx0 - 2, gY + my0 + 26); ctx.moveTo(mx0 + 3, gY + my0); ctx.quadraticCurveTo(mx0 + 8, gY + my0 + 16, mx0 + 2, gY + my0 + 28); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(200,225,255,' + 0.35 * dz + ')';
        for (i = 0; i < 50; i++) { var sx0 = x0 + (((i * 311 + t * 6) % Math.max(300, x1 - x0))), sy0 = gY + camY - 260 + ((i * 97 + t * (12 + i % 4 * 4)) % 700); ctx.fillRect(sx0, sy0, 2, 2); }
      }
    }
    // рыбы плавают на разной глубине
    var names = ['sardine', 'perch', 'clown', 'tuna', 'barra', 'sword', 'shark', 'ray'];
    for (i = 0; i < 30; i++) {
      var sp = 28 + (i % 5) * 14, dir = i % 2 ? 1 : -1, W = LOCS[5].w, fx = (((i * 977 + t * sp * dir) % W) + W) % W, fd = 60 + (i * 83) % 330;
      if (fx < x0 - 80 || fx > x1 + 80 || fd > seaFloor(fx) - 30) continue;
      ctx.globalAlpha = 0.55; fishArt(ctx, names[i % names.length], fx, gY + fd + Math.sin(t + i) * 8, 44 + (i % 4) * 14, t + i, dir < 0);
    }
    ctx.globalAlpha = 1;
    // световые лучи у поверхности
    if (GX) gxSeaOver(x0, x1, dk); else if (camY < 300) {
      ctx.fillStyle = 'rgba(255,255,255,' + (0.06 * (1 - camY / 300)) + ')';
      for (i = Math.floor(x0 / 220) - 1; i * 220 < x1; i++) { var rx = i * 220 + Math.sin(t * 0.4 + i) * 30; ctx.beginPath(); ctx.moveTo(rx, gY - 70); ctx.lineTo(rx + 70, gY - 70); ctx.lineTo(rx + 190, gY + 420); ctx.lineTo(rx + 90, gY + 420); ctx.fill(); }
    }
  }

function drawBubbles() {
    if (!bubbles.length || loc.i !== 5) return;
    ctx.strokeStyle = 'rgba(220,245,255,.8)'; ctx.lineWidth = 1.5;
    for (var i = 0; i < bubbles.length; i++) { var b = bubbles[i]; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.3); ctx.stroke(); }
  }

function drawSubAt(x, y, f, own, vy) {
    var bob = (y - gY) < 6 ? Math.sin(t * 2.2 + x * 0.013) * 2 : Math.sin(t * 1.6 + x * 0.01) * 1.5;
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(f >= 0 ? 1 : -1, 1);
    ctx.rotate((vy || 0) * 0.0009 * (f >= 0 ? 1 : -1) * 0 + (vy || 0) / 2200);
    // свет фары под водой
    if (y - gY > 40) {
      var lg = ctx.createLinearGradient(80, 0, 330, 0); lg.addColorStop(0, 'rgba(255,245,170,.5)'); lg.addColorStop(1, 'rgba(255,245,170,0)');
      ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(84, -6); ctx.lineTo(330, -70); ctx.lineTo(330, 70); ctx.lineTo(84, 8); ctx.fill();
    }
    // винт и руль
    ctx.fillStyle = '#5b6470'; ctx.beginPath(); ctx.moveTo(-84, -4); ctx.lineTo(-112, -26); ctx.lineTo(-100, -2); ctx.lineTo(-112, 24); ctx.lineTo(-84, 6); ctx.closePath(); ctx.fill();
    var pr = Math.sin(t * 26) * 14; ctx.fillStyle = '#3d4450'; ctx.fillRect(-118, -pr - 3, 7, pr * 2 + 6);
    // корпус
    var g = ctx.createLinearGradient(0, -36, 0, 34); g.addColorStop(0, '#ffd75a'); g.addColorStop(0.55, '#f2b01e'); g.addColorStop(1, '#c4820c');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 92, 34, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#8a5a08'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.ellipse(-4, -16, 70, 8, 0, 0, 6.3); ctx.fill();
    // рубка и перископ
    ctx.fillStyle = '#e09a14'; rrect(-26, -52, 54, 26, 8); ctx.fill(); ctx.strokeStyle = '#8a5a08'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.strokeStyle = '#4a5360'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(12, -52); ctx.lineTo(12, -70); ctx.lineTo(28, -70); ctx.stroke();
    // кабина с петухом
    ctx.fillStyle = 'rgba(150,215,240,.95)'; ctx.beginPath(); ctx.ellipse(46, -4, 24, 20, 0, 0, 6.3); ctx.fill();
    if (own && ready(img.rooster)) { ctx.save(); ctx.beginPath(); ctx.ellipse(46, -4, 22, 18, 0, 0, 6.3); ctx.clip(); ctx.drawImage(img.rooster, 0, 0, 156, 115, 24, -22, 44, 33); ctx.restore(); }
    ctx.strokeStyle = '#8a5a08'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(46, -4, 24, 20, 0, 0, 6.3); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(38, -12, 8, 5, -0.5, 0, 6.3); ctx.fill();
    // иллюминаторы
    for (var q = 0; q < 3; q++) { ctx.fillStyle = '#7fd0f0'; ctx.beginPath(); ctx.arc(-58 + q * 24, 6, 7, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#8a5a08'; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.fillStyle = '#fff6b0'; ctx.beginPath(); ctx.arc(88, 6, 5, 0, 6.3); ctx.fill();
    ctx.restore();
  }

function drawSubMoored(x, owned) {
    ctx.save();
    ctx.fillStyle = 'rgba(40,160,210,.55)';
    ctx.restore();
    var y = gY + 40;
    drawSubAt(x, y, 1, false, 0);
    ctx.fillStyle = 'rgba(40,160,210,.7)'; ctx.fillRect(x - 100, y + 4, 200, 40);
    ctx.fillStyle = 'rgba(255,255,255,.6)'; for (var q = -3; q <= 3; q++) { ctx.beginPath(); ctx.ellipse(x + q * 28 + Math.sin(t * 3 + q) * 4, y + 6, 14, 3, 0, 0, 6.3); ctx.fill(); }
    if (!owned) {
      ctx.fillStyle = 'rgba(20,35,63,.92)'; rrect(x - 105, y - 120, 210, 44, 8); ctx.fill();
      ctx.fillStyle = '#ffe14a'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🛟 Подводная лодка', x, y - 106); ctx.fillStyle = '#fff'; ctx.fillText(fmtN(SUB_PRICE) + ' коинов · лавка рыбака', x, y - 90);
    }
  }

function drawBay(a, b) {
    var i;
    // тени рыб под причалом
    for (i = 0; i < 10; i++) {
      var fx = a + ((i * 311 + t * (14 + i % 3 * 7)) % Math.max(200, b - a)), fy = gY + 54 + (i * 29) % 70;
      if (fx > b) continue;
      ctx.fillStyle = 'rgba(8,60,110,.28)'; ctx.beginPath(); ctx.ellipse(fx, fy, 22, 7, 0, 0, 6.3); ctx.fill();
      ctx.beginPath(); ctx.moveTo(fx - 20, fy); ctx.lineTo(fx - 32, fy - 7); ctx.lineTo(fx - 32, fy + 7); ctx.fill();
    }
  }

function drawPierProps(x0, x1) {
    var i, x;
    // фонари вдоль набережной
    for (x = 2520; x < WORLD_W; x += 380) {
      if (x < x0 - 30 || x > x1 + 30) continue;
      ctx.fillStyle = '#2f3641'; ctx.fillRect(x - 3, gY - 100, 6, 100);
      ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(x, gY - 106, 9, 0, 6.3); ctx.fill();
    }
    // места для лодок: столбики и номера
    var slips = [[SUB_X, 'ПОДЛОДКА'], [BOAT_X, 'ЛОДКА'], [2700, 'МЕСТО 1'], [3300, 'МЕСТО 2'], [3900, 'МЕСТО 3']];
    for (i = 0; i < slips.length; i++) {
      x = slips[i][0]; if (x < x0 - 120 || x > x1 + 120) continue;
      ctx.fillStyle = '#5b3d22'; ctx.fillRect(x - 100, gY - 18, 8, 22); ctx.fillRect(x + 92, gY - 18, 8, 22);
      ctx.fillStyle = '#d8362f'; ctx.fillRect(x - 101, gY - 20, 10, 4); ctx.fillRect(x + 91, gY - 20, 10, 4);
      ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(slips[i][1], x, gY + 8);
    }
    // пустые места: маленькие лодочки и бочки
    var empt = [2700, 3300, 3900];
    for (i = 0; i < empt.length; i++) {
      x = empt[i]; if (x < x0 - 120 || x > x1 + 120) continue;
      var by = gY + 38 + Math.sin(t * 2 + i) * 2;
      ctx.fillStyle = i === 1 ? '#3b7bff' : '#2fbf6b'; ctx.beginPath(); ctx.moveTo(x - 46, by - 6); ctx.lineTo(x + 46, by - 6); ctx.quadraticCurveTo(x + 36, by + 14, x, by + 14); ctx.quadraticCurveTo(x - 36, by + 14, x - 46, by - 6); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(x - 40, by - 4, 80, 3);
      ctx.fillStyle = 'rgba(40,160,210,.6)'; ctx.fillRect(x - 56, by + 4, 112, 12);
    }
    // ящики, сети и бочки
    var crates = [2480, 3420, 3800];
    for (i = 0; i < crates.length; i++) {
      x = crates[i]; if (x < x0 - 60 || x > x1 + 60) continue;
      ctx.fillStyle = '#a8763c'; ctx.fillRect(x - 18, gY - 34, 36, 34); ctx.strokeStyle = '#6b4a22'; ctx.lineWidth = 2; ctx.strokeRect(x - 18, gY - 34, 36, 34); ctx.beginPath(); ctx.moveTo(x - 18, gY - 34); ctx.lineTo(x + 18, gY); ctx.stroke();
      ctx.fillStyle = '#4a7a8a'; ctx.beginPath(); ctx.arc(x + 34, gY - 14, 14, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#2f5260'; ctx.stroke();
    }
    // буи на воде
    for (x = 2450; x < WORLD_W; x += 520) {
      if (x < x0 - 30 || x > x1 + 30) continue;
      ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x, gY + 30 + Math.sin(t * 2 + x) * 3, 8, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 8, gY + 28 + Math.sin(t * 2 + x) * 3, 16, 3);
    }
    // табличка границы
    if (LAG_X + 90 > x0 - 100 && LAG_X + 90 < x1 + 100) {
      var sx = LAG_X + 90;
      ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 3, gY - 100, 6, 100);
      ctx.fillStyle = '#1f4aa8'; rrect(sx - 70, gY - 138, 140, 40, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🎣 Рыбацкая бухта ▶', sx, gY - 126); ctx.fillText('лодки, рыбалка, лавка', sx, gY - 110);
    }
  }

function drawWestBack(x0, x1) {
    var i;
    // дальний силуэт скал на горизонте
    if (x0 < WEST_END + 200) {
      ctx.fillStyle = 'rgba(60,150,120,.55)';
      for (i = 0; i < 6; i++) { var hx = 300 + i * 380; if (hx < x0 - 200 || hx > x1 + 200) continue; ctx.beginPath(); ctx.ellipse(hx, gY - 92, 150, 34 + (i % 3) * 12, 0, Math.PI, 0); ctx.fill(); }
    }
    // маяк
    var lx = 1020;
    if (lx > x0 - 120 && lx < x1 + 120) {
      ctx.fillStyle = '#f2f0ea'; ctx.beginPath(); ctx.moveTo(lx - 26, gY); ctx.lineTo(lx - 14, gY - 250); ctx.lineTo(lx + 14, gY - 250); ctx.lineTo(lx + 26, gY); ctx.fill();
      ctx.fillStyle = '#e5484d'; for (i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(lx - 24 + i * 0, gY - 40 - i * 80); ctx.lineTo(lx + 24, gY - 40 - i * 80); ctx.lineTo(lx + 21 - (i * 3), gY - 80 - i * 80); ctx.lineTo(lx - 21 + i * 3, gY - 80 - i * 80); ctx.fill(); }
      ctx.fillStyle = '#2a2f3a'; ctx.fillRect(lx - 20, gY - 276, 40, 28);
      ctx.fillStyle = Math.sin(t * 3) > 0 ? '#fff2a0' : '#caa94a'; ctx.fillRect(lx - 14, gY - 270, 28, 16);
      ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.moveTo(lx - 24, gY - 276); ctx.lineTo(lx, gY - 302); ctx.lineTo(lx + 24, gY - 276); ctx.fill();
    }
  }

function drawWestFront(x0, x1) {
    var i, x;
    // камни и ракушки на пляже
    var rocks2 = [320, 760, 1180, 1480, 1960, 2200];
    for (i = 0; i < rocks2.length; i++) {
      x = rocks2[i]; if (x < x0 - 80 || x > x1 + 80) continue;
      ctx.fillStyle = '#8c8f96'; ctx.beginPath(); ctx.ellipse(x, gY + 2, 38 + (i % 3) * 8, 26 + (i % 2) * 8, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(x - 8, gY - 14, 14, 6, -0.3, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#6f7279'; ctx.beginPath(); ctx.ellipse(x + 30, gY + 2, 20, 12, 0, Math.PI, 0); ctx.fill();
    }
    // лужицы, цветы и ракушки
    for (x = Math.floor(x0 / 70) * 70; x < x1 && x < WEST_END + 40; x += 70) {
      if (x < 40) continue;
      var h = ((x * 7919) % 100 + 100) % 100;
      if (h < 18) { ctx.fillStyle = 'rgba(80,190,225,.7)'; ctx.beginPath(); ctx.ellipse(x, gY + 8, 20, 4, 0, 0, 6.3); ctx.fill(); }
      else if (h < 36) { ctx.fillStyle = ['#ff7aa5', '#ffd23f', '#b79cff'][h % 3]; ctx.beginPath(); ctx.arc(x, gY - 6, 4, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#2f8a52'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gY); ctx.lineTo(x, gY - 6); ctx.stroke(); }
      else if (h < 48) { ctx.fillStyle = '#fff3e6'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 7, 4, 0, Math.PI, 0); ctx.fill(); }
    }
    // гамак между пальмами и коряга
    var hx = 1250;
    if (hx > x0 - 140 && hx < x1 + 140) {
      ctx.strokeStyle = '#7a4a22'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(hx - 100, gY); ctx.lineTo(hx - 100, gY - 90); ctx.moveTo(hx + 100, gY); ctx.lineTo(hx + 100, gY - 90); ctx.stroke();
      ctx.strokeStyle = '#ff6b6b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(hx - 100, gY - 86); ctx.quadraticCurveTo(hx, gY - 30 + Math.sin(t * 1.2) * 4, hx + 100, gY - 86); ctx.stroke();
    }
    var sx = 1760;
    if (sx > x0 - 140 && sx < x1 + 140) {
      ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 3, gY - 90, 6, 90);
      ctx.fillStyle = '#2f8a52'; rrect(sx - 90, gY - 128, 180, 40, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🌴 Западный берег', sx, gY - 116); ctx.fillText('здесь появятся новые места', sx, gY - 100);
    }
  }

function fsCost(k) { return Math.round(FS_COST[k] * Math.pow(2.1, save.fs[k]) / 10) * 10; }

function fmtN(n) { return Math.round(n).toLocaleString('ru-RU'); }

function boatSpd() { return SPEED * 0.85 * (1 + 0.3 * save.fs.motor); }

function catchSize() { return 0.20 + 0.04 * save.fs.rod; }

function fishTotal() { var n = 0; for (var k in save.fb) n += save.fb[k]; return n; }

function fishCaughtAll() { var n = 0; for (var k in save.fc) n += save.fc[k]; return n; }

function shade(hex, k) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, m = k < 0 ? 0 : 255, a = Math.abs(k);
    r = Math.round(r + (m - r) * a); g = Math.round(g + (m - g) * a); b = Math.round(b + (m - b) * a);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

function fishEye(c, x, y, r) {
    c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, 6.3); c.fill();
    c.fillStyle = '#12213a'; c.beginPath(); c.arc(x + r * 0.2, y, r * 0.55, 0, 6.3); c.fill();
  }

function fishArt(c, id, x, y, len, tt, flip) {
    var f = FISH_BY[id], s = len / 100, col = f.c, dark = f.k === 'rainbow' ? 'hsl(' + ((tt * 70 + 200) % 360) + ',85%,50%)' : shade(col, -0.35), i;
    c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.lineJoin = 'round'; c.lineCap = 'round';
    c.strokeStyle = dark; c.lineWidth = 2.5;
    if (f.k === 'ray') {
      c.strokeStyle = dark; c.lineWidth = 4; c.beginPath(); c.moveTo(-40, 2); c.quadraticCurveTo(-62, 12, -80, 4 + Math.sin(tt * 4) * 4); c.stroke();
      c.fillStyle = col; c.beginPath(); c.moveTo(48, 2); c.quadraticCurveTo(10, -34, -42, 2); c.quadraticCurveTo(10, 24, 48, 2); c.fill();
      c.lineWidth = 2.5; c.strokeStyle = dark; c.stroke();
      c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(4, 5, 28, 6, 0, 0, 6.3); c.fill();
      fishEye(c, 26, -6, 4.5);
    } else if (f.k === 'shark') {
      c.fillStyle = dark; c.beginPath(); c.moveTo(-38, 0); c.lineTo(-64, -26); c.quadraticCurveTo(-54, -4, -62, 4); c.lineTo(-52, 20); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(-8, -17); c.lineTo(8, -46); c.lineTo(24, -17); c.closePath(); c.fill();
      c.fillStyle = col; c.beginPath(); c.moveTo(60, 4); c.quadraticCurveTo(40, -24, -8, -20); c.quadraticCurveTo(-40, -12, -42, 0); c.quadraticCurveTo(-38, 14, 0, 18); c.quadraticCurveTo(44, 22, 60, 4); c.fill();
      c.stroke();
      c.fillStyle = '#eef3f8'; c.beginPath(); c.moveTo(56, 6); c.quadraticCurveTo(40, 18, 0, 17); c.quadraticCurveTo(26, 8, 56, 6); c.fill();
      c.fillStyle = dark; c.beginPath(); c.moveTo(6, 14); c.lineTo(-10, 32); c.lineTo(20, 16); c.closePath(); c.fill();
      c.strokeStyle = dark; c.lineWidth = 1.6; for (i = 0; i < 3; i++) { c.beginPath(); c.moveTo(22 - i * 6, -8); c.lineTo(20 - i * 6, 6); c.stroke(); }
      fishEye(c, 40, -6, 4);
      c.fillStyle = '#fff'; for (i = 0; i < 4; i++) { c.beginPath(); c.moveTo(44 + i * 3, 8); c.lineTo(46 + i * 3, 13); c.lineTo(48 + i * 3, 8); c.fill(); }
    } else {
      var bh = f.k === 'long' ? 13 : 22, bw = f.k === 'long' ? 48 : 42;
      c.fillStyle = dark;
      c.beginPath(); c.moveTo(-bw + 10, 0); c.lineTo(-bw - 16, -bh); c.quadraticCurveTo(-bw - 8, 0, -bw - 16, bh); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(-12, -bh + 3); c.quadraticCurveTo(4, -bh - 20, 22, -bh + 3); c.closePath(); c.fill();
      if (f.k === 'sword') { c.beginPath(); c.moveTo(bw - 8, -3); c.lineTo(bw + 38, 0); c.lineTo(bw - 8, 3); c.closePath(); c.fill(); }
      if (f.k === 'rainbow') {
        var gr = c.createLinearGradient(-bw, -bh, bw, bh), hh = (tt * 70) % 360;
        for (i = 0; i <= 6; i++) gr.addColorStop(i / 6, 'hsl(' + ((hh + i * 55) % 360) + ',95%,60%)');
        c.fillStyle = gr;
      } else if (f.k === 'gold') {
        var g2 = c.createLinearGradient(0, -bh, 0, bh); g2.addColorStop(0, '#fff2a8'); g2.addColorStop(0.5, '#ffc928'); g2.addColorStop(1, '#d9910f'); c.fillStyle = g2;
      } else c.fillStyle = col;
      c.beginPath(); c.ellipse(0, 0, bw, bh, 0, 0, 6.3); c.fill();
      if (f.k === 'clown') {
        c.save(); c.beginPath(); c.ellipse(0, 0, bw, bh, 0, 0, 6.3); c.clip();
        for (i = 0; i < 3; i++) { c.fillStyle = '#fff'; c.fillRect(-18 + i * 20 - 4, -bh, 9, bh * 2); c.fillStyle = '#222'; c.fillRect(-18 + i * 20 - 6, -bh, 2, bh * 2); c.fillRect(-18 + i * 20 + 5, -bh, 2, bh * 2); }
        c.restore();
      } else if (f.k !== 'rainbow') { c.fillStyle = 'rgba(255,255,255,.33)'; c.beginPath(); c.ellipse(3, bh * 0.42, bw * 0.8, bh * 0.45, 0, 0, 6.3); c.fill(); }
      c.strokeStyle = f.k === 'rainbow' ? '#ffffff' : dark; c.lineWidth = f.k === 'rainbow' ? 3.2 : 2.5; c.beginPath(); c.ellipse(0, 0, bw, bh, 0, 0, 6.3); c.stroke();
      c.strokeStyle = f.k === 'rainbow' ? 'rgba(255,255,255,.7)' : dark; c.lineWidth = 1.8; c.beginPath(); c.arc(bw * 0.3, 0, bh * 0.75, 2.3, 4.0); c.stroke();
      if (f.k === 'long') { c.fillStyle = '#fff'; for (i = 0; i < 4; i++) { c.beginPath(); c.moveTo(bw - 2 - i * 4, 3); c.lineTo(bw - 4 - i * 4, 9); c.lineTo(bw - 6 - i * 4, 3); c.fill(); } }
      fishEye(c, bw * 0.55, -bh * 0.22, f.k === 'long' ? 4.5 : 6);
      if (f.k === 'gold' || f.k === 'rainbow') {
        for (i = 0; i < 4; i++) {
          var a = tt * 2.4 + i * 1.6, sx = Math.cos(a) * (bw * 0.9) * (0.5 + 0.5 * Math.sin(i + 1)), sy = Math.sin(a * 1.3) * bh * 1.2, sr = 4 + 3 * Math.sin(a * 3 + i);
          c.fillStyle = f.k === 'rainbow' ? '#fff' : '#fff8c4'; c.beginPath();
          c.moveTo(sx, sy - sr); c.lineTo(sx + sr * 0.35, sy - sr * 0.35); c.lineTo(sx + sr, sy); c.lineTo(sx + sr * 0.35, sy + sr * 0.35);
          c.lineTo(sx, sy + sr); c.lineTo(sx - sr * 0.35, sy + sr * 0.35); c.lineTo(sx - sr, sy); c.lineTo(sx - sr * 0.35, sy - sr * 0.35); c.closePath(); c.fill();
        }
      }
    }
    c.restore();
  }

function fishIcon(id, w, h, known) {
    var cv = document.createElement('canvas'); cv.width = w * 2; cv.height = h * 2; cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var c = cv.getContext('2d');
    if (!known) {
      if (FISH_BY[id].secret) { c.fillStyle = '#7a869c'; c.font = '700 44px "Russo One", Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', w, h); return cv; }
      fishArt(c, id, w, h, w * 1.3, 0, false); c.globalCompositeOperation = 'source-atop'; c.fillStyle = '#243049'; c.fillRect(0, 0, w * 2, h * 2); return cv;
    }
    fishArt(c, id, w, h, w * 1.3, 0.5, false);
    return cv;
  }

function seaHere() {
    if (loc.i !== 5) return '';
    if (rip.on && Math.abs(P.x - rip.x) < 150) return 'rip';
    for (var i = 0; i < shoals.length; i++) if (Math.abs(P.x - shoals[i].x) < 140) return 'shoal';
    return '';
  }

function pickFish(sea, spot) {
    if (sea && save.fs.rod >= 3) {
      var pg = spot === 'rip' ? 0.03 + save.fs.bait * 0.005 : 0.0015 + save.fs.bait * 0.0005;
      if (Math.random() < pg) return FISH_BY.google;
    }
    var grp = FISH.filter(function (f) { return f.w === (sea ? 's' : 'p'); }), ws = [], tot = 0, j;
    for (j = 0; j < grp.length; j++) {
      var w = grp[j].wt * (1 + save.fs.bait * 0.18 * j) * ((spot === 'shoal' || spot === 'rip') && j >= 2 ? 1.5 : 1);
      ws.push(w); tot += w;
    }
    var u = Math.random() * tot;
    for (j = 0; j < grp.length; j++) { u -= ws[j]; if (u <= 0) return grp[j]; }
    return grp[0];
  }

function fishSay(m) { if (fsh.msg !== m) { fsh.msg = m; elFishMsg.textContent = m; } }

function fishBtnTxt() {
    var s = fsh.st;
    return s === 'wait' ? 'Тянуть рано, жди' : s === 'bite' ? 'ПОДСЕКАЙ!' : s === 'fight' ? 'Держи, чтобы тянуть' : (s === 'done' || s === 'miss') ? 'Закинуть ещё раз' : 'Закинуть удочку';
  }

function fishStart() {
    if (paused) return;
    fsh.open = 1; fsh.st = 'ready'; fsh.sea = loc.i === 5; fsh.hold = 0; fsh.lock = 0.3; fsh.fish = null;
    fishSay(fsh.sea ? 'Открытое море. В косяке и на радужной ряби клёв лучше.' : 'Забрось удочку с причала. Рыба покрупнее живёт в открытом море, туда нужна лодка.');
    elFish.hidden = false; elFishBtn.textContent = fishBtnTxt(); syncPause();
    cancelAnimationFrame(fishRaf); fsh.last = 0; fishRaf = requestAnimationFrame(fishLoop);
  }

function fishClose() {
    fsh.open = 0; fsh.hold = 0; elFish.hidden = true; cancelAnimationFrame(fishRaf); syncPause();
  }

function fishPress() {
    if (!fsh.open || fsh.lock > 0) return;
    var s = fsh.st;
    if (s === 'ready' || s === 'done' || s === 'miss') {
      fsh.spot = fsh.sea ? seaHere() : '';
      fsh.st = 'wait'; fsh.t = 0; sfx('jump');
      fsh.wait = (2.2 + Math.random() * 4.5) * (1 - 0.1 * save.fs.bait) * (fsh.spot ? 0.6 : 1);
      fishSay(fsh.spot === 'rip' ? 'Радужная рябь… тут что-то особенное. Ждём.' : (fsh.spot === 'shoal' ? 'Косяк рядом, клюнет быстро. Ждём.' : 'Ждём поклёвку…'));
    } else if (s === 'wait') {
      fsh.st = 'miss'; fsh.lock = 0.4; sfx('no'); fishSay('Рано! Рыба испугалась. Закинь ещё раз.');
    } else if (s === 'bite') {
      fsh.st = 'fight'; fsh.t = 0; fsh.prog = 0.25;
      var S = catchSize(); fsh.cy = 0.5; fsh.cv = 0; fsh.fy = 0.5; fsh.ft = 0.5; fsh.fint = 0.3;
      fishSay('Держи кнопку, чтобы зелёная полоса шла за рыбой!');
    } else if (s === 'fight') fsh.hold = 1;
    elFishBtn.textContent = fishBtnTxt();
  }

function fishRelease() { fsh.hold = 0; }

function fishBiteStart() {
    fsh.fish = pickFish(fsh.sea, fsh.spot); fsh.st = 'bite'; fsh.t = 0; fsh.win = 1.3 + 0.1 * save.fs.rod;
    sfx('rare'); fishSay('Клюёт! Подсекай!'); elFishBtn.textContent = fishBtnTxt();
  }

function fishFinish(ok) {
    var f = fsh.fish;
    fsh.hold = 0; fsh.lock = 0.7;
    if (ok) {
      fsh.st = 'done'; fsh.isNew = !save.fc[f.id];
      save.fb[f.id] = (save.fb[f.id] || 0) + 1; save.fc[f.id] = (save.fc[f.id] || 0) + 1; persist(); hud();
      sfx(f.pr >= 900 ? 'rare' : 'sell');
      fishSay('Поймал: ' + f.n + (fsh.isNew ? ' (новая в коллекции!)' : '') + '. Продай улов в лавке рыбака за ' + fmtN(f.pr) + ' коинов.');
      if (fishCaughtAll() >= 25) ach('fish25');
      if (f.id === 'google') { ach('gfish'); toast('🌈 Ты поймал секретную рыбу: Гугл-фиш!', 6000); }
    } else { fsh.st = 'miss'; sfx('no'); fishSay('Сорвалась! Закинь ещё раз.'); }
    elFishBtn.textContent = fishBtnTxt();
  }

function fishStep(dt) {
    if (fsh.lock > 0) fsh.lock -= dt;
    fsh.bob += dt;
    if (fsh.st === 'wait') { fsh.t += dt; if (fsh.t >= fsh.wait) fishBiteStart(); }
    else if (fsh.st === 'bite') { fsh.t += dt; if (fsh.t >= fsh.win) { fsh.st = 'miss'; fsh.lock = 0.4; sfx('no'); fishSay('Не успел подсечь. Рыба ушла.'); elFishBtn.textContent = fishBtnTxt(); } }
    else if (fsh.st === 'fight') {
      var f = fsh.fish, S = catchSize() * (f.id === 'google' ? 0.75 : 1), d = f.d;
      fsh.cv += (fsh.hold ? 3.4 : -2.6) * dt; fsh.cv = Math.max(-1.1, Math.min(1.1, fsh.cv));
      fsh.cy += fsh.cv * dt;
      if (fsh.cy < S / 2) { fsh.cy = S / 2; fsh.cv = Math.abs(fsh.cv) * 0.25; }
      if (fsh.cy > 1 - S / 2) { fsh.cy = 1 - S / 2; fsh.cv = -Math.abs(fsh.cv) * 0.1; }
      fsh.fint -= dt;
      if (fsh.fint <= 0) {
        fsh.fint = (1.1 - 0.75 * d) * (0.6 + Math.random() * 0.8);
        fsh.ft = Math.max(0.07, Math.min(0.93, fsh.fy + (Math.random() * 2 - 1) * (0.3 + 0.7 * d)));
      }
      var vmax = 0.30 + 0.9 * d, df = fsh.ft - fsh.fy;
      fsh.fy += Math.sign(df) * Math.min(Math.abs(df), vmax * dt);
      if (d > 0.7) fsh.fy = Math.max(0.05, Math.min(0.95, fsh.fy + Math.sin(fsh.bob * 17) * 0.004 * d));
      var inside = Math.abs(fsh.fy - fsh.cy) < S / 2 + 0.02;
      var gain = (0.28 + 0.05 * save.fs.reel) * (f.id === 'google' ? 0.8 : 1), loss = Math.max(0.05, 0.16 - 0.015 * save.fs.reel) * (0.6 + d) * (f.id === 'google' ? 1.2 : 1);
      fsh.prog += (inside ? gain : -loss) * dt;
      if (fsh.prog >= 1) fishFinish(true); else if (fsh.prog <= 0) fishFinish(false);
    }
  }

function fishDraw() {
    var c = fcx, W = 320, Hh = 380, t0 = fsh.bob, i;
    var sg = c.createLinearGradient(0, 0, 0, Hh);
    if (fsh.sea) { sg.addColorStop(0, '#6fd8ee'); sg.addColorStop(1, '#0b5f9a'); } else { sg.addColorStop(0, '#8fe6ee'); sg.addColorStop(1, '#14879f'); }
    c.fillStyle = sg; c.fillRect(0, 0, W, Hh);
    c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 2;
    for (i = 0; i < 9; i++) { var wy = 20 + i * 42, wx = (i * 77 + t0 * 16) % 340 - 20; c.beginPath(); c.moveTo(wx, wy); c.quadraticCurveTo(wx + 20, wy - 6, wx + 40, wy); c.stroke(); }
    if (fsh.spot === 'rip') { for (i = 0; i < 4; i++) { c.strokeStyle = 'hsla(' + ((t0 * 90 + i * 70) % 360) + ',95%,65%,' + (0.7 - ((t0 * 0.7 + i * 0.25) % 1) * 0.6) + ')'; c.lineWidth = 3; c.beginPath(); c.ellipse(160, 190, 30 + ((t0 * 40 + i * 30) % 120), 12 + ((t0 * 14 + i * 10) % 45), 0, 0, 6.3); c.stroke(); } }
    var s = fsh.st;
    if (s === 'fight') {
      var TX = 100, TW = 110, TY = 16, TH = 348, f = fsh.fish, S = catchSize() * (f.id === 'google' ? 0.75 : 1);
      c.fillStyle = 'rgba(8,40,80,.45)'; c.fillRect(TX, TY, TW, TH);
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2; c.strokeRect(TX, TY, TW, TH);
      var by = TY + TH - (fsh.cy + S / 2) * TH, bh = S * TH;
      var inn = Math.abs(fsh.fy - fsh.cy) < S / 2 + 0.02;
      c.fillStyle = inn ? 'rgba(70,230,120,.62)' : 'rgba(70,230,120,.35)'; c.fillRect(TX + 2, by, TW - 4, bh);
      c.strokeStyle = '#2fbf6b'; c.lineWidth = 3; c.strokeRect(TX + 2, by, TW - 4, bh);
      fishArt(c, f.id, TX + TW / 2, TY + TH - fsh.fy * TH, 62, fsh.bob, false);
      c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(250, TY, 24, TH);
      var pg = Math.max(0, Math.min(1, fsh.prog)), pc = c.createLinearGradient(0, TY + TH, 0, TY);
      pc.addColorStop(0, '#e5484d'); pc.addColorStop(0.5, '#ffd23f'); pc.addColorStop(1, '#2fbf6b');
      c.fillStyle = pc; c.fillRect(250, TY + TH - pg * TH, 24, pg * TH);
      c.strokeStyle = '#fff'; c.lineWidth = 2; c.strokeRect(250, TY, 24, TH);
      c.fillStyle = '#fff'; c.font = '700 13px "Rubik", system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(f.id === 'google' ? '???' : f.n, 55, 40);
    } else if (s === 'done') {
      var fd = fsh.fish;
      c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.arc(160, 160, 100 + Math.sin(t0 * 3) * 5, 0, 6.3); c.fill();
      fishArt(c, fd.id, 160, 160 + Math.sin(t0 * 3) * 4, 190, t0, false);
      c.fillStyle = '#fff'; c.font = '700 22px "Russo One", Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.strokeStyle = '#0e2a4a'; c.lineWidth = 5; c.strokeText(fd.n, 160, 290); c.fillText(fd.n, 160, 290);
      c.font = '700 16px "Rubik", system-ui, sans-serif'; c.strokeText(fmtN(fd.pr) + ' коинов', 160, 322); c.fillText(fmtN(fd.pr) + ' коинов', 160, 322);
    } else {
      // поплавок
      var bx = 160, byy = 180 + Math.sin(t0 * 2.4) * 3, dip = (s === 'bite') ? 14 + Math.sin(t0 * 30) * 5 : 0;
      c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(260, -10); c.quadraticCurveTo(220, 60, bx, byy + dip - 12); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(bx, byy + dip + 8, 24, 6, 0, 0, 6.3); c.fill();
      c.fillStyle = '#e5484d'; c.beginPath(); c.arc(bx, byy + dip, 11, Math.PI, 0); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(bx, byy + dip, 11, 0, Math.PI); c.fill();
      if (s === 'bite') {
        c.fillStyle = '#ffe14a'; c.strokeStyle = '#7a1d1d'; c.lineWidth = 6; c.font = '700 80px "Russo One", Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.strokeText('!', bx, 90); c.fillText('!', bx, 90);
        var rem = Math.max(0, 1 - fsh.t / fsh.win); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(60, 330, 200, 10); c.fillStyle = '#ffe14a'; c.fillRect(60, 330, 200 * rem, 10);
      } else if (s === 'wait') {
        c.fillStyle = 'rgba(255,255,255,.85)'; c.font = '700 15px "Rubik", system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('Жди поклёвку' + '...'.slice(0, 1 + Math.floor(t0 * 2) % 3), 160, 300);
      }
    }
  }

function fishLoop(ts) {
    if (!fsh.open) return;
    var dt = fsh.last ? Math.min(0.05, (ts - fsh.last) / 1000) : 0.016; fsh.last = ts;
    fishStep(dt); fishDraw();
    fishRaf = requestAnimationFrame(fishLoop);
  }

function fsatNow() { var e = (+save.fsat || 0) - (Date.now() - (+save.fsatT || 0)) / 1000 * FSAT_COOL; return e > 0 ? e : 0; }

function fishMult() { return Math.max(0.5, 1 - fsatNow() / FSAT_CAP); }

function fishPayout(raw) { var e = fsatNow(), n = 24, sum = 0, i; for (i = 0; i < n; i++) sum += Math.max(0.5, 1 - (e + raw * (i + 0.5) / n) / FSAT_CAP); return Math.round(raw * sum / n); }

function fishValue(all) { var v = 0; for (var k in save.fb) if (all || !FISH_BY[k].secret) v += save.fb[k] * FISH_BY[k].pr; return v; }

function fsRow(name, lvl, max, desc, key, lockTxt) {
    var maxed = lvl >= max, cost = maxed ? 0 : fsCost(key), can = !maxed && !lockTxt && save.coins >= cost;
    return '<div class="fsrow"><div class="fsi"><b>' + name + '</b> <span class="fsl">' + (maxed ? 'максимум' : 'ур. ' + lvl + ' из ' + max) + '</span><div class="fsd">' + (lockTxt || desc) + '</div></div>' +
      '<button type="button" data-fa="up:' + key + '" class="fsb' + (can ? '' : ' no') + '"' + (maxed ? ' disabled' : '') + '>' + (maxed ? '✓' : fmtN(cost)) + '</button></div>';
  }

function subUpRow(k) {
    var inf = SUB_UP_INFO[k], l = save.fs[k], maxed = l >= 3, cost = maxed ? 0 : SUB_UP[k][l], can = !maxed && save.coins >= cost;
    return '<div class="fsrow"><div class="fsi"><b>' + inf[0] + '</b> <span class="fsl">' + (maxed ? 'максимум' : 'ур. ' + l + ' из 3') + '</span><div class="fsd">Сейчас: ' + inf[1](l) + (maxed ? '' : ' → ' + inf[1](l + 1)) + '. ' + inf[2] + '</div></div>' +
      '<button type="button" data-fa="sup:' + k + '" class="fsb' + (can ? '' : ' no') + '"' + (maxed ? ' disabled' : '') + '>' + (maxed ? '✓' : fmtN(cost)) + '</button></div>';
  }
