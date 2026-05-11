import BillingOverview from '@/components/BillingOverview'
import InvoiceList from '@/components/InvoiceList'

export default function Billing() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Billing & Invoices
          </h1>
          <p className="text-gray-600">
            Manage your billing information and view payment history.
          </p>
        </div>
        
        <BillingOverview />
        
        <div className="mt-8">
          <InvoiceList />
        </div>
      </div>
    </div>
  )
}