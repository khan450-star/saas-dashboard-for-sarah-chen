'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CreditCard, Calendar, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

interface Subscription {
  id: string
  status: string
  stripePriceId: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export default function BillingPage() {
  const { data: session } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const [isCreatingPortal, setIsCreatingPortal] = useState(false)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/user/subscription')
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
    setIsCreatingCheckout(true)
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1234567890', // This would be your actual Stripe price ID
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsCreatingCheckout(false)
    }
  }

  const handleManageSubscription = async () => {
    setIsCreatingPortal(true)
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to Stripe Customer Portal
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create portal session')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsCreatingPortal(false)
    }
  }

  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      features: ['Up to 5 team members', 'Basic analytics', 'Email support', '10GB storage'],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: ['Up to 25 team members', 'Advanced analytics', 'Priority support', '100GB storage'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: ['Unlimited team members', 'Custom analytics', '24/7 support', 'Unlimited storage'],
    },
  ]

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Subscription */}
      {subscription && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Current Subscription
            </CardTitle>
            <CardDescription>
              Your current plan and billing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Status</h4>
                <div className="flex items-center mt-1">
                  {subscription.status === 'active' ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className="text-lg font-semibold capitalize">
                    {subscription.status}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Current Period</h4>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {' '}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Next Billing</h4>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Auto Renew</h4>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {subscription.cancelAtPeriodEnd ? 'Disabled' : 'Enabled'}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={handleManageSubscription}
                disabled={isCreatingPortal}
                variant="outline"
                className="mr-4"
              >
                {isCreatingPortal ? 'Loading...' : 'Manage Subscription'}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {subscription ? 'Upgrade Your Plan' : 'Choose a Plan'}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary-500 border-2' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-medium text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={handleUpgrade}
                  disabled={isCreatingCheckout}
                >
                  {isCreatingCheckout ? 'Loading...' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            This is a demo application with placeholder Stripe integration. In a real application, 
            this would connect to your actual Stripe account for payment processing.
          </p>
          <p className="text-sm text-gray-500">
            All billing is handled securely through Stripe. You can update your payment methods, 
            download invoices, and manage your subscription through the customer portal.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}