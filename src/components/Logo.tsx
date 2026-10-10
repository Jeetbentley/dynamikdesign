import Image from 'next/image'
import Link from 'next/link'

// One source file for both variants; the light variant is recoloured to white with CSS,
// so the dark navbar and footer logo always match the default logo exactly in size.
const LOGO = 'https://0tnfcliofmlsl1jg.public.blob.vercel-storage.com/Company_logo_homepage/dynamik.svg'

// Intrinsic aspect ratio of the logo file (viewBox 819 × 96)
const ASPECT_RATIO = 819 / 96

interface LogoProps {
  light?: boolean
  /** Logo height in pixels (default: 20) */
  height?: number
}

export default function Logo({ light = false, height = 20 }: LogoProps) {
  const width = Math.round(height * ASPECT_RATIO)

  return (
    <Link
      href="/"
      aria-label="Dynamik Design Lab home"
      className="inline-block select-none"
    >
      <Image
        src={LOGO}
        alt="Dynamik Design Lab"
        width={width}
        height={height}
        priority
        style={{ height, width: 'auto', filter: light ? 'brightness(0) invert(1)' : undefined }}
      />
    </Link>
  )
}
