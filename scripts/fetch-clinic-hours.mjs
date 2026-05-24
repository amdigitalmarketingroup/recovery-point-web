#!/usr/bin/env node
/**
 * Build-time fetcher for the clinic's displayed weekly hours.
 *
 * Migration 20260524001 dropped the `clinic_hours` weekly table. The single
 * source of truth for recurring availability is now `services.schedule_days`,
 * `services.schedule_open`, `services.schedule_close`. This script aggregates
 * those into the union "clinic is open from X to Y on this weekday" that the
 * website's /contacto page and JSON-LD openingHoursSpecification expect.
 *
 * Behavior per weekday:
 *   - If NO active service operates this weekday → is_open=false (rare)
 *   - Otherwise → opens = min(schedule_open), closes = max(schedule_close)
 *     across services where schedule_days[weekdayMonFirst] === true
 *
 * Falls back to Mon-Fri 7-21 / Sat-Sun 7-16 if Supabase is unreachable, so the
 * build never fails.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = resolve(__dirname, '..', 'src', 'data', 'clinic-hours.json')

// Read-only public anon key — safe to embed at build time, RLS allows reads.
const SUPABASE_URL = 'https://cwxyhcwhueagzqlecikj.supabase.co'
const ANON_KEY = process.env.RP_PUBLIC_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eHloY3dodWVhZ3pxbGVjaWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjI1NjEsImV4cCI6MjA5NDc5ODU2MX0.c_NmvJMBR4P0FpI_aBiulNCd1Q6gyE7ULipqKBSGZLE'

const LABEL_ES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const LABEL_EN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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

/** Aggregate the per-weekday open window from the services table. */
function aggregate(services) {
  const out = []
  for (let day = 0; day < 7; day++) {
    const operating = services.filter((s) =>
      s.is_active !== false
      && Array.isArray(s.schedule_days)
      && s.schedule_days.length === 7
      && s.schedule_days[day] === true,
    )
    if (operating.length === 0) {
      out.push({
        day_of_week: day,
        label_es: LABEL_ES[day],
        label_en: LABEL_EN[day],
        is_open: false,
        opens: null,
        closes: null,
      })
      continue
    }
    // Earliest open, latest close across operating services
    const opens  = operating.map((s) => s.schedule_open  ?? '07:00:00').sort()[0]
    const closes = operating.map((s) => s.schedule_close ?? '21:00:00').sort().slice(-1)[0]
    out.push({
      day_of_week: day,
      label_es: LABEL_ES[day],
      label_en: LABEL_EN[day],
      is_open: true,
      opens,
      closes,
    })
  }
  return out
}

async function main() {
  let payload = FALLBACK
  try {
    // Call the SECURITY DEFINER RPC `get_aggregated_clinic_hours()`. Anon role
    // has EXECUTE permission so we don't need to expose the services table to
    // the public. The RPC does the schedule_days[] aggregation server-side.
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_aggregated_clinic_hours`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const hours = await res.json()
    if (!Array.isArray(hours) || hours.length !== 7) {
      throw new Error(`unexpected payload (${hours?.length} rows)`)
    }
    payload = {
      generated_at: new Date().toISOString(),
      source: 'supabase-rpc-aggregated',
      hours,
    }
    console.log(`[fetch-clinic-hours] OK — ${hours.length} rows from get_aggregated_clinic_hours()`)
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
