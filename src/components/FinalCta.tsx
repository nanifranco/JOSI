import { finalCta } from '../config/site'
import { contact } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { CtaLink } from './Cta'
import { Reveal } from './Reveal'

export function FinalCta() {
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}`

  return (
    <section className="bg-cream">
      <div className="grid md:grid-cols-12">
        <div className="order-2 h-[46vh] md:order-1 md:col-span-6 md:h-auto">
          <PlaceholderImage slot={finalCta.image} tone="champagne" className="h-full w-full" />
        </div>

        <div className="order-1 flex flex-col justify-center px-6 py-20 md:order-2 md:col-span-6 md:px-16 md:py-0 lg:px-24">
          <Reveal>
            <h2 className="max-w-md font-serif text-4xl leading-tight text-coffee sm:text-5xl">{finalCta.title}</h2>
            <p className="mt-6 max-w-sm font-sans text-[0.95rem] leading-relaxed text-taupe">{finalCta.text}</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <CtaLink href="#agenda" variant="solid">
                {finalCta.primaryCta}
              </CtaLink>
              <CtaLink href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="text">
                {finalCta.secondaryCta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
