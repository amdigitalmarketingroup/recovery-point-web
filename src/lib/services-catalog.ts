/**
 * Recovery Point — services & sueros catalog (static snapshot).
 *
 * This mirrors the live Supabase `services` + `sueros` tables (admin project
 * cwxyhcwhueagzqlecikj) as of the website build. Single source of truth on
 * the marketing site so prices and durations stay consistent with the admin
 * + agent. When prices change in the admin, regenerate this file.
 */

export type Pillar = 'recovery' | 'vitality' | 'beauty'

export interface ServiceEntry {
  id: string
  slug: string
  i18nKey: string
  pillar: Pillar
  durationMin: number
  priceMxn: number
  /** Price range when service has variants */
  priceRange?: [number, number]
  capacity: number
  /** Icon id matching src/components/icons/* (lucide name OR local svg id) */
  icon: string
  /** Cover image path under /public/img/services/ — used by service cards */
  cover: string
  /** Hex color token for accent backgrounds */
  accent: 'cobalt' | 'periwinkle' | 'mint' | 'amber' | 'ivory'
}

export const SERVICES: ServiceEntry[] = [
  { id: 'iv-vip',       slug: 'iv',         i18nKey: 'iv',       pillar: 'recovery', durationMin: 60, priceMxn: 1500, priceRange: [900, 4800], capacity: 2, icon: 'Droplet',    cover: '/img/services/iv.webp',       accent: 'cobalt' },
  { id: 'masoterapia',  slug: 'masajes',    i18nKey: 'massage',  pillar: 'recovery', durationMin: 60, priceMxn: 800,  priceRange: [650, 1200], capacity: 1, icon: 'Hand',       cover: '/img/services/massage.webp',  accent: 'periwinkle' },
  { id: 'sauna',        slug: 'sauna',      i18nKey: 'sauna',    pillar: 'recovery', durationMin: 30, priceMxn: 355,  capacity: 2,             icon: 'Flame',      cover: '/img/services/sauna.webp',    accent: 'amber' },
  { id: 'cryo',         slug: 'cryo',       i18nKey: 'cryo',     pillar: 'recovery', durationMin: 3,  priceMxn: 900,  capacity: 1,             icon: 'Snowflake',  cover: '/img/services/cryo.webp',     accent: 'cobalt' },
  { id: 'ice-plunge',   slug: 'ice',        i18nKey: 'ice',      pillar: 'recovery', durationMin: 15, priceMxn: 500,  capacity: 1,             icon: 'Waves',      cover: '/img/services/ice.webp',      accent: 'mint' },
  { id: 'red-light',    slug: 'red-light',  i18nKey: 'redlight', pillar: 'beauty',   durationMin: 30, priceMxn: 600,  capacity: 1,             icon: 'Sun',        cover: '/img/services/redlight.webp', accent: 'amber' },
  { id: 'boots',        slug: 'botas',      i18nKey: 'boots',    pillar: 'recovery', durationMin: 30, priceMxn: 200,  capacity: 2,             icon: 'Footprints', cover: '/img/services/boots.webp',    accent: 'periwinkle' },
  { id: 'fisioterapia', slug: 'fisio',      i18nKey: 'fisio',    pillar: 'recovery', durationMin: 60, priceMxn: 1000, priceRange: [500, 1000], capacity: 1, icon: 'Activity',   cover: '/img/services/fisio.webp',    accent: 'cobalt' },
  { id: 'stem-cells',   slug: 'stem',       i18nKey: 'stem',     pillar: 'vitality', durationMin: 30, priceMxn: 0,    capacity: 1,             icon: 'Dna',        cover: '/img/services/stem.webp',     accent: 'mint' },
]

/* ────────────────────────────────────────────────────────────
   IV Therapy — sueros (28 active)
   Pulled from sueros table 2026-05-21
   ──────────────────────────────────────────────────────────── */

export type SueroFamily = 'nad' | 'premium' | 'standard' | 'hangover'

export interface SueroEntry {
  id: string
  name: string
  family: SueroFamily
  durationMin: number
  priceMxn: number
  /** Comma-separated ingredient list shown in the hover drawer */
  ingredients: string
  /** Up to 3 short categories: e.g. ['energia', 'celular'] */
  categories: string[]
  /** Headline pitch — 1 line, no period */
  pitch: { es: string; en: string }
}

export const SUEROS: SueroEntry[] = [
  // — NAD family —
  { id: 'nad-glutation', name: 'NAD+ + Glutatión', family: 'nad', durationMin: 150, priceMxn: 4800,
    ingredients: 'NAD+, Glutatión',
    categories: ['celular', 'detox', 'belleza'],
    pitch: { es: 'NAD+ con el antioxidante maestro — combo más completo del menú', en: 'NAD+ with the master antioxidant — the most complete combo on the menu' } },
  { id: 'nad-mvi',  name: 'NAD+ + MVI',  family: 'nad', durationMin: 135, priceMxn: 4400,
    ingredients: 'NAD+, Multivitamínico Intravenoso (MVI)',
    categories: ['celular', 'inmune', 'energia'],
    pitch: { es: 'NAD+ con vitaminas e inmunidad reforzada', en: 'NAD+ with vitamins and reinforced immunity' } },
  { id: 'nad-plus', name: 'NAD+',        family: 'nad', durationMin: 120, priceMxn: 3600,
    ingredients: 'NAD+ (Nicotinamida Adenina Dinucleótido) puro',
    categories: ['celular', 'energia'],
    pitch: { es: 'Regeneración celular, claridad mental, energía profunda', en: 'Cellular regeneration, mental clarity, deep energy' } },

  // — Premium 75 min ($1,800) —
  { id: 'beauty-glow',    name: 'Beauty Glow',    family: 'premium', durationMin: 75, priceMxn: 1800,
    ingredients: 'Vit C alta dosis, Biotina, Glutatión, complejo B',
    categories: ['belleza', 'piel'],
    pitch: { es: 'Brillo, piel, cabello y uñas en una sola sesión', en: 'Glow, skin, hair and nails in one session' } },
  { id: 'executive-life', name: 'Executive Life', family: 'premium', durationMin: 75, priceMxn: 1800,
    ingredients: 'Complejo B, Magnesio, Aminoácidos, Carnitina',
    categories: ['energia', 'celular'],
    pitch: { es: 'Energía y enfoque para días largos', en: 'Energy and focus for long days' } },
  { id: 'super-detox',    name: 'Super Detox',    family: 'premium', durationMin: 75, priceMxn: 1800,
    ingredients: 'Glutatión, Vit C, Magnesio, B-complex',
    categories: ['detox', 'belleza', 'celular'],
    pitch: { es: 'Limpieza profunda con antioxidantes', en: 'Deep cleanse with antioxidants' } },

  // — Standard 60 min ($1,500) —
  { id: 'sport-enhancer',    name: 'Sport Enhancer',          family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Magnesio, Carnitina, complejo B, electrolitos',
    categories: ['energia', 'recuperacion'],
    pitch: { es: 'Recuperación deportiva con rendimiento muscular', en: 'Athletic recovery with muscle performance' } },
  { id: 'energy-booster',    name: 'Recovery Energy Booster', family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Complejo B, magnesio, taurina, glucosa',
    categories: ['energia'],
    pitch: { es: 'Boost de energía sin estimulantes', en: 'Energy boost without stimulants' } },
  { id: 'bye-migraine',      name: 'Bye Migraine',            family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Magnesio, B2, B-complex, antinflamatorio suave',
    categories: ['migraña'],
    pitch: { es: 'Alivio rápido de migraña y dolor de cabeza tensional', en: 'Fast relief from migraine and tension headache' } },
  { id: 'nutri-c',           name: 'Nutri C',                 family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Vit C alta dosis, B-complex, zinc',
    categories: ['inmune', 'belleza'],
    pitch: { es: 'Defensas e inmunidad reforzada', en: 'Reinforced immunity and defenses' } },
  { id: 'sleep-aid',         name: 'Sleep Aid',               family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Magnesio, Glicina, L-Teanina, B-complex',
    categories: ['sueño', 'relajacion'],
    pitch: { es: 'Relaja sistema nervioso y mejora calidad del sueño', en: 'Relaxes the nervous system and improves sleep quality' } },
  { id: 'hormone-balance',   name: 'Hormone Balance',         family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Magnesio, B6, B12, ácido fólico, taurina',
    categories: ['belleza', 'energia'],
    pitch: { es: 'Apoyo hormonal y energía estable', en: 'Hormonal support and stable energy' } },
  { id: 'post-op',           name: 'Post Op',                 family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Vit C, Glutatión, Zinc, Aminoácidos',
    categories: ['recuperacion', 'inmune'],
    pitch: { es: 'Recuperación post-cirugía con cicatrización rápida', en: 'Post-surgery recovery with faster healing' } },
  { id: 'anti-inflamatorio', name: 'Recovery Anti Inflamatorio', family: 'standard', durationMin: 60, priceMxn: 1500,
    ingredients: 'Vit C, magnesio, B-complex, MSM',
    categories: ['recuperacion', 'dolor'],
    pitch: { es: 'Reduce inflamación sistémica y dolor muscular', en: 'Reduces systemic inflammation and muscle pain' } },

  // — Hangover ($900 · 45 min) —
  { id: 'hangover-classic', name: 'Hangover Classic', family: 'hangover', durationMin: 45, priceMxn: 900,
    ingredients: 'Solución hidratante, B-complex, antinausea, antiinflamatorio suave',
    categories: ['cruda', 'hidratacion'],
    pitch: { es: 'Cruda en 45 minutos, listo para tu día', en: 'Hangover gone in 45 minutes, back to your day' } },
]

/* Family helpers used by IV detail page filter chips */
export const SUERO_FAMILIES: { id: SueroFamily; durationLabel: string }[] = [
  { id: 'nad',      durationLabel: '120–150 min' },
  { id: 'premium',  durationLabel: '75 min' },
  { id: 'standard', durationLabel: '60 min' },
  { id: 'hangover', durationLabel: '45 min' },
]

export function sueroBySlug(slug: string): SueroEntry | undefined {
  return SUEROS.find((s) => s.id === slug)
}

export function serviceBySlug(slug: string): ServiceEntry | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
