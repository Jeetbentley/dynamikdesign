import Link from 'next/link'
import type { ReactNode } from 'react'
import PageHero from './PageHero'
import CtaBanner from './CtaBanner'
import FadeIn from './FadeIn'
import ImageSlot from './ImageSlot'
import WorkCard from './WorkCard'
import ArrowRight from './ArrowRight'
import RelatedReads from './RelatedReads'
import SpecValue from './SpecValue'
import { work } from '@/data/work'
import type { ServicePage } from '@/data/services'

interface Props {
  page: ServicePage
  children?: ReactNode // extra sections after the tag strip (e.g. Fabrication Only)
}

export function SourcingBadge({ sourcing, dark = false }: { sourcing: 'In-house' | 'Partner'; dark?: boolean }) {
  const inHouse = sourcing === 'In-house'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${
        inHouse
          ? 'border-red/30 text-red'
          : dark
            ? 'border-white/20 text-white/60'
            : 'border-border text-text-muted'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${inHouse ? 'bg-red' : dark ? 'bg-white/40' : 'bg-text-muted'}`} aria-hidden="true" />
      {sourcing}
    </span>
  )
}

export default function ServiceDetail({ page, children }: Props) {
  const featured = work.filter((w) => w.tags.includes(page.workTag)).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} imageSlot={page.heroSlot} height="tall" />

      {/* Intro */}
      <section className="bg-white">
        <div className="container-text py-24 lg:py-28">
          <FadeIn>
            {page.intro.map((p, i) => (
              <p key={i} className={`text-text-body text-[18px] leading-[1.75] ${i > 0 ? 'mt-6' : ''}`}>
                {p}
              </p>
            ))}

            <div className="mt-12">
              <h2 className="text-[16px] tracking-[0.12em] uppercase font-semibold text-text-primary mb-5">Why Us</h2>
              <ul className="space-y-3">
                {page.whyUs.map((w) => (
                  <li key={w} className="text-text-body text-[16px] flex gap-3 leading-[1.6]">
                    <span className="text-red shrink-0" aria-hidden="true">—</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">CAPABILITIES</span>
            <h2 className="heading-h2 mt-4 max-w-xl">{page.capabilitiesTitle}</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-12">
              {page.capabilities.map((c, i) => (
                <div key={c.n} id={c.id} className="scroll-mt-28">
                  {c.extraAnchors?.map((a) => <span key={a} id={a} className="block scroll-mt-28" aria-hidden="true" />)}
                  <FadeIn delay={i * 0.05}>
                    <div className="flex gap-6 items-start">
                      <div className="text-red text-[20px] font-bold tabular-nums tracking-tight pt-1">{c.n}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-[20px] font-semibold text-text-primary">{c.title}</h3>
                          {c.sourcing && <SourcingBadge sourcing={c.sourcing} />}
                        </div>
                        <p className="mt-2 text-text-body">{c.body}</p>
                        {c.points && (
                          <ul className="mt-4 space-y-1.5">
                            {c.points.map((pt) => (
                              <li key={pt} className="flex gap-3 text-[15px] text-text-body">
                                <span className="text-red" aria-hidden="true">—</span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                        {c.deliverables && (
                          <p className="mt-4 text-[15px] text-text-body">
                            <span className="font-semibold text-text-primary">Deliverables: </span>
                            {c.deliverables}
                          </p>
                        )}
                        {c.link && (
                          <Link href={c.link.href} className="arrow-link mt-4">
                            {c.link.label}
                            <ArrowRight />
                          </Link>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden lg:sticky lg:top-28">
              <ImageSlot slot={page.capabilitySlot} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">TECHNICAL DETAILS</span>
            <h2 className="heading-h2 mt-4">{page.specsTitle}</h2>
          </FadeIn>
          <dl className="mt-12 max-w-3xl">
            {page.specs.map((row) => (
              <div key={row.param} className="grid grid-cols-[140px_1fr] sm:grid-cols-[220px_1fr] gap-6 py-5 border-b border-border">
                <dt className="text-text-muted text-[13px] uppercase tracking-[0.1em] font-medium">{row.param}</dt>
                <dd className="text-text-primary text-[16px]">
                  <SpecValue value={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Capability tag strip */}
      <section className="bg-bg-light">
        <div className="container-x py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <span className="eyebrow text-text-muted shrink-0">{page.tagsLabel}</span>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {page.tags.map((t) => (
                <span key={t} className="shrink-0 px-5 py-2.5 rounded-full bg-white border border-border text-[14px] font-medium text-text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {children}

      {/* Featured work */}
      {featured.length > 0 && (
        <section className="bg-white">
          <div className="container-x py-24 lg:py-32">
            <FadeIn className="mb-14 flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow text-text-muted">SELECTED WORK</span>
                <h2 className="heading-h2 mt-4">Recent {page.title.toLowerCase()} work</h2>
              </div>
              <Link href="/work" className="arrow-link hidden sm:inline-flex">
                See all <ArrowRight />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {featured.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.06}>
                  <WorkCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedReads context={page.slug} />
      <CtaBanner />
    </>
  )
}
