import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import TileShell, { pillOutline } from '../TileShell'
import { body, card, eyebrow, h2, h3, mono } from '@/app/products/tile/tileStyles'
import { legal, waHref } from '@/data/legal'

export const metadata: Metadata = {
  title: 'Update your Tile — Dynamik Design Lab',
  description: 'Get the latest Tile firmware: the current version, what changed, and how to install it from the Tile app or tile.local.',
  alternates: { canonical: '/tile/update' },
}

interface Release {
  version: string
  date: string
  notes: string
}

// Read at build time; every firmware release is a commit, so the page rebuilds with it.
function readReleases(): Release[] {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'public', 'tile', 'fw', 'releases.json'), 'utf8')
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const longDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return y && m && d ? `${d} ${MONTHS[m - 1]} ${y}` : iso
}

const STEPS = [
  { n: '01', title: 'Open Tile', text: 'Open the Tile app, or go to tile.local in a browser on the same WiFi as Tile.' },
  { n: '02', title: 'Check for updates', text: 'Tap the WiFi icon, then Device, then Check for updates.' },
  { n: '03', title: 'Install', text: 'Tap Install and keep Tile plugged in. It shows a progress bar on its screen and restarts when it’s done.' },
]

const FAQS = [
  { q: 'What if the update fails?', a: 'Nothing is lost. Tile keeps running the version it had and you can simply try again. If it keeps failing, message us and we’ll help.' },
  { q: 'What if Tile has no internet?', a: 'Updates download over your home WiFi, so Tile needs to be connected to it. Once it’s on your WiFi, check for updates again.' },
  { q: 'I have an iPhone. How do I update?', a: 'The Tile app is Android-only for now. On iPhone, open Safari and go to tile.local while on the same WiFi as Tile, then follow the same steps.' },
]

export default function TileUpdatePage() {
  const releases = readReleases()
  const [latest, ...older] = releases
  return (
    <TileShell>
      <section className="px-6 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>Firmware</p>
          <h1 className={`mb-6 ${h2}`}>Update your Tile.</h1>
          <p className={`m-0 max-w-[52ch] ${body}`}>
            New firmware adds features and fixes. Updates are free and install over your home WiFi in a few minutes.
          </p>
        </div>
      </section>

      {/* Current version */}
      <section aria-labelledby="version-h" className="border-t border-[#1E1E22] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px]">
          <h2 id="version-h" className={`mb-6 ${mono}`}>Latest version</h2>
          {latest ? (
            <div className={`${card} max-w-[760px]`}>
              <p className="m-0 font-mono text-[clamp(40px,6vw,64px)] font-medium leading-none tracking-[-0.03em]">{latest.version}</p>
              <p className={`mb-5 mt-3 ${mono}`}>Released {longDate(latest.date)}</p>
              <p className={`m-0 whitespace-pre-line ${body}`}>{latest.notes}</p>
            </div>
          ) : (
            <div className={`${card} max-w-[760px]`}>
              <p className={`m-0 ${body}`}>No updates have been released yet. Your Tile is on the latest version.</p>
            </div>
          )}
          {older.length > 0 && (
            <details className="group mt-6 max-w-[760px]">
              <summary className={`flex cursor-pointer list-none items-center justify-between py-2 ${mono} [&::-webkit-details-marker]:hidden`}>
                Earlier versions
                <span aria-hidden="true" className="text-[16px] text-[#F0641E] transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="m-0 mt-3 list-none p-0">
                {older.map((r) => (
                  <li key={r.version} className="border-t border-[#1E1E22] py-4">
                    <p className="m-0 font-mono text-[15px]">
                      {r.version} <span className="text-[#85858D]">· {longDate(r.date)}</span>
                    </p>
                    <p className={`mb-0 mt-1 whitespace-pre-line ${body}`}>{r.notes}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </section>

      {/* How to update */}
      <section aria-labelledby="steps-h" className="border-t border-[#1E1E22] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>How to update</p>
          <h2 id="steps-h" className={`mb-12 ${h2}`}>Three steps.</h2>
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className={card}>
                <p className="m-0 font-mono text-[13px] text-[#F0641E]">{s.n}</p>
                <h3 className={`mb-3.5 mt-5 ${h3}`}>{s.title}</h3>
                <p className={`m-0 ${body}`}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="ufaq-h" className="border-t border-[#1E1E22] px-6 py-20 sm:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12">
          <div className="flex-[1_1_300px]">
            <p className={eyebrow}>Questions</p>
            <h2 id="ufaq-h" className={h2}>Good to know.</h2>
          </div>
          <div className="min-w-0 flex-[2_1_480px]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[#1E1E22] py-[22px]">
                <summary className="flex cursor-pointer list-none justify-between gap-4 text-[17px] font-normal leading-[1.6] text-[#EDEDEF] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="font-mono text-[#F0641E] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className={`mt-3 max-w-[60ch] ${body}`}>{f.a}</p>
              </details>
            ))}
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`${waHref(legal.phone)}?text=${encodeURIComponent('Help with a Tile update')}`} className={pillOutline}>
                Get help on WhatsApp
              </a>
              <Link href="/products/tile" className={pillOutline}>
                Back to Tile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </TileShell>
  )
}
