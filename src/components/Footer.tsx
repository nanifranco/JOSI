import { brand, contact, footerLinks } from '../config/site'

export function Footer() {
  const year = new Date().getFullYear()
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}`

  return (
    <footer className="bg-coffee py-16 text-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="block font-serif text-2xl tracking-[0.1em]">{brand.name}</span>
            <span className="my-1.5 block h-px w-5 bg-cream/25" aria-hidden="true" />
            <span className="block font-sans text-[0.55rem] font-medium tracking-[0.5em] text-cream/60">
              {brand.descriptor}
            </span>
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-cream/60">{brand.tagline}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Enlaces del sitio">
            <p className="eyebrow mb-5 text-cream/50">Navegación</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-sans text-sm text-cream/75 hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-4" aria-label="Contacto y legal">
            <p className="eyebrow mb-5 text-cream/50">Más</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/75 hover:text-cream"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/75 hover:text-cream"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                {/* EDITAR: enlazar a la página de aviso de privacidad cuando exista */}
                <span className="font-sans text-sm text-cream/40">Aviso de privacidad</span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-8">
          <p className="font-sans text-xs text-cream/40">
            © {year} {brand.name} {brand.descriptor}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
