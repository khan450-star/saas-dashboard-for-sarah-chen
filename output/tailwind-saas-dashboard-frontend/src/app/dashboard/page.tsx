import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCard from '@/components/ui/StatsCard'
import Chart from '@/components/ui/Chart'
import RecentActivity from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', trend: 'up' },
    { title: 'Revenue', value: '$24,780', change: '+8%', trend: 'up' },
    { title: 'Active Sessions', value: '1,429', change: '-2%', trend: 'down' },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your application.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <Chart type="line" />
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <Chart type="bar" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
              <Chart type="area" />
            </div>
          </div>
          
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}