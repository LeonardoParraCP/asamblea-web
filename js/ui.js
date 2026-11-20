/* Asamblea — piezas de interfaz: diálogos, QR, escáner, selector de pantalla. GPL-3.0-or-later */
'use strict';
const UI = (() => {
  let closeCurrent = null;
  function modal(build, opts = {}) {
    if (closeCurrent) closeCurrent();
    const m = $('#modal'), box = $('#modalBox');
    box.innerHTML = '';
    let closed = false;
    const close = (v) => {
      if (closed) return; closed = true;
      m.classList.add('hidden'); box.innerHTML = ''; closeCurrent = null;
      opts.onClose && opts.onClose(v);
    };
    const content = build(close);
    box.append(...[].concat(content).flat().filter(x => x != null && x !== false));
    m.classList.remove('hidden');
    m.onclick = e => { if (e.target === m && !opts.sticky) close(); };
    closeCurrent = close;
    const f = box.querySelector('[autofocus]'); if (f) setTimeout(() => f.focus(), 50);
    return close;
  }
  function closeModal() { if (closeCurrent) { closeCurrent(); return true; } return false; }
  function confirm(title, text, okLabel = 'Aceptar', danger = false) {
    return new Promise(res => modal(close => [
      h('h3', {}, title), h('p', {}, text),
      h('div', { class: 'modal-foot' },
        h('button', { class: 'btn', onclick: () => close(false) }, 'Cancelar'),
        h('button', { class: 'btn ' + (danger ? 'danger' : 'primary'), onclick: () => close(true), autofocus: true }, okLabel)),
    ], { onClose: v => res(!!v) }));
  }
  function prompt(title, text, value = '', type = 'text') {
    return new Promise(res => modal(close => {
      const inp = h('input', { value, type, autofocus: true });
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') close(inp.value); });
      return [h('h3', {}, title), text ? h('p', { class: 'hint' }, text) : null, inp,
        h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => close(null) }, 'Cancelar'),
          h('button', { class: 'btn primary', onclick: () => close(inp.value) }, 'Aceptar'))];
    }, { onClose: v => res(v == null ? null : v) }));
  }

  function qr(text) {
    try {
      const q = qrcode(0, 'L'); q.addData(text, 'Byte'); q.make();
      return h('img', { class: 'qr', src: q.createDataURL(4, 2), alt: 'Código QR' });
    } catch (e) { return h('p', { class: 'hint' }, 'El código es demasiado largo para un QR; cópialo como texto.'); }
  }

  /* panel con un código: copiar, compartir, QR */
  function codeBlock(code, label) {
    const ta = h('textarea', { rows: 4, readonly: true }, code);
    ta.addEventListener('focus', () => ta.select());
    let qrShown = null;
    const qrBtn = h('button', { class: 'btn', onclick: () => {
      if (qrShown) { qrShown.remove(); qrShown = null; qrBtn.textContent = 'Mostrar QR'; return; }
      qrShown = qr(code); wrap.append(qrShown); qrBtn.textContent = 'Ocultar QR';
    } }, 'Mostrar QR');
    const wrap = h('div', { class: 'code-box' }, ta,
      h('div', { class: 'row gap wrap', style: 'margin-top:6px' },
        h('button', { class: 'btn primary', onclick: async () => toast(await copyText(code) ? 'Copiado. Pégalo en el chat con la otra persona.' : 'No se pudo copiar; selecciónalo a mano.', 'ok') }, 'Copiar'),
        (Native.isMobile || navigator.share) ? h('button', { class: 'btn', onclick: () => shareText(code, label || 'Asamblea') }, 'Compartir…') : null,
        qrBtn));
    return wrap;
  }

  /* escáner de QR con la cámara (jsQR) */
  function scanQR() {
    return new Promise(resolve => {
      let stream = null, raf = 0, done = false;
      const video = h('video', { class: 'scan-video', playsinline: true, muted: true, autoplay: true });
      const cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
      const stop = () => { done = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()); };
      const close = modal(c => [h('h3', {}, 'Escanear código'), h('p', { class: 'hint' }, 'Apunta la cámara al QR que muestra la otra persona.'), video,
        h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => c(null) }, 'Cancelar'))],
      { onClose: v => { stop(); resolve(v || null); } });
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } } }).then(s => {
        stream = s; video.srcObject = s;
        const loop = () => {
          if (done) return;
          if (video.videoWidth) {
            const w = 640, hh = Math.round(640 * video.videoHeight / video.videoWidth);
            cv.width = w; cv.height = hh; cx.drawImage(video, 0, 0, w, hh);
            const img = cx.getImageData(0, 0, w, hh);
            const r = jsQR(img.data, w, hh, { inversionAttempts: 'dontInvert' });
            if (r && /ASM1-/.test(r.data)) { close(r.data); return; }
          }
          raf = requestAnimationFrame(loop);
        };
        loop();
      }).catch(e => { toast('No se pudo abrir la cámara: ' + e.message, 'err'); close(null); });
    });
  }

  /* selector de pantalla o ventana (escritorio) */
  function pickScreen(sources) {
    return new Promise(resolve => {
      let chosen = null;
      const audio = h('input', { type: 'checkbox' });
      const grid = h('div', { class: 'sources' }, sources.map(s => {
        const b = h('button', { onclick: () => { $$('.sources button').forEach(x => x.classList.remove('on')); b.classList.add('on'); chosen = s; } },
          h('img', { src: s.thumb, alt: '' }), h('span', {}, s.name));
        return b;
      }));
      modal(close => [h('h3', {}, 'Compartir pantalla'), grid,
        Native.kind === 'desktop' && sources.some(s => s.audioOk) ? h('label', { class: 'check' }, audio, 'Compartir también el sonido del equipo') : null,
        h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => close(null) }, 'Cancelar'),
          h('button', { class: 'btn primary', onclick: () => { if (chosen) close({ id: chosen.id, audio: audio.checked }); } }, 'Compartir'))],
      { onClose: v => resolve(v || null) });
    });
  }

  return { modal, closeModal, confirm, prompt, qr, codeBlock, scanQR, pickScreen };
})();
