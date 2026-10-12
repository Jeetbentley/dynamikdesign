'use client'

import { useEffect, useState } from 'react'
import TileDevice, { type Chin } from './TileDevice'
import { AMBER_HOUR, AMBER_MIN, led, type Cells } from './tileSim'

// Firmware defaults: day 20%, night 5%, night 22:00–07:00, warm digits off.
const DEFAULTS = { day: 20, night: 5, start: 22, end: 7, warm: false }
const NIGHT_HOUR = 0xff4a00
const NIGHT_MIN = 0xa81e00
const START_HOURS = [18, 19, 20, 21, 22, 23, 0]
const END_HOURS = [5, 6, 7, 8, 9, 10]

const hh = (h: number) => `${String(h).padStart(2, '0')}:00`
// LEDs look much brighter than their duty cycle; this keeps 5% visible on screen while 100% stays full.
const visual = (pct: number) => 0.22 + 0.78 * Math.sqrt(pct / 100)
const inNight = (hour: number, start: number, end: number) =>
  start === end ? false : start < end ? hour >= start && hour < end : hour >= start || hour < end

const mono = 'font-mono text-[12px] uppercase tracking-[0.12em] text-[#85858D]'
const label = 'flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[#85858D]'
const select =
  'mt-2 w-full rounded-full border border-[#34343A] bg-[#0B0B0C] px-4 py-2.5 font-mono text-[13px] text-[#EDEDEF] focus:border-[#F0641E] focus:outline-none'

export default function TileNight({ clock, chin }: { clock: number[]; chin: Chin }) {
  const [day, setDay] = useState(DEFAULTS.day)
  const [night, setNight] = useState(DEFAULTS.night)
  const [start, setStart] = useState(DEFAULTS.start)
  const [end, setEnd] = useState(DEFAULTS.end)
  const [warm, setWarm] = useState(DEFAULTS.warm)
  // The preview follows whatever you last adjusted; it starts on the visitor's current day or night.
  const [view, setView] = useState<'day' | 'night'>('day')
  useEffect(() => {
    setView(inNight(new Date().getHours(), DEFAULTS.start, DEFAULTS.end) ? 'night' : 'day')
  }, [])

  const isNight = view === 'night'
  const level = visual(isNight ? night : day)
  const [hourHex, minHex] = isNight && warm ? [NIGHT_HOUR, NIGHT_MIN] : [AMBER_HOUR, AMBER_MIN]
  const cells: Cells = clock.map((v) => (v === 0 ? led(hourHex, level) : v === 1 ? led(minHex, level) : null))

  return (
    <article aria-labelledby="night-h" className="rounded-[28px] border border-[#1E1E22] bg-[#141416] p-8 sm:p-10 box-border min-w-0 flex flex-[2_1_560px] flex-wrap items-center gap-10">
      <div className="min-w-0 flex-[1_1_280px]">
        <p className={`mb-3.5 ${mono}`}>Adaptive brightness</p>
        <h3 id="night-h" className="mb-3.5 uppercase font-bold tracking-[-0.02em] leading-[1.02] text-[30px]">
          Bright by day. Gentle by night. Your call.
        </h3>
        <p className="mb-8 max-w-[40ch] lowercase text-[17px] leading-[1.6] text-[#A3A3AB]">
          Set how bright Tile is during the day, how dim it goes at night, and when night begins. Turn on warm digits for
          late hours. Move the slider anytime and it holds until the next switch.
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="night-day" className={label}>
              <span>Day level</span>
              <span className="text-[#EDEDEF] tabular-nums">{day}%</span>
            </label>
            <input
              id="night-day"
              type="range"
              min={1}
              max={100}
              value={day}
              onChange={(e) => {
                setDay(Number(e.target.value))
                setView('day')
              }}
              className="mt-2 w-full accent-[#F0641E]"
            />
          </div>
          <div>
            <label htmlFor="night-night" className={label}>
              <span>Night level</span>
              <span className="text-[#FF7A3D] tabular-nums">{night}%</span>
            </label>
            <input
              id="night-night"
              type="range"
              min={1}
              max={100}
              value={night}
              onChange={(e) => {
                setNight(Number(e.target.value))
                setView('night')
              }}
              className="mt-2 w-full accent-[#FF7A3D]"
            />
          </div>
          <fieldset className="grid grid-cols-2 gap-4">
            <legend className="sr-only">Night hours</legend>
            <div>
              <label htmlFor="night-start" className={label}>Night from</label>
              <select
                id="night-start"
                value={start}
                onChange={(e) => {
                  setStart(Number(e.target.value))
                  setView('night')
                }}
                className={select}
              >
                {START_HOURS.map((h) => (
                  <option key={h} value={h}>{hh(h)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="night-end" className={label}>Until</label>
              <select
                id="night-end"
                value={end}
                onChange={(e) => {
                  setEnd(Number(e.target.value))
                  setView('night')
                }}
                className={select}
              >
                {END_HOURS.map((h) => (
                  <option key={h} value={h}>{hh(h)}</option>
                ))}
              </select>
            </div>
          </fieldset>
          <label className="flex cursor-pointer items-center gap-3 text-[15px] text-[#C9C9CF]">
            <input
              type="checkbox"
              checked={warm}
              onChange={(e) => {
                setWarm(e.target.checked)
                setView('night')
              }}
              className="h-4 w-4 accent-[#FF4A00]"
            />
            Warm digits at night
          </label>
        </div>
      </div>

      <div className="relative mx-auto flex flex-[0_1_240px] flex-col items-center">
        <div
          aria-hidden="true"
          className="absolute bottom-[10px] left-1/2 h-[120px] w-[320px] -translate-x-1/2"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at center, rgba(255,74,0,0.22), transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(239,159,39,0.22), transparent 70%)',
          }}
        />
        <div className="relative w-full max-w-[220px]">
          <TileDevice
            cells={cells}
            chin={chin}
            dim={isNight}
            glow={isNight ? 8 : 12}
            alt={isNight ? `Tile at night, ${night}% brightness` : `Tile by day, ${day}% brightness`}
          />
        </div>
        <p className={`relative mt-5 text-center ${mono}`}>
          {isNight ? `Night · ${hh(start)}–${hh(end)} · ${night}%` : `Day · ${day}%`}
        </p>
      </div>
    </article>
  )
}
