'use client'

import { useState } from 'react'

export default function UpgradeButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_demo_pro_plan' // This would be a real Stripe price ID
        })
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? 'Loading...' : 'Upgrade to Pro'}
      </button>
    </div>
  )
}