import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getPortfolio } from '@/lib/content'
import { SITE_URL, structuredData } from '@/lib/seo'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-jb', display: 'swap', preload: false })

/** SEO text comes from /admin → SEO (falls back to lib/portfolio-data.ts). */
export async function generateMetadata(): Promise<Metadata> {
  const { site, profile } = await getPortfolio()
  const { title, description, keywords } = site.seo
  // share image: app/opengraph-image.tsx (uses the /admin → SEO image when one is uploaded)
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    keywords,
    applicationName: profile.fullName,
    authors: [{ name: profile.fullName, url: SITE_URL }],
    creator: profile.fullName,
    publisher: profile.fullName,
    category: 'technology',
    alternates: { canonical: '/' },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'profile',
      locale: 'en_US',
      url: SITE_URL,
      siteName: profile.fullName,
      title,
      description,
      firstName: profile.fullName.split(' ')[0],
      lastName: profile.fullName.split(' ').slice(1).join(' '),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: profile.socials.X ? `@${profile.socials.X.split('/').filter(Boolean).pop()}` : undefined,
    },
    formatDetection: { telephone: false },
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
  const data = await getPortfolio()
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="" />
        <script
          type="application/ld+json"
          // `<` is escaped so text from /admin can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(data)).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
