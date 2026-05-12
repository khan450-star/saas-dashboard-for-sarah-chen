import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SaaS Dashboard - Manage Your Business',
    template: '%s | SaaS Dashboard'
  },
  description: 'A modern SaaS dashboard to manage your business operations, analytics, and subscriptions.',
  keywords: ['SaaS', 'dashboard', 'business', 'analytics', 'subscriptions'],
  authors: [{ name: 'Sarah Chen' }],
  creator: 'Sarah Chen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saas-dashboard.example.com',
    title: 'SaaS Dashboard - Manage Your Business',
    description: 'A modern SaaS dashboard to manage your business operations, analytics, and subscriptions.',
    siteName: 'SaaS Dashboard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Dashboard - Manage Your Business',
    description: 'A modern SaaS dashboard to manage your business operations, analytics, and subscriptions.',
    creator: '@sarahdashboard',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}