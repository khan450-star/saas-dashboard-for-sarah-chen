'use client'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: Date
  subscriptions: Array<{
    status: string
    plan: string
  }>
}

interface UserStatsProps {
  users: User[]
}

export default function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length
  const activeUsers = users.filter(user => 
    user.subscriptions.some(sub => sub.status === 'active')
  ).length
  const adminUsers = users.filter(user => user.role === 'admin').length
  const newUsersThisMonth = users.filter(user => {
    const userDate = new Date(user.createdAt)
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return userDate >= thisMonth
  }).length

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Users',
      value: activeUsers.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Admin Users',
      value: adminUsers.toLocaleString(),
      change: '0%',
      changeType: 'neutral',
    },
    {
      name: 'New This Month',
      value: newUsersThisMonth.toLocaleString(),
      change: '+23%',
      changeType: 'positive',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className={`text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' :
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}