# TradeMate - Classifieds Marketplace MVP

A mobile-first, PWA classifieds marketplace for electronics in Melbourne, built with Next.js 14 and Supabase.

## 🎯 Project Goals

Build a TradeMe-quality marketplace for Australia with:
- **One city**: Melbourne
- **One category**: Consumer electronics
- **Zero budget**: All free-tier services
- **Trust-first**: Verified users, safe meetups, quality listings
- **Mobile-first**: PWA with offline support

## 🏗️ Architecture

### Tech Stack (100% Free Tier)

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase Postgres (500MB free)
- **Auth**: Supabase Auth (50K MAU free)
- **Storage**: Supabase Storage (1GB free)
- **Hosting**: Vercel (unlimited bandwidth)
- **Maps**: Mapbox (50K loads/month free)

### Database Schema

```
users
  - id, email, phone, name, avatar
  - emailVerified, phoneVerified
  - trustScore (0-100)
  - createdAt, updatedAt

listings
  - id, sellerId, title, description, price
  - category, condition, images[]
  - latitude, longitude, suburb, city
  - status (active, sold, removed)
  - views, createdAt, updatedAt

messages
  - id, listingId, senderId, receiverId
  - content, readAt, createdAt

reviews
  - id, reviewerId, revieweeId, listingId
  - rating (1-5), comment, createdAt

reports
  - id, reporterId, targetType, targetId
  - reason, status, createdAt
```

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
cd marketplace-mvp
npm install
```

### 2. Set Up Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (choose Sydney region for low latency)
3. Wait for database provisioning (~2 minutes)

#### Enable PostGIS Extension

In Supabase SQL Editor, run:

```sql
-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add spatial index helper function (for future use)
CREATE OR REPLACE FUNCTION listings_within_radius(
  lat double precision,
  lng double precision,
  radius_km double precision
)
RETURNS TABLE (
  id uuid,
  title text,
  price integer,
  distance_km double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.title,
    l.price,
    ST_Distance(
      ST_MakePoint(lng, lat)::geography,
      ST_MakePoint(l.longitude, l.latitude)::geography
    ) / 1000 AS distance_km
  FROM listings l
  WHERE ST_DWithin(
    ST_MakePoint(lng, lat)::geography,
    ST_MakePoint(l.longitude, l.latitude)::geography,
    radius_km * 1000
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;
```

#### Set Up Storage Buckets

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `listings`
3. Set it to **public** (images need to be accessible)
4. Add RLS policy:

```sql
-- Allow anyone to read listing images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'listings' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'listings'
  AND auth.role() = 'authenticated'
);
```

### 3. Configure Environment Variables

Create `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
# Get these from Supabase Dashboard > Settings > API
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE-ROLE-KEY]

# Get free token from https://account.mapbox.com
NEXT_PUBLIC_MAPBOX_TOKEN=[YOUR-MAPBOX-TOKEN]

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_CITY=Melbourne
```

### 4. Push Database Schema

```bash
npm run db:push
```

This will create all tables in Supabase using Prisma.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Features Implemented

### ✅ Core MVP (Current)

- [x] Home page with search + categories
- [x] Listing creation form with image upload
- [x] Authentication UI (email/phone magic links)
- [x] PWA manifest (installable)
- [x] Mobile-first responsive design
- [x] Database schema with PostGIS support

### 🚧 Next Steps (TODO)

**Week 1-2: Auth & Listings**
- [ ] Implement Supabase Auth (magic links)
- [ ] Create API routes for listings CRUD
- [ ] Add image upload to Supabase Storage
- [ ] Build listing detail page
- [ ] Add geospatial search (10km radius)

**Week 3-4: Messaging & Trust**
- [ ] Real-time messaging (Supabase Realtime)
- [ ] User profiles with reviews
- [ ] Report/moderation system
- [ ] Phone verification (Twilio free tier)

**Week 5-6: Growth & Polish**
- [ ] SEO optimization (structured data)
- [ ] PWA offline support (service worker)
- [ ] Push notifications
- [ ] Safety guide (meetup tips)

## 🎨 Design System

### Colors

- **Primary**: `#0ea5e9` (Sky Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### Typography

- **Font**: Inter (system font fallback)
- **Headings**: Bold, tight line-height
- **Body**: Regular, relaxed line-height

### Components

All components use Tailwind CSS. Reusable components will be added to `src/components/` as needed.

## 🔒 Compliance & Safety

### Australian Consumer Law (ACL)

- Clear refund/return policies
- No misleading listings (moderation)
- Buyer-seller agreement framework

### Privacy Act (OAIC)

- Minimal data collection (email/phone only initially)
- Data stored in Sydney region (Supabase Sydney)
- User data export/deletion on request
- Privacy Policy (TODO)

### Terms of Use (TODO)

- Liability limits
- Prohibited items (weapons, drugs, animals)
- User responsibilities
- Dispute resolution

## 🎯 Success Metrics (90-Day Goals)

### Month 1: Supply
- **Goal**: 1,000 live listings
- **Method**: University partnerships, manual seeding, Instagram ads

### Month 2: Liquidity
- **Goal**: 30% of listings get inquiry within 7 days
- **Method**: Push notifications, SEO, price alerts

### Month 3: Trust
- **Goal**: <1% scam rate, >4.6★ rating
- **Method**: Verification badges, safe meetup guide, reviews

## 🚀 Deployment

### Vercel (Free Tier)

1. Push code to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy automatically on push

**Free tier limits**:
- Unlimited bandwidth
- 100GB build time/month
- Automatic SSL
- CDN included

### Supabase (Free Tier)

- 500MB database
- 1GB file storage
- 50K monthly active users
- 2GB bandwidth/month

## 📊 Cost Estimate (Free Tier)

| Service | Free Tier | Cost if Exceeded |
|---------|-----------|------------------|
| Vercel Hosting | Unlimited | $20/mo Pro plan |
| Supabase DB | 500MB | $25/mo for 8GB |
| Supabase Storage | 1GB | $0.021/GB/month |
| Mapbox Maps | 50K loads | $5/1K loads |
| **Total** | **$0/month** | ~$50/mo at scale |

## 🛠️ Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:push      # Push schema to Supabase
npm run db:studio    # Open Prisma Studio
```

## 📁 Project Structure

```
marketplace-mvp/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── auth/           # Authentication pages
│   │   ├── listings/       # Listing pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   ├── lib/               # Utilities
│   │   ├── supabase.ts    # Supabase client
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # Helpers
│   └── types/             # TypeScript types
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── manifest.json      # PWA manifest
├── .env.example           # Environment template
├── package.json
└── README.md             # This file
```

## 🤝 Contributing

This is a pet project / MVP. To contribute:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

MIT License - free to use, modify, and distribute.

## 🙋 Support

For questions or issues:
- Create a GitHub issue
- Email: [your-email]

---

**Built with ❤️ for Melbourne 🇦🇺**
