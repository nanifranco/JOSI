import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqIntro, faqs } from '../config/site'
import { Reveal } from './Reveal'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-ivory pb-20 pt-14 md:pb-28 md:pt-16 lg:pb-36 lg:pt-20">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <Reveal className="text-center">
          <p className="eyebrow mb-6">{faqIntro.eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{faqIntro.title}</h2>
        </Reveal>

        <div className="mt-16 border-t border-coffee/15">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div key={item.question} className="border-b border-coffee/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-lg text-coffee sm:text-xl">{item.question}</span>
                    <span
                      aria-hidden
                      className={`shrink-0 font-sans text-lg text-champagne transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 font-sans text-sm leading-relaxed text-taupe">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
