import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { useT, type Locale } from '@/i18n/messages'

/**
 * StatsRow — dark cobalt band with 4 spring-animated counters and orb glow.
 *
 * Replaces the previous StatCounter-on-light-bg section. Pattern: Awwwards
 * 2026 SOTM social-proof strip + Aceternity's accent orbs. Mint accent dot
 * stays rare (one micro-pulse before the headline).
 */
type Props = { locale: Locale }

// useStar flag swaps the Unicode glyph for the Lucide premium star — Mario
// flagged the Unicode ★ as low-budget across the brand.
// Updated 2026-05-23 with real numbers Mario confirmed:
//   - Sessions: 2,000+ (was inflated to 12,000)
//   - Google rating: 5.0 ★ on 36 reviews (real, scraped from Google Maps;
//     was inflated to 4.9★/+200)
//   - Sueros catalog: 28 (matches the admin DB)
//   - Years: RP opened in 2024 — display "2" (years operating). Counter
//     animates 0→2; never animate full year numbers like 0→2024.
const STATS = [
  { value: 5000, suffix: '+', label: 'home.stats.items.0.label', decimal: false, useStar: false },
  { value: 5.0,  suffix: '',  label: 'home.stats.items.1.label', decimal: true,  useStar: true  },
  { value: 28,   suffix: '',  label: 'home.stats.items.2.label', decimal: false, useStar: false },
  { value: 2,    suffix: '',  label: 'home.stats.items.3.label', decimal: false, useStar: false },
] as const

function Counter({ to, decimal = false, suffix = '', useStar = false }: { to: number; decimal?: boolean; suffix?: string; useStar?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 80, damping: 20, mass: 1 })
  const display = useTransform(spring, (v) =>
    decimal ? v.toFixed(1) : Math.round(v).toLocaleString('es-MX'),
  )

  useEffect(() => {
    if (inView) mv.set(to)
  }, [inView, to, mv])

  return (
    <span ref={ref} className="tabular-nums inline-flex items-baseline gap-1.5">
      <motion.span>{display}</motion.span>
      {useStar && <Star className="text-amber-400 size-7 md:size-10 -translate-y-1" fill="currentColor" strokeWidth={0} aria-hidden="true" />}
      {suffix && !useStar && <span className="ml-1 text-periwinkle-400">{suffix}</span>}
    </span>
  )
}

export default function StatsRow({ locale }: Props) {
  const t = useT(locale)

  return (
    <section data-nav-theme="dark" className="relative bg-cobalt-900 py-20 md:py-28 text-white overflow-hidden">
      {/* Mesh orb glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-0 size-[700px] -translate-x-1/2 rounded-full bg-cobalt-500/30 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-0 size-[440px] rounded-full bg-cobalt-700/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-0 -z-0 size-[300px] rounded-full bg-amber-400/15 blur-[100px]"
      />

      <div className="relative container-rp">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-periwinkle-400 inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-cobalt-600 animate-pulse" />
            {t('home.stats.eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-[36px] md:text-[56px] font-semibold leading-[1.05] tracking-tight text-balance">
            {t('home.stats.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="text-left"
            >
              <div className="font-display text-[44px] md:text-[68px] font-semibold leading-[1] tracking-tight">
                <Counter to={s.value} decimal={s.decimal} suffix={s.suffix} useStar={s.useStar} />
              </div>
              <p className="mt-3 text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-cobalt-200/90 max-w-[22ch] text-balance">
                {t(s.label)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
