# Asamblea (versión web)

Página estática para unirse a una videollamada de [Asamblea](https://leonardoparracp.github.io/asamblea-web/) desde el navegador, sin instalar nada.

- La invitación viaja dentro del enlace, después del `#`: el navegador nunca la envía a este servidor.
- El audio y el video van directo entre los equipos (WebRTC, cifrado DTLS-SRTP).
- El saludo inicial de los enlaces de sala pasa cifrado (AES-GCM) por relés públicos de Nostr.

Software libre: GPL-3.0-or-later. Tinta Libre.
