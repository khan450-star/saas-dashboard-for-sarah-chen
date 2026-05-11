import { Hero } from '@/components/sections/Hero'
import { FeaturedCourses } from '@/components/sections/FeaturedCourses'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </div>
  )
}