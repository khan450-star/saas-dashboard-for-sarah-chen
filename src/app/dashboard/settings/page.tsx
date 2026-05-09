'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Toast from '@/components/Toast'
import { updateProfileSchema, changePasswordSchema } from '@/lib/validations'
import { z } from 'zod'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [profileData, setProfileData] = useState({ name: '', email: '' })
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' as const })

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || '',
        email: session.user.email || '',
      })
    }
  }, [session])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileErrors({})

    try {
      const validatedData = updateProfileSchema.parse(profileData)
      
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', ...validatedData }),
      })

      if (response.ok) {
        await update({ name: validatedData.name, email: validatedData.email })
        setToast({ show: true, message: 'Profile updated successfully!', type: 'success' })
      } else {
        const data = await response.json()
        setToast({ show: true, message: data.message || 'Failed to update profile', type: 'error' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setProfileErrors(fieldErrors)
      }
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordErrors({})

    try {
      const validatedData = changePasswordSchema.parse(passwordData)
      
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'password', ...validatedData }),
      })

      if (response.ok) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setToast({ show: true, message: 'Password changed successfully!', type: 'success' })
      } else {
        const data = await response.json()
        setToast({ show: true, message: data.message || 'Failed to change password', type: 'error' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setPasswordErrors(fieldErrors)
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              error={profileErrors.name}
              required
            />
            
            <Input
              label="Email address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              error={profileErrors.email}
              required
            />
            
            <Button type="submit" loading={profileLoading}>
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Password Settings */}
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              error={passwordErrors.currentPassword}
              required
            />
            
            <Input
              label="New password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              error={passwordErrors.newPassword}
              required
            />
            
            <Input
              label="Confirm new password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              error={passwordErrors.confirmPassword}
              required
            />
            
            <Button type="submit" loading={passwordLoading}>
              Change Password
            </Button>
          </form>
        </Card>
      </div>
      
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}