import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Multikart</h3>
            <p className="text-gray-300">
              Your one-stop shop for all your needs. Quality products at great prices.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white">
                Home
              </Link>
              <Link href="/products" className="block text-gray-300 hover:text-white">
                Products
              </Link>
              <Link href="/cart" className="block text-gray-300 hover:text-white">
                Cart
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white">
                Contact Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-white">
                FAQ
              </a>
              <a href="#" className="block text-gray-300 hover:text-white">
                Shipping Info
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="block text-gray-300 hover:text-white">
                Twitter
              </a>
              <a href="#" className="block text-gray-300 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Multikart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}