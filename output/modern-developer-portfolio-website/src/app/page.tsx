import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import SkillsOverview from '@/components/SkillsOverview'
import ContactCTA from '@/components/ContactCTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <ContactCTA />
    </div>
  )
}