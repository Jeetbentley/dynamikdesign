import { Suspense } from 'react'
import PageHero from '@/components/PageHero'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact — Dynamik Design Lab',
  description: 'Tell us about your project — idea, sketches, CAD or a product that needs to work. Reply within one working day.',
}

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
    </>
  )
}
