import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart3, Users, DollarSign, TrendingUp, Activity } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return <div>No session found</div>
  }

  // Fetch user data with subscription
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
    },
  })

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,426',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Users',
      value: '2,341',
      change: '+5.2%', 
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'API Calls',
      value: '45,231',
      change: '+18.1%',
      icon: Activity,
      color: 'text-orange-600',
    },
  ]

  const recentActivity = [
    { id: 1, action: 'New user signed up', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Payment received', time: '5 minutes ago', type: 'payment' },
    { id: 3, action: 'API usage limit reached', time: '10 minutes ago', type: 'api' },
    { id: 4, action: 'Monthly report generated', time: '1 hour ago', type: 'report' },
    { id: 5, action: 'New integration connected', time: '2 hours ago', type: 'integration' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics Overview
            </CardTitle>
            <CardDescription>
              Your performance metrics over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chart will be displayed here</p>
                <p className="text-sm mt-2">Analytics integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and events in your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      {user?.subscription && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>
              Current plan and usage information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Current Plan</h4>
                <p className="text-lg font-semibold capitalize text-gray-900">
                  {user.subscription.status}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Next Billing</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Auto Renew</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {user.subscription.cancelAtPeriodEnd ? 'Disabled' : 'Enabled'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}