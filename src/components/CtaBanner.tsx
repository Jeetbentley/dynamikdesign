import Link from 'next/link'
import FadeIn from './FadeIn'

interface Props {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function CtaBanner({
  title = 'Ready to build your next prototype?',
  subtitle = 'Upload your file or describe your project. Quote within 24 hours.',
  ctaLabel = 'Get in Touch',
  ctaHref = '/contact',
}: Props) {
  return (
    <section className="bg-red text-white">
      <div className="container-x py-20 lg:py-28">
        <FadeIn className="grid lg:grid-cols-[1.4fr_auto] items-center gap-8">
          <div>
            <h2 className="heading-h2 text-white max-w-3xl">{title}</h2>
            <p className="mt-4 text-white/80 text-[17px] max-w-2xl">{subtitle}</p>
          </div>
          <div>
            <Link href={ctaHref} className="btn-outline">
              {ctaLabel}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
