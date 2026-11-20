import { SKINS } from './skins-data.js';
import { spriteURL } from './sprites.js';

const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); };
const lum = h => { const [r, g, b] = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

function ensure(fg, bg, min) {
  if (contrast(fg, bg) >= min) return fg;
  const target = lum(bg) > 0.4 ? '#000000' : '#ffffff';
  for (let t = 0.1; t <= 1; t += 0.1) { const c = mix(fg, target, t); if (contrast(c, bg) >= min) return c; }
  return target;
}

export function palette(s) {
  const light = lum(s.bg) > 0.4;
  const text = ensure(s.text, s.panel, 7);
  const accent = ensure(s.accent, s.panel, 3);
  const ink = light ? mix(s.text, '#000000', 0.4) : mix(s.bg, '#000000', 0.55);
  return {
    light, bg: s.bg, panel: s.panel, text, accent, accent2: s.accent2, ink,
    panel2: mix(s.panel, s.bg, 0.5),
    hl: mix(s.panel, light ? '#ffffff' : s.text, 0.18),
    border: mix(accent, s.panel, 0.35),
    muted: ensure(mix(text, s.panel, 0.38), s.panel, 4.5),
    shadow: mix(accent, '#000000', 0.45),
    onAccent: contrast('#000000', accent) > contrast('#ffffff', accent) ? mix(s.bg, '#000000', 0.6) : '#ffffff',
  };
}

// --- patrones de fondo (tile 16x16) ---
const P = {
  // panal: hexágonos de 8x8 desplazados media celda en filas alternas
  comb(px, c) {
    const hex = ['..####..', '.#....#.', '#......#', '#......#', '.#....#.', '..####..', '........', '........'];
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const off = (y >> 3) % 2 ? 4 : 0;
      const ch = hex[(y + 1) % 8][(x + off) % 8];
      if (ch === '#') px(x, y, c.d2); else if ((x * 7 + y * 3) % 23 === 0) px(x, y, c.a1);
    }
  },
  plain(px, c) { for (let i = 0; i < 6; i++) px(rnd(i) * 16 | 0, rnd(i + 9) * 16 | 0, c.d1); },
  dither(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if ((x + y) % 4 === 0 && (y % 2 === 0)) px(x, y, c.d1); },
  checker(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if ((x >> 3) ^ (y >> 3)) px(x, y, c.d1); },
  bricks(px, c) {
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const off = (y >> 2) % 2 ? 4 : 0;
      if (y % 4 === 3 || (x + off) % 8 === 0) px(x, y, c.d2); else if ((x + y) % 7 === 0) px(x, y, c.d1);
    }
  },
  stars(px, c) { [[2, 3], [11, 1], [7, 8], [14, 11], [4, 13], [9, 14]].forEach(([x, y], i) => { px(x, y, i % 2 ? c.a1 : c.d1); if (i === 2) { px(x - 1, y, c.d1); px(x + 1, y, c.d1); px(x, y - 1, c.d1); px(x, y + 1, c.d1); } }); },
  grass(px, c) { [[1, 4], [6, 2], [11, 6], [3, 11], [9, 12], [14, 14]].forEach(([x, y]) => { px(x, y, c.d1); px(x, y - 1, c.d1); px(x + 1, y - 2, c.a1); px(x - 1, y - 1, c.d1); }); },
  waves(px, c) { for (let x = 0; x < 16; x++) { const y = Math.round(Math.sin(x / 16 * Math.PI * 2) * 1.5); px(x, 4 + y, c.d1); px(x, 12 - y, c.d2); } },
  dots(px, c) { px(3, 3, c.d1); px(4, 3, c.d1); px(3, 4, c.d1); px(4, 4, c.d1); px(11, 11, c.d1); px(12, 11, c.d1); px(11, 12, c.d1); px(12, 12, c.d1); px(12, 4, c.a1); px(4, 12, c.a1); },
  stripes(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if ((x + y) % 8 < 2) px(x, y, c.d1); },
  diag(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if (x > y) px(x, y, c.d1); else if (x === y) px(x, y, c.a1); },
  scan(px, c) { for (let y = 0; y < 16; y += 2) for (let x = 0; x < 16; x++) px(x, y, c.d1); },
  grid(px, c) { for (let i = 0; i < 16; i++) { px(i, 0, c.d1); px(0, i, c.d1); px(i, 8, c.d2); px(8, i, c.d2); } },
  runes(px, c) {
    const r = ['1.1|111|1.1', '11.|1.1|11.', '.1.|111|1.1', '111|.1.|1.1'];
    [[1, 1, 0], [9, 3, 1], [4, 9, 2], [12, 11, 3]].forEach(([ox, oy, k]) => r[k].split('|').forEach((row, y) => [...row].forEach((ch, x) => ch === '1' && px(ox + x, oy + y, c.d1))));
  },
  scales(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const cx = (y >> 2) % 2 ? 4 : 0; const dx = ((x + cx) % 8) - 4, dy = (y % 4); if (dy === 3 && Math.abs(dx) < 3 || dy === 2 && Math.abs(dx) === 3) px(x, y, c.d1); } },
  snow(px, c) { [[2, 2], [10, 5], [5, 9], [13, 13], [7, 14], [14, 1]].forEach(([x, y], i) => { px(x, y, c.a1); if (i % 2) { px(x + 1, y, c.d1); px(x - 1, y, c.d1); } }); },
  cross(px, c) { [[4, 4], [12, 12]].forEach(([x, y]) => { for (let i = -2; i <= 2; i++) px(x, y + i, c.d1); px(x - 1, y - 1, c.d1); px(x + 1, y - 1, c.d1); }); },
  lava(px, c) { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const v = Math.sin(x * 0.7 + y * 0.3) + Math.cos(y * 0.9 - x * 0.2); if (v > 1.3) px(x, y, c.a1); else if (v > 0.7) px(x, y, c.d1); } },
};
function rnd(i) { const x = Math.sin(i * 999) * 10000; return x - Math.floor(x); }

export function patternURL(name, pal, scale = 3) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 16 * scale;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, cv.width, cv.height);
  const c = {
    d1: mix(pal.bg, pal.light ? '#000000' : pal.text, pal.light ? 0.07 : 0.07),
    d2: mix(pal.bg, '#000000', 0.25),
    a1: mix(pal.bg, pal.accent, 0.35),
  };
  const px = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(((x % 16) + 16) % 16 * scale, ((y % 16) + 16) % 16 * scale, scale, scale); };
  (P[name] || P.plain)(px, c);
  return cv.toDataURL();
}

export const PATTERNS = Object.keys(P);

export function getSkin(id) { return SKINS.find(s => s.id === id) || SKINS[0]; }

export function applySkin(id, root = document.documentElement) {
  const s = getSkin(id);
  const pal = palette(s);
  const st = root.style;
  for (const [k, v] of Object.entries(pal)) if (typeof v === 'string') st.setProperty('--' + k, v);
  st.setProperty('--pattern', `url(${patternURL(s.pattern, pal)})`);
  st.setProperty('--emblem', `url(${spriteURL(s.emblem, pal, 4)})`);
  root.dataset.light = pal.light ? '1' : '0';
  return { skin: s, pal };
}
