import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          Learn Without
          <span className="text-primary-600 block">Limits</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover thousands of courses from expert instructors and advance your career 
          with our comprehensive online learning platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/courses" className="btn-primary text-lg px-8 py-3">
            Browse Courses
          </Link>
          <Link href="/about" className="btn-secondary text-lg px-8 py-3">
            Learn More
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Expert Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
            <div className="text-gray-600">Professional Instructors</div>
          </div>
        </div>
      </div>
    </section>
  )
}