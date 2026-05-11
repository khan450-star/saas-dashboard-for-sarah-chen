import { Subscription } from '@prisma/client'

export default function BillingInfo({ 
  subscription 
}: { 
  subscription: Subscription | null 
}) {
  const invoices = [
    {
      id: 'inv_001',
      date: '2024-01-01',
      amount: '$29.00',
      status: 'Paid'
    },
    {
      id: 'inv_002',
      date: '2023-12-01',
      amount: '$29.00',
      status: 'Paid'
    },
    {
      id: 'inv_003',
      date: '2023-11-01',
      amount: '$29.00',
      status: 'Paid'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium capitalize ${
              subscription?.status === 'ACTIVE' 
                ? 'text-green-600' 
                : 'text-gray-600'
            }`}>
              {subscription?.status?.toLowerCase() || 'Inactive'}
            </span>
          </div>
          {subscription?.currentPeriodEnd && (
            <div className="flex justify-between">
              <span className="text-gray-600">Next billing date:</span>
              <span className="font-medium">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium">
              {subscription?.status === 'ACTIVE' ? 'Pro Plan' : 'Free Plan'}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Invoice</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="py-3 text-sm text-gray-600">{invoice.date}</td>
                  <td className="py-3 text-sm text-gray-900">{invoice.amount}</td>
                  <td className="py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}