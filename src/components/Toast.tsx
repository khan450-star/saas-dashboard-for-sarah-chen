'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  show: boolean
  onClose: () => void
}

export default function Toast({ message, type = 'info', show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={cn(
        'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border',
        typeStyles[type]
      )}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}