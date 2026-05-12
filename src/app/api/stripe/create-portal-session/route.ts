import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check for dummy Stripe keys
    if (process.env.STRIPE_SECRET_KEY?.includes('placeholder')) {
      return NextResponse.json(
        { message: 'Stripe is not configured. Please add your Stripe keys.' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { message: 'No Stripe customer found' },
        { status: 404 }
      )
    }

    // Create portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Portal session error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}