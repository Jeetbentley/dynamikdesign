'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'

export interface Lit {
  center: string
  edge: string
  glow: string
}

// Proportions of the original product render (1212 × 1298), as percentages, so the device keeps its size everywhere.
const BODY = { left: '9.74%', top: '1.39%', width: '80.53%', height: '95.3%' }
const RECESS = { left: '14.03%', top: '5.86%', width: '72.03%', height: '64.1%' }
const SCREEN = { left: '14.686%', top: '6.549%', width: '70.71%', height: '62.635%' }

// Anodised orange aluminium: a lit chamfer, a face with fine brushing and a soft top-left sheen.
const CHAMFER: CSSProperties = {
  ...BODY,
  borderRadius: '8.7% / 6.9%',
  background: 'linear-gradient(160deg, #FFC9A0 0%, #F58A47 18%, #D9561A 55%, #9E3A0C 100%)',
  boxShadow: '0 1.5px 0 rgba(255,255,255,0.18) inset, 0 -2px 3px rgba(0,0,0,0.35) inset',
}
const FACE: CSSProperties = {
  position: 'absolute',
  inset: '0.75% 0.9%',
  borderRadius: '8% / 6.3%',
  background: [
    'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.08) 70%, rgba(0,0,0,0.26) 100%)',
    'radial-gradient(120% 60% at 30% 0%, rgba(255,226,200,0.35), rgba(255,226,200,0) 60%)',
    'repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, rgba(0,0,0,0.035) 1px 2px, rgba(0,0,0,0) 2px 4px)',
    'linear-gradient(180deg, #F57A34 0%, #E8611F 40%, #D4500F 100%)',
  ].join(', '),
  boxShadow: '0 1px 1px rgba(255,236,220,0.55) inset, 0 -1px 2px rgba(80,20,0,0.35) inset',
}
// The bevel the screen sits in: shaded at the top, catching light at the bottom lip.
const RECESS_STYLE: CSSProperties = {
  ...RECESS,
  borderRadius: '5.4% / 5.8%',
  background: 'linear-gradient(180deg, #7A2A06 0%, #B6460F 60%, #F08A4E 100%)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.55) inset',
}
const DIM = 'brightness(0.34) saturate(0.85)'

const OFF: CSSProperties = {
  background: 'radial-gradient(circle at 50% 40%, #1E1E21 0%, #161618 100%)',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.025) inset',
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
  alt = 'Tile, an orange desk display with an 8 by 8 pixel screen',
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
      <div aria-hidden="true" className="absolute" style={dim ? { ...CHAMFER, filter: DIM } : CHAMFER}>
        <div style={FACE} />
      </div>
      <div aria-hidden="true" className="absolute" style={dim ? { ...RECESS_STYLE, filter: DIM } : RECESS_STYLE} />
      <div
        className="absolute grid grid-cols-8 grid-rows-8 overflow-hidden"
        style={{
          ...SCREEN,
          borderRadius: '4.2% / 4.43%',
          padding: '1.17%',
          columnGap: '0.93%',
          rowGap: '0.98%',
          background: 'radial-gradient(120% 90% at 50% 35%, #141416 0%, #0A0A0B 100%)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.85) inset, 0 0 0 1px rgba(0,0,0,0.6) inset',
        }}
      >
        {cells.map((c, i) => {
          const style: CSSProperties = c
            ? {
                background: `radial-gradient(circle at 50% 45%, ${c.center} 0%, ${c.center} 38%, ${c.edge} 100%)`,
                boxShadow: `0 0 ${glow}px ${Math.round(glow / 5)}px ${c.glow}`,
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
                c ? '' : 'hover:!bg-[#2A2A2E]'
              }`}
              style={style}
            />
          )
        })}
        {/* Cover glass: a faint diagonal reflection over the pixels */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 38%, rgba(255,255,255,0) 38.5%)' }}
        />
      </div>
    </div>
  )
}
