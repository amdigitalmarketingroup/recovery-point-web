import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * CenteredIVBag — full hero center product banner.
 *
 * Mario sent two Higgsfield-generated 3D videos of the real Recovery Point IV
 * bag. We use the front-facing one as the hero centerpiece. The bag is the
 * subject; text wraps around it (headline above, CTAs below).
 *
 * Scroll behavior:
 *  - The video scales DOWN from 1.0 → 0.85 as the user scrolls (suggesting
 *    the bag receding into the page).
 *  - Subtle Y drift (-30 → 30px) so the bag floats relative to the surrounding
 *    text columns at a different parallax rate.
 *  - At deeper scroll positions the opacity falls slightly so the next section
 *    can take over visually.
 *
 * Video plays autoplay/muted/loop/playsinline — safe across all browsers.
 * Mobile gets a slightly smaller scale to make room for stacked text.
 */
export default function CenteredIVBag() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Spring-smooth the scroll to avoid jitter
  const smooth = useSpring(scrollY, { stiffness: 80, damping: 22, mass: 0.6 })

  const scale = useTransform(smooth, [0, 700], [1, 0.85])
  const y     = useTransform(smooth, [0, 700], [0, 40])
  const opacity = useTransform(smooth, [0, 600, 900], [1, 1, 0.5])

  // Force autoplay even on iOS by playing programmatically after mount.
  useEffect(() => {
    const video = ref.current?.querySelector('video')
    if (video) {
      video.play().catch(() => { /* ignore — autoplay policy may block */ })
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity }}
      className="relative mx-auto w-full max-w-[480px] sm:max-w-[600px] lg:max-w-[680px] aspect-square"
    >
      {/* Soft cobalt glow behind the bag — gives it lift on the cream bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(107, 125, 192, 0.35), rgba(199, 213, 255, 0.18) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/hero/iv-bag-poster.jpg"
        className="relative size-full object-contain"
        aria-label="IV bag Recovery Point en rotación"
      >
        <source src="/img/hero/iv-bag.webm" type="video/webm" />
        <source src="/img/hero/iv-bag.mp4" type="video/mp4" />
      </video>
    </motion.div>
  )
}
