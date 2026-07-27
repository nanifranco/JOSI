import { useEffect, useRef, useState } from 'react'

type DatePickerProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  minDate: string
  className?: string
  ariaInvalid?: boolean
  ariaDescribedBy?: string
}

const WEEKDAY_LABELS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
const MAX_MONTHS_AHEAD = 12

const toIso = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const parseIso = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month: month - 1, day }
}

const isWeekend = (year: number, month: number, day: number) => {
  const dow = new Date(year, month, day).getDay()
  return dow === 0 || dow === 6
}

const formatMonthLabel = (year: number, month: number) =>
  new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(new Date(year, month, 1))

const formatFullDate = (iso: string) => {
  const { year, month, day } = parseIso(iso)
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, day))
}

/** Calendario propio: solo permite elegir sábados y domingos a partir de la fecha mínima. */
export function DatePicker({ id, value, onChange, minDate, className = '', ariaInvalid, ariaDescribedBy }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const min = parseIso(minDate)
  const initial = value ? parseIso(value) : min
  const [viewYear, setViewYear] = useState(initial.year)
  const [viewMonth, setViewMonth] = useState(initial.month)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const minMonthIndex = min.year * 12 + min.month
  const viewMonthIndex = viewYear * 12 + viewMonth
  const canGoPrev = viewMonthIndex > minMonthIndex
  const canGoNext = viewMonthIndex < minMonthIndex + MAX_MONTHS_AHEAD

  const goToMonth = (index: number) => {
    setViewYear(Math.floor(index / 12))
    setViewMonth(((index % 12) + 12) % 12)
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()

  const cells: Array<{ day: number; iso: string; disabled: boolean } | null> = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toIso(viewYear, viewMonth, day)
    const disabled = iso < minDate || !isWeekend(viewYear, viewMonth, day)
    cells.push({ day, iso, disabled })
  }

  const handleSelect = (iso: string) => {
    onChange(iso)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className={value ? '' : 'text-taupe/50'}>{value ? formatFullDate(value) : 'Selecciona una fecha'}</span>
        <span aria-hidden="true" className="text-taupe/50">
          ▾
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Selecciona una fecha"
          className="absolute left-0 top-full z-20 mt-2 w-72 border border-coffee/20 bg-cream p-4"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => canGoPrev && goToMonth(viewMonthIndex - 1)}
              disabled={!canGoPrev}
              aria-label="Mes anterior"
              className="px-2 py-1 font-sans text-sm text-coffee disabled:cursor-not-allowed disabled:text-taupe/25"
            >
              ‹
            </button>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-coffee">
              {formatMonthLabel(viewYear, viewMonth)}
            </p>
            <button
              type="button"
              onClick={() => canGoNext && goToMonth(viewMonthIndex + 1)}
              disabled={!canGoNext}
              aria-label="Mes siguiente"
              className="px-2 py-1 font-sans text-sm text-coffee disabled:cursor-not-allowed disabled:text-taupe/25"
            >
              ›
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAY_LABELS.map((label, i) => (
              <span key={i} className="font-sans text-[0.65rem] text-taupe/60">
                {label}
              </span>
            ))}
            {cells.map((cell, i) =>
              cell === null ? (
                <span key={`blank-${i}`} />
              ) : (
                <button
                  key={cell.iso}
                  type="button"
                  disabled={cell.disabled}
                  onClick={() => handleSelect(cell.iso)}
                  aria-pressed={value === cell.iso}
                  className={`py-1.5 font-sans text-xs transition-colors duration-200 ${
                    cell.disabled
                      ? 'cursor-not-allowed text-taupe/25'
                      : value === cell.iso
                        ? 'bg-coffee text-cream'
                        : 'text-coffee hover:bg-champagne/40'
                  }`}
                >
                  {cell.day}
                </button>
              ),
            )}
          </div>

          <p className="mt-4 font-sans text-[0.65rem] text-taupe/60">Solo se pueden agendar sábados y domingos.</p>
        </div>
      )}
    </div>
  )
}
