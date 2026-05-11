import DashboardStats from '@/components/DashboardStats'
import RevenueChart from '@/components/RevenueChart'
import UserGrowthChart from '@/components/UserGrowthChart'
import RecentActivity from '@/components/RecentActivity'

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Monitor your business performance and key metrics.
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart />
          <UserGrowthChart />
        </div>
        
        <RecentActivity />
      </div>
    </div>
  )
}