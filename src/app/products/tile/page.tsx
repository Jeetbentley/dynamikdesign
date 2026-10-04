import localFont from 'next/font/local'
import TileProduct from './TileProduct'

const grotesk = localFont({
  src: '../../../fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata = {
  title: 'Tile — Your desk, in 64 pixels | Dynamik Design Lab',
  description:
    'Tile is a 64-pixel desk clock, lamp and pixel-art canvas from Dynamik Design Lab. No account, no cloud. Made in Pune.',
}

export default function TilePage() {
  return (
    <div className={grotesk.variable}>
      <TileProduct />
    </div>
  )
}
