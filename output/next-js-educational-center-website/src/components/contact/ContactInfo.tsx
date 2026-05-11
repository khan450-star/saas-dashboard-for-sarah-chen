import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Education Street', 'Learning City, LC 12345', 'United States']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@educenter.com', 'support@educenter.com']
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Contact Information
        </h2>
        <p className="text-gray-600">
          We're here to help! Reach out to us through any of the following methods, 
          and we'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="space-y-6">
        {contactDetails.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="bg-primary-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Quick Response
        </h3>
        <p className="text-gray-600">
          For urgent inquiries, please call us directly. We typically respond to 
          emails within 24 hours during business days.
        </p>
      </div>
    </div>
  )
}