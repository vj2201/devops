# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free)
- A Mapbox account (free)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Fill in:
   - **Name**: `trademate-mvp`
   - **Database Password**: (generate strong password, save it!)
   - **Region**: **Sydney** (lowest latency for AU)
4. Click **Create new project**
5. Wait ~2 minutes for provisioning

### 3. Enable PostGIS Extension

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL:

```sql
-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;
```

4. Click **Run**

### 4. Create Storage Bucket

1. Go to **Storage** in Supabase sidebar
2. Click **New bucket**
3. Name: `listings`
4. **Public bucket**: Yes (toggle on)
5. Click **Create bucket**

### 5. Set Up Environment Variables

1. Copy the example file:

```bash
cp .env.example .env.local
```

2. Get your Supabase credentials:
   - Go to **Settings** → **API**
   - Copy these values:

```env
# From "Project URL"
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# From "Project API keys" → "anon public"
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# From "Project API keys" → "service_role" (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Get your database URL:
   - Go to **Settings** → **Database**
   - Copy **Connection string** → **URI**
   - Replace `[YOUR-PASSWORD]` with your database password

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

4. Get free Mapbox token:
   - Sign up at [account.mapbox.com](https://account.mapbox.com)
   - Go to **Tokens**
   - Copy your **Default public token**

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscXh4eHh4eHh4In0.xxxxxxxxxxxxx
```

### 6. Push Database Schema

```bash
npm run db:push
```

You should see:
```
✔ Generated Prisma Client
✔ Your database is now in sync with your Prisma schema
```

### 7. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Troubleshooting

### "Can't reach database server"

- Check your `DATABASE_URL` is correct
- Verify database password has no special characters that need encoding
- Ensure you selected the correct connection string (URI, not Transaction)

### "Invalid Supabase URL"

- Make sure you copied the full URL including `https://`
- Check there are no extra spaces or line breaks

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Database out of sync

```bash
npm run db:push
```

## Next Steps

1. **Seed some test data**: Create a few listings manually
2. **Test auth flow**: Try signing in with email magic link
3. **Upload images**: Test the listing creation with photos
4. **Deploy to Vercel**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Need Help?

- Check [README.md](./README.md) for full documentation
- Open a GitHub issue
- Email: [your-email]
