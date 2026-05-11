'use client'
import { useState } from 'react'

export default function CourseFilters() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing'
  ]

  const levels = ['Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Level</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="level"
                value={level}
                checked={selectedLevel === level}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-600">{level}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => {
          setSelectedCategory('')
          setSelectedLevel('')
        }}
        className="btn-secondary w-full"
      >
        Clear Filters
      </button>
    </div>
  )
}

export { CourseFilters }