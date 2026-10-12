// Low-res versions of the simulated device for the Design reveal: the device is drawn from the same shape and
// colours as TileDevice, then averaged down into N × N square-ish "super-pixels" (like shrinking a photo).
import { DEVICE_ASPECT, SHAPE } from './TileDevice'
import type { Cells } from './tileSim'

type RGBA = [number, number, number, number]

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgb = (s: string): [number, number, number] => {
  if (s.startsWith('#')) return hex(s)
  const m = s.match(/\d+/g) ?? ['0', '0', '0']
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t) as [number, number, number]

const inBox = (u: number, v: number, b: { x: number; y: number; w: number; h: number }) =>
  u >= b.x && u < b.x + b.w && v >= b.y && v < b.y + b.h

// Rounded corners: radius is a fraction of the width; v is scaled so the corners stay circular.
const outsideCorner = (u: number, v: number, cx: number, cy: number) => {
  const r = SHAPE.radius
  const dx = (u - cx) / r
  const dy = ((v - cy) / r) / DEVICE_ASPECT
  return dx * dx + dy * dy > 1
}

function colorAt(u: number, v: number, chin: string, cells: Cells): RGBA {
  const { orange: o, chin: c, screen: s, radius: r } = SHAPE
  const rv = r * DEVICE_ASPECT
  // Screen: dark diffuser with the 8 × 8 pixels.
  if (inBox(u, v, s)) {
    const pad = 0.012
    const fx = (u - s.x - pad) / (s.w - 2 * pad)
    const fy = (v - s.y - pad * DEVICE_ASPECT) / (s.h - 2 * pad * DEVICE_ASPECT)
    if (fx < 0 || fx >= 1 || fy < 0 || fy >= 1) return [...hex(SHAPE.screenColor), 255]
    const col = Math.floor(fx * 8)
    const row = Math.floor(fy * 8)
    if (fx * 8 - col > 0.88 || fy * 8 - row > 0.88) return [...hex(SHAPE.screenColor), 255]
    const lit = cells[row * 8 + col]
    const off = hex(SHAPE.offColor)
    return lit ? [...mix(off, rgb(lit.edge), lit.level ?? 1), 255] : [...off, 255]
  }
  // Chin: square at the top, rounded at the bottom, with the Tile mark.
  if (inBox(u, v, c)) {
    if (v > c.y + c.h - rv) {
      if (u < c.x + r && outsideCorner(u, v, c.x + r, c.y + c.h - rv)) return [0, 0, 0, 0]
      if (u > c.x + c.w - r && outsideCorner(u, v, c.x + c.w - r, c.y + c.h - rv)) return [0, 0, 0, 0]
    }
    const markW = 0.22 * c.w
    const sq = markW / 3.3
    const gap = 0.15 * sq
    const mx = c.x + c.w - 0.075 * c.w - markW
    const markH = (2 * sq + gap) * DEVICE_ASPECT
    const my = c.y + (c.h - markH) / 2
    const lx = (u - mx) / (sq + gap)
    const ly = (v - my) / ((sq + gap) * DEVICE_ASPECT)
    const inSquare = lx >= 0 && ly >= 0 && lx - Math.floor(lx) < sq / (sq + gap) && ly - Math.floor(ly) < sq / (sq + gap)
    const markCell = Math.floor(ly) === 0 ? Math.floor(lx) >= 0 && Math.floor(lx) < 3 : Math.floor(ly) === 1 && Math.floor(lx) === 1
    if (inSquare && markCell) return [...hex(SHAPE.orangeColor), 255]
    return [...hex(chin), 255]
  }
  // Orange body: rounded at the top.
  if (inBox(u, v, o)) {
    if (v < o.y + rv) {
      if (u < o.x + r && outsideCorner(u, v, o.x + r, o.y + rv)) return [0, 0, 0, 0]
      if (u > o.x + o.w - r && outsideCorner(u, v, o.x + o.w - r, o.y + rv)) return [0, 0, 0, 0]
    }
    return [...hex(SHAPE.orangeColor), 255]
  }
  return [0, 0, 0, 0]
}

// N × N RGBA pixels, each the average of a few samples inside it (transparent around the device).
export function devicePixels(n: number, chin: string, cells: Cells, samples = 5): Uint8ClampedArray {
  const out = new Uint8ClampedArray(n * n * 4)
  for (let py = 0; py < n; py++)
    for (let px = 0; px < n; px++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let sy = 0; sy < samples; sy++)
        for (let sx = 0; sx < samples; sx++) {
          const [cr, cg, cb, ca] = colorAt((px + (sx + 0.5) / samples) / n, (py + (sy + 0.5) / samples) / n, chin, cells)
          r += cr * ca
          g += cg * ca
          b += cb * ca
          a += ca
        }
      const i = (py * n + px) * 4
      if (a > 0) {
        out[i] = r / a
        out[i + 1] = g / a
        out[i + 2] = b / a
      }
      out[i + 3] = a / (samples * samples)
    }
  return out
}
