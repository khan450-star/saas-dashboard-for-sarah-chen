import { InstructorGrid } from '@/components/InstructorGrid'

export default function Instructors() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Instructors</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts and experienced professionals who are passionate about teaching.
          </p>
        </div>
        
        <InstructorGrid />
      </div>
    </div>
  )
}