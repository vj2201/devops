import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const createListingSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20).max(2000),
  price: z.number().int().min(0),
  category: z.string(),
  condition: z.string(),
  images: z.array(z.string()).min(1).max(6),
  latitude: z.number(),
  longitude: z.number(),
  suburb: z.string(),
  city: z.string().default('Melbourne'),
})

// GET /api/listings - Fetch listings with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const suburb = searchParams.get('suburb')
    const search = searchParams.get('q')
    const sortBy = searchParams.get('sortBy') || 'newest'

    const where: any = {
      status: 'active',
    }

    if (category && category !== 'All') {
      where.category = category
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseInt(minPrice) * 100 }
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseInt(maxPrice) * 100 }
    }

    if (suburb) {
      where.suburb = suburb
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'price-asc') orderBy = { price: 'asc' }
    if (sortBy === 'price-desc') orderBy = { price: 'desc' }

    const listings = await prisma.listing.findMany({
      where,
      orderBy,
      take: 50,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            trustScore: true,
          },
        },
      },
    })

    return NextResponse.json({ listings })
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

// POST /api/listings - Create new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = createListingSchema.parse(body)

    // TODO: Get user ID from Supabase Auth session
    // For now, we'll need to pass sellerId in the request
    const { sellerId } = body
    if (!sellerId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        ...validatedData,
        sellerId,
        price: validatedData.price * 100, // Convert to cents
      },
    })

    return NextResponse.json({ listing }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating listing:', error)
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    )
  }
}
