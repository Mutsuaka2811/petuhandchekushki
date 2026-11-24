/* defs · 203 declarations · function renderFshop() { document.getElementById('fsCoins').textContent = save.coins.toLocaleString('ru-RU'); var h = '' */

function renderFshop() {
    document.getElementById('fsCoins').textContent = save.coins.toLocaleString('ru-RU');
    var h = '', fs = save.fs, i;
    h += '<div class="fssec">Лодка</div>';
    if (!fs.boat) h += '<div class="fsrow"><div class="fsi"><b>Рыбацкая лодка</b><div class="fsd">Стоит у причала справа. С ней можно выйти в Открытое море: там крупная рыба и секреты.</div></div><button type="button" data-fa="boat" class="fsb' + (save.coins >= BOAT_PRICE ? '' : ' no') + '">' + fmtN(BOAT_PRICE) + '</button></div>';
    else h += '<div class="fsrow"><div class="fsi"><b>Рыбацкая лодка</b> <span class="fsl">куплена</span><div class="fsd">Ждёт у причала справа. Подойди и нажми «В море».</div></div><button type="button" class="fsb" disabled>✓</button></div>';
    if (!fs.harp) h += '<div class="fsrow"><div class="fsi"><b>Гарпун для лодки</b><div class="fsd">' + (fs.boat ? 'Мощное оружие против Кракена в шторм: бросок гарпуна с лодки сильнее чекушек, с перезарядкой.' : 'Сначала купи лодку.') + '</div></div><button type="button" data-fa="harp" class="fsb' + (fs.boat && save.coins >= HARP_PRICE ? '' : ' no') + '">' + fmtN(HARP_PRICE) + '</button></div>';
    else h += '<div class="fsrow"><div class="fsi"><b>Гарпун для лодки</b> <span class="fsl">куплен</span><div class="fsd">Во время боя с Кракеном стреляй на ' + (touch ? 'кнопку «Гарпун»' : 'H') + '.</div></div><button type="button" class="fsb" disabled>✓</button></div>';
    h += '<div class="fssec">Подводная лодка</div>';
    if (fs.sub) h += fs.tp ? '<div class="fsrow"><div class="fsi"><b>Торпеда для Ктулху</b> <span class="fsl">куплена</span><div class="fsd">Бей Ктулху на ' + (touch ? 'кнопку «Торпеда»' : 'H') + ' в подводном бою.</div></div><button type="button" class="fsb" disabled>✓</button></div>' : '<div class="fsrow"><div class="fsi"><b>Торпеда для Ктулху</b><div class="fsd">' + ((save.mx.lr & 8) && fs.sd >= 3 ? 'Мощный залп для подлодки: чекушки Ктулху почти не берут, а торпеда да.' : 'Мастер говорит: «Нужна запись про Глубинное сокровище из секретной лаборатории и подлодка с глубиной 500 м».') + '</div></div><button type="button" data-fa="tp" class="fsb' + ((save.mx.lr & 8) && fs.sd >= 3 && save.coins >= TORP_PRICE ? '' : ' no') + '">' + fmtN(TORP_PRICE) + '</button></div>';
    if (!fs.sub) {
      var miss = SUB_PRICE - save.coins;
      h += '<div class="fsrow"><div class="fsi"><b>Подводная лодка</b><div class="fsd">Можно погружаться и всплывать, исследовать дно, собирать жемчуг. Стоит у второго места на причале. Цена ' + fmtN(SUB_PRICE) + ' коинов' + (miss > 0 ? ', тебе не хватает ' + fmtN(miss) : '') + '.</div></div><button type="button" data-fa="sub" class="fsb' + (miss > 0 ? ' no' : '') + '">' + (miss > 0 ? 'Не хватает ' + fmtN(miss) : fmtN(SUB_PRICE)) + '</button></div>';
    } else h += '<div class="fsrow"><div class="fsi"><b>Подводная лодка</b> <span class="fsl">куплена</span><div class="fsd">Навсегда твоя. Стоит у причала, садись и ныряй. В воде: ▲ вверх, ▼ вниз.</div></div><button type="button" class="fsb" disabled>✓</button></div>';
    if (fs.sub) h += subUpRow('sd') + subUpRow('sh') + subUpRow('ss');
    h += '<div class="fssec">Снасти</div>';
    h += fsRow('Удочка: ' + ROD_NAMES[fs.rod], fs.rod, 5, 'Зелёная полоса при вытягивании рыбы шире: ' + Math.round(catchSize() * 100) + '%' + (fs.rod < 5 ? ' → ' + Math.round((0.2 + 0.04 * (fs.rod + 1)) * 100) + '%' : '') + '. Для редчайшей рыбы нужна удочка не ниже «Карбон».', 'rod');
    h += fsRow('Катушка', fs.reel, 4, 'Шкала вытягивания растёт быстрее и убывает медленнее.', 'reel');
    h += fsRow('Наживка', fs.bait, 4, 'Клюёт чаще на ' + (fs.bait * 10) + '% → ' + ((fs.bait + 1) * 10) + '%, редкая рыба попадается охотнее.', 'bait');
    h += fsRow('Мотор лодки', fs.motor, 4, 'Скорость лодки ×' + (0.85 * (1 + 0.3 * fs.motor)).toFixed(2).replace('.', ',') + ' от бега.', 'motor', fs.boat ? '' : 'Сначала купи лодку.');
    h += '<div class="fssec">Улов в сумке: ' + fishTotal() + '</div>';
    var any = false;
    var rawV = fishValue(false), rr = rawV > 0 ? fishPayout(rawV) / rawV : 1;
    for (i = 0; i < FISH.length; i++) { var f = FISH[i]; if (save.fb[f.id] > 0) { any = true; h += '<div class="fsbag"><canvas data-fid="' + f.id + '"></canvas><span>' + f.n + ' ×' + save.fb[f.id] + ' (' + fmtN(f.pr) + ' за штуку)</span><b>' + fmtN(f.secret ? save.fb[f.id] * f.pr : Math.round(save.fb[f.id] * f.pr * rr)) + '</b></div>'; } }
    if (!any) h += '<div class="fsd">Пока пусто. Закинь удочку с причала.</div>';
    var v = fishPayout(fishValue(false)), fm = fishMult();
    if (fm < 0.995) h += '<div class="fsd">Рынок перенасыщен: сейчас дают ' + Math.round(fm * 100) + '% от цены. Подожди или продавай понемногу.</div>';
    h += '<button type="button" data-fa="sell" class="flbuy' + (v > 0 ? '' : ' no') + '">Продать весь улов' + (v > 0 ? ' за ' + fmtN(v) : '') + '</button>';
    if (save.fb.google > 0) h += '<button type="button" data-fa="sellg" class="flbuy">' + (fsSure ? 'Точно продать Гугл-фиш за ' : 'Продать Гугл-фиш за ') + fmtN(FISH_BY.google.pr * save.fb.google) + (fsSure ? '? Он такой один…' : ' (его не продаёт «весь улов»)') + '</button>';
    h += '<div class="fssec">Коллекция</div><div class="fscol">';
    for (i = 0; i < FISH.length; i++) { var g = FISH[i], known = !!save.fc[g.id]; h += '<div class="fscell' + (known ? '' : ' un') + '"><canvas data-cid="' + g.id + '"></canvas><span>' + (known || !g.secret ? (known ? g.n : '???') : '???') + '</span><i>' + (known ? '×' + save.fc[g.id] : '') + '</i></div>'; }
    h += '</div>';
    elFsBody.innerHTML = h;
    var cs = elFsBody.querySelectorAll('canvas[data-fid]'), j;
    for (j = 0; j < cs.length; j++) { var ic = fishIcon(cs[j].getAttribute('data-fid'), 56, 32, true); cs[j].replaceWith(ic); }
    cs = elFsBody.querySelectorAll('canvas[data-cid]');
    for (j = 0; j < cs.length; j++) { var id2 = cs[j].getAttribute('data-cid'); cs[j].replaceWith(fishIcon(id2, 56, 32, !!save.fc[id2])); }
  }

function openFshop() { fsSure = false; renderFshop(); fshopOpen = true; elFs.hidden = false; syncPause(); }

function closeFshop() { fshopOpen = false; elFs.hidden = true; syncPause(); }

function fishMode() {
    if (paused || ob.on || av.on || bus.on || ride.id || boss.on || lt.st || trip.inn) return '';
    if (loc.i === 5 && kk.on) return '';
    if (loc.i === 5) return sea.veh === 'sub' ? (P.x < 330 && sub.d < 24 ? 'subout' : '') : 'fish';
    if (loc.i !== 4 || P.z > 70) return '';
    if (Math.abs(P.x - SHOP_FX) < 130) return 'fshop';
    if (Math.abs(P.x - SUB_X) < 90) return 'subgo';
    if (save.fs.boat && Math.abs(P.x - BOAT_X) < 90) return 'sail';
    if (P.x > PIER_FISH_X) return 'fish';
    return '';
  }

function fishAct() {
    var m = fishMode(); if (!m) return false;
    if (m === 'fshop') openFshop(); else if (m === 'sail') sailGo('boat'); else if (m === 'subgo') subGo(); else if (m === 'subout') seaReturn(); else fishStart();
    return true;
  }

function sailGo(veh) {
    if (lt.st) return;
    sea.veh = veh; sub.d = 0; sub.vy = 0; sub.px = 300;
    lt.st = 'out'; lt.t = 0; lt.dest = 5; lt.side = 'left'; lt.atX = 300; sfx('jump');
  }

function seaReturn() { if (lt.st) return; lt.st = 'out'; lt.t = 0; lt.dest = 4; lt.side = 'right'; lt.atX = (sea.veh === 'sub' ? SUB_X : BOAT_X) - 10; sfx('jump'); }

function subGo() {
    if (!save.fs.sub) { openFshop(); return; }
    sailGo('sub');
  }

function fishHintMsg(m) {
    if (m === 'fshop') return touch ? 'Жми «Лавка рыбака»' : 'Нажми E: лавка рыбака';
    if (m === 'sail') return touch ? 'Жми «В море»' : 'Нажми E: выйти в море на лодке';
    if (m === 'subgo') return save.fs.sub ? (touch ? 'Жми «Подлодка»' : 'Нажми E: сесть в подлодку') : (touch ? 'Жми «Подлодка»: ' : 'Нажми E: ') + 'подлодка ' + fmtN(SUB_PRICE) + ' коинов';
    if (m === 'subout') return touch ? 'Жми «Причалить»' : 'Нажми E: причалить и выйти';
    var sp = seaHere();
    if (sp === 'rip') return 'Радужная рябь! ' + (touch ? 'Жми «Рыбачить»' : 'Нажми E: рыбачить');
    if (sp === 'shoal') return 'Косяк рыбы! ' + (touch ? 'Жми «Рыбачить»' : 'Нажми E: рыбачить');
    return touch ? 'Жми «Рыбачить»' : 'Нажми E: рыбачить';
  }

function updateFishing(dt) {
    if (loc.i !== 5) return;
    if (rip.on) { rip.left -= dt; if (rip.left <= 0) rip.on = 0; }
    else { rip.cd -= dt; if (rip.cd <= 0) { rip.on = 1; rip.left = 75; rip.x = 700 + Math.random() * (LOCS[5].w - 1400); rip.cd = 200 + Math.random() * 240; } }
  }

function drawBoatAt(x, f, dy, owned) {
    var by = gY + (dy || 0) + Math.sin(t * 2.2 + x * 0.013) * 2;
    ctx.save(); ctx.translate(x, by); ctx.scale(f >= 0 ? 1 : -1, 1);
    ctx.fillStyle = '#4a4f5a'; ctx.fillRect(-96, -22, 12, 26); ctx.fillRect(-100, -26, 20, 6);
    ctx.fillStyle = '#c0452c'; ctx.beginPath(); ctx.moveTo(-84, -14); ctx.lineTo(88, -20); ctx.quadraticCurveTo(72, 26, 22, 28); ctx.lineTo(-58, 28); ctx.quadraticCurveTo(-86, 22, -84, -14); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#7a2d1d'; ctx.fillRect(-86, -18, 176, 7);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-80, -2); ctx.lineTo(84, -8); ctx.stroke();
    ctx.fillStyle = 'rgba(40,160,210,.6)'; ctx.fillRect(-100, 16, 200, 16);
    ctx.fillStyle = 'rgba(255,255,255,.65)';
    for (var q = -3; q <= 3; q++) { ctx.beginPath(); ctx.ellipse(q * 28 + Math.sin(t * 3 + q) * 4, 17, 14, 3, 0, 0, 6.3); ctx.fill(); }
    ctx.restore();
    if (owned === false) {
      var tx = x, ty = by - 48;
      ctx.fillStyle = 'rgba(20,35,63,.9)'; rrect(tx - 80, ty - 28, 160, 40, 8); ctx.fill();
      ctx.fillStyle = '#ffe14a'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🛥 Продаётся: ' + fmtN(BOAT_PRICE), tx, ty - 15); ctx.fillStyle = '#fff'; ctx.fillText('в лавке рыбака', tx, ty);
    }
  }

function drawMyBoat() { if (loc.i !== 5 || av.on) return; if (sea.veh === 'sub') drawSubAt(P.x, gY + sub.d, P.face, true, sub.vy); else drawBoatAt(P.x, P.face, 0, true); }

function drawFishLine() {
    if (!fsh.open || (fsh.st !== 'wait' && fsh.st !== 'bite' && fsh.st !== 'fight')) return;
    var sx = P.x + P.face * 34, sy = gY - 74, ex = P.x + P.face * 120, ey = gY + 26 + (fsh.st === 'bite' ? 8 : 0);
    ctx.strokeStyle = '#6b4a2b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(P.x + P.face * 6, gY - 40); ctx.lineTo(sx + P.face * 30, sy - 22); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(sx + P.face * 30, sy - 22); ctx.quadraticCurveTo(sx + P.face * 80, sy, ex, ey); ctx.stroke();
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(ex, ey, 5, 0, 6.3); ctx.fill();
  }

function drawPier(x0, x1) {
    var a = Math.max(x0, LAG_X), b = Math.min(x1, WORLD_W), i, hh = H / scale;
    if (a >= b) return;
    var g = ctx.createLinearGradient(0, gY, 0, gY + 160); g.addColorStop(0, '#3fc9dc'); g.addColorStop(1, '#0d86b3');
    ctx.fillStyle = g; ctx.fillRect(a, gY + 8, b - a, hh);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    if (LAG_X > x0 - 30 && LAG_X < x1 + 30) for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(LAG_X + 4, gY + 14 + i * 18, 14, 4, 0, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2;
    for (i = Math.floor(a / 80); i * 80 < b; i++) for (var w = 0; w < 4; w++) { var wx = i * 80 + w * 23 + Math.sin(t + i + w) * 8, wy = gY + 40 + w * 30; if (wx > a && wx < b) { ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 12, wy - 4, wx + 26, wy); ctx.stroke(); } }
    ctx.fillStyle = '#5b3d22';
    for (i = Math.floor(a / 120); i * 120 < b; i++) { var px = i * 120 + 40; if (px > a && px < b) { ctx.fillRect(px - 5, gY + 8, 10, 74); } }
    ctx.fillStyle = 'rgba(40,160,210,.45)'; ctx.fillRect(a, gY + 44, b - a, 40);
    drawBay(a, b);
    ctx.fillStyle = '#9a6a3a'; ctx.fillRect(a, gY - 2, b - a, 14);
    ctx.fillStyle = '#c28a52'; ctx.fillRect(a, gY - 3, b - a, 4);
    ctx.fillStyle = 'rgba(60,35,15,.5)';
    for (i = Math.floor(a / 36); i * 36 < b; i++) if (i * 36 >= a) ctx.fillRect(i * 36, gY - 2, 2, 14);
  }

function drawFishShopHut(x) {
    var y = gY - 2;
    ctx.fillStyle = '#e8d3a2'; ctx.fillRect(x - 64, y - 82, 128, 82);
    ctx.fillStyle = '#c9ab6e'; for (var k = 0; k < 6; k++) ctx.fillRect(x - 64 + k * 22 + 10, y - 82, 2, 82);
    ctx.fillStyle = '#2f86a8'; ctx.beginPath(); ctx.moveTo(x - 80, y - 78); ctx.lineTo(x, y - 128); ctx.lineTo(x + 80, y - 78); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1d6483'; ctx.fillRect(x - 80, y - 82, 160, 8);
    ctx.fillStyle = '#6b4a2b'; ctx.fillRect(x - 18, y - 56, 36, 56);
    ctx.fillStyle = '#4aa3bd'; ctx.fillRect(x + 28, y - 62, 26, 22);
    ctx.fillStyle = '#fff'; rrect(x - 46, y - 112, 92, 22, 6); ctx.fill();
    ctx.fillStyle = '#1f4aa8'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🎣 РЫБАК', x, y - 101);
    ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 60, y - 70); ctx.lineTo(x - 60, y - 40); ctx.stroke();
    fishArt(ctx, 'perch', x - 60, y - 30, 30, t, false);
  }

function drawPierSign() {
    var sx = 3860;
    ctx.fillStyle = '#4a5360'; ctx.fillRect(sx - 3, gY - 90, 6, 90);
    ctx.fillStyle = '#1f4aa8'; rrect(sx - 64, gY - 124, 128, 36, 7); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🎣 Рыбалка', sx, gY - 114); ctx.fillText('с причала', sx, gY - 99);
  }

function drawSeaBack() {
    var x0 = camX - 10, x1 = camX + vw + 10, i, wv, hh = H / scale;
    drawHills(0.12, 80, '#9fe6d6', 8, 6, 2.1);
    setCam(1);
    seaWater(x0, x1);
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2;
    for (i = Math.floor(x0 / 80) - 1; camY < 260 && i * 80 < x1; i++) for (wv = 0; wv < 7; wv++) {
      var wx = i * 80 + wv * 29 + Math.sin(t * 0.9 + i + wv) * 12, wy = gY - 50 + wv * 34 + (wv % 2) * 8;
      ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 14, wy - 5, wx + 30, wy); ctx.stroke();
    }
    var L = LOCS[5];
    if (GX) gxSeaZone(x0, x1); else {
    if (ZONE2_X > x0 - 120 && ZONE2_X < x1 + 120 && camY < 300) { // граница глубокого океана
      for (i = 0; i < 5; i++) { var zb = gY + 20 + i * 20; ctx.fillStyle = i % 2 ? '#fff' : '#e5484d'; ctx.beginPath(); ctx.arc(ZONE2_X + (i % 2) * 12, zb + Math.sin(t * 2 + i) * 2, 9, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#4a5360'; ctx.fillRect(ZONE2_X - 3, gY - 100, 6, 100); ctx.fillStyle = '#12306a'; rrect(ZONE2_X - 112, gY - 150, 224, 52, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Глубокий океан ▶', ZONE2_X, gY - 134); ctx.fillText('впадина 500 м · шторм чаще', ZONE2_X, gY - 114);
    }
    }
    for (i = 0; camY < 200 && i < shoals.length; i++) {
      var s = shoals[i]; if (s.x < x0 - 160 || s.x > x1 + 160) continue;
      ctx.fillStyle = 'rgba(8,60,110,.22)'; ctx.beginPath(); ctx.ellipse(s.x, gY + 52, 130, 26, 0, 0, 6.3); ctx.fill();
      for (var q = 0; q < 6; q++) { var fx = s.x + Math.sin(t * 0.8 + s.ph + q * 1.3) * 90, fy = gY + 42 + Math.cos(t * 1.1 + q * 2.1 + s.ph) * 14; ctx.fillStyle = 'rgba(210,235,250,.65)'; ctx.beginPath(); ctx.ellipse(fx, fy, 10, 4, 0, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.moveTo(fx - 9, fy); ctx.lineTo(fx - 16, fy - 4); ctx.lineTo(fx - 16, fy + 4); ctx.fill(); }
    }
    if (camY < 200 && rip.on && rip.x > x0 - 200 && rip.x < x1 + 200) {
      for (i = 0; i < 4; i++) {
        var ph = ((t * 0.5 + i * 0.25) % 1);
        ctx.strokeStyle = 'hsla(' + ((t * 90 + i * 70) % 360) + ',95%,65%,' + (0.8 - ph * 0.7) + ')'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(rip.x, gY + 46, 20 + ph * 120, 6 + ph * 22, 0, 0, 6.3); ctx.stroke();
      }
    }
    if (GX) gxSeaIsle(x0, x1); else {
    if (x0 < 300 && camY < 120) {
      ctx.fillStyle = '#f3e3b0'; ctx.beginPath(); ctx.ellipse(40, gY + 10, 260, 40, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#e4cf94'; ctx.fillRect(-220, gY + 10, 520, 16);
      palm(70, 200, 34, 1.3); palm(190, 160, -26, 4.4);
      ctx.fillStyle = '#4a5360'; ctx.fillRect(237, gY - 70, 6, 70);
      ctx.fillStyle = '#1f4aa8'; rrect(190, gY - 100, 100, 32, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('⚓ Причал', 240, gY - 84);
    }
    }
    if (GX) gxSeaEast(x0, x1); else {
    for (i = 0; i < 7; i++) { var bx = L.w - 120 - (i % 2) * 14, by2 = gY + 24 + i * 22; if (bx > x0 - 40 && bx < x1 + 40) { ctx.fillStyle = i % 2 ? '#fff' : '#e5484d'; ctx.beginPath(); ctx.arc(bx, by2 + Math.sin(t * 2 + i) * 2, 9, 0, 6.3); ctx.fill(); } }
    if (L.w - 120 > x0 - 100 && L.w - 120 < x1 + 100) {
      ctx.fillStyle = '#c22'; rrect(L.w - 200, gY - 110, 150, 36, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Дальше океан', L.w - 125, gY - 99); ctx.fillText('лодка не пройдёт', L.w - 125, gY - 84);
    }
    }
  }

function awInt(l) { return Math.max(1.2, 7.5 - 1.2 * l); }

function busWashing() { return bus.on && (bus.st === 'board' || bus.st === 'ride' || bus.st === 'drop'); }

function updateAutoWash(dt) {
    var inBus = busWashing();
    // в автобусе моется втрое быстрее, и даже без улучшения (как на 1 уровне)
    if (!save.autowash && !inBus) return;
    if (dirtyN() === 0) { aw.t = 0; return; }
    aw.t += dt;
    if (aw.t < awInt(Math.max(1, save.autowash)) / (inBus ? BUS_WASH_BOOST : 1)) return;
    aw.t = 0;
    for (var q = 5; q >= 0; q--) if (save.inv.d[q] > 0) { save.inv.d[q]--; save.inv.c[q]++; break; }
    persist(); hud(); sfx('wash');
    popup(P.x, PLAYER_H + 34, '\uD83D\uDCA7 помыта', '#9fe3ff');
  }

function labN() { return save.mx.lab[0] + save.mx.lab[1] + save.mx.lab[2]; }

function labValue() { return save.mx.lab[0] * LAB_KINDS[0].pr + save.mx.lab[1] * LAB_KINDS[1].pr + save.mx.lab[2] * LAB_KINDS[2].pr; }

function labPick(b) {
    var k = b.lab | 0, kd = LAB_KINDS[k];
    save.mx.lab[k]++; save.mx.lk[k]++; save.mx.ln++; persist(); hud(); sfx('rare');
    popup(b.x, BOTTLE_H + 20, '+1 ' + kd.n, kd.c);
    ach('lab');
    if (!labPick.t) { labPick.t = 1; toast('Образец! Такие чекушки не лежат на земле. Меллстрой платит за них: ' + LAB_KINDS.map(function (q) { return q.pr; }).join(' / ') + ' коинов.', 6000); }
  }

function labStock() {
    ach('cave');
    var m = save.mx, now = Date.now();
    if (m.labT && now - m.labT < LAB_RESTOCK) { if (!labStock.t) { labStock.t = 1; toast('Пещера. В конце коридора светится лаборатория.', 4000); } return; }
    for (var i = bottles.length - 1; i >= 0; i--) if (bottles[i].lab !== undefined) bottles.splice(i, 1);
    var kinds = [0, 0, 0, 1, 1, 2], xs = [1680, 1850, 2020, 2190, 2360, 2520];
    for (i = 0; i < kinds.length; i++) bottles.push({ x: xs[i], off: 0, ph: Math.random() * 6.28, r: 0, lab: kinds[i] });
    m.labT = now; persist();
    toast('Пещера. В конце коридора светится лаборатория: там новые виды чекушек.', 5000);
  }

function labSprite(k) {
    if (labSpr[k]) return labSpr[k];
    if (!ready(img.bottle)) return null;
    var w = img.bottle.naturalWidth, h = img.bottle.naturalHeight, c = document.createElement('canvas'); c.width = w; c.height = h;
    var g = c.getContext('2d'); g.drawImage(img.bottle, 0, 0); g.globalCompositeOperation = 'source-atop';
    g.fillStyle = 'rgba(' + LAB_KINDS[k].glow + ',.55)'; g.fillRect(0, 0, w, h);
    labSpr[k] = c; return c;
  }

function drawLabBottle(b) {
    var k = b.lab | 0, kd = LAB_KINDS[k], cx = b.x, cy = gY - BOTTLE_H / 2 - 4 + Math.sin(t * 2 + b.ph) * 4;
    var rad = 54, g = ctx.createRadialGradient(cx, cy, 4, cx, cy, rad);
    g.addColorStop(0, 'rgba(' + kd.glow + ',.85)'); g.addColorStop(1, 'rgba(' + kd.glow + ',0)');
    ctx.fillStyle = g; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    var sp = labSprite(k);
    if (sp) { var bw = BOTTLE_H * sp.width / sp.height; ctx.drawImage(sp, cx - bw / 2, cy - BOTTLE_H / 2, bw, BOTTLE_H); }
    ctx.fillStyle = kd.c;
    for (var i = 0; i < 3; i++) { var a = t * 1.8 + i * 2.1 + b.ph; sparkle(cx + Math.cos(a) * 22, cy + Math.sin(a * 1.3) * 24, 3 + Math.abs(Math.sin(t * 4 + i)) * 2); }
  }

function mqSnap() { return { f: fishCaughtAll(), p: save.mx.pn, l: save.mx.ln, w: save.wins || 0 }; }

function mqNum(get, n, t0, rw) { return { t: t0, done: function () { return get() >= n; }, prog: function () { return qCnt(get(), n); }, rw: rw }; }

function mqExtra(n) {
    var m = save.mx; if (!m.mb) { m.mb = mqSnap(); persist(); }
    var tier = Math.min(10, Math.floor(n / 4)), k = n % 4, b = m.mb;
    if (k === 0) return mqNum(function () { return fishCaughtAll() - b.f; }, 8 + 2 * tier, 'Поймай ' + (8 + 2 * tier) + ' рыб', { coins: 600 + 100 * tier });
    if (k === 1) return mqNum(function () { return save.mx.pn - b.p; }, 4 + tier, 'Подними ' + (4 + tier) + ' жемчужин на дне', { coins: 700 + 120 * tier });
    if (k === 2) return mqNum(function () { return save.mx.ln - b.l; }, 3 + tier, 'Принеси ' + (3 + tier) + ' образцов из лаборатории', { coins: 2200 + 300 * tier });
    return mqNum(function () { return (save.wins || 0) - b.w; }, 1, 'Победи Хоумлендера-Петуха ещё раз', { coins: 3500 + 400 * tier });
  }

function mqCur() { return MQ[save.mx.mi] || mqExtra(save.mx.mi - MQ.length); }

function nearWH() { return loc.i === 6 && !lt.st && Math.abs(P.x - WH_X) < 120 && P.z < 70; }

function whEnter() { /* приветствие уже в toast локации */ }

function openWH() {
    if (whOpen || paused || ep.on) return;
    if (save.mx.mh) { sfx('no'); toast('Кабинет пуст: Меллстрой лежит в Больнице (слева от Города Белого Дома). Задания и образцы теперь у него.', 5000); return; }
    whOpen = true; elWh.hidden = false; syncPause(); sfx('pick'); whLine = (whLine + 1) % WH_LINES.length;
    elWhSay.textContent = WH_LINES[whLine]; whRender(); cancelAnimationFrame(whRaf); whLast = 0; whRaf = requestAnimationFrame(whLoop);
  }

function closeWH() { whOpen = false; elWh.hidden = true; syncPause(); cancelAnimationFrame(whRaf); }

function whRender() {
    var q = mqCur(), ready0 = q.done();
    elWhQ.textContent = 'Задание ' + (save.mx.mi + 1) + ': ' + q.t + ' (' + q.prog() + '). Награда: ' + qRwText(q.rw) + '.';
    elWhTake.textContent = ready0 ? 'Забрать награду' : 'Задание в процессе';
    elWhTake.className = 'flbuy' + (ready0 ? '' : ' no');
    var v = labValue();
    elWhSell.textContent = v > 0 ? 'Продать образцы за ' + fmtN(v) : 'Образцов нет (лаборатория на острове)';
    elWhSell.className = 'flbuy' + (v > 0 ? '' : ' no');
  }

function whLoop(now) {
    if (!whOpen) return;
    var dt = whLast ? Math.min(0.05, (now - whLast) / 1000) : 0; whLast = now; whT += dt;
    whDraw(); whRaf = requestAnimationFrame(whLoop);
  }

function whDraw() {
    var c = whX, W2 = 640, H2 = 360, i;
    var g = c.createLinearGradient(0, 0, 0, H2); g.addColorStop(0, '#e6dcc4'); g.addColorStop(1, '#c9bb98'); c.fillStyle = g; c.fillRect(0, 0, W2, H2);
    c.fillStyle = '#b7a67e'; c.fillRect(0, 150, W2, 6); c.fillStyle = '#a89870'; c.fillRect(0, 156, W2, 90);
    c.fillStyle = '#2a3f6b'; c.fillRect(0, 246, W2, 114);              // ковёр
    c.strokeStyle = '#d6b24a'; c.lineWidth = 3; c.beginPath(); c.ellipse(320, 306, 190, 34, 0, 0, 6.3); c.stroke();
    // окно
    c.fillStyle = '#8fd0ff'; c.fillRect(46, 40, 92, 120); c.strokeStyle = '#f4efe2'; c.lineWidth = 6; c.strokeRect(46, 40, 92, 120);
    c.beginPath(); c.moveTo(92, 40); c.lineTo(92, 160); c.moveTo(46, 100); c.lineTo(138, 100); c.stroke();
    c.fillStyle = '#9b2a33'; c.fillRect(30, 30, 26, 140); c.fillRect(128, 30, 26, 140);
    // флаги
    function flag(x) {
      c.fillStyle = '#6b4a2b'; c.fillRect(x, 70, 5, 190);
      for (var s = 0; s < 6; s++) { c.fillStyle = s % 2 ? '#fff' : '#c2353f'; c.fillRect(x + 5, 76 + s * 9, 62 + Math.sin(whT * 3 + s) * 3, 9); }
      c.fillStyle = '#2b4a96'; c.fillRect(x + 5, 76, 26, 27);
    }
    flag(500); flag(580);
    // картина
    c.fillStyle = '#6b4a2b'; c.fillRect(250, 44, 140, 80); c.fillStyle = '#9fc7a0'; c.fillRect(256, 50, 128, 68); c.fillStyle = '#6aa66f'; c.beginPath(); c.moveTo(256, 118); c.lineTo(310, 78); c.lineTo(350, 104); c.lineTo(384, 84); c.lineTo(384, 118); c.fill();
    // Меллстрой
    if (ready(img.mell)) {
      var fi = Math.floor(whT * 10) % 125, fw = 224, fh = 99, sc = 2.35;
      c.drawImage(img.mell, (fi % 9) * fw, Math.floor(fi / 9) * fh, fw, fh, 320 - fw * sc / 2, 62, fw * sc, fh * sc);
    }
    // стол
    c.fillStyle = '#6a3f1c'; c.fillRect(110, 262, 420, 98); c.fillStyle = '#85511f'; c.fillRect(100, 252, 440, 16);
    c.fillStyle = '#4e2c12'; c.fillRect(110, 292, 420, 4);
    c.fillStyle = '#f2ead2'; rrect2(c, 270, 268, 100, 20, 4); c.fillStyle = '#2a2a2a'; c.font = '700 12px "Rubik", system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('МЕЛЛСТРОЙ', 320, 279);
    c.fillStyle = '#2a8bd9'; c.fillRect(448, 226, 18, 28); c.fillStyle = '#d5dde8'; c.fillRect(448, 226, 18, 5); c.fillStyle = '#fff'; c.fillRect(452, 238, 10, 6);
    for (i = 0; i < 3; i++) { c.fillStyle = LAB_KINDS[i].c; c.globalAlpha = save.mx.lab[i] > 0 ? 1 : 0.25; c.fillRect(140 + i * 22, 232, 12, 22); c.fillRect(143 + i * 22, 226, 6, 8); }
    c.globalAlpha = 1;
  }

function rrect2(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); c.fill(); }

function drawWcityBack(x0, x1) {
    parallaxSkyline(0.25, 20, 170, 170, '#b7c6dc', 7);
    parallaxSkyline(0.45, 8, 130, 170, '#94a8c6', 21);
    setCam(1);
    cityBlocks(x0, x1, LOCS[6].w);
    for (var lx = 200; lx < LOCS[6].w - 80; lx += 330) {
      if (lx < x0 - 40 || lx > x1 + 40) continue;
      ctx.fillStyle = '#3b4250'; ctx.fillRect(lx - 3, gY - 150, 6, 150); ctx.fillRect(lx - 3, gY - 152, 28, 5);
      ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.ellipse(lx + 22, gY - 146, 12, 5, 0, 0, 6.3); ctx.fill();
    }
    drawCityGround(x0, x1, LOCS[6].w);
    // газон перед домом
    if (WH_X + 700 > x0 && WH_X - 700 < x1) { ctx.fillStyle = '#6fb86a'; ctx.fillRect(WH_X - 640, gY - 4, 1280, 22); ctx.fillStyle = '#5ca458'; ctx.fillRect(WH_X - 640, gY + 12, 1280, 6); }
    if (WH_X + 330 > x0 && WH_X - 330 < x1) drawWhiteHouse(WH_X);
  }

function drawWcityFront(x0, x1) {
    // забор и фонтан
    ctx.strokeStyle = '#2e3440'; ctx.lineWidth = 2;
    for (var fx = WH_X - 600; fx <= WH_X + 600; fx += 18) {
      if (Math.abs(fx - WH_X) < 90) continue;
      if (fx < x0 || fx > x1) continue;
      ctx.beginPath(); ctx.moveTo(fx, gY + 6); ctx.lineTo(fx, gY - 40); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(WH_X - 600, gY - 30); ctx.lineTo(WH_X - 90, gY - 30); ctx.moveTo(WH_X + 90, gY - 30); ctx.lineTo(WH_X + 600, gY - 30); ctx.stroke();
    var fxx = [WH_X - 470, WH_X + 470];
    for (var k = 0; k < 2; k++) {
      var fq = fxx[k]; if (fq < x0 - 60 || fq > x1 + 60) continue;
      ctx.fillStyle = '#c9d2de'; ctx.fillRect(fq - 40, gY - 20, 80, 20); ctx.fillStyle = '#7fd0f2'; ctx.beginPath(); ctx.ellipse(fq, gY - 21, 34, 6, 0, 0, 6.3); ctx.fill();
      ctx.strokeStyle = 'rgba(127,208,242,.85)'; ctx.lineWidth = 3;
      for (var w2 = -1; w2 <= 1; w2 += 2) { ctx.beginPath(); ctx.moveTo(fq, gY - 50); ctx.quadraticCurveTo(fq + w2 * 24, gY - 76 + Math.sin(t * 5) * 3, fq + w2 * 34, gY - 22); ctx.stroke(); }
      ctx.fillStyle = '#c9d2de'; ctx.fillRect(fq - 4, gY - 56, 8, 36);
    }
  }

function startFlight(dest, atX, opts) {
    if (flt.on) return;
    flt.on = true; flt.t = 0; flt.dest = dest; flt.atX = atX; flt.rescue = !!(opts && opts.rescue); flt.fin = false; flt.hit = false; flt.warned = false;
    flt.crash = !flt.rescue && Math.random() < CRASH_P; flt.tc = 4.5 + Math.random() * 2.5;
    input.left = input.right = false; P.vx = 0; sfx('jump');
    elFltSkip.hidden = false; elFade.style.opacity = 0; document.body.classList.add('flt');
  }

function finishFlight() {
    if (flt.fin) return;
    flt.fin = true; flt.on = false; elFltSkip.hidden = true; document.body.classList.remove('flt');
    var dest = flt.dest, atX = flt.atX;
    if (flt.crash) { isl.crashed = true; isl.dest = flt.dest; dest = 7; atX = 560; }
    lt.st = 'out'; lt.t = 0; lt.dest = dest; lt.side = 'left'; lt.atX = atX;
  }

function updateFlight(dt) {
    flt.t += dt;
    if (flt.crash) {
      if (!flt.warned && flt.t > flt.tc - 2.2) { flt.warned = true; sfx('no'); }
      if (!flt.hit && flt.t >= flt.tc) { flt.hit = true; sfx('boom'); shk = 1; }
      if (flt.t >= flt.tc + 4.4) finishFlight();
    } else if (flt.t >= (flt.rescue ? 4 : FLY_T) + LAND_T) finishFlight();
  }

function fltTitle() {
    if (flt.rescue) return 'Спасатели на вертолёте';
    return flt.dest === 4 ? 'Рейс: Аэропорт — Мальдивы' : 'Рейс домой: Мальдивы — Аэропорт';
  }

function drawFlight() {
    var w = W, h = H, tt = flt.t, i, crashing = flt.crash && flt.hit, cr = crashing ? tt - flt.tc : 0;
    var landStart = flt.rescue ? 4 : FLY_T, landing = !flt.crash && tt > landStart, lp = landing ? Math.min(1, (tt - landStart) / LAND_T) : 0;
    var sx = shk > 0 ? (Math.random() - 0.5) * shk * 18 : 0, sy = shk > 0 ? (Math.random() - 0.5) * shk * 12 : 0;
    ctx.setTransform(dpr, 0, 0, dpr, sx * dpr, sy * dpr);
    var g = ctx.createLinearGradient(0, 0, 0, h);
    var dark = crashing ? Math.min(1, cr / 2) : 0;
    g.addColorStop(0, dark ? 'rgb(' + (47 - dark * 20 | 0) + ',' + (127 - dark * 60 | 0) + ',' + (214 - dark * 70 | 0) + ')' : '#2f7fd6'); g.addColorStop(0.6, '#8fd0ff'); g.addColorStop(1, '#e4f5ff');
    ctx.fillStyle = g; ctx.fillRect(-20, -20, w + 40, h + 40);
    ctx.fillStyle = 'rgba(255,248,200,.9)'; ctx.beginPath(); ctx.arc(w * 0.82, h * 0.18, 34, 0, 6.3); ctx.fill();
    // облака в трёх слоях: чем ближе, тем быстрее
    for (var L = 0; L < 3; L++) {
      var sp = 40 + L * 90, per = w + 500, cs = 0.8 + L * 0.6;
      ctx.fillStyle = 'rgba(255,255,255,' + (0.55 + L * 0.18) + ')';
      for (i = 0; i < 5; i++) {
        var cx = (((i * (per / 5) + L * 130 - tt * sp) % per) + per) % per - 250, cy = h * (0.12 + ((i * 37 + L * 23) % 60) / 100 * 0.75);
        if (L === 2 && Math.abs(cy - h * 0.46) < 60) cy += 90;
        drawCloud(cx, cy, cs);
      }
    }
    // земля внизу: море, а при посадке приближается
    var seaTop = h * (0.9 - lp * 0.28 - (crashing ? Math.min(0.5, cr * 0.13) : 0));
    var sg = ctx.createLinearGradient(0, seaTop, 0, h); sg.addColorStop(0, '#3fc3d8'); sg.addColorStop(1, '#0f7fa6');
    if (flt.dest === 3 && landing) { sg = ctx.createLinearGradient(0, seaTop, 0, h); sg.addColorStop(0, '#8fcf8f'); sg.addColorStop(1, '#5aa860'); }
    ctx.fillStyle = sg; ctx.fillRect(-20, seaTop, w + 40, h - seaTop + 20);
    if (landing && flt.dest !== 3 || flt.rescue && flt.dest !== 3) {
      ctx.fillStyle = '#f3e3b0'; ctx.fillRect(-20, h - (h - seaTop) * 0.45, w + 40, (h - seaTop) * 0.45 + 20);
      for (i = 0; i < 6; i++) { var px = (i + 0.5) * w / 6; ctx.strokeStyle = '#8a5a2b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, h); ctx.quadraticCurveTo(px + 8, h - 70 * (0.5 + lp), px + 14, h - 110 * (0.5 + lp)); ctx.stroke(); ctx.fillStyle = '#2d9c5a'; ctx.beginPath(); ctx.ellipse(px + 14, h - 110 * (0.5 + lp), 34, 8, i, 0, 6.3); ctx.fill(); }
    }
    if (flt.dest === 3 && landing) { ctx.fillStyle = '#4c525c'; ctx.fillRect(-20, h - (h - seaTop) * 0.32, w + 40, (h - seaTop) * 0.32 + 20); ctx.fillStyle = '#f4f1c8'; for (i = 0; i < 8; i++) ctx.fillRect(i * w / 6 - (tt * 200 % (w / 6)), h - (h - seaTop) * 0.16, 50, 6); }
    // самолёт
    var s = Math.max(0.8, Math.min(1.7, w / 520)), px2 = w * 0.5, py = h * 0.5 + 50 * s + Math.sin(tt * 1.7) * 7, pitch = 0;
    if (landing) { py += lp * h * 0.22; pitch = lp < 0.8 ? 0.06 : -0.04; }
    if (crashing) { py += cr * cr * 60; px2 += cr * 18; pitch = Math.min(1.25, cr * 0.55); }
    if (flt.rescue) drawHeli(px2, py, s, tt, lp); else { var og = gY; gY = -9000; drawAirliner(px2, py, 1, s, '#e5484d', pitch, 900); gY = og; }
    // дым и огонь при падении
    if (crashing) {
      for (i = 0; i < 16; i++) { var a = (cr * 3 - i * 0.2), tx = px2 - i * 22 * s - 20, ty = py - 30 * s - i * 4 + Math.sin(i + tt * 6) * 6; ctx.fillStyle = 'rgba(' + (i < 4 ? '255,150,40' : '50,50,56') + ',' + Math.max(0, 0.7 - i * 0.04) + ')'; ctx.beginPath(); ctx.arc(tx, ty, (14 + i * 2) * s, 0, 6.3); ctx.fill(); }
      if (flt.t < flt.tc + 0.5) { ctx.fillStyle = 'rgba(255,255,255,' + (1 - (flt.t - flt.tc) * 2) + ')'; ctx.fillRect(-20, -20, w + 40, h + 40); }
    }
    // Хоумлендер-Петух
    if (flt.crash && flt.t > flt.tc - 2.4 && flt.t < flt.tc + 1.6 && ready(img.boss)) {
      var bp = Math.min(1, (flt.t - (flt.tc - 2.4)) / 2.4), bh = h * 0.42, bw = bh * img.boss.naturalWidth / img.boss.naturalHeight;
      var bx = (w + bw) + (px2 + 50 * s - (w + bw)) * bp + (flt.t > flt.tc ? (flt.t - flt.tc) * 220 : 0), by = py - 50 * s - Math.sin(tt * 5) * 6;
      ctx.save(); ctx.translate(bx, by); ctx.rotate(-0.08);
      var rg = ctx.createRadialGradient(0, 0, bh * 0.1, 0, 0, bh * 0.8); rg.addColorStop(0, 'rgba(255,60,60,.45)'); rg.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = rg; ctx.fillRect(-bh, -bh, bh * 2, bh * 2);
      ctx.drawImage(img.boss, -bw / 2, -bh / 2, bw, bh);
      if (bp > 0.55 && flt.t < flt.tc + 0.4) { ctx.strokeStyle = 'rgba(255,40,40,.95)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-bw * 0.2, -bh * 0.18); ctx.lineTo(-(bx - px2), -(by - py) + 20); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = '#fff'; ctx.stroke(); }
      ctx.restore();
    }
    // подписи и красная тревога
    if (flt.crash && flt.t > flt.tc - 2.4 && !flt.hit) { ctx.fillStyle = 'rgba(255,0,0,' + (0.12 + 0.1 * Math.sin(tt * 18)) + ')'; ctx.fillRect(-20, -20, w + 40, h + 40); }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    function label(txt, y, size, col) { ctx.font = '700 ' + size + 'px "Russo One", "Rubik", system-ui, sans-serif'; ctx.lineWidth = 6; ctx.strokeStyle = '#14233f'; ctx.strokeText(txt, w / 2, y); ctx.fillStyle = col; ctx.fillText(txt, w / 2, y); }
    label(fltTitle(), 38, Math.max(16, Math.min(26, w / 28)), '#ffffff');
    var msg = '', mc = '#fff';
    if (crashing) { msg = cr > 0.6 ? 'МЫ ПАДАЕМ!' : ''; mc = '#ff6a5a'; }
    else if (flt.crash && flt.t > flt.tc - 2.4) { msg = 'ВПЕРЕДИ ХОУМЛЕНДЕР-ПЕТУХ!'; mc = '#ff5a5a'; }
    else if (landing && lp > 0.45) msg = flt.dest === 4 ? 'Добро пожаловать на Мальдивы!' : 'Добро пожаловать домой!';
    else if (!landing) msg = flt.rescue ? 'Вертолёт спасателей. Держитесь!' : (tt < 3 ? 'Взлетаем. Пристегнись!' : 'Набираем высоту. Смотри в окно.');
    if (msg) label(msg, h * 0.2, Math.max(18, Math.min(34, w / 22)), mc);
    // шкала
    var total = flt.crash ? flt.tc + 4.4 : (flt.rescue ? 4 : FLY_T) + LAND_T, pr = Math.min(1, tt / total);
    ctx.fillStyle = 'rgba(20,35,63,.6)'; ctx.fillRect(w * 0.2, h - 28, w * 0.6, 8); ctx.fillStyle = '#ffd23f'; ctx.fillRect(w * 0.2, h - 28, w * 0.6 * pr, 8);
  }

function nearFlare() { return loc.i === 7 && !lt.st && !flt.on && Math.abs(P.x - FLARE_X) < 110 && P.z < 70; }

function islandEnter() {
    if (isl.crashed) { isl.crashed = false; isl.wk = true; toast('Крушение! Ты на необитаемом острове. Слева обломки самолёта, рядом сигнальная ракета: она вызовет спасателей на вертолёте. Справа тёмная пещера.', 8000); }
    else { isl.dest = 4; toast('Необитаемый остров. Справа тёмная пещера, а слева твоя лодка у воды.', 5000); }
    ach('island');
  }

function flareAct() {
    if (!nearFlare()) return;
    isl.wk = false; sfx('rare'); toast('Ракета ушла в небо. Вертолёт спасателей уже летит!', 2500);
    startFlight(isl.dest || 4, isl.dest === 3 ? AIR_BACK_X : MALD_ARRIVE_X, { rescue: true });
  }

function drawWreck(x) {
    ctx.save(); ctx.translate(x, gY + 6); ctx.rotate(-0.09);
    var og = gY; gY = 100000; drawAirliner(0, 0, 1, 0.95, '#e5484d', 0, 0); gY = og;
    ctx.restore();
    ctx.fillStyle = '#3a2a1c'; ctx.fillRect(x + 90, gY - 56, 90, 40);
    for (var i = 0; i < 6; i++) { var a = (t * 0.6 + i * 0.5) % 3; ctx.fillStyle = 'rgba(60,60,66,' + Math.max(0, 0.5 - a * 0.16).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x - 20 + Math.sin(i + t) * 12 + a * 16, gY - 80 - a * 60, 12 + a * 12, 0, 6.3); ctx.fill(); }
  }

function drawIslandBack(x0, x1) {
    drawHills(0.15, 98, '#8fe0cf', 12, 8, 0.6);
    setCam(1);
    var sg = ctx.createLinearGradient(0, gY - 96, 0, gY + 4);
    sg.addColorStop(0, '#9be8ee'); sg.addColorStop(0.5, '#3fc3d8'); sg.addColorStop(1, '#14a0c4');
    ctx.fillStyle = sg; ctx.fillRect(x0, gY - 96, x1 - x0, 102);
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2;
    for (var i = Math.floor(x0 / 90) - 1; i * 90 < x1; i++) for (var wv = 0; wv < 3; wv++) { var wx = i * 90 + wv * 31 + Math.sin(t * 0.8 + i + wv) * 10, wy = gY - 72 + wv * 22; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 12, wy - 4, wx + 26, wy); ctx.stroke(); }
    ctx.fillStyle = '#f3e3b0'; ctx.fillRect(x0, gY - 4, x1 - x0, H / scale);
    ctx.fillStyle = '#e4cf94'; ctx.fillRect(x0, gY + 14, x1 - x0, H / scale);
    var px = [240, 360, 980, 1150, 1420, 1700, 1960, 2300, 2520, 2760, 2950], ph = [200, 175, 215, 190, 230, 185, 210, 220, 180, 200, 215];
    for (i = 0; i < px.length; i++) if (px[i] > x0 - 120 && px[i] < x1 + 120) palm(px[i], ph[i], (i % 2 ? 1 : -1) * (26 + i * 2), i * 1.3);
    if (isl.wk && 520 > x0 - 300 && 520 < x1 + 300) drawWreck(520);
    // скалы у входа в пещеру
    if (CAVE_X > x0 - 300 && CAVE_X < x1 + 300) {
      ctx.fillStyle = '#5a534a'; ctx.beginPath(); ctx.moveTo(CAVE_X - 260, gY); ctx.lineTo(CAVE_X - 150, gY - 190); ctx.lineTo(CAVE_X - 40, gY - 270); ctx.lineTo(CAVE_X + 90, gY - 230); ctx.lineTo(CAVE_X + 250, gY - 120); ctx.lineTo(CAVE_X + 330, gY); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#6d655a'; ctx.beginPath(); ctx.moveTo(CAVE_X - 150, gY - 190); ctx.lineTo(CAVE_X - 40, gY - 270); ctx.lineTo(CAVE_X - 70, gY - 150); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#07060a'; ctx.beginPath(); ctx.moveTo(CAVE_X - 70, gY); ctx.quadraticCurveTo(CAVE_X - 80, gY - 150, CAVE_X + 10, gY - 160); ctx.quadraticCurveTo(CAVE_X + 110, gY - 150, CAVE_X + 100, gY); ctx.closePath(); ctx.fill();
    }
  }

function drawIslandFront(x0, x1) {
    var tx = FLARE_X;
    if (tx > x0 - 60 && tx < x1 + 60) {
      ctx.fillStyle = '#8a5a2b'; ctx.fillRect(tx - 24, gY - 30, 48, 30); ctx.fillStyle = '#6b4220'; ctx.fillRect(tx - 24, gY - 18, 48, 4);
      ctx.fillStyle = '#e5484d'; ctx.fillRect(tx - 5, gY - 58, 10, 28); ctx.fillStyle = '#fff'; ctx.fillRect(tx - 5, gY - 46, 10, 5);
      ctx.fillStyle = '#ffb020'; ctx.beginPath(); ctx.arc(tx, gY - 62 - Math.abs(Math.sin(t * 9)) * 3, 5, 0, 6.3); ctx.fill();
      if (nearFlare()) { ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText('Сигнальная ракета', tx, gY - 82); ctx.fillText('Сигнальная ракета', tx, gY - 82); }
    }
    var lw = 70;
    if (loc.i === 7 && !(save.fs.boat || save.fs.sub) && lw > x0 && lw < x1) { /* слева без лодки не выйти */ }
  }

function drawCaveBack(x0, x1) {
    var i;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a1622'); g.addColorStop(1, '#2b2433'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(0.5);
    var a0 = camX * 0.5 - 40, a1 = a0 + vw + 80;
    ctx.fillStyle = '#231d2b';
    for (i = Math.floor(a0 / 140) - 1; i * 140 < a1; i++) { var hh = 120 + ((i * 53) % 90); ctx.beginPath(); ctx.moveTo(i * 140 - 30, 0); ctx.lineTo(i * 140 + 40, hh * 1.4); ctx.lineTo(i * 140 + 110, 0); ctx.fill(); }
    setCam(1);
    // потолок и пол
    ctx.fillStyle = '#2e2636';
    for (i = Math.floor(x0 / 90) - 1; i * 90 < x1; i++) { if (i * 90 > LAB_X - 40) break; var sh = 60 + ((i * 71) % 100); ctx.beginPath(); ctx.moveTo(i * 90, -400); ctx.lineTo(i * 90, gY - 340); ctx.lineTo(i * 90 + 25, gY - 340 + sh); ctx.lineTo(i * 90 + 50, gY - 340); ctx.lineTo(i * 90 + 90, gY - 340); ctx.lineTo(i * 90 + 90, -400); ctx.fill(); }
    ctx.fillStyle = '#3a3040'; ctx.fillRect(x0, gY - 2, Math.min(x1, LAB_X) - x0, H / scale);
    ctx.fillStyle = '#4a3f52'; ctx.fillRect(x0, gY - 2, Math.min(x1, LAB_X) - x0, 5);
    // светящиеся кристаллы
    var cx = [260, 620, 980, 1260, 1420], cc = ['#7fe4ff', '#b48aff', '#7fe4ff', '#ff8ad8', '#7dff9a'];
    for (i = 0; i < cx.length; i++) {
      if (cx[i] < x0 - 80 || cx[i] > x1 + 80) continue;
      var gl = 0.55 + 0.25 * Math.sin(t * 2 + i), rg = ctx.createRadialGradient(cx[i], gY - 40, 4, cx[i], gY - 40, 110); rg.addColorStop(0, cc[i]); rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = gl * 0.5; ctx.fillStyle = rg; ctx.fillRect(cx[i] - 110, gY - 150, 220, 220); ctx.globalAlpha = 1;
      ctx.fillStyle = cc[i]; ctx.beginPath(); ctx.moveTo(cx[i] - 14, gY); ctx.lineTo(cx[i] - 4, gY - 62); ctx.lineTo(cx[i] + 4, gY); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx[i], gY); ctx.lineTo(cx[i] + 14, gY - 44); ctx.lineTo(cx[i] + 22, gY); ctx.fill();
    }
    drawLabRoom(x0, x1);
  }

function drawLabRoom(x0, x1) {
    if (x1 < LAB_X - 60) return;
    var i, lx = LAB_X, rx = LOCS[8].w;
    ctx.fillStyle = '#d7dee6'; ctx.fillRect(lx, gY - 330, rx - lx, 330 + H / scale);
    ctx.fillStyle = '#b9c4d0'; ctx.fillRect(lx, gY - 330, rx - lx, 14);
    ctx.fillStyle = '#aab6c4'; ctx.fillRect(lx, gY - 2, rx - lx, H / scale);
    ctx.fillStyle = '#8f9cad'; for (i = lx; i < rx; i += 120) ctx.fillRect(i, gY - 2, 2, H / scale);
    for (i = lx; i < rx; i += 120) { ctx.fillStyle = '#c4ced9'; ctx.fillRect(i + 10, gY - 270, 100, 4); }
    // дверь
    ctx.fillStyle = '#5b6677'; ctx.fillRect(lx - 14, gY - 200, 28, 200); ctx.fillStyle = '#3a4352'; ctx.fillRect(lx - 40, gY - 230, 40, 230);
    ctx.fillStyle = '#2fbf6b'; ctx.beginPath(); ctx.arc(lx + 4, gY - 188, 5, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#1f4aa8'; rrect(lx + 20, gY - 270, 170, 30, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ЛАБОРАТОРИЯ', lx + 105, gY - 255);
    // колбы и трубки на стене
    var tubes = [[1640, 0], [1830, 1], [2010, 2], [2200, 1], [2380, 0], [2540, 2]];
    for (i = 0; i < tubes.length; i++) {
      var tb = tubes[i], kd = LAB_KINDS[tb[1]], tx = tb[0];
      ctx.fillStyle = 'rgba(190,225,240,.45)'; rrect(tx - 26, gY - 250, 52, 150, 12); ctx.fill(); ctx.strokeStyle = '#7a8aa0'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = kd.c; ctx.globalAlpha = 0.7; ctx.fillRect(tx - 22, gY - 190, 44, 86); ctx.globalAlpha = 1;
      for (var bb = 0; bb < 4; bb++) { var by2 = gY - 110 - ((t * 30 + bb * 22) % 80); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(tx - 10 + bb * 7, by2, 3, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#566174'; ctx.fillRect(tx - 30, gY - 100, 60, 10);
    }
    // столы
    var tbl = [1740, 2110, 2460];
    for (i = 0; i < tbl.length; i++) { ctx.fillStyle = '#8895a8'; ctx.fillRect(tbl[i] - 60, gY - 52, 120, 8); ctx.fillStyle = '#5b6677'; ctx.fillRect(tbl[i] - 54, gY - 44, 8, 44); ctx.fillRect(tbl[i] + 46, gY - 44, 8, 44); }
  }

function drawCaveFront(x0, x1) {
    var i;
    drawCaveStones(x0, x1); drawSecretDoor(x0, x1); drawNoteOnTable();
    if (!GX && x0 < LAB_X) {
      ctx.fillStyle = '#251f2c';
      for (i = 0; i < 12; i++) { var sx = 150 + i * 120 + (i * 37) % 60; if (sx > LAB_X - 60 || sx < x0 - 40 || sx > x1 + 40) continue; ctx.beginPath(); ctx.moveTo(sx - 18, gY + 4); ctx.lineTo(sx, gY - 26 - (i * 13) % 26); ctx.lineTo(sx + 18, gY + 4); ctx.fill(); }
    }
  }

function drawCaveDark() {
    if (loc.i !== 8) return;
    var f = Math.max(0, Math.min(1, (LAB_X + 120 - P.x) / 300)); if (f <= 0) return;
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    var px = P.x - camX, py = gY - 60 - P.z, rg = ctx.createRadialGradient(px, py, 40, px, py, 360);
    rg.addColorStop(0, 'rgba(8,6,14,0)'); rg.addColorStop(1, 'rgba(8,6,14,' + (0.86 * f).toFixed(2) + ')');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, vw, H / scale);
  }

function stZone() { return P.x >= ZONE2_X ? 1 : 0; }

function noiseBuffer() {
    if (noiseBuf) return noiseBuf;
    var n = actx.sampleRate * 2, b = actx.createBuffer(1, n, actx.sampleRate), d = b.getChannelData(0), last = 0;
    for (var i = 0; i < n; i++) { last = (last + (Math.random() * 2 - 1) * 0.12) * 0.985; d[i] = last * 3; }
    noiseBuf = b; return b;
  }

function stormAudio(k) {
    try {
      var on = k > 0.02 && music.sfx && !document.hidden;
      if (on) {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)();
        if (actx.state === 'suspended') actx.resume();
        if (!stormAu) {
          var src = actx.createBufferSource(), g = actx.createGain(), f = actx.createBiquadFilter();
          src.buffer = noiseBuffer(); src.loop = true; f.type = 'lowpass'; f.frequency.value = 500; g.gain.value = 0;
          src.connect(f); f.connect(g); g.connect(actx.destination); src.start();
          stormAu = { src: src, g: g, f: f };
        }
        stormAu.g.gain.setTargetAtTime(Math.min(0.42, k * 0.4) * (0.35 + 0.65 * music.vol), actx.currentTime, 0.35);
        stormAu.f.frequency.setTargetAtTime(380 + k * 1100, actx.currentTime, 0.35);
      } else if (stormAu) {
        var s0 = stormAu; stormAu = null;
        s0.g.gain.setTargetAtTime(0, actx.currentTime, 0.2);
        setTimeout(function () { try { s0.src.stop(); s0.src.disconnect(); } catch (e) {} }, 900);
      }
    } catch (e) {}
  }

function thunder() {
    if (!music.sfx || document.hidden) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      var src = actx.createBufferSource(), g = actx.createGain(), f = actx.createBiquadFilter(), t0 = actx.currentTime + 0.05 + Math.random() * 0.25;
      src.buffer = noiseBuffer(); f.type = 'lowpass'; f.frequency.value = 260;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.55 * (0.3 + 0.7 * music.vol), t0 + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);
      src.connect(f); f.connect(g); g.connect(actx.destination); src.start(t0, Math.random()); src.stop(t0 + 2.3);
    } catch (e) {}
  }

function krSubWeak() { return subActive() && save.fs.sd < 3; }

function stormTick(dt) {
    if (storm.cd > 0) storm.cd -= dt;
    var inOcean = loc.i === 5 && !lt.st && !flt.on && !av.on;
    if (kk.on) return;
    // вне океана или во время восстановления шанс не копится и возвращается к начальным 5%
    var z = stZone();
    if (!inOcean || storm.cd > 0 || z !== storm.z) { storm.z = z; storm.acc = 0; storm.next = 0; storm.chance = ST_BASE[z]; if (inOcean && storm.cd <= 0 && z === 1 && !storm.zt) { storm.zt = 1; toast('Глубокий океан. Здесь шторм начинается чаще (старт 30%), а впадина уходит на 500 м.', 5000); } return; }
    if (paused) return;
    if (subActive()) { // под водой Кракен живёт на глубине 235–450 м, шанс копится только там
      if (sub.d < KR_D0 || sub.d > KR_D1) return;
      if (!storm.sh) { storm.sh = 1; toast('Глубже 235 м сонар ловит странные сигналы. Кракен обитает на глубине 235–450 м.', 5000); }
    }
    storm.acc += dt;
    if (storm.acc >= storm.next) {
      var ch = storm.chance;
      storm.next += 30; storm.chance = Math.min(100, ch + ST_STEP);
      if (!boss.on && !fsh.open && Math.random() * 100 < ch) krStart(false);
    }
  }

function stormVis(dt) {
    var tk = (kk.on && kk.mode === 'boat' && kk.st !== 'calm') ? ((kk.st === 'warn') ? 0.25 + 0.75 * Math.min(1, kk.t / 7) : (kk.st === 'retreat' ? Math.max(0.2, 1 - kk.t / 6) : (kk.ph === 3 ? 1.15 : 1))) : (kk.on && kk.mode === 'sub' ? 0.35 : 0);
    if (loc.i !== 5) tk = 0;
    storm.tk = tk; storm.k += (tk - storm.k) * Math.min(1, 1.6 * dt);
    if (Math.abs(storm.k - tk) < 0.01) storm.k = tk;
    if (storm.fl > 0) storm.fl -= dt * 2.2;
    if (storm.k > 0.05) {
      storm.ft -= dt;
      if (storm.ft <= 0) { storm.ft = 3 + Math.random() * 7 / Math.max(0.5, storm.k); storm.fl = 1; thunder(); if (kk.mode === 'boat') shk = Math.max(shk, 0.25); }
    }
    storm.rainT += dt;
    if (!document.hidden) stormAudio(loc.i === 5 && kk.mode !== 'sub' ? storm.k : (loc.i === 5 ? storm.k * 0.5 : 0)); else stormAudio(0);
    // атмосфера: звуки океана в шторм
    if (kk.on && !paused) {
      storm.smpT -= dt;
      if (storm.smpT <= 0) {
        storm.smpT = 14 + Math.random() * 14;
        if (kk.mode === 'sub') playSmp(wpick([['sGroan', 50], ['sDive', 20], ['sSonar', 30]]), 0.8);
        else playSmp(wpick([['bAmb', 40], ['bMove', 25], ['bSplash', 20], ['bCall', 15]]), 0.8);
      }
    }
  }

function krNp() { var n = 1, k; if (net.room) for (k in net.others) if ((net.others[k].l | 0) === 5) n++; return Math.min(6, n); }

function krDeepEvent() {
    storm.cd = 150; storm.acc = 0; storm.next = 0; storm.chance = ST_BASE[stZone()];
    playSmp('sSonar', 1); setTimeout(function () { playSmp('sGroan', 1); }, 1200); setTimeout(function () { playSmp('sRoar', 0.9); }, 3200);
    sn.kT = 25; shk = Math.max(shk, 0.5);
    toast('Сонар засёк огромную цель глубоко внизу. Подлодка слишком слабая для встречи с ней: нужна глубина 500 м (лавка рыбака). Кракен ушёл.', 7000);
  }

function krStart(remote, info) {
    if (kk.on || boss.on) return;
    if (!remote && krSubWeak()) { krDeepEvent(); return; }
    if (remote && cthF && !subActive()) return;
    if (remote && !cthF && subActive() && (sub.d < KR_D0 || sub.d > KR_D1)) { toast('Где-то рядом Кракен, но он на глубине 235–450 м, а ты не там.', 4500); return; }
    if (remote && !cthF && krSubWeak()) { toast('Где-то рядом Кракен, но твоя подлодка слишком слабая для боя. Всплывай на лодке или улучшай глубину.', 5000); return; }
    var np = (info && info.np) ? info.np : krNp();
    krSess++; kk.np = np; kk.solo = np <= 1;
    kk.on = true; kk.mode = subActive() ? 'sub' : 'boat'; kk.st = 'warn'; kk.t = 0; kk.age = 0; kk.ph = 1; kk.dv = false; kk.rise = 0; kk.cy = 'up'; kk.cyT = 9; kk.side = Math.random() < 0.5 ? -1 : 1;
    kk.max = (kk.mode === 'sub' ? KR_SUB_HP : KR_HP) + KR_HP_PLUS * (np - 1); kk.hp = kk.max; kk.left = kk.mode === 'sub' ? KR_SUB_TIME : KR_TIME;
    if (cthF) { kk.cth = true; kk.mode = 'sub'; kk.max = CTH_HP; kk.hp = kk.max; kk.left = CTH_TIME; kk.np = np; kk.solo = np <= 1; } else kk.cth = false;
    kk.boat = BOAT_HP; kk.hull = hullMax(); kk.minHull = 1; kk.iF = 0; kk.dealt = 0; kk.cd = 3; kk.hcd = 0; kk.tcd = 0; kk.flash = 0; kk.stock = []; kk.dropT = 2; kk.ink = 0; kk.noise = 0; kk.str = 0; kk.hit = 0; kk.whCd = 0; kk.warnTxt = ''; kk.warnT = 0;
    kk.x = P.x + kk.side * 420; kk.dy = Math.max(KR_D0, sub.d); sub.grab = 0;
    ktn.length = kwv.length = kwh.length = kslam.length = kdrops.length = kshots.length = kharp.length = 0;
    krRole = remote ? 'fol' : ((socket && net.room && net.state === 'online') ? 'own' : ''); krOwner = (info && info.own) || ''; krSn = null; krSnT = 0;
    if (!remote && krRole === 'own') socket.emit('kr', { start: 1, np: np, c: cthF ? 1 : 0 });
    else if (remote && socket && net.state === 'online') socket.emit('kr', { join: 1 });
    thr.key = thr.ptr = thr.btn = false; ammo = 0; autoAmmo();
    document.body.classList.add('boss'); elBossBar.hidden = false; lastBossUi = ''; if (elBossName) elBossName.textContent = kk.cth ? 'Ктулху' : 'Кракен';
    storm.smpT = 10;
    if (kk.mode === 'sub') {
      playSmp('sSonar', 1); setTimeout(function () { if (kk.on) playSmp('sGroan', 1); }, 1500);
      if (kk.cth) toast('КТУЛХУ! Он в 5 раз сильнее Кракена, чекушки его почти не берут. Бей торпедой (' + (touch ? 'кнопка «Торпеда»' : 'H') + ').', 8000); else toast('Сонар засёк огромную цель! Корпус скрипит. Кидай чекушки (' + (touch ? 'кнопка «Бросить»' : 'F') + '), держи дистанцию и следи за корпусом.', 7000);
    } else {
      playSmp('bCall', 1); setTimeout(function () { if (kk.on) playSmp('bMove', 0.9); }, 2500);
      toast('Небо чернеет, поднимается шторм. К лодке приближается неизвестное существо!', 6000);
    }
    sfx('boom');
  }

function krAbort(why) {
    if (!kk.on) return;
    if (krRole && socket && net.room && net.state === 'online') socket.emit('kr', { leave: 1 });
    krClean(); storm.cd = 60;
    if (why === 'leave') toast('Ты ушёл из океана. Шторм остался позади.', 3500);
  }

function krClean() {
    kk.on = false; kk.cth = false; if (bHarp && bHarp.textContent === 'Торпеда') bHarp.textContent = 'Гарпун'; kk.st = ''; kk.mode = ''; krRole = ''; krOwner = ''; krSn = null;
    ktn.length = kwv.length = kwh.length = kslam.length = kdrops.length = kshots.length = kharp.length = 0;
    sub.grab = 0; kk.ink = 0; kk.noise = 0; kk.warnT = 0;
    elBossBar.hidden = true; document.body.classList.remove('boss', 'rage', 'fin');
    elBossShield.style.background = ''; elBossShieldWrap.style.display = 'none';
    if (bHarp) bHarp.hidden = true;
    thr.key = thr.ptr = thr.btn = false; ammo = 0;
    storm.acc = 0; storm.next = 0; storm.chance = ST_BASE[stZone()];
  }

function krFinish(win, why) {
    if (!kk.on) return;
    var cthB = kk.cth, mode = kk.mode, dealt = kk.dealt, mx = kk.max, hullR = mode === 'sub' ? kk.hull / hullMax() : kk.boat / BOAT_HP, minR = kk.minHull, solo = kk.solo;
    if (krRole && socket && net.room && net.state === 'online') {
      if (krRole === 'own' && (win || why === 'time')) socket.emit('kr', { end: 1, w: win ? 1 : 0 });
      else socket.emit('kr', { leave: 1 });
    }
    krClean(); storm.cd = KR_CD;
    if (cthB) { cthFinish(win, why); return; }
    if (win && krPaid !== krSess) {
      krPaid = krSess; // награда один раз за бой, даже если сеть пришлёт конец дважды
      var first = !save.kw, coins = first ? KR_COINS1 : KR_COINS, bonus = hullR >= 0.5, txt = 'Победа над Кракеном! +' + fmtN(coins) + ' коинов';
      if (bonus) { coins += KR_BONUS; txt += ' и +' + fmtN(KR_BONUS) + ' за целую ' + (mode === 'sub' ? 'подлодку' : 'лодку'); }
      save.coins += coins; save.kw = (save.kw || 0) + 1;
      if (first) { save.kc = 1; txt += '. Первая победа: коллекционное «Щупальце Кракена» теперь в твоей коллекции.'; }
      persist(); hud(); sfx('rare'); burst(P.x, gY - 100, 40, '#ffd23f', 420, 1.1);
      popup(P.x, PLAYER_H + 24, 'КРАКЕН ПОБЕЖДЁН!', '#ffd23f'); toast(txt, 9000);
      ach('kraken'); if (solo) ach('kraken_solo'); if (bonus) ach('kraken_clean');
    } else if (!win && dealt >= mx * 0.1 && krPaid !== krSess) {
      krPaid = krSess; save.coins += KR_FAIL; persist(); hud();
      toast('Бой проигран, но ты нанёс Кракену урон: +' + KR_FAIL + ' коинов за участие.', 5000);
    }
    if (!win) {
      if (why === 'time') toast('Время вышло: Кракен ушёл в глубину, шторм стихает.', 5000);
      else if (mode === 'boat') { toast('Лодку разбило! Тебя вынесло на берег. Лодка цела, садись снова.', 6000); setTimeout(function () { if (loc.i === 5 && !kk.on) seaReturn(); }, 300); }
      else { toast('Корпус не выдержал! Подлодку выбросило на поверхность, а её починили.', 6000); sub.d = 0; sub.vy = 0; }
    }
  }

function krWin() {
    if (!kk.on || kk.st === 'retreat') return;
    kk.st = 'retreat'; kk.t = 0; kk.hp = 0; kk.dv = false; kwv.length = kwh.length = kslam.length = ktn.length = 0; sub.grab = 0; kk.ink = 0;
    sfx('rare'); playSmp(kk.mode === 'sub' ? 'sRoar' : 'bRoar', 1); shk = Math.max(shk, 0.6);
  }

function krLose(why) {
    if (!kk.on || kk.st === 'sink' || kk.st === 'retreat') return;
    if (why === 'time') { krFinish(false, 'time'); return; }
    kk.st = 'sink'; kk.t = 0; sub.grab = 0; playSmp(kk.mode === 'sub' ? 'sStrike' : 'bSplash', 1); shk = Math.max(shk, 0.7);
  }

function krDamage(n, remote) {
    if (!kk.on || kk.st === 'retreat' || kk.st === 'sink' || kk.st === 'warn' || kk.hp <= 0) return;
    if (!remote) kk.dealt += n;
    popup(kk.x + (Math.random() - 0.5) * 50, kk.mode === 'sub' ? (PLAYER_H - kk.dy + 90) : 170, '−' + Math.round(n), '#ff9a9a');
    kk.flash = 1;
    try { var hq = krHeadPos(); ring(hq.x, hq.y, 36 + Math.min(70, n), '#bfe9ff'); burst(hq.x, hq.y, 5 + Math.min(14, Math.round(n / 3)), '#9fe3ff', 300, 0.55); if (n >= 20) { burst(hq.x, hq.y, 10, '#ffffff', 460, 0.4); shk = Math.max(shk, 0.25); } } catch (e) {}
    if (krRole === 'fol') { if (!remote && socket) socket.emit('kr', { dmg: Math.round(n * 10) / 10 }); return; }
    kk.hp = Math.max(0, kk.hp - n);
    var r = kk.hp / kk.max, ph = r > 0.66 ? 1 : (r > 0.33 ? 2 : 3);
    if (kk.hp <= 0) { krWin(); if (krRole === 'own' && socket) socket.emit('kr', { sn: krSnap() }); }
    else if (ph > kk.ph) krPhase(ph);
  }

function krPhase(ph) {
    kk.ph = ph; kk.cd = Math.min(kk.cd, 1.2); shk = Math.max(shk, 0.5); playSmp(kk.mode === 'sub' ? 'sRoar' : 'bRoar', 1);
    kk.warnTxt = ph === 2 ? 'Шторм усиливается!' : (kk.cth ? 'ЯРОСТЬ КТУЛХУ!' : 'ЯРОСТЬ КРАКЕНА!'); kk.warnT = 2.5; sfx('boom');
    if (ph === 3) document.body.classList.add('rage');
  }

function krHurt(n, label) {
    if (kk.iF > 0 || !kk.on) return;
    kk.iF = 0.9; n = Math.round(n * (1 + 0.1 * (kk.ph - 1)) * (kk.cth ? 1.6 : 1));
    shk = Math.max(shk, 0.55); hurtFlash = 0.3; sfx('no');
    if (kk.mode === 'sub') {
      kk.hull = Math.max(0, kk.hull - n); kk.minHull = Math.min(kk.minHull, kk.hull / hullMax()); playSmp('sStrike', 1);
      popup(P.x, PLAYER_H + 30 - sub.d, '−' + n + ' корпус', '#ff6b6b');
      if (kk.hull <= 0) krLose('hull');
    } else {
      kk.boat = Math.max(0, kk.boat - n); kk.minHull = Math.min(kk.minHull, kk.boat / BOAT_HP); playSmp('bSplash', 1);
      popup(P.x, PLAYER_H + 30, '−' + n + ' лодка', '#ff6b6b');
      if (kk.boat <= 0) krLose('boat');
    }
  }

function krAmmoPick() {
    var a = pickAmmo();
    if (!a && autoAmmo()) a = pickAmmo();
    if (!a && kk.stock.length) a = { k: 'dirty', r: kk.stock[kk.stock.length - 1], c: false, free: true };
    return a;
  }

function krStruggle() {
    if (sub.grab <= 0) return false;
    kk.str++; sfx('jump'); popup(P.x, PLAYER_H + 40 - sub.d, 'Вырывайся! ' + kk.str + '/6', '#ffd2a0');
    if (kk.str >= 6) { sub.grab = 0; kk.str = 0; kk.iF = Math.max(kk.iF, 0.8); popup(P.x, PLAYER_H + 30 - sub.d, 'Свободен!', '#9fe3ff'); playSmp('sDive', 0.9); }
    return true;
  }

function krThrow() {
    if (!kk.on || paused || busLock() || kk.tcd > 0) return;
    if (kk.mode === 'sub' && krStruggle()) { kk.tcd = 0.15; return; }
    if (kk.st !== 'intro' && kk.st !== 'fight') return;
    if (!kk.dv && kk.rise < 0.7 && kk.mode === 'boat') { if (noAmmoT <= 0) { noAmmoT = 1; popup(P.x, PLAYER_H + 24, 'Кракен под водой', '#cfd8e6'); } return; }
    if (kk.dv) { if (noAmmoT <= 0) { noAmmoT = 1; popup(P.x, PLAYER_H + 24 - sub.d, 'Кракен скрылся', '#cfd8e6'); } return; }
    var a = krAmmoPick();
    if (!a) { if (noAmmoT <= 0) { noAmmoT = 1.2; sfx('no'); popup(P.x, PLAYER_H + 24 - (kk.mode === 'sub' ? sub.d : 0), 'Нет снарядов', '#ff9a9a'); } return; }
    if (a.free) kk.stock.pop();
    else { if (a.k === 'wool') save.wool--; else if (a.c) save.inv.c[a.r]--; else save.inv.d[a.r]--; save.carried--; persist(); hud(); autoAmmo(); }
    kk.tcd = kk.mode === 'sub' ? 0.8 : 0.4; sfx('jump');
    var sy = kk.mode === 'sub' ? gY + sub.d : gY - P.z - 100;
    kshots.push({ x: P.x, y: sy, k: a.k, r: a.r, c: a.c, a: 0, age: 0, v: kk.mode === 'sub' ? 300 : 520, used: false, tr: [] });
  }

function krHeadPos() { return { x: kk.x, y: kk.mode === 'sub' ? gY + kk.dy : KSURF() - 110 * kk.rise + 20 }; }

function krHarp() {
    if (ep.on) { epCast(2); return; }
    if (kk.on && kk.cth) { cthTorp(); return; }
    if (!kk.on || kk.mode !== 'boat' || paused) return;
    if (!save.fs.harp) { if (noAmmoT <= 0) { noAmmoT = 1.5; sfx('no'); toast('Гарпун продаётся в лавке рыбака за ' + fmtN(HARP_PRICE) + ' коинов.', 3500); } return; }
    if (kk.st !== 'intro' && kk.st !== 'fight') return;
    if (kk.hcd > 0) { if (noAmmoT <= 0) { noAmmoT = 0.5; popup(P.x, PLAYER_H + 24, 'Гарпун заряжается ' + kk.hcd.toFixed(1) + ' с', '#ffd2a0'); } return; }
    if (kk.rise < 0.7) { if (noAmmoT <= 0) { noAmmoT = 1; popup(P.x, PLAYER_H + 24, 'Кракен под водой', '#cfd8e6'); } return; }
    var d = Math.abs(kk.x - P.x);
    if (d > HARP_RANGE) { kk.hcd = 0.3; sfx('no'); popup(P.x, PLAYER_H + 24, 'Далеко! Подплыви ближе', '#ff9a9a'); return; }
    kk.hcd = HARP_CD; sfx('boom');
    var hp0 = krHeadPos(), blocked = null, i;
    for (i = 0; i < ktn.length; i++) { var tn = ktn[i]; if (tn.st === 'up' && ((tn.x > P.x && tn.x < kk.x) || (tn.x < P.x && tn.x > kk.x)) && Math.abs(tn.x - P.x) > 50) { if (!blocked || Math.abs(tn.x - P.x) < Math.abs(blocked.x - P.x)) blocked = tn; } }
    kharp.push({ x0: P.x, y0: gY - 80 - P.z, x: P.x, y: gY - 80 - P.z, tx: blocked ? blocked.x : hp0.x, ty: blocked ? KSURF() - 90 : hp0.y - 20, blocked: !!blocked, age: 0, done: false });
  }

function krHit(kind, dmg) { // удар по голове
    var hp0 = krHeadPos();
    if (kind === 'bottle') { ring(hp0.x, hp0.y, 50, '#ffd23f'); burst(hp0.x, hp0.y, 8, '#ffd23f', 240, 0.5); }
    krDamage(dmg);
    if (kk.mode === 'sub' && kk.st === 'fight' && Math.random() < 0.35 && kk.cd > 1) { kk.cd = 0.6; kk.cdAtk = 'strike'; }
  }

function krUpdateShots(dt) {
    var i, hr = kk.mode === 'sub' ? 120 : 95;
    for (i = kshots.length - 1; i >= 0; i--) {
      var s = kshots[i]; s.age += dt; s.a += dt * 18;
      var h = krHeadPos(), visible = kk.on && !kk.dv && (kk.mode === 'sub' || kk.rise > 0.55) && kk.st !== 'sink';
      if (!kk.on) { kshots.splice(i, 1); continue; }
      s.v = kk.mode === 'sub' ? Math.min(560, s.v + 300 * dt) : Math.min(1000, s.v + 1300 * dt);
      var dx = h.x - s.x, dy = h.y - s.y, d = Math.sqrt(dx * dx + dy * dy) || 1, step = s.v * dt;
      if (kk.mode === 'sub') { s.tr.push({ x: s.x, y: s.y }); if (s.tr.length > 8) s.tr.shift(); if (Math.random() < 0.5) bubbles.push({ x: s.x, y: s.y, v: 30, r: 1.5 + Math.random() * 2, age: 0 }); }
      if (!visible && s.age > 0.35) { if (!s.used) { s.used = true; ring(s.x, kk.mode === 'sub' ? s.y : KSURF(), 36, '#9fe3ff'); popup(s.x, kk.mode === 'sub' ? PLAYER_H - (s.y - gY) + 40 : 60, 'Мимо', '#cfd8e6'); } kshots.splice(i, 1); continue; }
      if (d < hr || step >= d) {
        if (!s.used && visible) {
          s.used = true;
          var base = s.k === 'wool' ? 8 : (s.k === 'clean' ? Math.round(BOT_DMG[s.r] * 1.25) : BOT_DMG[s.r]);
          krHit('bottle', Math.max(0.5, Math.round(base * (kk.cth ? CTH_RES : KR_RES) * 10) / 10)); // сопротивление чекушкам 75% (у Ктулху 95%)
          sfx(s.r > 1 ? 'rare' : 'pick');
        }
        kshots.splice(i, 1); continue;
      }
      var wob = kk.mode === 'sub' ? Math.sin(s.age * 9) * 60 * dt : 0;
      s.x += dx / d * step; s.y += dy / d * step + wob;
      if (s.age > 3.5) kshots.splice(i, 1);
    }
    for (i = kharp.length - 1; i >= 0; i--) {
      var hh = kharp[i]; hh.age += dt;
      var ex = hh.tx - hh.x, ey = hh.ty - hh.y, ed = Math.sqrt(ex * ex + ey * ey) || 1, st = 1900 * dt;
      if (hh.done) { /* уже попал */ }
      else if (ed <= st) {
        hh.x = hh.tx; hh.y = hh.ty;
        if (hh.blocked) { burst(hh.x, hh.y, 8, '#ffffff', 200, 0.4); popup(hh.x, 150, 'Заблокировано щупальцем', '#cfd8e6'); sfx('no'); }
        else if (kk.on && kk.rise > 0.55 && !kk.dv) { ring(hh.x, hh.y, 90, '#ff9a3c'); burst(hh.x, hh.y, 22, '#ff9a3c', 380, 0.7); shk = Math.max(shk, 0.4); krDamage(HARP_DMG); sfx('rare'); playSmp('bSplash', 0.8); }
        else { ring(hh.x, KSURF(), 40, '#9fe3ff'); popup(hh.x, 60, 'Мимо', '#cfd8e6'); }
        hh.done = true; hh.fade = 0.25;
      } else { hh.x += ex / ed * st; hh.y += ey / ed * st; }
      if (hh.done) { hh.fade -= dt; if (hh.fade <= 0) kharp.splice(i, 1); }
    }
  }

function krWarn(txt, sec) { kk.warnTxt = txt; kk.warnT = sec; }

function krPickAttack() {
    var ph = kk.ph, list;
    if (kk.mode === 'boat') {
      list = [['strike', 50]];
      if (ph >= 2) list.push(['wave', 22], ['whirl', 18], ['slam', 14]);
      if (ph >= 3) list.push(['slam', 14], ['strike', 20]);
    } else {
      list = [['strike', 50], ['ink', 14]];
      if (ph >= 2) list.push(['grab', 22], ['ambush', 16]);
      if (ph >= 3) list.push(['heavy', 24], ['grab', 10]);
    }
    return wpick(list);
  }

function krAttack(a) {
    var ph = kk.ph, i, n, tx;
    if (a === 'strike' && kk.mode === 'boat') {
      n = ph; playSmp('bMove', 0.8);
      for (i = 0; i < n; i++) { tx = P.x + P.vx * 0.45 * (i === 0 ? 1 : 0) + (i === 0 ? 0 : (i % 2 ? 1 : -1) * (130 + Math.random() * 120)); ktn.push({ x: tx, st: 'warn', t: 0, warn: ph === 3 ? 0.85 : 1.15, hit: false }); }
      krWarn('Щупальце! Уходи с красной зоны', 1.4);
    } else if (a === 'wave') {
      kwv.push({ x: kk.x, dir: P.x >= kk.x ? 1 : -1, t: 0, warn: 1.0, hit: false }); krWarn('Волна! Прыгай!', 1.4); playSmp('bCall', 0.7);
    } else if (a === 'whirl') {
      var wx = P.x + (Math.random() < 0.5 ? -1 : 1) * (200 + Math.random() * 150); kwh.push({ x: Math.max(120, Math.min(WORLD_W - 120, wx)), t: 0, warn: 1.2, life: 6, r: 230 }); krWarn('Водоворот! Выплывай', 1.6);
    } else if (a === 'slam') {
      kslam.push({ x: P.x + P.vx * 0.5, t: 0, warn: ph === 3 ? 1.5 : 1.9, r: 150, hit: false }); krWarn('МОЩНЫЙ УДАР! Отплывай!', 2); shk = Math.max(shk, 0.15); playSmp('bRoar', 0.8);
    } else if (kk.mode === 'sub') {
      var sx = P.x, sy = sub.d;
      if (a === 'strike' || a === 'heavy') {
        var heavy = a === 'heavy', lead = 0.35;
        ktn.push({ sub: true, tx: sx + P.vx * lead, ty: gY + sy + sub.vy * lead, st: 'warn', t: 0, warn: heavy ? 1.3 : (ph === 3 ? 0.8 : 1.0), r: heavy ? 120 : 90, dmg: heavy ? 30 : 20, heavy: heavy, hit: false });
        krWarn(heavy ? 'Сильный удар! Уходи из зоны' : 'Щупальце! Уйди в сторону', 1.4);
      } else if (a === 'grab') {
        ktn.push({ sub: true, grab: true, tx: sx, ty: gY + sy, hx: kk.x, hy: gY + kk.dy, st: 'warn', t: 0, warn: 2.4, r: 70, hit: false });
        krWarn('Щупальце тянется к подлодке! Уплывай', 2.2); playSmp('sGroan', 1);
      } else if (a === 'ink') {
        kk.ink = 5; krWarn('Кракен выпустил чернила!', 2); playSmp('sDive', 1);
      } else if (a === 'ambush') {
        kk.dv = true; kk.ambT = 3.2; kk.ambSide = Math.random() < 0.5 ? -1 : 1; kk.ambY = gY + sy; krWarn('Кракен пропал с сонара…', 2.4); playSmp('sSonar', 0.8);
      }
    }
  }

function krUpdateAttacks(dt) {
    var i;
    if (kk.iF > 0) kk.iF -= dt;
    if (kk.whCd > 0) kk.whCd -= dt;
    for (i = ktn.length - 1; i >= 0; i--) {
      var tn = ktn[i]; tn.t += dt;
      if (tn.sub) {
        if (tn.st === 'warn' && tn.grab) { // щупальце ползёт к подлодке и перенацеливается
          var gx = P.x - tn.hx, gy = gY + sub.d - tn.hy, gd = Math.sqrt(gx * gx + gy * gy) || 1, gs = 150 * dt;
          tn.cx = (tn.cx === undefined ? tn.hx : tn.cx); tn.cy = (tn.cy === undefined ? tn.hy : tn.cy);
          var qx = P.x - tn.cx, qy = gY + sub.d - tn.cy, qd = Math.sqrt(qx * qx + qy * qy) || 1;
          tn.cx += qx / qd * Math.min(qd, 230 * dt); tn.cy += qy / qd * Math.min(qd, 230 * dt);
          if (qd < 70 && !tn.hit) { tn.hit = true; sub.grab = 3.2; kk.str = 0; krWarn('Подлодку схватили! Жми ▲ ▼ или «Бросить»', 3); shk = Math.max(shk, 0.5); playSmp('sStrike', 1); }
          if (tn.t >= tn.warn) tn.st = 'down', tn.t = 0;
        } else if (tn.st === 'warn') {
          if (tn.t >= tn.warn) {
            tn.st = 'up'; tn.t = 0; shk = Math.max(shk, 0.35); playSmp('sStrike', 0.9);
            var dxs = P.x - tn.tx, dys = gY + sub.d - tn.ty;
            if (Math.sqrt(dxs * dxs + dys * dys) < tn.r + SUB_HALF * 0.5) { krHurt(tn.dmg); if (tn.heavy) { sn.cd = Math.max(sn.cd, 14); kk.noise = 10; krWarn('Сонар сбит ударом!', 2.2); } }
            else popup(tn.tx, PLAYER_H - (tn.ty - gY) + 30, 'Мимо', '#9fe3ff');
          }
        } else if (tn.st === 'up') { if (tn.t > 0.5) { tn.st = 'down'; tn.t = 0; } }
        else if (tn.st === 'down') { if (tn.t > 0.35) ktn.splice(i, 1); }
        continue;
      }
      if (tn.st === 'warn') {
        if (tn.t >= tn.warn) {
          tn.st = 'up'; tn.t = 0; shk = Math.max(shk, 0.35); playSmp('bSplash', 0.9); ring(tn.x, KSURF(), 80, '#ffffff'); burst(tn.x, KSURF(), 10, '#bfe9ff', 260, 0.6);
          if (!tn.hit && Math.abs(P.x - tn.x) < 85 && P.z < 55) { tn.hit = true; krHurt(22); }
        }
      } else if (tn.st === 'up') { if (tn.t > 0.8) { tn.st = 'down'; tn.t = 0; } }
      else if (tn.t > 0.4) ktn.splice(i, 1);
    }
    for (i = kwv.length - 1; i >= 0; i--) {
      var wv = kwv[i]; wv.t += dt;
      if (wv.t > wv.warn) {
        wv.x += wv.dir * 360 * dt;
        if (!wv.hit && Math.abs(P.x - wv.x) < 70 && P.z < 55) { wv.hit = true; krHurt(14); P.x += wv.dir * 90; P.vx = wv.dir * 160; }
        if (wv.t > 7 || wv.x < -100 || wv.x > WORLD_W + 100) kwv.splice(i, 1);
      }
    }
    for (i = kwh.length - 1; i >= 0; i--) {
      var wh = kwh[i]; wh.t += dt;
      if (wh.t > wh.warn) {
        var dd = wh.x - P.x, ad = Math.abs(dd);
        if (ad < wh.r) { P.x += (dd > 0 ? 1 : -1) * (50 + 120 * (1 - ad / wh.r)) * dt; if (ad < 45 && P.z < 30 && kk.whCd <= 0) { kk.whCd = 1.3; krHurt(10); } }
        if (wh.t > wh.warn + wh.life) kwh.splice(i, 1);
      }
    }
    for (i = kslam.length - 1; i >= 0; i--) {
      var sl = kslam[i]; sl.t += dt;
      if (sl.t >= sl.warn && !sl.hit) {
        sl.hit = true; shk = Math.max(shk, 0.9); playSmp('bSplash', 1); sfx('boom'); ring(sl.x, KSURF(), sl.r, '#ffffff'); burst(sl.x, KSURF(), 24, '#bfe9ff', 420, 0.9);
        if (Math.abs(P.x - sl.x) < sl.r) { krHurt(38); P.vx = (P.x >= sl.x ? 1 : -1) * 220; }
      }
      if (sl.t > sl.warn + 0.7) kslam.splice(i, 1);
    }
  }

function krSnap() { return { hp: Math.round(kk.hp * 10) / 10, mx: kk.max, ph: kk.ph, lf: Math.round(kk.left), st: kk.st, dv: kk.dv ? 1 : 0 }; }

function krPlaceHead(dt) {
    // голова держится рядом с игроком: лодка слева-справа, подлодка около её глубины
    var want = P.x + kk.side * (kk.mode === 'sub' ? 340 : 330);
    if (kk.cy !== 'dive') kk.x += (want - kk.x) * Math.min(1, 0.9 * dt);
    kk.x = Math.max(140, Math.min(WORLD_W - 140, kk.x));
    if (kk.mode === 'sub') {
      var wy = Math.max(KR_D0, Math.min(sub.d - 20 + Math.sin(t * 0.8) * 40, kk.cth ? 5000 : KR_D1, seaFloor(kk.x) - 150));
      kk.dy += (wy - kk.dy) * Math.min(1, 1.2 * dt);
    }
  }

function updateKk(dt) {
    stormTick(dt); stormVis(dt);
    if (kk.flash > 0) kk.flash = Math.max(0, kk.flash - dt * 4);
    if (kk.warnT > 0) kk.warnT -= dt;
    if (!kk.on || paused) return;
    if (loc.i !== 5) { krAbort('leave'); return; }
    if (boss.on) { krAbort(''); return; }
    kk.age += dt; kk.t += dt; if (kk.hcd > 0) kk.hcd -= dt; if (kk.tcd > 0) kk.tcd -= dt;
    // кнопки: на лодке гарпун, под водой вырываться
    if (bHarp) { var wh2 = ep.on ? ep.abil : ((kk.mode === 'boat' || kk.cth) && (kk.st === 'fight' || kk.st === 'intro')); if (ep.on && bHarp.textContent !== 'Взрыв') bHarp.textContent = 'Взрыв'; else if (!ep.on && bHarp.textContent === 'Взрыв') bHarp.textContent = 'Гарпун'; if (bHarp.hidden === wh2) bHarp.hidden = !wh2; }
    if (kk.mode === 'sub' && sub.grab > 0) {
      if ((input.up && !kk.lastUp) || (input.dn && !kk.lastDn)) krStruggle();
      P.x = sub.px; P.vx = 0; sub.grab -= dt; kk.hull = Math.max(0, kk.hull - 4 * dt); if (kk.hull <= 0) krLose('hull');
      if (sub.grab <= 0) { sub.grab = 0; kk.iF = Math.max(kk.iF, 0.8); }
    }
    kk.lastUp = !!input.up; kk.lastDn = !!input.dn;
    if (kk.ink > 0) kk.ink -= dt;
    if (kk.noise > 0) kk.noise -= dt;
    // следим за границами: у острова слева Кракен не нападает
    var fol = krRole === 'fol';
    if (fol && krSn) {
      kk.hp = krSn.hp; kk.max = krSn.mx; kk.left = krSn.lf;
      if (krSn.ph > kk.ph) krPhase(krSn.ph);
      if ((krSn.st === 'retreat' || krSn.hp <= 0) && kk.st === 'fight') { kk.hp = 0; krWin(); }
    }
    if (kk.st === 'warn') {
      if (kk.t > 7) { kk.st = 'intro'; kk.t = 0; playSmp(kk.mode === 'sub' ? 'sRoar' : 'bRoar', 1); shk = Math.max(shk, 0.7); krWarn(kk.mode === 'sub' ? 'КРАКЕН' : 'КРАКЕН ПОДНИМАЕТСЯ!', 3); }
      else if (kk.t > 1 && !kk.warnT) { krWarn(kk.mode === 'sub' ? 'Приближается неизвестный объект…' : 'Приближается неизвестное существо…', 2.5); }
      krPlaceHead(dt); return;
    }
    if (kk.mode === 'sub' && kk.st !== 'retreat' && sub.d < KR_D0 - 50) sub.d = KR_D0 - 50; // в бою подлодку держит на глубине Кракена
    krPlaceHead(dt); krUpdateAttacks(dt);
    var tr = kk.rise > kk.rtgt ? -1 : 1;
    if (kk.st === 'intro') {
      kk.rise = Math.min(1, kk.t / 3.2);
      if (kk.t > 3.6) { kk.st = 'fight'; kk.t = 0; kk.cd = 1.5; kk.cy = 'up'; kk.cyT = 10; }
    } else if (kk.st === 'fight') {
      if (!fol) { kk.left -= dt; if (kk.left <= 0) { krLose('time'); return; } }
      else if (!krSn) kk.left -= dt;
      // цикл: голова наверху -> ныряет -> появляется с другой стороны
      if (kk.mode === 'boat') {
        if (kk.cy === 'up') {
          kk.rise = Math.min(1, kk.rise + dt * 2); kk.cyT -= dt;
          if (kk.cyT <= 0) { kk.cy = 'dive'; kk.cyT = [3.2, 3, 2.6][kk.ph - 1]; kk.dv = true; playSmp('bMove', 0.9); ring(kk.x, KSURF(), 120, '#ffffff'); }
        } else if (kk.cy === 'dive') {
          kk.rise = Math.max(0, kk.rise - dt * 2.5); kk.cyT -= dt;
          if (kk.cyT <= 0) { kk.side = -kk.side * (Math.random() < 0.7 ? 1 : -1); kk.x = P.x + kk.side * (330 + Math.random() * 180); kk.dv = false; kk.cy = 'rise'; kk.cyT = 1; ring(kk.x, KSURF(), 120, '#ff9a9a'); playSmp('bSplash', 1); krWarn('Кракен вынырнул ' + (kk.side > 0 ? 'справа' : 'слева') + '!', 1.5); }
        } else {
          kk.rise = Math.min(1, kk.rise + dt * 1.2); kk.cyT -= dt;
          if (kk.cyT <= 0) { kk.cy = 'up'; kk.cyT = [10, 8, 6][kk.ph - 1]; }
        }
      } else {
        kk.rise = 1;
        if (kk.dv) { kk.ambT -= dt; kk.x += kk.ambSide * 0; if (kk.ambT <= 0) { kk.dv = false; ktn.push({ sub: true, amb: true, tx: P.x, ty: kk.ambY, st: 'warn', t: 0, warn: 0.9, r: 90, dmg: 26, hit: false, band: true }); krWarn('Он слева' === '' ? '' : (kk.ambSide > 0 ? 'Удар справа! Смени глубину' : 'Удар слева! Смени глубину'), 1.2); kk.side = kk.ambSide; kk.x = P.x + kk.side * 340; playSmp('sRoar', 1); } }
      }
      kk.cd -= dt;
      if (kk.cd <= 0 && !(kk.mode === 'boat' && kk.cy === 'rise') && !(kk.mode === 'sub' && kk.dv) && !(kk.mode === 'sub' && sub.grab > 0)) {
        var atk = kk.cdAtk || krPickAttack(); kk.cdAtk = '';
        if (kk.mode === 'boat' && kk.cy === 'dive' && atk !== 'strike') atk = 'strike';
        krAttack(atk);
        kk.cd = ([2.8, 2.1, 1.5][kk.ph - 1]) * (1 + Math.random() * 0.4) * (krRole ? 0.92 : 1);
      }
      // запас бутылок: на воде их выносит шторм, в подлодке они лежат в отсеке
      if (kk.mode === 'boat') {
        kk.dropT -= dt;
        if (kk.dropT <= 0 && kdrops.length < 4) { kk.dropT = 3.2; kdrops.push({ x: Math.max(160, Math.min(WORLD_W - 160, P.x + (Math.random() < 0.5 ? -1 : 1) * (140 + Math.random() * 300))), r: wpick([[0, 30], [1, 25], [2, 20], [3, 14], [4, 8], [5, 3]]), age: 0 }); }
        for (var di = kdrops.length - 1; di >= 0; di--) {
          var dr = kdrops[di]; dr.age += dt;
          if (Math.abs(dr.x - P.x) < 60 && kk.stock.length < 8) { kk.stock.push(dr.r); kdrops.splice(di, 1); sfx('pick'); popup(dr.x, PLAYER_H + 10, '+ бутылка: ' + RAR[dr.r].n, RAR[dr.r].c); }
          else if (dr.age > 22) kdrops.splice(di, 1);
        }
      } else {
        kk.dropT -= dt;
        if (kk.dropT <= 0) { kk.dropT = 3; if (kk.stock.length < 8) kk.stock.push(wpick([[0, 30], [1, 25], [2, 20], [3, 14], [4, 8], [5, 3]])); }
      }
      // победа (владелец или одиночная игра)
    } else if (kk.st === 'retreat') {
      kk.rise = Math.max(0, 1 - kk.t / 4); if (kk.mode === 'sub') kk.dy += 90 * dt;
      if (kk.t > 4.5) krFinish(true);
    } else if (kk.st === 'sink') {
      kk.rise = Math.max(0.3, 1 - kk.t / 3);
      if (kk.t > 2.8) krFinish(false, kk.mode === 'sub' ? 'hull' : 'boat');
    }
    krUpdateShots(dt);
    // сеть
    if (krRole === 'own' && socket && net.room && net.state === 'online') { krSnT += dt; if (krSnT >= 0.25) { krSnT = 0; socket.volatile.emit('kr', { sn: krSnap() }); } }
    krUi();
  }

function krSolo() { if (!kk.on) return; krRole = ''; krOwner = ''; krSn = null; }

function krNetMsg(m) {
    if (!m) return;
    if (m.start) {
      if (loc.i !== 5 || kk.on || boss.on) return;
      cthF = !!m.c; krStart(true, m); cthF = false; if (kk.on) krOwner = m.own || '';
    } else if (m.deny) {
      if (kk.on) { krRole = 'fol'; krOwner = m.own || ''; krSn = null; }
    } else if (m.own) {
      krOwner = m.own;
      if (kk.on && socket && m.own === socket.id) { krRole = 'own'; krSnT = 0; }
    } else if (m.sn) { if (kk.on && krRole === 'fol') krSn = m.sn; }
    else if (m.dmg) { if (kk.on && krRole === 'own') krDamage(m.dmg, true); }
    else if (m.end) {
      if (!kk.on || krRole !== 'fol') return;
      if (m.w) { kk.hp = 0; krWin(); } else krFinish(false, 'time');
    }
  }

function krUi() {
    if (!kk.on) return;
    var k = [kk.ph, Math.ceil(kk.hp), Math.ceil(kk.left), Math.ceil(kk.boat), Math.ceil(kk.hull), ammo, ammoCount(), kk.stock.length, save.fs.harp, kk.hcd > 0, sub.grab > 0].join('|');
    if (k === lastBossUi) return;
    lastBossUi = k;
    elBossFill.style.width = (kk.hp / kk.max * 100).toFixed(1) + '%';
    elBossTxt.textContent = Math.ceil(kk.hp) + ' / ' + Math.round(kk.max) + ' · ' + ['', 'появление', 'шторм', 'ярость'][kk.ph];
    elBossTime.textContent = fmtTime(Math.max(0, kk.left));
    var sub_ = kk.mode === 'sub', cur = sub_ ? kk.hull : kk.boat, mx = sub_ ? hullMax() : BOAT_HP;
    elBossShieldWrap.style.display = ''; elBossShield.style.width = Math.max(0, cur / mx * 100).toFixed(0) + '%'; elBossShield.style.background = cur / mx > 0.5 ? '#3ddc84' : (cur / mx > 0.25 ? '#ffb020' : '#ff4a4a');
    var tail = sub_ ? '' : (save.fs.harp ? ' · гарпун ' + (kk.hcd > 0 ? kk.hcd.toFixed(1) + ' с' : 'готов') : ' · гарпун: лавка рыбака, ' + fmtN(HARP_PRICE));
    elBossAmmo.textContent = (sub_ ? 'Корпус ' : 'Лодка ') + Math.ceil(cur) + '/' + mx + ' · ' + AMMO_NAMES[ammo] + ' ×' + ammoCount() + ' · запас ' + kk.stock.length + tail;
  }

function krTent(bx, by, tx, ty, w, ph, col) {
    var n = 14, i, px = bx, py = by, dx = tx - bx, dy = ty - by, len = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / len, ny = dx / len;
    ctx.lineCap = 'round';
    for (i = 1; i <= n; i++) {
      var u = i / n, wob = Math.sin(u * 5 + ph) * 16 * u * (1 - u * 0.3), x = bx + dx * u + nx * wob, y = by + dy * u + ny * wob;
      ctx.strokeStyle = col || '#6a2060'; ctx.lineWidth = Math.max(4, w * (1 - u * 0.82));
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      if (i % 2 === 0 && u < 0.92) { ctx.fillStyle = '#f2b8e2'; ctx.beginPath(); ctx.arc(x + nx * w * 0.18, y + ny * w * 0.18, Math.max(1.5, w * 0.07 * (1 - u)), 0, 6.3); ctx.fill(); }
      px = x; py = y;
    }
  }

function krHead(x, y, s, lx, ly, flash, alpha, rage) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = alpha == null ? 1 : alpha;
    var g = ctx.createLinearGradient(0, -190, 0, 60); if (kk.cth) { g.addColorStop(0, rage ? '#c23a2a' : '#2f9a6a'); g.addColorStop(0.55, '#14523a'); g.addColorStop(1, '#082a1e'); } else { g.addColorStop(0, rage ? '#b02a50' : '#9a3a86'); g.addColorStop(0.55, '#52184c'); g.addColorStop(1, '#2a0c2c'); }
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-100, 50); ctx.bezierCurveTo(-130, -60, -75, -175, 0, -195); ctx.bezierCurveTo(75, -175, 130, -60, 100, 50); ctx.quadraticCurveTo(0, 85, -100, 50); ctx.fill();
    ctx.fillStyle = 'rgba(255,170,230,.18)'; for (var i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-70 + (i * 37) % 140, -150 + (i * 53) % 130, 6 + (i % 3) * 3, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.ellipse(-30, -120, 24, 52, 0.4, 0, 6.3); ctx.fill();
    // глаз
    ctx.fillStyle = '#fff3c8'; ctx.beginPath(); ctx.ellipse(0, -16, 52, 38, 0, 0, 6.3); ctx.fill();
    var ig = ctx.createRadialGradient(lx * 0.12, -16 + ly * 0.12, 2, lx * 0.12, -16 + ly * 0.12, 26); ig.addColorStop(0, '#ffcf3a'); ig.addColorStop(1, rage ? '#d12a1a' : '#e07a14');
    ctx.fillStyle = ig; ctx.beginPath(); ctx.arc(Math.max(-14, Math.min(14, lx * 0.12)), -16 + Math.max(-9, Math.min(9, ly * 0.12)), 25, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#16050f'; ctx.beginPath(); ctx.ellipse(Math.max(-14, Math.min(14, lx * 0.12)), -16 + Math.max(-9, Math.min(9, ly * 0.12)), 6, 21, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#2a0c2c'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-60, -44); ctx.quadraticCurveTo(0, rage ? -26 : -62, 60, -44); ctx.stroke();
    // клюв и щупальца у рта
    ctx.fillStyle = '#3a1038'; ctx.beginPath(); ctx.moveTo(-26, 40); ctx.lineTo(0, 78); ctx.lineTo(26, 40); ctx.fill();
    for (i = 0; i < 6; i++) krTent(-72 + i * 29, 44, -90 + i * 36 + Math.sin(t * 2 + i) * 18, 150 + (i % 2) * 28, 22, t * 2 + i, '#5a1a52');
    if (flash > 0) { ctx.globalAlpha = Math.min(0.7, flash * 0.7); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-100, 50); ctx.bezierCurveTo(-130, -60, -75, -175, 0, -195); ctx.bezierCurveTo(75, -175, 130, -60, 100, 50); ctx.fill(); }
    ctx.restore();
  }

function krWarnZone(x, y, rx, ry, p, col) {
    ctx.save(); ctx.fillStyle = col.replace('A', (0.18 + 0.2 * Math.sin(t * 14)).toFixed(2)); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = col.replace('A', '0.85'); ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = col.replace('A', '0.5'); ctx.beginPath(); ctx.ellipse(x, y, rx * Math.min(1, p), ry * Math.min(1, p), 0, 0, 6.3); ctx.fill(); ctx.restore();
  }

function drawKraken() {
    if (!kk.on || loc.i !== 5) return;
    var h = krHeadPos(), sub_ = kk.mode === 'sub', hx = h.x, i;
    if (kk.x < camX - 400 || kk.x > camX + vw + 400) { if (!sub_) return; }
    if (sub_) {
      if (kk.dv) return;
      var dim = kk.st === 'warn' ? Math.min(0.55, kk.t / 9) : (kk.st === 'intro' ? 0.55 + 0.45 * (kk.t / 3.6) : 1);
      ctx.save();
      krHead(hx, h.y, kk.cth ? 3.1 : 1.55, P.x - hx, gY + sub.d - h.y, kk.flash, dim * (kk.st === 'retreat' ? Math.max(0, 1 - kk.t / 4) : 1), kk.ph === 3);
      ctx.restore();
      return;
    }
    // на воде: голова поднимается из волн
    var surf = KSURF(), up = kk.rise;
    if (up <= 0.01) { // под водой видна лишь тёмная тень
      ctx.fillStyle = 'rgba(20,6,30,.35)'; ctx.beginPath(); ctx.ellipse(hx, surf + 30, 170, 36, 0, 0, 6.3); ctx.fill();
      return;
    }
    ctx.save(); ctx.beginPath(); ctx.rect(hx - 420, gY - 520, 840, surf - (gY - 520) + 2); ctx.clip();
    krHead(hx, surf - 40 + 280 * (1 - up), 1.0, P.x - hx, -30, kk.flash, kk.st === 'retreat' ? Math.max(0, 1 - kk.t / 4) : 1, kk.ph === 3);
    // боковые щупальца при появлении
    if (up > 0.5) { for (i = 0; i < 4; i++) { var s0 = i < 2 ? -1 : 1, off = (i % 2 + 1) * 90; krTent(hx + s0 * off, surf + 10, hx + s0 * (off + 80 + Math.sin(t * 1.4 + i) * 30), surf - 150 - 40 * Math.sin(t * 1.1 + i) * up, 34, t + i, '#6a2060'); } }
    ctx.restore();
    ctx.fillStyle = 'rgba(30,140,190,.5)'; ctx.fillRect(hx - 300, surf, 600, 40);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; for (i = -4; i <= 4; i++) { ctx.beginPath(); ctx.ellipse(hx + i * 36 + Math.sin(t * 3 + i) * 6, surf + 2, 22, 5, 0, 0, 6.3); ctx.fill(); }
  }

function drawKrFront() {
    if (!kk.on || loc.i !== 5) return;
    var i, surf = KSURF(), sub_ = kk.mode === 'sub';
    // запас бутылок на воде
    for (i = 0; i < kdrops.length; i++) {
      var d = kdrops[i], by = surf + Math.sin(t * 2.4 + i) * 3;
      ctx.save(); ctx.translate(d.x, by); ctx.rotate(Math.sin(t * 2 + i) * 0.4);
      ctx.fillStyle = RAR[d.r].c; ctx.fillRect(-4, -14, 8, 16); ctx.fillRect(-2, -20, 4, 7); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.strokeRect(-4, -14, 8, 16);
      ctx.restore(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(d.x, by + 3, 14, 3, 0, 0, 6.3); ctx.fill();
    }
    for (i = 0; i < kwh.length; i++) {
      var wh = kwh[i], p = wh.t / wh.warn;
      if (wh.t < wh.warn) krWarnZone(wh.x, surf + 6, wh.r * 0.7 * Math.min(1, p + 0.3), 20, p, 'rgba(255,60,60,A)');
      else {
        ctx.save(); ctx.translate(wh.x, surf + 8); ctx.strokeStyle = 'rgba(210,240,255,.75)'; ctx.lineWidth = 3;
        for (var q = 0; q < 5; q++) { var rr = wh.r * (0.25 + q * 0.18), ph = t * 5 - q; ctx.beginPath(); ctx.ellipse(0, 0, rr, rr * 0.18, 0, ph, ph + 4.2); ctx.stroke(); }
        ctx.fillStyle = 'rgba(5,25,50,.55)'; ctx.beginPath(); ctx.ellipse(0, 2, 44, 9, 0, 0, 6.3); ctx.fill(); ctx.restore();
      }
    }
    for (i = 0; i < kslam.length; i++) {
      var sl = kslam[i];
      if (sl.t < sl.warn) krWarnZone(sl.x, surf + 6, sl.r, 22, sl.t / sl.warn, 'rgba(255,40,40,A)');
      else { ctx.fillStyle = 'rgba(255,255,255,' + Math.max(0, 0.8 - (sl.t - sl.warn)).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(sl.x, surf - 10, sl.r * (0.6 + (sl.t - sl.warn)), 90 * (1 - (sl.t - sl.warn)), 0, Math.PI, 0); ctx.fill(); }
    }
    for (i = 0; i < kwv.length; i++) {
      var wv = kwv[i];
      if (wv.t < wv.warn) { ctx.fillStyle = 'rgba(255,60,60,' + (0.25 + 0.2 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(wv.x - 40, surf - 8, 80, 18); ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(wv.dir > 0 ? '→ прыгай' : 'прыгай ←', wv.x, surf - 22); }
      else {
        var gr = ctx.createLinearGradient(0, surf - 90, 0, surf + 10); gr.addColorStop(0, 'rgba(235,250,255,.95)'); gr.addColorStop(1, 'rgba(60,160,210,.85)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(wv.x - 90, surf + 10); ctx.quadraticCurveTo(wv.x - 40, surf - 90, wv.x + wv.dir * 20, surf - 100); ctx.quadraticCurveTo(wv.x + 50, surf - 40, wv.x + 90, surf + 10); ctx.closePath(); ctx.fill();
      }
    }
    for (i = 0; i < ktn.length; i++) {
      var tn = ktn[i];
      if (tn.sub) {
        if (tn.band) {
          var by2 = tn.ty;
          if (tn.st === 'warn') { ctx.fillStyle = 'rgba(255,60,60,' + (0.16 + 0.15 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(camX - 20, by2 - 90, vw + 40, 180); }
          else if (tn.st === 'up') { ctx.strokeStyle = '#7a2870'; ctx.lineWidth = 60; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kk.x + kk.side * 100, by2); ctx.lineTo(P.x - kk.side * 30, by2); ctx.stroke(); }
          continue;
        }
        if (tn.grab) {
          if (tn.cx !== undefined) krTent(tn.hx, tn.hy, tn.cx, tn.cy, 40, t * 3, '#7a2870');
          if (sub.grab > 0) { ctx.strokeStyle = '#7a2870'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(P.x, gY + sub.d, 62, 0, 6.3); ctx.stroke(); }
          continue;
        }
        if (tn.st === 'warn') krWarnZone(tn.tx, tn.ty, tn.r, tn.r, tn.t / tn.warn, 'rgba(255,50,50,A)');
        else { var u = tn.st === 'up' ? Math.min(1, tn.t / 0.15) : Math.max(0, 1 - tn.t / 0.35); krTent(kk.x, gY + kk.dy + 20, kk.x + (tn.tx - kk.x) * u, gY + kk.dy + 20 + (tn.ty - gY - kk.dy - 20) * u, 46, t * 6, '#7a2870'); }
        continue;
      }
      if (tn.st === 'warn') { krWarnZone(tn.x, surf + 8, 85, 14, tn.t / tn.warn, 'rgba(255,50,50,A)'); ctx.fillStyle = '#fff'; ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('!', tn.x, surf - 10 - Math.sin(t * 12) * 3); }
      else { var hgt = tn.st === 'up' ? 230 * Math.min(1, tn.t / 0.18) : 230 * Math.max(0, 1 - tn.t / 0.4); ctx.save(); ctx.beginPath(); ctx.rect(tn.x - 100, surf - 320, 200, 322); ctx.clip(); krTent(tn.x, surf + 10, tn.x + Math.sin(t * 4) * 20, surf - hgt, 54, t * 5 + tn.x, '#6a2060'); ctx.restore(); }
    }
    for (i = 0; i < kshots.length; i++) {
      var s = kshots[i];
      if (sub_ && s.tr.length) { ctx.strokeStyle = 'rgba(210,240,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.tr[0].x, s.tr[0].y); for (var z = 1; z < s.tr.length; z++) ctx.lineTo(s.tr[z].x, s.tr[z].y); ctx.stroke(); }
      ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.a);
      ctx.fillStyle = s.k === 'wool' ? '#f2e6b3' : (s.k === 'clean' ? '#9fe3ff' : RAR[s.r].c); ctx.fillRect(-4, -9, 8, 16); ctx.fillRect(-2, -14, 4, 6); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.strokeRect(-4, -9, 8, 16);
      ctx.restore();
    }
    for (i = 0; i < kharp.length; i++) {
      var hh = kharp[i]; ctx.strokeStyle = 'rgba(240,240,240,.85)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hh.x0, hh.y0); ctx.lineTo(hh.x, hh.y); ctx.stroke();
      var ang = Math.atan2(hh.ty - hh.y0, hh.tx - hh.x0); ctx.save(); ctx.translate(hh.x, hh.y); ctx.rotate(ang);
      ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-4, -8); ctx.lineTo(-4, 8); ctx.fill(); ctx.fillStyle = '#7a4a22'; ctx.fillRect(-34, -2, 32, 4); ctx.restore();
    }
  }

function drawStormFx() {
    if (loc.i !== 5) return;
    var k = storm.k, i;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (k > 0.01) {
      ctx.fillStyle = 'rgba(8,14,32,' + (0.5 * Math.min(1, k)).toFixed(3) + ')'; ctx.fillRect(0, 0, W, H);
      if (kk.mode !== 'sub') {
        ctx.strokeStyle = 'rgba(190,215,240,' + (0.45 * Math.min(1, k)).toFixed(2) + ')'; ctx.lineWidth = 1.4; ctx.beginPath();
        var cnt = Math.round(90 * Math.min(1, k)), sl = 20 + 10 * k;
        for (i = 0; i < cnt; i++) { var rx = ((i * 97.3 + storm.rainT * (260 + (i % 7) * 30) * 0.35) % (W + 100)) - 20, ry = ((i * 211.7 + storm.rainT * (780 + (i % 5) * 60)) % (H + 60)) - 30; ctx.moveTo(rx, ry); ctx.lineTo(rx - 5 - 4 * k, ry + sl); }
        ctx.stroke();
      }
    }
    if (storm.fl > 0) { ctx.fillStyle = 'rgba(235,240,255,' + Math.min(0.75, storm.fl * 0.7).toFixed(2) + ')'; ctx.fillRect(0, 0, W, H); }
    if (kk.on && kk.mode === 'sub') {
      if (kk.ink > 0) {
        var a = Math.min(1, kk.ink / 1.2) * 0.96, sx = (P.x - camX) * scale, sy = (gY + sub.d - camY) * scale, g = ctx.createRadialGradient(sx, sy, 60, sx, sy, 230 * scale);
        g.addColorStop(0, 'rgba(6,2,12,' + (a * 0.15).toFixed(2) + ')'); g.addColorStop(1, 'rgba(6,2,12,' + a.toFixed(2) + ')'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      if (kk.st === 'warn' || kk.st === 'intro') { ctx.fillStyle = 'rgba(255,40,40,' + (0.07 + 0.05 * Math.sin(t * 6)).toFixed(2) + ')'; ctx.fillRect(0, 0, W, H); }
    }
    if (kk.on && kk.warnT > 0 && kk.warnTxt) {
      var al = Math.min(1, kk.warnT * 1.5), ty = H * 0.42;
      ctx.font = '800 ' + Math.round(Math.min(28, W / 16)) + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(20,0,10,' + al.toFixed(2) + ')'; ctx.strokeText(kk.warnTxt, W / 2, ty); ctx.fillStyle = 'rgba(255,214,120,' + al.toFixed(2) + ')'; ctx.fillText(kk.warnTxt, W / 2, ty);
    }
  }

function fpHash(n) { n = (n ^ 61) ^ (n >>> 16); n = (n + (n << 3)) | 0; n ^= n >>> 4; n = Math.imul(n, 0x27d4eb2d); n ^= n >>> 15; return (n >>> 0) / 4294967296; }

function fuelPriceAt(ms) {
    var k = Math.floor(ms / FP_STEP), u = fpHash(k);
    // логарифмический разброс от 2 до 1000, но чаще дорого
    return Math.max(FP_MIN, Math.min(FP_MAX, Math.round(FP_MIN * Math.pow(FP_MAX / FP_MIN, Math.pow(u, 0.7)))));
  }

function fuelPrice() { return fuelPriceAt(Date.now()); }

function fuelLeft() { return Math.max(0, Math.ceil((FP_STEP - Date.now() % FP_STEP) / 1000)); }

function epK() { return touch ? ['«Донат-луч»', '«Щит»', '«Взрыв»'] : ['F: донат-луч', 'V: щит', 'H: взрыв']; }

function epSay(s, secs) { ep.line = s; ep.lineT = secs || 2.5; ep.lineMax = ep.lineT; if (!ep.assist && partyOn() && partyHost()) storyEmit({ el: [String(s).slice(0, 120), secs || 2.5] }); }

function epTitle(a, b, secs) { ep.ttl = a; ep.ttlS = b || ''; ep.ttlT = secs || 2.5; ep.ttlM = ep.ttlT; if (!ep.assist && partyOn() && partyHost()) storyEmit({ et: [String(a).slice(0, 60), String(b || '').slice(0, 100), secs || 2.5] }); }

function epStart() {
    if (ep.on || paused || busLock() || boss.on || kk.on) return false;
    if (loc.i !== 6 || save.mx.er) return false;
    var rx = WH_X + 430;
    ep = { on: true, st: 'call', t: 0, age: 0, hx: rx, hz: 760, hf: -1, hp: EP_HP, hmax: EP_HP, hfat: 1, hfl: 0,
      mana: 0, abil: false, mcd: 0, scd: 0, ncd: 0, sh: 0, ifr: 0, field: true, stun: 0, fat: false, fail: false, pf: 1, pm: 1,
      mx: rx, mz: 0, mrot: 0, mshow: false, mal: 1, zap: 0, mogOn: false, mogx: 0, mogA: 1, mogF: 0,
      beams: [], waves: [], bolts: [], burgs: [], gold: [], pc: 0, hc: 0, ft: 0, atk: 2, atkN: 0, chew: 0, ptT: 0, tgt: null,
      line: '', lineT: 0, lineMax: 1, did: {}, hint: false, over: 0, res: '', bar: 0, mogT: 0, ttl: '', ttlS: '', ttlT: 0, ttlM: 1, erase: 0, flash: 0, assist: epAs, thx: rx, thz: 760, snT: 0, eaten: {} };
    hero.on = false; closeWH(); sfx('rare'); shk = 0.5;
    epSay('Хоумлендер прилетел!', 2.5); epTitle('ХОУМЛЕНДЕР', 'прилетел к Белому дому', 2.4);
    if (!epAs && rcMulti()) { try { socket.emit('uni', { l: 6, kind: 'ep' }); } catch (e) {} }
    return true;
  }

function epEnd(why) {
    if (!ep.on) return;
    if (!ep.assist && partyOn() && partyHost()) storyEmit({ ee: why });
    if (partyOn()) setTimeout(function () { if (!ep.on) partySet(null); }, 700);
    ep.on = false; ep.pm = 1; ep.pf = 1; ep.beams = []; ep.waves = []; ep.bolts = []; ep.burgs = [];
    if (why === 'faint' || why === 'timeout') { save.bossUntil = Math.max(save.bossUntil || 0, Date.now() + EP_FAIL_CD); persist(); }
    if (why === 'timeout') toast('Хоумлендер улетел. Битва затянулась.', 4000);
  }

function epGo(s) { ep.st = s; ep.t = 0; }

function epHurt(n) {
    if (ep.ifr > 0) return;
    if (ep.sh > 0) { popup(P.x, PLAYER_H + 24, 'Щит', '#9fe3ff'); ep.ifr = 0.3; return; }
    ep.ifr = 0.9; hurt(n);
  }

function epHomPos() { return { x: ep.hx, y: gY - ep.hz - bossH() * 0.5 }; }

function epCast(k) {
    if (!ep.on || paused || gh.on) return;
    if (!ep.abil) { if (ep.st !== 'call' && ep.st !== 'mell') return; sfx('no'); return; }
    if (ep.st === 'moggi' || ep.st === 'fatwarn' || ep.st === 'food' || ep.st === 'kill' || ep.st === 'end') {
      if (ep.st === 'food') { if (noAmmoT <= 0) { noAmmoT = 1; popup(P.x, PLAYER_H + 24, 'Жри бургеры!', '#ffd23f'); } }
      return;
    }
    var mul = ep.fat ? 2.5 : 1, d;
    if (k === 0) {
      if (ep.mcd > 0) return;
      if (ep.mana < 12) { if (noAmmoT <= 0) { noAmmoT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Нет силы', '#ff9a9a'); } return; }
      ep.mana -= 12; ep.mcd = 0.35; sfx('jump');
      var hp0 = epHomPos();
      ep.bolts.push({ x: P.x, y: gY - P.z - 100, d: (ep.st === 'finish' ? 60 : 28 * mul), age: 0 });
      if (!ep.hint && ep.field) { ep.hint = true; toast('Вокруг Хоумлендера поле: чекушки в нём застревают и не бьют. Бей донат-магией!', 4500); }
    } else if (k === 1) {
      if (ep.scd > 0) { if (noAmmoT <= 0) { noAmmoT = 0.8; popup(P.x, PLAYER_H + 24, 'Щит заряжается ' + ep.scd.toFixed(0) + ' с', '#cfd8e6'); } return; }
      if (ep.mana < 25) { if (noAmmoT <= 0) { noAmmoT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Нет силы', '#ff9a9a'); } return; }
      ep.mana -= 25; ep.sh = 3.5; ep.scd = 6; sfx('pick'); ring(P.x, gY - 80, 70, '#9fe3ff');
    } else {
      if (ep.ncd > 0) return;
      if (ep.mana < 50) { if (noAmmoT <= 0) { noAmmoT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Нет силы', '#ff9a9a'); } return; }
      ep.mana -= 50; ep.ncd = 2.2; sfx('boom'); shk = Math.max(shk, 0.35);
      ring(P.x, gY - 60, 260, '#ffd23f'); ring(P.x, gY - 60, 140, '#fff3a0'); burst(P.x, gY - 60, 24, '#ffd23f', 420, 0.6);
      ep.beams.length = 0; ep.waves.length = 0;
      if (Math.abs(P.x - ep.hx) < 540) epHit(90 * mul);
    }
  }

function epHit(d) {
    var s = ep.st;
    if (s === 'call' || s === 'mell' || s === 'moggi' || s === 'fatwarn' || s === 'food' || s === 'kill' || s === 'end') return;
    ep.hfl = 0.25;
    var p = epHomPos(); burst(p.x, p.y, 8, '#ffd23f', 260, 0.5); sfx('pick');
    popup(ep.hx, bossH() + 20 + ep.hz, '-' + Math.round(d), '#ffd23f');
    if (ep.assist) { storyEmit({ ed: Math.min(200, Math.round(d)) }); return; }
    if (s === 'fight1') { ep.hp = Math.max(EP_FLOOR, ep.hp - d); if (ep.hp <= EP_FLOOR) { epGo('moggi'); ep.bolts.length = 0; ep.beams.length = 0; ep.waves.length = 0; } }
    else if (s === 'finish') { ep.hp = Math.max(60, ep.hp - d); if (ep.hp <= 60) epGo('fatwarn'); }
    else { ep.hp -= d; if (ep.hp <= 0) { ep.hp = 0; epGo('kill'); ep.bolts.length = 0; ep.beams.length = 0; ep.waves.length = 0; } }
  }

function epBurger(gold) {
    var x = WH_X - 560 + Math.random() * 1120;
    if (gold) x = Math.max(WH_X - 560, Math.min(WH_X + 560, P.x + (Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 160)));
    ep.burgs.push({ id: ++epBid, x: x, y: 520, vy: 0, life: gold ? 3.2 : 4.6, g: !!gold, v: gold ? 3 : 1 });
  }

function epHomAI(dt, fast) {
    var want = P.x + (ep.hx > P.x ? 1 : -1) * (ep.fat ? 250 : 340);
    want = Math.max(WH_X - 640, Math.min(WH_X + 760, want));
    ep.hx += Math.max(-1, Math.min(1, (want - ep.hx) / 40)) * (ep.fat ? 38 : 90) * dt;
    if (ep.fat) ep.hx = Math.max(P.x - 420, Math.min(P.x + 420, ep.hx)); // в жир-территории игрока он никуда не убежит
    ep.hz = 24 + Math.sin(ep.age * 2) * 12;
    ep.hf = P.x < ep.hx ? -1 : 1;
    ep.atk -= dt;
    if (ep.atk <= 0) {
      ep.atkN++;
      var base = ep.fail ? 1.8 : (ep.fat ? 3.6 : 2.7);
      if (ep.atkN % 3 === 0) { ep.waves.push({ x: ep.hx, v: (P.x < ep.hx ? -1 : 1) * (ep.fail ? 440 : 340), life: 2.8 }); sfx('boom'); }
      else {
        ep.beams.push({ x: P.x, t: 0, warn: ep.fail ? 0.8 : 1.0, d: 0.4, hit: false });
        epGuestXs().forEach(function (gx) { ep.beams.push({ x: gx, t: 0, warn: ep.fail ? 0.8 : 1.0, d: 0.4, hit: false, gst: 1 }); });
        if (ep.fail) { ep.beams.push({ x: P.x - 170, t: -0.25, warn: 0.8, d: 0.4, hit: false }); ep.beams.push({ x: P.x + 170, t: -0.25, warn: 0.8, d: 0.4, hit: false }); }
      }
      ep.atk = base;
    }
  }

function epGuestXs() {
    var out = [], i, o;
    if (!partyOn() || ep.assist) return out;
    for (i = 0; i < party.ids.length; i++) { o = net.others[party.ids[i]]; if (o && (o.l | 0) === 6 && typeof o.rx === 'number') out.push(Math.round(o.rx)); }
    return out;
  }

function epSnap() {
    var b = [], w = [], g = [], i, q, r = Math.round;
    for (i = 0; i < ep.beams.length && i < 12; i++) { q = ep.beams[i]; if (!q.id) q.id = ++epBid; b.push([q.id, r(q.x), +q.t.toFixed(2), q.warn, q.d]); }
    for (i = 0; i < ep.waves.length && i < 8; i++) { q = ep.waves[i]; w.push([r(q.x), r(q.v), +q.life.toFixed(2)]); }
    for (i = 0; i < ep.burgs.length && i < 30; i++) { q = ep.burgs[i]; g.push([q.id, r(q.x), r(q.y), q.g ? 1 : 0, q.v, +q.life.toFixed(1)]); }
    return { st: ep.st, hx: r(ep.hx), hz: r(ep.hz), hf: ep.hf, hp: r(ep.hp), hm: r(ep.hmax), hfat: +ep.hfat.toFixed(2), fl: ep.hfl > 0 ? 1 : 0, ab: ep.abil ? 1 : 0, fat: ep.fat ? 1 : 0, fail: ep.fail ? 1 : 0, fld: ep.field ? 1 : 0,
      pf: +ep.pf.toFixed(2), pm: ep.pm, stun: ep.stun > 0 ? 1 : 0, mx: r(ep.mx), mz: r(ep.mz), mr: +ep.mrot.toFixed(2), ms: ep.mshow ? 1 : 0, ma: +ep.mal.toFixed(2), mo: ep.mogOn ? 1 : 0, mgx: r(ep.mogx), mga: +ep.mogA.toFixed(2),
      zap: ep.zap > 0 ? 1 : 0, er: +ep.erase.toFixed(2), ft: r(ep.ft), pc: ep.pc, hc: ep.hc, b: b, w: w, g: g };
  }

function epApply(s) {
    if (!ep.on || !ep.assist || !s || typeof s !== 'object') return;
    var N = function (v, d) { v = +v; return isFinite(v) ? v : d; }, i, q, old = {}, ob = ep.beams, e;
    if (typeof s.st === 'string' && EP_ST.indexOf(s.st) >= 0 && s.st !== ep.st) { ep.st = s.st; ep.t = 0; if (s.st === 'final') ep.mana = mgCap(); if (s.st === 'food') { ep.burgs = []; ep.eaten = {}; } }
    ep.thx = N(s.hx, ep.thx); ep.thz = N(s.hz, ep.thz); ep.hf = N(s.hf, ep.hf) < 0 ? -1 : 1;
    ep.hp = N(s.hp, ep.hp); ep.hmax = Math.max(1, N(s.hm, ep.hmax)); ep.hfat = N(s.hfat, ep.hfat); if (s.fl) ep.hfl = 0.2;
    if (s.ab && !ep.abil) { ep.abil = true; ep.mana = mgCap(); toast('Появилась донат-магия! ' + epK().join(' · ') + '. Помоги убить Хоумлендера!', 6000); }
    ep.fat = !!s.fat; ep.fail = !!s.fail; ep.field = !!s.fld; ep.pf = Math.max(0.5, Math.min(2.2, N(s.pf, 1))); ep.pm = Math.max(0.3, Math.min(1.5, N(s.pm, 1))); ep.stun = s.stun ? 9 : 0;
    ep.mx = N(s.mx, ep.mx); ep.mz = N(s.mz, ep.mz); ep.mrot = N(s.mr, 0); ep.mshow = !!s.ms; ep.mal = N(s.ma, 1); ep.mogOn = !!s.mo; ep.mogx = N(s.mgx, ep.mogx); ep.mogA = N(s.mga, 1); if (s.zap && ep.zap <= 0) ep.zap = 0.5;
    ep.erase = N(s.er, 0); ep.ft = N(s.ft, 0); ep.pc = N(s.pc, 0); ep.hc = N(s.hc, 0);
    for (i = 0; i < ob.length; i++) old[ob[i].id] = ob[i];
    ep.beams = [];
    if (Array.isArray(s.b)) for (i = 0; i < s.b.length && i < 12; i++) { q = s.b[i]; if (!Array.isArray(q)) continue; e = old[q[0]]; ep.beams.push({ id: q[0], x: N(q[1], 0), t: N(q[2], 0), warn: N(q[3], 1), d: N(q[4], 0.4), hit: e ? e.hit : false, fx: e ? e.fx : 0 }); }
    ep.waves = [];
    if (Array.isArray(s.w)) for (i = 0; i < s.w.length && i < 8; i++) { q = s.w[i]; if (Array.isArray(q)) ep.waves.push({ x: N(q[0], 0), v: N(q[1], 0), life: N(q[2], 1) }); }
    if (ep.st === 'food' && Array.isArray(s.g)) {
      var lb = {}, nb = []; for (i = 0; i < ep.burgs.length; i++) lb[ep.burgs[i].id] = ep.burgs[i];
      for (i = 0; i < s.g.length && i < 30; i++) { q = s.g[i]; if (!Array.isArray(q) || ep.eaten[q[0]]) continue; e = lb[q[0]]; if (e) { e.life = N(q[5], e.life); nb.push(e); } else nb.push({ id: q[0], x: N(q[1], 0), y: N(q[2], 0), vy: 0, g: !!q[3], v: N(q[4], 1), life: N(q[5], 3) }); }
      ep.burgs = nb;
    }
  }

function epGuestTick(dt) {
    var i, b, k = Math.min(1, dt * 12);
    ep.hx += (ep.thx - ep.hx) * k; ep.hz += (ep.thz - ep.hz) * k;
    if (ep.st === 'food') for (i = ep.burgs.length - 1; i >= 0; i--) {
      b = ep.burgs[i];
      if (b.y < 130 && Math.abs(b.x - P.x) < 58 && P.z < 120) { ep.eaten[b.id] = 1; storyEmit({ eat: [b.id] }); sfx('gulp'); popup(b.x, 90, '+' + b.v, b.g ? '#ffd23f' : '#ffffff'); burst(b.x, gY - 30, 6, '#ff9a3c', 160, 0.4); ep.burgs.splice(i, 1); }
    }
  }

function epWin() {
    var first = !save.mx.sn, c = ep.fail ? (first ? 6000 : 2500) : (first ? 12000 : 5000);
    save.coins += c; save.mx.sn = Math.min(9999, (save.mx.sn || 0) + 1);
    // Хоумлендер стёрт навсегда: особые аирдропы больше не нужны, магия остаётся
    save.mx.er = 1; save.mx.mg = 1; save.mx.mh = 1; save.mx.ra = 0; save.mx.rq = 0; save.mx.rp = 0; save.mx.rl = [0, 0, 0];
    var swap = (save.special | 0) * 1000;
    if (swap > 0) { save.coins += swap; save.special = 0; }
    hero.on = false; heroT = 120;
    persist(); hud(); sfx('rare');
    ach('hmdown'); ach('erase'); ach('magic'); if (!ep.fail) { ach('fatwin'); }
    popup(P.x, PLAYER_H + 40, '+' + fmtN(c) + ' ' + coinWord(c), '#ffd23f');
    toast((ep.fail ? 'Победа, хоть и со скрипом. ' : 'Идеальная победа! ') + 'Награда: ' + fmtN(c) + ' ' + coinWord(c) + '.' + (swap > 0 ? ' Особые аирдропы теперь не нужны: обменял их на ' + fmtN(swap) + ' ' + coinWord(swap) + '.' : '') + ' Донат-магия осталась с тобой: клавиша G.', 9000);
    setTimeout(function () { toast('В Городе Белого Дома слева открылась Больница: загляни к Меллстрою.', 7000); }, 9500);
  }

function updateEp(dt) {
    if (!ep.on) return;
    ep.age += dt; ep.t += dt;
    if (ep.lineT > 0) ep.lineT -= dt;
    if (ep.ifr > 0) ep.ifr -= dt;
    if (ep.mcd > 0) ep.mcd -= dt;
    if (ep.scd > 0) ep.scd -= dt;
    if (ep.ncd > 0) ep.ncd -= dt;
    if (ep.sh > 0) ep.sh -= dt;
    if (ep.hfl > 0) ep.hfl -= dt;
    if (ep.zap > 0) ep.zap -= dt;
    if (ep.mogF > 0) ep.mogF -= dt;
    if (ep.mogT > 0) ep.mogT -= dt;
    if (ep.ttlT > 0) ep.ttlT -= dt;
    if (ep.flash > 0) ep.flash -= dt;
    if (!ep.assist && partyOn() && partyHost()) { ep.snT -= dt; if (ep.snT <= 0) { ep.snT = 0.12; storyEmit({ es: epSnap() }); } }
    if (ep.abil) ep.mana = Math.min(mgCap(), ep.mana + dt * (ep.fat ? 15 : (ep.fail ? 6 : 9)));
    // игрок остаётся у Белого дома
    if (P.x < WH_X - 780) { P.x = WH_X - 780; P.vx = 0; }
    if (P.x > WH_X + 900) { P.x = WH_X + 900; P.vx = 0; }
    if (ep.age > 480 && ep.st !== 'end') { epEnd('timeout'); return; }
    var s = ep.st, i, p;
    var cut = s === 'call' || s === 'mell' || s === 'moggi' || s === 'fatwarn' || s === 'kill';
    ep.bar += ((cut ? 1 : 0) - ep.bar) * Math.min(1, dt * 6);
    if (cut) { input.left = input.right = false; input.up = false; P.vx = 0; }
    if (!ep.assist) {
    if (s === 'call') {
      ep.hz = Math.max(0, 760 * (1 - ep.t / 2.2)); ep.hf = P.x < ep.hx ? -1 : 1;
      if (ep.t >= 2.2) { shk = 0.7; burst(ep.hx, gY, 18, '#bfa77a', 320, 0.7); sfx('boom'); epGo('mell'); }
    } else if (s === 'mell') {
      ep.hf = P.x < ep.hx ? -1 : 1; ep.hz = Math.max(0, ep.hz - dt * 60);
      if (ep.t >= 0.8 && !ep.did.m1) { ep.did.m1 = 1; ep.mshow = true; ep.mx = ep.hx; ep.mz = 110; burst(ep.hx, gY - 140, 18, '#ffd23f', 300, 0.7); sfx('rare'); epSay('Из Хоумлендера вышел Меллстрой!', 2.6); epTitle('МЕЛЛСТРОЙ', 'вышел из Хоумлендера', 2.4); }
      if (ep.t >= 0.8 && ep.t < 2.4) { var tx = WH_X + 120; ep.mx += (tx - ep.mx) * Math.min(1, dt * 2.6); ep.mz = Math.max(0, ep.mz - dt * 45); }
      if (ep.t >= 2.4 && !ep.did.m2) { ep.did.m2 = 1; ep.zap = 0.9; sfx('boom'); epSay('Хоумлендер сжёг Меллстроя лазерами!', 2.6); epTitle('', '', 0); }
      if (ep.t >= 3.0 && !ep.did.m3) { ep.did.m3 = 1; ep.mrot = -1.57; ep.mz = 0; burst(ep.mx, gY - 20, 14, '#ff6b6b', 300, 0.6); shk = 0.5; }
      if (ep.t >= 4.0 && !ep.did.m4) {
        ep.did.m4 = 1; sfx('rare');
        for (i = 0; i < 16; i++) ep.gold.push({ x: ep.mx + (Math.random() - 0.5) * 40, y: gY - 30 - Math.random() * 30, t: -Math.random() * 0.6 });
        epSay('Меллстрой передал силу доната!', 3); epTitle('СИЛА ДОНАТА', 'Меллстрой передал её тебе', 3);
      }
      for (i = ep.gold.length - 1; i >= 0; i--) {
        var gd = ep.gold[i]; gd.t += dt; if (gd.t < 0) continue;
        gd.x += (P.x - gd.x) * Math.min(1, dt * 4); gd.y += ((gY - 80) - gd.y) * Math.min(1, dt * 4);
        if (gd.t > 1.1) { ep.gold.splice(i, 1); }
      }
      if (ep.t >= 5.4) {
        ep.abil = true; ep.mana = mgCap(); ep.atk = 2.0; ep.hp = ep.hmax; sfx('rare');
        var k = epK(); toast('Появилась донат-магия! ' + k.join(' · ') + '. Убей Хоумлендера!', 6500);
        epGo('fight1');
      }
    } else if (s === 'fight1' || s === 'final') {
      epHomAI(dt);
    } else if (s === 'moggi') {
      ep.hf = P.x < ep.hx ? -1 : 1;
      ep.hz = 40 + Math.sin(ep.t * 3) * 10;
      if (ep.t < 0.05 && !ep.did.g0) { ep.did.g0 = 1; epSay('Магии не хватает!', 2.4); sfx('no'); }
      if (ep.t >= 2.2 && !ep.did.g1) { ep.did.g1 = 1; ep.mogOn = true; ep.mogx = WH_X - 820; ep.mogA = 1; sfx('rare'); epSay('Это Чикен Моггити!', 2.2); epTitle('ЧИКЕН МОГГИТИ', 'пришёл на помощь', 2.4); }
      if (ep.mogOn && ep.t >= 2.2 && ep.t < 4.4) { var gx = ep.hx - 250; ep.mogx += Math.max(-1, Math.min(1, (gx - ep.mogx) / 50)) * 560 * dt; }
      if (ep.t >= 4.4 && !ep.did.g2) {
        ep.did.g2 = 1; ep.mogF = 0.6; ep.stun = 99; ep.field = false; ep.hz = 0; shk = 0.8; sfx('boom');
        p = epHomPos(); ring(p.x, p.y, 200, '#ffd23f'); ring(p.x, p.y, 120, '#ffffff'); burst(p.x, p.y, 30, '#ffd23f', 460, 0.8);
        epSay('Хоумлендер оглушён!', 2.6); ep.mogT = 3.4;
      }
      if (ep.t >= 4.4) ep.hz = Math.max(0, ep.hz - dt * 200);
      if (ep.t >= 5.4 && ep.t < 6.4 && ep.mogOn) { ep.mogx += Math.max(-1, Math.min(1, (ep.mx + 60 - ep.mogx) / 40)) * 330 * dt; }
      if (ep.t >= 6.4 && !ep.did.g3) { ep.did.g3 = 1; ep.mrot = 0; ep.mz = 0; burst(ep.mx, gY - 60, 20, '#7dff3a', 280, 0.7); sfx('rare'); epSay('Моггити спас Меллстроя!', 2.4); }
      if (ep.t >= 7.4) {
        var dxm = WH_X - ep.mx; ep.mx += Math.max(-1, Math.min(1, dxm / 30)) * 150 * dt; ep.mogx += Math.max(-1, Math.min(1, (WH_X + 70 - ep.mogx) / 30)) * 170 * dt;
        ep.mal = Math.max(0, 1 - (ep.t - 7.4) / 1.3); ep.mogA = ep.mal;
      }
      if (ep.t >= 8.8) { ep.mshow = false; ep.mogOn = false; ep.stun = 9; epSay('Добей его!', 2.4); epGo('finish'); }
    } else if (s === 'finish') {
      ep.hf = P.x < ep.hx ? -1 : 1; ep.hz = Math.max(0, ep.hz - dt * 100);
      ep.stun -= dt;
      if (ep.stun <= 0 && ep.st === 'finish') epGo('fatwarn');
    } else if (s === 'fatwarn') {
      ep.stun = 0; ep.hz = 40 + Math.sin(ep.t * 6) * 8;
      if (ep.t < 0.05 && !ep.did.f0) { ep.did.f0 = 1; epSay('РАСШИРЕНИЕ ЖИРА!', 2.6); epTitle('ЖИР КЛЭШ', 'DOMAIN CLASH: вы расширяете жир одновременно', 3.4); sfx('boom'); shk = 0.9; }
      ep.hfat = 1 + Math.min(0.6, ep.t * 0.3); ep.pf = 1 + Math.min(0.35, ep.t * 0.17);
      if (ep.t >= 1.4 && !ep.did.f1) { ep.did.f1 = 1; epSay('Две жир-территории столкнулись! Кто съест больше бургеров?', 3); }
      if (ep.t >= 3.2) { ep.pm = 0.85; ep.ft = EP_FOOD; ep.pc = 0; ep.hc = 0; ep.chew = 0; ep.burgs.length = 0; ep.field = false; epGo('food'); ep.did.go = 0; }
    } else if (s === 'food') {
      ep.hz = 0; ep.hf = ep.hx < P.x ? 1 : -1;
      var cd0 = 3.0;
      if (ep.t < cd0) { var n = Math.ceil(cd0 - ep.t); if (ep.did.cnt !== n) { ep.did.cnt = n; epSay(String(n), 0.9); sfx('pick'); } }
      else {
        if (!ep.did.go) { ep.did.go = 1; epSay('ЖРИ БУРГЕРЫ!', 1.4); sfx('rare'); ep.sp = 0; ep.gp = 4; }
        ep.ft -= dt; ep.sp -= dt; ep.gp -= dt;
        if (ep.sp <= 0) { ep.sp = 0.5; epBurger(false); }
        if (ep.gp <= 0) { ep.gp = 5; epBurger(true); }
        // Хоумлендер ест сам
        ep.chew -= dt; ep.ptT -= dt;
        if (ep.ptT <= 0 || !ep.tgt || ep.burgs.indexOf(ep.tgt) < 0) {
          ep.ptT = 0.55; var best = null, bd = 1e9;
          for (i = 0; i < ep.burgs.length; i++) { var bb = ep.burgs[i]; if (bb.y > 160) continue; var dd = Math.abs(bb.x - ep.hx); if (dd < bd) { bd = dd; best = bb; } }
          ep.tgt = best;
        }
        if (ep.tgt && ep.chew <= 0) {
          var ddx = ep.tgt.x - ep.hx; ep.hx += Math.max(-1, Math.min(1, ddx / 20)) * 205 * dt;
          if (Math.abs(ep.tgt.x - ep.hx) < 50) {
            ep.hc += ep.tgt.v; ep.chew = 0.5; burst(ep.tgt.x, gY - 30, 6, '#ff9a3c', 160, 0.4); ring(ep.tgt.x, gY - 30, 30, '#ff9a3c');
            ep.burgs.splice(ep.burgs.indexOf(ep.tgt), 1); ep.tgt = null; ep.hfat = Math.min(1.9, 1.6 + ep.hc * 0.012); sfx('gulp');
          }
        }
        // игрок ест
        for (i = ep.burgs.length - 1; i >= 0; i--) {
          var b = ep.burgs[i];
          if (b.y < 130 && Math.abs(b.x - P.x) < 58 && P.z < 120) {
            ep.pc += b.v; ep.pf = Math.min(1.9, ep.pf + 0.012 * b.v); sfx('gulp');
            popup(b.x, 90, '+' + b.v, b.g ? '#ffd23f' : '#ffffff'); burst(b.x, gY - 30, 6, '#ff9a3c', 160, 0.4);
            if (ep.tgt === b) ep.tgt = null; ep.burgs.splice(i, 1);
          }
        }
        if (ep.ft <= 0) {
          var win = ep.pc >= ep.hc; ep.burgs.length = 0;
          ep.fat = win; ep.fail = !win; ep.field = !win;
          ep.pf = win ? 1.25 : 1; ep.pm = win ? 1.12 : 1; ep.hfat = win ? 1.35 : 1;
          ep.hp = win ? 300 : 400; ep.mana = mgCap(); ep.atk = 2.5; ep.hz = 24;
          if (win) { epSay('Жир-территория твоя! Хоумлендер заперт в ней.', 4); epTitle('ТЫ ВЫИГРАЛ ЖИР КЛЭШ', 'он медленнее, ты сильнее', 3); sfx('rare'); ring(P.x, gY - 80, 200, '#ffd23f'); toast('Ты победил в жир-клэше: Хоумлендер заперт в твоей жир-территории и стал медленнее, а донат-магия мощнее в 2,5 раза. Добей его!', 6500); }
          else { epSay('Хоумлендер съел больше! Поле вернулось.', 4); epTitle('ЖИР КЛЭШ ПРОИГРАН', 'поле вернулось', 2.6); sfx('no'); toast('Ты проиграл битву за еду: Хоумлендер снова в поле и бьёт злее. Но магией его ещё можно добить.', 6000); }
          epGo('final');
        }
      }
    } else if (s === 'kill') {
      var kh = bossH(), kw = bossW();
      ep.hz = 40 + Math.sin(ep.t * 2) * 6; ep.hfl = 0;
      if (ep.t < 0.05 && !ep.did.k0) { ep.did.k0 = 1; epSay('ХОУМЛЕНДЕР ПОВЕРЖЕН!', 2.4); sfx('boom'); shk = 1; }
      ep.erase = ep.t < 1.8 ? 0 : Math.min(1, (ep.t - 1.8) / 3.6);
      if (ep.t >= 1.8 && !ep.did.k1) { ep.did.k1 = 1; epSay('Его стирает из этого мира…', 3); sfx('rare'); }
      if (ep.t >= 1.8 && ep.erase < 1) {
        p = epHomPos();
        if (Math.random() < dt * 45) burst(ep.hx + (Math.random() - 0.5) * kw * 0.8, p.y - kh * 0.5 + ep.erase * kh, 3, Math.random() < 0.5 ? '#ffffff' : '#ffd23f', 150, 0.9);
      }
      if (ep.erase >= 1 && !ep.did.k2) { ep.did.k2 = 1; ep.flash = 1.2; sfx('boom'); shk = 1; epTitle('ХОУМЛЕНДЕР СТЁРТ', 'навсегда', 4); }
      if (ep.t >= 9.2) { if (partyOn() && partyHost()) { storyEmit({ ew: ep.fail ? 1 : 0 }); setTimeout(function () { partySet(null); }, 700); } epWin(); ep.st = 'end'; ep.t = 0; ep.on = false; ep.pm = 1; ep.pf = 1; ep.bar = 0; }
    }
    }
    if (ep.assist) epGuestTick(dt);
    // снаряды
    p = epHomPos();
    for (i = ep.bolts.length - 1; i >= 0; i--) {
      var bo = ep.bolts[i]; bo.age += dt;
      var dx = p.x - bo.x, dy = p.y - bo.y, dd2 = Math.sqrt(dx * dx + dy * dy) || 1, stp = 760 * dt;
      if (dd2 < 70 || stp >= dd2) { epHit(bo.d); ring(bo.x, bo.y, 40, '#ffd23f'); ep.bolts.splice(i, 1); continue; }
      bo.x += dx / dd2 * stp; bo.y += dy / dd2 * stp;
      if (bo.age > 2.5) ep.bolts.splice(i, 1);
    }
    // лучи из глаз
    for (i = ep.beams.length - 1; i >= 0; i--) {
      var bm = ep.beams[i]; bm.t += dt;
      if (bm.t > bm.warn && bm.t < bm.warn + bm.d && !bm.hit && !(bm.gst && !ep.assist) && Math.abs(P.x - bm.x) < 48) { bm.hit = true; epHurt(ep.fail ? 20 : 15); }
      if (bm.t >= bm.warn && !bm.fx) { bm.fx = 1; sfx('boom'); shk = Math.max(shk, 0.25); }
      if (bm.t > bm.warn + bm.d) ep.beams.splice(i, 1);
    }
    // ударные волны по земле (через них нужно прыгать)
    for (i = ep.waves.length - 1; i >= 0; i--) {
      var wv = ep.waves[i]; wv.x += wv.v * dt; wv.life -= dt;
      if (Math.abs(P.x - wv.x) < 34 && P.z < 55) { epHurt(ep.fail ? 18 : 12); P.kb = (P.x < wv.x ? -1 : 1) * 260; }
      if (wv.life <= 0 || wv.x < WH_X - 900 || wv.x > WH_X + 1000) ep.waves.splice(i, 1);
    }
    // бургеры падают и лежат
    for (i = ep.burgs.length - 1; i >= 0; i--) {
      var bg = ep.burgs[i];
      if (bg.y > 0) { bg.vy += 1600 * dt; bg.y = Math.max(0, bg.y - bg.vy * dt); if (bg.y <= 0) bg.vy = 0; }
      else { bg.life -= dt; if (bg.life <= 0) { burst(bg.x, gY - 20, 4, '#c98b4a', 120, 0.3); ep.burgs.splice(i, 1); } }
    }
  }

function epBurgerSpr(x, y, s, gold) {
    ctx.save(); ctx.translate(x, y);
    if (gold) { var g = ctx.createRadialGradient(0, 0, 4, 0, 0, s * 1.4); g.addColorStop(0, 'rgba(255,230,90,.8)'); g.addColorStop(1, 'rgba(255,230,90,0)'); ctx.fillStyle = g; ctx.fillRect(-s * 1.4, -s * 1.4, s * 2.8, s * 2.8); }
    ctx.fillStyle = gold ? '#ffd23f' : '#d98c3f'; ctx.beginPath(); ctx.ellipse(0, -s * 0.42, s * 0.55, s * 0.34, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#4fa83a'; ctx.fillRect(-s * 0.55, -s * 0.12, s * 1.1, s * 0.12);
    ctx.fillStyle = '#6b3a1d'; rrect(-s * 0.55, 0, s * 1.1, s * 0.2, 3); ctx.fill();
    ctx.fillStyle = gold ? '#ffe680' : '#d98c3f'; ctx.beginPath(); ctx.ellipse(0, s * 0.28, s * 0.52, s * 0.18, 0, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#fff3'; ctx.fillRect(-s * 0.25, -s * 0.5, 3, 3); ctx.fillRect(s * 0.1, -s * 0.46, 3, 3);
    ctx.restore();
  }

function epDrawMell() {
    if (!ep.mshow || !ready(img.mell)) return;
    var fw = 224, fh = 99, sc = 0.85, w = fw * sc, h = fh * sc;
    ctx.save(); ctx.globalAlpha = ep.mal; ctx.translate(ep.mx, gY - ep.mz - 6);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(0, 9, w * 0.4, 7, 0, 0, 6.3); ctx.fill();
    ctx.rotate(ep.mrot); ctx.translate(0, -h * 0.5);
    if (ep.mrot === 0 && ep.did.g3) { var gg = ctx.createRadialGradient(0, 0, 10, 0, 0, 90); gg.addColorStop(0, 'rgba(125,255,58,.45)'); gg.addColorStop(1, 'rgba(125,255,58,0)'); ctx.fillStyle = gg; ctx.fillRect(-90, -90, 180, 180); }
    ctx.drawImage(img.mell, 0, 0, fw, fh, -w / 2, -h / 2, w, h);
    ctx.restore();
  }

function epDrawMog() {
    if (!ep.mogOn || !ready(img.mogg)) return;
    var h = 190, w = h * img.mogg.naturalWidth / img.mogg.naturalHeight, face = (ep.st === 'moggi' && ep.t >= 5.4 && ep.t < 7.4) ? -1 : (ep.hx > ep.mogx ? 1 : -1);
    ctx.save(); ctx.globalAlpha = ep.mogA; ctx.translate(ep.mogx, gY + 4);
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(0, 0, w * 0.4, 8, 0, 0, 6.3); ctx.fill();
    var gg = ctx.createRadialGradient(0, -h * 0.5, 10, 0, -h * 0.5, h * 0.8); gg.addColorStop(0, 'rgba(255,215,60,' + (0.28 + 0.12 * Math.sin(t * 8)) + ')'); gg.addColorStop(1, 'rgba(255,215,60,0)');
    ctx.fillStyle = gg; ctx.fillRect(-h, -h * 1.3, h * 2, h * 1.6);
    ctx.scale(face > 0 ? -1 : 1, 1); ctx.translate(0, Math.sin(t * 10) * 1.5);
    ctx.drawImage(img.mogg, -w / 2, -h, w, h);
    ctx.restore();
    if (ep.mogF > 0) { var p = epHomPos(); ctx.strokeStyle = 'rgba(255,230,90,' + Math.min(1, ep.mogF * 1.8) + ')'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(ep.mogx + face * 40, gY - 120); ctx.lineTo(p.x, p.y); ctx.moveTo(ep.mogx + face * 55, gY - 105); ctx.lineTo(p.x, p.y + 20); ctx.stroke(); }
  }

function drawEp() {
    if (!ep.on) return;
    var i, p = epHomPos(), h = bossH(), w = bossW();
    // лучи и волны
    for (i = 0; i < ep.beams.length; i++) {
      var bm = ep.beams[i]; if (bm.t < 0) continue;
      if (bm.t < bm.warn) { ctx.strokeStyle = 'rgba(255,60,60,' + (0.25 + 0.5 * bm.t / bm.warn) + ')'; ctx.lineWidth = 3 + 8 * bm.t / bm.warn; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(bm.x, gY - 900); ctx.lineTo(bm.x, gY); ctx.stroke(); ctx.setLineDash([]); }
      else { ctx.fillStyle = 'rgba(255,60,60,.28)'; ctx.fillRect(bm.x - 46, gY - 900, 92, 900); ctx.fillStyle = '#ff3b3b'; ctx.fillRect(bm.x - 22, gY - 900, 44, 900); ctx.fillStyle = '#fff'; ctx.fillRect(bm.x - 7, gY - 900, 14, 900); }
    }
    for (i = 0; i < ep.waves.length; i++) { var wv = ep.waves[i]; ctx.fillStyle = 'rgba(255,170,60,.85)'; ctx.beginPath(); ctx.moveTo(wv.x - 26, gY); ctx.lineTo(wv.x, gY - 48); ctx.lineTo(wv.x + 26, gY); ctx.fill(); ctx.fillStyle = 'rgba(255,230,160,.8)'; ctx.fillRect(wv.x - 44, gY - 4, 88, 4); }
    // бургеры
    for (i = 0; i < ep.burgs.length; i++) { var bg = ep.burgs[i]; var bl = bg.y <= 0 && bg.life < 1.2 && Math.floor(t * 10) % 2; if (!bl) epBurgerSpr(bg.x, gY - bg.y - 12, bg.g ? 36 : 30, bg.g); }
    epDrawMell();
    // Хоумлендер
    if (ready(img.boss)) {
      var stunned = ep.st === 'finish' || (ep.st === 'moggi' && ep.t >= 4.4) || false;
      var kill = ep.st === 'kill';
      var sx = ep.hfat * (ep.st === 'food' ? 1 : 1);
      ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(ep.hx, gY + 3, w * 0.45 * sx, 8, 0, 0, 6.3); ctx.fill();
      ctx.save(); ctx.translate(ep.hx, p.y);
      if (kill) { /* стирание рисуется полосами ниже */ }
      else if (stunned) ctx.rotate(Math.sin(t * 7) * 0.1);
      else ctx.rotate(Math.sin(t * 1.3) * 0.035);
      ctx.scale(ep.hf > 0 ? -sx : sx, ep.hfat > 1 ? 1 + (ep.hfat - 1) * 0.15 : 1);
      if (stunned) { try { ctx.filter = 'grayscale(1) brightness(.85)'; } catch (e) {} }
      if (kill) {
        var NB = 30, iw = img.boss.naturalWidth, ih = img.boss.naturalHeight, gl = ep.t < 1.8 ? ep.t * 4 : 7;
        for (var bj = 0; bj < NB; bj++) {
          var al = Math.max(0, Math.min(1, 1 - (ep.erase * 1.4 - bj / NB) / 0.35));
          if (al <= 0.01) continue;
          var gdx = Math.sin(t * 38 + bj * 2.7) * gl * (0.4 + 0.6 * (bj % 3 === 0));
          ctx.globalAlpha = al;
          ctx.drawImage(img.boss, 0, bj * ih / NB, iw, ih / NB + 1, -w / 2 + gdx, -h / 2 + bj * h / NB, w, h / NB + 1);
        }
        ctx.globalAlpha = 1;
      } else ctx.drawImage(img.boss, -w / 2, -h / 2, w, h);
      try { ctx.filter = 'none'; } catch (e) {}
      if (ep.hfl > 0) { ctx.globalAlpha = Math.min(1, ep.hfl * 3) * 0.5; ctx.fillStyle = '#fff'; ctx.fillRect(-w / 2, -h / 2, w, h); }
      ctx.restore();
      if (stunned && ep.st !== 'kill') for (i = 0; i < 3; i++) { var a = t * 5 + i * 2.09; drawStarShape(ep.hx + Math.cos(a) * w * 0.3, p.y - h * 0.52 + Math.sin(a) * 8, 9, a, '#ffe066', '#b8860b'); }
      if (ep.zap > 0) { ctx.strokeStyle = 'rgba(255,50,50,' + Math.min(1, ep.zap * 2) + ')'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(ep.hx + ep.hf * w * 0.1, p.y - h * 0.18); ctx.lineTo(ep.mx, gY - 30); ctx.stroke(); }
      // поле против чекушек
      if (ep.field && ep.st !== 'call' && ep.st !== 'mell' && ep.abil) {
        var fr = EP_R * (1 + 0.03 * Math.sin(t * 5)) * Math.max(1, ep.hfat * 0.9);
        var fg = ctx.createRadialGradient(ep.hx, p.y, fr * 0.6, ep.hx, p.y, fr); fg.addColorStop(0, 'rgba(255,60,60,0)'); fg.addColorStop(1, 'rgba(255,60,60,.22)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(ep.hx, p.y, fr, 0, 6.3); ctx.fill();
        ctx.strokeStyle = 'rgba(255,110,110,.8)'; ctx.lineWidth = 3; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.arc(ep.hx, p.y, fr, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
      }
    }
    epDrawMog();
    // красный MOGGED над глазами Хоумлендера
    if (ep.mogT > 0) {
      var ex = ep.hx + (0.41 - 0.5) * w * (ep.hf > 0 ? -1 : 1), ey = p.y + (0.168 - 0.5) * h - 44;
      var pop = 1 + Math.max(0, ep.mogT - 3.0) * 2.2, a0 = Math.min(1, ep.mogT * 1.6);
      ctx.save(); ctx.globalAlpha = a0; ctx.translate(ex + Math.sin(t * 50) * 2, ey + Math.cos(t * 43) * 2); ctx.scale(pop, pop); ctx.rotate(Math.sin(t * 9) * 0.04);
      ctx.font = '48px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = 10; ctx.strokeStyle = '#2a0000'; ctx.strokeText('MOGGED', 0, 0);
      ctx.fillStyle = '#ff1717'; ctx.fillText('MOGGED', 0, 0);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillText('MOGGED', -1, -2);
      ctx.restore();
    }
    // жир клэш: две территории сталкиваются, линия фронта сдвигается от съеденных бургеров
    if (ep.st === 'fatwarn' || ep.st === 'food') {
      var kd = ep.st === 'fatwarn' ? Math.min(1, ep.t / 3) : 1, rr = 250 * kd;
      var g1 = ctx.createRadialGradient(ep.hx, gY - 40, rr * 0.3, ep.hx, gY - 40, rr); g1.addColorStop(0, 'rgba(230,60,50,.30)'); g1.addColorStop(1, 'rgba(230,60,50,0)');
      var g2 = ctx.createRadialGradient(P.x, gY - 40, rr * 0.3, P.x, gY - 40, rr); g2.addColorStop(0, 'rgba(255,210,63,.32)'); g2.addColorStop(1, 'rgba(255,210,63,0)');
      ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(ep.hx, gY - 40, rr, 0, 6.3); ctx.fill();
      ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(P.x, gY - 40, rr, 0, 6.3); ctx.fill();
      var tot = ep.pc + ep.hc, shr = tot > 0 ? ep.pc / tot : 0.5, lx = P.x + (ep.hx - P.x) * (ep.st === 'food' ? shr : 0.5);
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.4 * Math.sin(t * 20)) + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lx, gY); ctx.lineTo(lx + Math.sin(t * 17) * 6, gY - 300); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,200,60,.55)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(lx, gY); ctx.lineTo(lx, gY - 300); ctx.stroke();
    }
    if (ep.fat && ep.st === 'final') { // жир-территория игрока, внутри которой заперт Хоумлендер
      ctx.strokeStyle = 'rgba(255,210,63,.75)'; ctx.lineWidth = 4; ctx.setLineDash([16, 12]); ctx.lineDashOffset = -t * 30;
      ctx.beginPath(); ctx.ellipse(P.x, gY - 20, 460, 150, 0, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,210,63,.08)'; ctx.beginPath(); ctx.ellipse(P.x, gY - 20, 460, 150, 0, 0, 6.3); ctx.fill();
    }
    // снаряды донат-магии
    for (i = 0; i < ep.bolts.length; i++) {
      var bo = ep.bolts[i], gr = ctx.createRadialGradient(bo.x, bo.y, 2, bo.x, bo.y, 26);
      gr.addColorStop(0, 'rgba(255,245,160,1)'); gr.addColorStop(0.4, 'rgba(255,200,40,.8)'); gr.addColorStop(1, 'rgba(255,200,40,0)');
      ctx.fillStyle = gr; ctx.fillRect(bo.x - 26, bo.y - 26, 52, 52);
      ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(bo.x, bo.y, 9, 0, 6.3); ctx.fill(); ctx.fillStyle = '#b8860b'; ctx.font = '700 11px "Rubik", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', bo.x, bo.y + 1);
    }
    for (i = 0; i < ep.gold.length; i++) { var gd = ep.gold[i]; if (gd.t < 0) continue; ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(gd.x, gd.y, 7, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 2; ctx.stroke(); }
    // щит и аура
    if (ep.sh > 0) { ctx.strokeStyle = 'rgba(159,227,255,' + (0.5 + 0.3 * Math.sin(t * 12)) + ')'; ctx.fillStyle = 'rgba(159,227,255,.15)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(P.x, gY - P.z - 75, 62, 92, 0, 0, 6.3); ctx.fill(); ctx.stroke(); }
    else if (ep.fat) { ctx.fillStyle = 'rgba(255,210,63,' + (0.1 + 0.05 * Math.sin(t * 6)) + ')'; ctx.beginPath(); ctx.ellipse(P.x, gY - P.z - 75, 70, 100, 0, 0, 6.3); ctx.fill(); }
  }

function drawEpHud() {
    if (!ep.on) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var bw = Math.min(360, W - 24), bx = (W - bw) / 2, by = 76, barH = 14, k;
    if (ep.st !== 'call') {
      ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(bx - 3, by - 3, bw + 6, barH + 6, 6); ctx.fill();
      k = Math.max(0, Math.min(1, ep.hp / ep.hmax));
      ctx.fillStyle = ep.st === 'food' ? '#8a8f9a' : '#e0463c'; ctx.fillRect(bx, by, bw * k, barH);
      ctx.fillStyle = '#fff'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Хоумлендер' + (ep.field && ep.abil ? ' · поле' : ''), W / 2, by + barH / 2 + 1);
    }
    if (ep.abil) {
      var my = by + 24;
      ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(bx - 3, my - 3, bw + 6, 12 + 6, 6); ctx.fill();
      ctx.fillStyle = '#ffd23f'; ctx.fillRect(bx, my, bw * ep.mana / mgCap(), 12);
      ctx.fillStyle = '#14233f'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.fillText('Донат-сила ' + Math.floor(ep.mana) + (ep.fat ? ' · жирная магия ×2,5' : ''), W / 2, my + 7);
    }
    if (ep.st === 'food' && ep.t >= 3) {
      ctx.fillStyle = 'rgba(20,35,63,.85)'; rrect(W / 2 - 160, by + 44, 320, 52, 10); ctx.fill();
      var tt = ep.pc + ep.hc, sh2 = tt > 0 ? ep.pc / tt : 0.5;
      ctx.fillStyle = '#e0463c'; ctx.fillRect(W / 2 - 150, by + 74, 300, 12); ctx.fillStyle = '#ffd23f'; ctx.fillRect(W / 2 - 150, by + 74, 300 * sh2, 12);
      ctx.fillStyle = '#fff'; ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Ты ' + ep.pc + '  :  ' + ep.hc + ' Хоумлендер  ·  ' + Math.max(0, Math.ceil(ep.ft)) + ' с', W / 2, by + 59);
    }
    if (ep.lineT > 0 && ep.line) {
      var a = Math.min(1, ep.lineT / 0.4, (ep.lineMax - ep.lineT) / 0.12 + 0.2);
      ctx.globalAlpha = Math.max(0, a); ctx.font = '26px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = 7; ctx.strokeStyle = '#14233f'; ctx.strokeText(ep.line, W / 2, H * 0.36); ctx.fillStyle = '#ffd23f'; ctx.fillText(ep.line, W / 2, H * 0.36);
      ctx.globalAlpha = 1;
    }
  }

function drawEpCine() {
    if (!ep.on && ep.flash <= 0) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ep.bar > 0.01) { var bh = H * 0.09 * ep.bar; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, bh); ctx.fillRect(0, H - bh, W, bh); }
    if (ep.ttlT > 0 && ep.ttl) {
      var kk2 = ep.ttlT / ep.ttlM, a = Math.max(0, Math.min(1, kk2 * 4, (1 - kk2) * 6 + 0.1)), pop = 1 + Math.max(0, 0.2 - (1 - kk2) * ep.ttlM) * 1.5;
      var fs = Math.max(22, Math.min(58, W / (ep.ttl.length * 0.62 + 1)));
      ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, H * 0.22); ctx.scale(pop, pop);
      ctx.font = fs + 'px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      var erz = ep.st === 'kill';
      if (erz) { ctx.fillStyle = 'rgba(255,40,40,.7)'; ctx.fillText(ep.ttl, 4, 2); ctx.fillStyle = 'rgba(40,200,255,.6)'; ctx.fillText(ep.ttl, -4, -2); }
      ctx.lineWidth = 9; ctx.strokeStyle = '#14233f'; ctx.strokeText(ep.ttl, 0, 0); ctx.fillStyle = erz ? '#ffffff' : '#ffd23f'; ctx.fillText(ep.ttl, 0, 0);
      if (ep.ttlS) { ctx.font = '700 ' + Math.max(13, Math.min(20, fs * 0.38)) + 'px "Rubik", system-ui, sans-serif'; ctx.lineWidth = 5; ctx.strokeText(ep.ttlS, 0, fs * 0.8); ctx.fillStyle = '#fff'; ctx.fillText(ep.ttlS, 0, fs * 0.8); }
      ctx.restore();
    }
    if (ep.flash > 0) { ctx.globalAlpha = Math.min(1, ep.flash); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  }

function dlgApply() { document.body.classList.toggle('dlgcine', dlgCine); if (dlgSw) dlgSw.setAttribute('aria-checked', dlgCine ? 'true' : 'false'); }

function dlgType(text) {
    clearInterval(dlgTT); dlgFull = text;
    if (!dlgCine || !text || text.length < 3) { elDlgTx.textContent = text; return; }
    var n = 0; elDlgTx.textContent = '';
    dlgTT = setInterval(function () { n += 2; elDlgTx.textContent = dlgFull.slice(0, n); if (n >= dlgFull.length) { clearInterval(dlgTT); } }, 22);
  }

function dlgShow(who, imgEl, text, choices, info) {
    dlgOpened = true; elDlg.hidden = false;
    elDlgWho.textContent = who;
    if (imgEl && imgEl.src) { elDlgImg.src = imgEl.src; elDlgImg.hidden = false; } else elDlgImg.hidden = true;
    dlgType(text);
    elDlgInfo.hidden = !info; elDlgInfo.textContent = info || '';
    elDlgBtns.textContent = '';
    (choices || []).forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'flbuy' + (c.out ? ' out' : '') + (c.no ? ' no' : ''); b.textContent = c.t;
      b.classList.add('cdn'); b.setAttribute('aria-disabled', 'true');
      b.addEventListener('click', function () { if (b.classList.contains('cdn')) return; sfx('pick'); if (c.fn) c.fn(); else dlgClose(); });
      elDlgBtns.appendChild(b);
    });
    // защита от случайного нажатия: кнопки выбора оживают через 0.8 секунды
    var gb = elDlgBtns, gt = (setTimeout(function () { Array.prototype.forEach.call(gb.children, function (x) { x.classList.remove('cdn'); x.removeAttribute('aria-disabled'); }); }, 800));
    clearTimeout(dlgGuardT); dlgGuardT = gt;
    syncPause(); sfx('pick');
  }

function dlgClose() { clearInterval(dlgTT); dlgOpened = false; elDlg.hidden = true; syncPause(); }

function mgCap() { return Math.max(50, 100 + 40 * (save.mx.mq | 0) + (save.mx.hol ? 60 : 0) + relMag() + ((primeAlly() || (save.mx.c2p | 0) === 3) ? 40 : 0)); }

function rvNeed(q) { return q.per ? q.per.length * q.n : q.n; }

function rvCur() {
    var q = RV[save.mx.rq], s = 0, i; if (!q) return 0;
    if (q.per) { for (i = 0; i < q.per.length; i++) s += Math.min(q.n, save.mx.rl[i] || 0); return s; }
    return Math.min(q.n, save.mx.rp || 0);
  }

function rvDone() { var q = RV[save.mx.rq]; return !!q && rvCur() >= rvNeed(q); }

function magicOn() { return !!save.mx.mg; }

function mgC(c) { return save.mx.pas ? Math.max(1, Math.round(c * 0.1)) : c; }

function magicBlocked() { return paused || dlgOpened || ob.on || bus.on || !!ride.id || boss.on || ep.on || kk.on || trip.inn || !!lt.st || subActive() || busLock() || loc.i === 4 || loc.i === 5 || loc.i === 7 || rit.on || gym.on; }

function magicVisible() { return magicOn() && (p5.on || !magicBlocked()); }

function mgAllowed() {
    if (!save.mx.ra) return false;
    var q = RV[save.mx.rq], i; if (!q || rvDone()) return false;
    if (loc.i !== 0 && loc.i !== 1 && loc.i !== 2 && loc.i !== 3 && loc.i !== 6) return false;
    if (q.locs && q.locs.indexOf(loc.i) < 0) return false;
    if (q.per) { i = q.per.indexOf(loc.i); if (i < 0 || (save.mx.rl[i] || 0) >= q.n) return false; }
    return true;
  }

function mgCollect(b) {
    var q = RV[save.mx.rq], i;
    if (!save.mx.ra || !q) return;
    if (q.per) { i = q.per.indexOf(loc.i); if (i >= 0 && (save.mx.rl[i] || 0) < q.n) save.mx.rl[i]++; }
    else save.mx.rp = (save.mx.rp || 0) + 1;
    persist();
    popup(b.x, 70, '+1 (' + rvCur() + '/' + rvNeed(q) + ')', '#d6b8ff');
    sfx('pick'); burst(b.x, gY - 40, 10, '#b58cff', 240, 0.6);
    if (rvDone()) { sfx('rare'); toast('Задание выполнено: ' + q.t.toLowerCase() + '. Вернись к Собирателю чекушек в посёлке.', 6500); }
  }

function magicCast() {
    if (p5.on) { p5Special(); return; }
    if (!magicOn() || magicBlocked() || mgCd > 0) return;
    if (stoneCast()) return;
    if (loc.i === 8 || loc.i === 12) { popup(P.x, PLAYER_H + 24, 'Здесь магии нечего подбирать', '#cfd8e6'); return; }
    if (mgMana < mgC(MG_COST)) { if (mgNoManaT <= 0) { mgNoManaT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Магия копит силу', '#ff9a9a'); } return; }
    mgMana -= mgC(MG_COST); mgCd = 0.5; sfx('jump');
    ring(P.x, gY - 80, 90, '#b58cff'); ring(P.x, gY - 80, 200, '#ffd23f');
    var got = 0, i;
    for (i = mgb.length - 1; i >= 0; i--) {
      var b = mgb[i];
      if (Math.abs(b.x - P.x) > MG_R * (save.mx.hol ? 1.4 : 1)) continue;
      mgBeams.push({ x1: P.x, y1: gY - 90 - P.z, x2: b.x, y2: gY - 26, age: 0 });
      mgCollect(b); mgb.splice(i, 1); got++;
    }
    if (!got) popup(P.x, PLAYER_H + 24, save.mx.ra ? 'Рядом нет магических чекушек' : 'Магия без цели', '#cfd8e6');
  }

function updateMg(dt) {
    if (mgCd > 0) mgCd -= dt;
    if (mgNoManaT > 0) mgNoManaT -= dt;
    if (magicOn() && mgMana < mgCap()) mgMana = Math.min(mgCap(), mgMana + dt * (save.mx.hol ? 14 : 7) * relReg());
    var i;
    for (i = mgBeams.length - 1; i >= 0; i--) { mgBeams[i].age += dt; if (mgBeams[i].age > 0.35) mgBeams.splice(i, 1); }
    if (mgLoc !== loc.i) { mgb.length = 0; mgLoc = loc.i; mgSpawnT = 1.5; }
    if (!save.mx.ra) { mgb.length = 0; return; }
    var q = RV[save.mx.rq];
    if (!q || paused) return;
    for (i = mgb.length - 1; i >= 0; i--) {
      var b = mgb[i]; b.age += dt; b.ph += dt * 3;
      if (q.flee) {
        var dx = b.x - P.x, ad = Math.abs(dx);
        if (ad < 380) b.vx += (dx >= 0 ? 1 : -1) * 520 * dt * (1 - ad / 380 + 0.2);
      }
      b.vx *= Math.max(0, 1 - 2.2 * dt); b.x += b.vx * dt;
      if (b.x < 60) { b.x = 60; b.vx = Math.abs(b.vx) * 0.5; } if (b.x > WORLD_W - 60) { b.x = WORLD_W - 60; b.vx = -Math.abs(b.vx) * 0.5; }
      if (b.age > b.life) { burst(b.x, gY - 30, 6, '#7a5cc4', 120, 0.5); mgb.splice(i, 1); }
    }
    if (!mgAllowed()) return;
    mgSpawnT -= dt;
    if (mgSpawnT <= 0 && mgb.length < 3 + save.mx.rq) {
      mgSpawnT = 2.2 + Math.random() * 2.2;
      var side = Math.random() < 0.5 ? -1 : 1, x = P.x + side * (260 + Math.random() * 520);
      x = Math.max(120, Math.min(WORLD_W - 120, x));
      mgb.push({ x: x, age: 0, life: q.life, ph: Math.random() * 6, vx: 0 });
      burst(x, gY - 30, 8, '#b58cff', 180, 0.5);
    }
  }

function drawMg() {
    var i, b, spr0 = (typeof bottleSprite === 'function') ? bottleSprite(4, true) : null;
    for (i = 0; i < mgb.length; i++) {
      b = mgb[i]; if (b.x < camX - 80 || b.x > camX + vw + 80) continue;
      var bob = Math.sin(b.ph) * 5, fade = Math.min(1, (b.life - b.age) / 3);
      ctx.save(); ctx.globalAlpha = Math.max(0.2, fade);
      var gr = ctx.createRadialGradient(b.x, gY - 36 - bob, 4, b.x, gY - 36 - bob, 56);
      gr.addColorStop(0, 'rgba(210,170,255,.85)'); gr.addColorStop(0.5, 'rgba(150,100,255,.35)'); gr.addColorStop(1, 'rgba(150,100,255,0)');
      ctx.fillStyle = gr; ctx.fillRect(b.x - 56, gY - 92 - bob, 112, 112);
      if (spr0) {
        var h = 46, w = h * spr0.width / spr0.height;
        try { ctx.filter = 'hue-rotate(250deg) saturate(1.6)'; } catch (e) {}
        ctx.drawImage(spr0, b.x - w / 2, gY - 12 - h - bob, w, h);
        try { ctx.filter = 'none'; } catch (e) {}
      } else { ctx.fillStyle = '#b58cff'; ctx.fillRect(b.x - 8, gY - 52 - bob, 16, 40); }
      ctx.fillStyle = '#fff'; var sp = (t * 3 + b.ph) % 6.28; ctx.beginPath(); ctx.arc(b.x + Math.cos(sp) * 22, gY - 36 - bob + Math.sin(sp) * 22, 2.4, 0, 6.3); ctx.fill();
      ctx.restore();
    }
    for (i = 0; i < mgBeams.length; i++) {
      var m = mgBeams[i], a = 1 - m.age / 0.35;
      ctx.strokeStyle = 'rgba(181,140,255,' + a + ')'; ctx.lineWidth = 6 * a + 1; ctx.beginPath(); ctx.moveTo(m.x1, m.y1); ctx.lineTo(m.x2, m.y2); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,230,120,' + a + ')'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x1, m.y1); ctx.lineTo(m.x2, m.y2); ctx.stroke();
    }
  }

function drawMgHud() {
    if (!magicOn() || ep.on || boss.on || kk.on || lt.st) return;
    var show = save.mx.ra || mgMana < mgCap() - 1;
    if (!show) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var q = RV[save.mx.rq], txt = '';
    if (save.mx.ra && q) txt = rvDone() ? 'Задание выполнено: вернись к Собирателю' : 'Магические чекушки ' + (save.mx.rq + 1) + '/5: ' + rvCur() + '/' + rvNeed(q) + (mgAllowed() ? '' : ' (здесь не появляются)');
    var bw = Math.min(300, W - 24), bx = (W - bw) / 2, by = H - 30;
    if (txt) {
      ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = Math.min(W - 16, ctx.measureText(txt).width + 24);
      ctx.fillStyle = 'rgba(20,35,63,.82)'; rrect(W / 2 - tw / 2, by - 30, tw, 24, 12); ctx.fill();
      ctx.fillStyle = '#e6d6ff'; ctx.fillText(txt, W / 2, by - 18);
    }
    ctx.fillStyle = 'rgba(20,35,63,.82)'; rrect(bx - 2, by - 2, bw + 4, 12, 6); ctx.fill();
    ctx.fillStyle = mgMana >= MG_COST ? '#b58cff' : '#7a6aa8'; ctx.fillRect(bx, by, bw * mgMana / mgCap(), 8);
  }

function rvStartQuest() { var q = RV[save.mx.rq]; return 'Задание ' + (save.mx.rq + 1) + ' из 5: ' + q.t + '. ' + q.hint; }

function rvMain() {
    var who = 'Собиратель чекушек', im = img.npcCollector;
    dlgShow(who, im, 'Слышал, ты стёр Хоумлендера навсегда. Без него небо какое-то пустое, особые аирдропы лежат без дела.\nЕсли очень надо, я могу его вернуть. Но это не бесплатно.', [
      { t: 'Вернуть Хоумлендера', fn: rvConfirm },
      { t: 'Мои обычные задания', fn: function () { dlgClose(); talkCollectorQ(); } },
      { t: 'Пока не надо', out: true }
    ]);
  }

function rvConfirm() {
    dlgShow('Собиратель чекушек', img.npcCollector, 'Ты уверен?\nОн вернётся таким же: снова будет летать над головой и бить лазерами. А чтобы вернуть его, нужна твоя магия: пять заданий, от лёгких до сложных. Обратно его уже не стереть без новой битвы.', [
      { t: 'Да, уверен', fn: function () {
        save.mx.ra = 1; save.mx.rq = 0; save.mx.rp = 0; save.mx.rl = [0, 0, 0]; persist();
        dlgShow('Собиратель чекушек', img.npcCollector, 'Ну раз так. Магические чекушки появляются рядом с тобой, но обычными руками их не взять: только магией (' + (touch ? 'кнопка «Магия»' : 'клавиша G') + ').\n' + rvStartQuest(), [{ t: 'Понял', out: true }]);
      } },
      { t: 'Нет, передумал', fn: function () { dlgShow('Собиратель чекушек', img.npcCollector, 'Мудро. Подумай ещё: может, пустое небо тебе даже нравится.', [{ t: 'Ага', out: true }]); } }
    ]);
  }

function rvTurnIn() {
    var q = RV[save.mx.rq]; if (!q || !rvDone()) return;
    save.coins += q.rw; save.mx.rq++; save.mx.rp = 0; save.mx.rl = [0, 0, 0]; persist(); hud(); sfx('rare');
    popup(NPCS[0].x, 160, '+' + fmtN(q.rw), '#ffd23f');
    if (save.mx.rq >= RV.length) {
      save.mx.rr = 1; persist();
      dlgShow('Собиратель чекушек', img.npcCollector, 'Задание выполнено, держи ' + fmtN(q.rw) + ' ' + coinWord(q.rw) + '.\nВсе пять заданий позади. Магия тебя слушается. Остался обряд, но его проводят только ночью.' + (dnIsNight() ? ' А сейчас как раз ночь: поговори со мной ещё раз, и пойдём в Лес.' : ' Дождись ночи (она через ' + fmtTime(dnToNight()) + ') и приди ко мне: я отведу тебя в Лес.'), [{ t: 'Понял', out: true }]);
    } else {
      dlgShow('Собиратель чекушек', img.npcCollector, 'Задание выполнено, держи ' + fmtN(q.rw) + ' ' + coinWord(q.rw) + '.\nСледующее.\n' + rvStartQuest(), [{ t: 'Понял', out: true }]);
    }
  }

function rvRevive() {
    dlgClose();
    save.mx.rr = 0; save.mx.er = 0; save.mx.ra = 0; save.mx.rq = 0; save.mx.rp = 0; save.mx.rl = [0, 0, 0]; save.mx.rs = (save.mx.rs || 0) + 1;
    heroT = 4; hero.on = false; persist(); hud(); ach('revive'); sfx('rare'); shk = 0.8;
    ring(P.x, gY - 100, 300, '#b58cff'); ring(P.x, gY - 100, 180, '#ffd23f'); burst(P.x, gY - 100, 40, '#ffd23f', 460, 1);
    toast('Ритуал завершён: Хоумлендер вернулся. Он снова летает над головой, а особые аирдропы снова работают. Магия осталась с тобой.', 8000);
  }

function rvTalk() {
    if (!save.mx.er && !save.mx.ra) return false;
    if (save.mx.ra) {
      var q = RV[save.mx.rq];
      if (!q) { save.mx.rr = 1; persist(); ritTalk(); return true; }
      if (rvDone()) { rvTurnIn(); return true; }
      dlgShow('Собиратель чекушек', img.npcCollector, rvStartQuest(), [
        { t: 'Мои обычные задания', fn: function () { dlgClose(); talkCollectorQ(); } },
        { t: 'Отказаться от воскрешения', fn: function () { save.mx.ra = 0; save.mx.rq = 0; save.mx.rp = 0; save.mx.rl = [0, 0, 0]; persist(); dlgShow('Собиратель чекушек', img.npcCollector, 'Хорошо, отменили. Поговоришь со мной, если снова захочешь.', [{ t: 'Ок', out: true }]); } },
        { t: 'Продолжить', out: true }
      ], 'Прогресс: ' + rvCur() + ' из ' + rvNeed(q) + ' · награда ' + fmtN(q.rw) + ' ' + coinWord(q.rw));
      return true;
    }
    rvMain();
    return true;
  }

function skLvl(i) { return (save.mx.sk && save.mx.sk[i]) | 0; }

function skBusy() { return gh.on || dn.on || paused || dlgOpened || lt.st || cs.on || fin.on || rit.on || p6.on || av.on || (p5.on && p5.st !== 'fight'); }

function skUse(i, rel) {
    if (i === 2 && rel && !(skCh > 0)) return;
    if (!magicOn() || skLvl(i) < 1 || skBusy() || skCd[i] > 0) return;
    if (!(boss.on || p5.on || ep.on || kk.on || loc.i === 10 || i === 1 || i === 3)) { popup(P.x, PLAYER_H + 24, 'Навык нужен в бою', '#cfd8e6'); return; }
    var L = skLvl(i), cost = mgC(i === 0 ? 90 : (i === 1 ? 25 : (i === 3 ? 95 : 35))), d = P.face >= 0 ? 1 : -1, n, k;
    if (i === 3 && skRevive()) return;
    if (i === 0 && L < 3) { popup(P.x, PLAYER_H + 24, 'Расширение по команде: на 3 уровне', '#cfd8e6'); return; }
    if (mgMana < cost) { if (mgNoManaT <= 0) { mgNoManaT = 0.8; sfx('no'); popup(P.x, PLAYER_H + 24, 'Магия копит силу', '#ff9a9a'); } return; }
    if (i === 2 && !rel) { skCh = 0.001; return; }
    var cp = i === 2 ? skCh : 0; if (i === 2) skCh = 0;
    mgMana -= cost;
    if (i === 0) {
      mgFatB = (save.mx.bb | 0) > 0; if (mgFatB) { save.mx.bb = (save.mx.bb | 0) - 1; persist(); } mgFatMax = mgFatB ? 16 : 10; mgFat = mgFatMax; skCd[0] = mgFatB ? 18 : 30; fatStart(); sfx('rare'); shk = Math.max(shk, 0.7); ring(P.x, gY - 80, 320, '#ffd23f'); ring(P.x, gY - 80, 200, '#b58cff'); burst(P.x, gY - 80, 30, '#ffd23f', 420, 1);
      popup(P.x, PLAYER_H + 60, mgFatB ? 'ЖИР-КУПОЛ + БУРГЕР-ДОЖДЬ!' : 'ЖИР-КУПОЛ: враги заперты и замедлены, падают бургеры', mgFatB ? '#ff9a3c' : '#ffd23f');
    } else if (i === 1) {
      mgShield = [3, 4.5, 6][L - 1]; skCd[1] = [14, 11, 8][L - 1]; sfx('pick'); ring(P.x, gY - 80, 90, '#9fe3ff'); popup(P.x, PLAYER_H + 40, 'ЩИТ', '#9fe3ff');
    } else if (i === 3) {
      var hf = [0.4, 0.65, 1][L - 1], before = hp; hp = Math.min(maxHp(), hp + Math.round(maxHp() * hf)); skCd[3] = [25, 20, 16][L - 1]; if (L >= 3) iFrames = Math.max(iFrames, 3);
      sfx('rare'); fxHeal(P.x, gY - 80); popup(P.x, PLAYER_H + 50, 'ЖИРОВОЕ ЛЕЧЕНИЕ +' + Math.max(0, Math.round(hp - before)), '#9dffb8');
    } else {
      var pw = 0.5 + 1.7 * Math.min(1, cp / 1.6); n = [28, 48, 75][L - 1] * pw; skCd[2] = 6; sfx('boom'); shk = Math.max(shk, 0.5);
      skLz = { x: P.x + d * 40, y: gY - 84 - P.z, d: d, t: 0, L: L, pw: pw };
      shk = Math.max(shk, 0.3 + 0.45 * pw / 2.2); burst(P.x + d * 60, gY - 84 - P.z, 8 + Math.round(10 * pw), '#fff3a0', 420 + 160 * pw, 0.6); if (pw >= 1.5) { ring(P.x + d * 60, gY - 84 - P.z, 170, '#ffffff'); ring(P.x + d * 60, gY - 84 - P.z, 280, '#b58cff'); }
      if (mgFat > 0) n *= mgFatB ? 2.5 : 1.8;
      if (boss.on) damageBoss(n, false, false);
      else if (ep.on && ep.st !== 'call' && ep.st !== 'mell') { if (ep.assist) storyEmit({ ed: Math.min(200, Math.round(n)) }); else ep.hp = Math.max(1, ep.hp - n); }
      else if (kk.on && typeof krDamage === 'function') krDamage(n * 0.6, false);
      if (p5.on) { var cnt = 4 + L * 3; for (k = 0; k < cnt; k++) (function (kk2) { setTimeout(function () { if (p5.on) p5.ps.push({ x: P.x + d * 40, y: gY - 78 - P.z, vx: d * 1500, dmg: (9 + L * 3 + (mgFat > 0 ? (mgFatB ? 22 : 12) : 0)) * pw, life: 1.1, big: true }); }, kk2 * 70); })(k); }
      if (loc.i === 10) for (k = 0; k < mogs.length; k++) if ((mogs[k].x - P.x) * d > 0 && Math.abs(mogs[k].x - P.x) < 900) { mogs[k].x += d * 200; mogs[k].cd = Math.max(mogs[k].cd, 2); burst(mogs[k].x, gY - 70, 10, '#ffd23f', 260, 0.6); }
    }
  }

function skTick(dt) {
    if (skCh > 0) { if (skBusy() || !magicOn() || skCd[2] > 0) skCh = 0; else skCh = Math.min(1.6, skCh + dt); }
    var i; for (i = 0; i < 4; i++) if (skCd[i] > 0) skCd[i] -= dt;
    if (mgShield > 0) mgShield -= dt;
    fatTick(dt);
    if (mgFat > 0) { mgFat -= dt; if (mgFat <= 0) mgFatB = false; if (typeof mgMana === 'number' && mgMana < mgCap()) mgMana = Math.min(mgCap(), mgMana + dt * 14); }
    if (skLz) { skLz.t += dt; if (skLz.t > 0.55) skLz = null; }
    // кнопки
    var vis = magicOn() && (boss.on || p5.on || ep.on || kk.on || loc.i === 10) && !skBusy();
    for (i = 0; i < 4; i++) {
      var b = skBtn[i], show = vis && skLvl(i) > 0, lock = i === 0 && skLvl(0) < 3;
      if (b.hidden === show) b.hidden = !show;
      if (show) { var tx = i === 2 && skCh > 0 ? 'Заряд ' + Math.round(100 * skCh / 1.6) + '%' : lock ? SK[i].n.split(' ')[0] + ' 🔒 ур.3' : SK[i].n.split(' ')[0] + (skCd[i] > 0 ? ' ' + Math.ceil(skCd[i]) : ''); if (b.textContent !== tx) b.textContent = tx; b.classList.toggle('no', skCd[i] > 0 || lock); }
    }
  }

function skHud() {
    if (skCh > 0) {
      var q = Math.min(1, skCh / 1.6), cx = P.x, cy = gY - 80 - P.z, cr = 26 + 46 * q;
      ctx.save(); ctx.globalAlpha = 0.5 + 0.4 * q; ctx.strokeStyle = q >= 1 ? '#fff' : '#b58cff'; ctx.lineWidth = 3 + 3 * q; ctx.beginPath(); ctx.arc(cx, cy, cr + 4 * Math.sin(t * 20), 0, 6.3); ctx.stroke();
      var gr = ctx.createRadialGradient(cx, cy, 2, cx, cy, cr); gr.addColorStop(0, 'rgba(255,240,170,' + (0.7 * q).toFixed(2) + ')'); gr.addColorStop(1, 'rgba(181,140,255,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.3); ctx.fill();
      ctx.globalAlpha = 0.9; ctx.fillStyle = q >= 1 ? '#fff' : '#ffe27a'; for (var qi = 0; qi < 8; qi++) { var qa = t * (5 + 6 * q) + qi * 0.785, qr = (cr + 34) * (1 - 0.35 * ((t * 2 + qi * 0.37) % 1)); ctx.beginPath(); ctx.arc(cx + Math.cos(qa) * qr, cy + Math.sin(qa) * qr, 2.5 + 2 * q, 0, 6.3); ctx.fill(); }
      ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(20,16,40,.8)'; ctx.fillRect(cx - 40, gY - PLAYER_H - 40, 80, 8); ctx.fillStyle = q >= 1 ? '#fff' : '#ffd23f'; ctx.fillRect(cx - 39, gY - PLAYER_H - 39, 78 * q, 6); ctx.restore();
    }
    var on = mgFat > 0 || (p5.on && p5.fat); if (!on || cs.on || fin.on) return;
    var k = mgFat > 0 ? Math.min(1, mgFat / 1.0, (mgFatMax - mgFat) / 0.3 + 0.2) : 0.8, pl = 0.5 + 0.5 * Math.sin(t * 5);
    ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.38, W / 2, H / 2, Math.max(W, H) * 0.75);
    g.addColorStop(0, 'rgba(255,210,63,0)'); g.addColorStop(1, 'rgba(255,170,30,' + ((0.26 + 0.1 * pl) * k).toFixed(2) + ')');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; var fs = Math.max(15, Math.min(26, W / 30));
    ctx.font = fs + 'px "Russo One", "Arial Black", Impact, sans-serif'; var lbl = 'ЖИР-ТЕРРИТОРИЯ' + (mgFatB ? ' ★БУРГЕР' : '') + (mgFat > 0 ? ' · ' + Math.ceil(mgFat) + ' с' : '');
    ctx.lineWidth = 6; ctx.strokeStyle = '#3a1a5a'; ctx.strokeText(lbl, W / 2, H * 0.26); ctx.fillStyle = pl > 0.5 ? '#ffd23f' : '#fff0a0'; ctx.fillText(lbl, W / 2, H * 0.26);
    ctx.restore();
  }

function skDraw() {
    var pl = 0.5 + 0.5 * Math.sin(t * 6), a;
    if (mgFat > 0 || (p5.on && p5.fat)) {
      var k = mgFat > 0 ? Math.min(1, mgFat / 1.2) : 1, R = 270 + 18 * pl, q; ctx.save(); if (mgFat > 0 && fatDome) ctx.translate(fatDome.x - P.x, 0);
      var g = ctx.createRadialGradient(P.x, gY - 60, 20, P.x, gY - 60, R); g.addColorStop(0, 'rgba(255,210,63,' + (0.34 * k).toFixed(2) + ')'); g.addColorStop(0.65, 'rgba(181,140,255,' + (0.26 * k).toFixed(2) + ')'); g.addColorStop(1, 'rgba(181,140,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.x, gY - 60, R, 0, 6.3); ctx.fill();
      ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 4;
      for (q = 0; q < 2; q++) { ctx.strokeStyle = q ? 'rgba(181,140,255,' + (0.6 * k).toFixed(2) + ')' : 'rgba(255,210,63,' + (0.75 * k).toFixed(2) + ')'; ctx.setLineDash(q ? [14, 22] : [30, 14]); ctx.lineDashOffset = (q ? 1 : -1) * t * 60; ctx.beginPath(); ctx.ellipse(P.x, gY + 4, R * (0.95 - q * 0.22), 30 - q * 7, 0, 0, 6.3); ctx.stroke(); }
      ctx.setLineDash([]);
      for (q = 0; q < 16; q++) { var px = P.x + Math.sin(q * 1.9 + t * 0.7) * R * 0.85, py = gY - ((t * 70 + q * 41) % 240); ctx.fillStyle = (q % 2 ? 'rgba(255,230,120,' : 'rgba(210,170,255,') + (0.7 * k * (1 - ((t * 70 + q * 41) % 240) / 240)).toFixed(2) + ')'; ctx.fillRect(px - 3, py - 3, 6, 6); }
      if (mgFat > 0 && fatDome) { var dg = ctx.createLinearGradient(0, gY - R * 0.9, 0, gY); dg.addColorStop(0, 'rgba(255,210,63,' + (0.05 * k).toFixed(3) + ')'); dg.addColorStop(1, 'rgba(255,170,60,' + (0.2 * k).toFixed(2) + ')'); ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(P.x, gY + 4, R, R * 0.9, 0, Math.PI, 0); ctx.fill(); ctx.strokeStyle = 'rgba(255,230,140,' + (0.55 * k).toFixed(2) + ')'; ctx.lineWidth = 4; ctx.setLineDash([]); ctx.beginPath(); ctx.ellipse(P.x, gY + 4, R, R * 0.9, 0, Math.PI, 0); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,' + (0.5 * k).toFixed(2) + ')'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЖИР-КУПОЛ', P.x, gY - R * 0.9 - 8); }
      ctx.restore();
    }
    drawFatBurgers();
    if (mgShield > 0) {
      ctx.save(); a = Math.min(1, mgShield / 0.8); ctx.strokeStyle = 'rgba(159,227,255,' + (0.55 + 0.3 * pl).toFixed(2) + ')'; ctx.lineWidth = 4; ctx.fillStyle = 'rgba(159,227,255,' + (0.12 * a).toFixed(2) + ')';
      ctx.beginPath(); ctx.ellipse(P.x, gY - 70 - P.z, 62, 92, 0, 0, 6.3); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    if (skLz) {
      var z = skLz, kk3 = 1 - z.t / 0.55, len = 1500, th = (30 + 14 * z.L) * (0.75 + 0.45 * (z.pw || 1)) * kk3; ctx.save();
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(181,140,255,' + (0.3 * kk3).toFixed(2) + ')'; ctx.fillRect(Math.min(z.x, z.x + z.d * len), z.y - th * 1.1, len, th * 2.2); ctx.globalCompositeOperation = 'source-over';
      for (var zi = 0; zi < 10; zi++) { var zx = z.x + z.d * (((zi * 157 + t * 900) % len)); ctx.fillStyle = 'rgba(255,245,190,' + (0.7 * kk3).toFixed(2) + ')'; ctx.fillRect(zx, z.y + Math.sin(zi * 2.3 + t * 30) * th * 0.6, 14, 3); }
      var lg = ctx.createLinearGradient(z.x, 0, z.x + z.d * len, 0); lg.addColorStop(0, 'rgba(255,255,255,' + kk3.toFixed(2) + ')'); lg.addColorStop(0.15, 'rgba(255,210,63,' + kk3.toFixed(2) + ')'); lg.addColorStop(1, 'rgba(255,107,208,0)');
      ctx.fillStyle = lg; ctx.fillRect(Math.min(z.x, z.x + z.d * len), z.y - th / 2, len, th);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.9 * kk3).toFixed(2) + ')'; ctx.fillRect(Math.min(z.x, z.x + z.d * len), z.y - th / 6, len, th / 3);
      ctx.restore();
    }
  }

function skMenu() {
    var ch = [], i;
    function row(i) {
      var L = skLvl(i), mx = L >= 3, c = mx ? 0 : SK[i].cost[L];
      ch.push({ t: SK[i].n + ' · ур. ' + L + '/3' + (mx ? ' (макс.)' : ' · купить за ' + fmtN(c)), fn: function () {
        if (mx) { skMenu(); return; }
        if (save.coins < c) { sfx('no'); toast('Не хватает коинов.', 2500); skMenu(); return; }
        save.coins -= c; if (!save.mx.sk) save.mx.sk = [0, 0, 0, 0]; save.mx.sk[i] = L + 1; persist(); hud(); sfx('sell'); skMenu();
      } });
    }
    for (i = 0; i < 4; i++) row(i);
    var mq = save.mx.mq | 0, mqm = mq >= 5, mqc = mqm ? 0 : [8000, 20000, 50000, 120000, 300000][mq];
    ch.push({ t: 'Ёмкость магии · ' + mgCap() + (mqm ? ' (макс.)' : ' · +40 за ' + fmtN(mqc)), fn: function () {
      if (mqm) { skMenu(); return; }
      if (save.coins < mqc) { sfx('no'); toast('Не хватает коинов.', 2500); skMenu(); return; }
      save.coins -= mqc; save.mx.mq = mq + 1; persist(); hud(); sfx('sell'); mgMana = Math.min(mgCap(), mgMana + 40); toast('Ёмкость магии: ' + mgCap() + '.', 2500); skMenu();
    } });
    ch.push({ t: 'Назад', fn: ritMenu });
    var cur = [0, 1, 2, 3].map(function (j) { var L = skLvl(j); return SK[j].n + ': ' + (L ? SK[j].d[L - 1] : 'не изучено'); }).join('\n');
    dlgShow('Круг ритуала', img.npcCollector, 'Здесь можно прокачать навыки магии. В бою: 1 расширение жира, 2 щит, 3 лазер жира (зажми: заряд до 1,6 с, от 50% до 220% урона), 4 жировое лечение (на телефоне появляются кнопки).\n' + cur, ch, 'Коины: ' + fmtN(save.coins));
  }

function ritMenu() {
    var ch = [];
    ch.push({ t: 'Навыки магии', fn: function () { if (!magicOn()) { dlgClose(); sfx('no'); toast('Навыки доступны после получения магии: победи Хоумлендера у Белого дома.', 4500); return; } skMenu(); } });
    if (save.mx.rr !== 1) ch.push({ t: 'Начать ритуал по приколу', fn: function () { dlgClose(); ritFun(); } });
    else ch.push({ t: 'Начать обряд', fn: function () { dlgClose(); if (!dnIsNight()) { sfx('no'); toast('Обряд проводят только ночью. Ночь через ' + fmtTime(dnToNight()), 3500); } else ritStart(); } });
    ch.push({ t: 'Позже', out: true });
    dlgShow('Круг ритуала', img.npcCollector, 'Древний круг на поляне. Здесь проводят обряд и растят силу магии.', ch);
  }

function mellImg() {
    if (!mellPort && ready(img.mell)) { try { var c = document.createElement('canvas'); c.width = 224; c.height = 99; c.getContext('2d').drawImage(img.mell, 0, 0, 224, 99, 0, 0, 224, 99); mellPort = { src: c.toDataURL('image/png') }; } catch (e) {} }
    return mellPort || img.mell;
  }

function nearHosp() { return loc.i === 9 && !lt.st && Math.abs(P.x - HOSP_X) < 120 && P.z < 70; }

function drawAmbulance(x) {
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, gY + 4, 90, 7, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#f7f9fb'; rrect(x - 84, gY - 78, 168, 66, 10); ctx.fill();
    ctx.fillStyle = '#e04747'; ctx.fillRect(x - 84, gY - 44, 168, 9);
    ctx.fillStyle = '#9fd0ee'; ctx.fillRect(x + 36, gY - 68, 40, 24);
    ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 40, gY - 66, 8, 24); ctx.fillRect(x - 48, gY - 58, 24, 8);
    ctx.fillStyle = Math.floor(t * 4) % 2 ? '#ff4b4b' : '#4b7bff'; ctx.fillRect(x - 12, gY - 86, 24, 9);
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 46, gY - 10, 14, 0, 6.3); ctx.arc(x + 48, gY - 10, 14, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#aaa'; ctx.beginPath(); ctx.arc(x - 46, gY - 10, 6, 0, 6.3); ctx.arc(x + 48, gY - 10, 6, 0, 6.3); ctx.fill();
  }

function drawHospitalBack(x0, x1) {
    parallaxSkyline(0.25, 20, 140, 150, '#c9d6e8', 5);
    parallaxSkyline(0.45, 8, 100, 150, '#a9bdd9', 17);
    setCam(1);
    drawCityGround(x0, x1, LOCS[9].w);
    ctx.fillStyle = '#74bd72'; ctx.fillRect(Math.max(0, x0), gY - 4, Math.min(LOCS[9].w, x1) - Math.max(0, x0), 22); ctx.fillStyle = '#62a95f'; ctx.fillRect(Math.max(0, x0), gY + 12, Math.min(LOCS[9].w, x1) - Math.max(0, x0), 6);
    if (HOSP_X + 300 > x0 && HOSP_X - 300 < x1) drawHospital(HOSP_X);
    if (!resc.on && HOSP_X - 640 > x0 - 120 && HOSP_X - 640 < x1 + 120) drawAmbulance(HOSP_X - 640);
  }

function hatchOn() { return c2n() >= 4 || !!save.mx.endp; }

function drawHatch(x0, x1) {
    if (!hatchOn() || HATCH_X < x0 - 80 || HATCH_X > x1 + 80) return;
    var x = HATCH_X, y = gY + 8, pl = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.fillStyle = 'rgba(20,12,6,.45)'; ctx.beginPath(); ctx.ellipse(x, y + 3, 62, 15, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#3a3d46'; ctx.beginPath(); ctx.ellipse(x, y, 58, 13, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(x, y, 54, 11.5, 0, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#6b7080'; ctx.beginPath(); ctx.ellipse(x, y - 1.5, 46, 9.5, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#4a4e5a'; ctx.lineWidth = 2;
    for (var q = -3; q <= 3; q++) { ctx.beginPath(); ctx.moveTo(x + q * 12, y - 9); ctx.lineTo(x + q * 12 * 0.9, y + 6); ctx.stroke(); }
    ctx.fillStyle = 'rgba(120,255,170,' + (0.35 + pl * 0.45) + ')'; ctx.beginPath(); ctx.ellipse(x, y - 1.5, 46, 9.5, 0, 0, 6.3); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.18 + pl * 0.2; ctx.fill(); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.fillStyle = '#1c1f26'; ctx.fillRect(x - 3, gY - 46, 6, 40); ctx.fillStyle = '#2f9e62'; ctx.fillRect(x - 30, gY - 70, 60, 26); ctx.strokeStyle = '#150d2e'; ctx.lineWidth = 2; ctx.strokeRect(x - 30, gY - 70, 60, 26);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЛАБ ▼', x, gY - 52); ctx.textAlign = 'left';
  }

function drawHospitalFront(x0, x1) {
    drawHatch(x0, x1);
    var k, bx = [HOSP_X - 300, HOSP_X + 330, 520, 2500];
    for (k = 0; k < bx.length; k++) {
      var x = bx[k]; if (x < x0 - 60 || x > x1 + 60) continue;
      ctx.fillStyle = '#7a4a22'; ctx.fillRect(x - 30, gY - 28, 60, 7); ctx.fillRect(x - 30, gY - 48, 60, 6); ctx.fillStyle = '#4a3016'; ctx.fillRect(x - 26, gY - 22, 5, 22); ctx.fillRect(x + 21, gY - 22, 5, 22);
    }
    // v2.3.4: деревья как в парке и лесу, стоят по краям и не закрывают здание
    var HT = [[230, 'oak', 190, 11], [560, 'birch', 205, 23], [1030, 'pine', 170, 0], [2030, 'birch', 200, 31], [2340, 'oak', 190, 47], [2720, 'pine', 180, 0]];
    for (k = 0; k < HT.length; k++) {
      var ht = HT[k]; if (ht[0] < x0 - 160 || ht[0] > x1 + 160) continue;
      if (ht[1] === 'oak') oak(ht[0], ht[2], ht[3]); else if (ht[1] === 'birch') birch(ht[0], ht[2], ht[3]); else pine(ht[0], ht[2]);
    }
  }

function hospJobs() {
    var im = mellImg(), q = mqCur(), rdy = q.done(), v = labValue(), ch = [];
    if (rdy) ch.push({ t: 'Забрать награду: ' + qRwText(q.rw), fn: function () {
      qGive(q.rw); save.mx.mi++; if (save.mx.mi >= MQ.length) save.mx.mb = mqSnap(); persist(); hud(); sfx('rare'); ach('mell');
      popup(P.x, PLAYER_H + 30, '+' + (q.rw.coins || 0) + ' ' + coinWord(q.rw.coins || 0), '#ffd23f'); hospJobs();
    } });
    if (v > 0) ch.push({ t: 'Продать образцы за ' + fmtN(v), fn: function () {
      save.coins += v; save.mx.lab = [0, 0, 0]; persist(); hud(); sfx('sell'); popup(P.x, PLAYER_H + 30, '+' + fmtN(v), '#ffd23f'); hospJobs();
    } });
    ch.push({ t: 'Назад', fn: hospTalkBack });
    dlgShow('Меллстрой (в бинтах)', im, 'Из палаты я всё ещё работодатель.\nЗадание ' + (save.mx.mi + 1) + ': ' + q.t + ' (' + q.prog() + ').\nНаграда: ' + qRwText(q.rw) + '.' + (rdy ? '\nДа ты уже всё сделал!' : '') + (v > 0 ? '\nОбразцы из лаборатории тоже беру.' : ''), ch);
  }

function hospMogg() {
    var im = mellImg();
    dlgShow('Меллстрой (в бинтах)', im, 'Чикен Моггити? Он из города Моггити: это слева от Больницы. Там все друг друга могают, и кто не качался, тот остаётся без коинов и чекушек.\nОн пришёл не по моей просьбе, но спас мне жизнь. Хочешь стать таким же, зайди в Качалку и качайся до упора. Даже на максимальном уровне без мышц там не выжить.', [{ t: 'Понятно', fn: hospTalkBack }, { t: 'Уйти', out: true }]);
  }

function hospTreasure() {
    var im = mellImg();
    dlgShow('Меллстрой (в бинтах)', im, 'Глубинное сокровище. Оно очистит все чекушки навсегда. Лежит на самом дне Глубокого океана, на 500 метрах, и его охраняет Ктулху: он в пять раз сильнее Кракена.\nЧекушки ему как комариные укусы. Тебе нужна подлодка с глубиной 500 м и торпеда из лавки рыбака.', [{ t: 'Понятно', fn: hospTalkBack }, { t: 'Уйти', out: true }]);
  }

function hospTalkBack() { dlgClose(); hospTalk(); }

function hospWhy() {
    var im = mellImg();
    dlgShow('Меллстрой (в бинтах)', im, 'Потому что это один шаг. Всего один.\nХоумлендер был замком на огромной двери. Пока он был жив, никто не мог её открыть. Теперь замок снят, и магия доната в тебе будет только расти.', [
      { t: 'Что за дверь и что за концовка?', fn: function () {
        save.mx.hq = 3; persist();
        dlgShow('Меллстрой (в бинтах)', im, 'Узнаешь в следующей части. Скажу лишь: океан, Кракен, Гугл-фиш, остров с пещерой и Белый дом — всё это части одного пазла.\nБереги магию. И не торопись с ответами.\n\nИ загляни в шахту на острове: там спрятано то, чего я не успел тебе показать.', [{ t: 'Я вернусь', out: true }]);
      } },
      { t: 'А если я захочу вернуть Хоумлендера?', fn: function () {
        save.mx.hq = 3; persist();
        dlgShow('Меллстрой (в бинтах)', im, 'Собиратель чекушек умеет такое. Только это цена: пять заданий и твоя магия. И дверь снова закроется.\nПодумай дважды.', [{ t: 'Подумаю', out: true }]);
      } },
      { t: 'Назад', fn: hospTalkBack }
    ]);
  }

function dnU() { return ((Date.now() / 1000) % DN_CYC) / DN_CYC; }

function dnDark(u) {
    if (u < 0.5) return 0;
    if (u < 0.62) { var a = (u - 0.5) / 0.12; return a * a * (3 - 2 * a); }
    if (u < 0.88) return 1;
    var b = 1 - (u - 0.88) / 0.12; return b * b * (3 - 2 * b);
  }

function dnIsNight() { var u = dnU(); return u >= 0.62 && u < 0.88; }

function dnPhase() { var u = dnU(); return u < 0.5 ? 'day' : (u < 0.62 ? 'dusk' : (u < 0.88 ? 'night' : 'dawn')); }

function dnToNight() { var u = dnU(); if (u >= 0.62 && u < 0.88) return 0; var d = (0.62 - u + 1) % 1; return d * DN_CYC; }

function dnNightLeft() { var u = dnU(); return (u >= 0.62 && u < 0.88) ? (0.88 - u) * DN_CYC : 0; }

function dnIndoor() { return loc.i >= 19 || loc.i === 8 || loc.i === 12 || loc.i === 13 || loc.i === 14 || loc.i === 18 || p5.on || p6.on || subActive(); }

function dnStars(d) {
    var n = Math.floor(W * gScreen / 5200) + 30, i, a;
    for (i = 0; i < n; i++) {
      var x = (Math.sin(i * 91.7) * 0.5 + 0.5) * W, y = (Math.sin(i * 37.3 + 2) * 0.5 + 0.5) * gScreen * 0.92;
      a = (0.35 + 0.65 * (Math.sin(t * 2 + i * 1.7) * 0.5 + 0.5)) * d;
      ctx.fillStyle = 'rgba(255,255,235,' + a.toFixed(2) + ')';
      var s = i % 7 === 0 ? 2.4 : 1.4; ctx.fillRect(x, y, s, s);
    }
  }

function drawNightSky() {
    if (dnIndoor()) return;
    var d = dnDark(dnU()); if (d <= 0.01) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, gScreen + 2);
    g.addColorStop(0, 'rgba(6,10,38,' + (0.97 * d).toFixed(2) + ')'); g.addColorStop(1, 'rgba(34,40,92,' + (0.85 * d).toFixed(2) + ')');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, gScreen + 2);
    dnStars(d);
    var mx = W * 0.2, my = Math.max(70, gScreen * 0.2), mg = ctx.createRadialGradient(mx, my, 8, mx, my, 120);
    mg.addColorStop(0, 'rgba(235,240,255,' + (0.6 * d).toFixed(2) + ')'); mg.addColorStop(1, 'rgba(235,240,255,0)');
    ctx.fillStyle = mg; ctx.fillRect(mx - 130, my - 130, 260, 260);
    ctx.globalAlpha = d; ctx.fillStyle = '#eef2ff'; ctx.beginPath(); ctx.arc(mx, my, 28, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(160,170,210,.55)'; ctx.beginPath(); ctx.arc(mx - 8, my - 6, 6, 0, 6.3); ctx.arc(mx + 9, my + 8, 4, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1;
  }

function drawNightOverlay() {
    if (dnIndoor()) return;
    var d = dnDark(dnU()); if (d <= 0.01) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var px = (P.x - camX) * scale, py = (gY - 60 - P.z) * scale + (typeof camY === 'number' ? -camY * scale : 0);
    var r = Math.max(260, 460 * scale), rg = ctx.createRadialGradient(px, py, 40, px, py, r);
    rg.addColorStop(0, 'rgba(14,20,64,' + (0.10 * d).toFixed(2) + ')'); rg.addColorStop(1, 'rgba(8,12,46,' + (0.52 * d).toFixed(2) + ')');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  }

function drawDnHud() {
    if (boss.on || ep.on || kk.on || flt.on || dnIndoor() || lt.st) return;
    var ph = dnPhase(), txt = { day: '☀ День', dusk: '🌆 Вечер', night: '🌙 Ночь', dawn: '🌅 Рассвет' }[ph];
    if (ph === 'night') txt += ' · ещё ' + fmtTime(dnNightLeft()); else if (ph === 'day' || ph === 'dusk') txt += ' · ночь через ' + fmtTime(dnToNight());
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var tw = ctx.measureText(txt).width + 22;
    ctx.fillStyle = 'rgba(20,35,63,.7)'; rrect(W / 2 - tw / 2, 8, tw, 22, 11); ctx.fill();
    ctx.fillStyle = ph === 'night' ? '#cfd8ff' : '#fff'; ctx.fillText(txt, W / 2, 19);
  }

function updateDn() {
    var ph = dnPhase();
    if (dnLastPh && ph !== dnLastPh && !dnIndoor()) { toast(dnNote[ph], 2500); }
    dnLastPh = ph;
  }

function pfGlow(c) {
    if (pfGl[c]) return pfGl[c];
    var cv = document.createElement('canvas'); cv.width = cv.height = 64; var g = cv.getContext('2d');
    var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, '#fff'); gr.addColorStop(0.22, c); gr.addColorStop(0.55, c); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return (pfGl[c] = cv);
  }

function pfDraw(x, y, r, c, a) { ctx.globalAlpha = Math.max(0, Math.min(1, a)); ctx.drawImage(pfGlow(c), x - r, y - r, r * 2, r * 2); }

function pfAdd(o) { if (music.particles === false && Math.random() < 0.5) return; o.a = 0; pfa.push(o); if (pfa.length > 460) pfa.splice(0, pfa.length - 460); }

function pfSpark(x, y, n, c, sp, life, w) { for (var i = 0; i < n; i++) { var an = Math.random() * 6.283, v = (0.35 + Math.random() * 0.65) * sp; pfAdd({ k: 's', x: x, y: y, vx: Math.cos(an) * v, vy: Math.sin(an) * v - sp * 0.12, g: 700, l: life * (0.6 + Math.random() * 0.6), c: c, s: w || 2.5 }); } }

function pfSparkDir(x, y, n, c, dirx, sp, life) { for (var i = 0; i < n; i++) { var an = (dirx >= 0 ? 0 : 3.14159) + (Math.random() - 0.5) * 1.1, v = (0.4 + Math.random() * 0.6) * sp; pfAdd({ k: 's', x: x, y: y, vx: Math.cos(an) * v, vy: Math.sin(an) * v, g: 500, l: life, c: c, s: 2.2 }); } }

function pfGlowP(x, y, vx, vy, s, c, life, g) { pfAdd({ k: 'g', x: x, y: y, vx: vx, vy: vy, g: g || 0, l: life, c: c, s: s }); }

function pfDust(x, y, n, spread) { for (var i = 0; i < n; i++) pfAdd({ k: 'd', x: x + (Math.random() - 0.5) * (spread || 40), y: y - Math.random() * 6, vx: (Math.random() - 0.5) * 140, vy: -20 - Math.random() * 60, g: -10, l: 0.5 + Math.random() * 0.4, s: 8 + Math.random() * 12 }); }

function pfWave(x, y, r, c, life) { pfAdd({ k: 'w', x: x, y: y, r: r, l: life || 0.5, c: c }); }

function pfRing(x, y, r, c, life) { pfAdd({ k: 'o', x: x, y: y, r: r, l: life || 0.4, c: c }); }

function pfFlash(x, y, r, c, life) { pfAdd({ k: 'f', x: x, y: y, r: r, l: life || 0.22, c: c, rot: Math.random() * 3 }); }

function pfCasing(x, y, d) { pfAdd({ k: 'c', x: x, y: y, vx: -d * (60 + Math.random() * 80), vy: -200 - Math.random() * 120, g: 1100, l: 0.9, rot: 0, vr: 14 * (Math.random() - 0.5) }); }

function pfBolt(x, y0, y1, c) {
    var pts = [], n = 9, i; for (i = 0; i <= n; i++) pts.push([x + (i === 0 || i === n ? 0 : (Math.random() - 0.5) * 70), y0 + (y1 - y0) * i / n]);
    pfAdd({ k: 'b', pts: pts, l: 0.28, c: c || '#bfe6ff' });
  }

function pfClear() { pfa.length = 0; }

function pfUpdate(dt) {
    for (var i = pfa.length - 1; i >= 0; i--) {
      var f = pfa[i]; f.a += dt;
      if (f.k === 's' || f.k === 'g' || f.k === 'd') { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += (f.g || 0) * dt; }
      else if (f.k === 'c') { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += f.g * dt; f.rot += f.vr * dt; if (f.y > gY - 2) { f.y = gY - 2; f.vy *= -0.35; f.vx *= 0.6; f.vr *= 0.5; } }
      if (f.a > f.l) pfa.splice(i, 1);
    }
    // комбо
    if (p5.cmbT > 0) { p5.cmbT -= dt; if (p5.cmbT <= 0) p5.cmb = 0; }
    if (p5.cmbP > 0) p5.cmbP -= dt * 3;
    if (p5.hurtT > 0) p5.hurtT -= dt * 1.6;
    if (!p5.on) return;
    // атмосфера арены
    var a = p5.ar, rate = dt * 26, x0 = camX, w = vw;
    if (Math.random() < rate) {
      var px = x0 + Math.random() * w;
      if (a === 0) pfGlowP(px, gY - Math.random() * 380, 10 + Math.random() * 20, -14 - Math.random() * 20, 5 + Math.random() * 6, '#e8d8ff', 2.4, 0);
      else if (a === 1) pfGlowP(px, gY - 10, -20 + Math.random() * 40, -70 - Math.random() * 70, 4 + Math.random() * 4, '#ffb36b', 2.2, 0);
      else if (a === 2) pfAdd({ k: 's', x: px, y: gY - 520, vx: -60, vy: 900, g: 0, l: 0.7, c: '#9ec8ff', s: 1.6 });
      else if (a === 3) { var gl = Math.random() < 0.5; pfGlowP(gl ? p5AX() - Math.random() * P5_HW : p5AX() + Math.random() * P5_HW, gY - 6, 0, -60 - Math.random() * 80, 4 + Math.random() * 4, gl ? '#ffd23f' : '#6bc4ff', 1.8, 0); }
      else pfGlowP(px, gY - 4, (Math.random() - 0.5) * 30, -90 - Math.random() * 120, 4 + Math.random() * 6, '#ff4a4a', 2, 0);
    }
    if (a === 2 && Math.random() < dt * 30) pfAdd({ k: 's', x: x0 + Math.random() * w, y: gY - 520, vx: -60, vy: 950, g: 0, l: 0.65, c: '#9ec8ff', s: 1.5 });
    // аура жира
    if (p5.fat && Math.random() < dt * 40) pfGlowP(P.x + (Math.random() - 0.5) * 60, gY - 20 - P.z - Math.random() * 40, (Math.random() - 0.5) * 30, -90 - Math.random() * 80, 9 + Math.random() * 7, Math.random() < 0.6 ? '#ffd23f' : '#ff9a3c', 0.7, 0);
    // пыль из-под ног при беге
    if (p5.st === 'fight' && P.z < 4 && Math.abs(P.vx) > 120 && Math.random() < dt * 22) pfDust(P.x - (P.vx > 0 ? 18 : -18), gY, 1, 10);
    // заряд атаки у боссов и врагов, мерцание в ярости
    for (var j = 0; j < p5.en.length; j++) {
      var e = p5.en[j]; if (e.dead || e.ghost) continue;
      if ((e.k === 'm' || e.k === 'bs') && e.atk && e.atk !== 'rain' && e.atk !== 'sweep' && !(e.atk === 'dash' && e.aT < 0.5) && Math.random() < dt * 55) {
        var an = Math.random() * 6.283, dd = 120 + Math.random() * 60, cc = e.k === 'bs' ? '#ff5a3c' : (e.hover ? '#6bc4ff' : '#ff6bd0'), cy = gY - (e.k === 'bs' ? 110 : 90) - (e.y || 0);
        pfAdd({ k: 'g', x: e.x + Math.cos(an) * dd, y: cy + Math.sin(an) * dd * 0.7, vx: -Math.cos(an) * dd * 3.4, vy: -Math.sin(an) * dd * 2.4, g: 0, l: 0.3, c: cc, s: 6 });
      }
      if (e.k === 'm' && e.atk === 'dash' && e.aT < 0.5 && e.aT > 0) { pfDust(e.x, gY, 2, 30); pfGlowP(e.x, gY - 60 - Math.random() * 40, -e.dx * 120, 0, 18, '#ff6bd0', 0.35, 0); }
    }
    // следы снарядов
    var s, q;
    for (q = 0; q < p5.ps.length; q++) { s = p5.ps[q]; pfGlowP(s.x, s.y + (Math.random() - 0.5) * (s.big ? 10 : 3), -s.vx * 0.05, (Math.random() - 0.5) * 40, s.big ? 15 : 7, s.big ? '#b58cff' : '#ffd23f', s.big ? 0.4 : 0.22, 0); if (s.big && Math.random() < 0.5) pfAdd({ k: 's', x: s.x, y: s.y, vx: -s.vx * 0.1 + (Math.random() - 0.5) * 120, vy: (Math.random() - 0.5) * 240, g: 0, l: 0.35, c: '#e6d2ff', s: 2 }); }
    for (q = 0; q < p5.es.length; q++) { s = p5.es[q]; s.tt = (s.tt || 0) - dt; if (s.tt <= 0) { s.tt = 0.035; pfGlowP(s.x, s.y, -s.vx * 0.04, -s.vy * 0.04, s.r * 0.9, s.col, 0.3, 0); } }
  }

function drawP5Fx() {
    if (!pfa.length) return;
    var i, f, k, op = ctx.globalCompositeOperation;
    ctx.save();
    // пыль (обычное смешивание)
    for (i = 0; i < pfa.length; i++) { f = pfa[i]; if (f.k !== 'd') continue; k = f.a / f.l; ctx.globalAlpha = 0.32 * (1 - k); ctx.fillStyle = '#d8cfe6'; ctx.beginPath(); ctx.arc(f.x, f.y, f.s * (0.6 + k * 1.4), 0, 6.3); ctx.fill(); }
    // гильзы
    for (i = 0; i < pfa.length; i++) { f = pfa[i]; if (f.k !== 'c') continue; ctx.globalAlpha = 1 - f.a / f.l; ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.fillStyle = '#e6b422'; ctx.fillRect(-4, -2, 8, 4); ctx.restore(); }
    // светящиеся
    ctx.globalCompositeOperation = 'lighter';
    for (i = 0; i < pfa.length; i++) {
      f = pfa[i]; k = f.a / f.l;
      if (f.k === 'g') pfDraw(f.x, f.y, f.s * (1 - k * 0.45), f.c, (1 - k) * 0.9);
      else if (f.k === 's') { ctx.globalAlpha = 1 - k; ctx.strokeStyle = f.c; ctx.lineWidth = f.s * (1 - k * 0.6); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x - f.vx * 0.045, f.y - f.vy * 0.045); ctx.stroke(); }
      else if (f.k === 'w') { ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = f.c; ctx.lineWidth = 10 * (1 - k) + 1; ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * (0.15 + k), f.r * (0.15 + k) * 0.22, 0, 0, 6.3); ctx.stroke(); ctx.globalAlpha = (1 - k) * 0.25; ctx.fillStyle = f.c; ctx.fill(); }
      else if (f.k === 'o') { ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = f.c; ctx.lineWidth = 6 * (1 - k) + 1; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * (0.2 + k * 0.9), 0, 6.3); ctx.stroke(); }
      else if (f.k === 'f') {
        var r = f.r * (0.5 + k * 0.7); pfDraw(f.x, f.y, r * 1.1, f.c, (1 - k) * 0.95);
        ctx.globalAlpha = (1 - k); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3 * (1 - k) + 1; ctx.beginPath();
        for (var rr = 0; rr < 4; rr++) { var an = f.rot + rr * 1.5708, len = r * (rr % 2 ? 0.8 : 1.4); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x + Math.cos(an) * len, f.y + Math.sin(an) * len); }
        ctx.stroke();
      } else if (f.k === 'b') {
        ctx.lineJoin = 'round'; ctx.globalAlpha = (1 - k) * 0.6; ctx.strokeStyle = f.c; ctx.lineWidth = 16; ctx.beginPath(); for (var bp = 0; bp < f.pts.length; bp++) bp ? ctx.lineTo(f.pts[bp][0], f.pts[bp][1]) : ctx.moveTo(f.pts[bp][0], f.pts[bp][1]); ctx.stroke();
        ctx.globalAlpha = 1 - k; ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.stroke();
      }
    }
    ctx.restore(); ctx.globalCompositeOperation = op; ctx.globalAlpha = 1;
  }

function drawP5Glows() {
    var i, s, op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter';
    for (i = 0; i < p5.ps.length; i++) { s = p5.ps[i]; var big = s.big; pfDraw(s.x, s.y, big ? 52 : 26, big ? '#b58cff' : '#ffd23f', 0.95); ctx.globalAlpha = 1; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, big ? 10 : 4.5, 0, 6.3); ctx.fill(); }
    for (i = 0; i < p5.es.length; i++) {
      s = p5.es[i]; pfDraw(s.x, s.y, s.r * 2.8, s.col, 0.85);
      ctx.globalAlpha = 0.9; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.38, 0, 6.3); ctx.fill();
      if (s.vx === 0 && s.vy > 0) { ctx.globalAlpha = 0.25 + 0.2 * Math.sin(t * 20 + i); ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, gY); ctx.stroke(); ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.ellipse(s.x, gY - 2, s.r * 1.4, s.r * 0.4, 0, 0, 6.3); ctx.stroke(); }
    }
    // ударные столбы чикен ганов
    for (i = 0; i < p5.cols.length; i++) { var cc = p5.cols[i]; ctx.globalAlpha = 0.5 + 0.4 * (1 - cc.t / 1.2); ctx.strokeStyle = '#6bc4ff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cc.x, gY - 2, 52, 14, 0, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cc.x, gY - 2, 52 * (cc.t / 1.2), 14 * (cc.t / 1.2), 0, 0, 6.3); ctx.stroke(); }
    // лучи боссов
    for (i = 0; i < p5.en.length; i++) {
      var e = p5.en[i];
      if (e.k === 'bs' && e.atk === 'sweep' && e.aT <= 0.9 && e.aT > 0) { var sx = e.face * 780, y0 = gY - 70, gr = ctx.createLinearGradient(0, y0, 0, gY); gr.addColorStop(0, 'rgba(255,200,120,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,60,40,.5)'); ctx.globalAlpha = 1; ctx.fillStyle = gr; ctx.fillRect(Math.min(e.x, e.x + sx), y0, Math.abs(sx), 70); if (Math.random() < 0.8) pfSpark(e.x + e.face * (60 + Math.random() * 720), gY - 4, 1, '#ffd23f', 260, 0.35, 2.5); }
      if (e.fl > 0 && !e.dead) pfDraw(e.x, gY - (e.k === 'gun' ? 50 : (e.r || 60)) - (e.y || 0), (e.r || 60) * 1.5, '#fff', Math.min(0.8, e.fl * 5));
      if (e.k === 'm' && !e.dead && !e.ghost) { var cy2 = gY - 90 - (e.y || 0); pfDraw(e.x, cy2, 150 + 20 * Math.sin(t * 6), e.hover ? '#6bc4ff' : '#ff6bd0', 0.16); }
      if (e.k === 'bs' && !e.dead) pfDraw(e.x, gY - 110, 200 + 24 * Math.sin(t * 5), p5.rem ? '#ff3a3a' : '#ff8a3a', 0.2);
    }
    if (p5.fat) { pfDraw(P.x, gY - 70 - P.z, 140 + 12 * Math.sin(t * 8), '#ffd23f', 0.3); }
    ctx.globalCompositeOperation = op; ctx.globalAlpha = 1;
  }

function drawP5Fx2() {
    if (!p5.on) return;
    var i, lowHp = hp < maxHp() * 0.3, hv = p5.hurtT > 0 ? p5.hurtT : 0;
    var vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
    var pulse = lowHp ? 0.3 + 0.18 * Math.sin(t * 8) : 0;
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(' + (lowHp || hv ? '120,0,10' : '8,0,20') + ',' + Math.min(0.8, 0.4 + pulse + hv * 0.25).toFixed(2) + ')');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    // скоростные линии в ярости и при жире
    var rage = p5.fat || (p5.en.length && p5.en[0].ph >= 3 && p5.stage === 1);
    if (rage && p5.st === 'fight') {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = p5.fat ? 'rgba(255,210,63,.22)' : 'rgba(255,90,200,.2)'; ctx.lineWidth = 2;
      for (i = 0; i < 16; i++) { var an = (i / 16) * 6.283 + t * 0.4, r0 = Math.min(W, H) * (0.5 + 0.15 * ((i * 7 + Math.floor(t * 14)) % 5) / 5), r1 = r0 + 60 + ((i * 13) % 5) * 22; ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(an) * r0, H / 2 + Math.sin(an) * r0 * 0.8); ctx.lineTo(W / 2 + Math.cos(an) * r1, H / 2 + Math.sin(an) * r1 * 0.8); ctx.stroke(); }
      ctx.restore();
    }
    if (hv > 0) { ctx.globalAlpha = Math.min(0.2, hv * 0.22); ctx.fillStyle = '#ff2030'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    // комбо
    if (p5.cmb >= 3 && p5.st === 'fight') {
      var lbl = p5.cmb >= 35 ? 'MOGGED!' : (p5.cmb >= 20 ? 'ЭПИК!' : (p5.cmb >= 10 ? 'ЖЕСТЬ!' : (p5.cmb >= 5 ? 'ХОРОШО!' : '')));
      var sc = 1 + Math.max(0, p5.cmbP) * 0.5, bx = W - 18, by = H * 0.3, fade = Math.min(1, p5.cmbT / 0.6);
      ctx.save(); ctx.globalAlpha = fade; ctx.translate(bx, by); ctx.scale(sc, sc); ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.font = '34px "Russo One", "Arial Black", Impact, sans-serif'; ctx.lineWidth = 8; ctx.strokeStyle = '#14233f'; ctx.strokeText('×' + p5.cmb, 0, 0); ctx.fillStyle = p5.cmb >= 20 ? '#ff6bd0' : (p5.cmb >= 10 ? '#ff9a3c' : '#ffd23f'); ctx.fillText('×' + p5.cmb, 0, 0);
      if (lbl) { ctx.font = '18px "Russo One", "Arial Black", Impact, sans-serif'; ctx.lineWidth = 5; ctx.strokeText(lbl, 0, 30); ctx.fillStyle = '#fff'; ctx.fillText(lbl, 0, 30); }
      ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillText('КОМБО', 0, -26);
      ctx.restore(); ctx.globalAlpha = 1;
    }
  }

function pfHit(x, y, big, d) {
    pfSparkDir(x, y, big ? 16 : 7, big ? '#e6d2ff' : '#fff3a0', -d, big ? 640 : 420, big ? 0.5 : 0.35);
    pfSpark(x, y, big ? 10 : 3, big ? '#b58cff' : '#ffd23f', big ? 420 : 240, 0.45, 2.5);
    pfFlash(x, y, big ? 70 : 34, big ? '#b58cff' : '#ffd23f', big ? 0.3 : 0.18);
    if (big) { pfRing(x, y, 120, '#b58cff', 0.4); p5.hs = 0.07; shk = Math.max(shk, 0.35); } else p5.hs = Math.max(p5.hs || 0, 0.025);
    p5.cmb = (p5.cmb || 0) + 1; p5.cmbT = 2.4; p5.cmbP = 1;
  }

function p5AX() { return p5.uni ? UNI_AX : (p5.farm ? 1600 : RIT_X); }

function p5Cs(id, done) { if (p5.assist || p5.rush) { p5Go('fight'); if (done) done(); return; } p5Go('cs'); csPlay(id, function () { if (p5.on && p5.st === 'cs') p5Go('fight'); if (done) done(); }); }

function p5Say(s, secs) { p5.line = s; p5.lineT = secs || 3; }

function p5Title(a, b, secs) { p5.ttl = a; p5.ttlS = b || ''; p5.ttlT = secs || 3; p5.ttlM = p5.ttlT; }

function p5Go(st) { p5.st = st; p5.t = 0; }
