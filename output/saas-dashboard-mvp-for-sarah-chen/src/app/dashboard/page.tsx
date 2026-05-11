import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import DashboardStats from '@/components/DashboardStats'
import RecentActivity from '@/components/RecentActivity'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true }
  })

  if (!user) {
    redirect('/api/auth/signin')
  }

  const totalUsers = await prisma.user.count()
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: 'ACTIVE' }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </div>

      <DashboardStats 
        totalUsers={totalUsers}
        activeSubscriptions={activeSubscriptions}
        monthlyRevenue={activeSubscriptions * 29} // Mock MRR calculation
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity />
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-600">Check your performance metrics</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Manage Users</div>
              <div className="text-sm text-gray-600">Add or remove team members</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Export Data</div>
              <div className="text-sm text-gray-600">Download your data as CSV</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}