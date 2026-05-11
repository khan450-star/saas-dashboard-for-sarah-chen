export default function Values() {
  const values = [
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in course content and instruction quality.',
      icon: '⭐'
    },
    {
      title: 'Accessibility',
      description: 'Education should be available to everyone, regardless of background or circumstance.',
      icon: '🌍'
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve our platform to provide the best learning experience.',
      icon: '🚀'
    },
    {
      title: 'Community',
      description: 'Learning is better together. We foster a supportive community of learners.',
      icon: '🤝'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape the experience we create for our learners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Values }