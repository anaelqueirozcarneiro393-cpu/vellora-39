import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vellora | Landing Pages e Experiências Digitais Profissionais',
  description: 'A Vellora cria landing pages, sites e experiências digitais profissionais para empresas, empreendedores e negócios que querem transformar sua presença online.',
  generator: 'Vellora',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO.com'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Vellora | Landing Pages e Experiências Digitais',
    description: 'A Vellora cria landing pages, sites e experiências digitais profissionais para empresas, empreendedores e negócios que querem transformar sua presença online.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Vellora',
    images: [{ url: '/og-vellora.png', width: 1254, height: 1254, alt: 'Vellora — Landing Pages e Experiências Digitais' }],
  },
  twitter: { card: 'summary_large_image', title: 'Vellora | Landing Pages e Experiências Digitais', description: 'Landing pages e experiências digitais profissionais para negócios.', images: ['/og-vellora.png'] },
  icons: { icon: [{ url: '/favicon.png', sizes: '1254x1254', type: 'image/png' }, { url: '/favicon.ico', sizes: 'any' }, { url: '/icon.svg', type: 'image/svg+xml' }], apple: [{ url: '/apple-touch-icon.png', sizes: '1254x1254', type: 'image/png' }] },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#121212', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-background"><body className="antialiased">{children}</body></html>
}
