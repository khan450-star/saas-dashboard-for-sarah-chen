interface PlanCardProps {
  name: string
  price: number
  period: string
  features: string[]
  current: boolean
}

export default function PlanCard({ name, price, period, features, current }: PlanCardProps) {
  return (
    <div className={`border-2 rounded-lg p-6 relative ${
      current ? 'border-primary-500' : 'border-gray-200'
    }`}>
      {current && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-3 py-1 text-xs font-medium rounded-full">
            Current Plan
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="text-3xl font-bold text-gray-900">
          ${price}
          <span className="text-base font-normal text-gray-500">/{period}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button className={`w-full btn ${
        current ? 'btn-secondary' : 'btn-primary'
      }`}>
        {current ? 'Current Plan' : 'Upgrade'}
      </button>
    </div>
  )
}