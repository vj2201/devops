'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, MapIcon, Grid3x3 } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES } from '@/types'

// Mock data for demo
const mockListings = [
  {
    id: '1',
    title: 'iPhone 14 Pro 256GB Space Black',
    description: 'Excellent condition, barely used. Comes with original box and charger. No scratches or dents.',
    price: 119900, // $1199 in cents
    category: 'Phones & Tablets',
    condition: 'Like New',
    images: ['/api/placeholder/800/1200', '/api/placeholder/800/1200'],
    latitude: -37.8136,
    longitude: 144.9631,
    suburb: 'Melbourne CBD',
    city: 'Melbourne',
    status: 'active',
    views: 45,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    seller: {
      id: 'u1',
      name: 'Sarah Chen',
      trustScore: 95,
      avatar: null,
    },
  },
  {
    id: '2',
    title: 'MacBook Pro M2 14" 16GB RAM',
    description: 'Purchased 6 months ago. Perfect working condition. Still under Apple warranty until Dec 2024.',
    price: 249900,
    category: 'Computers & Laptops',
    condition: 'Excellent',
    images: ['/api/placeholder/800/1200'],
    latitude: -37.8200,
    longitude: 144.9700,
    suburb: 'Carlton',
    city: 'Melbourne',
    status: 'active',
    views: 78,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    seller: {
      id: 'u2',
      name: 'James Wilson',
      trustScore: 88,
      avatar: null,
    },
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    description: 'Black color. Used for 3 months. Amazing sound quality. Selling because I upgraded.',
    price: 35900,
    category: 'Audio & Headphones',
    condition: 'Good',
    images: ['/api/placeholder/800/1200'],
    latitude: -37.8100,
    longitude: 144.9500,
    suburb: 'Fitzroy',
    city: 'Melbourne',
    status: 'active',
    views: 32,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    seller: {
      id: 'u3',
      name: 'Emma Davis',
      trustScore: 92,
      avatar: null,
    },
  },
  {
    id: '4',
    title: 'Canon EOS R6 Camera Body Only',
    description: 'Professional mirrorless camera. Low shutter count (5000). Mint condition with all accessories.',
    price: 299900,
    category: 'Cameras & Photography',
    condition: 'Like New',
    images: ['/api/placeholder/800/1200'],
    latitude: -37.8300,
    longitude: 144.9600,
    suburb: 'South Yarra',
    city: 'Melbourne',
    status: 'active',
    views: 67,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    seller: {
      id: 'u4',
      name: 'Michael Brown',
      trustScore: 97,
      avatar: null,
    },
  },
  {
    id: '5',
    title: 'PlayStation 5 Disc Edition + 2 Controllers',
    description: 'Includes Spider-Man 2 and God of War Ragnarok. Perfect condition. Smoke-free home.',
    price: 65900,
    category: 'Gaming Consoles & Accessories',
    condition: 'Excellent',
    images: ['/api/placeholder/800/1200'],
    latitude: -37.8250,
    longitude: 144.9800,
    suburb: 'Richmond',
    city: 'Melbourne',
    status: 'active',
    views: 123,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    seller: {
      id: 'u5',
      name: 'Alex Kim',
      trustScore: 85,
      avatar: null,
    },
  },
]

export default function FeedPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Filter listings by category
  const filteredListings =
    selectedCategory === 'All'
      ? mockListings
      : mockListings.filter((l) => l.category === selectedCategory)

  // Handle scroll snap
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const itemHeight = window.innerHeight
      const index = Math.round(scrollTop / itemHeight)
      setCurrentIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - next category
      const currentIdx = CATEGORIES.indexOf(selectedCategory as any)
      if (currentIdx < CATEGORIES.length - 1) {
        setSelectedCategory(CATEGORIES[currentIdx + 1])
      }
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right - previous category
      const currentIdx = CATEGORIES.indexOf(selectedCategory as any)
      if (currentIdx > 0) {
        setSelectedCategory(CATEGORIES[currentIdx - 1])
      } else if (selectedCategory !== 'All') {
        setSelectedCategory('All')
      }
    }
  }

  const scrollToNext = () => {
    const container = containerRef.current
    if (!container) return
    container.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  const scrollToPrev = () => {
    const container = containerRef.current
    if (!container) return
    container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-white">
            TradeMate
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="Grid view"
            >
              <Grid3x3 className="w-6 h-6" />
            </Link>
            <Link
              href="/map"
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="Map view"
            >
              <MapIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div
          className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-white text-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {category.replace(' & ', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Product Feed (Snap Scroll) */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollSnapType: 'y mandatory',
          overscrollBehavior: 'contain',
        }}
      >
        {filteredListings.length > 0 ? (
          filteredListings.map((listing, idx) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              currentIndex={idx}
              totalCount={filteredListings.length}
              onSwipeLeft={scrollToNext}
              onSwipeRight={scrollToPrev}
              onSave={() => console.log('Saved:', listing.id)}
              onMessage={() => console.log('Message:', listing.id)}
            />
          ))
        ) : (
          <div className="h-screen flex flex-col items-center justify-center text-white px-6">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold mb-2">
              No items in {selectedCategory}
            </h3>
            <p className="text-white/60 text-center mb-6">
              Try switching to a different category or check back later
            </p>
            <Link
              href="/listings/new"
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Post First Listing
            </Link>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-6 flex flex-col gap-3 z-40">
        <Link
          href="/search"
          className="p-4 bg-white/20 backdrop-blur-lg rounded-full text-white shadow-lg hover:bg-white/30 transition-all"
          title="Search"
        >
          <Search className="w-6 h-6" />
        </Link>
        <Link
          href="/listings/new"
          className="p-4 bg-primary-600 rounded-full text-white shadow-lg hover:bg-primary-700 transition-all"
          title="Post listing"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </div>

      {/* Swipe Hint (show on first visit) */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-30">
        <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm animate-bounce">
          Swipe categories ← →
        </div>
      </div>
    </div>
  )
}
