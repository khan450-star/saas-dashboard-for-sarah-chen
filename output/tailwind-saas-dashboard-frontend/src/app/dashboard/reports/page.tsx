'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ReportCard from '@/components/reports/ReportCard'
import ReportFilters from '@/components/reports/ReportFilters'
import Chart from '@/components/ui/Chart'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last-30-days')
  const [reportType, setReportType] = useState('all')

  const reports = [
    {
      title: 'User Activity Report',
      description: 'Detailed analysis of user engagement and activity patterns',
      lastGenerated: '2 hours ago',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'Revenue Report',
      description: 'Monthly revenue breakdown and financial metrics',
      lastGenerated: '1 day ago',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      title: 'Performance Report',
      description: 'Application performance and system metrics',
      lastGenerated: '3 days ago',
      format: 'PDF',
      size: '3.2 MB'
    },
    {
      title: 'Security Report',
      description: 'Security incidents and threat analysis',
      lastGenerated: '1 week ago',
      format: 'PDF',
      size: '1.1 MB'
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and download detailed reports about your application.</p>
          </div>
          <button className="btn btn-primary">
            Generate New Report
          </button>
        </div>

        <ReportFilters 
          dateRange={dateRange}
          reportType={reportType}
          onDateRangeChange={setDateRange}
          onReportTypeChange={setReportType}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Report Generation Trend</h3>
            <Chart type="line" height={300} />
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Report Types Distribution</h3>
            <Chart type="doughnut" height={300} />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <ReportCard key={index} {...report} />
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Report Analytics</h3>
          <Chart type="bar" height={400} />
        </div>
      </div>
    </DashboardLayout>
  )
}