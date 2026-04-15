import FadeIn from './FadeIn'

interface Stat {
  value: string
  label: string
}

interface Props {
  stats?: Stat[]
}

const DEFAULT: Stat[] = [
  { value: '500+', label: 'Parts Printed' },
  { value: '48hr', label: 'Avg Turnaround' },
  { value: 'Pune', label: 'India-wide Delivery' },
]

export default function Stats({ stats = DEFAULT }: Props) {
  return (
    <section className="bg-bg-dark text-white">
      <div className="container-x py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.1}
              className="text-center md:text-left px-0 md:px-12 py-10 md:py-0 first:pl-0 last:pr-0"
            >
              <div className="text-[56px] lg:text-[64px] font-extrabold leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-3 text-[13px] uppercase tracking-[0.15em] text-white/55">
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
