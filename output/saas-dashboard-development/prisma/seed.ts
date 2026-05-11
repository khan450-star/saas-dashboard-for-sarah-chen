import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  })

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/headphones/600/600'
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/smartwatch/600/600'
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic laptop stand for better posture',
      price: 49.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/laptopstand/600/600'
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with premium sound',
      price: 79.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/speaker/600/600'
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub for modern laptops',
      price: 39.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/usbhub/600/600'
    },
    {
      name: 'Mechanical Keyboard',
      description: 'Premium mechanical keyboard for productivity',
      price: 149.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/keyboard/600/600'
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking',
      price: 29.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/mouse/600/600'
    },
    {
      name: 'Tablet Stand',
      description: 'Adjustable tablet stand for comfortable viewing',
      price: 24.99,
      category: 'Accessories',
      imageUrl: 'https://picsum.photos/seed/tabletstand/600/600'
    },
    {
      name: 'Power Bank',
      description: 'High-capacity portable power bank',
      price: 34.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/powerbank/600/600'
    },
    {
      name: 'Webcam',
      description: '4K webcam for video calls and streaming',
      price: 89.99,
      category: 'Electronics',
      imageUrl: 'https://picsum.photos/seed/webcam/600/600'
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    })
  }

  console.log('Database has been seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })