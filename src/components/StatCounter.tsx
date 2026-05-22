import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * StatCounter — spring-animated number that triggers on scroll-into-view.
 *
 * Per the motion vocabulary in the Web Redesign Plan §4.3:
 * stiffness 80, damping 20 from the dossier. Only triggers once.
 * Falls back to static text when prefers-reduced-motion.
 */
type Props = {
  value: number
  suffix?: string
  label: string
  /** When true, formats with 1 decimal (used by the 4.9★ Google rating). */
  decimal?: boolean
  className?: string
}

export function StatCounter({ value, suffix = '', label, decimal = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => { setHasMounted(true) }, [])

  const spring = useSpring(0, { stiffness: 80, damping: 20, mass: 1 })
  const display = useTransform(spring, (v) =>
    decimal
      ? v.toFixed(1)
      : Math.round(v).toLocaleString('es-MX'),
  )
  const [display2, setDisplay2] = useState<string>(decimal ? '0.0' : '0')

  useEffect(() => {
    const unsub = display.on('change', (v) => setDisplay2(v))
    return () => unsub()
  }, [display])

  useEffect(() => {
    if (!hasMounted) return
    if (inView) spring.set(value)
  }, [inView, hasMounted, spring, value])

  // Reduced motion respect
  useEffect(() => {
    if (!hasMounted) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) setDisplay2(decimal ? value.toFixed(1) : Math.round(value).toLocaleString('es-MX'))
  }, [hasMounted, value, decimal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('text-left', className)}
    >
      <p className="font-display text-[40px] sm:text-[56px] lg:text-[72px] font-semibold leading-[1] tracking-tight tabular-nums text-cobalt-800">
        {display2}
        {suffix && <span className="ml-0.5 text-cobalt-600">{suffix}</span>}
      </p>
      <p className="mt-2 text-[13px] sm:text-[14px] text-ink-500 uppercase tracking-widest font-semibold max-w-[24ch] text-balance">
        {label}
      </p>
    </motion.div>
  )
}
