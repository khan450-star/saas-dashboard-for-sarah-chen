import DashboardLayout from '@/components/layout/DashboardLayout'
import Chart from '@/components/ui/Chart'
import MetricCard from '@/components/analytics/MetricCard'
import DateRangePicker from '@/components/ui/DateRangePicker'

export default function AnalyticsPage() {
  const metrics = [
    { title: 'Page Views', value: '847,392', change: '+14%', period: 'vs last month' },
    { title: 'Unique Visitors', value: '124,891', change: '+8%', period: 'vs last month' },
    { title: 'Bounce Rate', value: '34.2%', change: '-2.1%', period: 'vs last month' },
    { title: 'Avg. Session', value: '4m 32s', change: '+12s', period: 'vs last month' },
    { title: 'Conversions', value: '2,847', change: '+23%', period: 'vs last month' },
    { title: 'Revenue', value: '$89,432', change: '+15%', period: 'vs last month' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your application performance and user behavior.</p>
          </div>
          <DateRangePicker />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
            <Chart type="line" height={300} />
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">User Acquisition</h3>
            <Chart type="doughnut" height={300} />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
          <Chart type="area" height={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
            <div className="space-y-4">
              {['/dashboard', '/analytics', '/users', '/settings', '/billing'].map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-900">{page}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{(Math.random() * 10000).toFixed(0)} views</span>
                    <div className="w-16 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-primary-500 rounded" 
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Device Types</h3>
            <Chart type="polarArea" height={250} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}