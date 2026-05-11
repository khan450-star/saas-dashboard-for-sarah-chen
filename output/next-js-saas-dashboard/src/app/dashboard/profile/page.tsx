'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-600">View and manage your profile information</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="font-medium">{session.user?.name || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-medium">{session.user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member since</p>
                  <p className="font-medium">January 2024</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={() => router.push('/dashboard/settings')}>
                Edit Profile
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Account Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Last login</span>
                <span className="text-sm text-gray-500">Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Password changed</span>
                <span className="text-sm text-gray-500">2 weeks ago</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Profile updated</span>
                <span className="text-sm text-gray-500">1 month ago</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Account created</span>
                <span className="text-sm text-gray-500">3 months ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}