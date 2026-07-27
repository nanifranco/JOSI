import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { portfolio, portfolioFilters, portfolioIntro, type PortfolioCategory } from '../config/site'
import { PlaceholderImage } from './PlaceholderImage'
import { Reveal } from './Reveal'

type Filter = 'todos' | PortfolioCategory

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = filter === 'todos' ? portfolio : portfolio.filter((item) => item.category === filter)

  useEffect(() => {
    setActiveIndex(null)
  }, [filter])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % items.length))
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, items.length])

  const activeItem = activeIndex !== null ? items[activeIndex] : null

  return (
    <section id="portafolio" className="bg-white pb-20 pt-14 md:pb-28 md:pt-16 lg:pb-36 lg:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-6">{portfolioIntro.eyebrow}</p>
            <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{portfolioIntro.title}</h2>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label="Filtrar portafolio por categoría">
            {portfolioFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`border-b pb-1 font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f.value ? 'border-coffee text-coffee' : 'border-transparent text-taupe hover:text-coffee'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`mb-5 block w-full break-inside-avoid focus-visible:outline-offset-4 ${
                item.orientation === 'vertical' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <PlaceholderImage
                slot={{ ...item.image, label: portfolioFilters.find((f) => f.value === item.category)?.label ?? item.image.label }}
                tone={index % 2 === 0 ? 'blush' : 'champagne'}
                className="h-full w-full"
                showLabel
              />
            </button>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.image.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-coffee/97 px-4 py-10"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Cerrar galería"
            className="absolute right-5 top-5 text-cream/80 hover:text-cream"
          >
            <X size={26} strokeWidth={1.2} />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
            aria-label="Fotografía anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream sm:left-8"
          >
            <ChevronLeft size={30} strokeWidth={1.1} />
          </button>

          <div className="max-h-[70vh] w-full max-w-xl">
            <div className="aspect-[3/4] max-h-[70vh] w-full">
              <PlaceholderImage slot={activeItem.image} tone="coffee" className="h-full w-full" />
            </div>
            <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.2em] text-cream/60">
              {portfolioFilters.find((f) => f.value === activeItem.category)?.label ?? activeItem.image.label}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % items.length))}
            aria-label="Fotografía siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream sm:right-8"
          >
            <ChevronRight size={30} strokeWidth={1.1} />
          </button>
        </div>
      )}
    </section>
  )
}
