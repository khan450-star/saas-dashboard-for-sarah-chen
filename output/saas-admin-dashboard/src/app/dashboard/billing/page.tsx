'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check, CreditCard, Calendar } from 'lucide-react'

interface Subscription {
  id: string
  plan: string
  status: string
  currentPeriodEnd: string | null
}

export default function BillingPage() {
  const { data: session, status } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)

  useEffect(() => {
    if (session) {
      fetchSubscription()
    }
  }, [session])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async () => {
    setIsUpgrading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_pro_plan' }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Stripe is not configured. Please set up your Stripe keys.')
      }
    } catch (error) {
      toast.error('Failed to create checkout session')
    } finally {
      setIsUpgrading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 projects',
        'Basic analytics',
        'Email support',
        '1GB storage',
      ],
      current: subscription?.plan === 'free',
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Best for growing businesses',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Team collaboration',
        'Custom integrations',
      ],
      current: subscription?.plan === 'pro',
      popular: true,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and billing information.
          </p>
        </div>

        {/* Current Subscription */}
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Current Subscription
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {subscription ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold capitalize">{subscription.plan} Plan</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                      subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  {subscription.currentPeriodEnd && (
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {subscription.plan === 'free' && (
                  <Button onClick={handleUpgrade} disabled={isUpgrading}>
                    {isUpgrading ? 'Processing...' : 'Upgrade to Pro'}
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-gray-500">No active subscription</div>
            )}
          </Card.Content>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={plan.current ? 'ring-2 ring-primary-600' : plan.popular ? 'ring-2 ring-primary-600' : ''}>
                {plan.popular && !plan.current && (
                  <div className="bg-primary-600 text-white text-center py-2 rounded-t-lg">
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                )}
                {plan.current && (
                  <div className="bg-green-600 text-white text-center py-2 rounded-t-lg">
                    <span className="text-sm font-medium">Current Plan</span>
                  </div>
                )}
                <Card.Header>
                  <Card.Title>{plan.name}</Card.Title>
                  <Card.Description>{plan.description}</Card.Description>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
                <Card.Footer>
                  {plan.current ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : plan.name === 'Pro' ? (
                    <Button className="w-full" onClick={handleUpgrade} disabled={isUpgrading}>
                      {isUpgrading ? 'Processing...' : 'Upgrade to Pro'}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Downgrade (Contact Support)
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}