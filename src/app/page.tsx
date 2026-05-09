import Link from 'next/link'
import Button from '@/components/ui/Button'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Build Better Products
              </h1>
              <p className="mt-6 text-xl text-primary-100 max-w-2xl mx-auto">
                Transform your business with our powerful SaaS platform. Get insights, 
                manage your data, and scale effortlessly.
              </p>
              <div className="mt-10 flex justify-center gap-x-6">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Everything you need</h2>
              <p className="mt-4 text-xl text-gray-600">
                Powerful features to help you succeed
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                <p className="mt-2 text-gray-600">
                  Get detailed insights into your business performance with real-time analytics.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900">Secure & Reliable</h3>
                <p className="mt-2 text-gray-600">
                  Enterprise-grade security with 99.9% uptime guaranteed.
                </p>
              </div>
              
              <div className="text-4xl mb-4 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900">Lightning Fast</h3>
                <p className="mt-2 text-gray-600">
                  Optimized for speed and performance. Your data, instantly accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
              <p className="mt-4 text-xl text-gray-600">
                Choose the plan that's right for you
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                <p className="mt-4 text-gray-600">Perfect for individuals and small teams</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Up to 10 projects
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Email support
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/auth/signup">
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-primary-600 rounded-lg shadow-lg p-8 text-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="mt-4 text-primary-100">For growing businesses and teams</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-primary-100">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    API access
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/auth/signup">
                    <Button className="w-full bg-white text-primary-600 hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of businesses already using our platform
            </p>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}