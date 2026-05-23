import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useT, type Locale } from '@/i18n/messages'

// lucide-react doesn't ship an Instagram glyph — inline a clean SVG.
function InstagramGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/**
 * ReelsCarousel — autoscroll horizontal banner of inline-playable reels.
 *
 * Behavior:
 *  - Track autoscrolls horizontally at a slow constant speed (~25px/sec).
 *  - On hover (desktop) or touchstart (mobile), autoscroll PAUSES so the
 *    user can interact comfortably.
 *  - Each card is muted-poster by default. Click the play button to start
 *    inline playback (muted). Click again to pause. A small unmute toggle
 *    fades in once playing.
 *  - A separate "Ver en Instagram" pill is shown but does NOT take over the
 *    whole card — so the user can play locally OR open IG, their choice.
 *  - When the carousel scrolls a video off-screen we pause it to save battery.
 *  - When loop reaches the end of the original list we render a duplicate
 *    set seamlessly (infinite marquee feel).
 *
 * Mario asked for: "play en sitio + autoscroll horizontal + stop al hover" —
 * this is exactly that.
 */
type Reel = {
  slug: string                /** IG reel shortcode, e.g. DC-LA93S62u */
  caption: string             /** Short label shown below the card */
  category: 'testimonio' | 'protocolo' | 'organico' | 'antes-despues'
}

type Props = {
  locale: Locale
  reels: Reel[]
}

const CATEGORY_LABEL: Record<Reel['category'], string> = {
  testimonio: 'Testimonio',
  protocolo: 'Protocolo',
  organico: 'En el RP',
  'antes-despues': 'Antes / Después',
}

function ReelCard({ reel, index, onPlay, isPlaying, onVisibilityChange }: {
  reel: Reel
  index: number
  onPlay: (slug: string | null) => void
  isPlaying: boolean
  onVisibilityChange: (slug: string, visible: boolean) => void
}) {
  const [hover, setHover] = useState(false)
  const [muted, setMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const igUrl = `https://www.instagram.com/reel/${reel.slug}/`

  // Drive video play state from parent (only one reel plays at a time).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isPlaying) {
      v.muted = muted
      const p = v.play()
      if (p && typeof p.then === 'function') p.catch(() => {})
    } else {
      v.pause()
    }
  }, [isPlaying, muted])

  // Pause if scrolled off-screen.
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => onVisibilityChange(reel.slug, entry.isIntersecting),
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reel.slug])

  function togglePlay(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!loaded) setLoaded(true)
    onPlay(isPlaying ? null : reel.slug)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 5) * 0.05 }}
      className="shrink-0 w-[240px] sm:w-[280px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Category chips removed — captions/categories were author-inferred and
          could mislead. The reel poster itself communicates the content;
          click opens the original on Instagram. */}

      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-cobalt-900 ring-1 ring-cobalt-100 hover:ring-cobalt-400 hover:shadow-2xl hover:shadow-cobalt-900/20 transition-all duration-[var(--duration-reveal)] [transition-timing-function:var(--ease-out-quart)]">
        {/* Poster — visible until video loads + plays */}
        <img
          src={`/img/reels/${reel.slug}.webp`}
          alt={reel.caption}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            isPlaying && loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Inline video — lazy-loaded only once user clicks play */}
        {loaded && (
          <video
            ref={videoRef}
            src={`/img/reels/${reel.slug}.mp4`}
            playsInline
            loop
            preload="auto"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />

        {/* Play / pause button — big tap target in center */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pausar ${reel.caption}` : `Reproducir ${reel.caption}`}
          className="absolute inset-0 grid place-items-center group/play"
        >
          <span
            className={`grid place-items-center size-14 rounded-full bg-white/95 text-cobalt-900 shadow-xl transition-all duration-300 group-hover/play:scale-110 ${
              isPlaying ? 'opacity-0 group-hover/play:opacity-100' : 'opacity-100'
            }`}
          >
            {isPlaying
              ? <Pause className="size-6" fill="currentColor" strokeWidth={0} />
              : <Play  className="size-6 translate-x-[2px]" fill="currentColor" strokeWidth={0} />}
          </span>
        </button>

        {/* Mute toggle — only when playing */}
        {isPlaying && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMuted(m => !m) }}
            aria-label={muted ? 'Activar audio' : 'Silenciar'}
            className="absolute top-3 left-3 grid place-items-center size-8 rounded-full bg-white/90 hover:bg-white text-cobalt-900 shadow"
          >
            {muted ? <VolumeX className="size-4" strokeWidth={2.2} /> : <Volume2 className="size-4" strokeWidth={2.2} />}
          </button>
        )}

        {/* "Ver en Instagram" pill — fixed bottom-right of card, also outside the play button hit area */}
        <a
          href={igUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${reel.caption} — abrir en Instagram`}
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-cobalt-900 text-[11px] font-semibold shadow-md hover:bg-white transition-all duration-200 ${
            hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <InstagramGlyph className="size-3.5" />
          IG
          <ArrowUpRight className="size-3" strokeWidth={2.4} />
        </a>
      </div>

      {reel.caption ? (
        <p className="mt-3 text-[13px] text-ink-700 leading-snug text-balance">{reel.caption}</p>
      ) : null}
    </motion.div>
  )
}

export default function ReelsCarousel({ locale, reels }: Props) {
  const t = useT(locale)
  const [playingSlug, setPlayingSlug] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Refs mirror state for the rAF closure (state updates would stale-close).
  const pausedRef = useRef(false)
  const playingRef = useRef<string | null>(null)
  useEffect(() => { playingRef.current = playingSlug }, [playingSlug])

  function onVisibilityChange(_slug: string, _visible: boolean) {
    /* per-card IntersectionObserver — unused, future battery-saver hook. */
  }

  // JS-driven autoscroll using native scrollLeft. Pause is driven by refs so
  // the same scrollLeft is used by both autoscroll AND native swipe — no
  // fight between transform and scroll. Mario asked for swipe-during-pause
  // to keep working; CSS-animation marquees made that impossible.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = performance.now()
    const speedPxPerSec = 22

    function step(now: number) {
      const dt = now - last
      last = now
      if (!pausedRef.current && !playingRef.current) {
        el!.scrollLeft += (speedPxPerSec * dt) / 1000
        const half = el!.scrollWidth / 2
        if (el!.scrollLeft >= half) el!.scrollLeft -= half
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Wheel → horizontal scroll on desktop trackpads.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      if (Math.abs(e.deltaY) < 10) return
      el!.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  if (!reels.length) return null

  // Duplicate so the autoscroll can wrap seamlessly (jump from scrollLeft=half back to 0).
  const doubled = [...reels, ...reels]

  return (
    <section
      className="relative py-20 md:py-28 bg-ivory-50 overflow-hidden rp-reels-section"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => { window.setTimeout(() => { pausedRef.current = false }, 2000) }}
    >
      <div className="container-rp">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cobalt-600 inline-flex items-center gap-2">
            <InstagramGlyph className="size-3.5" />
            @recoverypointmx
          </p>
          <h2 className="mt-3 font-display text-[32px] md:text-[44px] font-semibold leading-[1.1] tracking-tight text-ink-900 text-balance">
            Lo que pasa <em className="text-cobalt-700">cada semana</em> en Recovery Point.
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-ink-700 leading-relaxed max-w-prose">
            Reproduce cualquier reel aquí mismo. Desliza para verlos todos. Toca el logo de IG para ir al reel original.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="overflow-x-auto rp-reels-track"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-5 sm:gap-6 px-4 md:px-[max(1rem,calc((100vw-1280px)/2+1rem))] pb-4 w-max">
          {doubled.map((reel, i) => (
            <ReelCard
              key={`${reel.slug}-${i}`}
              reel={reel}
              index={i}
              onPlay={setPlayingSlug}
              isPlaying={playingSlug === reel.slug && i === doubled.findIndex(r => r.slug === playingSlug)}
              onVisibilityChange={onVisibilityChange}
            />
          ))}
        </div>
      </div>

      {/* Outbound link rail for screen readers + no-JS browsers */}
      <div className="sr-only">
        <ul>
          {reels.map((r) => (
            <li key={r.slug}>
              <a href={`https://www.instagram.com/reel/${r.slug}/`} target="_blank" rel="noopener noreferrer">
                {r.caption}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
