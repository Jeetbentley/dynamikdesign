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

// Proportions of the product, as percentages of the container (1212 × 1298), so the device keeps its size everywhere.
const BODY = { left: '9.74%', top: '1.39%', width: '80.53%', height: '95.3%' }
const CHIN_HEIGHT = '22%' // of the front
// The frosted diffuser: a thin orange bezel at the sides and top, ending just above the chin.
const SCREEN = { left: '14.02%', top: '5.5%', width: '71.96%', height: '69.6%' }

// Two-tone matte body: orange shell, coloured chin. Soft light from above, no gloss.
const BODY_STYLE: CSSProperties = {
  ...BODY,
  borderRadius: '7% / 5.4%',
  background: 'linear-gradient(180deg, #F7944C 0%, #F2843A 45%, #E9772E 100%)',
  boxShadow: '0 1px 0 rgba(255,236,220,0.45) inset, 0 -2px 3px rgba(90,30,0,0.25) inset',
  overflow: 'hidden',
}
const CHIN_STYLE: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: CHIN_HEIGHT,
  backgroundImage:
    'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.16) 100%)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.25)',
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
// Frosted white diffuser, set into the bezel.
const PANEL_STYLE: CSSProperties = {
  ...SCREEN,
  borderRadius: '3.6% / 3.6%',
  background: 'radial-gradient(120% 90% at 50% 30%, #EEF0F1 0%, #E1E4E6 55%, #D3D7DA 100%)',
  boxShadow: '0 2px 4px rgba(90,30,0,0.35) inset, 0 0 0 1px rgba(120,50,10,0.25) inset',
}
const DIM = 'brightness(0.34) saturate(0.85)'

// An unlit pixel: just the diffuser, with the faintest hint of the grid behind it.
const OFF: CSSProperties = {
  background: 'rgba(120,128,134,0.025)',
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
  alt = 'Tile, a desk display with a frosted 8 by 8 pixel screen, orange body and coloured chin',
}: Props) {
  // Mouse paints on press (so drag-painting works); touch paints on tap so scrolling past doesn't.
  const lastPointer = useRef('mouse')
  return (
    <div
      role={interactive ? 'group' : 'img'}
      aria-label={alt}
      className="relative w-full select-none"
      style={{ aspectRatio: '1212 / 1298' }}
    >
      <div aria-hidden="true" className="absolute" style={dim ? { ...BODY_STYLE, filter: DIM } : BODY_STYLE}>
        <div className="motion-safe:transition-colors motion-safe:duration-300" style={{ ...CHIN_STYLE, backgroundColor: CHINS[chin].color }}>
          <div style={MARK}>
            {[0, 1, 2, 4].map((n) => (
              <span key={n} style={{ ...MARK_SQUARE, gridColumn: (n % 3) + 1, gridRow: Math.floor(n / 3) + 1 }} />
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute" style={dim ? { ...PANEL_STYLE, filter: DIM } : PANEL_STYLE} />
      <div
        className="absolute grid grid-cols-8 grid-rows-8 overflow-hidden"
        style={{
          ...SCREEN,
          borderRadius: '3.6% / 3.6%',
          padding: '1.2%',
          columnGap: '0.95%',
          rowGap: '0.95%',
        }}
      >
        {cells.map((c, i) => {
          const style: CSSProperties = c
            ? {
                background: `radial-gradient(circle at 50% 45%, ${c.center} 0%, ${c.edge} 55%, ${c.edge} 100%)`,
                boxShadow: `0 0 ${glow}px ${Math.round(glow / 5)}px ${c.glow}`,
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
              className={`rounded-[9%] border-0 p-0 cursor-crosshair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0B0B0C] ${
                c ? '' : 'hover:!bg-[rgba(60,66,72,0.16)]'
              }`}
              style={style}
            />
          )
        })}
        {/* Soft sheen across the frosted cover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%)' }}
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
