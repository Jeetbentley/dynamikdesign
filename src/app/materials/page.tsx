import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import { materials } from '@/data/materials'

export const metadata = {
  title: 'Materials & Specs — Dynamik Design Lab',
  description:
    'Compare PLA, PETG, ABS, ASA, TPU and SLA resins side-by-side. Find the right material for your prototype.',
}

function Bar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-[12px] text-text-muted tracking-[0.05em] uppercase font-medium">
        <span>{label}</span>
        <span className="text-text-primary tabular-nums">{value}/{max}</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-red rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}

function Dots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i < value ? 'bg-red' : 'bg-border'}`}
        />
      ))}
    </div>
  )
}

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="MATERIALS & SPECS"
        title="Pick the right material"
        subtitle="A working library of FDM filaments and SLA resins, with the properties that actually matter when choosing one."
      />

      {/* Material cards grid */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {materials.map((m, i) => (
              <FadeIn key={m.name} delay={(i % 6) * 0.05}>
                <div className="border border-border p-7 lg:p-8 hover:border-red transition-colors h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[22px] font-bold text-text-primary">
                      {m.name}
                    </h3>
                    <span className="tag tag--red">{m.process}</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    <Bar value={m.strength} label="Strength" />
                    <Bar value={m.flexibility} label="Flexibility" />
                    <Bar value={m.heat} label="Heat Resistance" />
                  </div>
                  <div className="mt-auto pt-6 border-t border-border space-y-3 text-[13px]">
                    <div>
                      <div className="text-text-muted uppercase tracking-[0.1em] text-[11px] font-medium mb-2">
                        Best for
                      </div>
                      <div className="text-text-primary">{m.bestFor.join(', ')}</div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-text-muted uppercase tracking-[0.1em] text-[11px] font-medium">
                        Price tier
                      </span>
                      <Dots value={6 - m.cost} max={3} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">COMPARISON</span>
            <h2 className="heading-h2 mt-4">Side by side</h2>
          </FadeIn>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Material
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Strength
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Flexibility
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Heat
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Detail
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Cost
                  </th>
                  <th className="py-4 px-3 text-[12px] uppercase tracking-[0.1em] font-medium text-text-muted">
                    Post-process
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-5 px-3 text-text-primary font-semibold sticky left-0 bg-bg-light">
                      <div>{m.name}</div>
                      <div className="text-[11px] text-text-muted font-normal mt-0.5">
                        {m.process}
                      </div>
                    </td>
                    <td className="py-5 px-3"><Dots value={m.strength} /></td>
                    <td className="py-5 px-3"><Dots value={m.flexibility} /></td>
                    <td className="py-5 px-3"><Dots value={m.heat} /></td>
                    <td className="py-5 px-3"><Dots value={m.detail} /></td>
                    <td className="py-5 px-3"><Dots value={m.cost} /></td>
                    <td className="py-5 px-3"><Dots value={m.postProcess} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section className="bg-white">
        <div className="container-x py-24 lg:py-32">
          <FadeIn>
            <span className="eyebrow text-text-muted">NOT SURE WHICH MATERIAL?</span>
            <h2 className="heading-h2 mt-4 max-w-2xl">A quick decision guide</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { q: 'Needs flexibility', a: 'TPU 95A or Flexible Resin' },
              { q: 'Needs fine detail', a: 'SLA Standard or Tough Resin' },
              { q: 'Strength + budget', a: 'PETG' },
              { q: 'Heat resistance', a: 'ABS or ASA' },
            ].map((d, i) => (
              <FadeIn key={d.q} delay={i * 0.06}>
                <div className="border border-border p-7">
                  <div className="text-text-muted text-[12px] uppercase tracking-[0.12em] font-medium mb-3">
                    If you need
                  </div>
                  <div className="text-[20px] font-semibold text-text-primary">
                    {d.q}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-red font-semibold">
                    <span>→</span>
                    <span>{d.a}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still not sure? Send us your file."
        subtitle="We will recommend the right material with your quote."
      />
    </>
  )
}
