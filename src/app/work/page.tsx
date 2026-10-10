import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import WorkCard from '@/components/WorkCard'
import WorkGrid from '@/components/WorkGrid'
import { work, workFilterKeys } from '@/data/work'

export const metadata = {
  title: 'Work — Dynamik Design Lab',
  description: 'Selected design, engineering and prototyping work for automotive, industrial and interior products.',
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'automotive', label: 'Automotive' },
  { key: 'industrial-interior', label: 'Industrial & Interior' },
  { key: 'phygital', label: 'Phygital' },
  { key: 'design', label: 'Design' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'build', label: 'Build' },
]

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR WORK"
        title="Projects"
        subtitle="Selected design, engineering and prototyping work across automotive and industrial & interior products."
      />

      <section className="bg-white">
        <div className="container-x py-20 lg:py-24">
          <WorkGrid
            filters={FILTERS}
            pageSize={9}
            items={work.map((p) => ({ key: p.slug, filters: workFilterKeys(p), node: <WorkCard project={p} /> }))}
          />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
