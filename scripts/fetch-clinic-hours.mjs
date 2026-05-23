#!/usr/bin/env node
/**
 * Build-time fetcher for clinic hours.  Runs before `astro build` via the
 * `prebuild` npm script.  Pulls the current clinic_hours rows from Supabase
 * and writes them to `src/data/clinic-hours.json` so the static site can
 * import them with no runtime fetch.
 *
 * Falls back to the hardcoded Mon-Fri 7-21 / Sat-Sun 7-16 (the seed from
 * migration 20260523001) if Supabase is unreachable — build never fails.
 *
 * Mario asked (2026-05-23) that we eliminate the hardcoded copy in
 * src/lib/contact.ts.  This is the bridge until we wire a webhook from
 * admin save → trigger redeploy.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = resolve(__dirname, '..', 'src', 'data', 'clinic-hours.json')

// Read-only public anon key — safe to embed at build time, RLS allows reads.
const SUPABASE_URL = 'https://cwxyhcwhueagzqlecikj.supabase.co'
const ANON_KEY = process.env.RP_PUBLIC_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eHloY3dodWVhZ3pxbGVjaWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjI1NjEsImV4cCI6MjA5NDc5ODU2MX0.c_NmvJMBR4P0FpI_aBiulNCd1Q6gyE7ULipqKBSGZLE'

// Fallback (matches migration seed, also matches what was hardcoded in
// contact.ts before this refactor).
const FALLBACK = {
  generated_at: null,
  source: 'fallback',
  hours: [
    { day_of_week: 0, label_es: 'Lunes',     label_en: 'Monday',    is_open: true, opens: '07:00:00', closes: '21:00:00' },
    { day_of_week: 1, label_es: 'Martes',    label_en: 'Tuesday',   is_open: true, opens: '07:00:00', closes: '21:00:00' },
    { day_of_week: 2, label_es: 'Miércoles', label_en: 'Wednesday', is_open: true, opens: '07:00:00', closes: '21:00:00' },
    { day_of_week: 3, label_es: 'Jueves',    label_en: 'Thursday',  is_open: true, opens: '07:00:00', closes: '21:00:00' },
    { day_of_week: 4, label_es: 'Viernes',   label_en: 'Friday',    is_open: true, opens: '07:00:00', closes: '21:00:00' },
    { day_of_week: 5, label_es: 'Sábado',    label_en: 'Saturday',  is_open: true, opens: '07:00:00', closes: '16:00:00' },
    { day_of_week: 6, label_es: 'Domingo',   label_en: 'Sunday',    is_open: true, opens: '07:00:00', closes: '16:00:00' },
  ],
}

async function main() {
  let payload = FALLBACK
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/clinic_hours?select=*&order=day_of_week`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data) || data.length !== 7) throw new Error(`unexpected payload (${data?.length} rows)`)
    payload = {
      generated_at: new Date().toISOString(),
      source: 'supabase',
      hours: data,
    }
    console.log(`[fetch-clinic-hours] OK — ${data.length} rows fetched from Supabase`)
  } catch (err) {
    console.warn(`[fetch-clinic-hours] WARN — using fallback (${err.message})`)
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n')
  console.log(`[fetch-clinic-hours] wrote ${OUT_PATH}`)
}

main().catch((err) => {
  console.error('[fetch-clinic-hours] fatal:', err)
  process.exit(1)
})
