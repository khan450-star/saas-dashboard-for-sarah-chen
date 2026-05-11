import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function BillingCancelPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-lg">
              Your subscription upgrade was cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-gray-600">
                Don't worry! You can try again at any time. Your current plan remains active 
                and you can upgrade whenever you're ready.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check if your payment method is valid</li>
                  <li>• Ensure you have sufficient funds</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact our support team for assistance</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/dashboard/billing">
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Dashboard
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