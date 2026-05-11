import { Sidebar } from '@/components/Sidebar'
import { UserTable } from '@/components/UserTable'

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add User
            </button>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  )
}