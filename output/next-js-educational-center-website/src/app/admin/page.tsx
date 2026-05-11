import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminStats } from '@/components/admin/AdminStats'
import { CourseManagement } from '@/components/admin/CourseManagement'
import { UserManagement } from '@/components/admin/UserManagement'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/api/auth/signin')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage courses, users, and monitor platform performance.
        </p>
      </div>
      
      <AdminStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <CourseManagement />
        <UserManagement />
      </div>
    </div>
  )
}