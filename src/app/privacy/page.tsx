import PageHero from '@/components/PageHero'
import { site } from '@/config/site'
import { legal, telHref } from '@/data/legal'

export const metadata = {
  title: 'Privacy Policy — Dynamik Design Lab',
  description: 'What Dynamik Design Lab collects from enquiries, the Tile waitlist and orders, who we share it with, and your rights.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="LEGAL" title="Privacy Policy" />
      <section className="bg-white">
        <div className="container-text py-20 lg:py-24 space-y-6 text-text-body text-[17px] leading-[1.75]">
          <p>
            Dynamik Design Lab respects your privacy. This page summarizes what
            we collect, why, and what we do with it.
          </p>
          <h2 className="heading-h3 pt-4">What we collect</h2>
          <p>
            When you contact us, we collect the information you submit — name,
            email, phone, project description, and any files you upload.
          </p>
          <h2 className="heading-h3 pt-4">Why we collect it</h2>
          <p>
            To respond to your enquiry, prepare a quote, and deliver the work.
          </p>
          <h2 className="heading-h3 pt-4">Files and IP</h2>
          <p>
            We treat customer files as confidential. We sign NDAs on request
            and do not share, publish, or reuse customer designs.
          </p>
          <h2 className="heading-h3 pt-4">Tile waitlist and orders</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enquiries: the details you submit through our contact form, as described above.</li>
            <li>Tile waitlist: your name, email, WhatsApp number, city, and colour and mode preferences.</li>
            <li>Orders: your name, phone number, email, shipping address and order details.</li>
          </ul>
          <h2 className="heading-h3 pt-4">Payments</h2>
          <p>
            Payments are processed by Razorpay. We don&apos;t receive or store your card details or UPI credentials.
          </p>
          <h2 className="heading-h3 pt-4">Who we share it with</h2>
          <p>We share your information only with the service providers we need to do what you asked for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Razorpay, for payments</li>
            <li>our courier or shipping aggregator, for delivery</li>
            <li>Google Workspace and Google Sheets, for records</li>
            <li>Hostinger, for email</li>
            <li>Vercel, for hosting this website</li>
          </ul>
          <h2 className="heading-h3 pt-4">How long we keep it</h2>
          <p>
            We keep order and invoice records for as long as tax law requires. We keep waitlist details until sales for
            that batch close, or until you opt out, whichever comes first.
          </p>
          <h2 className="heading-h3 pt-4">Your rights</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal
            data, withdraw your consent, and have your grievances addressed. To exercise these rights, contact our
            Grievance Officer, {legal.grievanceOfficer.name}, at{' '}
            <a className="text-red" href={`mailto:${legal.grievanceOfficer.email}`}>{legal.grievanceOfficer.email}</a> or{' '}
            <a className="text-red" href={telHref(legal.grievanceOfficer.phone)}>{legal.grievanceOfficer.phone}</a>.
          </p>
          <h2 className="heading-h3 pt-4">The Tile device</h2>
          <p>
            Tile works on your own WiFi with no account. We don&apos;t collect usage data from the device.
          </p>
          <h2 className="heading-h3 pt-4">Communications</h2>
          <p>
            We send launch and order updates by email and WhatsApp. You can opt out at any time by replying or writing to
            us.
          </p>
          <h2 className="heading-h3 pt-4">Get in touch</h2>
          <p>
            Email <a className="text-red" href={`mailto:${site.email}`}>{site.email}</a> with any privacy questions.
          </p>
        </div>
      </section>
    </>
  )
}
