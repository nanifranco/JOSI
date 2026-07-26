import { about } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

export function AboutJosi() {
  return (
    <section id="sobre-josi" className="bg-ivory py-28 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-6 md:px-12">
        {/* Fotografía principal */}
        <Reveal className="md:col-span-5">
          <div className="aspect-[4/5] w-full">
            <PlaceholderImage slot={about.photoMain} tone="ivory" className="h-full w-full" />
          </div>
        </Reveal>

        {/* Texto personal */}
        <div className="flex flex-col justify-center md:col-span-7 md:pl-16 lg:pl-24">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6">{about.eyebrow}</p>
            <h2 className="max-w-lg font-serif text-4xl leading-[1.15] text-coffee sm:text-5xl">{about.title}</h2>

            <div className="mt-9 max-w-xl space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="font-sans text-[0.95rem] leading-relaxed text-taupe">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
