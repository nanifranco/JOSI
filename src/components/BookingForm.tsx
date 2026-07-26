import { useState, type FormEvent } from 'react'
import { booking, contact } from '../config/site'
import { buildWhatsappMessage, openWhatsapp, type BookingFormData } from '../lib/whatsapp'
import { CtaButton } from './Cta'
import { Reveal } from './Reveal'

const emptyForm: BookingFormData = {
  fullName: '',
  whatsapp: '',
  email: '',
  service: '',
  eventDate: '',
  eventTime: '',
  guestCount: '',
  location: '',
  message: '',
  inspirationLink: '',
}

type Errors = Partial<Record<keyof BookingFormData | 'privacy', string>>

const fieldClasses =
  'w-full border-0 border-b border-coffee/25 bg-transparent py-2.5 font-sans text-sm text-coffee placeholder:text-taupe/50 focus:border-coffee focus:outline-none'

const labelClasses = 'eyebrow mb-2 block text-[0.6rem]'

export function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(emptyForm)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
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
    if (!form.whatsapp.trim()) nextErrors.whatsapp = 'Comparte un número de WhatsApp.'
    if (!form.service) nextErrors.service = 'Selecciona el tipo de servicio.'
    if (!form.eventDate) nextErrors.eventDate = 'Selecciona la fecha del evento.'
    if (!form.location.trim()) nextErrors.location = 'Indica el lugar o zona del servicio.'
    if (!privacyAccepted) nextErrors.privacy = 'Debes aceptar el aviso de privacidad.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const message = buildWhatsappMessage(form)
    openWhatsapp(message)
    setConfirmation(true)
    setForm(emptyForm)
    setPrivacyAccepted(false)
  }

  return (
    <section id="agenda" className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-6">{booking.eyebrow}</p>
            <h2 className="font-serif text-4xl leading-tight text-coffee sm:text-5xl">{booking.title}</h2>
            <p className="mt-6 max-w-sm font-sans text-[0.9rem] leading-relaxed text-taupe">{booking.text}</p>
            <p className="mt-3 max-w-sm font-sans text-xs italic text-taupe/70">{booking.note}</p>

            <p className="mt-8 max-w-sm border-l border-champagne pl-5 font-sans text-xs leading-relaxed text-taupe/80">
              {booking.disclaimer}
            </p>

            <div className="mt-12 hidden max-w-sm border-t border-coffee/15 pt-8 font-sans text-xs leading-relaxed text-taupe/70 md:block">
              <p>
                También puedes escribir directamente por WhatsApp al{' '}
                <span className="text-coffee">+{contact.whatsappNumber}</span>.
              </p>
            </div>
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
                <label htmlFor="whatsapp" className={labelClasses}>
                  Número de WhatsApp *
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="10 dígitos"
                  className={fieldClasses}
                  value={form.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                  aria-invalid={Boolean(errors.whatsapp)}
                  aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
                />
                {errors.whatsapp && (
                  <p id="whatsapp-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.whatsapp}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Correo electrónico (opcional)
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClasses}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
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
                  className={fieldClasses}
                  value={form.eventDate}
                  onChange={(e) => update('eventDate', e.target.value)}
                  aria-invalid={Boolean(errors.eventDate)}
                  aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
                />
                {errors.eventDate && (
                  <p id="eventDate-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="eventTime" className={labelClasses}>
                  Hora aproximada
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
                <label htmlFor="location" className={labelClasses}>
                  Lugar o zona del servicio *
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Colonia, ciudad o recinto"
                  className={fieldClasses}
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                />
                {errors.location && (
                  <p id="location-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.location}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClasses}>
                  Mensaje o referencias del look
                </label>
                <textarea
                  id="message"
                  rows={3}
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
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => {
                      setPrivacyAccepted(e.target.checked)
                      setErrors((prev) => ({ ...prev, privacy: undefined }))
                    }}
                    className="mt-1 h-4 w-4 shrink-0 border-coffee/40 text-coffee accent-coffee"
                    aria-invalid={Boolean(errors.privacy)}
                  />
                  <span className="font-sans text-xs leading-relaxed text-taupe">
                    {booking.privacyNoticeText}
                  </span>
                </label>
                {errors.privacy && <p className="mt-2 font-sans text-xs font-medium text-coffee">{errors.privacy}</p>}
              </div>

              <div className="sm:col-span-2">
                <CtaButton type="submit" variant="solid" className="w-full sm:w-auto">
                  Solicitar disponibilidad por WhatsApp
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
