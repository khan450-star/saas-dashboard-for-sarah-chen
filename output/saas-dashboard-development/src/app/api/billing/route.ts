import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!subscription) {
      return NextResponse.json({
        plan: 'FREE',
        status: 'inactive',
        currentPeriodEnd: null,
      })
    }

    return NextResponse.json({
      plan: subscription.stripePriceId.includes('pro') ? 'PRO' : 'BASIC',
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      stripeCustomerId: subscription.stripeCustomerId,
    })
  } catch (error) {
    console.error('Error fetching billing info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId } = await request.json()

    // In a real app, you would create a Stripe checkout session here
    // For demo purposes, we'll just return a success message
    
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json({ 
        message: 'Stripe not configured for demo. Checkout would happen here.',
        checkoutUrl: '#',
      })
    }

    // Real Stripe integration would go here
    return NextResponse.json({ 
      message: 'Checkout session created',
      checkoutUrl: '#',
    })
  } catch (error) {
    console.error('Error creating checkout:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}