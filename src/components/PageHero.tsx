import type { ReactNode } from 'react'
import ImageSlot from './ImageSlot'

interface Props {
  eyebrow: string
  title: string
  imageSlot?: string
  subtitle?: string
  height?: 'short' | 'tall'
  children?: ReactNode // e.g. buttons under the subtitle
}

export default function PageHero({ eyebrow, title, subtitle, imageSlot, height = 'short', children }: Props) {
  if (imageSlot) {
    const heightClass = height === 'tall' ? 'h-[60vh] min-h-[480px]' : 'h-[50vh] min-h-[380px]'
    return (
      <section className={`relative ${heightClass} bg-bg-dark`}>
        <ImageSlot slot={imageSlot} priority sizes="100vw" tone="dark" className="opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative h-full container-x flex flex-col justify-end pb-12 lg:pb-16">
          <span className="eyebrow text-white/70">{eyebrow}</span>
          <h1 className="heading-h1 text-white mt-4 max-w-3xl">{title}</h1>
          {subtitle && <p className="mt-5 text-white/80 max-w-2xl text-[17px]">{subtitle}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-border">
      <div className="container-x py-20 lg:py-28">
        <span className="eyebrow text-text-muted">{eyebrow}</span>
        <h1 className="heading-h1 mt-4 max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-text-body max-w-2xl text-[17px]">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  )
}
