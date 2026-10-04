'use client'

import Image from 'next/image'
import { useRef, type PointerEvent } from 'react'

export interface Lit {
  center: string
  edge: string
  glow: string
}

// Position of the 8×8 screen inside tile-device.webp (1212 × 1298), as percentages.
const SCREEN = { left: '14.686%', top: '6.549%', width: '70.71%', height: '62.635%' }

interface Interactive {
  onDown: (i: number) => void
  onEnter: (i: number, e: PointerEvent) => void
  onKey: (i: number) => void
}

interface Props {
  cells: (Lit | null)[]
  dim?: boolean
  glow?: number
  priority?: boolean
  sizes?: string
  interactive?: Interactive
  alt?: string
}

export default function TileDevice({
  cells,
  dim = false,
  glow = 14,
  priority = false,
  sizes = '(min-width: 768px) 460px, 90vw',
  interactive,
  alt = 'Tile, an orange desk display with an 8 by 8 pixel screen',
}: Props) {
  // Mouse paints on press (so drag-painting works); touch paints on tap so scrolling past doesn't.
  const lastPointer = useRef('mouse')
  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '1212 / 1298' }}>
      <Image
        src="/products/tile/tile-device.webp"
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-contain"
        style={dim ? { filter: 'brightness(0.34) saturate(0.85)' } : undefined}
      />
      <div
        className="absolute grid grid-cols-8 grid-rows-8 overflow-hidden"
        style={{ ...SCREEN, borderRadius: '4.2% / 4.43%', padding: '1.17%', columnGap: '0.93%', rowGap: '0.98%' }}
      >
        {cells.map((c, i) => {
          const style = c
            ? {
                background: `radial-gradient(circle at 50% 45%, ${c.center} 0%, ${c.center} 38%, ${c.edge} 100%)`,
                boxShadow: `0 0 ${glow}px ${Math.round(glow / 5)}px ${c.glow}`,
              }
            : undefined
          if (!interactive) return <div key={i} className="rounded-[9%]" style={style} />
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
                c ? '' : 'hover:bg-black/[0.07]'
              }`}
              style={style}
            />
          )
        })}
      </div>
    </div>
  )
}
