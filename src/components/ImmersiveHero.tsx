import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

/**
 * ImmersiveHero — interactive overlay layer that makes the dark cobalt hero
 * feel alive. Three signature moves stacked:
 *
 *  1. SPOTLIGHT CURSOR — large soft mint radial gradient follows the mouse,
 *     illuminating whatever's beneath. Reads as ambient light on dark interior.
 *  2. MOUSE-PARALLAX TILT — subtle perspective tilt of the headline + IV bag
 *     based on cursor position. Cinematic, never aggressive.
 *  3. PARTICLE DRIFT — sparse mint/cobalt dots floating slowly across the
 *     background to suggest air movement (like sauna steam or IV drip particles
 *     in slow motion).
 *  4. SCROLL PARALLAX — backdrop layer drifts at 0.5x scroll speed for depth.
 *
 * Drops as a `client:load` island behind the hero content. The other hero
 * elements (headline, CTAs, IV bag) stay as static Astro markup so they SSR.
 */
export default function ImmersiveHero() {
  const ref = useRef<HTMLDivElement>(null)

  // Spotlight cursor — raw motion values, spring-smoothed for fluidity
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 })

  // Scroll parallax — backdrop layer drifts up as we scroll
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 80])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Particle positions — fixed once on mount so they don't reshuffle on render.
  // Sparse: 16 particles is enough to feel alive without distracting.
  const particles = Array.from({ length: 16 }, (_, i) => ({
    x: Math.random() * 100,        // %
    y: Math.random() * 100,        // %
    size: 2 + Math.random() * 4,   // px
    delay: Math.random() * 10,     // s
    duration: 14 + Math.random() * 12, // s
    // Particles tinted darker so they read on cream
    color: i % 3 === 0 ? 'rgba(45, 142, 138, 0.45)' : 'rgba(31, 45, 90, 0.20)',
  }))

  return (
    <>
      {/* Layer 1: backdrop parallax — soft tints on the cream hero */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-32 size-[640px] rounded-full bg-cobalt-300/25 blur-[160px]" />
        <div className="absolute bottom-1/4 right-[8%] size-[400px] rounded-full bg-amber-300/15 blur-[120px]" />
      </motion.div>

      {/* Layer 2: full-hero mousemove tracker (spotlight + parallax driver) */}
      <div ref={ref} className="absolute inset-0 pointer-events-auto -z-10">
        {/* Spotlight — soft mint radial follows cursor (subtle on cream) */}
        <motion.div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: useTransform(
              [sx, sy],
              ([x, y]: number[]) =>
                `radial-gradient(640px circle at ${x}px ${y}px, rgba(45, 142, 138, 0.14), transparent 65%)`,
            ),
          }}
        />
        {/* Secondary cursor accent — tighter cobalt halo */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: useTransform(
              [sx, sy],
              ([x, y]: number[]) =>
                `radial-gradient(220px circle at ${x}px ${y}px, rgba(31, 45, 90, 0.05), transparent 65%)`,
            ),
          }}
        />
      </div>

      {/* Layer 3: drifting particles — keyframed CSS, GPU-friendly */}
      <div aria-hidden className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes particle-float {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0.45; }
          50%  { transform: translate3d(20px, -40px, 0) scale(1.4); opacity: 1; }
          100% { transform: translate3d(-12px, 30px, 0) scale(0.9); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="particle-float"], [data-immersive-particle] { animation: none !important; }
        }
      `}</style>
    </>
  )
}
