/* Asamblea — utilidades compartidas. GPL-3.0-or-later */
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
}

class Emitter {
  constructor() { this._l = {}; }
  on(ev, fn) { (this._l[ev] = this._l[ev] || []).push(fn); return this; }
  off(ev, fn) { this._l[ev] = (this._l[ev] || []).filter(f => f !== fn); }
  emit(ev, ...a) { (this._l[ev] || []).slice().forEach(f => { try { f(...a); } catch (e) { console.error(ev, e); } }); }
}

function randomId(bytes = 8) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return [...a].map(b => b.toString(16).padStart(2, '0')).join('');
}
function randomPin() { return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0'); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const txtEnc = new TextEncoder(), txtDec = new TextDecoder();

function concatBytes(list) {
  let n = 0; for (const a of list) n += a.length;
  const out = new Uint8Array(n); let o = 0;
  for (const a of list) { out.set(a, o); o += a.length; }
  return out;
}

/* ---- códigos de invitación: JSON → deflate-raw → base64url, con prefijo de versión ---- */
const CODE_PREFIX = 'ASM1-';
function b64url(u8) { return Native.b64enc(u8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function unb64url(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Native.b64dec(s); }
async function deflate(u8) {
  const cs = new CompressionStream('deflate-raw');
  const out = new Response(new Blob([u8]).stream().pipeThrough(cs)).arrayBuffer();
  return new Uint8Array(await out);
}
async function inflate(u8) {
  const ds = new DecompressionStream('deflate-raw');
  return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer());
}
async function encodeCode(obj, prefix = CODE_PREFIX) { return prefix + b64url(await deflate(txtEnc.encode(JSON.stringify(obj)))); }
async function decodeCode(code) {
  const m = String(code || '').replace(/\s+/g, '').match(/AS[MR]1-([A-Za-z0-9_-]+)/);
  if (!m) throw new Error('Ese texto no contiene un código de Asamblea (empieza por ASM1-).');
  try { return JSON.parse(txtDec.decode(await inflate(unb64url(m[1])))); }
  catch { throw new Error('El código está incompleto o dañado. Pide que te lo envíen de nuevo completo.'); }
}

/* ---- ajustes ---- */
const DEFAULTS = {
  name: '', avatar: 'leon', color: '#c0392b',
  stun: true,
  stunList: ['stun:stun.nextcloud.com:443', 'stun:stun.sipgate.net:3478', 'stun:stun.antisip.com:3478'],
  port: 47800, quality: 'normal', upKbps: 3000,
  micId: '', camId: '', speakerId: '',
  noise: true, echo: true,
  destinations: [],
  layout: 'grid',
  nostr: true, autoAdmit: false, bigRoom: 6, relays: [],
};
/* página pública para unirse sin instalar (estática; la invitación va después del #) */
const WEB_BASE = 'https://leonardoparracp.github.io/asamblea-web/';
const Settings = (() => {
  let s = {};
  try { s = JSON.parse(localStorage.getItem('asamblea.settings') || '{}'); } catch { s = {}; }
  const st = Object.assign({}, DEFAULTS, s);
  st.save = () => { try { const o = { ...st }; delete o.save; localStorage.setItem('asamblea.settings', JSON.stringify(o)); } catch {} };
  return st;
})();

const QUALITY = {
  ligero: { w: 854, h: 480, fps: 24, vbps: 1200000, abps: 96000, cam: { width: 640, height: 360, frameRate: 24 } },
  normal: { w: 1280, h: 720, fps: 30, vbps: 2500000, abps: 128000, cam: { width: 1280, height: 720, frameRate: 30 } },
  alta: { w: 1920, h: 1080, fps: 30, vbps: 4500000, abps: 160000, cam: { width: 1920, height: 1080, frameRate: 30 } },
};

function toast(msg, kind = '') {
  let box = $('#toasts'); if (!box) { box = h('div', { id: 'toasts' }); document.body.append(box); }
  const t = h('div', { class: 'toast ' + kind, role: 'status' }, msg);
  box.append(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, kind === 'err' ? 7000 : 3800);
}

function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const hh = Math.floor(sec / 3600), mm = Math.floor(sec / 60) % 60, ss = sec % 60;
  return (hh ? hh + ':' : '') + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
}
function stamp() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { try { await Native.call('copy', { text }); return true; } catch { return false; } }
}
async function pasteText() {
  try { const t = await navigator.clipboard.readText(); if (t) return t; } catch {}
  try { const r = await Native.call('paste', {}); return (r && r.text) || ''; } catch { return ''; }
}
async function shareText(text, title) {
  if (Native.isMobile) { try { await Native.call('share', { text, title }); return true; } catch {} }
  if (navigator.share) { try { await navigator.share({ text, title }); return true; } catch {} }
  return false;
}

/* Temporizador en un Worker: no lo frena el navegador cuando la ventana está oculta. */
function workerTicker(ms, fn) {
  const src = `let t=null;onmessage=e=>{clearInterval(t);if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}`;
  try {
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    w.onmessage = fn; w.postMessage(ms);
    return { stop: () => { w.postMessage(0); w.terminate(); } };
  } catch {
    const t = setInterval(fn, ms); return { stop: () => clearInterval(t) };
  }
}
