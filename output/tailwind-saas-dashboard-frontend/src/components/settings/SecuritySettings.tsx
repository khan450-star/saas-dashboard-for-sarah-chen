'use client'

import { useState } from 'react'

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordPolicy: 'medium',
  })

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, twoFactorEnabled: !settings.twoFactorEnabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            className="input"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Policy
          </label>
          <select
            value={settings.passwordPolicy}
            onChange={(e) => setSettings({ ...settings, passwordPolicy: e.target.value })}
            className="input"
          >
            <option value="low">Low (8 characters minimum)</option>
            <option value="medium">Medium (8 characters, numbers)</option>
            <option value="high">High (12 characters, numbers, symbols)</option>
          </select>
        </div>
        
        <button className="btn btn-primary">
          Update Security Settings
        </button>
      </div>
    </div>
  )
}