import Link from 'next/link';
import { BarChart3, Settings, Zap, Shield, Smartphone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Modern Dashboard Application
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Built with React 18, TypeScript, and Tailwind CSS. Features data visualization, 
          form handling, and seamless API integration.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Link href="/dashboard" className="btn btn-primary">
            View Dashboard
          </Link>
          <Link href="/components" className="btn btn-secondary">
            Explore Components
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card text-center">
          <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Data Visualization</h3>
          <p className="text-gray-600">
            Interactive charts and graphs to visualize your data with responsive design.
          </p>
        </div>
        
        <div className="card text-center">
          <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Performance Optimized</h3>
          <p className="text-gray-600">
            Fast loading times with optimized React components and efficient state management.
          </p>
        </div>
        
        <div className="card text-center">
          <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure & Validated</h3>
          <p className="text-gray-600">
            Form validation, XSS prevention, and secure handling of user inputs.
          </p>
        </div>
        
        <div className="card text-center">
          <Smartphone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
          <p className="text-gray-600">
            Works perfectly on mobile, tablet, and desktop breakpoints.
          </p>
        </div>
        
        <div className="card text-center">
          <Settings className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Configurable</h3>
          <p className="text-gray-600">
            Easy to customize with comprehensive settings and configuration options.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            API
          </div>
          <h3 className="text-lg font-semibold mb-2">REST API Integration</h3>
          <p className="text-gray-600">
            Seamless integration with REST endpoints and efficient data fetching.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-center">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-primary-600">React 18</div>
            <div className="text-sm text-gray-600">Modern React with hooks</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-primary-600">TypeScript</div>
            <div className="text-sm text-gray-600">Type-safe development</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-primary-600">Tailwind CSS</div>
            <div className="text-sm text-gray-600">Utility-first styling</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold text-primary-600">Next.js 14</div>
            <div className="text-sm text-gray-600">App Router & SSR</div>
          </div>
        </div>
      </div>
    </div>
  );
}