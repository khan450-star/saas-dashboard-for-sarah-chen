export function StatsSection() {
  const stats = [
    {
      number: '50,000+',
      label: 'Students Worldwide',
      description: 'Learners from over 100 countries'
    },
    {
      number: '500+',
      label: 'Expert Courses',
      description: 'Across 20+ categories'
    },
    {
      number: '200+',
      label: 'Industry Experts',
      description: 'Professional instructors'
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Course completion rate'
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These numbers represent real people achieving real success through our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}