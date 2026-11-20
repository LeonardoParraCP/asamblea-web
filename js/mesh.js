/* Asamblea — malla P2P de WebRTC sin servidores.
 * Cada participante se conecta directamente con todos los demás (malla completa).
 * Señalización sin servidor:
 *   1) códigos de invitación (oferta y respuesta completas, se pasan por cualquier chat o QR),
 *   2) conexión directa TCP entre las apps (red local con descubrimiento, o IP:puerto),
 *   3) dentro de la sala, quien invita reenvía la señalización por los canales de datos
 *      para que la persona nueva se conecte con todas las demás.
 * El audio y el video viajan cifrados extremo a extremo (DTLS-SRTP) entre los equipos. GPL-3.0-or-later */
'use strict';
const Mesh = (() => {
  const ev = new Emitter();
  const me = { id: randomId(), name: '', avatar: 'leon', color: '#c0392b' };
  const peers = new Map();          // id -> Peer
  const invites = new Map();        // invitación por código pendiente: inviteId -> Peer
  let room = null;                  // { id, name, pin, createdBy, secret, link }
  const chans = new Set();          // canales de encuentro por Nostr abiertos (se cierran al salir)
  const state = { rec: false, live: false, hand: false };

  function iceConfig() {
    const servers = Settings.stun ? (Settings.stunList || []).filter(Boolean).map(u => ({ urls: u })) : [];
    return { iceServers: servers, iceCandidatePoolSize: 0, bundlePolicy: 'max-bundle' };
  }

  class Peer {
    constructor(id, info = {}) {
      this.id = id; this.name = info.name || 'Participante'; this.avatar = info.avatar || 'ini'; this.color = info.color || '#555';
      this.state = {}; this.signal = null; this.wantVideo = true; this.iWant = true; this.videoPaused = false; this.lastTalk = 0; this.invitedByMe = false; this.remoteIce = []; this.closed = false;
      this.stream = new MediaStream(); this.connectedAt = 0;
      this.pc = new RTCPeerConnection(iceConfig());
      this.dc = this.pc.createDataChannel('ctl', { negotiated: true, id: 0, ordered: true });
      this.dc.onopen = () => this.onOpen();
      this.dc.onmessage = e => { try { onCtl(this, JSON.parse(e.data)); } catch (err) { console.warn('ctl', err); } };
      this.dc.onclose = () => { if (!this.closed) setTimeout(() => { if (this.dc.readyState === 'closed') removePeer(this.id, 'se desconectó'); }, 4000); };
      this.pc.onicecandidate = e => { if (e.candidate && this.signal) this.signal({ t: 'ice', c: e.candidate.toJSON() }); };
      this.pc.ontrack = e => {
        const old = this.stream.getTracks().filter(t => t.kind === e.track.kind);
        old.forEach(t => this.stream.removeTrack(t));
        this.stream.addTrack(e.track);
        ev.emit('stream', this);
      };
      this.pc.onconnectionstatechange = () => {
        const s = this.pc.connectionState;
        ev.emit('pcstate', this, s);
        if (s === 'connected') { this.connectedAt = this.connectedAt || Date.now(); tuneBitrates(); }
        if (s === 'failed') {
          if (this.dc.readyState === 'open') return;
          removePeer(this.id, 'no se pudo conectar (red bloqueada o sin STUN)');
        }
      };
    }
    addLocalTransceivers() {
      this.aT = this.pc.addTransceiver('audio', { direction: 'sendrecv' });
      this.vT = this.pc.addTransceiver('video', { direction: 'sendrecv' });
      trimCodecs(this.aT); trimCodecs(this.vT);
      this.applyLocalTracks();
    }
    adoptRemoteTransceivers() {
      for (const t of this.pc.getTransceivers()) {
        const k = t.receiver.track.kind;
        if (k === 'audio' && !this.aT) this.aT = t;
        if (k === 'video' && !this.vT) this.vT = t;
        t.direction = 'sendrecv';
        trimCodecs(t);
      }
      this.applyLocalTracks();
    }
    applyLocalTracks() {
      if (this.aT) this.aT.sender.replaceTrack(Local.audioTrack()).catch(() => {});
      if (this.vT) this.vT.sender.replaceTrack(Local.videoTrack()).catch(() => {});
    }
    async addIce(c) {
      if (!this.pc.remoteDescription) { this.remoteIce.push(c); return; }
      try { await this.pc.addIceCandidate(c); } catch (e) { console.warn('ice', e.message); }
    }
    async flushIce() { const l = this.remoteIce; this.remoteIce = []; for (const c of l) await this.addIce(c); }
    send(obj) { if (this.dc.readyState === 'open') { try { this.dc.send(JSON.stringify(obj)); return true; } catch {} } return false; }
    onOpen() {
      this.send({ t: 'hi', name: me.name, avatar: me.avatar, color: me.color, room: room && { id: room.id, name: room.name, link: room.link || null }, ...publicState() });
      if (this.invitedByMe) {
        const others = [...peers.values()].filter(p => p !== this && p.dc.readyState === 'open').map(p => ({ id: p.id, name: p.name }));
        this.send({ t: 'roster', peers: others });
      }
      ev.emit('joined', this);
      tuneBitrates();
    }
    close() {
      this.closed = true;
      try { this.dc.close(); } catch {} try { this.pc.close(); } catch {}
      this.stream.getTracks().forEach(t => t.stop());
    }
  }

  /* menos códecs = códigos de invitación más cortos; VP8, H.264 y VP9 los entienden todas las plataformas */
  function trimCodecs(t) {
    try {
      if (!t.setCodecPreferences || !window.RTCRtpReceiver || !RTCRtpReceiver.getCapabilities) return;
      const kind = t.receiver.track.kind;
      const caps = RTCRtpReceiver.getCapabilities(kind); if (!caps) return;
      let keep;
      if (kind === 'audio') keep = caps.codecs.filter(c => /opus/i.test(c.mimeType));
      else {
        const vp8 = caps.codecs.filter(c => /VP8/i.test(c.mimeType));
        const h264 = caps.codecs.filter(c => /H264/i.test(c.mimeType) && /packetization-mode=1/.test(c.sdpFmtpLine || '') && /42e01f/i.test(c.sdpFmtpLine || '')).slice(0, 1);
        const vp9 = caps.codecs.filter(c => /VP9/i.test(c.mimeType) && /profile-id=0/.test(c.sdpFmtpLine || '')).slice(0, 1);
        const rtx = caps.codecs.filter(c => /rtx/i.test(c.mimeType)).slice(0, 1);
        keep = [...vp8, ...h264, ...vp9, ...rtx];
      }
      if (keep.length) t.setCodecPreferences(keep);
    } catch (e) { console.warn('códecs', e.message); }
  }
  // los candidatos TCP casi nunca sirven entre casas y alargan el código
  const slimSdp = sdp => sdp.split(/\r?\n/).filter(l => l && !(/^a=candidate:/.test(l) && / tcp /i.test(l))).join('\r\n') + '\r\n';

  function publicState() {
    return { mic: Local.micOn, cam: !!Local.videoTrack(), screen: Local.sharing, rec: state.rec, live: state.live, hand: state.hand };
  }
  function broadcastState() { const s = publicState(); peers.forEach(p => p.send({ t: 'state', ...s })); }
  function broadcast(obj) { let n = 0; peers.forEach(p => { if (p.send(obj)) n++; }); return n; }

  function addPeer(p) { peers.set(p.id, p); ev.emit('peers'); }
  function removePeer(id, why) {
    const p = peers.get(id); if (!p) return;
    peers.delete(id); p.close();
    ev.emit('left', p, why); ev.emit('peers'); tuneBitrates();
  }

  /* reparte la subida disponible entre las personas conectadas (malla: se envía una copia a cada una) */
  async function tuneBitrates() {
    const n = Math.max(1, [...peers.values()].filter(p => p.pc.connectionState === 'connected' && p.wantVideo).length);
    const total = (Settings.upKbps || 3000) * 1000;
    const per = Math.max(120000, Math.min(Local.sharing ? 2500000 : 1500000, Math.floor(total * 0.9 / n)));
    const scale = n >= 6 ? 2 : n >= 4 ? 1.5 : 1;
    for (const p of peers.values()) {
      if (!p.vT) continue;
      try {
        const prm = p.vT.sender.getParameters();
        if (!prm.encodings || !prm.encodings.length) prm.encodings = [{}];
        prm.encodings[0].maxBitrate = per;
        prm.encodings[0].active = p.wantVideo !== false; // en salas grandes solo se envía video a quien lo pide
        prm.encodings[0].scaleResolutionDownBy = Local.sharing ? 1 : scale;
        prm.degradationPreference = Local.sharing ? 'maintain-resolution' : 'balanced';
        await p.vT.sender.setParameters(prm);
      } catch {}
    }
  }

  function waitGathering(pc, ms = 5000) {
    if (pc.iceGatheringState === 'complete') return Promise.resolve();
    return new Promise(res => {
      const t = setTimeout(res, ms);
      pc.addEventListener('icegatheringstatechange', () => { if (pc.iceGatheringState === 'complete') { clearTimeout(t); res(); } });
    });
  }

  /* ---------- sala ---------- */
  function createRoom(name, pin) {
    room = { id: randomId(6), name: name || ('Asamblea de ' + me.name), pin: pin || '', createdBy: me.id, since: Date.now() };
    if (Settings.nostr !== false) {
      room.secret = Nostr.newSecret();
      const r = room;
      encodeCode({ k: 'sala', s: b64url(r.secret), id: r.id, n: r.name, h: me.name }, 'ASR1-').then(c => { r.link = c; if (room === r) ev.emit('room', r); });
      hostLink().catch(e => console.warn('enlace', e));
    }
    ev.emit('room', room); return room;
  }
  function setRoom(r) {
    if (!r) return;
    if (!room) { room = { id: r.id, name: r.name, pin: '', since: Date.now() }; ev.emit('room', room); }
    if (r.link && !room.link && !room.secret) { room.link = r.link; ev.emit('room', room); }
  }
  function leave() {
    broadcast({ t: 'bye' });
    [...peers.keys()].forEach(id => removePeer(id, 'saliste'));
    invites.forEach(p => p.close()); invites.clear();
    chans.forEach(c => c.close()); chans.clear(); linkCh = null; knocking.clear();
    room = null; state.rec = state.live = state.hand = false;
    ev.emit('room', null);
  }

  /* ---------- 1) códigos de invitación ---------- */
  async function createInvite() {
    const inviteId = randomId(4);
    const p = new Peer('inv-' + inviteId);
    p.invitedByMe = true;
    p.addLocalTransceivers();
    await p.pc.setLocalDescription(await p.pc.createOffer());
    await waitGathering(p.pc);
    invites.set(inviteId, p);
    let nk;
    if (Settings.nostr !== false) {
      const secret = Nostr.newSecret(); nk = b64url(secret);
      openChan(secret, async (m, ch) => {
        if (m.t !== 'answer' || !m.code) return;
        if (invites.has(inviteId)) {
          try { const q = await completeInvite(m.code); ev.emit('autoanswer', q); } catch (e) { console.warn('respuesta automática', e.message); }
        }
        ch.send({ t: 'ack', f: me.id });
        setTimeout(() => closeChan(ch), 3000);
      }, 30 * 60000).catch(e => console.warn('canal', e));
    }
    const code = await encodeCode({ k: 'inv', i: inviteId, from: me.id, name: me.name, av: me.avatar, col: me.color,
      room: { id: room.id, name: room.name }, nk, sdp: slimSdp(p.pc.localDescription.sdp) });
    return { inviteId, code };
  }
  async function acceptInvite(code) {
    const o = await decodeCode(code);
    if (o.k !== 'inv') throw new Error(o.k === 'ans' ? 'Ese es un código de respuesta: pégalo en la app de quien te invitó.' : 'Código no válido.');
    if (o.from === me.id) throw new Error('Ese código lo generaste tú mismo.');
    if (peers.has(o.from)) removePeer(o.from, 'reconexión');
    setRoom(o.room);
    const p = new Peer(o.from, { name: o.name, avatar: o.av, color: o.col });
    addPeer(p);
    await p.pc.setRemoteDescription({ type: 'offer', sdp: o.sdp });
    p.adoptRemoteTransceivers();
    await p.pc.setLocalDescription(await p.pc.createAnswer());
    await waitGathering(p.pc);
    const ans = await encodeCode({ k: 'ans', i: o.i, from: me.id, name: me.name, av: me.avatar, col: me.color, sdp: slimSdp(p.pc.localDescription.sdp) });
    if (o.nk && Settings.nostr !== false) {
      // la respuesta vuelve sola por los relés; el código manual queda de respaldo
      let acked = false;
      openChan(unb64url(o.nk), (m, ch) => { if (m.t === 'ack') { acked = true; closeChan(ch); } }, 3 * 60000).then(ch => {
        const tick = () => { if (acked || !chans.has(ch) || p.closed || p.dc.readyState === 'open') { closeChan(ch); return; } ch.send({ t: 'answer', f: me.id, code: ans }); setTimeout(tick, 3000); };
        tick();
      }).catch(e => console.warn('canal', e));
    }
    return ans;
  }
  async function completeInvite(code) {
    const o = await decodeCode(code);
    if (o.k !== 'ans') throw new Error(o.k === 'inv' ? 'Ese es un código de invitación; aquí va la respuesta que te devolvieron.' : 'Código no válido.');
    const p = invites.get(o.i);
    if (!p) throw new Error('Esa respuesta no corresponde a ninguna invitación abierta (¿ya se usó o se cerró?).');
    invites.delete(o.i);
    p.id = o.from; p.name = o.name; p.avatar = o.av || 'ini'; p.color = o.col || '#555';
    if (peers.has(o.from)) removePeer(o.from, 'reconexión');
    addPeer(p);
    await p.pc.setRemoteDescription({ type: 'answer', sdp: o.sdp });
    return p;
  }
  function cancelInvite(id) { const p = invites.get(id); if (p) { p.close(); invites.delete(id); } }

  /* ---------- canales de encuentro (Nostr) ---------- */
  async function openChan(secret, fn, ttl) {
    let ch = null;
    ch = await Nostr.open(secret, m => { if (ch && m && m.f && m.f !== me.id && (!m.to || m.to === me.id)) fn(m, ch); });
    chans.add(ch);
    if (ttl) setTimeout(() => closeChan(ch), ttl);
    return ch;
  }
  function closeChan(ch) { if (ch && chans.delete(ch)) ch.close(); }

  /* ---------- 4) enlace de sala: un solo enlace para todas las personas ----------
   * Quien abrió la sala escucha en el canal cifrado; cada persona nueva «toca la puerta»,
   * recibe una oferta propia, responde y queda conectada; luego la sala la conecta con las demás. */
  let linkCh = null;
  const knocking = new Map();      // id de la persona -> { peer, offer, denied, at }
  async function hostLink() {
    if (linkCh || !room || !room.secret) return;
    const r = room;
    const ch = await openChan(r.secret, onLinkMsg);
    if (room !== r) { closeChan(ch); return; }
    linkCh = ch;
  }
  function admit(m) {
    return new Promise(res => {
      if (Settings.autoAdmit) return res(true);
      let done = false; const fin = v => { if (!done) { done = true; res(v); } };
      ev.emit('knock', { id: m.f, name: String(m.name || 'Alguien').slice(0, 40), avatar: m.av, color: m.col, admit: () => fin(true), deny: () => fin(false) });
      setTimeout(() => fin(false), 3 * 60000);
    });
  }
  async function onLinkMsg(m) {
    if (!room || !linkCh) return;
    if (m.t === 'knock') {
      const cur = peers.get(m.f);
      if (cur && cur.dc.readyState === 'open') return;
      let k = knocking.get(m.f);
      if (k) {
        if (k.denied && Date.now() - k.at > 60000) knocking.delete(m.f); // puede volver a pedir
        else { if (k.offer) linkCh.send(k.offer); else if (k.denied) linkCh.send({ t: 'deny', f: me.id, to: m.f }); return; }
      }
      k = { at: Date.now() }; knocking.set(m.f, k);
      if (!(await admit(m))) { k.denied = true; k.at = Date.now(); if (linkCh) linkCh.send({ t: 'deny', f: me.id, to: m.f }); return; }
      if (!room || !linkCh) return;
      if (peers.has(m.f)) removePeer(m.f, 'reconexión');
      const p = new Peer(m.f, { name: m.name, avatar: m.av, color: m.col });
      p.invitedByMe = true; addPeer(p);
      p.addLocalTransceivers();
      await p.pc.setLocalDescription(await p.pc.createOffer());
      await waitGathering(p.pc);
      if (!linkCh) return;
      k.peer = p;
      k.offer = { t: 'offer', f: me.id, to: m.f, sdp: slimSdp(p.pc.localDescription.sdp), name: me.name, av: me.avatar, col: me.color, room: { id: room.id, name: room.name, link: room.link } };
      linkCh.send(k.offer);
      setTimeout(() => { if (knocking.get(m.f) === k) { knocking.delete(m.f); if (p.dc.readyState !== 'open') removePeer(p.id, 'no terminó de entrar'); } }, 90000);
    } else if (m.t === 'answer') {
      const k = knocking.get(m.f);
      if (!k || !k.peer) return;
      linkCh.send({ t: 'ack', f: me.id, to: m.f });
      if (k.peer.pc.signalingState !== 'have-local-offer') return;
      await k.peer.pc.setRemoteDescription({ type: 'answer', sdp: m.sdp });
      knocking.delete(m.f);
    }
  }
  /* entrar con un enlace de sala; onStage('relays'|'waiting'|'connecting', info) informa el avance */
  function joinLink(code, onStage = () => {}) {
    let cancel = () => {};
    const done = new Promise(async (resolve, reject) => {
      let o;
      try { o = await decodeCode(code); } catch (e) { return reject(e); }
      if (o.k !== 'sala') return reject(new Error('Ese no es un enlace de sala.'));
      let host = null, acked = false, over = false, ch = null, peer = null, tmo = null;
      const onJoined = p => { if (p.id === host) finish(null, p); };
      function finish(err, val) {
        if (over) return; over = true;
        ev.off('joined', onJoined); clearTimeout(tmo);
        setTimeout(() => closeChan(ch), 4000);
        if (err) { if (peer && peer.dc.readyState !== 'open') removePeer(peer.id, 'cancelado'); reject(err); } else resolve(val);
      }
      ev.on('joined', onJoined);
      cancel = () => finish(new Error('cancelado'));
      tmo = setTimeout(() => finish(new Error(host ? 'La conexión no se completó. Puede que una de las dos redes bloquee las llamadas directas.' : 'Nadie respondió. Verifica que quien te invitó siga en la sala con la app abierta.')), 180000);
      onStage('relays', o);
      try {
        ch = await openChan(unb64url(o.s), async m => {
          if (over) return;
          if (m.t === 'deny') return finish(new Error('Quien abrió la sala no te admitió.'));
          if (m.t === 'ack') { acked = true; return; }
          if (m.t !== 'offer' || host) return;
          host = m.f; onStage('connecting', o);
          setRoom(m.room);
          if (peers.has(host)) removePeer(host, 'reconexión');
          peer = new Peer(host, { name: m.name, avatar: m.av, color: m.col });
          addPeer(peer);
          await peer.pc.setRemoteDescription({ type: 'offer', sdp: m.sdp });
          peer.adoptRemoteTransceivers();
          await peer.pc.setLocalDescription(await peer.pc.createAnswer());
          await waitGathering(peer.pc);
          const ans = { t: 'answer', f: me.id, to: host, sdp: slimSdp(peer.pc.localDescription.sdp) };
          const again = () => { if (over || acked) return; ch.send(ans); setTimeout(again, 3000); };
          again();
        });
      } catch (e) { return finish(e); }
      if (over) { closeChan(ch); return; }
      const t0 = Date.now();
      const knock = () => {
        if (over || host) return;
        ch.send({ t: 'knock', f: me.id, name: me.name, av: me.avatar, col: me.color });
        onStage(ch.connected ? 'waiting' : 'relays', o);
        setTimeout(knock, Date.now() - t0 < 20000 ? 2500 : 5000);
      };
      setTimeout(knock, 600);
    });
    return { done, cancel: () => cancel() };
  }

  /* ---------- salas grandes: video solo de quienes hablan ----------
   * No hay tope de personas. Como cada equipo envía una copia a cada persona, a partir de cierto
   * tamaño se pide video solo a quienes hablan (y a quien comparte pantalla); el audio llega de todas. */
  setInterval(() => {
    if (!peers.size) return;
    const now = Date.now();
    for (const p of peers.values()) {
      try {
        const src = p.aT && p.aT.receiver.getSynchronizationSources ? p.aT.receiver.getSynchronizationSources() : [];
        if (src.some(s => s.audioLevel > 0.03)) p.lastTalk = now;
      } catch {}
    }
    const limit = Math.max(2, +Settings.bigRoom || 6);
    const list = [...peers.values()];
    let want;
    if (list.length + 1 <= limit) want = new Set(list);
    else {
      const pinned = list.filter(p => p.state.screen || p.pinned);
      const rest = list.filter(p => !pinned.includes(p)).sort((a, b) => b.lastTalk - a.lastTalk);
      want = new Set([...pinned, ...rest].slice(0, Math.max(limit - 1, pinned.length)));
    }
    for (const p of list) {
      const w = want.has(p);
      if (p.iWant !== w && p.dc.readyState === 'open') {
        p.iWant = w; p.videoPaused = !w;
        p.send({ t: 'want', v: w });
        ev.emit('peer', p);
      }
    }
  }, 800);

  /* ---------- 3) señalización reenviada dentro de la sala ---------- */
  function viaRelay(relay, to) {
    return msg => relay.send({ t: 'relay', to, from: me.id, data: msg });
  }
  async function connectVia(relay, id, name) {
    if (id === me.id || peers.has(id)) return;
    const p = new Peer(id, { name });
    p.signal = viaRelay(relay, id);
    addPeer(p);
    p.addLocalTransceivers();
    await p.pc.setLocalDescription(await p.pc.createOffer());
    p.signal({ t: 'offer', sdp: p.pc.localDescription.sdp, name: me.name, av: me.avatar, col: me.color, room: room && { id: room.id, name: room.name } });
  }
  async function onRelay(relay, from, d) {
    if (d.t === 'offer') {
      if (peers.has(from)) {
        const old = peers.get(from);
        if (old.pc.connectionState === 'connected' && old.dc.readyState === 'open') return;
        removePeer(from, 'reconexión');
      }
      const p = new Peer(from, { name: d.name, avatar: d.av, color: d.col });
      p.signal = viaRelay(relay, from);
      addPeer(p);
      await p.pc.setRemoteDescription({ type: 'offer', sdp: d.sdp });
      p.adoptRemoteTransceivers();
      await p.pc.setLocalDescription(await p.pc.createAnswer());
      await p.flushIce();
      p.signal({ t: 'answer', sdp: p.pc.localDescription.sdp });
    } else if (d.t === 'answer') {
      const p = peers.get(from); if (!p || p.pc.signalingState !== 'have-local-offer') return;
      await p.pc.setRemoteDescription({ type: 'answer', sdp: d.sdp });
      await p.flushIce();
    } else if (d.t === 'ice') {
      const p = peers.get(from); if (p) await p.addIce(d.c);
    }
  }

  /* ---------- mensajes del canal de control ---------- */
  function onCtl(p, m) {
    switch (m.t) {
      case 'hi':
        p.name = m.name || p.name; p.avatar = m.avatar || p.avatar; p.color = m.color || p.color;
        Object.assign(p.state, pick(m)); setRoom(m.room);
        ev.emit('peer', p); break;
      case 'state': Object.assign(p.state, pick(m)); ev.emit('peer', p); break;
      case 'roster': (m.peers || []).forEach(x => connectVia(p, x.id, x.name).catch(e => console.warn('roster', e))); break;
      case 'relay':
        if (m.to === me.id) onRelay(p, m.from, m.data).catch(e => console.warn('relay', e));
        else { const q = peers.get(m.to); if (q) q.send(m); }
        break;
      case 'want': p.wantVideo = !!m.v; tuneBitrates(); break;
      case 'chat': ev.emit('chat', { from: p, text: String(m.text || '').slice(0, 4000), ts: m.ts || Date.now() }); break;
      case 'react': ev.emit('react', p, String(m.e || '').slice(0, 8)); break;
      case 'bye': removePeer(p.id, 'salió de la sala'); break;
    }
  }
  function pick(m) { const o = {}; ['mic', 'cam', 'screen', 'rec', 'live', 'hand'].forEach(k => { if (k in m) o[k] = !!m[k]; }); return o; }

  function chat(text) {
    const msg = { t: 'chat', text, ts: Date.now() };
    broadcast(msg);
    ev.emit('chat', { from: null, text, ts: msg.ts });
  }

  Local.ev.on('change', () => { peers.forEach(p => p.applyLocalTracks()); broadcastState(); tuneBitrates(); });

  /* estadísticas de conexión (tipo de ruta y latencia) */
  async function stats(p) {
    try {
      const r = await p.pc.getStats(); let pair = null; const byId = {};
      r.forEach(s => { byId[s.id] = s; if (s.type === 'candidate-pair' && (s.nominated || s.selected) && s.state === 'succeeded') pair = s; });
      if (!pair) return null;
      const loc = byId[pair.localCandidateId], rem = byId[pair.remoteCandidateId];
      return { rtt: pair.currentRoundTripTime ? Math.round(pair.currentRoundTripTime * 1000) : null,
        route: (loc && loc.candidateType) + '→' + (rem && rem.candidateType), protocol: loc && loc.protocol,
        out: pair.availableOutgoingBitrate ? Math.round(pair.availableOutgoingBitrate / 1000) : null };
    } catch { return null; }
  }

  return { ev, me, peers, state, get room() { return room; }, get isHost() { return !!(room && room.secret); }, createRoom, setRoom, leave,
    createInvite, acceptInvite, completeInvite, cancelInvite, joinLink, Peer, addPeer, removePeer, waitGathering,
    broadcast, broadcastState, chat, stats, tuneBitrates };
})();
