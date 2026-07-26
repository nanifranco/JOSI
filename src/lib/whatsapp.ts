import { booking, contact } from '../config/site'

export type ServiceMode = 'domicilio' | 'estudio'

export type BookingFormData = {
  fullName: string
  service: string
  eventDate: string
  eventTime: string
  guestCount: string
  serviceMode: ServiceMode | ''
  location: string
  message: string
  inspirationLink: string
}

const serviceLabel = (value: string) =>
  booking.serviceOptions.find((option) => option.value === value)?.label ?? value

const serviceModeLabel = (value: BookingFormData['serviceMode']) =>
  value === 'estudio' ? 'En el lugar de Josi' : value === 'domicilio' ? 'A domicilio' : ''

/** Construye el mensaje de WhatsApp a partir de los datos del formulario de agenda. */
export function buildWhatsappMessage(data: BookingFormData): string {
  const lines = [
    booking.whatsappGreeting,
    '',
    `Nombre: ${data.fullName}`,
    `Servicio: ${serviceLabel(data.service)}`,
    `Fecha del evento: ${data.eventDate}`,
    data.eventTime && `Hora aproximada: ${data.eventTime}`,
    data.guestCount && `Número de personas: ${data.guestCount}`,
    `Modalidad: ${serviceModeLabel(data.serviceMode)}`,
    data.serviceMode === 'domicilio' && data.location && `Dirección: ${data.location}`,
    data.message && `Mensaje / referencias: ${data.message}`,
    data.inspirationLink && `Inspiración: ${data.inspirationLink}`,
  ].filter(Boolean)

  return lines.join('\n')
}

/**
 * Abre WhatsApp con el mensaje precargado. Se navega en la misma pestaña
 * (en vez de abrir una ventana nueva) porque es el patrón más confiable
 * para que los navegadores móviles completen el salto a la app de WhatsApp.
 */
export function openWhatsapp(message: string) {
  const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
  window.location.href = url
}
