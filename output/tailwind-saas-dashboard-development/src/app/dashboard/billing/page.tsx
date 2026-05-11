import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import BillingOverview from '@/components/BillingOverview'
import SubscriptionPlans from '@/components/SubscriptionPlans'
import InvoiceHistory from '@/components/InvoiceHistory'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const userSubscription = await prisma.subscription.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and billing information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <BillingOverview subscription={userSubscription} />
          <InvoiceHistory invoices={invoices} />
        </div>
        <div>
          <SubscriptionPlans currentPlan={userSubscription?.plan} />
        </div>
      </div>
    </div>
  )
}