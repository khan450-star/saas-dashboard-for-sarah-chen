'use client'

import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Welcome back!
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5zM13.21 13.21L9 9h6l6 3 2 1" />
                </svg>
              </button>
            </div>
            
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5zM4 3h16v7a4 4 0 01-4 4H8a4 4 0 01-4-4V3z" />
                </svg>
              </button>
            </div>
            
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <a
                href="/api/auth/signin"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Sign in
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}