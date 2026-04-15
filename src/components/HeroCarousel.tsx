'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Slide {
  title: string
  client: string
  href: string
  image: string
}

const SLIDES: Slide[] = [
  {
    title: 'Built for precision',
    client: 'EV ENCLOSURE PROTOTYPE',
    href: '/work/ev-battery-enclosure',
    image: 'https://picsum.photos/seed/hero-ev/2400/1400',
  },
  {
    title: 'Surgical detail',
    client: 'MEDICAL DEVICE HOUSING',
    href: '/work/medical-device-housing',
    image: 'https://picsum.photos/seed/hero-medical/2400/1400',
  },
  {
    title: 'Hardware that works',
    client: 'CONSUMER IOT HUB',
    href: '/work/consumer-iot-hub',
    image: 'https://picsum.photos/seed/hero-iot/2400/1400',
  },
  {
    title: 'Concepts, in hand',
    client: 'ARCHITECTURAL SCALE MODEL',
    href: '/work/architectural-scale-model',
    image: 'https://picsum.photos/seed/hero-arch/2400/1400',
  },
  {
    title: 'Soft on the skin',
    client: 'WEARABLE PROTOTYPE',
    href: '/work/wearable-prototype',
    image: 'https://picsum.photos/seed/hero-wear/2400/1400',
  },
]

const DURATION = 6000

export default function HeroCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setI((x) => (x + 1) % SLIDES.length), DURATION)
    return () => clearTimeout(id)
  }, [i, paused])

  const slide = SLIDES[i]

  return (
    <section
      className="relative w-full h-[calc(100vh-68px)] min-h-[560px] overflow-hidden bg-bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full container-x flex flex-col justify-end pb-16 lg:pb-24">
        <Link href={slide.href} className="block group max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="text-white/80 text-[11px] font-medium tracking-[0.18em] uppercase mb-5">
                {slide.client}
              </div>
              <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[78px] max-w-4xl">
                {slide.title}
              </h1>
              <div className="mt-6 inline-flex items-center gap-2 text-white text-[13px] font-medium tracking-wider uppercase border-b border-white/40 pb-1 group-hover:border-red group-hover:text-red transition-colors">
                View Project
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <path
                    d="M1 6H13M13 6L8 1M13 6L8 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>
      </div>

      {/* Slide progress indicator */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container-x flex items-center gap-4 pb-6">
          <div className="text-white/70 text-[12px] tabular-nums tracking-wider">
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex-1 flex gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className="h-[2px] flex-1 bg-white/20 relative overflow-hidden"
              >
                {idx === i && !paused && (
                  <motion.div
                    key={`prog-${i}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: DURATION / 1000, ease: 'linear' }}
                    className="absolute inset-y-0 left-0 bg-red"
                  />
                )}
                {idx < i && <div className="absolute inset-0 bg-white/50" />}
              </button>
            ))}
          </div>
          <div className="text-white/70 text-[12px] tabular-nums tracking-wider">
            {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  )
}
