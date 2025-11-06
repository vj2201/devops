'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Layers } from 'lucide-react'

// Mock listings with coordinates
const mockListings = [
  {
    id: '1',
    title: 'iPhone 14 Pro',
    price: 119900,
    image: '/api/placeholder/100/100',
    latitude: -37.8136,
    longitude: 144.9631,
    suburb: 'Melbourne CBD',
  },
  {
    id: '2',
    title: 'MacBook Pro M2',
    price: 249900,
    image: '/api/placeholder/100/100',
    latitude: -37.8200,
    longitude: 144.9700,
    suburb: 'Carlton',
  },
  {
    id: '3',
    title: 'Sony Headphones',
    price: 35900,
    image: '/api/placeholder/100/100',
    latitude: -37.8100,
    longitude: 144.9500,
    suburb: 'Fitzroy',
  },
  {
    id: '4',
    title: 'Canon EOS R6',
    price: 299900,
    image: '/api/placeholder/100/100',
    latitude: -37.8300,
    longitude: 144.9600,
    suburb: 'South Yarra',
  },
  {
    id: '5',
    title: 'PlayStation 5',
    price: 65900,
    image: '/api/placeholder/100/100',
    latitude: -37.8250,
    longitude: 144.9800,
    suburb: 'Richmond',
  },
]

export default function MapPage() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null)

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(cents / 100)
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/feed"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Feed</span>
          </Link>
          <Link
            href="/listings/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Post</span>
          </Link>
        </div>
      </div>

      {/* Map Placeholder (would be Mapbox/Google Maps) */}
      <div className="relative h-full w-full pt-16">
        {/* Temporary map background */}
        <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 relative">
          {/* Grid pattern to simulate map */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, gray 1px, transparent 1px),
                linear-gradient(to bottom, gray 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Map Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 font-medium">Melbourne Map View</p>
            <p className="text-xs text-gray-300 mt-1">
              Integrate Mapbox or Google Maps here
            </p>
          </div>

          {/* Mock Pins */}
          {mockListings.map((listing) => (
            <button
              key={listing.id}
              onClick={() => setSelectedListing(listing.id)}
              className={`absolute w-10 h-10 rounded-full shadow-lg transition-all transform hover:scale-110 ${
                selectedListing === listing.id
                  ? 'bg-primary-600 ring-4 ring-primary-200 scale-125'
                  : 'bg-white'
              }`}
              style={{
                // Mock positioning (would be calculated from lat/lng)
                left: `${((listing.longitude - 144.9) / 0.1) * 100}%`,
                top: `${((listing.latitude + 37.85) / 0.1) * 100}%`,
              }}
            >
              <div className="flex items-center justify-center h-full">
                <span
                  className={`text-xs font-bold ${
                    selectedListing === listing.id ? 'text-white' : 'text-primary-600'
                  }`}
                >
                  {formatPrice(listing.price).replace('$', '')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Listing Card */}
        {selectedListing && (
          <div className="absolute bottom-6 left-4 right-4 z-40">
            {mockListings
              .filter((l) => l.id === selectedListing)
              .map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                      <p className="text-2xl font-bold text-primary-600 mb-1">
                        {formatPrice(listing.price)}
                      </p>
                      <p className="text-sm text-gray-600">{listing.suburb}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 px-4 pb-4">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="flex-1 py-3 bg-primary-600 text-white text-center rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => setSelectedListing(null)}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Info Card */}
        <div className="absolute top-24 left-4 right-4 z-30">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {mockListings.length} items nearby
                </h3>
                <p className="text-sm text-gray-600">Within 5km of your location</p>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Setup Notice */}
        <div className="absolute top-1/3 left-4 right-4 z-20 pointer-events-none">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 shadow-lg">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              🗺️ Map View Setup Required
            </p>
            <p className="text-xs text-yellow-700">
              Add Mapbox token to <code className="bg-yellow-100 px-1 rounded">.env.local</code>
              <br />
              See SETUP.md for instructions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
