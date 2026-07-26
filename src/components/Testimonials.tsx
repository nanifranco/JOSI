import { testimonials, testimonialsIntro } from '../config/site'
import { Reveal } from './Reveal'

export function Testimonials() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="max-w-lg">
          <p className="eyebrow mb-6">{testimonialsIntro.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{testimonialsIntro.title}</h2>
          <p className="mt-5 font-sans text-xs italic text-taupe/70">{testimonialsIntro.note}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-coffee/15 pt-14 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <p className="font-serif text-xl italic leading-snug text-coffee">“{testimonial.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="font-sans text-sm text-coffee">{testimonial.name}</span>
                <span className="h-px w-4 bg-champagne" aria-hidden />
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.15em] text-taupe">
                  {testimonial.focus}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
