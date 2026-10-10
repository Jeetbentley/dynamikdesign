'use client'

import { useState, type ReactNode } from 'react'
import FadeIn from './FadeIn'

export interface WorkGridItem {
  key: string
  filters: string[]
  node: ReactNode
}

interface Props {
  items: WorkGridItem[]
  filters: { key: string; label: string }[]
  pageSize?: number // enables "Load More"
  filterClassName?: string
  ariaLabel?: string
  emptyText?: string
}

// Client-side filter for server-rendered cards (work, blog).
export default function WorkGrid({
  items,
  filters,
  pageSize,
  filterClassName = 'mb-14',
  ariaLabel = 'Filter projects',
  emptyText = 'No projects in this category yet.',
}: Props) {
  const [active, setActive] = useState('all')
  const [limit, setLimit] = useState(pageSize ?? Infinity)

  const filtered = active === 'all' ? items : items.filter((i) => i.filters.includes(active))
  const visible = filtered.slice(0, limit)

  return (
    <>
      <div role="group" aria-label={ariaLabel} className={`flex flex-wrap gap-1 -ml-2 ${filterClassName}`}>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className="filter-pill"
            data-active={active === f.key}
            aria-pressed={active === f.key}
            onClick={() => {
              setActive(f.key)
              setLimit(pageSize ?? Infinity)
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-text-muted">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {visible.map((item, i) => (
            <FadeIn key={item.key} delay={(i % 6) * 0.05}>
              {item.node}
            </FadeIn>
          ))}
        </div>
      )}

      {visible.length < filtered.length && (
        <div className="mt-16 flex justify-center">
          <button type="button" onClick={() => setLimit((l) => l + (pageSize ?? 6))} className="btn-ghost">
            Load More
          </button>
        </div>
      )}
    </>
  )
}
