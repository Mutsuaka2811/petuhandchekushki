/* defs · 163 declarations · function gxHsWin(cx, nv) { var x = cx - 110, y = gY - 300, w = 220, h = 150, i, r = rng(cx); gxPanel(x - 10, y - 10, w + */

function gxHsWin(cx, nv) {
    var x = cx - 110, y = gY - 300, w = 220, h = 150, i, r = rng(cx);
    gxPanel(x - 10, y - 10, w + 20, h + 20, '#f4f8fc', { r: 8, lw: 2.8 });
    ctx.save(); gxRR(x, y, w, h, 4); ctx.clip();
    ctx.fillStyle = nv ? gxLG(0, y, 0, y + h, '#0c1634', '#22356a', '#38538e') : gxLG(0, y, 0, y + h, '#7fcdf8', '#c6ebff', '#eaf6ff'); ctx.fillRect(x, y, w, h);
    if (nv) { ctx.fillStyle = '#fff'; for (i = 0; i < 12; i++) { ctx.globalAlpha = 0.4 + r() * 0.5; ctx.beginPath(); ctx.arc(x + r() * w, y + r() * h * 0.5, 1 + r() * 1.2, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1; ctx.fillStyle = '#f4f1da'; ctx.beginPath(); ctx.arc(x + w * 0.2, y + 30, 13, 0, 6.3); ctx.fill(); }
    else { ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.ellipse(x + 150, y + 36, 26, 9, 0, 0, 6.3); ctx.ellipse(x + 168, y + 31, 17, 8, 0, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1; }
    for (i = 0; i < 7; i++) {
      var bw = 24 + r() * 16, bh = 36 + r() * 56, bx = x + 4 + i * 31;
      ctx.fillStyle = nv ? ['#16224a', '#1c2a58', '#121c40'][i % 3] : ['#9ab4d4', '#a9bfda', '#86a2c6'][i % 3]; ctx.fillRect(bx, y + h - bh, bw, bh); gxInk(1.2); ctx.strokeRect(bx, y + h - bh, bw, bh);
      for (var wy = y + h - bh + 6; wy < y + h - 8; wy += 12) for (var wx = bx + 4; wx < bx + bw - 5; wx += 9) { ctx.fillStyle = nv ? (r() < 0.55 ? '#ffd987' : '#202c5c') : 'rgba(255,255,255,.55)'; ctx.fillRect(wx, wy, 4.5, 6); }
    }
    ctx.fillStyle = nv ? '#0c1226' : '#7aaa6a'; ctx.fillRect(x, y + h - 8, w, 8);
    if (!nv) { ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.beginPath(); ctx.moveTo(x + 6, y + h); ctx.lineTo(x + 78, y); ctx.lineTo(x + 116, y); ctx.lineTo(x + 44, y + h); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = '#e4ecf4'; ctx.fillRect(cx - 3, y, 6, h); gxInk(1.4); ctx.strokeRect(cx - 3, y, 6, h); gxInk(2.4); gxRR(x, y, w, h, 4); ctx.stroke();
    gxPanel(x - 16, y + h + 8, w + 32, 10, '#d4dfeb', { r: 4, lw: 2.2 });
    // жалюзи-ролета сверху
    gxPanel(x - 6, y - 4, w + 12, 16, '#c4d4e4', { r: 3, lw: 2 }); ctx.strokeStyle = 'rgba(80,110,140,.4)'; ctx.lineWidth = 1.4; for (i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 6, y + i * 4); ctx.lineTo(x + w + 6, y + i * 4); ctx.stroke(); }
  }

function gxHsDoor(x, label, kind) {
    var gold = kind === 'gold', big = gold, ex = kind === 'exit', dw = big ? 120 : 84, dh = big ? 215 : 185, fr = gold ? '#d9a21a' : '#6f879d', i;
    gxShadow(x, gY + 4, dw * 0.8, 0.7);
    gxPanel(x - dw / 2 - 9, gY - dh - 9, dw + 18, dh + 9, fr, { r: 4, lw: 2.8, vert: true });
    gxPanel(x - dw / 2, gY - dh, dw, dh, gold ? '#ffd23f' : (ex ? '#9ab8a8' : '#b7cade'), { r: 3, lw: 2.4, tex: function (a, b, w, h) { ctx.strokeStyle = gold ? 'rgba(160,110,0,.34)' : 'rgba(40,70,100,.28)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 8, b + 90, w - 16, h - 130); ctx.strokeRect(a + 8, b + h - 38, w - 16, 26); } });
    ctx.fillStyle = gold ? gxLG(0, gY - dh + 14, 0, gY - dh + 76, '#fff3c0', '#ffe27a') : gxLG(0, gY - dh + 14, 0, gY - dh + 76, '#e4f6ff', '#8fc4e6'); gxRR(x - dw / 2 + 12, gY - dh + 14, dw - 24, 62, 6); ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(x - dw / 2 + 16, gY - dh + 74); ctx.lineTo(x - dw / 2 + 36, gY - dh + 16); ctx.lineTo(x - dw / 2 + 48, gY - dh + 16); ctx.lineTo(x - dw / 2 + 28, gY - dh + 74); ctx.fill();
    gxPanel(x + dw / 2 - 20, gY - dh / 2 - 6, 8, 28, '#e8eef6', { r: 3, lw: 1.6 }); if (ex) { gxPanel(x - dw / 2 + 10, gY - dh / 2 + 8, dw - 20, 7, '#d4dfeb', { r: 3, lw: 1.6 }); }
    gxPanel(x - dw / 2 + 6, gY - 22, dw - 12, 16, gold ? '#e6b422' : '#8aa2b8', { r: 3, lw: 1.6 });
    gxPanel(x - 50, gY - dh - 52, 100, 32, ex ? '#1f8a4a' : '#ffffff', { r: 9, lw: 2.4 }); ctx.strokeStyle = fr; ctx.lineWidth = 1.6; gxRR(x - 46, gY - dh - 48, 92, 24, 6); ctx.stroke();
    gxBig(label, x, gY - dh - 36, 15, ex ? '#ffffff' : (gold ? '#a07800' : '#35546f'), null);
    if (!ex && !gold && label.indexOf('ПАЛАТА') === 0) { gxPanel(x - 12, gY - dh + 94, 24, 14, '#ffffff', { r: 3, lw: 1.4 }); gxText(label.replace('ПАЛАТА ', '№'), x, gY - dh + 101, 9, '#35546f', null); }
    if (gold) { ctx.fillStyle = '#fff'; ctx.font = '16px "Rubik", system-ui, sans-serif'; for (i = 0; i < 3; i++) gxBig('★', x - 30 + i * 30, gY - dh + 118, 16, '#d9a21a', null); }
  }

function gxHsBench(x) {
    gxShadow(x, gY + 4, 60, 0.7);
    gxPanel(x - 50, gY - 54, 100, 14, '#3d9a8a', { r: 6, lw: 2.2, vert: true }); gxPanel(x - 50, gY - 36, 100, 12, '#2f8575', { r: 5, lw: 2.2, vert: true });
    ctx.fillStyle = 'rgba(255,255,255,.4)'; gxRR(x - 42, gY - 52, 40, 3, 1.5); ctx.fill();
    [-44, 40].forEach(function (dx) { gxPanel(x + dx - 3, gY - 40, 6, 40, '#a9bccd', { lw: 1.6 }); gxPanel(x + dx - 9, gY - 4, 18, 5, '#7c90a4', { r: 2, lw: 1.4 }); });
    gxPanel(x - 3, gY - 40, 6, 40, '#a9bccd', { lw: 1.6 });
    gxPanel(x - 44, gY - 70, 40, 18, '#f4ecdc', { r: 3, lw: 1.4 }); ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 30, gY - 66, 12, 3); ctx.fillRect(x - 26, gY - 70, 3, 10);
  }

function gxHsReg(rx) {
    gxShadow(rx, gY + 5, 112, 0.8);
    gxPanel(rx - 88, gY - 66, 176, 66, '#7d9bb4', { r: 8, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.6; for (var q = 10; q < w; q += 38) { ctx.beginPath(); ctx.moveTo(a + q, b + 10); ctx.lineTo(a + q, b + h - 6); ctx.stroke(); } } });
    gxPanel(rx - 96, gY - 78, 192, 16, '#e8d6b0', { r: 6, lw: 2.6, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.5)'; gxRR(rx - 88, gY - 76, 70, 3, 1.5); ctx.fill();
    ctx.fillStyle = '#e63a3a'; gxRR(rx - 8, gY - 52, 16, 4.6, 2); ctx.fill(); gxRR(rx - 2.3, gY - 58, 4.6, 16, 2); ctx.fill();
    gxPanel(rx + 26, gY - 118, 46, 36, '#2b3a4a', { r: 5, lw: 2.2 }); ctx.fillStyle = gxLG(0, gY - 114, 0, gY - 88, '#bff4ff', '#52b8e0'); gxRR(rx + 30, gY - 114, 38, 26, 3); ctx.fill(); ctx.strokeStyle = '#2a8aa8'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(rx + 33, gY - 98); ctx.lineTo(rx + 42, gY - 98); ctx.lineTo(rx + 46, gY - 108); ctx.lineTo(rx + 52, gY - 92); ctx.lineTo(rx + 56, gY - 98); ctx.lineTo(rx + 64, gY - 98); ctx.stroke();
    gxPanel(rx + 40, gY - 82, 18, 5, '#3a4452', { r: 2, lw: 1.2 });
    gxPanel(rx - 84, gY - 94, 22, 16, '#f4ecdc', { r: 3, lw: 1.6 }); ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.arc(rx - 52, gY - 84, 8, Math.PI, 0); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillRect(rx - 60, gY - 84, 16, 3);
    gxPanel(rx - 64, gY - 134, 128, 34, '#ffffff', { r: 10, lw: 2.6 }); ctx.fillStyle = '#d33a3a'; gxRR(rx - 56, gY - 126, 10, 3.6, 1.5); ctx.fill(); gxRR(rx - 52.8, gY - 129.2, 3.6, 10, 1.5); ctx.fill(); gxBig('РЕГИСТРАТУРА', rx + 8, gY - 117, 13, '#35546f', null);
  }

function gxHsPoster(x) {
    gxPanel(x - 26, gY - 252, 52, 70, '#ffffff', { r: 4, lw: 2.4 }); ctx.fillStyle = '#2f8f7b'; ctx.fillRect(x - 20, gY - 246, 40, 12); ctx.fillStyle = '#d33a3a'; gxRR(x - 10, gY - 226, 20, 7, 3); ctx.fill(); gxRR(x - 3.5, gY - 233, 7, 21, 3); ctx.fill();
    ctx.fillStyle = 'rgba(40,70,100,.5)'; for (var i = 0; i < 4; i++) ctx.fillRect(x - 18, gY - 202 + i * 5, 36 - (i % 2) * 10, 2);
  }

function gxHsIV(x) {
    gxShadow(x, gY + 3, 20, 0.7);
    ctx.strokeStyle = '#b9c8d6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, gY - 6); ctx.lineTo(x, gY - 170); ctx.stroke(); ctx.strokeStyle = '#e8eef6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 2, gY - 10); ctx.lineTo(x - 2, gY - 166); ctx.stroke();
    for (var s = -1; s <= 1; s += 2) { ctx.strokeStyle = '#8fa4b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, gY - 8); ctx.lineTo(x + s * 18, gY); ctx.stroke(); ctx.fillStyle = '#4a5666'; ctx.beginPath(); ctx.arc(x + s * 18, gY - 2, 3.4, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = '#b9c8d6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 14, gY - 170); ctx.lineTo(x + 14, gY - 170); ctx.stroke();
    gxPanel(x - 14, gY - 214, 28, 42, 'rgba(210,244,255,.75)', { r: 7, lw: 2 }); ctx.fillStyle = 'rgba(120,200,235,.7)'; ctx.fillRect(x - 11, gY - 190, 22, 16); ctx.strokeStyle = 'rgba(200,230,245,.9)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, gY - 172); ctx.quadraticCurveTo(x + 18, gY - 120, x + 8, gY - 70); ctx.stroke();
  }

function gxHsChair(x) {
    gxShadow(x, gY + 3, 40, 0.7);
    ctx.strokeStyle = '#3a4656'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x + 4, gY - 20, 20, 0, 6.3); ctx.stroke(); ctx.strokeStyle = '#9fb0c4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + 4, gY - 20, 16, 0, 6.3); ctx.stroke();
    ctx.fillStyle = '#4a5666'; ctx.beginPath(); ctx.arc(x + 4, gY - 20, 3, 0, 6.3); ctx.fill();
    gxPanel(x - 18, gY - 52, 40, 8, '#3d9a8a', { r: 4, lw: 2 }); gxPanel(x - 22, gY - 86, 8, 40, '#3d9a8a', { r: 4, lw: 2 }); ctx.strokeStyle = '#3a4656'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 24, gY - 86); ctx.lineTo(x - 34, gY - 88); ctx.moveTo(x - 4, gY - 44); ctx.lineTo(x - 8, gY - 8); ctx.stroke();
    ctx.beginPath(); ctx.arc(x - 10, gY - 8, 7, 0, 6.3); ctx.stroke(); ctx.moveTo(x + 24, gY - 44); ctx.lineTo(x + 30, gY - 24); ctx.stroke();
  }

function gxHsCart(x) {
    gxShadow(x, gY + 3, 36, 0.7);
    gxPanel(x - 24, gY - 66, 48, 52, '#d33a3a', { r: 5, lw: 2.4, vert: true }); for (var i = 0; i < 3; i++) { gxPanel(x - 20, gY - 62 + i * 16, 40, 13, '#e65a5a', { r: 3, lw: 1.4 }); ctx.fillStyle = '#e8eef6'; ctx.fillRect(x - 6, gY - 57 + i * 16, 12, 3); }
    gxPanel(x - 28, gY - 74, 56, 10, '#f4ecdc', { r: 4, lw: 2 }); ctx.fillStyle = '#ffffff'; gxRR(x - 8, gY - 88, 16, 14, 3); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 5, gY - 84, 10, 2.6); ctx.fillRect(x - 1.3, gY - 87, 2.6, 8);
    [-17, 17].forEach(function (dx) { ctx.fillStyle = '#2a323e'; ctx.beginPath(); ctx.arc(x + dx, gY - 8, 6, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); });
  }

function gxHsBed(px) {
    // ниша палаты: тёплая стена с золотой окантовкой, окно, кровать, тумбочка с цветами
    gxPanel(px - 78, gY - 176, 156, 176, '#fff2c9', { r: 10, lw: 3, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(214,170,60,.14)'; for (var q = 0; q < w; q += 22) ctx.fillRect(a + q, b, 9, h); } });
    gxPanel(px - 84, gY - 186, 168, 16, '#e6b422', { r: 6, lw: 2.6, vert: true });
    ctx.fillStyle = gxLG(0, gY - 150, 0, gY - 92, '#9bd8ff', '#e6f6ff'); gxRR(px + 14, gY - 150, 48, 56, 22); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(px + 36, gY - 150, 3, 56); ctx.fillRect(px + 14, gY - 124, 48, 3);
    gxPanel(px - 70, gY - 120, 30, 22, '#1a2230', { r: 4, lw: 2 }); ctx.fillStyle = '#0a1812'; ctx.fillRect(px - 66, gY - 116, 22, 14);
    // кровать
    gxShadow(px - 6, gY + 4, 76, 0.6);
    gxPanel(px - 72, gY - 76, 10, 70, '#c9d6e3', { r: 4, lw: 2.2 }); gxPanel(px + 58, gY - 52, 8, 46, '#c9d6e3', { r: 4, lw: 2.2 });
    gxPanel(px - 64, gY - 46, 124, 18, '#eef3f9', { r: 6, lw: 2.4, vert: true }); gxPanel(px - 64, gY - 54, 124, 12, '#7ab8e8', { r: 6, lw: 2.2, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.35)'; for (var i = 0; i < 5; i++) ctx.fillRect(px - 52 + i * 22, gY - 52, 8, 7);
    gxPanel(px - 62, gY - 62, 34, 14, '#ffffff', { r: 7, lw: 2 });
    ctx.strokeStyle = '#a9bccd'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 60, gY - 28); ctx.lineTo(px - 60, gY - 6); ctx.moveTo(px + 52, gY - 28); ctx.lineTo(px + 52, gY - 6); ctx.stroke(); ctx.fillStyle = '#4a5666'; ctx.beginPath(); ctx.arc(px - 60, gY - 5, 3.4, 0, 6.3); ctx.arc(px + 52, gY - 5, 3.4, 0, 6.3); ctx.fill();
    // тумбочка с вазой
    gxPanel(px + 66, gY - 52, 26, 52, '#c4a06a', { r: 3, lw: 2.2 }); ctx.fillStyle = '#7a5a30'; ctx.fillRect(px + 70, gY - 36, 18, 2); ctx.fillRect(px + 70, gY - 20, 18, 2);
    ctx.fillStyle = '#9ad4f0'; gxRR(px + 72, gY - 76, 14, 24, 4); ctx.fill(); gxInk(1.4); ctx.stroke(); [['#ff7aa5', -6, -90], ['#ffd23f', 3, -96], ['#ff9a52', 10, -88]].forEach(function (f) { ctx.fillStyle = f[0]; ctx.beginPath(); ctx.arc(px + 79 + f[1], gY + f[2], 5, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); });
  }

function gxMFree(x, pad) { for (var i = 0; i < GXM_SL.length; i++) if (Math.abs(GXM_SL[i][0] - x) < GXM_SL[i][1] + pad) return false; return true; }

function gxPalmPt(p, u) { var x0 = p.x, y0 = gY + 3, x1 = p.x + p.l * 0.15, y1 = gY - p.h * 0.55, x2 = p.x + p.l, y2 = gY - p.h, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u; return [a * x0 + b * x1 + c * x2, a * y0 + b * y1 + c * y2]; }

function gxPalmTrunk(p) {
    var S = 22, i, L = [], R = [], pt, pn, dx, dy, nl, hw;
    gxShadow(p.x + 12, gY + 4, 44, 0.8);
    for (i = 0; i <= S; i++) {
      var u = i / S; pt = gxPalmPt(p, u); pn = gxPalmPt(p, Math.min(1, u + 0.03)); dx = pn[0] - pt[0]; dy = pn[1] - pt[1]; nl = Math.sqrt(dx * dx + dy * dy) || 1; hw = 10.5 - 4.6 * u + (i === 0 ? 3 : 0);
      L.push([pt[0] - dy / nl * hw, pt[1] + dx / nl * hw]); R.push([pt[0] + dy / nl * hw, pt[1] - dx / nl * hw]);
    }
    function path() { ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); for (i = 1; i <= S; i++) ctx.lineTo(L[i][0], L[i][1]); for (i = S; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); }
    path(); ctx.fillStyle = gxLG(p.x - 12, 0, p.x + 12, 0, '#c58d52', '#8d5b2c', '#5e3a1b'); ctx.fill();
    ctx.save(); path(); ctx.clip();
    ctx.strokeStyle = 'rgba(50,28,10,.5)'; ctx.lineWidth = 2; ctx.beginPath();
    for (i = 1; i < S; i += 2) { ctx.moveTo(L[i][0] - 2, L[i][1] + 1); ctx.quadraticCurveTo((L[i][0] + R[i][0]) / 2, L[i][1] + 6, R[i][0] + 2, R[i][1] + 1); }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,225,170,.3)'; ctx.lineWidth = 2.2; ctx.beginPath(); for (i = 0; i <= S; i++) { var qx = L[i][0] * 0.75 + R[i][0] * 0.25, qy = L[i][1] * 0.75 + R[i][1] * 0.25; if (i) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy); } ctx.stroke();
    ctx.restore(); path(); gxInk(2.2); ctx.stroke();
  }

function gxPalmCrown(v) {
    var key = 'pcr' + v, c = gxCv[key]; if (c) return c;
    var oc = ctx, W = 290, Hh = 210, cx = 145, cy = 108, i, n = 11, r = rng(40 + v * 7), cols = [['#1f7a3f', '#62cf72'], ['#1c7a52', '#58d48c'], ['#2a8a38', '#86d860'], ['#1b7466', '#4fcaa0']][v % 4], fr = [];
    c = gxCan(W * 2, Hh * 2); ctx = c.getContext('2d'); ctx.scale(2, 2);
    try {
      for (i = 0; i < n; i++) { var a = -Math.PI + (i + 0.5) * Math.PI / n + (r() - 0.5) * 0.14; fr.push({ a: a, len: 96 + r() * 28, d: Math.abs(a + Math.PI / 2) }); }
      fr.sort(function (p, q) { return q.d - p.d; });
      fr.forEach(function (f) {
        var dxr = Math.cos(f.a), dyr = Math.sin(f.a), p0 = [cx, cy], p1 = [cx + dxr * f.len * 0.55, cy + dyr * f.len * 0.55 - f.len * 0.3], p2 = [cx + dxr * f.len, cy + dyr * f.len * 0.7 + f.len * 0.4], S = 18, k, U = [], D = [], sp = [];
        for (k = 0; k <= S; k++) {
          var u = k / S, a1 = (1 - u) * (1 - u), b1 = 2 * u * (1 - u), c1 = u * u, px = a1 * p0[0] + b1 * p1[0] + c1 * p2[0], py = a1 * p0[1] + b1 * p1[1] + c1 * p2[1];
          var tx = 2 * (1 - u) * (p1[0] - p0[0]) + 2 * u * (p2[0] - p1[0]), ty = 2 * (1 - u) * (p1[1] - p0[1]) + 2 * u * (p2[1] - p1[1]), tl = Math.sqrt(tx * tx + ty * ty) || 1, nx = -ty / tl, ny = tx / tl;
          var hw = 17 * Math.pow(Math.sin(Math.PI * (0.08 + 0.92 * u)), 0.85) * (1 - 0.3 * u) * (k % 2 ? 0.58 : 1) + 1;
          sp.push([px, py]); U.push([px + nx * hw, py + ny * hw]); D.push([px - nx * hw * 0.9, py - ny * hw * 0.9]);
        }
        ctx.beginPath(); ctx.moveTo(U[0][0], U[0][1]); for (k = 1; k <= S; k++) ctx.lineTo(U[k][0], U[k][1]); for (k = S; k >= 0; k--) ctx.lineTo(D[k][0], D[k][1]); ctx.closePath();
        ctx.fillStyle = gxLG(cx, cy, p2[0], p2[1], cols[0], cols[1]); ctx.fill(); gxInk(1.8); ctx.stroke();
        ctx.strokeStyle = 'rgba(210,255,200,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sp[1][0], sp[1][1]); for (k = 2; k < S; k++) ctx.lineTo(sp[k][0], sp[k][1]); ctx.stroke();
        ctx.strokeStyle = 'rgba(8,60,30,.35)'; ctx.lineWidth = 1; ctx.beginPath(); for (k = 2; k < S; k += 2) { ctx.moveTo(sp[k][0], sp[k][1]); ctx.lineTo(D[k][0], D[k][1]); } ctx.stroke();
      });
      [[-7, 9], [6, 11], [0, 4], [-1, 15]].forEach(function (q, qi) { ctx.fillStyle = qi % 2 ? '#6a4020' : '#8a5a2c'; ctx.beginPath(); ctx.arc(cx + q[0], cy + q[1], 6, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = 'rgba(255,230,180,.35)'; ctx.beginPath(); ctx.arc(cx + q[0] - 2, cy + q[1] - 2, 2, 0, 6.3); ctx.fill(); });
    } finally { ctx = oc; }
    c._w = W; c._h = Hh; c._cx = cx; c._cy = cy; gxCv[key] = c; return c;
  }

function gxMCrowns(x0, x1) {
    for (var i = 0; i < GXM_PALMS.length; i++) {
      var p = GXM_PALMS[i], tp = gxPalmPt(p, 1); if (tp[0] < x0 - 160 || tp[0] > x1 + 160) continue;
      var c = gxPalmCrown(p.s % 4), sw = Math.sin(t * 1.25 + p.s * 1.7) * 0.034 + Math.sin(t * 0.5 + p.s) * 0.02 + Math.sin(t * 2.6 + p.s * 3) * 0.006;
      ctx.save(); ctx.translate(tp[0], tp[1] + 4); ctx.rotate(sw); ctx.scale(1 + Math.sin(t * 2.1 + p.s) * 0.01, 1); ctx.drawImage(c, -c._cx, -c._cy, c._w, c._h); ctx.restore();
    }
  }

function gxMSea(x0, x1, nv) {
    var hz = gY - 96, i, r, w = x1 - x0;
    ctx.fillStyle = gxLG(0, hz, 0, gY + 6, '#bff4ee', '#57d6e4', '#1fa9cf'); ctx.fillRect(x0, hz, w, 102);
    ctx.fillStyle = gxLG(0, hz, 0, hz + 16, 'rgba(255,255,255,.55)', 'rgba(255,255,255,0)'); ctx.fillRect(x0, hz, w, 16);
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x0, hz, w, 2);
    ctx.lineCap = 'round';
    for (r = 0; r < 5; r++) {
      var yy = hz + 15 + r * 16 + r * r * 0.7, sp = 0.5 + r * 0.1, amp = 1.4 + r * 0.5, len = 20 + r * 9, step = len * 2.5, a = Math.floor(x0 / step) - 1;
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.2 + r * 0.07).toFixed(2) + ')'; ctx.lineWidth = 1.3 + r * 0.35; ctx.beginPath();
      for (i = a; i * step < x1 + step; i++) { var wx = i * step + (r % 2) * step * 0.5 + Math.sin(t * sp + i * 1.3 + r) * 8, wy = yy + Math.sin(t * 0.9 * sp + i + r * 2) * amp; ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + len * 0.5, wy - 3 - r * 0.4, wx + len, wy); }
      ctx.stroke();
    }
    ctx.fillStyle = '#fff';
    gxEach(x0, x1, 62, 14, 12, function (x, k) {
      var h = gxH(k * 13 + 5), tw = Math.sin(t * (2 + h * 3) + k * 2); if (tw < 0.5) return;
      var sx = x + h * 50, sy = hz + 8 + gxH(k * 7 + 1) * 84; ctx.globalAlpha = Math.min(1, (tw - 0.5) * 2.2);
      ctx.beginPath(); ctx.moveTo(sx, sy - 3.4); ctx.lineTo(sx + 1.6, sy); ctx.lineTo(sx, sy + 3.4); ctx.lineTo(sx - 1.6, sy); ctx.closePath(); ctx.fill();
    });
    ctx.globalAlpha = 1;
    // парусник на горизонте
    var bx = (t * 5 + 600) % 5000 - 300;
    if (bx > x0 - 60 && bx < x1 + 60) {
      var by = hz + 7 + Math.sin(t * 1.3) * 0.8;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(bx, by - 30); ctx.lineTo(bx + 14, by - 2); ctx.lineTo(bx, by - 2); ctx.fill(); gxInk(1.2); ctx.stroke();
      ctx.fillStyle = '#ff7a5a'; ctx.beginPath(); ctx.moveTo(bx - 3, by - 24); ctx.lineTo(bx - 3, by - 2); ctx.lineTo(bx - 15, by - 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#4a3322'; ctx.beginPath(); ctx.moveTo(bx - 19, by - 1); ctx.lineTo(bx + 17, by - 1); ctx.lineTo(bx + 11, by + 5); ctx.lineTo(bx - 14, by + 5); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
  }

function gxMVillas(xa, xb, nv) {
    var hz = gY - 96, by = hz + 34, i;
    ctx.fillStyle = 'rgba(40,110,100,.35)'; ctx.fillRect(xa, by + 5, xb - xa, 3);
    ctx.fillStyle = '#9a6e3e'; ctx.fillRect(xa, by - 1, xb - xa, 4); ctx.fillStyle = '#c99a58'; ctx.fillRect(xa, by - 2, xb - xa, 2);
    ctx.fillStyle = '#6a4a28'; for (i = Math.floor(xa / 34) * 34; i < xb; i += 34) ctx.fillRect(i, by + 2, 3, 12);
    gxEach(xa, xb, 250, 60, 70, function (x, k) {
      var h = gxH(k * 5 + 2), s = 0.72 + h * 0.16, wc = ['#f6ecd2', '#f9e3c0', '#e8f2ee'][k % 3];
      ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(30,110,120,.25)'; ctx.fillRect(-34, 6, 68, 16);
      ctx.fillStyle = '#6a4a28'; for (i = -28; i <= 28; i += 14) ctx.fillRect(i - 1.5, 0, 3, 14);
      gxPanel(-40, -6, 80, 8, '#b98a55', { lw: 1.4 });
      gxPanel(-27, -40, 54, 35, wc, { lw: 1.6 });
      ctx.fillStyle = nv ? '#ffd986' : '#6ec5d6'; ctx.fillRect(-20, -33, 14, 17); ctx.fillRect(6, -33, 14, 17); ctx.strokeStyle = GXI; ctx.lineWidth = 1.2; ctx.strokeRect(-20, -33, 14, 17); ctx.strokeRect(6, -33, 14, 17);
      ctx.fillStyle = gxLG(0, -72, 0, -38, '#e2b862', '#b88638'); ctx.beginPath(); ctx.moveTo(-42, -38); ctx.lineTo(0, -72); ctx.lineTo(42, -38); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
      ctx.strokeStyle = 'rgba(110,70,20,.5)'; ctx.lineWidth = 1; for (i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 5, -69 + Math.abs(i) * 2.5); ctx.lineTo(i * 11, -39); ctx.stroke(); }
      if (nv) gxGlow(0, -24, 52, '255,200,100', 0.55);
      ctx.restore();
    });
  }

function gxMSign(x, w, col, l1, l2, ic) {
    gxShadow(x, gY + 3, w * 0.5 + 8, 0.6);
    gxPanel(x - w / 2 + 8, gY - 72, 7, 72, '#7a4a22', { lw: 1.6 }); gxPanel(x + w / 2 - 15, gY - 72, 7, 72, '#7a4a22', { lw: 1.6 });
    gxPanel(x - w / 2, gY - 126, w, 56, col, { r: 9, lw: 2.4, vert: true });
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2; gxRR(x - w / 2 + 4, gY - 122, w - 8, 48, 6); ctx.stroke();
    var tx = x + (ic ? 14 : 0);
    gxText(l1, tx, gY - 108, 13, '#fff', 'rgba(10,30,60,.5)'); gxText(l2, tx, gY - 88, 11.5, '#d9f1ff', null);
    if (ic === 'plane') { var ix = x - w / 2 + 28, iy = gY - 98; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(ix, iy, 16, 4.4, -0.35, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.moveTo(ix - 3, iy - 2); ctx.lineTo(ix - 12, iy - 16); ctx.lineTo(ix - 6, iy - 16); ctx.lineTo(ix + 5, iy - 3); ctx.fill(); ctx.beginPath(); ctx.moveTo(ix - 12, iy + 3); ctx.lineTo(ix - 20, iy - 6); ctx.lineTo(ix - 16, iy - 6); ctx.lineTo(ix - 6, iy + 2); ctx.fill(); }
  }

function gxMLighthouse(x) {
    var i, y0 = gY - 14, y1 = gY - 250, w0 = 31, w1 = 19, k;
    gxShadow(x, gY + 5, 104, 0.85);
    // скальное основание
    [[-70, 1.05, 0], [64, 0.95, 1], [-6, 1.5, 2]].forEach(function (q) { gxRockHD(x + q[0], q[1] + 0.3); });
    function tw() { ctx.beginPath(); ctx.moveTo(x - w0, y0); ctx.lineTo(x - w1, y1); ctx.lineTo(x + w1, y1); ctx.lineTo(x + w0, y0); ctx.closePath(); }
    tw(); ctx.fillStyle = gxLG(x - w0, 0, x + w0, 0, '#ffffff', '#e8eef4', '#aab6c6'); ctx.fill();
    ctx.save(); tw(); ctx.clip();
    for (k = 0; k < 5; k++) { if (k % 2 === 0) continue; var ya = y0 - (k + 0) * (y0 - y1) / 5, yb = y0 - (k + 1) * (y0 - y1) / 5; ctx.fillStyle = gxLG(x - w0, 0, x + w0, 0, '#ff6a5e', '#e5362e', '#a8201c'); ctx.fillRect(x - 40, yb, 80, ya - yb); }
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(x - 28, y1, 7, y0 - y1);
    ctx.fillStyle = 'rgba(30,20,60,.18)'; ctx.fillRect(x + 12, y1, 24, y0 - y1);
    // окна и дверь
    [0.28, 0.62].forEach(function (f) { var wy = y0 - f * (y0 - y1); ctx.fillStyle = '#2a4466'; ctx.beginPath(); ctx.moveTo(x - 5, wy + 12); ctx.lineTo(x - 5, wy - 3); ctx.arc(x, wy - 3, 5, Math.PI, 0); ctx.lineTo(x + 5, wy + 12); ctx.closePath(); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = 'rgba(160,220,255,.55)'; ctx.fillRect(x - 3, wy - 5, 2, 8); });
    ctx.restore(); tw(); gxInk(2.6); ctx.stroke();
    gxPanel(x - 12, y0 - 34, 24, 34, '#6a3a1c', { r: 6, lw: 2 }); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.arc(x + 5, y0 - 16, 1.8, 0, 6.3); ctx.fill();
    // галерея и фонарь
    gxPanel(x - 34, y1 - 8, 68, 10, '#2e3440', { r: 2, lw: 2 });
    ctx.strokeStyle = '#2e3440'; ctx.lineWidth = 2; ctx.beginPath(); for (i = -30; i <= 30; i += 10) { ctx.moveTo(x + i, y1 - 8); ctx.lineTo(x + i, y1 - 24); } ctx.moveTo(x - 32, y1 - 24); ctx.lineTo(x + 32, y1 - 24); ctx.stroke();
    gxPanel(x - 16, y1 - 54, 32, 46, '#fff3c0', { r: 3, lw: 2.2, vert: true });
    ctx.strokeStyle = '#2e3440'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x, y1 - 54); ctx.lineTo(x, y1 - 8); ctx.moveTo(x - 16, y1 - 30); ctx.lineTo(x + 16, y1 - 30); ctx.stroke();
    ctx.fillStyle = gxLG(x - 22, 0, x + 22, 0, '#ff7a6a', '#e5362e', '#a8201c'); ctx.beginPath(); ctx.moveTo(x - 24, y1 - 54); ctx.quadraticCurveTo(x, y1 - 92, x + 24, y1 - 54); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = '#2e3440'; ctx.beginPath(); ctx.arc(x, y1 - 80, 3.4, 0, 6.3); ctx.fill(); ctx.fillRect(x - 1, y1 - 96, 2, 14);
  }

function gxMHut(x) {
    var i;
    gxShadow(x, gY + 4, 110, 0.85);
    gxPanel(x - 96, gY - 12, 150, 12, '#b98a55', { lw: 2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(70,40,10,.4)'; ctx.lineWidth = 1.2; for (var q = 8; q < w; q += 16) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + h); ctx.stroke(); } } });
    gxPanel(x - 70, gY - 102, 124, 90, '#6fd3c8', { lw: 2.6, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(10,80,80,.3)'; ctx.lineWidth = 1.4; for (var q = 14; q < h; q += 14) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(a, b, 16, h); } });
    gxPanel(x - 70, gY - 102, 124, 7, '#2f9a96', { lw: 1.6 });
    gxPanel(x - 34, gY - 82, 30, 70, '#7a4a22', { r: 3, lw: 2.4 }); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.arc(x - 10, gY - 46, 2.2, 0, 6.3); ctx.fill();
    gxPanel(x + 12, gY - 86, 36, 38, '#a8e4f2', { r: 3, lw: 2.2, vert: true }); ctx.strokeStyle = '#6a3a1c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 30, gY - 86); ctx.lineTo(x + 30, gY - 48); ctx.moveTo(x + 12, gY - 67); ctx.lineTo(x + 48, gY - 67); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(x + 14, gY - 48); ctx.lineTo(x + 24, gY - 84); ctx.lineTo(x + 30, gY - 84); ctx.lineTo(x + 20, gY - 48); ctx.fill();
    gxPanel(x + 8, gY - 46, 44, 12, '#8a5a2c', { r: 3, lw: 1.8 }); [[16, '#ff6b9a'], [28, '#ffd23f'], [40, '#ff6b9a']].forEach(function (q) { ctx.fillStyle = q[1]; ctx.beginPath(); ctx.arc(x + q[0], gY - 49, 4, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); });
    // соломенная крыша
    ctx.beginPath(); ctx.moveTo(x - 100, gY - 90); ctx.lineTo(x - 6, gY - 172); ctx.lineTo(x + 88, gY - 90);
    for (i = 0; i <= 12; i++) ctx.lineTo(x + 88 - i * 15.7, gY - 90 + (i % 2 ? 12 : 3)); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 172, 0, gY - 80, '#f0cf7a', '#d6a64a', '#a67428'); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(100,60,10,.45)'; ctx.lineWidth = 1.4; for (i = -9; i <= 9; i++) { ctx.beginPath(); ctx.moveTo(x - 6 + i * 4, gY - 166 + Math.abs(i) * 2); ctx.lineTo(x - 6 + i * 11, gY - 80); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.moveTo(x - 6, gY - 172); ctx.lineTo(x - 100, gY - 90); ctx.lineTo(x - 70, gY - 90); ctx.lineTo(x - 6, gY - 150); ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 100, gY - 90); ctx.lineTo(x - 6, gY - 172); ctx.lineTo(x + 88, gY - 90); for (i = 0; i <= 12; i++) ctx.lineTo(x + 88 - i * 15.7, gY - 90 + (i % 2 ? 12 : 3)); ctx.closePath(); gxInk(2.6); ctx.stroke();
    gxPanel(x - 86, gY - 90, 7, 78, '#7a4a22', { lw: 1.8 });
    // доски для сёрфинга и спасательный круг
    [[66, '#ff6b5a', 0.16], [80, '#ffd23f', 0.28]].forEach(function (q) { ctx.save(); ctx.translate(x + q[0], gY); ctx.rotate(-q[2]); ctx.fillStyle = q[1]; ctx.beginPath(); ctx.ellipse(0, -44, 9, 44, 0, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-1.5, -80, 3, 72); ctx.restore(); });
    ctx.strokeStyle = '#e5362e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x - 52, gY - 58, 9, 0, 6.3); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.arc(x - 52, gY - 58, 9, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
  }

function gxMTiki(x, nv) {
    var i;
    gxShadow(x, gY + 4, 112, 0.85);
    gxPanel(x - 86, gY - 134, 7, 134, '#c4a060', { lw: 1.8 }); gxPanel(x + 79, gY - 134, 7, 134, '#c4a060', { lw: 1.8 });
    gxPanel(x - 80, gY - 96, 160, 8, '#6a4a28', { lw: 1.6 });
    ctx.fillStyle = '#0f2a44'; ctx.fillRect(x - 78, gY - 150 + 70, 156, 8);
    gxPanel(x - 74, gY - 88, 148, 34, '#5a3c20', { lw: 1.8 }); [-52, -24, 4, 32, 58].forEach(function (bx, q) { var bc = ['#e5484d', '#2fbf6b', '#ffb020', '#3b9bff', '#c46bff'][q]; ctx.fillStyle = bc; ctx.beginPath(); ctx.moveTo(x + bx - 5, gY - 54); ctx.lineTo(x + bx - 5, gY - 70); ctx.lineTo(x + bx - 2, gY - 76); ctx.lineTo(x + bx + 2, gY - 76); ctx.lineTo(x + bx + 5, gY - 70); ctx.lineTo(x + bx + 5, gY - 54); ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x + bx - 3, gY - 70, 2, 12); });
    gxPanel(x - 90, gY - 56, 180, 56, '#b9763a', { lw: 2.4, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(70,36,8,.45)'; ctx.lineWidth = 2; for (var q = 12; q < w; q += 16) { ctx.beginPath(); ctx.moveTo(a + q, b + 8); ctx.lineTo(a + q, b + h); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(a, b, w, 8); } });
    gxPanel(x - 96, gY - 64, 192, 10, '#7a4a22', { r: 4, lw: 2.2 });
    [[-40, '#ffffff'], [26, '#ffd23f']].forEach(function (q) { ctx.fillStyle = q[1]; ctx.beginPath(); ctx.moveTo(x + q[0] - 7, gY - 66); ctx.lineTo(x + q[0] - 5, gY - 80); ctx.lineTo(x + q[0] + 5, gY - 80); ctx.lineTo(x + q[0] + 7, gY - 66); ctx.closePath(); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.strokeStyle = '#e5484d'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x + q[0] + 2, gY - 80); ctx.lineTo(x + q[0] + 8, gY - 94); ctx.stroke(); });
    // крыша-зонт из пальмовых листьев
    ctx.beginPath(); ctx.moveTo(x - 108, gY - 126); ctx.quadraticCurveTo(x - 50, gY - 172, x, gY - 168); ctx.quadraticCurveTo(x + 50, gY - 172, x + 108, gY - 126);
    for (i = 0; i <= 14; i++) ctx.lineTo(x + 108 - i * 15.4, gY - 126 + (i % 2 ? 13 : 2)); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 170, 0, gY - 112, '#e9c56c', '#c99a44', '#98692a'); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(100,60,10,.45)'; ctx.lineWidth = 1.4; for (i = -10; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(x + i * 5, gY - 168 + Math.abs(i) * 2.4); ctx.lineTo(x + i * 10.5, gY - 112); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 108, gY - 126); ctx.quadraticCurveTo(x - 50, gY - 172, x, gY - 168); ctx.quadraticCurveTo(x + 50, gY - 172, x + 108, gY - 126); for (i = 0; i <= 14; i++) ctx.lineTo(x + 108 - i * 15.4, gY - 126 + (i % 2 ? 13 : 2)); ctx.closePath(); gxInk(2.6); ctx.stroke();
    gxPanel(x - 30, gY - 120, 60, 24, '#ff7a3a', { r: 8, lw: 2.2, vert: true }); gxBig('БАР', x, gY - 107, 17, '#fff7da', 'rgba(90,30,0,.55)');
    // гирлянда
    ctx.strokeStyle = '#3a2a18'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x - 100, gY - 120); ctx.quadraticCurveTo(x, gY - 98, x + 100, gY - 120); ctx.stroke();
    for (i = 0; i < 9; i++) { var f = (i + 0.5) / 9, bx2 = x - 100 + f * 200, by2 = gY - 120 + 4 * Math.sin(f * 3.14159) * 5 + 17 * f * (1 - f) * 2.2, bc2 = ['#ff6b6b', '#ffd23f', '#7dff9a', '#6bc4ff'][i % 4]; ctx.fillStyle = bc2; ctx.beginPath(); ctx.arc(bx2, by2, 3.4, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); if (nv) gxGlow(bx2, by2, 16, i % 4 === 0 ? '255,107,107' : (i % 4 === 1 ? '255,210,63' : (i % 4 === 2 ? '125,255,154' : '107,196,255')), 0.75); }
  }

function gxMUmbrella(x) {
    var i;
    gxShadow(x, gY + 4, 76, 0.8);
    // лежаки
    [[-38, 0], [34, 1]].forEach(function (q) {
      var lx = x + q[0]; gxPanel(lx - 26, gY - 14, 52, 7, q[1] ? '#3b9bff' : '#ff8a5a', { r: 3, lw: 1.8 });
      ctx.strokeStyle = '#7a4a22'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx - 22, gY - 8); ctx.lineTo(lx - 24, gY); ctx.moveTo(lx + 22, gY - 8); ctx.lineTo(lx + 24, gY); ctx.stroke();
      ctx.fillStyle = q[1] ? '#9fd0ff' : '#ffc0a0'; ctx.beginPath(); ctx.moveTo(lx + 22, gY - 14); ctx.lineTo(lx + 38, gY - 36); ctx.lineTo(lx + 28, gY - 38); ctx.lineTo(lx + 14, gY - 14); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
      ctx.fillStyle = '#fff'; for (var s = 0; s < 3; s++) ctx.fillRect(lx - 20 + s * 14, gY - 13, 6, 5);
    });
    gxTube([[x, gY - 2], [x, gY - 112]], 5, '#e6e1d4');
    var cols = ['#e5484d', '#fff', '#e5484d', '#fff', '#e5484d', '#fff'], ux = x - 66;
    ctx.beginPath(); ctx.moveTo(x - 68, gY - 84); ctx.quadraticCurveTo(x, gY - 144, x + 68, gY - 84); ctx.quadraticCurveTo(x + 34, gY - 94, x, gY - 84); ctx.quadraticCurveTo(x - 34, gY - 94, x - 68, gY - 84); ctx.closePath();
    ctx.fillStyle = '#fff'; ctx.fill(); ctx.save(); ctx.clip();
    for (i = 0; i < 6; i += 2) { ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.moveTo(x, gY - 118); ctx.lineTo(x - 68 + i * 22.7, gY - 80); ctx.lineTo(x - 68 + (i + 1) * 22.7, gY - 80); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(x - 20, gY - 108, 26, 5, -0.35, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(20,10,60,.16)'; ctx.fillRect(x + 20, gY - 130, 60, 50); ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 68, gY - 84); ctx.quadraticCurveTo(x, gY - 144, x + 68, gY - 84); ctx.quadraticCurveTo(x + 34, gY - 94, x, gY - 84); ctx.quadraticCurveTo(x - 34, gY - 94, x - 68, gY - 84); ctx.closePath(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x, gY - 124, 4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
  }

function gxMCastle(x) {
    gxShadow(x, gY + 4, 34, 0.7);
    var c1 = '#e9c982', c2 = '#c9a05a', i;
    function tower(tx, w, h) { gxPanel(tx - w / 2, gY - h, w, h + 1, c1, { lw: 1.8, tex: function (a, b, ww, hh) { ctx.fillStyle = 'rgba(120,80,20,.25)'; ctx.fillRect(a + ww * 0.6, b, ww * 0.4, hh); } }); for (var q = 0; q < 3; q++) gxPanel(tx - w / 2 + q * (w / 3), gY - h - 6, w / 3 - 1.5, 7, c2, { lw: 1.3 }); }
    tower(x, 28, 34); tower(x - 24, 16, 22); tower(x + 24, 16, 22);
    gxPanel(x - 6, gY - 20, 12, 20, '#7a5428', { r: 5, lw: 1.4 });
    ctx.strokeStyle = '#6a3a1c'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, gY - 40); ctx.lineTo(x, gY - 60); ctx.stroke(); ctx.fillStyle = '#ff5a5a'; ctx.beginPath(); ctx.moveTo(x, gY - 60); ctx.lineTo(x + 12, gY - 55); ctx.lineTo(x, gY - 50); ctx.fill(); gxInk(1.2); ctx.stroke();
    ctx.fillStyle = '#ff9a6a'; ctx.beginPath(); for (i = 0; i < 10; i++) { var a = i * 0.6283 - 1.57, rr = i % 2 ? 4 : 9; ctx.lineTo(x + 40 + Math.cos(a) * rr, gY + 6 + Math.sin(a) * rr * 0.8); } ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke();
  }

function gxMHammockBase(p1, p2) { // «привязь» к стволам (запекается)
    [p1, p2].forEach(function (p, q) { var pt = gxPalmPt(p, 82 / p.h); gxTube([[pt[0] + (q ? -8 : 8), pt[1]], [pt[0] + (q ? -12 : 12), pt[1] + 2]], 5, '#e5484d'); });
  }

function gxMHammock(x, p1, p2) {
    var a = gxPalmPt(p1, 82 / p1.h), b = gxPalmPt(p2, 82 / p2.h), sg = Math.sin(t * 1.2) * 4, i;
    var ax = a[0] + 10, ay = a[1] + 2, bx = b[0] - 10, by = b[1] + 2, mx = (ax + bx) / 2, my = (ay + by) / 2 + 34 + sg;
    gxShadow(mx, gY + 4, 80, 0.5);
    ctx.lineCap = 'round'; ctx.strokeStyle = GXI; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx, my + 20, bx, by); ctx.stroke();
    ctx.strokeStyle = '#ff6b8a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx, my + 20, bx, by); ctx.stroke();
    ctx.strokeStyle = '#ffd2dc'; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(ax, ay - 2); ctx.quadraticCurveTo(mx, my + 17, bx, by - 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(mx - 34, my + 3, 14, 6, -0.12, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
  }

function gxMBoard(x) {
    gxShadow(x, gY + 3, 52, 0.7);
    gxPanel(x - 36, gY - 82, 7, 82, '#7a4a22', { lw: 1.6 }); gxPanel(x + 29, gY - 82, 7, 82, '#7a4a22', { lw: 1.6 });
    gxPanel(x - 44, gY - 98, 88, 58, '#8a5a2c', { r: 5, lw: 2.4 }); gxPanel(x - 38, gY - 92, 76, 46, '#e8d3a2', { r: 3, lw: 1.6 });
    [[-30, -86, 20, 16, '#fff'], [-6, -88, 18, 20, '#ffd2dc'], [14, -86, 20, 14, '#cfe8ff'], [-26, -66, 16, 14, '#fff3a8'], [-4, -64, 22, 14, '#fff'], [22, -66, 12, 14, '#d9f6d2']].forEach(function (q) { ctx.fillStyle = q[4]; ctx.fillRect(x + q[0], gY + q[1], q[2], q[3]); gxInk(1); ctx.strokeRect(x + q[0], gY + q[1], q[2], q[3]); ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x + q[0] + q[2] / 2, gY + q[1] + 2, 1.8, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(30,30,60,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + q[0] + 3, gY + q[1] + 7); ctx.lineTo(x + q[0] + q[2] - 3, gY + q[1] + 7); ctx.moveTo(x + q[0] + 3, gY + q[1] + 11); ctx.lineTo(x + q[0] + q[2] - 6, gY + q[1] + 11); ctx.stroke(); });
  }

function gxMFish(x, y, len, col, flip, wag, st) {
    ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -len / 40 : len / 40, len / 40);
    var w = Math.sin(wag) * 3;
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(-30, -9 + w); ctx.lineTo(-28, 0); ctx.lineTo(-30, 9 + w); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.quadraticCurveTo(-4, -17, 20, -4); ctx.quadraticCurveTo(26, 2, 20, 6); ctx.quadraticCurveTo(0, 17, -20, 0); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-2, -7, 18, 5, 0, 0, 6.3); ctx.fill();
    if (st === 1) { ctx.fillStyle = '#fff'; ctx.fillRect(-6, -20, 5, 40); ctx.fillRect(8, -20, 4, 40); ctx.strokeStyle = GXI; ctx.lineWidth = 1; ctx.strokeRect(-6, -20, 5, 40); ctx.strokeRect(8, -20, 4, 40); }
    if (st === 2) { ctx.fillStyle = 'rgba(20,20,80,.45)'; ctx.fillRect(-8, -20, 8, 40); }
    ctx.fillStyle = 'rgba(30,20,80,.2)'; ctx.fillRect(-30, 3, 60, 20); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(13, -2, 3.4, 0, 6.3); ctx.fill(); ctx.fillStyle = '#13213a'; ctx.beginPath(); ctx.arc(14, -2, 1.7, 0, 6.3); ctx.fill();
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-6, -11); ctx.quadraticCurveTo(0, -20, 8, -10); ctx.fill(); ctx.restore();
  }

function gxMRack(x) {
    var i;
    gxShadow(x, gY + 3, 62, 0.7);
    gxTube([[x - 44, gY], [x - 44, gY - 92]], 6, '#8a5a2c'); gxTube([[x + 44, gY], [x + 44, gY - 92]], 6, '#8a5a2c'); gxTube([[x - 52, gY - 86], [x + 52, gY - 86]], 5, '#a8743c');
    for (i = 0; i < 6; i++) { var fx = x - 36 + i * 14.4; ctx.strokeStyle = '#d8c9a0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx, gY - 84); ctx.lineTo(fx, gY - 70); ctx.stroke(); gxMFish(fx, gY - 56 - (i % 2) * 6, 26, i % 3 === 0 ? '#c7d3de' : (i % 3 === 1 ? '#f0a45a' : '#9fc3d6'), false, 0, 0); ctx.save(); ctx.translate(fx, gY - 56 - (i % 2) * 6); ctx.rotate(1.57); ctx.restore(); }
    ctx.fillStyle = '#5a7a8a'; ctx.beginPath(); ctx.moveTo(x - 30, gY); ctx.quadraticCurveTo(x - 24, gY - 18, x, gY - 14); ctx.quadraticCurveTo(x + 26, gY - 20, x + 34, gY); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 1; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 24 + i * 10, gY - 1); ctx.lineTo(x - 18 + i * 10, gY - 14); ctx.stroke(); }
  }

function gxMBarrel(x, c) { gxShadow(x, gY + 3, 20, 0.7); gxPanel(x - 13, gY - 34, 26, 34, c || '#4a7a9a', { r: 6, lw: 2, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(a, b + 7, w, 3); ctx.fillRect(a, b + h - 11, w, 3); } }); }

function gxMNet(x) { ctx.fillStyle = '#6a8a9a'; ctx.beginPath(); ctx.ellipse(x, gY - 7, 17, 9, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.lineTo(x, gY); gxInk(1.8); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (var q = -12; q <= 12; q += 6) { ctx.beginPath(); ctx.moveTo(x + q, gY - 1); ctx.lineTo(x + q * 0.7, gY - 14); ctx.stroke(); } ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(x + 14, gY - 6, 3.6, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); }

function gxMBucket(x) {
    gxShadow(x, gY + 3, 34, 0.7);
    gxPanel(x - 12, gY - 26, 24, 26, '#3b7bff', { r: 3, lw: 2, vert: true }); gxPanel(x - 14, gY - 30, 28, 6, '#2a5ccf', { r: 3, lw: 1.8 });
    gxMFish(x - 4, gY - 32, 18, '#f0a45a', false, 0, 0); ctx.strokeStyle = '#d9d2c0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, gY - 30, 11, Math.PI, 0); ctx.stroke();
    [[22, 0.18, '#6a4a28'], [30, 0.3, '#8a5a2c']].forEach(function (q) { ctx.strokeStyle = GXI; ctx.lineWidth = 5.4; ctx.beginPath(); ctx.moveTo(x + q[0], gY); ctx.lineTo(x + q[0] + q[1] * 70, gY - 70); ctx.stroke(); ctx.strokeStyle = q[2]; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + q[0], gY); ctx.lineTo(x + q[0] + q[1] * 70, gY - 70); ctx.stroke(); });
  }

function gxMLamp(x, nv) {
    gxShadow(x, gY + 3, 18, 0.6);
    gxPanel(x - 3.5, gY - 112, 7, 112, '#7a4a22', { lw: 1.8 }); gxPanel(x - 3.5, gY - 112, 30, 5, '#6a3a1c', { lw: 1.6 });
    ctx.strokeStyle = '#3a2a18'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 22, gY - 108); ctx.lineTo(x + 22, gY - 98); ctx.stroke();
    var c = nv ? '#ffd986' : '#f4b562';
    ctx.fillStyle = gxLG(0, gY - 100, 0, gY - 74, c, '#ee8a3a'); ctx.beginPath(); ctx.ellipse(x + 22, gY - 86, 9, 13, 0, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.strokeStyle = 'rgba(120,50,10,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x + 22, gY - 86, 9, 5, 0, 0, 6.3); ctx.moveTo(x + 22, gY - 99); ctx.lineTo(x + 22, gY - 73); ctx.stroke();
    ctx.fillStyle = '#3a2a18'; ctx.fillRect(x + 17, gY - 101, 10, 3); ctx.fillRect(x + 17, gY - 74, 10, 3);
  }

function gxMFishHut(x, nv) {
    var i;
    gxShadow(x, gY + 4, 100, 0.85);
    gxPanel(x - 62, gY - 88, 124, 88, '#e9d4a2', { lw: 2.6, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(110,80,30,.35)'; ctx.lineWidth = 1.4; for (var q = 14; q < w; q += 14) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + h); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(a, b, 14, h); } });
    // кабина-прилавок
    gxPanel(x - 52, gY - 74, 62, 34, '#14283f', { r: 3, lw: 2.2 }); gxPanel(x - 56, gY - 42, 70, 9, '#7a4a22', { r: 3, lw: 2 });
    [[-44, '#c7d3de', 0], [-24, '#f0a45a', 1], [-4, '#9fc3d6', 0]].forEach(function (q) { gxMFish(x + q[0] + 4, gY - 48, 22, q[1], q[2] === 1, 0, 0); });
    gxPanel(x + 20, gY - 62, 30, 62, '#6a4a2b', { r: 3, lw: 2.4 }); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.arc(x + 26, gY - 30, 2.2, 0, 6.3); ctx.fill();
    // рифлёная крыша
    ctx.beginPath(); ctx.moveTo(x - 82, gY - 80); ctx.lineTo(x, gY - 134); ctx.lineTo(x + 82, gY - 80); ctx.lineTo(x + 82, gY - 70); ctx.lineTo(x - 82, gY - 70); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 134, 0, gY - 70, '#52b6d6', '#2f86a8', '#1d6483'); ctx.fill(); ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,40,70,.35)'; ctx.lineWidth = 1.6; for (i = -9; i <= 9; i++) { ctx.beginPath(); ctx.moveTo(x + i * 4, gY - 130 + Math.abs(i) * 2.4); ctx.lineTo(x + i * 9, gY - 70); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(x, gY - 134); ctx.lineTo(x - 82, gY - 80); ctx.lineTo(x - 54, gY - 80); ctx.lineTo(x, gY - 118); ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 82, gY - 80); ctx.lineTo(x, gY - 134); ctx.lineTo(x + 82, gY - 80); ctx.lineTo(x + 82, gY - 70); ctx.lineTo(x - 82, gY - 70); ctx.closePath(); gxInk(2.6); ctx.stroke();
    // полосатый навес
    for (i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#e5484d'; ctx.beginPath(); ctx.moveTo(x - 62 + i * 12.5, gY - 76); ctx.lineTo(x - 49.5 + i * 12.5, gY - 76); ctx.lineTo(x - 52 + i * 12.5, gY - 62); ctx.lineTo(x - 64 + i * 12.5, gY - 62); ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    gxPanel(x - 44, gY - 118, 88, 24, '#ffffff', { r: 7, lw: 2.4, vert: true }); gxBig('РЫБАК', x + 8, gY - 106, 15, '#1f4aa8', null); gxMFish(x - 28, gY - 106, 20, '#ff9a3a', false, 0, 0);
    // буи и сеть на стене
    [[58, '#e5484d'], [70, '#ffb020']].forEach(function (q) { ctx.fillStyle = q[1]; ctx.beginPath(); ctx.arc(x + q[0], gY - 40, 7, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x + q[0] - 7, gY - 42, 14, 3); });
    ctx.strokeStyle = '#6a3a1c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 64, gY - 70); ctx.lineTo(x + 64, gY - 46); ctx.stroke();
    ctx.fillStyle = '#ff7a3a'; ctx.beginPath(); ctx.arc(x - 70, gY - 56, 6, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    if (nv) gxGlow(x + 2, gY - 52, 120, '255,205,120', 0.45);
  }

function gxMPier(xa, xb, nv) {
    var a = Math.max(xa, LAG_X), b = xb, i, deep = gY + 24 + gxDown(), w = b - a;
    if (a >= b) return;
    ctx.fillStyle = gxLG(0, gY + 8, 0, deep, '#52d3e2', '#1fa7cc', '#0a6fa0'); ctx.fillRect(a, gY + 8, w, deep - gY - 8);
    // свет сквозь воду
    ctx.fillStyle = 'rgba(255,255,255,.1)'; for (i = Math.floor(a / 90) * 90; i < b; i += 90) { ctx.beginPath(); ctx.moveTo(i + 10, gY + 12); ctx.lineTo(i + 40, gY + 12); ctx.lineTo(i + 8, deep); ctx.lineTo(i - 40, deep); ctx.closePath(); ctx.fill(); }
    // тень под настилом
    ctx.fillStyle = gxLG(0, gY + 12, 0, gY + 44, 'rgba(0,50,90,.5)', 'rgba(0,50,90,0)'); ctx.fillRect(a, gY + 12, w, 32);
    // сваи
    for (i = Math.floor(a / 120); i * 120 < b; i++) {
      var px = i * 120 + 40; if (px < a - 8 || px > b + 8) continue;
      gxPanel(px - 6, gY + 8, 12, deep - gY, '#6a4528', { lw: 2, tex: function (aa, bb, ww, hh) { ctx.strokeStyle = 'rgba(30,14,4,.4)'; ctx.lineWidth = 1.4; for (var q = 8; q < hh; q += 14) { ctx.beginPath(); ctx.moveTo(aa, bb + q); ctx.lineTo(aa + ww, bb + q + 2); ctx.stroke(); } ctx.fillStyle = 'rgba(40,140,170,.4)'; ctx.fillRect(aa, bb + 54, ww, hh); } });
      ctx.strokeStyle = '#d9c9a0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 6, gY + 22); ctx.lineTo(px + 6, gY + 26); ctx.moveTo(px - 6, gY + 26); ctx.lineTo(px + 6, gY + 30); ctx.stroke();
    }
    // настил: верх + фасад
    gxPanel(a - 2, gY - 4, w + 4, 6, '#d6a468', { lw: 0, vert: true });
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(a, gY - 4, w, 2);
    ctx.fillStyle = gxLG(0, gY + 2, 0, gY + 14, '#8a5a30', '#5e3a1c'); ctx.fillRect(a, gY + 2, w, 12);
    ctx.strokeStyle = 'rgba(40,20,6,.55)'; ctx.lineWidth = 1.6; for (i = Math.floor(a / 36); i * 36 < b; i++) { var sx = i * 36; if (sx >= a) { ctx.beginPath(); ctx.moveTo(sx, gY - 4); ctx.lineTo(sx - 2, gY + 14); ctx.stroke(); } }
    ctx.strokeStyle = GXI; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(a, gY - 4); ctx.lineTo(b, gY - 4); ctx.moveTo(a, gY + 14); ctx.lineTo(b, gY + 14); ctx.stroke();
    // таблички мест на фасаде
    GXM_SLIPS.concat([[SUB_X, 'ПОДЛОДКА', '#2f86a8'], [BOAT_X, 'ЛОДКА', '#e5484d']]).forEach(function (s) {
      if (s[0] < a - 60 || s[0] > b + 60) return; gxPanel(s[0] - 34, gY + 1, 68, 12, '#14283f', { r: 3, lw: 1.4 }); gxText(s[1], s[0], gY + 7.5, 9, '#ffffff', null);
      var pw = s[1] === 'ПОДЛОДКА' ? 108 : (s[1] === 'ЛОДКА' ? 88 : 66);
      [-1, 1].forEach(function (sd) { var bx = s[0] + sd * pw; if (bx < a || bx > b - 2) return; gxPanel(bx - 4, gY - 14, 8, 18, '#5b3d22', { r: 2, lw: 1.6 }); gxPanel(bx - 5, gY - 17, 10, 5, '#e5484d', { r: 2, lw: 1.4 }); });
    });
    // берег: песчаный обрыв у начала пирса
    if (xa < LAG_X + 40) {
      ctx.beginPath(); ctx.moveTo(LAG_X - 40, gY - 3); ctx.lineTo(LAG_X + 2, gY - 3); ctx.lineTo(LAG_X + 2, deep); ctx.lineTo(LAG_X - 40, deep); ctx.closePath(); ctx.fillStyle = gxLG(0, gY, 0, deep, '#f1dca0', '#d4b070', '#a0763e'); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(LAG_X - 40, gY - 3, 42, 3);
      ctx.fillStyle = 'rgba(30,20,60,.2)'; ctx.fillRect(LAG_X - 6, gY + 14, 8, deep);
      ctx.strokeStyle = GXI; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(LAG_X + 2, gY - 3); ctx.lineTo(LAG_X + 2, deep); ctx.stroke();
    }
  }

function gxMGroundSand(xa, xb) {
    var e = Math.min(xb, LAG_X + 1); if (xa >= e) return;
    gxGround(xa, e, 'sand', 0);
    ctx.fillStyle = gxLG(0, gY - 3, 0, gY + 8, 'rgba(110,160,150,.35)', 'rgba(110,160,150,0)'); ctx.fillRect(xa, gY - 3, e - xa, 11);
  }

function gxMShrub(x, s, k) {
    var cs = [{ x: x - 14 * s, y: gY - 10 * s, r: 12 * s }, { x: x + 2 * s, y: gY - 16 * s, r: 15 * s }, { x: x + 16 * s, y: gY - 9 * s, r: 11 * s }];
    gxShadow(x, gY + 3, 28 * s, 0.6); gxBlob(cs, k % 2 ? '#4eae52' : '#3f9e5a', { lw: 2.2, seed: k });
    [[-10, -14], [8, -22], [14, -10]].forEach(function (q, qi) { ctx.fillStyle = (k + qi) % 2 ? '#ff6b9a' : '#ffd23f'; ctx.beginPath(); ctx.arc(x + q[0] * s, gY + q[1] * s, 3.6, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); });
  }

function gxMGrassTuft(x, k) { ctx.lineCap = 'round'; for (var b = -3; b <= 3; b++) { ctx.strokeStyle = b % 2 ? '#6bbb42' : '#4a9a34'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x + b * 3, gY + 2); ctx.quadraticCurveTo(x + b * 4, gY - 12, x + b * 7 + (k % 3) * 2, gY - 20 + Math.abs(b) * 2.4); ctx.stroke(); } }

function gxMCoconut(x, k) { gxShadow(x, gY + 5, 14, 0.5); ctx.fillStyle = '#7a4a22'; ctx.beginPath(); ctx.ellipse(x, gY + 5, 9, 6.4, 0.2, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#2a160a'; [[-3, 3], [1, 2.4], [-1, 6.4]].forEach(function (q) { ctx.beginPath(); ctx.arc(x + q[0], gY + q[1], 1, 0, 6.3); ctx.fill(); }); }

function gxMShell(x, k) {
    ctx.save(); ctx.translate(x, gY + 6); ctx.fillStyle = k % 2 ? '#ff9a6a' : '#fff1e4';
    if (k % 3 === 0) { ctx.beginPath(); for (var i = 0; i < 10; i++) { var a = i * 0.6283 - 1.57, rr = i % 2 ? 3.6 : 8.5; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.75); } ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    else { ctx.beginPath(); ctx.ellipse(0, 0, 8, 5.4, 0, Math.PI, 0); ctx.fill(); gxInk(1.3); ctx.stroke(); ctx.strokeStyle = 'rgba(120,70,40,.5)'; ctx.lineWidth = 1; ctx.beginPath(); for (var q = -4; q <= 4; q += 2.7) { ctx.moveTo(0, 0); ctx.lineTo(q, -5); } ctx.stroke(); }
    ctx.restore();
  }

function gxMCrab(x, y, dr, mv) {
    var lg = mv ? Math.sin(t * 14 + x) * 2 : 0;
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#a83a22'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    for (var s = -1; s <= 1; s += 2) for (var q = 0; q < 3; q++) { ctx.beginPath(); ctx.moveTo(s * 5, -1 + q); ctx.lineTo(s * (11 + q * 2), -3 + q * 2 + (q % 2 ? lg : -lg)); ctx.lineTo(s * (14 + q * 2), 2 + q); ctx.stroke(); }
    ctx.fillStyle = '#ee5a3a'; ctx.beginPath(); ctx.ellipse(0, -2, 9, 6, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(-2, -4.5, 4.5, 1.8, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#ee5a3a'; [-1, 1].forEach(function (s2) { ctx.beginPath(); ctx.arc(s2 * 12, -9 + Math.sin(t * 3 + s2) * 1.5, 4.2, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.strokeStyle = '#a83a22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s2 * 7, -4); ctx.lineTo(s2 * 11, -8); ctx.stroke(); });
    ctx.fillStyle = '#fff'; [-3, 3].forEach(function (ex) { ctx.beginPath(); ctx.arc(ex, -8, 2, 0, 6.3); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(ex, -8, 0.9, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; });
    ctx.restore();
  }

function gxMBoatHD(x, by, sc, col, flip) {
    ctx.save(); ctx.translate(x, by); ctx.scale(flip ? -sc : sc, sc);
    ctx.fillStyle = '#3a3f4a'; ctx.fillRect(-98, -22, 12, 28); gxInk(1.6); ctx.strokeRect(-98, -22, 12, 28); ctx.fillStyle = '#9aa3b0'; ctx.fillRect(-96, -20, 8, 5);
    ctx.beginPath(); ctx.moveTo(-86, -14); ctx.quadraticCurveTo(0, -10, 90, -24); ctx.quadraticCurveTo(100, -2, 62, 22); ctx.lineTo(-56, 28); ctx.quadraticCurveTo(-90, 24, -86, -14); ctx.closePath();
    ctx.fillStyle = gxLG(0, -22, 0, 28, shadeC(col, 0.25), col, shadeC(col, -0.3)); ctx.fill(); ctx.save(); ctx.clip();
    ctx.fillStyle = '#fff'; ctx.fillRect(-100, -4, 210, 5); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-100, -20, 210, 4); ctx.fillStyle = 'rgba(20,10,60,.2)'; ctx.fillRect(-100, 14, 210, 20); ctx.restore();
    gxInk(2.4); ctx.beginPath(); ctx.moveTo(-86, -14); ctx.quadraticCurveTo(0, -10, 90, -24); ctx.quadraticCurveTo(100, -2, 62, 22); ctx.lineTo(-56, 28); ctx.quadraticCurveTo(-90, 24, -86, -14); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = '#8a5a2c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-86, -14); ctx.quadraticCurveTo(0, -10, 90, -24); ctx.stroke();
    // консоль со стеклом
    gxPanel(-26, -34, 34, 22, '#f3f6fb', { r: 4, lw: 2 }); gxPanel(-21, -31, 24, 12, '#7fd0f0', { r: 2, lw: 1.4, vert: true });
    ctx.strokeStyle = '#4a5360'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-40, -14); ctx.lineTo(-40, -30); ctx.moveTo(32, -17); ctx.lineTo(32, -28); ctx.stroke();
    ctx.strokeStyle = '#e5484d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(52, -6, 8, 0, 6.3); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.setLineDash([5, 9]); ctx.beginPath(); ctx.arc(52, -6, 8, 0, 6.3); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }

function gxMWaterline(x, by, w) {
    ctx.fillStyle = 'rgba(40,170,215,.62)'; ctx.fillRect(x - w, by + 6, w * 2, 22);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; for (var q = -3; q <= 3; q++) { ctx.beginPath(); ctx.ellipse(x + q * w / 3.4 + Math.sin(t * 2.6 + q) * 4, by + 6, w / 7, 2.8, 0, 0, 6.3); ctx.fill(); }
  }

function gxMUnder(x0, x1, nv) {
    var i, a = Math.max(x0, LAG_X);
    // лодки в слотах
    GXM_SLIPS.forEach(function (s, q) {
      if (s[0] < x0 - 90 || s[0] > x1 + 90) return; var by = gY + 38 + Math.sin(t * 2 + q * 1.7) * 2.2;
      gxMBoatHD(s[0], by, 0.62, s[2], q === 1); gxMWaterline(s[0], by, 60);
      ctx.strokeStyle = '#d9c9a0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s[0] - 30, by - 8); ctx.quadraticCurveTo(s[0] - 50, by + 2, s[0] - 66, gY + 16); ctx.stroke();
    });
    // косяки и рыбки (зациклены внутри лагуны, на песок не заплывают)
    var span = WORLD_W - LAG_X - 80;
    for (var k = 0; k < 6; k++) {
      var h = gxH(k * 5 + 9), sp = 14 + h * 16, dir = (k % 2) ? 1 : -1, fx = LAG_X + 40 + ((((k * 331 + t * sp * dir) % span) + span) % span), fy = gY + 44 + (k * 23) % 40 + Math.sin(t * 1.4 + k) * 3;
      if (fx < x0 - 60 || fx > x1 + 60) continue;
      if (h < 0.34) { gxMFish(fx, fy, 30, '#ff9a3a', dir < 0, t * 9 + k, 1); }
      else if (h < 0.67) { gxMFish(fx, fy, 28, '#4aa8ff', dir < 0, t * 9 + k, 2); }
      else { for (var j = 0; j < 7; j++) { var qx = fx + (j % 4) * 12 * -dir + Math.sin(t * 3 + j) * 2, qy = fy - 10 + Math.floor(j / 4) * 11 + Math.sin(t * 2 + j * 1.3) * 2; gxMFish(qx, qy, 11, '#cfe6f6', dir < 0, t * 12 + j, 0); } }
    }
    // тени крупных рыб
    for (i = 0; i < 6; i++) { var ex = LAG_X + 30 + ((i * 311 + t * (14 + i % 3 * 7)) % (WORLD_W - LAG_X - 60)), ey = gY + 52 + (i * 29) % 40; if (ex > x1 + 40 || ex < x0 - 40) continue; ctx.fillStyle = 'rgba(8,60,110,.26)'; ctx.beginPath(); ctx.ellipse(ex, ey, 22, 7, 0, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.moveTo(ex - 20, ey); ctx.lineTo(ex - 32, ey - 7); ctx.lineTo(ex - 32, ey + 7); ctx.fill(); }
    // морская черепаха
    var tp = 2440 + ((t * 11) % 2000) * 0.0 + (Math.sin(t * 0.09) * 0.5 + 0.5) * 1700, tdr = Math.cos(t * 0.09) > 0 ? 1 : -1;
    if (tp > x0 - 60 && tp < x1 + 60) {
      ctx.save(); ctx.translate(tp, gY + 66 + Math.sin(t * 1.1) * 3); ctx.scale(tdr, 1);
      var fl = Math.sin(t * 2.4) * 0.35;
      ctx.fillStyle = '#6aa86a'; [[-4, -10, -0.7], [-4, 10, 0.7]].forEach(function (q) { ctx.save(); ctx.translate(q[0] + 6, q[1] * 0.4); ctx.rotate(q[2] * 0.4 + fl * (q[1] > 0 ? 1 : -1)); ctx.beginPath(); ctx.ellipse(4, 0, 16, 4.4, q[2] * 0.4, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.restore(); });
      ctx.beginPath(); ctx.ellipse(-20, 2, 7, 3, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(26, -1, 9, 7, 0, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(29, -3, 2, 0, 6.3); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(30, -3, 1, 0, 6.3); ctx.fill();
      ctx.fillStyle = gxLG(0, -16, 0, 12, '#9bd86a', '#58a04a', '#3a7a3a'); ctx.beginPath(); ctx.ellipse(0, 0, 26, 14, 0, 0, 6.3); ctx.fill(); gxInk(2.2); ctx.stroke();
      ctx.strokeStyle = 'rgba(20,70,30,.5)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.moveTo(-6, -11); ctx.lineTo(-6, 11); ctx.moveTo(6, -10); ctx.lineTo(6, 10); ctx.stroke();
      ctx.restore();
    }
    // пузырьки и блики у свай
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    for (i = Math.floor(a / 120); i * 120 < x1; i++) { var px = i * 120 + 40; if (px < x0 - 10) continue; ctx.beginPath(); ctx.ellipse(px, gY + 15 + Math.sin(t * 2.2 + i) * 1.2, 14, 3.2, 0, 0, 6.3); ctx.fill(); var bb = (t * 0.5 + i * 0.31) % 1; ctx.beginPath(); ctx.arc(px + 12 + Math.sin(t * 2 + i) * 3, gY + 80 - bb * 50, 2 + (i % 2), 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = 1.6; for (i = Math.floor(a / 80); i * 80 < x1; i++) for (var w = 0; w < 3; w++) { var wx = i * 80 + w * 27 + Math.sin(t + i + w) * 8, wy = gY + 52 + w * 18; if (wx > a) { ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 12, wy - 4, wx + 26, wy); ctx.stroke(); } }
    // буи
    for (i = 2450; i < WORLD_W; i += 520) { if (i < x0 - 20 || i > x1 + 20) continue; var bo = Math.sin(t * 2 + i) * 3; ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.arc(i, gY + 32 + bo, 8, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(i - 8, gY + 30 + bo, 16, 3); }
  }

function gxAirFence(xa, xb) {
    var i, y0 = gY - 50;
    ctx.fillStyle = gxLG(0, y0 - 6, 0, gY - 3, '#7fc46a', '#4f9e48'); ctx.fillRect(xa, y0 - 6, xb - xa, gY - 3 - y0 + 6);
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(xa, y0 - 6, xb - xa, 2);
    ctx.strokeStyle = 'rgba(210,235,225,.34)'; ctx.lineWidth = 1; ctx.beginPath();
    for (i = Math.floor(xa / 14) * 14 - 60; i < xb + 60; i += 14) { ctx.moveTo(i, y0); ctx.lineTo(i + 36, gY - 3); ctx.moveTo(i + 36, y0); ctx.lineTo(i, gY - 3); }
    ctx.save(); ctx.beginPath(); ctx.rect(xa, y0, xb - xa, gY - 3 - y0); ctx.clip(); ctx.stroke(); ctx.restore();
    ctx.fillStyle = '#7b8494'; for (i = Math.floor(xa / 110) * 110; i < xb + 8; i += 110) { ctx.fillRect(i - 2.5, y0 - 4, 5, gY - 3 - y0 + 4); ctx.fillStyle = '#c0c8d6'; ctx.fillRect(i - 2.5, y0 - 4, 1.5, gY - 3 - y0 + 4); ctx.fillStyle = '#7b8494'; }
    ctx.fillStyle = '#7b8494'; ctx.fillRect(xa, y0 - 4, xb - xa, 3); ctx.fillRect(xa, gY - 6, xb - xa, 3);
    ctx.strokeStyle = 'rgba(40,46,60,.75)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (i = Math.floor(xa / 16) * 16; i < xb; i += 16) { ctx.moveTo(i, y0 - 6); ctx.lineTo(i + 8, y0 - 12); ctx.lineTo(i + 16, y0 - 6); } ctx.stroke();
    ctx.strokeStyle = GXI; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(xa, y0 - 4); ctx.lineTo(xb, y0 - 4); ctx.stroke();
  }

function gxAirGround(xa, xb, nv) {
    var w = xb - xa, i, deep = gY + 22 + gxDown();
    gxAirFence(xa, xb);
    // бетонная кромка и перрон
    ctx.fillStyle = gxLG(0, gY - 3, 0, gY + 20, '#c6ccd6', '#9aa2b0'); ctx.fillRect(xa, gY - 3, w, 23);
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(xa, gY - 3, w, 2.5);
    ctx.strokeStyle = 'rgba(60,70,90,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (i = Math.floor(xa / 82) * 82; i < xb; i += 82) { ctx.moveTo(i, gY - 3); ctx.lineTo(i - 2, gY + 20); } ctx.stroke();
    ctx.fillStyle = '#f4f1c8'; for (i = Math.floor(xa / 120) * 120; i < xb; i += 120) { gxRR(i, gY + 8, 60, 4.4, 2); ctx.fill(); }
    ctx.fillStyle = '#5a606c'; ctx.fillRect(xa, gY + 20, w, 4);
    // асфальт
    ctx.fillStyle = gxLG(0, gY + 22, 0, deep, '#59606c', '#3a3f4a', '#23262e'); ctx.fillRect(xa, gY + 22, w, deep - gY - 22);
    ctx.fillStyle = '#e8b830'; for (i = Math.floor(xa / 60) * 60; i < xb; i += 60) ctx.fillRect(i, gY + 27, 26, 3.4);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; for (i = Math.floor(xa / 97) * 97; i < xb; i += 97) { var hh = gxH(i * 3 + 1); ctx.beginPath(); ctx.ellipse(i + hh * 40, gY + 44 + hh * 40, 20 + hh * 24, 2.4, 0, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(10,12,18,.4)'; ctx.lineWidth = 1.2; for (i = Math.floor(xa / 330) * 330; i < xb; i += 330) { var cx = i + 90 + gxH(i) * 120, cy = gY + 50 + gxH(i + 1) * 30; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 14, cy + 4); ctx.lineTo(cx + 22, cy - 1); ctx.lineTo(cx + 40, cy + 5); ctx.stroke(); }
    // полоса ВПП: номера и порог
    [[3900, '09'], [7000, '27']].forEach(function (m) {
      if (m[0] < xa - 160 || m[0] > xb + 160) return;
      ctx.fillStyle = 'rgba(244,241,200,.92)'; ctx.font = '40px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(m[1], m[0], gY + 42);
      for (var q = -3; q <= 3; q++) ctx.fillRect(m[0] + q * 22 - 5, gY + 60, 10, 26);
      ctx.fillStyle = 'rgba(0,0,0,.2)'; for (var r = 0; r < 5; r++) ctx.fillRect(m[0] - 80 + r * 34, gY + 92, 22, 2);
    });
    if (xb > 3700) { ctx.fillStyle = 'rgba(244,241,200,.55)'; for (i = Math.max(3700, Math.floor(xa / 200) * 200); i < xb && i < 7200; i += 200) { gxRR(i, gY + 68, 90, 5, 2); ctx.fill(); } }
    ctx.fillStyle = gxLG(0, deep - 60, 0, deep, 'rgba(0,0,0,0)', 'rgba(5,6,16,.5)'); ctx.fillRect(xa, deep - 60, w, 60);
  }

function gxAirHangar(x, hw, label, col) {
    var i, h = 150, c1 = col || '#8c97a8';
    gxShadow(x, gY + 5, hw + 24, 0.8);
    ctx.beginPath(); ctx.moveTo(x - hw, gY); ctx.lineTo(x - hw, gY - h * 0.55); ctx.quadraticCurveTo(x, gY - h * 1.75, x + hw, gY - h * 0.55); ctx.lineTo(x + hw, gY); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - h * 1.2, 0, gY, shadeC(c1, 0.22), c1, shadeC(c1, -0.25)); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(30,40,60,.3)'; ctx.lineWidth = 2; for (i = -hw + 14; i < hw; i += 17) { ctx.beginPath(); ctx.moveTo(x + i, gY); ctx.lineTo(x + i, gY - h * 1.6); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1.4; for (i = -hw + 15.5; i < hw; i += 17) { ctx.beginPath(); ctx.moveTo(x + i, gY); ctx.lineTo(x + i, gY - h * 1.6); ctx.stroke(); }
    ctx.fillStyle = 'rgba(20,10,60,.2)'; ctx.fillRect(x + hw * 0.5, gY - h * 1.6, hw, h * 1.7);
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - hw, gY); ctx.lineTo(x - hw, gY - h * 0.55); ctx.quadraticCurveTo(x, gY - h * 1.75, x + hw, gY - h * 0.55); ctx.lineTo(x + hw, gY); ctx.closePath(); gxInk(2.8); ctx.stroke();
    gxPanel(x - hw, gY - 10, hw * 2, 10, '#5a6573', { lw: 2.2 });
    var dw = hw * 1.05; gxPanel(x - dw / 2, gY - h * 0.78, dw, h * 0.78 - 10, '#1b222c', { r: 3, lw: 2.6, vert: true });
    ctx.strokeStyle = 'rgba(160,190,230,.25)'; ctx.lineWidth = 2; for (i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - dw / 2 + i * dw / 6, gY - h * 0.78); ctx.lineTo(x - dw / 2 + i * dw / 6, gY - 10); ctx.stroke(); }
    ctx.fillStyle = '#ffd23f'; for (i = 0; i < 10; i++) { ctx.fillRect(x - dw / 2 + i * dw / 10, gY - 22, dw / 20, 5); }
    gxPanel(x - 62, gY - h * 1.2 - 8, 124, 32, '#1b2638', { r: 8, lw: 2.4 }); gxBig(label, x, gY - h * 1.2 + 8, 19, '#ffd23f', null);
  }

function gxAirTerminal(x, nv) {
    var w = 760, h = 200, L0 = x - w / 2, i, c;
    gxShadow(x, gY + 5, 400, 0.85);
    gxPanel(L0, gY - h, w, h + 3, '#e4e9f1', { lw: 2.8, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(80,96,120,.18)'; ctx.lineWidth = 1.2; for (var q = 0; q < hh; q += 22) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + ww, b + q); ctx.stroke(); } } });
    // стеклянный фасад
    for (c = 0; c < 12; c++) {
      var wx = L0 + 16 + c * 61, wy = gY - h + 38;
      if (Math.abs(wx + 25 - x) < 66) continue;
      ctx.fillStyle = nv ? gxLG(0, wy, 0, wy + 104, '#ffe6a8', '#ffc66a') : gxLG(0, wy, 0, wy + 104, '#cdeeff', '#74bde6', '#3f87c0'); ctx.fillRect(wx, wy, 50, 104);
      if (nv) gxGlow(wx + 25, wy + 52, 50, '255,214,140', 0.35);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(wx, wy + 104); ctx.lineTo(wx + 22, wy); ctx.lineTo(wx + 34, wy); ctx.lineTo(wx + 12, wy + 104); ctx.fill();
      ctx.strokeStyle = '#4a5468'; ctx.lineWidth = 2.4; ctx.strokeRect(wx, wy, 50, 104); ctx.beginPath(); ctx.moveTo(wx, wy + 52); ctx.lineTo(wx + 50, wy + 52); ctx.moveTo(wx + 25, wy); ctx.lineTo(wx + 25, wy + 104); ctx.stroke();
      ctx.fillStyle = 'rgba(20,30,60,.3)'; ctx.fillRect(wx + 8, wy + 86, 10, 18); ctx.fillRect(wx + 26, wy + 90, 9, 14);
    }
    // козырёк-крыша
    gxPanel(L0 - 16, gY - h - 14, w + 32, 16, '#c0c9d8', { r: 4, lw: 2.4, vert: true }); gxPanel(L0 - 16, gY - h + 2, w + 32, 7, '#8f9bb0', { r: 3, lw: 1.8 });
    ctx.fillStyle = '#9aa6b8'; gxRR(L0 + 60, gY - h - 28, 60, 14, 3); ctx.fill(); gxInk(1.6); ctx.stroke(); gxRR(L0 + 600, gY - h - 26, 70, 12, 3); ctx.fill(); ctx.stroke();
    // вход
    gxPanel(x - 62, gY - 98, 124, 98, '#2f3a50', { r: 4, lw: 2.6 });
    ctx.fillStyle = nv ? gxLG(0, gY - 90, 0, gY, '#ffe9b0', '#ffc66a') : gxLG(0, gY - 90, 0, gY, '#d9f2ff', '#7fc0e6'); ctx.fillRect(x - 54, gY - 90, 52, 90); ctx.fillRect(x + 2, gY - 90, 52, 90);
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(x - 54, gY); ctx.lineTo(x - 36, gY - 90); ctx.lineTo(x - 26, gY - 90); ctx.lineTo(x - 44, gY); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 2, gY); ctx.lineTo(x + 20, gY - 90); ctx.lineTo(x + 30, gY - 90); ctx.lineTo(x + 12, gY); ctx.fill();
    ctx.strokeStyle = '#2f3a50'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gY - 98); ctx.lineTo(x, gY); ctx.stroke();
    gxPanel(x - 86, gY - 112, 172, 18, '#1f6ad8', { r: 6, lw: 2.2, vert: true }); gxBig('ВХОД', x, gY - 103, 12, '#ffffff', null);
    for (i = -1; i <= 1; i += 2) { gxPanel(x + i * 94 - 8, gY - 26, 16, 26, '#8a5a30', { r: 3, lw: 1.8 }); gxBlob([{ x: x + i * 94, y: gY - 36, r: 11 }, { x: x + i * 94 - 7, y: gY - 30, r: 8 }, { x: x + i * 94 + 7, y: gY - 30, r: 8 }], '#4fae52', { lw: 2, seed: i + 4 }); }
    // вывеска
    gxPanel(x - 140, gY - h - 74, 280, 52, '#1f4aa8', { r: 10, lw: 2.8, vert: true }); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; gxRR(x - 134, gY - h - 68, 268, 40, 7); ctx.stroke();
    ctx.shadowColor = '#bfe0ff'; ctx.shadowBlur = nv ? 14 : 0; gxBig('АЭРОПОРТ', x + 18, gY - h - 48, 25, '#ffffff', null); ctx.shadowBlur = 0;
    var ix = x - 100, iy = gY - h - 47; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(ix, iy, 17, 4.6, -0.4, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.moveTo(ix - 3, iy - 2); ctx.lineTo(ix - 12, iy - 17); ctx.lineTo(ix - 5, iy - 17); ctx.lineTo(ix + 6, iy - 3); ctx.fill(); ctx.beginPath(); ctx.moveTo(ix - 12, iy + 3); ctx.lineTo(ix - 20, iy - 6); ctx.lineTo(ix - 15, iy - 6); ctx.lineTo(ix - 5, iy + 2); ctx.fill();
    gxPanel(x - 142, gY - h - 22, 6, 22, '#6a7384', { lw: 1.4 }); gxPanel(x + 136, gY - h - 22, 6, 22, '#6a7384', { lw: 1.4 });
    // Wi-Fi наклейка
    gxPanel(x + 100, gY - 70, 86, 36, '#173c63', { r: 7, lw: 2 }); ctx.strokeStyle = '#7fe0ff'; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; for (i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(x + 120, gY - 46, i * 6, -2.2, -0.94); ctx.stroke(); } ctx.fillStyle = '#7fe0ff'; ctx.beginPath(); ctx.arc(x + 120, gY - 46, 2, 0, 6.3); ctx.fill();
    gxText('Wi-Fi', x + 156, gY - 58, 11, '#ffffff', null); gxText('бесплатно', x + 156, gY - 44, 9.5, '#bfe9ff', null);
    if (nv) gxGlow(x, gY - 60, 360, '255,214,140', 0.35);
  }

function gxAirTower(x, nv) {
    var i;
    gxShadow(x, gY + 5, 60, 0.85);
    gxPanel(x - 38, gY - 40, 76, 40, '#c2cad8', { r: 3, lw: 2.4 }); gxPanel(x - 14, gY - 28, 28, 28, '#5a6679', { r: 3, lw: 2 });
    ctx.beginPath(); ctx.moveTo(x - 20, gY - 38); ctx.lineTo(x - 13, gY - 262); ctx.lineTo(x + 13, gY - 262); ctx.lineTo(x + 20, gY - 38); ctx.closePath();
    ctx.fillStyle = gxLG(x - 20, 0, x + 20, 0, '#eef2f8', '#bcc6d6', '#8590a4'); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = 'rgba(40,50,80,.35)'; for (i = 0; i < 6; i++) ctx.fillRect(x - 3, gY - 70 - i * 32, 6, 14);
    ctx.fillStyle = '#d8362f'; for (i = 0; i < 3; i++) ctx.fillRect(x - 17 + i * 1.5, gY - 80 - i * 64, 34 - i * 3, 9);
    // кабина диспетчера
    ctx.beginPath(); ctx.moveTo(x - 30, gY - 262); ctx.lineTo(x - 44, gY - 300); ctx.lineTo(x + 44, gY - 300); ctx.lineTo(x + 30, gY - 262); ctx.closePath(); ctx.fillStyle = '#8a95a8'; ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 26, gY - 266); ctx.lineTo(x - 38, gY - 296); ctx.lineTo(x + 38, gY - 296); ctx.lineTo(x + 26, gY - 266); ctx.closePath();
    ctx.fillStyle = nv ? gxLG(0, gY - 296, 0, gY - 266, '#fff0b8', '#ffc66a') : gxLG(0, gY - 296, 0, gY - 266, '#bff0ff', '#4fb0dc'); ctx.fill(); ctx.strokeStyle = '#4a5468'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = '#4a5468'; ctx.lineWidth = 2; ctx.beginPath(); for (i = -1; i <= 1; i++) { ctx.moveTo(x + i * 20 - i * 4, gY - 266); ctx.lineTo(x + i * 22, gY - 296); } ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x - 30, gY - 270); ctx.lineTo(x - 18, gY - 294); ctx.lineTo(x - 8, gY - 294); ctx.lineTo(x - 20, gY - 270); ctx.fill();
    gxPanel(x - 50, gY - 306, 100, 8, '#5a6679', { r: 3, lw: 2 });
    gxTube([[x, gY - 306], [x, gY - 340]], 4, '#d8362f');
    if (nv) gxGlow(x, gY - 282, 90, '255,210,130', 0.5);
  }

function gxAirTowerAnim(x, nv) {
    var a = t * 1.6;
    ctx.save(); ctx.translate(x + 26, gY - 318); ctx.strokeStyle = GXI; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(0, 0); ctx.stroke();
    var sw = Math.cos(a); ctx.fillStyle = '#e8edf4'; ctx.beginPath(); ctx.ellipse(0, -2, 17 * Math.abs(sw) + 3, 4.6, -0.2, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.restore();
    var on = Math.sin(t * 4) > 0; ctx.fillStyle = on ? '#ff5a5f' : '#6a2a2a'; ctx.beginPath(); ctx.arc(x, gY - 344, 4, 0, 6.3); ctx.fill(); if (on) gxGlow(x, gY - 344, 36, '255,90,95', 0.9);
  }

function gxAirStairs(x) {
    gxShadow(x, gY + 4, 56, 0.7);
    gxPanel(x - 38, gY - 22, 76, 14, '#e8b830', { r: 3, lw: 2 }); gxPanel(x - 38, gY - 28, 30, 8, '#c99a20', { r: 2, lw: 1.6 });
    [[-26, 0], [26, 0]].forEach(function (q) { ctx.fillStyle = '#23262e'; ctx.beginPath(); ctx.arc(x + q[0], gY - 6, 8, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#9aa4b4'; ctx.beginPath(); ctx.arc(x + q[0], gY - 6, 3, 0, 6.3); ctx.fill(); });
    ctx.beginPath(); ctx.moveTo(x - 30, gY - 22); ctx.lineTo(x + 30, gY - 78); ctx.lineTo(x + 40, gY - 78); ctx.lineTo(x + 40, gY - 22); ctx.closePath(); ctx.fillStyle = '#b8c2d2'; ctx.fill(); gxInk(2); ctx.stroke();
    ctx.strokeStyle = 'rgba(40,50,70,.5)'; ctx.lineWidth = 1.5; for (var i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 30 + i * 10, gY - 22 - i * 9.3 + 9); ctx.lineTo(x - 22 + i * 10, gY - 22 - i * 9.3 + 9); ctx.stroke(); }
    gxPanel(x + 26, gY - 84, 22, 8, '#8a95a8', { r: 2, lw: 1.8 }); gxTube([[x - 30, gY - 40], [x + 28, gY - 94]], 3, '#e5484d');
  }

function gxAirBag(x) {
    gxShadow(x, gY + 4, 72, 0.7);
    // тягач
    gxPanel(x - 62, gY - 26, 34, 18, '#e5484d', { r: 5, lw: 2, vert: true }); gxPanel(x - 52, gY - 40, 18, 16, '#ffd23f', { r: 3, lw: 1.8 }); ctx.fillStyle = 'rgba(190,235,255,.85)'; ctx.fillRect(x - 49, gY - 37, 12, 9);
    // тележки
    [0, 1].forEach(function (q) {
      var cx = x - 18 + q * 44; gxPanel(cx, gY - 24, 40, 12, '#7a8498', { r: 3, lw: 1.8 }); [[6, '#e5484d'], [20, '#3b9bff'], [30, '#ffb020']].forEach(function (b, bi) { gxPanel(cx + b[0] - 5, gY - 38 + (bi % 2) * 3, 12, 14 - (bi % 2) * 3, b[1], { r: 2, lw: 1.5 }); });
      ctx.strokeStyle = '#4a5360'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(cx - 6, gY - 18); ctx.lineTo(cx + 2, gY - 18); ctx.stroke();
    });
    [-54, -34, 6, 26, 50, 70].forEach(function (wx) { ctx.fillStyle = '#23262e'; ctx.beginPath(); ctx.arc(x + wx, gY - 6, 5.6, 0, 6.3); ctx.fill(); gxInk(1.3); ctx.stroke(); });
  }

function gxAirPump(X) {
    var p = (typeof avPrice === 'function') ? avPrice() : '';
    gxShadow(X, gY + 3, 48, 0.8);
    gxPanel(X - 32, gY - 6, 64, 6, '#8a929e', { lw: 1.8 });
    gxPanel(X - 21, gY - 78, 42, 72, '#d9262c', { r: 7, lw: 2.4, vert: true }); gxPanel(X - 15, gY - 70, 30, 22, '#14233f', { r: 3, lw: 1.8 }); gxText(String(p), X, gY - 59, 10.5, '#7dff9a', null);
    gxPanel(X - 16, gY - 42, 32, 6, '#f2f5f9', { r: 2, lw: 1.2 }); gxPanel(X - 14, gY - 34, 28, 22, '#a81a20', { r: 3, lw: 1.5 });
    gxTube([[X + 21, gY - 50], [X + 38, gY - 46], [X + 40, gY - 22]], 4, '#23262e'); gxPanel(X + 36, gY - 24, 8, 12, '#4a5360', { r: 2, lw: 1.4 });
    gxPanel(X - 46, gY - 122, 92, 30, '#14233f', { r: 7, lw: 2.2, vert: true }); gxText('АВИАТОПЛИВО', X, gY - 112, 11.5, '#ffe14a', null); gxText(String(p) + ' за л', X, gY - 98, 11, '#ffffff', null);
    gxTube([[X, gY - 92], [X, gY - 80]], 3, '#4a5360');
  }

function gxAirTank(x) {
    gxShadow(x, gY + 5, 120, 0.8);
    [[-52, 82], [46, 70]].forEach(function (q) {
      var tx = x + q[0], hh = q[1], r = 40;
      gxPanel(tx - r, gY - hh, r * 2, hh, '#eef2f8', { lw: 2.4, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(40,60,100,.1)'; ctx.fillRect(a + w * 0.62, b, w * 0.38, h); ctx.strokeStyle = 'rgba(80,100,130,.3)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(a, b + h * 0.5); ctx.lineTo(a + w, b + h * 0.5); ctx.stroke(); } });
      ctx.fillStyle = gxLG(tx - r, 0, tx + r, 0, '#fff', '#dce3ee', '#a2adc0'); ctx.beginPath(); ctx.ellipse(tx, gY - hh, r, 11, 0, 0, 6.3); ctx.fill(); gxInk(2.2); ctx.stroke();
      ctx.fillStyle = '#e5484d'; ctx.fillRect(tx - r + 1, gY - hh * 0.62, r * 2 - 2, 8); gxPanel(tx - 3, gY - hh - 12, 6, 12, '#6a7384', { lw: 1.4 });
    });
    gxTube([[x - 52, gY - 40], [x - 52, gY - 18], [x + 46, gY - 18], [x + 46, gY - 30]], 4, '#8a95a8');
  }

function gxAirBeacon(x) { gxShadow(x, gY + 3, 30, 0.7); gxTube([[x - 14, gY], [x - 3, gY - 128]], 4, '#d8362f'); gxTube([[x + 14, gY], [x + 3, gY - 128]], 4, '#e8edf4'); gxTube([[x - 7, gY - 40], [x + 7, gY - 40]], 3, '#d8362f'); gxTube([[x - 5, gY - 84], [x + 5, gY - 84]], 3, '#e8edf4'); gxPanel(x - 10, gY - 142, 20, 14, '#2e3440', { r: 3, lw: 1.8 }); }

function gxAirRadar(x) {
    gxShadow(x, gY + 5, 80, 0.8);
    gxPanel(x - 56, gY - 52, 112, 52, '#b8c2d2', { r: 3, lw: 2.4 }); ctx.fillStyle = 'rgba(40,60,100,.2)'; ctx.fillRect(x + 8, gY - 52, 48, 52);
    gxPanel(x - 38, gY - 40, 28, 40, '#5a6679', { r: 3, lw: 2 });
    ctx.fillStyle = gxLG(x - 42, 0, x + 42, 0, '#ffffff', '#e1e7f0', '#a8b3c6'); ctx.beginPath(); ctx.arc(x + 4, gY - 52, 40, Math.PI, 0); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.strokeStyle = 'rgba(80,100,140,.4)'; ctx.lineWidth = 1.3; for (var i = 1; i < 4; i++) { ctx.beginPath(); ctx.ellipse(x + 4, gY - 52, 40 - i * 9, 40, 0, Math.PI, 0); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 36, gY - 52); ctx.lineTo(x + 44, gY - 52); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(x - 12, gY - 74, 12, 6, -0.6, 0, 6.3); ctx.fill();
  }

function gxAirSign(x) {
    gxShadow(x, gY + 3, 60, 0.6);
    gxPanel(x - 42, gY - 74, 7, 74, '#4a5360', { lw: 1.6 }); gxPanel(x + 35, gY - 74, 7, 74, '#4a5360', { lw: 1.6 });
    gxPanel(x - 56, gY - 128, 112, 56, '#d6303b', { r: 9, lw: 2.4, vert: true }); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2; gxRR(x - 52, gY - 124, 104, 48, 6); ctx.stroke();
    gxText('МАЛЬДИВЫ', x, gY - 108, 13, '#ffffff', 'rgba(60,0,10,.45)'); gxText('10 000 · 1 мифич.', x, gY - 92, 9.8, '#ffe9ec', null); gxText('15 легенд.', x, gY - 80, 9.8, '#ffe9ec', null);
  }

function gxAirWindsockAnim(x) {
    var w = Math.sin(t * 0.7) * 0.25 + 0.15, i;
    gxShadow(x, gY + 3, 20, 0.6);
    gxTube([[x, gY], [x, gY - 96]], 4, '#e8edf4'); ctx.fillStyle = '#d8362f'; ctx.beginPath(); ctx.arc(x, gY - 98, 4.4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    ctx.save(); ctx.translate(x, gY - 90);
    for (i = 0; i < 5; i++) { var a0 = i / 5, a1 = (i + 1) / 5, y0 = Math.sin(t * 2.2 + i * 0.7) * 2 * i * 0.4 + w * 22 * i * i / 16, hw0 = 9 * (1 - a0 * 0.62), hw1 = 9 * (1 - a1 * 0.62);
      ctx.fillStyle = i % 2 ? '#ffffff' : '#ff7a3a'; ctx.beginPath(); ctx.moveTo(a0 * 52, y0 - hw0); ctx.lineTo(a1 * 52, y0 + w * 22 * (2 * i + 1) / 16 - hw1 + Math.sin(t * 2.2 + i) * 1); ctx.lineTo(a1 * 52, y0 + w * 22 * (2 * i + 1) / 16 + hw1 + Math.sin(t * 2.2 + i) * 1); ctx.lineTo(a0 * 52, y0 + hw0); ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    ctx.restore();
  }

function gxAFree(x, pad) { for (var i = 0; i < GXA_SL.length; i++) if (Math.abs(GXA_SL[i][0] - x) < GXA_SL[i][1] + pad) return false; return true; }

function gxCrown1(p) {
    var tp = gxPalmPt(p, 1), c = gxPalmCrown(((p.s | 0) % 4 + 4) % 4), sw = Math.sin(t * 1.25 + p.s * 1.7) * 0.034 + Math.sin(t * 0.5 + p.s) * 0.02;
    ctx.save(); ctx.translate(tp[0], tp[1] + 4); ctx.rotate(sw); ctx.drawImage(c, -c._cx, -c._cy, c._w, c._h); ctx.restore();
  }

function gxHx(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }

function gxDiamond(sx, sy, r) { ctx.beginPath(); ctx.moveTo(sx, sy - r); ctx.lineTo(sx + r * 0.46, sy); ctx.lineTo(sx, sy + r); ctx.lineTo(sx - r * 0.46, sy); ctx.closePath(); ctx.fill(); }

function gxSeaSurf(x0, x1, top, dk) {
    if (camY > 900) return; var a = 1 - Math.min(1, camY / 900);
    ctx.globalAlpha = a; ctx.fillStyle = gxLG(0, top, 0, top + 150, 'rgba(255,255,255,.34)', 'rgba(255,255,255,0)'); ctx.fillRect(x0, top, x1 - x0, 150);
    ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(x0, top - 1, x1 - x0, 2.2); ctx.fillStyle = '#fff';
    gxEach(x0, x1, 64, 18, 12, function (x, k) { var h = gxH(k * 13 + 5), tw = Math.sin(t * (2 + h * 3) + k * 2); if (tw < 0.5) return; ctx.globalAlpha = a * Math.min(1, (tw - 0.5) * 2.2); gxDiamond(x + h * 50, top + 8 + gxH(k * 7 + 1) * 110, 3.4); });
    ctx.globalAlpha = 1;
  }

function gxSeaFloor(x0, x1, dk, mix) {
    var i, k, kd = dk * 0.7, x, fy, cm = function (h, q) { return mix(gxHx(h), q === undefined ? kd : q); }, first = true;
    ctx.strokeStyle = cm('#fff2c4', dk * 0.8); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    for (x = Math.floor(x0 / 20) * 20; x <= x1 + 20; x += 20) { fy = gY + seaFloor(x); if (first) { ctx.moveTo(x, fy); first = false; } else ctx.lineTo(x, fy); } ctx.stroke();
    ctx.strokeStyle = cm('#bfa56a', dk * 0.9); ctx.lineWidth = 1.6; ctx.beginPath();
    for (x = Math.floor(x0 / 46) * 46; x < x1; x += 46) { fy = gY + seaFloor(x) + 14 + (x % 3) * 5; ctx.moveTo(x, fy); ctx.quadraticCurveTo(x + 11, fy - 4, x + 22, fy); } ctx.stroke();
    for (i = Math.floor(x0 / 90) - 1; i * 90 < x1; i++) {
      var gx = i * 90 + ((i * 53) % 40), kind = ((i * 7919) % 5 + 5) % 5, h = gxH(i * 3 + 7); fy = gY + seaFloor(gx);
      if (fy < gY + 20) continue;
      ctx.save(); ctx.translate(gx, fy);
      if (kind === 0) {
        for (k = 0; k < 4; k++) {
          var bh = 56 + (k * 17 + i * 5) % 36, sw = Math.sin(t * 1.3 + k * 1.4 + i) * 8, bx = k * 9 - 12;
          ctx.fillStyle = gxLG(0, 0, 0, -bh, cm('#1f7a4a'), cm('#58c06a'));
          ctx.beginPath(); ctx.moveTo(bx - 4, 4); ctx.quadraticCurveTo(bx - 6 + sw * 0.5, -bh * 0.5, bx + sw, -bh); ctx.quadraticCurveTo(bx + 7 + sw * 0.5, -bh * 0.5, bx + 5, 4); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
          ctx.strokeStyle = 'rgba(200,255,200,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx, 0); ctx.quadraticCurveTo(bx - 1 + sw * 0.5, -bh * 0.5, bx + sw, -bh + 6); ctx.stroke();
        }
      } else if (kind === 1) {
        [[0, 22, 0], [26, 16, 1], [-24, 14, 2]].forEach(function (q, qi) {
          var base = ['#ff6e92', '#ff9a4a', '#c46bff'][(qi + (i & 1)) % 3];
          ctx.fillStyle = gxLG(0, -q[1] * 1.5, 0, 4, cm(base, kd * 0.5), cm(base)); ctx.beginPath(); ctx.arc(q[0], 2, q[1], Math.PI, 0); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
          ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(q[0], 2, q[1] * 0.62, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,.35)'; for (var d = 0; d < 4; d++) { ctx.beginPath(); ctx.arc(q[0] - q[1] * 0.5 + d * q[1] * 0.34, -q[1] * 0.45 - (d % 2) * 5, 1.6, 0, 6.3); ctx.fill(); }
        });
      } else if (kind === 2) {
        ctx.beginPath(); ctx.moveTo(-42, 4); ctx.lineTo(-36, -16); ctx.lineTo(-18, -28); ctx.lineTo(10, -30); ctx.lineTo(32, -18); ctx.lineTo(44, 4); ctx.closePath();
        ctx.fillStyle = gxLG(-40, -30, 40, 4, cm('#aab2c2'), cm('#6e7688'), cm('#454c5e')); ctx.fill(); gxInk(2.2); ctx.stroke();
        ctx.fillStyle = cm('#4aa86a', kd * 0.8); ctx.beginPath(); ctx.ellipse(-8, -26, 18, 5, -0.1, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.moveTo(-34, -14); ctx.lineTo(-18, -26); ctx.lineTo(-24, -10); ctx.fill();
      } else if (kind === 3) {
        ctx.lineCap = 'round';
        [[0, -60, 0], [-16, -44, -0.5], [18, -48, 0.45], [-34, -32, -0.9], [36, -34, 0.9]].forEach(function (q, qi) {
          var sw2 = Math.sin(t * 1.1 + qi + i) * 2; ctx.strokeStyle = cm('#a8641a'); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(q[0] * 0.4, 4); ctx.quadraticCurveTo(q[0] * 0.8, q[1] * 0.5, q[0] + q[2] * 12 + sw2, q[1]); ctx.stroke();
          ctx.strokeStyle = cm('#ffc84a'); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(q[0] * 0.4, 4); ctx.quadraticCurveTo(q[0] * 0.8, q[1] * 0.5, q[0] + q[2] * 12 + sw2, q[1]); ctx.stroke();
          ctx.fillStyle = cm('#ffe08a'); ctx.beginPath(); ctx.arc(q[0] + q[2] * 12 + sw2, q[1], 5.4, 0, 6.3); ctx.fill(); gxInk(1.3); ctx.stroke();
        });
      } else {
        ctx.fillStyle = cm('#ff8a3a'); ctx.beginPath(); for (k = 0; k < 10; k++) { var a = k * 0.6283 - 1.57, rr = k % 2 ? 6 : 17; ctx.lineTo(-18 + Math.cos(a) * rr, -8 + Math.sin(a) * rr * 0.8); } ctx.closePath(); ctx.fill(); gxInk(1.4); ctx.stroke();
        ctx.fillStyle = cm('#3a2a5a'); ctx.beginPath(); ctx.arc(20, -8, 9, Math.PI, 0); ctx.fill(); ctx.strokeStyle = cm('#3a2a5a'); ctx.lineWidth = 1.6; for (k = 0; k < 9; k++) { var a2 = Math.PI + k * 0.39; ctx.beginPath(); ctx.moveTo(20 + Math.cos(a2) * 8, -8 + Math.sin(a2) * 8); ctx.lineTo(20 + Math.cos(a2) * 15, -8 + Math.sin(a2) * 15); ctx.stroke(); }
        ctx.fillStyle = cm('#fff1e4'); ctx.beginPath(); ctx.ellipse(2, -2, 9, 6, 0, Math.PI, 0); ctx.fill(); gxInk(1.3); ctx.stroke();
      }
      ctx.restore();
    }
    // затонувший корабль
    if (3600 > x0 - 220 && 3600 < x1 + 220) {
      var wy = gY + seaFloor(3600);
      ctx.save(); ctx.translate(3600, wy); ctx.rotate(-0.12);
      ctx.beginPath(); ctx.moveTo(-118, -14); ctx.quadraticCurveTo(-60, 6, 10, 6); ctx.quadraticCurveTo(80, 4, 118, -26); ctx.lineTo(96, -56); ctx.lineTo(-96, -48); ctx.closePath();
      ctx.fillStyle = gxLG(0, -56, 0, 6, cm('#a77a4a'), cm('#6a4528'), cm('#3a2414')); ctx.fill(); gxInk(2.6); ctx.stroke();
      ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(20,10,0,.45)'; ctx.lineWidth = 1.6; for (k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(-120, -50 + k * 11); ctx.lineTo(120, -50 + k * 11 - 6); ctx.stroke(); } ctx.fillStyle = cm('#3fa86a', kd); for (k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(-80 + k * 36, -4, 12, 6, 0, Math.PI, 0); ctx.fill(); } ctx.restore();
      [-60, 0, 60].forEach(function (px) { ctx.fillStyle = cm('#bfe9f0', dk * 0.5); ctx.beginPath(); ctx.arc(px, -30, 8, 0, 6.3); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = cm('#d9a24a'); ctx.stroke(); gxInk(1.4); ctx.beginPath(); ctx.arc(px, -30, 11, 0, 6.3); ctx.stroke(); });
      gxPanel(-5, -140, 10, 96, cm('#6a4528'), { lw: 2 }); gxPanel(-16, -118, 32, 7, cm('#6a4528'), { lw: 1.6 });
      var sl = Math.sin(t * 1.4) * 5; ctx.fillStyle = cm('#e8e4d4', dk * 0.7); ctx.beginPath(); ctx.moveTo(5, -132); ctx.lineTo(64 + sl, -96); ctx.lineTo(56 + sl, -84); ctx.lineTo(48 + sl * 1.3, -92); ctx.lineTo(38 + sl, -80); ctx.lineTo(5, -86); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
      ctx.restore();
    }
    // сундук
    if (5200 > x0 - 90 && 5200 < x1 + 90) {
      var cy = gY + seaFloor(5200), a3 = 0.5 + 0.3 * Math.sin(t * 3);
      ctx.save(); ctx.translate(5200, cy);
      gxPanel(-32, -34, 64, 34, cm('#a26a2c'), { r: 4, lw: 2.2, vert: true, tex: function (a, b, w, hh) { ctx.strokeStyle = 'rgba(40,20,0,.5)'; ctx.lineWidth = 1.6; for (var q = 1; q < 4; q++) { ctx.beginPath(); ctx.moveTo(a, b + q * 9); ctx.lineTo(a + w, b + q * 9); ctx.stroke(); } } });
      ctx.beginPath(); ctx.moveTo(-34, -34); ctx.quadraticCurveTo(0, -62, 34, -34); ctx.closePath(); ctx.fillStyle = gxLG(0, -58, 0, -34, cm('#c88a3a'), cm('#8a5a22')); ctx.fill(); gxInk(2.2); ctx.stroke();
      gxPanel(-34, -36, 68, 6, cm('#e2b64a'), { lw: 1.6 }); gxPanel(-6, -40, 12, 16, cm('#ffd96a'), { r: 3, lw: 1.8 });
      ctx.fillStyle = cm('#ffd23f'); for (k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(-38 + k * 15, -2 + (k % 2) * 2, 5, 2.6, 0, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); }
      gxGlow(0, -40, 60, '255,214,100', a3 * (1 - dk * 0.6));
      ctx.restore();
    }
  }

function gxSeaOver(x0, x1, dk) {
    var i, a;
    if (camY < 520) {
      a = (1 - camY / 520) * 0.16; ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
      for (i = Math.floor(x0 / 240) - 1; i * 240 < x1; i++) { var rx = i * 240 + Math.sin(t * 0.4 + i) * 34, rw = 24 + (i * 13 % 3) * 16; ctx.beginPath(); ctx.moveTo(rx, gY - 70); ctx.lineTo(rx + rw, gY - 70); ctx.lineTo(rx + rw + 130, gY + 460); ctx.lineTo(rx + 40, gY + 460); ctx.closePath(); ctx.fill(); }
    }
    var span = Math.max(300, x1 - x0); ctx.fillStyle = 'rgba(220,240,255,' + (0.2 + 0.2 * dk).toFixed(2) + ')';
    for (i = 0; i < 46; i++) { var px = x0 + ((i * 137 + t * (5 + i % 4 * 2)) % span), py = gY + camY - 320 + ((i * 89 + t * (8 + i % 5 * 2)) % 700); ctx.beginPath(); ctx.arc(px, py, 1.2 + (i % 3) * 0.5, 0, 6.3); ctx.fill(); }
  }

function gxSeaBuoy(x, y, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(x - 3, y - 3.5, 3.5, 2, -0.5, 0, 6.3); ctx.fill(); }

function gxSeaSignPost(x, y, w, col, l1, l2) {
    gxPanel(x - 4, y, 8, 100, '#6a4528', { lw: 1.8 }); gxPanel(x - w / 2, y - 52, w, 52, col, { r: 9, lw: 2.4, vert: true }); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 2; gxRR(x - w / 2 + 4, y - 48, w - 8, 44, 6); ctx.stroke();
    gxText(l1, x, y - 34, 13, '#fff', 'rgba(10,20,50,.5)'); if (l2) gxText(l2, x, y - 14, 11.5, '#d9f1ff', null);
  }

function gxSeaZone(x0, x1) {
    if (!(ZONE2_X > x0 - 120 && ZONE2_X < x1 + 120 && camY < 300)) return;
    for (var i = 0; i < 5; i++) gxSeaBuoy(ZONE2_X + (i % 2) * 12, gY + 20 + i * 20 + Math.sin(t * 2 + i) * 2, i % 2 ? '#ffffff' : '#e5484d');
    gxSeaSignPost(ZONE2_X, gY - 98, 232, '#12306a', 'Глубокий океан ▶', 'впадина 500 м · шторм чаще');
  }

function gxSeaIsle(x0, x1) {
    if (!(x0 < 300 && camY < 120)) return;
    ctx.beginPath(); ctx.moveTo(-220, gY + 26); ctx.lineTo(-220, gY + 8); ctx.quadraticCurveTo(-60, gY - 40, 60, gY - 22); ctx.quadraticCurveTo(220, gY - 12, 300, gY + 12); ctx.lineTo(300, gY + 26); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 30, 0, gY + 26, '#fbeec2', '#efd592', '#c9a45e'); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.85)'; for (var i = -5; i < 14; i++) { ctx.beginPath(); ctx.ellipse(i * 26, gY + 24 + Math.sin(t * 1.5 + i) * 1.6, 15, 3.4, 0, 0, 6.3); ctx.fill(); }
    gxShadow(70, gY + 4, 60, 0.6); palm(70, 200, 34, 1.3); palm(190, 160, -26, 4.4);
    gxPanel(234, gY - 70, 7, 70, '#6a4528', { lw: 1.6 }); gxPanel(190, gY - 102, 100, 34, '#1f4aa8', { r: 8, lw: 2.2, vert: true }); gxText('Причал', 240, gY - 85, 14, '#fff', 'rgba(10,20,60,.5)');
  }

function gxSeaEast(x0, x1) {
    var L = LOCS[5], i;
    for (i = 0; i < 7; i++) { var bx = L.w - 120 - (i % 2) * 14, by2 = gY + 24 + i * 22; if (bx > x0 - 40 && bx < x1 + 40) gxSeaBuoy(bx, by2 + Math.sin(t * 2 + i) * 2, i % 2 ? '#ffffff' : '#e5484d'); }
    if (L.w - 120 > x0 - 100 && L.w - 120 < x1 + 100) gxSeaSignPost(L.w - 125, gY - 74, 160, '#c22', 'Дальше океан', 'лодка не пройдёт');
  }

function gxIFree(x, pad) { for (var i = 0; i < GXI_SL.length; i++) if (Math.abs(GXI_SL[i][0] - x) < GXI_SL[i][1] + pad) return false; return true; }

function gxITent(x) {
    gxShadow(x, gY + 4, 90, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 76, gY); ctx.lineTo(x - 6, gY - 92); ctx.lineTo(x + 64, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 76, 0, x + 64, 0, '#f2d58a', '#d9b25a', '#a88030'); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 6, gY - 92); ctx.lineTo(x + 6, gY); ctx.lineTo(x - 28, gY); ctx.closePath(); ctx.fillStyle = '#3a2a1c'; ctx.fill(); gxInk(2); ctx.stroke();
    ctx.strokeStyle = 'rgba(110,70,10,.4)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x - 6, gY - 92); ctx.lineTo(x - 50, gY - 6); ctx.moveTo(x - 6, gY - 92); ctx.lineTo(x + 38, gY - 6); ctx.stroke();
    gxTube([[x - 6, gY - 92], [x - 6, gY - 108]], 3, '#6a4528'); ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.moveTo(x - 6, gY - 108); ctx.lineTo(x + 12, gY - 102); ctx.lineTo(x - 6, gY - 96); ctx.fill(); gxInk(1.2); ctx.stroke();
    gxTube([[x - 76, gY], [x - 90, gY + 4]], 3, '#d9c9a0'); gxTube([[x + 64, gY], [x + 80, gY + 4]], 3, '#d9c9a0');
    // кострище
    for (var i = 0; i < 6; i++) { var a = i * 1.047; ctx.fillStyle = '#8a8f9c'; ctx.beginPath(); ctx.ellipse(x + 112 + Math.cos(a) * 20, gY + 5 + Math.sin(a) * 4, 7, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.3); ctx.stroke(); }
    gxTube([[x + 100, gY + 2], [x + 124, gY - 6]], 5, '#6a4528'); gxTube([[x + 124, gY + 2], [x + 100, gY - 6]], 5, '#7a5230');
  }

function gxISOS(x) {
    gxShadow(x, gY + 8, 64, 0.35);
    function stone(sx, sy) { ctx.fillStyle = '#c4c8d2'; ctx.beginPath(); ctx.ellipse(sx, sy, 7, 4.6, 0.3, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(sx - 2, sy - 1.5, 2.6, 1.4, 0, 0, 6.3); ctx.fill(); }
    var L = { S: [[0, 0], [8, -3], [14, 0], [8, 4], [14, 8], [6, 12], [0, 9]], O: [[0, 0], [8, -3], [14, 2], [14, 8], [8, 12], [0, 8]] };
    var off = [-52, -6, 40];
    ['S', 'O', 'S'].forEach(function (c, ci) { L[c].forEach(function (q) { stone(x + off[ci] + q[0] * 1.2, gY + 10 + q[1] * 0.5); }); });
  }

function gxIRaft(x) {
    gxShadow(x, gY + 4, 80, 0.7);
    for (var i = 0; i < 6; i++) gxPanel(x - 66 + i * 22, gY - 12, 20, 12, i % 2 ? '#a8743c' : '#8a5a2c', { r: 4, lw: 1.8 });
    ctx.strokeStyle = '#d9c9a0'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x - 66, gY - 8); ctx.lineTo(x + 66, gY - 8); ctx.stroke();
    gxTube([[x - 10, gY - 12], [x - 10, gY - 78]], 4, '#7a5230'); ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.moveTo(x - 6, gY - 76); ctx.lineTo(x + 38, gY - 42); ctx.lineTo(x - 6, gY - 30); ctx.fill(); gxInk(1.8); ctx.stroke();
    gxTube([[x + 50, gY - 12], [x + 74, gY - 40]], 3, '#8a5a2c');
  }

function gxIDriftwood(x) { gxShadow(x, gY + 4, 54, 0.6); gxTube([[x - 44, gY - 2], [x - 8, gY - 14], [x + 40, gY - 6]], 10, '#9a7448'); gxTube([[x - 4, gY - 12], [x + 14, gY - 34], [x + 20, gY - 38]], 5, '#8a6438'); ctx.fillStyle = 'rgba(60,40,20,.5)'; for (var i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x - 30 + i * 22, gY - 7 - (i % 2) * 3, 1.6, 0, 6.3); ctx.fill(); } }

function gxITidePool(x) {
    ctx.fillStyle = '#8a8f9c'; ctx.beginPath(); ctx.ellipse(x, gY + 8, 52, 12, 0, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY, 0, gY + 16, '#9be8ee', '#2fb4d4'); ctx.beginPath(); ctx.ellipse(x, gY + 8, 44, 8.6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x - 14, gY + 5, 16, 2.4, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#ff8a3a'; ctx.beginPath(); for (var k = 0; k < 10; k++) { var a = k * 0.6283 - 1.57, rr = k % 2 ? 2.6 : 6.4; ctx.lineTo(x + 14 + Math.cos(a) * rr, gY + 9 + Math.sin(a) * rr * 0.7); } ctx.closePath(); ctx.fill(); gxInk(1); ctx.stroke();
  }

function gxICaveRocks(X, nv) {
    var i, P = [[-260, 0], [-210, -110], [-150, -190], [-90, -250], [-40, -272], [30, -262], [90, -232], [170, -180], [250, -120], [300, -60], [336, 0]];
    gxShadow(X + 40, gY + 8, 330, 0.85);
    ctx.beginPath(); ctx.moveTo(P[0][0] + X, gY); for (i = 0; i < P.length; i++) ctx.lineTo(P[i][0] + X, gY + P[i][1]); ctx.closePath();
    ctx.fillStyle = gxLG(X - 260, gY - 270, X + 330, gY, '#9a9284', '#6d655a', '#3f3a34'); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(X - 150, gY - 190); ctx.lineTo(X - 40, gY - 272); ctx.lineTo(X - 76, gY - 150); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(X + 90, gY - 232); ctx.lineTo(X + 170, gY - 180); ctx.lineTo(X + 120, gY - 120); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(20,14,40,.28)'; ctx.beginPath(); ctx.moveTo(X + 100, gY - 232); ctx.lineTo(X + 336, gY); ctx.lineTo(X + 140, gY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(30,26,22,.5)'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(X - 120, gY - 120); ctx.lineTo(X - 90, gY - 70); ctx.lineTo(X - 130, gY - 20); ctx.moveTo(X + 190, gY - 100); ctx.lineTo(X + 220, gY - 50); ctx.lineTo(X + 180, gY); ctx.stroke();
    ctx.fillStyle = 'rgba(80,160,70,.8)'; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(X - 200 + i * 80, gY - 4 - (i % 3) * 30 - (i > 1 && i < 4 ? 90 : 0), 22, 7, 0, 0, 6.3); ctx.fill(); }
    ctx.restore(); gxInk(2.8); ctx.beginPath(); ctx.moveTo(P[0][0] + X, gY); for (i = 0; i < P.length; i++) ctx.lineTo(P[i][0] + X, gY + P[i][1]); ctx.stroke();
    // зев пещеры
    ctx.beginPath(); ctx.moveTo(X - 70, gY); ctx.quadraticCurveTo(X - 80, gY - 150, X + 10, gY - 160); ctx.quadraticCurveTo(X + 110, gY - 150, X + 100, gY); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 160, 0, gY, '#0b0912', '#241a36'); ctx.fill(); gxInk(3); ctx.stroke();
    ctx.fillStyle = '#4a4238'; for (i = 0; i < 7; i++) { var tx = X - 56 + i * 24, th = 14 + (i * 7) % 16; ctx.beginPath(); ctx.moveTo(tx - 7, gY - 154 + Math.abs(i - 3) * 6); ctx.lineTo(tx, gY - 150 + th + Math.abs(i - 3) * 6); ctx.lineTo(tx + 7, gY - 154 + Math.abs(i - 3) * 6); ctx.fill(); gxInk(1.2); ctx.stroke(); }
  }

function gxCCrystal(x, c, nv) {
    var i, rg = gxHx(c), mk = function (a) { return 'rgba(' + rg[0] + ',' + rg[1] + ',' + rg[2] + ',' + a + ')'; };
    gxShadow(x, gY + 3, 40, 0.8);
    [[-18, 56, -0.18], [0, 78, 0], [16, 50, 0.2], [-30, 32, -0.4], [30, 30, 0.45]].forEach(function (q) {
      ctx.save(); ctx.translate(x + q[0], gY + 2); ctx.rotate(q[2]);
      ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-7, -q[1] * 0.78); ctx.lineTo(0, -q[1]); ctx.lineTo(7, -q[1] * 0.78); ctx.lineTo(8, 0); ctx.closePath();
      ctx.fillStyle = gxLG(-8, 0, 8, 0, mk(0.95), '#ffffff', mk(0.7)); ctx.fill(); gxInk(2); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(-4, -q[1] * 0.72); ctx.lineTo(-1, -q[1] * 0.9); ctx.lineTo(-2, -4); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -q[1]); ctx.lineTo(0, 0); ctx.stroke(); ctx.restore();
    });
  }

function gxCMush(x, k) {
    var c = ['#7dff9a', '#ff8ad8', '#7fe4ff'][k % 3]; gxShadow(x, gY + 3, 14, 0.5);
    [[0, 16, 10], [14, 10, 7]].forEach(function (q) { gxPanel(x + q[0] - 2.4, gY - q[1], 4.8, q[1], '#d9d0e4', { lw: 1.3 }); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x + q[0], gY - q[1], q[2], q[2] * 0.7, 0, Math.PI, 0); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.arc(x + q[0] - q[2] * 0.3, gY - q[1] - q[2] * 0.3, 1.6, 0, 6.3); ctx.fill(); });
  }

function gxCStalac(x, len, w) {
    ctx.beginPath(); ctx.moveTo(x - w, 0); ctx.quadraticCurveTo(x - w * 0.4, len * 0.5, x, len); ctx.quadraticCurveTo(x + w * 0.4, len * 0.5, x + w, 0); ctx.closePath();
    ctx.fillStyle = gxLG(x - w, 0, x + w, 0, '#4a3f56', '#33293f', '#221a2c'); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(x - w * 0.6, 0); ctx.quadraticCurveTo(x - w * 0.3, len * 0.5, x - 1, len * 0.9); ctx.lineTo(x - 2, 0); ctx.fill();
  }

function gxLabTube(x, k) {
    var kd = LAB_KINDS[k], rg = gxHx(kd.c);
    gxPanel(x - 30, gY - 106, 60, 12, '#566174', { r: 3, lw: 2 }); gxPanel(x - 28, gY - 262, 56, 12, '#566174', { r: 3, lw: 2 });
    ctx.fillStyle = 'rgba(190,225,240,.42)'; gxRR(x - 25, gY - 252, 50, 148, 14); ctx.fill();
    ctx.save(); gxRR(x - 25, gY - 252, 50, 148, 14); ctx.clip();
    ctx.fillStyle = gxLG(x - 22, 0, x + 22, 0, 'rgba(' + rg[0] + ',' + rg[1] + ',' + rg[2] + ',.95)', kd.c, 'rgba(' + rg[0] + ',' + rg[1] + ',' + rg[2] + ',.65)'); ctx.fillRect(x - 25, gY - 194, 50, 90);
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 17, gY - 246, 6, 138); ctx.restore();
    gxRR(x - 25, gY - 252, 50, 148, 14); gxInk(2.6); ctx.stroke();
    gxPanel(x - 6, gY - 90, 12, 10, '#7a8aa0', { lw: 1.4 });
  }

function gxLabTable(x) {
    gxShadow(x, gY + 3, 60, 0.7);
    gxPanel(x - 50, gY - 56, 100, 9, '#9aa6b8', { r: 3, lw: 2.2 }); gxPanel(x - 44, gY - 47, 7, 47, '#5b6677', { lw: 1.6 }); gxPanel(x + 37, gY - 47, 7, 47, '#5b6677', { lw: 1.6 }); gxPanel(x - 38, gY - 28, 76, 6, '#6c778a', { lw: 1.4 });
    // колба, микроскоп/ноутбук
    ctx.fillStyle = 'rgba(190,230,250,.55)'; ctx.beginPath(); ctx.moveTo(x - 36, gY - 58); ctx.lineTo(x - 36, gY - 72); ctx.lineTo(x - 42, gY - 84); ctx.lineTo(x - 22, gY - 84); ctx.lineTo(x - 28, gY - 72); ctx.lineTo(x - 28, gY - 58); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#7dff9a'; ctx.fillRect(x - 35, gY - 66, 6, 8);
    gxPanel(x - 2, gY - 70, 30, 14, '#3a4254', { r: 2, lw: 1.6 }); ctx.fillStyle = '#7fe4ff'; ctx.fillRect(x + 2, gY - 67, 22, 8); gxPanel(x - 6, gY - 59, 40, 3, '#566174', { lw: 1 });
  }

function gxLabRoom(xa, xb, nv) {
    var lx = LAB_X, rx = LOCS[8].w, a = Math.max(xa, lx), b = Math.min(xb, rx), i, deep = gY + 24 + gxDown(); if (a >= b) return;
    ctx.fillStyle = gxLG(0, gY - 332, 0, gY, '#e8eef4', '#d2dae4'); ctx.fillRect(a, gY - 332, b - a, 332 + gxDown() + 12);
    ctx.fillStyle = 'rgba(60,76,104,.14)'; for (i = Math.floor(a / 120) * 120; i < b; i += 120) ctx.fillRect(i, gY - 330, 2.4, 330);
    ctx.fillStyle = 'rgba(255,255,255,.5)'; for (i = Math.floor(a / 120) * 120; i < b; i += 120) ctx.fillRect(i + 10, gY - 270, 100, 4);
    gxPanel(a, gY - 345, b - a, 16, '#8a96aa', { lw: 2, vert: true }); ctx.strokeStyle = '#6a7690'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(a, gY - 312); ctx.lineTo(b, gY - 312); ctx.moveTo(a, gY - 300); ctx.lineTo(b, gY - 300); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(a, gY - 314); ctx.lineTo(b, gY - 314); ctx.stroke();
    for (i = Math.floor(a / 300) * 300 + 150; i < b + 60; i += 300) { if (i > lx + 80) { gxPanel(i - 40, gY - 328, 80, 12, '#f4f8ff', { r: 4, lw: 1.8 }); } }
    ctx.fillStyle = gxLG(0, gY - 2, 0, deep, '#aab6c4', '#7a8698', '#4a5466'); ctx.fillRect(a, gY - 2, b - a, deep - gY + 2); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(a, gY - 2, b - a, 3);
    ctx.fillStyle = '#8f9cad'; for (i = Math.floor(a / 120) * 120; i < b; i += 120) ctx.fillRect(i, gY - 2, 2, deep - gY);
    ctx.fillStyle = '#e8b830'; for (i = Math.floor(a / 60) * 60; i < b; i += 60) if ((i / 60) % 2) ctx.fillRect(i, gY + 12, 30, 4);
    if (lx > xa - 60 && lx < xb + 60) {
      gxPanel(lx - 40, gY - 232, 40, 232, '#3a4352', { lw: 2.6 }); gxPanel(lx - 14, gY - 202, 28, 202, '#5b6677', { r: 3, lw: 2.4, tex: function (aa, bb, w, h) { ctx.fillStyle = '#e8b830'; for (var q = 0; q < h; q += 24) { ctx.beginPath(); ctx.moveTo(aa, bb + q); ctx.lineTo(aa + w, bb + q + 12); ctx.lineTo(aa + w, bb + q + 20); ctx.lineTo(aa, bb + q + 8); ctx.fill(); } } });
      ctx.fillStyle = '#2fbf6b'; ctx.beginPath(); ctx.arc(lx + 4, gY - 188, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
      gxPanel(lx + 20, gY - 272, 170, 32, '#1f4aa8', { r: 7, lw: 2.4, vert: true }); gxText('ЛАБОРАТОРИЯ', lx + 105, gY - 256, 14, '#fff', 'rgba(10,20,60,.5)');
    }
    GXC_TUBES.forEach(function (q) { if (q[0] > xa - 40 && q[0] < xb + 40) gxLabTube(q[0], q[1]); });
    GXC_TABLES.forEach(function (x) { if (x > xa - 60 && x < xb + 60) gxLabTable(x); });
  }

function gxLawn(xa, xb, la, lb) {
    var a = Math.max(xa, la), b = Math.min(xb, lb), i, x, w; if (b <= a) return;
    ctx.fillStyle = gxLG(0, gY - 4, 0, gY + 22, '#8ee05c', '#4fa63f'); ctx.fillRect(a, gY - 4, b - a, 26);
    ctx.fillStyle = 'rgba(255,255,255,.1)'; for (i = Math.floor(a / 56) * 56; i < b; i += 56) { x = Math.max(i, a); w = Math.min(i + 28, b) - x; if (w > 0) ctx.fillRect(x, gY - 4, w, 26); }
    ctx.fillStyle = '#4d9a3a'; ctx.fillRect(a, gY + 18, b - a, 4);
    ctx.fillStyle = '#74d44e'; for (i = Math.floor(a / 9) * 9; i < b; i += 9) { var hh = gxH(i * 3 + 7); ctx.beginPath(); ctx.moveTo(i - 2, gY - 3); ctx.lineTo(i + hh, gY - 6 - hh * 7); ctx.lineTo(i + 2, gY - 3); ctx.fill(); }
    gxInk(2); ctx.beginPath(); ctx.moveTo(a, gY - 4); ctx.lineTo(b, gY - 4); ctx.stroke();
  }

function gxPaver(xa, xb, la, lb) {
    var a = Math.max(xa, la), b = Math.min(xb, lb), i; if (b <= a) return;
    ctx.fillStyle = gxLG(0, gY - 4, 0, gY + 22, '#f4ecd6', '#cdbf9c'); ctx.fillRect(a, gY - 4, b - a, 26);
    ctx.strokeStyle = 'rgba(120,100,60,.4)'; ctx.lineWidth = 1.2; ctx.beginPath();
    for (i = Math.floor(a / 30) * 30; i < b; i += 30) { ctx.moveTo(i, gY - 4); ctx.lineTo(i - 3, gY + 22); } ctx.moveTo(a, gY + 9); ctx.lineTo(b, gY + 9); ctx.stroke();
    gxInk(1.6); ctx.beginPath(); ctx.moveTo(a, gY - 4); ctx.lineTo(b, gY - 4); ctx.stroke();
  }

function gxWHWing(wx, nv) {
    var k, q, wy = gY - 100;
    gxPanel(wx, gY - 124, 200, 124, '#f3efe3', { lw: 2.6, vert: true, tex: function (a, b, w, h) {
      ctx.strokeStyle = 'rgba(150,140,110,.3)'; ctx.lineWidth = 1.2; ctx.beginPath();
      for (q = 0; q < h; q += 14) { ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); for (var u = (Math.floor(q / 14) % 2) * 12; u < w; u += 24) { ctx.moveTo(a + u, b + q); ctx.lineTo(a + u, b + q + 14); } }
      ctx.stroke(); } });
    gxPanel(wx - 6, gY - 138, 212, 14, '#d9d1bc', { lw: 2.2 }); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(wx - 6, gY - 138, 212, 2.5);
    ctx.fillStyle = '#c4baa0'; for (q = 0; q < 17; q++) ctx.fillRect(wx - 2 + q * 12.4, gY - 124, 6, 5);
    gxPanel(wx - 6, gY - 158, 212, 7, '#e8e1cd', { lw: 1.8 }); for (q = 0; q < 17; q++) gxPanel(wx - 2 + q * 12.4, gY - 151, 6, 14, '#f1ecdc', { lw: 1.2 });
    for (k = 0; k < 4; k++) {
      var wx2 = wx + 22 + k * 46, st = nv ? (k % 2 ? 1 : 2) : 0;
      ctx.fillStyle = '#d9d1bc'; ctx.beginPath(); ctx.moveTo(wx2 - 6, wy - 5); ctx.lineTo(wx2 + 11, wy - 17); ctx.lineTo(wx2 + 28, wy - 5); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
      gxWin(wx2, wy, 22, 48, st, '#e8e1cd');
      if (st === 1) gxGlow(wx2 + 11, wy + 24, 34, '255,205,120', 0.5);
    }
  }

function gxWhiteHouse(X, nv) {
    var q, k, i;
    gxShadow(X, gY + 6, 360, 0.7);
    gxWHWing(X - 330, nv); gxWHWing(X + 130, nv);
    gxPanel(X - 142, gY - 198, 284, 198, '#f8f5ec', { lw: 2.8, tex: function (a, b, w, h) {
      ctx.strokeStyle = 'rgba(150,140,110,.26)'; ctx.lineWidth = 1.2; ctx.beginPath();
      for (q = 0; q < h; q += 14) { ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); }
      ctx.stroke(); ctx.fillStyle = 'rgba(120,100,60,.12)'; ctx.fillRect(a + w - 22, b, 22, h); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(a, b, 14, h); } });
    // кровля и фронтон
    gxPanel(X - 152, gY - 212, 304, 16, '#d9d1bc', { lw: 2.4 }); ctx.fillStyle = '#c4baa0'; for (q = 0; q < 24; q++) ctx.fillRect(X - 148 + q * 12.6, gY - 196, 6, 5);
    ctx.beginPath(); ctx.moveTo(X - 128, gY - 212); ctx.lineTo(X, gY - 270); ctx.lineTo(X + 128, gY - 212); ctx.closePath();
    ctx.fillStyle = gxLG(X - 128, 0, X + 128, 0, '#fffefb', '#f1ecdc', '#cfc8b4'); ctx.fill(); gxInk(3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X - 96, gY - 218); ctx.lineTo(X, gY - 257); ctx.lineTo(X + 96, gY - 218); ctx.closePath(); ctx.fillStyle = '#e6dfcb'; ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = '#1f4aa8'; ctx.beginPath(); ctx.arc(X, gY - 233, 14, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); for (i = 0; i < 10; i++) { var a2 = -1.57 + i * 0.628, r2 = i % 2 ? 3.4 : 8; ctx.lineTo(X + Math.cos(a2) * r2, gY - 233 + Math.sin(a2) * r2); } ctx.closePath(); ctx.fill();
    gxTube([[X, gY - 268], [X, gY - 334]], 3.6, '#8a8f9a'); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(X, gY - 336, 4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    // окна второго этажа
    [-80, 80].forEach(function (dx, di) {
      var wx = X + dx - 12, st = nv ? (di ? 1 : 2) : 0;
      ctx.fillStyle = '#d9d1bc'; ctx.beginPath(); ctx.moveTo(wx - 6, gY - 158); ctx.lineTo(wx + 12, gY - 172); ctx.lineTo(wx + 30, gY - 158); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
      gxWin(wx, gY - 154, 24, 46, st, '#e8e1cd'); if (st === 1) gxGlow(wx + 12, gY - 130, 36, '255,205,120', 0.5);
    });
    // дверь с аркой и красная дорожка
    gxPanel(X - 34, gY - 100, 68, 100, '#d6b24a', { r: 6, lw: 2.6, vert: true });
    gxPanel(X - 28, gY - 92, 56, 92, '#2a1d12', { r: 4, lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(214,178,74,.5)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 6, b + 8, w / 2 - 9, h * 0.42); ctx.strokeRect(a + w / 2 + 3, b + 8, w / 2 - 9, h * 0.42); ctx.strokeRect(a + 6, b + h * 0.54, w / 2 - 9, h * 0.38); ctx.strokeRect(a + w / 2 + 3, b + h * 0.54, w / 2 - 9, h * 0.38); } });
    ctx.fillStyle = '#ffd86a'; ctx.beginPath(); ctx.arc(X - 6, gY - 44, 3, 0, 6.3); ctx.arc(X + 6, gY - 44, 3, 0, 6.3); ctx.fill();
    if (nv) { ctx.fillStyle = 'rgba(255,214,120,.22)'; ctx.fillRect(X - 28, gY - 92, 56, 92); gxGlow(X, gY - 46, 100, '255,214,130', 0.55); }
    // колонны
    [-110, -50, 50, 110].forEach(function (dx) {
      var cx = X + dx;
      ctx.fillStyle = gxLG(cx - 9, 0, cx + 9, 0, '#fffefb', '#f0ebdc', '#bfb8a2'); ctx.fillRect(cx - 9, gY - 190, 18, 184); gxInk(2); ctx.strokeRect(cx - 9, gY - 190, 18, 184);
      ctx.strokeStyle = 'rgba(120,110,80,.3)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (q = -4; q <= 4; q += 4) { ctx.moveTo(cx + q, gY - 186); ctx.lineTo(cx + q, gY - 10); } ctx.stroke();
      gxPanel(cx - 13, gY - 198, 26, 10, '#fff', { r: 2, lw: 2 }); gxPanel(cx - 13, gY - 10, 26, 10, '#efe9d8', { r: 2, lw: 2 });
    });
    gxPanel(X - 126, gY - 206, 252, 12, '#ebe4d0', { lw: 2.2 });
    // ступени
    gxPanel(X - 96, gY - 8, 192, 8, '#ddd5c0', { lw: 2 }); gxPanel(X - 84, gY - 15, 168, 7, '#e6dfcb', { lw: 2 }); gxPanel(X - 72, gY - 22, 144, 7, '#efe9d8', { lw: 2 });
    ctx.fillStyle = gxLG(0, gY - 22, 0, gY, '#d24a56', '#a82430'); ctx.fillRect(X - 26, gY - 22, 52, 22); gxInk(1.6); ctx.strokeRect(X - 26, gY - 22, 52, 22);
    // фонари у крыльев
    [-168, 168].forEach(function (dx) { var lx = X + dx; gxPanel(lx - 3, gY - 74, 6, 74, '#2f3542', { lw: 1.6 }); gxPanel(lx - 9, gY - 92, 18, 20, '#fff2b0', { r: 5, lw: 2 }); gxGlow(lx, gY - 82, nv ? 60 : 28, '255,236,160', nv ? 0.85 : 0.3); });
    for (k = 0; k < 2; k++) { var bx = X + (k ? 250 : -250); gxHedge(bx - 20, 40); }
  }

function gxFountain(x) {
    var i;
    gxShadow(x, gY + 4, 56, 0.8);
    gxPanel(x - 48, gY - 22, 96, 22, '#cfd6e0', { r: 6, lw: 2.4, vert: true });
    ctx.fillStyle = gxLG(0, gY - 28, 0, gY - 14, '#86dcf8', '#3fa9dc'); ctx.beginPath(); ctx.ellipse(x, gY - 23, 44, 7, 0, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(x - 40, gY - 22, 80, 2);
    gxPanel(x - 7, gY - 62, 14, 40, '#c4ccd8', { lw: 2 });
    ctx.beginPath(); ctx.moveTo(x - 28, gY - 62); ctx.quadraticCurveTo(x - 24, gY - 44, x, gY - 42); ctx.quadraticCurveTo(x + 24, gY - 44, x + 28, gY - 62); ctx.closePath(); ctx.fillStyle = gxLG(x - 28, 0, x + 28, 0, '#e6ebf2', '#c9d1dd', '#a5afbe'); ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY - 66, 0, gY - 58, '#86dcf8', '#3fa9dc'); ctx.beginPath(); ctx.ellipse(x, gY - 62, 28, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
    gxPanel(x - 4, gY - 90, 8, 28, '#c4ccd8', { lw: 1.8 }); ctx.fillStyle = '#d4dbe6'; ctx.beginPath(); ctx.ellipse(x, gY - 92, 9, 4, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
  }

function gxFountainAnim(x) {
    var i, ph = t * 3.2;
    ctx.strokeStyle = 'rgba(200,240,255,.9)'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    for (i = -1; i <= 1; i += 2) {
      ctx.beginPath(); ctx.moveTo(x, gY - 94); ctx.quadraticCurveTo(x + i * 18, gY - 114 + Math.sin(ph) * 3, x + i * 26, gY - 63); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + i * 26, gY - 62); ctx.quadraticCurveTo(x + i * 38, gY - 56 + Math.sin(ph + i) * 2, x + i * 42, gY - 24); ctx.stroke();
    }
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gY - 94); ctx.lineTo(x, gY - 116 - Math.sin(ph) * 5); ctx.stroke();
    ctx.fillStyle = 'rgba(230,250,255,.85)'; for (i = 0; i < 6; i++) { var u = (t * 1.3 + i / 6) % 1, dx = (i % 2 ? 1 : -1) * (6 + u * 26); ctx.beginPath(); ctx.arc(x + dx, gY - 118 + u * u * 92, 1.8, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1.4; for (i = 0; i < 2; i++) { var rp = ((t * 0.8 + i * 0.5) % 1); ctx.globalAlpha = 1 - rp; ctx.beginPath(); ctx.ellipse(x, gY - 23, 14 + rp * 26, 2 + rp * 4, 0, 0, 6.3); ctx.stroke(); } ctx.globalAlpha = 1;
  }

function gxFlagPole(x) { gxShadow(x, gY + 3, 12, 0.6); gxTube([[x, gY], [x, gY - 150]], 4, '#9aa3b0'); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(x, gY - 153, 4.4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }

function gxFlagAnim(x, y, w, h, s) {
    var i, n = 8, sh = h / n;
    for (i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? '#ffffff' : '#c2353f'; ctx.beginPath(); var wv = Math.sin(t * 4 + i * 0.7) * 2; ctx.rect(x + 1.5, y + i * sh + wv * 0.2, w + wv * s, sh + 0.6); ctx.fill(); }
    ctx.fillStyle = '#2b4a96'; ctx.fillRect(x + 1.5, y, w * 0.42, sh * 4); ctx.fillStyle = 'rgba(255,255,255,.8)'; for (i = 0; i < 6; i++) ctx.fillRect(x + 4 + (i % 3) * 6, y + 3 + Math.floor(i / 3) * 6, 2, 2);
    gxInk(1.2); ctx.strokeRect(x + 1.5, y, w, h);
  }

function gxIronFence(a, b, xa, xb) {
    var i, s = Math.max(a, xa - 20), e = Math.min(b, xb + 20), x; if (e <= s) return;
    gxShadow((s + e) / 2, gY + 3, (e - s) / 2, 0.5);
    ctx.fillStyle = '#2e3440'; ctx.fillRect(s, gY - 38, e - s, 4); ctx.fillRect(s, gY - 12, e - s, 4);
    for (x = Math.ceil(s / 16) * 16; x < e; x += 16) { ctx.fillRect(x - 1.6, gY - 46, 3.2, 46); ctx.beginPath(); ctx.moveTo(x - 3.4, gY - 46); ctx.lineTo(x, gY - 56); ctx.lineTo(x + 3.4, gY - 46); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,.22)'; for (x = Math.ceil(s / 16) * 16; x < e; x += 16) ctx.fillRect(x - 1.6, gY - 46, 1, 46);
    for (x = Math.ceil(s / 160) * 160; x < e; x += 160) { gxPanel(x - 6, gY - 60, 12, 60, '#7c8594', { lw: 2 }); gxPanel(x - 8, gY - 66, 16, 8, '#a0a8b6', { lw: 1.8 }); }
  }

function gxGatePier(x, nv) { gxPanel(x - 11, gY - 76, 22, 76, '#cfc8b4', { lw: 2.4 }); gxPanel(x - 14, gY - 84, 28, 10, '#e8e1cd', { lw: 2 }); gxPanel(x - 8, gY - 106, 16, 22, '#fff2b0', { r: 5, lw: 2 }); gxPanel(x - 11, gY - 112, 22, 7, '#8a8f9a', { lw: 1.6 }); gxGlow(x, gY - 96, nv ? 70 : 26, '255,236,160', nv ? 0.85 : 0.28); }

function gxFlowerBed(x, seed) {
    gxShadow(x, gY + 3, 28, 0.6); gxPanel(x - 24, gY - 14, 48, 14, '#b9b09a', { r: 3, lw: 2 }); ctx.fillStyle = '#6a4a2c'; ctx.fillRect(x - 21, gY - 16, 42, 4);
    gxFlowers(x, 7, seed); gxFlowers(x, 5, seed + 3);
  }

function gxHospital(x, nv) {
    var w = 600, h = 270, X0 = x - w / 2, r, c, q, st;
    gxShadow(x, gY + 6, 400, 0.75);
    [X0 - 110, X0 + w - 10].forEach(function (wx, wi) {
      gxPanel(wx, gY - 170, 120, 170, '#e4ebf3', { lw: 2.6, vert: true }); gxPanel(wx - 6, gY - 180, 132, 12, '#a9bdd2', { lw: 2.2 }); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(wx - 6, gY - 180, 132, 2.5);
      for (c = 0; c < 3; c++) for (r = 0; r < 2; r++) { st = ((r + c + wi) % 3 === 0 || (nv && (r + c) % 2)) ? 1 : (nv ? 2 : 0); gxWin(wx + 12 + c * 36, gY - 146 + r * 62, 20, 38, st, '#d6e0ec'); if (st === 1 && nv) gxGlow(wx + 22 + c * 36, gY - 127 + r * 62, 28, '255,205,120', 0.5); }
    });
    gxPanel(X0, gY - h, w, h + 2, '#f6f9fc', { lw: 2.8, tex: function (a, b, ww, hh) {
      ctx.strokeStyle = 'rgba(120,150,190,.18)'; ctx.lineWidth = 1.4; ctx.beginPath(); for (q = 0; q < ww; q += 57) { ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + hh); } ctx.stroke();
      ctx.fillStyle = 'rgba(60,90,140,.09)'; ctx.fillRect(a + ww - 26, b, 26, hh); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(a, b, 16, hh); } });
    gxPanel(X0 - 6, gY - h - 4, w + 12, 16, '#1e9a88', { lw: 2.4, vert: true }); gxPanel(X0 - 12, gY - h - 18, w + 24, 14, '#c3d0e0', { lw: 2.2 });
    gxPanel(x - 120, gY - h - 36, 240, 20, '#d3dce8', { lw: 2 }); for (q = 0; q < 6; q++) { ctx.fillStyle = '#8fa2b8'; ctx.fillRect(x - 110 + q * 38, gY - h - 31, 24, 10); }
    // вертолётная площадка
    gxPanel(x + 148, gY - h - 24, 164, 8, '#3c4a5c', { lw: 2 }); gxPanel(x + 160, gY - h - 16, 6, 10, '#566579', { lw: 1.4 }); gxPanel(x + 294, gY - h - 16, 6, 10, '#566579', { lw: 1.4 });
    ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.ellipse(x + 230, gY - h - 21, 34, 3.4, 0, 0, 6.3); ctx.stroke(); gxText('H', x + 230, gY - h - 22, 11, '#ffd23f', null);
    // окна
    for (r = 0; r < 3; r++) for (c = 0; c < 10; c++) {
      var wx = X0 + 20 + c * 57, wy = gY - h + 30 + r * 62;
      if (Math.abs(wx + 20 - x) < 62 && r === 2) continue;
      if (Math.abs(wx + 20 - (x + 168)) < 32 && r === 1) continue;
      st = ((r * 5 + c * 3) % 7 === 0 || (nv && (r + c) % 3 !== 0)) ? 1 : (nv ? 2 : 0);
      gxWin(wx, wy, 40, 40, st, '#dde6f0'); if (st === 1 && nv) gxGlow(wx + 20, wy + 20, 34, '255,205,120', 0.5);
    }
    // вывеска
    gxPanel(x - 112, gY - h - 76, 224, 54, '#ffffff', { r: 11, lw: 2.8, vert: true });
    ctx.strokeStyle = '#d33a3a'; ctx.lineWidth = 3; gxRR(x - 108, gY - h - 72, 216, 46, 9); ctx.stroke();
    ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 96, gY - h - 56, 26, 9); ctx.fillRect(x - 87.5, gY - h - 64, 9, 26);
    if (nv) { ctx.shadowColor = '#ff3a3a'; ctx.shadowBlur = 12; } gxBig('БОЛЬНИЦА', x + 16, gY - h - 48, 24, '#d33a3a', null); ctx.shadowBlur = 0;
    if (nv) gxGlow(x, gY - h - 48, 160, '255,110,110', 0.3);
    // вход
    ctx.fillStyle = gxLG(0, gY - 112, 0, gY - 94, '#2bb09c', '#1e8f7e'); ctx.beginPath(); ctx.moveTo(x - 96, gY - 112); ctx.lineTo(x + 96, gY - 112); ctx.lineTo(x + 80, gY - 94); ctx.lineTo(x - 80, gY - 94); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 96, gY - 112, 192, 3);
    gxPanel(x - 80, gY - 94, 8, 94, '#b7c5d6', { lw: 1.8 }); gxPanel(x + 72, gY - 94, 8, 94, '#b7c5d6', { lw: 1.8 });
    ctx.fillStyle = gxLG(0, gY - 94, 0, gY, nv ? '#fff1c0' : '#dff3fb', nv ? '#ffd78a' : '#9fcbe0'); ctx.fillRect(x - 64, gY - 94, 128, 94);
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.moveTo(x - 64, gY); ctx.lineTo(x - 22, gY - 94); ctx.lineTo(x - 2, gY - 94); ctx.lineTo(x - 44, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5b7388'; ctx.fillRect(x - 1.5, gY - 94, 3, 94); ctx.fillRect(x - 64, gY - 94, 3, 94); ctx.fillRect(x + 61, gY - 94, 3, 94); gxInk(1.6); ctx.strokeRect(x - 64, gY - 94, 128, 94);
    ctx.fillStyle = '#d33a3a'; ctx.beginPath(); ctx.arc(x, gY - 80, 10, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 6, gY - 82, 12, 4); ctx.fillRect(x - 2, gY - 86, 4, 12);
    if (nv) gxGlow(x, gY - 50, 120, '255,230,160', 0.5);
    gxPanel(x - 100, gY - 8, 200, 8, '#e6edf5', { lw: 2 }); gxPanel(x - 88, gY - 15, 176, 7, '#eef3f9', { lw: 2 });
    // клумбы
    [x - 200, x + 140].forEach(function (bx, bi) { gxPanel(bx - 34, gY - 14, 68, 14, '#a9b4c2', { r: 3, lw: 2 }); ctx.fillStyle = '#5a4026'; ctx.fillRect(bx - 31, gY - 16, 62, 4); gxFlowers(bx, 9, 20 + bi * 7); gxFlowers(bx, 6, 33 + bi * 5); });
    // окно палаты Меллстроя
    var px = x + 168, py = gY - h + 30 + 62;
    gxPanel(px - 58, py - 10, 116, 68, '#e6b422', { r: 4, lw: 2.4 }); ctx.fillStyle = gxLG(0, py - 6, 0, py + 54, '#fff6d6', '#ffe9a8'); ctx.fillRect(px - 54, py - 6, 108, 60);
    gxPanel(px - 46, py + 28, 92, 16, '#eef3f9', { r: 5, lw: 1.8 }); ctx.fillStyle = '#c3cfdc'; ctx.fillRect(px - 46, py + 42, 92, 4);
    gxPanel(px - 46, py + 22, 30, 12, '#ffffff', { r: 6, lw: 1.6 }); if (nv) gxGlow(px, py + 24, 80, '255,225,150', 0.5);
  }

function gxAmbulanceHD(x) {
    gxShadow(x, gY + 5, 96, 0.9);
    gxPanel(x - 86, gY - 82, 172, 70, '#f7f9fb', { r: 10, lw: 2.8, vert: true });
    ctx.fillStyle = '#e04747'; ctx.fillRect(x - 84, gY - 48, 168, 9); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 84, gY - 48, 168, 2);
    gxPanel(x + 34, gY - 72, 44, 28, '#9fd0ee', { r: 5, lw: 2.2, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.moveTo(x + 40, gY - 44); ctx.lineTo(x + 54, gY - 72); ctx.lineTo(x + 62, gY - 72); ctx.lineTo(x + 48, gY - 44); ctx.fill();
    gxPanel(x - 78, gY - 70, 38, 20, '#9fd0ee', { r: 4, lw: 2 });
    ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 22, gY - 72, 9, 26); ctx.fillRect(x - 31, gY - 63, 27, 9); gxInk(1.6); ctx.strokeRect(x - 22, gY - 72, 9, 26);
    gxPanel(x + 80, gY - 32, 8, 14, '#c4ccd8', { lw: 1.6 }); gxPanel(x - 90, gY - 28, 6, 10, '#c4ccd8', { lw: 1.6 });
    var on = Math.floor(t * 4) % 2;
    gxPanel(x - 14, gY - 92, 28, 10, '#dfe6ee', { r: 4, lw: 2 }); ctx.fillStyle = on ? '#ff4b4b' : '#7a2a2a'; ctx.fillRect(x - 12, gY - 90, 12, 7); ctx.fillStyle = on ? '#2a3a7a' : '#4b7bff'; ctx.fillRect(x, gY - 90, 12, 7);
    gxGlow(x + (on ? -6 : 6), gY - 88, 60, on ? '255,75,75' : '75,123,255', 0.55);
    [-48, 50].forEach(function (dx) { ctx.fillStyle = '#23262e'; ctx.beginPath(); ctx.arc(x + dx, gY - 12, 15, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = '#b8c0cc'; ctx.beginPath(); ctx.arc(x + dx, gY - 12, 7, 0, 6.3); ctx.fill(); ctx.fillStyle = '#5a6270'; ctx.beginPath(); ctx.arc(x + dx, gY - 12, 2.6, 0, 6.3); ctx.fill(); });
  }

function gxH9Busy(x, pad) { for (var i = 0; i < GXH9SLOTS.length; i++) if (Math.abs(x - GXH9SLOTS[i][0]) < GXH9SLOTS[i][1] + pad) return true; return false; }

function gxDumpster(x) {
    gxShadow(x, gY + 4, 54, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 46, gY - 56); ctx.lineTo(x + 46, gY - 56); ctx.lineTo(x + 40, gY - 8); ctx.lineTo(x - 40, gY - 8); ctx.closePath();
    ctx.fillStyle = gxLG(x - 46, 0, x + 46, 0, '#4fc27a', '#2e8a52', '#1d5a36'); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.6; ctx.beginPath(); for (var q = -30; q <= 30; q += 20) { ctx.moveTo(x + q, gY - 52); ctx.lineTo(x + q * 0.9, gY - 12); } ctx.stroke();
    gxPanel(x - 50, gY - 66, 100, 12, '#26302c', { r: 3, lw: 2.2 }); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(x - 46, gY - 66, 92, 2.5);
    [-34, 34].forEach(function (dx) { ctx.fillStyle = '#1c1f26'; ctx.beginPath(); ctx.arc(x + dx, gY - 5, 6, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); });
    ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.85; ctx.fillRect(x - 12, gY - 40, 24, 3); ctx.fillRect(x - 6, gY - 34, 12, 3); ctx.globalAlpha = 1;
    ctx.fillStyle = '#e8e2c8'; ctx.beginPath(); ctx.moveTo(x + 14, gY - 66); ctx.lineTo(x + 30, gY - 78); ctx.lineTo(x + 34, gY - 66); ctx.fill(); gxInk(1.2); ctx.stroke();
  }

function gxPylon(x, k) {
    var c = GXMOGNEON[k % 4];
    gxShadow(x, gY + 4, 30, 0.8); gxPanel(x - 20, gY - 230, 40, 230, '#241a3a', { r: 6, lw: 2.6, vert: true });
    ctx.fillStyle = c; ctx.globalAlpha = 0.9; for (var i = 0; i < 6; i++) ctx.fillRect(x - 12, gY - 214 + i * 34, 24, 5); ctx.globalAlpha = 1;
    gxGlow(x, gY - 120, 90, c === '#ff4fa3' ? '255,79,163' : (c === '#33e0ff' ? '51,224,255' : (c === '#ffd23f' ? '255,210,63' : '155,255,79')), 0.35);
  }

function gxDumbbells(x) {
    gxPanel(x - 38, gY - 30, 76, 8, '#3a3f4e', { lw: 1.8 }); gxPanel(x - 34, gY - 22, 6, 22, '#3a3f4e', { lw: 1.6 }); gxPanel(x + 28, gY - 22, 6, 22, '#3a3f4e', { lw: 1.6 });
    for (var i = 0; i < 3; i++) { var yy = gY - 40 - i * 12 + 8; gxTube([[x - 24, yy - 6], [x + 24, yy - 6]], 3.4, '#aab2c2'); [-1, 1].forEach(function (s) { gxPanel(x + s * 24 - 5, yy - 15, 10, 18, '#2a2f3c', { r: 3, lw: 1.8 }); }); }
  }

function gxGym(X, nv) {
    var q;
    gxShadow(X, gY + 6, 220, 0.8);
    gxPanel(X - 190, gY - 190, 380, 190, '#3f3360', { lw: 2.8, tex: function (a, b, w, h) {
      ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.3; ctx.beginPath(); for (q = 0; q < h; q += 14) { ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); for (var u = (Math.floor(q / 14) % 2) * 15; u < w; u += 30) { ctx.moveTo(a + u, b + q); ctx.lineTo(a + u, b + q + 14); } } ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(a, b, 18, h); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(a + w - 26, b, 26, h); } });
    gxPanel(X - 202, gY - 208, 404, 18, '#2a2140', { lw: 2.6 }); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(X - 202, gY - 208, 404, 2.5);
    gxPanel(X - 136, gY - 174, 272, 58, '#ffd23f', { r: 12, lw: 3, vert: true }); gxPanel(X - 128, gY - 166, 256, 42, '#2a2140', { r: 8, lw: 2 });
    if (nv) gxGlow(X, gY - 145, 190, '255,210,63', 0.35);
    [-1, 1].forEach(function (s) { gxWin(X + s * 138 - 30, gY - 140, 60, 54, nv ? 1 : 0, '#6a5a9a'); gxTube([[X + s * 138 - 20, gY - 106], [X + s * 138 + 20, gY - 106]], 3, '#dfe4ee'); [-1, 1].forEach(function (s2) { gxPanel(X + s * 138 + s2 * 20 - 4, gY - 116, 8, 18, '#2a2f3c', { r: 2, lw: 1.4 }); }); });
    gxPanel(X - 66, gY - 104, 132, 104, '#8a7ac0', { r: 6, lw: 2.8 }); ctx.fillStyle = gxLG(0, gY - 98, 0, gY, nv ? '#ffe9a8' : '#cfe6f6', nv ? '#ffc56a' : '#8fb4d4'); ctx.fillRect(X - 60, gY - 98, 120, 98);
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(X - 60, gY); ctx.lineTo(X - 20, gY - 98); ctx.lineTo(X - 2, gY - 98); ctx.lineTo(X - 42, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6a5a9a'; ctx.fillRect(X - 1.5, gY - 98, 3, 98); gxInk(1.8); ctx.strokeRect(X - 60, gY - 98, 120, 98);
    ctx.fillStyle = '#ffd86a'; ctx.fillRect(X - 12, gY - 54, 6, 22); ctx.fillRect(X + 6, gY - 54, 6, 22);
    gxPanel(X - 74, gY - 8, 148, 8, '#6a5a9a', { lw: 2 });
    gxDumbbells(X - 160); gxDumbbells(X + 160);
  }

function gxOfficeTower(X, nv) {
    var r, c;
    gxShadow(X, gY + 6, 260, 0.85);
    gxPanel(X - 230, gY - 470, 460, 470, '#33265a', { lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(a, b, 20, h); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(a + w - 30, b, 30, h); ctx.strokeStyle = 'rgba(160,120,255,.18)'; ctx.lineWidth = 1.4; for (var q = 40; q < h; q += 64) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
    gxPanel(X - 246, gY - 488, 492, 20, '#1a1230', { lw: 2.6 }); ctx.fillStyle = 'rgba(180,140,255,.4)'; ctx.fillRect(X - 246, gY - 488, 492, 2.5);
    gxTube([[X + 150, gY - 488], [X + 150, gY - 560]], 4, '#6a6f80'); gxTube([[X + 138, gY - 540], [X + 162, gY - 540]], 3, '#6a6f80'); gxTube([[X + 142, gY - 520], [X + 158, gY - 520]], 3, '#6a6f80');
    for (r = 0; r < 5; r++) for (c = 0; c < 5; c++) {
      var lit = ((r * 7 + c * 3) % 4) !== 0, wx = X - 200 + c * 82, wy = gY - 444 + r * 64; if (r === 3) continue;
      gxWin(wx, wy, 56, 36, lit ? 1 : 2, '#6a4a9a'); if (lit) gxGlow(wx + 28, wy + 18, 44, '255,220,130', nv ? 0.5 : 0.28);
    }
    gxPanel(X - 192, gY - 262, 384, 64, '#0e0a1c', { r: 12, lw: 3 }); ctx.strokeStyle = '#ff3a3a'; ctx.lineWidth = 2; gxRR(X - 186, gY - 256, 372, 52, 9); ctx.stroke();
    gxAwning(X - 96, gY - 178, 192, 24, '#c2353f', '#ffffff');
    gxPanel(X - 70, gY - 156, 140, 156, '#6a4a9a', { r: 8, lw: 2.8 }); gxPanel(X - 60, gY - 146, 120, 146, '#120c24', { r: 5, lw: 2 });
    ctx.fillStyle = 'rgba(255,60,60,.4)'; ctx.fillRect(X - 52, gY - 138, 104, 138); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(X - 52, gY); ctx.lineTo(X - 12, gY - 138); ctx.lineTo(X + 2, gY - 138); ctx.lineTo(X - 38, gY); ctx.fill();
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(X + 40, gY - 82, 8, 16); ctx.fillRect(X - 3, gY - 146, 6, 146);
    gxPanel(X - 236, gY - 12, 472, 12, '#7a5aa8', { lw: 2.2 }); gxPanel(X - 100, gY - 20, 200, 8, '#8a6ab8', { lw: 2 });
    gxGlow(X, gY - 70, 130, '255,60,60', 0.45);
  }

function gxMoWindow(wx) {
    var k, bh;
    gxPanel(wx - 8, gY - 348, 316, 224, '#6a4a9a', { r: 6, lw: 2.8 });
    ctx.save(); ctx.beginPath(); ctx.rect(wx, gY - 340, 300, 210); ctx.clip();
    ctx.fillStyle = gxLG(0, gY - 340, 0, gY - 130, '#0d0a24', '#5a2a7a'); ctx.fillRect(wx, gY - 340, 300, 210);
    ctx.fillStyle = '#ffe9a8'; for (k = 0; k < 30; k++) ctx.fillRect(wx + (k * 53) % 290, gY - 335 + (k * 37) % 80, 1.6, 1.6);
    ctx.fillStyle = 'rgba(255,180,230,.4)'; ctx.beginPath(); ctx.arc(wx + 230, gY - 290, 18, 0, 6.3); ctx.fill();
    for (k = 0; k < 8; k++) { bh = 50 + ((k * 41 + wx) % 90); ctx.fillStyle = k % 2 ? '#1a1235' : '#241848'; ctx.fillRect(wx + 6 + k * 36, gY - 130 - bh, 32, bh); ctx.fillStyle = 'rgba(255,215,120,.85)'; ctx.fillRect(wx + 12 + k * 36, gY - 130 - bh + 10, 5, 5); ctx.fillRect(wx + 22 + k * 36, gY - 130 - bh + 26, 5, 5); }
    ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.moveTo(wx, gY - 130); ctx.lineTo(wx + 120, gY - 340); ctx.lineTo(wx + 170, gY - 340); ctx.lineTo(wx + 50, gY - 130); ctx.closePath(); ctx.fill();
    ctx.restore();
    gxInk(2.4); ctx.strokeRect(wx, gY - 340, 300, 210); ctx.fillStyle = '#6a4a9a'; ctx.fillRect(wx + 147, gY - 340, 6, 210); gxPanel(wx - 12, gY - 128, 324, 10, '#8a6ab8', { r: 3, lw: 2 });
  }

function gxChair(x) {
    gxPanel(x - 6, gY - 160, 12, 160, '#1a0d2a', { lw: 2, vert: true }); gxPanel(x - 42, gY - 12, 84, 12, '#1a0d2a', { r: 4, lw: 2 });
    gxPanel(x - 36, gY - 244, 72, 108, '#2a1640', { r: 16, lw: 2.8, vert: true }); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2; ctx.beginPath(); for (var q = -18; q <= 18; q += 18) { ctx.moveTo(x + q, gY - 236); ctx.lineTo(x + q, gY - 144); } ctx.stroke();
    gxPanel(x - 44, gY - 168, 88, 24, '#3a1f58', { r: 9, lw: 2.4 });
  }

function gxMoDesk(X, nv) {
    gxShadow(X, gY + 5, 172, 0.9);
    gxPanel(X - 150, gY - 84, 300, 84, '#5a3418', { lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 10, b + 10, 86, h - 20); ctx.strokeRect(a + w - 96, b + 10, 86, h - 20); ctx.fillStyle = '#d6b24a'; ctx.fillRect(a + 46, b + 36, 14, 4); ctx.fillRect(a + w - 60, b + 36, 14, 4); } });
    gxPanel(X - 162, gY - 96, 324, 14, '#7a4a22', { r: 3, lw: 2.6 }); ctx.fillStyle = '#d6b24a'; ctx.fillRect(X - 160, gY - 84, 320, 2); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(X - 162, gY - 96, 324, 2.5);
    gxPanel(X - 28, gY - 72, 56, 16, '#d6b24a', { r: 3, lw: 1.8 }); gxText('МОГГИТИ', X, gY - 63, 9, '#3a2410', null);
    gxPanel(X - 112, gY - 142, 70, 46, '#10101a', { r: 4, lw: 2.4 }); gxPanel(X - 80, gY - 98, 6, 4, '#2a2a38', { lw: 1 });
    gxPanel(X + 66, gY - 132, 56, 36, '#10101a', { r: 4, lw: 2.4 });
    gxPanel(X + 6, gY - 106, 26, 10, '#efe9d8', { lw: 1.4 }); gxPanel(X + 140, gY - 112, 10, 16, '#c24a4a', { r: 2, lw: 1.4 });
  }

function gxMoDeskAnim(X) {
    var f = 0.8 + 0.2 * Math.sin(t * 5);
    ctx.fillStyle = '#7ad8ff'; ctx.globalAlpha = f; ctx.fillRect(X - 108, gY - 138, 62, 38); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(10,40,70,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X - 102, gY - 112); ctx.lineTo(X - 90, gY - 122); ctx.lineTo(X - 78, gY - 112); ctx.lineTo(X - 66, gY - 128); ctx.lineTo(X - 54, gY - 118); ctx.stroke();
    ctx.fillStyle = '#9bff4f'; ctx.globalAlpha = f; ctx.fillRect(X + 70, gY - 128, 48, 28); ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(10,50,10,.7)'; for (var i = 0; i < 4; i++) ctx.fillRect(X + 76, gY - 122 + i * 6, 10 + ((i * 7) % 16) + Math.sin(t * 3 + i) * 3, 3);
    gxGlow(X - 78, gY - 118, 70, '120,220,255', 0.28); gxGlow(X + 94, gY - 114, 56, '155,255,79', 0.22);
  }

function gxSlTerm(rx, rd) {
    gxShadow(rx, gY + 4, 46, 0.8);
    gxPanel(rx - 40, gY - 70, 80, 70, '#2a4350', { r: 4, lw: 2.6, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(a + 8, b + 36, w - 16, 3); for (var q = 0; q < 4; q++) ctx.fillRect(a + 12 + q * 16, b + 46, 10, 10); } });
    gxPanel(rx - 36, gY - 144, 72, 70, '#10202a', { r: 6, lw: 2.6 }); gxPanel(rx - 4, gY - 76, 8, 8, '#3a5a6a', { lw: 1.2 });
  }

function gxSlTerminalAnim(rx, i) {
    var rd = !!(save.mx.lr & (1 << i)), c = rd ? '#5fd8a0' : '#ffd23f';
    ctx.fillStyle = c; ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 4 + i); ctx.fillRect(rx - 30, gY - 138, 60, 58); ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(10,32,42,.55)'; for (var q = 0; q < 4; q++) ctx.fillRect(rx - 24, gY - 128 + q * 9, 22 + ((q * 13 + i * 7) % 24), 3);
    gxText('№' + (i + 1), rx, gY - 94, 12, '#10202a', null); gxGlow(rx, gY - 108, 56, rd ? '95,216,160' : '255,210,63', 0.3);
  }

function gxSlTank(tx) {
    gxShadow(tx, gY + 5, 108, 0.9);
    gxPanel(tx - 106, gY - 22, 212, 22, '#3a5a68', { r: 5, lw: 2.8, vert: true }); gxPanel(tx - 98, gY - 34, 196, 14, '#4a7282', { r: 4, lw: 2.2 });
    gxPanel(tx - 100, gY - 330, 200, 22, '#3a5a68', { r: 6, lw: 2.6 }); gxPanel(tx - 12, gY - 360, 24, 32, '#4a7282', { lw: 2 });
    gxRR(tx - 90, gY - 308, 180, 276, 24); ctx.fillStyle = gxLG(0, gY - 308, 0, gY - 32, 'rgba(120,230,220,.2)', 'rgba(70,200,200,.34)'); ctx.fill(); gxInk(3.2); ctx.strokeStyle = '#58b8b0'; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(tx - 78, gY - 296, 10, 240); ctx.fillRect(tx + 66, gY - 296, 5, 240);
    [-62, 62].forEach(function (dx) { gxTube([[tx + dx, gY - 330], [tx + dx, gY - 372], [tx + dx * 0.4, gY - 392]], 5, '#4a7282'); });
  }

function gxSlTankAnim(tx) {
    var i;
    if (ready(img.boss)) { var bh = 230, bw = bh * img.boss.naturalWidth / img.boss.naturalHeight; ctx.globalAlpha = 0.5; ctx.drawImage(img.boss, tx - bw / 2, gY - 290 + Math.sin(t * 1.5) * 6, bw, bh); ctx.globalAlpha = 0.4; ctx.fillStyle = '#16303a'; ctx.fillRect(tx - 88, gY - 306, 176, 272); ctx.globalAlpha = 1; }
    for (i = 0; i < 8; i++) { var by2 = gY - 40 - ((t * 40 + i * 37) % 260); ctx.fillStyle = 'rgba(210,255,250,.7)'; ctx.beginPath(); ctx.arc(tx - 60 + i * 17 + Math.sin(t * 2 + i) * 4, by2, 2 + (i % 3), 0, 6.3); ctx.fill(); }
    gxGlow(tx, gY - 170, 150, '88,220,210', 0.28); gxText('ОБРАЗЕЦ H-1', tx, gY - 400, 12, '#7fe6dc', null);
  }

function gxSlRack(x) {
    gxShadow(x, gY + 4, 50, 0.8); gxPanel(x - 38, gY - 210, 76, 210, '#26343e', { r: 5, lw: 2.8, vert: true });
    for (var i = 0; i < 6; i++) { gxPanel(x - 32, gY - 200 + i * 32, 64, 26, '#33444f', { r: 3, lw: 1.8 }); ctx.fillStyle = '#10181e'; ctx.fillRect(x - 6, gY - 192 + i * 32, 34, 4); ctx.fillRect(x - 6, gY - 184 + i * 32, 34, 4); }
  }

function gxSlRackAnim(x) { for (var i = 0; i < 6; i++) { ctx.fillStyle = (Math.floor(t * 3 + i * 1.7) % 3 === 0) ? '#ff5a5a' : '#5fe69a'; ctx.fillRect(x - 28, gY - 192 + i * 32, 6, 6); ctx.fillStyle = (Math.floor(t * 5 + i) % 2) ? '#ffd23f' : '#3a4a2a'; ctx.fillRect(x - 28, gY - 182 + i * 32, 6, 4); } }

function gxHillsPar(par, base, amp, c1, c2, seed, fields) {
    setCam(par);
    var a = camX * par - 40, b = a + vw + 80, i, x;
    ctx.beginPath(); ctx.moveTo(a, gY + 400);
    for (i = Math.floor(a / 40) * 40; i <= b + 40; i += 40) ctx.lineTo(i, gY - base - amp * Math.sin(i * 0.004 + seed) - amp * 0.6 * Math.sin(i * 0.011 + seed * 2));
    ctx.lineTo(b + 40, gY + 400); ctx.closePath(); ctx.fillStyle = gxLG(0, gY - base - amp * 1.6, 0, gY, c1, c2); ctx.fill();
    if (fields) {
      ctx.save(); ctx.clip(); ctx.strokeStyle = fields; ctx.lineWidth = 2;
      for (i = Math.floor(a / 18) * 18; i < b; i += 18) { x = i; ctx.beginPath(); ctx.moveTo(x, gY - base - amp * 1.4); ctx.lineTo(x - 60, gY); ctx.stroke(); }
      ctx.restore();
    }
  }

function gxBarnHD(x) {
    var w = 300, h = 170, i;
    gxShadow(x, gY + 5, 170, 0.8);
    gxPanel(x - w / 2, gY - h, w, h, '#b3302a', { lw: 3, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(60,10,8,.35)'; ctx.lineWidth = 1.6; for (var q = 0; q < ww; q += 16) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + hh); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(a, b, 20, hh); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(a + ww - 28, b, 28, hh); } });
    ctx.beginPath(); ctx.moveTo(x - w / 2 - 16, gY - h + 2); ctx.lineTo(x - w / 2 + 26, gY - h - 54); ctx.lineTo(x - 54, gY - h - 92); ctx.lineTo(x + 54, gY - h - 92); ctx.lineTo(x + w / 2 - 26, gY - h - 54); ctx.lineTo(x + w / 2 + 16, gY - h + 2); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - h - 92, 0, gY - h, '#7a2420', '#5a1a18'); ctx.fill(); gxInk(3); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.4; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 190, gY - h - 92 + i * 16); ctx.lineTo(x + 190, gY - h - 92 + i * 16); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(x - 190, gY - h - 92, 380, 8); ctx.restore();
    gxPanel(x - w / 2 - 18, gY - h - 2, w + 36, 8, '#f2ece0', { lw: 2.2 });
    gxPanel(x - 30, gY - h - 70, 60, 46, '#2a1a14', { r: 4, lw: 2.4 }); ctx.fillStyle = '#e0b94a'; ctx.beginPath(); ctx.moveTo(x - 24, gY - h - 28); ctx.lineTo(x - 18, gY - h - 40); ctx.lineTo(x - 6, gY - h - 32); ctx.lineTo(x + 8, gY - h - 44); ctx.lineTo(x + 24, gY - h - 28); ctx.fill(); gxPanel(x - 36, gY - h - 76, 72, 8, '#f2ece0', { lw: 2 });
    gxPanel(x - 64, gY - 124, 128, 124, '#e8e2d2', { r: 3, lw: 3.2 });
    ctx.strokeStyle = '#fbf8ef'; ctx.lineWidth = 8; ctx.strokeRect(x - 60, gY - 120, 120, 120); ctx.beginPath(); ctx.moveTo(x - 60, gY - 120); ctx.lineTo(x + 60, gY); ctx.moveTo(x + 60, gY - 120); ctx.lineTo(x - 60, gY); ctx.stroke(); gxInk(2.4); ctx.strokeRect(x - 64, gY - 124, 128, 124);
    [-106, 106].forEach(function (dx) { gxPanel(x + dx - 18, gY - 110, 36, 40, '#fbf8ef', { r: 3, lw: 2.2 }); ctx.fillStyle = '#7a9ab4'; ctx.fillRect(x + dx - 13, gY - 105, 26, 30); ctx.fillStyle = '#fbf8ef'; ctx.fillRect(x + dx - 1.5, gY - 105, 3, 30); ctx.fillRect(x + dx - 13, gY - 91, 26, 3); });
    gxTube([[x, gY - h - 92], [x, gY - h - 124]], 3, '#2e2a26'); ctx.fillStyle = '#2e2a26'; ctx.beginPath(); ctx.moveTo(x - 20, gY - h - 118); ctx.lineTo(x + 20, gY - h - 114); ctx.lineTo(x + 24, gY - h - 120); ctx.lineTo(x + 20, gY - h - 108); ctx.lineTo(x - 20, gY - h - 112); ctx.fill();
    gxCrate(x - 138, 0.8, '#a8763e'); gxBarrel(x + 140, 0.9, '#6a4a2c');
  }

function gxSiloHD(x) {
    var i;
    gxShadow(x, gY + 4, 46, 0.8);
    ctx.fillStyle = gxLG(x - 36, 0, x + 36, 0, '#eef1f6', '#c9ced6', '#8e97a6'); ctx.fillRect(x - 36, gY - 240, 72, 240); gxInk(2.8); ctx.strokeRect(x - 36, gY - 240, 72, 240);
    ctx.fillStyle = '#7d8798'; for (i = 1; i < 6; i++) { ctx.fillRect(x - 36, gY - 40 * i - 4, 72, 5); } ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 28, gY - 236, 8, 236);
    ctx.beginPath(); ctx.moveTo(x - 42, gY - 240); ctx.quadraticCurveTo(x - 40, gY - 292, x, gY - 296); ctx.quadraticCurveTo(x + 40, gY - 292, x + 42, gY - 240); ctx.closePath(); ctx.fillStyle = gxLG(x - 42, 0, x + 42, 0, '#b8c0ce', '#8d97a8', '#667084'); ctx.fill(); gxInk(2.8); ctx.stroke();
    gxTube([[x, gY - 296], [x, gY - 312]], 3, '#667084'); gxPanel(x + 36, gY - 220, 5, 214, '#5a6272', { lw: 1.4 }); for (i = 0; i < 9; i++) ctx.fillRect(x + 36, gY - 214 + i * 24, 5, 2);
  }

function gxMillHD(x) {
    gxShadow(x, gY + 4, 50, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 36, gY); ctx.lineTo(x - 20, gY - 210); ctx.lineTo(x + 20, gY - 210); ctx.lineTo(x + 36, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 36, 0, x + 36, 0, '#f6f2e8', '#e6e0d0', '#b9b2a0'); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.strokeStyle = 'rgba(120,110,90,.3)'; ctx.lineWidth = 1.4; for (var i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 36 + i * 0.7, gY - i * 26); ctx.lineTo(x + 36 - i * 0.7, gY - i * 26); ctx.stroke(); }
    gxPanel(x - 12, gY - 52, 24, 52, '#8a5a30', { r: 10, lw: 2.2 }); gxPanel(x - 8, gY - 150, 16, 22, '#7a9ab4', { r: 4, lw: 2 });
    ctx.beginPath(); ctx.moveTo(x - 28, gY - 210); ctx.lineTo(x, gY - 248); ctx.lineTo(x + 28, gY - 210); ctx.closePath(); ctx.fillStyle = gxLG(x - 28, 0, x + 28, 0, '#b6804a', '#9b6a3a', '#6e4824'); ctx.fill(); gxInk(2.6); ctx.stroke();
  }

function gxMillAnim(x) {
    ctx.save(); ctx.translate(x, gY - 200); ctx.rotate(t * 0.9);
    for (var i = 0; i < 4; i++) { ctx.rotate(1.5708); ctx.fillStyle = '#e6dcc4'; ctx.fillRect(-4, -112, 8, 110); gxInk(1.6); ctx.strokeRect(-4, -112, 8, 110); ctx.fillStyle = i % 2 ? '#fbf8ef' : '#e2d9c0'; ctx.fillRect(4, -110, 24, 62); gxInk(1.6); ctx.strokeRect(4, -110, 24, 62); ctx.strokeStyle = 'rgba(120,100,70,.4)'; ctx.beginPath(); ctx.moveTo(4, -96); ctx.lineTo(28, -96); ctx.moveTo(4, -80); ctx.lineTo(28, -80); ctx.moveTo(4, -64); ctx.lineTo(28, -64); ctx.stroke(); }
    ctx.restore(); ctx.fillStyle = '#6b4a2a'; ctx.beginPath(); ctx.arc(x, gY - 200, 9, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke();
  }

function gxPondHD(x, w) {
    var i;
    ctx.fillStyle = '#8a7a52'; ctx.beginPath(); ctx.ellipse(x, gY + 13, w + 10, 22, 0, 0, 6.3); ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY - 6, 0, gY + 32, '#7fd0f0', '#2f86bf'); ctx.beginPath(); ctx.ellipse(x, gY + 14, w, 17, 0, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(x - w * 0.3, gY + 9, w * 0.34, 3.6, 0, 0, 6.3); ctx.fill();
    for (i = -4; i <= 4; i++) { var rx = x + i * w * 0.23 + (i % 2) * 8; gxRockHD(rx + (i < 0 ? -w * 0.1 : w * 0.1), 0.34 + (i % 3) * 0.1); }
    [-1, 1].forEach(function (s) { for (var q = 0; q < 5; q++) { var bx = x + s * (w - 34 + q * 6), bh = 40 + q * 7; ctx.strokeStyle = '#4c8a3a'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(bx, gY + 12); ctx.quadraticCurveTo(bx + s * 3, gY - bh * 0.5, bx + s * 6, gY - bh); ctx.stroke(); ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.ellipse(bx + s * 6, gY - bh - 4, 2.8, 7, 0, 0, 6.3); ctx.fill(); } });
    [-0.35, 0.2, 0.52].forEach(function (k, j) { ctx.fillStyle = '#4fae50'; ctx.beginPath(); ctx.ellipse(x + w * k, gY + 14 + (j % 2) * 4, 10, 3.6, 0, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); if (j === 1) { ctx.fillStyle = '#ff8fb8'; ctx.beginPath(); ctx.arc(x + w * k, gY + 11, 3.2, 0, 6.3); ctx.fill(); } });
  }

function gxPondAnim(x, w) {
    var i;
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.4; for (i = 0; i < 4; i++) { var p = (t * 0.3 + i * 0.25) % 1; ctx.globalAlpha = 1 - p; ctx.beginPath(); ctx.ellipse(x + Math.sin(i * 2.1) * w * 0.4, gY + 15, 8 + p * 22, 2 + p * 5, 0, 0, 6.3); ctx.stroke(); } ctx.globalAlpha = 1;
    [0, 1].forEach(function (d) {
      var dx = x + Math.sin(t * 0.25 + d * 3) * w * 0.55, dir = Math.cos(t * 0.25 + d * 3) > 0 ? 1 : -1, dy = gY + 11 + d * 4;
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(dx, dy + 5, 16, 3, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#fbf8ef'; ctx.beginPath(); ctx.ellipse(dx, dy, 11, 7, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.beginPath(); ctx.arc(dx + dir * 9, dy - 8, 5, 0, 6.3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ff9a2a'; ctx.beginPath(); ctx.moveTo(dx + dir * 13, dy - 8); ctx.lineTo(dx + dir * 20, dy - 6); ctx.lineTo(dx + dir * 13, dy - 5); ctx.fill(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(dx + dir * 10, dy - 9, 1.2, 0, 6.3); ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,.7)'; for (i = 0; i < 6; i++) { if (Math.sin(t * 3 + i * 2.3) > 0.7) ctx.fillRect(x - w * 0.6 + i * w * 0.24, gY + 8 + (i % 3) * 4, 3, 2); }
  }

function gxHayBale(x, r) {
    gxShadow(x, gY + 3, r * 1.1, 0.7);
    ctx.fillStyle = gxLG(x - r, 0, x + r, 0, '#f2cf62', '#e0b94a', '#b88f2a'); ctx.beginPath(); ctx.arc(x, gY - r, r, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.strokeStyle = 'rgba(160,120,30,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, gY - r, r * 0.66, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.arc(x, gY - r, r * 0.34, 0, 6.3); ctx.stroke();
    ctx.strokeStyle = 'rgba(140,100,20,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (var i = 0; i < 8; i++) { var a = i * 0.785; ctx.moveTo(x + Math.cos(a) * r * 0.36, gY - r + Math.sin(a) * r * 0.36); ctx.lineTo(x + Math.cos(a) * r * 0.94, gY - r + Math.sin(a) * r * 0.94); } ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(x - r * 0.35, gY - r * 1.35, r * 0.2, 0, 6.3); ctx.fill();
  }

function gxScarecrow(x) {
    gxShadow(x, gY + 3, 26, 0.7); gxTube([[x, gY], [x, gY - 120]], 5, '#7a5230'); gxTube([[x - 44, gY - 96], [x + 44, gY - 98]], 5, '#7a5230');
    gxPanel(x - 22, gY - 104, 44, 54, '#c24a4a', { r: 8, lw: 2.4, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = '#ffd23f'; ctx.fillRect(a + 8, b + 16, 12, 12); ctx.fillStyle = '#3b7ad9'; ctx.fillRect(a + 24, b + 30, 10, 10); } });
    ctx.fillStyle = '#e8c070'; ctx.beginPath(); ctx.arc(x, gY - 122, 14, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 5, gY - 124, 2, 0, 6.3); ctx.arc(x + 5, gY - 124, 2, 0, 6.3); ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 5, gY - 116); ctx.lineTo(x + 5, gY - 116); ctx.stroke();
    ctx.fillStyle = '#a8763e'; ctx.beginPath(); ctx.ellipse(x, gY - 134, 24, 5, 0, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); gxPanel(x - 12, gY - 150, 24, 16, '#a8763e', { r: 5, lw: 2 });
    ctx.strokeStyle = '#e0b94a'; ctx.lineWidth = 2; ctx.beginPath(); [[x - 46, gY - 94], [x + 46, gY - 96], [x - 18, gY - 52], [x + 18, gY - 52]].forEach(function (p) { ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - 4, p[1] + 10); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 3, p[1] + 10); }); ctx.stroke();
  }

function gxFarmGate(x) {
    gxShadow(x, gY + 4, 76, 0.7);
    [-70, 62].forEach(function (dx) { gxPanel(x + dx, gY - 136, 12, 136, '#7a5230', { r: 3, lw: 2.4, vert: true }); });
    gxPanel(x - 76, gY - 146, 152, 14, '#8a5a2b', { r: 3, lw: 2.4 }); gxPanel(x - 46, gY - 124, 92, 28, '#a8763e', { r: 5, lw: 2.4 });
    gxTube([[x - 52, gY - 142], [x - 40, gY - 124]], 2, '#4a2e14'); gxTube([[x + 52, gY - 142], [x + 40, gY - 124]], 2, '#4a2e14');
  }

function gxFarmSign(x) {
    gxShadow(x, gY + 4, 92, 0.7);
    [-70, 62].forEach(function (dx) { gxPanel(x + dx, gY - 120, 10, 120, '#7a5230', { r: 3, lw: 2.2, vert: true }); });
    gxPanel(x - 88, gY - 156, 176, 56, '#8a5a2b', { r: 8, lw: 3, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.4; for (var q = 14; q < h; q += 14) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
    ctx.fillStyle = '#e8c25a'; [[-80, -150], [-80, -108], [80, -150], [80, -108]].forEach(function (p) { ctx.beginPath(); ctx.arc(x + p[0], gY + p[1], 2.6, 0, 6.3); ctx.fill(); });
    gxBig('ЧАЛО ХАУС', x, gY - 128, 22, '#ffe9a8', 'rgba(60,30,10,.9)');
  }

function gxSlotBusy(arr, x, pad) { for (var i = 0; i < arr.length; i++) if (Math.abs(x - arr[i][0]) < arr[i][1] + pad) return true; return false; }

function gxRubbleHD(x, s) {
    var i, r = rng(((x | 0) * 7) + 3);
    gxShadow(x, gY + 4, 56 * s, 0.8);
    for (i = 0; i < 7; i++) { var rx = x + (r() - 0.5) * 80 * s, rh = (8 + r() * 22) * s, rw = (14 + r() * 26) * s; ctx.save(); ctx.translate(rx, gY - rh * 0.4); ctx.rotate((r() - 0.5) * 0.7); gxPanel(-rw / 2, -rh / 2, rw, rh, i % 3 === 0 ? '#2e2420' : (i % 3 === 1 ? '#4a3a30' : '#3a3a42'), { lw: 1.8 }); ctx.restore(); }
    for (i = 0; i < 3; i++) gxTube([[x - 30 * s + i * 24 * s, gY - 6], [x - 6 * s + i * 20 * s, gY - 34 * s - i * 6]], 4 * s, '#2a1a12');
    ctx.fillStyle = 'rgba(255,120,40,.55)'; for (i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x - 24 * s + i * 16 * s, gY - 4 - (i % 2) * 6, 2.4, 0, 6.3); ctx.fill(); }
  }

function gxBarnRuin(x) {
    var i;
    gxShadow(x, gY + 5, 170, 0.8);
    gxPanel(x - 150, gY - 150, 104, 150, '#4a1e1a', { lw: 3, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1.6; for (var q = 0; q < w; q += 14) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + h); ctx.stroke(); } ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(a, b, w, 24); } });
    ctx.fillStyle = '#16100e'; ctx.beginPath(); ctx.moveTo(x - 150, gY - 150); ctx.lineTo(x - 134, gY - 170); ctx.lineTo(x - 118, gY - 148); ctx.lineTo(x - 100, gY - 164); ctx.lineTo(x - 82, gY - 146); ctx.lineTo(x - 46, gY - 150); ctx.lineTo(x - 46, gY - 140); ctx.lineTo(x - 150, gY - 140); ctx.fill();
    gxPanel(x + 70, gY - 62, 80, 62, '#3e1a16', { lw: 3 }); ctx.fillStyle = '#16100e'; ctx.beginPath(); ctx.moveTo(x + 70, gY - 62); ctx.lineTo(x + 88, gY - 78); ctx.lineTo(x + 102, gY - 58); ctx.lineTo(x + 126, gY - 74); ctx.lineTo(x + 150, gY - 60); ctx.lineTo(x + 150, gY - 56); ctx.lineTo(x + 70, gY - 56); ctx.fill();
    gxTube([[x - 130, gY - 168], [x - 40, gY - 150], [x + 30, gY - 100]], 9, '#1c1412'); gxTube([[x - 60, gY - 156], [x + 10, gY - 112], [x + 20, gY - 72]], 8, '#241a16'); gxTube([[x - 20, gY - 20], [x + 60, gY - 46]], 8, '#1c1412');
    gxPanel(x - 38, gY - 90, 76, 90, '#6a4a3a', { lw: 2.4 }); ctx.strokeStyle = '#2a1a14'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 36, gY - 88); ctx.lineTo(x + 36, gY - 2); ctx.stroke();
    gxRubbleHD(x - 70, 1.1); gxRubbleHD(x + 40, 1.0);
  }

function gxSiloRuin(x) {
    gxShadow(x, gY + 4, 56, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 36, gY); ctx.lineTo(x - 36, gY - 190); ctx.lineTo(x - 18, gY - 150); ctx.lineTo(x - 2, gY - 196); ctx.lineTo(x + 14, gY - 120); ctx.lineTo(x + 36, gY - 90); ctx.lineTo(x + 36, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 36, 0, x + 36, 0, '#5a5048', '#3a322c', '#241e1a'); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.fillStyle = '#2a2420'; for (var i = 1; i < 4; i++) ctx.fillRect(x - 36, gY - 44 * i, 72, 4);
    ctx.save(); ctx.translate(x + 62, gY - 10); ctx.rotate(-0.06); ctx.fillStyle = gxLG(0, -28, 0, 0, '#5a5048', '#2a2420'); ctx.fillRect(-4, -28, 74, 28); gxInk(2.4); ctx.strokeRect(-4, -28, 74, 28); ctx.restore();
    ctx.fillStyle = '#ff7a2a'; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(x - 18, gY - 120, 4, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1;
  }

function gxMillRuin(x) {
    gxShadow(x, gY + 4, 60, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 38, gY); ctx.lineTo(x - 26, gY - 130); ctx.lineTo(x - 10, gY - 150); ctx.lineTo(x + 6, gY - 124); ctx.lineTo(x + 24, gY - 142); ctx.lineTo(x + 38, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 38, 0, x + 38, 0, '#6a6058', '#463e38', '#2a2420'); ctx.fill(); gxInk(2.8); ctx.stroke();
    gxTube([[x - 8, gY - 148], [x - 60, gY - 118], [x - 100, gY - 40]], 8, '#2a1a12'); gxTube([[x + 16, gY - 140], [x + 70, gY - 160]], 7, '#2a1a12'); gxTube([[x - 100, gY - 40], [x - 130, gY - 8]], 6, '#2a1a12');
    gxPanel(x - 14, gY - 40, 28, 40, '#241a16', { r: 12, lw: 2 }); gxRubbleHD(x + 80, 0.9);
  }

function gxBrokenSign(x) {
    gxShadow(x, gY + 4, 80, 0.7); gxPanel(x - 70, gY - 110, 8, 110, '#3a2a20', { lw: 2.2 }); gxPanel(x + 62, gY - 80, 8, 80, '#3a2a20', { lw: 2.2 });
    ctx.save(); ctx.translate(x - 70, gY - 108); ctx.rotate(0.34); gxPanel(0, 0, 156, 50, '#4a3020', { r: 6, lw: 2.8, vert: true }); gxBig('ЧАЛО ХАУС', 78, 26, 18, '#9a8a70', null); ctx.restore();
    ctx.strokeStyle = '#1a1210'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 36, gY - 110); ctx.lineTo(x - 22, gY - 94); ctx.stroke();
  }

function gxTpBase(X) {
    gxShadow(X, gY + 5, 88, 0.9);
    gxPanel(X - 74, gY - 26, 148, 26, '#26323c', { r: 5, lw: 2.8, vert: true }); gxPanel(X - 60, gY - 42, 120, 18, '#3a4a58', { r: 4, lw: 2.4 });
    ctx.fillStyle = '#6fd6ff'; for (var i = -2; i <= 2; i++) ctx.fillRect(X + i * 22 - 5, gY - 20, 10, 4);
    [-62, 62].forEach(function (dx) { gxPanel(X + dx - 7, gY - 150, 14, 112, '#3a4a58', { r: 3, lw: 2.2, vert: true }); gxPanel(X + dx - 11, gY - 156, 22, 10, '#5a6a78', { lw: 1.8 }); });
  }

function gxTpAnim(X) {
    var sp = 0.8 + 0.2 * Math.sin(t * 3), i;
    gxGlow(X, gY - 120, 130 * sp, '120,230,255', 0.4);
    ctx.fillStyle = 'rgba(10,30,50,.7)'; ctx.beginPath(); ctx.arc(X, gY - 120, 58, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#6fd6ff'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(X, gY - 120, 64, 0, 6.3); ctx.stroke(); gxInk(2); ctx.beginPath(); ctx.arc(X, gY - 120, 70, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.arc(X, gY - 120, 57, 0, 6.3); ctx.stroke();
    ctx.save(); ctx.translate(X, gY - 120); ctx.rotate(t * 1.2); ctx.strokeStyle = 'rgba(190,240,255,.9)'; ctx.lineWidth = 3; for (i = 0; i < 5; i++) { ctx.rotate(1.2566); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(26, -12, 54, 6); ctx.stroke(); } ctx.restore();
    ctx.fillStyle = 'rgba(210,250,255,.8)'; for (i = 0; i < 8; i++) { var a = t * 1.6 + i * 0.785, rr = 44 + Math.sin(t * 3 + i) * 8; ctx.beginPath(); ctx.arc(X + Math.cos(a) * rr, gY - 120 + Math.sin(a) * rr, 2.2, 0, 6.3); ctx.fill(); }
    gxText('МАШИНА ТЕЛЕПОРТА', X, gY - 214, 13, '#bff0ff', 'rgba(5,30,50,.85)');
  }

function gxTermWin(cx) {
    var wx = cx - 120, wy = gY - 340, ww = 240, wh = 150;
    gxPanel(wx - 8, wy - 8, ww + 16, wh + 16, '#8795ab', { r: 6, lw: 2.8 });
    ctx.fillStyle = gxLG(0, wy, 0, wy + wh, '#5db6ee', '#d8f0fb'); ctx.fillRect(wx, wy, ww, wh);
    ctx.fillStyle = '#9ad08a'; ctx.beginPath(); ctx.moveTo(wx, wy + wh - 40); ctx.quadraticCurveTo(wx + 70, wy + wh - 62, wx + 130, wy + wh - 40); ctx.quadraticCurveTo(wx + 190, wy + wh - 58, wx + ww, wy + wh - 42); ctx.lineTo(wx + ww, wy + wh); ctx.lineTo(wx, wy + wh); ctx.fill();
    ctx.fillStyle = '#7f8896'; ctx.fillRect(wx, wy + wh - 34, ww, 34); ctx.fillStyle = '#f4f1c8'; for (var d = 0; d < 5; d++) ctx.fillRect(wx + 10 + d * 50, wy + wh - 18, 28, 3);
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.moveTo(wx, wy + wh); ctx.lineTo(wx + 90, wy); ctx.lineTo(wx + 124, wy); ctx.lineTo(wx + 34, wy + wh); ctx.fill();
    gxInk(2.2); ctx.strokeRect(wx, wy, ww, wh); ctx.fillStyle = '#8795ab'; ctx.fillRect(cx - 2, wy, 4, wh); gxPanel(wx - 12, wy + wh + 6, ww + 24, 8, '#a9b6c8', { r: 3, lw: 2 });
  }

function gxTermWinAnim(cx, k) {
    var wx = cx - 120, wy = gY - 340, ww = 240, wh = 150, px = wx + ((t * 28 + k * 90) % (ww + 120)) - 60;
    ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
    ctx.fillStyle = '#f2f5f9'; gxRR(px, wy + wh - 62, 76, 16, 8); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#d8362f'; ctx.fillRect(px + 8, wy + wh - 56, 50, 4); ctx.beginPath(); ctx.moveTo(px + 6, wy + wh - 62); ctx.lineTo(px - 4, wy + wh - 80); ctx.lineTo(px + 12, wy + wh - 62); ctx.fill();
    ctx.fillStyle = '#9fb4cc'; for (var q = 0; q < 6; q++) ctx.fillRect(px + 22 + q * 7, wy + wh - 59, 4, 3);
    ctx.restore();
  }

function gxTermDoor(x, label, col) {
    gxShadow(x, gY + 4, 66, 0.7);
    gxPanel(x - 56, gY - 200, 112, 200, col, { r: 8, lw: 3, vert: true }); gxPanel(x - 46, gY - 190, 92, 190, '#1f3a5a', { r: 5, lw: 2.2 });
    ctx.fillStyle = gxLG(0, gY - 186, 0, gY, '#cfeaf8', '#7fc0e4'); ctx.fillRect(x - 40, gY - 184, 80, 184); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x - 40, gY); ctx.lineTo(x - 6, gY - 184); ctx.lineTo(x + 8, gY - 184); ctx.lineTo(x - 26, gY); ctx.fill(); ctx.fillStyle = '#1f3a5a'; ctx.fillRect(x - 1.5, gY - 184, 3, 184);
    gxPanel(x - 64, gY - 250, 128, 34, '#ffffff', { r: 9, lw: 2.6, vert: true }); gxText(label, x, gY - 233, 12, '#26456f', null);
  }

function gxTermBench(x) {
    gxShadow(x, gY + 3, 54, 0.6);
    for (var i = 0; i < 2; i++) gxPanel(x - 50, gY - 30 - i * 24, 100, 12, '#4a6fa5', { r: 5, lw: 2.2, vert: true });
    [-44, 40].forEach(function (dx) { gxPanel(x + dx, gY - 32, 6, 32, '#2a3a5a', { lw: 1.8 }); });
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x - 46, gY - 28, 92, 2);
  }

function gxKassa(kx) {
    gxShadow(kx, gY + 4, 124, 0.8);
    gxPanel(kx - 110, gY - 70, 220, 70, '#6f7d92', { r: 4, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(255,255,255,.1)'; for (var q = 0; q < w; q += 44) ctx.fillRect(a + q, b + 8, 40, h - 16); } });
    gxPanel(kx - 120, gY - 80, 240, 12, '#93a3b9', { r: 3, lw: 2.4 });
    gxPanel(kx - 92, gY - 164, 184, 84, 'rgba(160,215,245,.7)', { r: 5, lw: 3 }); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(kx - 90, gY - 82); ctx.lineTo(kx - 40, gY - 162); ctx.lineTo(kx - 18, gY - 162); ctx.lineTo(kx - 68, gY - 82); ctx.fill();
    gxPanel(kx - 20, gY - 130, 40, 30, '#1f2a3a', { r: 3, lw: 2 }); ctx.fillStyle = '#7dff9c'; ctx.fillRect(kx - 15, gY - 125, 30, 4); ctx.fillStyle = '#9fb3d1'; ctx.fillRect(kx - 15, gY - 117, 20, 3); gxPanel(kx + 50, gY - 94, 28, 14, '#efe9d8', { lw: 1.6 });
    gxPanel(kx - 74, gY - 218, 148, 38, '#1f4aa8', { r: 9, lw: 2.8, vert: true }); gxBig('КАССА', kx, gY - 199, 22, '#ffffff', null);
  }

function gxCafe(cx) {
    gxShadow(cx, gY + 4, 130, 0.8);
    gxPanel(cx - 120, gY - 64, 240, 64, '#8a5a3a', { r: 4, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; for (var q = 24; q < w; q += 48) { ctx.beginPath(); ctx.moveTo(a + q, b + 6); ctx.lineTo(a + q, b + h - 6); ctx.stroke(); } } });
    gxPanel(cx - 130, gY - 74, 260, 12, '#b07a52', { r: 3, lw: 2.4 });
    gxPanel(cx + 30, gY - 112, 62, 38, '#4a4e5a', { r: 5, lw: 2.4, vert: true }); gxPanel(cx + 38, gY - 124, 46, 14, '#d9dde6', { r: 4, lw: 2 }); ctx.fillStyle = '#d33a3a'; ctx.beginPath(); ctx.arc(cx + 48, gY - 96, 3, 0, 6.3); ctx.fill();
    gxPanel(cx - 100, gY - 112, 54, 38, '#2a2f3a', { r: 4, lw: 2.4 }); ctx.fillStyle = '#ffe9a8'; ctx.fillRect(cx - 94, gY - 104, 42, 3); ctx.fillRect(cx - 94, gY - 96, 30, 3); ctx.fillRect(cx - 94, gY - 88, 36, 3);
    [-30, 4].forEach(function (dx) { gxPanel(cx + dx - 8, gY - 92, 16, 20, '#ffffff', { r: 3, lw: 1.8 }); });
    gxPanel(cx - 66, gY - 168, 132, 38, '#2f9e6a', { r: 9, lw: 2.8, vert: true }); gxBig('КАФЕ', cx, gY - 149, 22, '#ffffff', null);
    [-90, 90].forEach(function (dx) { gxTube([[cx + dx, gY - 2], [cx + dx, gY - 40]], 4, '#5a6270'); ctx.fillStyle = '#b07a52'; ctx.beginPath(); ctx.ellipse(cx + dx, gY - 40, 14, 4, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); });
  }

function gxTermBoard(bx) {
    gxPanel(bx - 6, gY - 340, 12, 70, '#4a5a74', { lw: 1.8 }); gxPanel(bx - 160, gY - 276, 320, 158, '#10243f', { r: 8, lw: 3.4 }); ctx.strokeStyle = '#5b7aa6'; ctx.lineWidth = 3; gxRR(bx - 152, gY - 268, 304, 142, 5); ctx.stroke();
  }

function gxTermLuggage(x) { gxShadow(x, gY + 3, 40, 0.6); gxPanel(x - 24, gY - 46, 48, 40, '#c24a4a', { r: 6, lw: 2.4, vert: true }); gxPanel(x - 10, gY - 56, 20, 12, '#8a2a2a', { r: 3, lw: 1.8 }); [-14, 14].forEach(function (dx) { ctx.fillStyle = '#2a2a30'; ctx.beginPath(); ctx.arc(x + dx, gY - 3, 4, 0, 6.3); ctx.fill(); }); gxPanel(x - 3, gY - 40, 6, 34, '#7a2020', { lw: 1 }); }

function gxLabWin(cx, k) {
    var wx = cx - 150, wy = gY - 370, ww = 300, wh = 190, q, r, bh, bx;
    gxPanel(wx - 10, wy - 10, ww + 20, wh + 20, '#9fb0c8', { r: 8, lw: 3 });
    ctx.save(); gxRR(wx, wy, ww, wh, 4); ctx.clip();
    ctx.fillStyle = gxLG(0, wy, 0, wy + wh, '#0b1030', '#34498a', '#9fb2e6'); ctx.fillRect(wx, wy, ww, wh);
    ctx.fillStyle = 'rgba(255,255,255,.85)'; for (q = 0; q < 16; q++) ctx.fillRect(wx + ((q * 53 + k * 19) % ww), wy + ((q * 29) % 90), 1.6, 1.6);
    ctx.fillStyle = '#f6f2d6'; ctx.beginPath(); ctx.arc(wx + 60 + (k % 3) * 80, wy + 44, 15, 0, 6.3); ctx.fill(); gxGlow(wx + 60 + (k % 3) * 80, wy + 44, 54, '255,244,200', 0.5);
    for (r = 0; r < 2; r++) for (q = 0; q < 11; q++) {
      bh = 46 + ((q * 37 + k * 13 + r * 29) % 70) + r * 24; bx = wx + q * 30 - r * 12;
      ctx.fillStyle = r ? '#1b2547' : '#2d3b6a'; ctx.fillRect(bx, wy + wh - bh, 27, bh); gxInk(1.2); ctx.strokeRect(bx, wy + wh - bh, 27, bh);
      ctx.fillStyle = 'rgba(255,224,140,.75)'; for (var wy2 = wy + wh - bh + 8; wy2 < wy + wh - 8; wy2 += 12) for (var wx2 = 4; wx2 < 22; wx2 += 9) if (((q * 5 + wy2 * 3 + wx2 + k) | 0) % 5 < 2) ctx.fillRect(bx + wx2, wy2, 4, 5);
    }
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(wx + 20, wy + wh); ctx.lineTo(wx + 120, wy); ctx.lineTo(wx + 168, wy); ctx.lineTo(wx + 68, wy + wh); ctx.fill();
    ctx.restore();
    gxInk(2.6); gxRR(wx, wy, ww, wh, 4); ctx.stroke();
    ctx.fillStyle = '#8fa3bf'; ctx.fillRect(cx - 3, wy, 6, wh); ctx.fillRect(wx, wy + wh * 0.5 - 2.5, ww, 5); gxInk(1.4); ctx.strokeRect(cx - 3, wy, 6, wh);
    gxPanel(wx - 16, wy + wh + 8, ww + 32, 9, '#b6c4d8', { r: 3, lw: 2.2 });
  }

function gxAirlock(x, label, col) {
    var i;
    gxShadow(x, gY + 4, 72, 0.7);
    gxPanel(x - 60, gY - 206, 120, 206, '#a9b5c6', { r: 9, lw: 3, vert: true });
    gxPanel(x - 47, gY - 194, 94, 194, col, { r: 6, lw: 2.4, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(a + w / 2, b); ctx.lineTo(a + w / 2, b + h); ctx.stroke(); ctx.strokeRect(a + 8, b + 10, w - 16, h * 0.34); ctx.strokeRect(a + 8, b + h * 0.52, w - 16, h * 0.34); } });
    ctx.fillStyle = gxLG(0, gY - 156, 0, gY - 108, '#d8f2ff', '#76bfe8'); ctx.beginPath(); ctx.arc(x, gY - 132, 21, 0, 6.3); ctx.fill(); gxInk(3.2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(x - 6, gY - 138, 8, 3.3, 5.0); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.rect(x - 47, gY - 28, 94, 16); ctx.clip(); ctx.fillStyle = '#ffd23f'; ctx.fillRect(x - 47, gY - 28, 94, 16); ctx.fillStyle = '#262a32';
    for (i = -2; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 47 + i * 16, gY - 12); ctx.lineTo(x - 39 + i * 16, gY - 28); ctx.lineTo(x - 31 + i * 16, gY - 28); ctx.lineTo(x - 39 + i * 16, gY - 12); ctx.closePath(); ctx.fill(); } ctx.restore(); gxInk(1.6); ctx.strokeRect(x - 47, gY - 28, 94, 16);
    gxPanel(x + 52, gY - 118, 14, 32, '#27324a', { r: 3, lw: 1.8 }); ctx.fillStyle = '#5ee08a'; ctx.fillRect(x + 55, gY - 114, 8, 4); ctx.fillStyle = '#9fb3d1'; for (i = 0; i < 4; i++) ctx.fillRect(x + 55 + (i % 2) * 4, gY - 106 + Math.floor(i / 2) * 7, 3, 4);
    gxPanel(x - 62, gY - 254, 124, 34, '#ffffff', { r: 9, lw: 2.6, vert: true }); gxText(label, x, gY - 237, 13, '#26456f', null);
  }

function gxLabBench(X) {
    var i;
    gxShadow(X + 68, gY + 4, 96, 0.8);
    gxPanel(X - 14, gY - 62, 164, 62, '#56667a', { r: 3, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 8, b + 8, w * 0.5 - 12, h - 16); ctx.strokeRect(a + w * 0.5 + 4, b + 8, w * 0.5 - 12, h - 16); ctx.fillStyle = '#c9d4e2'; ctx.fillRect(a + w * 0.25 - 10, b + 24, 20, 4); ctx.fillRect(a + w * 0.75 - 10, b + 24, 20, 4); } });
    gxPanel(X - 22, gY - 72, 180, 12, '#8fa0b6', { r: 3, lw: 2.4 });
    [[X - 4, '#10243f'], [X + 60, '#10243f']].forEach(function (m) {
      gxPanel(m[0] + 22, gY - 90, 10, 18, '#4a5a70', { lw: 1.6 }); gxPanel(m[0] + 12, gY - 78, 30, 7, '#4a5a70', { r: 2, lw: 1.6 });
      gxPanel(m[0], gY - 142, 54, 52, '#2c3a52', { r: 5, lw: 2.4 }); ctx.fillStyle = m[1]; ctx.fillRect(m[0] + 5, gY - 137, 44, 40);
    });
    gxShadow(X + 134, gY - 72, 14, 0.5);
    ctx.fillStyle = 'rgba(210,240,255,.7)'; ctx.beginPath(); ctx.moveTo(X + 128, gY - 100); ctx.lineTo(X + 140, gY - 100); ctx.lineTo(X + 148, gY - 74); ctx.lineTo(X + 120, gY - 74); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = 'rgba(110,230,170,.85)'; ctx.beginPath(); ctx.moveTo(X + 124, gY - 86); ctx.lineTo(X + 144, gY - 86); ctx.lineTo(X + 148, gY - 74); ctx.lineTo(X + 120, gY - 74); ctx.closePath(); ctx.fill();
  }

function gxLabBenchAnim(X) {
    var i, cols = ['#7dff9c', '#6bc4ff'], mx = [X - 4, X + 60];
    for (i = 0; i < 2; i++) {
      var m = mx[i]; ctx.fillStyle = 'rgba(' + (i ? '40,90,150' : '30,120,80') + ',.25)'; ctx.fillRect(m + 5, gY - 137, 44, 40);
      ctx.strokeStyle = cols[i]; ctx.lineWidth = 2; ctx.beginPath();
      for (var q = 0; q < 9; q++) { var yy = gY - 117 + Math.sin(t * 2.4 + q * 0.9 + i * 2) * 11 * Math.sin(q * 0.5 + 1); if (q) ctx.lineTo(m + 8 + q * 4.7, yy); else ctx.moveTo(m + 8, yy); } ctx.stroke();
      gxGlow(m + 27, gY - 117, 50, i ? '107,196,255' : '125,255,156', 0.22);
    }
  }

function gxLabPodAnim(X) {
    gxShadow(X - 96, gY + 4, 94, 0.8);
    gxPanel(X - 170, gY - 86, 150, 12, '#e9eef6', { r: 5, lw: 2.4 }); gxPanel(X - 166, gY - 74, 142, 34, '#7e91aa', { r: 4, lw: 2.4, vert: true });
    [-150, -44].forEach(function (dx) { gxPanel(X + dx - 3, gY - 42, 6, 30, '#4a5a70', { lw: 1.6 }); ctx.fillStyle = '#2a2f3a'; ctx.beginPath(); ctx.arc(X + dx, gY - 8, 8, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); });
    gxPanel(X - 20, gY - 134, 8, 62, '#6a7b92', { lw: 1.8 }); gxPanel(X - 52, gY - 156, 56, 30, '#162840', { r: 5, lw: 2.2 });
    ctx.strokeStyle = '#ff6a6a'; ctx.lineWidth = 2; ctx.beginPath();
    for (var q = 0; q < 12; q++) { var u = (q + t * 6) % 12, yy = gY - 141 + (u % 6 === 2 ? -9 : (u % 6 === 3 ? 8 : 0)); if (q) ctx.lineTo(X - 48 + q * 4, yy); else ctx.moveTo(X - 48, yy); } ctx.stroke();
    gxGlow(X - 24, gY - 141, 36, '255,106,106', 0.22 + 0.1 * Math.sin(t * 6));
    if (ready(img.mell)) ctx.drawImage(img.mell, 0, 0, 224, 99, X - 164, gY - 130, 128, 56);
  }

function gxLabBoard(B) {
    var i;
    gxPanel(B - 168, gY - 326, 336, 206, '#8fa3bf', { r: 10, lw: 3.2 });
    gxPanel(B - 152, gY - 310, 304, 174, '#0f2240', { r: 6, lw: 2.6 });
    ctx.strokeStyle = 'rgba(91,122,166,.5)'; ctx.lineWidth = 1.2; for (i = 1; i < 10; i++) { ctx.beginPath(); ctx.moveTo(B - 148 + i * 30, gY - 306); ctx.lineTo(B - 148 + i * 30, gY - 140); ctx.stroke(); }
    for (i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(B - 148, gY - 306 + i * 28); ctx.lineTo(B + 148, gY - 306 + i * 28); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(B - 152, gY - 136); ctx.lineTo(B - 40, gY - 310); ctx.lineTo(B + 6, gY - 310); ctx.lineTo(B - 106, gY - 136); ctx.fill();
    gxShadow(B, gY + 4, 112, 0.8);
    gxPanel(B - 100, gY - 64, 200, 64, '#56667a', { r: 4, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.24)'; for (var q = 0; q < 8; q++) ctx.fillRect(a + 14 + q * 22, b + 14, 14, 10); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(a + 14, b + 34, w - 28, 3); } });
    gxPanel(B - 108, gY - 74, 216, 12, '#8fa0b6', { r: 3, lw: 2.4 });
    [[B - 70, '#ffd23f'], [B - 24, '#5ee08a'], [B + 22, '#ff6a6a'], [B + 68, '#6bc4ff']].forEach(function (b) { ctx.fillStyle = b[1]; ctx.beginPath(); ctx.arc(b[0], gY - 44, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); });
  }

function gxLabBoardAnim(B) {
    var i;
    ctx.font = '700 13px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffd23f'; ctx.fillText('МУЛЬТИВСЕЛЕННАЯ', B - 134, gY - 292);
    for (i = 0; i < 5; i++) { var dead = ((save.mx.c2u | 0) >> i) & 1; ctx.fillStyle = dead ? '#ff7a7a' : '#7dff9c'; ctx.fillText((dead ? '✕ ' : '● ') + C2U[i].n.replace('Вселенная ', ''), B - 134, gY - 266 + i * 24); }
    gxGlow(B, gY - 222, 190, '110,160,255', 0.16 + 0.05 * Math.sin(t * 2));
  }

function gxGunAnim(X) {
    if (!save.mx.c2m) return;
    var left = 5 - bitCount(save.mx.c2u | 0), col = left ? '120,230,255' : '120,120,140', i;
    gxShadow(X, gY + 4, 68, 0.8);
    gxPanel(X - 56, gY - 34, 112, 34, '#33414f', { r: 5, lw: 2.8, vert: true }); gxPanel(X - 9, gY - 120, 18, 88, '#46586a', { lw: 2.4 });
    for (i = 0; i < 3; i++) { ctx.fillStyle = left ? '#5ee08a' : '#5a6070'; ctx.beginPath(); ctx.arc(X - 30 + i * 30, gY - 18, 4, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }
    ctx.save(); ctx.translate(X, gY - 126); ctx.rotate(-0.25);
    gxPanel(-18, -19, 108, 38, '#5a6e82', { r: 9, lw: 2.6, vert: true }); gxPanel(64, -13, 46, 26, '#1f2e3a', { r: 6, lw: 2.2 });
    ctx.fillStyle = 'rgba(' + col + ',.85)'; for (i = 0; i < 4; i++) ctx.fillRect(10 + i * 13, -19, 5, 38);
    ctx.restore();
    gxGlow(X + 100, gY - 152, 46 + 9 * Math.sin(t * 4), col, 0.55);
    gxText('ПУШКА ТЕЛЕПОРТА', X, gY - 196, 13, '#ffffff', 'rgba(10,20,44,.85)'); gxText(left ? 'вселенных: ' + left : 'цели закончились', X, gY - 178, 12, left ? '#9fe8ff' : '#a8a8b4', 'rgba(10,20,44,.85)');
  }

function gxRetMach(R) {
    var i, cy = gY - 134;
    gxShadow(R, gY + 5, 134, 0.9);
    gxPanel(R - 126, gY - 26, 252, 26, '#4a5a6e', { r: 6, lw: 3, vert: true, tex: function (a, b, w, h) { ctx.save(); ctx.fillStyle = '#ffd23f'; for (var q = 0; q < w; q += 30) { ctx.beginPath(); ctx.moveTo(a + q, b + h); ctx.lineTo(a + q + 8, b + h - 8); ctx.lineTo(a + q + 16, b + h - 8); ctx.lineTo(a + q + 8, b + h); ctx.closePath(); ctx.fill(); } ctx.restore(); } });
    [-96, 96].forEach(function (dx) { gxPanel(R + dx - 11, gY - 126, 22, 102, '#6a7b92', { r: 4, lw: 2.6 }); });
    ctx.beginPath(); ctx.arc(R, cy, 110, 0, 6.3); ctx.lineWidth = 22; ctx.strokeStyle = GXI; ctx.stroke();
    ctx.lineWidth = 16; ctx.strokeStyle = gxLG(R - 110, cy - 110, R + 110, cy + 110, '#c3cfdf', '#8fa3bf', '#56667a'); ctx.stroke();
    ctx.beginPath(); ctx.arc(R, cy, 102, 0, 6.3); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.stroke();
    ctx.fillStyle = '#26456f'; for (i = 0; i < 12; i++) { var an = i / 12 * 6.283; ctx.beginPath(); ctx.arc(R + Math.cos(an) * 110, cy + Math.sin(an) * 110, 4.5, 0, 6.3); ctx.fill(); }
    gxPanel(R - 18, cy - 130, 36, 14, '#4a5a70', { r: 4, lw: 2.2 }); gxText('АППАРАТ ВОЗВРАТА', R, gY - 272, 13, '#26456f', 'rgba(255,255,255,.9)');
  }

function gxRetMachAnim(R) {
    var cy = gY - 134, i, pl = 0.5 + 0.5 * Math.sin(t * 3), g;
    ctx.save(); ctx.beginPath(); ctx.arc(R, cy, 100, 0, 6.3); ctx.clip();
    g = ctx.createRadialGradient(R, cy, 6, R, cy, 100); g.addColorStop(0, 'rgba(210,246,255,' + (0.5 + 0.2 * pl).toFixed(2) + ')'); g.addColorStop(0.55, 'rgba(110,200,255,.3)'); g.addColorStop(1, 'rgba(60,120,230,.12)'); ctx.fillStyle = g; ctx.fillRect(R - 100, cy - 100, 200, 200);
    ctx.lineWidth = 3; for (i = 0; i < 4; i++) { ctx.strokeStyle = 'rgba(200,240,255,' + (0.5 - i * 0.08).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(R, cy, 24 + i * 20, t * (1.2 - i * 0.22) + i, t * (1.2 - i * 0.22) + i + 2.0); ctx.stroke(); }
    ctx.restore();
    gxGlow(R, cy, 150 + 10 * pl, '140,220,255', 0.3);
  }

function gxLabCabinet(x) {
    var i, j;
    gxShadow(x, gY + 4, 56, 0.8);
    gxPanel(x - 46, gY - 170, 92, 170, '#7d8ea3', { r: 5, lw: 2.8, vert: true });
    ctx.fillStyle = 'rgba(170,215,240,.35)'; gxRR(x - 38, gY - 160, 76, 128, 3); ctx.fill(); gxInk(1.8); ctx.stroke();
    for (i = 0; i < 3; i++) {
      gxPanel(x - 38, gY - 126 + i * 42 + 34, 76, 5, '#a9b6c8', { lw: 1.4 });
      for (j = 0; j < 3; j++) { var c = ['#6be0a8', '#ffd86a', '#ff8a9a', '#7fc4ff', '#c79bff'][(i * 3 + j) % 5]; gxPanel(x - 33 + j * 24, gY - 152 + i * 42 + 8, 17, 26, c, { r: 5, lw: 1.6, vert: true }); ctx.fillStyle = '#e8eef6'; ctx.fillRect(x - 31 + j * 24, gY - 154 + i * 42 + 6, 13, 4); }
    }
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.moveTo(x - 38, gY - 36); ctx.lineTo(x - 6, gY - 160); ctx.lineTo(x + 8, gY - 160); ctx.lineTo(x - 24, gY - 36); ctx.fill();
    gxPanel(x - 30, gY - 24, 60, 18, '#5c6c82', { r: 3, lw: 1.8 }); ctx.fillStyle = '#c9d4e2'; ctx.fillRect(x - 8, gY - 17, 16, 3);
  }

function gxLabTrolley(x) {
    gxShadow(x, gY + 3, 38, 0.7);
    gxPanel(x - 26, gY - 54, 52, 6, '#8fa0b6', { r: 2, lw: 2 }); gxPanel(x - 26, gY - 28, 52, 5, '#8fa0b6', { r: 2, lw: 2 });
    [-22, 20].forEach(function (dx) { gxPanel(x + dx - 2, gY - 54, 4, 50, '#56667a', { lw: 1.4 }); ctx.fillStyle = '#2a2f3a'; ctx.beginPath(); ctx.arc(x + dx, gY - 3, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); });
    ctx.fillStyle = 'rgba(210,240,255,.75)'; ctx.beginPath(); ctx.moveTo(x - 16, gY - 76); ctx.lineTo(x - 6, gY - 76); ctx.lineTo(x - 2, gY - 56); ctx.lineTo(x - 20, gY - 56); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    gxPanel(x + 4, gY - 70, 18, 14, '#ff9a6a', { r: 4, lw: 1.8 }); gxPanel(x - 20, gY - 46, 40, 18, '#e8eef6', { r: 3, lw: 1.6 });
  }

function gxCentrifuge(x) {
    gxShadow(x, gY + 4, 56, 0.8);
    gxPanel(x - 44, gY - 56, 88, 56, '#6f7f94', { r: 4, lw: 2.8, vert: true }); gxPanel(x - 50, gY - 66, 100, 11, '#9eb0c6', { r: 3, lw: 2.4 });
    gxPanel(x - 34, gY - 104, 68, 40, '#c9d4e2', { r: 14, lw: 2.8, vert: true }); gxPanel(x - 28, gY - 112, 56, 12, '#e9eef6', { r: 6, lw: 2.2 });
    ctx.fillStyle = '#26456f'; ctx.beginPath(); ctx.arc(x, gY - 84, 10, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = '#5ee08a'; ctx.beginPath(); ctx.arc(x - 28, gY - 36, 4, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(x - 16, gY - 36, 4, 0, 6.3); ctx.fill();
    gxPanel(x + 10, gY - 44, 24, 14, '#1a2a40', { r: 3, lw: 1.6 });
  }

function gxBlabWin(cx, k) {
    var wx = cx - 150, wy = gY - 370, ww = 300, wh = 190, i;
    gxPanel(wx - 10, wy - 10, ww + 20, wh + 20, '#5a4a46', { r: 8, lw: 3 });
    ctx.fillStyle = '#1a0a08'; gxRR(wx, wy, ww, wh, 4); ctx.fill();
    ctx.save(); gxRR(wx, wy, ww, wh, 4); ctx.clip();
    ctx.fillStyle = 'rgba(150,170,200,.22)';
    ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 70, wy); ctx.lineTo(wx + 34, wy + 62); ctx.lineTo(wx, wy + 40); ctx.fill();
    ctx.beginPath(); ctx.moveTo(wx + ww, wy); ctx.lineTo(wx + ww - 90, wy); ctx.lineTo(wx + ww - 48, wy + 54); ctx.lineTo(wx + ww, wy + 80); ctx.fill();
    ctx.beginPath(); ctx.moveTo(wx + ww, wy + wh); ctx.lineTo(wx + ww - 120, wy + wh); ctx.lineTo(wx + ww - 70, wy + wh - 50); ctx.lineTo(wx + ww, wy + wh - 70); ctx.fill();
    ctx.beginPath(); ctx.moveTo(wx, wy + wh); ctx.lineTo(wx + 52, wy + wh); ctx.lineTo(wx + 16, wy + wh - 38); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx + 40, wy); ctx.lineTo(wx + 90, wy + 70); ctx.lineTo(wx + 70, wy + 130); ctx.lineTo(wx + 140, wy + wh); ctx.stroke();
    ctx.fillStyle = '#2b1a14'; ctx.beginPath(); ctx.moveTo(wx + 100, wy + wh); for (i = 0; i < 8; i++) ctx.lineTo(wx + 100 + i * 14, wy + wh - 20 - ((i * 37 + k * 11) % 26)); ctx.lineTo(wx + 200, wy + wh); ctx.fill();
    ctx.restore();
    gxInk(2.6); gxRR(wx, wy, ww, wh, 4); ctx.stroke();
    ctx.fillStyle = '#4a3a36'; ctx.save(); ctx.translate(cx + 4, wy); ctx.rotate(0.05); ctx.fillRect(-3, 0, 6, wh * 0.8); ctx.restore(); ctx.fillRect(wx, wy + wh * 0.5 - 2.5, ww * 0.55, 5);
    gxPanel(wx - 16, wy + wh + 8, ww + 32, 9, '#4e3e3a', { r: 3, lw: 2.2 });
  }

function gxBlabWinAnim(cx, k) {
    var fl = 0.34 + 0.14 * Math.sin(t * 3 + k * 1.3) + 0.06 * Math.sin(t * 9 + k);
    gxGlow(cx, gY - 262, 150, '255,120,40', fl); gxGlow(cx, gY - 230, 80, '255,200,90', fl * 0.5);
  }

function gxBlabExit(X) {
    gxShadow(X, gY + 4, 64, 0.8);
    gxPanel(X - 58, gY - 160, 116, 160, '#4a3a36', { r: 6, lw: 3, vert: true });
    gxPanel(X - 44, gY - 146, 88, 146, '#ffd78a', { r: 4, lw: 2.4, vert: true });
    ctx.fillStyle = 'rgba(120,70,20,.3)'; ctx.fillRect(X - 44, gY - 146, 20, 146); ctx.fillRect(X + 24, gY - 146, 20, 146);
    ctx.fillStyle = '#4a3a36'; ctx.fillRect(X - 3, gY - 146, 6, 146);
    ctx.save(); ctx.beginPath(); ctx.rect(X - 58, gY - 22, 116, 14); ctx.clip(); ctx.fillStyle = '#ffd23f'; ctx.fillRect(X - 58, gY - 22, 116, 14); ctx.fillStyle = '#262a32'; for (var i = -2; i < 9; i++) { ctx.beginPath(); ctx.moveTo(X - 58 + i * 16, gY - 8); ctx.lineTo(X - 50 + i * 16, gY - 22); ctx.lineTo(X - 42 + i * 16, gY - 22); ctx.lineTo(X - 50 + i * 16, gY - 8); ctx.closePath(); ctx.fill(); } ctx.restore();
    gxPanel(X - 80, gY - 198, 160, 30, '#20242f', { r: 8, lw: 2.4 }); gxText('ВЫХОД К ФЕРМЕ ▶', X, gY - 183, 13, '#ffffff', null);
  }

function gxBlabPile(x, s, seed) {
    var r = rng(seed), i, n = 9, pts = [], w = 58 * s;
    gxShadow(x, gY + 4, w * 1.1, 0.8);
    for (i = 0; i < n; i++) {
      var cx = x - w + (i / (n - 1)) * 2 * w, h = (14 + r() * 20) * s * (1 - Math.abs(i - (n - 1) / 2) / n * 1.1);
      var wd = (14 + r() * 14) * s; ctx.beginPath(); ctx.moveTo(cx - wd, gY + 1); ctx.lineTo(cx - wd * 0.5, gY - h); ctx.lineTo(cx + wd * 0.3, gY - h * 1.15); ctx.lineTo(cx + wd, gY + 1); ctx.closePath();
      ctx.fillStyle = gxLG(cx - wd, gY - h, cx + wd, gY, i % 2 ? '#6a5a54' : '#544640', '#2e2420'); ctx.fill(); gxInk(1.8); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.moveTo(cx - wd * 0.5, gY - h); ctx.lineTo(cx + wd * 0.3, gY - h * 1.15); ctx.lineTo(cx + wd * 0.1, gY - h * 0.8); ctx.fill();
    }
    ctx.strokeStyle = '#7a4a3a'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (i = 0; i < 3; i++) { var rx = x - w * 0.5 + i * w * 0.5; ctx.beginPath(); ctx.moveTo(rx, gY - 14 * s); ctx.lineTo(rx + (i - 1) * 14, gY - 44 * s - r() * 14); ctx.stroke(); }
  }

function gxBlabConsole(x) {
    gxShadow(x, gY + 4, 56, 0.8);
    gxPanel(x - 44, gY - 56, 88, 56, '#3a4658', { r: 3, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(a + 10, b + 10, 26, 16); ctx.fillStyle = 'rgba(255,120,40,.5)'; ctx.fillRect(a + 44, b + 12, 8, 6); } });
    ctx.save(); ctx.translate(x + 8, gY - 62); ctx.rotate(-0.28); gxPanel(-24, -42, 48, 42, '#222a38', { r: 4, lw: 2.4 }); ctx.fillStyle = '#0c1018'; ctx.fillRect(-19, -37, 38, 30);
    ctx.strokeStyle = 'rgba(160,220,255,.7)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-8, -37); ctx.lineTo(2, -24); ctx.lineTo(-10, -14); ctx.lineTo(4, -7); ctx.moveTo(2, -24); ctx.lineTo(15, -30); ctx.stroke(); ctx.restore();
    gxTube([[x - 30, gY - 56], [x - 52, gY - 30], [x - 40, gY - 10], [x - 62, gY]], 3, '#20242e');
  }

function gxBlabConsoleAnim(x) {
    if (Math.sin(t * 8 + x) > 0.55) { gxGlow(x - 44, gY - 20, 34, '255,240,170', 0.8); ctx.fillStyle = '#fffbe0'; for (var i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x - 44 + (i - 1.5) * 8 + Math.sin(t * 20 + i) * 3, gY - 18 - (i % 2) * 8, 1.6, 0, 6.3); ctx.fill(); } }
    gxGlow(x + 8, gY - 82, 40, '120,200,255', 0.18 + 0.08 * Math.sin(t * 11 + x));
  }

function gxBlabTank(x) {
    gxShadow(x, gY + 5, 62, 0.8);
    ctx.fillStyle = 'rgba(90,200,120,.35)'; ctx.beginPath(); ctx.ellipse(x + 10, gY + 3, 60, 7, 0, 0, 6.3); ctx.fill();
    gxPanel(x - 44, gY - 22, 88, 22, '#3a5a68', { r: 4, lw: 2.6, vert: true });
    gxPanel(x - 6, gY - 150, 12, 110, '#4a7282', { r: 3, lw: 2.2 });
    ctx.strokeStyle = 'rgba(160,230,220,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 38, gY - 24); ctx.lineTo(x - 38, gY - 120); ctx.lineTo(x - 26, gY - 100); ctx.lineTo(x - 22, gY - 140); ctx.moveTo(x + 38, gY - 24); ctx.lineTo(x + 38, gY - 90); ctx.lineTo(x + 28, gY - 70); ctx.stroke();
    ctx.fillStyle = 'rgba(160,230,220,.16)'; ctx.beginPath(); ctx.moveTo(x - 38, gY - 24); ctx.lineTo(x - 38, gY - 120); ctx.lineTo(x - 26, gY - 100); ctx.lineTo(x - 22, gY - 140); ctx.lineTo(x - 8, gY - 140); ctx.lineTo(x - 8, gY - 24); ctx.fill();
    ctx.fillStyle = '#4a7282'; ctx.fillRect(x - 40, gY - 148, 22, 8); gxInk(1.6); ctx.strokeRect(x - 40, gY - 148, 22, 8);
    var r = rng(77); ctx.fillStyle = 'rgba(210,240,250,.7)'; for (var i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(x - 30 + r() * 60, gY - 2); ctx.lineTo(x - 26 + r() * 60, gY - 8 - r() * 8); ctx.lineTo(x - 20 + r() * 60, gY - 2); ctx.fill(); }
  }

function gxBlabShelf(x) {
    var i;
    gxShadow(x, gY + 4, 84, 0.8);
    ctx.save(); ctx.translate(x - 30, gY); ctx.rotate(-0.34);
    gxPanel(-4, -170, 8, 170, '#5a4640', { lw: 2.2 }); gxPanel(60, -170, 8, 170, '#5a4640', { lw: 2.2 });
    for (i = 0; i < 4; i++) gxPanel(-4, -160 + i * 50, 72, 7, '#7a6258', { r: 2, lw: 1.8 });
    ctx.restore();
    var r = rng(41), cs = ['#6be0a8', '#ffd86a', '#ff8a9a', '#7fc4ff', '#c79bff'];
    for (i = 0; i < 7; i++) { var jx = x - 10 + i * 13 + r() * 6; gxPanel(jx - 6, gY - 14 - (i % 2) * 3, 12, 14 + (i % 2) * 3, cs[i % 5], { r: 3, lw: 1.4, vert: true }); }
    ctx.fillStyle = 'rgba(255,255,255,.7)'; for (i = 0; i < 6; i++) { ctx.save(); ctx.translate(x + 30 + i * 9, gY - 3 - (i % 3) * 3); ctx.rotate(0.6 + i); ctx.fillRect(-6, -1.5, 12, 3); ctx.restore(); }
    gxPanel(x + 52, gY - 22, 30, 22, '#6a5a54', { r: 3, lw: 2 });
  }

function gxBlabBeam(x) {
    gxShadow(x, gY + 4, 84, 0.8);
    gxBlabPile(x + 36, 0.8, 55);
    ctx.save(); ctx.translate(x - 60, gY - 2); ctx.rotate(-0.78);
    gxPanel(0, -12, 152, 24, '#59616f', { r: 2, lw: 2.6, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(a, b + 4, w, 3); ctx.fillRect(a, b + h - 7, w, 3); ctx.fillStyle = '#ff9a3a'; ctx.fillRect(a + 30, b + 6, 20, 5); } });
    ctx.restore();
    gxPanel(x - 76, gY - 12, 30, 12, '#3a3030', { r: 2, lw: 1.8 });
  }

function gxBlabDebris(x) {
    gxShadow(x, gY + 3, 48, 0.7);
    ctx.save(); ctx.translate(x - 8, gY - 4); ctx.rotate(-1.4); gxPanel(-14, -20, 28, 30, '#3a4a60', { r: 6, lw: 2.2 }); gxPanel(-12, 10, 24, 6, '#26303f', { r: 2, lw: 1.8 }); ctx.restore();
    gxTube([[x + 8, gY - 20], [x + 14, gY - 3]], 3, '#3a3a44'); gxTube([[x + 28, gY - 14], [x + 22, gY - 3]], 3, '#3a3a44');
    ctx.fillStyle = '#d9d2c0'; for (var i = 0; i < 4; i++) { ctx.save(); ctx.translate(x - 38 + i * 22, gY - 1); ctx.rotate(-0.25 + i * 0.2); ctx.fillRect(-9, -2, 18, 3); ctx.restore(); }
  }

function gxBlabCart(x) {
    gxShadow(x, gY + 3, 52, 0.7);
    ctx.save(); ctx.translate(x, gY - 2); ctx.rotate(0.12);
    gxPanel(-40, -30, 80, 8, '#8fa0b6', { r: 2, lw: 2.2 }); gxPanel(-40, -6, 80, 6, '#8fa0b6', { r: 2, lw: 2.2 }); gxPanel(-38, -30, 5, 30, '#56667a', { lw: 1.4 }); gxPanel(34, -30, 5, 30, '#56667a', { lw: 1.4 }); ctx.restore();
    ctx.fillStyle = '#2a2f3a'; ctx.beginPath(); ctx.arc(x - 48, gY - 8, 7, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 12, gY - 4, 5, 0, 6.3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(210,240,255,.7)'; ctx.beginPath(); ctx.moveTo(x - 20, gY - 2); ctx.lineTo(x - 6, gY - 2); ctx.lineTo(x - 10, gY - 10); ctx.closePath(); ctx.fill();
  }

function gxBlabFireBase(x) {
    gxShadow(x, gY + 4, 62, 0.9);
    ctx.fillStyle = 'rgba(8,4,2,.55)'; ctx.beginPath(); ctx.ellipse(x, gY + 4, 56, 9, 0, 0, 6.3); ctx.fill();
    gxPanel(x - 40, gY - 30, 80, 30, '#33241f', { r: 4, lw: 2.6, vert: true }); gxPanel(x - 30, gY - 40, 26, 12, '#4a3a34', { r: 3, lw: 2 }); gxPanel(x + 6, gY - 36, 30, 10, '#2a1e1a', { r: 3, lw: 2 });
    ctx.fillStyle = '#ff7a28'; for (var i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(x - 30 + i * 15, gY - 4 - (i % 2) * 8, 3, 0, 6.3); ctx.fill(); }
  }

function gxBlabFireAnim(x, i) {
    var h = 98 + 20 * Math.sin(t * 6 + i), sw = Math.sin(t * 5 + i) * 6, p = 0.5 + 0.5 * Math.sin(t * 9 + i * 2), q;
    gxGlow(x, gY - 56, 150, '255,130,40', 0.46 + 0.08 * p);
    ctx.fillStyle = 'rgba(255,90,20,.93)'; flameP(x, h, 78, sw); ctx.fillStyle = 'rgba(255,184,50,.95)'; flameP(x, h * 0.68, 50, sw * 0.7); ctx.fillStyle = 'rgba(255,246,170,.96)'; flameP(x, h * 0.36, 26, sw * 0.4);
    ctx.fillStyle = 'rgba(255,100,20,.9)'; flameP(x - 28, h * 0.5, 28, sw * 0.8 + 4); flameP(x + 26, h * 0.56, 30, -sw * 0.8 - 3);
    ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,90,.9)';
    for (q = 0; q < 6; q++) { var u = (t * 0.7 + q * 0.17 + i * 0.3) % 1; ctx.beginPath(); ctx.arc(x + Math.sin(u * 8 + q * 2) * 26, gY - 20 - u * 150, 2.2 * (1 - u) + 0.5, 0, 6.3); ctx.fill(); }
    ctx.globalCompositeOperation = 'source-over';
  }
