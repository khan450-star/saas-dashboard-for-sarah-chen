'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Check, ExternalLink } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import Toast, { useToast } from '@/components/Toast'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Subscription {
  id: string
  status: string
  stripePriceId: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

interface Invoice {
  id: string
  amountPaid: number
  currency: string
  status: string
  invoiceUrl: string | null
  createdAt: string
}

export default function BillingPage() {
  const { data: session } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    if (session?.user) {
      fetchBillingData()
    }
  }, [session])

  if (!session?.user) {
    redirect('/auth/signin')
  }

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/billing/subscription')
      const data = await response.json()
      
      if (response.ok) {
        setSubscription(data.subscription)
        setInvoices(data.invoices)
      }
    } catch (error) {
      console.error('Error fetching billing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async (priceId: string) => {
    setIsUpgrading(true)
    
    try {
      const response = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        showToast('error', data.message || 'Failed to create checkout session')
      }
    } catch (error) {
      showToast('error', 'An error occurred. Please try again.')
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/billing/customer-portal', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        showToast('error', 'Failed to open customer portal')
      }
    } catch (error) {
      showToast('error', 'An error occurred. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600">Manage your subscription and billing information.</p>
        </div>

        {/* Current Subscription */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
          </div>
          <div className="p-6">
            {subscription ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {subscription.stripePriceId.includes('annual') ? 'Pro Annual' : 'Pro Monthly'}
                    </h3>
                    <p className="text-gray-600">
                      {subscription.stripePriceId.includes('annual') ? '$290/year' : '$29/month'}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                      {subscription.cancelAtPeriodEnd && (
                        <span className="text-sm text-orange-600">
                          Cancels on {formatDate(subscription.currentPeriodEnd)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleManageSubscription}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Next billing date: {formatDate(subscription.currentPeriodEnd)}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-600 mb-6">Choose a plan to get started with our SaaS platform.</p>
                
                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-2">Pro Monthly</h4>
                    <p className="text-3xl font-bold mb-4">$29 <span className="text-sm font-normal text-gray-600">/month</span></p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Unlimited dashboard access
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Priority support
                      </li>
                    </ul>
                    <button
                      onClick={() => handleUpgrade('price_pro_monthly')}
                      disabled={isUpgrading}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                    >
                      {isUpgrading ? <LoadingSpinner size="sm" /> : 'Subscribe Monthly'}
                    </button>
                  </div>
                  
                  <div className="border border-primary-200 rounded-lg p-6 ring-2 ring-primary-500">
                    <h4 className="text-lg font-semibold mb-2">Pro Annual</h4>
                    <p className="text-3xl font-bold mb-4">$290 <span className="text-sm font-normal text-gray-600">/year</span></p>
                    <p className="text-sm text-green-600 mb-4">Save $58 per year!</p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Unlimited dashboard access
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Priority support
                      </li>
                    </ul>
                    <button
                      onClick={() => handleUpgrade('price_pro_annual')}
                      disabled={isUpgrading}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                    >
                      {isUpgrading ? <LoadingSpinner size="sm" /> : 'Subscribe Annually'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
          </div>
          <div className="p-6">
            {invoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="py-3 text-sm text-gray-900">
                          {formatDate(invoice.createdAt)}
                        </td>
                        <td className="py-3 text-sm text-gray-900">
                          {formatCurrency(invoice.amountPaid, invoice.currency.toUpperCase())}
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {invoice.invoiceUrl ? (
                            <a
                              href={invoice.invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 text-sm"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No invoices found.</p>
            )}
          </div>
        </div>
      </div>
      <Toast {...toast} onClose={hideToast} />
    </>
  )
}