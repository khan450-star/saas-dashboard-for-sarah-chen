import { prisma } from '@/lib/prisma'
import ProductGrid from '@/components/ProductGrid'
import SearchFilters from '@/components/SearchFilters'

interface SearchParams {
  category?: string
  search?: string
  sort?: string
}

interface ProductListingPageProps {
  searchParams: SearchParams
}

export default async function ProductListingPage({ searchParams }: ProductListingPageProps) {
  const { category, search, sort } = searchParams

  // Build where clause
  const where: any = {}
  if (category) {
    where.category = { slug: category }
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ]
  }

  // Build orderBy clause
  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'price-low') {
    orderBy = { price: 'asc' }
  } else if (sort === 'price-high') {
    orderBy = { price: 'desc' }
  } else if (sort === 'name') {
    orderBy = { name: 'asc' }
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      category: true,
    },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <SearchFilters categories={categories} />
        </aside>
        
        <main className="flex-1">
          <div className="mb-4 text-gray-600">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </div>
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  )
}