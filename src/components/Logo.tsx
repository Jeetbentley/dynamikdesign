import Image from 'next/image'
import Link from 'next/link'

// Paste your Vercel Blob URLs here:
const LOGO_DARK = 'https://0tnfcliofmlsl1jg.public.blob.vercel-storage.com/Company_logo_homepage/dynamik.svg'
const LOGO_LIGHT = 'https://0tnfcliofmlsl1jg.public.blob.vercel-storage.com/Company_logo_homepage/dynamik.svg'

// Intrinsic aspect ratio of your logo file (width / height)
const ASPECT_RATIO = 5 // 160 / 32

interface LogoProps {
  light?: boolean
  /** Logo height in pixels (default: 28) */
  height?: number
}

export default function Logo({ light = false, height = 28 }: LogoProps) {
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
