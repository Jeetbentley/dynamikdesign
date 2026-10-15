import type { Metadata } from 'next'
import Link from 'next/link'
import TileShell, { pillOrange, pillOutline } from '@/app/tile/TileShell'
import { body, card, eyebrow, h2, mono } from '@/app/products/tile/tileStyles'
import { legal, waHref } from '@/data/legal'

// Warranty page behind the QR code on every Tile box and device: /w/DDLTL-YYMM-C-NNNN.
// No database: everything shown is derived from the serial itself.
const SERIAL = /^DDLTL-\d{4}-[A-Z]-\d{4}$/
const CHIN: Record<string, string> = { B: 'Blue', P: 'Purple' }
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function parseSerial(raw: string) {
  let serial = raw
  try {
    serial = decodeURIComponent(raw)
  } catch {}
  serial = serial.trim().toUpperCase()
  if (!SERIAL.test(serial)) return { serial, ok: false as const }
  const [, yymm, colour] = serial.split('-')
  const month = Number(yymm.slice(2))
  if (month < 1 || month > 12 || !CHIN[colour]) return { serial, ok: false as const }
  return { serial, ok: true as const, chin: CHIN[colour], made: `${MONTHS[month - 1]} ${2000 + Number(yymm.slice(0, 2))}` }
}

export function generateMetadata({ params }: { params: { serial: string } }): Metadata {
  const { serial, ok } = parseSerial(params.serial)
  return {
    title: ok ? `Tile ${serial} · Warranty — Dynamik Design Lab` : 'Serial not recognised — Dynamik Design Lab',
    robots: { index: false, follow: false },
  }
}

const NOT_COVERED = [
  'Water or other liquid damage',
  'Drops and other physical damage',
  'Opening the case',
  'Damage from fast chargers or non-standard power adapters',
]

export default function WarrantyPage({ params }: { params: { serial: string } }) {
  const s = parseSerial(params.serial)
  const message = `Warranty: ${s.serial}`
  const whatsapp = `${waHref(legal.phone)}?text=${encodeURIComponent(message)}`
  const mail = `mailto:${legal.email}?subject=${encodeURIComponent(message)}`

  if (!s.ok) {
    return (
      <TileShell>
        <section className="px-6 pb-28 pt-20 sm:pt-28">
          <div className="mx-auto max-w-[760px]">
            <p className={eyebrow}>Warranty</p>
            <h1 className={`mb-6 ${h2}`}>Serial not recognised.</h1>
            <p className={`mb-10 max-w-[52ch] ${body}`}>
              We couldn’t read that serial. It should look like DDLTL-2610-B-0001 and is printed under the QR code on your
              Tile and its box. Scan the code again, or message us and we’ll help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`${waHref(legal.phone)}?text=${encodeURIComponent('Warranty: help finding my serial')}`} className={pillOrange}>
                Get help on WhatsApp
              </a>
              <Link href="/tile/update" className={pillOutline}>
                Update your Tile
              </Link>
            </div>
          </div>
        </section>
      </TileShell>
    )
  }

  const rows: [string, string][] = [
    ['Serial', s.serial],
    ['Product', 'Tile'],
    ['Chin colour', s.chin],
    ['Manufactured', s.made],
  ]
  return (
    <TileShell>
      <section className="px-6 pb-28 pt-20 sm:pt-28">
        <div className="mx-auto max-w-[760px]">
          <p className={eyebrow}>Warranty</p>
          <h1 className={`mb-10 ${h2}`}>Your Tile.</h1>

          <dl className={`${card} m-0 grid gap-x-8 gap-y-4 sm:grid-cols-[180px_1fr]`}>
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className={`pt-[3px] ${mono}`}>{k}</dt>
                <dd className={`m-0 text-[18px] ${k === 'Serial' ? 'font-mono tracking-[0.04em]' : ''}`}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <h2 className={`mb-3 ${mono}`}>Warranty</h2>
            <p className={`m-0 max-w-[56ch] text-[17px] leading-[1.6] text-[#EDEDEF]`}>
              {legal.warrantyMonths}-month warranty from the date of delivery, against manufacturing defects.
            </p>
          </div>

          <div className="mt-10">
            <h2 className={`mb-3 ${mono}`}>Not covered</h2>
            <ul className={`m-0 list-disc pl-5 marker:text-[#55555C] ${body}`}>
              {NOT_COVERED.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className={`mt-4 ${body}`}>
              <Link href="/warranty" className="text-[#EDEDEF] underline decoration-[#34343A] underline-offset-4 hover:decoration-[#F0641E]">
                Read the full warranty
              </Link>
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href={whatsapp} className={pillOrange}>
              Claim warranty / get help
            </a>
            <a href={mail} className={pillOutline}>
              Email us
            </a>
            <Link href="/tile/update" className={pillOutline}>
              Update your Tile
            </Link>
          </div>
        </div>
      </section>
    </TileShell>
  )
}
