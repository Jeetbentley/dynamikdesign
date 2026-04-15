import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import Accordion, { type AccordionItem } from '@/components/Accordion'

export const metadata = {
  title: 'Process — How We Work — Dynamik Design Lab',
  description:
    'From your file to a finished prototype in five steps. Turnaround times, formats accepted, and FAQ.',
}

const STEPS = [
  {
    n: '01',
    title: 'Share Your Brief',
    body: 'Send a CAD file, an STL, a sketch, or just a description of the idea. Email, WhatsApp, or use the form on our contact page.',
    image: 'https://picsum.photos/seed/proc-step-1/1400/1000',
    bullets: ['STL · STEP · OBJ · 3MF · Fusion 360 · SolidWorks'],
  },
  {
    n: '02',
    title: 'We Review & Quote',
    body: 'Your file gets a real DFM review — wall thickness, overhangs, hole sizes, orientation. Quote with material recommendation comes back within 24 hours.',
    image: 'https://picsum.photos/seed/proc-step-2/1400/1000',
  },
  {
    n: '03',
    title: 'Print & Build',
    body: 'Production starts after you confirm. WhatsApp updates as your part progresses through the queue, the printer, and post-processing.',
    image: 'https://picsum.photos/seed/proc-step-3/1400/1000',
  },
  {
    n: '04',
    title: 'Quality Check',
    body: 'Caliper-checked against your CAD file. Photos sent before dispatch. Optional post-processing — sanding, drilling, threading, painting.',
    image: 'https://picsum.photos/seed/proc-step-4/1400/1000',
  },
  {
    n: '05',
    title: 'Pack & Deliver',
    body: 'Secure packaging, pan-India courier dispatch, or pickup from our Pune studio.',
    image: 'https://picsum.photos/seed/proc-step-5/1400/1000',
  },
]

const FAQ: AccordionItem[] = [
  {
    q: "What's the minimum order quantity?",
    a: 'There is no minimum. We are happy to print a single part — most of our work is one-off prototypes or small batches.',
  },
  {
    q: 'Do you offer post-processing, painting, or finishing?',
    a: 'Yes. Sanding, drilling, threading, vapor smoothing for ABS, primer + paint for SLA parts. Pricing is broken out as a separate line item on the quote.',
  },
  {
    q: 'Can you print in flexible materials?',
    a: 'Yes — TPU 95A on FDM, and flexible resin on SLA. Tell us about the application (gasket, wearable, grip) and we will recommend the right one.',
  },
  {
    q: 'What tolerances do you hold?',
    a: 'FDM: ±0.3mm typical, ±0.15mm achievable on tuned parts. SLA: ±0.1mm typical. We will discuss specific critical dimensions during the quote.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. Send us yours or we can provide a standard mutual NDA. This is routine for us — most of our customers have unreleased products.',
  },
  {
    q: 'Can I visit your studio in Pune?',
    a: 'Absolutely. Email or WhatsApp ahead so we can make sure someone is in to walk you through the equipment.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes — pan-India courier through Bluedart, DTDC, and Delhivery. Most metro deliveries arrive in 2 – 3 days. International on request.',
  },
  {
    q: 'What happens if my print fails quality check?',
    a: 'We reprint it. You will not be charged for parts that fail our internal QC.',
  },
  {
    q: "Can you help if I don't have a CAD file?",
    a: 'Yes — describe the part or send a sketch and we can quote a design package alongside the print.',
  },
  {
    q: 'Do you offer design consultation before printing?',
    a: 'DFM feedback is included with every quote. Deeper design work — concept, full CAD, drawings — is a separate engagement under our Product Design service.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW IT WORKS"
        title="From file to physical, in five steps"
        subtitle="A clear, repeatable process. No surprises, no missing communication."
      />

      {/* Steps - alternating */}
      {STEPS.map((s, i) => (
        <section
          key={s.n}
          className={i % 2 === 0 ? 'bg-white' : 'bg-bg-light'}
        >
          <div className="grid lg:grid-cols-2 items-stretch">
            <div
              className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] ${
                i % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className={`flex items-center px-6 py-16 lg:px-16 lg:py-24 ${
                i % 2 === 1 ? 'lg:order-1' : ''
              }`}
            >
              <FadeIn>
                <div className="text-red text-[14px] font-semibold tracking-[0.18em] mb-3">
                  STEP {s.n}
                </div>
                <h2 className="heading-h2 max-w-md">{s.title}</h2>
                <p className="mt-5 max-w-md text-text-body">{s.body}</p>
                {s.bullets && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.bullets[0].split('·').map((b) => (
                      <span key={b} className="tag">
                        {b.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* Turnaround times */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">TURNAROUND</span>
            <h2 className="heading-h2 mt-4">How fast can we go?</h2>
          </FadeIn>
          <div className="mt-12 max-w-3xl">
            {[
              ['Standard', '5 – 7 working days', '—'],
              ['Express', '2 – 3 working days', '+20%'],
              ['Urgent', '24 – 48 hours', 'Call us'],
            ].map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-3 gap-4 py-5 border-b border-border"
              >
                <div className="text-text-primary font-semibold">{row[0]}</div>
                <div className="text-text-body">{row[1]}</div>
                <div className="text-red font-medium text-right">{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* File formats */}
      <section className="bg-bg-light">
        <div className="container-x py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <div className="shrink-0">
              <span className="eyebrow text-text-muted">FILE FORMATS ACCEPTED</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['STL', 'STEP', 'OBJ', '3MF', 'IGES', 'Fusion 360', 'SolidWorks'].map(
                (f) => (
                  <span
                    key={f}
                    className="px-4 py-2 bg-white border border-border rounded-full text-[14px] font-medium text-text-primary"
                  >
                    {f}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-12">
            <span className="eyebrow text-text-muted">FAQ</span>
            <h2 className="heading-h2 mt-4">Frequently asked</h2>
          </FadeIn>
          <Accordion items={FAQ} />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
