import { useState, type FormEvent } from 'react'
import { booking } from '../config/site'
import { buildWhatsappMessage, openWhatsapp, type BookingFormData } from '../lib/whatsapp'
import { CtaButton } from './Cta'
import { Reveal } from './Reveal'

const emptyForm: BookingFormData = {
  fullName: '',
  service: '',
  eventDate: '',
  eventTime: '',
  guestCount: '',
  serviceMode: '',
  location: '',
  message: '',
  inspirationLink: '',
}

type Errors = Partial<Record<keyof BookingFormData, string>>

const fieldClasses =
  'w-full border-0 border-b border-coffee/25 bg-transparent py-2.5 font-sans text-sm text-coffee placeholder:text-taupe/50 focus:border-coffee focus:outline-none'

const labelClasses = 'eyebrow mb-2 block text-[0.6rem]'

/** Fecha más próxima que se puede agendar, respetando el mínimo de 24 horas de anticipación. */
const minBookableDateIso = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  const localNow = new Date(now.getTime() - offset * 60_000)
  localNow.setDate(localNow.getDate() + 1)
  return localNow.toISOString().slice(0, 10)
}

export function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [confirmation, setConfirmation] = useState(false)

  const update = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmation(false)

    const nextErrors: Errors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Comparte tu nombre completo.'
    if (!form.service) nextErrors.service = 'Selecciona el tipo de servicio.'
    if (!form.eventDate) {
      nextErrors.eventDate = 'Selecciona la fecha del evento.'
    } else if (form.eventDate < minBookableDateIso()) {
      nextErrors.eventDate = 'Elige una fecha con al menos 24 horas de anticipación.'
    }
    if (!form.serviceMode) nextErrors.serviceMode = 'Selecciona dónde prefieres el servicio.'
    if (form.serviceMode === 'domicilio' && !form.location.trim()) {
      nextErrors.location = 'Indica la dirección completa del servicio.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const message = buildWhatsappMessage(form)
    openWhatsapp(message)
    setConfirmation(true)
    setForm(emptyForm)
  }

  return (
    <section id="agenda" className="bg-cream pb-20 pt-14 md:pb-28 md:pt-16 lg:pb-36 lg:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-6">{booking.eyebrow}</p>
            <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{booking.title}</h2>
            <p className="mt-6 max-w-sm font-sans text-[0.9rem] font-medium leading-relaxed text-coffee">
              {booking.scheduleNote}
            </p>
            <p className="mt-4 max-w-sm font-sans text-[0.9rem] leading-relaxed text-taupe">{booking.text}</p>

            <p className="mt-8 max-w-sm border-l border-champagne pl-5 font-sans text-xs leading-relaxed text-taupe/80">
              {booking.disclaimer}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-8">
            <form onSubmit={handleSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClasses}>
                  Nombre completo *
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  className={fieldClasses}
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="service" className={labelClasses}>
                  Tipo de servicio *
                </label>
                <select
                  id="service"
                  className={`${fieldClasses} appearance-none`}
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                >
                  <option value="">Selecciona una opción</option>
                  {booking.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p id="service-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="eventDate" className={labelClasses}>
                  Fecha del evento *
                </label>
                <input
                  id="eventDate"
                  type="date"
                  min={minBookableDateIso()}
                  className={fieldClasses}
                  value={form.eventDate}
                  onChange={(e) => update('eventDate', e.target.value)}
                  aria-invalid={Boolean(errors.eventDate)}
                  aria-describedby={errors.eventDate ? 'eventDate-error' : 'eventDate-hint'}
                />
                <p id="eventDate-hint" className="mt-2 font-sans text-xs text-taupe/70">
                  La disponibilidad para citas es los fines de semana. Si tu evento es entre semana, escríbenos por
                  WhatsApp — contando con suficiente anticipación, es posible encontrar un espacio disponible.
                </p>
                {errors.eventDate && (
                  <p id="eventDate-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="eventTime" className={labelClasses}>
                  Hora
                </label>
                <input
                  id="eventTime"
                  type="time"
                  className={fieldClasses}
                  value={form.eventTime}
                  onChange={(e) => update('eventTime', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="guestCount" className={labelClasses}>
                  Número de personas
                </label>
                <input
                  id="guestCount"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  className={fieldClasses}
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="serviceMode" className={labelClasses}>
                  ¿Dónde prefieres el servicio? *
                </label>
                <select
                  id="serviceMode"
                  className={`${fieldClasses} appearance-none`}
                  value={form.serviceMode}
                  onChange={(e) => update('serviceMode', e.target.value as BookingFormData['serviceMode'])}
                  aria-invalid={Boolean(errors.serviceMode)}
                  aria-describedby={errors.serviceMode ? 'serviceMode-error' : undefined}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="domicilio">A domicilio</option>
                  <option value="estudio">En sitio</option>
                </select>
                {errors.serviceMode && (
                  <p id="serviceMode-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.serviceMode}
                  </p>
                )}
              </div>

              {form.serviceMode === 'domicilio' && (
                <div className="sm:col-span-2">
                  <label htmlFor="location" className={labelClasses}>
                    Dirección del servicio *
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Calle y número, colonia, ciudad"
                    className={fieldClasses}
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? 'location-error' : 'location-hint'}
                  />
                  <p id="location-hint" className="mt-2 font-sans text-xs text-taupe/70">
                    Incluye calle, número, colonia y ciudad completos para evitar confusiones con calles del mismo
                    nombre en otras colonias.
                  </p>
                  {errors.location && (
                    <p id="location-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                      {errors.location}
                    </p>
                  )}
                </div>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClasses}>
                  Mensaje o referencias del look
                </label>
                <textarea
                  id="message"
                  rows={1}
                  className={`${fieldClasses} resize-none`}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="inspirationLink" className={labelClasses}>
                  Enlace de inspiración (opcional)
                </label>
                <input
                  id="inspirationLink"
                  type="url"
                  placeholder="Pinterest, Instagram, etc."
                  className={fieldClasses}
                  value={form.inspirationLink}
                  onChange={(e) => update('inspirationLink', e.target.value)}
                />
                <p className="mt-2 font-sans text-xs text-taupe/70">
                  ¿Prefieres mandar fotos en vez de un enlace? Puedes adjuntarlas directamente en el chat de
                  WhatsApp una vez que se abra con tu solicitud.
                </p>
              </div>

              <div className="sm:col-span-2">
                <CtaButton type="submit" variant="solid" className="w-full sm:w-auto">
                  Solicitar disponibilidad
                </CtaButton>

                {confirmation && (
                  <p role="status" className="mt-4 font-sans text-xs leading-relaxed text-taupe">
                    Tu solicitud se abrió en WhatsApp — envía el mensaje para consultar disponibilidad. Recuerda
                    que tu cita se confirma después de recibir respuesta y el anticipo correspondiente.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
