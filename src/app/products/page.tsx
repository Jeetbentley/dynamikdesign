import Link from 'next/link'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import ArrowRight from '@/components/ArrowRight'
import Image from 'next/image'

export const metadata = {
  title: 'Products — Dynamik Design Lab',
  description: 'Products designed and built in-house at Dynamik Design Lab, Pune.',
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS"
        title="Made in our studio"
        subtitle="Products we design, engineer and build in-house in Pune."
      />

      <section className="bg-white">
        <div className="container-x py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn>
              <Link href="/products/tile" className="group block">
                <div className="relative aspect-[3/2] bg-[#0B0B0C] overflow-hidden mb-5">
                  <Image
                    src="/products/tile/tile-device.webp"
                    alt="Tile"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain py-[8%] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag">Smart Home</span>
                  <span className="tag">New</span>
                </div>
                <h3 className="heading-h3 group-hover:text-red transition-colors">Tile</h3>
                <p className="text-[15px] text-text-body mt-1">
                  A 64-pixel desk clock, lamp and canvas you draw on.
                </p>
                <span className="arrow-link mt-4">
                  View product <ArrowRight />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
