'use client'

import { useState } from 'react'

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    companyName: 'Acme Corp',
    companyEmail: 'admin@acme.com',
    timezone: 'UTC',
    language: 'en',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save settings logic here
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Email
          </label>
          <input
            type="email"
            value={settings.companyEmail}
            onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            className="input"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">GMT</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="input"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  )
}