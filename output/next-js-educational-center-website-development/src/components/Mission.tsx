export default function Mission() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At EduCenter, we believe that education is the key to unlocking human potential. 
              Our mission is to democratize access to high-quality education by connecting 
              learners with world-class instructors and cutting-edge content.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're committed to creating an inclusive learning environment where everyone 
              can develop new skills, advance their careers, and pursue their passions 
              regardless of their background or location.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
              alt="Students learning together"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { Mission }