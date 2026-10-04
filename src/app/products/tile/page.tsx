import { Space_Grotesk } from 'next/font/google'
import TileProduct from './TileProduct'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
