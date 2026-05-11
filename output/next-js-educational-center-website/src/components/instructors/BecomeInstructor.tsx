import { Users, BookOpen, DollarSign, Award } from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Reach Global Audience',
    description: 'Share your knowledge with thousands of students worldwide'
  },
  {
    icon: BookOpen,
    title: 'Create Impact',
    description: 'Help students achieve their goals and transform their careers'
  },
  {
    icon: DollarSign,
    title: 'Earn Revenue',
    description: 'Generate income from your expertise and teaching passion'
  },
  {
    icon: Award,
    title: 'Build Authority',
    description: 'Establish yourself as an expert in your field'
  }
]

export function BecomeInstructor() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Become an Instructor
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Share your expertise, inspire students, and earn money doing what you love
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-primary-100">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
        
        <div className="text-center">
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 mr-4">
            Start Teaching
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}