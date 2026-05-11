import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import DashboardStats from '@/components/DashboardStats'
import RecentActivity from '@/components/RecentActivity'
import UserGrowthChart from '@/components/UserGrowthChart'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {session.user?.name}</p>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserGrowthChart />
        <RecentActivity />
      </div>
    </div>
  )
}