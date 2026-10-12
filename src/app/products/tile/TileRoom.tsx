import Image from 'next/image'
import { eyebrow, h2 } from './tileStyles'

export interface RoomPhoto {
  file: string
  alt: string
}

// Portrait photos. Desktop: one row of three. Phones: the first full width, the next two side by side.
export default function TileRoom({ photos }: { photos: RoomPhoto[] }) {
  if (!photos.length) return null
  const cols = Math.min(photos.length, 3)
  return (
    <section aria-labelledby="room-h" className="border-t border-[#1E1E22] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <p className={eyebrow}>/ In the room</p>
        <h2 id="room-h" className={`mb-12 ${h2}`}>Made for real rooms.</h2>
        <div className={`grid grid-cols-2 gap-4 ${cols === 3 ? 'md:grid-cols-3' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          {photos.map((p, i) => (
            <div
              key={p.file}
              className={`relative m-0 aspect-[4/5] overflow-hidden rounded-[28px] border border-[#1E1E22] bg-[#141416] ${
                i === 0 || photos.length === 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <Image
                src={p.file}
                alt={p.alt}
                fill
                sizes={i === 0 ? '(min-width: 768px) 33vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
