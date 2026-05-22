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

export const HOURS = [
  { dow: 'Mo,Tu,We,Th,Fr', opens: '07:00', closes: '21:00' },
  { dow: 'Sa,Su',          opens: '07:00', closes: '16:00' },
] as const

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
