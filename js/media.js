/* Asamblea — medios locales: micrófono, cámara y pantalla compartida. GPL-3.0-or-later */
'use strict';
const Local = (() => {
  const ev = new Emitter();
  const st = { mic: null, cam: null, screen: null, micOn: true, camOn: true, screenStop: null };
  let screenCanvas = null, screenOff = null;

  function videoTrack() { return st.screen || (st.camOn ? st.cam : null); }
  function audioTrack() { return st.mic; }

  async function openMic() {
    if (st.mic) st.mic.stop();
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: {
        deviceId: Settings.micId ? { ideal: Settings.micId } : undefined,
        echoCancellation: Settings.echo, noiseSuppression: Settings.noise, autoGainControl: true } });
      st.mic = s.getAudioTracks()[0]; st.mic.enabled = st.micOn;
    } catch (e) { st.mic = null; toast('No se pudo abrir el micrófono: ' + e.message, 'err'); }
    ev.emit('change');
  }
  async function openCam() {
    if (st.cam) st.cam.stop();
    st.cam = null;
    if (!st.camOn) { ev.emit('change'); return; }
    try {
      const q = QUALITY[Settings.quality] || QUALITY.normal;
      const s = await navigator.mediaDevices.getUserMedia({ video: Object.assign({
        deviceId: Settings.camId ? { ideal: Settings.camId } : undefined }, {
        width: { ideal: q.cam.width }, height: { ideal: q.cam.height }, frameRate: { ideal: q.cam.frameRate } }) });
      st.cam = s.getVideoTracks()[0];
      st.cam.contentHint = 'motion';
      const mine = st.cam;
      // si el sistema corta la cámara (otra app la tomó, se desconectó), se intenta reabrir una vez
      mine.addEventListener('ended', () => {
        if (st.cam !== mine || !st.camOn) return;
        st.cam = null; ev.emit('change');
        if (!mine._retried) setTimeout(() => openCam().then(() => { if (st.cam) st.cam._retried = true; }), 1500);
        else { st.camOn = false; toast('La cámara se desconectó.', 'err'); ev.emit('change'); }
      });
    } catch (e) { st.cam = null; st.camOn = false; toast('No se pudo abrir la cámara: ' + e.message, 'err'); }
    ev.emit('change');
  }
  async function start() { await openMic(); await openCam(); }

  function setMic(on) { st.micOn = on; if (st.mic) st.mic.enabled = on; ev.emit('change'); }
  async function setCam(on) {
    st.camOn = on;
    if (!on && st.cam) { st.cam.stop(); st.cam = null; ev.emit('change'); }
    else if (on) await openCam();
  }

  /* ---- pantalla compartida ---- */
  async function shareScreen() {
    if (st.screen) return stopScreen();
    if (Native.kind === 'desktop') {
      const sources = await Native.call('screenSources', {});
      const pick = await UI.pickScreen(sources);
      if (!pick) return;
      await Native.call('screenChoose', { id: pick.id, audio: pick.audio });
      const s = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: !!pick.audio });
      useScreen(s.getVideoTracks()[0], s.getAudioTracks()[0] || null);
    } else if (Native.isMobile) {
      await mobileScreen();
    } else {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      useScreen(s.getVideoTracks()[0], s.getAudioTracks()[0] || null);
    }
  }
  function useScreen(track, audio) {
    track.contentHint = 'detail';
    st.screen = track;
    st.screenAudio = audio || null;
    track.addEventListener('ended', () => stopScreen());
    ev.emit('change'); ev.emit('screen', true);
  }
  function stopScreen() {
    if (!st.screen) return;
    try { st.screen.stop(); } catch {}
    if (st.screenAudio) try { st.screenAudio.stop(); } catch {}
    st.screen = null; st.screenAudio = null;
    if (screenOff) { screenOff(); screenOff = null; }
    if (Native.isMobile) Native.call('screenStop', {}).catch(() => {});
    ev.emit('change'); ev.emit('screen', false);
  }
  /* Android/iOS: el sistema captura la pantalla y envía cuadros JPEG; se pintan en un lienzo
   * y el lienzo se convierte en pista de video (canvas.captureStream). */
  async function mobileScreen() {
    const r = await Native.call('screenStart', { maxW: 1280, fps: 12, quality: 70 });
    if (!r || !r.ok) { toast('No se inició la captura de pantalla.', 'err'); return; }
    screenCanvas = document.createElement('canvas');
    screenCanvas.width = r.w || 1280; screenCanvas.height = r.h || 720;
    const ctx = screenCanvas.getContext('2d');
    let busy = false;
    const offFrame = Native.on('screenFrame', async e => {
      if (busy) return; busy = true;
      try {
        const blob = new Blob([Native.dec(e.d)], { type: 'image/jpeg' });
        const bmp = await createImageBitmap(blob);
        if (screenCanvas.width !== bmp.width || screenCanvas.height !== bmp.height) { screenCanvas.width = bmp.width; screenCanvas.height = bmp.height; }
        ctx.drawImage(bmp, 0, 0); bmp.close();
      } catch {} finally { busy = false; }
    });
    const offEnd = Native.on('screenEnded', () => stopScreen());
    screenOff = () => { offFrame(); offEnd(); };
    const track = screenCanvas.captureStream(15).getVideoTracks()[0];
    useScreen(track, null);
  }

  async function devices() {
    try { return await navigator.mediaDevices.enumerateDevices(); } catch { return []; }
  }
  function stopAll() {
    stopScreen();
    if (st.mic) st.mic.stop(); if (st.cam) st.cam.stop();
    st.mic = st.cam = null;
  }

  return { st, ev, start, openMic, openCam, setMic, setCam, shareScreen, stopScreen, videoTrack, audioTrack, devices, stopAll,
    get micOn() { return st.micOn; }, get camOn() { return st.camOn; }, get sharing() { return !!st.screen; } };
})();
