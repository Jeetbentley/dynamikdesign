// Tile launch settings — the single source for prices, dates and launch mode.
// All Tile page copy reads from here; no prices or dates are hard-coded elsewhere.

export const tileLaunch = {
  mode: 'waitlist' as 'waitlist' | 'sales', // "sales" later restores a Buy flow
  foundersBatchSize: 50,
  foundersPrice: 2999,
  regularPrice: 3999,
  salesOpenDate: '2026-10-25', // YYYY-MM-DD
  showSpotsCounter: false, // true → shows the real signup count from the Apps Script
  colours: ['Orange'], // TODO: add others
  modes: ['Clock', 'Lamp', 'Canvas'],
}

export const TILE_URL = 'https://www.dynamikdesignlab.in/products/tile'
export const TILE_SHARE_URL = `${TILE_URL}?ref=share`

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "₹3,999" — deterministic on server and client (thousands grouping; fine below ₹1,00,000)
export const inr = (n: number) => `₹${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

// "25 October"
export const salesOpenLabel = (() => {
  const [, m, d] = tileLaunch.salesOpenDate.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]}`
})()

export const salesOpenLine = `Sales open to the list on ${salesOpenLabel}.`

export const shareText = `Just joined the Tile Founders Batch, a 64-pixel desk clock, lamp and canvas made in Pune by Dynamik Design Lab. First ${tileLaunch.foundersBatchSize} get it at ${inr(tileLaunch.foundersPrice)}. 👉 ${TILE_SHARE_URL}`
