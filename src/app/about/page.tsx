import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'

export const metadata = {
  title: 'About — Dynamik Design Lab',
  description:
    'A concept-to-prototype studio in Pune. One team with 10+ years of combined experience across automotive design, industrial design and embedded engineering.',
}

// Described by capability, not by brand or model.
const EQUIPMENT = [
  { name: 'Large-format additive manufacturing', spec: 'Build volume up to 520 × 520 × 600 mm for functional parts, jigs and full-size models.' },
  { name: 'High-resolution resin printing', spec: 'Fine-detail appearance models with sub-0.05 mm layer resolution.' },
  { name: 'Embedded systems lab', spec: 'Microcontroller development, PCB assembly, bring-up and test.' },
  { name: 'Design and modeling workstations', spec: 'Industrial and automotive-grade digital modeling, drawings and visualization.' },
  { name: 'Finishing & quality', spec: 'Dimensional inspection, sanding, priming and paint finishing.' },
]

const DISCIPLINES = [
  'Automotive Design',
  'Digital Modeling',
  'Industrial Design',
  'CMF',
  'Mechanical Engineering',
  'Embedded Systems',
  'Firmware',
  'Prototyping & Fabrication',
]

const VALUES = [
  {
    title: 'Build, then talk',
    body: 'We would rather hand you a prototype than send another email.',
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
        imageSlot="about-hero"
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
                Dynamik Design Lab is a one-stop concept-to-prototype studio in Pune. Our team brings 10+ years of
                combined experience across automotive design, industrial design and embedded engineering — including
                work on EV products from concept to production.
              </p>
              <p>
                We set up the studio to cut the distance between an idea and a working prototype. No handoffs between
                agencies, no weeks of email back and forth — one team that designs, engineers and builds.
              </p>
              <p>
                Clients come to us at every stage: a raw idea, a set of sketches, a finished 3D model, or a product that needs
                to work. They leave with a prototype that is presentable, functional and close to production.
              </p>
              <p>
                We work across automotive & mobility and industrial & interior products, with an optional phygital
                layer — sensors, connectivity and interfaces — wherever a product needs to be intelligent.
              </p>
            </div>

            <div className="mt-14 border-l-2 border-red pl-7">
              <div className="text-text-muted text-[60px] leading-none font-serif select-none">
                “
              </div>
              <p className="text-text-primary text-[22px] leading-[1.5] font-medium -mt-6">
                The studio that does both — designs the product and builds it —
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
            <span className="eyebrow text-text-muted">CAPABILITIES</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">What we work with</h2>
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

      {/* Team */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="eyebrow text-text-muted">THE TEAM</span>
            <h2 className="heading-h2 mt-4 max-w-xl">A decade of building what&apos;s next.</h2>
            <p className="mt-6 max-w-xl text-text-body text-[18px] leading-[1.75]">
              10+ years of combined experience across automotive design, industrial design and embedded engineering.
              Designers, engineers and makers working as one team — so nothing gets lost between stages.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {DISCIPLINES.map((d) => (
                <span key={d} className="rounded-full border border-border px-4 py-2 text-[13px] font-medium text-text-primary">
                  {d}
                </span>
              ))}
            </div>
          </FadeIn>
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageSlot slot="about-team" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
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
