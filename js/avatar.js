/* Asamblea — avatares pixel para cuando la cámara está apagada.
 * León Ácratus sale del diseño canónico (personajes/leon-acratus.json, cara.px). GPL-3.0-or-later */
'use strict';
const Avatars = (() => {
  const LEON = {
    rows: [
      '......gHh.hHg.hH....', '....hHHHhHHHhHHHh...', '...hHgHHHHgHHHHgHh..', '...HHHHhHHHHhHHHHH..',
      '...HHhHHHHHHhHHHH...', '...HHHSSSHHSSSSHH...', '...HHSSSSSSSSSSHH...', '...HSSSSSSSSSSSSH...',
      '...HSHHHSSSSHHHSH...', '..EFFFFFFSSFFFFFFE..', '..EFLWPLFFFFLPWLFE..', '..EFLLPLFSSFLPLLFE..',
      '...FFFFFFssFFFFFF...', '...BSSSSSssSSSSSB...', '...BBSSbBBBBbSSBB...', '...BBBbBMMMMBbBBB...',
      '....BBbBBBBBBbBB....', '.....BBBbBBbBBB.....', '......BBBBBBBB......'],
    pal: { H: '#3a2416', h: '#5a3a24', g: '#7a5236', S: '#e9b994', s: '#c99572', E: '#d9a37e', F: '#1a1a1a', L: '#f6dcc6', W: '#ffffff', P: '#3b2a1a', B: '#3a2416', b: '#5a3a24', M: '#b8695a' },
  };
  const LIST = [
    { id: 'leon', name: 'León Ácratus' },
    { id: 'ini', name: 'Iniciales' },
  ];
  const cache = new Map();

  // pinta la cara pixel en una rejilla 24x24 (contorno de 1 px) y con el abrigo beige / saco verde abajo
  function drawLeon(ctx, x0, y0, size) {
    const N = 24, px = size / N;
    const grid = Array.from({ length: N }, () => Array(N).fill(null));
    LEON.rows.forEach((row, y) => [...row].forEach((c, x) => { if (c !== '.') grid[y + 2][x + 2] = LEON.pal[c]; }));
    // cuello y hombros: abrigo beige con saco verde
    for (let y = 21; y < N; y++) for (let x = 3; x < 21; x++) grid[y][x] = (x >= 9 && x <= 14) ? '#2f4a32' : '#c8b48a';
    for (let x = 9; x <= 14; x++) grid[20][x] = '#c99572';
    // contorno
    const out = grid.map(r => r.slice());
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (grid[y][x]) continue;
      const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => grid[y + dy] && grid[y + dy][x + dx]);
      if (n) out[y][x] = '#0d0b0a';
    }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (!out[y][x]) continue;
      ctx.fillStyle = out[y][x];
      ctx.fillRect(Math.floor(x0 + x * px), Math.floor(y0 + y * px), Math.ceil(px), Math.ceil(px));
    }
  }

  const pix = () => window.Look ? `"${Look.fontFamily(Look.state.font)}", "Silkscreen", sans-serif` : '"Silkscreen", "Atkinson Hyperlegible", sans-serif';
  function initials(name) {
    const p = String(name || '?').trim().split(/\s+/).filter(Boolean);
    return ((p[0] || '?')[0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }

  /* Dibuja el avatar centrado en un rectángulo (lo usan las teselas y el compositor de grabación). */
  function draw(ctx, avatar, name, color, x, y, w, hgt) {
    const size = Math.floor(Math.min(w, hgt) * 0.55);
    const ax = x + (w - size) / 2, ay = y + (hgt - size) / 2 - hgt * 0.04;
    const pal = window.Look && Look.pal;
    const pc = avatar && avatar.startsWith('ch:') && window.Look ? Look.portraitCanvas(avatar.slice(3)) : null;
    if (pc) {
      ctx.fillStyle = pal ? pal.hl : '#2a201a'; ctx.fillRect(ax, ay, size, size);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(pc, ax, ay, size, size);
    } else if (avatar === 'leon' || avatar && avatar.startsWith('ch:')) {
      ctx.fillStyle = pal ? pal.hl : '#2a201a'; ctx.fillRect(ax, ay, size, size);
      ctx.imageSmoothingEnabled = false;
      drawLeon(ctx, ax, ay, size);
    } else {
      ctx.fillStyle = color || '#c0392b';
      ctx.fillRect(ax, ay, size, size);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(ax, ay + size - size / 8, size, size / 8);
      ctx.fillStyle = '#fff';
      ctx.font = `${Math.floor(size * 0.42)}px ${pix()}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(initials(name), ax + size / 2, ay + size / 2 + 1);
    }
  }

  function dataUrl(avatar, name, color, size = 160) {
    const key = [avatar, name, color, size, window.Look && Look.state.skin, window.Look && Look.state.font].join('|');
    if (cache.has(key)) return cache.get(key);
    const c = document.createElement('canvas'); c.width = c.height = size;
    const ctx = c.getContext('2d');
    draw(ctx, avatar, name, color, -size * 0.41, -size * 0.41, size * 1.82, size * 1.9);
    const u = c.toDataURL('image/png'); cache.set(key, u); return u;
  }

  return { LIST, draw, dataUrl, initials };
})();
