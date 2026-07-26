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

        <div className="flex flex-col justify-center px-6 py-20 md:col-span-6 md:px-16 md:py-20 lg:px-24 lg:py-24">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6 text-champagne">{featuredService.eyebrow}</p>
            <h2 className="max-w-md font-serif text-4xl leading-tight sm:text-5xl">{featuredService.title}</h2>
            <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-relaxed text-cream/75">
              {featuredService.text}
            </p>

            <ul className="mt-10 grid max-w-lg grid-cols-1 gap-x-8 gap-y-4 border-t border-cream/15 pt-8 sm:grid-cols-2">
              {featuredService.items.map((item, index) => (
                <li key={item} className="flex items-baseline gap-3 border-b border-cream/10 pb-3">
                  <span className="font-serif text-sm text-champagne">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-sans text-sm text-cream/90">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md font-sans text-xs italic text-cream/50">{featuredService.itemsNote}</p>

            <div className="mt-10">
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
