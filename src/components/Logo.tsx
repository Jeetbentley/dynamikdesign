import Link from 'next/link'

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-baseline gap-1.5 select-none"
      aria-label="Dynamik Design Lab home"
    >
      <span className="relative inline-flex items-baseline">
        <span
          className={`text-[22px] font-extrabold tracking-tight leading-none ${
            light ? 'text-white' : 'text-text-primary'
          }`}
        >
          Dynamik
        </span>
        <span className="ml-1 inline-block w-[6px] h-[6px] rounded-full bg-red translate-y-[-2px]" />
      </span>
      <span
        className={`text-[14px] font-light tracking-wide leading-none ${
          light ? 'text-white/70' : 'text-text-muted'
        }`}
      >
        Design Lab
      </span>
    </Link>
  )
}
