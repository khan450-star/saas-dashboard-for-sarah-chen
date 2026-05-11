import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string
  category: {
    name: string
  }
}

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}