import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { useT, type Locale } from '@/i18n/messages'
import { telLink, whatsappLink } from '@/lib/contact'

/**
 * AuroraHero — premium hero with aurora-gradient background, magnetic CTAs,
 * dot grid texture and horizontal-scrolling service preview shelf.
 *
 * Pattern sources: Aceternity's Aurora + Bundui MagneticButton + Linear's
 * pill nav shelf. The shelf doubles as anchor nav for the service blocks
 * down-page. Every link in the shelf is real (anchor to existing section).
 */
type Props = { locale: Locale }

const SHELF: { label: string; href: string }[] = [
  { label: 'Sueroterapia IV', href: '/servicios/iv' },
  { label: 'NAD+',             href: '/servicios/iv#sueros' },
  { label: 'Masaje',           href: '/servicios' },
  { label: 'Sauna Infrarrojo', href: '/servicios' },
  { label: 'Crioterapia',      href: '/servicios' },
  { label: 'Tina de hielo',    href: '/servicios' },
  { label: 'Red Light Bed',    href: '/servicios' },
  { label: 'Fisioterapia',     href: '/servicios' },
  { label: 'Stem Cells',       href: '/servicios' },
]

export default function AuroraHero({ locale }: Props) {
  const t = useT(locale)
  const wa = whatsappLink('generic')

  return (
    <section className="relative isolate overflow-hidden bg-ivory-50">
      {/* Aurora layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_88%)]">
        <div
          aria-hidden
          className="absolute inset-[-10%] opacity-55 blur-[60px] will-change-transform"
          style={{
            animation: 'aurora 60s linear infinite',
            backgroundImage: `
              repeating-linear-gradient(100deg, #F2F4FB 0%, #F2F4FB 7%, transparent 10%, transparent 12%, #F2F4FB 16%),
              repeating-linear-gradient(100deg, #3D4FB5 10%, #5C6BC0 15%, #2D8E8A 20%, #F5C97D 25%, #4F61B4 30%)
            `,
            backgroundSize: '300% 200%',
            backgroundPosition: '50% 50%, 50% 50%',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* Dot grid for clinical/SaaS texture */}
      <div
        aria-hidden
        className="bg-dot-grid mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
      />

      <div className="container-rp pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-28">
        {/* Eyebrow chip */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-cobalt-200/70 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt-700 backdrop-blur"
        >
          <span className="inline-block size-1.5 rounded-full bg-cobalt-700 animate-pulse" />
          Recovery Point · Mexicali
        </motion.span>

        {/* Headline with italic accent */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] tracking-tight text-ink-900 text-balance max-w-4xl"
        >
          Tu lugar para <em>recuperarte</em>,
          <br className="hidden md:block" />
          hidratarte y vivir mejor.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-7 max-w-2xl text-lg text-ink-700 leading-relaxed text-pretty"
        >
          {t('home.hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton href={wa} variant="primary" target="_blank" rel="noopener noreferrer">
            {t('site.whatsappCta')}
            <ArrowRight className="size-4" />
          </MagneticButton>
          <MagneticButton href={telLink} variant="ghost" strength={0.22}>
            <Phone className="size-4" />
            {t('site.callCta')}
          </MagneticButton>
        </motion.div>

        {/* Accreditation row */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-[12px] uppercase tracking-[0.18em] text-ink-500 font-semibold max-w-xl"
        >
          {t('home.hero.accreditation')}
        </motion.p>

        {/* Service shelf — horizontal scroll snap */}
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          aria-label="Servicios destacados"
          className="mt-14 -mx-5 sm:-mx-8 lg:-mx-12 overflow-x-auto scrollbar-none [scroll-snap-type:x_mandatory]"
        >
          <ul className="flex gap-3 px-5 sm:px-8 lg:px-12 pb-2 min-w-max">
            {SHELF.map((s) => (
              <li key={s.label} className="snap-start">
                <a
                  href={s.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-cobalt-100 bg-white/80 px-5 py-2.5 text-[13px] font-semibold text-cobalt-800 shadow-[0_1px_0_rgba(31,45,90,0.04),0_8px_24px_-12px_rgba(31,45,90,0.18)] backdrop-blur transition-all duration-300 hover:border-cobalt-300 hover:bg-white hover:shadow-[0_2px_0_rgba(31,45,90,0.05),0_16px_36px_-12px_rgba(31,45,90,0.28)] hover:-translate-y-0.5"
                >
                  {s.label}
                  <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  )
}
