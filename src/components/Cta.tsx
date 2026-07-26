import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type CtaVariant = 'solid' | 'outline' | 'text' | 'outline-inverse' | 'text-inverse'

const base =
  'inline-flex items-center justify-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-offset-4'

const variants: Record<CtaVariant, string> = {
  solid: 'border border-coffee bg-coffee px-8 py-3.5 text-cream hover:bg-transparent hover:text-coffee',
  outline: 'border border-coffee/70 px-8 py-3.5 text-coffee hover:border-coffee hover:bg-coffee hover:text-cream',
  text: 'border-b border-coffee/40 pb-1 text-coffee hover:border-coffee',
  /** Para usarse sobre fondos oscuros (p. ej. la sección destacada o el café profundo). */
  'outline-inverse': 'border border-cream/60 px-8 py-3.5 text-cream hover:border-cream hover:bg-cream hover:text-coffee',
  'text-inverse': 'border-b border-cream/40 pb-1 text-cream hover:border-cream',
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: CtaVariant; href: string }
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: CtaVariant }

/** Enlace con estilo de llamado a la acción — rectangular, sin sombras, sin íconos. */
export function CtaLink({ variant = 'solid', className = '', ...props }: AnchorProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />
}

/** Botón con el mismo lenguaje visual que CtaLink, para formularios y acciones. */
export function CtaButton({ variant = 'solid', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
