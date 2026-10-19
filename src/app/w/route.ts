import { NextResponse } from 'next/server'

// The serial form on /tile/start without JavaScript: /w?serial=ddltl-2610-b-0001 → /w/DDLTL-2610-B-0001.
// (/w/[serial] itself shows a friendly message for anything that isn't a valid serial.)
export function GET(req: Request) {
  const url = new URL(req.url)
  const serial = (url.searchParams.get('serial') ?? '').trim().toUpperCase()
  const to = serial ? `/w/${encodeURIComponent(serial)}` : '/tile/start#warranty'
  return NextResponse.redirect(new URL(to, url), 303)
}
