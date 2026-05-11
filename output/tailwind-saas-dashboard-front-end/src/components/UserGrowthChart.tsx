'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', users: 1200 },
  { name: 'Feb', users: 1500 },
  { name: 'Mar', users: 1800 },
  { name: 'Apr', users: 2100 },
  { name: 'May', users: 2300 },
  { name: 'Jun', users: 2450 },
  { name: 'Jul', users: 2543 },
]

export default function UserGrowthChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}