'use client'

import { useState } from 'react'
import { Search, Shield, User, Crown } from 'lucide-react'

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'STUDENT',
    joinDate: '2024-01-15',
    courses: 5,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'INSTRUCTOR',
    joinDate: '2023-08-22',
    courses: 3,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'STUDENT',
    joinDate: '2024-02-10',
    courses: 2,
    status: 'Inactive'
  }
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Crown className="w-4 h-4 text-yellow-600" />
      case 'INSTRUCTOR':
        return <Shield className="w-4 h-4 text-blue-600" />
      default:
        return <User className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          User Management
        </h2>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-medium text-gray-700">User</th>
              <th className="text-left py-3 font-medium text-gray-700">Role</th>
              <th className="text-left py-3 font-medium text-gray-700">Courses</th>
              <th className="text-left py-3 font-medium text-gray-700">Join Date</th>
              <th className="text-left py-3 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100">
                <td className="py-3">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(user.role)}
                    <span className="text-gray-600">{user.role}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-600">{user.courses}</td>
                <td className="py-3 text-gray-600">{user.joinDate}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}