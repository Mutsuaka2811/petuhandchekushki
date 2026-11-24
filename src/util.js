'use strict';

const config = require('./config');

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // без 0/O/1/I — код удобно диктовать

function isObj(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function int(v, min, max, fallback = 0) {
  const n = Math.trunc(Number(v));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function num(v, min, max, fallback = 0) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function str(v, max, fallback = '') {
  if (typeof v !== 'string') return fallback;
  // Убираем управляющие символы и обрезаем по длине.
  return v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function bool(v) {
  return v ? 1 : 0;
}

function makeCode(exists) {
  for (let attempt = 0; attempt < 100; attempt++) {
    let code = '';
    for (let i = 0; i < 4; i++) code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    if (!exists(code)) return code;
  }
  return 'X' + Date.now().toString(36).slice(-5).toUpperCase();
}

// Позиция игрока приходит 20 раз в секунду — доверяем ей только как «отображению»,
// поэтому жёстко ограничиваем диапазоны, чтобы один клиент не сломал остальным игру.
function sanitizeState(raw) {
  if (!isObj(raw)) return null;
  const s = {
    x: int(raw.x, -100000, 100000),
    z: int(raw.z, -10000, 10000),
    f: raw.f > 0 ? 1 : -1,
    b: bool(raw.b),
    own: bool(raw.own),
    ox: int(raw.ox, -100000, 100000),
    od: raw.od > 0 ? 1 : -1,
    rd: str(raw.rd, 40),
    l: int(raw.l, 0, 999),
    ti: bool(raw.ti),
    sv: bool(raw.sv),
    dz: num(raw.dz, -10000, 10000),
    bk: int(raw.bk, 0, 999999),
    bl: int(raw.bl, 0, 999),
    rc: bool(raw.rc),
    av: int(raw.av, 0, 99),
    ah: int(raw.ah, -10000, 10000),
    fg: bool(raw.fg),
    dw: bool(raw.dw),
    gh: bool(raw.gh),
    gx: int(raw.gx, -100000, 100000),
    cb: bool(raw.cb),
    px: str(raw.px, 40),
    cs: int(raw.cs, -1, 199, -1),
    cx: int(raw.cx, -100000, 100000),
    cf: raw.cf > 0 ? 1 : -1,
    ci: int(raw.ci, 0, 15),
    rr: int(raw.rr, 0, 5, 2),
    rp: bool(raw.rp),
    avs: int(raw.avs, 0, 10000),
    afu: int(raw.afu, 0, 100),
  };
  return s;
}

// Для событий сюжета (`story`) клиент шлёт произвольные объекты.
// Пропускаем только «обычные данные»: строки/числа/массивы/объекты, без функций
// и без переразмерных структур — иначе можно уронить и сервер, и других игроков.
function sanitizePayload(raw, maxBytes = config.maxPayload) {
  let budget = maxBytes;
  function walk(v, depth) {
    if (depth > 6 || budget <= 0) return undefined;
    if (v === null) { budget -= 4; return null; }
    if (typeof v === 'string') {
      const out = v.slice(0, 2000);
      budget -= out.length * 2;
      return out;
    }
    if (typeof v === 'number') { budget -= 16; return Number.isFinite(v) ? v : 0; }
    if (typeof v === 'boolean') { budget -= 8; return v; }
    if (Array.isArray(v)) {
      const out = [];
      for (let i = 0; i < Math.min(v.length, 128) && budget > 0; i++) out.push(walk(v[i], depth + 1));
      return out;
    }
    if (isObj(v)) {
      const out = {};
      for (const k of Object.keys(v).slice(0, 64)) {
        if (budget <= 0) break;
        const val = walk(v[k], depth + 1);
        if (val !== undefined) out[k.slice(0, 40)] = val;
      }
      return out;
    }
    return undefined;
  }
  const result = walk(raw, 0);
  if (result === undefined || JSON.stringify(result).length > maxBytes) return null;
  return result;
}

// Простой лимитер «N действий в окно» на игрока и событие.
function allow(rate, key, max, windowMs) {
  const now = Date.now();
  let rec = rate.get(key);
  if (!rec || now - rec.t >= windowMs) {
    rec = { t: now, n: 0 };
    rate.set(key, rec);
  }
  if (rec.n >= max) return false;
  rec.n++;
  return true;
}

module.exports = { isObj, int, num, str, bool, makeCode, sanitizeState, sanitizePayload, allow };
