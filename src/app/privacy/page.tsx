import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Privacy Policy — Dynamik Design Lab',
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
          <h2 className="heading-h3 pt-4">Get in touch</h2>
          <p>
            Email <a className="text-red" href="mailto:hello@dynamikdesignlab.com">hello@dynamikdesignlab.com</a> with any privacy questions.
          </p>
        </div>
      </section>
    </>
  )
}
