/**
 * Recovery Point — per-service detail content (bilingual ES + EN).
 *
 * Each service sub-page consumes one entry from here so the ServiceDetailLayout
 * template stays generic. ServiceDetailLayout picks SERVICE_DETAILS_ES or
 * SERVICE_DETAILS_EN based on the URL locale (/en/* uses EN, default uses ES).
 *
 * Authoring rules (per brand voice + research dossier):
 *   - No medical claims that can't be substantiated ("ayuda con" / "puede" /
 *     "may help" / "can")
 *   - Spanish second-person ("tú"); English casual second-person ("you")
 *   - Specific, concrete benefits, not vague spa talk
 *   - Italic accent on the verb in headline (parsed by set:html in template)
 *   - No em-dashes (Mario's rule across all client copy)
 */

import type { WhatsAppIntent } from './contact'

export interface ServiceDetailContent {
  slug: string
  intent: WhatsAppIntent
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    quickFacts: string[]
  }
  benefits: {
    eyebrow: string
    title: string
    items: { title: string; description: string }[]
  }
  howItWorks: {
    eyebrow: string
    title: string
    steps: { title: string; description: string }[]
  }
  whoFor?: {
    eyebrow: string
    title: string
    items: string[]
  }
  faq: {
    eyebrow: string
    title: string
    items: { q: string; a: string }[]
  }
  cta: {
    title: string
    primary: string
  }
}

/* ============================================================================
   ES — Spanish (es-MX) content
   ============================================================================ */
export const SERVICE_DETAILS_ES: Record<string, ServiceDetailContent> = {
  masajes: {
    slug: 'masajes',
    intent: 'massage-generic',
    hero: {
      eyebrow: 'Masoterapia',
      title: 'Cinco masajes para <em>desbloquear</em> tu cuerpo.',
      subtitle: 'Relajante, terapéutico, descontracturante, reflexología podal y drenaje linfático. Cada uno con su técnica, su duración y su precio. Aplicados por terapeutas con cédula y formación específica.',
      quickFacts: ['45 a 75 min', 'Desde $650', 'Terapeutas con cédula', 'Sala individual'],
    },
    benefits: {
      eyebrow: 'Qué desbloquea',
      title: 'No todos los dolores son iguales.',
      items: [
        { title: 'Tensión acumulada', description: 'Trapecios, cuello, lumbar. Lo que viene de pasar horas en la silla o cargando estrés.' },
        { title: 'Contracturas profundas', description: 'Nudos musculares que llevan días o semanas. El descontracturante los rompe sin maltratar.' },
        { title: 'Recuperación post-entrenamiento', description: 'Para pádel, CrossFit, running. El masaje terapéutico acelera la fase de reparación.' },
        { title: 'Retención de líquidos', description: 'El drenaje linfático moviliza líquido estancado en piernas y abdomen.' },
        { title: 'Pies cansados', description: 'La reflexología trabaja zonas específicas del pie ligadas a órganos y sistemas.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Cuatro pasos en cada sesión.',
      steps: [
        { title: 'Diagnóstico inicial', description: 'Te preguntamos qué duele, qué quieres trabajar, qué presión te gusta. Si tienes lesión la consideramos.' },
        { title: 'Sala lista', description: 'Camilla profesional, aceite o crema según técnica, música baja, luz cálida. La sala está a tu temperatura.' },
        { title: 'Técnica específica', description: 'No improvisamos. Cada masaje tiene un protocolo: zonas, presión, tiempos.' },
        { title: 'Hidratación post', description: 'Te damos agua e indicación si conviene IV de seguimiento (depende del caso).' },
      ],
    },
    whoFor: {
      eyebrow: 'Para quién',
      title: 'Quién aprovecha más estos masajes.',
      items: [
        'Quien entrena pesas o deportes de impacto y necesita recuperación profunda.',
        'Trabajadores de escritorio con tensión crónica en cuello y espalda.',
        'Personas con lesión leve estable (sin diagnóstico médico nuevo).',
        'Quien quiere desestresar con presión más suave (relajante).',
        'Post-cirugía estética o procedimientos (drenaje linfático).',
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que más nos preguntan sobre masaje.',
      items: [
        { q: '¿Cuál masaje me conviene?', a: 'Si quieres desestresar: relajante. Si te duele algo específico: terapéutico. Si llevas contractura crónica: descontracturante. Si tienes retención: drenaje. Si dudas, escríbenos por WhatsApp y te ayudamos a elegir.' },
        { q: '¿La presión la decido yo?', a: 'Sí, dentro del protocolo de cada técnica. El descontracturante es siempre más firme; el relajante siempre suave. Dentro de cada uno, puedes pedir más o menos.' },
        { q: '¿Cuándo NO debo agendarme masaje?', a: 'Fiebre, infección activa, herida abierta en la zona, embarazo primer trimestre sin autorización médica, post-cirugía reciente sin alta. Ante duda, llámanos antes.' },
        { q: '¿Puedo combinar masaje + IV el mismo día?', a: 'Sí, muchos clientes lo encadenan. IV primero o después depende del objetivo. Te ajustamos los slots para que no esperes.' },
      ],
    },
    cta: { title: 'Tu cuerpo va a agradecer 60 minutos de masaje.', primary: 'Reservar masaje por WhatsApp' },
  },

  sauna: {
    slug: 'sauna',
    intent: 'sauna',
    hero: {
      eyebrow: 'Sauna Infrarrojo',
      title: 'Calor que entra al cuerpo, <em>no a la habitación</em>.',
      subtitle: 'Cedro, infrarrojo lejano, 30 minutos de sudor profundo. La diferencia con la sauna tradicional: la temperatura del aire es soportable, el calor penetra directamente a tus tejidos.',
      quickFacts: ['30 min', '45 a 55°C', 'Cedro real', 'Música a elegir'],
    },
    benefits: {
      eyebrow: 'Qué te aporta',
      title: 'Cuatro razones para sudar bien.',
      items: [
        { title: 'Detox profundo', description: 'El sudor del infrarrojo tiene una composición distinta: arrastra metales pesados y compuestos liposolubles.' },
        { title: 'Recuperación cardiovascular', description: 'Tu corazón trabaja como en cardio ligero. Mejora endurance sin impacto articular.' },
        { title: 'Mejor sueño', description: 'La caída térmica post-sesión activa el adormecimiento. Útil si te cuesta arrancar el descanso.' },
        { title: 'Piel y circulación', description: 'Microcirculación cutánea aumenta. Notas glow en las 2 o 3 horas siguientes.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos. Ninguno complicado.',
      steps: [
        { title: 'Llegas, te hidratas', description: 'Te damos agua mineral antes de entrar. Si vienes deshidratado no recomendamos hacer sauna.' },
        { title: 'Sesión de 30 min', description: 'Música si quieres, oscuridad si prefieres. Si te marea o sientes algo raro, sales. El botón está siempre accesible.' },
        { title: 'Recuperación post', description: 'Sales, te hidratas más, te damos toalla fresca. Si encadenas con tina de hielo, mejor aún (contraste térmico).' },
      ],
    },
    whoFor: {
      eyebrow: 'Para quién',
      title: 'A quién le saca el jugo a la sauna.',
      items: [
        'Atletas de resistencia que quieren ganar adaptación cardiovascular sin agregar impacto.',
        'Personas con sueño irregular: 2 o 3 sesiones a la semana ayudan a regular.',
        'Quien quiere encadenar IV + Sauna para sentir el doble efecto en una visita.',
        'Recuperación de gripes leves (con cuidado, no en fiebre activa).',
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas comunes sobre el sauna infrarrojo.',
      items: [
        { q: '¿Es la misma sauna de los gym?', a: 'No. Las saunas tradicionales calientan el AIRE a 80 o 100°C. La infrarroja calienta tu CUERPO directo, con aire a 45 o 55°C. Penetra más, aguantas más, sudas más.' },
        { q: '¿Cuánto tiempo se queda el efecto?', a: 'El glow cutáneo: 2 a 3 horas. La mejora de sueño: misma noche. La recuperación cardiovascular: efecto acumulativo con sesiones regulares (2 a 3 por semana mínimo 4 semanas).' },
        { q: '¿Puedo entrar embarazada?', a: 'No durante el primer trimestre. Después depende de tu obstetra; pídele autorización por escrito antes de venir.' },
        { q: '¿Y si me siento mareado?', a: 'Sales inmediato. Te damos agua con electrolitos y te recuestas. Suele ser deshidratación previa, pasamos a evaluar.' },
      ],
    },
    cta: { title: '30 minutos de sudor profundo te están esperando.', primary: 'Reservar sauna por WhatsApp' },
  },

  cryo: {
    slug: 'cryo',
    intent: 'cryo',
    hero: {
      eyebrow: 'Crioterapia',
      title: 'Tres minutos a -110°C. <em>Eso es todo</em>.',
      subtitle: 'Cámara de cuerpo completo en nitrógeno gaseoso. El frío extremo dispara una respuesta sistémica: inflamación baja, endorfinas suben, te sientes electrizado.',
      quickFacts: ['3 minutos', '-110°C', 'Cuerpo completo', 'Sin agua'],
    },
    benefits: {
      eyebrow: 'Qué dispara el frío extremo',
      title: 'Cuatro efectos inmediatos.',
      items: [
        { title: 'Antiinflamatorio sistémico', description: 'Inflamación muscular y articular baja en horas, no en días. Útil después de torneo o entrenamiento intenso.' },
        { title: 'Endorfinas + claridad mental', description: 'La respuesta noradrenérgica te deja con energía + foco las 3 a 5 horas siguientes.' },
        { title: 'Recuperación deportiva', description: 'Permite encadenar entrenamientos. Atletas de élite la usan post-juego para acortar el ciclo.' },
        { title: 'Quema calórica modesta', description: 'Tu cuerpo gasta calorías reactivando temperatura. No es dieta milagro pero suma.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Cuatro pasos. Cinco minutos en total.',
      steps: [
        { title: 'Cambio de ropa', description: 'Te damos ropa interior técnica, guantes, calcetines y zapatos térmicos.' },
        { title: 'Entras a la cámara', description: 'Tu cabeza queda fuera de la cámara, solo el cuerpo se expone al frío. Puedes platicar con quien está afuera todo el tiempo.' },
        { title: 'Tres minutos', description: 'El operador controla temperatura desde afuera. Tú decides si quieres salir antes; sales por la puerta cuando quieras.' },
        { title: 'Calentamiento gradual', description: 'Saliste, te quitas el equipo, regresas a temperatura corporal en 1 o 2 min con ejercicio ligero.' },
      ],
    },
    whoFor: {
      eyebrow: 'Para quién',
      title: 'A quién le aprovecha más.',
      items: [
        'Atletas de impacto: pádel, MMA, CrossFit, fútbol, hockey, rugby.',
        'Personas con inflamación crónica (artritis, fibromialgia con autorización médica).',
        'Quien busca recuperación 24/7 sin lesionarse más.',
        'Quien quiere el efecto "energético" sin café (la noradrenalina post-cryo es real).',
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas comunes sobre crioterapia.',
      items: [
        { q: '¿Es peligroso?', a: 'No para población general sana. Contraindicado si tienes problemas cardiovasculares no controlados, hipertensión grave o Raynaud. Te preguntamos antes de entrar.' },
        { q: '¿Tres minutos son suficientes?', a: 'Sí. A -110°C el cuerpo dispara la respuesta hormonal completa en 90 segundos. Más allá de 3 min no agregas beneficio y aumentas riesgo.' },
        { q: '¿Cuántas sesiones recomiendan?', a: 'Para mantenimiento: 1 o 2 a la semana. Para recovery puntual (post torneo): la mañana siguiente. Para fibromialgia o inflamación crónica: tu médico debe diseñar el protocolo.' },
        { q: '¿Y si me da claustrofobia?', a: 'La cabeza está siempre fuera de la cámara y la puerta abre desde adentro. Si te sientes incómodo, sales en segundos.' },
      ],
    },
    cta: { title: 'Tres minutos a -110°C cambian tu mañana entera.', primary: 'Reservar crioterapia por WhatsApp' },
  },

  ice: {
    slug: 'ice',
    intent: 'ice',
    hero: {
      eyebrow: 'Tina de Hielo',
      title: 'Inmersión guiada. <em>Tu mente y tus músculos</em>.',
      subtitle: 'Tina a 5°C, 10 a 15 minutos, con guía respiratoria. No es solo recuperación física, el ice plunge es entrenamiento de resistencia mental al estrés agudo.',
      quickFacts: ['10 a 15 min', '5°C', 'Cuerpo y mente', 'Guía respiratoria'],
    },
    benefits: {
      eyebrow: 'Qué entrenas en la tina',
      title: 'Tres beneficios que van más allá de lo muscular.',
      items: [
        { title: 'Recuperación muscular', description: 'Vasoconstricción + recirculación posterior reduce dolor de agujetas y acelera reparación.' },
        { title: 'Resistencia mental', description: 'Aprender a respirar bajo estrés agudo se traslada a presión en el trabajo, deporte y vida.' },
        { title: 'Dopamina y noradrenalina', description: 'El frío sostenido eleva neurotransmisores que te dan energía estable las horas siguientes.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Cuatro pasos guiados.',
      steps: [
        { title: 'Vestimenta básica', description: 'Ropa de baño. Te damos toalla térmica para después.' },
        { title: 'Respiración previa', description: 'Antes de entrar te guiamos 60 segundos para activar el sistema parasimpático.' },
        { title: 'Inmersión', description: 'Entras lento. Los primeros 30 segundos son los más duros, respiras profundo y largo. A los 90s tu cuerpo ya se adaptó.' },
        { title: 'Salida y calentamiento', description: 'Sales gradual, te secas, te damos algo caliente para tomar. Calentamiento natural en 5 min.' },
      ],
    },
    whoFor: {
      eyebrow: 'Para quién',
      title: 'A quién le sirve más.',
      items: [
        'Quien entrena fuerte y necesita recuperación próxima al entrenamiento.',
        'Personas que quieren mejorar su tolerancia al estrés agudo.',
        'Quien busca energía sin estimulantes (la noradrenalina post-ice es real).',
        'Combo: post-sauna a ice plunge da el efecto de contraste térmico más fuerte.',
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas comunes sobre tina de hielo.',
      items: [
        { q: '¿Cuánto tiempo me quedo?', a: '10 a 15 min es lo ideal. Si vienes por primera vez empezamos con 5 y subimos. Lo manejamos contigo.' },
        { q: '¿Es peligroso si nunca lo he hecho?', a: 'No para población sana. Te guiamos respiración y estamos a tu lado todo el tiempo. Contraindicado si tienes Raynaud, problemas cardiacos no controlados o hipertensión grave.' },
        { q: '¿Por qué guía respiratoria?', a: 'El primer minuto es shock. Si entras hiperventilando, sufres. Si respiras consciente, te adaptas en 60 segundos y empiezas a sentir el efecto positivo.' },
        { q: '¿Cuántas veces a la semana?', a: '2 a 3 veces es suficiente para beneficios recurrentes. Atletas elite a veces lo hacen diario; no es necesario para la mayoría.' },
      ],
    },
    cta: { title: 'Entra al agua. Sal con la cabeza limpia.', primary: 'Reservar tina de hielo por WhatsApp' },
  },

  'red-light': {
    slug: 'red-light',
    intent: 'red-light',
    hero: {
      eyebrow: 'Red Light Bed',
      title: 'Luz que <em>repara</em> a nivel celular.',
      subtitle: 'Cama de fotobiomodulación cuerpo completo con longitudes de onda específicas (660nm + 850nm). 20 minutos sin esfuerzo, efectos en piel, sueño y recuperación celular.',
      quickFacts: ['20 min', '660 + 850 nm', 'Cuerpo completo', 'Sin esfuerzo'],
    },
    benefits: {
      eyebrow: 'Qué hace la luz roja',
      title: 'Cuatro beneficios respaldados.',
      items: [
        { title: 'Piel', description: 'Producción de colágeno aumenta. Útil para textura, arrugas finas, manchas leves, acné en remisión.' },
        { title: 'Sueño', description: 'Modula melatonina y ritmo circadiano. Sesiones en la tarde mejoran calidad del sueño esa misma noche.' },
        { title: 'Recuperación muscular', description: 'Reduce inflamación post-entrenamiento. Útil encadenado con IV o sauna.' },
        { title: 'Mitocondria', description: 'Las longitudes 660+850nm están estudiadas para mejorar producción de ATP a nivel celular.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos. Cero esfuerzo.',
      steps: [
        { title: 'Ropa mínima', description: 'Ropa interior o desnudo dentro de la cama (privacidad total). Te damos antifaz para los ojos.' },
        { title: 'Te recuestas', description: '30 minutos boca arriba, después si quieres 30 boca abajo. Música si prefieres, silencio si quieres meditar.' },
        { title: 'Saliste', description: 'Sin downtime. Ningún post-procedimiento. Te vas y sigues tu día.' },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas sobre Red Light.',
      items: [
        { q: '¿Cuándo se notan los efectos?', a: 'Piel: 4 a 6 semanas con sesiones regulares 2-3/semana. Sueño: misma noche. Recuperación muscular: post entrenamiento siguiente.' },
        { q: '¿Quema?', a: 'No. La luz roja es no-ionizante, no calienta significativamente. Sientes calor suave, similar al sol pasivo.' },
        { q: '¿Cuánto duran las sesiones?', a: '30 min boca arriba. Si vienes por piel, recomendamos también 30 boca abajo. Para sueño o recovery con 30 alcanza.' },
        { q: '¿Es compatible con tratamientos dermatológicos?', a: 'En general sí, pero si estás con isotretinoína, peelings o medicación fotosensibilizante, consulta antes.' },
      ],
    },
    cta: { title: '30 minutos de luz. Beneficios que duran semanas.', primary: 'Reservar Red Light por WhatsApp' },
  },

  botas: {
    slug: 'botas',
    intent: 'boots',
    hero: {
      eyebrow: 'Botas de Compresión',
      title: 'Recuperación de piernas <em>en 25 minutos</em>.',
      subtitle: 'Sistema neumático secuencial que recorre tus piernas de tobillo a cadera. Como un masaje linfático mecánico ideal para post-pádel, post-vuelo o piernas cansadas.',
      quickFacts: ['25 min', 'Pierna completa', 'Neumático secuencial', 'Incluido en IV'],
    },
    benefits: {
      eyebrow: 'Qué te alivia',
      title: 'Tres efectos casi inmediatos.',
      items: [
        { title: 'Recuperación muscular', description: 'Acelera retorno venoso, baja inflamación, reduce dolor agudo en cuádriceps, gemelos, glúteos.' },
        { title: 'Movilización linfática', description: 'Útil para retención de líquidos, sensación de piernas pesadas, después de muchas horas sentado o de vuelo.' },
        { title: 'Relajación profunda', description: 'La presión rítmica es meditativa. Muchos se quedan dormidos en la sesión.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos cómodos.',
      steps: [
        { title: 'Te recuestas', description: 'Sillón reclinable. Te ponemos las botas hasta la cadera; quedan bien ajustadas pero sin oprimir.' },
        { title: 'Programa elegido', description: 'Seleccionamos intensidad y patrón (1 a 3). Tú dices si quieres más o menos presión.' },
        { title: '30 min después', description: 'Salen las botas, sientes piernas como nuevas. Sin downtime, sin recuperación.' },
      ],
    },
    whoFor: {
      eyebrow: 'Para quién',
      title: 'A quién le sirve más.',
      items: [
        'Jugadores de pádel después de torneo o noche larga.',
        'Runners después de carrera de 10K+.',
        'Quien acaba de bajar de vuelo largo (jet lag y piernas hinchadas).',
        'Trabajadores que pasan muchas horas de pie o sentados.',
        'Embarazadas con autorización del obstetra (programa suave).',
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas sobre botas de compresión.',
      items: [
        { q: '¿Las botas vienen incluidas en cualquier IV?', a: 'Sí. Si reservas un IV, los 30 min de botas están incluidos sin costo extra. Si solo quieres las botas (sin IV), también lo agendamos como servicio independiente.' },
        { q: '¿Aprieta mucho?', a: 'Tú decides el nivel. Va desde una presión suave (relajación) hasta más intensa (recovery deportivo). Le dices al técnico y ajustamos.' },
        { q: '¿Puede causar moretones?', a: 'No con uso normal. Si tienes piel muy sensible o problemas vasculares, te ajustamos al programa suave.' },
        { q: '¿Cuántas veces a la semana?', a: 'Diario si lo necesitas. No tiene contraindicación de frecuencia para la mayoría.' },
      ],
    },
    cta: { title: 'Piernas pesadas, salida ligera. 30 minutos.', primary: 'Reservar botas de compresión por WhatsApp' },
  },

  fisio: {
    slug: 'fisio',
    intent: 'fisio',
    hero: {
      eyebrow: 'Fisioterapia',
      title: 'Diagnóstico y tratamiento <em>con cédula</em>.',
      subtitle: 'Si tienes lesión o dolor recurrente, lo primero es entender qué pasa. Nuestro fisioterapeuta titulado evalúa, diagnostica y diseña tu plan de tratamiento.',
      quickFacts: ['Consulta 30 min · $500', 'Sesión 60 min · $1,000', 'Cédula profesional', 'Plan personalizado'],
    },
    benefits: {
      eyebrow: 'En qué te ayuda fisio',
      title: 'Cuándo tiene sentido venir.',
      items: [
        { title: 'Lesión deportiva reciente', description: 'Te lastimaste jugando pádel, corriendo o levantando peso. Antes de seguir entrenando, evaluación.' },
        { title: 'Dolor crónico sin diagnóstico', description: 'Llevas semanas o meses con molestia. Es momento de saber qué es y qué hacer.' },
        { title: 'Post-cirugía u operación', description: 'Rehabilitación con plan profesional. Trabajo con tu cirujano y ortopedista.' },
        { title: 'Movilidad y postura', description: 'Si tu trabajo de oficina te está pasando factura, fisio diseña un plan correctivo.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos según tu caso.',
      steps: [
        { title: 'Consulta inicial', description: '30 min con el fisioterapeuta. Evaluación, diagnóstico funcional, plan recomendado.' },
        { title: 'Sesiones de tratamiento', description: '60 min cada una. Técnicas manuales, terapia física, ejercicios guiados. Frecuencia según diagnóstico.' },
        { title: 'Alta y mantenimiento', description: 'Cuando el problema está resuelto, te damos rutina para sostener en casa. Regresas si reaparece.' },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas sobre fisioterapia.',
      items: [
        { q: '¿Necesito traer estudios médicos?', a: 'Si tienes resonancia, rayos X o reporte de ortopedista, tráelos. Si no, el fisio decide en consulta si necesitamos pedirlos antes de tratar.' },
        { q: '¿Cuántas sesiones voy a necesitar?', a: 'Depende del caso. Lesiones leves: 3 a 5 sesiones. Crónicas o post-cirugía: 8 a 15. Te damos plan claro en la consulta inicial.' },
        { q: '¿Atienden niños?', a: 'Sí, en consulta familiar. Si es ortopédico pediátrico, coordinamos con tu pediatra.' },
        { q: '¿Me dan comprobante para reembolso?', a: 'Sí, comprobante fiscal o de gasto deducible disponible. Útil si tu seguro reembolsa.' },
      ],
    },
    cta: { title: 'Tu dolor merece un diagnóstico, no más adivinanza.', primary: 'Reservar fisio por WhatsApp' },
  },

  stem: {
    slug: 'stem',
    intent: 'stem',
    hero: {
      eyebrow: 'Stem Cells',
      title: 'Medicina regenerativa. <em>Conversación primero</em>.',
      subtitle: 'Stem cells no es algo que se aplique en visita uno. Es un protocolo médico que arranca con consulta diagnóstica de 30 min para entender si es indicado para ti, qué objetivos buscas y qué evaluación necesitamos.',
      quickFacts: ['Consulta 30 min', 'Médico especialista', 'Diagnóstico previo', 'Plan personalizado'],
    },
    benefits: {
      eyebrow: 'Para qué se considera',
      title: 'Áreas donde stem cells está en evaluación.',
      items: [
        { title: 'Articulaciones y cartílago', description: 'Lesión articular o desgaste donde la fisio sola no logra recuperación funcional.' },
        { title: 'Anti-aging celular', description: 'Como complemento de protocolos de longevidad junto a NAD+, micronutrientes y hábitos.' },
        { title: 'Recuperación post-lesión', description: 'En casos donde la regeneración natural está limitada o el paciente quiere acelerar.' },
        { title: 'Estética avanzada', description: 'Aplicaciones específicas en piel, cabello, áreas de regeneración localizada.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos. Sin atajos.',
      steps: [
        { title: 'Consulta inicial', description: 'Conversamos contigo, revisamos historial, definimos si la indicación tiene sentido. 30 min con médico especialista.' },
        { title: 'Estudios si aplica', description: 'Según tu caso, pedimos laboratorios o imágenes. No empezamos protocolo sin línea base clara.' },
        { title: 'Plan y aplicación', description: 'Te explicamos protocolo, costos y tiempos antes de avanzar. Aplicación bajo médico especialista en sesión dedicada.' },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Dudas sobre Stem Cells.',
      items: [
        { q: '¿Cuánto cuesta?', a: 'El protocolo y costos del tratamiento se definen DESPUÉS de la evaluación médica, porque dependen 100% del caso. Sin diagnóstico no damos precio, sería irresponsable. Mándanos un WhatsApp para agendar la consulta inicial.' },
        { q: '¿Es seguro?', a: 'Cuando está bien indicado y aplicado por especialista, sí. Por eso no atajamos el proceso: la indicación incorrecta es lo que vuelve a un protocolo riesgoso.' },
        { q: '¿En cuánto tiempo veo resultados?', a: 'Variable según indicación. Articular y regenerativo: semanas a meses. Estético: variable. El médico te da expectativa realista en consulta.' },
        { q: '¿Lo cubre seguro?', a: 'En México la mayoría de seguros aún no cubren stem cells. Te damos comprobante fiscal por si tu cobertura lo permite.' },
      ],
    },
    cta: { title: 'Empieza con la consulta. Después decidimos juntos.', primary: 'Agendar consulta Stem Cells' },
  },
}

/* ============================================================================
   EN — English (en-US) content
   ============================================================================ */
export const SERVICE_DETAILS_EN: Record<string, ServiceDetailContent> = {
  masajes: {
    slug: 'masajes',
    intent: 'massage-generic',
    hero: {
      eyebrow: 'Massage Therapy',
      title: 'Five massages to <em>unlock</em> your body.',
      subtitle: 'Relaxing, therapeutic, deep-tissue, foot reflexology, and lymphatic drainage. Each one with its own technique, duration, and price. Performed by licensed therapists with specialized training.',
      quickFacts: ['45 to 75 min', 'From $650 MXN', 'Licensed therapists', 'Private room'],
    },
    benefits: {
      eyebrow: 'What it unlocks',
      title: 'Not every pain is the same.',
      items: [
        { title: 'Accumulated tension', description: 'Traps, neck, lower back. The kind that builds up from hours at the desk or carrying stress.' },
        { title: 'Deep knots', description: 'Muscular knots that have been there for days or weeks. Deep-tissue breaks them up without tearing.' },
        { title: 'Post-training recovery', description: 'For pickleball, padel, CrossFit, running. Therapeutic massage speeds up the repair phase.' },
        { title: 'Fluid retention', description: 'Lymphatic drainage moves stagnant fluid out of legs and abdomen.' },
        { title: 'Tired feet', description: 'Reflexology works specific zones of the foot tied to organs and body systems.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Four steps every session.',
      steps: [
        { title: 'Initial intake', description: 'We ask what hurts, what you want to work on, what pressure you prefer. If you have an injury we factor it in.' },
        { title: 'Room ready', description: 'Professional table, oil or cream by technique, low music, warm light. Room set to your temperature.' },
        { title: 'Specific technique', description: 'We do not improvise. Each massage follows a protocol: zones, pressure, timing.' },
        { title: 'Post hydration', description: 'We give you water and let you know if a follow-up IV makes sense (depends on the case).' },
      ],
    },
    whoFor: {
      eyebrow: 'Who is it for',
      title: 'Who gets the most from these massages.',
      items: [
        'People training weights or impact sports who need deep recovery.',
        'Desk workers with chronic neck and back tension.',
        'People with mild stable injuries (no new medical diagnosis pending).',
        'Anyone looking to de-stress with lighter pressure (relaxing).',
        'Post aesthetic surgery or procedures (lymphatic drainage).',
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'What clients ask us most about massage.',
      items: [
        { q: 'Which massage is right for me?', a: 'Want to de-stress: relaxing. Specific pain: therapeutic. Chronic knot: deep-tissue. Fluid retention: lymphatic drainage. Not sure? WhatsApp us and we help you pick.' },
        { q: 'Do I get to choose the pressure?', a: 'Yes, within the protocol of each technique. Deep-tissue is always firmer; relaxing is always softer. Inside each one you can request more or less.' },
        { q: 'When should I NOT book a massage?', a: 'Fever, active infection, open wound in the area, first-trimester pregnancy without medical clearance, recent post-surgery without sign-off. When in doubt, call us first.' },
        { q: 'Can I combine massage with IV the same day?', a: 'Yes, many clients pair them. IV before or after depends on your goal. We sequence the slots so you do not wait.' },
      ],
    },
    cta: { title: 'Your body will thank you for 60 minutes of massage.', primary: 'Book massage on WhatsApp' },
  },

  sauna: {
    slug: 'sauna',
    intent: 'sauna',
    hero: {
      eyebrow: 'Infrared Sauna',
      title: 'Heat that enters the body, <em>not the room</em>.',
      subtitle: 'Cedar, far-infrared, 30 minutes of deep sweat. The difference from a traditional sauna: air temperature stays bearable while the heat penetrates directly into your tissues.',
      quickFacts: ['30 min', '45 to 55°C', 'Real cedar', 'Music of your choice'],
    },
    benefits: {
      eyebrow: 'What it gives you',
      title: 'Four reasons to sweat properly.',
      items: [
        { title: 'Deep detox', description: 'Infrared sweat has a different composition: it carries out heavy metals and fat-soluble compounds.' },
        { title: 'Cardiovascular recovery', description: 'Your heart works like in light cardio. Improves endurance without joint impact.' },
        { title: 'Better sleep', description: 'The post-session thermal drop activates drowsiness. Helpful if you struggle to wind down.' },
        { title: 'Skin and circulation', description: 'Skin microcirculation increases. You notice a glow over the next 2 to 3 hours.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps. None of them complicated.',
      steps: [
        { title: 'Arrive, hydrate', description: 'We give you mineral water before you go in. If you arrive dehydrated we do not recommend sauna.' },
        { title: '30-minute session', description: 'Music if you want, darkness if you prefer. If you feel dizzy or off, you step out. The button is always within reach.' },
        { title: 'Post recovery', description: 'You step out, hydrate more, we hand you a fresh towel. Pair with the ice plunge for a stronger thermal contrast.' },
      ],
    },
    whoFor: {
      eyebrow: 'Who is it for',
      title: 'Who gets the most out of the sauna.',
      items: [
        'Endurance athletes looking for cardiovascular adaptation without adding impact.',
        'People with irregular sleep: 2 to 3 sessions a week help regulate.',
        'Anyone who wants to pair IV plus Sauna and feel the double effect in one visit.',
        'Recovery from mild colds (carefully, never with active fever).',
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Common questions about the infrared sauna.',
      items: [
        { q: 'Is it the same sauna as the gym?', a: 'No. Traditional saunas heat the AIR to 80 to 100°C. Infrared heats your BODY directly, with air at 45 to 55°C. Penetrates deeper, you can stay longer, you sweat more.' },
        { q: 'How long does the effect last?', a: 'Skin glow: 2 to 3 hours. Sleep improvement: same night. Cardiovascular gains: cumulative with regular sessions (2 to 3 a week minimum 4 weeks).' },
        { q: 'Can I use it while pregnant?', a: 'Not during the first trimester. After that depends on your OB-GYN; bring written authorization before your visit.' },
        { q: 'What if I feel dizzy?', a: 'You step out immediately. We hand you electrolyte water and have you lie down. Usually prior dehydration, we assess.' },
      ],
    },
    cta: { title: '30 minutes of deep sweat are waiting for you.', primary: 'Book sauna on WhatsApp' },
  },

  cryo: {
    slug: 'cryo',
    intent: 'cryo',
    hero: {
      eyebrow: 'Cryotherapy',
      title: 'Three minutes at -110°C. <em>That is it</em>.',
      subtitle: 'Full-body chamber with nitrogen gas. The extreme cold triggers a systemic response: inflammation drops, endorphins spike, you walk out electrified.',
      quickFacts: ['3 minutes', '-110°C', 'Full body', 'No water'],
    },
    benefits: {
      eyebrow: 'What extreme cold triggers',
      title: 'Four immediate effects.',
      items: [
        { title: 'Systemic anti-inflammatory', description: 'Muscle and joint inflammation drops in hours, not days. Useful after a tournament or hard session.' },
        { title: 'Endorphins and mental clarity', description: 'The noradrenergic response leaves you with energy and focus for the next 3 to 5 hours.' },
        { title: 'Athletic recovery', description: 'Lets you chain training sessions. Elite athletes use it post-game to shorten the cycle.' },
        { title: 'Modest calorie burn', description: 'Your body spends energy reactivating temperature. Not a miracle diet but it adds up.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Four steps. Five minutes total.',
      steps: [
        { title: 'Change clothes', description: 'We give you technical underwear, gloves, socks, and thermal boots.' },
        { title: 'Enter the chamber', description: 'Your head stays out of the chamber. Only the body is exposed to the cold. You can talk to whoever is outside the whole time.' },
        { title: 'Three minutes', description: 'The operator controls temperature from outside. You decide if you want to stop early; you walk out the door anytime.' },
        { title: 'Gradual warm-up', description: 'You exit, remove the gear, return to body temperature in 1 to 2 min with light exercise.' },
      ],
    },
    whoFor: {
      eyebrow: 'Who is it for',
      title: 'Who benefits most.',
      items: [
        'Impact athletes: padel, MMA, CrossFit, soccer, hockey, rugby.',
        'People with chronic inflammation (arthritis, fibromyalgia with medical clearance).',
        'Anyone seeking 24/7 recovery without further strain.',
        'Anyone who wants the energizing effect without coffee (post-cryo noradrenaline is real).',
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Common questions about cryotherapy.',
      items: [
        { q: 'Is it dangerous?', a: 'Not for healthy adults. Contraindicated if you have uncontrolled cardiovascular issues, severe hypertension, or Raynaud. We screen you before entry.' },
        { q: 'Is three minutes enough?', a: 'Yes. At -110°C the body triggers the full hormonal response in 90 seconds. Beyond 3 min you add no benefit and increase risk.' },
        { q: 'How many sessions do you recommend?', a: 'Maintenance: 1 to 2 a week. Acute recovery (post tournament): the next morning. Fibromyalgia or chronic inflammation: your doctor designs the protocol.' },
        { q: 'What if I am claustrophobic?', a: 'Your head is always outside the chamber and the door opens from inside. If you feel uncomfortable, you are out in seconds.' },
      ],
    },
    cta: { title: 'Three minutes at -110°C change your entire morning.', primary: 'Book cryotherapy on WhatsApp' },
  },

  ice: {
    slug: 'ice',
    intent: 'ice',
    hero: {
      eyebrow: 'Ice Plunge',
      title: 'Guided immersion. <em>Your mind and your muscles</em>.',
      subtitle: 'Tub at 5°C, 10 to 15 minutes, with guided breathing. It is not just physical recovery. The ice plunge is mental resistance training under acute stress.',
      quickFacts: ['10 to 15 min', '5°C', 'Body and mind', 'Guided breathing'],
    },
    benefits: {
      eyebrow: 'What you train in the tub',
      title: 'Three benefits beyond muscle.',
      items: [
        { title: 'Muscle recovery', description: 'Vasoconstriction plus later recirculation reduces soreness and accelerates repair.' },
        { title: 'Mental resistance', description: 'Learning to breathe under acute stress translates to pressure at work, in sport, and in life.' },
        { title: 'Dopamine and noradrenaline', description: 'Sustained cold raises neurotransmitters that give you stable energy over the following hours.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Four guided steps.',
      steps: [
        { title: 'Basic attire', description: 'Swimwear. We give you a thermal towel for after.' },
        { title: 'Pre-breathing', description: 'Before you enter we guide you 60 seconds to activate the parasympathetic system.' },
        { title: 'Immersion', description: 'You enter slowly. The first 30 seconds are the hardest. You breathe deep and long. By 90s your body has adapted.' },
        { title: 'Exit and warm-up', description: 'You exit gradually, dry off, we give you something warm to drink. Natural warming in 5 min.' },
      ],
    },
    whoFor: {
      eyebrow: 'Who is it for',
      title: 'Who benefits most.',
      items: [
        'People who train hard and need recovery close to training.',
        'People who want to improve their tolerance to acute stress.',
        'Anyone seeking energy without stimulants (post-ice noradrenaline is real).',
        'Combo: post-sauna to ice plunge gives the strongest thermal contrast effect.',
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Common questions about the ice plunge.',
      items: [
        { q: 'How long do I stay in?', a: '10 to 15 min is ideal. If it is your first time we start at 5 and build up. We tailor it with you.' },
        { q: 'Is it dangerous if I have never done it?', a: 'Not for healthy adults. We guide your breathing and stay with you the entire time. Contraindicated if you have Raynaud, uncontrolled heart issues, or severe hypertension.' },
        { q: 'Why guided breathing?', a: 'The first minute is shock. If you hyperventilate, you suffer. If you breathe consciously, you adapt in 60 seconds and start feeling the positive effect.' },
        { q: 'How often a week?', a: '2 to 3 times is enough for recurring benefits. Elite athletes sometimes do it daily; not necessary for most.' },
      ],
    },
    cta: { title: 'Step in the water. Step out with a clear head.', primary: 'Book ice plunge on WhatsApp' },
  },

  'red-light': {
    slug: 'red-light',
    intent: 'red-light',
    hero: {
      eyebrow: 'Red Light Bed',
      title: 'Light that <em>repairs</em> at the cellular level.',
      subtitle: 'Full-body photobiomodulation bed with specific wavelengths (660nm + 850nm). 20 minutes with zero effort, effects on skin, sleep, and cellular recovery.',
      quickFacts: ['20 min', '660 + 850 nm', 'Full body', 'Zero effort'],
    },
    benefits: {
      eyebrow: 'What red light does',
      title: 'Four research-backed benefits.',
      items: [
        { title: 'Skin', description: 'Collagen production increases. Useful for texture, fine lines, mild discoloration, acne in remission.' },
        { title: 'Sleep', description: 'Modulates melatonin and circadian rhythm. Afternoon sessions improve sleep quality the same night.' },
        { title: 'Muscle recovery', description: 'Reduces post-training inflammation. Useful paired with IV or sauna.' },
        { title: 'Mitochondria', description: '660+850nm wavelengths are studied for improving ATP production at the cellular level.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps. Zero effort.',
      steps: [
        { title: 'Minimal clothing', description: 'Underwear or nude inside the bed (total privacy). We give you eye protection.' },
        { title: 'Lie down', description: '30 minutes face-up, then if you want 30 face-down. Music if you prefer, silence if you want to meditate.' },
        { title: 'You are done', description: 'No downtime. No post-procedure care. You leave and continue your day.' },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Red Light questions.',
      items: [
        { q: 'When do the effects show?', a: 'Skin: 4 to 6 weeks with regular sessions 2-3/week. Sleep: same night. Muscle recovery: the next post-training session.' },
        { q: 'Does it burn?', a: 'No. Red light is non-ionizing, it does not heat significantly. You feel a soft warmth, similar to passive sun.' },
        { q: 'How long are the sessions?', a: '30 min face-up. If you come for skin, we also recommend 30 face-down. For sleep or recovery 30 is enough.' },
        { q: 'Is it compatible with dermatology treatments?', a: 'Generally yes, but if you are on isotretinoin, peels, or photosensitizing medication, check first.' },
      ],
    },
    cta: { title: '30 minutes of light. Benefits that last weeks.', primary: 'Book Red Light on WhatsApp' },
  },

  botas: {
    slug: 'botas',
    intent: 'boots',
    hero: {
      eyebrow: 'Compression Boots',
      title: 'Leg recovery <em>in 25 minutes</em>.',
      subtitle: 'Sequential pneumatic system that travels your legs from ankle to hip. Like a mechanical lymphatic massage, ideal post-padel, post-flight, or for tired legs.',
      quickFacts: ['25 min', 'Full leg', 'Sequential pneumatic', 'Included with IV'],
    },
    benefits: {
      eyebrow: 'What it relieves',
      title: 'Three near-immediate effects.',
      items: [
        { title: 'Muscle recovery', description: 'Speeds venous return, drops inflammation, reduces acute pain in quads, calves, glutes.' },
        { title: 'Lymphatic mobilization', description: 'Useful for fluid retention, heavy-leg feeling, after long hours seated or on a flight.' },
        { title: 'Deep relaxation', description: 'Rhythmic pressure is meditative. Many clients fall asleep during the session.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three comfortable steps.',
      steps: [
        { title: 'Lie back', description: 'Recliner chair. We fit the boots up to the hip; snug but not tight.' },
        { title: 'Choose program', description: 'We select intensity and pattern (1 to 3). You say if you want more or less pressure.' },
        { title: '30 min later', description: 'Boots come off, your legs feel new. No downtime, no recovery.' },
      ],
    },
    whoFor: {
      eyebrow: 'Who is it for',
      title: 'Who benefits most.',
      items: [
        'Padel players after a tournament or long night.',
        'Runners after a 10K or longer race.',
        'Anyone who just got off a long flight (jet lag and swollen legs).',
        'Workers who spend many hours standing or seated.',
        'Pregnant women with OB-GYN clearance (soft program).',
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Compression boots questions.',
      items: [
        { q: 'Are the boots included with any IV?', a: 'Yes. If you book an IV, the 30 min of boots are included at no extra cost. If you only want the boots (no IV), we book it as a standalone service.' },
        { q: 'Does it squeeze hard?', a: 'You choose the level. From soft pressure (relaxation) to more intense (sports recovery). Tell the tech and we adjust.' },
        { q: 'Can it cause bruising?', a: 'Not with normal use. If you have very sensitive skin or vascular issues, we move you to the soft program.' },
        { q: 'How often a week?', a: 'Daily if you need it. No frequency contraindication for most people.' },
      ],
    },
    cta: { title: 'Heavy legs in, light legs out. 30 minutes.', primary: 'Book compression boots on WhatsApp' },
  },

  fisio: {
    slug: 'fisio',
    intent: 'fisio',
    hero: {
      eyebrow: 'Physical Therapy',
      title: 'Diagnosis and treatment <em>with licensed therapist</em>.',
      subtitle: 'If you have an injury or recurring pain, step one is understanding what is happening. Our licensed physical therapist evaluates, diagnoses, and designs your treatment plan.',
      quickFacts: ['Consultation 30 min · $500 MXN', 'Session 60 min · $1,000 MXN', 'Licensed therapist', 'Personalized plan'],
    },
    benefits: {
      eyebrow: 'How PT helps',
      title: 'When it makes sense to come in.',
      items: [
        { title: 'Recent sports injury', description: 'You hurt yourself playing padel, running, or lifting. Before you train again, you need an evaluation.' },
        { title: 'Chronic pain without diagnosis', description: 'You have had discomfort for weeks or months. Time to find out what it is and what to do.' },
        { title: 'Post-surgery rehab', description: 'Recovery with a professional plan. We work with your surgeon or orthopedist.' },
        { title: 'Mobility and posture', description: 'If office work is catching up to you, PT designs a corrective plan.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps tailored to your case.',
      steps: [
        { title: 'Initial consultation', description: '30 min with the physical therapist. Evaluation, functional diagnosis, recommended plan.' },
        { title: 'Treatment sessions', description: '60 min each. Manual techniques, physical therapy, guided exercises. Frequency by diagnosis.' },
        { title: 'Discharge and maintenance', description: 'When the problem is resolved we give you a home routine to sustain. You return only if it reappears.' },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Physical therapy questions.',
      items: [
        { q: 'Do I need to bring medical studies?', a: 'If you have MRI, X-ray, or orthopedist report, bring them. Otherwise the PT decides in the consultation if we need them before treating.' },
        { q: 'How many sessions will I need?', a: 'Depends on the case. Mild injuries: 3 to 5 sessions. Chronic or post-surgery: 8 to 15. We give you a clear plan in the initial consultation.' },
        { q: 'Do you treat children?', a: 'Yes, in family consultation. If it is pediatric orthopedic, we coordinate with your pediatrician.' },
        { q: 'Do you give receipts for reimbursement?', a: 'Yes, tax receipt or deductible expense receipt available. Useful if your insurance reimburses.' },
      ],
    },
    cta: { title: 'Your pain deserves a diagnosis, not more guesswork.', primary: 'Book PT on WhatsApp' },
  },

  stem: {
    slug: 'stem',
    intent: 'stem',
    hero: {
      eyebrow: 'Stem Cells',
      title: 'Regenerative medicine. <em>Conversation first</em>.',
      subtitle: 'Stem cells is not something applied on the first visit. It is a medical protocol that starts with a 30-minute diagnostic consultation to understand if it is indicated for you, what goals you are pursuing, and what evaluation we need.',
      quickFacts: ['30 min consultation', 'Medical specialist', 'Diagnosis first', 'Personalized plan'],
    },
    benefits: {
      eyebrow: 'What it is considered for',
      title: 'Areas where stem cells is under evaluation.',
      items: [
        { title: 'Joints and cartilage', description: 'Joint injury or wear where PT alone is not achieving functional recovery.' },
        { title: 'Cellular anti-aging', description: 'As a complement to longevity protocols alongside NAD+, micronutrients, and lifestyle.' },
        { title: 'Post-injury recovery', description: 'In cases where natural regeneration is limited or the patient wants to accelerate.' },
        { title: 'Advanced aesthetics', description: 'Specific applications in skin, hair, localized regeneration areas.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps. No shortcuts.',
      steps: [
        { title: 'Initial consultation', description: 'We talk with you, review your history, define if the indication makes sense. 30 min with a medical specialist.' },
        { title: 'Studies if applicable', description: 'Depending on your case we request labs or imaging. We do not start a protocol without a clear baseline.' },
        { title: 'Plan and application', description: 'We explain protocol, costs, and timing before moving forward. Application under medical specialist in a dedicated session.' },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Stem cells questions.',
      items: [
        { q: 'How much does it cost?', a: 'Treatment protocol and costs are defined AFTER medical evaluation, because they depend 100% on the case. Without a diagnosis we do not quote a price, it would be irresponsible. WhatsApp us to schedule the initial consultation.' },
        { q: 'Is it safe?', a: 'When properly indicated and applied by a specialist, yes. That is why we do not shortcut the process: incorrect indication is what turns a protocol risky.' },
        { q: 'How long until I see results?', a: 'Variable by indication. Joint and regenerative: weeks to months. Aesthetic: variable. The doctor gives you realistic expectations at the consultation.' },
        { q: 'Does insurance cover it?', a: 'In Mexico most insurers do not yet cover stem cells. We provide tax receipts in case your coverage allows.' },
      ],
    },
    cta: { title: 'Start with the consultation. Then we decide together.', primary: 'Book Stem Cells consultation' },
  },
}

/**
 * Convenience accessor used by ServiceDetailLayout. Falls back to ES if the
 * locale is unknown, and to a different slug spelling for backwards-compat
 * (some EN routes use the same Spanish slugs as the original catalog).
 */
export function getServiceDetail(slug: string, locale: 'es' | 'en'): ServiceDetailContent | undefined {
  const bank = locale === 'en' ? SERVICE_DETAILS_EN : SERVICE_DETAILS_ES
  return bank[slug] ?? SERVICE_DETAILS_ES[slug]
}

/**
 * Legacy export kept so existing .astro pages do not break.
 * Pages that need locale-aware content should call getServiceDetail() instead.
 * @deprecated use getServiceDetail(slug, locale)
 */
export const SERVICE_DETAILS = SERVICE_DETAILS_ES
