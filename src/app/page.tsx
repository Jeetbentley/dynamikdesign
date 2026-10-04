import Link from 'next/link'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'
import ProcessTeaser from '@/components/ProcessTeaser'
import Testimonials from '@/components/Testimonials'
import {
  BuildToolkit,
  IndustryCards,
  PhygitalStrip,
  PrototypeTypes,
  SelectedWork,
  StartAnywhere,
  WaysToEngage,
} from '@/components/Sections'

const DISCIPLINES = [
  'Automotive Design',
  'CAS & Class-A Surfacing',
  'Industrial Design',
  'CMF',
  'Mechanical Engineering',
  'Embedded Systems',
  'Firmware',
  'Prototyping & Fabrication',
]

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative w-full h-[calc(100vh-68px)] min-h-[560px] overflow-hidden bg-bg-dark">
        <ImageSlot slot="home-hero" tone="dark" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        <div className="relative h-full container-x flex flex-col justify-end pb-16 lg:pb-24">
          <FadeIn>
            <div className="text-white/75 text-[11px] font-medium tracking-[0.18em] uppercase mb-5">
              Dynamik Design Lab · Pune
            </div>
            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[42px] sm:text-[60px] lg:text-[76px] max-w-4xl">
              From concept to working prototype.
            </h1>
            <p className="mt-6 max-w-2xl text-white/80 text-[17px] lg:text-[19px] leading-[1.6]">
              Automotive, industrial and phygital products, ideated, designed, engineered and built under one roof in Pune.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-red">
                Start a Project
              </Link>
              <Link href="/work" className="btn-outline">
                See Our Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Start Anywhere */}
      <StartAnywhere />

      {/* 3. The Approach */}
      <ProcessTeaser />

      {/* 4. What We Work On */}
      <IndustryCards />
      <PhygitalStrip />

      {/* 5. Prototype Types */}
      <PrototypeTypes />

      {/* 6. Build Toolkit */}
      <BuildToolkit />

      {/* 7. Selected Work */}
      <SelectedWork bg="light" />

      {/* 8. The Team */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="eyebrow text-text-muted">THE TEAM</span>
            <h2 className="heading-h2 mt-4 max-w-xl">A decade of building what&apos;s next.</h2>
            <p className="mt-6 max-w-xl text-text-body text-[18px] leading-[1.75]">
              10+ years of combined experience across automotive design, industrial design and embedded engineering —
              working as one team, from the first sketch to the working prototype.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {DISCIPLINES.map((d) => (
                <span key={d} className="rounded-full border border-border px-4 py-2 text-[13px] font-medium text-text-primary">
                  {d}
                </span>
              ))}
            </div>
            <Link href="/about" className="arrow-link mt-9">
              About the studio
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </FadeIn>
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageSlot slot="home-team" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* 9. Ways to Engage */}
      <WaysToEngage />

      {/* 10. Testimonials (hidden until there is data) */}
      <Testimonials />

      {/* 11. Final CTA */}
      <CtaBanner
        title="Have an idea? Let's make it real."
        subtitle="Tell us where you are — idea, sketch, CAD or a product that needs to work. We'll reply within 24 hours."
        ctaLabel="Start a Project"
      />
    </>
  )
}
