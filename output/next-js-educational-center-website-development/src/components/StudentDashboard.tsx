'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Enrollment {
  id: string
  status: string
  course: {
    id: string
    title: string
    instructor: string
    image: string | null
  }
}

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchEnrollments()
    }
  }, [session])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments')
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data)
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-32 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {enrollments.length}
          </div>
          <div className="text-gray-600">Enrolled Courses</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {enrollments.filter(e => e.status === 'COMPLETED').length}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {enrollments.filter(e => e.status === 'ACTIVE').length}
          </div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {enrollments.length * 15}h
          </div>
          <div className="text-gray-600">Learning Time</div>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <Link href="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
        
        {enrollments.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your learning journey by enrolling in a course.
            </p>
            <Link href="/courses" className="btn-primary">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="card hover:shadow-lg transition-shadow">
                <div className="relative h-32 bg-gradient-to-r from-primary-400 to-primary-600">
                  {enrollment.course.image && (
                    <img
                      src={enrollment.course.image}
                      alt={enrollment.course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      enrollment.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                      enrollment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    by {enrollment.course.instructor}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/courses/${enrollment.course.id}`}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      View Course
                    </Link>
                    {enrollment.status === 'ACTIVE' && (
                      <span className="text-sm text-gray-500">Continue Learning</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { StudentDashboard }