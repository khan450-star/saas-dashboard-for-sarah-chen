import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export default function Hero() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm{' '}
          <span className="text-gradient">John Doe</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          A passionate <strong>Full Stack Developer</strong> who loves building 
          beautiful, functional, and user-centered digital experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2">
            View My Work
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button className="btn-secondary inline-flex items-center gap-2">
            Download CV
            <Download className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">5+</div>
            <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">30+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
            <div className="text-gray-600 dark:text-gray-400">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}