export default function ContactInfo() {
  const contactDetails = [
    {
      icon: '📧',
      title: 'Email',
      info: 'hello@educenter.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📞',
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: '📍',
      title: 'Address',
      info: '123 Education Street, Learning City, LC 12345',
      description: 'Visit our office'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      info: 'Available 24/7',
      description: 'Chat with our support team'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Get in touch
        </h3>
        <p className="text-gray-600 leading-relaxed">
          We're here to help and answer any question you might have. 
          We look forward to hearing from you.
        </p>
      </div>
      
      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-2xl">{detail.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {detail.title}
              </h4>
              <p className="text-primary-600 font-medium mb-1">
                {detail.info}
              </p>
              <p className="text-gray-600 text-sm">
                {detail.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card p-6 bg-primary-50 border-primary-200">
        <h4 className="font-semibold text-gray-900 mb-2">
          Frequently Asked Questions
        </h4>
        <p className="text-gray-600 text-sm mb-3">
          Find answers to common questions in our FAQ section.
        </p>
        <a href="/faq" className="text-primary-600 font-medium text-sm hover:underline">
          Visit FAQ →
        </a>
      </div>
    </div>
  )
}

export { ContactInfo }