import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'

const SERVICES = [
  {
    n: '01',
    title: 'FDM 3D Printing',
    description: 'Large-format functional parts in PLA, PETG, ABS, ASA, TPU.',
    image: 'https://picsum.photos/seed/svc-card-fdm/1200/900',
    href: '/services/fdm-printing',
  },
  {
    n: '02',
    title: 'SLA 3D Printing',
    description: 'High-resolution resin printing for presentation and detail work.',
    image: 'https://picsum.photos/seed/svc-card-sla/1200/900',
    href: '/services/sla-printing',
  },
  {
    n: '03',
    title: 'Product Design',
    description: 'Industrial design, CAD, and DFM review from concept to handoff.',
    image: 'https://picsum.photos/seed/svc-card-design/1200/900',
    href: '/services/product-design',
  },
  {
    n: '04',
    title: 'Embedded & IoT',
    description: 'ESP32-based PCBs, firmware, and electromechanical prototypes.',
    image: 'https://picsum.photos/seed/svc-card-emb/1200/900',
    href: '/services/embedded',
  },
]

const VALUES = [
  {
    title: 'Speed without shortcuts',
    body: '48-hour turnaround on most FDM jobs. We move fast because our process is dialed in, not because we cut corners.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2v6M14 26v-6M2 14h6M26 14h-6M5.6 5.6l4.2 4.2M22.4 22.4l-4.2-4.2M5.6 22.4l4.2-4.2M22.4 5.6l-4.2 4.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'DFM-first thinking',
    body: 'Every file gets a real review before printing. Our feedback often saves customers a revision cycle.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="22" height="22" rx="2" />
        <path d="M3 10h22M10 3v22" />
      </svg>
    ),
  },
  {
    title: 'Transparent pricing',
    body: 'Per-gram quotes, post-processing line items spelled out, no surprise surcharges. Quote is the price.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 7v14M10 11h6a2 2 0 010 4h-4a2 2 0 000 4h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'End-to-end capability',
    body: 'Need a CAD file, a PCB, and a finished housing? You only need to talk to one team for all of it.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 8l10-5 10 5v12l-10 5-10-5V8z" strokeLinejoin="round" />
        <path d="M4 8l10 5 10-5M14 13v12" />
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
        subtitle="Four disciplines, one studio. From printed parts to product-ready prototypes."
        image="https://picsum.photos/seed/services-hero/2400/1400"
        height="tall"
      />

      {/* Services grid */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.08}>
                <Link href={s.href} className="group block">
                  <div className="relative aspect-[5/4] overflow-hidden bg-bg-light">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                      <div className="text-white/70 text-[11px] tracking-[0.18em] font-medium mb-3">
                        {s.n}
                      </div>
                      <h3 className="text-white text-[28px] lg:text-[32px] font-bold leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-white/80 mt-3 text-[15px] max-w-md">
                        {s.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[3px] bg-red w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dynamik */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">WHY CHOOSE US</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">
              The advantages of working with Dynamik
            </h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="text-red mb-5">{v.icon}</div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  {v.title}
                </h3>
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
