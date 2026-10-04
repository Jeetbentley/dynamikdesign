import Link from 'next/link'
import { notFound } from 'next/navigation'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'
import WorkCard from '@/components/WorkCard'
import ArrowRight from '@/components/ArrowRight'
import { INDUSTRY_LABEL, TAG_LABEL, getWork, work } from '@/data/work'

export const dynamicParams = false

export function generateStaticParams() {
  return work.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getWork(params.slug)
  if (!p) return {}
  return {
    title: `${p.placeholder ? 'Case study coming soon' : p.title} — Dynamik Design Lab`,
    description: p.placeholder ? 'Case study coming soon.' : p.summary,
  }
}

function NdaBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-text-primary">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
      Process shown, client confidential
    </span>
  )
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getWork(params.slug)
  if (!p) notFound()

  const related = work
    .filter((w) => w.slug !== p.slug)
    .sort((a, b) => Number(b.industry === p.industry) - Number(a.industry === p.industry))
    .slice(0, 3)

  const meta = (
    <section className="bg-white border-b-2 border-red">
      <div className="container-x py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[24px] lg:text-[28px] font-bold text-text-primary">{p.title}</h1>
          <p className="text-text-muted text-[14px] mt-1">{p.client}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {p.nda && <NdaBadge />}
          <span className="tag">{INDUSTRY_LABEL[p.industry]}</span>
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {TAG_LABEL[t]}
            </span>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <>
      {p.placeholder ? (
        <>
          <section
            className="bg-[#ECECEC]"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(26,26,26,0.035) 0 1px, transparent 1px 14px)' }}
          >
            <div className="container-x min-h-[52vh] flex flex-col items-center justify-center text-center py-24">
              <span className="h-2.5 w-2.5 rounded-full bg-red" aria-hidden="true" />
              <span className="eyebrow mt-5 text-text-primary">Case study coming soon</span>
              <p className="mt-5 max-w-lg text-text-body">
                We&apos;re preparing this case study. In the meantime, we can walk you through our process and similar work on a call.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-red">
                  Start a Project
                </Link>
                <Link href="/work" className="btn-ghost">
                  All Work
                </Link>
              </div>
            </div>
          </section>
          {meta}
        </>
      ) : (
        <>
          <section className="relative w-full h-[70vh] min-h-[480px] bg-bg-dark">
            <ImageSlot src={p.coverImage} alt={p.title} tone="dark" priority sizes="100vw" />
          </section>
          {meta}

          <section className="bg-white">
            <div className="container-x py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">
              <FadeIn>
                <span className="eyebrow text-text-muted">OVERVIEW</span>
                <p className="mt-6 text-text-primary text-[22px] leading-[1.55] font-medium">{p.summary}</p>
                <div className="mt-12 space-y-10">
                  {[
                    ['Challenge', p.challenge],
                    ['Approach', p.approach],
                    ['Outcome', p.outcome],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <h2 className="text-[13px] uppercase tracking-[0.15em] font-semibold text-red">{k}</h2>
                      <p className="mt-3 text-text-body text-[17px] leading-[1.75]">{v}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="bg-bg-dark text-white p-8 lg:p-10">
                  <span className="text-[11px] tracking-[0.18em] font-medium uppercase text-white/50">Project</span>
                  <dl className="mt-6 space-y-5">
                    {[
                      ['Client', p.client],
                      ['Industry', INDUSTRY_LABEL[p.industry]],
                      ['Scope', p.tags.map((t) => TAG_LABEL[t]).join(', ')],
                    ].map(([k, v]) => (
                      <div key={k} className="border-b border-white/10 pb-4">
                        <dt className="text-white/45 text-[11px] tracking-[0.15em] uppercase font-medium">{k}</dt>
                        <dd className="text-white text-[16px] mt-1.5">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </FadeIn>
            </div>
          </section>

          {p.gallery.length > 0 && (
            <section className="bg-white">
              <div className="container-x pb-24 lg:pb-32 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {p.gallery.map((g, i) => (
                  <FadeIn key={g.src} delay={(i % 4) * 0.06} className={i === 0 ? 'md:col-span-2' : ''}>
                    <div className={`relative overflow-hidden bg-bg-light ${i === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                      <ImageSlot src={g.src} alt={g.caption} sizes="(min-width: 768px) 50vw, 100vw" />
                    </div>
                    <p className="mt-3 text-[13px] text-text-muted">{g.caption}</p>
                  </FadeIn>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-text-muted">RELATED</span>
              <h2 className="heading-h2 mt-4">More projects</h2>
            </div>
            <Link href="/work" className="arrow-link hidden sm:inline-flex">
              See all <ArrowRight />
            </Link>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {related.map((rp, i) => (
              <FadeIn key={rp.slug} delay={i * 0.06}>
                <WorkCard project={rp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
