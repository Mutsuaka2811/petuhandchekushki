/* defs · 153 declarations · function finaleRun() { if (finOn) return; finOn = true; syncPause(); var ov = document.createElement('div'); ov.style.cs */

function finaleRun() {
    if (finOn) return;
    finOn = true; syncPause();
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;z-index:99999;background:#000;color:#fff8ea;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:"Rubik",system-ui,sans-serif;padding:24px;transition:background 2.5s;overflow:hidden';
    var cv = document.createElement('canvas'); cv.width = 320; cv.height = 320; cv.style.cssText = 'width:min(52vh,320px);height:min(52vh,320px);opacity:0;transition:opacity 1.6s;margin-bottom:10px;filter:drop-shadow(0 0 16px rgba(255,226,150,.9)) drop-shadow(0 0 40px rgba(255,200,90,.5))';
    var tx = document.createElement('div'); tx.style.cssText = 'max-width:640px;font-size:clamp(16px,2.8vh,24px);line-height:1.5;min-height:4.5em;opacity:0;transition:opacity 1.2s;text-shadow:0 2px 10px #000';
    var bt = document.createElement('button'); bt.type = 'button'; bt.textContent = 'Закрыть'; bt.style.cssText = 'margin-top:22px;padding:12px 34px;font-size:18px;font-weight:800;border-radius:14px;border:3px solid #1a2547;background:#ffd23f;color:#1a2547;cursor:pointer;opacity:0;pointer-events:none;transition:opacity 1.2s';
    ov.appendChild(cv); ov.appendChild(tx); ov.appendChild(bt); document.body.appendChild(ov);
    var g = cv.getContext('2d'), parts = [], dis = 0, disT = 0, raf = 0, last = performance.now(), done = false, tms = [];
    function say(s, big) { tx.style.opacity = 0; tms.push(setTimeout(function () { tx.innerHTML = s; tx.style.fontSize = big ? 'clamp(26px,6vh,52px)' : ''; tx.style.fontWeight = big ? '800' : '400'; tx.style.opacity = 1; }, 700)); }
    function at(ms, fn) { tms.push(setTimeout(fn, ms)); }
    function build() {
      var im = skinImg(mySkin), h = 280, w = Math.round(h * (im.naturalWidth || im.width) / (im.naturalHeight || im.height)), oc = document.createElement('canvas'); oc.width = 320; oc.height = 320;
      var og = oc.getContext('2d'); og.drawImage(im, (320 - w) / 2, 20, w, h);
      var d = og.getImageData(0, 0, 320, 320).data, x, y, i;
      for (y = 0; y < 320; y += 2) for (x = 0; x < 320; x += 2) { i = (y * 320 + x) * 4; if (d[i + 3] > 120) parts.push({ x: x, y: y, r: d[i], g: d[i + 1], b: d[i + 2], th: (x / 320) * 0.75 + Math.random() * 0.25, vx: 0, vy: 0, a: 1, go: 0 }); }
    }
    function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now; g.clearRect(0, 0, 320, 320);
      if (dis) disT = Math.min(1, disT + dt / 6);
      var i, p, alive = 0;
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        if (!p.go && dis && disT > p.th) { p.go = 1; p.vx = 20 + Math.random() * 60; p.vy = -30 - Math.random() * 50; }
        if (p.go) { p.vx += 40 * dt; p.vy -= 6 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a -= dt * 0.55; }
        if (p.a <= 0) continue; alive++;
        g.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + p.a.toFixed(2) + ')'; g.fillRect(p.x, p.y, 2.2, 2.2);
      }
      if (!done) raf = requestAnimationFrame(frame);
    }
    function close() {
      done = true; cancelAnimationFrame(raf); tms.forEach(clearTimeout); if (ov.parentNode) ov.parentNode.removeChild(ov);
      finOn = false; syncPause(); toast('Спасибо, что играл! Мир остался таким, каким ты его написал.', 6500);
    }
    bt.addEventListener('click', close);
    try { build(); } catch (e) {}
    raf = requestAnimationFrame(frame);
    at(100, function () { ov.style.background = 'radial-gradient(circle at 50% 40%,#5a4620 0%,#120d06 75%)'; });
    say('Ты открыл книгу и вписал новую строку.');
    at(4800, function () { say('Хоумлендера не было. Моггити не было. Прайма не было.<br>Ни одной вселенной не пришлось стирать.'); });
    at(10200, function () { say('История стала чистой.'); });
    at(13400, function () { cv.style.opacity = 1; say('Но чтобы вписать её, нужно было отдать то, что в книги не пишут: самого себя.'); });
    at(19200, function () { dis = 1; say('Края тебя осыпаются, как пепел, и уходят ветром.'); });
    var mem = ['Он вспоминает учёного, который не бросил Меллстроя и до конца верил в свой аппарат.', 'Чекушки, звенящие в карманах и на дне любого двора.', 'Белок, что таскали орешки и находки вместе с ним.', 'Меллстроя, которого удалось спасти.', 'Чикена Моггити: врага, ставшего частью этой истории.', 'Бургерную и ту самую ночную смену.'];
    mem.forEach(function (m, i) { at(22000 + i * 2400, function () { say(m); }); });
    at(36800, function () { say('«А я всё-таки жил не зря».', true); });
    at(42800, function () { cv.style.opacity = 0; ov.style.background = '#000'; say('КОНЕЦ', true); });
    at(47800, function () { say('«Петух и чекушки»<div style="font-size:16px;font-weight:400;margin-top:14px;opacity:.85">Игра создана</div>', true); });
    at(52800, function () { say('Nechicken', true); });
    at(57800, function () { say('Спасибо тебе', true); bt.style.opacity = 1; bt.style.pointerEvents = 'auto'; });
  }

function hvEnd(n) {
    var first = (save.mx.hv | 0) < 3, rw = n === 5 ? 200000 : (n === 4 ? 150000 : 100000), r = hvRel();
    var tx = n === 3 ? 'Ты поручился за копии. Книга осталась открытой, и в ней вдруг появились новые строки: добрые, неровные, написанные чьей-то дрожащей рукой. Копии вселенных живут. Прайм и Моггити остались вычеркнутыми, но их имена в книге теперь подчёркнуты.'
      : (n === 4 ? 'Ты вычеркнул копии и вписал вместо них своё имя: пусть отвечает оригинал. Мультивселенная погасла без боли. Книга закрылась. Небеса впервые за много лет услышали благодарность.'
        : 'Старший Судья опустил перо. Ты взял книгу, перелистал и не нашёл ни одной строки, за которую можно простить небеса. Ты стёр право судить. Теперь записи ведут все вместе. Судьи ушли, как будто с плеч упал груз.');
    var rl = r === 1 ? ' Твоя вера кивнула: так и должно быть.' : (r === 2 ? ' Твоя вера не успела договорить.' : (r === 3 ? ' Твоя вера уже считает прибыль.' : ''));
    dlgShow('Небеса', null, tx + rl, [{ t: 'Вернуться вниз', fn: function () { dlgClose(); save.mx.hv = Math.max(save.mx.hv | 0, n); if (first) { save.coins += rw; ach(n === 3 ? 'hv1' : (n === 4 ? 'hv2' : 'hv3')); } else if (n === 5) save.coins += 9000; persist(); hud(); sfx('rare'); if (!(save.mx.fin | 0)) { save.mx.fin = 1; persist(); ach('fin'); ltGo(24, 'left', CHI_PR - 160); finaleRun(); return; } ltGo(24, 'left', CHI_PR - 160); setTimeout(function () { toast(first ? 'Концовка глав: +' + fmtN(rw) + ' коинов.' : 'Победа над Старшим Судьёй: +9 000 коинов.', 6500); }, 1500); } }], first ? 'Награда за первую концовку: ' + fmtN(rw) + ' коинов.' : '');
  }

function hvPriestAfter() {
    var h = save.mx.hv | 0, t = h === 3 ? 'Ты поручился за копии. Я думал, небеса сотрут их, а мы оставили. Странно: мне впервые не страшно молиться.' : (h === 4 ? 'Ты отвечаешь за все копии сам. Тяжело. Я бы не смог. Но я рад, что книга закрыта.' : 'Ты снял с небес суд. Теперь никто не скажет: «вычеркнуть». Я пойду и перепишу свои старые строки, пока не поздно.');
    dlgShow('Священник', img.priest, t, [{ t: 'Назад', fn: priestTalk }]);
  }

function drawHvStairs(x0, x1) {
    if ((save.mx.hv | 0) < 1) return;
    var X = HV_ST; if (X < x0 - 200 || X > x1 + 200) return;
    csGlow(X, gY - 120, 160 + 12 * Math.sin(t * 3), '255,235,170', 0.35);
    ctx.save(); for (var i = 0; i < 9; i++) { ctx.fillStyle = 'rgba(255,240,190,' + (0.85 - i * 0.07).toFixed(2) + ')'; ctx.fillRect(X - 60 + i * 5, gY - 18 - i * 22, 120 - i * 10, 14); }
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЛЕСТНИЦА', X, gY - 232); ctx.restore();
  }

function drawHvRays(x0, x1) {
    var cx = camX + vw * 0.5; ctx.save(); ctx.globalAlpha = 0.5;
    for (var i = 0; i < 9; i++) { var an = -1.4 + i * 0.35 + 0.05 * Math.sin(t * 0.7 + i); ctx.fillStyle = 'rgba(255,240,180,.12)'; ctx.beginPath(); ctx.moveTo(cx, gY - 500); ctx.lineTo(cx + Math.sin(an - 0.1) * 1400, gY - 500 + Math.cos(an - 0.1) * 1400); ctx.lineTo(cx + Math.sin(an + 0.1) * 1400, gY - 500 + Math.cos(an + 0.1) * 1400); ctx.closePath(); ctx.fill(); }
    csGlow(cx, gY - 520, 380, '255,235,170', 0.35); ctx.restore();
  }

function drawJudge(x, col, ph) {
    var b = Math.sin(t * 1.4 + ph) * 4, i;
    ctx.save(); ctx.translate(x, gY - 10 - b);
    csGlow(0, -170, 150, col, 0.2);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 14 + b, 70, 9, 0, 0, 6.3); ctx.fill();
    var g = ctx.createLinearGradient(0, -260, 0, 10); g.addColorStop(0, '#fffdf4'); g.addColorStop(1, '#e8dec0'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-34, -190); ctx.lineTo(34, -190); ctx.lineTo(74, 6); ctx.lineTo(-74, 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgb(' + col + ')'; ctx.fillRect(-10, -190, 20, 196); ctx.fillStyle = 'rgba(' + col + ',.55)'; ctx.fillRect(-74, -4, 148, 8);
    ctx.fillStyle = '#f0e6c8'; ctx.beginPath(); ctx.arc(0, -214, 30, 0, 6.3); ctx.fill(); ctx.fillStyle = '#5a4a3a'; ctx.beginPath(); ctx.arc(0, -214, 24, 3.4, 6.0); ctx.fill();
    ctx.fillStyle = 'rgb(' + col + ')'; ctx.beginPath(); ctx.arc(-9, -212, 3.5, 0, 6.3); ctx.arc(9, -212, 3.5, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(255,225,120,.95)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, -258 + 3 * Math.sin(t * 2 + ph), 32, 8, 0, 0, 6.3); ctx.stroke();
    ctx.fillStyle = '#6a3f20'; ctx.fillRect(48, -118 - 8 * Math.sin(t * 1.6 + ph), 46, 58); ctx.fillStyle = '#fff8e0'; ctx.fillRect(52, -114 - 8 * Math.sin(t * 1.6 + ph), 38, 50);
    for (i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(' + col + ',.8)'; ctx.fillRect(56, -108 - 8 * Math.sin(t * 1.6 + ph) + i * 11, 30, 2); }
    ctx.restore();
  }

function drawHeavenBack(x0, x1) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fff6d8'); g.addColorStop(0.55, '#ffe2a2'); g.addColorStop(1, '#f4b860'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var i, w = LOCS[25].w, a = Math.max(0, x0), b = Math.min(w, x1);
    for (i = 0; i < 7; i++) { var rx = (i * 313 + camX * 0.05) % W; ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(rx, 60 + (i % 3) * 38, 120, 26, 0, 0, 6.3); ctx.ellipse(rx + 70, 52 + (i % 3) * 38, 80, 22, 0, 0, 6.3); ctx.fill(); }
    setCam(1);
    for (i = Math.floor(a / 400) * 400; i < b + 400; i += 400) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(i + 150, gY - 460, 56, 460); ctx.fillStyle = '#fff'; ctx.fillRect(i + 140, gY - 470, 76, 16); ctx.fillRect(i + 140, gY - 22, 76, 22); }
    ctx.fillStyle = '#fff7e4'; ctx.fillRect(a, gY - 2, b - a, 12); ctx.fillStyle = 'rgba(255,255,255,.95)';
    for (i = Math.floor(a / 120) * 120; i < b + 120; i += 120) { ctx.beginPath(); ctx.ellipse(i + 60, gY + 18 + 4 * Math.sin(t + i), 90, 24, 0, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = '#f4dba0'; ctx.fillRect(a, gY + 36, b - a, H / scale);
    var cols = ['106,168,255', '255,122,122', '125,255,156'];
    for (i = 0; i < 3; i++) if (HV_J[i] > x0 - 200 && HV_J[i] < x1 + 200) { drawJudge(HV_J[i], cols[i], i * 1.7); ctx.fillStyle = '#6a5a3a'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(['СУДЬЯ СЧЁТА', 'СУДЬЯ ЗАПИСИ', 'СУДЬЯ МИЛОСТИ'][i] + (((save.mx.hvj | 0) >> i) & 1 ? ' ✓' : ''), HV_J[i], gY - 290); }
    var X = HV_GATE; if (X > x0 - 260 && X < x1 + 260) {
      csGlow(X, gY - 160, 240 + 14 * Math.sin(t * 2), '255,235,170', 0.5);
      ctx.fillStyle = '#e8c25a'; ctx.fillRect(X - 110, gY - 340, 24, 340); ctx.fillRect(X + 86, gY - 340, 24, 340); ctx.beginPath(); ctx.arc(X, gY - 340, 110, Math.PI, 0); ctx.lineWidth = 24; ctx.strokeStyle = '#e8c25a'; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,' + (((save.mx.hvj | 0) === 7) ? 0.85 : 0.35) + ')'; ctx.beginPath(); ctx.moveTo(X - 86, gY); ctx.lineTo(X - 86, gY - 340); ctx.arc(X, gY - 340, 86, Math.PI, 0); ctx.lineTo(X + 86, gY); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#6a5a3a'; ctx.font = '700 14px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ВРАТА', X, gY - 470);
    }
    if (160 > x0 - 200 && 160 < x1 + 200) { csGlow(160, gY - 110, 120, '255,240,190', 0.4); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('ЛЕСТНИЦА ВНИЗ', 160, gY - 232); }
  }

function mx56() { var m = save.mx; m.cmt = m.cmt | 0; m.vlt = m.vlt || 0; m.arr = m.arr | 0; m.lot = m.lot | 0; m.crt = m.crt || 0; return m; }

function nxImg(k) { return ready(img[k]) ? img[k] : null; }

function cemGraves() {
    var m = save.mx, a = [], k, u = m.c2u | 0;
    if ((m.c2p | 0) === 2) a.push({ id: 0, n: 'Меллстрой', e: 'Хотел как лучше. Получилось как всегда.' });
    if ((m.c2p | 0) === 3) a.push({ id: 1, n: 'Прайм', e: 'Из другой вселенной. Тоже всем надоел.' });
    if ((m.mgo | 0) === 1 || ((m.c2p | 0) === 2)) a.push({ id: 2, n: 'Чикен Моггити', e: 'Был главным. Теперь просто лежит.' });
    for (k = 0; k < 5; k++) if (u & (1 << k)) a.push({ id: 3 + k, n: (UV[k] && UV[k].n) || ('Вселенная ' + (k + 1)), e: 'Босс вселенной №' + (k + 1) + '. Заходи ещё.' });
    a.push({ id: 8, n: 'Чекушка №0', e: 'Первая. Её не сдали, её выпили.' });
    a.push({ id: 9, n: 'Здесь будет Кокич', e: 'Не торопись. Хотя памятник уже заказан.' });
    return a;
  }

function cemX(i) { return 520 + i * 230; }

function cemFlower(g) {
    var m = mx56(), bit = 1 << g.id;
    if (m.cmt & bit) { dlgShow('Могила', null, g.n + '. «' + g.e + '» Цветы уже лежат.', [{ t: 'Назад', out: true }]); return; }
    dlgShow('Могила: ' + g.n, null, '«' + g.e + '»', [
      { t: 'Положить цветы (150)', fn: function () {
        if (save.coins < 150) { sfx('no'); toast('Не хватает на цветы.', 2200); return; }
        dlgClose(); save.coins -= 150; m.cmt |= bit; bkPrev = save.coins; hud(); sfx('rare'); hp = Math.min(maxHp(), hp + 20); persist();
        var gr = cemGraves(), all = true, i; for (i = 0; i < gr.length; i++) if (!(m.cmt & (1 << gr[i].id))) all = false;
        if (all) { save.coins += 2000; bkPrev = save.coins; hud(); ach('cem'); toast('Все могилы с цветами. Кто-то оставил на воротах 2000 коинов.', 4500); }
        else toast('Тихо. На душе чуть легче (+20 HP).', 2600);
      } },
      { t: 'Постоять молча', out: true }]);
  }

function cemDig() {
    if (digCd > 0) { sfx('no'); toast('Могильщик не даст копать так часто.', 2200); return; }
    digCd = 25; var r = Math.random();
    if (r < 0.35) { var g = 200 + Math.floor(Math.random() * 600); save.coins += g; bkPrev = save.coins; hud(); sfx('rare'); popup(P.x, 120, '+' + g, '#ffd23f'); toast('Нашёл кошелёк: ' + g + ' коинов.', 2600); }
    else if (r < 0.7) { sfx('no'); hurt(12); toast('Из ямы вылез скелет и дал по лбу.', 2600); }
    else { toast('Пусто. Только кости и старая чекушка.', 2600); }
    persist();
  }

function cemKeeper() {
    dlgShow('Могильщик', nxImg('worker'), 'Тут лежат все, кого ты победил или пережил. Цветы по 150: мёртвым без разницы, а живым приятно. Хочешь покопать? Бесплатно, но яма опасная.', [
      { t: 'Покопать', fn: function () { dlgClose(); cemDig(); } },
      { t: 'Что за кладбище?', fn: function () { dlgShow('Могильщик', nxImg('worker'), 'Новые могилы появляются сами, когда кто-то заканчивает свою историю. Положишь цветы на каждую, и тебе будет подарок.', [{ t: 'Понятно', out: true }]); } },
      { t: 'Уйти', out: true }]);
  }

function jailFree(why) { var m = mx56(); m.arr = 0; jailT = 0; persist(); colAway(120); toast(why, 3500); }

function jailArrest(why) {
    var m = mx56(); m.arr = 1; jailT = 70; runN = 0; persist(); sfx('no');
    dlgShow('Коллекторы', null, why + ' Тебя забирают в тюрьму. Выйти можно по залогу, по сроку или побегом.', [{ t: 'Ну пожалуйста…', fn: function () { dlgClose(); ltGo(JAIL, 'left', 300); } }]);
  }

function jlTick(dt) {
    var m = save.mx; if (crCd > 0) crCd -= dt; if (digCd > 0) digCd -= dt;
    if ((m.arr | 0) && loc.i !== JAIL && !lt.st && colOkAny()) { ltGo(JAIL, 'left', 300); return; }
    if ((m.arr | 0) && loc.i === JAIL && !dlgOpened && !paused && !lt.st) {
      jailT -= dt; if (jailT <= 0) { jailFree('Срок вышел. Тебя выпустили, коллекторы дадут две минуты.'); }
    }
  }

function jailGuard() {
    var m = mx56(), D = m.bkD | 0, bail = Math.max(500, Math.ceil(D * 0.1)), ch = [];
    if (m.arr) {
      ch.push({ t: 'Заплатить залог: ' + fmtN(bail), fn: function () { if (save.coins < bail) { sfx('no'); toast('На залог не хватает.', 2200); return; } dlgClose(); save.coins -= bail; bkPrev = save.coins; hud(); jailFree('Залог внесён. Свободен.'); } });
      ch.push({ t: 'Попробовать побег (3 испытания)', fn: function () {
        dlgClose(); miniRun(mnPick(3), 0.65, 'Побег из тюрьмы', function (ok) {
          if (ok) { jailFree('Побег удался. Охрана ещё долго будет думать, как ты это сделал.'); ach('escp'); }
          else { jailT += 40; hurt(15); sfx('no'); toast('Поймали. Срок +40 секунд.', 3000); }
        });
      } });
      ch.push({ t: 'Сидеть дальше', out: true });
      dlgShow('Охранник', nxImg('guard'), 'Осталось сидеть ' + Math.max(1, Math.ceil(jailT)) + ' сек. Или залог ' + fmtN(bail) + '. Или побег, но мы за это бьём.', ch);
    } else {
      dlgShow('Охранник', nxImg('guard'), 'Ты сюда на экскурсию? Ладно. Тут сидят должники, в основном. Не попадайся коллекторам три раза.', [{ t: 'Понятно', out: true }]);
    }
  }

function jailInmate() {
    var hints = ['Коллекторы любят банк и не любят бегающих. Убежишь трижды, и привет, нары.', 'Суд принимает мировую раз в десять минут. Дешевле, чем платить весь долг.', 'На базаре скупщик даёт на двенадцать процентов больше. Не ленись.', 'Копилка дома: коллекторам до неё не дотянуться.', 'На кладбище каждому цветы. Говорят, на воротах потом подарок.'];
    dlgShow('Сокамерник', nxImg('muscle'), hints[Math.floor(Math.random() * hints.length)], [{ t: 'Спасибо', out: true }]);
  }

function courtJudge() {
    var m = mx56(), D = m.bkD | 0, ch = [], now = Date.now(), ready0 = !(m.crt > now - 10 * 60 * 1000);
    if (D > 0 && ready0) {
      ch.push({ t: 'Мировая: долг −30%, пошлина 5% долга', fn: function () {
        var fee = Math.ceil(D * 0.05); if (save.coins < fee) { sfx('no'); toast('На пошлину не хватает: ' + fmtN(fee), 2400); return; }
        dlgClose(); save.coins -= fee; m.bkD = Math.max(1, Math.floor(D * 0.7)); m.crt = Date.now(); bkPrev = save.coins; hud(); persist(); sfx('rare'); ach('crt'); toast('Мировая подписана. Долг: ' + fmtN(m.bkD), 4000);
      } });
      ch.push({ t: 'Оспорить долг (3 испытания)', fn: function () {
        dlgClose(); miniRun(mnPick(3), 0.65, 'Суд: оспорить долг', function (ok) {
          m.crt = Date.now();
          if (ok) { m.bkD = Math.max(1, Math.floor(D * 0.5)); persist(); sfx('rare'); ach('crt'); toast('Суд встал на твою сторону. Долг: ' + fmtN(m.bkD), 4000); }
          else { m.bkD = Math.ceil(D * 1.1); persist(); sfx('no'); toast('Проиграл. Долг вырос на 10%: ' + fmtN(m.bkD), 4000); }
        });
      } });
    } else if (D > 0) ch.push({ t: 'Подать ещё иск', fn: function () { dlgShow('Судья', nxImg('guard'), 'Ты уже был у нас. Приходи через десять минут, ' + (D > 0 ? 'долг никуда не денется.' : ''), [{ t: 'Ладно', out: true }]); } });
    ch.push({ t: 'Заседание присяжных (2 испытания, награда)', fn: function () {
      if (crCd > 0) { dlgClose(); sfx('no'); toast('Дел пока нет. Подожди ' + Math.ceil(crCd) + ' сек.', 2200); return; }
      dlgClose(); miniRun(mnPick(2), 0.6, 'Присяжные', function (ok) {
        crCd = 150;
        if (ok) { var g = 500 + Math.floor(Math.random() * 400); save.coins += g; bkPrev = save.coins; hud(); persist(); sfx('rare'); toast('Вердикт вынесен. Гонорар: ' + g, 3000); }
        else { sfx('no'); toast('Присяжные тебя не послушали.', 2400); }
      });
    } });
    ch.push({ t: 'Выйти', out: true });
    dlgShow('Судья', nxImg('guard'), D > 0 ? 'Долг банку: ' + fmtN(D) + '. Мировая или спор. Или платить, как все.' : 'Дел о долгах на тебя нет. Хочешь поработать присяжным?', ch);
  }

function homeBed() {
    dlgShow('Кровать', null, 'Мягкая, пахнет носками. Поспать?', [
      { t: 'Поспать', fn: function () { dlgClose(); hp = maxHp(); mgMana = mgCap(); sfx('rare'); toast('Выспался. Здоровье и магия полны.', 3000); ach('home'); } },
      { t: 'Не сейчас', out: true }]);
  }

function homeVault() {
    var m = mx56(), v = m.vlt, ch = [];
    [1000, 10000].forEach(function (a) { if (save.coins >= a) ch.push({ t: 'Положить ' + fmtN(a), fn: function () { dlgClose(); save.coins -= a; m.vlt = Math.min(1e12, v + a); bkPrev = save.coins; hud(); persist(); sfx('sell'); } }); });
    if (save.coins > 0) ch.push({ t: 'Положить всё', fn: function () { var a = save.coins; dlgClose(); save.coins = 0; m.vlt = Math.min(1e12, v + a); bkPrev = 0; hud(); persist(); sfx('sell'); } });
    if (v > 0) ch.push({ t: 'Забрать всё: ' + fmtN(v), fn: function () { dlgClose(); save.coins += v; m.vlt = 0; bkPrev = save.coins; hud(); persist(); sfx('sell'); } });
    ch.push({ t: 'Закрыть', out: true });
    dlgShow('Копилка', null, 'Внутри ' + fmtN(v) + ' коинов. Коллекторы сюда не добираются.', ch);
  }

function homeShelf() {
    var m = save.mx, a = [];
    a.push('Побед в боях: ' + (save.wins | 0));
    if ((m.c2p | 0) === 1) a.push('Прайм побеждён.'); if ((m.c2p | 0) === 2) a.push('Меллстрой и Моггити ушли.'); if ((m.c2p | 0) === 3) a.push('Прайм пал, Моггити в союзниках.');
    a.push('Вселенных пройдено: ' + (function (u) { var c = 0, k; for (k = 0; k < 5; k++) if (u & (1 << k)) c++; return c; })(m.c2u | 0) + ' из 5.');
    if ((m.hv | 0) >= 3) a.push('Небеса пройдены.');
    dlgShow('Полка трофеев', null, a.join(' '), [{ t: 'Закрыть', out: true }]);
  }

function homePhotos() {
    var m = save.mx, t = (m.hv | 0) >= 3 ? 'Фото со священником у свечей. Он обнимает и не знает, куда деть руки.' : ((m.c2p | 0) ? 'Фото Кокича на фоне разрушенной лаборатории. Улыбается зря.' : 'Старое фото: Кокич и первая чекушка.');
    dlgShow('Фотографии', null, t, [{ t: 'Закрыть', out: true }]);
  }

function bzSell() {
    if (save.carried <= 0 && !(save.sec > 0) && !(save.wool > 0)) { sfx('no'); toast('Нечего сдавать.', 2000); return; }
    var b0 = save.coins; sellAll(); var g = save.coins - b0, ex = Math.max(1, Math.round(g * 0.12)); if (g > 0) { save.coins += ex; bkPrev = save.coins; hud(); persist(); popup(P.x, 150, 'базар +' + ex, '#7dff9c'); }
  }

function bzLottery() {
    var m = mx56();
    dlgShow('Лотерея', nxImg('muscle'), 'Билет 300. Выиграть можно до десяти тысяч. Билетов куплено: ' + (m.lot | 0) + '.', [
      { t: 'Купить билет (300)', fn: function () {
        if (save.coins < 300) { sfx('no'); toast('Не хватает на билет.', 2200); return; }
        dlgClose(); save.coins -= 300; m.lot = Math.min(1e6, (m.lot | 0) + 1);
        var r = Math.random(), w = 0; if (r < 0.005) w = 10000; else if (r < 0.04) w = 2500; else if (r < 0.12) w = 1000; else if (r < 0.34) w = 350;
        save.coins += w; bkPrev = save.coins; hud(); persist();
        if (w >= 10000) { ach('jack'); sfx('rare'); toast('ДЖЕКПОТ: ' + fmtN(w), 5000); } else if (w) { sfx('rare'); toast('Выигрыш: ' + fmtN(w), 2800); } else { sfx('no'); toast('Мимо. Бумажка.', 2000); }
      } },
      { t: 'Уйти', out: true }]);
  }

function bzFortune() {
    dlgShow('Гадалка', nxImg('priest'), 'Сто коинов, и скажу, куда идти.', [
      { t: 'Заплатить (100)', fn: function () {
        if (save.coins < 100) { sfx('no'); toast('Не хватает.', 2000); return; }
        dlgClose(); save.coins -= 100; bkPrev = save.coins; hud(); persist();
        var m = save.mx, t;
        if ((m.bkD | 0) > 0) t = 'Долг тебя догонит. Ищи суд в Городе: там можно сбить его.';
        else if ((m.c2p | 0) >= 1 && !(m.hv | 0)) t = 'Священнику тяжело. Поговори с ним в церкви, в Лесу.';
        else if ((m.hv | 0) >= 1 && (m.hv | 0) < 3) t = 'Небеса ждут твоего решения.';
        else if (!(m.cmt | 0)) t = 'В конце Леса есть ворота. За ними тихо.';
        else t = 'Ты уже всё знаешь. Сходи домой, выспись.';
        dlgShow('Гадалка', nxImg('priest'), t, [{ t: 'Спасибо', out: true }]);
      } },
      { t: 'Нет', out: true }]);
  }

function bzBoard() {
    dlgShow('Доска объявлений', null, 'Продам стекловату, недорого. · Суд принимает мировую раз в десять минут. · Дом Кокича: в сейфе безопаснее. · Лотерея: честная, почти. · Кладбище: цветы по 150.', [{ t: 'Ясно', out: true }]);
  }

function nlSpot() {
    var i = loc.i, s, gr, k;
    if (i === 11) return v2sp(CEM_G, 120, 'Кладбище', 'войти на кладбище', function () { ltGo(CEM, 'left', NX_OUT + 80); });
    if (i === 1) return v2sp(HOME_G, 110, 'Дом', 'зайти домой', function () { ltGo(HOME, 'left', NX_OUT + 80); })
      || v2sp(BAZ_G, 130, 'Базар', 'зайти на базар', function () { ltGo(BAZ, 'left', NX_OUT + 80); })
      || v2sp(CRT_G, 130, 'Суд', 'зайти в суд', function () { ltGo(CRT, 'left', NX_OUT + 80); });
    if (i === CEM) {
      s = v2sp(NX_OUT, 90, 'Выйти', 'выйти из кладбища', function () { ltGo(11, 'left', CEM_G - 140); }); if (s) return s;
      gr = cemGraves(); for (k = 0; k < gr.length; k++) { s = v2sp(cemX(k), 80, 'Могила', 'могила: ' + gr[k].n, (function (g) { return function () { cemFlower(g); }; })(gr[k])); if (s) return s; }
      return v2sp(cemX(gr.length) + 120, 130, 'Могильщик', 'поговорить с могильщиком', cemKeeper);
    }
    if (i === HOME) return v2sp(NX_OUT, 90, 'Выйти', 'выйти на улицу', function () { ltGo(1, 'left', HOME_G); }) || v2sp(HM_BED, 120, 'Кровать', 'поспать', homeBed) || v2sp(HM_VLT, 100, 'Копилка', 'открыть копилку', homeVault) || v2sp(HM_SHF, 110, 'Полка', 'осмотреть трофеи', homeShelf) || v2sp(HM_PH, 100, 'Фото', 'посмотреть фото', homePhotos);
    if (i === BAZ) return v2sp(NX_OUT, 90, 'Выйти', 'выйти на улицу', function () { ltGo(1, 'left', BAZ_G); }) || v2sp(BZ_SELL, 130, 'Скупщик', 'сдать чекушки (+12%)', bzSell) || v2sp(BZ_LOT, 120, 'Лотерея', 'сыграть в лотерею', bzLottery) || v2sp(BZ_FT, 120, 'Гадалка', 'спросить гадалку', bzFortune) || v2sp(BZ_BRD, 110, 'Доска', 'прочитать объявления', bzBoard);
    if (i === CRT) return v2sp(NX_OUT, 90, 'Выйти', 'выйти на улицу', function () { ltGo(1, 'left', CRT_G); }) || v2sp(CR_J, 140, 'Судья', 'говорить с судьёй', courtJudge) || v2sp(CR_JAIL, 110, 'Тюрьма', 'пройти в тюрьму', function () { ltGo(JAIL, 'left', NX_OUT + 80); });
    if (i === JAIL) return v2sp(NX_OUT, 90, 'Выйти', 'выйти в суд', function () { if ((save.mx.arr | 0)) { sfx('no'); toast('Заперто. Нужен залог, срок или побег.', 2800); } else ltGo(CRT, 'left', CR_JAIL - 120); }) || v2sp(JL_INM, 120, 'Сокамерник', 'поговорить', jailInmate) || v2sp(JL_G, 120, 'Охранник', 'поговорить с охранником', jailGuard);
    return null;
  }

function nxSky(c1, c2) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); setCam(1); }

function nxLabel(x, y, t, c) { ctx.fillStyle = c || '#fff'; ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t, x, y); }

function nxDoor(x, t, c) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x - 40, gY - 150, 80, 150); ctx.fillStyle = c || '#c9a860'; ctx.fillRect(x - 40, gY - 154, 80, 6); nxLabel(x, gY - 164, t, '#fff'); }

function drawCemBack(x0, x1) {
    nxSky('#0d1226', '#2b3a58');
    var w = LOCS[CEM].w, a = Math.max(0, x0), b = Math.min(w, x1), i, gr = cemGraves(), m = save.mx;
    ctx.fillStyle = '#e8ecff'; ctx.beginPath(); ctx.arc(x0 + (x1 - x0) * 0.8, gY - 440, 46, 0, 6.3); ctx.fill();
    csGlow(x0 + (x1 - x0) * 0.8, gY - 440, 220, '200,215,255', 0.25);
    ctx.fillStyle = '#1b2a2a'; ctx.fillRect(a, gY - 2, b - a, 900);
    ctx.fillStyle = '#10161f'; for (i = Math.floor(a / 60) * 60; i < b + 60; i += 60) { ctx.fillRect(i, gY - 130, 6, 130); ctx.beginPath(); ctx.moveTo(i - 3, gY - 130); ctx.lineTo(i + 3, gY - 150); ctx.lineTo(i + 9, gY - 130); ctx.fill(); }
    ctx.fillRect(a, gY - 100, b - a, 5);
    nxDoor(NX_OUT, 'ВЫХОД', '#8a93a5');
    for (i = 0; i < gr.length; i++) {
      var X = cemX(i), fl = (m.cmt | 0) & (1 << gr[i].id); if (X < x0 - 100 || X > x1 + 100) continue;
      ctx.fillStyle = '#8a93a5'; ctx.beginPath(); ctx.moveTo(X - 36, gY); ctx.lineTo(X - 36, gY - 90); ctx.arc(X, gY - 90, 36, Math.PI, 0); ctx.lineTo(X + 36, gY); ctx.fill();
      ctx.fillStyle = '#5a6272'; ctx.fillRect(X - 3, gY - 100, 6, 30); ctx.fillRect(X - 14, gY - 90, 28, 6);
      if (fl) { ctx.fillStyle = '#ff7aa8'; for (var q = -2; q <= 2; q++) { ctx.beginPath(); ctx.arc(X + q * 12, gY + 6 - Math.abs(q) * 2, 7, 0, 6.3); ctx.fill(); } }
      nxLabel(X, gY + 40, gr[i].n, '#cfd6ea');
    }
    var kx = cemX(gr.length) + 120; bgNpc('worker', kx, 230, false, 1.2); nxLabel(kx, gY - 250, 'МОГИЛЬЩИК', '#cfd6ea');
    ctx.fillStyle = 'rgba(200,215,255,.10)'; for (i = 0; i < 6; i++) { var fx = (i * 480 + t * 14) % (w + 400) - 200; ctx.beginPath(); ctx.ellipse(fx, gY - 10, 220, 22, 0, 0, 6.3); ctx.fill(); }
  }

function drawHomeBack(x0, x1) {
    nxSky('#ffe9c8', '#e8c78e');
    var w = LOCS[HOME].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#f6dca8'; ctx.fillRect(a, gY - 420, b - a, 420); ctx.fillStyle = '#9a6a3c'; ctx.fillRect(a, gY - 2, b - a, 900);
    ctx.fillStyle = '#7a5230'; for (i = Math.floor(a / 90) * 90; i < b + 90; i += 90) ctx.fillRect(i, gY - 2, 3, 900);
    nxDoor(NX_OUT, 'ВЫХОД', '#b88a50');
    ctx.fillStyle = '#7ec8ff'; ctx.fillRect(HM_BED - 200, gY - 300, 120, 100); ctx.fillStyle = '#fff'; ctx.fillRect(HM_BED - 143, gY - 300, 6, 100);
    ctx.fillStyle = '#c04a4a'; ctx.fillRect(HM_BED - 90, gY - 60, 180, 40); ctx.fillStyle = '#fff'; ctx.fillRect(HM_BED - 90, gY - 80, 60, 24); ctx.fillStyle = '#5a3a20'; ctx.fillRect(HM_BED - 96, gY - 30, 10, 30); ctx.fillRect(HM_BED + 86, gY - 30, 10, 30); nxLabel(HM_BED, gY - 100, 'КРОВАТЬ', '#5a3a20');
    ctx.fillStyle = '#4a5568'; ctx.fillRect(HM_VLT - 50, gY - 110, 100, 110); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(HM_VLT, gY - 55, 20, 0, 6.3); ctx.fill(); ctx.fillStyle = '#4a5568'; ctx.fillRect(HM_VLT - 6, gY - 61, 12, 12); nxLabel(HM_VLT, gY - 125, 'КОПИЛКА: ' + fmtN(save.mx.vlt || 0), '#5a3a20');
    ctx.fillStyle = '#7a5230'; ctx.fillRect(HM_SHF - 100, gY - 200, 200, 10); ctx.fillRect(HM_SHF - 100, gY - 120, 200, 10); ctx.fillStyle = '#ffd23f'; ctx.fillRect(HM_SHF - 70, gY - 240, 24, 40); ctx.fillRect(HM_SHF + 10, gY - 240, 24, 40); ctx.fillStyle = '#c9c1b2'; ctx.fillRect(HM_SHF - 30, gY - 160, 20, 40); nxLabel(HM_SHF, gY - 260, 'ТРОФЕИ', '#5a3a20');
    for (i = 0; i < 3; i++) { ctx.fillStyle = '#fff'; ctx.fillRect(HM_PH - 80 + i * 56, gY - 260 + (i % 2) * 20, 46, 56); ctx.fillStyle = ['#8bd0ff', '#ffb0b0', '#b5ffb0'][i]; ctx.fillRect(HM_PH - 76 + i * 56, gY - 256 + (i % 2) * 20, 38, 40); } nxLabel(HM_PH, gY - 280, 'ФОТО', '#5a3a20');
  }

function drawBazBack(x0, x1) {
    nxSky('#ffd9a0', '#f0a860');
    var w = LOCS[BAZ].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#d99b5a'; ctx.fillRect(a, gY - 2, b - a, 900);
    nxDoor(NX_OUT, 'ВЫХОД', '#b88a50');
    var st = [[BZ_SELL, 'СКУПЩИК +12%', '#3ca36a'], [BZ_LOT, 'ЛОТЕРЕЯ', '#d94a4a'], [BZ_FT, 'ГАДАЛКА', '#8a5ad9'], [BZ_BRD, 'ДОСКА', '#c9a860']];
    st.forEach(function (s) {
      var X = s[0]; if (X < x0 - 200 || X > x1 + 200) return;
      ctx.fillStyle = '#6a4a2a'; ctx.fillRect(X - 110, gY - 230, 8, 230); ctx.fillRect(X + 102, gY - 230, 8, 230);
      for (i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#fff' : s[2]; ctx.fillRect(X - 110 + i * 37, gY - 250, 37, 40); }
      ctx.fillStyle = '#7a5230'; ctx.fillRect(X - 100, gY - 60, 200, 60); nxLabel(X, gY - 262, s[1], '#4a3220');
    });
    bgNpc('muscle', BZ_SELL - 20, 210, false, 1.4); bgNpc('muscle', BZ_LOT, 210, true, 1.2); bgNpc('priest', BZ_FT, 210, false, 1.0);
    for (i = 0; i < 14; i++) { var fx = Math.floor(a / 230) * 230 + i * 230 + 60; ctx.fillStyle = ['#ff7a7a', '#7ac8ff', '#ffe27a'][i % 3]; ctx.fillRect(fx, gY - 380 + (i % 2) * 10, 130, 6); }
  }

function drawCrtBack(x0, x1) {
    nxSky('#e8e2d4', '#b9ae96');
    var w = LOCS[CRT].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#d4cab4'; ctx.fillRect(a, gY - 420, b - a, 420); ctx.fillStyle = '#6a5a4a'; ctx.fillRect(a, gY - 2, b - a, 900);
    ctx.fillStyle = '#efe7d2'; for (i = Math.floor(a / 300) * 300; i < b + 300; i += 300) { ctx.fillRect(i + 100, gY - 420, 50, 420); ctx.fillRect(i + 92, gY - 430, 66, 14); }
    nxDoor(NX_OUT, 'ВЫХОД', '#8a7a5a'); nxDoor(CR_JAIL, 'ТЮРЬМА', '#4a4a55');
    ctx.fillStyle = '#5a3a20'; ctx.fillRect(CR_J - 130, gY - 90, 260, 90); ctx.fillStyle = '#7a5230'; ctx.fillRect(CR_J - 140, gY - 100, 280, 14); nxLabel(CR_J, gY - 280, 'СУДЬЯ', '#4a3220');
    bgNpc('guard', CR_J, 230, false, 1.0);
    ctx.fillStyle = '#8a5a30'; ctx.fillRect(CR_JURY - 90, gY - 50, 180, 50); nxLabel(CR_JURY, gY - 70, 'СКАМЬЯ ПРИСЯЖНЫХ', '#4a3220');
    ctx.fillStyle = '#d9b84a'; ctx.fillRect(CR_J + 400, gY - 330, 4, 90); ctx.fillRect(CR_J + 370, gY - 332, 64, 4);
  }

function drawJailBack(x0, x1) {
    nxSky('#2a2c35', '#454856');
    var w = LOCS[JAIL].w, a = Math.max(0, x0), b = Math.min(w, x1), i;
    ctx.fillStyle = '#3a3d4a'; ctx.fillRect(a, gY - 420, b - a, 420); ctx.fillStyle = '#23252e'; ctx.fillRect(a, gY - 2, b - a, 900);
    ctx.fillStyle = '#6a6e80'; for (i = Math.floor(a / 260) * 260; i < b + 260; i += 260) { ctx.fillRect(i + 40, gY - 300, 140, 300); ctx.fillStyle = '#1a1c22'; ctx.fillRect(i + 50, gY - 290, 120, 290); ctx.fillStyle = '#6a6e80'; for (var q = 0; q < 6; q++) ctx.fillRect(i + 52 + q * 22, gY - 290, 6, 290); }
    nxDoor(NX_OUT, (save.mx.arr | 0) ? 'ЗАПЕРТО' : 'ВЫХОД', '#6a6e80');
    bgNpc('muscle', JL_INM, 220, false, 0.8); nxLabel(JL_INM, gY - 240, 'СОКАМЕРНИК', '#cfd6ea');
    bgNpc('guard', JL_G, 230, true, 1.0); nxLabel(JL_G, gY - 250, 'ОХРАННИК', '#cfd6ea');
    if (save.mx.arr | 0) { ctx.fillStyle = '#ff5a5a'; ctx.font = '700 22px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('СРОК: ' + Math.max(0, Math.ceil(jailT)) + ' с', camX + vw * 0.5, gY - 360); }
  }

function drawNxFront(L, x0, x1) {
    var i = L.theme;
    if (i === 'forest') {
      var X = CEM_G; if (X + 150 < x0 || X - 150 > x1) return; setCam(1);
      ctx.fillStyle = '#10161f'; for (var k = -3; k <= 3; k++) { ctx.fillRect(X + k * 24 - 3, gY - 150, 6, 150); ctx.beginPath(); ctx.moveTo(X + k * 24 - 6, gY - 150); ctx.lineTo(X + k * 24, gY - 172); ctx.lineTo(X + k * 24 + 6, gY - 150); ctx.fill(); }
      ctx.fillRect(X - 90, gY - 110, 180, 6); ctx.fillStyle = '#2a2f3a'; ctx.fillRect(X - 100, gY - 230, 16, 230); ctx.fillRect(X + 84, gY - 230, 16, 230); ctx.fillStyle = '#e8ecff'; ctx.font = '700 15px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('КЛАДБИЩЕ', X, gY - 190);
    } else if (i === 'city') {
      setCam(1);
      var X1 = HOME_G; if (!(X1 + 140 < x0 || X1 - 140 > x1)) { ctx.fillStyle = '#e8c27a'; ctx.fillRect(X1 - 100, gY - 150, 200, 150); ctx.fillStyle = '#b44a3a'; ctx.beginPath(); ctx.moveTo(X1 - 120, gY - 150); ctx.lineTo(X1, gY - 220); ctx.lineTo(X1 + 120, gY - 150); ctx.fill(); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(X1 - 22, gY - 90, 44, 90); ctx.fillStyle = '#9fd8ff'; ctx.fillRect(X1 + 44, gY - 120, 36, 36); ctx.fillRect(X1 - 80, gY - 120, 36, 36); nxLabel(X1, gY - 232, 'ДОМ КОКИЧА', '#fff'); }
      var X2 = BAZ_G; if (!(X2 + 160 < x0 || X2 - 160 > x1)) { for (var q = 0; q < 8; q++) { ctx.fillStyle = q % 2 ? '#fff' : '#d94a4a'; ctx.fillRect(X2 - 128 + q * 32, gY - 200, 32, 50); } ctx.fillStyle = '#6a4a2a'; ctx.fillRect(X2 - 128, gY - 150, 8, 150); ctx.fillRect(X2 + 120, gY - 150, 8, 150); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(X2 - 100, gY - 150, 200, 150); nxLabel(X2, gY - 212, 'БАЗАР', '#fff'); }
      var X3 = CRT_G; if (!(X3 + 160 < x0 || X3 - 160 > x1)) { ctx.fillStyle = '#d4cab4'; ctx.fillRect(X3 - 120, gY - 200, 240, 200); ctx.fillStyle = '#efe7d2'; for (var c = 0; c < 5; c++) ctx.fillRect(X3 - 110 + c * 50, gY - 190, 18, 190); ctx.beginPath(); ctx.moveTo(X3 - 140, gY - 200); ctx.lineTo(X3, gY - 262); ctx.lineTo(X3 + 140, gY - 200); ctx.fill(); ctx.fillStyle = '#4a4a55'; ctx.fillRect(X3 - 24, gY - 100, 48, 100); nxLabel(X3, gY - 274, 'СУД', '#fff'); }
    }
  }

function gxCan(w, h) { var c = document.createElement('canvas'); c.width = Math.max(2, Math.ceil(w)); c.height = Math.max(2, Math.ceil(h)); return c; }

function gxGlowSpr(rgb) {
    var c = gxCv['g' + rgb]; if (c) return c;
    c = gxCan(128, 128); var g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(' + rgb + ',1)'); gr.addColorStop(0.35, 'rgba(' + rgb + ',.42)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); gxCv['g' + rgb] = c; return c;
  }

function gxGlow(x, y, r, rgb, a) {
    var op = ctx.globalCompositeOperation, ga = ctx.globalAlpha; ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = ga * a;
    ctx.drawImage(gxGlowSpr(rgb), x - r, y - r, r * 2, r * 2); ctx.globalCompositeOperation = op; ctx.globalAlpha = ga;
  }

function gxShadow(x, y, w, a) {
    var c = gxCv.sh;
    if (!c) { c = gxCan(128, 128); var g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(8,12,28,.62)'); gr.addColorStop(0.55, 'rgba(8,12,28,.3)'); gr.addColorStop(1, 'rgba(8,12,28,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); gxCv.sh = c; }
    var ga = ctx.globalAlpha; ctx.globalAlpha = ga * a; ctx.drawImage(c, x - w, y - w * 0.2, w * 2, w * 0.4); ctx.globalAlpha = ga;
  }

function gxLayer(key, x0, x1, up, down, fn, nv) {
    var k0 = Math.max(0, Math.floor(x0 / GXCH)), k1 = Math.floor((x1 - 1) / GXCH), k, h = GXCH / 2 + 1, u = Math.round(up), d = Math.round(down);
    for (k = k0; k <= k1; k++) {
      var cx = k * GXCH + GXCH / 2, kk = 'L' + key + '|' + k + '|' + nv + '|' + u + '|' + d + '|' + gxFV, sp = SPR.map.get(kk);
      if (!sp) {
        var alt = SPR.map.get('L' + key + '|' + k + '|' + (nv ? 0 : 1) + '|' + u + '|' + d + '|' + gxFV);
        if (alt && gxBud <= 0) sp = alt;
        else if (gxBud > 0 || !alt) {
          gxBud--;
          sp = sprite(kk, u, h, d, (function (kq) { return function (hh) {
            var cxl = kq * GXCH + GXCH / 2; ctx.translate(hh - cxl, 0); ctx.beginPath(); ctx.rect(kq * GXCH - 1, gY - u - 4, GXCH + 2, u + d + 8); ctx.clip();
            try { fn(kq * GXCH - 1, (kq + 1) * GXCH + 1, nv); } catch (e) { gxErr = e; throw e; }
          }; })(k));
        }
      }
      if (sp) blit(sp, cx);
    }
  }

function gxUp() { return Math.min(Math.round(gY), 620); }

function gxDown() { return Math.min(Math.round(H / scale - gY) + 12, 300); }

function gxEach(xa, xb, step, off, pad, fn) {
    var a = Math.floor((xa - pad - off) / step), b = Math.ceil((xb + pad - off) / step), k;
    for (k = a; k <= b; k++) if (k >= 0) fn(off + k * step, k);
  }

function gxH(n) { return fpHash(n | 0); }

function gxRR(x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

function gxLG(x0, y0, x1, y1, a, b, c) { var g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); if (c) { g.addColorStop(0.55, b); g.addColorStop(1, c); } else g.addColorStop(1, b); return g; }

function gxInk(lw) { ctx.lineWidth = lw || 2; ctx.strokeStyle = GXI; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; }

function gxPanel(x, y, w, h, col, o) {
    o = o || {}; var r = o.r || 0, g = o.vert ? gxLG(x, y, x, y + h, shadeC(col, 0.18), col, shadeC(col, -0.2)) : gxLG(x, y, x + w, y, shadeC(col, 0.16), col, shadeC(col, -0.24));
    if (r) gxRR(x, y, w, h, r); else { ctx.beginPath(); ctx.rect(x, y, w, h); }
    ctx.fillStyle = g; ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(x, y, w, Math.min(5, h * 0.14));
    ctx.fillStyle = 'rgba(10,6,30,.17)'; ctx.fillRect(x, y + h - Math.min(6, h * 0.18), w, 7);
    if (o.tex) o.tex(x, y, w, h);
    ctx.restore();
    if (o.lw !== 0) { gxInk(o.lw || 2); if (r) gxRR(x, y, w, h, r); else { ctx.beginPath(); ctx.rect(x, y, w, h); } ctx.stroke(); }
  }

function gxBlob(cs, base, o) {
    o = o || {}; var i, c, mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
    for (i = 0; i < cs.length; i++) { c = cs[i]; mnx = Math.min(mnx, c.x - c.r); mny = Math.min(mny, c.y - c.r); mxx = Math.max(mxx, c.x + c.r); mxy = Math.max(mxy, c.y + c.r); }
    function path() { ctx.beginPath(); for (var q = 0; q < cs.length; q++) { var cc = cs[q]; ctx.moveTo(cc.x + cc.r, cc.y); ctx.arc(cc.x, cc.y, cc.r, 0, 6.2832); } }
    path(); ctx.lineJoin = 'round'; ctx.lineWidth = o.lw || 4; ctx.strokeStyle = shadeC(base, -0.68); ctx.stroke();
    ctx.fillStyle = shadeC(base, -0.3); ctx.fill();
    ctx.save(); path(); ctx.clip();
    var bw = mxx - mnx, bh = mxy - mny, g = ctx.createRadialGradient(mnx + bw * 0.3, mny + bh * 0.24, 3, mnx + bw * 0.5, mny + bh * 0.55, Math.max(bw, bh) * 0.78);
    g.addColorStop(0, shadeC(base, 0.34)); g.addColorStop(0.45, base); g.addColorStop(1, shadeC(base, -0.34));
    ctx.fillStyle = g; ctx.fillRect(mnx - 4, mny - 4, bw + 8, bh + 8);
    if (!o.clean) {
      ctx.lineWidth = 2.4;
      for (i = 0; i < cs.length; i++) {
        c = cs[i];
        ctx.strokeStyle = 'rgba(255,255,255,.26)'; ctx.beginPath(); ctx.arc(c.x - c.r * 0.08, c.y - c.r * 0.1, c.r * 0.78, 3.4, 5.1); ctx.stroke();
        ctx.strokeStyle = 'rgba(8,24,10,.26)'; ctx.beginPath(); ctx.arc(c.x + c.r * 0.06, c.y + c.r * 0.08, c.r * 0.82, 0.25, 2.4); ctx.stroke();
      }
    }
    var rr = rng((o.seed | 0) + 3), n = Math.min(o.clean ? 18 : 40, Math.round(bw * bh / 900)), lx, ly;
    for (i = 0; i < n; i++) { lx = mnx + rr() * bw; ly = mny + rr() * bh; ctx.fillStyle = (i % 3) ? shadeC(base, 0.4) : shadeC(base, -0.42); ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.ellipse(lx, ly, 3.4, 1.7, rr() * 3, 0, 6.3); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.restore();
  }

function gxWin(x, y, w, h, st, frame) {
    frame = frame || '#efe6d2';
    ctx.fillStyle = frame; ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
    var g = st === 1 ? gxLG(x, y, x, y + h, '#fff4c4', '#ffcf72', '#f2a040') : (st === 2 ? gxLG(x, y, x, y + h, '#34437a', '#1d2850') : gxLG(x, y, x, y + h, '#cdeefc', '#86c8ec', '#5fa9db'));
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    if (st === 0) { ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.moveTo(x + w * 0.1, y + h); ctx.lineTo(x + w * 0.5, y); ctx.lineTo(x + w * 0.78, y); ctx.lineTo(x + w * 0.38, y + h); ctx.fill(); }
    else if (st === 1) { ctx.fillStyle = 'rgba(150,70,20,.28)'; ctx.fillRect(x, y, w * 0.26, h); ctx.fillRect(x + w * 0.74, y, w * 0.26, h); }
    else { ctx.fillStyle = 'rgba(160,190,255,.14)'; ctx.fillRect(x + 1, y + 1, w * 0.35, h - 2); }
    ctx.fillStyle = frame; ctx.fillRect(x + w / 2 - 1, y, 2, h); if (h > 20) ctx.fillRect(x, y + h / 2 - 1, w, 2);
    gxInk(1.4); ctx.strokeRect(x - 3, y - 3, w + 6, h + 6);
    ctx.fillStyle = shadeC(frame, -0.16); ctx.fillRect(x - 5, y + h + 3, w + 10, 4); ctx.strokeRect(x - 5, y + h + 3, w + 10, 4);
  }

function gxDoor(x, y, w, h, col, glass) {
    gxPanel(x, y, w, h, col, { r: 3 });
    ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 5, y + 6, w - 10, h * 0.42); ctx.strokeRect(x + 5, y + h * 0.52, w - 10, h * 0.4);
    if (glass) { ctx.fillStyle = glass; ctx.fillRect(x + 6, y + 7, w - 12, h * 0.4); }
    ctx.fillStyle = '#ffd86a'; ctx.beginPath(); ctx.arc(x + w - 7, y + h * 0.55, 2.6, 0, 6.3); ctx.fill();
  }

function gxAwning(x, y, w, h, c1, c2) {
    var n = Math.max(2, Math.round(w / 22)), sw = w / n, i;
    for (i = 0; i < n; i++) {
      ctx.fillStyle = i % 2 ? c2 : c1; ctx.beginPath(); ctx.moveTo(x + i * sw, y); ctx.lineTo(x + (i + 1) * sw, y); ctx.lineTo(x + (i + 1) * sw, y + h); ctx.arc(x + (i + 0.5) * sw, y + h, sw / 2, 0, Math.PI); ctx.closePath(); ctx.fill();
      gxInk(1.5); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(x, y, w, 3);
  }

function gxText(s, x, y, px, col, outline, font) {
    ctx.font = (font || '700') + ' ' + px + 'px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (outline) { ctx.lineWidth = Math.max(3, px * 0.22); ctx.strokeStyle = outline; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
    ctx.fillStyle = col; ctx.fillText(s, x, y);
  }

function gxBig(s, x, y, px, col, outline) {
    ctx.font = px + 'px "Russo One", "Arial Black", Impact, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (outline) { ctx.lineWidth = Math.max(3, px * 0.2); ctx.strokeStyle = outline; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
    ctx.fillStyle = col; ctx.fillText(s, x, y);
  }

function gxPineShape(x, y, h, c1, c2) {
    var tiers = 5, i, w0 = h * 0.2;
    ctx.fillStyle = '#4a3020'; ctx.fillRect(x - h * 0.03, y - h * 0.22, h * 0.06, h * 0.22);
    for (i = 0; i < tiers; i++) {
      var ty = y - h * (0.14 + i * 0.17), tw = w0 * (1.25 - i * 0.2), th = h * 0.3;
      var g = ctx.createLinearGradient(x - tw, 0, x + tw, 0); g.addColorStop(0, shadeC(c2, 0.22)); g.addColorStop(0.45, c1); g.addColorStop(1, shadeC(c1, -0.38));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, ty - th); ctx.lineTo(x + tw, ty); ctx.quadraticCurveTo(x, ty + th * 0.1, x - tw, ty); ctx.closePath(); ctx.fill();
      gxInk(Math.max(1.4, h * 0.012)); ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.moveTo(x - tw, ty); ctx.quadraticCurveTo(x, ty + th * 0.12, x + tw, ty); ctx.lineTo(x + tw * 0.9, ty - th * 0.05); ctx.quadraticCurveTo(x, ty + th * 0.04, x - tw * 0.9, ty - th * 0.05); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.26)'; ctx.lineWidth = Math.max(1, h * 0.012); ctx.beginPath(); ctx.moveTo(x, ty - th); ctx.lineTo(x - tw * 0.78, ty - th * 0.2); ctx.stroke();
    }
  }

function gxPost() {
    if (!GX || gxQ < 1) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var nk = nightK(), ind = dnIndoor(), op = ctx.globalCompositeOperation, g;
    if (!ind) {
      ctx.globalCompositeOperation = 'soft-light';
      g = ctx.createLinearGradient(W, 0, 0, H); g.addColorStop(0, 'rgba(255,214,140,' + (0.5 * (1 - nk)).toFixed(2) + ')'); g.addColorStop(0.55, 'rgba(255,214,140,0)'); g.addColorStop(1, 'rgba(60,70,170,' + (0.22 + 0.2 * nk).toFixed(2) + ')');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = op;
    } else {
      ctx.globalCompositeOperation = 'soft-light';
      g = ctx.createRadialGradient(W / 2, H * 0.45, 20, W / 2, H * 0.45, Math.max(W, H) * 0.7); g.addColorStop(0, 'rgba(255,214,150,.32)'); g.addColorStop(1, 'rgba(40,40,110,.26)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = op;
    }
    var key = Math.round(W) + 'x' + Math.round(H), vc = gxCv.vg;
    if (!vc || vc.k !== key) {
      vc = gxCan(Math.max(64, W / 4), Math.max(64, H / 4)); vc.k = key; var vg = vc.getContext('2d'), rr = Math.hypot(vc.width, vc.height) * 0.62;
      var gg = vg.createRadialGradient(vc.width / 2, vc.height * 0.48, rr * 0.45, vc.width / 2, vc.height * 0.48, rr); gg.addColorStop(0, 'rgba(14,8,34,0)'); gg.addColorStop(1, 'rgba(14,8,34,.5)');
      vg.fillStyle = gg; vg.fillRect(0, 0, vc.width, vc.height); gxCv.vg = vc;
    }
    ctx.globalAlpha = 0.85; ctx.drawImage(vc, 0, 0, W, H); ctx.globalAlpha = 1;
  }

function gxTube(pts, w, col) {   // трубка с контуром: ломаная/кривая через точки
    var i;
    function pth() { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; pth(); ctx.lineWidth = w + 3.4; ctx.strokeStyle = GXI; ctx.stroke(); pth(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke();
    pth(); ctx.lineWidth = Math.max(1, w * 0.25); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.stroke();
  }

function gxOak(x, h, seed) {
    var r = rng(Math.floor(seed) + 11), tw = h * 0.1, i, cs = [], cy = gY - h * 0.72, cols = ['#58b43c', '#4ea636', '#63bf44'];
    gxShadow(x + h * 0.04, gY + 5, h * 0.36, 0.85);
    ctx.beginPath(); ctx.moveTo(x - tw * 1.25, gY + 3); ctx.bezierCurveTo(x - tw * 0.6, gY - h * 0.1, x - tw * 0.5, gY - h * 0.3, x - tw * 0.46, gY - h * 0.56);
    ctx.lineTo(x + tw * 0.46, gY - h * 0.56); ctx.bezierCurveTo(x + tw * 0.5, gY - h * 0.3, x + tw * 0.6, gY - h * 0.1, x + tw * 1.25, gY + 3); ctx.closePath();
    ctx.fillStyle = gxLG(x - tw, 0, x + tw, 0, '#94683f', '#6e4a2c', '#3f2a1a'); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(30,16,6,.34)'; ctx.lineWidth = 1.8;
    for (i = 0; i < 6; i++) { var bx = x - tw * 0.9 + i * tw * 0.36; ctx.beginPath(); ctx.moveTo(bx, gY); ctx.bezierCurveTo(bx + 4, gY - h * 0.16, bx - 3, gY - h * 0.32, bx + 2, gY - h * 0.56); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,230,180,.2)'; ctx.fillRect(x - tw, gY - h * 0.56, tw * 0.5, h * 0.56); ctx.restore();
    gxInk(Math.max(2, h * 0.014)); ctx.stroke();
    gxTube([[x - 1, gY - h * 0.5], [x - h * 0.1, gY - h * 0.58], [x - h * 0.2, gY - h * 0.66]], tw * 0.5, '#6a4a2c');
    gxTube([[x + 1, gY - h * 0.52], [x + h * 0.1, gY - h * 0.6], [x + h * 0.19, gY - h * 0.68]], tw * 0.46, '#6a4a2c');
    var crown = [
      { x: x, y: cy - h * 0.1, r: h * 0.23 },
      { x: x - h * 0.18, y: cy + h * 0.03, r: h * 0.19 },
      { x: x + h * 0.18, y: cy + h * 0.03, r: h * 0.19 },
      { x: x - h * 0.08, y: cy - h * 0.2, r: h * 0.17 },
      { x: x + h * 0.09, y: cy - h * 0.19, r: h * 0.17 }
    ];
    gxBlob(crown, cols[Math.floor(seed) % 3], { lw: Math.max(2.4, h * 0.02), seed: Math.floor(seed), clean: true });
  }

function gxBirch(x, h, seed) {
    var tw = h * 0.055, r = rng(Math.floor(seed) + 5), i, cy = gY - h * 0.8;
    var cols = ['#79c84a', '#8ad656', '#6ab83e'];
    gxShadow(x, gY + 4, h * 0.2, 0.85);

    // Тонкие ветки прячем под крону — они не должны торчать голыми.
    for (i = 0; i < 3; i++) {
      var sy = gY - h * (0.56 + i * 0.11), dir = i % 2 ? 1 : -1;
      gxTube([[x, sy], [x + dir * h * 0.06, sy - h * 0.05], [x + dir * h * 0.11, sy - h * 0.08]], tw * 0.32, '#ded9c6');
    }

    // Ствол: слегка сужается кверху, без резких прямоугольных полос.
    ctx.beginPath();
    ctx.moveTo(x - tw * 0.82, gY + 2);
    ctx.lineTo(x - tw * 0.42, gY - h * 0.9);
    ctx.lineTo(x + tw * 0.42, gY - h * 0.9);
    ctx.lineTo(x + tw * 0.82, gY + 2);
    ctx.closePath();
    ctx.fillStyle = gxLG(x - tw, 0, x + tw, 0, '#fffef7', '#efeade', '#bcb6a2'); ctx.fill();
    ctx.save(); ctx.clip();
    for (i = 0; i < 6; i++) {
      var yy = gY - h * (0.12 + r() * 0.7), ww = tw * (0.18 + r() * 0.3);
      ctx.fillStyle = 'rgba(45,42,52,.7)';
      ctx.beginPath();
      ctx.ellipse(x + (r() < 0.5 ? -tw * 0.45 : tw * 0.45), yy, ww * 0.5, 1.5 + r() * 1.5, -0.15 + r() * 0.3, 0, 6.3);
      ctx.fill();
    }
    ctx.restore();
    gxInk(1.5); ctx.stroke();

    // Крона из пяти аккуратных «подушек» вместо девяти разбросанных кружков.
    var crown = [
      { x: x, y: cy - h * 0.08, r: h * 0.21 },
      { x: x - h * 0.15, y: cy + h * 0.02, r: h * 0.17 },
      { x: x + h * 0.15, y: cy + h * 0.02, r: h * 0.17 },
      { x: x - h * 0.07, y: cy - h * 0.18, r: h * 0.15 },
      { x: x + h * 0.08, y: cy - h * 0.17, r: h * 0.15 }
    ];
    gxBlob(crown, cols[Math.floor(seed) % 3], { lw: Math.max(2, h * 0.015), seed: Math.floor(seed), clean: true });
  }

function gxPineT(x, h) {
    gxShadow(x, gY + 4, h * 0.26, 0.8);
    ctx.fillStyle = '#5a3a22'; ctx.fillRect(x - h * 0.03, gY - h * 0.22, h * 0.06, h * 0.22); gxInk(1.6); ctx.strokeRect(x - h * 0.03, gY - h * 0.22, h * 0.06, h * 0.22);
    gxPineShape(x, gY, h, '#2f7a45', '#40945a');
  }

function gxBushHD(x, s, bry) {
    var y = gY + 2, cs = [{ x: x, y: y - 14 * s, r: 17 * s }, { x: x + 21 * s, y: y - 10 * s, r: 13 * s }, { x: x - 21 * s, y: y - 9 * s, r: 12 * s }, { x: x - 4 * s, y: y - 22 * s, r: 12.5 * s }, { x: x + 9 * s, y: y - 20 * s, r: 11 * s }];
    gxShadow(x, gY + 4, 32 * s, 0.8);
    gxBlob(cs, '#4aa63a', { lw: Math.max(2.2, 2.6 * s), seed: (x * 3) | 0, clean: true });
    if (bry) { for (var b = 0; b < 6; b++) { var bx = x - 18 * s + b * 7.5 * s, by = y - (10 + (b % 3) * 7) * s; ctx.fillStyle = '#e8454f'; ctx.beginPath(); ctx.arc(bx, by, 2.8 * s, 0, 6.3); ctx.fill(); gxInk(1.1); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(bx - 1, by - 1.4, 1.2, 1.2); } }
  }

function gxRockHD(x, s) {
    gxShadow(x + 3 * s, gY + 4, 32 * s, 0.9);
    var pts = [[-24, 3], [-22, -12], [-12, -22], [4, -24], [18, -17], [25, -4], [24, 3]], i;
    ctx.beginPath(); for (i = 0; i < pts.length; i++) { var px = x + pts[i][0] * s, py = gY + pts[i][1] * s; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); } ctx.closePath();
    ctx.fillStyle = gxLG(x - 24 * s, gY - 24 * s, x + 24 * s, gY + 3, '#c9ced8', '#98a0ae', '#636a7a'); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(x - 22 * s, gY - 12 * s); ctx.lineTo(x - 12 * s, gY - 22 * s); ctx.lineTo(x + 4 * s, gY - 24 * s); ctx.lineTo(x - 6 * s, gY - 8 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(20,14,50,.24)'; ctx.beginPath(); ctx.moveTo(x + 6 * s, gY - 22 * s); ctx.lineTo(x + 25 * s, gY - 4 * s); ctx.lineTo(x + 24 * s, gY + 3); ctx.lineTo(x + 2 * s, gY + 3); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(30,34,50,.4)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x - 3 * s, gY - 22 * s); ctx.lineTo(x - 7 * s, gY - 8 * s); ctx.lineTo(x + 1 * s, gY + 2); ctx.stroke();
    ctx.fillStyle = 'rgba(96,170,70,.85)'; ctx.beginPath(); ctx.ellipse(x + 12 * s, gY - 1 * s, 10 * s, 3.6 * s, 0, 0, 6.3); ctx.ellipse(x - 14 * s, gY - 4 * s, 6 * s, 2.6 * s, 0, 0, 6.3); ctx.fill();
    ctx.restore(); gxInk(Math.max(1.8, 2 * s)); ctx.beginPath(); for (i = 0; i < pts.length; i++) { var qx = x + pts[i][0] * s, qy = gY + pts[i][1] * s; if (i) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy); } ctx.closePath(); ctx.stroke();
  }

function gxLamp(x, night, hh) {
    hh = hh || 150; gxShadow(x, gY + 3, 24, 0.75);
    gxPanel(x - 8, gY - 14, 16, 14, '#454c5e', { r: 3, lw: 1.6 });
    gxPanel(x - 3.2, gY - hh, 6.4, hh - 12, '#3a4052', { lw: 1.6 });
    gxTube([[x, gY - hh + 4], [x + 6, gY - hh - 10], [x + 22, gY - hh - 14]], 5, '#3a4052');
    gxPanel(x + 14, gY - hh - 12, 22, 9, '#2f3546', { r: 3, lw: 1.6 });
    var lit = night ? '#fff0b0' : '#e9f2ff';
    ctx.fillStyle = lit; ctx.beginPath(); ctx.moveTo(x + 16, gY - hh - 3); ctx.lineTo(x + 34, gY - hh - 3); ctx.lineTo(x + 31, gY - hh + 4); ctx.lineTo(x + 19, gY - hh + 4); ctx.closePath(); ctx.fill(); gxInk(1.4); ctx.stroke();
    if (night) { gxGlow(x + 25, gY - hh + 6, 70, '255,226,150', 0.9); ctx.globalAlpha = 0.18; var cn = ctx.createLinearGradient(0, gY - hh + 4, 0, gY); cn.addColorStop(0, 'rgba(255,230,160,.9)'); cn.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = cn; ctx.beginPath(); ctx.moveTo(x + 19, gY - hh + 4); ctx.lineTo(x + 31, gY - hh + 4); ctx.lineTo(x + 62, gY + 2); ctx.lineTo(x - 12, gY + 2); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
  }

function gxBench(x) {
    gxShadow(x, gY + 3, 42, 0.7);
    ctx.fillStyle = '#2f3546'; ctx.fillRect(x - 34, gY - 16, 5, 16); ctx.fillRect(x + 29, gY - 16, 5, 16);
    var i; for (i = 0; i < 3; i++) gxPanel(x - 38, gY - 40 + i * 7, 76, 5.5, '#b57a3f', { lw: 1.4, r: 2 });
    for (i = 0; i < 2; i++) gxPanel(x - 38, gY - 24 + i * 8, 76, 6, '#c88c4c', { lw: 1.4, r: 2 });
    gxPanel(x - 38, gY - 44, 4, 30, '#2f3546', { lw: 1.4 }); gxPanel(x + 34, gY - 44, 4, 30, '#2f3546', { lw: 1.4 });
  }

function gxBin(x) {
    gxShadow(x, gY + 3, 22, 0.7);
    gxPanel(x - 12, gY - 34, 24, 34, '#3f8c58', { r: 4 });
    gxPanel(x - 14, gY - 40, 28, 8, '#2f6e44', { r: 3 });
    ctx.fillStyle = 'rgba(0,0,0,.25)'; for (var i = 0; i < 3; i++) ctx.fillRect(x - 8, gY - 28 + i * 8, 16, 2);
    ctx.fillStyle = '#e9f5ee'; ctx.beginPath(); ctx.arc(x, gY - 18, 4, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke();
  }

function gxHydrant(x) {
    gxShadow(x, gY + 3, 16, 0.7);
    gxPanel(x - 7, gY - 30, 14, 30, '#e04a3a', { r: 5 }); gxPanel(x - 10, gY - 22, 20, 7, '#e86a58', { r: 3 }); gxPanel(x - 9, gY - 36, 18, 8, '#c93a2c', { r: 4 });
    ctx.fillStyle = '#9aa3b0'; ctx.fillRect(x - 11, gY - 10, 22, 6); gxInk(1.2); ctx.strokeRect(x - 11, gY - 10, 22, 6);
  }

function gxMail(x) {
    gxShadow(x, gY + 3, 18, 0.7);
    gxPanel(x - 2.5, gY - 36, 5, 36, '#4a5060', { lw: 1.4 });
    gxPanel(x - 14, gY - 56, 28, 22, '#2f6fd0', { r: 9 }); ctx.fillStyle = '#10244a'; ctx.fillRect(x - 8, gY - 46, 16, 3);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(x + 4, gY - 62, 3, 10);
  }

function gxPlanter(x, v) {
    gxShadow(x, gY + 3, 38, 0.7);
    var cs = [{ x: x - 16, y: gY - 40, r: 15 }, { x: x + 4, y: gY - 46, r: 17 }, { x: x + 22, y: gY - 38, r: 13 }];
    gxBlob(cs, '#4fae3e', { lw: 2.4, seed: v * 7 });
    var fl = ['#ff6fa0', '#ffd23f', '#ffffff', '#ff9a4a'], i; for (i = 0; i < 7; i++) { ctx.fillStyle = fl[(i + v) % 4]; ctx.beginPath(); ctx.arc(x - 24 + i * 8, gY - 34 - ((i * 5 + v) % 4) * 6, 3.2, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); }
    gxPanel(x - 32, gY - 24, 64, 24, '#b9a98a', { r: 4, tex: function (a, b, c, d) { ctx.fillStyle = 'rgba(0,0,0,.1)'; for (var q = 1; q < 4; q++) ctx.fillRect(a + q * c / 4, b, 1.6, d); } });
    gxPanel(x - 35, gY - 29, 70, 8, '#cdbd9c', { r: 3 });
  }

function gxFence(x, n) {   // n секций по 36px, начиная слева от x
    var i, w = n * 36; gxShadow(x + w / 2, gY + 3, w * 0.55, 0.5);
    gxPanel(x, gY - 30, w, 5, '#d9b27a', { lw: 1.4 }); gxPanel(x, gY - 14, w, 5, '#d9b27a', { lw: 1.4 });
    for (i = 0; i < n * 3 + 1; i++) { var px = x + i * 12, ht = 36 + ((i * 7) % 3); gxPanel(px - 4, gY - ht, 8, ht, '#f0d49f', { lw: 1.4 }); ctx.fillStyle = '#f0d49f'; ctx.beginPath(); ctx.moveTo(px - 4, gY - ht); ctx.lineTo(px, gY - ht - 5); ctx.lineTo(px + 4, gY - ht); ctx.fill(); gxInk(1.4); ctx.stroke(); }
  }

function gxHedge(x, w) { var cs = [], i; for (i = 0; i * 22 < w; i++) cs.push({ x: x + 11 + i * 22, y: gY - 18 - (i % 2) * 4, r: 15 }); gxShadow(x + w / 2, gY + 3, w * 0.55, 0.6); gxBlob(cs, '#3f9a3a', { lw: 2.4, seed: (x | 0), clean: true }); }

function gxFlowers(x, n, seed) {
    var r = rng((seed | 0) + 9), i, cols = ['#ff6fa0', '#ffd23f', '#ffffff', '#ff9a4a', '#b58cff'];
    for (i = 0; i < n; i++) { var fx = x + (r() - 0.5) * n * 9, fh = 10 + r() * 14, c = cols[Math.floor(r() * 5)]; ctx.strokeStyle = '#2f7a2a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(fx, gY + 2); ctx.quadraticCurveTo(fx + 2, gY - fh * 0.5, fx, gY - fh); ctx.stroke(); ctx.fillStyle = c; ctx.beginPath(); for (var p = 0; p < 5; p++) { var pa = p * 1.2566; ctx.moveTo(fx + Math.cos(pa) * 3.4 + 2.4, gY - fh + Math.sin(pa) * 3.4); ctx.arc(fx + Math.cos(pa) * 3.4, gY - fh + Math.sin(pa) * 3.4, 2.4, 0, 6.3); } ctx.fill(); ctx.fillStyle = '#ffe27a'; ctx.beginPath(); ctx.arc(fx, gY - fh, 1.8, 0, 6.3); ctx.fill(); }
  }

function gxStump(x, s) { gxShadow(x, gY + 3, 22 * s, 0.7); gxPanel(x - 12 * s, gY - 18 * s, 24 * s, 18 * s, '#8a5c36', { r: 3 }); ctx.fillStyle = '#d9b27a'; ctx.beginPath(); ctx.ellipse(x, gY - 18 * s, 12 * s, 4.5 * s, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.strokeStyle = 'rgba(110,70,30,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, gY - 18 * s, 7 * s, 2.6 * s, 0, 0, 6.3); ctx.stroke(); }

function gxLog(x, s) { gxShadow(x, gY + 3, 36 * s, 0.7); gxPanel(x - 34 * s, gY - 16 * s, 68 * s, 16 * s, '#7c5230', { r: 7 * s }); ctx.fillStyle = '#d9b27a'; ctx.beginPath(); ctx.ellipse(x + 33 * s, gY - 8 * s, 4 * s, 8 * s, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }

function gxMush(x, s, c) { gxShadow(x, gY + 2, 14 * s, 0.6); gxPanel(x - 3 * s, gY - 12 * s, 6 * s, 12 * s, '#f3ead6', { r: 2, lw: 1.3 }); ctx.fillStyle = c || '#e04a3a'; ctx.beginPath(); ctx.ellipse(x, gY - 12 * s, 12 * s, 8 * s, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); gxInk(1.5); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(x - 4 * s, gY - 16 * s, 1.8 * s, 0, 6.3); ctx.arc(x + 4 * s, gY - 15 * s, 1.5 * s, 0, 6.3); ctx.arc(x, gY - 19 * s, 1.4 * s, 0, 6.3); ctx.fill(); }

function gxFern(x, s) { var i; ctx.lineCap = 'round'; for (i = -3; i <= 3; i++) { var a = -Math.PI / 2 + i * 0.36, L = (26 - Math.abs(i) * 3) * s; ctx.strokeStyle = GXI; ctx.lineWidth = 5.4 * s; ctx.beginPath(); ctx.moveTo(x, gY + 1); ctx.quadraticCurveTo(x + Math.cos(a) * L * 0.5, gY - Math.sin(-a) * L * 0.7, x + Math.cos(a) * L, gY - Math.sin(-a) * L * 0.9 + 6); ctx.stroke(); ctx.strokeStyle = i % 2 ? '#4aa84a' : '#62c05a'; ctx.lineWidth = 3.2 * s; ctx.stroke(); } }

function gxCrate(x, s, c) { gxShadow(x, gY + 2, 26 * s, 0.7); gxPanel(x - 16 * s, gY - 30 * s, 32 * s, 30 * s, c || '#b07a42', { r: 2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(60,34,12,.5)'; ctx.lineWidth = 2; ctx.strokeRect(a + 3, b + 3, w - 6, h - 6); ctx.beginPath(); ctx.moveTo(a + 3, b + 3); ctx.lineTo(a + w - 3, b + h - 3); ctx.moveTo(a + w - 3, b + 3); ctx.lineTo(a + 3, b + h - 3); ctx.stroke(); } }); }

function gxBarrel(x, s, c) { gxShadow(x, gY + 2, 20 * s, 0.7); gxPanel(x - 14 * s, gY - 34 * s, 28 * s, 34 * s, c || '#8a5a34', { r: 8 * s, tex: function (a, b, w, h) { ctx.fillStyle = '#4a4f5c'; ctx.fillRect(a, b + h * 0.18, w, 4); ctx.fillRect(a, b + h * 0.74, w, 4); } }); }

function gxCottage(x, v, night) {
    var w = 150, h = 78, walls = ['#f2e2c0', '#e6c9a0', '#d9e2c6', '#e9d3d6'], roofs = ['#b4452f', '#4c6aa8', '#7a5a8e', '#3f7e5a'], wc = walls[v % 4], rc = roofs[(v >> 1) % 4], x0 = x - w / 2;
    gxShadow(x, gY + 4, w * 0.62, 0.8);
    gxPanel(x0, gY - h, w, h, wc, { tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(90,60,30,.16)'; ctx.lineWidth = 1.4; for (var q = 1; q < 7; q++) { ctx.beginPath(); ctx.moveTo(a, b + q * hh / 7); ctx.lineTo(a + ww, b + q * hh / 7); ctx.stroke(); } } });
    ctx.fillStyle = '#9a8c78'; ctx.fillRect(x0 - 2, gY - 12, w + 4, 12); gxInk(1.6); ctx.strokeRect(x0 - 2, gY - 12, w + 4, 12);
    ctx.fillStyle = gxLG(0, gY - h - 46, 0, gY - h, shadeC(rc, 0.2), rc, shadeC(rc, -0.2)); ctx.beginPath(); ctx.moveTo(x0 - 14, gY - h + 6); ctx.lineTo(x, gY - h - 48); ctx.lineTo(x0 + w + 14, gY - h + 6); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.6; for (var q = 1; q < 5; q++) { ctx.beginPath(); ctx.moveTo(x0 - 14, gY - h + 6 - q * 9); ctx.lineTo(x0 + w + 14, gY - h + 6 - q * 9); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.moveTo(x0 - 14, gY - h + 6); ctx.lineTo(x, gY - h - 48); ctx.lineTo(x - 8, gY - h - 48); ctx.lineTo(x0 - 14, gY - h + 2); ctx.fill(); ctx.restore();
    gxPanel(x0 + w - 36, gY - h - 40, 16, 34, '#a8654a', { lw: 1.8 }); gxPanel(x0 + w - 39, gY - h - 46, 22, 7, '#8a4e38', { r: 2, lw: 1.6 });
    gxDoor(x - 12, gY - 48, 24, 48, '#7a4a2c');
    gxWin(x0 + 14, gY - 56, 26, 26, night ? 1 : 0, '#fff6e4'); gxWin(x0 + w - 40, gY - 56, 26, 26, night ? 1 : 0, '#fff6e4');
    ctx.fillStyle = roofs[(v + 1) % 4]; ctx.fillRect(x0 + 8, gY - 28, 38, 7); ctx.fillRect(x0 + w - 46, gY - 28, 38, 7); gxInk(1.3); ctx.strokeRect(x0 + 8, gY - 28, 38, 7); ctx.strokeRect(x0 + w - 46, gY - 28, 38, 7);
    ctx.fillStyle = '#ff6fa0'; for (var f = 0; f < 5; f++) { ctx.beginPath(); ctx.arc(x0 + 13 + f * 7, gY - 31, 2.6, 0, 6.3); ctx.arc(x0 + w - 43 + f * 7, gY - 31, 2.6, 0, 6.3); ctx.fill(); }
    if (night) { gxGlow(x0 + 27, gY - 43, 54, '255,200,110', 0.8); gxGlow(x0 + w - 27, gY - 43, 54, '255,200,110', 0.8); }
  }

function gxStoneRow(x, n) { for (var i = 0; i < n; i++) { var sx = x + i * 30 + ((i * 13) % 7), sw = 22 + ((i * 5) % 8); ctx.fillStyle = '#b9b2a2'; ctx.beginPath(); ctx.ellipse(sx, gY + 8 + ((i * 3) % 3), sw / 2, 5, 0, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(sx - 2, gY + 6 + ((i * 3) % 3), sw / 3, 2, 0, 0, 6.3); ctx.fill(); } }

function gxGround(xa, xb, kind, night) {
    var G = GXG[kind] || GXG.grass, w = xb - xa, i, r, top = gY - 3, bot = gY + 24, deep = gY + 24 + gxDown();
    ctx.fillStyle = gxLG(0, top, 0, bot, G.a, G.b); ctx.fillRect(xa, top, w, bot - top);
    ctx.fillStyle = gxLG(0, bot, 0, deep, G.s1, G.s2); ctx.fillRect(xa, bot, w, deep - bot);
    ctx.fillStyle = G.lip; ctx.fillRect(xa, bot - 2, w, 5);
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(xa, top, w, 2.5);
    ctx.strokeStyle = GXI; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xa, top); ctx.lineTo(xb, top); ctx.stroke();
    var x0 = Math.floor(xa / 14) * 14;
    if (kind === 'road') {
      ctx.fillStyle = '#c4c9d2'; ctx.fillRect(xa, top, w, 9); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(xa, top, w, 2.5);
      ctx.strokeStyle = 'rgba(40,46,60,.45)'; ctx.lineWidth = 1.3; for (i = Math.floor(xa / 44) * 44; i < xb; i += 44) { ctx.beginPath(); ctx.moveTo(i, top); ctx.lineTo(i - 3, top + 9); ctx.stroke(); }
      ctx.fillStyle = '#8f95a2'; ctx.fillRect(xa, top + 9, w, 4); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(xa, top + 13, w, 3);
      ctx.fillStyle = '#f2ecb8'; for (i = Math.floor(xa / 90) * 90; i < xb; i += 90) { ctx.beginPath(); gxRR(i, gY + 14, 46, 4, 2); ctx.fill(); }
      r = rng(5); ctx.strokeStyle = 'rgba(20,24,34,.4)'; ctx.lineWidth = 1.2; for (i = Math.floor(xa / 310) * 310; i < xb; i += 310) { var cx = i + 120 + (gxH(i) * 90), cy = gY + 19 + gxH(i + 1) * 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 12, cy + 3); ctx.lineTo(cx + 20, cy - 1); ctx.lineTo(cx + 34, cy + 3); ctx.stroke(); }
      for (i = Math.floor(xa / 520) * 520; i < xb; i += 520) { var mx = i + 240; ctx.fillStyle = '#3c414c'; ctx.beginPath(); ctx.ellipse(mx, gY + 19, 15, 3.4, 0, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.moveTo(mx - 9, gY + 19); ctx.lineTo(mx + 9, gY + 19); ctx.stroke(); }
    } else if (kind === 'sand') {
      ctx.strokeStyle = 'rgba(190,150,80,.4)'; ctx.lineWidth = 1.4; for (i = x0; i < xb; i += 22) { ctx.beginPath(); ctx.moveTo(i, gY + 6 + (i % 3)); ctx.quadraticCurveTo(i + 10, gY + 3 + (i % 5), i + 20, gY + 7); ctx.stroke(); }
      for (i = x0; i < xb; i += 38) { var h = gxH(i); if (h < 0.4) { ctx.fillStyle = h < 0.2 ? '#fff4ee' : '#f2b5a0'; ctx.beginPath(); ctx.ellipse(i + 8, gY + 10 + h * 20, 3.2, 2.2, h * 3, 0, 6.3); ctx.fill(); gxInk(1); ctx.stroke(); } }
    } else if (G.blade) {
      for (i = x0; i < xb; i += 9) { var hb = gxH(i * 3 + 1), bh = 7 + hb * 11; ctx.fillStyle = (i / 9) % 2 ? G.blade : shadeC(G.blade, -0.15); ctx.beginPath(); ctx.moveTo(i - 3, top + 2); ctx.quadraticCurveTo(i, top - bh * 0.6, i + 1.5 + hb * 3, top - bh); ctx.quadraticCurveTo(i + 2, top - bh * 0.4, i + 4, top + 2); ctx.fill(); }
      ctx.fillStyle = 'rgba(0,0,0,.1)'; for (i = x0; i < xb; i += 36) ctx.fillRect(i, gY + 8 + gxH(i) * 9, 18, 2);
    }
    // камни и корни в почве
    for (i = Math.floor(xa / 71) * 71; i < xb; i += 71) { var hh = gxH(i * 5 + 3); ctx.fillStyle = 'rgba(255,255,255,' + (0.08 + hh * 0.1).toFixed(2) + ')'; ctx.beginPath(); ctx.ellipse(i + hh * 40, bot + 14 + hh * 60, 6 + hh * 8, 3.4 + hh * 3, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(i + 30 + hh * 20, bot + 30 + hh * 70, 5 + hh * 6, 3, 0, 0, 6.3); ctx.fill(); }
    var dg = ctx.createLinearGradient(0, bot, 0, deep); dg.addColorStop(0, 'rgba(0,0,0,0)'); dg.addColorStop(1, 'rgba(8,4,22,.55)'); ctx.fillStyle = dg; ctx.fillRect(xa, bot, w, deep - bot);
  }

function gxBuilding(x, w, h, o) {
    var col = o.col, nv = o.nv, i = o.i | 0, y0 = gY - h, cw = o.cw || 28, ch = o.ch || 36, r, c, q;
    var rows = Math.max(1, Math.floor((h - 84) / ch)), cols = Math.max(1, Math.floor((w - 18) / cw)), offX = x + (w - cols * cw) / 2, frame = shadeC(col, 0.55);
    gxShadow(x + w / 2, gY + 5, w * 0.62, 0.8);
    gxPanel(x, y0, w, h, col, { lw: 2.6, tex: function (a, b, ww, hh) {
      ctx.fillStyle = 'rgba(255,255,255,.06)'; for (q = 0; q < ww; q += 20) if ((q / 20) % 2) ctx.fillRect(a + q, b, 20, hh);
      for (r = 0; r <= rows; r++) { var fy = b + 22 + r * ch - 11; ctx.fillStyle = 'rgba(8,6,30,.14)'; ctx.fillRect(a, fy, ww, 3); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(a, fy + 3, ww, 1.5); }
      ctx.fillStyle = 'rgba(10,6,40,.13)'; ctx.fillRect(a + ww - 13, b, 13, hh);
    } });
    gxPanel(x - 5, y0 - 9, w + 10, 11, shadeC(col, -0.3), { lw: 2.2 }); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x - 5, y0 - 9, w + 10, 2.5);
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) {
      var wx = offX + c * cw + 6, wy = y0 + 22 + r * ch, hs = gxH(i * 131 + r * 17 + c * 5), st = nv ? (hs < 0.58 ? 1 : 2) : 0;
      gxWin(wx, wy, cw - 12, ch - 20, st, frame);
      if (r > 0 && hs > 0.78) { gxPanel(wx - 5, wy + ch - 17, cw - 2, 4, '#4a5062', { lw: 1.2 }); ctx.strokeStyle = '#4a5062'; ctx.lineWidth = 1.4; ctx.beginPath(); for (q = 0; q < 5; q++) { ctx.moveTo(wx - 3 + q * (cw - 8) / 4, wy + ch - 17); ctx.lineTo(wx - 3 + q * (cw - 8) / 4, wy + ch - 27); } ctx.stroke(); ctx.beginPath(); ctx.moveTo(wx - 4, wy + ch - 27); ctx.lineTo(wx + cw - 6, wy + ch - 27); ctx.stroke(); }
      else if (hs < 0.14) { gxPanel(wx + 2, wy + ch - 30, cw - 16, 12, '#c8ccd6', { lw: 1.2 }); ctx.fillStyle = '#6a7080'; ctx.fillRect(wx + 5, wy + ch - 27, cw - 22, 2); }
      if (nv && st === 1) gxGlow(wx + (cw - 12) / 2, wy + (ch - 20) / 2, 26, '255,200,110', 0.55);
    }
    // цоколь
    gxPanel(x, gY - 40, w, 40, shadeC(col, -0.14), { lw: 2.2, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.3; for (q = 0; q < 4; q++) { ctx.beginPath(); ctx.moveTo(a, b + q * 10); ctx.lineTo(a + ww, b + q * 10); ctx.stroke(); } for (q = 0; q < ww; q += 18) { ctx.beginPath(); ctx.moveTo(a + q + ((q / 18) % 2) * 9, b); ctx.lineTo(a + q + ((q / 18) % 2) * 9, b + hh); ctx.stroke(); } } });
    if (o.shop) {
      var sx = x + 8, sw = w - 16 - (w > 110 ? 36 : 0);
      gxPanel(sx, gY - 36, sw, 30, nv ? '#ffd88a' : '#9ed6ee', { lw: 2, vert: true });
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(sx + 4, gY - 6); ctx.lineTo(sx + 22, gY - 36); ctx.lineTo(sx + 36, gY - 36); ctx.lineTo(sx + 18, gY - 6); ctx.fill();
      gxAwning(sx - 3, gY - 50, sw + 6, 12, o.shop, '#ffffff');
      if (nv) gxGlow(sx + sw / 2, gY - 22, sw * 0.7, '255,214,130', 0.5);
    }
    var dx = o.shop && w > 110 ? x + w - 30 : x + w / 2 - 13;
    gxDoor(dx, gY - 36, 26, 36, shadeC(col, -0.5), nv ? '#ffe49a' : '#bfe6f6');
    gxPanel(dx - 6, gY - 41, 38, 6, shadeC(col, -0.25), { lw: 1.6 });
    if (nv) gxGlow(dx + 13, gY - 20, 36, '255,214,130', 0.6);
    var rk = (o.roof | 0) % 4, rx = x + w * 0.3;
    if (rk === 0) { gxTube([[rx, y0 - 9], [rx, y0 - 44]], 3.4, '#4a5060'); gxTube([[rx - 9, y0 - 36], [rx + 9, y0 - 36]], 2.6, '#4a5060'); gxTube([[rx - 6, y0 - 28], [rx + 6, y0 - 28]], 2.6, '#4a5060'); ctx.fillStyle = '#e04a3a'; ctx.beginPath(); ctx.arc(rx, y0 - 46, 3, 0, 6.3); ctx.fill(); if (nv) gxGlow(rx, y0 - 46, 16, '255,70,70', 0.9); var dx2 = x + w * 0.66; gxPanel(dx2 - 3, y0 - 22, 6, 14, '#5a6070', { lw: 1.4 }); ctx.fillStyle = '#eef2f8'; ctx.beginPath(); ctx.ellipse(dx2 + 6, y0 - 26, 12, 9, -0.5, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#9aa4b4'; ctx.beginPath(); ctx.arc(dx2 + 8, y0 - 24, 2.2, 0, 6.3); ctx.fill(); }
    else if (rk === 1) { var tx = x + w * 0.55; ctx.strokeStyle = '#4a4034'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx - 14, y0 - 9); ctx.lineTo(tx - 12, y0 - 24); ctx.moveTo(tx + 14, y0 - 9); ctx.lineTo(tx + 12, y0 - 24); ctx.stroke(); gxPanel(tx - 17, y0 - 52, 34, 30, '#a0703c', { r: 9, tex: function (a, b, ww, hh) { ctx.fillStyle = '#4a4f5c'; ctx.fillRect(a, b + 8, ww, 3); ctx.fillRect(a, b + hh - 11, ww, 3); } }); ctx.fillStyle = '#6a4a2c'; ctx.beginPath(); ctx.moveTo(tx - 19, y0 - 50); ctx.lineTo(tx, y0 - 66); ctx.lineTo(tx + 19, y0 - 50); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke(); }
    else if (rk === 2) { gxPanel(x + 10, y0 - 22, 22, 13, '#aab2c0', { lw: 1.8 }); ctx.fillStyle = '#6a7080'; for (q = 0; q < 3; q++) ctx.fillRect(x + 14 + q * 6, y0 - 19, 3, 8); gxPanel(x + 40, y0 - 18, 16, 9, '#c0c6d2', { lw: 1.6 }); gxPanel(x + w - 38, y0 - 36, 14, 28, '#9a6a52', { lw: 1.8 }); gxPanel(x + w - 41, y0 - 41, 20, 7, '#7a4e3a', { r: 2, lw: 1.6 }); }
    else { gxPanel(x + w * 0.25, y0 - 30, w * 0.4, 22, shadeC(col, -0.1), { lw: 2 }); gxPanel(x + w * 0.22, y0 - 36, w * 0.46, 8, shadeC(col, -0.34), { lw: 2 }); gxWin(x + w * 0.33, y0 - 26, 14, 12, nv ? 1 : 0, frame); }
    if (o.neon) {
      var nx = x + 8, nw = w - 16, ny = gY - 86;
      gxPanel(nx, ny, nw, 28, '#14233f', { r: 6, lw: 2 });
      ctx.shadowColor = o.neon; ctx.shadowBlur = 8 + 8 * nv; gxText(o.neonT, nx + nw / 2, ny + 14, 13, o.neon, null); ctx.shadowBlur = 0;
      if (nv) gxGlow(nx + nw / 2, ny + 14, nw * 0.7, o.neon === '#ff4fa3' ? '255,79,163' : (o.neon === '#33e0ff' ? '51,224,255' : '255,210,63'), 0.45);
    }
  }

function gxCityFn(xa, xb, nv) {
    var bx = -40, i = 0, rw, bh;
    while (bx < xb + 200 && bx < CITY_END) {
      rw = 90 + ((i * 53) % 70); bh = 210 + ((i * 97) % 130); if (bx + rw > CITY_END) rw = CITY_END - bx;
      if (bx + rw > xa - 20 && bx < xb + 20 && rw > 4) gxBuilding(bx, rw, bh, { col: gxCityCols[i % 5], i: i, roof: i, nv: nv, cw: 26, ch: 34, shop: (i % 3 === 1 && rw > 100) ? ['#d94a3c', '#2f7fd0', '#3da05a'][i % 3 === 1 ? (i >> 1) % 3 : 0] : null });
      bx += rw; i++;
    }
    var sx = CITY_END - 160;
    if (sx > xa - 120 && sx < xb + 120) {
      gxPanel(sx - 60, gY - 78, 7, 78, '#4a5360', { lw: 1.6 }); gxPanel(sx + 53, gY - 78, 7, 78, '#4a5360', { lw: 1.6 });
      gxPanel(sx - 76, gY - 106, 152, 38, '#1f56c8', { r: 7, lw: 2.2, vert: true }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; gxRR(sx - 72, gY - 102, 144, 30, 5); ctx.stroke();
      gxText('ВЫЕЗД ИЗ ГОРОДА', sx, gY - 87, 13, '#fff', null);
    }
  }

function gxBusy0(x, pad) {
    pad = pad || 0; var i;
    if (x > SHOP_X - 60 - pad && x < SHOP_X + SHOP_W + 100 + pad) return true;
    if (x > UP_X - 60 - pad && x < UP_X + UP_W + 100 + pad) return true;
    if (x > WASH_X - 60 - pad && x < WASH_X + WASH_W + 60 + pad) return true;
    if (x > BB_X - 60 - pad && x < BB_X + BB_W + 80 + pad) return true;
    for (i = 0; i < ALL_STOPS.length; i++) if (Math.abs(x - ALL_STOPS[i].x) < 120 + pad) return true;
    for (i = 0; i < FUEL.length; i++) if (Math.abs(x - FUEL[i].x) < 150 + pad) return true;
    for (i = 0; i < bins.length; i++) if (Math.abs(x - bins[i].x) < 95 + pad) return true;
    return Math.abs(x - 70) < 70 || x > WORLD_W - 140;
  }

function gxG0(xa, xb, nv) {
    var cut = CITY_END;
    if (xa < cut) gxGround(xa, Math.min(xb, cut), 'road', nv);
    if (xb > cut) gxGround(Math.max(xa, cut), xb, 'grass', nv);
    if (xa < cut + 20 && xb > cut - 20) { gxPanel(cut - 7, gY - 7, 14, 30, '#b4b9c6', { lw: 1.8 }); }
    gxEach(xa, Math.min(xb, cut - 30), 330, 120, 70, function (x, k) {
      if (gxBusy0(x)) return; var h = gxH(k * 13 + 7);
      if (k % 3 === 0) gxLamp(x, nv); else if (h < 0.25) gxBench(x); else if (h < 0.45) gxBin(x); else if (h < 0.6) gxHydrant(x); else if (h < 0.8) gxPlanter(x, k); else gxMail(x);
    });
    if (xb > cut) {
      gxEach(xa, xb, 1250, 2500, 160, function (x, k) { if (gxBusy0(x, 60)) return; gxCottage(x, k + (k >> 2), nv); if (k % 2 === 0) gxFence(x + 95, 3); else gxFlowers(x - 92, 6, k); });
      gxEach(xa, xb, 230, 2100, 60, function (x, k) {
        if (x < cut + 60 || gxBusy0(x, 20)) return; var h = gxH(k * 29 + 5), cx = (x - 2500) % 1250, nearCot = x > 2300 && Math.abs(((x - 2500) % 1250 + 1250) % 1250) < 150;
        if (nearCot) return;
        if (h < 0.18) gxFlowers(x, 7, k); else if (h < 0.3) gxStump(x, 0.9 + h); else if (h < 0.4) gxFence(x - 36, 2); else if (h < 0.5) gxHedge(x - 40, 80); else if (h < 0.58) gxStoneRow(x - 40, 3); else if (h < 0.66) gxBench(x); else if (h < 0.72) gxLog(x, 0.9); else if (h < 0.78) gxMush(x, 1.1, h < 0.75 ? '#e04a3a' : '#e8a43a');
      });
      gxEach(xa, xb, 3400, 3000, 60, function (x, k) { if (gxBusy0(x, 40)) return; gxPanel(x - 3, gY - 54, 6, 54, '#7a5a3a', { lw: 1.6 }); gxPanel(x - 30, gY - 70, 60, 20, '#d9b27a', { r: 4, lw: 1.8 }); gxPanel(x + 6, gY - 90, 46, 18, '#b88a52', { r: 4, lw: 1.8 }); });
    }
  }

function gxSprite(key, up, half, down, fn, x) { var sp = sprite(key + (nightK() > 0.25 ? 'n' : 'd') + gxFV, up, half, down, fn); if (sp) blit(sp, x); return sp; }

function gxShopArt(cx, w, nv) {
    var x = cx - w / 2, top = gY - 160;
    gxShadow(cx, gY + 5, w * 0.64, 0.9);
    gxPanel(x, top, w, 160, '#f4e8cc', { lw: 2.6, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(120,80,30,.13)'; ctx.lineWidth = 1.4; for (var q = 1; q < 8; q++) { ctx.beginPath(); ctx.moveTo(a, b + q * 16); ctx.lineTo(a + ww, b + q * 16); ctx.stroke(); } } });
    gxPanel(x, gY - 36, w, 36, '#2456c4', { lw: 2.4, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1.4; for (var q = 0; q < ww; q += 22) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + hh); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(a, b + 18); ctx.lineTo(a + ww, b + 18); ctx.stroke(); } });
    gxPanel(x - 3, top, 12, 160, '#fff6e2', { lw: 2 }); gxPanel(x + w - 9, top, 12, 160, '#fff6e2', { lw: 2 });
    // крыша
    ctx.fillStyle = gxLG(0, top - 30, 0, top + 8, '#d4503c', '#a82a33', '#7e1d25'); ctx.beginPath(); ctx.moveTo(x - 16, top + 8); ctx.lineTo(x + 8, top - 28); ctx.lineTo(x + w - 8, top - 28); ctx.lineTo(x + w + 16, top + 8); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.6; for (var q = 1; q < 4; q++) { ctx.beginPath(); ctx.moveTo(x - 16, top + 8 - q * 9); ctx.lineTo(x + w + 16, top + 8 - q * 9); ctx.stroke(); } ctx.strokeStyle = 'rgba(255,255,255,.2)'; for (q = 0; q < w; q += 22) { ctx.beginPath(); ctx.moveTo(x + q, top - 28); ctx.lineTo(x + q - 8, top + 8); ctx.stroke(); } ctx.restore();
    gxPanel(x - 16, top + 4, w + 32, 9, '#5e1620', { lw: 2 }); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x - 16, top + 4, w + 32, 2);
    // вывеска
    gxPanel(x + 18, top + 14, w - 36, 38, '#16337d', { r: 7, lw: 2.4, vert: true }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; gxRR(x + 22, top + 18, w - 44, 30, 5); ctx.stroke();
    for (var l = 0; l < 2; l++) { var lx = x + 38 + l * (w - 76); gxTube([[lx, top + 12], [lx, top + 4]], 3, '#3a4052'); if (nv) gxGlow(lx, top + 6, 40, '255,236,170', 0.8); ctx.fillStyle = nv ? '#fff0b0' : '#dfe6f2'; ctx.beginPath(); ctx.arc(lx, top + 4, 4, 0, 6.3); ctx.fill(); }
    // окно с витриной
    gxPanel(x + 12, top + 62, 116, 64, nv ? '#ffdc94' : '#9fd6ec', { lw: 2.2, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.38)'; ctx.beginPath(); ctx.moveTo(x + 14, top + 124); ctx.lineTo(x + 52, top + 64); ctx.lineTo(x + 74, top + 64); ctx.lineTo(x + 36, top + 124); ctx.fill();
    gxPanel(x + 8, top + 120, 124, 9, '#7a5030', { lw: 2 }); gxPanel(x + 6, top + 116, 3, 10, '#7a5030', { lw: 1 });
    gxAwning(x + 8, top + 54, 124, 14, '#d4323c', '#ffffff');
    if (nv) gxGlow(x + 70, top + 94, 90, '255,214,130', 0.5);
    // дверь
    gxPanel(x + 152, top + 58, 68, 102, '#7a4a2c', { r: 3, lw: 2.4 }); ctx.fillStyle = nv ? '#ffe8a0' : '#c9a066'; ctx.fillRect(x + 160, top + 68, 52, 44); gxInk(1.6); ctx.strokeRect(x + 160, top + 68, 52, 44);
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x + 164, top + 70, 10, 40); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.6; ctx.strokeRect(x + 160, top + 120, 52, 34);
    ctx.fillStyle = '#ffd86a'; ctx.beginPath(); ctx.arc(x + 212, top + 116, 4, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke();
    gxPanel(x + 146, top + 156, 80, 6, '#a8a090', { lw: 1.6 });
    // вазоны
    gxPanel(x + w - 8, gY - 26, 22, 22, '#b07040', { r: 3, lw: 1.8 }); gxBlob([{ x: x + w + 3, y: gY - 36, r: 11 }, { x: x + w - 3, y: gY - 30, r: 8 }, { x: x + w + 9, y: gY - 30, r: 8 }], '#4fae3e', { lw: 2 });
    // ящик справа
    gxPanel(x + w + 20, gY - 28, 44, 28, '#a67238', { lw: 2, tex: function (a, b, ww, hh) { ctx.fillStyle = '#7a5129'; ctx.fillRect(a, b + 2, ww, 4); ctx.fillRect(a, b + 13, ww, 3); ctx.fillRect(a, b + 22, ww, 3); } });
  }

function gxGarageArt(cx, w, nv) {
    var x = cx - w / 2, top = gY - 160;
    gxShadow(cx, gY + 5, w * 0.64, 0.9);
    gxPanel(x, top, w, 160, '#eab63c', { lw: 2.6, tex: function (a, b, ww, hh) { ctx.fillStyle = 'rgba(0,0,0,.09)'; for (var q = 0; q < ww; q += 11) ctx.fillRect(a + q, b, 2.2, hh); } });
    gxPanel(x, gY - 28, w, 28, '#8a5a2b', { lw: 2.2 });
    ctx.fillStyle = gxLG(0, top - 24, 0, top + 10, '#2c8090', '#1d5560', '#113a42'); ctx.beginPath(); ctx.moveTo(x - 14, top + 10); ctx.lineTo(x + 6, top - 24); ctx.lineTo(x + w - 6, top - 24); ctx.lineTo(x + w + 14, top + 10); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.6; for (var q = 1; q < 4; q++) { ctx.beginPath(); ctx.moveTo(x - 14, top + 10 - q * 9); ctx.lineTo(x + w + 14, top + 10 - q * 9); ctx.stroke(); } ctx.restore();
    gxPanel(x - 14, top + 6, w + 28, 9, '#0c2c33', { lw: 2 });
    gxPanel(x + 16, top + 18, w - 32, 42, '#113a42', { r: 6, lw: 2.4, vert: true }); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 1.5; gxRR(x + 20, top + 22, w - 40, 34, 4); ctx.stroke();
    var dx = x + 24, dw = 140, dy = top + 68, dh = 92;
    gxPanel(dx, dy, dw, dh, '#2a2a34', { lw: 2.6, vert: true });
    ctx.fillStyle = 'rgba(255,214,120,' + (nv ? 0.55 : 0.2) + ')'; ctx.fillRect(dx + 6, dy + 40, dw - 12, dh - 40);
    gxPanel(dx + 12, dy + 58, 46, 34, '#8a5a2b', { lw: 1.8, r: 2 }); gxPanel(dx + 74, dy + 46, 48, 46, '#c8323c', { r: 5, lw: 2 }); ctx.fillStyle = '#ffd23f'; ctx.fillRect(dx + 80, dy + 54, 36, 7); ctx.fillStyle = '#e8e8ee'; ctx.beginPath(); ctx.arc(dx + 98, dy + 74, 9, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    gxPanel(dx - 3, dy - 3, dw + 6, 38, '#a8b0bc', { lw: 2.4, vert: true });
    ctx.fillStyle = 'rgba(0,0,0,.26)'; for (var k = 1; k < 5; k++) ctx.fillRect(dx - 3, dy - 3 + k * 7.6, dw + 6, 2);
    gxWin(x + 188, top + 76, 46, 40, nv ? 1 : 0, '#fff6e4');
    for (var tI = 0; tI < 3; tI++) { ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.ellipse(x + w + 34, gY - 8 - tI * 14, 20, 8, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#6a6a72'; ctx.beginPath(); ctx.ellipse(x + w + 34, gY - 8 - tI * 14, 9, 3.5, 0, 0, 6.3); ctx.fill(); }
    gxLamp(x - 24, nv, 120);
  }

function gxWashArt(cx, w, nv) {
    var x = cx - w / 2, top = gY - 130;
    gxShadow(cx, gY + 5, w * 0.66, 0.9);
    gxPanel(x, top, w, 130, '#d4eaf2', { lw: 2.6, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2; for (var q = 1; q < 10; q++) { ctx.beginPath(); ctx.moveTo(a + q * ww / 10, b); ctx.lineTo(a + q * ww / 10, b + hh); ctx.stroke(); } for (q = 1; q < 7; q++) { ctx.beginPath(); ctx.moveTo(a, b + q * 19); ctx.lineTo(a + ww, b + q * 19); ctx.stroke(); } } });
    ctx.fillStyle = gxLG(0, top - 22, 0, top + 10, '#3a9ab8', '#2a7f9e', '#1d6079'); ctx.beginPath(); ctx.moveTo(x - 12, top + 10); ctx.lineTo(x + 8, top - 22); ctx.lineTo(x + w - 8, top - 22); ctx.lineTo(x + w + 12, top + 10); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    gxPanel(x - 12, top + 5, w + 24, 9, '#124a5e', { lw: 2 });
    gxPanel(x + 14, top + 18, w - 28, 36, '#1d6079', { r: 6, lw: 2.4, vert: true }); ctx.strokeStyle = '#bfeaf8'; ctx.lineWidth = 1.5; gxRR(x + 18, top + 22, w - 36, 28, 4); ctx.stroke();
    gxTube([[x + 104, top + 80], [x + 104, top + 62], [x + 72, top + 62], [x + 72, top + 84]], 7, '#8b97a3'); ctx.fillStyle = '#e04a4a'; ctx.beginPath(); ctx.arc(x + 104, top + 56, 7, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke();
    gxPanel(x + 34, gY - 52, 124, 52, '#7f8c99', { r: 7, lw: 2.4 }); ctx.fillStyle = gxLG(0, gY - 44, 0, gY - 26, '#8fd8f8', '#46a6d8'); ctx.fillRect(x + 42, gY - 44, 108, 18); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x + 48, gY - 42, 40, 3);
    gxPanel(x + w - 38, gY - 28, 28, 28, '#ea8a2c', { r: 4, lw: 2 }); ctx.fillStyle = '#8f5a1a'; ctx.fillRect(x + w - 38, gY - 28, 28, 5);
    gxPanel(x + 6, gY - 16, 18, 16, '#f2f6fa', { r: 3, lw: 1.6 }); ctx.fillStyle = '#6ac0e8'; ctx.fillRect(x + 8, gY - 14, 14, 5);
  }

function gxNv() { return nightK() > 0.25 ? 1 : 0; }

function gxFight() { return (p5.on && !p5.farm && !p5.uni) || p6.on; }

function gxWifiArt(x) {
    gxShadow(x, gY + 4, 34, 0.7);
    gxPanel(x - 28, gY - 12, 56, 12, '#4a5060', { r: 3, lw: 2 });
    gxTube([[x - 22, gY - 10], [x - 3, gY - 300]], 5, '#6a7384'); gxTube([[x + 22, gY - 10], [x + 3, gY - 300]], 5, '#6a7384'); gxTube([[x - 3, gY - 300], [x + 3, gY - 300]], 6, '#6a7384');
    ctx.strokeStyle = '#59616f'; ctx.lineWidth = 2.4; for (var k = 1; k < 8; k++) { var yy = gY - 10 - k * 36, hw = 22 * (1 - k * 36 / 296); ctx.beginPath(); ctx.moveTo(x - hw, yy); ctx.lineTo(x + hw, yy + 18); ctx.moveTo(x + hw, yy); ctx.lineTo(x - hw, yy + 18); ctx.stroke(); }
    gxPanel(x - 11, gY - 316, 22, 16, '#dfe5ee', { r: 4, lw: 1.8 });
  }

function gxBourseArt(x) {
    var w = 250, h = 470, L0 = x - w / 2;
    gxShadow(x, gY + 5, 170, 0.8);
    gxPanel(L0, gY - h, w, h + 4, '#2d4068', { lw: 2.8, tex: function (a, b, ww, hh) {
      for (var r = 0; r < 12; r++) for (var c = 0; c < 6; c++) { var wx = a + 12 + c * 40, wy = b + 120 + r * 28; ctx.fillStyle = gxLG(0, wy, 0, wy + 18, '#a8dcf8', '#5aa6d8'); ctx.fillRect(wx, wy, 30, 18); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(wx, wy + 18); ctx.lineTo(wx + 12, wy); ctx.lineTo(wx + 20, wy); ctx.lineTo(wx + 8, wy + 18); ctx.fill(); ctx.strokeStyle = 'rgba(10,16,40,.7)'; ctx.lineWidth = 1.2; ctx.strokeRect(wx, wy, 30, 18); }
    } });
    gxPanel(L0 - 8, gY - h - 8, w + 16, 12, '#1a2540', { lw: 2.2 }); gxPanel(L0 + 10, gY - h + 12, w - 20, 92, '#0c1426', { r: 9, lw: 2.4 }); ctx.strokeStyle = 'rgba(120,180,255,.5)'; ctx.lineWidth = 1.5; gxRR(L0 + 14, gY - h + 16, w - 28, 84, 6); ctx.stroke();
    gxPanel(x - 4, gY - h - 56, 8, 48, '#d8362f', { lw: 1.8 }); gxPanel(L0 + w / 2 - 36, gY - 60, 72, 60, '#8a5a30', { r: 4, lw: 2.2 }); ctx.fillStyle = 'rgba(255,230,160,.8)'; ctx.fillRect(x - 26, gY - 52, 52, 24);
  }

function gxBurgerArt(X) {
    var w = 400, h = 250, L0 = X - w / 2, i, nv = gxNv();
    gxShadow(X, gY + 5, 250, 0.9);
    gxPanel(L0, gY - h, w, h + 4, '#f7b72a', { lw: 2.8, vert: true, tex: function (a, b, ww, hh) { ctx.fillStyle = 'rgba(255,255,255,.12)'; for (var q = 0; q < ww; q += 40) ctx.fillRect(a + q, b, 20, hh); } });
    gxPanel(L0 - 6, gY - h - 8, w + 12, 12, '#8a2a14', { lw: 2.4 });
    // бургер на крыше
    ctx.fillStyle = '#b8701f'; ctx.beginPath(); ctx.ellipse(X, gY - h - 8, 132, 64, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY - h - 70, 0, gY - h, '#f0a640', '#d98a2b', '#b8701f'); ctx.beginPath(); ctx.ellipse(X, gY - h - 12, 124, 56, 0, Math.PI, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff1c2'; for (i = 0; i < 11; i++) { var sa = 3.3 + i * 0.3; ctx.beginPath(); ctx.ellipse(X + Math.cos(sa) * 88 * (0.55 + (i % 3) * 0.2), gY - h - 14 + Math.sin(sa) * 40 * (0.6 + (i % 2) * 0.3), 5.5, 2.8, 0.5, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.ellipse(X - 40, gY - h - 44, 50, 10, -0.3, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#4fb83b'; ctx.beginPath(); ctx.moveTo(X - 138, gY - h - 6); for (i = 0; i <= 14; i++) ctx.lineTo(X - 138 + i * 19.7, gY - h - 6 + (i % 2 ? 11 : 2)); ctx.lineTo(X + 138, gY - h - 10); ctx.lineTo(X - 138, gY - h - 10); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke();
    gxPanel(X - 128, gY - h - 12, 256, 6, '#ffd23f', { lw: 1.6 }); gxPanel(X - 134, gY - h - 4, 268, 16, '#6a3418', { r: 7, lw: 2.2 });
    gxPanel(L0 + 30, gY - h + 24, w - 60, 46, '#c4281f', { r: 11, lw: 2.8, vert: true }); ctx.strokeStyle = '#fff3c0'; ctx.lineWidth = 2.4; gxRR(L0 + 36, gY - h + 30, w - 72, 34, 7); ctx.stroke();
    ctx.shadowColor = '#ffeaa0'; ctx.shadowBlur = 6 + 12 * nv; gxBig('БУРГЕРНАЯ', X, gY - h + 48, 28, '#fff3c0', null); ctx.shadowBlur = 0;
    [-150, 70].forEach(function (dx) {
      gxPanel(X + dx - 4, gY - 116, 88, 72, '#6a2a14', { r: 4, lw: 2.4 }); ctx.fillStyle = nv ? gxLG(0, gY - 112, 0, gY - 48, '#ffe9a8', '#ffc96a') : gxLG(0, gY - 112, 0, gY - 48, '#cfeaf8', '#88bfe0'); ctx.fillRect(X + dx, gY - 112, 80, 64);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(X + dx, gY - 48); ctx.lineTo(X + dx + 26, gY - 112); ctx.lineTo(X + dx + 42, gY - 112); ctx.lineTo(X + dx + 16, gY - 48); ctx.fill();
      ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(X + dx + 40, gY - 72, 20, 10, 0, Math.PI, 0); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = '#5a2d14'; ctx.fillRect(X + dx + 22, gY - 72, 36, 6); ctx.fillStyle = '#4fb83b'; ctx.fillRect(X + dx + 21, gY - 66, 38, 4); ctx.fillStyle = '#c4833a'; ctx.fillRect(X + dx + 22, gY - 62, 36, 8);
      if (nv) gxGlow(X + dx + 40, gY - 80, 70, '255,210,120', 0.5);
    });
    gxPanel(X - 46, gY - 122, 92, 122, '#5a2210', { r: 4, lw: 2.6 }); ctx.fillStyle = nv ? gxLG(0, gY - 112, 0, gY, '#ffe9a8', '#ffb85a') : gxLG(0, gY - 112, 0, gY, '#cfeaf8', '#6aa5cc'); ctx.fillRect(X - 36, gY - 114, 72, 114); ctx.fillStyle = '#5a2210'; ctx.fillRect(X - 2, gY - 114, 4, 114); ctx.fillStyle = '#ffd23f'; ctx.fillRect(X - 12, gY - 56, 5, 18); ctx.fillRect(X + 7, gY - 56, 5, 18);
    for (i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#d62828'; ctx.beginPath(); ctx.moveTo(L0 + i * 40, gY - 152); ctx.lineTo(L0 + (i + 1) * 40, gY - 152); ctx.lineTo(L0 + (i + 1) * 40 + 4, gY - 122); ctx.arc(L0 + i * 40 + 20, gY - 122, 22, 0, Math.PI); ctx.lineTo(L0 + i * 40 - 4, gY - 122); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(L0, gY - 152, w, 4);
    if (nv) gxGlow(X, gY - 60, 250, '255,200,90', 0.4);
  }

function gxBankArt(X) {
    var w = 400, h = 270, L0 = X - w / 2, i, nv = gxNv();
    gxShadow(X, gY + 5, 250, 0.9);
    gxPanel(L0, gY - h, w, h + 2, '#e4eae2', { lw: 2.8, vert: false, tex: function (a, b, ww, hh) { ctx.strokeStyle = 'rgba(80,100,90,.16)'; ctx.lineWidth = 1.3; for (var q = 0; q < hh; q += 18) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + ww, b + q); ctx.stroke(); } } });
    ctx.fillStyle = gxLG(0, gY - h - 70, 0, gY - h, '#a9b8a9', '#8da08d'); ctx.beginPath(); ctx.moveTo(L0 - 18, gY - h); ctx.lineTo(X, gY - h - 74); ctx.lineTo(L0 + w + 18, gY - h); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.fillStyle = '#e4eae2'; ctx.beginPath(); ctx.moveTo(L0 + 22, gY - h - 5); ctx.lineTo(X, gY - h - 58); ctx.lineTo(L0 + w - 22, gY - h - 5); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.arc(X, gY - h - 28, 21, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = '#f6d56e'; ctx.beginPath(); ctx.arc(X, gY - h - 28, 15, 0, 6.3); ctx.fill(); gxBig('₽', X, gY - h - 27, 18, '#8a6418', null);
    gxPanel(L0 + 40, gY - h + 12, w - 80, 42, '#17324a', { r: 8, lw: 2.6 }); ctx.strokeStyle = '#d9a63a'; ctx.lineWidth = 2; gxRR(L0 + 45, gY - h + 17, w - 90, 32, 5); ctx.stroke();
    ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = 4 + 10 * nv; gxBig('ЧЕКУШ-БАНК', X, gY - h + 34, 24, '#ffe9a0', null); ctx.shadowBlur = 0;
    for (i = 0; i < 5; i++) { var cx = L0 + 32 + i * 84; if (Math.abs(cx - X) < 30) continue; gxPanel(cx - 12, gY - h + 62, 24, h - 82, '#f6f8f4', { lw: 2 }); ctx.fillStyle = 'rgba(0,0,0,.08)'; for (var q = 0; q < 3; q++) ctx.fillRect(cx - 8 + q * 7, gY - h + 66, 2, h - 90); gxPanel(cx - 17, gY - h + 56, 34, 9, '#cdd6cb', { lw: 1.8 }); gxPanel(cx - 17, gY - 26, 34, 9, '#cdd6cb', { lw: 1.8 }); }
    gxPanel(X - 42, gY - 134, 84, 134, '#17324a', { r: 4, lw: 2.6 }); ctx.fillStyle = nv ? gxLG(0, gY - 126, 0, gY, '#ffe9a8', '#ffc66a') : gxLG(0, gY - 126, 0, gY, '#cfeaf8', '#82b8d8'); ctx.fillRect(X - 35, gY - 127, 70, 127); ctx.fillStyle = '#17324a'; ctx.fillRect(X - 2, gY - 127, 4, 127); ctx.fillStyle = '#d9a63a'; ctx.fillRect(X - 12, gY - 64, 5, 16); ctx.fillRect(X + 7, gY - 64, 5, 16);
    [-150, 150].forEach(function (dx) { gxWin(X + dx - 28, gY - 164, 56, 58, nv ? 1 : 0, '#f4f6f0'); });
    gxPanel(L0 - 12, gY - 10, w + 24, 10, '#b9bfb6', { lw: 2 }); gxPanel(L0 + 2, gY - 20, w - 4, 10, '#cdd3ca', { lw: 2 });
    gxPanel(L0 - 56, gY - 122, 46, 94, '#17324a', { r: 7, lw: 2.4 }); ctx.fillStyle = gxLG(0, gY - 110, 0, gY - 88, '#9ff0ff', '#3ab8e0'); ctx.fillRect(L0 - 50, gY - 112, 34, 24); gxText('ATM', L0 - 33, gY - 66, 11, '#d9a63a', null);
    if (nv) gxGlow(X, gY - 60, 250, '255,220,130', 0.35);
  }

function gxParkGround(xa, xb, nv) {
    gxGround(xa, xb, 'grass', nv);
    ctx.fillStyle = gxLG(0, gY + 2, 0, gY + 14, '#f0dcae', '#cfb27a'); ctx.fillRect(xa, gY + 2, xb - xa, 12); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(xa, gY + 2, xb - xa, 2);
    ctx.strokeStyle = 'rgba(120,90,50,.4)'; ctx.lineWidth = 1.3; for (var i = Math.floor(xa / 34) * 34; i < xb; i += 34) { ctx.beginPath(); ctx.moveTo(i, gY + 2); ctx.lineTo(i - 4, gY + 14); ctx.stroke(); }
    ctx.fillStyle = '#9a7a46'; ctx.fillRect(xa, gY + 13, xb - xa, 2.5);
  }

function gxIceArt(X, nv) {
    var i, w = 240;
    gxShadow(X, gY + 5, 185, 0.9);
    gxPanel(X - 132, gY - 214, 10, 214, '#7a4a22', { lw: 2 }); gxPanel(X + 122, gY - 214, 10, 214, '#7a4a22', { lw: 2 });
    gxPanel(X - 120, gY - 202, w, 202, '#f6faff', { lw: 2.6 }); gxPanel(X - 120, gY - 202, w, 32, '#cfe6ff', { lw: 2 });
    [-86, 86].forEach(function (dx, qi) { ctx.fillStyle = '#ff9fc4'; ctx.beginPath(); ctx.arc(X + dx, gY - 134, 17, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = qi ? '#8a5a3a' : '#fff1c0'; ctx.beginPath(); ctx.arc(X + dx, gY - 114, 15, 0, 6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X + dx - 14, gY - 104); ctx.lineTo(X + dx + 14, gY - 104); ctx.lineTo(X + dx, gY - 74); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    for (i = 0; i < 12; i++) { gxPanel(X - 130 + i * 21.7, gY - 62, 22, 62, i % 2 ? '#ffffff' : '#3b7ad9', { lw: 1.4 }); }
    gxPanel(X - 140, gY - 74, 280, 14, '#c98a4a', { r: 3, lw: 2.2 });
    for (i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#3b7ad9'; ctx.beginPath(); ctx.moveTo(X - 145 + i * 24.2, gY - 238); ctx.lineTo(X - 145 + (i + 1) * 24.2, gY - 238); ctx.lineTo(X - 145 + (i + 1) * 24.2, gY - 208); ctx.arc(X - 145 + (i + 0.5) * 24.2, gY - 208, 12.1, 0, Math.PI); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke(); }
    gxPanel(X - 106, gY - 284, 212, 40, '#ff7fb0', { r: 12, lw: 2.8, vert: true }); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.4; gxRR(X - 100, gY - 278, 200, 28, 8); ctx.stroke();
    ctx.fillStyle = '#d9a24a'; ctx.beginPath(); ctx.moveTo(X - 24, gY - 332); ctx.lineTo(X + 24, gY - 332); ctx.lineTo(X, gY - 288); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke(); gxBlob([{ x: X, y: gY - 346, r: 24 }, { x: X - 14, y: gY - 338, r: 14 }, { x: X + 14, y: gY - 338, r: 14 }], '#ff9fc4', { lw: 2.4, seed: 2 });
    gxPanel(X + 46, gY - 54, 82, 24, '#10234a', { r: 7, lw: 2 });
    if (nv) { for (i = 0; i < 9; i++) { var lx = X - 140 + i * 35, lc = ['#ff6b6b', '#ffd23f', '#7dff9a', '#6bc4ff'][i % 4]; ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(lx, gY - 240 + 4 * Math.sin(i), 4.5, 0, 6.3); ctx.fill(); gxGlow(lx, gY - 240, 26, lc === '#ff6b6b' ? '255,107,107' : (lc === '#ffd23f' ? '255,210,63' : (lc === '#7dff9a' ? '125,255,154' : '107,196,255')), 0.7); } gxGlow(X, gY - 150, 210, '255,226,170', 0.4); }
  }

function gxIceFront(x0, x1, nv) {
    var X = ICE_X; if (X + 220 < x0 || X - 220 > x1) return; if (ruinI()) { drawIceRuin(x0, x1); return; }
    gxSprite('gxIce', 380, 190, 14, function (cx) { gxIceArt(cx, nv); }, X);
    bgNpc('icev', X, 226, false, 1.3);
    gxBig('МОРОЖЕНОЕ', X, gY - 264, 22, '#ffffff', null);
    ctx.font = '700 13px "Rubik", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffd27a'; ctx.fillText(fmtN(ICE_PRICE) + ' коинов', X + 87, gY - 42);
  }

function gxForestGround(xa, xb, nv) {
    gxGround(xa, xb, 'forest', nv);
    gxEach(xa, xb, 180, 40, 40, function (x, k) {
      var h = gxH(k * 31 + 9); if (x > CH_X - 340 && x < CH_X + 340) return; if (Math.abs(x - RIT_X) < 260) return;
      if (h < 0.2) gxFern(x, 0.9 + h); else if (h < 0.32) gxMush(x, 1 + h, '#e04a3a'); else if (h < 0.4) gxFlowers(x, 6, k); else if (h < 0.46) gxLog(x, 0.9 + h * 0.5); else if (h < 0.52) gxStump(x, 1 + h * 0.4); else if (h < 0.58) gxRockHD(x, 0.7 + h * 0.5); else if (h < 0.64) gxMush(x, 1.2, '#e8a43a');
    });
  }

function gxChurchArt(X, nv) {
    var i, wallA = '#d6cfc0', wallB = '#a99f8e', roof = '#4c5a82';
    gxShadow(X, gY + 5, 330, 0.95);
    [[-270, -62], [62, 270]].forEach(function (w, wi) {
      var a = X + w[0], b = X + w[1];
      gxPanel(a, gY - 190, b - a, 190, wallA, { lw: 2.6, tex: function (aa, bb, ww, hh) { ctx.strokeStyle = 'rgba(80,70,50,.2)'; ctx.lineWidth = 1.4; for (var r = 0; r < 8; r++) { ctx.beginPath(); ctx.moveTo(aa, bb + 4 + r * 24); ctx.lineTo(aa + ww, bb + 4 + r * 24); ctx.stroke(); for (var q = 0; q < ww; q += 36) { ctx.beginPath(); ctx.moveTo(aa + q + (r % 2) * 18, bb + 4 + r * 24); ctx.lineTo(aa + q + (r % 2) * 18, bb + 28 + r * 24); ctx.stroke(); } } } });
      ctx.fillStyle = gxLG(0, gY - 266, 0, gY - 190, shadeC(roof, 0.25), roof, shadeC(roof, -0.25)); ctx.beginPath(); ctx.moveTo(a - 12, gY - 190); ctx.lineTo((a + b) / 2, gY - 266); ctx.lineTo(b + 12, gY - 190); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke();
      ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.6; for (var q = 1; q < 6; q++) { ctx.beginPath(); ctx.moveTo(a - 12, gY - 190 - q * 12); ctx.lineTo(b + 12, gY - 190 - q * 12); ctx.stroke(); } ctx.restore();
      mnGlass((a + b) / 2 - 22, gY - 168, 44, 110, wi * 2); if (nv) gxGlow((a + b) / 2, gY - 112, 100, '255,200,120', 0.45);
    });
    gxPanel(X - 70, gY - 310, 140, 310, wallA, { lw: 2.8, tex: function (aa, bb, ww, hh) { ctx.strokeStyle = 'rgba(80,70,50,.2)'; ctx.lineWidth = 1.4; for (var r = 0; r < 13; r++) { ctx.beginPath(); ctx.moveTo(aa, bb + 6 + r * 24); ctx.lineTo(aa + ww, bb + 6 + r * 24); ctx.stroke(); } ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(aa + ww - 14, bb, 14, hh); } });
    gxPanel(X - 80, gY - 320, 160, 14, wallB, { lw: 2.2 });
    ctx.fillStyle = gxLG(0, gY - 474, 0, gY - 318, shadeC(roof, 0.28), roof, shadeC(roof, -0.28)); ctx.beginPath(); ctx.moveTo(X - 86, gY - 318); ctx.lineTo(X, gY - 474); ctx.lineTo(X + 86, gY - 318); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.moveTo(X - 86, gY - 318); ctx.lineTo(X, gY - 474); ctx.lineTo(X - 10, gY - 474); ctx.lineTo(X - 78, gY - 320); ctx.fill();
    gxPanel(X - 3, gY - 526, 6, 58, '#e8c25a', { lw: 1.6 }); gxPanel(X - 18, gY - 506, 36, 7, '#e8c25a', { lw: 1.6 });
    ctx.fillStyle = '#16111f'; mnArch(X - 27, gY - 294, 54, 72); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(X, gY - 188, 27, 0, 6.3); ctx.clip(); for (i = 0; i < 8; i++) { ctx.fillStyle = ['#d9433f', '#3b7ad9', '#e6b84a', '#3fae6a'][i % 4]; ctx.beginPath(); ctx.moveTo(X, gY - 188); ctx.arc(X, gY - 188, 30, i * 0.785, (i + 1) * 0.785); ctx.fill(); } ctx.restore(); ctx.strokeStyle = '#2b2236'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(X, gY - 188, 27, 0, 6.3); ctx.stroke();
    ctx.fillStyle = '#3b2616'; mnArch(X - 36, gY - 126, 72, 126); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = nv ? '#7a4a22' : '#5b3a1e'; mnArch(X - 29, gY - 119, 58, 119); ctx.fill(); ctx.fillStyle = '#2b1a0c'; ctx.fillRect(X - 1, gY - 90, 2, 90); ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.arc(X - 9, gY - 56, 3, 0, 6.3); ctx.arc(X + 9, gY - 56, 3, 0, 6.3); ctx.fill();
    gxPanel(X - 60, gY - 8, 120, 8, '#9a9488', { lw: 2 }); gxPanel(X - 52, gY - 16, 104, 8, '#b3ada0', { lw: 2 });
    [-92, 92].forEach(function (dx) { gxPanel(X + dx - 2.5, gY - 98, 5, 98, '#2f3641', { lw: 1.4 }); gxPanel(X + dx - 8, gY - 116, 16, 18, nv ? '#fff0b0' : '#f0eadd', { r: 4, lw: 1.8 }); if (nv) gxGlow(X + dx, gY - 106, 66, '255,226,140', 0.7); });
    if (nv) gxGlow(X, gY - 50, 130, '255,200,110', 0.55);
  }

function gxChurchFront(x0, x1, nv) {
    var X = CH_X; if (X + 320 < x0 || X - 320 > x1) return;
    gxSprite('gxChu', 560, 340, 14, function (cx) { gxChurchArt(cx, nv); }, X);
    var sw = Math.sin(t * 1.4) * 0.15; ctx.save(); ctx.translate(X, gY - 280); ctx.rotate(sw); ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.moveTo(-14, 34); ctx.quadraticCurveTo(-18, 6, 0, -2); ctx.quadraticCurveTo(18, 6, 14, 34); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-9, 4, 3, 22); ctx.restore();
    gxBig('ЦЕРКОВЬ', X, gY - 134, 15, '#ffffff', null);
    if (save.mx.c2l && !save.mx.c2e) { ctx.strokeStyle = 'rgba(30,24,20,.8)'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(X - 200, gY - 190); ctx.lineTo(X - 176, gY - 140); ctx.lineTo(X - 196, gY - 104); ctx.lineTo(X - 170, gY - 60); ctx.moveTo(X + 190, gY - 188); ctx.lineTo(X + 168, gY - 142); ctx.lineTo(X + 188, gY - 100); ctx.stroke(); }
  }

function gxCityBusy(x, pad) { for (var i = 0; i < GXSLOTS.length; i++) if (Math.abs(x - GXSLOTS[i][0]) < GXSLOTS[i][1] + (pad || 0)) return true; return false; }

function gxPlate(x, y, s, col, bg) {
    ctx.font = '700 13px "Rubik", system-ui, sans-serif'; var w = ctx.measureText(s).width + 18;
    ctx.fillStyle = bg || 'rgba(22,14,40,.66)'; gxRR(x - w / 2, y - 13, w, 21, 9); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col || '#fff'; ctx.fillText(s, x, y - 2);
  }

function gxRoom(xa, xb, o) {
    var up = gxUp(), dn = gxDown(), w = xb - xa, i, r, top = gY - up - 6, cy = Math.max(top, gY - 440), px;
    ctx.fillStyle = gxLG(0, top, 0, gY, o.wall[0], o.wall[1]); ctx.fillRect(xa, top, w, gY - top + 2);
    if (o.stripe) { ctx.fillStyle = o.stripe; for (i = Math.floor(xa / 46) * 46; i < xb; i += 46) ctx.fillRect(i, cy, 22, gY - cy); }
    if (o.dots) { ctx.fillStyle = o.dots; for (i = Math.floor(xa / 46) * 46; i < xb; i += 46) for (r = cy + 30; r < gY - 130; r += 56) { ctx.beginPath(); ctx.arc(i + 33, r + ((i / 46) % 2) * 22, 3.2, 0, 6.3); ctx.fill(); } }
    if (o.tex) o.tex(xa, xb, cy);
    // потолок и карниз
    ctx.fillStyle = gxLG(0, cy - 8, 0, cy + 18, shadeC(o.rail, 0.1), o.rail); ctx.fillRect(xa, cy - 8, w, 22); if (cy > top) { ctx.fillStyle = o.ceil; ctx.fillRect(xa, top, w, cy - top - 8); }
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(xa, cy - 8, w, 3); gxInk(2); ctx.beginPath(); ctx.moveTo(xa, cy + 14); ctx.lineTo(xb, cy + 14); ctx.stroke();
    var sg = ctx.createLinearGradient(0, cy + 14, 0, cy + 130); sg.addColorStop(0, 'rgba(20,10,0,.28)'); sg.addColorStop(1, 'rgba(20,10,0,0)'); ctx.fillStyle = sg; ctx.fillRect(xa, cy + 14, w, 116);
    // панели
    ctx.fillStyle = gxLG(0, gY - 118, 0, gY, shadeC(o.wain, 0.08), o.wain); ctx.fillRect(xa, gY - 118, w, 118);
    ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.8;
    for (i = Math.floor(xa / 86) * 86; i < xb + 86; i += 86) { gxRR(i + 8, gY - 100, 70, 78, 4); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.14)'; gxRR(i + 10, gY - 98, 66, 74, 3); ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.28)'; }
    ctx.fillStyle = gxLG(0, gY - 126, 0, gY - 112, shadeC(o.rail, 0.2), o.rail); ctx.fillRect(xa, gY - 126, w, 12); gxInk(1.8); ctx.strokeRect(xa - 2, gY - 126, w + 4, 12);
    ctx.fillStyle = shadeC(o.rail, -0.12); ctx.fillRect(xa, gY - 16, w, 16); gxInk(1.8); ctx.beginPath(); ctx.moveTo(xa, gY - 16); ctx.lineTo(xb, gY - 16); ctx.stroke();
    // пол
    ctx.fillStyle = gxLG(0, gY - 2, 0, gY + dn + 4, o.floor[0], o.floor[1]); ctx.fillRect(xa, gY - 2, w, dn + 8);
    ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = 1.6;
    var rows = [10, 24, 44, 70, 104, 148, 204, 270];
    for (r = 0; r < rows.length; r++) {
      if (gY + rows[r] > gY + dn) break; ctx.beginPath(); ctx.moveTo(xa, gY + rows[r]); ctx.lineTo(xb, gY + rows[r]); ctx.stroke();
      var pw = o.plank * (0.7 + r * 0.22), sh = (r % 2) * pw * 0.5, y2 = r ? gY + rows[r - 1] : gY - 2;
      for (px = Math.floor(xa / pw) * pw + sh; px < xb; px += pw) { ctx.beginPath(); ctx.moveTo(px, y2); ctx.lineTo(px, gY + rows[r]); ctx.stroke(); }
    }
    ctx.fillStyle = 'rgba(255,255,255,.1)'; for (i = Math.floor(xa / 160) * 160; i < xb; i += 160) ctx.fillRect(i + 30, gY + 14, 80, 3);
    var fg = ctx.createLinearGradient(0, gY - 2, 0, gY + 34); fg.addColorStop(0, 'rgba(10,4,0,.34)'); fg.addColorStop(1, 'rgba(10,4,0,0)'); ctx.fillStyle = fg; ctx.fillRect(xa, gY - 2, w, 34);
    var dg = ctx.createLinearGradient(0, gY + 60, 0, gY + dn); dg.addColorStop(0, 'rgba(0,0,0,0)'); dg.addColorStop(1, 'rgba(10,4,0,.4)'); ctx.fillStyle = dg; ctx.fillRect(xa, gY + 60, w, dn);
    gxInk(2.4); ctx.beginPath(); ctx.moveTo(xa, gY - 1); ctx.lineTo(xb, gY - 1); ctx.stroke();
  }

function gxExit(x, steel) {
    gxShadow(x, gY + 4, 62, 0.7);
    gxPanel(x - 50, gY - 180, 100, 180, steel ? '#6a7184' : '#9a6a3c', { r: 8, lw: 2.8 });
    gxPanel(x - 38, gY - 168, 76, 168, steel ? '#454b5e' : '#5a3a1e', { r: 5, lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 8, b + 12, w - 16, h * 0.4); ctx.strokeRect(a + 8, b + h * 0.55, w - 16, h * 0.38); } });
    if (steel) { ctx.fillStyle = '#20242f'; ctx.fillRect(x - 28, gY - 150, 56, 70); ctx.fillStyle = '#8a92a8'; for (var q = -2; q <= 2; q++) ctx.fillRect(x + q * 11 - 2, gY - 150, 4, 70); }
    else { ctx.fillStyle = gxLG(0, gY - 150, 0, gY - 90, '#cfeaf8', '#7fc0e4'); gxRR(x - 28, gY - 150, 56, 62, 28); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 28, gY - 120, 56, 3); }
    ctx.fillStyle = '#ffd86a'; ctx.beginPath(); ctx.arc(x + 26, gY - 74, 4, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke();
    gxPanel(x - 38, gY - 214, 76, 26, '#1f8a4a', { r: 8, lw: 2.4 }); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x - 32, gY - 211, 64, 3);
  }

function gxExitLabel(x, s, col) { gxText(s, x, gY - 201, 14, col || '#ffffff', 'rgba(8,40,20,.9)'); }

function gxArchWin(x, y, w, h, view, curt) {
    var r = w / 2;
    gxPanel(x - 7, y - 7 - r * 0.1, w + 14, h + 14 + r * 0.1, '#a67845', { r: r + 4, lw: 2.6 });
    ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + r); ctx.arc(x + r, y + r, r, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath();
    ctx.save(); ctx.clip(); ctx.fillStyle = gxLG(0, y, 0, y + h, view[0], view[1], view[2]); ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(x + w * 0.72, y + h * 0.3, 11, 0, 6.3); ctx.fill(); gxGlow(x + w * 0.72, y + h * 0.3, 40, '255,236,160', 0.7);
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.5, 18, 6, 0, 0, 6.3); ctx.ellipse(x + w * 0.42, y + h * 0.46, 12, 6, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#8bd06a'; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.quadraticCurveTo(x + w * 0.4, y + h * 0.7, x + w, y + h * 0.82); ctx.lineTo(x + w, y + h); ctx.fill();
    ctx.restore();
    gxInk(2); ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + r); ctx.arc(x + r, y + r, r, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = '#e9d6b0'; ctx.fillRect(x + r - 2, y, 4, h); ctx.fillRect(x, y + h * 0.5 - 2, w, 4); gxInk(1.2); ctx.strokeRect(x + r - 2, y, 4, h); ctx.strokeRect(x, y + h * 0.5 - 2, w, 4);
    gxPanel(x - 12, y + h + 5, w + 24, 8, '#c9a06a', { r: 3, lw: 2 });
    if (curt) { [[x - 14, 1], [x + w + 14, -1]].forEach(function (c) { ctx.fillStyle = gxLG(c[0], 0, c[0] + c[1] * 34, 0, shadeC(curt, 0.2), shadeC(curt, -0.2)); ctx.beginPath(); ctx.moveTo(c[0], y - 12); ctx.lineTo(c[0] + c[1] * 34, y - 12); ctx.quadraticCurveTo(c[0] + c[1] * 22, y + h * 0.5, c[0] + c[1] * 30, y + h + 6); ctx.lineTo(c[0] - c[1] * 2, y + h + 6); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke(); }); gxPanel(x - 22, y - 18, w + 44, 7, '#7a4a22', { r: 3, lw: 1.8 }); }
  }

function gxFrame(x, y, w, h, draw, col) {
    gxPanel(x - 6, y - 6, w + 12, h + 12, col || '#c9922e', { r: 3, lw: 2.2 }); ctx.fillStyle = '#fff6e0'; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x + 3, y + 3, w - 6, h - 6); ctx.clip(); draw(x + 3, y + 3, w - 6, h - 6); ctx.restore(); gxInk(1.2); ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.moveTo(x + 3, y + h - 3); ctx.lineTo(x + w * 0.5, y + 3); ctx.lineTo(x + w * 0.7, y + 3); ctx.lineTo(x + w * 0.25, y + h - 3); ctx.fill();
  }

function gxLanternH(x, y, col, nv) { gxPanel(x - 2, y - 32, 4, 20, '#4a3a2a', { lw: 1 }); gxPanel(x - 9, y - 14, 18, 24, '#f0d070', { r: 4, lw: 2 }); ctx.fillStyle = col || '#ffdf8a'; ctx.fillRect(x - 6, y - 10, 12, 16); gxGlow(x, y - 2, 46, '255,214,120', nv ? 0.8 : 0.35); }

function gxHomeArt(X, nv) {
    var i, W = 220;
    gxShadow(X, gY + 5, 160, 0.95);
    gxPanel(X - 118, gY - 20, 236, 20, '#9d968a', { lw: 2.4, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(40,30,20,.3)'; ctx.lineWidth = 1.3; for (var q = 0; q < w; q += 26) { ctx.beginPath(); ctx.moveTo(a + q + (b % 2) * 8, b); ctx.lineTo(a + q + 4, b + h); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(a, b + h * 0.5); ctx.lineTo(a + w, b + h * 0.5); ctx.stroke(); } });
    gxPanel(X + 56, gY - 270, 34, 100, '#a55b3c', { lw: 2.4, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(40,10,0,.3)'; ctx.lineWidth = 1.3; for (var q = 0; q < h; q += 14) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
    gxPanel(X + 50, gY - 282, 46, 14, '#7c4128', { r: 3, lw: 2.2 });
    gxPanel(X - W / 2, gY - 160, W, 142, '#f2dba2', { lw: 2.8, tex: function (a, b, w, h) {
      var r = rng(31); ctx.fillStyle = 'rgba(160,110,50,.1)'; for (var q = 0; q < 70; q++) { ctx.beginPath(); ctx.arc(a + r() * w, b + r() * h, 1.2 + r() * 2.2, 0, 6.3); ctx.fill(); }
      ctx.fillStyle = '#7a4a2a'; ctx.fillRect(a, b, 8, h); ctx.fillRect(a + w - 8, b, 8, h); ctx.fillRect(a + w / 2 - 4, b, 8, h); ctx.fillRect(a, b + 52, w, 7);
      ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(a + 8, b + 59); ctx.lineTo(a + 48, b + 8); ctx.moveTo(a + w - 8, b + 59); ctx.lineTo(a + w - 48, b + 8); ctx.stroke();
    } });
    // крыша
    ctx.beginPath(); ctx.moveTo(X - 138, gY - 156); ctx.lineTo(X, gY - 250); ctx.lineTo(X + 138, gY - 156); ctx.closePath();
    ctx.fillStyle = gxLG(0, gY - 250, 0, gY - 156, '#e0663f', '#bf4a2c', '#8e3320'); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(60,10,0,.4)'; ctx.lineWidth = 1.6;
    for (i = 0; i < 8; i++) { var ry = gY - 156 - i * 12; for (var q = -150; q < 150; q += 22) { ctx.beginPath(); ctx.arc(X + q + (i % 2) * 11, ry - 4, 11, 0.1, 3.05); ctx.stroke(); } }
    ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.beginPath(); ctx.moveTo(X - 138, gY - 156); ctx.lineTo(X, gY - 250); ctx.lineTo(X - 14, gY - 250); ctx.lineTo(X - 128, gY - 156); ctx.fill();
    ctx.restore(); gxInk(3); ctx.beginPath(); ctx.moveTo(X - 138, gY - 156); ctx.lineTo(X, gY - 250); ctx.lineTo(X + 138, gY - 156); ctx.closePath(); ctx.stroke();
    gxPanel(X - 142, gY - 162, 284, 10, '#7c4128', { r: 4, lw: 2.2 });
    // круглое окно на чердаке
    ctx.fillStyle = '#efe0b8'; ctx.beginPath(); ctx.arc(X, gY - 200, 19, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = nv ? gxLG(0, gY - 216, 0, gY - 184, '#ffe9a8', '#ffc66a') : gxLG(0, gY - 216, 0, gY - 184, '#cfeaf8', '#7fbfe4'); ctx.beginPath(); ctx.arc(X, gY - 200, 14, 0, 6.3); ctx.fill(); ctx.fillStyle = '#efe0b8'; ctx.fillRect(X - 1.5, gY - 214, 3, 28); ctx.fillRect(X - 14, gY - 201.5, 28, 3);
    // окна со ставнями и цветочными ящиками
    [-76, 76].forEach(function (dx, qi) {
      var wx = X + dx - 21; gxPanel(wx - 20, gY - 124, 14, 52, '#2f8a6a', { lw: 2 }); gxPanel(wx + 48, gY - 124, 14, 52, '#2f8a6a', { lw: 2 });
      gxWin(wx, gY - 122, 42, 48, nv ? 1 : 0, '#f6ecd4'); gxPanel(wx - 8, gY - 70, 58, 14, '#8a5a30', { r: 3, lw: 2 });
      for (var q = 0; q < 5; q++) { ctx.fillStyle = ['#ff6b8a', '#ffd23f', '#ff8a3c', '#c78bff', '#ff6b8a'][q]; ctx.beginPath(); ctx.arc(wx - 2 + q * 11.5, gY - 76 - (q % 2) * 4, 5.5, 0, 6.3); ctx.fill(); gxInk(1.3); ctx.stroke(); ctx.fillStyle = '#3f9a44'; ctx.fillRect(wx - 3 + q * 11.5, gY - 72, 3, 6); }
      if (nv) gxGlow(X + dx, gY - 98, 70, '255,206,110', 0.5);
    });
    // крыльцо и дверь
    gxPanel(X - 38, gY - 14, 76, 14, '#b9b3a6', { r: 3, lw: 2 }); gxPanel(X - 30, gY - 24, 60, 10, '#cfc9bb', { r: 3, lw: 2 });
    gxPanel(X - 28, gY - 112, 56, 90, '#7b4a24', { r: 4, lw: 2.8 }); ctx.fillStyle = '#5a3418'; ctx.beginPath(); ctx.moveTo(X - 24, gY - 24); ctx.lineTo(X - 24, gY - 92); ctx.arc(X, gY - 92, 24, Math.PI, 0); ctx.lineTo(X + 24, gY - 24); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY - 112, 0, gY - 80, nv ? '#ffe9a8' : '#cfeaf8', nv ? '#ffc66a' : '#82bde0'); ctx.beginPath(); ctx.arc(X, gY - 92, 14, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#ffd86a'; ctx.beginPath(); ctx.arc(X + 15, gY - 56, 3.4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X, gY - 78); ctx.lineTo(X, gY - 24); ctx.stroke();
    gxPanel(X - 44, gY - 130, 88, 20, '#a55b3c', { r: 4, lw: 2.4 }); for (i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(X - 36 + i * 22, gY - 126, 2, 12); }
    gxLanternH(X - 52, gY - 100, '#ffdf8a', nv); gxLanternH(X + 52, gY - 100, '#ffdf8a', nv);
    // вывеска
    gxTube([[X - 70, gY - 262], [X - 70, gY - 238]], 3, '#4a3a2a'); gxTube([[X + 70, gY - 262], [X + 70, gY - 238]], 3, '#4a3a2a');
    // кусты, цветы, почтовый ящик
    gxBushHD(X - 128, 1.1, 0); gxBushHD(X + 130, 1.0, 0); gxFlowers(X - 96, 4, 3); gxFlowers(X + 98, 4, 7); gxMail(X - 150);
    if (nv) gxGlow(X, gY - 80, 190, '255,200,110', 0.3);
  }

function gxBazArt(X, nv) {
    var i, c = ['#d94a4a', '#fff2dc'];
    gxShadow(X, gY + 5, 168, 0.95);
    gxPanel(X - 112, gY - 162, 224, 162, '#3b2150', { lw: 2.6, vert: true });
    ctx.save(); ctx.beginPath(); ctx.rect(X - 112, gY - 162, 224, 162); ctx.clip();
    for (i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#6a3a8a' : '#53296f'; ctx.beginPath(); ctx.moveTo(X - 112 + i * 40, gY - 162); ctx.quadraticCurveTo(X - 112 + i * 40 + 20, gY - 120, X - 112 + (i + 1) * 40, gY - 162); ctx.lineTo(X - 112 + (i + 1) * 40, gY); ctx.lineTo(X - 112 + i * 40, gY); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,214,120,.9)'; for (i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(X - 100 + i * 18, gY - 100 + (i % 3) * 22, 2.4, 0, 6.3); ctx.fill(); }
    gxGlow(X, gY - 70, 110, '255,190,90', 0.5); ctx.restore();
    gxPanel(X - 126, gY - 176, 14, 176, '#7a4a22', { lw: 2.4 }); gxPanel(X + 112, gY - 176, 14, 176, '#7a4a22', { lw: 2.4 });
    gxPanel(X - 132, gY - 186, 28, 16, '#c9922e', { r: 4, lw: 2.2 }); gxPanel(X + 104, gY - 186, 28, 16, '#c9922e', { r: 4, lw: 2.2 });
    for (i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? c[1] : c[0]; ctx.beginPath(); ctx.moveTo(X - 132 + i * 33, gY - 206); ctx.lineTo(X - 132 + (i + 1) * 33, gY - 206); ctx.lineTo(X - 132 + (i + 1) * 33 + 3, gY - 168); ctx.arc(X - 132 + (i + 0.5) * 33 + 1.5, gY - 168, 16.5, 0, Math.PI); ctx.lineTo(X - 132 + i * 33 - 3, gY - 168); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(X - 135, gY - 206, 270, 4);
    gxPanel(X - 62, gY - 244, 124, 32, '#8e2f2f', { r: 9, lw: 2.8, vert: true }); ctx.strokeStyle = '#ffd86a'; ctx.lineWidth = 2; gxRR(X - 57, gY - 239, 114, 22, 6); ctx.stroke();
    ctx.shadowColor = '#ffd86a'; ctx.shadowBlur = 5 + 8 * nv; gxBig('БАЗАР', X, gY - 227, 20, '#ffe9a0', null); ctx.shadowBlur = 0;
    for (i = 0; i < 9; i++) { var fx = X - 132 + i * 33, fy = gY - 250 + Math.sin(i * 0.9) * 6; }
    // флажки
    ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(X - 132, gY - 246); ctx.quadraticCurveTo(X, gY - 214, X + 132, gY - 246); ctx.stroke();
    for (i = 0; i < 10; i++) { var u = (i + 0.5) / 10, fx2 = X - 132 + u * 264, fy2 = gY - 246 + Math.sin(u * Math.PI) * 17; ctx.fillStyle = ['#ff5a5a', '#ffd23f', '#5ac8ff', '#7dff9a', '#c78bff'][i % 5]; ctx.beginPath(); ctx.moveTo(fx2 - 6, fy2); ctx.lineTo(fx2 + 6, fy2); ctx.lineTo(fx2, fy2 + 13); ctx.closePath(); ctx.fill(); gxInk(1.2); ctx.stroke(); }
    // ящики с фруктами, корзины, кувшины
    [[-96, 0], [-66, 1], [66, 2], [98, 0]].forEach(function (cc, qi) {
      var cx = X + cc[0]; gxCrate(cx, 1.05, '#b07a42'); var fc = ['#ff8a2a', '#e5484d', '#7ac24a'][cc[1]];
      for (var q = -1; q <= 1; q++) { ctx.fillStyle = fc; ctx.beginPath(); ctx.arc(cx + q * 9, gY - 34, 7.5, 0, 6.3); ctx.fill(); gxInk(1.3); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(cx + q * 9 - 2, gY - 36, 2, 0, 6.3); ctx.fill(); }
    });
    gxBarrel(X - 126, 1.1, '#8a5a34'); gxBarrel(X + 128, 1.05, '#8a5a34');
    if (nv) { gxGlow(X, gY - 100, 200, '255,190,90', 0.4); }
  }

function gxCrtArt(X, nv) {
    var i;
    gxShadow(X, gY + 5, 180, 0.95);
    for (i = 0; i < 3; i++) gxPanel(X - 150 + i * 8, gY - 14 - i * 12 + 12, 300 - i * 16, 14, i % 2 ? '#d9d3c6' : '#cdc7ba', { lw: 2, r: 2 });
    gxPanel(X - 126, gY - 216, 252, 190, '#e3dccb', { lw: 2.8, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(80,70,50,.16)'; ctx.lineWidth = 1.3; for (var q = 0; q < h; q += 20) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
    // фронтон
    ctx.fillStyle = gxLG(0, gY - 290, 0, gY - 214, '#efe9d9', '#cfc8b4'); ctx.beginPath(); ctx.moveTo(X - 144, gY - 214); ctx.lineTo(X, gY - 288); ctx.lineTo(X + 144, gY - 214); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.fillStyle = '#e3dccb'; ctx.beginPath(); ctx.moveTo(X - 116, gY - 222); ctx.lineTo(X, gY - 272); ctx.lineTo(X + 116, gY - 222); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke();
    // весы
    ctx.strokeStyle = '#a6812a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, gY - 262); ctx.lineTo(X, gY - 232); ctx.moveTo(X - 34, gY - 248); ctx.lineTo(X + 34, gY - 248); ctx.stroke();
    ctx.fillStyle = '#d9a63a'; [-34, 34].forEach(function (dx) { ctx.beginPath(); ctx.moveTo(X + dx, gY - 248); ctx.lineTo(X + dx - 12, gY - 232); ctx.lineTo(X + dx + 12, gY - 232); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.beginPath(); ctx.ellipse(X + dx, gY - 231, 14, 4, 0, 0, 6.3); ctx.fill(); ctx.stroke(); });
    gxPanel(X - 132, gY - 226, 264, 14, '#cfc8b4', { lw: 2.2 });
    for (i = 0; i < 5; i++) { var cx = X - 108 + i * 54; if (Math.abs(cx - X) < 30) continue; gxPanel(cx - 11, gY - 208, 22, 176, '#f7f3e8', { lw: 2.2 }); ctx.fillStyle = 'rgba(0,0,0,.09)'; for (var q = 0; q < 3; q++) ctx.fillRect(cx - 8 + q * 6, gY - 204, 2, 168); gxPanel(cx - 15, gY - 214, 30, 8, '#d9d3c6', { lw: 1.8 }); gxPanel(cx - 15, gY - 36, 30, 8, '#d9d3c6', { lw: 1.8 }); }
    [-80, 80].forEach(function (dx) { gxWin(X + dx - 18, gY - 160, 36, 70, nv ? 1 : 0, '#f6f3ea'); });
    gxPanel(X - 34, gY - 112, 68, 86, '#4a3a2a', { r: 4, lw: 2.8 }); ctx.fillStyle = '#6a4e32'; ctx.fillRect(X - 29, gY - 106, 27, 78); ctx.fillRect(X + 2, gY - 106, 27, 78); ctx.fillStyle = '#e9c35a'; ctx.beginPath(); ctx.arc(X - 8, gY - 64, 3, 0, 6.3); ctx.arc(X + 8, gY - 64, 3, 0, 6.3); ctx.fill();
    gxPanel(X - 30, gY - 202, 60, 24, '#17324a', { r: 6, lw: 2.4 }); ctx.shadowColor = '#ffe9a0'; ctx.shadowBlur = 4 + 8 * nv; gxBig('СУД', X, gY - 190, 17, '#ffe9a0', null); ctx.shadowBlur = 0;
    gxLanternH(X - 62, gY - 66, '#ffdf8a', nv); gxLanternH(X + 62, gY - 66, '#ffdf8a', nv);
    if (nv) gxGlow(X, gY - 100, 220, '255,230,170', 0.3);
  }

function gxCemGate(X, nv) {
    var i;
    gxShadow(X, gY + 5, 140, 0.9);
    ctx.strokeStyle = '#1b1e28'; ctx.lineWidth = 4.5; for (i = -4; i <= 4; i++) { var bx = X + i * 21; ctx.beginPath(); ctx.moveTo(bx, gY); ctx.lineTo(bx, gY - 150); ctx.stroke(); ctx.fillStyle = '#1b1e28'; ctx.beginPath(); ctx.moveTo(bx - 6, gY - 148); ctx.lineTo(bx, gY - 172); ctx.lineTo(bx + 6, gY - 148); ctx.fill(); }
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(X - 100, gY - 112); ctx.lineTo(X + 100, gY - 112); ctx.moveTo(X - 100, gY - 36); ctx.lineTo(X + 100, gY - 36); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = '#2b3042'; for (i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(X - 63 + i * 42, gY - 74, 12, 0, 6.3); ctx.stroke(); }
    [-1, 1].forEach(function (s) {
      var px = X + s * 92 - 12; gxPanel(px, gY - 236, 24, 236, '#8a8f9e', { lw: 2.6, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(30,34,48,.35)'; ctx.lineWidth = 1.3; for (var q = 0; q < h; q += 22) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } ctx.fillStyle = 'rgba(70,130,70,.28)'; ctx.beginPath(); ctx.ellipse(a + 6, b + h - 20, 12, 40, 0, 0, 6.3); ctx.fill(); } });
      gxPanel(px - 6, gY - 248, 36, 14, '#a3a8b8', { r: 3, lw: 2.2 });
      ctx.fillStyle = '#a3a8b8'; ctx.beginPath(); ctx.moveTo(px + 2, gY - 248); ctx.lineTo(px + 12, gY - 284); ctx.lineTo(px + 22, gY - 248); ctx.closePath(); ctx.fill(); gxInk(2.2); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(px + 2, gY - 236, 4, 230);
    });
    ctx.strokeStyle = '#1b1e28'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X - 80, gY - 236); ctx.quadraticCurveTo(X, gY - 292, X + 80, gY - 236); ctx.stroke();
    gxPanel(X - 62, gY - 262, 124, 30, '#2a2f3e', { r: 8, lw: 2.4 }); gxText('КЛАДБИЩЕ', X, gY - 247, 15, '#e8ecff', null);
    ctx.fillStyle = 'rgba(60,150,70,.8)'; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(X - 100 + i * 8, gY - 230 + i * 7, 5, 11, 0.5, 0, 6.3); ctx.fill(); }
    gxGlow(X - 92, gY - 258, 40, '160,190,255', 0.4); gxGlow(X + 92, gY - 258, 40, '160,190,255', 0.4);
  }

function gxCup(x, y, s, col) {   // кубок, y = низ подставки
    var w = 14 * s, i;
    gxPanel(x - w * 1.6, y - 10 * s, w * 3.2, 10 * s, '#5a3a1e', { r: 2, lw: 1.8 });
    gxPanel(x - w * 0.5, y - 20 * s, w, 10 * s, shadeC(col, -0.1), { lw: 1.6 });
    ctx.strokeStyle = GXI; ctx.lineWidth = 3.4 * s + 1.6; ctx.beginPath(); ctx.arc(x - w * 1.35, y - 36 * s, 8 * s, 1.6, 4.7); ctx.arc(x + w * 1.35, y - 36 * s, 8 * s, 4.7, 7.9); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = 3.4 * s; ctx.beginPath(); ctx.arc(x - w * 1.35, y - 36 * s, 8 * s, 1.6, 4.7); ctx.arc(x + w * 1.35, y - 36 * s, 8 * s, 4.7, 7.9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - w * 1.6, y - 50 * s); ctx.quadraticCurveTo(x - w * 1.5, y - 22 * s, x, y - 20 * s); ctx.quadraticCurveTo(x + w * 1.5, y - 22 * s, x + w * 1.6, y - 50 * s); ctx.closePath();
    ctx.fillStyle = gxLG(x - w * 1.6, 0, x + w * 1.6, 0, shadeC(col, 0.3), col, shadeC(col, -0.28)); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(x - w * 0.8, y - 38 * s, 2.6 * s, 9 * s, 0.2, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#fff6c0'; ctx.beginPath(); for (i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 3 * s : 6.5 * s; ctx.lineTo(x + Math.cos(a) * r, y - 36 * s + Math.sin(a) * r); } ctx.closePath(); ctx.fill();
  }

function gxBooks(x, y, n, seed) {
    var r = rng(seed | 0), cx = x, i, cols = ['#c24a4a', '#3b7ad9', '#3fae6a', '#e6b84a', '#8a5ad9', '#e07a3a'];
    for (i = 0; i < n; i++) { var w = 9 + r() * 7, h = 28 + r() * 16, c = cols[Math.floor(r() * 6)]; gxPanel(cx, y - h, w, h, c, { lw: 1.6 }); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(cx + 1, y - h + 6, w - 2, 2); ctx.fillRect(cx + 1, y - h + h * 0.62, w - 2, 2); cx += w; }
  }

function gxPiggy(X) {
    var i;
    gxShadow(X, gY + 4, 84, 0.95);
    gxPanel(X - 52, gY - 30, 104, 30, '#7a5230', { r: 6, lw: 2.6, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1.4; for (var q = 10; q < w; q += 26) { ctx.beginPath(); ctx.moveTo(a + q, b); ctx.lineTo(a + q, b + h); ctx.stroke(); } } });
    [-34, -12, 16, 38].forEach(function (dx) { gxPanel(X + dx - 8, gY - 46, 16, 20, '#f08aa8', { r: 6, lw: 2 }); });
    var g = ctx.createRadialGradient(X - 16, gY - 90, 6, X, gY - 72, 64); g.addColorStop(0, '#ffc2d4'); g.addColorStop(0.55, '#f58bb0'); g.addColorStop(1, '#d4608a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(X, gY - 74, 58, 42, 0, 0, 6.3); ctx.fill(); gxInk(3); ctx.stroke();
    ctx.fillStyle = '#e46f98'; ctx.beginPath(); ctx.moveTo(X + 20, gY - 108); ctx.lineTo(X + 34, gY - 132); ctx.lineTo(X + 44, gY - 104); ctx.closePath(); ctx.fill(); gxInk(2.2); ctx.stroke(); ctx.fillStyle = '#ffb4cc'; ctx.beginPath(); ctx.moveTo(X + 26, gY - 108); ctx.lineTo(X + 34, gY - 124); ctx.lineTo(X + 40, gY - 106); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff9fbd'; ctx.beginPath(); ctx.ellipse(X + 56, gY - 68, 16, 14, 0, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = '#b8456e'; ctx.beginPath(); ctx.ellipse(X + 53, gY - 68, 2.8, 4.2, 0, 0, 6.3); ctx.ellipse(X + 61, gY - 68, 2.8, 4.2, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X + 38, gY - 84, 6, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#2a1830'; ctx.beginPath(); ctx.arc(X + 40, gY - 84, 3, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,90,130,.35)'; ctx.beginPath(); ctx.ellipse(X + 34, gY - 70, 7, 4.5, 0, 0, 6.3); ctx.fill();
    ctx.strokeStyle = GXI; ctx.lineWidth = 5.4; ctx.beginPath(); ctx.arc(X - 62, gY - 78, 9, 1.2, 5.2); ctx.stroke(); ctx.strokeStyle = '#e46f98'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.arc(X - 62, gY - 78, 9, 1.2, 5.2); ctx.stroke();
    ctx.fillStyle = '#6a1a3a'; gxRR(X - 22, gY - 114, 34, 7, 3); ctx.fill();
    ctx.fillStyle = gxLG(X - 8, 0, X + 8, 0, '#fff3a0', '#e9a823'); ctx.beginPath(); ctx.ellipse(X - 5, gY - 120, 5.5, 14, 0.1, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(X - 24, gY - 92, 18, 6, -0.5, 0, 6.3); ctx.fill();
    for (i = 0; i < 3; i++) { for (var q = 0; q < 4 + i; q++) { ctx.fillStyle = q % 2 ? '#f0b830' : '#ffd86a'; ctx.beginPath(); ctx.ellipse(X - 92 + i * 4, gY - 4 - q * 5, 13, 4.4, 0, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); } if (i === 0) break; }
  }

function gxBedArt(X) {
    gxShadow(X, gY + 5, 130, 0.95);
    [-92, 78].forEach(function (dx) { gxPanel(X + dx, gY - 30, 12, 30, '#5a3a1e', { lw: 2 }); });
    gxPanel(X - 108, gY - 138, 20, 138, '#7a4a26', { r: 6, lw: 2.8, vert: true }); gxPanel(X - 112, gY - 146, 28, 14, '#a8703a', { r: 5, lw: 2.2 });
    gxPanel(X + 88, gY - 78, 16, 78, '#7a4a26', { r: 5, lw: 2.6, vert: true });
    gxPanel(X - 94, gY - 52, 186, 26, '#f6efe0', { r: 8, lw: 2.4 });
    gxPanel(X - 90, gY - 94, 56, 30, '#ffffff', { r: 13, lw: 2.4, vert: true }); gxPanel(X - 62, gY - 88, 52, 26, '#f0f4ff', { r: 12, lw: 2.2, vert: true });
    gxPanel(X - 40, gY - 74, 130, 36, '#c24a4a', { r: 9, lw: 2.6, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(255,255,255,.28)'; for (var q = 0; q < w; q += 22) for (var rr = 0; rr < 2; rr++) { ctx.beginPath(); ctx.moveTo(a + q + 11, b + 4 + rr * 16); ctx.lineTo(a + q + 19, b + 12 + rr * 16); ctx.lineTo(a + q + 11, b + 20 + rr * 16); ctx.lineTo(a + q + 3, b + 12 + rr * 16); ctx.fill(); } } });
    ctx.fillStyle = '#f6efe0'; ctx.fillRect(X - 40, gY - 74, 6, 36);
    gxPanel(X + 130, gY - 62, 50, 62, '#9a6a3c', { r: 4, lw: 2.4 }); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(X + 136, gY - 36, 38, 2); gxPanel(X + 150, gY - 92, 10, 30, '#e8c25a', { lw: 1.8 }); ctx.fillStyle = '#fff1b0'; ctx.beginPath(); ctx.moveTo(X + 140, gY - 90); ctx.lineTo(X + 170, gY - 90); ctx.lineTo(X + 164, gY - 120); ctx.lineTo(X + 146, gY - 120); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke(); gxGlow(X + 155, gY - 104, 70, '255,226,150', 0.45);
  }

function gxShelfArt(X) {
    gxShadow(X, gY + 5, 120, 0.9);
    gxPanel(X - 112, gY - 296, 224, 296, '#8a5a30', { r: 4, lw: 2.8, vert: true });
    gxPanel(X - 100, gY - 284, 200, 168, '#4a2c16', { r: 2, lw: 2 });
    gxPanel(X - 100, gY - 112, 200, 106, '#7a4a26', { r: 3, lw: 2.2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 8, b + 8, w / 2 - 12, h - 16); ctx.strokeRect(a + w / 2 + 4, b + 8, w / 2 - 12, h - 16); } });
    ctx.fillStyle = '#e8c25a'; ctx.beginPath(); ctx.arc(X - 10, gY - 56, 3.6, 0, 6.3); ctx.arc(X + 10, gY - 56, 3.6, 0, 6.3); ctx.fill();
    [-200, -120].forEach(function (dy) { gxPanel(X - 104, gY + dy, 208, 10, '#a8703a', { lw: 2.2 }); });
    gxCup(X - 66, gY - 200, 1.15, '#f2c230'); gxCup(X + 20, gY - 200, 1.0, '#d9d9e2'); gxCup(X + 70, gY - 200, 0.8, '#d98a4a');
    gxBooks(X - 94, gY - 120, 7, 21); gxBooks(X + 20, gY - 120, 5, 29);
    ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(X + 74, gY - 138, 12, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.fillStyle = '#c43a3a'; ctx.beginPath(); ctx.moveTo(X + 68, gY - 128); ctx.lineTo(X + 62, gY - 118); ctx.lineTo(X + 70, gY - 122); ctx.lineTo(X + 76, gY - 118); ctx.lineTo(X + 80, gY - 128); ctx.fill(); gxInk(1.4); ctx.stroke();
    ctx.fillStyle = '#c24a4a'; ctx.beginPath(); ctx.moveTo(X - 90, gY - 284); ctx.lineTo(X - 50, gY - 284); ctx.lineTo(X - 70, gY - 252); ctx.closePath(); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = '#3b7ad9'; ctx.beginPath(); ctx.moveTo(X + 50, gY - 284); ctx.lineTo(X + 90, gY - 284); ctx.lineTo(X + 70, gY - 252); ctx.closePath(); ctx.fill(); ctx.stroke();
  }

function gxPhotos(X) {
    var draws = [function (a, b, w, h) { ctx.fillStyle = gxLG(0, b, 0, b + h, '#aee0ff', '#e8f6ff'); ctx.fillRect(a, b, w, h); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(a + w * 0.7, b + h * 0.3, 7, 0, 6.3); ctx.fill(); ctx.fillStyle = '#6ac26a'; ctx.beginPath(); ctx.moveTo(a, b + h); ctx.lineTo(a + w * 0.4, b + h * 0.5); ctx.lineTo(a + w, b + h); ctx.fill(); },
    function (a, b, w, h) { ctx.fillStyle = '#ffd7de'; ctx.fillRect(a, b, w, h); ctx.fillStyle = '#e5484d'; ctx.beginPath(); ctx.moveTo(a + w / 2, b + h * 0.78); ctx.bezierCurveTo(a - 4, b + h * 0.4, a + w * 0.2, b + h * 0.12, a + w / 2, b + h * 0.38); ctx.bezierCurveTo(a + w * 0.8, b + h * 0.12, a + w + 4, b + h * 0.4, a + w / 2, b + h * 0.78); ctx.fill(); },
    function (a, b, w, h) { ctx.fillStyle = gxLG(0, b, 0, b + h, '#ffe9a8', '#ffc66a'); ctx.fillRect(a, b, w, h); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(a + w / 2, b + h * 0.64, w * 0.3, h * 0.28, 0, 0, 6.3); ctx.fill(); ctx.fillStyle = '#d62828'; ctx.beginPath(); ctx.moveTo(a + w * 0.38, b + h * 0.3); ctx.lineTo(a + w * 0.44, b + h * 0.12); ctx.lineTo(a + w * 0.5, b + h * 0.28); ctx.lineTo(a + w * 0.56, b + h * 0.12); ctx.lineTo(a + w * 0.62, b + h * 0.3); ctx.fill(); }];
    for (var i = 0; i < 3; i++) { var fx = X - 80 + i * 56, fy = gY - 260 + (i % 2) * 20; ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(fx + 23, fy - 4); ctx.lineTo(fx + 23, fy - 22); ctx.stroke(); ctx.fillStyle = '#c9922e'; ctx.beginPath(); ctx.arc(fx + 23, fy - 22, 3, 0, 6.3); ctx.fill(); gxFrame(fx, fy, 46, 56, draws[i]); }
  }

function gxPlant(x, s) {
    gxShadow(x, gY + 3, 30 * s, 0.7); var i;
    for (i = -3; i <= 3; i++) { ctx.fillStyle = (i % 2) ? '#2f9a4a' : '#43b85c'; ctx.beginPath(); ctx.moveTo(x, gY - 40 * s); ctx.quadraticCurveTo(x + i * 16 * s, gY - 100 * s - Math.abs(i) * 6, x + i * 26 * s, gY - (70 - Math.abs(i) * 6) * s); ctx.quadraticCurveTo(x + i * 14 * s, gY - 70 * s, x, gY - 40 * s); ctx.fill(); gxInk(1.8); ctx.stroke(); }
    gxPanel(x - 20 * s, gY - 42 * s, 40 * s, 42 * s, '#c9663a', { r: 5, lw: 2.4 }); gxPanel(x - 24 * s, gY - 48 * s, 48 * s, 10 * s, '#d97a4a', { r: 4, lw: 2.2 });
  }

function gxRug(x, w, c1, c2) { ctx.fillStyle = c1; ctx.beginPath(); ctx.ellipse(x, gY + 22, w, 15, 0, 0, 6.3); ctx.fill(); gxInk(2); ctx.stroke(); ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, gY + 22, w * 0.82, 11, 0, 0, 6.3); ctx.stroke(); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(x, gY + 22, w * 0.55, 7, 0, 0, 6.3); ctx.stroke(); }

function gxDust(x0, x1, ax, ay, n) { ctx.fillStyle = 'rgba(255,244,200,.55)'; for (var i = 0; i < n; i++) { var u = (t * 0.05 + i / n) % 1, px = ax + Math.sin(t * 0.6 + i * 3.1) * 40 + u * 80 - 20, py = ay + u * 260; ctx.beginPath(); ctx.arc(px, py, 1.4 + (i % 3) * 0.6, 0, 6.3); ctx.fill(); } }

function gxNxPar(c) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); setCam(1); }

function gxStallArt(X, kind, c1) {
    var i;
    gxShadow(X, gY + 5, 140, 0.9);
    gxPanel(X - 118, gY - 232, 10, 232, '#6a4524', { lw: 2.2 }); gxPanel(X + 108, gY - 232, 10, 232, '#6a4524', { lw: 2.2 });
    if (kind === 2) { ctx.fillStyle = gxLG(0, gY - 270, 0, gY - 100, '#6a3a9a', '#3d1f66'); ctx.beginPath(); ctx.moveTo(X - 130, gY - 100); ctx.quadraticCurveTo(X - 120, gY - 250, X, gY - 280); ctx.quadraticCurveTo(X + 120, gY - 250, X + 130, gY - 100); ctx.closePath(); ctx.fill(); gxInk(2.8); ctx.stroke(); ctx.fillStyle = '#ffd86a'; for (i = 0; i < 16; i++) { var sa = i * 2.1, sx = X + Math.cos(sa) * (16 + (i * 13) % 84), sy = gY - 190 + Math.sin(sa) * (14 + (i * 7) % 56) * 1.2; ctx.beginPath(); ctx.arc(sx, sy, 2 + (i % 3), 0, 6.3); ctx.fill(); } ctx.fillStyle = '#17082e'; ctx.beginPath(); ctx.moveTo(X - 52, gY - 100); ctx.quadraticCurveTo(X - 46, gY - 190, X, gY - 200); ctx.quadraticCurveTo(X + 46, gY - 190, X + 52, gY - 100); ctx.fill(); }
    else { gxPanel(X - 108, gY - 110, 216, 110, '#e9d8b4', { lw: 2.4, vert: true }); ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(X - 108, gY - 110, 216, 30); }
    gxAwning(X - 124, gY - 262, 248, 38, kind === 2 ? '#7a3ab8' : c1, kind === 2 ? '#ffd86a' : '#fff2dc');
    if (kind !== 2) { ctx.fillStyle = '#6a4524'; ctx.fillRect(X - 124, gY - 270, 248, 10); }
    gxPanel(X - 104, gY - 60, 208, 60, kind === 2 ? '#4a2a72' : '#9a6a3c', { r: 4, lw: 2.6, tex: function (a, b, w, h) { ctx.fillStyle = 'rgba(255,255,255,.15)'; for (var q = 0; q < w; q += 26) ctx.fillRect(a + q, b + 12, 14, h - 12); } });
    gxPanel(X - 112, gY - 70, 224, 14, kind === 2 ? '#6a3a9a' : '#c9a060', { r: 5, lw: 2.4 });
    if (kind === 0) {
      for (i = 0; i < 3; i++) { gxPanel(X - 100 + i * 36, gY - 102, 30, 32, '#c4a060', { r: 12, lw: 2 }); ctx.fillStyle = '#f2c94a'; ctx.beginPath(); ctx.arc(X - 85 + i * 36, gY - 104, 7, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); }
      gxPanel(X + 20, gY - 120, 4, 50, '#6a6e7a', { lw: 1.6 }); gxPanel(X + 2, gY - 124, 40, 4, '#8a8e9a', { lw: 1.6 }); [-1, 1].forEach(function (s) { ctx.fillStyle = '#d9a63a'; ctx.beginPath(); ctx.ellipse(X + 22 + s * 18, gY - 100, 11, 4, 0, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); });
      for (i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(220,240,250,.85)'; gxRR(X + 62 + i * 11, gY - 116, 9, 24, 3); ctx.fill(); gxInk(1.4); ctx.stroke(); }
    } else if (kind === 1) {
      ctx.strokeStyle = GXI; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(X - 40, gY - 96, 26, 0, 6.3); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill(); ctx.strokeStyle = '#d94a4a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(X - 40, gY - 96, 26, 0, 6.3); ctx.stroke();
      for (i = 0; i < 9; i++) { ctx.fillStyle = ['#ffd23f', '#5ac8ff', '#ff6b8a', '#7dff9a'][i % 4]; ctx.beginPath(); ctx.arc(X - 52 + (i % 3) * 12 + 4, gY - 104 + Math.floor(i / 3) * 10 + 4, 5, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); }
      gxPanel(X - 42, gY - 66, 8, 18, '#6a4524', { lw: 1.4 });
      for (i = 0; i < 3; i++) { gxBlob([{ x: X + 30 + i * 30, y: gY - 96, r: 12 }, { x: X + 30 + i * 30, y: gY - 112, r: 9 }, { x: X + 22 + i * 30, y: gY - 119, r: 4 }, { x: X + 38 + i * 30, y: gY - 119, r: 4 }], ['#e8a0c0', '#a0d0f0', '#f0d060'][i], { lw: 2, seed: i }); }
    } else if (kind === 2) {
      ctx.fillStyle = gxLG(0, gY - 126, 0, gY - 82, '#e6f4ff', '#6aa6e0'); ctx.beginPath(); ctx.arc(X, gY - 100, 22, 0, 6.3); ctx.fill(); gxInk(2.4); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(X - 8, gY - 109, 8, 5, -0.6, 0, 6.3); ctx.fill(); gxGlow(X, gY - 100, 60, '150,200,255', 0.5);
      gxPanel(X - 18, gY - 80, 36, 12, '#c9922e', { r: 4, lw: 2 });
      [-70, 70].forEach(function (dx) { gxPanel(X + dx - 5, gY - 94, 10, 24, '#fff4d8', { r: 3, lw: 1.8 }); ctx.fillStyle = '#ffa63a'; ctx.beginPath(); ctx.ellipse(X + dx, gY - 100, 3.4, 6.4, 0, 0, 6.3); ctx.fill(); gxGlow(X + dx, gY - 100, 28, '255,180,80', 0.6); });
      for (i = 0; i < 3; i++) gxPanel(X + 36 + i * 14, gY - 84 + i * 2, 12, 18, '#f4ecd8', { r: 2, lw: 1.5 });
    } else {
      gxPanel(X - 100, gY - 224, 200, 160, '#8a5a30', { r: 6, lw: 2.8 }); gxPanel(X - 92, gY - 216, 184, 144, '#c9a26a', { r: 3, lw: 2, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(80,50,20,.3)'; ctx.lineWidth = 1.3; for (var q = 0; q < h; q += 18) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
      var pc = ['#fff8e0', '#ffe7a8', '#d6f2ff', '#ffd6e0'];
      for (i = 0; i < 8; i++) { var px = X - 80 + (i % 4) * 44 + ((i * 7) % 5), py = gY - 206 + Math.floor(i / 4) * 66 + ((i * 3) % 6); ctx.save(); ctx.translate(px + 18, py + 24); ctx.rotate(((i * 37) % 11 - 5) * 0.025); ctx.fillStyle = pc[i % 4]; ctx.fillRect(-18, -24, 36, 48); gxInk(1.4); ctx.strokeRect(-18, -24, 36, 48); ctx.fillStyle = 'rgba(40,30,20,.55)'; for (var q = 0; q < 5; q++) ctx.fillRect(-13, -16 + q * 8, 26 - (q % 3) * 6, 2); ctx.fillStyle = '#d94a4a'; ctx.beginPath(); ctx.arc(0, -22, 3.4, 0, 6.3); ctx.fill(); ctx.restore(); }
    }
  }

function gxDeadTree(x, h, seed) {
    var r = rng((seed | 0) + 5);
    function br(px, py, a, len, w, d) {
      if (d > 4 || len < 10) return; var ex = px + Math.cos(a) * len, ey = py + Math.sin(a) * len;
      ctx.strokeStyle = GXI; ctx.lineWidth = w + 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + ex) / 2 + (r() - 0.5) * 10, (py + ey) / 2, ex, ey); ctx.stroke();
      ctx.strokeStyle = d % 2 ? '#2a2630' : '#3a3440'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + ex) / 2 + (r() - 0.5) * 10, (py + ey) / 2, ex, ey); ctx.stroke();
      br(ex, ey, a - 0.4 - r() * 0.4, len * 0.72, w * 0.66, d + 1); br(ex, ey, a + 0.4 + r() * 0.4, len * 0.68, w * 0.62, d + 1);
    }
    gxShadow(x, gY + 5, h * 0.3, 0.8); br(x, gY + 2, -Math.PI / 2 + (r() - 0.5) * 0.2, h * 0.42, h * 0.07, 0);
  }

function gxGraveArt(cx, v) {
    var w = 74, col = ['#9aa3b4', '#8f98aa', '#a4acbc'][v];
    gxShadow(cx, gY + 4, 58, 0.9); ctx.fillStyle = '#2d3a2e'; ctx.beginPath(); ctx.ellipse(cx, gY + 2, 56, 10, 0, 0, 6.3); ctx.fill();
    if (v === 1) {
      gxPanel(cx - 40, gY - 22, 80, 22, '#7d8698', { r: 3, lw: 2.2 }); gxPanel(cx - 11, gY - 118, 22, 100, col, { r: 4, lw: 2.6 }); gxPanel(cx - 36, gY - 90, 72, 20, col, { r: 4, lw: 2.6 });
    } else {
      gxPanel(cx - 44, gY - 18, 88, 18, '#7d8698', { r: 3, lw: 2.2 });
      ctx.beginPath(); ctx.moveTo(cx - w / 2, gY - 14); ctx.lineTo(cx - w / 2, gY - (v ? 90 : 78)); if (v) { ctx.lineTo(cx - w / 2 + 12, gY - 118); ctx.lineTo(cx + w / 2 - 12, gY - 118); ctx.lineTo(cx + w / 2, gY - 90); } else ctx.arc(cx, gY - 78, w / 2, Math.PI, 0); ctx.lineTo(cx + w / 2, gY - 14); ctx.closePath();
      ctx.fillStyle = gxLG(cx - w / 2, 0, cx + w / 2, 0, shadeC(col, 0.22), col, shadeC(col, -0.3)); ctx.fill(); gxInk(2.8); ctx.stroke();
      ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(70,130,80,.5)'; ctx.beginPath(); ctx.ellipse(cx - 24, gY - 18, 24, 12, 0, 0, 6.3); ctx.ellipse(cx + 26, gY - (v ? 96 : 100), 12, 8, 0, 0, 6.3); ctx.fill(); ctx.restore();
    }
    ctx.strokeStyle = 'rgba(30,34,50,.55)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(cx - 8, gY - 40); ctx.lineTo(cx - 2, gY - 52); ctx.lineTo(cx - 10, gY - 62); ctx.stroke();
    if (v !== 1) { ctx.fillStyle = '#5a6272'; ctx.fillRect(cx - 3, gY - 84, 6, 30); ctx.fillRect(cx - 12, gY - 74, 24, 6); }
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(cx - w / 2 + 3, gY - 74, 5, 56);
  }

function gxBouquet(cx) { var i; for (i = -2; i <= 2; i++) { ctx.strokeStyle = '#2f7a2a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(cx + i * 4, gY + 6); ctx.lineTo(cx + i * 11, gY - 10); ctx.stroke(); ctx.fillStyle = ['#ff7aa8', '#ffd23f', '#fff', '#ff9a4a', '#ff7aa8'][i + 2]; ctx.beginPath(); ctx.arc(cx + i * 11, gY - 12 - Math.abs(i), 6.5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.arc(cx + i * 11 - 2, gY - 14 - Math.abs(i), 2, 0, 6.3); ctx.fill(); } }

function dlgKind(who, hasImg) {
    who = String(who || '');
    if (DLG_GRV.test(who)) return 'grave';
    if (DLG_RIT.test(who)) return 'ritual';
    if (DLG_TECH.test(who) && !hasImg) return 'tech';
    if (hasImg) return 'npc';
    if (DLG_OBJ.test(who)) return 'paper';
    return 'voice';
  }

function gxRecycle(x, y, r, col) {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = r * 0.34; ctx.lineCap = 'round';
    for (var i = 0; i < 3; i++) {
      var a0 = i * 2.0944 - 1.2, a1 = a0 + 1.45; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke();
      var ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r, tx = -Math.sin(a1), ty = Math.cos(a1);
      ctx.beginPath(); ctx.moveTo(ex + tx * r * 0.6, ey + ty * r * 0.6); ctx.lineTo(ex + Math.cos(a1) * r * 0.45, ey + Math.sin(a1) * r * 0.45); ctx.lineTo(ex - Math.cos(a1) * r * 0.45, ey - Math.sin(a1) * r * 0.45); ctx.closePath(); ctx.fill();
    }
  }

function gxBinPad(cx, nv) {
    var i;
    gxPanel(cx - 82, gY - 3, 164, 13, '#a6acb8', { r: 4, lw: 2.2, tex: function (a, b, w, h) { ctx.fillStyle = '#f2c230'; for (var q = 0; q < w; q += 22) { ctx.beginPath(); ctx.moveTo(a + q, b + h); ctx.lineTo(a + q + 8, b + h); ctx.lineTo(a + q + 14, b + h - 4); ctx.lineTo(a + q + 6, b + h - 4); ctx.fill(); } ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(a, b + 5, w, 1.4); } });
    gxShadow(cx, gY + 4, 70, 0.7);
    // ограждение: три доски и столбики
    for (i = 0; i < 3; i++) gxPanel(cx - 70 + i * 48, gY - 92, 44, 86, ['#9a6c3e', '#8a5c32', '#a4764a'][i], { r: 3, lw: 2, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(40,20,0,.25)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(a + w * 0.5, b); ctx.lineTo(a + w * 0.5, b + h); ctx.stroke(); } });
    gxPanel(cx - 78, gY - 100, 156, 10, '#6a4524', { r: 4, lw: 2.2 }); gxPanel(cx - 78, gY - 56, 5, 56, '#6a4524', { lw: 1.6 }); gxPanel(cx + 73, gY - 56, 5, 56, '#6a4524', { lw: 1.6 });
    // знак
    gxTube([[cx - 62, gY - 8], [cx - 62, gY - 118]], 4, '#4a5060'); gxPanel(cx - 82, gY - 148, 40, 34, '#2f9a58', { r: 8, lw: 2.2, vert: true }); gxRecycle(cx - 62, gY - 131, 9, '#ffffff');
    if (nv) gxGlow(cx - 62, gY - 130, 50, '120,255,170', 0.35);
  }

function gxBinArt(cx, empty) {
    var body = empty ? '#6e8f7c' : '#35a560', dk = shadeC(body, -0.28), lt = shadeC(body, 0.24), i;
    // содержимое (виднеется из-под открытой крышки)
    if (!empty) {
      ctx.fillStyle = '#2a2a33'; ctx.beginPath(); ctx.ellipse(cx - 12, gY - 54, 16, 13, -0.3, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - 14, gY - 66); ctx.lineTo(cx - 8, gY - 74); ctx.lineTo(cx - 4, gY - 65); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e8e2cc'; ctx.beginPath(); ctx.ellipse(cx + 12, gY - 56, 15, 8, 0.35, 0, 6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(40,40,60,.5)'; ctx.fillRect(cx + 4, gY - 58, 16, 1.6); ctx.fillRect(cx + 5, gY - 54, 12, 1.6);
      ctx.fillStyle = '#9ad46a'; gxRR(cx + 20, gY - 74, 7, 20, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(cx + 21.5, gY - 72, 1.6, 12);
    }
    // корпус
    ctx.beginPath(); ctx.moveTo(cx - 30, gY - 54); ctx.lineTo(cx + 30, gY - 54); ctx.lineTo(cx + 25, gY - 8); ctx.quadraticCurveTo(cx + 24, gY - 4, cx + 19, gY - 4); ctx.lineTo(cx - 19, gY - 4); ctx.quadraticCurveTo(cx - 24, gY - 4, cx - 25, gY - 8); ctx.closePath();
    ctx.fillStyle = gxLG(cx - 30, 0, cx + 30, 0, lt, body, dk); ctx.fill(); gxInk(2.8); ctx.stroke();
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (i = 0; i < 3; i++) ctx.fillRect(cx - 20 + i * 19, gY - 52, 3.4, 46); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(cx - 28, gY - 54, 5, 50); ctx.restore();
    gxRecycle(cx, gY - 30, 9.5, 'rgba(255,255,255,.92)');
    ctx.fillStyle = '#2a2a33'; [-17, 17].forEach(function (dx) { ctx.beginPath(); ctx.arc(cx + dx, gY - 2, 5, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#b9bfcc'; ctx.beginPath(); ctx.arc(cx + dx, gY - 2, 1.8, 0, 6.3); ctx.fill(); ctx.fillStyle = '#2a2a33'; });
    // крышка
    if (empty) { gxPanel(cx - 35, gY - 64, 70, 11, dk, { r: 4, lw: 2.4 }); gxPanel(cx - 9, gY - 70, 18, 6, '#202028', { r: 3, lw: 1.8 }); }
    else { ctx.save(); ctx.translate(cx - 33, gY - 56); ctx.rotate(-1.15); gxPanel(0, -11, 72, 11, dk, { r: 4, lw: 2.4 }); gxPanel(26, -17, 18, 6, '#202028', { r: 3, lw: 1.8 }); ctx.restore(); }
  }

function gxBgWin(cx, nv) {
    var x = cx - 110, y = gY - 330, w = 220, h = 190, i, r;
    gxPanel(x - 10, y - 10, w + 20, h + 20, '#7a4424', { r: 10, lw: 2.8 });
    ctx.save(); gxRR(x, y, w, h, 6); ctx.clip();
    ctx.fillStyle = nv ? gxLG(0, y, 0, y + h, '#0c1634', '#1d2f66', '#35508c') : gxLG(0, y, 0, y + h, '#7fcdf8', '#c6ebff', '#ffe9b8'); ctx.fillRect(x, y, w, h);
    if (nv) {
      ctx.fillStyle = '#fff'; r = rng(cx); for (i = 0; i < 14; i++) { ctx.globalAlpha = 0.4 + r() * 0.5; ctx.beginPath(); ctx.arc(x + r() * w, y + r() * h * 0.5, 1 + r() * 1.3, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1;
      ctx.fillStyle = '#f4f1da'; ctx.beginPath(); ctx.arc(x + w * 0.78, y + 36, 15, 0, 6.3); ctx.fill(); ctx.fillStyle = '#1d2f66'; ctx.beginPath(); ctx.arc(x + w * 0.78 + 7, y + 31, 13, 0, 6.3); ctx.fill();
    } else {
      ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.ellipse(x + 56, y + 46, 26, 9, 0, 0, 6.3); ctx.ellipse(x + 74, y + 40, 18, 9, 0, 0, 6.3); ctx.ellipse(x + 150, y + 62, 22, 8, 0, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1;
    }
    r = rng(cx * 3 + 1);
    for (i = 0; i < 6; i++) {
      var bw = 26 + r() * 20, bh = 50 + r() * 62, bx = x + 6 + i * 36;
      ctx.fillStyle = nv ? ['#16224a', '#1c2a58', '#121c40'][i % 3] : ['#8aa5c8', '#9bb3d2', '#7a97bc'][i % 3]; ctx.fillRect(bx, y + h - bh, bw, bh); gxInk(1.2); ctx.strokeRect(bx, y + h - bh, bw, bh);
      for (var wy = y + h - bh + 7; wy < y + h - 8; wy += 13) for (var wx = bx + 5; wx < bx + bw - 6; wx += 10) { ctx.fillStyle = nv ? (r() < 0.55 ? '#ffd987' : '#202c5c') : 'rgba(255,255,255,.5)'; ctx.fillRect(wx, wy, 5, 7); }
    }
    ctx.fillStyle = nv ? '#0c1226' : '#6a9a5a'; ctx.fillRect(x, y + h - 10, w, 10);
    if (!nv) { ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.beginPath(); ctx.moveTo(x + 10, y + h); ctx.lineTo(x + 84, y); ctx.lineTo(x + 122, y); ctx.lineTo(x + 48, y + h); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = '#9a5a30'; ctx.fillRect(cx - 3, y, 6, h); ctx.fillRect(x, y + h * 0.5 - 3, w, 6); gxInk(1.4); ctx.strokeRect(cx - 3, y, 6, h); ctx.strokeRect(x, y + h * 0.5 - 3, w, 6);
    gxInk(2.4); gxRR(x, y, w, h, 6); ctx.stroke();
    gxPanel(x - 18, y + h + 8, w + 36, 12, '#c98a52', { r: 4, lw: 2.2 });
    gxAwning(x - 16, y - 34, w + 32, 22, '#d62828', '#fff4dc');
  }

function gxBgTable(x) {
    var i, s;
    gxShadow(x, gY + 6, 96, 0.8);
    for (s = -1; s <= 1; s += 2) {
      var sx = x + s * 72;
      gxPanel(sx - 2.5, gY - 34, 5, 34, '#b9c2d0', { lw: 1.4 }); gxPanel(sx - 15, gY - 6, 30, 7, '#8a94a6', { r: 3, lw: 1.6 });
      gxPanel(sx - 20, gY - 52, 40, 20, '#d62828', { r: 9, lw: 2.2, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.34)'; gxRR(sx - 14, gY - 49, 20, 5, 2.5); ctx.fill();
    }
    gxPanel(x - 7, gY - 66, 14, 66, '#b9c2d0', { lw: 1.8 }); gxPanel(x - 30, gY - 8, 60, 9, '#8a94a6', { r: 4, lw: 2 });
    gxPanel(x - 62, gY - 80, 124, 16, '#f4ecdc', { r: 8, lw: 2.6, vert: true, tex: function (a, b, w, h) { ctx.fillStyle = '#d62828'; ctx.fillRect(a, b, w, h * 0.42); } });
    ctx.fillStyle = 'rgba(255,255,255,.55)'; gxRR(x - 52, gY - 78, 40, 4, 2); ctx.fill();
    // поднос: бургер, картошка, стакан
    gxPanel(x - 46, gY - 86, 92, 7, '#ffd23f', { r: 3, lw: 1.8 });
    ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(x - 18, gY - 96, 17, 11, 0, Math.PI, 0); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.fillStyle = '#5a2d14'; gxRR(x - 35, gY - 96, 34, 5, 2); ctx.fill(); ctx.fillStyle = '#58b83a'; ctx.fillRect(x - 36, gY - 91, 36, 3); ctx.fillStyle = '#c4833a'; gxRR(x - 35, gY - 88, 34, 6, 3); ctx.fill(); gxInk(1.4); ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); for (i = 0; i < 4; i++) ctx.fillRect(x - 28 + i * 3, gY - 100, 1.6, 4); ctx.fillStyle = '#fff1c2'; for (i = 0; i < 6; i++) { ctx.fillRect(x + 14 + i * 4.5, gY - 108 - (i % 2) * 3, 4, 22); }
    gxPanel(x + 14, gY - 92, 28, 7, '#d62828', { r: 2, lw: 1.4 });
    gxPanel(x + 34, gY - 108, 14, 22, '#e63a3a', { r: 3, lw: 1.6 }); ctx.fillStyle = '#fff'; ctx.fillRect(x + 34, gY - 100, 14, 6); ctx.fillStyle = '#2a1a14'; ctx.fillRect(x + 40, gY - 118, 2.4, 12);
  }

function gxBgCounter(C) {
    var i, w = 380, L0 = C - w / 2;
    gxShadow(C, gY + 6, 214, 0.8);
    gxPanel(L0, gY - 74, w, 74, '#a8602a', { lw: 2.8, vert: true, tex: function (a, b, ww, hh) {
      ctx.strokeStyle = 'rgba(50,20,4,.3)'; ctx.lineWidth = 1.6; for (var q = 0; q < ww; q += 38) { ctx.strokeRect(a + q + 4, b + 14, 30, hh - 24); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.strokeRect(a + q + 6, b + 16, 26, hh - 28); ctx.strokeStyle = 'rgba(50,20,4,.3)'; }
    } });
    gxPanel(L0 - 10, gY - 86, w + 20, 14, '#ffd23f', { r: 5, lw: 2.6, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.45)'; gxRR(L0, gY - 84, w - 20, 3, 1.5); ctx.fill();
    ctx.strokeStyle = '#d4a54a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(L0 + 8, gY - 14); ctx.lineTo(L0 + w - 8, gY - 14); ctx.stroke(); ctx.strokeStyle = '#fff3c0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(L0 + 8, gY - 16); ctx.lineTo(L0 + w - 8, gY - 16); ctx.stroke();
    gxPanel(C - 78, gY - 60, 156, 26, '#2a1a14', { r: 9, lw: 2.2 }); gxBig('ЗАКАЗ ЗДЕСЬ', C, gY - 46, 15, '#fff3c0', null);
    // витрина с бургерами слева
    gxPanel(C - 172, gY - 140, 76, 52, 'rgba(200,236,255,.5)', { r: 8, lw: 2.4 });
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(C - 166, gY - 92); ctx.lineTo(C - 148, gY - 136); ctx.lineTo(C - 138, gY - 136); ctx.lineTo(C - 156, gY - 92); ctx.fill();
    for (i = 0; i < 2; i++) { var bx = C - 150 + i * 36; ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(bx, gY - 100, 15, 10, 0, Math.PI, 0); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#5a2d14'; gxRR(bx - 15, gY - 100, 30, 5, 2); ctx.fill(); ctx.fillStyle = '#c4833a'; gxRR(bx - 15, gY - 95, 30, 7, 3); ctx.fill(); }
    // касса справа
    gxPanel(C + 100, gY - 118, 66, 34, '#c4281f', { r: 6, lw: 2.4 }); gxPanel(C + 108, gY - 128, 34, 18, '#8fe0c8', { r: 3, lw: 1.8 }); gxBig('$', C + 125, gY - 118, 12, '#0c5a46', null);
    for (i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#ffd23f' : '#fff3c0'; ctx.fillRect(C + 108 + i * 8.5, gY - 96, 6.4, 7); }
    gxPanel(C + 82, gY - 92, 14, 7, '#e8eef6', { r: 3, lw: 1.4 });
  }

function gxBgMenu(C) {
    var i, items = [['Бургер', BG_FAT], ['Двойной бургер', BG_DBL], ['Мега-бургер', BG_MEGA]], x = C - 270, y = gY - 342;
    gxPanel(x - 8, y - 8, 556, 166, '#e0a52a', { r: 16, lw: 2.8, vert: true });
    gxPanel(x, y, 540, 150, '#241812', { r: 11, lw: 2.4, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 1; for (var q = 0; q < h; q += 6) { ctx.beginPath(); ctx.moveTo(a, b + q); ctx.lineTo(a + w, b + q); ctx.stroke(); } } });
    ctx.shadowColor = '#ffd23f'; ctx.shadowBlur = 8; gxBig('М Е Н Ю', C, y + 26, 24, '#ffd23f', null); ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,210,63,.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(C - 200, y + 44); ctx.lineTo(C + 200, y + 44); ctx.stroke();
    for (i = 0; i < 3; i++) {
      var ry = y + 70 + i * 30, sc = 0.7 + i * 0.16;
      ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(x + 40, ry + 3, 14 * sc, 9 * sc, 0, Math.PI, 0); ctx.fill(); gxInk(1.4); ctx.stroke(); ctx.fillStyle = '#5a2d14'; ctx.fillRect(x + 40 - 14 * sc, ry + 3, 28 * sc, 4); ctx.fillStyle = '#c4833a'; gxRR(x + 40 - 14 * sc, ry + 7, 28 * sc, 5, 2.5); ctx.fill();
      ctx.font = '600 19px "Rubik", system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = '#fff3c0'; ctx.fillText(items[i][0], x + 76, ry + 4);
      ctx.strokeStyle = 'rgba(255,243,192,.28)'; ctx.setLineDash([2, 5]); ctx.beginPath(); ctx.moveTo(x + 76 + ctx.measureText(items[i][0]).width + 10, ry + 8); ctx.lineTo(x + 408, ry + 8); ctx.stroke(); ctx.setLineDash([]);
      ctx.textAlign = 'right'; ctx.fillStyle = '#ffd23f'; ctx.fillText(fmtN(items[i][1]), x + 508, ry + 4);
    }
  }

function gxBgJuke(x) {
    gxShadow(x, gY + 4, 54, 0.8);
    gxPanel(x - 38, gY - 128, 76, 128, '#7a2a8a', { r: 12, lw: 2.8, vert: true });
    ctx.fillStyle = '#4a1456'; ctx.beginPath(); ctx.arc(x, gY - 108, 28, Math.PI, 0); ctx.lineTo(x + 28, gY - 128); ctx.lineTo(x - 28, gY - 128); ctx.fill();
    ctx.fillStyle = gxLG(0, gY - 136, 0, gY - 76, '#ffe9a8', '#ff9ad0', '#6a3aff'); ctx.beginPath(); ctx.arc(x, gY - 100, 28, Math.PI, 0); ctx.lineTo(x + 28, gY - 76); ctx.lineTo(x - 28, gY - 76); ctx.closePath(); ctx.fill(); gxInk(2); ctx.stroke();
    ctx.fillStyle = '#18101e'; ctx.beginPath(); ctx.arc(x, gY - 94, 15, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, gY - 94, 4, 0, 6.3); ctx.fill();
    gxPanel(x - 24, gY - 64, 48, 20, '#d9a63a', { r: 5, lw: 1.8 }); for (var i = 0; i < 4; i++) { ctx.fillStyle = '#6a1a2a'; ctx.beginPath(); ctx.arc(x - 15 + i * 10, gY - 54, 3.2, 0, 6.3); ctx.fill(); }
    gxPanel(x - 30, gY - 30, 60, 20, '#3a0e44', { r: 4, lw: 1.8 });
  }

function gxBgDrink(x) {
    gxShadow(x, gY + 4, 56, 0.8);
    gxPanel(x - 40, gY - 160, 80, 160, '#d62828', { r: 8, lw: 2.8, vert: true });
    gxPanel(x - 30, gY - 148, 60, 74, '#241812', { r: 5, lw: 2 });
    for (var i = 0; i < 3; i++) { var cc = ['#ff6a3c', '#7dd0ff', '#7dff9a'][i]; ctx.fillStyle = cc; gxRR(x - 25 + i * 18, gY - 140, 14, 22, 3); ctx.fill(); gxInk(1.2); ctx.stroke(); ctx.fillStyle = cc; gxRR(x - 25 + i * 18, gY - 112, 14, 22, 3); ctx.fill(); ctx.stroke(); }
    gxPanel(x - 24, gY - 66, 48, 12, '#fff3c0', { r: 4, lw: 1.6 }); gxPanel(x - 22, gY - 42, 44, 34, '#120c0a', { r: 5, lw: 2 }); gxBig('COLA', x, gY - 164, 12, '#fff3c0', null);
  }

function gxBgNeon(x, nv) {
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#ff6a3c'; ctx.shadowBlur = nv ? 16 : 6;
    ctx.strokeStyle = '#ff8a3c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, gY - 258, 52, 30, 0, Math.PI, 0); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(x - 50, gY - 252); ctx.lineTo(x + 50, gY - 252); ctx.stroke();
    ctx.strokeStyle = '#7dff9a'; ctx.beginPath(); ctx.moveTo(x - 52, gY - 242); for (var i = 0; i <= 8; i++) ctx.lineTo(x - 52 + i * 13, gY - 242 + (i % 2 ? 6 : 0)); ctx.stroke();
    ctx.strokeStyle = '#ff8a3c'; ctx.beginPath(); ctx.moveTo(x - 52, gY - 228); ctx.quadraticCurveTo(x, gY - 214, x + 52, gY - 228); ctx.stroke();
    ctx.restore();
  }

function gxBgStand(x) {   // картонный стенд-мальчик-бургер
    gxShadow(x, gY + 4, 56, 0.7);
    ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x - 30, gY - 28, 7, 28); ctx.fillRect(x + 23, gY - 28, 7, 28);
    ctx.fillStyle = '#d98a2b'; ctx.beginPath(); ctx.ellipse(x, gY - 176, 52, 36, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); gxInk(2.6); ctx.stroke();
    ctx.fillStyle = '#fff1c2'; for (var i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(x - 34 + i * 11, gY - 196 + Math.sin(i * 2) * 5, 3.4, 1.8, 0.4, 0, 6.3); ctx.fill(); }
    gxPanel(x - 54, gY - 176, 108, 12, '#58b83a', { r: 6, lw: 2.2 }); gxPanel(x - 52, gY - 164, 104, 20, '#5a2d14', { r: 5, lw: 2.2 }); gxPanel(x - 54, gY - 144, 108, 22, '#d98a2b', { r: 9, lw: 2.6 });
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 16, gY - 172, 8, 0, 6.3); ctx.arc(x + 16, gY - 172, 8, 0, 6.3); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 14, gY - 171, 3.4, 0, 6.3); ctx.arc(x + 18, gY - 171, 3.4, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#7a2a14'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, gY - 160, 14, 0.2, 2.9); ctx.stroke();
    gxPanel(x - 42, gY - 120, 84, 70, '#d62828', { r: 6, lw: 2.4, vert: true }); gxBig('ХОЧУ', x, gY - 98, 17, '#fff3c0', null); gxBig('БУРГЕР', x, gY - 76, 15, '#ffd23f', null);
    gxPanel(x - 38, gY - 36, 26, 8, '#f4ecdc', { r: 3, lw: 1.4 });
  }

function gxBgClock(x) {
    gxPanel(x - 30, gY - 272, 60, 60, '#d62828', { r: 30, lw: 2.6 }); ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(x, gY - 242, 24, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.strokeStyle = '#2a1a14'; ctx.lineWidth = 2; for (var i = 0; i < 12; i++) { var a = i * 0.5236; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 19, gY - 242 + Math.sin(a) * 19); ctx.lineTo(x + Math.cos(a) * 22, gY - 242 + Math.sin(a) * 22); ctx.stroke(); }
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gY - 242); ctx.lineTo(x + 2, gY - 258); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gY - 242); ctx.lineTo(x + 14, gY - 238); ctx.stroke();
  }

function gxBgPendant(x) {
    ctx.strokeStyle = '#4a3016'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gY - 392); ctx.lineTo(x, gY - 296); ctx.stroke();
    ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(x - 34, gY - 262); ctx.quadraticCurveTo(x - 30, gY - 300, x, gY - 304); ctx.quadraticCurveTo(x + 30, gY - 300, x + 34, gY - 262); ctx.closePath(); ctx.fill(); gxInk(2.2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(x - 10, gY - 286, 9, 5, -0.5, 0, 6.3); ctx.fill(); ctx.fillStyle = '#fff6c0'; ctx.beginPath(); ctx.ellipse(x, gY - 262, 34, 6, 0, 0, 6.3); ctx.fill();
  }

function gxBgHall(xa, xb, nv) {
    var up = gxUp(), dn = gxDown(), a = xa, b = Math.min(xb, 3000), i, q;
    if (b <= a) return;
    ctx.fillStyle = gxLG(0, gY - up, 0, gY - 114, '#ffe6b0', '#ffd488'); ctx.fillRect(a, gY - up - 4, b - a, up - 110);
    ctx.fillStyle = 'rgba(255,255,255,.3)'; for (i = Math.floor(a / 56) * 56; i < b + 56; i += 56) for (q = gY - 380; q < gY - 124; q += 52) { ctx.beginPath(); ctx.arc(i + 28 + (((q + 380) / 52 | 0) % 2) * 28, q, 2.8, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = gxLG(0, gY - 410, 0, gY - 372, '#e0382e', '#a81f18'); ctx.fillRect(a, gY - 410, b - a, 40); ctx.fillStyle = '#fff4dc'; ctx.fillRect(a, gY - 380, b - a, 6); gxInk(2); ctx.beginPath(); ctx.moveTo(a, gY - 372); ctx.lineTo(b, gY - 372); ctx.stroke();
    if (up > 410) { ctx.fillStyle = '#5a2a18'; ctx.fillRect(a, gY - up - 4, b - a, up - 406); }
    ctx.fillStyle = 'rgba(255,255,255,.85)'; for (i = Math.floor(a / 200) * 200 + 100; i < b + 200; i += 200) { gxPanel(i - 44, gY - 404, 88, 12, '#fffbe8', { r: 6, lw: 1.6 }); }
    // красно-белая плитка у стены
    for (q = Math.floor(a / 56) * 56; q < b + 56; q += 56) { var odd = (q / 56) % 2; ctx.fillStyle = gxLG(0, gY - 110, 0, gY, odd ? '#e63a32' : '#ffffff', odd ? '#c4281f' : '#ece2cc'); ctx.fillRect(q, gY - 110, 56, 110); ctx.fillStyle = 'rgba(255,255,255,.34)'; ctx.fillRect(q + 4, gY - 106, 20, 3); }
    ctx.strokeStyle = 'rgba(80,20,10,.36)'; ctx.lineWidth = 1.6; for (q = Math.floor(a / 56) * 56; q < b + 56; q += 56) { ctx.beginPath(); ctx.moveTo(q, gY - 110); ctx.lineTo(q, gY); ctx.stroke(); } for (q = 1; q < 3; q++) { ctx.beginPath(); ctx.moveTo(a, gY - 110 + q * 36); ctx.lineTo(b, gY - 110 + q * 36); ctx.stroke(); }
    gxPanel(a - 4, gY - 120, b - a + 8, 14, '#9a2a14', { r: 3, lw: 2.2 }); ctx.fillStyle = '#e0a52a'; ctx.fillRect(a, gY - 117, b - a, 3);
    // пол-шахматка в два ряда глубины
    for (q = Math.floor(a / 70) * 70; q < b + 70; q += 70) {
      var k = (q / 70) | 0;
      ctx.fillStyle = gxLG(0, gY - 2, 0, gY + 24, k % 2 ? '#3a2a22' : '#f2e2bc', k % 2 ? '#241812' : '#d9c28e'); ctx.fillRect(q, gY - 2, 70, 26);
      ctx.fillStyle = gxLG(0, gY + 24, 0, gY + 62, k % 2 ? '#e9d6b0' : '#3a2a22', k % 2 ? '#c8b080' : '#1c120e'); ctx.fillRect(q + 12, gY + 24, 70, 38);
    }
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(a, gY + 24); ctx.lineTo(b, gY + 24); ctx.stroke();
    ctx.fillStyle = gxLG(0, gY + 62, 0, gY + dn, '#2a1a14', '#120a08'); ctx.fillRect(a, gY + 62, b - a, dn);
    gxInk(2.4); ctx.beginPath(); ctx.moveTo(a, gY - 1); ctx.lineTo(b, gY - 1); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.14)'; for (i = Math.floor(a / 340) * 340 + 60; i < b; i += 340) { ctx.beginPath(); ctx.moveTo(i, gY + 2); ctx.lineTo(i + 120, gY + 2); ctx.lineTo(i + 80, gY + 22); ctx.lineTo(i - 40, gY + 22); ctx.fill(); }
  }

function gxBgCorr(xa, xb, nv) {
    var up = gxUp(), dn = gxDown(), a = Math.max(xa, 3000), b = xb, i, q;
    if (b <= a) return;
    ctx.fillStyle = gxLG(0, gY - up, 0, gY - 114, '#26343a', '#3a4c52'); ctx.fillRect(a, gY - up - 4, b - a, up - 108);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (q = Math.floor(a / 90) * 90; q < b + 90; q += 90) ctx.fillRect(q, gY - 372, 5, 262);
    ctx.strokeStyle = 'rgba(160,200,196,.18)'; ctx.lineWidth = 1.6; for (q = Math.floor(a / 90) * 90; q < b + 90; q += 90) { ctx.beginPath(); ctx.moveTo(q + 45, gY - 372); ctx.lineTo(q + 45, gY - 114); ctx.stroke(); }
    ctx.fillStyle = gxLG(0, gY - 392, 0, gY - 360, '#1a2226', '#10171a'); ctx.fillRect(a, gY - 392, b - a, 32);
    ctx.strokeStyle = '#5a6e72'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(a, gY - 346); ctx.lineTo(b, gY - 346); ctx.stroke(); ctx.strokeStyle = '#8aa0a4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a, gY - 349); ctx.lineTo(b, gY - 349); ctx.stroke();
    ctx.strokeStyle = '#4a5c60'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(a, gY - 372); ctx.lineTo(b, gY - 372); ctx.stroke();
    for (q = Math.floor(a / 180) * 180; q < b + 180; q += 180) { gxPanel(q - 6, gY - 380, 12, 16, '#2a363a', { lw: 1.6 }); }
    // стена низ: серая плитка, жёлто-чёрная полоса
    ctx.fillStyle = gxLG(0, gY - 114, 0, gY, '#18222a', '#0e1418'); ctx.fillRect(a, gY - 114, b - a, 114);
    ctx.strokeStyle = 'rgba(160,200,196,.12)'; ctx.lineWidth = 1.4; for (q = Math.floor(a / 56) * 56; q < b; q += 56) { ctx.beginPath(); ctx.moveTo(q, gY - 114); ctx.lineTo(q, gY); ctx.stroke(); }
    ctx.fillStyle = '#e0a52a'; ctx.fillRect(a, gY - 118, b - a, 8); ctx.fillStyle = '#1a1a1a'; for (q = Math.floor(a / 28) * 28; q < b; q += 56) { ctx.beginPath(); ctx.moveTo(q, gY - 110); ctx.lineTo(q + 14, gY - 118); ctx.lineTo(q + 28, gY - 118); ctx.lineTo(q + 14, gY - 110); ctx.fill(); }
    gxInk(1.6); ctx.beginPath(); ctx.moveTo(a, gY - 118); ctx.lineTo(b, gY - 118); ctx.stroke();
    // пол: бетон
    ctx.fillStyle = gxLG(0, gY - 2, 0, gY + 40, '#59666a', '#364246'); ctx.fillRect(a, gY - 2, b - a, 42); ctx.fillStyle = gxLG(0, gY + 40, 0, gY + dn, '#252e32', '#0e1316'); ctx.fillRect(a, gY + 40, b - a, dn);
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.4; for (q = Math.floor(a / 120) * 120; q < b + 120; q += 120) { ctx.beginPath(); ctx.moveTo(q, gY - 2); ctx.lineTo(q - 20, gY + 40); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(a, gY - 2, b - a, 3); gxInk(2.4); ctx.beginPath(); ctx.moveTo(a, gY - 1); ctx.lineTo(b, gY - 1); ctx.stroke();
    ctx.fillStyle = '#d6ad2a'; ctx.globalAlpha = 0.5; for (q = Math.floor(a / 70) * 70; q < b; q += 140) { ctx.fillRect(q, gY + 18, 70, 5); } ctx.globalAlpha = 1;
    // служебные предметы, каждому своё место
    var nx = GXBG.notice; if (nx > xa - 80 && nx < xb + 80) {
      gxPanel(nx - 40, gY - 276, 80, 100, '#7a5a34', { r: 5, lw: 2.4 }); ctx.fillStyle = '#d9c9a0'; ctx.fillRect(nx - 34, gY - 270, 68, 88);
      var nc = ['#fff8e6', '#ffe3a0', '#c4e8ff', '#ffd0d0']; for (i = 0; i < 4; i++) { ctx.save(); ctx.translate(nx - 18 + (i % 2) * 36, gY - 246 + Math.floor(i / 2) * 44); ctx.rotate((i - 1.5) * 0.06); ctx.fillStyle = nc[i]; ctx.fillRect(-14, -17, 28, 34); gxInk(1.2); ctx.strokeRect(-14, -17, 28, 34); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (var ln = 0; ln < 4; ln++) ctx.fillRect(-10, -11 + ln * 7, 20 - (ln % 2) * 6, 2); ctx.fillStyle = '#e63a32'; ctx.beginPath(); ctx.arc(0, -17, 2.6, 0, 6.3); ctx.fill(); ctx.restore(); }
    }
    var cx = GXBG.cctv; if (cx > xa - 100 && cx < xb + 100) {
      gxPanel(cx - 80, gY - 270, 160, 130, '#10171a', { r: 8, lw: 2.8 });
      for (i = 0; i < 4; i++) { var mx = cx - 72 + (i % 2) * 74, my = gY - 262 + Math.floor(i / 2) * 60; ctx.fillStyle = gxLG(0, my, 0, my + 52, '#0f2a1c', '#1b4a30'); gxRR(mx, my, 66, 52, 4); ctx.fill(); gxInk(1.6); ctx.stroke(); ctx.strokeStyle = 'rgba(120,255,180,.28)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(mx + 6, my + 40); ctx.lineTo(mx + 26, my + 22); ctx.lineTo(mx + 40, my + 34); ctx.lineTo(mx + 58, my + 14); ctx.stroke(); }
      gxText('CAM', cx, gY - 152, 11, '#7dffb0', null);
    }
    var ex = GXBG.ext; if (ex > xa - 40 && ex < xb + 40) { gxShadow(ex, gY + 3, 26, 0.7); gxPanel(ex - 18, gY - 220, 36, 90, '#f2f4f8', { r: 5, lw: 2.2 }); gxPanel(ex - 14, gY - 206, 28, 58, '#d62828', { r: 8, lw: 1.8 }); gxPanel(ex - 4, gY - 196, 8, 24, '#e8eef6', { r: 3, lw: 1.2 }); gxText('FIRE', ex, gY - 232, 10, '#ffd0d0', 'rgba(60,10,10,.9)'); }
    var cr = GXBG.crate; if (cr > xa - 80 && cr < xb + 80) {
      gxCrate(cr - 20, 1.25, '#b07a42'); gxCrate(cr + 24, 1.0, '#c48a4a'); gxCrate(cr + 2, 0.9, '#a06a36');
      gxPanel(cr + 40, gY - 50, 26, 46, '#2a6aa8', { r: 6, lw: 2 }); ctx.fillStyle = '#e8eef6'; ctx.fillRect(cr + 38, gY - 56, 30, 8); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cr + 53, gY - 56); ctx.lineTo(cr + 53, gY - 110); ctx.stroke(); ctx.fillStyle = '#d9c28e'; ctx.beginPath(); ctx.ellipse(cr + 53, gY - 110, 12, 6, 0, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    }
    var wx2 = GXBG.warn; if (wx2 > xa - 40 && wx2 < xb + 40) { ctx.fillStyle = '#e0a52a'; ctx.beginPath(); ctx.moveTo(wx2, gY - 218); ctx.lineTo(wx2 + 24, gY - 176); ctx.lineTo(wx2 - 24, gY - 176); ctx.closePath(); ctx.fill(); gxInk(2.4); ctx.stroke(); gxBig('!', wx2, gY - 190, 20, '#1a1a1a', null); }
    var ax = GXBG.arch; if (ax > xa - 80 && ax < xb + 80) {
      gxPanel(ax - 52, gY - 250, 104, 250, '#0e1418', { r: 4, lw: 2.8 }); ctx.fillStyle = gxLG(0, gY - 240, 0, gY, '#24383c', '#10181c'); ctx.fillRect(ax - 42, gY - 240, 84, 240);
      gxPanel(ax - 62, gY - 266, 124, 22, '#e0a52a', { r: 5, lw: 2.4 });
    }
  }

function gxBgOffDoor(x) {
    gxShadow(x, gY + 4, 76, 0.8);
    gxPanel(x - 72, gY - 244, 144, 244, '#10171a', { r: 6, lw: 2.8 });
    gxPanel(x - 60, gY - 232, 120, 232, '#2a3a4c', { r: 4, lw: 2.4, vert: true, tex: function (a, b, w, h) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1.6; ctx.strokeRect(a + 10, b + 16, w - 20, h * 0.36); ctx.strokeRect(a + 10, b + h * 0.5, w - 20, h * 0.42); } });
    ctx.fillStyle = gxLG(0, gY - 190, 0, gY - 130, '#cfeaff', '#7ab4e0'); gxRR(x - 26, gY - 196, 52, 62, 6); ctx.fill(); gxInk(2); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 24, gY - 170, 48, 3);
    ctx.fillStyle = '#d6ad2a'; ctx.beginPath(); ctx.arc(x + 42, gY - 110, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke();
    gxPanel(x - 52, gY - 280, 104, 30, '#1a2230', { r: 8, lw: 2.4 }); gxText('ОХРАНА', x, gY - 265, 17, '#ffd23f', null);
    gxPanel(x - 14, gY - 72, 28, 20, '#e0a52a', { r: 3, lw: 1.6 }); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(x - 10, gY - 66, 20, 3);
  }

function gxBgLamp(x, on) {
    gxPanel(x - 56, gY - 366, 112, 14, '#2a363a', { r: 4, lw: 2 }); ctx.fillStyle = on ? '#e8fff4' : '#6a7e76'; gxRR(x - 50, gY - 362, 100, 8, 3); ctx.fill();
  }

function gxScr(key, w, h, fn) {
    var r = Math.min(dpr, 1.5), kk = key + '|' + Math.round(w) + '|' + Math.round(h) + '|' + r + '|' + gxFV, c = gxScrC[kk], k;
    if (!c) {
      for (k in gxScrC) if (k.indexOf(key + '|') === 0) delete gxScrC[k];
      c = gxCan(w * r, h * r); var g = c.getContext('2d'), oc = ctx, og = gY; ctx = g; g.setTransform(r, 0, 0, r, 0, 0);
      try { fn(w, h); } catch (e) { ctx = oc; gY = og; gxErr = e; throw e; }
      ctx = oc; gY = og; gxScrC[kk] = c;
    }
    return c;
  }

function gxHaz(x, y, w, h) {   // жёлто-чёрная полоса
    ctx.save(); gxRR(x, y, w, h, Math.min(3, h / 2)); ctx.clip(); ctx.fillStyle = '#e8b52a'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#1a1a1a';
    for (var q = -h; q < w + h; q += h * 1.8) { ctx.beginPath(); ctx.moveTo(x + q, y + h); ctx.lineTo(x + q + h * 0.9, y + h); ctx.lineTo(x + q + h * 1.8, y); ctx.lineTo(x + q + h * 0.9, y); ctx.fill(); }
    ctx.restore(); gxInk(1.6); gxRR(x, y, w, h, Math.min(3, h / 2)); ctx.stroke();
  }

function gxHnGeo(w, h) {
    var cx = w / 2, ww = Math.min(w * 0.22, 270), wx0 = w * 0.04, wx1 = w - wx0 - ww, sbw = Math.min(w * 0.2, 220), sbh = h * 0.3, sby = h * 0.2;
    var gL0 = wx0 + ww + 16, gL1 = cx - sbw / 2 - 12, gR0 = cx + sbw / 2 + 12, gR1 = wx1 - 16, gapR = gR1 - gR0;
    var vgw = Math.max(30, Math.min(90, w * 0.085, gapR - 22)), cr = Math.max(8, Math.min(h * 0.04, 20, (gL1 - gL0) / 2 - 8));
    return { cx: cx, dy: h * 0.74, ww: ww, wh: h * 0.5, wy: h * 0.13, wxs: [wx0, wx1], sbw: sbw, sbh: sbh, sby: sby, clx: (gL0 + gL1) / 2, cly: h * 0.2, cr: cr,
      vgx: gR0 + (gapR - vgw) / 2, vgy: h * 0.43, vgw: vgw, pox: gR0 + gapR / 2, pw: Math.max(24, Math.min(w * 0.07, gapR - 16)), mw2: Math.min(w * 0.11, 110), mx2: cx + w * 0.085, fx: cx - w * 0.2 };
  }

function gxHnBg(w, h) {
    var G = gxHnGeo(w, h), cx = G.cx, dy = G.dy, i, q;
    ctx.fillStyle = gxLG(0, 0, 0, dy, '#40283a', '#24161e'); ctx.fillRect(0, 0, w, h);
    for (i = 0; i < 18; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.09)'; ctx.fillRect(w * i / 18, 0, w / 18, dy); }
    ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 2; for (i = 1; i < 18; i++) { ctx.beginPath(); ctx.moveTo(w * i / 18, h * 0.08); ctx.lineTo(w * i / 18, h * 0.58); ctx.stroke(); }
    // потолок с балкой и трубами
    ctx.fillStyle = gxLG(0, 0, 0, h * 0.09, '#120810', '#2a1822'); ctx.fillRect(0, 0, w, h * 0.09); gxInk(2.4); ctx.beginPath(); ctx.moveTo(0, h * 0.09); ctx.lineTo(w, h * 0.09); ctx.stroke();
    for (q = 0; q < 2; q++) { var py = h * (0.03 + q * 0.028); ctx.strokeStyle = '#4a5a62'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke(); ctx.strokeStyle = '#8aa0a8'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(0, py - 2.6); ctx.lineTo(w, py - 2.6); ctx.stroke(); for (i = 0; i < w; i += 170) { gxPanel(i + 40, py - 8, 14, 16, '#2a363a', { lw: 1.4 }); } }
    // низ стены: плитка и красная кромка
    ctx.fillStyle = gxLG(0, h * 0.58, 0, dy, '#35545a', '#1d2f34'); ctx.fillRect(0, h * 0.58, w, dy - h * 0.58);
    ctx.strokeStyle = 'rgba(0,0,0,.34)'; ctx.lineWidth = 1.6; for (i = 0; i < w; i += 44) { ctx.beginPath(); ctx.moveTo(i, h * 0.58); ctx.lineTo(i, dy); ctx.stroke(); } for (q = h * 0.58; q < dy; q += 30) { ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(w, q); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.12)'; for (i = 0; i < w; i += 44) ctx.fillRect(i + 3, h * 0.58 + 3, 14, 3);
    gxPanel(0, h * 0.575, w, 11, '#8a3a2a', { lw: 2.2 }); ctx.fillStyle = '#e8b52a'; ctx.fillRect(0, h * 0.575 + 4, w, 2);
    // рамы дверных окон: бетон с болтами и жёлтой полосой
    for (var s = 0; s < 2; s++) {
      var wx = G.wxs[s], wy = G.wy, ww = G.ww, wh = G.wh;
      gxPanel(wx - 16, wy - 16, ww + 32, wh + 32, '#56525e', { r: 6, lw: 3, vert: true, tex: function (a, b, ww2, hh2) { ctx.fillStyle = 'rgba(255,255,255,.06)'; for (var z = 0; z < 20; z++) { ctx.beginPath(); ctx.arc(a + ((z * 53) % ww2), b + ((z * 37) % hh2), 2 + (z % 3), 0, 6.3); ctx.fill(); } } });
      gxHaz(wx - 16, wy - 28, ww + 32, 12);
      ctx.fillStyle = '#2a2830'; for (i = 0; i < 4; i++) { var bx = i % 2 ? wx + ww + 8 : wx - 8, by = i < 2 ? wy - 4 : wy + wh + 4; ctx.beginPath(); ctx.arc(bx, by, 3.4, 0, 6.3); ctx.fill(); gxInk(1.2); ctx.stroke(); }
      gxPanel(wx + ww / 2 - 52, wy + wh + 22, 104, 22, '#1a1520', { r: 8, lw: 2 }); gxText(s === 0 ? 'ЛЕВАЯ ДВЕРЬ' : 'ПРАВАЯ ДВЕРЬ', wx + ww / 2, wy + wh + 33, 12, '#e8d6c0', null);
    }
    // щит камер
    var sbx = cx - G.sbw / 2, sby = G.sby, sbw = G.sbw, sbh = G.sbh;
    gxPanel(sbx - 12, sby - 12, sbw + 24, sbh + 24, '#2a3238', { r: 10, lw: 3, vert: true }); ctx.fillStyle = '#0a1812'; gxRR(sbx - 2, sby - 2, sbw + 4, sbh + 4, 6); ctx.fill();
    gxPanel(sbx + sbw / 2 - 24, sby - 26, 48, 12, '#d62828', { r: 5, lw: 1.8 }); gxText('REC', sbx + sbw / 2, sby - 20, 9, '#ffe0e0', null);
    // плакат «ОХРАНА»
    var pw = G.pw, px = G.pox - pw / 2, py2 = h * 0.14, ph = h * 0.12;
    gxPanel(px, py2, pw, ph, '#8a2a20', { r: 3, lw: 2.2, vert: true }); ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(px + pw / 2, py2 + ph * 0.18); ctx.lineTo(px + pw * 0.82, py2 + ph * 0.34); ctx.lineTo(px + pw * 0.74, py2 + ph * 0.66); ctx.quadraticCurveTo(px + pw / 2, py2 + ph * 0.86, px + pw * 0.26, py2 + ph * 0.66); ctx.lineTo(px + pw * 0.18, py2 + ph * 0.34); ctx.closePath(); ctx.fill(); gxInk(1.6); ctx.stroke(); gxText('ОХРАНА', px + pw / 2, py2 + ph - 8, Math.max(9, pw * 0.2), '#ffe9c8', null);
    // часы: корпус
    var ccx = G.clx, ccy = G.cly, cr = G.cr;
    gxPanel(ccx - cr - 6, ccy - cr - 6, cr * 2 + 12, cr * 2 + 12, '#d62828', { r: cr + 6, lw: 2.6 }); ctx.fillStyle = '#f4efe0'; ctx.beginPath(); ctx.arc(ccx, ccy, cr, 0, 6.3); ctx.fill(); gxInk(1.8); ctx.stroke();
    ctx.strokeStyle = '#2a1a14'; ctx.lineWidth = 2; for (i = 0; i < 12; i++) { var ca = i * 0.5236; ctx.beginPath(); ctx.moveTo(ccx + Math.cos(ca) * cr * 0.82, ccy + Math.sin(ca) * cr * 0.82); ctx.lineTo(ccx + Math.cos(ca) * cr * 0.94, ccy + Math.sin(ca) * cr * 0.94); ctx.stroke(); }
    // стол: дерево, лампа, провода, блокнот
    ctx.fillStyle = gxLG(0, dy, 0, h, '#6a3e26', '#2e1a10'); ctx.fillRect(0, dy, w, h - dy);
    ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1.6; for (q = dy + 18; q < h; q += 22) { ctx.beginPath(); ctx.moveTo(0, q); for (i = 0; i < w; i += 60) ctx.quadraticCurveTo(i + 30, q + 3, i + 60, q); ctx.stroke(); }
    gxPanel(0, dy - 4, w, 14, '#8a5a38', { lw: 2.6, vert: true }); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(0, dy - 3, w, 2.5); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(0, dy + 10, w, 6);
    gxPanel(w * 0.12, dy + 18, w * 0.1, h * 0.05, '#f4ecd0', { r: 3, lw: 1.8 }); ctx.fillStyle = 'rgba(0,0,0,.4)'; for (i = 0; i < 4; i++) ctx.fillRect(w * 0.125, dy + 24 + i * 7, w * 0.07, 1.6);
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.mx2 + G.mw2 * 0.5, dy + 6); ctx.quadraticCurveTo(G.mx2 + G.mw2 * 0.5 + 40, dy + 50, w * 0.9, dy + 40); ctx.stroke();
    // рамка монитора (корпус)
    var mh2 = G.mw2 * 0.62, my2 = dy - mh2 + 4;
    gxPanel(G.mx2 - 8, my2 - 8, G.mw2 + 16, mh2 + 16, '#2a2c34', { r: 7, lw: 2.6 }); gxPanel(G.mx2 + G.mw2 / 2 - 14, dy - 5, 28, 8, '#3a3c46', { r: 3, lw: 1.8 });
    // вентиляционная рамка (со 2 ночи)
    if (hn.night >= 2) { var vgh = G.vgw * 0.62; gxPanel(G.vgx - 9, G.vgy - 9, G.vgw + 18, vgh + 18, '#5a5e68', { r: 4, lw: 2.4, vert: true }); ctx.fillStyle = '#05080a'; ctx.fillRect(G.vgx, G.vgy, G.vgw, vgh); }
    // подставка вентилятора и кружка
    gxPanel(G.fx - 12, dy - 8, 24, 10, '#2a2c34', { r: 3, lw: 1.6 }); gxPanel(G.fx - 3, dy - 28, 6, 22, '#4a4c58', { lw: 1.4 });
    var kx = cx - w * 0.07; gxPanel(kx, dy - 20, 18, 20, '#f2ede0', { r: 4, lw: 2 }); ctx.strokeStyle = '#f2ede0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(kx + 19, dy - 11, 6, -1.2, 1.2); ctx.stroke(); gxInk(1.4); ctx.stroke();
  }

function gxHnWin(side, e, wx, wy, ww, wh, lit, dr) {
    ctx.save(); gxRR(wx, wy, ww, wh, 4); ctx.clip();
    var vx = wx + ww / 2, vy = wy + wh * 0.46;
    ctx.fillStyle = lit ? gxLG(0, wy, 0, wy + wh, '#6b88a8', '#2f4258') : gxLG(0, wy, 0, wy + wh, '#04060a', '#090c14'); ctx.fillRect(wx, wy, ww, wh);
    // коридор в перспективе
    var fw = ww * 0.2, fh = wh * 0.16, i;
    ctx.fillStyle = lit ? '#1c2a3a' : '#05070c'; ctx.fillRect(vx - fw, vy - fh, fw * 2, fh * 2);
    ctx.fillStyle = lit ? '#46607e' : '#080c14'; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(vx - fw, vy - fh); ctx.lineTo(vx - fw, vy + fh); ctx.lineTo(wx, wy + wh); ctx.fill();
    ctx.fillStyle = lit ? '#52708e' : '#0a0e18'; ctx.beginPath(); ctx.moveTo(wx + ww, wy); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(wx + ww, wy + wh); ctx.fill();
    ctx.fillStyle = lit ? '#2f4258' : '#06080e'; ctx.beginPath(); ctx.moveTo(wx, wy + wh); ctx.lineTo(wx + ww, wy + wh); ctx.lineTo(vx + fw, vy + fh); ctx.lineTo(vx - fw, vy + fh); ctx.fill();
    ctx.fillStyle = lit ? '#3a506c' : '#070a12'; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + ww, wy); ctx.lineTo(vx + fw, vy - fh); ctx.lineTo(vx - fw, vy - fh); ctx.fill();
    ctx.strokeStyle = lit ? 'rgba(220,240,255,.26)' : 'rgba(255,255,255,.05)'; ctx.lineWidth = 2;
    for (i = 1; i < 6; i++) { var q = Math.pow(i / 6, 1.5); ctx.beginPath(); ctx.moveTo(hnLerp(vx - fw, wx, q), hnLerp(vy - fh, wy, q)); ctx.lineTo(hnLerp(vx - fw, wx, q), hnLerp(vy + fh, wy + wh, q)); ctx.moveTo(hnLerp(vx + fw, wx + ww, q), hnLerp(vy - fh, wy, q)); ctx.lineTo(hnLerp(vx + fw, wx + ww, q), hnLerp(vy + fh, wy + wh, q)); ctx.stroke(); }
    if (lit) { ctx.fillStyle = 'rgba(255,255,230,.22)'; ctx.fillRect(vx - fw * 0.5, vy - fh * 0.7, fw, fh * 1.7); gxGlow(vx, wy + 6, ww * 0.6, '255,246,200', 0.5); }
    if (lit) { ctx.fillStyle = 'rgba(255,255,230,' + (0.06 + 0.04 * Math.sin(t * 40)).toFixed(3) + ')'; ctx.fillRect(wx, wy, ww, wh); }
    hnWinEnemy(e, wx, wy, ww, wh, lit, dr);
    if (dr > 0.02) {
      var dh = wh * dr; gxPanel(wx, wy - 4, ww, dh + 4, '#586070', { lw: 2.4, vert: true, tex: function (a, b, w2, h2) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1.6; for (var z = 28; z < h2; z += 28) { ctx.beginPath(); ctx.moveTo(a, b + z); ctx.lineTo(a + w2, b + z); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.1)'; for (z = 0; z < h2; z += 28) ctx.fillRect(a, b + z + 2, w2, 3); } });
      gxHaz(wx, wy + dh - 14, ww, 14); ctx.fillStyle = '#2a2c34'; for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(wx + 12 + (ww - 24) * i / 5, wy + 10, 3, 0, 6.3); ctx.fill(); }
    }
    ctx.restore();
    gxInk(2.6); gxRR(wx, wy, ww, wh, 4); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(wx + ww * 0.1, wy + wh); ctx.lineTo(wx + ww * 0.42, wy); ctx.lineTo(wx + ww * 0.54, wy); ctx.lineTo(wx + ww * 0.22, wy + wh); ctx.fill();
    // лампочка-индикатор «свет включён»
    ctx.fillStyle = lit ? '#ffe27a' : '#3a3030'; ctx.beginPath(); ctx.arc(side === 0 ? wx + ww + 3 : wx - 3, wy - 10, 5, 0, 6.3); ctx.fill(); gxInk(1.4); ctx.stroke(); if (lit) gxGlow(side === 0 ? wx + ww + 3 : wx - 3, wy - 10, 22, '255,226,122', 0.8);
  }

function gxCamBase(key, mw, mh, fn) { return gxScr('cam' + key, mw, mh, function (w, h) { fn(w, h, function (f) { return w * f; }, function (f) { return h * f; }); }); }
