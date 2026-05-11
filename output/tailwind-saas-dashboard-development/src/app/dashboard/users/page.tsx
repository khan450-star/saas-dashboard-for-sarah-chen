import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import UserTable from '@/components/UserTable'
import UserStats from '@/components/UserStats'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      subscriptions: {
        select: {
          status: true,
          plan: true,
        },
        take: 1,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
      </div>

      <UserStats users={users} />
      <UserTable users={users} />
    </div>
  )
}