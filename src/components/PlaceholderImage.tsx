import type { ImageSlot } from '../config/site'

type Tone = 'ivory' | 'blush' | 'champagne' | 'coffee'

const tones: Record<Tone, string> = {
  ivory: 'from-ivory via-cream to-white',
  blush: 'from-blush/70 via-ivory to-cream',
  champagne: 'from-champagne/25 via-ivory to-cream',
  coffee: 'from-coffee via-taupe/80 to-coffee',
}

type Props = {
  slot: ImageSlot
  tone?: Tone
  className?: string
  /** Muestra la etiqueta como subtítulo visible (solo se usa en el Portafolio). */
  showLabel?: boolean
  /** Separación del marco interno respecto al borde (Tailwind inset-*). */
  insetClass?: string
}

/**
 * Marcador de posición editorial para fotografías pendientes de reemplazar.
 * Si `slot.src` tiene una ruta real, se renderiza la imagen; de lo contrario
 * se muestra una superficie tonal. Sin íconos, sin sombras, sin bordes
 * redondeados.
 */
export function PlaceholderImage({ slot, tone = 'ivory', className = '', showLabel = false, insetClass = 'inset-1' }: Props) {
  if (slot.src) {
    if (!showLabel) {
      return <img src={slot.src} alt={slot.alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
    }

    return (
      <div className={`relative flex items-end overflow-hidden ${className}`}>
        <img src={slot.src} alt={slot.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coffee/70 to-transparent" />
        <span className="relative m-5 font-sans text-[0.62rem] font-medium uppercase tracking-[0.28em] text-cream">
          {slot.label}
        </span>
      </div>
    )
  }

  const isDark = tone === 'coffee'

  return (
    <div
      role="img"
      aria-label={slot.alt}
      title={showLabel ? undefined : slot.label}
      className={`relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <div className={`pointer-events-none absolute ${insetClass} border ${isDark ? 'border-cream/20' : 'border-coffee/10'}`} />
      {showLabel && (
        <span
          className={`relative m-5 font-sans text-[0.62rem] font-medium uppercase tracking-[0.28em] ${
            isDark ? 'text-cream/60' : 'text-taupe/65'
          }`}
        >
          {slot.label}
        </span>
      )}
    </div>
  )
}
