'use client'

import { useState, useEffect } from 'react'
import { CourseCard } from './CourseCard'

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: string
  image?: string
  instructor: {
    id: string
    name: string
    image?: string
  }
  _count: {
    enrollments: number
  }
}

export function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No courses available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={{
            id: course.id,
            title: course.title,
            description: course.description,
            price: course.price,
            duration: course.duration,
            level: course.level,
            image: course.image,
            instructor: {
              name: course.instructor.name,
              image: course.instructor.image
            },
            enrollmentCount: course._count.enrollments
          }}
        />
      ))}
    </div>
  )
}