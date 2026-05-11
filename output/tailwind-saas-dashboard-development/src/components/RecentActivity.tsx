'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Activity {
  id: string
  type: string
  description: string
  timestamp: Date
  user: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Simulate activity data
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'user',
        description: 'New user registered',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        user: 'john@example.com',
      },
      {
        id: '2',
        type: 'payment',
        description: 'Payment received',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        user: 'sarah@example.com',
      },
      {
        id: '3',
        type: 'subscription',
        description: 'Subscription upgraded',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        user: 'mike@example.com',
      },
      {
        id: '4',
        type: 'user',
        description: 'User profile updated',
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
        user: 'emma@example.com',
      },
    ]
    setActivities(mockActivities)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return '👤'
      case 'payment':
        return '💳'
      case 'subscription':
        return '📊'
      default:
        return '📝'
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-lg">{getActivityIcon(activity.type)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500">{activity.user}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}