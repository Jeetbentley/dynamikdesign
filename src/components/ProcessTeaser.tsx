import Link from 'next/link'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'

const STEPS = [
  {
    n: '01',
    title: 'Brief & Review',
    body: 'Share your file or sketch. We respond with feedback and a quote within 24 hours.',
  },
  {
    n: '02',
    title: 'Design & DFM',
    body: 'We tune for printability — orientation, supports, wall thickness, material choice.',
  },
  {
    n: '03',
    title: 'Print & Build',
    body: 'Production starts after confirmation. WhatsApp updates as your part progresses.',
  },
  {
    n: '04',
    title: 'QC & Deliver',
    body: 'Dimensional check, post-processing, and pan-India dispatch or Pune pickup.',
  },
]

export default function ProcessTeaser() {
  return (
    <section className="bg-bg-light">
      <div className="container-x py-24 lg:py-32">
        <FadeIn>
          <span className="eyebrow text-text-muted">HOW WE WORK</span>
          <h2 className="heading-h2 mt-4 max-w-xl">From File to Physical</h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.08}>
              <div className="relative pl-0">
                <div className="text-[100px] leading-none font-extrabold text-text-muted/15 absolute -top-8 -left-2 select-none">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="text-red text-[13px] font-semibold tracking-[0.12em]">
                    STEP {s.n}
                  </div>
                  <h3 className="heading-h3 mt-3">{s.title}</h3>
                  <p className="mt-3 max-w-md text-text-body">{s.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/process" className="arrow-link">
            See Full Process
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
