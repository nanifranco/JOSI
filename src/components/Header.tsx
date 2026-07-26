import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { brand, navLinks } from '../config/site'
import { CtaLink } from './Cta'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-cream/95 backdrop-blur-sm' : 'bg-cream/40 backdrop-blur-[2px]'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-[padding] duration-500 md:px-12 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <a href="#inicio" className="leading-none" onClick={() => setOpen(false)}>
          <span className="block font-serif text-[1.7rem] tracking-[0.12em] text-coffee">{brand.name}</span>
          <span className="my-1.5 block h-px w-5 bg-champagne" aria-hidden="true" />
          <span className="block font-sans text-[0.55rem] font-medium tracking-[0.5em] text-taupe">
            {brand.descriptor}
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-coffee/80 transition-colors duration-300 hover:border-champagne hover:text-coffee"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaLink href="#agenda" variant="outline">
            Agenda tu cita
          </CtaLink>
        </div>

        <button
          type="button"
          className="text-coffee md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegación móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-coffee/10 bg-cream px-6 pb-8 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-coffee/10 py-4 font-serif text-xl text-coffee"
                >
                  {link.label}
                </a>
              ))}
              <CtaLink href="#agenda" variant="solid" className="mt-6 w-full" onClick={() => setOpen(false)}>
                Agenda tu cita
              </CtaLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
