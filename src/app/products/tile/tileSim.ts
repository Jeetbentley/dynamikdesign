// Small, accurate glimpses of Tile's modes for the website. Colours, fonts and timings
// come from the Tile firmware; only what the hero preview needs is reproduced here.
import type { Lit } from './TileDevice'

export type Cells = (Lit | null)[]

const rgbOf = (hex: number) => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255]

// One LED at a brightness level (0–1): saturated colour with a slightly brighter centre and a soft
// glow in its own colour. The level fades the pixel into the dark screen.
export function led(hex: number, level = 1): Lit {
  // A colour like rgb(189,66,0) is orange light at ~74% strength, not brown: show the hue at full
  // brightness and fold the rest into the level.
  const raw = rgbOf(hex)
  const peak = Math.max(...raw, 1)
  const l = Math.max(0, Math.min(1, level * (peak / 255)))
  const [r, g, b] = raw.map((v) => Math.round((v * 255) / peak))
  const mix = (v: number) => Math.round(v + (255 - v) * 0.25)
  return {
    center: `rgb(${mix(r)},${mix(g)},${mix(b)})`,
    edge: `rgb(${r},${g},${b})`,
    glow: `rgba(${r},${g},${b},0.45)`,
    level: l,
  }
}

const fill = (cell: Lit): Cells => Array(64).fill(cell)

// ---------- Clock (Glance face) ----------
export const AMBER_HOUR = 0xef9f27
export const AMBER_MIN = 0x5dcaa5

// 4 rows × 4 columns; column 4 is always the gap.
const FONT_NUM: number[][][] = [
  [[1,1,0,0],[1,0,1,0],[1,0,1,0],[1,1,1,0]], // 0
  [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,1,0,0]], // 1
  [[1,1,0,0],[0,1,0,0],[1,0,0,0],[1,1,0,0]], // 2
  [[1,1,0,0],[0,1,1,0],[0,0,1,0],[1,1,0,0]], // 3
  [[1,0,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,0]], // 4
  [[1,1,1,0],[1,0,0,0],[0,1,0,0],[1,1,0,0]], // 5
  [[1,0,0,0],[1,1,1,0],[1,0,1,0],[0,1,1,0]], // 6
  [[1,1,1,0],[0,0,1,0],[0,1,0,0],[0,1,0,0]], // 7
  [[1,1,1,0],[1,1,1,0],[1,0,1,0],[1,1,1,0]], // 8
  [[1,1,0,0],[1,0,1,0],[1,1,1,0],[0,0,1,0]], // 9
]


const stamp = (grid: number[], bits: (row: number, col: number) => boolean, top: number, left: number, value: number) => {
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++) if (bits(y, x) && left + x < 8 && top + y < 8) grid[(top + y) * 8 + left + x] = value
}
const stampDigit = (grid: number[], d: number, top: number, left: number, value: number) =>
  stamp(grid, (y, x) => FONT_NUM[d][y][x] === 1, top, left, value)

// Glance layout: hours at columns 0/4 (rows 0–3), minutes at columns 1/5 (rows 4–7); 24-hour.
// Values: -1 off, 0 hour colour, 1 minute colour.
export function clockGrid(h: number, m: number): number[] {
  const a = Array(64).fill(-1)
  stampDigit(a, Math.floor(h / 10), 0, 0, 0)
  stampDigit(a, h % 10, 0, 4, 0)
  stampDigit(a, Math.floor(m / 10), 4, 1, 1)
  stampDigit(a, m % 10, 4, 5, 1)
  return a
}

export const amberClock = (grid: number[]): Cells =>
  grid.map((v) => (v === 0 ? led(AMBER_HOUR) : v === 1 ? led(AMBER_MIN) : null))

// Night: warm-red digits (firmware night colours) at the night brightness.
export const NIGHT_HOUR = 0xff4a00
export const NIGHT_MIN = 0xa81e00
// LEDs look much brighter than their duty cycle; this keeps 5% visible on screen while 100% stays full.
export const brightnessOnScreen = (pct: number) => 0.22 + 0.78 * Math.sqrt(pct / 100)
export const nightClock = (grid: number[], pct = 5): Cells => {
  const l = brightnessOnScreen(pct)
  return grid.map((v) => (v === 0 ? led(NIGHT_HOUR, l) : v === 1 ? led(NIGHT_MIN, l) : null))
}


// ---------- Lamp ----------
export type LampId = 'embers' | 'candle' | 'calm' | 'spectrum' | 'warm'
export const LAMP_EFFECTS: { id: LampId; name: string }[] = [
  { id: 'embers', name: 'Embers' },
  { id: 'candle', name: 'Candle' },
  { id: 'calm', name: 'Calm' },
  { id: 'spectrum', name: 'Spectrum' },
  { id: 'warm', name: 'Warm white' },
]
// How often each effect changes on the device (ms)
export const LAMP_STEP_MS: Record<LampId, number> = { embers: 200, candle: 70, calm: 40, spectrum: 35, warm: 1000 }

function colorWheel(pos: number): number {
  let p = 255 - (pos & 255)
  if (p < 85) return ((255 - p * 3) << 16) | (p * 3)
  if (p < 170) {
    p -= 85
    return ((p * 3) << 8) | (255 - p * 3)
  }
  p -= 170
  return ((p * 3) << 16) | ((255 - p * 3) << 8)
}

// Embers: a small pyramid of glowing wood at the bottom, faint sparks above, each pixel easing to its target.
export function embersStep(levels: number[], random: () => number = Math.random): number[] {
  const pct = () => Math.floor(random() * 100) / 100
  return levels.map((level, i) => {
    const x = i % 8
    const y = Math.floor(i / 8)
    let target: number
    if (y === 7 && x >= 2 && x <= 5) target = 0.55 + 0.45 * pct()
    else if (y === 6 && x >= 3 && x <= 4) target = 0.45 + 0.4 * pct()
    else {
      const base = (0.12 * (8 - y)) / 8
      target = Math.floor(random() * 100) < 30 ? base + 0.3 * pct() : base * 0.4
    }
    return level + (target - level) * 0.35
  })
}
// LEDs look brighter in a room than their raw level suggests, and the hottest ones read as yellow.
// On screen the same animation gets a display curve and a heat tint: yellow core, orange flames, red sparks.
const embersOnScreen = (l: number) => Math.min(1, Math.pow(Math.max(0, l), 0.45) * 1.35)
const HEAT: [number, number][] = [
  [0, 0x9a0e00],
  [0.08, 0xe62200],
  [0.18, 0xff5a00],
  [0.3, 0xffa000],
  [0.45, 0xffcc1a],
  [1, 0xffe65a],
]
function heat(l: number): number {
  const v = Math.max(0, Math.min(1, l))
  const k = HEAT.findIndex(([at]) => at >= v)
  if (k <= 0) return HEAT[0][1]
  const [a, ca] = HEAT[k - 1]
  const [b, cb] = HEAT[k]
  const f = (v - a) / (b - a)
  const [r1, g1, b1] = rgbOf(ca)
  const [r2, g2, b2] = rgbOf(cb)
  const mixc = (p: number, q: number) => Math.round(p + (q - p) * f)
  return (mixc(r1, r2) << 16) | (mixc(g1, g2) << 8) | mixc(b1, b2)
}
// The flames above the glowing pyramid get an extra 20% on screen.
const isPyramid = (i: number) => (i >= 58 && i <= 61) || i === 51 || i === 52
export const embersCells = (levels: number[]): Cells =>
  levels.map((l, i) => led(heat(l), Math.min(1, embersOnScreen(l) * (isPyramid(i) ? 1 : 1.2))))

// Deterministic warmed-up first frame so the server and the browser render the same thing.
export const EMBERS_START: number[] = (() => {
  let seed = 11
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  let levels = Array(64).fill(0)
  for (let n = 0; n < 12; n++) levels = embersStep(levels, rand)
  return levels
})()

// `t` is milliseconds since the effect started; `random` is only used by Candle.
export function lampCells(id: Exclude<LampId, 'embers'>, t: number, random: () => number = Math.random): Cells {
  switch (id) {
    case 'warm':
      return fill(led(0xff8c00))
    case 'candle':
      return fill(led(0xff6a00, (150 + Math.floor(random() * 90)) / 255))
    case 'calm': {
      const phase = (Math.floor(t / 20) % 360) / 360
      const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2
      return fill(led(0x5b5fff, 0.12 + 0.88 * tri))
    }
    case 'spectrum':
      return fill(led(colorWheel(Math.floor(t / 35))))
  }
}

// ---------- Focus ----------
const FILL_FOCUS = 0xff9a1f
const REM_TEXT = 0xfff2e0
const REM_SCROLL_MS = 105
export const FOCUS_TOTAL_MS = 5 * 60 * 1000 // a 5-minute timer for the preview
export const REMINDER_AT_MS = 15000
export const REMINDER_COLOR = 0x2bd9a8
const REMINDERS = { early: { label: 'Stretch', color: 0x2bd9a8 }, end: { label: 'Break', color: 0x2bd9a8 } }

// Running timer: the inner 6 × 6 drains as time runs out.
export function focusTimerCells(leftMs: number, totalMs = FOCUS_TOTAL_MS): Cells {
  const lit = (Math.max(0, leftMs) / totalMs) * 36
  const cells: Cells = Array(64).fill(null)
  let cell = 0
  for (let y = 1; y <= 6; y++)
    for (let x = 1; x <= 6; x++, cell++) {
      const v = lit - cell
      if (v > 0) cells[y * 8 + x] = led(FILL_FOCUS, Math.min(1, v))
    }
  return cells
}

// Small 5-px font, variable width (rows top to bottom, most significant bit = leftmost column).
const FONT5: Record<string, [number, number[]]> = {
  ' ': [2, [0, 0, 0, 0, 0]],
  A: [3, [0b010, 0b101, 0b111, 0b101, 0b101]], B: [3, [0b110, 0b101, 0b110, 0b101, 0b110]],
  C: [3, [0b011, 0b100, 0b100, 0b100, 0b011]], D: [3, [0b110, 0b101, 0b101, 0b101, 0b110]],
  E: [3, [0b111, 0b100, 0b110, 0b100, 0b111]], F: [3, [0b111, 0b100, 0b110, 0b100, 0b100]],
  G: [3, [0b011, 0b100, 0b101, 0b101, 0b011]], H: [3, [0b101, 0b101, 0b111, 0b101, 0b101]],
  I: [3, [0b111, 0b010, 0b010, 0b010, 0b111]], J: [3, [0b001, 0b001, 0b001, 0b101, 0b010]],
  K: [3, [0b101, 0b101, 0b110, 0b101, 0b101]], L: [3, [0b100, 0b100, 0b100, 0b100, 0b111]],
  M: [5, [0b10001, 0b11011, 0b10101, 0b10001, 0b10001]],
  N: [4, [0b1001, 0b1101, 0b1011, 0b1001, 0b1001]],
  O: [3, [0b010, 0b101, 0b101, 0b101, 0b010]], P: [3, [0b110, 0b101, 0b110, 0b100, 0b100]],
  Q: [3, [0b010, 0b101, 0b101, 0b110, 0b011]], R: [3, [0b110, 0b101, 0b110, 0b101, 0b101]],
  S: [3, [0b011, 0b100, 0b010, 0b001, 0b110]], T: [3, [0b111, 0b010, 0b010, 0b010, 0b010]],
  U: [3, [0b101, 0b101, 0b101, 0b101, 0b111]], V: [3, [0b101, 0b101, 0b101, 0b101, 0b010]],
  W: [5, [0b10001, 0b10001, 0b10101, 0b11011, 0b10001]],
  X: [3, [0b101, 0b101, 0b010, 0b101, 0b101]], Y: [3, [0b101, 0b101, 0b010, 0b010, 0b010]],
  Z: [3, [0b111, 0b001, 0b010, 0b100, 0b111]],
}
const glyph = (c: string) => FONT5[c.toUpperCase()] ?? FONT5[' ']
const textWidth5 = (s: string) => s.split('').reduce((w, c) => w + glyph(c)[0] + 1, 0) - 1

// One full pass of the label across the inner window, as on the device.
export const reminderPassMs = (label: string) => (textWidth5(label) + 6 + 4) * REM_SCROLL_MS

// Reminder alert: border double-pulses in the reminder colour, label scrolls through the inner 6 × 6.
export function reminderCells(label: string, color: number, t: number): Cells {
  const cells: Cells = Array(64).fill(null)
  const phase = t % 1200
  const ring = phase < 180 ? 1 : phase < 300 ? 0.15 : phase < 480 ? 1 : 0.15
  for (let i = 0; i < 64; i++) {
    const x = i % 8
    const y = Math.floor(i / 8)
    if (x === 0 || y === 0 || x === 7 || y === 7) cells[i] = led(color, ring)
  }
  const period = textWidth5(label) + 6 + 4
  const pos = Math.floor(t / REM_SCROLL_MS) % period
  let x = 7 - pos
  const text = led(REM_TEXT)
  for (const c of label) {
    const [w, rows] = glyph(c)
    for (let col = 0; col < w; col++) {
      const px = x + col
      if (px < 1 || px > 6) continue
      for (let row = 0; row < 5; row++) if (rows[row] & (1 << (w - 1 - col))) cells[(1 + row) * 8 + px] = text
    }
    x += w + 1
  }
  return cells
}

// The whole 5-minute preview loop: timer, a reminder at ~15 s, another at 0:00, then restart.
export function focusPreview(t: number, withReminders = true): { cells: Cells; leftMs: number; key: string } {
  const endPass = reminderPassMs(REMINDERS.end.label)
  const cycle = FOCUS_TOTAL_MS + (withReminders ? endPass : 0)
  const at = t % cycle
  const leftMs = Math.max(0, FOCUS_TOTAL_MS - at)
  const earlyPass = reminderPassMs(REMINDERS.early.label)
  if (withReminders && at >= REMINDER_AT_MS && at < REMINDER_AT_MS + earlyPass) {
    const rt = at - REMINDER_AT_MS
    return { cells: reminderCells(REMINDERS.early.label, REMINDERS.early.color, rt), leftMs, key: `a${Math.floor(rt / 35)}` }
  }
  if (withReminders && at >= FOCUS_TOTAL_MS) {
    const rt = at - FOCUS_TOTAL_MS
    return { cells: reminderCells(REMINDERS.end.label, REMINDERS.end.color, rt), leftMs: 0, key: `e${Math.floor(rt / 35)}` }
  }
  // Redraw the draining square in small brightness steps, and the readout once a second.
  return { cells: focusTimerCells(leftMs), leftMs, key: `t${Math.round((leftMs / FOCUS_TOTAL_MS) * 36 * 16)}:${Math.ceil(leftMs / 1000)}` }
}

export const formatLeft = (ms: number) => {
  const s = Math.ceil(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
