'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'

export interface Lit {
  center: string
  edge: string
  glow: string
  level?: number // 0–1; how strongly the pixel shows through the diffuser (default 1)
}

// Matte purple chin: the one colourway.
const CHIN_COLOR = '#5A4794'

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
  background: 'linear-gradient(180deg, #F48C40 0%, #F08235 100%)',
  boxShadow: `inset 0 ${CHAMFER} 0.3cqw -0.1cqw #F9A86C, inset ${CHAMFER} 0 0.3cqw -0.1cqw #DF7029, inset -${CHAMFER} 0 0.3cqw -0.1cqw #DF7029`,
}
// Flat matte purple chin: no chamfer, gradient or sheen. Square at the top, rounded at the bottom, with a
// very soft shadow where it meets the orange sides.
const CHIN_STYLE: CSSProperties = {
  ...CHIN_BOX,
  borderRadius: `0 0 ${R} ${R}`,
  background: CHIN_COLOR,
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
  background: '#EE8035',
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
  dim?: boolean
  glow?: number
  interactive?: Interactive
  alt?: string
}

export default function TileDevice({
  cells,
  dim = false,
  glow = 14,
  interactive,
  alt = 'Tile, a desk display with an 8 by 8 pixel screen, orange body and purple chin',
}: Props) {
  // Mouse paints on press (so drag-painting works); touch paints on tap so scrolling past doesn't.
  const lastPointer = useRef('mouse')
  return (
    <div
      role={interactive ? 'group' : 'img'}
      aria-label={alt}
      className="relative w-full select-none"
      style={{ aspectRatio: '1212 / 1298', containerType: 'inline-size' }}
    >
      <div aria-hidden="true" className="absolute" style={dim ? { ...ORANGE_STYLE, filter: DIM } : ORANGE_STYLE} />
      <div aria-hidden="true" className="absolute" style={dim ? { ...CHIN_STYLE, filter: DIM } : CHIN_STYLE}>
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
