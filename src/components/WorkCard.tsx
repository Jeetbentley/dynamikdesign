import Link from 'next/link'
import ImageSlot from './ImageSlot'
import { INDUSTRY_LABEL, TAG_LABEL, type WorkProject } from '@/data/work'

export default function WorkCard({ project }: { project: WorkProject }) {
  const p = project
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <div className="relative overflow-hidden bg-bg-light aspect-[3/2] mb-5">
        {p.placeholder ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#ECECEC] transition-transform duration-500 ease-studio group-hover:scale-[1.02]"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(26,26,26,0.035) 0 1px, transparent 1px 14px)' }}
          >
            <span className="h-2 w-2 rounded-full bg-red" aria-hidden="true" />
            <span className="eyebrow text-text-primary">Case study coming soon</span>
            <span className="text-[13px] text-text-muted">{INDUSTRY_LABEL[p.industry]}</span>
          </div>
        ) : (
          <div className="absolute inset-0 transition-transform duration-500 ease-studio group-hover:scale-[1.02]">
            <ImageSlot src={p.coverImage} alt={p.title} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="tag">{INDUSTRY_LABEL[p.industry]}</span>
        {p.tags.map((t) => (
          <span key={t} className="tag">
            {TAG_LABEL[t]}
          </span>
        ))}
      </div>
      <h3 className="heading-h3 text-text-primary group-hover:text-red transition-colors">{p.title}</h3>
      <p className="text-[13px] text-text-muted mt-1">{p.client}</p>
    </Link>
  )
}
