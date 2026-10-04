'use client'

import Link from 'next/link'
import { useState, type CSSProperties } from 'react'

// Fill these in before launch — they appear in several places on the page.
const PRICE = '[PRICE]'
const SHIPS_IN = '[X]'
const WARRANTY = '[WARRANTY]'

const ORANGE = '#F0641E'
const ORANGE_DARK = '#C94C10'
const HOUR = '#A56BF2'
const MIN = '#F39AD6'
const OFF = '#DCDFE3'
const LAMP = '#FFE3B3'

type Cell = { bg: string; glow: string }
type Mode = 'clock' | 'lamp' | 'canvas'

const glow = (c: string) => `0 0 14px -2px ${c}`

const CLOCK_MAP: number[] = (() => {
  const map = Array(64).fill(0)
  const hourPx = [[0,1],[1,0],[1,1],[2,1],[3,1],[0,4],[1,4],[1,5],[1,6],[2,4],[2,6],[3,5],[3,6]]
  const minPx = [[4,0],[4,1],[4,2],[5,0],[6,1],[7,0],[7,1],[4,5],[4,6],[4,7],[5,7],[6,6],[7,6]]
  hourPx.forEach(([y, x]) => (map[y * 8 + x] = 1))
  minPx.forEach(([y, x]) => (map[y * 8 + x] = 2))
  return map
})()

const clockCells = (h: string, m: string, off: string): Cell[] =>
  CLOCK_MAP.map((v) => {
    const c = v === 1 ? h : v === 2 ? m : null
    return { bg: c ?? off, glow: c ? glow(c) : 'none' }
  })

const HEART = ['........', '.##..##.', '########', '########', '.######.', '..####..', '...##...', '........']

const cellsFor = (mode: Mode): Cell[] => {
  if (mode === 'lamp') return Array.from({ length: 64 }, () => ({ bg: LAMP, glow: glow(LAMP) }))
  if (mode === 'canvas')
    return HEART.join('').split('').map((ch) => (ch === '#' ? { bg: MIN, glow: glow(MIN) } : { bg: OFF, glow: 'none' }))
  return clockCells(HOUR, MIN, OFF)
}

const MODES: { id: Mode; label: string; n: string; text: string; points: string[] }[] = [
  {
    id: 'clock', label: 'Clock', n: '01',
    text: 'Big, chunky digits you can read from across the room, in your colours.',
    points: ['Glance and Tetris faces', '12 or 24 hour', 'Amber, Ice, Mono or your own colours'],
  },
  {
    id: 'lamp', label: 'Lamp', n: '02',
    text: 'A soft desk light, warm to cool white or any colour you like.',
    points: ['Warm, cool and daylight whites', 'Focus, relax and night light presets', 'Candle, rain and other glow effects'],
  },
  {
    id: 'canvas', label: 'Canvas', n: '03',
    text: 'Draw in the app and Tile shows it. Chain frames into a little animation.',
    points: ['Up to 8 frames', '12 animation effects', 'Saved on Tile, even after a power cut'],
  },
]

const BRUSHES = [
  { c: '#A56BF2', name: 'Purple' },
  { c: '#F39AD6', name: 'Pink' },
  { c: '#F0641E', name: 'Orange' },
  { c: '#FFE3B3', name: 'Warm white' },
]

const STATS = [
  { value: '64', label: 'RGB pixels', color: '#EDEDEF' },
  { value: '3', label: 'modes', color: '#EDEDEF' },
  { value: '5%', label: 'night brightness', color: '#FF7A3D' },
  { value: '0', label: 'accounts needed', color: '#EDEDEF' },
]

const SPECS = [
  { k: 'display', v: '64 RGB pixels, 8 × 8, frosted diffuser' },
  { k: 'modes', v: 'Clock, Lamp, Canvas' },
  { k: 'connectivity', v: '2.4 GHz WiFi, works offline' },
  { k: 'control', v: 'Phone browser, Android app, Alexa, Home Assistant' },
  { k: 'power', v: 'USB-C, 5 V [CONFIRM ADAPTER RATING]' },
  { k: 'size', v: '[W × H × D] mm, [WEIGHT] g' },
  { k: 'in the box', v: 'Tile, USB-C cable, quick start card [CONFIRM]' },
  { k: 'made in', v: 'Pune, India' },
]

const FAQS = [
  { q: 'Does Tile need internet?', a: 'No. On home WiFi it sets its own time. Without WiFi, your phone connects to Tile directly and sends it the time.' },
  { q: 'Does it work with iPhone?', a: 'Yes, through Safari. The Tile app is Android-only for now.' },
  { q: 'How do I reset it?', a: 'Plug it in and unplug it within 5 seconds, twice. Plug it in a third time and it starts fresh.' },
  { q: "What's the warranty?", a: WARRANTY },
]

const mono = 'font-mono text-[13px] text-[#85858D]'
const eyebrow = 'mb-[18px] font-mono text-[13px] text-[#F0641E]'
const h2 = 'font-bold tracking-[-0.045em] leading-[0.98] text-[clamp(40px,6vw,80px)]'
const card = 'rounded-[28px] border border-[#1E1E22] bg-[#141416] p-10 box-border min-w-0'

function Device({
  cells, width, body, shade, screen, pad, screenPad, gap, radius, screenRadius, cellRadius, chin, button, style,
}: {
  cells: Cell[]; width: number; body: string; shade: string; screen: string; pad: number; screenPad: number
  gap: number; radius: number; screenRadius: number; cellRadius: number; chin: number
  button?: { w: number; h: number }; style?: CSSProperties
}) {
  return (
    <div
      style={{
        position: 'relative', width: '100%', maxWidth: width, background: body, borderRadius: radius,
        padding: `${pad}px ${pad}px 0`, boxShadow: `inset 0 -${Math.round(pad / 4)}px 0 ${shade}`, ...style,
      }}
    >
      <div
        style={{
          background: screen, borderRadius: screenRadius, padding: screenPad,
          display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap,
        }}
      >
        {cells.map((c, i) => (
          <div
            key={i}
            style={{ aspectRatio: '1', borderRadius: cellRadius, background: c.bg, boxShadow: c.glow, transition: 'background-color 0.3s' }}
          />
        ))}
      </div>
      <div style={{ height: chin, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {button && <span style={{ width: button.w, height: button.h, borderRadius: button.h / 2, background: shade }} />}
      </div>
    </div>
  )
}

export default function TileProduct() {
  const [mode, setMode] = useState<Mode>('clock')
  const [brush, setBrush] = useState(0)
  const [paint, setPaint] = useState<number[]>(() => Array(64).fill(-1))

  const current = MODES.find((m) => m.id === mode)!
  const heroCells = clockCells(HOUR, MIN, OFF)
  const nightCells = clockCells('#FF4A00', '#A81E00', '#33363C')

  const togglePixel = (i: number) =>
    setPaint((p) => {
      const next = p.slice()
      next[i] = next[i] === brush ? -1 : brush
      return next
    })

  return (
    <div className="font-grotesk bg-[#0B0B0C] text-[#EDEDEF] min-h-screen [&_a:hover]:text-[#F0641E]">
      {/* Product sub-nav */}
      <div className="sticky top-[68px] z-30 border-b border-[#1E1E22] bg-[rgba(11,11,12,0.82)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-6">
          <a href="#top" aria-label="Tile" className="flex items-center gap-2.5 text-[21px] font-bold tracking-[-0.03em] text-[#EDEDEF] no-underline">
            <span className="grid grid-cols-[repeat(3,7px)] gap-[2px]">
              {[1, 1, 1, 0, 1, 0].map((on, i) => (
                <span key={i} className="h-[7px] w-[7px] rounded-[1.5px]" style={{ background: on ? ORANGE : 'transparent' }} />
              ))}
            </span>
            tile
          </a>
          <nav aria-label="Tile" className="flex flex-wrap items-center gap-[22px] text-[15px]">
            <a href="#modes" className="hidden sm:inline text-[#EDEDEF]">Overview</a>
            <a href="#specs" className="hidden sm:inline text-[#EDEDEF]">Specs</a>
            <a href="#faq" className="hidden sm:inline text-[#EDEDEF]">Support</a>
            <a href="#buy" className="inline-flex min-h-10 items-center rounded-full px-[18px] font-medium !text-[#0B0B0C]" style={{ background: ORANGE }}>
              Buy
            </a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section id="top" className="relative scroll-mt-[132px] overflow-hidden px-6 pb-24 pt-[88px] text-center">
        <p className={`m-0 mb-[22px] ${mono}`}>/ new from Dynamik Design Lab</p>
        <h1 className="mx-auto mb-5 max-w-[11ch] text-[clamp(48px,8.5vw,116px)] font-bold leading-[0.95] tracking-[-0.05em]">
          Your desk, in 64&nbsp;pixels.
        </h1>
        <p className="mx-auto mb-16 max-w-[34ch] text-[clamp(18px,2vw,22px)] leading-normal text-[#A3A3AB]">
          A clock, a lamp and a tiny canvas you draw on.
        </p>

        <div className="relative flex justify-center">
          <div
            aria-hidden="true"
            className="absolute bottom-[-70px] left-1/2 h-[260px] w-[min(900px,140%)] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse at center, rgba(165,107,242,0.32), rgba(243,154,214,0.10) 40%, transparent 70%)' }}
          />
          <Device
            cells={heroCells} width={420} body={ORANGE} shade={ORANGE_DARK} screen="#E9EBEE"
            pad={28} screenPad={13} gap={5} radius={32} screenRadius={13} cellRadius={4} chin={80}
            button={{ w: 44, h: 14 }}
            style={{ boxShadow: `inset 0 -8px 0 ${ORANGE_DARK}, 0 60px 120px -50px rgba(240,100,30,0.55)` }}
          />
        </div>

        <div className="relative mt-[88px] flex flex-wrap items-center justify-center gap-x-7 gap-y-[18px]">
          <span className="text-[26px] font-medium tracking-[-0.02em]">₹{PRICE}</span>
          <a href="#buy" className="inline-flex min-h-[52px] items-center rounded-full px-8 text-[17px] font-medium !text-[#0B0B0C]" style={{ background: ORANGE }}>
            Buy Tile
          </a>
          <a href="#modes" className="inline-flex min-h-[52px] items-center px-2 text-[17px] text-[#EDEDEF] underline underline-offset-[5px]">
            See what it does
          </a>
        </div>
        <p className={`relative mt-[22px] ${mono}`}>
          ships in {SHIPS_IN} days&nbsp;&nbsp;/&nbsp;&nbsp;no account&nbsp;&nbsp;/&nbsp;&nbsp;no subscription
        </p>
      </section>

      {/* Stats */}
      <section aria-label="Tile in numbers" className="border-y border-[#1E1E22]">
        <dl className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-l border-[#1E1E22] px-6 py-9">
              <dt className={mono}>{s.label}</dt>
              <dd className="m-0 mb-1.5 text-[clamp(44px,5vw,64px)] font-bold leading-none tracking-[-0.04em]" style={{ color: s.color }}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Photo placeholder */}
      <section aria-label="Product photo" className="p-6">
        <div className="mx-auto box-border flex h-[min(640px,70vw)] min-h-[320px] max-w-[1240px] items-end rounded-[28px] border border-[#1E1E22] bg-[#141416] p-8">
          <p className={`m-0 max-w-[44ch] ${mono}`}>
            [PHOTO] Tile on a desk at night beside a laptop, clock glowing, room lit only by the screens
          </p>
        </div>
      </section>

      {/* Modes */}
      <section id="modes" className="scroll-mt-[132px] px-6 py-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 01 modes</p>
          <h2 className={`mb-16 max-w-[13ch] ${h2}`}>One little screen. Three jobs.</h2>
          <div className="flex flex-wrap items-center gap-14">
            <div role="group" aria-label="Choose a mode" className="flex max-w-[300px] flex-[1_1_220px] flex-col gap-1">
              {MODES.map((m) => {
                const on = m.id === mode
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMode(m.id)}
                    className="flex min-h-14 items-baseline gap-3.5 border-b border-[#1E1E22] bg-transparent py-3 text-left text-[28px] font-medium tracking-[-0.02em]"
                    style={{ color: on ? '#EDEDEF' : '#6E6E76' }}
                  >
                    <span className="font-mono text-[13px]" style={{ color: on ? ORANGE : '#55555C' }}>{m.n}</span>
                    {m.label}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-[1_1_320px] justify-center">
              <Device
                cells={cellsFor(mode)} width={360} body={ORANGE} shade={ORANGE_DARK} screen="#E9EBEE"
                pad={24} screenPad={11} gap={4} radius={28} screenRadius={11} cellRadius={3} chin={68}
                button={{ w: 38, h: 12 }}
              />
            </div>
            <div className="min-w-0 flex-[1_1_280px]">
              <p className="mb-[22px] max-w-[30ch] text-[21px] leading-normal text-[#C9C9CF]">{current.text}</p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {current.points.map((p) => (
                  <li key={p} className="font-mono text-[14px] text-[#A3A3AB]">+ {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details bento */}
      <section aria-labelledby="feat-h" className="px-6 pb-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 02 details</p>
          <h2 id="feat-h" className={`mb-14 max-w-[14ch] ${h2}`}>Small on the desk. Thoughtful inside.</h2>

          <div className="flex flex-wrap gap-4">
            <article aria-labelledby="night-h" className={`${card} flex flex-[2_1_560px] flex-wrap items-center gap-10`}>
              <div className="min-w-0 flex-[1_1_260px]">
                <p className={`mb-3.5 ${mono}`}>adaptive brightness</p>
                <h3 id="night-h" className="mb-3.5 text-[36px] font-bold leading-[1.05] tracking-[-0.03em]">Easy on your eyes after dark.</h3>
                <p className="mb-7 max-w-[36ch] text-[17px] leading-[1.55] text-[#A3A3AB]">
                  The clock fades from 20% to 5% at 10 pm, and back at 7 am. Move the slider and it holds until morning.
                </p>
                <div className="flex gap-9">
                  <div>
                    <div className="text-[48px] font-bold leading-none tracking-[-0.04em]">20%</div>
                    <div className={`mt-1.5 ${mono}`}>day</div>
                  </div>
                  <div>
                    <div className="text-[48px] font-bold leading-none tracking-[-0.04em] text-[#FF7A3D]">5%</div>
                    <div className={`mt-1.5 ${mono}`}>10 pm to 7 am</div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex flex-[0_1_240px] justify-center">
                <div
                  aria-hidden="true"
                  className="absolute bottom-[-40px] left-1/2 h-[120px] w-[340px] -translate-x-1/2"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(255,74,0,0.30), transparent 70%)' }}
                />
                <Device
                  cells={nightCells} width={220} body="#7A3412" shade="#5C260C" screen="#24262B"
                  pad={16} screenPad={8} gap={3} radius={20} screenRadius={8} cellRadius={2} chin={44}
                />
              </div>
            </article>

            <article aria-labelledby="draw-h" className={`${card} flex flex-[1_1_340px] flex-col gap-[22px]`}>
              <div>
                <p className={`mb-3.5 ${mono}`}>canvas</p>
                <h3 id="draw-h" className="mb-2.5 text-[36px] font-bold leading-[1.05] tracking-[-0.03em]">Make it yours.</h3>
                <p className="m-0 text-[17px] leading-[1.55] text-[#A3A3AB]">Draw pixel art and Tile shows it. Go on, tap the squares.</p>
              </div>
              <div className="grid w-full max-w-[300px] grid-cols-8 gap-1 rounded-[10px] bg-[#2B2D33] p-[9px]">
                {paint.map((v, i) => {
                  const c = v >= 0 ? BRUSHES[v].c : null
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Pixel row ${Math.floor(i / 8) + 1}, column ${(i % 8) + 1}`}
                      onClick={() => togglePixel(i)}
                      className="aspect-square rounded-[3px] border-0 p-0"
                      style={{ background: c ?? '#3A3D44', boxShadow: c ? glow(c) : 'none' }}
                    />
                  )
                })}
              </div>
              <div role="group" aria-label="Colour" className="flex flex-wrap items-center gap-2">
                {BRUSHES.map((b, i) => (
                  <button
                    key={b.name}
                    type="button"
                    aria-label={b.name}
                    aria-pressed={brush === i}
                    onClick={() => setBrush(i)}
                    className="h-11 w-11 rounded-full"
                    style={{ background: b.c, border: brush === i ? '3px solid #EDEDEF' : '3px solid #141416' }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setPaint(Array(64).fill(-1))}
                  className="min-h-11 rounded-full border border-[#34343A] bg-transparent px-4 font-mono text-[13px] text-[#EDEDEF]"
                >
                  clear
                </button>
              </div>
            </article>

            <article className={`${card} flex-[1_1_340px]`}>
              <p className={`mb-3.5 ${mono}`}>smart home</p>
              <h3 className="mb-[22px] text-[36px] font-bold leading-[1.05] tracking-[-0.03em]">Works with your home.</h3>
              <dl className="m-0 flex flex-col">
                {[
                  ['Alexa', '“Alexa, turn on Tile Lamp.” Needs an Echo on the same WiFi.'],
                  ['Home Assistant', 'Appears on its own over MQTT.'],
                  ['Google Home', 'Through Home Assistant.'],
                ].map(([k, v], i, arr) => (
                  <div key={k} className={`border-t border-[#26262B] pt-3.5 ${i < arr.length - 1 ? 'pb-3.5' : ''}`}>
                    <dt className="text-[18px] font-medium">{k}</dt>
                    <dd className="m-0 mt-1 text-[15px] leading-normal text-[#A3A3AB]">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="box-border flex min-w-0 flex-[2_1_560px] flex-wrap items-end gap-8 rounded-[28px] bg-[#E9EBEE] p-10 text-[#0B0B0C]">
              <div className="min-w-0 flex-[1_1_280px]">
                <p className="mb-3.5 font-mono text-[13px] text-[#55555C]">privacy</p>
                <h3 className="m-0 text-[clamp(36px,4.5vw,56px)] font-bold leading-none tracking-[-0.04em]">No account. No&nbsp;cloud.</h3>
              </div>
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3 text-[17px] leading-normal text-[#33343A]">
                <p className="m-0">Runs on your own WiFi. No sign-up, no subscription.</p>
                <p className="m-0">No internet? Your phone connects to Tile directly.</p>
                <p className="m-0">Any phone browser, or the Tile app for Android.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" aria-labelledby="specs-h" className="scroll-mt-[132px] px-6 pb-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 03 specs</p>
          <h2 id="specs-h" className={`mb-12 ${h2}`}>The details.</h2>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-12">
            {SPECS.map((s) => (
              <div key={s.k} className="flex gap-5 border-t border-[#1E1E22] py-[22px]">
                <dt className={`flex-[0_0_120px] pt-[3px] ${mono}`}>{s.k}</dt>
                <dd className="m-0 text-[18px] leading-[1.45]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="scroll-mt-[132px] px-6 pb-32">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12">
          <div className="flex-[1_1_300px]">
            <p className={eyebrow}>/ 04 questions</p>
            <h2 id="faq-h" className="m-0 text-[clamp(40px,5vw,64px)] font-bold leading-[0.98] tracking-[-0.045em]">Good to know.</h2>
          </div>
          <div className="min-w-0 flex-[2_1_480px]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[#1E1E22] py-[22px]">
                <summary className="flex cursor-pointer list-none justify-between gap-4 text-[20px] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="font-mono text-[#F0641E] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.6] text-[#A3A3AB]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Buy */}
      <section id="buy" aria-labelledby="buy-h" className="relative scroll-mt-[132px] overflow-hidden border-t border-[#1E1E22] px-6 pb-[140px] pt-32 text-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[40%] h-[420px] w-[900px] -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse at center, rgba(240,100,30,0.18), transparent 65%)' }}
        />
        <h2 id="buy-h" className="relative mb-[18px] text-[clamp(56px,10vw,140px)] font-bold leading-[0.9] tracking-[-0.06em]">Get Tile.</h2>
        <p className="relative mb-9 font-mono text-[14px] text-[#85858D]">
          ₹{PRICE}&nbsp;&nbsp;/&nbsp;&nbsp;ships in {SHIPS_IN} days&nbsp;&nbsp;/&nbsp;&nbsp;{WARRANTY}
        </p>
        <Link
          href="/contact"
          className="relative inline-flex min-h-[58px] items-center rounded-full px-11 text-[18px] font-medium !text-[#0B0B0C]"
          style={{ background: ORANGE }}
        >
          Buy Tile
        </Link>
      </section>
    </div>
  )
}
