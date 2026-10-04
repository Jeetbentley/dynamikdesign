'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials as TESTIMONIALS } from '@/data/testimonials'

export default function Testimonials() {
  const [i, setI] = useState(0)
  if (TESTIMONIALS.length === 0) return null
  const t = TESTIMONIALS[i]
  const next = () => setI((i + 1) % TESTIMONIALS.length)
  const prev = () => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section className="bg-white">
      <div className="container-x py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="text-red text-[88px] leading-none font-serif font-black mb-6 select-none">
            “
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-text-primary text-[22px] lg:text-[26px] leading-[1.5] font-medium">
                {t.quote}
              </p>
              <div className="mt-8">
                <div className="text-text-primary font-semibold text-[15px]">
                  {t.name}
                </div>
                <div className="text-text-muted text-[14px] mt-1">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="text-text-muted hover:text-red transition-colors text-[14px] font-medium tracking-wider uppercase"
            >
              ← Prev
            </button>
            <span className="text-text-muted text-[13px] tabular-nums">
              {String(i + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="text-text-muted hover:text-red transition-colors text-[14px] font-medium tracking-wider uppercase"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
