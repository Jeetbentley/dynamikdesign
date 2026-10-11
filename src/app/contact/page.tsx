import { Suspense, type ReactNode } from 'react'
import PageHero from '@/components/PageHero'
import ContactForm from './ContactForm'
import { legal, telHref } from '@/data/legal'

export const metadata = {
  title: 'Contact — Dynamik Design Lab',
  description: 'Tell us about your project — idea, sketches, a 3D model or a product that needs to work. Reply within one working day.',
}

const link = 'text-text-primary hover:text-red transition-colors'
const g = legal.grievanceOfficer

const BUSINESS: [string, ReactNode][] = [
  ['Business name', legal.businessName],
  ['Entity', legal.entity.charAt(0).toUpperCase() + legal.entity.slice(1)],
  ['Registered address', legal.registeredAddress],
  ['GSTIN', legal.gstin],
  ['Email', <a key="e" className={link} href={`mailto:${legal.email}`}>{legal.email}</a>],
  ['Phone', <a key="p" className={link} href={telHref(legal.phone)}>{legal.phone}</a>],
  ['Support hours', legal.supportHours],
  [
    'Grievance officer',
    <span key="g">
      {g.name}, {g.designation}
      <br />
      <a className={link} href={`mailto:${g.email}`}>{g.email}</a> ·{' '}
      <a className={link} href={telHref(g.phone)}>{g.phone}</a>
    </span>,
  ],
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's Build Something"
        subtitle="Tell us about your project. We respond within one working day."
      />
      <Suspense>
        <ContactForm />
      </Suspense>
      <section aria-labelledby="business-h" className="bg-white border-t border-border">
        <div className="container-x py-16 lg:py-20">
          <h2 id="business-h" className="heading-h3">Business details</h2>
          <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            {BUSINESS.map(([k, v]) => (
              <div key={k}>
                <dt className="form-label mb-2">{k}</dt>
                <dd className="m-0 text-text-body text-[16px] leading-[1.6]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
