import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    let subscription = null
    
    if (user.subscription?.stripeSubscriptionId) {
      try {
        subscription = await stripe.subscriptions.retrieve(
          user.subscription.stripeSubscriptionId
        )
      } catch (error) {
        console.error('Error retrieving subscription:', error)
      }
    }

    return NextResponse.json({
      subscription: subscription ? {
        id: subscription.id,
        status: subscription.status,
        priceId: subscription.items.data[0]?.price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      } : null
    })
  } catch (error) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}