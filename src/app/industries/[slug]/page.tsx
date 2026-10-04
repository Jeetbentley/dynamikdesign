import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ArrowRight from '@/components/ArrowRight'
import RelatedReads from '@/components/RelatedReads'
import { PhygitalStrip, PrototypeTypes, SelectedWork } from '@/components/Sections'
import { INDUSTRIES, getIndustry } from '@/data/industries'

export const dynamicParams = false

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const ind = getIndustry(params.slug)
  return ind ? { title: `${ind.name} — Dynamik Design Lab`, description: ind.metaDescription } : {}
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = getIndustry(params.slug)
  if (!ind) notFound()

  return (
    <>
      <PageHero eyebrow={`INDUSTRIES — ${ind.name.toUpperCase()}`} title={ind.headline} subtitle={ind.subline} imageSlot={ind.heroSlot} height="tall">
        <Link href="/contact" className="btn-red">
          Start a Project
        </Link>
      </PageHero>

      {/* What we do */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">WHAT WE DO</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">What we do for {ind.shortName.toLowerCase()} clients</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
            {ind.capabilities.map((c, i) => (
              <FadeIn key={c.title} delay={(i % 3) * 0.06}>
                <div className="border-t border-border py-7">
                  <div className="text-red text-[13px] font-semibold tracking-[0.12em]">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-3 text-[19px] font-semibold text-text-primary">{c.title}</h3>
                  <p className="mt-2 text-[15px] text-text-body leading-[1.65]">{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PrototypeTypes items={ind.prototypes} title={`Prototypes for ${ind.shortName.toLowerCase()} products`} />

      {/* Relevant services */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">RELEVANT SERVICES</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">Where we usually help</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ind.services.map((s, i) => (
              <FadeIn key={s.href} delay={i * 0.05}>
                <Link href={s.href} className="group flex h-full flex-col border border-border p-6 transition-colors hover:border-red">
                  <h3 className="text-[17px] font-semibold text-text-primary group-hover:text-red transition-colors">{s.title}</h3>
                  <p className="mt-2 text-[14px] text-text-body leading-[1.6]">{s.body}</p>
                  <span className="arrow-link mt-auto pt-5 text-[13px]">
                    Learn more <ArrowRight />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PhygitalStrip body={ind.phygital.body} points={ind.phygital.points} slot={ind.phygital.slot} />

      <SelectedWork industry={ind.industry} />

      <RelatedReads />

      <CtaBanner title={`Building something for ${ind.shortName.toLowerCase()}?`} ctaLabel="Start a Project" />
    </>
  )
}
