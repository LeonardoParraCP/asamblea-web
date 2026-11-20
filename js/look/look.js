// Asamblea — apariencia: los skins, fuentes pixel y personajes de Tinta Libre aplicados a la app.
// Expone window.Look para los scripts clásicos. GPL-3.0-or-later
import { SKINS as BASE, CATEGORIES as BASE_CATS } from './skins-data.js';
import { CONSULTORIA } from './skins-consultoria.js';
import { palette, patternURL, mix, contrast } from './skin-engine.js';
import { spriteURL } from './sprites.js';
import { FONTS as PX_FONTS } from './fonts-data.js';
import { CHARACTERS, CHAR_CATS } from './characters-data.js';
import { portraitPrims } from './portraits.js';
import { rasterize, drawGrid } from './sprites.js';

const KEY = 'asamblea.look';
const DEF = { skin: 'asamblea', font: 'silkscreen', body: 'atkinson', fx: 'suave' };

// el aspecto original de Asamblea, como primer skin
const OWN = [
  { id: 'asamblea', cat: 'asamblea', name: 'Asamblea', emblem: 'star', pattern: 'plain', bg: '#0f0d0b', panel: '#1e1914', accent: '#e8b04a', text: '#f3ece2', accent2: '#d64a3c' },
  { id: 'asamblea-dia', cat: 'asamblea', name: 'Asamblea de día', emblem: 'star', pattern: 'plain', bg: '#f4efe6', panel: '#fffaf2', accent: '#9a5b00', text: '#231a10', accent2: '#c0392b' },
  { id: 'asamblea-noche', cat: 'asamblea', name: 'Asamblea nocturna', emblem: 'crystal', pattern: 'stars', bg: '#0b0f1a', panel: '#151c2e', accent: '#7ab8ff', text: '#e8eefc', accent2: '#ff6b8a' },
];
// DEMOS Asuntos Públicos: negro y dorado de la firma, azul y oro de DEMOS Radar; versiones oscuras y claras.
// [nombre, emblema, patrón, fondo, panel, acento, texto, acento2]
const DEMOS = [
  ['DEMOS negro y oro', 'crown', 'plain', '#0a0a0a', '#161616', '#c9a96e', '#f3efe6', '#92761f'],
  ['DEMOS marfil', 'quill', 'plain', '#efe7d6', '#fbf8f1', '#7a5c1e', '#0a0a0a', '#c9a96e'],
  ['DEMOS azul y oro', 'star', 'plain', '#14213d', '#1c2b4d', '#fca311', '#e8ecf3', '#c9a96e'],
  ['DEMOS azul claro', 'book', 'plain', '#e8ecf3', '#ffffff', '#14213d', '#0d1424', '#b07a00'],
  ['DEMOS grafito', 'key', 'plain', '#1c1c1c', '#262626', '#c9a96e', '#ececec', '#7f9cc9'],
  ['DEMOS papel', 'scroll', 'plain', '#f2f1ed', '#ffffff', '#1c1c1c', '#111111', '#92761f'],
  ['DEMOS oro viejo', 'shield', 'plain', '#2a2112', '#382c18', '#d9b45a', '#f4ecdb', '#8fa8c9'],
  ['DEMOS ejecutivo', 'chest', 'plain', '#f4ecdb', '#fffdf8', '#7a5c1e', '#1d160a', '#14213d'],
  ['DEMOS noche institucional', 'eye', 'plain', '#0b1222', '#141f38', '#c9a96e', '#e9ecf3', '#fca311'],
  ['DEMOS informe', 'banner', 'plain', '#f5f6f8', '#ffffff', '#0a0a0a', '#121417', '#c9a96e'],
];
const tuple = (cat, prefix) => ([name, emblem, pattern, bg, panel, accent, text, accent2], i) =>
  ({ id: `${prefix}-${String(i + 1).padStart(2, '0')}`, cat, name, emblem, pattern, bg, panel, accent, text, accent2 });
const PRO = [...DEMOS.map(tuple('demos', 'dem')), ...CONSULTORIA.map(tuple('consultoria', 'con'))];
export const SKINS = [...OWN, ...PRO, ...BASE];
export const CATEGORIES = [{ id: 'asamblea', name: 'Asamblea', count: OWN.length },
  { id: 'demos', name: 'DEMOS Asuntos Públicos', count: DEMOS.length },
  { id: 'consultoria', name: 'Consultoría sobria', count: CONSULTORIA.length }, ...BASE_CATS];
// «sobria»: sin pixel, para los skins corporativos
export const FONTS = [{ id: 'silkscreen', name: 'Silkscreen (original)', family: 'Silkscreen' },
  { id: 'sobria', name: 'Atkinson sobria (sin pixel, corporativa)', family: 'Atkinson Hyperlegible' }, ...PX_FONTS];
export const isCorp = s => s.cat === 'demos' || s.cat === 'consultoria';
export const BODY = [['atkinson', 'Atkinson Hyperlegible (lectura cómoda)'], ['pixel', 'La misma fuente pixel en todo']];
export const FX = [['apagado', 'Sin efectos'], ['suave', 'Suaves'], ['intenso', 'Intensos']];

let st = { ...DEF };
try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} };

const NEON_RPG = /synth|vapor|cyber|8 bits|16 bits|portátil|monitor|terminal|tormenta eléctrica|atardecer retro/i;
export function themeOf(s) {
  if (isCorp(s)) return 'corp';
  if (s.cat === 'cyber' || s.cat === 'asamblea' && s.id === 'asamblea-noche' || (s.cat === 'rpg' && NEON_RPG.test(s.name))) return 'neon';
  if (s.cat === 'anarquista') return 'term';
  if (s.cat === 'asamblea') return 'plain';
  return 'old';
}
export const getSkin = id => SKINS.find(s => s.id === id) || SKINS[0];

let pal = null, skin = null;
export function applySkin(id = st.skin, { autoFont = false } = {}) {
  const prev = skin;
  skin = getSkin(id); st.skin = skin.id;
  // al pasar a un skin corporativo, letra sobria; al salir de él, vuelve la pixel
  if (autoFont && prev && isCorp(skin) !== isCorp(prev)) {
    if (isCorp(skin) && st.font !== 'sobria') { st.pxFont = st.font; applyFont('sobria'); }
    else if (!isCorp(skin) && st.font === 'sobria') applyFont(st.pxFont || 'silkscreen');
  }
  pal = palette(skin);
  const r = document.documentElement.style;
  const set = (k, v) => r.setProperty(k, v);
  set('--bg', pal.bg);
  set('--bg2', pal.panel2);
  set('--card', pal.panel);
  set('--line', mix(pal.panel, pal.text, 0.14));
  set('--line2', pal.border);
  set('--ink', pal.text);
  set('--mut', pal.muted);
  set('--dim', mix(pal.muted, pal.panel, 0.3));
  set('--acc', pal.accent);
  set('--acc-ink', pal.onAccent);
  set('--acc2', pal.accent2);
  set('--shadow', pal.shadow);
  set('--hl', pal.hl);
  set('--glow', `color-mix(in srgb, ${pal.accent} 70%, transparent)`);
  set('--glow2', `color-mix(in srgb, ${pal.accent2} 60%, transparent)`);
  set('--pattern', isCorp(skin) || (skin.pattern === 'plain' && skin.cat === 'asamblea') ? 'none' : `url(${patternURL(skin.pattern, pal)})`);
  set('--emblem', `url(${spriteURL(skin.emblem, pal, 4)})`);
  // rojo de «grabando» siempre legible sobre el panel
  set('--red', contrast('#d64a3c', pal.panel) >= 3 ? '#d64a3c' : (pal.light ? '#a8261b' : '#ff6b5e'));
  const root = document.documentElement;
  root.style.colorScheme = pal.light ? 'light' : 'dark';
  root.dataset.light = pal.light ? '1' : '0';
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = pal.bg;
  const b = document.body; if (b) for (const t of ['neon', 'old', 'term', 'plain', 'corp']) b.classList.toggle('t-' + t, t === themeOf(skin));
  save(); emit();
  return { skin, pal };
}

const loaded = new Set();
export function fontFamily(id) {
  const f = FONTS.find(x => x.id === id) || FONTS[0];
  if (f.family) return f.family;
  const fam = 'PX-' + f.id;
  if (!loaded.has(fam)) { const ff = new FontFace(fam, `url(${f.file})`); document.fonts.add(ff); ff.load().catch(() => {}); loaded.add(fam); }
  return fam;
}
export function applyFont(id = st.font, body = st.body) {
  const f = FONTS.find(x => x.id === id) || FONTS[0];
  st.font = f.id; st.body = body;
  const fam = fontFamily(f.id);
  const r = document.documentElement.style;
  r.setProperty('--pix', `"${fam}", "Silkscreen", "Atkinson Hyperlegible", monospace`);
  r.setProperty('--body', body === 'pixel' ? `"${fam}", "Atkinson Hyperlegible", system-ui, sans-serif` : '"Atkinson Hyperlegible", system-ui, sans-serif');
  save(); emit();
}
export function applyFx(level = st.fx) {
  st.fx = level;
  const b = document.body;
  if (b) { b.classList.toggle('fx', level !== 'apagado'); b.classList.toggle('fx2', level === 'intenso'); }
  save();
}

// retratos 20x20 de los personajes como lienzo (dibujo síncrono para los mosaicos y la grabación)
const pcache = new Map();
export function charById(id) { return CHARACTERS.find(c => c.id === id); }
export function portraitCanvas(id, open = false) {
  const k = id + (open ? '1' : '0');
  if (pcache.has(k)) return pcache.get(k);
  const c = charById(id); if (!c) return null;
  const cv = drawGrid(rasterize(portraitPrims(c.spec, open), 20), { ink: '#1a1410', text: '#ffffff' }, 1);
  pcache.set(k, cv); return cv;
}

const subs = new Set();
function emit() { subs.forEach(f => { try { f(); } catch {} }); }

window.Look = {
  SKINS, CATEGORIES, FONTS, BODY, FX, CHARACTERS, CHAR_CATS,
  get state() { return { ...st }; }, get skin() { return skin; }, get pal() { return pal; },
  applySkin, applyFont, applyFx, themeOf, getSkin, isCorp, fontFamily, portraitCanvas, charById, patternURL, spriteURL, palette,
  onChange: f => subs.add(f),
};
applySkin(); applyFont();
const onBody = () => { applySkin(st.skin); applyFx(); };
if (document.body) onBody(); else document.addEventListener('DOMContentLoaded', onBody, { once: true });
