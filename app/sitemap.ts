import type { MetadataRoute } from 'next'
import { getPortfolio } from '@/lib/content'
import { SITE_URL } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const d = await getPortfolio()
  const abs = (u: string) => (u.startsWith('http') ? u : `${SITE_URL}${u}`)
  const images = [d.profile.photo, ...d.webProjects.map((w) => w.image), ...d.caseStudies.map((c) => c.image)].filter(Boolean).map(abs)
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1, images },
    { url: `${SITE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.3 },
  ]
}
