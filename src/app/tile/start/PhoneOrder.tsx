'use client'

import { useEffect, useState, type ReactNode } from 'react'

// Shows the part for the visitor's phone first: iPhone first on iOS, Android first otherwise.
// Both parts are always shown; on desktop (and without JavaScript) they sit side by side, Android first.
export default function PhoneOrder({ android, iphone }: { android: ReactNode; iphone: ReactNode }) {
  const [ios, setIos] = useState(false)
  useEffect(() => {
    const ua = navigator.userAgent
    // iPadOS reports itself as a Mac; touch support tells them apart
    setIos(/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1))
  }, [])
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className={ios ? 'order-2 lg:order-1' : ''}>{android}</div>
      <div className={ios ? 'order-1 lg:order-2' : ''}>{iphone}</div>
    </div>
  )
}
