import type { ReactNode } from 'react'
import Link from 'next/link'
import PageHero from './PageHero'
import { legal, telHref } from '@/data/legal'

// Shared layout for the policy pages: same hero and prose styles as the Privacy Policy,
// a "Last updated" line and the seller details at the bottom.

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="heading-h3 pt-4 scroll-mt-28">
      {children}
    </h2>
  )
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 marker:text-text-muted">{children}</ul>
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link className="text-red" href={href}>
        {children}
      </Link>
    )
  }
  return (
    <a className="text-red" href={href}>
      {children}
    </a>
  )
}

export const Email = ({ email = legal.email }: { email?: string }) => <A href={`mailto:${email}`}>{email}</A>
export const Phone = ({ phone = legal.phone }: { phone?: string }) => <A href={telHref(phone)}>{phone}</A>

export function LastUpdated() {
  return <p className="eyebrow text-text-muted">Last updated: {legal.effectiveDate}</p>
}

export function SellerDetails() {
  const rows: [string, ReactNode][] = [
    ['Name', legal.businessName],
    ['Entity', legal.entity.charAt(0).toUpperCase() + legal.entity.slice(1)],
    ['GSTIN', legal.gstin],
    ['Registered address', legal.registeredAddress],
    ['Email', <Email key="e" />],
    ['Phone', <Phone key="p" />],
  ]
  return (
    <div className="mt-12 border-t border-border pt-10">
      <h2 className="heading-h3">Seller details</h2>
      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3 text-[15px] leading-[1.6]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="eyebrow text-text-muted pt-[3px]">{k}</dt>
            <dd className="m-0 mb-2 sm:mb-0">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="LEGAL" title={title} />
      <section className="bg-white">
        <div className="container-text py-20 lg:py-24 space-y-6 text-text-body text-[17px] leading-[1.75]">
          <LastUpdated />
          {children}
          <SellerDetails />
        </div>
      </section>
    </>
  )
}
