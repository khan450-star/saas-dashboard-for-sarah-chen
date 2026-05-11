import Link from 'next/link'
import { CourseCard } from '@/components/courses/CourseCard'

const featuredCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
    price: 99.99,
    duration: '40 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    instructor: {
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    },
    enrollmentCount: 1250
  },
  {
    id: '2',
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning',
    price: 149.99,
    duration: '60 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    instructor: {
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612c7d3?w=50&h=50&fit=crop&crop=face'
    },
    enrollmentCount: 890
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, Figma, and user research methods',
    price: 79.99,
    duration: '30 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=250&fit=crop',
    instructor: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    },
    enrollmentCount: 670
  }
]

export function FeaturedCourses() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our most popular courses and start your learning journey today
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/courses" className="btn-primary text-lg px-8 py-3">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  )
}