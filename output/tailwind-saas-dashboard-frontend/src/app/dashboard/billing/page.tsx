'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import PlanCard from '@/components/billing/PlanCard'
import InvoiceTable from '@/components/billing/InvoiceTable'
import UsageChart from '@/components/billing/UsageChart'

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: ['Up to 10 users', '10GB storage', 'Basic support', 'Core features'],
      current: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: ['Up to 50 users', '100GB storage', 'Priority support', 'Advanced features', 'API access'],
      current: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      features: ['Unlimited users', '1TB storage', '24/7 support', 'All features', 'Custom integrations'],
      current: false,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription, billing, and usage.</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-500">Yearly <span className="text-success-600 font-medium">(Save 20%)</span></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
            <UsageChart />
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Current Plan</span>
                <span className="font-medium">Professional</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-medium">Jan 15, 2024</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium text-lg">$79.00</span>
              </div>
              <button className="w-full btn btn-primary mt-4">
                Update Payment Method
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
          <InvoiceTable />
        </div>
      </div>
    </DashboardLayout>
  )
}