import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Without
            <span className="text-primary-600 block">Limits</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover thousands of courses from expert instructors and advance your career with our comprehensive online learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary">
              Explore Courses
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }