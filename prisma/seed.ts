import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      hashedPassword,
      stripeCustomerId: 'cus_demo_customer_id',
    },
  })

  // Create demo subscription
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: 'sub_demo_subscription' },
    update: {},
    create: {
      userId: user.id,
      stripeSubscriptionId: 'sub_demo_subscription',
      stripePriceId: 'price_demo_monthly',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  console.log('✅ Database seeded successfully')
  console.log('Demo account: demo@example.com / password123')
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