import { brand, hero } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { CtaLink } from './Cta'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="inicio" className="relative grid overflow-hidden bg-cream md:grid-cols-12 md:items-stretch">
      {/* Columna de texto — asimétrica, con generoso espacio negativo */}
      <div className="relative order-2 flex flex-col justify-center px-6 pb-16 pt-14 md:order-1 md:col-span-5 md:px-14 md:py-0 lg:px-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[13rem] leading-none text-coffee/[0.04] lg:block"
        >
          {brand.name}
        </span>

        <Reveal className="relative">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>
          <h1 className="max-w-md font-serif text-[2.6rem] leading-[1.08] text-coffee sm:text-6xl md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-sm font-sans text-[0.95rem] leading-relaxed text-taupe">{hero.text}</p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <CtaLink href="#agenda" variant="solid">
              {hero.primaryCta}
            </CtaLink>
            <CtaLink href="#portafolio" variant="text">
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </Reveal>
      </div>

      {/* Fotografía — protagonista, con sangrado completo */}
      <div className="order-1 h-[62vh] min-h-[420px] md:order-2 md:col-span-7 md:h-screen">
        <PlaceholderImage slot={hero.image} tone="blush" className="h-full w-full" />
      </div>
    </section>
  )
}
