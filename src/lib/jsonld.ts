/**
 * Schema.org JSON-LD generators for Recovery Point.
 *
 * BaseLayout emits a base MedicalClinic + LocalBusiness block on every page.
 * For service-specific pages we additionally emit a `MedicalProcedure` /
 * `Service` block with price, provider, and area served — this is what
 * fills Google's rich-results panel for "iv therapy Mexicali", etc.
 *
 * The functions here return plain JS objects ready for JSON.stringify into
 * a <script type="application/ld+json">.
 */
import { ADDRESS } from './contact'
import type { ServiceEntry } from './services-catalog'

const SITE = 'https://recoverypoint.mx'

/**
 * Build a Schema.org MedicalProcedure block for one service.
 *
 * We use MedicalProcedure (not generic Service) because RP is a medical
 * clinic and Google differentiates results. For non-medical services
 * (sauna, ice plunge) we keep the same schema since they're delivered
 * inside a medical clinic context.
 */
export function buildServiceSchema(opts: {
  service: ServiceEntry
  serviceName: string
  description: string
  locale: 'es' | 'en'
  pageUrl: string
}) {
  const { service, serviceName, description, locale, pageUrl } = opts
  const price = service.priceMxn > 0 ? service.priceMxn : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: serviceName,
    description,
    url: pageUrl,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: locale === 'en' ? 'Whole body' : 'Cuerpo completo',
    // Provider — point back to the parent MedicalClinic on every service page
    // so Google associates this procedure with the same business entity.
    provider: {
      '@type': 'MedicalClinic',
      '@id': `${SITE}#clinic`,
      name: 'Recovery Point',
      url: SITE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${ADDRESS.street}, ${ADDRESS.colonia}`,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.zip,
        addressCountry: 'MX',
      },
      telephone: '+5216868437360',
    },
    areaServed: {
      '@type': 'City',
      name: 'Mexicali',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Baja California' },
    },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock',
            url: pageUrl,
          },
        }
      : {}),
  }
}

/**
 * FAQ block — used on service pages that ship a Q&A section.
 * Pass an array of `{ q, a }` objects.
 */
export function buildFaqSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/**
 * BreadcrumbList block — improves SERP appearance with
 * Home › Servicios › Masajes structure.
 */
export function buildBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}
