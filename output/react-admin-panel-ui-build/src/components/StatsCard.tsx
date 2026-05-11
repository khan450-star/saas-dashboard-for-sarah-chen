interface StatsCardProps {
  title: string
  value: string
  change: string
}

export function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="text-lg font-medium text-gray-500">{title}</div>
          </div>
        </div>
        <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-gray-900">
            {value}
          </div>
          <div
            className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 ${
              isPositive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {change}
          </div>
        </div>
      </div>
    </div>
  )
}