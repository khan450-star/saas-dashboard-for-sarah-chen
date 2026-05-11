import { CourseGrid } from '@/components/courses/CourseGrid'
import { CourseFilters } from '@/components/courses/CourseFilters'

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive collection of courses designed to help you learn new skills and advance your career.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <CourseFilters />
        </aside>
        
        <main className="lg:w-3/4">
          <CourseGrid />
        </main>
      </div>
    </div>
  )
}