import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Multikart
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop the latest trends and find everything you need in one place.
          </p>
          <div className="space-x-4">
            <Link
              href="/products"
              className="bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link
              href="/products?category=electronics"
              className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              View Electronics
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}