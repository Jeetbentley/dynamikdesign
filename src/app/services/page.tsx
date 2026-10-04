import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'
import { IndustryCards } from '@/components/Sections'
import { SERVICES, SERVICE_ORDER } from '@/data/services'

export const metadata = {
  title: 'Services — Dynamik Design Lab',
  description: 'Design, engineering and build under one roof — a concept-to-prototype studio in Pune for automotive, industrial and phygital products.',
}

const VALUES = [
  {
    title: 'Concept to prototype, one team',
    body: 'Design, engineering and build under one roof. No handoffs between agencies, no lost context.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 8l10-5 10 5v12l-10 5-10-5V8z" strokeLinejoin="round" />
        <path d="M4 8l10 5 10-5M14 13v12" />
      </svg>
    ),
  },
  {
    title: 'Manufacturing-minded design',
    body: 'Every design is checked against how it will be made, so the prototype is close to production from day one.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" rx="2" />
        <path d="M3 10h22M10 3v22" />
      </svg>
    ),
  },
  {
    title: 'The right process per part',
    body: 'Additive, molding, composites, machining and finishing — chosen for each part, not for one machine.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2v6M14 26v-6M2 14h6M26 14h-6M5.6 5.6l4.2 4.2M22.4 22.4l-4.2-4.2M5.6 22.4l4.2-4.2M22.4 5.6l-4.2 4.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Clear, scoped quotes',
    body: 'Quotes within 24 hours, scoped to your part, finish and stage. The quote is the price.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 7v7l4 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="What We Do"
        subtitle="Design, engineering and build — one team from concept to working prototype."
        imageSlot="services-hero"
        height="tall"
      />

      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICE_ORDER.map((slug, i) => {
              const s = SERVICES[slug]
              return (
                <FadeIn key={slug} delay={i * 0.08}>
                  <Link href={s.href} className="group block">
                    <div className="relative aspect-[5/4] overflow-hidden bg-bg-dark">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                        <ImageSlot slot={s.card.slot} tone="dark" sizes="(min-width: 768px) 50vw, 100vw" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                        <div className="text-white/70 text-[11px] tracking-[0.18em] font-medium mb-3">{s.card.n}</div>
                        <h2 className="text-white text-[28px] lg:text-[32px] font-bold leading-tight">{s.card.title}</h2>
                        <p className="text-white/80 mt-3 text-[15px] max-w-md">{s.card.description}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[3px] bg-red w-0 group-hover:w-full transition-all duration-500" />
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border">
        <IndustryCards id="industries" eyebrow="INDUSTRIES" title="Built for two industries, with phygital on top." />
      </div>

      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">WHY CHOOSE US</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">The advantages of working with Dynamik</h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="text-red mb-5">{v.icon}</div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-body text-[15px] leading-[1.7]">{v.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
