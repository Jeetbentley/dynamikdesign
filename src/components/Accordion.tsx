'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export interface AccordionItem {
  q: string
  a: string
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left py-7 group"
              aria-expanded={isOpen}
            >
              <span
                className={`text-[18px] lg:text-[20px] font-medium pr-8 transition-colors ${
                  isOpen ? 'text-red' : 'text-text-primary group-hover:text-red'
                }`}
              >
                {item.q}
              </span>
              <span
                className={`shrink-0 w-7 h-7 flex items-center justify-center text-red transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-12 text-text-body text-[16px] leading-[1.7] max-w-3xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
