'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'

export function CourseFilters() {
  const [filters, setFilters] = useState({
    level: '',
    category: '',
    priceRange: '',
  })

  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const categories = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing']
  const priceRanges = [
    { label: 'Free', value: 'free' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100+' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Level Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Level</h4>
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="level"
                  value={level}
                  checked={filters.level === level}
                  onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => setFilters({ level: '', category: '', priceRange: '' })}
          className="w-full btn-secondary"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}