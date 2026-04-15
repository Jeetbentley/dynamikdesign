'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { posts } from '@/data/blog'
import FadeIn from '@/components/FadeIn'
import CtaBanner from '@/components/CtaBanner'

const FILTERS = [
  'All',
  '3D Printing',
  'Product Design',
  'Embedded',
  'Tutorials',
  'Industry',
] as const

export default function BlogPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>('All')
  const visible =
    active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title="Notes from the studio"
        subtitle="Material guides, design notes, and practical pieces from the print floor and the embedded bench."
      />

      <section className="bg-white">
        <div className="container-x py-20 lg:py-24">
          <div className="flex flex-wrap gap-1 mb-14 -ml-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((p, i) => (
              <FadeIn key={p.slug} delay={(i % 6) * 0.05}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-bg-light mb-5">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="tag tag--red">{p.category}</span>
                    <span className="text-text-muted text-[12px]">{p.date}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-text-body text-[15px]">{p.excerpt}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
