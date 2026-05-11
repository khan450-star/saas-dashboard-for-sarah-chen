import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const analytics = await prisma.analytics.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: 100,
    })

    // Group data by date and event type
    const groupedData = analytics.reduce((acc: any, item) => {
      const date = item.timestamp.toISOString().split('T')[0]
      const key = `${date}-${item.event}`
      
      if (!acc[key]) {
        acc[key] = {
          date,
          event: item.event,
          value: 0,
          count: 0,
        }
      }
      
      acc[key].value += item.value
      acc[key].count += 1
      
      return acc
    }, {})

    const result = Object.values(groupedData)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}