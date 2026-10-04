import Link from 'next/link'
import FadeIn from './FadeIn'
import ImageSlot from './ImageSlot'
import { relatedReads } from '@/data/blog'

// Design, process and industry posts only — material comparisons are excluded. Hidden if none fit.
export default function RelatedReads({ tone = 'light' }: { tone?: 'light' | 'white' }) {
  const posts = relatedReads(3)
  if (posts.length === 0) return null

  return (
    <section className={tone === 'white' ? 'bg-white' : 'bg-bg-light'}>
      <div className="container-x py-24 lg:py-32">
        <FadeIn>
          <span className="eyebrow text-text-muted">FROM THE BLOG</span>
          <h2 className="heading-h2 mt-4">Related reads</h2>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {posts.map((b, i) => (
            <FadeIn key={b.slug} delay={i * 0.06}>
              <Link href={`/blog/${b.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-white mb-5">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <ImageSlot slot={b.imageSlot} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                </div>
                <span className="tag tag--red">{b.category}</span>
                <h3 className="mt-4 text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">{b.title}</h3>
                <p className="mt-2 text-text-muted text-[13px]">
                  {b.date} · {b.readTime}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
