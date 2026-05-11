'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <button
            onClick={handleAddToCart}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ShoppingCart className="w-4 h-4 text-primary-600" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  )
}