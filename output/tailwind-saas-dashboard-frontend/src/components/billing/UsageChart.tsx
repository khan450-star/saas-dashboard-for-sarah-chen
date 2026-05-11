'use client'

import Chart from '../ui/Chart'

export default function UsageChart() {
  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Storage Used</span>
          <span className="text-sm font-medium text-gray-900">45.2 GB / 100 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45.2%' }} />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">API Calls</span>
          <span className="text-sm font-medium text-gray-900">8,247 / 10,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-warning-500 h-2 rounded-full" style={{ width: '82.47%' }} />
        </div>
      </div>
      
      <Chart type="line" height={200} />
    </div>
  )
}