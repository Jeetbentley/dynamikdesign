import 'server-only'

// Live warranty status from the Tile warranty sheet (Google Apps Script web app).
// TILE_WARRANTY_API is a server-only env var: the /exec URL. It is never sent to the browser.
// Any problem (not configured, timeout, HTTP error, unexpected JSON) returns null, and the page
// falls back to its static content.

export type WarrantyStatus =
  | { kind: 'bad_serial' }
  | { kind: 'not_found'; serial: string }
  | {
      kind: 'genuine'
      serial: string
      colour: string
      manufactured: string // YYYY-MM
      months: number
      status: 'not_activated' | 'active' | 'expired'
      startsFrom: 'setup' | 'delivery' | 'invoice' | null
      start: string | null // YYYY-MM-DD
      end: string | null
      daysLeft: number | null
    }

const STATUSES = ['not_activated', 'active', 'expired'] as const
const isDate = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)

function parse(data: unknown): WarrantyStatus | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (d.ok === false) return d.error === 'bad_serial' ? { kind: 'bad_serial' } : null
  if (d.ok !== true || typeof d.serial !== 'string') return null
  if (d.genuine === false) return { kind: 'not_found', serial: d.serial }
  if (d.genuine !== true) return null
  if (typeof d.colour !== 'string' || typeof d.manufactured !== 'string' || !/^\d{4}-\d{2}$/.test(d.manufactured)) return null
  if (typeof d.months !== 'number' || !STATUSES.includes(d.status as (typeof STATUSES)[number])) return null
  const status = d.status as (typeof STATUSES)[number]
  const startsFrom = d.startsFrom === 'setup' || d.startsFrom === 'delivery' || d.startsFrom === 'invoice' ? d.startsFrom : null
  const start = isDate(d.start) ? d.start : null
  const end = isDate(d.end) ? d.end : null
  const daysLeft = typeof d.daysLeft === 'number' && Number.isFinite(d.daysLeft) ? Math.max(0, Math.round(d.daysLeft)) : null
  // Active and expired need their dates; without them the status can't be shown truthfully.
  if (status === 'active' && (!start || !end || daysLeft === null)) return null
  if (status === 'expired' && !end) return null
  return { kind: 'genuine', serial: d.serial, colour: d.colour, manufactured: d.manufactured, months: d.months, status, startsFrom, start, end, daysLeft }
}

export async function getWarrantyStatus(serial: string): Promise<WarrantyStatus | null> {
  const api = process.env.TILE_WARRANTY_API
  if (!api) return null
  try {
    const url = new URL(api)
    url.searchParams.set('action', 'warranty')
    url.searchParams.set('serial', serial)
    const res = await fetch(url, {
      redirect: 'follow', // Apps Script answers via a redirect to googleusercontent.com
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    return parse(await res.json())
  } catch {
    return null
  }
}
