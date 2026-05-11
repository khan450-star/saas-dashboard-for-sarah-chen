'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, CreditCard } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: 0,
    priceId: 'free',
    features: [
      'Up to 5 projects',
      'Basic analytics',
      'Email support',
      '1GB storage',
    ],
  },
  {
    name: 'Basic',
    price: 19,
    priceId: 'price_basic',
    features: [
      'Up to 25 projects',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'API access',
    ],
  },
  {
    name: 'Pro',
    price: 49,
    priceId: 'price_pro',
    features: [
      'Unlimited projects',
      'Real-time analytics',
      '24/7 support',
      '100GB storage',
      'API access',
      'Custom integrations',
    ],
  },
]

export default function BillingSection() {
  const [isLoading, setIsLoading] = useState(false)
  
  const { data: billing } = useQuery({
    queryKey: ['billing'],
    queryFn: async () => {
      const response = await fetch('/api/billing')
      if (!response.ok) throw new Error('Failed to fetch billing info')
      return response.json()
    },
  })

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })
      
      const data = await response.json()
      
      if (data.checkoutUrl && data.checkoutUrl !== '#') {
        window.location.href = data.checkoutUrl
      } else {
        alert(data.message || 'Stripe checkout would open here in a real app')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to create checkout session')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">{billing?.plan || 'FREE'} Plan</p>
            <p className="text-gray-600">
              Status: <span className="font-medium text-green-600">{billing?.status || 'Active'}</span>
            </p>
            {billing?.currentPeriodEnd && (
              <p className="text-sm text-gray-500 mt-1">
                Renews on {new Date(billing.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
          <CreditCard className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="card relative">
            {plan.name.toLowerCase() === billing?.plan?.toLowerCase() && (
              <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                Current
              </div>
            )}
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              {plan.name.toLowerCase() === billing?.plan?.toLowerCase() ? (
                <button className="w-full btn-secondary" disabled>
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.priceId)}
                  disabled={isLoading}
                  className="w-full btn-primary"
                >
                  {isLoading ? 'Processing...' : 
                   plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Pro Plan - Monthly</p>
              <p className="text-xs text-gray-500">December 1, 2023</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$49.00</p>
              <p className="text-xs text-green-600">Paid</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Pro Plan - Monthly</p>
              <p className="text-xs text-gray-500">November 1, 2023</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$49.00</p>
              <p className="text-xs text-green-600">Paid</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Basic Plan - Monthly</p>
              <p className="text-xs text-gray-500">October 1, 2023</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">$19.00</p>
              <p className="text-xs text-green-600">Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}