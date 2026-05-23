import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useT, type Locale } from '@/i18n/messages'
import { whatsappLink } from '@/lib/contact'
import SpotlightCard from './SpotlightCard'

/**
 * ServiceBento — bento grid with one 2× "feature" card.
 *
 * The pattern Linear/Vercel/67% of 2026 SaaS landing pages use. One large
 * card dominates, smaller cards orbit it. Cards have:
 *   • Photo cover that subtly zooms (1.08) over 1400ms on hover
 *   • Gradient overlay for legibility
 *   • Cobalt → mint accent line that draws across the bottom on hover
 *   • Cursor-follow spotlight via SpotlightCard
 *   • Arrow that translates up+right on hover
 */
type Props = { locale: Locale }

type Item = {
  href: string
  title: string
  eyebrow: string
  copy: string
  /** Webp/JPG path inside public/img/services/ */
  img: string
  accent: 'cobalt' | 'mint' | 'amber'
  span: 'feature' | 'tall' | 'wide' | 'normal'
}

const ITEMS: Item[] = [
  { href: '/servicios/iv',     title: 'Sueroterapia IV',  eyebrow: '01 · Protocolo médico',
    copy: 'Hidratación, energía y vitalidad celular en 45 minutos. 28 fórmulas activas, aplicadas por enfermería certificada.',
    img: '/img/services/iv.webp?v=12',     accent: 'cobalt', span: 'feature' },
  { href: '/servicios/iv#sueros', title: 'NAD+ Premium',  eyebrow: '02 · Longevidad',
    copy: 'Regeneración mitocondrial. NAD+ puro, +MVI o +Glutatión.',
    img: '/img/services/nad.webp?v=12',    accent: 'amber',  span: 'tall' },
  { href: '/servicios',  title: 'Crioterapia',  eyebrow: '03',
    copy: 'Tres minutos a -110°C. Antiinflamatorio sistémico.',
    img: '/img/services/cryo.webp?v=12',   accent: 'cobalt', span: 'normal' },
  { href: '/servicios',  title: 'Tina de hielo', eyebrow: '04',
    copy: 'Inmersión guiada a 5°C. Cuerpo y mente.',
    img: '/img/services/ice.webp?v=12',    accent: 'mint',   span: 'normal' },
  { href: '/servicios',  title: 'Sauna infrarrojo', eyebrow: '05',
    copy: 'Calor que entra al cuerpo, no a la habitación.',
    img: '/img/services/sauna.webp?v=12',  accent: 'amber',  span: 'wide' },
]

const RING_BY_ACCENT: Record<Item['accent'], string> = {
  cobalt: 'group-hover:ring-cobalt-400/40',
  mint:   'group-hover:ring-cobalt-500/40',
  amber:  'group-hover:ring-amber-400/50',
}

const ACCENT_LINE: Record<Item['accent'], string> = {
  cobalt: 'from-cobalt-500 to-periwinkle-500',
  mint:   'from-cobalt-500 to-cobalt-500',
  amber:  'from-amber-300 to-amber-600',
}

const SPOTLIGHT_TINT: Record<Item['accent'], string> = {
  cobalt: 'rgba(61, 79, 181, 0.18)',
  mint:   'rgba(125, 228, 222, 0.22)',
  amber:  'rgba(245, 201, 125, 0.22)',
}

/** Fallback placeholder background when an image isn't available yet.
 *  Mario asked: no cascarón — if the WebP doesn't load, the gradient
 *  still gives the card a finished feel rather than a broken <img>. */
const FALLBACK_BG: Record<Item['accent'], string> = {
  cobalt: 'linear-gradient(135deg, #1F2D5A 0%, #3D4FB5 60%, #5C6BC0 100%)',
  mint:   'linear-gradient(135deg, #1B5A57 0%, #2D8E8A 60%, #7BC4BF 100%)',
  amber:  'linear-gradient(135deg, #1F2D5A 0%, #C8924B 60%, #F5C97D 100%)',
}

export default function ServiceBento({ locale }: Props) {
  const t = useT(locale)

  return (
    <section className="relative bg-ivory-50 py-24 md:py-32">
      <div className="container-rp">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{t('home.pillars.eyebrow')}</p>
            <h2 className="mt-3 font-display text-[40px] md:text-[60px] font-semibold leading-[1.04] tracking-tight text-balance max-w-2xl">
              Protocolos clínicos <em>diseñados</em> a tu medida.
            </h2>
          </div>
          <a href="/servicios" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt-700 hover:text-cobalt-900 transition-colors">
            Ver todos los servicios
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[230px] md:gap-5">
          {ITEMS.map((it, i) => {
            const span =
              it.span === 'feature' ? 'md:col-span-2 md:row-span-2' :
              it.span === 'tall'    ? 'md:col-span-2 md:row-span-2' :
              it.span === 'wide'    ? 'md:col-span-4 md:row-span-1' :
                                      'md:col-span-2 md:row-span-1'
            const isFeature = it.span === 'feature'

            return (
              <motion.div
                key={it.href + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className={span}
              >
                <SpotlightCard
                  tint={SPOTLIGHT_TINT[it.accent]}
                  radius={isFeature ? 600 : 380}
                  className={`relative h-full rounded-3xl bg-white ring-1 ring-cobalt-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(31,45,90,0.35)] hover:ring-2 ${RING_BY_ACCENT[it.accent]}`}
                >
                  <a href={it.href} className="block h-full min-h-[260px]">
                    {/* Image (fallback to gradient if missing) */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-3xl"
                      style={{ background: FALLBACK_BG[it.accent] }}
                    >
                      <img
                        src={it.img}
                        alt=""
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                        className="size-full object-cover opacity-95 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className={`relative flex h-full flex-col justify-end p-6 md:p-7 ${isFeature ? 'md:p-10' : ''}`}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">{it.eyebrow}</p>
                      <h3 className={`mt-2 font-display font-semibold tracking-tight text-white text-balance ${isFeature ? 'text-[36px] md:text-[48px] leading-[1.05]' : 'text-[24px] md:text-[28px] leading-tight'}`}>
                        {it.title}
                      </h3>
                      <p className={`mt-3 max-w-md text-white/90 leading-relaxed ${isFeature ? 'text-[16px] md:text-[18px]' : 'text-[14px]'}`}>
                        {it.copy}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                        Ver protocolo
                        <ArrowUpRight className="size-4 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>

                    {/* Accent line draws across bottom */}
                    <span className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r ${ACCENT_LINE[it.accent]} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rounded-b-3xl`} />
                  </a>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
