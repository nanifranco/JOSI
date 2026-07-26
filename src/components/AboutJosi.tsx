import { about } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

export function AboutJosi() {
  return (
    <section id="sobre-josi" className="bg-ivory py-28 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-6 md:px-12">
        {/* Composición fotográfica asimétrica */}
        <Reveal className="relative pb-16 md:col-span-5 md:pb-0">
          <div className="aspect-[4/5] w-[86%]">
            <PlaceholderImage slot={about.photoMain} tone="ivory" className="h-full w-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-[46%] border-[10px] border-ivory md:right-4">
            <div className="aspect-[3/4]">
              <PlaceholderImage slot={about.photoDetail} tone="champagne" className="h-full w-full" />
            </div>
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
