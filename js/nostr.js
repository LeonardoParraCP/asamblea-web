/* Asamblea — encuentro automático por relés públicos de Nostr (sin servidor propio).
 * Solo se usa para intercambiar la señalización (oferta/respuesta WebRTC); el audio y el video
 * siguen yendo directo entre los equipos.
 * - Cada sala o invitación tiene una clave secreta aleatoria que solo viaja dentro del enlace.
 * - Los mensajes van cifrados con AES-GCM con esa clave; los relés solo ven datos opacos y un
 *   tema aleatorio derivado de la clave. Eventos efímeros (no se guardan en los relés).
 * - Firma Schnorr BIP-340 sobre secp256k1 implementada aquí mismo (sin dependencias).
 * GPL-3.0-or-later */
'use strict';
const Nostr = (() => {
  const KIND = 25050; // efímero (20000–29999): los relés lo reenvían y no lo guardan
  const DEFAULT_RELAYS = ['wss://nos.lol', 'wss://relay.primal.net', 'wss://nostr.mom', 'wss://offchain.pub', 'wss://relay.snort.social', 'wss://nostr.bitcoiner.social'];
  const relays = () => (Settings.relays && Settings.relays.length ? Settings.relays : DEFAULT_RELAYS).filter(u => /^wss?:\/\//.test(u));

  /* ---------- secp256k1 + BIP-340 ---------- */
  const P = 2n ** 256n - 2n ** 32n - 977n;
  const N = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
  const G = [0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n, 1n];
  const mod = (a, m = P) => { const r = a % m; return r >= 0n ? r : r + m; };
  function pow(b, e, m) { let r = 1n; b = mod(b, m); while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; }
  const inv = a => pow(a, P - 2n, P);
  function dbl([X, Y, Z]) {
    if (Y === 0n) return [0n, 1n, 0n];
    const S = mod(4n * X * Y * Y), M = mod(3n * X * X), X2 = mod(M * M - 2n * S);
    return [X2, mod(M * (S - X2) - 8n * Y ** 4n), mod(2n * Y * Z)];
  }
  function add(A, B) {
    if (A[2] === 0n) return B; if (B[2] === 0n) return A;
    const [X1, Y1, Z1] = A, [X2, Y2, Z2] = B;
    const Z1s = Z1 * Z1 % P, Z2s = Z2 * Z2 % P;
    const U1 = X1 * Z2s % P, U2 = X2 * Z1s % P, S1 = Y1 * Z2s * Z2 % P, S2 = Y2 * Z1s * Z1 % P;
    if (U1 === U2) return S1 === S2 ? dbl(A) : [0n, 1n, 0n];
    const H = mod(U2 - U1), R = mod(S2 - S1), H2 = H * H % P, H3 = H2 * H % P;
    const X3 = mod(R * R - H3 - 2n * U1 * H2);
    return [X3, mod(R * (U1 * H2 - X3) - S1 * H3), H * Z1 * Z2 % P];
  }
  function mul(k, Q = G) { let R = [0n, 1n, 0n]; while (k > 0n) { if (k & 1n) R = add(R, Q); Q = dbl(Q); k >>= 1n; } return R; }
  function affine([X, Y, Z]) { const zi = inv(Z), z2 = zi * zi % P; return [X * z2 % P, Y * z2 * zi % P]; }
  const hex = u8 => [...u8].map(b => b.toString(16).padStart(2, '0')).join('');
  const unhex = s => new Uint8Array(s.match(/../g).map(x => parseInt(x, 16)));
  const big = u8 => BigInt('0x' + (hex(u8) || '0'));
  const be32 = n => unhex(n.toString(16).padStart(64, '0'));
  const sha = async u8 => new Uint8Array(await crypto.subtle.digest('SHA-256', u8));
  const tagHashes = {};
  async function tagged(tag, ...parts) {
    const th = tagHashes[tag] || (tagHashes[tag] = await sha(txtEnc.encode(tag)));
    return sha(concatBytes([th, th, ...parts]));
  }
  function keypair(sk) {
    let d = sk ? big(sk) : 0n;
    while (d <= 0n || d >= N) d = big(crypto.getRandomValues(new Uint8Array(32)));
    const [x, y] = affine(mul(d));
    return { d: (y & 1n) ? N - d : d, px: be32(x) };
  }
  async function sign(msg, kp, aux = crypto.getRandomValues(new Uint8Array(32))) {
    const t = be32(kp.d ^ big(await tagged('BIP0340/aux', aux)));
    const k0 = mod(big(await tagged('BIP0340/nonce', t, kp.px, msg)), N);
    if (k0 === 0n) throw new Error('nonce');
    const [rx, ry] = affine(mul(k0));
    const k = (ry & 1n) ? N - k0 : k0;
    const e = mod(big(await tagged('BIP0340/challenge', be32(rx), kp.px, msg)), N);
    return concatBytes([be32(rx), be32(mod(k + e * kp.d, N))]);
  }

  /* ---------- cifrado ---------- */
  async function channelKeys(secret) {
    const key = await crypto.subtle.importKey('raw', secret, 'AES-GCM', false, ['encrypt', 'decrypt']);
    const topic = hex((await sha(concatBytes([txtEnc.encode('asamblea/tema/'), secret]))).slice(0, 16));
    return { key, topic };
  }
  async function seal(key, obj) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, txtEnc.encode(JSON.stringify(obj))));
    return Native.b64enc(concatBytes([iv, ct]));
  }
  async function unseal(key, s) {
    const u8 = Native.b64dec(s);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: u8.slice(0, 12) }, key, u8.slice(12));
    return JSON.parse(txtDec.decode(pt));
  }

  /* ---------- canal cifrado sobre varios relés ---------- */
  async function open(secret, onMsg, opts = {}) {
    const { key, topic } = await channelKeys(secret);
    const kp = keypair();
    const myPub = hex(kp.px);
    const seen = new Set();
    const socks = [];
    let closed = false;
    const sub = 'asm' + randomId(4);
    const since = Math.floor(Date.now() / 1000) - 30;
    const status = { relays: 0, ok: 0, failed: 0 };
    const changed = () => opts.onStatus && opts.onStatus({ ...status, relays: socks.filter(s => s.ws && s.ws.readyState === 1).length });

    function connect(url, slot) {
      if (closed) return;
      let ws;
      try { ws = new WebSocket(url); } catch { return; }
      slot.ws = ws;
      ws.onopen = () => { slot.fails = 0; ws.send(JSON.stringify(['REQ', sub, { kinds: [KIND], '#t': [topic], since }])); slot.queue.splice(0).forEach(m => ws.send(m)); changed(); };
      ws.onmessage = async e => {
        let m; try { m = JSON.parse(e.data); } catch { return; }
        if (m[0] === 'OK') { if (m[2]) status.ok++; else { status.failed++; console.warn('relé', url, m[3]); } changed(); return; }
        if (m[0] !== 'EVENT' || m[1] !== sub) return;
        const ev = m[2];
        if (!ev || seen.has(ev.id) || ev.pubkey === myPub) return;
        seen.add(ev.id);
        if (ev.created_at < Math.floor(Date.now() / 1000) - 600) return; // nada viejo
        try { const o = await unseal(key, ev.content); onMsg(o); } catch { /* no es para nosotros o está dañado */ }
      };
      ws.onclose = () => {
        slot.ws = null; changed();
        if (closed) return;
        slot.fails = (slot.fails || 0) + 1;
        setTimeout(() => connect(url, slot), Math.min(30000, 1500 * 2 ** Math.min(slot.fails, 5)));
      };
      ws.onerror = () => {};
    }
    for (const url of (opts.relays || relays())) { const slot = { url, queue: [] }; socks.push(slot); connect(url, slot); }

    async function send(obj) {
      if (closed) return;
      const ev = { pubkey: myPub, created_at: Math.floor(Date.now() / 1000), kind: KIND, tags: [['t', topic]], content: await seal(key, obj) };
      const id = await sha(txtEnc.encode(JSON.stringify([0, ev.pubkey, ev.created_at, ev.kind, ev.tags, ev.content])));
      ev.id = hex(id); ev.sig = hex(await sign(id, kp));
      const msg = JSON.stringify(['EVENT', ev]);
      for (const s of socks) { if (s.ws && s.ws.readyState === 1) s.ws.send(msg); else if (s.queue.length < 20) s.queue.push(msg); }
    }
    function close() {
      closed = true;
      for (const s of socks) { try { if (s.ws) { if (s.ws.readyState === 1) s.ws.send(JSON.stringify(['CLOSE', sub])); s.ws.close(); } } catch {} }
    }
    return { send, close, topic, get connected() { return socks.filter(s => s.ws && s.ws.readyState === 1).length; } };
  }

  const newSecret = () => crypto.getRandomValues(new Uint8Array(16));
  return { open, newSecret, relays, DEFAULT_RELAYS, _t: { keypair, sign, hex, unhex } };
})();
