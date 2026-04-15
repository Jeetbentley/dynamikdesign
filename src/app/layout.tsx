import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dynamik Design Lab — Design in Motion',
  description:
    'Pune-based rapid prototyping and product design studio. FDM and SLA 3D printing, embedded systems, and industrial design — under one roof.',
  keywords: [
    '3D printing Pune',
    'rapid prototyping India',
    'FDM printing',
    'SLA printing',
    'product design studio',
    'embedded systems',
    'industrial design',
  ],
  openGraph: {
    title: 'Dynamik Design Lab — Design in Motion',
    description:
      'Rapid prototyping and product design studio in Pune. From idea to functional prototype.',
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
