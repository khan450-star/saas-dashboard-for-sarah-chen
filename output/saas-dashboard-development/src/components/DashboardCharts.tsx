'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useQuery } from '@tanstack/react-query'

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']

export default function DashboardCharts() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch('/api/analytics')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card h-80 animate-pulse bg-gray-100"></div>
        ))}
      </div>
    )
  }

  // Process data for different chart types
  const revenueData = analytics?.filter((item: any) => item.event === 'revenue').slice(0, 7) || []
  const pageViewData = analytics?.filter((item: any) => item.event === 'page_view').slice(0, 7) || []
  const signupData = analytics?.filter((item: any) => item.event === 'user_signup').slice(0, 7) || []
  
  const pieData = [
    { name: 'Revenue', value: revenueData.reduce((sum: number, item: any) => sum + item.value, 0) },
    { name: 'Page Views', value: pageViewData.reduce((sum: number, item: any) => sum + item.value, 0) },
    { name: 'Signups', value: signupData.reduce((sum: number, item: any) => sum + item.value, 0) * 100 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pageViewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Signups</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={signupData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Metrics Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}