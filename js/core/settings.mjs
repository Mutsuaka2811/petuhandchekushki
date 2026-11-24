// Настройки графики и вкладки панели. Всё взаимодействие с ядром — через api.
const PRESETS = {
  lite:  { gx: false, hq: false, vignette: false, bloom: false, grain: false, particles: false, shake: false, uiAnim: false, q: 0.7 },
  hd:    { gx: true,  hq: false, vignette: true,  bloom: true,  grain: false, particles: true,  shake: true,  uiAnim: true,  q: 1 },
  ultra: { gx: true,  hq: true,  vignette: true,  bloom: true,  grain: true,  particles: true,  shake: true,  uiAnim: true,  q: 1 }
};
const LABELS = { lite: 'экономия', hd: 'качество', ultra: 'максимум' };

export function createSettings(api) {
  const { music } = api;
  const el = (id) => document.getElementById(id);
  const switches = {
    vignette: el('vignetteSwitch'), bloom: el('bloomSwitch'), grain: el('grainSwitch'),
    particles: el('particlesSwitch'), shake: el('shakeSwitch'), uiAnim: el('uiAnimSwitch')
  };
  const presetBtns = Array.prototype.slice.call(document.querySelectorAll('[data-preset]'));

  function sync() {
    for (const key of Object.keys(switches)) {
      if (switches[key]) switches[key].setAttribute('aria-checked', music[key] ? 'true' : 'false');
    }
    document.body.classList.toggle('no-uianim', !music.uiAnim);
    presetBtns.forEach((b) => {
      b.setAttribute('aria-pressed', b.getAttribute('data-preset') === music.preset ? 'true' : 'false');
    });
  }

  function applyPreset(name) {
    const p = PRESETS[name];
    if (!p) return;
    music.preset = name;
    music.hq = p.hq; music.vignette = p.vignette; music.bloom = p.bloom; music.grain = p.grain;
    music.particles = p.particles; music.shake = p.shake; music.uiAnim = p.uiAnim;
    api.setGraphicsMode(p.gx);
    api.setQuality(p.q);
    api.onChange();
    api.toast('Графика: ' + LABELS[name], 2200);
  }

  presetBtns.forEach((b) => b.addEventListener('click', () => applyPreset(b.getAttribute('data-preset'))));
  for (const [key, sw] of Object.entries(switches)) {
    if (!sw) continue;
    sw.addEventListener('click', () => {
      music[key] = !music[key];
      api.onChange();
    });
  }

  // Вкладки
  const nav = el('setTabs');
  if (nav) {
    const tabs = Array.prototype.slice.call(nav.querySelectorAll('[data-tab]'));
    const panes = Array.prototype.slice.call(document.querySelectorAll('.stabpane'));
    tabs.forEach((b) => b.addEventListener('click', () => {
      const name = b.getAttribute('data-tab');
      tabs.forEach((t) => {
        const on = t === b;
        t.classList.toggle('on', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panes.forEach((p) => { p.hidden = p.getAttribute('data-pane') !== name; });
      const sheet = document.querySelector('#overlay .sheet');
      if (sheet) sheet.scrollTop = 0;
    }));
  }

  return { sync, applyPreset };
}
