import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 12)

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  // Create categories
  const categoriesData = [
    { name: 'Electronics', slug: 'electronics', image: 'https://picsum.photos/seed/electronics/600/400' },
    { name: 'Accessories', slug: 'accessories', image: 'https://picsum.photos/seed/accessories/600/400' },
    { name: 'Office', slug: 'office', image: 'https://picsum.photos/seed/office/600/400' },
    { name: 'Kitchen', slug: 'kitchen', image: 'https://picsum.photos/seed/kitchen/600/400' },
    { name: 'Home', slug: 'home', image: 'https://picsum.photos/seed/home/600/400' },
  ]

  const categories: Record<string, number> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    categories[cat.name] = created.id
  }

  // Create products
  const products = [
    { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'High-quality wireless headphones with noise cancellation', price: 199.99, categoryName: 'Electronics', image: 'https://picsum.photos/seed/headphones/600/600', stock: 25 },
    { name: 'Smart Watch', slug: 'smart-watch', description: 'Feature-rich smartwatch with health monitoring', price: 299.99, categoryName: 'Electronics', image: 'https://picsum.photos/seed/smartwatch/600/600', stock: 15 },
    { name: 'Laptop Backpack', slug: 'laptop-backpack', description: 'Durable laptop backpack with multiple compartments', price: 89.99, categoryName: 'Accessories', image: 'https://picsum.photos/seed/backpack/600/600', stock: 30 },
    { name: 'Wireless Mouse', slug: 'wireless-mouse', description: 'Ergonomic wireless mouse with precision tracking', price: 49.99, categoryName: 'Electronics', image: 'https://picsum.photos/seed/mouse/600/600', stock: 50 },
    { name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', description: 'Portable Bluetooth speaker with premium sound', price: 79.99, categoryName: 'Electronics', image: 'https://picsum.photos/seed/speaker/600/600', stock: 20 },
    { name: 'Phone Case', slug: 'phone-case', description: 'Protective phone case with elegant design', price: 29.99, categoryName: 'Accessories', image: 'https://picsum.photos/seed/phonecase/600/600', stock: 100 },
    { name: 'USB-C Cable', slug: 'usb-c-cable', description: 'Fast charging USB-C cable with data transfer', price: 19.99, categoryName: 'Electronics', image: 'https://picsum.photos/seed/usbcable/600/600', stock: 200 },
    { name: 'Desk Organizer', slug: 'desk-organizer', description: 'Bamboo desk organizer for office supplies', price: 39.99, categoryName: 'Office', image: 'https://picsum.photos/seed/organizer/600/600', stock: 40 },
    { name: 'Coffee Mug', slug: 'coffee-mug', description: 'Insulated coffee mug that keeps drinks hot', price: 24.99, categoryName: 'Kitchen', image: 'https://picsum.photos/seed/coffeemug/600/600', stock: 75 },
    { name: 'Reading Lamp', slug: 'reading-lamp', description: 'Adjustable LED reading lamp with touch control', price: 59.99, categoryName: 'Home', image: 'https://picsum.photos/seed/lamp/600/600', stock: 35 },
  ]

  for (const { categoryName, ...productData } of products) {
    await prisma.product.upsert({
      where: { name: productData.name },
      update: {},
      create: {
        ...productData,
        categoryId: categories[categoryName],
      },
    })
  }

  console.log('Database has been seeded with sample data!')
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