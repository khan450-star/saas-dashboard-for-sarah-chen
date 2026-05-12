import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Card from '@/components/ui/Card'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Fetch user's subscription
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  // Mock metrics - in a real app, these would come from your database
  const metrics = {
    totalUsers: 1247,
    revenue: 42350,
    conversion: 3.2,
    growth: 12.5,
  }

  const activities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Payment received', time: '1 hour ago', type: 'payment' },
    { id: 3, action: 'Feature updated', time: '3 hours ago', type: 'system' },
    { id: 4, action: 'New subscription', time: '5 hours ago', type: 'subscription' },
    { id: 5, action: 'Support ticket resolved', time: '1 day ago', type: 'support' },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="text-2xl mr-3">👥</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="text-2xl mr-3">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.revenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="text-2xl mr-3">📈</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.conversion}%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚀</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-green-600">+{metrics.growth}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-900">{activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Status */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Plan</p>
              <p className="text-lg font-semibold text-gray-900">
                {subscription?.status === 'active' ? 'Pro Plan' : 'Free Plan'}
              </p>
            </div>
            
            {subscription?.currentPeriodEnd && (
              <div>
                <p className="text-sm text-gray-600">Next billing date</p>
                <p className="text-sm text-gray-900">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
            )}
            
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                subscription?.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subscription?.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}