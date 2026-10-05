import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'

// Self-hosted so builds don't depend on fetching from Google Fonts.
const jakarta = localFont({
  src: '../fonts/PlusJakartaSans-Variable.woff2',
  weight: '200 800',
  variable: '--font-jakarta',
  display: 'swap',
})

const mono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  weight: '100 800',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dynamik Design Lab — Concept to Prototype',
  description:
    'A one-stop concept-to-prototype studio in Pune. Automotive, industrial and phygital products — ideated, designed, engineered and built under one roof.',
  keywords: [
    'concept to prototype',
    'prototyping studio Pune',
    'digital modeling',
    'industrial design',
    'automotive design',
    'product prototyping',
    'embedded systems',
    'phygital products',
  ],
  openGraph: {
    title: 'Dynamik Design Lab — Concept to Prototype',
    description: 'Automotive, industrial and phygital products, ideated, designed, engineered and built under one roof in Pune.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable}`}>
      <body>
        <Navbar />
        <main className="pt-[68px]">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  )
}
