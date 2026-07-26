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

  /** EDITAR: correo de contacto. */
  email: 'hola@josimakeup.com',

  /** EDITAR: zona o ciudad donde ofrece el servicio. */
  serviceZone: 'Ciudad de México y área metropolitana',

  /** EDITAR: horarios de atención, uno por línea. */
  hours: [
    { day: 'Lunes a viernes', time: '10:00 – 18:00' },
    { day: 'Sábados', time: '9:00 – 14:00' },
    { day: 'Domingos', time: 'Cerrado' },
  ],

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
  tagline: 'Maquillaje social, eventos y fiestas infantiles — a domicilio.',
}

/* ----------------------------------------------------------------------- */
/* NAVEGACIÓN                                                               */
/* ----------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Josi', href: '#sobre-josi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contacto', href: '#contacto' },
]

/* ----------------------------------------------------------------------- */
/* HERO                                                                     */
/* ----------------------------------------------------------------------- */
export const hero = {
  eyebrow: 'Social · Fiestas infantiles · Eventos',
  title: 'Maquillaje que se siente como tú',
  text: 'Looks personalizados para resaltar tu esencia y hacerte sentir segura en cada momento especial.',
  primaryCta: 'Agenda tu cita',
  secondaryCta: 'Descubre mi trabajo',
  image: img('Fotografía editorial — maquillaje profesional a domicilio', 'Retrato editorial de un maquillaje profesional realizado por Josi'),
}

/* ----------------------------------------------------------------------- */
/* SOBRE JOSI — EDITAR: datos personales reales                            */
/* ----------------------------------------------------------------------- */
export const about = {
  eyebrow: 'Sobre Josi',
  title: 'Belleza creada desde la confianza',
  paragraphs: [
    'Hola, soy Josi. Para mí, el maquillaje no se trata de cubrir o transformar quién eres, sino de resaltar aquello que ya te hace especial.',
    'Cada rostro, estilo y ocasión son distintos, por eso trabajo cada look de manera personalizada. Me gusta escuchar lo que imaginas, conocer cómo quieres sentirte y crear contigo un maquillaje que se vea hermoso tanto en persona como en fotografías.',
    'Mi intención es que disfrutes el proceso, te sientas cómoda y, cuando te mires al espejo, sigas reconociéndote a ti misma.',
  ],
  quote: 'No quiero cambiar tu rostro; quiero ayudarte a verlo con otros ojos.',
  signature: 'Josi',
  photoMain: img('Fotografía de Josi', 'Retrato de Josi, maquillista profesional'),
  photoDetail: img('Detalle de trabajo', 'Detalle de un maquillaje realizado por Josi'),
}

/* ----------------------------------------------------------------------- */
/* SERVICIOS — EDITAR: duración y precio de cada servicio                  */
/* ----------------------------------------------------------------------- */
export type Service = {
  id: string
  number: string
  name: string
  description: string
  duration: string
  price: string
  image: ImageSlot
}

export const servicesIntro = {
  eyebrow: 'Servicios',
  title: 'Un look para cada momento',
  text: 'Cada servicio se adapta a tus facciones, estilo, tipo de evento y resultado que deseas.',
  /** Por ahora Josi no cuenta con estudio propio: todo el servicio es a domicilio. */
  note: 'Por el momento, todos los servicios se ofrecen a domicilio.',
}

export const services: Service[] = [
  {
    id: 'social',
    number: '01',
    name: 'Maquillaje social',
    description: 'Para cenas, cumpleaños o cualquier ocasión donde quieras verte impecable y sentirte tú misma.',
    duration: 'EDITAR: duración',
    price: 'Cotización personalizada',
    image: img('Maquillaje social', 'Maquillaje social realizado por Josi'),
  },
  {
    id: 'xv',
    number: '02',
    name: 'Maquillaje para XV años',
    description: 'Un look fresco y elegante para celebrar esta etapa, cuidando que se sienta natural en las fotografías.',
    duration: 'EDITAR: duración',
    price: 'Cotización personalizada',
    image: img('Maquillaje XV años', 'Maquillaje para quince años realizado por Josi'),
  },
  {
    id: 'graduacion',
    number: '03',
    name: 'Maquillaje para graduación',
    description: 'Un maquillaje pulido y duradero, pensado para acompañarte durante toda la ceremonia y celebración.',
    duration: 'EDITAR: duración',
    price: 'Cotización personalizada',
    image: img('Maquillaje de graduación', 'Maquillaje de graduación realizado por Josi'),
  },
  {
    id: 'infantil',
    number: '04',
    name: 'Fiestas infantiles y pinta caritas',
    description: 'Diseños divertidos y coloridos para celebrar en grande, a domicilio en la fiesta. Ver sección dedicada más abajo.',
    duration: 'EDITAR: duración',
    price: 'Cotización personalizada',
    image: img('Fiesta infantil', 'Pinta caritas en fiesta infantil realizado por Josi'),
  },
]

/* ----------------------------------------------------------------------- */
/* SERVICIO DESTACADO — SOCIAL Y EVENTOS                                   */
/* ----------------------------------------------------------------------- */
export const featuredService = {
  eyebrow: 'Servicio destacado',
  title: 'Maquillaje para brillar en cada evento',
  text: 'Un servicio pensado para verte impecable en cenas, cumpleaños y celebraciones, con un maquillaje duradero y a tu medida.',
  /**
   * EDITAR: estos son los elementos que PODRÍA incluir el servicio social o
   * de eventos. No representan un paquete confirmado ni su alcance final —
   * Josi debe definir qué incluye cada opción antes de publicarlo como
   * definitivo.
   */
  items: [
    'Maquillaje social',
    'Maquillaje para eventos',
    'Piel de larga duración',
    'Pestañas (opcional)',
    'Retoque durante el evento',
    'Servicio a domicilio',
  ],
  itemsNote: 'Elementos editables — el contenido final del servicio se confirma directamente con Josi.',
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
  /** Por ahora Josi no cuenta con estudio propio: todo el servicio es a domicilio. */
  note: 'Por el momento, el servicio es únicamente a domicilio — todavía no hay estudio propio.',
  disclaimer: 'Enviar este formulario solicita disponibilidad; no confirma tu cita de forma automática.',
  serviceOptions: [
    { value: 'social', label: 'Social' },
    { value: 'xv', label: 'XV años' },
    { value: 'graduacion', label: 'Graduación' },
    { value: 'infantil', label: 'Fiesta infantil / pinta caritas' },
    { value: 'otro', label: 'Otro' },
  ],
  whatsappGreeting: 'Hola, Josi. Me gustaría consultar disponibilidad para una cita de maquillaje.',
  privacyNoticeText: 'He leído y acepto el aviso de privacidad.',
}

/* ----------------------------------------------------------------------- */
/* PORTAFOLIO — EDITAR: sustituye por fotografías reales                   */
/* ----------------------------------------------------------------------- */
export type PortfolioCategory = 'social' | 'infantil' | 'eventos' | 'editorial'

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
  { value: 'eventos', label: 'Eventos' },
  { value: 'editorial', label: 'Editorial' },
]

export const portfolio: PortfolioItem[] = [
  { id: 'p1', category: 'infantil', orientation: 'vertical', image: img('Fiesta infantil 01', 'Pinta caritas en fiesta infantil') },
  { id: 'p2', category: 'social', orientation: 'horizontal', image: img('Social 01', 'Maquillaje social con acabado luminoso') },
  { id: 'p3', category: 'editorial', orientation: 'vertical', image: img('Editorial 01', 'Maquillaje editorial de alto contraste') },
  { id: 'p4', category: 'eventos', orientation: 'horizontal', image: img('Eventos 01', 'Maquillaje para evento de noche') },
  { id: 'p5', category: 'infantil', orientation: 'horizontal', image: img('Fiesta infantil 02', 'Diseño de pinta caritas temático') },
  { id: 'p6', category: 'social', orientation: 'vertical', image: img('Social 02', 'Maquillaje social diurno') },
  { id: 'p7', category: 'eventos', orientation: 'vertical', image: img('Eventos 02', 'Maquillaje para XV años') },
  { id: 'p8', category: 'editorial', orientation: 'horizontal', image: img('Editorial 02', 'Sesión editorial de belleza') },
  { id: 'p9', category: 'infantil', orientation: 'vertical', image: img('Fiesta infantil 03', 'Detalle de pinta caritas en fiesta infantil') },
  { id: 'p10', category: 'social', orientation: 'horizontal', image: img('Social 03', 'Maquillaje social para graduación') },
]

/* ----------------------------------------------------------------------- */
/* TESTIMONIOS — EJEMPLO: reemplazar con testimonios reales                */
/* ----------------------------------------------------------------------- */
export const testimonialsIntro = {
  eyebrow: 'Testimonios',
  title: 'Cómo se sintieron',
  note: 'Textos de ejemplo — sustituir por testimonios reales de clientas.',
}

export const testimonials = [
  {
    quote: 'Me sentí muy cómoda durante toda la sesión, Josi es súper atenta y el ambiente fue muy relajado.',
    name: 'Andrea M.',
    focus: 'Trato y comodidad',
  },
  {
    quote: 'El maquillaje se mantuvo intacto toda la noche, hasta en las fotos del final de la fiesta se veía perfecto.',
    name: 'Renata G.',
    focus: 'Duración del maquillaje',
  },
  {
    quote: 'Quedé enamorada del resultado, era justo lo que tenía en mente pero mejor. Totalmente recomendada.',
    name: 'Paola V.',
    focus: 'Satisfacción con el resultado',
  },
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
    answer: 'EDITAR: se recomienda agendar con anticipación, especialmente para fechas de temporada alta como fines de semana y meses de graduaciones.',
  },
  {
    question: '¿Trabajas a domicilio?',
    answer: 'Sí — por ahora el servicio es únicamente a domicilio, dentro de la zona de cobertura. EDITAR: confirmar si fuera de esa zona aplica un costo adicional de traslado.',
  },
  {
    question: '¿Cómo se confirma una cita?',
    answer: 'EDITAR: tu cita se confirma una vez que se acuerda la disponibilidad y se realiza el anticipo correspondiente.',
  },
  {
    question: '¿Es necesario realizar un anticipo?',
    answer: 'EDITAR: sí, se solicita un anticipo para apartar la fecha. El monto y forma de pago se comparten al confirmar disponibilidad.',
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
  secondaryCta: 'Escríbeme por WhatsApp',
  image: img('Fotografía final', 'Fotografía editorial de cierre'),
}

/* ----------------------------------------------------------------------- */
/* FOOTER                                                                   */
/* ----------------------------------------------------------------------- */
export const footerLinks = {
  site: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre Josi', href: '#sobre-josi' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Agenda', href: '#agenda' },
  ],
}
