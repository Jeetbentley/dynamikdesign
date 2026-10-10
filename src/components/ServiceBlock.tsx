import Link from 'next/link'
import type { ReactNode } from 'react'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'
import ImageSlot from './ImageSlot'

interface Props {
  id?: string
  eyebrow: string
  title: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  imageSlot: string
  reverse?: boolean
  variant?: 'white' | 'light' | 'dark'
  children?: ReactNode
}

export default function ServiceBlock({
  id,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  imageSlot,
  reverse = false,
  variant = 'white',
  children,
}: Props) {
  const bg = variant === 'dark' ? 'bg-bg-dark' : variant === 'light' ? 'bg-bg-light' : 'bg-white'
  const titleColor = variant === 'dark' ? 'text-white' : 'text-text-primary'
  const bodyColor = variant === 'dark' ? 'text-white/70' : 'text-text-body'
  const eyebrowColor = variant === 'dark' ? 'text-white/45' : 'text-text-muted'

  return (
    <section id={id} className={`${bg} scroll-mt-[68px]`}>
      <div className={`grid lg:grid-cols-[3fr_2fr] ${reverse ? 'lg:[direction:rtl]' : ''}`}>
        <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          <ImageSlot slot={imageSlot} sizes="(min-width: 1024px) 60vw, 100vw" tone={variant === 'dark' ? 'dark' : 'light'} />
        </div>
        <div className={`flex items-center px-6 py-16 lg:px-16 lg:py-24 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
          <FadeIn>
            <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
            <h2 className={`heading-h2 mt-5 max-w-md ${titleColor}`}>{title}</h2>
            <p className={`mt-5 max-w-md ${bodyColor}`}>{body}</p>
            {children}
            {ctaLabel && ctaHref && (
              <Link href={ctaHref} className="arrow-link mt-8">
                {ctaLabel}
                <ArrowRight />
              </Link>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
