import Image from 'next/image'
import Link from 'next/link'

// Paste your Vercel Blob URLs here:
const LOGO_DARK = 'https://0tnfcliofmlsl1jg.public.blob.vercel-storage.com/Company_logo_homepage/dynamik.svg'
const LOGO_LIGHT = 'https://0tnfcliofmlsl1jg.public.blob.vercel-storage.com/Company_logo_homepage/dynamik_white.svg'

// Intrinsic aspect ratio of your logo file (width / height)
const ASPECT_RATIO = 5 // 160 / 32

// The white SVG has more empty space around the wordmark, so it renders smaller
// at the same height. Raise or lower this until both wordmarks look the same size.
const LIGHT_SCALE = 1.4

interface LogoProps {
  light?: boolean
  /** Logo height in pixels (default: 20) */
  height?: number
}

export default function Logo({ light = false, height: baseHeight = 20 }: LogoProps) {
  const height = Math.round(baseHeight * (light ? LIGHT_SCALE : 1))
  const width = Math.round(height * ASPECT_RATIO)

  return (
    <Link
      href="/"
      aria-label="Dynamik Design Lab home"
      className="inline-block select-none"
    >
      <Image
        src={light ? LOGO_LIGHT : LOGO_DARK}
        alt="Dynamik Design Lab"
        width={width}
        height={height}
        priority
        style={{ height, width: 'auto' }}
      />
    </Link>
  )
}
