# Local Development Guide

## 🚀 Quick Start (5 Minutes)

### Option A: Use Remote Supabase (Recommended)

**Pros**: No local database, easier setup
**Cons**: Requires internet, uses free tier quota

```bash
# 1. Install dependencies
cd marketplace-mvp
npm install

# 2. Set up Supabase (one-time)
# - Go to supabase.com
# - Create free account
# - New project → Sydney region → Wait 2 min
# - Copy credentials

# 3. Configure environment
cp .env.example .env.local

# Edit .env.local with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
# DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# 4. Enable PostGIS in Supabase
# - Go to SQL Editor in Supabase dashboard
# - Run: CREATE EXTENSION IF NOT EXISTS postgis;

# 5. Push database schema
npm run db:push

# 6. Start development server
npm run dev

# 7. Open browser
# http://localhost:3000
```

**Done!** App is running with cloud database.

---

### Option B: 100% Local (No Cloud)

**Pros**: Works offline, no sign-ups needed
**Cons**: Need Docker, more setup

```bash
# 1. Install Docker Desktop
# Download from docker.com

# 2. Start local Postgres
docker run -d \
  --name trademate-db \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=trademate \
  postgis/postgis:15-3.3

# 3. Install dependencies
cd marketplace-mvp
npm install

# 4. Configure local environment
cp .env.example .env.local

# Edit .env.local:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/trademate

# For now, you can skip Supabase Auth (use mock data)
# Or create free Supabase account just for Auth

# 5. Push database schema
npm run db:push

# 6. Start app
npm run dev
```

**Browse**: http://localhost:3000

---

## 🗂️ Project Structure

```
marketplace-mvp/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Home (grid view)
│   │   ├── feed/              # Feed view
│   │   ├── map/               # Map view
│   │   ├── listings/new/      # Create listing
│   │   ├── auth/signin/       # Authentication
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   └── ProductCard.tsx    # Full-screen card
│   ├── lib/                   # Utilities
│   │   ├── supabase.ts       # Supabase client
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helpers
│   └── types/                # TypeScript types
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── .env.local               # Environment variables (create this)
├── package.json
└── README.md
```

---

## 📝 Common Tasks

### View the Database

```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Opens at http://localhost:5555
# Browse tables, add/edit data
```

### Reset Database

```bash
# Drop all tables and recreate
npm run db:push -- --force-reset
```

### Add Seed Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      phone: '0412345678',
      name: 'Test User',
      emailVerified: true,
      phoneVerified: true,
    },
  })

  // Create test listing
  await prisma.listing.create({
    data: {
      sellerId: user.id,
      title: 'iPhone 14 Pro 256GB Space Black',
      description: 'Excellent condition, barely used.',
      price: 119900, // $1199 in cents
      category: 'Phones & Tablets',
      condition: 'Like New',
      images: [
        'https://picsum.photos/800/1200?random=1',
        'https://picsum.photos/800/1200?random=2',
      ],
      latitude: -37.8136,
      longitude: 144.9631,
      suburb: 'Melbourne CBD',
      city: 'Melbourne',
    },
  })

  console.log('✅ Seed data created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add to `package.json`:

```json
{
  "scripts": {
    "seed": "tsx prisma/seed.ts"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  }
}
```

Run:

```bash
npm install tsx --save-dev
npm run seed
```

---

## 🔧 Troubleshooting

### Port 3000 already in use

```bash
# Find process
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

### Database connection failed

```bash
# Check Docker is running
docker ps

# Check Postgres is running
docker logs trademate-db

# Restart database
docker restart trademate-db
```

### Prisma Client out of sync

```bash
# Regenerate Prisma Client
npm run db:generate
```

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

---

## 🎨 Development Tips

### Hot Reload

Changes auto-reload in browser. If not working:

```bash
# Restart dev server
# Ctrl+C, then npm run dev
```

### TypeScript Errors

```bash
# Check types
npm run build

# Fix with IDE
# VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Tailwind CSS Not Working

```bash
# Make sure globals.css is imported in layout.tsx
# Already done in this project!
```

---

## 📱 Testing on Mobile

### Same WiFi

```bash
# Find your local IP
# Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig

# Example: 192.168.1.100

# Run dev server
npm run dev

# Visit on phone
# http://192.168.1.100:3000
```

### Ngrok (Public URL)

```bash
# Install ngrok
brew install ngrok
# or download from ngrok.com

# Expose port 3000
ngrok http 3000

# Share the https URL with anyone!
```

---

## 🧪 Testing Features

### Current Features (Working)

- ✅ Home page (grid view)
- ✅ Feed view (full-screen cards)
- ✅ Map view (mockup)
- ✅ Create listing form (UI only)
- ✅ Sign in page (UI only)

### Needs Backend Setup

- ⏳ Authentication (need Supabase Auth)
- ⏳ Image upload (need Supabase Storage)
- ⏳ Real listings (need to push schema)
- ⏳ Messaging (need Supabase Realtime)

---

## 🚢 Deploy When Ready

### To Vercel (Free)

```bash
# 1. Push to GitHub
git push origin main

# 2. Visit vercel.com/new
# 3. Import your repo
# 4. Add environment variables
# 5. Deploy!

# Auto-deploys on every push
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Push schema to DB
npm run db:studio        # Open database GUI
npm run db:generate      # Regenerate Prisma Client

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub
```

---

## 🎯 Next Steps

1. **Run locally**: Follow Option A or B above
2. **Add test data**: Use Prisma Studio or seed script
3. **Test feed view**: Visit http://localhost:3000/feed
4. **Deploy to Vercel**: Make it live for free!

---

## ❓ Questions?

- **Setup issues**: Check [SETUP.md](./SETUP.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Infrastructure**: Read [INFRASTRUCTURE.md](./INFRASTRUCTURE.md)
- **Features**: Consult [ROADMAP.md](./ROADMAP.md)

**Happy coding! 🚀**
