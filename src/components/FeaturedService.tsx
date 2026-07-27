import { featuredService } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { CtaLink } from './Cta'
import { Reveal } from './Reveal'

export function FeaturedService() {
  return (
    <section className="bg-coffee text-cream">
      <div className="grid md:grid-cols-12">
        <Reveal className="aspect-[4/3] md:col-span-6 md:aspect-auto md:h-auto">
          <PlaceholderImage slot={featuredService.image} tone="blush" className="h-full w-full" />
        </Reveal>

        <div className="flex flex-col justify-start px-6 pb-20 pt-12 md:col-span-6 md:px-16 md:pb-20 md:pt-14 lg:px-24 lg:pb-24 lg:pt-16">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6 text-champagne">{featuredService.eyebrow}</p>
            <h2 className="max-w-md font-serif text-4xl leading-tight sm:text-5xl">{featuredService.title}</h2>
            <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-relaxed text-cream/75">
              {featuredService.text}
            </p>

            <div className="mt-10 flex justify-center">
              <CtaLink href="#agenda" variant="outline-inverse">
                {featuredService.cta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
