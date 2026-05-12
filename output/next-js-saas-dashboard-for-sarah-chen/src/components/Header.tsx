'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User, Settings, CreditCard, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              SaaS Dashboard
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-900 hover:text-gray-700">
                  Dashboard
                </Link>
                <Link href="/settings" className="text-gray-900 hover:text-gray-700">
                  Settings
                </Link>
                <Link href="/billing" className="text-gray-900 hover:text-gray-700">
                  Billing
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-gray-900 hover:text-gray-700">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                  Get Started
                </Link>
              </>
            )}
          </nav>
          
          {session && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block">{session.user?.name || session.user?.email}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <Link
                    href="/billing"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}