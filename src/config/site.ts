/**
 * ============================================================================
 *  JOSI MAKEUP — CONFIGURACIÓN CENTRAL DEL SITIO
 * ============================================================================
 *  El contenido real (textos, precios, fotos) vive en los archivos JSON de
 *  src/content/ y se edita desde el panel /admin (Decap CMS) o directamente
 *  en esos archivos. Este archivo solo define los tipos y reexporta los
 *  datos con el mismo nombre que ya usan los componentes — no debería
 *  necesitar cambios al agregar/editar contenido.
 *
 *  navLinks y footerLinks se quedan como código (son anclas de navegación,
 *  no contenido de negocio) y no son editables desde el panel.
 * ============================================================================
 */

import brandData from '../content/brand.json'
import contactData from '../content/contact.json'
import heroData from '../content/hero.json'
import aboutData from '../content/about.json'
import servicesIntroData from '../content/services-intro.json'
import servicesData from '../content/services.json'
import featuredServiceData from '../content/featured-service.json'
import bookingProcessData from '../content/booking-process.json'
import onSiteData from '../content/on-site.json'
import bookingData from '../content/booking.json'
import portfolioIntroData from '../content/portfolio-intro.json'
import portfolioData from '../content/portfolio.json'
import faqIntroData from '../content/faq-intro.json'
import faqData from '../content/faq.json'

export type ImageSlot = {
  /** Ruta a la imagen real, p. ej. "/images/hero.jpg". Vacío = placeholder editorial. */
  src: string
  /** Texto alternativo accesible. Descriptivo y en español. */
  alt: string
  /** Etiqueta breve mostrada sobre el marcador de posición (guía interna, no es un ícono). */
  label: string
}

/* ----------------------------------------------------------------------- */
/* CONTACTO                                                                 */
/* ----------------------------------------------------------------------- */
export const contact = contactData

/* ----------------------------------------------------------------------- */
/* MARCA                                                                    */
/* ----------------------------------------------------------------------- */
export const brand = brandData

/* ----------------------------------------------------------------------- */
/* NAVEGACIÓN — anclas de código, no editables desde el panel              */
/* ----------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-josi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contacto', href: '#contacto' },
]

/* ----------------------------------------------------------------------- */
/* HERO                                                                     */
/* ----------------------------------------------------------------------- */
export const hero = heroData

/* ----------------------------------------------------------------------- */
/* SOBRE JOSI                                                               */
/* ----------------------------------------------------------------------- */
export const about = {
  ...aboutData,
  paragraphs: aboutData.paragraphs.map((p) => p.line),
}

/* ----------------------------------------------------------------------- */
/* SERVICIOS                                                                */
/* ----------------------------------------------------------------------- */
export type Service = {
  id: string
  number: string
  name: string
  description: string
  /** Cada elemento se muestra en su propia línea (una por modalidad). */
  price: string[]
  image: ImageSlot
}

export const servicesIntro = servicesIntroData
export const services: Service[] = servicesData.items.map((item) => ({
  ...item,
  price: item.price.map((p) => p.line),
}))

/* ----------------------------------------------------------------------- */
/* SERVICIO DESTACADO — CARACTERIZACIÓN                                    */
/* ----------------------------------------------------------------------- */
export const featuredService = featuredServiceData

/* ----------------------------------------------------------------------- */
/* EXPERIENCIA DE RESERVA                                                   */
/* ----------------------------------------------------------------------- */
export const bookingProcess = bookingProcessData

/* ----------------------------------------------------------------------- */
/* EN SITIO                                                                 */
/* ----------------------------------------------------------------------- */
export const onSite = onSiteData

/* ----------------------------------------------------------------------- */
/* AGENDA / FORMULARIO DE RESERVA                                          */
/* ----------------------------------------------------------------------- */
export const booking = bookingData

/* ----------------------------------------------------------------------- */
/* PORTAFOLIO                                                               */
/* ----------------------------------------------------------------------- */
export type PortfolioCategory = 'social' | 'infantil' | 'caracterizacion'

export type PortfolioItem = {
  id: string
  category: PortfolioCategory
  orientation: 'vertical' | 'horizontal'
  image: ImageSlot
}

export const portfolioIntro = portfolioIntroData
export const portfolio: PortfolioItem[] = portfolioData.items as PortfolioItem[]

export const portfolioFilters: { value: 'todos' | PortfolioCategory; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'social', label: 'Social' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'caracterizacion', label: 'Caracterización' },
]

/* ----------------------------------------------------------------------- */
/* PREGUNTAS FRECUENTES                                                     */
/* ----------------------------------------------------------------------- */
export const faqIntro = faqIntroData
export const faqs = faqData.items

/* ----------------------------------------------------------------------- */
/* FOOTER — anclas de código, no editables desde el panel                  */
/* ----------------------------------------------------------------------- */
export const footerLinks = {
  site: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre mí', href: '#sobre-josi' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Agenda', href: '#agenda' },
  ],
}
