import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://picsum.photos/seed/electronics/600/600',
    },
    {
      name: 'Clothing',
      slug: 'clothing',
      image: 'https://picsum.photos/seed/clothing/600/600',
    },
    {
      name: 'Books',
      slug: 'books',
      image: 'https://picsum.photos/seed/books/600/600',
    },
    {
      name: 'Home & Garden',
      slug: 'home-garden',
      image: 'https://picsum.photos/seed/home-garden/600/600',
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  const electronicsCategory = await prisma.category.findUnique({
    where: { slug: 'electronics' },
  })
  const clothingCategory = await prisma.category.findUnique({
    where: { slug: 'clothing' },
  })
  const booksCategory = await prisma.category.findUnique({
    where: { slug: 'books' },
  })
  const homeCategory = await prisma.category.findUnique({
    where: { slug: 'home-garden' },
  })

  // Create products
  const products = [
    {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 199.99,
      image: 'https://picsum.photos/seed/wireless-headphones/600/600',
      stock: 50,
      categoryId: electronicsCategory!.id,
    },
    {
      name: 'Gaming Laptop',
      slug: 'gaming-laptop',
      description: 'Powerful gaming laptop with RTX graphics.',
      price: 1299.99,
      image: 'https://picsum.photos/seed/gaming-laptop/600/600',
      stock: 25,
      categoryId: electronicsCategory!.id,
    },
    {
      name: 'Smartphone',
      slug: 'smartphone',
      description: 'Latest smartphone with advanced camera features.',
      price: 899.99,
      image: 'https://picsum.photos/seed/smartphone/600/600',
      stock: 75,
      categoryId: electronicsCategory!.id,
    },
    {
      name: 'Cotton T-Shirt',
      slug: 'cotton-t-shirt',
      description: 'Comfortable cotton t-shirt in various colors.',
      price: 19.99,
      image: 'https://picsum.photos/seed/cotton-t-shirt/600/600',
      stock: 100,
      categoryId: clothingCategory!.id,
    },
    {
      name: 'Denim Jeans',
      slug: 'denim-jeans',
      description: 'Classic denim jeans with modern fit.',
      price: 79.99,
      image: 'https://picsum.photos/seed/denim-jeans/600/600',
      stock: 60,
      categoryId: clothingCategory!.id,
    },
    {
      name: 'Winter Jacket',
      slug: 'winter-jacket',
      description: 'Warm winter jacket for cold weather.',
      price: 149.99,
      image: 'https://picsum.photos/seed/winter-jacket/600/600',
      stock: 40,
      categoryId: clothingCategory!.id,
    },
    {
      name: 'JavaScript Programming Guide',
      slug: 'javascript-programming-guide',
      description: 'Comprehensive guide to JavaScript programming.',
      price: 39.99,
      image: 'https://picsum.photos/seed/javascript-book/600/600',
      stock: 80,
      categoryId: booksCategory!.id,
    },
    {
      name: 'Cooking Essentials',
      slug: 'cooking-essentials',
      description: 'Learn the basics of cooking with this essential guide.',
      price: 24.99,
      image: 'https://picsum.photos/seed/cooking-book/600/600',
      stock: 65,
      categoryId: booksCategory!.id,
    },
    {
      name: 'Indoor Plant Set',
      slug: 'indoor-plant-set',
      description: 'Beautiful indoor plants to brighten your home.',
      price: 69.99,
      image: 'https://picsum.photos/seed/indoor-plants/600/600',
      stock: 35,
      categoryId: homeCategory!.id,
    },
    {
      name: 'Kitchen Knife Set',
      slug: 'kitchen-knife-set',
      description: 'Professional kitchen knife set for all your cooking needs.',
      price: 129.99,
      image: 'https://picsum.photos/seed/kitchen-knives/600/600',
      stock: 45,
      categoryId: homeCategory!.id,
    },
    {
      name: 'Coffee Maker',
      slug: 'coffee-maker',
      description: 'Automatic coffee maker for perfect coffee every time.',
      price: 89.99,
      image: 'https://picsum.photos/seed/coffee-maker/600/600',
      stock: 30,
      categoryId: homeCategory!.id,
    },
    {
      name: 'Desk Lamp',
      slug: 'desk-lamp',
      description: 'Modern LED desk lamp with adjustable brightness.',
      price: 49.99,
      image: 'https://picsum.photos/seed/desk-lamp/600/600',
      stock: 55,
      categoryId: homeCategory!.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })