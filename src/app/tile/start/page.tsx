import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import TileShell, { pillOrange, pillOutline } from '../TileShell'
import SerialForm from './SerialForm'
import { body, card, eyebrow, h2, h3, mono } from '@/app/products/tile/tileStyles'
import { legal, telHref, waHref } from '@/data/legal'

// Tile setup and help: the destination of the QR on Tile's box card. Plain server-rendered HTML;
// only the serial form uses JavaScript (and still works without it). Sections are linkable: /tile/start#setup etc.

export const metadata: Metadata = {
  title: 'Set up Tile · Dynamik Design Lab',
  description: 'Set up Tile on your WiFi, learn the modes, connect Alexa, update the firmware and check your warranty.',
  alternates: { canonical: '/tile/start' },
}

const SECTIONS = [
  ['setup', 'Setup'],
  ['modes', 'Modes'],
  ['alexa', 'Alexa'],
  ['updates', 'Updates'],
  ['warranty', 'Warranty'],
  ['safety', 'Safety'],
  ['privacy', 'Privacy'],
  ['help', 'Help'],
] as const

const ORANGE = '#FF6B1A'
const link = 'text-[#EDEDEF] underline decoration-[#34343A] underline-offset-4 hover:decoration-[#FF6B1A]'
const sectionCls = 'scroll-mt-[150px] border-t border-[#1E1E22] px-6 py-16 sm:py-24'
const wrap = 'mx-auto max-w-[880px]'
const kbd = 'font-mono text-[0.92em] text-[#EDEDEF]'

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={sectionCls}>
      <div className={wrap}>
        <p className={eyebrow}>{label}</p>
        <h2 id={`${id}-h`} className={`mb-8 ${h2}`}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 rounded-[20px] border border-[#1E1E22] bg-[#141416] px-5 py-4">
          <span className="pt-[3px] font-mono text-[13px]" style={{ color: ORANGE }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 text-[17px] leading-[1.55] text-[#EDEDEF]">{item}</div>
        </li>
      ))}
    </ol>
  )
}

// What Tile's screen shows during setup, drawn as small 8 × 8 pixel icons.
const GLYPHS: Record<string, { rows: string[]; color: string; pulse?: boolean }> = {
  ready: { rows: ['........', '........', '........', '...##...', '...##...', '........', '........', '........'], color: '#3D8BFF', pulse: true },
  connecting: { rows: ['..#o#o..', '.o....#.', '#......o', 'o......#', '#......o', 'o......#', '.#....o.', '..o#o#..'], color: '#F2A93B' },
  done: { rows: ['........', '.......#', '......##', '#....##.', '##..##..', '.####...', '..##....', '........'], color: '#3CCB7F' },
  failed: { rows: ['#......#', '##....##', '.##..##.', '..####..', '..####..', '.##..##.', '##....##', '#......#'], color: '#F0453A' },
}
function Glyph({ name }: { name: keyof typeof GLYPHS }) {
  const g = GLYPHS[name]
  return (
    <div aria-hidden="true" className={`grid w-[64px] flex-none grid-cols-8 gap-[2px] rounded-[10px] bg-[#1C1D20] p-[5px] ${g.pulse ? 'motion-safe:animate-pulse' : ''}`}>
      {g.rows.join('').split('').map((c, i) => (
        <span
          key={i}
          className="aspect-square rounded-[1.5px]"
          style={{ background: c === '#' ? g.color : c === 'o' ? `${g.color}55` : '#2A2B30' }}
        />
      ))}
    </div>
  )
}

function EwasteIcon() {
  // Crossed-out wheeled bin (WEEE symbol)
  return (
    <svg width="44" height="54" viewBox="0 0 44 54" role="img" aria-label="Crossed-out wheeled bin: do not dispose of with household waste" className="flex-none">
      <g fill="none" stroke="#EDEDEF" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M9 12h26l-2.6 28H11.6z" />
        <path d="M6 12h32" />
        <path d="M17 12V8h10v4" />
        <path d="M15 18l1.4 16M22 18v16M29 18l-1.4 16" />
        <circle cx="13" cy="44" r="3" />
      </g>
      <path d="M4 6l36 42M40 6L4 48" stroke="#EDEDEF" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="6" y="50" width="32" height="3" fill="#EDEDEF" />
    </svg>
  )
}

const FAQS: [string, string][] = [
  ['My WiFi is 5 GHz only', 'Tile needs 2.4 GHz WiFi. Most routers have both: turn on the 2.4 GHz band in your router’s settings, or ask your internet provider to.'],
  ['Tile shows a red cross', 'It couldn’t join your WiFi. Check the password and that the network is 2.4 GHz, then set it up again.'],
  [
    'The app can’t find Tile',
    'Keep Bluetooth on and your phone within 2 m of Tile while it shows the blue dot. Or use the iPhone hotspot method: it works on Android too.',
  ],
  ['How do I change WiFi?', 'Turn off the old network or change its password. After about a minute without WiFi, Tile turns its setup hotspot back on (Bluetooth setup after about 5 minutes). Then set it up again.'],
  ['Does Tile need internet?', 'For the clock time and Alexa, yes. If your WiFi is down, Tile takes the time from your phone when you open the app.'],
  ['Is the adapter included?', 'No. Use any 5V ⎓ 2A phone adapter with the USB-C cable in the box.'],
]

export default function TileStartPage() {
  const whatsapp = waHref(legal.phone)
  return (
    <TileShell>
      {/* Hero */}
      <section className="px-6 pb-14 pt-16 sm:pb-20 sm:pt-24">
        <div className={wrap}>
          <p className={eyebrow}>Tile · Help</p>
          <h1 className={`mb-5 ${h2}`}>Set up Tile</h1>
          <p className={`mb-8 max-w-[44ch] ${body}`}>Five minutes, one WiFi password. Pick your phone.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#android" className={`${pillOrange} min-h-[60px] text-[15px]`}>
              Android: get the app
            </a>
            <a href="#iphone" className={`${pillOutline} min-h-[60px] text-[15px]`}>
              iPhone: no app needed
            </a>
          </div>
        </div>
      </section>

      {/* Section nav: sticky under the site navbar, scrolls sideways on phones */}
      <nav
        aria-label="Sections"
        className="sticky z-20 border-y border-[#1E1E22] bg-[rgba(11,11,12,0.88)] backdrop-blur-[12px]"
        style={{ top: 'var(--site-nav-offset, 68px)' }}
      >
        <ul className="mx-auto flex max-w-[880px] list-none gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map(([id, label]) => (
            <li key={id} className="flex-none">
              <a href={`#${id}`} className="inline-flex min-h-[40px] items-center rounded-full px-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-[#C9C9CF] hover:bg-[#1A1A1D]">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="setup" label="Setup" title="Get Tile online.">
        <h3 className={`mb-4 ${h3}`}>Before you start</h3>
        <ul className={`m-0 mb-12 flex list-disc flex-col gap-2 pl-5 marker:text-[#55555C] ${body}`}>
          <li>The USB-C cable (in the box) and any 5V ⎓ 2A phone adapter (not included).</li>
          <li>2.4 GHz WiFi. Most routers have it; 5 GHz-only networks won’t work.</li>
        </ul>

        <h3 className={`mb-4 ${h3}`}>What Tile’s screen shows</h3>
        <ul className="m-0 mb-12 grid list-none gap-3 p-0 sm:grid-cols-2">
          {(
            [
              ['ready', 'Pulsing blue dot', 'Ready to set up.'],
              ['connecting', 'Amber dot running in a ring', 'Connecting.'],
              ['done', 'Green tick', 'Done.'],
              ['failed', 'Red cross', 'Didn’t connect. Check the WiFi password and that it’s 2.4 GHz, then try again.'],
            ] as const
          ).map(([g, t, d]) => (
            <li key={g} className="flex items-center gap-4 rounded-[20px] border border-[#1E1E22] bg-[#141416] p-4">
              <Glyph name={g} />
              <div>
                <p className="m-0 text-[16px] font-semibold text-[#EDEDEF]">{t}</p>
                <p className="m-0 mt-1 text-[15px] leading-[1.5] text-[#A3A3AB]">{d}</p>
              </div>
            </li>
          ))}
        </ul>

        <div id="android" className="mb-12 scroll-mt-[150px]">
          <h3 className={`mb-4 ${h3}`}>Android</h3>
          <Steps
            items={[
              <>
                Download the Tile app.
                <div className="mt-3">
                  <a href="/tile/app/tile.apk" className={`${pillOrange} px-6`}>
                    Download app
                  </a>
                </div>
                <p className="m-0 mt-3 text-[14px] text-[#A3A3AB]">Allow installs from this source if Android asks.</p>
              </>,
              <>Open it, keep Bluetooth on, choose your home WiFi and enter the password.</>,
              <>Green tick, then the time appears.</>,
            ]}
          />
        </div>

        <div id="iphone" className="mb-12 scroll-mt-[150px]">
          <h3 className={`mb-4 ${h3}`}>iPhone</h3>
          <Steps
            items={[
              <>
                Settings › Wi-Fi › join <span className={kbd}>Tile-xxxx</span> (the last 4 characters differ per Tile).
              </>,
              <>
                The setup page opens by itself. If not, open <span className={kbd}>192.168.4.1</span> in Safari.
              </>,
              <>Pick your home WiFi and enter the password.</>,
              <>Green tick, then the time.</>,
            ]}
          />
        </div>

        <div className={`${card} mb-4`}>
          <h3 className={`mb-3 ${h3}`}>Changed router or WiFi password?</h3>
          <p className={`m-0 ${body}`}>
            Tile turns its setup hotspot back on after about a minute without WiFi, and Bluetooth setup after about 5 minutes.
            Then set it up again as above.
          </p>
        </div>
        <div className={card}>
          <h3 className={`mb-3 ${h3}`}>Factory reset</h3>
          <p className={`m-0 ${body}`}>
            Plug in and unplug within 5 seconds, twice. Plug in a third time. Red flashes, then a white wipe: all settings are
            cleared. The serial number and warranty stay.
          </p>
        </div>
      </Section>

      <Section id="modes" label="Modes" title="What Tile does.">
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {[
            ['Clock', 'Big pixel digits you can read across the room.'],
            ['Lamp', 'A soft light in the colour you choose.'],
            ['Canvas', 'Draw pixel art in the app and Tile shows it.'],
            ['Focus', 'A focus timer and a busy light for your desk.'],
          ].map(([t, d]) => (
            <li key={t} className={card}>
              <h3 className={`mb-2 ${h3}`}>{t}</h3>
              <p className={`m-0 ${body}`}>{d}</p>
            </li>
          ))}
        </ul>
        <p className={`mt-6 ${body}`}>Night dimming and brightness are in the app.</p>
      </Section>

      <Section id="alexa" label="Alexa" title="Talk to Tile.">
        <p className={`m-0 mb-6 ${body}`}>
          Tile works with Alexa directly on your home WiFi. No skill needed. Say <span className={kbd}>“Alexa, discover devices”</span>.
        </p>
        <dl className={`${card} m-0 grid gap-x-8 gap-y-3 sm:grid-cols-[170px_1fr]`}>
          {[
            ['Tile', 'Colour light: on/off, colour, brightness'],
            ['Tile Clock', 'Switch to the clock'],
            ['Tile Lamp', 'Switch to the lamp'],
            ['Tile Focus', 'Switch to focus'],
            ['Tile Busy', 'Switch on the busy light'],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-mono text-[15px] text-[#EDEDEF]">“{k}”</dt>
              <dd className="m-0 mb-2 text-[15px] text-[#A3A3AB] sm:mb-0">{v}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-6 ${body}`}>
          Renamed Tile in the app (for example “Desk”)? The names become “Desk Tile”, “Desk Tile Clock” and so on. Run discovery
          again after renaming.
        </p>
      </Section>

      <Section id="updates" label="Updates" title="Keep Tile current.">
        <Steps items={[<>App › Device › Check for updates.</>, <>Tap Install. Keep Tile plugged in.</>, <>Tile shows a progress bar, restarts and keeps all your settings.</>]} />
        <p className={`mt-6 ${body}`}>
          Updates are signed by Dynamik Design Lab. Tile refuses anything else.{' '}
          <Link href="/tile/update" className={link}>
            What’s new in each update
          </Link>
        </p>
      </Section>

      <Section id="warranty" label="Warranty" title="12 months.">
        <p className={`m-0 mb-6 text-[17px] leading-[1.6] text-[#EDEDEF]`}>
          From the day you first set Tile up on WiFi (and at most 18 months from the date we dispatched it).
        </p>
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className={card}>
            <h3 className={`mb-3 ${h3}`}>Covered</h3>
            <p className={`m-0 ${body}`}>Faults in the LEDs, electronics and build under normal use. We repair or replace.</p>
          </div>
          <div className={card}>
            <h3 className={`mb-3 ${h3}`}>Not covered</h3>
            <p className={`m-0 ${body}`}>Drops, liquid, an opened case, power surges, scratches and normal wear.</p>
          </div>
        </div>
        <h3 className={`mb-2 ${h3}`}>Check your warranty</h3>
        <p className={`m-0 ${body}`}>
          Scan the QR on the box, or enter your serial. It’s printed under the base and in App › Device.
        </p>
        <SerialForm />
        <h3 className={`mb-2 mt-12 ${h3}`}>To claim</h3>
        <p className={`m-0 ${body}`}>
          <a href={`${whatsapp}?text=${encodeURIComponent('Warranty claim')}`} className={link}>
            WhatsApp
          </a>{' '}
          or{' '}
          <a href={`mailto:${legal.email}?subject=${encodeURIComponent('Warranty claim')}`} className={link}>
            email us
          </a>{' '}
          with the serial and your invoice. Keep your invoice: it’s your proof of purchase.
        </p>
      </Section>

      <Section id="safety" label="Safety" title="Use it well.">
        <ul className={`m-0 flex list-disc flex-col gap-2 pl-5 marker:text-[#55555C] ${body}`}>
          <li>Use a 5V ⎓ 2A adapter from a trusted, BIS-marked brand.</li>
          <li>Indoors only. Keep it dry and away from heaters and direct sun.</li>
          <li>Keep the vents on the back uncovered.</li>
          <li>Don’t open the case: there are no user-serviceable parts.</li>
          <li>Lamp mode is bright: don’t stare into it up close.</li>
          <li>Not a toy. Keep the cable away from small children and pets.</li>
          <li>Clean with a dry, soft cloth.</li>
        </ul>
        <div className={`${card} mt-8 flex items-center gap-5`}>
          <EwasteIcon />
          <p className={`m-0 ${body}`}>
            Don’t throw Tile away with household waste. Give it to an authorised e-waste collector, or{' '}
            <a href={`${whatsapp}?text=${encodeURIComponent('E-waste: please take back my Tile')}`} className={link}>
              WhatsApp us
            </a>{' '}
            and we’ll take it back.
          </p>
        </div>
      </Section>

      <Section id="privacy" label="Privacy" title="Your data.">
        <ul className={`m-0 flex list-disc flex-col gap-2 pl-5 marker:text-[#55555C] ${body}`}>
          <li>Your WiFi password stays on Tile.</li>
          <li>Alexa control runs locally on your home network.</li>
          <li>
            Once, during setup, Tile sends its serial number and hardware ID to dynamikdesignlab.in to start your warranty.
            Nothing personal: no name, location or WiFi details.
          </li>
          <li>When you tap Check for updates, Tile downloads the update file from our site.</li>
        </ul>
        <p className={`mt-6 ${body}`}>
          <Link href="/privacy" className={link}>
            Read the full privacy policy
          </Link>
        </p>
      </Section>

      <Section id="help" label="Help" title="We’re here.">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsapp} className={`${pillOrange} min-h-[60px] text-[15px]`}>
            WhatsApp {legal.phone}
          </a>
          <a href={`mailto:${legal.email}`} className={`${pillOutline} min-h-[60px] normal-case tracking-normal text-[15px]`}>
            {legal.email}
          </a>
        </div>
        <p className={`m-0 mb-12 ${mono}`}>{legal.supportHours}</p>

        <h3 className={`mb-2 ${h3}`}>Questions</h3>
        <div className="mb-12">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group border-t border-[#1E1E22] py-[18px]">
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-[17px] leading-[1.6] text-[#EDEDEF] [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="font-mono transition-transform group-open:rotate-45" style={{ color: ORANGE }}>
                  +
                </span>
              </summary>
              <p className={`mb-0 mt-2 max-w-[60ch] ${body}`}>{a}</p>
            </details>
          ))}
        </div>

        <div className={card}>
          <p className={`m-0 mb-3 ${mono}`}>Maker</p>
          <p className={`m-0 ${body}`}>
            <span className="text-[#EDEDEF]">{legal.businessName}</span>
            <br />
            Prop. {legal.proprietor}
            <br />
            {legal.registeredAddress}
            <br />
            <a href={telHref(legal.phone)} className={link}>
              {legal.phone}
            </a>
          </p>
          <p className={`m-0 mt-4 ${mono}`}>Made in India</p>
        </div>
      </Section>
    </TileShell>
  )
}
