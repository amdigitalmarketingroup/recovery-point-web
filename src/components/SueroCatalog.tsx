import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SUEROS, SUERO_FAMILIES, type SueroFamily, type SueroEntry } from '@/lib/services-catalog'
import { whatsappLink } from '@/lib/contact'
import { useT, type Locale } from '@/i18n/messages'
import { cn, formatMxn } from '@/lib/utils'

/**
 * SueroCatalog — full IV menu with family filter + ingredient hover-reveal.
 *
 * Per the Web Redesign Plan §5.2:
 * - Goal-driven router (filter chips up top, FLIP filter the grid)
 * - Hover-reveal ingredient drawer (translateY 100→0, 380ms out-quart)
 * - "MAY HELP" benefit chips
 * - "Reservar este suero" WA deeplink with pre-filled suero name
 */
type Props = { locale: Locale }

const FAMILY_LABEL_KEY: Record<SueroFamily, string> = {
  nad:      'iv.familyFilter.nad',
  premium:  'iv.familyFilter.premium',
  standard: 'iv.familyFilter.standard',
  hangover: 'iv.familyFilter.hangover',
}

const FAMILY_ACCENT: Record<SueroFamily, { bg: string; chip: string; ring: string }> = {
  nad:      { bg: 'bg-amber-200/30',  chip: 'bg-amber-300/60 text-cobalt-800',   ring: 'ring-amber-300' },
  premium:  { bg: 'bg-cobalt-50',     chip: 'bg-cobalt-100 text-cobalt-800',     ring: 'ring-cobalt-300' },
  standard: { bg: 'bg-ivory-100',     chip: 'bg-cobalt-50 text-cobalt-700',      ring: 'ring-cobalt-200' },
  hangover: { bg: 'bg-cobalt-50',       chip: 'bg-cobalt-100 text-cobalt-800',         ring: 'ring-cobalt-300' },
}

export function SueroCatalog({ locale }: Props) {
  const t = useT(locale)
  const [family, setFamily] = useState<SueroFamily | 'all'>('all')

  const filtered = useMemo(() => {
    if (family === 'all') return SUEROS
    return SUEROS.filter((s) => s.family === family)
  }, [family])

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="eyebrow mr-1">{t('iv.pickerLabel')}</span>
        <FilterChip active={family === 'all'} onClick={() => setFamily('all')} label={t('iv.familyFilter.all')} />
        {SUERO_FAMILIES.map((f) => (
          <FilterChip
            key={f.id}
            active={family === f.id}
            onClick={() => setFamily(f.id)}
            label={t(FAMILY_LABEL_KEY[f.id])}
          />
        ))}
      </div>

      {/* Catalog grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((suero) => (
            <SueroCard key={suero.id} suero={suero} locale={locale} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-500 py-12">No hay sueros que coincidan.</p>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 h-9 rounded-full text-[13px] font-semibold tracking-tight transition-colors duration-[var(--duration-micro)]',
        active
          ? 'bg-cobalt-700 text-white'
          : 'bg-white text-ink-700 border border-cobalt-100 hover:border-cobalt-300 hover:bg-cobalt-50',
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

function SueroCard({ suero, locale }: { suero: SueroEntry; locale: Locale }) {
  const t = useT(locale)
  const accent = FAMILY_ACCENT[suero.family]
  const wa = whatsappLink('iv-specific', { sueroName: suero.name })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className={cn(
        'group relative overflow-hidden rounded-3xl ring-1 ring-cobalt-100/60 transition-shadow duration-[var(--duration-reveal)]',
        accent.bg,
        'hover:ring-2 hover:shadow-xl hover:shadow-cobalt-900/5',
        accent.ring,
      )}
    >
      <div className="relative p-6 sm:p-7 min-h-[280px] flex flex-col">
        <div className="flex items-center justify-between">
          <span className={cn('inline-flex items-center px-2.5 h-6 rounded-full text-[10px] font-bold uppercase tracking-widest', accent.chip)}>
            {t(FAMILY_LABEL_KEY[suero.family]).split('(')[0].trim()}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-ink-500 tabular-nums">
            {suero.durationMin} min
          </span>
        </div>

        <h3 className="mt-5 font-display text-[24px] sm:text-[26px] font-semibold leading-tight text-ink-900">
          {suero.name}
        </h3>
        <p className="mt-2 text-[14px] text-ink-700 leading-relaxed">
          {suero.pitch[locale === 'en' ? 'en' : 'es']}
        </p>

        <div className="flex-1" />

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-ink-500">{t('iv.priceLabel')}</p>
            <p className="font-display text-[28px] font-semibold leading-none tabular-nums text-cobalt-800">
              {formatMxn(suero.priceMxn, locale === 'en' ? 'en' : 'es')}
            </p>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-cobalt-700 text-white text-[13px] font-semibold hover:bg-cobalt-800 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {t('iv.bookSpecific')}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Hover-reveal ingredient drawer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="drawer"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md border-t border-cobalt-100 px-6 py-4 pointer-events-none"
          >
            <p className="text-[10px] uppercase tracking-widest text-cobalt-700 font-semibold mb-1">
              {t('iv.ingredientLabel')}
            </p>
            <p className="text-[13px] text-ink-800 leading-snug">{suero.ingredients}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
