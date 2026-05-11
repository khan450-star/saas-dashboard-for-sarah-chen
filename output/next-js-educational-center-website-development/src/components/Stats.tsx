export default function Stats() {
  const stats = [
    { label: 'Active Students', value: '50,000+' },
    { label: 'Expert Instructors', value: '1,200+' },
    { label: 'Courses Available', value: '5,000+' },
    { label: 'Success Rate', value: '95%' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Stats }