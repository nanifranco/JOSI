import { MessageCircle } from 'lucide-react'
import { contact } from '../config/site'

/** Botón flotante discreto — pequeño, sin competir con el contenido. */
export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${contact.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center border border-coffee/15 bg-coffee text-cream shadow-none transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={20} strokeWidth={1.4} />
    </a>
  )
}
