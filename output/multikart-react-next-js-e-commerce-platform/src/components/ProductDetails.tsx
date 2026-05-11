'use client'

import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: {
    name: string
  }
}

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      
      <div>
        <nav className="text-sm text-gray-500 mb-4">
          <span>{product.category.name}</span>
        </nav>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
        
        <p className="text-3xl font-bold text-primary-600 mb-6">
          {formatPrice(product.price)}
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-green-600">{product.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>
        </div>
        
        {product.stock > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`btn-primary flex items-center space-x-2 ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}