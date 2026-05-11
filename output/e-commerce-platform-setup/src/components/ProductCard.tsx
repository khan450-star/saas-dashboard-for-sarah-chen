import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: {
    name: string;
    slug: string;
  };
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </Link>
      
      <div className="p-4">
        <div className="mb-2">
          <Link
            href={`/products?category=${product.category.slug}`}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            {product.category.name}
          </Link>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/products/${product.slug}`} className="hover:text-primary-600">
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </p>
          
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  );
}