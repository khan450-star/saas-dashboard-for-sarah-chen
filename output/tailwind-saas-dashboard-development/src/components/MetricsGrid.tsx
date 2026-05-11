'use client'

interface AnalyticsData {
  id: string
  metric: string
  value: number
  date: Date
}

interface MetricsGridProps {
  analytics: AnalyticsData[]
}

export default function MetricsGrid({ analytics }: MetricsGridProps) {
  const getLatestMetric = (metric: string) => {
    const items = analytics.filter(item => item.metric === metric)
    return items.length > 0 ? items[0].value : 0
  }

  const metrics = [
    {
      name: 'Total Revenue',
      value: `$${getLatestMetric('revenue').toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Active Sessions',
      value: getLatestMetric('sessions').toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      name: 'Bounce Rate',
      value: `${getLatestMetric('bounceRate')}%`,
      change: '-2.1%',
      changeType: 'positive',
    },
    {
      name: 'Page Views',
      value: getLatestMetric('pageViews').toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="card">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{metric.name}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-green-600">{metric.change}</p>
          </div>
        </div>
      ))}
    </div>
  )
}