'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
  name: string
  users: number
}

export default function UserGrowthChart() {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    // Simulate chart data
    const chartData = [
      { name: 'Jan', users: 400 },
      { name: 'Feb', users: 600 },
      { name: 'Mar', users: 800 },
      { name: 'Apr', users: 1200 },
      { name: 'May', users: 1000 },
      { name: 'Jun', users: 1400 },
      { name: 'Jul', users: 1800 },
    ]
    setData(chartData)
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}