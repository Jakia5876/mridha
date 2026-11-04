import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

const siteUrl = 'https://www.abdulalimmridha.top'
const siteTitle = 'Abdul Alim Mridha - AI Automation, GoHighLevel CRM & Vibe Coding Specialist'
const siteDescription =
  'Abdul Alim Mridha builds n8n workflow automation, GoHighLevel CRM systems, AI chatbots, and modern vibe-coded websites that save businesses time and grow revenue.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteTitle} | Portfolio`,
  description: siteDescription,
  keywords: [
    'n8n automation',
    'GoHighLevel',
    'GoHighLevel CRM',
    'GoHighLevel automation',
    'GHL expert',
    'vibe coding',
    'AI automation',
    'workflow automation',
    'AI chatbot',
    'email automation',
    'SMS automation',
    'Next.js website',
  ],
  authors: [{ name: 'Abdul Alim Mridha', url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Abdul Alim Mridha',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/alim.png',
        width: 1200,
        height: 630,
        alt: 'Abdul Alim Mridha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abdul Alim Mridha',
              url: siteUrl,
              image: `${siteUrl}/alim.png`,
              jobTitle: 'AI Automation, GoHighLevel CRM & Vibe Coding Specialist',
              description: siteDescription,
              email: 'mailto:alim01716779220@gmail.com',
              knowsAbout: ['n8n', 'GoHighLevel', 'CRM Automation', 'Vibe Coding', 'AI Agents', 'Next.js', 'Workflow Automation'],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.className} antialiased text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
