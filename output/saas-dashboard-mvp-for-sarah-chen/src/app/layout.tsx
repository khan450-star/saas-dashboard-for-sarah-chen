import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Dashboard MVP',
  description: 'Modern SaaS dashboard with authentication and billing',
  openGraph: {
    title: 'SaaS Dashboard MVP',
    description: 'Modern SaaS dashboard with authentication and billing',
    type: 'website',
    url: 'https://saas-dashboard-mvp.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}