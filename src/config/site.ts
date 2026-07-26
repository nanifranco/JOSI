/**
 * ============================================================================
 *  JOSI MAKEUP — CONFIGURACIÓN CENTRAL DEL SITIO
 * ============================================================================
 *  Este es el ÚNICO archivo que debería tocarse para actualizar textos,
 *  precios, contacto, redes, horarios, servicios, preguntas frecuentes,
 *  testimonios y fotografías. Ningún otro componente debe tener datos de
 *  contacto ni textos "quemados" — todos los importan desde aquí.
 *
 *  Busca las etiquetas "EDITAR:" para ubicar rápidamente lo que debes
 *  reemplazar antes de publicar el sitio con información real.
 * ============================================================================
 */

export type ImageSlot = {
  /** Ruta a la imagen real, p. ej. "/images/hero.jpg". Vacío = placeholder editorial. */
  src: string
  /** Texto alternativo accesible. Descriptivo y en español. */
  alt: string
  /** Etiqueta breve mostrada sobre el marcador de posición (guía interna, no es un ícono). */
  label: string
}

const img = (label: string, alt: string): ImageSlot => ({ src: '', alt, label })

/**
 * Fotografías compartidas entre Servicios y la categoría "Caracterización" del
 * portafolio, para que ambas secciones muestren la misma imagen.
 */
const eventoXvImage = img('Caracterización 01', 'Maquillaje para XV años')
const eventoCelebracionImage = img('Caracterización 02', 'Maquillaje para una celebración especial')

/* ----------------------------------------------------------------------- */
/* CONTACTO — EDITAR: reemplaza con los datos reales antes de publicar     */
/* ----------------------------------------------------------------------- */
export const contact = {
  /**
   * EDITAR: número de WhatsApp en formato internacional, SOLO dígitos
   * (código de país + número). Ej. México: "521XXXXXXXXXX".
   * Se usa para el botón flotante y para el formulario de agenda.
   */
  whatsappNumber: '525511902816',

  /** EDITAR: usuario de Instagram (sin @) y URL completa. */
  instagramHandle: '@josimakeup',
  instagramUrl: 'https://instagram.com/josimakeup',

  /** EDITAR: nombre de la página de Facebook y URL completa. */
  facebookHandle: 'Josi Makeup',
  facebookUrl: 'https://facebook.com/josimakeup',

  /** EDITAR: zona o ciudad donde ofrece el servicio. */
  serviceZone: 'Ciudad de México y área metropolitana',

  /**
   * EDITAR (opcional, futuro): enlace a un sistema de reservas externo
   * (Calendly, Cal.com, Google Calendar Appointment Schedules, backend
   * propio). Mientras esté vacío, la sección de Agenda solo usa WhatsApp.
   * Ver src/lib/whatsapp.ts para la integración actual.
   */
  externalBookingUrl: '',
}

/* ----------------------------------------------------------------------- */
/* MARCA                                                                    */
/* ----------------------------------------------------------------------- */
export const brand = {
  name: 'JOSI',
  descriptor: 'MAKEUP',
  tagline: 'Maquillaje social, eventos y fiestas infantiles.',
}

/* ----------------------------------------------------------------------- */
/* NAVEGACIÓN                                                               */
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
export const hero = {
  eyebrow: 'Infantil · Social · Caracterización',
  title: 'Maquillaje que se siente como tú',
  text: 'Looks personalizados para resaltar tu esencia y hacerte sentir segura en cada momento especial.',
  primaryCta: 'Agenda tu cita',
  secondaryCta: 'Descubre mi trabajo',
  image: img('Fotografía editorial — maquillaje profesional', 'Retrato editorial de un maquillaje profesional realizado por Josi'),
}

/* ----------------------------------------------------------------------- */
/* SOBRE JOSI — EDITAR: datos personales reales                            */
/* ----------------------------------------------------------------------- */
export const about = {
  eyebrow: 'Sobre mí',
  title: 'Belleza creada desde la confianza',
  paragraphs: [
    'Hola, soy Josi. Me encanta ayudar a que cada persona se sienta segura y cómoda con su maquillaje. Para mí, no se trata de cambiar quién eres, sino de resaltar lo mejor de ti con un look que vaya contigo y con la ocasión.',
    'Cada rostro es diferente, por eso me gusta trabajar de forma personalizada. Escucho tus ideas, conozco el estilo que buscas y juntos encontramos un maquillaje que se vea bonito, natural y que te haga sentir tú misma.',
    'Mi objetivo es que disfrutes la experiencia de principio a fin y que, cuando te mires al espejo, te encante el resultado sin dejar de reconocerte.',
  ],
  photoMain: img('Fotografía de Josi', 'Retrato de Josi, maquillista profesional'),
}

/* ----------------------------------------------------------------------- */
/* SERVICIOS — EDITAR: precio estimado de cada servicio                    */
/* ----------------------------------------------------------------------- */
export type Service = {
  id: string
  number: string
  name: string
  description: string
  price: string
  image: ImageSlot
}

export const servicesIntro = {
  eyebrow: 'Servicios',
  title: 'Un look para cada momento',
  text: 'Cada servicio se adapta a tus facciones, estilo, tipo de evento y resultado que deseas.',
  note: 'Los servicios se ofrecen a domicilio o en sitio, según tu preferencia.',
  /** Los precios de abajo son un estimado de partida, no un monto fijo. */
  priceNote: 'Precio estimado. Puede variar si el trabajo es muy elaborado — el precio final se confirma directamente por WhatsApp.',
}

export const services: Service[] = [
  {
    id: 'social',
    number: '01',
    name: 'Maquillaje social y de eventos',
    description: 'Para cenas, cumpleaños, XV años, graduaciones y cualquier evento donde quieras verte impecable y sentirte tú misma.',
    price: 'En sitio: $500 MXN · A domicilio: según el trayecto.',
    image: eventoXvImage,
  },
  {
    id: 'infantil',
    number: '02',
    name: 'Fiestas infantiles y pinta caritas',
    description: 'Diseños divertidos y coloridos para celebrar en grande, a domicilio en la fiesta.',
    price: '$600 MXN/hora básico · $1,000 MXN/hora elaborado',
    image: eventoCelebracionImage,
  },
  {
    id: 'caracterizacion',
    number: '03',
    name: 'Maquillaje de caracterización',
    description: 'EDITAR: describe el tipo de caracterización que ofreces (teatral, fantasía, efectos especiales, disfraces, etc.).',
    price: 'Depende del diseño',
    image: img('Maquillaje de caracterización', 'Maquillaje de caracterización realizado por Josi'),
  },
]

/* ----------------------------------------------------------------------- */
/* SERVICIO DESTACADO — SOCIAL Y EVENTOS                                   */
/* ----------------------------------------------------------------------- */
export const featuredService = {
  eyebrow: 'Servicio destacado',
  title: 'Maquillaje para brillar en cada evento',
  text: 'Un servicio pensado para verte impecable en cenas, cumpleaños y celebraciones, con un maquillaje duradero y a tu medida.',
  cta: 'Cotizar maquillaje social',
  image: img('Maquillaje social o de evento', 'Maquillaje social para un evento nocturno'),
}

/* ----------------------------------------------------------------------- */
/* EXPERIENCIA DE RESERVA                                                   */
/* ----------------------------------------------------------------------- */
export const bookingProcess = {
  eyebrow: 'Cómo funciona',
  title: 'Así comienza tu experiencia',
  steps: [
    {
      number: '01',
      title: 'Elige tu servicio',
      text: 'Cuéntame qué evento tienes y el look que estás buscando.',
    },
    {
      number: '02',
      title: 'Consulta disponibilidad',
      text: 'Selecciona la fecha, horario y zona del servicio.',
    },
    {
      number: '03',
      title: 'Confirma tu cita',
      text: 'Recibe los detalles de disponibilidad, cotización y anticipo.',
    },
    {
      number: '04',
      title: 'Disfruta tu momento',
      text: 'Juntas crearemos un look pensado especialmente para ti.',
    },
  ],
}

/* ----------------------------------------------------------------------- */
/* AGENDA / FORMULARIO DE RESERVA                                          */
/* ----------------------------------------------------------------------- */
export const booking = {
  eyebrow: 'Agenda',
  title: 'Agenda tu cita',
  text: 'Comparte los datos de tu evento para consultar disponibilidad. Tu cita quedará confirmada después de recibir respuesta y realizar el anticipo correspondiente.',
  /** Las citas solo se realizan en fin de semana; para eventos lejanos se puede verificar disponibilidad por WhatsApp. */
  scheduleNote:
    'Las citas se realizan únicamente los fines de semana. Si tu evento todavía está lejos, puedes verificar la disponibilidad directamente por WhatsApp.',
  disclaimer: 'Enviar este formulario solicita disponibilidad; no confirma tu cita de forma automática.',
  serviceOptions: [
    { value: 'social', label: 'Social / Eventos' },
    { value: 'infantil', label: 'Fiesta infantil / pinta caritas' },
    { value: 'caracterizacion', label: 'Caracterización' },
    { value: 'otro', label: 'Otro' },
  ],
  whatsappGreeting: 'Hola, Josi. Me gustaría consultar disponibilidad para una cita de maquillaje.',
}

/* ----------------------------------------------------------------------- */
/* PORTAFOLIO — EDITAR: sustituye por fotografías reales                   */
/* ----------------------------------------------------------------------- */
export type PortfolioCategory = 'social' | 'infantil' | 'caracterizacion'

export type PortfolioItem = {
  id: string
  category: PortfolioCategory
  orientation: 'vertical' | 'horizontal'
  image: ImageSlot
}

export const portfolioIntro = {
  eyebrow: 'Portafolio',
  title: 'Cada look cuenta una historia',
}

export const portfolioFilters: { value: 'todos' | PortfolioCategory; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'social', label: 'Social' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'caracterizacion', label: 'Caracterización' },
]

export const portfolio: PortfolioItem[] = [
  { id: 'p1', category: 'infantil', orientation: 'vertical', image: img('Fiesta infantil 01', 'Pinta caritas en fiesta infantil') },
  { id: 'p2', category: 'social', orientation: 'horizontal', image: img('Social 01', 'Maquillaje social con acabado luminoso') },
  { id: 'p3', category: 'social', orientation: 'vertical', image: img('Social 04', 'Maquillaje social de alto contraste') },
  { id: 'p4', category: 'caracterizacion', orientation: 'horizontal', image: eventoCelebracionImage },
  { id: 'p5', category: 'infantil', orientation: 'horizontal', image: img('Fiesta infantil 02', 'Diseño de pinta caritas temático') },
  { id: 'p6', category: 'social', orientation: 'vertical', image: img('Social 02', 'Maquillaje social diurno') },
  { id: 'p7', category: 'caracterizacion', orientation: 'vertical', image: eventoXvImage },
  { id: 'p8', category: 'caracterizacion', orientation: 'horizontal', image: img('Caracterización 03', 'Maquillaje de caracterización') },
  { id: 'p9', category: 'infantil', orientation: 'vertical', image: img('Fiesta infantil 03', 'Detalle de pinta caritas en fiesta infantil') },
  { id: 'p10', category: 'social', orientation: 'horizontal', image: img('Social 03', 'Maquillaje social para graduación') },
]

/* ----------------------------------------------------------------------- */
/* PREGUNTAS FRECUENTES — EDITAR: respuestas provisionales                 */
/* ----------------------------------------------------------------------- */
export const faqIntro = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Antes de agendar',
}

export const faqs = [
  {
    question: '¿Con cuánto tiempo debo reservar?',
    answer: 'Como mínimo, con 24 horas de anticipación — el formulario de Agenda no permite seleccionar una fecha más próxima que esa. EDITAR: se recomienda reservar con más tiempo, especialmente para fechas de temporada alta como fines de semana y meses de graduaciones.',
  },
  {
    question: '¿Trabajas a domicilio?',
    answer: 'Sí, ofrezco servicio a domicilio (el costo varía según el trayecto) y también puedes agendar en sitio. EDITAR: confirmar zona de cobertura y costo de traslado según distancia.',
  },
  {
    question: '¿Cómo se confirma una cita?',
    answer: 'EDITAR: tu cita se confirma una vez que se acuerda la disponibilidad y se realiza el anticipo correspondiente.',
  },
  {
    question: '¿Es necesario realizar un anticipo?',
    answer: 'Sí, se solicita un anticipo para apartar la fecha. Por el momento se recibe por transferencia bancaria — EDITAR: confirmar monto y datos bancarios que se comparten al confirmar disponibilidad.',
  },
  {
    question: '¿Puedo mandarte referencias del maquillaje?',
    answer: 'Sí, de hecho lo recomiendo. Puedes compartir fotos o un enlace de inspiración en el formulario de agenda o por WhatsApp.',
  },
  {
    question: '¿Cuánto dura el servicio?',
    answer: 'EDITAR: la duración varía según el tipo de maquillaje y si incluye peinado o preparación de piel adicional.',
  },
  {
    question: '¿Qué debo hacer antes de mi cita?',
    answer: 'EDITAR: se recomienda llegar con el rostro limpio, sin maquillaje previo, y comunicar con anticipación cualquier sensibilidad de piel.',
  },
  {
    question: '¿Qué incluye el servicio de pinta caritas?',
    answer: 'EDITAR: cuéntanos qué diseños, materiales y tiempo incluye el servicio de pinta caritas para fiestas infantiles.',
  },
]

/* ----------------------------------------------------------------------- */
/* CTA FINAL                                                                */
/* ----------------------------------------------------------------------- */
export const finalCta = {
  title: 'Tu momento merece sentirse especial',
  text: 'Cuéntame qué tienes en mente y creemos juntas el look ideal para ti.',
  primaryCta: 'Agenda tu cita',
  image: img('Fotografía final', 'Fotografía editorial de cierre'),
}

/* ----------------------------------------------------------------------- */
/* FOOTER                                                                   */
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
