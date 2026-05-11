'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', visitors: 1200, pageViews: 2400 },
  { name: 'Tue', visitors: 1900, pageViews: 4200 },
  { name: 'Wed', visitors: 800, pageViews: 1800 },
  { name: 'Thu', visitors: 1600, pageViews: 3200 },
  { name: 'Fri', visitors: 2200, pageViews: 4800 },
  { name: 'Sat', visitors: 1400, pageViews: 2800 },
  { name: 'Sun', visitors: 1000, pageViews: 2000 },
]

export default function TrafficChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Traffic</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#3b82f6" name="Visitors" />
            <Bar dataKey="pageViews" fill="#10b981" name="Page Views" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}