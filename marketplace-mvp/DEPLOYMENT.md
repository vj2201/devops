# Deployment Guide

## Deploy to Vercel (Free Tier)

### Prerequisites

- GitHub account
- Vercel account (sign up with GitHub)
- Supabase project set up (see [SETUP.md](./SETUP.md))

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: TradeMate MVP"
git branch -M main
git remote add origin https://github.com/yourusername/trademate-mvp.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your `trademate-mvp` repo
4. Click **Import**

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
NEXT_PUBLIC_MAPBOX_TOKEN=[YOUR-MAPBOX-TOKEN]
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_DEFAULT_CITY=Melbourne
```

**Important**: Copy these from your `.env.local` file!

### Step 4: Deploy

1. Click **Deploy**
2. Wait ~2 minutes for build
3. Your app is live! 🎉

### Step 5: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `trademate.com.au`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Step 6: Configure Supabase Auth Redirects

1. Go to Supabase dashboard → **Authentication** → **URL Configuration**
2. Add these URLs:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**:
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for local dev)

## Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel.

### Preview Deployments

Pull requests get their own preview URL automatically:
- `https://trademate-mvp-pr-123.vercel.app`

## Monitoring & Analytics

### Free Tools

1. **Vercel Analytics** (Free)
   - Go to **Analytics** tab in Vercel
   - View page views, top pages, performance

2. **Supabase Dashboard**
   - Monitor database size, storage, API requests
   - Set up alerts for quota limits

3. **PostHog** (Optional, 1M events/month free)
   - Sign up at [posthog.com](https://posthog.com)
   - Add tracking script to `app/layout.tsx`

## Database Migrations

When you update the Prisma schema:

```bash
# Update local database
npm run db:push

# Vercel will automatically apply migrations on next deploy
git push
```

## Rollback Deployments

1. Go to Vercel dashboard → **Deployments**
2. Find previous working deployment
3. Click **⋯** → **Promote to Production**

## Performance Optimization

### Image Optimization

Images are automatically optimized by Next.js:
- WebP format
- Responsive sizes
- Lazy loading

### Caching Strategy

```javascript
// In API routes
export const revalidate = 60 // Revalidate every 60 seconds
```

### Edge Functions (Coming Soon)

Move API routes to Edge for global low latency:

```javascript
export const runtime = 'edge'
```

## Scaling Beyond Free Tier

### When to Upgrade

**Vercel**: Free tier is generous
- Upgrade to Pro ($20/mo) if you need:
  - More team members
  - Analytics for more than 1 site
  - Priority support

**Supabase**: Free tier limits
- 500MB database → $25/mo for 8GB
- 1GB storage → $0.021/GB/month
- 50K MAU → $25/mo for 100K

**Expected costs at scale**:
- 10K MAU: ~$0/month (within free tier)
- 50K MAU: ~$25/month (Supabase Pro)
- 100K MAU: ~$75/month (Supabase Pro + Vercel Pro)

## Security Checklist

Before going live:

- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up Row Level Security (RLS) in Supabase
- [ ] Rotate service role key if accidentally exposed
- [ ] Enable Supabase Auth email rate limiting
- [ ] Add CAPTCHA to listing creation (Cloudflare Turnstile - free)
- [ ] Set up CORS headers
- [ ] Enable Vercel Web Application Firewall (WAF)

## Backup Strategy

### Supabase Backups

Free tier: Daily backups (7-day retention)

To download backup:
1. Go to **Database** → **Backups**
2. Click **Download**

### Code Backups

Automatically backed up on GitHub.

## Monitoring Quotas

Set up alerts before hitting limits:

### Supabase

1. Go to **Settings** → **Billing**
2. View current usage
3. Set up email alerts at 80% quota

### Vercel

1. Go to **Settings** → **Usage**
2. Monitor bandwidth, build minutes
3. Alerts sent automatically at 80%

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard:
- Missing environment variables?
- TypeScript errors?
- Prisma client not generated?

Fix:
```bash
# Generate Prisma client in build
npm run db:generate
npm run build
```

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check Supabase project isn't paused (free tier pauses after 7 days inactivity)
- Restart Supabase project if needed

### Slow Performance

- Check Vercel Analytics for slow pages
- Optimize images (use Next.js Image component)
- Add database indexes:

```sql
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_suburb ON listings(suburb);
```

## Support

- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)
- GitHub Issues: [your-repo/issues](https://github.com/yourusername/trademate-mvp/issues)
