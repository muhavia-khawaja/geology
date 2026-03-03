import { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    default: "Geology Stone | Unveiling Earth's Secrets",
    template: '%s | Geology Stone',
  },
  description:
    "Explore the fascinating world of geology with Geology Stone. Discover Earth's secrets through our comprehensive resources and educational content.",
  keywords:
    'geology, earth science, rocks, minerals, fossils, geology education, geology resources, geology articles, geology news',
  authors: [{ name: 'Khawaja Ameer Muhavia', url: 'https://geology-stone.vercel.app' }],
  creator: 'Khawaja Ameer Muhavia',
  publisher: 'Geology Stone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' data-theme='gravestone'>
      <head>
        <meta
          name='google-site-verification'
          content='ji8HizIVaYJpGWSEfi1EoRjK6A0Q0r1bw3tzvyXNkGA'
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
