import { CourseGrid } from '@/components/CourseGrid'
import { CourseFilters } from '@/components/CourseFilters'

export default function Courses() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to help you achieve your learning goals.
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
    </div>
  )
}