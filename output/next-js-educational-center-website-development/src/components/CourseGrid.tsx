'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Course {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  level: string
  instructor: string
  _count: { enrollments: number }
}

export default function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="card hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48">
            <Image
              src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-2 py-1 rounded text-sm">
                {course.level}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-2">
              by {course.instructor}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              {course.description.substring(0, 100)}...
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-primary-600">
                ${course.price}
              </span>
              <span className="text-gray-500 text-sm">
                {course._count.enrollments} students
              </span>
            </div>
            <Link
              href={`/courses/${course.id}`}
              className="btn-primary w-full text-center block"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export { CourseGrid }