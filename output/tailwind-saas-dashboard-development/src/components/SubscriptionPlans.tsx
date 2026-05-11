'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

interface SubscriptionPlansProps {
  currentPlan?: string
}

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
}

export default function SubscriptionPlans({ currentPlan }: SubscriptionPlansProps) {
  const [isLoading, setIsLoading] = useState('')

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      features: [
        'Up to 1,000 users',
        'Basic analytics',
        'Email support',
        '5GB storage',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 99,
      features: [
        'Up to 10,000 users',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Custom integrations',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: [
        'Unlimited users',
        'Advanced analytics',
        '24/7 phone support',
        'Unlimited storage',
        'Custom integrations',
        'Dedicated manager',
      ],
    },
  ]

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId)
    
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planId }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        alert(data.error)
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading('')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Plans</h2>
      
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`card relative ${
            plan.popular ? 'ring-2 ring-primary-500' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                Popular
              </span>
            </div>
          )}
          
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
          </div>
          
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => handleSubscribe(plan.id)}
            disabled={isLoading === plan.id || currentPlan === plan.id}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              currentPlan === plan.id
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : plan.popular
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {isLoading === plan.id ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Loading...
              </div>
            ) : currentPlan === plan.id ? (
              'Current Plan'
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      ))}
    </div>
  )
}