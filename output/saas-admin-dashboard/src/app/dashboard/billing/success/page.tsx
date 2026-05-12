import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

export default async function CheckoutSuccessPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto">
        <Card>
          <Card.Content className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for upgrading to Pro. Your subscription has been activated and you now have access to all Pro features.
            </p>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/billing">
                <Button variant="outline" className="w-full">
                  View Billing
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </DashboardLayout>
  )
}