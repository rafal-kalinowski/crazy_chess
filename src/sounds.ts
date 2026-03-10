let audioCtx: AudioContext | null = null

const getCtx = (): AudioContext => {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

const noise = (ctx: AudioContext, start: number, duration: number, freq: number, gain: number) => {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq
  filter.Q.value = 0.8

  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(gain, start)
  gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration)

  source.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)
  source.start(start)
  source.stop(start + duration)
}

const tone = (ctx: AudioContext, start: number, freq: number, duration: number, gain: number) => {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.value = freq
  gainNode.gain.setValueAtTime(gain, start)
  gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration)
}

// Zwykły ruch — krótkie uderzenie bierką w planszę
export const playMove = () => {
  const ctx = getCtx()
  noise(ctx, ctx.currentTime, 0.08, 800, 0.6)
}

// Bicie — mocniejsze, podwójne uderzenie
export const playCapture = () => {
  const ctx = getCtx()
  const t = ctx.currentTime
  noise(ctx, t, 0.07, 600, 0.9)
  noise(ctx, t + 0.05, 0.1, 350, 0.7)
}

// Szach — dwa ostrzegawcze piknięcia
export const playCheck = () => {
  const ctx = getCtx()
  const t = ctx.currentTime
  tone(ctx, t, 900, 0.15, 0.4)
  tone(ctx, t + 0.2, 900, 0.15, 0.4)
}

// Roszada — świst przesuwającej się wieży
export const playCastling = () => {
  const ctx = getCtx()
  const t = ctx.currentTime

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(1400, t)
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.45)

  gainNode.gain.setValueAtTime(0.001, t)
  gainNode.gain.linearRampToValueAtTime(0.35, t + 0.05)
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.45)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.45)
}

// Szach mat — dramatyczna opadająca sekwencja
export const playCheckmate = () => {
  const ctx = getCtx()
  const t = ctx.currentTime
  tone(ctx, t, 523, 0.3, 0.5)
  tone(ctx, t + 0.35, 415, 0.3, 0.5)
  tone(ctx, t + 0.7, 330, 0.3, 0.5)
  tone(ctx, t + 1.05, 262, 0.6, 0.5)
}
