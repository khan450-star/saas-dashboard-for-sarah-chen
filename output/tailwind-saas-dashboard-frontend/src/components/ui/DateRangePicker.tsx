'use client'

import { useState } from 'react'

export default function DateRangePicker() {
  const [dateRange, setDateRange] = useState('last-7-days')

  const options = [
    { label: 'Last 7 days', value: 'last-7-days' },
    { label: 'Last 30 days', value: 'last-30-days' },
    { label: 'Last 3 months', value: 'last-3-months' },
    { label: 'Last 12 months', value: 'last-12-months' },
  ]

  return (
    <select
      value={dateRange}
      onChange={(e) => setDateRange(e.target.value)}
      className="input min-w-48"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}