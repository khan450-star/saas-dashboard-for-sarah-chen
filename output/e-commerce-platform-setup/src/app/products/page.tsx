import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

interface SearchParams {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

interface Props {
  searchParams: SearchParams;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, search, minPrice, maxPrice } = searchParams;

  const whereClause: any = {};
  
  if (category) {
    whereClause.category = {
      slug: category
    };
  }
  
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { description: { contains: search } }
    ];
  }
  
  if (minPrice || maxPrice) {
    whereClause.price = {};
    if (minPrice) whereClause.price.gte = parseFloat(minPrice);
    if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <ProductFilters categories={categories} searchParams={searchParams} />
        </aside>
        
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Products {category && `in ${category}`}
            </h1>
            <p className="text-gray-600">
              {products.length} products found
            </p>
          </div>
          
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}