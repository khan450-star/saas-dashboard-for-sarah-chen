import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of students already learning on our platform. 
          Start your journey today and unlock your potential.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/courses" 
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Browse Courses
          </Link>
          <Link 
            href="/api/auth/signin" 
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </section>
  )
}