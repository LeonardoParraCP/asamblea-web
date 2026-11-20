// Retratos pixel art 20x20 de los personajes, armados por capas:
// pelo de atrás → orejas/cuernos → cabeza → rasgos de raza → pelo → barba → boca → tocado → accesorios.
import { rasterize, drawGrid } from './sprites.js';
import { mix } from './skin-engine.js';

const RACE_SKIN = {
  human: '#f1b98a', elf: '#f3d2b3', orc: '#6fa04a', troll: '#5f9fb0', dwarf: '#e8a983', gnome: '#f5c4a8',
  goblin: '#8cc152', undead: '#9fae9a', cat: '#d9a35f', lizard: '#4f9a6a', tauren: '#8a5a3a', draenei: '#7d9be0',
  panda: '#f4f1ea', wolf: '#7b7f86', dunmer: '#7f8a99', altmer: '#e8c87a',
};

export function portraitPrims(sp, open = false) {
  const r = sp.r || 'human';
  const sk = sp.sk || RACE_SKIN[r] || RACE_SKIN.human;
  const shade = mix(sk, '#000000', 0.25), light = mix(sk, '#ffffff', 0.45);
  const hc = sp.hc || '#5a3420', hd = sp.hd || 'none', hdc = sp.hdc || '#3b2b6b';
  const cl = sp.cl || '#7a4c18', tr = sp.tr || '#f7c843', eye = sp.e || 'k';
  const acc = sp.a || [];
  const P = [];
  const add = (c, shape) => P.push({ c, ...shape });

  // cuerpo
  add(cl, { poly: [[2.5, 20], [4, 16.4], [16, 16.4], [17.5, 20]] });
  add(tr, { rect: [8, 16.4, 4, 1.4] });
  if (sp.pads) { add(tr, { circle: [4.2, 17.4, 2.5] }); add(tr, { circle: [15.8, 17.4, 2.5] }); add(mix(tr, '#000000', 0.3), { rect: [3, 17.2, 2.4, 0.6] }); add(mix(tr, '#000000', 0.3), { rect: [14.6, 17.2, 2.4, 0.6] }); }

  // cara dibujada a mano, píxel a píxel (sp.px = { rows, pal }): para personajes con rostro propio
  if (sp.px) {
    // tramos seguidos del mismo color en una fila = un solo rectángulo (menos primitivas que rasterizar)
    sp.px.rows.forEach((row, y) => {
      for (let x = 0; x < row.length;) {
        const ch = row[x]; let n = 1;
        while (row[x + n] === ch) n++;
        if (ch !== '.') add(sp.px.pal[ch], { rect: [x, y, n, 1] });
        x += n;
      }
    });
  } else {
    // capa trasera: capucha, pelo largo, pelo salvaje, orejas
    if (hd === 'hood' || hd === 'cowl') add(hdc, { ellipse: [10, 10.5, 6.4, 6.8] });
    if (sp.h === 'long') add(hc, { rect: [4.8, 8, 10.4, 9.2] });
    if (sp.h === 'wild') add(hc, { star: [10, 8, 6.6, 3.8, 7, -90] });
    if (r === 'panda') { add('#1a1a1a', { circle: [5.8, 6.4, 1.8] }); add('#1a1a1a', { circle: [14.2, 6.4, 1.8] }); }
    if (r === 'elf' || r === 'dunmer' || r === 'altmer') { add(sk, { poly: [[5.6, 10], [2, 6.6], [5.6, 12]] }); add(sk, { poly: [[14.4, 10], [18, 6.6], [14.4, 12]] }); }
    if (r === 'troll' || r === 'goblin') { add(sk, { poly: [[5.6, 9.6], [0.6, 8.4], [5.6, 12.2]] }); add(sk, { poly: [[14.4, 9.6], [19.4, 8.4], [14.4, 12.2]] }); }
    if (r === 'tauren') { add('#efe6d2', { poly: [[6, 7.6], [1.2, 6.8], [1, 2.6], [3.2, 5.6]] }); add('#efe6d2', { poly: [[14, 7.6], [18.8, 6.8], [19, 2.6], [16.8, 5.6]] }); }
    if (r === 'draenei') { add(hc, { poly: [[6.2, 6.6], [3.4, 7.2], [3, 12.6], [4.8, 10.2], [5.8, 9]] }); add(hc, { poly: [[13.8, 6.6], [16.6, 7.2], [17, 12.6], [15.2, 10.2], [14.2, 9]] }); }
    if (r === 'lizard') { add(hc, { poly: [[6.4, 7.4], [3.6, 2.4], [8.4, 6]] }); add(hc, { poly: [[13.6, 7.4], [16.4, 2.4], [11.6, 6]] }); add(hc, { poly: [[9, 6], [10, 3], [11, 6]] }); }

    // cuello y cabeza
    add(sk, { rect: [8.5, 14.4, 3, 2.4] });
    if (r === 'lizard') add(sk, { ellipse: [10, 10.6, 4.4, 5.3] });
    else add(sk, { ellipse: [10, 10.5, 4.6, 5] });
    if (r === 'orc' || r === 'troll') add(sk, { ellipse: [10, 12.6, 5, 3.4] });
    if (r === 'gnome' || r === 'dwarf') add(shade, { circle: [10, 12, 1.1] });

    // orejas de gato / lobo encima de la cabeza
    if (r === 'cat' || r === 'wolf') {
      add(sk, { poly: [[5.4, 8.2], [5.6, 3.2], [8.6, 6]] }); add(sk, { poly: [[14.6, 8.2], [14.4, 3.2], [11.4, 6]] });
      add('#e8a0a0', { poly: [[6.2, 7.2], [6.3, 4.8], [7.6, 6.2]] }); add('#e8a0a0', { poly: [[13.8, 7.2], [13.7, 4.8], [12.4, 6.2]] });
      add(light, { ellipse: [10, 13.2, 2.6, 1.8] }); add('#1a1a1a', { rect: [9.4, 11.9, 1.2, 0.9] });
      if (r === 'cat') { add(shade, { rect: [9.4, 6, 1.2, 2] }); add(shade, { rect: [5.6, 10.6, 1.4, 0.6] }); add(shade, { rect: [13, 10.6, 1.4, 0.6] }); }
    }
    if (r === 'tauren') { add(light, { ellipse: [10, 13.4, 3.2, 2.1] }); add('#1a1a1a', { rect: [8.6, 12.8, 0.9, 0.9] }); add('#1a1a1a', { rect: [10.5, 12.8, 0.9, 0.9] }); add('#f7c843', { ring: [10, 15.2, 1.1, 0.5] }); }
    if (r === 'lizard') { add(shade, { rect: [7, 7.2, 1, 1] }); add(shade, { rect: [12, 6.6, 1, 1] }); add(shade, { rect: [10.4, 8, 1, 1] }); }
    if (r === 'goblin') add(shade, { poly: [[9.6, 10.8], [13.8, 12.6], [10.6, 12.8]] });
    if (r === 'undead') { add(shade, { rect: [6.4, 12, 1.4, 2] }); add(shade, { rect: [12.2, 12, 1.4, 2] }); }
    if (r === 'panda') { add('#1a1a1a', { ellipse: [7.9, 10.8, 1.7, 1.5] }); add('#1a1a1a', { ellipse: [12.1, 10.8, 1.7, 1.5] }); add('#1a1a1a', { rect: [9.4, 12, 1.2, 0.9] }); }

    // pelo superior
    const cap = () => { add(hc, { ellipse: [10, 7.2, 4.9, 2.7] }); add(hc, { rect: [5.2, 7.6, 1.1, 3] }); add(hc, { rect: [13.7, 7.6, 1.1, 3] }); };
    switch (sp.h) {
      case 'short': case 'long': case 'wild': cap(); break;
      case 'bun': cap(); add(hc, { circle: [10, 4.4, 1.9] }); break;
      case 'ponytail': cap(); add(hc, { line: [14.6, 8, 17.4, 14, 1.8] }); break;
      case 'braids': cap(); add(hc, { line: [5.4, 10, 5, 17.6, 1.5] }); add(hc, { line: [14.6, 10, 15, 17.6, 1.5] }); add(tr, { rect: [4.2, 16.6, 1.6, 1] }); add(tr, { rect: [14.2, 16.6, 1.6, 1] }); break;
      case 'mohawk': add(hc, { rect: [9, 2.6, 2, 6.2] }); break;
      case 'tonsure': add(hc, { rect: [5.2, 8, 1.2, 2.8] }); add(hc, { rect: [13.6, 8, 1.2, 2.8] }); add(hc, { rect: [5.6, 7.4, 1.6, 1] }); add(hc, { rect: [12.8, 7.4, 1.6, 1] }); break;
      // rizos con volumen arriba (León Ácratus)
      case 'rizos': add(hc, { ellipse: [10, 4.8, 5.4, 2.1] }); add(hc, { rect: [4.8, 5, 1.2, 3.4] }); add(hc, { rect: [14, 5, 1.2, 3.4] }); for (const [x, y] of [[5, 5.4], [6.6, 3.4], [8.4, 2.4], [10.2, 2.1], [12, 2.4], [13.6, 3.4], [15, 5.4], [5.2, 7.2], [14.8, 7.2]]) add(hc, { circle: [x, y, 1.5] }); for (const [x, y] of [[7.4, 3.2], [10.4, 2.4], [12.8, 3.6], [5.6, 5.8]]) add(mix(hc, '#ffffff', 0.18), { rect: [x, y, 1, 1] }); break;
      case 'curly': for (const [x, y] of [[6, 7], [8, 5.8], [10, 5.4], [12, 5.8], [14, 7], [5.4, 9], [14.6, 9]]) add(hc, { circle: [x, y, 1.6] }); break;
      default: break;
    }

    // barba
    if (sp.b === 'full') add(hc, { poly: [[5.6, 11.6], [14.4, 11.6], [13.6, 15.2], [10, 17.4], [6.4, 15.2]] });
    if (sp.b === 'big') add(hc, { poly: [[5.2, 11], [14.8, 11], [14.4, 17], [10, 19.8], [5.6, 17]] });
    // barba arreglada: mandíbula y mentón, deja ver mejillas y labios
    if (sp.b === 'trim') { add(hc, { poly: [[5.4, 11.8], [6.6, 13.6], [13.4, 13.6], [14.6, 11.8], [14, 15.4], [10, 17.4], [6, 15.4]] }); add(hc, { rect: [7.8, 12.4, 4.4, 0.9] }); }
    if (sp.b === 'goatee') add(hc, { rect: [9.2, 14, 1.6, 1.8] });
    if (sp.b === 'mustache' || sp.b === 'full' || sp.b === 'big') add(mix(hc, '#000000', 0.15), { rect: [7.8, 12.4, 4.4, 0.9] });
    if (r === 'draenei') { add(hc, { line: [8, 14.6, 7.6, 17.4, 0.9] }); add(hc, { line: [12, 14.6, 12.4, 17.4, 0.9] }); }

    // ojos y boca
    const ec = eye === 'k' ? '#1a1a1a' : eye;
    if (r === 'panda') { add('#ffffff', { rect: [7.6, 10.4, 0.9, 0.9] }); add('#ffffff', { rect: [11.6, 10.4, 0.9, 0.9] }); }
    else if (r === 'lizard' || r === 'cat') { add('#f7d34a', { rect: [7.2, 10, 1.6, 1.4] }); add('#f7d34a', { rect: [11.2, 10, 1.6, 1.4] }); add('#1a1a1a', { rect: [7.8, 10, 0.5, 1.4] }); add('#1a1a1a', { rect: [11.8, 10, 0.5, 1.4] }); }
    else { add(ec, { rect: [7.4, 10, 1.2, 1.5] }); add(ec, { rect: [11.4, 10, 1.2, 1.5] }); }
    if (r === 'gnome' || r === 'human' || r === 'elf' || r === 'altmer' || r === 'dunmer') add(shade, { rect: [9.6, 11.6, 0.8, 0.9] });
    if (open) add('#8e1b22', { rect: [8.8, 13.1, 2.4, 1.6] });
    else if (sp.b === 'trim') add('#c47a68', { rect: [8.8, 13.4, 2.4, 0.8] });
    else add('#1a1a1a', { rect: [9, 13.4, 2, 0.7] });
    if (r === 'orc' || r === 'troll') { const big = r === 'troll'; add('#f4f1ea', { rect: [7.6, big ? 11.4 : 12.2, 0.9, big ? 2.4 : 1.4] }); add('#f4f1ea', { rect: [11.5, big ? 11.4 : 12.2, 0.9, big ? 2.4 : 1.4] }); }

  }

  // tocado
  const band = c => add(c, { rect: [5, 7.4, 10, 1.3] });
  switch (hd) {
    case 'feather': add(hdc, { poly: [[3.8, 8.6], [10, 2.6], [16.2, 8.6]] }); band(tr); add('#f4f1ea', { line: [14, 6.6, 18.4, 1.6, 1.2] }); break;
    case 'hood': case 'cowl': add(hdc, { ellipse: [10, 6.6, 5.4, 2.8] }); if (hd === 'cowl') add(mix(hdc, '#000000', 0.4), { ellipse: [10, 9.6, 3.6, 1] }); break;
    case 'helmet': case 'horned': case 'kabuto':
      add(hdc, { ellipse: [10, 8, 5.2, 3.6] }); add(hdc, { rect: [4.8, 8, 10.4, 1.4] }); add(hdc, { rect: [9.4, 8, 1.2, 4.2] });
      add(mix(hdc, '#ffffff', 0.35), { rect: [7, 5.4, 2, 0.8] });
      if (hd === 'horned') { add('#efe6d2', { poly: [[5.2, 8], [2, 6.2], [1.4, 1.8], [4.6, 5.6]] }); add('#efe6d2', { poly: [[14.8, 8], [18, 6.2], [18.6, 1.8], [15.4, 5.6]] }); }
      if (hd === 'kabuto') add('#f7c843', { poly: [[7.4, 5.4], [3.6, 0.6], [10, 4.4], [16.4, 0.6], [12.6, 5.4]] });
      break;
    case 'crown': add('#f7c843', { poly: [[5.4, 7.8], [5.4, 3.4], [7.3, 5.6], [10, 2.4], [12.7, 5.6], [14.6, 3.4], [14.6, 7.8]] }); add('#d9343a', { circle: [10, 6.6, 0.9] }); break;
    case 'circlet': add('#f7c843', { rect: [5.2, 7.4, 9.6, 0.9] }); add(tr, { circle: [10, 7.8, 0.9] }); break;
    case 'beret': add(hdc, { ellipse: [9, 6.3, 5.8, 2] }); add(hdc, { rect: [9.5, 3.8, 1, 0.9] }); if (sp.star) add('#d9343a', { star: [7.4, 6.4, 1.4, 0.6, 5, -90] }); break;
    case 'cap': add(hdc, { ellipse: [10, 6.8, 5.4, 2.5] }); add(mix(hdc, '#000000', 0.35), { rect: [4.2, 8, 7.4, 1] }); break;
    case 'bandana': add(hdc, { rect: [5.2, 7, 9.6, 1.8] }); add(hdc, { poly: [[14.4, 7.6], [17.6, 6.2], [17.4, 10]] }); break;
    case 'wizard': add(hdc, { poly: [[3.8, 8.6], [10.6, 0.2], [16.2, 8.6]] }); band(tr); add('#f7c843', { star: [9.6, 4.6, 1.3, 0.5, 5, -90] }); break;
    case 'witch': add(hdc, { ellipse: [10, 8, 7.8, 1.3] }); add(hdc, { poly: [[6.4, 8], [9.2, 0.6], [13.6, 8]] }); add(tr, { rect: [6.8, 6.4, 6.4, 1] }); break;
    case 'turban': add(hdc, { ellipse: [10, 6.6, 5.8, 3.2] }); add(mix(hdc, '#000000', 0.25), { line: [5, 7.6, 14, 4.4, 0.7] }); add(tr, { circle: [10, 6, 0.9] }); break;
    case 'jester': add(hdc, { poly: [[4.4, 8.6], [1.2, 3.2], [8, 6], [10, 3.6], [12, 6], [18.8, 3.2], [15.6, 8.6]] }); add(tr, { poly: [[10, 3.6], [12, 6], [15.6, 8.6], [10, 8.6]] }); add('#f7c843', { circle: [1.4, 3.2, 1] }); add('#f7c843', { circle: [18.6, 3.2, 1] }); break;
    case 'straw': add(hdc, { poly: [[1.6, 8.6], [10, 3.6], [18.4, 8.6]] }); add(mix(hdc, '#000000', 0.25), { rect: [4, 7.8, 12, 0.6] }); break;
    case 'tricorn': add(hdc, { poly: [[2.8, 8.6], [4.8, 4.2], [10, 5.4], [15.2, 4.2], [17.2, 8.6]] }); add(tr, { rect: [3.4, 8, 13.2, 0.7] }); add('#f4f1ea', { circle: [10, 6.6, 0.9] }); break;
    case 'antlers': add('#8a5a2b', { line: [6.4, 6.6, 3, 1, 1] }); add('#8a5a2b', { line: [4.6, 3.6, 2, 3.6, 0.9] }); add('#8a5a2b', { line: [13.6, 6.6, 17, 1, 1] }); add('#8a5a2b', { line: [15.4, 3.6, 18, 3.6, 0.9] }); add('#3aa245', { rect: [6, 6.6, 8, 1] }); break;
    case 'headband': add(hdc, { rect: [5.2, 7.6, 9.6, 1.1] }); break;
    case 'beekeeper':
      add(hdc, { ellipse: [10, 7.4, 8.4, 1.4] }); add(hdc, { ellipse: [10, 5.6, 4.4, 2.6] });
      for (const x of [3, 5, 15, 17]) add(mix(hdc, '#000000', 0.35), { rect: [x, 8.6, 0.6, 5] });
      break;
    case 'flowers': for (const [x, c] of [[6, '#ff5d8f'], [8.4, '#f7c843'], [10.8, '#ff5d8f'], [13.2, '#7ad0ff']]) add(c, { circle: [x, 6.6, 1] }); break;
    default: break;
  }

  // accesorios
  for (const a of acc) {
    if (a === 'glasses') {
      for (const x of [8, 12]) { add('#2a2a2a', { rect: [x - 1.6, 9.4, 3.2, 2.8] }); add('#cfe6ff', { rect: [x - 1, 9.9, 2, 1.8] }); add('#1a1a1a', { rect: [x - 0.5, 10.3, 1, 1] }); }
      add('#2a2a2a', { rect: [9.6, 10, 0.8, 0.6] });
    }
    // gafas de montura delgada: se ven el ojo y la piel a través del lente
    if (a === 'specs') {
      const ec = eye === 'k' ? '#3b2a1a' : eye;
      for (const x of [8, 12]) { add('#1f1f1f', { rect: [x - 1.9, 9.2, 3.8, 2.9] }); add(mix(sk, '#ffffff', 0.2), { rect: [x - 1.3, 10, 2.6, 1] }); add(ec, { rect: [x - (x < 10 ? 0.1 : 0.9), 10.1, 0.9, 0.8] }); }
      add('#1f1f1f', { rect: [9.6, 9.6, 0.8, 0.5] }); add('#1f1f1f', { rect: [4.6, 9.4, 1.4, 0.5] }); add('#1f1f1f', { rect: [14, 9.4, 1.4, 0.5] });
    }
    if (a === 'patch') { add('#1a1a1a', { circle: [8, 10.7, 1.4] }); add('#1a1a1a', { line: [5.2, 8.6, 14.6, 9.6, 0.5] }); }
    if (a === 'scar') add('#8e1b22', { line: [11, 8.6, 13, 12.8, 0.6] });
    if (a === 'earring') add('#f7c843', { circle: [14.6, 12.6, 0.7] });
    if (a === 'paint') { add(tr, { rect: [6.6, 11.8, 2.2, 0.7] }); add(tr, { rect: [11.2, 11.8, 2.2, 0.7] }); }
    if (a === 'pipe') { add('#5a3420', { line: [11, 13.8, 14.2, 14.6, 0.8] }); add('#5a3420', { rect: [13.6, 12.8, 1.4, 1.8] }); }
    if (a === 'flower') { add('#ff5d8f', { circle: [14, 6.8, 1.1] }); add('#f7c843', { rect: [13.6, 6.4, 0.8, 0.8] }); }
    if (a === 'scarf') add(sp.sc || '#d9343a', { poly: [[7, 15.6], [13, 15.6], [11.4, 18.6], [10, 17.4], [8.6, 18.6]] });
    if (a === 'glow') { add(sp.e || '#7ad0ff', { rect: [7.4, 10, 1.2, 1.5] }); add(sp.e || '#7ad0ff', { rect: [11.4, 10, 1.2, 1.5] }); }
    if (a === 'freckles') { add(shade, { rect: [7, 12.2, 0.6, 0.6] }); add(shade, { rect: [12.4, 12.2, 0.6, 0.6] }); }
    if (a === 'book') { add('#8e1b22', { rect: [13, 16.6, 4, 3.4] }); add('#f4f1ea', { rect: [13.4, 17, 0.6, 2.6] }); }
    if (a === 'lute') { add('#8a5a2b', { circle: [4.4, 18.2, 2.2] }); add('#5a3420', { line: [5.6, 17, 8.6, 14.2, 0.8] }); }
    if (a === 'tankard') { add('#8a5a2b', { rect: [13.2, 15.6, 4, 4.4] }); add('#f7c843', { rect: [13.2, 16.8, 4, 0.7] }); add('#f4f1ea', { ellipse: [15.2, 15.4, 2.4, 1] }); add('#8a5a2b', { ring: [18, 17.8, 1.4, 0.5] }); }
    if (a === 'horn') { add('#efe6d2', { poly: [[12.6, 19.8], [14, 16.4], [17.4, 13.2], [19.4, 12.6], [18.6, 15.6], [15.2, 19.8]] }); add('#f7c843', { line: [17.4, 13.2, 19.4, 12.6, 0.9] }); }
    if (a === 'bee') { add('#f7c843', { ellipse: [16.6, 5, 1.6, 1.1] }); add('#1a1a1a', { rect: [16.2, 3.9, 0.6, 2.2] }); add('#f4f1ea', { ellipse: [16.4, 3.4, 1.2, 0.8] }); }
    if (a === 'staff') add('#8a5a2b', { line: [17.6, 20, 17.6, 9, 1] });
    if (a === 'orb') add(sp.e || '#7ad0ff', { circle: [17.6, 9, 1.4] });
  }
  return P;
}

const cache = new Map();
export function portraitURL(spec, ink, open = false, scale = 4) {
  const key = JSON.stringify(spec) + ink + open + scale;
  if (cache.has(key)) return cache.get(key);
  const url = drawGrid(rasterize(portraitPrims(spec, open), 20), { ink, text: '#ffffff' }, scale).toDataURL();
  cache.set(key, url);
  return url;
}
