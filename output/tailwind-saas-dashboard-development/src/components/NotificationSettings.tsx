'use client'

import { useState } from 'react'

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
          { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
          { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly analytics reports' },
          { key: 'monthlyReports', label: 'Monthly Reports', description: 'Get monthly summary reports' },
          { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications' },
          { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product updates and promotions' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <button
              onClick={() => handleToggle(item.key as keyof typeof settings)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                settings[item.key as keyof typeof settings]
                  ? 'bg-primary-600'
                  : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[item.key as keyof typeof settings]
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}