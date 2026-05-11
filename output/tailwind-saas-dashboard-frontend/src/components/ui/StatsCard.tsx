interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export default function StatsCard({ title, value, change, trend }: StatsCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-success-600' : 'text-danger-600'
        }`}>
          <svg 
            className={`w-4 h-4 mr-1 ${
              trend === 'up' ? 'transform rotate-0' : 'transform rotate-180'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          {change}
        </div>
      </div>
    </div>
  )
}