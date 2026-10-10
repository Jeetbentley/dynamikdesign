import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaBanner from '@/components/CtaBanner'
import ImageSlot from '@/components/ImageSlot'
import WorkGrid from '@/components/WorkGrid'
import { posts } from '@/data/blog'

export const metadata = {
  title: 'Blog — Dynamik Design Lab',
  description: 'Notes on design, engineering, prototyping and the hardware industry from the Dynamik Design Lab studio.',
}

const FILTERS = ['All', '3D Printing', 'Product Design', 'Embedded', 'Tutorials', 'Industry'].map((f) => ({
  key: f === 'All' ? 'all' : f,
  label: f,
}))

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title="Notes from the studio"
        subtitle="Material guides, design notes, and practical pieces from the print floor and the embedded bench."
      />

      <section className="bg-white">
        <div className="container-x py-20 lg:py-24">
          <WorkGrid
            filters={FILTERS}
            ariaLabel="Filter posts"
            emptyText="No posts in this category yet."
            items={posts.map((p) => ({
              key: p.slug,
              filters: [p.category],
              node: (
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-bg-light mb-5">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                      <ImageSlot slot={p.imageSlot} sizes="(min-width: 1024px) 33vw, 100vw" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="tag tag--red">{p.category}</span>
                    <span className="text-text-muted text-[12px]">{p.date}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">{p.title}</h3>
                  <p className="mt-2 text-text-body text-[15px]">{p.excerpt}</p>
                </Link>
              ),
            }))}
          />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
