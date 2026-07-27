import { services, servicesIntro } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section id="servicios" className="bg-ivory pb-20 pt-14 md:pb-28 md:pt-16 lg:pb-36 lg:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-6">{servicesIntro.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{servicesIntro.title}</h2>
          <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-taupe">{servicesIntro.text}</p>
          <p className="mt-4 font-sans text-xs italic text-taupe/70">{servicesIntro.note}</p>
        </Reveal>

        <div className="mt-16 space-y-16 md:space-y-24">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 0

            return (
              <Reveal key={service.id}>
                <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                  <div
                    className={`aspect-[4/3] w-full md:col-span-6 ${imageFirst ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <PlaceholderImage slot={service.image} tone="blush" className="h-full w-full" />
                  </div>

                  <div
                    className={`md:col-span-6 ${
                      imageFirst ? 'md:order-2 md:pl-12 lg:pl-20' : 'md:order-1 md:pr-12 lg:pr-20'
                    }`}
                  >
                    <span className="font-serif text-lg text-champagne-deep">{service.number}</span>
                    <h3 className="mt-3 font-serif text-3xl text-coffee sm:text-4xl">{service.name}</h3>
                    <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-taupe">
                      {service.description}
                    </p>

                    <div className="mt-8">
                      <p className="eyebrow mb-1.5 text-[0.58rem]">Inversión</p>
                      {service.price.map((line) => (
                        <p key={line} className="font-serif text-base text-coffee">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-16 max-w-xl border-t border-coffee/15 pt-6 font-sans text-xs italic text-taupe/70">
          {servicesIntro.priceNote}
        </p>
      </div>
    </section>
  )
}
