import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug, getRelatedProjects } from '@/data/projects'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ProjectCard from '@/components/ProjectCard'
import ArrowRight from '@/components/ArrowRight'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug)
  if (!p) return { title: 'Project — Dynamik Design Lab' }
  return {
    title: `${p.title} — Dynamik Design Lab`,
    description: p.overview[0],
  }
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug)
  if (!p) notFound()

  const related = getRelatedProjects(p.slug, 3)

  return (
    <>
      {/* Hero — full image, no text overlay */}
      <section className="relative w-full h-[70vh] min-h-[480px] bg-bg-dark">
        <Image
          src={p.hero}
          alt={p.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Project meta */}
      <section className="bg-white border-b-2 border-red">
        <div className="container-x py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-[24px] lg:text-[28px] font-bold text-text-primary">
                {p.title}
              </h1>
              <p className="text-text-muted text-[14px] mt-1">{p.client}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-text-muted uppercase tracking-[0.1em] font-medium">
              <span>{p.category.join(' · ')}</span>
              <span className="hidden sm:inline">·</span>
              <span>{p.material}</span>
              <span className="hidden sm:inline">·</span>
              <span>{p.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">
            <FadeIn>
              <span className="eyebrow text-text-muted">OVERVIEW</span>
              <h2 className="heading-h2 mt-4 mb-8">{p.heroHeadline}</h2>
              <div className="space-y-5 text-text-body text-[17px] leading-[1.75]">
                {p.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-bg-dark text-white p-8 lg:p-10">
                <span className="text-[11px] tracking-[0.18em] font-medium uppercase text-white/50">
                  Project Specs
                </span>
                <div className="mt-6 space-y-5">
                  {[
                    ['Technology', p.technology],
                    ['Material', p.material],
                    p.buildVolume ? ['Build Volume', p.buildVolume] : null,
                    ['Finish', p.finish],
                    ['Turnaround', p.turnaround],
                    ['Industry', p.industry],
                  ]
                    .filter(Boolean)
                    .map((row) => {
                      const [k, v] = row as [string, string]
                      return (
                        <div key={k} className="border-b border-white/10 pb-4">
                          <div className="text-white/45 text-[11px] tracking-[0.15em] uppercase font-medium">
                            {k}
                          </div>
                          <div className="text-white text-[16px] mt-1.5">{v}</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process Gallery */}
      <section className="bg-white">
        <div className="container-x pb-24 lg:pb-32">
          <FadeIn className="mb-12">
            <span className="eyebrow text-text-muted">PROCESS</span>
            <h2 className="heading-h2 mt-4">From sketch to delivery</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {p.gallery.map((g, i) => (
              <FadeIn key={i} delay={(i % 4) * 0.06}>
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-bg-light ${
                    i === 0 ? 'md:col-span-2 md:aspect-[16/8]' : ''
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-[13px] text-text-muted">{g.caption}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <FadeIn>
              <span className="eyebrow text-text-muted">OUTCOME</span>
              <h2 className="heading-h2 mt-4">Result</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="space-y-5 text-text-body text-[18px] leading-[1.75]">
                {p.outcome.map((o, i) => (
                  <p key={i}>{o}</p>
                ))}
              </div>
              {p.quote && (
                <div className="mt-12 border-l-2 border-red pl-6">
                  <p className="text-text-primary text-[20px] leading-[1.6] font-medium">
                    “{p.quote.text}”
                  </p>
                  <div className="mt-4 text-[14px] text-text-muted">
                    <span className="text-text-primary font-semibold">
                      {p.quote.author}
                    </span>{' '}
                    · {p.quote.role}
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white">
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
                <ProjectCard project={rp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
