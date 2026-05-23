import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useT, type Locale } from '@/i18n/messages'
import { whatsappLink } from '@/lib/contact'
import { cn } from '@/lib/utils'

/**
 * Quiz funnel — 4 steps (goal → frequency → urgency → name).
 *
 * Outputs a personalized recommendation + opens a WhatsApp deeplink with
 * the user's name + recommendation + urgency pre-filled. The bot picks
 * up the conversation from there. Per the Web Redesign Plan §5.8.
 *
 * Pure client-side, no backend — Mario's "ready-to-send over automation"
 * memory: defaults to WA deeplink, no Twilio/Meta API calls.
 */
type Props = { locale: Locale }

type Goal = 'recovery' | 'energy' | 'beauty' | 'hangover' | 'longevity' | 'sleep'
type Frequency = 'first' | 'returning' | 'regular'
type Urgency = 'today' | 'tomorrow' | 'this_week' | 'flexible'

interface Answers {
  goal?: Goal
  frequency?: Frequency
  urgency?: Urgency
  name?: string
}

/** Map goal → recommended service+suero (in es). */
const RECOMMENDATION: Record<Goal, { title: string; suero?: string; service: string }> = {
  recovery:  { title: 'IV Sport Enhancer + Botas de Compresión',   suero: 'Sport Enhancer', service: 'IV Therapy' },
  energy:    { title: 'IV NAD+ (variante según consulta)',          suero: 'NAD+', service: 'IV Therapy' },
  beauty:    { title: 'IV Beauty Glow + Red Light Bed',             suero: 'Beauty Glow', service: 'IV Therapy' },
  hangover:  { title: 'IV Hangover (45 min)',                       suero: 'Hangover', service: 'IV Therapy' },
  longevity: { title: 'NAD+ + Glutatión (la más completa)',         suero: 'NAD+ + Glutatión', service: 'IV Therapy' },
  sleep:     { title: 'IV Sleep Aid + Sauna Infrarrojo',            suero: 'Sleep Aid', service: 'IV Therapy' },
}

const URGENCY_MAP: Record<Urgency, string> = {
  today:     'reservar hoy mismo',
  tomorrow:  'reservar mañana',
  this_week: 'reservar esta semana',
  flexible:  'que me recomienden el mejor horario',
}

export default function Quiz({ locale }: Props) {
  const t = useT(locale)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const goalOptions     = t('quiz.steps.goal.options')      as Array<{ id: Goal;      label: string }>
  const freqOptions     = t('quiz.steps.frequency.options') as Array<{ id: Frequency; label: string }>
  const urgencyOptions  = t('quiz.steps.urgency.options')   as Array<{ id: Urgency;   label: string }>

  const progress = (step / 4) * 100

  const canAdvance = useMemo(() => {
    if (step === 0) return !!answers.goal
    if (step === 1) return !!answers.frequency
    if (step === 2) return !!answers.urgency
    if (step === 3) return (answers.name?.trim().length ?? 0) >= 3
    return false
  }, [step, answers])

  function next() { if (canAdvance && step < 4) setStep(step + 1) }
  function back() { if (step > 0) setStep(step - 1) }
  function restart() { setAnswers({}); setStep(0) }

  const recommendation = answers.goal ? RECOMMENDATION[answers.goal] : null
  const waUrl = recommendation && answers.name && answers.urgency
    ? whatsappLink('quiz-result', {
        recommendation: recommendation.title,
        name: answers.name,
        urgency: URGENCY_MAP[answers.urgency],
      })
    : whatsappLink('generic')

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10 h-1.5 rounded-full bg-cobalt-100 overflow-hidden">
        <motion.div
          className="h-full bg-cobalt-700"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <Step key="goal" title={t('quiz.steps.goal.title')}>
            <OptionGrid
              options={goalOptions}
              selected={answers.goal}
              onSelect={(id) => setAnswers({ ...answers, goal: id as Goal })}
            />
          </Step>
        )}
        {step === 1 && (
          <Step key="freq" title={t('quiz.steps.frequency.title')}>
            <OptionGrid
              options={freqOptions}
              selected={answers.frequency}
              onSelect={(id) => setAnswers({ ...answers, frequency: id as Frequency })}
              cols={1}
            />
          </Step>
        )}
        {step === 2 && (
          <Step key="urg" title={t('quiz.steps.urgency.title')}>
            <OptionGrid
              options={urgencyOptions}
              selected={answers.urgency}
              onSelect={(id) => setAnswers({ ...answers, urgency: id as Urgency })}
            />
          </Step>
        )}
        {step === 3 && (
          <Step key="name" title={t('quiz.steps.contact.title')}>
            <input
              type="text"
              autoFocus
              value={answers.name ?? ''}
              onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
              placeholder={t('quiz.steps.contact.namePlaceholder')}
              className="w-full h-14 px-5 rounded-2xl bg-white border border-cobalt-200 text-ink-900 text-[17px] focus:outline-none focus:border-cobalt-600 focus:ring-4 focus:ring-cobalt-600/15 transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canAdvance) next()
              }}
            />
          </Step>
        )}
        {step === 4 && recommendation && (
          <Step key="result" title={t('quiz.result.title')} hideHeader>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-cobalt-100 text-cobalt-800 text-[11px] font-semibold uppercase tracking-widest">
                <Check className="size-3" /> Recomendación lista
              </span>
              <h3 className="mt-5 font-display text-[36px] sm:text-[48px] leading-[1.04] tracking-tight text-balance">
                Te recomendamos:
              </h3>
              <p className="mt-3 font-display text-[28px] sm:text-[36px] leading-tight text-cobalt-700 font-semibold">
                {recommendation.title}
              </p>
              <p className="mt-5 text-ink-700 text-pretty">
                {t('quiz.result.subtitle')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-cobalt-700 text-white text-[16px] font-semibold hover:bg-cobalt-800 hover:shadow-lg hover:shadow-cobalt-800/30 transition-all btn-shimmer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"/></svg>
                  {t('quiz.result.bookCta')}
                </a>
                <button
                  onClick={restart}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-white text-cobalt-800 border border-cobalt-200 text-[15px] font-semibold hover:bg-cobalt-50 hover:border-cobalt-400 transition-all"
                >
                  <RotateCcw className="size-4" />
                  {t('quiz.result.retry')}
                </button>
              </div>
            </div>
          </Step>
        )}
      </AnimatePresence>

      {/* Nav buttons (hidden on result step) */}
      {step < 4 && (
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className={cn(
              'inline-flex items-center gap-2 h-12 px-5 rounded-full text-[14px] font-semibold transition-all',
              step === 0
                ? 'opacity-30 cursor-not-allowed text-ink-400'
                : 'text-cobalt-700 hover:bg-cobalt-50',
            )}
          >
            <ArrowLeft className="size-4" />
            Atrás
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className={cn(
              'inline-flex items-center gap-2 h-12 px-6 rounded-full text-[14px] font-semibold transition-all',
              canAdvance
                ? 'bg-cobalt-700 text-white hover:bg-cobalt-800 hover:shadow-lg hover:shadow-cobalt-800/25'
                : 'bg-cobalt-100 text-cobalt-300 cursor-not-allowed',
            )}
          >
            {step === 3 ? t('quiz.steps.contact.submitCta') : 'Continuar'}
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}

      {/* Step counter */}
      {step < 4 && (
        <p className="mt-6 text-center text-[12px] uppercase tracking-widest text-ink-500 font-semibold">
          Paso {step + 1} de 4
        </p>
      )}
    </div>
  )
}

function Step({ children, title, hideHeader }: { children: React.ReactNode; title: string; hideHeader?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {!hideHeader && (
        <h2 className="mb-8 font-display text-[32px] sm:text-[44px] font-semibold leading-tight text-balance text-ink-900">
          {title}
        </h2>
      )}
      {children}
    </motion.div>
  )
}

function OptionGrid({
  options, selected, onSelect, cols = 2,
}: {
  options: Array<{ id: string; label: string }>
  selected?: string
  onSelect: (id: string) => void
  cols?: 1 | 2
}) {
  return (
    <div className={cn('grid gap-3', cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2')}>
      {options.map((opt) => {
        const isSel = opt.id === selected
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={cn(
              'group relative flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all duration-[var(--duration-micro)] [transition-timing-function:var(--ease-out-quart)]',
              isSel
                ? 'border-cobalt-700 bg-cobalt-50 ring-2 ring-cobalt-600/30'
                : 'border-cobalt-100 bg-white hover:border-cobalt-300 hover:bg-cobalt-50/50',
            )}
            aria-pressed={isSel}
          >
            <span className={cn(
              'shrink-0 inline-flex items-center justify-center size-6 rounded-full border-2 transition-colors',
              isSel ? 'bg-cobalt-700 border-cobalt-700 text-white' : 'border-cobalt-200',
            )}>
              {isSel && <Check className="size-3.5" strokeWidth={3} />}
            </span>
            <span className="text-[15px] font-semibold text-ink-900 leading-tight">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
