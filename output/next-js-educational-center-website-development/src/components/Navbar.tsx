'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            EduCenter
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-primary-600 transition-colors">
              Courses
            </Link>
            <Link href="/instructors" className="text-gray-700 hover:text-primary-600 transition-colors">
              Instructors
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            {session && (
              <Link href="/portal" className="text-gray-700 hover:text-primary-600 transition-colors">
                Portal
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-700">Hi, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/courses" className="block py-2 text-gray-700 hover:text-primary-600">
              Courses
            </Link>
            <Link href="/instructors" className="block py-2 text-gray-700 hover:text-primary-600">
              Instructors
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary-600">
              Contact
            </Link>
            {session && (
              <Link href="/portal" className="block py-2 text-gray-700 hover:text-primary-600">
                Portal
              </Link>
            )}
            <div className="mt-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="btn-secondary w-full"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="btn-primary w-full"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export { Navbar }