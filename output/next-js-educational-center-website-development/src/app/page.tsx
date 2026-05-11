import { Hero } from '@/components/Hero'
import { FeaturedCourses } from '@/components/FeaturedCourses'
import { Stats } from '@/components/Stats'
import { Testimonials } from '@/components/Testimonials'
import { Newsletter } from '@/components/Newsletter'

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedCourses />
      <Testimonials />
      <Newsletter />
    </div>
  )
}