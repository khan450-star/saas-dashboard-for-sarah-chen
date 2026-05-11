'use client'

import { Play, Clock, BarChart3 } from 'lucide-react'

const enrolledCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    progress: 65,
    nextLesson: 'React Hooks Deep Dive',
    timeLeft: '2h 30m',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop'
  },
  {
    id: '2',
    title: 'Data Science with Python',
    instructor: 'Jane Smith',
    progress: 42,
    nextLesson: 'Machine Learning Basics',
    timeLeft: '4h 15m',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop'
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Mike Johnson',
    progress: 88,
    nextLesson: 'User Testing Methods',
    timeLeft: '45m',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=80&h=80&fit=crop'
  }
]

export function EnrolledCourses() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Continue Learning
        </h2>
        <a href="/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All Courses
        </a>
      </div>
      
      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {course.instructor}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      {course.nextLesson}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.timeLeft}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  {course.progress}% Complete
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <button className="btn-primary text-sm px-4 py-2">
                  Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}