'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface CourseDetailsProps {
  course: {
    id: string
    title: string
    description: string
    price: number
    image: string | null
    category: string
    level: string
    duration: string
    instructor: string
    enrollments: any[]
  }
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const { data: session } = useSession()
  const [enrolling, setEnrolling] = useState(false)

  const handleEnroll = async () => {
    if (!session) {
      window.location.href = '/api/auth/signin'
      return
    }

    setEnrolling(true)
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Failed to enroll in course')
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="relative h-64 mb-8">
                <Image
                  src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                  alt={course.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {course.level}
                </span>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instructor</h3>
                  <p className="text-gray-600">{course.instructor}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-gray-600">{course.duration}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600">
                  {course.enrollments.length} students enrolled
                </p>
              </div>
              
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="btn-primary w-full mb-4 disabled:opacity-50"
              >
                {enrolling ? 'Processing...' : 'Enroll Now'}
              </button>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>30-day money-back guarantee</span>
                  <span>✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Lifetime access</span>
                  <span>✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificate of completion</span>
                  <span>✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CourseDetails }