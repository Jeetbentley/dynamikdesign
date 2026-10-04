import Link from 'next/link'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import ArrowRight from '@/components/ArrowRight'

export const metadata = {
  title: 'Products — Dynamik Design Lab',
  description: 'Products designed and built in-house at Dynamik Design Lab, Pune.',
}

const CLOCK_ON = new Set([1, 8, 9, 17, 25, 4, 12, 13, 14, 20, 22, 29, 30, 32, 33, 34, 40, 49, 56, 57, 37, 38, 39, 47, 54, 62])

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
                <div className="aspect-[3/2] bg-[#0B0B0C] flex items-center justify-center overflow-hidden mb-5">
                  <div className="w-[44%] rounded-[18px] bg-[#F0641E] px-[6%] pt-[6%] shadow-[inset_0_-5px_0_#C94C10] transition-transform duration-500 group-hover:scale-[1.04]">
                    <div className="grid grid-cols-8 gap-[3px] rounded-[7px] bg-[#E9EBEE] p-[7px]">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-[2px]"
                          style={{ background: CLOCK_ON.has(i) ? (i < 32 ? '#A56BF2' : '#F39AD6') : '#DCDFE3' }}
                        />
                      ))}
                    </div>
                    <div className="h-8" />
                  </div>
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
