export default function AnalyticsOverview() {
  const metrics = [
    {
      name: 'Page Views',
      value: '12,543',
      change: '+15%',
      changeType: 'increase',
    },
    {
      name: 'Unique Visitors',
      value: '3,241',
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Bounce Rate',
      value: '34.5%',
      change: '-3%',
      changeType: 'decrease',
    },
    {
      name: 'Avg. Session Duration',
      value: '4m 23s',
      change: '+12%',
      changeType: 'increase',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.name} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
            <div className={`text-sm font-semibold ${
              (metric.changeType === 'increase' && !metric.name.includes('Bounce')) ||
              (metric.changeType === 'decrease' && metric.name.includes('Bounce'))
                ? 'text-success-600' 
                : 'text-danger-600'
            }`}>
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}