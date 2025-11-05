# Infrastructure Guide

## Architecture Overview

TradeMate uses a **serverless/managed architecture** - no servers to manage!

```
┌──────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │   Vercel CDN/Edge       │  ← Free tier
        │   - Next.js SSR         │
        │   - Static assets       │
        │   - API routes          │
        │   - Auto SSL            │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │   Supabase              │  ← Free tier
        │   - Postgres DB         │
        │   - Auth (magic links)  │
        │   - Storage (images)    │
        │   - Realtime (chat)     │
        └─────────────────────────┘
```

## 🎯 Recommended Setup (Pet Project)

### Option 1: Vercel + Supabase (RECOMMENDED) ✅

**Cost**: $0/month
**Limits**:
- 100GB bandwidth (Vercel)
- 500MB database (Supabase)
- 1GB storage (Supabase)
- 50K monthly active users

**Perfect for**:
- Solo pet projects
- MVPs
- Validating ideas
- 0-10K users

**Pros**:
- ✅ Zero infrastructure management
- ✅ Auto-scaling
- ✅ Global CDN
- ✅ Free SSL
- ✅ Git-based deployments
- ✅ Preview deployments per PR

**Cons**:
- ❌ Vendor lock-in (easy to migrate if needed)
- ❌ Limited control (fine for most apps)

**Setup time**: 5 minutes

---

### Option 2: Local Development Only ✅

**Cost**: $0/month
**Perfect for**: Solo development, testing, not ready to share

**How to run**:

```bash
# Terminal 1: Database (local Postgres)
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres \
  postgis/postgis:15-3.3

# Terminal 2: App
cd marketplace-mvp
npm run dev
```

**Pros**:
- ✅ Completely free
- ✅ Full control
- ✅ Fast iteration

**Cons**:
- ❌ Not accessible to others
- ❌ No production testing
- ❌ Must run manually

---

## ⚠️ NOT Recommended (Overkill for Pet Project)

### Option 3: AWS ECS/Fargate

**Cost**: $30-50/month minimum
**Complexity**: Medium
**Why avoid**: Over-engineered for MVP

```yaml
# Would need:
- Dockerfile
- ECS task definition
- Load balancer ($18/month minimum)
- RDS database ($15-30/month)
- S3 + CloudFront
- VPC setup
```

### Option 4: AWS EKS (Kubernetes)

**Cost**: $73+/month
**Complexity**: High
**Why avoid**: Enterprise-scale solution, total overkill

```yaml
# Would need:
- EKS cluster ($73/month just for control plane)
- Worker nodes ($30-100/month)
- Helm charts
- Ingress controllers
- Persistent volumes
- Monitoring stack
```

### Option 5: EC2 + RDS

**Cost**: $40-80/month
**Complexity**: Medium
**Why avoid**: Manual server management, no auto-scaling

---

## 📦 Containerization (Optional)

### Do You Need Docker?

**For development**: Optional (nice to have)
**For production**: Not needed (Vercel handles it)

### If You Want Docker Locally:

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/trademate
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    depends_on:
      - db

  db:
    image: postgis/postgis:15-3.3
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=trademate
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Run**:
```bash
docker-compose up
```

**But**: This is optional! Vercel deployment doesn't need Docker.

---

## 🚀 Deployment Steps (Recommended Path)

### 1. Vercel Deployment (5 minutes)

```bash
# 1. Install Vercel CLI (optional)
npm i -g vercel

# 2. Push to GitHub
git push origin main

# 3. Import to Vercel
# Visit vercel.com/new
# Click "Import" → Select your repo
# Add environment variables:
#   - DATABASE_URL
#   - NEXT_PUBLIC_SUPABASE_URL
#   - NEXT_PUBLIC_SUPABASE_ANON_KEY
#   - SUPABASE_SERVICE_ROLE_KEY
#   - NEXT_PUBLIC_MAPBOX_TOKEN

# 4. Deploy!
# Auto-deploys on every git push to main
```

### 2. Supabase Setup (2 minutes)

```bash
# 1. Create account at supabase.com
# 2. New project → Sydney region
# 3. Enable PostGIS:
CREATE EXTENSION IF NOT EXISTS postgis;

# 4. Create storage bucket "listings" (public)
# 5. Copy credentials to Vercel env vars
```

### 3. Database Schema

```bash
# Push schema to Supabase
npm run db:push
```

**Done!** Your app is live at `https://your-app.vercel.app`

---

## 📊 Free Tier Limits

### Vercel

- ✅ Unlimited sites
- ✅ 100GB bandwidth/month
- ✅ Unlimited builds (6 hours max)
- ✅ Auto SSL
- ✅ Preview deployments
- ⚠️ Hobby (non-commercial) or Pro ($20/mo)

### Supabase

- ✅ 500MB database (enough for 10K+ listings)
- ✅ 1GB file storage (compressed images)
- ✅ 50K monthly active users
- ✅ 2GB bandwidth
- ⚠️ Paused after 1 week inactivity (just visit to resume)

### When to Upgrade?

**Supabase Pro ($25/mo)**:
- 8GB database
- 100GB storage
- No inactivity pause

**Vercel Pro ($20/mo)**:
- Commercial use
- Team features
- Analytics

---

## 🎯 Recommended Architecture Progression

### Phase 1: MVP (Now) - $0/month
```
Vercel (free) + Supabase (free)
└─ Good for: 0-5K users
```

### Phase 2: Growth - $25-50/month
```
Vercel (free) + Supabase Pro ($25)
└─ Good for: 5K-50K users
```

### Phase 3: Scale - $100-300/month
```
Vercel Pro ($20) + Supabase Pro ($25) + CDN ($50)
└─ Good for: 50K-500K users
```

### Phase 4: Enterprise - $500+/month
```
AWS ECS/EKS + RDS + ElastiCache + CloudFront
└─ Good for: 500K+ users
```

**Start with Phase 1!** 99% of pet projects never need Phase 4.

---

## 🛠️ Development Workflow

### Daily Development

```bash
# Just run locally
npm run dev

# Uses remote Supabase DB
# Or local Postgres if you prefer
```

### Push Changes

```bash
git add .
git commit -m "feat: add new feature"
git push

# Vercel auto-deploys!
```

### Database Changes

```bash
# Update schema.prisma
# Push to Supabase
npm run db:push
```

---

## ❓ FAQ

### Do I need AWS?

**No!** Vercel + Supabase is simpler and cheaper.

### Do I need Docker?

**No!** Only if you want local Postgres. Vercel handles builds.

### Do I need Kubernetes?

**Definitely not!** That's for apps with millions of users.

### Can I run 100% local?

**Yes!**

```bash
# Local Postgres
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgis/postgis

# Update .env.local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/trademate

# Run app
npm run dev
```

### What if I outgrow free tier?

Upgrade to Supabase Pro ($25/mo) first. That handles 100K users easily.

### Can I self-host later?

Yes! Next.js works anywhere:
- AWS (ECS, EC2, Amplify)
- Google Cloud Run
- Azure App Service
- Your own VPS

---

## 🎯 Bottom Line

### For Pet Project (NOW):

**Use**: Vercel + Supabase (free tiers)
**Cost**: $0/month
**Setup**: 5 minutes
**Handles**: 10K users easily

### If You Want Local Only:

**Use**: `npm run dev` + local Postgres
**Cost**: $0/month
**Good for**: Solo development, testing

### DON'T Use (Yet):

- ❌ EKS/Kubernetes (overkill)
- ❌ ECS/Fargate (premature)
- ❌ EC2 (manual work)

---

**Your code is ready to deploy to Vercel RIGHT NOW - no infrastructure code needed!**
