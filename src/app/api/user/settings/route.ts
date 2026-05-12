import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { updateProfileSchema, changePasswordSchema } from '@/lib/validations'
import { z } from 'zod'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, ...data } = body

    if (type === 'profile') {
      const { name, email } = updateProfileSchema.parse(data)
      
      // Check if email is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: session.user.id }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already taken' },
          { status: 400 }
        )
      }

      await prisma.user.update({
        where: { id: session.user.id },
        data: { name, email },
      })

      return NextResponse.json({ message: 'Profile updated successfully' })
    }

    if (type === 'password') {
      const { currentPassword, newPassword } = changePasswordSchema.parse(data)
      
      // Get user with password
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      })

      if (!user?.hashedPassword) {
        return NextResponse.json(
          { message: 'No password set for this account' },
          { status: 400 }
        )
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword)
      
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12)

      await prisma.user.update({
        where: { id: session.user.id },
        data: { hashedPassword: hashedNewPassword },
      })

      return NextResponse.json({ message: 'Password changed successfully' })
    }

    return NextResponse.json(
      { message: 'Invalid request type' },
      { status: 400 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Settings update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}