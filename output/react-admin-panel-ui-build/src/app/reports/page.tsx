'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('sales')
  
  const reports = [
    { id: 'sales', name: 'Sales Report', description: 'Monthly sales performance' },
    { id: 'users', name: 'User Activity', description: 'User engagement metrics' },
    { id: 'inventory', name: 'Inventory Report', description: 'Stock levels and movements' },
    { id: 'financial', name: 'Financial Summary', description: 'Revenue and expense breakdown' },
  ]
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Available Reports</h2>
                <div className="space-y-2">
                  {reports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedReport === report.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Report Preview</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">Report preview will appear here</div>
                    <div className="text-sm text-gray-400">Select a report type to view details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}