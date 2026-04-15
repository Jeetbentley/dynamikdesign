import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'

export const metadata = {
  title: 'About — Dynamik Design Lab',
  description:
    'A maker-run product design and prototyping studio in Pune. Built by Jeetendra Kumar.',
}

const EQUIPMENT = [
  {
    name: 'Elegoo Neptune 4 MAX',
    spec: 'FDM, 520 × 520 × 600mm build volume, multiple materials',
  },
  {
    name: 'SLA Resin Printer',
    spec: '218 × 123 × 230mm, 25 – 100 micron layers, multi-resin',
  },
  {
    name: 'Embedded Systems Lab',
    spec: 'ESP32, STM32, soldering station, oscilloscope, logic analyzer',
  },
  {
    name: 'Design Workstation',
    spec: 'Fusion 360, SolidWorks, KiCad, Figma, KeyShot',
  },
  {
    name: 'QC & Finishing',
    spec: 'Calipers, micrometer, sanding, vapor smoothing chamber, paint booth',
  },
]

const VALUES = [
  {
    title: 'Build and then talk XD ',
    body: 'We would rather hand you a printed part than send another email.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 14h22M14 3v22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Honest about what we cannot do',
    body: 'If your part should be CNC machined, we will say so. Trust beats one job.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M9 14l4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Time matters',
    body: 'A prototype next week is worth more than a perfect one next month.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 7v7l4 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Local, but not provincial',
    body: 'Made in Pune, shipped across India, designed to global standards.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M3 14h22M14 3a17 17 0 010 22M14 3a17 17 0 000 22" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Built by Makers"
        image="https://picsum.photos/seed/about-hero/2400/1400"
        height="short"
      />

      {/* Story */}
      <section className="bg-white">
        <div className="container-text py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">OUR STORY</span>
            <h2 className="heading-h2 mt-4 mb-10">
              A studio for people who want to build things
            </h2>
            <div className="space-y-6 text-text-body text-[18px] leading-[1.75]">
              <p>
                Dynamik Design Lab was founded by a team that grew up in maker
                spaces and product engineering teams — most recently at Matter
                Motor Works, where we designed and built parts for new EV
                products from concept to production.
              </p>
              <p>
                After years of helping other people build things, we set up our
                own shop in Pune. The idea was simple: cut the distance between
                the customer with the idea and the part on the bench. No
                handoffs to a print farm, no weeks of email back and forth, no
                hidden post-processing surcharges.
              </p>
              <p>
                Today we run an in-house FDM and SLA print floor, an embedded
                systems lab, and a small industrial design practice. Every
                project crosses at least two of those, and the same person who
                quotes your job will print it.
              </p>
              <p>
                We work with hardware startups, product designers, EV companies,
                medtech teams, and engineering firms — anyone who needs a
                physical thing to exist this week, not next month.
              </p>
            </div>

            <div className="mt-14 border-l-2 border-red pl-7">
              <div className="text-text-muted text-[60px] leading-none font-serif select-none">
                “
              </div>
              <p className="text-text-primary text-[22px] leading-[1.5] font-medium -mt-6">
                The studio that does both — designs the part and prints it —
                ends up doing both better.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">OUR EQUIPMENT</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">What we have in the shop</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {EQUIPMENT.map((e, i) => (
              <FadeIn key={e.name} delay={i * 0.05}>
                <div className="border-t border-border pt-6">
                  <h3 className="text-[20px] font-semibold text-text-primary">
                    {e.name}
                  </h3>
                  <p className="text-text-body text-[15px] mt-2">{e.spec}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">FOUNDER</span>
            <h2 className="heading-h2 mt-4 mb-12">Who runs the shop</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
              <div className="relative aspect-square overflow-hidden bg-bg-light max-w-md">
                <Image
                  src="https://picsum.photos/seed/founder/900/900"
                  alt="Founder"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-[28px] font-bold text-text-primary">
                  Dhananjay Moré
                </h3>
                <p className="text-red text-[14px] uppercase tracking-[0.12em] font-semibold mt-2">
                  Founder & Lead Engineer
                </p>
                <div className="mt-6 space-y-4 text-text-body text-[17px] leading-[1.75]">
                  <p>
                    Mechanical engineer turned product engineer. Years on the
                    Matter Motor Works EV product team, building real parts
                    that ship on real bikes.
                  </p>
                  <p>
                    Splits time between CAD, the print floor, and the embedded
                    bench. Believes the studio that does both — designs the
                    part and builds it — ends up doing both better.
                  </p>
                </div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link mt-8"
                >
                  Connect on LinkedIn
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path
                      d="M1 6H13M13 6L8 1M13 6L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">VALUES</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">How we run the studio</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
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

      {/* Credentials strip */}
      <section className="bg-bg-dark">
        <div className="container-x py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[12px] text-white/55 tracking-[0.05em]">
            <span>UDYAM REGISTERED</span>
            <span className="text-white/15">·</span>
            <span>GST REGISTERED</span>
            <span className="text-white/15">·</span>
            <span>PUNE, MAHARASHTRA</span>
            <span className="text-white/15">·</span>
            <span>CLASS 40 &amp; 42 TRADEMARK PENDING</span>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
