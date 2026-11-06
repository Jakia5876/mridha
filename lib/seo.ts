import type { Portfolio } from './portfolio-data'

export const SITE_URL = 'https://www.abdulalimmridha.top'

const abs = (u: string) => (!u ? undefined : u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`)
const plain = (s: string) => s.replace(/\*/g, '').replace(/\s*\n\s*/g, ' ').trim()

/**
 * schema.org graph for Google rich results and AI answer engines (AEO / GEO):
 * who the person is, what they offer, their work and common questions.
 */
export function structuredData(d: Portfolio) {
  const p = d.profile
  const sameAs = Object.values(p.socials || {}).filter((u) => u && u.startsWith('http'))
  const personId = `${SITE_URL}/#person`
  const serviceId = `${SITE_URL}/#service`
  const skills = Array.from(new Set([...(p.disciplines || []), ...(d.tools || []), ...(d.skills || []).flatMap((g) => g.items)]))
  const country = /bangladesh/i.test(p.location) ? 'BD' : undefined

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: p.fullName,
      url: SITE_URL,
      image: abs(p.photo),
      jobTitle: p.role,
      description: p.intro || d.site.seo.description,
      email: `mailto:${p.email}`,
      ...(country && { address: { '@type': 'PostalAddress', addressCountry: country }, nationality: { '@type': 'Country', name: 'Bangladesh' } }),
      knowsAbout: skills,
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: p.fullName,
      description: d.site.seo.description,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: d.site.seo.title,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': personId },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: `${p.fullName} — ${p.role}`,
      url: SITE_URL,
      image: abs(p.photo),
      description: d.site.seo.description,
      founder: { '@id': personId },
      email: p.email,
      areaServed: 'Worldwide',
      ...(country && { address: { '@type': 'PostalAddress', addressCountry: country } }),
      knowsAbout: skills,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: (d.services || []).map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.desc, provider: { '@id': personId } },
        })),
      },
    },
  ]

  const work = (d.webProjects || []).filter((w) => w.url)
  if (work.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#live-projects`,
      name: 'Live projects',
      itemListElement: work.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: w.title,
          url: w.url,
          description: w.desc,
          image: abs(w.image),
          genre: w.category,
          keywords: (w.tags || []).join(', '),
          creator: { '@id': personId },
        },
      })),
    })
  }

  const faqs = (d.faqs || []).filter((f) => f.q && f.a)
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** /llms.txt — a plain-language summary for AI assistants (https://llmstxt.org). */
export function llmsText(d: Portfolio) {
  const p = d.profile
  const socials = Object.entries(p.socials || {}).filter(([, u]) => u)
  const bookLinks = d.booking?.calUser ? (d.booking.events || []).filter((e) => e.slug) : []
  const lines = [
    `# ${p.fullName}`,
    '',
    `> ${p.role}. ${d.site.seo.description}`,
    '',
    plain(p.about || ''),
    '',
    `- Website: ${SITE_URL}`,
    `- Location: ${p.location}`,
    `- Email: ${p.email}`,
    ...socials.map(([k, u]) => `- ${k}: ${u}`),
    '',
    '## Services',
    ...(d.services || []).map((s) => `- **${s.title}**: ${s.desc}`),
    '',
    '## Skills & tools',
    ...(d.skills || []).map((g) => `- ${g.group}: ${g.items.join(', ')}`),
    '',
    '## Case studies',
    ...(d.caseStudies || []).map((c) => `- **${c.title}** (${c.type}): ${c.challenge} ${c.approach} Result: ${c.result}`),
    '',
    '## Live projects',
    ...(d.webProjects || []).map((w) => `- [${w.title}](${w.url}) — ${w.category}. ${w.desc}`),
    '',
    ...(bookLinks.length
      ? ['## Book a call (Google Meet or Zoom)', ...bookLinks.map((e) => `- [${e.title} — ${e.duration} min](https://cal.com/${d.booking.calUser}/${e.slug}): ${e.desc}`), '']
      : []),
    '## FAQ',
    ...(d.faqs || []).flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Contact',
    `Use the contact form or booking calendar at ${SITE_URL}/#contact, or email ${p.email}.`,
    '',
  ]
  return lines.join('\n')
}
