import { featuredService } from '../config/site'
import { CtaLink } from './Cta'
import { Reveal } from './Reveal'

export function FeaturedService() {
  return (
    <section className="bg-coffee py-20 text-cream md:py-28 lg:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow mb-6 text-champagne">{featuredService.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{featuredService.title}</h2>
          <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-cream/75">{featuredService.text}</p>

          <div className="mt-10 flex justify-center">
            <CtaLink href="#agenda" variant="outline-inverse">
              {featuredService.cta}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
