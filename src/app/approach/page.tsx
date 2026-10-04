import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ServiceBlock from '@/components/ServiceBlock'
import Accordion from '@/components/Accordion'
import { StartAnywhere, WaysToEngage } from '@/components/Sections'
import { FAQ, STAGES } from '@/data/approach'

export const metadata = {
  title: 'Approach — Dynamik Design Lab',
  description: 'One team, five stages, no handoffs: ideate, design, engineer, build, validate & handoff. Start at any stage.',
}

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="APPROACH"
        title="One team. Five stages. No handoffs."
        subtitle="Enter at any stage — a raw idea, sketches or finished CAD — and leave with a working, presentable prototype."
        imageSlot="approach-hero"
      />

      <StartAnywhere bg="light" />

      {STAGES.map((s, i) => (
        <ServiceBlock
          key={s.id}
          id={s.id}
          eyebrow={`STAGE ${s.n}`}
          title={s.title}
          body={s.description}
          imageSlot={s.imageSlot}
          reverse={i % 2 === 1}
          variant={i % 2 === 1 ? 'light' : 'white'}
        >
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md">
            <div>
              <h3 className="text-[12px] uppercase tracking-[0.15em] font-medium text-text-muted">Activities</h3>
              <ul className="mt-3 space-y-1.5">
                {s.activities.map((a) => (
                  <li key={a} className="flex gap-2.5 text-[15px] text-text-body">
                    <span className="text-red" aria-hidden="true">—</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] uppercase tracking-[0.15em] font-medium text-text-muted">Deliverables</h3>
              <ul className="mt-3 space-y-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-[15px] font-semibold text-text-primary">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ServiceBlock>
      ))}

      <WaysToEngage />

      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-12">
            <span className="eyebrow text-text-muted">FAQ</span>
            <h2 className="heading-h2 mt-4">Frequently asked</h2>
          </FadeIn>
          <Accordion items={FAQ} />
        </div>
      </section>

      <CtaBanner title="Have an idea? Let's make it real." ctaLabel="Start a Project" />
    </>
  )
}
