'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

const courses = [
  {
    id: '1',
    title: 'Complete Web Development',
    instructor: 'John Doe',
    students: 1250,
    status: 'Published',
    revenue: '$24,750'
  },
  {
    id: '2',
    title: 'Data Science with Python',
    instructor: 'Jane Smith',
    students: 890,
    status: 'Published',
    revenue: '$44,550'
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Mike Johnson',
    students: 670,
    status: 'Draft',
    revenue: '$0'
  }
]

export function CourseManagement() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Course Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-medium text-gray-700">Course</th>
              <th className="text-left py-3 font-medium text-gray-700">Instructor</th>
              <th className="text-left py-3 font-medium text-gray-700">Students</th>
              <th className="text-left py-3 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 font-medium text-gray-700">Revenue</th>
              <th className="text-left py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-gray-100">
                <td className="py-3">
                  <div className="font-medium text-gray-900">{course.title}</div>
                </td>
                <td className="py-3 text-gray-600">{course.instructor}</td>
                <td className="py-3 text-gray-600">{course.students.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="py-3 text-gray-900 font-medium">{course.revenue}</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}