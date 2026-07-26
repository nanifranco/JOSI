import { contact } from '../config/site'
import { Reveal } from './Reveal'

export function Contact() {
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}`

  const entries = [
    { label: 'WhatsApp', value: `+${contact.whatsappNumber}`, href: whatsappHref },
    { label: 'Instagram', value: contact.instagramHandle, href: contact.instagramUrl },
    { label: 'Facebook', value: contact.facebookHandle, href: contact.facebookUrl },
    { label: 'Zona de servicio', value: contact.serviceZone },
  ]

  return (
    <section id="contacto" className="bg-white py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="eyebrow mb-6">Contacto</p>
            <h2 className="max-w-xs font-serif text-4xl leading-tight text-coffee sm:text-5xl">
              Hablemos de tu próximo look
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 md:pl-10 lg:pl-16">
            <dl className="grid grid-cols-1 gap-8 sm:col-span-2 sm:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.label} className="border-t border-coffee/15 pt-5">
                  <dt className="eyebrow mb-2 text-[0.6rem]">{entry.label}</dt>
                  <dd className="font-serif text-lg text-coffee">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target={entry.href.startsWith('http') ? '_blank' : undefined}
                        rel={entry.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="border-b border-transparent transition-colors duration-300 hover:border-champagne"
                      >
                        {entry.value}
                      </a>
                    ) : (
                      entry.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
