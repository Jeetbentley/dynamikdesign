'use client'

import { useState } from 'react'
import { site } from '@/config/site'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppFab() {
  const [hover, setHover] = useState(false)

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-[0_10px_30px_-8px_rgba(26,26,26,0.45)] hover:scale-105 transition-transform"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <WhatsAppIcon size={56} />
      <span
        className={`absolute right-full mr-3 whitespace-nowrap bg-text-primary text-white text-[13px] px-3 py-2 rounded-md transition-opacity ${
          hover ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        Chat with us on WhatsApp
      </span>
    </a>
  )
}
