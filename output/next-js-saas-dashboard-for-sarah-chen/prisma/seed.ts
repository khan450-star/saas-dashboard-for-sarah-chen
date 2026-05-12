import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      hashedPassword,
      emailVerified: new Date(),
      stripeCustomerId: 'cus_test_123',
    },
  })

  const sarahUser = await prisma.user.upsert({
    where: { email: 'sarah.chen@example.com' },
    update: {},
    create: {
      email: 'sarah.chen@example.com',
      name: 'Sarah Chen',
      hashedPassword,
      emailVerified: new Date(),
      stripeCustomerId: 'cus_sarah_456',
    },
  })

  const johnUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      hashedPassword,
      emailVerified: new Date(),
    },
  })

  // Create test subscriptions
  await prisma.subscription.upsert({
    where: { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      stripeSubscriptionId: 'sub_test_123',
      stripePriceId: 'price_pro_monthly',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  await prisma.subscription.upsert({
    where: { userId: sarahUser.id },
    update: {},
    create: {
      userId: sarahUser.id,
      stripeSubscriptionId: 'sub_sarah_456',
      stripePriceId: 'price_pro_annual',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
  })

  // Create test invoices
  const invoices = [
    {
      stripeInvoiceId: 'in_test_1',
      userId: testUser.id,
      amountPaid: 2900,
      currency: 'usd',
      status: 'paid',
      invoiceUrl: 'https://invoice.stripe.com/i/test1',
    },
    {
      stripeInvoiceId: 'in_test_2',
      userId: testUser.id,
      amountPaid: 2900,
      currency: 'usd',
      status: 'paid',
      invoiceUrl: 'https://invoice.stripe.com/i/test2',
    },
    {
      stripeInvoiceId: 'in_sarah_1',
      userId: sarahUser.id,
      amountPaid: 29000,
      currency: 'usd',
      status: 'paid',
      invoiceUrl: 'https://invoice.stripe.com/i/sarah1',
    },
    {
      stripeInvoiceId: 'in_john_1',
      userId: johnUser.id,
      amountPaid: 2900,
      currency: 'usd',
      status: 'paid',
      invoiceUrl: 'https://invoice.stripe.com/i/john1',
    },
  ]

  for (const invoice of invoices) {
    await prisma.invoice.upsert({
      where: { stripeInvoiceId: invoice.stripeInvoiceId },
      update: {},
      create: invoice,
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`👤 Created ${await prisma.user.count()} users`)
  console.log(`📋 Created ${await prisma.subscription.count()} subscriptions`)
  console.log(`🧾 Created ${await prisma.invoice.count()} invoices`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })