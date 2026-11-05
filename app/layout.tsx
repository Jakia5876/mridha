import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getPortfolio } from '@/lib/content'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-jb', display: 'swap' })

const siteUrl = 'https://www.abdulalimmridha.top'
/** SEO text comes from /admin → SEO (falls back to lib/portfolio-data.ts). */
export async function generateMetadata(): Promise<Metadata> {
  const { site, profile } = await getPortfolio()
  const { title, description, keywords, shareImage } = site.seo
  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | Portfolio`,
    description,
    keywords,
    authors: [{ name: profile.fullName, url: siteUrl }],
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: profile.fullName,
      title,
      description,
      images: [{ url: shareImage || profile.photo, width: 1200, height: 630, alt: profile.fullName }],
    },
    twitter: { card: 'summary_large_image', title, description },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { site, profile: p } = await getPortfolio()
  const abs = (u: string) => (u.startsWith('http') ? u : `${siteUrl}${u}`)
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: p.fullName,
              url: siteUrl,
              image: abs(p.photo),
              jobTitle: p.role,
              description: site.seo.description,
              email: `mailto:${p.email}`,
              knowsAbout: ['n8n', 'GoHighLevel', 'CRM Automation', 'Vibe Coding', 'AI Agents', 'Next.js', 'Workflow Automation'],
            }),
          }}
        />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
