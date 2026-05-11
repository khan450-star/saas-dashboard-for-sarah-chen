export default function BillingOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        <div className="card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h3>
              <p className="text-gray-600">You are currently on the Professional plan</p>
            </div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Active
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Plan</dt>
                <dd className="mt-1 text-sm text-gray-900">Professional</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900">$99/month</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Next billing date</dt>
                <dd className="mt-1 text-sm text-gray-900">January 15, 2024</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900">•••• 4242</dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button className="btn btn-primary">
              Upgrade Plan
            </button>
            <button className="btn btn-secondary">
              Update Payment Method
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Calls</span>
              <span className="text-sm font-medium">8,432 / 10,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium">2.3 GB / 5 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: '46%' }}></div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Users</span>
              <span className="text-sm font-medium">12 / 25</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Download Invoice</div>
              <div className="text-sm text-gray-500">Get your latest invoice</div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Billing History</div>
              <div className="text-sm text-gray-500">View all past payments</div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Contact Support</div>
              <div className="text-sm text-gray-500">Get help with billing</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}