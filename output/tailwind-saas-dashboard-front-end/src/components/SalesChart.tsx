'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', sales: 4000, target: 4500 },
  { month: 'Feb', sales: 3000, target: 3500 },
  { month: 'Mar', sales: 5000, target: 4800 },
  { month: 'Apr', sales: 4500, target: 4200 },
  { month: 'May', sales: 6000, target: 5500 },
  { month: 'Jun', sales: 5500, target: 5800 },
  { month: 'Jul', sales: 7000, target: 6500 },
  { month: 'Aug', sales: 6800, target: 6800 },
  { month: 'Sep', sales: 7500, target: 7200 },
  { month: 'Oct', sales: 8000, target: 7800 },
  { month: 'Nov', sales: 8500, target: 8200 },
  { month: 'Dec', sales: 9000, target: 8800 },
]

export default function SalesChart() {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
        <div className="flex space-x-3">
          <select className="input w-32">
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className="input w-32">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              name="Actual Sales"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}