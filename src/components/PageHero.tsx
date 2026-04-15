import Image from 'next/image'

interface Props {
  eyebrow: string
  title: string
  image?: string
  subtitle?: string
  height?: 'short' | 'tall'
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  height = 'short',
}: Props) {
  if (image) {
    const heightClass =
      height === 'tall' ? 'h-[60vh] min-h-[480px]' : 'h-[50vh] min-h-[380px]'
    return (
      <section className={`relative ${heightClass} bg-bg-dark`}>
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative h-full container-x flex flex-col justify-end pb-12 lg:pb-16">
          <span className="eyebrow text-white/70">{eyebrow}</span>
          <h1 className="heading-h1 text-white mt-4 max-w-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-white/80 max-w-2xl text-[17px]">{subtitle}</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-border">
      <div className="container-x py-20 lg:py-28">
        <span className="eyebrow text-text-muted">{eyebrow}</span>
        <h1 className="heading-h1 mt-4 max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 text-text-body max-w-2xl text-[17px]">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
