'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      image: string;
    };
  }[];
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchOrders();
  }, [session, status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Account Menu</h2>
            <nav className="space-y-2">
              <Link href="/account" className="block px-3 py-2 bg-primary-50 text-primary-600 rounded-md">
                Dashboard
              </Link>
              <Link href="/account/orders" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                Order History
              </Link>
              <Link href="/account/profile" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                Profile Settings
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user?.name || session.user?.email}
            </h1>
            <p className="text-gray-600">
              Manage your account and view your order history
            </p>
          </div>
          
          {/* Account Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {orders.length}
              </div>
              <div className="text-gray-600">Total Orders</div>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-gray-600">Total Spent</div>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {orders.filter(order => order.status === 'DELIVERED').length}
              </div>
              <div className="text-gray-600">Completed Orders</div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
                
                <Link href="/account/orders" className="btn btn-outline">
                  View All Orders
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No orders yet</p>
                <Link href="/products" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}