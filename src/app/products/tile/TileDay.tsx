'use client'

import { useEffect, useRef, useState } from 'react'
import TileDevice, { type Chin } from './TileDevice'
import {
  amberClock,
  clockGrid,
  EMBERS_START,
  embersCells,
  embersStep,
  FOCUS_TOTAL_MS,
  focusTimerCells,
  nightClock,
  REMINDER_COLOR,
  reminderCells,
  type Cells,
} from './tileSim'
import { eyebrow, h2, mono } from './tileStyles'

const STOP_MS = 4000
const RESUME_MS = 10000 // after a tap, auto-play waits this long
const EMBERS_MS = 200 // as on the device

type StopId = 'clock' | 'focus' | 'reminder' | 'lamp' | 'night'
const STOPS: { id: StopId; time: string; mode: string; line: string }[] = [
  { id: 'clock', time: '8 AM', mode: 'Clock', line: 'Glance at the time.' },
  { id: 'focus', time: '10 AM', mode: 'Focus timer', line: 'Get into focus.' },
  { id: 'reminder', time: '1 PM', mode: 'Reminder', line: 'A gentle nudge.' },
  { id: 'lamp', time: '7 PM', mode: 'Lamp', line: 'Light the room.' },
  { id: 'night', time: '11 PM', mode: 'Night clock', line: 'Easy on the eyes.' },
]

const MORNING = amberClock(clockGrid(8, 0))
const NIGHT = nightClock(clockGrid(23, 0))

// What the device shows `t` ms into a stop. Reduced motion gets one representative still frame per stop.
function frame(id: StopId, t: number, embers: number[], still: boolean): Cells {
  switch (id) {
    case 'clock':
      return MORNING
    case 'focus':
      // The timer, sped up so the orange square visibly drains over the stop.
      return focusTimerCells(still ? FOCUS_TOTAL_MS * 0.55 : FOCUS_TOTAL_MS * Math.max(0.04, 1 - (t % STOP_MS) / (STOP_MS - 300)))
    case 'reminder':
      return reminderCells('LUNCH', REMINDER_COLOR, still ? 900 : t)
    case 'lamp':
      return embersCells(embers)
    case 'night':
      return NIGHT
  }
}

export default function TileDay({ chin }: { chin: Chin }) {
  const [active, setActive] = useState(0)
  const [elapsed, setElapsed] = useState(0) // ms into the current stop
  const [reduced, setReduced] = useState(false)
  const [frameEmbers, setFrameEmbers] = useState(EMBERS_START)
  const sectionRef = useRef<HTMLElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const state = useRef({ active: 0, elapsed: 0, holdUntil: 0, embers: EMBERS_START, lastEmbers: 0 })

  // One rAF loop, running only while the section is on screen and motion is allowed.
  useEffect(() => {
    const el = sectionRef.current
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(isReduced)
    if (!el || isReduced) return
    let raf = 0
    let last = 0
    let lastPaint = 0
    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      const s = state.current
      s.elapsed += dt
      if (s.elapsed >= STOP_MS && now >= s.holdUntil) {
        s.active = (s.active + 1) % STOPS.length
        s.elapsed = 0
        setActive(s.active)
      }
      if (STOPS[s.active].id === 'lamp' && now - s.lastEmbers >= EMBERS_MS) {
        s.lastEmbers = now
        s.embers = embersStep(s.embers)
        setFrameEmbers(s.embers)
      }
      if (now - lastPaint >= 33) {
        lastPaint = now
        setElapsed(s.elapsed)
      }
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 })
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [])

  // Keep the active stop visible in the scrollable row on phones (horizontal scroll only, never the page).
  useEffect(() => {
    const row = rowRef.current
    const btn = row?.children[active] as HTMLElement | undefined
    if (!row || !btn || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: btn.offsetLeft - (row.clientWidth - btn.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

  const jump = (i: number) => {
    const s = state.current
    s.active = i
    s.elapsed = 0
    s.holdUntil = performance.now() + RESUME_MS
    setActive(i)
    setElapsed(0)
  }

  const stop = STOPS[active]
  const cells = frame(stop.id, elapsed, frameEmbers, reduced)
  const progress = reduced ? 1 : Math.min(1, elapsed / STOP_MS)

  return (
    <section ref={sectionRef} id="day" aria-labelledby="day-h" className="scroll-mt-[132px] overflow-hidden border-t border-[#1E1E22] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <p className={eyebrow}>A day</p>
        <h2 id="day-h" className={`mb-12 ${h2}`}>A day with Tile.</h2>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[380px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-40px] left-1/2 h-[200px] w-[150%] -translate-x-1/2"
              style={{ background: 'radial-gradient(ellipse at center, rgba(240,100,30,0.16), transparent 70%)' }}
            />
            <div className="relative">
              <TileDevice
                cells={cells}
                chin={chin}
                dim={stop.id === 'night'}
                glow={stop.id === 'lamp' ? 18 : 14}
                alt={`Tile at ${stop.time}: ${stop.mode.toLowerCase()}. ${stop.line}`}
              />
            </div>
          </div>
          {/* Fixed height so the line changing never moves the timeline */}
          <p aria-live="polite" className="mt-8 flex min-h-[40px] items-center text-center text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-0.01em]">
            {stop.line}
          </p>
        </div>

        {/* Timeline: a row of stops; scrolls sideways on phones */}
        <div
          ref={rowRef}
          role="group"
          aria-label="Times of day"
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {STOPS.map((s, i) => {
            const on = i === active
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`${s.time}, ${s.mode}`}
                aria-pressed={on}
                onClick={() => jump(i)}
                className="relative flex min-w-[150px] flex-none snap-center flex-col items-start gap-1.5 rounded-[18px] border bg-[#141416] px-4 pb-5 pt-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0641E] md:min-w-0"
                style={{ borderColor: on ? '#3A3A40' : '#1E1E22' }}
              >
                {/* Progress along the bottom edge of the active stop */}
                <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-[3px] overflow-hidden rounded-full bg-[#26262B]">
                  <span className="block h-full rounded-full bg-[#F0641E]" style={{ width: on ? `${progress * 100}%` : '0%' }} />
                </span>
                <span className="font-mono text-[13px] tabular-nums tracking-[0.08em]" style={{ color: on ? '#F0641E' : '#85858D' }}>
                  {s.time}
                </span>
                <span className="text-[15px] font-semibold uppercase tracking-[0.04em]" style={{ color: on ? '#EDEDEF' : '#A3A3AB' }}>
                  {s.mode}
                </span>
                <span className={`${mono} !normal-case !tracking-normal !text-[13px]`}>{s.line}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
