import { Sidebar } from '@/components/Sidebar'
import { StatsCard } from '@/components/StatsCard'
import { ChartCard } from '@/components/ChartCard'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Users" value="1,234" change="+12%" />
            <StatsCard title="Revenue" value="$45,678" change="+8%" />
            <StatsCard title="Orders" value="567" change="+23%" />
            <StatsCard title="Conversion" value="3.2%" change="-2%" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="User Growth" />
            <ChartCard title="Revenue Trends" />
          </div>
        </div>
      </div>
    </div>
  )
}