'use client'

interface Subscription {
  id: string
  plan: string
  status: string
  currentPeriodEnd: Date
  amount: number
}

interface BillingOverviewProps {
  subscription: Subscription | null
}

export default function BillingOverview({ subscription }: BillingOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Current Subscription</h2>
      
      {subscription ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium capitalize">{subscription.plan} Plan</h3>
              <p className="text-gray-600">${subscription.amount}/month</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
              {subscription.status}
            </span>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Next billing date</p>
            <p className="font-medium">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button className="btn-secondary text-sm">
              Update Payment Method
            </button>
            <button className="btn-primary text-sm">
              Manage Subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No active subscription</p>
          <button className="btn-primary">
            Choose a Plan
          </button>
        </div>
      )}
    </div>
  )
}