import Link from 'next/link'
import ServiceDetail from '@/components/ServiceDetail'
import FadeIn from '@/components/FadeIn'
import ImageSlot from '@/components/ImageSlot'
import { FILE_FORMATS, FILE_FORMATS_NOTE, SERVICES, TURNAROUND } from '@/data/services'

const page = SERVICES.build

export const metadata = { title: page.metaTitle, description: page.metaDescription }

export default function BuildPage() {
  return (
    <ServiceDetail page={page}>
      <section id="fabrication-only" className="scroll-mt-20 bg-bg-dark text-white">
        <div className="container-x py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20">
          <FadeIn>
            <span className="eyebrow text-white/45">06 — FABRICATION ONLY</span>
            <h2 className="heading-h2 mt-4 max-w-xl !text-white">Files in, parts out.</h2>
            <p className="mt-6 max-w-xl text-white/75 text-[18px] leading-[1.7]">
              Already have your design? Send your files. We review for manufacturability, pick the right process and
              industrial-grade material, and deliver finished parts. Quote within 24 hours, scoped to your part and finish.
            </p>
            <ul className="mt-6 space-y-2">
              {['DFM review on every file', 'Process and material selected per part', 'Quality check before dispatch'].map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-white/70">
                  <span className="text-red" aria-hidden="true">—</span>
                  {t}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-[13px] uppercase tracking-[0.15em] font-medium text-white/45">Turnaround</h3>
            <dl className="mt-4 max-w-xl">
              {TURNAROUND.map((t) => (
                <div key={t.tier} className="grid grid-cols-3 gap-4 py-4 border-b border-white/10">
                  <dt className="font-semibold text-white">{t.tier}</dt>
                  <dd className="text-white/70">{t.time}</dd>
                  <dd className="text-red font-medium text-right">{t.note}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 text-[13px] uppercase tracking-[0.15em] font-medium text-white/45">File formats accepted</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {FILE_FORMATS.map((f) => (
                <span key={f} className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/85">
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[14px] text-white/55">{FILE_FORMATS_NOTE}</p>

            <Link href="/contact?service=fabrication-only" className="btn-red mt-10">
              Send Your Files
            </Link>
          </FadeIn>
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
            <ImageSlot slot="build-fabrication" tone="dark" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </section>
    </ServiceDetail>
  )
}
