import { Target, Eye, Heart } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To democratize quality education by making world-class learning accessible to everyone, everywhere.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'A world where anyone can unlock their potential through transformative educational experiences.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Excellence, accessibility, innovation, and genuine care for every learner\'s success and growth.'
  }
]

export function MissionSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}