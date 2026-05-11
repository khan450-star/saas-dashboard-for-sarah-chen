import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample products
  const products = [
    {
      name: 'Premium Laptop',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      imageUrl: 'https://picsum.photos/seed/laptop/600/600',
      category: 'Electronics'
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 249.99,
      imageUrl: 'https://picsum.photos/seed/headphones/600/600',
      category: 'Electronics'
    },
    {
      name: 'Coffee Maker',
      description: 'Premium automatic coffee maker',
      price: 199.99,
      imageUrl: 'https://picsum.photos/seed/coffee/600/600',
      category: 'Kitchen'
    },
    {
      name: 'Running Shoes',
      description: 'Comfortable running shoes for athletes',
      price: 129.99,
      imageUrl: 'https://picsum.photos/seed/shoes/600/600',
      category: 'Sports'
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      imageUrl: 'https://picsum.photos/seed/watch/600/600',
      category: 'Electronics'
    },
    {
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for all exercises',
      price: 29.99,
      imageUrl: 'https://picsum.photos/seed/yoga/600/600',
      category: 'Sports'
    },
    {
      name: 'Desk Chair',
      description: 'Ergonomic office chair for long work sessions',
      price: 399.99,
      imageUrl: 'https://picsum.photos/seed/chair/600/600',
      category: 'Furniture'
    },
    {
      name: 'Smartphone',
      description: 'Latest flagship smartphone with advanced camera',
      price: 899.99,
      imageUrl: 'https://picsum.photos/seed/phone/600/600',
      category: 'Electronics'
    },
    {
      name: 'Book Collection',
      description: 'Classic literature book collection',
      price: 79.99,
      imageUrl: 'https://picsum.photos/seed/books/600/600',
      category: 'Books'
    },
    {
      name: 'Kitchen Knife Set',
      description: 'Professional chef knife set with wooden block',
      price: 159.99,
      imageUrl: 'https://picsum.photos/seed/knives/600/600',
      category: 'Kitchen'
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });