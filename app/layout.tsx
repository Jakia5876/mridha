import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abdul Alim Mridha - n8n Automation Specialist | Portfolio',
  description: 'Professional n8n automation specialist. Build intelligent workflows, AI-powered email systems, social media automation, and custom integrations without code.',
  keywords: ['n8n automation', 'workflow automation', 'email automation', 'AI integration', 'social media automation', 'no-code automation'],
  generator: 'v0.app',
  authors: [{ name: 'Abdul Alim Mridha' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulalim.dev',
    title: 'Abdul Alim Mridha - n8n Automation Specialist',
    description: 'Transform your business with intelligent n8n automation workflows',
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
    title: 'Abdul Alim Mridha - n8n Automation Specialist',
    description: 'Transform your business with intelligent n8n automation workflows',
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
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f1729' },
  ],
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abdul Alim Mridha',
              url: 'https://abdulalim.dev',
              image: 'https://abdulalim.dev/alim.png',
              jobTitle: 'n8n Automation Specialist',
              description: 'Professional n8n automation specialist building intelligent workflows and AI-powered solutions',
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
