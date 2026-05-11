'use client'

import { Calendar, Target, Trophy } from 'lucide-react'

export function ProgressStats() {
  const achievements = [
    {
      icon: Trophy,
      title: 'First Course Completed',
      date: '2 weeks ago',
      color: 'text-yellow-600'
    },
    {
      icon: Target,
      title: '50 Hours Milestone',
      date: '1 week ago',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: '30 Day Streak',
      date: '3 days ago',
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Weekly Goal */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Goal
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            7/10
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Hours completed this week
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-primary-600 h-3 rounded-full" style={{ width: '70%' }}></div>
          </div>
          
          <p className="text-sm text-gray-600">
            3 hours to go! You're doing great.
          </p>
        </div>
      </div>
      
      {/* Recent Achievements */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Achievements
        </h3>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${achievement.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {achievement.date}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Study Streak */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Study Streak
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            12
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Days in a row
          </div>
          
          <div className="flex justify-center space-x-1 mb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < 5 ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600">
            Keep it up! You're on fire 🔥
          </p>
        </div>
      </div>
    </div>
  )
}