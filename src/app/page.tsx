import HeroCarousel from '@/components/HeroCarousel'
import ServiceBlock from '@/components/ServiceBlock'
import Stats from '@/components/Stats'
import FeaturedWork from '@/components/FeaturedWork'
import Testimonials from '@/components/Testimonials'
import ProcessTeaser from '@/components/ProcessTeaser'
import CtaBanner from '@/components/CtaBanner'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'
import ArrowRight from '@/components/ArrowRight'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      {/* Studio Statement */}
      <section className="bg-white">
        <div className="container-text py-24 lg:py-32 text-center">
          <FadeIn>
            <span className="eyebrow text-text-muted">
              DYNAMIK DESIGN LAB · PUNE
            </span>
            <h2 className="heading-h2 mt-6">
              Turning ideas into precise physical reality
            </h2>
            <p className="mt-6 text-text-body text-[18px] leading-[1.7]">
              We are a product design and rapid prototyping studio. From concept
              sketches to functional parts, we deliver FDM printing, SLA
              printing, embedded hardware, and industrial design — under one
              roof in Pune.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/about" className="arrow-link">
                About Our Studio
                <ArrowRight />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services — alternating */}
      <ServiceBlock
        eyebrow="01 — FDM 3D PRINTING"
        title="Large-format parts, fast"
        body="Our Neptune 4 MAX delivers a 520 × 520mm build volume in PLA, PETG, ABS, and TPU. Enclosures, jigs, concept models — at ₹22/gram with 48-hour turnaround."
        ctaLabel="FDM Printing Services"
        ctaHref="/services/fdm-printing"
        image="https://picsum.photos/seed/svc-fdm/1600/1200"
        variant="white"
      />
      <ServiceBlock
        eyebrow="02 — SLA 3D PRINTING"
        title="High detail. Smooth finish."
        body="SLA resin printing for presentation models, medical components, micro-parts, and anything that needs sub-0.05mm layer resolution."
        ctaLabel="SLA Printing Services"
        ctaHref="/services/sla-printing"
        image="https://picsum.photos/seed/svc-sla/1600/1200"
        variant="light"
        reverse
      />
      <ServiceBlock
        eyebrow="03 — PRODUCT DESIGN"
        title="From sketch to manufacturable form"
        body="Industrial design + CAD + DFM review. We design products with their production method in mind from day one — so your prototype is already close to your final part."
        ctaLabel="Product Design Services"
        ctaHref="/services/product-design"
        image="https://picsum.photos/seed/svc-design/1600/1200"
        variant="white"
      />
      <ServiceBlock
        eyebrow="04 — EMBEDDED SYSTEMS"
        title="Hardware that works"
        body="ESP32-based custom PCBs, IoT firmware, sensor integration, and electromechanical prototypes — from breadboard to product-ready."
        ctaLabel="Embedded & IoT Services"
        ctaHref="/services/embedded"
        image="https://picsum.photos/seed/svc-embedded/1600/1200"
        variant="dark"
        reverse
      />

      <Stats />
      <FeaturedWork />
      <Testimonials />
      <ProcessTeaser />
      <CtaBanner />
    </>
  )
}
