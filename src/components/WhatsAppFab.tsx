'use client'

import { useState } from 'react'

export default function WhatsAppFab() {
  const [hover, setHover] = useState(false)

  return (
    <a
      href="https://wa.me/910000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.2-.8.9-1 1.1-.4.2-.6.1c-.9-.4-1.7-.9-2.4-1.6-.6-.6-1.1-1.3-1.5-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.7-1.6-.9-2.2-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.9.9-1.4 2.2-1.3 3.5.2 1.5.7 2.9 1.6 4.1 1.7 2.3 4 4.1 6.6 5 .7.3 1.2.4 1.6.5.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.4.2-.9.1-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.1 4.6 1.2 5.5 0 10-4.5 10-10 0-2.7-1-5.2-2.9-7.1S14.7 2 12 2zm0 18.2c-1.4 0-2.9-.4-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-3.9-1.1-9.1 2.9-11.5s9.1-1.1 11.5 2.9 1.1 9.1-2.9 11.5c-1.3.8-2.8 1.2-4.3 1.2z" />
      </svg>
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
