import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import TileProduct from './TileProduct'
import { TILE_CONTEXT_PHOTOS } from '@/data/tile'
import type { RoomPhoto } from './TileRoom'
import { inr, tileLaunch } from '@/data/tile-launch'

const grotesk = localFont({
  src: '../../../fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-grotesk',
  display: 'swap',
})

const title = 'Tile — a 64-pixel desk clock, lamp and canvas | Dynamik Design Lab'
const description = `Tile is a 64-pixel desk clock, lamp and pixel-art canvas. No account, no cloud. Made in India. Founders batch of ${tileLaunch.foundersBatchSize} at ${inr(tileLaunch.foundersPrice)}.`
const ogImage = { url: '/products/tile/tile-og.jpg', width: 1200, height: 630, alt: 'Tile, a 64-pixel desk clock, lamp and canvas by Dynamik Design Lab' }

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Tile', 'pixel clock', 'desk clock', 'LED desk lamp', 'pixel art display', 'smart desk display', 'made in India'],
  alternates: { canonical: '/products/tile' },
  openGraph: { title, description, url: '/products/tile', type: 'website', images: [ogImage] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
}

export default function TilePage() {
  // Checked at build time: each context photo appears once its file is added to /public. Blue-chin photos first.
  const photos: RoomPhoto[] = TILE_CONTEXT_PHOTOS.filter((p) => fs.existsSync(path.join(process.cwd(), 'public', p.file)))
    .sort((a, b) => Number(a.chin !== 'blue') - Number(b.chin !== 'blue'))
    .map(({ file, caption, alt }) => ({ file, caption, alt }))
  return (
    <div className={grotesk.variable}>
      <TileProduct photos={photos} />
    </div>
  )
}
