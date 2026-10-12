'use client'

import Image from 'next/image'
import type { Chin } from './TileDevice'
import type { ContextSlot } from '@/data/tile'
import { eyebrow, h2, mono } from './tileStyles'

export interface RoomPhoto {
  slot: ContextSlot
  caption: string
  alt: string
  src: string // blue-chin photo
  purpleSrc?: string // optional purple-chin version
}

// Bento layout on desktop: the living room large on the left, two squares on the right, wide photos below.
// Phones: one column, with the two squares side by side.
const AREA: Record<ContextSlot, string> = {
  living: 'col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto',
  lamp: 'col-span-1 aspect-square',
  clock: 'col-span-1 aspect-square',
  focus: 'col-span-2 aspect-video md:col-span-3 md:aspect-[21/9]',
  night: 'col-span-2 aspect-video md:col-span-3 md:aspect-[21/9]',
}
const SIZES: Record<ContextSlot, string> = {
  living: '(min-width: 768px) 66vw, 100vw',
  lamp: '(min-width: 768px) 33vw, 50vw',
  clock: '(min-width: 768px) 33vw, 50vw',
  focus: '(min-width: 1280px) 1240px, 100vw',
  night: '(min-width: 1280px) 1240px, 100vw',
}

export default function TileRoom({ photos, chin }: { photos: RoomPhoto[]; chin: Chin }) {
  if (!photos.length) return null
  return (
    <section aria-labelledby="room-h" className="border-t border-[#1E1E22] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <p className={eyebrow}>/ In the room</p>
        <h2 id="room-h" className={`mb-12 ${h2}`}>Made for real rooms.</h2>
        <div className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((p) => {
            const purple = chin === 'purple' && p.purpleSrc
            return (
              <figure key={p.slot} className={`relative m-0 overflow-hidden rounded-[28px] border border-[#1E1E22] bg-[#141416] ${AREA[p.slot]}`}>
                <Image
                  src={purple ? p.purpleSrc! : p.src}
                  alt={`${p.alt}, with ${purple ? 'a purple' : 'a blue'} chin`}
                  fill
                  sizes={SIZES[p.slot]}
                  className="object-cover"
                />
                <figcaption className={`absolute bottom-3 left-3 rounded-full bg-[rgba(11,11,12,0.72)] px-3 py-1.5 backdrop-blur-[6px] ${mono} !text-[#EDEDEF]`}>
                  {p.caption}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
