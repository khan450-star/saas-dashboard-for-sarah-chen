import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import AnalyticsChart from '@/components/AnalyticsChart'
import MetricsGrid from '@/components/MetricsGrid'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const analytics = await prisma.analytics.findMany({
    take: 30,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Detailed insights into your application performance</p>
      </div>

      <MetricsGrid analytics={analytics} />
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Revenue Trends</h2>
        <AnalyticsChart data={analytics} />
      </div>
    </div>
  )
}