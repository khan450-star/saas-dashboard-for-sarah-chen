import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
    },
  })

  const books = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: {
      name: 'Books',
      slug: 'books',
    },
  })

  // Create products
  const products = [
    {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image: 'https://picsum.photos/seed/headphones/600/600',
      stock: 50,
      categoryId: electronics.id,
    },
    {
      name: 'Smartphone',
      slug: 'smartphone',
      description: 'Latest smartphone with advanced features',
      price: 699.99,
      image: 'https://picsum.photos/seed/smartphone/600/600',
      stock: 25,
      categoryId: electronics.id,
    },
    {
      name: 'Laptop',
      slug: 'laptop',
      description: 'High-performance laptop for work and gaming',
      price: 1299.99,
      image: 'https://picsum.photos/seed/laptop/600/600',
      stock: 15,
      categoryId: electronics.id,
    },
    {
      name: 'T-Shirt',
      slug: 't-shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      image: 'https://picsum.photos/seed/tshirt/600/600',
      stock: 100,
      categoryId: clothing.id,
    },
    {
      name: 'Jeans',
      slug: 'jeans',
      description: 'Classic blue jeans',
      price: 59.99,
      image: 'https://picsum.photos/seed/jeans/600/600',
      stock: 75,
      categoryId: clothing.id,
    },
    {
      name: 'Sneakers',
      slug: 'sneakers',
      description: 'Comfortable running sneakers',
      price: 89.99,
      image: 'https://picsum.photos/seed/sneakers/600/600',
      stock: 40,
      categoryId: clothing.id,
    },
    {
      name: 'Programming Book',
      slug: 'programming-book',
      description: 'Learn programming with this comprehensive guide',
      price: 39.99,
      image: 'https://picsum.photos/seed/programming/600/600',
      stock: 60,
      categoryId: books.id,
    },
    {
      name: 'Design Book',
      slug: 'design-book',
      description: 'Master the art of design',
      price: 29.99,
      image: 'https://picsum.photos/seed/design/600/600',
      stock: 30,
      categoryId: books.id,
    },
    {
      name: 'Business Book',
      slug: 'business-book',
      description: 'Essential business strategies',
      price: 24.99,
      image: 'https://picsum.photos/seed/business/600/600',
      stock: 45,
      categoryId: books.id,
    },
    {
      name: 'Tablet',
      slug: 'tablet',
      description: 'Portable tablet for work and entertainment',
      price: 399.99,
      image: 'https://picsum.photos/seed/tablet/600/600',
      stock: 20,
      categoryId: electronics.id,
    },
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