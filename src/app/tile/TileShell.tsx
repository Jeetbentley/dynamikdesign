import type { ReactNode } from 'react'
import localFont from 'next/font/local'

// Same type and dark surface as the Tile product page, for the support pages under /tile and /w.
const grotesk = localFont({
  src: '../../fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-grotesk',
  display: 'swap',
})

export default function TileShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${grotesk.variable} font-grotesk min-h-screen bg-[#0B0B0C] text-[#EDEDEF] [&_a:hover]:text-[#F0641E]`}>
      {children}
    </div>
  )
}

// A full-width orange button and a quiet outline button, as on the Tile page.
export const pillOrange =
  'inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#F0641E] px-8 text-[14px] font-semibold uppercase tracking-[0.1em] !text-[#0B0B0C] hover:!text-[#0B0B0C]'
export const pillOutline =
  'inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#34343A] px-8 text-[14px] font-semibold uppercase tracking-[0.1em] text-[#EDEDEF] hover:border-[#EDEDEF]'
