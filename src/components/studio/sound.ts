// Tiny synthesized clicks for the physical bits (cord, keycaps, flaps).
// Nothing is downloaded; each sound is a few ms of filtered noise.

let ctx: AudioContext | null = null;

const presets = {
  cord: { freq: 900, q: 1.2, gain: 0.22, decay: 0.09 },
  key: { freq: 2600, q: 2.5, gain: 0.09, decay: 0.035 },
  flap: { freq: 3800, q: 3, gain: 0.025, decay: 0.02 },
};

export function click(kind: keyof typeof presets) {
  if (typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const p = presets[kind];
    const t = ctx.currentTime;
    const length = Math.ceil(ctx.sampleRate * p.decay);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = p.freq;
    filter.Q.value = p.q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(p.gain, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(t);
  } catch {
    // Audio is a garnish; never let it break an interaction.
  }
}
