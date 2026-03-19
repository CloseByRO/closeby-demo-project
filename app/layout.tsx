import type { Metadata } from 'next'
import './globals.css'
import clientConfig from '@/config/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBar } from '@/components/layout/mobile-bar'
import { CookieBanner } from '@/components/ui/cookie-banner'
import { SchemaLocalBusiness } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: {
    default: clientConfig.seo.metaTitle,
    template: `%s | ${clientConfig.shortName}`,
  },
  description: clientConfig.seo.metaDescription,
  keywords: clientConfig.seo.keywords,
  metadataBase: new URL(clientConfig.website),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: clientConfig.website,
    siteName: `Cabinet Psihoterapie ${clientConfig.shortName}`,
    title: clientConfig.seo.metaTitle,
    description: clientConfig.seo.metaDescription,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        {/* next/font is used in production — CSS fallback for local dev/build */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <SchemaLocalBusiness config={clientConfig} />
      </head>
      <body className="font-sans bg-cream text-ink antialiased">
        <Header config={clientConfig} />
        <main>{children}</main>
        <Footer config={clientConfig} />
        <MobileBar config={clientConfig} />
        <CookieBanner config={clientConfig} />
      </body>
    </html>
  )
}
