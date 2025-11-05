'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { formatPrice, formatRelativeTime } from '@/lib/utils'
import type { ListingWithSeller } from '@/types'

interface ProductCardProps {
  listing: ListingWithSeller
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSave?: () => void
  onMessage?: () => void
  currentIndex?: number
  totalCount?: number
}

export default function ProductCard({
  listing,
  onSwipeLeft,
  onSwipeRight,
  onSave,
  onMessage,
  currentIndex = 0,
  totalCount = 0,
}: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.()
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (imageIndex < listing.images.length - 1) {
      setImageIndex(imageIndex + 1)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1)
    }
  }

  return (
    <div className="relative h-screen w-full snap-start snap-always bg-black">
      {/* Product Image */}
      <div className="relative h-full w-full">
        {listing.images[imageIndex] ? (
          <Image
            src={listing.images[imageIndex]}
            alt={listing.title}
            fill
            className="object-contain"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-900">
            <span className="text-gray-400 text-lg">No image</span>
          </div>
        )}

        {/* Image Navigation Dots */}
        {listing.images.length > 1 && (
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-10">
            {listing.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  idx === imageIndex
                    ? 'w-8 bg-white'
                    : 'w-1 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Navigation Arrows */}
        {listing.images.length > 1 && (
          <>
            {imageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {imageIndex < listing.images.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
              {listing.category}
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold mb-2">
            {formatPrice(listing.price)}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2 line-clamp-2">
            {listing.title}
          </h2>

          {/* Condition */}
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              {listing.condition}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {listing.suburb}
            </span>
            <span>{formatRelativeTime(listing.createdAt)}</span>
          </div>

          {/* Description Preview */}
          <p className="text-white/80 mb-6 line-clamp-2">
            {listing.description}
          </p>

          {/* Seller Info */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {listing.seller.name?.[0] || 'U'}
            </div>
            <div>
              <div className="font-medium">{listing.seller.name || 'Anonymous'}</div>
              <div className="text-sm text-white/60">
                Trust Score: {listing.seller.trustScore}/100
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                isSaved
                  ? 'bg-red-500 text-white'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-5 h-5 inline mr-2 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={onMessage}
              className="flex-1 py-4 bg-primary-600 rounded-2xl font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Message
            </button>
          </div>

          {/* Progress Indicator */}
          {totalCount > 0 && (
            <div className="text-center text-white/60 text-sm mt-4">
              {currentIndex + 1} of {totalCount}
            </div>
          )}
        </div>

        {/* Skip Button (Top Right) */}
        {onSwipeLeft && (
          <button
            onClick={onSwipeLeft}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  )
}
