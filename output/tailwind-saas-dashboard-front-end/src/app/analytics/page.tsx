import AnalyticsOverview from '@/components/AnalyticsOverview'
import TrafficChart from '@/components/TrafficChart'
import ConversionChart from '@/components/ConversionChart'

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics
          </h1>
          <p className="text-gray-600">
            Deep insights into your application performance and user behavior.
          </p>
        </div>
        
        <AnalyticsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrafficChart />
          <ConversionChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">/dashboard</span>
                <span className="text-sm font-medium">1,234 views</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">/analytics</span>
                <span className="text-sm font-medium">987 views</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">/settings</span>
                <span className="text-sm font-medium">654 views</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referrers</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">google.com</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">twitter.com</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">direct</span>
                <span className="text-sm font-medium">32%</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Devices</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Desktop</span>
                <span className="text-sm font-medium">62%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mobile</span>
                <span className="text-sm font-medium">31%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tablet</span>
                <span className="text-sm font-medium">7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}