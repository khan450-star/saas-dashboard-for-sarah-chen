import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import BillingInfo from '@/components/BillingInfo'
import UpgradeButton from '@/components/UpgradeButton'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true }
  })

  if (!user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and payment methods</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BillingInfo subscription={user.subscription} />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {user.subscription?.status === 'ACTIVE' ? 'Pro Plan' : 'Free Plan'}
              </div>
              <div className="text-gray-600">
                {user.subscription?.status === 'ACTIVE' ? '$29/month' : '$0/month'}
              </div>
            </div>
            
            {user.subscription?.status !== 'ACTIVE' && (
              <UpgradeButton userId={user.id} />
            )}
            
            {user.subscription?.status === 'ACTIVE' && (
              <div className="space-y-3">
                <button className="w-full btn-secondary">
                  Manage Subscription
                </button>
                <button className="w-full btn-secondary">
                  Update Payment Method
                </button>
                <button className="w-full text-red-600 hover:text-red-700">
                  Cancel Subscription
                </button>
              </div>
            )}
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">API Calls</span>
                <span className="font-medium">2,847 / 10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="font-medium">1.2 GB / 5 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}