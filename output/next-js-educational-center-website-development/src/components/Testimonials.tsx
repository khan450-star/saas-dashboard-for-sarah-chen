export default function Testimonials() {
  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'Software Engineer',
      content: 'The courses here helped me transition from marketing to software development. The instructors are amazing!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    {
      name: 'Jessica Wang',
      role: 'Data Scientist',
      content: 'I learned more in 3 months here than I did in my entire college program. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100'
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      content: 'The practical approach and real-world projects made all the difference in my career growth.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Testimonials }