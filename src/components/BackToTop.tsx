import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Aparece únicamente después de desplazarse — vuelve al inicio de la página. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="#inicio"
      aria-label="Volver al inicio"
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center border border-coffee/20 bg-cream/90 text-coffee backdrop-blur-sm transition-transform duration-300 hover:scale-105 md:bottom-8 md:left-8"
    >
      <ArrowUp size={18} strokeWidth={1.4} />
    </a>
  )
}
