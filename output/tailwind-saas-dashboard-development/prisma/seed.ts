import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 299.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/headphones/600/600',
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 399.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/smartwatch/600/600',
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic laptop stand for better posture',
      price: 89.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/laptopstand/600/600',
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard for gaming and productivity',
      price: 179.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/keyboard/600/600',
    },
    {
      name: 'Wireless Mouse',
      description: 'Precision wireless mouse with long battery life',
      price: 69.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/mouse/600/600',
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with 4K HDMI output',
      price: 119.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/usbhub/600/600',
    },
    {
      name: 'Portable Monitor',
      description: '15.6 inch portable monitor for dual screen setup',
      price: 249.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/monitor/600/600',
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam with auto-focus and built-in microphone',
      price: 89.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/webcam/600/600',
    },
    {
      name: 'Desk Organizer',
      description: 'Wooden desk organizer with multiple compartments',
      price: 45.99,
      category: 'Office',
      imageUrl: 'https://picsum.photos/seed/organizer/600/600',
    },
    {
      name: 'LED Desk Lamp',
      description: 'Adjustable LED desk lamp with touch controls',
      price: 79.99,
      category: 'Office',
      imageUrl: 'https://picsum.photos/seed/desklamp/600/600',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    })
  }

  console.log('Database has been seeded. 🌱')
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