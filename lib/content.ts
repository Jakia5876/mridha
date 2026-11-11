import { portfolioData, type Portfolio } from './portfolio-data'
import { CONTENT_ID, SUPABASE_ANON_KEY, SUPABASE_URL } from './supabase'

/** Fill any missing fields from the defaults so a partial/old DB document never breaks the page. */
export function withDefaults(data: Partial<Portfolio> | null | undefined): Portfolio {
  const d = data || {}
  const site = Object.fromEntries(
    Object.entries(portfolioData.site).map(([k, v]) => [k, { ...v, ...((d.site as Record<string, object> | undefined)?.[k] || {}) }]),
  ) as Portfolio['site']
  // Live projects added in code (lib/portfolio-data.ts) also show when the DB list doesn't have them yet.
  const dbWeb = d.webProjects || []
  const norm = (u: string) => u.trim().replace(/\/+$/, '').toLowerCase()
  const dbUrls = new Set(dbWeb.map((w) => norm(w.url || '')))
  // Bundled screenshots (/projects/...) follow the code so refreshed images show up;
  // images uploaded from /admin (stored elsewhere) still win.
  const codeByUrl = new Map(portfolioData.webProjects.map((w) => [norm(w.url), w]))
  const withCodeImage = dbWeb.map((w) => {
    const code = codeByUrl.get(norm(w.url || ''))
    return code && (!w.image || w.image.startsWith('/projects/')) ? { ...w, image: code.image } : w
  })
  const webProjects = d.webProjects
    ? [...portfolioData.webProjects.filter((w) => !dbUrls.has(norm(w.url))), ...withCodeImage]
    : portfolioData.webProjects
  return {
    ...portfolioData,
    ...d,
    webProjects,
    site,
    profile: {
      ...portfolioData.profile,
      ...(d.profile || {}),
      socials: { ...portfolioData.profile.socials, ...(d.profile?.socials || {}) },
    },
  } as Portfolio
}

/**
 * সাইটের সব কন্টেন্ট এখান থেকে আসে।
 * Supabase থেকে পড়ে (/admin থেকে এডিট করা ডাটা); কোনো কারণে না পেলে
 * lib/portfolio-data.ts-এর ডাটা দেখায়, তাই সাইট কখনো খালি হবে না।
 */
export async function getPortfolio(): Promise<Portfolio> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.${CONTENT_ID}&select=data`, {
      headers: { apikey: SUPABASE_ANON_KEY },
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const rows = (await res.json()) as { data: Partial<Portfolio> }[]
    if (!rows[0]?.data) throw new Error('no content row')
    return withDefaults(rows[0].data)
  } catch (e) {
    console.warn('[content] using built-in data:', (e as Error).message)
    return portfolioData
  }
}
