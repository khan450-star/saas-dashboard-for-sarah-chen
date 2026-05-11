'use client'

import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: '5',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: '47',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: '2',
      color: 'bg-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Avg Progress',
      value: '78%',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Learning Overview
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-6 h-6" />
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
    </div>
  )
}