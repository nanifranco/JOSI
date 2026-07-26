import { bookingProcess } from '../config/site'
import { Reveal } from './Reveal'

export function BookingProcess() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="max-w-lg">
          <p className="eyebrow mb-6">{bookingProcess.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{bookingProcess.title}</h2>
        </Reveal>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {bookingProcess.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div
                className={`h-full pr-8 lg:border-l lg:border-coffee/15 lg:pl-8 ${
                  index === 0 ? 'lg:border-l-0 lg:pl-0' : ''
                }`}
              >
                <span className="font-serif text-5xl text-champagne-deep">{step.number}</span>
                <h3 className="mt-6 font-serif text-xl text-coffee">{step.title}</h3>
                <p className="mt-3 max-w-[22ch] font-sans text-sm leading-relaxed text-taupe">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
