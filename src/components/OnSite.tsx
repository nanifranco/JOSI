import { onSite } from '../config/site'
import { Reveal } from './Reveal'

export function OnSite() {
  return (
    <section id="en-sitio" className="bg-ivory py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-6 md:px-12">
        <Reveal className="order-2 md:order-1 md:col-span-8 md:flex md:flex-col md:justify-start md:pr-16 lg:pr-24">
          <p className="eyebrow mb-6">{onSite.eyebrow}</p>
          <h2 className="max-w-lg font-serif text-4xl leading-[1.15] text-coffee sm:text-5xl">{onSite.title}</h2>

          <p className="mt-9 max-w-xl font-sans text-[0.95rem] leading-relaxed text-taupe">{onSite.text}</p>
          <p className="mt-4 max-w-xl font-sans text-[0.95rem] text-taupe">{onSite.zone}</p>
          <p className="mt-4 max-w-xl font-sans text-xs italic text-taupe/70">{onSite.note}</p>
        </Reveal>

        <Reveal className="order-1 md:order-2 md:col-span-4">
          <div className="aspect-square w-full border border-coffee/10">
            <iframe
              title="Zona general de trabajo (sin dirección exacta)"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(onSite.mapQuery)}&z=14&output=embed`}
              className="h-full w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
