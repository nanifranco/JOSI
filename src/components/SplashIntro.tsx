import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand } from '../config/site'

/**
 * Breve animación de bienvenida con el logotipo antes de mostrar el
 * sitio. Se omite por completo si la persona prefiere menos movimiento.
 */
export function SplashIntro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-serif text-5xl tracking-[0.15em] text-coffee sm:text-6xl">{brand.name}</span>
            <motion.span
              className="mt-3 h-px bg-champagne"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="mt-3 font-sans text-[0.62rem] font-medium tracking-[0.55em] text-taupe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {brand.descriptor}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
