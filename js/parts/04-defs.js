/* defs · 192 declarations · function sqRender() { sqRowsEl.textContent = ''; for (var r = 0; r < RAR.length; r++) { (function (r) { var row = docume */

function sqRender() {
    sqRowsEl.textContent = '';
    for (var r = 0; r < RAR.length; r++) {
      (function (r) {
        var row = document.createElement('div'); row.className = 'sqrow' + (sqCan(r) ? ' on' : ''); row.setAttribute('role', 'button'); row.tabIndex = 0;
        var d = document.createElement('span'); d.className = 'dot'; d.style.background = RAR[r].c;
        var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = RAR[r].n;
        var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = 'шанс принести ' + sqPct(SQ_CHANCE[r]);
        var st = document.createElement('span'); st.className = 'st'; st.textContent = sqCan(r) ? 'берут' : 'не берут';
        row.appendChild(d); row.appendChild(nm); row.appendChild(ch); row.appendChild(st);
        var tog = function () { save.sqF[r] = save.sqF[r] ? 0 : 1; persist(); sqRender(); };
        row.addEventListener('click', tog);
        row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
        sqRowsEl.appendChild(row);
      })(r);
    }
    (function () {
      var on = !!save.sqSec, row = document.createElement('div'); row.className = 'sqrow' + (on ? ' on' : ''); row.setAttribute('role', 'button'); row.tabIndex = 0;
      var d = document.createElement('span'); d.className = 'dot'; d.style.background = '#ffffff';
      var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = 'Секретная';
      var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = 'шанс принести 0,1%';
      var st = document.createElement('span'); st.className = 'st'; st.textContent = on ? 'берут' : 'не берут';
      row.appendChild(d); row.appendChild(nm); row.appendChild(ch); row.appendChild(st);
      var tog = function () { save.sqSec = save.sqSec ? 0 : 1; persist(); sqRender(); };
      row.addEventListener('click', tog); row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      sqRowsEl.appendChild(row);
    })();
    sqFeedBtn.textContent = sqSuper() ? 'Белки навсегда на пике силы' : 'Накормить армию орешком (' + (save.sqFed | 0) + ' из 15)' + (sqBuf > 0 ? ', бафф ещё ' + Math.ceil(sqBuf) + ' с' : '');
    sqFeedBtn.className = 'go' + (save.army > 0 && save.nuts > 0 && !sqSuper() ? '' : ' no');
    sqInfoEl.textContent = 'Белок в армии: ' + save.army + '. Орешков: ' + save.nuts + '. Орешек армии даёт 30 секунд баффа: белки берут самую редкую чекушку на локации. Если секретной нет, находят её с шансом 5%, мифическую 10%, легендарную 15% и так выше. 15 орешков делают бафф вечным. ' + (save.sqOff
      ? 'Армия распущена: белки сидят на деревьях в Парке и ждут команды.'
      : 'Выбери, какие чекушки белки носят. Чем реже чекушка, тем меньше шанс, что белка её принесёт: легендарную можно и за 5 минут не дождаться.');
    sqDisBtn.textContent = save.sqOff ? 'Собрать армию' : 'Распустить армию';
    sqDisBtn.className = 'go' + (save.army > 0 ? '' : ' no');
    sqDisBtn.setAttribute('aria-disabled', save.army > 0 ? 'false' : 'true');
  }

function sqDisband() {
    for (var i = 0; i < pets.length; i++) { var p = pets[i]; if (p.tgt) p.tgt.claimed = false; p.tgt = null; p.st = 'follow'; p.mv = false; }
    save.sqOff = 1; persist();
    toast('Армия распущена: белки убежали на деревья в Парке.', 3500);
  }

function sqGather() {
    save.sqOff = 0;
    for (var i = 0; i < pets.length; i++) { var p = pets[i]; p.x = P.x - P.face * (50 + Math.random() * 120); p.st = 'follow'; p.ft = 3 + Math.random() * 4; p.tgt = null; }
    persist();
    sfx('rare'); toast('Белки собрались и снова ходят за тобой.', 3000);
  }

function sqOpenPanel() {
    if (paused && !sqOpen) return;
    sqOpen = true; sqRender(); syncPause(); sqOv.hidden = false;
  }

function sqClosePanel() { sqOpen = false; sqOv.hidden = true; syncPause(); }

function sqTap(e) { var n = performance.now(); if (n - sqTapAt < 400) return; sqTapAt = n; if (e && e.cancelable) e.preventDefault(); if (sqOpen) sqClosePanel(); else sqOpenPanel(); }

function nearBin() {
    for (var i = 0; i < bins.length; i++) if (Math.abs(P.x - bins[i].x) < 55 && P.z < 70) return bins[i];
    return null;
  }

function lootSearch(x, luck, isBin) {
    var r0 = Math.random(), n = 0, nut = 0, i;
    if (isBin) { if (r0 < 0.72) n = 1 + Math.floor(Math.random() * 3); else if (r0 < 0.8) nut = 1; }
    else { if (r0 < 0.88) n = 1 + Math.floor(Math.random() * 2); else if (r0 < 0.94) nut = 1; }
    if (!n && !nut) {
      sfx('no'); popup(P.x, PLAYER_H + 8, 'Пусто', '#cfd8e6');
      toast(isBin ? 'В мусорке только мусор.' : 'Под остановкой ничего нет.', 2200);
      return;
    }
    var drop = 0, best = 0;
    for (i = 0; i < n; i++) {
      var r = rollRar(x, luck);
      if (r > best) best = r;
      if (save.carried < cap()) {
        save.inv.d[r]++; save.carried++;
        popup(P.x + (i - 1) * 34, PLAYER_H + 8 + i * 4, r ? '+1 ' + RAR[r].n : '+1', RAR[r].c);
      } else {
        drop++;
        bottles.push({ x: P.x + (Math.random() - 0.5) * 90, off: 0, ph: Math.random() * 6.28, r: r });
      }
    }
    if (nut) { save.nuts++; popup(P.x, PLAYER_H + 40, '+1 орешек', '#d9a066'); }
    persist(); hud(); sfx(best > 1 ? 'rare' : 'pick');
    if (drop) toast('Карман полон: ' + drop + ' чекуш' + (drop === 1 ? 'ка' : 'ек') + ' выпало на землю рядом.', 3000);
  }

function isChickenTokenDay() { return new Date().getDay() === 0; }

function chickenTokenChance() {
    var misses = Math.max(0, Math.min(98, Math.floor(+(save.mx && save.mx.chPity) || 0)));
    var chance = Math.min(0.05, 0.001 + misses * 0.0005);
    if (isChickenTokenDay()) chance = Math.min(0.15, chance * 3);
    return chance;
  }

function triggerChickenToken() {
    if (save.mx && save.mx.chickenToken) return false;
    save.mx.chickenToken = 1;
    save.mx.chickenUntil = Date.now() + 60000;
    save.mx.chPity = 0;
    // Все уже лежащие на карте чекушки становятся мифическими или секретными.
    for (var i = 0; i < bottles.length; i++) {
      var b = bottles[i];
      if (b.lab !== undefined || b.sup) continue;
      b.r = 5; b.c = false; b.secret = Math.random() < 0.5;
    }
    persist(); hud(); sfx('rare');
    var cinema = document.getElementById('tokenCinema');
    document.getElementById('tokenCinemaImg').src = CHICKEN_TOKEN_IMG;
    cinema.hidden = false;
    document.getElementById('tokenCollect').focus();
    toast('НЕВЕРОЯТНО! Ты нашёл Chicken Token! На 1 минуту все чекушки становятся только мифическими или секретными!', 7000);
    return true;
  }

function searchBin(b) {
    if (b.cd > 0) { sfx('no'); toast('Мусорку уже перерыли. Загляни через ' + fmtTime(b.cd) + '.', 2500); return; }
    b.cd = BIN_CD;
    if (!(save.mx && save.mx.chickenToken)) {
      var chance = chickenTokenChance();
      if (Math.random() < chance && triggerChickenToken()) {
        // Удачная находка сбрасывает pity внутри triggerChickenToken().
      } else {
        save.mx.chPity = Math.min(98, Math.max(0, Math.floor(+save.mx.chPity || 0)) + 1);
        var nextChance = chickenTokenChance() * 100;
        toast((isChickenTokenDay() ? '🐔 CHICKEN TOKEN DAY! ' : '') + 'Chicken Token не найден. Неудачных обысков: ' + save.mx.chPity + '. Следующий шанс: ' + nextChance.toFixed(2).replace('.', ',') + '%.', 2600);
        persist();
      }
    }
    lootSearch(b.x, 0.25, true);
  }

function searchStop(st) {
    if ((st.cd || 0) > 0) { sfx('no'); toast('Тут уже искали. Загляни через ' + fmtTime(st.cd) + '.', 2500); return; }
    st.cd = STOP_CD; lootSearch(st.x, 0.35, false);
  }

function updateBins(dt) {
    var i;
    for (i = 0; i < bins.length; i++) if (bins[i].cd > 0) bins[i].cd = Math.max(0, bins[i].cd - dt);
    for (i = 0; i < ALL_STOPS.length; i++) if (ALL_STOPS[i].cd > 0) ALL_STOPS[i].cd = Math.max(0, ALL_STOPS[i].cd - dt);
  }

function drawBins() {
    var x0 = camX - 90, x1 = camX + vw + 90;
    for (var i = 0; i < bins.length; i++) {
      var b = bins[i];
      if (b.x < x0 || b.x > x1) continue;
      var x = b.x, empty = b.cd > 0;
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 34, 6, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = empty ? '#5f7f6b' : '#2f8a52';
      ctx.fillRect(x - 26, gY - 46, 52, 44);
      ctx.fillStyle = 'rgba(0,0,0,.18)';
      ctx.fillRect(x - 14, gY - 44, 3, 40); ctx.fillRect(x - 1, gY - 44, 3, 40); ctx.fillRect(x + 12, gY - 44, 3, 40);
      ctx.fillStyle = empty ? '#4c6a58' : '#22683f';
      ctx.fillRect(x - 30, gY - 54, 60, 9);
      ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 17, gY - 2, 4, 0, 6.3); ctx.arc(x + 17, gY - 2, 4, 0, 6.3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('\u267B', x, gY - 24);
      if (!empty) { ctx.fillStyle = '#ffe066'; sparkle(x + 22, gY - 62 + Math.sin(t * 3 + b.ph) * 3, 4); }
    }
  }

function specUi() {
    var show = save.special > 0 && !boss.on && !save.mx.er;
    if (specBtn.hidden === show) specBtn.hidden = !show;
    if (!show) return;
    var cdl = bossCdLeft();
    var busy = !!air.plane || cdl > 0;
    var txt = '\u2726 Особый аирдроп \u00D7' + save.special + (cdl > 0 ? ' \u00B7 ' + fmtTime(cdl) : (touch ? '' : ' (Z)'));
    var k = txt + busy;
    if (k === lastSpec) return;
    lastSpec = k; specBtn.textContent = txt; specBtn.classList.toggle('no', busy);
  }

function callSpecial() {
    if (paused || busLock() || save.special < 1 || boss.on || ep.on) return;
    if (save.mx.er) { sfx('no'); toast('Хоумлендера больше нет: особый аирдроп вызывать некого. Чтобы вернуть его, поговори с Собирателем чекушек.', 4500); return; }
    var cdl = bossCdLeft();
    if (cdl > 0) { sfx('no'); toast('Хоумлендера не видно вдалеке. Он отдыхает после боя и не прилетит ещё ' + fmtTime(cdl) + '. Особый аирдроп остался у тебя.', 4500); return; }
    if (air.plane) return;
    save.special--; persist(); hud();
    sendPlane(true);
    startBoss();
  }

function bossH() { return Math.max(150, Math.min(270, gY * 0.5)); }

function bossW() { return bossH() * (ready(img.boss) ? img.boss.naturalWidth / img.boss.naturalHeight : BOSS_ASPECT); }

function hoverY() { var h = bossH(); return Math.max(h / 2 + 24, gY - PLAYER_H - h / 2 - 100); }

function bossBob() { return Math.sin(t * 2.5) * 5; }

function bossEye() {
    return { x: boss.x + (EYE_X - 0.5) * bossW() * (boss.face > 0 ? -1 : 1), y: boss.y + bossBob() + (EYE_Y - 0.5) * bossH() };
  }

function heroOver() { return hero.on && !boss.on && hero.x > 0 && hero.x < vw && Math.abs(hero.x - (P.x - camX)) < 300; }

function segDist(px, py, ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    var k = l2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2)) : 0;
    var cx = ax + dx * k, cy = ay + dy * k;
    return Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
  }

function hurtPlayer(n) { if (iFrames > 0 || hp <= 0) return; iFrames = 0.9; hurt(Math.max(1, Math.round(n * bossBuff * (1 + 0.08 * (boss.phase - 1)) * (ob.on ? 1 - armorCut() : 1)))); }

function coverEnd(E, gx) {
    var steps = 70;
    if (loc.i !== 0) return { x: gx, y: gY, blocked: false };
    for (var s = 1; s <= steps; s++) {
      var k = s / steps, px = E.x + (gx - E.x) * k, py = E.y + (gY - E.y) * k;
      for (var i = 0; i < ALL_STOPS.length; i++) {
        var sx = ALL_STOPS[i].x;
        if (px > sx - 62 && px < sx + 62 && py > gY - 114) return { x: px, y: py, blocked: true, x0: sx - 62, x1: sx + 62 };
      }
    }
    return { x: gx, y: gY, blocked: false };
  }

function startBoss(remote, info) {
    if (kk.on || ep.on) return;
    // у Белого дома (одиночная игра) вместо обычного боя идёт история с Меллстроем и Моггити
    if (!remote && loc.i === 6 && !save.mx.er && epStart()) return;
    ob.call = false;
    if (bus.on && bus.st === 'come') busCancel(); // автобус ещё не приехал: отменяем вызов, чтобы не застрять
    // в лобби Хоумлендер сильнее: +250 HP за каждого игрока, урон больше и бьёт чаще
    var np = (info && info.np) ? info.np : ((typeof net !== 'undefined' && net.room) ? Math.max(1, net.room.members.length) : 1);
    bossNp = np; bossBuff = 1 + 0.2 * (np - 1); bossFast = 1 + 0.08 * (np - 1); bossOut = 0;
    bossRole = remote ? 'fol' : ((socket && net.room && net.state === 'online') ? 'own' : '');
    bossOwner = (info && info.own) || ''; bn.has = false; bsn = null; bossSnT = 0; bossPend.length = 0;
    if (!remote && bossRole === 'own') socket.emit('boss', { start: 1, l: loc.i, np: np });
    else if (remote && socket && net.state === 'online') socket.emit('boss', { join: 1 });
    boss.on = true; boss.max = BOSS_HP + BOSS_PLAYER_HP * (np - 1); boss.hp = boss.max; boss.st = 'intro'; boss.t = 0; boss.age = 0; boss.left = BOSS_TIME;
    if (hero.on) { boss.x = camX + hero.x; boss.y = hero.y; }
    else { boss.x = P.x + (Math.random() < 0.5 ? -1 : 1) * 320; boss.y = -200; }
    boss.vy = 0; boss.face = P.x < boss.x ? -1 : 1;
    boss.cd = 1.2; boss.flash = 0; boss.rage = false; boss.healed = false; boss.dead = 0; boss.gt = 0; boss.ground = false;
    boss.last = ''; boss.did = false; boss.did2 = false; boss.shield = 0; boss.blind = 0; boss.immune = 0; boss.milkAt = -99; boss.big = false;
    boss.phase = 1; boss.queue.length = 0; boss.milkN = 0; boss.healTot = 0; boss.warn = ''; boss.warnT = 0; bossSess++;
    document.body.classList.remove('rage', 'fin');
    hero.on = false; hero.ambush = false;
    beams.length = 0; stars.length = 0; shots.length = 0; acorns.length = 0; waves.length = 0; orbs.length = 0; flames.length = 0;
    iFrames = 0; throwCd = 0; ammo = 0;
    document.body.classList.add('boss'); elBossBar.hidden = false; lastBossUi = '';
    sfx('rare');
    toast('Хоумлендер-Петух вышел на бой! Кидай чекушки (' + (touch ? 'кнопка «Бросить»' : 'F или клик') + '). Мытые чекушки и стекловата слепят его' + (touch ? '' : ' (V меняет снаряд)') + '. Перед сильной атакой появляется предупреждение. Из транспорта можно выйти кнопкой «Выйти»' + (touch ? '' : ' (X)') + '.', 9000);
  }

function endBoss(win, why) {
    if (socket && net.room && net.state === 'online' && bossRole) {
      if (bossRole === 'own' && (win || why === 'time')) socket.emit('boss', { end: 1, w: win ? 1 : 0 });
      else socket.emit('boss', { leave: 1 });
    }
    bossRole = ''; bossOwner = ''; bsn = null; bossPend.length = 0;
    boss.on = false; boss.st = ''; boss.shield = 0; boss.queue.length = 0; boss.warn = '';
    elBossBar.hidden = true; document.body.classList.remove('boss', 'rage', 'fin');
    beams.length = 0; stars.length = 0; shots.length = 0; acorns.length = 0; waves.length = 0; orbs.length = 0; flames.length = 0;
    thr.key = thr.ptr = thr.btn = false; iFrames = 0; ammo = 0;
    hero.on = false; heroT = 45 + Math.random() * 45;
    if (win && bossPaid !== bossSess) {
      bossPaid = bossSess; // награда один раз за бой, даже если сеть пришлёт конец боя дважды
      save.nuts += 5; save.superSp = (save.superSp || 0) + 1; save.coins += BOSS_COINS; save.wins = (save.wins || 0) + 1;
      save.bossUntil = Date.now() + BOSS_CD * 1000;
      persist(); hud(); sfx('rare'); showReward();
      burst(P.x, gY - 100, 40, '#ffd23f', 420, 1.1);
      popup(P.x, PLAYER_H + 24, 'ПОБЕДА!', '#ffd23f');
      toast('Победа! Награда: уникальная чекушка «Супер-Спирт» (+15% к выручке в магазине), ' + BOSS_COINS.toLocaleString('ru-RU') + ' коинов и 5 орешков. Хоумлендер уйдёт отдыхать на 3 минуты.', 8000);
    } else if (why === 'time') {
      toast('Хоумлендер-Петух заскучал и улетел. Он ещё вернётся: жди особого аирдропа или его следующего облёта.', 6000);
    }
  }

function blindBoss(sec, label, remote) {
    if (!boss.on || boss.st === 'intro' || boss.st === 'dying') return;
    if (boss.immune > 0) { if (boss.blind <= 0 && !remote) popup(boss.x, gY - boss.y + 60, 'Привык к блеску', '#cfd8e6'); return; }
    if (!remote && bossRole && socket && net.room && net.state === 'online') socket.emit('boss', { blind: sec, label: label });
    boss.blind = Math.max(boss.blind, sec); boss.immune = sec + 2.5;
    boss.shield = 0; boss.queue.length = 0;
    beams.length = 0; stars.length = 0;
    boss.st = 'stun'; boss.t = 0; boss.flash = 1;
    popup(boss.x, gY - boss.y + 70, label, '#fff6a0');
    burst(boss.x, boss.y - 30, 18, '#ffffff', 340, 0.8);
    sfx('rare');
  }

function damageBoss(n, small, remote) {
    if (!boss.on || boss.st === 'dying' || boss.hp <= 0) return;
    if (boss.blind > 0 && !remote) n *= 1.5;
    if (!remote && mgFat > 0) n *= mgFatB ? 2.5 : 1.8;
    var total = n;
    if (!remote && net.room) { bossOut += n; if (bossRole === 'fol') bossPend.push({ t: performance.now(), n: n }); }
    if (boss.shield > 0) {
      var ab = Math.min(boss.shield, n); boss.shield -= ab; n -= ab;
      if (boss.shield <= 0) { boss.shield = 0; burst(boss.x, boss.y, 16, '#9fe3ff', 320, 0.7); if (!small) popup(boss.x, gY - boss.y + 80, 'Щит сломан', '#9fe3ff'); }
    }
    boss.hp = Math.max(bossRole === 'fol' ? 1 : 0, boss.hp - n);
    if (!small) {
      boss.flash = 1;
      popup(boss.x + (Math.random() - 0.5) * 40, gY - boss.y + 30, '\u2212' + Math.round(total), n > 0 ? '#ff9a9a' : '#9fe3ff');
      burst(boss.x, boss.y, 10, '#ffd23f', 260);
    }
    if (boss.hp <= 0) bossDie();
  }

function bossDie() {
    if (boss.st === 'dying') return;
    boss.hp = 0;
    boss.st = 'dying'; boss.dead = 0; boss.t = 0; boss.vy = 0; boss.ground = false; boss.gt = 0; boss.shield = 0;
    beams.length = 0; stars.length = 0; acorns.length = 0; waves.length = 0; orbs.length = 0; flames.length = 0;
    sfx('rare'); toast('Хоумлендер-Петух падает!', 2500);
  }

function ammoCount() {
    var n = 0, q;
    if (ammo === 0) { for (q = 0; q < 6; q++) n += save.inv.d[q]; }
    else if (ammo === 1) { for (q = 0; q < 6; q++) n += save.inv.c[q]; }
    else n = save.wool;
    return n;
  }

function autoAmmo() {
    if (ammoCount() > 0) return true;
    for (var k = 1; k < 3; k++) {
      var old = ammo; ammo = (ammo + k) % 3;
      if (ammoCount() > 0) { lastBossUi = ''; popup(P.x, PLAYER_H + 24, 'Теперь: ' + AMMO_NAMES[ammo].toLowerCase(), '#ffffff'); return true; }
      ammo = old;
    }
    return false;
  }

function cycleAmmo() {
    if (ep.on) { epCast(1); return; }
    if (!boss.on && !kk.on) return;
    ammo = (ammo + 1) % 3; lastBossUi = ''; sfx('pick');
    popup(P.x, PLAYER_H + 24, AMMO_NAMES[ammo], '#ffffff');
  }

function pickAmmo() {
    var q;
    if (ammo === 1) { for (q = 0; q < 6; q++) if (save.inv.c[q] > 0) return { k: 'clean', r: q, c: true }; return null; }
    if (ammo === 2) { return save.wool > 0 ? { k: 'wool', r: 0, c: false } : null; }
    for (q = 0; q < 6; q++) if (save.inv.d[q] > 0) return { k: 'dirty', r: q, c: false };
    return null;
  }

function throwBottle() {
    if (gh.on) return;
    if (p5.on) { p5Fire(); return; }
    if (ep.on) { epCast(0); return; }
    if (kk.on) { krThrow(); return; }
    if ((loc.i === 10 || loc.i === 14) && !boss.on && !ep.on) { mogAct(); return; }
    if (!boss.on || paused || busLock() || throwCd > 0) return;
    if (boss.st === 'intro' || boss.st === 'dying') return;
    var a = pickAmmo();
    if (!a && autoAmmo()) a = pickAmmo();
    if (!a) {
      if (noAmmoT <= 0) { noAmmoT = 1.2; sfx('no'); popup(P.x, PLAYER_H + 24, 'Нет: ' + AMMO_NAMES[ammo].toLowerCase() + (touch ? '' : ' (V)'), '#ff9a9a'); }
      return;
    }
    if (a.k === 'wool') save.wool--; else if (a.c) save.inv.c[a.r]--; else save.inv.d[a.r]--;
    save.carried--; persist(); hud();
    autoAmmo();
    throwCd = 0.3; sfx('jump');
    shots.push({ x: P.x, y: gY - P.z - 100, k: a.k, r: a.r, c: a.c, a: 0, age: 0, v: 520 });
  }

function updateProjectiles(dt) {
    var i, hr = bossW() * 0.33;
    for (i = shots.length - 1; i >= 0; i--) {
      var s = shots[i]; s.age += dt; s.a += dt * 18; s.v = Math.min(1100, s.v + 1400 * dt);
      if (!boss.on || boss.st === 'dying') { shots.splice(i, 1); continue; }
      var dx = boss.x - s.x, dy = boss.y - s.y, d = Math.sqrt(dx * dx + dy * dy) || 1, step = s.v * dt;
      if (d < hr || step >= d) {
        if (s.used) { shots.splice(i, 1); continue; }
        s.used = true; // один выстрел бьёт только один раз
        if (s.k === 'mg') { damageBoss(s.dm, true); burst(s.x, s.y, 2, '#ffd23f', 120, 0.25); }
        else if (s.k === 'rkt') { damageBoss(s.dm); ring(s.x, s.y, 60, '#ff9a3c'); burst(s.x, s.y, 14, '#ff9a3c', 320, 0.6); sfx('rare'); }
        else if (s.k === 'wool') { blindBoss(4.5, 'Вата в глаза!'); damageBoss(8); sfx('pick'); ring(s.x, s.y, 50, '#ffffff'); }
        else if (s.k === 'clean') { blindBoss(2.5, 'Ослеплён блеском!'); damageBoss(Math.round(BOT_DMG[s.r] * 1.25)); ring(s.x, s.y, 50, '#9fe3ff'); }
        else { damageBoss(BOT_DMG[s.r]); sfx(s.r > 1 ? 'rare' : 'pick'); ring(s.x, s.y, 50, RAR[s.r].c); }
        shots.splice(i, 1); continue;
      }
      s.x += dx / d * step; s.y += dy / d * step;
      if (s.age > 3) shots.splice(i, 1);
    }
    for (i = acorns.length - 1; i >= 0; i--) {
      var a = acorns[i]; a.a += dt * 14;
      if (!boss.on || boss.st === 'dying') { acorns.splice(i, 1); continue; }
      var ax = boss.x - a.x, ay = boss.y - a.y, ad = Math.sqrt(ax * ax + ay * ay) || 1, st = 650 * dt;
      if (ad < hr || st >= ad) { damageBoss(nutDmg(), true); burst(a.x, a.y, 3, '#c28a4a', 120, 0.4); acorns.splice(i, 1); continue; }
      a.x += ax / ad * st; a.y += ay / ad * st;
    }
  }

function phaseOf(hpv, mx) { var r = hpv / mx; return r > BOSS_PH[0] ? 1 : (r > BOSS_PH[1] ? 2 : (r > BOSS_PH[2] ? 3 : 4)); }

function bossCdBase() { return [1.8, 1.5, 1.2, 0.9][boss.phase - 1] || 1.5; }

function canMilk() { return boss.phase >= 2 && boss.phase <= 3 && boss.milkN < 2 && boss.healTot < boss.max * 0.18 && boss.hp < boss.max * 0.8 && boss.age - boss.milkAt > 20 && boss.shield <= 0; }

function enterPhase(ph, remote) {
    boss.phase = ph; boss.rage = ph >= 3;
    boss.flash = 1; shk = Math.max(shk, 0.7); boss.blind = 0; boss.shield = 0; boss.queue.length = 0;
    beams.length = 0; stars.length = 0; waves.length = 0; orbs.length = 0; flames.length = 0;
    if (boss.st !== 'dying') { boss.st = 'fight'; boss.t = 0; boss.cd = 1.5; }
    document.body.classList.toggle('rage', ph >= 3); document.body.classList.toggle('fin', ph >= 4);
    boss.warn = 'ФАЗА ' + ph + ': ' + PH_NAME[ph].toUpperCase(); boss.warnT = 2.4;
    burst(boss.x, boss.y, 28, ph >= 3 ? '#ff5a5f' : '#ffd23f', 380, 0.9); sfx('boom');
    if (ph === 2) toast('Фаза 2: Хоумлендер злится. Тёмные шары, огненные залпы и связки атак.', 4500);
    else if (ph === 3) {
      toast('Фаза 3: ярость! Он быстрее, бьёт лучом по земле и метеоритами. Раз за бой он залечивает раны.', 5500);
      if (!remote && !boss.healed) {
        boss.healed = true;
        var add = Math.round(boss.max * 0.1); boss.hp = Math.min(boss.max, boss.hp + add); boss.healTot += add;
        popup(boss.x, gY - boss.y + 40, '+' + add + ' HP', '#7dff9a'); burst(boss.x, boss.y, 30, '#7dff9a', 380, 0.9);
      }
    } else if (ph === 4) toast('ФИНАЛ! Хоумлендер в бешенстве: быстрые атаки, тройной лазер и сверхновая. Добей его!', 6000);
  }

function pickAttack(force, mirror) {
    var pool = BOSS_POOL[boss.phase] || BOSS_POOL[1], ks = pool.slice();
    if (canMilk()) ks.push('milk', 'milk');
    var k, tries = 0;
    if (force) k = force;
    else {
      do { k = ks[Math.floor(Math.random() * ks.length)]; tries++; } while ((k === boss.last) && tries < 12);
      if (k === 'combo') {
        var cl = BOSS_COMBO[boss.phase] || BOSS_COMBO[2], cb = cl[Math.floor(Math.random() * cl.length)];
        k = cb[0]; boss.queue = cb.slice(1);
      }
    }
    boss.last = k; boss.did = false; boss.did2 = false; boss.t = 0; boss.big = false;
    boss.st = (k === 'meteor' || k === 'barrage') ? 'stars' : k;
    boss.warn = BOSS_WARN[k] || ''; boss.warnT = 1.5;
    var i, ph = boss.phase;
    if (k === 'laser') {
      var n = ph >= 4 ? 3 : (ph >= 3 ? 2 : 1), aim = [1.0, 0.95, 0.85, 0.7][ph - 1];
      for (i = 0; i < n; i++) beams.push({ kind: 'laser', t: 0, aim: aim, fire: 0.5, dx: i ? (i % 2 ? -1 : 1) * (170 + Math.random() * 90) * (i > 1 ? 1.5 : 1) : 0, hit: false, tx: P.x, gx: P.x, end: null });
      sfx('no');
      if (!coverHint) { coverHint = true; toast('Лазер бьёт по прямой: прячься под крышей автобусной остановки!', 4500); }
    } else if (k === 'sweep') {
      var side = Math.random() < 0.5 ? -1 : 1;
      beams.push({ kind: 'sweep', t: 0, aim: ph >= 4 ? 0.9 : 1.2, fire: ph >= 4 ? 1.4 : 1.8, x0: P.x - side * 480, x1: P.x + side * 480, gx: P.x - side * 480, hit: false, end: null });
      if (ph >= 4) beams.push({ kind: 'sweep', t: 0, aim: 0.9, fire: 1.4, x0: P.x + side * 480, x1: P.x - side * 480, gx: P.x + side * 480, hit: false, end: null });
      sfx('no');
    } else if (k === 'stars' || k === 'meteor') {
      boss.big = (k === 'meteor');
      var m = boss.big ? 12 : [5, 6, 8, 9][ph - 1], step = boss.big ? 0.16 : [0.28, 0.25, 0.2, 0.18][ph - 1], wide = boss.big ? 1000 : 700;
      for (i = 0; i < m; i++) stars.push({ x: Math.max(40, Math.min(WORLD_W - 40, P.x + (i ? (Math.random() - 0.5) * wide : 0))), delay: 1.0 + i * step, done: false, R: boss.big ? 85 : 62 });
      sfx('no');
    } else if (k === 'barrage') {
      var nb = Math.min(11, (ph >= 3 ? 7 : 5) + (bossNp - 1));
      for (i = 0; i < nb; i++) stars.push({ x: Math.max(40, Math.min(WORLD_W - 40, P.x + (i ? (Math.random() - 0.5) * 760 : 0))), delay: 0.9 + i * 0.2, done: false, R: 58, fire: true });
      sfx('no');
      if (!atkHint.fire) { atkHint.fire = true; toast('Огненный залп! На земле остаётся огонь: не стой в нём, двигайся.', 4500); }
    } else if (k === 'charge') {
      boss.cdir = (force && bossFcd) ? bossFcd : (Math.random() < 0.5 ? -1 : 1); boss.cdone = false;
      sfx('no');
      if (!atkHint.charge) { atkHint.charge = true; toast('Рывок! Он пролетит по земле через всю линию: перепрыгни его.', 4500); }
    } else if (k === 'orb') {
      var no = Math.min(4, 1 + (bossNp >= 3 ? 1 : 0) + (bossNp >= 6 ? 1 : 0) + (ph >= 3 ? 1 : 0)), E0 = bossEye();
      for (i = 0; i < no; i++) orbs.push({ x: E0.x + (i - (no - 1) / 2) * 50, y: E0.y, age: 0, life: 5.2, ph: i * 1.7 });
      sfx('no');
      if (!atkHint.orb) { atkHint.orb = true; toast('Тёмный шар преследует тебя! Прыгай и убегай, пока он не рассеется.', 4500); }
    } else if (k === 'milk') {
      boss.milkAt = boss.age; boss.milkN++; sfx('gulp');
    } else if (k === 'nova') {
      boss.tx = boss.x; sfx('no');
      if (!atkHint.nova) { atkHint.nova = true; toast('Сверхновая! Он заряжается, потом по земле идут три волны подряд: прыгай через каждую.', 5000); }
    } else { boss.tx = P.x; sfx('no'); }
    if (bossRole === 'own' && !mirror && socket && net.room && net.state === 'online') socket.emit('boss', { atk: k, cd: boss.cdir || 1 });
  }

function endAttack() {
    boss.st = 'fight'; boss.t = 0;
    boss.cd = boss.queue.length ? 0.3 : bossCdBase();
  }

function updateBoss0(dt) {
    if (!boss.on) return;
    boss.t += dt; boss.age += dt;
    if (boss.flash > 0) boss.flash = Math.max(0, boss.flash - dt * 5);
    if (boss.immune > 0) boss.immune -= dt;
    boss.face = P.x < boss.x ? -1 : 1;
    var hy = hoverY(), h = bossH(), i;

    // падение: звуковая волна при приземлении
    if (boss.st === 'dying') {
      boss.dead += dt;
      if (!boss.ground) {
        boss.vy += 1500 * dt; boss.y += boss.vy * dt;
        var gyB = gY - bossW() * 0.55;
        if (boss.y >= gyB) {
          boss.y = gyB; boss.ground = true; boss.gt = 0; shk = 1.3;
          sfx('boom');
          fx.push({ k: 'r', x: boss.x, y: gY - 6, r: 560, age: 0, life: 0.9, c: '#ffffff' });
          fx.push({ k: 'r', x: boss.x, y: gY - 6, r: 560, age: -0.14, life: 0.9, c: '#9fe3ff' });
          fx.push({ k: 'r', x: boss.x, y: gY - 6, r: 560, age: -0.28, life: 0.9, c: '#ffd23f' });
          burst(boss.x, gY - 20, 40, '#ffd23f', 460, 1.0);
          var dxp = P.x - boss.x;
          if (Math.abs(dxp) < 650) { P.kb = (dxp < 0 ? -1 : 1) * 1100; P.vz = Math.max(P.vz, 260); }
          toast('Звуковая волна от падения!', 3000);
        }
      } else {
        boss.gt += dt;
        if (Math.random() < 0.4) burst(boss.x + (Math.random() - 0.5) * bossW(), gY - 20, 1, '#ffd23f', 200, 0.8);
        if (boss.gt > 1.8) endBoss(true);
      }
      return;
    }
    boss.left -= dt;
    if (boss.left <= 0) { endBoss(false, 'time'); return; }

    // ударные волны по земле
    for (i = waves.length - 1; i >= 0; i--) {
      var wv = waves[i]; wv.age += dt; wv.x += wv.dir * wv.v * dt;
      if (!wv.hit && Math.abs(P.x - wv.x) < 34 && P.z < 55) { wv.hit = true; hurtPlayer(14); }
      if (wv.age > 2.2 || wv.x < 0 || wv.x > WORLD_W) waves.splice(i, 1);
    }

    // огонь после залпа
    for (i = flames.length - 1; i >= 0; i--) {
      var fl = flames[i]; fl.age += dt;
      if (fl.age < fl.life && Math.abs(P.x - fl.x) < fl.R * 0.85 && P.z < 45) hurtPlayer(6);
      if (fl.age >= fl.life) flames.splice(i, 1);
    }

    // фазы по здоровью (только вверх, лечение фазу не откатывает); владелец боя решает, followers берут из снимка
    if (bossRole !== 'fol') {
      var nph = phaseOf(boss.hp, boss.max);
      if (nph > boss.phase) { enterPhase(nph, false); return; }
    }
    if (boss.warnT > 0) boss.warnT -= dt;

    if (boss.st === 'intro') {
      boss.x += (P.x - boss.x) * Math.min(1, 1.6 * dt); boss.y += (hy - boss.y) * Math.min(1, 2 * dt);
      if (boss.t > 1.8) { boss.st = 'fight'; boss.t = 0; }
    } else if (boss.st === 'fight') {
      // летит за петухом: во второй фазе быстрее
      var fol = [2.4, 2.9, 4.2, 4.9][boss.phase - 1], amp = [200, 220, 260, 280][boss.phase - 1], maxv = [430, 520, 760, 900][boss.phase - 1];
      var txf = P.x + Math.sin(boss.t * (boss.rage ? 1.1 : 0.6)) * amp;
      var mv = (txf - boss.x) * fol * dt, lim = maxv * dt;
      boss.x += Math.max(-lim, Math.min(lim, mv));
      boss.y += (hy + Math.sin(boss.t * 1.7) * 14 - boss.y) * Math.min(1, 3 * dt);
      boss.cd -= dt * bossFast;
      if (boss.cd <= 0) { if (boss.queue.length) pickAttack(boss.queue.shift()); else pickAttack(); }
    } else if (boss.st === 'stun') {
      boss.blind -= dt;
      boss.x += Math.sin(boss.age * 3) * 70 * dt; boss.y += (hy + 50 - boss.y) * Math.min(1, 2 * dt);
      if (boss.blind <= 0) { boss.blind = 0; boss.st = 'fight'; boss.t = 0; boss.cd = 1.0; }
    } else if (boss.st === 'milk') {
      boss.y += (hy - 20 - boss.y) * Math.min(1, 3 * dt);
      var smax = SHIELD_MAX * (boss.rage ? 1.15 : 1);
      if (boss.t < 1.2) boss.shield = smax * (boss.t / 1.2);
      else {
        boss.shield = Math.max(boss.shield, smax);
        if (bossRole !== 'fol' && boss.healTot < boss.max * 0.2) { var hh0 = Math.min(boss.max - boss.hp, 5 * dt); boss.hp += hh0; boss.healTot += hh0; }
        if (Math.random() < 0.2) burst(boss.x + (Math.random() - 0.5) * 60, boss.y - 20, 1, '#7dff9a', 120, 0.8);
      }
      if (boss.t > 6) endAttack();
    } else if (boss.st === 'laser' || boss.st === 'sweep') {
      boss.y += (hy - boss.y) * Math.min(1, 3 * dt);
      var E = bossEye(), done = true;
      for (i = 0; i < beams.length; i++) {
        var b = beams[i]; b.t += dt;
        if (b.kind === 'sweep') {
          b.gx = b.t < b.aim ? b.x0 : b.x0 + (b.x1 - b.x0) * Math.min(1, (b.t - b.aim) / b.fire);
        } else {
          if (b.t < b.aim - 0.3) b.tx = P.x + b.dx;
          var ty = gY - 40, f = (gY - E.y) / (ty - E.y);
          b.gx = E.x + (b.tx - E.x) * f;
        }
        b.end = coverEnd(E, b.gx);
        if (b.t >= b.aim && b.t < b.aim + b.fire) {
          var covered = b.end.blocked && P.x > b.end.x0 && P.x < b.end.x1;
          if (!b.hit && !covered && segDist(P.x, gY - P.z - 75, E.x, E.y, b.end.x, b.end.y) < 40) { b.hit = true; hurtPlayer(b.kind === 'sweep' ? 14 : 18); }
          if (Math.random() < 0.6) burst(b.end.x, b.end.y - 2, 1, b.end.blocked ? '#9fe3ff' : '#ff9a3c', 220, 0.4);
        }
        if (b.t < b.aim + b.fire + 0.15) done = false;
      }
      if (done) { beams.length = 0; endAttack(); }
    } else if (boss.st === 'stars') {
      boss.y += (hy - boss.y) * Math.min(1, 3 * dt);
      var all = true;
      for (i = 0; i < stars.length; i++) {
        var sx = stars[i];
        if (!sx.done && boss.t >= sx.delay) {
          sx.done = true; ring(sx.x, gY - 6, sx.R + 20, '#ff5a5f'); burst(sx.x, gY - 8, 14, '#ffffff', 300, 0.6); sfx('jump');
          if (Math.abs(P.x - sx.x) < sx.R && P.z < 55) hurtPlayer(boss.big ? 14 : 10);
          if (sx.fire) flames.push({ x: sx.x, R: sx.R, age: 0, life: 3.4 });
        }
        if (boss.t < sx.delay + 0.35) all = false;
      }
      if (all) { stars.length = 0; endAttack(); }
    } else if (boss.st === 'dive') {
      var T = boss.t;
      if (T < 1.0) {
        if (T < 0.7) boss.tx = P.x;
        boss.x += (boss.tx - boss.x) * Math.min(1, 7 * dt);
        boss.y += (Math.max(h / 2 + 16, hy - 50) - boss.y) * Math.min(1, 5 * dt);
      } else if (T < 1.28) {
        if (!boss.did2) { boss.did2 = true; boss.y0 = boss.y; }
        var k = (T - 1.0) / 0.28;
        boss.y = boss.y0 + (gY - h / 2 - 4 - boss.y0) * k * k;
        boss.x += (boss.tx - boss.x) * Math.min(1, 12 * dt);
      } else {
        if (!boss.did) {
          boss.did = true; boss.y = gY - h / 2 - 4;
          ring(boss.x, gY - 6, 150, '#ffd23f'); burst(boss.x, gY - 10, 24, '#ffd23f', 380, 0.7); sfx('no');
          if (Math.abs(P.x - boss.x) < bossW() * 0.5 + 20 && P.z < 130) hurtPlayer(25);
        }
        if (T > 1.9) boss.y += (hy - boss.y) * Math.min(1, 4 * dt);
        if (T > 2.7) endAttack();
      }
    } else if (boss.st === 'charge') {
      // рывок: уходит в сторону, предупреждает полосой и пролетает по земле
      var Tc = boss.t, cd = boss.cdir || 1, gyc = gY - h / 2 - 4;
      if (Tc < 1.0) {
        boss.x += ((P.x - cd * 520) - boss.x) * Math.min(1, 6 * dt);
        boss.y += (gyc - boss.y) * Math.min(1, 5 * dt);
      } else if (Tc < 1.55) {
        boss.x += cd * 1500 * dt; boss.y = gyc;
        if (!boss.cdone && Math.abs(P.x - boss.x) < bossW() * 0.5 + 16 && P.z < 110) { boss.cdone = true; hurtPlayer(20); shk = 0.6; }
        if (Math.random() < 0.7) burst(boss.x - cd * 40, gY - 10, 1, '#ffd23f', 160, 0.4);
      } else {
        boss.y += (hy - boss.y) * Math.min(1, 4 * dt);
        if (Tc > 2.3) endAttack();
      }
    } else if (boss.st === 'orb') {
      boss.y += (hy - boss.y) * Math.min(1, 3 * dt);
      for (i = orbs.length - 1; i >= 0; i--) {
        var ob2 = orbs[i]; ob2.age += dt;
        var tx2 = P.x, ty2 = gY - 45 - P.z * 0.8, ddx = tx2 - ob2.x, ddy = ty2 - ob2.y, dd = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        var sp2 = [210, 230, 290, 330][boss.phase - 1] * Math.min(1, ob2.age / 0.6 + 0.3);
        ob2.x += ddx / dd * sp2 * dt; ob2.y += ddy / dd * sp2 * dt;
        if (dd < 34) { hurtPlayer(16); burst(ob2.x, ob2.y, 14, '#b266ff', 300, 0.5); sfx('boom'); orbs.splice(i, 1); continue; }
        if (ob2.age > ob2.life) { burst(ob2.x, ob2.y, 10, '#b266ff', 200, 0.5); orbs.splice(i, 1); }
      }
      if (!orbs.length || boss.t > 6) { orbs.length = 0; endAttack(); }
    } else if (boss.st === 'stomp') {
      // топот: удар по земле и две ударные волны в стороны (через них можно перепрыгнуть)
      var Ts = boss.t;
      if (Ts < 0.9) {
        if (Ts < 0.6) boss.tx = P.x;
        boss.x += (boss.tx - boss.x) * Math.min(1, 7 * dt);
        boss.y += (Math.max(h / 2 + 16, hy - 70) - boss.y) * Math.min(1, 5 * dt);
      } else if (Ts < 1.2) {
        if (!boss.did2) { boss.did2 = true; boss.y0 = boss.y; }
        var ks = (Ts - 0.9) / 0.3;
        boss.y = boss.y0 + (gY - h / 2 - 4 - boss.y0) * ks * ks;
      } else {
        if (!boss.did) {
          boss.did = true; boss.y = gY - h / 2 - 4; shk = 1; sfx('boom');
          ring(boss.x, gY - 6, 190, '#ff9a3c'); burst(boss.x, gY - 10, 30, '#ffb347', 420, 0.8);
          if (Math.abs(P.x - boss.x) < 130 && P.z < 70) hurtPlayer(22);
          var sp = [440, 480, 580, 640][boss.phase - 1];
          waves.push({ x: boss.x - 40, dir: -1, v: sp, age: 0, hit: false }, { x: boss.x + 40, dir: 1, v: sp, age: 0, hit: false });
        }
        if (Ts > 1.9) boss.y += (hy - boss.y) * Math.min(1, 4 * dt);
        if (Ts > 2.7) endAttack();
      }
    }
    else if (boss.st === 'nova') {
      // сверхновая: заряд с предупреждением, потом три волны по земле подряд
      var Tn = boss.t;
      boss.y += (Math.max(h / 2 + 16, hy - 60) - boss.y) * Math.min(1, 4 * dt);
      boss.x += (boss.tx - boss.x) * Math.min(1, 3 * dt);
      if (Tn < 1.7) { if (Math.random() < 0.5) burst(boss.x + (Math.random() - 0.5) * 120, boss.y + (Math.random() - 0.5) * 80, 1, '#ff7a7a', 160, 0.5); }
      var ns = boss.did2 | 0;
      if (ns < 3 && Tn >= 1.7 + ns * 0.45) {
        boss.did2 = ns + 1; shk = Math.max(shk, 0.5); sfx('boom');
        ring(boss.x, gY - 6, 170 + ns * 30, ns === 2 ? '#ff3b3b' : '#ffb347');
        waves.push({ x: boss.x - 40, dir: -1, v: 560, age: 0, hit: false }, { x: boss.x + 40, dir: 1, v: 560, age: 0, hit: false });
      }
      if (Tn > 3.9) endAttack();
    }
    boss.x = Math.max(60, Math.min(WORLD_W - 60, boss.x));
  }

function bossSnap() { return { x: Math.round(boss.x), y: Math.round(boss.y), f: boss.face, hp: Math.round(boss.hp * 10) / 10, sh: Math.round(boss.shield), bl: Math.round(boss.blind * 10) / 10, rg: boss.rage ? 1 : 0, ph: boss.phase, d: boss.st === 'dying' ? 1 : 0, lf: Math.round(boss.left * 10) / 10, st: boss.st }; }

function bossNetOn() { return socket && net.room && net.state === 'online'; }

function bossFollowPre(dt) {
    if (bsn) {
      if (!bn.has) { bn.x = bsn.x; bn.y = bsn.y; bn.has = true; }
      else { var k = Math.min(1, dt * 14); bn.x += (bsn.x - bn.x) * k; bn.y += (bsn.y - bn.y) * k; }
      if (boss.st !== 'dying') { boss.x = bn.x; boss.y = bn.y; }
      boss.left = bsn.lf; boss.shield = bsn.sh;
      if (bsn.ph && bsn.ph > boss.phase && boss.st !== 'dying') enterPhase(bsn.ph, true);
      if (bsn.d && boss.st !== 'dying') bossDie();
      else if (boss.st !== 'dying') {
        var now = performance.now(), pend = 0, i;
        for (i = bossPend.length - 1; i >= 0; i--) { if (now - bossPend[i].t > 700) bossPend.splice(i, 1); else pend += bossPend[i].n; }
        var want = Math.max(1, bsn.hp - pend);
        if (Math.abs(want - boss.hp) > 0.5) boss.hp = want;
      }
    }
    if (boss.st === 'fight') boss.cd = 99;
  }

function bossFollowPost() {
    if (!bsn || boss.st === 'dying') return;
    boss.x = bn.x; boss.y = bn.y;
    if (boss.st === 'dive' || boss.st === 'stomp') boss.tx = bn.x;
  }

function updateBoss(dt) {
    if (!boss.on) return;
    if (bossRole === 'fol') { bossFollowPre(dt); updateBoss0(dt); if (boss.on) bossFollowPost(); return; }
    updateBoss0(dt);
    if (bossRole === 'own' && boss.on && bossNetOn()) {
      bossSnT += dt;
      if (bossSnT >= 0.1) { bossSnT = 0; socket.volatile.emit('boss', { sn: bossSnap() }); }
    }
  }

function bossSolo() { if (!boss.on) return; if (bossRole === 'fol') boss.cd = Math.min(boss.cd, 1.5); bossRole = ''; bossOwner = ''; bsn = null; }

function bossNetMsg(m) {
    if (!m) return;
    if (m.start || m.deny) {
      if (m.l !== undefined && (m.l | 0) !== loc.i) return;
      if (p5.on || p6.on || cs.on || ep.on || kk.on) return;
      if (m.deny) { // бой уже идёт у другого игрока: становимся повторяющим
        if (boss.on) { bossRole = 'fol'; bossOwner = m.own || ''; bn.has = false; bsn = null; bossPend.length = 0; }
        return;
      }
      if (!boss.on) startBoss(true, m);
      else if (!bossRole && net.room) { bossRole = 'fol'; bossOwner = m.own || ''; bn.has = false; bsn = null; }
    } else if (m.own) {
      bossOwner = m.own;
      if (boss.on && socket && m.own === socket.id) { bossRole = 'own'; boss.cd = Math.min(boss.cd, 1.2); bossSnT = 0; }
    } else if (m.sn) { if (boss.on && bossRole === 'fol') bsn = m.sn; }
    else if (m.atk) {
      if (!boss.on || bossRole !== 'fol' || boss.st === 'dying' || boss.st === 'intro') return;
      beams.length = 0; stars.length = 0; orbs.length = 0;
      bossFcd = m.cd || 0; pickAttack(m.atk, true); bossFcd = 0;
    }
    else if (m.blind) { if (boss.on) blindBoss(m.blind, m.label || '', true); }
    else if (m.dmg) { if (boss.on) damageBoss(m.dmg, false, true); }
    else if (m.end) {
      if (!boss.on || bossRole !== 'fol') return;
      if (m.w) { if (boss.st !== 'dying') bossDie(); }
      else endBoss(false, 'time');
    }
  }

function bossUi() {
    if (!boss.on) return;
    var k = boss.phase + '|' + Math.ceil(boss.hp) + '|' + Math.ceil(boss.left) + '|' + Math.ceil(boss.shield) + '|' + (boss.blind > 0) + '|' + ammo + '|' + ammoCount() + '|' + boss.rage;
    if (k === lastBossUi) return;
    lastBossUi = k;
    elBossFill.style.width = (boss.hp / boss.max * 100).toFixed(1) + '%';
    var tx = Math.ceil(boss.hp) + ' / ' + boss.max + ' \u00B7 фаза ' + boss.phase;
    if (boss.shield > 0) tx += ' \u00B7 щит';
    if (boss.blind > 0) tx += ' \u00B7 слеп';
    elBossTxt.textContent = tx;
    elBossTime.textContent = fmtTime(boss.left);
    elBossShieldWrap.style.display = boss.shield > 0 ? '' : 'none';
    elBossShield.style.width = Math.min(100, boss.shield / (SHIELD_MAX * 1.3) * 100).toFixed(0) + '%';
    var tip = ['', ' (слепят)', ' (слепят надолго)'][ammo];
    elBossAmmo.textContent = 'Снаряд: ' + AMMO_NAMES[ammo] + ' \u00D7' + ammoCount() + tip + (touch ? '' : ' \u00B7 V: сменить');
  }

function bossFlashSprite() {
    if (bossWhite) return bossWhite;
    if (!ready(img.boss)) return null;
    var c = document.createElement('canvas'); c.width = img.boss.naturalWidth; c.height = img.boss.naturalHeight;
    var g = c.getContext('2d');
    g.drawImage(img.boss, 0, 0);
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = '#ffffff'; g.fillRect(0, 0, c.width, c.height);
    bossWhite = c;
    return c;
  }

function drawStarShape(x, y, r, rot, c1, c2) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = rot + i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
      if (i) ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); else ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fillStyle = c1; ctx.fill(); ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
  }

function drawBossGround() {
    if (!boss.on) return;
    var i, pulse = 0.5 + 0.5 * Math.sin(t * 14);
    for (i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.done) continue;
      ctx.fillStyle = 'rgba(255,60,60,' + (0.16 + 0.2 * pulse) + ')';
      ctx.beginPath(); ctx.ellipse(s.x, gY + 2, s.R, 14, 0, 0, 6.3); ctx.fill();
      ctx.strokeStyle = 'rgba(255,90,90,.85)'; ctx.lineWidth = 2; ctx.stroke();
    }
    if ((boss.st === 'dive' || boss.st === 'stomp') && !boss.did) {
      var rw = boss.st === 'stomp' ? 130 : bossW() * 0.55;
      ctx.fillStyle = boss.st === 'stomp' ? 'rgba(255,150,40,' + (0.16 + 0.22 * pulse) + ')' : 'rgba(255,60,60,' + (0.16 + 0.22 * pulse) + ')';
      ctx.beginPath(); ctx.ellipse(boss.tx, gY + 2, rw, 16, 0, 0, 6.3); ctx.fill();
      ctx.strokeStyle = 'rgba(255,110,60,.9)'; ctx.lineWidth = 2; ctx.stroke();
    }
    for (i = 0; i < flames.length; i++) {
      var fl2 = flames[i], fa = Math.min(1, (fl2.life - fl2.age) / 0.8), fk = 0.5 + 0.5 * Math.sin(t * 20 + i * 2);
      ctx.fillStyle = 'rgba(255,' + Math.round(90 + 60 * fk) + ',0,' + (0.55 * fa) + ')';
      ctx.beginPath(); ctx.ellipse(fl2.x, gY - 4, fl2.R * 0.9, 16, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = 'rgba(255,220,90,' + (0.7 * fa) + ')';
      for (var q2 = -2; q2 <= 2; q2++) {
        var fh = 20 + 16 * Math.sin(t * 14 + q2 * 1.7 + i);
        ctx.beginPath(); ctx.moveTo(fl2.x + q2 * 20 - 8, gY - 2); ctx.quadraticCurveTo(fl2.x + q2 * 20, gY - fh - 8, fl2.x + q2 * 20 + 8, gY - 2); ctx.fill();
      }
    }
    if (boss.st === 'charge' && boss.t < 1.0) {
      var cdr = boss.cdir || 1, ca = 0.16 + 0.24 * pulse;
      ctx.fillStyle = 'rgba(255,60,60,' + ca + ')';
      var cx0 = Math.min(boss.x, boss.x + cdr * 1100), cw0 = 1100;
      ctx.fillRect(cx0, gY - bossH() + 10, cw0, bossH() - 10);
      ctx.strokeStyle = 'rgba(255,110,60,.9)'; ctx.lineWidth = 2; ctx.strokeRect(cx0, gY - bossH() + 10, cw0, bossH() - 10);
    }
    if (boss.st === 'nova' && boss.t < 3.2) {
      var nk = Math.min(1, boss.t / 1.7), na = 0.16 + 0.26 * pulse;
      ctx.fillStyle = 'rgba(255,60,60,' + na + ')';
      ctx.beginPath(); ctx.ellipse(boss.x, gY + 2, 80 + nk * 420, 15, 0, 0, 6.3); ctx.fill();
      ctx.strokeStyle = 'rgba(255,110,60,.9)'; ctx.lineWidth = 2; ctx.stroke();
      if (boss.t < 1.7) { ctx.strokeStyle = 'rgba(255,255,255,' + (0.4 + 0.4 * pulse) + ')'; ctx.beginPath(); ctx.arc(boss.x, boss.y, 40 + nk * 70, 0, 6.3); ctx.stroke(); }
    }
    for (i = 0; i < waves.length; i++) {
      var w = waves[i];
      ctx.fillStyle = 'rgba(255,210,80,.75)';
      ctx.beginPath(); ctx.ellipse(w.x, gY - 16, 16, 34, 0, 0, 6.3); ctx.fill();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
    }
  }

function drawBoss() {
    if (!boss.on || !ready(img.boss)) return;
    var w = bossW(), h = bossH();
    var dying = boss.st === 'dying';
    var dy = boss.y + (dying ? 0 : bossBob());
    var shake = (boss.st === 'dive' || boss.st === 'stomp') && boss.t < 1.0 ? Math.sin(t * 60) * 3 : 0;
    var sh = 1 - Math.min(0.7, Math.max(0, (gY - boss.y)) / 900);
    ctx.fillStyle = 'rgba(0,0,0,' + (0.2 * sh) + ')'; ctx.beginPath(); ctx.ellipse(boss.x, gY + 3, w * 0.45 * sh, 8, 0, 0, 6.3); ctx.fill();
    if (boss.rage && !dying) {
      var ga = (boss.phase >= 4 ? 0.45 : 0.28) + 0.14 * Math.sin(t * (boss.phase >= 4 ? 14 : 8));
      var g = ctx.createRadialGradient(boss.x, dy, h * 0.1, boss.x, dy, h * 0.85);
      g.addColorStop(0, 'rgba(255,60,60,' + ga + ')'); g.addColorStop(1, 'rgba(255,60,60,0)');
      ctx.fillStyle = g; ctx.fillRect(boss.x - h, dy - h, h * 2, h * 2);
    }
    ctx.save();
    ctx.translate(boss.x + shake, dy);
    if (dying) { ctx.rotate(Math.min(1.45, boss.dead * 1.2) * (boss.face > 0 ? -1 : 1)); ctx.globalAlpha = boss.ground ? Math.max(0, 1 - boss.gt / 1.8) : 1; }
    else ctx.rotate(Math.sin(t * 1.3) * 0.035);
    ctx.scale(boss.face > 0 ? -1 : 1, 1);
    ctx.drawImage(img.boss, -w / 2, -h / 2, w, h);
    if (boss.flash > 0) {
      var fs = bossFlashSprite();
      if (fs) { ctx.globalAlpha *= Math.min(1, boss.flash) * 0.8; ctx.drawImage(fs, -w / 2, -h / 2, w, h); }
    }
    ctx.restore();
    if (dying) return;
    // щит от молока
    if (boss.shield > 0) {
      ctx.save(); ctx.translate(boss.x, dy);
      ctx.globalAlpha = 0.16 + 0.08 * Math.sin(t * 6); ctx.fillStyle = '#9fe3ff';
      ctx.beginPath(); ctx.ellipse(0, 0, w * 0.78, h * 0.62, 0, 0, 6.3); ctx.fill();
      ctx.globalAlpha = Math.min(1, boss.shield / 60) * 0.75; ctx.strokeStyle = '#d6f5ff'; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
    }
    // пакет молока у клюва
    if (boss.st === 'milk') {
      ctx.save();
      ctx.translate(boss.x + boss.face * (w * 0.5 + 4), dy - h * 0.16);
      ctx.rotate(boss.face * (-0.5 + 0.12 * Math.sin(t * 12)));
      ctx.fillStyle = '#ffffff'; ctx.fillRect(-12, -17, 24, 34);
      ctx.fillStyle = '#3b7bff'; ctx.fillRect(-12, -17, 24, 10);
      ctx.fillStyle = '#3b7bff'; ctx.font = '9px "Russo One", Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('МОЛОКО', 0, 6);
      ctx.restore();
    }
    // оглушён: над головой кружат звёзды
    if (boss.st === 'stun') {
      for (var q = 0; q < 3; q++) {
        var a = t * 5 + q * 2.09;
        drawStarShape(boss.x + Math.cos(a) * w * 0.3, dy - h * 0.52 + Math.sin(a) * 8, 9, a, '#ffe066', '#b8860b');
      }
    }
    // светящиеся глаза
    var glow = boss.rage ? 0.4 : 0;
    for (var i = 0; i < beams.length; i++) glow = Math.max(glow, Math.min(1, beams[i].t / beams[i].aim));
    if (glow > 0 && boss.st !== 'stun') {
      var E = bossEye();
      var eg = ctx.createRadialGradient(E.x, E.y, 1, E.x, E.y, 8 + glow * 22);
      eg.addColorStop(0, 'rgba(255,255,255,' + glow + ')'); eg.addColorStop(0.35, 'rgba(255,50,50,' + glow * 0.9 + ')'); eg.addColorStop(1, 'rgba(255,50,50,0)');
      ctx.fillStyle = eg; ctx.fillRect(E.x - 40, E.y - 40, 80, 80);
    }
  }

function drawBossAir() {
    if (!boss.on) return;
    var i, b;
    // предупреждение о приближающейся атаке (по центру экрана сверху)
    if (boss.warn && boss.warnT > 0 && boss.st !== 'dying') {
      var wa = Math.min(1, boss.warnT / 0.35), wcx = camX + vw / 2, wy0 = 54 + (shakeY || 0);
      ctx.save(); ctx.globalAlpha = wa; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var wtw = ctx.measureText(boss.warn).width + 34;
      ctx.fillStyle = boss.warn.indexOf('ФАЗА') === 0 ? 'rgba(120,10,20,.92)' : 'rgba(150,20,20,.85)'; rrect(wcx - wtw / 2, wy0 - 20, wtw, 40, 12); ctx.fill();
      ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.fillText('\u26A0 ' + boss.warn, wcx, wy0 + 1);
      ctx.restore();
    }
    for (i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.done) continue;
      var k = (boss.t - (s.delay - 0.4)) / 0.4;
      if (k <= 0) continue;
      var sy = -60 + (gY - 20 + 60) * Math.min(1, k * k);
      drawStarShape(s.x, sy, s.R * 0.36, t * 9 + i, s.fire ? '#fff0a0' : '#ffffff', s.fire ? '#ff5a00' : '#3b5bdb');
    }
    for (i = 0; i < orbs.length; i++) {
      var o3 = orbs[i], rr3 = 22 + 3 * Math.sin(t * 12 + o3.ph);
      var og = ctx.createRadialGradient(o3.x, o3.y, 2, o3.x, o3.y, rr3 * 2);
      og.addColorStop(0, 'rgba(230,200,255,.95)'); og.addColorStop(0.35, 'rgba(150,70,255,.85)'); og.addColorStop(1, 'rgba(60,0,120,0)');
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(o3.x, o3.y, rr3 * 2, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#1c0b33'; ctx.beginPath(); ctx.arc(o3.x, o3.y, rr3 * 0.7, 0, 6.3); ctx.fill();
    }
    if (beams.length) {
      var E = bossEye();
      ctx.lineCap = 'round';
      for (i = 0; i < beams.length; i++) {
        b = beams[i];
        if (!b.end) continue;
        if (b.t < b.aim) {
          var near = b.t > b.aim - 0.3;
          ctx.setLineDash(near ? [] : [12, 9]);
          ctx.strokeStyle = 'rgba(255,60,60,' + (near ? (0.6 + 0.4 * Math.sin(t * 50)) : 0.4) + ')';
          ctx.lineWidth = near ? 3 : 2;
          ctx.beginPath(); ctx.moveTo(E.x, E.y); ctx.lineTo(b.end.x, b.end.y); ctx.stroke();
          ctx.setLineDash([]);
          // v2.2: зарядка у глаз, лучи сходятся в точку
          var ck = Math.min(1, b.t / b.aim), pr = 8 + 40 * (1 - ck), op0 = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter';
          var cgx = ctx.createRadialGradient(E.x, E.y, 1, E.x, E.y, 16 + 26 * ck); cgx.addColorStop(0, 'rgba(255,255,255,' + (0.5 + 0.5 * ck).toFixed(2) + ')'); cgx.addColorStop(0.4, 'rgba(255,70,50,' + (0.6 * ck).toFixed(2) + ')'); cgx.addColorStop(1, 'rgba(255,40,20,0)');
          ctx.fillStyle = cgx; ctx.fillRect(E.x - 50, E.y - 50, 100, 100);
          for (var cp = 0; cp < 8; cp++) { var ca = cp * 0.785 + t * 6; ctx.fillStyle = 'rgba(255,200,160,' + (0.7 * ck).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(E.x + Math.cos(ca) * pr, E.y + Math.sin(ca) * pr, 2.2, 0, 6.3); ctx.fill(); }
          ctx.globalCompositeOperation = op0;
        } else if (b.t < b.aim + b.fire) {
          var wd = b.kind === 'sweep' ? 0.8 : 1 - (b.t - b.aim) / b.fire * 0.4;
          var cols = ['rgba(255,40,40,.28)', '#ff3b3b', '#ffffff'], ws = [34, 16, 6];
          for (var q = 0; q < 3; q++) {
            ctx.strokeStyle = cols[q]; ctx.lineWidth = ws[q] * wd;
            ctx.beginPath(); ctx.moveTo(E.x, E.y); ctx.lineTo(b.end.x, b.end.y); ctx.stroke();
          }
          var gg = ctx.createRadialGradient(b.end.x, b.end.y, 2, b.end.x, b.end.y, 60);
          gg.addColorStop(0, b.end.blocked ? 'rgba(180,235,255,.9)' : 'rgba(255,200,120,.9)'); gg.addColorStop(1, 'rgba(255,80,40,0)');
          ctx.fillStyle = gg; ctx.fillRect(b.end.x - 60, b.end.y - 60, 120, 120);
          // v2.2: яркая сердцевина, мерцание, искры и вспышка на глазах
          var op1 = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = 'rgba(255,230,200,' + (0.5 + 0.3 * Math.sin(t * 70)).toFixed(2) + ')'; ctx.lineWidth = 3 * wd; ctx.beginPath(); ctx.moveTo(E.x, E.y); ctx.lineTo(b.end.x, b.end.y); ctx.stroke();
          var eg2 = ctx.createRadialGradient(E.x, E.y, 1, E.x, E.y, 46); eg2.addColorStop(0, 'rgba(255,255,255,.95)'); eg2.addColorStop(0.4, 'rgba(255,90,60,.6)'); eg2.addColorStop(1, 'rgba(255,40,20,0)'); ctx.fillStyle = eg2; ctx.fillRect(E.x - 46, E.y - 46, 92, 92);
          for (var sp = 0; sp < 7; sp++) { var sa = Math.random() * 6.28, sr = 8 + Math.random() * 46; ctx.fillStyle = 'rgba(255,210,150,.85)'; ctx.fillRect(b.end.x + Math.cos(sa) * sr, b.end.y + Math.sin(sa) * sr * 0.6 - sr * 0.3, 2.4, 2.4); }
          ctx.globalCompositeOperation = op1;
        }
      }
      ctx.lineCap = 'butt';
    }
    if ((boss.st === 'dive' || boss.st === 'stomp') && boss.t < 1.0) {
      ctx.font = '38px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var ey = gY - 70 - Math.abs(Math.sin(t * 12)) * 10;
      ctx.lineWidth = 6; ctx.strokeStyle = '#14233f'; ctx.strokeText('!', boss.tx, ey);
      ctx.fillStyle = '#ff4a4a'; ctx.fillText('!', boss.tx, ey);
    }
  }

function drawShots() {
    var i;
    for (i = 0; i < shots.length; i++) {
      var s = shots[i];
      ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.a);
      if (s.k === 'mg') {
        ctx.rotate(-s.a); ctx.fillStyle = '#ffe08a'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, 6.3); ctx.fill();
      } else if (s.k === 'rkt') {
        ctx.rotate(-s.a); ctx.fillStyle = 'rgba(255,154,60,.5)'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 6.3); ctx.fill();
        ctx.fillStyle = '#d8362f'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, 6.3); ctx.fill();
        ctx.fillStyle = '#ffe08a'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, 6.3); ctx.fill();
      } else if (s.k === 'wool') {
        ctx.fillStyle = '#f2e6b3'; ctx.strokeStyle = '#c9b46a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.3); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-10, -2); ctx.lineTo(10, 3); ctx.moveTo(-6, 7); ctx.lineTo(8, -7); ctx.stroke();
      } else {
        var sp = bottleSprite(s.r, s.c);
        if (sp) { var bw = 44 * sp.width / sp.height; ctx.drawImage(sp, -bw / 2, -22, bw, 44); }
        if (s.c) { ctx.fillStyle = 'rgba(159,227,255,.45)'; ctx.beginPath(); ctx.arc(0, 0, 24, 0, 6.3); ctx.fill(); }
      }
      ctx.restore();
    }
    for (i = 0; i < acorns.length; i++) {
      var a = acorns[i];
      ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.a);
      ctx.fillStyle = '#b97a3a'; ctx.beginPath(); ctx.ellipse(0, 1, 5, 6.5, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#5b3d26'; ctx.beginPath(); ctx.arc(0, -3, 5.5, Math.PI, 0); ctx.fill();
      ctx.restore();
    }
  }

function noPick() { return !!(rit.on || p5.on || p6.on || ep.on || kk.on || fin.on || hn.on); }

function collectBottles(manual) {
    if (noPick()) return 0;
    var got = 0;
    for (var i = bottles.length - 1; i >= 0; i--) {
      var b = bottles[i];
      if (b.np && !manual) continue;
      if (!manual && !apCan(b)) continue;
      if (b.lab !== undefined && Math.abs(P.x - b.x) < 44 && P.z < 55) { bottles.splice(i, 1); labPick(b); got++; continue; }
      if (b.secret && Math.abs(P.x - b.x) < 44 && P.z < 55) {
        bottles.splice(i, 1); save.sec = (save.sec | 0) + 1; if (b.sc1) save.mx.sec1 = 1; persist(); hud(); sfx('rare'); got++; ach('secbot');
        popup(b.x, b.off + BOTTLE_H + 10, '+1 Секретная чекушка', '#ffffff'); toast('Секретная чекушка! При сдаче в магазине стоит ×100 от курса. Она не занимает место в кармане.', 6000); continue;
      }
      if (Math.abs(P.x - b.x) < 44 && P.z < 55) {
        if (save.carried >= cap()) {
          if (fullT <= 0) {
            fullT = 1.6; sfx('no');
            popup(P.x, PLAYER_H + 24, 'Карман полон', '#ff9a9a');
            if (!fullHint) { fullHint = true; toast('Карман полон. Сдай чекушки в магазине или купи карман побольше в гараже.', 4500); }
          }
          continue;
        }
        bottles.splice(i, 1);
        if (b.sup) { save.superSp = (save.superSp || 0) + 1; persist(); hud(); sfx('rare'); got++; popup(b.x, b.off + BOTTLE_H + 10, '+1 Супер-Спирт', '#ffd23f'); toast('Трофейная чекушка Хоумлендера! Супер-Спирт: +15% к выручке.', 4500); continue; }
        var rr = b.r | 0;
        if (b.c) save.inv.c[rr]++; else save.inv.d[rr]++;
        save.carried++; persist(); hud(); sfx(rr > 1 ? 'rare' : 'pick'); got++;
        popup(b.x, b.off + BOTTLE_H + 10, rr ? '+1 ' + RAR[rr].n : '+1', RAR[rr].c);
        if (rr && !seenRar[rr]) { seenRar[rr] = true; tutorialDone = true; toast(RAR[rr].n + ' чекушка! Стоит ' + fmtMult(RAR[rr].m) + ' от курса. Помой её: чистая ещё ' + fmtMult(CLEAN_MULT) + '.', 4500); }
        else if (!tutorialDone) { tutorialDone = true; toast('Отлично! Грязные чекушки можно помыть на мойке: чистые дороже. Потом неси в магазин слева.', 5000); }
      }
    }
    return got;
  }

function nearPick() {
    var i;
    for (i = 0; i < bottles.length; i++) if (Math.abs(P.x - bottles[i].x) < 44 && P.z < 55) return true;
    for (i = 0; i < wools.length; i++) if (Math.abs(P.x - wools[i].x) < 46 && P.z < 40) return true;
    return false;
  }

function fuelCap() { return 40 + 15 * save.kbus; }

function obSpeed() { return save.fuel > 0 ? 430 * (1 + 0.12 * save.ebus) : 90; }

function nearFuel() { if (loc.i !== 0) return null; for (var i = 0; i < FUEL.length; i++) if (Math.abs(ob.x - FUEL[i].x) < 120) return FUEL[i]; return null; }

function fuelUi() {
    var fon = ob.on || av.on;
    if (elFuel.hidden === fon) elFuel.hidden = !fon;
    if (av.on) { var tx2 = '\u2708 ' + Math.ceil(save.avFuel) + '/' + avCap() + ' \u00b7 \u26fd' + avPrice() + ' \u00b7 ' + Math.round(av.h) + ' м'; if (tx2 !== lastFuel) { lastFuel = tx2; elFuelN.textContent = tx2; } }
    else if (ob.on) { var tx = Math.ceil(save.fuel) + '/' + fuelCap() + ' \u00b7 \u26fd' + fuelPrice(); if (tx !== lastFuel) { lastFuel = tx; elFuelN.textContent = tx; } }
  }

function refuel() {
    var need = Math.ceil(fuelCap() - save.fuel - 0.01), fp = fuelPrice();
    if (need <= 0) { sfx('no'); toast('Бак уже полный.', 2000); return; }
    var l = Math.min(need, Math.floor(save.coins / fp));
    if (l <= 0) { sfx('no'); toast('Дефицит! Литр сейчас стоит ' + fp + ', цена меняется через ' + fuelLeft() + ' с.', 2800); return; }
    save.coins -= l * fp; save.fuel = Math.min(fuelCap(), save.fuel + l);
    persist(); hud(); sfx('sell');
    popup(ob.x, PLAYER_H + 30, '\u2212' + l * fp + ' ' + coinWord(l * fp), '#ffb4b4');
    toast('Заправлено ' + l + ' л по ' + fp + '. В баке ' + Math.ceil(save.fuel) + ' из ' + fuelCap() + '.', 2500);
  }

function obReach() { return 95 + 35 * save.mbus; }

function trunkCap() { return 10 + 10 * save.tbus; }

function trunkN() { var n = 0; for (var i = 0; i < 6; i++) n += save.trk.d[i] + save.trk.c[i]; return n; }

function nearOwnBus() { return loc.i === ob.loc && !!save.ownBus && !ob.on && Math.abs(P.x - ob.x) < 130 && P.z < 60; }

function nearBusInv() { return loc.i === ob.loc && !!save.ownBus && !ob.on && Math.abs(P.x - ob.x) < 170; }

function boardOwnBus() {
    ob.on = true; ob.v = 0; ob.dir = P.face || -1; P.vx = 0; sfx('jump'); lastHud = ''; hud();
    toast(touch ? 'За рулём! Кнопки влево и вправо: ехать. «Выйти»: выйти.' : 'За рулём! Стрелки: ехать, E: выйти. У магазина E сдаёт всё.', 4000);
  }

function exitOwnBus() {
    ob.on = false; ob.v = 0;
    P.x = Math.max(40, Math.min(WORLD_W - 40, ob.x - ob.dir * 125)); P.face = ob.dir; P.vx = 0;
  }

function unloadTrunk() {
    for (var r = 0; r < 6; r++) {
      save.inv.d[r] += save.trk.d[r]; save.inv.c[r] += save.trk.c[r];
      save.carried += save.trk.d[r] + save.trk.c[r]; save.trk.d[r] = 0; save.trk.c[r] = 0;
    }
  }

function ownBusAct() {
    if (boss.on) { if (save.wrk) fireRocket(); else exitOwnBus(); return; }
    if (inShop() && save.carried + trunkN() > 0) { unloadTrunk(); sellAll(); return; }
    if (nearFuel()) { refuel(); return; }
    exitOwnBus();
  }

function callUi() {
    var show = loc.i === ob.loc && !!save.apilot && !ob.on && !boss.on && !bus.on && (ob.call || Math.abs(ob.x - P.x) > 250);
    if (elCall.hidden === show) elCall.hidden = !show;
    if (!show) return;
    var txt = ob.call ? '\uD83D\uDE8C Едет к тебе\u2026' : '\uD83D\uDE8C Вызвать автобус' + (touch ? '' : ' (B)');
    if (txt !== lastCall) { lastCall = txt; elCall.textContent = txt; elCall.classList.toggle('no', !!ob.call); }
  }

function callOwnBus() {
    if (paused || ob.on || bus.on || boss.on || !save.apilot || ob.call) return;
    if (loc.i !== ob.loc) { sfx('no'); toast('Автобус стоит в другой локации: ' + LOCS[ob.loc].name + '.', 3000); return; }
    if (save.fuel <= 0) { sfx('no'); toast('В баке пусто: автобус не поедет. Заправь его на АЗС.', 3500); return; }
    if (Math.abs(ob.x - P.x) < 250) { sfx('no'); toast('Автобус уже рядом.', 2000); return; }
    ob.call = true; sfx('jump'); toast('Автопилот: автобус едет к тебе.', 3000);
  }

function updateOwnBus(dt) {
    fuelUi(); callUi(); busWashTick(dt);
    if (!ob.on && !ob.call) return;
    var d;
    if (ob.on) d = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    else {
      var gap = P.x - ob.x;
      d = Math.abs(gap) < 130 ? 0 : (gap > 0 ? 1 : -1);
      if (!d) { ob.call = false; ob.v = 0; sfx('rare'); toast('Автобус приехал.', 2000); return; }
    }
    ob.v += (d * obSpeed() - ob.v) * Math.min(1, (d ? 1.6 : 3.2) * dt);
    if (d) ob.dir = d;
    var pv0 = ob.v; ob.x += ob.v * dt;
    ob.acc = (ob.acc || 0) + (((ob.v - pv0) / Math.max(dt, 0.001)) - (ob.acc || 0)) * Math.min(1, 8 * dt);
    ob.smoke = (ob.smoke || 0) - dt; if (Math.abs(ob.v) > 40 && ob.smoke <= 0) { ob.smoke = 0.1; burst(ob.x + ob.dir * 104, gY - 22, 1, 'rgba(190,195,205,.8)', 60, 0.6); }
    save.fuel = Math.max(0, Math.min(fuelCap(), save.fuel - Math.abs(ob.v) * dt / 500 * (1 - 0.12 * save.sbus)));
    busRam();
    ob.fT = (ob.fT || 0) + dt; if (ob.fT > 1) { ob.fT = 0; persist(); }
    if (save.fuel <= 0 && ob.call) { ob.call = false; ob.v = 0; toast('Бензин кончился: автобус встал по дороге.', 3500); return; }
    if (save.fuel > 0) ob.warnE = false;
    else if (ob.on && !ob.warnE) { ob.warnE = true; toast('Бак пуст: едешь на парах. До АЗС доползёшь, но медленно.', 4500); }
    if (save.fuel > fuelCap() * 0.25) ob.warnL = false;
    else if (ob.on && !ob.warnL && save.fuel > 0 && save.fuel < fuelCap() * 0.2) { ob.warnL = true; toast('Бензин на исходе. Ищи АЗС.', 3500); }
    if (ob.x < 110) { ob.x = 110; ob.v = 0; }
    if (ob.x > WORLD_W - 110) { ob.x = WORLD_W - 110; ob.v = 0; }
    if (ob.on) { P.x = ob.x; P.vx = 0; P.z = 0; P.vz = 0; P.kb = 0; P.face = ob.dir; }
    var R = obReach();
    for (var i = bottles.length - 1; i >= 0; i--) {
      var b = bottles[i];
      if (b.off > 0 || Math.abs(b.x - ob.x) > R) continue;
      if (trunkN() >= trunkCap()) {
        if (fullT <= 0) { fullT = 1.6; sfx('no'); popup(ob.x, PLAYER_H + 24, 'Багажник полон', '#ff9a9a'); }
        continue;
      }
      bottles.splice(i, 1);
      var rr = b.r | 0;
      (b.c ? save.trk.c : save.trk.d)[rr]++;
      persist(); sfx(rr > 1 ? 'rare' : 'pick');
      popup(b.x, 100, '+1 \uD83D\uDE8C ' + trunkN() + '/' + trunkCap(), RAR[rr].c);
    }
  }

function armorCut() { return 0.12 * save.abus; }

function ramReach() { return save.rbus >= 3 ? 190 : 120; }

function busWashInt() { return [0, 14, 9, 5][save.cbus] || 0; }

function busRam() {
    if (!save.rbus || Math.abs(ob.v) < 140 || loc.i !== ob.loc) return;
    for (var i = 0; i < squirrels.length; i++) {
      var q = squirrels[i]; if (q.state === 'scared' || q.hit) continue;
      var dx = (q.x - ob.x) * ob.dir; if (dx < 40 || dx > ramReach()) continue;
      q.hit = true; sfx('boom'); shk = Math.max(shk, 0.25); burst(q.x, gY - 30, 10, '#ffd23f', 260, 0.5);
      if (q.state === 'carry' && save.rbus >= 2) { bottles.push({ x: q.x, off: 0, ph: Math.random() * 6.28, r: q.r | 0 }); popup(q.x, SQ_H + 16, 'Таран! Чекушка вернулась', '#9dffb8'); }
      else if (q.tgt) q.tgt.claimed = false;
      q.state = 'scared'; q.dir = ob.dir;
    }
  }

function busWashTick(dt) {
    var iv = busWashInt(); if (!iv || !save.ownBus) return;
    ob.wsT = (ob.wsT || 0) + dt; if (ob.wsT < iv) return;
    for (var r = 5; r >= 0; r--) if (save.trk.d[r] > 0) { ob.wsT = 0; save.trk.d[r]--; save.trk.c[r]++; persist(); if (loc.i === ob.loc) popup(ob.x, PLAYER_H + 40, 'Вымыта в багажнике', '#9fe3ff'); return; }
    ob.wsT = iv;
  }

function drawOwnBus() {
    if (!save.ownBus || loc.i !== ob.loc) return;
    drawBusModel(ob.x, ob.dir, mySkin, { own: true, ab: save.abus | 0, rb: save.rbus | 0, cb: save.cbus | 0, mg: save.wmg, rk: save.wrk, tr: save.wtr, on: ob.on, call: ob.call, v: ob.v, acc: ob.acc, f: wF, st: ob });
  }

function drawBusModel(x, dir, sk, cfg) {
    var ab = cfg.ab, i, on = !!cfg.on, mv = on ? Math.min(1, Math.abs(cfg.v || 0) / 200) : 0, ob = cfg.st, wF = cfg.f;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 112 + ab * 2, 7, 0, 0, 6.3); ctx.fill();
    ctx.translate(x, gY + (on ? Math.sin(t * 30) * mv * 0.9 : 0));
    if (dir > 0) ctx.scale(-1, 1);
    function bt2(str, px, py) { if (dir > 0) { ctx.save(); ctx.scale(-1, 1); ctx.fillText(str, -px, py); ctx.restore(); } else ctx.fillText(str, px, py); }
    var body = skinColor(sk);
    // крыша и кузов
    ctx.fillStyle = 'rgba(0,0,0,.28)'; rrect(-100, -104, 200, 14, 8); ctx.fill();
    ctx.fillStyle = body; rrect(-102, -98, 204, 82, 14); ctx.fill();
    var bg = ctx.createLinearGradient(0, -98, 0, -16); bg.addColorStop(0, 'rgba(255,255,255,.28)'); bg.addColorStop(0.35, 'rgba(255,255,255,0)'); bg.addColorStop(1, 'rgba(0,0,0,.25)'); ctx.fillStyle = bg; rrect(-102, -98, 204, 82, 14); ctx.fill();
    ctx.fillStyle = '#14233f'; ctx.fillRect(-102, -50, 204, 12);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(-102, -38, 204, 3);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '10px "Russo One", "Arial Black", Impact, sans-serif'; bt2(cfg.own ? 'МОЙ АВТОБУС' : 'АВТОБУС', 26, -44);
    // окна
    var wins = [[-96, 38], [-50, 34], [-10, 34], [30, 34], [70, 28]];
    for (i = 0; i < wins.length; i++) {
      ctx.fillStyle = '#243b55'; rrect(wins[i][0], -90, wins[i][1], 32, 5); ctx.fill();
      var wg = ctx.createLinearGradient(wins[i][0], -90, wins[i][0] + wins[i][1], -58); wg.addColorStop(0, 'rgba(190,230,250,.95)'); wg.addColorStop(1, 'rgba(110,170,210,.9)'); ctx.fillStyle = wg; rrect(wins[i][0] + 2, -88, wins[i][1] - 4, 28, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(wins[i][0] + 6, -88); ctx.lineTo(wins[i][0] + 14, -88); ctx.lineTo(wins[i][0] + 6, -62); ctx.lineTo(wins[i][0] + 2, -62); ctx.closePath(); ctx.fill();
    }
    if (cfg.own && on && ready(img.rooster)) { ctx.save(); ctx.beginPath(); ctx.rect(-94, -88, 34, 28); ctx.clip(); ctx.drawImage(img.rooster, 0, 0, 156, 115, -96, -92, 38, 28); ctx.restore(); }
    // дверь, зеркало
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-56, -57, 2, 40); ctx.fillRect(-20, -57, 2, 40); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(-26, -34, 3, 8);
    ctx.fillStyle = '#2a2f3a'; ctx.fillRect(-110, -78, 8, 3); ctx.fillRect(-114, -86, 6, 12);
    // броня по уровням
    if (ab >= 1) { ctx.fillStyle = ARM_C[Math.min(ab, 5) - 1]; ctx.fillRect(-102, -34, 204, 18); ctx.fillStyle = 'rgba(0,0,0,.28)'; for (i = -96; i < 100; i += 24) ctx.fillRect(i, -34, 2, 18); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-102, -34, 204, 2); ctx.fillStyle = '#d7dde6'; for (i = -90; i < 100; i += 24) { ctx.beginPath(); ctx.arc(i, -25, 1.8, 0, 6.3); ctx.fill(); } }
    if (ab >= 2) { ctx.fillStyle = ARM_C[Math.min(ab, 5) - 1]; ctx.beginPath(); ctx.moveTo(-102, -98); ctx.lineTo(-86, -98); ctx.lineTo(-102, -56); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(102, -98); ctx.lineTo(88, -98); ctx.lineTo(102, -56); ctx.closePath(); ctx.fill(); ctx.fillRect(98, -60, 4, 44); }
    if (ab >= 3) { ctx.strokeStyle = '#2a2f3a'; ctx.lineWidth = 2.4; for (i = 0; i < wins.length; i++) for (var gb = 1; gb <= 3; gb++) { var gx = wins[i][0] + wins[i][1] * gb / 4; ctx.beginPath(); ctx.moveTo(gx, -88); ctx.lineTo(gx, -60); ctx.stroke(); } }
    if (ab >= 4) { ctx.fillStyle = ARM_C[3]; rrect(-98, -106, 196, 8, 4); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (i = -86; i < 96; i += 28) ctx.fillRect(i, -106, 2, 8); ctx.fillStyle = ARM_C[3]; ctx.fillRect(-72, -26, 38, 14); ctx.fillRect(34, -26, 38, 14); }
    if (ab >= 5) { ctx.strokeStyle = 'rgba(255,214,90,' + (0.5 + 0.3 * Math.sin(t * 4)).toFixed(2) + ')'; ctx.lineWidth = 3; rrect(-102, -98, 204, 82, 14); ctx.stroke(); ctx.fillStyle = '#c9a43a'; ctx.fillRect(-102, -52, 204, 3); }
    // таран
    var rb = cfg.rb;
    if (rb >= 1) { ctx.fillStyle = '#3f4652'; ctx.beginPath(); ctx.moveTo(-102, -44); ctx.lineTo(-126, -30); ctx.lineTo(-126, -18); ctx.lineTo(-102, -16); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7d8796'; ctx.fillRect(-126, -30, 4, 12); }
    if (rb >= 2) { ctx.fillStyle = '#c9ced6'; for (i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-126, -30 + i * 6); ctx.lineTo(-140 - rb * 2, -27 + i * 6); ctx.lineTo(-126, -24 + i * 6); ctx.closePath(); ctx.fill(); } }
    if (rb >= 3) { ctx.fillStyle = 'rgba(255,90,60,' + (0.4 + 0.25 * Math.sin(t * 6)).toFixed(2) + ')'; ctx.fillRect(-126, -34, 3, 20); }
    // фары, стоп-сигналы, выхлоп
    if (on || cfg.call) { var hg = ctx.createLinearGradient(-102, 0, -250, 0); hg.addColorStop(0, 'rgba(255,246,176,.42)'); hg.addColorStop(1, 'rgba(255,246,176,0)'); ctx.fillStyle = hg; ctx.beginPath(); ctx.moveTo(-104, -36); ctx.lineTo(-250, -56); ctx.lineTo(-250, -2); ctx.lineTo(-104, -26); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#fff6b0'; ctx.beginPath(); ctx.ellipse(-99, -32, 4, 7, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#e6e6ee'; ctx.fillRect(-106, -22, 10, 5);
    var brk = ((cfg.acc || 0) * dir) < -120;
    ctx.fillStyle = brk ? '#ff3b3b' : '#a82833'; ctx.fillRect(98, -40, 4, 12);
    ctx.fillStyle = '#2a2f3a'; ctx.fillRect(96, -20, 12, 5);
    // колёса с арками
    for (var wI = 0; wI < 2; wI++) {
      var cxw = wI ? 62 : -62, rot = x / 17;
      ctx.fillStyle = '#10131a'; ctx.beginPath(); ctx.arc(cxw, -15, 23, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#1b1b20'; ctx.beginPath(); ctx.arc(cxw, -15, 18, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#aab3be'; ctx.beginPath(); ctx.arc(cxw, -15, 9, 0, 6.3); ctx.fill();
      ctx.strokeStyle = '#59616c'; ctx.lineWidth = 2; ctx.beginPath();
      for (var sp = 0; sp < 3; sp++) { var sa = rot + sp * 1.047; ctx.moveTo(cxw + Math.cos(sa) * 8, -15 + Math.sin(sa) * 8); ctx.lineTo(cxw - Math.cos(sa) * 8, -15 - Math.sin(sa) * 8); } ctx.stroke();
    }
    // бак мойки на крыше
    if (cfg.cb) { ctx.fillStyle = '#7fd0f2'; rrect(80, -118, 16, 14, 4); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(84, -116, 3, 8); }
    // оружие на крыше
    var aimDx = (cfg.own && typeof bossLive === 'function' && bossLive()) ? (boss.x - x) * (dir > 0 ? -1 : 1) : -1, aimA = aimDx >= 0 ? -0.2 : Math.PI + 0.2;
    ob.aim = (ob.aim == null ? aimA : ob.aim); var da = aimA - ob.aim; ob.aim += da * 0.15;
    if (cfg.mg) {
      var rc = Math.max(0, wF.mg) * 18;
      ctx.fillStyle = '#3a414d'; ctx.fillRect(-76, -110, 22, 8); ctx.fillStyle = '#59616c'; ctx.fillRect(-68, -118, 8, 10);
      ctx.save(); ctx.translate(-64, -118); ctx.rotate(ob.aim); ctx.fillStyle = '#2a2f3a'; ctx.fillRect(-rc, -4, 38, 8); ctx.fillStyle = '#59616c'; ctx.fillRect(-rc + 28, -5, 12, 10); ctx.fillStyle = '#1a1d24'; ctx.fillRect(-rc - 6, -2, 8, 4);
      if (wF.mg > 0.06) { ctx.fillStyle = '#fff3a0'; ctx.beginPath(); ctx.moveTo(40 - rc, 0); ctx.lineTo(60 - rc, -8); ctx.lineTo(54 - rc, 0); ctx.lineTo(60 - rc, 8); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
    if (cfg.rk) {
      ctx.fillStyle = '#4a5360'; ctx.fillRect(26, -110, 46, 8); ctx.save(); ctx.translate(48, -110); ctx.rotate(0.55); ctx.scale(-1, 1);
      for (var tb = 0; tb < 2; tb++) { ctx.fillStyle = '#5b6471'; ctx.fillRect(0, -10 + tb * 10, 44, 8); ctx.fillStyle = '#d8362f'; ctx.fillRect(40, -10 + tb * 10, 5, 8); }
      ctx.restore();
      if (wF.rk > 0) { ctx.globalAlpha = Math.min(1, wF.rk * 2); ctx.fillStyle = '#e8e8ee'; ctx.beginPath(); ctx.arc(12, -118, 18 * (1 - wF.rk), 0, 6.3); ctx.arc(2, -126, 12, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffb04a'; ctx.beginPath(); ctx.arc(20, -112, 10 * wF.rk * 2, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1; }
    }
    if (cfg.tr) {
      var rt = Math.max(0, wF.tr) * 10;
      ctx.fillStyle = '#4a5360'; ctx.beginPath(); ctx.arc(-6, -106, 15, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#2f3641'; ctx.fillRect(-22, -108, 32, 5);
      ctx.save(); ctx.translate(-6, -112); ctx.rotate(ob.aim); ctx.fillStyle = '#7d8796'; ctx.fillRect(-rt, -3, 30, 6); ctx.fillStyle = '#c9ced6'; ctx.fillRect(-rt + 24, -4, 8, 8);
      if (wF.tr > 0.05) { ctx.fillStyle = '#9fe3ff'; ctx.beginPath(); ctx.arc(34 - rt, 0, 9, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(34 - rt, 0, 4, 0, 6.3); ctx.fill(); }
      ctx.restore();
    }
    if (!cfg.own) { ctx.restore(); return; }
    // подписи
    if (ob.on || trunkN() > 0) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; bt2('Багажник ' + trunkN() + '/' + trunkCap(), 0, -142); }
    if (ob.on && boss.on && save.wrk) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = wT.rk > 0 ? '#ff9a9a' : '#9dffb8'; bt2(wT.rk > 0 ? 'Ракета ' + wT.rk.toFixed(1) + ' с' : 'Ракета готова', 0, -174); }
    if (ob.call) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#9fe3ff'; bt2('Автопилот', 0, -158); }
    if (ob.on) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = save.fuel < fuelCap() * 0.2 ? '#ff9a9a' : '#ffe08a'; bt2('Бак ' + Math.ceil(save.fuel) + '/' + fuelCap() + ' л' + (ab ? ' · броня −' + Math.round(armorCut() * 100) + '%' : ''), 0, -158); }
    ctx.restore();
  }

function bossLive() { return boss.on && boss.st !== 'intro' && boss.st !== 'dying' && boss.hp > 0; }

function busShot(k, dm, v) { shots.push({ x: ob.x, y: gY - 112, k: k, r: 0, c: false, a: 0, age: 0, v: v, dm: dm, uid: ++shotUid, used: false }); }

function turretVsSquirrels() {
    if (!save.wtr || wT.tr > 0 || loc.i !== ob.loc) return;
    var best = null, bd = 760;
    for (var i = 0; i < squirrels.length; i++) { var s = squirrels[i]; if (s.state === 'scared' || s.hit) continue; var d = Math.abs(s.x - ob.x); if (d < bd) { bd = d; best = s; } }
    if (!best) return;
    wT.tr = W_TR.cd[save.wtr]; wF.tr = 0.14; best.hit = true; sfx('jump');
    fx.push({ k: 'r', x: best.x, y: gY - 40, r: 36, age: 0, life: 0.3, c: '#ffd23f' });
    if (best.state === 'carry') { bottles.push({ x: best.x, off: 0, ph: Math.random() * 6.28, r: best.r | 0 }); popup(best.x, SQ_H + 16, 'Отобрала турель!', '#9dffb8'); }
    else if (best.tgt) best.tgt.claimed = false;
    best.state = 'scared'; best.dir = ob.x < best.x ? 1 : -1;
  }

function fireRocket() {
    if (!save.wrk || !bossLive()) return;
    if (wT.rk > 0) { sfx('no'); popup(ob.x, PLAYER_H + 24, 'Перезарядка ' + wT.rk.toFixed(1) + ' с', '#ff9a9a'); return; }
    wT.rk = W_RK.cd[save.wrk]; wF.rk = 0.6; busShot('rkt', W_RK.dmg[save.wrk], 420); sfx('rare');
  }

function updateBusWeapons(dt) {
    if (wT.mg > 0) wT.mg -= dt;
    if (wT.rk > 0) wT.rk -= dt;
    if (wT.tr > 0) wT.tr -= dt;
    if (wF.mg > 0) wF.mg -= dt; if (wF.rk > 0) wF.rk -= dt; if (wF.tr > 0) wF.tr -= dt;
    if (!save.ownBus) return;
    if (!bossLive()) { turretVsSquirrels(); return; }
    if (ob.on && save.wmg && wT.mg <= 0) { wT.mg = 1 / W_MG.rate[save.wmg]; wF.mg = 0.1; busShot('mg', W_MG.dmg[save.wmg], 900); }
    if (save.wtr && wT.tr <= 0 && Math.abs(boss.x - ob.x) < 1100) { wT.tr = W_TR.cd[save.wtr]; wF.tr = 0.14; busShot('mg', W_TR.dmg[save.wtr], 800); }
  }

function achSave() { try { localStorage.setItem(ACH_KEY, JSON.stringify({ o: achOwn, c: achCount })); } catch (e) {} }

function achHas(id) { return !!achOwn[id]; }

function achRender() {
    var box = document.getElementById('achList'), sum = document.getElementById('achSum');
    if (!box) return;
    var got = 0; box.textContent = '';
    ACH.forEach(function (a) {
      var ok = !!achOwn[a.id]; if (ok) got++;
      var row = document.createElement('div'); row.className = 'ach' + (ok ? ' ok' : '');
      var ic = document.createElement('span'); ic.className = 'aic'; ic.textContent = ok ? '🏆' : '🔒';
      var tx = document.createElement('span'); tx.className = 'atx';
      var nm = document.createElement('b'); nm.textContent = a.n;
      var ds = document.createElement('span'); ds.textContent = a.d;
      tx.appendChild(nm); tx.appendChild(document.createElement('br')); tx.appendChild(ds);
      row.appendChild(ic); row.appendChild(tx); box.appendChild(row);
    });
    if (sum) sum.textContent = '🏆 Ачивки: ' + got + ' из ' + ACH.length;
  }

function ach(id) {
    if (achOwn[id]) return;
    var a = null; for (var i = 0; i < ACH.length; i++) if (ACH[i].id === id) a = ACH[i];
    if (!a) return;
    achOwn[id] = Date.now(); achSave(); achRender();
    try { toast('🏆 Достижение: ' + a.n + '. ' + a.d, 4500); sfx('rare'); } catch (e) {}
    if (typeof buildAcc === 'function') buildAcc();
  }

function botSum() { var n = 0; for (var i = 0; i < 6; i++) n += save.inv.d[i] + save.inv.c[i]; return n; }

function achTick() {
    try {
      var b = botSum();
      if (achPrevBot >= 0 && b > achPrevBot && b - achPrevBot <= 6) { achCount += b - achPrevBot; achSave(); }
      achPrevBot = b;
      if (achCount >= 1 || b > 0) ach('first');
      if (achCount >= 100) ach('b100');
      if (achCount >= 500) ach('b500');
      if (cleanN() > 0) ach('wash');
      if (seenRar[2] || seenRar[3] || seenRar[4] || seenRar[5]) ach('rare');
      if (seenRar[3] || seenRar[4] || seenRar[5]) ach('epic');
      if (seenRar[4] || seenRar[5]) ach('legend');
      if (seenRar[5] || save.inv.d[5] + save.inv.c[5] + save.trk.d[5] + save.trk.c[5] > 0) ach('myth');
      if (save.coins >= 5000) ach('rich');
      if (save.coins >= 1e3) ach('m1k'); if (save.coins >= 1e4) ach('m10k'); if (save.coins >= 1e5) ach('m100k'); if (save.coins >= 1e6) ach('m1m'); if (save.coins >= 1e7) ach('m10m'); if (save.coins >= 1e8) ach('m100m');
      if (save.ownBus) ach('bus');
      if (save.phone) ach('phone');
      if (save.dataUnl) ach('unl');
      if (save.army >= MAX_ARMY) ach('army5');
      if (hp < maxHp()) ach('wool');
      if (loc.i === 0 && !inCity()) ach('forest');
      if (save.wins > 0) ach('boss');
      if (socket && net.room && net.room.members.length >= 2) ach('lobby');
      if (ride && ride.id) ach('pass');
    } catch (e) {}
  }

function skinImg(i) {
    i = i | 0;
    var sk = SKINS[i] || SKINS[0];
    if (!sk.c || !ready(img.rooster)) return img.rooster;
    if (skinCache[i]) return skinCache[i];
    var c = document.createElement('canvas'); c.width = img.rooster.naturalWidth; c.height = img.rooster.naturalHeight;
    var g = c.getContext('2d'); g.drawImage(img.rooster, 0, 0);
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(' + sk.c + ',' + sk.a + ')'; g.fillRect(0, 0, c.width, c.height);
    skinCache[i] = c;
    return c;
  }

function skinColor(i) { var sk = SKINS[i | 0] || SKINS[0]; return sk.c ? 'rgb(' + sk.c + ')' : '#c8323c'; }

function buildSkins() {
    var boxes = document.querySelectorAll('.skins');
    for (var q = 0; q < boxes.length; q++) {
      var box = boxes[q]; box.textContent = '';
      SKINS.forEach(function (sk, i) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'sk'; b.title = sk.n;
        b.setAttribute('aria-label', 'Скин: ' + sk.n); b.setAttribute('aria-pressed', i === mySkin ? 'true' : 'false');
        b.style.background = sk.c ? 'rgb(' + sk.c + ')' : 'linear-gradient(135deg,#222 50%,#eee 50%)';
        b.addEventListener('click', function () {
          mySkin = i; try { localStorage.setItem('chekushka-skin', String(i)); } catch (e) {}
          buildSkins(); netProfile();
        });
        box.appendChild(b);
      });
    }
  }

function accOk(s, i) { var a = ACC[s][i]; return !!a && (!a.a || achHas(a.a)); }

function drawAcc(g, a, w, h) {
    if (!a || (!a[0] && !a[1] && !a[2])) return;
    function X(nx) { return -w / 2 + nx * w; }
    function Y(ny) { return -h + ny * h; }
    g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
    var ex = 0.53, ey = 0.19, hx = 0.56, hy = 0.095, u = w;
    // шея
    if (a[2] === 1) { // бабочка
      g.fillStyle = '#c8323c'; g.strokeStyle = '#14233f'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(X(0.55), Y(0.335)); g.lineTo(X(0.43), Y(0.305)); g.lineTo(X(0.43), Y(0.365)); g.closePath(); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(0.55), Y(0.335)); g.lineTo(X(0.67), Y(0.305)); g.lineTo(X(0.67), Y(0.365)); g.closePath(); g.fill(); g.stroke();
      g.beginPath(); g.arc(X(0.55), Y(0.335), u * 0.025, 0, 6.3); g.fillStyle = '#8f1d26'; g.fill(); g.stroke();
    } else if (a[2] === 2) { // шарф
      g.fillStyle = '#3b7be0'; g.strokeStyle = '#14233f'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(X(0.36), Y(0.305)); g.quadraticCurveTo(X(0.58), Y(0.36), X(0.8), Y(0.3)); g.lineTo(X(0.8), Y(0.345)); g.quadraticCurveTo(X(0.58), Y(0.41), X(0.36), Y(0.35)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#f0f4ff'; for (var si = 0; si < 4; si++) g.fillRect(X(0.44 + si * 0.09), Y(0.33 + (si === 1 || si === 2 ? 0.015 : 0)), u * 0.035, h * 0.035);
      g.fillStyle = '#3b7be0'; g.beginPath(); g.moveTo(X(0.6), Y(0.37)); g.lineTo(X(0.72), Y(0.37)); g.lineTo(X(0.7), Y(0.5)); g.lineTo(X(0.6), Y(0.49)); g.closePath(); g.fill(); g.stroke();
    } else if (a[2] === 3) { // золотая цепь
      g.strokeStyle = '#ffcf33'; g.lineWidth = 3.2;
      g.beginPath(); g.moveTo(X(0.4), Y(0.31)); g.quadraticCurveTo(X(0.55), Y(0.5), X(0.78), Y(0.31)); g.stroke();
      g.fillStyle = '#ffcf33'; g.strokeStyle = '#8a6a00'; g.lineWidth = 1.5;
      g.beginPath(); g.arc(X(0.58), Y(0.43), u * 0.05, 0, 6.3); g.fill(); g.stroke();
      g.fillStyle = '#c8323c'; g.beginPath(); g.arc(X(0.58), Y(0.43), u * 0.02, 0, 6.3); g.fill();
    }
    if (a[2] === 4) { // кулон-коин
      g.strokeStyle = '#d9a900'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(X(0.4), Y(0.31)); g.quadraticCurveTo(X(0.55), Y(0.46), X(0.78), Y(0.31)); g.stroke();
      g.fillStyle = '#ffd23f'; g.strokeStyle = '#8a6a00'; g.lineWidth = 1.6; g.beginPath(); g.arc(X(0.585), Y(0.42), u * 0.055, 0, 6.3); g.fill(); g.stroke();
      g.fillStyle = '#8a6a00'; g.font = '700 ' + Math.round(u * 0.07) + 'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('C', X(0.585), Y(0.42));
    } else if (a[2] === 5) { // платиновая цепь с бриллиантом
      g.strokeStyle = '#dfe6f0'; g.lineWidth = 4.2; g.beginPath(); g.moveTo(X(0.4), Y(0.31)); g.quadraticCurveTo(X(0.55), Y(0.52), X(0.78), Y(0.31)); g.stroke();
      g.strokeStyle = '#8f9bb0'; g.lineWidth = 1.2; g.stroke();
      g.fillStyle = '#9fe3ff'; g.strokeStyle = '#41627a'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(X(0.585), Y(0.385)); g.lineTo(X(0.625), Y(0.43)); g.lineTo(X(0.585), Y(0.49)); g.lineTo(X(0.545), Y(0.43)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.arc(X(0.57), Y(0.425), u * 0.009, 0, 6.3); g.fill();
    }
    if (a[2] === 6) { // бургер-кулон
      g.strokeStyle = '#8a4a1e'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(X(0.4), Y(0.31)); g.quadraticCurveTo(X(0.55), Y(0.46), X(0.78), Y(0.31)); g.stroke();
      g.strokeStyle = '#5a2d14'; g.lineWidth = 1.2;
      g.fillStyle = '#d98a2b'; g.beginPath(); g.ellipse(X(0.585), Y(0.405), u * 0.05, u * 0.03, 0, Math.PI, 0); g.fill(); g.stroke();
      g.fillStyle = '#4fae3b'; g.fillRect(X(0.585) - u * 0.052, Y(0.405), u * 0.104, u * 0.012);
      g.fillStyle = '#5a2d14'; g.fillRect(X(0.585) - u * 0.05, Y(0.405) + u * 0.012, u * 0.1, u * 0.018);
      g.fillStyle = '#c4833a'; g.beginPath(); g.ellipse(X(0.585), Y(0.405) + u * 0.036, u * 0.05, u * 0.014, 0, 0, Math.PI); g.fill(); g.stroke();
    }
    // очки
    if (a[1] === 4) { // очки-монеты
      g.strokeStyle = '#8a6a00'; g.lineWidth = 2.4; g.fillStyle = '#ffd23f';
      g.beginPath(); g.arc(X(ex), Y(ey), u * 0.078, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(ex - 0.078), Y(ey)); g.lineTo(X(ex - 0.15), Y(ey + 0.005)); g.moveTo(X(ex + 0.078), Y(ey - 0.005)); g.lineTo(X(ex + 0.29), Y(ey - 0.02)); g.stroke();
      g.fillStyle = '#8a6a00'; g.font = '700 ' + Math.round(u * 0.1) + 'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('C', X(ex), Y(ey));
    }
    if (a[1] === 1) { // круглые
      g.strokeStyle = '#2a2a33'; g.lineWidth = 2.6; g.fillStyle = 'rgba(190,230,255,.45)';
      g.beginPath(); g.arc(X(ex), Y(ey), u * 0.082, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(ex - 0.082), Y(ey)); g.lineTo(X(ex - 0.15), Y(ey + 0.005)); g.moveTo(X(ex + 0.082), Y(ey - 0.005)); g.lineTo(X(ex + 0.29), Y(ey - 0.02)); g.stroke();
    } else if (a[1] === 2) { // тёмные
      g.fillStyle = '#101018'; g.strokeStyle = '#000'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(X(ex - 0.11), Y(ey - 0.04)); g.lineTo(X(ex + 0.1), Y(ey - 0.045)); g.lineTo(X(ex + 0.09), Y(ey + 0.04)); g.quadraticCurveTo(X(ex), Y(ey + 0.075), X(ex - 0.1), Y(ey + 0.035)); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = '#101018'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(X(ex + 0.1), Y(ey - 0.03)); g.lineTo(X(ex + 0.29), Y(ey - 0.02)); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(X(ex - 0.07), Y(ey - 0.02)); g.lineTo(X(ex - 0.02), Y(ey - 0.025)); g.stroke();
    } else if (a[1] === 3) { // монокль
      g.strokeStyle = '#d9a900'; g.lineWidth = 2.6; g.fillStyle = 'rgba(200,235,255,.4)';
      g.beginPath(); g.arc(X(ex), Y(ey), u * 0.07, 0, 6.3); g.fill(); g.stroke();
      g.lineWidth = 1.4; g.beginPath(); g.moveTo(X(ex - 0.03), Y(ey + 0.07)); g.quadraticCurveTo(X(ex - 0.08), Y(ey + 0.2), X(ex - 0.02), Y(0.37)); g.stroke();
    }
    // шапка
    var hat = a[0];
    g.strokeStyle = '#14233f'; g.lineWidth = 1.8;
    if (hat === 1) { // ковбойская
      g.fillStyle = '#9a6a35';
      g.beginPath(); g.ellipse(X(hx), Y(hy + 0.012), u * 0.31, h * 0.026, -0.05, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(hx - 0.14), Y(hy + 0.008)); g.quadraticCurveTo(X(hx - 0.16), Y(hy - 0.11), X(hx - 0.05), Y(hy - 0.1));
      g.quadraticCurveTo(X(hx), Y(hy - 0.075), X(hx + 0.05), Y(hy - 0.1)); g.quadraticCurveTo(X(hx + 0.16), Y(hy - 0.11), X(hx + 0.14), Y(hy + 0.008)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#5a3a18'; g.fillRect(X(hx - 0.145), Y(hy - 0.025), u * 0.29, h * 0.02);
    } else if (hat === 2) { // кепка
      g.fillStyle = '#2f6fdb';
      g.beginPath(); g.ellipse(X(hx), Y(hy + 0.012), u * 0.22, h * 0.07, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#1d4fa3'; g.beginPath(); g.ellipse(X(hx - 0.2), Y(hy + 0.018), u * 0.15, h * 0.014, 0.05, 0, 6.3); g.fill(); g.stroke();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(X(hx), Y(hy - 0.025), u * 0.02, 0, 6.3); g.fill();
    } else if (hat === 3) { // цилиндр
      g.fillStyle = '#1b1b22';
      g.beginPath(); g.ellipse(X(hx), Y(hy + 0.012), u * 0.25, h * 0.022, 0, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(hx - 0.13), Y(hy + 0.008)); g.lineTo(X(hx - 0.12), Y(hy - 0.17)); g.lineTo(X(hx + 0.12), Y(hy - 0.17)); g.lineTo(X(hx + 0.13), Y(hy + 0.008)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#c8323c'; g.fillRect(X(hx - 0.128), Y(hy - 0.04), u * 0.256, h * 0.028);
    } else if (hat === 4) { // корона
      g.fillStyle = '#ffcf33'; g.strokeStyle = '#8a6a00';
      g.beginPath(); g.moveTo(X(hx - 0.15), Y(hy + 0.012)); g.lineTo(X(hx - 0.16), Y(hy - 0.1)); g.lineTo(X(hx - 0.08), Y(hy - 0.05)); g.lineTo(X(hx), Y(hy - 0.12));
      g.lineTo(X(hx + 0.08), Y(hy - 0.05)); g.lineTo(X(hx + 0.16), Y(hy - 0.1)); g.lineTo(X(hx + 0.15), Y(hy + 0.012)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#c8323c'; g.beginPath(); g.arc(X(hx), Y(hy - 0.02), u * 0.022, 0, 6.3); g.fill();
    } else if (hat === 5) { // праздничный колпак
      g.fillStyle = '#e04aa8';
      g.beginPath(); g.moveTo(X(hx - 0.1), Y(hy + 0.01)); g.lineTo(X(hx + 0.02), Y(hy - 0.2)); g.lineTo(X(hx + 0.12), Y(hy + 0.01)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#ffe14a'; for (var pi = 0; pi < 3; pi++) { g.beginPath(); g.arc(X(hx - 0.02 + pi * 0.04), Y(hy - 0.03 - (pi % 2) * 0.06), u * 0.014, 0, 6.3); g.fill(); }
      g.fillStyle = '#fff'; g.beginPath(); g.arc(X(hx + 0.02), Y(hy - 0.2), u * 0.03, 0, 6.3); g.fill(); g.stroke();
    } else if (hat === 6) { // котелок
      g.fillStyle = '#2a2a32';
      g.beginPath(); g.ellipse(X(hx), Y(hy + 0.012), u * 0.24, h * 0.02, 0, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(hx - 0.14), Y(hy + 0.008)); g.quadraticCurveTo(X(hx - 0.15), Y(hy - 0.13), X(hx), Y(hy - 0.13)); g.quadraticCurveTo(X(hx + 0.15), Y(hy - 0.13), X(hx + 0.14), Y(hy + 0.008)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#c8323c'; g.fillRect(X(hx - 0.14), Y(hy - 0.03), u * 0.28, h * 0.02);
    } else if (hat === 7) { // золотой цилиндр
      g.fillStyle = '#ffcf33'; g.strokeStyle = '#8a6a00';
      g.beginPath(); g.ellipse(X(hx), Y(hy + 0.012), u * 0.25, h * 0.022, 0, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(X(hx - 0.13), Y(hy + 0.008)); g.lineTo(X(hx - 0.12), Y(hy - 0.17)); g.lineTo(X(hx + 0.12), Y(hy - 0.17)); g.lineTo(X(hx + 0.13), Y(hy + 0.008)); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#1b1b22'; g.fillRect(X(hx - 0.128), Y(hy - 0.04), u * 0.256, h * 0.028);
      g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(X(hx - 0.09), Y(hy - 0.15), u * 0.03, h * 0.09);
    } else if (hat === 8) { // нимб
      g.strokeStyle = '#ffe680'; g.lineWidth = 4; g.beginPath(); g.ellipse(X(hx), Y(hy - 0.06), u * 0.15, h * 0.026, 0, 0, 6.3); g.stroke();
      g.strokeStyle = 'rgba(255,240,170,.45)'; g.lineWidth = 8; g.stroke();
    }
    g.restore();
  }

function accSet(s, i) {
    if (!accOk(s, i)) { toast('Это откроется за ачивку.', 2000); return; }
    myAcc[s] = i; try { localStorage.setItem('chekushka-acc', myAcc.join(',')); } catch (e) {}
    buildAcc(); if (typeof netProfile === 'function') netProfile();
  }

function buildAcc() {
    var boxes = document.querySelectorAll('.accs');
    for (var q = 0; q < boxes.length; q++) {
      var box = boxes[q]; box.textContent = '';
      for (var s = 0; s < 3; s++) {
        (function (s) {
          var row = document.createElement('div'); row.className = 'accrow';
          var t = document.createElement('span'); t.className = 'acct'; t.textContent = ACC_TITLES[s]; row.appendChild(t);
          ACC[s].forEach(function (a, i) {
            var ok = accOk(s, i), b = document.createElement('button'); b.type = 'button'; b.className = 'ac';
            b.textContent = ok ? a.n : '🔒 ' + a.n; b.disabled = false;
            if (!ok) b.title = 'Откроется за ачивку';
            b.setAttribute('aria-pressed', myAcc[s] === i ? 'true' : 'false');
            b.addEventListener('click', function () { accSet(s, i); });
            row.appendChild(b);
          });
          box.appendChild(row);
        })(s);
      }
    }
  }

function nearOtherBus() {
    if (!socket || !net.room || ob.on || bus.on) return '';
    for (var k in net.others) { var o = net.others[k]; if (loc.i === (o.bl | 0) && o.own && Math.abs(P.x - o.rbx) < 120 && P.z < 60) return k; }
    return '';
  }

function rideStart(id) {
    var o = net.others[id]; if (!o) return;
    ride.id = id; P.vx = 0; sfx('jump');
    toast('Ты в автобусе игрока ' + mat(o.n || 'Петух') + '. Выйти: кнопка «Выйти» или E.', 3500);
  }

function rideStop() {
    if (!ride.id) return;
    var o = net.others[ride.id];
    if (o) P.x = Math.max(40, Math.min(WORLD_W - 40, o.rbx - (o.bd || 1) * 125));
    ride.id = ''; P.vx = 0; P.z = 0;
  }

function passengersOf(id) { var n = 0; for (var k in net.others) if (net.others[k].rd === id) n++; if (ride.id === id) n++; return n; }

function netNick() {
    var n = '';
    try { n = localStorage.getItem('chekushka-nick') || ''; } catch (e) {}
    if (!n) { n = 'Петух' + (100 + Math.floor(Math.random() * 900)); try { localStorage.setItem('chekushka-nick', n); } catch (e2) {} }
    return n;
  }

function netUid() {
    var u = '';
    try { u = localStorage.getItem('chekushka-uid') || ''; } catch (e) {}
    if (!u) { u = Math.random().toString(36).slice(2) + Date.now().toString(36); try { localStorage.setItem('chekushka-uid', u); } catch (e2) {} }
    return u;
  }

function netProfile() { if (socket && net.state === 'online') socket.emit('join', { n: netNick(), s: mySkin, a: myAcc, fm: muscleForm() ? 1 : 0, u: netUid() }); }

function netUi() {
    var cm = document.getElementById('chatMini');
    if (cm && (!!net.room) === cm.hidden) cm.hidden = !net.room;
    if (net.state === 'none') { if (!elNetMini.hidden) elNetMini.hidden = true; return; }
    var txt;
    if (net.room) txt = 'лобби ' + net.room.code + ': ' + net.room.members.length + '/' + (net.room.max || MAX_ROOM);
    else txt = net.state === 'online' ? 'онлайн' : (net.state === 'connecting' ? 'подключение…' : (net.state === 'full' ? 'сервер полон' : 'офлайн'));
    if (txt === lastNetUi) return;
    lastNetUi = txt; elNetMini.hidden = false; elNetTxt.textContent = txt;
  }

function chatPush(m) {
    net.log.push(m); if (net.log.length > 60) net.log.shift();
    net.say[m.id] = { t: mat(m.t), left: 6 };
    var d = document.createElement('div'); d.textContent = mat(m.n) + ': ' + mat(m.t); elFeed.appendChild(d);
    while (elFeed.children.length > 4) elFeed.removeChild(elFeed.firstChild);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 8000);
    renderChat();
  }

function pingSend() {
    if (!socket || net.state !== 'online' || PING.wait || lobbyOpen) return;
    PING.wait = true; PING.t0 = performance.now();
    socket.emit('lobbies');
    clearTimeout(PING.to); PING.to = setTimeout(function () { if (PING.wait) { PING.wait = false; PING.ms = -2; } }, 6000);
  }

function pingGot() {
    PING.wait = false; clearTimeout(PING.to);
    var ms = Math.max(1, Math.round(performance.now() - PING.t0)), sum = 0, i;
    PING.hist.push(ms); if (PING.hist.length > 5) PING.hist.shift();
    for (i = 0; i < PING.hist.length; i++) sum += PING.hist[i];
    PING.ms = Math.round(sum / PING.hist.length);
  }

function netUpdate(dt) {
    netUi(); if (typeof rcTick === 'function') rcTick();
    if (!socket) return;
    var k, o;
    if (ride.id) {
      o = net.others[ride.id];
      if (!o || !o.own || loc.i !== (o.bl | 0)) rideStop();
      else { P.x += (o.rbx - P.x) * Math.min(1, dt * 20); P.z = 0; P.vz = 0; }
    }
    if (bossOut > 0) {
      bossT += dt;
      if (bossT > 0.15 && net.room && net.state === 'online') { socket.emit('boss', { dmg: Math.round(bossOut) }); bossOut = 0; bossT = 0; }
      else if (!net.room) bossOut = 0;
    }
    for (k in net.others) { o = net.others[k]; var tgx = o.x + (o.vx || 0) * Math.min(0.12, performance.now() / 1000 - (o.t || 0)); if (Math.abs(tgx - o.rx) > 500) o.rx = tgx; o.rx += (tgx - o.rx) * Math.min(1, dt * 14); o.rbx += (o.bx - o.rbx) * Math.min(1, dt * 10); if (o.rz !== undefined) o.rz += (o.dz - o.rz) * Math.min(1, dt * 8); }
    for (k in net.say) { net.say[k].left -= dt; if (net.say[k].left <= 0) delete net.say[k]; }
    if (net.state !== 'online' || !net.room) return;
    net.sendT += dt;
    if (net.sendT < 0.05) return;
    net.sendT = 0;
    socket.volatile.emit('state', { x: Math.round(P.x), z: Math.round(P.z), f: P.face > 0 ? 1 : -1, b: ob.on ? 1 : 0, own: save.ownBus ? 1 : 0, ox: Math.round(ob.x), od: ob.dir > 0 ? 1 : -1, rd: ride.id, l: loc.i, ti: trip.inn ? 1 : 0, sv: subActive() ? 1 : 0, dz: subActive() ? Math.round(sub.d) : 0, bk: busPack(), bl: ob.loc | 0, rc: rcIn() ? 1 : 0, av: av.on ? (save.avSel | 0) : 0, ah: av.on ? Math.round(av.h) : 0, fg: (ep.on || p5.on) ? 1 : 0, dw: dn.on ? 1 : 0, gh: gh.on ? 1 : 0, gx: Math.round(gh.x), cb: (av.on && cab.on && !cab.pax) ? 1 : 0, px: pax.on ? String(pax.id) : '', cs: cab.on ? cab.seat : -1, cx: cab.on ? Math.round(cab.x) : 0, cf: cab.face > 0 ? 1 : -1, ci: (pax.on && cab.on && cab.seat === 100) ? ((input.left ? 1 : 0) | (input.right ? 2 : 0) | (input.up ? 4 : 0) | (input.dn ? 8 : 0)) : 0, rr: pax.on ? cab.rq : 2, rp: (av.on && av.ramp) ? 1 : 0, avs: av.on ? Math.round(Math.abs(av.v)) : 0, afu: (av.on && avT()) ? Math.max(0, Math.min(100, Math.round(save.avFuel / avT().cap * 100))) : 0 });
  }

function busPack() {
    if (!save.ownBus) return 0;
    var c = function (v, m) { return Math.max(0, Math.min(m, v | 0)); };
    return c(save.abus, 9) * 100000 + c(save.rbus, 9) * 10000 + c(save.cbus, 9) * 1000 + c(save.wmg, 9) * 100 + c(save.wrk, 9) * 10 + c(save.wtr, 9);
  }

function drawBusNet(o) {
    var b = o.bk | 0;
    if (!o.bst) { o.bst = {}; o.bf = { mg: 0, rk: 0, tr: 0 }; }
    drawBusModel(o.rbx, o.bd, o.s, { own: false, ab: Math.floor(b / 100000) % 10, rb: Math.floor(b / 10000) % 10, cb: Math.floor(b / 1000) % 10, mg: Math.floor(b / 100) % 10, rk: Math.floor(b / 10) % 10, tr: b % 10, on: !!o.b, call: false, v: o.b ? 160 : 0, acc: 0, f: o.bf, st: o.bst });
  }

function drawPass(x, n, id) {
    // пассажиры: кружки с цветом скина в окнах автобуса и подпись «+N»
    if (n <= 0) return;
    var list = [];
    for (var k in net.others) if (net.others[k].rd === id) list.push(net.others[k].s | 0);
    if (ride.id === id) list.push(mySkin);
    ctx.save();
    for (var i = 0; i < Math.min(5, list.length); i++) {
      ctx.fillStyle = skinColor(list[i]); ctx.strokeStyle = '#14233f'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x - 88 + i * 44 + 17, gY - 70, 11, 0, 6.3); ctx.fill(); ctx.stroke();
    }
    ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.fillStyle = '#fff';
    ctx.strokeText('\uD83D\uDC65 ' + n, x, gY - 106); ctx.fillText('\uD83D\uDC65 ' + n, x, gY - 106);
    ctx.restore();
  }

function bubble(text, x, y) {
    ctx.font = '700 14px "Rubik", system-ui, sans-serif';
    var s = text.length > 28 ? text.slice(0, 27) + '…' : text;
    var w = Math.min(240, ctx.measureText(s).width + 18);
    ctx.fillStyle = 'rgba(255,255,255,.95)'; rrect(x - w / 2, y - 14, w, 26, 10); ctx.fill();
    ctx.fillStyle = '#14233f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y - 1);
  }

function drawNetPlayers() {
    if (!socket || !net.room || cs.on) return;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    if (gh.on && (ep.on || p5.on)) drawCorpseAt(gh.x, P.face, mySkin, myAcc, 'ты');
    if (gh.on && (ep.on || p5.on)) drawGhostAt(P.x, P.face, 0.9, P.z);
    for (var k in net.others) {
      var o = net.others[k];
      if ((o.l | 0) !== loc.i) continue;
      if (o.gh && o.fg && o.gx > camX - 120 && o.gx < camX + vw + 120) drawCorpseAt(o.gx, o.f, o.s, o.a, o.n);
      if (loc.i === (o.bl | 0) && o.own && o.rbx > camX - 140 && o.rbx < camX + vw + 140) { drawBusNet(o); drawPass(o.rbx, passengersOf(k), k); }
      if (o.ti || o.px) continue;
      if (o.av && o.rx > camX - 400 && o.rx < camX + vw + 400) drawAvCraftAt(o.av, o.rx, o.ah, o.f > 0 ? 1 : -1, true, 0.6);
      if (loc.i === 5 && !o.av && o.rx > camX - 140 && o.rx < camX + vw + 140) { if (o.sv) drawSubAt(o.rx, gY + (o.rz || 0), o.f, true, 0); else drawBoatAt(o.rx, o.f, 0, true); }
      var x = o.b ? o.rbx : o.rx;
      if (x < camX - 90 || x > camX + vw + 90) continue;
      if (o.gh && o.fg && ready(img.ghost)) { drawGhostAt(x, o.f, 0.8, o.z); ctx.fillStyle = '#bfe9ff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillText('👻 ' + (o.n || ''), x, gY - PLAYER_H * 1.35 - 24); continue; }
      if (p6.on && (o.l | 0) === 11) { var og3 = gY; gY = og3 - o.z; sciDraw(x, o.f > 0 ? 1 : -1, 1.02, 0, 0); gY = og3; }
      else if (!o.b && !o.rd && !o.sv && !o.av && ready(img.rooster)) {
        var h = PLAYER_H, w = h * img.rooster.naturalWidth / img.rooster.naturalHeight;
        ctx.save(); ctx.globalAlpha = o.gh ? 0.3 : 0.85; ctx.translate(x, gY - o.z); if (o.dw) ctx.rotate(o.f > 0 ? 1.45 : -1.45); ctx.scale(o.f > 0 ? -1 : 1, 1);
        if (o.a && o.a[3] && ready(img.muscle)) { var mh3 = h * 1.18, mw3 = mh3 * img.muscle.naturalWidth / img.muscle.naturalHeight; ctx.drawImage(img.muscle, -mw3 / 2, -mh3, mw3, mh3); }
        else { ctx.drawImage(skinImg(o.s), -w / 2, -h, w, h); drawAcc(ctx, o.a, w, h); }
        ctx.restore();
      }
      var ly = o.sv ? gY + (o.rz || 0) - 90 : (o.av ? gY - o.ah - 130 : gY - (o.b ? 118 : PLAYER_H + 12 + o.z)), nm = (o.dw ? '🆘 ' : '') + (net.room && net.room.host === k ? '👑 ' : '') + mat(o.n || 'Петух');
      ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText(nm, x, ly);
      ctx.fillStyle = '#ffffff'; ctx.fillText(nm, x, ly);
      if (net.say[k]) bubble(net.say[k].t, x, ly - 24);
    }
    if (save.ownBus && !ob.on && loc.i === ob.loc) { var pn0 = passengersOf(socket.id); if (pn0) drawPass(ob.x, pn0, socket.id); }
    if (net.room && !ride.id && !ob.on && !(bus.on && bus.hide)) {
      // свой ник над головой: корона у хоста, 
      var myNm = (net.room.host === socket.id ? '👑 ' : '') + mat(netNick()), myY = gY - P.z - PLAYER_H - 12 - (av.on ? av.h + 110 : 0);
      ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText(myNm, P.x, myY); ctx.fillStyle = '#ffe14a'; ctx.fillText(myNm, P.x, myY);
    }
    if (net.say[socket.id]) bubble(net.say[socket.id].t, P.x, gY - P.z - PLAYER_H - 36);
  }

function rcMulti() { return !!(socket && net.room && net.state === 'online' && net.room.members && net.room.members.length > 1); }

function rcIn() { return rc.st === 'wait' && loc.i === 13 && Math.abs(P.x - RC_X) < 140 && P.z < 160; }

function rcCount() { var n = rcIn() ? 1 : 0, k, o; for (k in net.others) { o = net.others[k]; if ((o.l | 0) === 13 && o.rc) n++; } return n; }

function rcLeft() { return Math.max(0, Math.ceil((rc.end - Date.now()) / 1000)); }

function rcAsk() {
    dlgShow('Меллстрой (в бинтах)', mellImg(), 'В лобби есть другие игроки. Провести обряд вместе? У всех будет 30 секунд, чтобы встать в зелёный круг внутри Больницы рядом с Палатой 1. Кто в круге, тот участвует в обряде и в катсцене.', [
      { t: 'Провести вместе (30 с)', fn: function () { dlgClose(); rcStart(); } },
      { t: 'Провести одному', fn: function () { dlgClose(); finGoSolo(); } },
      { t: 'Ещё не готов', out: true }
    ]);
  }

function rcStart() { if (!rcMulti()) { finGoSolo(); return; } socket.emit('rit', { start: 1, alt: (save.mx.mgo | 0) === 1 ? 1 : 0 }); }

function rcMsg(m) {
    if (!m) return;
    if (m.deny) { toast('Обряд вместе только что был. Подожди минуту.', 3500); return; }
    if (m.st === 'wait') {
      var fresh = rc.st !== 'wait';
      rc.st = 'wait'; rc.end = Date.now() + (m.left | 0) * 1000; rc.by = m.by || '';
      if (fresh) { sfx('rare'); toast('Обряд начался! ' + rc.by + ' зовёт всех: встань в зелёный круг в Больнице у Палаты 1. Осталось ' + (m.left | 0) + ' с.', 6000); }
    } else if (m.go) {
      var was = rc.st === 'wait'; rc.st = '';
      var ids = m.ids || [], idx = ids.indexOf(socket.id);
      if (idx < 0) { if (was) toast('Обряд начался без тебя: ты был вне круга.', 4000); return; }
      if (boss.on || kk.on || p5.on || p6.on || cs.on || fin.on) return;
      partySet(ids); crew = null; if (ids.length > 1) { crew = [{ s: mySkin, n: 'Кокич' }]; ids.forEach(function (id9) { if (id9 === socket.id) return; var o9 = net.others[id9]; crew.push({ s: o9 ? o9.s | 0 : 0, n: o9 ? mat(o9.n) : 'Кокич' }); }); }
      fin.altG = m.alt ? 1 : 0;
      dlgClose(); fin.guest = !(save.mx.sf === 2 && !save.mx.fe); fin.ox = (idx - (ids.length - 1) / 2) * 70; fin.auto = true; ltGo(11, 'left', RIT_X - 320);
    }
  }

function rcTick() {
    var show = rc.st === 'wait';
    if (show && rcLeft() <= 0 && Date.now() - rc.end > 6000) { rc.st = ''; show = false; }
    if (!show) { if (elRc.style.display !== 'none') elRc.style.display = 'none'; return; }
    var tx = '\u{1F52E} Обряд вместе: ' + rcLeft() + ' с · в круге у Палаты 1: ' + Math.min(4, rcCount()) + ' из 4' + (rcIn() ? ' (ты в круге)' : (loc.i === 13 ? ' (встань в зелёный круг)' : ' (иди в Больницу, к Палате 1)'));
    if (elRc.textContent !== tx) elRc.textContent = tx;
    if (elRc.style.display !== 'block') elRc.style.display = 'block';
  }

function rcDrawCircle() {
    if (rc.st !== 'wait' || loc.i !== 13) return;
    var pl = 0.5 + 0.5 * Math.sin(t * 3), i, a, rx, ry;
    ctx.save();
    ctx.fillStyle = 'rgba(70,230,130,' + (0.12 + 0.08 * pl).toFixed(3) + ')'; ctx.beginPath(); ctx.ellipse(RC_X, gY + 6, 150, 26, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(110,255,160,' + (0.7 + 0.3 * pl).toFixed(2) + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(RC_X, gY + 6, 150, 26, 0, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(RC_X, gY + 6, 110, 18, 0, 0, 6.3); ctx.stroke();
    for (i = 0; i < 10; i++) { a = i * 0.628 + t * 0.6; rx = RC_X + Math.cos(a) * 130; ry = gY + 6 + Math.sin(a) * 22; ctx.fillStyle = '#a8ffc8'; ctx.beginPath(); ctx.arc(rx, ry - 14 - 10 * Math.sin(t * 2 + i), 3, 0, 6.3); ctx.fill(); }
    var g = ctx.createLinearGradient(0, gY - 190, 0, gY); g.addColorStop(0, 'rgba(110,255,160,0)'); g.addColorStop(1, 'rgba(110,255,160,' + (0.22 + 0.1 * pl).toFixed(2) + ')'); ctx.fillStyle = g; ctx.fillRect(RC_X - 120, gY - 190, 240, 190);
    ctx.fillStyle = '#d6ffe0'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Круг обряда: ' + rcLeft() + ' с', RC_X, gY - 200);
    ctx.restore();
  }

function byId(id) { return document.getElementById(id); }

function showMenu() { menuOpen = true; menuOverlay.hidden = false; syncPause(); }

function startPlay() {
    menuOpen = false; lobbyOpen = false; menuOverlay.hidden = true; lobbyOverlay.hidden = true; syncPause();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

function openLobby(focusChat) {
    if (!socket) return;
    if (busLock()) { toast('В автобусе не до лобби.', 2000); return; }
    lobbyOpen = true; lobbyOverlay.hidden = false; syncPause();
    byId('lbNick').value = netNick();
    if (net.state === 'online') socket.emit('lobbies');
    renderLobby();
    if (focusChat && net.room) byId('chatInput').focus({ preventScroll: true });
  }

function closeLobby() {
    lobbyOpen = false; lobbyOverlay.hidden = true; syncPause();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

function renderChat() {
    var box = byId('chatLog'); if (!box || !net.room) return;
    box.textContent = '';
    net.log.forEach(function (m) {
      var d = document.createElement('div'), b = document.createElement('b');
      b.textContent = mat(m.n) + ': '; d.appendChild(b); d.appendChild(document.createTextNode(mat(m.t))); box.appendChild(d);
    });
    box.scrollTop = box.scrollHeight;
  }

function renderLobby() {
    if (!socket) return;
    netUi();
    var st = byId('lbStatus'), list = byId('lbList'), room = byId('lbRoom'), act = byId('lbAct'), online = net.state === 'online';
    st.textContent = online ? (net.err ? net.err : (net.room ? '' : 'Выбери лобби или создай своё: размер от 1 до ' + MAX_ROOM + ' игроков.'))
      : (net.state === 'connecting' ? 'Подключаемся к серверу. Если он спал, подожди до минуты.'
        : (net.state === 'full' ? 'На сервере сейчас нет мест.' : 'Сервер недоступен. Играй в одиночной игре, мы подключимся сами, когда он проснётся.'));
    ['btnCreate', 'btnCode', 'codeInput'].forEach(function (id) { byId(id).disabled = !online; });
    list.hidden = !!net.room; act.hidden = !!net.room; room.hidden = !net.room;
    if (!net.room) {
      list.textContent = '';
      if (online && !net.rooms.length) { var e = document.createElement('div'); e.className = 'whelp'; e.textContent = 'Лобби пока нет. Создай первое.'; list.appendChild(e); }
      net.rooms.forEach(function (r) {
        var row = document.createElement('div'); row.className = 'lrow';
        var inf = document.createElement('div'); inf.className = 'inf';
        var nm = document.createElement('div'); nm.className = 'inm'; nm.textContent = r.name;
        var sb = document.createElement('div'); sb.className = 'ics'; sb.textContent = 'хозяин: ' + r.host + ' · код ' + r.c;
        inf.appendChild(nm); inf.appendChild(sb);
        var cnt = document.createElement('span'); cnt.className = 'lcnt'; cnt.textContent = r.n + '/' + r.max;
        var b = document.createElement('button'); b.type = 'button'; b.className = 'lbtn'; b.textContent = r.n >= r.max ? 'Полно' : 'Войти'; b.disabled = r.n >= r.max;
        b.addEventListener('click', function () { net.err = ''; if (mpBlocked()) return; socket.emit('enter', { c: r.c }); });
        row.appendChild(inf); row.appendChild(cnt); row.appendChild(b); list.appendChild(row);
      });
    } else {
      byId('rmHead').textContent = '«' + net.room.name + '» · код ' + net.room.code + ' · ' + net.room.members.length + '/' + (net.room.max || MAX_ROOM);
      var mb = byId('rmMembers'); mb.textContent = '';
      net.room.members.forEach(function (m) {
        var d = document.createElement('div'); d.className = 'mem';
        var dot = document.createElement('span'); dot.className = 'dot'; var sk = SKINS[m.s | 0] || SKINS[0]; dot.style.background = sk.c ? 'rgb(' + sk.c + ')' : '#222';
        var t = document.createElement('span'); t.textContent = (m.id === net.room.host ? '👑 ' : '') + mat(m.n) + (m.id === socket.id ? ' (ты)' : '');
        d.appendChild(dot); d.appendChild(t);
        mb.appendChild(d);
      });
      renderChat();
    }
  }

function sendChat() {
    var inp = byId('chatInput'), t = inp.value.trim().slice(0, 120);
    if (!t || !net.room || net.state !== 'online') return;
    socket.emit('chat', { t: t }); inp.value = '';
  }

function isMat(core) {
    var low = core.toLowerCase().replace(/ё/g, 'е');
    var norm = low.replace(/[a-z0-9@$]/g, function (c) { return LOOK[c] || c; });
    for (var i = 0; i < MAT_RE.length; i++) if (MAT_RE[i].test(norm) || MAT_RE[i].test(low)) return true;
    return false;
  }

function mat(text) {
    text = String(text == null ? '' : text);
    if (!music.mat) return text;
    return text.replace(/\S+/g, function (tok) {
      var core = tok.replace(/[^A-Za-zА-Яа-яЁё0-9@$]/g, '');
      if (core.length < 2 || !isMat(core)) return tok;
      return tok.replace(/[A-Za-zА-Яа-яЁё0-9@$]/g, '#');
    });
  }

function qchatOpen() {
    if (!socket || !net.room || net.state !== 'online' || paused) return;
    chatTyping = true; input.left = input.right = false;
    qchatBox.hidden = false; qchatIn.value = '';
    setTimeout(function () { qchatIn.focus(); }, 0);
  }

function qchatClose() {
    chatTyping = false; qchatBox.hidden = true; qchatIn.blur();
  }

function qchatSend() {
    var t = qchatIn.value.trim().slice(0, 120);
    if (t && net.room && net.state === 'online') socket.emit('chat', { t: t });
    qchatClose();
  }

function update(dt) {
    if (iceT > 0) iceT = Math.max(0, iceT - dt); if (relCd > 0) relCd = Math.max(0, relCd - dt); bkTick(dt); colTick(dt); jlTick(dt);
    if (flt.on) { netUpdate(dt); updateFlight(dt); return; }
    if (hn.on) { netUpdate(dt); updateHn(dt); return; }
    updateRoute(dt); locEdgeUpdate(dt);
    if (bus.on) updateBus(dt);
    updateOwnBus(dt); updateAv(dt); updatePax(dt); updateCab(dt);
    updateBusWeapons(dt);
    netUpdate(dt);
    updateNpcs(dt);
    updateTrip(dt);
    updateFishing(dt);
    updateBottleLife(dt);
    var lock = busLock();
    if (lock) { if (!ob.on && !av.on) input.left = input.right = false; jumpTimer = 0; }
    if (loc.i === 5) jumpTimer = 0;
    var dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    var target = dir * spd();
    P.vx += (target - P.vx) * Math.min(1, (dir ? 14 : 11) * dt);
    if (dir) P.face = dir;
    P.x += (P.vx + P.kb) * dt; P.kb *= Math.max(0, 1 - 5 * dt);
    if (P.x < 28) { P.x = 28; P.vx = 0; }
    if (P.x > WORLD_W - 28) { P.x = WORLD_W - 28; P.vx = 0; }

    if (jumpTimer > 0) {
      jumpTimer -= dt;
      if (P.z <= 0.01) { P.vz = jumpV(); jumpTimer = 0; sfx('jump'); }
    }
    P.vz -= GRAV * dt;
    P.z += P.vz * dt;
    if (P.z <= 0) { P.z = 0; P.vz = 0; }
    if (chute.on) updateChute(dt);
    if (P.z <= 0 && Math.abs(P.vx) > 20) P.walk += dt * Math.abs(P.vx) / spd();
    else if (P.z <= 0) P.walk += 0;

    // выброшенные вещи снова становятся обычными, когда отойдёшь от них
    for (var ni = 0; ni < bottles.length; ni++) { var nb = bottles[ni]; if (nb.np && Math.abs(P.x - nb.dx) > 100) nb.np = false; }
    // сбор: сам при включённом автоподборе, иначе по кнопке (act)
    if (!lock && music.auto) collectBottles(false);
    // новые чекушки
    respawnT += dt;
    var natN = 0; for (var nj = 0; nj < bottles.length; nj++) if (!bottles[nj].dr) natN++;
    if (respawnT > locRespawnGap() && natN < locTarget()) {
      respawnT = 0;
      var x, tries = 0;
      do { x = locSpawnX(); tries++; } while (Math.abs(x - P.x) < (loc.i ? 250 : 500) && tries < 10);
      addBottle(x);
    }
    // всплывающие надписи
    for (var k = popups.length - 1; k >= 0; k--) {
      popups[k].age += dt;
      if (popups[k].age > 1.1) popups.splice(k, 1);
    }
    if (shopFlash > 0) shopFlash = Math.max(0, shopFlash - dt * 1.6);
    if (fullT > 0) fullT -= dt;
    updateAir(dt);
    updateWash(dt);
    updateWool(dt, lock); updateDown(dt);
    updateSquirrels(dt);
    updateHero(dt);
    updateBins(dt); specUi();
    updateSub(dt); updateSeaCam(dt); updateKraken(dt); updateKk(dt); updateCth(dt); updateEp(dt); updateMg(dt); skTick(dt); updateMog(dt); updateRit(dt); updateSci(dt); updateResc(dt); updateFin(dt); updateV220(dt); p5Update(dt); p6Update(dt); updateCs(dt); updateAtm(dt); updateDn();
    if (shk > 0) shk = Math.max(0, shk - dt * 2.2);
    if (iFrames > 0) iFrames -= dt;
    if (throwCd > 0) throwCd -= dt;
    if (noAmmoT > 0) noAmmoT -= dt;
    if ((boss.on || kk.on || ep.on) && !lock && (thr.key || thr.ptr || thr.btn)) throwBottle();
    if (boss.on || kk.on) autoAmmo();
    updateBoss(dt);
    updateProjectiles(dt);
    updateFx(dt);
    updatePets(dt, lock);
    updateAutoWash(dt);
    bossUi();
    updateRate(dt);
    updateData(dt); phoneUi();
    airUi(); rateUi(); evUi();

    // камера
    var followBus = lock && bus.st !== 'come' && !ob.on && !av.on && !ride.id && !trip.inn;
    var rideO = ride.id ? net.others[ride.id] : null;
    var jetCam = trip.st === 'dep' && trip.inn && loc.i === 3;
    var want = jetCam ? jetM.x - vw * 0.4 : followBus ? bus.x - vw * 0.5 : (rideO ? rideO.rbx - vw * 0.5 : P.x - vw * (P.face > 0 ? 0.4 : 0.6));
    want = Math.max(0, Math.min(WORLD_W - vw, want));
    camX += (want - camX) * Math.min(1, (jetCam ? 4 : followBus ? 12 * busMul() : (rideO ? 14 : 6)) * dt);
    if (vw >= WORLD_W) camX = 0;

    // подсказки
    var mode = '';
    if (!lock) {
      if (!music.auto && nearPick()) mode = 'pick';
      else if (inShop() && save.carried > 0) mode = 'sell';
      else if (inUp()) mode = 'up';
      else if (inWash() && (dirtyN() > 0 || wash.on)) mode = 'wash';
      else if (nearOwnBus()) mode = 'drive';
      else if (nearOtherBus()) mode = 'ride';
      else if (curStop()) mode = 'bus';
      else if (nearBin()) mode = 'search';
    }
    var tm = tripMode(); if (tm) mode = tm; else if (!mode) mode = fishMode() || npcMode();
    if (ride.id) mode = 'unride';
    if (av.on) mode = (avNearPump() && av.h <= 3) ? 'fuel' : (avHigh() ? 'avtrip' : 'exit');
    if (pax.on) mode = 'exit';
    if (ob.on) mode = boss.on ? (save.wrk ? 'rocket' : 'exit') : ((inShop() && save.carried + trunkN() > 0) ? 'sell' : (nearFuel() ? 'fuel' : 'exit'));
    if (mode !== sellMode) {
      sellMode = mode;
      bSell.hidden = !mode;
      if (mode) bSell.textContent = { up: 'Улучшения', wash: 'Мыть', bus: 'Автобус', sell: 'Сдать', search: 'Обыск', pick: 'Подобрать', drive: 'Сесть в автобус', ride: 'Сесть к другу', unride: 'Выйти', exit: 'Выйти', talk: 'Поговорить', enter: 'Войти в Белый дом', flare: 'Сигнальная ракета', trip: 'Купить билет', board: 'Сесть в самолёт', unboard: 'Выйти', home: 'Лететь домой', fuel: 'Заправить', avtrip: 'Рейс', fish: 'Рыбачить', subgo: 'Подлодка', subout: 'Причалить', fshop: 'Лавка рыбака', sail: 'В море', rocket: 'Ракета', hosp: 'В палату' }[mode] || (mode === 'spot' && nearSpot() ? nearSpot().btn : '');
    }
    if (!lock && !stopHint && curStop() && !curStop().home) {
      stopHint = true;
      toast(touch ? 'Остановка! Жми «Автобус»: выбери, куда ехать. До магазина бесплатно.' : 'Остановка! Нажми E: выбери, куда ехать. До магазина бесплатно.', 4500);
    }
    var wantDn = subActive(); if (document.body.classList.contains('insub') !== wantDn) document.body.classList.toggle('insub', wantDn); var avDn = av.on && !cab.on && save.avSel !== 2 ? true : false; if (bDn.hidden === (wantDn || avDn)) bDn.hidden = !(wantDn || avDn); if (bSonar.hidden === wantDn) bSonar.hidden = !wantDn;
    var wantMg = magicVisible(); if (bMagic.hidden === wantMg) bMagic.hidden = !wantMg; if (wantMg) { var mt = 'Магия ' + Math.floor(mgMana); if (mt !== bMagic.textContent) bMagic.textContent = mt; }
    var wantExit = boss.on && (ob.on || !!ride.id || (bus.on && bus.st !== 'leave' && !bus.cross)); if (bExit.hidden === wantExit) bExit.hidden = !wantExit;
    var wantAm = boss.on || kk.on || ep.on; if (bAmmo.hidden === wantAm) bAmmo.hidden = !wantAm;
    if (ep.on) { if (bAmmo.textContent !== 'Щит') bAmmo.textContent = 'Щит'; if (bThrow.textContent !== 'Донат-луч') bThrow.textContent = 'Донат-луч'; }
    if (boss.on) { var at = AMMO_NAMES[ammo] + ' (' + ammoCount() + ')'; if (at !== bAmmo.textContent) bAmmo.textContent = at; }
    var wantThrow = boss.on || kk.on || ep.on || p5.on, wild = (!lock && save.nuts > 0) ? nearWild() : null;
    if (bThrow.hidden === wantThrow) bThrow.hidden = !wantThrow;
    if (bFeed.hidden === !!wild) bFeed.hidden = !wild;
    if (p5.on) { if (bThrow.textContent !== 'Огонь') bThrow.textContent = 'Огонь'; }
    else if (wantThrow && !ep.on) { var tt = 'Бросить (' + (save.carried - save.wool) + ')'; if (tt !== bThrow.textContent) bThrow.textContent = tt; }
    if (wild) { var ft = 'Орех (' + save.nuts + ')'; if (ft !== bFeed.textContent) bFeed.textContent = ft; }
    var pillText = '';
    if (!lock && save.air > 0 && air.cd <= 0 && !air.plane && heroOver()) pillText = '\u26A1 Герой над тобой: вызови аирдроп!';
    for (var ci2 = 0; ci2 < air.crates.length && !pillText; ci2++) {
      var cc = air.crates[ci2];
      if (!cc.landed) continue;
      var cs = cc.x - camX;
      if (cs < 0) pillText = '\u25C0 Ящик там';
      else if (cs > vw) pillText = 'Ящик там \u25B6';
    }
    if (!pillText && loc.i === 0 && save.carried > 0 && (SHOP_X + SHOP_W) - camX < 0) pillText = '\u25C0 Магазин там';
    if (!pillText) pillText = locHint();
    if (pillText !== lastPill) {
      lastPill = pillText;
      elPill.hidden = !pillText;
      elPill.textContent = pillText;
    }
  }

function wave(x, amp1, f1, amp2, f2, ph) {
    return Math.sin(x * f1 + ph) * amp1 + Math.sin(x * f2 + ph * 2.3) * amp2;
  }

function setCam(par) {
    var k = dpr * scale;
    ctx.setTransform(k, 0, 0, k, (-camX * par + shakeX) * k, (shakeY - camY * par) * k);
  }

function drawSky() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, gScreen + 2);
    // солнце
    var sx = W * 0.8, sy = Math.max(70, gScreen * 0.2);
    var gr = ctx.createRadialGradient(sx, sy, 10, sx, sy, 150);
    gr.addColorStop(0, 'rgba(255,248,200,.95)'); gr.addColorStop(0.25, 'rgba(255,240,170,.5)'); gr.addColorStop(1, 'rgba(255,240,170,0)');
    ctx.fillStyle = gr; ctx.fillRect(sx - 160, sy - 160, 320, 320);
    ctx.fillStyle = '#fff6c2'; ctx.beginPath(); ctx.arc(sx, sy, 34, 0, 6.3); ctx.fill();
    drawNightSky();
    drawRift();
  }

function drawRift() {
    if (gScreen < 140) return;
    var cx = W * 0.27 - camX * 0.015, cy = Math.max(60, gScreen * 0.24), k = RIFT_K, pl = 0.75 + 0.25 * Math.sin(t * 1.7), i, a;
    var pts = [[0, -150], [14, -96], [-10, -52], [12, -14], [-8, 30], [10, 74], [0, 140]];
    ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
    var g = ctx.createRadialGradient(0, 0, 4, 0, 0, 230); g.addColorStop(0, 'rgba(190,120,255,' + (0.5 * pl).toFixed(2) + ')'); g.addColorStop(1, 'rgba(190,120,255,0)'); ctx.fillStyle = g; ctx.fillRect(-240, -240, 480, 480);
    ctx.beginPath(); ctx.moveTo(0, -150);
    for (i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] + 22, pts[i][1]);
    for (i = pts.length - 1; i >= 0; i--) ctx.lineTo(pts[i][0] - 22 * (i === 0 || i === pts.length - 1 ? 0 : 1), pts[i][1]);
    ctx.closePath(); ctx.fillStyle = '#0a0414'; ctx.fill();
    ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(220,170,255,' + (0.8 * pl).toFixed(2) + ')'; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.8)'; for (i = 0; i < 5; i++) { a = (i * 41 + t * 8) % 100; ctx.fillRect(-8 + (i * 7 % 16), -120 + a * 2.4, 2, 2); }
    ctx.restore();
  }

function drawClouds() {
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    var period = vw + 400;
    ctx.fillStyle = 'rgba(255,255,255,.93)';
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      var cx = (((c.x * period + t * c.v - camX * 0.1) % period) + period) % period - 200;
      var cy = 40 + c.y * Math.min(gY * 0.45, 330);
      drawCloud(cx, cy, c.s);
    }
  }

function drawFarTrees(list, par, c1, c2) {
    setCam(par);
    var x0 = camX * par - 80, x1 = x0 + vw + 160;
    for (var i = 0; i < list.length; i++) {
      var tr = list[i];
      if (tr.x < x0 || tr.x > x1) continue;
      if (tr.type === 'pine') pineShape(tr.x, gY, tr.h, c1, c2);
      else roundShape(tr.x, gY, tr.h, c1, c2);
    }
  }

function drawCityGround(gx0, gx1, endX) {
    var cx0 = Math.max(gx0, -10), cx1 = Math.min(gx1, endX || CITY_END);
    if (cx1 <= cx0) return;
    ctx.fillStyle = '#434852'; ctx.fillRect(cx0, gY + 18, cx1 - cx0, H / scale);
    ctx.fillStyle = '#6b7079'; ctx.fillRect(cx0, gY - 2, cx1 - cx0, 20);
    ctx.fillStyle = '#b9bcc4'; ctx.fillRect(cx0, gY - 2, cx1 - cx0, 6);
    ctx.fillStyle = '#f4f1c8';
    for (var dx = Math.floor(cx0 / 80) * 80; dx < cx1; dx += 80) ctx.fillRect(dx, gY + 10, 40, 3);
  }

function drawFuel(f) {
    var x = f.x;
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 110, 7, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#4a5360'; ctx.fillRect(x - 84, gY - 150, 7, 150); ctx.fillRect(x + 77, gY - 150, 7, 150);
    ctx.fillStyle = '#e8eaee'; ctx.fillRect(x - 102, gY - 170, 204, 22);
    ctx.fillStyle = '#d8362f'; ctx.fillRect(x - 102, gY - 170, 204, 6);
    for (var k = -1; k <= 1; k += 2) {
      ctx.fillStyle = '#d8362f'; rrect(x + k * 30 - 14, gY - 72, 28, 72, 4); ctx.fill();
      ctx.fillStyle = '#14233f'; ctx.fillRect(x + k * 30 - 9, gY - 64, 18, 16);
      ctx.fillStyle = '#9fe3ff'; ctx.fillRect(x + k * 30 - 7, gY - 62, 14, 5);
    }
    ctx.fillStyle = '#14233f'; rrect(x - 36, gY - 208, 72, 32, 6); ctx.fill();
    ctx.fillStyle = '#ffd23f'; ctx.font = '20px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('АЗС', x, gY - 191);
    ctx.fillStyle = '#14233f'; ctx.font = '700 11px "Rubik", system-ui, sans-serif';
    var fp = fuelPrice(); ctx.fillStyle = fp >= 300 ? '#c4161c' : fp >= 60 ? '#7a4b00' : '#14233f'; ctx.fillText('ДЕФИЦИТ: ' + fp + ' за литр', x, gY - 158);
  }

function drawShop() {
    var x = SHOP_X, w = SHOP_W, top = gY - 160;
    // тень
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x + w / 2, gY + 4, w * 0.6, 8, 0, 0, 6.3); ctx.fill();
    // стена
    ctx.fillStyle = '#f1e8d2'; ctx.fillRect(x, top, w, 160);
    ctx.fillStyle = '#1f4aa8'; ctx.fillRect(x, gY - 34, w, 34);
    ctx.fillStyle = 'rgba(0,0,0,.08)';
    for (var i = 1; i < 6; i++) ctx.fillRect(x + i * (w / 6), top, 2, 126);
    // крыша
    ctx.fillStyle = '#a82a33';
    ctx.beginPath(); ctx.moveTo(x - 14, top + 6); ctx.lineTo(x + 8, top - 26); ctx.lineTo(x + w - 8, top - 26); ctx.lineTo(x + w + 14, top + 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#7e1d25'; ctx.fillRect(x - 14, top + 2, w + 28, 8);
    // вывеска
    ctx.fillStyle = '#16337d'; ctx.fillRect(x + 20, top + 14, w - 40, 36);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
    ctx.font = '22px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('МАГАЗИН', x + w / 2, top + 33);
    // окно
    ctx.fillStyle = '#9fd3e8'; ctx.fillRect(x + 18, top + 62, 104, 58);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x + 18, top + 120); ctx.lineTo(x + 56, top + 62); ctx.lineTo(x + 76, top + 62); ctx.lineTo(x + 38, top + 120); ctx.fill();
    ctx.fillStyle = '#6b4a2e'; ctx.fillRect(x + 14, top + 118, 112, 8);
    // бутылки на витрине
    if (ready(img.bottle)) for (var b = 0; b < 4; b++) ctx.drawImage(img.bottle, x + 30 + b * 24, top + 84, 14, 34);
    // навес
    for (var s = 0; s < 6; s++) {
      ctx.fillStyle = s % 2 ? '#fff' : '#c8323c';
      ctx.beginPath(); ctx.moveTo(x + 12 + s * 19, top + 54); ctx.lineTo(x + 31 + s * 19, top + 54); ctx.lineTo(x + 31 + s * 19, top + 66); ctx.arc(x + 21.5 + s * 19, top + 66, 9.5, 0, Math.PI); ctx.closePath(); ctx.fill();
    }
    // дверь
    ctx.fillStyle = '#6b4a2e'; ctx.fillRect(x + 156, top + 58, 62, 102);
    ctx.fillStyle = '#c99a5b'; ctx.fillRect(x + 164, top + 68, 46, 40);
    ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(x + 210, top + 112, 3.5, 0, 6.3); ctx.fill();
    // табличка про приём
    ctx.fillStyle = '#243b2a'; ctx.fillRect(x + 134, top + 70, 0, 0);
    ctx.fillStyle = '#fff';
    ctx.font = '700 11px "Rubik", system-ui, sans-serif';
    ctx.fillText('Приём стеклотары', x + 187, top + 144);
    // ящик с бутылками рядом
    ctx.fillStyle = '#9a6b3c'; ctx.fillRect(x + w + 20, gY - 28, 44, 28);
    ctx.fillStyle = '#7a5129'; ctx.fillRect(x + w + 20, gY - 28, 44, 4); ctx.fillRect(x + w + 20, gY - 14, 44, 3);
    if (ready(img.bottle)) for (var c = 0; c < 3; c++) ctx.drawImage(img.bottle, x + w + 24 + c * 13, gY - 52, 11, 26);
    // вспышка при сдаче
    if (shopFlash > 0) {
      ctx.fillStyle = 'rgba(255, 226, 122,' + (shopFlash * 0.35) + ')';
      ctx.fillRect(x - 14, top - 26, w + 28, 186);
    }
    // цена
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#14233f'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.font = '22px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.strokeText('1 чекушка = ' + fmtP(save.rate) + ' ' + coinWord(r1(save.rate)), x + w / 2, top - 84);
    ctx.fillText('1 чекушка = ' + fmtP(save.rate) + ' ' + coinWord(r1(save.rate)), x + w / 2, top - 84);
  }

function drawOneCrate(c) {
    var sway = c.landed ? 0 : Math.sin(t * 2 + c.ph) * 14;
    var x = c.x + sway, y = c.y;
    if (c.landed) {
      var pulse = 0.5 + 0.5 * Math.sin(t * 4);
      var g = ctx.createRadialGradient(x, y - 17, 6, x, y - 17, 70);
      g.addColorStop(0, 'rgba(255,230,120,' + (0.5 + pulse * 0.3) + ')'); g.addColorStop(1, 'rgba(255,230,120,0)');
      ctx.fillStyle = g; ctx.fillRect(x - 70, y - 90, 140, 140);
      var ay = y - 70 - Math.abs(Math.sin(t * 3)) * 8;
      ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#14233f'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x - 11, ay - 14); ctx.lineTo(x + 11, ay - 14); ctx.lineTo(x, ay); ctx.closePath(); ctx.stroke(); ctx.fill();
    } else {
      ctx.save(); ctx.translate(x, y - 34); ctx.rotate(Math.cos(t * 2 + c.ph) * 0.07);
      ctx.strokeStyle = 'rgba(40,40,40,.7)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-46, -62); ctx.lineTo(-16, 0); ctx.moveTo(46, -62); ctx.lineTo(16, 0); ctx.moveTo(-23, -62); ctx.lineTo(-6, 0); ctx.moveTo(23, -62); ctx.lineTo(6, 0); ctx.stroke();
      for (var i = 0; i < 5; i++) {
        ctx.fillStyle = i % 2 ? '#ffffff' : '#c8323c';
        ctx.beginPath(); ctx.moveTo(0, -62);
        ctx.arc(0, -62, 48, Math.PI + i * Math.PI / 5, Math.PI + (i + 1) * Math.PI / 5); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
    ctx.fillStyle = '#b98543'; ctx.fillRect(x - 22, y - 34, 44, 34);
    ctx.fillStyle = '#8f6330'; ctx.fillRect(x - 22, y - 34, 44, 5); ctx.fillRect(x - 22, y - 5, 44, 5);
    ctx.fillRect(x - 4, y - 34, 8, 34);
    ctx.strokeStyle = '#5c3e1b'; ctx.lineWidth = 2; ctx.strokeRect(x - 22, y - 34, 44, 34);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 7, y - 24, 11, 14);
    ctx.fillStyle = '#c8323c'; ctx.fillRect(x + 11.5, y - 22, 2.5, 10); ctx.fillRect(x + 8.5, y - 18.5, 8.5, 2.5);
  }

function drawCrate() {
    for (var i = 0; i < air.crates.length; i++) {
      var c = air.crates[i];
      if (c.x < camX - 120 || c.x > camX + vw + 120) continue;
      drawOneCrate(c);
    }
  }

function rrect(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

function drawBillboard() {
    var x = BB_X, w = BB_W, bh = 150, by = gY - 335;
    var p = save.rate, c = pctOf(p);
    var col = c > 0 ? '#3ddc84' : (c < 0 ? '#ff5a5f' : '#ffffff');
    // опоры
    ctx.fillStyle = '#5b616c'; ctx.fillRect(x + 36, by + bh, 12, gY - by - bh + 2); ctx.fillRect(x + w - 48, by + bh, 12, gY - by - bh + 2);
    ctx.fillStyle = '#434852'; ctx.fillRect(x + 30, gY - 8, 24, 10); ctx.fillRect(x + w - 54, gY - 8, 24, 10);
    ctx.strokeStyle = '#5b616c'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x + 48, by + bh + 30); ctx.lineTo(x + w - 48, gY - 40); ctx.moveTo(x + w - 48, by + bh + 30); ctx.lineTo(x + 48, gY - 40); ctx.stroke();
    // лампы
    for (var l = 0; l < 2; l++) {
      var lx = x + 44 + l * (w - 88);
      ctx.fillStyle = '#3a3f4b'; ctx.fillRect(lx - 4, by - 20, 8, 14);
      var gl = ctx.createRadialGradient(lx, by - 8, 2, lx, by - 8, 36);
      gl.addColorStop(0, 'rgba(255,240,170,.55)'); gl.addColorStop(1, 'rgba(255,240,170,0)');
      ctx.fillStyle = gl; ctx.fillRect(lx - 36, by - 44, 72, 72);
    }
    // рама и экран
    ctx.fillStyle = '#2a2f3a'; rrect(x - 7, by - 7, w + 14, bh + 14, 10); ctx.fill();
    ctx.fillStyle = '#0b1526'; rrect(x, by, w, bh, 6); ctx.fill();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left'; ctx.fillStyle = '#8fd3ff';
    ctx.font = '700 13px "Rubik", system-ui, sans-serif';
    ctx.fillText('Курс чекушки', x + 12, by + 18);
    ctx.textAlign = 'right'; ctx.fillStyle = '#6f87a6'; ctx.font = '11px "Rubik", system-ui, sans-serif';
    ctx.fillText('коинов за штуку', x + w - 12, by + 18);
    // цена
    ctx.textAlign = 'left'; ctx.fillStyle = col;
    ctx.font = '46px "Russo One", "Arial Black", Impact, sans-serif';
    var ptxt = fmtP(p);
    ctx.shadowColor = col; ctx.shadowBlur = 10;
    ctx.fillText(ptxt, x + 12, by + 62);
    ctx.shadowBlur = 0;
    var tw = ctx.measureText(ptxt).width;
    // стрелка тренда
    if (rate.dir !== 0) {
      var ax = x + 12 + tw + 12, ay = by + 62;
      ctx.fillStyle = rate.dir > 0 ? '#3ddc84' : '#ff5a5f';
      ctx.beginPath();
      if (rate.dir > 0) { ctx.moveTo(ax - 8, ay + 7); ctx.lineTo(ax + 8, ay + 7); ctx.lineTo(ax, ay - 8); }
      else { ctx.moveTo(ax - 8, ay - 7); ctx.lineTo(ax + 8, ay - 7); ctx.lineTo(ax, ay + 8); }
      ctx.closePath(); ctx.fill();
    }
    // график
    var hs = rate.hist, gx = x + w - 84, gy = by + 34, gw = 72, gh = 38;
    if (hs.length > 1) {
      var mn = Math.min.apply(null, hs), mx = Math.max.apply(null, hs);
      if (mx - mn < 1) { mx += 0.5; mn -= 0.5; }
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.beginPath();
      for (var i = 0; i < hs.length; i++) {
        var px = gx + gw * i / (hs.length - 1), py = gy + gh - (hs[i] - mn) / (mx - mn) * gh;
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(gx + gw, gy + gh - (hs[hs.length - 1] - mn) / (mx - mn) * gh, 3, 0, 6.3); ctx.fill();
    }
    // подстрока
    ctx.textAlign = 'left'; ctx.font = '12px "Rubik", system-ui, sans-serif';
    if (rate.ev) {
      ctx.fillStyle = rate.ev.m > 1 ? '#3ddc84' : '#ff5a5f';
      ctx.fillText(rate.ev.name + ' \u00B7 ' + fmtTime(rate.ev.left), x + 12, by + 90);
    } else {
      ctx.fillStyle = '#9fb4cf';
      ctx.fillText('Было ' + BASE_PRICE + ', стало ' + fmtP(p) + ' \u00B7 ' + fmtTime(rate.t), x + 12, by + 90);
    }
    // плашка выгодно / невыгодно
    ctx.fillStyle = c > 0 ? 'rgba(61,220,132,.22)' : (c < 0 ? 'rgba(255,90,95,.22)' : 'rgba(255,255,255,.14)');
    rrect(x + 12, by + 104, w - 24, 34, 8); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.5; rrect(x + 12, by + 104, w - 24, 34, 8); ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = col;
    ctx.font = '17px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillText(pctStr(p) + '  ' + (c > 0 ? 'выгодно' : (c < 0 ? 'невыгодно' : 'как обычно')), x + w / 2, by + 122);
  }

function drawGarage() {
    var x = UP_X, w = UP_W, top = gY - 160;
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x + w / 2, gY + 4, w * 0.6, 8, 0, 0, 6.3); ctx.fill();
    // стена
    ctx.fillStyle = '#e3b23a'; ctx.fillRect(x, top, w, 160);
    ctx.fillStyle = 'rgba(0,0,0,.10)';
    for (var i = 1; i < 25; i++) ctx.fillRect(x + i * (w / 25), top, 2, 160);
    // крыша
    ctx.fillStyle = '#1d5560';
    ctx.beginPath(); ctx.moveTo(x - 12, top + 8); ctx.lineTo(x + 6, top - 22); ctx.lineTo(x + w - 6, top - 22); ctx.lineTo(x + w + 12, top + 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#113a42'; ctx.fillRect(x - 12, top + 4, w + 24, 8);
    // вывеска
    ctx.fillStyle = '#113a42'; ctx.fillRect(x + 18, top + 16, w - 36, 38);
    ctx.fillStyle = '#ffd23f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '22px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillText('ГАРАЖ', x + w / 2, top + 30);
    ctx.fillStyle = '#ffffff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif';
    ctx.fillText('улучшения', x + w / 2, top + 47);
    // ворота: открыты наполовину
    var dx = x + 28, dw = 130, dy = top + 66, dh = 94;
    ctx.fillStyle = '#25252b'; ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(dx + 10, dy + 56, 52, 38);
    ctx.fillStyle = '#c8323c'; ctx.fillRect(dx + 72, dy + 46, 44, 48);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(dx + 76, dy + 52, 36, 6);
    ctx.fillStyle = '#9aa3ad'; ctx.fillRect(dx - 2, dy - 2, dw + 4, 36);
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    for (var k = 1; k < 5; k++) ctx.fillRect(dx - 2, dy - 2 + k * 7, dw + 4, 2);
    // боковое окно
    ctx.fillStyle = '#9fd3e8'; ctx.fillRect(x + 180, top + 74, 50, 40);
    ctx.fillStyle = '#6b4a2e'; ctx.fillRect(x + 176, top + 114, 58, 6);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 203, top + 74, 3, 40);
    // покрышки
    ctx.fillStyle = '#222'; 
    for (var tI = 0; tI < 3; tI++) { ctx.beginPath(); ctx.ellipse(x + w + 34, gY - 8 - tI * 14, 20, 8, 0, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#555';
    for (var tJ = 0; tJ < 3; tJ++) { ctx.beginPath(); ctx.ellipse(x + w + 34, gY - 8 - tJ * 14, 9, 3.5, 0, 0, 6.3); ctx.fill(); }
    // подпись
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#14233f'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.font = '20px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.strokeText('Улучшения', x + w / 2, top - 44);
    ctx.fillText('Улучшения', x + w / 2, top - 44);
  }

function drawWash() {
    var x = WASH_X, w = WASH_W, top = gY - 130;
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x + w / 2, gY + 4, w * 0.6, 8, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#cfe6ee'; ctx.fillRect(x, top, w, 130);
    ctx.fillStyle = 'rgba(255,255,255,.6)';
    for (var i = 1; i < 10; i++) ctx.fillRect(x + i * (w / 10), top, 2, 130);
    for (var j = 1; j < 7; j++) ctx.fillRect(x, top + j * 19, w, 2);
    ctx.fillStyle = '#2a7f9e';
    ctx.beginPath(); ctx.moveTo(x - 10, top + 8); ctx.lineTo(x + 8, top - 20); ctx.lineTo(x + w - 8, top - 20); ctx.lineTo(x + w + 10, top + 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1d6079'; ctx.fillRect(x - 10, top + 4, w + 20, 8);
    ctx.fillStyle = '#1d6079'; ctx.fillRect(x + 16, top + 18, w - 32, 34);
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '22px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillText('МОЙКА', x + w / 2, top + 36);
    // труба и кран
    ctx.fillStyle = '#8b97a3';
    ctx.fillRect(x + 100, top + 60, 8, 20); ctx.fillRect(x + 70, top + 60, 38, 8); ctx.fillRect(x + 70, top + 60, 8, 20);
    ctx.fillStyle = '#c9373f'; ctx.beginPath(); ctx.arc(x + 104, top + 56, 6, 0, 6.3); ctx.fill();
    // корыто
    ctx.fillStyle = '#7f8c99'; rrect(x + 36, gY - 50, 118, 50, 6); ctx.fill();
    ctx.fillStyle = '#58b8e6'; ctx.fillRect(x + 44, gY - 42, 102, 16);
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x + 48, gY - 40, 40, 3);
    if (wash.on) {
      ctx.fillStyle = 'rgba(120,200,240,.85)'; ctx.fillRect(x + 72, top + 80, 4, (gY - 42) - (top + 80));
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      for (var k = 0; k < 9; k++) {
        var px = x + 48 + ((k * 37 + t * 40) % 92), py = gY - 44 - ((t * 45 + k * 19) % 46);
        ctx.beginPath(); ctx.arc(px, py, 2 + (k % 3), 0, 6.3); ctx.fill();
      }
    }
    // ведро
    ctx.fillStyle = '#e8892c'; ctx.beginPath(); ctx.moveTo(x + w - 34, gY - 26); ctx.lineTo(x + w - 10, gY - 26); ctx.lineTo(x + w - 14, gY); ctx.lineTo(x + w - 30, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#14233f'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.font = '20px "Russo One", "Arial Black", Impact, sans-serif';
    var lbl = 'Чистая чекушка ' + fmtMult(CLEAN_MULT);
    ctx.strokeText(lbl, x + w / 2, top - 44); ctx.fillText(lbl, x + w / 2, top - 44);
  }

function drawStop(st) {
    var x = st.x;
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 64, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#4a5360'; ctx.fillRect(x - 54, gY - 104, 5, 104); ctx.fillRect(x + 49, gY - 104, 5, 104);
    ctx.fillStyle = 'rgba(159,211,232,.5)'; ctx.fillRect(x - 49, gY - 100, 98, 72);
    ctx.fillStyle = '#1f4aa8'; ctx.fillRect(x - 40, gY - 90, 80, 18);
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '700 11px "Rubik", system-ui, sans-serif';
    ctx.fillText('Автобус', x, gY - 81);
    ctx.fillStyle = '#c8323c'; rrect(x - 62, gY - 114, 124, 14, 5); ctx.fill();
    ctx.fillStyle = '#16337d'; rrect(x - 48, gY - 136, 96, 22, 4); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif';
    ctx.fillText(st.name, x, gY - 125);
    if (st.home || st.link) {
      // ярлыки маршрутов: куда можно уехать на автобусе
      var rts = crossRoutes(st), ry = gY - 150;
      ctx.font = '700 10px "Rubik", system-ui, sans-serif';
      for (var rq = 0; rq < rts.length; rq++) {
        var rt = rts[rq], lbl = (rt.dir < 0 ? '\u25C0 ' : '') + rt.name.replace('В ', '').toUpperCase() + (rt.dir > 0 ? ' \u25B6' : '');
        var rw = ctx.measureText(lbl).width + 16;
        ctx.fillStyle = '#0f7a4a'; rrect(x - rw / 2, ry - rq * 17, rw, 14, 4); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(lbl, x, ry - rq * 17 + 7.5);
      }
    }
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(x - 36, gY - 30, 72, 7); ctx.fillRect(x - 32, gY - 23, 5, 23); ctx.fillRect(x + 27, gY - 23, 5, 23);
    ctx.fillStyle = '#6b727c'; ctx.fillRect(x + 66, gY - 150, 4, 150);
    ctx.fillStyle = '#1f4aa8'; ctx.beginPath(); ctx.arc(x + 68, gY - 158, 16, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#ffffff'; rrect(x + 58, gY - 166, 20, 13, 3); ctx.fill();
    ctx.fillStyle = '#1f4aa8'; ctx.fillRect(x + 61, gY - 163, 14, 4);
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x + 62, gY - 152, 2.2, 0, 6.3); ctx.arc(x + 74, gY - 152, 2.2, 0, 6.3); ctx.fill();
  }

function drawBus() {
    if (!bus.on) return;
    var x = bus.x;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, bus.alpha));
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 108, 7, 0, 0, 6.3); ctx.fill();
    var bob = (bus.st === 'ride' || bus.st === 'come') ? Math.sin(t * 30) * 0.9 : 0;
    ctx.translate(x, gY + bob);
    ctx.rotate(-bus.dir * Math.max(-0.035, Math.min(0.035, (bus.acc || 0) * 0.000035)));
    if (bus.dir > 0) ctx.scale(-1, 1);
    function bt(str, px, py) { if (bus.dir > 0) { ctx.save(); ctx.scale(-1, 1); ctx.fillText(str, -px, py); ctx.restore(); } else ctx.fillText(str, px, py); }
    // кузов
    var bg = ctx.createLinearGradient(0, -100, 0, -16); bg.addColorStop(0, '#ffc43a'); bg.addColorStop(0.5, '#f0a81c'); bg.addColorStop(1, '#d48a0a');
    ctx.fillStyle = bg; rrect(-102, -96, 204, 80, 12); ctx.fill();
    ctx.fillStyle = '#c9ccd2'; rrect(-30, -104, 56, 9, 4); ctx.fill(); ctx.fillStyle = '#9aa0aa'; ctx.fillRect(-24, -103, 44, 2);
    ctx.fillStyle = '#1f4aa8'; ctx.fillRect(-102, -52, 204, 14);
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(-102, -52, 204, 2);
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '10px "Russo One", "Arial Black", Impact, sans-serif';
    bt('ПЕТУХ-ТРАНС', 26, -45);
    ctx.fillStyle = '#d98e0c'; ctx.fillRect(-102, -30, 204, 6);
    // табло
    ctx.fillStyle = '#111'; rrect(-92, -112, 72, 15, 3); ctx.fill();
    ctx.fillStyle = '#ffb020'; ctx.font = '700 10px "Rubik", system-ui, sans-serif';
    var dn = bus.dest ? bus.dest.name.toUpperCase() : 'МАГАЗИН';
    ctx.font = '700 9px "Rubik", system-ui, sans-serif';
    bt(bus.dir > 0 ? dn + ' \u25B6' : '\u25C0 ' + dn, -56, -104);
    // окна
    var wins = [[-96, 38], [-50, 34], [-10, 34], [30, 34], [70, 28]];
    for (var i = 0; i < wins.length; i++) {
      var wx = wins[i][0], ww = wins[i][1];
      ctx.fillStyle = 'rgba(159,211,232,.95)'; rrect(wx, -88, ww, 30, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(wx + 4, -58); ctx.lineTo(wx + 14, -88); ctx.lineTo(wx + 22, -88); ctx.lineTo(wx + 12, -58); ctx.fill();
    }
    // дверь: открывается, когда садятся и выходят
    var dr = Math.max(0, Math.min(1, bus.door || 0));
    ctx.fillStyle = '#2a2f3a'; rrect(22, -90, 36, 72, 3); ctx.fill();
    if (dr > 0.05) { ctx.fillStyle = '#0f1218'; rrect(24, -88, 32, 68, 2); ctx.fill(); ctx.fillStyle = '#c7ccd6'; ctx.fillRect(24, -26, 32, 5); ctx.fillStyle = 'rgba(255,224,138,.35)'; ctx.fillRect(24, -88, 32, 68); }
    var dw = 32 * (1 - dr * 0.85);
    ctx.fillStyle = '#e3961a'; rrect(24, -88, dw, 68, 2); ctx.fill();
    ctx.fillStyle = 'rgba(159,211,232,.95)'; rrect(26, -84, Math.max(0, dw - 4), 28, 2); ctx.fill();
    ctx.strokeStyle = '#a86a08'; ctx.lineWidth = 1.5; ctx.strokeRect(24, -88, dw, 68);
    // водитель
    if (ready(img.npcDriver)) {
      ctx.save(); ctx.beginPath(); ctx.rect(-96, -88, 38, 30); ctx.clip();
      ctx.drawImage(img.npcDriver, 50, 0, 185, 146, -96, -90, 38, 30);
      ctx.restore();
    }
    // пассажир-петух
    if (bus.hide && ready(img.rooster)) {
      ctx.save(); ctx.beginPath(); ctx.rect(-10, -88, 34, 30); ctx.clip();
      ctx.drawImage(img.rooster, 0, 0, 156, 115, -9, -92, 34, 25);
      ctx.restore();
    }
    if (bus.hide && dirtyN() > 0) {
      ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#9fe3ff';
      bt('\uD83D\uDCA7 мойка \u00D7' + BUS_WASH_BOOST, 0, -126);
    }
    // фара, бампер, задний фонарь
    // фара с лучом, бампер, задние огни (стоп-сигнал при торможении)
    if (bus.v > 5 || bus.st === 'come') { var hg = ctx.createLinearGradient(-102, 0, -230, 0); hg.addColorStop(0, 'rgba(255,246,176,.38)'); hg.addColorStop(1, 'rgba(255,246,176,0)'); ctx.fillStyle = hg; ctx.beginPath(); ctx.moveTo(-102, -34); ctx.lineTo(-230, -50); ctx.lineTo(-230, -4); ctx.lineTo(-102, -24); ctx.fill(); }
    ctx.fillStyle = '#fff6b0'; ctx.beginPath(); ctx.ellipse(-99, -30, 4, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#2a2f3a'; ctx.fillRect(-106, -22, 12, 7);
    var brk = (bus.acc || 0) < -60;
    ctx.fillStyle = brk ? '#ff3b3b' : '#c8323c'; ctx.fillRect(98, -36, 4, 10);
    if (brk) { var bgl = ctx.createRadialGradient(100, -31, 1, 100, -31, 22); bgl.addColorStop(0, 'rgba(255,60,60,.7)'); bgl.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = bgl; ctx.fillRect(78, -53, 44, 44); }
    // колёса
    for (var wI = 0; wI < 2; wI++) {
      var cxw = wI ? 62 : -62;
      ctx.fillStyle = '#1b1b20'; ctx.beginPath(); ctx.arc(cxw, -15, 17, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#9aa3ad'; ctx.beginPath(); ctx.arc(cxw, -15, 8, 0, 6.3); ctx.fill();
      ctx.strokeStyle = '#5c636c'; ctx.lineWidth = 2;
      var rot = bus.x / 17;
      ctx.beginPath();
      ctx.moveTo(cxw + Math.cos(rot) * 8, -15 + Math.sin(rot) * 8); ctx.lineTo(cxw - Math.cos(rot) * 8, -15 - Math.sin(rot) * 8);
      ctx.moveTo(cxw + Math.cos(rot + 1.57) * 8, -15 + Math.sin(rot + 1.57) * 8); ctx.lineTo(cxw - Math.cos(rot + 1.57) * 8, -15 - Math.sin(rot + 1.57) * 8);
      ctx.stroke();
    }
    ctx.restore();
  }

function drawHero() {
    if (!hero.on || !ready(img.hero)) return;
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    var h = 150, w = h * img.hero.naturalWidth / img.hero.naturalHeight;
    ctx.save();
    ctx.translate(hero.x, hero.y + Math.sin(t * 2.2) * 7);
    ctx.scale(hero.dir > 0 ? -1 : 1, 1);
    ctx.rotate(-1.28 + Math.sin(t * 3) * 0.05);
    ctx.globalAlpha = 0.95;
    ctx.drawImage(img.hero, -w / 2, -h / 2, w, h);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

function drawSquirrels() {
    for (var i = 0; i < squirrels.length; i++) {
      var s = squirrels[i];
      if (s.x < camX - 140 || s.x > camX + vw + 140) continue;
      var im = s.state === 'carry' ? img.sqCarry : img.sqRun;
      if (!ready(im)) continue;
      var h = SQ_H, w = h * im.naturalWidth / im.naturalHeight;
      var k = t * 22 + s.ph;
      var hop = -Math.abs(Math.sin(k)) * 7;
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(s.x, gY + 3, w * 0.34, 5, 0, 0, 6.3); ctx.fill();
      ctx.save();
      ctx.translate(s.x, gY + hop + 2);
      ctx.rotate(Math.sin(k) * 0.05);
      ctx.scale(s.dir > 0 ? -1 : 1, 1);
      ctx.drawImage(im, -w / 2, -h, w, h);
      ctx.restore();
    }
  }

function drawWools() {
    if (!ready(img.wool)) return;
    var x0 = camX - 80, x1 = camX + vw + 80;
    var col = save.gloves ? '255,214,80' : '255,70,60';
    for (var i = 0; i < wools.length; i++) {
      var w = wools[i];
      if (w.x < x0 || w.x > x1) continue;
      var bw = 88, bh = bw * img.wool.naturalHeight / img.wool.naturalWidth;
      var pulse = 0.5 + 0.5 * Math.sin(t * 3 + w.ph);
      var g = ctx.createRadialGradient(w.x, gY - bh / 2, 6, w.x, gY - bh / 2, 62);
      g.addColorStop(0, 'rgba(' + col + ',' + (0.35 + pulse * 0.25) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
      ctx.fillStyle = g; ctx.fillRect(w.x - 62, gY - bh / 2 - 62, 124, 124);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(w.x, gY + 3, bw * 0.45, 5, 0, 0, 6.3); ctx.fill();
      ctx.drawImage(img.wool, w.x - bw / 2, gY - bh + 4, bw, bh);
    }
  }

function bottleSprite(r, clean) {
    r = r | 0; clean = !!clean;
    var key = r + (clean ? 'c' : 'd');
    if (spr[key]) return spr[key];
    var base = r === 5 ? img.bMyth : (r === 4 ? img.bLegend : (clean ? img.bottle : img.bDirty));
    if (!ready(base)) return null;
    var w = base.naturalWidth, h = base.naturalHeight;
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var g = c.getContext('2d');
    g.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'source-atop';
    if (r >= 4) { if (!clean) { g.fillStyle = 'rgba(96,66,34,.38)'; g.fillRect(0, 0, w, h); } }
    else if (r > 0) { g.fillStyle = 'rgba(' + RAR[r].glow + ',' + (0.10 + r * 0.04) + ')'; g.fillRect(0, 0, w, h); }
    spr[key] = c;
    return c;
  }

function sparkle(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s);
    ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.fill();
  }

function drawBottles() {
    var x0 = camX - 40, x1 = camX + vw + 40;
    for (var i = 0; i < bottles.length; i++) {
      var b = bottles[i];
      if (b.x < x0 || b.x > x1) continue;
      if (b.lab !== undefined) { drawLabBottle(b); continue; }
      var r = b.r | 0, rc = RAR[r];
      var bob = 0;
      var cx = b.x, cy = gY - BOTTLE_H / 2 + 5 - bob;
      // свечение цвета редкости
      var rad = 40 + r * 7;
      var g = ctx.createRadialGradient(cx, cy, 4, cx, cy, rad);
      g.addColorStop(0, 'rgba(' + rc.glow + ',' + (r ? 0.78 : 0.65) + ')'); g.addColorStop(1, 'rgba(' + rc.glow + ',0)');
      ctx.fillStyle = g; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      // тень на земле
      if (b.off > 0) { ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(cx, gY + 3, 10, 3, 0, 0, 6.3); ctx.fill(); }
      var sp = b.sup && ready(img.bSuper) ? img.bSuper : (b.secret && ready(img.bMyth) ? img.bMyth : bottleSprite(r, b.c));
      if (b.secret) { for (var rk = 0; rk < 3; rk++) { csGlow(cx, cy, 46 + rk * 10 + 5 * Math.sin(t * 4 + rk), ['255,80,80', '255,220,80', '80,255,140', '80,160,255', '200,100,255'][Math.floor(t * 3 + rk) % 5], 0.35); } }
      if (sp) {
        var bw = BOTTLE_H * sp.width / sp.height;
        ctx.save(); if (b.secret) { try { ctx.filter = 'hue-rotate(' + Math.floor(t * 120 % 360) + 'deg) saturate(1.8) brightness(1.2)'; } catch (e3) {} } ctx.translate(cx, cy); ctx.rotate(b.off > 0 ? Math.sin(t * 1.6 + b.ph) * 0.12 : 0);
        ctx.drawImage(sp, -bw / 2, -BOTTLE_H / 2, bw, BOTTLE_H);
        ctx.restore(); if (b.secret) ctx.filter = 'none';
      }
      if (b.c) { ctx.fillStyle = '#9fe3ff'; sparkle(cx + Math.cos(t * 2 + b.ph) * 18, cy - 22 + Math.sin(t * 3 + b.ph) * 6, 4); }
      // искры у редких
      if (r > 0) {
        ctx.fillStyle = rc.c;
        for (var k = 0; k < r; k++) {
          var a = t * 1.6 + k * 2.1 + b.ph;
          sparkle(cx + Math.cos(a) * 24, cy + Math.sin(a * 1.3) * 26, 3 + Math.abs(Math.sin(t * 4 + k)) * 3);
        }
      }
    }
  }

function drawPlayer() {
    if ((bus.on && bus.hide) || ob.on || av.on || pax.on || ride.id || trip.inn || subActive() || p6.on) return;
    if (gh.on && ready(img.ghost) && !(socket && net.room)) { drawGhostAt(P.x, P.face, 0.9, P.z); return; }
    if (gh.on) return;
    if (hp < maxHp()) {
      var hw = 70, hx = P.x - hw / 2, hy = gY + 14;
      ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.fillRect(hx - 2, hy - 2, hw + 4, 12);
      ctx.fillStyle = hp > maxHp() * 0.5 ? '#3ddc84' : (hp > maxHp() * 0.25 ? '#ffb020' : '#ff4a4a'); ctx.fillRect(hx, hy, hw * Math.max(0, hp) / maxHp(), 8);
      ctx.fillStyle = '#fff'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('HP ' + Math.ceil(hp), P.x, hy + 12);
    }
    if (save.autowash && dirtyN() > 0) {
      var aby = gY + (hp < maxHp() ? 40 : 14), abw = 56, abx = P.x - abw / 2;
      ctx.fillStyle = 'rgba(20,35,63,.8)'; ctx.fillRect(abx - 2, aby - 2, abw + 4, 8);
      ctx.fillStyle = '#58b8e6'; ctx.fillRect(abx, aby, abw * Math.min(1, aw.t / awInt(save.autowash)), 4);
    }
    var x = P.x, y = gY - P.z;
    // тень
    var sh = 1 - Math.min(0.6, P.z / 260);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 28 * sh, 6 * sh, 0, 0, 6.3); ctx.fill();
    if (!ready(img.rooster)) return;
    var h = PLAYER_H, w = h * img.rooster.naturalWidth / img.rooster.naturalHeight;
    var moving = P.z <= 0.01 && Math.abs(P.vx) > 25;
    var sway = moving ? Math.sin(P.walk * 14) * 0.075 : 0;
    var hop = moving ? -Math.abs(Math.sin(P.walk * 14)) * 6 : 0;
    var breathe = moving ? 1 : 1 + Math.sin(t * 2.2) * 0.012;
    var air = P.z > 0 ? Math.max(-0.12, Math.min(0.12, P.vz / 5200)) : 0;
    ctx.save();
    ctx.translate(x, y + hop);
    ctx.rotate(dn.on ? (P.face > 0 ? 1.45 : -1.45) : sway); if (gh.on) ctx.globalAlpha = 0.32;
    ctx.scale(P.face > 0 ? -1 : 1, 1);
    if (ep.on && ep.pf > 1) ctx.scale(ep.pf, 1 + (ep.pf - 1) * 0.1);
    ctx.scale(1 - air * 0.6, breathe + air);
    if (iFrames > 0 && Math.floor(t * 18) % 2) ctx.globalAlpha = 0.5;
    if (muscleForm() && !ep.on) { var mh2 = h * 1.18, mw2 = mh2 * img.muscle.naturalWidth / img.muscle.naturalHeight; ctx.drawImage(img.muscle, -mw2 / 2, -mh2, mw2, mh2); }
    else { ctx.drawImage(skinImg(mySkin), -w / 2, -h, w, h);
    drawAcc(ctx, myAcc, w, h); }
    ctx.restore();
  }

function hintNext() {
    var m = save.mx, q, t = '';
    function rem() { return 5 - bitCount(m.c2u | 0); }
    if (m.endp) t = 'Главный сюжет пройден. Дальше свободная игра: самолёты и Мальдивы, рыбалка, подлодка и Кракен, магия, бой во вселенной и бунт вместе с друзьями. В «Достижениях» видно, что ещё не получено.';
    else if (m.c2n >= 4) t = 'Конец 1 части 2 главы. Дальше жди новых обновлений, а пока можно качать магию (круг ритуала), летать и играть с друзьями.';
    else if (m.c2m && (m.c2u | 0) !== 31) t = 'В новой лаборатории открыта портальная пушка (справа). Выбери вселенную, победи тамошнего Кокича, взорви ядро и убеги. Осталось целых вселенных: ' + rem() + '. Можно идти с друзьями: ведущий открывает портал.';
    else if (m.c2m) t = 'Все вселенные закрыты. Поговори с профессором или Меллстроем в новой лаборатории: пора начинать бунт в Чикен Гане. Флагов ' + rbFlags() + '/5, серверов ' + rbSrv() + '/3, ютуберов ' + rbYt() + '/3.';
    else if (m.p6) t = 'Глава 2: иди через машину телепорта к лаборатории, дальше следуй за Меллстроем и профессором.';
    else if ((m.p5 | 0) >= 6) t = 'Часть 6: играешь за профессора. Собери детали Часореза (антенна, верстак, кабинет), потом разрез времени.';
    else if (m.rr === 1) t = 'Обряд проводят ночью у круга ритуала в Лесу. Можно позвать до 3 друзей: встаньте в круг до конца отсчёта. Ночь: ' + (dnIsNight() ? 'сейчас' : 'через ' + fmtTime(dnToNight())) + '.';
    else if (m.er) t = 'Хоумлендера стёрли. Загляни в Больницу к Меллстрою, расспроси его, а потом иди по сюжету: шахта, лаборатория, Город Моггити, Собиратель чекушек.';
    else {
      q = qCur();
      t = q ? 'Задание Собирателя чекушек: ' + q.t + '. ' : '';
      t += 'Чтобы идти по сюжету, победи Хоумлендера в Белом доме: его вызывают особым аирдропом, нужна донат-магия, которая появляется по ходу боя. В бою можно взять друзей.';
    }
    t += '\n\nКоины: ' + fmtN(save.coins) + '. ' + (save.coins > 20000 ? 'Есть что потратить: гараж (апгрейды), аэропорт (самолёт), круг ритуала (навыки магии).' : 'Копи на апгрейды в гараже: карман, скорость, перчатки.');
    return t;
  }

function drawDownHud() {
    if (!dn.on) return;
    ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = 'rgba(120,0,0,' + (0.18 + 0.08 * Math.sin(t * 6)).toFixed(2) + ')'; ctx.fillRect(0, 0, W, H);
    ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 5; ctx.strokeStyle = '#3a0a0a';
    var m1 = 'ТЫ ПОВЕРЖЕН · ' + Math.ceil(dn.t) + ' с', m2 = 'Друзья могут поднять тебя';
    ctx.strokeText(m1, W / 2, H * 0.3); ctx.fillStyle = '#ffd2d2'; ctx.fillText(m1, W / 2, H * 0.3);
    ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; ctx.fillText(m2, W / 2, H * 0.3 + 28);
    ctx.restore();
  }

function drawPopups() {
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.font = '24px "Russo One", "Arial Black", Impact, sans-serif';
    for (var i = 0; i < popups.length; i++) {
      var p = popups[i], k = p.age / 1.1;
      ctx.globalAlpha = 1 - k * k;
      var px = p.x, py = gY - p.z - k * 60;
      ctx.lineWidth = 5; ctx.strokeStyle = '#14233f'; ctx.strokeText(p.text, px, py);
      ctx.fillStyle = p.color; ctx.fillText(p.text, px, py);
    }
    ctx.globalAlpha = 1;
  }

function drawShopHint() {
    if (busLock() && !ob.on && !ride.id) return;
    var msg, lo, hi;
    if (ride.id) { msg = touch ? 'Жми «Выйти»' : 'E: выйти из автобуса'; lo = P.x - 30; hi = P.x + 30; } else
    if (ob.on) {
      msg = boss.on ? (save.wrk ? (touch ? 'Жми «Ракета»' : 'Нажми E: ракета') : (touch ? 'Жми «Выйти»' : 'E: выйти')) : (inShop() && save.carried + trunkN() > 0) ? (touch ? 'Жми «Сдать»' : 'Нажми E: сдать всё') : (nearFuel() ? (touch ? 'Жми «Заправить»' : 'Нажми E: заправить (' + fuelPrice() + ' за литр)') : (touch ? 'Жми «Выйти»' : 'E: выйти из автобуса')); lo = P.x - 30; hi = P.x + 30;
    } else if (!music.auto && nearPick()) {
      msg = touch ? 'Жми «Подобрать»' : 'Нажми E: подобрать'; lo = P.x - 30; hi = P.x + 30;
    } else if (inShop()) {
      msg = save.carried > 0 ? (touch ? 'Жми «Сдать»' : 'Нажми E: сдать чекушки') : 'Принеси чекушки';
      lo = SHOP_X; hi = SHOP_X + SHOP_W;
    } else if (inUp()) {
      msg = touch ? 'Жми «Улучшения»' : 'Нажми E: улучшения';
      lo = UP_X; hi = UP_X + UP_W;
    } else if (inWash()) {
      var dn = dirtyN();
      msg = wash.on ? 'Мою\u2026' : (dn > 0 ? (touch ? 'Жми «Мыть» (' + dn + ')' : 'Нажми E: помыть (' + dn + ')') : 'Тут моют чекушки');
      lo = WASH_X; hi = WASH_X + WASH_W;
    } else if (nearOwnBus()) {
      msg = touch ? 'Жми «Сесть в автобус»' : 'Нажми E: сесть в автобус'; lo = ob.x - 100; hi = ob.x + 100;
    } else if (fishMode()) {
      msg = fishHintMsg(fishMode()); var fmx = fishMode() === 'fshop' ? SHOP_FX : (fishMode() === 'sail' ? BOAT_X : P.x); lo = fmx - 60; hi = fmx + 60;
    } else if (nearOtherBus()) {
      var nob = net.others[nearOtherBus()];
      msg = touch ? 'Жми «Сесть к другу»' : 'Нажми E: сесть в автобус игрока'; lo = nob.rbx - 100; hi = nob.rbx + 100;
    } else if (curStop()) {
      var cst = curStop();
      msg = touch ? 'Жми «Автобус»' : 'Нажми E: автобус';
      lo = cst.x - 60; hi = cst.x + 60;
    } else if (nearBin()) {
      var nb0 = nearBin();
      msg = nb0.cd > 0 ? 'Мусорку уже перерыли (' + fmtTime(nb0.cd) + ')' : (touch ? 'Жми «Обыск»' : 'Нажми E: обыскать мусорку');
      lo = nb0.x - 60; hi = nb0.x + 60;
    } else return;
    var cx = Math.max(lo + 30, Math.min(hi - 30, P.x));
    var y = gY - PLAYER_H - 24;
    ctx.font = '700 15px "Rubik", system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var tw = ctx.measureText(msg).width + 26;
    ctx.fillStyle = 'rgba(20,35,63,.88)';
    var rx = cx - tw / 2, ry = y - 15;
    ctx.beginPath();
    ctx.moveTo(rx + 14, ry); ctx.lineTo(rx + tw - 14, ry); ctx.quadraticCurveTo(rx + tw, ry, rx + tw, ry + 14);
    ctx.lineTo(rx + tw, ry + 16); ctx.quadraticCurveTo(rx + tw, ry + 30, rx + tw - 14, ry + 30);
    ctx.lineTo(rx + 14, ry + 30); ctx.quadraticCurveTo(rx, ry + 30, rx, ry + 16); ctx.lineTo(rx, ry + 14); ctx.quadraticCurveTo(rx, ry, rx + 14, ry);
    ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText(msg, cx, y);
  }

function render() {
    if (hn.on) { drawHn(); return; }
    if (flt.on) { drawFlight(); return; }
    if (music.shake !== false) { shakeX = shk > 0 ? (Math.random() - 0.5) * shk * 22 : 0; shakeY = shk > 0 ? (Math.random() - 0.5) * shk * 14 : 0; }
    else { shakeX = shakeY = 0; }
    drawSky();
    drawClouds();
    drawHero();
    if (loc.i === 0) {
      drawHills(0.18, 150, '#a8d8a6', 38, 16, 1.2);
      drawHills(0.34, 96, '#86c485', 30, 14, 3.1);
      drawFarTrees(farTrees, 0.34, '#5f9d68', '#6aa874');
      drawHills(0.5, 52, '#6bb36b', 22, 10, 5.0);
      drawFarTrees(midTrees, 0.58, '#3f8a52', '#4a9a5c');
      drawCity();
      drawGround();
    } else drawLocBack();

    setCam(1);
    var x0 = camX - 140, x1 = camX + vw + 140, i;
    for (i = 0; i < ((p5.on || p6.on) ? 0 : rocks.length); i++) if (rocks[i].x > x0 && rocks[i].x < x1) rock(rocks[i].x, rocks[i].s);
    for (i = 0; i < ((p5.on || p6.on) ? 0 : trees.length); i++) {
      var tr = trees[i];
      if (tr.x < x0 || tr.x > x1) continue;
      if (tr.type === 'birch') birch(tr.x, tr.h, tr.seed);
      else if (tr.type === 'pine') pine(tr.x, tr.h);
      else oak(tr.x, tr.h, tr.seed);
    }
    for (i = 0; i < ((p5.on || p6.on) ? 0 : bushes.length); i++) if (bushes[i].x > x0 && bushes[i].x < x1) bush(bushes[i].x, bushes[i].s);
    if (loc.i === 0) {
      if (SHOP_X + SHOP_W + 80 > camX && SHOP_X - 20 < camX + vw) drawShop();
      if (UP_X + UP_W + 80 > camX && UP_X - 20 < camX + vw) drawGarage();
      if (BB_X + BB_W + 60 > camX && BB_X - 20 < camX + vw) drawBillboard();
      if (WASH_X + WASH_W + 40 > camX && WASH_X - 20 < camX + vw) drawWash();
      for (i = 0; i < ALL_STOPS.length; i++) if (ALL_STOPS[i].x + 90 > camX && ALL_STOPS[i].x - 90 < camX + vw) drawStop(ALL_STOPS[i]);
      for (i = 0; i < FUEL.length; i++) if (FUEL[i].x + 130 > camX && FUEL[i].x - 130 < camX + vw) drawFuel(FUEL[i]);
      drawGates();
    } else drawLocFront();
    if (!p5.on && !p6.on) { drawBins(); drawWools(); drawBottles(); drawCrate(); drawSquirrels(); }
    drawPets(); drawCollector();
    drawBus();
    drawOwnBus(); drawAvCraft();
    drawNetPlayers();
    drawBossGround();
    drawKraken();
    drawNpcs();
    drawForestCollector();
    drawResc();
    drawSciFollower();
    drawFinWorld();
    drawP5();
    drawP6();
    drawMoggers(); drawMb(); skDraw();
    drawPlayer(); drawDownHud();
    drawMyBoat(); drawFishLine(); drawBubbles();
    drawBoss();
    drawEp();
    drawMg();
    drawBossAir();
    drawShots();
    drawKrFront();
    drawFx();
    drawPlane();
    drawPopups();
    drawAtm();
    drawNightOverlay();
    postFx.draw();
    drawShopHint();
    drawSpotHint();
    drawStormFx();
    drawSonar();
    drawCaveDark();
    drawEpHud();
    drawEpCine();
    drawMgHud();
    drawDnHud();
    drawGymHud();
    drawRitCine();
    drawFinCine();
    drawP5Hud();
    skHud();
    drawP6Hud();
    drawAvHud(); drawCab();
    drawCs();
  }

function shadeC(c, a) {
    var key = c + '|' + a, hit = _shc[key]; if (hit !== undefined) return hit;
    if (_shn > 3000) { _shc = {}; _shn = 0; }
    var res = shadeC0(c, a); _shc[key] = res; _shn++; return res;
  }

function shadeC0(c, a) {
    var m = /^#([0-9a-f]{6})$/i.exec(c); if (!m) return c;
    var n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(v) { return Math.max(0, Math.min(255, Math.round(a >= 0 ? v + (255 - v) * a : v * (1 + a)))); }
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }

function nightK() { try { return dnDark(dnU()); } catch (e) { return 0; } }

function drawCloud(x, y, s) {
    var g = ctx.createLinearGradient(0, y - 40 * s, 0, y + 28 * s), fs = ctx.fillStyle;
    g.addColorStop(0, 'rgba(255,255,255,.98)'); g.addColorStop(0.6, 'rgba(244,248,255,.96)'); g.addColorStop(1, 'rgba(178,196,224,.9)');
    ctx.save(); ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 26 * s, 0, 6.3); ctx.arc(x + 30 * s, y - 14 * s, 32 * s, 0, 6.3); ctx.arc(x + 64 * s, y - 4 * s, 28 * s, 0, 6.3);
    ctx.arc(x + 92 * s, y + 6 * s, 20 * s, 0, 6.3); ctx.arc(x - 24 * s, y + 8 * s, 18 * s, 0, 6.3); ctx.arc(x + 46 * s, y - 24 * s, 22 * s, 0, 6.3);
    ctx.rect(x - 24 * s, y + 4 * s, 116 * s, 24 * s); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(x + 26 * s, y - 22 * s, 14 * s, 0, 6.3); ctx.arc(x + 58 * s, y - 14 * s, 10 * s, 0, 6.3); ctx.fill();
    ctx.restore(); ctx.fillStyle = fs;
  }

function drawHills(par, base, color, a1, a2, ph) {
    setCam(par);
    var x0 = camX * par - 20, x1 = x0 + vw + 40, x, top = gY - base - a1 - a2 - 10;
    var g = ctx.createLinearGradient(0, top, 0, gY + 4); g.addColorStop(0, shadeC(color, 0.14)); g.addColorStop(0.45, color); g.addColorStop(1, shadeC(color, -0.16));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x0, gY + 4);
    for (x = x0; x <= x1; x += 12) ctx.lineTo(x, gY - base - wave(x, a1, 0.004, a2, 0.011, ph));
    ctx.lineTo(x1, gY + 4); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 2; ctx.beginPath();
    for (x = x0; x <= x1; x += 12) { var yy = gY - base - wave(x, a1, 0.004, a2, 0.011, ph) + 1.5; if (x === x0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); }
    ctx.stroke();
    var hz = ctx.createLinearGradient(0, gY - base - 30, 0, gY + 4); hz.addColorStop(0, 'rgba(220,235,255,0)'); hz.addColorStop(1, 'rgba(220,235,255,' + (0.12 + 0.1 * Math.min(1, par)) + ')');
    ctx.fillStyle = hz; ctx.fillRect(x0, gY - base - 30, x1 - x0, base + 34);
  }

function pineShape(x, y, h, c1, c2) {
    var w = h * 0.42, i, k;
    ctx.fillStyle = '#4e331f'; ctx.fillRect(x - h * 0.03, y - h * 0.18, h * 0.06, h * 0.18);
    for (i = 0; i < 4; i++) {
      var by = y - h * 0.1 - i * h * 0.21, tw = w * (1 - i * 0.2), th = h * 0.36, cc = i % 2 ? c2 : c1;
      var g = ctx.createLinearGradient(x - tw, 0, x + tw, 0); g.addColorStop(0, shadeC(cc, 0.12)); g.addColorStop(0.55, cc); g.addColorStop(1, shadeC(cc, -0.28));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - tw, by); ctx.quadraticCurveTo(x - tw * 0.4, by - th * 0.35, x, by - th); ctx.quadraticCurveTo(x + tw * 0.4, by - th * 0.35, x + tw, by); ctx.quadraticCurveTo(x, by + th * 0.1, x - tw, by); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.moveTo(x - tw * 0.8, by - 1); ctx.quadraticCurveTo(x, by + th * 0.08, x + tw * 0.8, by - 1); ctx.lineTo(x + tw * 0.6, by - 6); ctx.quadraticCurveTo(x, by - 2, x - tw * 0.6, by - 6); ctx.closePath(); ctx.fill();
    }
  }

function roundShape(x, y, h, c1, c2) {
    ctx.fillStyle = '#4e331f'; ctx.fillRect(x - h * 0.04, y - h * 0.42, h * 0.08, h * 0.42);
    var g = ctx.createRadialGradient(x - h * 0.1, y - h * 0.76, h * 0.03, x, y - h * 0.62, h * 0.36);
    g.addColorStop(0, shadeC(c2, 0.2)); g.addColorStop(0.55, c1); g.addColorStop(1, shadeC(c1, -0.3));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - h * 0.62, h * 0.31, 0, 6.3); ctx.arc(x - h * 0.2, y - h * 0.54, h * 0.18, 0, 6.3); ctx.arc(x + h * 0.2, y - h * 0.55, h * 0.19, 0, 6.3); ctx.fill();
    ctx.fillStyle = shadeC(c2, 0.1); ctx.beginPath(); ctx.arc(x - h * 0.1, y - h * 0.72, h * 0.14, 0, 6.3); ctx.fill();
  }

function leafCluster(cx, cy, r, base) {
    var g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r);
    g.addColorStop(0, shadeC(base, 0.22)); g.addColorStop(0.6, base); g.addColorStop(1, shadeC(base, -0.3));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.3); ctx.fill();
  }

function birch(x, h, seed) {
    var tw = h * 0.055, r = rng(Math.floor(seed)), cy = gY - h * 0.78, greens = ['#6bb542', '#7fc84f', '#5aa237'], i;
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, h * 0.2, 6, 0, 0, 6.3); ctx.fill();
    for (i = 0; i < 4; i++) { ctx.strokeStyle = '#d9d6c8'; ctx.lineWidth = tw * 0.4; ctx.beginPath(); ctx.moveTo(x, gY - h * (0.5 + i * 0.1)); ctx.lineTo(x + (i % 2 ? 1 : -1) * h * 0.12, gY - h * (0.66 + i * 0.07)); ctx.stroke(); }
    var gx = ctx.createLinearGradient(x - tw / 2, 0, x + tw / 2, 0); gx.addColorStop(0, '#fbfaf2'); gx.addColorStop(0.6, '#e9e6d6'); gx.addColorStop(1, '#bdb9a6');
    ctx.fillStyle = gx; ctx.fillRect(x - tw / 2, gY - h * 0.9, tw, h * 0.9);
    ctx.fillStyle = '#2b2b2b'; var r2 = rng(Math.floor(seed) + 5);
    for (var j = 0; j < 9; j++) { var yy = gY - h * (0.08 + r2() * 0.72), ww = tw * (0.3 + r2() * 0.55), side = r2() < 0.5 ? -tw / 2 : tw / 2 - ww; ctx.fillRect(x + side, yy, ww, 3 + r2() * 3); }
    for (i = 0; i < 11; i++) { var ang = r() * 6.28, rad = r() * h * 0.2; leafCluster(x + Math.cos(ang) * rad * 1.15, cy + Math.sin(ang) * rad * 0.9, h * (0.1 + r() * 0.07), greens[i % 3]); }
  }

function pine(x, h) { pineShape(x, gY, h, '#2f6b3a', '#3b8247'); }

function oak(x, h, seed) {
    var tw = h * 0.09, r = rng(Math.floor(seed)), i;
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, h * 0.3, 7, 0, 0, 6.3); ctx.fill();
    var gt = ctx.createLinearGradient(x - tw, 0, x + tw, 0); gt.addColorStop(0, '#7b573a'); gt.addColorStop(0.6, '#6a4a2f'); gt.addColorStop(1, '#43301f');
    ctx.fillStyle = gt; ctx.beginPath(); ctx.moveTo(x - tw * 0.9, gY); ctx.quadraticCurveTo(x - tw * 0.5, gY - h * 0.2, x - tw * 0.5, gY - h * 0.5); ctx.lineTo(x + tw * 0.5, gY - h * 0.5); ctx.quadraticCurveTo(x + tw * 0.5, gY - h * 0.2, x + tw * 0.9, gY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#5a3f28'; ctx.lineWidth = tw * 0.32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, gY - h * 0.45); ctx.lineTo(x - h * 0.16, gY - h * 0.62); ctx.moveTo(x, gY - h * 0.5); ctx.lineTo(x + h * 0.15, gY - h * 0.64); ctx.stroke(); ctx.lineCap = 'butt';
    var cy = gY - h * 0.7, cols = ['#4f9a38', '#5fae43', '#46882f'];
    for (i = 0; i < 11; i++) leafCluster(x + (r() - 0.5) * h * 0.58, cy + (r() - 0.5) * h * 0.34, h * (0.13 + r() * 0.08), cols[i % 3]);
  }

function bush(x, s, bry) {
    var y = gY + 2, g = ctx.createRadialGradient(x - 4 * s, y - 20 * s, 2, x, y - 10 * s, 32 * s);
    g.addColorStop(0, '#6dbf4a'); g.addColorStop(0.6, '#3f8a2a'); g.addColorStop(1, '#2c6a1e');
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 30 * s, 5 * s, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 12 * s, 16 * s, 0, 6.3); ctx.arc(x + 20 * s, y - 10 * s, 13 * s, 0, 6.3); ctx.arc(x - 20 * s, y - 9 * s, 12 * s, 0, 6.3); ctx.arc(x - 3 * s, y - 18 * s, 12 * s, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.arc(x - 6 * s, y - 20 * s, 8 * s, 0, 6.3); ctx.fill();
    if (bry === undefined ? (((x * 7) | 0) % 3 === 0) : bry) { ctx.fillStyle = '#e8454f'; for (var b = 0; b < 4; b++) { ctx.beginPath(); ctx.arc(x - 12 * s + b * 9 * s, y - (8 + (b % 2) * 8) * s, 2.2 * s, 0, 6.3); ctx.fill(); } }
  }

function rock(x, s) {
    var g = ctx.createLinearGradient(x - 22 * s, gY - 22 * s, x + 24 * s, gY + 3); g.addColorStop(0, '#b3b7c0'); g.addColorStop(0.5, '#8b8f98'); g.addColorStop(1, '#5d616b');
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x + 2 * s, gY + 3, 28 * s, 5 * s, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 22 * s, gY + 3); ctx.quadraticCurveTo(x - 20 * s, gY - 22 * s, x, gY - 20 * s); ctx.quadraticCurveTo(x + 22 * s, gY - 18 * s, x + 24 * s, gY + 3); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(40,44,52,.4)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 4 * s, gY - 19 * s); ctx.lineTo(x - 8 * s, gY - 6 * s); ctx.lineTo(x - 2 * s, gY + 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.ellipse(x - 6 * s, gY - 13 * s, 8 * s, 4 * s, -0.4, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(86,150,60,.7)'; ctx.beginPath(); ctx.ellipse(x + 12 * s, gY - 2 * s, 9 * s, 3 * s, 0, 0, 6.3); ctx.fill();
  }

function sprite(key, up, half, down, fn) {
    var r = Math.min(dpr * scale, 1.5);
    if (SPR.res !== r) { SPR.map.clear(); SPR.bytes = 0; SPR.res = r; }
    var sp = SPR.map.get(key);
    if (sp) { SPR.map.delete(key); SPR.map.set(key, sp); return sp; }
    var w = Math.max(2, Math.ceil(half * 2 * r)), hh = Math.max(2, Math.ceil((up + down) * r));
    if (w * hh > 4e6) return null;
    var c = document.createElement('canvas'); c.width = w; c.height = hh;
    var g = c.getContext('2d'); if (!g) return null;
    var oc = ctx, og = gY;
    ctx = g; gY = up; g.setTransform(r, 0, 0, r, 0, 0);
    try { fn(half); } catch (e) { ctx = oc; gY = og; return null; }
    ctx = oc; gY = og;
    sp = { c: c, up: up, half: half, down: down, b: w * hh * 4 };
    SPR.map.set(key, sp); SPR.bytes += sp.b;
    while (SPR.bytes > SPR.max && SPR.map.size > 1) {
      var k0 = SPR.map.keys().next().value, e0 = SPR.map.get(k0); SPR.map.delete(k0); SPR.bytes -= e0.b;
    }
    return sp;
  }

function blit(sp, x) { ctx.drawImage(sp.c, x - sp.half, gY - sp.up, sp.half * 2, sp.up + sp.down); }

function drawGround() {
    setCam(1);
    var x0 = camX - 10, x1 = camX + vw + 10, i, j;
    ctx.fillStyle = dirtPat; ctx.fillRect(x0, gY + 18, x1 - x0, H / scale);
    var dg = ctx.createLinearGradient(0, gY + 18, 0, gY + 140); dg.addColorStop(0, 'rgba(0,0,0,0)'); dg.addColorStop(1, 'rgba(10,6,0,.5)'); ctx.fillStyle = dg; ctx.fillRect(x0, gY + 18, x1 - x0, 140);
    ctx.fillStyle = 'rgba(255,255,255,.1)';
    for (i = Math.floor(x0 / 83); i * 83 < x1; i++) { ctx.beginPath(); ctx.ellipse(i * 83 + (i * 31) % 40, gY + 44 + (i * 57) % 60, 6 + (i % 4) * 2, 3, 0, 0, 6.3); ctx.fill(); }
    var gg = ctx.createLinearGradient(0, gY - 4, 0, gY + 22); gg.addColorStop(0, '#68c448'); gg.addColorStop(0.5, '#4e9b34'); gg.addColorStop(1, '#357a24');
    ctx.fillStyle = gg; ctx.fillRect(x0, gY - 2, x1 - x0, 24);
    ctx.fillStyle = '#2f6e20'; ctx.fillRect(x0, gY + 18, x1 - x0, 4);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x0, gY - 2, x1 - x0, 2);
    for (i = 0; i < tufts.length; i++) {
      var f = tufts[i];
      if (f.x < x0 - 10 || f.x > x1 + 10 || (loc.i === 0 && f.x < CITY_END)) continue;
      var sw = Math.sin(t * 2 + f.x * 0.05) * 2;
      ctx.fillStyle = (i % 2) ? '#6cc048' : '#58ad3d';
      ctx.beginPath(); ctx.moveTo(f.x - 4, gY - 1); ctx.quadraticCurveTo(f.x - 1, gY - f.h * 0.6, f.x + sw, gY - f.h); ctx.quadraticCurveTo(f.x + 1, gY - f.h * 0.5, f.x + 4, gY - 1); ctx.fill();
    }
    for (j = 0; j < flowers.length; j++) {
      var fl = flowers[j];
      if (fl.x < x0 - 10 || fl.x > x1 + 10 || (loc.i === 0 && fl.x < CITY_END)) continue;
      ctx.fillStyle = '#3b7f28'; ctx.fillRect(fl.x - 0.7, gY - fl.h, 1.4, fl.h);
      ctx.fillStyle = fl.c; for (var p = 0; p < 5; p++) { var pa = p * 1.2566 + t * 0.4; ctx.beginPath(); ctx.arc(fl.x + Math.cos(pa) * 2.6, gY - fl.h + Math.sin(pa) * 2.6, 1.9, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(fl.x, gY - fl.h, 1.5, 0, 6.3); ctx.fill();
    }
    if (loc.i === 0) drawCityGround(x0, x1);
  }

function winLit(i, r, c, nk) { var h = (i * 7 + r * 13 + c * 5) % 9; return nk > 0.25 ? h < 5 : h === 0; }

function paintWindow(x, y, w, h, lit, nk) {
    if (lit) {
      ctx.fillStyle = '#ffd987'; ctx.fillRect(x, y, w, h);
      if (nk > 0.25) { ctx.fillStyle = 'rgba(255,210,120,' + (0.18 * nk).toFixed(2) + ')'; ctx.fillRect(x - 3, y - 3, w + 6, h + 6); }
    } else {
      ctx.fillStyle = nk > 0.25 ? '#242f4d' : '#a6d2ea'; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(x + 1, y + 1, w * 0.35, h - 2);
    }
    ctx.fillStyle = 'rgba(30,40,60,.35)'; ctx.fillRect(x, y + h - 2, w, 2);
  }

function drawBuilding(bx, bw, bh, col, i, cellW, cellH, nk, roofKind) {
    var g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, shadeC(col, 0.1)); g.addColorStop(0.7, col); g.addColorStop(1, shadeC(col, -0.22));
    ctx.fillStyle = g; ctx.fillRect(bx, gY - bh, bw, bh + 4);
    ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(bx, gY - bh, bw, 5);
    ctx.fillStyle = shadeC(col, -0.3); ctx.fillRect(bx - 2, gY - bh - 6, bw + 4, 7);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; for (var k = 1; k < 5; k++) ctx.fillRect(bx, gY - bh + k * (bh / 5), bw, 1.5);
    var rows = Math.floor((bh - 50) / cellH), cols = Math.floor((bw - 14) / cellW), r, c;
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) paintWindow(bx + 8 + c * cellW, gY - bh + 22 + r * cellH, cellW - 9, cellH - 12, winLit(i, r, c, nk), nk);
    // крыша: антенна, бак или кондиционеры
    if (roofKind % 3 === 0) { ctx.strokeStyle = '#3b4250'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx + bw * 0.3, gY - bh - 6); ctx.lineTo(bx + bw * 0.3, gY - bh - 34); ctx.stroke(); if (Math.sin(t * 4 + i) > 0) { ctx.fillStyle = '#ff4040'; ctx.beginPath(); ctx.arc(bx + bw * 0.3, gY - bh - 35, 2.4, 0, 6.3); ctx.fill(); } }
    else if (roofKind % 3 === 1) { ctx.fillStyle = shadeC(col, -0.4); ctx.fillRect(bx + bw * 0.55, gY - bh - 22, bw * 0.26, 16); ctx.fillRect(bx + bw * 0.58, gY - bh - 28, bw * 0.2, 6); }
    else { ctx.fillStyle = '#7a8392'; ctx.fillRect(bx + 10, gY - bh - 14, 18, 8); ctx.fillRect(bx + 34, gY - bh - 12, 14, 6); }
    // вход
    ctx.fillStyle = shadeC(col, -0.45); ctx.fillRect(bx + bw / 2 - 11, gY - 34, 22, 34); ctx.fillStyle = 'rgba(255,225,150,' + (0.3 + 0.5 * nk).toFixed(2) + ')'; ctx.fillRect(bx + bw / 2 - 8, gY - 31, 16, 18);
  }

function drawCity() {
    setCam(1);
    var x0 = camX - 20, x1 = Math.min(camX + vw + 20, CITY_END), nk = nightK();
    if (x1 <= x0) return;
    var cols = ['#9aa6b8', '#b8a99a', '#8e9bb0', '#a9b3a0', '#b4a0a8'], bx = -40, i = 0;
    while (bx < x1) {
      var rw = 90 + ((i * 53) % 70), bh = 210 + ((i * 97) % 130);
      if (bx + rw > CITY_END) rw = CITY_END - bx;
      if (bx + rw > x0 && rw > 4) drawBuilding(bx, rw, bh, cols[i % 5], i, 24, 30, nk, i);
      bx += rw; i++;
    }
    var sx = CITY_END - 160;
    if (sx > x0 - 100 && sx < x1 + 100) {
      ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 60, gY - 70, 5, 70); ctx.fillRect(sx + 55, gY - 70, 5, 70);
      var sg = ctx.createLinearGradient(0, gY - 102, 0, gY - 66); sg.addColorStop(0, '#2a62cc'); sg.addColorStop(1, '#1a3f94'); ctx.fillStyle = sg; rrect(sx - 74, gY - 102, 148, 36, 6); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('ВЫЕЗД ИЗ ГОРОДА', sx, gY - 84);
    }
  }
