/* Asamblea — cliente RTMP/RTMPS escrito en JavaScript (sin ffmpeg), igual en todas las plataformas.
 * Publica H.264 + AAC (o Opus con «Enhanced RTMP») a YouTube, Twitch, Facebook, PeerTube, Owncast
 * o cualquier servidor RTMP. GPL-3.0-or-later */
'use strict';
const AMF = {
  enc(v) {
    const out = [];
    const num = n => { const b = new Uint8Array(9); b[0] = 0; new DataView(b.buffer).setFloat64(1, n); out.push(b); };
    const str = (s, marker = true) => { const t = txtEnc.encode(s); const b = new Uint8Array((marker ? 3 : 2) + t.length); let o = 0; if (marker) b[o++] = 2; b[o++] = t.length >> 8; b[o++] = t.length & 255; b.set(t, o); out.push(b); };
    const any = x => {
      if (x === null || x === undefined) out.push(new Uint8Array([5]));
      else if (typeof x === 'number') num(x);
      else if (typeof x === 'boolean') out.push(new Uint8Array([1, x ? 1 : 0]));
      else if (typeof x === 'string') str(x);
      else if (x && x.__ecma) { const b = new Uint8Array(5); b[0] = 8; new DataView(b.buffer).setUint32(1, Object.keys(x.v).length); out.push(b); props(x.v); }
      else if (typeof x === 'object') { out.push(new Uint8Array([3])); props(x); }
    };
    const props = o => { for (const [k, val] of Object.entries(o)) { str(k, false); any(val); } out.push(new Uint8Array([0, 0, 9])); };
    any(v);
    return concatBytes(out);
  },
  encAll(list) { return concatBytes(list.map(x => AMF.enc(x))); },
  dec(u8) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength); let o = 0; const res = [];
    const sstr = () => { const n = dv.getUint16(o); o += 2; const s = txtDec.decode(u8.subarray(o, o + n)); o += n; return s; };
    const obj = () => { const r = {}; while (o < u8.length) { const k = sstr(); if (!k && u8[o] === 9) { o++; break; } r[k] = val(); } return r; };
    const val = () => {
      const t = u8[o++];
      switch (t) {
        case 0: { const n = dv.getFloat64(o); o += 8; return n; }
        case 1: return !!u8[o++];
        case 2: return sstr();
        case 3: return obj();
        case 5: case 6: return null;
        case 8: o += 4; return obj();
        case 10: { const n = dv.getUint32(o); o += 4; const a = []; for (let i = 0; i < n; i++) a.push(val()); return a; }
        case 11: o += 10; return null;
        case 12: { const n = dv.getUint32(o); o += 4; const s = txtDec.decode(u8.subarray(o, o + n)); o += n; return s; }
        default: throw new Error('AMF ' + t);
      }
    };
    try { while (o < u8.length) res.push(val()); } catch {}
    return res;
  },
};

class RtmpPublisher extends Emitter {
  constructor(url, key) {
    super();
    const m = String(url).trim().match(/^(rtmps?):\/\/([^/:]+|\[[^\]]+\])(?::(\d+))?\/?(.*)$/i);
    if (!m) throw new Error('Dirección RTMP no válida: ' + url);
    this.tls = m[1].toLowerCase() === 'rtmps';
    this.host = m[2].replace(/^\[|\]$/g, '');
    this.port = +(m[3] || (this.tls ? 443 : 1935));
    let path = m[4].replace(/\/+$/, '');
    key = String(key || '').trim();
    if (!key && path.includes('/')) { const i = path.lastIndexOf('/'); key = path.slice(i + 1); path = path.slice(0, i); }
    this.app = path; this.key = key;
    this.tcUrl = `${m[1].toLowerCase()}://${m[2]}${m[3] ? ':' + m[3] : ''}/${path}`;
    this.rx = new Uint8Array(0); this.rxChunk = 128; this.txChunk = 4096; this.csState = {};
    this.txn = 1; this.waiting = new Map(); this.streamId = 0; this.state = 'idle';
    this.base = null; this.lastTs = { a: 0, v: 0 }; this.needKey = true; this.bytes = 0; this.dropped = 0; this.started = 0;
    this.ackWindow = 2500000; this.rxTotal = 0; this.rxAcked = 0;
  }
  async connect() {
    this.state = 'connecting'; this.emit('state', this.state);
    this.conn = await Native.tcpConnect(this.host, this.port, { tls: this.tls, timeout: 15000 });
    this.conn.ondata = u8 => this.onData(u8);
    this.conn.onclose = err => { if (this.state !== 'closed') { this.state = 'closed'; this.emit('closed', err || 'el servidor cerró la conexión'); } };
    // apretón de manos simple: C0+C1, espera S0+S1+S2, responde C2 = S1
    const c1 = new Uint8Array(1536); crypto.getRandomValues(c1.subarray(8)); c1.fill(0, 0, 8);
    this.hs = true;
    const s = this.waitBytes(1 + 1536 + 1536);
    await this.conn.send(concatBytes([new Uint8Array([3]), c1]));
    const s012 = await s;
    this.hs = false;
    await this.conn.send(s012.subarray(1, 1537));
    // tamaño de trozo
    const cs = new Uint8Array(4); new DataView(cs.buffer).setUint32(0, this.txChunk);
    this.sendMsg(2, 1, 0, 0, cs); this.chunkOut = this.txChunk;
    const res = await this.command('connect', { app: this.app, type: 'nonprivate', flashVer: 'FMLE/3.0 (compatible; Asamblea)', swfUrl: this.tcUrl, tcUrl: this.tcUrl });
    if (res.name === '_error') throw new Error(this.describe(res) || 'El servidor rechazó la conexión');
    this.commandNoWait('releaseStream', null, this.key);
    this.commandNoWait('FCPublish', null, this.key);
    const cr = await this.command('createStream', null);
    this.streamId = typeof cr.args[1] === 'number' ? cr.args[1] : 1;
    const pub = new Promise((resolve, reject) => {
      this.onStatus = st => {
        const code = st && st.code || '';
        if (/Publish\.Start/.test(code)) resolve();
        else if (/BadName|Failed|Rejected|Error/i.test(code)) reject(new Error((st.description || code)));
      };
      setTimeout(resolve, 5000);
    });
    this.sendMsg(8, 20, this.streamId, 0, AMF.encAll(['publish', this.txn++, null, this.key, 'live']));
    await pub;
    this.state = 'live'; this.started = Date.now(); this.emit('state', this.state);
  }
  describe(res) { const o = res.args.find(a => a && typeof a === 'object'); return o && (o.description || o.code); }
  command(name, obj, ...rest) {
    const id = this.txn++;
    return new Promise((resolve, reject) => {
      this.waiting.set(id, resolve);
      setTimeout(() => { if (this.waiting.delete(id)) reject(new Error('El servidor no respondió a ' + name)); }, 15000);
      this.sendMsg(3, 20, 0, 0, AMF.encAll([name, id, obj, ...rest]));
    });
  }
  commandNoWait(name, obj, ...rest) { this.sendMsg(3, 20, 0, 0, AMF.encAll([name, this.txn++, obj, ...rest])); }

  waitBytes(n) {
    return new Promise(res => { this.hsWait = { n, res }; this.checkHs(); });
  }
  checkHs() { if (this.hsWait && this.rx.length >= this.hsWait.n) { const w = this.hsWait; this.hsWait = null; const b = this.rx.slice(0, w.n); this.rx = this.rx.slice(w.n); w.res(b); } }
  onData(u8) {
    this.rx = this.rx.length ? concatBytes([this.rx, u8]) : u8;
    this.rxTotal += u8.length;
    if (this.hs) return this.checkHs();
    this.parseChunks();
    if (this.rxTotal - this.rxAcked > this.ackWindow / 2) {
      this.rxAcked = this.rxTotal; const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, this.rxTotal >>> 0);
      this.sendMsg(2, 3, 0, 0, b);
    }
  }
  parseChunks() {
    for (;;) {
      const u = this.rx; if (u.length < 1) return;
      let o = 0; const fmt = u[0] >> 6; let csid = u[0] & 63; o = 1;
      if (csid === 0) { if (u.length < 2) return; csid = 64 + u[1]; o = 2; }
      else if (csid === 1) { if (u.length < 3) return; csid = 64 + u[1] + u[2] * 256; o = 3; }
      const st = this.csState[csid] = this.csState[csid] || { ts: 0, len: 0, type: 0, sid: 0, buf: [], got: 0 };
      const hl = [11, 7, 3, 0][fmt];
      if (u.length < o + hl) return;
      const dv = new DataView(u.buffer, u.byteOffset);
      let ts = 0;
      if (fmt <= 2) ts = (u[o] << 16) | (u[o + 1] << 8) | u[o + 2];
      if (fmt <= 1) { st.len = (u[o + 3] << 16) | (u[o + 4] << 8) | u[o + 5]; st.type = u[o + 6]; }
      if (fmt === 0) st.sid = dv.getUint32(o + 7, true);
      o += hl;
      if (ts === 0xffffff) { if (u.length < o + 4) return; ts = dv.getUint32(o); o += 4; }
      const need = Math.min(this.rxChunk, st.len - st.got);
      if (u.length < o + need) return;
      st.buf.push(u.slice(o, o + need)); st.got += need; o += need;
      this.rx = u.slice(o);
      if (st.got >= st.len) { const msg = concatBytes(st.buf); st.buf = []; st.got = 0; this.onMessage(st.type, msg); }
    }
  }
  onMessage(type, msg) {
    const dv = new DataView(msg.buffer, msg.byteOffset, msg.byteLength);
    if (type === 1 && msg.length >= 4) this.rxChunk = dv.getUint32(0) & 0x7fffffff;
    else if (type === 5 && msg.length >= 4) this.ackWindow = dv.getUint32(0);
    else if (type === 4 && msg.length >= 6 && dv.getUint16(0) === 6) { const b = new Uint8Array(6); b.set(msg.subarray(0, 6)); b[1] = 7; this.sendMsg(2, 4, 0, 0, b); }
    else if (type === 20) {
      const a = AMF.dec(msg); const name = a[0], id = a[1];
      if ((name === '_result' || name === '_error') && this.waiting.has(id)) { const f = this.waiting.get(id); this.waiting.delete(id); f({ name, args: a.slice(2) }); }
      else if (name === 'onStatus') { const st = a.find(x => x && typeof x === 'object' && x.code); this.emit('status', st); this.onStatus && this.onStatus(st); if (st && /Failed|Error|BadName/.test(st.code) && this.state === 'live') this.close(st.description || st.code); }
    }
  }
  sendMsg(csid, type, sid, ts, payload) {
    if (!this.conn || this.conn.closed) return Promise.resolve();
    const chunk = this.chunkOut || 128;
    const ext = ts >= 0xffffff; const t3 = ext ? 0xffffff : ts;
    const parts = [];
    for (let off = 0, first = true; off < payload.length || first; first = false) {
      const n = Math.min(chunk, payload.length - off);
      const hdr = first ? new Uint8Array(12 + (ext ? 4 : 0)) : new Uint8Array(1 + (ext ? 4 : 0));
      const dv = new DataView(hdr.buffer);
      if (first) {
        hdr[0] = csid & 63;
        hdr[1] = (t3 >> 16) & 255; hdr[2] = (t3 >> 8) & 255; hdr[3] = t3 & 255;
        hdr[4] = (payload.length >> 16) & 255; hdr[5] = (payload.length >> 8) & 255; hdr[6] = payload.length & 255;
        hdr[7] = type; dv.setUint32(8, sid, true);
        if (ext) dv.setUint32(12, ts >>> 0);
      } else { hdr[0] = 0xc0 | (csid & 63); if (ext) dv.setUint32(1, ts >>> 0); }
      parts.push(hdr, payload.subarray(off, off + n));
      off += n;
      if (!n) break;
    }
    const all = concatBytes(parts);
    this.bytes += all.length;
    return this.conn.send(all).catch(() => {});
  }

  /* ---- medios ---- */
  sendInit(info) {
    this.info = info;
    const v = info.video, a = info.audio;
    const meta = { duration: 0, width: v ? v.width : 0, height: v ? v.height : 0, framerate: 30, videocodecid: 7,
      audiocodecid: a && a.asc ? 10 : 9, audiosamplerate: a ? a.rate : 48000, audiosamplesize: 16, stereo: !a || a.channels !== 1, encoder: 'Asamblea' };
    this.sendMsg(4, 18, this.streamId, 0, AMF.encAll(['@setDataFrame', 'onMetaData', { __ecma: true, v: meta }]));
    if (v && v.avcC) this.sendMsg(7, 9, this.streamId, 0, concatBytes([new Uint8Array([0x17, 0, 0, 0, 0]), v.avcC]));
    if (a && a.asc) this.sendMsg(6, 8, this.streamId, 0, concatBytes([new Uint8Array([0xaf, 0]), a.asc]));
    else if (a && a.dOps) this.sendMsg(6, 8, this.streamId, 0, concatBytes([new Uint8Array([0x90, 0x4f, 0x70, 0x75, 0x73]), opusHead(a)]));
    this.inited = true;
  }
  sendSample(s) {
    if (this.state !== 'live' || !this.inited) return;
    if (s.kind === 'video') {
      if (this.conn.inflight > 3000000) { this.needKey = true; this.dropped++; return; } // red lenta: espera el próximo cuadro clave
      if (this.needKey && !s.key) return;
      this.needKey = false;
    }
    if (this.base == null) this.base = s.dts;
    const k = s.kind === 'video' ? 'v' : 'a';
    let ts = Math.max(0, Math.round(s.dts - this.base)); if (ts < this.lastTs[k]) ts = this.lastTs[k]; this.lastTs[k] = ts;
    if (s.kind === 'video') {
      const cts = Math.round(s.cts);
      const h5 = new Uint8Array([s.key ? 0x17 : 0x27, 1, (cts >> 16) & 255, (cts >> 8) & 255, cts & 255]);
      this.sendMsg(7, 9, this.streamId, ts, concatBytes([h5, s.data]));
    } else if (this.info.audio && this.info.audio.asc) {
      this.sendMsg(6, 8, this.streamId, ts, concatBytes([new Uint8Array([0xaf, 1]), s.data]));
    } else {
      this.sendMsg(6, 8, this.streamId, ts, concatBytes([new Uint8Array([0x91, 0x4f, 0x70, 0x75, 0x73]), s.data]));
    }
  }
  close(why) {
    if (this.state === 'closed') return;
    try { if (this.streamId) { this.commandNoWait('FCUnpublish', null, this.key); this.sendMsg(3, 20, 0, 0, AMF.encAll(['deleteStream', this.txn++, null, this.streamId])); } } catch {}
    this.state = 'closed';
    setTimeout(() => this.conn && this.conn.close(), 300);
    this.emit('closed', why || null);
  }
}
function opusHead(a) {
  const b = new Uint8Array(19); b.set(txtEnc.encode('OpusHead')); b[8] = 1; b[9] = a.channels || 2;
  new DataView(b.buffer).setUint32(12, a.rate || 48000, true); return b;
}

/* ---- transmisiones en vivo (varios destinos a la vez) ---- */
const Live = (() => {
  const ev = new Emitter();
  const PRESETS = [
    { id: 'youtube', name: 'YouTube', url: 'rtmps://a.rtmps.youtube.com:443/live2', help: 'YouTube Studio → Emitir en vivo → Clave de transmisión' },
    { id: 'twitch', name: 'Twitch', url: 'rtmp://live.twitch.tv/app', help: 'Panel del creador → Configuración → Transmisión → Clave principal' },
    { id: 'facebook', name: 'Facebook', url: 'rtmps://live-api-s.facebook.com:443/rtmp', help: 'Productor en vivo → Software de transmisión → Clave' },
    { id: 'peertube', name: 'PeerTube (libre)', url: 'rtmp://TU-INSTANCIA:1935/live', help: 'Publicar → Ir en vivo → URL RTMP y clave' },
    { id: 'owncast', name: 'Owncast (libre)', url: 'rtmp://TU-SERVIDOR:1935/live', help: 'Administración → Configuración → Clave de transmisión' },
    { id: 'custom', name: 'Otro servidor RTMP', url: 'rtmp://', help: 'Cualquier servidor RTMP o RTMPS' },
  ];
  const active = new Map(); // destId -> { pub, off }
  async function start(dest) {
    if (active.has(dest.id)) return;
    if (!Native.available) throw new Error('La transmisión necesita la app instalada (no funciona en un navegador suelto).');
    if (!Program.canLive()) throw new Error('Este dispositivo no puede codificar H.264 en MP4 (necesario para RTMP).');
    const pub = new RtmpPublisher(dest.url, dest.key);
    const entry = { pub, off: null, dest };
    active.set(dest.id, entry); ev.emit('change');
    pub.on('closed', why => { active.delete(dest.id); entry.off && entry.off(); updateState(); ev.emit('change'); if (why) toast(`Transmisión a ${dest.name} terminada: ${why}`, 'err'); });
    try { await pub.connect(); }
    catch (e) { active.delete(dest.id); pub.close(); updateState(); ev.emit('change'); throw e; }
    entry.off = Program.attach({ kind: 'live',
      onInit: info => pub.sendInit(info),
      onSample: s => pub.sendSample(s) });
    updateState(); ev.emit('change');
  }
  function stop(id) { const e = active.get(id); if (!e) return; e.off && e.off(); e.pub.close(); active.delete(id); updateState(); ev.emit('change'); }
  function stopAll() { [...active.keys()].forEach(stop); }
  function updateState() { const on = [...active.values()].some(e => e.pub.state === 'live'); if (Mesh.state.live !== on) { Mesh.state.live = on; Mesh.broadcastState(); } }
  return { ev, PRESETS, start, stop, stopAll, active };
})();
