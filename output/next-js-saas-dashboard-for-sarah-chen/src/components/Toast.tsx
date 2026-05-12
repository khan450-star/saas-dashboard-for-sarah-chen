'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastProps {
  type: ToastType
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ type, message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${
        type === 'success' 
          ? 'text-green-800 bg-green-50 border border-green-300' 
          : 'text-red-800 bg-red-50 border border-red-300'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="flex-shrink-0 w-4 h-4 mr-2" />
        ) : (
          <XCircle className="flex-shrink-0 w-4 h-4 mr-2" />
        )}
        <span className="font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 ${
            type === 'success'
              ? 'text-green-500 hover:bg-green-200 focus:ring-green-400'
              : 'text-red-500 hover:bg-red-200 focus:ring-red-400'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{
    type: ToastType
    message: string
    isVisible: boolean
  }>({ type: 'success', message: '', isVisible: false })

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return { toast, showToast, hideToast }
}