'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Toast from '@/components/Toast'

interface Subscription {
  id: string
  status: string
  stripePriceId: string
  currentPeriodEnd: string
}

export default function BillingPage() {
  const { data: session } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' as const })

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
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes('placeholder')) {
      setToast({ 
        show: true, 
        message: 'Stripe is not configured. Please add your Stripe keys to enable billing.', 
        type: 'error' 
      })
      return
    }

    setUpgradeLoading(true)
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_1234567890' }), // Replace with your actual price ID
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      } else {
        const data = await response.json()
        setToast({ show: true, message: data.message || 'Failed to create checkout session', type: 'error' })
      }
    } catch (error) {
      setToast({ show: true, message: 'Something went wrong', type: 'error' })
    } finally {
      setUpgradeLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes('placeholder')) {
      setToast({ 
        show: true, 
        message: 'Stripe is not configured. Please add your Stripe keys to enable billing.', 
        type: 'error' 
      })
      return
    }

    setPortalLoading(true)
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      } else {
        const data = await response.json()
        setToast({ show: true, message: data.message || 'Failed to create portal session', type: 'error' })
      }
    } catch (error) {
      setToast({ show: true, message: 'Something went wrong', type: 'error' })
    } finally {
      setPortalLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Manage your subscription and billing information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Plan</p>
              <p className="text-lg font-semibold text-gray-900">
                {subscription?.status === 'active' ? 'Pro Plan' : 'Free Plan'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                subscription?.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subscription?.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            {subscription?.currentPeriodEnd && (
              <div>
                <p className="text-sm text-gray-600">Next billing date</p>
                <p className="text-sm text-gray-900">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
            )}
            
            <div className="pt-4">
              {subscription?.status === 'active' ? (
                <Button 
                  onClick={handleManageSubscription} 
                  loading={portalLoading}
                  variant="outline"
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button onClick={handleUpgrade} loading={upgradeLoading}>
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Pricing Plans */}
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Free Plan</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">$0<span className="text-sm font-normal text-gray-600">/month</span></p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Up to 3 projects</li>
                <li>• Basic analytics</li>
                <li>• Email support</li>
              </ul>
            </div>
            
            <div className="border-2 border-primary-500 rounded-lg p-4 bg-primary-50">
              <h3 className="font-medium text-gray-900">Pro Plan</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">$29<span className="text-sm font-normal text-gray-600">/month</span></p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• Unlimited projects</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
                <li>• API access</li>
              </ul>
              {subscription?.status !== 'active' && (
                <div className="mt-3">
                  <Button onClick={handleUpgrade} loading={upgradeLoading} size="sm">
                    Upgrade Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}