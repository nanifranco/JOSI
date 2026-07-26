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
}

/**
 * Marcador de posición editorial para fotografías pendientes de reemplazar.
 * Si `slot.src` tiene una ruta real, se renderiza la imagen; de lo contrario
 * se muestra una superficie tonal con una etiqueta discreta que indica qué
 * fotografía colocar ahí. Sin íconos, sin sombras, sin bordes redondeados.
 */
export function PlaceholderImage({ slot, tone = 'ivory', className = '' }: Props) {
  if (slot.src) {
    return (
      <img
        src={slot.src}
        alt={slot.alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  const isDark = tone === 'coffee'

  return (
    <div
      role="img"
      aria-label={slot.alt}
      title={slot.label}
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <div className={`pointer-events-none absolute inset-5 border ${isDark ? 'border-cream/20' : 'border-coffee/10'}`} />
    </div>
  )
}
