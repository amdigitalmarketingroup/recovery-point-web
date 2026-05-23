import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * FloatingIVBag — premium 3D-feeling IV bag that rotates and floats with scroll.
 *
 * Pattern: the Awwwards / 21st.dev "anchored animated artifact" — single hero
 * element that comes alive as the user scrolls. Implementation:
 *
 *  • Position absolute on the right side of the hero, hidden on mobile (the
 *    scroll on touch can feel jittery and would compete with the wordmark).
 *  • useScroll → scrollYProgress drives rotation + vertical drift.
 *  • useSpring for smoothing — raw scrollY produces jerky motion otherwise.
 *  • Asset: /img/iv-bag.svg (cobalt → mint liquid, RP label, drip chamber).
 *
 * Performance: SVG inline-ish (loaded as static asset, not framework JSX),
 * GPU-friendly transforms only, no JS scroll listener (uses MotionValue).
 */
export default function FloatingIVBag() {
  const { scrollYProgress } = useScroll()

  // Smooth the raw progress through a spring so the bag feels weighted.
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18, mass: 0.6 })

  // 0 → 1 maps to two full rotations on the Y axis (720°) so the rotation is
  // visually continuous across a long scroll, never reaching a "stuck" frame.
  const rotateY = useTransform(smooth, [0, 1], [0, 720])
  // Subtle drift: -40px → 40px so the bag floats relative to its origin.
  const y       = useTransform(smooth, [0, 1], [-30, 30])
  // Very small rotateZ for cinematic swing
  const rotateZ = useTransform(smooth, [0, 1], [-6, 6])

  return (
    <div
      aria-hidden
      className="hidden lg:block absolute right-[4%] xl:right-[8%] top-1/2 -translate-y-1/2 pointer-events-none z-10"
      style={{ perspective: '1200px' }}
    >
      <motion.img
        src="/img/iv-bag.svg"
        alt=""
        loading="eager"
        width={320}
        height={480}
        style={{
          rotateY,
          rotateZ,
          y,
          width: 'clamp(220px, 22vw, 380px)',
          height: 'auto',
          filter: 'drop-shadow(0 30px 60px rgba(31, 45, 90, 0.18))',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  )
}
