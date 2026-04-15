'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import FadeIn from '@/components/FadeIn'
import CtaBanner from '@/components/CtaBanner'

const FILTERS = [
  'All',
  'FDM',
  'SLA',
  'Design',
  'Embedded',
  'Automotive',
  'Consumer',
  'Medical',
] as const

type Filter = (typeof FILTERS)[number]

export default function WorkPage() {
  const [active, setActive] = useState<Filter>('All')
  const [limit, setLimit] = useState(9)

  const filtered =
    active === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category.includes(active as never) ||
            p.industry === (active as never),
        )

  const visible = filtered.slice(0, limit)
  const hasMore = limit < filtered.length

  return (
    <>
      <PageHero
        eyebrow="OUR WORK"
        title="Projects"
        subtitle="A selection of prototyping, design, and engineering work — from EV enclosures to wearables."
      />

      <section className="bg-white">
        <div className="container-x py-20 lg:py-24">
          <div className="flex flex-wrap gap-1 mb-14 -ml-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                className="filter-pill"
                data-active={active === f}
                onClick={() => {
                  setActive(f)
                  setLimit(9)
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="py-20 text-center text-text-muted">
              No projects in this filter yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {visible.map((p, i) => (
                <FadeIn key={p.slug} delay={(i % 6) * 0.05}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setLimit(limit + 6)}
                className="btn-ghost"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
