// Tile launch settings — the single source for prices, dates and launch mode.
// All Tile page copy reads from here; no prices or dates are hard-coded elsewhere.

export const tileLaunch = {
  mode: 'waitlist' as 'waitlist' | 'sales', // "sales" later restores a Buy flow
  foundersBatchSize: 101,
  foundersPrice: 2999,
  regularPrice: 3999,
  salesOpenDate: '2026-10-20', // YYYY-MM-DD
  shipStartDate: '2026-10-23', // founders batch dispatch begins
  foundersDispatchBy: '2026-10-31', // all founders batch orders dispatched by
  showSpotsCounter: false, // true → shows the real signup count from the Apps Script
  colours: ['Orange'], // TODO: add others
  modes: ['Clock', 'Lamp', 'Canvas', 'Focus'],
}

export const TILE_URL = 'https://www.dynamikdesignlab.in/products/tile'
export const TILE_SHARE_URL = `${TILE_URL}?ref=share`

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "₹3,999" — deterministic on server and client (thousands grouping; fine below ₹1,00,000)
export const inr = (n: number) => `₹${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

const parseDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}
// "2026-10-20" → "20 October"
export const dayLabel = (iso: string) => {
  const { m, d } = parseDate(iso)
  return `${d} ${MONTHS[m - 1]}`
}
// Day before/after, as YYYY-MM-DD (UTC, so it's the same on server and client)
const shiftDay = (iso: string, days: number) => {
  const { y, m, d } = parseDate(iso)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}
// "21–22 October", or "31 October–1 November" across months
const rangeLabel = (from: string, to: string) => {
  const a = parseDate(from)
  const b = parseDate(to)
  if (from === to) return dayLabel(from)
  return a.m === b.m ? `${a.d}–${b.d} ${MONTHS[b.m - 1]}` : `${dayLabel(from)}–${dayLabel(to)}`
}

export const salesOpenLabel = dayLabel(tileLaunch.salesOpenDate) // "20 October"
export const shipStartLabel = dayLabel(tileLaunch.shipStartDate) // "23 October"
export const foundersDispatchByLabel = dayLabel(tileLaunch.foundersDispatchBy) // "31 October"
// Days between sales opening and dispatch, used for confirmation and quality checks: "21–22 October"
export const qualityCheckLabel = rangeLabel(shiftDay(tileLaunch.salesOpenDate, 1), shiftDay(tileLaunch.shipStartDate, -1))

export const salesOpenLine = `Sales open ${salesOpenLabel}. The first ${tileLaunch.foundersBatchSize} founders' orders ship from ${shipStartLabel}, in the order they're placed.`
export const shipsFromLine = `Ships from ${shipStartLabel}`

export const shareText = `Just joined the Tile Founders Batch, a 64-pixel desk clock, lamp and canvas made in India by Dynamik Design Lab. First ${tileLaunch.foundersBatchSize} get it at ${inr(tileLaunch.foundersPrice)}. 👉 ${TILE_SHARE_URL}`
