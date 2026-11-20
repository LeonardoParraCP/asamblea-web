// Sprites pixel art 16x16 generados con primitivas y contorno automático.
// Letras de color: a=acento, b=acento2, l=texto, p=panel, s=sombra, k=tinta,
// w=blanco, y=oro, r=rojo, R=rojo oscuro, g=verde, n=negro, f=piel, h=pelo, '.'=borrar

const FIXED = { w: '#f4f1ea', y: '#f7c843', r: '#d9343a', R: '#8e1b22', g: '#3aa245', n: '#141414', f: '#f1b98a', h: '#5a3420' };

const S = {
  sword: [
    { c: 'l', line: [4, 12, 12.5, 3.5, 1.7] }, { c: 'w', line: [11.5, 4.5, 13.5, 2.5, 1] },
    { c: 'a', line: [2.5, 9.5, 6.5, 13.5, 1.6] }, { c: 'b', line: [3, 13, 1.5, 14.5, 1.6] }, { c: 'y', circle: [1.6, 14.4, 1] },
  ],
  shield: [
    { c: 'a', poly: [[2.5, 2], [13.5, 2], [13.5, 8], [8, 14.5], [2.5, 8]] },
    { c: 'b', poly: [[4.5, 4], [11.5, 4], [11.5, 8], [8, 12.3], [4.5, 8]] },
    { c: 'l', rect: [7.3, 4, 1.4, 8.4] }, { c: 'l', rect: [4.5, 6.3, 7, 1.4] },
  ],
  potion: [
    { c: 'a', circle: [8, 10.3, 4.6] }, { c: 'l', rect: [6.5, 2.5, 3, 4] }, { c: 'b', rect: [6, 1.2, 4, 1.6] },
    { c: 'w', circle: [6.2, 9.2, 1.1] }, { c: 's', rect: [4, 12.5, 8, 1] },
  ],
  skull: [
    { c: 'l', ellipse: [8, 7, 5.6, 5.2] }, { c: 'l', rect: [5, 10, 6, 3.6] },
    { c: 'k', circle: [6, 7.4, 1.4] }, { c: 'k', circle: [10, 7.4, 1.4] },
    { c: 'k', poly: [[8, 9], [7.2, 10.6], [8.8, 10.6]] }, { c: 'k', rect: [6.7, 12, 0.7, 1.6] }, { c: 'k', rect: [8.6, 12, 0.7, 1.6] },
  ],
  tree: [
    { c: 'h', rect: [7, 9.5, 2, 5.5] }, { c: 'a', circle: [8, 6, 4.8] }, { c: 'a', circle: [4.8, 8.5, 3] },
    { c: 'a', circle: [11.2, 8.5, 3] }, { c: 's', rect: [3, 10, 10, 1.2] }, { c: 'l', circle: [6.3, 4.4, 1.1] },
  ],
  castle: [
    { c: 'l', rect: [3, 6, 10, 9] }, { c: 'l', rect: [1.5, 3.5, 3.5, 11.5] }, { c: 'l', rect: [11, 3.5, 3.5, 11.5] },
    { c: 'l', rect: [1.5, 2, 1.2, 1.8] }, { c: 'l', rect: [3.8, 2, 1.2, 1.8] }, { c: 'l', rect: [11, 2, 1.2, 1.8] }, { c: 'l', rect: [13.3, 2, 1.2, 1.8] },
    { c: 'b', rect: [6.5, 10.5, 3, 4.5] }, { c: 'k', rect: [7.4, 7.2, 1.2, 1.6] }, { c: 'a', rect: [7.6, 1, 0.8, 5] }, { c: 'a', poly: [[8.4, 1], [11, 2], [8.4, 3]] },
  ],
  dragon: [
    { c: 'a', poly: [[1.5, 7], [8.5, 3.5], [13, 4], [14.5, 8], [10.5, 9.5], [12.5, 12.5], [7, 13.5], [3.5, 10.5]] },
    { c: 'l', line: [9, 4.5, 6, 1, 1.3] }, { c: 'l', line: [11, 4.5, 10, 1.2, 1.1] },
    { c: 'y', circle: [10.6, 6, 0.9] }, { c: 'k', line: [10.5, 9.3, 14.5, 8.3, 0.8] }, { c: 's', poly: [[3.5, 10.5], [7, 13.5], [5, 13.8]] },
    { c: 'b', rect: [2, 7.5, 1.2, 1.2] },
  ],
  mushroom: [
    { c: 'a', ellipse: [8, 7.5, 6.6, 5] }, { c: '.', rect: [0, 8.2, 16, 8] }, { c: 'l', rect: [6, 8.2, 4, 6] },
    { c: 'w', circle: [5.3, 5.6, 1.1] }, { c: 'w', circle: [9.8, 4.4, 1.3] }, { c: 'w', circle: [11.8, 7, 0.8] },
  ],
  crown: [
    { c: 'y', poly: [[2, 13], [2, 4.5], [5, 8.5], [8, 2.5], [11, 8.5], [14, 4.5], [14, 13]] },
    { c: 'a', rect: [2, 10.8, 12, 2.2] }, { c: 'r', circle: [8, 11.9, 0.9] }, { c: 'b', circle: [4.6, 11.9, 0.8] }, { c: 'b', circle: [11.4, 11.9, 0.8] },
  ],
  star: [{ c: 'y', star: [8, 8.5, 7, 3, 5, -90] }, { c: 'w', circle: [7, 6.5, 0.8] }],
  heart: [
    { c: 'r', circle: [5.3, 6, 3.3] }, { c: 'r', circle: [10.7, 6, 3.3] }, { c: 'r', poly: [[2.2, 7], [13.8, 7], [8, 14]] },
    { c: 'w', circle: [4.6, 5, 1] },
  ],
  crystal: [
    { c: 'a', poly: [[8, 1], [12.5, 6], [8, 15], [3.5, 6]] }, { c: 'b', poly: [[8, 1], [8, 15], [3.5, 6]] },
    { c: 'w', line: [6, 5, 7.3, 3, 0.8] },
  ],
  book: [
    { c: 'a', rect: [3, 2.5, 10, 10.5] }, { c: 'w', rect: [4.5, 12, 8.5, 1.8] }, { c: 's', rect: [3, 2.5, 1.6, 10.5] },
    { c: 'y', star: [8.8, 7.5, 2.8, 1.2, 5, -90] },
  ],
  scroll: [
    { c: 'l', rect: [4, 3, 8, 10] }, { c: 'b', rect: [3, 1.8, 10, 2.2] }, { c: 'b', rect: [3, 12, 10, 2.2] },
    { c: 's', rect: [5.5, 5.5, 5, 0.8] }, { c: 's', rect: [5.5, 7.5, 5, 0.8] }, { c: 's', rect: [5.5, 9.5, 3.5, 0.8] },
  ],
  flame: [
    { c: 'r', poly: [[8, 1], [12.5, 7], [12.5, 11], [8, 15], [3.5, 11], [3.5, 7.5], [6, 9.5]] },
    { c: 'y', poly: [[8, 6], [10.4, 10.5], [8, 14], [5.6, 10.5]] }, { c: 'w', circle: [8, 12, 0.9] },
  ],
  snowflake: [
    { c: 'l', line: [8, 1, 8, 15, 1.3] }, { c: 'l', line: [2, 4.5, 14, 11.5, 1.3] }, { c: 'l', line: [2, 11.5, 14, 4.5, 1.3] },
    { c: 'l', line: [6, 2, 8, 4, 0.9] }, { c: 'l', line: [10, 2, 8, 4, 0.9] }, { c: 'l', line: [6, 14, 8, 12, 0.9] }, { c: 'l', line: [10, 14, 8, 12, 0.9] },
  ],
  moon: [{ c: 'y', circle: [8, 8, 6.2] }, { c: '.', circle: [11.2, 6, 5] }, { c: 'w', circle: [5, 9, 0.7] }],
  sun: [
    { c: 'y', circle: [8, 8, 3.8] }, { c: 'y', line: [8, 0.8, 8, 3, 1.2] }, { c: 'y', line: [8, 13, 8, 15.2, 1.2] },
    { c: 'y', line: [0.8, 8, 3, 8, 1.2] }, { c: 'y', line: [13, 8, 15.2, 8, 1.2] }, { c: 'y', line: [2.6, 2.6, 4.2, 4.2, 1.2] },
    { c: 'y', line: [11.8, 11.8, 13.4, 13.4, 1.2] }, { c: 'y', line: [13.4, 2.6, 11.8, 4.2, 1.2] }, { c: 'y', line: [2.6, 13.4, 4.2, 11.8, 1.2] },
    { c: 'w', circle: [7, 7, 1] },
  ],
  ghost: [
    { c: 'w', circle: [8, 6.5, 5] }, { c: 'w', rect: [3, 6.5, 10, 7] },
    { c: '.', poly: [[3, 14], [4.7, 12], [6.3, 14]] }, { c: '.', poly: [[6.3, 14], [8, 12], [9.7, 14]] }, { c: '.', poly: [[9.7, 14], [11.3, 12], [13, 14]] },
    { c: 'k', circle: [6.3, 6.5, 1] }, { c: 'k', circle: [9.7, 6.5, 1] }, { c: 'a', rect: [7, 9, 2, 1.5] },
  ],
  slime: [
    { c: 'a', ellipse: [8, 10.5, 6.2, 4] }, { c: 'a', poly: [[2.5, 10.5], [8, 3.5], [13.5, 10.5]] },
    { c: 'k', rect: [5.6, 8.5, 1.2, 1.8] }, { c: 'k', rect: [9.2, 8.5, 1.2, 1.8] }, { c: 'w', circle: [6, 6.5, 1] }, { c: 's', rect: [3, 13, 10, 1.2] },
  ],
  chest: [
    { c: 'h', rect: [2, 6.5, 12, 7.5] }, { c: 'b', rect: [2, 3.5, 12, 3.5] }, { c: 'y', rect: [2, 6.5, 12, 1.2] },
    { c: 'y', rect: [7, 6, 2, 3.5] }, { c: 'k', rect: [7.6, 7.6, 0.8, 1.2] }, { c: 'y', rect: [2, 3.5, 1.2, 10.5] }, { c: 'y', rect: [12.8, 3.5, 1.2, 10.5] },
  ],
  key: [
    { c: 'y', ring: [5, 5.5, 3.3, 1.5] }, { c: 'y', line: [7.4, 8, 13.5, 14, 1.6] },
    { c: 'y', line: [11.2, 11.8, 13, 10, 1.3] }, { c: 'y', line: [9.6, 10.2, 11, 8.8, 1.3] },
  ],
  anchor: [
    { c: 'l', ring: [8, 8.5, 5.5, 1.3] }, { c: '.', rect: [0, 0, 16, 9.5] },
    { c: 'l', ring: [8, 3, 1.6, 0.9] }, { c: 'l', line: [8, 4.5, 8, 14, 1.5] }, { c: 'l', line: [4.5, 6.5, 11.5, 6.5, 1.3] },
    { c: 'l', poly: [[1.5, 10], [3.8, 9], [3.8, 11.5]] }, { c: 'l', poly: [[14.5, 10], [12.2, 9], [12.2, 11.5]] },
  ],
  cat: [
    { c: 'a', ellipse: [8, 11.3, 4.5, 3.7] }, { c: 'a', circle: [8, 6, 3.6] },
    { c: 'a', poly: [[4.6, 4.5], [5, 0.8], [7.4, 3]] }, { c: 'a', poly: [[11.4, 4.5], [11, 0.8], [8.6, 3]] },
    { c: 'y', rect: [6, 5.4, 1.2, 1.2] }, { c: 'y', rect: [8.8, 5.4, 1.2, 1.2] }, { c: 'a', line: [12, 14, 14.6, 9, 1.4] },
  ],
  fist: [
    { c: 'f', rect: [3.5, 3.5, 9, 7.5] }, { c: 'k', rect: [5.7, 3.5, 0.6, 3.6] }, { c: 'k', rect: [7.9, 3.5, 0.6, 3.6] }, { c: 'k', rect: [10.1, 3.5, 0.6, 3.6] },
    { c: 'f', rect: [3.5, 7.2, 6.5, 2] }, { c: 'k', rect: [3.5, 7.1, 6.5, 0.6] }, { c: 'a', rect: [5, 11, 6, 4.5] },
  ],
  rose: [
    { c: 'g', line: [8, 8, 8, 15, 1.2] }, { c: 'g', ellipse: [5.6, 11.5, 2.2, 1.1] }, { c: 'g', ellipse: [10.4, 12.5, 2.2, 1.1] },
    { c: 'r', circle: [8, 5.2, 3.8] }, { c: 'R', ring: [8, 5.2, 2, 0.7] }, { c: 'R', rect: [7.5, 4.6, 1, 1] },
  ],
  torch: [
    { c: 'h', line: [8, 15, 8, 8, 2] }, { c: 's', rect: [5.8, 6.3, 4.4, 2.4] },
    { c: 'r', poly: [[8, 0.5], [11, 4], [10.4, 6.3], [5.6, 6.3], [5, 4]] }, { c: 'y', poly: [[8, 2.8], [9.4, 4.8], [8, 6.3], [6.6, 4.8]] },
  ],
  gear: [{ c: 'l', star: [8, 8, 7.4, 5.3, 8, 0] }, { c: 'l', circle: [8, 8, 5.2] }, { c: '.', circle: [8, 8, 2.1] }, { c: 's', ring: [8, 8, 3.6, 0.6] }],
  chain: [
    { c: 'l', ring: [4.8, 8, 3.2, 1.3] }, { c: 'l', ring: [11.2, 8, 3.2, 1.3] }, { c: '.', rect: [7.3, 5, 1.4, 6] },
    { c: 'a', line: [7, 2, 8.4, 4.4, 0.8] }, { c: 'a', line: [9, 14, 7.6, 11.6, 0.8] },
  ],
  megaphone: [
    { c: 'a', poly: [[3.5, 6], [11, 2], [11, 14], [3.5, 10]] }, { c: 'b', rect: [1.5, 6, 2.2, 4] }, { c: 'b', rect: [5, 10, 1.5, 3.5] },
    { c: 'l', line: [13, 6, 13, 10, 0.9] }, { c: 'l', line: [14.8, 4.5, 14.8, 11.5, 0.9] },
  ],
  flag: [
    { c: 'y', line: [2.5, 1, 2.5, 15.5, 1.3] }, { c: 'n', poly: [[3.5, 2], [14, 2], [3.5, 11]] }, { c: 'a', poly: [[14, 2], [14, 11], [3.5, 11]] },
  ],
  acircle: [
    { c: 'a', ring: [8, 8, 6.6, 1.5] }, { c: 'l', line: [8, 1.2, 2.6, 14.8, 1.7] }, { c: 'l', line: [8, 1.2, 13.4, 14.8, 1.7] },
    { c: 'l', line: [3, 10, 13, 10, 1.6] },
  ],
  axe: [
    { c: 'h', line: [4, 15, 11, 2.5, 1.5] }, { c: 'l', poly: [[9.2, 2.4], [14.8, 0.8], [15.2, 7.6], [10.8, 6.6]] },
    { c: 'l', poly: [[8.2, 4.4], [3.4, 2.4], [2.4, 8], [6.6, 7.6]] }, { c: 's', line: [14.8, 1, 15.2, 7.4, 0.7] }, { c: 's', line: [3.4, 2.6, 2.4, 7.8, 0.7] },
    { c: 'a', rect: [9.2, 3.6, 1.6, 1.6] },
  ],
  banner: [
    { c: 'y', line: [3, 1, 3, 15.5, 1.3] }, { c: 'y', circle: [3, 1, 1] }, { c: 'a', poly: [[4, 2], [13.5, 2], [13.5, 13], [8.7, 10], [4, 13]] },
    { c: 'y', circle: [8.7, 6, 2] }, { c: 'b', circle: [8.7, 6, 0.9] },
  ],
  hammer: [
    { c: 'h', line: [8, 6, 8, 15.2, 1.6] }, { c: 'l', rect: [2.5, 1.8, 11, 4.8] }, { c: 's', rect: [7, 1.8, 2, 4.8] }, { c: 'a', rect: [2.5, 1.8, 1.2, 4.8] }, { c: 'a', rect: [12.3, 1.8, 1.2, 4.8] },
  ],
  orb: [
    { c: 'h', line: [4, 15.5, 9.6, 6, 1.4] }, { c: 'y', ring: [11, 4.2, 3.2, 0.8] }, { c: 'a', circle: [11, 4.2, 2.6] }, { c: 'w', circle: [10.2, 3.4, 0.8] },
  ],
  eye: [
    { c: 'w', ellipse: [8, 8, 7.2, 4.2] }, { c: 'a', circle: [8, 8, 3.2] }, { c: 'k', rect: [7.4, 5.2, 1.2, 5.6] }, { c: 'w', rect: [9, 6.3, 0.9, 0.9] },
  ],
  leaf: [
    { c: 'a', poly: [[1.5, 14.5], [3.5, 6.5], [9.5, 2], [14.5, 1.5], [13.5, 8], [9, 13]] }, { c: 's', line: [2.6, 13.4, 12.6, 3.4, 0.9] },
    { c: 's', line: [6, 10, 6.5, 6, 0.6] }, { c: 's', line: [9, 7, 11.5, 7.5, 0.6] },
  ],
  totem: [
    { c: 'h', rect: [5, 1, 6, 14.5] }, { c: 'a', rect: [1.8, 4, 3.4, 2.2] }, { c: 'a', rect: [10.8, 4, 3.4, 2.2] },
    { c: 'y', rect: [6, 3, 1.4, 1.4] }, { c: 'y', rect: [8.6, 3, 1.4, 1.4] }, { c: 'k', rect: [6.5, 6, 3, 1] },
    { c: 'b', rect: [5, 8.5, 6, 1.2] }, { c: 'y', rect: [6, 10.5, 1.4, 1.4] }, { c: 'y', rect: [8.6, 10.5, 1.4, 1.4] }, { c: 'k', rect: [6.5, 13, 3, 1] },
  ],
  helmet: [
    { c: 'l', ellipse: [8, 9, 5, 5.5] }, { c: '.', rect: [0, 14, 16, 2] }, { c: 'k', rect: [4.5, 9.4, 7, 1.1] }, { c: 's', rect: [7.4, 9.4, 1.2, 4.6] },
    { c: 'w', poly: [[3.5, 8], [1, 5], [1, 0.8], [4.5, 5.6]] }, { c: 'w', poly: [[12.5, 8], [15, 5], [15, 0.8], [11.5, 5.6]] },
  ],
  paw: [
    { c: 'a', ellipse: [8, 11, 3.6, 3] }, { c: 'a', circle: [3.8, 6.8, 1.6] }, { c: 'a', circle: [6.6, 4, 1.6] },
    { c: 'a', circle: [9.4, 4, 1.6] }, { c: 'a', circle: [12.2, 6.8, 1.6] },
  ],
  daedric: [{ c: 'r', star: [8, 8, 7.6, 2.2, 4, -90] }, { c: 'a', star: [8, 8, 5, 1.8, 4, -45] }, { c: 'k', circle: [8, 8, 1.6] }, { c: 'y', circle: [8, 8, 0.7] }],
  shout: [
    { c: 'l', ring: [2, 8, 4, 1] }, { c: 'l', ring: [2, 8, 8, 1] }, { c: 'l', ring: [2, 8, 12, 1] }, { c: '.', rect: [0, 0, 3, 16] },
    { c: 'a', circle: [2.5, 8, 1.6] },
  ],
  lute: [
    { c: 'h', circle: [6, 10, 4.2] }, { c: 'k', circle: [6, 10, 1.2] }, { c: 's', line: [8.6, 7.4, 13.6, 2.4, 1.5] },
    { c: 'b', rect: [12.4, 0.8, 2.8, 2.8] }, { c: 'y', line: [3.6, 12.4, 13, 3, 0.4] },
  ],
  // hidromielería
  bee: [
    { c: 'w', ellipse: [6.4, 4.6, 2.6, 2.2] }, { c: 'w', ellipse: [10.4, 4.2, 2.6, 2.2] },
    { c: 'y', ellipse: [8.6, 9.4, 5.2, 3.6] }, { c: 'n', rect: [6.4, 6, 1.6, 7] }, { c: 'n', rect: [9.6, 6, 1.6, 7] },
    { c: 'n', circle: [3.2, 9.4, 2] }, { c: 'n', poly: [[13.4, 8.6], [15.8, 9.4], [13.4, 10.4]] }, { c: 'w', rect: [2.4, 8.6, 0.9, 0.9] },
  ],
  mug: [
    { c: 'h', rect: [2.6, 5, 8.6, 9.6] }, { c: 'y', rect: [2.6, 7, 8.6, 1] }, { c: 'y', rect: [2.6, 12, 8.6, 1] },
    { c: 'h', ring: [12, 9.6, 3.2, 1] }, { c: 'w', ellipse: [6.9, 4.4, 5, 2] }, { c: 'w', circle: [4, 3.6, 1.6] }, { c: 'w', circle: [8.4, 3.2, 1.8] },
    { c: 'a', rect: [4.2, 8.8, 1.2, 2.6] },
  ],
  horn: [
    { c: '#efe6d2', poly: [[1.6, 2], [4.4, 1.6], [8, 6], [12.6, 9.4], [14.6, 9], [14.8, 13.6], [10.6, 13.2], [6, 9.6]] },
    { c: 'y', poly: [[12.6, 9.4], [14.6, 9], [14.8, 13.6], [12.8, 13.4]] }, { c: 'a', line: [6.6, 7.2, 8.4, 5.4, 1.2] },
    { c: 'h', line: [1.6, 2, 4.4, 1.6, 1] }, { c: 'b', ellipse: [13.8, 11.2, 0.8, 2] },
  ],
  barrel: [
    { c: 'h', ellipse: [8, 8.4, 5.6, 7] }, { c: 'k', rect: [2.4, 4.4, 11.2, 1] }, { c: 'k', rect: [2.4, 11.6, 11.2, 1] },
    { c: 's', rect: [5.4, 2, 0.8, 13] }, { c: 's', rect: [9.8, 2, 0.8, 13] }, { c: 'y', circle: [8, 8.2, 1.4] }, { c: 'a', rect: [7.4, 9.2, 1.2, 3] },
  ],
  honey: [
    { c: 'y', poly: [[8, 1], [14, 4.4], [14, 11.2], [8, 14.6], [2, 11.2], [2, 4.4]] },
    { c: '#e0a020', poly: [[8, 4.2], [11.2, 6], [11.2, 9.6], [8, 11.4], [4.8, 9.6], [4.8, 6]] },
    { c: 'w', rect: [6.2, 6, 1, 1.4] }, { c: '#e0a020', line: [11.6, 11, 11.6, 15, 1.4] }, { c: '#e0a020', circle: [11.6, 15, 1] },
  ],
  quill: [
    { c: 'w', poly: [[4.5, 11.5], [9, 3], [14.5, 1], [12, 7], [6, 12.5]] }, { c: 's', line: [2, 14.5, 12, 3.5, 0.8] }, { c: 'k', line: [1.5, 15, 3.5, 12.6, 1] },
  ],
  house: [
    { c: 'a', poly: [[1, 8], [8, 1.5], [15, 8]] }, { c: 'l', rect: [2.8, 7.5, 10.4, 7.5] }, { c: 'b', rect: [6.6, 10, 2.8, 5] },
    { c: 'k', rect: [3.8, 9, 2, 2] }, { c: 'k', rect: [10.2, 9, 2, 2] }, { c: 's', rect: [11, 2.5, 1.8, 3.5] },
  ],
  bolt: [{ c: 'y', poly: [[9.5, 0.5], [3, 9], [7.4, 9], [5.5, 15.5], [13, 6.5], [8.6, 6.5], [11, 0.5]] }, { c: 'w', line: [8.6, 2, 6, 6, 0.6] }],
  dice: [
    { c: 'a', poly: [[8, 0.8], [14.2, 4.4], [14.2, 11.6], [8, 15.2], [1.8, 11.6], [1.8, 4.4]] },
    { c: 'b', poly: [[8, 4], [12, 11], [4, 11]] }, { c: 'l', line: [8, 4, 8, 0.8, 0.5] }, { c: 'l', line: [12, 11, 14.2, 11.6, 0.5] }, { c: 'l', line: [4, 11, 1.8, 11.6, 0.5] },
  ],
  flower: [
    { c: 'a', circle: [8, 3.8, 2.6] }, { c: 'a', circle: [12, 6.8, 2.6] }, { c: 'a', circle: [10.5, 11.6, 2.6] },
    { c: 'a', circle: [5.5, 11.6, 2.6] }, { c: 'a', circle: [4, 6.8, 2.6] }, { c: 'y', circle: [8, 8, 2.1] },
  ],
  wave: [
    { c: 'a', poly: [[0.5, 15.5], [0.5, 9], [4, 4.5], [9, 3], [12.5, 5], [10, 6.5], [9, 9], [12, 11], [15.5, 10], [15.5, 15.5]] },
    { c: 'w', line: [4.5, 5, 10, 3.8, 0.9] }, { c: 'w', line: [10.4, 6.6, 12.4, 5.2, 0.8] }, { c: 'b', rect: [0.5, 13.5, 15, 2] },
  ],
  portal: [{ c: 'r', ring: [8, 8, 6.4, 2] }, { c: 'y', circle: [8, 8, 4.3] }, { c: 'a', ring: [8, 8, 2.6, 0.8] }, { c: 'k', circle: [8, 8, 1.1] }],
  fish: [
    { c: 'a', ellipse: [7, 8, 5.2, 3.6] }, { c: 'a', poly: [[11, 8], [15.2, 4], [15.2, 12]] }, { c: 'b', poly: [[5, 4.6], [8.5, 1.8], [9.5, 4.6]] },
    { c: 'w', circle: [4.3, 7, 1.2] }, { c: 'k', rect: [4, 6.8, 0.8, 0.8] }, { c: 'k', line: [2, 9.6, 4, 9.6, 0.6] },
  ],
  // Andariego: bicicleta, banderín de meta y marcador
  bike: [
    { c: 'l', ring: [3.8, 11, 3.4, 1] }, { c: 'l', ring: [12.2, 11, 3.4, 1] }, { c: 'y', circle: [3.8, 11, 0.7] }, { c: 'y', circle: [12.2, 11, 0.7] },
    { c: 'a', line: [3.8, 11, 7.2, 11, 1.1] }, { c: 'a', line: [7.2, 11, 5.6, 6.2, 1.1] }, { c: 'a', line: [3.8, 11, 5.6, 6.6, 1] },
    { c: 'a', line: [5.6, 6.6, 10.6, 6.6, 1.1] }, { c: 'a', line: [7.2, 11, 10.6, 6.6, 1.1] }, { c: 'a', line: [10.6, 6.6, 12.2, 11, 1.1] },
    { c: 'a', line: [10.4, 6.6, 9.8, 4.4, 1] }, { c: 'b', line: [9, 4, 12, 4, 1.2] }, { c: 'b', rect: [4, 4.8, 3.2, 1.2] },
  ],
  goal: [
    { c: 'l', rect: [3.5, 1.5, 1.4, 13.5] }, { c: 'a', poly: [[4.9, 2], [14, 4.5], [4.9, 8]] }, { c: 'b', rect: [2, 14, 5, 1.5] },
  ],
  pin: [
    { c: 'a', circle: [8, 6.5, 5] }, { c: 'a', poly: [[3.6, 8.5], [8, 15.5], [12.4, 8.5]] }, { c: 'w', circle: [8, 6.5, 2] },
  ],
};

// Retratos de los presentadores (A = Juglar con sombrero, B = Juglaresa)
const HOSTS = {
  A: [
    { c: 'a', rect: [2, 13, 12, 3] }, { c: 'f', circle: [8, 8.5, 4.2] },
    { c: 'a', poly: [[2.5, 6], [8, 1], [13.5, 6]] }, { c: 'b', rect: [2.5, 5, 11, 1.6] }, { c: 'w', line: [12, 4.5, 15, 0.8, 1] },
    { c: 'k', rect: [6, 7.6, 1.2, 1.4] }, { c: 'k', rect: [8.8, 7.6, 1.2, 1.4] },
  ],
  B: [
    { c: 'h', circle: [8, 7.5, 5.4] }, { c: 'h', rect: [2.6, 7.5, 10.8, 6.5] }, { c: 'a', rect: [2, 13, 12, 3] },
    { c: 'f', circle: [8, 8.7, 3.9] }, { c: 'b', rect: [3, 3.6, 10, 1.4] }, { c: 'y', circle: [12.2, 4.3, 1] },
    { c: 'k', rect: [6, 7.9, 1.2, 1.4] }, { c: 'k', rect: [8.8, 7.9, 1.2, 1.4] },
  ],
};
const MOUTH = { closed: [{ c: 'k', rect: [7, 10.8, 2, 0.8] }], open: [{ c: 'R', rect: [6.8, 10.4, 2.4, 1.8] }] };

function inside(p, x, y) {
  if (p.rect) { const [rx, ry, w, h] = p.rect; return x >= rx && x < rx + w && y >= ry && y < ry + h; }
  if (p.circle) { const [cx, cy, r] = p.circle; return (x - cx) ** 2 + (y - cy) ** 2 <= r * r; }
  if (p.ellipse) { const [cx, cy, rx, ry] = p.ellipse; return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1; }
  if (p.ring) { const [cx, cy, r, t] = p.ring; const d = Math.hypot(x - cx, y - cy); return d <= r && d >= r - t * 1.4; }
  if (p.line) {
    const [x1, y1, x2, y2, w] = p.line; const dx = x2 - x1, dy = y2 - y1; const L = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / L));
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)) <= w / 2 + 0.15;
  }
  if (p.poly || p.star) {
    let pts = p.poly;
    if (p.star) {
      const [cx, cy, R, r, n, rot] = p.star; pts = [];
      for (let i = 0; i < n * 2; i++) { const a = (rot + (i * 180) / n) * Math.PI / 180; const rr = i % 2 ? r : R; pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    }
    let ins = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ins = !ins;
    }
    return ins;
  }
  return false;
}

export function rasterize(prims, size = 16) {
  const g = Array.from({ length: size }, () => Array(size).fill('.'));
  for (const p of prims) for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (inside(p, x + 0.5, y + 0.5)) g[y][x] = p.c;
  // contorno automático
  const o = g.map(r => r.slice());
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (g[y][x] !== '.') continue;
    if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => g[y + dy]?.[x + dx] && g[y + dy][x + dx] !== '.' && g[y + dy][x + dx] !== 'k')) o[y][x] = 'K';
  }
  return o;
}

export function drawGrid(grid, pal, scale = 1) {
  const size = grid.length;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size * scale;
  const ctx = cv.getContext('2d');
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const c = grid[y][x]; if (c === '.') continue;
    ctx.fillStyle = c === 'K' ? pal.ink : c[0] === '#' ? c : (pal[c] || FIXED[c] || pal.text);
    ctx.fillRect(x * scale, y * scale, scale, scale);
  }
  return cv;
}

const cache = new Map();
export function spriteURL(name, pal, scale = 4) {
  const key = name + JSON.stringify(pal) + scale;
  if (cache.has(key)) return cache.get(key);
  const grid = rasterize(S[name] || S.star);
  const url = drawGrid(grid, spritePal(pal), scale).toDataURL();
  cache.set(key, url);
  return url;
}

export function hostURL(host, pal, open, scale = 4) {
  const key = 'host' + host + open + JSON.stringify(pal) + scale;
  if (cache.has(key)) return cache.get(key);
  const grid = rasterize([...HOSTS[host], ...(open ? MOUTH.open : MOUTH.closed)]);
  const url = drawGrid(grid, spritePal(pal), scale).toDataURL();
  cache.set(key, url);
  return url;
}

function spritePal(p) {
  return { a: p.accent, b: p.accent2, l: p.text, p: p.panel, s: p.shadow, k: p.ink, ink: p.ink, text: p.text };
}

export const SPRITE_NAMES = Object.keys(S);
