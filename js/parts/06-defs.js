/* defs · 183 declarations · function drawCab() { if (!cab.on) return; var g = cabGeo(cab.ty), cs2 = Math.max(0.55, Math.min(1.6, H / 480)), vwc = W  */

function drawCab() {
    if (!cab.on) return;
    var g = cabGeo(cab.ty), cs2 = Math.max(0.55, Math.min(1.6, H / 480)), vwc = W / cs2, camC = Math.max(0, Math.min(g.len - vwc, cab.x - vwc / 2)); if (vwc >= g.len) camC = (g.len - vwc) / 2;
    var fy = (H / cs2) * 0.7, ch = 250, scn = cabScene(), i, k, type = cab.ty;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#0d121a'; ctx.fillRect(0, 0, W, H);
    ctx.setTransform(dpr * cs2, 0, 0, dpr * cs2, -camC * dpr * cs2, 0);
    var wall = type === 3 ? '#59623a' : (type === 2 ? '#31568f' : '#e3e9f2'), dark = type === 3 ? '#3f4729' : (type === 2 ? '#20406f' : '#b9c4d4'), seatC = type === 3 ? '#a3753a' : (type === 2 ? '#c2cbd9' : '#2b5aa8');
    ctx.fillStyle = wall; ctx.fillRect(0, fy - ch, g.len, ch); ctx.fillStyle = dark; ctx.fillRect(0, fy - ch, g.len, 22); ctx.fillRect(0, fy - 70, g.len, 4);
    ctx.fillStyle = '#4b5361'; ctx.fillRect(0, fy, g.len, 16); ctx.fillStyle = '#0b0f15'; ctx.fillRect(0, fy + 16, g.len, H / cs2);
    // рифлёный пол
    ctx.fillStyle = 'rgba(255,255,255,.08)'; for (i = Math.floor(camC / 40) * 40; i < camC + vwc; i += 40) ctx.fillRect(i, fy + 2, 2, 12);
    // окна
    for (i = 0; i < g.seats.length; i++) cabWin(g.seats[i] - 26, fy - 190, 54, 40, scn);
    // кабина
    cabWin(g.pilot + 50, fy - 205, Math.max(60, g.len - g.pilot - 70), 110, scn);
    ctx.fillStyle = dark; ctx.fillRect(g.pilot - 130, fy - ch, 6, ch); ctx.fillStyle = '#2b323d'; ctx.fillRect(g.pilot + 30, fy - 92, g.len - g.pilot - 30, 92);
    ctx.fillStyle = Math.sin(cab.ph * 4) > 0 ? '#3dff7a' : '#1b6b3a'; ctx.fillRect(g.pilot + 60, fy - 76, 10, 6); ctx.fillStyle = '#ffd23f'; ctx.fillRect(g.pilot + 80, fy - 76, 10, 6); ctx.fillStyle = '#ff5a5f'; ctx.fillRect(g.pilot + 100, fy - 76, 10, 6);
    cabSeatDraw(g.pilot, fy, '#1d2430'); cabSeatDraw(g.pilot - 70, fy, '#1d2430');
    ctx.fillStyle = '#fff'; ctx.font = '700 15px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('КАБИНА ПИЛОТА', g.pilot + 20, fy - ch + 36);
    if (!cab.pax) { ctx.fillStyle = '#cfe7ff'; rrect(g.pilot - 190 - 52, fy - 120, 104, 34, 6); ctx.fill(); ctx.fillStyle = '#1f3555'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillText('АВТОПОСАДКА', g.pilot - 190, fy - 103); ctx.fillStyle = '#3a4658'; ctx.fillRect(g.pilot - 192, fy - 86, 4, 86); }
    // кресла
    for (i = 0; i < g.seats.length; i++) cabSeatDraw(g.seats[i], fy, seatC);
    // груз
    if (type === 3) {
      var crates = save.cj === 2 ? (save.cjn | 0) : 0, cxs = 330;
      ctx.fillStyle = '#3a4129'; ctx.fillRect(300, fy - 8, 780, 8);
      for (k = 0; k < crates; k++) {
        var col = k % 4, row = Math.floor(k / 4), bx = cxs + col * 92, by = fy - 8 - (row + 1) * 62;
        ctx.fillStyle = '#b8864a'; ctx.fillRect(bx, by, 84, 58); ctx.fillStyle = '#8f6534'; ctx.fillRect(bx, by, 84, 6); ctx.fillRect(bx + 38, by, 8, 58); ctx.fillStyle = '#e8c27a'; ctx.fillRect(bx + 8, by + 18, 22, 28);
      }
      ctx.fillStyle = '#ffd23f'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(crates ? 'ГРУЗ: ' + crates + ' шт.' : 'ГРУЗОВОЙ ОТСЕК ПУСТ', 700, fy - ch + 52);
      // рампа
      var a = cab.hatch * Math.PI / 2, hx = 118, L = ch - 30;
      if (cab.hatch > 0.02) { var og = ctx.createLinearGradient(0, fy - ch, 0, fy); og.addColorStop(0, '#58b0ec'); og.addColorStop(1, '#cfeaf8'); ctx.fillStyle = og; ctx.fillRect(0, fy - ch + 22, hx, ch - 22); ctx.globalAlpha = 0.35 * cab.hatch; ctx.fillStyle = '#fff'; for (k = 0; k < 6; k++) ctx.fillRect(((k * 41 - cab.ph * 260 * (scn.sp > 0 ? 1 : 0)) % hx + hx) % hx, fy - ch + 60 + k * 25, 34, 3); ctx.globalAlpha = 1; }
      ctx.strokeStyle = '#7a8458'; ctx.lineWidth = 16; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(hx, fy); ctx.lineTo(hx - Math.sin(a) * L, fy - Math.cos(a) * L); ctx.stroke();
      ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(hx, fy); ctx.lineTo(hx - Math.sin(a) * L, fy - Math.cos(a) * L); ctx.stroke(); ctx.setLineDash([]);
      var bxp = g.btn; ctx.fillStyle = '#2b323d'; rrect(bxp - 22, fy - 120, 44, 70, 6); ctx.fill(); ctx.fillStyle = cab.hatchTo ? '#3dff7a' : '#ff5a5f'; ctx.beginPath(); ctx.arc(bxp, fy - 98, 9, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЛЮК', bxp, fy - 70);
    } else {
      ctx.fillStyle = '#6a7585'; ctx.fillRect(g.door - 46, fy - 176, 92, 176); ctx.fillStyle = 'rgba(160,215,245,.6)'; ctx.fillRect(g.door - 34, fy - 164, 68, 54);
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ВЫХОД', g.door, fy - 190);
    }
    // другие игроки в салоне
    var key2 = cabOwnerKey(), kk2, oo, sO, oX, phh, imm, pww;
    for (kk2 in net.others) {
      oo = net.others[kk2];
      if (!(oo.px === key2 || kk2 === key2)) continue;
      if (kk2 === key2 && !oo.cb) { sO = true; oX = g.pilot; }
      else { sO = oo.cs >= 0; oX = sO ? (oo.cs === 100 ? g.pilot - 70 : g.seats[oo.cs]) : oo.cx; }
      if (oX === undefined) continue;
      imm = skinImg(oo.s); if (!imm || !imm.naturalWidth) continue;
      phh = PLAYER_H * (sO ? 0.95 : 1.05); pww = phh * imm.naturalWidth / imm.naturalHeight;
      ctx.save(); ctx.translate(oX, fy - (sO ? 6 : 0)); ctx.save(); ctx.scale(oo.cf > 0 ? -1 : 1, 1); ctx.globalAlpha = 0.92; ctx.drawImage(imm, -pww / 2, -phh, pww, phh); drawAcc(ctx, oo.a, pww, phh); ctx.restore();
      ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 3; ctx.strokeStyle = '#14233f';
      var nm2 = (kk2 === key2 ? '✈ ' : (oo.cs === 100 ? '🎮 ' : '')) + mat(oo.n || 'Петух'); ctx.strokeText(nm2, 0, -phh - 8); ctx.fillStyle = '#fff'; ctx.fillText(nm2, 0, -phh - 8);
      ctx.restore();
    }
    // игрок
    if (ready(img.rooster)) {
      var seated = cab.seat >= 0, ph2 = PLAYER_H * (seated ? 0.95 : 1.05), im = skinImg(mySkin), pw = ph2 * im.naturalWidth / im.naturalHeight, my = fy - (seated ? 6 : 0) + Math.sin(cab.ph * 2) * 0.6;
      ctx.save(); ctx.translate(cab.x, my); ctx.scale(cab.face > 0 ? -1 : 1, 1); ctx.drawImage(im, -pw / 2, -ph2, pw, ph2); drawAcc(ctx, myAcc, pw, ph2); ctx.restore();
    }
    // ветер при открытом люке
    if (type === 3 && cab.hatch > 0.5 && scn.alt > 6) { ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2; for (k = 0; k < 7; k++) { var wy = fy - ch + 40 + k * 28, wx = ((cab.ph * 420 + k * 61) % 120); ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 40, wy); ctx.stroke(); } }
    ctx.restore();
    // подсказки поверх
    ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var hint = { door: type === 3 ? (cab.hatch > 0.95 ? 'E: выйти (в полёте: прыжок с парашютом)' : 'Люк закрыт: нажми кнопку у рампы') : 'E: выйти наружу (только на земле)', hatch: 'E: ' + (cab.hatchTo ? 'закрыть' : 'открыть') + ' грузовой люк', pilot: 'E: сесть за штурвал', land: 'E: автопосадка', cop: 'E: сесть на место второго пилота', stand: 'E: встать с кресла' }[cab.near] || (cab.near.indexOf('seat') === 0 ? 'E: сесть в кресло' : (cab.pax ? 'E: меню пассажира' : ''));
    ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(14,26,48,.78)'; rrect(W / 2 - 190, 104, 380, 34, 10); ctx.fill(); ctx.fillStyle = '#fff';
    ctx.fillText(g.name + ' · ' + (scn.alt > 3 ? 'в воздухе' : 'на земле') + (!cab.pax && av.copOn ? ' · ведёт второй пилот' : (av.ap && !cab.pax ? ' · автопилот' : '')), W / 2, 121);
    if (cab.pax && cab.seat === 100) {
      var ow3 = net.others[pax.id];
      if (ow3) {
        ctx.fillStyle = 'rgba(14,26,48,.82)'; rrect(W / 2 - 190, 144, 380, 54, 10); ctx.fill(); ctx.fillStyle = ow3.cb ? '#9dffb8' : '#cfe7ff';
        ctx.fillText(ow3.cb ? 'ТЫ ВЕДЁШЬ БОРТ · ←→ курс · ↑↓ высота' : 'Второй пилот · капитан за штурвалом', W / 2, 160);
        ctx.fillStyle = '#fff'; ctx.fillText('Скорость ' + avKmh(ow3.avs) + ' км/ч · высота ' + Math.round(ow3.ah) + ' · топливо ' + ow3.afu + '%', W / 2, 182);
      }
    }
    if (hint) { ctx.fillStyle = 'rgba(14,26,48,.82)'; rrect(W / 2 - 200, H - (touch ? 190 : 80), 400, 34, 10); ctx.fill(); ctx.fillStyle = '#ffe9a8'; ctx.fillText(hint, W / 2, H - (touch ? 173 : 63)); }
    ctx.restore();
  }

function drawAvCraftAt(sel, x, h, dir, flying, lp) {
    var T = AV[sel]; if (!T) return;
    var pv = (av.on && sel === save.avSel && Math.abs(x - P.x) < 1) ? (av.pitch || 0) : 0;
    setCam(1);
    if (sel === 2) {
      ctx.save(); ctx.translate(x, 0); ctx.scale(dir, 1);
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(0, gY + 2, 120 - Math.min(60, h * 0.25), 8, 0, 0, 6.3); ctx.fill();
      drawHeli(0, gY - h - Math.round(31 * T.s * 1.3), T.s, t * (flying || h > 0 ? 1 : 0.3), lp || 0, true, T.col);
      ctx.restore();
    } else if (sel === 3) {
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 2, 150 - Math.min(50, h * 0.2), 8, 0, 0, 6.3); ctx.fill();
      if (h > 40) { var cgr = ctx.createLinearGradient(x - dir * 150, 0, x - dir * 560, 0); cgr.addColorStop(0, 'rgba(255,255,255,.5)'); cgr.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = cgr; var cx1 = Math.min(x - dir * 150, x - dir * 560); ctx.fillRect(cx1, gY - h - 50, 410, 4); ctx.fillRect(cx1, gY - h - 30, 410, 4); }
      var own = av.on && sel === save.avSel && Math.abs(x - P.x) < 1; if (own) { drGear = av.gp == null ? 1 : av.gp; drRamp = av.rampP || 0; drEng = av.eng == null ? 15 : av.eng; }
      if (pv) { var pvy = gY - Math.min(30, h * 0.6); ctx.save(); ctx.translate(x, pvy); ctx.rotate(-dir * pv * 2); ctx.translate(-x, -pvy); }
      drawCargoCraft(x, gY - 33 * T.s - 2 - h, dir, T.s, h < 14);
      if (pv) ctx.restore();
      drGear = -1; drRamp = 0; drEng = 15;
    } else {
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 2, 90 * T.s * 1.4 - Math.min(30, h * 0.15), 7, 0, 0, 6.3); ctx.fill();
      if (av.on && sel === save.avSel && Math.abs(x - P.x) < 1) drGear = av.gp == null ? 1 : av.gp;
      drawAirliner(x, gY - 2 - h, dir, T.s, T.col, pv ? -pv * 1.7 : 0, h); drGear = -1;
    }
  }

function drawAvCraft() {
    drawTanker(); drawChute(); avHaze();
    if (!avT()) return;
    var x, h, dir;
    if (av.on) { x = P.x; h = av.h; dir = av.dir; } else { if (loc.i !== save.avLoc) return; x = save.avX; h = 0; dir = 1; }
    if (x < camX - 400 || x > camX + vw + 400) return;
    if (!av.on && avBroken()) {
      ctx.save(); ctx.translate(x, gY); ctx.rotate(-0.06); ctx.translate(-x, -gY); drawAvCraftAt(save.avSel, x, 0, dir, false, 0); ctx.restore();
      ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(x - 70, gY - 24, 140, 24);
      for (var si = 0; si < 6; si++) { var sa = (t * 0.6 + si * 0.5) % 3; ctx.fillStyle = 'rgba(60,60,66,' + Math.max(0, 0.5 - sa * 0.16).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x - 10 + Math.sin(si + t) * 12 + sa * 16, gY - 60 - sa * 70, 12 + sa * 6, 0, 6.3); ctx.fill(); }
      ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText('РАЗБИТ', x, gY - 150); ctx.fillStyle = '#ff9a9a'; ctx.fillText('РАЗБИТ', x, gY - 150);
      return;
    }
    drawAvCraftAt(save.avSel, x, h, dir, av.on, av.on ? av.v / 380 : 0);
  }

function avTank() { return !!(save.avOwn & 8) && save.avSel === 3; }

function avHigh2() { return false; }

function tankBuy() {
    if (!avOwns(3)) { sfx('no'); toast('Сначала купи грузовой самолёт.', 2500); return; }
    if (save.avOwn & 8) return;
    if (save.coins < TANK_PRICE) { sfx('no'); toast('Не хватает коинов: система дозаправки стоит ' + TANK_PRICE + '.', 3000); return; }
    save.coins -= TANK_PRICE; save.avOwn |= 8; persist(); hud(); sfx('rare');
    toast('Куплена система дозаправки в воздухе. В полёте нажми E и вызови заправщик.', 5000);
  }

function tkCall() {
    var T = avT();
    if (!av.on || !T || !avTank() || tnk.on) return;
    if (save.avFuel <= 0) { sfx('no'); toast('Заправщик нужно вызывать, пока в баке есть топливо.', 3000); return; }
    if (save.coins < TANK_FEE) { sfx('no'); toast('Вызов заправщика стоит ' + TANK_FEE + ' коинов.', 3000); return; }
    save.coins -= TANK_FEE; hud();
    tnk.on = true; tnk.dir = av.dir; tnk.x = P.x + tnk.dir * 560; tnk.h = Math.min(avMaxH() + 40, Math.max(av.h + 70, 170));
    tnk.v = tnk.dir * T.sp * 0.85; tnk.t = 0; tnk.st = 'fly'; tnk.ext = 0; tnk.got = 0; tnk.cost = 0; tnk.pay = 0; tnk.lt = 0; tnk.con = false; tnk.loc = loc.i;
    sfx('pick'); toast('Заправщик на подходе! Подлети носом к корзине на конце шланга: ←→ меняют скорость относительно него, прыжок: выше.', 7000);
  }

function tkLeave(msg) {
    if (!tnk.on || tnk.st === 'done') return;
    tnk.st = 'done'; tnk.lt = 0; tnk.con = false;
    if (msg !== false) toast(tnk.got > 0.5 ? 'Заправщик уходит. Получено ' + Math.round(tnk.got) + ' л за ' + Math.round(tnk.cost) + '.' : 'Заправщик уходит.', 4000);
  }

function tkProbe() { var T = avT(); return { x: P.x + av.dir * 100 * T.s, h: av.h + 33 * T.s + 2 }; }

function tkDrogue() { return { x: tnk.x - tnk.dir * (150 + 200 * tnk.ext), h: tnk.h + 35 }; }

function updateTank(dt) {
    var T = avT();
    if (!tnk.on) return;
    if (!T || !av.on || tnk.loc !== loc.i) { tnk.on = false; return; }
    tnk.t += dt; tnk.x += (tnk.v + (tnk.st === 'done' ? tnk.dir * 260 * tnk.lt : 0)) * dt;
    if (tnk.st === 'done') { tnk.lt += dt; tnk.ext = Math.max(0, tnk.ext - dt * 0.8); if (tnk.lt > 6) tnk.on = false; return; }
    tnk.ext = Math.min(1, tnk.ext + dt * 0.5);
    var p = tkProbe(), d = tkDrogue(), con = tnk.ext > 0.95 && Math.abs(d.x - p.x) < 45 && Math.abs(d.h - p.h) < 30;
    if (con && !tnk.con) { sfx('pick'); }
    tnk.con = con;
    if (con) {
      var l = Math.min(30 * dt, T.cap - save.avFuel);
      if (l <= 0.001) { tkLeave(); toast('Бак полный.', 2500); return; }
      var c = l * avPrice() * 1.5;
      tnk.pay += c;
      var w = Math.floor(tnk.pay);
      if (w > save.coins) { tkLeave(); toast('Не хватает коинов на заправку.', 3000); return; }
      save.coins -= w; tnk.pay -= w; save.avFuel += l; tnk.got += l; tnk.cost += c;
      tnk.hT += dt; if (tnk.hT > 0.3) { tnk.hT = 0; hud(); }
    }
    if (tnk.t > 80 || Math.abs(tnk.x - P.x) > 1400) tkLeave();
  }

function drawTanker() {
    if (!tnk.on) return;
    var dr = tnk.dir, T = avT(); setCam(1);
    drawAirliner(tnk.x, gY - 2 - tnk.h, dr, 1.1, '#d98a1e', 0, tnk.h);
    var ax = tnk.x - dr * 135, ay = gY - tnk.h - 44, d = tkDrogue(), ex = d.x, ey = gY - d.h;
    ctx.strokeStyle = tnk.con ? '#9dffb0' : '#2c333d'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo((ax + ex) / 2, Math.max(ay, ey) + 14 + (1 - tnk.ext) * 30, ex, ey); ctx.stroke();
    ctx.fillStyle = '#2c333d'; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - dr * 26, ey - 17); ctx.lineTo(ex - dr * 26, ey + 17); ctx.closePath(); ctx.fill();
    ctx.fillStyle = tnk.con ? '#3dff7a' : '#ffd23f'; ctx.fillRect(ex - dr * 28 - (dr > 0 ? 3 : 0), ey - 17, 3, 34);
    if (tnk.con) { ctx.fillStyle = 'rgba(80,255,140,.25)'; ctx.beginPath(); ctx.arc(ex, ey, 34, 0, 6.3); ctx.fill(); }
    if (tnk.st === 'fly' && av.on && T) {
      var msg = tnk.con ? 'ЗАПРАВКА +' + Math.round(tnk.got) + ' л' : (tnk.ext < 0.95 ? 'Заправщик выпускает шланг…' : 'Подлети носом к корзине');
      ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 4; ctx.strokeStyle = '#14233f';
      var ty = gY - av.h - 140 * T.s - 20; ctx.strokeText(msg, P.x, ty); ctx.fillStyle = tnk.con ? '#9dffb0' : '#fff'; ctx.fillText(msg, P.x, ty);
    }
  }

function avToSky() {
    if (!av.on || save.avFuel < SKY_FUEL) { sfx('no'); toast('Для подъёма в небо нужно ' + SKY_FUEL + ' л топлива.', 3000); return; }
    if (lt.st || flt.on) return;
    save.avFuel -= SKY_FUEL; skyS.from = loc.i; tnk.on = false; persist();
    lt.st = 'out'; lt.t = 0; lt.dest = SKY_ID; lt.side = 'left'; lt.atX = 800; sfx('jump');
  }

function avFromSky() {
    if (lt.st || flt.on) return;
    var d = [3, 4, 5, 7].indexOf(skyS.from) >= 0 ? skyS.from : 3, ax = { 3: 1000, 4: 1300, 5: 2400, 7: 1200 }[d];
    tnk.on = false; av.hSet = avMaxH() * 0.93; lt.st = 'out'; lt.t = 0; lt.dest = d; lt.side = 'left'; lt.atX = ax; sfx('jump');
  }

function avAirMenu() {
    var ch = [], txt = 'Ты в воздухе. Топливо ' + Math.ceil(save.avFuel) + '/' + avCap() + '.';
    if ((loc.i === 3 || loc.i === 4) && avHigh()) { var to = loc.i === 3 ? 4 : 3; ch.push({ t: 'Лететь: ' + (to === 4 ? 'Мальдивы' : 'Аэропорт') + ' (' + AV_TRIP_L + ' л)', fn: function () { dlgClose(); if (save.avFuel < AV_TRIP_L) { sfx('no'); toast('Не хватит топлива на рейс.', 3000); } else avTrip(to); } }); }
    if (loc.i !== SKY_ID && avHigh2()) ch.push({ t: 'Подняться в небо (' + SKY_FUEL + ' л)', fn: function () { dlgClose(); avToSky(); } });
    if (loc.i === SKY_ID) ch.push({ t: 'Спуститься: ' + LOCS[[3, 4, 5, 7].indexOf(skyS.from) >= 0 ? skyS.from : 3].name, fn: function () { dlgClose(); avFromSky(); } });
    if (avTank()) { if (!tnk.on) ch.push({ t: 'Вызвать заправщик (' + TANK_FEE + ' коинов, топливо ×1.5 цены)', fn: function () { dlgClose(); tkCall(); } }); else if (tnk.st === 'fly') ch.push({ t: 'Отпустить заправщик', fn: function () { dlgClose(); tkLeave(); } }); }
    if (save.avSel === 3 && av.h > 40) ch.push({ t: 'Прыгнуть с парашютом' + (avAuto() ? ' (автопилот посадит борт)' : ' (БЕЗ автопилота борт разобьётся!)'), fn: function () { dlgClose(); avJump(); } });
    if (avAuto() && !tnk.on) ch.push({ t: 'Пройти в салон (автопилот ведёт борт)', fn: function () { dlgClose(); cabOpen(false, save.avSel); } });
    ch.push({ t: 'Остаться в полёте', out: true });
    dlgShow('Борт', null, txt, ch);
  }

function avAuto() { return !!(save.avOwn & 16); }

function avBroken() { return !!(save.avOwn & 32); }

function autoBuy() {
    if (!(save.avOwn & 7)) { sfx('no'); toast('Сначала купи самолёт, вертолёт или грузовой самолёт.', 2500); return; }
    if (save.avOwn & 16) return;
    if (save.coins < AUTO_PRICE) { sfx('no'); toast('Не хватает коинов: автопилот стоит ' + AUTO_PRICE + '.', 3000); return; }
    save.coins -= AUTO_PRICE; save.avOwn |= 16; persist(); hud(); sfx('rare');
    toast('Автопилот куплен и установлен на грузовой самолёт. Если выпрыгнешь с парашютом, борт сядет сам.', 5500);
  }

function avRepair() {
    if (!avBroken()) return;
    if (save.coins < REPAIR_PRICE) { sfx('no'); toast('Не хватает коинов: починка стоит ' + REPAIR_PRICE + '.', 3000); return; }
    save.coins -= REPAIR_PRICE; save.avOwn &= ~32; persist(); hud(); sfx('sell'); toast('Борт починен.', 3000);
  }

function avCrash(why, x) {
    var ground = loc.i !== 5 && loc.i !== SKY_ID;
    if (x == null) x = P.x;
    if (av.on) { av.on = false; av.v = 0; av.vy = 0; av.h = 0; }
    tnk.on = false; save.avOwn |= 32;
    if (save.cj === 2) { save.cj = 0; save.cjn = 0; save.cjp = 0; setTimeout(function () { toast('Груз потерян при аварии. Заказ провален.', 5000); }, 900); }
    if (ground) avPark(loc.i, Math.max(60, Math.min(WORLD_W - 60, x))); else avPark(3, AV_PARK);
    persist();
    if (ground) { burst(x, gY - 40, 28, '#ff8a3c', 520, 1); burst(x, gY - 40, 16, '#555', 300, 1.2); }
    sfx('boom'); shk = Math.max(shk, 1);
    if (why === 'hard') { hurt(20); toast('Жёсткая посадка: борт разбит. Почини его (' + REPAIR_PRICE + ') у самолёта или в ангаре.', 6000); }
    else toast(ground ? 'Пилота нет, борт разбился! Почини его (' + REPAIR_PRICE + ') у самолёта или в ангаре.' : 'Пилота нет, борт разбился! Его отбуксировали в ангар: починка ' + REPAIR_PRICE + '.', 6500);
  }

function avJump() {
    if (!av.on || save.avSel !== 3 || av.h < 40 || lt.st || flt.on) { sfx('no'); toast('Прыгать можно из грузового самолёта, набрав высоту.', 3000); return; }
    var h = av.h, x = P.x, L = loc.i, ground = L !== 5 && L !== SKY_ID;
    av.on = false; av.v = 0; av.vy = 0; av.h = 0; tnk.on = false;
    chute.on = true; chute.h = h; P.z = h; P.vz = 0; P.vx = 0; sfx('jump');
    if (avAuto()) {
      if (ground) avPark(L, Math.max(60, Math.min(WORLD_W - 60, x))); else avPark(4, 1000);
      toast('Парашют раскрыт! Автопилот посадит борт' + (ground ? '.' : ' на Мальдивах.'), 5000);
    } else { toast('Парашют раскрыт! Без автопилота борт разобьётся.', 4000); avCrash('jump', x); }
  }

function drawChute() {
    if (!chute.on) return;
    setCam(1);
    var cy = gY - P.z - PLAYER_H - 70, hy = gY - P.z - PLAYER_H + 6;
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(P.x - 52, cy); ctx.lineTo(P.x - 6, hy); ctx.moveTo(P.x + 52, cy); ctx.lineTo(P.x + 6, hy); ctx.moveTo(P.x, cy - 20); ctx.lineTo(P.x, hy); ctx.stroke();
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(P.x, cy, 54, Math.PI, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(P.x - 18, cy); ctx.quadraticCurveTo(P.x - 12, cy - 50, P.x, cy - 53); ctx.quadraticCurveTo(P.x + 12, cy - 50, P.x + 18, cy); ctx.closePath(); ctx.fill();
  }

function updateChute(dt) {
    chute.h -= (chute.h > 40 ? 120 : 85) * dt; P.vz = 0; P.z = Math.max(0, chute.h);
    P.vx = Math.max(-150, Math.min(150, P.vx));
    if (loc.i === SKY_ID && !lt.st && chute.h < 220) {
      var d = [3, 4, 5, 7].indexOf(skyS.from) >= 0 ? skyS.from : 3;
      chute.h = 380; lt.st = 'out'; lt.t = 0; lt.dest = d; lt.side = 'left'; lt.atX = { 3: 1000, 4: 1300, 5: 2400, 7: 1200 }[d];
    }
    if (chute.h <= 0) {
      chute.on = false; P.z = 0; P.vz = 0;
      if (loc.i === 5) { toast('Приводнился! Тебя подобрали спасатели.', 4000); startFlight(4, MALD_ARRIVE_X, { rescue: true }); }
      else { sfx('pick'); toast('Приземлился.', 1800); }
    }
  }

function paxBoard(k) {
    pax.on = true; pax.id = k; pax.ah = 0; pax.ty = 0; sfx('jump'); lastHud = ''; hud();
    cabOpen(true, (net.others[k] && net.others[k].av) || 1);
  }

function spotPax() {
    if (av.on || pax.on || chute.on || !net.room) return null;
    var found = null;
    Object.keys(net.others).forEach(function (k) {
      var o = net.others[k];
      if (!found && o.av && (o.l | 0) === loc.i && !o.b && o.ah < 70 && Math.abs(P.x - o.rx) < 170) found = { btn: 'Сесть', msg: (paxCount(k) >= cabGeo(o.av).n + 1 ? 'Мест нет · ' : '') + 'Нажми E: сесть пассажиром к игроку ' + (o.n || 'Петух') + ' (' + AV[o.av].n.toLowerCase() + ')', fn: (paxCount(k) >= cabGeo(o.av).n + 1) ? function () { sfx('no'); toast('В борту нет свободных мест.', 2500); } : function () { paxBoard(k); }, x: o.rx };
    });
    return found;
  }

function paxEnd(o) {
    var was = pax.ah; pax.on = false; P.vx = 0;
    if (o) P.x = Math.max(28, Math.min(WORLD_W - 28, o.rx));
    if (was > 40) { chute.on = true; chute.h = was; P.z = was; toast('Борт ушёл вперёд. Раскрылся парашют!', 4000); }
    else if (loc.i === 5 || loc.i === SKY_ID) { toast('Борт улетел, тебя подобрали спасатели.', 4000); startFlight(4, MALD_ARRIVE_X, { rescue: true }); }
  }

function updatePax(dt) {
    if (!pax.on) return;
    var o = net.others[pax.id];
    if (!o || !o.av) { paxEnd(o); return; }
    pax.ah = o.ah; pax.ty = o.av; P.vx = 0; P.z = 0; P.vz = 0; P.face = o.f > 0 ? 1 : -1;
    if ((o.l | 0) !== loc.i) { if (!lt.st && !flt.on) { lt.st = 'out'; lt.t = 0; lt.dest = o.l | 0; lt.side = 'left'; lt.atX = Math.round(o.x); } return; }
    P.x = Math.max(28, Math.min(WORLD_W - 28, o.rx));
  }

function paxExit() { var o = net.others[pax.id]; pax.on = false; P.z = 0; if (o) P.x = Math.max(28, Math.min(WORLD_W - 28, o.rx - (o.f > 0 ? 1 : -1) * 150)); sfx('pick'); }

function paxJump() { pax.on = false; chute.on = true; chute.h = Math.max(30, pax.ah); P.z = chute.h; P.vz = 0; sfx('jump'); toast('Прыжок с парашютом!', 3000); }

function paxAct() {
    var ch = [], ty = pax.ty;
    if (pax.ah < 12) ch.push({ t: 'Выйти из борта', fn: function () { dlgClose(); paxExit(); } });
    if (ty === 3 && pax.ah > 30) ch.push({ t: 'Прыгнуть с парашютом', fn: function () { dlgClose(); paxJump(); } });
    ch.push({ t: 'Остаться', out: true });
    dlgShow('Пассажир', null, ty === 3 ? 'Ты в грузовом самолёте. Выйти можно после посадки, а в воздухе есть парашют.' : 'Ты пассажир. Выйти можно после посадки.', ch);
  }

function drawAvAirport(x0, x1) {
    var X = avPumpX();
    if (X > 0 && X > x0 - 80 && X < x1 + 80) {
      ctx.fillStyle = '#c4161c'; rrect(X - 18, gY - 70, 36, 70, 5); ctx.fill(); ctx.fillStyle = '#f2f5f9'; ctx.fillRect(X - 12, gY - 62, 24, 20);
      ctx.fillStyle = '#14233f'; ctx.fillRect(X - 9, gY - 58, 18, 5); ctx.fillStyle = '#333'; ctx.fillRect(X + 18, gY - 52, 14, 4); ctx.fillRect(X + 30, gY - 52, 4, 30);
      ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('АВИАТОПЛИВО', X, gY - 84); ctx.fillText(avPrice() + ' за л', X, gY - 100);
    }
    drawCargoWork(x0, x1);
    X = AV_HANGAR;
    if (loc.i === 3 && X > x0 - 260 && X < x1 + 260) {
      ctx.fillStyle = '#7d8896'; ctx.beginPath(); ctx.moveTo(X - 200, gY); ctx.lineTo(X - 200, gY - 130); ctx.quadraticCurveTo(X, gY - 230, X + 200, gY - 130); ctx.lineTo(X + 200, gY); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#5a6573'; ctx.fillRect(X - 200, gY - 8, 400, 8); ctx.fillStyle = '#1b222c'; ctx.fillRect(X - 110, gY - 100, 220, 100);
      ctx.fillStyle = '#ffd23f'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('АНГАР', X, gY - 160);
    }
  }

function rb() { return save.mx.rb | 0; }

function rbFlags() { return bitCount(rb() & 31); }

function rbSrv() { return bitCount((rb() >> 5) & 31); }

function rbYt() { return bitCount((rb() >> 10) & 7); }

function rbReady() { return rbFlags() >= 5 && rbSrv() >= 3 && rbYt() >= 3; }

function tintImg(im, col, a, key) {
    if (!ready(im)) return im; var c = tintC[key];
    if (!c || c.w !== im.naturalWidth) { var cv = document.createElement('canvas'); cv.width = im.naturalWidth; cv.height = im.naturalHeight; var cx = cv.getContext('2d'); cx.drawImage(im, 0, 0); cx.globalCompositeOperation = 'source-atop'; cx.globalAlpha = a; cx.fillStyle = col; cx.fillRect(0, 0, cv.width, cv.height); c = { cv: cv, w: im.naturalWidth }; tintC[key] = c; }
    return c.cv;
  }

function wSpr(im, x, h, face, a) {
    if (!im || !(im.naturalWidth || im.width)) return; var iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, w = h * iw / ih;
    ctx.save(); ctx.translate(x, gY); if (face > 0) ctx.scale(-1, 1); if (a != null) ctx.globalAlpha = a; ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore();
  }

function flagDraw(x, h, placed) {
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(x - 3, gY - h, 6, h); ctx.fillStyle = '#6a5a3a'; ctx.fillRect(x - 12, gY - 8, 24, 8);
    ctx.fillStyle = '#c9b458'; ctx.beginPath(); ctx.arc(x, gY - h, 5, 0, 6.3); ctx.fill();
    if (!placed) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - 3, gY - h + 12, 6, 24); return; }
    var i, wv = function (k) { return Math.sin(t * 4 + k * 0.7 + x * 0.01) * 4; };
    ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.moveTo(x + 3, gY - h + 6 + wv(0));
    for (i = 1; i <= 10; i++) ctx.lineTo(x + 3 + i * 8, gY - h + 6 + wv(i));
    for (i = 10; i >= 0; i--) ctx.lineTo(x + 3 + i * 8, gY - h + 54 + wv(i));
    ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#8a8a96'; ctx.lineWidth = 1.5; ctx.stroke();
    var cx = x + 43, cy = gY - h + 30 + wv(5);
    ctx.fillStyle = '#f4f1e6'; ctx.beginPath(); ctx.arc(cx, cy - 3, 9, 0, 6.3); ctx.fill(); ctx.fillRect(cx - 5, cy + 4, 10, 6);
    ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.arc(cx - 3.5, cy - 4, 2.4, 0, 6.3); ctx.arc(cx + 3.5, cy - 4, 2.4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#f4f1e6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 16, cy + 12); ctx.lineTo(cx + 16, cy - 14); ctx.moveTo(cx + 16, cy + 12); ctx.lineTo(cx - 16, cy - 14); ctx.stroke();
  }

function labGlass(wx, wy, ww, wh, k, night) {
    var sg = ctx.createLinearGradient(0, wy, 0, wy + wh); sg.addColorStop(0, night ? '#080f26' : '#6fb6ee'); sg.addColorStop(1, night ? '#35508a' : '#d8eefb'); ctx.fillStyle = sg; ctx.fillRect(wx, wy, ww, wh);
    for (var q = 0; q < Math.floor(ww / 34); q++) { var bh = 30 + ((q * 37 + k * 13) % 80); ctx.fillStyle = night ? '#0a1226' : '#7f98b8'; ctx.fillRect(wx + q * 34, wy + wh - bh, 30, bh); if (night) { ctx.fillStyle = 'rgba(255,226,140,.65)'; for (var r = 0; r < 3; r++) if ((q + r + k) % 3) ctx.fillRect(wx + q * 34 + 6 + (r % 2) * 12, wy + wh - bh + 8 + r * 14, 6, 6); } }
    ctx.strokeStyle = '#8fa3bf'; ctx.lineWidth = 8; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke();
  }

function labDoor(x, label, col, x0, x1) {
    if (x < x0 - 120 || x > x1 + 120) return;
    ctx.fillStyle = col; ctx.fillRect(x - 54, gY - 196, 108, 196); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(x - 44, gY - 186, 88, 70);
    ctx.fillStyle = '#fff'; rrect(x - 62, gY - 244, 124, 32, 8); ctx.fill(); ctx.fillStyle = '#26456f'; ctx.font = '700 14px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x, gY - 228);
  }

function drawNlabBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#eaf3fb'); g.addColorStop(1, '#c6d6e6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[NLAB].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#e0eaf4'; ctx.fillRect(a, gY - 430, b - a, 430); ctx.fillStyle = '#c1d1e1'; ctx.fillRect(a, gY - 120, b - a, 120);
    ctx.fillStyle = '#adc0d4'; ctx.fillRect(a, gY - 124, b - a, 5);
    decStep(x0, x1, 440, 230, function (x, k) { labGlass(x - 150, gY - 360, 300, 200, k, true); });
    for (i = Math.floor(a / 220) * 220; i < b; i += 220) { ctx.fillStyle = '#fff'; ctx.fillRect(i + 40, gY - 428, 140, 6); ctx.fillStyle = 'rgba(255,255,235,.5)'; ctx.fillRect(i + 40, gY - 422, 140, 40); }
    ctx.fillStyle = '#9fb0c4'; ctx.fillRect(a, gY - 2, b - a, H / scale); ctx.fillStyle = '#d4e0ec'; ctx.fillRect(a, gY - 2, b - a, 6);
    ctx.fillStyle = 'rgba(255,255,255,.2)'; for (i = Math.floor(a / 140) * 140; i < b; i += 140) ctx.fillRect(i, gY + 6, 2, H / scale);
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(a, gY + 10, b - a, 8);
    labDoor(NL_DOOR, 'ВЫХОД', '#7d93a8', x0, x1);
    // верстак профессора: мониторы с графиками
    var X = NL_NPC;
    if (X > x0 - 300 && X < x1 + 300) {
      ctx.fillStyle = '#56667a'; ctx.fillRect(X - 150, gY - 62, 300, 62); ctx.fillStyle = '#7d8ea3'; ctx.fillRect(X - 158, gY - 70, 316, 10);
      for (i = 0; i < 3; i++) { var mx = X - 120 + i * 96; ctx.fillStyle = '#10243f'; ctx.fillRect(mx, gY - 150, 80, 56); ctx.strokeStyle = '#5b7aa6'; ctx.lineWidth = 3; ctx.strokeRect(mx, gY - 150, 80, 56); ctx.strokeStyle = ['#7dff9c', '#6bc4ff', '#ffd23f'][i]; ctx.lineWidth = 2; ctx.beginPath(); for (var q = 0; q < 8; q++) ctx.lineTo(mx + 6 + q * 9, gY - 122 + Math.sin(t * 2 + q + i) * 14); ctx.stroke(); }
      if ((save.mx.c2p | 0) === 3) { mogAllyDraw(X - 230, -1, 170); }
      if (primeAlly()) { primeDraw(X - 110, -1, 170, 1); csGlow(X - 110, gY - 90, 120, '255,70,60', 0.15); }
      else if (ready(img.mell) && !(save.mx.c2p === 2)) { ctx.drawImage(img.mell, 0, 0, 224, 99, X - 150, gY - 170, 120, 53); }
      sciDraw(X + 190, -1, 1, 0, 0);
    }
    // доска вселенных
    var B = NL_BOARD;
    if (B > x0 - 200 && B < x1 + 200) {
      ctx.fillStyle = '#10243f'; ctx.fillRect(B - 150, gY - 310, 300, 180); ctx.strokeStyle = '#5b7aa6'; ctx.lineWidth = 5; ctx.strokeRect(B - 150, gY - 310, 300, 180);
      ctx.font = '700 13px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffd23f'; ctx.fillText('МУЛЬТИВСЕЛЕННАЯ', B - 134, gY - 292);
      for (i = 0; i < 5; i++) { var dead = ((save.mx.c2u | 0) >> i) & 1; ctx.fillStyle = dead ? '#ff7a7a' : '#7dff9c'; ctx.fillText((dead ? '✕ ' : '● ') + C2U[i].n.replace('Вселенная ', ''), B - 134, gY - 266 + i * 24); }
    }
    drawGunStation(x0, x1);
    // аппарат возврата Кокича: арка у правого края
    var R = 2750;
    if (R > x0 - 220 && R < x1 + 220) {
      ctx.fillStyle = '#4a5a6e'; ctx.fillRect(R - 120, gY - 20, 240, 20); ctx.strokeStyle = '#8fa3bf'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(R, gY - 130, 110, 0, 6.3); ctx.stroke();
      csGlow(R, gY - 130, 100 + 6 * Math.sin(t * 3), '140,220,255', 0.25);
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('АППАРАТ ВОЗВРАТА', R, gY - 270);
    }
  }

function drawBlabBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a0c0a'); g.addColorStop(0.5, '#3a1a12'); g.addColorStop(1, '#241410'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[BLAB].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#3c2c28'; ctx.fillRect(a, gY - 430, b - a, 430); ctx.fillStyle = '#2a1e1c'; ctx.fillRect(a, gY - 120, b - a, 120);
    decStep(x0, x1, 440, 230, function (x, k) {
      var wx = x - 150, wy = gY - 360, ww = 300, wh = 200;
      ctx.fillStyle = '#2a0f0a'; ctx.fillRect(wx, wy, ww, wh); ctx.fillStyle = 'rgba(255,120,40,' + (0.35 + 0.15 * Math.sin(t * 3 + k)).toFixed(2) + ')'; ctx.fillRect(wx + 20, wy + 90, ww - 40, 110);
      ctx.strokeStyle = '#6a5a56'; ctx.lineWidth = 8; ctx.strokeRect(wx, wy, ww, wh);
      ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx + 40, wy); ctx.lineTo(wx + 90, wy + 70); ctx.lineTo(wx + 70, wy + 130); ctx.lineTo(wx + 140, wy + wh); ctx.stroke();
      if (k % 3 === 0) { ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 60, gY - 430); ctx.quadraticCurveTo(x + 40, gY - 330 + Math.sin(t * 2 + k) * 14, x + 90, gY - 290); ctx.stroke(); if (Math.sin(t * 9 + k * 3) > 0.92) { csGlow(x + 90, gY - 290, 40, '255,240,160', 0.6); } }
    });
    ctx.fillStyle = '#1f1512'; ctx.fillRect(a, gY - 2, b - a, H / scale); ctx.fillStyle = '#3b2b26'; ctx.fillRect(a, gY - 2, b - a, 6);
    drawRubble(x0, x1, 220, 3);
    for (i = 0; i < BL_FIRE.length; i++) {
      var fx = BL_FIRE[i]; if (fx < x0 - 120 || fx > x1 + 120) continue;
      csGlow(fx, gY - 40, 110, '255,140,50', 0.3);
      ctx.fillStyle = 'rgba(255,90,20,.92)'; flameP(fx, 90 + 20 * Math.sin(t * 6 + i), 70, Math.sin(t * 5 + i) * 5); ctx.fillStyle = 'rgba(255,200,60,.95)'; flameP(fx, 56, 40, Math.sin(t * 6 + i) * 3);
    }
    drawFlames(x0, x1, 190, 150, 5); drawSmoke(x0, x1, 300, 2);
    ctx.fillStyle = 'rgba(140,24,0,.18)'; ctx.fillRect(x0, gY - 430, x1 - x0, 600);
    var X = LABX_X;
    if (X > x0 - 120 && X < x1 + 120) {
      csGlow(X, gY - 70, 150, '255,190,90', 0.35 + 0.1 * Math.sin(t * 5));
      ctx.fillStyle = '#3a2a22'; ctx.fillRect(X - 52, gY - 150, 104, 150); ctx.fillStyle = '#ffd78a'; ctx.fillRect(X - 38, gY - 136, 76, 136);
      ctx.fillStyle = '#fff'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВЫХОД К ФЕРМЕ ▶', X, gY - 176);
    }
    if (150 > x0 - 200 && 150 < x1 + 200) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Перепрыгивай огонь: он жжётся', 600, gY - 190); }
  }

function drawCgcBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#7ab8ea'); g.addColorStop(1, '#e6f2fb'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    drawHills(0.2, 120, '#9ec3a0', 24, 10, 1.1); drawHills(0.4, 70, '#7fae82', 18, 8, 3.2);
    setCam(1);
    var w = LOCS[CGC].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#8a7a58'; ctx.fillRect(a, gY - 2, b - a, H / scale); ctx.fillStyle = '#a89868'; ctx.fillRect(a, gY - 2, b - a, 8);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; for (i = Math.floor(a / 90) * 90; i < b; i += 90) ctx.fillRect(i + ((i * 7) % 40), gY + 10 + (i * 3) % 40, 34, 3);
    // палатки лагеря
    decStep(x0, x1, 620, 300, function (x, k) {
      var c = ['#6a7d4a', '#7a6a4a', '#4a6a7a'][k % 3]; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 90, gY); ctx.lineTo(x, gY - 110); ctx.lineTo(x + 90, gY); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.moveTo(x - 24, gY); ctx.lineTo(x, gY - 56); ctx.lineTo(x + 24, gY); ctx.closePath(); ctx.fill();
    });
    // ганнеры-бунтовщики на фоне
    decStep(x0, x1, 360, 560, function (x, k) { if (k % 2) drawGunnerAt(x, gY, 0, false, false, 0.85, t * 1.5 + k); });
    var fl = rb();
    for (i = 0; i < 5; i++) if (CG_FX[i] > x0 - 120 && CG_FX[i] < x1 + 120) flagDraw(CG_FX[i], 190, (fl >> i) & 1);
    // терминал серверов
    var S = CG_SRV;
    if (S > x0 - 250 && S < x1 + 250) {
      ctx.fillStyle = '#2a3342'; ctx.fillRect(S - 170, gY - 60, 340, 60); ctx.fillStyle = '#10243f'; ctx.fillRect(S - 160, gY - 250, 320, 190); ctx.strokeStyle = '#5b7aa6'; ctx.lineWidth = 5; ctx.strokeRect(S - 160, gY - 250, 320, 190);
      ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffd23f'; ctx.fillText('СЕРВЕРЫ ЧИКЕН ГАНА', S - 148, gY - 234);
      var n = 0; for (i = 0; i < 5; i++) if ((fl >> (5 + i)) & 1) { ctx.fillStyle = '#7dff9c'; ctx.fillText(SRV_N[i] + '  ' + (30 + Math.floor(20 * Math.sin(t * 0.5 + i) + 18 * rbFlags() + t * 0.3 % 40)) + ' онлайн', S - 148, gY - 208 + n * 22); n++; }
      if (!n) { ctx.fillStyle = '#9fb3d1'; ctx.fillText('Пока ни одного сервера «бунт чг»', S - 148, gY - 206); }
    }
    // блогеры
    for (i = 0; i < 3; i++) {
      var yx = CG_YT[i]; if (yx < x0 - 150 || yx > x1 + 150) continue;
      var okY = (fl >> (10 + i)) & 1; ctx.save(); wSpr(img.rooster, yx, 120, i % 2 ? -1 : 1);
      ctx.fillStyle = '#12161c'; ctx.fillRect(yx - 8 + (i % 2 ? -34 : 34), gY - 86, 26, 18); ctx.fillStyle = okY ? '#ff3b3b' : '#555'; ctx.beginPath(); ctx.arc(yx - 8 + (i % 2 ? -34 : 34) + 13, gY - 77, 3, 0, 6.3); ctx.fill(); ctx.restore();
      ctx.fillStyle = okY ? '#7dff9c' : '#ffd23f'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(YT_N[i] + (okY ? ' · в эфире' : ''), yx, gY - 148);
    }
    // лидер
    var Lx = CG_LEAD;
    if (Lx > x0 - 200 && Lx < x1 + 200) {
      if (mogAlive() && ready(img.mogg)) wSpr(img.mogg, Lx, 170, 1); else drawGunnerAt(Lx, gY, 0, false, false, 1.5, 0);
      ctx.fillStyle = '#ffd23f'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(c2Leader(), Lx, gY - 206);
    }
    labDoor(NL_DOOR, 'К МАШИНЕ', '#7d6a4a', x0, x1);
  }

function uvBase(k) { return k === 9 ? img.priest : (k === 2 ? img.boss : ((k === 3 || k === 7 || k === 8) ? mogImg() : skinImg(mySkin))); }

function uvImg(k) { var U = UV[k], b = uvBase(k); return U.tint ? tintImg(b, U.tint, U.ta, 'uv' + k + (k === 3 ? 'm' : 's' + mySkin)) : b; }

function drawUniBack(x0, x1) {
    var k = uniV, U = UV[k], bomb = p5.on && p5.uni && p5.bomb && p5.bomb.planted;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, U.sky[0]); g.addColorStop(1, U.sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var i, cx = camX;
    for (i = 0; i < 60; i++) { var sx = (i * 211 + cx * 0.05) % W, sy = (i * 97) % (H * 0.5); ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + 0.2 * Math.sin(t * 1.3 + i)).toFixed(2) + ')'; ctx.fillRect(sx, sy, 2, 2); }
    parallaxSkyline(0.25, 20, 150, 220, k === 1 ? '#8d97a2' : 'rgba(0,0,0,.35)', 11 + k);
    setCam(1);
    var w = LOCS[UNI].w, a = Math.max(0, x0), b = Math.min(w, x1), sh = bomb ? Math.sin(t * 40) * 3 : 0;
    ctx.fillStyle = U.gnd; ctx.fillRect(a, gY - 2, b - a, H / scale); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(a, gY - 2, b - a, 5);
    // тематика
    if (k === 0) { decStep(x0, x1, 130, 20, function (x, q) { var hh = 18 + (q * 7) % 34; ctx.fillStyle = 'rgba(80,255,120,.35)'; ctx.beginPath(); ctx.arc(x + Math.sin(t + q) * 6, gY - hh - ((t * 12 + q * 30) % 60), 6, 0, 6.3); ctx.fill(); }); }
    else if (k === 1) { decStep(x0, x1, 260, 90, function (x, q) { ctx.strokeStyle = 'rgba(40,46,54,.55)'; ctx.lineWidth = 3; ctx.strokeRect(x, gY - 56, 18, 56); ctx.beginPath(); ctx.moveTo(x + 5, gY - 56); ctx.lineTo(x + 5, gY - 72); ctx.lineTo(x + 13, gY - 72); ctx.lineTo(x + 13, gY - 56); ctx.stroke(); }); }
    else if (k === 2) { decStep(x0, x1, 340, 200, function (x, q) { ctx.fillStyle = 'rgba(20,6,10,.7)'; ctx.fillRect(x - 40, gY - 150 - (q % 3) * 50, 80, 150 + (q % 3) * 50); ctx.fillStyle = 'rgba(255,60,40,.9)'; ctx.fillRect(x - 18, gY - 120 - (q % 3) * 50, 36, 5); }); }
    else if (k === 3) { decStep(x0, x1, 380, 120, function (x, q) { ctx.fillStyle = 'rgba(255,120,240,' + (0.5 + 0.4 * Math.sin(t * 3 + q)).toFixed(2) + ')'; ctx.font = '700 28px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('MOG', x, gY - 210 - (q % 2) * 40); ctx.fillStyle = '#3a2250'; ctx.fillRect(x - 30, gY - 24, 60, 8); ctx.fillRect(x - 36, gY - 40, 10, 40); ctx.fillRect(x + 26, gY - 40, 10, 40); }); }
    else { ctx.fillStyle = 'rgba(140,180,255,.12)'; ctx.fillRect(a, gY - 6, b - a, 8); for (i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(200,220,255,.08)'; ctx.beginPath(); ctx.ellipse(((i * 450 + t * 14) % (w + 600)) - 200, gY - 80 - (i % 3) * 40, 280, 40, 0, 0, 6.3); ctx.fill(); } }
    if (k === 8) drawK8Sky(x0, x1);
    if (k === 9) drawHvRays(x0, x1);
    // портал слева
    var P0 = UNI_PORTAL;
    if (P0 > x0 - 200 && P0 < x1 + 200) {
      csGlow(P0, gY - 110, 130 + 8 * Math.sin(t * 4), '120,230,255', 0.45); ctx.strokeStyle = 'rgba(190,240,255,.95)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(P0, gY - 110, 54, 100, 0, 0, 6.3); ctx.stroke();
      ctx.fillStyle = 'rgba(80,200,255,.25)'; ctx.beginPath(); ctx.ellipse(P0, gY - 110, 48, 92, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ПОРТАЛ ДОМОЙ', P0, gY - 232);
    }
    // ядро вселенной справа
    var C = UNI_CORE, pl = bomb ? 0.5 + 0.5 * Math.sin(t * 14) : 0.5 + 0.2 * Math.sin(t * 2);
    if (C > x0 - 220 && C < x1 + 220) {
      csGlow(C, gY - 120, 140 + 40 * pl, bomb ? '255,60,40' : U.col, 0.5);
      ctx.fillStyle = bomb ? '#ff5a3a' : 'rgba(' + U.col + ',.9)'; ctx.beginPath(); ctx.moveTo(C, gY - 210); ctx.lineTo(C + 34, gY - 120); ctx.lineTo(C, gY - 40); ctx.lineTo(C - 34, gY - 120); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(C, gY - 200); ctx.lineTo(C + 12, gY - 120); ctx.lineTo(C, gY - 60); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(bomb ? 'ВЗРЫВ ЧЕРЕЗ ' + Math.max(0, Math.ceil(p5.bomb.T - p5.bomb.t)) : 'ЯДРО ВСЕЛЕННОЙ', C, gY - 238);
    }
    if (bomb) { ctx.fillStyle = 'rgba(255,40,20,' + (0.08 + 0.08 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(x0, gY - 700, x1 - x0, 900); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; for (i = 0; i < 6; i++) { var cxk = x0 + ((i * 313 + 80) % Math.max(200, x1 - x0)); ctx.beginPath(); ctx.moveTo(cxk, gY - 640); ctx.lineTo(cxk + 30, gY - 520); ctx.lineTo(cxk - 20, gY - 400); ctx.stroke(); } }
  }

function v2sp(x, r, btn, msg, fn) { return Math.abs(P.x - x) < r ? { btn: btn, msg: touch ? 'Жми «' + btn + '»' : 'Нажми E: ' + msg, fn: fn, x: x } : null; }

function drawBurgerFront(x0, x1) {
    var X = BG_X, w = 400, h = 250, L0 = X - w / 2, i, nk = nightK();
    if (X + 280 < x0 || X - 280 > x1) return;
    setCam(1);
    // здание
    var g = ctx.createLinearGradient(0, gY - h, 0, gY); g.addColorStop(0, '#ffd45e'); g.addColorStop(1, '#f2a41f');
    ctx.fillStyle = g; ctx.fillRect(L0, gY - h, w, h + 4);
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(L0 + w - 10, gY - h, 10, h); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(L0, gY - h, 6, h);
    ctx.fillStyle = '#8a2a14'; ctx.fillRect(L0 - 4, gY - h - 8, w + 8, 10);
    // гигантский бургер на крыше
    ctx.fillStyle = '#b8701f'; ctx.beginPath(); ctx.ellipse(X, gY - h - 8, 130, 62, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(X, gY - h - 12, 124, 56, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#fff1c2'; for (i = 0; i < 9; i++) { var sa = 3.3 + i * 0.35; ctx.beginPath(); ctx.ellipse(X + Math.cos(sa) * 88 * (0.55 + (i % 3) * 0.2), gY - h - 14 + Math.sin(sa) * 40 * (0.6 + (i % 2) * 0.3), 5, 2.6, 0.5, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#4fae3b'; ctx.beginPath(); ctx.moveTo(X - 138, gY - h - 6); for (i = 0; i <= 14; i++) ctx.lineTo(X - 138 + i * 19.7, gY - h - 6 + (i % 2 ? 9 : 2)); ctx.lineTo(X + 138, gY - h - 10); ctx.lineTo(X - 138, gY - h - 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(X - 128, gY - h - 10, 256, 4);
    ctx.fillStyle = '#5a2d14'; rrect(X - 134, gY - h - 6, 268, 14, 6); ctx.fill();
    // вывеска
    ctx.fillStyle = '#b3201f'; rrect(L0 + 30, gY - h + 24, w - 60, 46, 10); ctx.fill(); ctx.strokeStyle = '#fff3c0'; ctx.lineWidth = 3; ctx.stroke();
    ctx.shadowColor = '#ffeaa0'; ctx.shadowBlur = 6 + 12 * nk; ctx.fillStyle = '#fff3c0'; ctx.font = '700 28px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('БУРГЕРНАЯ', X, gY - h + 48); ctx.shadowBlur = 0;
    // окна
    var lit = nk > 0.2 ? 1 : 0.55;
    [-150, 70].forEach(function (dx) {
      var wg = ctx.createLinearGradient(0, gY - 112, 0, gY - 48); wg.addColorStop(0, lit > 0.9 ? '#ffe9a8' : '#bfe3f7'); wg.addColorStop(1, lit > 0.9 ? '#ffc96a' : '#88bfe0'); ctx.fillStyle = wg; ctx.fillRect(X + dx, gY - 112, 80, 64);
      ctx.strokeStyle = '#6a2a14'; ctx.lineWidth = 4; ctx.strokeRect(X + dx, gY - 112, 80, 64);
      ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(X + dx + 40, gY - 72, 18, 9, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a2d14'; ctx.fillRect(X + dx + 22, gY - 72, 36, 6); ctx.fillStyle = '#4fae3b'; ctx.fillRect(X + dx + 21, gY - 66, 38, 4); ctx.fillStyle = '#c4833a'; ctx.fillRect(X + dx + 22, gY - 62, 36, 8);
    });
    // дверь
    ctx.fillStyle = '#5a2210'; ctx.fillRect(X - 42, gY - 118, 84, 118); var dg = ctx.createLinearGradient(0, gY - 108, 0, gY); dg.addColorStop(0, lit > 0.9 ? '#ffe9a8' : '#a9d6ee'); dg.addColorStop(1, lit > 0.9 ? '#ffb85a' : '#6aa5cc'); ctx.fillStyle = dg; ctx.fillRect(X - 34, gY - 110, 68, 110);
    ctx.fillStyle = '#5a2210'; ctx.fillRect(X - 2, gY - 110, 4, 110); ctx.fillStyle = '#ffd23f'; ctx.fillRect(X - 12, gY - 56, 5, 18); ctx.fillRect(X + 7, gY - 56, 5, 18);
    // полосатый козырёк
    for (i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#d62828'; ctx.beginPath(); ctx.moveTo(L0 + i * 40, gY - 150); ctx.lineTo(L0 + (i + 1) * 40, gY - 150); ctx.lineTo(L0 + (i + 1) * 40 + 4, gY - 124); ctx.lineTo(L0 + i * 40 - 4, gY - 124); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(L0 - 4, gY - 124, w + 8, 5);
    if (nk > 0.2) { var gl = ctx.createRadialGradient(X, gY - 60, 20, X, gY - 60, 260); gl.addColorStop(0, 'rgba(255,200,90,' + (0.35 * nk).toFixed(2) + ')'); gl.addColorStop(1, 'rgba(255,200,90,0)'); ctx.fillStyle = gl; ctx.fillRect(X - 260, gY - 320, 520, 330); }
  }

function drawBurgerBack(x0, x1) {
    drawBurgerBack0(x0, x1); drawBurgerCashier(x0, x1);
  }

function drawBurgerBack0(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#ffe8b8'); g.addColorStop(1, '#f6c978'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[23].w, a = Math.max(0, x0), b = Math.min(w, x1), i, q;
    ctx.fillStyle = '#fff1d0'; ctx.fillRect(a, gY - 360, b - a, 360); ctx.fillStyle = '#ffe3a8'; ctx.fillRect(a, gY - 2600, b - a, 2240);
    // красно-белая плитка у стены
    for (q = Math.floor(a / 60) * 60; q < b; q += 60) { ctx.fillStyle = ((q / 60) | 0) % 2 ? '#d62828' : '#fff'; ctx.fillRect(q, gY - 110, 60, 110); }
    ctx.fillStyle = '#8a2a14'; ctx.fillRect(a, gY - 114, b - a, 8);
    // пол-шахматка
    for (q = Math.floor(a / 70) * 70; q < b; q += 70) { ctx.fillStyle = ((q / 70) | 0) % 2 ? '#3a2a22' : '#e9d6b0'; ctx.fillRect(q, gY - 2, 70, 22); ctx.fillStyle = ((q / 70) | 0) % 2 ? '#e9d6b0' : '#3a2a22'; ctx.fillRect(q, gY + 20, 70, 40); }
    ctx.fillStyle = '#2a1a14'; ctx.fillRect(a, gY + 60, b - a, H / scale);
    // лампы
    for (q = 200; q < w; q += 380) { if (q < a - 60 || q > b + 60) continue; ctx.fillStyle = '#6a4a2a'; ctx.fillRect(q - 2, gY - 360, 4, 90); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.ellipse(q, gY - 268, 30, 16, 0, Math.PI, 0); ctx.fill(); csGlow(q, gY - 250, 130, '255,220,140', 0.22); }
    // дверь выхода
    var dx = BG_OUT; if (dx > a - 120 && dx < b + 120) { ctx.fillStyle = '#5a2210'; ctx.fillRect(dx - 52, gY - 200, 104, 200); ctx.fillStyle = '#bfe3f7'; ctx.fillRect(dx - 44, gY - 192, 88, 192); ctx.fillStyle = '#5a2210'; ctx.fillRect(dx - 2, gY - 192, 4, 192); ctx.fillStyle = '#fff'; rrect(dx - 40, gY - 244, 80, 30, 8); ctx.fill(); ctx.fillStyle = '#b3201f'; ctx.font = '700 16px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВЫХОД', dx, gY - 229); }
    // меню над кассой
    var C = BG_C; if (C > a - 420 && C < b + 420) {
      ctx.fillStyle = '#2a1a14'; rrect(C - 270, gY - 340, 540, 150, 12); ctx.fill(); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 4; ctx.stroke();
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillStyle = '#ffd23f'; ctx.textAlign = 'center'; ctx.fillText('МЕНЮ', C, gY - 316);
      var mi = [['Бургер', BG_FAT], ['Двойной бургер', BG_DBL], ['Мега-бургер', BG_MEGA]]; ctx.font = '600 18px "Rubik", system-ui, sans-serif';
      for (i = 0; i < 3; i++) { ctx.textAlign = 'left'; ctx.fillStyle = '#fff3c0'; ctx.fillText(mi[i][0], C - 240, gY - 280 + i * 30); ctx.textAlign = 'right'; ctx.fillStyle = '#ffd23f'; ctx.fillText(fmtN(mi[i][1]), C + 240, gY - 280 + i * 30); }
      // стойка
      ctx.fillStyle = '#8a4a1e'; ctx.fillRect(C - 190, gY - 72, 380, 72); ctx.fillStyle = '#6a3412'; ctx.fillRect(C - 190, gY - 40, 380, 4); ctx.fillStyle = '#ffd23f'; ctx.fillRect(C - 198, gY - 80, 396, 10);
      ctx.fillStyle = '#fff3c0'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЗАКАЗ ЗДЕСЬ', C, gY - 24);
      for (i = -1; i <= 1; i += 2) { var bx2 = C + i * 120; ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(bx2, gY - 82, 22, 12, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a2d14'; ctx.fillRect(bx2 - 22, gY - 82, 44, 6); ctx.fillStyle = '#4fae3b'; ctx.fillRect(bx2 - 23, gY - 77, 46, 3); ctx.fillStyle = '#c4833a'; ctx.fillRect(bx2 - 22, gY - 74, 44, 6); }
    }
    // столики с бургерами
    [1340, 1640, 1940, 2240].forEach(function (tx) {
      if (tx < a - 100 || tx > b + 100) return;
      ctx.fillStyle = '#6a3412'; ctx.fillRect(tx - 4, gY - 64, 8, 64); ctx.fillStyle = '#d62828'; ctx.beginPath(); ctx.ellipse(tx, gY - 66, 54, 11, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(tx - 16, gY - 76, 15, 9, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a2d14'; ctx.fillRect(tx - 31, gY - 76, 30, 5); ctx.fillStyle = '#c4833a'; ctx.fillRect(tx - 30, gY - 72, 28, 5);
      ctx.fillStyle = '#ffd23f'; ctx.fillRect(tx + 18, gY - 86, 5, 16); ctx.fillRect(tx + 25, gY - 84, 5, 14); ctx.fillRect(tx + 32, gY - 86, 5, 16);
    });
    // неоновый бургер на дальней стене
    var nx = 1790; if (nx > a - 120 && nx < b + 120) { ctx.shadowColor = '#ff6a3c'; ctx.shadowBlur = 14; ctx.strokeStyle = '#ff9a3c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(nx, gY - 262, 52, 30, 0, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(nx - 56, gY - 255); ctx.lineTo(nx + 56, gY - 255); ctx.moveTo(nx - 50, gY - 240); ctx.lineTo(nx + 50, gY - 240); ctx.stroke(); ctx.beginPath(); ctx.ellipse(nx, gY - 232, 52, 14, 0, 0, Math.PI); ctx.stroke(); ctx.shadowBlur = 0; }
  }

function burgerInfo() {
    var bb = save.mx.bb | 0;
    return 'Заряды буста: ' + bb + ' из 5 · съедено бургеров: ' + (save.mx.bn | 0) + ' · сейчас ты ' + (muscleForm() ? 'качок' : 'жирный');
  }

function burgerEat(n, cost, label) {
    if (save.coins < cost) { sfx('no'); toast('Не хватает коинов: нужно ' + fmtN(cost) + '.', 3000); return; }
    save.coins -= cost; var wasM = muscleForm();
    save.mx.bn = Math.min(1e6, (save.mx.bn | 0) + n); save.mx.bb = Math.min(5, (save.mx.bb | 0) + n); save.mx.bfat = 1;
    netProfile();
    ach('bg1'); if (save.mx.bn >= 10) ach('bg10'); if (save.mx.bn >= 30) ach('bg30');
    persist(); hud(); sfx('rare'); shk = Math.max(shk, 0.5);
    ring(P.x, gY - 80, 200, '#ffd23f'); burst(P.x, gY - 70, 26, '#d98a2b', 360, 0.9); popup(P.x, PLAYER_H + 50, 'НЯМ! +' + n + ' буст', '#ffd23f');
    toast((wasM ? 'Ты съел «' + label + '» и снова стал жирным: мышцы спрятались, сила осталась. ' : 'Ты съел «' + label + '». ') + 'Следующая жир-территория будет сильнее.', 5500);
    burgerTalk();
  }

function hnTone(f, st, d, v, ty) { try { if (actx && music.sfx) tone(f, st, d, v, ty); } catch (e) {} }

function hnMake(side, k, ag) { return { side: side, k: k, name: HN_NAMES[k] || 'Голодный', ag: ag, st: 0, pos: 0, cd: 6 + Math.random() * 4, at: 0, kn: 0 }; }

function hnEnemies(kL, nt) {
    var m = 1 + 0.3 * ((nt || 1) - 1), sc = function (a) { return a.map(function (x) { return x * m; }); }, r = [hnMake('l', kL, sc([0.5, 0.8, 1.0, 1.3, 1.7, 2.1])), hnMake('r', 'm', sc([0.4, 0.7, 1.0, 1.4, 1.8, 2.3]))];
    if (nt >= 2) r.push(hnMake('c', 'k', sc([0.3, 0.6, 0.9, 1.2, 1.6, 2.0])));
    return r;
  }

function hnPick(nt) {
    var ch = [{ t: 'Выйти на смену одному', fn: function () { dlgClose(); hnStart(true, undefined, false, nt); } }];
    if (socket && net.room && net.state === 'online') ch.push({ t: 'Выйти на смену с друзьями', fn: function () { dlgClose(); socket.emit('uni', { k: nt - 1, kind: 'hn' }); toast('Зову друзей из бургерной на смену…', 3000); } });
    ch.push({ t: 'Назад', fn: function () { cashierTalk(); } });
    dlgShow('Охранник', img.guard, 'Ночь ' + nt + ': ' + HN_INFO[nt - 1] + ' Платят ' + fmtN(HN_PAYS[nt - 1]) + ' каждому, кто дожил до 6 утра. Друзья должны стоять в бургерной.', ch);
  }

function cashierTalk() {
    var night = dnIsNight(), er = !!save.mx.er, un = Math.min(5, (save.mx.hnN | 0) + 1);
    var txt = night
      ? 'Есть работа: ночная смена «Голодная ночь». Сидишь в офисе охраны: двери, свет и камеры. Ночей пройдено: ' + (save.mx.hnN | 0) + ' из 5. Выбери ночь.' + (er ? ' Хоумлендера стёрли, вместо него лезет друг Чикен Моггити.' : '')
      : 'Работа есть, но только ночью: приходи, когда стемнеет. Ночь через ' + fmtTime(dnToNight()) + '. Ночью сюда лезут голодные, так что приходи не с пустым животом.';
    var ch = [], k;
    if (night) {
      for (k = 1; k <= un; k++) ch.push({ t: 'Ночь ' + k + ' · ' + fmtN(HN_PAYS[k - 1]), fn: (function (k) { return function () { hnPick(k); }; })(k) });
      ch.push({ t: 'Не сегодня', out: true });
    } else ch.push({ t: 'Понял, приду ночью', out: true });
    dlgShow('Охранник', img.guard, txt, ch);
  }

function hnStart(host, kL, asst, night) {
    hn.night = Math.max(1, Math.min(5, night | 0 || 1)); hn.ncams = hn.night >= 2 ? 5 : 4; hn.vn = hn.vnT = 0; hn.bo = 0; hn.boT = 22 + Math.random() * 10; hn.mP = 0;
    hn.on = true; hn.host = !!host; hn.asst = !!asst; hn.t = 0; hn.hour = 0; hn.pw = 100; hn.dl = hn.dr = hn.dlT = hn.drT = 0; hn.ll = hn.lr = false; hn.over = 0; hn.who = null; hn.out = false; hn.flash = 0; hn.tut = 14; hn.win = 0; hn.hum = 0; hn.cam = false; hn.camSel = 0; hn.camV = {}; hn.snT = 0;
    hn.en = hnEnemies(kL || (save.mx.er ? 'f' : 'h'), hn.night);
    input.left = input.right = input.up = input.dn = false; document.body.classList.add('hnon'); try { dlgClose(); elToast.style.opacity = 0; } catch (x0) {} hnUi.hidden = false; hnQuit.hidden = false; hnCamUi.hidden = true; hnSync();
    hnMsg('12:00. Ночь ' + hn.night + '. Ты в офисе охраны.' + (partyOn() ? ' Вы на смене вместе.' : ''), 4);
    sfx('pick');
    if (!hn.asst && partyOn() && partyHost()) storyEmit({ hn: hn.en[0].k, hnN: hn.night });
  }

function hnMsg(m, secs, quiet) { hn.msg = m; hn.msgT = secs || 3; if (!quiet && !hn.asst && partyOn() && partyHost()) storyEmit({ hm: [String(m).slice(0, 120), secs || 3] }); }

function hnSync() {
    var b = hnUi.querySelectorAll('button'); b[0].className = hn.dlT ? 'on' : ''; b[1].className = hn.ll ? 'on' : ''; b[2].className = hn.cam ? 'on' : ''; b[3].className = hn.vnT ? 'on' : ''; b[3].style.display = hn.night >= 2 ? '' : 'none'; b[4].className = hn.lr ? 'on' : ''; b[5].className = hn.drT ? 'on' : '';
    var c = hnCamUi.querySelectorAll('button'), i; for (i = 0; i < c.length; i++) { c[i].className = i === hn.camSel ? 'on' : ''; c[i].style.display = i < hn.ncams ? '' : 'none'; }
    hnCamUi.hidden = !hn.cam;
  }

function hnPress(k) {
    if (!hn.on || hn.over > 0 || hn.win > 0) return;
    if (k === 4) { hn.cam = !hn.cam; hnTone(hn.cam ? 700 : 400, 0, 0.08, 0.1, 'square'); hnSync(); if (hn.asst) storyEmit({ hc: hn.cam ? hn.camSel + 1 : 0 }); return; }
    if (k === 5 && hn.night < 2) return;
    if (hn.asst) { storyEmit({ hp: k }); hnTone(k === 0 || k === 3 ? 90 : 520, 0, 0.09, 0.12, 'square'); return; }
    hnDo(k);
  }

function hnDo(k) {
    if (hn.pw <= 0) { sfx('no'); hnMsg('Энергия кончилась: ни дверей, ни света.', 2.5); return; }
    if (k === 0) hn.dlT = hn.dlT ? 0 : 1;
    else if (k === 1) hn.ll = !hn.ll;
    else if (k === 2) hn.lr = !hn.lr;
    else if (k === 3) hn.drT = hn.drT ? 0 : 1;
    else if (k === 5 && hn.night >= 2) hn.vnT = hn.vnT ? 0 : 1;
    hnTone(k === 0 || k === 3 ? 90 : 520, 0, 0.09, 0.12, 'square'); hnSync();
  }

function hnEnd(win, quit, noEmit) {
    var wasHost = !hn.asst;
    hn.on = false; hn.cam = false; document.body.classList.remove('hnon'); try { dlgClose(); resize(); } catch (x0) {} hnUi.hidden = true; hnQuit.hidden = true; hnCamUi.hidden = true; input.left = input.right = false;
    if (hn.asst && quit && partyOn()) storyEmit({ hc: 0 });
    if (wasHost && !noEmit && partyOn() && partyHost()) { storyEmit({ he: win ? 'w' : (quit ? 'q' : 'l') }); setTimeout(function () { partySet(null); }, 800); }
    else if (hn.asst) setTimeout(function () { partySet(null); }, 800);
    if (win) {
      var pay = HN_PAYS[hn.night - 1] || HN_PAY; save.coins += pay; save.mx.hn = Math.min(9999, (save.mx.hn | 0) + 1); save.mx.hnN = Math.max(save.mx.hnN | 0, hn.night); persist(); hud(); ach('hn'); if (hn.night >= 5) ach('hn5'); sfx('rare');
      popup(P.x, PLAYER_H + 40, '+' + fmtN(pay) + ' ' + coinWord(pay), '#ffd23f');
      toast('6:00. Ночь ' + hn.night + ' пережита! Платят ' + fmtN(pay) + ' коинов.' + (hn.night < 5 && hn.night > (save.mx.hnN | 0) - 1 ? ' Открыта следующая ночь.' : ''), 6000);
    } else toast(quit ? 'Ты ушёл со смены. Оплаты нет.' : 'Голодные прорвались. Смена сорвана, оплаты нет. Попробуй ещё раз.', 5000);
    hn.asst = false; hn.host = true;
  }

function hnDoorClosed(e) { return e.side === 'l' ? hn.dl > 0.9 : (e.side === 'c' ? hn.vn > 0.9 : hn.dr > 0.9); }

function hnScare(e) { hn.over = 2.2; hn.who = e; hn.flash = 1.2; hn.cam = false; hnSync(); sfx('boom'); for (var q = 0; q < 6; q++) hnTone(90 + q * 37, q * 0.05, 0.5, 0.2, 'sawtooth'); }

function hnSnap() { var f = (hn.dlT ? 1 : 0) | (hn.drT ? 2 : 0) | (hn.ll ? 4 : 0) | (hn.lr ? 8 : 0) | (hn.out ? 16 : 0) | (hn.vnT ? 32 : 0) | (hn.bo > 0 ? 64 : 0); return [Math.round(hn.t * 10) / 10, Math.round(hn.pw * 10), f, hn.en.map(function (q) { return q.st; }), hn.over > 0 ? hn.en.indexOf(hn.who) + 1 : 0, hn.win > 0 ? 1 : 0, Math.round(hn.mP * 100)]; }

function hnApply(a) {
    if (!Array.isArray(a) || a.length < 6 || !Array.isArray(a[3])) return;
    hn.t = Math.max(0, Math.min(HN_HOUR * 6 + 1, +a[0] || 0)); hn.pw = Math.max(0, Math.min(100, (+a[1] || 0) / 10));
    var f = a[2] | 0, i, st; hn.dlT = f & 1; hn.drT = (f >> 1) & 1; hn.ll = !!(f & 4); hn.lr = !!(f & 8); hn.vnT = (f >> 5) & 1; hn.bo = (f & 64) ? Math.max(hn.bo, 0.5) : 0; hn.mP = Math.max(0, Math.min(1, (+a[6] || 0) / 100));
    if (!!(f & 16) && !hn.out) hnTone(70, 0, 1.2, 0.18, 'sawtooth'); hn.out = !!(f & 16);
    for (i = 0; i < hn.en.length && i < a[3].length; i++) { st = Math.max(0, Math.min(3, a[3][i] | 0)); if (st > hn.en[i].st) { hnTone(70 + st * 25, 0, 0.12, 0.05 + st * 0.05, 'square'); if (st === 3) { hnTone(110, 0, 0.1, 0.22, 'square'); hnTone(110, 0.16, 0.1, 0.22, 'square'); } } hn.en[i].st = st; }
    hn.hour = Math.min(5, Math.floor(hn.t / HN_HOUR));
    if ((a[4] | 0) > 0 && hn.over <= 0 && hn.win <= 0) hnScare(hn.en[Math.max(0, Math.min(hn.en.length - 1, (a[4] | 0) - 1))]);
    if (a[5] && hn.win <= 0 && hn.over <= 0) { hn.win = 2.4; sfx('rare'); }
    hnSync();
  }

function updateHn(dt) {
    var i, e, ag, drain, gv = 0, k;
    if (hn.msgT > 0) hn.msgT -= dt;
    if (hn.tut > 0) hn.tut -= dt;
    if (hn.flash > 0) hn.flash -= dt;
    for (var pi = 0; pi < hn.en.length; pi++) { var pe = hn.en[pi], pd = pe.st - pe.pos; pe.pos += Math.max(-dt * 0.55, Math.min(dt * 0.55, pd)); }
    hn.dl += (hn.dlT - hn.dl) * Math.min(1, dt * 9); hn.dr += (hn.drT - hn.dr) * Math.min(1, dt * 9); hn.vn += (hn.vnT - hn.vn) * Math.min(1, dt * 9); if (hn.bo > 0) hn.bo -= dt;
    if (hn.over > 0) { hn.over -= dt; if (hn.over <= 0) hnEnd(false, false, hn.asst); return; }
    if (hn.win > 0) { hn.win -= dt; if (hn.win <= 0) hnEnd(true, false, hn.asst); return; }
    hn.hum -= dt; if (hn.hum <= 0) { hn.hum = 1.4; hnTone(55 + hn.hour * 3, 0, 1.3, 0.025, 'sawtooth'); }
    if (hn.asst) { hn.t += dt; return; }
    hn.t += dt;
    var hr = Math.min(5, Math.floor(hn.t / HN_HOUR));
    if (hr !== hn.hour) { hn.hour = hr; hnMsg(hr + ':00. ' + (hr >= 4 ? 'Они злее. Держись.' : 'Ночь идёт.'), 3.5); hnTone(330, 0, 0.5, 0.1, 'sine'); hnTone(440, 0.25, 0.5, 0.1, 'sine'); }
    if (hn.t >= HN_HOUR * 6) { hn.win = 2.4; hnMsg('6:00! Рассвет!', 3); sfx('rare'); hnTone(523, 0, 0.4, 0.14); hnTone(659, 0.3, 0.4, 0.14); hnTone(784, 0.6, 0.7, 0.14); if (partyOn() && partyHost()) storyEmit({ hs: hnSnap() }); return; }
    for (k in hn.camV) if (hn.camV[k]) gv++;
    drain = 0.1 + 0.015 * (hn.night - 1) + (hn.vnT ? 0.2 : 0) + (hn.dlT ? 0.2 : 0) + (hn.drT ? 0.2 : 0) + (hn.ll ? 0.14 : 0) + (hn.lr ? 0.14 : 0) + (hn.cam ? 0.12 : 0) + gv * 0.12;
    if (hn.pw > 0) {
      hn.pw = Math.max(0, hn.pw - drain * dt);
      if (hn.pw <= 0) { hn.out = true; hn.dlT = hn.drT = hn.vnT = 0; hn.ll = hn.lr = false; hnSync(); hnMsg('Свет погас. Энергия кончилась...', 4); hnTone(70, 0, 1.2, 0.18, 'sawtooth'); }
    }
    // Меллстрой крадёт энергию, пока не смотришь на кухню (с 3 ночи)
    if (hn.night >= 3 && !hn.out) {
      var wat = hn.cam && hn.camSel === 0; for (k in hn.camV) if (hn.camV[k] === 1) wat = true;
      if (wat) hn.mP = Math.max(0, hn.mP - dt * 0.3); else hn.mP += dt / (36 - 4 * hn.night);
      if (hn.mP >= 1) { hn.mP = 0; hn.pw = Math.max(0, hn.pw - 8); hnMsg('Меллстрой украл энергию!', 3); hnTone(180, 0, 0.5, 0.2, 'sawtooth'); hn.flash = 0.5; }
    }
    // перебои света (с 4 ночи)
    if (hn.night >= 4 && !hn.out) { hn.boT -= dt; if (hn.boT <= 0) { hn.boT = 20 + Math.random() * 14 - hn.night; hn.bo = 3.5; hnMsg('Свет мигает: камеры и лампы не работают!', 2.5); hnTone(60, 0, 0.8, 0.2, 'sawtooth'); } }
    for (i = 0; i < hn.en.length; i++) {
      e = hn.en[i]; ag = e.ag[hn.hour] * (hn.out ? 3 : 1);
      if (e.st < 3) {
        e.cd -= dt;
        if (e.cd <= 0) {
          e.cd = (5.5 + Math.random() * 4) / ag;
          if (Math.random() < 0.38 + 0.1 * ag) {
            e.st++; hnTone(70 + e.st * 25, 0, 0.12, 0.05 + e.st * 0.05, 'square');
            if (e.st === 3) { e.at = hn.out ? 3 : 7; e.kn = 0; hnTone(110, 0, 0.1, 0.22, 'square'); hnTone(110, 0.16, 0.1, 0.22, 'square'); }
          } else if (e.st > 0 && Math.random() < 0.25) e.st--;
        }
      } else if (hnDoorClosed(e)) {
        e.kn += dt; e.at = Math.max(e.at, 3);
        if (e.kn > 3.5) { e.st = Math.random() < 0.5 ? 0 : 1; e.cd = 6 / ag; e.kn = 0; hnTone(100, 0, 0.15, 0.2, 'square'); hnMsg(e.name + ' ушёл голодным.', 2.5); }
      } else {
        e.at -= dt; e.kn = 0;
        if (e.at <= 0) { hnScare(e); if (partyOn() && partyHost()) storyEmit({ hs: hnSnap() }); return; }
      }
    }
    if (partyOn() && partyHost()) { hn.snT -= dt; if (hn.snT <= 0) { hn.snT = 0.12; storyEmit({ hs: hnSnap() }); } }
  }

function hnEnemyImg(e) { var im = img[e.k === 'h' ? 'boss' : (e.k === 'k' ? 'muscle' : 'mogg')]; return im && ready(im) ? im : null; }

function hnSprite(e, x, fy, hh, alpha) {
    var im = hnEnemyImg(e), moving = Math.abs(e.pos - e.st) > 0.03, bob = moving ? Math.abs(Math.sin(t * 7)) * hh * 0.03 : Math.sin(t * 2) * hh * 0.006, rot = moving ? Math.sin(t * 7) * 0.04 : 0;
    ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, alpha === undefined ? 1 : alpha)); ctx.translate(x, fy - bob); ctx.rotate(rot);
    if (e.k === 'f') { try { ctx.filter = 'hue-rotate(150deg) saturate(1.5)'; } catch (x1) {} }
    if (im) { var ew = hh * im.naturalWidth / im.naturalHeight; ctx.drawImage(im, -ew / 2, -hh, ew, hh); }
    else { ctx.fillStyle = e.k === 'h' ? '#2a4aa0' : '#5a3a1a'; ctx.fillRect(-hh * 0.18, -hh, hh * 0.36, hh); }
    try { ctx.filter = 'none'; } catch (x2) {}
    ctx.restore();
  }

function hnEyes(x, y, size) { ctx.fillStyle = '#ff2a2a'; ctx.shadowColor = '#ff2a2a'; ctx.shadowBlur = size * 2; ctx.beginPath(); ctx.arc(x - size * 1.6, y, size, 0, 6.3); ctx.arc(x + size * 1.6, y, size, 0, 6.3); ctx.fill(); ctx.shadowBlur = 0; }

function hnLerp(a, b, q) { return a + (b - a) * Math.max(0, Math.min(1, q)); }

function hnCamSeen(e, cam) {
    var p = e.pos, s = e.side === 'l' ? -1 : (e.side === 'c' ? 0 : 1), q;
    if (cam === 0 && p < 0.95) { q = p / 0.9; return { x: hnLerp(0.5 + s * 0.2, 0.5, q), fy: 0.9, hh: 0.62, a: p > 0.6 ? 1 - (p - 0.6) / 0.35 : 1 }; }
    if (cam === 1 && p > 0.65 && p < 2.1) { q = (p - 0.7) / 1.3; return { x: 0.5 + s * 0.38 * Math.max(0, Math.min(1, q)), fy: 0.9, hh: hnLerp(0.5, 0.66, q), a: p < 0.9 ? (p - 0.65) / 0.25 : (p > 1.85 ? (2.1 - p) / 0.25 : 1) }; }
    if (cam === 4 && e.side === 'c' && p > 1.4) { q = (p - 1.5) / 1.5; return { x: 0.5, fy: hnLerp(0.62, 0.98, q), hh: hnLerp(0.18, 0.9, q), a: p < 1.7 ? (p - 1.4) / 0.3 : 1 }; }
    if (((cam === 2 && e.side === 'l') || (cam === 3 && e.side === 'r')) && p > 1.75) { q = (p - 1.8) / 1.2; return { x: 0.5, fy: hnLerp(0.56, 0.96, q), hh: hnLerp(0.16, 0.95, q), a: p < 2.0 ? (p - 1.75) / 0.25 : 1 }; }
    return null;
  }

function hnSceneKitchen(mx, my, mw, mh, X, Y) {
    var i, g = ctx.createLinearGradient(0, my, 0, my + mh); g.addColorStop(0, '#2c3a36'); g.addColorStop(1, '#1a2622'); ctx.fillStyle = g; ctx.fillRect(mx, my, mw, mh);
    ctx.strokeStyle = 'rgba(180,230,210,.10)'; ctx.lineWidth = 1; for (i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(X(i / 16), Y(0)); ctx.lineTo(X(i / 16), Y(0.78)); ctx.stroke(); } for (i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(X(0), Y(i * 0.1)); ctx.lineTo(X(1), Y(i * 0.1)); ctx.stroke(); }
    ctx.fillStyle = '#141c19'; ctx.fillRect(mx, Y(0.78), mw, mh * 0.22); ctx.fillStyle = '#222d29'; for (i = 0; i < 12; i++) ctx.fillRect(X(i / 12), Y(0.78), mw / 24, mh * 0.22);
    // стальная стойка с грилем
    ctx.fillStyle = '#56645f'; ctx.fillRect(X(0.04), Y(0.55), mw * 0.38, mh * 0.26); ctx.fillStyle = '#7a8a84'; ctx.fillRect(X(0.04), Y(0.53), mw * 0.38, mh * 0.025);
    ctx.fillStyle = '#1a1f1d'; ctx.fillRect(X(0.07), Y(0.5), mw * 0.3, mh * 0.03);
    for (i = 0; i < 7; i++) { var fl = 0.5 + 0.5 * Math.sin(t * 9 + i * 1.7); ctx.fillStyle = 'rgba(255,' + (120 + fl * 80 | 0) + ',40,' + (0.55 + 0.3 * fl).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(X(0.09 + i * 0.04), Y(0.5), mw * 0.012, mh * (0.02 + 0.02 * fl), 0, 0, 6.3); ctx.fill(); }
    // фритюрница с пузырями
    ctx.fillStyle = '#6a746f'; ctx.fillRect(X(0.6), Y(0.52), mw * 0.18, mh * 0.29); ctx.fillStyle = '#c98a1c'; ctx.fillRect(X(0.62), Y(0.55), mw * 0.14, mh * 0.05);
    for (i = 0; i < 6; i++) { var bp = ((t * 0.7 + i * 0.37) % 1); ctx.fillStyle = 'rgba(255,220,130,' + (0.6 * (1 - bp)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(X(0.63 + (i % 3) * 0.04 + Math.sin(t * 3 + i) * 0.005), Y(0.57 - bp * 0.08), 2 + (i % 2) * 2, 0, 6.3); ctx.fill(); }
    // холодильник с лампочкой
    ctx.fillStyle = '#7c8a86'; ctx.fillRect(X(0.86), Y(0.18), mw * 0.11, mh * 0.63); ctx.fillStyle = '#4a5652'; ctx.fillRect(X(0.88), Y(0.22), mw * 0.012, mh * 0.2);
    ctx.fillStyle = Math.sin(t * 3) > 0 ? '#3ddc84' : '#1c5a38'; ctx.beginPath(); ctx.arc(X(0.915), Y(0.2), 3, 0, 6.3); ctx.fill();
    // кастрюли на крючках покачиваются
    for (i = 0; i < 5; i++) { var sw = Math.sin(t * 1.3 + i) * 3; ctx.fillStyle = '#8a9a94'; ctx.beginPath(); ctx.arc(X(0.16 + i * 0.06) + sw, Y(0.2), mw * 0.02, 0, 6.3); ctx.fill(); ctx.fillStyle = '#55635e'; ctx.fillRect(X(0.16 + i * 0.06) + sw - 1, Y(0.1), 2, mh * 0.08); }
    // вытяжка и пар
    ctx.fillStyle = '#3b4642'; ctx.fillRect(X(0.02), Y(0.0), mw * 0.45, mh * 0.08);
    for (i = 0; i < 8; i++) { var sp = ((t * 0.25 + i * 0.13) % 1); ctx.fillStyle = 'rgba(220,240,235,' + (0.16 * (1 - sp)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(X(0.12 + (i % 4) * 0.08) + Math.sin(t + i) * 8, Y(0.5 - sp * 0.4), 10 + sp * 18, 0, 6.3); ctx.fill(); }
    // часы
    ctx.fillStyle = '#e8efe9'; ctx.beginPath(); ctx.arc(X(0.72), Y(0.2), mh * 0.07, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0.72), Y(0.2)); ctx.lineTo(X(0.72) + Math.cos(t * 0.3) * mh * 0.05, Y(0.2) + Math.sin(t * 0.3) * mh * 0.05); ctx.moveTo(X(0.72), Y(0.2)); ctx.lineTo(X(0.72), Y(0.2) - mh * 0.035); ctx.stroke();
    // дверь в зал
    ctx.fillStyle = '#0a0f0d'; ctx.fillRect(X(0.46), Y(0.34), mw * 0.08, mh * 0.46); ctx.fillStyle = 'rgba(255,200,120,.08)'; ctx.fillRect(X(0.46), Y(0.34), mw * 0.08, mh * 0.46);
  }

function hnSceneHall(mx, my, mw, mh, X, Y) {
    var i, g = ctx.createLinearGradient(0, my, 0, my + mh); g.addColorStop(0, '#3a2a2e'); g.addColorStop(1, '#1c1418'); ctx.fillStyle = g; ctx.fillRect(mx, my, mw, mh);
    for (i = 0; i < 20; i++) { ctx.fillStyle = i % 2 ? 'rgba(214,40,40,.35)' : 'rgba(255,255,255,.2)'; ctx.fillRect(X(i / 20), Y(0.5), mw / 20, mh * 0.2); }
    // окна на улицу с огнями машин
    for (i = 0; i < 3; i++) { var wx = X(0.1 + i * 0.3); ctx.fillStyle = '#0a1426'; ctx.fillRect(wx, Y(0.08), mw * 0.22, mh * 0.34); var cx = ((t * 60 + i * 140) % (mw * 0.3)) - mw * 0.04; ctx.save(); ctx.beginPath(); ctx.rect(wx, Y(0.08), mw * 0.22, mh * 0.34); ctx.clip(); ctx.fillStyle = 'rgba(255,230,160,.8)'; ctx.fillRect(wx + cx, Y(0.34), 14, 5); ctx.fillStyle = 'rgba(255,60,60,.8)'; ctx.fillRect(wx + cx + 28, Y(0.34), 8, 5); ctx.restore(); ctx.strokeStyle = '#2b1e22'; ctx.lineWidth = 4; ctx.strokeRect(wx, Y(0.08), mw * 0.22, mh * 0.34); ctx.beginPath(); ctx.moveTo(wx + mw * 0.11, Y(0.08)); ctx.lineTo(wx + mw * 0.11, Y(0.42)); ctx.stroke(); }
    // пол
    ctx.fillStyle = '#16100f'; ctx.fillRect(mx, Y(0.72), mw, mh * 0.28);
    for (i = -10; i < 22; i++) { ctx.strokeStyle = 'rgba(233,214,176,.12)'; ctx.beginPath(); ctx.moveTo(X(0.5) + (i - 6) * mw * 0.01, Y(0.72)); ctx.lineTo(X(i / 20), Y(1)); ctx.stroke(); }
    // столики, стулья, бургеры
    [0.14, 0.38, 0.62, 0.86].forEach(function (f, k) { var sc = 0.85 + (k % 2) * 0.1; ctx.fillStyle = '#4a1612'; ctx.fillRect(X(f) - 3, Y(0.7), 6, mh * 0.2 * sc); ctx.fillStyle = '#9a2220'; ctx.beginPath(); ctx.ellipse(X(f), Y(0.7), mw * 0.07 * sc, mh * 0.025, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(X(f) - 12, Y(0.68), 10, 6, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#2a1a16'; ctx.fillRect(X(f) - mw * 0.09, Y(0.74), 5, mh * 0.14); ctx.fillRect(X(f) + mw * 0.085, Y(0.74), 5, mh * 0.14); });
    // неон
    var fl = Math.sin(t * 17) > -0.85 ? 1 : 0.15; ctx.shadowColor = '#ff6a3c'; ctx.shadowBlur = 18 * fl; ctx.strokeStyle = 'rgba(255,154,60,' + fl + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(X(0.5), Y(0.1), mw * 0.05, mh * 0.04, 0, Math.PI, 0); ctx.stroke(); ctx.shadowBlur = 0;
    // раскачивающаяся лампа
    var sw = Math.sin(t * 1.1) * 14; ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0.3), Y(0)); ctx.lineTo(X(0.3) + sw, Y(0.12)); ctx.stroke(); ctx.fillStyle = 'rgba(255,210,100,.85)'; ctx.beginPath(); ctx.ellipse(X(0.3) + sw, Y(0.12), 22, 10, 0, Math.PI, 0); ctx.fill(); csGlow(X(0.3) + sw, Y(0.16), 70, '255,210,122', 0.18);
    // касса справа в глубине
    ctx.fillStyle = '#5a2d14'; ctx.fillRect(X(0.02), Y(0.52), mw * 0.09, mh * 0.2);
  }

function hnSceneCorr(mx, my, mw, mh, X, Y, side) {
    var i, s = side === 'l' ? -1 : 1, g = ctx.createLinearGradient(0, my, 0, my + mh); g.addColorStop(0, '#222a2a'); g.addColorStop(1, '#101616'); ctx.fillStyle = g; ctx.fillRect(mx, my, mw, mh);
    var vx = X(0.5), vy = Y(0.5), fw = mw * 0.12, fh = mh * 0.2;
    ctx.fillStyle = '#0b1010'; ctx.fillRect(vx - fw, vy - fh, fw * 2, fh * 2.1);
    ctx.fillStyle = '#2a3534'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(vx - fw, vy - fh); ctx.lineTo(vx - fw, vy + fh * 1.1); ctx.lineTo(mx, my + mh); ctx.fill();
    ctx.fillStyle = '#323f3d'; ctx.beginPath(); ctx.moveTo(mx + mw, my); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx + fw, vy + fh * 1.1); ctx.lineTo(mx + mw, my + mh); ctx.fill();
    ctx.fillStyle = '#1b2423'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + mw, my); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx - fw, vy - fh); ctx.fill();
    ctx.fillStyle = '#0f1514'; ctx.beginPath(); ctx.moveTo(mx, my + mh); ctx.lineTo(mx + mw, my + mh); ctx.lineTo(vx + fw, vy + fh * 1.1); ctx.lineTo(vx - fw, vy + fh * 1.1); ctx.fill();
    ctx.strokeStyle = 'rgba(160,230,210,.12)'; ctx.lineWidth = 2; for (i = 1; i < 7; i++) { var q = Math.pow(i / 7, 1.7); ctx.beginPath(); ctx.moveTo(hnLerp(vx - fw, mx, q), hnLerp(vy - fh, my, q)); ctx.lineTo(hnLerp(vx - fw, mx, q), hnLerp(vy + fh * 1.1, my + mh, q)); ctx.moveTo(hnLerp(vx + fw, mx + mw, q), hnLerp(vy - fh, my, q)); ctx.lineTo(hnLerp(vx + fw, mx + mw, q), hnLerp(vy + fh * 1.1, my + mh, q)); ctx.stroke(); }
    // потолочные лампы мигают
    for (i = 0; i < 3; i++) { var qq = (i + 1) / 4, on = Math.sin(t * (7 + i * 3) + i * 5) > -0.8 ? 1 : 0.2; ctx.fillStyle = 'rgba(210,255,235,' + (0.5 * on).toFixed(2) + ')'; ctx.fillRect(vx - hnLerp(fw, mw * 0.15, 1 - qq), hnLerp(vy - fh, my, 1 - qq) + 4, hnLerp(fw, mw * 0.15, 1 - qq) * 2, 4 + (1 - qq) * 6); }
    // дверь вдали: на конце коридора кухня/зал
    ctx.fillStyle = side === 'l' ? '#3a2a1a' : '#2a1a3a'; ctx.fillRect(vx - fw * 0.5, vy - fh * 0.6, fw, fh * 1.6);
    // плакат и трубы
    ctx.fillStyle = '#8a2a20'; ctx.fillRect(X(s < 0 ? 0.05 : 0.8), Y(0.28), mw * 0.1, mh * 0.2); ctx.fillStyle = '#ffd23f'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('NO EXIT', X(s < 0 ? 0.1 : 0.85), Y(0.38));
    ctx.strokeStyle = '#4f5f5b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(mx, my + mh * 0.12); ctx.lineTo(vx - fw, vy - fh * 0.8); ctx.stroke();
    // капли
    var d = (t * 0.8) % 1; ctx.fillStyle = 'rgba(160,220,255,.7)'; ctx.fillRect(X(0.32), Y(0.3 + d * 0.5), 2, 5);
  }

function hnSceneVent(mx, my, mw, mh, X, Y) {
    var i, g = ctx.createLinearGradient(0, my, 0, my + mh); g.addColorStop(0, '#2a2e30'); g.addColorStop(1, '#101314'); ctx.fillStyle = g; ctx.fillRect(mx, my, mw, mh);
    var vx = X(0.5), vy = Y(0.5), fw = mw * 0.09, fh = mh * 0.16;
    ctx.fillStyle = '#080a0b'; ctx.fillRect(vx - fw, vy - fh, fw * 2, fh * 2);
    ctx.fillStyle = '#3a4144'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(vx - fw, vy - fh); ctx.lineTo(vx - fw, vy + fh); ctx.lineTo(mx, my + mh); ctx.fill();
    ctx.fillStyle = '#464e52'; ctx.beginPath(); ctx.moveTo(mx + mw, my); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(mx + mw, my + mh); ctx.fill();
    ctx.fillStyle = '#2b3235'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + mw, my); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx - fw, vy - fh); ctx.fill();
    ctx.fillStyle = '#1a1f21'; ctx.beginPath(); ctx.moveTo(mx, my + mh); ctx.lineTo(mx + mw, my + mh); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(vx - fw, vy + fh); ctx.fill();
    ctx.strokeStyle = 'rgba(150,170,180,.28)'; ctx.lineWidth = 3;
    for (i = 1; i < 7; i++) { var q = Math.pow(i / 7, 1.6), yy = hnLerp(vy - fh, my, q), y2 = hnLerp(vy + fh, my + mh, q); ctx.beginPath(); ctx.moveTo(hnLerp(vx - fw, mx, q), yy); ctx.lineTo(hnLerp(vx + fw, mx + mw, q), yy); ctx.moveTo(hnLerp(vx - fw, mx, q), y2); ctx.lineTo(hnLerp(vx + fw, mx + mw, q), y2); ctx.stroke(); }
    ctx.fillStyle = hn.vn > 0.5 ? 'rgba(190,200,205,.9)' : 'rgba(40,50,55,.5)'; for (i = 0; i < 6; i++) ctx.fillRect(vx - fw * 0.9, vy - fh * 0.9 + i * fh * 0.36, fw * 1.8, fh * 0.12);
    var fl = Math.sin(t * 6) > -0.6 ? 0.6 : 0.2; csGlow(vx, vy, mh * 0.35, '156,208,255', 0.12 * fl);
  }

function hnDrawCam(w, h) {
    var sel = hn.camSel, mx = w * 0.08, my = h * 0.22, mw = w * 0.84, mh = h * 0.54, i, e, seen, sh = Math.sin(t * 0.5) * 3;
    var X = function (f) { return mx + mw * f; }, Y = function (f) { return my + mh * f; };
    ctx.fillStyle = '#05100a'; ctx.fillRect(mx - 10, my - 10, mw + 20, mh + 20);
    ctx.save(); ctx.beginPath(); ctx.rect(mx, my, mw, mh); ctx.clip(); ctx.translate(sh, 0);
    if (sel === 0) hnSceneKitchen(mx, my, mw, mh, X, Y); else if (sel === 1) hnSceneHall(mx, my, mw, mh, X, Y); else if (sel === 4) hnSceneVent(mx, my, mw, mh, X, Y); else hnSceneCorr(mx, my, mw, mh, X, Y, sel === 2 ? 'l' : 'r');
    if (sel === 0 && hn.night >= 3 && hn.mP > 0.2 && img.mell && ready(img.mell)) { var mi = img.mell, mhh = mh * 0.55, mww = mhh * 224 / 99, mfi = Math.floor(t * 10) % 125; ctx.save(); ctx.globalAlpha = Math.min(0.9, (hn.mP - 0.15) * 1.3); ctx.drawImage(mi, (mfi % 9) * 224, Math.floor(mfi / 9) * 99, 224, 99, X(0.15 + hn.mP * 0.3) - mww / 2, Y(0.9) - mhh, mww, mhh); ctx.restore(); }
    var here = 0, glitch = 0;
    for (i = 0; i < hn.en.length; i++) { e = hn.en[i]; seen = hn.bo > 0 ? null : hnCamSeen(e, sel); if (!seen) continue; here++; if (sel >= 2 && e.pos > 2.6) glitch = 1; hnSprite(e, X(seen.x), Y(seen.fy), mh * seen.hh, seen.a); if (sel >= 2 && e.st === 3 && Math.abs(e.pos - 3) < 0.1) hnEyes(X(seen.x), Y(seen.fy) - mh * seen.hh * 0.82, 4); }
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(mx, my, mw, mh); ctx.clip();
    ctx.fillStyle = 'rgba(10,50,30,.22)'; ctx.fillRect(mx, my, mw, mh);
    if (hn.bo > 0) { ctx.fillStyle = '#0a0f0c'; ctx.fillRect(mx, my, mw, mh); for (i = 0; i < 300; i++) { ctx.fillStyle = 'rgba(200,255,220,' + (Math.random() * 0.5).toFixed(2) + ')'; ctx.fillRect(mx + Math.random() * mw, my + Math.random() * mh, 3, 2); } ctx.fillStyle = '#9dffc4'; ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('НЕТ СИГНАЛА', mx + mw / 2, my + mh / 2); ctx.textAlign = 'left'; }
    var vg = ctx.createRadialGradient(mx + mw / 2, my + mh / 2, mh * 0.3, mx + mw / 2, my + mh / 2, mw * 0.65); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.65)'); ctx.fillStyle = vg; ctx.fillRect(mx, my, mw, mh);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; for (i = 0; i < mh; i += 3) ctx.fillRect(mx, my + i, mw, 1);
    for (i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(200,255,220,' + (Math.random() * 0.1).toFixed(2) + ')'; ctx.fillRect(mx + Math.random() * mw, my + Math.random() * mh, 2 + Math.random() * 40, 1); }
    var bandY = my + ((t * 70) % (mh + 40)) - 20; ctx.fillStyle = 'rgba(190,255,215,.05)'; ctx.fillRect(mx, bandY, mw, 18);
    if (glitch || Math.random() < 0.01) { var gy = my + Math.random() * mh; ctx.drawImage(ctx.canvas, mx * dpr, gy * dpr, mw * dpr, 10 * dpr, mx + (Math.random() - 0.5) * 30, gy, mw, 10); }
    ctx.restore();
    ctx.strokeStyle = '#6fd69a'; ctx.lineWidth = 3; ctx.strokeRect(mx, my, mw, mh);
    ctx.fillStyle = '#9dffc4'; ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('CAM ' + (sel + 1) + ' · ' + HN_CAMS[sel].toUpperCase(), mx + 14, my + 20);
    var hh = Math.floor(hn.t / HN_HOUR), mm = Math.floor((hn.t % HN_HOUR) / HN_HOUR * 60);
    ctx.fillText('ЧЕКУШКА-БУРГЕР · ' + (hh === 0 ? '12' : hh) + ':' + String(mm).padStart(2, '0') + ' AM', mx + 14, my + mh - 18);
    if (Math.floor(t * 2) % 2) { ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.arc(mx + mw - 62, my + 20, 6, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffd0d0'; ctx.textAlign = 'right'; ctx.fillText('REC', mx + mw - 14, my + 20); }
  }

function hnWinEnemy(e, wx, wy, ww, wh, lit, dr) {
    if (e.st < 2 || dr > 0.5) return;
    var q = Math.max(0, Math.min(1, (e.pos - 1.7) / 1.3)), hh = wh * hnLerp(0.45, 0.98, q), fy = wy + wh * hnLerp(0.7, 1.02, q), x = wx + ww / 2;
    if (lit) hnSprite(e, x, fy, hh, 1); else if (e.st >= 3) hnEyes(x, fy - hh * 0.8, Math.max(3, ww * 0.025));
  }

function drawHn() {
    var w = W, h = H, i, e, side, wy = h * 0.13, ww = Math.min(w * 0.25, 280), wh = h * 0.5, cx = w / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var jx = hn.over > 0 ? (Math.random() - 0.5) * 24 : 0, jy = hn.over > 0 ? (Math.random() - 0.5) * 24 : 0;
    ctx.save(); ctx.translate(jx, jy);
    var bg = ctx.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#2a1c24'); bg.addColorStop(1, '#120c12'); ctx.fillStyle = bg; ctx.fillRect(-30, -30, w + 60, h + 60);
    for (i = 0; i < 14; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.025)' : 'rgba(0,0,0,.06)'; ctx.fillRect(w * i / 14, 0, w / 14, h * 0.76); }
    var fl = Math.sin(t * 23) > 0.92 || (hn.out && Math.sin(t * 9) > 0.3) || hn.bo > 0 ? 0.3 : 1;
    ctx.fillStyle = '#3a1f1c'; ctx.fillRect(0, h * 0.58, w, 8);
    // часы на стене, плакат
    var ccx = cx, ccy = h * 0.2, cr = Math.min(h * 0.05, 26); ctx.fillStyle = '#e9e4d6'; ctx.beginPath(); ctx.arc(ccx - w * 0.2, ccy, cr, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 2; var ang = (hn.t / (HN_HOUR * 6)) * 6.28 * 0.5 - 1.57; ctx.beginPath(); ctx.moveTo(ccx - w * 0.2, ccy); ctx.lineTo(ccx - w * 0.2 + Math.cos(ang) * cr * 0.7, ccy + Math.sin(ang) * cr * 0.7); ctx.moveTo(ccx - w * 0.2, ccy); ctx.lineTo(ccx - w * 0.2, ccy - cr * 0.8); ctx.stroke();
    ctx.fillStyle = '#7a2a20'; ctx.fillRect(cx + w * 0.1, h * 0.14, w * 0.07, h * 0.12); ctx.fillStyle = '#ffd23f'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ОХРАНА', cx + w * 0.135, h * 0.2);
    for (side = 0; side < 2; side++) {
      e = hn.en[side]; var wx = side === 0 ? w * 0.05 : w - w * 0.05 - ww, lit = (side === 0 ? hn.ll : hn.lr) && hn.bo <= 0, dr = side === 0 ? hn.dl : hn.dr;
      ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
      var g = ctx.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, lit ? '#59708a' : '#06080c'); g.addColorStop(1, lit ? '#2c3848' : '#0a0d14'); ctx.fillStyle = g; ctx.fillRect(wx, wy, ww, wh);
      ctx.strokeStyle = lit ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.05)'; ctx.lineWidth = 2;
      for (i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(wx + ww * (side === 0 ? 0 : 1), wy + wh * i / 6); ctx.lineTo(wx + ww * (side === 0 ? 1 : 0), wy + wh * 0.58); ctx.stroke(); }
      if (lit) { ctx.fillStyle = 'rgba(255,255,230,' + (0.08 + 0.04 * Math.sin(t * 40)) + ')'; ctx.fillRect(wx, wy, ww, wh); }
      hnWinEnemy(e, wx, wy, ww, wh, lit, dr);
      if (dr > 0.02) { var dh = wh * dr; ctx.fillStyle = '#4a4e58'; ctx.fillRect(wx, wy, ww, dh); ctx.fillStyle = '#ffd23f'; for (i = 0; i * 26 < dh; i++) ctx.fillRect(wx, wy + i * 26, ww, 6); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(wx, wy + dh - 8, ww, 8); }
      ctx.restore();
      ctx.strokeStyle = '#2b2530'; ctx.lineWidth = 8; ctx.strokeRect(wx, wy, ww, wh);
      ctx.fillStyle = '#c9b8a8'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(side === 0 ? 'ЛЕВАЯ ДВЕРЬ' : 'ПРАВАЯ ДВЕРЬ', wx + ww / 2, wy + wh + 14);
    }
    // щит камер на стене по центру
    var sbw = Math.min(w * 0.2, 220), sbh = h * 0.3, sbx = cx - sbw / 2, sby = h * 0.2;
    ctx.fillStyle = '#10181a'; rrect(sbx - 6, sby - 6, sbw + 12, sbh + 12, 8); ctx.fill(); ctx.fillStyle = '#0a1812'; ctx.fillRect(sbx, sby, sbw, sbh);
    for (i = 0; i < 4; i++) { var tx2 = sbx + 6 + (i % 2) * (sbw / 2 - 3), ty2 = sby + 6 + Math.floor(i / 2) * (sbh / 2 - 3); ctx.fillStyle = i === hn.camSel && hn.cam ? 'rgba(111,214,154,.5)' : 'rgba(111,214,154,.18)'; ctx.fillRect(tx2, ty2, sbw / 2 - 12, sbh / 2 - 12); ctx.fillStyle = '#9dffc4'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CAM ' + (i + 1), tx2 + (sbw / 2 - 12) / 2, ty2 + (sbh / 2 - 12) / 2); }
    // стол
    ctx.fillStyle = '#3a2418'; ctx.fillRect(0, h * 0.74, w, h * 0.26); ctx.fillStyle = '#5a3a28'; ctx.fillRect(0, h * 0.74, w, 8); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, h * 0.74 + 8, w, 6);
    // вентиляционная решётка (со 2 ночи)
    if (hn.night >= 2) {
      var vgx = cx + w * 0.125, vgy = h * 0.43, vgw = Math.min(w * 0.085, 90), vgh = vgw * 0.62, ven = hn.en[2];
      ctx.fillStyle = '#10181a'; ctx.fillRect(vgx - 5, vgy - 5, vgw + 10, vgh + 10); ctx.fillStyle = '#05080a'; ctx.fillRect(vgx, vgy, vgw, vgh);
      if (ven && hn.vn < 0.5) { if (ven.st >= 3) hnEyes(vgx + vgw / 2, vgy + vgh * 0.5, Math.max(3, vgw * 0.04)); else if (ven.st === 2) { ctx.fillStyle = 'rgba(255,60,60,.35)'; ctx.beginPath(); ctx.arc(vgx + vgw / 2 - 6, vgy + vgh / 2, 2.5, 0, 6.3); ctx.arc(vgx + vgw / 2 + 6, vgy + vgh / 2, 2.5, 0, 6.3); ctx.fill(); } }
      var sl = 6; for (i = 0; i < sl; i++) { ctx.fillStyle = '#6d777c'; ctx.fillRect(vgx, vgy + (i / sl) * vgh * (1 - hn.vn * 0.15) + (hn.vn < 0.5 ? -hn.vn * vgh * 0.4 * (1 - i / sl) : 0) * 0 , vgw, vgh / sl * (0.2 + 0.7 * hn.vn)); }
      ctx.fillStyle = '#c9b8a8'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ВЕНТ [5]', vgx + vgw / 2, vgy + vgh + 16);
    }
    // монитор на столе с живой картинкой
    var mw2 = Math.min(w * 0.12, 120), mh2 = mw2 * 0.62, mx2 = cx + w * 0.1, my2 = h * 0.74 - mh2 + 4;
    ctx.fillStyle = '#16191a'; ctx.fillRect(mx2 - 6, my2 - 6, mw2 + 12, mh2 + 12); ctx.fillStyle = '#0a1812'; ctx.fillRect(mx2, my2, mw2, mh2);
    ctx.fillStyle = 'rgba(111,214,154,' + (0.25 + 0.1 * Math.sin(t * 5)).toFixed(2) + ')'; ctx.fillRect(mx2, my2, mw2, mh2); ctx.fillStyle = '#9dffc4'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CAM ' + (hn.camSel + 1), mx2 + mw2 / 2, my2 + mh2 / 2);
    for (i = 0; i < hn.en.length; i++) { var sn = hn.bo > 0 ? null : hnCamSeen(hn.en[i], hn.camSel); if (sn) { ctx.fillStyle = '#ff5a4a'; ctx.beginPath(); ctx.arc(mx2 + mw2 * (0.15 + sn.x * 0.7), my2 + mh2 * 0.75, 3, 0, 6.3); ctx.fill(); } }
    // вентилятор
    var fx = cx - w * 0.2, fy = h * 0.74 - 22; ctx.fillStyle = '#222'; ctx.fillRect(fx - 3, fy, 6, 22); ctx.fillStyle = 'rgba(180,200,210,.7)'; for (i = 0; i < 3; i++) { var fa = t * 12 + i * 2.09; ctx.beginPath(); ctx.ellipse(fx, fy - 4, 18, 4, fa, 0, 6.3); ctx.fill(); }
    // чашка кофе
    ctx.fillStyle = '#e9e4d6'; ctx.fillRect(cx - w * 0.07, h * 0.74 - 12, 14, 12); ctx.fillStyle = 'rgba(220,220,220,.4)'; ctx.fillRect(cx - w * 0.07 + 4 + Math.sin(t * 2) * 2, h * 0.74 - 22 - (t * 8) % 10, 3, 8);
    var hr = Math.min(5, hn.hour), tx = (hr === 0 ? '12' : String(hr)) + ':' + String(Math.floor((hn.t % HN_HOUR) / HN_HOUR * 6) * 10).padStart(2, '0') + ' ночи';
    ctx.fillStyle = 'rgba(0,0,0,.55)'; rrect(cx - 120, h * 0.02, 240, 60, 12); ctx.fill();
    ctx.fillStyle = '#ff9a6a'; ctx.font = '700 20px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ГОЛОДНАЯ НОЧЬ ' + hn.night, cx, h * 0.02 + 18);
    ctx.fillStyle = '#fff'; ctx.font = '700 17px "Rubik", system-ui, sans-serif'; ctx.fillText(tx, cx, h * 0.02 + 42);
    var pc = Math.ceil(hn.pw), pw = Math.min(240, w * 0.34), bx = cx - pw / 2, by = h * 0.775;
    ctx.fillStyle = 'rgba(0,0,0,.6)'; rrect(bx - 6, by - 6, pw + 12, 40, 8); ctx.fill();
    ctx.fillStyle = pc > 25 ? '#3ddc84' : (pc > 10 ? '#ffb020' : '#ff4a4a'); ctx.fillRect(bx, by, pw * hn.pw / 100, 12);
    ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillText('Энергия ' + pc + '%', cx, by + 24);
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(bx, by - 14, pw, 3); ctx.fillStyle = '#ffd23f'; ctx.fillRect(bx, by - 14, pw * Math.min(1, hn.t / (HN_HOUR * 6)), 3);
    var line = hn.tut > 0 && hn.t < 14 ? 'Свет показывает, кто в окне. Закрой дверь, пока враг у двери. Камеры (C) видят, кто идёт. Клавиши 1–4.' : (hn.msgT > 0 ? hn.msg : '');
    if (line) { ctx.font = '700 14px "Rubik", system-ui, sans-serif'; var lw = Math.min(w - 20, ctx.measureText(line).width + 28); ctx.fillStyle = 'rgba(0,0,0,.65)'; rrect(cx - lw / 2, h * 0.7 - 70, lw, 32, 12); ctx.fill(); ctx.fillStyle = '#ffe9a8'; ctx.fillText(line, cx, h * 0.7 - 54); }
    for (i = 0; i < hn.en.length; i++) { e = hn.en[i]; if (e.st === 3 && !hnDoorClosed(e) && hn.over <= 0) { ctx.fillStyle = 'rgba(255,40,40,' + (0.12 + 0.1 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(i === 0 ? 0 : (i === 1 ? w / 2 : w * 0.3), 0, i === 2 ? w * 0.4 : w / 2, h); } }
    if (fl < 1 || hn.out) { ctx.fillStyle = 'rgba(0,0,0,' + (hn.out ? 0.55 : 0.35) + ')'; ctx.fillRect(-30, -30, w + 60, h + 60); }
    if (hn.cam && hn.over <= 0) hnDrawCam(w, h);
    ctx.restore();
    if (hn.over > 0 && hn.who) {
      ctx.fillStyle = 'rgba(120,0,0,' + (0.5 + 0.3 * Math.sin(t * 40)).toFixed(2) + ')'; ctx.fillRect(0, 0, w, h);
      var im = hnEnemyImg(hn.who), k = Math.min(1, (2.2 - hn.over) * 6 + 0.3);
      if (im) { var jh = h * (0.7 + 0.5 * k), jw = jh * im.naturalWidth / im.naturalHeight; if (hn.who.k === 'f') { try { ctx.filter = 'hue-rotate(150deg) saturate(1.5)'; } catch (x3) {} } ctx.drawImage(im, w / 2 - jw / 2 + jx, h - jh + jy, jw, jh); try { ctx.filter = 'none'; } catch (x4) {} }
      ctx.fillStyle = '#fff'; ctx.font = '700 28px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(hn.who.name.toUpperCase() + ' ГОЛОДЕН!', w / 2, h * 0.14);
    }
    if (hn.win > 0) { ctx.fillStyle = 'rgba(255,220,120,' + Math.min(0.5, (2.4 - hn.win) * 0.3).toFixed(2) + ')'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#fff'; ctx.font = '700 34px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('6:00 · СМЕНА ОКОНЧЕНА', w / 2, h * 0.5); }
  }

function bgNpc(key, x, hgt, flip, bobAmp) {
    var im = img[key]; if (!ready(im)) return;
    var w = hgt * im.naturalWidth / im.naturalHeight, b = Math.sin(t * 2 + x) * (bobAmp || 1.5);
    ctx.save(); ctx.translate(x, gY - b); if (flip) ctx.scale(-1, 1); ctx.drawImage(im, -w / 2, -hgt, w, hgt); ctx.restore();
  }

function drawBurgerCashier(x0, x1) {
    var i, q;
    // работник за стойкой заказов
    if (BG_C > x0 - 300 && BG_C < x1 + 300) bgNpc('worker', BG_C, 220, false);
    // зал: панорамные окна на ночную улицу, диваны, растения, автомат с напитками
    for (i = 0; i < 4; i++) {
      var wx = 1180 + i * 300; if (wx < x0 - 200 || wx > x1 + 200) continue;
      ctx.fillStyle = nightK() > 0.3 ? '#14223f' : '#9fd4f0'; ctx.fillRect(wx - 110, gY - 330, 220, 190); ctx.strokeStyle = '#6a3a20'; ctx.lineWidth = 8; ctx.strokeRect(wx - 110, gY - 330, 220, 190); ctx.beginPath(); ctx.moveTo(wx, gY - 330); ctx.lineTo(wx, gY - 140); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(wx - 100, gY - 320); ctx.lineTo(wx - 50, gY - 320); ctx.lineTo(wx - 90, gY - 150); ctx.lineTo(wx - 100, gY - 150); ctx.fill();
    }
    [1240, 1920].forEach(function (px) { if (px < x0 - 100 || px > x1 + 100) return; ctx.fillStyle = '#7a4a2a'; ctx.fillRect(px - 22, gY - 54, 44, 54); ctx.fillStyle = '#2f8a3a'; for (var k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(px + Math.sin(k * 1.9) * 16, gY - 80 - k * 10, 10, 26, Math.sin(k) * 0.5, 0, 6.3); ctx.fill(); } });
    var dm = 2400; if (dm > x0 - 100 && dm < x1 + 100) { ctx.fillStyle = '#b02030'; rrect(dm - 44, gY - 190, 88, 190, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(dm - 34, gY - 170, 68, 70); ctx.fillStyle = '#ffd23f'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('КОЛА', dm, gY - 180 + 4); ctx.fillStyle = Math.sin(t * 3) > 0 ? '#3ddc84' : '#1c5a38'; ctx.fillRect(dm - 20, gY - 90, 40, 8); }
    // коридор к офису охраны
    var cx0 = 3000; if (x1 > cx0 - 60) {
      ctx.fillStyle = '#2c3a3e'; ctx.fillRect(cx0, gY - 2600, 1200, 2240); ctx.fillStyle = '#2c3a3e'; ctx.fillRect(cx0, gY - 360, 1200, 360); ctx.fillStyle = '#3a4a50'; for (q = cx0; q < 4200; q += 90) ctx.fillRect(q, gY - 360, 4, 250);
      ctx.fillStyle = '#1c2224'; ctx.fillRect(cx0, gY - 114, 1200, 8); ctx.fillStyle = '#121618'; ctx.fillRect(cx0, gY - 106, 1200, 106);
      for (q = cx0 + 160; q < 4200; q += 380) { var on = Math.sin(t * 9 + q) > -0.7; ctx.fillStyle = on ? 'rgba(210,255,235,.85)' : 'rgba(210,255,235,.2)'; ctx.fillRect(q - 50, gY - 350, 100, 8); }
      ctx.fillStyle = '#3a2a1a'; ctx.fillRect(cx0 + 30, gY - 300, 80, 12); ctx.fillStyle = '#0a1810'; ctx.fillRect(cx0 + 360, gY - 250, 150, 110); ctx.strokeStyle = '#6fd69a'; ctx.lineWidth = 3; ctx.strokeRect(cx0 + 360, gY - 250, 150, 110); ctx.fillStyle = '#6fd69a'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CAM 1 · КУХНЯ', cx0 + 435, gY - 195);
      // дверь офиса охраны
      var dx = GUARD_X + 160; ctx.fillStyle = '#18202a'; ctx.fillRect(dx - 70, gY - 230, 140, 230); ctx.fillStyle = '#243040'; ctx.fillRect(dx - 60, gY - 220, 120, 220); ctx.fillStyle = '#9ad0ff'; ctx.fillRect(dx - 24, gY - 190, 48, 56); ctx.fillStyle = '#ffd23f'; ctx.fillRect(dx - 70, gY - 262, 140, 28); ctx.fillStyle = '#14233f'; ctx.font = '700 14px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillText('ОФИС ОХРАНЫ', dx, gY - 247);
      bgNpc('guard', GUARD_X, 215, false, 1);
    }
  }

function burgerTalk() {
    dlgShow('Повар «Чекушка-Бургера»', null, 'Добро пожаловать! Съешь бургер, и ты снова станешь жирным, как настоящий петух. Каждый бургер даёт заряд буста: жир-территория с зарядом длится 16 секунд вместо 10, бьёт в 2,5 раза сильнее, режет урон на 70% и перезаряжается за 18 секунд.', [
      { t: 'Бургер · ' + fmtN(BG_FAT) + ' (+1 заряд)', fn: function () { burgerEat(1, BG_FAT, 'Бургер'); } },
      { t: 'Двойной · ' + fmtN(BG_DBL) + ' (+2 заряда)', fn: function () { burgerEat(2, BG_DBL, 'Двойной бургер'); } },
      { t: 'Мега-бургер · ' + fmtN(BG_MEGA) + ' (+4 заряда)', fn: function () { burgerEat(4, BG_MEGA, 'Мега-бургер'); } },
      { t: 'Уйти', out: true }
    ], burgerInfo() + (save.mx.mg ? '' : ' · буст пригодится, когда откроешь магию'));
  }

function mnC(v, a, b) { return v < a ? a : (v > b ? b : v); }

function miniBuild() {
    if (miniEl) return;
    var st = document.createElement('style');
    st.textContent = '#miniOv{position:fixed;inset:0;z-index:99990;background:rgba(6,8,18,.86);display:flex;align-items:center;justify-content:center;font-family:Rubik,system-ui,sans-serif;color:#fff;touch-action:none;user-select:none}#miniOv[hidden]{display:none!important}' +
      '#miniPn{width:min(94vw,600px);background:linear-gradient(#1b2340,#10162b);border:2px solid #ffd27a;border-radius:16px;padding:12px 14px;box-shadow:0 12px 50px rgba(0,0,0,.6)}' +
      '#miniPn h3{margin:0 0 2px;font-size:18px;color:#ffd27a}#miniHint{font-size:13px;opacity:.85;min-height:34px;margin-bottom:6px}#miniCv{border-radius:10px;background:#0b1020;display:block;margin:0 auto}.mnRow[hidden],.mnB[hidden]{display:none!important}' +
      '#miniSt{font-size:14px;margin:6px 0;min-height:20px;text-align:center}.mnRow{display:flex;gap:8px;justify-content:center;margin-top:6px}.mnB{flex:1;max-width:150px;min-height:54px;font-size:22px;font-weight:700;border-radius:12px;border:2px solid #ffd27a;background:#27325c;color:#fff;touch-action:none}.mnB.on{background:#ffd27a;color:#222}#miniX{float:right;background:none;border:0;color:#fff;font-size:20px;opacity:.7}';
    document.head.appendChild(st);
    miniEl = document.createElement('div'); miniEl.id = 'miniOv'; miniEl.hidden = true;
    miniEl.innerHTML = '<div id="miniPn"><button type="button" id="miniX">✕</button><h3 id="miniT"></h3><div id="miniHint"></div><canvas id="miniCv" width="560" height="320"></canvas><div id="miniSt"></div>' +
      '<div class="mnRow" id="mnMove"><button type="button" class="mnB" id="mnL">◀</button><button type="button" class="mnB" id="mnA">ЖМИ</button><button type="button" class="mnB" id="mnR">▶</button></div>' +
      '<div class="mnRow" id="mnSym" hidden><button type="button" class="mnB" data-s="0">✝</button><button type="button" class="mnB" data-s="1">☀</button><button type="button" class="mnB" data-s="2">☾</button><button type="button" class="mnB" data-s="3">★</button></div></div>';
    document.body.appendChild(miniEl);
    function hd(id, on, off) { var b = document.getElementById(id); b.addEventListener('pointerdown', function (e) { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {} b.classList.add('on'); on(); }); function up() { b.classList.remove('on'); if (off) off(); } b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up); }
    hd('mnL', function () { if (mini) mini.k.l = true; }, function () { if (mini) mini.k.l = false; });
    hd('mnR', function () { if (mini) mini.k.r = true; }, function () { if (mini) mini.k.r = false; });
    hd('mnA', function () { miniAct(); });
    Array.prototype.forEach.call(miniEl.querySelectorAll('[data-s]'), function (b) { b.addEventListener('pointerdown', function (e) { e.preventDefault(); miniSym(+b.getAttribute('data-s')); }); });
    document.getElementById('miniX').addEventListener('click', function () { miniEnd(false); });
    window.addEventListener('keydown', function (e) {
      if (!miniOpen || !mini) return; var c = e.code; e.preventDefault(); e.stopImmediatePropagation();
      if (c === 'Escape') { miniEnd(false); return; }
      if (mini.g && mini.g.sym) { var m = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3, Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, KeyA: 0, KeyW: 1, KeyD: 2, KeyS: 3 }[c]; if (m !== undefined && !e.repeat) miniSym(m); return; }
      if (c === 'ArrowLeft' || c === 'KeyA') mini.k.l = true; else if (c === 'ArrowRight' || c === 'KeyD') mini.k.r = true;
      else if ((c === 'Space' || c === 'Enter' || c === 'KeyE' || c === 'ArrowUp' || c === 'KeyW') && !e.repeat) miniAct();
    }, true);
    window.addEventListener('keyup', function (e) { if (!miniOpen || !mini) return; var c = e.code; if (c === 'ArrowLeft' || c === 'KeyA') mini.k.l = false; else if (c === 'ArrowRight' || c === 'KeyD') mini.k.r = false; }, true);
  }

function miniFit() { var cv = document.getElementById('miniCv'), pw = Math.min(window.innerWidth * 0.94, 600) - 32, h = Math.max(120, Math.min(window.innerHeight * 0.44, pw * 320 / 560)); cv.style.height = h + 'px'; cv.style.width = (h * 560 / 320) + 'px'; }

function miniAct() { if (mini && mini.ph === 'run' && mini.g.act) mini.g.act(); }

function miniSym(i) { if (mini && mini.ph === 'run' && mini.g.symp) mini.g.symp(i); }

function miniRun(list, d, head, cb) {
    miniBuild(); mini = { list: list, d: d, i: -1, head: head, cb: cb, k: { l: false, r: false }, ph: 'intro', t: 0, g: null, last: 0, retry: list.length >= 4 ? 2 : (list.length >= 2 ? 1 : 0) };
    miniOpen = true; syncPause(); miniEl.hidden = false; miniNext(); mini.last = performance.now(); requestAnimationFrame(miniLoop);
  }

function miniNext(again) {
    if (!again) mini.i++; mini.g = mini.list[mini.i](mini.d); mini.ph = 'intro'; mini.t = 0; mini.k.l = mini.k.r = false;
    document.getElementById('miniT').textContent = mini.head + (mini.list.length > 1 ? ' · испытание ' + (mini.i + 1) + ' из ' + mini.list.length + (mini.retry > 0 ? ' · запас попыток: ' + mini.retry : '') : '');
    document.getElementById('miniHint').textContent = mini.g.hint;
    document.getElementById('mnMove').hidden = !!mini.g.sym; document.getElementById('mnSym').hidden = !mini.g.sym;
    miniFit(); document.getElementById('mnA').hidden = !mini.g.act; document.getElementById('mnL').hidden = !mini.g.mv; document.getElementById('mnR').hidden = !mini.g.mv;
  }

function miniEnd(ok) {
    if (!mini) return; var cb = mini.cb; mini = null; miniOpen = false; miniEl.hidden = true; syncPause();
    try { if (cb) cb(ok); } catch (e) { console.error(e); }
  }

function miniLoop(now) {
    if (!miniOpen || !mini) return;
    var dt = Math.min(0.05, (now - mini.last) / 1000); mini.last = now; mini.t += dt;
    var cv = document.getElementById('miniCv'), c = cv.getContext('2d'), g = mini.g;
    if (mini.ph === 'intro') { if (mini.t > 1.8) { mini.ph = 'run'; mini.t = 0; } }
    else if (mini.ph === 'run') { var r = g.upd(dt, mini.k); if (r === 1) { mini.ph = 'win'; mini.t = 0; sfx('rare'); } else if (r === -1) { mini.ph = 'lose'; mini.t = 0; sfx('no'); } }
    else if (mini.ph === 'win' && mini.t > 0.9) { if (mini.i + 1 < mini.list.length) miniNext(); else { miniEnd(true); return; } }
    else if (mini.ph === 'lose' && mini.t > 1.1) { if (mini.retry > 0) { mini.retry--; miniNext(true); } else { miniEnd(false); return; } }
    c.clearRect(0, 0, 560, 320); g.draw(c);
    if (mini.ph !== 'run') {
      c.fillStyle = 'rgba(6,8,18,' + (mini.ph === 'intro' ? 0.7 : 0.45) + ')'; c.fillRect(0, 0, 560, 320); c.textAlign = 'center';
      c.font = '700 30px Rubik,system-ui,sans-serif'; c.fillStyle = mini.ph === 'lose' ? '#ff8a8a' : (mini.ph === 'win' ? '#9dffb0' : '#ffd27a');
      c.fillText(mini.ph === 'intro' ? g.title : (mini.ph === 'win' ? 'Получилось!' : (mini.retry > 0 ? 'Сорвалось... ещё шанс' : 'Сорвалось...')), 280, 160);
    }
    document.getElementById('miniSt').textContent = mini.ph === 'run' ? g.st() : '';
    requestAnimationFrame(miniLoop);
  }

function mnBg(c, a, b) { var g = c.createLinearGradient(0, 0, 0, 320); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; c.fillRect(0, 0, 560, 320); }

function mnFlame(c, x, y, s, tt) { c.save(); c.translate(x, y); var f = 1 + 0.12 * Math.sin(tt * 14 + x); c.fillStyle = 'rgba(255,170,60,.35)'; c.beginPath(); c.arc(0, 0, 20 * s * f, 0, 6.3); c.fill(); c.fillStyle = '#ffb02e'; c.beginPath(); c.ellipse(0, 0, 8 * s, 14 * s * f, 0, 0, 6.3); c.fill(); c.fillStyle = '#fff3a0'; c.beginPath(); c.ellipse(0, 3 * s, 4 * s, 8 * s * f, 0, 0, 6.3); c.fill(); c.restore(); }

function gFlames(d) {
    var need = 7 + Math.round(5 * d), lives = d > 0.7 ? 3 : 4, got = 0, bx = 280, items = [], sp = 0.6, tm = 0, fl = 0;
    return { mv: true, title: 'Лови огоньки', hint: 'Двигай чашу ◀ ▶ и лови огоньки. Водяных капель избегай. Нужно ' + need + '.',
      upd: function (dt, k) {
        tm += dt; fl = Math.max(0, fl - dt * 3); bx = mnC(bx + ((k.r ? 1 : 0) - (k.l ? 1 : 0)) * 430 * dt, 40, 520); sp -= dt;
        if (sp <= 0) { sp = 0.95 - 0.3 * d + Math.random() * 0.3; items.push({ x: 30 + Math.random() * 500, y: -10, bad: Math.random() < 0.12 + 0.15 * d, vy: 130 + 90 * d + Math.random() * 40 }); }
        for (var i = items.length - 1; i >= 0; i--) { var it = items[i]; it.y += it.vy * dt;
          if (it.y > 262 && it.y < 300 && Math.abs(it.x - bx) < 54) { items.splice(i, 1); if (it.bad) { lives--; fl = 1; } else got++; }
          else if (it.y > 330) { items.splice(i, 1); if (!it.bad) { lives--; fl = 1; } } }
        return got >= need ? 1 : (lives <= 0 ? -1 : 0);
      },
      draw: function (c) {
        mnBg(c, '#1c1840', '#0e0c20'); items.forEach(function (it) { if (it.bad) { c.fillStyle = '#5ab4ff'; c.beginPath(); c.moveTo(it.x, it.y - 14); c.quadraticCurveTo(it.x + 12, it.y + 4, it.x, it.y + 10); c.quadraticCurveTo(it.x - 12, it.y + 4, it.x, it.y - 14); c.fill(); } else mnFlame(c, it.x, it.y, 1, tm); });
        c.fillStyle = '#b98a4a'; c.beginPath(); c.moveTo(bx - 44, 270); c.lineTo(bx + 44, 270); c.lineTo(bx + 30, 300); c.lineTo(bx - 30, 300); c.closePath(); c.fill(); c.fillStyle = '#ffd27a'; c.fillRect(bx - 46, 266, 92, 6);
        if (fl > 0) { c.fillStyle = 'rgba(255,60,60,' + (fl * 0.35).toFixed(2) + ')'; c.fillRect(0, 0, 560, 320); }
      }, _s: function () { return { items: items, bx: bx }; }, st: function () { return 'Огоньков: ' + got + ' из ' + need + ' · жизни: ' + lives; } };
  }

function gTiming(d) {
    var hits = 0, need = 4 + Math.round(1.5 * d), lives = 3, pos = 0, dir = 1, zone = 120 - 40 * d, zc = 230, fl = 0, fc = '#fff';
    function nz() { zc = zone / 2 + 10 + Math.random() * (460 - zone - 20); }
    nz();
    return { title: 'Точный миг', hint: 'Жми, когда бегунок в золотой зоне. Зона чуть сужается. Нужно ' + need + ' попаданий. Можно промахнуться дважды.',
      upd: function (dt) { fl = Math.max(0, fl - dt * 2.5); pos += dir * (230 + 110 * d + 15 * hits) * dt; if (pos > 460) { pos = 460; dir = -1; } if (pos < 0) { pos = 0; dir = 1; } return hits >= need ? 1 : (lives <= 0 ? -1 : 0); },
      act: function () { if (Math.abs(pos - zc) < zone / 2) { hits++; fl = 1; fc = '#7dff9a'; zone *= 0.95; nz(); sfx('pick'); } else { lives--; fl = 1; fc = '#ff6b6b'; sfx('no'); } },
      draw: function (c) {
        mnBg(c, '#241a3a', '#120d22'); c.fillStyle = '#0a0816'; c.fillRect(50, 140, 460, 40); c.fillStyle = 'rgba(255,210,122,.55)'; c.fillRect(50 + zc - zone / 2, 140, zone, 40); c.strokeStyle = '#ffd27a'; c.lineWidth = 2; c.strokeRect(50 + zc - zone / 2, 140, zone, 40);
        c.fillStyle = '#fff'; c.fillRect(48 + pos, 128, 6, 64); c.beginPath(); c.moveTo(51 + pos, 196); c.lineTo(44 + pos, 210); c.lineTo(58 + pos, 210); c.fill();
        if (fl > 0) { c.globalAlpha = fl * 0.35; c.fillStyle = fc; c.fillRect(0, 0, 560, 320); c.globalAlpha = 1; }
      }, _s: function () { return { pos: pos, dir: dir, zc: zc, zone: zone }; }, st: function () { return 'Попаданий: ' + hits + ' из ' + need + ' · промахи: ' + (3 - lives) + ' из 3'; } };
  }

function gMemory(d) {
    var n = 4 + Math.round(2 * d), seq = [], ph = 'show', tm = -0.6, inp = 0, fl = -1, fT = 0, mist = 0, maxM = d > 0.8 ? 0 : 1, show = 0.7 - 0.3 * d, res = 0, i;
    for (i = 0; i < n; i++) seq.push(Math.floor(Math.random() * 4));
    return { sym: true, title: 'Память молитвы', hint: 'Запомни порядок знаков и повтори его кнопками (или клавишами 1-4 / стрелками). ' + (maxM ? 'Одна ошибка прощается.' : 'Ошибаться нельзя.'),
      upd: function (dt) {
        fT = Math.max(0, fT - dt); if (ph === 'show') { tm += dt; var step = Math.floor(tm / (show + 0.18)); if (tm < 0) fl = -1; else if (step >= n) { ph = 'in'; inp = 0; fl = -1; } else fl = (tm % (show + 0.18)) < show ? seq[step] : -1; }
        else if (fT <= 0) fl = -1; return res;
      },
      symp: function (k) { if (ph !== 'in') return; fl = k; fT = 0.25; sfx('pick'); if (k === seq[inp]) { inp++; if (inp >= n) res = 1; } else { mist++; sfx('no'); if (mist > maxM) res = -1; else { ph = 'show'; tm = -0.8; } } },
      draw: function (c) {
        mnBg(c, '#20183a', '#0f0b1f'); for (var q = 0; q < 4; q++) { var x = 80 + q * 134, on = fl === q; c.fillStyle = on ? MN_COL[q] : 'rgba(255,255,255,.08)'; c.beginPath(); c.arc(x, 150, 52, 0, 6.3); c.fill(); if (on) { c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.arc(x, 150, 66, 0, 6.3); c.fill(); } c.fillStyle = on ? '#1a1030' : 'rgba(255,255,255,.45)'; c.font = '700 54px Rubik,system-ui,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(MN_SYM[q], x, 152); }
        c.fillStyle = 'rgba(255,255,255,.7)'; for (q = 0; q < n; q++) { c.beginPath(); c.arc(280 - (n - 1) * 12 + q * 24, 260, q < inp && ph === 'in' ? 7 : 4, 0, 6.3); c.fill(); }
      }, _s: function () { return { seq: seq, ph: ph }; }, st: function () { return ph === 'show' ? 'Смотри и запоминай…' : 'Твой ход: ' + inp + ' из ' + n + (maxM ? ' · ошибок: ' + mist + ' из 1' : ''); } };
  }

function gBalance(d) {
    var x = 0, v = 0, nzv = 0, T = 6 + Math.round(5 * d), ok = 0, out = 0, half = 89 - 30 * d, res = 0, OUTM = 1.6;
    return { mv: true, title: 'Устоять на молитве', hint: 'Держи шарик в зелёной зоне кнопками ◀ ▶. Нажимай коротко: шарик тормозит сам. Стрелка сверху показывает, куда его сносит. Вне зоны можно быть суммарно не дольше 1,6 с.',
      upd: function (dt, k) {
        nzv += (-1.5 * nzv * dt) + (Math.random() - 0.5) * 3.4 * Math.sqrt(dt);
        var a = nzv * (175 + 225 * d) + x * (0.7 + 1.2 * d) + ((k.r ? 1 : 0) - (k.l ? 1 : 0)) * 900; v += a * dt; v *= Math.max(0, 1 - 2.7 * dt); x += v * dt;
        if (x > 215) { x = 215; v = -Math.abs(v) * 0.3; } else if (x < -215) { x = -215; v = Math.abs(v) * 0.3; }
        if (Math.abs(x) > half) { out += dt; if (out > OUTM) return -1; } else out = Math.max(0, out - dt);
        ok += dt; return ok >= T ? 1 : 0;
      },
      draw: function (c) {
        mnBg(c, '#182a3a', '#0c1822'); c.fillStyle = 'rgba(125,255,154,.18)'; c.fillRect(280 - half, 120, half * 2, 80); c.strokeStyle = '#7dff9a'; c.lineWidth = 2; c.strokeRect(280 - half, 120, half * 2, 80);
        c.fillStyle = '#0a1018'; c.fillRect(70, 154, 420, 12); c.fillStyle = out > 0 ? '#ff8a8a' : '#ffd27a'; c.beginPath(); c.arc(280 + x, 160, 20, 0, 6.3); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(274 + x, 153, 6, 0, 6.3); c.fill();
        var wl = mnC(nzv * 150, -120, 120); c.strokeStyle = '#9cc4ff'; c.fillStyle = '#9cc4ff'; c.lineWidth = 4; c.beginPath(); c.moveTo(280, 70); c.lineTo(280 + wl, 70); c.stroke();
        if (Math.abs(wl) > 6) { var wd = wl > 0 ? 1 : -1; c.beginPath(); c.moveTo(280 + wl + wd * 12, 70); c.lineTo(280 + wl, 60); c.lineTo(280 + wl, 80); c.closePath(); c.fill(); }
        c.font = '600 12px Rubik,system-ui,sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(156,196,255,.8)'; c.fillText('ветер', 280, 46);
        c.fillStyle = '#ffd27a'; c.fillRect(70, 270, 420 * Math.min(1, ok / T), 8);
        c.fillStyle = 'rgba(255,138,138,.9)'; c.fillRect(70, 286, 420 * Math.min(1, out / OUTM), 5);
      }, _s: function () { return { x: x, v: v, nzv: nzv, half: half }; }, st: function () { return 'Держись: ' + Math.max(0, Math.ceil(T - ok)) + ' с' + (out > 0.05 ? ' · вне зоны!' : ''); } };
  }

function mnPick(n) { var a = MN_ALL.slice(), r = [], i; while (r.length < n && a.length) { i = Math.floor(Math.random() * a.length); r.push(a.splice(i, 1)[0]); } return r; }

function iceTalk() {
    if (ruinI()) { iceRuinTalk(); return; }
    dlgShow('Мороженщик', img.icev, 'Мороженое! Свежее, холодное и очень быстрое. Съешь рожок и побежишь, как ветер. Только донеси: рожок хрупкий, а руки у всех дрожат.', [
      { t: (save.mx.fri | 0) > 0 ? 'Взять рожок бесплатно (осталось ' + (save.mx.fri | 0) + ')' : 'Купить мороженое · ' + fmtN(ICE_PRICE), fn: iceBuy },
      { t: 'Что оно даёт?', fn: function () { dlgShow('Мороженщик', img.icev, 'Съел рожок: скорость +40% на ' + ICE_SEC + ' секунд. Рожки складываются по времени, но до трёх минут. А уронишь, не плачь: в церкви в лесу можно поставить за него свечку.', [{ t: 'Понятно', fn: iceTalk }, { t: 'Уйти', out: true }]); } },
      { t: 'Уйти', out: true }], iceT > 0 ? 'Буст ещё ' + Math.ceil(iceT) + ' с' : 'Уронено рожков: ' + (save.mx.icd | 0));
  }

function iceBuy() {
    var fr = (save.mx.fri | 0) > 0;
    if (!fr && save.coins < ICE_PRICE) { sfx('no'); dlgClose(); toast('Не хватает коинов на мороженое.', 2500); return; }
    if (fr) save.mx.fri--; else save.coins -= ICE_PRICE; hud(); persist(); dlgClose();
    miniRun(mnPick(1), 0.45, 'Донеси рожок', function (ok) {
      if (ok) { iceT = Math.min(180, iceT + ICE_SEC); save.mx.icn = (save.mx.icn | 0) + 1; persist(); sfx('rare'); popup(P.x, PLAYER_H + 30, 'Вкусно! Скорость +40%', '#ffd0e6'); toast('Мороженое съедено: скорость +40% на ' + Math.ceil(iceT) + ' с.', 3500); ach('icecream'); }
      else { save.mx.icd = (save.mx.icd | 0) + 1; persist(); popup(P.x, PLAYER_H + 30, 'Уронил мороженое!', '#ff9a9a'); toast('Рожок упал на землю. Можно поставить за него свечку в церкви (Лес, справа от Парка).', 5500); }
    });
  }

function candleTalk() {
    var ch = [];
    if ((save.mx.icd | 0) > 0) ch.push({ t: 'Свечка за уроненное мороженое (' + (save.mx.icd | 0) + ')', fn: function () { save.mx.icd--; save.mx.cdl = (save.mx.cdl | 0) + 1; persist(); dlgClose(); sfx('rare'); toast('Свечка за мороженое горит. Покойся с миром, рожок.', 4500); ach('candle'); } });
    ch.push({ t: 'Свечка за здоровье', fn: function () { save.mx.cdl = (save.mx.cdl | 0) + 1; hp = maxHp(); persist(); dlgClose(); sfx('rare'); toast('Свечка поставлена. Здоровье восстановлено.', 3000); } });
    ch.push({ t: 'Уйти', out: true });
    dlgShow('Подставка для свечей', null, 'Много огоньков. Свечи ставят за здоровье, за удачу и, по приколу, за уроненное мороженое.', ch, 'Горит свечей: ' + (save.mx.cdl | 0));
  }

function priestTalk() {
    var hol = save.mx.hol, ch = [];
    if (!hol) ch.push({ t: 'Научи меня своей магии', fn: priestTeach });
    else ch.push({ t: 'Благослови меня', fn: function () { hp = maxHp(); mgMana = mgCap(); dlgClose(); sfx('rare'); toast('Благословение: здоровье и магия полны.', 3500); } });
    if (hol && !save.mx.pas) ch.push({ t: 'Научи меня «Пустому сосуду»', fn: priestVessel });
    if (save.mx.c2l) ch.push({ t: 'О вере', fn: altarTalk });
    if ((save.mx.c2p | 0) >= 1 && !(save.mx.hv | 0)) ch.push({ t: 'Тебя что-то гложет?', fn: hvPriest1 });
    if ((save.mx.hv | 0) >= 3) ch.push({ t: 'Что ты думаешь о небесах?', fn: hvPriestAfter });
    ch.push({ t: 'Про мороженое и свечки', fn: function () { dlgShow('Священник', img.priest, 'Свечка за рожок? Ставь. Мне всё равно, за что просят, лишь бы от сердца. Хотя рожок, конечно, жалко.', [{ t: 'Назад', fn: priestTalk }]); } });
    ch.push({ t: 'Уйти', out: true });
    dlgShow('Священник', img.priest, save.mx.c2l && !save.mx.rel ? 'Мир рухнул наполовину, мороженщика и врача придавило, а я вот стою. Вера держится. Выбери, кому поклоняться: у алтаря.' : (hol ? 'Мир тебе, ученик. Святая магия с тобой: ёмкость больше, силы возвращаются быстрее, луч бьёт дальше.' : 'Мир тебе, дитя. Я близок к богу и учу бесплатно. Но вера проверяется испытанием, и оно непростое.'), ch);
  }

function priestVessel() {
    dlgShow('Священник', img.priest, 'Пустой сосуд: когда ты не держишь в себе ничего лишнего, магия почти ничего не стоит. Расходы на любые приёмы падают в десять раз. Четыре испытания подряд, и они злые.', [
      { t: 'Я пуст и готов', fn: function () {
        dlgClose();
        miniRun(mnPick(4), 0.65, 'Испытание пустоты', function (ok) {
          if (ok) { save.mx.pas = 1; persist(); mgMana = mgCap(); sfx('rare'); dlgShow('Священник', img.priest, 'Ты не держишься ни за что. Теперь магия течёт сквозь тебя почти даром: расход в десять раз меньше.', [{ t: 'Спасибо', out: true }]); }
          else dlgShow('Священник', img.priest, 'Рано. Ты ещё слишком полон собой. Возвращайся.', [{ t: 'Попробую ещё', fn: priestVessel }, { t: 'Уйти', out: true }]);
        });
      } },
      { t: 'Не сейчас', out: true }]);
  }

function priestTeach() {
    if (!save.mx.mg) { dlgShow('Священник', img.priest, 'Твоя магия ещё спит. Пройди путь до её пробуждения, и возвращайся.', [{ t: 'Понял', out: true }]); return; }
    dlgShow('Священник', img.priest, 'Три испытания подряд: огни, равновесие, память и точность. Разные, и все трудные. Ошибёшься, не страшно: приходи снова, я не возьму ни монеты.', [
      { t: 'Я готов', fn: function () {
        dlgClose();
        miniRun(mnPick(3), 0.55, 'Испытание веры', function (ok) {
          if (ok) { save.mx.hol = 1; persist(); mgMana = mgCap(); sfx('rare'); ach('holy'); dlgShow('Священник', img.priest, 'Свет с тобой. Теперь твоя магия святая: +60 к ёмкости, силы копятся вдвое быстрее, луч бьёт на 40% дальше.', [{ t: 'Аминь', out: true }]); }
          else dlgShow('Священник', img.priest, 'Не вышло. Ничего. Вера не торопится, а я не считаю попытки.', [{ t: 'Попробую ещё', fn: priestTeach }, { t: 'Уйти', out: true }]);
        });
      } },
      { t: 'Не сейчас', out: true }]);
  }

function bkLimit() { return 3000 * Math.pow(2, Math.min(8, save.mx.bkR | 0)); }

function bkClock(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

function bkTake(amt, rate, term) {
    if ((save.mx.bkD | 0) > 0 || amt > bkLimit()) return false;
    save.coins += amt; save.mx.bkD = Math.round(amt * (1 + rate)); save.mx.bkT = term; save.mx.bkO = 0; bkPrev = save.coins; hud(); persist(); sfx('sell');
    toast('Кредит ' + fmtN(amt) + ' получен. Вернуть ' + fmtN(save.mx.bkD) + ' за ' + bkClock(term) + '.', 5500); ach('loan0'); return true;
  }

function bkPay(x) {
    var D = save.mx.bkD | 0; x = Math.min(x, save.coins, D); if (x <= 0) { sfx('no'); return; }
    save.coins -= x; save.mx.bkD = D - x; bkPrev = save.coins; hud(); sfx('sell');
    if (save.mx.bkD <= 0) {
      var late = save.mx.bkO | 0; save.mx.bkD = 0; save.mx.bkT = 0; save.mx.bkO = 0;
      if (!late) { save.mx.bkR = Math.min(8, (save.mx.bkR | 0) + 1); toast('Кредит погашен вовремя! Кредитный рейтинг вырос, лимит: ' + fmtN(bkLimit()) + '.', 5500); } else toast('Кредит погашен. Рейтинг пострадал, но долг закрыт.', 4500);
      save.mx.bkN = (save.mx.bkN | 0) + 1; ach('loan');
    }
    persist();
  }

function bankTalk() {
    var D = save.mx.bkD | 0, ch = [], who = 'Банкир «Чекушка-Банка»', L = bkLimit(), txt;
    if (D > 0) {
      txt = save.mx.bkO ? 'Вы в просрочке! Долг растёт на 5% каждую минуту, а половину всех ваших доходов банк забирает автоматически. Закройте долг, и мы снова будем друзьями.' : 'У вас есть кредит. Верните вовремя: рейтинг вырастет, лимит удвоится. Просрочите: штрафы, арест половины доходов и падение рейтинга.';
      ch.push({ t: 'Погасить всё · ' + fmtN(D), fn: function () { bkPay(D); dlgClose(); } }, { t: 'Внести четверть · ' + fmtN(Math.ceil(D / 4)), fn: function () { bkPay(Math.ceil(D / 4)); bankTalk(); } });
    } else {
      txt = 'Добро пожаловать в «Чекушка-Банк». Кредит под 10% на 15 минут. Чем лучше рейтинг, тем больше лимит.';
      [L / 4, L / 2, L].forEach(function (a) { a = Math.floor(a); ch.push({ t: 'Взять ' + fmtN(a) + ' (вернуть ' + fmtN(Math.round(a * 1.1)) + ')', fn: function () { bkTake(a, 0.1, 900); dlgClose(); } }); });
    }
    ch.push({ t: 'Уйти', out: true });
    dlgShow(who, null, txt, ch, 'Рейтинг: ' + (save.mx.bkR | 0) + ' из 8 · лимит ' + fmtN(L) + (D > 0 ? ' · долг ' + fmtN(D) + (save.mx.bkO ? ' · ПРОСРОЧЕН' : ' · осталось ' + bkClock(save.mx.bkT)) : ''));
  }

function bkTick(dt) {
    var D = save.mx.bkD | 0;
    if (D <= 0) { bkPrev = save.coins; bkUiSet(); return; }
    bkSv += dt;
    if (!save.mx.bkO) {
      save.mx.bkT -= dt;
      if (save.mx.bkT <= 120 && save.mx.bkT + dt > 120) toast('Банк напоминает: до срока кредита две минуты.', 4500);
      if (save.mx.bkT <= 30 && save.mx.bkT + dt > 30) toast('До срока кредита 30 секунд! Верни долг в банке или в телефоне.', 5000);
      if (save.mx.bkT <= 0) { save.mx.bkO = 1; save.mx.bkR = Math.max(0, (save.mx.bkR | 0) - 2); bkOT = 0; persist(); sfx('no'); toast('ПРОСРОЧКА! Рейтинг упал. Банк забирает половину ваших доходов и добавляет 5% долга каждую минуту.', 7000); ach('debtor'); }
    } else {
      bkOT += dt; if (bkOT >= 60) { bkOT -= 60; save.mx.bkD = Math.ceil(save.mx.bkD * ((save.mx.rel | 0) === 3 ? 1.1 : 1.05)); persist(); toast('Просрочка: долг вырос до ' + fmtN(save.mx.bkD) + '.', 3500); }
      if (save.coins > bkPrev) { var take = Math.min(save.mx.bkD, Math.floor((save.coins - bkPrev) * 0.5)); if (take > 0) { save.coins -= take; save.mx.bkD -= take; bkMsgT += take; hud(); if (save.mx.bkD <= 0) { save.mx.bkD = 0; save.mx.bkT = 0; save.mx.bkO = 0; save.mx.bkN = (save.mx.bkN | 0) + 1; toast('Долг погашен автоматически из ваших доходов.', 4500); ach('loan'); persist(); } } }
      if (bkMsgT >= 1 && bkSv > 6) { toast('Банк списал с доходов ' + fmtN(bkMsgT) + ' в счёт долга.', 2500); bkMsgT = 0; bkSv = 0; }
    }
    bkPrev = save.coins; if (bkSv > 8) { bkSv = 0; persist(); } bkUiSet();
  }

function bkUiSet() {
    bkUi -= 0.016; if (bkUi > 0) return; bkUi = 0.5;
    var a = [], D = save.mx.bkD | 0;
    if (iceT > 0) a.push('🍦 скорость ' + Math.ceil(iceT) + ' с');
    if (save.mx.rel) a.push('✝ ' + REL[save.mx.rel | 0].n + ' · ' + (save.mx.rdv | 0) + '/5');
    if (D > 0) a.push((save.mx.bkO ? '⚠ ПРОСРОЧКА · долг ' : '🏦 долг ') + fmtN(D) + (save.mx.bkO ? '' : ' · ' + bkClock(save.mx.bkT)));
    if (!bkChip) { bkChip = document.createElement('div'); bkChip.style.cssText = 'position:fixed;left:8px;top:92px;z-index:50;pointer-events:none;font:700 13px Rubik,system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;display:flex;flex-direction:column;gap:3px'; document.body.appendChild(bkChip); }
    var vis = !(cs.on || hn.on || fin.on || p5.on || p6.on || dlgOpened);
    bkChip.innerHTML = vis ? a.map(function (s) { return '<span style="background:rgba(10,14,30,.7);padding:3px 8px;border-radius:8px;border:1px solid ' + (s.indexOf('⚠') >= 0 ? '#ff6b6b' : '#ffd27a') + '">' + s + '</span>'; }).join('') : '';
  }

function renderBankTab() {
    var live = hasSignal(), D = save.mx.bkD | 0, L = bkLimit(), d = document.createElement('div'); d.className = 'phhold';
    d.innerHTML = 'Рейтинг: <b>' + (save.mx.bkR | 0) + ' из 8</b> · лимит <b>' + fmtN(L) + '</b>' + (D > 0 ? '<br>Долг: <b>' + fmtN(D) + '</b>' + (save.mx.bkO ? ' · <b class="down">ПРОСРОЧЕН</b>' : ' · осталось ' + bkClock(save.mx.bkT)) : '<br>Долгов нет.');
    phBody.appendChild(d);
    var r = document.createElement('div'); r.className = 'phrow';
    if (D > 0) {
      r.appendChild(phBtn('Внести четверть', 'buy', function () { bkPay(Math.ceil(D / 4)); renderPhone(); }, !live || save.coins < 1));
      r.appendChild(phBtn('Погасить всё', 'buy', function () { bkPay(D); renderPhone(); }, !live || save.coins < 1));
    } else {
      [L / 4, L / 2, L].forEach(function (a) { a = Math.floor(a); r.appendChild(phBtn('Взять ' + fmtN(a), 'buy', function () { bkTake(a, 0.15, 600); renderPhone(); }, !live)); });
    }
    phBody.appendChild(r);
    var h = document.createElement('div'); h.className = 'whelp'; h.textContent = 'Кредит в телефоне: быстрый путь, но дороже. 15% и 10 минут (в банке города 10% и 15 минут). Нужна связь. Просрочка: рейтинг вниз, 5% долга каждую минуту, половина доходов уходит банку.'; phBody.appendChild(h);
  }

function mnArch(x, y, w, h) { ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + w / 2); ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath(); }

function mnGlass(x, y, w, h, seed) {
    var cols = ['#d9433f', '#3b7ad9', '#e6b84a', '#3fae6a', '#a65bd6']; ctx.save(); mnArch(x, y, w, h); ctx.clip(); ctx.fillStyle = '#2b2236'; ctx.fillRect(x, y, w, h);
    for (var i = 0; i < 6; i++) for (var j = 0; j < 2; j++) { ctx.fillStyle = cols[(i + j * 2 + seed) % 5]; ctx.globalAlpha = 0.9; ctx.fillRect(x + 2 + j * (w / 2), y + 2 + i * (h / 6), w / 2 - 3, h / 6 - 3); }
    ctx.restore(); ctx.globalAlpha = 1; ctx.strokeStyle = '#2b2236'; ctx.lineWidth = 3; mnArch(x, y, w, h); ctx.stroke();
  }

function drawIceFront(x0, x1) {
    var X = ICE_X, i, nk = nightK(); if (X + 220 < x0 || X - 220 > x1) return; if (ruinI()) { drawIceRuin(x0, x1); return; } setCam(1);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(X, gY + 4, 170, 12, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#7a4a22'; ctx.fillRect(X - 128, gY - 210, 8, 210); ctx.fillRect(X + 120, gY - 210, 8, 210);
    ctx.fillStyle = '#f4f8ff'; ctx.fillRect(X - 120, gY - 200, 240, 200); ctx.fillStyle = '#cfe6ff'; ctx.fillRect(X - 120, gY - 200, 240, 30);
    ctx.fillStyle = '#ff9fc4'; ctx.beginPath(); ctx.arc(X - 86, gY - 132, 16, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff1c0'; ctx.beginPath(); ctx.arc(X - 86, gY - 114, 14, 0, 6.3); ctx.fill(); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X - 100, gY - 104); ctx.lineTo(X - 72, gY - 104); ctx.lineTo(X - 86, gY - 70); ctx.fill();
    ctx.fillStyle = '#ff9fc4'; ctx.beginPath(); ctx.arc(X + 86, gY - 132, 16, 0, 6.3); ctx.fill(); ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.arc(X + 86, gY - 114, 14, 0, 6.3); ctx.fill(); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X + 72, gY - 104); ctx.lineTo(X + 100, gY - 104); ctx.lineTo(X + 86, gY - 70); ctx.fill();
    bgNpc('icev', X, 226, false, 1.3);
    // прилавок
    for (i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#3b7ad9'; ctx.fillRect(X - 130 + i * 21.7, gY - 62, 21.7, 62); }
    ctx.fillStyle = '#c98a4a'; ctx.fillRect(X - 138, gY - 72, 276, 12); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(X - 138, gY - 72, 276, 3);
    // тент
    for (i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#3b7ad9'; ctx.beginPath(); ctx.moveTo(X - 145 + i * 24.2, gY - 236); ctx.lineTo(X - 145 + (i + 1) * 24.2, gY - 236); ctx.lineTo(X - 145 + (i + 1) * 24.2, gY - 206); ctx.arc(X - 145 + (i + 0.5) * 24.2, gY - 206, 12.1, 0, Math.PI); ctx.lineTo(X - 145 + i * 24.2, gY - 236); ctx.fill(); }
    ctx.fillStyle = '#ff7fb0'; rrect(X - 105, gY - 282, 210, 38, 10); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('МОРОЖЕНОЕ', X, gY - 262);
    // рожок на крыше
    ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X - 22, gY - 330); ctx.lineTo(X + 22, gY - 330); ctx.lineTo(X, gY - 286); ctx.fill(); ctx.fillStyle = '#ff9fc4'; ctx.beginPath(); ctx.arc(X, gY - 340, 24, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff1c0'; ctx.beginPath(); ctx.arc(X - 5, gY - 362, 17, 0, 6.3); ctx.fill(); ctx.fillStyle = '#e8334f'; ctx.beginPath(); ctx.arc(X - 3, gY - 380, 5, 0, 6.3); ctx.fill();
    // цена
    ctx.fillStyle = '#10234a'; rrect(X + 48, gY - 52, 78, 22, 6); ctx.fill(); ctx.fillStyle = '#ffd27a'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillText(fmtN(ICE_PRICE) + ' коинов', X + 87, gY - 41);
    if (nk > 0.2) { for (i = 0; i < 9; i++) { var lx = X - 140 + i * 35; ctx.fillStyle = ['#ff6b6b', '#ffd23f', '#7dff9a', '#6bc4ff'][i % 4]; ctx.beginPath(); ctx.arc(lx, gY - 238 + 4 * Math.sin(i), 4, 0, 6.3); ctx.fill(); } csGlow(X, gY - 150, 210, '255,220,170', 0.22 * nk); }
  }

function drawChurchFront(x0, x1) {
    var X = CH_X, i, nk = nightK(); if (X + 320 < x0 || X - 320 > x1) return; setCam(1);
    var wallA = '#c9c1b2', wallB = '#a99f8e', roof = '#46506a';
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(X, gY + 4, 300, 14, 0, 0, 6.3); ctx.fill();
    // крылья
    [[-270, -62], [62, 270]].forEach(function (w, wi) {
      var a = X + w[0], b = X + w[1]; ctx.fillStyle = wallA; ctx.fillRect(a, gY - 190, b - a, 190); ctx.fillStyle = wallB; for (var r = 0; r < 8; r++) ctx.fillRect(a, gY - 186 + r * 24, b - a, 2);
      ctx.fillStyle = roof; ctx.beginPath(); ctx.moveTo(a - 10, gY - 190); ctx.lineTo((a + b) / 2, gY - 262); ctx.lineTo(b + 10, gY - 190); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.moveTo(a - 10, gY - 190); ctx.lineTo((a + b) / 2, gY - 262); ctx.lineTo((a + b) / 2, gY - 190); ctx.fill();
      mnGlass((a + b) / 2 - 22, gY - 168, 44, 110, wi * 2);
      if (nk > 0.2) csGlow((a + b) / 2, gY - 112, 90, '255,200,120', 0.35 * nk);
    });
    // башня
    ctx.fillStyle = wallA; ctx.fillRect(X - 70, gY - 310, 140, 310); ctx.fillStyle = wallB; for (i = 0; i < 13; i++) ctx.fillRect(X - 70, gY - 306 + i * 24, 140, 2); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(X + 56, gY - 310, 14, 310);
    ctx.fillStyle = wallB; ctx.fillRect(X - 78, gY - 318, 156, 12);
    ctx.fillStyle = roof; ctx.beginPath(); ctx.moveTo(X - 84, gY - 318); ctx.lineTo(X, gY - 470); ctx.lineTo(X + 84, gY - 318); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(X - 84, gY - 318); ctx.lineTo(X, gY - 470); ctx.lineTo(X, gY - 318); ctx.fill();
    ctx.fillStyle = '#e8c25a'; ctx.fillRect(X - 3, gY - 520, 6, 56); ctx.fillRect(X - 17, gY - 504, 34, 6); if (nk > 0) csGlow(X, gY - 500, 60, '255,230,150', 0.4 * nk);
    // колокол
    ctx.fillStyle = '#18131f'; mnArch(X - 26, gY - 292, 52, 70); ctx.fill(); var sw = Math.sin(t * 1.4) * 0.15; ctx.save(); ctx.translate(X, gY - 280); ctx.rotate(sw); ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.moveTo(-14, 34); ctx.quadraticCurveTo(-14, 6, 0, 2); ctx.quadraticCurveTo(14, 6, 14, 34); ctx.closePath(); ctx.fill(); ctx.restore();
    // роза
    ctx.save(); ctx.beginPath(); ctx.arc(X, gY - 186, 26, 0, 6.3); ctx.clip(); for (i = 0; i < 8; i++) { ctx.fillStyle = ['#d9433f', '#3b7ad9', '#e6b84a', '#3fae6a'][i % 4]; ctx.beginPath(); ctx.moveTo(X, gY - 186); ctx.arc(X, gY - 186, 28, i * 0.785, (i + 1) * 0.785); ctx.fill(); } ctx.restore(); ctx.strokeStyle = '#2b2236'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(X, gY - 186, 26, 0, 6.3); ctx.stroke();
    // дверь
    ctx.fillStyle = '#3b2616'; mnArch(X - 34, gY - 124, 68, 124); ctx.fill(); ctx.fillStyle = '#5b3a1e'; mnArch(X - 28, gY - 118, 56, 118); ctx.fill(); ctx.fillStyle = '#2b1a0c'; ctx.fillRect(X - 1, gY - 90, 2, 90); ctx.fillStyle = '#e8c25a'; ctx.fillRect(X - 12, gY - 58, 5, 10); ctx.fillRect(X + 7, gY - 58, 5, 10);
    if (nk > 0.2) { var gg = ctx.createRadialGradient(X, gY - 50, 8, X, gY - 50, 130); gg.addColorStop(0, 'rgba(255,200,110,' + (0.5 * nk).toFixed(2) + ')'); gg.addColorStop(1, 'rgba(255,200,110,0)'); ctx.fillStyle = gg; ctx.fillRect(X - 130, gY - 180, 260, 200); }
    // ступени и фонари
    ctx.fillStyle = '#9a9488'; ctx.fillRect(X - 56, gY - 8, 112, 8); ctx.fillStyle = '#b3ada0'; ctx.fillRect(X - 48, gY - 16, 96, 8);
    [-90, 90].forEach(function (dx) { ctx.fillStyle = '#2f3641'; ctx.fillRect(X + dx - 2, gY - 96, 4, 96); ctx.fillStyle = '#ffe9a0'; ctx.fillRect(X + dx - 7, gY - 112, 14, 16); if (nk > 0.1) csGlow(X + dx, gY - 104, 60, '255,226,140', 0.4 * nk); });
    ctx.fillStyle = '#fff'; ctx.font = '700 15px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ЦЕРКОВЬ', X, gY - 134);
    if (save.mx.c2l && !save.mx.c2e) { ctx.strokeStyle = 'rgba(30,24,20,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X - 200, gY - 190); ctx.lineTo(X - 176, gY - 140); ctx.lineTo(X - 196, gY - 104); ctx.lineTo(X - 170, gY - 60); ctx.moveTo(X + 150, gY - 170); ctx.lineTo(X + 176, gY - 120); ctx.lineTo(X + 160, gY - 80); ctx.moveTo(X + 30, gY - 300); ctx.lineTo(X + 12, gY - 250); ctx.lineTo(X + 34, gY - 220); ctx.stroke(); ctx.fillStyle = '#8c8478'; [[-230, 8], [-80, 6], [100, 9], [210, 7]].forEach(function (r) { ctx.beginPath(); ctx.moveTo(X + r[0] - r[1], gY); ctx.lineTo(X + r[0], gY - r[1] * 1.2); ctx.lineTo(X + r[0] + r[1], gY); ctx.fill(); }); }
  }

function drawChurchBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2a2036'); g.addColorStop(1, '#4a3a38'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[24].w, a = Math.max(0, x0), b = Math.min(w, x1), i, q;
    ctx.fillStyle = '#6a5c52'; ctx.fillRect(a, gY - 520, b - a, 520); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (q = Math.floor(a / 80) * 80; q < b; q += 80) ctx.fillRect(q, gY - 520, 3, 520);
    ctx.fillStyle = '#3d3029'; ctx.fillRect(a, gY - 380, b - a, 6);
    // своды и колонны
    for (q = 320; q < w; q += 440) { if (q < a - 60 || q > b + 60) continue; ctx.fillStyle = '#8c7e70'; ctx.fillRect(q - 22, gY - 420, 44, 420); ctx.fillStyle = '#a89a8a'; ctx.fillRect(q - 30, gY - 430, 60, 14); ctx.fillRect(q - 30, gY - 14, 60, 14); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(q + 8, gY - 420, 14, 420); }
    // витражи
    for (q = 540; q < w - 200; q += 440) { if (q < a - 90 || q > b + 90) continue; mnGlass(q - 38, gY - 400, 76, 230, (q / 440) | 0); var fl = 0.16 + 0.04 * Math.sin(t * 1.3 + q); ctx.fillStyle = 'rgba(255,200,130,' + fl.toFixed(2) + ')'; ctx.beginPath(); ctx.moveTo(q - 30, gY - 170); ctx.lineTo(q + 30, gY - 170); ctx.lineTo(q + 120, gY); ctx.lineTo(q + 10, gY); ctx.fill(); }
    // пол
    for (q = Math.floor(a / 90) * 90; q < b; q += 90) { ctx.fillStyle = ((q / 90) | 0) % 2 ? '#6e625a' : '#8a7d72'; ctx.fillRect(q, gY - 2, 90, 22); ctx.fillStyle = ((q / 90) | 0) % 2 ? '#8a7d72' : '#6e625a'; ctx.fillRect(q, gY + 20, 90, 40); }
    ctx.fillStyle = '#2a1e1a'; ctx.fillRect(a, gY + 60, b - a, H / scale);
    ctx.fillStyle = '#8a1f2a'; ctx.fillRect(Math.max(a, 120), gY - 2, Math.min(b, w - 240) - Math.max(a, 120), 14); ctx.fillStyle = '#e8c25a'; ctx.fillRect(Math.max(a, 120), gY - 2, Math.min(b, w - 240) - Math.max(a, 120), 2);
    // скамьи
    for (q = 900; q < 1250; q += 140) { if (q < a - 80 || q > b + 80) continue; ctx.fillStyle = '#4a2f1a'; ctx.fillRect(q - 56, gY - 42, 112, 10); ctx.fillRect(q - 56, gY - 74, 112, 8); ctx.fillRect(q - 52, gY - 34, 8, 34); ctx.fillRect(q + 44, gY - 34, 8, 34); }
    // дверь выхода
    var dx = CHI_OUT; if (dx > a - 120 && dx < b + 120) { ctx.fillStyle = '#3b2616'; mnArch(dx - 54, gY - 230, 108, 230); ctx.fill(); ctx.fillStyle = '#bfe3f7'; mnArch(dx - 46, gY - 222, 92, 222); ctx.fill(); ctx.fillStyle = '#3b2616'; ctx.fillRect(dx - 2, gY - 200, 4, 200); ctx.fillStyle = '#fff'; rrect(dx - 40, gY - 276, 80, 30, 8); ctx.fill(); ctx.fillStyle = '#10234a'; ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВЫХОД', dx, gY - 261); }
    // алтарь
    var AX = 1750; if (AX > a - 300 && AX < b + 300) {
      ctx.fillStyle = '#8c7e70'; ctx.fillRect(AX - 200, gY - 26, 400, 26); ctx.fillStyle = '#a89a8a'; ctx.fillRect(AX - 170, gY - 50, 340, 24);
      ctx.fillStyle = '#f4efe6'; ctx.fillRect(AX - 120, gY - 94, 240, 44); ctx.fillStyle = '#e8c25a'; ctx.fillRect(AX - 120, gY - 94, 240, 5);
      ctx.fillStyle = '#e8c25a'; ctx.fillRect(AX - 5, gY - 260, 10, 160); ctx.fillRect(AX - 38, gY - 220, 76, 10); csGlow(AX, gY - 190, 150, '255,230,160', 0.22);
      [-90, 90].forEach(function (cx) { ctx.fillStyle = '#f4efe6'; ctx.fillRect(cx + AX - 5, gY - 130, 10, 36); mnFlameW(AX + cx, gY - 138); });
    }
    // подставка со свечами
    var CX = CHI_CAN; if (CX > a - 160 && CX < b + 160) {
      ctx.fillStyle = '#4a2f1a'; ctx.fillRect(CX - 70, gY - 70, 140, 70); ctx.fillStyle = '#6a4424'; ctx.fillRect(CX - 76, gY - 80, 152, 12); ctx.fillStyle = '#c98a4a'; ctx.fillRect(CX - 76, gY - 80, 152, 3);
      var n = Math.min(14, 4 + (save.mx.cdl | 0));
      for (i = 0; i < n; i++) { var cx = CX - 62 + (i % 7) * 20.7, cy = gY - 80 - Math.floor(i / 7) * 34; ctx.fillStyle = '#f4efe6'; ctx.fillRect(cx - 4, cy - 22, 8, 22); mnFlameW(cx, cy - 28); }
      csGlow(CX, gY - 120, 140, '255,200,120', 0.25);
    }
    drawHvStairs(x0, x1);
    bgNpc('priest', CHI_PR, 250, false, 1.3);
    for (q = 700; q < w; q += 700) { if (q < a - 60 || q > b + 60) continue; ctx.fillStyle = '#6a4a2a'; ctx.fillRect(q - 2, gY - 520, 4, 90); ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.ellipse(q, gY - 428, 34, 16, 0, Math.PI, 0); ctx.fill(); csGlow(q, gY - 410, 150, '255,210,140', 0.26); }
  }

function mnFlameW(x, y) { var f = 1 + 0.15 * Math.sin(t * 13 + x); ctx.fillStyle = 'rgba(255,170,60,.3)'; ctx.beginPath(); ctx.arc(x, y, 12 * f, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffb02e'; ctx.beginPath(); ctx.ellipse(x, y, 4, 8 * f, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff3a0'; ctx.beginPath(); ctx.ellipse(x, y + 2, 2, 4.5 * f, 0, 0, 6.3); ctx.fill(); }

function drawBankFront(x0, x1) {
    var X = BANK_X, w = 400, h = 270, L0 = X - w / 2, i, nk = nightK(); if (X + 260 < x0 || X - 260 > x1) return; setCam(1);
    var g = ctx.createLinearGradient(0, gY - h, 0, gY); g.addColorStop(0, '#dfe6df'); g.addColorStop(1, '#b9c4ba'); ctx.fillStyle = g; ctx.fillRect(L0, gY - h, w, h + 2);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(L0 + w - 12, gY - h, 12, h);
    ctx.fillStyle = '#95a395'; ctx.beginPath(); ctx.moveTo(L0 - 16, gY - h); ctx.lineTo(X, gY - h - 70); ctx.lineTo(L0 + w + 16, gY - h); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#dfe6df'; ctx.beginPath(); ctx.moveTo(L0 + 20, gY - h - 4); ctx.lineTo(X, gY - h - 56); ctx.lineTo(L0 + w - 20, gY - h - 4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.arc(X, gY - h - 26, 20, 0, 6.3); ctx.fill(); ctx.fillStyle = '#f2cd6a'; ctx.beginPath(); ctx.arc(X, gY - h - 26, 15, 0, 6.3); ctx.fill(); ctx.fillStyle = '#9a7220'; ctx.font = '700 18px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₵', X, gY - h - 25);
    ctx.fillStyle = '#17324a'; rrect(L0 + 40, gY - h + 12, w - 80, 40, 8); ctx.fill(); ctx.strokeStyle = '#d9a63a'; ctx.lineWidth = 3; ctx.stroke(); ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = 4 + 10 * nk; ctx.fillStyle = '#ffe9a0'; ctx.font = '700 24px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillText('ЧЕКУШКА-БАНК', X, gY - h + 33); ctx.shadowBlur = 0;
    for (i = 0; i < 5; i++) { var cx = L0 + 32 + i * 84; if (Math.abs(cx - X) < 30) continue; ctx.fillStyle = '#f2f5f0'; ctx.fillRect(cx - 12, gY - h + 62, 24, h - 82); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(cx + 4, gY - h + 62, 8, h - 82); ctx.fillStyle = '#c9d2c8'; ctx.fillRect(cx - 17, gY - h + 58, 34, 8); ctx.fillRect(cx - 17, gY - 28, 34, 8); }
    ctx.fillStyle = '#17324a'; ctx.fillRect(X - 40, gY - 130, 80, 130); ctx.fillStyle = nk > 0.2 ? '#ffe9a8' : '#bfe3f7'; ctx.fillRect(X - 34, gY - 124, 68, 124); ctx.fillStyle = '#17324a'; ctx.fillRect(X - 2, gY - 124, 4, 124); ctx.fillStyle = '#d9a63a'; ctx.fillRect(X - 12, gY - 64, 5, 16); ctx.fillRect(X + 7, gY - 64, 5, 16);
    [-150, 150].forEach(function (dx) { ctx.fillStyle = '#17324a'; ctx.fillRect(X + dx - 34, gY - 170, 68, 70); ctx.fillStyle = nk > 0.2 ? '#ffe9a8' : '#bfe3f7'; ctx.fillRect(X + dx - 30, gY - 166, 60, 62); ctx.fillStyle = '#17324a'; ctx.fillRect(X + dx - 1, gY - 166, 2, 62); });
    ctx.fillStyle = '#b3b9b0'; ctx.fillRect(L0 - 10, gY - 10, w + 20, 10); ctx.fillStyle = '#c9cfc6'; ctx.fillRect(L0 + 4, gY - 18, w - 8, 8);
    ctx.fillStyle = '#17324a'; rrect(L0 - 54, gY - 120, 44, 90, 6); ctx.fill(); ctx.fillStyle = '#5ee0ff'; ctx.fillRect(L0 - 48, gY - 110, 32, 22); ctx.fillStyle = '#d9a63a'; ctx.font = '700 11px "Rubik", sans-serif'; ctx.fillText('ATM', L0 - 32, gY - 66);
    if (nk > 0.2) { var gl = ctx.createRadialGradient(X, gY - 60, 20, X, gY - 60, 250); gl.addColorStop(0, 'rgba(255,220,130,' + (0.3 * nk).toFixed(2) + ')'); gl.addColorStop(1, 'rgba(255,220,130,0)'); ctx.fillStyle = gl; ctx.fillRect(X - 250, gY - 320, 500, 330); }
  }

function relS() { return 0.5 + 0.1 * (save.mx.rdv | 0); }

function relSpd() { var r = save.mx.rel | 0; return r === 1 ? 1 - 0.15 * relS() : (r === 2 ? 1 + 0.25 * relS() : 1); }

function relHp() { return (save.mx.rel | 0) === 2 ? Math.round(40 * relS()) : 0; }

function relMag() { var r = save.mx.rel | 0; return r === 1 ? Math.round(80 * relS()) : (r === 3 ? -Math.round(50 * relS()) : 0); }

function relReg() { return (save.mx.rel | 0) === 1 ? 1 + 0.6 * relS() : 1; }

function relInc() { return (save.mx.rel | 0) === 3 ? 1 + 0.25 * relS() : 1; }

function relNow(k) {
    var s = relS(), p = Math.round(s * 100);
    return k === 1 ? 'Сейчас (сила ' + p + '%): ёмкость магии +' + Math.round(80 * s) + ', восстановление +' + Math.round(60 * s) + '%, скорость −' + Math.round(15 * s) + '%.'
      : (k === 2 ? 'Сейчас (сила ' + p + '%): скорость +' + Math.round(25 * s) + '%, максимум здоровья −' + Math.round(40 * s) + '.'
        : 'Сейчас (сила ' + p + '%): доход от продажи +' + Math.round(25 * s) + '%, ёмкость магии −' + Math.round(50 * s) + ', долг при просрочке растёт вдвое быстрее.');
  }

function ruinI() { return !!save.mx.c2l && !save.mx.c2e && !((save.mx.rsc | 0) & 1); }

function ruinD() { return !!save.mx.c2l && !save.mx.c2e && !((save.mx.rsc | 0) & 2); }

function ruinHelp(bit, who, img_, txt, rewardFn) {
    dlgShow(who, img_, txt, [{ t: 'Помочь выбраться', fn: function () {
      dlgClose();
      miniRun(mnPick(1), 0.6, 'Разобрать завал', function (ok) {
        if (!ok) { toast('Не получилось сдвинуть обломки. Можно попробовать снова.', 3500); return; }
        save.mx.rsc = (save.mx.rsc | 0) | bit; persist(); sfx('rare'); rewardFn();
        if (((save.mx.rsc | 0) & 3) === 3) { ach('rescue'); endB2Check(); }
      });
    } }, { t: 'Позже', out: true }]);
  }

function iceRuinTalk() {
    ruinHelp(1, 'Мороженщик', img.icev, 'Ох… Лавку накрыло, а меня придавило балкой. Вытащи, и первые три рожка за мой счёт.', function () {
      save.mx.fri = 3; persist(); toast('Мороженщик спасён! Три рожка бесплатно.', 5000);
      dlgShow('Мороженщик', img.icev, 'Спасибо! Лавка цела, а холодильник работает. Подходи за мороженым.', [{ t: 'Хорошо', out: true }]);
    });
  }

function docRuinTalk() {
    ruinHelp(2, 'Главный врач', docPort(), 'Помогите… Потолок обвалился, а я не могу пошевелиться. Только осторожно, у меня в кармане градусники.', function () {
      save.coins += 3000; hud(); persist(); toast('Врач спасён! Награда 3 000 коинов.', 5000);
      dlgShow('Главный врач', docPort(), 'Вы спасли мне жизнь. Лечу вас бесплатно, всегда.', [{ t: 'Хорошо', out: true }]);
    });
  }

function relAsk(k) {
    dlgShow('Священник', img.priest, REL[k].n + '. Дар: ' + REL[k].b + '. Плата: ' + REL[k].m + '. Сила веры растёт с каждым поклонением: от 50% до 100%.', [
      { t: 'Принять веру', fn: function () { save.mx.rel = k; save.mx.rdv = 0; relCd = 0; persist(); dlgClose(); sfx('rare'); toast('Ты принял веру: ' + REL[k].n + '.', 4500); ach('faith'); } },
      { t: 'Назад', fn: altarTalk }]);
  }

function altarTalk() {
    if (!save.mx.c2l) { dlgShow('Алтарь', null, 'Алтарь церкви. Священник говорит, что выбирать веру пока рано, но времена меняются.', [{ t: 'Назад', out: true }]); return; }
    var r = save.mx.rel | 0, ch = [], k;
    if (!r) {
      for (k = 1; k <= 3; k++) ch.push({ t: REL[k].n, fn: (function (k) { return function () { relAsk(k); }; })(k) });
      ch.push({ t: 'Уйти', out: true });
      dlgShow('Алтарь', null, 'Мир рухнул наполовину, и людям нужна опора. Выбери, кому поклоняться. Каждая вера даёт дар и берёт плату.', ch, REL.slice(1).map(function (x) { return x.n + ': ' + x.b + ' / ' + x.m; }).join('  ●  '));
    } else {
      ch.push({ t: relCd > 0 ? 'Поклониться (через ' + Math.ceil(relCd) + ' с)' : 'Поклониться', no: relCd > 0, fn: function () {
        if (relCd > 0) { sfx('no'); toast('Вера не терпит суеты: подожди ' + Math.ceil(relCd) + ' с.', 2500); return; }
        relCd = 90; if ((save.mx.rdv | 0) < 5) save.mx.rdv = (save.mx.rdv | 0) + 1; persist(); dlgClose(); sfx('rare'); popup(P.x, PLAYER_H + 30, 'Благочестие ' + save.mx.rdv + ' из 5', '#ffe9a0');
        if (save.mx.rdv >= 5) ach('devout'); toast(REL[r].n + ': благочестие ' + save.mx.rdv + ' из 5. ' + relNow(r), 5000);
      } });
      ch.push({ t: 'Отречься от веры', fn: function () { save.mx.rel = 0; save.mx.rdv = 0; persist(); dlgClose(); toast('Ты отрёкся. Благочестие сброшено, можно выбрать другую веру.', 4000); } });
      ch.push({ t: 'Уйти', out: true });
      dlgShow('Алтарь', null, 'Ты следуешь вере «' + REL[r].n + '». Благочестие: ' + (save.mx.rdv | 0) + ' из 5. Дар: ' + REL[r].b + '. Плата: ' + REL[r].m + '.', ch, relNow(r));
    }
  }

function drawIceRuin(x0, x1) {
    var X = ICE_X, i; if (X + 260 < x0 || X - 260 > x1) return; setCam(1);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(X, gY + 4, 190, 12, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#2a1e14'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X - 150, gY + 2); ctx.lineTo(X - 90, gY - 10); ctx.lineTo(X - 60, gY + 3); ctx.moveTo(X + 60, gY + 3); ctx.lineTo(X + 110, gY - 8); ctx.lineTo(X + 170, gY + 2); ctx.stroke();
    // сломанные опоры и упавший тент
    ctx.fillStyle = '#7a4a22'; ctx.save(); ctx.translate(X - 128, gY); ctx.rotate(-0.25); ctx.fillRect(-4, -120, 8, 120); ctx.restore(); ctx.save(); ctx.translate(X + 124, gY); ctx.rotate(0.9); ctx.fillRect(-4, -150, 8, 150); ctx.restore();
    for (i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#3b7ad9'; ctx.beginPath(); ctx.moveTo(X - 110 + i * 26, gY - 38 - 5 * Math.sin(i)); ctx.lineTo(X - 84 + i * 26, gY - 34 + 4 * Math.cos(i)); ctx.lineTo(X - 84 + i * 26, gY); ctx.lineTo(X - 110 + i * 26, gY); ctx.fill(); }
    ctx.fillStyle = '#ff7fb0'; ctx.save(); ctx.translate(X - 40, gY - 8); ctx.rotate(-0.12); rrect(-100, -30, 200, 34, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 18px "Russo One", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('МОРОЖЕ', 0, -13); ctx.restore();
    // мороженщик лежит
    var im = img.icev; if (ready(im)) { var h = 200, w = h * im.naturalWidth / im.naturalHeight; ctx.save(); ctx.translate(X + 20, gY - 4); ctx.rotate(1.5); ctx.globalAlpha = 0.95; ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore(); }
    ctx.fillStyle = '#5a4630'; ctx.save(); ctx.translate(X + 20, gY - 38); ctx.rotate(-0.1); ctx.fillRect(-90, -9, 190, 18); ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(-90, -9, 190, 4); ctx.restore();
    ctx.fillStyle = '#6a6a72'; for (i = 0; i < 9; i++) { var rx = X - 150 + i * 38 + (i * 13) % 17, rs = 10 + (i * 7) % 12; ctx.beginPath(); ctx.moveTo(rx - rs, gY); ctx.lineTo(rx - rs * 0.4, gY - rs); ctx.lineTo(rx + rs * 0.6, gY - rs * 0.8); ctx.lineTo(rx + rs, gY); ctx.fill(); }
    ctx.fillStyle = '#ff9fc4'; ctx.beginPath(); ctx.arc(X + 150, gY - 4, 8, 0, 6.3); ctx.fill(); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X + 142, gY - 2); ctx.lineTo(X + 168, gY - 10); ctx.lineTo(X + 160, gY + 4); ctx.fill();
    for (i = 0; i < 3; i++) { var a = t * 2 + i * 2.1; ctx.fillStyle = '#ffe36a'; ctx.font = '700 18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('★', X + 130 + Math.cos(a) * 24, gY - 34 + Math.sin(a) * 8); }
    ctx.fillStyle = 'rgba(210,200,190,.18)'; for (i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(X - 120 + ((t * 20 + i * 60) % 260), gY - 20 - (i * 17) % 60 - 6 * Math.sin(t + i), 16 + i * 2, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = 'rgba(0,0,0,.55)'; rrect(X - 70, gY - 150, 140, 28, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Помогите…', X, gY - 136);
  }

function drawDocRuin(x0, x1) {
    if (!ruinD()) return; var X = HIN_DOOR.doc, i; if (X + 200 < x0 || X - 200 > x1) return;
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(X, gY + 4, 150, 10, 0, 0, 6.3); ctx.fill();
    var im = img.doc; if (ready(im)) { var h = 150, w = h * im.naturalWidth / im.naturalHeight; ctx.save(); ctx.translate(X - 30, gY - 4); ctx.rotate(-1.5); ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore(); }
    ctx.fillStyle = '#5a4a40'; ctx.save(); ctx.translate(X - 10, gY - 34); ctx.rotate(0.12); ctx.fillRect(-100, -9, 200, 18); ctx.restore();
    ctx.fillStyle = '#9a9aa2'; for (i = 0; i < 10; i++) { var rx = X - 130 + i * 28 + (i * 11) % 15, rs = 9 + (i * 5) % 12; ctx.beginPath(); ctx.moveTo(rx - rs, gY); ctx.lineTo(rx - rs * 0.4, gY - rs); ctx.lineTo(rx + rs * 0.6, gY - rs * 0.8); ctx.lineTo(rx + rs, gY); ctx.fill(); }
    for (i = 0; i < 3; i++) { var a = t * 2 + i * 2.1; ctx.fillStyle = '#ffe36a'; ctx.font = '700 18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('★', X - 90 + Math.cos(a) * 24, gY - 40 + Math.sin(a) * 8); }
    ctx.fillStyle = 'rgba(0,0,0,.55)'; rrect(X - 60, gY - 130, 120, 26, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Помогите…', X, gY - 117);
  }

function primeDraw(x, face, h, al) { var im = uvImg(6); if (!im) return; var iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height; if (!iw) return; var w = h * iw / ih; ctx.save(); ctx.translate(x, gY); if (face > 0) ctx.scale(-1, 1); ctx.globalAlpha = al == null ? 1 : al; ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore(); }

function primeAlly() { return (save.mx.c2p | 0) === 2; }

function primeOffer() {
    dlgShow('Кокич Прайм', null, 'Шестое окно открыто, и я не хочу драки. Давай сделку: я помогу вам, и моя сила станет вашей. Цена одна: Меллстрой. Он пожертвует собой и останется у меня. Или дерись, если хочешь.', [
      { t: 'Сразиться с Праймом', fn: function () { dlgClose(); c2Portal(6); } },
      { t: 'Принять сделку', fn: function () {
        dlgShow('Профессор', sciPort(), 'Меллстрой станет платой. Назад дороги не будет. Ты уверен?', [
          { t: 'Да, согласиться', fn: function () { dlgClose(); primeDeal(); } },
          { t: 'Нет, подумаю', fn: primeOffer }, { t: 'Уйти', out: true }]);
      } }, { t: 'Уйти', out: true }]);
  }

function primeDeal() {
    if (cs.on) return;
    csPlay('c2deal', function () { save.mx.c2p = 2; save.mx.c2e = 1; save.mx.rsc = 3; save.mx.fri = Math.max(3, save.mx.fri | 0); save.coins += 15000; hud(); persist(); ach('c2deal'); ach('c2ending'); ltGo(NLAB, 'left', NL_NPC + 200); toast('КОНЦОВКА: мир восстановлен, Меллстроя больше нет. Кокич Прайм с вами: +40 здоровья, +40 магии, +15 000 коинов. Город и Больница исцелены.', 10000); });
  }

function primeTalk() {
    dlgShow('Кокич Прайм', null, 'Я держу слово. Пока Меллстрой стримит там, я здесь. Моя сила с тобой: и здоровья больше, и магии. Только не говори профессору, что мне тут нравится.', [{ t: 'Понял', out: true }]);
  }

function mogSacrificed() { return (save.mx.mgo | 0) === 2; }

function primeGone() { return (save.mx.c2p | 0) >= 2; }

function clashOffer() {
    if (cs.on) return;
    csPlay('c2clash', function () {
      dlgShow('Выбор стороны', null, 'Чикен Моггити и Кокич Прайм сошлись в лаборатории. Кого поддержишь? Помочь Прайму: мир восстановится, но Моггити и Меллстрой погибнут. Помочь Моггити: Прайм умрёт, и всё придётся чинить своими руками.', [
        { t: 'Помочь Кокичу Прайму', fn: function () { dlgClose(); uniSide = 'prime'; c2Portal(7); } },
        { t: 'Помочь Чикену Моггити', fn: function () { dlgClose(); uniSide = 'mog'; c2Portal(6); } },
        { t: 'Пока не решил', out: true }]);
    });
  }

function winSide(k) {
    var side = p5.side || '';
    if (k === 7 && side === 'prime') {
      csPlay('c2endA', function () { save.mx.c2p = 2; save.mx.c2e = 1; save.mx.c2d = 1; save.mx.rsc = 3; save.mx.fri = Math.max(3, save.mx.fri | 0); save.coins += 30000; hud(); persist(); ach('c2deal'); ach('c2ending'); ach('c2endA'); ltGo(NLAB, 'left', NL_NPC + 200); toast('КОНЦОВКА: мир восстановлен, но Моггити и Меллстроя нет. Прайм с вами: +40 здоровья, +40 магии, +30 000 коинов.', 10000); });
      return true;
    }
    if (k === 6 && side === 'mog') {
      csPlay('c2endB', function () { save.mx.c2p = 3; save.coins += 20000; hud(); persist(); ach('c2primeDead'); ltGo(NLAB, 'left', NL_NPC + 200); toast('Прайм пал. Моггити с вами (+40 здоровья), но город всё ещё в руинах: спаси мороженщика в Парке и врача в Больнице.', 10000); });
      return true;
    }
    return false;
  }

function endB2Check() {
    if ((save.mx.c2p | 0) === 3 && !save.mx.c2e && ((save.mx.rsc | 0) & 3) === 3 && !cs.on) {
      csPlay('c2endB2', function () { save.mx.c2e = 2; save.coins += 20000; hud(); persist(); ach('c2ending'); ach('c2endB'); ltGo(NLAB, 'left', NL_NPC + 200); toast('КОНЦОВКА: «Своими руками». Мир восстановлен, Моггити остался. +20 000 коинов.', 9000); });
    }
  }

function mogAllyDraw(x, face, h) { var im = mogImg(); if (!im) return; var iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height; if (!iw) return; var w = h * iw / ih; ctx.save(); ctx.translate(x, gY); if (face > 0) ctx.scale(-1, 1); ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore(); }

function k8Talk() {
    dlgShow('Круг Ктулху', null, 'На полу офиса выжжен круг. Он тянет холодом. Если встать в него и позвать, придут сразу оба: Чикен Моггити и Ктулху. Это не мог-батл, а настоящая битва: щупальца из-под земли, столбы от глаза, топот и помощники.', [
      { t: 'Позвать их' + (rcMulti() ? ' (друзья из офиса прыгнут за тобой)' : ''), fn: k8Go },
      { t: 'Не сейчас', out: true }], 'Награда: ' + ((save.mx.mgc | 0) ? '9 000 коинов за повтор' : '60 000 коинов за первую победу') + '. В бою вместе у босса больше здоровья на каждого друга. Победы: ' + (save.mx.mgc | 0) + '.');
  }

function k8Go() {
    dlgClose(); if (p5.on || cs.on || lt.st) return;
    if (rcMulti()) { try { socket.emit('uni', { k: 8, kind: 'mo' }); } catch (e) {} }
    uniPend = 8; uniV = 8; c2cur = 8; ltGo(UNI, 'left', UNI_PORTAL + 140);
  }

function rrClear(e) {
    p5.es.length = 0; p5.dbr.length = 0; p5.uz.length = 0; p5.tn = [];
    for (var i = p5.en.length - 1; i >= 0; i--) if (p5.en[i].k === 'min') p5.en.splice(i, 1);
  }

function rrBossDown(e) {
    if (e.fin) return; e.fin = 1; rrClear(e); sfx('rare'); p5.flash = 0.8; shk = 1;
    if (!rr.on) { if (e.v === 9) hvWin(); else k8Win(); return; }
    var bt = Math.round((rr.t - rr.t0) * 10), bi = rr.i; rr.t0 = rr.t; rr.times.push(bt);
    var old = rrT()[bi] | 0; if (bt > 0 && (!old || bt < old)) rrT()[bi] = bt;
    save.coins += 1500; persist(); hud();
    rr.i++;
    if (rr.i >= RR_LIST.length) { rrFinish(); return; }
    rr.hp = Math.min(maxHp(), hp + Math.ceil(maxHp() * 0.65)); hp = rr.hp; mgMana = mgCap();
    p5Title('ГОТОВО', 'Дальше: ' + UV[RR_LIST[rr.i]].n, 3); rr.wait = 3.2;
  }

function k8Win() {
    var first = !save.mx.mgc; save.mx.mgc = Math.min(9999, (save.mx.mgc | 0) + 1); save.coins += first ? 60000 : 9000; persist(); hud(); ach('mgct');
    p5Title('ОНИ ПАЛИ', 'Моггити и Ктулху повержены', 3.5);
    setTimeout(function () { if (!p5.on || !p5.uni) return; p5End('uni'); ltGo(14, 'left', K8_X - 150); toast('Моггити и Ктулху повержены' + (first ? ' (+60 000 коинов)' : ' (+9 000 коинов)') + '.', 6000); }, 2600);
  }

function rrTick(dt) {
    if (!rr.on) return;
    if (p5.on && p5.uni) rr.t += dt;
    if (rr.wait > 0) { rr.wait -= dt; if (rr.wait <= 0) { rr.wait = 0; if (p5.on && p5.uni) p5BeginUni(RR_LIST[rr.i]); } }
  }

function rrOver(why) {
    var n = rr.i; rr.on = false; rr.wait = 0;
    if (why === 'uni') return;
    if (n > (save.mx.rrn | 0)) save.mx.rrn = n; persist();
    setTimeout(function () { toast('Босс-раш окончен: побеждено ' + n + ' из ' + RR_LIST.length + ', время ' + rrFmt(rr.t * 10) + '.', 6500); }, 400);
  }

function rrT() { if (!Array.isArray(save.mx.rrt)) save.mx.rrt = [0, 0, 0, 0, 0, 0, 0, 0]; return save.mx.rrt; }

function rrFmt(v) { v = Math.round(v / 10); return Math.floor(v / 60) + ':' + (v % 60 < 10 ? '0' : '') + (v % 60); }

function rrFinish() {
    var tt = Math.round(rr.t * 10), first = !(save.mx.rrc | 0), best = save.mx.rrb | 0, rec = !best || tt < best;
    save.mx.rrc = Math.min(9999, (save.mx.rrc | 0) + 1); save.mx.rrn = 8; if (rec) save.mx.rrb = tt;
    var rw = first ? 30000 : 6000; save.coins += rw; persist(); hud(); ach('rush'); if (tt < 7200) ach('rush2');
    rr.on = false;
    p5Title('РАШ ПРОЙДЕН', 'Время ' + rrFmt(tt) + (rec ? ' · новый рекорд' : ''), 4);
    setTimeout(function () { if (!p5.on) return; p5End('uni'); ltGo(0, 'left', 600); setTimeout(function () { rrBoard('Награда: ' + fmtN(rw) + ' коинов. Время: ' + rrFmt(tt) + (rec ? ' (рекорд!)' : '') + '.'); }, 1200); }, 3200);
  }

function rrBoard(head) {
    var a = [], i;
    for (i = 0; i < RR_LIST.length; i++) a.push((i + 1) + '. ' + UV[RR_LIST[i]].n + ': ' + ((rrT()[i] | 0) ? rrFmt(rrT()[i]) : '—'));
    dlgShow('Босс-раш', null, (head ? head + '\n' : '') + 'Лучшее общее время: ' + ((save.mx.rrb | 0) ? rrFmt(save.mx.rrb) : '—') + '. Дальше всего дошёл: ' + (save.mx.rrn | 0) + ' из 8. Полных прохождений: ' + (save.mx.rrc | 0) + '.', [{ t: 'Закрыть', out: true }], 'Лучшее время по боссам:\n' + a.join('\n'));
  }

function rrOffer() {
    if (p5.on || boss.on || ep.on || cs.on || kk.on || fin.on || p6.on || lt.st || mb.on) { toast('Сначала закончи текущее дело.', 3000); return; }
    dlgShow('Босс-раш', null, 'Восемь боссов вселенных подряд: от Зелёного Кокича до Моггити с Ктулху. Здоровье фиксировано (100), между боссами лечится 65%. Умер: забег окончен. Рекорды и награды за каждого босса.', [
      { t: 'Начать забег', fn: rrGo },
      { t: 'Таблица рекордов', fn: function () { rrBoard(''); } },
      { t: 'Назад', out: true }], 'Награда: 1 500 коинов за босса, 30 000 за первое прохождение (потом 6 000). Если ты в группе, раш идёт один.');
  }

function rrGo() {
    dlgClose(); if (p5.on || cs.on || lt.st) return;
    rr.on = true; rr.i = 0; rr.t = 0; rr.t0 = 0; rr.times = []; rr.hp = 0; rr.wait = 0;
    uniPend = RR_LIST[0]; uniV = RR_LIST[0]; c2cur = uniV; ltGo(UNI, 'left', UNI_PORTAL + 140);
  }

function drawK8Sky(x0, x1) {
    var cx = camX + vw * 0.66, cy = gY - 330, sw = Math.sin(t * 0.8), i, ex = Math.max(-1, Math.min(1, (P.x - cx) / 600));
    ctx.save(); ctx.globalAlpha = 0.9;
    csGlow(cx, cy, 420, '60,255,200', 0.16);
    for (i = 0; i < 9; i++) { var a = (i - 4) * 46, ph = t * 1.2 + i; ctx.strokeStyle = '#0d3a38'; ctx.lineWidth = 34 - Math.abs(i - 4) * 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx + a * 0.6, cy + 80); ctx.bezierCurveTo(cx + a + Math.sin(ph) * 40, cy + 200, cx + a * 1.3 - Math.sin(ph * 1.1) * 50, cy + 300, cx + a * 1.5 + Math.sin(ph * 0.9) * 40, gY - 10); ctx.stroke(); }
    var g = ctx.createRadialGradient(cx, cy - 20, 20, cx, cy, 190); g.addColorStop(0, '#1b6b60'); g.addColorStop(1, '#082a2a'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, 190, 150 + sw * 6, 0, 0, 6.3); ctx.fill();
    for (i = -1; i <= 1; i += 2) { ctx.fillStyle = '#e8ffd0'; ctx.beginPath(); ctx.ellipse(cx + i * 70, cy - 20, 38, 26, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ff2a2a'; ctx.beginPath(); ctx.ellipse(cx + i * 70 + ex * 14, cy - 20, 11, 20, 0, 0, 6.3); ctx.fill(); csGlow(cx + i * 70, cy - 20, 50, '255,60,60', 0.25); }
    ctx.restore();
  }

function drawK8Circle(x0, x1) {
    if (K8_X < x0 - 200 || K8_X > x1 + 200) return;
    var pl = 0.5 + 0.5 * Math.sin(t * 2.4), i;
    csGlow(K8_X, gY - 6, 170 + 20 * pl, '60,255,200', 0.22);
    ctx.save(); ctx.strokeStyle = 'rgba(90,255,215,' + (0.55 + 0.3 * pl).toFixed(2) + ')'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(K8_X, gY + 10, 128, 20, 0, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(K8_X, gY + 10, 92, 14, 0, 0, 6.3); ctx.stroke();
    for (i = 0; i < 8; i++) { var an = i / 8 * 6.283 + t * 0.4; ctx.beginPath(); ctx.moveTo(K8_X + Math.cos(an) * 92, gY + 10 + Math.sin(an) * 14); ctx.quadraticCurveTo(K8_X + Math.cos(an + 0.4) * 140, gY + 10 + Math.sin(an + 0.4) * 22 - 18, K8_X + Math.cos(an + 0.8) * 128, gY + 10 + Math.sin(an + 0.8) * 20); ctx.stroke(); }
    ctx.fillStyle = 'rgba(160,255,230,.9)'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('КРУГ КТУЛХУ', K8_X, gY - 54 - 4 * pl);
    ctx.restore();
  }

function drawTnExtra() {
    if (!p5.tn || !p5.tn.length) return;
    var i, q, f, h, s;
    for (i = 0; i < p5.tn.length; i++) {
      q = p5.tn[i]; if (q.t < 0) continue;
      if (q.t < q.w0) {
        f = q.t / q.w0; ctx.fillStyle = 'rgba(' + (q.kind ? (p5.uv === 9 ? '255,225,140' : '120,255,230') : '255,70,70') + ',' + (0.12 + 0.3 * f).toFixed(2) + ')';
        if (q.kind) { ctx.fillRect(q.x - q.r, gY - 700, q.r * 2, 700); ctx.strokeStyle = 'rgba(180,255,240,.7)'; ctx.lineWidth = 2; ctx.strokeRect(q.x - q.r * f, gY - 700, q.r * 2 * f, 700); }
        else { ctx.beginPath(); ctx.ellipse(q.x, gY + 4, q.r, 12, 0, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(255,120,120,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(q.x, gY + 4, q.r * f, 12 * f, 0, 0, 6.3); ctx.stroke(); }
      } else {
        s = (q.t - q.w0) / 0.5; h = Math.sin(Math.min(1, s * 1.6) * 1.57) * (1 - Math.max(0, s - 0.7) / 0.3);
        if (q.kind) { ctx.fillStyle = (p5.uv === 9 ? 'rgba(255,236,170,' : 'rgba(150,255,235,') + (0.75 * (1 - s * 0.5)).toFixed(2) + ')'; ctx.fillRect(q.x - q.r, gY - 700, q.r * 2, 700); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(q.x - q.r * 0.4, gY - 700, q.r * 0.8, 700); csGlow(q.x, gY - 40, 120, '120,255,230', 0.4); }
        else { ctx.strokeStyle = '#1f7a6a'; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q.x, gY + 4); ctx.quadraticCurveTo(q.x + Math.sin(q.t * 18) * 18, gY - 90 * h, q.x + Math.sin(q.t * 12) * 26, gY - 170 * h); ctx.stroke(); ctx.strokeStyle = '#59d4b4'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(q.x - 6, gY); ctx.quadraticCurveTo(q.x + Math.sin(q.t * 18) * 18 - 6, gY - 90 * h, q.x + Math.sin(q.t * 12) * 26 - 6, gY - 170 * h); ctx.stroke(); }
      }
    }
  }

function colOkAny() { return !paused && !p5.on && !boss.on && !ep.on && !kk.on && !cs.on && !fin.on && !p6.on && !rit.on && !dlgOpened && !lt.st && !mb.on && !miniOpen && !hn.on && !dn.on && !av.on && !cab.on; }

function colOk() { return colOkAny() && (loc.i === 0 || loc.i === 1 || loc.i === 2 || loc.i === 10 || loc.i === 11); }

function colTick(dt) {
    if (!(save.mx.bkO && (save.mx.bkD | 0) > 0)) { col.on = false; col.cd = Math.max(col.cd, 45); return; }
    if (col.on && col.loc !== loc.i) { col.on = false; col.cd = 25; }
    if (!col.on) {
      if (col.cd > 0 && colOk()) col.cd -= dt;
      if (col.cd <= 0 && colOk()) { var W0 = LOCS[loc.i].w; col.x = Math.max(60, Math.min(W0 - 60, P.x + (P.x > W0 / 2 ? -1 : 1) * 650)); col.loc = loc.i; col.on = true; col.ph = 0; sfx('no'); toast('Банк прислал коллектора за долгом. Он идёт к тебе.', 4500); }
      return;
    }
    if (!colOk()) return;
    var dx = P.x - col.x; col.face = dx > 0 ? 1 : -1; col.ph += dt * 9; col.x += col.face * Math.min(spd() * 0.8, 240) * dt;
    if (Math.abs(dx) < 70 && P.z < 80) colCatch();
  }

function colAway(sec) { col.on = false; col.cd = sec; }

function colCatch() {
    var D = save.mx.bkD | 0, part = Math.min(D, Math.max(1, Math.ceil(D * 0.12))), ch = [];
    col.ru = 0; input.left = input.right = false;
    if (save.coins >= D) ch.push({ t: 'Погасить весь долг: ' + fmtN(D), fn: function () { dlgClose(); bkPay(D); colAway(60); } });
    if (save.coins >= part) ch.push({ t: 'Откупиться: ' + fmtN(part) + ' (он уйдёт на 2 минуты)', fn: function () { dlgClose(); save.coins -= part; save.mx.bkD = Math.max(1, D - part); bkPrev = save.coins; hud(); persist(); sfx('sell'); colAway(120); toast('Коллектор взял ' + fmtN(part) + ' в счёт долга и ушёл.', 4000); } });
    ch.push({ t: 'Отбиться: два испытания подряд', fn: function () {
      dlgClose();
      miniRun(mnPick(2), 0.6, 'Отбиться от коллектора', function (ok) {
        if (ok) { save.mx.cof = Math.min(9999, (save.mx.cof | 0) + 1); persist(); ach('colf'); sfx('rare'); colAway(180); toast('Коллектор отступил. На три минуты можно выдохнуть, но долг никуда не делся.', 5500); }
        else { var loss = Math.min(save.coins, Math.ceil(D * 0.2)); save.coins -= loss; save.mx.bkD = Math.max(1, D - Math.floor(loss * 0.5)); bkPrev = save.coins; hud(); persist(); hurt(20); runN++; colAway(75); if (runN >= 3) jailArrest('Коллекторы устали с тобой возиться.'); toast('Коллектор отобрал ' + fmtN(loss) + ' коинов (половина пошла в счёт долга) и ушёл.', 5500); }
      });
    } });
    ch.push({ t: 'Убежать', fn: function () { dlgClose(); runN++; if (runN >= 3) { jailArrest('Ты в третий раз убегаешь от коллекторов.'); return; } col.x += (P.x > col.x ? -1 : 1) * 160; if (runN === 2) toast('Ещё один побег, и тебя посадят.', 3500); } });
    dlgShow('Коллектор', null, 'Долг: ' + fmtN(D) + ' коинов. Банк терпеть не будет. Платим, откупаемся или бегаем?', ch, 'Бежать можно, но он вернётся. Пока долг просрочен, коллекторы будут приходить снова.');
  }

function drawCollector() {
    if (!col.on || col.loc !== loc.i) return;
    ctx.save(); drawGunnerAt(col.x, gY, col.face > 0 ? 0 : Math.PI, false, false, 1.4, col.ph); ctx.restore();
    ctx.fillStyle = '#ff5a5a'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('КОЛЛЕКТОР', col.x, gY - 150);
  }

function fatStart() { fatDome = { x: P.x }; fatB = []; fatSp = 0.3; fatLoc = loc.i; }

function fatTick(dt) {
    var i, e, dx, sp, b;
    if (!(mgFat > 0) || !fatDome) { if (fatDome) { fatDome = null; } if (fatB.length) { for (i = fatB.length - 1; i >= 0; i--) { fatB[i].t += dt * 3; if (fatB[i].t > 9) fatB.splice(i, 1); } } return; }
    if (fatLoc !== loc.i) { fatDome = null; fatB = []; return; }
    var R = 270;
    fatSp -= dt;
    if (fatSp <= 0 && (boss.on || p5.on || ep.on || kk.on || loc.i === 10)) { fatSp = mgFatB ? 0.55 : 1.1; fatB.push({ x: fatDome.x + (Math.random() - 0.5) * R * 1.6, y: gY - 470, vy: 0, t: 0 }); }
    for (i = fatB.length - 1; i >= 0; i--) {
      b = fatB[i]; b.t += dt; b.vy += 900 * dt; b.y += b.vy * dt; if (b.y >= gY - 14) { b.y = gY - 14; b.vy = 0; }
      if (Math.abs(b.x - P.x) < 46 && P.z < 60 && b.y > gY - 70) { hp = Math.min(maxHp(), hp + 5); if (typeof mgMana === 'number') mgMana = Math.min(mgCap(), mgMana + 8); sfx('pick'); popup(b.x, 90, '+5 HP', '#9dffb8'); fatB.splice(i, 1); continue; }
      if (b.t > 9) fatB.splice(i, 1);
    }
    var hw = R - 36, cx = fatDome.x;
    if (p5.on && p5.st === 'fight') for (i = 0; i < p5.en.length; i++) {
      e = p5.en[i]; if (e.dead || e.ghost) continue; dx = cx - e.x;
      var inside = Math.abs(dx) < hw;
      if (inside) {
        // замедление: гасим часть того, на сколько враг сдвинулся и как быстро идут его перезарядки
        if (e.lx !== undefined) e.x -= (e.x - e.lx) * 0.45;
        if (e.cd > 0) e.cd += dt * 0.45; if (e.aT > 0 && e.atk) e.aT += dt * 0.45;
        if (!e.slw) { e.slw = 1; popup(e.x, 200, 'ЗАМЕДЛЕН', '#d6b3ff'); }
        if (Math.abs(cx - e.x) > hw) e.x = cx + (e.x > cx ? hw : -hw);
      } else if (Math.abs(dx) < 1300) {
        sp = (e.k === 'kk' || e.k === 'm' || e.k === 'bs') ? 110 : 190; e.x += (dx > 0 ? 1 : -1) * sp * dt;
      }
      e.lx = e.x;
    }
    if (loc.i === 10 && !mb.on) for (i = 0; i < mogs.length; i++) {
      dx = cx - mogs[i].x;
      if (Math.abs(dx) < hw) { if (mogs[i].cd > 0) mogs[i].cd += dt * 0.45; if (Math.abs(mogs[i].x - cx) > hw) mogs[i].x = cx + (mogs[i].x > cx ? hw : -hw); }
      else if (Math.abs(dx) < 1300) mogs[i].x += (dx > 0 ? 1 : -1) * 170 * dt;
    }
    if (boss.on && boss.st !== 'intro' && boss.st !== 'dying') {
      dx = cx - boss.x;
      if (Math.abs(dx) < hw) { if (boss.cd > 0) boss.cd += dt * 0.45; if (Math.abs(boss.x - cx) > hw) boss.x = cx + (boss.x > cx ? hw : -hw); }
      else if (Math.abs(dx) < 1300) boss.x += (dx > 0 ? 1 : -1) * 110 * dt;
    }
  }

function drawFatBurgers() {
    for (var i = 0; i < fatB.length; i++) {
      var b = fatB[i], a = b.t > 7 ? Math.max(0, 1 - (b.t - 7) / 2) : 1; if (fatLoc !== loc.i) continue;
      ctx.save(); ctx.globalAlpha = a; ctx.translate(b.x, b.y);
      ctx.fillStyle = '#d6902a'; ctx.beginPath(); ctx.ellipse(0, -2, 22, 12, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#4fae3b'; ctx.fillRect(-21, -2, 42, 4); ctx.fillStyle = '#7a3a1c'; ctx.fillRect(-20, 2, 40, 6);
      ctx.fillStyle = '#d6902a'; ctx.beginPath(); ctx.ellipse(0, 9, 21, 6, 0, 0, Math.PI); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(-8, -9, 3, 2); ctx.fillRect(4, -10, 3, 2);
      if (b.y >= gY - 16) { csGlow(0, 0, 40 + 5 * Math.sin(t * 6), '255,210,63', 0.25 * a); }
      ctx.restore();
    }
  }

function hvRel() { return save.mx.rel | 0; }

function hvPriest1() {
    dlgShow('Священник', img.priest, 'Ты закрыл шесть окон и дошёл до самого конца. Теперь можно сказать. Я не всегда стоял у этого алтаря. Раньше я вёл книгу небес: записывал, какие миры настоящие, а какие нет.', [
      { t: 'Ты был судьёй?', fn: function () {
        dlgShow('Священник', img.priest, 'Младшим писцом. Но рука была моя. Когда Моггити пришёл из петли, мне велели вычеркнуть его как ошибку. Потом то же сделали с Праймом. Небеса отвергли их не из жестокости. Я сам перечеркнул их строки. А потом убежал сюда и молился, чтобы никто не ответил. Теперь я боюсь, что ответят.', [
          { t: 'Что мне сделать?', fn: function () {
            dlgShow('Священник', img.priest, 'Подняться и посмотреть в книгу своими глазами. Лестница за алтарём откроется, если ты зажжёшь три свечи: за вычеркнутых, за тех, кого вычеркнули зря, и за тех, кого хотел бы спасти.', [
              { t: 'Зажечь свечи', fn: function () { hvCandles(); } }, { t: 'Потом', out: true }]);
          } }, { t: 'Уйти', out: true }]);
      } }, { t: 'Не сейчас', out: true }]);
  }

function hvCandles() {
    var m = save.mx.hvc | 0, ch = [], names = ['За Чикена Моггити', 'За Кокича Прайма', 'За Меллстроя и профессора'], i;
    if (m === 7) { hvOpen(); return; }
    for (i = 0; i < 3; i++) if (!((m >> i) & 1)) ch.push({ t: names[i], fn: (function (i) { return function () { save.mx.hvc = (save.mx.hvc | 0) | (1 << i); persist(); sfx('pick'); toast('Свеча зажжена: ' + names[i].toLowerCase() + '.', 2500); hvCandles(); }; })(i) });
    var left = ch.length; ch.push({ t: 'Уйти', out: true });
    dlgShow('Свечи', null, 'У подставки ещё ' + left + (left === 1 ? ' свеча' : ' свечи') + '. Кого помянуть?', ch);
  }

function hvOpen() {
    save.mx.hv = 1; persist(); ach('hvp'); sfx('rare'); shk = Math.max(shk, 0.6);
    var r = hvRel(), l = r === 1 ? 'Твоя вера шепчет: иди без страха.' : (r === 2 ? 'Твоя вера торопит: беги, пока открыто.' : (r === 3 ? 'Твоя вера считает: цена подъёма невелика.' : 'Ты идёшь без чьей-либо веры.'));
    dlgShow('Священник', img.priest, 'Все три горят. За алтарём что-то открылось. Лестница уходит в облака. ' + l + ' Поднимайся, я останусь здесь: на небесах я больше не желанный гость.', [{ t: 'Хорошо', out: true }]);
  }

function hvAscend() {
    if (!(save.mx.hv | 0)) return;
    if (!(save.mx.hv >= 2)) { dlgShow('Лестница', null, 'Ступени из света уходят в облака. Наверху тебя ждут вопросы, на которые у священника нет ответов. Каждый шаг даётся с трудом: нужно пройти испытание.', [
      { t: 'Подняться (два испытания)', fn: function () { dlgClose(); miniRun(mnPick(2), 0.6, 'Подъём на небеса', function (ok) { if (ok) hvGo(); else dlgShow('Лестница', null, 'Ступени рассыпались под ногой. Попробуй ещё раз.', [{ t: 'Ладно', out: true }]); }); } },
      { t: 'Не сейчас', out: true }]); return; }
    hvGo();
  }

function hvGo() {
    var first = (save.mx.hv | 0) < 2; ltGo(25, 'left', 220);
    if (first) { save.mx.hv = 2; persist(); ach('hvs'); setTimeout(function () { if (loc.i === 25 && !dlgOpened && !cs.on) dlgShow('Рассказчик', null, 'Небеса оказались не облаками с арфами, а канцелярией. Бесконечные столы, парящие книги и три Судьи, которые ведут запись всех миров. Здесь любую вселенную можно вычеркнуть одним росчерком.', [{ t: 'Осмотреться', out: true }]); }, 1800); }
  }

function hvJudge(i) {
    var bit = 1 << i, c2p = save.mx.c2p | 0, ch = [];
    var T = [
      ['Судья Счёта', 'Каждая закрытая вселенная — строка в книге. Ты закрыл пять. Шестую вычеркнул писец, но мы ту запись не подписывали. Итог: пять миров ждут решения. Решает Врата.', 'Что станет с копиями?', 'Копии живут, пока книга не закрыта. Закроют вместе с книгой: тогда они исчезнут. Или их оставят, если кто-то за них поручится.'],
      ['Судья Записи', 'Ошибки записи: Чикен Моггити и Кокич Прайм. Их строки противоречили сами себе, поэтому небеса их отвергли. Они не злые. Они лишние.' + (c2p === 2 ? ' Прайм вычеркнул себя ради мира: это единственная строка, которую мы одобряем.' : (c2p === 3 ? ' Прайм умер, чтобы Моггити остался. Такие записи не оспариваются.' : '')), 'Кто вычеркнул их на самом деле?', 'Рука писца. Он дрожал, когда писал. Мы просили его остаться, но он сбежал. Мы не злимся: просто хотели бы знать, где он.'],
      ['Судья Милости', 'Ваш священник был нашим писцом. Единственным, кто плакал над книгой. Мы не искали его: пусть молится. Но если решишь спорить с приговором, помни: Старший Судья не любит, когда книгу открывают без разрешения.', 'Можно ли оспорить приговор?', 'Можно. Старший Судья защищает запись. Победишь его, и книга станет твоей. Только учти: останется ли запись справедливой, не гарантируем.']
    ];
    var d = T[i];
    ch.push({ t: d[2], fn: function () { save.mx.hvj = (save.mx.hvj | 0) | bit; persist(); dlgShow(d[0], null, d[3], [{ t: 'Понятно', out: true }], (save.mx.hvj | 0) === 7 ? 'Все три Судьи выслушаны: подойди к Вратам.' : ''); } });
    ch.push({ t: 'Уйти', out: true });
    dlgShow(d[0], null, d[1], ch);
    save.mx.hvj = (save.mx.hvj | 0) | bit; persist();
  }

function hvGate() {
    var h = save.mx.hv | 0, ch = [];
    if ((save.mx.hvj | 0) !== 7) { dlgShow('Врата', null, 'Врата закрыты. Три Судьи должны выслушать тебя, а ты их. Поговори с каждым.', [{ t: 'Хорошо', out: true }]); return; }
    if (h >= 3) {
      ch.push({ t: 'Сразиться со Старшим Судьёй ещё раз', fn: function () { dlgClose(); hvFight(); } }); ch.push({ t: 'Уйти', out: true });
      dlgShow('Врата', null, 'Книга закрыта: решение принято (' + (h === 3 ? 'копии сохранены' : (h === 4 ? 'копии стёрты' : 'небеса без судей')) + '). Но Старший Судья готов встретиться снова.', ch); return;
    }
    ch.push({ t: 'Сохранить копии: пусть живут', fn: function () { dlgClose(); hvEnd(3); } });
    ch.push({ t: 'Стереть копии и ответить самому', fn: function () { dlgClose(); hvEnd(4); } });
    ch.push({ t: 'Оспорить приговор: бой со Старшим Судьёй', fn: function () { dlgClose(); hvFight(); } });
    ch.push({ t: 'Подумать', out: true });
    dlgShow('Врата', null, 'За Вратами лежит книга. Старший Судья ждёт твоего слова. Копии вселенных ещё живы, и от тебя зависит, останутся ли они.', ch, 'Сохранить: копии остаются, но ты отвечаешь за них. Стереть: мультивселенная исчезает, но запись чиста. Оспорить: бой, и книга станет твоей.');
  }

function hvFight() {
    if (p5.on || cs.on || lt.st) return;
    if (rcMulti()) { try { socket.emit('uni', { k: 9, kind: 'hv' }); } catch (e) {} }
    uniPend = 9; uniV = 9; c2cur = 9; ltGo(UNI, 'left', UNI_PORTAL + 140);
  }

function hvWin() {
    p5Title('ПРИГОВОР ПЕРЕПИСАН', 'Старший Судья отступил', 3.5);
    setTimeout(function () { if (!p5.on || !p5.uni) return; p5End('uni'); ltGo(25, 'left', 2450); setTimeout(function () { hvEnd(5); }, 1600); }, 2600);
  }
