import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { getImage } from '@/data/images'

interface Props {
  slot?: string // key in src/data/images.ts
  src?: string // direct /public path, e.g. a work cover
  alt?: string
  sizes?: string
  priority?: boolean
  tone?: 'light' | 'dark'
  className?: string
}

// Checked at build time, so dropping a file into /public is enough to replace the placeholder.
const existsInPublic = (file: string) => fs.existsSync(path.join(process.cwd(), 'public', file))

// Fills its nearest positioned parent. Renders the local image when present, otherwise a themed placeholder.
export default function ImageSlot({
  slot,
  src,
  alt,
  sizes = '100vw',
  priority = false,
  tone = 'light',
  className = '',
}: Props) {
  const entry = slot ? getImage(slot) : undefined
  const file = src ?? entry?.file
  const altText = alt ?? entry?.alt ?? ''

  if (file && existsInPublic(file)) {
    return (
      <Image
        src={file}
        alt={altText}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    )
  }

  const dark = tone === 'dark'
  return (
    <div
      role="img"
      aria-label={altText || 'Image coming soon'}
      className={`absolute inset-0 flex items-start justify-end ${dark ? 'bg-[#232323]' : 'bg-[#ECECEC]'} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${
          dark ? 'rgba(255,255,255,0.035)' : 'rgba(26,26,26,0.035)'
        } 0 1px, transparent 1px 14px)`,
      }}
    >
      <div className="flex items-center gap-2 p-5">
        <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
        <span className={`text-[11px] font-medium uppercase tracking-[0.15em] ${dark ? 'text-white/40' : 'text-text-muted'}`}>
          Image coming soon
        </span>
      </div>
    </div>
  )
}
