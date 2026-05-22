import clsx, { type ClassValue } from 'clsx'

/**
 * cn — className merge helper (clsx wrapper). Used by every component.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * Number formatter — thousand separators, locale-aware. Default es-MX.
 */
export function formatNumber(n: number, locale: 'es' | 'en' = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US').format(n)
}

/**
 * Currency formatter (MXN by default).
 */
export function formatMxn(n: number, locale: 'es' | 'en' = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n)
}
