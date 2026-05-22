/**
 * Recovery Point — i18n message catalogs.
 *
 * Locales: 'es' (es-MX, default) · 'en' (en-US, US/CA visitor support).
 *
 * Pattern: nested object keyed by string path. Helpers below resolve dot-paths
 * + interpolate {{vars}}. Synced across Astro pages and React islands via
 * useT(locale) / t(locale, key).
 */

export type Locale = 'es' | 'en'

export const LOCALES: Locale[] = ['es', 'en']
export const DEFAULT_LOCALE: Locale = 'es'

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; hreflang: string }> = {
  es: { label: 'ES', htmlLang: 'es-MX', hreflang: 'es-mx' },
  en: { label: 'EN', htmlLang: 'en-US', hreflang: 'en-us' },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Messages = Record<string, any>

export const messages: Record<Locale, Messages> = {
  es: {
    site: {
      tagline: 'Clínica de recuperación, hidratación y vitalidad en Mexicali.',
      whatsappCta: 'Reservar por WhatsApp',
      callCta: 'Llamar',
      bookCta: 'Reservar',
      learnMore: 'Conocer más',
      menuLabel: 'Menú',
      closeLabel: 'Cerrar',
      readMore: 'Leer más',
      seeMore: 'Ver más',
      mayHelp: 'Ayuda con',
    },
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      nad: 'NAD+',
      method: 'Método',
      team: 'Nosotros',
      space: 'El espacio',
      reserve: 'Reservar',
      contact: 'Contacto',
    },
    home: {
      hero: {
        eyebrow: 'Recovery Point · Mexicali',
        title: 'Tu lugar para <em>recuperarte</em>, hidratarte y vivir mejor.',
        subtitle: 'Sueros intravenosos, terapias de recuperación y medicina regenerativa con médicos certificados. Sala privada o compartida, sin agujas dolorosas, en menos de una hora.',
        primaryCta: 'Reservar por WhatsApp',
        secondaryCta: 'Conocer terapias',
        accreditation: 'Médicos certificados · Vitaminas grado farmacéutico · Más de 12,000 sesiones',
      },
      pillars: {
        eyebrow: 'Tres pilares',
        title: 'Lo que puedes lograr aquí.',
        recovery: {
          title: 'Recuperación',
          description: 'Sueros, masaje, crioterapia, sauna infrarrojo, tina de hielo y botas de compresión para reducir inflamación, dolor muscular y fatiga.',
          chip: 'Para deportistas y vida activa',
        },
        vitality: {
          title: 'Vitalidad',
          description: 'NAD+, fórmulas de energía celular, micronutrientes farmacéuticos y consulta de stem cells para sostener tu desempeño y bienestar diario.',
          chip: 'Anti-edad celular · NAD+',
        },
        beauty: {
          title: 'Belleza',
          description: 'Glow, hidratación profunda, detox y red light bed para piel, cabello y sistema linfático. Resultado visible desde la primera sesión.',
          chip: 'Glow · piel · linfa',
        },
      },
      stats: {
        eyebrow: 'Lo que respalda Recovery Point',
        title: 'Datos, no promesas.',
        items: [
          { value: 12000, suffix: '+', label: 'Sesiones realizadas' },
          { value: 4.9,   suffix: '★', label: 'Promedio Google · más de 200 reseñas' },
          { value: 28,    suffix: '',  label: 'Sueros distintos en catálogo activo' },
          { value: 6,     suffix: ' años', label: 'Operando en Mexicali' },
        ],
      },
      why: {
        eyebrow: 'Por qué Recovery Point',
        title: 'No somos una clínica más.',
        items: [
          { title: 'Médicos certificados', description: 'Cada protocolo y aplicación supervisado por médico con cédula. Cero pinche aficionado con aguja.' },
          { title: 'Vitaminas grado farmacéutico', description: 'Trabajamos con compounders certificados. Conoces exactamente qué entra a tu vena.' },
          { title: 'Sala VIP privada o sala social', description: 'Tú decides: privacidad total para llamadas y descanso, o conviviendo con tu pareja, amigo o equipo.' },
          { title: 'Botas de compresión incluidas', description: 'Cada sesión de IV incluye Compression Boots sin costo extra. Sales más ligero de lo que entraste.' },
          { title: '45 min o menos', description: 'Nuestro flujo está diseñado para entrar, descansar profundo y volver a tu día sin perder horas.' },
        ],
      },
      testimonials: {
        eyebrow: 'Lo que dicen quienes ya vinieron',
        title: 'Reseñas reales de Google.',
        viewAll: 'Ver todas en Google',
      },
      cta: {
        title: 'Listo para sentirte mejor mañana mismo.',
        subtitle: 'Te respondemos por WhatsApp en menos de 10 minutos durante horario de operación.',
        primary: 'Reservar por WhatsApp',
        secondary: 'Llamar a recepción',
      },
    },
    services: {
      hero: {
        eyebrow: 'Catálogo completo',
        title: 'Nueve terapias para recuperarte, energizarte y verte mejor.',
        subtitle: 'Cada servicio tiene su sala, su duración y su técnica. Filtra por categoría o por objetivo para encontrar lo tuyo.',
      },
      filters: {
        all: 'Todas',
        recovery: 'Recuperación',
        vitality: 'Vitalidad',
        beauty: 'Belleza',
        objective: '¿Qué buscas?',
      },
      items: {
        iv: {
          name: 'IV Therapy',
          short: 'IV',
          tagline: 'Sueros intravenosos con vitaminas, antioxidantes y NAD+. 28 fórmulas activas.',
          chip: 'energía · cruda · belleza · NAD',
        },
        massage: {
          name: 'Masoterapia',
          short: 'Masaje',
          tagline: 'Relajante, terapéutico, descontracturante, reflexología podal y drenaje linfático.',
          chip: 'dolor · tensión · linfa',
        },
        sauna: {
          name: 'Sauna Infrarrojo',
          short: 'Sauna',
          tagline: 'Calor infrarrojo de cedro para detox profundo, recuperación cardiovascular y sueño.',
          chip: 'detox · sueño · cardio',
        },
        cryo: {
          name: 'Crioterapia',
          short: 'Cryo',
          tagline: 'Cámara de cuerpo completo a -110°C por 3 minutos. Inflamación, energía, recuperación.',
          chip: 'inflamación · energía',
        },
        ice: {
          name: 'Tina de hielo',
          short: 'Ice',
          tagline: 'Inmersión guiada a 5°C por 10–15 minutos. Resistencia mental + recuperación muscular.',
          chip: 'recuperación · mente',
        },
        redlight: {
          name: 'Red Light Bed',
          short: 'Red Light',
          tagline: 'Fotobiomodulación de cuerpo completo. Piel, sueño, recuperación celular.',
          chip: 'piel · sueño · celular',
        },
        boots: {
          name: 'Botas de compresión',
          short: 'Boots',
          tagline: 'Sistema neumático secuencial. Recuperación de piernas en 30 minutos.',
          chip: 'piernas · linfa',
        },
        fisio: {
          name: 'Fisioterapia',
          short: 'Fisio',
          tagline: 'Consulta diagnóstica o sesión terapéutica con fisioterapeuta certificado.',
          chip: 'lesión · rehabilitación',
        },
        stem: {
          name: 'Stem Cells',
          short: 'Stem',
          tagline: 'Consulta diagnóstica de medicina regenerativa. Tratamientos según evaluación.',
          chip: 'regeneración · consulta',
        },
      },
    },
    iv: {
      hero: {
        eyebrow: 'IV Therapy',
        title: 'Sueros intravenosos a la medida de lo que tu cuerpo necesita.',
        subtitle: 'Nuestro menú activo tiene 28 fórmulas: hidratación, energía, NAD+, belleza, detox, recuperación deportiva y combos premium. Aplicados por médico, en sala normal o privada, con botas de compresión incluidas.',
        cta: 'Reservar mi IV por WhatsApp',
      },
      familyFilter: {
        all: 'Todos',
        nad: 'NAD+ (120–150 min)',
        premium: 'Premium (75 min)',
        standard: 'Estándar (60 min)',
        hangover: 'Hangover (45 min)',
      },
      pickerLabel: 'Filtra por familia',
      ingredientLabel: 'Qué trae',
      durationLabel: 'Duración',
      priceLabel: 'Precio',
      bookSpecific: 'Reservar este suero',
    },
    nad: {
      hero: {
        eyebrow: 'NAD+',
        title: 'Energía celular real. <em>Sin atajos</em>.',
        subtitle: 'NAD+ (Nicotinamida Adenina Dinucleótido) es la molécula que tu cuerpo usa para producir energía a nivel mitocondrial. Después de los 30, baja entre 30–50%. Reponerlo intravenoso es la única vía con biodisponibilidad real.',
        cta: 'Reservar NAD+ por WhatsApp',
      },
      whoFor: {
        title: '¿Para quién es NAD+?',
        items: [
          'Personas 30+ que sienten que ya no rinden como antes.',
          'Atletas y entrenamiento de alto volumen que necesitan recuperación profunda.',
          'Quien quiere energía sin estimulantes ni cafeína de más.',
          'Apoyo en protocolos de claridad mental y enfoque.',
          'Recuperación post-cirugía, post-COVID o agotamiento crónico.',
        ],
      },
      faq: {
        title: 'Preguntas frecuentes sobre NAD+',
        items: [
          { q: '¿Por qué dura tanto la sesión?', a: 'NAD+ se infunde lento (120–150 min) para que tu cuerpo lo procese sin molestia. La velocidad rápida puede causar náuseas; nuestro protocolo está calibrado para máximo confort.' },
          { q: '¿Cuándo se sienten los efectos?', a: 'La mayoría reporta más claridad mental y energía estable desde las primeras 24–48h. El efecto acumulativo se nota con una serie corta.' },
          { q: '¿Cuántas sesiones necesito?', a: 'Depende de tu objetivo y línea base. En la consulta médica diseñamos el plan: desde una sesión puntual hasta protocolos de 4–6 sesiones.' },
          { q: '¿Cuál diferencia hay entre NAD+ puro, NAD+ MVI y NAD+ Glutatión?', a: 'NAD+ puro es la molécula sola (120 min). NAD+ MVI agrega multivitamínicos intravenosos (135 min). NAD+ Glutatión añade el antioxidante maestro (150 min). El médico recomienda según tu objetivo.' },
        ],
      },
    },
    method: {
      hero: {
        eyebrow: 'El Método Recovery Point',
        title: 'Cuatro pasos para que tu sesión sea protocolo, no improvisación.',
      },
      steps: [
        { title: 'Evaluación', description: 'Conversamos contigo: cómo te sientes, qué buscas, qué medicación tomas, condiciones médicas relevantes. Antes de aplicar, entendemos.' },
        { title: 'Personalización', description: 'El médico diseña la fórmula correcta: vitaminas, dosis, duración. Te explicamos qué entra a tu vena y por qué.' },
        { title: 'Aplicación', description: 'Sala privada o social. Inserción guiada por médico. Botas de compresión incluidas. Música, agua, snack si quieres.' },
        { title: 'Seguimiento', description: 'Te escribimos al día siguiente para validar cómo te sentiste. Ajustamos para la siguiente sesión si hubo algo a mejorar.' },
      ],
    },
    team: {
      hero: {
        eyebrow: 'Nosotros',
        title: 'El equipo detrás de Recovery Point.',
        subtitle: 'Médicos certificados, fisioterapeutas con cédula, recepción que conoce tu nombre.',
      },
      roles: {
        founder: 'Fundador & Director',
        medicalDirector: 'Director Médico',
        physiotherapist: 'Fisioterapeuta',
        nurse: 'Enfermería',
        reception: 'Recepción',
      },
    },
    space: {
      hero: {
        eyebrow: 'El espacio',
        title: 'Conoce el lugar antes de venir.',
        subtitle: 'Sala VIP privada, sala social compartida, sauna de cedro, cámara de cryo, tina de hielo y zona de relajación. Tour fotográfico real, sin renders.',
      },
      categories: {
        reception: 'Recepción',
        ivNormal: 'Sala IV social',
        ivVip: 'Sala VIP privada',
        sauna: 'Sauna infrarrojo',
        cryo: 'Cámara de crioterapia',
        ice: 'Tina de hielo',
        redlight: 'Red Light Bed',
        massage: 'Salas de masaje',
      },
    },
    quiz: {
      hero: {
        eyebrow: 'Quiz de recomendación',
        title: 'Te ayudamos a elegir.',
        subtitle: 'Cuatro preguntas, una recomendación personalizada con tu sugerencia + reservar por WhatsApp.',
      },
      steps: {
        goal: {
          title: '¿Qué buscas hoy?',
          options: [
            { id: 'recovery',  label: 'Recuperación / dolor muscular' },
            { id: 'energy',    label: 'Más energía / despertar' },
            { id: 'beauty',    label: 'Belleza / piel / detox' },
            { id: 'hangover',  label: 'Cruda / deshidratación' },
            { id: 'longevity', label: 'Anti-edad / longevidad / NAD' },
            { id: 'sleep',     label: 'Mejor sueño / relajación' },
          ],
        },
        frequency: {
          title: '¿Es tu primera vez con nosotros?',
          options: [
            { id: 'first',    label: 'Sí, primera vez' },
            { id: 'returning', label: 'Ya he venido antes' },
            { id: 'regular',  label: 'Vengo con frecuencia' },
          ],
        },
        urgency: {
          title: '¿Cuándo te gustaría agendar?',
          options: [
            { id: 'today',     label: 'Hoy mismo' },
            { id: 'tomorrow',  label: 'Mañana' },
            { id: 'this_week', label: 'Esta semana' },
            { id: 'flexible',  label: 'Soy flexible, recomiéndame' },
          ],
        },
        contact: {
          title: 'Una cosa más: ¿cómo te llamas?',
          namePlaceholder: 'Nombre + apellido',
          submitCta: 'Ver mi recomendación',
        },
      },
      result: {
        title: 'Esto te recomendamos.',
        subtitle: 'Basado en tu respuesta. Confírmanos por WhatsApp y reservamos tu cita.',
        bookCta: 'Reservar por WhatsApp con esta recomendación',
        retry: 'Hacer el quiz otra vez',
      },
    },
    contact: {
      hero: {
        eyebrow: 'Contacto',
        title: 'Cómo llegar y cómo escribirnos.',
      },
      address: 'Río Sonora #599, Col. Los Pinos · CP 21230 · Mexicali, BC',
      hoursTitle: 'Horarios',
      hours: [
        { day: 'Lunes a Viernes', range: '7:00 am — 9:00 pm' },
        { day: 'Sábado y Domingo', range: '7:00 am — 4:00 pm' },
        { day: 'Días festivos', range: 'Cerrado' },
      ],
      phoneLabel: 'Teléfono · WhatsApp',
      emailLabel: 'Correo',
      parkingTitle: 'Estacionamiento',
      parkingDesc: 'Estacionamiento privado gratuito dentro del complejo. Llega 10 min antes.',
    },
    footer: {
      tagline: 'Recuperación, hidratación y vitalidad en Mexicali.',
      columns: {
        services: 'Servicios',
        company: 'Empresa',
        legal: 'Legales',
        follow: 'Síguenos',
      },
      legal: {
        privacy: 'Aviso de privacidad',
        terms: 'Términos y condiciones',
      },
      newsletter: {
        title: '¿Algo nuevo en RP? Te avisamos.',
        placeholder: 'Tu correo',
        submit: 'Suscribirme',
        success: '¡Listo! Te avisaremos por aquí.',
        error: 'Algo salió mal. Inténtalo de nuevo en un momento.',
      },
      copyright: '© {{year}} Recovery Point. Todos los derechos reservados.',
      builtBy: 'Diseñado por 25|OCHO Agency',
    },
    notFound: {
      title: 'Esa página no existe.',
      subtitle: 'Puede que el link esté roto o que la página se haya movido. Te llevamos a un lugar útil.',
      cta: 'Volver al inicio',
      popular: 'Servicios populares',
    },
    thankYou: {
      title: '¡Gracias! Ya tenemos tu información.',
      subtitle: 'Te respondemos por WhatsApp en menos de 10 minutos durante horario de operación. Mientras, puedes seguir explorando.',
      back: 'Volver al inicio',
    },
  },
  en: {
    site: {
      tagline: 'Recovery, hydration and vitality clinic in Mexicali, México.',
      whatsappCta: 'Book on WhatsApp',
      callCta: 'Call',
      bookCta: 'Book',
      learnMore: 'Learn more',
      menuLabel: 'Menu',
      closeLabel: 'Close',
      readMore: 'Read more',
      seeMore: 'See more',
      mayHelp: 'May help',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      nad: 'NAD+',
      method: 'Method',
      team: 'About us',
      space: 'The space',
      reserve: 'Book',
      contact: 'Contact',
    },
    home: {
      hero: {
        eyebrow: 'Recovery Point · Mexicali',
        title: 'Your place to <em>recover</em>, hydrate and feel better.',
        subtitle: 'IV therapy, recovery treatments and regenerative medicine with certified physicians. Private or shared room, no painful needles, in under an hour.',
        primaryCta: 'Book on WhatsApp',
        secondaryCta: 'Browse therapies',
        accreditation: 'Certified physicians · Pharmaceutical-grade vitamins · 12,000+ sessions delivered',
      },
      pillars: {
        eyebrow: 'Three pillars',
        title: 'What you can achieve here.',
        recovery: {
          title: 'Recovery',
          description: 'IV drips, massage, cryotherapy, infrared sauna, ice plunge and compression boots to reduce inflammation, muscle soreness and fatigue.',
          chip: 'Athletes & active life',
        },
        vitality: {
          title: 'Vitality',
          description: 'NAD+, cellular energy formulas, pharmaceutical micronutrients and stem-cell consultation to sustain performance and daily well-being.',
          chip: 'Cellular anti-aging · NAD+',
        },
        beauty: {
          title: 'Beauty',
          description: 'Glow, deep hydration, detox and red-light bed for skin, hair and lymphatic flow. Visible result from session one.',
          chip: 'Glow · skin · lymph',
        },
      },
      stats: {
        eyebrow: 'What backs Recovery Point',
        title: 'Numbers, not promises.',
        items: [
          { value: 12000, suffix: '+', label: 'Sessions delivered' },
          { value: 4.9,   suffix: '★', label: 'Average on Google · 200+ reviews' },
          { value: 28,    suffix: '',  label: 'Active IV formulations on the menu' },
          { value: 6,     suffix: ' years', label: 'Operating in Mexicali' },
        ],
      },
      why: {
        eyebrow: 'Why Recovery Point',
        title: 'We are not just another clinic.',
        items: [
          { title: 'Certified physicians', description: 'Every protocol and infusion supervised by a licensed doctor. No amateurs with needles.' },
          { title: 'Pharmaceutical-grade vitamins', description: 'Sourced from certified compounders. You know exactly what enters your vein.' },
          { title: 'Private VIP room or social lounge', description: 'You choose: total privacy for calls and rest, or in the lounge with partner, friend or team.' },
          { title: 'Compression boots included', description: 'Every IV session includes 30 min of compression boots at no extra cost. You leave lighter than you came.' },
          { title: '45 minutes or less', description: 'Our flow is designed for you to come in, rest deeply, and get back to your day.' },
        ],
      },
      testimonials: {
        eyebrow: 'What our clients say',
        title: 'Real reviews from Google.',
        viewAll: 'See all on Google',
      },
      cta: {
        title: 'Ready to feel better as soon as tomorrow.',
        subtitle: 'We reply on WhatsApp in under 10 minutes during business hours.',
        primary: 'Book on WhatsApp',
        secondary: 'Call the front desk',
      },
    },
    services: {
      hero: {
        eyebrow: 'Full menu',
        title: 'Nine therapies to recover, energize and look better.',
        subtitle: 'Each service has its own room, duration and technique. Filter by category or by goal to find yours.',
      },
      filters: {
        all: 'All',
        recovery: 'Recovery',
        vitality: 'Vitality',
        beauty: 'Beauty',
        objective: 'What are you looking for?',
      },
      items: {
        iv: { name: 'IV Therapy', short: 'IV', tagline: 'Intravenous drips with vitamins, antioxidants and NAD+. 28 active formulations.', chip: 'energy · hangover · beauty · NAD' },
        massage: { name: 'Massage Therapy', short: 'Massage', tagline: 'Relaxing, therapeutic, deep-tissue, foot reflexology and lymphatic drainage.', chip: 'pain · tension · lymph' },
        sauna: { name: 'Infrared Sauna', short: 'Sauna', tagline: 'Cedar infrared heat for deep detox, cardiovascular recovery and sleep.', chip: 'detox · sleep · cardio' },
        cryo: { name: 'Cryotherapy', short: 'Cryo', tagline: 'Full-body chamber at -110°C for 3 minutes. Inflammation, energy, recovery.', chip: 'inflammation · energy' },
        ice: { name: 'Ice Plunge', short: 'Ice', tagline: 'Guided immersion at 5°C for 10–15 minutes. Mental resilience + muscle recovery.', chip: 'recovery · mind' },
        redlight: { name: 'Red Light Bed', short: 'Red Light', tagline: 'Full-body photobiomodulation. Skin, sleep, cellular recovery.', chip: 'skin · sleep · cellular' },
        boots: { name: 'Compression Boots', short: 'Boots', tagline: 'Sequential pneumatic system. Leg recovery in 30 minutes.', chip: 'legs · lymph' },
        fisio: { name: 'Physical Therapy', short: 'PT', tagline: 'Diagnostic consultation or therapeutic session with licensed physiotherapist.', chip: 'injury · rehab' },
        stem: { name: 'Stem Cells', short: 'Stem', tagline: 'Regenerative-medicine consultation. Treatments per evaluation.', chip: 'regeneration · consult' },
      },
    },
    iv: {
      hero: {
        eyebrow: 'IV Therapy',
        title: 'Custom IV drips for what your body actually needs.',
        subtitle: 'Our active menu has 28 formulations: hydration, energy, NAD+, beauty, detox, athletic recovery and premium combos. Physician-applied, normal or private room, compression boots included.',
        cta: 'Book my IV on WhatsApp',
      },
      familyFilter: {
        all: 'All',
        nad: 'NAD+ (120–150 min)',
        premium: 'Premium (75 min)',
        standard: 'Standard (60 min)',
        hangover: 'Hangover (45 min)',
      },
      pickerLabel: 'Filter by family',
      ingredientLabel: 'What it has',
      durationLabel: 'Duration',
      priceLabel: 'Price',
      bookSpecific: 'Book this drip',
    },
    nad: {
      hero: {
        eyebrow: 'NAD+',
        title: 'Real cellular energy. <em>No shortcuts</em>.',
        subtitle: 'NAD+ (Nicotinamide Adenine Dinucleotide) is the molecule your body uses to produce energy at the mitochondrial level. After 30, it drops 30–50%. Replenishing it intravenously is the only route with real bioavailability.',
        cta: 'Book NAD+ on WhatsApp',
      },
      whoFor: {
        title: 'Who is NAD+ for?',
        items: [
          'People 30+ who feel they no longer perform like they used to.',
          'Athletes and high-volume training that need deep recovery.',
          'Those who want energy without stimulants or extra caffeine.',
          'Support for mental clarity and focus protocols.',
          'Post-surgery, post-COVID or chronic exhaustion recovery.',
        ],
      },
      faq: {
        title: 'Frequently asked questions about NAD+',
        items: [
          { q: 'Why does the session take so long?', a: 'NAD+ is infused slowly (120–150 min) so your body can process it without discomfort. Going fast causes nausea; our protocol is calibrated for maximum comfort.' },
          { q: 'When are the effects felt?', a: 'Most people report sharper mental clarity and stable energy within 24–48h. The cumulative effect is noticeable across a short series.' },
          { q: 'How many sessions do I need?', a: 'It depends on your goal and baseline. In the medical consultation we design the plan: from a one-off session to 4–6 session protocols.' },
          { q: 'What is the difference between pure NAD+, NAD+ MVI and NAD+ Glutathione?', a: 'Pure NAD+ is the molecule alone (120 min). NAD+ MVI adds intravenous multivitamins (135 min). NAD+ Glutathione adds the master antioxidant (150 min). The physician recommends per your goal.' },
        ],
      },
    },
    method: {
      hero: { eyebrow: 'The Recovery Point Method', title: 'Four steps so your session is protocol, not improvisation.' },
      steps: [
        { title: 'Evaluation', description: 'We talk with you: how you feel, what you seek, what medications you take, any relevant medical conditions. Before applying, we understand.' },
        { title: 'Personalization', description: 'The physician designs the right formula: vitamins, dosing, duration. We explain what enters your vein and why.' },
        { title: 'Application', description: 'Private or shared room. Physician-guided insertion. Compression boots included. Music, water, snack if you want.' },
        { title: 'Follow-up', description: 'We message you the next day to validate how you felt. We adjust for next session if anything needed improvement.' },
      ],
    },
    team: {
      hero: { eyebrow: 'About us', title: 'The team behind Recovery Point.', subtitle: 'Certified physicians, licensed physiotherapists, a front desk that knows your name.' },
      roles: { founder: 'Founder & Director', medicalDirector: 'Medical Director', physiotherapist: 'Physical Therapist', nurse: 'Nursing', reception: 'Front Desk' },
    },
    space: {
      hero: { eyebrow: 'The space', title: 'See the place before you come in.', subtitle: 'Private VIP room, shared social lounge, cedar infrared sauna, cryo chamber, ice plunge and relaxation zone. Real photo tour — no renders.' },
      categories: {
        reception: 'Reception', ivNormal: 'Social IV lounge', ivVip: 'Private VIP room', sauna: 'Infrared sauna',
        cryo: 'Cryotherapy chamber', ice: 'Ice plunge', redlight: 'Red Light Bed', massage: 'Massage rooms',
      },
    },
    quiz: {
      hero: { eyebrow: 'Recommendation quiz', title: 'We help you choose.', subtitle: 'Four questions, one personalized recommendation with your suggestion + book on WhatsApp.' },
      steps: {
        goal: {
          title: 'What are you looking for today?',
          options: [
            { id: 'recovery',  label: 'Recovery / muscle pain' },
            { id: 'energy',    label: 'More energy / wakefulness' },
            { id: 'beauty',    label: 'Beauty / skin / detox' },
            { id: 'hangover',  label: 'Hangover / dehydration' },
            { id: 'longevity', label: 'Anti-aging / longevity / NAD' },
            { id: 'sleep',     label: 'Better sleep / relaxation' },
          ],
        },
        frequency: {
          title: 'Is this your first time with us?',
          options: [
            { id: 'first', label: 'Yes, first time' },
            { id: 'returning', label: 'I have come before' },
            { id: 'regular', label: 'I come regularly' },
          ],
        },
        urgency: {
          title: 'When would you like to book?',
          options: [
            { id: 'today', label: 'Today' },
            { id: 'tomorrow', label: 'Tomorrow' },
            { id: 'this_week', label: 'This week' },
            { id: 'flexible', label: 'I am flexible, recommend a time' },
          ],
        },
        contact: { title: 'One more thing — what is your name?', namePlaceholder: 'First + last name', submitCta: 'See my recommendation' },
      },
      result: { title: 'Here is what we recommend.', subtitle: 'Based on your answers. Confirm on WhatsApp and we book your session.', bookCta: 'Book on WhatsApp with this recommendation', retry: 'Take the quiz again' },
    },
    contact: {
      hero: { eyebrow: 'Contact', title: 'How to reach us and how to get here.' },
      address: 'Río Sonora #599, Col. Los Pinos · ZIP 21230 · Mexicali, BC, México',
      hoursTitle: 'Hours',
      hours: [
        { day: 'Mon–Fri', range: '7:00 am — 9:00 pm' },
        { day: 'Sat & Sun', range: '7:00 am — 4:00 pm' },
        { day: 'Holidays', range: 'Closed' },
      ],
      phoneLabel: 'Phone · WhatsApp',
      emailLabel: 'Email',
      parkingTitle: 'Parking',
      parkingDesc: 'Free private parking inside the complex. Please arrive 10 min early.',
    },
    footer: {
      tagline: 'Recovery, hydration and vitality in Mexicali.',
      columns: { services: 'Services', company: 'Company', legal: 'Legal', follow: 'Follow' },
      legal: { privacy: 'Privacy policy', terms: 'Terms of service' },
      newsletter: {
        title: 'Anything new at RP? We will let you know.',
        placeholder: 'Your email',
        submit: 'Subscribe',
        success: 'Done! We will reach out here.',
        error: 'Something went wrong. Try again in a moment.',
      },
      copyright: '© {{year}} Recovery Point. All rights reserved.',
      builtBy: 'Designed by 25|OCHO Agency',
    },
    notFound: {
      title: 'That page does not exist.',
      subtitle: 'The link may be broken or the page may have moved. We will take you somewhere useful.',
      cta: 'Back to home',
      popular: 'Popular services',
    },
    thankYou: {
      title: 'Thanks! We have your info.',
      subtitle: 'We reply on WhatsApp in under 10 minutes during business hours. Meanwhile, keep exploring.',
      back: 'Back to home',
    },
  },
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ────────────────────────────────────────────────────────────
   Resolvers
   ──────────────────────────────────────────────────────────── */

function getByPath(obj: Messages, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? `{{${key}}}`))
}

/**
 * t — translate by dot-path. Returns the raw string (with vars interpolated).
 * If the path resolves to a non-string (array, object), returns it as-is so
 * callers can iterate (e.g. NAD FAQ items).
 */
export function t(locale: Locale, key: string, vars?: Record<string, string | number>): any {
  const dict = messages[locale] ?? messages[DEFAULT_LOCALE]
  const val = getByPath(dict, key)
  if (val === undefined) {
    // Fallback to default locale if missing in current
    const fb = getByPath(messages[DEFAULT_LOCALE], key)
    if (fb === undefined) return key
    return typeof fb === 'string' ? interpolate(fb, vars) : fb
  }
  return typeof val === 'string' ? interpolate(val, vars) : val
}

/**
 * useT — helper for React islands. Binds locale once, returns translator.
 */
export function useT(locale: Locale) {
  return (key: string, vars?: Record<string, string | number>) => t(locale, key, vars)
}

/**
 * Localized path. Default locale renders at /<path>; other locales at /<locale>/<path>.
 */
export function localizedPath(locale: Locale, path: string): string {
  const trimmed = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return trimmed
  return `/${locale}${trimmed === '/' ? '' : trimmed}`
}

/**
 * Inverse: derive the locale from the current URL pathname.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0]
  return (LOCALES.includes(seg as Locale) ? seg : DEFAULT_LOCALE) as Locale
}
