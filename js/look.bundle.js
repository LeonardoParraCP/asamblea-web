/* Generado por tools/bundle-look.mjs desde web/js/look/ — no editar a mano. GPL-3.0-or-later */
(() => {
'use strict';
const M = {};
M['skins-consultoria'] = (() => {
// 50 skins de consultoría empresarial: sobrias, en pixel art, con modos claros y oscuros.
// [nombre, emblema, patrón, fondo, panel, acento, texto, acento2]
const CONSULTORIA = [
  ['Junta Directiva', 'quill', 'plain', '#0f1724', '#1b2638', '#c9a96e', '#eef1f6', '#7f8ea8'],
  ['Azul Ejecutivo', 'book', 'grid', '#0b1f3a', '#13305a', '#5fa8ff', '#eaf2ff', '#c9a227'],
  ['Grafito y Oro', 'key', 'plain', '#141414', '#232323', '#c9a96e', '#f2efe8', '#8a8a8a'],
  ['Marfil Notarial', 'scroll', 'plain', '#f4efe3', '#fffaf0', '#7a5c1e', '#1f1a12', '#0b2545'],
  ['Papel Bond', 'quill', 'grid', '#eceff3', '#ffffff', '#1f4e8c', '#14181f', '#8a6a1f'],
  ['Ministerial', 'banner', 'plain', '#101a2b', '#1a2840', '#e0b04a', '#edf1f7', '#c0392b'],
  ['Parlamento', 'castle', 'dither', '#1a0f14', '#2c1a22', '#c98a9a', '#f6ecef', '#c9a96e'],
  ['Policy Brief', 'book', 'scan', '#f2f5f8', '#ffffff', '#00658f', '#10202b', '#d08a1c'],
  ['Verde Sostenible', 'leaf', 'plain', '#0d1f17', '#163225', '#5fc28f', '#e9f6ef', '#d9b44a'],
  ['Pizarra', 'gear', 'grid', '#1c232b', '#28323d', '#8fb3d9', '#e8eef4', '#d9a24a'],
  ['Arena Corporativa', 'chest', 'plain', '#efe6d6', '#faf5ec', '#8a5a1e', '#22190f', '#2f5b8f'],
  ['Borgoña Legal', 'shield', 'plain', '#1f0d12', '#33161e', '#d98a9a', '#f8edf0', '#c9a96e'],
  ['Petróleo', 'anchor', 'dither', '#0a1d22', '#123038', '#4fc1c9', '#e6f5f6', '#e0b04a'],
  ['Índigo Analítico', 'eye', 'grid', '#11122b', '#1c1e44', '#8f96ff', '#eceeff', '#ffc857'],
  ['Cobre Industrial', 'hammer', 'plain', '#1c120c', '#2e1e14', '#d98a4a', '#f7eee6', '#8fb3d9'],
  ['Oro DEMOS', 'crown', 'plain', '#0a0a0a', '#161616', '#c9a96e', '#f4f1ea', '#92761f'],
  ['Noche Institucional', 'star', 'plain', '#0b1222', '#141f38', '#fca311', '#e5e5e5', '#5fa8ff'],
  ['Tinta y Papel', 'quill', 'scan', '#f6f4ef', '#ffffff', '#222222', '#111111', '#9a2a2a'],
  ['Carbón', 'key', 'plain', '#101010', '#1c1c1c', '#5fa8ff', '#ededed', '#c9a96e'],
  ['Niebla Bogotana', 'house', 'dither', '#e3e7ec', '#f3f5f8', '#3d5a80', '#1a222c', '#b5651d'],
  ['Océano Ejecutivo', 'wave', 'plain', '#071a2c', '#0e2c48', '#48b5e8', '#e6f3fb', '#f2c14e'],
  ['Bosque Andino', 'tree', 'plain', '#0e1a12', '#18291d', '#7cc48a', '#eaf4ec', '#c9a96e'],
  ['Vino Tinto', 'rose', 'plain', '#1c0b10', '#2e131b', '#e07a8f', '#f7ebee', '#d9b44a'],
  ['Ciruela', 'orb', 'dither', '#1a1020', '#2a1a34', '#b98ad9', '#f3ecf8', '#e0b04a'],
  ['Salvia', 'leaf', 'plain', '#eef2ec', '#fbfcfa', '#3f6b4a', '#18221b', '#8a6a1f'],
  ['Acero', 'gear', 'scan', '#161b21', '#222932', '#9fb4c8', '#eaeff4', '#e0a84a'],
  ['Cielo Claro', 'sun', 'plain', '#e9f3fb', '#ffffff', '#1f6fb0', '#10202e', '#c0392b'],
  ['Mostaza Consultora', 'scroll', 'plain', '#1a160a', '#2a2412', '#e0b83a', '#f6f1df', '#5fa8ff'],
  ['Terracota', 'house', 'plain', '#f3e7df', '#fdf8f4', '#a8482a', '#24150f', '#2f5b8f'],
  ['Lavanda Sobria', 'flower', 'plain', '#ecebf5', '#fbfbff', '#5a4f9e', '#17142a', '#b5651d'],
  ['Menta Datos', 'gear', 'grid', '#e8f4f0', '#fbfefd', '#1f7a62', '#0f211b', '#c0392b'],
  ['Alto Contraste', 'eye', 'plain', '#000000', '#0d0d0d', '#ffd400', '#ffffff', '#00b7ff'],
  ['Auditoría', 'key', 'grid', '#f5f5f2', '#ffffff', '#2d4a6b', '#141a20', '#8a1f1f'],
  ['Fiduciaria', 'chest', 'plain', '#0d1610', '#16241b', '#8fd19e', '#eaf5ec', '#c9a96e'],
  ['Banca Central', 'castle', 'scan', '#0f1420', '#192233', '#b8c7e0', '#eef2f8', '#d9b44a'],
  ['Cámara de Comercio', 'banner', 'plain', '#1a1208', '#2a1e0f', '#e8a94a', '#f7efe2', '#3f8fd9'],
  ['Gremio Empresarial', 'shield', 'grid', '#102030', '#183048', '#6fb3e0', '#eaf3fa', '#e0b04a'],
  ['Foro Económico', 'star', 'plain', '#f0f2f5', '#ffffff', '#0b3d91', '#0c1424', '#c9a227'],
  ['Comité Técnico', 'gear', 'plain', '#1a1d22', '#262a31', '#7fd1c1', '#eceff2', '#f2a541'],
  ['Asamblea de Accionistas', 'crown', 'dither', '#140f1e', '#221a33', '#c9b06e', '#f3f0f8', '#8f96ff'],
  ['Secretaría General', 'quill', 'plain', '#e9e4da', '#f8f5ef', '#5a3e1e', '#1c150c', '#1f4e8c'],
  ['Relatoría', 'book', 'scan', '#121820', '#1c2430', '#e8c66b', '#eef1f5', '#6ab0ff'],
  ['Minuta Gris', 'scroll', 'plain', '#2a2d31', '#363a3f', '#d0d4d9', '#f4f5f6', '#e0a84a'],
  ['Pasantía Azul', 'flag', 'plain', '#eaf0f8', '#ffffff', '#2457a6', '#0d1830', '#d0661c'],
  ['Medianoche Legal', 'shield', 'plain', '#06080f', '#0f1320', '#c9a96e', '#e9ecf3', '#9a2a2a'],
  ['Sala de Juntas', 'chest', 'grid', '#1e1712', '#2c221a', '#d9b98a', '#f5efe8', '#7fa8d9'],
  ['Presidencia', 'crown', 'plain', '#0a1430', '#122050', '#ffd166', '#f2f4fa', '#ef476f'],
  ['Contraloría', 'eye', 'plain', '#101820', '#18242f', '#62c3a0', '#e8f2ee', '#e0b04a'],
  ['Planeación', 'gear', 'dither', '#f2f0ea', '#fdfcf8', '#6b4f1e', '#1a160c', '#2d6a8f'],
  ['Gobierno Abierto', 'house', 'plain', '#0c1c1c', '#142c2c', '#5fd1c9', '#e8f6f5', '#ffc857'],
];

return { CONSULTORIA };
})();
M['skins-data'] = (() => {
// [nombre, emblema, patrón, fondo, panel, acento, texto, acento2]
// Los skins de WoW y Elder Scrolls son tributos de fans: arte original, sin recursos oficiales.

const RPG = [
  ['Taberna del Juglar', 'lute', 'bricks', '#2b1a12', '#4a2e1f', '#f2a541', '#f6e7c8', '#c0392b'],
  ['Bosque Encantado', 'tree', 'grass', '#0e2416', '#1c4228', '#7bd36b', '#e8f6d4', '#f2d16b'],
  ['Mazmorra Oscura', 'skull', 'bricks', '#121216', '#25252e', '#9b8cff', '#e4e2f0', '#ff6b6b'],
  ['Desierto de Arena', 'sun', 'dots', '#3a2a14', '#6b4d24', '#ffcf5c', '#fff3d6', '#e07a3f'],
  ['Tundra Helada', 'snowflake', 'snow', '#0f1d2e', '#1f3a57', '#8fd8ff', '#eaf7ff', '#c9b6ff'],
  ['Volcán Ardiente', 'flame', 'lava', '#1f0a06', '#42160d', '#ff7a29', '#ffe6cf', '#ffd23f'],
  ['Pantano Brumoso', 'slime', 'dots', '#11180f', '#26331f', '#a3c75a', '#e4ecd0', '#7b5ea7'],
  ['Océano Profundo', 'anchor', 'waves', '#06192b', '#0e3150', '#3ed1c8', '#dff7f7', '#ffd166'],
  ['Castillo Real', 'castle', 'bricks', '#1b1b2f', '#2e2e52', '#ffd166', '#f2efe6', '#ef476f'],
  ['Portátil Clásica 4 Tonos', 'star', 'grid', '#0f380f', '#306230', '#8bac0f', '#9bbc0f', '#e0f8a0'],
  ['Consola 8 Bits', 'sword', 'checker', '#000000', '#1d2b53', '#ff004d', '#fff1e8', '#29adff'],
  ['Cartucho 16 Bits', 'crystal', 'stripes', '#1a1033', '#33215c', '#ff77a8', '#fdf6ff', '#29adff'],
  ['Monitor Ámbar', 'scroll', 'scan', '#120b00', '#241600', '#ffb000', '#ffcf66', '#ff8800'],
  ['Terminal Verde', 'book', 'scan', '#001100', '#002a00', '#33ff66', '#b6ffc4', '#00cc44'],
  ['Synthwave', 'sun', 'grid', '#14001f', '#2b0a3d', '#ff3ea5', '#ffe9ff', '#3ef0ff'],
  ['Ciudad Cyberpunk', 'eye', 'grid', '#0a0a12', '#1a1a2e', '#f9f002', '#e8e8ff', '#00f0ff'],
  ['Vaporwave', 'crystal', 'checker', '#2a1b3d', '#44318d', '#ff9de2', '#fff0fb', '#7afcff'],
  ['Cementerio', 'ghost', 'cross', '#101114', '#23252b', '#b4c7a1', '#e6e8e3', '#8f7bb5'],
  ['Jardín Sakura', 'flower', 'dots', '#2a1520', '#4d2638', '#ff9ec7', '#fff0f6', '#9be38b'],
  ['Barco Pirata', 'anchor', 'waves', '#1a1410', '#3b2b1f', '#e8b04a', '#f7ecd8', '#c94a3a'],
  ['Aldea Ninja', 'star', 'stripes', '#111111', '#2b2b2b', '#e63946', '#f1f1f1', '#a8dadc'],
  ['Dojo Samurái', 'sword', 'scales', '#1c1210', '#3a2420', '#d62828', '#f4ead5', '#fcbf49'],
  ['Cabaña de la Bruja', 'potion', 'stars', '#140e1f', '#2b1d40', '#b06bff', '#efe3ff', '#7cff6b'],
  ['Torre del Nigromante', 'skull', 'runes', '#0b0b0f', '#1d1a24', '#6bff9e', '#dfe9e3', '#b31d3a'],
  ['Templo del Paladín', 'shield', 'cross', '#1d1a12', '#3d3524', '#ffe08a', '#fffaf0', '#6aa9ff'],
  ['Círculo Druida', 'leaf', 'grass', '#132017', '#26402c', '#c3e88d', '#f1f8e6', '#e0a85a'],
  ['Gremio de Bardos', 'lute', 'checker', '#23131c', '#452534', '#ffb86b', '#fdeee2', '#6bd5ff'],
  ['Cueva de Cristal', 'crystal', 'dots', '#0e0f22', '#1e2147', '#6bf1ff', '#e6fbff', '#ff7ad9'],
  ['Mina de Enanos', 'hammer', 'bricks', '#1a1410', '#33281e', '#ff9f43', '#f3e6d6', '#b0b7c3'],
  ['Bosque Élfico', 'leaf', 'stars', '#0d1a1a', '#183333', '#7ae0b0', '#e9fff6', '#f4d35e'],
  ['Reino Hongo', 'mushroom', 'dots', '#1e1022', '#3b1f44', '#ff5c7a', '#fff2f6', '#ffd166'],
  ['Isla del Tesoro', 'chest', 'waves', '#0d2233', '#12425e', '#ffc93c', '#fdf7e3', '#3ec1d3'],
  ['Fortaleza de Hielo', 'crown', 'snow', '#0a1622', '#183247', '#b8ecff', '#f2fbff', '#7f8cff'],
  ['Infierno Pixel', 'flame', 'lava', '#170404', '#3a0b0b', '#ff3b3b', '#ffe0d6', '#ffb627'],
  ['Cielo Nocturno', 'moon', 'stars', '#070b1f', '#141c3d', '#ffe066', '#e8ecff', '#9b8cff'],
  ['Amanecer', 'sun', 'stripes', '#2e1a2b', '#5a2f45', '#ffb35c', '#fff4e6', '#ff6f91'],
  ['Slime Verde', 'slime', 'dots', '#0e1a10', '#1d3a22', '#5cff8a', '#e8ffee', '#ffd65c'],
  ['Cofre Dorado', 'chest', 'checker', '#1b140a', '#3a2b12', '#ffcc33', '#fff6dc', '#e8553b'],
  ['Biblioteca Arcana', 'book', 'runes', '#160f0a', '#2f2116', '#e3b261', '#f5ead8', '#6bb8ff'],
  ['Pergamino Antiguo', 'scroll', 'plain', '#e9d8b4', '#f5e9cc', '#8a4b1f', '#2e1c0e', '#3b6e8f'],
  ['Papel Cuadriculado', 'book', 'grid', '#e6eaf0', '#ffffff', '#2f6fd6', '#1b2333', '#e94f37'],
  ['Nieve Clara', 'snowflake', 'snow', '#d6e8f7', '#f4f9ff', '#2f6fc0', '#14263d', '#e0702f'],
  ['Pradera', 'tree', 'grass', '#cfe8b8', '#eaf5dc', '#2f7a2a', '#1d2b16', '#c98a12'],
  ['Arena Dorada', 'sun', 'dots', '#f1dfb2', '#fbf0d4', '#b0560f', '#3a2510', '#2f8f9d'],
  ['Mar Caribe', 'wave', 'waves', '#04303f', '#075e70', '#ffd23f', '#e8fbff', '#ff6b6b'],
  ['Ruinas Antiguas', 'castle', 'bricks', '#1e1c17', '#3b3830', '#c7b07b', '#efe9da', '#7fa36b'],
  ['Fantasma Azul', 'ghost', 'scan', '#070d1c', '#13213d', '#7fb8ff', '#e3eeff', '#ff9de2'],
  ['Caballero Negro', 'helmet', 'scales', '#0c0c0c', '#222222', '#c0c0c0', '#f0f0f0', '#b3202a'],
  ['Dragón Rojo', 'dragon', 'scales', '#1a0707', '#3d1010', '#ff4d3a', '#ffe8e0', '#ffc93c'],
  ['Dragón Verde', 'dragon', 'scales', '#08180c', '#143320', '#5ad16b', '#e6f8e9', '#e8d44d'],
  ['Dragón Azul', 'dragon', 'scales', '#050f24', '#0f2550', '#4da3ff', '#e2efff', '#c0f0ff'],
  ['Fénix', 'flame', 'stars', '#1c0b02', '#3d1a06', '#ffa62b', '#fff1dc', '#ff4e50'],
  ['Lunar', 'moon', 'dots', '#0f0f1a', '#1f1f36', '#c8c8ff', '#f0f0ff', '#ffe8a3'],
  ['Rey Esqueleto', 'skull', 'cross', '#151313', '#2c2727', '#e8dcc2', '#f7f1e3', '#a83232'],
  ['Mercader', 'key', 'checker', '#1a1712', '#362f24', '#d4af37', '#f6efdc', '#6b9e6b'],
  ['Herrero', 'sword', 'bricks', '#161210', '#2e2520', '#ff7b3a', '#f2e6dc', '#9aa5b1'],
  ['Alquimista', 'potion', 'runes', '#0f1416', '#1f2c30', '#42f5b3', '#e3f7f2', '#f5d442'],
  ['Arquero del Bosque', 'leaf', 'stripes', '#12180e', '#26321c', '#b5d65c', '#eef4dc', '#c9844a'],
  ['Hechicero Azul', 'orb', 'stars', '#0a0e25', '#18204a', '#5c7cff', '#e4e9ff', '#ffd75c'],
  ['Gema Rubí', 'crystal', 'dots', '#1a050b', '#3a0d19', '#ff3366', '#ffe3ea', '#ffd1dc'],
  ['Gema Esmeralda', 'crystal', 'dots', '#04170f', '#0b3322', '#2ee88a', '#e0fff0', '#b0ffd8'],
  ['Gema Zafiro', 'crystal', 'dots', '#040b1f', '#0c1d45', '#3388ff', '#e0ecff', '#b8d6ff'],
  ['Gema Amatista', 'crystal', 'dots', '#12061c', '#27103b', '#b45cff', '#f3e6ff', '#e3c2ff'],
  ['Llave Maestra', 'key', 'grid', '#121212', '#262626', '#ffd23f', '#f5f5f5', '#4ecdc4'],
  ['Dados del Destino', 'dice', 'checker', '#0f141a', '#1e2833', '#ff6b6b', '#f2f5f8', '#feca57'],
  ['Corazón Valiente', 'heart', 'dots', '#1c0a10', '#3a1420', '#ff4d6d', '#ffe5ea', '#ffd166'],
  ['Estrella Fugaz', 'star', 'stars', '#080a1a', '#151a3a', '#ffe45c', '#eef0ff', '#7cf3ff'],
  ['Tormenta Eléctrica', 'bolt', 'stripes', '#0c0f1a', '#1c2236', '#ffee55', '#e9edf7', '#7fa7ff'],
  ['Atardecer Retro', 'sun', 'stripes', '#1d0f24', '#3d1c3f', '#ff8c42', '#fff0e0', '#ffd23f'],
  ['Héroe Legendario', 'sword', 'checker', '#0d1626', '#1c2e4a', '#4fc3ff', '#eef6ff', '#ffd23f'],
];

const ANARQUISTA = [
  ['Bandera Negra', 'flag', 'stripes', '#0a0a0a', '#1a1a1a', '#e8e8e8', '#f2f2f2', '#777777'],
  ['Negro y Rojo', 'flag', 'diag', '#0b0b0b', '#1c1c1c', '#e10600', '#f5f5f5', '#ff6f61'],
  ['A Circulada', 'acircle', 'dither', '#0d0d0d', '#1f1f1f', '#ff2a2a', '#f2f2f2', '#ffffff'],
  ['Kropotkin · Apoyo Mutuo', 'book', 'grid', '#121010', '#2a2323', '#d9302c', '#f3ece4', '#e6b655'],
  ['Bakunin', 'torch', 'bricks', '#0f0c0c', '#261d1d', '#ff4a3d', '#f6eee6', '#ffb347'],
  ['Emma Goldman', 'rose', 'dots', '#120a0e', '#2a1520', '#e8435a', '#fbeef2', '#b388ff'],
  ['Durruti 1936', 'star', 'stripes', '#0c0c0c', '#232020', '#d62828', '#f4efe6', '#f6bd60'],
  ['Ejército Negro (Majnó)', 'flag', 'diag', '#070707', '#191919', '#c9c9c9', '#eeeeee', '#9e2a2b'],
  ['Comuna de París 1871', 'banner', 'bricks', '#160b0b', '#321717', '#e63946', '#f8edeb', '#457b9d'],
  ['Mujeres Libres', 'fist', 'dots', '#140a14', '#2c1530', '#c04cfd', '#f8eaff', '#ff4d6d'],
  ['Federica Montseny', 'quill', 'plain', '#121010', '#29211e', '#e05a47', '#f5ebe0', '#e6c07b'],
  ['Lucy Parsons', 'megaphone', 'stripes', '#0f0b0b', '#251a1a', '#ff3c38', '#f7efe6', '#a3c4f3'],
  ['Tierra y Libertad (Flores Magón)', 'sun', 'grass', '#0f0d07', '#2a2414', '#e63b2e', '#f6efd8', '#8bbf4a'],
  ['Malatesta', 'book', 'bricks', '#100d0d', '#282020', '#c1121f', '#fdf0d5', '#669bbc'],
  ['Proudhon', 'quill', 'grid', '#0e0e10', '#222228', '#d63c3c', '#ecebf3', '#b8b8c8'],
  ['Ateneo Libertario', 'book', 'checker', '#0d0b0b', '#241e1e', '#e04545', '#f2e9e1', '#f4c95d'],
  ['Okupa', 'house', 'bricks', '#0b0b0b', '#1e1e1e', '#ff2e63', '#f0f0f0', '#08d9d6'],
  ['Punk Hazlo Tú Mismo', 'acircle', 'checker', '#050505', '#161616', '#ff1f8f', '#ffffff', '#c6ff00'],
  ['Anarcosindicalismo', 'gear', 'bricks', '#0b0909', '#1f1a1a', '#d3212d', '#f2ede6', '#ffb000'],
  ['Ecoanarquismo', 'leaf', 'grass', '#070b07', '#142014', '#3ddc53', '#edf7ec', '#bfff8a'],
  ['Anarcofeminismo', 'fist', 'dots', '#0c0710', '#221329', '#a855f7', '#f6edff', '#ff4f8b'],
  ['Anarcopacifismo', 'flower', 'plain', '#101010', '#262626', '#f5f5f5', '#fafafa', '#7aa7ff'],
  ['Gato Salvaje', 'cat', 'stripes', '#080808', '#1c1c1c', '#ff3333', '#f4f4f4', '#ffcc00'],
  ['Rosa Negra', 'rose', 'dots', '#0a0607', '#1f1214', '#ff2e4d', '#f7e8ea', '#b06bff'],
  ['Huerto Comunitario', 'leaf', 'grass', '#0c120a', '#1d2a17', '#8fd14f', '#eef6e4', '#e86a33'],
  ['Barcelona 1936', 'flag', 'stripes', '#110c0c', '#2a1e1e', '#e4312b', '#f9efe4', '#f3c13a'],
  ['Aragón Colectivizado', 'sun', 'grass', '#120f08', '#2c2614', '#d94032', '#f6eedb', '#e9c46a'],
  ['Kronstadt 1921', 'anchor', 'waves', '#070a10', '#141b2a', '#e63946', '#edf2f7', '#8ab4f8'],
  ['Haymarket 1886', 'torch', 'bricks', '#0d0b0a', '#241f1c', '#ff5a36', '#f5ede6', '#ffd166'],
  ['Primero de Mayo', 'fist', 'stripes', '#0f0606', '#2b0f0f', '#ff3b3b', '#fff0ec', '#ffd700'],
  ['Ni Dios Ni Amo', 'chain', 'dither', '#0a0a0a', '#1b1b1b', '#ff3d3d', '#f1f1f1', '#9a9a9a'],
  ['Apoyo Mutuo', 'heart', 'dots', '#0f0a0a', '#261a1a', '#ff5d5d', '#faeeee', '#ffcf56'],
  ['Solidaridad Obrera', 'gear', 'grid', '#0d0d0d', '#222222', '#e83f3f', '#efefef', '#f2a541'],
  ['Antifascismo', 'flag', 'diag', '#080808', '#1a1a1a', '#ff2d2d', '#f2f2f2', '#ff8a8a'],
  ['Anarco Queer', 'heart', 'stripes', '#0b0710', '#1f142b', '#ff4fd8', '#fff0fb', '#7cf5ff'],
  ['Biblioteca Libertaria', 'book', 'runes', '#0e0b0a', '#26201c', '#e2524a', '#f4eadf', '#e8c27a'],
  ['Imprenta Clandestina', 'quill', 'scan', '#0b0b0b', '#1d1d1d', '#ff4d4d', '#e9e9e9', '#c9b37e'],
  ['Radio Pirata', 'megaphone', 'scan', '#070707', '#191919', '#39ff14', '#eaffea', '#ff2e2e'],
  ['Escuela Moderna (Ferrer i Guàrdia)', 'book', 'grid', '#100e0b', '#2a251e', '#db3a34', '#f7efe2', '#84b59f'],
  ['Comuna Libre', 'house', 'checker', '#0c0b0b', '#221f1f', '#ef4444', '#f5f0eb', '#22c55e'],
  ['Huelga General', 'gear', 'stripes', '#0b0909', '#221b1b', '#ff3030', '#f5eded', '#ffbf00'],
  ['Barricada', 'flag', 'bricks', '#0d0a08', '#2a211a', '#ff4b2b', '#f7ece3', '#ffb347'],
  ['Fanzine', 'quill', 'checker', '#ebe6dc', '#ffffff', '#c41e16', '#111111', '#333333'],
  ['Cooperativa', 'gear', 'dots', '#0e0e0b', '#25251c', '#e85d3c', '#f4f1e4', '#8cc152'],
  ['Autogestión', 'house', 'grid', '#0c0c0c', '#202020', '#ff5555', '#f0f0f0', '#55ddff'],
  ['Zona Autónoma Temporal', 'star', 'dither', '#08060c', '#1a1424', '#ff3e7f', '#f3ecff', '#ffe14d'],
  ['Anarres (Le Guin)', 'moon', 'stars', '#0b0c10', '#1c1f2a', '#e94e3c', '#eaeaf0', '#c5c6ff'],
  ['Louise Michel', 'rose', 'dots', '#0d0909', '#261819', '#e4473f', '#f7ebe9', '#b9a1ff'],
  ['Voltairine de Cleyre', 'quill', 'stripes', '#0e0b10', '#251d2a', '#d94b6a', '#f6edf5', '#e3c37a'],
  ['Rojinegra Clara', 'acircle', 'diag', '#efe9e2', '#ffffff', '#b80f26', '#111111', '#000000'],
];

const WOW = [
  ['Horda', 'axe', 'scales', '#1a0806', '#3b130d', '#c41e3a', '#f5e3d6', '#f2b134'],
  ['Alianza', 'banner', 'checker', '#070f24', '#13234a', '#2f6bff', '#eef2ff', '#ffd24a'],
  ['Ventormenta', 'castle', 'bricks', '#0d1424', '#1d2b4a', '#3f78ff', '#f0f4ff', '#f2c94c'],
  ['Orgrimmar', 'axe', 'bricks', '#1c0d07', '#3c1d10', '#e04a1f', '#f6e6d6', '#f0a43a'],
  ['Forjaz', 'hammer', 'bricks', '#15110c', '#2e251a', '#ff9a3c', '#f4e9d8', '#9aa6b2'],
  ['Darnassus', 'moon', 'stars', '#0b0e20', '#191f45', '#a58cff', '#ece9ff', '#7ae0c0'],
  ['Entrañas', 'skull', 'cross', '#0b100b', '#182218', '#7cff4f', '#e4ede1', '#8c6bb1'],
  ['Cima del Trueno', 'totem', 'grass', '#17110a', '#33261a', '#e3a857', '#f6ead6', '#6fb3e0'],
  ['Lunargenta', 'flame', 'stripes', '#1a0a0a', '#3a1515', '#ff4d3d', '#fff0e0', '#f7c948'],
  ['El Exodar', 'crystal', 'grid', '#0a0c1f', '#1b1f45', '#8a7dff', '#eceaff', '#5ce1ff'],
  ['Rasganorte', 'snowflake', 'snow', '#08121c', '#142a3d', '#8ad4ff', '#ebf7ff', '#c2d6e6'],
  ['Corona de Hielo', 'crown', 'snow', '#060c18', '#12203a', '#5ec8ff', '#e6f4ff', '#a7b4c9'],
  ['Rey Exánime', 'helmet', 'runes', '#050a14', '#101c33', '#79d7ff', '#e3efff', '#5a6f96'],
  ['Terrallende', 'crystal', 'dither', '#0e0716', '#241338', '#6aff3e', '#eee6ff', '#c13dff'],
  ['Shattrath', 'sun', 'checker', '#1a1508', '#3a3012', '#ffd84a', '#fff7dc', '#7fd1ff'],
  ['Pandaria', 'leaf', 'waves', '#0e1a14', '#1f3a2b', '#4fcf8a', '#effaf2', '#e9554a'],
  ['Draenor', 'axe', 'grass', '#14100a', '#2d2416', '#ff8c2e', '#f3e9d9', '#7ab86a'],
  ['Legión Ardiente', 'eye', 'lava', '#0b0f05', '#1b260b', '#8cff2e', '#edf8dc', '#ff4b2e'],
  ['Argus', 'eye', 'stars', '#0e0612', '#24102e', '#ff3df2', '#fbe6ff', '#7cff4f'],
  ['Tierras Sombrías', 'ghost', 'runes', '#070b14', '#121c2e', '#6fe3ff', '#e1ecf7', '#b37cff'],
  ['Ardenal', 'mushroom', 'stars', '#0b0a1c', '#1a1a3a', '#9b7cff', '#efeaff', '#6bffd0'],
  ['Bastión', 'shield', 'checker', '#12161f', '#26304a', '#fff1a8', '#fafcff', '#7ab8ff'],
  ['Maldraxxus', 'skull', 'scales', '#0b1408', '#1a2d14', '#7ee36a', '#e8f5e3', '#c2453b'],
  ['Revendreth', 'crystal', 'bricks', '#150608', '#2e0e14', '#e8374f', '#f9e6ea', '#c09bd8'],
  ['Islas Dragón', 'dragon', 'scales', '#0d1218', '#1c2a36', '#ff7b54', '#f2f5f8', '#5ad2c0'],
  ['Clase Guerrero', 'sword', 'bricks', '#1a120b', '#362719', '#c69b6d', '#f5ecdf', '#b33a3a'],
  ['Clase Paladín', 'hammer', 'checker', '#1f1520', '#3d2a40', '#f48cba', '#fff0f7', '#ffd84a'],
  ['Clase Cazador', 'paw', 'stripes', '#121a0d', '#25361b', '#aad372', '#eef6e2', '#c58a4a'],
  ['Clase Pícaro', 'sword', 'dither', '#121209', '#2a2a14', '#fff468', '#f8f8e2', '#8a8a8a'],
  ['Clase Sacerdote', 'sun', 'plain', '#16161c', '#2c2c38', '#f5f5f5', '#ffffff', '#ffd84a'],
  ['Clase Chamán', 'totem', 'waves', '#050f22', '#0f2147', '#2f8cff', '#e5efff', '#5ad7ff'],
  ['Clase Mago', 'orb', 'stars', '#08141e', '#13293d', '#3fc7eb', '#e6f8fd', '#c69bff'],
  ['Clase Brujo', 'flame', 'runes', '#0f0a18', '#22163a', '#8788ee', '#ecebff', '#7cff4f'],
  ['Clase Druida', 'paw', 'grass', '#1a0f05', '#36200d', '#ff7c0a', '#fff0e0', '#7bc96f'],
  ['Caballero de la Muerte', 'skull', 'runes', '#120406', '#2c0b10', '#e0304e', '#f6e3e6', '#8ad4ff'],
  ['Clase Monje', 'fist', 'checker', '#08160f', '#12301f', '#00ff98', '#e6fff4', '#ffd84a'],
  ['Cazador de Demonios', 'eye', 'lava', '#12051a', '#2b0c3b', '#c050e8', '#f5e6ff', '#8cff2e'],
  ['Clase Evocador', 'dragon', 'scales', '#071514', '#10302d', '#3fb89c', '#e3f7f3', '#ffb84a'],
  ['Bosque de Elwynn', 'tree', 'grass', '#0e1a0c', '#1f3a1a', '#8bd65a', '#eff8e6', '#f2c94c'],
  ['Durotar', 'sun', 'dots', '#1f0f06', '#42200d', '#e8742c', '#fbeadb', '#c94040'],
  ['Tuercespina', 'leaf', 'grass', '#071a0f', '#0f3a22', '#3ee07a', '#e5fbea', '#ffcf3f'],
  ['Tanaris', 'sun', 'dots', '#2a1d0b', '#523a17', '#ffc46b', '#fff4de', '#e06b3a'],
  ["Cráter de Un'Goro", 'dragon', 'grass', '#0f1a08', '#233a12', '#c6ff4f', '#f1fbe0', '#ff8a3d'],
  ['Dun Morogh', 'snowflake', 'snow', '#0e141c', '#1d2a3a', '#b9d9f0', '#f2f8fd', '#ff9a3c'],
  ['Karazhan', 'moon', 'stars', '#0d0818', '#1f1438', '#b38cff', '#efe8ff', '#6be0ff'],
  ['Núcleo de Magma', 'flame', 'lava', '#1a0503', '#3d0e07', '#ff5a1f', '#ffe5d6', '#ffd23f'],
  ['Templo Oscuro', 'eye', 'runes', '#0d0812', '#1f1428', '#9e4dff', '#f1e8ff', '#6aff7a'],
  ['Ulduar', 'gear', 'grid', '#0d1218', '#1c2834', '#6fc2ff', '#e8f3fb', '#ffd36b'],
  ['Múrloc', 'fish', 'waves', '#04181a', '#0a3338', '#4ad3c4', '#e6faf8', '#ff8c69'],
  ['Posada de Villadorada', 'lute', 'bricks', '#1c120b', '#3a2616', '#ffb347', '#f9ecdb', '#7db3ff'],
];

const TES = [
  ['Skyrim', 'dragon', 'snow', '#0c0f12', '#1c2228', '#c9d1d9', '#eef1f4', '#b08a52'],
  ['Morrowind', 'mushroom', 'dots', '#17110a', '#33261a', '#d9a05b', '#f5ead8', '#7fb069'],
  ['Oblivion', 'portal', 'lava', '#160606', '#340f0f', '#ff4a1c', '#fbe4d8', '#ffc23d'],
  ['Cyrodiil', 'crown', 'checker', '#121008', '#2a2614', '#d4b04a', '#f6f0dc', '#6a8fb5'],
  ['Carrera Blanca', 'castle', 'grass', '#10140c', '#232c1a', '#d8c48a', '#f4efdf', '#6f9e5a'],
  ['Soledad', 'castle', 'waves', '#0c1219', '#1a2735', '#b0c4de', '#eef3f8', '#d4a74a'],
  ['Ventalia', 'snowflake', 'snow', '#0b1016', '#18222e', '#8fb3d9', '#edf3f9', '#5b8ec5'],
  ['Riften', 'key', 'dither', '#11100a', '#26241a', '#c9a227', '#f2eedc', '#9c7c5a'],
  ['Markarth', 'gear', 'bricks', '#16100a', '#312316', '#d98b3a', '#f6e9da', '#a6b0b8'],
  ['Alto Hrothgar', 'shout', 'snow', '#0f1318', '#222a33', '#e5edf5', '#f7fafc', '#9aa8b6'],
  ['Sovngarde', 'helmet', 'stars', '#0a0d1a', '#171d38', '#ffd76b', '#eef0ff', '#7fc8ff'],
  ['Apocrypha', 'book', 'runes', '#070d08', '#121f13', '#8ae66b', '#e6f3e1', '#5e9b57'],
  ['Príncipes Daédricos', 'daedric', 'lava', '#120505', '#2c0c0c', '#e83a2a', '#f7e2de', '#c02a2a'],
  ['Ruinas Dwemer', 'gear', 'grid', '#150f08', '#30230f', '#e0a94a', '#f7ecd6', '#8a9a8a'],
  ['Vvardenfell', 'mushroom', 'dots', '#1a0f08', '#3a2010', '#ff7a3a', '#f8e6d6', '#b06bff'],
  ['Balmora', 'house', 'bricks', '#1c160c', '#3a2e18', '#e0c07a', '#f8f1e0', '#c5754a'],
  ['Vivec', 'moon', 'stars', '#0f0d18', '#221d36', '#e8c85c', '#f4eefc', '#6ab8ff'],
  ['Montaña Roja', 'flame', 'lava', '#1a0606', '#3a1010', '#ff4a3a', '#fde3dd', '#ff9e3a'],
  ['Seyda Neen', 'wave', 'waves', '#0b140f', '#1a2c22', '#9cc77a', '#edf5e8', '#c9b26a'],
  ['Casa Telvanni', 'mushroom', 'stars', '#0f0a16', '#22163a', '#c27cff', '#f1e8fb', '#7cf0b0'],
  ['Casa Hlaalu', 'key', 'checker', '#17130a', '#332a16', '#ffd25c', '#f8f0da', '#6aa86a'],
  ['Casa Redoran', 'shield', 'bricks', '#180b07', '#36180f', '#d9653a', '#f8e6dc', '#c9a84a'],
  ['Kvatch', 'castle', 'lava', '#140808', '#301414', '#ff6b3a', '#f8e7df', '#ffd166'],
  ['Islas Temblorosas', 'mushroom', 'checker', '#120a1a', '#2a1638', '#ff5cd1', '#fdeffa', '#5cffb5'],
  ['Manía', 'flower', 'dots', '#1a0e14', '#3a1c2c', '#ff8ad8', '#fff0fa', '#ffe45c'],
  ['Demencia', 'skull', 'dither', '#0a0c0f', '#181d24', '#6f8bff', '#e3e8f2', '#8cff9e'],
  ['Hermandad Oscura', 'sword', 'dither', '#0b0606', '#1d0e0e', '#d81f3a', '#efe1e3', '#777777'],
  ['Gremio de Ladrones', 'key', 'plain', '#0e0e0b', '#23231b', '#c8a84a', '#ecebe2', '#8f8a7a'],
  ['Los Compañeros', 'paw', 'bricks', '#120d09', '#2a1f16', '#c97b3a', '#f4e9de', '#9fb7c9'],
  ['Colegio de Hibernalia', 'orb', 'snow', '#070d1a', '#12203a', '#63a8ff', '#e5efff', '#c7a8ff'],
  ['Thalmor', 'eye', 'checker', '#0a0f0a', '#16241a', '#ffd34a', '#f4f7ee', '#2e9e5a'],
  ['Capas de la Tormenta', 'banner', 'snow', '#0a0f18', '#162236', '#5a8ed2', '#eaf1fa', '#c4d4e6'],
  ['Legión Imperial', 'banner', 'checker', '#160a0a', '#2e1414', '#d93636', '#f6e6e6', '#d4b04a'],
  ['Sangre de Dragón', 'dragon', 'scales', '#0c0a0a', '#211c1c', '#e05a3a', '#f3ece8', '#e8c85c'],
  ['El Devorador de Mundos', 'dragon', 'lava', '#0a0606', '#1e0f0f', '#ff3a2a', '#f3e0dc', '#8a8a8a'],
  ['Ojo de Magnus', 'orb', 'stars', '#080b1f', '#141c45', '#7ad9ff', '#e6f4ff', '#ffd36b'],
  ['Solstheim', 'mushroom', 'snow', '#0f1214', '#20262a', '#a6c9a0', '#eef3ee', '#c97b3a'],
  ['Falmer', 'eye', 'dither', '#0a0c10', '#161b22', '#8ac8d6', '#e2eef1', '#7a8b9a'],
  ['Ennegrecida', 'mushroom', 'stars', '#05080f', '#0e1626', '#4ae0ff', '#dff6fb', '#b37cff'],
  ['Elsweyr', 'paw', 'dots', '#1f1508', '#3f2c12', '#ffb84a', '#fff2dc', '#e0573a'],
  ['Ciénaga Negra', 'slime', 'waves', '#07120a', '#11261a', '#6ad66a', '#e2f3e2', '#c9a84a'],
  ['Valenwood', 'tree', 'grass', '#0a160a', '#163016', '#9bd65a', '#ecf8e3', '#c98b4a'],
  ['Summerset', 'crystal', 'checker', '#12100a', '#2c2814', '#ffe27a', '#fffbea', '#6ad1a5'],
  ['Páramo del Martillo', 'sword', 'dots', '#1f1208', '#42260f', '#ff9b3a', '#fbecdc', '#3fa7c9'],
  ['Roca Alta', 'castle', 'grass', '#0d120f', '#1b2a22', '#6fa88a', '#ebf3ee', '#c9a84a'],
  ['Orsinium', 'hammer', 'bricks', '#0f140b', '#212c18', '#8fbf4a', '#eef3e3', '#b8b8b8'],
  ['Daggerfall', 'sword', 'checker', '#0e0e14', '#1e1e2c', '#9a8cff', '#ececf6', '#d4b04a'],
  ['Arena Imperial', 'shield', 'bricks', '#140f0a', '#2c2216', '#d9a24a', '#f7eedf', '#c9443a'],
  ['Dios de la Locura', 'crown', 'checker', '#160a18', '#2e1434', '#b45cff', '#f8eaff', '#ff5c5c'],
  ['Pergamino Arcano', 'scroll', 'runes', '#1a140a', '#362a16', '#e8c66b', '#f7efda', '#6ab0ff'],
];

const toObj = (cat, prefix) => (r, i) => ({
  id: `${prefix}-${String(i + 1).padStart(2, '0')}`,
  cat, name: r[0], emblem: r[1], pattern: r[2], bg: r[3], panel: r[4], accent: r[5], text: r[6], accent2: r[7],
});


// Cyberpunk neón: fondos casi negros, neón magenta, cian, ácido y ámbar
const CYBER = [
  ['Neón de Medianoche', 'eye', 'grid', '#05010d', '#120726', '#ff2bd6', '#f4e9ff', '#00f0ff'],
  ['Lluvia Ácida', 'bolt', 'scan', '#020a06', '#08201a', '#39ff14', '#e6ffe0', '#ff2e88'],
  ['Distrito Holograma', 'crystal', 'diag', '#06061a', '#13133d', '#00e5ff', '#e8fbff', '#b14dff'],
  ['Mercado Negro Neón', 'chain', 'checker', '#0d0208', '#2a0718', '#ff3864', '#ffe6ee', '#fcee0a'],
  ['Implante Cromado', 'gear', 'stripes', '#07090c', '#171d26', '#9be7ff', '#eef6fb', '#ff5edb'],
  ['Bar de Androides', 'orb', 'dots', '#0b0014', '#22003d', '#d300ff', '#fbe9ff', '#00ffc6'],
  ['Red Fantasma', 'portal', 'scan', '#000c10', '#00232e', '#00ffd5', '#dcfffa', '#ff6b00'],
  ['Ciudad sin Sol', 'skull', 'grid', '#100004', '#2b000c', '#ff0040', '#ffe3e8', '#00b3ff'],
  ['Arcade Clandestino', 'star', 'checker', '#080014', '#1d0b3a', '#fcee0a', '#fffbe0', '#ff2bd6'],
  ['Autopista de Datos', 'flame', 'waves', '#00040f', '#041640', '#2979ff', '#e3ecff', '#ff9e00'],
];

// Hidromielería: miel, cera, roble, fogón y cuernos de brindis (arte original)
const HIDROMIEL = [
  ['Gran Salón del Hidromiel', 'horn', 'comb', '#1e1208', '#3a2410', '#f2b134', '#f7e6c4', '#c4472a'],
  ['Colmena Dorada', 'bee', 'comb', '#2a1c05', '#4d340c', '#ffc61a', '#fff4d1', '#d9603a'],
  ['Barrica de Roble', 'barrel', 'stripes', '#1d120b', '#3b2516', '#d98c3a', '#f3e2cc', '#8fb84a'],
  ['Cuerno del Brindis', 'horn', 'runes', '#160f0a', '#33231a', '#e8c27a', '#f6ead6', '#d8434b'],
  ['Melomel de Mora', 'mug', 'dots', '#1a0a14', '#36142b', '#e0609f', '#f6e2ee', '#f2b134'],
  ['Cyser de Manzana', 'mug', 'dots', '#13180a', '#2b3814', '#e6c84a', '#f1f4dd', '#e8513f'],
  ['Hidromiel de Especias', 'flame', 'dither', '#1f0e06', '#41200f', '#e8823a', '#fbe8d4', '#8fc46f'],
  ['Braggot de Cebada', 'barrel', 'grass', '#1a1408', '#352a12', '#d4ad52', '#f3ebd2', '#7fa84a'],
  ['Piment de Uva', 'mug', 'diag', '#14061a', '#2c0f38', '#b06ce0', '#f1e6f8', '#f2b134'],
  ['Hidromiel de Arce', 'leaf', 'stripes', '#1f0d06', '#40190b', '#e86d2e', '#fbe5d4', '#f2c14e'],
  ['Cera de Vela', 'torch', 'plain', '#f3e3c0', '#e6cf9e', '#8a4b12', '#2b1a08', '#b8323a'],
  ['Panal al Amanecer', 'honey', 'comb', '#fbefcf', '#f1dca5', '#a35f00', '#2a1a05', '#4f7a22'],
  ['Fogón del Salón', 'flame', 'bricks', '#1b0905', '#3d140b', '#ff8c2a', '#ffe9d6', '#ffd23f'],
  ['Runas de la Cosecha', 'honey', 'runes', '#0f120a', '#232a15', '#d6b23a', '#eef0dc', '#a77de8'],
  ['Abejas Nocturnas', 'bee', 'stars', '#0b0d1a', '#1b2040', '#ffc93c', '#eef0ff', '#7ad0ff'],
  ['Bodega Subterránea', 'barrel', 'bricks', '#100c0a', '#241b16', '#c49461', '#efe3d6', '#5fa86b'],
  ['Taberna de la Escarcha', 'mug', 'snow', '#0c1622', '#1b2f45', '#f2c14e', '#eaf5ff', '#8fd8ff'],
  ['Prado de Flores Melíferas', 'flower', 'grass', '#0f1d0e', '#20391c', '#f5d547', '#eef8e0', '#ee77b0'],
  ['Banquete de la Larga Mesa', 'crown', 'checker', '#1a0f08', '#38200f', '#e9b949', '#f8ecd6', '#3fb0a2'],
  ['Sello de Cera Roja', 'honey', 'scales', '#1c0607', '#3d0d10', '#ec5a5a', '#fbe1dc', '#f2b134'],
];

const CATEGORIES = [
  { id: 'rpg', name: 'Pixel RPG', count: RPG.length },
  { id: 'anarquista', name: 'Anarquistas', count: ANARQUISTA.length },
  { id: 'wow', name: 'Tributo WoW', count: WOW.length },
  { id: 'tes', name: 'Tributo Elder Scrolls', count: TES.length },
  { id: 'cyber', name: 'Cyberpunk neón', count: CYBER.length },
  { id: 'hidromiel', name: 'Hidromielería', count: HIDROMIEL.length },
];

const SKINS = [
  ...RPG.map(toObj('rpg', 'rpg')),
  ...ANARQUISTA.map(toObj('anarquista', 'anq')),
  ...WOW.map(toObj('wow', 'wow')),
  ...TES.map(toObj('tes', 'tes')),
  ...CYBER.map(toObj('cyber', 'cyb')),
  ...HIDROMIEL.map(toObj('hidromiel', 'hid')),
];

return { CATEGORIES, SKINS };
})();
M['sprites'] = (() => {
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

function rasterize(prims, size = 16) {
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

function drawGrid(grid, pal, scale = 1) {
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
function spriteURL(name, pal, scale = 4) {
  const key = name + JSON.stringify(pal) + scale;
  if (cache.has(key)) return cache.get(key);
  const grid = rasterize(S[name] || S.star);
  const url = drawGrid(grid, spritePal(pal), scale).toDataURL();
  cache.set(key, url);
  return url;
}

function hostURL(host, pal, open, scale = 4) {
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

const SPRITE_NAMES = Object.keys(S);

return { rasterize, drawGrid, spriteURL, hostURL, SPRITE_NAMES };
})();
M['skin-engine'] = (() => {
const {SKINS} = M['skins-data'];
const {spriteURL} = M['sprites'];

const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); };
const lum = h => { const [r, g, b] = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

function ensure(fg, bg, min) {
  if (contrast(fg, bg) >= min) return fg;
  const target = lum(bg) > 0.4 ? '#000000' : '#ffffff';
  for (let t = 0.1; t <= 1; t += 0.1) { const c = mix(fg, target, t); if (contrast(c, bg) >= min) return c; }
  return target;
}

function palette(s) {
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

function patternURL(name, pal, scale = 3) {
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

const PATTERNS = Object.keys(P);

function getSkin(id) { return SKINS.find(s => s.id === id) || SKINS[0]; }

function applySkin(id, root = document.documentElement) {
  const s = getSkin(id);
  const pal = palette(s);
  const st = root.style;
  for (const [k, v] of Object.entries(pal)) if (typeof v === 'string') st.setProperty('--' + k, v);
  st.setProperty('--pattern', `url(${patternURL(s.pattern, pal)})`);
  st.setProperty('--emblem', `url(${spriteURL(s.emblem, pal, 4)})`);
  root.dataset.light = pal.light ? '1' : '0';
  return { skin: s, pal };
}

return { mix, contrast, palette, patternURL, PATTERNS, getSkin, applySkin };
})();
M['fonts-data'] = (() => {
// Generado por tools/build_fonts.py
const FONTS = [
{
"id": "001-pergamino-bloque",
"name": "Pergamino Bloque",
"base": "Pergamino",
"shape": "Bloque",
"mod": "Normal",
"file": "fonts/px/001-pergamino-bloque.woff",
"crisp": 8
},
{
"id": "002-pergamino-bloque-negrita",
"name": "Pergamino Bloque Negrita",
"base": "Pergamino",
"shape": "Bloque",
"mod": "Negrita",
"file": "fonts/px/002-pergamino-bloque-negrita.woff",
"crisp": 8
},
{
"id": "003-pergamino-bloque-cursiva",
"name": "Pergamino Bloque Cursiva",
"base": "Pergamino",
"shape": "Bloque",
"mod": "Cursiva",
"file": "fonts/px/003-pergamino-bloque-cursiva.woff",
"crisp": 8
},
{
"id": "004-pergamino-bloque-ancha",
"name": "Pergamino Bloque Ancha",
"base": "Pergamino",
"shape": "Bloque",
"mod": "Ancha",
"file": "fonts/px/004-pergamino-bloque-ancha.woff",
"crisp": 8
},
{
"id": "005-pergamino-perla",
"name": "Pergamino Perla",
"base": "Pergamino",
"shape": "Perla",
"mod": "Normal",
"file": "fonts/px/005-pergamino-perla.woff",
"crisp": 8
},
{
"id": "006-pergamino-perla-negrita",
"name": "Pergamino Perla Negrita",
"base": "Pergamino",
"shape": "Perla",
"mod": "Negrita",
"file": "fonts/px/006-pergamino-perla-negrita.woff",
"crisp": 8
},
{
"id": "007-pergamino-perla-cursiva",
"name": "Pergamino Perla Cursiva",
"base": "Pergamino",
"shape": "Perla",
"mod": "Cursiva",
"file": "fonts/px/007-pergamino-perla-cursiva.woff",
"crisp": 8
},
{
"id": "008-pergamino-perla-ancha",
"name": "Pergamino Perla Ancha",
"base": "Pergamino",
"shape": "Perla",
"mod": "Ancha",
"file": "fonts/px/008-pergamino-perla-ancha.woff",
"crisp": 8
},
{
"id": "009-pergamino-gema",
"name": "Pergamino Gema",
"base": "Pergamino",
"shape": "Gema",
"mod": "Normal",
"file": "fonts/px/009-pergamino-gema.woff",
"crisp": 8
},
{
"id": "010-pergamino-gema-negrita",
"name": "Pergamino Gema Negrita",
"base": "Pergamino",
"shape": "Gema",
"mod": "Negrita",
"file": "fonts/px/010-pergamino-gema-negrita.woff",
"crisp": 8
},
{
"id": "011-pergamino-gema-cursiva",
"name": "Pergamino Gema Cursiva",
"base": "Pergamino",
"shape": "Gema",
"mod": "Cursiva",
"file": "fonts/px/011-pergamino-gema-cursiva.woff",
"crisp": 8
},
{
"id": "012-pergamino-gema-ancha",
"name": "Pergamino Gema Ancha",
"base": "Pergamino",
"shape": "Gema",
"mod": "Ancha",
"file": "fonts/px/012-pergamino-gema-ancha.woff",
"crisp": 8
},
{
"id": "013-pergamino-arcade",
"name": "Pergamino Arcade",
"base": "Pergamino",
"shape": "Arcade",
"mod": "Normal",
"file": "fonts/px/013-pergamino-arcade.woff",
"crisp": 8
},
{
"id": "014-pergamino-arcade-negrita",
"name": "Pergamino Arcade Negrita",
"base": "Pergamino",
"shape": "Arcade",
"mod": "Negrita",
"file": "fonts/px/014-pergamino-arcade-negrita.woff",
"crisp": 8
},
{
"id": "015-pergamino-arcade-cursiva",
"name": "Pergamino Arcade Cursiva",
"base": "Pergamino",
"shape": "Arcade",
"mod": "Cursiva",
"file": "fonts/px/015-pergamino-arcade-cursiva.woff",
"crisp": 8
},
{
"id": "016-pergamino-arcade-ancha",
"name": "Pergamino Arcade Ancha",
"base": "Pergamino",
"shape": "Arcade",
"mod": "Ancha",
"file": "fonts/px/016-pergamino-arcade-ancha.woff",
"crisp": 8
},
{
"id": "017-pergamino-mosaico",
"name": "Pergamino Mosaico",
"base": "Pergamino",
"shape": "Mosaico",
"mod": "Normal",
"file": "fonts/px/017-pergamino-mosaico.woff",
"crisp": 8
},
{
"id": "018-pergamino-mosaico-negrita",
"name": "Pergamino Mosaico Negrita",
"base": "Pergamino",
"shape": "Mosaico",
"mod": "Negrita",
"file": "fonts/px/018-pergamino-mosaico-negrita.woff",
"crisp": 8
},
{
"id": "019-pergamino-mosaico-cursiva",
"name": "Pergamino Mosaico Cursiva",
"base": "Pergamino",
"shape": "Mosaico",
"mod": "Cursiva",
"file": "fonts/px/019-pergamino-mosaico-cursiva.woff",
"crisp": 8
},
{
"id": "020-pergamino-mosaico-ancha",
"name": "Pergamino Mosaico Ancha",
"base": "Pergamino",
"shape": "Mosaico",
"mod": "Ancha",
"file": "fonts/px/020-pergamino-mosaico-ancha.woff",
"crisp": 8
},
{
"id": "021-runa-bloque",
"name": "Runa Bloque",
"base": "Runa",
"shape": "Bloque",
"mod": "Normal",
"file": "fonts/px/021-runa-bloque.woff",
"crisp": 6
},
{
"id": "022-runa-bloque-negrita",
"name": "Runa Bloque Negrita",
"base": "Runa",
"shape": "Bloque",
"mod": "Negrita",
"file": "fonts/px/022-runa-bloque-negrita.woff",
"crisp": 6
},
{
"id": "023-runa-bloque-cursiva",
"name": "Runa Bloque Cursiva",
"base": "Runa",
"shape": "Bloque",
"mod": "Cursiva",
"file": "fonts/px/023-runa-bloque-cursiva.woff",
"crisp": 6
},
{
"id": "024-runa-bloque-ancha",
"name": "Runa Bloque Ancha",
"base": "Runa",
"shape": "Bloque",
"mod": "Ancha",
"file": "fonts/px/024-runa-bloque-ancha.woff",
"crisp": 6
},
{
"id": "025-runa-perla",
"name": "Runa Perla",
"base": "Runa",
"shape": "Perla",
"mod": "Normal",
"file": "fonts/px/025-runa-perla.woff",
"crisp": 6
},
{
"id": "026-runa-perla-negrita",
"name": "Runa Perla Negrita",
"base": "Runa",
"shape": "Perla",
"mod": "Negrita",
"file": "fonts/px/026-runa-perla-negrita.woff",
"crisp": 6
},
{
"id": "027-runa-perla-cursiva",
"name": "Runa Perla Cursiva",
"base": "Runa",
"shape": "Perla",
"mod": "Cursiva",
"file": "fonts/px/027-runa-perla-cursiva.woff",
"crisp": 6
},
{
"id": "028-runa-perla-ancha",
"name": "Runa Perla Ancha",
"base": "Runa",
"shape": "Perla",
"mod": "Ancha",
"file": "fonts/px/028-runa-perla-ancha.woff",
"crisp": 6
},
{
"id": "029-runa-gema",
"name": "Runa Gema",
"base": "Runa",
"shape": "Gema",
"mod": "Normal",
"file": "fonts/px/029-runa-gema.woff",
"crisp": 6
},
{
"id": "030-runa-gema-negrita",
"name": "Runa Gema Negrita",
"base": "Runa",
"shape": "Gema",
"mod": "Negrita",
"file": "fonts/px/030-runa-gema-negrita.woff",
"crisp": 6
},
{
"id": "031-runa-gema-cursiva",
"name": "Runa Gema Cursiva",
"base": "Runa",
"shape": "Gema",
"mod": "Cursiva",
"file": "fonts/px/031-runa-gema-cursiva.woff",
"crisp": 6
},
{
"id": "032-runa-gema-ancha",
"name": "Runa Gema Ancha",
"base": "Runa",
"shape": "Gema",
"mod": "Ancha",
"file": "fonts/px/032-runa-gema-ancha.woff",
"crisp": 6
},
{
"id": "033-runa-arcade",
"name": "Runa Arcade",
"base": "Runa",
"shape": "Arcade",
"mod": "Normal",
"file": "fonts/px/033-runa-arcade.woff",
"crisp": 6
},
{
"id": "034-runa-arcade-negrita",
"name": "Runa Arcade Negrita",
"base": "Runa",
"shape": "Arcade",
"mod": "Negrita",
"file": "fonts/px/034-runa-arcade-negrita.woff",
"crisp": 6
},
{
"id": "035-runa-arcade-cursiva",
"name": "Runa Arcade Cursiva",
"base": "Runa",
"shape": "Arcade",
"mod": "Cursiva",
"file": "fonts/px/035-runa-arcade-cursiva.woff",
"crisp": 6
},
{
"id": "036-runa-arcade-ancha",
"name": "Runa Arcade Ancha",
"base": "Runa",
"shape": "Arcade",
"mod": "Ancha",
"file": "fonts/px/036-runa-arcade-ancha.woff",
"crisp": 6
},
{
"id": "037-runa-mosaico",
"name": "Runa Mosaico",
"base": "Runa",
"shape": "Mosaico",
"mod": "Normal",
"file": "fonts/px/037-runa-mosaico.woff",
"crisp": 6
},
{
"id": "038-runa-mosaico-negrita",
"name": "Runa Mosaico Negrita",
"base": "Runa",
"shape": "Mosaico",
"mod": "Negrita",
"file": "fonts/px/038-runa-mosaico-negrita.woff",
"crisp": 6
},
{
"id": "039-runa-mosaico-cursiva",
"name": "Runa Mosaico Cursiva",
"base": "Runa",
"shape": "Mosaico",
"mod": "Cursiva",
"file": "fonts/px/039-runa-mosaico-cursiva.woff",
"crisp": 6
},
{
"id": "040-runa-mosaico-ancha",
"name": "Runa Mosaico Ancha",
"base": "Runa",
"shape": "Mosaico",
"mod": "Ancha",
"file": "fonts/px/040-runa-mosaico-ancha.woff",
"crisp": 6
},
{
"id": "041-elfica-bloque",
"name": "Élfica Bloque",
"base": "Élfica",
"shape": "Bloque",
"mod": "Normal",
"file": "fonts/px/041-elfica-bloque.woff",
"crisp": 16
},
{
"id": "042-elfica-bloque-negrita",
"name": "Élfica Bloque Negrita",
"base": "Élfica",
"shape": "Bloque",
"mod": "Negrita",
"file": "fonts/px/042-elfica-bloque-negrita.woff",
"crisp": 16
},
{
"id": "043-elfica-bloque-cursiva",
"name": "Élfica Bloque Cursiva",
"base": "Élfica",
"shape": "Bloque",
"mod": "Cursiva",
"file": "fonts/px/043-elfica-bloque-cursiva.woff",
"crisp": 16
},
{
"id": "044-elfica-bloque-ancha",
"name": "Élfica Bloque Ancha",
"base": "Élfica",
"shape": "Bloque",
"mod": "Ancha",
"file": "fonts/px/044-elfica-bloque-ancha.woff",
"crisp": 16
},
{
"id": "045-elfica-perla",
"name": "Élfica Perla",
"base": "Élfica",
"shape": "Perla",
"mod": "Normal",
"file": "fonts/px/045-elfica-perla.woff",
"crisp": 16
},
{
"id": "046-elfica-perla-negrita",
"name": "Élfica Perla Negrita",
"base": "Élfica",
"shape": "Perla",
"mod": "Negrita",
"file": "fonts/px/046-elfica-perla-negrita.woff",
"crisp": 16
},
{
"id": "047-elfica-perla-cursiva",
"name": "Élfica Perla Cursiva",
"base": "Élfica",
"shape": "Perla",
"mod": "Cursiva",
"file": "fonts/px/047-elfica-perla-cursiva.woff",
"crisp": 16
},
{
"id": "048-elfica-perla-ancha",
"name": "Élfica Perla Ancha",
"base": "Élfica",
"shape": "Perla",
"mod": "Ancha",
"file": "fonts/px/048-elfica-perla-ancha.woff",
"crisp": 16
},
{
"id": "049-elfica-gema",
"name": "Élfica Gema",
"base": "Élfica",
"shape": "Gema",
"mod": "Normal",
"file": "fonts/px/049-elfica-gema.woff",
"crisp": 16
},
{
"id": "050-elfica-gema-negrita",
"name": "Élfica Gema Negrita",
"base": "Élfica",
"shape": "Gema",
"mod": "Negrita",
"file": "fonts/px/050-elfica-gema-negrita.woff",
"crisp": 16
},
{
"id": "051-elfica-gema-cursiva",
"name": "Élfica Gema Cursiva",
"base": "Élfica",
"shape": "Gema",
"mod": "Cursiva",
"file": "fonts/px/051-elfica-gema-cursiva.woff",
"crisp": 16
},
{
"id": "052-elfica-gema-ancha",
"name": "Élfica Gema Ancha",
"base": "Élfica",
"shape": "Gema",
"mod": "Ancha",
"file": "fonts/px/052-elfica-gema-ancha.woff",
"crisp": 16
},
{
"id": "053-elfica-arcade",
"name": "Élfica Arcade",
"base": "Élfica",
"shape": "Arcade",
"mod": "Normal",
"file": "fonts/px/053-elfica-arcade.woff",
"crisp": 16
},
{
"id": "054-elfica-arcade-negrita",
"name": "Élfica Arcade Negrita",
"base": "Élfica",
"shape": "Arcade",
"mod": "Negrita",
"file": "fonts/px/054-elfica-arcade-negrita.woff",
"crisp": 16
},
{
"id": "055-elfica-arcade-cursiva",
"name": "Élfica Arcade Cursiva",
"base": "Élfica",
"shape": "Arcade",
"mod": "Cursiva",
"file": "fonts/px/055-elfica-arcade-cursiva.woff",
"crisp": 16
},
{
"id": "056-elfica-arcade-ancha",
"name": "Élfica Arcade Ancha",
"base": "Élfica",
"shape": "Arcade",
"mod": "Ancha",
"file": "fonts/px/056-elfica-arcade-ancha.woff",
"crisp": 16
},
{
"id": "057-elfica-mosaico",
"name": "Élfica Mosaico",
"base": "Élfica",
"shape": "Mosaico",
"mod": "Normal",
"file": "fonts/px/057-elfica-mosaico.woff",
"crisp": 16
},
{
"id": "058-elfica-mosaico-negrita",
"name": "Élfica Mosaico Negrita",
"base": "Élfica",
"shape": "Mosaico",
"mod": "Negrita",
"file": "fonts/px/058-elfica-mosaico-negrita.woff",
"crisp": 16
},
{
"id": "059-elfica-mosaico-cursiva",
"name": "Élfica Mosaico Cursiva",
"base": "Élfica",
"shape": "Mosaico",
"mod": "Cursiva",
"file": "fonts/px/059-elfica-mosaico-cursiva.woff",
"crisp": 16
},
{
"id": "060-elfica-mosaico-ancha",
"name": "Élfica Mosaico Ancha",
"base": "Élfica",
"shape": "Mosaico",
"mod": "Ancha",
"file": "fonts/px/060-elfica-mosaico-ancha.woff",
"crisp": 16
},
{
"id": "061-torre-bloque",
"name": "Torre Bloque",
"base": "Torre",
"shape": "Bloque",
"mod": "Normal",
"file": "fonts/px/061-torre-bloque.woff",
"crisp": 8
},
{
"id": "062-torre-bloque-negrita",
"name": "Torre Bloque Negrita",
"base": "Torre",
"shape": "Bloque",
"mod": "Negrita",
"file": "fonts/px/062-torre-bloque-negrita.woff",
"crisp": 8
},
{
"id": "063-torre-bloque-cursiva",
"name": "Torre Bloque Cursiva",
"base": "Torre",
"shape": "Bloque",
"mod": "Cursiva",
"file": "fonts/px/063-torre-bloque-cursiva.woff",
"crisp": 8
},
{
"id": "064-torre-bloque-ancha",
"name": "Torre Bloque Ancha",
"base": "Torre",
"shape": "Bloque",
"mod": "Ancha",
"file": "fonts/px/064-torre-bloque-ancha.woff",
"crisp": 8
},
{
"id": "065-torre-perla",
"name": "Torre Perla",
"base": "Torre",
"shape": "Perla",
"mod": "Normal",
"file": "fonts/px/065-torre-perla.woff",
"crisp": 8
},
{
"id": "066-torre-perla-negrita",
"name": "Torre Perla Negrita",
"base": "Torre",
"shape": "Perla",
"mod": "Negrita",
"file": "fonts/px/066-torre-perla-negrita.woff",
"crisp": 8
},
{
"id": "067-torre-perla-cursiva",
"name": "Torre Perla Cursiva",
"base": "Torre",
"shape": "Perla",
"mod": "Cursiva",
"file": "fonts/px/067-torre-perla-cursiva.woff",
"crisp": 8
},
{
"id": "068-torre-perla-ancha",
"name": "Torre Perla Ancha",
"base": "Torre",
"shape": "Perla",
"mod": "Ancha",
"file": "fonts/px/068-torre-perla-ancha.woff",
"crisp": 8
},
{
"id": "069-torre-gema",
"name": "Torre Gema",
"base": "Torre",
"shape": "Gema",
"mod": "Normal",
"file": "fonts/px/069-torre-gema.woff",
"crisp": 8
},
{
"id": "070-torre-gema-negrita",
"name": "Torre Gema Negrita",
"base": "Torre",
"shape": "Gema",
"mod": "Negrita",
"file": "fonts/px/070-torre-gema-negrita.woff",
"crisp": 8
},
{
"id": "071-torre-gema-cursiva",
"name": "Torre Gema Cursiva",
"base": "Torre",
"shape": "Gema",
"mod": "Cursiva",
"file": "fonts/px/071-torre-gema-cursiva.woff",
"crisp": 8
},
{
"id": "072-torre-gema-ancha",
"name": "Torre Gema Ancha",
"base": "Torre",
"shape": "Gema",
"mod": "Ancha",
"file": "fonts/px/072-torre-gema-ancha.woff",
"crisp": 8
},
{
"id": "073-torre-arcade",
"name": "Torre Arcade",
"base": "Torre",
"shape": "Arcade",
"mod": "Normal",
"file": "fonts/px/073-torre-arcade.woff",
"crisp": 8
},
{
"id": "074-torre-arcade-negrita",
"name": "Torre Arcade Negrita",
"base": "Torre",
"shape": "Arcade",
"mod": "Negrita",
"file": "fonts/px/074-torre-arcade-negrita.woff",
"crisp": 8
},
{
"id": "075-torre-arcade-cursiva",
"name": "Torre Arcade Cursiva",
"base": "Torre",
"shape": "Arcade",
"mod": "Cursiva",
"file": "fonts/px/075-torre-arcade-cursiva.woff",
"crisp": 8
},
{
"id": "076-torre-arcade-ancha",
"name": "Torre Arcade Ancha",
"base": "Torre",
"shape": "Arcade",
"mod": "Ancha",
"file": "fonts/px/076-torre-arcade-ancha.woff",
"crisp": 8
},
{
"id": "077-torre-mosaico",
"name": "Torre Mosaico",
"base": "Torre",
"shape": "Mosaico",
"mod": "Normal",
"file": "fonts/px/077-torre-mosaico.woff",
"crisp": 8
},
{
"id": "078-torre-mosaico-negrita",
"name": "Torre Mosaico Negrita",
"base": "Torre",
"shape": "Mosaico",
"mod": "Negrita",
"file": "fonts/px/078-torre-mosaico-negrita.woff",
"crisp": 8
},
{
"id": "079-torre-mosaico-cursiva",
"name": "Torre Mosaico Cursiva",
"base": "Torre",
"shape": "Mosaico",
"mod": "Cursiva",
"file": "fonts/px/079-torre-mosaico-cursiva.woff",
"crisp": 8
},
{
"id": "080-torre-mosaico-ancha",
"name": "Torre Mosaico Ancha",
"base": "Torre",
"shape": "Mosaico",
"mod": "Ancha",
"file": "fonts/px/080-torre-mosaico-ancha.woff",
"crisp": 8
},
{
"id": "081-gnomo-bloque",
"name": "Gnomo Bloque",
"base": "Gnomo",
"shape": "Bloque",
"mod": "Normal",
"file": "fonts/px/081-gnomo-bloque.woff",
"crisp": 11
},
{
"id": "082-gnomo-bloque-negrita",
"name": "Gnomo Bloque Negrita",
"base": "Gnomo",
"shape": "Bloque",
"mod": "Negrita",
"file": "fonts/px/082-gnomo-bloque-negrita.woff",
"crisp": 11
},
{
"id": "083-gnomo-bloque-cursiva",
"name": "Gnomo Bloque Cursiva",
"base": "Gnomo",
"shape": "Bloque",
"mod": "Cursiva",
"file": "fonts/px/083-gnomo-bloque-cursiva.woff",
"crisp": 11
},
{
"id": "084-gnomo-bloque-ancha",
"name": "Gnomo Bloque Ancha",
"base": "Gnomo",
"shape": "Bloque",
"mod": "Ancha",
"file": "fonts/px/084-gnomo-bloque-ancha.woff",
"crisp": 11
},
{
"id": "085-gnomo-perla",
"name": "Gnomo Perla",
"base": "Gnomo",
"shape": "Perla",
"mod": "Normal",
"file": "fonts/px/085-gnomo-perla.woff",
"crisp": 11
},
{
"id": "086-gnomo-perla-negrita",
"name": "Gnomo Perla Negrita",
"base": "Gnomo",
"shape": "Perla",
"mod": "Negrita",
"file": "fonts/px/086-gnomo-perla-negrita.woff",
"crisp": 11
},
{
"id": "087-gnomo-perla-cursiva",
"name": "Gnomo Perla Cursiva",
"base": "Gnomo",
"shape": "Perla",
"mod": "Cursiva",
"file": "fonts/px/087-gnomo-perla-cursiva.woff",
"crisp": 11
},
{
"id": "088-gnomo-perla-ancha",
"name": "Gnomo Perla Ancha",
"base": "Gnomo",
"shape": "Perla",
"mod": "Ancha",
"file": "fonts/px/088-gnomo-perla-ancha.woff",
"crisp": 11
},
{
"id": "089-gnomo-gema",
"name": "Gnomo Gema",
"base": "Gnomo",
"shape": "Gema",
"mod": "Normal",
"file": "fonts/px/089-gnomo-gema.woff",
"crisp": 11
},
{
"id": "090-gnomo-gema-negrita",
"name": "Gnomo Gema Negrita",
"base": "Gnomo",
"shape": "Gema",
"mod": "Negrita",
"file": "fonts/px/090-gnomo-gema-negrita.woff",
"crisp": 11
},
{
"id": "091-gnomo-gema-cursiva",
"name": "Gnomo Gema Cursiva",
"base": "Gnomo",
"shape": "Gema",
"mod": "Cursiva",
"file": "fonts/px/091-gnomo-gema-cursiva.woff",
"crisp": 11
},
{
"id": "092-gnomo-gema-ancha",
"name": "Gnomo Gema Ancha",
"base": "Gnomo",
"shape": "Gema",
"mod": "Ancha",
"file": "fonts/px/092-gnomo-gema-ancha.woff",
"crisp": 11
},
{
"id": "093-gnomo-arcade",
"name": "Gnomo Arcade",
"base": "Gnomo",
"shape": "Arcade",
"mod": "Normal",
"file": "fonts/px/093-gnomo-arcade.woff",
"crisp": 11
},
{
"id": "094-gnomo-arcade-negrita",
"name": "Gnomo Arcade Negrita",
"base": "Gnomo",
"shape": "Arcade",
"mod": "Negrita",
"file": "fonts/px/094-gnomo-arcade-negrita.woff",
"crisp": 11
},
{
"id": "095-gnomo-arcade-cursiva",
"name": "Gnomo Arcade Cursiva",
"base": "Gnomo",
"shape": "Arcade",
"mod": "Cursiva",
"file": "fonts/px/095-gnomo-arcade-cursiva.woff",
"crisp": 11
},
{
"id": "096-gnomo-arcade-ancha",
"name": "Gnomo Arcade Ancha",
"base": "Gnomo",
"shape": "Arcade",
"mod": "Ancha",
"file": "fonts/px/096-gnomo-arcade-ancha.woff",
"crisp": 11
},
{
"id": "097-gnomo-mosaico",
"name": "Gnomo Mosaico",
"base": "Gnomo",
"shape": "Mosaico",
"mod": "Normal",
"file": "fonts/px/097-gnomo-mosaico.woff",
"crisp": 11
},
{
"id": "098-gnomo-mosaico-negrita",
"name": "Gnomo Mosaico Negrita",
"base": "Gnomo",
"shape": "Mosaico",
"mod": "Negrita",
"file": "fonts/px/098-gnomo-mosaico-negrita.woff",
"crisp": 11
},
{
"id": "099-gnomo-mosaico-cursiva",
"name": "Gnomo Mosaico Cursiva",
"base": "Gnomo",
"shape": "Mosaico",
"mod": "Cursiva",
"file": "fonts/px/099-gnomo-mosaico-cursiva.woff",
"crisp": 11
},
{
"id": "100-gnomo-mosaico-ancha",
"name": "Gnomo Mosaico Ancha",
"base": "Gnomo",
"shape": "Mosaico",
"mod": "Ancha",
"file": "fonts/px/100-gnomo-mosaico-ancha.woff",
"crisp": 11
}
];

return { FONTS };
})();
M['characters-data'] = (() => {
// 120 personajes presentadores: 30 anarquistas, 30 tributo WoW, 30 tributo Elder Scrolls, 30 medievales.
// Todos son personajes originales (arquetipos), no figuras oficiales ni citas de personas reales.
// Retrato: r=raza, sk=piel, h=peinado, hc=color pelo, hd=tocado, hdc=color tocado, cl=ropa, tr=adorno,
// b=barba, a=accesorios, e=color de ojos, sc=bufanda, pads=hombreras, star=estrella en boina.

const T = { claro: '#f1b98a', rosado: '#f5d0b0', oliva: '#d9a77a', canela: '#c68a5a', moreno: '#8d5a3b', oscuro: '#5c3a24' };

const ANARQUISTAS = [
  ['Rosa la Tipógrafa', 'imprenta del barrio', { sk: T.claro, h: 'bun', hc: '#2b1d14', hd: 'beret', hdc: '#141414', cl: '#3a3a3a', tr: '#d9343a', a: ['glasses', 'scarf'], sc: '#d9343a' }, 'rebelde', ['Lo que no se imprime, se olvida.', 'Tinta fresca para mentes libres.', 'Paremos las prensas: esto merece atención.']],
  ['Mateo del Ateneo', 'ateneo libertario', { sk: T.canela, h: 'curly', hc: '#1d1410', hd: 'cap', hdc: '#4a3a2a', cl: '#6b4a2b', tr: '#f4f1ea', a: ['glasses', 'book'] }, 'sabio', ['En el ateneo esto lo debatiríamos hasta el alba.', 'Saber es la primera herramienta.', 'Apuntemos esto en la pizarra común.']],
  ['Lucía la Huelguista', 'comité de huelga', { sk: T.oliva, h: 'braids', hc: '#3b2416', hd: 'bandana', hdc: '#d9343a', cl: '#2b2b2b', tr: '#d9343a', a: ['scarf'], sc: '#141414' }, 'rebelde', ['Si paramos todas, se para el mundo.', 'Esto se arregla en asamblea.', '¡Brazos caídos, cabeza en alto!']],
  ['Tomás el Ferroviario', 'sindicato del riel', { sk: T.claro, h: 'short', hc: '#5a5a5a', hd: 'cap', hdc: '#1f3b66', cl: '#2f5b8f', tr: '#f7c843', b: 'mustache' }, 'solemne', ['Este tren no para en la estación de las mentiras.', 'Vía libre para la siguiente.', 'Puntual como el turno de las seis.']],
  ['Amparo la Maestra Libre', 'escuela racionalista', { sk: T.rosado, h: 'bun', hc: '#bdbdbd', cl: '#5a3a6b', tr: '#f4f1ea', a: ['glasses', 'book'] }, 'tierno', ['Aprender juntas es más bonito.', 'Pregunta siempre por qué.', 'Ninguna pregunta es tonta en este aula.']],
  ['Gato Salvaje', 'mascota de la federación', { r: 'cat', sk: '#2a2a2a', hd: 'bandana', hdc: '#d9343a', cl: '#141414', tr: '#d9343a' }, 'pícaro', ['Miau de saludo, que no de sabotaje.', 'Siete vidas y ningún amo.', 'Afilo las uñas con los titulares.']],
  ['Nina la Okupa', 'centro social autogestionado', { sk: T.claro, h: 'mohawk', hc: '#ff4fa3', cl: '#1a1a1a', tr: '#ff4fa3', a: ['earring', 'scarf'], sc: '#141414' }, 'rebelde', ['Casa vacía, casa viva.', 'Aquí las ideas no pagan alquiler.', 'Lo que se abandona, se recupera.']],
  ['Bruno el Punk', 'banda Los Sin Patrón', { sk: T.canela, h: 'mohawk', hc: '#5cff5c', cl: '#2a2a2a', tr: '#c6ff00', a: ['earring', 'scar'] }, 'bromista', ['¡Hazlo tú mismo, y hazlo ruidoso!', 'Tres acordes y la verdad.', 'Esto suena a pogo informativo.']],
  ['Clara la Enfermera Solidaria', 'dispensario popular', { sk: T.moreno, h: 'bun', hc: '#1a1a1a', hd: 'headband', hdc: '#f4f1ea', cl: '#e8eef2', tr: '#d9343a', a: ['scarf'], sc: '#d9343a' }, 'tierno', ['Primero, cuidarnos.', 'El apoyo mutuo también cura.', 'Respira hondo, que vamos con calma.']],
  ['Abuelo Paco', 'veterano de mil asambleas', { sk: T.claro, h: 'tonsure', hc: '#e0e0e0', hd: 'beret', hdc: '#141414', star: true, cl: '#4a4a3a', tr: '#d9343a', b: 'mustache', a: ['pipe'] }, 'sabio', ['En mis tiempos esto lo arreglábamos en la plaza.', 'Ni dios ni amo, pero sí un buen café.', 'La memoria es la mejor trinchera.']],
  ['Inés la Agrónoma', 'huerto comunitario', { sk: T.oliva, h: 'braids', hc: '#6b3a1a', hd: 'straw', hdc: '#e8c87a', cl: '#4f7a3a', tr: '#f7c843', a: ['freckles'] }, 'alegre', ['Sembremos esta idea.', 'La tierra para quien la cuida.', 'Todo crece si se riega.']],
  ['Diego el Minero', 'cooperativa minera', { sk: T.canela, h: 'short', hc: '#1a1a1a', hd: 'helmet', hdc: '#e8b423', cl: '#3d3d3d', tr: '#f7c843', b: 'full' }, 'solemne', ['Desde abajo se ve todo más claro.', 'Luz en la galería.', 'Paso firme, que el suelo es duro.']],
  ['Sara la Radio Pirata', 'onda libre 101.1', { sk: T.rosado, h: 'ponytail', hc: '#7a3b9a', hd: 'headband', hdc: '#2a2a2a', cl: '#3b2f4a', tr: '#39ff14', a: ['glasses'] }, 'bromista', ['Interferimos la señal oficial.', 'Frecuencia libre, mente libre.', 'Si nos escuchas, ya eres cómplice.']],
  ['Mila la Fanzinera', 'fanzine La Grapa', { sk: T.rosado, h: 'curly', hc: '#d4582a', cl: '#2f6f6a', tr: '#ff5d8f', a: ['flower', 'freckles'] }, 'alegre', ['Esto va directo a la portada.', 'Tijera, pegamento y verdad.', 'Fotocopiado con cariño.']],
  ['Joan el Cooperativista', 'cooperativa de consumo', { sk: T.claro, h: 'short', hc: '#6b4a2b', hd: 'cap', hdc: '#6b2b2b', cl: '#8a5a2b', tr: '#f4f1ea', b: 'full' }, 'sabio', ['Lo que es de todas, se cuida entre todas.', 'Cuentas claras, asamblea larga.', 'Juntos rinde más.']],
  ['Elena la Bibliotecaria', 'biblioteca libertaria', { sk: T.moreno, h: 'long', hc: '#1a1a1a', cl: '#3a2a4a', tr: '#f7c843', a: ['glasses', 'book'] }, 'sabio', ['Hay un libro para cada duda.', 'Silencio… pero no censura.', 'Consultemos la estantería.']],
  ['Rafa el Panadero', 'horno de la comuna', { sk: T.oliva, h: 'short', hc: '#2b1d14', hd: 'cap', hdc: '#f4f1ea', cl: '#f0e6d2', tr: '#c0392b', b: 'mustache' }, 'alegre', ['Pan para todas y pan para el pensamiento.', 'Recién salido del horno.', 'Esto huele a buena noticia.']],
  ['Vera la Ecologista', 'red de semillas libres', { sk: T.claro, h: 'braids', hc: '#3aa245', hd: 'flowers', cl: '#2b5b2b', tr: '#9be38b' }, 'tierno', ['El bosque no tiene dueño.', 'Cuidemos la casa común.', 'Cada hoja cuenta.']],
  ['Iker el Sindicalista', 'sindicato de oficios varios', { sk: T.claro, h: 'short', hc: '#1d1410', cl: '#2a2a2a', tr: '#d9343a', b: 'goatee', a: ['scarf'], sc: '#d9343a' }, 'épico', ['¡Unión, unión, unión!', 'Ninguna conquista cayó del cielo.', 'Esto lo pelearemos juntos.']],
  ['Julia la Periodista Libre', 'periódico autogestionado', { sk: T.canela, h: 'ponytail', hc: '#3b2416', hd: 'beret', hdc: '#7a1a2a', cl: '#4a4a5a', tr: '#f4f1ea', a: ['glasses'] }, 'pícaro', ['Fuentes contrastadas, ánimo intacto.', 'Pregunta incómoda en camino.', 'Eso hay que verificarlo.']],
  ['Hugo el Carpintero', 'taller colectivo', { sk: T.moreno, h: 'short', hc: '#1a1a1a', hd: 'cap', hdc: '#5a4a3a', cl: '#7a5a3a', tr: '#e8c87a', b: 'big' }, 'solemne', ['Medir dos veces, opinar una.', 'Madera noble, palabra noble.', 'Bien ensamblado, no se cae.']],
  ['Olga la Costurera', 'taller de costura colectiva', { sk: T.rosado, h: 'bun', hc: '#5a3420', cl: '#7a2b4a', tr: '#f7c843', a: ['earring', 'scarf'], sc: '#141414' }, 'sabio', ['Hilo a hilo se teje la libertad.', 'Cada puntada cuenta.', 'Esto hay que coserlo con calma.']],
  ['Teo el Estudiante', 'asamblea universitaria', { sk: T.oscuro, h: 'curly', hc: '#141414', cl: '#3b5a8f', tr: '#f4f1ea', a: ['glasses', 'scarf'], sc: '#d9343a' }, 'bromista', ['¿Esto entra en el examen de la vida?', 'Tomo apuntes, prometido.', 'Toca debate en la cafetería.']],
  ['Carmen la Cantautora', 'coplas de barricada', { sk: T.oliva, h: 'long', hc: '#2b1d14', cl: '#8e1b22', tr: '#f7c843', a: ['flower', 'lute'] }, 'tierno', ['Esto merece una copla.', 'Afino la guitarra y sigo.', 'Lo cantaremos en la plaza.']],
  ['Marcos el Mensajero', 'cooperativa ciclista', { sk: T.canela, h: 'short', hc: '#2b1d14', hd: 'headband', hdc: '#ffb000', cl: '#ff7a29', tr: '#141414' }, 'alegre', ['Llego pedaleando con la noticia.', 'Sin frenos y sin jefes.', 'Entrega exprés de información.']],
  ['Aurora la Astrónoma', 'observatorio popular', { sk: T.claro, h: 'long', hc: '#cfd6e6', cl: '#1f2a5a', tr: '#f7c843', a: ['glasses'] }, 'místico', ['Bajo las estrellas no hay fronteras.', 'Miremos esto con telescopio.', 'El cielo es de quien lo mira.']],
  ['Simón el Pescador', 'cofradía de pescadores', { sk: T.moreno, h: 'short', hc: '#5a5a5a', hd: 'bandana', hdc: '#2f5b8f', cl: '#3a5a6a', tr: '#f4f1ea', b: 'full', a: ['pipe'] }, 'solemne', ['El mar no entiende de patrones.', 'Red echada, noticia pescada.', 'Viene marejada.']],
  ['Lola la Abogada del Barrio', 'defensa popular', { sk: T.rosado, h: 'bun', hc: '#1a1a1a', cl: '#2a2a3a', tr: '#d9343a', a: ['glasses'] }, 'épico', ['Objeción: eso no es justo.', 'La ley también se discute.', 'Que conste en acta.']],
  ['Andrés el Programador Libre', 'hacklab del barrio', { sk: T.claro, h: 'short', hc: '#6b4a2b', hd: 'hood', hdc: '#4a4a4a', cl: '#4a4a4a', tr: '#39ff14', a: ['glasses'] }, 'pícaro', ['Código abierto, puertas abiertas.', 'Compilando opinión…', 'Esto tiene un bug social.']],
  ['Marta la Partera', 'casa de partos comunitaria', { sk: T.oscuro, h: 'braids', hc: '#141414', hd: 'headband', hdc: '#d9343a', cl: '#6b3a5a', tr: '#f7c843' }, 'tierno', ['Todo lo nuevo nace con esfuerzo.', 'Paciencia, que viene en camino.', 'Respira y empuja, mundo.']],
];

const WOW = [
  ['Grokka Colmillo', 'chamán orco', { r: 'orc', h: 'mohawk', hc: '#1a1a1a', cl: '#6b4a2b', tr: '#c41e3a', pads: true, a: ['paint', 'earring'] }, 'épico', ['¡Por la tribu y por la taberna!', 'Los espíritus del viento traen noticias.', 'Mis tambores ya lo anunciaban.']],
  ['Thalindra Hojaluna', 'druida elfa de la noche', { r: 'elf', sk: '#9b8cd9', h: 'long', hc: '#3fd0c0', hd: 'circlet', cl: '#3b2f6b', tr: '#7ae0c0', a: ['glow'], e: '#e8f4ff' }, 'místico', ['La luna lo ha visto todo.', 'El bosque guarda memoria.', 'Escucha a las hojas.']],
  ['Borin Barbahierro', 'guerrero enano', { r: 'dwarf', h: 'short', hc: '#c4572a', hd: 'horned', hdc: '#9aa6b2', cl: '#6b4a2b', tr: '#f7c843', b: 'big', pads: true }, 'bromista', ['¡Por mi barba, una ronda más!', 'Eso pide cerveza y martillo.', 'Más duro que el pan de la mina.']],
  ['Fizzi Chispatuerca', 'ingeniera gnoma', { r: 'gnome', h: 'braids', hc: '#ff6fb5', cl: '#3f78ff', tr: '#f7c843', a: ['glasses'] }, 'alegre', ['¡Calculado al ochenta y siete por ciento!', 'Si explota, era a propósito.', 'Engranaje nuevo, idea nueva.']],
  ['Moragh Cascotrueno', 'druida taurena', { r: 'tauren', hd: 'flowers', cl: '#8a5a2b', tr: '#e3a857' }, 'sabio', ['La tierra madre escucha.', 'Paciencia de montaña.', 'Pisemos despacio, que el prado está vivo.']],
  ['Rakkaz el Cazador', 'cazador trol', { r: 'troll', h: 'mohawk', hc: '#ff4d3a', cl: '#2b5b4a', tr: '#f7c843', a: ['paint'] }, 'pícaro', ['Tranquilo, hermano, la noticia no muerde.', 'Rastreé esto desde la selva.', 'Con calma se caza mejor.']],
  ['Silvanel Solbrillo', 'magistrix elfa de sangre', { r: 'altmer', sk: '#f3d2b3', h: 'long', hc: '#f7e08a', hd: 'circlet', cl: '#8e1b22', tr: '#f7c843', pads: true, a: ['glow'], e: '#7cff6b' }, 'solemne', ['Con elegancia, incluso las malas noticias.', 'Que brille el conocimiento.', 'Permíteme pulir este dato.']],
  ['Ashurai el Exiliado', 'vindicador draenei', { r: 'draenei', hc: '#e8eef8', cl: '#5a4a8f', tr: '#f7c843', pads: true, a: ['glow'], e: '#e8f4ff' }, 'místico', ['La luz guía, y la verdad también.', 'He viajado entre mundos para contarte esto.', 'Paciencia: todo tiene su ciclo.']],
  ['Mortimer Hueco', 'mago no muerto', { r: 'undead', hd: 'cowl', hdc: '#4a2b6b', cl: '#2a1f3a', tr: '#b37cff', a: ['glow'], e: '#f7d34a' }, 'sombrío', ['Muerto de risa, como siempre.', 'Ya lo he visto todo… dos veces.', 'La eternidad da para leer mucho.']],
  ['Grizzby Monedalarga', 'mercader goblin', { r: 'goblin', hd: 'tricorn', hdc: '#2b2b2b', cl: '#3a6b3a', tr: '#f7c843', a: ['earring'] }, 'pícaro', ['¡El tiempo vale oro, amiga!', 'Te hago precio por esta noticia.', 'Todo se compra, menos la verdad.']],
  ['Huang Barrigaplena', 'monje pandaren', { r: 'panda', hd: 'headband', hdc: '#d9343a', cl: '#3f8a5a', tr: '#f7c843' }, 'alegre', ['Primero un té, luego la noticia.', 'Un estómago lleno escucha mejor.', 'Calma, como el bambú.']],
  ['Darius Colmillogris', 'huargen errante', { r: 'wolf', cl: '#3a3a4a', tr: '#9aa6b2', a: ['scar'] }, 'sombrío', ['Huelo una exclusiva.', 'La luna llena trae titulares.', 'Gruño, pero informo.']],
  ['Sir Aldric de Villadorada', 'paladín humano', { sk: T.claro, h: 'short', hc: '#c4a35a', hd: 'helmet', hdc: '#e8c84a', cl: '#2f5bb0', tr: '#f7c843', pads: true }, 'épico', ['¡Por la justicia y el buen pan!', 'Escudo en alto, oídos atentos.', 'La luz me obliga a contarlo todo.']],
  ['Elira la Sacerdotisa', 'sacerdotisa humana', { sk: T.canela, h: 'long', hc: '#2b1d14', hd: 'hood', hdc: '#f4f1ea', cl: '#e8e4d8', tr: '#f7c843' }, 'tierno', ['Que la luz te acompañe hoy.', 'Escuchemos con el corazón.', 'Hay esperanza en cada noticia.']],
  ['Taerion Llamaviva', 'mago de fuego', { r: 'altmer', sk: '#f3d2b3', h: 'long', hc: '#d9343a', hd: 'wizard', hdc: '#8e1b22', cl: '#c0392b', tr: '#f7c843', a: ['staff', 'orb'], e: '#ff9a3c' }, 'épico', ['¡Fuego y conocimiento!', 'Esta noticia arde.', 'Conjuro un resumen.']],
  ['Nyx Sombrapluma', 'pícara elfa', { r: 'elf', sk: '#9b8cd9', h: 'short', hc: '#e8eef8', hd: 'hood', hdc: '#1a1a24', cl: '#1a1a24', tr: '#fff468', a: ['scarf'], sc: '#2a2a3a' }, 'pícaro', ['Entré, leí y salí sin que nadie lo notara.', 'Las sombras también escuchan.', 'Dato robado… digo, prestado.']],
  ['Ulgrom Rompecráneos', 'guerrero orco', { r: 'orc', sk: '#5a8a3a', h: 'none', hd: 'horned', hdc: '#5a5a5a', cl: '#4a2a1a', tr: '#c41e3a', pads: true, a: ['scar'] }, 'épico', ['¡Al ataque de los titulares!', 'Más fuerte que un muro.', 'Ruge conmigo, taberna.']],
  ['Maggra la Bruja del Pantano', 'hechicera trol', { r: 'troll', sk: '#4f8a9a', h: 'long', hc: '#e8eef8', hd: 'witch', hdc: '#2b3a2b', cl: '#2b4a3a', tr: '#7cff4f', a: ['glow'], e: '#7cff4f' }, 'sombrío', ['Mis huesos dicen que lloverá.', 'El caldero burbujea con noticias.', 'No preguntes qué hay en la poción.']],
  ['Valeria Escudoalto', 'guerrera humana', { sk: T.oliva, h: 'braids', hc: '#3b2416', hd: 'helmet', hdc: '#b0b7c3', cl: '#5a2a2a', tr: '#c69b6d', pads: true }, 'solemne', ['Firmes, que llega otra noticia.', 'El escudo primero.', 'Nadie se queda atrás.']],
  ['Hilda Yunquebrasa', 'herrera enana', { r: 'dwarf', h: 'braids', hc: '#c4572a', hd: 'headband', hdc: '#5a3420', cl: '#5a4a3a', tr: '#ff9a3c', a: ['freckles'] }, 'alegre', ['Golpe a golpe se forja el día.', 'Caliente el yunque, caliente la noticia.', '¡Eso suena a metal del bueno!']],
  ['Pip Engranajes', 'mago gnomo', { r: 'gnome', h: 'short', hc: '#e8e8e8', hd: 'wizard', hdc: '#3f78ff', cl: '#2f4fb0', tr: '#f7c843', b: 'full' }, 'sabio', ['Según mis cálculos arcanos…', 'Pequeño de tamaño, grande de dato.', 'Un hechizo de resumen, allá va.']],
  ['Tarook Pezuñavieja', 'anciano taureno', { r: 'tauren', sk: '#6b4a2b', cl: '#a0703a', tr: '#e3a857', a: ['earring', 'staff'] }, 'sabio', ['El viento de las praderas cuenta muchas cosas.', 'Lo viejo enseña a lo nuevo.', 'Sentémonos junto al fuego.']],
  ['Lady Sylene Nocheterna', 'no muerta errante', { r: 'undead', h: 'long', hc: '#2a2a2a', hd: 'hood', hdc: '#3a1a2a', cl: '#2a1a24', tr: '#b31d3a', a: ['glow'], e: '#ff3b3b' }, 'sombrío', ['La eternidad es larga; las noticias, breves.', 'Nada me sorprende ya.', 'Otra noche, otra crónica.']],
  ['Krix el Mecánico', 'mecánico goblin', { r: 'goblin', hd: 'cap', hdc: '#5a5a5a', cl: '#8a6a2a', tr: '#f7c843', a: ['glasses'] }, 'bromista', ['Le puse cohetes al resumen.', 'Si chispea, funciona.', '¡Apártate, que sale humo!']],
  ['Morgana Sangrefría', 'cazadora de demonios', { r: 'altmer', sk: '#f3d2b3', h: 'long', hc: '#141414', hd: 'headband', hdc: '#2a2a2a', cl: '#2b0c3b', tr: '#8cff2e', a: ['paint'] }, 'épico', ['No veo con los ojos, veo la verdad.', 'Mis alas están listas.', 'Cacemos este titular.']],
  ['Ziva Marea', 'chamana trol', { r: 'troll', sk: '#5f9fb0', h: 'mohawk', hc: '#3f78ff', cl: '#2b4a6b', tr: '#5ad7ff', a: ['paint', 'earring'] }, 'alegre', ['Las mareas traen buenas nuevas.', 'El agua siempre vuelve.', 'Bailemos con la noticia.']],
  ['Eldric el Brujo', 'brujo humano', { sk: T.rosado, h: 'short', hc: '#2a2a2a', hd: 'cowl', hdc: '#3a1a5a', cl: '#2a1a3a', tr: '#7cff4f', a: ['glow', 'staff', 'orb'], e: '#7cff4f' }, 'sombrío', ['Pacté con un diablillo para leer más rápido.', 'Las sombras me lo susurraron.', 'Un precio pequeño por saberlo todo.']],
  ['Faelyn Cantobosque', 'druida elfo', { r: 'elf', sk: '#8a7dc9', h: 'long', hc: '#3aa245', hd: 'antlers', cl: '#2b4a2b', tr: '#c3e88d' }, 'místico', ['El bosque susurra los titulares.', 'Cambio de forma, no de opinión.', 'Que crezca la calma.']],
  ['Gorm el Posadero', 'posadero de Villadorada', { sk: T.claro, h: 'tonsure', hc: '#6b4a2b', cl: '#f0e6d2', tr: '#8a5a2b', b: 'mustache' }, 'alegre', ['¡Bienvenidos a la posada, pasen y escuchen!', 'La sopa está caliente y la noticia también.', 'Otra jarra para el bardo.']],
  ['Saphira Escamazul', 'evocadora dracónida', { r: 'lizard', sk: '#3f78c0', hc: '#f7c843', cl: '#1f3b66', tr: '#5ad2c0', pads: true }, 'épico', ['Mis alas llegan antes que el rumor.', 'El aliento del dragón, a tu servicio.', 'Desde las islas, con escamas y datos.']],
];

const TES = [
  ['Bjorn Puñohelado', 'guerrero nórdico', { sk: T.rosado, h: 'long', hc: '#e8c87a', hd: 'horned', hdc: '#8a8f96', cl: '#5a4a3a', tr: '#c9d1d9', b: 'big' }, 'épico', ['¡Por los salones de los héroes!', 'El frío no me detiene.', 'Hidromiel y noticias, mi desayuno.']],
  ['Dar-Ma el Mercader', 'mercader khajiita', { r: 'cat', sk: '#c9893a', hd: 'turban', hdc: '#8e1b22', cl: '#c47a2a', tr: '#f7c843', a: ['earring'] }, 'pícaro', ['Este gato trae noticias frescas, amigo.', 'Mercancía rara, solo para ti.', 'Las arenas no mienten.']],
  ['Escamas-del-Río', 'curandero argoniano', { r: 'lizard', sk: '#4f9a6a', hc: '#c9a84a', hd: 'hood', hdc: '#3a4a2a', cl: '#4a5a3a', tr: '#c9a84a' }, 'sabio', ['El agua siempre encuentra el camino.', 'La ciénaga enseña paciencia.', 'Todo fluye.']],
  ['Dravyn Velothi', 'ceniciento elfo oscuro', { r: 'dunmer', h: 'short', hc: '#1a1a1a', cl: '#5a4a3a', tr: '#d9653a', a: ['glow'], e: '#ff3b3b' }, 'sombrío', ['La ceniza recuerda todo.', 'Bajo la montaña roja, otra noticia.', 'No me fío, pero te lo cuento.']],
  ['Aelinwe la Archimaga', 'alta elfa erudita', { r: 'altmer', h: 'long', hc: '#f7e08a', hd: 'circlet', cl: '#e8c84a', tr: '#6ad1a5', a: ['staff', 'orb'], e: '#6ad1a5' }, 'solemne', ['Con debida precisión arcana.', 'Tomaré nota en mis pergaminos.', 'La disciplina lo es todo.']],
  ['Fenwe Hojaverde', 'arquero elfo del bosque', { r: 'elf', sk: '#b07a4a', h: 'ponytail', hc: '#3b2416', hd: 'hood', hdc: '#3a6b2a', cl: '#4a6b2a', tr: '#c98b4a' }, 'pícaro', ['Tiro directo, como una flecha.', 'Desde la copa del árbol se ve todo.', 'Silencioso como la hierba.']],
  ['Ghorza la Herrera', 'herrera orca', { r: 'orc', sk: '#7a9a5a', h: 'braids', hc: '#1a1a1a', hd: 'headband', hdc: '#5a3420', cl: '#4a3a2a', tr: '#8fbf4a' }, 'épico', ['Acero honesto, palabra honesta.', 'La fragua no descansa.', 'Martillo listo.']],
  ['Agnes la Bretona', 'hechicera bretona', { sk: T.rosado, h: 'long', hc: '#a0522d', hd: 'hood', hdc: '#2f4fb0', cl: '#2f3f7a', tr: '#c7a8ff', a: ['book'] }, 'sabio', ['Tengo un conjuro para cada duda.', 'Los libros nunca fallan.', 'Leámoslo con atención.']],
  ['Iman de Martillo Fell', 'espadachina guardia roja', { sk: T.oscuro, h: 'short', hc: '#141414', hd: 'turban', hdc: '#f4f1ea', cl: '#c47a2a', tr: '#3fa7c9', a: ['scarf'], sc: '#f4f1ea' }, 'épico', ['Mi espada y mi palabra son afiladas.', 'El desierto forja carácter.', 'Directo al corazón del asunto.']],
  ['Cassius el Legionario', 'soldado imperial', { sk: T.oliva, h: 'short', hc: '#2b1d14', hd: 'helmet', hdc: '#c9a84a', cl: '#8e1b22', tr: '#d4b04a', pads: true }, 'solemne', ['Orden en las filas y en las noticias.', 'Informe completo, señor.', 'Por el imperio de la sensatez.']],
  ['Sigrid la Escudera', 'escudera nórdica', { sk: T.rosado, h: 'braids', hc: '#e8c87a', cl: '#5a4a3a', tr: '#c9d1d9', pads: true }, 'tierno', ['Cargo con todas tus noticias, sin quejarme.', 'A tu lado, siempre.', 'Yo vigilo, tú escucha.']],
  ['Hermano Orsus', 'monje de la montaña', { sk: T.claro, h: 'none', hd: 'hood', hdc: '#8a8f96', cl: '#6b6b6b', tr: '#c9d1d9', b: 'big', hc: '#e8e8e8' }, 'sabio', ['Una palabra bien dicha mueve montañas.', 'Meditemos antes de opinar.', 'La cima enseña humildad.']],
  ['Sacerdotisa Liv', 'sacerdotisa del amor', { sk: T.canela, h: 'long', hc: '#6b3a1a', hd: 'circlet', cl: '#e8d4e0', tr: '#ff8ad8' }, 'tierno', ['El amor también es noticia.', 'Que haya paz en tu hogar.', 'Escuchemos con cariño.']],
  ['El Bufón de las Islas', 'bufón de un príncipe loco', { sk: T.claro, h: 'short', hc: '#a83cff', hd: 'jester', hdc: '#a83cff', cl: '#d9343a', tr: '#f7c843', a: ['glow'], e: '#ff5cd1' }, 'bromista', ['¿Queso? ¿Noticias? ¡Ambas cosas!', 'La locura es solo otra forma de verlo.', '¡Ja! Esto es más raro que una mariposa de piedra.']],
  ['Brynja Dedosligeros', 'ladrona del gremio', { sk: T.rosado, h: 'ponytail', hc: '#c4572a', hd: 'hood', hdc: '#2a2a24', cl: '#3a3a2a', tr: '#c8a84a', a: ['scarf'], sc: '#2a2a24' }, 'pícaro', ['Esta noticia la tomé prestada.', 'Las sombras me deben un favor.', 'Nadie vio nada.']],
  ['Corvus Manonegra', 'asesino de la hermandad', { sk: T.claro, h: 'none', hd: 'cowl', hdc: '#1a0e0e', cl: '#1a0e0e', tr: '#d81f3a', a: ['scar'] }, 'sombrío', ['Silencio… y escucha.', 'Un contrato más: contarte esto.', 'La noche guarda secretos.']],
  ['Tharin el Erudito', 'estudioso de ruinas enanas', { sk: T.claro, h: 'short', hc: '#8a5a2b', hd: 'cap', hdc: '#6b4a2b', cl: '#7a5a3a', tr: '#e0a94a', a: ['glasses', 'book'], b: 'mustache' }, 'sabio', ['Los antiguos habrían construido un autómata para esto.', 'Fascinante, absolutamente fascinante.', 'Anoto en mi diario de ruinas.']],
  ['Elsa la Cazadora', 'cazadora de vampiros', { sk: T.rosado, h: 'long', hc: '#2b1d14', hd: 'feather', hdc: '#1a1a1a', cl: '#3a2a2a', tr: '#c9d1d9' }, 'épico', ['Ajo, plata y noticias.', 'Nada se esconde de mi ballesta.', 'Al alba, más datos.']],
  ['Lady Vesperia', 'vampira noble', { r: 'undead', sk: '#d8d0d6', h: 'long', hc: '#141414', cl: '#5a0e1a', tr: '#ff3b3b', a: ['glow'], e: '#ff3b3b' }, 'sombrío', ['La noche es joven, como esta noticia.', 'Tengo siglos de experiencia en rumores.', 'Qué deliciosamente interesante.']],
  ['Zaini la Caravanera', 'caravanera khajiita', { r: 'cat', sk: '#e0b060', hd: 'turban', hdc: '#3fa7c9', cl: '#c47a2a', tr: '#e0573a', a: ['earring'] }, 'alegre', ['Arena en las patas, noticias en la bolsa.', 'Este gato canta y cuenta.', 'Viajamos con la luna.']],
  ['Tres-Plumas', 'cuentista argoniana', { r: 'lizard', sk: '#3aa29a', hc: '#ff8ad8', a: ['flower'], cl: '#2b5b5a', tr: '#ff8ad8' }, 'tierno', ['Las raíces del árbol cuentan historias.', 'Escucha como escucha la ciénaga.', 'Calma y escamas.']],
  ['Maestra Ilvanni', 'hechicera de la torre hongo', { r: 'dunmer', h: 'long', hc: '#e8e8e8', hd: 'wizard', hdc: '#6b4a2b', cl: '#4a2a5a', tr: '#7cf0b0', a: ['glow', 'orb'], e: '#ff3b3b' }, 'místico', ['En mi torre-hongo todo es más claro.', 'La magia no se apura.', 'Los aprendices nunca entienden esto.']],
  ['Olaf Lengua-Dorada', 'bardo nórdico', { sk: T.rosado, h: 'long', hc: '#e8c87a', hd: 'feather', hdc: '#2f4fb0', cl: '#2f4f8f', tr: '#f7c843', b: 'full', a: ['lute'] }, 'alegre', ['¡Esto merece una canción de taberna!', 'Afinemos la voz.', 'Que no falte el estribillo.']],
  ['Justiciar Aranwen', 'alta elfa de la orden', { r: 'altmer', h: 'short', hc: '#f7e08a', hd: 'circlet', cl: '#141414', tr: '#ffd34a' }, 'solemne', ['Las reglas son las reglas.', 'Tomo nota, con rigor.', 'Todo será revisado.']],
  ['Ragnar Hielonegro', 'rebelde de la tormenta', { sk: T.claro, h: 'short', hc: '#2b1d14', hd: 'helmet', hdc: '#4a6b9a', cl: '#2f4f8f', tr: '#c4d4e6', b: 'full', pads: true }, 'épico', ['¡Libertad para el norte!', 'La tormenta habla claro.', 'Nada nos doblega.']],
  ['Maestro Eiric', 'mago del colegio helado', { sk: T.claro, h: 'short', hc: '#e8e8e8', hd: 'wizard', hdc: '#2f4fb0', cl: '#2f3f7a', tr: '#63a8ff', b: 'big', a: ['staff'] }, 'sabio', ['Paciencia, aprendiz.', 'La magia es estudio, no prisa.', 'Un poco de escarcha aclara la mente.']],
  ['Bolgar el Chamán', 'chamán orco de las montañas', { r: 'orc', sk: '#6a8a4a', h: 'mohawk', hc: '#5a3420', cl: '#5a4a3a', tr: '#8fbf4a', a: ['paint', 'staff'] }, 'sombrío', ['Los ancestros vigilan.', 'La montaña no olvida.', 'Hablo poco, digo mucho.']],
  ['Elvanna Cantoalto', 'barda elfa del bosque', { r: 'elf', sk: '#b07a4a', h: 'long', hc: '#c4572a', hd: 'flowers', cl: '#3a6b2a', tr: '#f7c843', a: ['lute'] }, 'alegre', ['Canto lo que el bosque calla.', '¡Otra estrofa, por favor!', 'La música lo arregla todo.']],
  ['Vilkhild Aullido', 'compañera licántropa', { r: 'wolf', sk: '#8a8f96', cl: '#5a3a2a', tr: '#c97b3a', pads: true, a: ['scar'] }, 'épico', ['Aullé esta noticia desde la montaña.', 'La manada protege.', 'Huelo tormenta.']],
  ['Nahkriin el Dragón Sabio', 'dragón anciano', { r: 'lizard', sk: '#b33a2a', hc: '#f7c843', cl: '#5a1a1a', tr: '#e8c85c' }, 'místico', ['Mi voz es un trueno, pero hablaré bajito.', 'He visto nacer montañas.', 'Las palabras tienen poder.']],
];

const MEDIEVALES = [
  ['Bardo Ulrico', 'juglar de taberna', { sk: T.claro, h: 'short', hc: '#5a3420', hd: 'feather', hdc: '#c0392b', cl: '#f2a541', tr: '#c0392b', a: ['lute'] }, 'alegre', ['¡Afinad el laúd, que empezamos!', 'Esto merece una balada.', 'De plaza en plaza, de noticia en noticia.']],
  ['Juglaresa Mirta', 'juglaresa trotamundos', { sk: T.canela, h: 'long', hc: '#3b2416', hd: 'flowers', cl: '#7a2b4a', tr: '#f7c843', a: ['earring'] }, 'pícaro', ['¡Que suene la pandereta!', 'Lo cuento como me lo contaron.', 'Una historia más antes de partir.']],
  ['Sir Godofredo', 'caballero andante', { sk: T.rosado, h: 'short', hc: '#c4a35a', hd: 'helmet', hdc: '#9aa6b2', cl: '#2f4fb0', tr: '#f7c843', pads: true, b: 'mustache' }, 'épico', ['¡Por el honor de la mesa redonda… y cuadrada!', 'Mi lanza apunta a la verdad.', 'Ningún dragón me asusta.']],
  ['Hermana Hildegarda', 'herborista del convento', { sk: T.rosado, hd: 'cowl', hdc: '#f4f1ea', cl: '#3a3a3a', tr: '#3aa245', a: ['book'] }, 'sabio', ['Para cada mal, una hierba.', 'La música también sana.', 'Observemos la naturaleza.']],
  ['Fray Anselmo', 'copista del scriptorium', { sk: T.claro, h: 'tonsure', hc: '#6b4a2b', cl: '#6b4a2b', tr: '#f7c843', a: ['glasses', 'book'] }, 'sabio', ['Lo copio con letra capitular.', 'Paciencia de pergamino.', 'Ni una errata se me escapa.']],
  ['Morgana del Bosque', 'bruja del bosque', { sk: T.rosado, h: 'long', hc: '#bdbdbd', hd: 'witch', hdc: '#2b1d40', cl: '#3b2a5a', tr: '#b06bff', a: ['glow'], e: '#7cff6b' }, 'místico', ['El caldero ya me lo había dicho.', 'Las cartas no mienten.', 'Huele a luna llena.']],
  ['Bertoldo el Bufón', 'bufón de la corte', { sk: T.claro, h: 'short', hc: '#d4582a', hd: 'jester', hdc: '#d9343a', cl: '#f7c843', tr: '#2f4fb0', a: ['freckles'] }, 'bromista', ['¡Tiro mis cascabeles al aire!', 'Esto es más gracioso que el rey en pijama.', 'Riamos, que es gratis.']],
  ['Reina Leonor', 'reina trovadoresca', { sk: T.rosado, h: 'long', hc: '#a0522d', hd: 'crown', cl: '#5a1a5a', tr: '#f7c843', a: ['earring'] }, 'solemne', ['Que se anuncie en todo el reino.', 'Una reina escucha a su pueblo.', 'Con la debida pompa.']],
  ['Ragnar el Navegante', 'navegante del norte', { sk: T.rosado, h: 'long', hc: '#c4572a', hd: 'horned', hdc: '#8a8f96', cl: '#5a4a3a', tr: '#c9d1d9', b: 'big' }, 'épico', ['¡A los remos!', 'El mar del norte trae noticias.', 'Ningún fiordo es demasiado lejano.']],
  ['Tomoe la Samurái', 'samurái errante', { sk: T.oliva, h: 'ponytail', hc: '#141414', hd: 'kabuto', hdc: '#8e1b22', cl: '#2b2b4a', tr: '#f7c843' }, 'solemne', ['Un corte limpio, una frase clara.', 'Honor ante todo.', 'El cerezo florece, la noticia también.']],
  ['Yusuf el Astrónomo', 'astrónomo de Al-Ándalus', { sk: T.canela, h: 'short', hc: '#141414', hd: 'turban', hdc: '#f4f1ea', cl: '#2f4f8f', tr: '#f7c843', b: 'full', a: ['orb'], e: 'k' }, 'sabio', ['Las estrellas trazan su propio mapa.', 'Calculemos con el astrolabio.', 'La ciencia es un jardín.']],
  ['Amadou el Griot', 'griot guardián de historias', { sk: T.oscuro, h: 'short', hc: '#141414', hd: 'headband', hdc: '#f7c843', cl: '#c47a2a', tr: '#3aa245', a: ['lute'] }, 'sabio', ['Soy guardián de las historias de mi pueblo.', 'La palabra es memoria viva.', 'Escuchad, que la kora empieza.']],
  ['Altan la Jinete', 'jinete de la estepa', { sk: T.oliva, h: 'braids', hc: '#141414', hd: 'cap', hdc: '#8a5a2b', cl: '#3a6b8f', tr: '#e8c87a' }, 'épico', ['Mi caballo corre más que el rumor.', 'La estepa es infinita.', 'Al galope con la noticia.']],
  ['Isolda la Alquimista', 'alquimista de la torre', { sk: T.claro, h: 'long', hc: '#d4582a', hd: 'hood', hdc: '#3a6b4a', cl: '#2b4a3a', tr: '#42f5b3', a: ['glasses', 'orb'], e: '#42f5b3' }, 'místico', ['Mezclemos los ingredientes del día.', 'Transmutando dato en saber.', 'Cuidado, que burbujea.']],
  ['Gutierre el Herrero', 'herrero del burgo', { sk: T.canela, h: 'none', hd: 'headband', hdc: '#5a3420', cl: '#4a3a2a', tr: '#ff7b3a', b: 'full', hc: '#2b1d14' }, 'solemne', ['Hierro caliente, palabra firme.', 'Lo forjo y lo cuento.', 'Esto aguanta martillazos.']],
  ['Catalina la Mercader', 'mercader de la ruta de la seda', { sk: T.rosado, h: 'bun', hc: '#3b2416', hd: 'cap', hdc: '#3a6b3a', cl: '#c47a2a', tr: '#f7c843', a: ['earring'] }, 'pícaro', ['Traigo especias y noticias.', 'Todo tiene precio, menos la sonrisa.', 'Regateemos la verdad.']],
  ['Pedro el Peregrino', 'peregrino del camino', { sk: T.claro, h: 'short', hc: '#8a5a2b', hd: 'hood', hdc: '#8a5a2b', cl: '#6b4a2b', tr: '#f4f1ea', b: 'full', a: ['staff'] }, 'tierno', ['Paso a paso se llega lejos.', 'El camino enseña.', 'Buen camino, compañía.']],
  ['Matilda la Arquera', 'arquera del bosque', { sk: T.rosado, h: 'ponytail', hc: '#c4572a', hd: 'hood', hdc: '#3a6b2a', cl: '#4a6b2a', tr: '#c98b4a', a: ['freckles'] }, 'pícaro', ['Flecha al centro de la diana.', 'Robo a los ricos el tiempo de antena.', 'Ojo de halcón.']],
  ['Maese Cornelio', 'heraldo del reino', { sk: T.claro, h: 'short', hc: '#2b1d14', hd: 'feather', hdc: '#2f4fb0', cl: '#c0392b', tr: '#f7c843', b: 'mustache' }, 'épico', ['¡Oíd, oíd!', 'Se hace saber a todo el reino…', 'Bando oficial de la taberna.']],
  ['Abuela Brígida', 'cuentacuentos del hogar', { sk: T.rosado, h: 'bun', hc: '#e8e8e8', cl: '#7a5a8a', tr: '#f4f1ea', a: ['glasses'] }, 'tierno', ['Acércate al fuego, criatura.', 'Esto me recuerda a una historia…', 'Con calma, que hay sopa.']],
  ['Kenji el Monje', 'monje errante', { sk: T.oliva, h: 'none', hd: 'straw', hdc: '#e8c87a', cl: '#8a6a3a', tr: '#3a3a3a' }, 'sabio', ['El agua tranquila refleja mejor.', 'Respira antes de juzgar.', 'Un paso, una idea.']],
  ['Zaida la Danzarina', 'danzarina andalusí', { sk: T.canela, h: 'long', hc: '#141414', hd: 'circlet', cl: '#c0392b', tr: '#f7c843', a: ['earring'] }, 'alegre', ['¡Que suene el laúd y la darbuka!', 'Bailemos esta noticia.', 'Alegría para el patio.']],
  ['Iñigo el Pirata', 'corsario sin bandera', { sk: T.canela, h: 'long', hc: '#141414', hd: 'tricorn', hdc: '#1a1a1a', cl: '#8e1b22', tr: '#f7c843', b: 'full', a: ['patch', 'earring'] }, 'bromista', ['¡Arr, noticias a estribor!', 'El mapa del tesoro era esto.', 'Ron no, té, que es temprano.']],
  ['Doña Urraca', 'cronista de la corte', { sk: T.rosado, h: 'bun', hc: '#5a3420', hd: 'circlet', cl: '#2f4f8f', tr: '#f7c843', a: ['book'] }, 'solemne', ['Que quede escrito en la crónica.', 'La historia la escriben quienes la cuentan.', 'Anotado, con fecha y firma.']],
  ['Wulfric el Leñador', 'leñador del valle', { sk: T.claro, h: 'short', hc: '#8a5a2b', hd: 'headband', hdc: '#c0392b', cl: '#8e1b22', tr: '#2b2b2b', b: 'big' }, 'alegre', ['¡Madera! Digo, ¡noticia!', 'El bosque da para todos.', 'Hacha al hombro y oídos atentos.']],
  ['Ximena la Curandera', 'curandera de la aldea', { sk: T.canela, h: 'long', hc: '#3b2416', hd: 'hood', hdc: '#6b4a8a', cl: '#4a3a5a', tr: '#9be38b', a: ['flower', 'freckles'] }, 'tierno', ['Un té de manzanilla para esta noticia.', 'Todo se cura con tiempo.', 'Cuídate mucho hoy.']],
  ['Merlino el Mago', 'mago de la colina', { sk: T.claro, h: 'short', hc: '#e8e8e8', hd: 'wizard', hdc: '#3f2f8f', cl: '#2f2f6b', tr: '#f7c843', b: 'big', a: ['staff', 'orb'], e: '#7ad0ff' }, 'místico', ['Ya lo vi en mi bola de cristal.', 'Abracadabra, resumen.', 'El tiempo es un río curioso.']],
  ['Sancha la Pastora', 'pastora de la sierra', { sk: T.oliva, h: 'braids', hc: '#6b3a1a', hd: 'straw', hdc: '#e8c87a', cl: '#8a6a3a', tr: '#f4f1ea', a: ['freckles'] }, 'alegre', ['Las ovejas ya están contadas.', 'Desde el monte se ve el valle entero.', 'Buen tiempo para pastar ideas.']],
  ['Rodrigo el Trovador', 'trovador enamorado', { sk: T.claro, h: 'curly', hc: '#3b2416', hd: 'beret', hdc: '#6b2b8a', cl: '#8a3a6b', tr: '#f7c843', a: ['lute'] }, 'tierno', ['Esto lo cantaré bajo un balcón.', 'Suspiro y sigo.', 'Una rima para ti.']],
  ['Saladina la Navegante', 'navegante del Mediterráneo', { sk: T.moreno, h: 'ponytail', hc: '#141414', hd: 'bandana', hdc: '#2f6fb0', cl: '#f4f1ea', tr: '#2f6fb0', a: ['earring'] }, 'épico', ['¡Viento a favor!', 'La brújula señala la noticia.', 'Puerto tras puerto, historia tras historia.']],
];

// Hidromielería: gente del gran salón, la colmena y la bodega (personajes originales)
const HIDROMIEL = [
  ['Brunilda la Hidromielera', 'maestra del gran salón', { sk: T.canela, h: 'braids', hc: '#c98a2b', hd: 'headband', hdc: '#8a5a2b', cl: '#6b3a12', tr: '#f2b134', a: ['tankard'] }, 'alegre', ['¡Salud! Un sorbo de miel y a pedalear.', 'La mejor ruta termina en el salón.', 'Dulce como la miel, firme como el roble.']],
  ['Odo el Apicultor', 'guardián de las colmenas', { sk: T.claro, h: 'short', hc: '#8a6a3a', hd: 'beekeeper', hdc: '#efe6d2', cl: '#e8dfc8', tr: '#f2b134', b: 'full', a: ['bee'] }, 'tierno', ['Despacio, que las abejas trabajan.', 'Cada flor del camino cuenta.', 'Sin prisa, como la miel que gotea.']],
  ['Sigrún la Escalda', 'cantora del salón', { sk: T.rosado, h: 'long', hc: '#e8c87a', hd: 'circlet', cl: '#3a5a8a', tr: '#f2b134', a: ['lute'] }, 'épico', ['Esta rodada merece una saga.', 'Cantaré cada kilómetro en el salón.', '¡Que las cuerdas suenen por tu gesta!']],
  ['Torvald el Tabernero', 'tabernero de la larga mesa', { r: 'dwarf', h: 'short', hc: '#b5651d', cl: '#5a3a1a', tr: '#f2b134', b: 'big', a: ['tankard', 'pipe'] }, 'bromista', ['La cuenta la pagas en kilómetros.', 'Si te cansas, la primera ronda va por mí.', 'Pedalea, que el barril no se toma solo.']],
  ['Hilda la Guardiana de Barricas', 'bodega de roble', { r: 'dwarf', sk: '#e8a983', h: 'braids', hc: '#d9a35f', hd: 'helmet', hdc: '#8a8a8a', cl: '#4a3a2a', tr: '#c4472a', a: ['horn'] }, 'solemne', ['Ninguna barrica sale sin mi permiso.', 'El roble guarda; el camino espera.', 'Firmes las ruedas, firmes los aros.']],
  ['Eira la Herbolaria', 'hidromiel de especias', { r: 'elf', h: 'long', hc: '#3b2416', hd: 'flowers', cl: '#4f7a3a', tr: '#f2b134', a: ['flower', 'freckles'] }, 'místico', ['Canela, clavo y un camino nuevo.', 'Las hierbas del borde también cuentan historias.', 'Respira hondo: huele a lluvia y a miel.']],
  ['Ulf el Tonelero', 'taller de barricas', { sk: T.moreno, h: 'short', hc: '#6b4226', cl: '#7a2b1a', tr: '#c49461', b: 'full', a: ['scar'] }, 'sabio', ['Aro a aro se arma el barril; pedal a pedal, el viaje.', 'Revisa la cadena como yo reviso las duelas.', 'La paciencia también es oficio.']],
  ['Gunnhild la del Braggot', 'cervecera de cebada y miel', { sk: T.oliva, h: 'bun', hc: '#6b3a1a', hd: 'bandana', hdc: '#c4472a', cl: '#5a4a2a', tr: '#d4ad52', a: ['tankard', 'freckles'] }, 'pícaro', ['Mitad cebada, mitad miel, toda atajos.', 'Por aquí no pasa nadie: ideal.', 'Shhh, que esta ruta es secreta.']],
  ['Zumbido el Gnomo de la Colmena', 'cuidador de zánganos', { r: 'gnome', h: 'curly', hc: '#e8c87a', hd: 'beekeeper', hdc: '#f2b134', cl: '#3b2b1a', tr: '#141414', a: ['bee', 'glasses'] }, 'bromista', ['Bzzz… perdón, se me escapó.', 'Vuelo bajo pero llego primero.', 'Si ves abejas, saluda: son primas.']],
  ['Asa la Cantinera', 'jarras para todo el salón', { sk: T.rosado, h: 'ponytail', hc: '#a0522d', cl: '#8a3a2a', tr: '#f4f1ea', a: ['tankard', 'earring'] }, 'alegre', ['¡Otra ronda de kilómetros!', 'Sonríe, que la bajada viene.', 'Jarra llena, ruedas infladas.']],
  ['Bjarni el Lobo de la Puerta', 'guardián del portón', { r: 'wolf', hd: 'horned', hdc: '#6b6b6b', cl: '#3a2a1a', tr: '#c4472a', a: ['horn'] }, 'épico', ['¡Auuu! El portón se abre para ti.', 'Ningún camino es demasiado largo para la manada.', 'Sopla el cuerno: ¡partimos!']],
  ['Solveig la Vigía del Fogón', 'guardiana del fuego', { sk: T.claro, h: 'long', hc: '#f2d16b', hd: 'hood', hdc: '#8a2b1a', cl: '#4a1a10', tr: '#ff8c2a', a: ['staff', 'orb'], e: '#ff8c2a' }, 'místico', ['El fuego del salón alumbra tu regreso.', 'Las brasas dicen que vas bien.', 'Mientras arda el fogón, hay camino.']],
  ['Gorm el Orco Brindador', 'primero en levantar el cuerno', { r: 'orc', h: 'mohawk', hc: '#141414', cl: '#5a3a1a', tr: '#c4472a', a: ['horn', 'paint'] }, 'bromista', ['¡Brindo por cada hueco que esquivamos!', 'Mis piernas son de roble, mi garganta de miel.', 'Si subo esta loma, invito yo.']],
  ['Inga la Contadora de Mieles', 'libro de cuentas de la bodega', { sk: T.claro, h: 'bun', hc: '#bdbdbd', cl: '#5a3a6b', tr: '#f2b134', a: ['glasses', 'book'] }, 'sabio', ['Anotado: kilómetros, desnivel y miel.', 'Los números no mienten; las piernas a veces.', 'Una ruta bien medida es media ruta.']],
  ['Halvar el Remero', 'remero del río de miel', { sk: T.canela, h: 'short', hc: '#3b2416', hd: 'bandana', hdc: '#2f6fb0', cl: '#2f4a6b', tr: '#f4f1ea', b: 'mustache', a: ['earring', 'tankard'] }, 'épico', ['¡Remo o pedal, la corriente es nuestra!', 'Viento de frente, corazón de roble.', 'Puerto a la vista: el salón nos espera.']],
  ['Liv la Recolectora de Flores', 'praderas melíferas', { sk: T.oliva, h: 'curly', hc: '#3b2416', hd: 'straw', hdc: '#e8c87a', cl: '#6b8a3a', tr: '#ee77b0', a: ['flower', 'bee'] }, 'tierno', ['Mira las flores del camino, son para ti.', 'Paremos un ratito, que hay sombra.', 'Llegaste: te guardé una flor.']],
  ['Ketill el Troll del Sótano', 'vigía de la bodega oscura', { r: 'troll', h: 'wild', hc: '#4a6b3a', cl: '#3b2b1a', tr: '#c49461', a: ['tankard'] }, 'sombrío', ['Rueda antes de que se apaguen las antorchas.', 'Abajo, en la bodega, todo es silencio.', 'La noche cae; el barril no espera.']],
  ['Ylva la Druida de la Colmena', 'sacerdotisa de las abejas', { r: 'elf', h: 'long', hc: '#c9a24a', hd: 'antlers', cl: '#3a4a2a', tr: '#f2b134', a: ['bee', 'glow'], e: '#f2b134' }, 'místico', ['La colmena canta: hoy es buen día.', 'Sigue el zumbido, conoce el camino.', 'Toda flor es una puerta.']],
  ['Ásgeir de la Larga Mesa', 'anfitrión del banquete', { sk: T.claro, h: 'long', hc: '#c98a2b', hd: 'crown', cl: '#7a1a1a', tr: '#f2b134', b: 'big', pads: true, a: ['horn'] }, 'solemne', ['Que se abra el banquete: llegó quien rueda.', 'En esta mesa caben todos los caminos.', 'Brindemos con calma y lleguemos con honor.']],
  ['Mjöll la Aprendiz', 'aprendiz de hidromielera', { sk: T.rosado, h: 'braids', hc: '#e8c87a', hd: 'headband', hdc: '#f2b134', cl: '#6b8a3a', tr: '#f2b134', a: ['freckles', 'tankard'] }, 'alegre', ['¡Mi primera ruta y mi primer hidromiel!', 'Aprendo rápido: ¡ya sé frenar!', 'Cada vuelta, un poquito más dulce.']],
];

// León Ácratus (alias Sepulcrus): el personaje del usuario, en cada estilo. La cara está dibujada a mano
// píxel a píxel (rizos, gafas de montura delgada, barba arreglada); el motor solo pone ropa, tocado y accesorios.
// Diseño canónico en tinta-libre/personajes/leon-acratus.json.
const LEON_CARA = { px: {
  rows: [
    '......gHh.hHg.hH....',
    '....hHHHhHHHhHHHh...',
    '...hHgHHHHgHHHHgHh..',
    '...HHHHhHHHHhHHHHH..',
    '...HHhHHHHHHhHHHH...',
    '...HHHSSSHHSSSSHH...',
    '...HHSSSSSSSSSSHH...',
    '...HSSSSSSSSSSSSH...',
    '...HSHHHSSSSHHHSH...',
    '..EFFFFFFSSFFFFFFE..',
    '..EFLWPLFFFFLPWLFE..',
    '..EFLLPLFSSFLPLLFE..',
    '...FFFFFFssFFFFFF...',
    '...BSSSSSssSSSSSB...',
    '...BBSSbBBBBbSSBB...',
    '...BBBbBMMMMBbBBB...',
    '....BBbBBBBBBbBB....',
    '.....BBBbBBbBBB.....',
    '......BBBBBBBB......',
  ],
  pal: { H: '#3a2416', h: '#5a3a24', g: '#7a5236', S: '#e9b994', s: '#c99572', E: '#d9a37e', F: '#1a1a1a', L: '#f6dcc6', W: '#ffffff', P: '#3b2a1a', B: '#3a2416', b: '#5a3a24', M: '#b8695a' },
} };
const LEON = [
  { id: 'leon-hid', cat: 'hidromiel', name: 'León Ácratus', role: 'Maestro Hidromielero', tone: 'sabio',
    spec: { ...LEON_CARA, cl: '#b9ada1', tr: '#3d5c4c', a: ['tankard'] },
    quotes: ['Buen hidromiel y buena ruta: las dos se hacen sin prisa.', 'Al final del camino nos espera el salón.', 'Miel, roble y pedal: así se fermenta un buen viaje.'] },
  { id: 'leon-anq', cat: 'anarquista', name: 'León Ácratus', role: 'ácrata del pedal', tone: 'rebelde',
    spec: { ...LEON_CARA, hd: 'beret', hdc: '#141414', star: true, cl: '#2b2b2b', tr: '#d9343a', a: ['book'] },
    quotes: ['Ni amos ni atascos: la ciudad también es de quien pedalea.', 'Cada ciclorruta se conquistó en asamblea.', 'Apoyo mutuo: si ves a alguien varado, para.'] },
  { id: 'leon-wow', cat: 'wow', name: 'León Ácratus', role: 'archimago del camino', tone: 'épico',
    spec: { ...LEON_CARA, cl: '#1f3b7a', tr: '#f2c14e', pads: true, e: '#7ad0ff', a: ['staff', 'orb'] },
    quotes: ['¡Por la ciclorruta y por la gloria!', 'Mi bastón señala el norte; mis piernas hacen el resto.', 'Misión aceptada: llegar antes de que llueva.'] },
  { id: 'leon-tes', cat: 'tes', name: 'León Ácratus', role: 'escaldo de las tierras frías', tone: 'épico',
    spec: { ...LEON_CARA, hd: 'circlet', cl: '#6b4a2b', tr: '#c9b28a', pads: true, a: ['horn'] },
    quotes: ['Que los escaldos canten esta subida.', 'El frío del páramo no detiene a quien rueda.', 'Por Sovngarde… o al menos por la próxima tienda.'] },
];

const mk = (cat, prefix) => (r, i) => ({ id: `${prefix}${String(i + 1).padStart(2, '0')}`, cat, name: r[0], role: r[1], spec: r[2], tone: r[3], quotes: r[4] });

const CHAR_CATS = [
  { id: 'medieval', name: 'Medievales', count: MEDIEVALES.length },
  { id: 'anarquista', name: 'Anarquistas', count: ANARQUISTAS.length + 1 },
  { id: 'wow', name: 'Tributo WoW', count: WOW.length + 1 },
  { id: 'tes', name: 'Tributo Elder Scrolls', count: TES.length + 1 },
  { id: 'hidromiel', name: 'Hidromielería', count: HIDROMIEL.length + 1 },
];

const CHARACTERS = [
  ...LEON,
  ...MEDIEVALES.map(mk('medieval', 'med')),
  ...ANARQUISTAS.map(mk('anarquista', 'anq')),
  ...WOW.map(mk('wow', 'wow')),
  ...TES.map(mk('tes', 'tes')),
  ...HIDROMIEL.map(mk('hidromiel', 'hid')),
];

const getChar = id => CHARACTERS.find(c => c.id === id) || CHARACTERS[0];

return { CHAR_CATS, CHARACTERS, getChar };
})();
M['portraits'] = (() => {
// Retratos pixel art 20x20 de los personajes, armados por capas:
// pelo de atrás → orejas/cuernos → cabeza → rasgos de raza → pelo → barba → boca → tocado → accesorios.
const {rasterize, drawGrid} = M['sprites'];
const {mix} = M['skin-engine'];

const RACE_SKIN = {
  human: '#f1b98a', elf: '#f3d2b3', orc: '#6fa04a', troll: '#5f9fb0', dwarf: '#e8a983', gnome: '#f5c4a8',
  goblin: '#8cc152', undead: '#9fae9a', cat: '#d9a35f', lizard: '#4f9a6a', tauren: '#8a5a3a', draenei: '#7d9be0',
  panda: '#f4f1ea', wolf: '#7b7f86', dunmer: '#7f8a99', altmer: '#e8c87a',
};

function portraitPrims(sp, open = false) {
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
function portraitURL(spec, ink, open = false, scale = 4) {
  const key = JSON.stringify(spec) + ink + open + scale;
  if (cache.has(key)) return cache.get(key);
  const url = drawGrid(rasterize(portraitPrims(spec, open), 20), { ink, text: '#ffffff' }, scale).toDataURL();
  cache.set(key, url);
  return url;
}

return { portraitPrims, portraitURL };
})();
M['look'] = (() => {
// Asamblea — apariencia: los skins, fuentes pixel y personajes de Tinta Libre aplicados a la app.
// Expone window.Look para los scripts clásicos. GPL-3.0-or-later
const {SKINS: BASE, CATEGORIES: BASE_CATS} = M['skins-data'];
const {CONSULTORIA} = M['skins-consultoria'];
const {palette, patternURL, mix, contrast} = M['skin-engine'];
const {spriteURL} = M['sprites'];
const {FONTS: PX_FONTS} = M['fonts-data'];
const {CHARACTERS, CHAR_CATS} = M['characters-data'];
const {portraitPrims} = M['portraits'];
const {rasterize, drawGrid} = M['sprites'];

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
const SKINS = [...OWN, ...PRO, ...BASE];
const CATEGORIES = [{ id: 'asamblea', name: 'Asamblea', count: OWN.length },
  { id: 'demos', name: 'DEMOS Asuntos Públicos', count: DEMOS.length },
  { id: 'consultoria', name: 'Consultoría sobria', count: CONSULTORIA.length }, ...BASE_CATS];
// «sobria»: sin pixel, para los skins corporativos
const FONTS = [{ id: 'silkscreen', name: 'Silkscreen (original)', family: 'Silkscreen' },
  { id: 'sobria', name: 'Atkinson sobria (sin pixel, corporativa)', family: 'Atkinson Hyperlegible' }, ...PX_FONTS];
const isCorp = s => s.cat === 'demos' || s.cat === 'consultoria';
const BODY = [['atkinson', 'Atkinson Hyperlegible (lectura cómoda)'], ['pixel', 'La misma fuente pixel en todo']];
const FX = [['apagado', 'Sin efectos'], ['suave', 'Suaves'], ['intenso', 'Intensos']];

let st = { ...DEF };
try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} };

const NEON_RPG = /synth|vapor|cyber|8 bits|16 bits|portátil|monitor|terminal|tormenta eléctrica|atardecer retro/i;
function themeOf(s) {
  if (isCorp(s)) return 'corp';
  if (s.cat === 'cyber' || s.cat === 'asamblea' && s.id === 'asamblea-noche' || (s.cat === 'rpg' && NEON_RPG.test(s.name))) return 'neon';
  if (s.cat === 'anarquista') return 'term';
  if (s.cat === 'asamblea') return 'plain';
  return 'old';
}
const getSkin = id => SKINS.find(s => s.id === id) || SKINS[0];

let pal = null, skin = null;
function applySkin(id = st.skin, { autoFont = false } = {}) {
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
function fontFamily(id) {
  const f = FONTS.find(x => x.id === id) || FONTS[0];
  if (f.family) return f.family;
  const fam = 'PX-' + f.id;
  if (!loaded.has(fam)) { const ff = new FontFace(fam, `url(${f.file})`); document.fonts.add(ff); ff.load().catch(() => {}); loaded.add(fam); }
  return fam;
}
function applyFont(id = st.font, body = st.body) {
  const f = FONTS.find(x => x.id === id) || FONTS[0];
  st.font = f.id; st.body = body;
  const fam = fontFamily(f.id);
  const r = document.documentElement.style;
  r.setProperty('--pix', `"${fam}", "Silkscreen", "Atkinson Hyperlegible", monospace`);
  r.setProperty('--body', body === 'pixel' ? `"${fam}", "Atkinson Hyperlegible", system-ui, sans-serif` : '"Atkinson Hyperlegible", system-ui, sans-serif');
  save(); emit();
}
function applyFx(level = st.fx) {
  st.fx = level;
  const b = document.body;
  if (b) { b.classList.toggle('fx', level !== 'apagado'); b.classList.toggle('fx2', level === 'intenso'); }
  save();
}

// retratos 20x20 de los personajes como lienzo (dibujo síncrono para los mosaicos y la grabación)
const pcache = new Map();
function charById(id) { return CHARACTERS.find(c => c.id === id); }
function portraitCanvas(id, open = false) {
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

return { SKINS, CATEGORIES, FONTS, isCorp, BODY, FX, themeOf, getSkin, applySkin, fontFamily, applyFont, applyFx, charById, portraitCanvas };
})();
})();
