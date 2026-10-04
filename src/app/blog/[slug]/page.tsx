import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts, getPostBySlug } from '@/data/blog'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug)
  if (!p) return { title: 'Blog — Dynamik Design Lab' }
  return {
    title: `${p.title} — Dynamik Design Lab`,
    description: p.excerpt,
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="bg-white">
        <div className="container-text pt-20 lg:pt-24">
          <FadeIn>
            <span className="eyebrow text-red">{post.category}</span>
            <h1 className="heading-h1 mt-4">{post.title}</h1>
            <p className="mt-6 text-text-muted text-[14px]">
              {post.date} · {post.readTime}
            </p>
          </FadeIn>
        </div>

        <FadeIn className="mt-12 lg:mt-16">
          <div className="relative w-full aspect-[16/8] bg-bg-light">
            <ImageSlot slot={post.imageSlot} priority sizes="100vw" />
          </div>
        </FadeIn>

        <div className="container-text py-16 lg:py-20">
          <div className="space-y-6 text-text-body text-[18px] leading-[1.8]">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bg-dark flex items-center justify-center" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-red" />
            </div>
            <div>
              <div className="text-text-primary font-semibold">Dynamik Design Lab</div>
              <div className="text-text-muted text-[13px]">The studio team</div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-bg-light">
        <div className="container-x py-24 lg:py-28">
          <FadeIn className="mb-12">
            <span className="eyebrow text-text-muted">RELATED READS</span>
            <h2 className="heading-h2 mt-4">More from the journal</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {related.map((p) => (
              <Link href={`/blog/${p.slug}`} key={p.slug} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-white mb-5">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <ImageSlot slot={p.imageSlot} sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                </div>
                <span className="tag tag--red">{p.category}</span>
                <h3 className="mt-4 text-[20px] font-semibold text-text-primary group-hover:text-red transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-text-muted text-[13px]">{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
