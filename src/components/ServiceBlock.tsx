import Image from 'next/image'
import Link from 'next/link'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'

interface Props {
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt?: string
  reverse?: boolean
  variant?: 'white' | 'light' | 'dark'
}

export default function ServiceBlock({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  reverse = false,
  variant = 'white',
}: Props) {
  const bg =
    variant === 'dark'
      ? 'bg-bg-dark'
      : variant === 'light'
      ? 'bg-bg-light'
      : 'bg-white'
  const titleColor = variant === 'dark' ? 'text-white' : 'text-text-primary'
  const bodyColor = variant === 'dark' ? 'text-white/70' : 'text-text-body'
  const eyebrowColor = variant === 'dark' ? 'text-white/45' : 'text-text-muted'

  return (
    <section className={bg}>
      <div
        className={`grid lg:grid-cols-[3fr_2fr] ${
          reverse ? 'lg:[direction:rtl]' : ''
        }`}
      >
        <div
          className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] ${
            reverse ? 'lg:[direction:ltr]' : ''
          }`}
        >
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          className={`flex items-center px-6 py-16 lg:px-16 lg:py-24 ${
            reverse ? 'lg:[direction:ltr]' : ''
          }`}
        >
          <FadeIn>
            <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
            <h2 className={`heading-h2 mt-5 max-w-md ${titleColor}`}>{title}</h2>
            <p className={`mt-5 max-w-md ${bodyColor}`}>{body}</p>
            <Link href={ctaHref} className="arrow-link mt-8">
              {ctaLabel}
              <ArrowRight />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
