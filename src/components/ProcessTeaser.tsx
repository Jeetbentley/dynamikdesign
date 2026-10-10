import Link from 'next/link'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'
import { STAGES } from '@/data/approach'

interface Props {
  eyebrow?: string
  title?: string
  ctaLabel?: string
  ctaHref?: string
}

// Numbered stage steps, linking each stage to its section on /approach.
export default function ProcessTeaser({
  eyebrow = 'THE APPROACH',
  title = 'One team. Five stages. No handoffs.',
  ctaLabel = 'See Our Approach',
  ctaHref = '/approach',
}: Props) {
  return (
    <section className="bg-bg-light">
      <div className="container-x py-24 lg:py-32">
        <FadeIn>
          <span className="eyebrow text-text-muted">{eyebrow}</span>
          <h2 className="heading-h2 mt-4 max-w-xl">{title}</h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16">
          {STAGES.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <Link href={`/approach#${s.id}`} className="group relative block">
                <div className="text-[100px] leading-none font-extrabold text-text-muted/15 absolute -top-8 -left-2 select-none" aria-hidden="true">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="text-red text-[13px] font-semibold tracking-[0.12em]">STAGE {s.n}</div>
                  <h3 className="heading-h3 mt-3 group-hover:text-red transition-colors">{s.title}</h3>
                  <p className="mt-3 max-w-md text-text-body text-[15px] leading-[1.65]">{s.summary}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16">
          <Link href={ctaHref} className="arrow-link">
            {ctaLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
