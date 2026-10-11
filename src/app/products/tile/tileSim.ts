// Small, accurate glimpses of Tile's modes for the website. Colours, fonts and timings
// come from the Tile firmware; only what the hero preview needs is reproduced here.
import type { Lit } from './TileDevice'

export type Cells = (Lit | null)[]

const rgbOf = (hex: number) => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255]

// One LED at a brightness level (0–1), drawn with the same lit-pixel look as the rest of the page.
export function led(hex: number, level = 1): Lit {
  const l = Math.max(0, Math.min(1, level))
  const [r, g, b] = rgbOf(hex).map((v) => Math.round(v * l))
  const mix = (v: number) => Math.round(v + (255 - v) * 0.45 * l)
  return {
    center: `rgb(${mix(r)},${mix(g)},${mix(b)})`,
    edge: `rgb(${r},${g},${b})`,
    glow: `rgba(${rgbOf(hex).join(',')},${(0.75 * l).toFixed(2)})`,
  }
}

const fill = (cell: Lit): Cells => Array(64).fill(cell)

// ---------- Clock (Glance face) ----------
export const AMBER_HOUR = 0xef9f27
export const AMBER_MIN = 0x5dcaa5
const DATE_COLOR = 0xf0a8a0
const DAY_COLOR = 0xe8c98a
export const DATE_FLASH_MS = 3000

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

// Day-of-week letters, 4 × 4 row-major.
const L = {
  M: [1,0,1,0, 1,1,1,0, 1,0,1,0, 1,0,1,0],
  o: [0,0,0,0, 0,1,1,0, 1,0,0,1, 0,1,1,0],
  T: [1,1,1,0, 0,1,0,0, 0,1,0,0, 0,1,0,0],
  u: [0,0,0,0, 1,0,0,1, 1,0,0,1, 0,1,1,0],
  W: [1,0,1,0, 1,1,1,0, 1,1,1,0, 0,1,0,0],
  e: [0,1,1,0, 1,1,1,0, 1,0,0,0, 0,1,1,0],
  h: [1,0,0,0, 1,1,1,0, 1,0,1,0, 1,0,1,0],
  F: [1,1,1,0, 1,0,0,0, 1,1,0,0, 1,0,0,0],
  r: [0,0,0,0, 1,1,1,0, 1,0,0,0, 1,0,0,0],
  S: [0,1,1,1, 1,1,0,0, 0,0,1,1, 1,1,1,0],
  a: [0,1,1,1, 1,0,0,1, 1,0,1,1, 1,1,0,1],
}
// JavaScript getDay(): 0 = Sunday
const DAY_LETTERS = [[L.S, L.u], [L.M, L.o], [L.T, L.u], [L.W, L.e], [L.T, L.h], [L.F, L.r], [L.S, L.a]]

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

// Tap in Clock: day of the month on top, two-letter weekday below.
export function dateCells(d: Date): Cells {
  const a = Array(64).fill(-1)
  stampDigit(a, Math.floor(d.getDate() / 10), 0, 0, 0)
  stampDigit(a, d.getDate() % 10, 0, 4, 0)
  const [first, second] = DAY_LETTERS[d.getDay()]
  stamp(a, (y, x) => first[y * 4 + x] === 1, 4, 0, 1)
  stamp(a, (y, x) => second[y * 4 + x] === 1, 4, 4, 1)
  return a.map((v) => (v === 0 ? led(DATE_COLOR) : v === 1 ? led(DAY_COLOR) : null))
}

// ---------- Lamp ----------
export type LampId = 'warm' | 'candle' | 'calm' | 'spectrum'
export const LAMP_SWATCHES: { id: LampId; name: string; swatch: string }[] = [
  { id: 'warm', name: 'Warm', swatch: '#FF8C00' },
  { id: 'candle', name: 'Candle', swatch: '#FF6A00' },
  { id: 'calm', name: 'Calm', swatch: '#5B5FFF' },
  { id: 'spectrum', name: 'Spectrum', swatch: 'conic-gradient(#ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' },
]
// How often each effect changes on the device (ms)
export const LAMP_STEP_MS: Record<LampId, number> = { warm: 1000, candle: 70, calm: 40, spectrum: 35 }

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

// `t` is milliseconds since the effect started; `random` is only used by Candle.
export function lampCells(id: LampId, t: number, random: () => number = Math.random): Cells {
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
const RING_BUSY = 0xff1e1e
const RING_AVAIL = 0x1ed760
const FILL_FOCUS = 0xff9a1f
const FILL_BREAK = 0x2bd9a8
// Demo speed: the real timer is 25 min focus / 5 min break.
export const DEMO_FOCUS_MS = 10000
export const DEMO_BREAK_MS = 4000
export const FOCUS_STEP_MS = 40

const isRing = (i: number) => {
  const x = i % 8
  const y = Math.floor(i / 8)
  return x === 0 || y === 0 || x === 7 || y === 7
}

// Timer screen: ring shows status, the inner 6 × 6 drains as time runs out.
export function focusTimerCells(t: number): Cells {
  const cycle = DEMO_FOCUS_MS + DEMO_BREAK_MS
  const at = t % cycle
  const focus = at < DEMO_FOCUS_MS
  const left = focus ? 1 - at / DEMO_FOCUS_MS : 1 - (at - DEMO_FOCUS_MS) / DEMO_BREAK_MS
  const lit = left * 36
  const ring = led(focus ? RING_BUSY : RING_AVAIL, 0.55)
  const fillHex = focus ? FILL_FOCUS : FILL_BREAK
  const cells: Cells = Array(64).fill(null)
  let cell = 0
  for (let y = 1; y <= 6; y++)
    for (let x = 1; x <= 6; x++, cell++) {
      const v = lit - cell
      if (v > 0) cells[y * 8 + x] = led(fillHex, Math.min(1, v))
    }
  for (let i = 0; i < 64; i++) if (isRing(i)) cells[i] = ring
  return cells
}

export type FocusStatus = 'busy' | 'available'

// Manual status light: Busy breathes red, Available is steady green.
export function statusCells(status: FocusStatus, t: number): Cells {
  if (status === 'available') return fill(led(RING_AVAIL))
  return fill(led(RING_BUSY, 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t / 900))))
}
