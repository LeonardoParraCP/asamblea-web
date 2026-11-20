/* Asamblea — copia la mezcla de audio en bloques de 1024 muestras para el codificador AAC. GPL-3.0-or-later */
class AsmTap extends AudioWorkletProcessor {
  constructor() { super(); this.L = new Float32Array(1024); this.R = new Float32Array(1024); this.n = 0; }
  process(inputs) {
    const a = inputs[0];
    if (a && a.length) {
      const L = a[0], R = a[1] || a[0];
      for (let k = 0; k < L.length; k++) {
        this.L[this.n] = L[k]; this.R[this.n] = R[k];
        if (++this.n === 1024) { this.port.postMessage([this.L.slice(), this.R.slice()]); this.n = 0; }
      }
    }
    return true;
  }
}
registerProcessor('asm-tap', AsmTap);
