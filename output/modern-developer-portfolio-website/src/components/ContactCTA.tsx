import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Mail className="h-16 w-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-xl mb-8 opacity-90">
          Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            Get In Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a 
            href="mailto:john.doe@example.com" 
            className="border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors duration-200"
          >
            Send Email
          </a>
        </div>
      </div>
    </section>
  )
}