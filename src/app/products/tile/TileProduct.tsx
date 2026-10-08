'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import TileDevice, { type Lit } from './TileDevice'
import TileWaitlist from './TileWaitlist'
import { inr, salesOpenLine, tileLaunch } from '@/data/tile-launch'
import { visibleFaqs, visibleSpecs } from '@/data/tile'

const IS_SALES = tileLaunch.mode === 'sales'
const CTA = IS_SALES
  ? { href: '#buy', label: 'Buy Tile', nav: 'Buy' }
  : { href: '#waitlist', label: 'Join the Founders Batch', nav: 'Join' }

const ORANGE = '#F0641E'

type Mode = 'clock' | 'lamp' | 'canvas'
interface Brush extends Lit {
  name: string
  swatch: string
}

const BRUSHES: Brush[] = [
  { name: 'Warm white', swatch: '#FBE1CC', center: '#FBF4E6', edge: '#FBD6BC', glow: 'rgba(255,128,80,0.8)' },
  { name: 'Ice', swatch: '#6FDDFB', center: '#ADF8FC', edge: '#5FD9FA', glow: 'rgba(45,140,255,0.8)' },
  { name: 'Orange', swatch: '#FF7A2E', center: '#FFC08F', edge: '#FF6A1A', glow: 'rgba(255,90,20,0.8)' },
  { name: 'Purple', swatch: '#A56BF2', center: '#E4D2FF', edge: '#A56BF2', glow: 'rgba(150,95,240,0.8)' },
  { name: 'Pink', swatch: '#F39AD6', center: '#FFE3F4', edge: '#F39AD6', glow: 'rgba(240,120,200,0.8)' },
]

const LAMP: Lit = { center: '#FFF8EC', edge: '#FFE3B3', glow: 'rgba(255,190,110,0.55)' }
const NIGHT_H: Lit = { center: '#FF8A4D', edge: '#FF4A00', glow: 'rgba(255,74,0,0.85)' }
const NIGHT_M: Lit = { center: '#D2421A', edge: '#A81E00', glow: 'rgba(168,30,0,0.75)' }

// "14:39", as on the product photo. Values are BRUSHES indexes, -1 is off.
const CLOCK: number[] = (() => {
  const a = Array(64).fill(-1)
  const warm = [[0,1],[1,0],[1,1],[2,1],[3,1],[0,4],[1,4],[2,4],[2,5],[0,6],[1,6],[3,6]]
  const ice = [[4,1],[4,2],[5,2],[5,3],[6,3],[7,1],[7,2],[4,5],[4,6],[5,5],[5,7],[6,5],[6,6],[6,7],[7,7]]
  warm.forEach(([y, x]) => (a[y * 8 + x] = 0))
  ice.forEach(([y, x]) => (a[y * 8 + x] = 1))
  return a
})()

// Tile's clock digits, copied from FONT_NUM in the firmware (tile_combined.ino v1.3.0).
// 4 rows × 4 columns per digit; column 4 is always the gap.
const FONT_NUM: number[][][] = [
  [[1,1,0,0],[1,0,1,0],[1,0,1,0],[1,1,1,0]], // 0
  [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,1,0,0]], // 1
  [[1,1,0,0],[0,1,0,0],[1,0,0,0],[1,1,0,0]], // 2
  [[1,1,0,0],[0,1,1,0],[0,0,1,0],[1,1,0,0]], // 3
  [[1,0,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,0]], // 4
  [[1,1,1,0],[1,0,0,0],[0,1,0,0],[1,1,0,0]], // 5
  [[1,0,0,0],[1,1,1,0],[1,0,1,0],[0,1,1,0]], // 6
  [[1,1,1,0],[0,0,1,0],[0,1,0,0],[0,1,0,0]], // 7
  [[1,1,1,0],[1,1,1,0],[1,0,1,0],[1,1,1,0]], // 8
  [[1,1,0,0],[1,0,1,0],[1,1,1,0],[0,0,1,0]], // 9
]

// Glance face layout from renderGlanceFace(): hours at cols 0/4 rows 0–3, minutes at cols 1/5 rows 4–7, 24-hour (firmware default).
const clockGrid = (h: number, m: number): number[] => {
  const a = Array(64).fill(-1)
  const hh = String(h).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  // Same as stampNumDigit() in the firmware, clipped to the 8×8 matrix.
  const place = (digit: string, row: number, col: number, colour: number) =>
    FONT_NUM[Number(digit)].forEach((line, y) =>
      line.forEach((on, x) => {
        if (on && col + x < 8 && row + y < 8) a[(row + y) * 8 + col + x] = colour
      }),
    )
  place(hh[0], 0, 0, 0)
  place(hh[1], 0, 4, 0)
  place(mm[0], 4, 1, 1)
  place(mm[1], 4, 5, 1)
  return a
}

// Visitor's local time, updated when the minute changes. Starts on the photo's 14:39 so server and client match.
function useLiveClock() {
  const [grid, setGrid] = useState<number[]>(CLOCK)
  useEffect(() => {
    let last = ''
    const tick = () => {
      const now = new Date()
      const key = `${now.getHours()}:${now.getMinutes()}`
      if (key === last) return
      last = key
      setGrid(clockGrid(now.getHours(), now.getMinutes()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return grid
}

const HEART = ['........', '.##..##.', '########', '########', '.######.', '..####..', '...##...', '........']
  .join('')
  .split('')
  .map((ch) => (ch === '#' ? 4 : -1))

const toCells = (grid: number[]) => grid.map((v) => (v >= 0 ? BRUSHES[v] : null))
const nightCellsFor = (grid: number[]) => grid.map((v) => (v === 0 ? NIGHT_H : v === 1 ? NIGHT_M : null))

const MODES: { id: Mode; label: string; n: string; text: string; points: string[] }[] = [
  {
    id: 'clock', label: 'Clock', n: '01',
    text: 'Big, chunky digits you can read from across the room, in your colours.',
    points: ['Glance and Blocks faces', '12 or 24 hour', 'Amber, Ice, Mono or your own colours'],
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

const STATS = [
  { value: '64', label: 'RGB pixels', color: '#EDEDEF' },
  { value: '3', label: 'Modes', color: '#EDEDEF' },
  { value: '5%', label: 'Night brightness', color: '#FF7A3D' },
  { value: '0', label: 'Accounts needed', color: '#EDEDEF' },
]

// Caps for headings, labels and clickables; lowercase for descriptive copy.
const mono = 'font-mono text-[12px] uppercase tracking-[0.12em] text-[#85858D]'
const eyebrow = 'mb-[18px] font-mono text-[12px] uppercase tracking-[0.12em] text-[#F0641E]'
const h2 = 'uppercase font-bold tracking-[-0.03em] leading-[0.95] text-[clamp(36px,5.4vw,72px)]'
const h3 = 'uppercase font-bold tracking-[-0.02em] leading-[1.02] text-[30px]'
const body = 'lowercase text-[17px] leading-[1.6] text-[#A3A3AB]'
const card = 'rounded-[28px] border border-[#1E1E22] bg-[#141416] p-8 sm:p-10 box-border min-w-0'
const pill = 'inline-flex items-center rounded-full font-semibold uppercase tracking-[0.1em] !text-[#0B0B0C]'

function PriceLine() {
  return (
    <div className="flex flex-col items-center">
      <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
        <span className="sr-only">Regular price</span>
        <s className="text-[20px] text-[#85858D] decoration-[#F0641E] decoration-2">{inr(tileLaunch.regularPrice)}</s>
        <span aria-hidden="true" className="text-[18px] text-[#55555C]">→</span>
        <span className="sr-only">Founders price</span>
        <span className="text-[36px] font-bold leading-none tracking-[-0.02em]">{inr(tileLaunch.foundersPrice)}</span>
        <span className="text-[16px] lowercase text-[#C9C9CF]">for the first {tileLaunch.foundersBatchSize} founders</span>
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#85858D]">Inclusive of all taxes</p>
    </div>
  )
}

export default function TileProduct({ photo }: { photo?: { src: string; alt: string } }) {
  const [mode, setMode] = useState<Mode>('clock')
  const [brush, setBrush] = useState(1)
  const clock = useLiveClock()
  // The hero shows the live clock until the visitor draws or clears; Reset brings the clock back.
  const [edited, setEdited] = useState(false)
  const [paint, setPaint] = useState<number[]>(CLOCK)
  const editedRef = useRef(false)
  const clockRef = useRef(clock)
  clockRef.current = clock
  const erasing = useRef(false)
  const hero = edited ? paint : clock

  const set = (i: number, v: number) => {
    const wasEdited = editedRef.current
    editedRef.current = true
    setEdited(true)
    setPaint((p) => {
      const base = wasEdited ? p : clockRef.current
      if (wasEdited && base[i] === v) return p
      const next = base.slice()
      next[i] = v
      return next
    })
  }

  const canvas = {
    onDown: (i: number) => {
      erasing.current = hero[i] === brush
      set(i, erasing.current ? -1 : brush)
    },
    onEnter: (i: number, e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.buttons & 1) set(i, erasing.current ? -1 : brush)
    },
    onKey: (i: number) => set(i, hero[i] === brush ? -1 : brush),
  }

  const drewSomething = edited && paint.some((v) => v >= 0)
  const current = MODES.find((m) => m.id === mode)!
  const modeCells =
    mode === 'lamp'
      ? Array(64).fill(LAMP)
      : mode === 'canvas'
        ? toCells(drewSomething ? paint : HEART)
        : toCells(clock)
  const modeText =
    mode === 'canvas' && drewSomething ? 'That’s the drawing you made up top. Tile keeps it on screen until you change it.' : current.text

  return (
    <div className="font-grotesk bg-[#0B0B0C] text-[#EDEDEF] min-h-screen [&_a:hover]:text-[#F0641E]">
      {/* Tile bar — sits under the site navbar and moves to the top when the navbar hides */}
      <div
        className="sticky z-30 border-b border-[#1E1E22] bg-[rgba(11,11,12,0.82)] backdrop-blur-[14px] transition-[top] duration-300 ease-studio"
        style={{ top: 'var(--site-nav-offset, 68px)' }}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-6">
          <a href="#top" aria-label="Tile" className="flex items-center gap-2.5 text-[19px] font-bold uppercase tracking-[0.06em] text-[#EDEDEF]">
            <span className="grid grid-cols-[repeat(3,7px)] gap-[2px]">
              {[1, 1, 1, 0, 1, 0].map((on, i) => (
                <span key={i} className="h-[7px] w-[7px] rounded-[1.5px]" style={{ background: on ? ORANGE : 'transparent' }} />
              ))}
            </span>
            Tile
          </a>
          <nav aria-label="Tile" className="flex items-center gap-6 text-[12px] font-medium uppercase tracking-[0.14em]">
            <a href="#modes" className="hidden sm:inline text-[#EDEDEF]">Overview</a>
            <a href="#specs" className="hidden sm:inline text-[#EDEDEF]">Specs</a>
            <a href="#faq" className="hidden sm:inline text-[#EDEDEF]">Support</a>
            <a href={CTA.href} className={`${pill} min-h-10 px-[18px] text-[12px]`} style={{ background: ORANGE }}>
              {CTA.nav}
            </a>
          </nav>
        </div>
      </div>

      {/* Hero — the live canvas */}
      <section id="top" className="relative scroll-mt-[132px] overflow-hidden px-6 pb-24 pt-16 sm:pt-20 text-center">
        <p className={`mb-[22px] ${mono}`}>/ New from Dynamik Design Lab</p>
        <h1 className="mx-auto mb-5 max-w-[12ch] text-[clamp(42px,7.4vw,104px)] font-bold uppercase leading-[0.92] tracking-[-0.035em]">
          Your desk, in 64&nbsp;pixels.
        </h1>
        <p className={`mx-auto mb-12 max-w-[38ch] !text-[clamp(17px,1.8vw,21px)] ${body}`}>
          A clock, a lamp and a tiny canvas you draw on. This one’s live — tap the screen and make it yours.
        </p>

        <div className="relative mx-auto flex max-w-[460px] justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-60px] left-1/2 h-[280px] w-[min(900px,180%)] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse at center, rgba(95,217,250,0.22), rgba(240,100,30,0.14) 40%, transparent 70%)' }}
          />
          <div className="relative w-full drop-shadow-[0_50px_60px_rgba(240,100,30,0.28)]">
            <TileDevice cells={toCells(hero)} interactive={canvas} priority glow={16} />
          </div>
        </div>

        <p className={`mt-8 ${mono}`}>Make it yours — tap or drag on the screen</p>
        <div role="group" aria-label="Colour" className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {BRUSHES.map((b, i) => (
            <button
              key={b.name}
              type="button"
              aria-label={b.name}
              aria-pressed={brush === i}
              onClick={() => setBrush(i)}
              className="h-11 w-11 rounded-full transition-transform hover:scale-110"
              style={{
                background: b.swatch,
                boxShadow: brush === i ? `0 0 0 3px #0B0B0C, 0 0 0 5px #EDEDEF, 0 0 18px ${b.glow}` : 'none',
              }}
            />
          ))}
          <span className="mx-1 h-6 w-px bg-[#26262B]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => {
              editedRef.current = true
              setEdited(true)
              setPaint(Array(64).fill(-1))
            }}
            className="min-h-11 rounded-full border border-[#34343A] px-4 font-mono text-[12px] uppercase tracking-[0.12em] text-[#EDEDEF] hover:border-[#EDEDEF]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              editedRef.current = false
              setEdited(false)
            }}
            className="min-h-11 rounded-full border border-[#34343A] px-4 font-mono text-[12px] uppercase tracking-[0.12em] text-[#EDEDEF] hover:border-[#EDEDEF]"
          >
            Reset
          </button>
        </div>

        <div className="relative mt-14">
          <PriceLine />
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-[18px]">
          <a href={CTA.href} className={`${pill} min-h-[52px] px-8 text-[14px]`} style={{ background: ORANGE }}>
            {CTA.label}
          </a>
          <a href="#modes" className="inline-flex min-h-[52px] items-center px-2 text-[14px] font-medium uppercase tracking-[0.1em] text-[#EDEDEF] underline underline-offset-[6px]">
            See what it does
          </a>
        </div>
        <p className={`relative mt-[22px] ${mono}`}>
          {salesOpenLine.replace(/\.$/, '')}&nbsp;&nbsp;/&nbsp;&nbsp;No account&nbsp;&nbsp;/&nbsp;&nbsp;No subscription
        </p>
      </section>

      {/* Modes */}
      <section id="modes" className="scroll-mt-[132px] border-t border-[#1E1E22] px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 01 Modes</p>
          <h2 className={`mb-14 max-w-[14ch] ${h2}`}>One little screen. Three jobs.</h2>
          <div className="flex flex-wrap items-center gap-12 lg:gap-14">
            <div role="group" aria-label="Choose a mode" className="flex max-w-[300px] flex-[1_1_220px] flex-col gap-1">
              {MODES.map((m) => {
                const on = m.id === mode
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMode(m.id)}
                    className="flex min-h-14 items-baseline gap-3.5 border-b border-[#1E1E22] bg-transparent py-3 text-left text-[26px] font-semibold uppercase tracking-[0.02em] transition-colors"
                    style={{ color: on ? '#EDEDEF' : '#6E6E76' }}
                  >
                    <span className="font-mono text-[12px]" style={{ color: on ? ORANGE : '#55555C' }}>{m.n}</span>
                    {m.label}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-[1_1_320px] justify-center">
              <div className="w-full max-w-[360px]">
                <TileDevice cells={modeCells} glow={mode === 'lamp' ? 10 : 14} sizes="(min-width: 768px) 360px, 80vw" />
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_280px]">
              <p className="mb-[22px] max-w-[30ch] text-[21px] lowercase leading-normal text-[#C9C9CF]">{modeText}</p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {current.points.map((p) => (
                  <li key={p} className="font-mono text-[14px] lowercase text-[#A3A3AB]">+ {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Tile in numbers" className="border-y border-[#1E1E22]">
        <dl className="mx-auto grid max-w-[1240px] grid-cols-2 md:grid-cols-4">
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

      {/* Product photo — only rendered once the image file exists (see data/tile.ts) */}
      {photo && (
        <section aria-label="Product photo" className="p-6">
          <div className="relative mx-auto h-[min(640px,70vw)] min-h-[320px] max-w-[1240px] overflow-hidden rounded-[28px] border border-[#1E1E22] bg-[#141416]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" />
          </div>
        </section>
      )}

      {/* Details */}
      <section aria-labelledby="feat-h" className="px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 02 Details</p>
          <h2 id="feat-h" className={`mb-14 max-w-[15ch] ${h2}`}>Small on the desk. Thoughtful inside.</h2>

          <div className="flex flex-wrap gap-4">
            <article aria-labelledby="night-h" className={`${card} flex flex-[2_1_560px] flex-wrap items-center gap-10`}>
              <div className="min-w-0 flex-[1_1_260px]">
                <p className={`mb-3.5 ${mono}`}>Adaptive brightness</p>
                <h3 id="night-h" className={`mb-3.5 ${h3}`}>Easy on your eyes after dark.</h3>
                <p className={`mb-7 max-w-[36ch] ${body}`}>
                  The clock fades from 20% to 5% at 10 pm, and back at 7 am. Move the slider and it holds until morning.
                </p>
                <div className="flex gap-9">
                  <div>
                    <div className="text-[48px] font-bold leading-none tracking-[-0.04em]">20%</div>
                    <div className={`mt-1.5 ${mono}`}>Day</div>
                  </div>
                  <div>
                    <div className="text-[48px] font-bold leading-none tracking-[-0.04em] text-[#FF7A3D]">5%</div>
                    <div className={`mt-1.5 ${mono}`}>10 pm to 7 am</div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex flex-[0_1_220px] justify-center">
                <div
                  aria-hidden="true"
                  className="absolute bottom-[-30px] left-1/2 h-[120px] w-[320px] -translate-x-1/2"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(255,74,0,0.28), transparent 70%)' }}
                />
                <div className="relative w-full max-w-[220px]">
                  <TileDevice cells={nightCellsFor(clock)} dim glow={10} sizes="220px" alt="Tile at night, dimmed to 5% brightness" />
                </div>
              </div>
            </article>

            <article className={`${card} flex-[1_1_340px]`}>
              <p className={`mb-3.5 ${mono}`}>Smart home</p>
              <h3 className={`mb-[22px] ${h3}`}>Works with your home.</h3>
              <dl className="m-0 flex flex-col">
                {[
                  ['Alexa', '“Alexa, turn on Tile Lamp.” Needs an Echo on the same WiFi.'],
                  ['Home Assistant', 'Appears on its own over MQTT.'],
                  ['Google Home', 'Through Home Assistant.'],
                ].map(([k, v], i, arr) => (
                  <div key={k} className={`border-t border-[#26262B] pt-3.5 ${i < arr.length - 1 ? 'pb-3.5' : ''}`}>
                    <dt className="text-[15px] font-semibold uppercase tracking-[0.06em]">{k}</dt>
                    <dd className="m-0 mt-1 text-[15px] lowercase leading-normal text-[#A3A3AB]">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="box-border flex min-w-0 flex-[1_1_100%] flex-wrap items-end gap-8 rounded-[28px] bg-[#E9EBEE] p-8 sm:p-10 text-[#0B0B0C]">
              <div className="min-w-0 flex-[1_1_280px]">
                <p className="mb-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-[#55555C]">Privacy</p>
                <h3 className="m-0 text-[clamp(34px,4.5vw,56px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">No account. No&nbsp;cloud.</h3>
              </div>
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3 text-[17px] lowercase leading-normal text-[#33343A]">
                <p className="m-0">Runs on your own WiFi. No sign-up, no subscription.</p>
                <p className="m-0">No internet? Your phone connects to Tile directly.</p>
                <p className="m-0">Any phone browser, or the Tile app for Android.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" aria-labelledby="specs-h" className="scroll-mt-[132px] px-6 pb-28 sm:pb-32">
        <div className="mx-auto max-w-[1240px]">
          <p className={eyebrow}>/ 03 Specs</p>
          <h2 id="specs-h" className={`mb-12 ${h2}`}>The details.</h2>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-12">
            {visibleSpecs.map((s) => (
              <div key={s.k} className="flex gap-5 border-t border-[#1E1E22] py-[22px]">
                <dt className={`flex-[0_0_120px] pt-[4px] ${mono}`}>{s.k}</dt>
                <dd className="m-0 text-[18px] lowercase leading-[1.45]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="scroll-mt-[132px] px-6 pb-28 sm:pb-32">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12">
          <div className="flex-[1_1_300px]">
            <p className={eyebrow}>/ 04 Questions</p>
            <h2 id="faq-h" className={h2}>Good to know.</h2>
          </div>
          <div className="min-w-0 flex-[2_1_480px]">
            {visibleFaqs.map((f) => (
              <details key={f.q} className="group border-t border-[#1E1E22] py-[22px]">
                <summary className="flex cursor-pointer list-none justify-between gap-4 text-[17px] font-semibold uppercase tracking-[0.04em] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="font-mono text-[#F0641E] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className={`mt-3 max-w-[60ch] ${body}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {IS_SALES ? (
        <section id="buy" aria-labelledby="buy-h" className="relative scroll-mt-[132px] overflow-hidden border-t border-[#1E1E22] px-6 pb-[140px] pt-28 text-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[40%] h-[420px] w-[900px] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse at center, rgba(240,100,30,0.18), transparent 65%)' }}
          />
          <div className="relative mx-auto mb-10 w-full max-w-[200px]">
            <TileDevice cells={toCells(drewSomething ? paint : clock)} glow={10} sizes="200px" />
          </div>
          <h2 id="buy-h" className="relative mb-8 text-[clamp(52px,9vw,128px)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">Get Tile.</h2>
          <div className="relative mb-9">
            <PriceLine />
          </div>
          <Link href="/contact" className={`relative ${pill} min-h-[58px] px-11 text-[15px]`} style={{ background: ORANGE }}>
            Buy Tile
          </Link>
        </section>
      ) : (
        <TileWaitlist device={<TileDevice cells={toCells(drewSomething ? paint : clock)} glow={10} sizes="180px" />} />
      )}

      {/* Credit strip above the site footer */}
      <section className="border-t border-[#1E1E22] px-6 py-10">
        <div className="mx-auto max-w-[1240px] text-center sm:text-left">
          <Link
            href="/services/engineering#phygital"
            className="inline-flex items-center gap-2 text-[15px] text-[#A3A3AB] transition-colors"
          >
            Designed, engineered and built by Dynamik Design Lab.
            <span aria-hidden="true" className="text-[#F0641E]">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
