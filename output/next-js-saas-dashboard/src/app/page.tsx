import Link from 'next/link'
import { ArrowRight, Check, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary-600"></div>
            <span className="text-xl font-bold text-gray-900">SaaSDash</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/auth/signin" className="btn btn-primary px-4 py-2">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            Build Your SaaS
            <span className="text-primary-600"> Dashboard</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            The modern dashboard solution for growing SaaS businesses. 
            Manage your users, track analytics, and scale with confidence.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/signin" className="btn btn-primary px-8 py-3 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="text-lg font-semibold text-gray-900">
              Watch Demo
            </button>
          </div>
          <div className="mt-10 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features designed to help your SaaS business grow.
          </p>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Analytics Dashboard',
              description: 'Real-time insights into your business metrics and user behavior.',
              icon: '📊'
            },
            {
              title: 'User Management',
              description: 'Manage users, subscriptions, and access controls with ease.',
              icon: '👥'
            },
            {
              title: 'Billing Integration',
              description: 'Seamless Stripe integration for subscription management.',
              icon: '💳'
            },
            {
              title: 'Team Collaboration',
              description: 'Work together with your team in one unified platform.',
              icon: '🤝'
            },
            {
              title: 'API Access',
              description: 'Powerful APIs to integrate with your existing tools.',
              icon: '🔌'
            },
            {
              title: '24/7 Support',
              description: 'Get help when you need it with our dedicated support team.',
              icon: '🎯'
            }
          ].map((feature, index) => (
            <div key={index} className="rounded-lg bg-white p-8 shadow-sm">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="mt-6 text-xl font-medium text-gray-900">
            "This dashboard completely transformed how we manage our SaaS business. 
            The analytics are incredible and the billing integration is seamless."
          </blockquote>
          <p className="mt-4 text-gray-600">
            Sarah Johnson, CEO at TechStart
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="rounded-2xl bg-primary-600 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            Join thousands of businesses already using our platform.
          </p>
          <div className="mt-8">
            <Link href="/auth/signin" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12">
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>&copy; 2024 SaaSDash. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}