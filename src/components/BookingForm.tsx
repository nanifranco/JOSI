import { useState, type FormEvent } from 'react'
import { booking } from '../config/site'
import { buildWhatsappMessage, openWhatsapp, type BookingFormData } from '../lib/whatsapp'
import { distanceKm, geocodeAddress, WORK_ZONE_CENTER, WORK_ZONE_RADIUS_KM } from '../lib/geocode'
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

/** true si la fecha ISO (YYYY-MM-DD) cae en sábado o domingo, interpretada en hora local. */
const isWeekendDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-').map(Number)
  const dayOfWeek = new Date(year, month - 1, day).getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

const weekendRequiredMessage = 'Solo se pueden agendar citas los fines de semana. Si tu evento es entre semana, escríbenos por WhatsApp.'

const timeOptions = (() => {
  const options: { value: string; label: string }[] = []
  for (let totalMinutes = 7 * 60; totalMinutes <= 21 * 60; totalMinutes += 30) {
    const hours24 = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const value = `${String(hours24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    const period = hours24 < 12 ? 'a.m.' : 'p.m.'
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
    const label = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
    options.push({ value, label })
  }
  return options
})()

type ZoneCheck = 'idle' | 'checking' | 'in-zone' | 'out-of-zone' | 'unknown'

export function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [confirmation, setConfirmation] = useState(false)
  const [zoneCheck, setZoneCheck] = useState<ZoneCheck>('idle')
  const [zoneCheckedValue, setZoneCheckedValue] = useState('')

  const update = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    if (key === 'location') setZoneCheck('idle')
  }

  const handleEventDateChange = (value: string) => {
    if (value && !isWeekendDate(value)) {
      setForm((prev) => ({ ...prev, eventDate: '' }))
      setErrors((prev) => ({ ...prev, eventDate: weekendRequiredMessage }))
      return
    }
    update('eventDate', value)
  }

  const checkLocationZone = async () => {
    const address = form.location.trim()
    if (!address || address === zoneCheckedValue) return
    setZoneCheckedValue(address)
    setZoneCheck('checking')

    const coords = await geocodeAddress(`${address}, Ciudad de México`)
    if (!coords) {
      setZoneCheck('unknown')
      return
    }

    const distance = distanceKm(WORK_ZONE_CENTER, coords)
    setZoneCheck(distance <= WORK_ZONE_RADIUS_KM ? 'in-zone' : 'out-of-zone')
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
    } else if (!isWeekendDate(form.eventDate)) {
      nextErrors.eventDate = weekendRequiredMessage
    }
    if (!form.eventTime) {
      nextErrors.eventTime = 'Selecciona la hora del evento.'
    } else if (form.eventDate && !nextErrors.eventDate) {
      const eventDateTime = new Date(`${form.eventDate}T${form.eventTime}`)
      const minDateTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
      if (eventDateTime < minDateTime) {
        nextErrors.eventTime = 'Elige una hora con al menos 24 horas de anticipación desde este momento.'
      }
    }
    if (!form.guestCount.trim()) nextErrors.guestCount = 'Indica el número de personas.'
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
            <p className="mt-6 max-w-sm font-sans text-[0.9rem] leading-relaxed text-taupe">{booking.text}</p>

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
                  onChange={(e) => handleEventDateChange(e.target.value)}
                  aria-invalid={Boolean(errors.eventDate)}
                  aria-describedby={errors.eventDate ? 'eventDate-error' : 'eventDate-hint'}
                />
                <p id="eventDate-hint" className="mt-2 font-sans text-xs text-taupe/70">
                  La disponibilidad para citas es los fines de semana. Si tu evento es entre semana, escríbenos por
                  WhatsApp — contando con suficiente anticipación, a veces es posible encontrar un espacio, aunque
                  no se puede garantizar.
                </p>
                {errors.eventDate && (
                  <p id="eventDate-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="eventTime" className={labelClasses}>
                  Hora *
                </label>
                <select
                  id="eventTime"
                  className={`${fieldClasses} appearance-none`}
                  value={form.eventTime}
                  onChange={(e) => update('eventTime', e.target.value)}
                  aria-invalid={Boolean(errors.eventTime)}
                  aria-describedby={errors.eventTime ? 'eventTime-error' : 'eventTime-hint'}
                >
                  <option value="">Selecciona una hora</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p id="eventTime-hint" className="mt-2 font-sans text-xs text-taupe/70">
                  Si tu evento es mañana, la hora debe tener al menos 24 horas de anticipación desde este momento.
                </p>
                {errors.eventTime && (
                  <p id="eventTime-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.eventTime}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="guestCount" className={labelClasses}>
                  Número de personas *
                </label>
                <input
                  id="guestCount"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  className={fieldClasses}
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  aria-invalid={Boolean(errors.guestCount)}
                  aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
                />
                {errors.guestCount && (
                  <p id="guestCount-error" className="mt-2 font-sans text-xs font-medium text-coffee">
                    {errors.guestCount}
                  </p>
                )}
              </div>

              <div>
                <p className={labelClasses}>¿Dónde prefieres el servicio? *</p>
                <div
                  role="radiogroup"
                  aria-label="¿Dónde prefieres el servicio?"
                  aria-invalid={Boolean(errors.serviceMode)}
                  aria-describedby={errors.serviceMode ? 'serviceMode-error' : undefined}
                  className="mt-1 grid grid-cols-2 gap-3"
                >
                  {([
                    { value: 'domicilio', label: 'A domicilio' },
                    { value: 'estudio', label: 'En sitio' },
                  ] as const).map((option) => {
                    const selected = form.serviceMode === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => update('serviceMode', option.value)}
                        className={`border py-3 font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                          selected
                            ? 'border-coffee bg-coffee text-cream'
                            : 'border-coffee/25 text-coffee hover:border-coffee'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
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
                    onBlur={checkLocationZone}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? 'location-error' : 'location-hint'}
                  />
                  <p id="location-hint" className="mt-2 font-sans text-xs text-taupe/70">
                    Incluye calle, número, colonia y ciudad completos para evitar confusiones con calles del mismo
                    nombre en otras colonias.
                  </p>
                  {zoneCheck === 'checking' && (
                    <p role="status" className="mt-2 font-sans text-xs text-taupe/70">
                      Verificando zona de cobertura…
                    </p>
                  )}
                  {zoneCheck === 'out-of-zone' && (
                    <p role="status" className="mt-2 font-sans text-xs font-medium text-coffee">
                      Parece que tu dirección está fuera de mi zona de trabajo habitual. Escríbeme directamente por
                      WhatsApp para ver si es posible cubrir tu evento.
                    </p>
                  )}
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
