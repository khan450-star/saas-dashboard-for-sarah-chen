'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface Subscription {
  id: string
  status: string
  priceId: string
  currentPeriodEnd: string
}

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    fetchSubscription()
  }, [session, status, router])

  const fetchSubscription = async () => {
    try {
      const res = await fetch('/api/billing/subscription')
      if (res.ok) {
        const data = await res.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })
      
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
    setIsLoading(false)
  }

  const handleManageBilling = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/billing/create-portal-session', {
        method: 'POST',
      })
      
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating portal session:', error)
    }
    setIsLoading(false)
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-gray-600">Manage your subscription and billing preferences</p>
        </div>
        
        {subscription ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Status: </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subscription.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Next billing date: </span>
                <span>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
              </div>
              <Button onClick={handleManageBilling} disabled={isLoading}>
                Manage Billing
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Basic Plan</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Dashboard access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Email support
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleSubscribe('price_basic')}
                  disabled={isLoading}
                >
                  Subscribe to Basic
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Advanced dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    API access
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleSubscribe('price_pro')}
                  disabled={isLoading}
                >
                  Subscribe to Pro
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}