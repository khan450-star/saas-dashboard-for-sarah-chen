'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  id: string
  metric: string
  value: number
  date: Date
}

interface AnalyticsChartProps {
  data: AnalyticsData[]
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = data
    .filter(item => item.metric === 'revenue')
    .slice(0, 7)
    .map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: item.value,
    }))
    .reverse()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value}`, 'Revenue']}
        />
        <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}