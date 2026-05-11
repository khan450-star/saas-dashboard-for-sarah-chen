import { NextResponse } from 'next/server'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastSeen: '2024-01-15T10:30:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastSeen: '2024-01-15T09:15:00Z' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastSeen: '2024-01-10T14:20:00Z' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastSeen: '2024-01-15T11:45:00Z' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'pending', lastSeen: '2024-01-12T16:30:00Z' },
]

export async function GET() {
  return NextResponse.json(mockUsers)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newUser = {
    id: mockUsers.length + 1,
    ...body,
    status: 'pending',
    lastSeen: new Date().toISOString()
  }
  mockUsers.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}