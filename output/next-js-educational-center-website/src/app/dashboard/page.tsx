import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { EnrolledCourses } from '@/components/dashboard/EnrolledCourses'
import { ProgressStats } from '@/components/dashboard/ProgressStats'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session.user?.name}!
        </h1>
        <p className="text-gray-600">
          Track your learning progress and continue your educational journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DashboardOverview />
          <div className="mt-8">
            <EnrolledCourses />
          </div>
        </div>
        
        <div>
          <ProgressStats />
        </div>
      </div>
    </div>
  )
}