import { services, servicesIntro } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section id="servicios" className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-6">{servicesIntro.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{servicesIntro.title}</h2>
          <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-taupe">{servicesIntro.text}</p>
          <p className="mt-4 font-sans text-xs italic text-taupe/70">{servicesIntro.note}</p>
        </Reveal>

        <div className="mt-16 border-t border-coffee/15">
          {services.map((service, index) => {
            const withImage = index % 2 === 0
            return (
              <Reveal key={service.id}>
                <div className="grid items-center gap-x-6 gap-y-6 border-b border-coffee/15 py-10 md:grid-cols-12">
                  <span className="font-serif text-lg text-champagne-deep md:col-span-1">{service.number}</span>

                  <div className="md:col-span-4">
                    <h3 className="font-serif text-2xl text-coffee">{service.name}</h3>
                    <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-taupe">
                      {service.description}
                    </p>
                  </div>

                  {withImage ? (
                    <div className="aspect-[4/3] w-full md:col-span-3">
                      <PlaceholderImage slot={service.image} tone="blush" className="h-full w-full" />
                    </div>
                  ) : (
                    <div className="hidden md:col-span-3 md:block" aria-hidden />
                  )}

                  <div className="flex gap-8 md:col-span-4">
                    <div>
                      <p className="eyebrow mb-1.5 text-[0.58rem]">Duración</p>
                      <p className="font-serif text-base text-coffee">{service.duration}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-1.5 text-[0.58rem]">Inversión</p>
                      <p className="font-serif text-base text-coffee">{service.price}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
