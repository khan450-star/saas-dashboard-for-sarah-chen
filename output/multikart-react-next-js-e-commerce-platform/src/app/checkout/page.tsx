'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Since Stripe keys are placeholders, simulate checkout
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Complete!</h1>
          <p className="text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600">Add some items to your cart before checking out.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name</label>
                  <input type="text" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input type="text" required className="form-input" />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="form-label">Email</label>
                <input type="email" required className="form-input" />
              </div>
              
              <div className="mt-4">
                <label className="form-label">Address</label>
                <input type="text" required className="form-input" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="form-label">City</label>
                  <input type="text" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">State</label>
                  <input type="text" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">ZIP Code</label>
                  <input type="text" required className="form-input" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  Demo Mode: Payment processing is disabled. This is a demonstration checkout.
                </p>
              </div>
              
              <div>
                <label className="form-label">Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="form-input" 
                  disabled 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="form-label">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="form-input" 
                    disabled 
                  />
                </div>
                <div>
                  <label className="form-label">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="form-input" 
                    disabled 
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-primary w-full"
            >
              {isProcessing ? 'Processing...' : `Complete Order - ${formatPrice(getTotal() * 1.1)}`}
            </button>
          </form>
        </div>
        
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(getTotal() * 0.1)}</span>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>{formatPrice(getTotal() * 1.1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}