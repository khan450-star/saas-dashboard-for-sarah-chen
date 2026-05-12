'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { CreditCard, Check, Crown, Zap, Star } from 'lucide-react'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  stripePriceId: string
  features: string[]
  popular: boolean
}

interface Subscription {
  planName: string
  status: string
  currentPeriodEnd: string
  amount: number
}

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchBillingData()
    }
  }, [status, router])

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/billing/plans')
      const plansData = await response.json()
      setPlans(plansData)

      // Mock current subscription
      setSubscription({
        planName: 'Pro',
        status: 'active',
        currentPeriodEnd: '2024-02-15',
        amount: 29.99
      })
    } catch (error) {
      console.error('Error fetching billing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (planId: string) => {
    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ planId })
      })
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Checkout is not available with demo Stripe keys. Please configure real Stripe keys.')
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const handleCancelSubscription = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      try {
        const response = await fetch('/api/billing/cancel-subscription', {
          method: 'POST'
        })
        
        if (response.ok) {
          alert('Subscription cancelled successfully')
          fetchBillingData()
        }
      } catch (error) {
        console.error('Error cancelling subscription:', error)
      }
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        </div>

        {/* Current Subscription */}
        {subscription && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Current Subscription
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{subscription.planName} Plan</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ${subscription.amount}/month • Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-3">
                  <button className="btn btn-outline px-4 py-2 text-sm">
                    Update Payment Method
                  </button>
                  <button 
                    onClick={handleCancelSubscription}
                    className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Available Plans</h2>
            <p className="text-sm text-gray-500 mt-1">Choose the plan that works best for you</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <div key={plan.id} className={`relative rounded-lg border-2 p-6 ${
                  plan.popular 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      {plan.name === 'Starter' && <Zap className="h-8 w-8 text-primary-600" />}
                      {plan.name === 'Pro' && <Crown className="h-8 w-8 text-primary-600" />}
                      {plan.name === 'Enterprise' && <Star className="h-8 w-8 text-primary-600" />}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={subscription?.planName === plan.name}
                    className={`mt-6 w-full btn ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-outline'
                    } py-2 text-sm ${
                      subscription?.planName === plan.name
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {subscription?.planName === plan.name ? 'Current Plan' : `Subscribe to ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {[
                { date: '2024-01-15', amount: 29.99, status: 'Paid', plan: 'Pro Plan' },
                { date: '2023-12-15', amount: 29.99, status: 'Paid', plan: 'Pro Plan' },
                { date: '2023-11-15', amount: 29.99, status: 'Paid', plan: 'Pro Plan' },
                { date: '2023-10-15', amount: 9.99, status: 'Paid', plan: 'Starter Plan' }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payment.plan}</div>
                    <div className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">${payment.amount}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                    <button className="text-primary-600 hover:text-primary-500 text-sm">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}