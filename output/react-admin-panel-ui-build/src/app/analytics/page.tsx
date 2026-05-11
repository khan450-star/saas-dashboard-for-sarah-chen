import { Sidebar } from '@/components/Sidebar'
import { ChartCard } from '@/components/ChartCard'
import { StatsCard } from '@/components/StatsCard'

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Page Views" value="45,231" change="+15%" />
            <StatsCard title="Sessions" value="12,543" change="+7%" />
            <StatsCard title="Bounce Rate" value="35.2%" change="-3%" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Traffic Sources" />
            <ChartCard title="User Engagement" />
            <ChartCard title="Geographic Distribution" />
            <ChartCard title="Device Usage" />
          </div>
        </div>
      </div>
    </div>
  )
}