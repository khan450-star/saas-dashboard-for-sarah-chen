import Link from 'next/link'
import { Clock, Users, BarChart3 } from 'lucide-react'

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    price: number
    duration: string
    level: string
    image?: string
    instructor: {
      name: string
      image?: string
    }
    enrollmentCount?: number
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <span className="text-primary-600 font-semibold text-lg">
              {course.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
          ${course.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-1" />
            {course.level}
          </div>
          {course.enrollmentCount && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {course.enrollmentCount.toLocaleString()}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {course.instructor.image ? (
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">
                  {course.instructor.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-700">
              {course.instructor.name}
            </span>
          </div>
          
          <Link
            href={`/courses/${course.id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  )
}