import { User, Listing, Message, Review, Report } from '@prisma/client'

export type { User, Listing, Message, Review, Report }

// Extended types with relations
export type ListingWithSeller = Listing & {
  seller: User
}

export type MessageWithUsers = Message & {
  sender: User
  receiver: User
  listing: Listing
}

export type ReviewWithUsers = Review & {
  reviewer: User
  reviewee: User
}

// Form types
export type CreateListingInput = {
  title: string
  description: string
  price: number
  category: string
  condition: string
  images: string[]
  latitude: number
  longitude: number
  suburb: string
  city?: string
}

export type SearchFilters = {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  condition?: string
  latitude?: number
  longitude?: number
  radius?: number // in km
  sortBy?: 'newest' | 'price-asc' | 'price-desc'
}

// Categories (Electronics focus for MVP)
export const CATEGORIES = [
  'Phones & Tablets',
  'Computers & Laptops',
  'Audio & Headphones',
  'Cameras & Photography',
  'Gaming Consoles & Accessories',
  'Smart Home & Wearables',
  'Other Electronics',
] as const

export type Category = typeof CATEGORIES[number]

// Item conditions
export const CONDITIONS = [
  'New',
  'Like New',
  'Excellent',
  'Good',
  'Fair',
] as const

export type Condition = typeof CONDITIONS[number]

// Report reasons
export const REPORT_REASONS = [
  'Scam or fraud',
  'Inappropriate content',
  'Duplicate listing',
  'Incorrect pricing',
  'Prohibited item',
  'Other',
] as const

export type ReportReason = typeof REPORT_REASONS[number]

// Melbourne suburbs (starter list)
export const MELBOURNE_SUBURBS = [
  'CBD',
  'Carlton',
  'Fitzroy',
  'Collingwood',
  'Richmond',
  'South Yarra',
  'St Kilda',
  'Brighton',
  'Caulfield',
  'Glen Waverley',
  'Box Hill',
  'Doncaster',
  'Preston',
  'Coburg',
  'Brunswick',
  'Footscray',
  'Sunshine',
  'Clayton',
  'Monash',
  'Other',
] as const

export type MelbourneSuburb = typeof MELBOURNE_SUBURBS[number]
