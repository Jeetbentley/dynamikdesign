'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import ArrowRight from './ArrowRight'
import FadeIn from './FadeIn'

const FILTERS = ['All', 'FDM', 'SLA', 'Design', 'Embedded'] as const
type Filter = (typeof FILTERS)[number]

export default function FeaturedWork() {
  const [active, setActive] = useState<Filter>('All')
  const visible =
    active === 'All'
      ? projects.slice(0, 6)
      : projects.filter((p) =>
          active === 'Design'
            ? p.category.includes('Design')
            : p.category.includes(active as 'FDM' | 'SLA' | 'Embedded'),
        )

  return (
    <section className="bg-white">
      <div className="container-x py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <FadeIn>
            <span className="eyebrow text-text-muted">FEATURED WORK</span>
            <h2 className="heading-h2 mt-4">Selected projects</h2>
          </FadeIn>
          <div className="flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                className="filter-pill"
                data-active={active === f}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {visible.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/work" className="arrow-link">
            See All Work
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
