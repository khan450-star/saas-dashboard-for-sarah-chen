import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if Stripe is properly configured
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json(
        { message: 'Stripe is not configured. Please add your Stripe keys to environment variables.' },
        { status: 400 }
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

    try {
      // Create Stripe customer portal session
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXTAUTH_URL}/billing`,
      })

      return NextResponse.json({ url: portalSession.url })
    } catch (stripeError: any) {
      console.error('Stripe portal error:', stripeError)
      return NextResponse.json(
        { message: 'Failed to create customer portal session.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Customer portal error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}