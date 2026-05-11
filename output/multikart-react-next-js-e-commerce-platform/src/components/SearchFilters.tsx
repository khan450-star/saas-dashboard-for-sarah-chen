'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
}

interface SearchFiltersProps {
  categories: Category[]
}

export default function SearchFilters({ categories }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  
  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || ''

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    router.push(`/products?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters('search', search)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Search</h3>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="btn-primary w-full mt-2">
            Search
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters('category', '')}
            className={`block w-full text-left p-2 rounded ${!currentCategory ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilters('category', category.slug)}
              className={`block w-full text-left p-2 rounded ${currentCategory === category.slug ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="form-input"
        >
          <option value="">Newest First</option>
          <option value="name">Name A-Z</option>
          <option value="price-low">Price Low to High</option>
          <option value="price-high">Price High to Low</option>
        </select>
      </div>
    </div>
  )
}