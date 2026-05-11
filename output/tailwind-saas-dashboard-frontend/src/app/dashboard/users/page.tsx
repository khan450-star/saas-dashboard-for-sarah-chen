'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import UserTable from '@/components/users/UserTable'
import UserModal from '@/components/users/UserModal'
import SearchInput from '@/components/ui/SearchInput'
import FilterDropdown from '@/components/ui/FilterDropdown'

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filterOptions = [
    { label: 'All Users', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage your application users and their permissions.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Add New User
          </button>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchInput 
                placeholder="Search users..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <FilterDropdown 
              options={filterOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
            />
          </div>
          
          <UserTable searchTerm={searchTerm} statusFilter={statusFilter} />
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  )
}