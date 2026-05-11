import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedCourses() {
  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      level: 'Beginner',
      students: 2341
    },
    {
      id: '2',
      title: 'Advanced React and Node.js',
      instructor: 'Mike Chen',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      level: 'Advanced',
      students: 1876
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Davis',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      level: 'Intermediate',
      students: 3242
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start learning with our most popular courses taught by industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded text-sm">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  by {course.instructor}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ${course.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {course.students.toLocaleString()} students
                  </span>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className="btn-primary w-full text-center block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/courses" className="btn-secondary">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  )
}

export { FeaturedCourses }