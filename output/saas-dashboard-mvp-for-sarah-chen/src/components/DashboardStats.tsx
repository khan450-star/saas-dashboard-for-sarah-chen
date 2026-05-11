export default function DashboardStats({
  totalUsers,
  activeSubscriptions,
  monthlyRevenue
}: {
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
}) {
  const stats = [
    {
      name: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.toLocaleString(),
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Monthly Revenue',
      value: `$${monthlyRevenue.toLocaleString()}`,
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Churn Rate',
      value: '2.4%',
      change: '-0.3%',
      changeType: 'positive'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}