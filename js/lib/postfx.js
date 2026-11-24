// Пост-обработка кадра. Градиенты и виньетка кэшируются в отдельные canvas —
// за кадр остаётся только drawImage, а не создание градиентов и заливка экрана.
function createPostFx(env) {
  let grainTileCache = null;
  let tex = null, texKey = '';
  let grainFrame = 0, grainX = 0, grainY = 0;

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

  function textures(W, H) {
    const key = W + 'x' + H;
    if (tex && texKey === key) return tex;
    const glow = document.createElement('canvas'), vig = document.createElement('canvas');
    glow.width = vig.width = W;
    glow.height = vig.height = H;
    if (glow.width && glow.height) {
      let g = glow.getContext('2d');
      const rg = g.createRadialGradient(W / 2, H * 0.42, H * 0.12, W / 2, H * 0.42, H * 0.85);
      rg.addColorStop(0, 'rgba(255,226,160,0.06)');
      rg.addColorStop(1, 'rgba(255,226,160,0)');
      g.fillStyle = rg;
      g.fillRect(0, 0, W, H);

      g = vig.getContext('2d');
      const vg = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.82);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(5,9,22,0.4)');
      g.fillStyle = vg;
      g.fillRect(0, 0, W, H);
    }
    tex = { glow, vig };
    texKey = key;
    return tex;
  }

  function draw() {
    const { ctx, dpr, W, H, t, GX, music, PERF } = env;
    // На слабом устройстве движок уже снизил качество — эффекты не нужны.
    if (PERF && PERF.q < 0.7) return;
    try {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.save();
      const tx = textures(W, H);

      if (music.bloom) {
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(tx.glow, 0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
      }

      if (GX && music.particles !== false) {
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.07;
        for (let pass = 0; pass < 2; pass++) {
          ctx.fillStyle = pass ? '#cfe6ff' : '#ffe6a8';
          for (let d = pass; d < 12; d += 2) {
            const dx = ((d * 173.7 + t * (7 + (d % 5) * 3)) % (W + 80)) - 40;
            const dy = ((d * 97.3 - t * (3 + (d % 3) * 2)) % (H + 80) + H + 80) % (H + 80) - 40;
            ctx.beginPath();
            ctx.arc(dx, dy, 0.8 + (d % 3) * 0.5, 0, 6.3);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      if (music.vignette) ctx.drawImage(tx.vig, 0, 0, W, H);

      if (music.grain) {
        if ((grainFrame++ & 3) === 0) { grainX = (Math.random() * 96) | 0; grainY = (Math.random() * 96) | 0; }
        ctx.globalAlpha = 0.035;
        for (let x = -grainX; x < W; x += 96) for (let y = -grainY; y < H; y += 96) ctx.drawImage(grainTile(), x, y);
        ctx.globalAlpha = 1;
      }

      ctx.restore();
    } catch (e) { /* эффекты не должны ронять игру */ }
  }

  return { draw };
}
