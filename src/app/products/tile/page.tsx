import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import TileProduct from './TileProduct'
import { TILE_PHOTO } from '@/data/tile'
import { inr, tileLaunch } from '@/data/tile-launch'

const grotesk = localFont({
  src: '../../../fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-grotesk',
  display: 'swap',
})

const title = 'Tile — a 64-pixel desk clock, lamp and canvas | Dynamik Design Lab'
const description = `Tile is a 64-pixel desk clock, lamp and pixel-art canvas. No account, no cloud. Made in Pune. Founders batch of ${tileLaunch.foundersBatchSize} at ${inr(tileLaunch.foundersPrice)}.`
const ogImage = { url: '/products/tile/tile-og.jpg', width: 1200, height: 630, alt: 'Tile, a 64-pixel desk clock, lamp and canvas by Dynamik Design Lab' }

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/products/tile' },
  openGraph: { title, description, url: '/products/tile', type: 'website', images: [ogImage] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
}

export default function TilePage() {
  // Checked at build time: the photo block appears once the file is added to /public.
  const hasPhoto = fs.existsSync(path.join(process.cwd(), 'public', TILE_PHOTO.file))
  return (
    <div className={grotesk.variable}>
      <TileProduct photo={hasPhoto ? { src: TILE_PHOTO.file, alt: TILE_PHOTO.alt } : undefined} />
    </div>
  )
}
