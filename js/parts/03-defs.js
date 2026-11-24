/* defs · 213 declarations · function p5Locked() { return p5.on && (p5.st === 'intro' || p5.st === 'clear' || p5.st === 'cine' || p5.st === 'end' ||  */

function p5Locked() { return p5.on && (p5.st === 'intro' || p5.st === 'clear' || p5.st === 'cine' || p5.st === 'end' || p5.st === 'rem' || p5.st === 'dlg'); }

function p5Start() {
    if (p5.on || save.mx.p5 >= 6 || !save.mx.fe) return;
    if (loc.i !== 11) { p5.auto = true; ltGo(11, 'left', p5AX() - 320); return; }
    p5Begin();
  }

function p5Begin(farm, force) {
    pfClear(); p5.assist = force != null; p5.cmb = 0; p5.hs = 0; p5.slo = 0; p5.hurtT = 0; p5.gh = 1;
    p5.auto = false; p5.on = true; p5.farm = !!farm; p5.stage = force != null ? force : (farm ? 7 : Math.min(5, (save.mx.p5 | 0)) + 1);
    p5.en = []; p5.es = []; p5.ps = []; p5.cov = []; p5.hom = null; p5.burg = []; p5.kills = 0; p5.rem = false; p5.fat = false; p5.pw = 1; p5.cd = 0; p5.scd = 0; p5.glit = 0; p5.flash = 0; p5.clones = false; p5.fade = 0; p5.line = ''; p5.ttlT = 0;
    P.x = p5AX() - 300; P.z = 0; P.vz = 0; P.vx = 0; hp = maxHp(); mgMana = mgCap(); iFrames = 1;
    document.body.classList.add('boss'); hero.on = false; heroT = 99; hp = maxHp();
    p5Stage(p5.stage);
  }

function p5End(why) {
    if (!p5.on) return;
    if (rr.on) rrOver(why);
    if (!p5.assist && partyOn() && partyHost() && (why === 'win' || why === 'faint' || why === 'leave' || why === 'uni')) storyEmit({ fe: why === 'uni' ? 'win' : why });
    if (p5.uni && partyOn()) { var wasPU = p5.uni; setTimeout(function () { if (wasPU) partySet(null); }, 600); }
    p5.assist = false;
    p5.on = false; p5.en = []; p5.es = []; p5.ps = []; p5.hom = null; p5.clones = false; p5.fade = 0; p5.glit = 0;
    document.body.classList.remove('boss'); elBossBar.hidden = true;
    if (why === 'faint') toast(p5.uni ? 'Вселенная тебя одолела (или взорвалась вместе с тобой). Ты очнулся у магазина. Вернись в новую лабораторию и попробуй снова.' : p5.farm ? 'Ты пал в бою. Поговори с Меллстроем, чтобы начать заново.' : 'Время рассыпалось. Поговори с Меллстроем в Палате 1, чтобы продолжить с этого места.', 6000);
    p5.farm = false; p5.uni = false; p5.bomb = null; P5_HW = 640;
  }

function mkEn(k, x, hpv, extra) { var e = { k: k, x: x, y: 0, hp: hpv, max: hpv, r: 60, cd: 1.5, st: '', t: 0, face: -1, fl: 0, vy: 0 }; for (var q in extra) e[q] = extra[q]; p5.en.push(e); return e; }

function p5Stage(n) {
    var AX = p5AX();
    if (!p5.assist && n < 8 && partyOn() && partyHost()) storyEmit({ fst: { f: p5.farm ? 1 : 0, st: n } });
    p5.stage = n; p5.en.length = 0; p5.es.length = 0; p5.cov.length = 0; p5.hom = null; p5.kills = 0; p5.wave = 0; p5.sp = 0; p5.sk = 4; p5.cols = []; p5.mt = 3;
    if (n === 8) { uniStage(); return; }
    if (n === 1) {
      p5.ar = 0; 
      mkEn('m', AX + 520, 150, { r: 70, name: 'Чикен Моггити', ph: 1, atk: '', aT: 0, dx: 0 });
      p5Cs('p5a', function () { p5Title('ЧАСТЬ 5', 'Время глючит', 2.5); });
    } else if (n === 2) {
      p5.ar = 2; 
      p5.cov.push({ x: AX - 330, w: 70, h: 120 }, { x: AX + 330, w: 70, h: 120 });
      mkEn('m', AX - 90, 9999, { r: 70, name: 'Чикен Моггити', ghost: true });
      p5Cs('p5b');
    } else if (n === 3) {
      p5.ar = 3; p5.need = 30; 
      mkEn('m', AX + 420, 9999, { r: 70, name: 'Чикен Моггити', ghost: true, hover: true });
      p5Cs('p5c', function () { p5Title('ЖИР vs ЧИКЕН ГАН', 'Битва территорий', 2.5); });
    } else if (n === 7) {
      p5.ar = 3; p5.need = 50; p5Title('ЧАЛО ХАУС', 'Победи 50 чикен ганнеров', 3); p5Go('intro');
    } else if (n === 4) { p5.ar = 2; p5Cs('p5d1', p5Stage4); }
    else if (n === 5) {
      p5.ar = 4; p5.clones = true; p5Title('ВНУТРИ ПЕТЛИ', 'Хоумлендер-Петля', 3.5); p5Say('Кокич прыгает в тело Хоумлендера и бьётся изнутри…', 4);
      var bsE = mkEn('bs', AX + 450, 220, { r: 85, name: 'Хоумлендер-Петля', ph: 1, atk: '', aT: 0 });
      if (save.mx.mgo === 2) { bsE.hp = bsE.max = 290; bsE.name = 'Хоумлендер-Петля + Моггити'; p5Title('МОГГИТИ ПРЫГАЕТ В ХОУМЛЕНДЕРА', 'Молча. Хоумлендер стал сильнее', 4); p5Say('Моггити молча прыгает в Хоумлендера. Тот стал сильнее! Бей его, Кокич!', 5); }
      if (save.mx.mgo === 2) p5Cs('p5mogjump', function () { p5Go('intro'); }); else p5Go('intro');
    } else if (n === 6) {
      p5.ar = 4;
      var ml = 'Моггити остался внутри петли навсегда. Он так и не сказал ни слова.', mi = P5_END.indexOf(ml);
      if (save.mx.mgo === 2 && mi < 0) P5_END.splice(1, 0, ml); else if (save.mx.mgo !== 2 && mi >= 0) P5_END.splice(mi, 1);
      if (save.mx.mgo === 2) p5Cs('p5mogend', function () { p5Go('end'); p5.endI = 0; p5.endT = 0; }); else { p5Go('end'); p5.endI = 0; p5.endT = 0; }
    }
  }

function p5Stage4() { p5Go('dlg'); if (!p5.assist) p5Ask(); }

function p5Ask() {
    dlgShow('Кокич', null, 'Моггити нестабилен. Сейчас можно нанести решающий удар.', [
      { t: 'Нанести удар!', fn: p5Strike }, { t: 'Подождать', fn: function () { p5Say('Профессор: Ждать нельзя, время глючит всё сильнее!', 3); p5Strike(); } }
    ]);
  }

function p5Strike() {
    if (!p5.on || p5.st !== 'dlg') return;
    dlgClose(); p5Go('cs'); csPlay('p5d2', function () { p5.clones = true; p5Done(4); p5Stage(5); });
  }

function p5Done(n) { if (p5.assist) return; save.mx.p5 = Math.max(save.mx.p5 | 0, n); persist(); sfx('rare'); }

function p5Dmg(n) { return n * p5.pw * (p5.fat ? 4 : 1) * (p5.stage === 5 && !p5.rem ? 0.6 : 1); }

function p5Fire() {
    if (gh.on || !p5.on || p5.cd > 0 || p5Locked() || p5.st !== 'fight' || cs.on || paused) return;
    p5.cd = 0.26; var d = P.face >= 0 ? 1 : -1; sfx('jump'); pfFlash(P.x + d * 52, gY - 78 - P.z, 34, '#ffd23f', 0.12); pfSparkDir(P.x + d * 52, gY - 78 - P.z, 5, '#fff3a0', d, 520, 0.25); pfCasing(P.x + d * 20, gY - 84 - P.z, d);
    p5.ps.push({ x: P.x + d * 40, y: gY - 78 - P.z, vx: d * 980, dmg: (2 + gymLvl() + (p5.fat ? 2 : 0)) * rvM(), life: 1.1, big: false });
  }

function p5Special() {
    if (gh.on || !p5.on || p5Locked() || p5.st !== 'fight' || cs.on || paused || p5.scd > 0) return;
    if (mgMana < mgC(30)) { if (mgNoManaT <= 0) { mgNoManaT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Магия копит силу', '#ff9a9a'); } return; }
    mgMana -= mgC(30); p5.scd = 0.6; var d = P.face >= 0 ? 1 : -1; sfx('boom'); shk = Math.max(shk, 0.45); pfFlash(P.x + d * 52, gY - 78 - P.z, 90, '#b58cff', 0.3); pfRing(P.x + d * 40, gY - 78 - P.z, 140, '#e6d2ff', 0.4); pfSparkDir(P.x + d * 52, gY - 78 - P.z, 16, '#e6d2ff', d, 760, 0.5); pfWave(P.x, gY, 220, '#b58cff', 0.45);
    p5.ps.push({ x: P.x + d * 40, y: gY - 78 - P.z, vx: d * 1300, dmg: (14 + gymLvl() * 2 + (p5.fat ? 14 + 4 * skLvl(0) : 0) + (mgFat > 0 ? (mgFatB ? 22 : 12) : 0)) * rvM(), life: 1.2, big: true });
  }

function p5Hurt(n) {
    if (iFrames > 0 || hp <= 0) return;
    if (p5.uni) n = Math.max(1, Math.floor(n * (U_DM[p5.uv] || 1) + Math.random()));
    if (p5.stage === 5 && !p5.rem && hp - n <= maxHp() * 0.12) { p5Remember(); return; }
    iFrames = 0.8; hurt(n); p5.hurtT = 0.7; p5.cmb = 0; p5.cmbT = 0; shk = Math.max(shk, 0.5); pfSpark(P.x, pY(), 16, '#ff5a5a', 480, 0.5, 3); pfFlash(P.x, pY(), 60, '#ff3040', 0.25); pfRing(P.x, pY(), 100, '#ff6070', 0.35);
  }

function p5Remember() {
    p5.rem = true; hp = Math.max(1, Math.round(maxHp() * 0.12)); iFrames = 3; p5.es.length = 0;
    p5Go('cs'); sfx('boom'); shk = 1;
    csPlay('p5rem', function () { p5.fat = true; hp = maxHp(); mgMana = mgCap(); p5.flash = 1; iFrames = 2; sfx('rare'); shk = 0.8; ring(P.x, gY - 80, 260, '#ffd23f'); ring(P.x, gY - 80, 140, '#b58cff'); p5Go('fight'); });
  }

function eShot(x, y, vx, vy, dmg, col, r) { p5.es.push({ x: x, y: y, vx: vx, vy: vy, dmg: dmg, col: col || '#ff6bd0', r: r || 12, t: 0 }); }

function pY() { return gY - 60 - P.z; }

function coverBetween(hx) {
    for (var i = 0; i < p5.cov.length; i++) { var c = p5.cov[i]; if (((c.x > P.x && c.x < hx) || (c.x < P.x && c.x > hx)) && Math.abs(c.x - P.x) < 170) return true; }
    return false;
  }

function p5Kill(e) {
    var AX = p5AX();
    var big = e.k === 'm' || e.k === 'bs' || e.k === 'kk', ky = gY - (big ? 100 : 50) - (e.y || 0);
    burst(e.x, gY - 60, 14, '#ffd23f', 300, 0.7); sfx('sell'); p5.kills++;
    if (p5.assist && partyOn()) storyEmit({ pk: 1 });
    pfFlash(e.x, ky, big ? 220 : 100, big ? '#ffffff' : '#ffd23f', big ? 0.55 : 0.32); pfRing(e.x, ky, big ? 360 : 180, '#ffd23f', big ? 0.7 : 0.45); pfWave(e.x, gY, big ? 420 : 200, '#ff9a3c', 0.6);
    pfSpark(e.x, ky, big ? 60 : 26, '#ffd23f', big ? 900 : 560, big ? 1 : 0.7, 3); pfSpark(e.x, ky, big ? 30 : 10, '#ff6b6b', 600, 0.8, 4); pfDust(e.x, gY, big ? 12 : 5, 70);
    shk = Math.max(shk, big ? 1 : 0.35); p5.slo = Math.max(p5.slo, big ? 1.0 : 0.22);
    if (e.k === 'gun' && Math.random() < 0.35) p5.burg.push({ x: e.x, t: 0 });
    if (e.k === 'min') popup(e.x, 120, 'MOGGED', '#ff3030');
  }

function p5Update(dt) {
    pfUpdate(dt);
    if (!p5.on) {
      partyTick();
      if (p5.auto && loc.i === 11 && !lt.st && !dlgOpened) p5Begin();
      return;
    }
    if (loc.i !== (p5.uni ? UNI : (p5.farm ? 15 : 11))) { p5End('leave'); return; }
    var AX = p5AX(), i, e, s, j;
    if (p5.hs > 0) { p5.hs -= dt; dt *= 0.06; } else if (p5.slo > 0) { p5.slo -= dt; dt *= 0.3; }
    p5.t += dt; if (p5.cd > 0) p5.cd -= dt; if (p5.scd > 0) p5.scd -= dt; if (p5.glit > 0) p5.glit -= dt; if (p5.flash > 0) p5.flash -= dt * 1.5;
    if (p5.ttlT > 0) p5.ttlT -= dt; if (p5.lineT > 0) p5.lineT -= dt;
    if (p5Locked()) { input.left = input.right = false; input.up = false; P.vx = 0; }
    // страховка от зависаний: диалог закрыли (Esc) или сцена оборвалась, а бой не продолжился
    if (p5.st === 'dlg' && !dlgOpened && !cs.on && !lt.st) { p5.dw = (p5.dw || 0) + dt; if (p5.dw > 0.15) { p5.dw = 0; if (p5.stage === 4) { if (!p5.assist) p5Ask(); } else p5Go('fight'); } } else p5.dw = 0;
    if (p5.st === 'cs' && !cs.on) { p5.cw = (p5.cw || 0) + dt; if (p5.cw > 0.8) { p5.cw = 0; if (p5.stage === 4) p5Stage4(); else p5Go('fight'); } } else p5.cw = 0;
    if (hp < maxHp() && !p5Locked()) hp = Math.min(maxHp(), hp + dt * 0.8);
    P.x = Math.max(AX - P5_HW, Math.min(AX + P5_HW, P.x));
    // этапы-сцены
    if (p5.st === 'intro') { p5.bar = Math.min(1, p5.bar + dt * 2); if (p5.t > 4) { p5Go('fight'); p5.bar = 0; if (p5.stage === 5) p5Say('Боль! Кокич держится изо всех сил!', 3); } }
    else if (p5.st === 'clear') {
      if (p5.t > 3 && !p5.assist) {
        if (p5.stage === 7) { farmWarWin(); return; }
        p5Done(p5.stage);
        if (p5.stage === 4) p5Stage(5); else if (p5.stage === 5) p5Stage(6); else p5Stage(p5.stage + 1);
      }
    } else if (p5.st === 'cine') {
      p5.mx += dt; p5.clones = p5.mx > 2.5;
      if (p5.mx > 3 && p5.mx < 3.3) p5Say('Петля меняется: теперь здесь 1000 клонов Хоумлендера!', 4);
      if (p5.mx > 7 && p5.mx < 7.3) p5Say('Кокич: Я прыгну в него и остановлю всё изнутри!', 3.5);
      if (p5.mx > 10) { p5.fade = Math.min(1, (p5.mx - 10) / 1.2); }
      if (p5.mx > 11.5) { p5.fade = 0; p5Done(4); p5Stage(5); }
    } else if (p5.st === 'rem') {
      if (p5.t < 0.2) p5Say('Кокич падает… Бой проигран.', 2.5);
      if (p5.t > 2.6 && p5.t < 2.8) p5Say('Кокич: Нет. Я помню, что делал до этого пути.', 3);
      if (p5.t > 5.4 && p5.t < 5.6) { p5Say('Кокич: ЖИР-ТЕРРИТОРИЯ!', 3); p5.fat = true; hp = maxHp(); mgMana = mgCap(); p5.flash = 1; sfx('rare'); shk = 0.8; ring(P.x, gY - 80, 260, '#ffd23f'); ring(P.x, gY - 80, 140, '#b58cff'); }
      if (p5.t > 8) { p5Go('fight'); iFrames = 1.5; }
    } else if (p5.st === 'end') {
      p5.bar = 1; p5.endT += dt; var per = p5.endI === P5_END.length - 1 ? 8 : 5.5;
      if (p5.endT >= per) { p5.endT = 0; p5.endI++; if (p5.endI >= P5_END.length) { p5Finish(); return; } }
    }
    // игрок: выстрелы
    for (i = p5.ps.length - 1; i >= 0; i--) {
      s = p5.ps[i]; s.x += s.vx * dt; s.life -= dt; var hit = false;
      for (j = 0; j < p5.en.length && !hit; j++) {
        e = p5.en[j]; if (e.ghost || e.dead || p5.st !== 'fight') continue;
        if (s.big) { s.hs = s.hs || []; if (s.hs.indexOf(e) >= 0) continue; }
        if (Math.abs(s.x - e.x) < e.r && Math.abs(s.y - (gY - e.r - (e.y || 0))) < e.r + 30) {
          hit = true; if (s.big) s.hs.push(e); var dmgH = p5Dmg(s.dmg); if ((e.k === 'm' || e.k === 'bs' || e.k === 'kk') && e.max >= 60) dmgH = Math.min(dmgH, Math.max(2, e.max * 0.06)); e.hp -= dmgH; e.fl = 0.15; if (p5.assist && e.k === 'kk' && e.hp < 1) e.hp = 1; if (p5.assist && (e.k === 'm' || e.k === 'bs' || e.k === 'kk')) storyEmit({ pd: Math.round(dmgH) }); pfHit(s.x, s.y, s.big, s.vx > 0 ? 1 : -1); popup(e.x, e.r * 2 + (e.y || 0), '−' + Math.round(dmgH), '#ff9a9a'); sfx('pick');
          if (e.hp <= 0) { e.dead = true; p5Kill(e); }
        }
      }
      if (hit && !s.big || s.life <= 0 || Math.abs(s.x - AX) > P5_HW + 400) p5.ps.splice(i, 1);
    }
    for (i = p5.en.length - 1; i >= 0; i--) if (p5.en[i].dead && p5.en[i].k !== 'm' && p5.en[i].k !== 'bs' && p5.en[i].k !== 'kk') p5.en.splice(i, 1);
    if (p5.st === 'fight') p5Ai(dt);
    // снаряды врагов
    for (i = p5.es.length - 1; i >= 0; i--) {
      s = p5.es[i]; if (!s) continue; s.t += dt; s.x += s.vx * dt; s.y += s.vy * dt;
      if (Math.abs(s.x - P.x) < s.r + 22 && Math.abs(s.y - pY()) < s.r + 50 && p5.st === 'fight') { p5Hurt(s.dmg); p5.es.splice(i, 1); continue; }
      if (s.t > 4 || s.y > gY + 40 || Math.abs(s.x - AX) > P5_HW + 500) p5.es.splice(i, 1);
    }
    // бургеры
    for (i = p5.burg.length - 1; i >= 0; i--) { var bg = p5.burg[i]; bg.t += dt; if (Math.abs(bg.x - P.x) < 50 && P.z < 60) { hp = Math.min(maxHp(), hp + 12); mgMana = Math.min(mgCap(), mgMana + 25); p5.pw = Math.min(2, p5.pw + 0.06); sfx('gulp'); popup(bg.x, 90, 'ЖИР +', '#ffd23f'); p5.burg.splice(i, 1); } else if (bg.t > 12) p5.burg.splice(i, 1); }
  }

function p5Ai(dt) {
    var AX = p5AX(), i, e, k, dx;
    if (p5.stage === 8) { uniAi(dt); if (!p5.on) return; }
    var m = null, bs = null; for (i = 0; i < p5.en.length; i++) { if (p5.en[i].k === 'm') m = p5.en[i]; if (p5.en[i].k === 'bs') bs = p5.en[i]; }
    // ---- этап 1: Моггити по разным локациям ----
    if (p5.stage === 1 && m) {
      m.fl = Math.max(0, m.fl - dt); m.cd -= dt; dx = P.x - m.x; m.face = dx > 0 ? 1 : -1;
      var r0 = m.hp / m.max, ph = r0 > 0.7 ? 1 : (r0 > 0.4 ? 2 : (r0 > 0.15 ? 3 : 4));
      if (ph > m.ph) { m.ph = ph; p5.ar = ph === 2 ? 1 : (ph === 3 ? 2 : 0); p5.glit = 1.2; p5.flash = 0.9; sfx('boom'); shk = 1; m.x = AX + (P.x < AX ? 480 : -480); m.atk = ''; m.cd = 1; p5.es.length = 0; p5Title('ФАЗА ' + ph, ph === 2 ? 'Крыша здания' : (ph === 3 ? 'Улицы города' : 'Ярость времени'), 2.5); p5Say(ph === 2 ? 'Время дёргается: вы на крыше здания!' : (ph === 3 ? 'Глюк! Теперь вы на улице города!' : 'Время рвётся на куски! Моггити в ярости!'), 3.2); }
      var spd = 1 + (ph - 1) * 0.22;
      if (m.atk === 'dash') { m.aT -= dt; if (m.aT > 0.5) { } else if (m.aT > 0) { m.x += m.dx * 900 * dt; } else m.atk = ''; if (Math.abs(m.x - P.x) < 75 && P.z < 80) { p5Hurt(24); m.atk = ''; } }
      else if (m.atk === 'wave') { m.aT -= dt; if (m.aT <= 0) { eShot(m.x, gY - 26, m.face * 480, 0, 18, '#9bff4f', 24); pfFlash(m.x + m.face * 40, gY - 40, 70, '#9bff4f', 0.25); pfSparkDir(m.x + m.face * 40, gY - 40, 10, '#d6ff9a', m.face, 520, 0.4); if (ph >= 3) eShot(m.x, gY - 26, -m.face * 480, 0, 18, '#9bff4f', 24); m.atk = ''; shk = Math.max(shk, 0.25); } }
      else if (m.atk === 'orbs') { m.aT -= dt; if (m.aT <= 0) { var nn = ph >= 3 ? 2 : 1; for (k = -nn; k <= nn; k++) { var ang = Math.atan2(pY() - (gY - 90), P.x - m.x) + k * 0.2; eShot(m.x, gY - 90, Math.cos(ang) * 470, Math.sin(ang) * 470, 12, '#ff6bd0', 11); } m.atk = ''; sfx('jump'); pfFlash(m.x, gY - 90, 80, '#ff6bd0', 0.25); pfRing(m.x, gY - 90, 130, '#ff6bd0', 0.35); } }
      else if (m.atk === 'rain') { m.aT -= dt; m.rt = (m.rt || 0) - dt; if (m.rt <= 0) { m.rt = 0.16; eShot(AX - P5_HW + Math.random() * P5_HW * 2, gY - 560, 0, 380, 12, '#ff6bd0', 12); } if (m.aT <= 0) m.atk = ''; }
      else if (m.atk === 'slam') { m.aT -= dt; if (m.aT > 0.45) m.y = Math.sin((1 - (m.aT - 0.45) / 0.55) * 3.14) * 190; else { m.y = 0; if (!m.slm) { m.slm = true; eShot(m.x, gY - 24, -520, 0, 20, '#ffcf4a', 26); eShot(m.x, gY - 24, 520, 0, 20, '#ffcf4a', 26); shk = Math.max(shk, 0.8); sfx('boom'); pfWave(m.x, gY, 380, '#ffcf4a', 0.6); pfWave(m.x, gY, 220, '#fff', 0.4); pfDust(m.x, gY, 12, 120); pfSpark(m.x, gY - 6, 20, '#ffcf4a', 520, 0.6, 3); pfFlash(m.x, gY - 20, 90, '#ffcf4a', 0.25); } } if (m.aT <= 0) { m.atk = ''; m.slm = false; m.y = 0; } }
      else if (m.atk === 'blink') { m.aT -= dt; if (m.aT <= 0) { m.x = Math.max(AX - P5_HW + 40, Math.min(AX + P5_HW - 40, P.x + (Math.random() < 0.5 ? -1 : 1) * 160)); ring(m.x, gY - 70, 80, '#ff6bd0'); p5.glit = 0.3; pfFlash(m.x, gY - 70, 120, '#ff6bd0', 0.3); pfSpark(m.x, gY - 70, 24, '#ffd0f0', 520, 0.5, 2.5); pfRing(m.x, gY - 70, 180, '#ff6bd0', 0.4); m.atk = 'dash'; m.dx = P.x > m.x ? 1 : -1; m.aT = 0.6; } }
      else {
        if (Math.abs(dx) > 180) m.x += m.face * 170 * spd * dt;
        if (m.cd <= 0) { k = Math.random(); m.cd = (1.15 + Math.random() * 0.7) / spd; var pool = ph === 1 ? ['dash', 'wave', 'orbs'] : (ph === 2 ? ['dash', 'wave', 'orbs', 'slam', 'blink'] : ['dash', 'wave', 'orbs', 'slam', 'blink', 'rain']); var at = pool[Math.floor(Math.random() * pool.length)]; m.atk = at; m.slm = false;
          if (at === 'dash') { m.aT = 0.95; m.dx = m.face; popup(m.x, 190, '!', '#ff6b6b'); } else if (at === 'wave') { m.aT = 0.5; popup(m.x, 190, 'MOG', '#9bff4f'); } else if (at === 'orbs') m.aT = 0.45; else if (at === 'rain') { m.aT = 2.4; m.rt = 0; popup(m.x, 190, 'ДОЖДЬ', '#ff6bd0'); } else if (at === 'slam') { m.aT = 1.0; popup(m.x, 210, 'ПРЫГАЙ', '#ffcf4a'); } else { m.aT = 0.5; } }
      }
      m.x = Math.max(AX - P5_HW + 40, Math.min(AX + P5_HW - 40, m.x));
      if (m.dead) { p5.es.length = 0; p5Go('clear'); p5Say('Моггити исчезает в глюке. Но время всё ещё трещит…', 3.5); }
    }
    // ---- этап 2: укрытия, остатки Хоумлендера, друзья Моггити ----
    if (p5.stage === 2) {
      if (!p5.hom && p5.t > 3) { p5.hom = { x: AX + 600, cd: 2, tel: 0, band: 0 }; p5Say('Остаток Хоумлендера: Где я?! Что происходит?! (стреляет во все стороны)', 4); p5.glit = 0.6; sfx('boom'); }
      if (p5.hom) {
        var h = p5.hom; h.cd -= dt;
        if (h.tel > 0) { h.tel -= dt; if (h.tel <= 0) { if (!coverBetween(h.x) && (h.band === 2 || (h.band === 0 && P.z < 70) || (h.band === 1 && P.z >= 40))) p5Hurt(24); ring(P.x, pY(), 60, '#ff3030'); shk = Math.max(shk, 0.45); sfx('boom'); pfBolt(h.x, gY - 140, gY - 40, '#ff6b6b'); pfFlash(AX - P5_HW - 60, gY - 40, 90, '#ff3030', 0.3); pfSpark(P.x, pY(), 14, '#ffb0a0', 500, 0.4, 2.5); } }
        else if (h.cd <= 0) { h.cd = 1.7 + Math.random() * 0.4; h.tel = 0.7; h.band = Math.random() < 0.35 ? 2 : (Math.random() < 0.5 ? 0 : 1); sfx('no'); }
      }
      p5.mt -= dt; var gm = null; for (i = 0; i < p5.en.length; i++) if (p5.en[i].k === 'm') gm = p5.en[i];
      if (gm && p5.mt <= 0 && p5.t > 5) { p5.mt = 3.2; for (k = -1; k <= 1; k++) { var ag = Math.atan2(pY() - (gY - 90), P.x - gm.x) + k * 0.3; eShot(gm.x, gY - 90, Math.cos(ag) * 400, Math.sin(ag) * 400, 11, '#ff6bd0', 11); } }
      if (p5.wave === 0 && p5.t > 4) { p5.wave = 1; p5Summon(3); p5Say('Моггити зовёт друзей на помощь!', 3); }
      if (p5.wave === 1 && p5.kills >= 3) { p5.wave = 2; p5Summon(4); p5Say('Подкрепление! Ещё друзья Моггити!', 3); }
      if (p5.wave === 2 && p5.kills >= 7) { p5.wave = 3; p5Summon(5); p5Title('ПОСЛЕДНЯЯ ВОЛНА', '', 2); }
      if (p5.wave === 3 && p5.kills >= 12) { p5.hom = null; p5.es.length = 0; p5Go('clear'); p5Say('Остаток Хоумлендера растворился. Он сам не понял, что это было.', 4); }
    }
    if (p5.stage === 3 || p5.stage === 7) {
      p5.sp -= dt; var alive = 0; for (i = 0; i < p5.en.length; i++) if (p5.en[i].k === 'gun') alive++;
      if (p5.sp <= 0 && alive < 8 && p5.kills < p5.need) { p5.sp = 1.0; mkEn('gun', AX - P5_HW + 60 + Math.random() * (P5_HW * 2 - 120), 2, { r: 40, y: 560, vy: 0, cd: 1.2, st: 'fall' }); }
      p5.sk -= dt;
      if (p5.sk <= 0) { p5.sk = 6.5; var cx0 = Math.max(AX - P5_HW + 40, Math.min(AX + P5_HW - 40, P.x)); for (k = 0; k < 5; k++) p5.cols.push({ x: (k === 0 ? cx0 : AX - P5_HW + Math.random() * P5_HW * 2), t: 1.2 }); sfx('no'); popup(cx0, 240, 'ЧИКЕН ГАН!', '#6bc4ff'); }
      for (i = p5.cols.length - 1; i >= 0; i--) { var cl = p5.cols[i]; cl.t -= dt; if (cl.t <= 0) { if (Math.abs(P.x - cl.x) < 48) p5Hurt(22); ring(cl.x, gY - 20, 70, '#6bc4ff'); shk = Math.max(shk, 0.3); pfBolt(cl.x, gY - 620, gY, '#bfe6ff'); pfWave(cl.x, gY, 200, '#6bc4ff', 0.45); pfSpark(cl.x, gY - 6, 16, '#bfe6ff', 480, 0.5, 2.5); pfFlash(cl.x, gY - 12, 80, '#6bc4ff', 0.25); pfDust(cl.x, gY, 6, 60); p5.cols.splice(i, 1); } }
      if (p5.kills >= p5.need) { p5.es.length = 0; p5.cols.length = 0; for (i = 0; i < p5.en.length; i++) if (p5.en[i].k === 'gun') p5.en[i].dead = true; p5Go('clear'); p5Say(p5.stage === 7 ? 'Все 50 чикен ганнеров повержены.' : 'Территория жира победила: Моггити глючит и мерцает!', 4); }
    }
    // враги-подчинённые
    for (i = 0; i < p5.en.length; i++) {
      e = p5.en[i]; if (e.dead) continue; e.fl = Math.max(0, e.fl - dt);
      if (e.k === 'min') {
        dx = P.x - e.x; e.face = dx > 0 ? 1 : -1; e.cd -= dt;
        if (Math.abs(dx) > 70) e.x += e.face * 190 * dt; else if (e.cd <= 0) { e.cd = 1.2; p5Hurt(11); }
      } else if (e.k === 'gun') {
        if (e.st === 'fall') { e.y -= (260 + 40) * dt; if (e.y <= 0) { e.y = 0; e.st = 'shoot'; pfDust(e.x, gY, 7, 60); pfWave(e.x, gY, 120, '#6bc4ff', 0.4); pfSpark(e.x, gY - 4, 8, '#ffd23f', 360, 0.4, 2.5); shk = Math.max(shk, 0.15); } else if (Math.random() < 0.6) pfGlowP(e.x + (Math.random() - 0.5) * 20, gY - e.y - 40, 0, -80, 10, '#fff', 0.3, 0); }
        else { e.cd -= dt; e.face = P.x > e.x ? 1 : -1; if (e.cd <= 0) { e.cd = 1.4 + Math.random() * 1.0; var an = Math.atan2(pY() - (gY - 60), P.x - e.x); pfFlash(e.x + e.face * 36, gY - 40, 46, '#ffd23f', 0.14); pfCasing(e.x, gY - 50, e.face); for (var gk = -1; gk <= 1; gk += 2) eShot(e.x, gY - 60, Math.cos(an + gk * 0.1) * 420, Math.sin(an + gk * 0.1) * 420, 9, '#ffd23f', 9); } }
      } else if (e.k === 'bs') {
        p5BossAi(e, dt);
      }
    }
    if (p5.stage === 5 && bs && bs.dead) { p5.es.length = 0; p5.clones = false; p5Go('clear'); p5Say('Хоумлендер-Петля рассыпается. Кокич выталкивает Моггити обратно!', 4); p5.flash = 1; }
  }

function p5Summon(n) {
    var AX = p5AX();
    for (var q = 0; q < n; q++) { var sx = q % 2 ? AX + P5_HW - 60 - q * 40 : AX - P5_HW + 60 + q * 40; mkEn('min', sx, 5, { r: 48 }); ring(sx, gY - 40, 70, '#ff6bd0'); }
    sfx('boom');
  }

function p5BossAi(e, dt) {
    var AX = p5AX(), dx = P.x - e.x, k, ang, r = e.hp / e.max;
    e.face = dx > 0 ? 1 : -1; e.cd -= dt;
    var ph = p5.rem ? (r > 0.5 ? 2 : 3) : 1, spd = 1 + (ph - 1) * 0.2;
    if (p5.rem && ph > (e.ph || 1)) { e.ph = ph; p5Title('ФАЗА ' + ph, '', 2); p5.glit = 0.8; shk = 0.8; sfx('boom'); }
    if (Math.abs(dx) > 220) e.x += e.face * 130 * spd * dt;
    e.x = Math.max(AX - P5_HW + 60, Math.min(AX + P5_HW - 60, e.x));
    if (e.atk === 'orbs') { e.aT -= dt; if (e.aT <= 0) { var nf = ph >= 2 ? 3 : 2; for (k = -nf; k <= nf; k++) { ang = Math.atan2(pY() - (gY - 120), P.x - e.x) + k * 0.18; eShot(e.x, gY - 120, Math.cos(ang) * 480, Math.sin(ang) * 480, 13, '#ff3030', 12); } e.atk = ''; sfx('boom'); shk = Math.max(shk, 0.35); pfFlash(e.x, gY - 120, 110, '#ff3030', 0.3); pfRing(e.x, gY - 120, 180, '#ff6b6b', 0.4); pfSpark(e.x, gY - 120, 18, '#ffb0a0', 560, 0.5, 2.5); } }
    else if (e.atk === 'stomp') { e.aT -= dt; if (e.aT <= 0) { eShot(e.x, gY - 24, -500, 0, 20, '#ff9a3c', 26); eShot(e.x, gY - 24, 500, 0, 20, '#ff9a3c', 26); if (ph >= 2) { eShot(e.x, gY - 24, -330, 0, 20, '#ffcf4a', 26); eShot(e.x, gY - 24, 330, 0, 20, '#ffcf4a', 26); } e.atk = ''; shk = Math.max(shk, 0.8); sfx('boom'); pfWave(e.x, gY, 420, '#ff9a3c', 0.6); pfWave(e.x, gY, 240, '#fff', 0.4); pfDust(e.x, gY, 14, 140); pfSpark(e.x, gY - 6, 26, '#ffcf4a', 600, 0.7, 3); pfFlash(e.x, gY - 20, 110, '#ff9a3c', 0.28); } }
    else if (e.atk === 'clones') { e.aT -= dt; if (e.aT <= 0) { for (k = 0; k < (ph >= 2 ? 6 : 4); k++) eShot(AX - P5_HW + Math.random() * P5_HW * 2, gY - 560, 0, 360, 12, '#ffd23f', 14); e.atk = ''; } }
    else if (e.atk === 'sweep') { e.aT -= dt; e.sw = (e.sw || 0) + dt; if (e.aT <= 0.9 && e.aT > 0) { if (P.z < 60 && Math.abs(P.x - e.x) < 760 && ((P.x < e.x) === (e.face < 0)) && !coverBetween(e.x)) p5Hurt(8); shk = Math.max(shk, 0.2); } if (e.aT <= 0) e.atk = ''; }
    else if (e.cd <= 0) { k = Math.random(); e.cd = (p5.fat ? 1.5 : 1.15) / spd; if (k < 0.3) { e.atk = 'orbs'; e.aT = 0.55; popup(e.x, 240, '!', '#ff6b6b'); } else if (k < 0.55) { e.atk = 'stomp'; e.aT = 0.55; popup(e.x, 240, 'ПРЫГАЙ', '#ff9a3c'); } else if (k < 0.8) { e.atk = 'clones'; e.aT = 0.5; popup(e.x, 240, 'КЛОНЫ', '#ffd23f'); } else { e.atk = 'sweep'; e.aT = 1.6; e.sw = 0; popup(e.x, 240, 'ЛАЗЕР', '#ff3030'); } }
    if (!p5.rem && e.hp <= e.max * 0.7) { e.hp = e.max * 0.7; p5Remember(); }
  }

function p5Finish() {
    if (p5.assist) { p5End('leave'); return; }
    save.mx.p5 = 6; save.mx.p6q = 1; if (!save.mx.p5r) { save.mx.p5r = 1; save.coins += 100000; } persist(); hud(); ach('fin5'); sfx('rare');
    p5End('win');
    setTimeout(function () { if (!p5.on && !cs.on && !p6.on) p6Start(); }, 2800);
    toast('Конец 5 части! +100 000 коинов (только за первое прохождение). Всё изменилось: чекушки теперь просто напиток, а Кокич остался во временной петле. Часть 6 начинается прямо сейчас. Потом её можно повторить у Меллстроя (раздел «Сюжет»).', 11000);
  }

function p5Glitch() {
    var n = p5.glit > 0 ? 9 : 2, i;
    for (i = 0; i < n; i++) { ctx.fillStyle = Math.random() < 0.5 ? 'rgba(0,255,255,.16)' : 'rgba(255,0,200,.14)'; ctx.fillRect(0, Math.random() * H, W, 3 + Math.random() * (p5.glit > 0 ? 40 : 10)); }
  }

function drawP5Back() {
    var AX = p5AX(), i, x0 = camX - 20, x1 = camX + vw + 20;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H), a = p5.ar;
    if (a === 0) { g.addColorStop(0, '#2a1458'); g.addColorStop(1, '#8a5ac8'); }
    else if (a === 1) { g.addColorStop(0, '#1b2a55'); g.addColorStop(1, '#e08a5a'); }
    else if (a === 2) { g.addColorStop(0, '#16213a'); g.addColorStop(1, '#58406e'); }
    else if (a === 3) { g.addColorStop(0, '#2b0f3d'); g.addColorStop(1, '#0f2a58'); }
    else { g.addColorStop(0, '#2a0508'); g.addColorStop(1, '#5a1020'); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (a === 0) { ctx.fillStyle = 'rgba(255,255,255,.35)'; for (i = 0; i < 8; i++) { var cx = ((i * 331 + t * 14) % (W + 300)) - 150; ctx.beginPath(); ctx.ellipse(cx, 80 + (i * 67) % 240, 120, 28, 0, 0, 6.3); ctx.fill(); } }
    if (a === 1 || a === 2) { parallaxSkyline(0.25, 20, 170, 200, a === 1 ? '#3a3560' : '#2a2850', 7); parallaxSkyline(0.45, 8, 120, 200, a === 1 ? '#2a2548' : '#1e1c3a', 19); }
    setCam(1);
    if (a === 0) { ctx.fillStyle = '#d8c8f0'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = '#fff'; ctx.fillRect(x0, gY - 2, x1 - x0, 6); }
    else if (a === 1) { ctx.fillStyle = '#4a4a58'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = '#6a6a7c'; ctx.fillRect(x0, gY - 2, x1 - x0, 8); ctx.fillStyle = '#333'; ctx.fillRect(AX - 400, gY - 140, 10, 140); ctx.fillRect(AX + 420, gY - 180, 10, 180); }
    else if (a === 2) { ctx.fillStyle = '#2a2a38'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = '#ffd23f'; for (i = Math.floor(x0 / 100) * 100; i < x1; i += 100) ctx.fillRect(i, gY + 10, 50, 4); }
    else if (a === 3) {
      ctx.fillStyle = 'rgba(255,210,63,.18)'; ctx.fillRect(Math.max(x0, AX - P5_HW - 80), gY - 330, AX - Math.max(x0, AX - P5_HW - 80), 330); ctx.fillStyle = 'rgba(80,170,255,.16)'; ctx.fillRect(AX, gY - 330, Math.min(x1, AX + P5_HW + 80) - AX, 330);
      ctx.fillStyle = '#3a2a58'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = '#ffd23f'; ctx.fillRect(Math.max(x0, AX - P5_HW - 80), gY - 2, AX - Math.max(x0, AX - P5_HW - 80), 6); ctx.fillStyle = '#6bc4ff'; ctx.fillRect(AX, gY - 2, Math.min(x1, AX + P5_HW + 80) - AX, 6);
    } else { ctx.fillStyle = '#3a0a14'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = 'rgba(255,60,60,' + (0.3 + 0.15 * Math.sin(t * 3)).toFixed(2) + ')'; ctx.fillRect(x0, gY - 2, x1 - x0, 6); }
    // стены арены
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(AX - P5_HW - 80, gY - 400, 6, 400); ctx.fillRect(AX + P5_HW + 74, gY - 400, 6, 400);
    // клоны Хоумлендера
    if (p5.clones && ready(img.boss)) {
      var bh = 70, bw = bh * img.boss.naturalWidth / img.boss.naturalHeight; ctx.globalAlpha = 0.28;
      for (i = 0; i < 60; i++) { var bx = AX - 900 + ((i * 197) % 1800) + Math.sin(t * 0.6 + i) * 14, by = gY - 120 - ((i * 53) % 260); ctx.drawImage(img.boss, bx, by, bw, bh); }
      ctx.globalAlpha = 1;
    }
  }

function drawGunner(e) { drawGunnerAt(e.x, gY - (e.y || 0), Math.atan2(pY() - (gY - (e.y || 0) - 60), P.x - e.x), e.st === 'fall', e.fl > 0, 1, t * 8 + e.x); }

function drawGunnerAt(x, y, an, fall, flash, sc, ph) {
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
    if (flash) ctx.globalAlpha = 0.6;
    var dx = Math.cos(an), f = dx < 0 ? -1 : 1, la = Math.atan2(Math.sin(an), Math.abs(dx)), sw = fall ? 0 : Math.sin(ph) * 4, bob = fall ? 0 : Math.abs(Math.sin(ph)) * 1.6, g, i;
    if (fall) { // парашют
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -78); ctx.lineTo(-42, -130); ctx.moveTo(14, -78); ctx.lineTo(42, -130); ctx.moveTo(0, -96); ctx.lineTo(0, -134); ctx.stroke();
      ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(0, -132, 50, Math.PI, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#d6303b'; ctx.beginPath(); ctx.moveTo(-17, -132); ctx.quadraticCurveTo(-10, -180, 0, -182); ctx.quadraticCurveTo(10, -180, 17, -132); ctx.closePath(); ctx.fill();
    }
    ctx.scale(f, 1); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(0, 1, 30, 5, 0, 0, 6.3); ctx.fill();
    ctx.translate(0, -bob);
    // хвостовые перья: веером, тёмно-синие с белым краем
    var tc = ['#1f2f4a', '#2c4468', '#1f2f4a'];
    for (i = 0; i < 3; i++) { ctx.save(); ctx.translate(-16, -42); ctx.rotate(-2.55 + i * 0.42 + Math.sin(ph * 0.5) * 0.04); ctx.fillStyle = tc[i]; ctx.strokeStyle = '#e8eef7'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(-24, 0, 26, 7, 0, 0, 6.3); ctx.fill(); ctx.stroke(); ctx.restore(); }
    // ноги: коленки назад, тактические ботинки
    ctx.strokeStyle = '#f0a020'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(-10 + sw, -12); ctx.lineTo(-9 + sw, -6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, -22); ctx.lineTo(10 - sw, -12); ctx.lineTo(9 - sw, -6); ctx.stroke();
    ctx.fillStyle = '#171b16'; ctx.beginPath(); ctx.moveTo(-17 + sw, 0); ctx.lineTo(-14 + sw, -9); ctx.lineTo(-5 + sw, -9); ctx.lineTo(2 + sw, -2); ctx.lineTo(2 + sw, 0); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(1 - sw, 0); ctx.lineTo(4 - sw, -9); ctx.lineTo(13 - sw, -9); ctx.lineTo(20 - sw, -2); ctx.lineTo(20 - sw, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3a4234'; ctx.fillRect(-14 + sw, -6, 11, 2); ctx.fillRect(4 - sw, -6, 11, 2);
    // тело
    g = ctx.createRadialGradient(-6, -52, 4, 0, -40, 34); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#bcc8d8');
    ctx.fillStyle = g; ctx.strokeStyle = '#7f8da3'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(0, -40, 24, 26, 0, 0, 6.3); ctx.fill(); ctx.stroke();
    // плитник и разгрузка
    g = ctx.createLinearGradient(-22, 0, 22, 0); g.addColorStop(0, '#3b4a33'); g.addColorStop(0.5, '#56694a'); g.addColorStop(1, '#34402d');
    ctx.fillStyle = g; ctx.strokeStyle = '#1d2418'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-19, -60); ctx.lineTo(19, -60); ctx.lineTo(23, -22); ctx.quadraticCurveTo(0, -14, -23, -22); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2a331f'; for (i = 0; i < 3; i++) { ctx.fillRect(-16 + i * 11, -40, 9, 13); ctx.fillStyle = '#6c7f5a'; ctx.fillRect(-16 + i * 11, -40, 9, 2.5); ctx.fillStyle = '#2a331f'; }
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); for (i = 0; i < 5; i++) { var a1 = -1.57 + i * 1.2566, a2 = a1 + 0.6283; ctx.lineTo(0 + Math.cos(a1) * 7, -50 + Math.sin(a1) * 7); ctx.lineTo(0 + Math.cos(a2) * 3, -50 + Math.sin(a2) * 3); } ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#171b16'; ctx.fillRect(-24, -26, 48, 5); ctx.fillStyle = '#c9b458'; ctx.fillRect(-3, -27, 7, 7);
    ctx.strokeStyle = '#1d2418'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -60); ctx.lineTo(-12, -40); ctx.moveTo(14, -60); ctx.lineTo(12, -40); ctx.stroke();
    // красный шарф с хвостом
    ctx.fillStyle = '#c8232c'; ctx.beginPath(); ctx.ellipse(6, -62, 17, 7, 0.15, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-8, -62); ctx.quadraticCurveTo(-26, -62 + Math.sin(ph * 1.4) * 4, -34, -52 + Math.sin(ph * 1.4 + 1) * 5); ctx.lineTo(-28, -48 + Math.sin(ph * 1.4 + 1) * 5); ctx.quadraticCurveTo(-18, -56, -6, -57); ctx.closePath(); ctx.fill();
    // голова
    g = ctx.createRadialGradient(0, -80, 3, 5, -74, 22); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#cfd8e4');
    ctx.fillStyle = g; ctx.strokeStyle = '#7f8da3'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(5, -76, 18, 0, 6.3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#d6303b'; ctx.beginPath(); ctx.ellipse(16, -60, 3.6, 8, 0.15, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#f2a623'; ctx.strokeStyle = '#a86a0c'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(20, -79); ctx.lineTo(41, -73); ctx.lineTo(20, -66); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#a86a0c'; ctx.beginPath(); ctx.moveTo(21, -73); ctx.lineTo(37, -73); ctx.stroke();
    // очки ПНВ: янтарная линза светится
    ctx.fillStyle = '#12161c'; ctx.beginPath(); rrect(8, -87, 19, 14, 5); ctx.fill();
    g = ctx.createRadialGradient(18, -80, 1, 18, -80, 7); g.addColorStop(0, '#fff2a8'); g.addColorStop(1, '#e8901a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(18, -80, 5.6, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#12161c'; ctx.beginPath(); ctx.arc(19.5, -80, 2.4, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(16.5, -82, 1.4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#12161c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(6, -92); ctx.lineTo(26, -85); ctx.stroke();
    ctx.strokeStyle = '#12161c'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-10, -78); ctx.lineTo(8, -80); ctx.stroke();
    // гребень торчит из шлема сзади
    ctx.fillStyle = '#d6303b'; for (i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-12 - i * 1 + 0, -96 + i * 6, 6, 0, 6.3); ctx.fill(); }
    // шлем
    g = ctx.createLinearGradient(-14, -100, 24, -82); g.addColorStop(0, '#5a6c4b'); g.addColorStop(1, '#2f3b28');
    ctx.fillStyle = g; ctx.strokeStyle = '#1d2418'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-16, -80); ctx.quadraticCurveTo(-14, -104, 6, -102); ctx.quadraticCurveTo(26, -100, 25, -82); ctx.lineTo(-16, -80); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c9b458'; ctx.fillRect(-12, -90, 34, 2.4); ctx.fillStyle = '#1d2418'; ctx.fillRect(2, -106, 10, 5);
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); for (i = 0; i < 5; i++) { var b1 = -1.57 + i * 1.2566, b2 = b1 + 0.6283; ctx.lineTo(8 + Math.cos(b1) * 5.5, -95 + Math.sin(b1) * 5.5); ctx.lineTo(8 + Math.cos(b2) * 2.2, -95 + Math.sin(b2) * 2.2); } ctx.closePath(); ctx.fill();
    // винтовка: булл-пап с коллиматором и глушителем
    ctx.save(); ctx.translate(2, -38); ctx.rotate(fall ? 0.5 : la);
    ctx.fillStyle = '#242a31'; ctx.strokeStyle = '#0d1014'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-18, -3); ctx.lineTo(-2, -6); ctx.lineTo(-2, 7); ctx.lineTo(-18, 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#323a44'; rrect(-4, -7, 38, 14, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4b5562'; ctx.fillRect(34, -4, 20, 8); ctx.strokeRect(34, -4, 20, 8);
    ctx.fillStyle = '#14181d'; rrect(54, -4.5, 20, 9, 3); ctx.fill();
    ctx.fillStyle = '#1b2025'; ctx.beginPath(); ctx.moveTo(8, 6); ctx.lineTo(18, 6); ctx.lineTo(21, 22); ctx.lineTo(12, 22); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#12161c'; rrect(6, -15, 16, 8, 2); ctx.fill(); ctx.fillStyle = '#ff3b3b'; ctx.beginPath(); ctx.arc(20, -11, 1.8, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(160,220,255,.7)'; ctx.fillRect(7, -14, 2, 6);
    // крылья-руки: рукава цвета формы и чёрные перчатки на цевье и рукояти
    ctx.fillStyle = '#4a5c3e'; ctx.strokeStyle = '#1d2418'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-14, -2); ctx.lineTo(0, 0); ctx.lineTo(2, 9); ctx.lineTo(-12, 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, 2); ctx.lineTo(34, 4); ctx.lineTo(34, 10); ctx.lineTo(12, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#12161c'; rrect(-2, 0, 9, 9, 3); ctx.fill(); rrect(32, 1, 13, 9, 3); ctx.fill();
    ctx.restore();
    ctx.restore();
  }

function drawP5() {
    if (!p5.on) return;
    var AX = p5AX(), i, e, s;
    ctx.fillStyle = '#6b5a7a';
    for (i = 0; i < p5.cov.length; i++) { var c = p5.cov[i]; ctx.fillStyle = '#5a4a6e'; ctx.fillRect(c.x - c.w / 2, gY - c.h, c.w, c.h); ctx.fillStyle = '#8a78a8'; ctx.fillRect(c.x - c.w / 2, gY - c.h, c.w, 8); }
    // Меллстрой замер
    if (p5.stage === 2 && ready(img.mell)) { ctx.save(); ctx.translate(AX, gY); ctx.globalAlpha = 0.85; ctx.drawImage(img.mell, 0, 0, 224, 99, -60, -100, 120, 53); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(160,220,255,.7)'; ctx.lineWidth = 3; ctx.strokeRect(-70, -110, 140, 80); ctx.restore(); }
    for (i = 0; i < p5.en.length; i++) {
      e = p5.en[i]; if (e.x < camX - 200 || e.x > camX + vw + 200) continue;
      if (e.k === 'm' && e.hover) { drawGunnerAt(e.x, gY - 66 + Math.sin(t * 2) * 12, Math.atan2(pY() - (gY - 150), P.x - e.x), false, p5.glit > 0, 2.5, t * 5); }
      else if (e.k === 'm' && ready(img.mogg)) {
        var h = 150, w = h * img.mogg.naturalWidth / img.mogg.naturalHeight, jit = (p5.stage === 4 || e.fl > 0 || p5.glit > 0) ? (Math.random() - 0.5) * 12 : 0;
        ctx.save(); ctx.translate(e.x + jit, gY + (e.hover ? -60 + Math.sin(t * 2) * 12 : 0)); if (e.face > 0) ctx.scale(-1, 1); ctx.globalAlpha = e.ghost && p5.stage === 2 ? 0.8 : 1; ctx.drawImage(img.mogg, -w / 2, -h, w, h); ctx.restore();
        if (e.atk === 'dash' && e.aT > 0.5) { ctx.strokeStyle = 'rgba(255,60,60,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(e.x, gY - 40); ctx.lineTo(e.x + e.dx * 700, gY - 40); ctx.stroke(); }
      } else if (e.k === 'min' && ready(img.muscle)) {
        var mh = 120, mw = mh * img.muscle.naturalWidth / img.muscle.naturalHeight;
        ctx.save(); ctx.translate(e.x, gY); if (e.face > 0) ctx.scale(-1, 1); if (e.fl > 0) ctx.globalAlpha = 0.6; ctx.drawImage(mogImg(), -mw / 2, -mh, mw, mh); ctx.restore();
      } else if (e.k === 'gun') {
        drawGunner(e);
      } else if (e.k === 'bs' && ready(img.boss)) {
        var bh2 = 210, bw2 = bh2 * img.boss.naturalWidth / img.boss.naturalHeight;
        ctx.save(); ctx.translate(e.x + (e.fl > 0 ? (Math.random() - 0.5) * 8 : 0), gY); if (e.face > 0) ctx.scale(-1, 1); ctx.drawImage(img.boss, -bw2 / 2, -bh2, bw2, bh2); ctx.restore();
        if (e.atk === 'sweep') { var sx2 = e.face * 780, hot = e.aT <= 0.9; ctx.fillStyle = hot ? 'rgba(255,40,40,.75)' : 'rgba(255,40,40,' + (0.2 + 0.2 * Math.sin(t * 30)).toFixed(2) + ')'; ctx.fillRect(Math.min(e.x, e.x + sx2), gY - (hot ? 70 : 20), Math.abs(sx2), hot ? 70 : 20); }
      }
      if (e.k === 'min' || e.k === 'gun') { ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.fillRect(e.x - 22, gY - (e.y || 0) - 138, 44, 6); ctx.fillStyle = '#ff6b6b'; ctx.fillRect(e.x - 21, gY - (e.y || 0) - 137, 42 * Math.max(0, e.hp) / e.max, 4); }
    }
    drawUniExtra();
    if (p5.hom && ready(img.boss)) {
      var hm = p5.hom, hh = 190, hw = hh * img.boss.naturalWidth / img.boss.naturalHeight;
      ctx.save(); ctx.translate(hm.x + (Math.random() - 0.5) * 6, gY); ctx.globalAlpha = 0.55 + Math.random() * 0.2; ctx.drawImage(img.boss, -hw / 2, -hh, hw, hh); ctx.restore();
      if (hm.tel > 0) { var ly = hm.band === 0 ? gY - 40 : gY - 150; ctx.strokeStyle = 'rgba(255,40,40,' + (0.35 + 0.4 * Math.sin(t * 30)).toFixed(2) + ')'; ctx.lineWidth = hm.band === 0 ? 18 : 14; ctx.beginPath(); ctx.moveTo(hm.x - 40, ly); ctx.lineTo(AX - P5_HW - 60, ly); ctx.stroke(); }
    }
    for (i = 0; i < p5.burg.length; i++) { var bg = p5.burg[i]; ctx.fillStyle = '#d6902a'; ctx.beginPath(); ctx.ellipse(bg.x, gY - 14, 22, 12, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#7a3a1c'; ctx.fillRect(bg.x - 22, gY - 14, 44, 6); ctx.fillStyle = '#d6902a'; ctx.fillRect(bg.x - 20, gY - 8, 40, 6); }
    for (i = 0; i < p5.es.length; i++) { s = p5.es[i]; ctx.fillStyle = s.col; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.75, 0, 6.3); ctx.fill(); }
    for (i = 0; i < p5.cols.length; i++) { var cc = p5.cols[i], pr = 1 - cc.t / 1.2; ctx.fillStyle = 'rgba(107,196,255,' + (0.12 + 0.35 * pr).toFixed(2) + ')'; ctx.fillRect(cc.x - 46, gY - 600, 92, 600); ctx.strokeStyle = 'rgba(160,220,255,' + (0.4 + 0.5 * pr).toFixed(2) + ')'; ctx.lineWidth = 3; ctx.strokeRect(cc.x - 46, gY - 600, 92, 600); }
    drawP5Glows(); drawP5Fx();
  }

function drawP5Hud() {
    if (!p5.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    p5Glitch(); drawP5Fx2();
    var bh = (p5.st === 'intro' || p5.st === 'clear' || p5.st === 'cine' || p5.st === 'rem' || p5.st === 'end' || p5.st === 'dlg') ? H * 0.09 : 0;
    if (bh) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, bh); ctx.fillRect(0, H - bh, W, bh); }
    // полоса здоровья врага и счётчики
    var bs = null, i; for (i = 0; i < p5.en.length; i++) if ((p5.en[i].k === 'm' && !p5.en[i].ghost) || p5.en[i].k === 'bs' || (p5.en[i].k === 'kk' && !p5.en[i].dead)) bs = p5.en[i];
    if (p5.st === 'fight') {
      var w = Math.min(380, W - 40), x = W / 2 - w / 2, y = H * 0.1 + 6, label = '', fr = 0;
      if (bs) { label = bs.name; fr = Math.max(0, bs.hp) / bs.max; }
      else if (p5.stage === 2) { label = 'Друзья Моггити: ' + Math.min(6, p5.kills) + ' / 6'; fr = 1 - Math.min(6, p5.kills) / 6; }
      else if (p5.stage === 3 || p5.stage === 7) { label = 'Чикен ганнеры: ' + Math.min(p5.need, p5.kills) + ' / ' + p5.need; fr = 1 - Math.min(p5.need, p5.kills) / p5.need; }
      if (label) { ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(x - 6, y - 6, w + 12, 40, 10); ctx.fill(); p5.gh = Math.max(fr, p5.gh - 0.006); ctx.fillStyle = '#2b3b5c'; ctx.fillRect(x, y + 14, w, 12); ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.85; ctx.fillRect(x, y + 14, w * p5.gh, 12); ctx.globalAlpha = 1; var hg = ctx.createLinearGradient(0, y + 14, 0, y + 26); hg.addColorStop(0, '#ff9aa6'); hg.addColorStop(0.5, '#ff3a52'); hg.addColorStop(1, '#a8102a'); ctx.fillStyle = hg; ctx.fillRect(x, y + 14, w * fr, 12); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x, y + 15, w * fr, 3); if (bs && bs.k === 'bs') { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x + w * 0.7 - 1, y + 12, 2, 16); ctx.fillRect(x + w * 0.5 - 1, y + 12, 2, 16); } ctx.strokeStyle = 'rgba(255,210,63,' + (0.5 + 0.3 * Math.sin(t * 5)).toFixed(2) + ')'; ctx.lineWidth = 2; ctx.strokeRect(x - 1, y + 13, w + 2, 14); ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, W / 2, y + 6); }
      ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.fillRect(14, H - 28, 120, 10); ctx.fillStyle = '#b58cff'; ctx.fillRect(15, H - 27, 118 * mgMana / mgCap(), 8); ctx.fillStyle = '#fff'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('МАГИЯ (G)', 16, H - 36);
    }
    if (rr.on && p5.uni) { var rtm = Math.floor(rr.t), rtx = 'БОСС-РАШ  ' + Math.min(RR_LIST.length, rr.i + 1) + '/' + RR_LIST.length + '  ' + Math.floor(rtm / 60) + ':' + (rtm % 60 < 10 ? '0' : '') + (rtm % 60); ctx.save(); ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(10,16,30,.7)'; rrect(W / 2 - 90, H * 0.1 + 48, 180, 24, 8); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.fillText(rtx, W / 2, H * 0.1 + 65); ctx.restore(); }
    if (p5.ttlT > 0 && p5.ttl) {
      var kk2 = p5.ttlT / p5.ttlM, a = Math.max(0, Math.min(1, kk2 * 4, (1 - kk2) * 6 + 0.1)), fs = Math.max(22, Math.min(56, W / (p5.ttl.length * 0.62 + 1)));
      ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, H * 0.28); ctx.font = fs + 'px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = '#14233f'; ctx.strokeText(p5.ttl, 0, 0); ctx.fillStyle = '#ffd23f'; ctx.fillText(p5.ttl, 0, 0);
      if (p5.ttlS) { ctx.font = '700 ' + Math.max(14, Math.min(22, fs * 0.4)) + 'px "Rubik", system-ui, sans-serif'; ctx.lineWidth = 5; ctx.strokeText(p5.ttlS, 0, fs * 0.8); ctx.fillStyle = '#fff'; ctx.fillText(p5.ttlS, 0, fs * 0.8); }
      ctx.restore();
    }
    if (p5.lineT > 0 && p5.line) {
      ctx.font = '700 ' + Math.max(14, Math.min(22, W / 42)) + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = Math.min(W - 24, ctx.measureText(p5.line).width + 30), yy = H - bh - 40;
      ctx.fillStyle = 'rgba(20,10,40,.84)'; rrect(W / 2 - tw / 2, yy - 18, tw, 36, 14); ctx.fill(); ctx.fillStyle = '#efe0ff'; ctx.fillText(p5.line, W / 2, yy, W - 40);
    }
    if (p5.st === 'end') {
      var tx = P5_END[p5.endI] || '', parts = tx.split('|'), al = Math.min(1, p5.endT / 1, (8 - p5.endT) / 1 + 0.2);
      ctx.fillStyle = 'rgba(0,0,0,.78)'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = Math.max(0, Math.min(1, al)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      if (parts.length > 1) { var f2 = Math.max(24, Math.min(58, W / 14)); ctx.font = f2 + 'px "Russo One", "Arial Black", Impact, sans-serif'; ctx.lineWidth = 9; ctx.strokeStyle = '#14233f'; ctx.strokeText(parts[0], W / 2, H * 0.42); ctx.fillStyle = '#ffd23f'; ctx.fillText(parts[0], W / 2, H * 0.42); ctx.font = '700 ' + Math.max(14, f2 * 0.38) + 'px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.fillText(parts[1], W / 2, H * 0.42 + f2 * 0.9); }
      else { ctx.font = '700 ' + Math.max(15, Math.min(26, W / 34)) + 'px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; wrapText(tx, W / 2, H * 0.45, Math.min(W - 60, 760), Math.max(22, Math.min(34, W / 28))); }
      ctx.globalAlpha = 1;
    }
    if (p5.flash > 0) { ctx.globalAlpha = Math.min(1, p5.flash); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    if (p5.fade > 0) { ctx.globalAlpha = p5.fade; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  }

function wrapText(tx, x, y, mw, lh) {
    var words = tx.split(' '), line = '', lines = [], i;
    for (i = 0; i < words.length; i++) { var tt = line ? line + ' ' + words[i] : words[i]; if (ctx.measureText(tt).width > mw && line) { lines.push(line); line = words[i]; } else line = tt; }
    lines.push(line); y -= (lines.length - 1) * lh / 2;
    for (i = 0; i < lines.length; i++) ctx.fillText(lines[i], x, y + i * lh);
  }

function p6AX() { return RIT_X; }

function p6Say(s, secs) { p6.line = s; p6.lineT = secs || 3.5; }

function p6Start() {
    if (p6.on || p5.on || cs.on) return;
    if (loc.i !== 11) { p6.auto = true; ltGo(11, 'left', p6AX() - 300); return; }
    p6Begin();
  }

function p6Begin() {
    p6.auto = false; p6.asst = false; p6.rt = 0; if (save.mx.p6q) { save.mx.p6q = 0; persist(); } p6.on = true; p6.st = 'cs'; p6.t = 0; p6.got = [0, 0, 0]; p6.mini = null; p6.rift = 0; p6.crack = 0; p6.flash = 0; p6.days = 1874; pfClear();
    P.x = p6AX() + P6_MELL + 140; P.z = 0; P.vz = 0; P.vx = 0; P.face = 1; hero.on = false; heroT = 99;
    if (partyOn() && partyHost()) storyEmit({ p6: 1 });
    csPlay('p6a', function () { p6.st = 'play'; p6Say('Ты играешь за профессора. Собери три детали Часореза и разрежь время.', 6); if (partyOn() && partyHost()) storyEmit({ p6s: 'play' }); });
  }

function p6Guest() {
    if (p6.on || loc.i !== 11 || (p5.on && !p5.assist)) return;
    if (p5.on) p5End('leave');
    p6.asst = true; p6.auto = false; p6.on = true; p6.st = 'cs'; p6.t = 0; p6.got = [0, 0, 0]; p6.mini = null; p6.rift = 0; p6.crack = 0; p6.flash = 0; p6.days = 1874; p6.rt = 0; pfClear();
    P.x = p6AX() + P6_MELL + 140; P.z = 0; P.vz = 0; P.vx = 0; P.face = 1; hero.on = false; heroT = 99;
    toast('Часть 6 вместе: ты помогаешь профессору. Собирай детали Часореза.', 5000);
  }

function p6Share(k) { if (p6.asst) storyEmit({ p6k: k }); else if (partyOn() && partyHost()) storyEmit({ p6got: p6.got.slice() }); }

function p6End() { if (!p6.on) return; if (!p6.asst && partyOn() && partyHost()) storyEmit({ p6s: 'end' }); p6.on = false; p6.mini = null; pfClear(); }

function p6Near(i) { return Math.abs(P.x - (p6AX() + P6S[i].dx)) < 110 && P.z < 70; }

function spotP6() {
    if (!p6.on || p6.st !== 'play') return null;
    if (p6.mini) return { btn: 'Стоп', msg: touch ? 'Жми «Стоп»' : 'Нажми E: стоп', fn: p6MiniHit, x: P.x };
    var i; for (i = 0; i < 3; i++) if (!p6.got[i] && p6Near(i)) { var k = i; return { btn: P6S[i].btn, msg: P6S[i].hint, fn: function () { p6Work(k); }, x: p6AX() + P6S[i].dx }; }
    if (Math.abs(P.x - (p6AX() + P6_MELL)) < 130) return { btn: 'Говорить', msg: 'Нажми E: поговорить с Меллстроем', fn: p6MellTalk, x: p6AX() + P6_MELL };
    if (Math.abs(P.x - (p6AX() + P6_DEV)) < 140) return { btn: 'Часорез', msg: p6.got[0] && p6.got[1] && p6.got[2] ? 'Нажми E: запустить Часорез' : 'Нажми E: осмотреть Часорез', fn: p6Device, x: p6AX() + P6_DEV };
    return null;
  }

function p6Work(i) {
    var m = P6S[i].mini; p6.mini = { k: i, title: m.title, n: m.n, w: m.w, v: m.v, hits: 0, m: 0, dir: 1, zc: 0.2 + Math.random() * 0.6, fail: 0, fin: false, res: 0, w0: m.w, v0: m.v, lock: 0.35 };
    sfx('pick');
  }

function p6Device() {
    if (!(p6.got[0] && p6.got[1] && p6.got[2])) {
      var left = P6S.filter(function (s) { return !p6.got[s.id]; }).map(function (s) { return s.part; }).join(', ');
      dlgShow('Профессор Квохтин', sciPort(), 'Часорез: рама есть, а сердца нет. Не хватает: ' + left + '.', [{ t: 'Ясно', out: true }]); return;
    }
    dlgShow('Профессор Квохтин', sciPort(), 'Все детали на месте. Один точный разрез по трещине — и мы дотянемся до Кокича. Режем?', [
      { t: 'Запустить Часорез', fn: function () { dlgClose(); p6.mini = { k: 3, title: 'Разрез времени: режь точно по трещине!', n: 3, w: 0.14, v: 1.3, hits: 0, m: 0, dir: 1, zc: 0.2 + Math.random() * 0.6, fail: 0, fin: true, res: 0, w0: 0.14, v0: 1.3, lock: 0.5 }; sfx('boom'); } },
      { t: 'Подожду', out: true }
    ]);
  }

function p6MellTalk() {
    var parts = p6.got[0] + p6.got[1] + p6.got[2], ch = [
      { t: 'Где Кокич?', fn: function () { dlgShow('Меллстрой', mellImg(), 'В петле. Я вижу его на краю стрима: бежит по кругу и даже не стареет. А я вот постарел…', [{ t: 'Понятно', fn: p6MellTalk }]); } },
      { t: 'Как ты меня нашёл?', fn: function () { dlgShow('Меллстрой', mellImg(), 'Это ты ко мне пришёл! Я хотел помочь найти Кокича, но не знал, где ты. А ты явился сам, да ещё и в обычном виде.', [{ t: 'Сыворотка', fn: function () { dlgShow('Профессор Квохтин', sciPort(), 'Я вколол себе последнюю сыворотку. Она вернула мне прежний облик, и время теперь меня не рвёт на части.', [{ t: 'Понятно', fn: p6MellTalk }]); } }]); } },
      { t: 'Что нужно для разреза?', fn: function () { dlgShow('Профессор Квохтин', sciPort(), 'Три детали: Кристалл частоты (антенна стрима), Хроно-шестерня (верстак) и Ядро времени (кабинет кристаллов). Собранные ' + parts + ' из 3. Часорез стоит справа.', [{ t: 'Ясно', fn: p6MellTalk }]); } },
      { t: 'Уйти', out: true }
    ];
    dlgShow('Меллстрой', mellImg(), 'Профессор! Дни стрима: ' + Math.floor(p6.days) + '. Я всё ещё жду, пока ты вытащишь Кокича.', ch);
  }

function p6MiniHit() {
    var g = p6.mini; if (!g || g.res || g.lock > 0) return;
    g.lock = 0.3;
    if (Math.abs(g.m - g.zc) < g.w / 2) {
      g.hits++; sfx('pick'); p6.flash = 0.12; var x = p6.mx || P.x, col = g.k === 3 ? '#ffffff' : P6S[g.k].col; pfFlash(P.x, gY - 80, 70, col, 0.25); pfSpark(P.x, gY - 80, 14, col, 420, 0.5, 2.5); pfRing(P.x, gY - 80, 120, col, 0.4);
      if (g.hits >= g.n) { g.res = 1; g.rt = 0.8; sfx('rare'); } else { g.zc = 0.12 + Math.random() * 0.76; g.w = Math.max(g.w0 * 0.8, g.w * 0.95); g.v = Math.min(g.v0 * 1.2, g.v * 1.04); }
    } else { g.fail++; g.hits = 0; g.w = g.w0 + Math.min(0.1, g.fail * 0.03); g.v = g.v0; sfx('no'); p6.shk = 0.4; shk = Math.max(shk, 0.3); pfSpark(P.x, gY - 80, 10, '#ff6b6b', 360, 0.4, 2.5); g.zc = 0.12 + Math.random() * 0.76; popup(P.x, PLAYER_H + 30, 'Мимо! Заново', '#ff9a9a'); }
  }

function p6Update(dt) {
    if (!p6.on) {
      if (p6.auto && loc.i === 11 && !lt.st && !dlgOpened) p6Begin();
      else if (save.mx.p6q && !p6.auto && !p5.on && !cs.on && !lt.st && !dlgOpened && !paused && !mb.on) p6Start();
      return;
    }
    if (loc.i !== 11) { p6End(); return; }
    var AX = p6AX(), i;
    p6.t += dt; if (p6.lineT > 0) p6.lineT -= dt; if (p6.flash > 0) p6.flash -= dt * 1.5; p6.days += dt * 2.3;
    P.x = Math.max(AX - P6_HW, Math.min(AX + P6_HW, P.x));
    if (p6.st === 'cs' || p6.st === 'rift') { input.left = input.right = false; input.up = false; P.vx = 0; }
    if (p6.mini) {
      var g = p6.mini; input.left = input.right = false; P.vx = 0;
      if (g.lock > 0) g.lock -= dt;
      if (!g.res) { g.m += g.dir * g.v * dt; if (g.m > 1) { g.m = 1; g.dir = -1; } if (g.m < 0) { g.m = 0; g.dir = 1; } }
      else { g.rt -= dt; if (g.rt <= 0) { var k = g.k, fin = g.fin; p6.mini = null; if (fin) { if (p6.asst) storyEmit({ p6c: 1 }); else p6Cut(); } else { p6.got[k] = 1; p6Share(k); sfx('rare'); toast('Получено: ' + P6S[k].part + ' (' + (p6.got[0] + p6.got[1] + p6.got[2]) + '/3)', 3500); p6.crack = (p6.got[0] + p6.got[1] + p6.got[2]) / 3 * 0.4; if (p6.got[0] && p6.got[1] && p6.got[2]) p6Say('Все детали собраны! Иди к Часорезу справа.', 5); } } }
    }
    if (p6.st === 'rift') {
      p6.rt += dt; p6.rift = Math.min(1, p6.rt / 4); p6.crack = 0.4 + 0.6 * p6.rift; shk = Math.max(shk, 0.25 + 0.4 * p6.rift);
      if (Math.random() < dt * 40) pfBolt(AX + P6_DEV + 160 + (Math.random() - 0.5) * 80, gY - 440, gY - 40, Math.random() < 0.5 ? '#ffd0ff' : '#bfe6ff');
      if (Math.random() < dt * 60) pfSpark(AX + P6_DEV + 160, gY - 200, 1, '#ffffff', 600, 0.5, 2.5);
      if (p6.rt > 4.6) { p6.st = 'cs'; if (!p6.asst) csPlay('p6b', p6Finish); }
    }
    // атмосфера: временные искры
    if (Math.random() < dt * 14) pfGlowP(camX + Math.random() * vw, gY - Math.random() * 400, 8, -24, 5 + Math.random() * 5, Math.random() < 0.5 ? '#b58cff' : '#6bc4ff', 2.2, 0);
  }

function p6Cut() { if (!p6.asst && partyOn() && partyHost()) storyEmit({ p6s: 'rift' }); p6.st = 'rift'; p6.rt = 0; p6.flash = 1; sfx('boom'); shk = 1; p6.got = [1, 1, 1]; pfFlash(p6AX() + P6_DEV + 160, gY - 200, 240, '#ffffff', 0.6); pfRing(p6AX() + P6_DEV + 160, gY - 200, 420, '#ffd0ff', 0.8); }

function p6Finish() {
    if (Date.now() - p6FinT < 4000) return; p6FinT = Date.now();
    var first = !save.mx.p6; save.mx.p6 = 1; persist(); ach('fin6'); sfx('rare');
    p6End();
    function nxt() {
      if (save.mx.mgo === 2) { csPlay('endpeace', function () { save.mx.endp = 1; save.mx.c2n = 0; persist(); ach('endp'); ltGo(NLAB, 'left', 900); toast('КОНЕЦ. Моггити пощажён, петля закрыта: Кокич, профессор и Меллстрой вернулись к обычной жизни. Игру можно продолжать: чекушки, самолёты и друзья ждут.', 11000); }); }
      else c2Multi();
    }
    if (first) csPlay('p6c', nxt); else nxt();
  }

function drawP6Back() {
    var AX = p6AX(), i, x0 = camX - 20, x1 = camX + vw + 20, rf = p6.rift;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120a2a'); g.addColorStop(1, '#2a1a4a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    parallaxSkyline(0.25, 20, 150, 200, '#1c1440', 7);
    setCam(1);
    // стена студии
    ctx.fillStyle = '#241848'; ctx.fillRect(AX - P6_HW - 120, gY - 420, P6_HW * 2 + 240, 420);
    ctx.fillStyle = 'rgba(180,140,255,.18)'; for (i = 0; i < 9; i++) ctx.fillRect(AX - P6_HW - 60 + i * 230, gY - 420, 6, 420);
    // окна с глючным небом и часами
    for (i = 0; i < 5; i++) { var wx = AX - 820 + i * 400, wy = gY - 330; ctx.fillStyle = '#0c0a22'; ctx.fillRect(wx, wy, 150, 120); ctx.strokeStyle = '#6a58a8'; ctx.lineWidth = 4; ctx.strokeRect(wx, wy, 150, 120); ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, 150, 120); ctx.clip(); clockSpiral(wx + 75, wy + 60, 70, t * (0.6 + i * 0.1), 'rgba(190,150,255,.55)'); ctx.restore(); }
    // пол
    ctx.fillStyle = '#2e2250'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale); ctx.fillStyle = '#4a3a7a'; ctx.fillRect(x0, gY - 2, x1 - x0, 8);
    ctx.fillStyle = 'rgba(255,255,255,.06)'; for (i = Math.floor(x0 / 120) * 120; i < x1; i += 120) ctx.fillRect(i, gY + 14, 60, 3);
    // стол Меллстроя и стрим
    var mx = AX + P6_MELL;
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(mx - 120, gY - 70, 240, 70); ctx.fillStyle = '#6a5238'; ctx.fillRect(mx - 130, gY - 76, 260, 10);
    if (ready(img.mell)) { ctx.drawImage(img.mell, 0, 0, 224, 99, mx - 85, gY - 168, 170, 75); ctx.globalAlpha = 0.5; ctx.fillStyle = '#c8c8d0'; ctx.fillRect(mx - 85, gY - 168, 170, 75); ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(230,230,240,.6)'; ctx.fillRect(mx - 40, gY - 110, 80, 14); }
    ctx.fillStyle = '#14122a'; ctx.fillRect(mx + 70, gY - 250, 140, 90); ctx.strokeStyle = '#d33a3a'; ctx.lineWidth = 3; ctx.strokeRect(mx + 70, gY - 250, 140, 90); ctx.fillStyle = '#d33a3a'; ctx.fillRect(mx + 76, gY - 244, 44, 14); ctx.fillStyle = '#fff'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('● LIVE', mx + 80, gY - 237); ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillText('Дни: ' + Math.floor(p6.days), mx + 78, gY - 205);
    ctx.fillText('Кокича нет…', mx + 78, gY - 182);
    // станции
    for (i = 0; i < 3; i++) {
      var s = P6S[i], sx = AX + s.dx, got = p6.got[i], pulse = 0.5 + 0.5 * Math.sin(t * 4 + i);
      ctx.fillStyle = '#3a2c66'; ctx.fillRect(sx - 90, gY - 90, 180, 90); ctx.fillStyle = '#54428e'; ctx.fillRect(sx - 96, gY - 98, 192, 10);
      ctx.fillStyle = got ? '#2a2a3a' : s.col; ctx.globalAlpha = got ? 1 : 0.5 + 0.4 * pulse;
      if (i === 0) { ctx.beginPath(); ctx.arc(sx, gY - 150, 46, Math.PI, 0); ctx.fill(); ctx.fillRect(sx - 3, gY - 150, 6, 52); }
      else if (i === 1) { for (var q = 0; q < 3; q++) { ctx.save(); ctx.translate(sx - 50 + q * 50, gY - 140); ctx.rotate(t * (q % 2 ? -1 : 1) * (got ? 0.1 : 1)); ctx.fillRect(-20, -4, 40, 8); ctx.fillRect(-4, -20, 8, 40); ctx.restore(); } }
      else { ctx.beginPath(); ctx.moveTo(sx, gY - 200); ctx.lineTo(sx + 30, gY - 150); ctx.lineTo(sx, gY - 110); ctx.lineTo(sx - 30, gY - 150); ctx.closePath(); ctx.fill(); }
      ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(s.name + (got ? ' ✔' : ''), sx, gY - 78);
    }
    // Часорез
    var dx = AX + P6_DEV, ready3 = p6.got[0] && p6.got[1] && p6.got[2];
    ctx.fillStyle = '#2a2250'; ctx.fillRect(dx - 70, gY - 60, 140, 60); ctx.strokeStyle = ready3 ? '#ffd23f' : '#6a58a8'; ctx.lineWidth = 4; ctx.strokeRect(dx - 70, gY - 60, 140, 60);
    ctx.save(); ctx.translate(dx, gY - 120); ctx.rotate(t * (ready3 ? 1.6 : 0.2)); ctx.strokeStyle = ready3 ? '#ffd23f' : '#6a58a8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 44, 0, 6.3); ctx.stroke(); for (i = 0; i < 6; i++) { ctx.rotate(1.047); ctx.fillStyle = p6.got[i % 3] ? '#ffd23f' : '#3a3a58'; ctx.fillRect(40, -6, 16, 12); } ctx.restore();
    ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЧАСОРЕЗ', dx, gY - 48);
    // трещина во времени
    var cx = dx + 160, cr = p6.crack;
    if (cr > 0) {
      ctx.save(); ctx.translate(cx, gY - 210); var hh = 80 + cr * 230, ww = 4 + rf * 120;
      ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + cr * 0.4).toFixed(2) + ')'; ctx.beginPath(); ctx.moveTo(0, -hh); ctx.lineTo(ww * 0.5, -hh * 0.3); ctx.lineTo(ww, 0); ctx.lineTo(ww * 0.4, hh * 0.35); ctx.lineTo(0, hh); ctx.lineTo(-ww * 0.4, hh * 0.35); ctx.lineTo(-ww, 0); ctx.lineTo(-ww * 0.5, -hh * 0.3); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,230,255,.9)'; ctx.lineWidth = 3; ctx.stroke();
      if (rf > 0.15) { ctx.save(); ctx.clip(); ctx.fillStyle = '#120a2a'; ctx.fillRect(-ww, -hh, ww * 2, hh * 2); clockSpiral(0, 0, 120, t * 2, 'rgba(255,200,255,.8)'); var lp = (t * 0.8) % 1; if (ready(img.rooster)) { var rh = 120, rw = rh * img.rooster.naturalWidth / img.rooster.naturalHeight; ctx.globalAlpha = Math.min(1, rf * 1.2); ctx.drawImage(skinImg(mySkin), -rw / 2 - 20 + lp * 40, 20 - rh, rw, rh); ctx.globalAlpha = 1; } ctx.restore(); }
      ctx.restore();
    }
  }

function drawP6() {
    if (!p6.on) return;
    var px = P.x, mf = Math.abs(P.vx) > 25 && P.z <= 0.01;
    var og = gY; gY = og - P.z; sciDraw(px, P.face >= 0 ? 1 : -1, 1.02, mf ? P.walk * 2.3 : 0, 0); gY = og;
    drawP5Fx();
  }

function drawP6Hud() {
    if (!p6.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (p6.st === 'play' || p6.st === 'rift') {
      var n = p6.got[0] + p6.got[1] + p6.got[2], txt = 'ЦЕЛЬ: детали Часореза ' + n + '/3' + (n === 3 ? ' → запусти Часорез справа' : '');
      ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; var tw = ctx.measureText(txt).width + 28;
      ctx.fillStyle = 'rgba(20,10,40,.8)'; rrect(W / 2 - tw / 2, 62, tw, 28, 12); ctx.fill(); ctx.fillStyle = '#efe0ff'; ctx.fillText(txt, W / 2, 76);
    }
    if (p6.lineT > 0 && p6.line) {
      ctx.font = '700 ' + Math.max(14, Math.min(21, W / 44)) + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var lw = Math.min(W - 24, ctx.measureText(p6.line).width + 30), yy = H - 70;
      ctx.fillStyle = 'rgba(20,10,40,.86)'; rrect(W / 2 - lw / 2, yy - 18, lw, 36, 14); ctx.fill(); ctx.fillStyle = '#efe0ff'; ctx.fillText(p6.line, W / 2, yy, W - 40);
    }
    var g = p6.mini;
    if (g) {
      var bw = Math.min(W - 60, 560), bx = W / 2 - bw / 2, by = H * 0.3;
      ctx.fillStyle = 'rgba(14,10,34,.9)'; rrect(bx - 18, by - 52, bw + 36, 118, 16); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(g.title, W / 2, by - 30);
      ctx.fillStyle = '#2b2252'; ctx.fillRect(bx, by - 8, bw, 26);
      ctx.fillStyle = g.res ? 'rgba(120,255,160,.9)' : 'rgba(110,255,170,.55)'; ctx.fillRect(bx + (g.zc - g.w / 2) * bw, by - 8, g.w * bw, 26);
      ctx.fillStyle = '#fff'; ctx.fillRect(bx + g.m * bw - 3, by - 14, 6, 38);
      for (var i = 0; i < g.n; i++) { ctx.fillStyle = i < g.hits ? '#ffd23f' : 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.arc(W / 2 - (g.n - 1) * 14 + i * 28, by + 44, 8, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'right'; ctx.fillText(touch ? 'Жми «Стоп», когда маркер в зелёном' : 'E: стоп, когда маркер в зелёном', bx + bw, by + 44);
    }
    if (p6.flash > 0) { ctx.globalAlpha = Math.min(1, p6.flash); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  }

function csPlay(id, done) { if (!CS[id]) { if (done) done(); return; }
    if (cs.on && cs.id === id) return;
    var capEl = document.querySelector('#csSkip .cap'); if (capEl) capEl.textContent = csSeen[id] ? 'Ты уже видел эту сцену: можно пропустить (или Esc)' : 'Кнопка нужна, чтобы случайно не пропустить сцену (или нажми Esc)';
    csSeen[id] = 1; try { localStorage.setItem('chekushka-cseen', JSON.stringify(csSeen)); } catch (e1) {}
    cs.on = true; cs.id = id; cs.i = 0; cs.t = 0; cs.done = done || null; sfx('rare');
    if (!csMirror && partyOn() && partyHost()) storyEmit({ cs: id, sy: CS[id].map(function (sc) { return sc.say || []; }), k: c2cur }); }

function csSkip() { if (!cs.on) return; var sc = CS[cs.id][cs.i]; if (sc) cs.t = sc.d; }

function csSkipAll() { if (!cs.on) return; cs.i = CS[cs.id].length - 1; var sc = CS[cs.id][cs.i]; cs.t = sc.d; }

function csXs() { return p5.on && p5.st === 'end' && !cs.on; }

function csUiSync() {
    var fo = (typeof fin !== 'undefined' && fin.on) || csXs(), show = cs.on || fo;
    if (elCsSkip.hidden === show) elCsSkip.hidden = !show;
    if (document.body.classList.contains('cutmode') !== show) document.body.classList.toggle('cutmode', show);
  }

function updateCs(dt) {
    csUiSync();
    var fo = ((typeof fin !== 'undefined' && fin.on) || csXs()) && !cs.on; if (elCsSkip.hidden === (cs.on || fo)) elCsSkip.hidden = !(cs.on || fo);
    if (csXs()) { var cpe = document.querySelector('#csSkip .cap'); if (cpe) cpe.textContent = 'Можно пропустить концовку (или Esc)'; }
    var cm = cs.on || (typeof fin !== 'undefined' && fin.on);
    if (document.body.classList.contains('cutmode') !== cm) document.body.classList.toggle('cutmode', cm);
    if (!cs.on) return;
    input.left = input.right = false; input.up = false; P.vx = 0;
    cs.t += dt; var scs = CS[cs.id], sc = scs[cs.i];
    if (cs.t >= sc.d) { cs.i++; cs.t = 0; if (cs.i >= scs.length) { cs.on = false; csUiSync(); var d = cs.done; cs.done = null; if (d) d(); } }
  }

function drawCs() {
    if (!cs.on) return;
    var scs = CS[cs.id], sc = scs[cs.i]; if (!sc) return;
    var S = Math.min(W / 960, H / 540), ox = (W - 960 * S) / 2, oy = (H - 540 * S) / 2, og = gY, k = Math.min(1, cs.t / sc.d), i;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.setTransform(dpr * S, 0, 0, dpr * S, ox * dpr, oy * dpr); ctx.beginPath(); ctx.rect(0, 0, 960, 540); ctx.clip();
    gY = 430; ctx.save(); var zi = cs.i % 2, zz = 1.035 + 0.05 * (zi ? 1 - k : k), pn = (zi ? 1 : -1) * (k - 0.5) * 18, sh = sc.shake ? (Math.random() - 0.5) * sc.shake : 0;
    ctx.translate(480 + pn + sh, 270 + sh * 0.6); ctx.scale(zz, zz); ctx.translate(-480, -270);
    try { sc.draw(cs.t, k); } catch (e) {} ctx.restore(); gY = og;
    try { csFx(cs.t, k); } catch (e2) {}
    var fa = Math.max(0, 1 - cs.t / 0.4, (cs.t - (sc.d - 0.4)) / 0.4); if (fa > 0) { ctx.globalAlpha = Math.min(1, fa); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 960, 540); ctx.globalAlpha = 1; }
    ctx.restore();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var bh = H * 0.07 * (cs.i === 0 ? Math.min(1, cs.t / 0.7) : 1); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, bh); ctx.fillRect(0, H - bh, W, bh);
    var say = null; if (sc.say) for (i = 0; i < sc.say.length; i++) if (sc.say[i][0] <= cs.t) say = sc.say[i];
    if (say) {
      var fs = Math.max(14, Math.min(22, W / 42)); ctx.font = '700 ' + fs + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var txt = say[2], mw = Math.min(W - 30, 780), lines = [], words = txt.split(' '), ln = '', q;
      for (q = 0; q < words.length; q++) { var tt = ln ? ln + ' ' + words[q] : words[q]; if (ctx.measureText(tt).width > mw - 30 && ln) { lines.push(ln); ln = words[q]; } else ln = tt; } lines.push(ln);
      var bhh = lines.length * (fs + 6) + 44, by = H - bh - 14 - bhh, col = CS_COL[say[1]] || '#fff', shown = Math.max(0, Math.floor((cs.t - say[0]) * 42)), left = shown, pop = Math.min(1, (cs.t - say[0]) / 0.18);
      ctx.save(); ctx.globalAlpha = pop; ctx.translate(0, (1 - pop) * 10);
      ctx.fillStyle = 'rgba(12,9,30,.9)'; rrect(W / 2 - mw / 2, by, mw, bhh, 14); ctx.fill();
      ctx.fillStyle = col; rrect(W / 2 - mw / 2, by + 8, 5, bhh - 16, 3); ctx.fill();
      ctx.font = '800 ' + (fs - 2) + 'px "Rubik", system-ui, sans-serif'; var nw = ctx.measureText(say[1]).width + 22;
      ctx.fillStyle = col; rrect(W / 2 - mw / 2 + 16, by - 12, nw, fs + 6, 9); ctx.fill();
      ctx.fillStyle = '#14102a'; ctx.textAlign = 'left'; ctx.fillText(say[1], W / 2 - mw / 2 + 27, by - 12 + (fs + 6) / 2 + 1);
      ctx.font = '700 ' + fs + 'px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
      for (q = 0; q < lines.length; q++) { var seg = lines[q].slice(0, Math.max(0, left)); left -= lines[q].length + 1; ctx.fillText(seg, W / 2 - mw / 2 + 22, by + 38 + q * (fs + 6)); }
      if (shown >= txt.length && Math.sin(cs.t * 6) > 0) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(W / 2 + mw / 2 - 26, by + bhh - 18); ctx.lineTo(W / 2 + mw / 2 - 14, by + bhh - 18); ctx.lineTo(W / 2 + mw / 2 - 20, by + bhh - 10); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
  }

function aSprite(im, x, face, h, o) {
    if (!ready(im)) return; o = o || {}; var w = h * im.naturalWidth / im.naturalHeight;
    ctx.save(); ctx.translate(x + (o.jx || 0), 430 + (o.dy || 0)); if (o.rot) ctx.rotate(o.rot); ctx.scale(face > 0 ? -1 : 1, 1); if (!o.still) { ctx.rotate(Math.sin(t * 1.7 + x * 0.013) * 0.012); ctx.scale(1 + Math.sin(t * 2.3 + x * 0.01) * 0.008, 1 + Math.sin(t * 2.3 + x * 0.01 + 0.6) * 0.016); } if (o.a != null) ctx.globalAlpha = o.a;
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(0, -(o.dy || 0) + 2, w * 0.32, 7, 0, 0, 6.3); ctx.fill();
    ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore();
  }

function aKok(x, face, sc, o) { var m = muscleForm(); aSprite(m ? img.muscle : skinImg(mySkin), x, face, 150 * sc * (m ? 1.15 : 1), o); }

function aMogg(x, face, sc, o) { aSprite(img.mogg, x, face, 170 * sc, o); }

function aHom(x, face, sc, o) { aSprite(img.boss, x, face, 210 * sc, o); }

function aRoost(x, face, sc, o) { aSprite(img.rooster, x, face, 120 * sc, o); }

function aSci(x, face, sc, ph) { var o = gY; sciDraw(x, face, sc * 1.3, ph || 0, 0); }

function aMell(x, sc, tint) {
    if (!ready(img.mell)) return; var w = 190 * sc, h = 84 * sc;
    ctx.save(); ctx.translate(x, 430); ctx.fillStyle = '#5a4a3a'; ctx.fillRect(-w * 0.4, -30 * sc, w * 0.8, 30 * sc);
    ctx.drawImage(img.mell, 0, 0, 224, 99, -w / 2, -h - 20 * sc, w, h);
    if (tint) { ctx.globalAlpha = 0.45; ctx.fillStyle = tint; ctx.fillRect(-w / 2, -h - 20 * sc, w, h); ctx.globalAlpha = 1; }
    ctx.restore();
  }

function aGun(x, y, sc, an, fl) { drawGunnerAt(x, y, an, false, fl, sc, t * 6); }

function bgG(c1, c2) {
    var g = ctx.createLinearGradient(0, 0, 0, 540); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(0, 0, 960, 540);
    var i, hg = ctx.createRadialGradient(480, 440, 20, 480, 440, 560); hg.addColorStop(0, 'rgba(255,255,255,.16)'); hg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hg; ctx.fillRect(0, 0, 960, 540);
    for (i = 0; i < 46; i++) { var sx = (i * 211) % 960, sy = (i * 97) % 230, tw = 0.25 + 0.25 * Math.sin(t * 1.6 + i); ctx.fillStyle = 'rgba(255,255,255,' + tw.toFixed(2) + ')'; ctx.fillRect(sx, sy, 2, 2); }
  }

function csFx(ct, k) {
    var i, g;
    g = ctx.createLinearGradient(0, 0, 960, 0); g.addColorStop(0, 'rgba(255,230,170,0)'); g.addColorStop(0.5, 'rgba(255,230,170,.06)'); g.addColorStop(1, 'rgba(255,230,170,0)');
    ctx.save(); ctx.translate(480, 0); ctx.rotate(0.35); ctx.fillStyle = g; ctx.fillRect(-380 + Math.sin(ct * 0.5) * 40, -200, 170, 900); ctx.fillRect(-60 + Math.sin(ct * 0.4 + 2) * 50, -200, 110, 900); ctx.restore();
    for (i = 0; i < 28; i++) { var px = ((i * 137 + ct * (10 + i % 5 * 4)) % 1000) - 20, py = 540 - ((i * 71 + ct * (8 + i % 4 * 5)) % 560), pa = 0.12 + 0.12 * Math.sin(ct * 2 + i); ctx.fillStyle = 'rgba(255,245,215,' + pa.toFixed(2) + ')'; ctx.beginPath(); ctx.arc(px, py, 1 + (i % 3) * 0.7, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = 'rgba(70,40,130,.07)'; ctx.fillRect(0, 0, 960, 540);
    for (i = 0; i < 70; i++) { ctx.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.07)'; ctx.fillRect(Math.random() * 960, Math.random() * 540, 2, 2); }
    g = ctx.createRadialGradient(480, 270, 230, 480, 270, 620); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 960, 540);
  }

function flr(c) {
    ctx.fillStyle = c; ctx.fillRect(0, 430, 960, 110);
    var g = ctx.createLinearGradient(0, 430, 0, 540); g.addColorStop(0, 'rgba(255,255,255,.14)'); g.addColorStop(0.15, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = g; ctx.fillRect(0, 430, 960, 110);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (var i = 0; i < 14; i++) ctx.fillRect(((i * 173) % 900) + 10, 446 + (i * 37) % 80, 40 + (i % 4) * 24, 2);
    ctx.fillStyle = 'rgba(255,255,255,.10)'; ctx.fillRect(0, 430, 960, 2);
  }

function glt(n) {
    n = Math.min(n, 3);
    for (var i = 0; i < n; i++) {
      var w = 160 + Math.random() * 380, x = Math.random() * (960 - w), y = Math.random() * 540, h = 2 + Math.random() * 7, c = Math.random() < 0.5 ? '0,255,255' : '255,60,220';
      var g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(' + c + ',0)'); g.addColorStop(0.5, 'rgba(' + c + ',.13)'); g.addColorStop(1, 'rgba(' + c + ',0)');
      ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    }
  }

function bigTxt(s, sub, a, y) {
    ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, a == null ? 1 : a)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.font = '54px "Russo One", "Arial Black", Impact, sans-serif'; ctx.lineWidth = 9; ctx.strokeStyle = '#14233f'; ctx.strokeText(s, 480, y || 200); ctx.fillStyle = '#ffd23f'; ctx.fillText(s, 480, y || 200);
    if (sub) { ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.lineWidth = 5; ctx.strokeText(sub, 480, (y || 200) + 46); ctx.fillStyle = '#fff'; ctx.fillText(sub, 480, (y || 200) + 46); }
    ctx.restore();
  }

function csTrees(c) {
    var i, x, h;
    ctx.fillStyle = c; ctx.globalAlpha = 0.55;
    for (i = 0; i < 14; i++) { x = i * 78 + 20 + (i % 3) * 14; h = 160 + (i * 41) % 90; ctx.beginPath(); ctx.moveTo(x - 38, 430); ctx.lineTo(x, 430 - h); ctx.lineTo(x + 38, 430); ctx.fill(); }
    ctx.globalAlpha = 1;
    for (i = 0; i < 12; i++) { x = i * 90 + (i % 3) * 20; h = 230 + (i % 4) * 30; ctx.beginPath(); ctx.moveTo(x - 54, 430); ctx.lineTo(x, 430 - h); ctx.lineTo(x + 54, 430); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.moveTo(x - 54, 430); ctx.lineTo(x, 430 - h); ctx.lineTo(x - 8, 430); ctx.fill(); ctx.fillStyle = c; }
    var fg = ctx.createLinearGradient(0, 330, 0, 440); fg.addColorStop(0, 'rgba(190,200,255,0)'); fg.addColorStop(1, 'rgba(190,200,255,.16)'); ctx.fillStyle = fg; ctx.fillRect(0, 330, 960, 110);
  }

function circ(a, red) {
    ctx.save(); var col = red ? '255,70,70' : '200,160,255', i, an, rx, ry;
    var eg = ctx.createRadialGradient(480, 440, 10, 480, 440, 290); eg.addColorStop(0, 'rgba(' + col + ',' + (a * 0.35) + ')'); eg.addColorStop(1, 'rgba(' + col + ',0)'); ctx.fillStyle = eg; ctx.beginPath(); ctx.ellipse(480, 440, 290, 50, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(' + col + ',' + a + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(480, 440, 240, 34, 0, 0, 6.3); ctx.stroke(); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(480, 440, 170, 24, 0, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(480, 440, 100, 14, 0, 0, 6.3); ctx.stroke();
    ctx.font = '700 17px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; var rn = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ';
    for (i = 0; i < 12; i++) { an = i * 0.5236 + t * 0.5; rx = 480 + Math.cos(an) * 205; ry = 440 + Math.sin(an) * 29; ctx.fillStyle = 'rgba(255,230,160,' + (a * (0.6 + 0.4 * Math.sin(t * 2 + i))).toFixed(2) + ')'; ctx.fillText(rn.charAt(i), rx, ry); }
    var g = ctx.createLinearGradient(0, 120, 0, 440); g.addColorStop(0, 'rgba(' + col + ',0)'); g.addColorStop(1, 'rgba(' + col + ',' + a * 0.45 + ')'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(300, 440); ctx.lineTo(430, 120); ctx.lineTo(530, 120); ctx.lineTo(660, 440); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

function clockSpiral(cx, cy, rr, tm, col) {
    var i, a, base = col || 'rgba(190,150,255,.5)';
    ctx.save();
    var g = ctx.createRadialGradient(cx, cy, rr * 0.1, cx, cy, rr * 1.2); g.addColorStop(0, 'rgba(210,170,255,.20)'); g.addColorStop(0.7, 'rgba(160,110,255,.10)'); g.addColorStop(1, 'rgba(160,110,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr * 1.2, 0, 6.3); ctx.fill();
    ctx.strokeStyle = base; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, rr * 0.93, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 3; for (i = 0; i < 12; i++) { a = i * 0.5236 - 1.5708; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * rr * (i % 3 ? 0.86 : 0.8), cy + Math.sin(a) * rr * (i % 3 ? 0.86 : 0.8)); ctx.lineTo(cx + Math.cos(a) * rr * 0.93, cy + Math.sin(a) * rr * 0.93); ctx.stroke(); }
    ctx.lineWidth = 2; ctx.setLineDash([5, 11]); ctx.lineDashOffset = -tm * 18; ctx.beginPath(); ctx.arc(cx, cy, rr * 0.7, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, rr * 0.5, -tm * 0.8, -tm * 0.8 + 2.4); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, rr * 0.5, -tm * 0.8 + 3.14, -tm * 0.8 + 5.5); ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(tm * 0.6) * rr * 0.4, cy + Math.sin(tm * 0.6) * rr * 0.4); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(tm * 3) * rr * 0.68, cy + Math.sin(tm * 3) * rr * 0.68); ctx.stroke();
    ctx.fillStyle = base; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 6.3); ctx.fill();
    for (i = 0; i < 6; i++) { a = tm * (0.7 + i * 0.13) + i * 1.05; ctx.fillStyle = 'rgba(255,235,200,.75)'; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr * (0.6 + 0.07 * i), cy + Math.sin(a) * rr * (0.6 + 0.07 * i), 2.4, 0, 6.3); ctx.fill(); }
    ctx.restore();
  }

function csRift(x, y, k, ct) {
    if (k <= 0.01) return;
    var i, n = 10, pts = [], g = ctx.createRadialGradient(x, y, 10, x, y, 120 + 260 * k);
    g.addColorStop(0, 'rgba(255,220,255,' + (0.35 * k).toFixed(2) + ')'); g.addColorStop(1, 'rgba(180,120,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - 400, y - 300, 800, 600);
    for (i = 0; i <= n; i++) { var yy = y - 230 + i * 46, wd = k * (6 + 62 * Math.sin(3.14 * i / n)), jx = Math.sin(i * 1.7 + ct * 0.6) * 7 + ((i * 37) % 13 - 6); pts.push([x + jx, yy, wd]); }
    ctx.save(); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i <= n; i++) ctx.lineTo(pts[i][0] + pts[i][2], pts[i][1]);
    for (i = n; i >= 0; i--) ctx.lineTo(pts[i][0] - pts[i][2], pts[i][1]);
    ctx.closePath(); ctx.shadowColor = 'rgba(255,200,255,.9)'; ctx.shadowBlur = 26; ctx.fillStyle = '#1a0d33'; ctx.fill(); ctx.shadowBlur = 0; ctx.clip();
    var ig = ctx.createLinearGradient(0, y - 230, 0, y + 230); ig.addColorStop(0, '#3a1f6e'); ig.addColorStop(0.5, '#6a3fb0'); ig.addColorStop(1, '#2a1550'); ctx.fillStyle = ig; ctx.fillRect(x - 100, y - 240, 200, 480);
    clockSpiral(x, y, 60 + 60 * k, ct * 2, 'rgba(255,225,255,.75)'); ctx.restore();
    ctx.strokeStyle = 'rgba(255,235,255,.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i <= n; i++) ctx.lineTo(pts[i][0] + pts[i][2], pts[i][1]); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i <= n; i++) ctx.lineTo(pts[i][0] - pts[i][2], pts[i][1]); ctx.stroke();
  }

function city(c1, c2) { for (var i = 0; i < 14; i++) { var x = i * 72 - 10, h = 120 + (i * 53) % 200; ctx.fillStyle = i % 2 ? c1 : c2; ctx.fillRect(x, 430 - h, 66, h); ctx.fillStyle = 'rgba(255,230,140,.5)'; for (var j = 0; j < 6; j++) if ((i + j) % 3) ctx.fillRect(x + 10 + (j % 2) * 26, 430 - h + 18 + Math.floor(j / 2) * 34, 14, 18); } }

function csGlow(x, y, r, col, a) { var g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(2, r)); g.addColorStop(0, 'rgba(' + col + ',' + a.toFixed(2) + ')'); g.addColorStop(0.5, 'rgba(' + col + ',' + (a * 0.35).toFixed(2) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); }

function ring0(x, y, r, c) {
    // ударная вспышка: светящиеся лучи и мягкое пятно вместо плоского кольца
    var i, n = 18, a, l0 = Math.max(4, r * 0.55), l1 = Math.max(10, r), m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c), col;
    if (m) col = m[1] + ',' + m[2] + ',' + m[3]; else { var hx = /^#([0-9a-f]{6})$/i.exec(c), nn = hx ? parseInt(hx[1], 16) : 0xffffff; col = (nn >> 16) + ',' + ((nn >> 8) & 255) + ',' + (nn & 255); }
    csGlow(x, y, r * 1.1, col, 0.35);
    ctx.save(); ctx.lineCap = 'round';
    for (i = 0; i < n; i++) { a = i / n * 6.283 + r * 0.004 + (i % 2) * 0.05; var len = (i % 3 === 0) ? l1 : l1 * 0.8, lg = ctx.createLinearGradient(x + Math.cos(a) * l0, y + Math.sin(a) * l0, x + Math.cos(a) * len, y + Math.sin(a) * len); lg.addColorStop(0, 'rgba(' + col + ',.85)'); lg.addColorStop(1, 'rgba(' + col + ',0)'); ctx.strokeStyle = lg; ctx.lineWidth = i % 3 === 0 ? 4 : 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * l0, y + Math.sin(a) * l0); ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); ctx.stroke(); }
    ctx.restore();
  }

function csBolt(x, y, a, len, col, w) { var i, px = x, py = y, k = 7; ctx.strokeStyle = col; ctx.lineWidth = w || 2; ctx.beginPath(); ctx.moveTo(px, py); for (i = 1; i <= k; i++) { var d = len * i / k, jit = (Math.random() - 0.5) * len * 0.22; px = x + Math.cos(a) * d - Math.sin(a) * jit; py = y + Math.sin(a) * d + Math.cos(a) * jit; ctx.lineTo(px, py); } ctx.stroke(); }

function csDomain(cx, cy, rx, ry, col, a, ct) {
    // территория: мягкое светящееся поле на земле и поднимающиеся искры вместо овала с обводкой
    var i; ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ry / rx);
    var g = ctx.createRadialGradient(0, 0, rx * 0.05, 0, 0, rx); g.addColorStop(0, 'rgba(' + col + ',' + (a * 0.55).toFixed(2) + ')'); g.addColorStop(0.7, 'rgba(' + col + ',' + (a * 0.22).toFixed(2) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
    ctx.fillStyle = g; ctx.fillRect(-rx, -rx, rx * 2, rx * 2); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (i = 0; i < 16; i++) { var px = cx + Math.sin(i * 12.7) * rx * 0.85, py0 = cy + Math.cos(i * 7.3) * ry * 0.5, py = py0 - ((ct * 40 + i * 37) % (ry * 1.7)), al = a * Math.max(0, 1 - ((ct * 40 + i * 37) % (ry * 1.7)) / (ry * 1.7)); ctx.fillStyle = 'rgba(' + col + ',' + (al * 0.9).toFixed(2) + ')'; ctx.fillRect(px - 1.5, py - 1.5, 3, 3); }
    ctx.restore();
  }

function storyRestart() {
    // «рестарт»: Меллстрой снова в Белом доме, Хоумлендер жив; монеты, вещи, навыки и ачивки остаются
    var m = save.mx; m.er = 0; m.mh = 0; m.ra = 0; m.rq = 0; m.rp = 0; m.rl = [0, 0, 0]; m.rr = 0; m.sf = 0; m.sn = 0; m.sT = 0; m.fe = 0; m.p5 = 0; m.p6 = 0; m.p6q = 0; m.hq = 0; m.mgo = 0; m.mgv = 0; m.dt = 0; c2ResetAll();
    persist(); hud();
  }

function ritFun() {
    if (cs.on || rit.on || fin.on || p5.on) return;
    var prog = save.mx.er || save.mx.mh || save.mx.sf || save.mx.fe || (save.mx.p5 | 0) > 0;
    function go() {
      csPlay((save.mx.p5 | 0) >= 6 ? 'ritfun2' : 'ritfun', function () {
        if (prog) { storyRestart(); ltGo(0, 'left', 600); toast('Время застряло и перезапустилось. Всё как в начале истории: Меллстрой в Белом доме, Хоумлендер жив. Твои коины, вещи и навыки на месте.', 8000); }
        else { ltGo(0, 'left', 600); toast('Время застряло, и тебя выбросило обратно в посёлок.', 4500); }
      });
    }
    if (!prog) { go(); return; }
    dlgShow('Круг ритуала', img.npcCollector, 'Если начать ритуал сейчас, время застрянет и перезапустится: Меллстрой снова окажется в Белом доме, а Хоумлендер оживёт. Сюжет пойдёт с начала. Коины, вещи, навыки и ачивки останутся. Начать?', [
      { t: 'Да, перезапустить время', fn: function () { dlgClose(); go(); } },
      { t: 'Нет', out: true }
    ]);
  }

function trFloor() { return seaFloor(TR_X); }

function nearTreasure() { return loc.i === 5 && subActive() && Math.abs(P.x - TR_X) < 1100 && sub.d > 4100; }

function updateCth(dt) {
    if (cthCd > 0) cthCd -= dt; if (cthMsgT > 0) cthMsgT -= dt;
    if (bHarp && kk.on && kk.cth && bHarp.textContent !== 'Торпеда') bHarp.textContent = 'Торпеда';
    if (kk.on || boss.on || paused || lt.st || !nearTreasure() || save.mx.pu) return;
    if (save.mx.ct) {
      // Ктулху побеждён: сокровище можно взять
      if (Math.abs(P.x - TR_X) < 100 && sub.d >= Math.min(trFloor() - 90, 4930)) treasureTake();
      else if (cthMsgT <= 0 && Math.abs(P.x - TR_X) < 700) { cthMsgT = 12; toast('На дне светится Глубинное сокровище. Подплыви к нему вплотную.', 4500); }
      return;
    }
    if (cthCd > 0) return;
    if (!(save.mx.lr & 8)) { cthCd = 40; sn.kT = 20; toast('Что-то огромное шевельнулось на дне. Пока непонятно, что это. Поищи ответы в секретной лаборатории.', 6000); return; }
    if (!save.fs.tp) { cthCd = 45; toast('На дне спит Ктулху. Без торпеды его не взять: чекушки он почти не чувствует. Торпеду собирают в лавке рыбака.', 7000); return; }
    cthF = true; krStart(false); cthF = false; cthCd = 30;
  }

function cthTorp() {
    if (!kk.on || !kk.cth || paused) return;
    if (!save.fs.tp) { if (noAmmoT <= 0) { noAmmoT = 1.5; sfx('no'); toast('Торпеда продаётся в лавке рыбака.', 3000); } return; }
    if (kk.st !== 'intro' && kk.st !== 'fight') return;
    if (kk.hcd > 0) { if (noAmmoT <= 0) { noAmmoT = 0.5; popup(P.x, PLAYER_H + 24 - sub.d, 'Торпеда заряжается ' + kk.hcd.toFixed(1) + ' с', '#ffd2a0'); } return; }
    if (kk.dv) { if (noAmmoT <= 0) { noAmmoT = 1; popup(P.x, PLAYER_H + 24 - sub.d, 'Ктулху скрылся', '#cfd8e6'); } return; }
    kk.hcd = TORP_CD; sfx('boom'); shk = Math.max(shk, 0.4);
    var h = krHeadPos(); ring(h.x, h.y, 150, '#ff9a3c'); burst(h.x, h.y, 28, '#ff9a3c', 420, 0.8);
    var k;
    for (k = 0; k < 6; k++) bubbles.push({ x: P.x + (h.x - P.x) * k / 6, y: gY + sub.d - 6 + (h.y - gY - sub.d) * k / 6, v: 20, r: 3 + Math.random() * 3, age: 0 });
    krDamage(TORP_DMG); popup(h.x, PLAYER_H - kk.dy + 150, 'ТОРПЕДА', '#ff9a3c');
  }

function cthFinish(win, why) {
    if (win) {
      save.mx.ct = 1; save.coins += 30000; persist(); hud(); sfx('rare'); burst(P.x, gY + sub.d, 40, '#7dffb0', 420, 1.1);
      popup(P.x, PLAYER_H + 24 - sub.d, 'КТУЛХУ ПОБЕЖДЁН!', '#7dffb0'); ach('cthulhu');
      toast('Ктулху повержен! +30 000 коинов. Подплыви к Глубинному сокровищу на дне.', 9000);
    } else if (why === 'time') toast('Время вышло: Ктулху ушёл в тьму. Возвращайся с запасом сил.', 5000);
    else { toast('Корпус не выдержал! Подлодку выбросило на поверхность, а её починили.', 6000); sub.d = 0; sub.vy = 0; }
  }

function treasureTake() {
    if (save.mx.pu) return;
    save.mx.pu = 1; purify(); persist(); hud(); trGot = 6; sfx('rare'); shk = 0.7; ach('pure');
    ring(TR_X, gY + trFloor(), 260, '#9fe3ff'); ring(TR_X, gY + trFloor(), 150, '#ffffff'); burst(TR_X, gY + trFloor() - 40, 50, '#9fe3ff', 520, 1.4);
    toast('Глубинное сокровище очищает всё: теперь все твои чекушки чистые и новые тоже. Мыть больше не придётся!', 9000);
    popup(P.x, PLAYER_H + 30 - sub.d, 'ВСЕ ЧЕКУШКИ ЧИСТЫЕ', '#9fe3ff');
  }

function drawDeepTreasure(x0, x1, dk) {
    if (save.mx.pu || TR_X < x0 - 120 || TR_X > x1 + 120) return;
    var cy = gY + trFloor(), a = 0.55 + 0.25 * Math.sin(t * 3);
    var g = ctx.createRadialGradient(TR_X, cy - 30, 4, TR_X, cy - 30, 190); g.addColorStop(0, 'rgba(160,240,255,' + a + ')'); g.addColorStop(1, 'rgba(160,240,255,0)');
    ctx.fillStyle = g; ctx.fillRect(TR_X - 200, cy - 230, 400, 260);
    ctx.fillStyle = '#3a4a66'; ctx.fillRect(TR_X - 56, cy - 40, 112, 40);
    ctx.fillStyle = '#7d98c0'; ctx.fillRect(TR_X - 56, cy - 48, 112, 12); ctx.fillStyle = '#c8e8ff'; ctx.fillRect(TR_X - 8, cy - 40, 16, 20);
    ctx.fillStyle = save.mx.ct ? '#9fe3ff' : '#4c5e7a'; ctx.beginPath(); ctx.moveTo(TR_X, cy - 120); ctx.lineTo(TR_X + 22, cy - 80); ctx.lineTo(TR_X, cy - 50); ctx.lineTo(TR_X - 22, cy - 80); ctx.closePath(); ctx.fill();
    if (!save.mx.ct) { ctx.strokeStyle = 'rgba(255,90,90,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(TR_X, cy - 60, 90 + Math.sin(t * 2) * 6, 0, 6.3); ctx.stroke(); }
  }

function spotNote() { return (loc.i === 8 && Math.abs(P.x - 1740) < 90 && P.z < 70) ? { btn: 'Листок', msg: 'Нажми E: прочитать листок', fn: noteRead, x: 1740 } : null; }

function spotRec() {
    if (loc.i !== 12) return null;
    for (var i = 0; i < REC_X.length; i++) if (Math.abs(P.x - REC_X[i]) < 90 && P.z < 70) { var k = i; return { btn: 'Читать', msg: 'Нажми E: прочитать запись', fn: function () { recRead(k); }, x: REC_X[i] }; }
    return null;
  }

function spotGym() { return (loc.i === 10 && Math.abs(P.x - GYM_X) < 130 && P.z < 70) ? { btn: 'Качалка', msg: 'Нажми E: зайти в качалку', fn: gymOpen, x: GYM_X } : null; }

function spotStone() {
    if (loc.i !== 8 || !magicOn()) return null;
    var k = stoneNear(); if (k < 0) return null;
    return { btn: '', msg: touch ? 'Жми «Магия»: активировать камень' : 'Нажми G: активировать камень магией', fn: null, x: STONE_X[k] };
  }

function nearSpot() {
    if (lt.st || busLock() || dlgOpened) return null;
    return spotRevive() || spotV220() || spotP6() || spotAv() || spotTerm() || spotEvB() || spotOfis() || spotFarm() || spotFarmx() || spotLabx() || spotGun() || spotRit() || spotNote() || spotRec() || spotGym() || spotStone() || spotSci() || spotRescue() || spotHosp() || null;
  }

function drawSpotHint() {
    var sp = nearSpot(); if (!sp || p6.mini) return;
    var msg = touch && sp.btn ? 'Жми «' + sp.btn + '»' : sp.msg;
    setCam(1);
    ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var tw = ctx.measureText(msg).width + 26, y = gY - PLAYER_H - 24;
    ctx.fillStyle = 'rgba(20,35,63,.9)'; rrect(P.x - tw / 2, y - 15, tw, 30, 14); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText(msg, P.x, y);
  }

function cqOrder() {
    if (!save.mx.cq || save.mx.cq.length !== 5) {
      var a = [0, 1, 2, 3, 4], i, j, tmp;
      for (i = 4; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
      save.mx.cq = a; persist();
    }
    return save.mx.cq;
  }

function stoneNear() {
    for (var i = 0; i < 5; i++) if (Math.abs(P.x - STONE_X[i]) < 110) return i;
    return -1;
  }

function stoneCast() {
    if (loc.i !== 8 || save.mx.cs) return false;
    var k = stoneNear(); if (k < 0) return false;
    if (mgMana < mgC(15)) { if (mgNoManaT <= 0) { mgNoManaT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Магия копит силу', '#ff9a9a'); } return true; }
    mgMana -= mgC(15); mgCd = 0.5;
    if (stoneLit[k]) { popup(STONE_X[k], 110, 'Уже горит', '#cfd8e6'); return true; }
    var ord = cqOrder();
    if (ord[stoneCp] === k) {
      stoneLit[k] = true; stoneCp++; stoneGlow[k] = 1; sfx('rare'); ring(STONE_X[k], gY - 50, 90, STONE_COL[k]); burst(STONE_X[k], gY - 50, 14, STONE_COL[k], 260, 0.7);
      if (stoneCp >= 5) {
        save.mx.cs = 1; persist(); sdAnim = 0.001; sfx('boom'); shk = 0.9; ach('stones');
        toast('Камни вспыхнули все разом. Где-то в конце лаборатории что-то загрохотало: открылся проход!', 7000);
      } else popup(STONE_X[k], 110, stoneCp + '/5', STONE_COL[k]);
    } else {
      stoneBad = 1; sfx('no'); shk = 0.4; popup(STONE_X[k], 110, 'Не тот порядок', '#ff6b6b');
      for (var i = 0; i < 5; i++) stoneLit[i] = false;
      stoneCp = 0; toast('Камни погасли: порядок неверный. Подсказка лежит где-то в лаборатории.', 4000);
    }
    return true;
  }

function noteRead() {
    var ord = cqOrder(), s = '', i;
    for (i = 0; i < 5; i++) s += (i + 1) + ') ' + STONE_CH[ord[i]] + ' ' + STONE_NAME[ord[i]] + (i < 4 ? '\n' : '');
    dlgShow('Смятый листок', null, 'Почерк торопливый, в углу кофейное пятно:\n\n«Камни в шахте зажигать магией строго по порядку, иначе погаснут и начнут сначала:\n' + s + '»', [{ t: 'Запомнил', out: true }], 'Подсказка: у каждого камня в шахте свой знак. Магия: ' + (touch ? 'кнопка «Магия»' : 'клавиша G') + ', стоя рядом с камнем.');
    ach('note');
  }

function drawStone(i) {
    var x = STONE_X[i], lit = stoneLit[i] || save.mx.cs, g = Math.max(stoneGlow[i], lit ? 0.85 : 0.12), col = STONE_COL[i];
    var rg = ctx.createRadialGradient(x, gY - 60, 4, x, gY - 60, 110); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = g * (0.45 + 0.1 * Math.sin(t * 3 + i)); ctx.fillStyle = rg; ctx.fillRect(x - 110, gY - 170, 220, 220); ctx.globalAlpha = 1;
    ctx.fillStyle = '#3b3346'; ctx.beginPath(); ctx.moveTo(x - 30, gY + 2); ctx.lineTo(x - 24, gY - 82); ctx.lineTo(x - 6, gY - 98); ctx.lineTo(x + 18, gY - 90); ctx.lineTo(x + 30, gY - 70); ctx.lineTo(x + 32, gY + 2); ctx.fill();
    ctx.fillStyle = '#4a4056'; ctx.fillRect(x - 24, gY - 80, 8, 80);
    var cx = x + 2, cy = gY - 52;
    ctx.globalAlpha = lit ? 1 : 0.55; ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 3;
    if (i === 0) { ctx.beginPath(); ctx.arc(cx, cy, 8, 0, 6.3); ctx.fill(); for (var r = 0; r < 8; r++) { var a = r * 0.785; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 12, cy + Math.sin(a) * 12); ctx.lineTo(cx + Math.cos(a) * 19, cy + Math.sin(a) * 19); ctx.stroke(); } }
    else if (i === 1) { ctx.beginPath(); ctx.arc(cx, cy, 16, 0.6, 5.7); ctx.arc(cx + 8, cy - 2, 12, 5.3, 1.0, true); ctx.fill(); }
    else if (i === 2) drawStarShape(cx, cy, 16, 0, col, col);
    else if (i === 3) { ctx.beginPath(); ctx.moveTo(cx, cy - 18); ctx.lineTo(cx + 13, cy); ctx.lineTo(cx, cy + 18); ctx.lineTo(cx - 13, cy); ctx.closePath(); ctx.fill(); }
    else { ctx.fillRect(cx - 4, cy - 17, 8, 34); ctx.fillRect(cx - 17, cy - 4, 34, 8); }
    ctx.globalAlpha = 1;
  }

function drawCaveStones(x0, x1) {
    var i;
    if (stoneBad > 0) stoneBad = Math.max(0, stoneBad - 0.03);
    for (i = 0; i < 5; i++) { if (stoneGlow[i] > 0) stoneGlow[i] = Math.max(0, stoneGlow[i] - 0.01); }
    if (x0 > STONE_X[4] + 120) return;
    for (i = 0; i < 5; i++) if (STONE_X[i] > x0 - 60 && STONE_X[i] < x1 + 60) drawStone(i);
    if (stoneBad > 0.05) { ctx.fillStyle = 'rgba(255,60,60,' + (stoneBad * 0.18).toFixed(2) + ')'; ctx.fillRect(x0, gY - 400, x1 - x0, 480); }
  }

function drawSecretDoor(x0, x1) {
    if (SD_X < x0 - 100 || SD_X > x1 + 100) return;
    var open = save.mx.cs ? Math.min(1, sdAnim > 0 ? sdAnim : 1) : 0;
    if (save.mx.cs && sdAnim > 0 && sdAnim < 1) { sdAnim = Math.min(1, sdAnim + 0.012); if (Math.random() < 0.3) burst(SD_X, gY - 100, 3, '#cfcfcf', 140, 0.6); }
    ctx.fillStyle = '#1b2230'; ctx.fillRect(SD_X - 36, gY - 220, 72, 220);
    if (open > 0) { var lg = ctx.createLinearGradient(SD_X - 30, 0, SD_X + 30, 0); lg.addColorStop(0, '#58e0c8'); lg.addColorStop(1, '#1a6a7a'); ctx.fillStyle = lg; ctx.globalAlpha = open; ctx.fillRect(SD_X - 30, gY - 206, 60, 206); ctx.globalAlpha = 1; }
    ctx.fillStyle = '#8f9cad'; ctx.fillRect(SD_X - 32, gY - 214 + 214 * (1 - open) * 0, 64, 214 * (1 - open));
    ctx.fillStyle = '#6a7686'; ctx.fillRect(SD_X - 32, gY - 214, 64, 6);
    if (!save.mx.cs) { ctx.strokeStyle = 'rgba(20,24,32,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(SD_X - 8, gY - 190); ctx.lineTo(SD_X + 4, gY - 140); ctx.lineTo(SD_X - 6, gY - 100); ctx.lineTo(SD_X + 8, gY - 40); ctx.stroke(); }
    ctx.fillStyle = save.mx.cs ? '#2fbf6b' : '#a84040'; ctx.beginPath(); ctx.arc(SD_X, gY - 228, 5, 0, 6.3); ctx.fill();
  }

function drawNoteOnTable() {
    if (loc.i !== 8 || 1740 < camX - 60 || 1740 > camX + vw + 60) return;
    ctx.fillStyle = '#fff8dc'; ctx.save(); ctx.translate(1740, gY - 54); ctx.rotate(-0.12); ctx.fillRect(-14, -5, 28, 7); ctx.fillStyle = '#c9b17a'; ctx.fillRect(-10, -3, 20, 1); ctx.fillRect(-10, -1, 14, 1); ctx.restore();
    ctx.fillStyle = 'rgba(255,240,150,' + (0.35 + 0.25 * Math.sin(t * 4)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(1740, gY - 56, 16, 0, 6.3); ctx.fill();
  }

function recRead(i) {
    var r = REC_TXT[i], first = !(save.mx.lr & (1 << i));
    save.mx.lr |= (1 << i); persist();
    dlgShow(r[0], null, r[1], [{ t: 'Закрыть', out: true }], 'Прочитано записей: ' + recCount() + ' из ' + REC_N);
    if (first) sfx('pick');
    ach('seclab');
    if (recCount() >= REC_N) { ach('lab3'); toast('Ты прочёл все записи. Поговори с профессором у стола в лаборатории. А в лавке рыбака можно собрать торпеду.', 7000); }
  }

function recCount() { var n = 0, i; for (i = 0; i < REC_N; i++) if (save.mx.lr & (1 << i)) n++; return n; }

function drawSeclabBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0d1a22'); g.addColorStop(1, '#16303a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var i, w = LOCS[12].w;
    ctx.fillStyle = '#1d3a46'; ctx.fillRect(Math.max(0, x0), gY - 360, Math.min(w, x1) - Math.max(0, x0), 360 + H / scale);
    ctx.fillStyle = '#12262e'; ctx.fillRect(Math.max(0, x0), gY - 360, Math.min(w, x1) - Math.max(0, x0), 16);
    ctx.fillStyle = '#26505e'; for (i = Math.floor(x0 / 140) * 140; i < x1; i += 140) { if (i < 0 || i > w) continue; ctx.fillRect(i + 8, gY - 330, 120, 4); ctx.fillRect(i, gY - 360, 3, 360); }
    ctx.fillStyle = '#2d5463'; ctx.fillRect(Math.max(0, x0), gY - 2, Math.min(w, x1) - Math.max(0, x0), H / scale);
    ctx.fillStyle = '#3a6a7a'; ctx.fillRect(Math.max(0, x0), gY - 2, Math.min(w, x1) - Math.max(0, x0), 5);
    // лампы
    for (i = Math.floor(x0 / 240) * 240 + 120; i < x1; i += 240) { if (i < 0 || i > w) continue; ctx.fillStyle = 'rgba(180,255,240,' + (0.55 + 0.25 * Math.sin(t * 6 + i)).toFixed(2) + ')'; ctx.fillRect(i - 40, gY - 340, 80, 6); }
    // резервуар с Хоумлендером (серым)
    var tx = 1240;
    if (tx > x0 - 140 && tx < x1 + 140) {
      ctx.fillStyle = 'rgba(120,230,220,.22)'; rrect(tx - 90, gY - 300, 180, 300, 22); ctx.fill(); ctx.strokeStyle = '#58b8b0'; ctx.lineWidth = 4; ctx.stroke();
      if (ready(img.boss)) { var bh = 230, bw = bh * img.boss.naturalWidth / img.boss.naturalHeight; ctx.globalAlpha = 0.5; ctx.drawImage(img.boss, tx - bw / 2, gY - 280 + Math.sin(t * 1.5) * 6, bw, bh); ctx.globalAlpha = 0.45; ctx.fillStyle = '#16303a'; ctx.fillRect(tx - 90, gY - 300, 180, 300); ctx.globalAlpha = 1; }
      for (i = 0; i < 6; i++) { var by2 = gY - 20 - ((t * 40 + i * 47) % 270); ctx.fillStyle = 'rgba(210,255,250,.7)'; ctx.beginPath(); ctx.arc(tx - 50 + i * 20, by2, 3, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#58b8b0'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ОБРАЗЕЦ H-1', tx, gY - 312);
    }
    if (save.mx.sf === 0) sciDraw(SCI_X, -1, 1, Math.sin(t * 2), 0);
    // терминалы с записями
    for (i = 0; i < REC_X.length; i++) {
      var rx = REC_X[i]; if (rx < x0 - 80 || rx > x1 + 80) continue;
      var rd = !!(save.mx.lr & (1 << i));
      ctx.fillStyle = '#2a4350'; ctx.fillRect(rx - 40, gY - 70, 80, 70); ctx.fillStyle = '#10202a'; ctx.fillRect(rx - 34, gY - 140, 68, 66);
      ctx.fillStyle = rd ? '#5fd8a0' : '#ffd23f'; ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 4 + i); ctx.fillRect(rx - 30, gY - 136, 60, 58); ctx.globalAlpha = 1;
      ctx.fillStyle = '#10202a'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('№' + (i + 1), rx, gY - 107);
    }
  }

function drawForestBack(x0, x1) {
    drawHills(0.18, 150, '#4f7f63', 38, 16, 2.2);
    drawHills(0.34, 96, '#3f6d54', 30, 14, 4.1);
    drawFarTrees(farTrees, 0.34, '#2e5a45', '#356a50');
    drawHills(0.5, 52, '#34603f', 22, 10, 6.0);
    drawFarTrees(midTrees, 0.58, '#254b36', '#2d5a40');
    drawGround();
    setCam(1);
  }

function drawForestFront(x0, x1) {
    if (RIT_X < x0 - 360 || RIT_X > x1 + 360) return;
    var gl = rit.glow || 0, night = dnDark(dnU()), i, a, rx, ry, base = Math.min(1, 0.3 + 0.5 * night + gl), pl = 0.5 + 0.5 * Math.sin(t * 2.2), spin = t * (gl > 0 ? 0.9 : 0.12);
    ctx.save();
    // каменная плита под кругом
    ctx.fillStyle = 'rgba(40,36,60,.55)'; ctx.beginPath(); ctx.ellipse(RIT_X, gY + 6, 214, 32, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(120,110,150,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(RIT_X, gY + 6, 214, 32, 0, 0, 6.3); ctx.stroke();
    // свечение земли
    var eg = ctx.createRadialGradient(RIT_X, gY + 4, 10, RIT_X, gY + 4, 220); eg.addColorStop(0, 'rgba(200,150,255,' + (0.25 * base + 0.2 * gl).toFixed(2) + ')'); eg.addColorStop(1, 'rgba(200,150,255,0)');
    ctx.fillStyle = eg; ctx.beginPath(); ctx.ellipse(RIT_X, gY + 4, 230, 40, 0, 0, 6.3); ctx.fill();
    // кольца и руны
    ctx.strokeStyle = 'rgba(200,160,255,' + base.toFixed(2) + ')'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(RIT_X, gY + 4, 190, 26, 0, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(RIT_X, gY + 4, 150, 20, 0, 0, 6.3); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(RIT_X, gY + 4, 96, 13, 0, 0, 6.3); ctx.stroke();
    // звезда внутри (вращается)
    ctx.strokeStyle = 'rgba(255,220,120,' + (base * 0.8).toFixed(2) + ')'; ctx.lineWidth = 2; ctx.beginPath();
    for (i = 0; i <= 5; i++) { a = spin + i * 2.513; rx = RIT_X + Math.cos(a) * 150; ry = gY + 4 + Math.sin(a) * 20; if (i) ctx.lineTo(rx, ry); else ctx.moveTo(rx, ry); }
    ctx.stroke();
    ctx.font = '700 15px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(255,225,140,' + Math.min(1, base + 0.15).toFixed(2) + ')';
    var runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ';
    for (i = 0; i < 12; i++) { a = -spin * 0.6 + i * 0.5236; rx = RIT_X + Math.cos(a) * 170; ry = gY + 4 + Math.sin(a) * 23; ctx.globalAlpha = Math.min(1, base + 0.1) * (0.6 + 0.4 * Math.sin(t * 2 + i)); ctx.fillText(runes.charAt(i), rx, ry); }
    ctx.globalAlpha = 1;
    // каменные столбики
    for (i = 0; i < 8; i++) { a = i * 0.785 + 0.39; rx = RIT_X + Math.cos(a) * 205; ry = gY + 6 + Math.sin(a) * 30; var hh = 20 + (i % 2) * 8;
      ctx.fillStyle = '#4a4566'; ctx.fillRect(rx - 5, ry - hh, 10, hh); ctx.fillStyle = '#6c668c'; ctx.fillRect(rx - 5, ry - hh, 4, hh);
      var sg = ctx.createRadialGradient(rx, ry - hh - 4, 1, rx, ry - hh - 4, 18); sg.addColorStop(0, 'rgba(255,230,150,' + Math.min(1, base + 0.2).toFixed(2) + ')'); sg.addColorStop(1, 'rgba(255,230,150,0)'); ctx.fillStyle = sg; ctx.fillRect(rx - 18, ry - hh - 22, 36, 36);
      ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(rx, ry - hh - 4, 3 + pl, 0, 6.3); ctx.fill(); }
    // столб света и вихрь при обряде
    if (gl > 0.05) {
      var lg = ctx.createLinearGradient(0, gY - 520, 0, gY); lg.addColorStop(0, 'rgba(220,190,255,0)'); lg.addColorStop(0.6, 'rgba(220,190,255,' + Math.min(0.5, gl * 0.45).toFixed(2) + ')'); lg.addColorStop(1, 'rgba(255,235,170,' + Math.min(0.7, gl * 0.6).toFixed(2) + ')');
      ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(RIT_X - 60 * gl, gY); ctx.lineTo(RIT_X - 16, gY - 520); ctx.lineTo(RIT_X + 16, gY - 520); ctx.lineTo(RIT_X + 60 * gl, gY); ctx.closePath(); ctx.fill();
      var rg = ctx.createRadialGradient(RIT_X, gY - 60, 10, RIT_X, gY - 60, 300 * Math.min(1.4, gl + 0.2)); rg.addColorStop(0, 'rgba(230,200,255,' + Math.min(0.75, gl * 0.7).toFixed(2) + ')'); rg.addColorStop(1, 'rgba(210,170,255,0)'); ctx.fillStyle = rg; ctx.fillRect(RIT_X - 320, gY - 360, 640, 420);
      ctx.strokeStyle = 'rgba(255,230,160,' + Math.min(0.8, gl).toFixed(2) + ')'; ctx.lineWidth = 2;
      for (i = 0; i < 4; i++) { ctx.beginPath(); for (var q = 0; q < 40; q++) { var u = q / 39, ang = u * 9 + t * 2.4 + i * 1.57, rr = 150 * (1 - u * 0.7) * Math.min(1, gl); var vx = RIT_X + Math.cos(ang) * rr, vy = gY - 10 - u * 280 * Math.min(1, gl) + Math.sin(ang) * rr * 0.14; if (q) ctx.lineTo(vx, vy); else ctx.moveTo(vx, vy); } ctx.stroke(); }
    }
    // светлячки ночью
    if (night > 0.3) for (i = 0; i < 18; i++) { var fx = RIT_X - 560 + ((i * 97) % 1120) + Math.sin(t * 0.7 + i) * 20, fy = gY - 40 - ((i * 53) % 190) + Math.cos(t * 0.9 + i) * 14; var fgg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 9); fgg.addColorStop(0, 'rgba(230,255,150,' + (night * (0.5 + 0.5 * Math.sin(t * 3 + i))).toFixed(2) + ')'); fgg.addColorStop(1, 'rgba(230,255,150,0)'); ctx.fillStyle = fgg; ctx.fillRect(fx - 9, fy - 9, 18, 18); }
    ctx.restore();
  }

function drawMoggityBack(x0, x1) {
    parallaxSkyline(0.25, 20, 170, 190, '#5a4a7a', 9);
    parallaxSkyline(0.45, 8, 120, 190, '#43386a', 31);
    setCam(1);
    cityBlocks(x0, x1, LOCS[10].w);
    drawCityGround(x0, x1, LOCS[10].w);
    var i, w = LOCS[10].w;
    // граффити и неон
    for (i = 0; i < 8; i++) {
      var gx = 200 + i * 520; if (gx < x0 - 120 || gx > x1 + 120 || gx > w - 100) continue;
      ctx.fillStyle = 'rgba(10,8,24,.8)'; rrect(gx - 70, gY - 230, 140, 60, 8); ctx.fill();
      ctx.fillStyle = ['#ff4fa3', '#33e0ff', '#ffd23f', '#9bff4f'][i % 4]; ctx.globalAlpha = 0.7 + 0.25 * Math.sin(t * 5 + i); ctx.font = '700 28px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(['MOG', 'MOGGED', 'MOG ZONE', 'NO MOG'][i % 4], gx, gY - 200); ctx.globalAlpha = 1;
    }
    drawOfisBack(x0, x1);
    // зал
    if (GYM_X > x0 - 260 && GYM_X < x1 + 260) {
      ctx.fillStyle = '#3a2f55'; ctx.fillRect(GYM_X - 190, gY - 190, 380, 190); ctx.fillStyle = '#2a2140'; ctx.fillRect(GYM_X - 200, gY - 202, 400, 14);
      ctx.fillStyle = '#ffd23f'; rrect(GYM_X - 130, gY - 168, 260, 52, 10); ctx.fill(); ctx.fillStyle = '#2a2140'; ctx.font = '700 30px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('КАЧАЛКА', GYM_X, gY - 142);
      ctx.fillStyle = '#9fb2c8'; ctx.fillRect(GYM_X - 60, gY - 100, 120, 100); ctx.fillStyle = '#7a8aa0'; ctx.fillRect(GYM_X - 1, gY - 100, 2, 100);
      ctx.fillStyle = '#d4dae4'; ctx.fillRect(GYM_X - 170, gY - 70, 70, 6); ctx.beginPath(); ctx.arc(GYM_X - 170, gY - 67, 11, 0, 6.3); ctx.arc(GYM_X - 100, gY - 67, 11, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#d4dae4'; ctx.fillRect(GYM_X + 100, gY - 70, 70, 6); ctx.beginPath(); ctx.arc(GYM_X + 100, gY - 67, 11, 0, 6.3); ctx.arc(GYM_X + 170, gY - 67, 11, 0, 6.3); ctx.fill();
    }
  }

function drawMoggityFront(x0, x1) {
    // безопасная зона вокруг зала
    var sx0 = GYM_X - MOG_SAFE, sx1 = GYM_X + MOG_SAFE;
    if (sx1 > x0 && sx0 < x1) { ctx.strokeStyle = 'rgba(120,255,160,.6)'; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(sx0, gY + 8); ctx.lineTo(sx1, gY + 8); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = 'rgba(120,255,160,.9)'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('безопасная зона', GYM_X, gY + 24); }
  }

function mbPower() { return 0.055 + 0.012 * gymLvl(); }

function mbPush(m) { if (m.boss) return 0.2 + 0.04 * (m.round || 0); return 0.17 + Math.min(0.12, (m.rage || 0) * 0.02); }

function mbStart(m) {
    if (mb.on || !m || av.on || cab.on) return;
    mb.on = true; mb.m = m; mb.v = 0.5; mb.t = 0; mb.hit = 0; mb.combo = 0; mb.last = 0; mb.me = 0; mb.him = 0; mb.lim = m.boss ? 16 : 14; if (m.boss) m.round = 0;
    m.face = P.x > m.x ? 1 : -1; P.face = m.x >= P.x ? 1 : -1; input.left = input.right = false; P.vx = 0;
    sfx('boom'); shk = Math.max(shk, 0.25); popup((P.x + m.x) / 2, 150, 'МОГ-БАТЛ!', '#ff3030');
  }

function mbTap() {
    if (!mb.on) return;
    var now = performance.now(); mb.combo = (now - mb.last < 380) ? mb.combo + 1 : 1; mb.last = now;
    var bonus = 1 + Math.min(0.6, mb.combo * 0.03);
    var dv = mbPower() * bonus; mb.v = Math.min(1, mb.v + dv); mb.me += dv * 100; mb.hit = 0.12;
    sfx('jump'); ring((P.x + mb.m.x) / 2, gY - 80, 40 + Math.random() * 40, '#9bff4f'); burst(mb.m.x, gY - 80, 3, '#9bff4f', 180, 0.4); mb.m.flash = 0.15;
  }

function mbEnd(win) {
    var m = mb.m, sMe = Math.round(mb.me), sHim = Math.round(mb.him), tmo = mb.t > mb.lim - 0.01;
    if (m && m.boss && win && (m.round || 0) < 2) {
      m.round = (m.round || 0) + 1; mb.v = 0.5; mb.t = 0; mb.me = 0; mb.him = 0; sfx('rare'); shk = Math.max(shk, 0.4);
      popup((P.x + m.x) / 2, 190, 'РАУНД ' + (m.round + 1) + ' из 3', '#ffd23f'); return;
    }
    mb.on = false; mb.m = null; elMb.hidden = true;
    if (!m) return;
    mbResult(win, sMe, sHim, tmo, m);
    var i = mogs.indexOf(m);
    if (m.boss) { mbBossEnd(win, m); return; }
    if (win) {
      var rw = 180 + 90 * gymLvl();
      save.coins += rw; persist(); hud(); sfx('sell');
      popup(m.x, 190, 'MOGGED', '#ff3030'); popup(m.x, 90, '+' + fmtN(rw), '#ffd23f'); burst(m.x, gY - 60, 22, '#ffd23f', 340, 0.9); ring(m.x, gY - 80, 120, '#9bff4f');
      if (i >= 0) mogs.splice(i, 1); mogSpawnT = Math.max(mogSpawnT, 4); ach('mog1');
    } else {
      m.cd = 3.2; m.rage = (m.rage || 0) + 1; m.atk = 0.35; mogSteal(m);
      m.x += (m.x >= P.x ? 1 : -1) * 120;
    }
  }

function updateMb(dt) {
    if (!mb.on) return;
    if (paused || dlgOpened) return;
    input.left = input.right = false; P.vx = 0;
    mb.t += dt; if (mb.hit > 0) mb.hit -= dt;
    if (performance.now() - mb.last > 700) mb.combo = 0;
    var pu = mbPush(mb.m) * dt; mb.v -= pu; mb.him += pu * 100;
    if (mb.t > 0.2) { mb.m.ph += dt * 6; }
    if (mb.v >= 1) mbEnd(true); else if (mb.v <= 0) mbEnd(false); else if (mb.t > mb.lim) mbEnd(mb.v > 0.5);
  }

function mbUi() {
    var near = false, i;
    if (loc.i === 10 && !mb.on && !dlgOpened && !lt.st && !gym.on && !paused) for (i = 0; i < mogs.length; i++) if (Math.abs(mogs[i].x - P.x) < 300) { near = true; break; }
    var showBtn = mb.on || near;
    if (elMbBtn.hidden === showBtn) elMbBtn.hidden = !showBtn;
    if (elMb.hidden === !mb.on) elMb.hidden = !mb.on;
    if (mb.on) { elMbFill.style.width = (mb.v * 100).toFixed(1) + '%'; var c = mb.combo > 2 ? 'x' + mb.combo : ''; elMbMe.textContent = 'ТЫ ' + Math.round(mb.me); elMbHim.textContent = (mb.m && mb.m.boss ? 'МОГГИТИ' : 'МОГЕР') + ' ' + Math.round(mb.him); elMbT.textContent = mb.m && mb.m.boss ? 'МОГ-БАТЛ · РАУНД ' + ((mb.m.round || 0) + 1) + '/3' : 'МОГ-БАТЛ'; if (elMbCombo.textContent !== c) elMbCombo.textContent = c; elMbBtn.classList.toggle('hit', mb.hit > 0); }
  }

function drawMb() {
    if (!mb.on || !mb.m) return;
    var m = mb.m, mx = (P.x + m.x) / 2, k = mb.v;
    ctx.save();
    var g = ctx.createRadialGradient(mx, gY - 70, 10, mx, gY - 70, 220); g.addColorStop(0, 'rgba(155,255,79,' + (0.18 * k).toFixed(2) + ')'); g.addColorStop(1, 'rgba(155,255,79,0)'); ctx.fillStyle = g; ctx.fillRect(mx - 230, gY - 300, 460, 340);
    ctx.strokeStyle = 'rgba(255,60,60,' + (0.25 + 0.25 * (1 - k)).toFixed(2) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(m.x, gY - 60, 70 + (1 - k) * 40, 110, 0, 0, 6.3); ctx.stroke();
    ctx.strokeStyle = 'rgba(155,255,79,' + (0.3 + 0.3 * k).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(P.x, gY - 60, 60 + k * 40, 100, 0, 0, 6.3); ctx.stroke();
    ctx.restore();
  }

function mbResult(win, me, him, tmo, m) {
    var who = m && m.boss ? 'Чикен Моггити' : 'Могер';
    elMbRes.className = win ? 'win' : 'lose';
    elMbRes.innerHTML = '<b>' + (win ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ') + '</b><span>' + (win ? 'Ты вымогал ' + who + (tmo ? ' по очкам' : ' до конца') : who + ' намогал тебя' + (tmo ? ' по очкам' : '')) + '</span><em>Ты: ' + me + '  ·  ' + who + ': ' + him + '</em>';
    elMbRes.hidden = false; clearTimeout(mbResT); mbResT = setTimeout(function () { elMbRes.hidden = true; }, 3200);
  }

function mbBossEnd(win, m) {
    if (win) { if (typeof mogOfficeWin === 'function') setTimeout(mogOfficeWin, 2600); }
    else { m.round = 0; iFrames = 1.2; popup(P.x, 190, 'Моггити сильнее. Тренируйся в качалке!', '#ff9a9a'); sfx('no'); P.x = Math.max(120, m.x - 420); }
  }

function gymLvl() { return Math.max(0, Math.min(5, save.mx.gy | 0)); }

function muscleForm() { return gymLvl() >= 5 && !save.mx.bfat && ready(img.muscle); }

function mogPower() { return 1 + gymLvl(); }

function purify() {
    var q;
    for (q = 0; q < 6; q++) {
      if (save.inv.d[q] > 0) { save.inv.c[q] += save.inv.d[q]; save.inv.d[q] = 0; }
      if (save.trk && save.trk.d[q] > 0) { save.trk.c[q] += save.trk.d[q]; save.trk.d[q] = 0; }
    }
  }

function gymOpen() {
    if (dlgOpened || gym.on) return;
    var g = gymLvl();
    if (g >= 5 && save.mx.bfat) {
      dlgShow('Качалка Моггити', img.mogg, 'Ты опять жирный после бургеров. Гигачикен внутри никуда не делся: одна короткая тренировка, и мышцы снова на виду.', [
        { t: 'Накачаться обратно · 1 500', fn: function () {
          if (save.coins < 1500) { sfx('no'); toast('Нужно 1 500 коинов.', 2500); dlgClose(); return; }
          save.coins -= 1500; save.mx.bfat = 0; persist(); hud(); netProfile(); dlgClose(); sfx('rare'); shk = 0.5; ring(P.x, gY - 80, 160, '#ffd23f'); burst(P.x, gY - 60, 24, '#ffd23f', 320, 0.9); toast('Форма качка вернулась. Бургерный буст сохранился.', 4500);
        } },
        { t: 'Потом', out: true }
      ], 'Заряды бургерного буста не пропадут.');
      return;
    }
    if (g >= 5) {
      dlgShow('Качалка Моггити', img.mogg, 'Ты уже Гигачикен. Тренера нечему тебе учить: можешь просто стоять и сиять. Двери открыты, но железо тебя боится.', [{ t: 'Приятно', out: true }], 'Сила могa: ' + mogPower() + '. Форма качка включена.');
      return;
    }
    var cost = GYM_COST[g];
    dlgShow('Качалка Моггити', img.mogg, 'Тут все могут всех могнуть, но только тот, кто качается. Твой уровень: ' + GYM_NAME[g] + ' (' + g + ' из 5).\nТренировка: ' + cost + ' ' + coinWord(cost) + '. Надо успеть сделать 10 повторений за 8 секунд (' + (touch ? 'жми кнопку действия' : 'жми E') + ' в такт).\nКаждый уровень добавляет силы твоему «мог».', [
      { t: 'Тренироваться за ' + fmtN(cost), fn: function () {
        if (save.coins < cost) { sfx('no'); dlgShow('Качалка Моггити', img.mogg, 'Без коинов железо не поднимается. Приходи с ' + fmtN(cost) + '.', [{ t: 'Ладно', out: true }]); return; }
        save.coins -= cost; persist(); hud(); dlgClose();
        gym.on = true; gym.t = 8; gym.reps = 0; gym.need = 10; gym.last = 0; sfx('pick');
        toast('Качаемся! Жми ' + (touch ? 'кнопку действия' : 'E') + ' как можно быстрее.', 2500);
      } },
      { t: 'Уйти', out: true }
    ], 'Сила «мог» сейчас: ' + mogPower() + (g === 4 ? ' · следующий уровень откроет форму качка' : ''));
  }

function gymRep() {
    if (!gym.on) return;
    var n = performance.now();
    if (n - gym.last < 90) return;
    gym.last = n; gym.reps++; sfx('wash'); popup(P.x, PLAYER_H + 20, gym.reps + '/' + gym.need, '#ffd23f'); burst(P.x, gY - 60, 3, '#ffd23f', 120, 0.4);
    if (gym.reps >= gym.need) gymEnd(true);
  }

function gymEnd(ok) {
    gym.on = false;
    if (ok) {
      save.mx.gy = gymLvl() + 1; persist(); netProfile(); sfx('rare'); shk = 0.5; ring(P.x, gY - 80, 160, '#ffd23f'); burst(P.x, gY - 60, 24, '#ffd23f', 320, 0.9);
      ach('gym1');
      if (gymLvl() >= 5) { ach('gym5'); toast('Ты стал Гигачикеном! Форма качка включена навсегда. Сила «мог» теперь максимальная.', 7500); }
      else toast('Уровень качалки: ' + GYM_NAME[gymLvl()] + '. Сила «мог»: ' + mogPower() + '.', 4500);
    } else { sfx('no'); toast('Не успел. Взнос сгорел, но мышцы запомнили. Попробуй ещё раз.', 3500); }
  }

function updateGym(dt) {
    input.left = input.right = false; input.up = false; P.vx = 0;
    gym.t -= dt;
    if (gym.t <= 0 && gym.on) gymEnd(false);
  }

function drawGymHud() {
    if (!gym.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var w = Math.min(340, W - 40), x = W / 2 - w / 2, y = H * 0.16;
    ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(x - 8, y - 8, w + 16, 52, 12); ctx.fill();
    ctx.fillStyle = '#2b3b5c'; ctx.fillRect(x, y + 22, w, 14);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(x, y + 22, w * Math.min(1, gym.reps / gym.need), 14);
    ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('ЖМИ ' + (touch ? 'КНОПКУ' : 'E') + '! · ' + Math.max(0, gym.t).toFixed(1) + ' с', W / 2, y + 8);
  }

function mogSteal(m) {
    var r = Math.random(), tot = dirtyN() + cleanN(), q, lose, n;
    popup(P.x, PLAYER_H + 64, 'MOGGED', '#ff3030'); shk = Math.max(shk, 0.3);
    if (r < 0.4 || (r >= 0.7 && tot <= 0 && save.coins <= 0)) { iFrames = 0.9; hurt(10); return; }
    if (r < 0.7 && save.coins > 0 || (r >= 0.7 && tot <= 0)) {
      lose = Math.min(save.coins, Math.max(25, Math.floor(save.coins * 0.05)));
      save.coins -= lose; persist(); hud(); sfx('no'); popup(P.x, PLAYER_H + 28, '−' + fmtN(lose), '#ffd23f'); toast('Могер забрал у тебя ' + fmtN(lose) + ' ' + coinWord(lose) + '.', 3000);
      return;
    }
    if (tot > 0) {
      n = Math.max(1, Math.ceil(tot * 0.25));
      for (q = 0; q < 6 && n > 0; q++) {
        while (n > 0 && save.inv.d[q] > 0) { save.inv.d[q]--; save.carried = Math.max(0, save.carried - 1); n--; }
        while (n > 0 && save.inv.c[q] > 0) { save.inv.c[q]--; save.carried = Math.max(0, save.carried - 1); n--; }
      }
      persist(); hud(); sfx('no'); toast('Могер вырвал у тебя часть чекушек.', 3000);
    } else { iFrames = 0.9; hurt(10); }
  }

function updateMog(dt) {
    if (save.mx.pu) purify();
    if (mogCd > 0) mogCd -= dt;
    if (gym.on) updateGym(dt);
    mbUi();
    if (mb.on) { if (loc.i !== 10 && loc.i !== 14) { mb.on = false; mb.m = null; elMb.hidden = true; } else { updateMb(dt); return; } }
    if (loc.i !== 10) { mogs.length = 0; return; }
    if (paused || lt.st || dlgOpened) return;
    var safe = Math.abs(P.x - GYM_X) < MOG_SAFE || av.on || cab.on, i;
    mogSpawnT -= dt;
    if (mogSpawnT <= 0 && mogs.length < 4) {
      mogSpawnT = 5;
      var sx = P.x + (Math.random() < 0.5 ? -1 : 1) * (650 + Math.random() * 450);
      if (sx > 150 && sx < WORLD_W - 150 && Math.abs(sx - GYM_X) > MOG_SAFE + 80) mogs.push({ x: sx, hp: 6, cd: 1.2, flash: 0, ph: Math.random() * 6, face: -1, atk: 0 });
    }
    for (i = mogs.length - 1; i >= 0; i--) {
      var m = mogs[i], dx = P.x - m.x, ad = Math.abs(dx);
      m.ph += dt; if (m.cd > 0) m.cd -= dt; if (m.flash > 0) m.flash -= dt; if (m.atk > 0) m.atk -= dt;
      if (!safe && !gym.on && ad < 800) {
        m.face = dx > 0 ? 1 : -1;
        if (ad > 80) m.x += m.face * 175 * dt;
        else if (m.cd <= 0 && iFrames <= 0 && P.z < 80) { m.cd = 2.6; mbStart(m); }
      } else if (ad > 800) { m.x += m.face * 40 * dt; if (m.x < 120 || m.x > WORLD_W - 120) m.face = -m.face; }
      if (Math.abs(m.x - GYM_X) < MOG_SAFE) m.x += (m.x >= GYM_X ? 1 : -1) * 220 * dt;
    }
  }

function mogAct() {
    if (mb.on) { mbTap(); return; }
    if (av.on || cab.on) { popup(P.x, PLAYER_H + 24, 'С борта не могнуть', '#cfd8e6'); return; }
    if (mogCd > 0) return; mogCd = 0.4;
    var best = null, bd = 1e9, i, d;
    for (i = 0; i < mogs.length; i++) { d = Math.abs(mogs[i].x - P.x); if (d < 240 && d < bd) { bd = d; best = mogs[i]; } }
    if (!best) { popup(P.x, PLAYER_H + 24, 'Рядом никого', '#cfd8e6'); return; }
    mbStart(best);
  }

function mogImg() {
    if (mogCv) return mogCv;
    var c = document.createElement('canvas'); c.width = img.muscle.naturalWidth; c.height = img.muscle.naturalHeight;
    var g = c.getContext('2d'); try { g.filter = 'hue-rotate(250deg) brightness(.8)'; } catch (e) {} g.drawImage(img.muscle, 0, 0);
    mogCv = c; return c;
  }

function drawMoggers() {
    drawOfisBoss();
    if (loc.i !== 10 || !ready(img.muscle)) return;
    var i, h = PLAYER_H * 1.15, w = h * img.muscle.naturalWidth / img.muscle.naturalHeight;
    for (i = 0; i < mogs.length; i++) {
      var m = mogs[i]; if (m.x < camX - 140 || m.x > camX + vw + 140) continue;
      var lunge = m.atk > 0 ? Math.sin((0.35 - m.atk) / 0.35 * Math.PI) * 26 * m.face : 0;
      ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(m.x, gY + 3, 36, 7, 0, 0, 6.3); ctx.fill();
      ctx.save(); ctx.translate(m.x + lunge, gY + Math.abs(Math.sin(m.ph * 8)) * -3); ctx.scale(m.face > 0 ? -1 : 1, 1);
      if (m.flash > 0) ctx.globalAlpha = 0.55;
      ctx.drawImage(mogImg(), -w / 2, -h, w, h);
      ctx.restore(); ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(20,35,63,.85)'; ctx.fillRect(m.x - 30, gY - h - 22, 60, 8); ctx.fillStyle = '#9bff4f'; ctx.fillRect(m.x - 28, gY - h - 20, 56 * Math.max(0, m.hp) / 6, 4);
      ctx.fillStyle = '#d9c8ff'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('МОГЕР', m.x, gY - h - 32);
    }
  }

function ritNear() { return loc.i === 11 && Math.abs(P.x - RIT_X) < 210; }

function spotRit() {
    if (loc.i !== 11 || rit.on || fin.on || p5.on || p6.on || cs.on || !ritNear()) return null;
    return { btn: 'Круг', msg: touch ? 'Жми «Круг»: навыки магии и ритуал' : 'Нажми E: круг ритуала (навыки магии)', fn: ritMenu, x: RIT_X };
  }

function ritStart() {
    if (rit.on || save.mx.rr !== 1) return;
    if (!dnIsNight()) { toast('Обряд проводят только ночью.', 3000); return; }
    if (dnNightLeft() < 22) { sfx('no'); toast('Ночь на исходе: не успеем. Дождись следующей ночи.', 4000); return; }
    rit.on = true; rit.t = 0; rit.glow = 0; rit.line = ''; rit.step = 0; sfx('rare');
    P.x = RIT_X; P.face = 1; P.vx = 0;
  }

function updateRit(dt) {
    if (!rit.on) {
      if (rit.auto && !lt.st && !dlgOpened && loc.i !== 11) { rit.autoT = (rit.autoT || 0) + dt; if (rit.autoT > 2.5) { rit.auto = false; rit.autoT = 0; } }
      if (rit.auto && loc.i === 11 && !lt.st && !dlgOpened) { rit.auto = false; rit.autoT = 0; if (save.mx.rr === 1) ritStart(); }
      return;
    }
    if (loc.i !== 11 || paused && false) { rit.on = false; return; }
    input.left = input.right = false; input.up = false; P.vx = 0;
    rit.t += dt; rit.glow = Math.min(1.3, rit.t / 11);
    while (rit.step < RIT_LINES.length && rit.t >= RIT_LINES[rit.step][0]) { rit.line = RIT_LINES[rit.step][1]; rit.step++; sfx('pick'); }
    if (Math.random() < 0.5) burst(RIT_X + (Math.random() - 0.5) * 300, gY - 10, 1, '#d9b8ff', 150, 1.2);
    if (rit.t > 4 && Math.random() < 0.08) ring(RIT_X, gY, 60 + Math.random() * 130, '#d9b8ff');
    if (rit.t >= 14.5) {
      rit.on = false; rit.glow = 0; save.mx.rr = 0; persist();
      rvRevive();
    }
  }

function drawRitCine() {
    if (!rit.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var bh = H * 0.09 * Math.min(1, rit.t / 0.8); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, bh); ctx.fillRect(0, H - bh, W, bh);
    if (rit.line) {
      ctx.font = '700 ' + Math.max(16, Math.min(24, W / 38)) + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = ctx.measureText(rit.line).width + 30, y = H - bh - 36;
      ctx.fillStyle = 'rgba(20,10,40,.8)'; rrect(W / 2 - tw / 2, y - 18, tw, 36, 14); ctx.fill(); ctx.fillStyle = '#efe0ff'; ctx.fillText(rit.line, W / 2, y);
    }
    if (rit.t > 12.8) { ctx.globalAlpha = Math.min(1, (rit.t - 12.8) / 1.5); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  }

function drawForestCollector() {
    if (loc.i !== 11 || save.mx.rr !== 1 || !ready(img.npcCollector)) return;
    var h = 120, w = h * img.npcCollector.naturalWidth / img.npcCollector.naturalHeight;
    ctx.drawImage(img.npcCollector, RIT_X + 130 - w / 2, gY - h, w, h);
    ctx.fillStyle = '#efe0ff'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Собиратель', RIT_X + 130, gY - h - 10);
  }

function ritTalk() {
    var im = img.npcCollector;
    if (!dnIsNight()) {
      dlgShow('Собиратель чекушек', im, 'Все пять заданий выполнены, магия готова. Но обряд проводят только ночью, под звёздами.\nДождись темноты: ночь через ' + fmtTime(dnToNight()) + '. Когда стемнеет, поговори со мной ещё раз, и я отведу тебя в Лес.', [{ t: 'Дождусь ночи', out: true }], 'Время суток видно сверху экрана.');
      return;
    }
    if (dnNightLeft() < 22) {
      dlgShow('Собиратель чекушек', im, 'Ночь уже на исходе, не успеем. Дождёмся следующей.', [{ t: 'Ладно', out: true }], 'Ночь через ' + fmtTime(dnToNight()));
      return;
    }
    dlgShow('Собиратель чекушек', im, 'Стемнело. Самое время. Пойдём в Лес: там, на поляне, есть круг. Встанешь в него, и я проведу обряд.', [
      { t: 'Веди меня', fn: function () { dlgClose(); lt.st = 'out'; lt.t = 0; lt.dest = 11; lt.side = 'left'; lt.atX = RIT_X - 110; rit.auto = true; sfx('jump'); } },
      { t: 'Позже', out: true }
    ]);
  }

function ofPort() {
    if (!ofPortC && ready(img.mogg)) { try { var hp = headPort(img.mogg); if (hp) ofPortC = hp; } catch (e) {} }
    return ofPortC || img.mogg;
  }

function spotOfis() {
    if (mb.on) return null;
    if (loc.i === 10) return (Math.abs(P.x - OFF_X) < 170 && P.z < 70) ? { btn: 'Офис', msg: 'Нажми E: войти в офис Моггити', fn: function () { ltGo(14, 'left', MO_EXIT + 60); }, x: OFF_X } : null;
    if (loc.i !== 14 || P.z > 70) return null;
    if (Math.abs(P.x - MO_EXIT) < 90) return { btn: 'Выйти', msg: 'Нажми E: выйти на улицу', fn: function () { ltGo(10, 'left', OFF_X); }, x: MO_EXIT };
    if (Math.abs(P.x - (MO_DESK - 120)) < 150 && save.mx.mgo !== 1) return { btn: 'Моггити', msg: 'Нажми E: заговорить с Моггити', fn: ofisTalk, x: MO_DESK - 120 };
    if (Math.abs(P.x - K8_X) < 150) return { btn: 'Круг', msg: touch ? 'Жми «Круг»' : 'Нажми E: круг Ктулху', fn: k8Talk, x: K8_X };
    return null;
  }

function ofisTalk() {
    var g = save.mx.mgo | 0;
    if (g === 2) { dlgShow('Чикен Моггити', ofPort(), '…', [{ t: 'Уйти', out: true }]); return; }
    var ch = [
      { t: 'Вызвать на мог-батл (3 раунда)', fn: function () { dlgClose(); ofStart(); } },
      { t: 'Уйти', out: true }
    ];
    dlgShow('Чикен Моггити', ofPort(), 'Ты в моём офисе. Значит, пришёл за мной. Давай решим всё по-могерски: три раунда мог-батла. Кто мог сильнее, тот и прав.', ch);
  }

function ofStart() {
    if (mb.on || loc.i !== 14 || save.mx.mgo) return;
    ofBoss.round = 0; ofBoss.x = MO_DESK + 20; P.x = MO_DESK - 330; P.face = 1; P.z = 0; P.vz = 0;
    mbStart(ofBoss);
  }

function mogOfficeWin() {
    elMbRes.hidden = true; if (save.mx.mgo || loc.i !== 14) return;
    var ch = [
      { t: 'Пощадить', fn: function () { dlgClose(); ofSpare(); } },
      { t: 'Добить', fn: function () { dlgClose(); ofKill(); } }
    ];
    dlgShow('Чикен Моггити', ofPort(), 'Ты вымогал меня… Три раунда подряд.', ch, 'Моггити лежит перед тобой и больше ничего не говорит. Что ты сделаешь?');
  }

function ofSpare() {
    var first = !save.mx.mgo && !achOwn.mgo; save.mx.mgo = 2; save.mx.mgv = 1; if (first) save.coins += 20000; persist(); hud(); ach('mgo'); ach('mgs'); sfx('rare');
    csPlay('mogspare', function () { toast('Ты пощадил Моггити' + (first ? ' (+20 000 коинов)' : '') + '. Он ничего не ответил.', 7000); });
  }

function ofKill() {
    var first = !save.mx.mgo && !achOwn.mgo; save.mx.mgo = 1; save.mx.mgv = 1; if (first) save.coins += 50000; persist(); hud(); ach('mgo'); ach('mgk'); sfx('boom');
    csPlay('mogkill', function () { toast('Чикен Моггити убит' + (first ? ' (+50 000 коинов)' : '') + '.', 7000); });
  }

function drawOfisBack(x0, x1) {
    if (OFF_X < x0 - 320 || OFF_X > x1 + 320) return;
    var X = OFF_X, g = ctx.createLinearGradient(0, gY - 470, 0, gY); g.addColorStop(0, '#2b1f48'); g.addColorStop(1, '#3d2c66');
    ctx.fillStyle = g; ctx.fillRect(X - 230, gY - 470, 460, 470);
    ctx.fillStyle = '#1a1230'; ctx.fillRect(X - 244, gY - 484, 488, 16);
    var r, c, lit;
    for (r = 0; r < 5; r++) for (c = 0; c < 5; c++) { lit = ((r * 7 + c * 3) % 4) !== 0; ctx.fillStyle = lit ? 'rgba(255,230,140,' + (0.5 + 0.2 * Math.sin(t * 2 + r + c)).toFixed(2) + ')' : '#1b1430'; ctx.fillRect(X - 200 + c * 82, gY - 440 + r * 64, 56, 38); }
    ctx.fillStyle = '#0e0a1c'; rrect(X - 190, gY - 262, 380, 62, 10); ctx.fill();
    ctx.save(); ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 18; ctx.fillStyle = '#ff4a4a'; ctx.font = '700 36px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ОФИС МОГГИТИ', X, gY - 231); ctx.restore();
    ctx.fillStyle = '#120c24'; ctx.fillRect(X - 62, gY - 150, 124, 150); ctx.fillStyle = 'rgba(255,60,60,.35)'; ctx.fillRect(X - 52, gY - 140, 104, 140);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(X + 40, gY - 80, 8, 14);
    ctx.fillStyle = '#7a5aa8'; ctx.fillRect(X - 232, gY - 6, 464, 6);
  }

function drawMoffBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a1030'); g.addColorStop(1, '#2c1a4a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[14].w, a = Math.max(0, x0), b = Math.min(w, x1), i, k;
    var wg = ctx.createLinearGradient(0, gY - 380, 0, gY); wg.addColorStop(0, '#241540'); wg.addColorStop(1, '#3a2563'); ctx.fillStyle = wg; ctx.fillRect(a, gY - 380, b - a, 380);
    // панорамные окна на ночной город
    for (i = Math.floor(a / 640) * 640; i < b; i += 640) {
      var wx = i + 330; if (wx > b + 300) continue;
      var sk = ctx.createLinearGradient(0, gY - 340, 0, gY - 130); sk.addColorStop(0, '#0d0a24'); sk.addColorStop(1, '#4a2a6a'); ctx.fillStyle = sk; ctx.fillRect(wx, gY - 340, 300, 210);
      ctx.fillStyle = '#ffe9a8'; for (k = 0; k < 30; k++) ctx.fillRect(wx + (k * 53) % 290, gY - 335 + (k * 37) % 80, 1.6, 1.6);
      ctx.fillStyle = '#1a1235'; for (k = 0; k < 8; k++) { var bh = 50 + ((k * 41 + i) % 90); ctx.fillRect(wx + 6 + k * 36, gY - 130 - bh, 30, bh); ctx.fillStyle = 'rgba(255,215,120,.8)'; ctx.fillRect(wx + 12 + k * 36, gY - 130 - bh + 10, 5, 5); ctx.fillRect(wx + 22 + k * 36, gY - 130 - bh + 24, 5, 5); ctx.fillStyle = '#1a1235'; }
      ctx.strokeStyle = '#6a4a9a'; ctx.lineWidth = 6; ctx.strokeRect(wx, gY - 340, 300, 210); ctx.beginPath(); ctx.moveTo(wx + 150, gY - 340); ctx.lineTo(wx + 150, gY - 130); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(wx, gY - 130); ctx.lineTo(wx + 120, gY - 340); ctx.lineTo(wx + 170, gY - 340); ctx.lineTo(wx + 50, gY - 130); ctx.closePath(); ctx.fill();
    }
    // панели, плинтус, неон «МОГ»
    ctx.fillStyle = '#1a1030'; ctx.fillRect(a, gY - 100, b - a, 100); ctx.fillStyle = '#6a4a9a'; ctx.fillRect(a, gY - 102, b - a, 3);
    for (i = Math.floor(a / 120) * 120; i < b; i += 120) { ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(i + 8, gY - 92, 104, 84); }
    for (i = 0; i < 4; i++) { var nx = 420 + i * 600; if (nx < a - 100 || nx > b + 100) continue; ctx.save(); ctx.shadowColor = ['#ff3030', '#33e0ff', '#9bff4f', '#ffd23f'][i]; ctx.shadowBlur = 16; ctx.fillStyle = ['#ff4a4a', '#33e0ff', '#9bff4f', '#ffd23f'][i]; ctx.font = '700 40px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = 0.75 + 0.2 * Math.sin(t * 4 + i); ctx.fillText(['МОГ', 'MOG', 'NO MOG', 'MOGGED'][i], nx, gY - 400 + 40); ctx.restore(); }
    // потолок
    ctx.fillStyle = '#120a22'; ctx.fillRect(a, gY - 400, b - a, 22);
    for (i = Math.floor(a / 220) * 220; i < b; i += 220) { ctx.fillStyle = 'rgba(255,200,255,.8)'; ctx.fillRect(i + 70, gY - 382, 80, 4); var lg = ctx.createLinearGradient(0, gY - 380, 0, gY - 240); lg.addColorStop(0, 'rgba(255,170,255,.18)'); lg.addColorStop(1, 'rgba(255,170,255,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(i + 70, gY - 380); ctx.lineTo(i + 150, gY - 380); ctx.lineTo(i + 210, gY - 240); ctx.lineTo(i + 10, gY - 240); ctx.closePath(); ctx.fill(); }
    // красный ковёр и пол
    var fg = ctx.createLinearGradient(0, gY - 2, 0, gY + 90); fg.addColorStop(0, '#5a1622'); fg.addColorStop(0.1, '#7a1f2e'); fg.addColorStop(1, '#3a0e18'); ctx.fillStyle = fg; ctx.fillRect(a, gY - 2, b - a, H / scale);
    ctx.fillStyle = '#d6b24a'; ctx.fillRect(a, gY - 2, b - a, 3); ctx.fillStyle = 'rgba(214,178,74,.5)'; ctx.fillRect(a, gY + 16, b - a, 2);
    // кубки и штанги вдоль стены
    for (i = 0; i < 5; i++) { var tx = 640 + i * 360; if (tx < a - 60 || tx > b + 60 || Math.abs(tx - MO_DESK) < 240) continue; ctx.fillStyle = '#d6b24a'; ctx.fillRect(tx - 14, gY - 70, 28, 6); ctx.fillRect(tx - 4, gY - 104, 8, 34); ctx.beginPath(); ctx.moveTo(tx - 22, gY - 150); ctx.lineTo(tx + 22, gY - 150); ctx.lineTo(tx + 12, gY - 104); ctx.lineTo(tx - 12, gY - 104); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1a1030'; ctx.fillRect(tx - 12, gY - 62, 24, 62); ctx.fillStyle = '#d6b24a'; ctx.fillRect(tx - 14, gY - 66, 28, 5); }
    // дверь выхода
    var dx = MO_EXIT; if (dx > x0 - 140 && dx < x1 + 140) { ctx.fillStyle = '#6a4a9a'; ctx.fillRect(dx - 52, gY - 200, 104, 200); ctx.fillStyle = '#2a1a44'; ctx.fillRect(dx - 44, gY - 192, 88, 192); ctx.fillStyle = 'rgba(255,60,60,.4)'; ctx.fillRect(dx - 36, gY - 180, 72, 70); ctx.fillStyle = '#fff'; rrect(dx - 40, gY - 244, 80, 30, 8); ctx.fill(); ctx.fillStyle = '#4a2a7a'; ctx.font = '700 15px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВЫХОД', dx, gY - 229); }
    drawK8Circle(x0, x1);
    // стол Моггити и кресло
    var X = MO_DESK;
    if (X > x0 - 300 && X < x1 + 300) {
      var sitting = !(mb.on && mb.m === ofBoss) && save.mx.mgo !== 1;
      ctx.fillStyle = '#1a0d2a'; ctx.beginPath(); ctx.moveTo(X + 120, gY - 160); ctx.lineTo(X + 200, gY - 160); ctx.lineTo(X + 210, gY); ctx.lineTo(X + 110, gY); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#2a1640'; rrect(X + 126, gY - 240, 70, 100, 14); ctx.fill();
      if (save.mx.mgo === 1) { ctx.fillStyle = '#1a1020'; ctx.fillRect(X + 90, gY - 6, 80, 6); ctx.fillStyle = '#3a3a48'; ctx.beginPath(); ctx.ellipse(X + 40, gY - 4, 30, 6, 0, 0, 6.3); ctx.fill(); ctx.fillRect(X + 22, gY - 30, 36, 26); ctx.fillStyle = '#ffd23f'; ctx.font = '700 12px "Rubik", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('шляпа Моггити', X + 40, gY - 40); }
      else if (sitting && ready(img.mogg)) { var h2 = 185, w2 = h2 * img.mogg.naturalWidth / img.mogg.naturalHeight; ctx.save(); ctx.translate(X + 40, gY - 30 + Math.sin(t * 2) * 1.5); ctx.scale(-1, 1); ctx.drawImage(img.mogg, -w2 / 2, -h2, w2, h2); ctx.restore(); ctx.fillStyle = '#ff9a9a'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(save.mx.mgo === 2 ? 'ЧИКЕН МОГГИТИ (пощажён)' : 'ЧИКЕН МОГГИТИ', X + 40, gY - h2 - 46); }
      var dg = ctx.createLinearGradient(0, gY - 80, 0, gY); dg.addColorStop(0, '#5a3418'); dg.addColorStop(1, '#2e1a0a'); ctx.fillStyle = dg; ctx.fillRect(X - 150, gY - 84, 300, 84); ctx.fillStyle = '#7a4a22'; ctx.fillRect(X - 160, gY - 92, 320, 10); ctx.fillStyle = '#d6b24a'; ctx.fillRect(X - 160, gY - 82, 320, 2);
      ctx.fillStyle = '#10101a'; ctx.fillRect(X - 110, gY - 138, 66, 46); ctx.fillStyle = '#7ad8ff'; ctx.fillRect(X - 106, gY - 134, 58, 36); ctx.fillStyle = '#10101a'; ctx.fillRect(X + 70, gY - 128, 50, 36); ctx.fillStyle = '#9bff4f'; ctx.fillRect(X + 74, gY - 124, 42, 28);
    }
  }

function drawOfisBoss() {
    // в бою Моггити встаёт из-за стола
    var b = ofBoss; if (loc.i !== 14 || !(mb.on && mb.m === b) || !ready(img.mogg)) return;
    b.ph += 0.016; var h = 200, w = h * img.mogg.naturalWidth / img.mogg.naturalHeight, bob = Math.sin(b.ph * 40) * 3;
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(b.x, gY + 3, 52, 9, 0, 0, 6.3); ctx.fill();
    ctx.save(); ctx.translate(b.x, gY + bob); ctx.scale(-1, 1); ctx.drawImage(img.mogg, -w / 2, -h, w, h); ctx.restore();
    var gl = ctx.createRadialGradient(b.x, gY - 100, 20, b.x, gY - 100, 160); gl.addColorStop(0, 'rgba(255,50,50,.3)'); gl.addColorStop(1, 'rgba(255,50,50,0)'); ctx.fillStyle = gl; ctx.fillRect(b.x - 170, gY - 270, 340, 340);
    ctx.fillStyle = '#ff9a9a'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ЧИКЕН МОГГИТИ', b.x, gY - h - 12);
  }

function ltGo(dest, side, atX) { lt.st = 'out'; lt.t = 0; lt.dest = dest; lt.side = side; lt.atX = atX; sfx('jump'); }

function healLeft() { return Math.max(0, ((save.mx.hd || 0) - Date.now()) / 1000); }

function sciDraw(x, face, sc, ph, kind, alpha) {
    var sp = kind === 0 ? img.sci : (kind === 1 ? img.doc : null);
    if (sp && ready(sp)) {
      var h = 128 * sc, w = h * sp.naturalWidth / sp.naturalHeight, bob = Math.abs(Math.sin(ph * 6)) * (ph ? 2 : 0);
      ctx.save(); ctx.translate(x, gY - bob); if (alpha != null) ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 3, w * 0.34, 6, 0, 0, 6.3); ctx.fill();
      ctx.scale(face > 0 ? -1 : 1, 1); ctx.drawImage(sp, -w / 2, -h, w, h); ctx.restore(); return;
    }
    ctx.save(); ctx.translate(x, gY); ctx.scale(face * sc, sc); if (alpha != null) ctx.globalAlpha = alpha;
    var coat = kind === 1 ? '#6fcfae' : (kind === 2 ? '#ffc4d6' : '#f2f6ff'), sw = Math.sin(ph * 6) * 5;
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 3, 26, 6, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#e08a22'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-6, -34); ctx.lineTo(-8 + sw, -2); ctx.moveTo(8, -34); ctx.lineTo(10 - sw, -2); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-18, -70); ctx.quadraticCurveTo(-40, -78, -34, -96); ctx.quadraticCurveTo(-22, -84, -12, -80); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -62, 24, 30, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = coat; ctx.beginPath(); ctx.moveTo(-23, -80); ctx.lineTo(23, -80); ctx.lineTo(28, -26); ctx.lineTo(-28, -26); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(40,70,110,.35)'; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -80); ctx.lineTo(0, -26); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(14, -98, 15, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#d33a3a'; ctx.beginPath(); ctx.arc(8, -113, 5, 0, 6.3); ctx.arc(15, -115, 5.5, 0, 6.3); ctx.arc(22, -112, 4.5, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#f0a020'; ctx.beginPath(); ctx.moveTo(27, -100); ctx.lineTo(39, -96); ctx.lineTo(27, -93); ctx.fill();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(21, -101, 2.2, 0, 6.3); ctx.fill();
    if (kind === 0) { ctx.strokeStyle = '#222'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(21, -101, 6.5, 0, 6.3); ctx.moveTo(14, -101); ctx.lineTo(6, -103); ctx.stroke(); }
    else { ctx.fillStyle = '#fff'; ctx.fillRect(4, -116, 22, 7); ctx.fillStyle = '#d33a3a'; ctx.fillRect(13, -115, 4, 5); ctx.fillRect(11.5, -113.5, 7, 2); }
    ctx.restore();
  }

function headPort(sp) {
    try {
      var c = document.createElement('canvas'); c.width = 160; c.height = 160; var g = c.getContext('2d');
      g.fillStyle = '#cfe3f2'; g.fillRect(0, 0, 160, 160);
      var sw = sp.naturalWidth * 0.78, sh = sw;
      g.drawImage(sp, sp.naturalWidth * 0.05, 0, sw, sh, 0, 0, 160, 160);
      return { src: c.toDataURL('image/png') };
    } catch (e) { return null; }
  }

function docPort() {
    if (!docPortC && ready(img.doc)) docPortC = headPort(img.doc);
    return docPortC || sciPort();
  }

function sciPort() {
    if (!sciPortC && ready(img.sci)) { var hp = headPort(img.sci); if (hp) sciPortC = hp; }
    if (sciPortC) return sciPortC;
    try {
      var c = document.createElement('canvas'); c.width = 160; c.height = 160; var g = c.getContext('2d');
      g.fillStyle = '#cfe3f2'; g.fillRect(0, 0, 160, 160); g.fillStyle = '#f2f6ff'; g.fillRect(0, 120, 160, 40);
      g.fillStyle = '#fff'; g.beginPath(); g.arc(78, 82, 46, 0, 6.3); g.fill();
      g.fillStyle = '#d33a3a'; g.beginPath(); g.arc(58, 36, 14, 0, 6.3); g.arc(78, 30, 16, 0, 6.3); g.arc(98, 36, 13, 0, 6.3); g.fill();
      g.fillStyle = '#f0a020'; g.beginPath(); g.moveTo(112, 84); g.lineTo(150, 96); g.lineTo(112, 106); g.fill();
      g.fillStyle = '#111'; g.beginPath(); g.arc(98, 72, 5, 0, 6.3); g.arc(66, 72, 5, 0, 6.3); g.fill();
      g.strokeStyle = '#222'; g.lineWidth = 4; g.beginPath(); g.arc(98, 72, 15, 0, 6.3); g.arc(66, 72, 15, 0, 6.3); g.moveTo(81, 72); g.lineTo(83, 72); g.stroke();
      sciPortC = { src: c.toDataURL('image/png') };
    } catch (e) { sciPortC = { src: '' }; }
    return sciPortC;
  }

function spotSci() {
    if (loc.i !== 12 || save.mx.sf !== 0 || Math.abs(P.x - SCI_X) > 120 || P.z > 70) return null;
    return { btn: 'Профессор', msg: touch ? 'Жми «Профессор»' : 'Нажми E: поговорить с профессором', fn: sciTalk, x: SCI_X };
  }

function spotRescue() {
    if (loc.i !== 9 || save.mx.sf !== 1 || resc.on || Math.abs(P.x - HOSP_X) > 300 || P.z > 70) return null;
    return { btn: 'Спасатели', msg: touch ? 'Жми «Спасатели»' : 'Нажми E: вызвать спасателей', fn: rescStart, x: HOSP_X };
  }

function hinSpot(key, btn, msg, fn) { return Math.abs(P.x - HIN_DOOR[key]) < 100 && P.z < 70 ? { btn: btn, msg: touch ? 'Жми «' + btn + '»' : 'Нажми E: ' + msg, fn: fn, x: HIN_DOOR[key] } : null; }

function spotHosp() {
    if (loc.i === 9 && hatchOn() && !lt.st && Math.abs(P.x - HATCH_X) < 90 && P.z < 70) return { btn: 'Люк', msg: touch ? 'Жми «Люк»' : 'Нажми E: спуститься в Новую лабораторию', fn: function () { ltGo(NLAB, 'left', NL_DOOR + 90); }, x: HATCH_X };
    if (loc.i === 9) return nearHosp() ? { btn: 'Войти', msg: touch ? 'Жми «Войти»' : 'Нажми E: войти в больницу', fn: hospEnter, x: HOSP_X } : null;
    if (loc.i !== 13) return null;
    return hinSpot('exit', 'Выйти', 'выйти на улицу', hospExit) || hinSpot('reg', 'Регистратура', 'к регистратуре', nurseTalk) || hinSpot('doc', ruinD() ? 'Помочь' : 'Врач', ruinD() ? 'вытащить врача из-под обломков' : 'в кабинет врача', docTalk) ||
      hinSpot('r3', 'Палата 3', 'заглянуть в палату 3', function () { roomTalk(3); }) || hinSpot('r2', 'Палата 2', 'заглянуть в палату 2', function () { roomTalk(2); }) || hinSpot('r1', 'Палата 1', 'в золотую палату 1', hospTalk);
  }

function hospEnter() { ltGo(13, 'left', 150); }

function hospExit() { ltGo(9, 'left', HOSP_X); }

function nurseTalk() {
    dlgShow('Медсестра', null, 'Здравствуйте! Приём у нас круглосуточный. Кабинет врача дальше по коридору, палаты 2 и 3 для обычных пациентов.\nА вон та золотая дверь, палата 1, для особых гостей. Сейчас там лежит господин Меллстрой, и его охраняют лучше, чем чекушки в сейфе.', [{ t: 'Спасибо', out: true }]);
  }

function roomTalk(n) {
    dlgShow('Палата ' + n, null, n === 3 ? 'За дверью спит пациент: на тумбочке горка пустых чекушек и записка «не мыть, это память».' : 'В палате лежит петух с перевязанным крылом. Он шёпотом спрашивает, не видел ли ты его чекушку. Ты ничего не видел.', [{ t: 'Тихо выйти', out: true }]);
  }

function docTalk() {
    if (ruinD()) { docRuinTalk(); return; }
    var left = healLeft(), sf = save.mx.sf, tx;
    tx = 'Я главный врач. Что болит?';
    if (sf === 2 && left > 0) tx += '\nМеллстрою нужен ещё целый игровой день отдыха: осталось ' + fmtTime(left) + '. Профессор тоже под наблюдением: он из тех, кто держится на одном кофе и упрямстве.';
    else if (sf === 2) tx += '\nМеллстрой и профессор уже на ногах. Ритуал, о котором они говорят, я одобряю как врач-оптимист.';
    else tx += '\nМеллстрой идёт на поправку, но ему нужен покой.';
    dlgShow('Главный врач', docPort(), tx, [
      { t: 'Подлечи меня', fn: function () { hp = maxHp(); persist(); hud(); sfx('rare'); dlgShow('Главный врач', docPort(), 'Готово: ты как новенький. Бесплатно, как для друга пациента.', [{ t: 'Спасибо', out: true }]); } },
      { t: 'Уйти', out: true }
    ]);
  }

function sciMenu(txtIntro) {
    var im = sciPort(), ch = [], sf = save.mx.sf;
    SCI_Q.forEach(function (q) { ch.push({ t: q[0], fn: function () { dlgShow('Профессор Квохтин', im, q[1], [{ t: 'Ещё вопрос', fn: function () { sciMenu('Спрашивай.'); } }, { t: 'Уйти', out: true }]); } }); });
    if (sf === 0 && recCount() >= REC_N) ch.push({ t: 'Идёмте со мной, отведу вас в Больницу', fn: sciJoin });
    ch.push({ t: 'Уйти', out: true });
    dlgShow('Профессор Квохтин', im, txtIntro, ch, sf === 0 && recCount() < REC_N ? 'Прочитай все 7 записей на терминалах, и профессор согласится идти с тобой.' : '');
  }

function sciTalk() {
    if (dlgOpened) return;
    ach('sci');
    sciMenu(save.mx.sf === 0 ? (recCount() >= REC_N ? 'Ты прочёл всё и нашёл меня. Значит, пришло время. Я слушаю: что тебя интересует, если в истории остались дыры?' : 'О, живой гость. Прочти записи на терминалах, а я отвечу на любые вопросы.') : 'Спрашивай, пока я ещё держусь.');
  }

function sciJoin() {
    save.mx.sf = 1; persist(); sci.fx = P.x - 90; sfx('rare');
    dlgShow('Профессор Квохтин', sciPort(), 'Больница… Давно мечтал о белых простынях. Идём. Только не бегай: у меня старые коленки.\nВедите меня в Больницу (она слева от Города Белого Дома). Там вызовем спасателей.', [{ t: 'Идём за мной', out: true }], 'Профессор теперь следует за тобой. В Больнице нажми «Спасатели».');
  }

function updateSci(dt) {
    if (save.mx.sf !== 1) return;
    if (sci.loc !== loc.i || Math.abs(sci.fx - P.x) > 700) { sci.loc = loc.i; sci.fx = P.x - P.face * 90; }
    if (resc.on) return;
    var tg = P.x - P.face * 95, old = sci.fx; sci.fx += (tg - sci.fx) * Math.min(1, dt * 3.5);
    if (Math.abs(sci.fx - tg) > 4) sci.walk += dt * 2.2;
  }

function drawSciFollower() {
    if (save.mx.sf !== 1 || resc.on || subActive() || loc.i === 5 || ob.on || ride.id || trip.inn || (bus.on && bus.hide) || loc.i === 13) return;
    sciDraw(sci.fx, P.x >= sci.fx ? 1 : -1, 0.95, sci.walk, 0);
  }

function rescStart() {
    if (resc.on || save.mx.sf !== 1) return;
    resc.on = true; resc.t = 0; resc.ax = P.x - 1300; resc.tx = P.x - 240; sfx('rare'); toast('Профессор вызывает спасателей…', 3000);
  }

function updateResc(dt) {
    if (!resc.on) return;
    input.left = input.right = false; input.up = false; P.vx = 0;
    resc.t += dt; var t0 = resc.t;
    if (t0 < 3) { var k = t0 / 3; resc.ax = (P.x - 1300) + (resc.tx - (P.x - 1300)) * (1 - (1 - k) * (1 - k)); }
    else if (t0 < 4.4) { resc.ax = resc.tx; sci.fx += (resc.tx - sci.fx) * Math.min(1, dt * 3); sci.walk += dt * 2; }
    else if (t0 < 7) { var k2 = (t0 - 4.4) / 2.6; resc.ax = resc.tx + ((HOSP_X - 240) - resc.tx) * k2; }
    else {
      resc.on = false; save.mx.sf = 2; save.mx.hd = Date.now() + DN_CYC * 1000; persist(); sfx('rare'); ach('resc');
      toast('Профессора забрали в Больницу. Меллстрою и профессору нужен целый игровой день отдыха (6 минут). Потом они проведут обряд возврата. Загляни в Палату 1.', 9000);
    }
  }

function drawResc() {
    if (!resc.on) return;
    if (resc.t < 4.4) sciDraw(sci.fx, resc.ax > sci.fx ? 1 : -1, 0.95, sci.walk, 0, resc.t > 4 ? Math.max(0, 1 - (resc.t - 4) / 0.4) : 1);
    drawAmbulance(resc.ax);
    if (Math.floor(t * 4) % 2) { ctx.fillStyle = 'rgba(255,60,60,.18)'; ctx.fillRect(resc.ax - 200, gY - 150, 400, 150); }
  }

function hospTalk() {
    if (dlgOpened) return;
    if (save.mx.c2e) { dlgShow('Палата 1', null, 'Золотая палата пуста и убрана. На тумбочке лежит записка: «Не ищите. Стримлю из другой вселенной. Чат, держитесь».', [{ t: 'Назад', out: true }]); return; }
    if (!save.mx.mh) { sfx('no'); toast('Палата 1 пока пустая: Меллстрой ещё в Белом доме. Здесь можно осмотреться.', 4000); return; }
    var first = (save.mx.hq || 0) < 1;
    if (first) { save.mx.hq = 1; persist(); ach('hosp'); }
    ach('ward');
    var im = mellImg(), sf = save.mx.sf, left = healLeft(), healing = sf === 2 && left > 0, met = false, intro, ch;
    if (sf === 2 && (save.mx.hq | 0) < 4) { save.mx.hq = 4; persist(); met = true; }
    if (save.mx.p5 >= 6) intro = save.mx.p6 ? 'Разрез времени держится. Кокич слышит нас, а дальше мы ещё придумаем, как его вытащить.' : 'Мы с профессором всё помним. Мир стал другим, а ты, Кокич, остался в петле. Профессор нашёл способ достучаться до тебя: идём в студию.';
    else if (save.mx.fe) intro = 'Моггити вышел против нас у круга. Ритуал сорвался, но мы живы. Он не хочет, чтобы чикены стали обычными: это его свобода.\nВремя глючит, и Моггити в центре всего. Готов продолжить?';
    else if (met) intro = 'Профессор Квохтин?! Живой… Мы же вместе работали над проектом, пока всё не пошло не так. Я думал, что ты… Спасибо, что привёл его.\n' + (healing ? 'Нам обоим нужен покой: врач говорит, ещё ' + fmtTime(left) + '.' : '');
    else if (sf === 2 && healing) intro = 'Врач велел лежать: осталось ' + fmtTime(left) + '. Профессор в соседней кровати храпит, как трактор.';
    else if (sf === 2) intro = 'Мы с профессором на ногах. Сила возвращается. Готов вернуть время до ошибки?';
    else if (first) intro = 'Ты пришёл… Тише, у меня бинты. Хоумлендера больше нет, а я жив: спасибо Моггити.\nСтранно: я до сих пор слышу, как он гудит у меня в голове.';
    else intro = save.mx.hq >= 3 ? 'А, это ты. Лечусь потихоньку. Врач говорит, перелом гордости.' : 'А, это ты. Лечусь потихоньку.';
    ch = [
      { t: 'Вопросы ▸', fn: hospAsk },
      { t: 'Задание Меллстроя и образцы', fn: hospJobs },
      { t: 'Уйти', out: true }
    ];
    if (hospStoryOpts().length) ch.unshift({ t: 'Сюжет ▸', fn: hospStory });
    if (sf === 2) ch.unshift({ t: 'Поговорить с профессором', fn: function () { dlgClose(); sciTalk(); } });
    dlgShow('Меллстрой (в бинтах)', im, intro, ch);
  }

function hospAsk() {
    var im = mellImg(), ch = [
      { t: 'Зачем убивать Хоумлендера навсегда?', fn: hospWhy },
      { t: 'Как ты себя чувствуешь?', fn: function () { dlgShow('Меллстрой (в бинтах)', im, 'Как после лазерной эпиляции всего тела. Но живой.', [{ t: 'Назад к вопросам', fn: hospAsk }, { t: 'Назад', fn: hospTalkBack }]); } }
    ];
    if (save.mx.lr > 0) ch.splice(1, 0, { t: 'Кто такой Чикен Моггити?', fn: hospMogg });
    if (save.mx.lr & 8) ch.splice(1, 0, { t: 'Что за Глубинное сокровище?', fn: hospTreasure });
    ch.push({ t: 'Назад', fn: hospTalkBack });
    dlgShow('Меллстрой (в бинтах)', im, 'Спрашивай, что хочешь знать.', ch);
  }

function c2ResetAll() {
    var m = save.mx; m.fe = 0; m.p5 = 0; m.p6 = 0; m.p6q = 0; m.mgo = 0; m.mgv = 0; m.endp = 0; m.c2 = 0; m.c2e = 0; m.c2n = 0; m.c2m = 0; m.c2u = 0; m.c2l = 0; m.rb = 0; m.rbo = 0; m.sec1 = 0;
    try { c2cur = 0; uniV = 0; } catch (e) {}
  }

function hospRestart() {
    var im = mellImg();
    dlgShow('Меллстрой (в бинтах)', im, 'Начать с самого начала ритуала? Круг в Лесу, Чикен Ганеры, бой с Моггити и всё, что дальше, пройдёшь заново. Награды за первое прохождение повторно не дадут.', [
      { t: 'Да, с начала ритуала', fn: function () {
        c2ResetAll(); persist(); dlgClose(); finGo(); } },
      { t: 'Назад', fn: hospStory }
    ]);
  }

function hospContinue() {
    var m = save.mx, p5v = m.p5 | 0;
    dlgClose();
    if (!m.fe) { finGo(); return; }
    if (p5v < 6) { p5Start(); return; }
    if (!m.p6) { p6Start(); return; }
    if (m.mgo === 2 || m.endp) { csPlay('endpeace'); return; }
    c2Multi();
  }

function hospStoryOpts() {
    var m = save.mx, sf = m.sf, healing = sf === 2 && healLeft() > 0, o = [], p5v = m.p5 | 0, where;
    if (sf !== 2 || healing) return o;
    if (!m.fe) { o.push({ t: 'Начать обряд возврата в Лесу', fn: finGo }); return o; }
    if (p5v < 6) where = 'часть 5, бой с глюком времени';
    else if (!m.p6) where = 'часть 6, разрез времени';
    else if (m.mgo === 2 || m.endp) where = 'финал: Моггити пощажён';
    else where = c2n() === 0 ? 'глава 2, разрушенная лаборатория' : (c2n() < 4 ? 'глава 2, бунт в Чикен Гане' : 'глава 2, новая лаборатория');
    o.push({ t: 'Продолжить: ' + where, fn: hospContinue });
    o.push({ t: 'Начать с начала ритуала', fn: hospRestart });
    return o;
  }

function hospStory() {
    var ch = hospStoryOpts(), left = healLeft(), sf = save.mx.sf;
    ch.push({ t: 'Назад', fn: hospTalkBack });
    dlgShow('Меллстрой (в бинтах)', mellImg(), 'Куда двигаемся дальше?', ch, sf === 2 && left <= 0 && !save.mx.fe ? 'Ритуал проводят в Лесу, в круге на поляне. Меллстрой и профессор пойдут с тобой.' : '');
  }

function finGo() {
    if (typeof rcMulti === 'function' && rcMulti()) { rcAsk(); return; }
    finGoSolo();
  }

function finGoSolo() {
    crew = null; partySet(null);
    dlgShow('Меллстрой (в бинтах)', mellImg(), 'Круг в Лесу. Ты, я и профессор. Мы перезапустим цикл и оставим послание в будущее: чтобы никто не стал Хоумлендером, а чикены стали обычными курицами и петухами.\nЭто последний шаг. Идём?', [
      { t: 'Идём в Лес', fn: function () { dlgClose(); fin.auto = true; ltGo(11, 'left', RIT_X - 320); } },
      { t: 'Ещё не готов', out: true }
    ]);
  }

function finLines() { return save.mx.mgo === 1 ? FIN_LINES_K : (save.mx.mgo === 2 ? FIN_LINES_S : FIN_LINES); }

function updateFin(dt) {
    if (!fin.on) {
      if (fin.auto && !lt.st && !dlgOpened && loc.i !== 11) { fin.autoT = (fin.autoT || 0) + dt; if (fin.autoT > 2.5) { fin.auto = false; fin.autoT = 0; } }
      if (fin.auto && loc.i === 11 && !lt.st && !dlgOpened && !fin.guest && save.mx.fe && (save.mx.p5 | 0) >= 1) { fin.auto = false; fin.autoT = 0; return; }
      if (fin.auto && loc.i === 11 && !lt.st && !dlgOpened) { fin.auto = false; fin.autoT = 0; fin.on = true; fin.t = 0; fin.step = 0; fin.line = ''; fin.mx = RIT_X + 1000; fin.ttl = false; P.x = RIT_X - 120 + (fin.ox || 0); P.face = 1; sfx('rare'); }
      return;
    }
    if (loc.i !== 11) { fin.on = false; rit.glow = 0; return; }
    input.left = input.right = false; input.up = false; P.vx = 0; P.x = RIT_X - 120 + (fin.ox || 0);
    fin.t += dt; rit.glow = Math.min(1.3, fin.t / 9);
    var FL = finLines(); while (fin.step < FL.length && fin.t >= FL[fin.step][0]) { fin.line = FL[fin.step][1]; fin.step++; sfx(fin.step === 4 ? 'boom' : 'pick'); if (fin.step === 4) shk = Math.max(shk, 0.8); }
    if (fin.t > 10.5 && save.mx.mgo !== 1) fin.mx = Math.max(RIT_X + 330, fin.mx - 520 * dt);
    if (Math.random() < 0.5) burst(RIT_X + (Math.random() - 0.5) * 320, gY - 10, 1, fin.t > 11 ? '#ff6b6b' : '#d9b8ff', 150, 1.2);
    if (fin.t > 23.5 && !fin.ttl) { fin.ttl = true; sfx('boom'); shk = 1; }
    if (fin.t >= 31) {
      if (fin.guest) { fin.on = false; fin.guest = false; fin.ox = 0; rit.glow = 0; if (fin.altG) { fin.altG = 0; altPrep(); csPlay('altgun', function () { crew = null; farmVisit = true; ltGo(15, 'left', 520); toast('Ты гость в Чало Хаусе: сюжет здесь ведёт друг. Выход слева, в Больницу.', 7000); }); return; } toast('Обряд сорвался: Моггити могнул профессора. Ты помог другу, а твой сюжет остался на месте.', 6000); ltGo(9, 'left', 700); return; }
      if (save.mx.mgo === 1) { fin.ox = 0; fin.on = false; rit.glow = 0; save.mx.alt = 1; persist(); ach('fin4'); ach('alt'); altPrep(); csPlay('altgun', function () { crew = null; farmVisit = false; c2Arrive(); }); return; }
      fin.ox = 0; fin.on = false; rit.glow = 0; save.mx.fe = 1; persist(); ach('fin4');
      toast('Обряд сорван: Моггити могнул профессора, и время начинает глючить. Часть 5 начинается!', 6000); setTimeout(function () { p5Start(); }, 1500);
    }
  }

function drawFinWorld() {
    if (!fin.on) return;
    var x = RIT_X;
    if (ready(img.mell)) { ctx.save(); ctx.translate(x + 40, gY); ctx.drawImage(img.mell, 0, 0, 224, 99, -60, -90, 120, 53); ctx.restore(); }
    sciDraw(x - 40, 1, 0.95, 0, 0);
    if (fin.t > 10.5 && save.mx.mgo !== 1 && ready(img.mogg)) {
      var h = 150, w = h * img.mogg.naturalWidth / img.mogg.naturalHeight;
      ctx.drawImage(img.mogg, fin.mx - w / 2, gY - h, w, h);
      if (fin.t > 19) { var rg2 = ctx.createRadialGradient(x, gY - 60, 40, x, gY - 60, 260); rg2.addColorStop(0, 'rgba(255,70,70,0)'); rg2.addColorStop(0.75, 'rgba(255,70,70,' + (0.14 + 0.1 * Math.sin(t * 9)).toFixed(2) + ')'); rg2.addColorStop(1, 'rgba(255,70,70,0)'); ctx.fillStyle = rg2; ctx.fillRect(x - 270, gY - 260, 540, 300); }
    }
  }

function drawFinCine() {
    if (!fin.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var bh = H * 0.09 * Math.min(1, fin.t / 0.8); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, bh); ctx.fillRect(0, H - bh, W, bh);
    if (fin.line && fin.t < 24) {
      ctx.font = '700 ' + Math.max(15, Math.min(23, W / 40)) + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = Math.min(W - 24, ctx.measureText(fin.line).width + 30), y = H - bh - 36;
      ctx.fillStyle = 'rgba(20,10,40,.82)'; rrect(W / 2 - tw / 2, y - 18, tw, 36, 14); ctx.fill(); ctx.fillStyle = '#efe0ff'; ctx.fillText(fin.line, W / 2, y, W - 40);
    }
    if (fin.t > 24) {
      var a = Math.min(1, (fin.t - 24) / 1.2), fo = fin.t > 29 ? Math.min(1, (fin.t - 29) / 2) : 0;
      ctx.fillStyle = 'rgba(0,0,0,' + (0.7 * a).toFixed(2) + ')'; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      var fs = Math.max(24, Math.min(60, W / 14)); ctx.font = fs + 'px "Russo One", "Arial Black", Impact, sans-serif'; ctx.lineWidth = 9; ctx.strokeStyle = '#14233f'; var ft = save.mx.mgo === 1 ? 'РИТУАЛ ЗАВЕРШЁН' : (save.mx.p5r ? 'РИТУАЛ ПОВТОРЁН' : 'ОБРЯД СОРВАН'); ctx.strokeText(ft, W / 2, H * 0.42); ctx.fillStyle = '#ffd23f'; ctx.fillText(ft, W / 2, H * 0.42);
      ctx.font = '700 ' + Math.max(14, fs * 0.38) + 'px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.fillText(save.mx.mgo === 1 ? 'Но вы попадаете в другой мир…' : (save.mx.p5r ? 'Время снова глючит. Бой начнётся с начала…' : 'Время глючит: начинается часть 5…'), W / 2, H * 0.42 + fs * 0.9);
      ctx.globalAlpha = 1;
      if (fo > 0) { ctx.fillStyle = 'rgba(0,0,0,' + fo.toFixed(2) + ')'; ctx.fillRect(0, 0, W, H); }
    }
  }

function p6Win(x, y, w, h, tint, label) {
    ctx.fillStyle = '#0c0a22'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = '#6a58a8'; ctx.lineWidth = 4; ctx.strokeRect(x, y, w, h);
    if (ready(img.mell)) { ctx.drawImage(img.mell, 0, 0, 224, 99, x + 8, y + 8, w - 16, (w - 16) * 99 / 224); if (tint) { ctx.globalAlpha = tint; ctx.fillStyle = '#d0d0d8'; ctx.fillRect(x + 8, y + 8, w - 16, (w - 16) * 99 / 224); ctx.globalAlpha = 1; } }
    if (label) { ctx.fillStyle = '#fff'; ctx.font = '700 16px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x + w / 2, y + h - 14); }
  }

function p6Lab(ct) {
    bgG('#10182a', '#1c2a44'); ctx.fillStyle = '#26365a'; ctx.fillRect(0, 150, 960, 280); ctx.fillStyle = '#3a4c78'; for (var i = 0; i < 7; i++) ctx.fillRect(40 + i * 140, 170, 80, 60); flr('#18233a');
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(320, 360, 340, 70);
  }

function atmOut() { return !(dnIndoor() || p5.on || p6.on || cs.on || flt.on || subActive() || loc.i === 5 || loc.i === 4 && false); }

function updateAtm(dt) {
    if (!atmOut()) { if (atm.p.length) atm.p.length = 0; return; }
    var th = loc.i === 0 ? 'village' : LOCS[loc.i].theme, night = dnIsNight();
    atm.tp -= dt;
    if (atm.tp <= 0 && atm.p.length < 36) {
      atm.tp = 0.18 + Math.random() * 0.2;
      var kind = (th === 'forest' || th === 'park') ? (Math.random() < 0.5 ? 'leaf' : 'pollen') : (th === 'village' ? 'pollen' : (th === 'city' || th === 'airport' || th === 'wcity' ? 'dust' : 'pollen'));
      if (night) kind = 'fly';
      atm.p.push({ k: kind, x: camX + Math.random() * vw, y: gY - 40 - Math.random() * 360, vx: 10 + Math.random() * 20, vy: kind === 'leaf' ? 22 + Math.random() * 20 : -4 + Math.random() * 8, a: 0, l: 5 + Math.random() * 4, ph: Math.random() * 6.3 });
    }
    for (var i = atm.p.length - 1; i >= 0; i--) { var q = atm.p[i]; q.a += dt; q.x += (q.vx + Math.sin(q.a * 1.7 + q.ph) * 14) * dt; q.y += (q.vy + Math.cos(q.a * 2 + q.ph) * 8) * dt; if (q.a > q.l || q.y > gY - 4) atm.p.splice(i, 1); }
    if (!night) { atm.nb -= dt; if (atm.nb <= 0) { atm.nb = 20 + Math.random() * 25; var by = gY - 260 - Math.random() * 160, d = Math.random() < 0.5 ? 1 : -1, bx = d > 0 ? camX - 40 : camX + vw + 40; for (var k = 0; k < 4; k++) atm.birds.push({ x: bx - d * k * 26, y: by + (k % 2) * 14 + k * 4, d: d, ph: k }); } }
    for (var j = atm.birds.length - 1; j >= 0; j--) { var b = atm.birds[j]; b.x += b.d * 120 * dt; if (b.x < camX - 120 || b.x > camX + vw + 120) atm.birds.splice(j, 1); }
  }

function drawAtm() {
    if (!atmOut()) return;
    var th = loc.i === 0 ? 'village' : LOCS[loc.i].theme, night = dnIsNight(), i, q, op = ctx.globalCompositeOperation;
    setCam(1);
    // птицы
    ctx.strokeStyle = 'rgba(40,50,70,.7)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    for (i = 0; i < atm.birds.length; i++) { var b = atm.birds[i], fl = Math.sin(t * 9 + b.ph) * 6; ctx.beginPath(); ctx.moveTo(b.x - 9, b.y - fl); ctx.quadraticCurveTo(b.x - 3, b.y - 4, b.x, b.y); ctx.quadraticCurveTo(b.x + 3, b.y - 4, b.x + 9, b.y - fl); ctx.stroke(); }
    // частицы
    ctx.globalCompositeOperation = 'lighter';
    for (i = 0; i < atm.p.length; i++) {
      q = atm.p[i]; var k = q.a / q.l, al = Math.min(1, k * 5, (1 - k) * 3);
      if (q.k === 'leaf') { ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.a * 2 + q.ph); ctx.globalAlpha = al * 0.9; ctx.fillStyle = (i % 3) ? '#7cc35a' : '#d9a441'; ctx.beginPath(); ctx.ellipse(0, 0, 6, 3, 0, 0, 6.3); ctx.fill(); ctx.restore(); ctx.globalCompositeOperation = 'lighter'; }
      else if (q.k === 'fly') { ctx.globalAlpha = al * (0.5 + 0.5 * Math.sin(t * 5 + q.ph)); ctx.fillStyle = '#d6ff7a'; ctx.beginPath(); ctx.arc(q.x, q.y, 2.6, 0, 6.3); ctx.fill(); ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.arc(q.x, q.y, 7, 0, 6.3); ctx.fill(); }
      else { ctx.globalAlpha = al * (q.k === 'dust' ? 0.35 : 0.6); ctx.fillStyle = q.k === 'dust' ? '#ffffff' : '#fff2a8'; ctx.beginPath(); ctx.arc(q.x, q.y, q.k === 'dust' ? 1.6 : 2.2, 0, 6.3); ctx.fill(); }
    }
    ctx.globalCompositeOperation = op; ctx.globalAlpha = 1;
    // трава на переднем плане
    if (th === 'village' || th === 'park' || th === 'forest') {
      var x0 = Math.floor((camX - 20) / 46) * 46, x1 = camX + vw + 20, nv = night ? 0.55 : 1;
      for (var gx = x0; gx < x1; gx += 46) {
        if (th === 'village' && gx < CITY_END + 20) continue;
        var h = 9 + ((gx * 7) % 11), sw = Math.sin(t * 2 + gx * 0.05) * 3;
        ctx.fillStyle = ((gx / 46) % 2) ? 'rgba(86,160,80,' + nv + ')' : 'rgba(64,138,70,' + nv + ')';
        ctx.beginPath(); ctx.moveTo(gx, gY + 14); ctx.quadraticCurveTo(gx + sw, gY + 14 - h * 0.7, gx + 3 + sw * 1.4, gY + 14 - h); ctx.quadraticCurveTo(gx + 6, gY + 14 - h * 0.5, gx + 8, gY + 14); ctx.fill();
        ctx.beginPath(); ctx.moveTo(gx + 10, gY + 14); ctx.quadraticCurveTo(gx + 12 - sw, gY + 14 - h * 0.5, gx + 14 - sw * 1.2, gY + 14 - h * 0.8); ctx.quadraticCurveTo(gx + 16, gY + 14 - h * 0.4, gx + 18, gY + 14); ctx.fill();
        if ((gx / 46) % 7 === 0 && !night) { ctx.fillStyle = (gx / 46) % 14 === 0 ? '#ff7a9a' : '#fff'; ctx.beginPath(); ctx.arc(gx + 4 + sw, gY + 14 - h - 3, 3, 0, 6.3); ctx.fill(); }
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // лучи солнца днём
    if (!night && (th === 'village' || th === 'park' || th === 'forest' || th === 'city' || th === 'airport' || th === 'wcity')) {
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < (PERF.q < 0.85 ? 0 : 4); i++) { var rx = W * (0.05 + i * 0.22) + Math.sin(t * 0.3 + i) * 20, ra = 0.035 + 0.015 * Math.sin(t * 0.6 + i * 2); var gr = ctx.createLinearGradient(rx, 0, rx + 160, H * 0.8); gr.addColorStop(0, 'rgba(255,240,180,' + ra * 1.8 + ')'); gr.addColorStop(1, 'rgba(255,240,180,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx + 70, 0); ctx.lineTo(rx + 300, H * 0.85); ctx.lineTo(rx + 150, H * 0.85); ctx.closePath(); ctx.fill(); }
      ctx.globalCompositeOperation = op;
    }
    // мягкая виньетка земли
    var vg = ctx.createLinearGradient(0, H * 0.78, 0, H); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,14,30,.16)'); ctx.fillStyle = vg; ctx.fillRect(0, H * 0.78, W, H * 0.22);
  }

function drawLocDetail() {
    if (dnIndoor() || p5.on || p6.on || cs.on) return;
    var th = loc.i === 0 ? 'village' : LOCS[loc.i].theme;
    if (th === 'cave') {
      setCam(1);
      var cx0 = Math.floor((camX - 40) / 130) * 130, cx1 = camX + vw + 40, q, hh;
      for (q = cx0; q < cx1; q += 130) {
        hh = 70 + ((q * 17) % 90); var sx = q + ((q * 7) % 40);
        var sg = ctx.createLinearGradient(0, gY - 560, 0, gY - 560 + hh); sg.addColorStop(0, '#1a1626'); sg.addColorStop(1, '#3a3350');
        ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(sx - 18, gY - 560); ctx.lineTo(sx, gY - 560 + hh); ctx.lineTo(sx + 18, gY - 560); ctx.closePath(); ctx.fill();
        if (((q / 130) | 0) % 3 === 0) { var dp = (t * 0.8 + q) % 3; if (dp < 1) { ctx.fillStyle = 'rgba(150,200,255,.6)'; ctx.beginPath(); ctx.arc(sx, gY - 560 + hh + dp * (500 - hh), 1.8, 0, 6.3); ctx.fill(); } }
      }
      for (q = cx0; q < cx1; q += 210) {
        var gx = q + ((q * 11) % 90), col = ['#7fe3ff', '#d19bff', '#9bffb0'][((q / 210) | 0) % 3], pl2 = 0.6 + 0.4 * Math.sin(t * 2 + q);
        var cg = ctx.createRadialGradient(gx, gY - 14, 1, gx, gY - 14, 46); cg.addColorStop(0, col); cg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha = 0.25 * pl2; ctx.fillStyle = cg; ctx.fillRect(gx - 46, gY - 60, 92, 92); ctx.globalAlpha = 1;
        ctx.fillStyle = col; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.moveTo(gx - 6, gY + 2); ctx.lineTo(gx - 2, gY - 24); ctx.lineTo(gx + 3, gY + 2); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(gx + 2, gY + 2); ctx.lineTo(gx + 8, gY - 16); ctx.lineTo(gx + 12, gY + 2); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      }
      var lg = ctx.createLinearGradient(0, gY - 560, 0, gY); lg.addColorStop(0, 'rgba(180,200,255,.10)'); lg.addColorStop(1, 'rgba(180,200,255,0)'); ctx.fillStyle = lg;
      for (q = cx0 + 60; q < cx1; q += 520) { ctx.beginPath(); ctx.moveTo(q, gY - 560); ctx.lineTo(q + 40, gY - 560); ctx.lineTo(q + 140, gY); ctx.lineTo(q + 60, gY); ctx.closePath(); ctx.fill(); }
      return;
    }
    if (th === 'sea' || th === 'beach' || th === 'cave' || th === 'island' || th === 'seclab' || th === 'forest' || th === 'park' || th === 'farm' || th === 'farmx' || th === 'termin' || th === 'sky' || th === 'nlab' || th === 'blab' || th === 'cgcamp' || th === 'uni' || th === 'burger' || th === 'church') return;
    var night = dnIsNight(), dk = dnDark(dnU()), x0 = camX - 40, x1 = camX + vw + 40, aEnd = th === 'village' ? CITY_END : WORLD_W, i, x;
    setCam(1);
    // трещины и пятна на асфальте
    ctx.save();
    ctx.strokeStyle = 'rgba(20,22,28,.35)'; ctx.lineWidth = 1.4;
    for (x = Math.floor(x0 / 190) * 190; x < x1; x += 190) {
      if (x < 0 || x > aEnd) continue;
      var h = ((x * 13) % 7), cy = gY + 6 + (h % 4) * 3;
      ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x + 14, cy + 3); ctx.lineTo(x + 22, cy - 1); ctx.lineTo(x + 38, cy + 4); if (h % 2) { ctx.moveTo(x + 22, cy - 1); ctx.lineTo(x + 28, cy - 6); } ctx.stroke();
      if (h % 3 === 0) { ctx.fillStyle = 'rgba(15,15,22,.22)'; ctx.beginPath(); ctx.ellipse(x + 90, gY + 12, 24, 3.5, 0, 0, 6.3); ctx.fill(); }
    }
    // бордюр с тенью
    var cx0 = Math.max(x0, 0), cx1 = Math.min(x1, aEnd);
    if (cx1 > cx0) { ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(cx0, gY - 2, cx1 - cx0, 2); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(cx0, gY + 4, cx1 - cx0, 3); }
    // фонари
    for (x = Math.floor((x0 - 200) / 520) * 520 + 260; x < x1 + 200; x += 520) {
      if (x < 160 || x > aEnd - 160) continue;
      var lx = x, ly = gY - 150;
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(lx, gY + 3, 14, 3.5, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#3a4150'; ctx.fillRect(lx - 3, ly, 6, 150); ctx.fillStyle = '#4a5262'; ctx.fillRect(lx - 7, gY - 10, 14, 10);
      ctx.fillRect(lx - 3, ly - 2, 26, 5); ctx.fillStyle = '#2a303c'; rrect(lx + 14, ly - 4, 20, 9, 3); ctx.fill();
      var on = dk > 0.25, gx = lx + 24;
      if (on) {
        var lg = ctx.createRadialGradient(gx, ly + 6, 2, gx, ly + 6, 40); lg.addColorStop(0, 'rgba(255,236,170,' + (0.85 * dk).toFixed(2) + ')'); lg.addColorStop(1, 'rgba(255,236,170,0)'); ctx.fillStyle = lg; ctx.fillRect(gx - 40, ly - 34, 80, 80);
        var cg = ctx.createLinearGradient(0, ly + 6, 0, gY + 4); cg.addColorStop(0, 'rgba(255,236,170,' + (0.22 * dk).toFixed(2) + ')'); cg.addColorStop(1, 'rgba(255,236,170,' + (0.05 * dk).toFixed(2) + ')');
        ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(gx - 6, ly + 8); ctx.lineTo(gx + 6, ly + 8); ctx.lineTo(gx + 78, gY + 4); ctx.lineTo(gx - 78, gY + 4); ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = on ? '#fff3c0' : '#9aa6b8'; ctx.fillRect(gx - 5, ly + 5, 10, 3);
    }
    ctx.restore();
  }

function burst(x, y, n, col, sp, life) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.283, v = (0.3 + Math.random() * 0.7) * sp;
      fx.push({ k: 'p', x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * 0.25, age: 0, life: life || 0.7, c: col, s: 2 + Math.random() * 3 });
    }
  }

function ring(x, y, r, col) { fx.push({ k: 'r', x: x, y: y, r: r, age: 0, life: 0.45, c: col }); }

function updateFx(dt) {
    for (var i = fx.length - 1; i >= 0; i--) {
      var f = fx[i]; f.age += dt;
      if (f.k === 'p') { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 620 * dt; }
      if (f.age > f.life) fx.splice(i, 1);
    }
    if (fx.length > 400) fx.splice(0, fx.length - 400);
  }

function drawFx() {
    for (var i = 0; i < fx.length; i++) {
      var f = fx[i], k = f.age / f.life;
      if (f.age < 0) continue;
      ctx.globalAlpha = Math.max(0, 1 - k);
      if (f.k === 'p') { ctx.fillStyle = f.c; ctx.beginPath(); ctx.arc(f.x, f.y, f.s, 0, 6.3); ctx.fill(); }
      else { ctx.strokeStyle = f.c; ctx.lineWidth = 7 * (1 - k) + 1; ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * (0.3 + k), f.r * (0.3 + k) * 0.45, 0, 0, 6.3); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
  }

function nutDmgAt(l) { return 2 + 3 * l; }

function nutDmg() { return nutDmgAt(save.nutdmg); }

function sqMulAt(l) { return 1 + 0.18 * l; }

function sqMul() { return sqMulAt(save.sqfast); }

function petRun() { return PET_RUN * (1 + 0.06 * save.sqfast) * (sqBuffed() ? 1.8 : 1); }

function sqCan(r) { return !!(save.sqF && save.sqF[r | 0]); }

function newPet(x) {
    return { x: x, dir: -P.face, st: 'follow', ft: 5 + Math.random() * 8, at: 1 + Math.random() * 2, ph: Math.random() * 6, tgt: null, r: 0, mv: false, bag: [] };
  }

function syncPets() {
    while (pets.length < save.army) pets.push(newPet(P.x - P.face * (60 + Math.random() * 80)));
    while (pets.length > save.army) { var gone = pets.pop(); if (gone.tgt) gone.tgt.claimed = false; }
  }

function nearWild() {
    var best = null, bd = 150;
    for (var i = 0; i < squirrels.length; i++) {
      var d = Math.abs(squirrels[i].x - P.x);
      if (d < bd && P.z < 110) { best = squirrels[i]; bd = d; }
    }
    return best;
  }

function feedSquirrel() {
    if (paused || busLock()) return;
    var s = nearWild();
    if (!s) { toast(save.nuts > 0 ? 'Рядом нет дикой белки. Подойди поближе.' : 'Орешков нет. Купи их в гараже.', 2500); sfx('no'); return; }
    if (save.nuts <= 0) { toast('Орешков нет. Купи их в гараже.', 2500); sfx('no'); return; }
    if (save.army >= MAX_ARMY) { toast('Армия полная: больше ' + MAX_ARMY + ' белок не прокормить.', 3000); sfx('no'); return; }
    save.nuts--; save.army++;
    if (s.state === 'carry') bottles.push({ x: s.x, off: 0, ph: Math.random() * 6.28, r: s.r | 0 });
    else if (s.state === 'run' && s.tgt) s.tgt.claimed = false;
    squirrels.splice(squirrels.indexOf(s), 1);
    var p = newPet(s.x); p.dir = s.dir; pets.push(p);
    persist(); hud(); sfx('rare');
    popup(s.x, SQ_H + 30, 'Теперь своя!', '#ffb3d9');
    burst(s.x, gY - SQ_H, 10, '#ff8ec4', 220, 0.8);
    if (!petToast) { petToast = true; toast('Белка твоя: ходит за тобой и приносит чекушки. Чем больше орешков, тем больше армия.', 5500); }
  }

function sqCands(p, range, any) {
    var c = [], j, b;
    for (j = 0; j < bottles.length; j++) {
      b = bottles[j];
      if (b.claimed || b.np || b.sup || b.lab !== undefined || Math.abs(b.x - P.x) > range) continue;
      if (b.secret) { if (!save.sqSec) continue; } else if (!any && !sqCan(b.r)) continue;
      c.push(b);
    }
    return c;
  }

function sqBagMax() { return 1 + (save.sqcarry | 0); }

function fetchTarget(p, more) {
    if (!p.bag) p.bag = [];
    var big = sqBuffed(), c = sqCands(p, big ? 3500 : (more ? 600 : 1500), false), tgt = null, v, q;
    if (big) {
      c.sort(function (a, b2) { return ((b2.secret ? 6 : b2.r | 0) - (a.secret ? 6 : a.r | 0)) || (Math.abs(a.x - p.x) - Math.abs(b2.x - p.x)); });
      // от секретной вниз: если такая чекушка есть на локации, берут её; если нет, находят с растущим шансом (секретная 5%, мифическая 10%, легендарная 15%...)
      var CHN = { 6: 0.05, 5: 0.10, 4: 0.15, 3: 0.20, 2: 0.25 };
      for (v = 6; v >= 2 && !tgt; v--) {
        if (v < 6 && !sqCan(v)) continue;
        for (q = 0; q < c.length; q++) if ((c[q].secret ? 6 : (c[q].r | 0)) === v) { tgt = c[q]; break; }
        if (tgt) break;
        if (!more && (v === 6 ? !!save.sqSec : sqCan(v)) && t - (p.fz || -99) > 10 && Math.random() < CHN[v]) {
          p.fz = t;
          p.bag.push(v === 6 ? { r: 5, sec: true } : { r: v }); p.st = 'back'; p.tgt = null;
          popup(p.x, SQ_H + 30, v === 6 ? 'Нашла секретную!' : 'Нашла: ' + RAR[v].n, v === 6 ? '#ffffff' : RAR[v].c); burst(p.x, gY - SQ_H, 8, v === 6 ? '#ffffff' : RAR[v].c, 200, 0.8); return;
        }
      }
      if (!tgt && c.length) tgt = c[0];
    } else {
      c.sort(function (a, b2) { return Math.abs(a.x - p.x) - Math.abs(b2.x - p.x); });
    }
    if (!c.length) { if (more) p.st = p.bag.length ? 'back' : 'follow'; else p.ft = 4 + Math.random() * 3; return; }
    if (!big) { tgt = c[Math.floor(Math.random() * Math.min(3, c.length))]; if (Math.random() > (tgt.secret ? 0.001 : SQ_CHANCE[tgt.r | 0])) { if (more) p.st = p.bag.length ? 'back' : 'follow'; else p.ft = 4 + Math.random() * 4; return; } }
    tgt.claimed = true; p.tgt = tgt; p.st = 'go';
  }

function deliver(p) {
    var bag = p.bag || [], k;
    for (k = 0; k < bag.length; k++) {
      var it = bag[k], r = it.r | 0;
      if (it.sec) { save.sec = (save.sec | 0) + 1; persist(); hud(); sfx('rare'); popup(P.x, PLAYER_H + 8, '+1 Секретная чекушка', '#ffffff'); continue; }
      if (save.carried < cap()) {
        if (it.cl) save.inv.c[r]++; else save.inv.d[r]++;
        save.carried++; persist(); hud(); sfx(r > 1 ? 'rare' : 'pick');
        popup(P.x + (Math.random() - 0.5) * 40, PLAYER_H + 8 + k * 14, r ? '+1 ' + RAR[r].n : '+1', RAR[r].c);
      } else {
        bottles.push({ x: P.x + (Math.random() - 0.5) * 70, off: 0, ph: Math.random() * 6.28, r: r, c: !!it.cl });
        popup(P.x, PLAYER_H + 8, 'Карман полон: положила рядом', '#ff9a9a');
      }
    }
    p.bag = []; p.st = 'follow'; p.ft = sqBuffed() ? 3 + Math.random() * 3 : (9 + Math.random() * 9) / sqMul(); p.r = 0; p.cl = false;
  }

function updatePets(dt, lock) {
    if (sqBuf > 0) sqBuf = Math.max(0, sqBuf - dt);
    if (loc.i === 4 || loc.i === 5 || loc.i === 16) return; // армия не заходит на Мальдивы и в море
    syncPets();
    if (save.sqOff) return;
    for (var i = 0; i < pets.length; i++) {
      var p = pets[i];
      var slotX = P.x - P.face * (55 + (i % 10) * 27 + Math.floor(i / 10) * 14);
      slotX = Math.max(30, Math.min(WORLD_W - 30, slotX));
      if (Math.abs(p.x - P.x) > 1500 && p.st !== 'go') { p.x = slotX; }
      if (p.st === 'go' && p.tgt && Math.abs(p.tgt.x - P.x) > 1900) { p.tgt.claimed = false; p.tgt = null; p.st = 'follow'; p.x = slotX; }
      if (p.st === 'follow') {
        var dx = slotX - p.x;
        if (Math.abs(dx) > 14) { p.dir = dx > 0 ? 1 : -1; p.x += p.dir * Math.min(PET_RUN, Math.abs(dx) * 5 + 30) * dt; p.mv = true; }
        else { p.mv = false; p.dir = P.face > 0 ? 1 : -1; }
        if (!lock) { p.ft -= dt; if (p.ft <= 0) { p.ft = (8 + Math.random() * 6) / sqMul(); fetchTarget(p); if (sqBuffed() && p.st === 'follow') p.ft = 3 + Math.random() * 3; } }
        if (boss.on && boss.st !== 'intro' && boss.st !== 'dying') {
          p.at -= dt;
          if (p.at <= 0) { p.at = 3.5 + Math.random() * 2; acorns.push({ x: p.x, y: gY - SQ_H * 0.7, a: 0 }); }
        }
      } else if (p.st === 'go') {
        var ti = bottles.indexOf(p.tgt);
        if (ti < 0) { p.st = 'follow'; p.tgt = null; p.ft = 3; continue; }
        p.mv = true; p.dir = p.tgt.x > p.x ? 1 : -1; p.x += p.dir * petRun() * dt;
        if (Math.abs(p.tgt.x - p.x) < 14) { var gt = p.tgt; bottles.splice(ti, 1); if (!p.bag) p.bag = []; p.bag.push({ r: gt.secret ? 5 : (gt.r | 0), cl: !!gt.c, sec: !!gt.secret }); p.tgt = null; if (p.bag.length < sqBagMax()) fetchTarget(p, true); else p.st = 'back'; }
      } else if (p.st === 'back') {
        p.mv = true; p.dir = P.x > p.x ? 1 : -1; p.x += p.dir * petRun() * 1.15 * dt;
        if (Math.abs(P.x - p.x) < 46 && !lock) deliver(p);
      }
    }
  }

function drawPets() {
    if (loc.i === 4 || loc.i === 5 || loc.i === 16) return;
    if (save.sqOff) {
      // распущенная армия сидит на деревьях в парке и ждёт команды
      if (loc.i !== 2 || !trees.length) return;
      for (var q = 0; q < pets.length; q++) {
        var tr = trees[(q * 7 + 3) % trees.length], im2 = img.sqRun;
        if (!ready(im2)) continue;
        var px = tr.x + (q % 2 ? 16 : -16);
        if (px < camX - 120 || px > camX + vw + 120) continue;
        var ph2 = tr.h * (0.5 + 0.1 * (q % 3)), sh = SQ_H * 0.85, sw = sh * im2.naturalWidth / im2.naturalHeight;
        ctx.save(); ctx.translate(px, gY - ph2 + Math.sin(t * 2.2 + q) * 1.5); ctx.scale(q % 2 ? 1 : -1, 1);
        ctx.drawImage(im2, -sw / 2, -sh, sw, sh); ctx.restore();
      }
      return;
    }
    for (var i = 0; i < pets.length; i++) {
      var p = pets[i];
      if (p.x < camX - 140 || p.x > camX + vw + 140) continue;
      var im = p.st === 'back' ? img.sqCarry : img.sqRun;
      if (!ready(im)) continue;
      var h = SQ_H, w = h * im.naturalWidth / im.naturalHeight;
      var moving = p.mv || p.st !== 'follow';
      var hop = moving ? -Math.abs(Math.sin(t * 22 + p.ph)) * 7 : Math.sin(t * 3 + p.ph) * 1.2;
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(p.x, gY + 3, w * 0.34, 5, 0, 0, 6.3); ctx.fill();
      if (sqBuffed()) csGlow(p.x, gY - h * 0.5 + hop, 46, '255,210,60', 0.45);
      ctx.save();
      ctx.translate(p.x, gY + hop + 2);
      ctx.scale(p.dir > 0 ? -1 : 1, 1);
      ctx.drawImage(im, -w / 2, -h, w, h);
      ctx.restore();
      ctx.fillStyle = '#ff6fa8'; ctx.font = '14px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('\u2665', p.x, gY - h - 8 + hop);
    }
  }

function sqPct(c) { var p = c * 100; return (p >= 10 ? Math.round(p) : (Math.round(p * 10) / 10 + '').replace('.', ',')) + '%'; }
