import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * SpotlightCard — cursor-follow radial gradient that brightens the card
 * under the user's pointer. The "21st.dev premium card" signature move.
 *
 * Zero JS framework dependency — uses CSS custom properties + native event
 * handlers. The radial gradient is layered as backgroundImage; we update
 * `--mx` / `--my` on mousemove so it tracks the cursor.
 */
type Props = {
  children: ReactNode
  className?: string
  /** Spotlight tint color rgba — defaults to cobalt-600 at 12% */
  tint?: string
  /** Spotlight radius in px */
  radius?: number
}

export default function SpotlightCard({
  children,
  className = '',
  tint = 'rgba(61, 79, 181, 0.12)',
  radius = 420,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('group relative overflow-hidden transition', className)}
      style={{
        backgroundImage: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), ${tint}, transparent 60%)`,
      }}
    >
      {children}
    </div>
  )
}
