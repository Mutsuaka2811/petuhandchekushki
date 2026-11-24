/* defs · 107 declarations · function gxTent(x, c, s) { var w = 88 * s, h = 116 * s, i; gxShadow(x, gY + 5, w * 1.1, 0.8); ctx.strokeStyle = '#6a5a44 */

function gxTent(x, c, s) {
    var w = 88 * s, h = 116 * s, i;
    gxShadow(x, gY + 5, w * 1.1, 0.8);
    ctx.strokeStyle = '#6a5a44'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gY - h); ctx.lineTo(x - w - 12, gY + 1); ctx.moveTo(x, gY - h); ctx.lineTo(x + w + 12, gY + 1); ctx.stroke();
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(x - w - 15, gY - 4, 6, 6); ctx.fillRect(x + w + 9, gY - 4, 6, 6);
    ctx.beginPath(); ctx.moveTo(x - w, gY); ctx.lineTo(x, gY - h); ctx.lineTo(x + w, gY); ctx.closePath();
    ctx.fillStyle = gxLG(x - w, 0, x + w, 0, shadeC(c, 0.18), c, shadeC(c, -0.3)); ctx.fill(); gxInk(3); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.6;
    for (i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x, gY - h); ctx.lineTo(x + i * w / 3.2, gY); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(x, gY - h); ctx.lineTo(x - w * 0.4, gY); ctx.lineTo(x - w * 0.18, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(x - w, gY - 10, w * 2, 10);
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 26 * s, gY); ctx.lineTo(x, gY - 60 * s); ctx.lineTo(x + 26 * s, gY); ctx.closePath(); ctx.fillStyle = '#1c1612'; ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.fillStyle = shadeC(c, 0.1); ctx.beginPath(); ctx.moveTo(x - 26 * s, gY); ctx.lineTo(x - 2, gY - 58 * s); ctx.lineTo(x - 40 * s, gY); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 26 * s, gY); ctx.lineTo(x + 2, gY - 58 * s); ctx.lineTo(x + 40 * s, gY); ctx.fill();
    ctx.fillStyle = '#f4f1e6'; ctx.beginPath(); ctx.arc(x + w * 0.5, gY - h * 0.34, 7, 0, 6.3); ctx.fill(); ctx.fillRect(x + w * 0.5 - 3.5, gY - h * 0.34 + 4, 7, 5); ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.arc(x + w * 0.5 - 2.6, gY - h * 0.34 - 1, 1.8, 0, 6.3); ctx.arc(x + w * 0.5 + 2.6, gY - h * 0.34 - 1, 1.8, 0, 6.3); ctx.fill();
    gxTube([[x, gY - h], [x, gY - h - 26]], 3, '#4a3a2a'); ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.moveTo(x, gY - h - 26); ctx.lineTo(x + 24, gY - h - 20); ctx.lineTo(x, gY - h - 12); ctx.closePath(); ctx.fill(); gxInk(1.4); ctx.stroke();
  }

function gxCampPortal(x) {
    var i;
    gxShadow(x, gY + 4, 70, 0.8);
    gxPanel(x - 66, gY - 20, 132, 20, '#5a4a38', { r: 5, lw: 2.8, vert: true });
    [-54, 54].forEach(function (dx) { gxPanel(x + dx - 11, gY - 226, 22, 208, '#7d6a4a', { r: 5, lw: 2.8, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.2)'; for (var q = 12; q < h; q += 26) ctx.fillRect(a, b + q, w, 3); } }); });
    ctx.beginPath(); ctx.arc(x, gY - 226, 54, Math.PI, 0); ctx.lineWidth = 22; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 17; ctx.strokeStyle = gxLG(x - 60, gY - 280, x + 60, gY - 226, '#a08a60', '#7d6a4a', '#5a4a30'); ctx.stroke();
    ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(x, gY - 280, 7, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    gxPanel(x - 62, gY - 326, 124, 30, '#ffffff', { r: 9, lw: 2.6, vert: true }); gxText('К МАШИНЕ', x, gY - 311, 13, '#26456f', null);
  }

function gxCampPortalAnim(x) {
    var i, pl = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.save(); ctx.beginPath(); ctx.rect(x - 43, gY - 230, 86, 210); ctx.arc(x, gY - 226, 43, Math.PI, 0); ctx.clip();
    var g = ctx.createLinearGradient(0, gY - 270, 0, gY - 20); g.addColorStop(0, 'rgba(210,246,255,.8)'); g.addColorStop(1, 'rgba(100,170,255,.45)'); ctx.fillStyle = g; ctx.fillRect(x - 46, gY - 272, 92, 252);
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.55)'; for (i = 0; i < 5; i++) { var yy = gY - 40 - ((t * 60 + i * 44) % 220); ctx.beginPath(); ctx.moveTo(x - 40, yy); ctx.quadraticCurveTo(x, yy - 14, x + 40, yy); ctx.stroke(); }
    ctx.restore(); gxGlow(x, gY - 130, 120 + 8 * pl, '150,220,255', 0.34);
  }

function gxCampFlagBase(x) {
    gxShadow(x, gY + 3, 26, 0.7); gxPanel(x - 14, gY - 10, 28, 10, '#6a5a3a', { r: 3, lw: 2 }); gxPanel(x - 3.5, gY - 190, 7, 182, '#5a4a32', { r: 2, lw: 2.2 });
    ctx.fillStyle = gxLG(x - 6, gY - 200, x + 6, gY - 190, '#fff0a0', '#c9a24a'); ctx.beginPath(); ctx.arc(x, gY - 194, 6, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
  }

function gxCampFlagAnim(x, placed, h) {
    var i, wv = function (k) { return Math.sin(t * 4 + k * 0.7 + x * 0.01) * 4.5; };
    if (!placed) {
      ctx.save(); ctx.setLineDash([7, 6]); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2.4; gxRR(x + 6, gY - h + 10, 76, 46, 4); ctx.stroke(); ctx.restore();
      gxText('сюда флаг', x + 44, gY - h + 33, 11, 'rgba(255,255,255,.8)', 'rgba(20,20,30,.5)'); return;
    }
    ctx.beginPath(); ctx.moveTo(x + 4, gY - h + 6 + wv(0)); for (i = 1; i <= 10; i++) ctx.lineTo(x + 4 + i * 8.2, gY - h + 6 + wv(i)); for (i = 10; i >= 0; i--) ctx.lineTo(x + 4 + i * 8.2, gY - h + 56 + wv(i)); ctx.closePath();
    ctx.fillStyle = gxLG(x, 0, x + 90, 0, '#2a2a34', '#121216', '#0a0a0e'); ctx.fill(); gxInk(2); ctx.stroke();
    var cx = x + 44, cy = gY - h + 31 + wv(5);
    ctx.fillStyle = '#f4f1e6'; ctx.beginPath(); ctx.arc(cx, cy - 4, 9.5, 0, 6.3); ctx.fill(); ctx.fillRect(cx - 5, cy + 4, 10, 6); ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.arc(cx - 3.6, cy - 5, 2.5, 0, 6.3); ctx.arc(cx + 3.6, cy - 5, 2.5, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#f4f1e6'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 16, cy + 12); ctx.lineTo(cx + 16, cy - 14); ctx.moveTo(cx + 16, cy + 12); ctx.lineTo(cx - 16, cy - 14); ctx.stroke();
    gxGlow(cx, cy, 70, '255,240,200', 0.12);
  }

function gxServerDesk(S) {
    var i;
    gxShadow(S, gY + 4, 186, 0.8);
    [-120, 120].forEach(function (dx) { gxPanel(S + dx - 7, gY - 70, 14, 70, '#3a4558', { lw: 2.2 }); });
    gxPanel(S - 176, gY - 66, 352, 22, '#2a3342', { r: 5, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(a + 8, b + 3, w - 16, 3); } });
    gxPanel(S - 100, gY - 74, 150, 9, '#3a4558', { r: 3, lw: 2 }); ctx.fillStyle = '#9fb3d1'; for (i = 0; i < 12; i++) ctx.fillRect(S - 94 + i * 12, gY - 72, 8, 4);
    gxPanel(S - 172, gY - 268, 344, 206, '#3a4558', { r: 10, lw: 3.2 }); gxPanel(S - 160, gY - 256, 320, 182, '#0f2240', { r: 6, lw: 2.6 });
    ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(S - 160, gY - 74); ctx.lineTo(S - 60, gY - 256); ctx.lineTo(S - 14, gY - 256); ctx.lineTo(S - 114, gY - 74); ctx.fill();
    ctx.fillStyle = '#5ee08a'; ctx.beginPath(); ctx.arc(S + 156, gY - 64, 3.5, 0, 6.3); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(S + 144, gY - 64, 3.5, 0, 6.3); ctx.fill();
  }

function gxServerAnim(S, fl) {
    var i, n = 0, nm;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillStyle = '#ffd23f'; ctx.fillText('СЕРВЕРЫ ЧИКЕН ГАНА', S - 148, gY - 236);
    for (i = 0; i < 5; i++) if ((fl >> (5 + i)) & 1) {
      var on = 30 + Math.floor(20 * Math.sin(t * 0.5 + i) + 18 * rbFlags() + t * 0.3 % 40), sz = 11;
      nm = SRV_N[i] + '  ' + on + ' онлайн'; ctx.font = '700 ' + sz + 'px "Russo One", "Arial Black", Impact, sans-serif';
      while (sz > 8 && ctx.measureText(nm).width > 292) { sz--; ctx.font = '700 ' + sz + 'px "Russo One", "Arial Black", Impact, sans-serif'; }
      ctx.fillStyle = '#7dff9c'; ctx.fillText(nm, S - 148, gY - 210 + n * 22); n++;
    }
    if (!n) { ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillStyle = '#9fb3d1'; ctx.fillText('Пока ни одного сервера «бунт чг»', S - 148, gY - 208); }
    gxGlow(S, gY - 166, 200, '110,160,255', 0.16 + 0.05 * Math.sin(t * 2));
  }

function gxVlogBase(yx, i) {
    var side = i % 2 ? -34 : 34, cx = yx - 8 + side + 13;
    gxShadow(yx, gY + 3, 50, 0.7);
    ctx.fillStyle = 'rgba(70,40,110,.55)'; ctx.beginPath(); ctx.ellipse(yx, gY + 4, 54, 8, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
    gxTube([[cx, gY - 66], [cx - 14, gY - 2]], 3, '#3a3f4a'); gxTube([[cx, gY - 66], [cx + 14, gY - 2]], 3, '#3a3f4a'); gxTube([[cx, gY - 66], [cx, gY - 2]], 3, '#3a3f4a');
    var rx = yx + (i % 2 ? 54 : -54); gxTube([[rx, gY - 2], [rx, gY - 120]], 4, '#4a4f5c'); ctx.beginPath(); ctx.arc(rx, gY - 132, 15, 0, 6.3); ctx.lineWidth = 8; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff6dc'; ctx.stroke();
  }

function gxVlogAnim(yx, i, okY) {
    var side = i % 2 ? -34 : 34, cx = yx - 8 + side + 13, rx = yx + (i % 2 ? 54 : -54);
    ctx.save(); wSpr(img.rooster, yx, 120, i % 2 ? -1 : 1); ctx.restore();
    gxPanel(cx - 13, gY - 86, 26, 20, '#12161c', { r: 4, lw: 1.8 }); ctx.fillStyle = '#242a34'; ctx.beginPath(); ctx.arc(cx + (i % 2 ? -4 : 4), gY - 76, 5.5, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke();
    ctx.fillStyle = okY && Math.sin(t * 6) > -0.3 ? '#ff3b3b' : '#5a5a60'; ctx.beginPath(); ctx.arc(cx + (i % 2 ? 9 : -9), gY - 82, 3, 0, 6.3); ctx.fill();
    gxGlow(rx, gY - 132, 70, '255,244,214', okY ? 0.5 : 0.18);
    gxPlate(yx, gY - 148, YT_N[i] + (okY ? ' · в эфире' : ''), okY ? '#7dff9c' : '#ffd23f', 'rgba(22,14,40,.7)');
  }

function gxLeaderBase(Lx) {
    gxShadow(Lx, gY + 4, 84, 0.8);
    gxCrate(Lx - 52, 1.1, '#6a5a3e'); gxCrate(Lx + 52, 1.0, '#7a6a48'); gxCrate(Lx + 52, 0.9, '#5a4a32');
    gxTube([[Lx + 76, gY - 2], [Lx + 76, gY - 190]], 4, '#4a3a2a');
    ctx.beginPath(); ctx.moveTo(Lx + 78, gY - 188); ctx.lineTo(Lx + 130, gY - 180); ctx.lineTo(Lx + 130, gY - 130); ctx.lineTo(Lx + 78, gY - 138); ctx.closePath(); ctx.fillStyle = '#121216'; ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = '#f4f1e6'; ctx.beginPath(); ctx.arc(Lx + 104, gY - 162, 8, 0, 6.3); ctx.fill(); ctx.fillRect(Lx + 99, gY - 156, 10, 5); ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.arc(Lx + 101, gY - 163, 2, 0, 6.3); ctx.arc(Lx + 107, gY - 163, 2, 0, 6.3); ctx.fill();
  }

function gxCampfire(x) {
    gxShadow(x, gY + 3, 40, 0.8);
    var i; ctx.fillStyle = '#6a6e78'; for (i = 0; i < 7; i++) { var a = i / 7 * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 26, gY - 2 + Math.sin(a) * 4, 7, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }
    ctx.save(); ctx.translate(x, gY - 6); ctx.rotate(0.5); gxPanel(-22, -5, 44, 10, '#5a3a22', { r: 4, lw: 1.8 }); ctx.restore(); ctx.save(); ctx.translate(x, gY - 6); ctx.rotate(-0.5); gxPanel(-22, -5, 44, 10, '#6a4628', { r: 4, lw: 1.8 }); ctx.restore();
  }

function gxCampfireAnim(x) {
    var h = 50 + 10 * Math.sin(t * 7 + x), sw = Math.sin(t * 5 + x) * 4;
    gxGlow(x, gY - 30, 110, '255,150,60', 0.4);
    ctx.fillStyle = 'rgba(255,100,24,.94)'; flameP(x, h, 36, sw); ctx.fillStyle = 'rgba(255,190,56,.96)'; flameP(x, h * 0.66, 24, sw * 0.7); ctx.fillStyle = 'rgba(255,246,176,.96)'; flameP(x, h * 0.34, 12, sw * 0.4);
  }

function gxPalisade(xa, xb) {
    var i, x;
    ctx.fillStyle = gxLG(0, gY - 170, 0, gY, '#6a5a44', '#4a3c2a'); ctx.fillRect(xa, gY - 152, xb - xa, 152);
    for (x = Math.floor(xa / 22) * 22; x < xb + 22; x += 22) {
      var hh = 150 + ((x * 7) % 5) * 6; ctx.beginPath(); ctx.moveTo(x, gY); ctx.lineTo(x, gY - hh + 12); ctx.lineTo(x + 10, gY - hh); ctx.lineTo(x + 20, gY - hh + 12); ctx.lineTo(x + 20, gY); ctx.closePath();
      ctx.fillStyle = gxLG(x, 0, x + 20, 0, '#8a7656', '#6a5842', '#4a3a28'); ctx.fill(); ctx.strokeStyle = 'rgba(24,14,6,.6)'; ctx.lineWidth = 1.6; ctx.stroke();
    }
    ctx.fillStyle = '#3a2c1c'; ctx.fillRect(xa, gY - 96, xb - xa, 8); ctx.fillRect(xa, gY - 42, xb - xa, 8); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(xa, gY - 152, xb - xa, 152);
  }

function gxBunting(xa, xb) {
    var step = 300, i, k, cols = ['#14141a', '#f4f1e6', '#c9922e', '#b3262f'];
    for (i = Math.floor(xa / step) * step - step; i < xb + step; i += step) {
      ctx.strokeStyle = '#3a2c1c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(i, gY - 322); ctx.quadraticCurveTo(i + step / 2, gY - 276, i + step, gY - 322); ctx.stroke();
      for (k = 1; k < 12; k++) { var u = k / 12, px = i + u * step, py = (1 - u) * (1 - u) * (gY - 322) + 2 * u * (1 - u) * (gY - 276) + u * u * (gY - 322); ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.lineTo(px, py + 20); ctx.closePath(); ctx.fillStyle = cols[(k + ((i / step) | 0)) & 3]; ctx.fill(); gxInk(1.2); ctx.stroke(); }
    }
  }

function gxUniSky(k, x0, x1) {
    var U = UV[k], i, cx = camX, bomb = p5.on && p5.uni && p5.bomb && p5.bomb.planted;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = gxLG(0, 0, 0, H, U.sky[0], U.sky[1]); ctx.fillRect(0, 0, W, H);
    if (k !== 9 && k !== 1) { for (i = 0; i < 60; i++) { var sx = (i * 211 + cx * 0.05) % W, sy = (i * 97) % (H * 0.5); ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + 0.2 * Math.sin(t * 1.3 + i)).toFixed(2) + ')'; ctx.fillRect(sx, sy, 2, 2); } }
    if (k === 0) { gxGlow(W * 0.7, H * 0.2, 260, '120,255,160', 0.35); gxHillsPar(0.2, 130, 34, '#1d5a2e', '#0d2e18', 1.7, null); gxHillsPar(0.4, 70, 22, '#2a7a40', '#123a20', 3.9, 'rgba(120,255,160,.08)'); }
    else if (k === 1) { parallaxSkyline(0.25, 20, 150, 220, '#8d97a2', 12); gxHillsPar(0.45, 50, 14, '#9ea4ac', '#7e848c', 2.4, null); }
    else if (k === 2 || k === 5) { gxGlow(W * 0.72, H * 0.3, 320, '255,120,70', 0.45); ctx.fillStyle = '#ffb06a'; ctx.beginPath(); ctx.arc(W * 0.72, H * 0.3, 48, 0, 6.3); ctx.fill(); parallaxSkyline(0.25, 20, 150, 220, 'rgba(20,6,10,.8)', 13 + k); gxHillsPar(0.45, 40, 16, '#3a1a1c', '#220e10', 3.3, null); }
    else if (k === 3) { gxGlow(W * 0.5, H * 0.25, 380, '200,100,255', 0.3); parallaxSkyline(0.25, 20, 150, 220, 'rgba(30,10,60,.75)', 14); gxHillsPar(0.45, 40, 16, '#3a2258', '#201038', 5.1, null); }
    else if (k === 4) { ctx.globalCompositeOperation = 'lighter'; for (i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(' + (i % 2 ? '90,200,255' : '110,150,255') + ',.07)'; ctx.beginPath(); ctx.moveTo(0, H * 0.2 + i * 26); for (var q = 0; q <= W; q += 60) ctx.lineTo(q, H * 0.2 + i * 26 + Math.sin(q * 0.008 + t * 0.4 + i) * 30); ctx.lineTo(W, H * 0.5); ctx.lineTo(0, H * 0.5); ctx.fill(); } ctx.globalCompositeOperation = 'source-over'; gxHillsPar(0.25, 120, 30, '#14224a', '#0a1430', 2.8, null); gxHillsPar(0.45, 60, 18, '#1a2e5e', '#0e1a3c', 4.6, null); }
    else if (k === 6) { ctx.fillStyle = '#0a0206'; ctx.beginPath(); ctx.arc(W * 0.68, H * 0.28, 60, 0, 6.3); ctx.fill(); gxGlow(W * 0.68, H * 0.28, 260, '255,60,70', 0.55); ctx.strokeStyle = 'rgba(255,120,120,.5)'; ctx.lineWidth = 2; for (i = 0; i < 6; i++) { var bx = (i * 331 + 80) % W; ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx + 30, H * 0.12); ctx.lineTo(bx - 14, H * 0.22); ctx.lineTo(bx + 24, H * 0.34); ctx.stroke(); } gxHillsPar(0.3, 90, 26, '#2a0a12', '#14040a', 7.3, null); }
    else if (k === 7) { gxGlow(W * 0.5, H * 0.3, 360, '255,100,200', 0.28); parallaxSkyline(0.25, 20, 150, 220, 'rgba(24,4,14,.8)', 20); gxHillsPar(0.45, 40, 16, '#3a0e22', '#1e0612', 8.6, null); }
    else if (k === 8) { gxHillsPar(0.25, 110, 30, '#0a3a40', '#051c22', 1.3, null); gxHillsPar(0.45, 50, 20, '#0e5058', '#072a30', 3.7, null); ctx.globalCompositeOperation = 'lighter'; for (i = 0; i < 5; i++) { var rx = (i * 297 + cx * 0.1) % W; ctx.fillStyle = 'rgba(120,255,220,.04)'; ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx + 70, 0); ctx.lineTo(rx + 220, H); ctx.lineTo(rx + 100, H); ctx.fill(); } ctx.globalCompositeOperation = 'source-over'; }
    else if (k === 9) { gxGlow(W * 0.5, H * 0.18, 460, '255,240,190', 0.6); for (i = 0; i < 6; i++) drawCloud(((i * 311 + t * (4 + i)) % (W + 440)) - 220, 40 + (i % 3) * 56, 0.9 + (i % 2) * 0.4); gxHillsPar(0.3, 90, 22, '#f8e4b0', '#e8c880', 2.2, null); }
    setCam(1);
  }

function uPSpire(x, h, c1, c2, glow) {
    gxShadow(x, gY + 4, 34, 0.8);
    ctx.beginPath(); ctx.moveTo(x - 22, gY); ctx.lineTo(x - 14, gY - h * 0.7); ctx.lineTo(x, gY - h); ctx.lineTo(x + 14, gY - h * 0.7); ctx.lineTo(x + 22, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 22, 0, x + 22, 0, c1, c2, shadeC(c2, -0.4)); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(x - 10, gY); ctx.lineTo(x - 8, gY - h * 0.7); ctx.lineTo(x, gY - h); ctx.lineTo(x - 2, gY - h * 0.6); ctx.lineTo(x - 2, gY); ctx.fill();
    ctx.fillStyle = glow; ctx.fillRect(x - 11, gY - h * 0.55, 22, 4); ctx.fillRect(x - 9, gY - h * 0.35, 18, 3); gxGlow(x, gY - h * 0.5, 60, '255,120,80', 0.18);
  }

function uPCrystal(x, h, col) {
    gxShadow(x, gY + 4, 36, 0.7);
    [[-16, 0.7, -0.18], [0, 1, 0], [16, 0.55, 0.2]].forEach(function (c) {
      var cx = x + c[0], ch = h * c[1]; ctx.beginPath(); ctx.moveTo(cx - 10, gY); ctx.lineTo(cx - 8 + c[2] * 20, gY - ch * 0.8); ctx.lineTo(cx + c[2] * 24, gY - ch); ctx.lineTo(cx + 8 + c[2] * 20, gY - ch * 0.8); ctx.lineTo(cx + 10, gY); ctx.closePath();
      ctx.fillStyle = gxLG(cx - 10, 0, cx + 10, 0, shadeC(col, 0.4), col, shadeC(col, -0.3)); ctx.fill(); gxInk(2.2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(cx - 5, gY - 6); ctx.lineTo(cx - 4 + c[2] * 20, gY - ch * 0.78); ctx.lineTo(cx + c[2] * 20, gY - ch * 0.9); ctx.lineTo(cx - 1, gY - 6); ctx.fill();
    });
  }

function uPMush(x, s, cap, stem) {
    gxShadow(x, gY + 4, 36 * s, 0.7);
    gxPanel(x - 9 * s, gY - 62 * s, 18 * s, 62 * s, stem, { r: 6 * s, lw: 2.2 });
    ctx.beginPath(); ctx.ellipse(x, gY - 62 * s, 44 * s, 30 * s, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = gxLG(0, gY - 92 * s, 0, gY - 62 * s, shadeC(cap, 0.25), cap, shadeC(cap, -0.3)); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; [[-20, -74, 5], [4, -84, 6], [22, -70, 4]].forEach(function (d) { ctx.beginPath(); ctx.arc(x + d[0] * s, gY + d[1] * s, d[2] * s, 0, 6.3); ctx.fill(); });
  }

function uPColumn(x, h, col, broken) {
    gxShadow(x, gY + 4, 38, 0.7);
    gxPanel(x - 24, gY - 14, 48, 14, shadeC(col, -0.08), { r: 3, lw: 2.2 });
    if (broken) { ctx.beginPath(); ctx.moveTo(x - 17, gY - 14); ctx.lineTo(x - 17, gY - h * 0.6); ctx.lineTo(x - 6, gY - h * 0.7); ctx.lineTo(x + 4, gY - h * 0.55); ctx.lineTo(x + 17, gY - h * 0.66); ctx.lineTo(x + 17, gY - 14); ctx.closePath(); ctx.fillStyle = gxLG(x - 17, 0, x + 17, 0, shadeC(col, 0.2), col, shadeC(col, -0.25)); ctx.fill(); gxInk(2.4); ctx.stroke(); }
    else { gxPanel(x - 17, gY - h, 34, h - 12, col, { lw: 2.4, tex: function (a, b, w, hh) { ctx.fillStyle = 'rgba(0,0,0,.12)'; for (var q = 6; q < w; q += 9) ctx.fillRect(a + q, b, 2, hh); } }); gxPanel(x - 25, gY - h - 12, 50, 14, shadeC(col, 0.08), { r: 3, lw: 2.2 }); }
  }

function uPRock(x, s, c) {
    gxShadow(x, gY + 4, 40 * s, 0.7);
    ctx.beginPath(); ctx.moveTo(x - 36 * s, gY); ctx.lineTo(x - 28 * s, gY - 30 * s); ctx.lineTo(x - 8 * s, gY - 46 * s); ctx.lineTo(x + 14 * s, gY - 38 * s); ctx.lineTo(x + 34 * s, gY - 16 * s); ctx.lineTo(x + 38 * s, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 36 * s, 0, x + 38 * s, 0, shadeC(c, 0.22), c, shadeC(c, -0.34)); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(x - 28 * s, gY - 30 * s); ctx.lineTo(x - 8 * s, gY - 46 * s); ctx.lineTo(x + 2 * s, gY - 30 * s); ctx.fill();
  }

function uPRack(x) {
    var i; gxShadow(x, gY + 4, 44, 0.7);
    gxPanel(x - 40, gY - 6, 80, 6, '#7a6a58', { r: 2, lw: 2 }); [-36, 36].forEach(function (dx) { gxPanel(x + dx - 3, gY - 80, 6, 76, '#7a6a58', { lw: 1.8 }); });
    for (i = 0; i < 2; i++) { gxPanel(x - 38, gY - 36 - i * 36, 76, 5, '#8a7a68', { r: 2, lw: 1.8 }); }
    ctx.strokeStyle = 'rgba(40,46,54,.8)'; ctx.lineWidth = 2.4; for (i = 0; i < 5; i++) { for (var j = 0; j < 2; j++) { var bx = x - 30 + i * 15, by = gY - 40 - j * 36; ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.lineTo(bx - 4, by - 14); ctx.lineTo(bx - 2, by - 20); ctx.lineTo(bx - 2, by - 28); ctx.lineTo(bx + 2, by - 28); ctx.lineTo(bx + 2, by - 20); ctx.lineTo(bx + 4, by - 14); ctx.lineTo(bx + 4, by); ctx.closePath(); ctx.stroke(); } }
  }

function uPSign(x, txt, col, bg) {
    gxShadow(x, gY + 4, 34, 0.7);
    gxPanel(x - 7, gY - 150, 14, 150, '#241540', { lw: 2.2 }); gxPanel(x - 48, gY - 230, 96, 60, bg, { r: 10, lw: 2.8, vert: true });
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 12; gxBig(txt, x, gY - 200, 30, col, null); ctx.restore();
  }

function uPCoral(x, h, col) {
    gxShadow(x, gY + 4, 34, 0.7);
    [[0, 1, 0], [-14, 0.62, -0.5], [14, 0.7, 0.5]].forEach(function (c) { var ch = h * c[1]; gxTube([[x + c[0], gY], [x + c[0] + c[2] * 12, gY - ch * 0.5], [x + c[0] + c[2] * 28, gY - ch]], 9, col); gxTube([[x + c[0] + c[2] * 12, gY - ch * 0.5], [x + c[0] - c[2] * 12, gY - ch * 0.8]], 6, col); });
    ctx.fillStyle = 'rgba(255,255,255,.7)'; for (var i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x - 10 + i * 8, gY - h * (0.3 + 0.18 * i), 2.4, 0, 6.3); ctx.fill(); }
  }

function uPShard(x, h, col) {
    gxShadow(x, gY + 4, 34, 0.7);
    ctx.beginPath(); ctx.moveTo(x - 14, gY); ctx.lineTo(x - 22, gY - h * 0.6); ctx.lineTo(x + 6, gY - h); ctx.lineTo(x + 24, gY - h * 0.4); ctx.lineTo(x + 16, gY); ctx.closePath(); ctx.fillStyle = gxLG(x - 20, gY - h, x + 24, gY, 'rgba(255,200,200,.55)', 'rgba(255,90,90,.35)', 'rgba(120,20,30,.5)'); ctx.fill(); gxInk(2.4); ctx.strokeStyle = col; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x - 12, gY - h * 0.5); ctx.lineTo(x + 2, gY - h * 0.9); ctx.lineTo(x + 6, gY - h * 0.55); ctx.fill();
  }

function uPCandle(x) {
    gxShadow(x, gY + 4, 26, 0.7); gxPanel(x - 14, gY - 10, 28, 10, '#d4b050', { r: 3, lw: 2 }); gxPanel(x - 4, gY - 90, 8, 80, '#e8c25a', { lw: 2 });
    [-22, 0, 22].forEach(function (dx) { gxTube([[x, gY - 80], [x + dx, gY - 92]], 4, '#e8c25a'); gxPanel(x + dx - 5, gY - 104, 10, 14, '#f4efe6', { r: 2, lw: 1.6 }); });
  }

function gxUniProps(k, xa, xb) {
    var S = GXU22SLOTS, f = function (i) { return S[i][0] > xa - 80 && S[i][0] < xb + 80; }, i, x;
    for (i = 0; i < S.length; i++) {
      if (i === 2 || i === 7 || !f(i)) continue; x = S[i][0];
      if (k === 0) { if (i % 2) uPMush(x, 0.8 + (i % 3) * 0.2, '#2dff7a', '#bff0c8'); else uPCrystal(x, 70 + (i % 3) * 14, '#3aff8a'); }
      else if (k === 1) { if (i % 3 === 0) uPRack(x); else if (i % 3 === 1) uPRock(x, 0.9, '#8a8e94'); else gxBarrel(x, 1.1, '#8a8e94'); }
      else if (k === 2) { if (i % 2) uPSpire(x, 150 + (i % 3) * 30, '#4a2a2a', '#1e0e10', '#ff5a3a'); else uPRock(x, 1, '#3a1a1c'); }
      else if (k === 3) { if (i % 2) uPSign(x, 'MOG', '#ff9af2', '#2a1646'); else uPSpire(x, 120, '#5a3a7a', '#241040', '#ff9af2'); }
      else if (k === 4) { if (i % 2) uPCrystal(x, 90 + (i % 3) * 20, '#7fb0ff'); else uPRock(x, 0.9, '#2a3a6a'); }
      else if (k === 5) { if (i % 2) uPSpire(x, 130, '#4a3a6a', '#1e1030', '#c79bff'); else uPCrystal(x, 80, '#b07cff'); }
      else if (k === 6) { if (i % 2) uPShard(x, 120 + (i % 3) * 20, '#ff5a5a'); else uPRock(x, 0.9, '#2a0e14'); }
      else if (k === 7) { if (i % 2) uPSign(x, 'MOG', '#ff96ea', '#3a1224'); else uPColumn(x, 150, '#3a1a28', i % 4 === 0); }
      else if (k === 8) { if (i % 2) uPCoral(x, 110, '#2affc8'); else uPRock(x, 0.9, '#0e4a4a'); }
      else { if (i % 2) uPColumn(x, 170, '#f4ecd2', i % 4 === 1); else uPCandle(x); }
    }
  }

function gxUniBack(k, xa, xb) {
    var G = GXUP[k], w = xb - xa, i, x, top = gY - 3, bot = gY + 26, deep = gY + 26 + gxDown();
    ctx.fillStyle = gxLG(0, top, 0, bot, shadeC(G.ground[0], 0.1), G.ground[0]); ctx.fillRect(xa, top, w, bot - top);
    ctx.fillStyle = gxLG(0, bot, 0, deep, G.ground[0], G.ground[1]); ctx.fillRect(xa, bot, w, deep - bot);
    ctx.fillStyle = G.lip; ctx.globalAlpha = 0.5; ctx.fillRect(xa, top, w, 3); ctx.globalAlpha = 1; ctx.strokeStyle = GXI; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xa, top); ctx.lineTo(xb, top); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.6;
    if (k === 9) { for (x = Math.floor(xa / 120) * 120; x < xb; x += 120) { ctx.beginPath(); ctx.moveTo(x, top + 4); ctx.lineTo(x - 18, bot + 40); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(xa, bot, w, 3); }
    else if (k === 1) { for (x = Math.floor(xa / 160) * 160; x < xb; x += 160) { ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bot + 40); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(xa, bot - 4); ctx.lineTo(xb, bot - 4); ctx.stroke(); }
    else if (k === 2 || k === 6) { ctx.strokeStyle = 'rgba(255,100,40,.55)'; ctx.lineWidth = 2.4; for (x = Math.floor(xa / 130) * 130; x < xb; x += 130) { var jx = x + (x * 7) % 40; ctx.beginPath(); ctx.moveTo(jx, top + 5); ctx.lineTo(jx + 14, top + 16); ctx.lineTo(jx + 2, top + 26); ctx.lineTo(jx + 16, top + 40); ctx.stroke(); } }
    else { ctx.fillStyle = 'rgba(' + G.mist + ',.12)'; for (x = Math.floor(xa / 90) * 90; x < xb; x += 90) { ctx.beginPath(); ctx.ellipse(x + 40 + (x * 3) % 30, top + 14 + (x * 5) % 30, 28, 4, 0, 0, 6.3); ctx.fill(); } }
    gxUniProps(k, xa, xb);
    // портал домой (рама) и ядро (постамент)
    var P0 = UNI_PORTAL, C = UNI_CORE;
    if (P0 > xa - 100 && P0 < xb + 100) {
      gxShadow(P0, gY + 4, 70, 0.8); gxPanel(P0 - 62, gY - 16, 124, 16, '#4a5a6e', { r: 5, lw: 2.6, vert: true });
      ctx.beginPath(); ctx.ellipse(P0, gY - 112, 60, 106, 0, 0, 6.3); ctx.lineWidth = 17; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 11; ctx.strokeStyle = gxLG(P0 - 60, gY - 218, P0 + 60, gY, '#e0f6ff', '#a0d8f0', '#6aa8c8'); ctx.stroke();
      gxText('ПОРТАЛ ДОМОЙ', P0, gY - 240, 13, '#ffffff', 'rgba(10,20,44,.85)');
    }
    if (C > xa - 110 && C < xb + 110) { gxShadow(C, gY + 4, 76, 0.8); gxPanel(C - 52, gY - 22, 104, 22, '#3a4a5e', { r: 5, lw: 2.8, vert: true }); gxPanel(C - 34, gY - 36, 68, 16, '#566a82', { r: 4, lw: 2.4 }); }
  }

function gxStained(cx, y, w, h, seed) {
    var x = cx - w / 2, r = w / 2, rr = rng(seed * 7 + 3), pal = ['#d9382f', '#2f6fd0', '#e8b72a', '#2fa05a', '#8a3fc0', '#e2702a'], i, j, rows = 5, cols = 3, cw = w / cols, ch = (h - r) / rows;
    gxPanel(x - 9, y - 9, w + 18, h + 16, '#8a7a68', { r: r + 7, lw: 2.8 });
    mnArch(x, y, w, h); ctx.save(); ctx.clip();
    ctx.fillStyle = '#1a1020'; ctx.fillRect(x, y, w, h);
    for (i = 0; i < rows; i++) for (j = 0; j < cols; j++) { var c = pal[Math.floor(rr() * 6)]; ctx.fillStyle = gxLG(x + j * cw, y + r + i * ch, x + (j + 1) * cw, y + r + (i + 1) * ch, shadeC(c, 0.3), c, shadeC(c, -0.2)); ctx.fillRect(x + j * cw + 1.5, y + r + i * ch + 1.5, cw - 3, ch - 3); }
    for (i = 0; i < 6; i++) { var a0 = Math.PI + i * Math.PI / 6, c2 = pal[(i + seed) % 6]; ctx.beginPath(); ctx.moveTo(cx, y + r); ctx.arc(cx, y + r, r, a0 + 0.03, a0 + Math.PI / 6 - 0.03); ctx.closePath(); ctx.fillStyle = gxLG(cx - r, y, cx + r, y + r, shadeC(c2, 0.3), c2); ctx.fill(); }
    ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.arc(cx, y + h * 0.5, 15, 0, 6.3); ctx.fill(); ctx.fillStyle = '#7a2a2a'; ctx.fillRect(cx - 2, y + h * 0.5 - 9, 4, 18); ctx.fillRect(cx - 7, y + h * 0.5 - 3, 14, 4);
    ctx.strokeStyle = 'rgba(20,14,24,.9)'; ctx.lineWidth = 2.4; for (i = 1; i < cols; i++) { ctx.beginPath(); ctx.moveTo(x + i * cw, y + r); ctx.lineTo(x + i * cw, y + h); ctx.stroke(); } for (i = 0; i <= rows; i++) { ctx.beginPath(); ctx.moveTo(x, y + r + i * ch); ctx.lineTo(x + w, y + r + i * ch); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w * 0.55, y); ctx.lineTo(x + w * 0.8, y); ctx.lineTo(x + w * 0.25, y + h); ctx.fill();
    ctx.restore(); gxInk(2.6); mnArch(x, y, w, h); ctx.stroke(); gxPanel(x - 13, y + h + 5, w + 26, 9, '#a89a8a', { r: 3, lw: 2 });
  }

function gxRose(cx, cy, R) {
    var i, pal = ['#d9382f', '#2f6fd0', '#e8b72a', '#2fa05a', '#8a3fc0', '#e2702a'];
    gxPanel(cx - R - 10, cy - R - 10, (R + 10) * 2, (R + 10) * 2, '#8a7a68', { r: R + 10, lw: 3 });
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.clip(); ctx.fillStyle = '#1a1020'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    for (i = 0; i < 12; i++) { var a0 = i * Math.PI / 6, c = pal[i % 6]; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0 + 0.03, a0 + Math.PI / 6 - 0.03); ctx.closePath(); ctx.fillStyle = gxLG(cx - R, cy - R, cx + R, cy + R, shadeC(c, 0.32), c, shadeC(c, -0.25)); ctx.fill(); }
    ctx.strokeStyle = 'rgba(20,14,24,.9)'; ctx.lineWidth = 2.4; [0.66, 0.34].forEach(function (k) { ctx.beginPath(); ctx.arc(cx, cy, R * k, 0, 6.3); ctx.stroke(); }); for (i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(i * Math.PI / 6) * R, cy + Math.sin(i * Math.PI / 6) * R); ctx.stroke(); }
    ctx.fillStyle = '#f4d878'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.22, 0, 6.3); ctx.fill(); ctx.restore(); gxInk(2.8); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.stroke();
  }

function gxChDoor(x) {
    gxShadow(x, gY + 4, 72, 0.7);
    gxPanel(x - 64, gY - 244, 128, 244, '#8c7e70', { r: 8, lw: 3 });
    ctx.fillStyle = '#3b2616'; mnArch(x - 54, gY - 232, 108, 232); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY - 226, 0, gY - 150, '#cfeaf8', '#8cc8ea'); mnArch(x - 46, gY - 224, 92, 80); ctx.fill();
    gxPanel(x - 46, gY - 148, 45, 148, '#5a3a1e', { lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 6, b + 10, w - 12, h * 0.4); ctx.strokeRect(a + 6, b + h * 0.55, w - 12, h * 0.38); } });
    gxPanel(x + 1, gY - 148, 45, 148, '#6a4424', { lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 6, b + 10, w - 12, h * 0.4); ctx.strokeRect(a + 6, b + h * 0.55, w - 12, h * 0.38); } });
    ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.arc(x - 8, gY - 70, 3.4, 0, 6.3); ctx.arc(x + 8, gY - 70, 3.4, 0, 6.3); ctx.fill(); ctx.fillStyle = '#3b2616'; ctx.fillRect(x - 2, gY - 224, 4, 76);
    gxPlate(x, gY - 262, 'ВЫХОД', '#ffffff', 'rgba(22,14,40,.72)');
  }

function gxChColumn(x) {
    gxShadow(x, gY + 4, 40, 0.7);
    gxPanel(x - 30, gY - 18, 60, 18, '#a89a8a', { r: 3, lw: 2.4 }); gxPanel(x - 24, gY - 30, 48, 14, '#9a8c7c', { r: 3, lw: 2.2 });
    gxPanel(x - 20, gY - 420, 40, 392, '#8c7e70', { lw: 2.6, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.14)'; for (var q = 5; q < w; q += 8) ctx.fillRect(a + q, b, 2, h); ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(a + 3, b, 3, h); } });
    gxPanel(x - 28, gY - 436, 56, 18, '#a89a8a', { r: 3, lw: 2.4 }); gxPanel(x - 34, gY - 450, 68, 16, '#b8aa9a', { r: 3, lw: 2.4 });
    ctx.strokeStyle = 'rgba(232,194,90,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, gY - 380); ctx.lineTo(x + 20, gY - 380); ctx.moveTo(x - 20, gY - 60); ctx.lineTo(x + 20, gY - 60); ctx.stroke();
  }

function gxChFont(x) {
    gxShadow(x, gY + 3, 34, 0.7);
    gxPanel(x - 10, gY - 56, 20, 56, '#a89a8a', { r: 3, lw: 2.2 }); gxPanel(x - 22, gY - 14, 44, 14, '#9a8c7c', { r: 3, lw: 2.2 });
    ctx.beginPath(); ctx.ellipse(x, gY - 62, 26, 9, 0, 0, 6.3); ctx.fillStyle = gxLG(0, gY - 72, 0, gY - 54, '#cfc2b0', '#8c7e70'); ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, gY - 64, 19, 5.4, 0, 0, 6.3); ctx.fillStyle = '#7fb8e8'; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - 10, gY - 66, 10, 2);
  }

function gxChCandleStand(X) {
    gxShadow(X, gY + 4, 90, 0.8);
    gxPanel(X - 70, gY - 70, 140, 70, '#4a2f1a', { r: 4, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 8, b + 10, w - 16, h - 20); } });
    gxPanel(X - 78, gY - 82, 156, 13, '#6a4424', { r: 4, lw: 2.4 }); ctx.fillStyle = '#c98a4a'; ctx.fillRect(X - 76, gY - 82, 152, 3);
    gxPanel(X - 72, gY - 120, 144, 12, '#6a4424', { r: 3, lw: 2.2 }); [-62, 62].forEach(function (dx) { gxPanel(X + dx - 4, gY - 118, 8, 38, '#4a2f1a', { lw: 1.8 }); });
    ctx.fillStyle = 'rgba(0,0,0,.35)'; for (var i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(X - 62 + i * 20.7, gY - 82, 5, 2, 0, 0, 6.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(X - 62 + i * 20.7, gY - 120, 5, 2, 0, 0, 6.3); ctx.fill(); }
  }

function gxCandleFlame(x, y, s) {
    var f = 1 + 0.16 * Math.sin(t * 13 + x * 0.7);
    gxGlow(x, y, 22 * s * f, '255,190,90', 0.55);
    ctx.fillStyle = '#ffb02e'; ctx.beginPath(); ctx.ellipse(x, y, 3.8 * s, 8 * f * s, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff3a0'; ctx.beginPath(); ctx.ellipse(x, y + 2 * s, 1.8 * s, 4.4 * f * s, 0, 0, 6.3); ctx.fill();
  }

function gxChCandlesAnim(CX) {
    var n = Math.min(14, 4 + (save.mx.cdl | 0)), i;
    for (i = 0; i < n; i++) { var cx = CX - 62 + (i % 7) * 20.7, cy = gY - 82 - Math.floor(i / 7) * 38; ctx.fillStyle = '#f4efe6'; ctx.fillRect(cx - 4, cy - 22, 8, 22); gxInk(1.4); ctx.strokeRect(cx - 4, cy - 22, 8, 22); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(cx + 1, cy - 22, 3, 22); gxCandleFlame(cx, cy - 30, 1); }
    gxGlow(CX, gY - 130, 150, '255,200,120', 0.24);
  }

function gxChPew(x) {
    gxShadow(x, gY + 3, 62, 0.7);
    gxPanel(x - 52, gY - 40, 104, 10, '#5a3a22', { r: 3, lw: 2.2 }); gxPanel(x - 52, gY - 86, 104, 12, '#4a2f1a', { r: 3, lw: 2.2 }); gxPanel(x - 52, gY - 70, 104, 7, '#4a2f1a', { r: 2, lw: 1.8 });
    [-50, 44].forEach(function (dx) { gxPanel(x + dx - 3, gY - 92, 10, 92, '#3a2414', { r: 3, lw: 2.2 }); ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.arc(x + dx + 2, gY - 94, 3.5, 0, 6.3); ctx.fill(); });
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(x - 48, gY - 38, 96, 2);
  }

function gxChAltar(AX) {
    gxShadow(AX, gY + 5, 220, 0.9);
    gxPanel(AX - 204, gY - 24, 408, 24, '#8c7e70', { r: 4, lw: 2.8, vert: true }); gxPanel(AX - 172, gY - 48, 344, 24, '#a89a8a', { r: 4, lw: 2.6, vert: true });
    gxPanel(AX - 122, gY - 98, 244, 50, '#f4efe6', { r: 3, lw: 2.8, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(0,0,0,.08)'; for (var q = 10; q < w; q += 22) ctx.fillRect(a + q, b + 8, 2, h - 8); } });
    ctx.fillStyle = '#e8c25a'; ctx.fillRect(AX - 122, gY - 98, 244, 6); ctx.fillRect(AX - 122, gY - 56, 244, 5);
    gxPanel(AX - 7, gY - 270, 14, 172, '#e8c25a', { r: 3, lw: 2.6 }); gxPanel(AX - 44, gY - 228, 88, 14, '#e8c25a', { r: 3, lw: 2.6 });
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(AX - 4, gY - 266, 3, 160); ctx.fillRect(AX - 40, gY - 226, 80, 3);
    [-92, 92].forEach(function (dx) { gxPanel(AX + dx - 5, gY - 140, 10, 42, '#e8c25a', { r: 3, lw: 2 }); gxPanel(AX + dx - 11, gY - 102, 22, 6, '#e8c25a', { r: 2, lw: 1.8 }); gxPanel(AX + dx - 5, gY - 160, 10, 22, '#f4efe6', { r: 2, lw: 1.6 }); });
  }

function gxChAltarAnim(AX) { [-92, 92].forEach(function (dx) { gxCandleFlame(AX + dx, gY - 168, 1.2); }); gxGlow(AX, gY - 190, 160, '255,230,160', 0.22 + 0.04 * Math.sin(t * 2)); }

function gxChStatue(x) {
    gxShadow(x, gY + 3, 36, 0.7);
    gxPanel(x - 26, gY - 44, 52, 44, '#a89a8a', { r: 3, lw: 2.4, vert: true }); gxPanel(x - 32, gY - 54, 64, 11, '#b8aa9a', { r: 3, lw: 2.2 });
    ctx.beginPath(); ctx.moveTo(x - 24, gY - 54); ctx.lineTo(x - 14, gY - 130); ctx.quadraticCurveTo(x, gY - 144, x + 14, gY - 130); ctx.lineTo(x + 24, gY - 54); ctx.closePath(); ctx.fillStyle = gxLG(x - 24, 0, x + 24, 0, '#e8e2d6', '#c9c2b4', '#9a9486'); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = '#e8e2d6'; ctx.beginPath(); ctx.arc(x, gY - 148, 13, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 8, gY - 100); ctx.lineTo(x - 4, gY - 58); ctx.moveTo(x + 8, gY - 100); ctx.lineTo(x + 4, gY - 58); ctx.stroke();
    ctx.fillStyle = '#e8e2d6'; ctx.beginPath(); ctx.ellipse(x, gY - 114, 9, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, gY - 148, 22, 0, 6.3); ctx.lineWidth = 2.6; ctx.strokeStyle = 'rgba(232,194,90,.85)'; ctx.stroke();
  }

function gxChandelier(x) {
    var i;
    gxTube([[x, gY - 560], [x, gY - 442]], 3, '#4a3a2a'); ctx.beginPath(); ctx.ellipse(x, gY - 420, 40, 11, 0, 0, 6.3); ctx.lineWidth = 6; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = '#c99a3a'; ctx.stroke();
    gxPanel(x - 7, gY - 448, 14, 30, '#c99a3a', { r: 4, lw: 2 });
    for (i = -2; i <= 2; i++) { var cx = x + i * 16, cy = gY - 420 + Math.sqrt(Math.max(0, 1 - (i / 2.6) * (i / 2.6))) * 8; gxPanel(cx - 3.5, cy - 24, 7, 22, '#f4efe6', { r: 2, lw: 1.5 }); }
  }

function gxChChandAnim(x) { for (var i = -2; i <= 2; i++) gxCandleFlame(x + i * 16, gY - 420 - 24 + Math.sqrt(Math.max(0, 1 - (i / 2.6) * (i / 2.6))) * 8 - 6, 0.9); gxGlow(x, gY - 410, 150, '255,210,140', 0.3); }

function gxHvStairsAnim(X) {
    var i;
    gxGlow(X, gY - 120, 170 + 12 * Math.sin(t * 3), '255,235,170', 0.4);
    for (i = 0; i < 9; i++) { var w = 120 - i * 10, yy = gY - 18 - i * 22; ctx.fillStyle = 'rgba(255,240,190,' + (0.92 - i * 0.07).toFixed(2) + ')'; gxRR(X - 60 + i * 5, yy, w, 14, 3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = 'rgba(232,194,90,' + (0.9 - i * 0.08).toFixed(2) + ')'; ctx.fillRect(X - 60 + i * 5, yy + 11, w, 3); }
    ctx.fillStyle = 'rgba(255,255,255,.9)'; for (i = 0; i < 6; i++) { var u = (t * 0.3 + i * 0.19) % 1; ctx.beginPath(); ctx.arc(X + Math.sin(u * 7 + i) * 40, gY - u * 220, 1.8, 0, 6.3); ctx.fill(); }
    gxPlate(X, gY - 236, 'ЛЕСТНИЦА', '#fff3c0', 'rgba(60,40,10,.72)');
  }

function gxFloatIsle(x, y, s) {
    ctx.beginPath(); ctx.moveTo(x - 80 * s, y); ctx.quadraticCurveTo(x - 40 * s, y + 8 * s, x - 30 * s, y + 40 * s); ctx.quadraticCurveTo(x, y + 90 * s, x + 30 * s, y + 40 * s); ctx.quadraticCurveTo(x + 40 * s, y + 8 * s, x + 80 * s, y); ctx.closePath(); ctx.fillStyle = gxLG(0, y, 0, y + 90 * s, '#f6e8c0', '#cbb078'); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = '#9ad08a'; ctx.fillRect(x - 80 * s, y - 5 * s, 160 * s, 7 * s);
    gxPanel(x - 24 * s, y - 40 * s, 48 * s, 36 * s, '#fff7e4', { lw: 2 }); ctx.beginPath(); ctx.moveTo(x - 32 * s, y - 40 * s); ctx.lineTo(x, y - 62 * s); ctx.lineTo(x + 32 * s, y - 40 * s); ctx.closePath(); ctx.fillStyle = '#e8c25a'; ctx.fill(); gxInk(2); ctx.stroke();
  }

function gxHvColumn(x) {
    gxShadow(x, gY + 4, 40, 0.5);
    gxPanel(x - 30, gY - 22, 60, 22, '#fffaf0', { r: 4, lw: 2.4 }); gxPanel(x - 24, gY - 34, 48, 14, '#e8c25a', { r: 3, lw: 2.2 });
    gxPanel(x - 20, gY - 440, 40, 410, '#fffaf0', { lw: 2.6, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(190,170,120,.18)'; for (var q = 5; q < w; q += 8) ctx.fillRect(a + q, b, 2, h); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(a + 3, b, 4, h); } });
    gxPanel(x - 28, gY - 456, 56, 18, '#e8c25a', { r: 3, lw: 2.4 }); gxPanel(x - 34, gY - 470, 68, 16, '#fffaf0', { r: 3, lw: 2.4 });
  }

function gxAngel(x) {
    var i;
    gxShadow(x, gY + 3, 40, 0.5);
    gxPanel(x - 28, gY - 40, 56, 40, '#fffaf0', { r: 4, lw: 2.4, vert: true }); gxPanel(x - 34, gY - 50, 68, 11, '#e8c25a', { r: 3, lw: 2.2 });
    [-1, 1].forEach(function (sd) { ctx.beginPath(); ctx.moveTo(x + sd * 8, gY - 110); for (i = 0; i < 4; i++) ctx.quadraticCurveTo(x + sd * (40 + i * 12), gY - 180 + i * 18, x + sd * (20 + i * 12), gY - 132 + i * 14); ctx.lineTo(x + sd * 8, gY - 84); ctx.closePath(); ctx.fillStyle = gxLG(x, gY - 190, x + sd * 70, gY - 90, '#ffffff', '#efe6d0'); ctx.fill(); gxInk(2.2); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(x - 18, gY - 50); ctx.lineTo(x - 10, gY - 124); ctx.quadraticCurveTo(x, gY - 136, x + 10, gY - 124); ctx.lineTo(x + 18, gY - 50); ctx.closePath(); ctx.fillStyle = gxLG(x - 18, 0, x + 18, 0, '#ffffff', '#f2ead6', '#d8ceb4'); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(x, gY - 146, 12, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, gY - 168, 16, 5, 0, 0, 6.3); ctx.lineWidth = 3.4; ctx.strokeStyle = '#e8c25a'; ctx.stroke();
    ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(x, gY - 108, 9, 6, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
  }

function gxHvDown(x) {
    var i;
    gxShadow(x, gY + 4, 100, 0.4);
    for (i = 0; i < 6; i++) { var yy = gY + 2 + i * 22, hw = 74 - i * 7; ctx.fillStyle = gxLG(x - hw, 0, x + hw, 0, 'rgba(255,248,224,' + (1 - i * 0.1).toFixed(2) + ')', 'rgba(232,194,90,' + (0.9 - i * 0.1).toFixed(2) + ')'); gxRR(x - hw, yy, hw * 2, 18, 4); ctx.fill(); gxInk(1.8); ctx.stroke(); }
    [-78, 78].forEach(function (dx) { gxPanel(x + dx - 11, gY - 190, 22, 190, '#fffaf0', { r: 5, lw: 2.6 }); gxPanel(x + dx - 15, gY - 204, 30, 16, '#e8c25a', { r: 4, lw: 2.2 }); });
    ctx.beginPath(); ctx.arc(x, gY - 192, 78, Math.PI, 0); ctx.lineWidth = 17; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = gxLG(x - 78, gY - 270, x + 78, gY - 190, '#fff3c0', '#e8c25a', '#b8922a'); ctx.stroke();
    gxText('ЛЕСТНИЦА ВНИЗ', x, gY - 296, 13, '#6a5a3a', 'rgba(255,250,235,.95)');
  }

function gxHvDais(x, col) {
    var rgb = 'rgb(' + col + ')';
    gxShadow(x, gY + 3, 100, 0.4);
    gxPanel(x - 92, gY - 12, 184, 12, '#fffaf0', { r: 5, lw: 2.4 }); gxPanel(x - 70, gY - 22, 140, 12, '#f6ecd0', { r: 4, lw: 2.2 });
    ctx.strokeStyle = rgb; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, gY - 17, 54, 4, 0, 0, 6.3); ctx.stroke();
  }

function gxJudgeHD(x, col, ph) {
    var b = Math.sin(t * 1.4 + ph) * 4, i, rgb = 'rgb(' + col + ')', bk = Math.sin(t * 1.6 + ph) * 8;
    ctx.save(); ctx.translate(x, gY - 22 - b);
    gxGlow(0, -170, 160, col, 0.26);
    [-1, 1].forEach(function (sd) { var fl = Math.sin(t * 1.2 + ph) * 6; ctx.beginPath(); ctx.moveTo(sd * 20, -190); for (i = 0; i < 3; i++) ctx.quadraticCurveTo(sd * (70 + i * 16), -250 + i * 24 + fl, sd * (40 + i * 18), -170 + i * 22); ctx.lineTo(sd * 18, -110); ctx.closePath(); ctx.fillStyle = gxLG(0, -250, sd * 90, -110, 'rgba(255,255,255,.95)', 'rgba(' + col + ',.35)'); ctx.fill(); gxInk(2); ctx.stroke(); });
    var g = ctx.createLinearGradient(0, -200, 0, 10); g.addColorStop(0, '#fffdf4'); g.addColorStop(1, '#e8dec0'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-34, -190); ctx.lineTo(34, -190); ctx.lineTo(74, 8); ctx.lineTo(-74, 8); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = rgb; ctx.fillRect(-9, -190, 18, 198); ctx.fillStyle = 'rgba(' + col + ',.5)'; ctx.fillRect(-74, -6, 148, 8);
    ctx.fillStyle = '#e8c25a'; ctx.fillRect(-34, -192, 68, 7); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.beginPath(); ctx.moveTo(-34, -190); ctx.lineTo(-74, 8); ctx.lineTo(-52, 8); ctx.lineTo(-24, -190); ctx.fill();
    ctx.fillStyle = '#f2e6c8'; ctx.beginPath(); ctx.arc(0, -214, 30, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = '#6a5a4a'; ctx.beginPath(); ctx.arc(0, -214, 25, 3.35, 6.07); ctx.fill();
    ctx.fillStyle = rgb; ctx.beginPath(); ctx.arc(-9, -212, 3.6, 0, 6.3); ctx.arc(9, -212, 3.6, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -258 + 3 * Math.sin(t * 2 + ph), 32, 8, 0, 0, 6.3); ctx.lineWidth = 5.6; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,225,120,.98)'; ctx.stroke();
    var by = -118 - bk; gxPanel(48, by, 48, 60, '#6a3f20', { r: 4, lw: 2.2 }); ctx.fillStyle = '#fff8e0'; ctx.fillRect(52, by + 4, 40, 52); for (i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(' + col + ',.85)'; ctx.fillRect(56, by + 10 + i * 11, 32, 2.4); }
    ctx.restore();
  }

function gxHvGate(X) {
    var i;
    gxShadow(X, gY + 5, 160, 0.4);
    gxPanel(X - 150, gY - 14, 300, 14, '#fffaf0', { r: 5, lw: 2.6 }); gxPanel(X - 126, gY - 28, 252, 14, '#f6ecd0', { r: 4, lw: 2.4 });
    gxPanel(X - 112, gY - 360, 26, 332, '#e8c25a', { r: 5, lw: 2.8 }); gxPanel(X + 86, gY - 360, 26, 332, '#e8c25a', { r: 5, lw: 2.8 });
    ctx.beginPath(); ctx.arc(X, gY - 348, 112, Math.PI, 0); ctx.lineWidth = 30; ctx.strokeStyle = GXI; ctx.stroke(); ctx.lineWidth = 24; ctx.strokeStyle = gxLG(X - 112, gY - 460, X + 112, gY - 348, '#fff3c0', '#e8c25a', '#b8922a'); ctx.stroke();
    ctx.fillStyle = '#fff3c0'; ctx.beginPath(); ctx.arc(X, gY - 460, 11, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke();
    gxText('ВРАТА', X, gY - 490, 14, '#6a5a3a', 'rgba(255,250,235,.95)');
  }

function gxHvGateAnim(X) {
    var open = ((save.mx.hvj | 0) === 7), a = open ? 0.9 : 0.4, pl = 0.5 + 0.5 * Math.sin(t * 2);
    gxGlow(X, gY - 170, 250 + 14 * pl, '255,235,170', open ? 0.55 : 0.28);
    ctx.save(); ctx.beginPath(); ctx.moveTo(X - 86, gY - 28); ctx.lineTo(X - 86, gY - 348); ctx.arc(X, gY - 348, 86, Math.PI, 0); ctx.lineTo(X + 86, gY - 28); ctx.closePath(); ctx.clip();
    var g = ctx.createLinearGradient(0, gY - 440, 0, gY); g.addColorStop(0, 'rgba(255,255,255,' + a.toFixed(2) + ')'); g.addColorStop(1, 'rgba(255,236,170,' + (a * 0.7).toFixed(2) + ')'); ctx.fillStyle = g; ctx.fillRect(X - 90, gY - 440, 180, 420);
    if (open) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,255,230,.18)'; for (var i = 0; i < 4; i++) { var u = (t * 0.2 + i * 0.25) % 1; ctx.fillRect(X - 70 + i * 40, gY - 420 + u * 380, 8, 60); } ctx.globalCompositeOperation = 'source-over'; }
    ctx.restore();
  }

function fxRgb(c) {
    if (typeof c !== 'string') return '255,220,120';
    var q = FXRGB[c]; if (q) return q; var m, r = '255,220,120';
    if ((m = /^#([0-9a-f]{6})$/i.exec(c))) r = parseInt(m[1].slice(0, 2), 16) + ',' + parseInt(m[1].slice(2, 4), 16) + ',' + parseInt(m[1].slice(4, 6), 16);
    else if ((m = /^#([0-9a-f]{3})$/i.exec(c))) r = parseInt(m[1][0] + m[1][0], 16) + ',' + parseInt(m[1][1] + m[1][1], 16) + ',' + parseInt(m[1][2] + m[1][2], 16);
    else if ((m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c))) r = m[1] + ',' + m[2] + ',' + m[3];
    FXRGB[c] = r; return r;
  }

function fxKind(rgb) {
    var a = rgb.split(','), r = +a[0], g = +a[1], b = +a[2];
    if (r > 220 && g > 60 && g < 175 && b < 95) return 'fire';
    if (Math.abs(r - g) < 22 && Math.abs(g - b) < 28 && r < 190) return 'smoke';
    return 'spark';
  }

function fxSpr(rgb) {
    var c = gxCv['s' + rgb]; if (c) return c;
    c = gxCan(64, 64); var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(' + rgb + ',.95)'); gr.addColorStop(0.5, 'rgba(' + rgb + ',.5)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); gxCv['s' + rgb] = c; return c;
  }

function gxShSpr() {
    if (gxShS) return gxShS;
    gxShS = gxCan(64, 64); var g = gxShS.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(8,10,24,.95)'); gr.addColorStop(0.55, 'rgba(8,10,24,.75)'); gr.addColorStop(1, 'rgba(8,10,24,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return gxShS;
  }

function gxSoftSh(c, x, y, rx, ry, a) {
    if (gxShRec) { gxShRec.push([x, y, rx, ry, a]); return; }
    var ga = c.globalAlpha; c.globalAlpha = ga * Math.min(1, a * 1.8);
    _gxDi.call(c, gxShSpr(), x - rx * 1.22, y - ry * 1.7, rx * 2.44, ry * 3.4);
    c.globalAlpha = ga;
  }

function gxHookCtx(c) {
    if (c.__gxh) return; c.__gxh = 1;
    var el = c.ellipse;
    c.ellipse = function (x, y, rx, ry, rot, a0, a1, ccw) {
      if (GX && rot === 0 && a0 === 0 && a1 > 6.2 && rx >= 5 && ry < rx * 0.6) {
        var fs = this.fillStyle;
        if (typeof fs === 'string' && fs.charCodeAt(0) === 114 && fs.indexOf('rgba(0, 0, 0, ') === 0) {
          var a = parseFloat(fs.slice(14));
          if (a >= 0.05 && a <= 0.4) { gxSoftSh(this, x, y, rx, ry, a); return; }
        }
      }
      return el.call(this, x, y, rx, ry, rot, a0, a1, ccw);
    };
  }

function gxOlOK(im) {
    var v = GXOLC.get(im), k; if (v !== undefined) return v; v = false;
    if (im instanceof HTMLImageElement) { for (k = 0; k < GXOLN.length; k++) if (img[GXOLN[k]] === im) { v = true; break; } }
    else if (im instanceof HTMLCanvasElement) { for (k in skinCache) if (skinCache[k] === im) { v = true; break; } }
    GXOLC.set(im, v); return v;
  }

function gxOlEntry(im, pxH) {
    var nh = im.naturalHeight || im.height, nw = im.naturalWidth || im.width; if (!nh || !nw) return null;
    var need = Math.min(nh, Math.max(32, Math.ceil(pxH / 32) * 32)), e = GXOLE.get(im);
    if (e && e.bp >= need && e.bp <= need + 96) return e;
    var f = need / nh, w = Math.max(2, Math.round(nw * f)), tp = Math.max(1, Math.round(need * 0.014)), W = w + 2 * tp, Hh = need + 2 * tp;
    var c = gxCan(W, Hh), g = c.getContext('2d'), s = gxCan(W, Hh), sg = s.getContext('2d'), k, n = tp >= 2 ? 12 : 8, a;
    sg.drawImage(im, tp, tp, w, need); sg.globalCompositeOperation = 'source-in'; sg.fillStyle = '#150d2e'; sg.fillRect(0, 0, W, Hh);
    for (k = 0; k < n; k++) { a = k * 6.2832 / n; g.drawImage(s, Math.cos(a) * tp, Math.sin(a) * tp); }
    g.drawImage(im, tp, tp, w, need);
    e = { c: c, bp: need, cw: W, tp: tp }; GXOLE.set(im, e); return e;
  }

function gxVeh(key, x, yT, yB, half, fn, alpha) {
    var m = ctx.getTransform(), kk = dpr * scale, r = Math.min(2, Math.max(0.5, Math.hypot(m.a, m.b))), w = Math.ceil(half * 2 * r), h = Math.ceil((yB - yT) * r);
    if (Math.abs(m.a - kk) < 1e-6 && Math.abs(m.d - kk) < 1e-6 && (x + half < camX - 30 || x - half > camX + vw + 30)) return;
    if (w < 2 || h < 2 || w * h > 3.2e6) { fn(); return; }
    var p = GXVP[key];
    if (!p) { p = GXVP[key] = { c: document.createElement('canvas'), s: document.createElement('canvas') }; p.g = p.c.getContext('2d'); p.sg = p.s.getContext('2d'); gxHookCtx(p.g); }
    if (p.c.width !== w || p.c.height !== h) { p.c.width = w; p.c.height = h; p.s.width = w; p.s.height = h; } else p.g.clearRect(0, 0, w, h);
    var tx = (half - x) * r, ty = -yT * r, oc = ctx, osc = setCam, orec = gxShRec, recs = gxShRec = [], k, d, a;
    ctx = p.g; ctx.setTransform(r, 0, 0, r, tx, ty);
    setCam = function () { p.g.setTransform(r, 0, 0, r, tx, ty); };
    gxNoTr = 1;
    try { fn(); } finally { gxNoTr = 0; ctx = oc; setCam = osc; gxShRec = orec; }
    var sg = p.sg; sg.globalCompositeOperation = 'source-over'; sg.clearRect(0, 0, w, h); sg.drawImage(p.c, 0, 0);
    sg.globalCompositeOperation = 'source-in'; sg.fillStyle = '#150d2e'; sg.fillRect(0, 0, w, h); sg.globalCompositeOperation = 'source-over';
    var ga = ctx.globalAlpha; if (alpha != null) ctx.globalAlpha = ga * alpha;
    for (k = 0; k < recs.length; k++) gxSoftSh(ctx, recs[k][0], recs[k][1], recs[k][2], recs[k][3], recs[k][4]);
    d = 2.2; // толщина контура в логических единицах
    var no = gxQ >= 2 ? 8 : 4, st = 6.2832 / no;
    for (k = 0; k < no; k++) { a = k * st + 0.39; _gxDi.call(ctx, p.s, x - half + Math.cos(a) * d, yT + Math.sin(a) * d, half * 2, yB - yT); }
    _gxDi.call(ctx, p.c, x - half, yT, half * 2, yB - yT);
    ctx.globalAlpha = ga;
  }

function gxHex(c) {
    var m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c); if (!m) return c;
    return '#' + [m[1], m[2], m[3]].map(function (v) { return ('0' + (+v).toString(16)).slice(-2); }).join('');
  }

function gxBusBody(col, label, bt) {
    col = gxHex(col); var q;
    gxPanel(-40, -118, 52, 11, '#cdd5e1', { r: 4, lw: 2 });
    ctx.fillStyle = 'rgba(20,33,63,.35)'; for (q = 0; q < 5; q++) ctx.fillRect(-34 + q * 10, -115, 2, 5);
    gxPanel(-102, -98, 204, 82, col, { r: 14, vert: true, lw: 2.8 });
    ctx.fillStyle = 'rgba(255,255,255,.3)'; gxRR(-95, -96, 190, 5, 2.5); ctx.fill();
    ctx.fillStyle = shadeC(col, -0.34); gxRR(-100, -31, 200, 13, 5); ctx.fill();
    ctx.fillStyle = '#1f4aa8'; ctx.fillRect(-101, -52, 202, 14);
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-101, -52, 202, 2);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(-101, -37, 202, 3);
    gxInk(1.6); ctx.beginPath(); ctx.moveTo(-101, -52.5); ctx.lineTo(101, -52.5); ctx.moveTo(-101, -34); ctx.lineTo(101, -34); ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '10px "Russo One", "Arial Black", Impact, sans-serif';
    ctx.fillStyle = '#0f1a38'; bt(label, 27, -44); ctx.fillStyle = '#fff'; bt(label, 26, -45);
  }

function gxBusWins(wins) {
    for (var i = 0; i < wins.length; i++) {
      var wx = wins[i][0], ww = wins[i][1];
      gxRR(wx, -89, ww, 31, 5); ctx.fillStyle = gxLG(wx, -89, wx + ww * 0.6, -58, '#d6f2ff', '#8fc8ea', '#5b9ccb'); ctx.fill();
      ctx.save(); ctx.clip();
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(wx + 5, -58); ctx.lineTo(wx + 15, -89); ctx.lineTo(wx + 24, -89); ctx.lineTo(wx + 14, -58); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(wx, -89, ww, 4);
      ctx.fillStyle = 'rgba(20,33,63,.2)'; ctx.fillRect(wx, -64, ww, 6);
      ctx.restore();
      gxRR(wx, -89, ww, 31, 5); gxInk(2.2); ctx.stroke();
    }
  }

function gxBusWheels(x) {
    var rot = x / 17, wI, cxw, sp, sa;
    for (wI = 0; wI < 2; wI++) {
      cxw = wI ? 62 : -62;
      ctx.fillStyle = '#0c0f16'; ctx.beginPath(); ctx.arc(cxw, -15, 23, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#20232c'; ctx.beginPath(); ctx.arc(cxw, -15, 18, 0, 6.3); ctx.fill(); gxInk(2.2); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(cxw, -15, 14.6, 3.6, 5.0); ctx.stroke();
      ctx.fillStyle = gxLG(cxw - 9, -24, cxw + 9, -6, '#eef2f7', '#aab4c2', '#7a8696'); ctx.beginPath(); ctx.arc(cxw, -15, 9.5, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
      ctx.fillStyle = '#4c5563'; for (sp = 0; sp < 5; sp++) { sa = rot + sp * 1.2566; ctx.beginPath(); ctx.arc(cxw + Math.cos(sa) * 5.4, -15 + Math.sin(sa) * 5.4, 1.5, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#d7dde6'; ctx.beginPath(); ctx.arc(cxw, -15, 2.4, 0, 6.3); ctx.fill();
    }
  }

function gxBusModelBody(x, dir, sk, cfg) {
    var ab = cfg.ab, i, on = !!cfg.on, mv = on ? Math.min(1, Math.abs(cfg.v || 0) / 200) : 0, ob = cfg.st, wF = cfg.f;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 112 + ab * 2, 7, 0, 0, 6.3); ctx.fill();
    ctx.translate(x, gY + (on ? Math.sin(t * 30) * mv * 0.9 : 0));
    if (dir > 0) ctx.scale(-1, 1);
    function bt2(str, px, py) { if (dir > 0) { ctx.save(); ctx.scale(-1, 1); ctx.fillText(str, -px, py); ctx.restore(); } else ctx.fillText(str, px, py); }
    var body = skinColor(sk);
    gxBusBody(body, cfg.own ? 'МОЙ АВТОБУС' : 'АВТОБУС', bt2);
    var wins = [[-96, 38], [-50, 34], [-10, 34], [30, 34], [70, 28]];
    gxBusWins(wins);
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
    ctx.fillStyle = '#fff6b0'; ctx.beginPath(); ctx.ellipse(-99, -32, 4, 7, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#e6e6ee'; ctx.fillRect(-106, -22, 10, 5);
    var brk = ((cfg.acc || 0) * dir) < -120;
    ctx.fillStyle = brk ? '#ff3b3b' : '#a82833'; ctx.fillRect(98, -40, 4, 12);
    ctx.fillStyle = '#2a2f3a'; ctx.fillRect(96, -20, 12, 5);
    gxBusWheels(x);
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
    ctx.restore();
  }

function gxBusLabels(x, dir, cfg) {
    var ob_ = cfg.st; ctx.save(); ctx.translate(x, gY); if (dir > 0) ctx.scale(-1, 1);
    function bt2(str, px, py) { if (dir > 0) { ctx.save(); ctx.scale(-1, 1); ctx.fillText(str, -px, py); ctx.restore(); } else ctx.fillText(str, px, py); }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (ob.on || trunkN() > 0) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#fff'; bt2('Багажник ' + trunkN() + '/' + trunkCap(), 0, -142); }
    if (ob.on && boss.on && save.wrk) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = wT.rk > 0 ? '#ff9a9a' : '#9dffb8'; bt2(wT.rk > 0 ? 'Ракета ' + wT.rk.toFixed(1) + ' с' : 'Ракета готова', 0, -174); }
    if (ob.call) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#9fe3ff'; bt2('Автопилот', 0, -158); }
    if (ob.on) { ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.fillStyle = save.fuel < fuelCap() * 0.2 ? '#ff9a9a' : '#ffe08a'; bt2('Бак ' + Math.ceil(save.fuel) + '/' + fuelCap() + ' л' + (ab ? ' · броня −' + Math.round(armorCut() * 100) + '%' : ''), 0, -158); }
    ctx.restore();
  }

function gxBusTownBody() {
    if (!bus.on) return;
    var x = bus.x;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, gY + 3, 108, 7, 0, 0, 6.3); ctx.fill();
    var bob = (bus.st === 'ride' || bus.st === 'come') ? Math.sin(t * 30) * 0.9 : 0;
    ctx.translate(x, gY + bob);
    ctx.rotate(-bus.dir * Math.max(-0.035, Math.min(0.035, (bus.acc || 0) * 0.000035)));
    if (bus.dir > 0) ctx.scale(-1, 1);
    function bt(str, px, py) { if (bus.dir > 0) { ctx.save(); ctx.scale(-1, 1); ctx.fillText(str, -px, py); ctx.restore(); } else ctx.fillText(str, px, py); }
    gxBusBody('#f2a91f', 'ПЕТУХ-ТРАНС', bt);
    // табло
    ctx.fillStyle = '#111'; rrect(-92, -112, 72, 15, 3); ctx.fill();
    ctx.fillStyle = '#ffb020'; ctx.font = '700 10px "Rubik", system-ui, sans-serif';
    var dn = bus.dest ? bus.dest.name.toUpperCase() : 'МАГАЗИН';
    ctx.font = '700 9px "Rubik", system-ui, sans-serif';
    bt(bus.dir > 0 ? dn + ' \u25B6' : '\u25C0 ' + dn, -56, -104);
    var wins = [[-96, 38], [-50, 34], [-10, 34], [30, 34], [70, 28]];
    gxBusWins(wins);
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
    // фара, бампер, задний фонарь
    // фара с лучом, бампер, задние огни (стоп-сигнал при торможении)
    ctx.fillStyle = '#fff6b0'; ctx.beginPath(); ctx.ellipse(-99, -30, 4, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#2a2f3a'; ctx.fillRect(-106, -22, 12, 7);
    var brk = (bus.acc || 0) < -60;
    ctx.fillStyle = brk ? '#ff3b3b' : '#c8323c'; ctx.fillRect(98, -36, 4, 10);
    gxBusWheels(bus.x);
    ctx.restore();
  }

function gxBusLights(x, dir, on, brk, a) {
    var sg = dir > 0 ? 1 : -1, fx = x + sg * 102, g;
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter';
    if (on) {
      g = ctx.createLinearGradient(fx, 0, fx + sg * 170, 0); g.addColorStop(0, 'rgba(255,240,170,.34)'); g.addColorStop(1, 'rgba(255,240,170,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(fx, gY - 38); ctx.lineTo(fx + sg * 170, gY - 64); ctx.lineTo(fx + sg * 170, gY - 6); ctx.lineTo(fx, gY - 26); ctx.closePath(); ctx.fill();
    }
    gxGlow(fx, gY - 31, 20, '255,244,176', on ? 0.6 : 0.3);
    if (brk) gxGlow(x - sg * 100, gY - 31, 26, '255,60,60', 0.6);
    ctx.restore();
  }

function gxSeen() { var s = 0; try { s = localStorage.getItem(GXKEY) ? 1 : 0; } catch (e) {} return s || ((save && save.mx && save.mx.gfx) ? 1 : 0); }

function gxMarkSeen() { try { localStorage.setItem(GXKEY, '1'); } catch (e) {} try { save.mx.gfx = 1; persist(); } catch (e) {} }

function gxPref() { try { return localStorage.getItem(GXMODE) !== 'lite'; } catch (e) { return true; } }

function gxSwUi() { if (gxSw) gxSw.setAttribute('aria-checked', GX ? 'true' : 'false'); }

function gxCrack(R, W0, H0) {
    var r = rng(404), out = [], i, k, n = 15;
    for (i = 0; i < n; i++) {
      var a = i * 6.2832 / n + r() * 0.3, px = R.x, py = R.y, pts = [[px, py]], seg = 7 + Math.floor(r() * 6);
      for (k = 0; k < seg; k++) { a += (r() - 0.5) * 0.9; var l = 26 + r() * 70; px += Math.cos(a) * l; py += Math.sin(a) * l; pts.push([px, py]); if (r() < 0.22 && k > 1) { var b = a + (r() < 0.5 ? 1 : -1) * (0.6 + r() * 0.5), bx = px, by = py, bp = [[bx, by]], q; for (q = 0; q < 4; q++) { b += (r() - 0.5) * 0.9; bx += Math.cos(b) * (20 + r() * 40); by += Math.sin(b) * (20 + r() * 40); bp.push([bx, by]); } out.push(bp); } }
      out.push(pts);
    }
    return out;
  }

function gxIntro() {
    if (gxCs.on || gxSeen() || !gxPref()) return;
    gxMarkSeen(); gxCs.on = true; syncPause();
    var q = Math.min(window.devicePixelRatio || 1, 1.5), w = Math.round(innerWidth * q), h = Math.round(innerHeight * q), ov = document.createElement('canvas'), g, A, R, tiles = [], cols = 16, rows = 9, i, j, cracks, parts = [], done = false, t0 = 0, sw = false, boomed = false, rareD = false;
    ov.width = w; ov.height = h; ov.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:95;touch-action:none;cursor:pointer'; g = ov.getContext('2d');
    var hint = document.createElement('div'); hint.textContent = 'Нажми, чтобы пропустить'; hint.style.cssText = 'position:fixed;right:14px;bottom:12px;z-index:96;font:600 13px Rubik,system-ui,sans-serif;color:rgba(255,255,255,.6);pointer-events:none';
    function finish() { if (done) return; done = true; try { document.body.removeChild(ov); document.body.removeChild(hint); } catch (e) {} gxCs.on = false; syncPause(); if (!GX && gxPref()) gxSet(true); gxSwUi(); try { toast('Добро пожаловать в новый мир. HD-графику можно выключить в меню.', 5500); } catch (e) {} }
    // снимок старого мира (кадр после старта)
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      A = gxCan(w, h); A.getContext('2d').drawImage(cv, 0, 0, w, h);
      document.body.appendChild(ov); document.body.appendChild(hint);
      R = { x: w * 0.64, y: h * 0.26 }; cracks = gxCrack(R, w, h);
      var tw = w / cols, th = h / rows, maxd = Math.hypot(Math.max(R.x, w - R.x), Math.max(R.y, h - R.y)), rr = rng(9);
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) { var cx = (i + 0.5) * tw, cy = (j + 0.5) * th; tiles.push({ sx: i * tw, sy: j * th, cx: cx, cy: cy, d: Math.hypot(cx - R.x, cy - R.y) / maxd, dir: rr() < 0.5 ? -1 : 1, k: 0.7 + rr() * 0.6 }); }
      for (i = 0; i < 90; i++) parts.push({ a: rr() * 6.2832, d: 0.2 + rr() * 0.9, s: 0.5 + rr() * 1.2, c: rr() < 0.5 ? '#ffffff' : (rr() < 0.5 ? '#d8b8ff' : '#7fe4ff') });
      var T0 = 0.9, T1 = 3.6, T2 = 4.7, T3 = 7.5, diag = Math.hypot(w, h);
      function ease(x) { return x < 0 ? 0 : (x > 1 ? 1 : x * x * (3 - 2 * x)); }
      function voidBg(u) {
        var rad = Math.max(w, h) * 0.9, gr = g.createRadialGradient(R.x, R.y, 0, R.x, R.y, rad);
        gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.05, '#e8d6ff'); gr.addColorStop(0.16, '#8a4ae8'); gr.addColorStop(0.45, '#2a0e5a'); gr.addColorStop(1, '#06020f');
        g.fillStyle = gr; g.fillRect(0, 0, w, h);
        g.save(); g.globalCompositeOperation = 'lighter'; g.lineCap = 'round';
        for (var a = 0; a < 7; a++) { g.strokeStyle = 'rgba(' + (a % 2 ? '140,200,255' : '200,140,255') + ',' + (0.22 + 0.1 * Math.sin(u * 4 + a)).toFixed(2) + ')'; g.lineWidth = 5 + (a % 3) * 3; g.beginPath(); for (var s = 0; s < 48; s++) { var th2 = s * 0.18 + a * 0.9 + u * 2.2, rd = 10 + s * s * 0.34 * (w / 960); var px = R.x + Math.cos(th2) * rd, py = R.y + Math.sin(th2) * rd * 0.8; if (s) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke(); }
        g.restore();
      }
      function frameCs(now) {
        if (done) return; if (!t0) t0 = now; var u = (now - t0) / 1000, sh = 0, p;
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
        if (u < T2) {
          sh = (u < T0 ? 2 + u * 3 : 6 - (u - T0) * 1.2); sh = Math.max(1, sh) * q * (u > T2 - 0.6 ? 0.5 : 1);
          g.save(); g.translate(Math.sin(u * 61) * sh, Math.cos(u * 53) * sh);
          voidBg(u);
          // плитки старого мира втягиваются в разлом
          if (u > T0 && !boomed) { boomed = true; try { sfx('boom'); } catch (e) {} }
          for (i = 0; i < tiles.length; i++) {
            var tl = tiles[i]; p = u <= T0 ? 0 : Math.max(0, Math.min(1, (u - T0 - tl.d * 1.5) / 1.15));
            if (p >= 1) continue;
            var e1 = p * p, vx = tl.cx - R.x, vy = tl.cy - R.y, sa = e1 * 2.4 * tl.dir, ca = Math.cos(sa), sn = Math.sin(sa), kx = (1 - e1) * (vx * ca - vy * sn), ky = (1 - e1) * (vx * sn + vy * ca), sc = (1 - e1) * (1 + 0.0 * tl.k);
            g.save(); g.globalAlpha = 1 - e1 * e1 * e1; g.translate(R.x + kx, R.y + ky); g.rotate(e1 * 3.2 * tl.dir); g.scale(sc, sc);
            g.drawImage(A, tl.sx - 1, tl.sy - 1, w / cols + 2, h / rows + 2, -(w / cols) / 2 - 1, -(h / rows) / 2 - 1, w / cols + 2, h / rows + 2); g.restore();
          }
          // трещины
          var cu = Math.min(1, u / 1.7), ca2 = u < T0 + 1.2 ? 1 : Math.max(0, 1 - (u - T0 - 1.2) / 0.8);
          if (ca2 > 0) {
            g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
            for (var pass = 0; pass < 2; pass++) {
              g.globalCompositeOperation = pass ? 'source-over' : 'lighter'; g.strokeStyle = pass ? 'rgba(255,255,255,' + ca2 + ')' : 'rgba(170,100,255,' + (0.7 * ca2) + ')'; g.lineWidth = (pass ? 2.4 : 9) * q;
              for (i = 0; i < cracks.length; i++) { var cr = cracks[i], n2 = (cr.length - 1) * cu, kk; g.beginPath(); g.moveTo(cr[0][0], cr[0][1]); for (kk = 1; kk <= Math.floor(n2); kk++) g.lineTo(cr[kk][0], cr[kk][1]); if (kk < cr.length) { var fr = n2 - Math.floor(n2); g.lineTo(cr[kk - 1][0] + (cr[kk][0] - cr[kk - 1][0]) * fr, cr[kk - 1][1] + (cr[kk][1] - cr[kk - 1][1]) * fr); } g.stroke(); }
            }
            g.restore();
          }
          // ядро разлома
          var cr0 = (20 + ease((u - 0.2) / 3.5) * Math.max(w, h) * 0.2) * (1 + 0.04 * Math.sin(u * 20));
          g.save(); g.globalCompositeOperation = 'lighter'; var cg = g.createRadialGradient(R.x, R.y, 0, R.x, R.y, cr0); cg.addColorStop(0, 'rgba(255,255,255,1)'); cg.addColorStop(0.4, 'rgba(200,140,255,.75)'); cg.addColorStop(1, 'rgba(120,60,220,0)'); g.fillStyle = cg; g.beginPath(); g.arc(R.x, R.y, cr0, 0, 6.2832); g.fill();
          // частицы летят в разлом
          if (u > T0 - 0.2) for (i = 0; i < parts.length; i++) { var pt = parts[i], pu = ((u * pt.s * 0.5 + i * 0.137) % 1), dist = (1 - pu) * Math.max(w, h) * pt.d * 0.9, ang = pt.a + pu * 3; g.fillStyle = pt.c; g.globalAlpha = Math.min(1, pu * 2) * 0.85; g.beginPath(); g.arc(R.x + Math.cos(ang) * dist, R.y + Math.sin(ang) * dist * 0.85, (1 + 2.4 * pu) * q, 0, 6.2832); g.fill(); }
          g.restore(); g.restore();
          // белая вспышка перед сменой мира
          if (u > T2 - 0.55) { g.fillStyle = 'rgba(255,255,255,' + Math.min(1, (u - (T2 - 0.55)) / 0.55).toFixed(3) + ')'; g.fillRect(0, 0, w, h); }
        } else {
          if (!sw) { sw = true; try { if (!GX) gxSet(true); } catch (e) {} }
          var hu = (u - T2) / (T3 - T2 - 1.0), hr = ease(hu) * diag * 1.05, fl = Math.max(0, 1 - (u - T2) / 0.7);
          if (hu < 1) {
            voidBg(u); g.fillStyle = 'rgba(255,255,255,' + fl.toFixed(3) + ')'; g.fillRect(0, 0, w, h);
            g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(R.x, R.y, hr, 0, 6.2832); g.fill(); g.restore();
            g.save(); g.globalCompositeOperation = 'lighter'; g.lineWidth = (16 + 10 * Math.sin(u * 9)) * q; g.strokeStyle = 'rgba(190,140,255,.7)'; g.beginPath(); g.arc(R.x, R.y, hr, 0, 6.2832); g.stroke(); g.lineWidth = 4 * q; g.strokeStyle = 'rgba(255,255,255,.95)'; g.stroke();
            for (i = 0; i < parts.length; i++) { var pq = parts[i], pu2 = ((u * pq.s * 0.7 + i * 0.173) % 1); var ang2 = pq.a + u * 0.5; g.fillStyle = pq.c; g.globalAlpha = (1 - pu2) * 0.8; g.beginPath(); g.arc(R.x + Math.cos(ang2) * (hr + pu2 * 140 * q), R.y + Math.sin(ang2) * (hr + pu2 * 140 * q) * 0.9, (1 + 2 * (1 - pu2)) * q, 0, 6.2832); g.fill(); }
            g.restore();
          }
          if (!rareD) { rareD = true; try { sfx('rare'); } catch (e) {} }
          // заголовок
          var tu = (u - T2 - 0.6) / 2.0; if (tu > 0 && tu < 1.4) { var ta = Math.min(1, tu * 3) * Math.min(1, (1.4 - tu) * 3), ts = 0.85 + 0.15 * Math.min(1, tu * 2.5); g.save(); g.globalAlpha = ta; g.translate(w / 2, h * 0.42); g.scale(ts, ts); g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = (Math.round(58 * q)) + 'px "Russo One","Arial Black",Impact,sans-serif'; g.shadowColor = '#a96cff'; g.shadowBlur = 28 * q; g.lineWidth = 8 * q; g.strokeStyle = '#2a0e5a'; g.lineJoin = 'round'; g.strokeText('НОВЫЙ МИР', 0, 0); g.fillStyle = '#ffffff'; g.fillText('НОВЫЙ МИР', 0, 0); g.shadowBlur = 0; g.font = '700 ' + Math.round(20 * q) + 'px Rubik,system-ui,sans-serif'; g.fillStyle = '#e8d6ff'; g.fillText('всё перерисовано', 0, 44 * q); g.restore(); }
          if (u > T3) { finish(); return; }
        }
        requestAnimationFrame(frameCs);
      }
      function skip() { if (done) return; var now = performance.now(); if (!t0) t0 = now; var u = (now - t0) / 1000; if (u < T2) t0 = now - (T2 - 0.1) * 1000; else if (u < T3 - 1.2) t0 = now - (T3 - 1.2) * 1000; else finish(); }
      ov.addEventListener('pointerdown', function (e) { e.preventDefault(); skip(); });
      document.addEventListener('keydown', function kd(e) { if (done) { document.removeEventListener('keydown', kd, true); return; } if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); skip(); } }, true);
      requestAnimationFrame(frameCs);
    }); });
  }

function gxSet(on) { GX = !!on; SPR.map.clear(); SPR.bytes = 0; try { document.body.classList.toggle('gx', GX); } catch (e) {} }

function uniSummon(m) {
    var U = UV[2], i, sx = P.x < UNI_AX ? UNI_AX + 600 : UNI_AX - 600, b;
    p5.es.length = 0; p5.dbr.length = 0; p5.uz.length = 0;
    for (i = p5.en.length - 1; i >= 0; i--) if (p5.en[i].k === 'min' || p5.en[i] === m) p5.en.splice(i, 1);
    p5.flash = 1; p5.glit = 1.2; shk = 1; sfx('boom'); pfRing(sx, gY - 120, 320, '#ff5a3a', 0.8); pfFlash(sx, gY - 120, 200, '#ffd0a0', 0.5); pfSpark(sx, gY - 120, 36, '#ff9a3c', 620, 0.8, 3);
    b = mkEn('kk', sx, U.hp, { r: 70, name: U.n, v: 2, ph: 1, atk: '', aT: 0, face: -1, reg: 0, vis: 1 }); b.cd = 3;
    hp = Math.min(maxHp(), hp + Math.ceil(maxHp() * 0.35)); mgMana = mgCap();
    p5Title('МАГ ПРИЗВАЛ ХОУМКОКИЧА', U.t, 3.5); p5Say('Маг упал, но успел позвать хозяина. Теперь по-настоящему.', 5);
  }

function spotV220() {
    if (cs.on || P.z > 70 || mb.on || av.on) return null;
    var i, s, f = rb();
    s = nlSpot(); if (s) return s;
    if (loc.i === 1) { s = v2sp(BANK_X, 120, 'Банк', 'зайти в банк', bankTalk); if (s) return s; }
    if (loc.i === 2) { s = v2sp(ICE_X, 130, ruinI() ? 'Помочь' : 'Мороженое', ruinI() ? 'вытащить мороженщика из-под обломков' : 'поговорить с мороженщиком', iceTalk); if (s) return s; }
    if (loc.i === 11) { s = v2sp(CH_X, 110, 'Церковь', 'зайти в церковь', function () { ltGo(24, 'left', CHI_OUT + 80); }); if (s) return s; }
    if (loc.i === 24) return v2sp(CHI_OUT, 90, 'Выйти', 'выйти из церкви', function () { ltGo(11, 'left', CH_X); }) || v2sp(CHI_CAN, 120, 'Свечи', 'поставить свечку', candleTalk) || v2sp(1750, 120, 'Алтарь', save.mx.c2l ? 'выбрать веру у алтаря' : 'осмотреть алтарь', altarTalk) || v2sp(CHI_PR, 150, 'Священник', 'поговорить со священником', priestTalk) || ((save.mx.hv | 0) >= 1 ? v2sp(HV_ST, 120, 'Лестница', 'подняться на небеса', hvAscend) : null);
    if (loc.i === 25) return v2sp(160, 90, 'Спуститься', 'спуститься в церковь', function () { ltGo(24, 'left', HV_ST - 120); }) || v2sp(HV_J[0], 120, 'Судья', 'поговорить с Судьёй Счёта', function () { hvJudge(0); }) || v2sp(HV_J[1], 120, 'Судья', 'поговорить с Судьёй Записи', function () { hvJudge(1); }) || v2sp(HV_J[2], 120, 'Судья', 'поговорить с Судьёй Милости', function () { hvJudge(2); }) || v2sp(HV_GATE, 150, 'Врата', 'подойти к Вратам', hvGate);
    if (loc.i === 1) { s = v2sp(BG_X, 120, 'Бургерная', 'зайти в бургерную', function () { ltGo(23, 'left', BG_OUT + 80); }); if (s) return s; }
    if (loc.i === 23) return v2sp(BG_OUT, 90, 'Выйти', 'выйти на улицу', function () { ltGo(1, 'left', BG_X); }) || v2sp(GUARD_X, 120, 'Охранник', 'спросить охранника про работу', cashierTalk) || v2sp(BG_C, 200, 'Заказать', 'сделать заказ в бургерной', burgerTalk);
    if (loc.i === NLAB) {
      return v2sp(NL_DOOR, 90, 'Выйти', 'подняться по лестнице к люку у больницы', function () { ltGo(9, 'left', HATCH_X - 120); })
        || v2sp(NL_NPC, 150, 'Говорить', primeAlly() ? 'поговорить с профессором и Праймом' : 'поговорить с Меллстроем и профессором', nlabTalk)
        || v2sp(NL_BOARD, 130, 'Доска', 'посмотреть доску вселенных', nlabBoard)
        || (save.mx.c2m ? v2sp(GUN_X, 110, 'Портал', 'портальная пушка', gunTalk) : null)
        || v2sp(2750, 130, 'Аппарат', 'аппарат возврата', function () { dlgShow('Аппарат возврата', sciPort(), 'Через него мы вытащили Кокича из временной петли. Теперь он настроен на пушку: окно в другую вселенную открывается отсюда.', [{ t: 'Назад', out: true }]); });
    }
    if (loc.i === BLAB) return v2sp(LABX_X, 110, 'Выход', 'выйти к ферме (руины Чало Хауса)', function () { ltGo(17, 'left', 260); });
    if (loc.i === CGC) {
      s = v2sp(NL_DOOR, 90, 'К машине', 'вернуться к машине телепорта', function () { ltGo(17, 'left', MACH_X - 160); }); if (s) return s;
      s = v2sp(CG_LEAD, 130, 'Говорить', 'поговорить с ' + c2Leader(), cgLeadTalk); if (s) return s;
      s = v2sp(CG_SRV, 140, 'Сервера', 'создать сервер «бунт чг»', cgServers); if (s) return s;
      for (i = 0; i < 5; i++) if (!((f >> i) & 1) && (s = v2sp(CG_FX[i], 90, 'Флаг', 'поставить пиратский флаг (' + (i + 1) + ' из 5)', (function (i) { return function () { cgFlag(i); }; })(i)))) return s;
      for (i = 0; i < 3; i++) if ((s = v2sp(CG_YT[i], 110, 'Говорить', 'поговорить с блогером ' + YT_N[i], (function (i) { return function () { cgYt(i); }; })(i)))) return s;
      return null;
    }
    if (loc.i === UNI && p5.on && p5.uni) {
      if (p5.bomb && !p5.bomb.planted && Math.abs(P.x - UNI_CORE) < 120) return v2sp(UNI_CORE, 120, 'Заряд', 'заложить заряд на ядро вселенной', uniPlant);
      if (p5.bomb && p5.bomb.planted) return null;
      return v2sp(UNI_PORTAL, 90, 'Отступить', 'отступить через портал (бой прервётся)', function () { p5End('leave'); toast('Ты отступил. Вселенная осталась на месте.', 3500); ltGo(NLAB, 'left', GUN_X - 250); });
    }
    return null;
  }

function nlabTalk() {
    if ((save.mx.c2p | 0) === 3) { dlgShow('Чикен Моггити', null, 'Прайм ушёл. Я остаюсь, раз меня никуда не взяли. Помогу чем смогу. Город ещё в руинах.', [{ t: 'Понял', out: true }]); return; }
    if (primeAlly()) { dlgShow('Профессор и Прайм', sciPort(), 'Меллстроя с нами нет: он по ту сторону. Зато Кокич Прайм держит слово и помогает. Портальная пушка справа.', [{ t: 'Поговорить с Праймом', fn: primeTalk }, { t: 'Понял', out: true }]); return; }
    var im = mellImg(), n = c2n(), ch = [{ t: 'Понял', out: true }];
    if (save.mx.endp) { dlgShow('Меллстрой', im, 'Петля закрыта. Я снова стримлю в обычное время, Кокич снова собирает чекушки на ферме, а профессор снова ворчит про сыворотки. Скучно. Хорошо скучно.', [{ t: 'Посмотреть финал ещё раз', fn: function () { dlgClose(); csPlay('endpeace'); } }, { t: 'Понял', out: true }]); return; }
    if (n >= 4) { dlgShow('Профессор', sciPort(), 'Лабораторию отстроили заново: Чикен Ган прислал материалы в благодарность за бунт. Портальная пушка справа. Выбирай вселенную: открою окно, ты пройдёшь, победишь тамошнего Кокича, заложишь заряд на ядро и убежишь до взрыва. Пока ядро стоит, вселенная живёт.', [{ t: 'Что нужно знать?', fn: function () { dlgShow('Меллстрой', im, 'В каждой вселенной свой Кокич: сильнее, быстрее или вообще странный. Бей чекушками, магией и жиром. После победы беги к ядру справа, ставь заряд и успей добежать до портала слева.', [{ t: 'Ясно', out: true }]); } }, { t: 'Понял', out: true }]); return; }
    dlgShow('Профессор', sciPort(), 'Новая лаборатория. Белая, чистая, без запаха жжёных проводов.', ch);
  }

function nlabBoard() {
    var m = save.mx.c2u | 0, lines = C2U.slice(0, 5).map(function (u, k) { return (((m >> k) & 1) ? '✕ уничтожена: ' : '● цела: ') + u.n; }).concat(save.mx.c2l ? [(save.mx.c2p ? '✕ уничтожена: ' : '● цела: ') + C2U[6].n] : []).join('\n');
    dlgShow('Доска вселенных', null, lines + '\nОсталось целых вселенных: ' + (5 - bitCount(m)) + '.', [{ t: 'Назад', out: true }]);
  }

function cgImg() { return mogAlive() ? img.mogg : null; }

function rbAdd(bit, quiet) { save.mx.rb = (rb() | (1 << bit)); persist(); if (!quiet && socket && net.room && net.state === 'online') socket.emit('rb', { b: bit }); }

function cgGoShare() { if (socket && net.room && net.state === 'online') socket.emit('rb', { go: rb() }); }

function cgFlag(i) {
    if ((rb() >> i) & 1) return;
    rbAdd(i); sfx('rare'); pfFlash(CG_FX[i], gY - 190, 90, '#ffffff', 0.3); pfRing(CG_FX[i], gY - 100, 160, '#ffd23f', 0.5); popup(CG_FX[i], 230, 'Флаг поднят', '#ffd23f');
    toast('Пиратский флаг поднят: ' + rbFlags() + ' из 5.' + (rbFlags() === 5 ? ' Все флаги стоят!' : ''), 3500); if (rbFlags() === 5) ach('c2flags');
  }

function cgServers() {
    var f = rb(), ch = [], i, made = rbSrv(), need = [0, 2, 4][Math.min(2, made)];
    if (made >= 3) { dlgShow('Сервера', null, 'Три сервера «бунт чг» уже в сети: онлайн растёт, в чате пишут про патч и пиратские флаги.', [{ t: 'Отлично', out: true }]); return; }
    for (i = 0; i < 5; i++) (function (i) {
      if ((f >> (5 + i)) & 1) return;
      ch.push({ t: 'Создать: ' + SRV_N[i], fn: function () {
        if (rbFlags() < need) { sfx('no'); dlgClose(); toast('Рано: чтобы создать этот сервер, нужно поставить хотя бы ' + need + ' флага (сейчас ' + rbFlags() + ').', 4000); return; }
        rbAdd(5 + i); dlgClose(); sfx('rare'); toast('Сервер «' + SRV_N[i] + '» создан. Серверов «бунт чг»: ' + rbSrv() + ' из 3.', 4000); if (rbSrv() === 3) ach('c2srv');
      } });
    })(i);
    ch.push({ t: 'Назад', out: true });
    dlgShow('Сервера', null, 'Нужно создать 3 сервера с именами «бунт чг», чтобы игроки видели бунт в списке. Создано: ' + made + ' из 3. Для ' + (made + 1) + '-го сервера нужно флагов: ' + need + ' (сейчас ' + rbFlags() + ').', ch);
  }

function cgInvCount() { var n = 0, r; for (r = 0; r < RAR.length; r++) n += (save.inv.d[r] | 0) + (save.inv.c[r] | 0); return n; }

function cgInvTake(n) {
    var r, k, took = 0;
    for (r = 0; r < RAR.length && took < n; r++) {
      k = Math.min(n - took, save.inv.d[r] | 0); save.inv.d[r] -= k; took += k;
      k = Math.min(n - took, save.inv.c[r] | 0); save.inv.c[r] -= k; took += k;
    }
    save.carried = Math.max(0, (save.carried | 0) - took); return took;
  }

function cgYtBarter(i, yes) {
    var nm = YT_N[i], im = img.rooster, have = cgInvCount(), ch = [];
    if (have >= 20) ch.push({ t: 'Отдать 20 чекушек из рюкзака на розыгрыш', fn: function () { cgInvTake(20); hud(); persist(); popup(P.x, PLAYER_H + 30, '−20 чекушек', '#ffb4b4'); yes(); } });
    ch.push({ t: 'Соберу и вернусь', out: true });
    dlgShow(nm, im, 'Коинов не хватает: нужно 5000, у тебя ' + save.coins + '. Можно иначе: отдай 20 чекушек для розыгрыша в эфире (сейчас у тебя ' + have + '). Или заработай коины и вернись, я никуда не денусь.', ch);
  }

function cgYt(i) {
    var f = rb(), im = img.rooster, nm = YT_N[i];
    if ((f >> (10 + i)) & 1) { dlgShow(nm, im, ['Я в эфире! Чат пишет «пиратам слава».', 'Ролик про бунт уже набрал просмотры, спасибо!', 'Стрим идёт, экран на весь лагерь. Давай, поднимай бунт!'][i], [{ t: 'Отлично', out: true }]); return; }
    var req = [{ fl: 2, sv: 1 }, { fl: 3, sv: 2 }, { fl: 5, sv: 3 }][i];
    if (rbFlags() < req.fl || rbSrv() < req.sv) { dlgShow(nm, im, 'Мне нечего показывать. Приходи, когда будет хотя бы ' + req.fl + ' флага и ' + req.sv + ' сервер(а) «бунт чг». Сейчас: флагов ' + rbFlags() + ', серверов ' + rbSrv() + '.', [{ t: 'Понял', out: true }]); return; }
    var yes = function () { rbAdd(10 + i); dlgClose(); sfx('rare'); toast(nm + ' выходит в эфир. Ютуберов в деле: ' + rbYt() + ' из 3.', 4000); if (rbYt() === 3) ach('c2yt'); };
    var no = function () { dlgShow(nm, im, 'Не убедил. Подумай, что реально интересно зрителям.', [{ t: 'Попробовать ещё раз', fn: function () { cgYt(i); } }, { t: 'Уйти', out: true }]); };
    if (i === 0) dlgShow(nm, im, 'Я стример. Мне нужен повод выйти в эфир: чем зацепишь зрителей?', [{ t: 'Ты первым покажешь настоящий бунт, зрители придут на твой стрим', fn: yes }, { t: 'Просто приходи', fn: no }, { t: 'Дам один коин', fn: no }]);
    else if (i === 1) dlgShow(nm, im, 'Я делаю обзоры. Что будет в ролике?', [{ t: 'Флаги по всему лагерю и сервера «бунт чг» с растущим онлайном', fn: yes }, { t: 'Ничего интересного, зато бесплатно', fn: no }, { t: 'Реклама казино', fn: no }]);
    else dlgShow(nm, im, 'Я самый крупный блогер Чикен Гана. Рекламная интеграция стоит 5000 коинов, взамен весь мой охват идёт на бунт.', [{ t: 'Заплатить 5000 коинов', fn: function () { if (save.coins < 5000) { sfx('no'); cgYtBarter(i, yes); return; } save.coins -= 5000; hud(); popup(P.x, PLAYER_H + 30, '−5000', '#ffb4b4'); yes(); } }, { t: 'Отказаться', out: true }]);
  }

function cgLeadTalk() {
    var L = c2Leader(), im = cgImg(), f = rbFlags(), s = rbSrv(), y = rbYt();
    var st = 'Флаги: ' + f + ' из 5. Сервера «бунт чг»: ' + s + ' из 3. Ютуберы: ' + y + ' из 3.';
    if (rbReady()) { dlgShow(L, im, 'Всё готово. Флаги над лагерем, сервера в списке, ютуберы в эфире. Разработчики не смогут нас не услышать. Начнём бунт?', [{ t: 'Начать бунт!', fn: function () { dlgClose(); cgGoShare(); c2RiotGo(); } }, { t: 'Ещё минуту', out: true }]); return; }
    dlgShow(L, im, 'Бунт делается не одним щелчком. Нужно расставить пиратские флаги по лагерю, создать сервера «бунт чг» у терминала и привлечь ютуберов. ' + st + ' Мне ничего больше не надо: я просто хочу, чтобы игра обновилась.', [{ t: 'Понял', out: true }]);
  }

function c2RiotStart() {
    save.mx.rbo = 1; if (save.mx.rb == null) save.mx.rb = 0; persist(); ach('c2cg');
    ltGo(CGC, 'left', 600);
    toast('Лагерь Чикен Гана. Поставь 5 пиратских флагов, создай 3 сервера «бунт чг» у терминала и привлеки 3 ютуберов. Потом поговори с ' + c2Leader() + '.', 10000);
  }

function c2RiotGo() {
    var L = c2Leader(), me = mogAlive();
    CS.c2riot[0].say = [[0.4, 'Рассказчик', 'Пиратские флаги поднялись над всем лагерем. Ганнеры пели про патч и про перемены.'], [4.2, L, 'Мы не ломаем игру. Мы просим её починить.']];
    CS.c2riot[1].say = [[0.4, 'Рассказчик', 'Сервера «бунт чг» заполнились за минуты. Три ютубера вышли в эфир одновременно.'], [4.4, 'Курочкин LIVE', 'Чат, вы это видите? Такого в Чикен Гане ещё не было!']];
    CS.c2riot[2].say = [[0.4, 'Рассказчик', 'Тысячи игроков под чёрными флагами пошли к лагерю разработчиков.'], [4.4, 'Меллстрой', 'Кокич, держись рядом. Профессор отвлекает защиту.']];
    CS.c2upd[0].say = [[0.4, 'Рассказчик', 'Разработчики услышали игроков. Чикен Ган получил большое обновление.'], [4, 'Система', 'ОБНОВЛЕНИЕ: исправления, новые карты и баланс. Для всех.'], [7.4, L, me ? 'Я не хотел власти. Я хотел, чтобы моя игра жила и обновлялась. Теперь она живёт.' : 'Я просто хотел, чтобы игра обновилась. Больше мне ничего не нужно.']];
    csPlay('c2riot', function () {
      csPlay('c2upd', function () {
        var first = !achOwn.c2part1; save.mx.c2n = 4; if (first) save.coins += 50000; persist(); hud(); ach('c2part1'); sfx('rare');
        csPlay('c2multi', function () { save.mx.c2m = 1; persist(); ach('c2multi'); ltGo(NLAB, 'left', GUN_X - 300); toast('Часть 1 главы 2 пройдена' + (first ? ' (+50 000 коинов)' : '') + '. Новая лаборатория: у портальной пушки выбери вселенную, пройди в неё, победи Кокича и взорви ядро.', 9000); });
      });
    });
  }

function gunTalkNew() {
    var m = save.mx.c2u | 0, left = 5 - bitCount(m), ch = [];
    if (!left) {
      C2U.forEach(function (u, k) { if (k === 5 || k === 6 || k === 8 || k === 9) return; ch.push({ t: (k === 6 && !save.mx.c2p) ? 'ШЕСТОЕ ОКНО: ' + u.n + ' (+40 000)' : 'Повтор: ' + u.n + ' (+3 000)', fn: function () { dlgClose(); c2Portal(k); } }); });
      if (save.mx.c2l && (save.mx.c2p | 0) < 2) ch.push({ t: (save.mx.c2p ? 'Повтор: ' : 'ШЕСТОЕ ОКНО: ') + C2U[6].n + (save.mx.c2p ? ' (+3 000)' : (mogSacrificed() ? ' (Моггити и Прайм)' : ' (сделка или бой)')), fn: function () { dlgClose(); if (save.mx.c2p) c2Portal(6); else if (mogSacrificed()) clashOffer(); else primeOffer(); } });
      ch.push({ t: 'Назад', out: true });
      dlgShow('Профессор', sciPort(), 'Все вселенные закрыты. Остался вопрос: а были ли мы оригиналом? Пока думаем, можно тренироваться: пушка вскроет любую из них заново, а Кокичи в ней всё те же. За повтор плачу 3 000.', ch);
      return;
    }
    C2U.forEach(function (u, k) { if (k >= 5) return; if (!(m & (1 << k))) ch.push({ t: 'Открыть портал: ' + u.n + ' (' + UV[k].t + ')', fn: function () { dlgClose(); c2Portal(k); } }); });
    if (save.mx.c2l && (save.mx.c2p | 0) < 2) ch.push({ t: (save.mx.c2p ? 'Повтор: ' : 'ШЕСТОЕ ОКНО: ') + C2U[6].n + ' (' + UV[6].t + ')', fn: function () { dlgClose(); if (save.mx.c2p) c2Portal(6); else if (mogSacrificed()) clashOffer(); else primeOffer(); } });
    ch.push({ t: 'Назад', out: true });
    pv('gun', 'Портальная пушка', sciPort(), 'Портал открывается на несколько минут. Внутри живёт свой Кокич: победи его, заложи заряд на ядро вселенной и успей вернуться к порталу. Осталось целых вселенных: ' + left + '.', ch);
  }

function c2Portal(k) {
    if (rcMulti()) { try { socket.emit('uni', { k: k }); } catch (e) {} }
    c2cur = k; uniV = k; var u = C2U[k];
    CS.c2port[0].say = [[0.4, 'Профессор', 'Цель: ' + u.n + '. Открываю окно.'], [2.8, 'Меллстрой', 'Кокич, в той вселенной ты не гость. Заряд ставь на ядро и сразу назад.'], [5.4, 'Кокич', 'Иду.']];
    csPlay('c2port', function () { uniPend = k; ltGo(UNI, 'left', UNI_PORTAL + 140); });
  }

function uniPlant() {
    if (!p5.on || !p5.uni || !p5.bomb || p5.bomb.planted) return;
    p5.bomb.planted = true; p5.bomb.t = 0; p5.bomb.T = 24; p5.bomb.dt = 0.6; sfx('boom'); shk = Math.max(shk, 0.8); p5.flash = 0.5; pfFlash(UNI_CORE, gY - 120, 200, '#ff5a3a', 0.5); pfRing(UNI_CORE, gY - 120, 320, '#ffd23f', 0.6);
    p5Say('Заряд заложен! Вселенная трескается. Беги к порталу слева, пока не взорвалась!', 5); p5Title('БЕГИ!', 'До взрыва ' + p5.bomb.T + ' секунд', 3);
  }

function uniWin() {
    if (winSide(p5.uv)) { p5End('uni'); return; }
    var k = p5.uv, first = k === 6 ? !save.mx.c2p : !((save.mx.c2u | 0) >> k & 1);
    p5End('uni'); if (k === 6) save.mx.c2p = 1; else save.mx.c2u = (save.mx.c2u | 0) | (1 << k); save.coins += first ? (k === 6 ? 40000 : 10000) : 3000; persist(); hud(); sfx('boom'); ach('c2k' + k);
    c2cur = k; uniV = k;
    CS.c2dest[0].say = [[0.4, 'Профессор', 'Окно закрывается. Ядро ' + C2U[k].n.toLowerCase() + ' нестабильно.'], [3.4, 'Меллстрой', 'Ты успел. Смотрите: вселенная гаснет.'], [6.2, 'Рассказчик', C2U[k].n + (first ? ' разрушена. Награда: 10 000 коинов.' : ' пройдена повторно. Награда: 3 000 коинов.')]];
    csPlay('c2dest', function () {
      if (k === 6) { ltGo(NLAB, 'left', GUN_X - 250); if (first) ach('c2prime'); toast('Кокич Прайм повержен' + (first ? ' (+40 000 коинов)' : '') + '. Шестое окно закрыто.', 7000); }
      else if (first && (save.mx.c2u | 0) === 31) { ach('c2all'); ltGo(NLAB, 'left', GUN_X - 250); csPlay('c2end', function () { c2Late(); }); }
      else { ltGo(NLAB, 'left', GUN_X - 250); toast(C2U[k].n + ' уничтожена. Осталось: ' + (5 - bitCount(save.mx.c2u)) + '.', 4500); }
    });
  }

function updateV220(dt) {
    rrTick(dt);
    if (loc.i === NLAB && (save.mx.c2u | 0) === 31 && !save.mx.c2l && !cs.on && !lt.st && !dlgOpened && !p5.on && !fin.on) c2Late();
    if (uniPend >= 0 && loc.i === UNI && !lt.st && !cs.on && !dlgOpened) { var uk = uniPend; uniPend = -1; p5BeginUni(uk); }
    if (blabCd > 0) blabCd -= dt;
    if (loc.i === BLAB && !cs.on && !lt.st && !dlgOpened && blabCd <= 0 && P.z < 38) {
      for (var i = 0; i < BL_FIRE.length; i++) if (Math.abs(P.x - BL_FIRE[i]) < 46) { blabCd = 0.9; hurt(5); pfSpark(P.x, gY - 30, 10, '#ff9a3c', 360, 0.4, 2.5); break; }
    }
    if (loc.i === CGC && !cs.on && !lt.st && !dlgOpened && Math.random() < dt * 4) { var fx = CG_FX[Math.floor(Math.random() * 5)]; if (((rb() >> CG_FX.indexOf(fx)) & 1) && Math.abs(fx - P.x) < 700) pfGlowP(fx + 40 + Math.random() * 60, gY - 170 + Math.random() * 40, 20, -10, 5, '#ffd23f', 1.4, 0); }
  }

function p5BeginUni(k) {
    pfClear(); p5.assist = !!uniAssist; uniAssist = false; p5.cmb = 0; p5.hs = 0; p5.slo = 0; p5.hurtT = 0; p5.gh = 1;
    p5.auto = false; p5.on = true; p5.farm = false; p5.uni = true; p5.uv = k; p5.side = uniSide; uniSide = ''; p5.bomb = null; p5.uz = []; p5.dbr = []; P5_HW = 900;
    p5.stage = 8; p5.en = []; p5.es = []; p5.ps = []; p5.cov = []; p5.hom = null; p5.burg = []; p5.kills = 0; p5.rem = false; p5.fat = false; p5.pw = 1; p5.cd = 0; p5.scd = 0; p5.glit = 0; p5.flash = 0; p5.clones = false; p5.fade = 0; p5.line = ''; p5.ttlT = 0; p5.cols = [];
    P.x = UNI_PORTAL + 160; P.z = 0; P.vz = 0; P.vx = 0; hp = maxHp(); mgMana = mgCap(); iFrames = 1;
    document.body.classList.add('boss'); hero.on = false; heroT = 99; hp = maxHp();
    p5.rush = rr.on; p5.tn = []; uniV = k; c2cur = k;
    p5Stage(8);
    if (rr.on && rr.i > 0 && rr.hp > 0) hp = Math.min(maxHp(), rr.hp);
    if (!p5.assist && !rr.on && partyOn() && partyHost()) { storyEmit({ un: k }); toast('Бой вместе: друзья из лаборатории прыгают за тобой. Результат решаешь ты.', 4500); }
    else if (p5.assist) toast('Бой вместе: бей того же Кокича, что и ведущий. Итог решает ведущий.', 4500);
  }

function uniStage() {
    var k = p5.uv, U = UV[k], u = C2U[k];
    p5.ar = 3; p5.bomb = null; p5.uz = []; p5.dbr = [];
    if (k === 2) U = UV[5];
    mkEn('kk', UNI_AX + 600, Math.round(U.hp * ((k === 8 && !p5.assist && partyOn()) ? 1 + 0.55 * (Math.min(4, party.ids.length) - 1) : 1)), { r: k === 2 ? 60 : 70, name: U.n, v: k === 2 ? 5 : k, ph: 1, atk: '', aT: 0, face: -1, reg: 0, vis: 1 });
    CS.c2k[0].say = [[0.4, 'Рассказчик', u.n + '. Тут свой Кокич, и он не рад гостям.'], [3.4, U.n, u.q], [6.4, 'Кокич', 'Ничего личного. Просто закрываю лишнюю вселенную.']];
    if (k === 2) CS.c2k[0].say = [[0.4, 'Рассказчик', 'Хоумкокич. Но у входа стоит не он, а маг с посохом.'], [3.4, 'Кокич-маг', 'Тише. Хозяин спит. Сначала ты победишь меня.'], [6.4, 'Кокич', 'Ничего личного. Просто разбужу кого надо.']];
    if (k === 9) CS.c2k[0].say = [[0.4, 'Рассказчик', 'Небесная канцелярия дрогнула. Старший Судья встал из-за книги.'], [3.4, 'Старший Судья', 'Запись не оспаривается.'], [6.4, 'Кокич', 'Тогда перепишем.']];
    if (k === 8) CS.c2k[0].say = [[0.4, 'Рассказчик', 'Круг в офисе вспыхнул. Из пола поднимается Ктулху, а за столом встаёт Моггити.'], [3.4, 'Чикен Моггити', 'Мог-батл был разминкой. Теперь нас двое.'], [6.4, 'Кокич', 'Зови друзей, если они у тебя есть.']];
    p5Cs('c2k', function () { p5Title(U.n, U.t, 3); p5Say(p5.rush ? 'Босс-раш: бей по очереди всех. Здоровье между боссами восстанавливается лишь частично.' : (k === 9 ? 'Столбы света не обойти прыжком: уходи с линии. Кольца лучше перепрыгивать.' : k === 8 ? 'Щупальца бьют из-под земли: уходи с кружков. Зелёный столб прыжком не обойти.' : 'Победи его, потом ядро справа: заряд и бегом к порталу слева.'), 5); });
  }

function uniBoss() { for (var i = 0; i < p5.en.length; i++) if (p5.en[i].k === 'kk') return p5.en[i]; return null; }

function uniAi(dt) {
    var e = uniBoss(), k = (e && e.v != null) ? e.v : p5.uv, i, an, dx, AX = UNI_AX, hw = P5_HW;
    if (e && !p5.assist && partyOn() && partyHost()) { ubT -= dt; if (ubT <= 0) { ubT = 0.5; storyEmit({ ub: { v: e.v, h: Math.max(0, Math.round(e.hp)), m: Math.round(e.max), d: e.dead ? 1 : 0 } }); } }
    // дебрис и зоны
    for (i = p5.uz.length - 1; i >= 0; i--) { var z = p5.uz[i]; z.t -= dt; if (Math.abs(P.x - z.x) < z.w / 2 && P.z < 30) { z.hc = (z.hc || 0) - dt; if (z.hc <= 0) { z.hc = 0.7; p5Hurt(6); } } if (z.t <= 0) p5.uz.splice(i, 1); }
    if (p5.tn) for (i = p5.tn.length - 1; i >= 0; i--) { var q8 = p5.tn[i]; q8.t += dt; if (q8.t >= q8.w0) { if (!q8.h) { q8.h = 1; shk = Math.max(shk, 0.3); } if (q8.t < q8.w0 + 0.45 && Math.abs(P.x - q8.x) < q8.r && P.z < q8.hz) p5Hurt(q8.d); } if (q8.t >= q8.w0 + 0.5) p5.tn.splice(i, 1); }
    for (i = p5.dbr.length - 1; i >= 0; i--) { var d = p5.dbr[i]; d.t -= dt; if (d.t <= 0) { eShot(d.x, gY - 620, 0, 760, 12, '#ff9a3c', 16); p5.dbr.splice(i, 1); } }
    if (p5.bomb) {
      var b = p5.bomb;
      if (b.planted) {
        b.t += dt; shk = Math.max(shk, 0.12 + 0.3 * (b.t / b.T)); b.dt -= dt;
        if (b.dt <= 0) { b.dt = Math.max(0.28, 0.65 - b.t * 0.02); var tx = Math.max(AX - hw + 40, Math.min(AX + hw - 40, P.x + (Math.random() - 0.5) * 360)); p5.dbr.push({ x: tx, t: 0.7 }); }
        if (P.x < UNI_PORTAL + 70) { uniWin(); return; }
        if (b.t >= b.T) { p5.flash = 1; shk = 1; sfx('boom'); popup(P.x, PLAYER_H + 40, 'ВЗРЫВ', '#ff3030'); hp = 0; faint(); return; }
      }
      return;
    }
    if (!e) return;
    if (e.dead && e.v === 5) { uniSummon(e); return; }
    if (e.dead && (p5.rush || e.v === 8 || e.v === 9)) { rrBossDown(e); return; }
    if (e.dead) { p5.es.length = 0; p5.dbr.length = 0; p5.uz.length = 0; for (i = p5.en.length - 1; i >= 0; i--) if (p5.en[i].k === 'min') p5.en.splice(i, 1); p5.bomb = { planted: false, t: 0, T: 24, dt: 0.6 }; e.dt = 0; sfx('rare'); p5.flash = 0.8; p5Title('КОКИЧ ПОВЕРЖЕН', 'Теперь ядро справа', 3.5); p5Say('Беги к ядру справа и нажми E: заложить заряд. Потом бегом к порталу слева!', 6); return; }
    e.cd -= dt; dx = P.x - e.x; e.face = dx > 0 ? 1 : -1;
    if (p5.side && !e.dead && e.hp > e.max * 0.18) e.hp -= dt * 5;
    var r = e.hp / e.max, ph = (k === 8 || k === 9) ? (r > 0.66 ? 1 : (r > 0.33 ? 2 : 3)) : (k === 6 ? (r > 0.62 ? 1 : (r > 0.3 ? 2 : 3)) : (r > 0.5 ? 1 : 2)), spd = (k === 1 ? 1.5 : (k === 2 ? 0.85 : 1)) * (ph >= 2 ? 1.25 : 1) * (ph === 3 ? 1.15 : 1);
    if (ph > e.ph) { e.ph = ph; e.atk = ''; p5.glit = 0.8; p5.flash = 0.6; sfx('boom'); shk = 1; p5Title('ЯРОСТЬ', U_RAGE[k], 2.5); }
    if (k === 4) { e.vis = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.4)); e.reg = (e.reg || 0) + dt; if (e.reg > 5 && e.hp < e.max) { e.hp = Math.min(e.max, e.hp + e.max * 0.03); e.reg = 4; popup(e.x, 200, '+', '#9fe3ff'); } }
    var adx = Math.abs(dx);
    if (e.atk === '') {
      if (adx > (k === 1 ? 120 : 230)) e.x += e.face * (k === 4 ? 100 : 160) * spd * dt;
      e.x = Math.max(AX - hw + 50, Math.min(AX + hw - 50, e.x));
      if (e.cd <= 0) {
        var pool = U_POOL[k][ph - 1], at = pool[Math.floor(Math.random() * pool.length)]; e.atk = at; e.slm = false; e.cd = (1.3 + Math.random() * 0.6) / spd;
        if (at === 'dash') { e.aT = 1.0; e.dx = e.face; popup(e.x, 210, '!', '#ff6b6b'); }
        else if (at === 'fan') { e.aT = 0.5; popup(e.x, 210, '•', '#ffd23f'); }
        else if (at === 'slam') { e.aT = 1.0; popup(e.x, 230, 'ПРЫГАЙ', '#ffcf4a'); }
        else if (at === 'rain') { e.aT = 2.2; e.rt = 0; popup(e.x, 230, 'ДОЖДЬ', '#6bc4ff'); }
        else if (at === 'laser') { e.aT = 1.7; popup(e.x, 250, 'ЛАЗЕР', '#ff3030'); }
        else if (at === 'summon') { e.aT = 0.8; popup(e.x, 230, 'ПОМОЩНИКИ', '#ff7ae8'); }
        else if (at === 'blink') { e.aT = 0.5; popup(e.x, 210, 'ПЫХ', '#e6d2ff'); }
        else if (at === 'ring') { e.aT = 0.8; popup(e.x, 210, 'КОЛЬЦО', '#9fe3ff'); }
        else if (at === 'puddle') { e.aT = 0.6; popup(e.x, 210, 'ЯД', '#7dff9c'); }
        else if (at === 'tent') { e.aT = 0.9; popup(e.x, 230, 'ЩУПАЛЬЦА', '#5dffd8'); }
        else if (at === 'beam') { e.aT = 1.0; popup(e.x, 230, 'ГЛАЗ КТУЛХУ', '#9dffe8'); }
      }
      return;
    }
    e.aT -= dt;
    var col = 'rgb(' + UV[k].col + ')', cc = '#' + ['7dff9c', 'ffd86b', 'ff5a3a', 'ff7ae8', '9fd0ff', 'c46bff', 'ff4a4a', 'ff9af0', '5dffd8', 'ffe9a0'][k];
    if (e.atk === 'dash') { if (e.aT <= 0.5 && e.aT > 0) { e.x += e.dx * 960 * dt; if (Math.abs(e.x - P.x) < 80 && P.z < 80) { p5Hurt(k === 2 ? 22 : 16); e.atk = ''; } } if (e.aT <= 0) e.atk = ''; e.x = Math.max(AX - hw + 50, Math.min(AX + hw - 50, e.x)); }
    else if (e.atk === 'fan') { if (e.aT <= 0) { var nf = ph === 3 ? 5 : (ph >= 2 ? 3 : 2); for (i = -nf; i <= nf; i++) { an = Math.atan2(pY() - (gY - 90), P.x - e.x) + i * 0.2; eShot(e.x, gY - 90, Math.cos(an) * 470, Math.sin(an) * 470, k === 2 ? 14 : 11, cc, 12); } pfFlash(e.x, gY - 90, 80, cc, 0.25); pfRing(e.x, gY - 90, 140, cc, 0.35); sfx('jump'); e.atk = ''; } }
    else if (e.atk === 'slam') { if (e.aT > 0.45) e.y = Math.sin((1 - (e.aT - 0.45) / 0.55) * 3.14) * 190; else { e.y = 0; if (!e.slm) { e.slm = true; eShot(e.x, gY - 24, -520, 0, 18, cc, 26); eShot(e.x, gY - 24, 520, 0, 18, cc, 26); if (ph >= 2) { eShot(e.x, gY - 24, -340, 0, 18, cc, 26); eShot(e.x, gY - 24, 340, 0, 18, cc, 26); } shk = Math.max(shk, 0.8); sfx('boom'); pfWave(e.x, gY, 380, cc, 0.6); pfDust(e.x, gY, 12, 120); } } if (e.aT <= 0) { e.atk = ''; e.y = 0; } }
    else if (e.atk === 'rain') { e.rt -= dt; if (e.rt <= 0) { e.rt = 0.17; eShot(AX - hw + Math.random() * hw * 2, gY - 600, 0, 400, 11, cc, 12); } if (e.aT <= 0) e.atk = ''; }
    else if (e.atk === 'laser') { var hot = e.aT <= 0.8; if (hot && e.aT > 0) { if (P.z < 60 && Math.abs(dx) < 800 && ((P.x < e.x) === (e.face < 0))) p5Hurt(8); shk = Math.max(shk, 0.2); } if (e.aT <= 0) e.atk = ''; }
    else if (e.atk === 'summon') { if (e.aT <= 0) { var alive = 0; for (i = 0; i < p5.en.length; i++) if (p5.en[i].k === 'min' && !p5.en[i].dead) alive++; for (i = alive; i < 2; i++) { var sx = Math.max(AX - hw + 60, Math.min(AX + hw - 60, e.x + (i ? 160 : -160))); mkEn('min', sx, 5, { r: 48 }); ring(sx, gY - 40, 70, cc); } sfx('boom'); e.atk = ''; } }
    else if (e.atk === 'blink') { if (e.aT <= 0) { e.x = Math.max(AX - hw + 50, Math.min(AX + hw - 50, P.x + (Math.random() < 0.5 ? -1 : 1) * 130)); pfFlash(e.x, gY - 70, 120, '#e6d2ff', 0.3); pfSpark(e.x, gY - 70, 24, '#ffffff', 520, 0.5, 2.5); p5.glit = 0.2; e.atk = 'dash'; e.dx = P.x > e.x ? 1 : -1; e.aT = 0.55; } }
    else if (e.atk === 'ring') { if (e.aT <= 0) { var nr = ph >= 2 ? 14 : 10; for (i = 0; i < nr; i++) { an = i / nr * 6.283 + (e.slm ? 0.2 : 0); eShot(e.x, gY - 90, Math.cos(an) * 300, Math.sin(an) * 300, 10, cc, 11); } pfRing(e.x, gY - 90, 200, cc, 0.5); sfx('jump'); e.atk = ''; } }
    else if (e.atk === 'puddle') { if (e.aT <= 0) { var np = ph >= 2 ? 3 : 2; for (i = 0; i < np; i++) p5.uz.push({ x: Math.max(AX - hw + 80, Math.min(AX + hw - 80, P.x + (i - (np - 1) / 2) * 190)), w: 150, t: 5 }); sfx('pick'); e.atk = ''; } }
    else if (e.atk === 'tent') { if (e.aT <= 0) { var nt = ph === 3 ? 5 : (ph === 2 ? 4 : 3); for (i = 0; i < nt; i++) p5.tn.push({ x: Math.max(AX - hw + 50, Math.min(AX + hw - 50, P.x + (i - (nt - 1) / 2) * 135 + (Math.random() - 0.5) * 60)), t: -i * 0.12, w0: 0.85, r: 46, hz: 75, d: 14, kind: 0 }); sfx('pick'); e.atk = ''; } }
    else if (e.atk === 'beam') { if (e.aT <= 0) { var xs = [P.x, P.x - 230, P.x + 230]; for (i = 0; i < 3; i++) p5.tn.push({ x: Math.max(AX - hw + 50, Math.min(AX + hw - 50, xs[i] + (Math.random() - 0.5) * 50)), t: -i * 0.18, w0: 1.0, r: 58, hz: 9999, d: 16, kind: 1 }); sfx('rare'); e.atk = ''; } }
    else e.atk = '';
  }

function drawUniExtra() {
    var i, e, k, U, z, d;
    if (!p5.uni) return;
    for (i = 0; i < p5.uz.length; i++) { z = p5.uz[i]; ctx.fillStyle = 'rgba(80,255,120,' + (0.25 + 0.15 * Math.sin(t * 8 + i)).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(z.x, gY + 2, z.w / 2, 12, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(160,255,190,.5)'; ctx.beginPath(); ctx.arc(z.x + Math.sin(t * 3 + i) * 30, gY - 8 - (t * 30 + i * 9) % 40, 5, 0, 6.3); ctx.fill(); }
    for (i = 0; i < p5.dbr.length; i++) { d = p5.dbr[i]; ctx.strokeStyle = 'rgba(255,120,60,' + (0.4 + 0.5 * (1 - d.t / 0.7)).toFixed(2) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(d.x, gY + 2, 24, 7, 0, 0, 6.3); ctx.stroke(); }
    drawTnExtra(); e = uniBoss(); if (!e) return; k = e.v; U = UV[k];
    var im = uvImg(k), h = U.h, w = h * (im.naturalWidth || im.width) / (im.naturalHeight || im.height), jit = (e.fl > 0 || p5.glit > 0) ? (Math.random() - 0.5) * 10 : 0, al = e.dead ? Math.max(0, 1 - (e.dt = (e.dt || 0) + 0.02) * 1) : (e.vis == null ? 1 : e.vis);
    ctx.save(); ctx.translate(e.x + jit, gY - (e.y || 0)); if (e.face > 0) ctx.scale(-1, 1); ctx.globalAlpha = Math.max(0, al) * (e.fl > 0 ? 0.7 : 1); ctx.drawImage(im, -w / 2, -h, w, h);
    if (k === 5) {
      ctx.fillStyle = '#6a4a2a'; ctx.fillRect(w * 0.34, -h * 0.9, 6, h * 0.9); csGlow(w * 0.34 + 3, -h * 0.92, 40 + 6 * Math.sin(t * 6), '200,150,255', 0.5); ctx.fillStyle = '#e2c8ff'; ctx.beginPath(); ctx.arc(w * 0.34 + 3, -h * 0.92, 11, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#3a1f7a'; ctx.beginPath(); ctx.ellipse(0, -h * 0.9, 46, 11, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#4a2a9a'; ctx.beginPath(); ctx.moveTo(-30, -h * 0.9); ctx.lineTo(30, -h * 0.9); ctx.lineTo(10, -h * 0.9 - 70); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.fillRect(-30, -h * 0.9 - 8, 60, 6);
    }
    ctx.restore();
    if (e.dead) return;
    if (k === 0) { csGlow(e.x, gY - h * 0.5, 120, '80,255,120', 0.15); }
    if (p5.side) { var ax = P.x - 130; if (p5.side === 'prime') primeDraw(ax, 1, 150, 1); else mogAllyDraw(ax, 1, 150); }
    if (k === 6) { var pa = 0.25 + 0.1 * Math.sin(t * 5) + 0.12 * (e.ph || 1); csGlow(e.x, gY - h * 0.5, 190 + 20 * Math.sin(t * 3), '255,60,50', pa); ctx.save(); ctx.translate(e.x, gY - h - 26 - (e.y || 0)); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(-34, 10); ctx.lineTo(-34, -8); ctx.lineTo(-18, 2); ctx.lineTo(0, -16); ctx.lineTo(18, 2); ctx.lineTo(34, -8); ctx.lineTo(34, 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#c0182a'; ctx.beginPath(); ctx.arc(0, 2, 5, 0, 6.3); ctx.fill(); ctx.restore(); for (var oi = 0; oi < (e.ph || 1) + 2; oi++) { var oa = t * 1.6 + oi * 6.283 / ((e.ph || 1) + 2); ctx.fillStyle = 'rgba(255,90,70,.85)'; ctx.beginPath(); ctx.arc(e.x + Math.cos(oa) * 110, gY - h * 0.55 + Math.sin(oa) * 46, 7, 0, 6.3); ctx.fill(); } }
    if (k === 4 && e.vis < 0.7) { ctx.strokeStyle = 'rgba(160,200,255,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(e.x, gY - h / 2, 60, h / 2, 0, 0, 6.3); ctx.stroke(); }
    if (e.atk === 'dash' && e.aT > 0.5) { ctx.strokeStyle = 'rgba(255,60,60,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(e.x, gY - 40); ctx.lineTo(e.x + e.dx * 700, gY - 40); ctx.stroke(); }
    if (e.atk === 'laser') { var sx2 = e.face * 800, hot = e.aT <= 0.8; ctx.fillStyle = hot ? 'rgba(255,40,40,.8)' : 'rgba(255,40,40,' + (0.2 + 0.2 * Math.sin(t * 30)).toFixed(2) + ')'; ctx.fillRect(Math.min(e.x, e.x + sx2), gY - (hot ? 80 : 24), Math.abs(sx2), hot ? 80 : 24); }
    if (e.atk === 'blink' || e.atk === 'summon' || e.atk === 'ring') csGlow(e.x, gY - h * 0.5, 90 + 20 * Math.sin(t * 20), UV[k].col, 0.3);
  }

function csLabN(ct, mode) {
    var i, q;
    if (mode) { bgG('#1a0c0a', '#3a1a12'); ctx.fillStyle = '#3c2c28'; ctx.fillRect(0, 100, 960, 330); }
    else { csSky('#eaf3fb', '#c6d6e6'); ctx.fillStyle = '#e0eaf4'; ctx.fillRect(0, 90, 960, 340); ctx.fillStyle = '#c1d1e1'; ctx.fillRect(0, 320, 960, 110); ctx.fillStyle = '#adc0d4'; ctx.fillRect(0, 316, 960, 5); }
    for (i = 0; i < 3; i++) {
      var wx = 70 + i * 300;
      if (mode) { ctx.fillStyle = '#2a0f0a'; ctx.fillRect(wx, 130, 220, 140); ctx.fillStyle = 'rgba(255,120,40,' + (0.35 + 0.15 * Math.sin(ct * 3 + i)).toFixed(2) + ')'; ctx.fillRect(wx + 14, 200, 192, 70); ctx.strokeStyle = '#6a5a56'; }
      else { var sg = ctx.createLinearGradient(0, 130, 0, 270); sg.addColorStop(0, '#080f26'); sg.addColorStop(1, '#35508a'); ctx.fillStyle = sg; ctx.fillRect(wx, 130, 220, 140); for (q = 0; q < 6; q++) { var bh = 26 + ((q * 37 + i * 13) % 64); ctx.fillStyle = '#0a1226'; ctx.fillRect(wx + q * 36, 270 - bh, 32, bh); ctx.fillStyle = 'rgba(255,226,140,.6)'; ctx.fillRect(wx + q * 36 + 8, 270 - bh + 8, 6, 6); } ctx.strokeStyle = '#8fa3bf'; }
      ctx.lineWidth = 7; ctx.strokeRect(wx, 130, 220, 140);
      if (mode) { ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx + 60, 130); ctx.lineTo(wx + 100, 190); ctx.lineTo(wx + 84, 240); ctx.lineTo(wx + 140, 270); ctx.stroke(); }
    }
    for (i = 0; i < 4; i++) { ctx.fillStyle = mode ? 'rgba(255,170,90,.25)' : 'rgba(255,255,235,.7)'; ctx.fillRect(40 + i * 240, 96, 150, 6); }
    flr(mode ? '#2a1e1c' : '#9fb0c4');
    if (mode) { csFlamesCs(ct, 9, 120); ctx.fillStyle = 'rgba(160,30,0,.26)'; ctx.fillRect(0, 0, 960, 540); }
  }

function csPortalRing(x, y, r, ct, col, amt) {
    if (amt <= 0) return; var i, rr = r * Math.min(1, amt);
    csGlow(x, y, rr * 1.5, col, 0.4 * Math.min(1, amt));
    ctx.fillStyle = 'rgba(' + col + ',.22)'; ctx.beginPath(); ctx.ellipse(x, y, rr * 0.55, rr, 0, 0, 6.3); ctx.fill();
    ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(235,250,255,.95)'; ctx.beginPath(); ctx.ellipse(x, y, rr * 0.55, rr, 0, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(' + col + ',.9)';
    for (i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(x, y, rr * 0.55 * (0.2 + i * 0.16), rr * (0.2 + i * 0.16), ct * (i % 2 ? 1 : -1) * 0.8, 0, 3.5); ctx.stroke(); }
  }

function csCgBg(ct, dusk) {
    csSky(dusk ? '#5a3a6a' : '#7ab8ea', dusk ? '#e8a070' : '#e6f2fb');
    ctx.fillStyle = dusk ? '#4a5a4a' : '#8fb88f'; ctx.beginPath(); ctx.moveTo(0, 430); for (var i = 0; i <= 960; i += 80) ctx.lineTo(i, 340 - 30 * Math.sin(i * 0.011) - 16 * Math.sin(i * 0.031)); ctx.lineTo(960, 430); ctx.closePath(); ctx.fill();
    for (i = 0; i < 4; i++) { var tx = 120 + i * 230; ctx.fillStyle = ['#6a7d4a', '#7a6a4a', '#4a6a7a', '#6a7d4a'][i]; ctx.beginPath(); ctx.moveTo(tx - 70, 430); ctx.lineTo(tx, 340); ctx.lineTo(tx + 70, 430); ctx.closePath(); ctx.fill(); }
    flr(dusk ? '#4a3a30' : '#8a7a58');
  }

function c2Late() {
    if (cs.on) return;
    csPlay('c2late', function () { save.mx.c2l = 1; persist(); ach('c2late'); ltGo(1, 'left', 600); toast('Шестое окно открыто в портальной пушке (новая лаборатория). Глава 2, часть 2: город пострадал. В Парке и в Больнице кто-то зовёт на помощь, а священник в Лесу держится.', 9000); });
  }

function openLog() { logOpen = true; syncPause(); logOverlay.hidden = false; logOverlay.firstElementChild.scrollTop = 0; document.getElementById('closeLog').focus({ preventScroll: true }); }

function closeLog() { logOpen = false; syncPause(); logOverlay.hidden = true; document.getElementById('logOpen').focus(); }

function showAsk(on) {
    resetAsk.hidden = !on;
    resetBtn.hidden = on;
    if (on) document.getElementById('resetNo').focus();
  }
