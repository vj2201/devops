import Link from 'next/link'
import { Search, Plus, MapPin, Grid3x3, LayoutList } from 'lucide-react'

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              TradeMate
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/feed"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Feed view"
              >
                <LayoutList className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Feed</span>
              </Link>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/listings/new"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Post Listing</span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search electronics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buy & Sell Electronics in Melbourne
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Safe, verified, and trusted marketplace for tech enthusiasts
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Melbourne, Australia</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              'All',
              'Phones',
              'Laptops',
              'Cameras',
              'Audio',
              'Gaming',
              'Wearables'
            ].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  category === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <main className="flex-1 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Latest Listings
            </h2>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to post an item in your area!
            </p>
            <Link
              href="/listings/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Post Your First Listing
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/safety">Safety Tips</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/report">Report Issue</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/terms">Terms of Use</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/acceptable-use">Acceptable Use</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/guidelines">Community Guidelines</Link></li>
                <li><Link href="/prohibited">Prohibited Items</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            © 2025 TradeMate. Built for Melbourne. 🇦🇺
          </div>
        </div>
      </footer>
    </div>
  )
}
