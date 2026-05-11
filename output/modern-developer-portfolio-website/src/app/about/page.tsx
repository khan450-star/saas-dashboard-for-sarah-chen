import Image from 'next/image'
import { Calendar, MapPin, Coffee } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="section-padding max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            I'm a passionate full-stack developer with over 5 years of experience 
            building modern web applications. I love creating digital experiences 
            that are both beautiful and functional.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open source projects, or enjoying a good cup of coffee 
            while reading about the latest industry trends.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary-600" />
              <span>5+ years of experience</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary-600" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee className="h-5 w-5 text-primary-600" />
              <span>Coffee enthusiast</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
              alt="John Doe"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">My Journey</h2>
        <div className="space-y-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Senior Full Stack Developer</h3>
            <p className="text-primary-600 mb-2">Tech Company • 2021 - Present</p>
            <p className="text-gray-600 dark:text-gray-300">
              Leading development of enterprise web applications using React, Node.js, and cloud technologies.
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
            <p className="text-primary-600 mb-2">Startup Inc • 2019 - 2021</p>
            <p className="text-gray-600 dark:text-gray-300">
              Built scalable web applications from scratch, implementing both frontend and backend solutions.
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Frontend Developer</h3>
            <p className="text-primary-600 mb-2">Web Agency • 2018 - 2019</p>
            <p className="text-gray-600 dark:text-gray-300">
              Developed responsive websites and web applications with focus on user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}