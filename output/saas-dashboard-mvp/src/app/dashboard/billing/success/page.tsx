import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function BillingSuccessPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg">
              Thank you for your subscription. Your account has been upgraded successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-gray-600">
                You now have access to all the features included in your plan. 
                Your subscription is active and billing will begin according to your selected plan.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Explore your dashboard and new features</li>
                  <li>• Check your email for a receipt and subscription details</li>
                  <li>• Visit the billing page to manage your subscription</li>
                  <li>• Contact support if you have any questions</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/dashboard">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/billing">
                  <Button variant="outline">
                    View Billing
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}