import Link from 'next/link'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'
import ImageSlot from './ImageSlot'
import WorkCard from './WorkCard'
import WorkGrid from './WorkGrid'
import { SourcingBadge } from './ServiceDetail'
import { ENGAGEMENTS, ENTRY_POINTS } from '@/data/approach'
import { BUILD_PROCESSES } from '@/data/services'
import { INDUSTRIES } from '@/data/industries'
import { work, workFilterKeys, type Industry } from '@/data/work'

function Heading({ eyebrow, title, light = false, children }: { eyebrow: string; title: string; light?: boolean; children?: React.ReactNode }) {
  return (
    <FadeIn>
      <span className={`eyebrow ${light ? 'text-white/45' : 'text-text-muted'}`}>{eyebrow}</span>
      <h2 className={`heading-h2 mt-4 max-w-2xl ${light ? '!text-white' : ''}`}>{title}</h2>
      {children}
    </FadeIn>
  )
}

export function StartAnywhere({ bg = 'white' }: { bg?: 'white' | 'light' }) {
  return (
    <section className={bg === 'light' ? 'bg-bg-light' : 'bg-white'}>
      <div className="container-x py-24 lg:py-32">
        <Heading eyebrow="START ANYWHERE" title="Enter at any stage. Leave with a working prototype." />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENTRY_POINTS.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.06}>
              <Link
                href={`/approach#${p.stage}`}
                className="group flex h-full flex-col border border-border p-7 transition-colors hover:border-red"
              >
                <span className="text-red text-[13px] font-semibold tracking-[0.12em]">0{i + 1}</span>
                <h3 className="mt-4 text-[22px] font-semibold text-text-primary group-hover:text-red transition-colors">
                  “{p.label}”
                </h3>
                <p className="mt-3 text-[15px] text-text-body leading-[1.65]">{p.body}</p>
                <span className="arrow-link mt-auto pt-6">
                  Start here <ArrowRight />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const DEFAULT_PROTOTYPES = [
  { type: 'Looks-like', examples: 'Appearance models that show exactly how the product will look and feel — for reviews, investors and photography.' },
  { type: 'Works-like', examples: 'Functional prototypes that prove the mechanism, electronics and interaction before appearance is final.' },
  { type: 'Looks-like + Works-like', examples: 'Presentable, working prototypes that combine both — ready for user testing and design sign-off.' },
]

export function PrototypeTypes({
  items = DEFAULT_PROTOTYPES,
  title = 'The right prototype for the question you need answered.',
  bg = 'light',
}: {
  items?: { type: string; examples: string }[]
  title?: string
  bg?: 'white' | 'light'
}) {
  return (
    <section className={bg === 'light' ? 'bg-bg-light' : 'bg-white'}>
      <div className="container-x py-24 lg:py-32">
        <Heading eyebrow="PROTOTYPE TYPES" title={title} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {items.map((p, i) => (
            <FadeIn key={p.type} delay={i * 0.06} className={bg === 'light' ? 'bg-bg-light' : 'bg-white'}>
              <div className="p-8 lg:p-10 h-full">
                <div className="text-[64px] leading-none font-extrabold text-text-muted/15 select-none" aria-hidden="true">
                  0{i + 1}
                </div>
                <h3 className="heading-h3 mt-4">{p.type}</h3>
                <p className="mt-3 text-text-body text-[15px] leading-[1.7]">{p.examples}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PhygitalStrip({
  body = 'Phygital means physical products with a digital or intelligent layer — sensors, connectivity, displays and touch, voice, companion apps and dashboards. It works with any product we design and build.',
  points = ['Sensors', 'Wi-Fi / BLE / cellular', 'Displays & touch', 'Voice interaction', 'Apps & dashboards'],
  slot,
  read,
}: {
  body?: string
  points?: string[]
  slot?: string
  read?: { label: string; href: string } // optional related blog post
}) {
  return (
    <section className="bg-bg-dark text-white">
      <div className={`container-x py-20 lg:py-24 grid gap-12 items-center ${slot ? 'lg:grid-cols-[3fr_2fr]' : ''}`}>
        <FadeIn>
          <span className="eyebrow text-white/45">THE PHYGITAL LAYER</span>
          <h2 className="heading-h2 mt-4 max-w-2xl !text-white">Add intelligence to any product, or leave it out.</h2>
          <p className="mt-5 max-w-2xl text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {points.map((p) => (
              <span key={p} className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/80">
                {p}
              </span>
            ))}
          </div>
          <Link href="/services/engineering#phygital" className="arrow-link mt-8">
            Phygital — embedded, firmware & interfaces <ArrowRight />
          </Link>
          {read && (
            <Link href={read.href} className="mt-4 flex w-fit items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors">
              {read.label} <ArrowRight />
            </Link>
          )}
        </FadeIn>
        {slot && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageSlot slot={slot} tone="dark" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  )
}

export function BuildToolkit() {
  return (
    <section className="bg-white">
      <div className="container-x py-24 lg:py-32">
        <Heading eyebrow="BUILD TOOLKIT" title="The right process for every part.">
          <p className="mt-5 max-w-2xl text-text-body">
            In-house where speed matters, trusted partners where scale does. One point of contact either way.
          </p>
        </Heading>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
          {BUILD_PROCESSES.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 3) * 0.06}>
              <Link
                href={p.id === 'electronics' ? '/services/embedded' : `/services/build#${p.id}`}
                className="group block border-t border-border py-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[19px] font-semibold text-text-primary group-hover:text-red transition-colors">{p.title}</h3>
                  <SourcingBadge sourcing={p.sourcing} />
                </div>
                <p className="mt-3 text-[15px] text-text-body leading-[1.65]">{p.body}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <Link href="/services/build" className="arrow-link mt-10">
          Explore Build <ArrowRight />
        </Link>
      </div>
    </section>
  )
}

export function WaysToEngage({ bg = 'light' }: { bg?: 'white' | 'light' }) {
  return (
    <section id="engage" className={`scroll-mt-28 ${bg === 'light' ? 'bg-bg-light' : 'bg-white'}`}>
      <div className="container-x py-24 lg:py-32">
        <Heading eyebrow="WAYS TO ENGAGE" title="Pick the engagement that fits where you are." />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGAGEMENTS.map((e, i) => (
            <FadeIn key={e.slug} delay={i * 0.06}>
              <Link
                href={`/contact?service=${e.slug}`}
                className={`group flex h-full flex-col p-7 border border-transparent transition-colors hover:border-red ${
                  bg === 'light' ? 'bg-white' : 'bg-bg-light'
                }`}
              >
                <h3 className="text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">{e.title}</h3>
                <p className="mt-3 text-[15px] text-text-body leading-[1.65]">{e.body}</p>
                <span className="arrow-link mt-auto pt-6">
                  Enquire <ArrowRight />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const HOME_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'automotive', label: 'Automotive' },
  { key: 'industrial-interior', label: 'Industrial & Interior' },
  { key: 'phygital', label: 'Phygital' },
]

export function SelectedWork({ industry, bg = 'white' }: { industry?: Industry; bg?: 'white' | 'light' }) {
  const projects = (industry ? work.filter((w) => w.industry === industry) : work.filter((w) => w.featured)).slice(0, 6)
  if (projects.length === 0) return null

  return (
    <section className={bg === 'light' ? 'bg-bg-light' : 'bg-white'}>
      <div className="container-x py-24 lg:py-32">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <Heading eyebrow="SELECTED WORK" title={industry ? 'Selected work in this industry' : 'Selected work'} />
          <Link href="/work" className="arrow-link shrink-0">
            See All Work <ArrowRight />
          </Link>
        </div>
        {industry ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {projects.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <WorkCard project={p} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <WorkGrid
            filters={HOME_FILTERS}
            items={projects.map((p) => ({ key: p.slug, filters: workFilterKeys(p), node: <WorkCard project={p} /> }))}
          />
        )}
      </div>
    </section>
  )
}

export function IndustryCards({ id, eyebrow = 'WHAT WE WORK ON', title = 'Two industries. One studio.' }: { id?: string; eyebrow?: string; title?: string }) {
  return (
    <section id={id} className="bg-white scroll-mt-20">
      <div className="container-x py-24 lg:py-32">
        <Heading eyebrow={eyebrow} title={title} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind, i) => (
            <FadeIn key={ind.slug} delay={i * 0.08}>
              <Link href={ind.href} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-bg-dark">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                    <ImageSlot slot={ind.cardSlot} tone="dark" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <div className="text-white/70 text-[11px] tracking-[0.18em] font-medium mb-3">0{i + 1}</div>
                    <h3 className="text-white text-[28px] lg:text-[32px] font-bold leading-tight">{ind.name}</h3>
                    <p className="text-white/80 mt-3 text-[15px] max-w-md">{ind.cardBody}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] bg-red w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
