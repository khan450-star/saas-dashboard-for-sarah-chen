'use client'

import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'

export function AdminStats() {
  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '2,847',
      change: '+12%',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: '156',
      change: '+8%',
      color: 'bg-green-500'
    },
    {
      icon: DollarSign,
      label: 'Revenue (MTD)',
      value: '$42,350',
      change: '+15%',
      color: 'bg-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: '87%',
      change: '+3%',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}