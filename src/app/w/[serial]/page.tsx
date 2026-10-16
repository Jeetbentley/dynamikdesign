import type { Metadata } from 'next'
import Link from 'next/link'
import TileShell, { pillOrange, pillOutline } from '@/app/tile/TileShell'
import { body, card, eyebrow, h2, mono } from '@/app/products/tile/tileStyles'
import { legal, waHref } from '@/data/legal'
import { getWarrantyStatus, type WarrantyStatus } from './warrantyStatus'

// Warranty page behind the QR code on every Tile box and device: /w/DDLTL-YYMM-C-NNNN.
// The terms and contact options are derived from the serial; live status (genuine, active, days left)
// comes from the warranty sheet when it's reachable, and the page works without it.
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

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const utc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}
// "2027-10-24" → "24 Oct 2027"
const shortDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${SHORT_MONTHS[m - 1]} ${y}`
}
// "2026-10" → "October 2026"
const monthYear = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

const ORANGE = '#FF6B1A'

function GenuineBadge() {
  return (
    <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#34343A] py-1.5 pl-2 pr-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#EDEDEF]">
      <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: ORANGE }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="3.2">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      Genuine Tile
    </p>
  )
}

// The live status block at the top of the page.
function LiveStatus({ status }: { status: Extract<WarrantyStatus, { kind: 'genuine' | 'not_found' }> }) {
  if (status.kind === 'not_found') {
    return (
      <>
        <h1 className={`mb-5 ${h2}`}>We couldn’t find this serial number.</h1>
        <p className={`m-0 max-w-[48ch] ${body}`}>Check the number on the sticker under your Tile, or contact us.</p>
        <p className={`mb-0 mt-4 font-mono text-[15px] tracking-[0.04em] text-[#EDEDEF]`}>{status.serial.toUpperCase()}</p>
      </>
    )
  }
  if (status.status === 'active') {
    const total = Math.max(1, Math.round((utc(status.end!) - utc(status.start!)) / 86400000) + 1)
    const left = status.daysLeft!
    const share = Math.min(1, Math.max(0, left / total))
    return (
      <>
        <GenuineBadge />
        <h1 className={`mb-4 ${h2}`}>Warranty active</h1>
        <p className="m-0 text-[clamp(20px,2.4vw,24px)] font-semibold">Valid until {shortDate(status.end!)}</p>
        <p className="mb-0 mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[14px] uppercase tracking-[0.1em] text-[#C9C9CF]">
          <span>
            {left} {left === 1 ? 'day' : 'days'} left
          </span>
          {left <= 30 && <span style={{ color: ORANGE }}>Expires soon</span>}
        </p>
        <div
          role="progressbar"
          aria-label="Warranty time remaining"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={left}
          className="mt-5 h-[6px] w-full max-w-[520px] overflow-hidden rounded-full"
          style={{ background: '#1A1A1A' }}
        >
          <div className="h-full rounded-full" style={{ width: `${share * 100}%`, background: ORANGE }} />
        </div>
        <p className={`mb-0 mt-3 ${mono}`}>
          Started {shortDate(status.start!)}
          {status.startsFrom && ` (${status.startsFrom} date)`}
        </p>
      </>
    )
  }
  if (status.status === 'expired') {
    return (
      <>
        <GenuineBadge />
        <h1 className={`mb-4 ${h2}`}>Warranty expired</h1>
        <p className="m-0 text-[clamp(20px,2.4vw,24px)] font-semibold">on {shortDate(status.end!)}</p>
        <p className={`mb-0 mt-3 max-w-[48ch] ${body}`}>Paid repairs are available through customer care.</p>
      </>
    )
  }
  return (
    <>
      <GenuineBadge />
      <h1 className={`mb-4 ${h2}`}>Warranty not activated yet</h1>
      <p className={`m-0 max-w-[48ch] text-[17px] leading-[1.6] text-[#EDEDEF]`}>
        Your {status.months}-month warranty starts on the day it’s delivered.
      </p>
      <p className={`mb-0 mt-3 ${mono}`}>
        Made {monthYear(status.manufactured)} · {status.colour} chin
      </p>
    </>
  )
}

const NOT_COVERED = [
  'Water or other liquid damage',
  'Drops and other physical damage',
  'Opening the case',
  'Damage from fast chargers or non-standard power adapters',
]

export default async function WarrantyPage({ params }: { params: { serial: string } }) {
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

  // Live status. bad_serial, errors and timeouts fall back to the static page with a short note.
  const live = await getWarrantyStatus(s.serial)
  const shown = live && (live.kind === 'genuine' || live.kind === 'not_found') ? live : null
  const genuine = shown?.kind === 'genuine' ? shown : null

  const rows: [string, string][] = [
    ['Serial', s.serial],
    ['Product', 'Tile'],
    ['Chin colour', genuine?.colour ?? s.chin],
    ['Manufactured', genuine ? monthYear(genuine.manufactured) : s.made],
  ]
  return (
    <TileShell>
      <section className="px-6 pb-28 pt-20 sm:pt-28">
        <div className="mx-auto max-w-[760px]">
          <p className={eyebrow}>Warranty</p>
          {shown ? (
            <div className="mb-12">
              <LiveStatus status={shown} />
            </div>
          ) : (
            <>
              <h1 className={`mb-4 ${h2}`}>Your Tile.</h1>
              <p className={`mb-10 ${mono}`}>Live warranty status is unavailable right now</p>
            </>
          )}

          {/* The serial's details; hidden when the serial isn't one of ours, so nothing contradicts that message */}
          {shown?.kind !== 'not_found' && (
            <dl className={`${card} m-0 grid gap-x-8 gap-y-4 sm:grid-cols-[180px_1fr]`}>
              {rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className={`pt-[3px] ${mono}`}>{k}</dt>
                  <dd className={`m-0 text-[18px] ${k === 'Serial' ? 'font-mono tracking-[0.04em]' : ''}`}>{v}</dd>
                </div>
              ))}
            </dl>
          )}

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
