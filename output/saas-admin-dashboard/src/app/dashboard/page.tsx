import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Card from '@/components/ui/Card'
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react'

async function getDashboardData() {
  const [userCount, subscriptionCount] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({
      where: {
        status: 'active',
      },
    }),
  ])

  return {
    totalUsers: userCount,
    activeSubscriptions: subscriptionCount,
    monthlyRevenue: subscriptionCount * 29, // Simplified calculation
    conversionRate: userCount > 0 ? ((subscriptionCount / userCount) * 100).toFixed(1) : '0',
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const data = await getDashboardData()

  const metrics = [
    {
      title: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Monthly Revenue',
      value: `$${data.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Subscriptions',
      value: data.activeSubscriptions.toLocaleString(),
      icon: TrendingUp,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: Activity,
      change: '+5%',
      changeType: 'positive' as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {session.user?.name}. Here's what's happening with your business.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index}>
                <Card.Content className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {metric.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {metric.value}
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            {metric.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Description>
                Latest updates from your dashboard
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <p className="ml-3 text-sm text-gray-600">
                    New user signed up
                  </p>
                  <p className="ml-auto text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <p className="ml-3 text-sm text-gray-600">
                    Payment received
                  </p>
                  <p className="ml-auto text-xs text-gray-400">4 hours ago</p>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <p className="ml-3 text-sm text-gray-600">
                    Subscription renewed
                  </p>
                  <p className="ml-auto text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Quick Actions</Card.Title>
              <Card.Description>
                Common tasks and shortcuts
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Invite team members</div>
                  <div className="text-sm text-gray-500">Add new users to your workspace</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Export data</div>
                  <div className="text-sm text-gray-500">Download your analytics report</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Update settings</div>
                  <div className="text-sm text-gray-500">Manage your account preferences</div>
                </button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}