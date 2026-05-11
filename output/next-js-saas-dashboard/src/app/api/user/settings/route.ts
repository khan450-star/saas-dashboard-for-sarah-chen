import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const settingsSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).optional(),
})

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = settingsSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}

    if (data.name) {
      updateData.name = data.name
    }

    if (data.email) {
      updateData.email = data.email
    }

    if (data.newPassword && data.currentPassword) {
      if (!user.password) {
        return NextResponse.json(
          { error: 'No current password set' },
          { status: 400 }
        )
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        data.currentPassword,
        user.password
      )

      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      updateData.password = await bcrypt.hash(data.newPassword, 12)
    }

    await prisma.user.update({
      where: { id: user.id },
      data: updateData
    })

    return NextResponse.json(
      { message: 'Settings updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}