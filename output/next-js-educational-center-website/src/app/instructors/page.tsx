import { InstructorGrid } from '@/components/instructors/InstructorGrid'
import { BecomeInstructor } from '@/components/instructors/BecomeInstructor'

export default function InstructorsPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Instructors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry professionals and experienced educators who are passionate 
            about sharing their knowledge and helping you succeed.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <InstructorGrid />
        </div>
      </section>
      
      <BecomeInstructor />
    </div>
  )
}