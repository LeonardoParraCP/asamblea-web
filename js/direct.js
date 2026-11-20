/* Asamblea — conexión directa entre apps sin servidores.
 * La app anfitriona abre un puerto TCP (47800 por defecto) solo para el saludo inicial de WebRTC;
 * en la red local anuncia la sala por difusión UDP (47801) para que aparezca sola en las demás apps.
 * Desde Internet se entra con IP:puerto (IPv6 suele funcionar sin abrir puertos; en IPv4 hay que
 * reenviar el puerto en el router o usar los códigos de invitación). GPL-3.0-or-later */
'use strict';
const Direct = (() => {
  const DISC_PORT = 47801;
  const ev = new Emitter();
  let server = null, beaconSock = null, beaconTimer = null, scanSock = null;
  const found = new Map();

  /* mensajes JSON separados por salto de línea sobre TCP */
  function lines(conn, onMsg) {
    let buf = '';
    const dec = new TextDecoder();
    conn.ondata = u8 => {
      buf += dec.decode(u8, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 1);
        if (!line.trim()) continue;
        try { onMsg(JSON.parse(line)); } catch (e) { console.warn('línea', e); }
      }
      if (buf.length > 256 * 1024) conn.close();
    };
    return obj => conn.send(txtEnc.encode(JSON.stringify(obj) + '\n')).catch(() => {});
  }

  /* ---------- anfitrión ---------- */
  async function listen() {
    if (server) return server.port;
    let port = Settings.port || 47800, lastErr;
    for (let k = 0; k < 10; k++) {
      try { server = await Native.tcpListen(port + k, onAccept); break; } catch (e) { lastErr = e; }
    }
    if (!server) throw lastErr || new Error('No se pudo abrir el puerto');
    ev.emit('listening', server.port);
    startBeacon();
    return server.port;
  }
  function stop() {
    if (server) { server.close(); server = null; }
    stopBeacon(); ev.emit('listening', 0);
  }
  function onAccept(conn) {
    let peer = null;
    const t = setTimeout(() => conn.close(), 60000);
    const send = lines(conn, async m => {
      const room = Mesh.room;
      try {
        if (m.t === 'hello') {
          if (!room) { send({ t: 'deny', why: 'No hay ninguna sala abierta.' }); return conn.close(); }
          if (room.pin && String(m.pin || '') !== room.pin) { send({ t: 'deny', why: 'PIN incorrecto.' }); ev.emit('denied', m.name); return setTimeout(() => conn.close(), 300); }
          if (m.id === Mesh.me.id) return conn.close();
          if (Mesh.peers.has(m.id)) Mesh.removePeer(m.id, 'reconexión');
          peer = new Mesh.Peer(m.id, { name: m.name, avatar: m.av, color: m.col });
          peer.invitedByMe = true;
          peer.signal = msg => send(msg);
          Mesh.addPeer(peer);
          send({ t: 'welcome', id: Mesh.me.id, name: Mesh.me.name, room: { id: room.id, name: room.name } });
        } else if (m.t === 'offer' && peer) {
          await peer.pc.setRemoteDescription({ type: 'offer', sdp: m.sdp });
          peer.adoptRemoteTransceivers();
          await peer.pc.setLocalDescription(await peer.pc.createAnswer());
          await peer.flushIce();
          send({ t: 'answer', sdp: peer.pc.localDescription.sdp });
          peer.dc.addEventListener('open', () => setTimeout(() => { clearTimeout(t); conn.close(); }, 3000));
        } else if (m.t === 'ice' && peer) {
          await peer.addIce(m.c);
        }
      } catch (e) { console.warn('anfitrión', e); }
    });
    conn.onclose = () => clearTimeout(t);
  }

  /* ---------- invitado ---------- */
  function join(host, port, pin) {
    return new Promise(async (resolve, reject) => {
      let conn, peer = null, done = false;
      const fail = e => { if (done) return; done = true; if (peer && peer.dc.readyState !== 'open') Mesh.removePeer(peer.id, 'falló'); try { conn && conn.close(); } catch {} reject(e); };
      const t = setTimeout(() => fail(new Error('Tiempo agotado: la otra app no respondió.')), 30000);
      try { conn = await Native.tcpConnect(host, port, { timeout: 10000 }); }
      catch (e) { clearTimeout(t); return fail(new Error('No se pudo conectar con ' + host + ':' + port + '. ¿La sala está abierta y el puerto accesible?')); }
      conn.onclose = () => { if (!peer || peer.dc.readyState !== 'open') { clearTimeout(t); fail(new Error('La conexión se cerró antes de terminar.')); } };
      const send = lines(conn, async m => {
        try {
          if (m.t === 'deny') { clearTimeout(t); fail(new Error(m.why || 'Te rechazaron.')); }
          else if (m.t === 'welcome') {
            Mesh.setRoom(m.room);
            if (Mesh.peers.has(m.id)) Mesh.removePeer(m.id, 'reconexión');
            peer = new Mesh.Peer(m.id, { name: m.name });
            peer.signal = msg => send(msg);
            Mesh.addPeer(peer);
            peer.addLocalTransceivers();
            await peer.pc.setLocalDescription(await peer.pc.createOffer());
            send({ t: 'offer', sdp: peer.pc.localDescription.sdp });
            peer.dc.addEventListener('open', () => { clearTimeout(t); done = true; resolve(peer); });
          } else if (m.t === 'answer' && peer) {
            await peer.pc.setRemoteDescription({ type: 'answer', sdp: m.sdp });
            await peer.flushIce();
          } else if (m.t === 'ice' && peer) await peer.addIce(m.c);
        } catch (e) { clearTimeout(t); fail(e); }
      });
      const me = Mesh.me;
      send({ t: 'hello', v: 1, id: me.id, name: me.name, av: me.avatar, col: me.color, pin: pin || '' });
    });
  }

  /* ---------- descubrimiento en la red local ---------- */
  function broadcastTargets(addrs) {
    const out = new Set(['255.255.255.255']);
    for (const a of addrs || []) {
      if (a.family !== 'IPv4' || a.internal || !a.netmask) continue;
      const ip = a.address.split('.').map(Number), m = a.netmask.split('.').map(Number);
      out.add(ip.map((x, i) => (x & m[i]) | (~m[i] & 255)).join('.'));
    }
    return [...out];
  }
  async function startBeacon() {
    stopBeacon();
    try {
      beaconSock = await Native.udpOpen(0, null);
      const info = await Native.call('info', {});
      const targets = broadcastTargets(info.addresses);
      const tick = () => {
        const r = Mesh.room; if (!r || !server) return;
        const msg = txtEnc.encode(JSON.stringify({ app: 'asamblea', v: 1, id: r.id, room: r.name, host: Mesh.me.name, port: server.port, pin: !!r.pin, n: Mesh.peers.size + 1 }));
        targets.forEach(ip => beaconSock.send(ip, DISC_PORT, msg).catch(() => {}));
      };
      tick(); beaconTimer = setInterval(tick, 2000);
    } catch (e) { console.warn('baliza', e); }
  }
  function stopBeacon() { clearInterval(beaconTimer); beaconTimer = null; if (beaconSock) { beaconSock.close(); beaconSock = null; } }

  async function scan() {
    if (scanSock) return;
    try {
      scanSock = await Native.udpOpen(DISC_PORT, (u8, from) => {
        try {
          const m = JSON.parse(txtDec.decode(u8));
          if (m.app !== 'asamblea' || (Mesh.room && m.id === Mesh.room.id && server)) return;
          found.set(m.id + '@' + from, { ...m, ip: from, seen: Date.now() });
          ev.emit('found');
        } catch {}
      });
    } catch (e) { ev.emit('scanError', e); }
  }
  function stopScan() { if (scanSock) { scanSock.close(); scanSock = null; } found.clear(); }
  function rooms() {
    const now = Date.now();
    for (const [k, v] of found) if (now - v.seen > 7000) found.delete(k);
    return [...found.values()];
  }

  async function addresses() {
    try {
      const info = await Native.call('info', {});
      return (info.addresses || []).filter(a => !a.internal && !/^fe80/i.test(a.address) && !/^169\.254\./.test(a.address))
        .map(a => ({ ...a, public: a.family === 'IPv6' ? /^[23]/.test(a.address) : !/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/.test(a.address) }));
    } catch { return []; }
  }

  return { ev, listen, stop, join, scan, stopScan, rooms, addresses, get port() { return server ? server.port : 0; } };
})();
