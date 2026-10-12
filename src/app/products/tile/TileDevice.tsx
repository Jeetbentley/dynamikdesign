'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'

export interface Lit {
  center: string
  edge: string
  glow: string
  level?: number // 0–1; how strongly the pixel shows through the diffuser (default 1)
}

export type Chin = 'blue' | 'purple'

// The two colourways, in display order: blue is the default.
export const CHINS: Record<Chin, { label: string; color: string }> = {
  blue: { label: 'Blue', color: '#2C5CD6' },
  purple: { label: 'Purple', color: '#7B5EC6' },
}
// A fine, even grain over the matte chin (static noise, no sheen).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.14 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Geometry, as percentages of the container (1212 × 1298) so the device keeps its size everywhere.
// Radii and chamfers use container-width units (cqw), so they scale with the device.
const R = '5.5cqw' // outer corner radius: top of the orange body, bottom of the chin
const ORANGE_BOX = { left: '9.74%', width: '80.53%', top: '1.39%', height: '71.48%' } // straight bottom edge, meets the chin
// The chin: ~25% of the device height, barely proud of the orange (~1.25% of the body width each side).
const CHIN_BOX = { left: '8.73%', width: '82.54%', top: '72.87%', height: '23.82%' }
// The diffuser opening runs straight down to the chin.
const SCREEN = { left: '14.02%', top: '5.5%', width: '71.96%', height: '67.37%' }
const SCREEN_R = '1cqw' // ~18% of the outer radius, top corners only
const BEVEL = '1.6cqw' // inner chamfer, ~6px at desktop size
const CHAMFER = '1.45cqw' // outer chamfer on the orange, ~5–6px at desktop size

// Flat matte orange with an outer chamfer: lighter where the top edge catches the light, darker down the sides.
const ORANGE_STYLE: CSSProperties = {
  ...ORANGE_BOX,
  borderRadius: `${R} ${R} 0 0`,
  background: 'linear-gradient(180deg, #F29242 0%, #EE8336 100%)', // averages #F08A3C
  boxShadow: `inset 0 ${CHAMFER} 0.3cqw -0.1cqw #F9A86C, inset ${CHAMFER} 0 0.3cqw -0.1cqw #DF7029, inset -${CHAMFER} 0 0.3cqw -0.1cqw #DF7029`,
}
// Flat matte chin with a fine grain: no chamfer, gradient or sheen. Square at the top, rounded at the bottom, with a
// very soft shadow where it meets the orange sides.
const CHIN_STYLE: CSSProperties = {
  ...CHIN_BOX,
  borderRadius: `0 0 ${R} ${R}`,
  backgroundImage: GRAIN,
  backgroundSize: '96px 96px',
  boxShadow: '0 -0.2cqw 0.5cqw rgba(60,20,0,0.22)',
}
// The Tile mark, measured from the product photo: three squares over one, ~22% of the chin width
// (~half its height), gap 15% of a square, right margin 7.5% of the chin width, centred vertically.
// Chin width is 82.54cqw, so width 18.16cqw = 3 squares of 5.5cqw + 2 gaps of 0.83cqw.
const MARK: CSSProperties = {
  position: 'absolute',
  right: '7.5%',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '18.16cqw',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.83cqw',
}
// Each square is a soft pocket: rounded corners, orange fill, a subtle shadow inside it.
const MARK_SQUARE: CSSProperties = {
  aspectRatio: '1',
  borderRadius: '25%',
  background: '#EC853A',
  boxShadow: 'inset 0.3cqw 0.35cqw 0.45cqw rgba(0,0,0,0.32)',
}
// The screen opening: a chamfer stepping down from the bezel (shadowed top and left, lit right), then the
// dark diffuser, recessed with a thin inner shadow. No border at the bottom: the diffuser meets the chin.
const OPENING_STYLE: CSSProperties = {
  position: 'absolute',
  left: `calc(${SCREEN.left} - ${BEVEL})`,
  top: `calc(${SCREEN.top} - ${BEVEL})`,
  width: `calc(${SCREEN.width} + 2 * ${BEVEL})`,
  height: `calc(${SCREEN.height} + ${BEVEL})`,
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: `${BEVEL} ${BEVEL} 0 ${BEVEL}`,
  borderColor: '#B85619 #F9A462 transparent #C25C1C', // top right bottom left
  borderRadius: `calc(${SCREEN_R} + ${BEVEL}) calc(${SCREEN_R} + ${BEVEL}) 0 0`,
  background: '#17181B',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.5)',
}
const DIM = 'brightness(0.34) saturate(0.85)'

// An unlit pixel: quiet rounded square, faint light along its top edge.
const OFF: CSSProperties = {
  background: '#22232A',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
}

interface Interactive {
  onDown: (i: number) => void
  onEnter: (i: number, e: PointerEvent) => void
  onKey: (i: number) => void
}

interface Props {
  cells: (Lit | null)[]
  chin?: Chin
  dim?: boolean
  glow?: number
  interactive?: Interactive
  alt?: string
}

export default function TileDevice({
  cells,
  chin = 'blue',
  dim = false,
  glow = 14,
  interactive,
  alt,
}: Props) {
  // Mouse paints on press (so drag-painting works); touch paints on tap so scrolling past doesn't.
  const lastPointer = useRef('mouse')
  return (
    <div
      role={interactive ? 'group' : 'img'}
      aria-label={alt ?? `Tile, a desk display with an 8 by 8 pixel screen, orange body and ${CHINS[chin].label.toLowerCase()} chin`}
      className="relative w-full select-none"
      style={{ aspectRatio: '1212 / 1298', containerType: 'inline-size' }}
    >
      <div aria-hidden="true" className="absolute" style={dim ? { ...ORANGE_STYLE, filter: DIM } : ORANGE_STYLE} />
      <div
        aria-hidden="true"
        className="absolute"
        style={{ ...CHIN_STYLE, backgroundColor: CHINS[chin].color, ...(dim ? { filter: DIM } : null) }}
      >
        <div style={MARK}>
          {[0, 1, 2, 4].map((n) => (
            <span key={n} style={{ ...MARK_SQUARE, gridColumn: (n % 3) + 1, gridRow: Math.floor(n / 3) + 1 }} />
          ))}
        </div>
      </div>
      <div aria-hidden="true" style={dim ? { ...OPENING_STYLE, filter: DIM } : OPENING_STYLE} />
      <div
        className="absolute grid grid-cols-8 grid-rows-8 overflow-hidden"
        style={{
          ...SCREEN,
          borderRadius: `${SCREEN_R} ${SCREEN_R} 0 0`,
          padding: '1.2%',
          columnGap: '0.95%',
          rowGap: '0.95%',
        }}
      >
        {cells.map((c, i) => {
          const style: CSSProperties = c
            ? {
                background: `radial-gradient(circle at 50% 45%, ${c.center} 0%, ${c.center} 25%, ${c.edge} 80%)`,
                // Spills about one cell onto the neighbours, in the pixel's own colour
                boxShadow: `0 0 ${((glow / 14) * 8).toFixed(1)}cqw ${((glow / 14) * 0.6).toFixed(1)}cqw ${c.glow}`,
                opacity: c.level ?? 1,
              }
            : OFF
          if (!interactive) return <div key={i} aria-hidden="true" className="rounded-[9%]" style={style} />
          return (
            <button
              key={i}
              type="button"
              aria-label={`Pixel row ${Math.floor(i / 8) + 1}, column ${(i % 8) + 1}`}
              aria-pressed={!!c}
              onPointerDown={(e) => {
                lastPointer.current = e.pointerType
                if (e.pointerType === 'mouse') interactive.onDown(i)
              }}
              onPointerEnter={(e) => interactive.onEnter(i, e)}
              onClick={(e) => {
                if (e.detail === 0 || lastPointer.current !== 'mouse') interactive.onKey(i)
              }}
              className={`rounded-[9%] border-0 p-0 cursor-crosshair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#EDEDEF] ${
                c ? '' : 'hover:!bg-[#2E2F37]'
              }`}
              style={style}
            />
          )
        })}
        {/* Cover: a faint diagonal reflection over the pixels */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 38%, rgba(255,255,255,0) 38.5%)' }}
        />
      </div>
    </div>
  )
}

// Swatches that switch the chin colour on every simulated Tile on the page. Instant, no animation.
export function ChinSwatches({ value, onChange }: { value: Chin; onChange: (c: Chin) => void }) {
  return (
    <div role="group" aria-label="Chin colour" className="inline-flex items-center gap-4">
      {(Object.keys(CHINS) as Chin[]).map((k) => {
        const on = value === k
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(k)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-2 font-mono text-[11px] uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0641E]"
            style={{ color: on ? '#EDEDEF' : '#85858D' }}
          >
            <span
              aria-hidden="true"
              className="h-[18px] w-[18px] rounded-full"
              style={{
                background: `linear-gradient(180deg, #F08A3C 0 50%, ${CHINS[k].color} 50% 100%)`,
                boxShadow: on ? '0 0 0 2px #0B0B0C, 0 0 0 3.5px #EDEDEF' : '0 0 0 1px #34343A',
              }}
            />
            {CHINS[k].label}
          </button>
        )
      })}
    </div>
  )
}
