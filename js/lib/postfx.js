// Пост-обработка кадра: мягкий свет, виньетка, зерно и лёгкие пылинки.
// Ядро передаёт «живое» окружение геттерами, чтобы модуль видел текущие W/H/t.
function createPostFx(env) {
  let grainTileCache = null;

  function grainTile() {
    if (grainTileCache) return grainTileCache;
    const cv = document.createElement('canvas');
    cv.width = cv.height = 96;
    const c = cv.getContext('2d');
    const im = c.createImageData(96, 96);
    const d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = 110 + Math.random() * 90;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    c.putImageData(im, 0, 0);
    grainTileCache = cv;
    return cv;
  }

  function draw() {
    const { ctx, dpr, W, H, t, GX, music } = env;
    try {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.save();

      if (music.bloom) {
        ctx.globalCompositeOperation = 'screen';
        const glow = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.12, W / 2, H * 0.42, H * 0.85);
        glow.addColorStop(0, 'rgba(255,226,160,0.06)');
        glow.addColorStop(1, 'rgba(255,226,160,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
      }

      if (GX && music.particles !== false) {
        ctx.globalCompositeOperation = 'screen';
        for (let d = 0; d < 26; d++) {
          const dx = ((d * 173.7 + t * (7 + (d % 5) * 3)) % (W + 80)) - 40;
          const dy = ((d * 97.3 - t * (3 + (d % 3) * 2)) % (H + 80) + H + 80) % (H + 80) - 40;
          ctx.globalAlpha = 0.05 + 0.04 * Math.sin(t * 1.3 + d);
          ctx.fillStyle = d % 4 === 0 ? '#ffe6a8' : '#cfe6ff';
          ctx.beginPath();
          ctx.arc(dx, dy, 0.7 + (d % 3) * 0.5, 0, 6.3);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      if (music.vignette) {
        const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.82);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(5,9,22,0.4)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, W, H);
      }

      if (music.grain) {
        ctx.globalAlpha = 0.035;
        const ox = (Math.random() * 96) | 0, oy = (Math.random() * 96) | 0;
        for (let x = -ox; x < W; x += 96) for (let y = -oy; y < H; y += 96) ctx.drawImage(grainTile(), x, y);
        ctx.globalAlpha = 1;
      }

      ctx.restore();
    } catch (e) { /* эффекты не должны ронять игру */ }
  }

  return { draw };
}
