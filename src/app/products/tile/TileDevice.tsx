'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'

export interface Lit {
  center: string
  edge: string
  glow: string
  level?: number // 0–1; how strongly the pixel shows through the diffuser (default 1)
}

export type Chin = 'purple' | 'navy'

// Matte chin colours, muted so they sit with the orange body.
export const CHINS: Record<Chin, { label: string; color: string }> = {
  purple: { label: 'Purple', color: '#5A4794' },
  navy: { label: 'Navy', color: '#26334F' },
}

// Geometry, as percentages of the container (1212 × 1298) so the device keeps its size everywhere.
// Corner radii use container-width units (cqw) so they stay circular at any size.
const R = '5.5cqw' // outer corner radius: top of the orange body, bottom of the chin
const SIDES = { left: '9.74%', width: '80.53%' }
const ORANGE_BOX = { ...SIDES, top: '1.39%', height: '74.33%' } // ends in a straight edge where the chin starts
const CHIN_BOX = { ...SIDES, top: '75.72%', height: '20.97%' } // ~22% of the front
const SCREEN = { left: '14.02%', top: '5.5%', width: '71.96%', height: '69.6%' } // the diffuser opening
const SCREEN_R = '1cqw' // ~18% of the outer radius
const BEVEL = '3.5px' // inner chamfer from the bezel down to the diffuser

// Flat matte orange with a fine outer chamfer: catching light along the top, a touch darker down the sides.
const ORANGE_STYLE: CSSProperties = {
  ...ORANGE_BOX,
  borderRadius: `${R} ${R} 0 0`,
  background: 'linear-gradient(180deg, #F48C40 0%, #F08235 100%)',
  boxShadow: 'inset 0 2.5px 0 #F9A66A, inset 2.5px 0 0 #E2732A, inset -2.5px 0 0 #E2732A',
}
// Flat matte chin, square at the top (flush with the orange), rounded at the bottom; a fine seam where they meet.
const CHIN_STYLE: CSSProperties = {
  ...CHIN_BOX,
  borderRadius: `0 0 ${R} ${R}`,
  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.12) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.06)',
}
// The Tile mark on the chin: three squares over one, slightly recessed, bottom-right.
const MARK: CSSProperties = {
  position: 'absolute',
  right: '7.5%',
  top: '23%',
  width: '23%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '4.5%',
}
const MARK_SQUARE: CSSProperties = {
  aspectRatio: '1',
  borderRadius: '12%',
  background: '#F2843A',
  boxShadow: '0 1.5px 1.5px rgba(0,0,0,0.35) inset, 0 -0.5px 0 rgba(255,255,255,0.12)',
}
// The screen opening: a chamfer stepping down from the bezel (shadowed top and left, lit bottom and right),
// then the dark diffuser, recessed with a thin inner shadow.
const OPENING_STYLE: CSSProperties = {
  position: 'absolute',
  left: `calc(${SCREEN.left} - ${BEVEL})`,
  top: `calc(${SCREEN.top} - ${BEVEL})`,
  width: `calc(${SCREEN.width} + 2 * ${BEVEL})`,
  height: `calc(${SCREEN.height} + 2 * ${BEVEL})`,
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: BEVEL,
  borderColor: '#C9631F #F7A060 #F7A060 #CF6822', // top right bottom left
  borderRadius: `calc(${SCREEN_R} + ${BEVEL})`,
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
  chin = 'purple',
  dim = false,
  glow = 14,
  interactive,
  alt = 'Tile, a desk display with an 8 by 8 pixel screen, orange body and coloured chin',
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
      <div
        aria-hidden="true"
        className="absolute motion-safe:transition-colors motion-safe:duration-300"
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
          borderRadius: SCREEN_R,
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

// Swatches that switch the chin colour on every simulated Tile on the page.
export function ChinSwatches({ value, onChange, className = '' }: { value: Chin; onChange: (c: Chin) => void; className?: string }) {
  return (
    <div role="group" aria-label="Chin colour" className={`inline-flex items-center gap-4 ${className}`}>
      {(Object.keys(CHINS) as Chin[]).map((k) => {
        const on = value === k
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(k)}
            className="group inline-flex min-h-[44px] items-center gap-2 px-1 font-mono text-[11px] uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0641E]"
            style={{ color: on ? '#EDEDEF' : '#85858D' }}
          >
            <span
              aria-hidden="true"
              className="relative h-[18px] w-[18px] overflow-hidden rounded-full"
              style={{
                background: `linear-gradient(180deg, #F2843A 0 50%, ${CHINS[k].color} 50% 100%)`,
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
