import ContactForm from '@/components/ContactForm'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="section-padding max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I'm always interested in new opportunities and interesting projects. 
          Let's discuss how we can work together.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600 dark:text-gray-300">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600 dark:text-gray-300">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}