/**
 * Recovery Point — contact / deeplink helpers.
 *
 * Single source of truth for the phone, WA URL, email, address, hours and
 * social handles. Imported by Layout, Header, Footer, every CTA button, the
 * quiz funnel, and JSON-LD schema generators.
 *
 * Per Mario's "no cascarón" rule: every link these helpers produce must
 * actually open. We unit-tested by checking output shape; the production
 * proof is the sticky WA FAB.
 */

/** International dialing — keep the country code so wa.me works. */
export const WHATSAPP_NUMBER = '+5216868437360'
export const WHATSAPP_NUMBER_DISPLAY = '+52 (686) 843-7360'
/** Same number — Recovery Point uses one front desk line. */
export const PHONE_NUMBER = '+5216868437360'
export const PHONE_NUMBER_DISPLAY = '+52 (686) 843-7360'

export const EMAIL = 'info@recoverypoint.mx'

/** Full address (mind: "Los Pinos", NOT "Las Fuentes" — current site has it wrong). */
export const ADDRESS = {
  street: 'Río Sonora #599',
  colonia: 'Col. Los Pinos',
  city: 'Mexicali',
  state: 'BC',
  zip: '21230',
  country: 'México',
  /** lat/lng from Google Maps; used by /contacto map embed + LocalBusiness JSON-LD */
  lat: 32.6520,
  lng: -115.4528,
  mapsUrl: 'https://maps.app.goo.gl/recoverypointmexicali',
}

/**
 * Clinic hours.  Sourced from Supabase `clinic_hours` table at build time
 * via `scripts/fetch-clinic-hours.mjs` (runs in `prebuild`).  The admin
 * panel is now the single source of truth — when Mario or any admin edits
 * hours in /clinic-settings, the next deploy picks up the new values.
 *
 * If the build-time fetch fails, the script writes the same fallback that
 * matches the migration seed (Mon-Fri 7-21, Sat-Sun 7-16) so the build
 * never breaks on a Supabase outage.
 */
import clinicHoursData from '@/data/clinic-hours.json'

interface ClinicHourRow {
  day_of_week: number
  label_es: string
  label_en: string
  is_open: boolean
  opens: string       // 'HH:MM:SS'
  closes: string
}

const hoursRows = (clinicHoursData.hours as ClinicHourRow[]) ?? []

/** Compact schema.org-compatible HOURS array. Days with the same window are
 *  collapsed into one row.  Closed days are skipped. */
function buildCompactHours(rows: ClinicHourRow[]): { dow: string; opens: string; closes: string }[] {
  const dowCodes = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']  // 0=Mon..6=Sun
  // Group days by (opens, closes) tuple
  const groups = new Map<string, string[]>()
  for (const r of rows) {
    if (!r.is_open) continue
    const key = `${r.opens.slice(0, 5)}__${r.closes.slice(0, 5)}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(dowCodes[r.day_of_week])
  }
  return [...groups.entries()].map(([key, days]) => {
    const [opens, closes] = key.split('__')
    return { dow: days.join(','), opens, closes }
  })
}

export const HOURS = buildCompactHours(hoursRows)

/** Format a "HH:MM" 24-hour string into a "h:mm am/pm" 12-hour string —
 *  Mario flagged 2026-05-23 that bare "7:00 — 21:00" reads as "7 a 9am" to
 *  customers used to 12-hour Mexican usage.  Returns lowercase am/pm with no
 *  leading zero on the hour (e.g. "7:00 am", "9:00 pm"). */
export function formatTime12h(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

/** Detailed per-day list — used by /contacto for the legible "Lun a Vie" copy. */
export const HOURS_DETAILED = hoursRows.map((r) => {
  const opens24  = r.opens.slice(0, 5)
  const closes24 = r.closes.slice(0, 5)
  return {
    dayOfWeek: r.day_of_week,
    labelEs: r.label_es,
    labelEn: r.label_en,
    isOpen: r.is_open,
    opens: opens24,
    closes: closes24,
    opens12: formatTime12h(opens24),
    closes12: formatTime12h(closes24),
  }
})

export const SOCIAL = {
  instagram: 'https://instagram.com/recoverypointmx',
  facebook:  'https://facebook.com/recoverypointmx',
  tiktok:    'https://tiktok.com/@recoverypointmx',
  google:    'https://maps.app.goo.gl/recoverypointmexicali',
}

/* ────────────────────────────────────────────────────────────
   WhatsApp deeplink builder
   ──────────────────────────────────────────────────────────── */

export type WhatsAppIntent =
  | 'generic'
  | 'iv-generic'
  | 'iv-specific'
  | 'nad'
  | 'massage-generic'
  | 'massage-specific'
  | 'sauna'
  | 'cryo'
  | 'ice'
  | 'red-light'
  | 'boots'
  | 'fisio'
  | 'stem'
  | 'quiz-result'
  | 'membership'
  | 'pair'

/**
 * Builds a wa.me deeplink with a pre-filled message context. Per the Web
 * Redesign Plan §7, every CTA on the site routes through here so the bot
 * receives an intent-typed first message.
 */
export function whatsappLink(
  intent: WhatsAppIntent,
  params: Record<string, string | number | undefined> = {},
): string {
  const message = buildMessage(intent, params)
  const number = WHATSAPP_NUMBER.replace(/^\+/, '').replace(/[^0-9]/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

function buildMessage(intent: WhatsAppIntent, p: Record<string, string | number | undefined>): string {
  switch (intent) {
    case 'generic':
      return 'Hola, quiero reservar en Recovery Point.'
    case 'iv-generic':
      return 'Hola, me interesa información sobre los sueros intravenosos. ¿Cuál me recomiendan?'
    case 'iv-specific':
      return p.sueroName
        ? `Hola, me interesa el IV "${p.sueroName}". ¿Qué disponibilidad hay?`
        : 'Hola, me interesa reservar un IV. ¿Qué disponibilidad hay?'
    case 'nad':
      return p.variant
        ? `Hola, me interesa el NAD+ "${p.variant}". ¿Cuál me recomiendan y cuándo hay espacio?`
        : 'Hola, me interesa información sobre NAD+. ¿Cuál tipo me recomiendan?'
    case 'massage-generic':
      return 'Hola, quiero reservar un masaje. ¿Qué tipos tienen y disponibilidad?'
    case 'massage-specific':
      return p.variant
        ? `Hola, quiero reservar masaje "${p.variant}". ¿Para cuándo hay espacio?`
        : 'Hola, quiero reservar un masaje.'
    case 'sauna':
      return 'Hola, quiero reservar Sauna Infrarrojo. ¿Qué disponibilidad hay?'
    case 'cryo':
      return 'Hola, quiero reservar Crioterapia. ¿Qué disponibilidad hay?'
    case 'ice':
      return 'Hola, quiero reservar Tina de Hielo. ¿Qué disponibilidad hay?'
    case 'red-light':
      return 'Hola, quiero reservar Red Light Bed. ¿Qué disponibilidad hay?'
    case 'boots':
      return 'Hola, quiero reservar Botas de Compresión. ¿Qué disponibilidad hay?'
    case 'fisio':
      return p.variant
        ? `Hola, quiero reservar Fisioterapia (${p.variant}). ¿Qué disponibilidad hay?`
        : 'Hola, quiero reservar Fisioterapia.'
    case 'stem':
      return 'Hola, me interesa la consulta de Stem Cells (medicina regenerativa). ¿Qué disponibilidad hay?'
    case 'quiz-result':
      return p.recommendation
        ? `Hola, contesté el quiz en su sitio y me recomendó: ${p.recommendation}.${p.name ? ` Soy ${p.name}.` : ''}${p.urgency ? ` Quisiera ${p.urgency}.` : ''} ¿Podemos agendar?`
        : 'Hola, contesté el quiz en su sitio. ¿Podemos agendar?'
    case 'membership':
      return 'Hola, me interesa información sobre paquetes y membresías de Recovery Point.'
    case 'pair':
      return 'Hola, somos 2 personas, queremos reservar IV en Sala VIP.'
    default:
      return 'Hola, quiero reservar en Recovery Point.'
  }
}

export const telLink = `tel:${PHONE_NUMBER}`
export const emailLink = `mailto:${EMAIL}`

/* Google Maps embed URL for the /contacto map iframe */
export const MAPS_EMBED_URL =
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.0!2d${ADDRESS.lng}!3d${ADDRESS.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRecovery%20Point%20Mexicali`
