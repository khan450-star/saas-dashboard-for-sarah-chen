'use client'

import { useEffect, useState } from 'react'
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react'

interface StatsData {
  totalUsers: number
  totalRevenue: number
  activeUsers: number
  conversionRate: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalRevenue: 0,
    activeUsers: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalUsers: 1247,
      totalRevenue: 24350,
      activeUsers: 892,
      conversionRate: 3.24,
    })
  }, [])

  const statItems = [
    {
      name: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      change: '+5%',
      changeType: 'positive',
    },
    {
      name: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: '-2%',
      changeType: 'negative',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{item.name}</p>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  item.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}