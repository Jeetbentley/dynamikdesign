import Image from 'next/image'
import Link from 'next/link'
import PageHero from './PageHero'
import CtaBanner from './CtaBanner'
import FadeIn from './FadeIn'
import ProjectCard from './ProjectCard'
import { projects, type Category } from '@/data/projects'
import { posts } from '@/data/blog'
import ArrowRight from './ArrowRight'

export interface Capability {
  n: string
  title: string
  body: string
}

export interface SpecRow {
  param: string
  value: string
}

export interface Props {
  eyebrow: string
  title: string
  hero: string
  intro: string[]
  whyUs: string[]
  capabilities: Capability[]
  capabilityImage: string
  specs: SpecRow[]
  materials: string[]
  category: Category
  blogTags?: string[]
}

export default function ServiceDetail({
  eyebrow,
  title,
  hero,
  intro,
  whyUs,
  capabilities,
  capabilityImage,
  specs,
  materials,
  category,
}: Props) {
  const featured = projects
    .filter((p) => p.category.includes(category))
    .slice(0, 3)
  const blog = posts.slice(0, 3)

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} image={hero} height="tall" />

      {/* Intro */}
      <section className="bg-white">
        <div className="container-text py-24 lg:py-28">
          <FadeIn>
            {intro.map((p, i) => (
              <p
                key={i}
                className={`text-text-body text-[18px] leading-[1.75] ${
                  i === 0 ? 'first-letter:text-text-primary' : ''
                } ${i > 0 ? 'mt-6' : ''}`}
              >
                {p}
              </p>
            ))}

            <div className="mt-12">
              <h3 className="text-[16px] tracking-[0.12em] uppercase font-semibold text-text-primary mb-5">
                Why Us
              </h3>
              <ul className="space-y-3">
                {whyUs.map((w, i) => (
                  <li
                    key={i}
                    className="text-text-body text-[16px] flex gap-3 leading-[1.6]"
                  >
                    <span className="text-red shrink-0 mt-[10px]">—</span>
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
            <h2 className="heading-h2 mt-4 max-w-xl">From file to finished part</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-10">
              {capabilities.map((c, i) => (
                <FadeIn key={c.n} delay={i * 0.06}>
                  <div className="flex gap-6 items-start">
                    <div className="text-red text-[20px] font-bold tabular-nums tracking-tight pt-1">
                      {c.n}
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold text-text-primary">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-text-body">{c.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden">
              <Image
                src={capabilityImage}
                alt={title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">TECHNICAL DETAILS</span>
            <h2 className="heading-h2 mt-4">Specifications</h2>
          </FadeIn>
          <div className="mt-12 max-w-3xl">
            {specs.map((row) => (
              <div
                key={row.param}
                className="grid grid-cols-[160px_1fr] sm:grid-cols-[220px_1fr] gap-6 py-5 border-b border-border"
              >
                <div className="text-text-muted text-[13px] uppercase tracking-[0.1em] font-medium">
                  {row.param}
                </div>
                <div className="text-text-primary text-[16px]">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Strip */}
      <section className="bg-bg-light">
        <div className="container-x py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <span className="eyebrow text-text-muted shrink-0">
              AVAILABLE MATERIALS
            </span>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {materials.map((m) => (
                <span
                  key={m}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-white border border-border text-[14px] font-medium text-text-primary"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured work for this service */}
      {featured.length > 0 && (
        <section className="bg-white">
          <div className="container-x py-24 lg:py-32">
            <FadeIn className="mb-14 flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow text-text-muted">FEATURED PROJECTS</span>
                <h2 className="heading-h2 mt-4">Recent {category} work</h2>
              </div>
              <Link href="/work" className="arrow-link hidden sm:inline-flex">
                See all <ArrowRight />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {featured.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.06}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related blog */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">FROM THE BLOG</span>
            <h2 className="heading-h2 mt-4">Related reads</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {blog.map((b, i) => (
              <FadeIn key={b.slug} delay={i * 0.06}>
                <Link href={`/blog/${b.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-white mb-5">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="tag tag--red">{b.category}</span>
                  <h3 className="mt-4 text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-text-muted text-[13px]">{b.date} · {b.readTime}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
