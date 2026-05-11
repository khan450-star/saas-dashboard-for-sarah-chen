import ReportsOverview from '@/components/ReportsOverview'
import SalesChart from '@/components/SalesChart'

export default function Reports() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reports
            </h1>
            <p className="text-gray-600">
              Generate and view detailed reports on your business performance.
            </p>
          </div>
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
        
        <ReportsOverview />
        
        <div className="mt-8">
          <SalesChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Monthly Sales Report</p>
                  <p className="text-sm text-gray-600">Generated 2 days ago</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">User Activity Report</p>
                  <p className="text-sm text-gray-600">Generated 5 days ago</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Revenue Analysis</p>
                  <p className="text-sm text-gray-600">Generated 1 week ago</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700">
                  Download
                </button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select className="input">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select className="input">
                  <option>Sales Report</option>
                  <option>User Report</option>
                  <option>Revenue Report</option>
                  <option>Performance Report</option>
                </select>
              </div>
              <button className="btn btn-primary w-full">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}