/* Asamblea — «programa»: la mezcla de toda la sala (video en lienzo + audio mezclado)
 * que se graba y se transmite. Un solo codificador alimenta la grabación y todas las
 * transmisiones a la vez, para gastar poca CPU. GPL-3.0-or-later */
'use strict';
const Program = (() => {
  const ev = new Emitter();
  let canvas = null, ctx = null, ticker = null, actx = null, dest = null;
  const vids = new Map();      // trackId -> <video>
  const srcs = new Map();      // trackId -> AudioNode
  let pendingData = Promise.resolve(), rec = null, mime = '', demux = null, header = null, consumers = new Set(), startedAt = 0, q = QUALITY.normal;

  function participants() {
    const list = [{ me: true, name: Mesh.me.name + ' (tú)', avatar: Mesh.me.avatar, color: Mesh.me.color,
      video: Local.videoTrack(), screen: Local.sharing, mic: Local.micOn, hand: Mesh.state.hand }];
    for (const p of Mesh.peers.values()) {
      if (p.dc.readyState !== 'open') continue;
      const v = p.stream.getVideoTracks()[0];
      list.push({ name: p.name, avatar: p.avatar, color: p.color, video: (p.state.cam || p.state.screen) && !p.videoPaused ? v : null,
        screen: !!p.state.screen, mic: p.state.mic !== false, hand: p.state.hand, speaking: p.speaking });
    }
    return list;
  }
  function videoFor(track) {
    if (!track || track.readyState === 'ended') return null;
    let v = vids.get(track.id);
    if (!v) {
      v = document.createElement('video'); v.muted = true; v.playsInline = true; v.autoplay = true;
      v.srcObject = new MediaStream([track]); v.play().catch(() => {});
      vids.set(track.id, v);
    }
    return v;
  }
  function gcVideos(active) {
    for (const [id, v] of vids) if (!active.has(id)) { v.srcObject = null; vids.delete(id); }
  }

  const C = () => { const p = window.Look && Look.pal; return p ? { tile: p.panel, bg: p.bg, acc: p.accent, ink: p.text, band: p.light ? 'rgba(255,255,255,.78)' : 'rgba(10,8,6,.66)', pix: `"${Look.fontFamily(Look.state.font)}", "Silkscreen", sans-serif` } : { tile: '#16130f', bg: '#0b0908', acc: '#e8b04a', ink: '#f3ece2', band: 'rgba(10,8,6,.66)', pix: '"Silkscreen", sans-serif' }; };
  function drawTile(p, x, y, w, hh, big) {
    const c = C();
    ctx.fillStyle = c.tile; ctx.fillRect(x, y, w, hh);
    const v = videoFor(p.video);
    if (v && v.videoWidth) {
      const r = v.videoWidth / v.videoHeight, R = w / hh;
      let dw, dh;
      if (p.screen || big) { if (r > R) { dw = w; dh = w / r; } else { dh = hh; dw = hh * r; } }
      else { if (r > R) { dh = hh; dw = hh * r; } else { dw = w; dh = w / r; } }
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, hh); ctx.clip();
      ctx.drawImage(v, x + (w - dw) / 2, y + (hh - dh) / 2, dw, dh); ctx.restore();
    } else {
      Avatars.draw(ctx, p.avatar, p.name, p.color, x, y, w, hh);
    }
    if (p.speaking) { ctx.strokeStyle = c.acc; ctx.lineWidth = 4; ctx.strokeRect(x + 2, y + 2, w - 4, hh - 4); }
    // nombre
    const fs = Math.max(13, Math.round(Math.min(w, hh) / 16));
    ctx.font = `${fs}px "Atkinson Hyperlegible", sans-serif`;
    const label = (p.hand ? '✋ ' : '') + p.name + (p.mic ? '' : '  · sin micrófono');
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = c.band; ctx.fillRect(x + 8, y + hh - fs - 16, tw + 16, fs + 10);
    ctx.fillStyle = c.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x + 16, y + hh - fs / 2 - 11);
  }

  function frame() {
    const W = canvas.width, H = canvas.height, G = 6, c = C();
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, W, H);
    const list = participants();
    const active = new Set(list.filter(p => p.video).map(p => p.video.id));
    gcVideos(active);
    const focus = list.find(p => p.screen && p.video);
    if (focus && list.length > 1) {
      const others = list.filter(p => p !== focus);
      const sw = Math.round(W * 0.2), mainW = W - sw - G * 3;
      drawTile(focus, G, G, mainW, H - G * 2, true);
      const th = Math.min(Math.round(sw * 9 / 16), Math.floor((H - G * (others.length + 1)) / others.length));
      others.forEach((p, i) => drawTile(p, W - sw - G, G + i * (th + G), sw, th));
    } else {
      const n = list.length;
      const cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols);
      const tw = (W - G * (cols + 1)) / cols, th = (H - G * (rows + 1)) / rows;
      list.forEach((p, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        const inRow = r === rows - 1 ? n - r * cols : cols;
        const off = (cols - inRow) * (tw + G) / 2;
        drawTile(p, G + off + c * (tw + G), G + r * (th + G), tw, th, n === 1);
      });
    }
    // franja superior: sala, tiempo y estado
    const fs = Math.round(H / 34);
    ctx.font = `${fs}px ${c.pix}`;
    ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    const right = (Mesh.state.rec ? '● REC  ' : '') + (Mesh.state.live ? '● EN VIVO  ' : '') + fmtTime((Date.now() - startedAt) / 1000);
    const rw = ctx.measureText(right).width;
    ctx.fillStyle = c.band; ctx.fillRect(W - rw - 28, 10, rw + 18, fs + 12);
    ctx.fillStyle = Mesh.state.live || Mesh.state.rec ? '#e8392b' : c.ink;
    ctx.fillText(right, W - 19, 16 + fs / 2);
    ctx.textAlign = 'left';
    const left = 'ASAMBLEA · ' + ((Mesh.room && Mesh.room.name) || '');
    const lw = ctx.measureText(left).width;
    ctx.fillStyle = c.band; ctx.fillRect(10, 10, lw + 18, fs + 12);
    ctx.fillStyle = c.acc; ctx.fillText(left, 19, 16 + fs / 2);
  }

  /* ---- mezcla de audio ---- */
  function syncAudio() {
    if (!actx) return;
    const tracks = [];
    if (Local.audioTrack() && Local.micOn) tracks.push(Local.audioTrack());
    if (Local.st.screenAudio) tracks.push(Local.st.screenAudio);
    for (const p of Mesh.peers.values()) p.stream.getAudioTracks().forEach(t => tracks.push(t));
    const want = new Set(tracks.map(t => t.id));
    for (const [id, n] of srcs) if (!want.has(id)) { try { n.disconnect(); } catch {} srcs.delete(id); }
    for (const t of tracks) {
      if (srcs.has(t.id) || t.readyState === 'ended') continue;
      try { const n = actx.createMediaStreamSource(new MediaStream([t])); n.connect(mix); srcs.set(t.id, n); } catch (e) { console.warn('mezcla', e); }
    }
  }

  let sceneUsers = 0, mix = null;
  function acquireScene() {
    if (sceneUsers++ > 0) return;
    q = QUALITY[Settings.quality] || QUALITY.normal;
    canvas = document.createElement('canvas'); canvas.width = q.w; canvas.height = q.h;
    ctx = canvas.getContext('2d', { alpha: false });
    startedAt = (Mesh.room && Mesh.room.since) || Date.now();
    frame();
    ticker = workerTicker(Math.round(1000 / q.fps), tick);
    actx = new AudioContext({ sampleRate: 48000 });
    dest = actx.createMediaStreamDestination();
    mix = actx.createGain(); mix.connect(dest);
    // tono silencioso para que la pista de audio nunca quede vacía (algunos servidores RTMP lo exigen)
    const g = actx.createGain(); g.gain.value = 0; const o = actx.createOscillator(); o.connect(g); g.connect(mix); o.start();
    syncAudio();
    Mesh.ev.on('peers', syncAudio).on('stream', syncAudio); Local.ev.on('change', syncAudio);
  }
  function releaseScene() {
    if (--sceneUsers > 0) return;
    sceneUsers = 0;
    if (ticker) ticker.stop(); ticker = null;
    vids.forEach(v => { v.srcObject = null; }); vids.clear();
    srcs.forEach(n => { try { n.disconnect(); } catch {} }); srcs.clear();
    if (actx) actx.close().catch(() => {}); actx = null; mix = null;
    Mesh.ev.off('peers', syncAudio); Mesh.ev.off('stream', syncAudio); Local.ev.off('change', syncAudio);
  }
  function tick() { frame(); if (wc) wc.video(); }

  function pickMime() {
    const list = ['video/mp4;codecs=avc1.42E01F,mp4a.40.2', 'video/mp4;codecs=avc1.4D401F,mp4a.40.2', 'video/mp4;codecs=avc1,mp4a.40.2',
      'video/mp4;codecs=avc1,opus', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
    return list.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch { return false; } }) || '';
  }
  const mp4Live = () => Settings.liveEncoder !== 'webcodecs' && !(Native.kind === 'ios' && wcAvailable()) && /mp4;codecs=avc1[^,]*,mp4a/.test(pickMime());
  const wcAvailable = () => typeof VideoEncoder !== 'undefined' && typeof AudioEncoder !== 'undefined' && typeof AudioWorkletNode !== 'undefined' && typeof VideoFrame !== 'undefined';
  function canLive() { return mp4Live() || wcAvailable(); }

  /* consumidores: { kind:'file'|'live', onHeader(u8), onFragment(u8), onInit(info), onSample(s) } */
  function attach(c) {
    if (c.kind === 'live' && !mp4Live()) return attachWC(c);
    consumers.add(c);
    if (!rec) start();
    else if (header) { c.onHeader && c.onHeader(header); demux && demux.info && c.onInit && c.onInit(demux.info); }
    return () => detach(c);
  }
  async function detach(c) {
    if (!consumers.has(c)) return;
    if (consumers.size === 1 && rec) await flushStop();   // el último: vacía el codificador antes de soltarlo
    consumers.delete(c);
    if (!consumers.size) stop();
  }
  function flushStop() {
    return new Promise(res => {
      const r = rec; if (!r || r.state === 'inactive') return res();
      r.addEventListener('stop', () => pendingData.then(res, res), { once: true });
      try { r.stop(); } catch { res(); }
      setTimeout(res, 4000);
    });
  }

  function start() {
    acquireScene();
    const vs = canvas.captureStream(q.fps);
    const stream = new MediaStream([vs.getVideoTracks()[0], dest.stream.getAudioTracks()[0]]);
    mime = pickMime();
    const opts = { mimeType: mime, videoBitsPerSecond: q.vbps, audioBitsPerSecond: q.abps };
    try { opts.videoKeyFrameIntervalDuration = 2000; } catch {}
    rec = new MediaRecorder(stream, opts);
    const isMp4 = /mp4/.test(mime);
    header = null;
    if (isMp4) {
      demux = new Fmp4Demux({
        onHeader: u8 => { header = u8; consumers.forEach(c => c.onHeader && c.onHeader(u8)); },
        onInit: info => consumers.forEach(c => c.onInit && c.onInit(info)),
        onFragment: u8 => consumers.forEach(c => c.onFragment && c.onFragment(u8)),
        onSample: s => consumers.forEach(c => c.onSample && c.onSample(s)),
      });
    } else demux = null;
    let first = true;
    rec.ondataavailable = e => {
      if (!e.data || !e.data.size) return;
      pendingData = pendingData.then(() => e.data.arrayBuffer()).then(ab => onData(new Uint8Array(ab))).catch(err => console.warn('datos', err));
    };
    const onData = u8 => {
      if (demux) demux.push(u8);
      else {
        if (first) { header = u8; first = false; consumers.forEach(c => c.onHeader && c.onHeader(u8)); }
        else consumers.forEach(c => c.onFragment && c.onFragment(u8));
      }
    };
    rec.onerror = e => { toast('El codificador falló: ' + (e.error && e.error.message), 'err'); ev.emit('error'); };
    rec.start(500);
    ev.emit('started', mime);
  }
  function stop() {
    if (rec && rec.state !== 'inactive') { try { rec.requestData(); } catch {} try { rec.stop(); } catch {} }
    if (rec) releaseScene();
    rec = null; demux = null; header = null;
    ev.emit('stopped');
  }

  /* ---- codificador WebCodecs (H.264 + AAC) para transmitir donde MediaRecorder no da MP4:
   *      Android con WebView antigua, Safari/iOS, Linux. ---- */
  let wc = null; const wcConsumers = new Set();
  function attachWC(c) {
    wcConsumers.add(c);
    if (!wc) wc = startWC();
    else if (wc.info.video && wc.info.audio) c.onInit && c.onInit(wc.info);
    return async () => { wcConsumers.delete(c); if (!wcConsumers.size && wc) { wc.stop(); wc = null; } };
  }
  const bytesOf = d => d instanceof ArrayBuffer ? new Uint8Array(d.slice(0)) : new Uint8Array(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength));
  function startWC() {
    acquireScene();
    const info = { video: null, audio: null };
    let ready = false, lastKey = -1e9, stopped = false, aTime = null, aFrames = 0;
    const t0 = performance.now();
    const out = s => { if (ready) wcConsumers.forEach(c => c.onSample && c.onSample(s)); };
    const maybeInit = () => { if (!ready && info.video && info.audio) { ready = true; wcConsumers.forEach(c => c.onInit && c.onInit(info)); } };
    const venc = new VideoEncoder({
      output: (chunk, meta) => {
        if (!info.video && meta && meta.decoderConfig && meta.decoderConfig.description) {
          info.video = { kind: 'video', width: q.w, height: q.h, avcC: bytesOf(meta.decoderConfig.description) };
          maybeInit();
        }
        const d = new Uint8Array(chunk.byteLength); chunk.copyTo(d);
        out({ kind: 'video', key: chunk.type === 'key', dts: chunk.timestamp / 1000, cts: 0, data: d });
      },
      error: e => { console.warn('VideoEncoder', e); toast('Falló el codificador de video: ' + e.message, 'err'); },
    });
    venc.configure({ codec: q.h > 720 ? 'avc1.42E028' : 'avc1.42E01F', width: q.w, height: q.h, bitrate: q.vbps, framerate: q.fps, avc: { format: 'avc' }, latencyMode: 'realtime' });
    const aenc = new AudioEncoder({
      output: (chunk, meta) => {
        if (!info.audio) {
          const desc = meta && meta.decoderConfig && meta.decoderConfig.description;
          info.audio = { kind: 'audio', rate: 48000, channels: 2, asc: desc ? bytesOf(desc) : new Uint8Array([0x11, 0x90]) };
          maybeInit();
        }
        const d = new Uint8Array(chunk.byteLength); chunk.copyTo(d);
        out({ kind: 'audio', key: true, dts: chunk.timestamp / 1000, cts: 0, data: d });
      },
      error: e => { console.warn('AudioEncoder', e); toast('Falló el codificador de audio: ' + e.message, 'err'); },
    });
    aenc.configure({ codec: 'mp4a.40.2', sampleRate: 48000, numberOfChannels: 2, bitrate: q.abps });
    // toma de audio: un AudioWorklet copia la mezcla en bloques de 1024 muestras
    let tap = null;
    actx.audioWorklet.addModule('js/tap-worklet.js').then(() => {
      if (stopped || !actx) return;
      tap = new AudioWorkletNode(actx, 'asm-tap', { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
      mix.connect(tap); const z = actx.createGain(); z.gain.value = 0; tap.connect(z); z.connect(dest);
      tap.port.onmessage = e => {
        if (stopped || aenc.state !== 'configured') return;
        const [L, R] = e.data;
        if (aTime == null) aTime = (performance.now() - t0) * 1000 - 1024 * 1e6 / 48000;
        const ts = aTime + aFrames * 1e6 / 48000; aFrames += L.length;
        const buf = new Float32Array(L.length * 2); buf.set(L); buf.set(R, L.length);
        try { const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: L.length, numberOfChannels: 2, timestamp: Math.max(0, Math.round(ts)), data: buf }); aenc.encode(ad); ad.close(); } catch (err) { console.warn('audio', err); }
      };
    }).catch(e => toast('No se pudo capturar el audio para transmitir: ' + e.message, 'err'));
    return {
      info,
      video() {
        if (stopped || venc.state !== 'configured' || venc.encodeQueueSize > 2) return;
        const now = performance.now();
        const key = now - lastKey >= 2000; if (key) lastKey = now;
        try { const vf = new VideoFrame(canvas, { timestamp: Math.round((now - t0) * 1000) }); venc.encode(vf, { keyFrame: key }); vf.close(); } catch (e) { console.warn('cuadro', e); }
      },
      stop() {
        stopped = true;
        try { if (tap) { tap.port.onmessage = null; tap.disconnect(); } } catch {}
        try { venc.close(); } catch {} try { aenc.close(); } catch {}
        releaseScene();
      },
    };
  }

  return { ev, attach, detach, pickMime, canLive, get mime() { return mime; }, get running() { return !!rec || !!wc; }, get encoder() { return mp4Live() ? 'mediarecorder' : 'webcodecs'; }, get canvas() { return canvas; } };
})();

/* ---- grabación a archivo ---- */
const Recorder = (() => {
  let file = null, off = null, bytes = 0, startedAt = 0, wrote = Promise.resolve(), gotHeader = false;
  async function start() {
    if (file) return;
    const mime = Program.pickMime();
    if (!mime) throw new Error('Este dispositivo no puede codificar video.');
    const ext = /mp4/.test(mime) ? 'mp4' : 'webm';
    const room = (Mesh.room && Mesh.room.name || 'sala').replace(/[^\p{L}\p{N} _-]+/gu, '').trim().slice(0, 40) || 'sala';
    const name = `Asamblea ${room} ${stamp()}.${ext}`;
    if (Native.available) file = await Native.fileOpen(name, ext === 'mp4' ? 'video/mp4' : 'video/webm');
    else file = memoryFile(name, mime);
    bytes = 0; startedAt = Date.now(); gotHeader = false;
    const w = u8 => { bytes += u8.length; wrote = wrote.then(() => file && file.write(u8)).catch(e => toast('Error al escribir la grabación: ' + e.message, 'err')); };
    off = Program.attach({ kind: 'file',
      onHeader: u8 => { if (!gotHeader) { gotHeader = true; w(u8); } },
      onFragment: u8 => { if (gotHeader) w(u8); } });
    Mesh.state.rec = true; Mesh.broadcastState();
  }
  async function stop() {
    if (!file) return null;
    const f = file; const o = off; off = null;
    if (o) await o();
    await wrote; file = null;
    const r = await f.close();
    Mesh.state.rec = false; Mesh.broadcastState();
    return { path: f.path || (r && r.path), name: f.name, bytes, secs: (Date.now() - startedAt) / 1000 };
  }
  // navegador sin app nativa: se descarga al final
  function memoryFile(name, mime) {
    const parts = [];
    return { name, path: name, write: u8 => { parts.push(u8); }, close: () => {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(parts, { type: mime })); a.download = name; a.click(); return { path: name }; } };
  }
  return { start, stop, get on() { return !!file; }, get bytes() { return bytes; }, get since() { return startedAt; } };
})();
