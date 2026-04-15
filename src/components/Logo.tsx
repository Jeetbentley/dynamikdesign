import Image from 'next/image'
import Link from 'next/link'

// Paste your Vercel Blob URLs here:
const LOGO_DARK = 'https://YOUR-BLOB-URL.public.blob.vercel-storage.com/logo.svg'
const LOGO_LIGHT = 'https://YOUR-BLOB-URL.public.blob.vercel-storage.com/logo-white.svg'

// Intrinsic aspect ratio of your logo file (adjust if different)
const LOGO_WIDTH = 160
const LOGO_HEIGHT = 32

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Dynamik Design Lab home"
      className="inline-block select-none"
    >
      <Image
        src={light ? LOGO_LIGHT : LOGO_DARK}
        alt="Dynamik Design Lab"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="h-7 w-auto"
      />
    </Link>
  )
}
