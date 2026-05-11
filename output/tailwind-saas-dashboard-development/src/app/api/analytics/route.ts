import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const analytics = await prisma.analytics.findMany({
      take: 30,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { metric, value, date } = await request.json()

    const analytics = await prisma.analytics.create({
      data: {
        metric,
        value,
        date: date ? new Date(date) : new Date(),
      },
    })

    return NextResponse.json(analytics, { status: 201 })
  } catch (error) {
    console.error('Error creating analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}