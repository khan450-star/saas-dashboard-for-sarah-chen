import { StudentDashboard } from '@/components/StudentDashboard'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Portal() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
        </div>
        
        <StudentDashboard />
      </div>
    </div>
  )
}