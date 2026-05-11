export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-primary-600">EduCenter</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone, everywhere. 
            Join millions of learners who are advancing their careers and enriching their lives through our platform.
          </p>
        </div>
      </div>
    </section>
  )
}

export { AboutHero }