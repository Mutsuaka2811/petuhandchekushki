/* defs · 207 declarations · function cityBlocks(x0, x1, endX) { var cols = ['#7f93b3', '#9aa6c0', '#6f86ab', '#a3a8b8', '#8d9bbd'], bx = -20, i = 0, */

function cityBlocks(x0, x1, endX) {
    var cols = ['#7f93b3', '#9aa6c0', '#6f86ab', '#a3a8b8', '#8d9bbd'], bx = -20, i = 0, nk = nightK();
    while (bx < x1 && bx < endX) {
      var rw = 100 + ((i * 53) % 90), bh = 260 + ((i * 97) % 220);
      if (bx + rw > endX + 20) rw = endX + 20 - bx;
      if (bx + rw > x0 && rw > 4 && !(bx + rw > BG_X - 200 && bx < BG_X + 200) && !(bx + rw > BANK_X - 230 && bx < BANK_X + 230)) {
        drawBuilding(bx, rw, bh, cols[i % 5], i, 26, 34, nk, i + 1);
        if (i % 4 === 1 && rw > 90) {
          var neon = ['#ff4fa3', '#33e0ff', '#ffd23f'][i % 3];
          ctx.fillStyle = '#14233f'; rrect(bx + 8, gY - 74, rw - 16, 26, 5); ctx.fill();
          ctx.shadowColor = neon; ctx.shadowBlur = 8 + 8 * nk;
          ctx.fillStyle = neon; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(['ЧЕКУШКИ 24', 'СТЕКЛО И Ко', 'ТАРА-БАР'][i % 3], bx + rw / 2, gY - 61); ctx.shadowBlur = 0;
        }
      }
      bx += rw; i++;
    }
  }

function parallaxSkyline(par, base, hmin, hspan, color, seed) {
    setCam(par);
    var x0 = camX * par - 20, x1 = x0 + vw + 40, i0 = Math.floor(x0 / 90) - 1, nk = nightK();
    for (var i = i0; i * 90 < x1; i++) {
      var h = hmin + (((i + seed) * 73) % 100 + 100) % 100 / 100 * hspan, bw = 70 + (((i + seed) * 37) % 40 + 40) % 40;
      var g = ctx.createLinearGradient(0, gY - base - h, 0, gY); g.addColorStop(0, shadeC(color, 0.06)); g.addColorStop(1, shadeC(color, 0.2));
      ctx.fillStyle = g; ctx.fillRect(i * 90, gY - base - h, bw, h + base);
      if (nk > 0.25 && par > 0.3) { ctx.fillStyle = 'rgba(255,214,130,' + (0.5 * nk).toFixed(2) + ')'; for (var r = 0; r < h / 26; r++) for (var c = 0; c < bw / 18; c++) if ((((i + seed) * 11 + r * 7 + c * 3) % 5) < 2) ctx.fillRect(i * 90 + 6 + c * 16, gY - base - h + 10 + r * 24, 6, 9); }
    }
  }

function wGlass(x, y, w, h, lit) {
    var g = ctx.createLinearGradient(x, y, x + w, y + h);
    if (lit) { g.addColorStop(0, '#ffe9a8'); g.addColorStop(1, '#ffc96a'); } else { g.addColorStop(0, '#9ccdf0'); g.addColorStop(0.55, '#6aa6d6'); g.addColorStop(1, '#4f86b8'); }
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    if (!lit) { ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w * 0.45, y); ctx.lineTo(x + w * 0.7, y); ctx.lineTo(x + w * 0.25, y + h); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = 'rgba(40,60,90,.55)'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
  }

function drawHospital(x) {
    var w = 600, h = 270, i, r, c, nk = nightK(), X0 = x - w / 2;
    // тень и фундамент
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(X0 - 12, gY, w + 24, 7);
    // боковые корпуса
    var wing = ctx.createLinearGradient(0, gY - 190, 0, gY); wing.addColorStop(0, '#e9eef5'); wing.addColorStop(1, '#cdd8e6');
    ctx.fillStyle = wing; ctx.fillRect(X0 - 110, gY - 170, 120, 170); ctx.fillRect(X0 + w - 10, gY - 170, 120, 170);
    ctx.fillStyle = '#9fb3c9'; ctx.fillRect(X0 - 116, gY - 178, 132, 10); ctx.fillRect(X0 + w - 16, gY - 178, 132, 10);
    for (c = 0; c < 3; c++) for (r = 0; r < 2; r++) { wGlass(X0 - 98 + c * 36, gY - 150 + r * 62, 28, 44, (r + c) % 3 === 0 && nk > 0.3); wGlass(X0 + w + 2 + c * 36, gY - 150 + r * 62, 28, 44, (r + c) % 3 === 1 && nk > 0.3); }
    // главный корпус
    var g = ctx.createLinearGradient(X0, 0, X0 + w, 0); g.addColorStop(0, '#f6f9fc'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, '#dfe7f1');
    ctx.fillStyle = g; ctx.fillRect(X0, gY - h, w, h + 2);
    ctx.fillStyle = '#1e8f7e'; ctx.fillRect(X0, gY - h, w, 12); ctx.fillStyle = '#146d60'; ctx.fillRect(X0, gY - h + 12, w, 3);
    ctx.fillStyle = '#c5d2e2'; ctx.fillRect(X0 - 10, gY - h - 12, w + 20, 14);
    // техэтаж, вертолётная площадка
    ctx.fillStyle = '#d3dce8'; ctx.fillRect(x - 120, gY - h - 26, 240, 16);
    ctx.fillStyle = '#3c4a5c'; ctx.fillRect(x + 150, gY - h - 12, 160, 6);
    ctx.fillStyle = '#566579'; ctx.fillRect(x + 160, gY - h - 8, 6, 8); ctx.fillRect(x + 294, gY - h - 8, 6, 8);
    ctx.fillStyle = '#e4eaf2'; ctx.fillRect(x + 148, gY - h - 18, 164, 8);
    ctx.fillStyle = '#ffd23f'; ctx.font = '900 12px "Russo One", Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('H', x + 230, gY - h - 14);
    ctx.fillStyle = Math.floor(t * 2) % 2 ? '#ff4b4b' : '#7a2a2a'; ctx.beginPath(); ctx.arc(x + 150, gY - h - 20, 3, 0, 6.3); ctx.arc(x + 312, gY - h - 20, 3, 0, 6.3); ctx.fill();
    // окна по этажам
    for (r = 0; r < 3; r++) for (c = 0; c < 10; c++) {
      var wx = X0 + 20 + c * 57, wy = gY - h + 30 + r * 62;
      if (Math.abs(wx + 20 - x) < 62 && r === 2) continue;
      if (Math.abs(wx + 20 - (x + 168)) < 32 && r === 1) continue;
      wGlass(wx, wy, 40, 44, ((r * 5 + c * 3) % 7 === 0) || (nk > 0.45 && (r + c) % 3 !== 0));
      ctx.fillStyle = '#b6c5d8'; ctx.fillRect(wx - 3, wy + 44, 46, 5);
    }
    ctx.fillStyle = 'rgba(0,0,0,.07)'; ctx.fillRect(X0 + w - 8, gY - h, 8, h);
    // вывеска
    var sg = ctx.createLinearGradient(0, gY - h - 66, 0, gY - h - 12); sg.addColorStop(0, '#ffffff'); sg.addColorStop(1, '#e8eef5');
    ctx.fillStyle = sg; rrect(x - 110, gY - h - 70, 220, 52, 10); ctx.fill(); ctx.strokeStyle = '#d33a3a'; ctx.lineWidth = 3; ctx.stroke();
    ctx.save(); if (nk > 0.2) { ctx.shadowColor = '#ff3a3a'; ctx.shadowBlur = 10 * nk; }
    ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 96, gY - h - 50, 26, 9); ctx.fillRect(x - 87.5, gY - h - 58, 9, 26);
    ctx.font = '700 26px "Russo One", "Arial Black", Impact, sans-serif'; ctx.fillText('БОЛЬНИЦА', x + 16, gY - h - 44); ctx.restore();
    // вход: козырёк, раздвижные двери, колонны
    ctx.fillStyle = '#1e8f7e'; ctx.beginPath(); ctx.moveTo(x - 92, gY - 108); ctx.lineTo(x + 92, gY - 108); ctx.lineTo(x + 78, gY - 94); ctx.lineTo(x - 78, gY - 94); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - 92, gY - 108, 184, 3);
    ctx.fillStyle = '#b7c5d6'; ctx.fillRect(x - 78, gY - 94, 7, 94); ctx.fillRect(x + 71, gY - 94, 7, 94);
    var dg = ctx.createLinearGradient(0, gY - 94, 0, gY); dg.addColorStop(0, '#d9f0fa'); dg.addColorStop(1, '#9fcbe0'); ctx.fillStyle = dg; ctx.fillRect(x - 64, gY - 94, 128, 94);
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.moveTo(x - 64, gY); ctx.lineTo(x - 20, gY - 94); ctx.lineTo(x, gY - 94); ctx.lineTo(x - 44, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5b7388'; ctx.fillRect(x - 1.5, gY - 94, 3, 94); ctx.fillRect(x - 64, gY - 94, 3, 94); ctx.fillRect(x + 61, gY - 94, 3, 94);
    ctx.fillStyle = '#d33a3a'; ctx.fillRect(x - 12, gY - 82, 24, 7); ctx.fillRect(x - 3.5, gY - 90, 7, 22);
    ctx.fillStyle = '#e6edf5'; ctx.fillRect(x - 96, gY - 8, 192, 8); ctx.fillRect(x - 84, gY - 15, 168, 7);
    // клумбы
    var fl = ['#ff6b8b', '#ffd23f', '#ff9a3c', '#c78bff'];
    for (i = 0; i < 2; i++) { var bx = i ? x + 140 : x - 200; ctx.fillStyle = '#7a5a3a'; ctx.fillRect(bx - 34, gY - 12, 68, 12); ctx.fillStyle = '#4fae5a'; ctx.fillRect(bx - 32, gY - 18, 64, 8); for (c = 0; c < 6; c++) { ctx.fillStyle = fl[(c + i) % 4]; ctx.beginPath(); ctx.arc(bx - 26 + c * 10.5, gY - 20 - (c % 2) * 3, 4, 0, 6.3); ctx.fill(); } }
    // окно палаты Меллстроя
    var px = x + 168, py = gY - h + 30 + 62;
    ctx.fillStyle = '#fff2c9'; ctx.fillRect(px - 54, py - 6, 108, 60); ctx.fillStyle = '#e6b422'; ctx.fillRect(px - 58, py - 10, 116, 6); ctx.fillRect(px - 58, py + 52, 116, 5);
    ctx.fillStyle = '#e9eef5'; ctx.fillRect(px - 46, py + 28, 92, 16); ctx.fillStyle = '#c3cfdc'; ctx.fillRect(px - 46, py + 42, 92, 4);
    if (ready(img.mell)) { ctx.save(); ctx.translate(px, py + 20); ctx.drawImage(img.mell, 0, 0, 224, 99, -40, -20, 80, 36); ctx.fillStyle = '#fff'; ctx.fillRect(-14, -14, 26, 7); ctx.restore(); }
    ctx.fillStyle = '#7a8aa0'; ctx.font = '700 11px "Rubik", system-ui, sans-serif'; ctx.fillText('Z z z', px + 24 + Math.sin(t * 2) * 3, py - 18 - (t * 8) % 10);
    ctx.fillStyle = '#4c6a86'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.fillText('палата Меллстроя', px, py + 66);
  }

function drawWhiteHouse(x) {
    var i, wall = '#f6f3ea', sh = '#cfc8b4', nk = nightK(), g;
    // тени и подиум
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(x - 346, gY, 692, 6);
    // крылья с балюстрадой
    function wing(wx) {
      var gg = ctx.createLinearGradient(0, gY - 130, 0, gY); gg.addColorStop(0, '#fbf9f2'); gg.addColorStop(1, '#e2dccb');
      ctx.fillStyle = gg; ctx.fillRect(wx, gY - 124, 200, 124);
      ctx.fillStyle = sh; ctx.fillRect(wx - 6, gY - 134, 212, 12); ctx.fillStyle = '#fff'; ctx.fillRect(wx - 6, gY - 136, 212, 3);
      for (var b = 0; b < 17; b++) { ctx.fillStyle = '#efe9d8'; ctx.fillRect(wx - 2 + b * 12.4, gY - 150, 5, 14); }
      ctx.fillStyle = sh; ctx.fillRect(wx - 6, gY - 152, 212, 4);
      for (var k = 0; k < 4; k++) { var wx2 = wx + 14 + k * 46; ctx.fillStyle = '#c7bfa8'; ctx.fillRect(wx2 - 3, gY - 98, 30, 5); wGlass(wx2, gY - 96, 24, 44, nk > 0.4 && k % 2 === 0); ctx.fillStyle = '#b9b095'; ctx.fillRect(wx2 - 3, gY - 52, 30, 4); }
    }
    wing(x - 330); wing(x + 130);
    // главный корпус
    g = ctx.createLinearGradient(x - 140, 0, x + 140, 0); g.addColorStop(0, '#fbf9f2'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, '#e1dbc9');
    ctx.fillStyle = g; ctx.fillRect(x - 142, gY - 196, 284, 196);
    ctx.fillStyle = 'rgba(160,150,120,.18)'; for (i = 0; i < 9; i++) ctx.fillRect(x - 142, gY - 190 + i * 21, 284, 1);
    ctx.fillStyle = sh; ctx.fillRect(x - 150, gY - 208, 300, 14); ctx.fillStyle = '#fff'; ctx.fillRect(x - 150, gY - 210, 300, 3);
    // окна второго этажа и первого
    for (i = 0; i < 2; i++) { var wx3 = x - 126 + i * 196; ctx.fillStyle = '#c7bfa8'; ctx.beginPath(); ctx.moveTo(wx3 - 4, gY - 148); ctx.lineTo(wx3 + 22, gY - 160); ctx.lineTo(wx3 + 48, gY - 148); ctx.fill(); wGlass(wx3, gY - 148, 44, 54, nk > 0.35); }
    // портик с фронтоном
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x - 124, gY - 196); ctx.lineTo(x, gY - 258); ctx.lineTo(x + 124, gY - 196); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = sh; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = '#e8e2cf'; ctx.beginPath(); ctx.moveTo(x - 90, gY - 202); ctx.lineTo(x, gY - 244); ctx.lineTo(x + 90, gY - 202); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1f4aa8'; ctx.beginPath(); ctx.arc(x, gY - 218, 11, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 12px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('★', x, gY - 218);
    // колонны с капителями и тенью
    for (i = 0; i < 6; i++) {
      var cx = x - 105 + i * 42, cg = ctx.createLinearGradient(cx - 8, 0, cx + 8, 0); cg.addColorStop(0, '#fffefb'); cg.addColorStop(0.6, '#f0ebdc'); cg.addColorStop(1, '#cfc8b4');
      ctx.fillStyle = cg; ctx.fillRect(cx - 8, gY - 192, 16, 192);
      ctx.fillStyle = '#fff'; ctx.fillRect(cx - 12, gY - 196, 24, 8); ctx.fillStyle = sh; ctx.fillRect(cx - 12, gY - 189, 24, 2); ctx.fillStyle = '#fff'; ctx.fillRect(cx - 11, gY - 8, 22, 8);
    }
    // флагшток
    ctx.fillStyle = '#6b6f78'; ctx.fillRect(x - 1.5, gY - 330, 3, 74);
    for (i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#c2353f'; ctx.fillRect(x + 1.5, gY - 328 + i * 4.5, 38 + Math.sin(t * 4 + i * 0.7) * 3, 4.5); }
    ctx.fillStyle = '#2b4a96'; ctx.fillRect(x + 1.5, gY - 328, 16, 14);
    // дверь + красная дорожка
    ctx.fillStyle = '#2a1d12'; ctx.fillRect(x - 28, gY - 88, 56, 88); ctx.fillStyle = '#d6b24a'; ctx.fillRect(x - 31, gY - 94, 62, 7); ctx.fillRect(x - 28, gY - 88, 3, 88); ctx.fillRect(x + 25, gY - 88, 3, 88);
    ctx.fillStyle = 'rgba(255,214,120,' + (0.15 + 0.35 * nk) + ')'; ctx.fillRect(x - 24, gY - 84, 48, 84); ctx.fillStyle = '#d6b24a'; ctx.beginPath(); ctx.arc(x + 14, gY - 40, 3, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#d8d2bd'; ctx.fillRect(x - 88, gY - 6, 176, 6); ctx.fillRect(x - 76, gY - 12, 152, 6); ctx.fillRect(x - 64, gY - 18, 128, 6);
    ctx.fillStyle = '#a82430'; ctx.fillRect(x - 24, gY - 18, 48, 18);
    // табличка
    ctx.fillStyle = '#1f4aa8'; rrect(x - 66, gY - 178, 132, 24, 6); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.fillRect(x - 66, gY - 156, 132, 2);
    ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(save.mx.mh ? 'Кабинет закрыт' : 'Кабинет Меллстроя', x, gY - 165);
    // фонари у входа
    for (i = 0; i < 2; i++) { var lx = x + (i ? 100 : -100); ctx.fillStyle = '#2f3542'; ctx.fillRect(lx - 2, gY - 62, 4, 62); ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(lx, gY - 66, 6, 0, 6.3); ctx.fill(); if (nk > 0.2) { var lg = ctx.createRadialGradient(lx, gY - 66, 2, lx, gY - 66, 70); lg.addColorStop(0, 'rgba(255,240,170,' + (0.5 * nk) + ')'); lg.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = lg; ctx.fillRect(lx - 70, gY - 136, 140, 140); } }
  }

function drawHospInBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#eef4fa'); g.addColorStop(1, '#d3deea'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[13].w, a = Math.max(0, x0), b = Math.min(w, x1), i, k, nk = nightK();
    // стена
    var wg = ctx.createLinearGradient(0, gY - 340, 0, gY); wg.addColorStop(0, '#e6eff7'); wg.addColorStop(1, '#d4e2ee'); ctx.fillStyle = wg; ctx.fillRect(a, gY - 340, b - a, 340);
    // панорамные окна наружу (с городом и временем суток)
    var HWIN = [645, 1055, 1480, 1921, 2551]; // окна только в промежутках между дверями, регистратурой и палатой 1
    for (var wi = 0; wi < HWIN.length; wi++) {
      i = HWIN[wi] - 260; var wx = i + 150; if (wx > b + 200 || wx + 220 < a - 40) continue;
      var sk = ctx.createLinearGradient(0, gY - 300, 0, gY - 150); sk.addColorStop(0, nk > 0.5 ? '#14213d' : '#8fc6ee'); sk.addColorStop(1, nk > 0.5 ? '#2b3b66' : '#d8eefc');
      ctx.fillStyle = sk; ctx.fillRect(wx, gY - 300, 220, 150);
      ctx.fillStyle = nk > 0.5 ? '#1e2c52' : '#a9bfd9'; for (k = 0; k < 7; k++) { var bh = 40 + ((k * 37 + i) % 50); ctx.fillRect(wx + 6 + k * 31, gY - 150 - bh, 24, bh); if (nk > 0.5) { ctx.fillStyle = '#ffd98a'; ctx.fillRect(wx + 12 + k * 31, gY - 150 - bh + 8, 4, 5); ctx.fillStyle = '#1e2c52'; } }
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.moveTo(wx, gY - 150); ctx.lineTo(wx + 90, gY - 300); ctx.lineTo(wx + 130, gY - 300); ctx.lineTo(wx + 40, gY - 150); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#9fb3c9'; ctx.lineWidth = 5; ctx.strokeRect(wx, gY - 300, 220, 150); ctx.beginPath(); ctx.moveTo(wx + 110, gY - 300); ctx.lineTo(wx + 110, gY - 150); ctx.stroke();
    }
    // зелёная панель, поручень, плинтус
    ctx.fillStyle = '#86c9bb'; ctx.fillRect(a, gY - 110, b - a, 110); ctx.fillStyle = '#6fb5a6'; ctx.fillRect(a, gY - 112, b - a, 4);
    ctx.fillStyle = '#c9d6e3'; ctx.fillRect(a, gY - 70, b - a, 6); ctx.fillStyle = '#e8eff6'; ctx.fillRect(a, gY - 71, b - a, 2);
    // потолок: лампы со свечением
    ctx.fillStyle = '#f3f7fb'; ctx.fillRect(a, gY - 360, b - a, 30);
    for (i = Math.floor(a / 170) * 170; i < b; i += 170) {
      var fl = (Math.floor(i / 170) % 11 === 5) ? 0.7 + 0.3 * Math.sin(t * 30) : 1;
      ctx.fillStyle = 'rgba(255,255,235,' + (0.95 * fl) + ')'; ctx.fillRect(i + 36, gY - 346, 96, 8);
      var lgl = ctx.createLinearGradient(0, gY - 340, 0, gY - 230); lgl.addColorStop(0, 'rgba(255,255,225,' + (0.28 * fl) + ')'); lgl.addColorStop(1, 'rgba(255,255,225,0)'); ctx.fillStyle = lgl;
      ctx.beginPath(); ctx.moveTo(i + 36, gY - 338); ctx.lineTo(i + 132, gY - 338); ctx.lineTo(i + 190, gY - 220); ctx.lineTo(i - 22, gY - 220); ctx.closePath(); ctx.fill();
    }
    // плакаты и растения между дверями
    var HPOS = [255]; for (i = 0; i < HPOS.length; i++) { var px0 = HPOS[i]; if (px0 < a - 60 || px0 > b + 60) continue; ctx.fillStyle = '#fff'; ctx.fillRect(px0 - 22, gY - 230, 44, 58); ctx.fillStyle = ['#d33a3a', '#2f8f7b', '#4b7bd3'][i % 3]; ctx.fillRect(px0 - 17, gY - 225, 34, 10); ctx.fillStyle = '#9fb3c9'; for (k = 0; k < 4; k++) ctx.fillRect(px0 - 17, gY - 208 + k * 9, 34, 3); }
    var HPLN = [195, 1198, 1358, 1760, 2082]; for (i = 0; i < HPLN.length; i++) { var pl = HPLN[i]; if (pl < a - 40 || pl > b + 40) continue; ctx.fillStyle = '#b5683a'; ctx.fillRect(pl - 12, gY - 30, 24, 30); ctx.fillStyle = '#3f9a55'; for (k = -2; k <= 2; k++) { ctx.beginPath(); ctx.ellipse(pl + k * 8, gY - 46 - Math.abs(k) * -3, 6, 22, k * 0.3, 0, 6.3); ctx.fill(); } }
    // скамейки и каталка
    var HBN = [630, 1055, 1480, 1921]; for (i = 0; i < HBN.length; i++) { var bx = HBN[i]; if (bx < a - 70 || bx > b + 70) continue; ctx.fillStyle = '#6c8196'; ctx.fillRect(bx - 50, gY - 30, 100, 8); ctx.fillRect(bx - 50, gY - 54, 100, 6); ctx.fillStyle = '#4a5c70'; ctx.fillRect(bx - 44, gY - 22, 6, 22); ctx.fillRect(bx + 38, gY - 22, 6, 22); }
    // пол: плитка с бликом
    var fg = ctx.createLinearGradient(0, gY - 2, 0, gY + 80); fg.addColorStop(0, '#e4ecf3'); fg.addColorStop(0.08, '#bfcddb'); fg.addColorStop(1, '#a4b5c7'); ctx.fillStyle = fg; ctx.fillRect(a, gY - 2, b - a, H / scale);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; for (i = Math.floor(a / 90) * 90; i < b; i += 90) ctx.fillRect(i, gY - 2, 2, 120);
    ctx.fillStyle = '#2f8f7b'; ctx.fillRect(a, gY + 14, b - a, 4);
    ctx.fillStyle = 'rgba(255,255,235,.22)'; for (i = Math.floor(a / 170) * 170; i < b; i += 170) ctx.fillRect(i + 40, gY + 2, 88, 6);
    function door(x, label, gold, big) {
      if (x < x0 - 120 || x > x1 + 120) return;
      var dw = big ? 120 : 84, dh = big ? 215 : 185;
      if (gold) { var gl = ctx.createRadialGradient(x, gY - 100, 10, x, gY - 100, 240); gl.addColorStop(0, 'rgba(255,215,90,.6)'); gl.addColorStop(1, 'rgba(255,215,90,0)'); ctx.fillStyle = gl; ctx.fillRect(x - 250, gY - 350, 500, 370); }
      var fr = gold ? '#d9a21a' : '#6f879d'; ctx.fillStyle = fr; ctx.fillRect(x - dw / 2 - 9, gY - dh - 9, dw + 18, dh + 9);
      var dg = ctx.createLinearGradient(x - dw / 2, 0, x + dw / 2, 0); if (gold) { dg.addColorStop(0, '#ffe27a'); dg.addColorStop(0.5, '#ffd23f'); dg.addColorStop(1, '#e8b52a'); } else { dg.addColorStop(0, '#b7cade'); dg.addColorStop(1, '#93aac0'); }
      ctx.fillStyle = dg; ctx.fillRect(x - dw / 2, gY - dh, dw, dh);
      ctx.fillStyle = gold ? 'rgba(255,255,255,.55)' : 'rgba(210,235,250,.85)'; ctx.fillRect(x - dw / 2 + 12, gY - dh + 14, dw - 24, 62); ctx.strokeStyle = fr; ctx.lineWidth = 3; ctx.strokeRect(x - dw / 2 + 12, gY - dh + 14, dw - 24, 62);
      ctx.fillStyle = fr; ctx.fillRect(x + dw / 2 - 18, gY - dh / 2, 6, 22);
      ctx.fillStyle = '#fff'; rrect(x - 48, gY - dh - 46, 96, 30, 8); ctx.fill(); ctx.strokeStyle = fr; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = gold ? '#a07800' : '#35546f'; ctx.font = '700 15px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x, gY - dh - 31);
    }
    door(HIN_DOOR.exit, 'ВЫХОД', false, false);
    door(HIN_DOOR.doc, 'ВРАЧ', false, false); door(HIN_DOOR.r3, 'ПАЛАТА 3', false, false); door(HIN_DOOR.r2, 'ПАЛАТА 2', false, false); door(HIN_DOOR.r1, 'ПАЛАТА 1', true, true); drawDocRuin(x0, x1);
    var rx = HIN_DOOR.reg;
    if (rx > x0 - 140 && rx < x1 + 140) {
      sciDraw(rx - 30, 1, 1, 0, 2); ctx.fillStyle = '#6f879d'; ctx.fillRect(rx - 76, gY - 58, 152, 58); ctx.fillStyle = '#a9bfd2'; ctx.fillRect(rx - 82, gY - 66, 164, 10);
      ctx.fillStyle = '#d33a3a'; ctx.fillRect(rx - 6, gY - 44, 12, 4); ctx.fillRect(rx - 2, gY - 48, 4, 12);
      ctx.fillStyle = '#2b3a4a'; ctx.fillRect(rx + 30, gY - 96, 36, 28); ctx.fillStyle = '#8fe0ff'; ctx.fillRect(rx + 33, gY - 93, 30, 20);
      ctx.fillStyle = '#fff'; rrect(rx - 52, gY - 120, 104, 26, 8); ctx.fill(); ctx.fillStyle = '#35546f'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('РЕГИСТРАТУРА', rx, gY - 107);
    }
    for (k = 0; k < 2; k++) { var dx = 1000 + k * 800 + Math.sin(t * 0.45 + k * 2.3) * 220, fc = Math.cos(t * 0.45 + k * 2.3) >= 0 ? 1 : -1; if (dx > x0 - 80 && dx < x1 + 80) sciDraw(dx, fc, 0.95, t * 1.2 + k, 1); }
    var px = HIN_DOOR.r1 + 150;
    if (px > x0 - 160 && px < x1 + 160) {
      ctx.fillStyle = '#fff2c9'; ctx.fillRect(px - 72, gY - 152, 144, 152); ctx.fillStyle = '#e6b422'; ctx.fillRect(px - 72, gY - 158, 144, 8);
      ctx.fillStyle = '#cfe6f2'; ctx.fillRect(px + 20, gY - 130, 40, 44); ctx.strokeStyle = '#e6b422'; ctx.lineWidth = 3; ctx.strokeRect(px + 20, gY - 130, 40, 44);
      ctx.fillStyle = '#e9eef5'; ctx.fillRect(px - 62, gY - 46, 124, 20); ctx.fillStyle = '#c3cfdc'; ctx.fillRect(px - 62, gY - 28, 124, 28);
      ctx.fillStyle = '#2b3a4a'; ctx.fillRect(px - 64, gY - 100, 24, 18); ctx.fillStyle = '#6dff9a'; ctx.fillRect(px - 62, gY - 98, 20, 6);
      if (save.mx.mh && ready(img.mell)) { ctx.save(); ctx.translate(px - 10, gY - 56); ctx.drawImage(img.mell, 0, 0, 224, 99, -40, -36, 90, 40); ctx.fillStyle = '#fff'; ctx.fillRect(-14, -30, 26, 7); ctx.restore(); }
      if (save.mx.sf === 2) sciDraw(px + 42, -1, 0.8, 0, 0);
      ctx.fillStyle = '#7a8aa0'; ctx.font = '700 10px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Z z z', px - 20 + Math.sin(t * 2) * 3, gY - 100 - (t * 8) % 10);
    }
  }

function drawCargoCraft(x, y, dir, sc, grounded) {
    setCam(1); ctx.save(); ctx.translate(x, y); ctx.scale(dir * sc, sc); var i, g;
    var ol = '#6f7f55', old = '#4f5d3a', oll = '#93a577', st = '#3e4a35';
    // дальняя часть крыла и двигатели (тёмные)
    ctx.fillStyle = '#3b4630'; ctx.beginPath(); ctx.moveTo(-34, -27); ctx.lineTo(54, -27); ctx.lineTo(44, -34); ctx.lineTo(-26, -34); ctx.closePath(); ctx.fill();
    for (i = 0; i < 2; i++) { ctx.fillStyle = '#343d2a'; ctx.beginPath(); ctx.ellipse(-12 + i * 44, -30, 11, 4, 0, 0, 6.3); ctx.fill(); }
    // киль и стабилизатор (Т-образный хвост)
    g = ctx.createLinearGradient(-110, 0, -60, 0); g.addColorStop(0, old); g.addColorStop(1, ol);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-58, -18); ctx.lineTo(-104, -70); ctx.lineTo(-86, -72); ctx.lineTo(-40, -19); ctx.closePath(); ctx.fill();
    ctx.fillStyle = oll; ctx.beginPath(); ctx.moveTo(-104, -70); ctx.lineTo(-86, -72); ctx.lineTo(-88, -66); ctx.lineTo(-101, -64); ctx.closePath(); ctx.fill();
    ctx.fillStyle = st; ctx.beginPath(); ctx.moveTo(-122, -76); ctx.lineTo(-74, -75); ctx.lineTo(-72, -71); ctx.lineTo(-120, -72); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f0e6c8'; ctx.fillRect(-98, -62, 8, 3);
    // фюзеляж
    g = ctx.createLinearGradient(0, -22, 0, 24); g.addColorStop(0, oll); g.addColorStop(0.45, ol); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(-70, -21); ctx.lineTo(60, -22); ctx.quadraticCurveTo(94, -20, 100, -2); ctx.quadraticCurveTo(96, 17, 66, 22); ctx.lineTo(-24, 22);
    ctx.lineTo(-96, 6); ctx.lineTo(-100, -8); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.4; ctx.stroke();
    // обтекатели шасси (спонсоны)
    g = ctx.createLinearGradient(0, 8, 0, 28); g.addColorStop(0, ol); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(10, 20, 46, 9, 0, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.stroke();
    // рампа
    if (drRamp > 0.02) {
      ctx.fillStyle = '#1a2018'; ctx.beginPath(); ctx.moveTo(-26, 22); ctx.lineTo(-96, 6); ctx.lineTo(-100, -8); ctx.lineTo(-70, -12); ctx.lineTo(-30, 14); ctx.closePath(); ctx.fill();
      var rex = -96 - 38 * drRamp, rey = 6 + 36 * drRamp;
      ctx.fillStyle = oll; ctx.beginPath(); ctx.moveTo(-26, 22); ctx.lineTo(rex, rey); ctx.lineTo(rex + 4, rey - 7); ctx.lineTo(-30, 14); ctx.closePath(); ctx.fill(); ctx.strokeStyle = old; ctx.lineWidth = 1.4; ctx.stroke();
    } else { ctx.fillStyle = oll; ctx.beginPath(); ctx.moveTo(-26, 22); ctx.lineTo(-96, 6); ctx.lineTo(-90, 0); ctx.lineTo(-30, 14); ctx.closePath(); ctx.fill(); ctx.strokeStyle = old; ctx.lineWidth = 1.4; ctx.stroke(); }
    // панели и грузовая дверь
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath();
    for (i = -50; i <= 50; i += 20) { ctx.moveTo(i, -21); ctx.lineTo(i, 20); }
    ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.42)'; ctx.lineWidth = 1.4; ctx.strokeRect(-24, -12, 62, 30);
    // стрелка-полоса и надпись, звезда
    ctx.fillStyle = '#efe4c3'; ctx.fillRect(-64, -16, 118, 2.4);
    ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ГРУЗ', 8, 3);
    ctx.fillStyle = '#efe4c3'; ctx.beginPath(); ctx.arc(-50, 2, 6, 0, 6.3); ctx.fill(); ctx.fillStyle = ol; ctx.beginPath(); ctx.arc(-50, 2, 3, 0, 6.3); ctx.fill();
    // носовой обтекатель и кабина
    ctx.fillStyle = '#2a3228'; ctx.beginPath(); ctx.moveTo(86, -17); ctx.quadraticCurveTo(100, -14, 100, -2); ctx.lineTo(90, -2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#16293d'; ctx.beginPath(); ctx.moveTo(60, -19); ctx.lineTo(82, -16); ctx.lineTo(88, -6); ctx.lineTo(62, -6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(160,215,245,.6)'; for (i = 0; i < 3; i++) ctx.fillRect(64 + i * 7, -15 + i * 1.3, 5, 7);
    // высокое крыло, ближнее: плоскость с передней кромкой
    g = ctx.createLinearGradient(0, -34, 0, -20); g.addColorStop(0, oll); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-40, -21); ctx.lineTo(56, -21); ctx.lineTo(48, -31); ctx.lineTo(-30, -31); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
    // 4 турбовинтовых двигателя
    var ph = t * 60;
    for (i = 0; i < 4; i++) {
      var ex = -26 + i * 24 + (i > 1 ? 4 : 0), ey = -26 + (i % 2) * 4, far = i % 2 === 1;
      ctx.fillStyle = far ? old : '#566643'; ctx.beginPath(); ctx.moveTo(ex - 12, ey - 5); ctx.lineTo(ex + 12, ey - 4); ctx.quadraticCurveTo(ex + 18, ey, ex + 12, ey + 5); ctx.lineTo(ex - 12, ey + 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#20261c'; ctx.fillRect(ex + 12, ey - 2.5, 3, 5);
      var engOn = (drEng >> i) & 1, pr = engOn ? 11 + Math.abs(Math.sin(ph + i * 1.7)) * 5 : 15;
      if (engOn) { ctx.fillStyle = 'rgba(205,212,222,.18)'; ctx.beginPath(); ctx.ellipse(ex + 17, ey, 3.5, 17, 0, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = engOn ? 'rgba(30,34,40,.75)' : '#20241c'; ctx.beginPath(); ctx.ellipse(ex + 17, ey, engOn ? 1.8 : 1.3, pr, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.arc(ex + 17, ey, 2, 0, 6.3); ctx.fill();
    }
    // блик, огни
    g = ctx.createLinearGradient(0, -22, 0, 22); g.addColorStop(0, 'rgba(255,255,255,.22)'); g.addColorStop(0.4, 'rgba(255,255,255,0)'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-70, -21); ctx.lineTo(60, -22); ctx.quadraticCurveTo(94, -20, 100, -2); ctx.lineTo(-100, -2); ctx.closePath(); ctx.fill();
    if (Math.sin(t * 6) > 0.1) { ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.arc(-120, -74, 2.6, 0, 6.3); ctx.arc(2, 22, 2.4, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#2fe36f'; ctx.beginPath(); ctx.arc(52, -27, 2, 0, 6.3); ctx.fill();
    var cgk = drGear >= 0 ? drGear : (grounded ? 1 : 0);
    if (cgk > 0.03) { ctx.save(); ctx.translate(0, 14); ctx.scale(1, cgk); ctx.translate(0, -14); ctx.fillStyle = '#14171c'; for (i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-26 + i * 38, 28, 5.2, 0, 6.3); ctx.fill(); } ctx.fillStyle = '#9aa4b4'; for (i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-26 + i * 38, 28, 2, 0, 6.3); ctx.fill(); } ctx.restore(); }
    ctx.restore();
  }

function drawPlane() {
    var pl = air.plane; if (!pl) return;
    setCam(1);
    var x = pl.x, y = pl.y, i, g;
    // инверсионный след: мягкий, расширяющийся
    g = ctx.createLinearGradient(x - pl.dir * 100, 0, x - pl.dir * 520, 0); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; var tx0 = Math.min(x - pl.dir * 100, x - pl.dir * 520);
    ctx.beginPath(); ctx.moveTo(tx0, y - 24); ctx.lineTo(tx0 + 420, y - 18); ctx.lineTo(tx0 + 420, y - 9); ctx.lineTo(tx0, y - 12); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(tx0, y - 4); ctx.lineTo(tx0 + 420, y - 8); ctx.lineTo(tx0 + 420, y + 2); ctx.lineTo(tx0, y + 2); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(x, y); ctx.scale(pl.dir * 1.18, 1.18);
    var ol = '#6f7f55', old = '#4f5d3a', oll = '#93a577', st = '#3e4a35';
    // дальняя часть крыла и двигатели (тёмные)
    ctx.fillStyle = '#3b4630'; ctx.beginPath(); ctx.moveTo(-34, -27); ctx.lineTo(54, -27); ctx.lineTo(44, -34); ctx.lineTo(-26, -34); ctx.closePath(); ctx.fill();
    for (i = 0; i < 2; i++) { ctx.fillStyle = '#343d2a'; ctx.beginPath(); ctx.ellipse(-12 + i * 44, -30, 11, 4, 0, 0, 6.3); ctx.fill(); }
    // киль и стабилизатор (Т-образный хвост)
    g = ctx.createLinearGradient(-110, 0, -60, 0); g.addColorStop(0, old); g.addColorStop(1, ol);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-58, -18); ctx.lineTo(-104, -70); ctx.lineTo(-86, -72); ctx.lineTo(-40, -19); ctx.closePath(); ctx.fill();
    ctx.fillStyle = oll; ctx.beginPath(); ctx.moveTo(-104, -70); ctx.lineTo(-86, -72); ctx.lineTo(-88, -66); ctx.lineTo(-101, -64); ctx.closePath(); ctx.fill();
    ctx.fillStyle = st; ctx.beginPath(); ctx.moveTo(-122, -76); ctx.lineTo(-74, -75); ctx.lineTo(-72, -71); ctx.lineTo(-120, -72); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f0e6c8'; ctx.fillRect(-98, -62, 8, 3);
    // фюзеляж
    g = ctx.createLinearGradient(0, -22, 0, 24); g.addColorStop(0, oll); g.addColorStop(0.45, ol); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(-70, -21); ctx.lineTo(60, -22); ctx.quadraticCurveTo(94, -20, 100, -2); ctx.quadraticCurveTo(96, 17, 66, 22); ctx.lineTo(-24, 22);
    ctx.lineTo(-96, 6); ctx.lineTo(-100, -8); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.4; ctx.stroke();
    // обтекатели шасси (спонсоны)
    g = ctx.createLinearGradient(0, 8, 0, 28); g.addColorStop(0, ol); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(10, 20, 46, 9, 0, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.stroke();
    // рампа
    ctx.fillStyle = oll; ctx.beginPath(); ctx.moveTo(-26, 22); ctx.lineTo(-96, 6); ctx.lineTo(-90, 0); ctx.lineTo(-30, 14); ctx.closePath(); ctx.fill(); ctx.strokeStyle = old; ctx.lineWidth = 1.4; ctx.stroke();
    // панели и грузовая дверь
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath();
    for (i = -50; i <= 50; i += 20) { ctx.moveTo(i, -21); ctx.lineTo(i, 20); }
    ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.42)'; ctx.lineWidth = 1.4; ctx.strokeRect(-24, -12, 62, 30);
    // стрелка-полоса и надпись, звезда
    ctx.fillStyle = '#efe4c3'; ctx.fillRect(-64, -16, 118, 2.4);
    ctx.font = '700 12px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ГРУЗ', 8, 3);
    ctx.fillStyle = '#efe4c3'; ctx.beginPath(); ctx.arc(-50, 2, 6, 0, 6.3); ctx.fill(); ctx.fillStyle = ol; ctx.beginPath(); ctx.arc(-50, 2, 3, 0, 6.3); ctx.fill();
    // носовой обтекатель и кабина
    ctx.fillStyle = '#2a3228'; ctx.beginPath(); ctx.moveTo(86, -17); ctx.quadraticCurveTo(100, -14, 100, -2); ctx.lineTo(90, -2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#16293d'; ctx.beginPath(); ctx.moveTo(60, -19); ctx.lineTo(82, -16); ctx.lineTo(88, -6); ctx.lineTo(62, -6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(160,215,245,.6)'; for (i = 0; i < 3; i++) ctx.fillRect(64 + i * 7, -15 + i * 1.3, 5, 7);
    // высокое крыло, ближнее: плоскость с передней кромкой
    g = ctx.createLinearGradient(0, -34, 0, -20); g.addColorStop(0, oll); g.addColorStop(1, old);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-40, -21); ctx.lineTo(56, -21); ctx.lineTo(48, -31); ctx.lineTo(-30, -31); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
    // 4 турбовинтовых двигателя
    var ph = t * 60;
    for (i = 0; i < 4; i++) {
      var ex = -26 + i * 24 + (i > 1 ? 4 : 0), ey = -26 + (i % 2) * 4, far = i % 2 === 1;
      ctx.fillStyle = far ? old : '#566643'; ctx.beginPath(); ctx.moveTo(ex - 12, ey - 5); ctx.lineTo(ex + 12, ey - 4); ctx.quadraticCurveTo(ex + 18, ey, ex + 12, ey + 5); ctx.lineTo(ex - 12, ey + 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#20261c'; ctx.fillRect(ex + 12, ey - 2.5, 3, 5);
      var pr = 11 + Math.abs(Math.sin(ph + i * 1.7)) * 5;
      ctx.fillStyle = 'rgba(205,212,222,.18)'; ctx.beginPath(); ctx.ellipse(ex + 17, ey, 3.5, 17, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = 'rgba(30,34,40,.75)'; ctx.beginPath(); ctx.ellipse(ex + 17, ey, 1.8, pr, 0, 0, 6.3); ctx.fill();
      ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.arc(ex + 17, ey, 2, 0, 6.3); ctx.fill();
    }
    // блик, огни
    g = ctx.createLinearGradient(0, -22, 0, 22); g.addColorStop(0, 'rgba(255,255,255,.22)'); g.addColorStop(0.4, 'rgba(255,255,255,0)'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-70, -21); ctx.lineTo(60, -22); ctx.quadraticCurveTo(94, -20, 100, -2); ctx.lineTo(-100, -2); ctx.closePath(); ctx.fill();
    if (Math.sin(t * 6) > 0.1) { ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.arc(-120, -74, 2.6, 0, 6.3); ctx.arc(2, 22, 2.4, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#2fe36f'; ctx.beginPath(); ctx.arc(52, -27, 2, 0, 6.3); ctx.fill();
    ctx.restore();
  }

function drawHeli(x, y, s, tt, lp, civ, col) {
    ctx.save(); ctx.translate(x, y + Math.sin(tt * 3) * 4 * s); ctx.scale(s * 1.3, s * 1.3); ctx.rotate(0.04 + lp * 0.02);
    var i, g, white = '#f7f9fc', red = col || '#e5484d', dark = '#3b4452';
    // хвостовая балка
    g = ctx.createLinearGradient(0, -14, 0, 8); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#c9d2de');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-34, -14); ctx.lineTo(-132, -9); ctx.lineTo(-132, -2); ctx.lineTo(-34, 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = red; ctx.beginPath(); ctx.moveTo(-72, -12); ctx.lineTo(-132, -9); ctx.lineTo(-132, -5); ctx.lineTo(-72, -5); ctx.closePath(); ctx.fill();
    // хвостовое оперение
    ctx.fillStyle = white; ctx.beginPath(); ctx.moveTo(-118, -9); ctx.lineTo(-136, -40); ctx.lineTo(-124, -40); ctx.lineTo(-104, -9); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = red; ctx.beginPath(); ctx.moveTo(-136, -40); ctx.lineTo(-124, -40); ctx.lineTo(-126, -33); ctx.lineTo(-134, -33); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c9d2de'; ctx.fillRect(-122, -4, 26, 3);
    // хвостовой винт
    var tp = Math.sin(tt * 55) * 20;
    if (!gxNoTr) { ctx.fillStyle = 'rgba(190,200,212,.22)'; ctx.beginPath(); ctx.ellipse(-130, -30, 5, 22, 0, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = dark; ctx.fillRect(-131.5, -30 - Math.abs(tp), 3, Math.abs(tp) * 2 + 2); ctx.beginPath(); ctx.arc(-130, -30, 3, 0, 6.3); ctx.fill();
    // фюзеляж: белый верх, красный низ
    g = ctx.createLinearGradient(0, -40, 0, 30); g.addColorStop(0, '#ffffff'); g.addColorStop(0.55, '#e9eef5'); g.addColorStop(1, '#b8c3d2');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-44, -20); ctx.quadraticCurveTo(-20, -40, 20, -38); ctx.quadraticCurveTo(62, -34, 74, -6); ctx.quadraticCurveTo(70, 22, 40, 28); ctx.lineTo(-30, 28); ctx.quadraticCurveTo(-52, 22, -44, -20); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-44, -20); ctx.quadraticCurveTo(-20, -40, 20, -38); ctx.quadraticCurveTo(62, -34, 74, -6); ctx.quadraticCurveTo(70, 22, 40, 28); ctx.lineTo(-30, 28); ctx.quadraticCurveTo(-52, 22, -44, -20); ctx.clip();
    ctx.fillStyle = red; ctx.beginPath(); ctx.moveTo(-60, 8); ctx.lineTo(60, 2); ctx.lineTo(84, 30); ctx.lineTo(-60, 30); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(-60, 6, 130, 2); ctx.restore();
    ctx.strokeStyle = 'rgba(60,75,95,.5)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(-44, -20); ctx.quadraticCurveTo(-20, -40, 20, -38); ctx.quadraticCurveTo(62, -34, 74, -6); ctx.quadraticCurveTo(70, 22, 40, 28); ctx.lineTo(-30, 28); ctx.quadraticCurveTo(-52, 22, -44, -20); ctx.stroke();
    // остекление кабины
    g = ctx.createLinearGradient(30, -34, 70, 4); g.addColorStop(0, '#bfe6fb'); g.addColorStop(1, '#4c93c7');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(26, -34); ctx.quadraticCurveTo(58, -32, 72, -8); ctx.lineTo(70, 2); ctx.lineTo(24, 2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(40,60,90,.6)'; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(46, -32); ctx.lineTo(46, 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.moveTo(30, -31); ctx.lineTo(40, -31); ctx.lineTo(30, 0); ctx.lineTo(26, 0); ctx.closePath(); ctx.fill();
    // сдвижная дверь с окном и крестом
    ctx.strokeStyle = 'rgba(60,75,95,.55)'; ctx.lineWidth = 1.3; ctx.strokeRect(-30, -22, 48, 40);
    ctx.fillStyle = '#7fc2e8'; ctx.fillRect(-26, -18, 20, 14); ctx.fillStyle = '#fff'; ctx.fillRect(-2, -18, 16, 22);
    if (!civ) { ctx.fillStyle = red; ctx.fillRect(3, -9, 8, 3); ctx.fillRect(5.5, -11.5, 3, 8); }
    ctx.fillStyle = dark; ctx.fillRect(14, -2, 3, 5);
    // надпись
    ctx.fillStyle = '#fff'; ctx.font = '700 9px "Russo One", Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; if (!civ) ctx.fillText('СПАС', -26, 20);
    // двигатель и мачта
    ctx.fillStyle = '#d5dce6'; ctx.beginPath(); ctx.moveTo(-34, -32); ctx.quadraticCurveTo(-10, -50, 18, -38); ctx.lineTo(18, -30); ctx.closePath(); ctx.fill();
    ctx.fillStyle = dark; ctx.fillRect(-14, -56, 8, 14); ctx.fillRect(-18, -60, 16, 5);
    ctx.fillStyle = '#20252d'; ctx.beginPath(); ctx.ellipse(-38, -28, 3, 4, 0, 0, 6.3); ctx.fill();
    // мигалка
    var fl = Math.floor(tt * 5) % 2; if (!civ) { ctx.fillStyle = fl ? '#ff3030' : '#3a6bff'; ctx.fillRect(2, -40, 10, 4); }
    if (!civ) { ctx.fillStyle = fl ? 'rgba(255,60,60,.25)' : 'rgba(80,120,255,.25)'; ctx.beginPath(); ctx.arc(7, -40, 14, 0, 6.3); ctx.fill(); }
    // посадочные лыжи
    ctx.strokeStyle = dark; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-56, 44); ctx.lineTo(54, 44); ctx.quadraticCurveTo(66, 44, 68, 36); ctx.stroke();
    ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(-32, 26); ctx.lineTo(-36, 43); ctx.moveTo(30, 26); ctx.lineTo(34, 43); ctx.stroke();
    // главный винт: размытый диск и лопасти
    var ra = tt * 38, rl = 170;
    var rg = ctx.createRadialGradient(-10, -62, 8, -10, -62, rl); rg.addColorStop(0, 'rgba(205,212,224,.0)'); rg.addColorStop(0.55, 'rgba(205,212,224,.16)'); rg.addColorStop(1, 'rgba(205,212,224,0)');
    if (!gxNoTr) { ctx.fillStyle = rg; ctx.beginPath(); ctx.ellipse(-10, -62, rl, 11, 0, 0, 6.3); ctx.fill(); }
    if (!gxNoTr) for (i = 0; i < 4; i++) { var a2 = ra + i * 1.5708, bx = Math.cos(a2) * rl * 0.94, by = Math.sin(a2) * 5; ctx.strokeStyle = 'rgba(46,52,64,' + (0.35 + 0.5 * Math.abs(Math.cos(a2))) + ')'; ctx.lineWidth = 3 - Math.abs(Math.sin(a2)) * 1.4; ctx.beginPath(); ctx.moveTo(-10, -62); ctx.lineTo(-10 + bx, -62 + by); ctx.stroke(); }
    ctx.fillStyle = '#9aa4b2'; ctx.beginPath(); ctx.arc(-10, -62, 4.5, 0, 6.3); ctx.fill();
    // поисковый луч и лебёдка
    if (!civ) {
    var sg = ctx.createLinearGradient(50, 14, 130, 230); sg.addColorStop(0, 'rgba(255,250,200,.42)'); sg.addColorStop(1, 'rgba(255,250,200,0)'); ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(52, 12); ctx.lineTo(170, 250); ctx.lineTo(60, 250); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff6c4'; ctx.beginPath(); ctx.arc(54, 12, 3.2, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#e8edf4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(4, 30); ctx.lineTo(4, 84 + Math.sin(tt * 2) * 6); ctx.stroke();
    ctx.fillStyle = '#ffcf33'; ctx.fillRect(0, 84 + Math.sin(tt * 2) * 6, 8, 5);
    }
    ctx.restore();
  }

function frame(now) {
    requestAnimationFrame(frame);
    // Скрытая вкладка не должна рисовать кадры и греть GPU.
    if (document.hidden) { last = now; return; }
    perfTick(now - last); playTick((now - last) / 1000);
    FPSV.n++;
    if (!FPSV.t0) FPSV.t0 = now;
    else if (now - FPSV.t0 >= 500) { FPSV.v = Math.round(FPSV.n * 1000 / (now - FPSV.t0)); FPSV.n = 0; FPSV.t0 = now; perfUi(); }
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    // ошибка в одном кадре больше не останавливает игру целиком (раньше после исключения цикл не перезапускался)
    try { if (!paused) update(dt); else if (washOpen) tickWashGame(dt); } catch (e1) { if (frameErrs++ < 3) try { console.error(e1); } catch (e0) {} }
    try { csUiSync(); updateMarket(dt); } catch (e2) {}
    try { bmTick(); } catch (e4) {}
    try { avPanelTick(); } catch (e5) {}
    try { rtUi(); } catch (e6) {}
    try { render(); } catch (e3) { if (frameErrs++ < 3) try { console.error(e3); } catch (e0) {} }
  }

function pingText() {
    if (typeof socket === 'undefined' || !socket) return 'нет сервера';
    if (net.state !== 'online') return net.state === 'connecting' ? 'подключение…' : (net.state === 'full' ? 'сервер полон' : 'офлайн');
    if (PING.ms === -2) return 'нет ответа';
    if (PING.ms < 0) return '…';
    return PING.ms + ' мс';
  }

function pingCls() { var p = PING.ms; if (typeof socket === 'undefined' || !socket || net.state !== 'online' || p < 0) return 'm'; return p < 80 ? 'g' : (p < 200 ? 'y' : 'r'); }

function perfUi() {
    var show = !!(music.fps || music.ping);
    if (elPerf.hidden === show) elPerf.hidden = !show;
    var html = '';
    if (music.fps) html += '<span class="' + (FPSV.v >= 50 ? 'g' : (FPSV.v >= 30 ? 'y' : 'r')) + '">' + FPSV.v + ' FPS</span>';
    if (music.ping) html += '<span class="' + pingCls() + '">' + pingText() + '</span>';
    if (html !== lastPerfUi) { lastPerfUi = html; elPerf.innerHTML = html; }
    if (settingsOpen) {
      var now = 'Сейчас: ' + FPSV.v + ' FPS · пинг: ' + pingText() + (PING.ms >= 0 ? '' : (typeof socket !== 'undefined' && socket ? '' : ' (одиночная игра)'));
      if (now !== lastPerfNow) { lastPerfNow = now; elPerfNow.textContent = now; }
    }
  }

function sync() {
    sw.setAttribute('aria-checked', music.on ? 'true' : 'false');
    swSfx.setAttribute('aria-checked', music.sfx ? 'true' : 'false');
    swAuto.setAttribute('aria-checked', music.auto ? 'true' : 'false'); apfRender();
    swMat.setAttribute('aria-checked', music.mat ? 'true' : 'false');
    swFps.setAttribute('aria-checked', music.fps ? 'true' : 'false');
    swHq.setAttribute('aria-checked', music.hq ? 'true' : 'false'); swBm.setAttribute('aria-checked', music.bm ? 'true' : 'false');
    swPing.setAttribute('aria-checked', music.ping ? 'true' : 'false');
    settings.sync();
    vol.value = Math.round(music.vol * 100);
    trackBtns.forEach(function (b, i) { b.setAttribute('aria-checked', i === music.track ? 'true' : 'false'); });
  }

function syncPause() { paused = settingsOpen || upOpen || logOpen || washOpen || busOpen || invOpen || menuOpen || lobbyOpen || phoneOpen || miniOpen || tripMenuOpen || sqOpen || fshopOpen || whOpen || dlgOpened || finOn || !!(fsh && fsh.open); if (paused) { input.left = input.right = false; thr.key = thr.ptr = thr.btn = false; } }

function openSheet() { settingsOpen = true; syncPause(); pingSend(); perfUi(); PLAY.shown = -1; playUi(); overlay.hidden = false; overlay.firstElementChild.scrollTop = 0; document.getElementById('closeSheet').focus({ preventScroll: true }); }

function closeSheet() { settingsOpen = false; syncPause(); overlay.hidden = true; showAsk(false); gear.blur(); }

function dropSpot(i, n) {
    var span = Math.min(150, 14 * n), f = n > 1 ? (i + 0.5) / n * 2 - 1 : 0;
    return Math.max(40, Math.min(WORLD_W - 40, P.x + P.face * 50 + f * span));
  }

function dropBottles(r, cl, n) {
    var arr = cl ? save.inv.c : save.inv.d;
    n = Math.min(n, arr[r]);
    if (n <= 0) return;
    arr[r] -= n; save.carried -= n;
    for (var i = 0; i < n; i++) bottles.push({ x: dropSpot(i, n), off: 0, ph: Math.random() * 6.28, r: r, c: cl, np: true, dx: P.x, dr: true });
    persist(); hud(); sfx('pick');
    popup(P.x, PLAYER_H + 8, '\u2212' + n + ' ' + RAR[r].n.toLowerCase(), RAR[r].c);
    renderInv();
  }

function moveStack(r, cl, toTrunk, n) {
    var a = toTrunk ? (cl ? save.inv.c : save.inv.d) : (cl ? save.trk.c : save.trk.d);
    var b = toTrunk ? (cl ? save.trk.c : save.trk.d) : (cl ? save.inv.c : save.inv.d);
    n = Math.min(n, a[r], toTrunk ? trunkCap() - trunkN() : cap() - save.carried);
    if (n <= 0) { sfx('no'); toast(toTrunk ? 'Багажник полон.' : 'Карман полон.', 2000); return; }
    a[r] -= n; b[r] += n; save.carried += toTrunk ? -n : n;
    persist(); hud(); sfx('pick'); renderInv();
  }

function dropWool(n) {
    n = Math.min(n, save.wool);
    if (n <= 0) return;
    save.wool -= n; save.carried -= n;
    for (var i = 0; i < n; i++) wools.push({ x: dropSpot(i, n), ph: Math.random() * 6.28, np: true, dx: P.x });
    persist(); hud(); sfx('pick');
    popup(P.x, PLAYER_H + 8, '\u2212' + n + ' стекловата', '#f2e6b3');
    renderInv();
  }

function invRow(o) {
    var d = document.createElement('div'); d.className = 'irow';
    var th;
    if (o.src) { th = document.createElement('img'); th.src = o.src; th.alt = ''; th.className = 'ith' + (o.dirtyl ? ' dirtyl' : ''); }
    else { th = document.createElement('div'); th.className = 'ith em'; th.textContent = o.em; }
    d.appendChild(th);
    var inf = document.createElement('div'); inf.className = 'inf';
    var nm = document.createElement('div'); nm.className = 'inm'; nm.textContent = o.name; if (o.color) nm.style.color = o.color;
    var cs = document.createElement('div'); cs.className = 'ics'; cs.textContent = o.sub;
    inf.appendChild(nm); inf.appendChild(cs); d.appendChild(inf);
    if (o.one) {
      var bt = document.createElement('div'); bt.className = 'ibt';
      var b1 = document.createElement('button'); b1.type = 'button'; b1.className = 'alt'; b1.textContent = o.l1 || '\u22121'; b1.setAttribute('aria-label', (o.verb || 'Выбросить') + ' одну: ' + o.name);
      b1.addEventListener('click', o.one);
      var b2 = document.createElement('button'); b2.type = 'button'; b2.textContent = o.l2 || 'Все'; b2.setAttribute('aria-label', (o.verb || 'Выбросить') + ' все: ' + o.name);
      b2.addEventListener('click', o.all);
      bt.appendChild(b1); bt.appendChild(b2);
      if (o.stow) { var b3 = document.createElement('button'); b3.type = 'button'; b3.className = 'alt'; b3.textContent = '\uD83D\uDE8C'; b3.setAttribute('aria-label', 'В багажник: ' + o.name); b3.addEventListener('click', o.stow); bt.appendChild(b3); }
      d.appendChild(bt);
    }
    return d;
  }

function renderInv() {
    invSum.textContent = 'В кармане: ' + save.carried + ' из ' + cap() + ' \u00B7 на сумму ≈ ' + fmtN(invTotal()) + (cleanN() ? ' \u00B7 мытых: ' + cleanN() : '') + (save.kc ? ' \u00B7 коллекция: Щупальце Кракена' : '');
    invList.textContent = '';
    var any = false, r;
    function addB(r, cl) {
      var n = (cl ? save.inv.c : save.inv.d)[r];
      if (n <= 0) return;
      any = true;
      invList.appendChild(invRow({
        src: r === 5 ? SRC.bMyth : (r === 4 ? SRC.bLegend : (cl ? SRC.bottle : SRC.bDirty)), dirtyl: r >= 4 && !cl,
        name: RAR[r].n + (cl ? ', мытая' : ', грязная'), color: RAR[r].c,
        sub: '\u00D7' + n + ' \u00B7 стоит ' + fmtMult(RAR[r].m * (cl ? CLEAN_MULT : 1)) + ' от курса \u00B7 ' + fmtP(RAR[r].m * (cl ? CLEAN_MULT : 1) * save.rate) + ' коин. за шт., всего ' + fmtN(RAR[r].m * (cl ? CLEAN_MULT : 1) * save.rate * n),
        one: function () { dropBottles(r, cl, 1); }, all: function () { dropBottles(r, cl, n); },
        stow: nearBusInv() ? function () { moveStack(r, cl, true, 1e9); } : null
      }));
    }
    for (r = 5; r >= 0; r--) { addB(r, false); addB(r, true); }
    if (save.wool > 0) {
      any = true;
      var wn = save.wool;
      invList.appendChild(invRow({ src: SRC.wool, name: 'Стекловата', color: '#f2e6b3', sub: '\u00D7' + wn + ' \u00B7 ' + WOOL_PRICE + ' коинов за штуку',
        one: function () { dropWool(1); }, all: function () { dropWool(wn); } }));
    }
    if (!any) { var e = document.createElement('div'); e.className = 'whelp'; e.textContent = 'Карман пуст. Выбрасывать нечего.'; invList.appendChild(e); }
    if (nearBusInv()) {
      var g2 = document.createElement('div'); g2.className = 'igrp'; g2.textContent = 'Багажник автобуса: ' + trunkN() + ' из ' + trunkCap(); invList.appendChild(g2);
      var tAny = false;
      var addT = function (r, cl) {
        var n = (cl ? save.trk.c : save.trk.d)[r];
        if (n <= 0) return;
        tAny = true;
        invList.appendChild(invRow({
          src: r === 5 ? SRC.bMyth : (r === 4 ? SRC.bLegend : (cl ? SRC.bottle : SRC.bDirty)), dirtyl: r >= 4 && !cl,
          name: RAR[r].n + (cl ? ', мытая' : ', грязная'), color: RAR[r].c, sub: '\u00D7' + n + ' в багажнике',
          verb: 'Забрать', l1: '+1', l2: '+Все',
          one: function () { moveStack(r, cl, false, 1); }, all: function () { moveStack(r, cl, false, 1e9); }
        }));
      };
      for (r = 5; r >= 0; r--) { addT(r, false); addT(r, true); }
      if (!tAny) { var e2 = document.createElement('div'); e2.className = 'whelp'; e2.textContent = 'Багажник пуст. Кнопка с автобусом у стопки кладёт её сюда.'; invList.appendChild(e2); }
    }
    var extra = [];
    if (save.mx && save.mx.chickenToken) extra.push({ src: CHICKEN_TOKEN_IMG, name: 'Chicken Token', color: '#ffd23f', sub: 'Уникальный трофей · найден в мусорке · шанс повышается после каждого промаха' });
    if (save.superSp > 0) extra.push({ src: SRC.bSuper, name: 'Супер-Спирт', color: '#ffd23f', sub: '\u00D7' + save.superSp + ' \u00B7 +' + (15 * save.superSp) + '% к выручке в магазине' });
    if (save.sec > 0) extra.push({ src: SRC.bMyth, name: 'Секретная чекушка', color: '#ffffff', sub: '\u00D7' + save.sec + ' \u00B7 при сдаче каждая стоит \u00D7100 от курса (сейчас ' + fmtP(save.rate * 100) + ' коинов)' });
    if (save.tickets > 0) extra.push({ em: '\uD83C\uDFAB', name: 'Билет на Мальдивы', sub: '\u00D7' + save.tickets + ' \u00B7 вместо 3 мифических чекушек, у красного самолёта в Аэропорту' });
    if (labN() > 0) extra.push({ em: '\uD83E\uDDEA', name: 'Образцы лаборатории', sub: LAB_KINDS.map(function (k, i) { return k.n + ' \u00D7' + save.mx.lab[i]; }).join(', ') + ' \u00B7 продай Меллстрою в Белом доме' });
    if (fishTotal() > 0) extra.push({ em: '\uD83D\uDC1F', name: 'Улов', sub: '\u00D7' + fishTotal() + ' \u00B7 продай в лавке рыбака на Мальдивах' });
    if (save.nuts > 0) extra.push({ em: '\uD83E\uDD5C', name: 'Орешки', sub: '\u00D7' + save.nuts + ' \u00B7 кормить дикую белку' });
    if (save.army > 0) extra.push({ em: '\uD83D\uDC3F', name: 'Белки в армии', sub: '\u00D7' + save.army + ' из ' + MAX_ARMY });
    if (extra.length) {
      var gp = document.createElement('div'); gp.className = 'igrp'; gp.textContent = 'Не выбрасывается'; invList.appendChild(gp);
      extra.forEach(function (o) { invList.appendChild(invRow(o)); });
    }
  }

function openInv() {
    if (paused) return;
    if (busLock()) { toast('В автобусе не до инвентаря.', 2000); return; }
    renderInv(); invOpen = true; syncPause(); invOverlay.hidden = false; invOverlay.firstElementChild.scrollTop = 0;
    document.getElementById('closeInv').focus({ preventScroll: true });
  }

function closeInv() {
    invOpen = false; syncPause(); invOverlay.hidden = true;
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

function card(name, lvl, desc, cost, onBuy, maxed, lvText) {
    var d = document.createElement('div'); d.className = 'upc';
    var ok = !maxed && save.coins >= cost;
    d.innerHTML = '<div class="top"><span class="nm">' + name + '</span><span class="lv">' + (lvText || 'ур. ' + lvl + (maxed ? ' (макс.)' : '')) + '</span></div>' +
      '<div class="ds">' + desc + '</div>';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'buy' + (ok ? '' : ' no');
    b.setAttribute('aria-disabled', ok ? 'false' : 'true');
    b.innerHTML = maxed ? '<span>Максимум</span>' : '<span class="coin"></span><span>' + cost.toLocaleString('ru-RU') + '</span>';
    b.addEventListener('click', function () {
      if (maxed) return;
      if (save.coins < cost) { sfx('no'); return; }
      save.coins -= cost; onBuy(); persist(); hud(); sfx('sell'); renderUp();
    });
    d.appendChild(b);
    return d;
  }

function busCost() { return Math.round(90 * Math.pow(1.7, save.busup) / 5) * 5; }

function autoCost() { return Math.round(220 * Math.pow(1.9, save.autowash) / 5) * 5; }

function specCard() {
    var d = document.createElement('div'); d.className = 'upc';
    d.innerHTML = '<div class="top"><span class="nm">Особый аирдроп</span><span class="lv">в запасе: ' + (save.special || 0) + '</span></div>' +
      '<div class="ds">Сигнал для самолёта: Хоумлендер-Петух вылетает на бой сразу, а с неба падает увеличенный ящик, часть чекушек в нём мытые. Победа даёт «Супер-Спирт» (+15% к выручке), ' + BOSS_COINS + ' коинов и 5 орешков. После победы Хоумлендер отдыхает 3 минуты: ни по вызову, ни сам он не прилетит. Вызов: ' + (touch ? 'кнопка вверху справа' : 'Z') + '.</div>';
    var box = document.createElement('div'); box.className = 'buy2'; box.style.gridTemplateColumns = '1fr';
    var cost = SPEC_PRICE, ok = save.coins >= cost;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'buy' + (ok ? '' : ' no');
    b.setAttribute('aria-disabled', ok ? 'false' : 'true');
    b.innerHTML = '<span class="coin"></span><span>' + cost + '</span>';
    b.addEventListener('click', function () {
      if (save.coins < cost) { sfx('no'); return; }
      save.coins -= cost; save.special = (save.special || 0) + 1; persist(); hud(); sfx('sell'); renderUp();
    });
    box.appendChild(b); d.appendChild(box);
    return d;
  }

function nutCard() {
    var d = document.createElement('div'); d.className = 'upc';
    d.innerHTML = '<div class="top"><span class="nm">Орешки</span><span class="lv">в руках: ' + save.nuts + '</span></div>' +
      '<div class="ds">Накорми дикую белку орешком: она станет твоей, пойдёт за тобой и будет приносить чекушки с земли. Армия: ' + save.army + ' из ' + MAX_ARMY + '. В бою с боссом белки кидают в него жёлуди. Дикие белки водятся в Парке, за правым краем карты.</div>';
    var box = document.createElement('div'); box.className = 'buy2';
    [[1, NUT_PRICE], [5, NUT_PRICE5]].forEach(function (o) {
      var n = o[0], cost = o[1], ok = save.coins >= cost;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'buy' + (ok ? '' : ' no');
      b.setAttribute('aria-disabled', ok ? 'false' : 'true');
      b.innerHTML = '<span>' + n + ' шт</span><span class="coin"></span><span>' + cost + '</span>';
      b.addEventListener('click', function () {
        if (save.coins < cost) { sfx('no'); return; }
        save.coins -= cost; save.nuts += n; persist(); hud(); sfx('sell'); renderUp();
      });
      box.appendChild(b);
    });
    d.appendChild(box);
    return d;
  }

function groupUp() {
    var cards = Array.prototype.slice.call(upBox.children), byName = {}, used = {};
    cards.forEach(function (c) { var nm = c.querySelector('.nm'); if (nm) byName[nm.textContent] = c; });
    upBox.textContent = '';
    UP_TABS.concat([['Прочее', []]]).forEach(function (tab) {
      var items = tab[1].map(function (n) { used[n] = 1; return byName[n]; }).filter(Boolean);
      if (tab[0] === 'Прочее') items = cards.filter(function (c) { var nm = c.querySelector('.nm'); return nm && !used[nm.textContent]; });
      if (!items.length) return;
      var open = upTabs[tab[0]] !== false;
      var h = document.createElement('button'); h.type = 'button'; h.className = 'uptab'; h.setAttribute('aria-expanded', open ? 'true' : 'false');
      var t1 = document.createElement('span'); t1.textContent = tab[0] + ' (' + items.length + ')';
      var t2 = document.createElement('span'); t2.textContent = open ? '\u25BE' : '\u25B8';
      h.appendChild(t1); h.appendChild(t2);
      var body = document.createElement('div'); body.className = 'upbody'; body.hidden = !open;
      items.forEach(function (c) { body.appendChild(c); });
      h.addEventListener('click', function () {
        open = !open; upTabs[tab[0]] = open;
        try { localStorage.setItem('chekushka-tabs', JSON.stringify(upTabs)); } catch (e) {}
        body.hidden = !open; h.setAttribute('aria-expanded', open ? 'true' : 'false'); t2.textContent = open ? '\u25BE' : '\u25B8';
      });
      upBox.appendChild(h); upBox.appendChild(body);
    });
  }

function renderUp() { renderUp0(); groupUp(); }

function renderUp0() {
    document.getElementById('upCoins').textContent = save.coins.toLocaleString('ru-RU');
    upBox.textContent = '';
    upBox.appendChild(card('Большой карман', save.pocket,
      'Влезает ' + cap() + ' чекушек, станет ' + (cap() + 5) + '.',
      pocketCost(), function () { save.pocket++; }));
    var n = airCount(), cdNow = airCd(save.air), cdNext = airCd(save.air + 1);
    var desc;
    if (save.air === 0) desc = 'Откроется кнопка вызова: самолёт сбросит ящик с 20 чекушками прямо на твоё место, летит он около 5 секунд. Перезарядка 45 с. С каждым уровнем в ящике на 5 чекушек больше, перезарядка на 1 с короче (минимум 20 с), а шанс на редкие чекушки выше.';
    else desc = 'В ящике ' + n + ', станет ' + (n + 5) + '. Перезарядка ' + cdNow + ' с' + (cdNext < cdNow ? ', станет ' + cdNext + ' с.' : ' (это минимум).') + ' Шанс редкой чекушки и лучше: ' + rarePct(airLuck(save.air)).toFixed(1).replace('.', ',') + '%, станет ' + rarePct(airLuck(save.air + 1)).toFixed(1).replace('.', ',') + '%.';
    upBox.appendChild(card('Аирдроп', save.air, desc, airCost(), function () { save.air++; }));
    var sl = save.speed, sMax = sl >= MAX_UP;
    upBox.appendChild(card('Скорость бега', sl,
      sMax ? 'Бежишь на +' + Math.round(7 * sl) + '% быстрее обычного. Это максимум.' : 'Сейчас +' + Math.round(7 * sl) + '% к обычной скорости, станет +' + Math.round(7 * (sl + 1)) + '%.',
      speedCost(), function () { save.speed++; }, sMax));
    var jl = save.jump, jMax = jl >= MAX_UP;
    function jh(l) { var f = 1 + 0.05 * l; return Math.round((f * f - 1) * 100); }
    upBox.appendChild(card('Высота прыжка', jl,
      jMax ? 'Прыгаешь на +' + jh(jl) + '% выше обычного. Это максимум.' : 'Сейчас +' + jh(jl) + '% к высоте прыжка, станет +' + jh(jl + 1) + '%.',
      jumpCost(), function () { save.jump++; }, jMax));
    var bl = save.busup, bMax = bl >= MAX_UP;
    upBox.appendChild(card('Быстрый автобус', bl,
      bMax ? 'Автобус едет на +' + Math.round(20 * bl) + '% быстрее. Это максимум.' : 'Сейчас +' + Math.round(20 * bl) + '% к скорости автобуса, станет +' + Math.round(20 * (bl + 1)) + '%.',
      busCost(), function () { save.busup++; }, bMax));
    var al = save.autowash, aMax = al >= MAX_AW;
    function fs1(v) { return String(r1(v)).replace('.', ','); }
    upBox.appendChild(card('Автомойка', al,
      al === 0 ? 'Чекушки в руках моются сами, без мини-игры: сначала самые редкие. Одна чекушка за ' + fs1(awInt(1)) + ' с, с каждым уровнем быстрее, до ' + MAX_AW + ' уровня. В автобусе мойка идёт в ' + BUS_WASH_BOOST + ' раза быстрее (даже без улучшения). Чистая стоит ' + fmtMult(CLEAN_MULT) + '.'
        : (aMax ? 'Одна чекушка моется за ' + fs1(awInt(al)) + ' с (в автобусе за ' + fs1(awInt(al) / BUS_WASH_BOOST) + ' с). Это максимум.' : 'Одна чекушка моется за ' + fs1(awInt(al)) + ' с, станет ' + fs1(awInt(al + 1)) + ' с. В автобусе в ' + BUS_WASH_BOOST + ' раза быстрее.'),
      autoCost(), function () { save.autowash++; }, aMax));
    upBox.appendChild(nutCard());
    upBox.appendChild(specCard());
    function oc(b, k, l) { return Math.round(b * Math.pow(k, l) / 5) * 5; }
    if (!save.ownBus) {
      upBox.appendChild(card('Свой автобус', 0, 'Личный автобус стоит справа от мойки. Едешь сам, чекушки на пути собираются в багажник, и там можно оставлять чекушки про запас. После покупки откроются улучшения автобуса.', OB_PRICE, function () { save.ownBus = 1; save.fuel = fuelCap(); ob.x = OB_HOME; ob.on = false; toast('Автобус куплен! Он стоит справа от мойки: подойди и нажми «Сесть».', 4500); }));
    } else {
      var el = save.ebus, tl = save.tbus, ml = save.mbus;
      upBox.appendChild(card('Двигатель автобуса', el, el >= OB_MAX.ebus ? 'Автобус едет на ' + Math.round(430 * (1 + 0.12 * el)) + ' ед. в секунду. Это максимум.' : 'Скорость ' + Math.round(430 * (1 + 0.12 * el)) + ', станет ' + Math.round(430 * (1 + 0.12 * (el + 1))) + ' (бегом ' + Math.round(spd()) + ').', oc(250, 1.7, el), function () { save.ebus++; }, el >= OB_MAX.ebus));
      upBox.appendChild(card('Багажник', tl, tl >= OB_MAX.tbus ? 'Влезает ' + trunkCap() + ' чекушек. Это максимум.' : 'Влезает ' + trunkCap() + ' чекушек, станет ' + (trunkCap() + 10) + '.', oc(180, 1.7, tl), function () { save.tbus++; }, tl >= OB_MAX.tbus));
      upBox.appendChild(card('Магнит автобуса', ml, ml >= OB_MAX.mbus ? 'Собирает чекушки в ' + obReach() + ' шагах от автобуса. Это максимум.' : 'Собирает чекушки в ' + obReach() + ' шагах от автобуса, станет ' + (obReach() + 35) + '.', oc(300, 1.8, ml), function () { save.mbus++; }, ml >= OB_MAX.mbus));
      var kl = save.kbus;
      upBox.appendChild(card('Бак автобуса', kl, kl >= OB_MAX.kbus ? 'Бак на ' + fuelCap() + ' л. Это максимум.' : 'Бак на ' + fuelCap() + ' л, станет ' + (fuelCap() + 15) + ' л. Сейчас в стране дефицит бензина: литр стоит от 2 до 1000 и цена меняется каждые 5 секунд. Литра хватает примерно на 500 шагов автобуса.', oc(200, 1.7, kl), function () { save.kbus++; }, kl >= OB_MAX.kbus));
      upBox.appendChild(card('Автопилот', save.apilot ? 1 : 0, 'Автобус сам приедет к тебе по кнопке «Вызвать автобус» (на компьютере B), даже если ты оставил его далеко. Едет на бензине и собирает чекушки магнитом по пути.', AP_PRICE, function () { save.apilot = 1; toast('Автопилот куплен: кнопка вызова появится, когда автобус далеко.', 4000); }, !!save.apilot));
      var al2 = save.abus, sl2 = save.sbus, rl2 = save.rbus, cl2 = save.cbus;
      upBox.appendChild(card('Броня автобуса', al2, al2 >= OB_MAX.abus ? 'Урон по тебе в автобусе снижен на ' + Math.round(armorCut() * 100) + '%. Это максимум.' : 'Урон по тебе в автобусе снижен на ' + Math.round(armorCut() * 100) + '%, станет ' + Math.round((armorCut() + 0.12) * 100) + '%. С каждым уровнем на автобусе появляются новые стальные пластины.', oc(350, 1.75, al2), function () { save.abus++; }, al2 >= OB_MAX.abus));
      upBox.appendChild(card('Экономичный двигатель', sl2, sl2 >= OB_MAX.sbus ? 'Расход бензина меньше на ' + (sl2 * 12) + '%. Это максимум.' : 'Расход бензина меньше на ' + (sl2 * 12) + '%, станет меньше на ' + ((sl2 + 1) * 12) + '%. Пригодится при дефиците.', oc(200, 1.7, sl2), function () { save.sbus++; }, sl2 >= OB_MAX.sbus));
      upBox.appendChild(card('Таран', rl2, rl2 >= OB_MAX.rbus ? 'Автобус на ходу распугивает белок и возвращает украденные чекушки (дальность ' + ramReach() + '). Это максимум.' : (rl2 === 0 ? 'Спереди автобуса появляется таран: на скорости пугает белок-воришек.' : (rl2 === 1 ? 'Станет: ещё и возвращает украденные чекушки.' : 'Станет: дальше и с шипами.')), oc(500, 1.9, rl2), function () { save.rbus++; }, rl2 >= OB_MAX.rbus));
      upBox.appendChild(card('Мойка в багажнике', cl2, cl2 >= OB_MAX.cbus ? 'Одна чекушка в багажнике моется за ' + busWashInt() + ' с. Это максимум.' : (cl2 === 0 ? 'Грязные чекушки в багажнике моются сами: сначала самые редкие.' : 'Моется за ' + busWashInt() + ' с, станет быстрее.'), oc(450, 1.8, cl2), function () { save.cbus++; }, cl2 >= OB_MAX.cbus));
      [['wmg', 'Пулемёт', 'Стреляет сам, пока ты за рулём в бою с Хоумлендером. ', function (l) { return W_MG.dmg[l] + ' урона, ' + W_MG.rate[l] + ' выстр. в секунду'; }],
       ['wrk', 'Ракетница', 'Выстрел кнопкой «Ракета» (на компьютере E) в бою, пока ты в автобусе. ', function (l) { return W_RK.dmg[l] + ' урона, перезарядка ' + W_RK.cd[l] + ' с'; }],
       ['wtr', 'Турель', 'Стреляет сама, даже если автобус просто стоит рядом с боем (до 1100 шагов от босса). ', function (l) { return W_TR.dmg[l] + ' урона, выстрел раз в ' + W_TR.cd[l] + ' с'; }]
      ].forEach(function (w) {
        var l = save[w[0]], mx = l >= 3;
        upBox.appendChild(card(w[1], l, w[2] + (l ? 'Сейчас: ' + w[3](l) + (mx ? '. Это максимум.' : '; станет: ' + w[3](l + 1) + '.') : w[3](1) + '.'), WPRICE[w[0]][Math.min(l, 2)], function () { save[w[0]]++; }, mx));
      });
      if ((!save.apilot || ob.loc) && !ob.on && (ob.loc || Math.abs(ob.x - OB_HOME) > 300)) upBox.appendChild(card('Эвакуатор', 0, 'Вернёт автобус на стоянку у мойки, если ты оставил его далеко.', 50, function () { ob.x = OB_HOME; ob.loc = 0; toast('Автобус вернулся на стоянку.', 2500); }, false, 'услуга'));
    }
    var UP5C = { nutdmg: [150, 300, 550, 900, 1400], sqfast: [140, 280, 500, 850, 1300], hpup: [120, 250, 450, 750, 1200], regen: [130, 260, 480, 800, 1250], sqcarry: [200, 400, 700, 1100, 1700] };
    function up5(name, key, descFn) {
      var l = save[key], mx = l >= UP5;
      upBox.appendChild(card(name, l, descFn(l, mx), UP5C[key][Math.min(l, UP5 - 1)], function () { save[key]++; if (key === 'hpup') hp = Math.min(maxHp(), hp + 20); }, mx));
    }
    function f1(v) { return String(Math.round(v * 10) / 10).replace('.', ','); }
    up5('Крепкие орешки', 'nutdmg', function (l, mx) { return 'Жёлудь белки бьёт Хоумлендера на ' + nutDmgAt(l) + ' урона' + (mx ? '. Это максимум.' : ', станет ' + nutDmgAt(l + 1) + '.') + ' Работает на белок твоей армии.'; });
    up5('Быстрые лапки', 'sqfast', function (l, mx) { return 'Белки ходят за чекушками в ' + f1(sqMulAt(l)) + ' раза чаще и бегают на +' + (6 * l) + '% быстрее' + (mx ? '. Это максимум.' : ', станет в ' + f1(sqMulAt(l + 1)) + ' раза чаще и +' + (6 * (l + 1)) + '%.'); });
    up5('Большая сумка', 'sqcarry', function (l, mx) { return 'Белка за один поход приносит ' + (1 + l) + ' чекушек' + (mx ? '. Это максимум.' : ', станет ' + (2 + l) + '.') + ' Если рядом лежат ещё, берёт их по пути.'; });
    up5('Крепкое здоровье', 'hpup', function (l, mx) { return 'Максимум HP: ' + (100 + 20 * l) + (mx ? '. Это максимум.' : ', станет ' + (120 + 20 * l) + '.') + ' Здоровье уходит от стекловаты и ударов Хоумлендера.'; });
    up5('Быстрая регенерация', 'regen', function (l, mx) { return 'Здоровье восстанавливается на ' + f1(2 / 3 + 0.5 * l) + ' HP в секунду' + (mx ? '. Это максимум.' : ', станет ' + f1(2 / 3 + 0.5 * (l + 1)) + '.'); });
    upBox.appendChild(card('Телефон', save.phone ? 1 : 0, 'Телефон открывает биржу Чекушка-коин (цена меняется каждые ' + CC_TICK + ' секунд). Открывается кнопкой 📱 вверху' + (touch ? '' : ' или клавишей P') + '. Торговать можно при связи: Wi-Fi или мобильные данные.', PHONE_PRICE, function () { save.phone = 1; toast('Телефон куплен! Кнопка 📱 появилась рядом с курсом.', 4000); if (typeof ach === 'function') ach('phone'); }, !!save.phone, save.phone ? 'куплен' : 'нужен для биржи'));
    var dnote = save.dataUnl ? 'Безлимит подключён навсегда.' : 'Осталось: ' + mbText(save.dataMB) + '.';
    DATA_PACKS.forEach(function (pk) {
      upBox.appendChild(card('Пакет ' + mbText(pk.mb), 0, 'Мобильные данные дают видеть курс чекушки и торговать на бирже вне Wi-Fi. Расход около ' + Math.round(DATA_RATE * 60) + ' МБ в минуту, пакет хватит минут на ' + Math.round(pk.mb / DATA_RATE / 60) + '. ' + dnote, pk.price, function () { save.dataMB += pk.mb; dataWarn = false; lastRate = ''; }, !!save.dataUnl, '+' + mbText(pk.mb)));
    });
    upBox.appendChild(card('Безлимит', save.dataUnl ? 1 : 0, 'Мобильный интернет без счётчика, навсегда. Курс и биржа работают в любой точке карты.', DATA_UNL, function () { save.dataUnl = 1; lastRate = ''; toast('Безлимит подключён навсегда!', 3500); if (typeof ach === 'function') ach('unl'); }, !!save.dataUnl, save.dataUnl ? 'куплен' : 'навсегда'));
    var gl = save.gloves ? 1 : 0;
    upBox.appendChild(card('Перчатки', gl, gl ? 'Куплены: стекловата больше не наносит урон.' : 'Без них стекловата наносит ' + WOOL_DMG + ' HP при подборе. В перчатках урона нет.', GLOVES_COST, function () { save.gloves = 1; }, !!gl));
  }

function openUp() { renderUp(); upOpen = true; syncPause(); upOverlay.hidden = false; document.getElementById('closeUp').focus({ preventScroll: true }); }

function closeUp() { upOpen = false; syncPause(); upOverlay.hidden = true; }

function keyName(c) {
    if (!c) return '—';
    if (/^Key[A-Z]$/.test(c)) return c.slice(3);
    if (/^Digit[0-9]$/.test(c)) return c.slice(5);
    var m = { Space: 'Пробел', Enter: 'Enter', NumpadEnter: 'Num Enter', ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', ShiftLeft: 'Shift', ShiftRight: 'Shift', ControlLeft: 'Ctrl', ControlRight: 'Ctrl', Tab: 'Tab', Backquote: '`', Comma: ',', Period: '.', Slash: '/', Semicolon: ';', Quote: "'", BracketLeft: '[', BracketRight: ']', Backslash: '\\', Minus: '-', Equal: '=', CapsLock: 'Caps' };
    return m[c] || c.replace(/^Numpad/, 'Num ');
  }

function keysRender() {
    keysList.textContent = '';
    keyBtns = {};
    KEY_ACTIONS.forEach(function (a) {
      var row = document.createElement('div'); row.className = 'krow';
      var n = document.createElement('span'); n.className = 'kn'; n.textContent = a.n; row.appendChild(n);
      [0, 1].forEach(function (slot) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'kb';
        b.textContent = keyName(KEYB[a.id][slot]);
        b.addEventListener('click', function () { keyStart(a.id, slot, b); });
        row.appendChild(b); keyBtns[a.id + slot] = b;
      });
      keysList.appendChild(row);
    });
  }

function keyStop() {
    keyCapture = false; keyCap = null;
    window.removeEventListener('keydown', keyOnKey, true);
    keysRender();
  }

function keyStart(id, slot, btn) {
    if (keyCap) keyStop();
    keyCap = { id: id, slot: slot }; keyCapture = true;
    btn.textContent = 'нажми…'; btn.classList.add('cap');
    window.addEventListener('keydown', keyOnKey, true);
  }

function keyOnKey(e) {
    if (!keyCap) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.code === 'Escape') { keyStop(); return; }
    if (e.code === 'Delete' || e.code === 'Backspace') { KEYB[keyCap.id][keyCap.slot] = ''; keysSave(); keyStop(); return; }
    if (!e.code || /^(Meta|Alt|Control)/.test(e.code)) return;
    var code = e.code, id = keyCap.id, slot = keyCap.slot, moved = '';
    // клавиша уже у другого действия: забираем её оттуда
    KEY_ACTIONS.forEach(function (a) {
      for (var k = 0; k < 2; k++) if (KEYB[a.id][k] === code && !(a.id === id && k === slot)) { KEYB[a.id][k] = ''; if (a.id !== id) moved = a.n; }
    });
    KEYB[id][slot] = code; keysSave(); keyStop();
    if (moved) toast('Клавиша ' + keyName(code) + ' забрана у действия «' + moved + '».', 3000);
  }

function devGive(n) {
    if (!DEV || !(n > 0)) return;
    n = Math.min(1e9, Math.floor(n)); save.coins = Math.min(1e12, save.coins + n); hud(); sfx('sell');
    document.getElementById('devMsg').textContent = 'Выдано +' + n + '. Сейчас коинов: ' + save.coins + '.';
  }

function promoSay(ok, m) { elPromoMsg.textContent = m; elPromoMsg.className = 'promomsg ' + (ok ? 'ok' : 'bad'); }

function promoActivate() {
    var code = (elPromoIn.value || '').trim().toLowerCase();
    if (!code) { promoSay(false, 'Введи промокод.'); return; }
    if (!Object.prototype.hasOwnProperty.call(PROMOS, code)) { promoSay(false, 'Такого промокода нет.'); sfx('no'); return; }
    if (!PROMO_REP[code] && save.promo && save.promo[code]) { promoSay(false, 'Этот промокод ты уже активировал.'); sfx('no'); return; }
    var r = PROMOS[code]();
    if (!r.ok) { promoSay(false, r.msg); sfx('no'); return; }
    if (!PROMO_REP[code]) save.promo[code] = 1;
    persist(); hud(); sfx('sell');
    promoSay(true, r.msg); elPromoIn.value = '';
  }

function wgGone() { var n = 0; for (var i = 0; i < wg.spots.length; i++) if (wg.spots[i].gone) n++; return n; }

function updateWashUi() {
    elWFill.style.width = Math.round(wgGone() / wg.spots.length * 100) + '%';
    elWTime.textContent = 'Осталось ' + Math.ceil(wg.left) + ' с';
  }

function newRound() {
    var r = -1;
    for (var q = 5; q >= 0; q--) if (save.inv.d[q] > 0) { r = q; break; }
    if (r < 0) return false;
    wg.batch = [r]; wg.spots = [];
    for (var i = 0; i < 14; i++) wg.spots.push({ x: 180 + (Math.random() - 0.5) * 84, y: 52 + Math.random() * 200, r: 15 + Math.random() * 9, gone: false });
    wg.left = 10; wg.done = false; wg.doneT = 0; wg.side = 0; wg.press = false; wg.foam = []; wg.sx = 180; wg.sy = 150; wg.sndT = 0;
    elWSub.textContent = 'Чекушка ' + wg.k + ' из ' + wg.n + '. Успей за 10 секунд!';
    updateWashUi(); drawWashGame();
    return true;
  }

function closeWash() {
    washOpen = false; wash.on = false; washOverlay.hidden = true; syncPause();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

function applyRound() {
    var r = wg.batch[0];
    if (save.inv.d[r] > 0) { save.inv.d[r]--; save.inv.c[r]++; }
    persist(); hud();
  }

function openWashGame() {
    if (dirtyN() === 0) return;
    wg.k = 1; wg.n = dirtyN();
    if (!newRound()) return;
    washOpen = true; wash.on = true; syncPause();
    elWHelp.textContent = touch ? 'Води пальцем по грязи' : 'Мышь (зажми кнопку) или \u2190 \u2192 по очереди';
    washOverlay.hidden = false;
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    sfx('wash');
  }

function endRound() {
    var all = wgGone() === wg.spots.length;
    if (all) {
      applyRound(); sfx('pick'); wg.k++;
      if (newRound()) { sfx('wash'); return; }
      closeWash(); popup(P.x, PLAYER_H + 10, 'Всё блестит!', '#9fe3ff');
      return;
    }
    closeWash(); toast('Не успел. Три быстрее!', 2500);
  }

function finishWashGame() {
    if (!washOpen) return;
    if (wg.done && wgGone() === wg.spots.length) applyRound();
    closeWash();
  }

function scrubAt(x, y) {
    if (wg.done) return;
    var hit = false;
    for (var i = 0; i < wg.spots.length; i++) {
      var sp = wg.spots[i];
      if (sp.gone) continue;
      var dx = sp.x - x, dy = sp.y - y, rr = sp.r + 24;
      if (dx * dx + dy * dy < rr * rr) {
        sp.gone = true; hit = true;
        for (var f = 0; f < 4; f++) wg.foam.push({ x: sp.x, y: sp.y, vx: (Math.random() - 0.5) * 120, vy: -20 - Math.random() * 60, age: 0 });
      }
    }
    if (hit) {
      if (wg.sndT <= 0) { sfx('wash'); wg.sndT = 0.1; }
      updateWashUi();
      if (wgGone() === wg.spots.length) { wg.done = true; wg.doneT = 0.8; sfx('sell'); }
    }
  }

function tickWashGame(dt) {
    if (!washOpen) return;
    if (wg.sndT > 0) wg.sndT -= dt;
    for (var i = wg.foam.length - 1; i >= 0; i--) {
      var f = wg.foam[i]; f.age += dt; f.x += f.vx * dt; f.y += f.vy * dt;
      if (f.age > 0.7) wg.foam.splice(i, 1);
    }
    if (wg.done) { wg.doneT -= dt; if (wg.doneT <= 0) { endRound(); return; } }
    else {
      wg.left -= dt;
      if (wg.left <= 0) { wg.left = 0; wg.done = true; wg.doneT = 0.5; }
      updateWashUi();
    }
    drawWashGame();
  }

function drawWashGame() {
    var c = wctx, i;
    var g = c.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, '#cfeaf6'); g.addColorStop(1, '#8fcdea');
    c.fillStyle = g; c.fillRect(0, 0, 360, 300);
    var r0 = wg.batch.length ? wg.batch[0] : 0, rc = RAR[r0];
    var gr = c.createRadialGradient(180, 150, 10, 180, 150, 160);
    gr.addColorStop(0, 'rgba(' + rc.glow + ',.7)'); gr.addColorStop(1, 'rgba(' + rc.glow + ',0)');
    c.fillStyle = gr; c.fillRect(0, 0, 360, 300);
    var sd = bottleSprite(r0, false), sc = bottleSprite(r0, true);
    if (sd) {
      var bh = 250, bw = bh * sd.width / sd.height;
      c.drawImage(sd, 180 - bw / 2, 25, bw, bh);
      if (sc && wg.spots.length) { c.globalAlpha = wgGone() / wg.spots.length; c.drawImage(sc, 180 - bw / 2, 25, bw, bh); c.globalAlpha = 1; }
    }
    for (i = 0; i < wg.spots.length; i++) {
      var sp = wg.spots[i];
      if (sp.gone) continue;
      c.fillStyle = 'rgba(88,58,30,.9)'; c.beginPath(); c.arc(sp.x, sp.y, sp.r, 0, 6.3); c.fill();
      c.fillStyle = 'rgba(150,108,64,.55)'; c.beginPath(); c.arc(sp.x - sp.r * 0.3, sp.y - sp.r * 0.3, sp.r * 0.45, 0, 6.3); c.fill();
    }
    for (i = 0; i < wg.foam.length; i++) {
      var fo = wg.foam[i];
      c.globalAlpha = Math.max(0, 1 - fo.age / 0.7);
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(fo.x, fo.y, 5 - fo.age * 4, 0, 6.3); c.fill();
    }
    c.globalAlpha = 1;
    c.save(); c.translate(wg.sx, wg.sy); c.rotate(wg.press ? Math.sin(t * 16) * 0.15 : 0);
    c.fillStyle = '#f2d12e'; c.fillRect(-22, -14, 44, 28);
    c.fillStyle = '#d9b91a'; c.fillRect(-22, 8, 44, 6);
    c.fillStyle = 'rgba(160,120,10,.55)';
    for (i = 0; i < 5; i++) { c.beginPath(); c.arc(-14 + i * 7, -4 + (i % 2) * 6, 2, 0, 6.3); c.fill(); }
    c.restore();
    c.fillStyle = rc.c; c.strokeStyle = '#14233f'; c.lineWidth = 4; c.lineJoin = 'round';
    c.font = '700 16px "Rubik", system-ui, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'top';
    c.strokeText(rc.n, 10, 10); c.fillText(rc.n, 10, 10);
  }

function wpos(e) { var b = wcv.getBoundingClientRect(); return { x: (e.clientX - b.left) * 360 / b.width, y: (e.clientY - b.top) * 300 / b.height }; }

function wUp() { wg.press = false; }

function busGuard() { return performance.now() - busOpenAt < 500; }

function renderBus() {
    document.getElementById('busCoins').textContent = save.coins.toLocaleString('ru-RU');
    var box = document.getElementById('busList');
    box.textContent = '';
    var scd = (busFrom && busFrom.cd) || 0;
    var isLink = !!(busFrom && busFrom.link);
    var sd = document.createElement('div'); sd.className = 'upc';
    sd.innerHTML = '<div class="top"><span class="nm">Обыск под остановкой</span><span class="lv">бесплатно</span></div><div class="ds">Загляни под лавку: можно найти пару чекушек или орешек. Потом остановку можно обыскать снова через ' + fmtTime(STOP_CD) + '.</div>';
    var sb = document.createElement('button');
    sb.type = 'button'; sb.className = 'buy' + (scd > 0 ? ' no' : '');
    sb.setAttribute('aria-disabled', scd > 0 ? 'true' : 'false');
    sb.innerHTML = scd > 0 ? '<span>Через ' + fmtTime(scd) + '</span>' : '<span>Обыскать</span>';
    sb.addEventListener('click', function () {
      if (busGuard()) return;
      if ((busFrom.cd || 0) > 0) { sfx('no'); return; }
      var from0 = busFrom;
      closeBusMenu();
      searchStop(from0);
    });
    if (!isLink) { sd.appendChild(sb); box.appendChild(sd); }
    var dests = (isLink ? [] : ALL_STOPS).concat(crossRoutes(busFrom));
    dests.forEach(function (st) {
      if (st === busFrom) return;
      var ok = save.coins >= st.price;
      var d = document.createElement('div'); d.className = 'upc';
      d.innerHTML = '<div class="top"><span class="nm">' + st.name + '</span><span class="lv">' + (st.tag || (st.home ? 'начальная локация' : 'новая локация')) + '</span></div>';
      function go() {
        if (busGuard()) return;
        if (save.coins < st.price) { sfx('no'); toast('Не хватает коинов на билет. Нужно ' + st.price + ', не хватает ' + (st.price - save.coins) + '.', 2500); return; }
        if (bus.on) { sfx('no'); closeBusMenu(); toast('Автобус уже едет. Подожди.', 2500); return; }
        var from = busFrom;
        closeBusMenu();
        if (!callBus(from, st)) return;
        save.coins -= st.price; persist(); hud();
        if (st.price) popup(P.x, PLAYER_H + 30, '\u2212' + st.price + ' ' + coinWord(st.price), '#ffb4b4');
      }
      var priceHtml = st.price ? '<span class="coin"></span><span>' + st.price + '</span>' : '<span>Бесплатно</span>';
      if (busPick && busPick.name === st.name && ok) {
        d.insertAdjacentHTML('beforeend', '<div class="ds">Точно едем в «' + st.name + '»? Автобус сразу вызовется.</div>');
        var two = document.createElement('div'); two.className = 'buy2';
        var bc = document.createElement('button'); bc.type = 'button'; bc.className = 'buy no'; bc.style.cursor = 'pointer'; bc.textContent = 'Отмена';
        bc.addEventListener('click', function () { if (busGuard()) return; busPick = null; renderBus(); });
        var bg = document.createElement('button'); bg.type = 'button'; bg.className = 'buy'; bg.innerHTML = '<span>Ехать</span>' + priceHtml;
        bg.addEventListener('click', go);
        two.appendChild(bc); two.appendChild(bg); d.appendChild(two); box.appendChild(d);
        return;
      }
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'buy' + (ok ? '' : ' no');
      b.setAttribute('aria-disabled', ok ? 'false' : 'true');
      b.innerHTML = priceHtml;
      b.addEventListener('click', function () {
        if (busGuard()) return;
        if (!ok) { sfx('no'); toast('Не хватает коинов на билет.', 2500); return; }
        busPick = st; renderBus();
      });
      d.appendChild(b); box.appendChild(d);
    });
  }

function openBusMenu(from) { busFrom = from; busPick = null; busOpenAt = performance.now(); busOpen = true; syncPause(); renderBus(); busOverlay.hidden = false; if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }

function closeBusMenu() { busOpen = false; syncPause(); busOverlay.hidden = true; if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }

function fBarn(x) {
    var w = 300, h = 170;
    ctx.fillStyle = '#b3302a'; ctx.fillRect(x - w / 2, gY - h, w, h);
    ctx.fillStyle = '#962520'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 14, gY - h); ctx.lineTo(x, gY - h - 90); ctx.lineTo(x + w / 2 + 14, gY - h); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2a1a14'; ctx.fillRect(x - 24, gY - h - 52, 48, 34);
    ctx.fillStyle = '#d8d2c4'; ctx.fillRect(x - 60, gY - 120, 120, 120);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 7; ctx.strokeRect(x - 60, gY - 120, 120, 120);
    ctx.beginPath(); ctx.moveTo(x - 60, gY - 120); ctx.lineTo(x + 60, gY); ctx.moveTo(x + 60, gY - 120); ctx.lineTo(x - 60, gY); ctx.stroke();
  }

function fSilo(x) {
    ctx.fillStyle = '#c9ced6'; ctx.fillRect(x - 36, gY - 240, 72, 240);
    ctx.fillStyle = '#9aa3b2'; ctx.beginPath(); ctx.moveTo(x - 40, gY - 240); ctx.lineTo(x, gY - 290); ctx.lineTo(x + 40, gY - 240); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x + 10, gY - 240, 26, 240);
    ctx.fillStyle = '#7d8798'; for (var i = 1; i < 5; i++) ctx.fillRect(x - 36, gY - 48 * i, 72, 4);
  }

function fFence(a, b) {
    var x;
    ctx.fillStyle = '#a8763e';
    for (x = a; x <= b; x += 56) ctx.fillRect(x - 4, gY - 46, 8, 46);
    ctx.fillRect(a, gY - 38, b - a, 6); ctx.fillRect(a, gY - 20, b - a, 6);
  }

function fHay(x, r) {
    ctx.fillStyle = '#e0b94a'; ctx.beginPath(); ctx.arc(x, gY - r, r, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#b88f2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, gY - r, r * 0.62, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.arc(x, gY - r, r * 0.25, 0, 6.3); ctx.stroke();
  }

function fMill(x) {
    ctx.fillStyle = '#e8e4da'; ctx.beginPath(); ctx.moveTo(x - 34, gY); ctx.lineTo(x - 18, gY - 210); ctx.lineTo(x + 18, gY - 210); ctx.lineTo(x + 34, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#9b6a3a'; ctx.beginPath(); ctx.moveTo(x - 24, gY - 210); ctx.lineTo(x, gY - 242); ctx.lineTo(x + 24, gY - 210); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(x, gY - 200); ctx.rotate(t * 0.9); ctx.fillStyle = '#f4f1e8';
    for (var i = 0; i < 4; i++) { ctx.rotate(1.5708); ctx.fillRect(-6, -108, 12, 106); ctx.fillStyle = i % 2 ? '#f4f1e8' : '#d8d2c4'; ctx.fillRect(6, -108, 22, 62); }
    ctx.restore(); ctx.fillStyle = '#6b4a2a'; ctx.beginPath(); ctx.arc(x, gY - 200, 8, 0, 6.3); ctx.fill();
  }

function fPond(x, w) {
    ctx.fillStyle = '#3f8fc4'; ctx.beginPath(); ctx.ellipse(x, gY + 14, w, 16, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - w * 0.4 + Math.sin(t) * 8, gY + 10, w * 0.35, 2); ctx.fillRect(x + w * 0.1 - Math.sin(t) * 8, gY + 16, w * 0.3, 2);
  }

function fTree(x, h) {
    ctx.fillStyle = '#6b4423'; ctx.fillRect(x - 7, gY - h * 0.35, 14, h * 0.35);
    var c = ['#3e8a3a', '#4aa045', '#58b650'], i;
    for (i = 0; i < 3; i++) { ctx.fillStyle = c[i]; ctx.beginPath(); ctx.moveTo(x - h * (0.36 - i * 0.07), gY - h * (0.28 + i * 0.22)); ctx.lineTo(x, gY - h * (0.6 + i * 0.2)); ctx.lineTo(x + h * (0.36 - i * 0.07), gY - h * (0.28 + i * 0.22)); ctx.closePath(); ctx.fill(); }
  }

function fSign(x) {
    ctx.fillStyle = '#6b4423'; ctx.fillRect(x - 70, gY - 110, 8, 110); ctx.fillRect(x + 62, gY - 110, 8, 110);
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(x - 86, gY - 150, 172, 52); ctx.strokeStyle = '#4a2e14'; ctx.lineWidth = 4; ctx.strokeRect(x - 86, gY - 150, 172, 52);
    ctx.fillStyle = '#ffe9a8'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ЧАЛО ХАУС', x, gY - 124);
  }

function drawFarmBack(x0, x1) {
    setCam(1);
    var i, v = function (x, m) { return x > x0 - m && x < x1 + m; };
    ctx.fillStyle = '#7fb86a'; ctx.beginPath(); ctx.moveTo(x0, gY); for (i = Math.floor(x0 / 160) * 160; i <= x1 + 160; i += 160) ctx.lineTo(i, gY - 70 - 30 * Math.sin(i * 0.004) - 20 * Math.sin(i * 0.011)); ctx.lineTo(x1 + 160, gY); ctx.closePath(); ctx.fill();
    drawGround(); setCam(1);
    for (i = 120; i < 3200; i += 380) if (v(i, 120)) fTree(i, 150 + (i % 3) * 25);
    if (v(380, 160)) fSign(380);
    if (v(1000, 220)) fBarn(1000);
    if (v(1230, 80)) fSilo(1230);
    if (v(2300, 140)) fMill(2300);
    if (v(2850, 300)) fPond(2850, 240);
    for (i = 0; i < 3; i++) if (v(1850 + i * 80, 50)) fHay(1850 + i * 80, 34 - i * 4);
    if (v(2100, 400)) fFence(1960, 2200);
    if (x1 > 560 && x0 < 820) fFence(580, 800);
    // ворота-выход слева
    var ex = FARM.exit;
    if (v(ex, 120)) { ctx.fillStyle = '#6b4423'; ctx.fillRect(ex - 70, gY - 130, 10, 130); ctx.fillRect(ex + 60, gY - 130, 10, 130); ctx.fillRect(ex - 70, gY - 136, 140, 10); ctx.fillStyle = '#ffe9a8'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ВЫХОД', ex, gY - 112); }
    // Меллстрой и профессор
    var mx = FARM.mell;
    if (v(mx, 200)) {
      if (ready(img.mell)) { ctx.fillStyle = '#5a4a3a'; ctx.fillRect(mx - 80, gY - 24, 160, 24); ctx.drawImage(img.mell, 0, 0, 224, 99, mx - 95, gY - 108, 190, 84); }
      sciDraw(FARM.sci, -1, 1, 0, 0);
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Меллстрой', mx, gY - 128); ctx.fillText('Профессор', FARM.sci, gY - 176);
    }
  }

function spotFarm() {
    if (loc.i !== 15 || P.z > 70 || cs.on) return null;
    if (Math.abs(P.x - FARM.exit) < 100) return { btn: 'Уйти', msg: 'Нажми E: вернуться в Больницу', fn: function () { ltGo(9, 'left', 700); }, x: FARM.exit };
    if (Math.abs(P.x - (FARM.mell + 60)) < 260) return { btn: 'Говорить', msg: 'Нажми E: поговорить с Меллстроем и профессором', fn: farmTalk, x: FARM.mell + 60 };
    return null;
  }

function farmTalk() {
    var e = save.mx.c2e | 0, im = mellImg();
    if (farmVisit) { dlgShow('Меллстрой', im, 'Ты в гостях у друга в его вселенной. Решать, мир или геноцид, должен тот, чей это путь. Возвращайся домой, когда захочешь.', [{ t: 'Уйти в Больницу', fn: function () { dlgClose(); farmVisit = false; ltGo(9, 'left', 700); } }, { t: 'Остаться', out: true }]); return; }
    if (e === 1) { dlgShow('Меллстрой', im, 'Ганнеры больше не стреляют. Ферма снова просто ферма. Домой можно идти, когда захочешь.', [{ t: 'Уйти', out: true }]); return; }
    if (e === 2) { dlgShow('Меллстрой', im, 'От вселенной Чикен Гана остался дым. Не оглядывайся.', [{ t: 'Уйти', out: true }]); return; }
    dlgShow('Меллстрой', im, 'Чало Хаус. Ферма в мире Чикен Гана. Моггити мёртв, и мир без него трещит по швам. Решать тебе, Кокич.', [
      { t: 'Что тут вообще происходит?', fn: function () { dlgShow('Профессор', sciPort(), 'Смерть Моггити пробила стену между вселенными. Ганнеры считают нас виновниками. Есть два выхода: договориться с ними и починить их мир, либо сломать эту вселенную до конца.', [{ t: 'Назад', fn: farmTalk }]); } },
      { t: 'Устроить мир', fn: function () { pv('farm1', 'Меллстрой', im, 'Ты уверен? Мир возможен только с Моггити: придётся сделать ещё один разрез времени, воскресить его, а потом вернуть обратно.', [{ t: 'Да, мир', fn: function () { dlgClose(); farmPeace(); } }, { t: 'Назад', fn: farmTalk }]); } },
      { t: 'Массовый геноцид', fn: function () { pv('farm2', 'Меллстрой', im, 'Это разрушит вселенную Чикен Гана целиком. Обратного хода не будет. Придётся победить 50 чикен ганнеров.', [{ t: 'Да, разрушить', fn: function () { dlgClose(); farmGeno(); } }, { t: 'Назад', fn: farmTalk }]); } },
      { t: 'Позже', out: true }
    ]);
  }

function farmPeace() {
    csPlay('c2cut', function () {
      var first = !achOwn.c2peace; save.mx.c2e = 1; if (first) save.coins += 30000; persist(); hud(); ach('c2peace');
      csPlay('c2peace', function () { toast('Мир заключён' + (first ? ' (+30 000 коинов)' : '') + '. Продолжение скоро.', 8000); ltGo(9, 'left', 700); });
    });
  }

function farmGeno() {
    if (p5.on || cs.on || loc.i !== 15) return;
    p5Begin(true);
    toast('Убей 50 чикен ганнеров! Огонь: кнопка «Огонь», магия: кнопка магии.', 6000);
  }

function farmWarWin() {
    p5End('win');
    var first = !achOwn.c2geno; save.mx.c2e = 2; if (first) save.coins += 30000; persist(); hud(); ach('c2geno'); sfx('rare');
    toast('Вселенная Чикен Гана разрушена' + (first ? ' (+30 000 коинов)' : '') + '. Продолжение скоро. Выход слева.', 9000);
  }

function c2Arrive() { farmVisit = false; save.mx.c2 = 2; persist(); ltGo(15, 'left', 520); toast('Чало Хаус. Поговори с Меллстроем и профессором: нужно выбрать, мир или геноцид. Выход слева.', 8000); }

function c2Multi() {
    var n0 = c2n();
    if (n0 === 0) { csPlay('c2wake', function () { save.mx.c2n = 1; persist(); ach('c2wake'); ltGo(BLAB, 'left', 200); }); return; }
    if (n0 === 1) { ltGo(BLAB, 'left', 200); return; }
    csPlay('c2multi', function () { save.mx.c2m = 1; persist(); ach('c2multi'); ltGo(NLAB, 'left', GUN_X - 300); toast('Новая лаборатория: портальная пушка собрана. Выбери вселенную, пройди в неё, победи Кокича, взорви ядро и убеги.', 9000); });
  }

function drawGunStation(x0, x1) {
    if (!save.mx.c2m || GUN_X < x0 - 120 || GUN_X > x1 + 120) return;
    var X = GUN_X, left = 5 - bitCount(save.mx.c2u | 0), col = left ? '120,230,255' : '120,120,140';
    ctx.fillStyle = '#26323c'; ctx.fillRect(X - 50, gY - 30, 100, 30); ctx.fillStyle = '#3a4a58'; ctx.fillRect(X - 6, gY - 110, 12, 80);
    ctx.save(); ctx.translate(X, gY - 120); ctx.rotate(-0.25); ctx.fillStyle = '#56687a'; ctx.fillRect(-14, -16, 100, 32); ctx.fillStyle = '#20303c'; ctx.fillRect(60, -10, 40, 20); ctx.restore();
    csGlow(X + 90, gY - 140, 40 + 8 * Math.sin(t * 4), col, 0.35);
    ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ПУШКА ТЕЛЕПОРТА', X, gY - 170); ctx.fillText(left ? 'вселенных: ' + left : 'цели закончились', X, gY - 154);
  }

function bitCount(v) { var c = 0; while (v) { c += v & 1; v >>= 1; } return c; }

function spotGun() {
    if (true || loc.i !== 12 || !save.mx.c2m || P.z > 70 || cs.on) return null;
    return Math.abs(P.x - GUN_X) < 100 ? { btn: 'Пушка', msg: 'Нажми E: пушка телепорта', fn: gunTalk, x: GUN_X } : null;
  }

function gunTalk() { gunTalkNew(); }

function c2Destroy(k) {
    c2cur = k; var u = C2U[k];
    CS.c2dest[0].say = [[0.4, 'Профессор', 'Цель: ' + u.n + '. Открываю окно.'], [2.6, 'Кокич из ' + u.n.replace('Вселенная ', '').toLowerCase(), u.q], [5, 'Меллстрой', 'Огонь.']].concat(c2n() >= 4 ? [[6.2, c2Leader(), 'Помогаю.']] : []);
    csPlay('c2dest', function () {
      save.mx.c2u = (save.mx.c2u | 0) | (1 << k); persist(); sfx('boom');
      if ((save.mx.c2u | 0) === 31) { ach('c2all'); csPlay('c2end', function () { toast('Все вселенные уничтожены. Продолжение скоро.', 8000); }); }
      else toast(u.n + ' уничтожена. Осталось: ' + (5 - bitCount(save.mx.c2u)) + '.', 4000);
    });
  }

function csSky(c1, c2) {
    var g = ctx.createLinearGradient(0, 0, 0, 430); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(0, 0, 960, 540);
  }

function csFarm(ct, c1, c2, grass) {
    csSky(c1, c2); ctx.fillStyle = '#7fb86a'; ctx.beginPath(); ctx.moveTo(0, 430); for (var i = 0; i <= 960; i += 80) ctx.lineTo(i, 360 - 25 * Math.sin(i * 0.01) - 18 * Math.sin(i * 0.027)); ctx.lineTo(960, 430); ctx.closePath(); ctx.fill();
    var og = gY; gY = 430; fTree(60, 170); fTree(900, 190); fBarn(210); fSilo(420); fMill(820); fHay(600, 30); fHay(660, 26); gY = og;
    flr(grass || '#4e9b34');
  }

function c2n() { var n = save.mx.c2n | 0; if (!n && save.mx.c2m) n = 4; return n; }

function mogAlive() { return (save.mx.mgo | 0) !== 2; }

function c2Leader() { return mogAlive() ? 'Чикен Моггити' : 'Генерал ганнеров'; }

function aLead(x, face, sc, o) { if (mogAlive()) aMogg(x, face, sc, o); else aGun(x, 430, sc * 1.15, 0, 0); }

function flameP(x, h, w, sw) {
    ctx.beginPath(); ctx.moveTo(x - w / 2, gY + 2); ctx.quadraticCurveTo(x - w * 0.6 + sw * 0.3, gY - h * 0.5, x + sw, gY - h); ctx.quadraticCurveTo(x + w * 0.6 + sw * 0.3, gY - h * 0.5, x + w / 2, gY + 2); ctx.closePath(); ctx.fill();
  }

function drawFlames(x0, x1, gap, hh, seed) {
    for (var i = Math.floor(x0 / gap) * gap - gap; i < x1 + gap; i += gap) {
      var f = (Math.abs(i) * 13 + seed) % 7; if (f === 0) continue;
      var x = i + ((Math.abs(i) * 7 + seed) % 50), h = hh * (0.55 + 0.45 * Math.abs(Math.sin(t * 4 + i * 0.37))) * (0.6 + (f % 4) * 0.15), w = 26 + (f % 3) * 12, sw = Math.sin(t * 6 + i) * 6;
      csGlow(x, gY - h * 0.4, h * 0.9, '255,120,30', 0.22);
      ctx.fillStyle = 'rgba(255,90,20,.9)'; flameP(x, h, w, sw);
      ctx.fillStyle = 'rgba(255,190,50,.95)'; flameP(x, h * 0.66, w * 0.6, sw * 0.7);
      ctx.fillStyle = 'rgba(255,245,170,.95)'; flameP(x, h * 0.34, w * 0.3, sw * 0.4);
    }
  }

function drawSmoke(x0, x1, gap, seed) {
    for (var i = Math.floor(x0 / gap) * gap - gap; i < x1 + gap; i += gap) {
      for (var k = 0; k < 6; k++) {
        var dy = (t * 38 + k * 75 + Math.abs(i)) % 450, y = gY - 90 - dy, a = 0.13 * (1 - dy / 450);
        ctx.fillStyle = 'rgba(28,22,22,' + a.toFixed(2) + ')'; ctx.beginPath(); ctx.arc(i + 30 + Math.sin(t + k + seed) * 18 + dy * 0.12, y, 22 + dy * 0.1, 0, 6.3); ctx.fill();
      }
    }
  }

function drawRubble(x0, x1, gap, seed) {
    for (var i = Math.floor(x0 / gap) * gap - gap; i < x1 + gap; i += gap) {
      var x = i + ((Math.abs(i) * 11 + seed) % 90), h = 14 + ((Math.abs(i) * 5 + seed) % 26);
      ctx.fillStyle = '#2a2220'; ctx.beginPath(); ctx.moveTo(x - 40, gY + 2); ctx.lineTo(x - 22, gY - h); ctx.lineTo(x + 4, gY - h * 0.6); ctx.lineTo(x + 24, gY - h * 1.2); ctx.lineTo(x + 44, gY + 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#4a3a30'; ctx.fillRect(x - 30, gY - h - 4, 34, 5); ctx.save(); ctx.translate(x + 10, gY - h * 1.2); ctx.rotate(-0.5); ctx.fillRect(0, 0, 46, 5); ctx.restore();
    }
  }

function fMillRuin(x) {
    ctx.fillStyle = '#4a3a30'; ctx.beginPath(); ctx.moveTo(x - 34, gY); ctx.lineTo(x - 22, gY - 120); ctx.lineTo(x - 8, gY - 100); ctx.lineTo(x + 6, gY - 150); ctx.lineTo(x + 26, gY - 90); ctx.lineTo(x + 34, gY); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(x + 40, gY - 8); ctx.rotate(0.15); ctx.fillStyle = '#6b4a2a'; ctx.fillRect(0, -6, 110, 12); ctx.fillRect(40, -60, 10, 60); ctx.restore();
  }

function fBarnRuin(x) {
    var w = 300;
    ctx.fillStyle = '#4a2a22'; ctx.beginPath(); ctx.moveTo(x - w / 2, gY); ctx.lineTo(x - w / 2, gY - 120); ctx.lineTo(x - 90, gY - 90); ctx.lineTo(x - 40, gY - 150); ctx.lineTo(x + 10, gY - 80); ctx.lineTo(x + 70, gY - 110); ctx.lineTo(x + w / 2, gY - 60); ctx.lineTo(x + w / 2, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1e1412'; ctx.fillRect(x - 60, gY - 90, 120, 90); ctx.strokeStyle = '#6b4a3a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 60, gY - 90); ctx.lineTo(x + 60, gY); ctx.stroke();
    ctx.fillStyle = '#6b4a3a'; ctx.save(); ctx.translate(x - 130, gY - 130); ctx.rotate(-0.7); ctx.fillRect(0, 0, 130, 8); ctx.restore();
  }

function fSiloRuin(x) {
    ctx.fillStyle = '#6a6e74'; ctx.beginPath(); ctx.moveTo(x - 36, gY); ctx.lineTo(x - 36, gY - 150); ctx.lineTo(x - 10, gY - 175); ctx.lineTo(x + 8, gY - 140); ctx.lineTo(x + 36, gY - 160); ctx.lineTo(x + 36, gY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x - 36, gY - 150, 72, 150);
  }

function drawFarmxBack(x0, x1) {
    var i, v = function (x, m) { return x > x0 - m && x < x1 + m; };
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, 'rgba(34,12,10,.85)'); sg.addColorStop(0.55, 'rgba(160,60,22,.55)'); sg.addColorStop(1, 'rgba(90,30,12,.5)'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
    setCam(1);
    ctx.fillStyle = '#3a2c26'; ctx.beginPath(); ctx.moveTo(x0, gY); for (i = Math.floor(x0 / 160) * 160; i <= x1 + 160; i += 160) ctx.lineTo(i, gY - 70 - 30 * Math.sin(i * 0.004) - 20 * Math.sin(i * 0.011)); ctx.lineTo(x1 + 160, gY); ctx.closePath(); ctx.fill();
    drawGround(); setCam(1);
    ctx.fillStyle = 'rgba(30,12,6,.6)'; ctx.fillRect(x0, gY - 2, x1 - x0, H / scale);
    for (i = 120; i < 3200; i += 380) if (v(i, 120)) { ctx.fillStyle = '#2a1a14'; ctx.fillRect(i - 7, gY - 120 - (i % 3) * 20, 14, 120 + (i % 3) * 20); ctx.fillRect(i - 40, gY - 100 - (i % 3) * 20, 40, 6); }
    if (v(380, 160)) { ctx.fillStyle = '#4a3020'; ctx.fillRect(310, gY - 110, 8, 110); ctx.fillRect(442, gY - 110, 8, 110); ctx.save(); ctx.translate(300, gY - 150); ctx.rotate(-0.08); ctx.fillStyle = '#5a3a1e'; ctx.fillRect(0, 0, 172, 52); ctx.fillStyle = '#c9a76a'; ctx.font = '700 22px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ЧАЛО ХАУС', 86, 26); ctx.restore(); }
    if (v(1000, 220)) fBarnRuin(1000);
    if (v(1230, 80)) fSiloRuin(1230);
    if (v(2000, 140)) fMillRuin(2000);
    drawRubble(x0, x1, 330, 9);
    // ворота-выход слева
    // машина телепорта
    var X = MACH_X;
    if (v(X, 160)) {
      ctx.fillStyle = '#26323c'; ctx.fillRect(X - 70, gY - 24, 140, 24); ctx.fillStyle = '#3a4a58'; ctx.fillRect(X - 56, gY - 40, 112, 16);
      var sp = 0.8 + 0.2 * Math.sin(t * 3); csGlow(X, gY - 120, 120 * sp, '120,230,255', 0.35);
      ctx.strokeStyle = '#6fd6ff'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(X, gY - 120, 64, 0, 6.3); ctx.stroke();
      ctx.save(); ctx.translate(X, gY - 120); ctx.rotate(t * 1.2); ctx.strokeStyle = 'rgba(190,240,255,.9)'; ctx.lineWidth = 3; for (var q = 0; q < 5; q++) { ctx.rotate(1.2566); ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(54, 0); ctx.stroke(); } ctx.restore();
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('МАШИНА ТЕЛЕПОРТА', X, gY - 208);
    }
    // Меллстрой и профессор
    var mx = MACH_X - 280;
    if (v(mx, 200)) {
      if (ready(img.mell)) { ctx.fillStyle = '#5a4a3a'; ctx.fillRect(mx - 80, gY - 24, 160, 24); ctx.drawImage(img.mell, 0, 0, 224, 99, mx - 95, gY - 108, 190, 84); }
      sciDraw(mx + 160, 1, 1, 0, 0);
      ctx.fillStyle = '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Меллстрой', mx, gY - 128); ctx.fillText('Профессор', mx + 160, gY - 176);
    }
    var big = c2n() < 4;
    drawFlames(x0, x1, big ? 210 : 420, big ? 170 : 110, 7); drawSmoke(x0, x1, 400, 4);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (v(150, 120)) { ctx.fillText('◀ Лаборатория', 150, gY - 70); }
  }

function spotLabx() {
    if (true || loc.i !== 12 || c2n() < 1 || P.z > 70 || cs.on) return null;
    return Math.abs(P.x - LABX_X) < 100 ? { btn: 'Выход', msg: 'Нажми E: выйти к ферме (руины Чало Хауса)', fn: function () { ltGo(17, 'left', 260); }, x: LABX_X } : null;
  }

function spotFarmx() {
    if (loc.i !== 17 || P.z > 70 || cs.on) return null;
    if (Math.abs(P.x - MACH_X) < 120) return { btn: 'Машина', msg: 'Нажми E: машина телепорта', fn: machineTalk, x: MACH_X };
    if (Math.abs(P.x - (MACH_X - 280)) < 240) return { btn: 'Говорить', msg: 'Нажми E: поговорить с Меллстроем и профессором', fn: farmxTalk, x: MACH_X - 280 };
    return null;
  }

function farmxTalk() {
    var n = c2n(), im = mellImg();
    if (n >= 4) { dlgShow('Меллстрой', im, 'Ферма так и осталась руинами. Зато Чикен Ган теперь с нами. Пушка телепорта ждёт в лаборатории.', [{ t: 'Понял', out: true }]); return; }
    dlgShow('Меллстрой', im, 'Это Чало Хаус после боя соседних вселенных. Огонь не гаснет. Единственный путь отсюда: машина телепорта. Она переносит во вселенную Чикен Гана.', [{ t: 'Что там нас ждёт?', fn: function () { dlgShow('Профессор', sciPort(), 'Чикен Моггити, если он жив. Он помнит всё, что ты сделал с временем. Он будет зол, но больше нам идти некуда.', [{ t: 'Ясно', out: true }]); } }, { t: 'Хорошо', out: true }]);
  }

function machineTalk() {
    var n = c2n();
    if (n < 4 && save.mx.rbo) { dlgShow('Машина телепорта', sciPort(), 'Лагерь бунта Чикен Гана на связи. Вернуться туда?', [{ t: 'В лагерь бунта', fn: function () { dlgClose(); ltGo(CGC, 'left', 600); } }, { t: 'Позже', out: true }]); return; }
    if (n >= 4) { dlgShow('Машина телепорта', sciPort(), 'Машина настроена на вселенную Чикен Гана. Дальше действует пушка телепорта в лаборатории.', [{ t: 'Назад', out: true }]); return; }
    dlgShow('Профессор', sciPort(), 'Машина телепорта цела, ты сам её создал. Она выведет нас во вселенную Чикен Гана. Готов?', [
      { t: 'Запустить машину', fn: function () { dlgClose(); c2cgStart(); } },
      { t: 'Позже', out: true }
    ]);
  }

function c2cgStart() {
    var L = c2Leader(), me = mogAlive();
    CS.c2cg[1].say = [[0.4, 'Рассказчик', 'Из тумана выходит ' + (me ? 'Чикен Моггити' : 'ганер-капитан, командир местных ганнеров') + '.'], [3.4, L, me ? 'Ты… Я тебя помню. Это ты ломал петли времени.' : 'Я тебя знаю. Ты тот, кто ломал время.'], [6.8, L, 'Из-за тебя открылись десятки вселенных. В каждой свой Кокич. Они рвут мультивселенную, и мой мир тоже.'], [10.4, 'Кокич', 'Я не хотел. Мы пытались спастись.']];
    csPlay('c2cg', function () {
      dlgShow(L, me ? img.mogg : null, 'Твои вселенные могут уничтожить даже Чикен Ган. Но у меня есть предложение. Сначала мы устроим бунт: разработчики готовят обновление, а мы им покажем, кто здесь главный.', [
        { t: 'Что за сделка?', fn: function () {
          pv('deal', L, me ? img.mogg : null, 'Вы помогаете мне поднять бунт в Чикен Гане. Это не щелчок пальцами: нужно поставить пиратские флаги, создать сервера «бунт чг» и привлечь ютуберов. Тогда выйдет обновление, и игра станет лучше для всех. Мне больше ничего не надо, я просто хочу, чтобы она обновилась. Взамен я помогу вам с лишними вселенными. По рукам?', [
            { t: 'По рукам', fn: function () { dlgClose(); c2RiotStart(); } },
            { t: 'Мне надо подумать', out: true }
          ]); } }
      ]);
    });
  }

function csFlamesCs(ct, n, hh) { for (var i = 0; i < n; i++) { var x = 40 + i * (880 / n) + (i % 3) * 14, h = hh * (0.6 + 0.4 * Math.abs(Math.sin(ct * 4 + i))); csGlow(x, 430 - h * 0.4, h, '255,120,30', 0.25); ctx.fillStyle = 'rgba(255,90,20,.9)'; var og = gY; gY = 430; flameP(x, h, 34, Math.sin(ct * 6 + i) * 6); ctx.fillStyle = 'rgba(255,200,60,.95)'; flameP(x, h * 0.6, 20, Math.sin(ct * 6 + i) * 4); gY = og; } }

function cjHere() { return avOwns(3) && save.avSel === 3 && !av.on && !avBroken() && loc.i === save.avLoc; }

function cjW() { return save.cj === 2 ? Math.min(0.55, 0.05 * (save.cjn | 0)) : 0; }

function cjLoad() {
    if (save.cj !== 1) return;
    save.cj = 2; persist(); sfx('rare'); popup(P.x, PLAYER_H + 30, 'Груз на борту', '#9dffb8');
    toast('Груз загружен: ' + save.cjn + ' шт. Он тяжёлый: подъём медленнее на ' + Math.round(cjW() * 100) + '%, скорость ниже. Лети на Мальдивы, посади борт и разгрузись. Не разбей самолёт: груз пропадёт.', 7500);
  }

function cjUnload() {
    if (save.cj !== 2) return;
    var pay = save.cjp | 0; save.coins += pay; save.cj = 0; save.cjn = 0; save.cjp = 0; save.cjd = (save.cjd | 0) + 1;
    persist(); hud(); sfx('rare'); ach('cargo'); popup(P.x, PLAYER_H + 30, '+' + fmtN(pay), '#ffd23f');
    toast('Груз доставлен. Пилот заплатил ' + fmtN(pay) + ' ' + coinWord(pay) + '. Возвращайся за новым заказом в аэропорт.', 6000);
  }

function pilotTalk() {
    var im = img.npcPilot, who = 'Командир Кур-Пилот';
    if (!avOwns(3)) { dlgShow(who, im, 'Я нанимаю только на грузовой. Купи его в ангаре и приходи: плачу очень прилично.', [{ t: 'Понял', out: true }]); return; }
    if (save.cj === 1) { dlgShow(who, im, 'Груз ждёт. Подгони грузовой к платформе позади самолёта (подойди к борту, нажми E) и загрузи ' + save.cjn + ' шт. Потом на Мальдивы. Заплачу ' + fmtN(save.cjp) + '.', [{ t: 'Понял', out: true }, { t: 'Отменить заказ', fn: function () { save.cj = 0; persist(); dlgClose(); toast('Заказ отменён.', 2500); } }]); return; }
    if (save.cj === 2) { dlgShow(who, im, 'Груз уже на борту. Лети на Мальдивы, садись и разгружайся у самолёта. Плачу ' + fmtN(save.cjp) + '.', [{ t: 'Понял', out: true }]); return; }
    var ch = [];
    CJ_KINDS.forEach(function (k, ki) {
      ch.push({ t: 'Взять заказ: ' + k.n + ' на Мальдивы', fn: function () {
        var n = k.lo + Math.floor(Math.random() * (k.hi - k.lo + 1)), unit = Math.round((k.p0 + Math.random() * (k.p1 - k.p0)) / 100) * 100, pay = unit * n;
        save.cj = 1; save.cjn = n; save.cjp = pay; persist(); sfx('pick'); dlgClose();
        toast('Заказ: ' + n + ' шт. по ' + fmtN(unit) + ' за штуку, итого ' + fmtN(pay) + '. Подойди к своему грузовому (на стоянке) и нажми E, чтобы загрузить груз на платформу.', 7000);
      } });
    });
    ch.push({ t: 'Не сейчас', out: true });
    dlgShow(who, im, 'Работа для грузового есть всегда. Мне нужно возить кейсы с чекушками и всякое на Мальдивы, плачу очень прилично: от 3000 до 10000 за рейс, чем больше груза, тем выше плата. Но с тяжёлым грузом самолёт хуже набирает высоту и летит медленнее. ' + (save.cjd ? 'Доставлено заказов: ' + save.cjd + '.' : 'Загрузишь на платформу позади борта, разгрузишь на месте.'), ch);
  }

function spotCj() {
    if (cs.on || P.z > 70 || av.on) return null;
    if (loc.i === 3 && Math.abs(P.x - PILOT_X) < 80) return { btn: 'Пилот', msg: 'Нажми E: поговорить с пилотом (грузовые заказы)', fn: pilotTalk, x: PILOT_X };
    if (save.cj === 1 && loc.i === 3 && cjHere() && Math.abs(P.x - save.avX) < 220) return { btn: 'Загрузить', msg: 'Нажми E: загрузить груз на платформу (' + save.cjn + ' шт.)', fn: cjLoad, x: save.avX };
    if (save.cj === 2 && loc.i === 4 && cjHere() && Math.abs(P.x - save.avX) < 220) return { btn: 'Разгрузить', msg: 'Нажми E: разгрузить груз (плата ' + fmtN(save.cjp) + ')', fn: cjUnload, x: save.avX };
    return null;
  }

function drawCasesAt(x, n) {
    for (var i = 0; i < n; i++) { var cx = x + (i % 4) * 26 - 40, cy = gY - 22 - Math.floor(i / 4) * 22; ctx.fillStyle = '#8a6a3a'; ctx.fillRect(cx, cy, 24, 20); ctx.strokeStyle = '#4a3418'; ctx.lineWidth = 2; ctx.strokeRect(cx, cy, 24, 20); ctx.fillStyle = '#d9c28a'; ctx.fillRect(cx + 10, cy, 4, 20); }
  }

function drawCargoWork(x0, x1) {
    if (loc.i === 3 && PILOT_X > x0 - 120 && PILOT_X < x1 + 120) {
      var ip = img.npcPilot;
      if (ready(ip)) {
        var h = 160, w = h * ip.naturalWidth / ip.naturalHeight; ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(PILOT_X, gY + 3, w * 0.34, 6, 0, 0, 6.3); ctx.fill();
        ctx.save(); ctx.translate(PILOT_X, gY); ctx.scale(-1, 1); ctx.drawImage(ip, -w / 2, -h, w, h); ctx.restore();
      }
      ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 4; ctx.strokeStyle = '#14233f'; ctx.strokeText('Командир Кур-Пилот', PILOT_X, gY - 176); ctx.fillStyle = '#9fe3ff'; ctx.fillText('Командир Кур-Пилот', PILOT_X, gY - 176);
      if (avOwns(3) && !save.cj) { ctx.font = '700 22px system-ui, sans-serif'; ctx.fillStyle = '#ffd23f'; ctx.strokeText('!', PILOT_X, gY - 196); ctx.fillText('!', PILOT_X, gY - 196); }
    }
    if ((loc.i === 3 || loc.i === 4) && save.cj && cjHere() && Math.abs(save.avX - (x0 + x1) / 2) < 900) {
      var px = save.avX - 190; if (px > x0 - 100 && px < x1 + 100) {
        ctx.fillStyle = '#4a5360'; ctx.fillRect(px - 60, gY - 8, 120, 8); ctx.fillStyle = '#e8c23a'; ctx.fillRect(px - 60, gY - 8, 120, 3);
        if ((save.cj === 1 && loc.i === 3)) drawCasesAt(px, save.cjn);
        if (save.cj === 2 && loc.i === 4) drawCasesAt(px, save.cjn);
        ctx.fillStyle = '#fff'; ctx.font = '700 12px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(save.cj === 1 ? 'ЗАГРУЗКА' : 'РАЗГРУЗКА', px, gY - 110);
      }
    }
  }

function sqSuper() { return (save.sqFed | 0) >= 15; }

function sqBuffed() { return sqSuper() || sqBuf > 0; }

function feedArmy() {
    if (save.army <= 0) { sfx('no'); toast('Сначала приручи белку.', 2500); return; }
    if (save.nuts <= 0) { sfx('no'); toast('Орешков нет. Купи их в гараже.', 2500); return; }
    if (sqSuper()) { sfx('no'); toast('Белки уже навсегда на пике силы.', 2500); return; }
    save.nuts--; save.sqFed = (save.sqFed | 0) + 1; sqBuf = 30; persist(); hud(); sfx('rare');
    for (var i = 0; i < pets.length; i++) { burst(pets[i].x, gY - SQ_H, 6, '#ffd23f', 200, 0.8); pets[i].ft = Math.min(pets[i].ft, 0.4 + i * 0.25); }
    if (sqSuper()) { ach('sqbuf'); toast('15 орешков съедено: белки навсегда стали имбовыми. Редкие чекушки они приносят всегда.', 7000); }
    else toast('Белки наелись: 30 секунд они приносят самые редкие чекушки (' + save.sqFed + ' из 15 орешков для вечного баффа).', 5000);
    sqRender();
  }

function apCan(b) { if (b.sup) return true; var f = music.apf; return !f || !!f[b.secret ? 6 : (b.r | 0)]; }

function apfRender() {
    if (!apfBox) apfBox = document.getElementById('apfRows'); if (!apfBox) return;
    apfBox.textContent = '';
    var names = RAR.map(function (r) { return r.n; }).concat(['Секретная']), cols = RAR.map(function (r) { return r.c; }).concat(['#ffffff']);
    for (var i = 0; i < 7; i++) (function (i) {
      var on = !!(music.apf && music.apf[i]), row = document.createElement('div'); row.className = 'sqrow' + (on ? ' on' : ''); row.setAttribute('role', 'button'); row.tabIndex = 0;
      var d = document.createElement('span'); d.className = 'dot'; d.style.background = cols[i];
      var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = names[i];
      var st = document.createElement('span'); st.className = 'st'; st.textContent = on ? 'подбирать' : 'не подбирать';
      row.appendChild(d); row.appendChild(nm); row.appendChild(st);
      var tog = function () { music.apf[i] = music.apf[i] ? 0 : 1; saveMusic(); apfRender(); sfx('pick'); };
      row.addEventListener('click', tog); row.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      apfBox.appendChild(row);
    })(i);
  }

function aCrewK(x, face, sc, o, step) {
    var n = crew ? crew.length : 1, i;
    for (i = 0; i < n; i++) {
      var xx = x + (i - (n - 1) / 2) * (step || 90) * sc, oo = {}, kk2; for (kk2 in (o || {})) oo[kk2] = o[kk2];
      if (oo.rot) oo.rot *= (i % 2 ? -1 : 1); oo.dy = (oo.dy || 0) - (i % 2) * 6;
      if (i === 0 || !crew) aKok(xx, face, sc, oo); else aSprite(skinImg(crew[i].s), xx, face, 150 * sc, oo);
    }
  }

function altPrep() {
    if (!ALT0) ALT0 = [CS.altgun[0].say.slice(), CS.altgun[1].say.slice()];
    var a = ALT0[0].slice(), b = ALT0[1].slice(), n = crew ? crew.length : 1, tx = ['Я с тобой, Кокич!', 'И я здесь!', 'Держимся вместе!'], i;
    for (i = 1; i < n; i++) a.push([5.2 + i * 0.7, crew[i].n || 'Кокич', tx[i - 1]]);
    if (n > 1) b[1] = [4.2, 'Чикен ганер', 'СТОЯТЬ! Вас ' + n + ' Кокича, и вы убили Чикена Моггити. Руки вверх, всех обыщем!'];
    CS.altgun[0].say = a; CS.altgun[1].say = b;
  }

function invTotal() {
    var s = 0, r; for (r = 0; r < RAR.length; r++) s += (save.inv.d[r] + save.inv.c[r] * CLEAN_MULT) * RAR[r].m * save.rate;
    s += (save.sec | 0) * 100 * save.rate + save.wool * WOOL_PRICE; return s * (1 + 0.15 * (save.superSp || 0));
  }

function partyOn() { return !!(party.on && socket && net.room && net.state === 'online' && party.ids.length > 1); }

function partyHost() { return !!socket && party.host === socket.id; }

function storyEmit(o) { if (partyOn()) { try { socket.emit('story', o); } catch (e) {} } }

function partySet(ids) {
    if (ids && ids.length > 1) { party.on = true; party.ids = ids.slice(0, 4); party.host = ids[0]; party.pend = null; party.vote = null; }
    else { party.on = false; party.ids = []; party.host = ''; party.pend = null; party.vote = null; }
  }

function pv(id, who, im, text, opts) {
    if (!partyOn() || !partyHost()) { dlgShow(who, im, text, opts); return; }
    party.vote = { id: id, opts: opts };
    storyEmit({ vote: { id: id, who: who, text: text, o: opts.map(function (o) { return String(o.t).slice(0, 60); }) } });
    dlgShow(who + ' · голосование', im, text, opts.map(function (o, i) { return { t: o.t, out: o.out, fn: function () { pvBallot(id, i); } }; }), 'Решает большинство голосов группы. Время: 20 секунд.');
  }

function pvBallot(id, i) {
    storyEmit({ bal: { id: id, i: i } });
    dlgShow('Голосование', null, 'Твой голос принят. Ждём остальных…', []);
  }

function storyMsg(m) {
    if (!m || typeof m !== 'object' || !partyOn()) return;
    var i, j;
    if (m.hn !== undefined) { if (!hn.on && !partyHost() && loc.i === 23) { dlgClose(); hnStart(false, m.hn === 'f' ? 'f' : (m.hn === 'h' ? 'h' : 'f'), true, Math.max(1, Math.min(5, m.hnN | 0 || 1))); } return; }
    if (m.hs !== undefined) { if (hn.on && hn.asst) hnApply(m.hs); return; }
    if (m.hm !== undefined) { if (hn.on && hn.asst && Array.isArray(m.hm)) hnMsg(String(m.hm[0]).slice(0, 120), Math.min(8, +m.hm[1] || 3), true); return; }
    if (m.he !== undefined) { if (hn.on && hn.asst && hn.over <= 0 && hn.win <= 0) { if (m.he === 'w') hn.win = 0.01; else hnEnd(false, m.he === 'q', true); } return; }
    if (m.hp !== undefined) { if (hn.on && !hn.asst && hn.over <= 0 && hn.win <= 0) { var hk = Math.floor(+m.hp); if (hk >= 0 && hk <= 5 && hk !== 4) hnDo(hk); } return; }
    if (m.hc !== undefined) { if (hn.on && !hn.asst && Array.isArray(m.hc)) hn.camV[String(m.hc[0]).slice(0, 30)] = Math.max(0, Math.min(5, m.hc[1] | 0)); return; }
    if (m.cs && typeof m.cs === 'string' && CS[m.cs] && !partyHost()) {
      if (cs.on || boss.on || kk.on || (p6.on && !p6.asst)) return;
      if (Array.isArray(m.sy)) for (i = 0; i < CS[m.cs].length && i < m.sy.length; i++) {
        var sy = m.sy[i]; if (!Array.isArray(sy) || sy.length > 16) continue; var ok = [];
        for (j = 0; j < sy.length; j++) { var q = sy[j]; if (Array.isArray(q) && q.length === 3 && typeof q[0] === 'number' && typeof q[1] === 'string' && typeof q[2] === 'string') ok.push([q[0], q[1].slice(0, 40), q[2].slice(0, 300)]); }
        if (sy.length === ok.length) CS[m.cs][i].say = ok;
      }
      if (typeof m.k === 'number' && m.k >= 0 && m.k < C2U.length) c2cur = m.k | 0;
      dlgClose(); csMirror = true; if (p5.on) p5Go('cs');
      csPlay(m.cs, function () { if (p5.on && p5.st === 'cs') p5Go('fight'); });
      csMirror = false;
    } else if (m.fst && !partyHost()) {
      var f = m.fst.f ? 1 : 0, st = Math.floor(+m.fst.st) || 1;
      if (p5.on && p5.assist) { if (p5.stage !== st) p5Stage(st); } else if (!p5.on) party.pend = { f: f, st: st };
    } else if (m.fe && !partyHost()) {
      party.pend = null;
      if (p5.on && p5.assist) { var w = m.fe === 'win', wasU = p5.uni, uk2 = p5.uv, wasF = p5.farm; p5End(w ? 'win' : 'leave'); if (wasU) uniGuestEnd(w, uk2); else { toast(w ? 'Бой выигран всей группой!' : 'Бой окончен.', 4000); if (w && !wasF) p5GuestCredit(); } }
    } else if (m.un !== undefined && !partyHost()) {
      var uk = Math.floor(+m.un);
      if (uk >= 0 && uk < C2U.length && (save.mx.c2m || uk === 8 || uk === 9) && !p5.on && !cs.on && !boss.on && !kk.on && !p6.on && !fin.on && !lt.st) { uniAssist = true; uniPend = uk; uniV = uk; c2cur = uk; dlgClose(); ltGo(UNI, 'left', UNI_PORTAL + 140); }
    } else if (m.ub && !partyHost() && p5.on && p5.assist && p5.uni && typeof m.ub === 'object') {
      var ue = uniBoss(), uv = Math.floor(+m.ub.v), um = Math.max(1, Math.min(6000, +m.ub.m || 1)), uh = Math.max(0, Math.min(um, +m.ub.h || 0));
      if (ue && uv >= 0 && uv < UV.length) {
        if (ue.v !== uv) { ue.v = uv; ue.name = UV[uv].n; ue.ph = 1; ue.atk = ''; ue.cd = 2.5; ue.r = uv === 2 ? 70 : 60; p5.es.length = 0; p5.glit = 1; p5.flash = 0.8; sfx('boom'); p5Title(UV[uv].n, UV[uv].t, 3); }
        ue.max = um; ue.hp = Math.max(1, uh);
        if (m.ub.d) { ue.atk = ''; ue.cd = 99; p5.es.length = 0; }
      }
    } else if (m.epj && !partyHost()) {
      if (!ep.on && loc.i === 6 && !save.mx.er) { epAs = true; epStart(); epAs = false; if (ep.on) toast('Бой с Хоумлендером вместе: бей его донат-магией, итог решает ведущий.', 5000); }
    } else if (m.es && !partyHost() && ep.on && ep.assist) { epApply(m.es);
    } else if (m.el && !partyHost() && ep.on && ep.assist && Array.isArray(m.el)) { epSay(String(m.el[0]).slice(0, 120), Math.max(0.5, Math.min(8, +m.el[1] || 2.5)));
    } else if (m.et && !partyHost() && ep.on && ep.assist && Array.isArray(m.et)) { epTitle(String(m.et[0]).slice(0, 60), String(m.et[1]).slice(0, 100), Math.max(0.5, Math.min(8, +m.et[2] || 2.5)));
    } else if (m.ew !== undefined && !partyHost() && ep.on && ep.assist) {
      ep.fail = !!m.ew; epWin(); ep.st = 'end'; ep.on = false; ep.pm = 1; ep.pf = 1; ep.bar = 0; setTimeout(function () { partySet(null); }, 700);
    } else if (m.ee && !partyHost() && ep.on && ep.assist) { epEnd('leave'); toast('Бой с Хоумлендером окончен.', 3500);
    } else if (m.ed !== undefined && partyHost() && ep.on && !ep.assist) { epHit(Math.max(0, Math.min(200, +m.ed || 0)));
    } else if (m.eat && partyHost() && ep.on && !ep.assist && ep.st === 'food' && Array.isArray(m.eat)) {
      for (i = 0; i < ep.burgs.length; i++) if (ep.burgs[i].id === m.eat[0]) { var eb = ep.burgs[i]; ep.pc += eb.v; if (ep.tgt === eb) ep.tgt = null; ep.burgs.splice(i, 1); sfx('gulp'); break; }
    } else if (m.p6 && !partyHost()) { p6Guest();
    } else if (m.p6s !== undefined && !partyHost() && p6.on && p6.asst) {
      if (m.p6s === 'play') { p6.st = 'play'; p6Say('Помогай профессору: собери детали Часореза (антенна, верстак, кабинет).', 6); }
      else if (m.p6s === 'rift') p6Cut();
      else if (m.p6s === 'end') { var okp = p6.rt > 4; p6End(); if (okp) { if (!save.mx.p6) { save.mx.p6 = 1; ach('fin6'); toast('Часть 6 засчитана и тебе: вы прошли её вместе.', 5000); } save.coins += 5000; persist(); hud(); sfx('rare'); toast('Часорез сработал! Награда за помощь: 5 000 коинов.', 6000); } }
    } else if (Array.isArray(m.p6got) && !partyHost() && p6.on && p6.asst) {
      p6.got = [m.p6got[0] ? 1 : 0, m.p6got[1] ? 1 : 0, m.p6got[2] ? 1 : 0]; if (p6.st !== 'rift') p6.crack = (p6.got[0] + p6.got[1] + p6.got[2]) / 3 * 0.4;
    } else if (m.p6k !== undefined && partyHost() && p6.on && !p6.asst && p6.st === 'play') {
      var pk6 = Math.floor(+m.p6k);
      if (pk6 >= 0 && pk6 < 3 && !p6.got[pk6]) { p6.got[pk6] = 1; p6.crack = (p6.got[0] + p6.got[1] + p6.got[2]) / 3 * 0.4; sfx('rare'); toast('Друг собрал деталь: ' + P6S[pk6].part + ' (' + (p6.got[0] + p6.got[1] + p6.got[2]) + '/3)', 3500); p6Share(pk6); if (p6.got[0] && p6.got[1] && p6.got[2]) p6Say('Все детали собраны! Иди к Часорезу справа.', 5); }
    } else if (m.p6c && partyHost() && p6.on && !p6.asst && p6.st === 'play' && p6.got[0] && p6.got[1] && p6.got[2]) { p6Cut();
    } else if (m.pk && partyHost() && p5.on && !p5.assist) {
      p5.kills += Math.max(1, Math.min(20, Math.floor(+m.pk) || 1));
    } else if (m.pd && partyHost() && p5.on && !p5.assist && p5.st === 'fight') {
      var n = Math.max(0, Math.min(200, +m.pd || 0));
      for (i = 0; i < p5.en.length; i++) { var e = p5.en[i]; if ((e.k === 'm' || e.k === 'bs' || (e.k === 'kk' && p5.uni)) && !e.ghost && !e.dead) { e.hp -= n; e.fl = 0.15; popup(e.x, e.r * 2 + (e.y || 0), '−' + Math.round(n), '#9dffb8'); if (e.hp <= 0) { e.dead = true; p5Kill(e); } break; } }
    } else if (m.vote && !partyHost() && m.vote.o && Array.isArray(m.vote.o)) {
      var v = m.vote, lab = v.o.slice(0, 6).map(function (x) { return String(x).slice(0, 60); }), vid = String(v.id || '').slice(0, 20);
      party.vote = { id: vid, labels: lab };
      dlgShow(String(v.who || 'Голосование').slice(0, 40) + ' · голосование', null, String(v.text || '').slice(0, 400), lab.map(function (t, k) { return { t: t, fn: function () { pvBallot(vid, k); } }; }), 'Решает большинство голосов группы. Время: 20 секунд.');
    } else if (m.res) {
      var rid = String(m.res.id || ''), ri = Math.floor(+m.res.i) || 0;
      if (!party.vote || party.vote.id !== rid) return;
      var pvv = party.vote; party.vote = null; dlgClose();
      if (partyHost() && pvv.opts) { var op = pvv.opts[ri] || pvv.opts[0]; toast('Голосование: выбрано «' + op.t + '»', 3000); if (op.fn) op.fn(); }
      else if (pvv.labels) toast('Голосование: выбрано «' + (pvv.labels[ri] || pvv.labels[0]) + '»', 4000);
    }
  }

function p5GuestCredit() {
    if ((save.mx.p5 | 0) >= 6) return;
    save.mx.p5 = 6; var first = !save.mx.p5r; if (first) { save.mx.p5r = 1; save.coins += 100000; }
    persist(); hud(); ach('fin5'); sfx('rare');
    toast('Конец 5 части засчитан и тебе: вы прошли её вместе.' + (first ? ' +100 000 коинов.' : ''), 7000);
  }

function uniGuestEnd(w, k) {
    if (k >= 6) { toast(w ? (k === 8 ? 'Ктулху и Моггити повержены вместе!' : 'Бой вместе окончен: решение приняло ведущее окно.') : 'Бой во вселенной окончен.', 4000); if (k === 8) { ach('mgct'); ltGo(14, 'left', K8_X - 150); } else if (k === 9) { ltGo(25, 'left', 2450); if (w && (save.mx.hv | 0) < 3) { save.mx.hv = 3; save.coins += 100000; persist(); hud(); toast('Судью победили вместе. Концовка небес засчитана и тебе: +100 000 коинов.', 6000); } } else ltGo(NLAB, 'left', GUN_X - 250); return; }
    var first = k === 6 ? !save.mx.c2p : !(((save.mx.c2u | 0) >> k) & 1);
    if (w) { if (k === 6) save.mx.c2p = 1; else save.mx.c2u = (save.mx.c2u | 0) | (1 << k); save.coins += first ? (k === 6 ? 40000 : 10000) : 3000; persist(); hud(); sfx('rare'); ach('c2k' + k); toast(C2U[k].n + ' пройдена вместе. Награда: ' + (first ? (k === 6 ? '40 000' : '10 000') : '3 000') + ' коинов.', 6000); }
    else toast('Бой во вселенной окончен.', 3500);
    ltGo(NLAB, 'left', GUN_X - 250);
  }

function partyTick() {
    if (!party.pend || p5.on || cs.on || lt.st || dlgOpened || !partyOn()) return;
    var pd = party.pend, need = pd.f ? 15 : 11;
    if (loc.i !== need) { if (!pd.mv) { pd.mv = true; ltGo(need, 'left', pd.f ? 520 : RIT_X - 320); } return; }
    party.pend = null; fin.on = false; fin.guest = false; fin.ox = 0; rit.glow = 0;
    p5Begin(!!pd.f, pd.st); toast('Бой вместе: бей врагов, твои удары и победы идут в общий счёт. Результат решает ведущий.', 5000);
  }

function hudArrowApply() { document.body.classList.toggle('hudoff', hudOff); hudArrow.setAttribute('aria-expanded', hudOff ? 'false' : 'true'); hudArrow.title = hudOff ? 'Показать баланс и чекушки' : 'Скрыть баланс и чекушки'; }

function fmtDur(x) { x = Math.floor(x); var h = Math.floor(x / 3600), m = Math.floor(x % 3600 / 60), c = x % 60; return (h ? h + ' ч ' : '') + (h || m ? m + ' мин ' : '') + c + ' с'; }

function playSave() { try { localStorage.setItem('chekushka-playtime', String(Math.round(PLAY.total))); } catch (e) {} }

function playUi() { var k = Math.floor(PLAY.sess); if (k === PLAY.shown) return; PLAY.shown = k; elPlay.textContent = 'Эта сессия: ' + fmtDur(PLAY.sess) + ' · всего в игре: ' + fmtDur(PLAY.total); }

function playTick(sec) { if (!(sec > 0 && sec < 1)) return; PLAY.sess += sec; PLAY.total += sec; PLAY.sv += sec; if (PLAY.sv >= 10) { PLAY.sv = 0; playSave(); } if (settingsOpen) playUi(); }

function avPumpX() { return loc.i === 3 ? AV_PUMP : (loc.i === 4 ? AV_PUMP4 : -1); }

function avEngLv(t) { return ((save.avEng | 0) >> ((t - 1) * 2)) & 3; }

function avT() {
    var T = AV[save.avSel]; if (!T) return null; var L = avEngLv(save.avSel); if (!L) return T;
    var k = save.avSel + ':' + L;
    if (avTc.k !== k) { var o = {}, q; for (q in T) o[q] = T[q]; o.sp = Math.round(T.sp * (1 + 0.1 * L)); if (T.acc) o.acc = Math.round(T.acc * (1 + 0.12 * L)); o.burn = T.burn * (1 + 0.08 * L); o.eng = L; avTc = { k: k, o: o }; }
    return avTc.o;
  }

function engCost(t) { var L = avEngLv(t); return L >= 3 ? 0 : Math.round(ENG_PRICE[L] * ENG_MULT[t]); }

function engBuy(t) {
    var L = avEngLv(t), p = engCost(t);
    if (!avOwns(t) || L >= 3) return;
    if (save.coins < p) { sfx('no'); toast('Не хватает коинов: улучшение двигателя стоит ' + fmtN(p) + '.', 3000); return; }
    save.coins -= p; save.avEng = (save.avEng | 0) + (1 << ((t - 1) * 2)); avTc.k = ''; persist(); hud(); sfx('rare');
    toast(AV[t].n + ': двигатель ур. ' + (L + 1) + '. Скорость +10%, тяга +12%, расход топлива +8% за уровень.', 5000);
  }

function avCap() { var T = avT(); return T ? T.cap : 0; }

function avPrice() { return Math.max(1, Math.round(fuelPrice() * 0.8)); }

function avOwns(t) { return !!(save.avOwn & (1 << (t - 1))); }

function avMaxH() { return Math.max(120, Math.min(360, gY - 130)); }

function avPark(l, x) { save.avLoc = l; save.avX = x; persist(); }

function avForceExit() {
    if (!av.on) return;
    av.on = false; av.v = 0; av.vy = 0; av.h = 0; avPark(loc.i, P.x);
  }

function avBoard() {
    if (!avT()) return;
    if (avBroken()) { sfx('no'); toast('Борт разбит. Сначала почини его.', 3000); return; }
    av.on = true; av.v = 0; av.vy = 0; av.h = 0; av.dir = P.face || 1; P.vx = 0; sfx('jump'); lastHud = ''; hud();
    av.eng = 15; av.gear = 1; av.gp = 1; av.lev = null; av.ramp = 0; av.rampP = 0; avPanelSync();
    toast(save.avSel === 2 ? (touch ? 'Ты за штурвалом! Влево/вправо: лететь, «Прыжок» держи: вверх, ▼: вниз.' : 'Ты за штурвалом! ← →: лететь, ↑ (держи): вверх, ↓: вниз, E: выйти после посадки.') : (touch ? 'Ты за штурвалом! Держи вперёд: разгон. На взлётной скорости жми «Прыжок» (тяни вверх). Против движения: тормоз, ▼: нос вниз.' : 'Ты за штурвалом! Держи → (вперёд): разгон по полосе. На взлётной скорости тяни ↑ (диагональный подъём), ↓: нос вниз. ← против движения: тормоз и разворот. Выше 1000 м: небо.'), 8000);
    ach('avfly');
    if (loc.i === 3 || loc.i === 4) toast('Подсказка: набери высоту и нажми E в воздухе, чтобы лететь ' + (loc.i === 3 ? 'на Мальдивы' : 'обратно в аэропорт') + '.', 6000);
  }

function avSeaRescue() {
    if (!av.on || flt.on || lt.st) return;
    av.on = false; av.v = 0; av.vy = 0; av.h = 0; avPark(4, 1000);
    toast('Топливо кончилось. Тебя подобрали спасатели, борт отбуксировали на Мальдивы.', 5000);
    startFlight(4, 900, { rescue: true });
  }

function avExit() {
    if (loc.i === 5 || loc.i === SKY_ID) { sfx('no'); toast('Здесь не сесть: ' + (loc.i === 5 ? 'лети к острову справа или к Мальдивам слева.' : 'спустись через меню (E в воздухе).'), 3000); return; }
    if (av.h > 3) { sfx('no'); toast('Сначала приземлись: отпусти кнопку вверх.', 2500); return; }
    av.on = false; av.v = 0; av.vy = 0; av.h = 0;
    avPark(loc.i, P.x);
    P.x = Math.max(40, Math.min(WORLD_W - 40, P.x - av.dir * 150)); P.face = av.dir; P.vx = 0;
  }

function avNearPump() { var px = avPumpX(); return px > 0 && Math.abs(P.x - px) < 130; }

function avRefuel() {
    var T = avT(); if (!T) { sfx('no'); toast('Сначала купи самолёт или вертолёт в ангаре.', 3000); return; }
    if (!av.on && !(save.avLoc === loc.i && avPumpX() > 0 && Math.abs(save.avX - avPumpX()) < 500)) { sfx('no'); toast('Твой борт стоит не здесь.', 2500); return; }
    if (!avNearPump() && av.on) { sfx('no'); toast('Заправка только у колонки в аэропорту.', 2500); return; }
    var need = Math.ceil(T.cap - save.avFuel - 0.01), fp = avPrice();
    if (need <= 0) { sfx('no'); toast('Бак уже полный.', 2000); return; }
    var l = Math.min(need, Math.floor(save.coins / fp));
    if (l <= 0) { sfx('no'); toast('Не хватает коинов: литр авиатоплива сейчас ' + fp + '.', 2800); return; }
    save.coins -= l * fp; save.avFuel = Math.min(T.cap, save.avFuel + l);
    persist(); hud(); sfx('sell'); popup(P.x, PLAYER_H + 30, '−' + l * fp + ' ' + coinWord(l * fp), '#ffb4b4');
    toast('Заправлено ' + l + ' л по ' + fp + '. В баке ' + Math.ceil(save.avFuel) + ' из ' + T.cap + '.', 3000);
  }

function avHigh() { return av.h > avMaxH() * 0.55 && (loc.i === 3 || loc.i === 4); }

function avAct() {
    if (avNearPump() && av.h <= 3) { avRefuel(); return; }
    if ((loc.i === 5 || loc.i === SKY_ID) && av.h <= 3) { sfx('no'); toast('Здесь не сесть: лети к острову справа или к Мальдивам слева.', 3000); return; }
    if (av.h > 3) { if (avHigh() || avAuto() || loc.i === SKY_ID || avTank() || (save.avSel === 3 && av.h > 40)) avAirMenu(); else { sfx('no'); toast((loc.i === 3 || loc.i === 4) ? 'Поднимись выше, чтобы лететь на ' + (loc.i === 3 ? 'Мальдивы' : 'родной аэродром') + ', или приземлись для выхода.' : 'Сначала приземлись: отпусти кнопку вверх.', 3000); } return; }
    avGroundMenu();
  }

function avTrip(to) {
    if (!av.on || flt.on || save.avFuel < AV_TRIP_L) return;
    save.avFuel -= AV_TRIP_L; av.on = false; av.v = 0; av.vy = 0; av.h = 0;
    var atX = to === 4 ? 900 : AV_PARK - 100;
    avPark(to, to === 4 ? 1000 : AV_PARK); persist();
    startFlight(to, atX, { rescue: true });
  }

function spotAv() {
    if (cs.on || P.z > 70 || mb.on) return null;
    if (avBroken() && !av.on && loc.i === save.avLoc && Math.abs(P.x - save.avX) < 130 && avT()) return { btn: 'Починить', msg: 'Борт разбит. Нажми E: починить (' + REPAIR_PRICE + ')', fn: avRepair, x: save.avX };
    var sj = save.cj ? spotCj() : null; if (sj && sj.btn !== 'Пилот') return sj;
    if (save.avOwn && !av.on && loc.i === save.avLoc && Math.abs(P.x - save.avX) < 130 && avT()) return { btn: 'Сесть', msg: 'Нажми E: сесть в ' + avT().n.toLowerCase(), fn: avBoard, x: save.avX };
    var px = avPumpX();
    if (px > 0 && Math.abs(P.x - px) < 90) return { btn: 'Заправить', msg: 'Нажми E: заправить борт (литр ' + avPrice() + ')', fn: avRefuel, x: px };
    if (loc.i === 3 && Math.abs(P.x - AV_HANGAR) < 120) return { btn: 'Ангар', msg: 'Нажми E: зайти в ангар', fn: hangarMenu, x: AV_HANGAR };
    return spotCj() || spotPax();
  }

function avBuy(t) {
    var T = AV[t];
    if (save.coins < T.price) { sfx('no'); toast('Не хватает коинов: ' + T.n.toLowerCase() + ' стоит ' + T.price + '.', 3000); return; }
    save.coins -= T.price; save.avOwn |= (1 << (t - 1));
    if (!save.avSel || !avOwns(save.avSel)) save.avSel = t;
    if (save.avSel === t) { save.avFuel = Math.floor(T.cap / 2); avPark(3, AV_PARK); }
    persist(); hud(); sfx('rare'); ach('avbuy');
    toast('Куплено: ' + T.n.toLowerCase() + '. В баке половина топлива, заправь борт у колонки.', 5000);
  }

function avSelect(t) {
    if (save.cj === 2) { sfx('no'); toast('Пока груз на борту, борт менять нельзя.', 3000); return; }
    if (avBroken()) { sfx('no'); toast('Сначала почини разбитый борт.', 3000); return; }
    save.avSel = t; save.avFuel = Math.min(save.avFuel, AV[t].cap); avPark(3, AV_PARK); sfx('pick');
    toast('Выбран борт: ' + AV[t].n.toLowerCase() + '. Он ждёт на стоянке аэропорта.', 3500);
  }

function hangarMenu() {
    var ch = [], txt = 'Ангар аэропорта. Купи свой борт и летай сам, без билета. Топливо только у колонки в этом аэропорту (литр сейчас ' + avPrice() + ').';
    for (var t = 1; t <= 3; t++) (function (t) {
      var T = AV[t];
      if (!avOwns(t)) ch.push({ t: 'Купить: ' + T.n + ' (' + T.price + '), ' + T.info, fn: function () { avBuy(t); hangarMenu(); } });
      else if (save.avSel !== t) ch.push({ t: 'Выбрать: ' + T.n, fn: function () { avSelect(t); dlgClose(); } });
    })(t);
    for (var et = 1; et <= 3; et++) (function (et) {
      if (avOwns(et) && avEngLv(et) < 3) ch.push({ t: 'Двигатель: ' + AV[et].n + ' ур. ' + avEngLv(et) + ' → ' + (avEngLv(et) + 1) + ' (' + fmtN(engCost(et)) + '): +10% скорости, +12% тяги', fn: function () { engBuy(et); hangarMenu(); } });
    })(et);
    if (avBroken()) ch.push({ t: 'Починить борт (' + REPAIR_PRICE + ')', fn: function () { avRepair(); hangarMenu(); } });
    if ((save.avOwn & 7) && !(save.avOwn & 16)) ch.push({ t: 'Купить: автопилот для всех бортов (' + AUTO_PRICE + '): ведёт борт, пока ты ходишь по салону, сам сажает борт, смягчает посадку', fn: function () { autoBuy(); hangarMenu(); } });
    if (avOwns(3) && !(save.avOwn & 8)) ch.push({ t: 'Купить: система дозаправки в воздухе для грузового (' + TANK_PRICE + ')', fn: function () { tankBuy(); hangarMenu(); } });
    if (avT() && (save.avLoc !== 3 || Math.abs(save.avX - AV_PARK) > 300)) ch.push({ t: 'Вызвать борт в аэропорт (500)', fn: function () { if (save.coins < 500) { sfx('no'); toast('Не хватает коинов.', 2000); return; } save.coins -= 500; avPark(3, AV_PARK); persist(); hud(); toast('Борт отогнали на стоянку аэропорта.', 3000); dlgClose(); } });
    if (avT()) txt += ' Сейчас: ' + avT().n.toLowerCase() + ', топливо ' + Math.ceil(save.avFuel) + '/' + avT().cap + '.';
    ch.push({ t: 'Выйти', out: true });
    dlgShow('Ангар', null, txt, ch);
  }

function spotEvB() {
    if (loc.i !== 0 || cs.on || P.z > 70 || av.on || pax.on || cab.on) return null;
    var cx = BB_X + BB_W / 2; if (Math.abs(P.x - cx) > 140) return null;
    return { btn: 'Ивент', msg: touch ? 'Жми «Ивент»' : 'Нажми E: заказать ивент на цену чекушки', fn: evMenu, x: cx };
  }

function evMenu() {
    var ch = [], cur = rate.ev ? 'Сейчас идёт ивент «' + rate.ev.name + '» ' + evPct(rate.ev.m) + ', осталось ' + fmtTime(rate.ev.left) + '.' : 'Сейчас ивентов нет.';
    var cd = Math.ceil(Math.max(0, evOrder.cd));
    PAID_EV.forEach(function (e) {
      ch.push({ t: e.name + ': курс ' + evPct(e.m) + ' на ' + e.dur + ' с (' + fmtN(e.cost) + ')', fn: function () { evOrderGo(e); } });
    });
    ch.push({ t: 'Уйти', out: true });
    dlgShow('Рекламный щит', null, 'Здесь можно заказать ивент, который повысит цену чекушки на время. ' + cur + (cd ? ' Следующий заказ через ' + cd + ' с.' : '') + ' Помимо твоих ивентов, посёлок иногда устраивает свои сам: праздники, ярмарки, рейды.', ch);
  }

function evApply(e, own, who) {
    rate.ev = { name: e.name, m: e.m, left: e.dur, own: own ? 1 : 0 }; rate.evT = 35 + Math.random() * 35; lastEv = ''; applyRate();
    if (hasSignal()) toast((who ? who + ': ' : '') + e.txt + ' Курс ' + evPct(e.m) + '.', 5000);
  }

function evOrderGo(e) {
    if (rate.ev) { sfx('no'); toast('Сейчас идёт ивент «' + rate.ev.name + '». Дождись конца.', 3000); return; }
    if (evOrder.cd > 0) { sfx('no'); toast('Следующий заказ через ' + Math.ceil(evOrder.cd) + ' с.', 2500); return; }
    if (save.coins < e.cost) { sfx('no'); toast('Не хватает коинов: ' + fmtN(e.cost) + '.', 2500); return; }
    save.coins -= e.cost; evOrder.cd = 150; persist(); hud(); sfx('rare'); dlgClose();
    evApply(e, true, '');
    if (socket && net.room) { try { socket.emit('mkt', { id: e.id }); } catch (er) {} }
  }

function tinSp(k, b, m, f) { return Math.abs(P.x - TIN[k]) < 90 ? { btn: b, msg: touch ? 'Жми «' + b + '»' : 'Нажми E: ' + m, fn: f, x: TIN[k] } : null; }

function spotTerm() {
    if (cs.on || P.z > 70 || mb.on || av.on || pax.on || cab.on) return null;
    if (loc.i === 3 && Math.abs(P.x - TERM_X) < 70) return { btn: 'Войти', msg: touch ? 'Жми «Войти»' : 'Нажми E: войти в терминал (касса билетов)', fn: function () { ltGo(18, 'left', 260); }, x: TERM_X };
    if (loc.i !== 18) return null;
    return tinSp('exit', 'Выйти', 'выйти в город', function () { ltGo(3, 'left', TERM_X); })
      || tinSp('field', 'На полосу', 'выйти на лётное поле', function () { ltGo(3, 'left', AV_PARK - 170); })
      || tinSp('kassa', 'Касса', 'подойти к кассе', kassaTalk)
      || tinSp('board', 'Табло', 'посмотреть табло рейсов', boardTalk)
      || tinSp('cafe', 'Кафе', 'зайти в кафе', cafeTalk);
  }

function kassaTalk() {
    var have = save.tickets | 0, p = TICKET_PRICE;
    var tx = 'Билет на Мальдивы стоит ' + fmtN(p) + ' ' + coinWord(p) + '. Рейс отправляется с лётного поля: красный самолёт рядом с терминалом.' + (have ? '\nУ тебя уже есть билетов: ' + have + '.' : '') + '\nЛететь можно и за 1 мифическую или 15 легендарных чекушек: это решится у самолёта.';
    dlgShow('Кассир', null, tx, [
      { t: 'Купить билет (' + fmtN(p) + ')', fn: function () {
        if (save.coins < p) { sfx('no'); toast('Не хватает коинов: билет стоит ' + fmtN(p) + '.', 2800); return; }
        save.coins -= p; save.tickets = (save.tickets | 0) + 1; persist(); hud(); sfx('sell'); popup(P.x, PLAYER_H + 20, '−' + fmtN(p), '#ffb4b4');
        dlgClose(); toast('Билет куплен. Выходи на лётное поле к красному самолёту.', 4000);
      } },
      { t: 'Не сейчас', out: true }
    ]);
  }

function boardTalk() {
    dlgShow('Табло рейсов', null, 'Рейс на Мальдивы: посадка у красного самолёта на лётном поле.\nСвой борт: ангар, заправка и пилот правее на полосе. Взлёт: разгон по полосе, тяга вперёд, на взлётной скорости тяни вверх. Выше 1000 метров начинается небо.', [{ t: 'Понятно', out: true }]);
  }

function cafeTalk() { dlgShow('Кафе', null, CAFE_L[Math.floor(Math.random() * CAFE_L.length)], [{ t: 'Уйти', out: true }]); }

function drawTerminBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#eef2f8'); g.addColorStop(1, '#d3dbe8'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    setCam(1);
    var w = LOCS[18].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#dfe6f0'; ctx.fillRect(a, gY - 340, b - a, 340);
    ctx.fillStyle = '#c3cddb'; ctx.fillRect(a, gY - 120, b - a, 120);
    decStep(x0, x1, 400, 120, function (x, k) {
      var wx = x - 140, wy = gY - 300, ww = 280, wh = 170;
      var sg = ctx.createLinearGradient(0, wy, 0, wy + wh); sg.addColorStop(0, '#5db6ee'); sg.addColorStop(1, '#d8f0fb'); ctx.fillStyle = sg; ctx.fillRect(wx, wy, ww, wh);
      ctx.fillStyle = '#7f8896'; ctx.fillRect(wx, wy + wh - 34, ww, 34);
      ctx.fillStyle = '#f4f1c8'; for (var d = 0; d < 5; d++) ctx.fillRect(wx + 10 + d * 58, wy + wh - 18, 30, 3);
      var px = wx + ((t * 28 + k * 90) % (ww + 120)) - 60; ctx.fillStyle = '#f2f5f9'; rrect(px, wy + wh - 62, 76, 16, 8); ctx.fill(); ctx.fillStyle = '#d8362f'; ctx.fillRect(px + 8, wy + wh - 56, 50, 3); ctx.fillStyle = '#f2f5f9'; ctx.beginPath(); ctx.moveTo(px + 12, wy + wh - 62); ctx.lineTo(px + 2, wy + wh - 80); ctx.lineTo(px + 22, wy + wh - 62); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#8795ab'; ctx.lineWidth = 8; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, wy); ctx.lineTo(x, wy + wh); ctx.stroke();
    });
    ctx.fillStyle = '#9aa7b8'; ctx.fillRect(a, gY - 2, b - a, H / scale);
    ctx.fillStyle = '#c9d3e0'; ctx.fillRect(a, gY - 2, b - a, 6);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; for (i = Math.floor(a / 120) * 120; i < b; i += 120) ctx.fillRect(i, gY + 6, 2, H / scale);
    for (i = Math.floor(a / 200) * 200; i < b; i += 200) { ctx.fillStyle = '#fff'; ctx.fillRect(i + 40, gY - 336, 120, 5); ctx.fillStyle = 'rgba(255,255,230,.45)'; ctx.fillRect(i + 40, gY - 331, 120, 36); }
    function door(x, label, col) {
      if (x < x0 - 120 || x > x1 + 120) return;
      ctx.fillStyle = col; ctx.fillRect(x - 54, gY - 196, 108, 196); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(x - 44, gY - 186, 88, 70);
      ctx.fillStyle = '#fff'; rrect(x - 62, gY - 244, 124, 32, 8); ctx.fill(); ctx.fillStyle = '#26456f'; ctx.font = '700 14px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x, gY - 228);
    }
    door(TIN.exit, 'ВЫХОД В ГОРОД', '#7d93a8'); door(TIN.field, 'ЛЁТНОЕ ПОЛЕ', '#3d7fc4');
    // касса
    var kx = TIN.kassa;
    if (kx > x0 - 180 && kx < x1 + 180) {
      ctx.fillStyle = '#6f7d92'; ctx.fillRect(kx - 110, gY - 70, 220, 70); ctx.fillStyle = '#93a3b9'; ctx.fillRect(kx - 118, gY - 78, 236, 10);
      ctx.fillStyle = 'rgba(160,215,245,.75)'; ctx.fillRect(kx - 90, gY - 160, 180, 82); ctx.strokeStyle = '#51607a'; ctx.lineWidth = 5; ctx.strokeRect(kx - 90, gY - 160, 180, 82);
      ctx.fillStyle = '#1f4aa8'; rrect(kx - 70, gY - 214, 140, 36, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 20px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('КАССА', kx, gY - 195);
    }
    // табло
    var bx = TIN.board;
    if (bx > x0 - 200 && bx < x1 + 200) {
      ctx.fillStyle = '#10243f'; ctx.fillRect(bx - 150, gY - 270, 300, 150); ctx.strokeStyle = '#5b7aa6'; ctx.lineWidth = 5; ctx.strokeRect(bx - 150, gY - 270, 300, 150);
      ctx.font = '700 15px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffd23f'; ctx.fillText('РЕЙС   КУДА       ВЫХОД', bx - 134, gY - 248);
      ctx.fillStyle = Math.sin(t * 3) > 0 ? '#7dff9c' : '#3fa05c'; ctx.fillText('MV-1   МАЛЬДИВЫ   ПОЛЕ', bx - 134, gY - 214);
      ctx.fillStyle = '#9fb3d1'; ctx.fillText('HQ-7   СВОЙ БОРТ  АНГАР', bx - 134, gY - 180); ctx.fillText('SK-0   НЕБО       >1000 М', bx - 134, gY - 148);
    }
    // кафе
    var cx = TIN.cafe;
    if (cx > x0 - 200 && cx < x1 + 200) {
      ctx.fillStyle = '#8a5a3a'; ctx.fillRect(cx - 120, gY - 64, 240, 64); ctx.fillStyle = '#b07a52'; ctx.fillRect(cx - 128, gY - 72, 256, 10);
      ctx.fillStyle = '#2f9e6a'; rrect(cx - 60, gY - 160, 120, 34, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '700 18px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('КАФЕ', cx, gY - 143);
      ctx.fillStyle = '#fff'; ctx.fillRect(cx - 40, gY - 92, 14, 20); ctx.fillRect(cx + 10, gY - 92, 14, 20);
    }
    // скамейки
    ctx.fillStyle = '#4a6fa5'; [480, 1010, 1500, 2000].forEach(function (bx2) { if (bx2 > x0 - 80 && bx2 < x1 + 80) { ctx.fillRect(bx2 - 50, gY - 30, 100, 10); ctx.fillRect(bx2 - 50, gY - 54, 100, 10); ctx.fillStyle = '#2f4a73'; ctx.fillRect(bx2 - 44, gY - 22, 6, 22); ctx.fillRect(bx2 + 38, gY - 22, 6, 22); ctx.fillStyle = '#4a6fa5'; } });
  }

function avAlt() { var mh = avMaxH(); return Math.round(loc.i === SKY_ID ? 1000 + av.h / mh * 1500 : av.h / mh * 1000); }

function avKmh(sp) { return Math.round(sp * 0.8); }

function avSkyUp() {
    if (lt.st || flt.on || !av.on || save.avFuel <= 0) return;
    skyS.from = loc.i; tnk.on = false; av.hSet = avMaxH() * 0.4; persist();
    lt.st = 'out'; lt.t = 0; lt.dest = SKY_ID; lt.side = 'left'; lt.atX = Math.max(800, Math.min(39000, 800 + P.x * 0.4)); sfx('jump');
    toast('Выше 1000 метров: небо.', 3000);
  }

function avFlyHeli(dt, T, d, fuel, rel, mh) {
    var sp = fuel ? T.sp * (1 - 0.4 * cjW()) : 70, apH = !!av.ap && fuel && !rel && av.h > 3, tgtV;
    if (apH) {
      if (av.apH == null) av.apH = av.h;
      if (!av.rt || loc.i === av.rt.dest) { if (av.dir < 0 && P.x < 420) av.dir = 1; else if (av.dir > 0 && P.x > WORLD_W - 420) av.dir = -1; }
      if (av.ap !== 'land' && loc.i !== 5 && loc.i !== SKY_ID && save.avFuel < T.cap * 0.08) { av.ap = 'land'; toast('Мало топлива: автопилот идёт на посадку.', 3500); }
      d = av.dir * (av.ap === 'land' ? 0.25 : 0.5);
    }
    tgtV = rel ? tnk.v + d * Math.min(160, sp * 0.3) : d * sp;
    av.v += (tgtV - av.v) * Math.min(1, (d || rel ? 1.4 : 2.6) * dt); if (d && !rel) av.dir = d > 0 ? 1 : -1; if (rel) av.dir = tnk.dir;
    var vyT = apH ? Math.max(-T.down * 0.5, Math.min(T.up * 0.6, ((av.ap === 'land' ? 0 : av.apH) - av.h) * 2)) : ((input.up && fuel) ? T.up * (1 - cjW()) : -T.down);
    av.vy += (vyT - av.vy) * Math.min(1, 3 * dt);
    if (av.ap === 'land' && av.h <= 0.5 && Math.abs(av.v) < 12) { av.ap = false; cab.on = false; toast('Автопилот посадил борт. Ты снова в кабине.', 4000); }
    var ceil = save.avSel === 2 ? mh * 0.8 : mh, fl = (loc.i === 5 && fuel) ? 26 : 0;
    var h0 = av.h, vy0 = av.vy, gnd = loc.i !== 5 && loc.i !== SKY_ID && save.avSel !== 2 && !avAuto();
    av.h = Math.max(fl, Math.min(ceil, av.h + av.vy * dt)); if ((av.h <= fl && av.vy < 0) || (av.h >= ceil && av.vy > 0)) av.vy = 0;
    if (fl && av.h <= fl && input.dn && !av.warnW) { av.warnW = true; toast('Над водой не сесть: держись выше.', 2500); }
    if (!input.dn && !(av.h <= fl && av.vy < 0)) av.warnW = av.warnW && av.h <= fl;
    if (gnd && h0 > 0 && av.h <= 0 && (av.vHi || 0) > 360 && vy0 < -40) { avCrash('hard', P.x); return false; }
    if (av.h >= 4) av.vHi = Math.abs(av.v);
    if (av.h < 4) av.v = Math.max(-200, Math.min(200, av.v));
    return true;
  }

function avEngN() { return save.avSel === 3 ? 4 : 2; }

function avEngOn() { var n = avEngN(), i, c = 0, m = av.eng == null ? 15 : av.eng; for (i = 0; i < n; i++) if ((m >> i) & 1) c++; return c; }

function avFlyPlane(dt, T, d, fuel, mh) {
    var cw = cjW(), accE = T.acc * (1 - 0.6 * cw), vrE = T.vr * (1 + 0.5 * cw), sp = Math.abs(av.v), air = av.h > 0.5, ef = avEngOn() / avEngN();
    var ap = !!av.ap && fuel, apLand = av.ap === 'land', fwd = d !== 0 && d === av.dir, back = d !== 0 && d !== av.dir;
    var gndL = loc.i !== 5 && loc.i !== SKY_ID;
    if (ap && air) {
      if (!av.rt || loc.i === av.rt.dest) { if (av.dir < 0 && P.x < 420) av.dir = 1; else if (av.dir > 0 && P.x > WORLD_W - 420) av.dir = -1; }
      if (!apLand && av.apH == null) av.apH = Math.max(mh * 0.3, Math.min(mh * 0.75, av.h));
      if (!apLand && gndL && save.avFuel < T.cap * 0.08) { av.ap = 'land'; apLand = true; toast('Мало топлива: автопилот идёт на посадку.', 3500); }
    }
    if (apLand && av.gear !== 1) { av.gear = 1; }
    var manual = av.lev != null && !av.ap;
    var thrT = fuel ? ((av.rt && !av.ap) ? 1 : manual ? av.lev : ((ap && air) ? (apLand ? 0.4 : 0.6) : (fwd ? 1 : (air ? 0.55 : 0)))) : 0; thrT *= ef;
    av.thr = (av.thr || 0) + (thrT - (av.thr || 0)) * Math.min(1, 2.2 * dt);
    var drag = (air ? 18 : ((back || (av.ap && !air) || (apLand)) ? T.brk : 22)) + (air && av.gp > 0.5 ? 9 : 0) + ((av.rampP || 0) > 0.5 ? 7 : 0) + (ef < 1 && sp > 0 ? 4 * (1 - ef) : 0);
    sp += (av.thr * accE * (1 - (sp / T.sp) * (sp / T.sp)) - (sp > 0 ? drag : 0)) * dt;
    if (!air) sp = Math.min(sp, vrE * 1.5);
    sp = Math.max(0, Math.min(T.sp * (air && av.gp > 0.5 && av.h > 40 ? 0.82 : 1), sp));
    // разворот: на земле после остановки, в воздухе виражом
    if (!air && back && sp < 30) { av.dir = d; av.tb = 0; }
    if (air && back && !ap) { av.tb = (av.tb || 0) + dt; if (av.tb > 0.45) { av.dir = d; av.tb = 0; sfx('jump'); } } else av.tb = 0;
    var pit = av.pitch || 0, h0 = av.h, vy0 = av.vy || 0;
    if (!air) {
      if (av.h > 0) { if (gndL && !av.ap && (av.gp == null ? 1 : av.gp) < 0.6) { avCrash('hard', P.x); return false; } av.h = 0; }
      av.vy = 0; var upk = input.up || !!(av.rt && !av.ap), rotOn = upk && fuel && !ap && sp >= vrE;
      av.rot = rotOn ? Math.min(1, (av.rot || 0) + dt / 0.9) : Math.max(0, (av.rot || 0) - dt * 2);
      pit += (0.27 * av.rot - pit) * Math.min(1, 7 * dt);
      if (upk && fuel && !ap) {
        if (sp >= vrE && av.rot >= 1) { av.h = 1; av.vy = 40; pit = Math.max(pit, 0.22); av.rot = 0; sfx('jump'); av.warnV = false; ach('avfly'); }
        else if (sp >= vrE) { if (!av.warnR) { av.warnR = true; toast('Нос поднимается… держи вверх: отрыв через секунду.', 2200); } }
        else if (!av.warnV) { av.warnV = true; toast('Мало скорости для взлёта: разгоняйся до ' + avKmh(vrE) + ' км/ч (держи стрелку вперёд), потом тяни вверх.', 3200); }
      } else if (!upk) { av.warnV = false; av.warnR = false; }
      if (apLand && sp < 6) { av.ap = false; cab.on = false; toast('Автопилот посадил борт. Ты снова в кабине.', 4000); }
    } else {
      var stalled = sp < T.vs, pT;
      if (ap) {
        if (apLand) pT = av.h > 70 ? -0.1 : -0.035; else pT = Math.max(-0.2, Math.min(0.25, ((av.apH != null ? av.apH : av.h) - av.h) * 0.012));
      } else pT = ((input.up || (av.rt && !av.ap)) && fuel) ? 0.32 : (input.dn ? -0.34 : 0);
      if (!fuel) pT = -0.12;
      if (stalled) pT = Math.min(pT, -0.15 - (T.vs - sp) / T.vs * 0.45);
      pit += Math.max(-1.7 * dt, Math.min(1.7 * dt, pT - pit));
      av.vy = sp * Math.sin(pit) * 0.7 - (stalled ? (T.vs - sp) * 0.9 : 0);
      sp = Math.max(0, Math.min(T.sp, sp - Math.sin(pit) * 230 * dt));
      var fl = (loc.i === 5 && fuel) ? 24 : 0;
      av.h = Math.max(fl, Math.min(mh, av.h + av.vy * dt));
      if (fl && av.h <= fl && av.vy < 0) { av.vy = 0; if (!av.warnW) { av.warnW = true; toast('Над водой не сесть: лети выше.', 2500); } } else if (av.h > fl + 10) av.warnW = false;
      if (av.h <= 0) {
        av.h = 0;
        if (gndL && h0 > 0 && !av.ap && (av.gp || 0) < 0.6) { avCrash('hard', P.x); return false; }
        if (gndL && h0 > 0 && !avAuto() && (vy0 < -T.lim || (sp > vrE * 1.9 && vy0 < -40))) { avCrash('hard', P.x); return false; }
        if (h0 > 0) { av.vy = 0; if (!av.touch) { av.touch = true; toast('Касание! Тормози: ← (против движения).', 2200); } }
      } else av.touch = false;
      if (gndL && h0 > 0 && av.h < 70 && av.vy < -T.lim * 0.8 && !av.warnS) { av.warnS = true; toast('Слишком крутое снижение! Подними нос, иначе борт разобьётся.', 3200); }
      if (av.h > 110) av.warnS = false;
    }
    av.pitch = pit; av.v = av.dir * sp; av.sp = sp;
    return true;
  }

function engSound(on, thr, heli) {
    try {
      if (!on || !music.sfx) { if (engS) engS.g.gain.setTargetAtTime(0, actx.currentTime, 0.15); return; }
      actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume();
      if (!engS) { var o = actx.createOscillator(), o2 = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter(); o.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.frequency.value = 400; o.connect(f); o2.connect(f); f.connect(g); g.gain.value = 0; g.connect(actx.destination); o.start(); o2.start(); engS = { o: o, o2: o2, g: g, f: f, t: 0 }; }
      var now = actx.currentTime, b = heli ? 38 : 52, sp = heli ? 26 : 95;
      engS.t = performance.now();
      engS.o.frequency.setTargetAtTime(b + thr * sp, now, 0.12); engS.o2.frequency.setTargetAtTime((b + thr * sp) * 0.5, now, 0.12);
      engS.f.frequency.setTargetAtTime(260 + thr * 950, now, 0.12); engS.g.gain.setTargetAtTime(0.012 + 0.03 * thr, now, 0.15);
    } catch (e) {}
  }

function updateAv(dt) {
    if (!av.on) { engSound(false); tnk.on = false; return; }
    engSound(true, Math.max(0, Math.min(1, av.thr || 0)) * ((av.eng == null ? 15 : av.eng) ? 1 : 0), save.avSel === 2);
    var T = avT(); if (!T) { av.on = false; return; }
    if (boss.on) { avForceExit(); toast('Тревога! Борт пришлось посадить.', 3000); return; }
    var heli = save.avSel === 2, fuel = save.avFuel > 0, mh = avMaxH(), cw = cjW();
    var cp = (cab.on && !cab.pax) ? avCop() : null, sv0 = null;
    avPaxReq();
    if (cp) {
      if (!av.copOn) { av.copOn = true; av.lev = null; av.ap = false; av.apH = null; sfx('pick'); toast('Второй пилот ' + (cp.n || '') + ' ведёт борт, пока ты не сядешь за штурвал.', 3500); }
      sv0 = [input.left, input.right, input.up, input.dn]; var ci = cp.ci | 0;
      input.left = !!(ci & 1); input.right = !!(ci & 2); input.up = !!(ci & 4); input.dn = !!(ci & 8);
      if (!(ci & 3) && av.h > 3) { if (av.dir > 0) input.right = true; else input.left = true; }
      av.gear = av.h < 90 ? 1 : 0;
    } else if (av.copOn) {
      av.copOn = false;
      if (cab.on) { av.ap = true; av.apH = av.h > 3 ? Math.max(mh * 0.3, Math.min(mh * 0.75, av.h)) : null; toast('Второй пилот отпустил штурвал: включён автопилот.', 2800); }
    }
    var rel = tnk.on && tnk.st === 'fly' && fuel, d = (av.ap && !rel) ? 0 : ((av.rt && !heli) ? av.dir : (input.right ? 1 : 0) - (input.left ? 1 : 0));
    if (cab.on && !av.ap && !cp) av.ap = true;
    var ok = (heli || rel) ? avFlyHeli(dt, T, d, fuel, rel, mh) : avFlyPlane(dt, T, d, fuel, mh);
    if (sv0) { input.left = sv0[0]; input.right = sv0[1]; input.up = sv0[2]; input.dn = sv0[3]; }
    if (ok === false) return;
    P.x = Math.max(40, Math.min(WORLD_W - 40, P.x + av.v * dt));
    P.vx = 0; P.z = 0; P.vz = 0; P.kb = 0; P.face = av.dir;
    av.gp = Math.max(0, Math.min(1, (av.gp == null ? 1 : av.gp) + ((av.gear == null ? 1 : av.gear) ? 1 : -1) * dt / 1.1));
    av.rampP = Math.max(0, Math.min(1, (av.rampP || 0) + ((av.ramp || 0) ? 1 : -1) * dt / 1.5));
    if (fuel) {
      var br = heli ? Math.abs(av.v) * T.burn * 0.5 : T.burn * T.sp * 0.55 * (av.thr || 0);
      save.avFuel = Math.max(0, save.avFuel - (br * (1 + cw) + (av.h > 4 ? 0.06 : 0.02)) * dt);
    }
    av.fT = (av.fT || 0) + dt; if (av.fT > 1) { av.fT = 0; persist(); }
    if (!fuel && !av.warnE) { av.warnE = true; toast('Топливо кончилось: борт снижается. Заправка в аэропорту.', 4000); }
    if (fuel) av.warnE = false;
    if (save.avFuel > T.cap * 0.25) av.warnL = false; else if (!av.warnL && fuel && save.avFuel < T.cap * 0.2) { av.warnL = true; toast('Топливо на исходе. Лети к аэропорту.', 3500); }
    updateTank(dt);
    // выше 1000 м начинается небо, ниже — возвращаемся в локацию
    if (!heli && fuel && !lt.st && !flt.on && loc.i !== SKY_ID && av.h >= mh * 0.985 && (av.vy || 0) > 0) avSkyUp();
    if (fuel && !lt.st && !flt.on && loc.i === SKY_ID && av.h <= mh * 0.1 && (av.vy || 0) < 0) avFromSky();
    if (!fuel && (loc.i === 5 || loc.i === 7 || loc.i === SKY_ID) && av.h <= 1) { avSeaRescue(); return; }
    if (av.h > 4 && Math.random() < dt * 20) burst(P.x - av.dir * 70, gY - av.h - 30, 1, 'rgba(230,235,245,.7)', 50, 0.5);
  }

function avHaze() {
    if (!av.on || loc.i === SKY_ID || cab.on) return;
    var k = Math.max(0, Math.min(1, (avAlt() - 650) / 350)); if (k <= 0.01) return;
    ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2f78c8'); g.addColorStop(1, '#bfe4f6'); ctx.globalAlpha = k * 0.6; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  }

function avDial(cx, cy, r, sp, T, vrE) {
    var mx = T.sp * 0.8 * 1.05, a0 = Math.PI * 0.75, a1 = Math.PI * 2.25, k = Math.min(1, avKmh(sp) / mx), i;
    ctx.save(); ctx.fillStyle = 'rgba(8,14,28,.85)'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.3); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.stroke();
    function arc(f0, f1, col) { ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r - 7, a0 + (a1 - a0) * f0, a0 + (a1 - a0) * f1); ctx.stroke(); }
    var kv = avKmh(T.vs) / mx, kr = avKmh(vrE) / mx; arc(0, Math.min(1, kv), '#d6443f'); arc(Math.min(1, kv), Math.min(1, kr), '#d9a21b'); arc(Math.min(1, kr), 1, '#2fbf6a');
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5;
    for (i = 0; i <= 10; i++) { var an = a0 + (a1 - a0) * i / 10; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * (r - 13), cy + Math.sin(an) * (r - 13)); ctx.lineTo(cx + Math.cos(an) * (r - (i % 5 ? 16 : 20)), cy + Math.sin(an) * (r - (i % 5 ? 16 : 20))); ctx.stroke(); }
    var an2 = a0 + (a1 - a0) * k; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an2) * (r - 12), cy + Math.sin(an2) * (r - 12)); ctx.stroke();
    ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '700 17px "Rubik", system-ui, sans-serif'; ctx.fillText(String(avKmh(sp)), cx, cy + r * 0.42); ctx.font = '600 9px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#aab8d0'; ctx.fillText('км/ч', cx, cy + r * 0.68);
    ctx.restore();
  }

function drawAvHud() {
    if (!av.on || cab.on || !avT()) return;
    var T = avT(), sp = Math.abs(av.v), air = av.h > 0.5, heli = save.avSel === 2, vrE = T.vr ? T.vr * (1 + 0.5 * cjW()) : 0;
    ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var narrow = W < 640, w = Math.min(narrow ? 360 : 340, W - 24), x = narrow ? W / 2 - w / 2 : W - w - 12, y = narrow ? H - (touch ? 232 : 130) : 70, hh = heli ? 40 : 112;
    ctx.fillStyle = 'rgba(14,26,48,.72)'; rrect(x, y, w, hh, 10); ctx.fill();
    ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
    if (heli) { ctx.textAlign = 'center'; ctx.fillText('СКОРОСТЬ ' + avKmh(sp) + ' км/ч  ·  ВЫСОТА ' + avAlt() + ' м' + (av.ap ? '  ·  АП' : ''), x + w / 2, y + 16); ctx.restore(); return; }
    avDial(x + 54, y + 56, 46, sp, T, vrE);
    var tx = x + 112, thr = av.thr || 0, i, n = avEngN(), m = av.eng == null ? 15 : av.eng;
    ctx.textAlign = 'left'; ctx.fillText('ВЫСОТА ' + avAlt() + ' м' + (av.ap ? ' · АП' : ''), tx, y + 16);
    ctx.font = '600 11px "Rubik", system-ui, sans-serif'; ctx.fillStyle = '#aab8d0'; ctx.fillText('ТЯГА ' + Math.round(thr * 100) + '%' + (av.lev == null ? ' (авто)' : ' · рычаг ' + Math.round(av.lev * 100) + '%'), tx, y + 34);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(tx, y + 42, w - 124, 7); ctx.fillStyle = '#58b8e6'; ctx.fillRect(tx, y + 42, (w - 124) * thr, 7);
    if (av.lev != null) { ctx.fillStyle = '#fff'; ctx.fillRect(tx + (w - 124) * av.lev - 1, y + 39, 3, 13); }
    ctx.fillStyle = '#aab8d0'; ctx.fillText('ДВИГАТЕЛИ', tx, y + 62); for (i = 0; i < n; i++) { ctx.fillStyle = ((m >> i) & 1) ? '#2fbf6a' : '#d6443f'; ctx.beginPath(); ctx.arc(tx + 88 + i * 17, y + 62, 6, 0, 6.3); ctx.fill(); }
    var gp = av.gp == null ? 1 : av.gp; ctx.fillStyle = '#aab8d0'; ctx.fillText('ШАССИ', tx, y + 80); ctx.fillStyle = gp > 0.97 ? '#2fbf6a' : (gp < 0.03 ? '#aab8d0' : '#ffb020'); ctx.fillText(gp > 0.97 ? 'выпущено' : (gp < 0.03 ? 'убрано' : (av.gear ? 'выпускается…' : 'убирается…')), tx + 88, y + 80);
    ctx.fillStyle = '#cfe7ff'; ctx.fillText(!air ? (sp >= vrE ? 'ВЗЛЁТНАЯ ' + avKmh(vrE) + ' км/ч: ТЯНИ ВВЕРХ' : 'Взлёт с ' + avKmh(vrE) + ' км/ч') : (sp < T.vs ? 'СРЫВ! добавь тягу' : 'нос ' + Math.round((av.pitch || 0) * 57) + '°'), tx, y + 98);
    ctx.restore();
  }

function avPanelVisible() { return av.on && !cab.on && save.avSel !== 2 && !!avT() && !cs.on && !fin.on; }

function avSetLev(v) { av.lev = Math.max(0, Math.min(1, v)); }

function avEngToggle(i) {
    if (!av.on || save.avSel === 2 || i >= avEngN()) return;
    av.eng = (av.eng == null ? 15 : av.eng) ^ (1 << i); sfx('pick');
    var c = avEngOn(); toast(c === 0 ? 'Все двигатели выключены: тяги нет.' : 'Двигатель ' + (i + 1) + (((av.eng >> i) & 1) ? ' включён.' : ' выключен.') + ' Работает ' + c + ' из ' + avEngN() + '.', 2200);
  }

function avGearToggle() {
    if (!av.on || save.avSel === 2) return;
    if (av.gear !== 0 && av.h < 30) { sfx('no'); toast('Шасси убирают только в воздухе: набери хотя бы 30 м.', 2600); return; }
    if (av.gear === 0 && av.ap === 'land') return;
    av.gear = av.gear === 0 ? 1 : 0; sfx('pick'); toast(av.gear ? 'Шасси выпускаются.' : 'Шасси убираются.', 1800);
  }

function avRampToggle() {
    if (!av.on || save.avSel !== 3) return;
    av.ramp = av.ramp ? 0 : 1; cab.hatchTo = av.ramp; sfx('pick'); toast(av.ramp ? 'Рампа опускается. Скорость падает от сопротивления.' : 'Рампа поднимается.', 2200);
  }

function avPanelSync() {
    var vis = avPanelVisible(); if (avPanel.hidden === vis) avPanel.hidden = !vis;
    if (!vis) return;
    var n = avEngN(), m = av.eng == null ? 15 : av.eng, i, key = n + ':' + m + ':' + av.gear + ':' + av.ramp + ':' + (av.lev == null ? 'a' : Math.round(av.lev * 100)) + ':' + (save.avSel === 3 ? 1 : 0);
    if (key === avPanelKey) return; avPanelKey = key;
    var h = ''; for (i = 0; i < n; i++) h += '<button type="button" class="' + (((m >> i) & 1) ? 'on' : 'off') + '" data-e="' + i + '">' + (i + 1) + '</button>';
    avEls.engs.innerHTML = h; var bs = avEls.engs.querySelectorAll('button'); for (i = 0; i < bs.length; i++) (function (b) { b.addEventListener('click', function () { avEngToggle(+b.getAttribute('data-e')); }); })(bs[i]);
    var lv = av.lev == null ? (av.thr || 0) : av.lev; avEls.handle.style.bottom = 'calc(' + Math.round(lv * 100) + '% - 9px)';
    avEls.pct.textContent = av.lev == null ? 'АВТО' : Math.round(av.lev * 100) + '%'; avEls.auto.className = av.lev == null ? 'on' : '';
    avEls.gear.textContent = 'Шасси: ' + (av.gear === 0 ? 'убраны' : 'выпущены'); avEls.gear.className = av.gear === 0 ? 'off' : 'on';
    avEls.ramp.hidden = save.avSel !== 3; avEls.ramp.textContent = 'Рампа: ' + (av.ramp ? 'открыта' : 'закрыта'); avEls.ramp.className = av.ramp ? 'off' : 'on';
  }

function avPanelTick() { if (av.on && av.lev == null) { var k = (av.thr || 0); if (Math.abs(k - (avPanelTick.l || 0)) > 0.02) { avPanelTick.l = k; avPanelKey = ''; } } avPanelSync(); }

function rtPath(a, b) {
    if (a === b) return [a];
    var q = [[a]], seen = {}, i, p, L, nx; seen[a] = 1;
    while (q.length) {
      p = q.shift(); L = LOCS[p[p.length - 1]];
      var ns = [L.left, L.right];
      for (i = 0; i < 2; i++) { nx = ns[i]; if (nx === undefined || seen[nx] || RT_OK.indexOf(nx) < 0) continue; seen[nx] = 1; var np = p.concat([nx]); if (nx === b) return np; q.push(np); }
    }
    return null;
  }

function rtBusy() { return paused || dlgOpened || cs.on || fin.on || p5.on || p6.on || boss.on || kk.on || flt.on || lt.st; }

function rtStop(msg) { if (!av.rt) return; av.rt = null; if (av.ap === true) { av.ap = false; av.apH = null; } input.left = input.right = false; if (msg) toast(msg, 3000); }

function rtGo(dest) {
    if (!av.on || save.avSel === 2) return;
    if (loc.i === dest) { toast('Ты уже здесь.', 2000); return; }
    var pth = rtPath(loc.i, dest); if (!pth) { sfx('no'); toast('Автопилот не знает дороги отсюда: лети на обычную карту.', 3200); return; }
    var T = avT(); if (!T || save.avFuel < T.cap * 0.15) { sfx('no'); toast('Мало топлива для маршрута: заправься.', 3200); return; }
    if (av.gear === 0) av.gear = 1; if (av.ramp) { av.ramp = 0; cab.hatchTo = 0; }
    av.lev = null; av.eng = 15; av.ap = false; av.apH = null; av.rt = { dest: dest, path: pth }; rtT = 0; sfx('pick');
    toast('Автопилот: курс на «' + LOCS[dest].name + '». ' + (av.h > 3 ? 'Идём по маршруту.' : 'Сам разгонюсь и взлечу.') + ' Любая кнопка движения или Esc: взять управление.', 5000);
  }

function rtMenu() {
    if (!av.on || save.avSel === 2) { sfx('no'); toast('Автопилот маршрута работает на самолётах: садись за штурвал.', 3000); return; }
    if (rtBusy() || av.ap === 'land') { sfx('no'); return; }
    var ch = [];
    RT_OK.forEach(function (id) { var pp = id !== loc.i ? rtPath(loc.i, id) : null; if (pp) ch.push({ t: LOCS[id].name + ' (' + (pp.length - 1) + ' лок.)', fn: function () { dlgClose(); rtGo(id); } }); });
    ch.push({ t: 'Отмена', out: true });
    dlgShow('Автопилот борта', null, 'Куда лететь? Я сам разгонюсь, взлечу, пройду все локации по пути и посажу борт в нужной. Нужно топливо и свободное небо.', ch);
  }

function updateRoute(dt) {
    var r = av.rt; if (!r) return;
    if (!av.on || boss.on || kk.on || flt.on) { av.rt = null; return; }
    if (lt.st) return;
    rtT += dt;
    var T = avT(), mh = avMaxH(), L = LOCS[loc.i], air = av.h > 3, sp = Math.abs(av.v);
    if (loc.i === r.dest) {
      if (air && av.ap !== 'land') { av.ap = 'land'; av.gear = 1; toast('Автопилот заходит на посадку: ' + LOCS[loc.i].name + '.', 3000); }
      else if (!air && sp < 8 && rtT > 1) { av.rt = null; av.ap = false; av.apH = null; cab.on = false; toast('Приехали: ' + LOCS[loc.i].name + '. Борт на земле.', 4000); ach('route'); }
      return;
    }
    var i = r.path.indexOf(loc.i); if (i < 0) { r.path = rtPath(loc.i, r.dest) || []; i = 0; if (!r.path.length) { av.rt = null; return; } }
    var nx = r.path[i + 1]; if (nx === undefined) { av.rt = null; return; }
    var d = L.left === nx ? -1 : 1;
    if (!air || sp < 30) av.dir = d; else if (av.dir !== d) av.dir = d;
    if (av.h > 12 && !av.ap) { av.ap = true; av.apH = Math.max(mh * 0.3, Math.min(mh * 0.55, mh * 0.5)); }
    input.left = air && d < 0 && P.x <= 170; input.right = air && d > 0 && P.x >= WORLD_W - 170;
    if (av.ap === 'land') av.ap = true;
  }

function rtUi() { var show = av.on && save.avSel !== 2 && !paused && !cs.on && !fin.on; if (rtBtn.hidden === show) rtBtn.hidden = !show; rtBtn.classList.toggle('on', !!av.rt); }

function avGroundMenu() {
    var sp = Math.abs(av.v);
    if (sp > 30) { sfx('no'); toast('Сначала остановись: тормози стрелкой против движения.', 2800); return; }
    dlgShow('Борт', null, 'Борт стоит. Выйти наружу или пройти в салон?', [
      { t: 'Выйти наружу', fn: function () { dlgClose(); avExit(); } },
      { t: 'Пройти в салон', fn: function () { dlgClose(); cabOpen(false, save.avSel); } },
      { t: 'Остаться за штурвалом', out: true }
    ]);
  }

function cabGeo(ty) {
    var a = [], i;
    if (ty === 2) { for (i = 0; i < 4; i++) a.push(220 + i * 100); return { len: 820, seats: a, pilot: 680, door: 90, n: 4, name: 'Вертолёт' }; }
    if (ty === 3) { for (i = 0; i < 5; i++) a.push(1130 + i * 92); return { len: 1950, seats: a, pilot: 1830, door: 110, ramp: true, btn: 250, n: 5, name: 'Грузовой самолёт' }; }
    for (i = 0; i < 15; i++) a.push(380 + i * 90);
    return { len: 2050, seats: a, pilot: 1930, door: 130, n: 15, name: 'Самолёт' };
  }

function myId() { return socket && socket.id ? socket.id : ''; }

function cabOwnerKey() { return cab.pax ? pax.id : myId(); }

function cabOcc(key) {
    var res = {}, k, o;
    for (k in net.others) {
      o = net.others[k];
      if (k === key) { if (o.cb && o.cs >= 0 && o.cs !== 100) res[o.cs] = o; }
      else if (o.px === key && o.cs >= 0) res[o.cs] = o;
    }
    if (cab.on && cab.seat >= 0 && (cab.pax || key === myId())) res[cab.seat] = { me: 1 };
    return res;
  }

function paxCount(key) { var n = 0, k; for (k in net.others) if (net.others[k].px === key) n++; return n; }

function avCop() {
    var me = myId(), k, o; if (!me) return null;
    for (k in net.others) { o = net.others[k]; if (o.px === me && o.cs === 100) return o; }
    return null;
  }

function avPaxReq() {
    var me = myId(), k, o, cp = (cab.on && !cab.pax); if (!me) return;
    for (k in net.others) {
      o = net.others[k];
      if (o.px !== me || o.rr === undefined || o.rr > 1) continue;
      if (!((o.cs === 100 && cp) || av.h < 12)) continue;
      if (o.rr !== (av.ramp ? 1 : 0)) { av.ramp = o.rr; if (cab.on) cab.hatchTo = o.rr; return; }
    }
  }

function cabOpen(isPax, ty) {
    var g = cabGeo(ty); cab.on = true; cab.pax = !!isPax; cab.ty = ty; cab.hatch = (!isPax && ty === 3 && av.ramp) ? 1 : 0; cab.hatchTo = cab.hatch; cab.face = 1; cab.near = ''; cab.ph = 0; cab.rq = 2; cab.seat = -1;
    if (isPax) {
      var h = 0, id = String(pax.id || ''), k; for (k = 0; k < id.length; k++) h = (h * 31 + id.charCodeAt(k)) % 997;
      var occ = cabOcc(id), s0 = h % g.n, j, sj;
      for (j = 0; j < g.n; j++) { sj = (s0 + j) % g.n; if (!occ[sj]) { cab.seat = sj; break; } }
      cab.x = cab.seat >= 0 ? g.seats[cab.seat] : g.door + 120;
    } else {
      cab.seat = -1; cab.x = g.pilot - 100; av.ap = true; av.apH = null; if (av.h > 3) av.apH = Math.max(avMaxH() * 0.3, Math.min(avMaxH() * 0.75, av.h));
    }
    input.left = input.right = false; sfx('pick');
    toast(isPax ? 'Ты в салоне, ' + (cab.seat >= 0 ? 'место ' + (cab.seat + 1) + ' из ' + g.n : 'свободных кресел нет') + '. Место второго пилота рядом с кабиной: он ведёт борт, когда капитан встал. ←→ ходить, E у кресла: сесть/встать.' : 'Ты в салоне: идёт автопилот. ←→ ходить, E у кресла: сесть. У пилотского кресла E: вернуться в кабину.', 5500);
  }

function cabScene() {
    if (cab.pax) { var o = net.others[pax.id] || {}; return { alt: o.ah || 0, sp: (o.ah || 0) > 3 ? 420 : 0, l: o.l | 0 }; }
    return { alt: av.h, sp: Math.abs(av.v), l: loc.i };
  }

function avAutoLand() {
    if (loc.i === 5 || loc.i === SKY_ID) { sfx('no'); toast('Здесь не сесть: над водой и в небе автопосадка недоступна.', 3500); return; }
    if (av.h <= 3) { sfx('no'); toast('Борт уже на земле.', 2000); return; }
    av.ap = 'land'; sfx('pick'); toast('Автопилот заходит на посадку.', 3000);
  }

function cabDoor() {
    var air = cab.pax ? (pax.ah > 12) : (av.h > 3);
    if (cab.ty === 3 && !(cab.hatch > 0.95)) { sfx('no'); toast('Люк закрыт. Нажми кнопку у рампы, чтобы открыть.', 3000); return; }
    if (air) {
      if (cab.ty !== 3) { sfx('no'); toast('В полёте дверь не открыть.', 2500); return; }
      if (!cab.pax && av.h < 40) { sfx('no'); toast('Слишком низко для прыжка: набери высоту.', 2800); return; }
      cab.on = false; if (cab.pax) paxJump(); else { av.ap = false; avJump(); }
      return;
    }
    cab.on = false;
    if (cab.pax) paxExit(); else { av.ap = false; avExit(); }
  }

function cabAct() {
    var g = cabGeo(cab.ty), n = cab.near;
    if (n === 'stand') { cab.seat = -1; sfx('pick'); return; }
    if (n.indexOf('seat') === 0) { var i = +n.slice(4), oc = cabOcc(cabOwnerKey())[i]; if (oc && !oc.me) { sfx('no'); toast('Это кресло занято: ' + (oc.n || 'игрок'), 2200); return; } cab.seat = i; cab.x = g.seats[i]; cab.face = 1; sfx('pick'); toast('Кресло ' + (i + 1) + ' из ' + g.n + '. E: встать.', 2200); return; }
    if (n === 'cop') {
      var oc2 = cabOcc(pax.id)[100]; if (oc2 && !oc2.me) { sfx('no'); toast('Место второго пилота занято: ' + (oc2.n || 'игрок'), 2500); return; }
      var ow2 = net.others[pax.id]; cab.seat = 100; cab.x = g.pilot - 70; cab.face = 1; sfx('pick');
      toast(ow2 && ow2.cb ? 'Ты второй пилот: капитан в салоне, борт ведёшь ты. ←→ курс, ↑↓ высота. E: встать.' : 'Ты второй пилот. Управление перейдёт к тебе, когда капитан встанет с кресла. E: встать.', 4200); return;
    }
    if (n === 'hatch' && cab.pax) {
      var ow4 = net.others[pax.id];
      if (!(ow4 && ((cab.seat === 100 && ow4.cb) || pax.ah < 12))) { sfx('no'); toast('Люк в воздухе открывает капитан или второй пилот.', 2600); return; }
      cab.rq = cab.hatchTo ? 0 : 1; cab.hatchTo = cab.rq; sfx('pick'); toast(cab.hatchTo ? 'Грузовой люк открывается…' : 'Грузовой люк закрывается…', 2200); return;
    }
    if (n === 'hatch') { cab.hatchTo = cab.hatchTo ? 0 : 1; if (!cab.pax) av.ramp = cab.hatchTo; sfx('pick'); toast(cab.hatchTo ? 'Грузовой люк открывается…' : 'Грузовой люк закрывается…', 2200); return; }
    if (n === 'pilot') { cab.on = false; av.ap = false; av.apH = null; sfx('pick'); toast('Ты снова за штурвалом.', 2500); return; }
    if (n === 'land') { avAutoLand(); return; }
    if (n === 'door') { cabDoor(); return; }
    if (cab.pax) paxAct();
  }

function updateCab(dt) {
    if (!cab.on) return;
    if (cab.pax ? !pax.on : !av.on) { cab.on = false; return; }
    var g = cabGeo(cab.ty), i, n = '';
    cab.ph += dt;
    if (cab.pax && cab.ty === 3) { var ow = net.others[pax.id]; if (ow) { if (cab.rq !== 2 && (ow.rp ? 1 : 0) === cab.rq) cab.rq = 2; if (cab.rq === 2) cab.hatchTo = ow.rp ? 1 : 0; } }
    var dh = cab.hatchTo - cab.hatch; cab.hatch += Math.sign(dh) * Math.min(Math.abs(dh), dt / 1.5);
    if (cab.seat < 0) {
      var d = (input.right ? 1 : 0) - (input.left ? 1 : 0); cab.x += d * 190 * dt; if (d) cab.face = d;
      var minX = (cab.ty === 3 && cab.hatch > 0.9) ? 40 : g.door - 40; cab.x = Math.max(minX, Math.min(g.len - 60, cab.x));
      if (cab.x < g.door + 30) n = 'door';
      else if (g.btn && Math.abs(cab.x - g.btn) < 45) n = 'hatch';
      else if (!cab.pax && Math.abs(cab.x - g.pilot) < 55) n = 'pilot';
      else if (!cab.pax && Math.abs(cab.x - (g.pilot - 190)) < 45) n = 'land';
      else if (cab.pax && Math.abs(cab.x - (g.pilot - 70)) < 38) n = 'cop';
      else for (i = 0; i < g.seats.length; i++) if (Math.abs(cab.x - g.seats[i]) < 38) { n = 'seat' + i; break; }
    } else n = 'stand';
    cab.near = n;
  }

function cabWin(x, y, w, h, scn) {
    var hi = Math.min(1, scn.alt / 300);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    var g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, hi > 0.6 ? '#2f6fc0' : '#58b0ec'); g.addColorStop(1, '#d6f0fb'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    var off = (cab.ph * scn.sp * 0.22) % (w + 60), k;
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    for (k = 0; k < 3; k++) { var cx = x + (((k * 53 + 20 - off) % (w + 60)) + (w + 60)) % (w + 60) - 20; ctx.beginPath(); ctx.ellipse(cx, y + 8 + (k * 13) % Math.max(10, h * 0.5), 16, 6, 0, 0, 6.3); ctx.fill(); }
    var gh = Math.max(0, h * (0.42 - scn.alt / 520));
    if (gh > 0.5 && scn.l !== SKY_ID) { ctx.fillStyle = (scn.l === 5 || scn.l === 4) ? '#3b82c4' : (scn.l === 3 ? '#7d8590' : '#6fae62'); ctx.fillRect(x, y + h - gh, w, gh); }
    ctx.restore(); ctx.strokeStyle = '#1b2230'; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
  }

function cabSeatDraw(x, fy, col) {
    ctx.fillStyle = col; rrect(x - 26, fy - 36, 52, 14, 4); ctx.fill(); rrect(x - 32, fy - 90, 14, 62, 5); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x - 32, fy - 90, 14, 8); ctx.fillStyle = '#20262f'; ctx.fillRect(x - 5, fy - 22, 8, 22);
  }
