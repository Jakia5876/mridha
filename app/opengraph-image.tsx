import { ImageResponse } from 'next/og'
import { getPortfolio } from '@/lib/content'
import { SITE_URL } from '@/lib/seo'

export const alt = 'Abdul Alim Mridha — AI Automation, GoHighLevel CRM & Vibe Coding'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 3600

/** Share card for Facebook, LinkedIn, X, WhatsApp… (used when /admin → SEO has no custom image). */
export default async function OgImage() {
  const { profile: p, site } = await getPortfolio()
  const abs = (u: string) => (u.startsWith('http') ? u : `${SITE_URL}${u}`)
  const photo = abs(p.photo)

  // a share image uploaded in /admin → SEO is used as-is (cropped to 1200×630)
  const custom = site.seo.shareImage
  if (custom && custom !== p.photo) {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', background: '#050505' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={abs(custom)} alt="" width={1200} height={630} style={{ objectFit: 'cover' }} />
        </div>
      ),
      size,
    )
  }
  const tags = (p.disciplines || []).slice(0, 3)
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#050505', color: '#f2f2f2', padding: 64, fontFamily: 'sans-serif' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', background: 'radial-gradient(ellipse 60% 70% at 78% 40%, rgba(145,199,67,0.22), transparent 70%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, paddingRight: 40 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#8a8a8a', textTransform: 'uppercase' }}>Portfolio</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{p.fullName}</div>
            <div style={{ fontSize: 34, color: '#a6d65a', marginTop: 18 }}>{p.role}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 34 }}>
              {tags.map((t) => (
                <div key={t} style={{ display: 'flex', fontSize: 22, padding: '10px 22px', borderRadius: 999, background: 'linear-gradient(135deg, #e6f3ff, #8cc4ff)', color: '#0a2540', fontWeight: 700 }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#8a8a8a' }}>abdulalimmridha.top</div>
        </div>
        <div style={{ display: 'flex', width: 380, height: 502, borderRadius: 40, overflow: 'hidden', border: '6px solid #2b2a28', boxShadow: '0 0 80px rgba(145,199,67,0.35)', alignSelf: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={380} height={502} style={{ objectFit: 'cover', transform: 'scale(1.7) translateY(5%)' }} />
        </div>
      </div>
    ),
    size,
  )
}
