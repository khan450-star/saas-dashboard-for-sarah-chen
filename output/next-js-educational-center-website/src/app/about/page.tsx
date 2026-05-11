import { TeamSection } from '@/components/about/TeamSection'
import { MissionSection } from '@/components/about/MissionSection'
import { StatsSection } from '@/components/about/StatsSection'

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Our Educational Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing world-class education and empowering learners 
            to achieve their goals through innovative online learning experiences.
          </p>
        </div>
      </section>
      
      <MissionSection />
      <StatsSection />
      <TeamSection />
    </div>
  )
}