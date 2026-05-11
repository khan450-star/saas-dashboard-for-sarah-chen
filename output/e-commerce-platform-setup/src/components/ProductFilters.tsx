'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  searchParams: {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function ProductFilters({ categories, searchParams }: Props) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || '');

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(currentSearchParams.toString());
    
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('category', null)}
            className={`block text-left w-full px-2 py-1 rounded text-sm ${
              !searchParams.category
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilter('category', category.slug)}
              className={`block text-left w-full px-2 py-1 rounded text-sm ${
                searchParams.category === category.slug
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={applyPriceFilter}
            className="btn btn-primary w-full text-sm"
          >
            Apply Price Filter
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Search</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const search = formData.get('search') as string;
            updateFilter('search', search || null);
          }}
        >
          <input
            name="search"
            type="text"
            placeholder="Search products..."
            defaultValue={searchParams.search || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
          />
          <button type="submit" className="btn btn-primary w-full text-sm">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}