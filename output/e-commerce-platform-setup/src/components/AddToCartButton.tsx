'use client';

import { useCart } from './CartProvider';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface Props {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export default function AddToCartButton({ product, size = 'md' }: Props) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    
    // Brief loading state for user feedback
    setTimeout(() => setIsAdding(false), 300);
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className={`btn bg-gray-300 text-gray-500 cursor-not-allowed ${sizeClasses[size]}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`btn btn-primary ${sizeClasses[size]} ${isAdding ? 'opacity-75' : ''}`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}