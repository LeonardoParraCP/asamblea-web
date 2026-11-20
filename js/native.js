/* Asamblea — puente común con la plataforma.
 * Escritorio (Electron): window.asmDesktop (preload.js) — binarios como Uint8Array.
 * Android: window.AsambleaAndroid (@JavascriptInterface) — binarios en base64.
 * iOS: webkit.messageHandlers.asm (WKScriptMessageHandler) — binarios en base64.
 * Respuestas nativas: window.__asmRes(id, ok, json). Eventos: window.__asmEvt(nombre, json).
 * GPL-3.0-or-later */
'use strict';
(function () {
  const listeners = {};
  const pending = new Map();
  let seq = 0;
  let kind = 'web';
  if (window.asmDesktop) kind = 'desktop';
  else if (window.AsambleaAndroid) kind = 'android';
  else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.asm) kind = 'ios';
  const binRaw = kind === 'desktop';

  function emit(ev, data) {
    (listeners[ev] || []).slice().forEach(f => { try { f(data); } catch (e) { console.error('evento ' + ev, e); } });
  }
  window.__asmEvt = (ev, json) => emit(ev, typeof json === 'string' ? JSON.parse(json) : json);
  window.__asmRes = (id, ok, json) => {
    const p = pending.get(id); if (!p) return; pending.delete(id);
    let v = json; if (typeof json === 'string' && json) { try { v = JSON.parse(json); } catch { v = json; } }
    if (ok) p.res(v); else p.rej(new Error((v && v.error) || String(v || 'error nativo')));
  };
  if (kind === 'desktop') window.asmDesktop.onEvent((ev, data) => emit(ev, data));

  function call(method, args = {}) {
    if (kind === 'desktop') return window.asmDesktop.call(method, args);
    if (kind === 'web') return Promise.reject(new Error('No disponible en el navegador: ' + method));
    return new Promise((res, rej) => {
      const id = ++seq; pending.set(id, { res, rej });
      const a = JSON.stringify(args);
      if (kind === 'android') window.AsambleaAndroid.call(id, method, a);
      else window.webkit.messageHandlers.asm.postMessage({ id, method, args: a });
    });
  }
  function on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); return () => off(ev, fn); }
  function off(ev, fn) { listeners[ev] = (listeners[ev] || []).filter(f => f !== fn); }

  // ---- binarios ----
  function b64enc(u8) {
    let s = ''; const CH = 0x8000;
    for (let i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
    return btoa(s);
  }
  function b64dec(s) {
    const bin = atob(s); const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  }
  const enc = u8 => binRaw ? u8 : b64enc(u8);
  function dec(d) {
    if (d == null) return new Uint8Array(0);
    if (typeof d === 'string') return b64dec(d);
    if (d instanceof Uint8Array) return d;
    if (d.buffer) return new Uint8Array(d.buffer, d.byteOffset || 0, d.byteLength);
    if (Array.isArray(d.data)) return new Uint8Array(d.data);
    return new Uint8Array(d);
  }

  // ---- TCP ----
  const conns = new Map();
  class TcpConn {
    constructor(cid, remote) { this.cid = cid; this.remote = remote || ''; this.ondata = null; this.onclose = null; this.closed = false; this.inflight = 0; conns.set(cid, this); }
    send(u8) {
      if (this.closed) return Promise.reject(new Error('conexión cerrada'));
      this.inflight += u8.length;
      return call('tcpSend', { cid: this.cid, d: enc(u8) }).finally(() => { this.inflight -= u8.length; });
    }
    close() { if (this.closed) return; this.closed = true; call('tcpClose', { cid: this.cid }).catch(() => {}); }
  }
  on('tcpData', e => { const c = conns.get(e.cid); if (c && c.ondata) c.ondata(dec(e.d)); });
  on('tcpClose', e => { const c = conns.get(e.cid); if (!c) return; conns.delete(e.cid); c.closed = true; if (c.onclose) c.onclose(e.err || null); });
  const servers = new Map();
  on('tcpAccept', e => { const s = servers.get(e.sid); const c = new TcpConn(e.cid, e.remote); if (s) s(c); else c.close(); });

  async function tcpConnect(host, port, opts = {}) {
    const cid = 'c' + Date.now().toString(36) + (++seq);
    const c = new TcpConn(cid, host + ':' + port);
    try { await call('tcpConnect', { cid, host, port, tls: !!opts.tls, timeout: opts.timeout || 12000 }); }
    catch (e) { conns.delete(cid); throw e; }
    return c;
  }
  async function tcpListen(port, onConn) {
    const sid = 'l' + (++seq);
    servers.set(sid, onConn);
    const r = await call('tcpListen', { sid, port });
    return { sid, port: r.port, close: () => { servers.delete(sid); call('tcpUnlisten', { sid }).catch(() => {}); } };
  }

  // ---- UDP ----
  const udps = new Map();
  on('udpData', e => { const u = udps.get(e.uid); if (u && u.onmessage) u.onmessage(dec(e.d), e.from, e.port); });
  async function udpOpen(port, onmessage) {
    const uid = 'u' + (++seq);
    const u = { uid, onmessage, send: (host, p, u8) => call('udpSend', { uid, host, port: p, d: enc(u8) }), close: () => { udps.delete(uid); call('udpClose', { uid }).catch(() => {}); } };
    udps.set(uid, u);
    await call('udpOpen', { uid, port: port || 0 });
    return u;
  }

  // ---- archivos (grabaciones) ----
  async function fileOpen(name, mime) {
    const fid = 'f' + (++seq);
    const r = await call('fileOpen', { fid, name, mime });
    return { fid, path: r.path, name: r.name || name,
      write: u8 => call('fileWrite', { fid, d: enc(u8) }),
      close: () => call('fileClose', { fid }) };
  }

  window.Native = {
    kind, call, on, off, enc, dec, b64enc, b64dec,
    tcpConnect, tcpListen, udpOpen, fileOpen,
    get available() { return kind !== 'web'; },
    isMobile: kind === 'android' || kind === 'ios',
  };
})();
