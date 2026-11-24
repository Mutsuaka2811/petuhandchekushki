/* init · 141 declarations · drawShop = function () { if (!GX) return _drawShop0(); var x = SHOP_X, w = SHOP_W, top = gY - 160, nv = nightK() > 0.25  */

drawShop = function () {
    if (!GX) return _drawShop0();
    var x = SHOP_X, w = SHOP_W, top = gY - 160, nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxShop', 250, w / 2 + 90, 14, function (cx) { gxShopArt(cx, w, nv); }, x + w / 2)) return _drawShop0();
    gxBig('МАГАЗИН', x + w / 2, top + 33, 22, '#ffffff', null);
    ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#6a4a2e'; ctx.fillText('Приём стеклотары', x + 187, top + 144);
    if (ready(img.bottle)) { for (var b = 0; b < 4; b++) ctx.drawImage(img.bottle, x + 30 + b * 24, top + 84, 14, 34); for (var c = 0; c < 3; c++) ctx.drawImage(img.bottle, x + w + 24 + c * 13, gY - 52, 11, 26); }
    if (shopFlash > 0) { ctx.fillStyle = 'rgba(255, 226, 122,' + (shopFlash * 0.35) + ')'; ctx.fillRect(x - 14, top - 26, w + 28, 186); }
    gxBig('1 чекушка = ' + fmtP(save.rate) + ' ' + coinWord(r1(save.rate)), x + w / 2, top - 84, 22, '#ffffff', '#14233f');
  };

var _drawGarage0 = drawGarage;

drawGarage = function () {
    if (!GX) return _drawGarage0();
    var x = UP_X, w = UP_W, top = gY - 160, nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxGar', 250, w / 2 + 90, 14, function (cx) { gxGarageArt(cx, w, nv); }, x + w / 2)) return _drawGarage0();
    gxBig('ГАРАЖ', x + w / 2, top + 33, 22, '#ffd23f', null); gxText('улучшения', x + w / 2, top + 50, 12, '#fff', null);
    gxBig('Улучшения', x + w / 2, top - 44, 20, '#ffffff', '#14233f');
  };

var _drawWash0 = drawWash;

drawWash = function () {
    if (!GX) return _drawWash0();
    var x = WASH_X, w = WASH_W, top = gY - 130, nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxWsh', 220, w / 2 + 40, 14, function (cx) { gxWashArt(cx, w, nv); }, x + w / 2)) return _drawWash0();
    gxBig('МОЙКА', x + w / 2, top + 36, 22, '#ffffff', null);
    if (wash.on) {
      ctx.fillStyle = 'rgba(120,200,240,.85)'; ctx.fillRect(x + 71, top + 80, 4, (gY - 42) - (top + 80));
      for (var k = 0; k < 11; k++) { var px = x + 48 + ((k * 37 + t * 40) % 92), py = gY - 44 - ((t * 45 + k * 19) % 46); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(px, py, 2 + (k % 3), 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); }
    } else { ctx.fillStyle = 'rgba(255,255,255,.7)'; var dp = (t * 0.7) % 1; ctx.beginPath(); ctx.arc(x + 72, top + 82 + dp * 30, 2, 0, 6.3); ctx.fill(); }
    gxBig('Чистая чекушка ' + fmtMult(CLEAN_MULT), x + w / 2, top - 44, 20, '#ffffff', '#14233f');
  };

var _drawBillboard0 = drawBillboard;

drawBillboard = function () {
    if (!GX) return _drawBillboard0();
    var x = BB_X, w = BB_W, bh = 150, by = gY - 335, p = save.rate, c = pctOf(p), col = c > 0 ? '#3ddc84' : (c < 0 ? '#ff5a5f' : '#ffffff'), nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxBb', 360, w / 2 + 40, 14, function (cx) {
      var X = cx - w / 2, by = gY - 335;
      gxShadow(cx, gY + 5, w * 0.5, 0.8);
      gxPanel(X + 34, by + bh, 14, gY - by - bh + 2, '#5b616c', { lw: 1.8 }); gxPanel(X + w - 48, by + bh, 14, gY - by - bh + 2, '#5b616c', { lw: 1.8 });
      gxPanel(X + 26, gY - 10, 30, 12, '#3f444f', { r: 3, lw: 1.8 }); gxPanel(X + w - 56, gY - 10, 30, 12, '#3f444f', { r: 3, lw: 1.8 });
      gxTube([[X + 48, by + bh + 30], [X + w - 48, gY - 40]], 4, '#6a717e'); gxTube([[X + w - 48, by + bh + 30], [X + 48, gY - 40]], 4, '#6a717e');
      gxPanel(X + 30, by + bh + 4, w - 60, 8, '#4a505c', { lw: 1.6 });
      gxPanel(X - 9, by - 9, w + 18, bh + 18, '#2a2f3a', { r: 12, lw: 2.8 });
      for (var l = 0; l < 2; l++) { var lx = X + 44 + l * (w - 88); gxTube([[lx, by - 9], [lx, by - 24]], 5, '#3a3f4b'); ctx.fillStyle = '#fff4b8'; ctx.beginPath(); ctx.ellipse(lx, by - 26, 10, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); gxGlow(lx, by - 22, nv ? 70 : 44, '255,240,170', nv ? 0.9 : 0.5); }
      gxRR(X, by, w, bh, 7); ctx.fillStyle = '#0b1526'; ctx.fill();
      ctx.save(); gxRR(X, by, w, bh, 7); ctx.clip(); var sg = ctx.createLinearGradient(X, by, X + w, by + bh); sg.addColorStop(0, 'rgba(110,160,255,.12)'); sg.addColorStop(1, 'rgba(110,160,255,0)'); ctx.fillStyle = sg; ctx.fillRect(X, by, w, bh); ctx.restore();
    }, x + w / 2)) return _drawBillboard0();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left'; ctx.fillStyle = '#8fd3ff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.fillText('Курс чекушки', x + 12, by + 18);
    ctx.textAlign = 'right'; ctx.fillStyle = '#6f87a6'; ctx.font = '11px "Rubik", system-ui, sans-serif'; ctx.fillText('коинов за штуку', x + w - 12, by + 18);
    ctx.textAlign = 'left'; ctx.fillStyle = col; ctx.font = '46px "Russo One", "Arial Black", Impact, sans-serif';
    var ptxt = fmtP(p); ctx.shadowColor = col; ctx.shadowBlur = 10; ctx.fillText(ptxt, x + 12, by + 62); ctx.shadowBlur = 0;
    var tw = ctx.measureText(ptxt).width;
    if (rate.dir !== 0) { var ax = x + 12 + tw + 12, ay = by + 62; ctx.fillStyle = rate.dir > 0 ? '#3ddc84' : '#ff5a5f'; ctx.beginPath(); if (rate.dir > 0) { ctx.moveTo(ax - 8, ay + 7); ctx.lineTo(ax + 8, ay + 7); ctx.lineTo(ax, ay - 8); } else { ctx.moveTo(ax - 8, ay - 7); ctx.lineTo(ax + 8, ay - 7); ctx.lineTo(ax, ay + 8); } ctx.closePath(); ctx.fill(); }
    var hs = rate.hist, gx = x + w - 84, gy = by + 34, gw = 72, gh = 38;
    if (hs.length > 1) {
      var mn = Math.min.apply(null, hs), mx = Math.max.apply(null, hs); if (mx - mn < 1) { mx += 0.5; mn -= 0.5; }
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath();
      for (var i = 0; i < hs.length; i++) { var px = gx + gw * i / (hs.length - 1), py = gy + gh - (hs[i] - mn) / (mx - mn) * gh; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
      ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(gx + gw, gy + gh - (hs[hs.length - 1] - mn) / (mx - mn) * gh, 3, 0, 6.3); ctx.fill();
    }
    ctx.textAlign = 'left'; ctx.font = '12px "Rubik", system-ui, sans-serif';
    if (rate.ev) { ctx.fillStyle = rate.ev.m > 1 ? '#3ddc84' : '#ff5a5f'; ctx.fillText(rate.ev.name + ' · ' + fmtTime(rate.ev.left), x + 12, by + 90); }
    else { ctx.fillStyle = '#9fb4cf'; ctx.fillText('Было ' + BASE_PRICE + ', стало ' + fmtP(p) + ' · ' + fmtTime(rate.t), x + 12, by + 90); }
    ctx.fillStyle = c > 0 ? 'rgba(61,220,132,.22)' : (c < 0 ? 'rgba(255,90,95,.22)' : 'rgba(255,255,255,.14)'); rrect(x + 12, by + 104, w - 24, 34, 8); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.5; rrect(x + 12, by + 104, w - 24, 34, 8); ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = col; ctx.font = '17px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillText(pctStr(p) + '  ' + (c > 0 ? 'выгодно' : (c < 0 ? 'невыгодно' : 'как обычно')), x + w / 2, by + 122);
  };

var _drawStop0 = drawStop;

drawStop = function (st) {
    if (!GX) return _drawStop0(st);
    var x = st.x, nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxStop', 190, 110, 14, function (cx) {
      gxShadow(cx, gY + 4, 76, 0.85);
      gxPanel(cx - 56, gY - 106, 7, 106, '#4a5360', { lw: 1.8 }); gxPanel(cx + 49, gY - 106, 7, 106, '#4a5360', { lw: 1.8 });
      gxPanel(cx - 62, gY - 114, 124, 14, '#c8323c', { r: 5, lw: 2.2, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(cx - 58, gY - 112, 116, 3);
      ctx.fillStyle = nv ? 'rgba(255,230,160,.55)' : 'rgba(159,211,232,.5)'; ctx.fillRect(cx - 49, gY - 100, 98, 72); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(cx - 44, gY - 28); ctx.lineTo(cx - 14, gY - 100); ctx.lineTo(cx + 2, gY - 100); ctx.lineTo(cx - 28, gY - 28); ctx.fill(); gxInk(1.8); ctx.strokeRect(cx - 49, gY - 100, 98, 72);
      gxPanel(cx - 40, gY - 92, 80, 18, '#1f4aa8', { r: 3, lw: 1.8 });
      gxPanel(cx - 36, gY - 32, 72, 8, '#9a6a36', { lw: 1.8, r: 2 }); gxPanel(cx - 32, gY - 24, 6, 24, '#7a5028', { lw: 1.4 }); gxPanel(cx + 26, gY - 24, 6, 24, '#7a5028', { lw: 1.4 });
      gxPanel(cx + 65, gY - 152, 5, 152, '#6b727c', { lw: 1.6 }); ctx.fillStyle = '#1f56c8'; ctx.beginPath(); ctx.arc(cx + 68, gY - 160, 17, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(cx + 68, gY - 160, 13, 0, 6.3); ctx.stroke();
      gxPanel(cx + 58, gY - 167, 20, 13, '#fff', { r: 3, lw: 1.4 }); ctx.fillStyle = '#1f56c8'; ctx.fillRect(cx + 61, gY - 164, 14, 4); ctx.fillStyle = '#1f2a44'; ctx.beginPath(); ctx.arc(cx + 62, gY - 153, 2.2, 0, 6.3); ctx.arc(cx + 74, gY - 153, 2.2, 0, 6.3); ctx.fill();
      gxPanel(cx - 48, gY - 138, 96, 22, '#16337d', { r: 5, lw: 2 });
    }, x)) return _drawStop0(st);
    gxText('Автобус', x, gY - 83, 11, '#fff', null); gxText(st.name, x, gY - 127, 13, '#fff', null);
    if (st.home || st.link) {
      var rts = crossRoutes(st), ry = gY - 150; ctx.font = '700 10px "Rubik", system-ui, sans-serif';
      for (var rq = 0; rq < rts.length; rq++) { var rt = rts[rq], lbl = (rt.dir < 0 ? '◀ ' : '') + rt.name.replace('В ', '').toUpperCase() + (rt.dir > 0 ? ' ▶' : ''), rw = ctx.measureText(lbl).width + 16; gxPanel(x - rw / 2, ry - rq * 17, rw, 14, '#0f7a4a', { r: 4, lw: 1.6 }); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(lbl, x, ry - rq * 17 + 7.5); }
    }
  };

var _drawFuel0 = drawFuel;

drawFuel = function (f) {
    if (!GX) return _drawFuel0(f);
    var x = f.x, nv = nightK() > 0.25 ? 1 : 0;
    if (!gxSprite('gxFuel', 230, 130, 14, function (cx) {
      gxShadow(cx, gY + 4, 124, 0.85);
      gxPanel(cx - 86, gY - 152, 9, 152, '#5a6372', { lw: 1.8 }); gxPanel(cx + 77, gY - 152, 9, 152, '#5a6372', { lw: 1.8 });
      gxPanel(cx - 106, gY - 172, 212, 26, '#eef0f4', { r: 5, lw: 2.4, vert: true }); gxPanel(cx - 106, gY - 172, 212, 8, '#d8362f', { r: 4, lw: 2 });
      for (var k = -1; k <= 1; k += 2) {
        var px = cx + k * 30; gxPanel(px - 16, gY - 76, 32, 76, '#d8362f', { r: 6, lw: 2.2 }); gxPanel(px - 10, gY - 68, 20, 20, '#14233f', { r: 3, lw: 1.6 }); ctx.fillStyle = '#9fe3ff'; ctx.fillRect(px - 8, gY - 66, 16, 6);
        gxTube([[px + 16, gY - 54], [px + 26, gY - 48], [px + 26, gY - 26]], 4, '#2a2a30'); gxPanel(px - 12, gY - 8, 24, 8, '#8a909c', { lw: 1.4 });
      }
      gxPanel(cx - 40, gY - 212, 80, 34, '#14233f', { r: 7, lw: 2.4 }); if (nv) gxGlow(cx, gY - 195, 100, '255,210,63', 0.35);
      for (var l = 0; l < 4; l++) { ctx.fillStyle = nv ? '#fff6c0' : '#e0e6f0'; ctx.fillRect(cx - 96 + l * 64, gY - 146, 20, 5); if (nv) gxGlow(cx - 86 + l * 64, gY - 143, 40, '255,236,170', 0.5); }
    }, x)) return _drawFuel0(f);
    gxBig('АЗС', x, gY - 195, 20, '#ffd23f', null);
    var fp = fuelPrice(); ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = fp >= 300 ? '#c4161c' : fp >= 60 ? '#7a4b00' : '#14233f'; ctx.fillText('ДЕФИЦИТ: ' + fp + ' за литр', x, gY - 159);
  };

var _drawGateSign0 = drawGateSign;

drawGateSign = function (x, text, locked) {
    if (!GX) return _drawGateSign0(x, text, locked);
    gxSprite('gxGate' + (locked ? 'L' : 'O'), 170, 90, 14, function (cx) {
      gxShadow(cx, gY + 4, 44, 0.8); gxPanel(cx - 4, gY - 124, 8, 124, '#4a5360', { lw: 1.8 }); gxPanel(cx - 68, gY - 152, 136, 42, locked ? '#8a3b3b' : '#1f56c8', { r: 8, lw: 2.4, vert: true }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; gxRR(cx - 64, gY - 148, 128, 34, 5); ctx.stroke();
      if (locked) { for (var k = 0; k < 4; k++) { gxPanel(cx - 44 + k * 22, gY - 54, 12, 10, '#e8c23a', { lw: 1.4 }); } gxPanel(cx - 48, gY - 58, 96, 5, '#c8323c', { lw: 1.6 }); gxPanel(cx - 48, gY - 38, 96, 5, '#c8323c', { lw: 1.6 }); }
    }, x);
    gxText(text, x, gY - 131, 13, '#fff', null);
  };

var GXS = {};

var _drawLocBack0 = drawLocBack, _drawLocFront0 = drawLocFront, _drawLocDetail0 = drawLocDetail, _drawGround1 = drawGround;

drawLocBack = function () {
    if (!GX || gxFight()) return _drawLocBack0();
    var L = LOCS[loc.i], S = GXS[L.theme]; if (!S) return _drawLocBack0();
    var x0 = camX - 10, x1 = camX + vw + 10, nv = gxNv();
    if (S.par) S.par(L, x0, x1, nv);
    setCam(1);
    if (S.back) gxLayer('b' + L.id, x0, x1, gxUp(), gxDown(), function (xa, xb, n2) { S.back(L, xa, xb, n2); }, nv);
    setCam(1); if (S.anim) S.anim(L, x0, x1, nv);
  };

drawLocFront = function () {
    if (!GX || gxFight()) return _drawLocFront0();
    var L = LOCS[loc.i], S = GXS[L.theme]; if (!S) return _drawLocFront0();
    var x0 = camX - 140, x1 = camX + vw + 140, nv = gxNv();
    setCam(1);
    if (S.front) gxLayer('f' + L.id, x0, x1, gxUp(), gxDown(), function (xa, xb, n2) { S.front(L, xa, xb, n2); }, nv);
    setCam(1); if (S.afront) S.afront(L, x0, x1, nv);
    setCam(1); if (S.extra) S.extra(L, x0, x1, nv);
    setCam(1); drawNxFront(L, x0, x1);
    var lst = LOC_STOPS[loc.i]; if (lst && lst.x + 90 > camX && lst.x - 90 < camX + vw) drawStop(lst);
    drawGates();
  };

drawLocDetail = function () { if (GX && !gxFight() && GXS[(loc.i === 0) ? 'village' : LOCS[loc.i].theme]) return; return _drawLocDetail0(); };

var _drawGround2 = drawGround;

drawGround = function () {
    if (GX && loc.i === 2) { setCam(1); gxLayer('g2', camX - 10, camX + vw + 10, gxUp(), gxDown(), function (xa, xb, nv) { gxParkGround(xa, xb, nv); }, gxNv()); return; }
    if (GX && loc.i === 11) { setCam(1); gxLayer('g11', camX - 10, camX + vw + 10, gxUp(), gxDown(), function (xa, xb, nv) { gxForestGround(xa, xb, nv); }, gxNv()); return; }
    return _drawGround2();
  };

GXS.city = {
    par: function (L) { parallaxSkyline(0.25, 20, 150, 150, '#9fb4cf', 3); parallaxSkyline(0.45, 8, 120, 160, '#8497b6', 11); },
    back: function (L, xa, xb, nv) {
      var bx = -20, i = 0, rw, bh;
      gxGround(xa, xb, 'road', nv);
      while (bx < xb + 200 && bx < L.w) {
        rw = 100 + ((i * 53) % 90); bh = 260 + ((i * 97) % 220); if (bx + rw > L.w + 20) rw = L.w + 20 - bx;
        if (bx + rw > xa - 20 && bx < xb + 20 && rw > 4 && !(bx + rw > BG_X - 200 && bx < BG_X + 200) && !(bx + rw > BANK_X - 230 && bx < BANK_X + 230)) {
          var neon = (i % 4 === 1 && rw > 90) ? ['#ff4fa3', '#33e0ff', '#ffd23f'][i % 3] : null;
          gxBuilding(bx, rw, bh, { col: gxCityCols[i % 5], i: i + 1, roof: i + 1, nv: nv, cw: 28, ch: 36, neon: neon, neonT: ['ЧЕКУШКИ 24', 'СТЕКЛО И Ко', 'ТАРА-БАР'][i % 3], shop: (!neon && i % 3 === 0 && rw > 110) ? ['#d94a3c', '#2f7fd0', '#3da05a'][(i >> 1) % 3] : null });
        }
        bx += rw; i++;
      }
      gxGround(xa, xb, 'road', nv);
      GXW.forEach(function (wx) { if (wx > xa - 60 && wx < xb + 60) gxWifiArt(wx); });
      if (1900 > xa - 200 && 1900 < xb + 200) gxBourseArt(1900);
      for (var lx = 140; lx < L.w - 80; lx += 300) if (lx > xa - 60 && lx < xb + 60 && !gxCityBusy(lx, 14)) gxLamp(lx, nv, 150);
      GXBB.forEach(function (x, k) {
        if (x < xa - 120 || x > xb + 120) return; var hue = ['#ffd23f', '#ff6b6b', '#5ec8ff', '#7dff9a', '#ffb347'][k % 5];
        gxPanel(x - 5, gY - 214, 10, 214, '#3b4250', { lw: 1.8 }); gxPanel(x - 86, gY - 294, 172, 86, '#20293a', { r: 10, lw: 2.6 }); ctx.fillStyle = hue; ctx.globalAlpha = 0.28; gxRR(x - 80, gY - 288, 160, 74, 7); ctx.fill(); ctx.globalAlpha = 1;
        gxBig(BB_TXT[k % BB_TXT.length], x, gY - 252, 15, '#ffffff', null); ctx.fillStyle = hue; ctx.fillRect(x - 60, gY - 232, 120, 4); if (nv) gxGlow(x, gY - 250, 130, hue === '#ffd23f' ? '255,210,63' : '120,200,255', 0.3);
      });
      gxEach(xa, xb, 410, 300, 60, function (x, k) {
        if (x > L.w - 120 || k % 3 === 0 || gxCityBusy(x, 36)) return; var h = gxH(k * 7 + 2);
        if (k % 3 === 1) gxBin(x); else if (h < 0.4) gxBench(x); else if (h < 0.7) gxHydrant(x); else gxPlanter(x, k);
      });
      gxEach(xa, xb, 1100, 1250, 120, function (x, k) {
        if (x > L.w - 200 || gxCityBusy(x + 30, 80)) return; for (var z = -3; z <= 3; z++) { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(x + z * 16 - 5, gY + 5, 10, 11); }
        gxPanel(x + 60, gY - 122, 7, 122, '#2f3641', { lw: 1.6 }); gxPanel(x + 53, gY - 152, 21, 36, '#242b36', { r: 5, lw: 2 });
      });
    },
    anim: function (L, x0, x1, nv) {
      var i, ph;
      GXW.forEach(function (x) { if (x > x0 - 80 && x < x1 + 80) { ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x, gY - 308, 5 + Math.sin(t * 5) * 1.2, 0, 6.3); ctx.fill(); gxGlow(x, gY - 308, 26, '255,70,70', 0.8); ctx.strokeStyle = 'rgba(80,190,255,.8)'; ctx.lineWidth = 3; for (var a = 0; a < 3; a++) { var rr = 22 + a * 18 + ((t * 30) % 18); ctx.globalAlpha = Math.max(0, 1 - (rr - 22) / 70); ctx.beginPath(); ctx.arc(x, gY - 308, rr, -2.4, -0.74); ctx.stroke(); } ctx.globalAlpha = 1; } });
      if (1900 > x0 - 200 && 1900 < x1 + 200) {
        var h = 470, p = ccP(), up = mkHist.length < 2 || mkHist[mkHist.length - 1] >= mkHist[mkHist.length - 2];
        gxText('БИРЖА ЧЕКУШКА-КОИН', 1900, gY - h + 28, 12, '#d8e6ff', null);
        ctx.shadowColor = up ? '#34e07f' : '#ff5a5f'; ctx.shadowBlur = 10; gxBig((up ? '▲ ' : '▼ ') + p, 1900, gY - h + 66, 34, up ? '#34e07f' : '#ff5a5f', null); ctx.shadowBlur = 0;
        gxText('обновляется каждые ' + CC_TICK + ' с', 1900, gY - h + 92, 11, '#8fa3c7', null);
      }
      gxEach(x0, x1, 1100, 1250, 120, function (x, k) {
        if (x > L.w - 200 || gxCityBusy(x + 30, 80)) return; ph = Math.floor(t * 0.5 + k) % 3;
        var cols = [['#ff4b4b', '#4a2323'], ['#ffd23f', '#4a4223'], ['#4bff7a', '#234a2b']];
        for (var q = 0; q < 3; q++) { ctx.fillStyle = ph === q ? cols[q][0] : cols[q][1]; ctx.beginPath(); ctx.arc(x + 63.5, gY - 142 + q * 10, 4.2, 0, 6.3); ctx.fill(); if (ph === q) gxGlow(x + 63.5, gY - 142 + q * 10, 18, q === 0 ? '255,70,70' : (q === 1 ? '255,210,60' : '70,255,120'), 0.9); }
      });
    },
    front: function (L, xa, xb, nv) {
      if (BG_X > xa - 280 && BG_X < xb + 280) gxBurgerArt(BG_X);
      if (BANK_X > xa - 280 && BANK_X < xb + 280) gxBankArt(BANK_X);
    }
  };

GXS.park = {
    par: function () {
      drawHills(0.18, 150, '#a8d8a6', 38, 16, 1.2); drawHills(0.34, 96, '#86c485', 30, 14, 3.1); drawFarTrees(farTrees, 0.34, '#5f9d68', '#6aa874'); drawHills(0.5, 52, '#6bb36b', 22, 10, 5.0); drawFarTrees(midTrees, 0.58, '#3f8a52', '#4a9a5c');
      drawGround();
    },
    back: function (L, xa, xb, nv) {
      gxEach(xa, xb, 90, 60, 20, function (x, k) { var h = gxH(k * 7 + 3); if (h < 0.5 || (x > 2200 && x < 2800)) return; gxFlowers(x, 2, k); });
      [800, 1700, 3100, 3900].forEach(function (bx) { if (bx > xa - 60 && bx < xb + 60) gxBench(bx); });
      for (var lp = 400; lp < L.w - 200; lp += 520) if (lp > xa - 60 && lp < xb + 60) gxLamp(lp, nv, 130);
      gxEach(xa, xb, 610, 700, 80, function (x, k) { if (Math.abs(x - 1200) < 120 || Math.abs(x - 1950) < 240 || (x > 2150 && x < 2850) || x > L.w - 220) return; gxHedge(x - 50, 100); });
      if (330 > xa - 160 && 330 < xb + 160) {
        gxPanel(248, gY - 174, 16, 174, '#6a4528', { lw: 2 }); gxPanel(396, gY - 174, 16, 174, '#6a4528', { lw: 2 });
        gxPanel(240, gY - 200, 180, 38, '#2f9a58', { r: 14, lw: 2.6, vert: true });
        var bl = [{ x: 262, y: gY - 168, r: 15 }, { x: 288, y: gY - 160, r: 12 }, { x: 372, y: gY - 160, r: 12 }, { x: 398, y: gY - 168, r: 15 }]; gxBlob(bl, '#4fae3e', { lw: 2.4, seed: 4 });
        gxBig('ПАРК', 330, gY - 181, 18, '#ffffff', 'rgba(20,60,30,.9)');
      }
      if (1200 > xa - 140 && 1200 < xb + 140) {
        gxPanel(1148, gY - 24, 104, 24, '#c4ccda', { r: 6, lw: 2.4 }); gxPanel(1170, gY - 40, 60, 18, '#d4dbe6', { r: 5, lw: 2.2 }); gxPanel(1190, gY - 74, 20, 36, '#c4ccda', { r: 4, lw: 2 }); gxPanel(1176, gY - 84, 48, 12, '#d4dbe6', { r: 6, lw: 2 });
        ctx.fillStyle = gxLG(0, gY - 22, 0, gY - 8, '#9ee0fa', '#4aa8d8'); gxRR(1156, gY - 20, 88, 10, 5); ctx.fill();
      }
      if (2500 > xa - 300 && 2500 < xb + 300) {
        ctx.fillStyle = '#8a8f9c'; ctx.beginPath(); ctx.ellipse(2500, gY + 7, 268, 20, 0, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke();
        ctx.fillStyle = gxLG(0, gY - 10, 0, gY + 22, '#a8e4fa', '#3f9fd4'); ctx.beginPath(); ctx.ellipse(2500, gY + 7, 252, 15, 0, 0, 6.3); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(2440, gY + 2, 80, 4, 0, 0, 6.3); ctx.fill();
        for (var s = 0; s < 14; s++) { var sa = s * 0.4488, sx = 2500 + Math.cos(sa) * 262, sy = gY + 7 + Math.sin(sa) * 18; ctx.fillStyle = s % 2 ? '#b9b2a2' : '#a39c8c'; ctx.beginPath(); ctx.ellipse(sx, sy - 2, 11, 6, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }
      }
    },
    anim: function (L, x0, x1, nv) {
      if (1200 > x0 - 140 && 1200 < x1 + 140) {
        ctx.strokeStyle = 'rgba(150,224,250,.9)'; ctx.lineWidth = 3.4; ctx.lineCap = 'round';
        for (var ws = -1; ws <= 1; ws += 2) { ctx.beginPath(); ctx.moveTo(1200, gY - 88); ctx.quadraticCurveTo(1200 + ws * 44, gY - 124 + Math.sin(t * 5) * 4, 1200 + ws * 66, gY - 22); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(1200, gY - 88); ctx.lineTo(1200, gY - 112 - Math.sin(t * 6) * 6); ctx.stroke();
        ctx.fillStyle = 'rgba(210,244,255,.9)'; for (var q = 0; q < 6; q++) { var u = (t * 0.9 + q / 6) % 1; ctx.beginPath(); ctx.arc(1200 + (q % 2 ? 1 : -1) * (u * 62), gY - 24 - Math.sin(u * 3.14) * 56, 2.2, 0, 6.3); ctx.fill(); }
      }
      if (2500 > x0 - 280 && 2500 < x1 + 280) {
        ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2; for (var rp = 0; rp < 3; rp++) { var rw = (t * 24 + rp * 70) % 210; ctx.globalAlpha = 1 - rw / 210; ctx.beginPath(); ctx.ellipse(2440 + rp * 60, gY + 6, rw * 0.5, rw * 0.06, 0, 0, 6.3); ctx.stroke(); } ctx.globalAlpha = 1;
        for (var d = 0; d < 3; d++) {
          var dx = 2500 + Math.sin(t * 0.3 + d * 2.1) * (150 - d * 25), dr = Math.cos(t * 0.3 + d * 2.1) > 0 ? 1 : -1, bob = Math.sin(t * 2 + d) * 1.2;
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(dx, gY + 3 + bob, 14, 8, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.beginPath(); ctx.arc(dx + dr * 12, gY - 6 + bob, 6.5, 0, 6.3); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ffa63a'; ctx.beginPath(); ctx.moveTo(dx + dr * 17, gY - 6 + bob); ctx.lineTo(dx + dr * 26, gY - 4 + bob); ctx.lineTo(dx + dr * 17, gY - 2 + bob); ctx.fill(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(dx + dr * 14, gY - 8 + bob, 1.3, 0, 6.3); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(dx - dr * 4, gY + 2 + bob, 7, 3, 0, 0, 6.3); ctx.fill();
        }
      }
      gxEach(x0, x1, 1300, 700, 200, function (x, k) {
        var by = gY - 190 - Math.sin(t * 0.8 + k) * 18, bx = x + Math.sin(t * 0.5 + k * 2) * 120, fl = Math.sin(t * 14 + k) * 0.7 + 1.1, c1 = k % 2 ? '#ff9a52' : '#7dd0ff';
        ctx.save(); ctx.translate(bx, by); ctx.fillStyle = c1; ctx.beginPath(); ctx.ellipse(-5, -1, 6 * fl, 4, 0.5, 0, 6.3); ctx.ellipse(5, -1, 6 * fl, 4, -0.5, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); ctx.fillStyle = '#2a2230'; ctx.fillRect(-0.8, -4, 1.6, 9); ctx.restore();
      });
    },
    front: function (L, xa, xb, nv) { },
    extra: function (L, x0, x1, nv) { gxIceFront(x0, x1, nv); }
  };

GXS.forest = {
    par: function () {
      drawHills(0.18, 150, '#4f7f63', 38, 16, 2.2); drawHills(0.34, 96, '#3f6d54', 30, 14, 4.1); drawFarTrees(farTrees, 0.34, '#2e5a45', '#356a50'); drawHills(0.5, 52, '#34603f', 22, 10, 6.0); drawFarTrees(midTrees, 0.58, '#254b36', '#2d5a40');
      drawGround();
    },
    back: function () { },
    anim: function (L, x0, x1, nv) {
      if (nv) return; ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < 5; i++) { var rx = camX + vw * (0.1 + i * 0.2) + Math.sin(t * 0.25 + i) * 30, a = 0.06 + 0.025 * Math.sin(t * 0.7 + i * 2); var g = ctx.createLinearGradient(rx, 0, rx - 120, gY); g.addColorStop(0, 'rgba(255,240,170,' + (a * 2).toFixed(3) + ')'); g.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(rx - 20, 0); ctx.lineTo(rx + 26, 0); ctx.lineTo(rx - 90, gY); ctx.lineTo(rx - 190, gY); ctx.closePath(); ctx.fill(); }
      ctx.globalCompositeOperation = 'source-over';
    },
    extra: function (L, x0, x1, nv) { gxChurchFront(x0, x1, nv); drawForestFront(x0, x1); }
  };

HOME_G = 930;

BAZ_G = 1290;

CRT_G = 1600;

BANK_X = 3420;

var GXW = [700, 3040], GXBB = [190, 2830];

var GXSLOTS = [[450, 95], [700, 55], [HOME_G, 160], [BAZ_G, 150], [CRT_G, 165], [1900, 135], [BG_X, 215], [3040, 55], [BANK_X, 240]];

var _drawNxFront0 = drawNxFront;

drawNxFront = function (L, x0, x1) {
    if (!GX || gxFight()) return _drawNxFront0(L, x0, x1);
    var nv = gxNv();
    if (L.theme === 'city') {
      setCam(1);
      if (!(HOME_G + 200 < x0 || HOME_G - 200 > x1)) { gxSprite('gxHome', 300, 190, 14, function (cx) { gxHomeArt(cx, nv); }, HOME_G); gxPlate(HOME_G, gY - 300, 'ДОМ КОКИЧА', '#fff'); }
      if (!(BAZ_G + 200 < x0 || BAZ_G - 200 > x1)) { gxSprite('gxBaz', 280, 180, 14, function (cx) { gxBazArt(cx, nv); }, BAZ_G); gxPlate(BAZ_G, gY - 264, 'вход на базар', '#ffe9a0'); }
      if (!(CRT_G + 220 < x0 || CRT_G - 220 > x1)) { gxSprite('gxCrt', 310, 190, 14, function (cx) { gxCrtArt(cx, nv); }, CRT_G); gxPlate(CRT_G, gY - 306, 'здание суда', '#fff'); }
    } else if (L.theme === 'forest') {
      var X = CEM_G; if (X + 160 < x0 || X - 160 > x1) return; setCam(1);
      gxSprite('gxCemG', 310, 150, 14, function (cx) { gxCemGate(cx, nv); }, X);
    }
  };

GXS.khome = {
    par: function () { gxNxPar('#5a3a1e'); },
    back: function (L, xa, xb, nv) {
      gxRoom(xa, xb, { wall: ['#fbe8bd', '#f1d599'], stripe: 'rgba(214,150,70,.13)', dots: 'rgba(190,120,50,.12)', wain: '#9a6a3c', rail: '#6e4624', ceil: '#5a3a1e', floor: ['#c98c4e', '#8f5d30'], plank: 120 });
      gxRug(HM_BED + 20, 230, '#b8473f', '#f0d9a0'); gxRug(HM_SHF, 170, '#3f6aa8', '#f0d9a0'); gxRug(1950, 140, '#4a8a5a', '#f0d9a0');
      if (NX_OUT > xa - 80 && NX_OUT < xb + 80) gxExit(NX_OUT, false);
      if (HM_BED > xa - 260 && HM_BED < xb + 260) { gxArchWin(HM_BED - 200, gY - 318, 100, 118, ['#8fd0ff', '#d6efff', '#ffe9b8'], '#c24a4a'); gxBedArt(HM_BED); }
      if (HM_VLT > xa - 120 && HM_VLT < xb + 120) gxPiggy(HM_VLT);
      if (HM_SHF > xa - 140 && HM_SHF < xb + 140) gxShelfArt(HM_SHF);
      if (HM_PH > xa - 140 && HM_PH < xb + 140) gxPhotos(HM_PH);
      if (900 > xa - 60 && 900 < xb + 60) { gxPanel(868, gY - 300, 64, 64, '#c9922e', { r: 32, lw: 2.6 }); ctx.fillStyle = '#fff8e8'; ctx.beginPath(); ctx.arc(900, gY - 268, 25, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); for (var q = 0; q < 12; q++) { var a = q * 0.5236; ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = q % 3 ? 1.2 : 2.4; ctx.beginPath(); ctx.moveTo(900 + Math.sin(a) * 19, gY - 268 - Math.cos(a) * 19); ctx.lineTo(900 + Math.sin(a) * 23, gY - 268 - Math.cos(a) * 23); ctx.stroke(); } }
      if (1350 > xa - 60 && 1350 < xb + 60) gxPlant(1350, 1.1); if (2050 > xa - 60 && 2050 < xb + 60) gxPlant(2050, 0.9);
      gxEach(xa, xb, 520, 380, 80, function (x, k) { if (Math.abs(x - HM_BED) < 240 || Math.abs(x - HM_VLT) < 120 || Math.abs(x - HM_SHF) < 150 || Math.abs(x - HM_PH) < 150 || x < 220 || x > L.w - 100) return; gxArchWin(x - 40, gY - 318, 80, 118, ['#8fd0ff', '#d6efff', '#ffe9b8'], null); });
    },
    anim: function (L, x0, x1, nv) {
      var i; ctx.globalCompositeOperation = 'lighter';
      gxEach(x0, x1, 520, 380, 80, function (x, k) { if (Math.abs(x - HM_BED) < 240 || Math.abs(x - HM_VLT) < 120 || Math.abs(x - HM_SHF) < 150 || Math.abs(x - HM_PH) < 150 || x < 220 || x > L.w - 100) return; ctx.fillStyle = 'rgba(255,238,170,.07)'; ctx.beginPath(); ctx.moveTo(x - 38, gY - 200); ctx.lineTo(x + 38, gY - 200); ctx.lineTo(x + 150, gY + 10); ctx.lineTo(x + 30, gY + 10); ctx.fill(); });
      ctx.fillStyle = 'rgba(255,238,170,.08)'; ctx.beginPath(); ctx.moveTo(HM_BED - 200, gY - 200); ctx.lineTo(HM_BED - 100, gY - 200); ctx.lineTo(HM_BED + 20, gY + 12); ctx.lineTo(HM_BED - 130, gY + 12); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      if (HM_BED > x0 - 300 && HM_BED < x1 + 300) gxDust(x0, x1, HM_BED - 150, gY - 190, 10);
      gxText('ВЫХОД', NX_OUT, gY - 201, 14, '#ffffff', 'rgba(8,40,20,.9)');
      gxPlate(HM_BED, gY - 158, 'КРОВАТЬ', '#ffe9c8'); gxPlate(HM_VLT, gY - 142, 'КОПИЛКА: ' + fmtN(save.mx.vlt || 0), '#ffe27a'); gxPlate(HM_SHF, gY - 308, 'ТРОФЕИ', '#ffe9c8'); gxPlate(HM_PH, gY - 288, 'ФОТО', '#ffe9c8');
      ctx.fillStyle = 'rgba(255,214,120,.0)';
    }
  };

GXS.bazaar = {
    par: function (L, x0, x1) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = gxLG(0, 0, 0, gScreen + 4, '#ffcf86', '#ffe9c0', '#fbd8a0'); ctx.fillRect(0, 0, W, H); setCam(0.18);
      var xs = camX * 0.18 - 40, i; for (i = Math.floor(xs / 220) - 1; i * 220 < xs + vw + 80; i++) { var bx = i * 220, hh = 90 + ((i * 37) % 60 + 60) % 60; ctx.fillStyle = 'rgba(214,150,92,.55)'; ctx.fillRect(bx, gY - 150 - hh, 120, hh + 160); ctx.beginPath(); ctx.arc(bx + 60, gY - 150 - hh, 56, Math.PI, 0); ctx.fill(); ctx.fillRect(bx + 150, gY - 190 - hh, 14, hh + 200); ctx.beginPath(); ctx.moveTo(bx + 146, gY - 190 - hh); ctx.lineTo(bx + 157, gY - 232 - hh); ctx.lineTo(bx + 168, gY - 190 - hh); ctx.fill(); }
      setCam(1);
    },
    back: function (L, xa, xb, nv) {
      var i;
      ctx.fillStyle = gxLG(0, gY - 330, 0, gY, '#f0d4a0', '#d9b078'); ctx.fillRect(xa, gY - 330, xb - xa, 332);
      ctx.strokeStyle = 'rgba(120,80,40,.22)'; ctx.lineWidth = 1.4; for (i = gY - 330; i < gY; i += 30) { ctx.beginPath(); ctx.moveTo(xa, i); ctx.lineTo(xb, i); ctx.stroke(); }
      for (i = Math.floor(xa / 190) * 190; i < xb + 190; i += 190) { ctx.fillStyle = '#5a3a24'; ctx.beginPath(); ctx.moveTo(i + 40, gY - 130); ctx.lineTo(i + 40, gY - 210); ctx.arc(i + 80, gY - 210, 40, Math.PI, 0); ctx.lineTo(i + 120, gY - 130); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = 'rgba(255,200,110,.28)'; ctx.fillRect(i + 44, gY - 206, 72, 76); ctx.fillStyle = '#8a5a30'; ctx.fillRect(i + 40, gY - 130, 80, 8); }
      gxPanel(xa, gY - 340, xb - xa + 4, 14, '#b88a50', { lw: 2.2 });
      gxGround(xa, xb, 'sand', nv);
      ctx.strokeStyle = 'rgba(120,80,40,.3)'; ctx.lineWidth = 1.5; for (i = Math.floor(xa / 40) * 40; i < xb; i += 40) { ctx.beginPath(); ctx.moveTo(i, gY - 2); ctx.lineTo(i - 6, gY + 24); ctx.stroke(); }
      if (NX_OUT > xa - 80 && NX_OUT < xb + 80) gxExit(NX_OUT, false);
      [[BZ_SELL, 0, '#3ca36a'], [BZ_LOT, 1, '#d94a4a'], [BZ_FT, 2, '#8a5ad9'], [BZ_BRD, 3, '#c9a860']].forEach(function (s) { if (s[0] > xa - 160 && s[0] < xb + 160) gxStallArt(s[0], s[1], s[2]); });
      gxEach(xa, xb, 410, 230, 60, function (x, k) { if (x < 240 || x > L.w - 100) return; var d = [BZ_SELL, BZ_LOT, BZ_FT, BZ_BRD]; for (var q = 0; q < 4; q++) if (Math.abs(x - d[q]) < 190) return; var h = gxH(k * 5 + 1); if (h < 0.3) gxBarrel(x, 1.1, '#8a5a34'); else if (h < 0.6) { gxCrate(x, 1.1, '#b07a42'); gxCrate(x + 28, 0.9, '#a06a36'); } else gxPlant(x, 0.9); });
      var sy = gY - 330;
      ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1.6; ctx.beginPath(); for (i = Math.floor(xa / 230) * 230; i < xb + 230; i += 230) { ctx.moveTo(i, sy); ctx.quadraticCurveTo(i + 115, sy + 30, i + 230, sy); } ctx.stroke();
      for (i = Math.floor(xa / 230) * 230; i < xb + 230; i += 230) for (var q = 0; q < 8; q++) { var u = (q + 0.5) / 8, fx = i + u * 230, fy = sy + Math.sin(u * Math.PI) * 25 + 2; ctx.fillStyle = ['#ff5a5a', '#ffd23f', '#5ac8ff', '#7dff9a', '#c78bff'][(q + i / 230) % 5 | 0]; ctx.beginPath(); ctx.moveTo(fx - 7, fy); ctx.lineTo(fx + 7, fy); ctx.lineTo(fx, fy + 15); ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    },
    anim: function (L, x0, x1, nv) {
      gxEach(x0, x1, 230, 115, 40, function (x, k) { var ly = gY - 300 + 20 + Math.sin(t * 1.4 + k) * 2; gxTube([[x, gY - 330 + 26], [x, ly]], 1.6, '#3a2a1a'); gxPanel(x - 8, ly, 16, 22, '#e8a43a', { r: 6, lw: 1.8 }); ctx.fillStyle = '#ffe9a8'; ctx.fillRect(x - 4, ly + 5, 8, 12); gxGlow(x, ly + 11, 54, '255,190,90', 0.5 + 0.1 * Math.sin(t * 5 + k)); });
      gxText('ВЫХОД', NX_OUT, gY - 201, 14, '#ffffff', 'rgba(8,40,20,.9)');
      [[BZ_SELL, 'СКУПЩИК +12%', '#d6ffd9'], [BZ_LOT, 'ЛОТЕРЕЯ', '#ffd6d6'], [BZ_FT, 'ГАДАЛКА', '#e8d6ff'], [BZ_BRD, 'ДОСКА', '#fff2c8']].forEach(function (s) { if (s[0] > x0 - 200 && s[0] < x1 + 200) gxPlate(s[0], gY - 290, s[1], s[2]); });
      bgNpc('muscle', BZ_SELL - 20, 210, false, 1.4); bgNpc('muscle', BZ_LOT, 210, true, 1.2); bgNpc('priest', BZ_FT, 210, false, 1.0);
    }
  };

GXS.court = {
    par: function () { gxNxPar('#6a5a4a'); },
    back: function (L, xa, xb, nv) {
      var i;
      gxRoom(xa, xb, { wall: ['#ebe4d2', '#d6cdb4'], stripe: 'rgba(140,120,80,.08)', wain: '#6a4a2a', rail: '#4a3018', ceil: '#3a2616', floor: ['#e6e0d0', '#b8b09a'], plank: 150 });
      for (i = Math.floor(xa / 300) * 300; i < xb + 300; i += 300) {
        gxPanel(i + 98, gY - 440, 54, 440, '#f4efe0', { lw: 2.4, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.08)'; for (var q = 0; q < 5; q++) ctx.fillRect(a + 6 + q * 9, b + 20, 2.4, h - 40); } });
        gxPanel(i + 90, gY - 454, 70, 16, '#cfc8b4', { r: 3, lw: 2.2 }); gxPanel(i + 90, gY - 24, 70, 14, '#cfc8b4', { r: 3, lw: 2.2 });
        if (Math.abs(i + 226 - CR_J) > 250 && Math.abs(i + 226 - CR_J - 400) > 90) gxArchWin(i + 196, gY - 330, 60, 120, ['#a8dcff', '#e0f2ff', '#fff2cc'], null);
      }
      if (NX_OUT > xa - 80 && NX_OUT < xb + 80) gxExit(NX_OUT, false);
      if (CR_JAIL > xa - 80 && CR_JAIL < xb + 80) gxExit(CR_JAIL, true);
      if (CR_J > xa - 260 && CR_J < xb + 260) {
        var X = CR_J; gxShadow(X, gY + 5, 190, 0.95);
        gxPanel(X - 170, gY - 22, 340, 22, '#7a5a38', { r: 4, lw: 2.4 });
        gxPanel(X - 140, gY - 112, 280, 94, '#5a3a1e', { r: 5, lw: 3, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.8; for (var q = 0; q < 4; q++) { ctx.strokeRect(a + 10 + q * 66, b + 12, 54, h - 24); } ctx.fillStyle = 'rgba(255,220,140,.5)'; for (var q2 = 0; q2 < 4; q2++) { ctx.beginPath(); ctx.arc(a + 37 + q2 * 66, b + h / 2, 7, 0, 6.3); ctx.fill(); } } });
        gxPanel(X - 150, gY - 124, 300, 14, '#8a5a30', { r: 5, lw: 2.6 });
        gxPanel(X - 24, gY - 138, 48, 16, '#d9a63a', { r: 3, lw: 2 }); ctx.fillStyle = '#fff'; ctx.fillRect(X - 70, gY - 134, 34, 10); ctx.fillStyle = '#6a4524'; ctx.fillRect(X + 40, gY - 130, 28, 6); ctx.fillRect(X + 40, gY - 136, 10, 14);
        ctx.fillStyle = gxLG(0, gY - 360, 0, gY - 200, '#1f3a6a', '#12244a'); ctx.fillRect(X - 160, gY - 400, 320, 150); gxInk(2.6); ctx.strokeRect(X - 160, gY - 400, 320, 150);
        ctx.strokeStyle = '#d9a63a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X, gY - 380); ctx.lineTo(X, gY - 280); ctx.moveTo(X - 60, gY - 360); ctx.lineTo(X + 60, gY - 360); ctx.stroke(); ctx.fillStyle = '#d9a63a'; [-60, 60].forEach(function (dx) { ctx.beginPath(); ctx.moveTo(X + dx, gY - 360); ctx.lineTo(X + dx - 20, gY - 322); ctx.lineTo(X + dx + 20, gY - 322); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.beginPath(); ctx.ellipse(X + dx, gY - 321, 22, 6, 0, 0, 6.3); ctx.fill(); ctx.stroke(); });
        ctx.beginPath(); ctx.arc(X, gY - 388, 9, 0, 6.3); ctx.fill(); ctx.stroke();
      }
      if (CR_JURY > xa - 140 && CR_JURY < xb + 140) {
        var Y = CR_JURY; gxShadow(Y, gY + 5, 120, 0.9); gxPanel(Y - 100, gY - 58, 200, 58, '#8a5a30', { r: 5, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.6; for (var q = 0; q < 6; q++) { ctx.beginPath(); ctx.moveTo(a + 8 + q * 32, b + 6); ctx.lineTo(a + 8 + q * 32, b + h - 4); ctx.stroke(); } } });
        gxPanel(Y - 106, gY - 70, 212, 14, '#a8703a', { r: 5, lw: 2.4 }); for (i = 0; i < 6; i++) gxPanel(Y - 96 + i * 34, gY - 108, 8, 40, '#6a4524', { r: 3, lw: 1.8 });
      }
      if (CR_J + 400 > xa - 60 && CR_J + 400 < xb + 60) { var B = CR_J + 400; gxPanel(B - 40, gY - 420, 80, 8, '#d9a63a', { lw: 1.8 }); ctx.fillStyle = gxLG(B - 36, 0, B + 36, 0, '#2a4a9a', '#1a2e6a'); ctx.beginPath(); ctx.moveTo(B - 36, gY - 412); ctx.lineTo(B + 36, gY - 412); ctx.lineTo(B + 36, gY - 250); ctx.lineTo(B, gY - 226); ctx.lineTo(B - 36, gY - 250); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = '#e9c35a'; ctx.beginPath(); ctx.arc(B, gY - 336, 18, 0, 6.3); ctx.fill(); ctx.stroke(); gxText('§', B, gY - 335, 22, '#7a5a10', null); }
    },
    anim: function (L, x0, x1, nv) {
      ctx.globalCompositeOperation = 'lighter';
      for (var i = Math.floor(x0 / 300) * 300; i < x1 + 300; i += 300) { if (!(Math.abs(i + 226 - CR_J) > 250 && Math.abs(i + 226 - CR_J - 400) > 90)) continue; ctx.fillStyle = 'rgba(255,240,190,.07)'; ctx.beginPath(); ctx.moveTo(i + 196, gY - 330); ctx.lineTo(i + 256, gY - 330); ctx.lineTo(i + 190, gY + 12); ctx.lineTo(i + 80, gY + 12); ctx.fill(); }
      ctx.globalCompositeOperation = 'source-over';
      gxText('ВЫХОД', NX_OUT, gY - 201, 14, '#ffffff', 'rgba(8,40,20,.9)'); gxText('ТЮРЬМА', CR_JAIL, gY - 201, 14, '#ffd6d6', 'rgba(60,10,10,.9)');
      gxPlate(CR_J, gY - 420, 'СУДЬЯ', '#ffe9c8'); gxPlate(CR_JURY, gY - 126, 'СКАМЬЯ ПРИСЯЖНЫХ', '#ffe9c8');
      bgNpc('guard', CR_J, 230, false, 1.0);
    }
  };

GXS.jail = {
    par: function () { gxNxPar('#1c1e26'); },
    back: function (L, xa, xb, nv) {
      var i;
      gxRoom(xa, xb, { wall: ['#5c6276', '#434859'], wain: '#2e323f', rail: '#22252f', ceil: '#14161c', floor: ['#41454f', '#24262e'], plank: 150, tex: function (a, b, cy) { ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.6; for (var r = 0, y = cy + 30; y < gY - 126; y += 34, r++) { ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b, y); ctx.stroke(); for (var x = Math.floor(a / 96) * 96 + (r % 2) * 48; x < b; x += 96) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 34); ctx.stroke(); } } ctx.fillStyle = 'rgba(255,255,255,.04)'; for (var q = Math.floor(a / 130) * 130; q < b; q += 130) ctx.fillRect(q + 20, cy + 40, 6, gY - cy - 180); } });
      for (i = Math.floor(xa / 260) * 260; i < xb + 260; i += 260) {
        gxPanel(i + 32, gY - 316, 156, 316, '#7a8096', { r: 6, lw: 2.8 });
        ctx.fillStyle = gxLG(0, gY - 300, 0, gY, '#1c1e28', '#0c0d12'); ctx.fillRect(i + 46, gY - 302, 128, 302);
        ctx.fillStyle = '#2a2d3a'; ctx.fillRect(i + 60, gY - 120, 70, 12); ctx.fillRect(i + 60, gY - 76, 8, 76); ctx.fillRect(i + 122, gY - 76, 8, 76); ctx.fillRect(i + 60, gY - 168, 70, 10); ctx.fillRect(i + 60, gY - 204, 8, 40); ctx.fillStyle = '#4a4e60'; ctx.fillRect(i + 62, gY - 118, 66, 4); ctx.fillRect(i + 62, gY - 166, 66, 4);
        for (var q = 0; q < 7; q++) { gxPanel(i + 52 + q * 18, gY - 302, 6, 302, '#9aa2ba', { lw: 1.4 }); }
        gxPanel(i + 44, gY - 190, 132, 8, '#9aa2ba', { lw: 1.6 }); gxPanel(i + 44, gY - 70, 132, 8, '#9aa2ba', { lw: 1.6 });
        gxPanel(i + 80, gY - 340, 60, 20, '#d8d0b0', { r: 3, lw: 2 }); gxText(String(((i / 260) | 0) + 1), i + 110, gY - 329, 13, '#3a3a40', null);
        gxPanel(i + 168, gY - 140, 14, 22, '#c9922e', { r: 3, lw: 1.8 });
      }
      for (i = Math.floor(xa / 500) * 500; i < xb + 500; i += 500) { gxTube([[i + 220, gY - 400], [i + 224, gY - 340], [i + 218, gY - 300]], 2.4, '#8a8f9e'); ctx.strokeStyle = '#8a8f9e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(i + 218, gY - 292, 8, 0, 6.3); ctx.stroke(); }
      ctx.fillStyle = 'rgba(70,110,140,.35)'; for (i = Math.floor(xa / 410) * 410; i < xb + 410; i += 410) { ctx.beginPath(); ctx.ellipse(i + 300, gY + 22, 50, 7, 0, 0, 6.3); ctx.fill(); }
    },
    anim: function (L, x0, x1, nv) {
      gxEach(x0, x1, 400, 180, 160, function (x, k) {
        var fl = Math.sin(t * 17 + k * 3) > 0.92 ? 0.35 : 1; gxPanel(x - 24, gY - 440, 48, 10, '#2a2d38', { r: 3, lw: 1.8 }); ctx.fillStyle = 'rgba(255,240,190,' + (0.9 * fl).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(x, gY - 428, 22, 7, 0, 0, 6.3); ctx.fill();
        ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,236,170,' + (0.07 * fl).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(x - 20, gY - 424); ctx.lineTo(x + 20, gY - 424); ctx.lineTo(x + 130, gY + 20); ctx.lineTo(x - 130, gY + 20); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; gxGlow(x, gY - 426, 90, '255,226,150', 0.5 * fl);
      });
      gxText((save.mx.arr | 0) ? 'ЗАПЕРТО' : 'ВЫХОД', NX_OUT, gY - 201, 14, (save.mx.arr | 0) ? '#ffd6d6' : '#ffffff', 'rgba(8,40,20,.9)');
      if (NX_OUT > x0 - 80 && NX_OUT < x1 + 80) { }
      bgNpc('muscle', JL_INM, 220, false, 0.8); gxPlate(JL_INM, gY - 250, 'СОКАМЕРНИК', '#cfd6ea');
      bgNpc('guard', JL_G, 230, true, 1.0); gxPlate(JL_G, gY - 260, 'ОХРАННИК', '#cfd6ea');
      if (save.mx.arr | 0) { gxPlate(camX + vw * 0.5, gY - 372, 'СРОК: ' + Math.max(0, Math.ceil(jailT)) + ' с', '#ff7a7a', 'rgba(30,6,6,.78)'); }
    }
  };

GXG.cem = { a: '#3a5a52', b: '#243a38', lip: '#0e1c1c', s1: '#2d2d38', s2: '#14141c', blade: '#3a6a58' };

GXS.cemetery = {
    par: function (L, x0, x1) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = gxLG(0, 0, 0, gScreen + 4, '#0a0e22', '#1c2a4a', '#38507a'); ctx.fillRect(0, 0, W, H);
      var i, r = rng(77); ctx.fillStyle = '#e8ecff'; for (i = 0; i < 70; i++) { var sx = r() * W, sy = r() * gScreen * 0.8, tw = 0.5 + 0.5 * Math.sin(t * 1.5 + i); ctx.globalAlpha = 0.3 + 0.6 * tw; ctx.beginPath(); ctx.arc(sx, sy, 0.8 + r() * 1.2, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1;
      var mx = W * 0.8, my = Math.max(80, gScreen * 0.22); gxGlow(mx, my, 190, '170,195,255', 0.55); ctx.fillStyle = '#f4f7ff'; ctx.beginPath(); ctx.arc(mx, my, 44, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(150,165,205,.5)'; [[-12, -8, 9], [10, 6, 12], [-6, 18, 6], [16, -14, 5]].forEach(function (c) { ctx.beginPath(); ctx.arc(mx + c[0], my + c[1], c[2], 0, 6.3); ctx.fill(); });
      setCam(0.2); var xs = camX * 0.2 - 40; ctx.fillStyle = 'rgba(14,20,40,.92)'; ctx.beginPath(); ctx.moveTo(xs, gY + 4); for (var x = Math.floor(xs / 14) * 14; x < xs + vw + 60; x += 14) ctx.lineTo(x, gY - 120 - wave(x, 26, 0.005, 12, 0.013, 2.2)); ctx.lineTo(xs + vw + 60, gY + 4); ctx.fill();
      for (i = Math.floor(xs / 260) - 1; i * 260 < xs + vw + 80; i++) { var tx = i * 260 + 90, th = 150 + ((i * 53) % 70 + 70) % 70; ctx.strokeStyle = 'rgba(8,10,24,.95)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(tx, gY - 100); ctx.lineTo(tx + 4, gY - 100 - th * 0.6); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx + 3, gY - 100 - th * 0.4); ctx.lineTo(tx + 34, gY - 100 - th * 0.8); ctx.moveTo(tx + 3, gY - 100 - th * 0.5); ctx.lineTo(tx - 28, gY - 100 - th * 0.75); ctx.stroke(); }
      setCam(1);
    },
    back: function (L, xa, xb, nv) {
      var i; gxGround(xa, xb, 'cem', nv);
      ctx.fillStyle = 'rgba(20,28,40,.5)'; ctx.fillRect(xa, gY - 150, xb - xa, 150);
      ctx.strokeStyle = '#161922'; ctx.lineWidth = 5; for (i = Math.floor(xa / 58) * 58; i < xb + 58; i += 58) { ctx.beginPath(); ctx.moveTo(i, gY); ctx.lineTo(i, gY - 132); ctx.stroke(); ctx.fillStyle = '#161922'; ctx.beginPath(); ctx.moveTo(i - 6, gY - 130); ctx.lineTo(i, gY - 156); ctx.lineTo(i + 6, gY - 130); ctx.fill(); }
      ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xa, gY - 100); ctx.lineTo(xb, gY - 100); ctx.moveTo(xa, gY - 34); ctx.lineTo(xb, gY - 34); ctx.stroke(); ctx.strokeStyle = 'rgba(160,180,255,.18)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(xa, gY - 103); ctx.lineTo(xb, gY - 103); ctx.stroke();
      if (NX_OUT > xa - 80 && NX_OUT < xb + 80) gxExit(NX_OUT, true);
      gxEach(xa, xb, 410, 330, 80, function (x, k) { if (x < 280 || x > L.w - 80) return; gxDeadTree(x, 260 + (k % 3) * 40, k); });
      gxEach(xa, xb, 97, 40, 20, function (x, k) { var h = gxH(k * 5 + 2); if (x < 250) return; if (h < 0.3) gxFern(x, 0.7 + h); else if (h < 0.45) gxMush(x, 0.9, '#8a70c8'); else if (h < 0.55) gxRockHD(x, 0.6); });
    },
    anim: function (L, x0, x1, nv) {
      var i, gr = cemGraves(), m = save.mx;
      gxText('ВЫХОД', NX_OUT, gY - 201, 14, '#ffffff', 'rgba(8,40,20,.9)');
      gxEach(x0, x1, 520, 420, 60, function (x, k) { if (x < 300 || x > L.w - 60) return; gxTube([[x, gY], [x, gY - 150]], 5, '#2a2d3a'); gxPanel(x - 10, gY - 176, 20, 28, '#e8c25a', { r: 5, lw: 1.8 }); ctx.fillStyle = '#ffe9a8'; ctx.fillRect(x - 6, gY - 170, 12, 16); gxGlow(x, gY - 160, 80 + 6 * Math.sin(t * 6 + k), '255,214,120', 0.7); });
      for (i = 0; i < gr.length; i++) {
        var X = cemX(i), fl = (m.cmt | 0) & (1 << gr[i].id); if (X < x0 - 100 || X > x1 + 100) continue;
        gxSprite('gxGrave' + (i % 3), 130, 60, 16, function (cx) { gxGraveArt(cx, i % 3); }, X);
        if (fl) gxSprite('gxBouq', 40, 40, 14, function (cx) { gxBouquet(cx); }, X);
        gxPlate(X, gY + 42, gr[i].n, '#cfd6ea');
      }
      var kx = cemX(gr.length) + 120; bgNpc('worker', kx, 230, false, 1.2); gxPlate(kx, gY - 252, 'МОГИЛЬЩИК', '#cfd6ea');
      ctx.fillStyle = 'rgba(200,215,255,.09)'; for (i = 0; i < 7; i++) { var fx = (i * 480 + t * 14) % (L.w + 400) - 200, fy = gY - 8 - (i % 3) * 6; ctx.beginPath(); ctx.ellipse(fx, fy, 230, 24, 0, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(fx + 90, fy - 14, 150, 16, 0, 0, 6.3); ctx.fill(); }
      for (i = 0; i < 4; i++) { var bx = x0 + ((t * 60 + i * 340) % (x1 - x0 + 200)), by = gY - 280 + Math.sin(t * 2 + i * 2) * 40 - i * 20, fw = Math.sin(t * 14 + i) * 7; ctx.fillStyle = '#0a0c16'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx - 8, by - 8 - fw, bx - 18, by + fw * 0.3); ctx.quadraticCurveTo(bx - 8, by + 2, bx, by + 3); ctx.quadraticCurveTo(bx + 8, by + 2, bx + 18, by + fw * 0.3); ctx.quadraticCurveTo(bx + 8, by - 8 - fw, bx, by); ctx.fill(); }
    }
  };

var DLG_RIT = /ритуал|круг|алтарь|врата|свеч|небес|ктулху/i, DLG_TECH = /сервер|борт|табло|автопилот|аппарат|ангар|телепорт|вселенн|босс-раш|голосован|выбор стороны|терминал|банкомат/i;

var DLG_GRV = /^могила|кладбищ/i, DLG_OBJ = /доска|листок|рекламн|фото|полка|кровать|копилка|палата|кафе|лестница|подсказка|подставк|щит/i;

var _dlgShow0 = dlgShow;

dlgShow = function (who, imgEl, text, choices, info) {
    var r = _dlgShow0(who, imgEl, text, choices, info);
    try { var b = elDlg.querySelector('.dlg'); if (b) b.setAttribute('data-k', dlgKind(who, !!(imgEl && imgEl.src))); } catch (e) {}
    return r;
  };

(function () {
    var css = [
      'body.gx.dlgcine #dlgOv { background: linear-gradient(to top, rgba(8,4,24,.86) 0%, rgba(8,4,24,.34) 44%, rgba(8,4,24,0) 74%); }',
      'body.gx.dlgcine .dlg { --k0:#2a2066; --k1:#3d2a86; --k2:#ffd23f; --kt:#f6f0ff; --kb:rgba(255,255,255,.08); --kbr:rgba(214,196,255,.6); --kn:#ffd23f; --knt:#2a1a00; border: 3px solid #140a2c; border-radius: 24px; background: radial-gradient(120% 140% at 0% 0%, var(--k1), var(--k0)); color: var(--kt); box-shadow: 0 0 0 3px var(--k2), 0 0 0 6px #140a2c, 0 22px 46px rgba(0,0,0,.62), inset 0 2px 0 rgba(255,255,255,.22), inset 0 -26px 46px rgba(0,0,0,.22); }',
      'body.gx.dlgcine .dlg .dlgwho { background: var(--kn); color: var(--knt); border: 3px solid #140a2c; border-radius: 12px 12px 12px 3px; top: -20px; padding: 3px 18px 4px; font: 800 17px "Russo One", "Rubik", system-ui, sans-serif; letter-spacing: .6px; box-shadow: 0 4px 0 rgba(0,0,0,.45); }',
      'body.gx.dlgcine .dlg .dlghead img { border: 4px solid var(--k2); border-radius: 26px; background: radial-gradient(circle at 50% 36%, rgba(255,255,255,.34), rgba(255,255,255,0) 72%), linear-gradient(160deg, var(--k1), var(--k0)); box-shadow: 0 6px 0 #140a2c, 0 0 22px rgba(255,255,255,.18); filter: drop-shadow(0 6px 8px rgba(0,0,0,.5)); }',
      'body.gx.dlgcine .dlg .whsay { color: var(--kt); background: rgba(255,255,255,.07); border: 2px solid rgba(255,255,255,.14); border-radius: 16px; padding: 10px 14px; text-shadow: 0 1px 0 rgba(0,0,0,.4); }',
      'body.gx.dlgcine .dlg .whq { color: var(--k2); }',
      'body.gx.dlgcine .dlg .whbtns .flbuy { background: var(--kb); color: var(--kt); border: 2px solid var(--kbr); border-radius: 14px; box-shadow: 0 3px 0 rgba(0,0,0,.35); transition: transform .08s, background .12s, border-color .12s; }',
      'body.gx.dlgcine .dlg .whbtns .flbuy:hover, body.gx.dlgcine .dlg .whbtns .flbuy:active { background: rgba(255,255,255,.2); border-color: var(--k2); transform: translateY(-1px); }',
      'body.gx.dlgcine .dlg .whbtns .flbuy.out { color: var(--kt); opacity: .8; background: rgba(0,0,0,.18); }',
      'body.gx.dlgcine .dlg[data-k="ritual"], body.gx.dlgcine .dlg[data-k="tech"], body.gx.dlgcine .dlg[data-k="grave"], body.gx.dlgcine .dlg[data-k="paper"], body.gx.dlgcine .dlg[data-k="voice"] { padding-left: 24px; }',
      'body.gx.dlgcine .dlg[data-k="ritual"] .dlgwho, body.gx.dlgcine .dlg[data-k="tech"] .dlgwho, body.gx.dlgcine .dlg[data-k="grave"] .dlgwho, body.gx.dlgcine .dlg[data-k="paper"] .dlgwho, body.gx.dlgcine .dlg[data-k="voice"] .dlgwho { left: 22px; }',
      // ритуал и магия: тёмный фиолет, вращающийся круг рун, светящийся текст
      'body.gx.dlgcine .dlg[data-k="ritual"] { --k0:#0e0522; --k1:#3a1070; --k2:#b58cff; --kt:#f1e8ff; --kbr:rgba(181,140,255,.7); --kn:linear-gradient(90deg,#5a2aa8,#8a4ae8); --knt:#fff; overflow: hidden; box-shadow: 0 0 0 3px #b58cff, 0 0 0 6px #140a2c, 0 0 46px rgba(150,90,255,.55), 0 22px 46px rgba(0,0,0,.62), inset 0 0 60px rgba(150,90,255,.28); }',
      'body.gx.dlgcine .dlg[data-k="ritual"] .dlgwho { background: linear-gradient(90deg,#5a2aa8,#8a4ae8); color: #fff; top: 8px; text-shadow: 0 0 10px #d8b8ff; }',
      'body.gx.dlgcine .dlg[data-k="ritual"] .dlgwho::before { content: "\\2726  "; } body.gx.dlgcine .dlg[data-k="ritual"] .dlgwho::after { content: "  \\2726"; }',
      'body.gx.dlgcine .dlg[data-k="ritual"]::before { content: ""; position: absolute; right: -70px; top: -70px; width: 260px; height: 260px; border-radius: 50%; border: 3px dashed rgba(181,140,255,.5); box-shadow: inset 0 0 0 14px rgba(120,60,220,.12), inset 0 0 0 16px rgba(181,140,255,.4), 0 0 40px rgba(150,90,255,.4); animation: gxRune 22s linear infinite; pointer-events: none; }',
      'body.gx.dlgcine .dlg[data-k="ritual"]::after { content: "\\2736"; position: absolute; right: 34px; top: 4px; font-size: 120px; line-height: 120px; color: rgba(210,170,255,.28); text-shadow: 0 0 24px rgba(180,120,255,.7); animation: gxRuneP 3.6s ease-in-out infinite; pointer-events: none; }',
      'body.gx.dlgcine .dlg[data-k="ritual"] .whsay { background: rgba(60,20,120,.34); border-color: rgba(181,140,255,.5); font-style: italic; letter-spacing: .3px; text-shadow: 0 0 12px rgba(190,140,255,.8); padding-top: 18px; }',
      '@keyframes gxRune { to { transform: rotate(360deg); } } @keyframes gxRuneP { 0%,100% { opacity: .55; } 50% { opacity: 1; } }',
      // терминал
      'body.gx.dlgcine .dlg[data-k="tech"] { --k0:#03120e; --k1:#06281e; --k2:#3dffb0; --kt:#b6ffe0; --kbr:rgba(61,255,176,.65); --kn:#041a14; --knt:#3dffb0; border-radius: 8px; font-family: "Consolas","Courier New",monospace; box-shadow: 0 0 0 3px #3dffb0, 0 0 0 6px #03120e, 0 0 34px rgba(61,255,176,.4), 0 22px 46px rgba(0,0,0,.62), inset 0 0 50px rgba(61,255,176,.12); }',
      'body.gx.dlgcine .dlg[data-k="tech"]::before { content: ""; position: absolute; inset: 0; border-radius: 6px; background: repeating-linear-gradient(0deg, rgba(0,0,0,.22) 0 2px, rgba(0,0,0,0) 2px 4px); pointer-events: none; }',
      'body.gx.dlgcine .dlg[data-k="tech"] .dlgwho { border-radius: 4px; border-color: #3dffb0; font-family: "Consolas","Courier New",monospace; text-shadow: 0 0 8px #3dffb0; } body.gx.dlgcine .dlg[data-k="tech"] .dlgwho::before { content: "[ "; } body.gx.dlgcine .dlg[data-k="tech"] .dlgwho::after { content: " ]"; }',
      'body.gx.dlgcine .dlg[data-k="tech"] .whsay { background: rgba(0,0,0,.3); border: 1px solid rgba(61,255,176,.4); border-radius: 4px; font-family: "Consolas","Courier New",monospace; text-shadow: 0 0 8px rgba(61,255,176,.6); } body.gx.dlgcine .dlg[data-k="tech"] .whsay::after { content: "\\2588"; margin-left: 4px; animation: gxBlink 1s steps(1) infinite; }',
      'body.gx.dlgcine .dlg[data-k="tech"] .whbtns .flbuy { border-radius: 4px; font-family: "Consolas","Courier New",monospace; } @keyframes gxBlink { 50% { opacity: 0; } }',
      // могила: серый камень
      'body.gx.dlgcine .dlg[data-k="grave"] { --k0:#2c303c; --k1:#555b6c; --k2:#aab2c8; --kt:#eceff8; --kbr:rgba(170,178,200,.7); --kn:#8a92a8; --knt:#10131c; border-radius: 80px 80px 18px 18px / 44px 44px 18px 18px; font-family: Georgia, "Times New Roman", serif; box-shadow: 0 0 0 3px #aab2c8, 0 0 0 6px #10131c, 0 22px 46px rgba(0,0,0,.62), inset 0 8px 24px rgba(255,255,255,.12), inset 0 -26px 46px rgba(0,0,0,.35); }',
      'body.gx.dlgcine .dlg[data-k="grave"] .dlgwho { font-family: Georgia, serif; font-style: italic; border-radius: 12px; } body.gx.dlgcine .dlg[data-k="grave"] .dlgwho::before { content: "\\271D  "; }',
      'body.gx.dlgcine .dlg[data-k="grave"] .whsay { font-family: Georgia, "Times New Roman", serif; font-style: italic; background: rgba(0,0,0,.22); }',
      // записка, предмет
      'body.gx.dlgcine .dlg[data-k="paper"] { --k0:#e6cf98; --k1:#f8ecc8; --k2:#8a5a30; --kt:#3a2814; --kbr:#8a5a30; --kb:rgba(138,90,48,.12); --kn:#7a4a24; --knt:#fff2d0; border-radius: 10px 18px 12px 20px; box-shadow: 0 0 0 3px #8a5a30, 0 0 0 6px #3a2410, 0 20px 40px rgba(0,0,0,.55), inset 0 0 40px rgba(138,90,48,.28); }',
      'body.gx.dlgcine .dlg[data-k="paper"]::before { content: ""; position: absolute; left: 50%; top: -12px; width: 18px; height: 18px; margin-left: -9px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ff8a8a, #c42a2a 70%); border: 2px solid #3a1010; box-shadow: 0 3px 0 rgba(0,0,0,.35); }',
      'body.gx.dlgcine .dlg[data-k="paper"] .whsay { background: rgba(255,255,255,.35); border-color: rgba(138,90,48,.4); color: #3a2814; text-shadow: none; } body.gx.dlgcine .dlg[data-k="paper"] .whq { color: #7a4a24; }',
      'body.gx.dlgcine .dlg[data-k="paper"] .whbtns .flbuy { color: #3a2814; } body.gx.dlgcine .dlg[data-k="paper"] .whbtns .flbuy:hover { background: rgba(138,90,48,.28); }',
      // безымянный голос
      'body.gx.dlgcine .dlg[data-k="voice"] { --k0:#1a2a4a; --k1:#2c4a7a; --k2:#7ad0ff; --kn:#7ad0ff; --knt:#08203a; }',
      '@media (max-width: 640px) { body.gx.dlgcine .dlg[data-k="ritual"]::before, body.gx.dlgcine .dlg[data-k="ritual"]::after { opacity: .5; } }'
    ].join('\n');
    try { var st = document.createElement('style'); st.id = 'gxCss'; st.textContent = css; document.head.appendChild(st); } catch (e) {}
  })();

(function () { var mv = { 6300: 6560, 15100: 15290, 18800: 18500 }; for (var i = 0; i < bins.length; i++) if (mv[bins[i].x]) bins[i].x = mv[bins[i].x]; })();

var _drawBins0 = drawBins;

drawBins = function () {
    if (!GX) return _drawBins0();
    var x0 = camX - 140, x1 = camX + vw + 140, nv = gxNv(), i; setCam(1);
    for (i = 0; i < bins.length; i++) {
      var b = bins[i]; if (b.x < x0 || b.x > x1) continue;
      var empty = b.cd > 0;
      gxSprite('gxPad', 170, 90, 16, function (cx) { gxBinPad(cx, nv); }, b.x);
      gxSprite(empty ? 'gxBinE' : 'gxBinF', 100, 50, 12, function (cx) { gxBinArt(cx, empty); }, b.x);
      if (!empty) {
        ctx.fillStyle = 'rgba(20,20,26,.85)'; for (var q = 0; q < 3; q++) { var fa = t * 3.2 + q * 2.1 + b.ph, fx = b.x - 4 + Math.cos(fa) * (10 + q * 3), fy = gY - 70 + Math.sin(fa * 1.3) * 6; ctx.beginPath(); ctx.arc(fx, fy, 1.5, 0, 6.3); ctx.fill(); }
        ctx.fillStyle = '#ffe066'; sparkle(b.x + 22, gY - 84 + Math.sin(t * 3 + b.ph) * 3, 4);
      }
    }
  };

var GXBG = { cnt: 800, jb: 1150, tabs: [1340, 1640, 1940, 2240], pls: [1490, 2090], clock: 1790, drink: 2400, stand: 2620, sign: 2860, arch: 3000, notice: 3130, cctv: 3300, ext: 3900, crate: 4010, warn: 4140 };

var GXBGSLOTS = [[BG_OUT, 72], [800, 200], [1150, 42], [1340, 90], [1640, 90], [1940, 90], [2240, 90], [1490, 32], [2090, 32], [2400, 48], [2620, 62], [3000, 62], [3130, 46], [3300, 80], [GUARD_X, 64], [GUARD_X + 160, 76], [3900, 24], [4010, 62], [4140, 24]];

var GXBGW = [1340, 1640, 1940, 2240];

GXS.burger = {
    par: function () { gxNxPar('#3a2418'); },
    back: function (L, xa, xb, nv) {
      var i;
      gxBgHall(xa, xb, nv); gxBgCorr(xa, xb, nv);
      GXBGW.forEach(function (cx) { if (cx > xa - 150 && cx < xb + 150) gxBgWin(cx, nv); });
      if (BG_OUT > xa - 90 && BG_OUT < xb + 90) {
        gxShadow(BG_OUT, gY + 4, 70, 0.8);
        gxPanel(BG_OUT - 58, gY - 214, 116, 214, '#c4281f', { r: 8, lw: 2.8 });
        ctx.fillStyle = nv ? gxLG(0, gY - 200, 0, gY, '#1c2c58', '#3a5a94') : gxLG(0, gY - 200, 0, gY, '#cfeaff', '#7ab4e0'); gxRR(BG_OUT - 44, gY - 200, 88, 200, 5); ctx.fill(); gxInk(2); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.beginPath(); ctx.moveTo(BG_OUT - 40, gY - 20); ctx.lineTo(BG_OUT - 8, gY - 196); ctx.lineTo(BG_OUT + 8, gY - 196); ctx.lineTo(BG_OUT - 24, gY - 20); ctx.fill();
        ctx.strokeStyle = '#d6ad2a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(BG_OUT + 30, gY - 130); ctx.lineTo(BG_OUT + 30, gY - 74); ctx.stroke();
        gxPanel(BG_OUT - 40, gY - 252, 80, 28, '#1f8a4a', { r: 8, lw: 2.4 });
        gxPanel(BG_OUT - 54, gY - 8, 108, 8, '#8a2a14', { r: 4, lw: 1.8 });
      }
      gxBgMenu(BG_C); gxBgCounter(BG_C);
      gxBgJuke(GXBG.jb); gxBgNeon(GXBG.jb, nv);
      GXBG.tabs.forEach(function (tx) { if (tx > xa - 120 && tx < xb + 120) gxBgTable(tx); });
      GXBG.pls.forEach(function (px) { if (px > xa - 60 && px < xb + 60) { gxPlant(px, 1.05); gxBgPendant(px); } });
      if (GXBG.clock > xa - 50 && GXBG.clock < xb + 50) { gxBgClock(GXBG.clock); gxBin(GXBG.clock); }
      if (GXBG.drink > xa - 60 && GXBG.drink < xb + 60) gxBgDrink(GXBG.drink);
      if (GXBG.stand > xa - 80 && GXBG.stand < xb + 80) gxBgStand(GXBG.stand);
      if (GXBG.sign > xa - 80 && GXBG.sign < xb + 80) { gxPanel(GXBG.sign - 62, gY - 232, 124, 40, '#1a2230', { r: 8, lw: 2.6 }); gxText('СЛУЖЕБНЫЙ ВХОД', GXBG.sign, gY - 218, 12, '#ffd23f', null); gxBig('▶▶', GXBG.sign, gY - 200, 14, '#7dff9a', null); }
      if (GUARD_X + 160 > xa - 100 && GUARD_X + 160 < xb + 100) gxBgOffDoor(GUARD_X + 160);
      for (i = 0; i < 3; i++) { var lx = 3160 + i * 380; if (lx > xa - 70 && lx < xb + 70) gxBgLamp(lx, true); }
      for (i = 0; i < 14; i++) { var fx = 120 + i * 210; if (fx < 2960 && fx > xa - 60 && fx < xb + 60) gxBgLamp(fx, true); }
    },
    anim: function (L, x0, x1, nv) {
      var i, fl;
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < 14; i++) { var fx = 120 + i * 210; if (fx < 2960 && fx > x0 - 100 && fx < x1 + 100) { fl = 0.5 + 0.1 * Math.sin(t * 2 + i); var lg = ctx.createLinearGradient(0, gY - 360, 0, gY - 150); lg.addColorStop(0, 'rgba(255,240,190,' + (0.3 * fl).toFixed(2) + ')'); lg.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(fx - 48, gY - 360); ctx.lineTo(fx + 48, gY - 360); ctx.lineTo(fx + 130, gY - 150); ctx.lineTo(fx - 130, gY - 150); ctx.fill(); } }
      for (i = 0; i < 3; i++) { var cx2 = 3160 + i * 380; if (cx2 > x0 - 90 && cx2 < x1 + 90) { fl = Math.sin(t * (7 + i * 3) + i * 5) > -0.8 ? 1 : 0.25; gxGlow(cx2, gY - 330, 110, '190,255,225', 0.34 * fl); } }
      // неон: мерцание
      if (GXBG.jb > x0 - 100 && GXBG.jb < x1 + 100) { fl = Math.sin(t * 17) > -0.85 ? 1 : 0.35; gxGlow(GXBG.jb, gY - 240, 120, '255,120,60', (nv ? 0.5 : 0.28) * fl); var jc = ['255,90,160', '90,150,255', '120,255,160']; for (i = 0; i < 3; i++) gxGlow(GXBG.jb - 20 + i * 20, gY - 94, 28, jc[(i + Math.floor(t * 2)) % 3], 0.5); }
      GXBG.pls.forEach(function (px) { if (px > x0 - 60 && px < x1 + 60) gxGlow(px, gY - 262, 66, '255,226,140', 0.46); });
      if (BG_C > x0 - 300 && BG_C < x1 + 300) { for (i = 0; i < 18; i++) { var bx = BG_C - 252 + i * 29.6; gxGlow(bx, gY - 346, 10, '255,220,100', Math.sin(t * 4 + i * 0.9) > 0 ? 0.9 : 0.3); gxGlow(bx, gY - 190, 10, '255,220,100', Math.sin(t * 4 + i * 0.9 + 1.6) > 0 ? 0.9 : 0.3); } }
      if (GXBG.drink > x0 - 60 && GXBG.drink < x1 + 60) gxGlow(GXBG.drink, gY - 108, 54, '255,220,160', 0.3);
      ctx.globalCompositeOperation = 'source-over';
      if (nv) GXBGW.forEach(function (cx) { if (cx > x0 - 140 && cx < x1 + 140) { ctx.globalCompositeOperation = 'lighter'; gxGlow(cx, gY - 230, 150, '255,200,120', 0.14); ctx.globalCompositeOperation = 'source-over'; } });
      // пар над бургерами на столиках
      GXBG.tabs.forEach(function (tx, k) { if (tx > x0 - 100 && tx < x1 + 100) { ctx.fillStyle = 'rgba(255,255,255,.34)'; for (var s = 0; s < 3; s++) { var u = (t * 0.5 + s / 3 + k * 0.13) % 1; ctx.globalAlpha = 0.4 * (1 - u); ctx.beginPath(); ctx.arc(tx - 18 + Math.sin(t * 2 + s + k) * 5, gY - 110 - u * 40, 3 + u * 5, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1; } });
      // сотрудники
      if (BG_C > x0 - 300 && BG_C < x1 + 300) bgNpc('worker', BG_C, 220, false);
      if (GUARD_X > x0 - 120 && GUARD_X < x1 + 120) bgNpc('guard', GUARD_X, 215, false, 1);
      gxText('ВЫХОД', BG_OUT, gY - 238, 14, '#ffffff', 'rgba(8,40,20,.9)');
    }
  };

var gxScrC = {};

var _drawHn0 = drawHn;

drawHn = function () {
    if (!GX) return _drawHn0();
    var w = W, h = H, i, e, side, G = gxHnGeo(w, h), cx = G.cx, dy = G.dy, ww = G.ww, wh = G.wh, wy = G.wy;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var jx = hn.over > 0 ? (Math.random() - 0.5) * 24 : 0, jy = hn.over > 0 ? (Math.random() - 0.5) * 24 : 0;
    ctx.save(); ctx.translate(jx, jy);
    ctx.fillStyle = '#120a10'; ctx.fillRect(-30, -30, w + 60, h + 60);
    ctx.drawImage(gxScr('hn' + hn.night, w, h, gxHnBg), 0, 0, w, h);
    var fl = Math.sin(t * 23) > 0.92 || (hn.out && Math.sin(t * 9) > 0.3) || hn.bo > 0 ? 0.3 : 1;
    // мягкий свет настольной зоны
    if (gxQ > 0) gxGlow(cx, h * 0.3, w * 0.4, '255,200,150', 0.1 * fl);
    // часы: стрелки
    var ccx = G.clx, ccy = G.cly, cr = G.cr, ang = (hn.t / (HN_HOUR * 6)) * 6.28 * 0.5 - 1.57;
    ctx.strokeStyle = '#2a1a14'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(ccx, ccy); ctx.lineTo(ccx + Math.cos(ang) * cr * 0.7, ccy + Math.sin(ang) * cr * 0.7); ctx.moveTo(ccx, ccy); ctx.lineTo(ccx, ccy - cr * 0.8); ctx.stroke();
    ctx.fillStyle = '#d62828'; ctx.beginPath(); ctx.arc(ccx, ccy, 2.4, 0, 6.3); ctx.fill();
    // двери-окна
    for (side = 0; side < 2; side++) {
      e = hn.en[side]; var wx = G.wxs[side], lit = (side === 0 ? hn.ll : hn.lr) && hn.bo <= 0, dr = side === 0 ? hn.dl : hn.dr;
      gxHnWin(side, e, wx, wy, ww, wh, lit, dr);
    }
    // щит камер
    var sbw = G.sbw, sbh = G.sbh, sbx = cx - sbw / 2, sby = G.sby;
    for (i = 0; i < 4; i++) {
      var tx2 = sbx + 6 + (i % 2) * (sbw / 2 - 3), ty2 = sby + 6 + Math.floor(i / 2) * (sbh / 2 - 3), tw = sbw / 2 - 12, th = sbh / 2 - 12, on = i === hn.camSel && hn.cam;
      ctx.fillStyle = on ? gxLG(0, ty2, 0, ty2 + th, '#4fd68a', '#1c7a4a') : gxLG(0, ty2, 0, ty2 + th, '#1c4a34', '#0e2a1e'); gxRR(tx2, ty2, tw, th, 4); ctx.fill(); gxInk(1.6); ctx.stroke();
      ctx.strokeStyle = on ? 'rgba(220,255,235,.55)' : 'rgba(111,214,154,.28)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(tx2 + 5, ty2 + th * 0.78); ctx.lineTo(tx2 + tw * 0.3, ty2 + th * 0.46); ctx.lineTo(tx2 + tw * 0.55, ty2 + th * 0.66); ctx.lineTo(tx2 + tw - 5, ty2 + th * 0.28); ctx.stroke();
      gxText('CAM ' + (i + 1), tx2 + tw / 2, ty2 + 10, 10, '#c8ffe0', null);
    }
    // вентиляция (со 2 ночи)
    if (hn.night >= 2) {
      var vgx = G.vgx, vgy = G.vgy, vgw = G.vgw, vgh = vgw * 0.62, ven = hn.en[2];
      ctx.fillStyle = '#05080a'; ctx.fillRect(vgx, vgy, vgw, vgh);
      if (ven && hn.vn < 0.5) { if (ven.st >= 3) hnEyes(vgx + vgw / 2, vgy + vgh * 0.5, Math.max(3, vgw * 0.04)); else if (ven.st === 2) { ctx.fillStyle = 'rgba(255,60,60,.35)'; ctx.beginPath(); ctx.arc(vgx + vgw / 2 - 6, vgy + vgh / 2, 2.5, 0, 6.3); ctx.arc(vgx + vgw / 2 + 6, vgy + vgh / 2, 2.5, 0, 6.3); ctx.fill(); } }
      var sl = 6; for (i = 0; i < sl; i++) { var sy = vgy + (i / sl) * vgh * (1 - hn.vn * 0.15), sh2 = vgh / sl * (0.2 + 0.7 * hn.vn); ctx.fillStyle = gxLG(0, sy, 0, sy + sh2, '#a9b4ba', '#5a666c'); ctx.fillRect(vgx, sy, vgw, sh2); gxInk(1); ctx.strokeRect(vgx, sy, vgw, sh2); }
      gxText('ВЕНТ [5]', vgx + vgw / 2, vgy + vgh + 18, 11, '#e8d6c0', null);
    }
    // монитор на столе
    var mw2 = G.mw2, mh2 = mw2 * 0.62, mx2 = G.mx2, my2 = dy - mh2 + 4;
    ctx.fillStyle = gxLG(0, my2, 0, my2 + mh2, '#164a30', '#0a2a1c'); ctx.fillRect(mx2, my2, mw2, mh2); ctx.fillStyle = 'rgba(111,214,154,' + (0.18 + 0.08 * Math.sin(t * 5)).toFixed(2) + ')'; ctx.fillRect(mx2, my2, mw2, mh2);
    gxText('CAM ' + (hn.camSel + 1), mx2 + mw2 / 2, my2 + 12, 10, '#bfffd8', null);
    for (i = 0; i < hn.en.length; i++) { var sn = hn.bo > 0 ? null : hnCamSeen(hn.en[i], hn.camSel); if (sn) { ctx.fillStyle = '#ff5a4a'; ctx.beginPath(); ctx.arc(mx2 + mw2 * (0.15 + sn.x * 0.7), my2 + mh2 * 0.75, 3.4, 0, 6.3); ctx.fill(); gxGlow(mx2 + mw2 * (0.15 + sn.x * 0.7), my2 + mh2 * 0.75, 12, '255,90,74', 0.9); } }
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(mx2, my2 + mh2); ctx.lineTo(mx2 + mw2 * 0.3, my2); ctx.lineTo(mx2 + mw2 * 0.5, my2); ctx.lineTo(mx2 + mw2 * 0.2, my2 + mh2); ctx.fill();
    // вентилятор и пар из кружки
    var fx = G.fx, fy = dy - 28;
    for (i = 0; i < 3; i++) { var fa = t * 12 + i * 2.09; ctx.fillStyle = 'rgba(190,214,226,.74)'; ctx.beginPath(); ctx.ellipse(fx, fy - 4, 20, 4.6, fa, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#4a4c58'; ctx.beginPath(); ctx.arc(fx, fy - 4, 4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    var kx = cx - w * 0.07; ctx.fillStyle = 'rgba(235,235,235,.5)'; for (i = 0; i < 3; i++) { var su = (t * 0.6 + i / 3) % 1; ctx.globalAlpha = 0.6 * (1 - su); ctx.beginPath(); ctx.arc(kx + 9 + Math.sin(t * 2 + i * 2) * 3, dy - 24 - su * 24, 2.6 + su * 3, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1;
    // часы ночи
    var hr = Math.min(5, hn.hour), tx = (hr === 0 ? '12' : String(hr)) + ':' + String(Math.floor((hn.t % HN_HOUR) / HN_HOUR * 6) * 10).padStart(2, '0') + ' ночи';
    gxPanel(cx - 124, h * 0.02 - 2, 248, 64, '#160c12', { r: 14, lw: 2.6, vert: true }); ctx.strokeStyle = '#e8b52a'; ctx.lineWidth = 1.6; gxRR(cx - 119, h * 0.02 + 3, 238, 54, 10); ctx.stroke();
    gxBig('ГОЛОДНАЯ НОЧЬ ' + hn.night, cx, h * 0.02 + 20, 19, '#ff9a6a', null); gxText(tx, cx, h * 0.02 + 44, 17, '#ffffff', null);
    // энергия
    var pc = Math.ceil(hn.pw), pw = Math.min(240, w * 0.34), bx = cx - pw / 2, by = h * 0.775;
    gxPanel(bx - 8, by - 20, pw + 16, 56, '#160c12', { r: 10, lw: 2.2, vert: true });
    var pcol = pc > 25 ? ['#6aeaa0', '#1fa85a'] : (pc > 10 ? ['#ffd06a', '#e08a10'] : ['#ff7a6a', '#d02a2a']);
    ctx.fillStyle = '#05080a'; gxRR(bx, by, pw, 14, 6); ctx.fill(); ctx.fillStyle = gxLG(0, by, 0, by + 14, pcol[0], pcol[1]); if (hn.pw > 0) { gxRR(bx, by, Math.max(8, pw * hn.pw / 100), 14, 6); ctx.fill(); } ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.fillRect(bx + 4, by + 2, Math.max(0, pw * hn.pw / 100 - 8), 3); gxInk(1.6); gxRR(bx, by, pw, 14, 6); ctx.stroke();
    gxText('Энергия ' + pc + '%', cx, by + 28, 12, '#ffffff', null);
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(bx, by - 12, pw, 3); ctx.fillStyle = '#ffd23f'; ctx.fillRect(bx, by - 12, pw * Math.min(1, hn.t / (HN_HOUR * 6)), 3);
    var line = hn.tut > 0 && hn.t < 14 ? 'Свет показывает, кто в окне. Закрой дверь, пока враг у двери. Камеры (C) видят, кто идёт. Клавиши 1–4.' : (hn.msgT > 0 ? hn.msg : '');
    if (line) { ctx.font = '700 14px "Rubik", system-ui, sans-serif'; var lw = Math.min(w - 20, ctx.measureText(line).width + 28); ctx.fillStyle = 'rgba(0,0,0,.65)'; gxRR(cx - lw / 2, h * 0.7 - 70, lw, 32, 12); ctx.fill(); ctx.strokeStyle = 'rgba(255,233,168,.4)'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.fillStyle = '#ffe9a8'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(line, cx, h * 0.7 - 54); }
    for (i = 0; i < hn.en.length; i++) { e = hn.en[i]; if (e.st === 3 && !hnDoorClosed(e) && hn.over <= 0) { ctx.fillStyle = 'rgba(255,40,40,' + (0.12 + 0.1 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(i === 0 ? 0 : (i === 1 ? w / 2 : w * 0.3), 0, i === 2 ? w * 0.4 : w / 2, h); } }
    // виньетка
    if (gxQ > 0) { var vg = ctx.createRadialGradient(cx, h * 0.45, h * 0.3, cx, h * 0.45, w * 0.7); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(8,2,10,.5)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h); }
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
  };

var _sceneK0 = hnSceneKitchen, _sceneH0 = hnSceneHall, _sceneC0 = hnSceneCorr, _sceneV0 = hnSceneVent;

hnSceneKitchen = function (mx, my, mw, mh, X, Y) {
    if (!GX) return _sceneK0(mx, my, mw, mh, X, Y);
    var i, c = gxCamBase('k', mw, mh, function (w, h, x, y) {
      var q;
      ctx.fillStyle = gxLG(0, 0, 0, y(0.78), '#e8f0e8', '#bfd4cc'); ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(60,100,90,.28)'; ctx.lineWidth = 1.4; for (q = 0; q < 24; q++) { ctx.beginPath(); ctx.moveTo(x(q / 24), 0); ctx.lineTo(x(q / 24), y(0.78)); ctx.stroke(); } for (q = 0; q < 12; q++) { ctx.beginPath(); ctx.moveTo(0, y(q * 0.07)); ctx.lineTo(w, y(q * 0.07)); ctx.stroke(); }
      ctx.fillStyle = gxLG(0, y(0.78), 0, h, '#5a5f66', '#2a2e34'); ctx.fillRect(0, y(0.78), w, h * 0.22); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; for (q = 0; q < 14; q++) { ctx.beginPath(); ctx.moveTo(x(q / 14), y(0.78)); ctx.lineTo(x(q / 14) - 10, h); ctx.stroke(); }
      gxPanel(x(0.02), 0, w * 0.45, h * 0.1, '#8a949a', { r: 3, lw: 2.4, vert: true });
      gxPanel(x(0.04), y(0.55), w * 0.38, h * 0.26, '#8a98a0', { r: 4, lw: 2.6, vert: true }); gxPanel(x(0.035), y(0.52), w * 0.39, h * 0.035, '#c9d4da', { r: 3, lw: 2 }); gxPanel(x(0.07), y(0.49), w * 0.3, h * 0.035, '#20262a', { r: 3, lw: 2 });
      gxPanel(x(0.6), y(0.5), w * 0.18, h * 0.31, '#7a868e', { r: 4, lw: 2.6, vert: true }); gxPanel(x(0.62), y(0.54), w * 0.14, h * 0.06, '#d89a24', { r: 3, lw: 2 });
      gxPanel(x(0.86), y(0.16), w * 0.11, h * 0.65, '#a9b6bc', { r: 6, lw: 2.8, vert: true }); gxPanel(x(0.88), y(0.22), w * 0.012, h * 0.2, '#58666c', { lw: 1.4 }); gxPanel(x(0.88), y(0.5), w * 0.012, h * 0.2, '#58666c', { lw: 1.4 });
      gxPanel(x(0.46), y(0.34), w * 0.08, h * 0.46, '#2a1a10', { r: 3, lw: 2.4 }); ctx.fillStyle = 'rgba(255,200,120,.2)'; ctx.fillRect(x(0.46) + 4, y(0.34) + 4, w * 0.08 - 8, h * 0.46 - 8);
      var cr = h * 0.07; gxPanel(x(0.72) - cr - 4, y(0.2) - cr - 4, cr * 2 + 8, cr * 2 + 8, '#d62828', { r: cr + 4, lw: 2.2 }); ctx.fillStyle = '#f6f2e6'; ctx.beginPath(); ctx.arc(x(0.72), y(0.2), cr, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
      for (q = 0; q < 5; q++) { ctx.strokeStyle = '#4a545a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x(0.16 + q * 0.06), y(0.1)); ctx.lineTo(x(0.16 + q * 0.06), y(0.2)); ctx.stroke(); }
    });
    ctx.drawImage(c, mx, my, mw, mh);
    for (i = 0; i < 7; i++) { var fl = 0.5 + 0.5 * Math.sin(t * 9 + i * 1.7); ctx.fillStyle = 'rgba(255,' + (140 + fl * 90 | 0) + ',50,' + (0.6 + 0.3 * fl).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(X(0.09 + i * 0.04), Y(0.49) - fl * mh * 0.03, mw * 0.014, mh * (0.02 + 0.03 * fl), 0, 0, 6.3); ctx.fill(); }
    gxGlow(X(0.22), Y(0.47), mw * 0.18, '255,150,60', 0.5);
    for (i = 0; i < 6; i++) { var bp = ((t * 0.7 + i * 0.37) % 1); ctx.fillStyle = 'rgba(255,230,150,' + (0.7 * (1 - bp)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(X(0.63 + (i % 3) * 0.04 + Math.sin(t * 3 + i) * 0.005), Y(0.57 - bp * 0.08), 2 + (i % 3), 0, 6.3); ctx.fill(); }
    for (i = 0; i < 5; i++) { var sw = Math.sin(t * 1.3 + i) * 3, px = X(0.16 + i * 0.06) + sw; ctx.fillStyle = gxLG(0, Y(0.2), 0, Y(0.28), '#b9c6cc', '#6a7880'); ctx.beginPath(); ctx.arc(px, Y(0.22), mw * 0.02, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); }
    ctx.fillStyle = Math.sin(t * 3) > 0 ? '#3ddc84' : '#1c5a38'; ctx.beginPath(); ctx.arc(X(0.915), Y(0.2), 3.4, 0, 6.3); ctx.fill();
    for (i = 0; i < 8; i++) { var sp = ((t * 0.25 + i * 0.13) % 1); ctx.fillStyle = 'rgba(240,250,246,' + (0.2 * (1 - sp)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(X(0.12 + (i % 4) * 0.08) + Math.sin(t + i) * 8, Y(0.46 - sp * 0.4), 10 + sp * 18, 0, 6.3); ctx.fill(); }
    var ch = X(0.72), cy = Y(0.2), cr2 = mh * 0.07; ctx.strokeStyle = '#2a1a14'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(ch, cy); ctx.lineTo(ch + Math.cos(t * 0.3) * cr2 * 0.7, cy + Math.sin(t * 0.3) * cr2 * 0.7); ctx.moveTo(ch, cy); ctx.lineTo(ch, cy - cr2 * 0.8); ctx.stroke();
  };

hnSceneHall = function (mx, my, mw, mh, X, Y) {
    if (!GX) return _sceneH0(mx, my, mw, mh, X, Y);
    var i, c = gxCamBase('h', mw, mh, function (w, h, x, y) {
      var q;
      ctx.fillStyle = gxLG(0, 0, 0, y(0.72), '#4a3036', '#2a1a1e'); ctx.fillRect(0, 0, w, h);
      for (q = 0; q < 22; q++) { var odd = q % 2; ctx.fillStyle = odd ? '#d62828' : '#f4ecdc'; ctx.fillRect(x(q / 22), y(0.5), w / 22 + 1, h * 0.22); } ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(0, y(0.5), w, h * 0.22);
      gxPanel(0, y(0.48), w, h * 0.03, '#8a2a14', { lw: 2 });
      for (q = 0; q < 3; q++) { var wx = x(0.1 + q * 0.3); gxPanel(wx - 6, y(0.08) - 6, w * 0.22 + 12, h * 0.34 + 12, '#6a3a20', { r: 5, lw: 2.4 }); ctx.fillStyle = gxLG(0, y(0.08), 0, y(0.42), '#0a1430', '#1c2c58'); ctx.fillRect(wx, y(0.08), w * 0.22, h * 0.34); ctx.fillStyle = '#16224a'; for (var b2 = 0; b2 < 5; b2++) { var bh = h * (0.08 + ((b2 * 7 + q * 3) % 5) * 0.03); ctx.fillRect(wx + 4 + b2 * w * 0.042, y(0.42) - bh, w * 0.034, bh); } ctx.fillStyle = '#ffd987'; for (b2 = 0; b2 < 9; b2++) ctx.fillRect(wx + 8 + (b2 % 5) * w * 0.042, y(0.42) - 8 - (b2 * 7 % 5) * 8, 4, 5); ctx.fillStyle = '#7a4a2a'; ctx.fillRect(wx + w * 0.11 - 2, y(0.08), 4, h * 0.34); }
      ctx.fillStyle = gxLG(0, y(0.72), 0, h, '#2a1a18', '#120a0a'); ctx.fillRect(0, y(0.72), w, h * 0.28);
      for (q = -10; q < 22; q++) { ctx.strokeStyle = 'rgba(233,214,176,.14)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x(0.5) + (q - 6) * w * 0.01, y(0.72)); ctx.lineTo(x(q / 20), h); ctx.stroke(); }
      [0.14, 0.38, 0.62, 0.86].forEach(function (f, k) { var sc = 0.85 + (k % 2) * 0.1; ctx.fillStyle = '#4a1612'; ctx.fillRect(x(f) - 3, y(0.7), 6, h * 0.2 * sc); gxPanel(x(f) - w * 0.07 * sc, y(0.68), w * 0.14 * sc, h * 0.04, '#b02a24', { r: 6, lw: 2.2 }); ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(x(f) - 10, y(0.675), 12, 7, 0, Math.PI, 0); ctx.fill(); gxInk(1.4); ctx.stroke(); gxPanel(x(f) - 38 * sc, y(0.86), 12, h * 0.1, '#4a1612', { lw: 1.4 }); gxPanel(x(f) + 26 * sc, y(0.86), 12, h * 0.1, '#4a1612', { lw: 1.4 }); });
      gxPanel(x(0.02), y(0.48), w * 0.09, h * 0.22, '#7a3a1a', { r: 4, lw: 2.4, vert: true });
    });
    ctx.drawImage(c, mx, my, mw, mh);
    for (i = 0; i < 3; i++) { var wx = X(0.1 + i * 0.3), cx = ((t * 60 + i * 140) % (mw * 0.3)) - mw * 0.04; ctx.save(); ctx.beginPath(); ctx.rect(wx, Y(0.08), mw * 0.22, mh * 0.34); ctx.clip(); ctx.fillStyle = 'rgba(255,240,180,.85)'; ctx.beginPath(); ctx.arc(wx + cx, Y(0.38), 4, 0, 6.3); ctx.fill(); gxGlow(wx + cx, Y(0.38), 26, '255,240,180', 0.8); ctx.fillStyle = 'rgba(255,60,60,.7)'; ctx.beginPath(); ctx.arc(wx + cx - 22, Y(0.38), 3, 0, 6.3); ctx.fill(); ctx.restore(); }
    var nf = Math.sin(t * 17) > -0.85 ? 1 : 0.18; ctx.save(); ctx.shadowColor = '#ff6a3c'; ctx.shadowBlur = 16 * nf; ctx.strokeStyle = 'rgba(255,154,60,' + nf + ')'; ctx.lineWidth = 4.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(X(0.5), Y(0.12), mw * 0.05, mh * 0.045, 0, Math.PI, 0); ctx.closePath(); ctx.stroke(); ctx.restore();
    var sw = Math.sin(t * 1.1) * 14; ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(X(0.3), Y(0)); ctx.lineTo(X(0.3) + sw, Y(0.12)); ctx.stroke(); ctx.fillStyle = 'rgba(255,214,110,.92)'; ctx.beginPath(); ctx.ellipse(X(0.3) + sw, Y(0.13), mw * 0.025, mh * 0.025, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); gxGlow(X(0.3) + sw, Y(0.14), mw * 0.1, '255,214,110', 0.4);
  };

hnSceneCorr = function (mx, my, mw, mh, X, Y, side) {
    if (!GX) return _sceneC0(mx, my, mw, mh, X, Y, side);
    var i, s = side === 'l' ? -1 : 1, c = gxCamBase('c' + side, mw, mh, function (w, h, x, y) {
      var vx = x(0.5), vy = y(0.5), fw = w * 0.12, fh = h * 0.2, q;
      ctx.fillStyle = gxLG(0, 0, 0, h, '#2e3a3c', '#141c1e'); ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#0a0e10'; ctx.fillRect(vx - fw, vy - fh, fw * 2, fh * 2.1);
      ctx.fillStyle = gxLG(0, 0, w * 0.5, 0, '#415456', '#2a3a3c'); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - fw, vy - fh); ctx.lineTo(vx - fw, vy + fh * 1.1); ctx.lineTo(0, h); ctx.fill();
      ctx.fillStyle = gxLG(w, 0, w * 0.5, 0, '#4d6264', '#2f4244'); ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx + fw, vy + fh * 1.1); ctx.lineTo(w, h); ctx.fill();
      ctx.fillStyle = '#242e30'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx - fw, vy - fh); ctx.fill();
      ctx.fillStyle = '#586468'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w, h); ctx.lineTo(vx + fw, vy + fh * 1.1); ctx.lineTo(vx - fw, vy + fh * 1.1); ctx.fill();
      ctx.strokeStyle = 'rgba(190,240,220,.2)'; ctx.lineWidth = 2; for (q = 1; q < 7; q++) { var qq = Math.pow(q / 7, 1.7); ctx.beginPath(); ctx.moveTo(hnLerp(vx - fw, 0, qq), hnLerp(vy - fh, 0, qq)); ctx.lineTo(hnLerp(vx - fw, 0, qq), hnLerp(vy + fh * 1.1, h, qq)); ctx.moveTo(hnLerp(vx + fw, w, qq), hnLerp(vy - fh, 0, qq)); ctx.lineTo(hnLerp(vx + fw, w, qq), hnLerp(vy + fh * 1.1, h, qq)); ctx.stroke(); }
      gxPanel(vx - fw * 0.5, vy - fh * 0.6, fw, fh * 1.6, side === 'l' ? '#6a4a2a' : '#4a2a6a', { r: 3, lw: 2.2 }); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(vx - fw * 0.5 + 4, vy - fh * 0.6 + 4, fw - 8, 6);
      gxPanel(x(s < 0 ? 0.05 : 0.8), y(0.26), w * 0.1, h * 0.22, '#9a2a20', { r: 3, lw: 2.2, vert: true }); gxText('NO EXIT', x(s < 0 ? 0.1 : 0.85), y(0.38), 11, '#ffd23f', null);
      ctx.strokeStyle = '#6a7a7e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, y(0.12)); ctx.lineTo(vx - fw, vy - fh * 0.8); ctx.stroke(); ctx.strokeStyle = '#a9bcc0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y(0.12) - 2); ctx.lineTo(vx - fw, vy - fh * 0.8 - 2); ctx.stroke();
      gxHaz(0, h - 12, w, 12);
    });
    ctx.drawImage(c, mx, my, mw, mh);
    var vx = X(0.5), vy = Y(0.5), fw = mw * 0.12, fh = mh * 0.2;
    for (i = 0; i < 3; i++) { var qq = (i + 1) / 4, on = Math.sin(t * (7 + i * 3) + i * 5) > -0.8 ? 1 : 0.2; ctx.fillStyle = 'rgba(214,255,238,' + (0.7 * on).toFixed(2) + ')'; ctx.fillRect(vx - hnLerp(fw, mw * 0.15, 1 - qq), hnLerp(vy - fh, my, 1 - qq) + 4, hnLerp(fw, mw * 0.15, 1 - qq) * 2, 6); gxGlow(vx, hnLerp(vy - fh, my, 1 - qq) + 8, mw * 0.14 * (1 - qq * 0.5), '190,255,225', 0.2 * on); }
    var d = (t * 0.8) % 1; ctx.fillStyle = 'rgba(170,224,255,.8)'; ctx.fillRect(X(0.32), Y(0.3 + d * 0.5), 2.4, 6);
  };

hnSceneVent = function (mx, my, mw, mh, X, Y) {
    if (!GX) return _sceneV0(mx, my, mw, mh, X, Y);
    var i, c = gxCamBase('v', mw, mh, function (w, h, x, y) {
      var vx = x(0.5), vy = y(0.5), fw = w * 0.09, fh = h * 0.16, q;
      ctx.fillStyle = gxLG(0, 0, 0, h, '#3a4044', '#161a1c'); ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#06080a'; ctx.fillRect(vx - fw, vy - fh, fw * 2, fh * 2);
      ctx.fillStyle = gxLG(0, 0, w * 0.5, 0, '#56606a', '#38424a'); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - fw, vy - fh); ctx.lineTo(vx - fw, vy + fh); ctx.lineTo(0, h); ctx.fill();
      ctx.fillStyle = gxLG(w, 0, w * 0.5, 0, '#626e78', '#44505a'); ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(w, h); ctx.fill();
      ctx.fillStyle = '#323a40'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx - fw, vy - fh); ctx.fill();
      ctx.fillStyle = '#20282c'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w, h); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(vx - fw, vy + fh); ctx.fill();
      ctx.strokeStyle = 'rgba(190,210,220,.34)'; ctx.lineWidth = 3; for (q = 1; q < 7; q++) { var qq = Math.pow(q / 7, 1.6), yy = hnLerp(vy - fh, 0, qq), y2 = hnLerp(vy + fh, h, qq); ctx.beginPath(); ctx.moveTo(hnLerp(vx - fw, 0, qq), yy); ctx.lineTo(hnLerp(vx + fw, w, qq), yy); ctx.moveTo(hnLerp(vx - fw, 0, qq), y2); ctx.lineTo(hnLerp(vx + fw, w, qq), y2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(hnLerp(vx - fw, 0, qq), yy, 10 * (1 - qq * 0.5), 6); ctx.fillRect(hnLerp(vx + fw, w, qq) - 10, yy, 10 * (1 - qq * 0.5), 6); }
      gxHaz(0, h - 12, w, 12);
    });
    ctx.drawImage(c, mx, my, mw, mh);
    var vx = X(0.5), vy = Y(0.5), fw = mw * 0.09, fh = mh * 0.16;
    for (i = 0; i < 6; i++) { var sy = vy - fh * 0.9 + i * fh * 0.36; ctx.fillStyle = hn.vn > 0.5 ? 'rgba(200,210,215,.92)' : 'rgba(40,50,55,.5)'; ctx.fillRect(vx - fw * 0.9, sy, fw * 1.8, fh * 0.13); if (hn.vn > 0.5) { gxInk(1); ctx.strokeRect(vx - fw * 0.9, sy, fw * 1.8, fh * 0.13); } }
    var fl = Math.sin(t * 6) > -0.6 ? 0.6 : 0.2; gxGlow(vx, vy, mh * 0.4, '156,208,255', 0.18 * fl);
  };

var GXHS = { poster: 255, benches: [640, 1055, 1480, 2551], plants: [195, 1198, 1358, 2470], cart: 735, iv: 960, chair: 1565, alcove: HIN_DOOR.r1 + 150 };

var GXHSLOTS = [[HIN_DOOR.exit, 62], [HIN_DOOR.reg, 96], [195, 22], [735, 26], [HIN_DOOR.doc, 62], [960, 18], [640, 52], [1055, 52], [1198, 14], [HIN_DOOR.r3, 62], [1358, 14], [1480, 52], [1565, 28], [HIN_DOOR.r2, 62], [RC_X, 150], [HIN_DOOR.r1, 69], [HIN_DOOR.r1 + 150, 78], [2470, 18], [2551, 52]];

var GXHWIN = [645, 1055, 1480, 1921, 2551];

GXS.hospin = {
    par: function () { gxNxPar('#cfdbe8'); },
    back: function (L, xa, xb, nv) {
      var up = gxUp(), dn = gxDown(), a = xa, b = xb, i, q;
      // стена
      ctx.fillStyle = gxLG(0, gY - up, 0, gY - 112, '#f2f8fd', '#dbe8f3'); ctx.fillRect(a, gY - up - 4, b - a, up - 106);
      ctx.strokeStyle = 'rgba(120,150,180,.16)'; ctx.lineWidth = 1.6; for (q = Math.floor(a / 120) * 120; q < b + 120; q += 120) { ctx.beginPath(); ctx.moveTo(q, gY - 340); ctx.lineTo(q, gY - 114); ctx.stroke(); }
      // потолок: плитка с рамой
      ctx.fillStyle = gxLG(0, gY - 380, 0, gY - 350, '#ffffff', '#e1eaf3'); ctx.fillRect(a, gY - 380, b - a, 34); if (up > 380) { ctx.fillStyle = '#f4f8fc'; ctx.fillRect(a, gY - up - 4, b - a, up - 376); }
      ctx.strokeStyle = 'rgba(120,150,180,.3)'; ctx.lineWidth = 1.4; for (q = Math.floor(a / 85) * 85; q < b + 85; q += 85) { ctx.beginPath(); ctx.moveTo(q, gY - 380); ctx.lineTo(q, gY - 346); ctx.stroke(); }
      gxInk(2); ctx.beginPath(); ctx.moveTo(a, gY - 346); ctx.lineTo(b, gY - 346); ctx.stroke(); ctx.fillStyle = 'rgba(80,110,140,.16)'; ctx.fillRect(a, gY - 345, b - a, 6);
      for (i = Math.floor(a / 170) * 170; i < b + 170; i += 170) { gxPanel(i + 30, gY - 354, 108, 14, '#e8eef6', { r: 4, lw: 2 }); ctx.fillStyle = '#fffff0'; gxRR(i + 36, gY - 350, 96, 7, 3); ctx.fill(); }
      // окна
      GXHWIN.forEach(function (cx) { if (cx > a - 150 && cx < b + 150) gxHsWin(cx, nv); });
      // зелёная панель и поручень
      ctx.fillStyle = gxLG(0, gY - 112, 0, gY, '#9bd8c8', '#6fb5a6'); ctx.fillRect(a, gY - 112, b - a, 112); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(a, gY - 110, b - a, 4);
      ctx.fillStyle = '#5ea898'; ctx.fillRect(a, gY - 114, b - a, 4); gxInk(1.8); ctx.beginPath(); ctx.moveTo(a, gY - 114); ctx.lineTo(b, gY - 114); ctx.stroke();
      ctx.strokeStyle = 'rgba(40,100,90,.2)'; ctx.lineWidth = 1.4; for (q = Math.floor(a / 60) * 60; q < b + 60; q += 60) { ctx.beginPath(); ctx.moveTo(q, gY - 108); ctx.lineTo(q, gY - 4); ctx.stroke(); }
      gxPanel(a - 4, gY - 74, b - a + 8, 8, '#dbe6f0', { r: 3, lw: 2.2 }); for (q = Math.floor(a / 120) * 120 + 20; q < b; q += 120) { gxPanel(q - 3, gY - 68, 6, 12, '#b9c8d6', { lw: 1.2 }); }
      gxPanel(a - 4, gY - 12, b - a + 8, 12, '#4a8878', { lw: 1.8 });
      // пол: плитка, отражения и зелёная направляющая
      ctx.fillStyle = gxLG(0, gY - 2, 0, gY + 44, '#eef3f9', '#c7d4e1'); ctx.fillRect(a, gY - 2, b - a, 46); ctx.fillStyle = gxLG(0, gY + 44, 0, gY + dn, '#aebfd0', '#7e92a8'); ctx.fillRect(a, gY + 44, b - a, dn);
      ctx.strokeStyle = 'rgba(80,110,140,.3)'; ctx.lineWidth = 1.4; for (q = Math.floor(a / 90) * 90; q < b + 90; q += 90) { ctx.beginPath(); ctx.moveTo(q, gY - 2); ctx.lineTo(q - 18, gY + 44); ctx.lineTo(q - 46, gY + dn); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(a, gY + 44); ctx.lineTo(b, gY + 44); ctx.stroke();
      ctx.fillStyle = '#2f8f7b'; ctx.fillRect(a, gY + 14, b - a, 6); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(a, gY + 14, b - a, 1.6);
      ctx.fillStyle = 'rgba(255,255,235,.3)'; for (i = Math.floor(a / 170) * 170; i < b; i += 170) { ctx.beginPath(); ctx.moveTo(i + 44, gY + 2); ctx.lineTo(i + 124, gY + 2); ctx.lineTo(i + 96, gY + 12); ctx.lineTo(i + 20, gY + 12); ctx.fill(); }
      gxInk(2.4); ctx.beginPath(); ctx.moveTo(a, gY - 1); ctx.lineTo(b, gY - 1); ctx.stroke();
      // двери
      [[HIN_DOOR.exit, 'ВЫХОД', 'exit'], [HIN_DOOR.doc, 'ВРАЧ', ''], [HIN_DOOR.r3, 'ПАЛАТА 3', ''], [HIN_DOOR.r2, 'ПАЛАТА 2', ''], [HIN_DOOR.r1, 'ПАЛАТА 1', 'gold']].forEach(function (d) { if (d[0] > a - 140 && d[0] < b + 140) gxHsDoor(d[0], d[1], d[2]); });
      if (GXHS.poster > a - 40 && GXHS.poster < b + 40) gxHsPoster(GXHS.poster);
      GXHS.benches.forEach(function (x) { if (x > a - 70 && x < b + 70) gxHsBench(x); });
      GXHS.plants.forEach(function (x) { if (x > a - 40 && x < b + 40) gxPlant(x, 0.95); });
      if (HIN_DOOR.reg > a - 140 && HIN_DOOR.reg < b + 140) gxHsReg(HIN_DOOR.reg);
      if (GXHS.cart > a - 40 && GXHS.cart < b + 40) gxHsCart(GXHS.cart);
      if (GXHS.iv > a - 30 && GXHS.iv < b + 30) gxHsIV(GXHS.iv);
      if (GXHS.chair > a - 50 && GXHS.chair < b + 50) gxHsChair(GXHS.chair);
      if (GXHS.alcove > a - 100 && GXHS.alcove < b + 100) gxHsBed(GXHS.alcove);
    },
    anim: function (L, x0, x1, nv) {
      var i, k, px = GXHS.alcove;
      ctx.globalCompositeOperation = 'lighter';
      for (i = Math.floor(x0 / 170) * 170; i < x1 + 170; i += 170) {
        var fl = (Math.floor(i / 170) % 11 === 5) ? 0.55 + 0.45 * Math.sin(t * 30) : 1, lg = ctx.createLinearGradient(0, gY - 346, 0, gY - 150);
        lg.addColorStop(0, 'rgba(255,255,225,' + (0.2 * fl).toFixed(3) + ')'); lg.addColorStop(1, 'rgba(255,255,225,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(i + 38, gY - 344); ctx.lineTo(i + 130, gY - 344); ctx.lineTo(i + 200, gY - 150); ctx.lineTo(i - 32, gY - 150); ctx.fill();
        if (gxQ > 0) gxGlow(i + 84, gY - 346, 70, '255,255,225', 0.22 * fl);
      }
      if (HIN_DOOR.r1 > x0 - 260 && HIN_DOOR.r1 < x1 + 260) { gxGlow(HIN_DOOR.r1, gY - 100, 220, '255,215,90', 0.42 + 0.1 * Math.sin(t * 2)); }
      if (nv) GXHWIN.forEach(function (cx) { if (cx > x0 - 140 && cx < x1 + 140) gxGlow(cx, gY - 225, 130, '160,190,255', 0.1); });
      ctx.globalCompositeOperation = 'source-over';
      // кардиомонитор над кроватью
      if (px > x0 - 100 && px < x1 + 100) {
        var mx = px - 66, my = gY - 114, beat = (t * 1.1) % 1;
        ctx.strokeStyle = '#6dff9a'; ctx.lineWidth = 1.8; ctx.beginPath(); for (i = 0; i <= 22; i++) { var u = i / 22, yy = my + 8, ph = ((u * 1.4 + (1 - beat)) % 1); if (ph > 0.42 && ph < 0.5) yy -= (0.5 - Math.abs(ph - 0.46) * 10) * 12; else if (ph > 0.5 && ph < 0.56) yy += 3; if (i) ctx.lineTo(mx + 2 + u * 22, yy); else ctx.moveTo(mx + 2, yy); } ctx.stroke(); gxGlow(mx + 13, my + 8, 20, '109,255,154', 0.4);
        if (save.mx.mh && ready(img.mell)) { ctx.save(); ctx.translate(px - 10, gY - 56); ctx.drawImage(img.mell, 0, 0, 224, 99, -40, -36, 90, 40); ctx.fillStyle = '#fff'; ctx.fillRect(-14, -30, 26, 7); ctx.restore(); }
        if (save.mx.sf === 2) sciDraw(px + 42, -1, 0.8, 0, 0);
        ctx.fillStyle = '#6a7a90'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Z z z', px - 20 + Math.sin(t * 2) * 3, gY - 100 - (t * 8) % 10);
      }
      // персонал
      var rx = HIN_DOOR.reg; if (rx > x0 - 140 && rx < x1 + 140) sciDraw(rx - 30, 1, 1, 0, 2);
      for (k = 0; k < 2; k++) { var dx = 1000 + k * 800 + Math.sin(t * 0.45 + k * 2.3) * 220, fc = Math.cos(t * 0.45 + k * 2.3) >= 0 ? 1 : -1; if (dx > x0 - 80 && dx < x1 + 80) sciDraw(dx, fc, 0.95, t * 1.2 + k, 1); }
      drawDocRuin(x0, x1);
      // пылинки в лучах света
      if (gxQ > 0) { ctx.fillStyle = 'rgba(255,255,240,.5)'; for (i = 0; i < 16; i++) { var ux = x0 + ((i * 197 + t * 8) % Math.max(200, x1 - x0)), uy = gY - 330 + ((i * 53 + t * 14) % 220); ctx.globalAlpha = 0.3 + 0.3 * Math.sin(t + i); ctx.beginPath(); ctx.arc(ux, uy, 1.4, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1; }
    }
  };

var _drawGates7 = drawGates;

drawGates = function () {
    if (GX && loc.i === 13) { if (typeof drawLocDetail === 'function') drawLocDetail(); if (typeof rcDrawCircle === 'function') { setCam(1); rcDrawCircle(); } return; }
    _drawGates7();
  };

var GXM_SL = [[190, 86], [430, 140], [640, 66], [770, 48], [845, 14], [1000, 130], [1149, 16], [1280, 114], [1430, 28], [1600, 96], [1770, 60], [1870, 30], [2000, 96], [2200, 100], [2328, 20], [2385, 14],
    [2455, 45], [2540, 12], [2700, 50], [2850, 12], [3000, 110], [3170, 12], [3300, 34], [3410, 26], [3540, 88], [3690, 30], [3760, 40], [3815, 12], [4030, 64], [4180, 12]];

var GXMSLOTS = GXM_SL;

AV_PUMP4 = 770;

var GXM_PALMS = [{ x: 845, h: 205, l: -28, s: 1 }, { x: 1180, h: 165, l: -12, s: 2 }, { x: 1380, h: 172, l: -8, s: 3 }, { x: 2385, h: 195, l: 22, s: 4 }];

var GXM_SLIPS = [[2700, 'МЕСТО 1', '#2fbf6b'], [3300, 'МЕСТО 2', '#3b7bff'], [3900, 'МЕСТО 3', '#ff9a3a']];

GXS.beach = {
    par: function (L, x0, x1, nv) {
      drawHills(0.15, 98, '#8fe0cf', 12, 8, 0.6);
      setCam(1); gxMSea(x0, x1, nv);
    },
    back: function (L, xa, xb, nv) {
      gxMVillas(xa, xb, nv);
      gxMGroundSand(xa, xb);
      gxMPier(xa, xb, nv);
      var i, p, f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      // растительность и мелочи на песке
      gxEach(xa, xb, 83, 40, 30, function (x, k) {
        if (x > LAG_X - 30 || !gxMFree(x, 26)) return; var h = gxH(k * 11 + 4);
        if (h < 0.34) gxMShrub(x, 0.8 + h, k); else if (h < 0.5) gxMGrassTuft(x, k); else if (h < 0.6) gxMCoconut(x, k); else if (h < 0.7) gxMShell(x, k);
      });
      for (i = 0; i < GXM_PALMS.length; i++) { p = GXM_PALMS[i]; if (f(p.x + p.l * 0.5, 40)) gxPalmTrunk(p); }
      if (f(190, 110)) gxMLighthouse(190);
      if (f(1280, 130)) gxMHammockBase(GXM_PALMS[1], GXM_PALMS[2]);
      [1149, 1430, 2328].forEach(function (rx, q) { if (f(rx, 40)) gxRockHD(rx, [0.55, 0.9, 0.75][q]); });
      if (f(640, 80)) gxMSign(640, 132, '#1f4aa8', 'РЕЙС ДОМОЙ', 'бесплатно', 'plane');
      if (f(1600, 120)) gxMHut(1600);
      if (f(1770, 80)) gxMUmbrella(1770);
      if (f(1870, 40)) gxMCastle(1870);
      if (f(2000, 110)) gxMSign(2000, 192, '#2f8a52', 'Западный берег', 'здесь появятся новые места');
      if (f(2200, 120)) gxMTiki(2200, nv);
      if (f(2455, 60)) gxMBoard(2455);
      if (f(2700, 70)) gxMRack(2700);
      if (f(3300, 50)) { gxCrate(3300, 1.1, '#b07a42'); gxMBarrel(3322, '#4a7a9a'); }
      if (f(3410, 40)) { gxMNet(3410); }
      if (f(3540, 100)) gxMFishHut(3540, nv);
      if (f(3690, 50)) gxMBucket(3690);
      if (f(3760, 50)) gxBench(3760);
      if (f(4030, 80)) gxMSign(4030, 128, '#1f4aa8', 'Рыбалка', 'с причала');
      [2540, 2850, 3170, 3815, 4180].forEach(function (lx) { if (f(lx, 40)) gxMLamp(lx, nv); });
    },
    anim: function (L, x0, x1, nv) {
      var i, p, k, h;
      // самолёт (логика рейса не тронута)
      if (HOME_X > x0 - 220 && HOME_X < x1 + 220) { gxShadow(HOME_X, gY + 4, 150, 0.8); drawAirliner(HOME_X, gY - 2, 1, 1, '#e5484d', 0, 0); }
      // прибой
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      for (i = Math.floor(x0 / 26) - 1; i * 26 < x1 && i * 26 < LAG_X + 10; i++) { ctx.beginPath(); ctx.ellipse(i * 26 + 13, gY - 4 + Math.sin(t * 1.5 + i * 0.7) * 1.7, 15, 3.4, 0, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,255,255,.35)'; for (i = Math.floor(x0 / 52) - 1; i * 52 < x1 && i * 52 < LAG_X; i++) { var wf = (t * 0.6 + i * 0.37) % 1; ctx.globalAlpha = 0.6 * (1 - wf); ctx.beginPath(); ctx.ellipse(i * 52 + 26, gY - 7 - wf * 6, 24 + wf * 10, 2.4, 0, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1;
      // крабы на песке
      for (k = 0; k < 4; k++) {
        var cx = [560, 1060, 1980, 2290][k] + Math.sin(t * 0.35 + k * 2.1) * 36, dr = Math.cos(t * 0.35 + k * 2.1) > 0 ? 1 : -1, mv = Math.abs(Math.cos(t * 0.35 + k * 2.1)) > 0.25 ? 1 : 0;
        if (cx < x0 - 20 || cx > x1 + 20 || cx > LAG_X - 20) continue; gxMCrab(cx, gY + 13 + (k % 2) * 4, dr, mv);
      }
      // пальмы, гамак
      gxMCrowns(x0, x1);
      if (1280 > x0 - 150 && 1280 < x1 + 150) gxMHammock(1280, GXM_PALMS[1], GXM_PALMS[2]);
      // маяк: луч
      if (190 > x0 - 300 && 190 < x1 + 300) {
        var lx = 190, ly = gY - 300, fl = Math.sin(t * 3) > 0 ? 1 : 0.45;
        gxGlow(lx, ly, 56 + 26 * fl, '255,240,170', (nv ? 0.9 : 0.4) * fl);
        if (nv) { var ba = t * 0.8; ctx.save(); ctx.translate(lx, ly); ctx.globalAlpha = 0.16 * (0.5 + 0.5 * Math.abs(Math.cos(ba))); ctx.fillStyle = 'rgb(255,244,190)'; var dr2 = Math.cos(ba) > 0 ? 1 : -1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dr2 * 520, -42); ctx.lineTo(dr2 * 520, 56); ctx.closePath(); ctx.fill(); ctx.restore(); }
      }
      // чайки
      gxEach(x0, x1, 700, 220, 100, function (x, q) { var gx2 = x + Math.sin(t * 0.3 + q * 2) * 160, gy2 = gY - 250 - ((q * 37) % 70) + Math.sin(t * 0.9 + q) * 14, wg = Math.sin(t * 6 + q) * 5; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(gx2 - 9, gy2 + wg); ctx.quadraticCurveTo(gx2 - 4, gy2 - 5 + wg * 0.4, gx2, gy2); ctx.quadraticCurveTo(gx2 + 4, gy2 - 5 + wg * 0.4, gx2 + 9, gy2 + wg); ctx.stroke(); });
      // рыбы, выпрыгивающие в лагуне
      gxEach(x0, x1, 520, 330, 60, function (x, q) {
        var ph = (t * 0.22 + q * 0.31) % 1; if (ph > 0.18) return; var u = ph / 0.18, jx = x + u * 60, jy = gY - 46 - Math.sin(u * 3.14159) * 34;
        gxMFish(jx, jy, 20, ['#ffa63a', '#6ad0ff', '#ffd23f'][q % 3], false, t * 18, q % 3 === 1 ? 1 : 0);
        if (u < 0.2 || u > 0.8) { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(u < 0.5 ? x : x + 60, gY - 44, 12 * (u < 0.5 ? 1 - u * 2 : u * 2 - 1) + 4, 2.6, 0, 0, 6.3); ctx.stroke(); }
      });
      // под причалом: рыбы, косяки, черепаха, лодки
      if (x1 > LAG_X) gxMUnder(x0, x1, nv);
    },
    front: function (L, xa, xb, nv) {
      gxEach(xa, xb, 97, 22, 20, function (x, k) {
        if (x > LAG_X - 30) return; var h = gxH(k * 17 + 8), yy = gY + 16 + h * 6;
        if (h < 0.45) { ctx.strokeStyle = '#5ea83a'; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.beginPath(); for (var b = -2; b <= 2; b++) { ctx.moveTo(x + b * 3, yy + 3); ctx.quadraticCurveTo(x + b * 3 + b, yy - 6, x + b * 6, yy - 12 - Math.abs(b) * -2); } ctx.stroke(); ctx.strokeStyle = '#8fd45a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x, yy + 3); ctx.quadraticCurveTo(x + 1, yy - 6, x + 2, yy - 14); ctx.stroke(); }
        else if (h < 0.75) { ctx.fillStyle = ['#fff4ee', '#f2b5a0', '#ffe0a0'][k % 3]; ctx.beginPath(); ctx.ellipse(x, yy, 4.2, 2.8, h * 3, 0, 6.3); ctx.fill(); gxInk(1.1); ctx.stroke(); }
      });
    },
    extra: function (L, x0, x1, nv) {
      if (typeof drawAvAirport === 'function') drawAvAirport(x0, x1);
      if (BOAT_X + 130 > camX && BOAT_X - 130 < camX + vw) drawBoatAt(BOAT_X, -1, 34, !!save.fs.boat);
      if (SUB_X + 140 > camX && SUB_X - 140 < camX + vw) drawSubMoored(SUB_X, !!save.fs.sub);
    }
  };

var _drawBoatAt0 = drawBoatAt;

drawBoatAt = function (x, f, dy, owned) {
    if (!GX) return _drawBoatAt0(x, f, dy, owned);
    var by = gY + (dy || 0) + Math.sin(t * 2.2 + x * 0.013) * 2;
    gxMBoatHD(x, by, 1, '#d8452e', f < 0 ? false : true); gxMWaterline(x, by, 100);
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - (f < 0 ? -1 : 1) * 104, by + 22); ctx.quadraticCurveTo(x - (f < 0 ? -1 : 1) * 140, by + 24, x - (f < 0 ? -1 : 1) * 170, by + 20 + Math.sin(t * 3) * 2); ctx.stroke();
    if (owned === false) {
      var tx = x, ty = by - 58; gxPanel(tx - 82, ty - 30, 164, 42, '#14233f', { r: 9, lw: 2.2, vert: true }); gxText('Продаётся: ' + fmtN(BOAT_PRICE), tx, ty - 15, 12.5, '#ffe14a', null); gxText('в лавке рыбака', tx, ty, 12, '#ffffff', null);
    }
  };

var _drawSubMoored0 = drawSubMoored;

drawSubMoored = function (x, owned) {
    if (!GX) return _drawSubMoored0(x, owned);
    var y = gY + 40; drawSubAt(x, y, 1, false, 0);
    gxMWaterline(x, y - 2, 104);
    if (!owned) { gxPanel(x - 108, gY - 156, 216, 46, '#14233f', { r: 10, lw: 2.2, vert: true }); gxText('Подводная лодка', x, gY - 141, 13, '#ffe14a', null); gxText(fmtN(SUB_PRICE) + ' коинов · лавка рыбака', x, gY - 123, 11.5, '#ffffff', null); }
  };

var _drawAvAirport0 = drawAvAirport;

drawAvAirport = function (x0, x1) {
    if (!GX) return _drawAvAirport0(x0, x1);
    var X = avPumpX(); if (X > 0 && X > x0 - 80 && X < x1 + 80) gxAirPump(X);
    drawCargoWork(x0, x1);
  };

var GXA_SL = [[420, 100], [900, 130], [1200, 70], [1700, 380], [2150, 45], [2255, 56], [2450, 135], [2750, 50], [2860, 48], [3050, 24], [3235, 70], [3500, 170], [3730, 24], [3990, 135], [4500, 110], [5200, 30], [5700, 210], [6200, 22], [6600, 70]];

var GXASLOTS = GXA_SL;

GXS.airport = {
    par: function (L, x0, x1, nv) {
      drawHills(0.2, 110, '#b7d6c0', 26, 10, 0.7); drawHills(0.4, 60, '#9cc6a6', 20, 8, 2.2); drawFarTrees(farTrees, 0.4, '#7fae8a', '#8bb995');
    },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxAirGround(xa, xb, nv);
      if (f(5700, 230)) gxAirHangar(5700, 210, 'АНГАР 2', '#7d8798');
      if (f(1200, 90)) gxAirBag(1200);
      if (f(1700, 400)) gxAirTerminal(1700, nv);
      if (f(2150, 60)) gxAirStairs(2150);
      if (f(2255, 70)) gxAirSign(2255);
      if (f(2750, 60)) gxAirTower(2750, nv);
      if (f(3500, 190)) gxAirHangar(3500, 170, 'АНГАР', '#8c97a8');
      if (f(4500, 130)) gxAirTank(4500);
      if (f(5200, 40)) gxAirBeacon(5200);
      if (f(6600, 90)) gxAirRadar(6600);
      gxEach(xa, xb, 600, 80, 40, function (x, k) { if (x > L.w - 40 || !gxAFree(x, 36)) return; if (k % 2) gxFlowers(x, 3, k); else gxBushHD(x, 0.6 + gxH(k) * 0.5, false); });
    },
    anim: function (L, x0, x1, nv) {
      // самолёты (логика не тронута): тень на перроне
      [jetA, jetM].forEach(function (j) { if (j.x > x0 - 320 && j.x < x1 + 320) { if (j.alt < 40) gxShadow(j.x, gY + 4, 140 * j.s, 0.8 * (1 - j.alt / 40)); drawJet(j); } });
      if (2750 > x0 - 80 && 2750 < x1 + 80) gxAirTowerAnim(2750, nv);
      [3050, 3730, 6200].forEach(function (wx) { if (wx > x0 - 80 && wx < x1 + 80) gxAirWindsockAnim(wx); });
      if (1050 < x1 && 2350 > x0) { ctx.save(); ctx.strokeStyle = 'rgba(100,210,255,' + (0.3 + 0.12 * Math.sin(t * 2)).toFixed(2) + ')'; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.lineDashOffset = -t * 14; ctx.strokeRect(LOCS[3].wifi[0], gY - 280, LOCS[3].wifi[1] - LOCS[3].wifi[0], 280); ctx.restore(); }
      // огни ВПП
      if (x1 > 3700) decStep(x0, x1, 150, 3700, function (x, k) {
        if (x > 7200) return; var on = Math.floor(t * 2 + k) % 6 === 0;
        ctx.fillStyle = on ? '#fff6b0' : '#e9b83a'; gxRR(x, gY + 2, 7, 4.6, 2); ctx.fill(); gxInk(1); ctx.stroke();
        gxGlow(x + 3.5, gY + 4, on ? 26 : 18, '255,226,120', (nv ? 0.9 : 0.35) * (on ? 1 : 0.7));
      });
      if (nv) { gxEach(x0, x1, 190, 40, 20, function (x) { if (x < 3700) gxGlow(x, gY + 22, 22, '255,240,180', 0.25); }); }
    },
    front: function () { },
    extra: function (L, x0, x1, nv) {
      drawAvAirport(x0, x1);
    }
  };

var _palm0 = palm;

palm = function (x, h, lean, seed) { if (!GX) return _palm0(x, h, lean, seed); var p = { x: x, h: h, l: lean, s: Math.floor(seed || 0) }; gxPalmTrunk(p); gxCrown1(p); };

var GXI_SL = [[200, 14], [520, 180], [780, 40], [980, 14], [1150, 14], [1290, 90], [1420, 14], [1560, 70], [1700, 14], [1830, 70], [1960, 14], [2110, 50], [2300, 14], [2400, 30], [2520, 14], [2640, 50], [2760, 14], [3180, 260]];

var GXISLSLOTS = GXI_SL;

var GXI_PALMS = [200, 980, 1150, 1420, 1700, 1960, 2300, 2520, 2760].map(function (x, i) { return { x: x, h: [200, 215, 190, 230, 185, 210, 220, 180, 200][i], l: (i % 2 ? 1 : -1) * (26 + i * 2), s: i }; });

GXS.island = {
    par: function (L, x0, x1, nv) { drawHills(0.15, 98, '#8fe0cf', 12, 8, 0.6); setCam(1); gxMSea(x0, x1, nv); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i;
      gxGround(xa, xb, 'sand', 0); ctx.fillStyle = gxLG(0, gY - 3, 0, gY + 8, 'rgba(110,160,150,.35)', 'rgba(110,160,150,0)'); ctx.fillRect(xa, gY - 3, xb - xa, 11);
      gxEach(xa, xb, 83, 40, 30, function (x, k) { if (x > L.w - 40 || !gxIFree(x, 26)) return; var h = gxH(k * 11 + 4); if (h < 0.3) gxMShrub(x, 0.8 + h, k); else if (h < 0.46) gxMGrassTuft(x, k); else if (h < 0.58) gxMCoconut(x, k); else if (h < 0.7) gxMShell(x, k); });
      for (i = 0; i < GXI_PALMS.length; i++) if (f(GXI_PALMS[i].x + GXI_PALMS[i].l * 0.5, 40)) gxPalmTrunk(GXI_PALMS[i]);
      if (f(1290, 130)) gxITent(1290);
      if (f(1560, 90)) gxISOS(1560);
      if (f(1830, 90)) gxIRaft(1830);
      if (f(2110, 70)) gxIDriftwood(2110);
      if (f(2400, 50)) gxRockHD(2400, 0.9);
      if (f(2640, 70)) gxITidePool(2640);
      if (f(CAVE_X, 360)) gxICaveRocks(CAVE_X, nv);
    },
    anim: function (L, x0, x1, nv) {
      var i;
      ctx.fillStyle = 'rgba(255,255,255,.92)'; for (i = Math.floor(x0 / 26) - 1; i * 26 < x1; i++) { ctx.beginPath(); ctx.ellipse(i * 26 + 13, gY - 4 + Math.sin(t * 1.5 + i * 0.7) * 1.7, 15, 3.4, 0, 0, 6.3); ctx.fill(); }
      if (isl.wk && 520 > x0 - 300 && 520 < x1 + 300) { gxShadow(520, gY + 4, 140, 0.8); drawWreck(520); }
      for (i = 0; i < GXI_PALMS.length; i++) { var tp = gxPalmPt(GXI_PALMS[i], 1); if (tp[0] > x0 - 160 && tp[0] < x1 + 160) gxCrown1(GXI_PALMS[i]); }
      if (1290 + 112 > x0 - 60 && 1290 + 112 < x1 + 60) {
        var fx = 1402; gxGlow(fx, gY - 16, 70 + (nv ? 40 : 0), '255,170,70', nv ? 0.9 : 0.4);
        for (i = 0; i < 4; i++) { var fl = Math.sin(t * 9 + i * 2) * 3, fh = 30 - i * 5 + fl; ctx.fillStyle = ['#ff5a1a', '#ff8a2a', '#ffc23a', '#fff2a0'][i]; ctx.beginPath(); ctx.moveTo(fx - 12 + i * 3, gY - 4); ctx.quadraticCurveTo(fx - 8 + i * 2 + fl, gY - fh * 0.6, fx + fl * 0.5, gY - fh); ctx.quadraticCurveTo(fx + 8 - i * 2, gY - fh * 0.6, fx + 12 - i * 3, gY - 4); ctx.closePath(); ctx.fill(); }
        for (i = 0; i < 4; i++) { var u = (t * 0.6 + i / 4) % 1; ctx.fillStyle = 'rgba(80,80,90,' + (0.35 * (1 - u)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(fx + Math.sin(t + i) * 8 + u * 10, gY - 34 - u * 70, 5 + u * 12, 0, 6.3); ctx.fill(); }
      }
      [[600, 4], [1960, 6], [2290, 7]].forEach(function (c, k) { var cx = c[0] + Math.sin(t * 0.35 + k * 2.1) * 36, dr = Math.cos(t * 0.35 + k * 2.1) > 0 ? 1 : -1; if (cx > x0 - 20 && cx < x1 + 20) gxMCrab(cx, gY + 13 + (k % 2) * 4, dr, Math.abs(Math.cos(t * 0.35 + k * 2.1)) > 0.25 ? 1 : 0); });
      gxEach(x0, x1, 700, 220, 100, function (x, q) { var gx2 = x + Math.sin(t * 0.3 + q * 2) * 160, gy2 = gY - 250 - ((q * 37) % 70) + Math.sin(t * 0.9 + q) * 14, wg = Math.sin(t * 6 + q) * 5; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(gx2 - 9, gy2 + wg); ctx.quadraticCurveTo(gx2 - 4, gy2 - 5 + wg * 0.4, gx2, gy2); ctx.quadraticCurveTo(gx2 + 4, gy2 - 5 + wg * 0.4, gx2 + 9, gy2 + wg); ctx.stroke(); });
      if (CAVE_X > x0 - 200 && CAVE_X < x1 + 200) gxGlow(CAVE_X + 20, gY - 70, 120, '170,120,255', 0.35 + 0.1 * Math.sin(t * 2));
    },
    front: function () { },
    afront: function (L, x0, x1, nv) {
      var tx = FLARE_X; if (tx < x0 - 60 || tx > x1 + 60) return;
      gxShadow(tx, gY + 4, 40, 0.8); gxPanel(tx - 24, gY - 30, 48, 30, '#8a5a2b', { r: 3, lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(40,20,0,.4)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(a, b + h * 0.5); ctx.lineTo(a + w, b + h * 0.5); ctx.stroke(); } });
      gxPanel(tx - 5, gY - 60, 10, 30, '#e5484d', { r: 3, lw: 1.8, vert: true }); gxPanel(tx - 5, gY - 48, 10, 5, '#ffffff', { lw: 1 });
      var fl = Math.abs(Math.sin(t * 9)) * 3; ctx.fillStyle = '#ffb020'; ctx.beginPath(); ctx.arc(tx, gY - 64 - fl, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); gxGlow(tx, gY - 64 - fl, 28, '255,176,32', 0.6);
      if (nearFlare()) gxText('Сигнальная ракета', tx, gY - 84, 13, '#fff', '#14233f');
    }
  };

var GXC_CRYS = [[260, '#7fe4ff'], [620, '#b48aff'], [980, '#7fe4ff'], [1260, '#ff8ad8'], [1420, '#7dff9a']];

var GXC_TUBES = [[1640, 0], [1830, 1], [2010, 2], [2200, 1], [2380, 0], [2540, 2]], GXC_TABLES = [1740, 2110, 2460];

var GXCSLOTS = [[260, 30], [620, 30], [980, 30], [1260, 30], [1420, 30], [1500, 40], [1640, 30], [1740, 50], [1830, 30], [2010, 30], [2110, 50], [2200, 30], [2380, 30], [2460, 50], [2540, 30], [2630, 40]];

GXS.cave = {
    par: function (L, x0, x1, nv) {
      var i; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = gxLG(0, 0, 0, H, '#171220', '#2d2438'); ctx.fillRect(0, 0, W, H);
      setCam(0.5); var a0 = camX * 0.5 - 40, a1 = a0 + vw + 80;
      for (i = Math.floor(a0 / 140) - 1; i * 140 < a1; i++) { var hh = 120 + ((i * 53) % 90); ctx.fillStyle = gxLG(0, 0, 0, hh * 1.4, '#2a2234', '#1c1626'); ctx.beginPath(); ctx.moveTo(i * 140 - 30, 0); ctx.quadraticCurveTo(i * 140 + 20, hh * 0.6, i * 140 + 40, hh * 1.4); ctx.quadraticCurveTo(i * 140 + 70, hh * 0.6, i * 140 + 110, 0); ctx.fill(); }
    },
    back: function (L, xa, xb, nv) {
      var i, e = Math.min(xb, LAB_X), f = function (x, hw) { return x > xa - hw && x < xb + hw; }, up = gxUp(), deep = gY + 24 + gxDown();
      if (xa < LAB_X) {
        ctx.fillStyle = gxLG(0, gY - up, 0, gY - 340, '#14101b', '#2a2234'); ctx.fillRect(xa, gY - up - 4, e - xa, up - 336);
        ctx.save(); ctx.translate(0, gY - 340); gxEach(xa, e, 90, 0, 30, function (x, k) { if (x > LAB_X - 20) return; var h = gxH(k * 7 + 2); gxCStalac(x + 20, 50 + h * 100, 22 + h * 12); if (k % 3 === 0) gxCStalac(x + 62, 22 + h * 40, 12); }); ctx.restore();
        ctx.fillStyle = gxLG(0, gY - 2, 0, deep, '#4a3f58', '#352c40', '#1c1626'); ctx.fillRect(xa, gY - 2, e - xa, deep - gY + 2);
        ctx.fillStyle = '#5a4d68'; ctx.fillRect(xa, gY - 2, e - xa, 5); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(xa, gY - 2, e - xa, 2); gxInk(2); ctx.beginPath(); ctx.moveTo(xa, gY - 2); ctx.lineTo(e, gY - 2); ctx.stroke();
        for (i = Math.floor(xa / 130) * 130; i < e; i += 130) { var h2 = gxH(i * 3 + 5); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(i + h2 * 50, gY + 12 + h2 * 22, 22 + h2 * 20, 3, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(160,130,210,.14)'; ctx.beginPath(); ctx.ellipse(i + 30 + h2 * 40, gY + 8 + h2 * 10, 10 + h2 * 8, 2, 0, 0, 6.3); ctx.fill(); }
        GXC_CRYS.forEach(function (q) { if (f(q[0], 60)) gxCCrystal(q[0], q[1], nv); });
        gxEach(xa, e, 210, 90, 30, function (x, k) { if (x > LAB_X - 50 || !GXC_CRYS.every(function (q) { return Math.abs(q[0] - x) > 60; })) return; gxCMush(x, k); });
      }
      gxLabRoom(xa, xb, nv);
    },
    anim: function (L, x0, x1, nv) {
      var i;
      GXC_CRYS.forEach(function (q, k) { if (q[0] > x0 - 120 && q[0] < x1 + 120) gxGlow(q[0], gY - 40, 110, q[1] === '#7fe4ff' ? '127,228,255' : (q[1] === '#b48aff' ? '180,138,255' : (q[1] === '#ff8ad8' ? '255,138,216' : '125,255,154')), 0.32 + 0.16 * Math.sin(t * 2 + k)); });
      gxEach(x0, Math.min(x1, LAB_X), 210, 90, 30, function (x, k) { if (x > LAB_X - 50 || !GXC_CRYS.every(function (q) { return Math.abs(q[0] - x) > 60; })) return; gxGlow(x + 6, gY - 12, 34, ['125,255,154', '255,138,216', '127,228,255'][k % 3], 0.4); });
      gxEach(x0, Math.min(x1, LAB_X), 260, 130, 20, function (x, k) { var u = (t * 0.5 + k * 0.37) % 1; ctx.fillStyle = 'rgba(160,210,255,' + (0.7 * (1 - u)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x + 30, gY - 300 + u * 296, 2, 0, 6.3); ctx.fill(); });
      GXC_TUBES.forEach(function (q) { var tx = q[0]; if (tx < x0 - 40 || tx > x1 + 40) return; for (var bb = 0; bb < 4; bb++) { var by2 = gY - 110 - ((t * 30 + bb * 22) % 80); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.arc(tx - 10 + bb * 7, by2, 3, 0, 6.3); ctx.fill(); } gxGlow(tx, gY - 160, 60, LAB_KINDS[q[1]].glow, 0.4); });
      if (x1 > LAB_X) for (i = Math.floor(Math.max(x0, LAB_X) / 300) * 300 + 150; i < x1 + 60; i += 300) if (i > LAB_X + 80) gxGlow(i, gY - 300, 160, '230,240,255', 0.22);
    },
    front: function (L, xa, xb, nv) {
      gxEach(xa, Math.min(xb, LAB_X - 60), 120, 150, 30, function (x, k) { var sx = x + (k * 37) % 60, h = 20 + (k * 13) % 26; if (sx > LAB_X - 60) return; ctx.beginPath(); ctx.moveTo(sx - 18, gY + 4); ctx.quadraticCurveTo(sx - 8, gY - h * 0.6, sx, gY - h); ctx.quadraticCurveTo(sx + 8, gY - h * 0.6, sx + 18, gY + 4); ctx.closePath(); ctx.fillStyle = gxLG(sx - 18, 0, sx + 18, 0, '#3a304a', '#251f2c', '#171220'); ctx.fill(); gxInk(1.6); ctx.stroke(); });
    },
    afront: function (L, x0, x1, nv) { drawCaveFront(x0, x1); }
  };

var GXW6SLOTS = [[150, 14], [450, 80], [700, 40], [900, 14], [1060, 55], [1210, 12], [1330, 52], [1410, 24], [1800, 340], [2190, 24], [2270, 52], [2390, 12], [2540, 40], [2700, 14], [2900, 40], [3150, 14], [3350, 40], [3500, 14]];

var GXH9SLOTS = [[300, 80], [520, 48], [660, 14], [860, 100], [1040, 36], [1500, 420], [1970, 36], [2120, 48], [2260, 14], [2420, 58], [2600, 30], [2750, 48], [2900, 20]];

GXS.wcity = {
    par: function () { parallaxSkyline(0.25, 20, 170, 170, '#b7c6dc', 7); parallaxSkyline(0.45, 8, 130, 170, '#94a8c6', 21); },
    back: function (L, xa, xb, nv) {
      var bx = -20, i = 0, rw, bh, lo = WH_X - 660, hi = WH_X + 660;
      gxGround(xa, xb, 'road', nv);
      while (bx < xb + 200 && bx < L.w) {
        rw = 100 + ((i * 53) % 90); bh = 250 + ((i * 97) % 210); if (bx + rw > L.w + 20) rw = L.w + 20 - bx;
        if (bx + rw > xa - 20 && bx < xb + 20 && rw > 4 && !(bx + rw > lo && bx < hi)) {
          var neon = (i % 4 === 1 && rw > 90) ? ['#ff4fa3', '#33e0ff', '#ffd23f'][i % 3] : null;
          gxBuilding(bx, rw, bh, { col: gxCityCols[(i + 2) % 5], i: i + 40, roof: i + 2, nv: nv, cw: 28, ch: 36, neon: neon, neonT: ['БЮРО', 'ВАШИНГТОН', 'КОФЕ-ПАУЗА'][i % 3], shop: (!neon && i % 3 === 2 && rw > 110) ? ['#3b7ad9', '#d94a3c', '#3fae6a'][i % 3] : null });
        }
        bx += rw; i++;
      }
      gxGround(xa, xb, 'road', nv);
      gxLawn(xa, xb, WH_X - 640, WH_X + 640); gxPaver(xa, xb, WH_X - 100, WH_X + 100);
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      if (f(WH_X, 350)) gxWhiteHouse(WH_X, nv);
      [1210, 2390].forEach(function (x) { if (f(x, 20)) gxFlagPole(x); });
      [1330, 2270].forEach(function (x) { if (f(x, 60)) gxFountain(x); });
      if (f(1410, 30)) gxFlowerBed(1410, 3); if (f(2190, 30)) gxFlowerBed(2190, 9);
      [150, 900, 2700, 3500].forEach(function (x) { if (f(x, 20)) gxLamp(x, nv, 150); });
      if (f(700, 50)) gxBench(700); if (f(2900, 50)) gxBench(2900);
      if (f(1060, 80)) gxOak(1060, 190, 5);
      if (f(2540, 50)) gxPlanter(2540, 2);
      if (f(3150, 20)) gxHydrant(3150); if (f(3350, 50)) gxBin(3350);
    },
    anim: function (L, x0, x1, nv) {
      var X = WH_X, w = save.mx.mh ? 'закрыт' : 'Меллстроя';
      if (X > x0 - 350 && X < x1 + 350) {
        gxFlagAnim(X, gY - 330, 40, 22, 2.4);
        gxPanel(X - 38, gY - 176, 76, 38, '#1f4aa8', { r: 6, lw: 2.2, vert: true }); ctx.fillStyle = '#ffd23f'; ctx.fillRect(X - 34, gY - 140, 68, 2);
        gxText('Кабинет', X, gY - 166, 11, '#ffffff', null); gxText(w, X, gY - 152, 11, '#ffe9a8', null);
      }
      [1210, 2390].forEach(function (x) { if (x > x0 - 60 && x < x1 + 60) gxFlagAnim(x, gY - 148, 30, 17, 2); });
      [1330, 2270].forEach(function (x) { if (x > x0 - 60 && x < x1 + 60) gxFountainAnim(x); });
      if (nv) { [150, 900, 2700, 3500].forEach(function (x) { if (x > x0 - 60 && x < x1 + 60) gxGlow(x, gY - 150, 90, '255,226,150', 0.22); }); }
    },
    front: function (L, xa, xb, nv) {
      var X = WH_X, f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxIronFence(X - 600, X - 96, xa, xb); gxIronFence(X + 96, X + 600, xa, xb);
      if (f(X - 96, 30)) gxGatePier(X - 96, nv); if (f(X + 96, 30)) gxGatePier(X + 96, nv);
    }
  };

GXS.hospital = {
    par: function () { parallaxSkyline(0.25, 20, 140, 150, '#c9d6e8', 5); parallaxSkyline(0.45, 8, 100, 150, '#a9bdd9', 17); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxGround(xa, xb, 'road', nv); gxLawn(xa, xb, 0, L.w); gxPaver(xa, xb, HOSP_X - 130, HOSP_X + 130);
      if (f(HOSP_X, 430)) gxHospital(HOSP_X, nv);
      if (f(520, 70)) gxBirch(520, 205, 23); if (f(2420, 80)) gxOak(2420, 190, 47);
      if (f(2120, 70)) gxPineT(2120, 175); if (f(2750, 70)) gxPineT(2750, 180);
      [660, 2260].forEach(function (x) { if (f(x, 20)) gxLamp(x, nv, 150); });
      if (f(1040, 50)) gxBench(1040); if (f(1970, 50)) gxBench(1970);
      if (f(2600, 40)) gxPlanter(2600, 4); if (f(2900, 20)) gxHydrant(2900);
      gxEach(xa, xb, 360, 140, 30, function (x, k) { if (x > L.w - 40 || gxH9Busy(x, 26)) return; if (k % 2) gxFlowers(x, 4, k); else gxBushHD(x, 0.55 + gxH(k) * 0.4, false); });
    },
    anim: function (L, x0, x1, nv) {
      var x = HOSP_X;
      if (x > x0 - 430 && x < x1 + 430) {
        var h = 270, px = x + 168, py = gY - h + 30 + 62;
        ctx.fillStyle = Math.floor(t * 2) % 2 ? '#ff4b4b' : '#7a2a2a'; ctx.beginPath(); ctx.arc(x + 150, gY - h - 30, 3.4, 0, 6.3); ctx.arc(x + 312, gY - h - 30, 3.4, 0, 6.3); ctx.fill();
        if (Math.floor(t * 2) % 2) { gxGlow(x + 150, gY - h - 30, 22, '255,75,75', 0.8); gxGlow(x + 312, gY - h - 30, 22, '255,75,75', 0.8); }
        if (ready(img.mell)) { ctx.save(); ctx.translate(px, py + 20); ctx.drawImage(img.mell, 0, 0, 224, 99, -40, -20, 80, 36); ctx.fillStyle = '#fff'; ctx.fillRect(-14, -14, 26, 7); ctx.restore(); }
        ctx.save(); ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 2); gxText('Z z z', px + 24 + Math.sin(t * 2) * 3, py - 20 - (t * 8) % 10, 11, '#7a8aa0', null); ctx.restore();
        gxText('палата Меллстроя', px, py + 66, 10, '#4c6a86', null);
      }
      drawHatch(x0, x1);
      if (!resc.on && 860 > x0 - 110 && 860 < x1 + 110) gxAmbulanceHD(860);
      if (nv) { [660, 2260].forEach(function (lx) { if (lx > x0 - 60 && lx < x1 + 60) gxGlow(lx, gY - 150, 90, '255,226,150', 0.22); }); }
    },
    front: function () { }
  };

var GXM10SLOTS = [[300, 80], [520, 14], [680, 50], [900, 14], [1060, 20], [1300, 210], [1560, 14], [1760, 50], [2000, 14], [2260, 20], [2500, 30], [2800, 14], [3010, 40], [3500, 240], [3860, 14], [4000, 50], [4130, 20]];

var GXMOSLOTS = [[130, 60], [330, 25], [560, 30], [820, 135], [1130, 30], [1600, 215], [1900, 25], [2080, 30]];

var GXSLSLOTS = [[80, 55], [260, 45], [520, 46], [760, 55], [1000, 46], [1240, 96], [1480, 46], [1740, 62], [1960, 46], [2150, 40], [2340, 46], [2600, 46], [2780, 46], [2870, 25]];

var GXMOGCOLS = ['#5a4a7a', '#4a3a6a', '#6a4a8a', '#3f3a68', '#7a4a7a'], GXMOGNEON = ['#ff4fa3', '#33e0ff', '#ffd23f', '#9bff4f'], GXMOGTXT = ['MOG', 'MOGGED', 'MOG ZONE', 'NO MOG'];

GXS.moggity = {
    par: function () {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var g = ctx.createLinearGradient(0, 0, 0, gScreen + 4); g.addColorStop(0, 'rgba(40,12,80,.34)'); g.addColorStop(0.7, 'rgba(210,60,150,.22)'); g.addColorStop(1, 'rgba(255,120,190,.3)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, gScreen + 4);
      parallaxSkyline(0.25, 20, 170, 190, '#5a4a7a', 9); parallaxSkyline(0.45, 8, 120, 190, '#43386a', 31);
    },
    back: function (L, xa, xb, nv) {
      var bx = -20, i = 0, rw, bh, f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxGround(xa, xb, 'road', nv);
      while (bx < xb + 200 && bx < L.w) {
        rw = 100 + ((i * 61) % 90); bh = 260 + ((i * 89) % 240); if (bx + rw > L.w + 20) rw = L.w + 20 - bx;
        if (bx + rw > xa - 20 && bx < xb + 20 && rw > 4 && !(bx + rw > GYM_X - 200 && bx < GYM_X + 200) && !(bx + rw > OFF_X - 240 && bx < OFF_X + 240)) {
          var neon = (i % 4 === 2 && rw > 90) ? GXMOGNEON[i % 3] : null;
          gxBuilding(bx, rw, bh, { col: GXMOGCOLS[i % 5], i: i + 70, roof: i + 3, nv: nv || (i % 2 === 0), cw: 28, ch: 36, neon: neon, neonT: ['МОГ-БАР', 'ЛУК-ШОП', 'ГРАФ ТАТУ'][i % 3] });
        }
        bx += rw; i++;
      }
      gxGround(xa, xb, 'road', nv);
      for (i = 0; i < 8; i++) { var sx = 200 + i * 520; if (f(sx, 90) && sx < L.w - 100 && !(sx > GYM_X - 200 && sx < GYM_X + 200) && !(sx > OFF_X - 240 && sx < OFF_X + 240)) gxPanel(sx - 70, gY - 232, 140, 60, '#0b0818', { r: 9, lw: 2.4 }); }
      if (f(GYM_X, 220)) gxGym(GYM_X, nv);
      if (f(OFF_X, 250)) gxOfficeTower(OFF_X, nv);
      [520, 900, 1560, 2000, 2800, 3860].forEach(function (x) { if (f(x, 20)) gxLamp(x, true, 150); });
      [680, 1760, 4000].forEach(function (x) { if (f(x, 60)) gxDumpster(x); });
      [1060, 2260, 4130].forEach(function (x) { if (f(x, 30)) gxBin(x); });
      if (f(2500, 40)) gxPylon(2500, 1); if (f(3010, 50)) { gxCrate(2990, 1.1, '#9a6a3c'); gxCrate(3030, 0.9, '#7a5230'); }
    },
    anim: function (L, x0, x1, nv) {
      var i;
      for (i = 0; i < 8; i++) {
        var sx = 200 + i * 520; if (sx < x0 - 120 || sx > x1 + 120 || sx > L.w - 100 || (sx > GYM_X - 200 && sx < GYM_X + 200) || (sx > OFF_X - 240 && sx < OFF_X + 240)) continue;
        var c = GXMOGNEON[i % 4]; ctx.save(); ctx.globalAlpha = 0.72 + 0.25 * Math.sin(t * 5 + i); ctx.shadowColor = c; ctx.shadowBlur = 12; gxBig(GXMOGTXT[i % 4], sx, gY - 202, 26, c, null); ctx.restore();
      }
      if (GYM_X > x0 - 220 && GYM_X < x1 + 220) { ctx.save(); ctx.shadowColor = '#ffd23f'; ctx.shadowBlur = 8; gxBig('КАЧАЛКА', GYM_X, gY - 145, 29, '#ffd23f', null); ctx.restore(); }
      if (OFF_X > x0 - 250 && OFF_X < x1 + 250) {
        var fl = Math.sin(t * 13) > 0.93 ? 0.55 : 1; ctx.save(); ctx.globalAlpha = fl; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 20; gxBig('ОФИС МОГГИТИ', OFF_X, gY - 230, 34, '#ff4a4a', null); ctx.restore();
        ctx.fillStyle = Math.floor(t * 2) % 2 ? '#ff4b4b' : '#7a2a2a'; ctx.beginPath(); ctx.arc(OFF_X + 150, gY - 562, 4, 0, 6.3); ctx.fill(); if (Math.floor(t * 2) % 2) gxGlow(OFF_X + 150, gY - 562, 30, '255,75,75', 0.9);
      }
      [520, 900, 1560, 2000, 2800, 3860].forEach(function (x) { if (x > x0 - 60 && x < x1 + 60) gxGlow(x, gY - 150, 100, '255,110,200', 0.22); });
      if (2500 > x0 - 60 && 2500 < x1 + 60) { ctx.save(); ctx.globalAlpha = 0.6 + 0.3 * Math.sin(t * 6); ctx.fillStyle = '#33e0ff'; for (i = 0; i < 6; i++) if ((Math.floor(t * 3) + i) % 3 === 0) ctx.fillRect(2488, gY - 214 + i * 34, 24, 5); ctx.restore(); }
    },
    front: function (L, xa, xb, nv) {
      var sx0 = GYM_X - MOG_SAFE, sx1 = GYM_X + MOG_SAFE;
      if (sx1 > xa && sx0 < xb) {
        ctx.strokeStyle = 'rgba(120,255,160,.7)'; ctx.lineWidth = 3.4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(sx0, gY + 9); ctx.lineTo(sx1, gY + 9); ctx.stroke(); ctx.setLineDash([]);
        gxText('безопасная зона', GYM_X, gY + 24, 12, '#9bffb4', 'rgba(10,40,24,.8)');
      }
    }
  };

GXS.moffice = {
    par: function () { gxNxPar('#1a1030'); },
    back: function (L, xa, xb, nv) {
      var i, f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxRoom(xa, xb, { wall: ['#241540', '#3a2563'], wain: '#1a1030', rail: '#6a4a9a', ceil: '#120a22', floor: ['#7a1f2e', '#3a0e18'], plank: 260, tex: function (a, b, cy) { ctx.fillStyle = 'rgba(255,255,255,.03)'; for (var q = Math.floor(a / 90) * 90; q < b; q += 90) ctx.fillRect(q, cy, 44, gY - cy); } });
      [330, 970, 1610].forEach(function (wx) { if (f(wx + 150, 180)) gxMoWindow(wx); });
      for (i = 0; i < 4; i++) { var nx = [200, 800, 1440, 2050][i]; if (f(nx, 80)) gxPanel(nx - 70, gY - 316, 140, 54, '#0b0818', { r: 9, lw: 2.4 }); }
      if (f(MO_EXIT, 80)) gxExit(MO_EXIT, false);
      if (f(330, 40)) gxPlant(330, 1); if (f(1900, 40)) gxPlant(1900, 1.05);
      [560, 1130, 2080].forEach(function (x, k) { if (f(x, 50)) { gxPanel(x - 24, gY - 40, 48, 40, '#3a2563', { r: 3, lw: 2.2 }); gxCup(x, gY - 40, 1.1, k === 1 ? '#d9d9e2' : '#f2c230'); } });
      ctx.fillStyle = 'rgba(214,178,74,.5)'; ctx.fillRect(xa, gY + 16, xb - xa, 2);
    },
    anim: function (L, x0, x1, nv) {
      var i, X = MO_DESK;
      gxEach(x0, x1, 330, 160, 160, function (x, k) {
        var fl = Math.sin(t * 15 + k * 3) > 0.96 ? 0.5 : 1; gxPanel(x - 36, gY - 434, 72, 8, '#241540', { r: 3, lw: 1.6 }); ctx.fillStyle = 'rgba(255,200,255,' + (0.85 * fl).toFixed(2) + ')'; ctx.fillRect(x - 32, gY - 427, 64, 4);
        ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,170,255,' + (0.06 * fl).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(x - 30, gY - 424); ctx.lineTo(x + 30, gY - 424); ctx.lineTo(x + 110, gY + 10); ctx.lineTo(x - 110, gY + 10); ctx.fill(); ctx.globalCompositeOperation = 'source-over';
      });
      for (i = 0; i < 4; i++) {
        var nx = [200, 800, 1440, 2050][i]; if (nx < x0 - 100 || nx > x1 + 100) continue; var c = GXMOGNEON[(i + 1) % 4]; ctx.save(); ctx.globalAlpha = 0.75 + 0.22 * Math.sin(t * 5 + i); ctx.shadowColor = c; ctx.shadowBlur = 16; gxBig(GXMOGTXT[i % 4], nx, gY - 288, 28, c, null); ctx.restore();
      }
      if (MO_EXIT > x0 - 100 && MO_EXIT < x1 + 100) gxExitLabel(MO_EXIT, 'ВЫХОД');
      drawK8Circle(x0, x1);
      if (X > x0 - 300 && X < x1 + 300) {
        var sitting = !(mb.on && mb.m === ofBoss) && save.mx.mgo !== 1;
        gxChair(X + 160);
        if (save.mx.mgo === 1) {
          ctx.fillStyle = '#1a1020'; ctx.fillRect(X + 90, gY - 6, 80, 6); ctx.fillStyle = '#2a2a38'; ctx.beginPath(); ctx.ellipse(X + 40, gY - 4, 32, 7, 0, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); gxPanel(X + 22, gY - 32, 36, 26, '#2a2a38', { r: 5, lw: 2 }); ctx.fillStyle = '#d6b24a'; ctx.fillRect(X + 22, gY - 14, 36, 5);
          gxText('шляпа Моггити', X + 40, gY - 44, 12, '#ffd23f', null);
        } else if (sitting && ready(img.mogg)) {
          var h2 = 185, w2 = h2 * img.mogg.naturalWidth / img.mogg.naturalHeight; ctx.save(); ctx.translate(X + 40, gY - 30 + Math.sin(t * 2) * 1.5); ctx.scale(-1, 1); ctx.drawImage(img.mogg, -w2 / 2, -h2, w2, h2); ctx.restore();
          gxText(save.mx.mgo === 2 ? 'ЧИКЕН МОГГИТИ (пощажён)' : 'ЧИКЕН МОГГИТИ', X + 40, gY - h2 - 46, 13, '#ff9a9a', null);
        }
        gxMoDesk(X, nv); gxMoDeskAnim(X);
      }
    }
  };

GXS.seclab = {
    par: function () { gxNxPar('#0d1a22'); },
    back: function (L, xa, xb, nv) {
      var i, f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxRoom(xa, xb, { wall: ['#2b5260', '#1b3a46'], wain: '#12262e', rail: '#26505e', ceil: '#0d1a22', floor: ['#2d5463', '#183440'], plank: 120, tex: function (a, b, cy) {
        ctx.fillStyle = 'rgba(255,255,255,.04)'; for (var q = Math.floor(a / 140) * 140; q < b; q += 140) { ctx.fillRect(q, cy, 3, gY - cy); ctx.fillStyle = 'rgba(120,230,220,.1)'; ctx.fillRect(q + 8, cy + 30, 120, 4); ctx.fillStyle = 'rgba(255,255,255,.04)'; }
        ctx.strokeStyle = '#3a6a7a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(a, cy + 50); ctx.lineTo(b, cy + 50); ctx.stroke(); ctx.strokeStyle = '#26505e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a, cy + 66); ctx.lineTo(b, cy + 66); ctx.stroke(); } });
      if (f(80, 70)) { gxPanel(30, gY - 210, 100, 210, '#5a6a78', { r: 8, lw: 3, vert: true }); gxPanel(42, gY - 198, 76, 198, '#3a4a58', { r: 5, lw: 2.2 }); ctx.fillStyle = '#ffd23f'; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(44 + i * 13, gY - 20); ctx.lineTo(54 + i * 13, gY - 20); ctx.lineTo(44 + i * 13 + 4, gY - 8); ctx.lineTo(34 + i * 13 + 4, gY - 8); ctx.fill(); } gxPanel(58, gY - 128, 44, 12, '#26323c', { lw: 1.6 }); ctx.fillStyle = '#ff5a5a'; ctx.beginPath(); ctx.arc(80, gY - 170, 6, 0, 6.3); ctx.fill(); }
      REC_X.forEach(function (rx) { if (f(rx, 60)) gxSlTerm(rx); });
      if (f(1240, 110)) gxSlTank(1240); if (f(760, 60)) gxSlRack(760);
      if (f(260, 50)) { gxCrate(240, 1.1, '#6a7a8a'); gxCrate(278, 0.85, '#8a6a4a'); }
      if (f(2150, 50)) { gxBarrel(2130, 1.1, '#ffd23f'); gxBarrel(2170, 1.0, '#4fc27a'); }
      if (f(2870, 30)) gxPlant(2870, 0.9);
      [640, 1400, 2480].forEach(function (x) { if (f(x, 40)) { gxPanel(x - 34, gY - 290, 68, 50, '#ffd23f', { r: 5, lw: 2.4 }); ctx.fillStyle = '#26323c'; ctx.beginPath(); ctx.moveTo(x, gY - 282); ctx.lineTo(x - 16, gY - 252); ctx.lineTo(x + 16, gY - 252); ctx.closePath(); ctx.fill(); gxText('!', x, gY - 262, 14, '#ffd23f', null); } });
    },
    anim: function (L, x0, x1, nv) {
      var i;
      for (i = Math.floor(x0 / 240) * 240 + 120; i < x1 + 120; i += 240) { if (i < 0 || i > L.w) continue; var fl = 0.62 + 0.25 * Math.sin(t * 6 + i); gxPanel(i - 44, gY - 424, 88, 8, '#26505e', { r: 3, lw: 1.6 }); ctx.fillStyle = 'rgba(180,255,240,' + fl.toFixed(2) + ')'; ctx.fillRect(i - 40, gY - 417, 80, 4);
        ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(160,255,235,' + (0.05 * fl).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(i - 36, gY - 414); ctx.lineTo(i + 36, gY - 414); ctx.lineTo(i + 120, gY + 10); ctx.lineTo(i - 120, gY + 10); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; }
      REC_X.forEach(function (rx, k) { if (rx > x0 - 80 && rx < x1 + 80) gxSlTerminalAnim(rx, k); });
      if (1240 > x0 - 110 && 1240 < x1 + 110) gxSlTankAnim(1240);
      if (760 > x0 - 60 && 760 < x1 + 60) gxSlRackAnim(760);
      if (save.mx.sf === 0) sciDraw(SCI_X, -1, 1, Math.sin(t * 2), 0);
    }
  };

var GXF15SLOTS = [[150, 80], [380, 90], [520, 45], [690, 120], [1000, 160], [1230, 45], [1330, 45], [1500, 100], [1650, 50], [1760, 40], [1930, 115], [2110, 60], [2330, 110], [2520, 45], [2850, 240], [3150, 45]];

var GXF17SLOTS = [[150, 80], [380, 90], [520, 45], [700, 60], [1000, 160], [1280, 90], [1430, 45], [1560, 60], [1740, 50], [2000, 100], [2220, 90], [2380, 45], [2500, 75], [2700, 60], [2900, 45], [3040, 50], [3150, 45]];

var GXT18SLOTS = [[170, 64], [330, 25], [480, 55], [760, 125], [1010, 55], [1280, 155], [1500, 55], [1740, 130], [2000, 55], [2110, 40], [2230, 64], [2360, 25]];

GXS.farm = {
    par: function () {
      gxHillsPar(0.14, 170, 36, '#c9dcec', '#a8c4de', 1.1, null);
      gxHillsPar(0.3, 110, 30, '#9ed286', '#6fb05c', 3.2, 'rgba(255,255,255,.1)');
      gxHillsPar(0.5, 60, 20, '#7fc46a', '#58a04c', 5.0, 'rgba(40,90,30,.12)');
    },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxGround(xa, xb, 'grass', nv);
      if (f(150, 90)) gxFarmGate(150); if (f(380, 100)) gxFarmSign(380);
      [520, 1330, 2520, 3150].forEach(function (x, k) { if (f(x, 90)) gxOak(x, 170 + (k % 3) * 25, 6 + k * 3); });
      if (f(690, 130)) gxFence(582, 6); if (f(2110, 80)) gxFence(2050, 3);
      if (f(1000, 190)) gxBarnHD(1000); if (f(1230, 60)) gxSiloHD(1230); if (f(2330, 80)) gxMillHD(2330);
      if (f(2850, 260)) gxPondHD(2850, 230);
      [[1850, 34], [1930, 30], [2010, 26]].forEach(function (b) { if (f(b[0], 40)) gxHayBale(b[0], b[1]); });
      if (f(1760, 60)) gxScarecrow(1760);
      if (f(FARM.mell, 110)) { gxPanel(FARM.mell - 84, gY - 26, 168, 26, '#8a6a4a', { r: 4, lw: 2.4, vert: true }); ctx.fillStyle = 'rgba(0,0,0,.2)'; for (var q = 1; q < 6; q++) ctx.fillRect(FARM.mell - 84 + q * 28, gY - 24, 2, 22); }
      gxEach(xa, xb, 170, 70, 30, function (x, k) { if (x > L.w - 30 || gxSlotBusy(GXF15SLOTS, x, 22)) return; if (k % 3 === 0) gxFlowers(x, 5, k); else if (k % 3 === 1) gxBushHD(x, 0.5 + gxH(k) * 0.35, false); });
    },
    anim: function (L, x0, x1, nv) {
      var i, mx = FARM.mell;
      if (2330 > x0 - 130 && 2330 < x1 + 130) gxMillAnim(2330);
      if (2850 > x0 - 260 && 2850 < x1 + 260) gxPondAnim(2850, 230);
      if (mx > x0 - 200 && mx < x1 + 200) {
        if (ready(img.mell)) ctx.drawImage(img.mell, 0, 0, 224, 99, mx - 95, gY - 108, 190, 84);
        sciDraw(FARM.sci, -1, 1, 0, 0); gxText('Меллстрой', mx, gY - 128, 13, '#ffffff', 'rgba(20,30,10,.8)'); gxText('Профессор', FARM.sci, gY - 176, 13, '#ffffff', 'rgba(20,30,10,.8)');
      }
      if (150 > x0 - 90 && 150 < x1 + 90) gxText('ВЫХОД', 150, gY - 112, 14, '#ffe9a8', 'rgba(60,30,10,.9)');
      for (i = 0; i < 4; i++) { var bx = (camX * 0.9 + ((t * (12 + i * 5) + i * 400) % (vw + 200))) - 100, by = gY - 340 + Math.sin(t * 2 + i) * 14 - i * 20; if (bx > x0 - 40 && bx < x1 + 40) { ctx.strokeStyle = '#2a3a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 7, by); ctx.quadraticCurveTo(bx - 3, by - 5 - Math.sin(t * 12 + i) * 4, bx, by); ctx.quadraticCurveTo(bx + 3, by - 5 - Math.sin(t * 12 + i) * 4, bx + 7, by); ctx.stroke(); } }
    }
  };

GXS.farmx = {
    par: function () {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, 'rgba(34,12,10,.88)'); sg.addColorStop(0.55, 'rgba(170,64,24,.6)'); sg.addColorStop(1, 'rgba(90,30,12,.5)'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
      gxHillsPar(0.14, 160, 30, '#4a342c', '#2e201a', 1.4, null); gxHillsPar(0.32, 100, 26, '#3a2a22', '#241914', 3.7, null); gxHillsPar(0.5, 56, 18, '#2c211c', '#1c1410', 5.3, null);
    },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; };
      gxGround(xa, xb, 'dirt', nv); ctx.fillStyle = 'rgba(30,12,6,.5)'; ctx.fillRect(xa, gY - 3, xb - xa, gxDown() + 40);
      if (f(150, 90)) { gxTube([[150, gY], [150, gY - 110]], 6, '#3a2a20'); gxPanel(88, gY - 128, 126, 34, '#4a3020', { r: 6, lw: 2.6, vert: true }); gxText('◀ Лаборатория', 150, gY - 111, 12, '#e8d0b0', null); }
      if (f(380, 100)) gxBrokenSign(380);
      [520, 1430, 2900, 3150].forEach(function (x, k) { if (f(x, 80)) gxDeadTree(x, 140 + (k % 3) * 24, 7 + k * 5); });
      if (f(1000, 190)) gxBarnRuin(1000); if (f(1230, 140)) gxSiloRuin(1230); if (f(2000, 120)) gxMillRuin(2000);
      [700, 1560, 1740, 2700, 3040].forEach(function (x, k) { if (f(x, 70)) gxRubbleHD(x, 0.9 + (k % 3) * 0.12); });
      if (f(MACH_X, 100)) gxTpBase(MACH_X);
      if (f(MACH_X - 280, 110)) { gxPanel(MACH_X - 280 - 84, gY - 26, 168, 26, '#4a3a30', { r: 4, lw: 2.4, vert: true }); }
    },
    anim: function (L, x0, x1, nv) {
      var i, mx = MACH_X - 280, big = c2n() < 4;
      gxEach(x0, x1, 120, 40, 20, function (x, k) { var p = 0.5 + 0.5 * Math.sin(t * 2.4 + k * 1.7); ctx.fillStyle = 'rgba(255,' + (90 + (k % 4) * 20) + ',30,' + (0.18 + 0.3 * p).toFixed(2) + ')'; ctx.fillRect(x - 12, gY + 3 + (k % 3) * 5, 26, 2); });
      if (MACH_X > x0 - 160 && MACH_X < x1 + 160) gxTpAnim(MACH_X);
      if (mx > x0 - 200 && mx < x1 + 200) {
        if (ready(img.mell)) ctx.drawImage(img.mell, 0, 0, 224, 99, mx - 95, gY - 108, 190, 84);
        sciDraw(mx + 160, 1, 1, 0, 0); gxText('Меллстрой', mx, gY - 128, 13, '#ffffff', 'rgba(20,6,2,.85)'); gxText('Профессор', mx + 160, gY - 176, 13, '#ffffff', 'rgba(20,6,2,.85)');
      }
      drawFlames(x0, x1, big ? 210 : 420, big ? 170 : 110, 7); drawSmoke(x0, x1, 400, 4);
    }
  };

GXS.termin = {
    par: function () { gxNxPar('#dfe6f0'); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i;
      gxRoom(xa, xb, { wall: ['#e9eff7', '#d3dce8'], wain: '#c3cddb', rail: '#9fb0c4', ceil: '#f4f7fb', floor: ['#b9c4d3', '#8995a8'], plank: 150, tex: function (a, b, cy) { ctx.fillStyle = 'rgba(255,255,255,.35)'; for (var q = Math.floor(a / 200) * 200; q < b; q += 200) ctx.fillRect(q + 40, cy + 6, 120, 5); } });
      [470, 1010, 1700, 2000].forEach(function (cx) { if (f(cx, 150)) gxTermWin(cx); });
      gxTermDoor(TIN.exit, 'ВЫХОД В ГОРОД', '#7d93a8'); gxTermDoor(TIN.field, 'ЛЁТНОЕ ПОЛЕ', '#3d7fc4');
      if (f(TIN.kassa, 150)) gxKassa(TIN.kassa); if (f(TIN.board, 180)) gxTermBoard(TIN.board); if (f(TIN.cafe, 150)) gxCafe(TIN.cafe);
      [480, 1010, 1500, 2000].forEach(function (x) { if (f(x, 60)) gxTermBench(x); });
      if (f(330, 40)) gxPlant(330, 1); if (f(2360, 40)) gxPlant(2360, 1.05); if (f(2110, 50)) gxTermLuggage(2110);
    },
    anim: function (L, x0, x1, nv) {
      var i, bx = TIN.board;
      [470, 1010, 1700, 2000].forEach(function (cx, k) { if (cx > x0 - 150 && cx < x1 + 150) gxTermWinAnim(cx, k); });
      gxEach(x0, x1, 200, 100, 100, function (x) { gxPanel(x - 56, gY - 434, 112, 8, '#d0d8e4', { r: 3, lw: 1.6 }); ctx.fillStyle = 'rgba(255,255,230,.8)'; ctx.fillRect(x - 50, gY - 427, 100, 4); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,255,235,.05)'; ctx.beginPath(); ctx.moveTo(x - 44, gY - 424); ctx.lineTo(x + 44, gY - 424); ctx.lineTo(x + 130, gY + 10); ctx.lineTo(x - 130, gY + 10); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; });
      if (bx > x0 - 180 && bx < x1 + 180) {
        ctx.textAlign = 'left'; ctx.font = '700 14px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffd23f'; ctx.fillText('РЕЙС   КУДА       ВЫХОД', bx - 134, gY - 248);
        ctx.fillStyle = Math.sin(t * 3) > 0 ? '#7dff9c' : '#3fa05c'; ctx.fillText('MV-1   МАЛЬДИВЫ   ПОЛЕ', bx - 134, gY - 214);
        ctx.fillStyle = '#9fb3d1'; ctx.fillText('HQ-7   СВОЙ БОРТ  АНГАР', bx - 134, gY - 180); ctx.fillText('SK-0   НЕБО       >1000 М', bx - 134, gY - 148);
        gxGlow(bx, gY - 196, 190, '120,170,255', 0.18);
      }
    }
  };

GXS.sky = {
    par: function (L, x0, x1) {
      var k, i, og = gY, cols = ['#3b8fe0', '#e5484d', '#7b8a52', '#f2b233'];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter'; var sx = W * 0.8, sy = Math.max(70, gScreen * 0.2);
      for (k = 0; k < 7; k++) { var ang = -1.2 + k * 0.5 + Math.sin(t * 0.2 + k) * 0.04; ctx.fillStyle = 'rgba(255,246,200,.045)'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(ang) * 900 - 30, sy + Math.sin(ang) * 900 + 40); ctx.lineTo(sx + Math.cos(ang) * 900 + 30, sy + Math.sin(ang) * 900 + 40); ctx.fill(); }
      ctx.globalCompositeOperation = 'source-over';
      for (k = 0; k < 7; k++) {
        var par = 0.22 + (k % 3) * 0.12, sp = 30 + k * 11, dr = k % 2 ? -1 : 1, span = vw + 900;
        setCam(par);
        var px = camX * par - 300 + ((((k * 1731 + t * sp * dr) % span) + span) % span), py = gY - 190 - ((k * 47) % 200);
        gY = 100000; drawAirliner(px, py, dr, 0.2 + 0.08 * (k % 3), cols[k % 4], 0, 120); gY = og;
        ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - dr * 22, py + 4); ctx.lineTo(px - dr * 160, py + 5); ctx.stroke();
      }
      setCam(0.6);
      var a0 = camX * 0.6 - 20, a1 = a0 + vw + 40;
      ctx.fillStyle = gxLG(0, gY + 60, 0, gY + 900, '#e2edfb', '#a9c8ec'); ctx.fillRect(a0, gY + 66, vw + 60, 900);
      for (i = Math.floor(a0 / 200) - 1; i * 200 < a1; i++) drawCloud(i * 200, gY + 50 + ((i * 53) % 24 + 24) % 24, 2.6);
      setCam(1);
      var xa = camX - 10, xb = camX + vw + 10;
      ctx.fillStyle = gxLG(0, gY + 40, 0, gY + 900, '#fbfdff', '#c6dcf5'); ctx.fillRect(xa, gY + 38, xb - xa, 900);
      for (i = Math.floor(xa / 170) - 1; i * 170 < xb; i++) drawCloud(i * 170 + ((i * 29) % 40), gY + 14 + (((i * 37) % 26) + 26) % 26, 2.2 + (((i * 7) % 5) + 5) % 5 * 0.15);
    },
    anim: function (L, x0, x1) {
      for (var i = 0; i < 5; i++) { var bx = x0 + ((t * (30 + i * 9) + i * 380) % (x1 - x0 + 200)) - 100, by = gY - 300 + Math.sin(t * 1.6 + i * 2) * 26 - i * 34; ctx.strokeStyle = 'rgba(40,60,80,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 8, by); ctx.quadraticCurveTo(bx - 3, by - 6 - Math.sin(t * 11 + i) * 4, bx, by); ctx.quadraticCurveTo(bx + 3, by - 6 - Math.sin(t * 11 + i) * 4, bx + 8, by); ctx.stroke(); }
    }
  };

var GXN19SLOTS = [[NL_DOOR, 70], [330, 38], [470, 52], [NL_NPC - 30, 262], [1240, 30], [NL_BOARD, 170], [1760, 50], [GUN_X, 112], [2330, 48], [2520, 45], [2750, 132], [2960, 35]];

var GXB20SLOTS = [[150, 42], [330, 60], [520, 50], [BL_FIRE[0], 52], [980, 55], [1200, 70], [BL_FIRE[1], 52], [1680, 70], [1900, 45], [BL_FIRE[2], 52], [2300, 55], [2480, 62], [LABX_X, 78], [2960, 40]];

var GXN19WIN = [520, 950, 1790, 2400], GXB20WIN = [230, 670, 1110, 1550, 1990, 2400];

GXS.nlab = {
    par: function () { gxNxPar('#cdd9e8'); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i;
      gxRoom(xa, xb, { wall: ['#eef4fb', '#d3dfee'], wain: '#bccadc', rail: '#8fa3bf', ceil: '#f6f9fc', floor: ['#cbd7e5', '#8d9db3'], plank: 150, tex: function (a, b, cy) {
        var q; ctx.fillStyle = 'rgba(120,150,190,.12)'; for (q = Math.floor(a / 110) * 110; q < b; q += 110) ctx.fillRect(q, cy, 3, gY - cy);
        ctx.fillStyle = '#4a86d0'; ctx.fillRect(a, gY - 150, b - a, 6); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(a, gY - 150, b - a, 2);
        ctx.strokeStyle = '#a9b8cc'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(a, cy + 34); ctx.lineTo(b, cy + 34); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a, cy + 31); ctx.lineTo(b, cy + 31); ctx.stroke();
      } });
      GXN19WIN.forEach(function (wx, k) { if (f(wx, 170)) gxLabWin(wx, k); });
      gxAirlock(NL_DOOR, 'ВЫХОД', '#7d93a8');
      if (f(330, 40)) gxPlant(330, 1); if (f(470, 56)) gxLabCabinet(470);
      if (f(NL_NPC, 200)) gxLabBench(NL_NPC);
      if (f(1240, 34)) gxLabTrolley(1240);
      if (f(NL_BOARD, 180)) gxLabBoard(NL_BOARD);
      if (f(1760, 50)) gxSlRack(1760);
      if (f(2330, 56)) gxCentrifuge(2330);
      if (f(2520, 50)) { gxCrate(2500, 1.15, '#7a8aa0'); gxCrate(2543, 0.9, '#a98a5a'); }
      if (f(2750, 140)) gxRetMach(2750);
      if (f(2960, 40)) gxPlant(2960, 1.05);
      gxEach(xa, xb, 220, 110, 60, function (x) { gxPanel(x - 58, gY - 438, 116, 10, '#d0d8e4', { r: 3, lw: 1.8 }); ctx.fillStyle = 'rgba(255,255,230,.9)'; ctx.fillRect(x - 52, gY - 430, 104, 4); });
    },
    anim: function (L, x0, x1, nv) {
      var X = NL_NPC, B = NL_BOARD, i;
      gxEach(x0, x1, 220, 110, 130, function (x) { gxGlow(x, gY - 420, 150, '235,246,255', 0.2); });
      if (X > x0 - 330 && X < x1 + 330) {
        gxLabBenchAnim(X);
        if ((save.mx.c2p | 0) === 3) { gxShadow(X - 230, gY + 3, 46, 0.7); mogAllyDraw(X - 230, -1, 170); }
        if (primeAlly()) { gxShadow(X - 110, gY + 3, 50, 0.7); primeDraw(X - 110, -1, 170, 1); gxGlow(X - 110, gY - 90, 120, '255,70,60', 0.22); }
        else if (save.mx.c2p !== 2) gxLabPodAnim(X);
        gxShadow(X + 190, gY + 3, 34, 0.7); sciDraw(X + 190, -1, 1, 0, 0);
      }
      if (B > x0 - 190 && B < x1 + 190) gxLabBoardAnim(B);
      if (GUN_X > x0 - 150 && GUN_X < x1 + 150) gxGunAnim(GUN_X);
      if (2750 > x0 - 160 && 2750 < x1 + 160) gxRetMachAnim(2750);
      if (1760 > x0 - 60 && 1760 < x1 + 60) gxSlRackAnim(1760);
      gxEach(x0, x1, 330, 90, 80, function (x, k) { if (Math.sin(t * 1.3 + k * 2.1) > 0.2) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(180,230,255,.05)'; ctx.fillRect(x - 6, gY - 300 - (t * 26 + k * 70) % 240, 12, 12); ctx.globalCompositeOperation = 'source-over'; } });
    }
  };

GXS.blab = {
    par: function () { gxNxPar('#1a0c0a'); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i, r;
      gxRoom(xa, xb, { wall: ['#3f2f2a', '#2c201d'], wain: '#261a17', rail: '#4e3e3a', ceil: '#150c0b', floor: ['#2c201d', '#150e0c'], plank: 130, tex: function (a, b, cy) {
        var q, rr; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 3;
        [450, 890, 1330, 1770, 2195, 2640].forEach(function (cx) { if (cx > a - 40 && cx < b + 40) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 22, cy + 70); ctx.lineTo(cx - 10, cy + 130); ctx.lineTo(cx + 26, cy + 200); ctx.lineTo(cx + 4, cy + 260); ctx.stroke(); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(cx + 22, cy + 70); ctx.lineTo(cx + 54, cy + 96); ctx.moveTo(cx - 10, cy + 130); ctx.lineTo(cx - 40, cy + 150); ctx.stroke(); ctx.lineWidth = 3; } });
        var sg = ctx.createLinearGradient(0, gY - 300, 0, gY); sg.addColorStop(0, 'rgba(10,4,2,0)'); sg.addColorStop(1, 'rgba(10,4,2,.5)'); ctx.fillStyle = sg; ctx.fillRect(a, gY - 300, b - a, 300);
        rr = rng(19); ctx.fillStyle = 'rgba(0,0,0,.2)'; for (q = 0; q < 26; q++) { var sx = Math.floor(a / 60) * 60 + q * 60 + rr() * 30; ctx.beginPath(); ctx.ellipse(sx, cy + 20 + rr() * 200, 20 + rr() * 26, 10 + rr() * 14, 0, 0, 6.3); ctx.fill(); }
      } });
      GXB20WIN.forEach(function (wx, k) { if (f(wx, 170)) gxBlabWin(wx, k); });
      if (f(600, 160)) gxPlate(600, gY - 150, 'Перепрыгивай огонь: он жжётся', '#ffe9c0', 'rgba(40,14,6,.78)');
      if (f(150, 50)) gxBlabPile(150, 0.7, 11); if (f(330, 70)) gxBlabPile(330, 1, 23);
      if (f(520, 56)) gxBlabConsole(520);
      for (i = 0; i < BL_FIRE.length; i++) if (f(BL_FIRE[i], 60)) gxBlabFireBase(BL_FIRE[i]);
      if (f(980, 60)) gxBlabTank(980); if (f(1200, 80)) gxBlabShelf(1200);
      if (f(1680, 90)) gxBlabBeam(1680); if (f(1900, 50)) gxBlabDebris(1900);
      if (f(2300, 60)) gxBlabCart(2300); if (f(2480, 70)) gxBlabPile(2480, 1.05, 37);
      if (f(2960, 46)) gxBlabPile(2960, 0.62, 59);
      if (f(LABX_X, 90)) gxBlabExit(LABX_X);
      gxEach(xa, xb, 330, 160, 60, function (x, k) { gxPanel(x - 50, gY - 436, 100, 14, '#2a1e1c', { r: 3, lw: 1.8 }); if (k % 2) { ctx.fillStyle = '#150c0b'; ctx.beginPath(); ctx.moveTo(x - 50, gY - 422); ctx.lineTo(x - 30, gY - 404); ctx.lineTo(x - 10, gY - 424); ctx.fill(); } });
    },
    anim: function (L, x0, x1, nv) {
      var i;
      GXB20WIN.forEach(function (wx, k) { if (wx > x0 - 170 && wx < x1 + 170) gxBlabWinAnim(wx, k); });
      for (i = 0; i < BL_FIRE.length; i++) if (BL_FIRE[i] > x0 - 130 && BL_FIRE[i] < x1 + 130) gxBlabFireAnim(BL_FIRE[i], i);
      if (520 > x0 - 70 && 520 < x1 + 70) gxBlabConsoleAnim(520);
      [290, 1610].forEach(function (cx, k) {
        if (cx < x0 - 60 || cx > x1 + 60) return;
        var sy = gY - 290 + Math.sin(t * 2 + k) * 14; gxTube([[cx, gY - 436], [cx - 18, gY - 360], [cx, sy]], 3, '#2a2a30');
        if (Math.sin(t * 9 + k * 3) > 0.9) { gxGlow(cx, sy, 54, '255,240,160', 0.85); }
      });
      if (LABX_X > x0 - 120 && LABX_X < x1 + 120) gxGlow(LABX_X, gY - 76, 170, '255,196,96', 0.34 + 0.1 * Math.sin(t * 5));
      drawSmoke(x0, x1, 300, 2);
      ctx.fillStyle = gxLG(0, gY - 440, 0, gY + 40, 'rgba(120,20,0,.22)', 'rgba(255,90,20,.1)'); ctx.fillRect(x0, gY - 440, x1 - x0, 500);
    }
  };

var GXC21SLOTS = [[50, 30], [NL_DOOR, 75], [305, 35], [CG_LEAD, 90], [660, 95], [CG_FX[0] + 40, 55], [960, 32], [CG_YT[0], 75], [1255, 40], [CG_FX[1] + 40, 55], [CG_SRV, 180], [1880, 38], [CG_FX[2] + 40, 55], [2110, 35], [CG_YT[1], 75], [2430, 90], [CG_FX[3] + 40, 55], [2710, 35], [CG_YT[2], 75], [3030, 92], [CG_FX[4] + 40, 55], [3300, 35], [3450, 90]];

var GXU22SLOTS = [[300, 60], [560, 50], [UNI_PORTAL, 90], [1160, 45], [1420, 45], [1980, 45], [2240, 45], [UNI_CORE, 95], [2900, 55], [3160, 55], [3340, 40]];

GXS.cgcamp = {
    par: function (L, x0, x1) {
      var k;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = gxLG(0, 0, 0, H, '#5fa8e6', '#c4e2f6', '#f0f7fc'); ctx.fillRect(0, 0, W, H);
      gxGlow(W * 0.8, H * 0.14, 240, '255,244,200', 0.5); ctx.fillStyle = '#fff6d0'; ctx.beginPath(); ctx.arc(W * 0.8, H * 0.14, 26, 0, 6.3); ctx.fill();
      for (k = 0; k < 5; k++) drawCloud(((k * 377 + t * (5 + k * 2)) % (W + 440)) - 220, 50 + (k % 3) * 54, 0.8 + (k % 2) * 0.3);
      gxHillsPar(0.14, 170, 36, '#c3d8ec', '#a5c1dc', 2.1, null);
      gxHillsPar(0.3, 110, 30, '#8fc67a', '#68a456', 4.4, 'rgba(255,255,255,.1)');
      gxHillsPar(0.5, 60, 20, '#78b862', '#549a48', 6.2, 'rgba(40,90,30,.12)');
    },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i;
      gxPalisade(xa, xb); gxGround(xa, xb, 'dirt', nv); gxBunting(xa, xb);
      if (f(NL_DOOR, 80)) gxCampPortal(NL_DOOR);
      if (f(50, 32)) gxBarrel(50, 1.0, '#6a4a2c');
      if (f(305, 40)) { gxCrate(292, 1.0, '#8a6a3e'); gxCrate(322, 0.8, '#a8803e'); }
      if (f(CG_LEAD, 140)) gxLeaderBase(CG_LEAD);
      if (f(660, 100)) gxTent(660, '#6a7d4a', 0.98);
      for (i = 0; i < 5; i++) if (f(CG_FX[i], 40)) gxCampFlagBase(CG_FX[i]);
      if (f(960, 40)) gxCampfire(960);
      for (i = 0; i < 3; i++) if (f(CG_YT[i], 80)) gxVlogBase(CG_YT[i], i);
      if (f(1255, 44)) { gxBarrel(1240, 1.0, '#6a4a2c'); gxBarrel(1274, 0.9, '#4a6a7a'); }
      if (f(CG_SRV, 190)) gxServerDesk(CG_SRV);
      if (f(2110, 40)) { gxBarrel(2096, 0.95, '#7a6a48'); gxBarrel(2128, 0.85, '#6a4a2c'); }
      if (f(2430, 96)) gxTent(2430, '#7a6a4a', 0.96);
      if (f(2710, 40)) { gxCrate(2696, 1.0, '#6a7a8a'); gxCrate(2726, 0.78, '#8a6a3e'); }
      if (f(3030, 96)) gxTent(3030, '#4a6a7a', 0.98);
      if (f(3300, 38)) { gxCrate(3290, 0.9, '#8a6a3e'); gxBarrel(3318, 0.9, '#6a4a2c'); }
      if (f(3450, 96)) gxTent(3450, '#6a7d4a', 0.96);
    },
    anim: function (L, x0, x1, nv) {
      var i, fl = rb(), k;
      if (NL_DOOR > x0 - 90 && NL_DOOR < x1 + 90) gxCampPortalAnim(NL_DOOR);
      for (i = 0; i < 5; i++) if (CG_FX[i] > x0 - 120 && CG_FX[i] < x1 + 120) gxCampFlagAnim(CG_FX[i], (fl >> i) & 1, 190);
      if (960 > x0 - 50 && 960 < x1 + 50) gxCampfireAnim(960);
      [1880, 3300].forEach(function (gx, q) { if (gx > x0 - 80 && gx < x1 + 80) { gxShadow(gx, gY + 3, 36, 0.6); drawGunnerAt(gx, gY, 0, false, false, 0.85, t * 1.5 + q * 2); } });
      if (CG_SRV > x0 - 200 && CG_SRV < x1 + 200) gxServerAnim(CG_SRV, fl);
      for (i = 0; i < 3; i++) if (CG_YT[i] > x0 - 160 && CG_YT[i] < x1 + 160) gxVlogAnim(CG_YT[i], i, (fl >> (10 + i)) & 1);
      var Lx = CG_LEAD;
      if (Lx > x0 - 200 && Lx < x1 + 200) {
        gxShadow(Lx, gY + 3, 56, 0.7);
        if (mogAlive() && ready(img.mogg)) wSpr(img.mogg, Lx, 170, 1); else drawGunnerAt(Lx, gY, 0, false, false, 1.5, 0);
        gxPlate(Lx, gY - 206, c2Leader(), '#ffd23f', 'rgba(22,14,40,.7)');
      }
      gxEach(x0, x1, 260, 70, 60, function (x, q) { var u = (t * 0.06 + q * 0.37) % 1; ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 9 + q) * 30, gY - 40 - u * 200, 1.6, 0, 6.3); ctx.fill(); });
    }
  };

var GXUP = [
    { ground: ['#2a6a3a', '#12301c'], lip: '#6aff9a', mist: '60,255,140' },
    { ground: ['#a4a8ae', '#6a6e74'], lip: '#d8dce2', mist: '210,216,224' },
    { ground: ['#4a2626', '#1e0e10'], lip: '#ff7a4a', mist: '255,110,70' },
    { ground: ['#4a2c66', '#1e1030'], lip: '#ff9af2', mist: '230,140,255' },
    { ground: ['#1e2c52', '#0a1226'], lip: '#8fb4ff', mist: '140,190,255' },
    { ground: ['#4a2a2e', '#1a0e12'], lip: '#c79bff', mist: '190,130,255' },
    { ground: ['#3a1018', '#12040a'], lip: '#ff5a5a', mist: '255,70,60' },
    { ground: ['#4a1a2c', '#16060e'], lip: '#ff96ea', mist: '255,150,240' },
    { ground: ['#0e3a3a', '#05181c'], lip: '#6affdc', mist: '120,255,220' },
    { ground: ['#f6e6b0', '#cbb078'], lip: '#fff6d0', mist: '255,236,170' }
  ];

GXS.uni = {
    par: function (L, x0, x1) { gxUniSky(uniV, x0, x1); },
    anim: function (L, x0, x1, nv) {
      var k = uniV, U = UV[k], G = GXUP[k], bomb = p5.on && p5.uni && p5.bomb && p5.bomb.planted, i, P0 = UNI_PORTAL, C = UNI_CORE;
      gxLayer('u22v' + k, x0, x1, gxUp(), gxDown(), function (xa, xb) { gxUniBack(k, xa, xb); }, 0);
      if (k === 0) gxEach(x0, x1, 110, 20, 20, function (x, q) { var hh = 18 + (q * 7) % 34; ctx.fillStyle = 'rgba(80,255,120,.4)'; ctx.beginPath(); ctx.arc(x + Math.sin(t + q) * 6, gY - hh - ((t * 12 + q * 30) % 80), 4 + (q % 3), 0, 6.3); ctx.fill(); });
      else if (k === 1) { ctx.fillStyle = 'rgba(210,216,224,.1)'; for (i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(((i * 450 + t * 18) % (LOCS[UNI].w + 600)) - 200, gY - 60 - (i % 3) * 40, 260, 30, 0, 0, 6.3); ctx.fill(); } }
      else if (k === 2 || k === 6) gxEach(x0, x1, 130, 20, 20, function (x, q) { var u = (t * 0.5 + q * 0.31) % 1; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,' + (110 + (q % 3) * 30) + ',50,' + (0.5 * (1 - u)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 7 + q) * 20, gY - u * 170, 2.4, 0, 6.3); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; });
      else if (k === 3 || k === 7) gxEach(x0, x1, 190, 80, 60, function (x, q) { gxGlow(x, gY - 160, 90, k === 3 ? '255,154,242' : '255,150,234', 0.1 + 0.06 * Math.sin(t * 3 + q)); });
      else if (k === 4 || k === 5) gxEach(x0, x1, 150, 40, 30, function (x, q) { var u = (t * 0.2 + q * 0.23) % 1; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(' + G.mist + ',' + (0.45 * Math.sin(u * 3.14)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 5 + q) * 24, gY - 20 - u * 190, 2.2, 0, 6.3); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; });
      else if (k === 8) gxEach(x0, x1, 170, 60, 40, function (x, q) { var u = (t * 0.3 + q * 0.19) % 1; ctx.fillStyle = 'rgba(200,255,245,' + (0.5 * (1 - u)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 9 + q) * 8, gY - u * 230, 2.5 + (q % 3), 0, 6.3); ctx.fill(); });
      if (k === 8) drawK8Sky(x0, x1);
      if (k === 9) drawHvRays(x0, x1);
      if (P0 > x0 - 200 && P0 < x1 + 200) {
        var pl = 0.5 + 0.5 * Math.sin(t * 3);
        gxGlow(P0, gY - 112, 150 + 8 * pl, '120,230,255', 0.46);
        ctx.save(); ctx.beginPath(); ctx.ellipse(P0, gY - 112, 50, 96, 0, 0, 6.3); ctx.clip();
        var pg = ctx.createRadialGradient(P0, gY - 112, 6, P0, gY - 112, 100); pg.addColorStop(0, 'rgba(230,252,255,.8)'); pg.addColorStop(1, 'rgba(70,170,255,.35)'); ctx.fillStyle = pg; ctx.fillRect(P0 - 52, gY - 210, 104, 200);
        ctx.lineWidth = 3; for (i = 0; i < 4; i++) { ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 - i * 0.1).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(P0, gY - 112, 20 + i * 20, t * (1.4 - i * 0.25) + i, t * (1.4 - i * 0.25) + i + 2.1); ctx.stroke(); }
        ctx.restore();
      }
      if (C > x0 - 220 && C < x1 + 220) {
        var cp = bomb ? 0.5 + 0.5 * Math.sin(t * 14) : 0.5 + 0.2 * Math.sin(t * 2), cy = gY - 118 + (bomb ? 0 : Math.sin(t * 1.6) * 5);
        gxGlow(C, cy, 150 + 40 * cp, bomb ? '255,60,40' : U.col, 0.55);
        ctx.beginPath(); ctx.moveTo(C, cy - 94); ctx.lineTo(C + 36, cy); ctx.lineTo(C, cy + 80); ctx.lineTo(C - 36, cy); ctx.closePath();
        ctx.fillStyle = bomb ? gxLG(C - 36, 0, C + 36, 0, '#ff9a6a', '#ff5a3a', '#b02a1a') : gxLG(C - 36, 0, C + 36, 0, 'rgba(255,255,255,.95)', 'rgba(' + U.col + ',.92)', 'rgba(' + U.col + ',.55)'); ctx.fill(); gxInk(2.8); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(C, cy - 84); ctx.lineTo(C + 12, cy); ctx.lineTo(C, cy + 60); ctx.closePath(); ctx.fill();
        gxText(bomb ? 'ВЗРЫВ ЧЕРЕЗ ' + Math.max(0, Math.ceil(p5.bomb.T - p5.bomb.t)) : 'ЯДРО ВСЕЛЕННОЙ', C, gY - 238, 13, '#ffffff', 'rgba(10,20,44,.85)');
      }
      if (bomb) {
        ctx.fillStyle = 'rgba(255,40,20,' + (0.08 + 0.08 * Math.sin(t * 14)).toFixed(2) + ')'; ctx.fillRect(x0, gY - 700, x1 - x0, 900);
        ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
        for (i = 0; i < 6; i++) { var cxk = x0 + ((i * 313 + 80) % Math.max(200, x1 - x0)); ctx.beginPath(); ctx.moveTo(cxk, gY); ctx.lineTo(cxk + 18 * Math.sin(t * 30 + i), gY - 90); ctx.lineTo(cxk - 14 * Math.cos(t * 26 + i), gY - 180); ctx.lineTo(cxk + 10, gY - 270); ctx.stroke(); }
      }
    }
  };

var GXCH24SLOTS = [[CHI_OUT, 70], [330, 32], [440, 30], [570, 32], [CHI_CAN, 85], [930, 52], [1070, 52], [1210, 52], [CHI_PR + 10, 75], [1485, 32], [1750, 205], [2050, 32], [HV_ST, 70], [2430, 36], [2520, 32]];

var GXHV25SLOTS = [[160, 100], [400, 40], [650, 40], [HV_J[0], 110], [1200, 40], [HV_J[1], 110], [1800, 40], [HV_J[2], 110], [2400, 40], [HV_GATE, 140], [2960, 40]];

var GXCHWIN = [450, 690, 960, 1230, 1575, 1925, 2290];

var GXCHCHAN = [825, 1100, 1400, 2100];

GXS.church = {
    par: function () { gxNxPar('#2a2036'); },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i, q, w = xb - xa, up = gxUp(), dn = gxDown(), top = gY - up - 6, rr;
      ctx.fillStyle = gxLG(0, top, 0, gY, '#7a6c60', '#54483f'); ctx.fillRect(xa, top, w, gY - top + 2);
      ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.6; rr = 0;
      for (q = gY - 130; q > top; q -= 42) { ctx.beginPath(); ctx.moveTo(xa, q); ctx.lineTo(xb, q); ctx.stroke(); var off = (rr++ % 2) * 40; for (i = Math.floor(xa / 80) * 80 + off; i < xb; i += 80) { ctx.beginPath(); ctx.moveTo(i, q); ctx.lineTo(i, q - 42); ctx.stroke(); } }
      ctx.fillStyle = gxLG(0, gY - 540, 0, gY - 440, '#241a14', 'rgba(36,26,20,0)'); ctx.fillRect(xa, gY - 540, w, 100);
      ctx.fillStyle = '#34281f'; ctx.fillRect(xa, gY - 540, w, 40); for (i = Math.floor(xa / 110) * 110; i < xb; i += 110) { ctx.fillStyle = '#4a382a'; ctx.fillRect(i, gY - 540, 12, 46); gxInk(1.4); ctx.strokeRect(i, gY - 540, 12, 46); }
      ctx.fillStyle = gxLG(0, gY - 500, 0, gY - 452, '#5a4a3c', '#3d3029'); ctx.fillRect(xa, gY - 500, w, 48); gxInk(2); ctx.beginPath(); ctx.moveTo(xa, gY - 452); ctx.lineTo(xb, gY - 452); ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,.28)'; for (i = Math.floor(xa / 44) * 44; i < xb; i += 44) { ctx.beginPath(); ctx.moveTo(i + 4, gY - 452); ctx.lineTo(i + 4, gY - 478); ctx.quadraticCurveTo(i + 22, gY - 498, i + 40, gY - 478); ctx.lineTo(i + 40, gY - 452); ctx.fill(); }
      ctx.fillStyle = gxLG(0, gY - 124, 0, gY, '#5a4030', '#3a2a1e'); ctx.fillRect(xa, gY - 124, w, 124);
      ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.8; for (i = Math.floor(xa / 78) * 78; i < xb + 78; i += 78) { gxRR(i + 8, gY - 106, 62, 84, 4); ctx.stroke(); }
      ctx.fillStyle = '#6a4a2c'; ctx.fillRect(xa, gY - 132, w, 10); gxInk(1.8); ctx.strokeRect(xa - 2, gY - 132, w + 4, 10); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(xa, gY - 132, w, 2);
      // пол: плитка и ковровая дорожка
      for (q = 0; q < 6; q++) {
        var ry = [-2, 20, 60, 120, 200, 300][q], rh = [22, 40, 60, 80, 100, 140][q];
        if (ry > dn) break;
        for (i = Math.floor(xa / 90) * 90; i < xb + 90; i += 90) { ctx.fillStyle = (((i / 90) | 0) + q) % 2 ? '#6e625a' : '#8a7d72'; ctx.fillRect(i, gY + ry, 90, rh); }
      }
      ctx.fillStyle = gxLG(0, gY - 2, 0, gY + dn, 'rgba(10,4,0,.34)', 'rgba(10,4,0,.5)'); ctx.fillRect(xa, gY - 2, w, dn + 4);
      var ca = Math.max(xa, 120), cb = Math.min(xb, L.w - 240);
      if (cb > ca) { ctx.fillStyle = gxLG(0, gY - 2, 0, gY + 16, '#b82a38', '#7a1620'); ctx.fillRect(ca, gY - 2, cb - ca, 18); ctx.fillStyle = '#e8c25a'; ctx.fillRect(ca, gY - 2, cb - ca, 2.5); ctx.fillRect(ca, gY + 13, cb - ca, 2.5); ctx.fillStyle = 'rgba(232,194,90,.5)'; for (i = Math.floor(ca / 36) * 36; i < cb; i += 36) ctx.fillRect(i + 12, gY + 5, 10, 3); }
      gxInk(2.4); ctx.beginPath(); ctx.moveTo(xa, gY - 1); ctx.lineTo(xb, gY - 1); ctx.stroke();
      GXCHWIN.forEach(function (wx, k) { if (f(wx, 60)) gxStained(wx, gY - 430, 76, 200, k + 1); });
      if (f(1750, 100)) gxRose(1750, gY - 368, 66);
      GXCHCHAN.forEach(function (cx) { if (f(cx, 60)) gxChandelier(cx); });
      if (f(CHI_OUT, 80)) gxChDoor(CHI_OUT);
      [330, 570, 1485, 2050, 2520].forEach(function (cx) { if (f(cx, 40)) gxChColumn(cx); });
      if (f(440, 30)) gxChFont(440);
      if (f(CHI_CAN, 90)) gxChCandleStand(CHI_CAN);
      [930, 1070, 1210].forEach(function (px) { if (f(px, 60)) gxChPew(px); });
      if (f(1750, 215)) gxChAltar(1750);
      if (f(2430, 40)) gxChStatue(2430);
    },
    anim: function (L, x0, x1, nv) {
      var i;
      GXCHWIN.forEach(function (wx, k) { if (wx > x0 - 90 && wx < x1 + 90) { var fl = 0.12 + 0.04 * Math.sin(t * 1.3 + wx); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,130,' + fl.toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(wx - 32, gY - 220); ctx.lineTo(wx + 32, gY - 220); ctx.lineTo(wx + 120, gY + 8); ctx.lineTo(wx + 20, gY + 8); ctx.closePath(); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; gxGlow(wx, gY - 330, 90, '255,210,150', 0.2); } });
      if (1750 > x0 - 220 && 1750 < x1 + 220) gxChAltarAnim(1750);
      if (CHI_CAN > x0 - 100 && CHI_CAN < x1 + 100) gxChCandlesAnim(CHI_CAN);
      GXCHCHAN.forEach(function (cx) { if (cx > x0 - 80 && cx < x1 + 80) gxChChandAnim(cx); });
      if ((save.mx.hv | 0) >= 1 && HV_ST > x0 - 200 && HV_ST < x1 + 200) gxHvStairsAnim(HV_ST);
      if (CHI_PR > x0 - 150 && CHI_PR < x1 + 150) { gxShadow(CHI_PR, gY + 3, 52, 0.7); bgNpc('priest', CHI_PR, 250, false, 1.3); }
      gxEach(x0, x1, 210, 60, 60, function (x, k) { var u = (t * 0.05 + k * 0.29) % 1; ctx.fillStyle = 'rgba(255,230,180,.35)'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 8 + k) * 30, gY - 30 - u * 340, 1.5, 0, 6.3); ctx.fill(); });
    }
  };

GXS.heaven = {
    par: function (L, x0, x1) {
      var i, k;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = gxLG(0, 0, 0, H, '#fff6d8', '#ffe2a2', '#f4b860'); ctx.fillRect(0, 0, W, H);
      gxGlow(W * 0.5, H * 0.16, 460, '255,244,200', 0.55);
      ctx.globalCompositeOperation = 'lighter'; for (i = 0; i < 9; i++) { var an = -1.4 + i * 0.35 + 0.05 * Math.sin(t * 0.7 + i); ctx.fillStyle = 'rgba(255,240,180,.06)'; ctx.beginPath(); ctx.moveTo(W * 0.5, H * 0.08); ctx.lineTo(W * 0.5 + Math.sin(an - 0.1) * 1400, H * 0.08 + Math.cos(an - 0.1) * 1400); ctx.lineTo(W * 0.5 + Math.sin(an + 0.1) * 1400, H * 0.08 + Math.cos(an + 0.1) * 1400); ctx.closePath(); ctx.fill(); } ctx.globalCompositeOperation = 'source-over';
      for (k = 0; k < 7; k++) drawCloud(((k * 313 + t * (3 + k) + camX * 0.05) % (W + 480)) - 240, 40 + (k % 3) * 52, 0.9 + (k % 3) * 0.3);
      setCam(0.18); gxFloatIsle(camX * 0.18 + 220, gY - 330, 1.0); gxFloatIsle(camX * 0.18 + 940, gY - 410, 0.7);
      setCam(1);
    },
    back: function (L, xa, xb, nv) {
      var f = function (x, hw) { return x > xa - hw && x < xb + hw; }, i, w = xb - xa, deep = gY + 40 + gxDown(), cols = ['106,168,255', '255,122,122', '125,255,156'];
      ctx.fillStyle = gxLG(0, gY - 3, 0, gY + 14, '#fffaf0', '#f2e4c0'); ctx.fillRect(xa, gY - 3, w, 18); ctx.fillStyle = '#e8c25a'; ctx.fillRect(xa, gY - 3, w, 3); gxInk(2.4); ctx.beginPath(); ctx.moveTo(xa, gY - 3); ctx.lineTo(xb, gY - 3); ctx.stroke();
      ctx.strokeStyle = 'rgba(190,170,120,.35)'; ctx.lineWidth = 1.6; for (i = Math.floor(xa / 100) * 100; i < xb + 100; i += 100) { ctx.beginPath(); ctx.moveTo(i, gY - 2); ctx.lineTo(i - 14, gY + 14); ctx.stroke(); }
      ctx.fillStyle = gxLG(0, gY + 14, 0, deep, '#fff3d6', '#f4dba0'); ctx.fillRect(xa, gY + 14, w, deep - gY - 14);
      for (i = Math.floor(xa / 120) * 120; i < xb + 120; i += 120) { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.ellipse(i + 60, gY + 24 + (i % 3) * 5, 92, 22, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(244,200,120,.4)'; ctx.beginPath(); ctx.ellipse(i + 60, gY + 32 + (i % 3) * 5, 80, 12, 0, 0, 6.3); ctx.fill(); }
      if (f(160, 110)) gxHvDown(160);
      [400, 1200, 1800, 2400, 2960].forEach(function (cx) { if (f(cx, 44)) gxHvColumn(cx); });
      if (f(650, 44)) gxAngel(650);
      for (i = 0; i < 3; i++) if (f(HV_J[i], 120)) gxHvDais(HV_J[i], cols[i]);
      if (f(HV_GATE, 160)) gxHvGate(HV_GATE);
    },
    anim: function (L, x0, x1, nv) {
      var i, cols = ['106,168,255', '255,122,122', '125,255,156'], nm = ['СУДЬЯ СЧЁТА', 'СУДЬЯ ЗАПИСИ', 'СУДЬЯ МИЛОСТИ'];
      if (160 > x0 - 120 && 160 < x1 + 120) gxGlow(160, gY - 110, 130 + 8 * Math.sin(t * 2), '255,240,190', 0.42);
      for (i = 0; i < 3; i++) if (HV_J[i] > x0 - 200 && HV_J[i] < x1 + 200) { gxJudgeHD(HV_J[i], cols[i], i * 1.7); gxPlate(HV_J[i], gY - 300, nm[i] + (((save.mx.hvj | 0) >> i) & 1 ? ' ✓' : ''), '#6a5a3a', 'rgba(255,250,235,.85)'); }
      if (HV_GATE > x0 - 270 && HV_GATE < x1 + 270) gxHvGateAnim(HV_GATE);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; gxEach(x0, x1, 200, 40, 160, function (x, k) { ctx.beginPath(); ctx.ellipse(x + ((t * (10 + k % 3 * 4)) % 90), gY + 28 + (k % 3) * 8, 46, 7, 0, 0, 6.3); ctx.fill(); });
      gxEach(x0, x1, 170, 60, 40, function (x, k) { var u = (t * 0.1 + k * 0.23) % 1; ctx.fillStyle = 'rgba(255,255,255,' + (0.7 * Math.sin(u * 3.14)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x + Math.sin(u * 6 + k) * 40, gY - 20 - u * 320, 2, 0, 6.3); ctx.fill(); });
    }
  };

(function () {
    var O = 'var(--ol)', B = 'body.gx ';
    var css = [
      B + '{ --ol:#1a2547; --cr:#fff8ea; --cr2:#ffeccf; --panel:#fff8ea; --line:#1a2547; --ink:#1a2547; --muted:#6a6f8c; --blue:#2f6fe0; --red:#ff5a4a; --gold:#ffc93a; --up:#1fa955; --down:#e0303b; }',
      '@media (prefers-color-scheme: dark) { html:not([data-theme="light"]) body.gx { --ol:#0b1124; --cr:#27345a; --cr2:#1e2a4a; --panel:#27345a; --line:#0b1124; --ink:#f4f1ff; --muted:#a9b3d6; --blue:#7aa2ff; --up:#4fd98b; --down:#ff7d85; } }',
      'html[data-theme="dark"] body.gx { --ol:#0b1124; --cr:#27345a; --cr2:#1e2a4a; --panel:#27345a; --line:#0b1124; --ink:#f4f1ff; --muted:#a9b3d6; --blue:#7aa2ff; --up:#4fd98b; --down:#ff7d85; }',
      // ---- HUD ----
      B + '.chip { background: linear-gradient(#fffdf6, var(--cr2)); border: 3px solid ' + O + '; box-shadow: 0 3px 0 ' + O + ', inset 0 2px 0 rgba(255,255,255,.85); color: var(--ink); }',
      B + '.chip .coin { filter: drop-shadow(0 0 3px rgba(255,200,40,.7)); }',
      B + '.rate { background: linear-gradient(#fffdf6, var(--cr2)); border: 3px solid ' + O + '; box-shadow: 0 2px 0 ' + O + '; color: var(--ink); }',
      B + '.pill { background: linear-gradient(#ff866e, #e8392a); border: 3px solid ' + O + '; box-shadow: 0 3px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); border-radius: 18px; }',
      B + '.toast { background: linear-gradient(#fffdf4, var(--cr2)); color: var(--ink); border: 3px solid ' + O + '; border-radius: 18px; box-shadow: 0 4px 0 ' + O + '; font-weight: 600; }',
      B + '.evchip { border: 3px solid ' + O + '; box-shadow: 0 3px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); }',
      B + '.perfchip { border: 2px solid ' + O + '; background: rgba(20,30,60,.82); }',
      B + '.airbtn { background: linear-gradient(#ff866e, #e8392a); border: 3px solid ' + O + '; box-shadow: 0 4px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); }',
      B + '.airbtn:active { transform: translateY(3px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.airbtn.no { background: linear-gradient(#6a7391, #474f6c); box-shadow: 0 4px 0 ' + O + '; }',
      B + '.gear { background: radial-gradient(circle at 36% 28%, #ffffff, var(--cr2) 72%); border: 3px solid ' + O + '; box-shadow: 0 3px 0 ' + O + ', inset 0 2px 0 rgba(255,255,255,.8); }',
      B + '.gear:active { transform: translateY(2px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.gear svg { width: 28px; height: 28px; display: block; }',
      B + '.apbtn.on { background: radial-gradient(circle at 36% 28%, #b8ffd2, #3ddc84 76%); }',
      // ---- кнопки управления ----
      B + '.btn { background: radial-gradient(circle at 34% 24%, #8fbaff, #2f6fe0 58%, #1b45a6); border: 4px solid ' + O + '; box-shadow: 0 6px 0 ' + O + ', inset 0 3px 0 rgba(255,255,255,.5); color: #fff; text-shadow: 0 2px 0 rgba(0,0,0,.45); backdrop-filter: none; -webkit-backdrop-filter: none; transition: transform .06s, box-shadow .06s; }',
      B + '.btn svg { width: 40px; height: 40px; display: block; }',
      B + '#bJ { background: radial-gradient(circle at 34% 24%, #b4f59a, #3fb43a 58%, #1f7a2a); }',
      B + '.btn.on, ' + B + '.btn:active { transform: translateY(4px); box-shadow: 0 2px 0 ' + O + ', inset 0 3px 0 rgba(255,255,255,.4); filter: brightness(1.08); }',
      B + '.btn.sell { background: linear-gradient(#ffa05a, #ee4a2a); border-radius: 31px; }',
      B + '.btn.sell:active, ' + B + '.btn.sell.on { background: linear-gradient(#ffb878, #f55c3a); }',
      // ---- окна ----
      B + '.overlay { background: radial-gradient(ellipse at 50% 35%, rgba(52,40,110,.55), rgba(8,12,30,.8)); }',
      B + '.sheet { background-color: var(--cr); background-image: radial-gradient(rgba(26,37,71,.06) 1.5px, transparent 1.7px); background-size: 16px 16px; border: 4px solid ' + O + '; border-bottom: none; border-radius: 28px 28px 0 0; box-shadow: 0 -6px 0 rgba(26,37,71,.28); }',
      B + '.sheet h2 { display: inline-block; background: linear-gradient(#ffdf6a, #ffb81f); color: #3a2400; border: 3px solid ' + O + '; border-radius: 16px; padding: 4px 18px 6px; box-shadow: 0 3px 0 ' + O + '; text-shadow: 0 1px 0 rgba(255,255,255,.6); transform: rotate(-1deg); margin: 2px 0 14px; }',
      B + '.row { border-bottom: 2px dashed rgba(26,37,71,.16); }',
      B + '.sub { color: var(--muted); }',
      B + '.switch { width: 58px; height: 34px; border: 3px solid ' + O + '; background: #d8d0bf; box-shadow: inset 0 2px 0 rgba(0,0,0,.14); }',
      B + '.switch::after { top: 2px; left: 2px; width: 24px; height: 24px; background: #fff; border: 3px solid ' + O + '; box-shadow: 0 2px 0 rgba(0,0,0,.25); }',
      B + '.switch[aria-checked="true"] { background: #3fcf6a; border-color: ' + O + '; }',
      B + '.switch[aria-checked="true"]::after { transform: translateX(24px); background: #fff; }',
      B + '.close { background: linear-gradient(#ff8a7a, #e8392a); border: 3px solid ' + O + '; border-radius: 18px; box-shadow: 0 5px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); transition: transform .06s, box-shadow .06s; }',
      B + '.close:active { transform: translateY(4px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.buy, ' + B + '.buy2 { background: linear-gradient(#6fe08a, #25a84a); border: 3px solid ' + O + '; border-radius: 14px; box-shadow: 0 4px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); transition: transform .06s, box-shadow .06s; }',
      B + '.buy:active, ' + B + '.buy2:active { transform: translateY(3px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.buy.no, ' + B + '.buy2.no { background: linear-gradient(#a9adc0, #7d8298); }',
      B + '.upc, ' + B + '.irow, ' + B + '.track, ' + B + '.logbtn, ' + B + '.lrow, ' + B + '.achbox { background: var(--cr2); border: 3px solid ' + O + '; border-radius: 16px; box-shadow: 0 3px 0 rgba(26,37,71,.35); }',
      B + '.track[aria-checked="true"] { background: linear-gradient(#fff2b8, #ffd95a); color: #3a2400; }',
      B + '.uptab { background: linear-gradient(#fff4d8, #ffdfa0); border: 3px solid ' + O + '; border-radius: 16px; box-shadow: 0 4px 0 ' + O + '; color: #3a2400; transition: transform .06s, box-shadow .06s; }',
      B + '.uptab:active { transform: translateY(3px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.mbtn { background: linear-gradient(#ff8a6a, #e83a2a); border: 3px solid ' + O + '; border-radius: 18px; box-shadow: 0 5px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); transition: transform .06s, box-shadow .06s; }',
      B + '.mbtn.alt { background: linear-gradient(#7fb0ff, #2f6fe0); }',
      B + '.mbtn:active { transform: translateY(4px); box-shadow: 0 1px 0 ' + O + '; }',
      B + '.mbtn:disabled, ' + B + '.lbtn:disabled { background: linear-gradient(#a9adc0, #7d8298); }',
      B + '.lbtn { background: linear-gradient(#ff8a6a, #e83a2a); border: 3px solid ' + O + '; border-radius: 14px; box-shadow: 0 3px 0 ' + O + '; text-shadow: 0 2px 0 rgba(0,0,0,.35); }',
      B + '.rbtn { border: 3px solid ' + O + '; border-radius: 14px; background: var(--cr2); box-shadow: 0 3px 0 ' + O + '; }',
      B + '.rbtn.danger { background: linear-gradient(#ff8a7a, #e8392a); color: #fff; }',
      B + '.sk { border: 3px solid ' + O + '; box-shadow: 0 2px 0 ' + O + '; }',
      B + '.sk[aria-pressed="true"] { box-shadow: 0 0 0 3px #ffd23f, 0 2px 0 3px ' + O + '; }',
      B + '.phtabs button { border: 3px solid ' + O + '; border-radius: 14px; background: var(--cr2); box-shadow: 0 3px 0 ' + O + '; }',
      B + '.phtabs button.on { background: linear-gradient(#7fb0ff, #2f6fe0); color: #fff; }',
      B + '.wbar, ' + B + '.bossbar .bb { border: 2px solid ' + O + '; }',
      B + '#washFill { background: linear-gradient(#7fd4ff, #2f9ae0); box-shadow: inset 0 3px 0 rgba(255,255,255,.45); }',
      // ---- полоса босса ----
      B + '.bossbar { background: linear-gradient(#27345a, #121a36); border: 3px solid #ffd23f; box-shadow: 0 4px 0 ' + O + '; }',
      B + '.bossbar .bb { height: 16px; border-radius: 8px; background: rgba(255,255,255,.14); }',
      B + '#bossFill { background: linear-gradient(#ff8a6a, #e8281a); box-shadow: inset 0 3px 0 rgba(255,255,255,.4); }',
      // ---- награда ----
      B + '.reward .rt { text-shadow: 0 3px 0 ' + O + ', 0 0 18px rgba(255,210,60,.7); }'
    ].join('\n');
    try { var st = document.createElement('style'); st.id = 'gxUi'; st.textContent = css; document.head.appendChild(st); } catch (e) {}
    // ---- SVG-иконки вместо символов ----
    function chev(rot) { var d = 'M20 5L9 16l11 11'; return '<svg viewBox="0 0 32 32" width="40" height="40" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="rotate(' + rot + ' 16 16)"><path d="' + d + '" stroke="#1a2547" stroke-width="8.4"/><path d="' + d + '" stroke="#fff" stroke-width="4.4"/></g></svg>'; }
    var gear = (function () { var t = '', i; for (i = 0; i < 8; i++) t += '<rect x="13" y="1.6" width="6" height="8" rx="2" transform="rotate(' + i * 45 + ' 16 16)"/>'; return '<svg viewBox="0 0 32 32" fill="#ffd23f" stroke="#1a2547" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true">' + t + '<circle cx="16" cy="16" r="9.6"/><circle cx="16" cy="16" r="3.8" fill="#fff8ea"/></svg>'; })();
    var SV = {
      gear: gear,
      bag: '<svg viewBox="0 0 32 32" stroke="#1a2547" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M13 5.5a3 3 0 0 1 6 0" fill="none"/><path d="M8.5 13a7.5 7.5 0 0 1 15 0v13a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3z" fill="#ff7a5a"/><rect x="11.5" y="18" width="9" height="7" rx="2" fill="#ffd23f"/><path d="M11 13.2h10" fill="none"/></svg>',
      comp: '<svg viewBox="0 0 32 32" stroke="#1a2547" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="16" r="12.4" fill="#fff8ea"/><path d="M16 6.4l4.2 9.6h-8.4z" fill="#ff5a4a"/><path d="M16 25.6l-4.2-9.6h8.4z" fill="#3a4a7a"/><circle cx="16" cy="16" r="1.8" fill="#ffd23f"/></svg>',
      l: chev(0), r: chev(180), u: chev(90), d: chev(270)
    };
    var MAP = [['gear', 'gear'], ['invBtn', 'bag'], ['apBtn', 'comp'], ['bL', 'l'], ['bR', 'r'], ['bJ', 'u'], ['bDn', 'd']];
    function gxUiIcons(on) {
      MAP.forEach(function (p) { var el = document.getElementById(p[0]); if (!el) return; if (el.__gxo === undefined) el.__gxo = el.innerHTML; el.innerHTML = on ? SV[p[1]] : el.__gxo; });
    }
    var _gxSetUi = gxSet; gxSet = function (on) { _gxSetUi(on); try { gxUiIcons(!!on); } catch (e) {} };
  })();

var FXRGB = {};

var _burst0 = burst, _ring0 = ring, _upd0 = updateFx, _draw0 = drawFx, _flames0 = drawFlames, _smoke0 = drawSmoke, FXMAX = 280;

burst = function (x, y, n, col, sp, life) {
    if (!GX) return _burst0(x, y, n, col, sp, life);
    var rgb = fxRgb(col), kd = fxKind(rgb), i, a, v, sm;
    for (i = 0; i < n; i++) {
      a = Math.random() * 6.283; v = (0.3 + Math.random() * 0.7) * sp;
      fx.push({ k: 'p', x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * 0.25, age: 0, life: (life || 0.7) * (0.7 + Math.random() * 0.6), rgb: rgb, s: 1.6 + Math.random() * 2.6, hot: Math.random() < 0.5 });
    }
    if (gxQ > 0 && n >= 8 && kd !== 'spark') {
      sm = Math.min(7, Math.round(n / (kd === 'smoke' ? 2 : 5)));
      for (i = 0; i < sm; i++) fx.push({ k: 'm', x: x + (Math.random() - 0.5) * 24, y: y + (Math.random() - 0.5) * 16, vx: (Math.random() - 0.5) * 60, vy: -22 - Math.random() * 46, age: -Math.random() * 0.12, life: 0.9 + Math.random() * 0.8, rgb: kd === 'fire' ? '52,40,36' : rgb, s: 13 + Math.random() * 12, a0: kd === 'fire' ? 0.5 : 0.36 });
    }
    if (gxQ > 0 && n >= 16) fx.push({ k: 'g', x: x, y: y, r: 46 + Math.min(90, n * 1.5), age: 0, life: 0.28, rgb: kd === 'fire' ? '255,196,90' : rgb });
  };

ring = function (x, y, r, col) {
    if (!GX) return _ring0(x, y, r, col);
    var rgb = fxRgb(col);
    fx.push({ k: 'r', x: x, y: y, r: r, age: 0, life: 0.5, c: col, rgb: rgb });
    if (gxQ > 0) {
      fx.push({ k: 'g', x: x, y: y, r: Math.min(230, r * 0.8 + 30), age: 0, life: 0.3, rgb: rgb });
      if (r >= 90) fx.push({ k: 'x', x: x, y: y, r: r, age: 0, life: 0.4, rgb: rgb, n: 10, ph: Math.random() * 6 });
    }
  };

updateFx = function (dt) {
    if (!GX) return _upd0(dt);
    for (var i = fx.length - 1; i >= 0; i--) {
      var f = fx[i]; f.age += dt;
      if (f.age >= 0) {
        if (f.k === 'p') { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 620 * dt; f.vx *= (1 - 0.8 * dt); }
        else if (f.k === 'm') { f.x += f.vx * dt; f.y += f.vy * dt; f.vx *= (1 - 1.2 * dt); f.vy *= (1 - 0.6 * dt); }
      }
      if (f.age > f.life) fx.splice(i, 1);
    }
    if (fx.length > FXMAX) fx.splice(0, fx.length - FXMAX);
  };

drawFx = function () {
    if (!GX) return _draw0();
    var i, f, k, a, r, j, n;
    for (i = 0; i < fx.length; i++) {
      f = fx[i]; if (f.k !== 'm' || f.age < 0) continue;
      k = f.age / f.life; a = f.a0 * (1 - k) * (k < 0.15 ? k / 0.15 : 1); r = f.s * (1 + 2.4 * k);
      ctx.globalAlpha = a; ctx.drawImage(fxSpr(f.rgb), f.x - r, f.y - r, r * 2, r * 2);
    }
    ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
    for (i = 0; i < fx.length; i++) {
      f = fx[i]; if (f.age < 0 || f.k === 'm') continue; k = f.age / f.life;
      if (f.k === 'p') {
        ctx.globalAlpha = Math.max(0, 1 - k); ctx.strokeStyle = 'rgb(' + f.rgb + ')'; ctx.lineWidth = f.s;
        ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x - f.vx * 0.035, f.y - f.vy * 0.035); ctx.stroke();
        if (f.hot) { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = f.s * 0.42; ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x - f.vx * 0.02, f.y - f.vy * 0.02); ctx.stroke(); }
      } else if (f.k === 'g') {
        ctx.globalAlpha = 1; gxGlow(f.x, f.y, f.r * (0.7 + 0.6 * k), f.rgb, 1.1 * (1 - k));
      } else if (f.k === 'x') {
        ctx.globalAlpha = Math.max(0, 1 - k); ctx.strokeStyle = 'rgb(' + f.rgb + ')'; ctx.lineWidth = 3 * (1 - k) + 1; ctx.beginPath();
        for (j = 0; j < f.n; j++) { var an = f.ph + j * 6.283 / f.n, r0 = f.r * (0.18 + 0.5 * k), r1 = f.r * (0.4 + 0.7 * k); ctx.moveTo(f.x + Math.cos(an) * r0, f.y + Math.sin(an) * r0 * 0.5); ctx.lineTo(f.x + Math.cos(an) * r1, f.y + Math.sin(an) * r1 * 0.5); }
        ctx.stroke();
      } else {
        if (!f.rgb) f.rgb = fxRgb(f.c);
        r = f.r * (0.3 + k);
        ctx.globalAlpha = 0.4 * (1 - k); ctx.strokeStyle = 'rgb(' + f.rgb + ')'; ctx.lineWidth = 12 * (1 - k) + 2; ctx.beginPath(); ctx.ellipse(f.x, f.y, r, r * 0.45, 0, 0, 6.3); ctx.stroke();
        ctx.globalAlpha = 0.95 * (1 - k); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3 * (1 - k) + 1; ctx.beginPath(); ctx.ellipse(f.x, f.y, r, r * 0.45, 0, 0, 6.3); ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  };

drawFlames = function (x0, x1, gap, hh, seed) {
    if (!GX) return _flames0(x0, x1, gap, hh, seed);
    for (var i = Math.floor(x0 / gap) * gap - gap; i < x1 + gap; i += gap) {
      var f = (Math.abs(i) * 13 + seed) % 7; if (f === 0) continue;
      var x = i + ((Math.abs(i) * 7 + seed) % 50), h = hh * (0.55 + 0.45 * Math.abs(Math.sin(t * 4 + i * 0.37))) * (0.6 + (f % 4) * 0.15), w = 26 + (f % 3) * 12, sw = Math.sin(t * 6 + i) * 6, q;
      gxGlow(x, gY - h * 0.4, h * 1.15, '255,120,30', 0.34);
      ctx.fillStyle = 'rgba(14,8,4,.4)'; ctx.beginPath(); ctx.ellipse(x, gY + 2, w * 0.9, 5, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = 'rgba(255,70,20,.92)'; flameP(x - w * 0.4, h * 0.55, w * 0.6, sw * 0.9 - 3); flameP(x + w * 0.4, h * 0.62, w * 0.6, sw * 0.9 + 3);
      ctx.fillStyle = 'rgba(255,96,24,.95)'; flameP(x, h, w, sw);
      ctx.fillStyle = 'rgba(255,190,50,.96)'; flameP(x, h * 0.66, w * 0.6, sw * 0.7);
      ctx.fillStyle = 'rgba(255,246,176,.97)'; flameP(x, h * 0.34, w * 0.3, sw * 0.4);
      if (gxQ > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,90,.9)'; for (q = 0; q < 3; q++) { var u = (t * 0.7 + q * 0.31 + f * 0.13) % 1; ctx.beginPath(); ctx.arc(x + Math.sin(u * 8 + q * 2 + f) * w * 0.7, gY - h * 0.3 - u * h * 1.3, 2 * (1 - u) + 0.5, 0, 6.3); ctx.fill(); } ctx.globalCompositeOperation = 'source-over'; }
    }
  };

drawSmoke = function (x0, x1, gap, seed) {
    if (!GX) return _smoke0(x0, x1, gap, seed);
    var spr = fxSpr('30,24,24'), ga = ctx.globalAlpha;
    for (var i = Math.floor(x0 / gap) * gap - gap; i < x1 + gap; i += gap) {
      for (var k = 0; k < 6; k++) {
        var dy = (t * 38 + k * 75 + Math.abs(i)) % 450, y = gY - 90 - dy, a = 0.4 * (1 - dy / 450), r = (22 + dy * 0.12) * 1.5;
        ctx.globalAlpha = ga * a; ctx.drawImage(spr, i + 30 + Math.sin(t + k + seed) * 18 + dy * 0.12 - r, y - r, r * 2, r * 2);
      }
    }
    ctx.globalAlpha = ga;
  };

var gxShRec = null, gxShS = null;

var _gxDi = ctx.drawImage;

gxHookCtx(ctx);

var GXOLC = new WeakMap(), GXOLE = new WeakMap(), GXOLN = ['rooster', 'hero', 'boss', 'mell', 'mogg', 'icev', 'priest', 'worker', 'guard', 'muscle', 'doc', 'sci', 'npcDriver', 'npcPilot', 'npcCollector', 'sqRun', 'sqCarry', 'bottle', 'bDirty', 'bLegend', 'bSuper', 'bMyth', 'wool'];

ctx.drawImage = function (im, dx, dy, dw, dh) {
    if (arguments.length === 5 && GX && gxQ > 0 && dw > 2 && dh > 2 && gxOlOK(im)) {
      var m = this.getTransform(), e = gxOlEntry(im, dh * Math.hypot(m.a, m.b));
      if (e) { var ex = e.tp / (e.cw - 2 * e.tp) * dw, ey = e.tp / e.bp * dh; return _gxDi.call(this, e.c, dx - ex, dy - ey, dw + 2 * ex, dh + 2 * ey); }
    }
    return _gxDi.apply(this, arguments);
  };

var GXVP = {};

var _bus0 = drawBus, _bm0 = drawBusModel;

drawBus = function () {
    if (!GX) return _bus0();
    if (!bus.on) return;
    var x = bus.x, a = Math.max(0, Math.min(1, bus.alpha));
    if (a <= 0.01) return;
    gxVeh('bus', x, gY - 190, gY + 18, 175, gxBusTownBody, a);
    gxBusLights(x, bus.dir, bus.v > 5 || bus.st === 'come', (bus.acc || 0) < -60, a);
    if (bus.hide && dirtyN() > 0) {
      ctx.save(); ctx.globalAlpha = a; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 3; ctx.strokeStyle = GXI; ctx.lineJoin = 'round'; ctx.fillStyle = '#9fe3ff';
      ctx.strokeText('💧 мойка ×' + BUS_WASH_BOOST, x, gY - 126); ctx.fillText('💧 мойка ×' + BUS_WASH_BOOST, x, gY - 126); ctx.restore();
    }
  };

drawBusModel = function (x, dir, sk, cfg) {
    if (!GX) return _bm0(x, dir, sk, cfg);
    gxVeh('bus', x, gY - 200, gY + 18, 185, function () { gxBusModelBody(x, dir, sk, cfg); });
    gxBusLights(x, dir, !!(cfg.on || cfg.call), ((cfg.acc || 0) * dir) < -120, 1);
    if (cfg.own) gxBusLabels(x, dir, cfg);
  };

var _air0 = drawAirliner, _cc0 = drawCargoCraft, _heli0 = drawHeli;
