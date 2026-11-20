/* Asamblea — aplicación: inicio, sala, invitaciones, chat, grabación, en vivo y ajustes. GPL-3.0-or-later */
'use strict';
const App = (() => {
  const tiles = new Map(); // id ('me' o peer.id) -> { el, video, audio, img }
  let roomTimer = null, meterCtx = null, meters = new Map(), unread = 0, sideMode = null;
  const chatLog = [];

  /* ================= inicio ================= */
  async function init() {
    document.body.classList.add(Native.kind === 'web' ? 'web' : 'native-' + Native.kind);
    Mesh.me.name = Settings.name || '';
    Mesh.me.avatar = Settings.avatar || 'leon';
    Mesh.me.color = Settings.color;
    $('#myName').value = Mesh.me.name;
    $('#myName').addEventListener('input', e => { Mesh.me.name = e.target.value.trim(); Settings.name = Mesh.me.name; Settings.save(); renderAvatarSeg(); updateSelfPreview(); });
    renderAvatarSeg();
    $$('.tabs button').forEach(b => b.addEventListener('click', () => {
      $$('.tabs button').forEach(x => x.classList.toggle('on', x === b));
      $$('.tab').forEach(t => t.classList.toggle('on', t.id === b.dataset.tab));
      if (b.dataset.tab === 'tLan') Direct.scan();
    }));
    $('#pvMic').onclick = () => { Local.setMic(!Local.micOn); };
    $('#pvCam').onclick = () => Local.setCam(!Local.camOn);
    $('#btnCreate').onclick = createRoom;
    $('#btnJoinCode').onclick = () => joinWithCode($('#joinCode').value);
    $('#btnPasteJoin').onclick = async () => { $('#joinCode').value = await pasteText(); };
    $('#btnScanJoin').onclick = async () => { const c = await UI.scanQR(); if (c) { $('#joinCode').value = c; joinWithCode(c); } };
    $('#btnJoinIp').onclick = () => joinDirect($('#ipHost').value.trim(), +($('#ipPort').value || Settings.port || 47800), $('#ipPin').value.trim());
    $('#btnSettings').onclick = settingsDialog;
    $('#btnLook').onclick = lookDialog;
    if (window.Look) Look.onChange(() => { renderAvatarSeg(); updateSelfPreview(); for (const id of tiles.keys()) refreshTile(id); });
    $('#lnkAbout').onclick = e => { e.preventDefault(); aboutDialog(); };
    $('#roomName').value = Settings.lastRoom || '';
    Local.ev.on('change', () => { updateSelfPreview(); updateToolbar(); refreshTile('me'); });
    Direct.ev.on('found', renderLan);
    setInterval(() => { if (!$('#tLan').classList.contains('on')) return; renderLan(); }, 2500);
    bindMesh(); bindRoomBar();
    window.__asmBack = onBack;
    await Local.start();
    startMeters();
    Direct.scan();
    if (!Mesh.me.name) $('#myName').focus();
    // los enlaces asamblea://ASM1-… o ?code= abren la invitación
    const params = new URLSearchParams(location.search);
    let hash = ''; try { hash = decodeURIComponent((location.hash || '').slice(1)); } catch {}
    const c = params.get('code') || (/AS[MR]1-/.test(hash) ? hash : '');
    if (c) { $('#joinCode').value = c; showLanding(c); }
    Mesh.ev.on('knock', knockCard);
    Mesh.ev.on('autoanswer', p => { if (inviteClose) inviteClose(); toast('Conectando con ' + p.name + '…', 'ok'); });
    Native.on('openCode', e => { if (e && e.code) { $('#joinCode').value = e.code; if (!Mesh.room) joinWithCode(e.code); else if (/ASM1-/.test(e.code)) completeFromText(e.code); else toast('Ya estás en una sala.', 'err'); } });
  }

  function setAvatar(id) {
    Mesh.me.avatar = id; Settings.avatar = id; Settings.save(); renderAvatarSeg(); updateSelfPreview(); refreshTile('me');
    Mesh.broadcast({ t: 'hi', name: Mesh.me.name, avatar: id, color: Mesh.me.color });
  }
  function renderAvatarSeg() {
    const seg = $('#avatarSeg'); seg.innerHTML = '';
    const list = [...Avatars.LIST];
    const ch = Mesh.me.avatar.startsWith('ch:') && window.Look && Look.charById(Mesh.me.avatar.slice(3));
    if (ch) list.push({ id: Mesh.me.avatar, name: ch.name });
    for (const a of list) {
      const b = h('button', { class: Mesh.me.avatar === a.id ? 'on' : '', onclick: () => setAvatar(a.id) },
        h('img', { src: Avatars.dataUrl(a.id, Mesh.me.name || 'Tú', Mesh.me.color, 68), alt: '' }), a.name);
      seg.append(b);
    }
    if (window.Look) seg.append(h('button', { class: 'more', onclick: characterDialog }, '＋ Más personajes'));
  }

  /* ================= apariencia ================= */
  function lookDialog() {
    const L = window.Look; if (!L) return;
    let cat = L.getSkin(L.state.skin).cat;
    const cats = h('div', { class: 'look-cats', role: 'tablist' });
    const grid = h('div', { class: 'look-grid' });
    const swatch = s => {
      const p = L.palette(s);
      const b = h('button', { class: 'sw' + (s.id === L.state.skin ? ' on' : ''), title: s.name, onclick: () => { L.applySkin(s.id, { autoFont: true }); font.value = L.state.font; showPv(); grid.querySelectorAll('.sw').forEach(x => x.classList.toggle('on', x === b)); } },
        h('div', { class: 'art', style: `background-color:${p.bg};` + (L.isCorp(s) ? `border-top:3px solid ${p.accent}` : `background-image:url(${L.patternURL(s.pattern, p, 2)})`) },
          h('b', {}, h('span', { style: 'background:' + p.panel }), h('span', { style: 'background:' + p.accent }), h('span', { style: 'background:' + p.accent2 })),
          h('i', { style: `background-image:url(${L.spriteURL(s.emblem, p, 2)})` })),
        h('div', { class: 'nm', style: `background:${p.panel};color:${p.text}` }, s.name));
      return b;
    };
    const renderGrid = () => {
      grid.innerHTML = '';
      cats.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.cat === cat));
      for (const s of L.SKINS.filter(x => x.cat === cat)) grid.append(swatch(s));
    };
    for (const c of L.CATEGORIES) cats.append(h('button', { 'data-cat': c.id, onclick: () => { cat = c.id; renderGrid(); } }, `${c.name} · ${c.count}`));
    renderGrid();
    const font = h('select', {}, L.FONTS.map(f => h('option', { value: f.id, selected: f.id === L.state.font }, f.name)));
    const body = h('select', {}, L.BODY.map(([v, t]) => h('option', { value: v, selected: v === L.state.body }, t)));
    const pvTxt = h('span', {}, 'ASAMBLEA DEL BARRIO 2026');
    const pv = h('div', { class: 'font-pv' }, pvTxt, h('small', {}, 'Así se ven los títulos, los botones y la franja de la grabación.'));
    const showPv = () => { pvTxt.style.fontFamily = `"${L.fontFamily(font.value)}", "Silkscreen", monospace`; };
    font.onchange = () => { L.applyFont(font.value, body.value); showPv(); };
    body.onchange = () => L.applyFont(font.value, body.value);
    showPv();
    const fx = h('div', { class: 'seg' });
    const renderFx = () => { fx.innerHTML = ''; for (const [v, t] of L.FX) fx.append(h('button', { class: L.state.fx === v ? 'on' : '', onclick: () => { L.applyFx(v); renderFx(); } }, t)); };
    renderFx();
    UI.modal(close => [h('h3', {}, 'Apariencia'),
      h('p', { class: 'hint' }, `${L.SKINS.length} skins de Tinta Libre en ${L.CATEGORIES.length} familias. El cambio se ve al instante y también se aplica a la grabación y a la transmisión.`),
      h('h4', {}, 'Skin'), cats, grid,
      h('h4', {}, 'Fuente'),
      h('label', { class: 'field' }, h('span', {}, `Fuente para títulos (${L.FONTS.length}; los skins corporativos usan la sobria)`), font), pv,
      h('label', { class: 'field' }, h('span', {}, 'Texto corrido'), body),
      h('h4', {}, 'Efectos de luz'), fx,
      h('p', { class: 'hint' }, 'Neón para los skins modernos, terminal para los anarquistas y marco dorado para los medievales. «Suaves» no gasta procesador; «Intensos» añade brillo y animaciones leves fuera de los videos.'),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => characterDialog() }, 'Elegir personaje'), h('button', { class: 'btn primary', onclick: () => close() }, 'Listo'))]);
    setTimeout(() => { const on = grid.querySelector('.sw.on'); if (on) on.scrollIntoView({ block: 'nearest' }); }, 30);
  }

  function characterDialog() {
    const L = window.Look; if (!L) return;
    let cat = (Mesh.me.avatar.startsWith('ch:') && (L.charById(Mesh.me.avatar.slice(3)) || {}).cat) || 'anarquista';
    const cats = h('div', { class: 'look-cats' });
    const grid = h('div', { class: 'char-grid' });
    const render = () => {
      grid.innerHTML = '';
      cats.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.cat === cat));
      for (const c of L.CHARACTERS.filter(x => x.cat === cat)) {
        const id = 'ch:' + c.id;
        grid.append(h('button', { class: Mesh.me.avatar === id ? 'on' : '', title: c.name + ' — ' + c.role, onclick: () => { setAvatar(id); render(); } },
          h('img', { src: Avatars.dataUrl(id, c.name, Mesh.me.color, 96), alt: '' }), c.name));
      }
    };
    for (const c of L.CHAR_CATS) cats.append(h('button', { 'data-cat': c.id, onclick: () => { cat = c.id; render(); } }, `${c.name} · ${c.count}`));
    render();
    UI.modal(close => [h('h3', {}, 'Personaje'),
      h('p', { class: 'hint' }, `${L.CHARACTERS.length} personajes pixel de Tinta Libre. Es lo que ven las demás personas cuando tu cámara está apagada.`),
      cats, grid,
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => lookDialog() }, 'Volver a apariencia'), h('button', { class: 'btn primary', onclick: () => close() }, 'Listo'))]);
  }
  function updateSelfPreview() {
    const v = $('#selfPreview'), img = $('#selfAvatar');
    const t = Local.st.cam && Local.camOn ? Local.st.cam : null;
    if (t) { if (!v.srcObject || v.srcObject.getVideoTracks()[0] !== t) v.srcObject = new MediaStream([t]); v.classList.remove('hidden'); img.classList.add('hidden'); }
    else { v.srcObject = null; v.classList.add('hidden'); img.src = Avatars.dataUrl(Mesh.me.avatar, Mesh.me.name || 'Tú', Mesh.me.color, 160); img.classList.remove('hidden'); }
    $('#pvMic').classList.toggle('off', !Local.micOn);
    $('#pvCam').classList.toggle('off', !Local.camOn);
  }

  function needName() {
    if (Mesh.me.name) return true;
    toast('Escribe tu nombre para que te reconozcan.', 'err'); $('#myName').focus(); return false;
  }

  function renderLan() {
    const ul = $('#lanList'); const rooms = Direct.rooms();
    ul.innerHTML = '';
    if (!Native.available) { ul.append(h('li', { class: 'empty' }, 'La búsqueda en red necesita la app instalada.')); return; }
    if (!rooms.length) { ul.append(h('li', { class: 'empty' }, 'Buscando salas… (deben estar en la misma red)')); return; }
    for (const r of rooms) ul.append(h('li', {}, h('b', {}, r.room, h('small', {}, `${r.host} · ${r.n} ${r.n === 1 ? 'persona' : 'personas'}${r.pin ? ' · con PIN' : ''}`)),
      h('button', { class: 'btn primary', onclick: async () => {
        let pin = '';
        if (r.pin) { pin = await UI.prompt('PIN de la sala', 'Pide el PIN a quien abrió la sala.', '', 'tel'); if (pin == null) return; }
        joinDirect(r.ip, r.port, pin);
      } }, 'Entrar')));
  }

  /* ================= crear y unirse ================= */
  async function createRoom() {
    if (!needName()) return;
    const name = $('#roomName').value.trim() || ('Asamblea de ' + Mesh.me.name);
    Settings.lastRoom = $('#roomName').value.trim(); Settings.save();
    const pin = $('#roomPinOn').checked ? randomPin() : '';
    Mesh.createRoom(name, pin);
    enterRoom();
    if (Native.available) {
      try { await Direct.listen(); }
      catch (e) { toast('No se abrió el puerto de conexión directa (' + e.message + '). Las invitaciones por código siguen funcionando.', 'err'); }
    }
    setTimeout(inviteDialog, 300);
  }
  async function joinWithCode(code) {
    if (!needName()) return;
    if (!code || !code.trim()) { toast('Pega primero el enlace o el código de invitación.', 'err'); return; }
    if (/ASR1-/.test(code)) return joinRoomLink(code);
    let busy = null;
    try {
      const o = await decodeCode(code).catch(() => ({}));
      busy = toastBusy('Preparando tu respuesta…');
      const answer = await Mesh.acceptInvite(code);
      busy(); busy = null;
      enterRoom();
      answerDialog(answer, !!o.nk && Settings.nostr !== false);
    } catch (e) { if (busy) busy(); toast(e.message, 'err'); }
  }
  /* enlace de sala: tocar la puerta, esperar a que admitan y conectar */
  async function joinRoomLink(code) {
    let info;
    try { info = await decodeCode(code); } catch (e) { toast(e.message, 'err'); return; }
    if (Mesh.room) { toast('Ya estás en una sala. Sal primero para entrar a otra.', 'err'); return; }
    const host = info.h || 'quien abrió la sala';
    const stage = h('p', {}, 'Buscando la sala…');
    const STAGES = { relays: 'Buscando la sala…', waiting: '🚪 Tocaste la puerta. Esperando a que ' + host + ' te admita…', connecting: '✅ Te admitieron. Conectando la llamada…' };
    const j = Mesh.joinLink(code, st => { stage.textContent = STAGES[st] || stage.textContent; });
    const close = UI.modal(c => [h('h3', {}, 'Entrando a «' + (info.n || 'la sala') + '»'), stage,
      h('p', { class: 'hint' }, 'La llamada va directa entre los equipos. Los relés públicos solo pasan, cifrado, el saludo inicial.'),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => { j.cancel(); c(); } }, 'Cancelar'))], { sticky: true });
    try { await j.done; close(); enterRoom(); toast('¡Conectado!', 'ok'); }
    catch (e) { close(); if (e.message !== 'cancelado') toast(e.message, 'err'); if (!Mesh.peers.size && Mesh.room) Mesh.leave(); }
  }
  /* página abierta desde un enlace: muestra a qué sala te invitaron */
  async function showLanding(code) {
    let o; try { o = await decodeCode(code); } catch { return; }
    const card = $('.actions-card');
    const tabBtn = $('.tabs button[data-tab=tCode]'); if (tabBtn) tabBtn.click();
    const room = (o.room && o.room.name) || o.n || 'una sala';
    const who = o.h || o.name || '';
    const box = h('div', { class: 'landing' },
      h('b', {}, '📨 Te invitaron a «' + room + '»' + (who ? ' (de ' + who + ')' : '')),
      h('p', { class: 'hint' }, (Mesh.me.name ? '' : 'Escribe tu nombre, ') + 'revisa cámara y micrófono y pulsa «Unirme».'),
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn primary', onclick: () => joinWithCode($('#joinCode').value) }, 'Unirme'),
        Native.kind === 'web' ? h('a', { class: 'btn', href: 'asamblea://' + code }, 'Abrir en la app') : null));
    card.prepend(box);
  }
  function knockCard(k) {
    let box = $('#knocks'); if (!box) { box = h('div', { id: 'knocks' }); document.body.append(box); }
    const el = h('div', { class: 'knock' },
      h('img', { src: Avatars.dataUrl(k.avatar || 'ini', k.name, k.color || '#555', 64), alt: '' }),
      h('div', { class: 'grow' }, h('b', {}, k.name), h('div', { class: 'hint' }, 'quiere entrar a la sala')),
      h('button', { class: 'btn', onclick: () => { k.deny(); el.remove(); } }, 'Rechazar'),
      h('button', { class: 'btn primary', onclick: () => { k.admit(); el.remove(); } }, 'Admitir'));
    box.append(el);
    try { if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(80); } catch {}
    setTimeout(() => el.remove(), 3 * 60000);
  }
  async function joinDirect(host, port, pin) {
    if (!needName()) return;
    if (!host) { toast('Escribe la dirección de la sala.', 'err'); return; }
    host = host.replace(/^\[|\]$/g, '');
    const busy = toastBusy('Conectando con ' + host + '…');
    try {
      await Direct.join(host, port, pin);
      busy(); enterRoom();
    } catch (e) { busy(); toast(e.message, 'err'); if (!Mesh.peers.size) Mesh.leave(); }
  }
  function toastBusy(msg) { const box = $('#toasts'); const t = h('div', { class: 'toast' }, '⏳ ' + msg); box.append(t); return () => t.remove(); }

  function answerDialog(answer, auto) {
    let joinedOff = null;
    const close = UI.modal(c => [
      h('h3', {}, 'Último paso: devuelve tu respuesta'),
      h('ol', { class: 'steps' },
        h('li', {}, 'Copia este ', h('b', {}, 'código de respuesta'), ' y envíalo a quien te invitó (por el mismo chat).'),
        h('li', {}, 'Esa persona lo pega en su app, en ', h('b', {}, 'Invitar → Pegar respuesta'), '.'),
        h('li', {}, 'La llamada se conecta sola en cuanto lo pegue.')),
      auto ? h('p', { class: 'landing' }, '⚡ Normalmente no hace falta: tu respuesta se está enviando sola, cifrada. Envíala a mano solo si en unos 15 segundos no se conecta.') : null,
      UI.codeBlock(answer, 'Respuesta para Asamblea'),
      h('p', { class: 'hint' }, auto ? '⏳ Conectando…' : '⏳ Esperando a que peguen tu respuesta…'),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => c() }, 'Ocultar')),
    ], { sticky: true, onClose: () => joinedOff && Mesh.ev.off('joined', joinedOff) });
    joinedOff = () => { close(); toast('¡Conectado!', 'ok'); };
    Mesh.ev.on('joined', joinedOff);
  }

  /* ================= sala ================= */
  function enterRoom() {
    $('#lobby').classList.add('hidden'); $('#room').classList.remove('hidden');
    $('#roomTitle').textContent = Mesh.room ? Mesh.room.name : 'Sala';
    clearInterval(roomTimer);
    roomTimer = setInterval(() => {
      if (!Mesh.room) return;
      $('#roomTime').textContent = fmtTime((Date.now() - Mesh.room.since) / 1000);
      updateBadges();
    }, 1000);
    ensureTile('me'); renderStage(); updateToolbar();
    Native.call('callState', { active: true, title: Mesh.room ? Mesh.room.name : 'Asamblea' }).catch(() => {});
    chatLog.length = 0;
  }
  async function leaveRoom(force) {
    if (!force && (Recorder.on || Live.active.size)) {
      const ok = await UI.confirm('¿Salir de la sala?', 'Se detendrán la grabación y las transmisiones en curso.', 'Salir', true);
      if (!ok) return;
    }
    if (Recorder.on) await stopRecording();
    Live.stopAll();
    Mesh.leave(); Direct.stop();
    tiles.forEach(t => t.el.remove()); tiles.clear();
    closeSide();
    clearInterval(roomTimer);
    $('#room').classList.add('hidden'); $('#lobby').classList.remove('hidden');
    Native.call('callState', { active: false }).catch(() => {});
    if (Local.sharing) Local.stopScreen();
    updateSelfPreview(); Direct.scan();
  }
  function onBack() {
    if (UI.closeModal()) return true;
    if (sideMode) { closeSide(); return true; }
    if (Mesh.room) { leaveRoom(); return true; }
    return false;
  }

  function bindMesh() {
    Mesh.ev.on('peers', () => { syncTiles(); renderStage(); }).on('stream', p => refreshTile(p.id)).on('peer', p => { refreshTile(p.id); renderStage(); if (sideMode === 'people') peopleSide(); });
    Mesh.ev.on('joined', p => { sys(`${p.name} entró a la sala.`); syncTiles(); refreshTile(p.id); renderStage(); });
    Mesh.ev.on('left', (p, why) => { if (why !== 'saliste' && why !== 'reconexión') { sys(`${p.name} ${why === 'salió de la sala' ? 'salió de la sala' : '— ' + why}.`); } });
    Mesh.ev.on('pcstate', (p, s) => { refreshTile(p.id); syncTiles(); });
    Mesh.ev.on('chat', m => {
      chatLog.push(m);
      if (sideMode === 'chat') appendMsg(m);
      else if (m.from) { unread++; $('#chatDot').classList.remove('hidden'); toast(`💬 ${m.from.name}: ${m.text.slice(0, 80)}`); }
    });
    Mesh.ev.on('react', (p, e) => react(p.id, e));
    Mesh.ev.on('room', r => { if (r) $('#roomTitle').textContent = r.name; });
    Direct.ev.on('denied', name => toast(`Se rechazó a ${name || 'alguien'} por PIN incorrecto.`, 'err'));
  }
  function sys(text) { const m = { sys: true, text, ts: Date.now() }; chatLog.push(m); if (sideMode === 'chat') appendMsg(m); toast(text); }

  /* ---- teselas ---- */
  function ensureTile(id) {
    if (tiles.has(id)) return tiles.get(id);
    const video = h('video', { playsinline: true, autoplay: true, muted: true });
    const audio = id === 'me' ? null : h('audio', { autoplay: true });
    const img = h('img', { class: 'av', alt: '' });
    const name = h('div', { class: 'name' });
    const flags = h('div', { class: 'flags' });
    const conn = h('div', { class: 'conn hidden' });
    const el = h('div', { class: 'tile' + (id === 'me' ? ' me' : '') }, video, img, name, flags, conn);
    if (audio) el.append(audio);
    el.addEventListener('dblclick', () => { el.classList.toggle('fit'); });
    const t = { el, video, audio, img, name, flags, conn, id };
    tiles.set(id, t);
    $('#stage').append(el);
    refreshTile(id);
    return t;
  }
  function syncTiles() {
    for (const p of Mesh.peers.values()) ensureTile(p.id);
    for (const [id, t] of tiles) if (id !== 'me' && !Mesh.peers.has(id)) { t.el.remove(); tiles.delete(id); meters.delete(id); }
    $('#peopleCount').textContent = 1 + [...Mesh.peers.values()].filter(p => p.dc.readyState === 'open').length;
  }
  function refreshTile(id) {
    const t = tiles.get(id); if (!t) return;
    let vtrack = null, name, avatar, color, st = {}, connMsg = '';
    if (id === 'me') {
      vtrack = Local.videoTrack(); name = (Mesh.me.name || 'Tú') + ' (tú)'; avatar = Mesh.me.avatar; color = Mesh.me.color;
      st = { mic: Local.micOn, screen: Local.sharing, rec: Recorder.on, live: Mesh.state.live, hand: Mesh.state.hand };
      t.video.classList.toggle('cam', !Local.sharing);
    } else {
      const p = Mesh.peers.get(id); if (!p) return;
      name = p.name; avatar = p.avatar; color = p.color; st = p.state;
      const vt = p.stream.getVideoTracks()[0];
      vtrack = (st.cam || st.screen) && vt && !p.videoPaused ? vt : null;
      const at = p.stream.getAudioTracks();
      if (at.length && (!t.audio.srcObject || t.audio.srcObject.getAudioTracks()[0] !== at[0])) {
        t.audio.srcObject = new MediaStream(at); t.audio.play().catch(() => {});
        if (Settings.speakerId && t.audio.setSinkId) t.audio.setSinkId(Settings.speakerId).catch(() => {});
        addMeter(id, at[0]);
      }
      const cs = p.pc.connectionState;
      if (p.dc.readyState !== 'open') connMsg = cs === 'failed' ? 'No se pudo conectar' : 'Conectando…';
    }
    if (vtrack) {
      if (!t.video.srcObject || t.video.srcObject.getVideoTracks()[0] !== vtrack) { t.video.srcObject = new MediaStream([vtrack]); t.video.play().catch(() => {}); }
      t.video.classList.remove('hidden'); t.img.classList.add('hidden');
    } else {
      t.video.srcObject = null; t.video.classList.add('hidden');
      t.img.src = Avatars.dataUrl(avatar, name, color, 160); t.img.classList.remove('hidden');
    }
    t.el.classList.toggle('screen', !!st.screen);
    t.name.textContent = (st.hand ? '✋ ' : '') + name;
    t.flags.innerHTML = '';
    if (st.mic === false) t.flags.append(h('span', { title: 'Micrófono apagado' }, '🔇'));
    if (st.screen) t.flags.append(h('span', {}, '🖥'));
    if (st.rec) t.flags.append(h('span', { class: 'rec' }, '● REC'));
    if (st.live) t.flags.append(h('span', { class: 'rec' }, '● VIVO'));
    t.conn.textContent = connMsg; t.conn.classList.toggle('hidden', !connMsg);
    if (id === 'me' && Local.st.mic) addMeter('me', Local.st.mic);
  }
  function renderStage() {
    const stage = $('#stage');
    const all = [...tiles.values()];
    const focusTile = all.find(t => t.el.classList.contains('screen'));
    all.forEach(t => t.el.classList.toggle('main', t === focusTile && all.length > 1));
    stage.classList.toggle('focus', !!focusTile && all.length > 1);
    if (focusTile && all.length > 1) { stage.insertBefore(focusTile.el, stage.firstChild); stage.style.gridTemplateColumns = ''; stage.style.gridAutoRows = ''; return; }
    const n = all.length, W = stage.clientWidth - 16, H = stage.clientHeight - 16;
    let best = { cols: 1, w: 0 };
    for (let cols = 1; cols <= n; cols++) {
      const rows = Math.ceil(n / cols);
      const w = Math.min((W - (cols - 1) * 8) / cols, ((H - (rows - 1) * 8) / rows) * 16 / 9);
      if (w > best.w) best = { cols, w };
    }
    stage.style.gridTemplateColumns = `repeat(${best.cols}, ${Math.floor(best.w)}px)`;
  }
  window.addEventListener('resize', () => { if (Mesh.room) renderStage(); });

  /* ---- medidores de voz (quién habla) ---- */
  function startMeters() {
    try { meterCtx = new AudioContext(); } catch { return; }
    const buf = new Float32Array(512);
    setInterval(() => {
      if (meterCtx.state === 'suspended') meterCtx.resume().catch(() => {});
      for (const [id, m] of meters) {
        m.an.getFloatTimeDomainData(buf);
        let s = 0; for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
        const rms = Math.sqrt(s / buf.length);
        m.lvl = Math.max(rms, m.lvl * 0.7);
        const speaking = m.lvl > 0.02;
        if (id === 'me') { $('#micMeter').style.width = Math.min(100, m.lvl * 400) + '%'; }
        const t = tiles.get(id); if (t) t.el.classList.toggle('speaking', speaking && (id !== 'me' || Local.micOn));
        const p = Mesh.peers.get(id); if (p) p.speaking = speaking;
      }
    }, 120);
  }
  function addMeter(id, track) {
    if (!meterCtx) return;
    const m = meters.get(id); if (m && m.track === track) return;
    if (m) try { m.src.disconnect(); } catch {}
    try {
      const src = meterCtx.createMediaStreamSource(new MediaStream([track]));
      const an = meterCtx.createAnalyser(); an.fftSize = 512; src.connect(an);
      meters.set(id, { src, an, track, lvl: 0 });
    } catch {}
  }
  function react(id, e) {
    const t = tiles.get(id); if (!t) return;
    const r = h('div', { class: 'react' }, e); t.el.append(r); setTimeout(() => r.remove(), 2300);
  }

  /* ================= barra de la sala ================= */
  function bindRoomBar() {
    $('#tMic').onclick = () => Local.setMic(!Local.micOn);
    $('#tCam').onclick = () => Local.setCam(!Local.camOn);
    $('#tScreen').onclick = async () => { try { await Local.shareScreen(); } catch (e) { toast('No se pudo compartir la pantalla: ' + e.message, 'err'); } };
    $('#tInvite').onclick = inviteDialog;
    $('#tChat').onclick = () => sideMode === 'chat' ? closeSide() : chatSide();
    $('#tHand').onclick = () => { Mesh.state.hand = !Mesh.state.hand; Mesh.broadcastState(); updateToolbar(); refreshTile('me'); };
    $('#tRec').onclick = () => Recorder.on ? stopRecording() : startRecording();
    $('#tLive').onclick = liveDialog;
    $('#tMore').onclick = () => sideMode === 'people' ? closeSide() : peopleSide();
    $('#tLeave').onclick = () => leaveRoom();
    $('#sideClose').onclick = closeSide;
    Live.ev.on('change', () => { updateToolbar(); refreshTile('me'); });
  }
  function updateToolbar() {
    $('#tMic').classList.toggle('off', !Local.micOn);
    $('#tMic span').textContent = Local.micOn ? 'Micrófono' : 'Silenciado';
    $('#tCam').classList.toggle('off', !Local.camOn);
    $('#tScreen').classList.toggle('on', Local.sharing);
    $('#tScreen span').textContent = Local.sharing ? 'Dejar de compartir' : 'Pantalla';
    $('#tHand').classList.toggle('on', Mesh.state.hand);
    $('#tRec').classList.toggle('live', Recorder.on);
    $('#tRec span').textContent = Recorder.on ? 'Detener' : 'Grabar';
    $('#tLive').classList.toggle('live', Live.active.size > 0);
    updateBadges();
  }
  function updateBadges() {
    const b = $('#badges'); b.innerHTML = '';
    const recs = [...Mesh.peers.values()].filter(p => p.state.rec).map(p => p.name);
    if (Recorder.on) b.append(h('span', { class: 'badge' }, '● GRABANDO ' + fmtTime((Date.now() - Recorder.since) / 1000)));
    else if (recs.length) b.append(h('span', { class: 'badge', title: 'Graban: ' + recs.join(', ') }, '● ' + recs[0] + ' graba'));
    const lives = [...Live.active.values()].filter(e => e.pub.state === 'live');
    if (lives.length) b.append(h('span', { class: 'badge' }, '● EN VIVO ' + fmtTime((Date.now() - lives[0].pub.started) / 1000)));
    else if ([...Mesh.peers.values()].some(p => p.state.live)) b.append(h('span', { class: 'badge' }, '● Transmisión en vivo'));
    if (Direct.port) b.append(h('span', { class: 'badge info', title: 'Conexiones directas abiertas' }, 'puerto ' + Direct.port));
  }

  /* ================= invitar ================= */
  const webBase = () => Native.kind === 'web' && /^https?:/.test(location.protocol) ? location.origin + location.pathname : (Settings.webBase || WEB_BASE);
  let inviteClose = null;
  function inviteDialog() {
    const room = Mesh.room; if (!room) return;
    const linkSec = h('div');
    const autoChk = h('input', { type: 'checkbox', checked: !!Settings.autoAdmit, onchange: e => { Settings.autoAdmit = e.target.checked; Settings.save(); } });
    const renderLink = () => {
      linkSec.innerHTML = '';
      if (Settings.nostr === false) return;
      if (!room.link) { linkSec.append(h('p', { class: 'hint' }, 'Preparando el enlace de la sala…')); setTimeout(() => { if (linkSec.isConnected) renderLink(); }, 400); return; }
      const url = webBase() + '#' + room.link;
      linkSec.append(h('h4', {}, '🔗 Enlace de la sala: sirve para todas las personas'),
        h('p', { class: 'hint' }, 'Envíalo por WhatsApp, correo o en la invitación del calendario. Se abre en el navegador (Chrome, Safari, Firefox, Edge) sin instalar nada, o en la app. ' +
          (Mesh.isHost ? 'Funciona mientras tú sigas en la sala.' : 'Funciona mientras quien abrió la sala siga en ella.')),
        UI.codeBlock(url, 'Únete a ' + room.name),
        Mesh.isHost ? h('label', { class: 'check' }, autoChk, 'Admitir sin preguntar (si no, te aviso para que admitas a cada persona)') : null);
    };
    const codeArea = h('div');
    const answerIn = h('textarea', { rows: 3, placeholder: 'Pega aquí el código de respuesta (ASM1-…)' });
    const answerBox = h('div', { class: 'hidden' },
      h('h4', {}, '2. Pega la respuesta que te devuelva'),
      answerIn,
      h('div', { class: 'row gap wrap', style: 'margin-top:6px' },
        h('button', { class: 'btn', onclick: async () => { answerIn.value = await pasteText(); } }, 'Pegar'),
        h('button', { class: 'btn', onclick: async () => { const c = await UI.scanQR(); if (c) { inviteDialog(); completeFromText(c); } } }, 'Escanear QR'),
        h('button', { class: 'btn primary', onclick: () => completeFromText(answerIn.value) }, 'Conectar')));
    const gen = h('button', { class: 'btn primary', onclick: async () => {
      gen.disabled = true; gen.textContent = 'Generando…';
      try {
        const { code } = await Mesh.createInvite();
        codeArea.innerHTML = '';
        const asLink = webBase() + '#' + code;
        codeArea.append(h('h4', {}, '1. Envía esta invitación'), UI.codeBlock(code, 'Invitación a ' + room.name),
          h('div', { class: 'row gap wrap', style: 'margin-top:6px' },
            h('button', { class: 'btn', onclick: async () => toast(await copyText(asLink) ? 'Enlace copiado: se abre en el navegador sin instalar nada.' : 'No se pudo copiar.', 'ok') }, 'Copiar como enlace web')),
          h('p', { class: 'hint' }, 'Cada invitación sirve para una persona. ' + (Settings.nostr === false ? '' : 'Su respuesta te llega sola si hay relés; si no, pídele que te la envíe y pégala abajo.')));
        answerBox.classList.remove('hidden'); gen.textContent = 'Generar otra invitación';
      } catch (e) { toast(e.message, 'err'); gen.textContent = 'Generar invitación'; }
      gen.disabled = false;
    } }, 'Generar invitación');
    const direct = h('div');
    UI.modal(close => [
      h('h3', {}, 'Invitar a la sala'),
      h('p', { class: 'hint' }, 'Nadie más interviene: las apps se conectan directamente entre sí. Elige la forma que mejor te sirva.'),
      linkSec,
      h('h4', {}, '🔑 Código para una persona: funciona incluso sin relés'),
      gen, codeArea, answerBox,
      direct,
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => close() }, 'Cerrar')),
    ], { onClose: () => { inviteClose = null; } });
    inviteClose = () => UI.closeModal();
    renderLink();
    renderDirect(direct);
  }
  async function renderDirect(box) {
    box.innerHTML = '';
    const room = Mesh.room;
    if (!Native.available) return;
    if (!Direct.port) {
      box.append(h('h4', {}, '📶 En la misma red o por IP'), h('button', { class: 'btn', onclick: async () => { try { await Direct.listen(); renderDirect(box); } catch (e) { toast(e.message, 'err'); } } }, 'Aceptar conexiones directas'));
      return;
    }
    const addrs = await Direct.addresses();
    box.append(...[h('h4', {}, '📶 En la misma red'),
      h('p', { class: 'hint' }, 'Tu sala aparece sola en «Unirme → En mi red» de las demás apps conectadas a tu wifi.' + (room.pin ? '' : '')),
      room.pin ? h('p', {}, 'PIN de la sala: ', h('b', { style: 'font-size:20px;letter-spacing:3px' }, room.pin)) : null,
      h('h4', {}, '🌐 Por dirección IP'),
      h('p', { class: 'hint' }, 'Comparte una de estas direcciones con el puerto ' + Direct.port + '. Las IPv6 públicas suelen funcionar desde Internet; las IPv4 privadas solo en tu red (o si reenvías el puerto en el router).'),
      ...addrs.map(a => {
        const txt = (a.family === 'IPv6' ? '[' + a.address + ']' : a.address) + ':' + Direct.port;
        return h('div', { class: 'addr' }, h('code', {}, txt),
          h('span', { class: 'pill ' + (a.public ? 'ok' : '') }, a.public ? 'Internet' : 'red local'),
          h('button', { class: 'btn', onclick: async () => { await copyText(txt); toast('Dirección copiada.', 'ok'); } }, 'Copiar'));
      })].filter(Boolean));
  }
  async function completeFromText(text) {
    try {
      const p = await Mesh.completeInvite(text);
      UI.closeModal();
      toast('Conectando con ' + p.name + '…', 'ok');
    } catch (e) { toast(e.message, 'err'); }
  }

  /* ================= chat y personas ================= */
  function openSide(mode, title) {
    sideMode = mode; $('#side').classList.remove('hidden'); $('#sideTitle').textContent = title; $('#sideBody').innerHTML = '';
    setTimeout(renderStage, 30);
  }
  function closeSide() { sideMode = null; $('#side').classList.add('hidden'); setTimeout(renderStage, 30); }
  function chatSide() {
    openSide('chat', 'Chat');
    unread = 0; $('#chatDot').classList.add('hidden');
    const log = h('div', { class: 'chat-log', id: 'chatLog' });
    const inp = h('input', { placeholder: 'Escribe un mensaje…', maxlength: 4000 });
    const send = () => { const t = inp.value.trim(); if (!t) return; Mesh.chat(t); inp.value = ''; inp.focus(); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    const reacts = h('div', { class: 'row gap wrap' }, ['👍', '👏', '😂', '❤️', '✊', '🤔'].map(e => h('button', { class: 'btn', onclick: () => { Mesh.broadcast({ t: 'react', e }); react('me', e); } }, e)));
    $('#sideBody').append(log, reacts, h('div', { class: 'chat-form' }, inp, h('button', { class: 'btn primary', onclick: send }, 'Enviar')));
    chatLog.forEach(appendMsg);
    if (!chatLog.length) log.append(h('div', { class: 'msg sys' }, 'Los mensajes van directo a cada participante, cifrados, y no se guardan en ningún lado.'));
    setTimeout(() => inp.focus(), 50);
  }
  function appendMsg(m) {
    const log = $('#chatLog'); if (!log) return;
    const time = new Date(m.ts).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    if (m.sys) log.append(h('div', { class: 'msg sys' }, time + ' · ' + m.text));
    else {
      const el = h('div', { class: 'msg' + (m.from ? '' : ' mine') }, h('small', {}, (m.from ? m.from.name : 'Tú') + ' · ' + time));
      // enlaces clicables, el resto como texto
      String(m.text).split(/(https?:\/\/\S+)/g).forEach((part, i) => {
        if (i % 2) el.append(h('a', { href: '#', onclick: e => { e.preventDefault(); Native.call('openUrl', { url: part }).catch(() => window.open(part)); } }, part));
        else el.append(part);
      });
      log.append(el);
    }
    log.scrollTop = log.scrollHeight;
  }
  async function peopleSide() {
    openSide('people', 'Participantes y ajustes');
    const body = $('#sideBody');
    const list = h('div', { class: 'list-people' });
    list.append(h('div', {}, h('img', { src: Avatars.dataUrl(Mesh.me.avatar, Mesh.me.name, Mesh.me.color, 64) }), h('span', {}, Mesh.me.name + ' (tú)')));
    for (const p of Mesh.peers.values()) {
      const info = h('small', {}, p.dc.readyState === 'open' ? '…' : 'conectando');
      list.append(h('div', {}, h('img', { src: Avatars.dataUrl(p.avatar, p.name, p.color, 64) }), h('span', {}, p.name), info));
      Mesh.stats(p).then(s => { if (s) info.textContent = (s.rtt != null ? s.rtt + ' ms · ' : '') + routeName(s.route); });
    }
    const layoutNote = h('p', { class: 'hint' }, 'Doble clic sobre un video para verlo completo sin recortar.');
    body.append(list,
      h('button', { class: 'btn', onclick: settingsDialog }, '⚙ Dispositivos y ajustes'),
      h('button', { class: 'btn', onclick: lookDialog }, '🎨 Apariencia'),
      h('button', { class: 'btn', onclick: aboutDialog }, 'ℹ Cómo funciona'),
      layoutNote);
  }
  function routeName(r) {
    if (!r) return '';
    if (/relay/.test(r)) return 'por relé';
    if (/host→host/.test(r)) return 'directa (red local)';
    return 'directa por Internet';
  }

  /* ================= grabación ================= */
  async function startRecording() {
    try {
      await Recorder.start();
      updateToolbar(); refreshTile('me');
      toast('Grabando la sala. Todas las personas ven el aviso «REC».', 'ok');
      Mesh.chat && sys('Empezaste a grabar.');
    } catch (e) { toast('No se pudo grabar: ' + e.message, 'err'); }
  }
  async function stopRecording() {
    const r = await Recorder.stop();
    updateToolbar(); refreshTile('me');
    if (!r) return;
    UI.modal(close => [h('h3', {}, 'Grabación guardada'),
      h('p', {}, `${fmtTime(r.secs)} · ${(r.bytes / 1048576).toFixed(1)} MB`),
      h('div', { class: 'addr' }, h('code', {}, r.path || r.name)),
      h('div', { class: 'modal-foot' },
        Native.available ? h('button', { class: 'btn', onclick: () => Native.call('fileShow', { path: r.path }).catch(e => toast(e.message, 'err')) }, Native.isMobile ? 'Abrir' : 'Mostrar en la carpeta') : null,
        h('button', { class: 'btn primary', onclick: () => close() }, 'Listo'))]);
  }

  /* ================= en vivo ================= */
  function liveDialog() {
    const body = h('div');
    const render = () => {
      body.innerHTML = '';
      if (!Program.canLive()) body.append(h('p', { class: 'hint' }, '⚠ Este dispositivo no puede generar H.264 en MP4, que es lo que piden YouTube, Twitch y Facebook. La grabación sí funciona.'));
      const dests = Settings.destinations || [];
      if (!dests.length) body.append(h('p', { class: 'hint' }, 'Aún no tienes destinos. Agrega uno con la URL RTMP y la clave de transmisión de tu canal.'));
      for (const d of dests) {
        const act = Live.active.get(d.id);
        const st = act ? (act.pub.state === 'live' ? 'En vivo' : 'Conectando…') : 'Detenida';
        const stat = h('div', { class: 'stat' }, st);
        if (act && act.pub.state === 'live') {
          const s = act.pub; const secs = (Date.now() - s.started) / 1000;
          stat.textContent = `En vivo ${fmtTime(secs)} · ${Math.round(s.bytes * 8 / 1000 / Math.max(1, secs))} kb/s` + (s.dropped ? ` · ${s.dropped} cuadros descartados (red lenta)` : '');
        }
        body.append(h('div', { class: 'dest' },
          h('div', { class: 'row' }, h('b', { class: 'grow' }, d.name), h('span', { class: 'pill' }, (Live.PRESETS.find(p => p.id === d.preset) || {}).name || 'RTMP')),
          stat,
          h('div', { class: 'row gap wrap' },
            act ? h('button', { class: 'btn danger', onclick: () => { Live.stop(d.id); render(); } }, 'Detener')
              : h('button', { class: 'btn primary', onclick: async e => {
                e.target.disabled = true; e.target.textContent = 'Conectando…';
                try { await Live.start(d); toast('¡En vivo en ' + d.name + '!', 'ok'); } catch (err) { toast('No se pudo transmitir a ' + d.name + ': ' + err.message, 'err'); }
                render();
              } }, 'Transmitir'),
            act ? null : h('button', { class: 'btn', onclick: () => destDialog(d) }, 'Editar'),
            act ? null : h('button', { class: 'btn', onclick: () => { Settings.destinations = dests.filter(x => x !== d); Settings.save(); render(); } }, 'Quitar'))));
      }
      body.append(h('button', { class: 'btn', onclick: () => destDialog(null) }, '+ Agregar destino'));
    };
    const iv = setInterval(() => { if (body.isConnected) render(); else clearInterval(iv); }, 2000);
    render();
    UI.modal(close => [h('h3', {}, 'Transmitir en vivo'),
      h('p', { class: 'hint' }, 'Se transmite la sala completa (todas las cámaras, la pantalla compartida y el audio mezclado) desde tu equipo, a uno o varios destinos a la vez. Sin intermediarios: tu app habla directo con la plataforma.'),
      body, h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => close() }, 'Cerrar'))], { onClose: () => clearInterval(iv) });
  }
  function destDialog(d) {
    const isNew = !d;
    d = d ? { ...d } : { id: randomId(4), preset: 'youtube', name: 'YouTube', url: Live.PRESETS[0].url, key: '' };
    const sel = h('select', {}, Live.PRESETS.map(p => h('option', { value: p.id, selected: p.id === d.preset }, p.name)));
    const name = h('input', { value: d.name });
    const url = h('input', { value: d.url, placeholder: 'rtmp://servidor/app' });
    const key = h('input', { value: d.key, type: 'password', placeholder: 'Clave de transmisión', autocomplete: 'off' });
    const help = h('p', { class: 'hint' });
    const upd = () => { const p = Live.PRESETS.find(x => x.id === sel.value); help.textContent = 'Dónde encontrar la clave: ' + p.help; };
    sel.onchange = () => { const p = Live.PRESETS.find(x => x.id === sel.value); url.value = p.url; name.value = p.name; upd(); };
    upd();
    UI.modal(close => [h('h3', {}, isNew ? 'Nuevo destino' : 'Editar destino'),
      h('label', { class: 'field' }, h('span', {}, 'Plataforma'), sel),
      h('label', { class: 'field' }, h('span', {}, 'Nombre'), name),
      h('label', { class: 'field' }, h('span', {}, 'URL del servidor (RTMP o RTMPS)'), url),
      h('label', { class: 'field' }, h('span', {}, 'Clave de transmisión'), key), help,
      h('p', { class: 'hint' }, 'La clave se guarda solo en este dispositivo.'),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => { close(); liveDialog(); } }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: () => {
          Object.assign(d, { preset: sel.value, name: name.value.trim() || 'Destino', url: url.value.trim(), key: key.value.trim() });
          if (!/^rtmps?:\/\/[^/]+/i.test(d.url) || /TU-(INSTANCIA|SERVIDOR)/.test(d.url)) { toast('Escribe la dirección real del servidor RTMP.', 'err'); return; }
          const list = (Settings.destinations || []).filter(x => x.id !== d.id); list.push(d);
          Settings.destinations = list; Settings.save(); close(); liveDialog();
        } }, 'Guardar'))]);
  }

  /* ================= ajustes ================= */
  async function settingsDialog() {
    const devs = await Local.devices();
    const opt = (kind, cur) => [h('option', { value: '' }, 'Predeterminado'), ...devs.filter(d => d.kind === kind && d.deviceId && d.deviceId !== 'default').map((d, i) => h('option', { value: d.deviceId, selected: d.deviceId === cur }, d.label || (kind + ' ' + (i + 1))))];
    const mic = h('select', {}, opt('audioinput', Settings.micId));
    const cam = h('select', {}, opt('videoinput', Settings.camId));
    const spk = h('select', {}, opt('audiooutput', Settings.speakerId));
    const quality = h('select', {}, [['ligero', 'Ligero (480p, menos CPU y datos)'], ['normal', 'Normal (720p)'], ['alta', 'Alta (1080p)']].map(([v, t]) => h('option', { value: v, selected: Settings.quality === v }, t)));
    const up = h('input', { type: 'number', min: 300, max: 50000, step: 100, value: Settings.upKbps });
    const stun = h('input', { type: 'checkbox', checked: Settings.stun });
    const stunList = h('textarea', { rows: 3 }, (Settings.stunList || []).join('\n'));
    const port = h('input', { type: 'number', min: 1024, max: 65535, value: Settings.port });
    const noise = h('input', { type: 'checkbox', checked: Settings.noise });
    const echo = h('input', { type: 'checkbox', checked: Settings.echo });
    const color = h('input', { type: 'color', value: Settings.color, style: 'width:70px;padding:2px' });
    const nostr = h('input', { type: 'checkbox', checked: Settings.nostr !== false });
    const autoAdm = h('input', { type: 'checkbox', checked: !!Settings.autoAdmit });
    const big = h('input', { type: 'number', min: 2, max: 50, value: Settings.bigRoom || 6 });
    const relayList = h('textarea', { rows: 3, placeholder: Nostr.DEFAULT_RELAYS.join('\n') }, (Settings.relays || []).join('\n'));
    UI.modal(close => [h('h3', {}, 'Ajustes'),
      h('h4', {}, 'Dispositivos'),
      h('label', { class: 'field' }, h('span', {}, 'Micrófono'), mic),
      h('label', { class: 'field' }, h('span', {}, 'Cámara'), cam),
      spk.options.length > 1 ? h('label', { class: 'field' }, h('span', {}, 'Altavoz'), spk) : null,
      h('label', { class: 'check' }, noise, 'Reducir ruido de fondo'),
      h('label', { class: 'check' }, echo, 'Cancelar eco'),
      h('label', { class: 'field' }, h('span', {}, 'Color de tus iniciales'), color),
      h('h4', {}, 'Calidad'),
      h('label', { class: 'field' }, h('span', {}, 'Video de cámara, grabación y transmisión'), quality),
      h('label', { class: 'field' }, h('span', {}, 'Velocidad de subida de tu conexión (kb/s)'), up),
      h('p', { class: 'hint' }, 'En la malla P2P tu equipo envía una copia a cada participante. No hay tope de personas: en salas grandes solo se envía y recibe el video de quienes hablan.'),
      h('label', { class: 'field' }, h('span', {}, 'Sala grande a partir de (personas): solo se ve el video de quienes hablan'), big),
      h('h4', {}, 'Enlaces de sala'),
      h('label', { class: 'check' }, nostr, 'Usar relés públicos de Nostr para los enlaces y las respuestas automáticas'),
      h('p', { class: 'hint' }, 'Los relés solo pasan el saludo inicial cifrado con una clave que va dentro del enlace; no saben quién habla ni ven la llamada. Sin relés siguen funcionando los códigos manuales, la red local y la IP.'),
      h('label', { class: 'check' }, autoAdm, 'Admitir sin preguntar a quien entre con el enlace'),
      h('label', { class: 'field' }, h('span', {}, 'Relés (uno por línea; vacío = los predeterminados)'), relayList),
      h('h4', {}, 'Conexión'),
      h('label', { class: 'check' }, stun, 'Usar STUN para atravesar routers (recomendado por Internet)'),
      h('p', { class: 'hint' }, 'Un servidor STUN solo le dice a tu app cuál es tu IP pública; no ve ni toca el audio, el video ni el chat. Sin STUN funcionan la red local, IPv6 y los puertos abiertos. Puedes poner tu propio STUN (por ejemplo coturn).'),
      h('label', { class: 'field' }, h('span', {}, 'Servidores STUN (uno por línea)'), stunList),
      h('label', { class: 'field' }, h('span', {}, 'Puerto para conexiones directas'), port),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn', onclick: () => close() }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: async () => {
          const camChanged = cam.value !== Settings.camId || quality.value !== Settings.quality;
          const micChanged = mic.value !== Settings.micId || noise.checked !== Settings.noise || echo.checked !== Settings.echo;
          Object.assign(Settings, { micId: mic.value, camId: cam.value, speakerId: spk.value, quality: quality.value, upKbps: +up.value || 3000,
            stun: stun.checked, stunList: stunList.value.split(/\s+/).filter(Boolean), port: +port.value || 47800,
            noise: noise.checked, echo: echo.checked, color: color.value,
            nostr: nostr.checked, autoAdmit: autoAdm.checked, bigRoom: Math.max(2, +big.value || 6), relays: relayList.value.split(/\s+/).filter(u => /^wss?:\/\//.test(u)) });
          Settings.save(); Mesh.me.color = Settings.color;
          close();
          if (micChanged) await Local.openMic();
          if (camChanged && Local.camOn) await Local.openCam();
          tiles.forEach(t => t.audio && t.audio.setSinkId && Settings.speakerId && t.audio.setSinkId(Settings.speakerId).catch(() => {}));
          Mesh.tuneBitrates(); renderAvatarSeg(); updateSelfPreview();
          toast('Ajustes guardados.', 'ok');
        } }, 'Guardar'))]);
  }

  function aboutDialog() {
    UI.modal(close => [h('h3', {}, 'Cómo funciona Asamblea'),
      h('p', {}, 'Asamblea conecta los equipos directamente entre sí con WebRTC (P2P). No hay servidor de la app, ni cuentas, ni límite de tiempo, ni de duración de grabación: el único límite es la conexión de cada persona.'),
      h('h4', {}, 'Para conectarse'),
      h('ul', { class: 'steps' },
        h('li', {}, h('b', {}, 'Enlace de sala: '), 'un solo enlace para todas las personas, como en Zoom o Jitsi. Se abre en el navegador sin instalar nada. El saludo inicial pasa cifrado por relés públicos de Nostr (servidores independientes, sin empresa detrás) con una clave que solo existe dentro del enlace; la llamada va directa.'),
        h('li', {}, h('b', {}, 'Código: '), 'quien abre la sala genera una invitación; la otra persona la pega y devuelve una respuesta (sola, si hay relés). Funciona sin ningún servidor.'),
        h('li', {}, h('b', {}, 'Red local: '), 'en la misma wifi las salas aparecen solas.'),
        h('li', {}, h('b', {}, 'IP:puerto: '), 'conexión directa entre apps; ideal con IPv6 o con un puerto abierto en el router.'),
        h('li', {}, 'Cuando alguien nuevo entra, quien lo invitó le presenta al resto y se conectan entre sí automáticamente.')),
      h('h4', {}, 'Privacidad'),
      h('p', {}, 'Audio, video y chat viajan cifrados (DTLS-SRTP) de equipo a equipo. Las grabaciones se guardan en tu dispositivo. Todas las personas ven un aviso cuando alguien graba o transmite.'),
      h('h4', {}, 'Límites honestos'),
      h('ul', { class: 'steps' },
        h('li', {}, 'No hay tope de personas. En malla cada equipo envía su video a cada participante, así que a partir de ' + (Settings.bigRoom || 6) + ' personas solo viaja el video de quienes hablan y de quien comparte pantalla; el audio de todas siempre llega. El límite real es la conexión de cada equipo.'),
        h('li', {}, 'En el navegador no hay búsqueda en red local, conexión por IP ni transmisión en vivo: eso necesita la app. La grabación se descarga como archivo.'),
        h('li', {}, 'Por Internet con IPv4, sin STUN o detrás de redes muy cerradas (algunas empresas o datos móviles), la conexión directa puede fallar; ahí ayudan IPv6 o abrir el puerto.')),
      h('h4', {}, 'Software libre'),
      h('p', { class: 'hint' }, 'Asamblea: GPL-3.0-or-later. Componentes: Electron (MIT), jsQR (Apache-2.0), qrcode-generator (MIT), Atkinson Hyperlegible (OFL), Silkscreen (OFL). Skins, fuentes pixel y personajes de Tinta Libre (GPL); León Ácratus del diseño canónico.'),
      h('div', { class: 'modal-foot' }, h('button', { class: 'btn primary', onclick: () => close() }, 'Entendido'))]);
  }

  return { init, leaveRoom, enterRoom };
})();

document.addEventListener('DOMContentLoaded', () => App.init().catch(e => { console.error(e); toast('Error al iniciar: ' + e.message, 'err'); }));
