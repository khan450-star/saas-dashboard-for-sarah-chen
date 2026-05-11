'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useQuery } from '@tanstack/react-query'

export default function AnalyticsCharts() {
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
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card h-96 animate-pulse bg-gray-100"></div>
        ))}
      </div>
    )
  }

  const revenueData = analytics?.filter((item: any) => item.event === 'revenue').slice(0, 14) || []
  const pageViewData = analytics?.filter((item: any) => item.event === 'page_view').slice(0, 14) || []
  const signupData = analytics?.filter((item: any) => item.event === 'user_signup').slice(0, 14) || []

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics (14 Days)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pageViewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Signups Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h4>
          <p className="text-2xl font-bold text-gray-900">
            ${revenueData.reduce((sum: number, item: any) => sum + item.value, 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
        </div>
        
        <div className="card">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Page Views</h4>
          <p className="text-2xl font-bold text-gray-900">
            {pageViewData.reduce((sum: number, item: any) => sum + item.value, 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">+8.2% from last period</p>
        </div>
        
        <div className="card">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Signups</h4>
          <p className="text-2xl font-bold text-gray-900">
            {signupData.reduce((sum: number, item: any) => sum + item.value, 0).toLocaleString()}
          </p>
          <p className="text-sm text-red-600 mt-1">-2.1% from last period</p>
        </div>
      </div>
    </div>
  )
}