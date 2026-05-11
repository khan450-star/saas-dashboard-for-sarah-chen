interface MetricCardProps {
  title: string
  value: string
  change: string
  period: string
}

export default function MetricCard({ title, value, change, period }: MetricCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="card p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <div className="flex items-center text-sm">
        <span className={`font-medium mr-1 ${
          isPositive ? 'text-success-600' : 'text-danger-600'
        }`}>
          {change}
        </span>
        <span className="text-gray-500">{period}</span>
      </div>
    </div>
  )
}