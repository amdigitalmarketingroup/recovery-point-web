import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

type AnchorProps = CommonProps & ComponentPropsWithoutRef<'a'> & { as?: 'a'; href: string }
type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'> & { as?: 'button' }
export type RPButtonProps = AnchorProps | ButtonProps

const base = 'group inline-flex items-center justify-center gap-2 font-semibold rounded-full ring-offset-2 transition-all duration-[var(--duration-micro)] [transition-timing-function:var(--ease-out-quart)] focus-visible:ring-2 focus-visible:ring-cobalt-600 focus-visible:ring-offset-2 select-none'

const variants: Record<Variant, string> = {
  primary:   'bg-cobalt-700 text-white hover:bg-cobalt-800 hover:shadow-lg hover:shadow-cobalt-800/25 active:scale-[0.98]',
  secondary: 'bg-white text-cobalt-800 border border-cobalt-200 hover:border-cobalt-400 hover:bg-cobalt-50 active:scale-[0.98]',
  ghost:     'bg-transparent text-cobalt-800 hover:bg-cobalt-50',
  whatsapp:  'bg-mint-500 text-white hover:bg-mint-600 hover:shadow-lg hover:shadow-mint-600/25 active:scale-[0.98]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[14px] tracking-tight',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-14 px-7 text-[16px]',
}

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, RPButtonProps>(
  function Button({ variant = 'primary', size = 'md', className, children, ...rest }, ref) {
    const cls = cn(base, variants[variant], sizes[size], className)
    if ((rest as AnchorProps).href !== undefined || rest.as === 'a') {
      const aProps = rest as AnchorProps
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...aProps}>
          {children}
        </a>
      )
    }
    const Tag: ElementType = 'button'
    return (
      <Tag ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...(rest as ButtonProps)}>
        {children}
      </Tag>
    )
  },
)
