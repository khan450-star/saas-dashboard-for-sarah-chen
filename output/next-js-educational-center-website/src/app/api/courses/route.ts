import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const instructor = searchParams.get('instructor')
    
    const courses = await prisma.course.findMany({
      where: {
        ...(level && { level }),
        ...(instructor && { instructorId: instructor })
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    })
    
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'INSTRUCTOR')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { title, description, price, duration, level, image } = body
    
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        duration,
        level,
        image,
        instructorId: session.user.id
      }
    })
    
    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}