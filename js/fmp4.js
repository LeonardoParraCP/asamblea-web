/* Asamblea — lector de MP4 fragmentado (lo que produce MediaRecorder) para extraer
 * las muestras H.264 y AAC/Opus que luego se envían por RTMP. GPL-3.0-or-later */
'use strict';
class Fmp4Demux {
  constructor(cb) {
    this.cb = cb; this.buf = new Uint8Array(0); this.tracks = {}; this.info = null;
    this.headerParts = []; this.moof = null; this.trex = {};
  }
  push(u8) {
    if (this.buf.length) { const n = new Uint8Array(this.buf.length + u8.length); n.set(this.buf); n.set(u8, this.buf.length); this.buf = n; }
    else this.buf = u8;
    let off = 0;
    while (this.buf.length - off >= 8) {
      const dv = new DataView(this.buf.buffer, this.buf.byteOffset + off);
      let size = dv.getUint32(0); const type = String.fromCharCode(this.buf[off + 4], this.buf[off + 5], this.buf[off + 6], this.buf[off + 7]);
      if (size === 1) { if (this.buf.length - off < 16) break; size = Number(dv.getBigUint64(8)); }
      if (size < 8) { this.buf = new Uint8Array(0); return; } // flujo dañado: se descarta
      if (this.buf.length - off < size) break;
      const box = this.buf.slice(off, off + size);
      this.onBox(type, box);
      off += size;
    }
    this.buf = off ? this.buf.slice(off) : this.buf;
  }
  onBox(type, box) {
    if (type === 'ftyp') { this.headerParts = [box]; }
    else if (type === 'moov') {
      this.headerParts.push(box);
      this.parseMoov(box);
      const hdr = concatBytes(this.headerParts);
      this.cb.onHeader && this.cb.onHeader(hdr);
      this.cb.onInit && this.cb.onInit(this.info);
    } else if (type === 'moof') { this.moof = box; }
    else if (type === 'mdat') {
      if (this.moof) {
        this.cb.onFragment && this.cb.onFragment(concatBytes([this.moof, box]));
        try { this.parseFragment(this.moof, box); } catch (e) { console.warn('fmp4', e); }
        this.moof = null;
      }
    } else if (type === 'mfra' || type === 'free' || type === 'skip' || type === 'sidx') { /* nada */ }
  }
  *children(u8, start, end) {
    let o = start;
    while (o + 8 <= end) {
      const dv = new DataView(u8.buffer, u8.byteOffset + o);
      let size = dv.getUint32(0); const type = String.fromCharCode(u8[o + 4], u8[o + 5], u8[o + 6], u8[o + 7]);
      let hdr = 8;
      if (size === 1) { size = Number(dv.getBigUint64(8)); hdr = 16; } else if (size === 0) size = end - o;
      if (size < hdr || o + size > end) return;
      yield { type, start: o, end: o + size, body: o + hdr };
      o += size;
    }
  }
  find(u8, start, end, path) {
    let s = start, e = end, b = null;
    for (const t of path) { b = null; for (const c of this.children(u8, s, e)) if (c.type === t) { b = c; break; } if (!b) return null; s = b.body; e = b.end; }
    return b;
  }
  parseMoov(m) {
    const dvm = new DataView(m.buffer, m.byteOffset);
    this.tracks = {};
    for (const c of this.children(m, 8, m.length)) {
      if (c.type === 'mvex') {
        for (const t of this.children(m, c.body, c.end)) if (t.type === 'trex') {
          const id = dvm.getUint32(t.body + 4);
          this.trex[id] = { dur: dvm.getUint32(t.body + 12), size: dvm.getUint32(t.body + 16), flags: dvm.getUint32(t.body + 20) };
        }
      }
      if (c.type !== 'trak') continue;
      const tkhd = this.find(m, c.body, c.end, ['tkhd']);
      const v = m[tkhd.body];
      const id = dvm.getUint32(tkhd.body + (v === 1 ? 20 : 12));
      const mdhd = this.find(m, c.body, c.end, ['mdia', 'mdhd']);
      const mv = m[mdhd.body];
      const timescale = dvm.getUint32(mdhd.body + (mv === 1 ? 20 : 12));
      const hdlr = this.find(m, c.body, c.end, ['mdia', 'hdlr']);
      const handler = String.fromCharCode(...m.slice(hdlr.body + 8, hdlr.body + 12));
      const stsd = this.find(m, c.body, c.end, ['mdia', 'minf', 'stbl', 'stsd']);
      const entry = [...this.children(m, stsd.body + 8, stsd.end)][0];
      const tr = { id, timescale, handler, codec: entry && entry.type };
      if (handler === 'vide' && entry) {
        tr.kind = 'video';
        tr.width = dvm.getUint16(entry.body + 24); tr.height = dvm.getUint16(entry.body + 26);
        for (const x of this.children(m, entry.body + 78, entry.end)) if (x.type === 'avcC') tr.avcC = m.slice(x.body, x.end);
      } else if (handler === 'soun' && entry) {
        tr.kind = 'audio';
        tr.channels = dvm.getUint16(entry.body + 16);
        tr.rate = dvm.getUint32(entry.body + 24) >>> 16;
        for (const x of this.children(m, entry.body + 28, entry.end)) {
          if (x.type === 'esds') tr.asc = this.parseEsds(m.slice(x.body + 4, x.end));
          if (x.type === 'dOps') tr.dOps = m.slice(x.body, x.end);
        }
      }
      this.tracks[id] = tr;
    }
    const vt = Object.values(this.tracks).find(t => t.kind === 'video');
    const at = Object.values(this.tracks).find(t => t.kind === 'audio');
    this.info = { video: vt || null, audio: at || null };
  }
  parseEsds(u8) {
    let o = 0;
    const len = () => { let n = 0; for (let i = 0; i < 4; i++) { const b = u8[o++]; n = (n << 7) | (b & 0x7f); if (!(b & 0x80)) break; } return n; };
    while (o < u8.length) {
      const tag = u8[o++]; const l = len();
      if (tag === 3) { o += 2; const f = u8[o++]; if (f & 0x80) o += 2; if (f & 0x40) o += 1 + u8[o]; if (f & 0x20) o += 2; continue; }
      if (tag === 4) { o += 13; continue; }
      if (tag === 5) return u8.slice(o, o + l);
      o += l;
    }
    return null;
  }
  parseFragment(moof, mdat) {
    const dv = new DataView(moof.buffer, moof.byteOffset);
    const mdatBodyOff = 8; // los datos se cuentan desde el inicio de moof (default-base-is-moof)
    for (const traf of this.children(moof, 8, moof.length)) {
      if (traf.type !== 'traf') continue;
      let id = 0, defDur = 0, defSize = 0, defFlags = 0, baseDts = 0;
      const tfhd = this.find(moof, traf.body, traf.end, ['tfhd']);
      { const fl = dv.getUint32(tfhd.body) & 0xffffff; let o = tfhd.body + 4; id = dv.getUint32(o); o += 4;
        const tx = this.trex[id] || {}; defDur = tx.dur || 0; defSize = tx.size || 0; defFlags = tx.flags || 0;
        if (fl & 1) o += 8; if (fl & 2) o += 4; if (fl & 8) { defDur = dv.getUint32(o); o += 4; }
        if (fl & 0x10) { defSize = dv.getUint32(o); o += 4; } if (fl & 0x20) { defFlags = dv.getUint32(o); o += 4; } }
      const tfdt = this.find(moof, traf.body, traf.end, ['tfdt']);
      if (tfdt) baseDts = moof[tfdt.body] === 1 ? Number(dv.getBigUint64(tfdt.body + 4)) : dv.getUint32(tfdt.body + 4);
      const tr = this.tracks[id]; if (!tr) continue;
      let dts = baseDts;
      for (const trun of this.children(moof, traf.body, traf.end)) {
        if (trun.type !== 'trun') continue;
        const ver = moof[trun.body]; const fl = dv.getUint32(trun.body) & 0xffffff;
        let o = trun.body + 4; const count = dv.getUint32(o); o += 4;
        let dataOff = 0; if (fl & 1) { dataOff = dv.getInt32(o); o += 4; }
        let firstFlags = null; if (fl & 4) { firstFlags = dv.getUint32(o); o += 4; }
        let pos = dataOff;
        for (let i = 0; i < count; i++) {
          let dur = defDur, size = defSize, flags = (i === 0 && firstFlags != null) ? firstFlags : defFlags, cto = 0;
          if (fl & 0x100) { dur = dv.getUint32(o); o += 4; }
          if (fl & 0x200) { size = dv.getUint32(o); o += 4; }
          if (fl & 0x400) { flags = dv.getUint32(o); o += 4; }
          if (fl & 0x800) { cto = ver ? dv.getInt32(o) : dv.getUint32(o); o += 4; }
          // posición dentro de moof+mdat → dentro de mdat
          const p = pos - moof.length;
          if (p >= mdatBodyOff && p + size <= mdat.length) {
            const key = tr.kind === 'audio' ? true : !((flags >>> 16) & 1);
            this.cb.onSample && this.cb.onSample({ kind: tr.kind, key,
              dts: dts * 1000 / tr.timescale, cts: cto * 1000 / tr.timescale, dur: dur * 1000 / tr.timescale,
              data: mdat.subarray(p, p + size) });
          }
          pos += size; dts += dur;
        }
      }
    }
  }
}
