import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Vellora | Landing Pages e Experiências Digitais', short_name: 'Vellora', description: 'Landing pages e experiências digitais profissionais para negócios.', start_url: '/', display: 'standalone', background_color: '#121212', theme_color: '#121212', icons: [{ src: '/vellora-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }] }
}
