import { booking, contact } from '../config/site'

export type BookingFormData = {
  fullName: string
  whatsapp: string
  email: string
  service: string
  eventDate: string
  eventTime: string
  guestCount: string
  location: string
  serviceMode: string
  message: string
  inspirationLink: string
}

const serviceLabel = (value: string) =>
  booking.serviceOptions.find((option) => option.value === value)?.label ?? value

const locationModeLabel = (value: string) =>
  booking.locationOptions.find((option) => option.value === value)?.label ?? value

/** Construye el mensaje de WhatsApp a partir de los datos del formulario de agenda. */
export function buildWhatsappMessage(data: BookingFormData): string {
  const lines = [
    booking.whatsappGreeting,
    '',
    `Nombre: ${data.fullName}`,
    `WhatsApp: ${data.whatsapp}`,
    data.email && `Correo: ${data.email}`,
    `Servicio: ${serviceLabel(data.service)}`,
    `Fecha del evento: ${data.eventDate}`,
    data.eventTime && `Hora aproximada: ${data.eventTime}`,
    data.guestCount && `Número de personas: ${data.guestCount}`,
    `Modalidad: ${locationModeLabel(data.serviceMode)}`,
    data.location && `Lugar / zona: ${data.location}`,
    data.message && `Mensaje / referencias: ${data.message}`,
    data.inspirationLink && `Inspiración: ${data.inspirationLink}`,
  ].filter(Boolean)

  return lines.join('\n')
}

/** Abre WhatsApp (web o app) con el mensaje precargado. */
export function openWhatsapp(message: string) {
  const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
