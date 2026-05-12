import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create plans
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      price: 9.99,
      stripePriceId: 'price_starter',
      features: 'Up to 5 projects,Basic analytics,Email support',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Great for growing businesses',
      price: 29.99,
      stripePriceId: 'price_pro',
      features: 'Unlimited projects,Advanced analytics,Priority support,Custom integrations',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 99.99,
      stripePriceId: 'price_enterprise',
      features: 'Everything in Pro,Dedicated account manager,Custom solutions,SLA guarantee',
      popular: false
    }
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: plan
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })