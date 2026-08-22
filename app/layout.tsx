import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vellora | Landing Pages e Experiências Digitais Profissionais',
  description: 'A Vellora cria landing pages, sites e experiências digitais profissionais para empresas, empreendedores e negócios que querem transformar sua presença online.',
  generator: 'Vellora',
  openGraph: {
    title: 'Vellora | Experiências digitais profissionais',
    description: 'Transformamos negócios locais em experiências digitais profissionais.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/vellora-logo.png', width: 1200, height: 630, alt: 'Vellora' }],
  },
  icons: { icon: '/vellora-logo.png', apple: '/vellora-logo.png' },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#121212', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-background"><body className="antialiased">{children}</body></html>
}
