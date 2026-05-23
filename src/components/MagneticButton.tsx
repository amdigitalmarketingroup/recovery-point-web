import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * MagneticButton — the Aceternity / Bundui "magnetic" affordance.
 *
 * The button (and its content layer) translate toward the cursor with a
 * spring follow. Premium tell. Used on hero primary CTA.
 */
type Variant = 'primary' | 'ghost' | 'whatsapp'
type Props = {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: Variant
  /** 0.2 subtle · 0.35 default · 0.5 dramatic */
  strength?: number
  className?: string
  target?: string
  rel?: string
  ariaLabel?: string
}

const VARIANTS: Record<Variant, string> = {
  primary:  'bg-cobalt-800 text-white shadow-[0_8px_24px_-8px_rgba(31,45,90,0.5)] hover:shadow-[0_16px_40px_-12px_rgba(31,45,90,0.6)] btn-shimmer',
  ghost:    'border border-cobalt-200 bg-white/80 text-cobalt-900 backdrop-blur hover:bg-white hover:border-cobalt-300',
  whatsapp: 'bg-cobalt-700 text-white shadow-[0_8px_24px_-8px_rgba(45,142,138,0.5)] hover:bg-cobalt-800 hover:shadow-[0_16px_40px_-12px_rgba(45,142,138,0.6)] btn-shimmer',
}

export default function MagneticButton({
  href, onClick, children, variant = 'primary', strength = 0.32,
  className = '', target, rel, ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 h-14 text-[15px] font-semibold tracking-tight transition-shadow duration-300 select-none'

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy }}
      className={cn(base, VARIANTS[variant], className)}
    >
      {/* The label layer translates by twice the strength so it feels alive */}
      <motion.span className="inline-flex items-center gap-2" style={{ x: sx, y: sy }}>
        {children}
      </motion.span>
    </motion.div>
  )

  return href ? (
    <a href={href} target={target} rel={rel} aria-label={ariaLabel} className="inline-block">{Inner}</a>
  ) : (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-block">{Inner}</button>
  )
}
