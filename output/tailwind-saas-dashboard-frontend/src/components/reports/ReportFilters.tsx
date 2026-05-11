'use client'

interface ReportFiltersProps {
  dateRange: string
  reportType: string
  onDateRangeChange: (value: string) => void
  onReportTypeChange: (value: string) => void
}

export default function ReportFilters({
  dateRange,
  reportType,
  onDateRangeChange,
  onReportTypeChange,
}: ReportFiltersProps) {
  const dateRangeOptions = [
    { label: 'Last 7 days', value: 'last-7-days' },
    { label: 'Last 30 days', value: 'last-30-days' },
    { label: 'Last 3 months', value: 'last-3-months' },
    { label: 'Last 12 months', value: 'last-12-months' },
  ]

  const reportTypeOptions = [
    { label: 'All Reports', value: 'all' },
    { label: 'User Activity', value: 'user-activity' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Performance', value: 'performance' },
    { label: 'Security', value: 'security' },
  ]

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="input"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => onReportTypeChange(e.target.value)}
            className="input"
          >
            {reportTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}