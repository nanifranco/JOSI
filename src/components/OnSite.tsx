import { onSite } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

export function OnSite() {
  return (
    <section id="en-sitio" className="bg-ivory pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-6 md:px-12">
        <Reveal className="order-2 md:order-1 md:col-span-7 md:flex md:flex-col md:justify-start md:pr-16 lg:pr-24">
          <p className="eyebrow mb-6">{onSite.eyebrow}</p>
          <h2 className="max-w-lg font-serif text-4xl leading-[1.15] text-coffee sm:text-5xl">{onSite.title}</h2>

          <p className="mt-9 max-w-xl font-sans text-[0.95rem] leading-relaxed text-taupe">{onSite.text}</p>
          <p className="mt-4 max-w-xl font-sans text-[0.95rem] text-taupe">{onSite.zone}</p>
          <p className="mt-4 max-w-xl font-sans text-xs italic text-taupe/70">{onSite.note}</p>
        </Reveal>

        <Reveal className="order-1 md:order-2 md:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] w-full">
              <PlaceholderImage slot={onSite.photo} tone="champagne" className="h-full w-full" />
            </div>
            <div className="aspect-[3/4] w-full mt-8">
              <PlaceholderImage slot={onSite.photoSecondary} tone="blush" className="h-full w-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
