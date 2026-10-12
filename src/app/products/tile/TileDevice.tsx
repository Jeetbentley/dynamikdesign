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
export const CHINS: Record<Chin, { label: string; color: string; wall: string }> = {
  purple: { label: 'Purple', color: '#5A4794', wall: '#45367A' },
  navy: { label: 'Navy', color: '#26334F', wall: '#1B253C' },
}

// Geometry, as percentages of the container (1212 × 1298) so the device keeps its size everywhere.
// Radii, chamfers and the chin ledge use container-width units (cqw), so they scale with the device.
const R = '5.5cqw' // outer corner radius: top of the orange body, bottom of the chin
const ORANGE_BOX = { left: '9.74%', width: '80.53%', top: '1.39%', height: '69.11%' } // straight bottom edge, hidden by the chin
// The chin: ~27.5% of the front height, and 2.5% of the body width proud of the orange on each side.
const CHIN_BOX = { left: '7.73%', width: '84.55%', top: '70.5%', height: '26.19%' }
const LEDGE = '2.4cqw' // top face of the chin, ~3% of the body width
// The diffuser opening runs straight down to the chin.
const SCREEN = { left: '14.02%', top: '5.5%', width: '71.96%', height: '65%' }
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
// Flat matte chin: square at the top, rounded at the bottom, sitting proud of the face. Its shadow falls
// up onto the orange sides just above where it sticks out.
const CHIN_STYLE: CSSProperties = {
  ...CHIN_BOX,
  borderRadius: `0 0 ${R} ${R}`,
  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.12) 100%)',
  boxShadow: '0 -0.5cqw 1.2cqw rgba(60,20,0,0.45)',
}
// The ledge along the top of the chin, lit from above, with a fine edge where it turns down into the face.
const LEDGE_STYLE: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: LEDGE,
  background: 'linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.12))',
  boxShadow: '0 1px 0 rgba(0,0,0,0.30)',
}
// The Tile mark: ~17% of the chin width, right side, a little above the middle of the chin face.
// Square s and gap g = 0.18s: width 3.36s; right margin 3g.
const MARK: CSSProperties = {
  position: 'absolute',
  right: '2.75%',
  top: '35%',
  width: '17%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '5.4%',
  rowGap: '5.4%',
}
// Each square is a pocket: chin-coloured walls on the top and left, a shadow into it, orange at the bottom.
const markSquare = (wall: string): CSSProperties => ({
  aspectRatio: '1',
  borderRadius: '10%',
  background: '#E87A33',
  boxShadow: `inset 0.45cqw 0.45cqw 0 ${wall}, inset 0.7cqw 0.7cqw 0.6cqw rgba(0,0,0,0.38), inset -1px -1px 0 rgba(255,255,255,0.14)`,
})
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
        <div style={LEDGE_STYLE} />
        <div style={MARK}>
          {[0, 1, 2, 4].map((n) => (
            <span
              key={n}
              style={{ ...markSquare(CHINS[chin].wall), gridColumn: (n % 3) + 1, gridRow: Math.floor(n / 3) + 1 }}
            />
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
