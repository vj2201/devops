# Step-by-Step Deployment Guide (With Screenshots Descriptions)

This guide will walk you through deploying TradeMate to production in **~15 minutes**.

## 📋 What You'll Need

- ✅ GitHub account (free)
- ✅ Email address
- ✅ Your marketplace-mvp code

---

## Part 1: Set Up Supabase (5 minutes)

### Step 1: Create Supabase Account

**Go to**: [https://supabase.com](https://supabase.com)

**You'll see**:
```
┌─────────────────────────────────────┐
│  Supabase Homepage                  │
│                                     │
│  [Start your project] button        │
│  (top right corner)                 │
└─────────────────────────────────────┘
```

**Click**: "Start your project" or "Sign Up"

---

### Step 2: Sign Up Options

**You'll see**:
```
┌─────────────────────────────────────┐
│  Sign up with:                      │
│                                     │
│  [GitHub]    ← Click this (easiest) │
│  [Google]                           │
│  [Email]                            │
└─────────────────────────────────────┘
```

**Recommended**: Sign up with GitHub (one click, no password needed)

**What happens**:
- GitHub will ask permission to share your email
- Click "Authorize"
- You're logged in!

---

### Step 3: Create New Project

**You'll see the dashboard**:
```
┌─────────────────────────────────────┐
│  All Projects                       │
│                                     │
│  [+ New Project] ← Click this       │
└─────────────────────────────────────┘
```

**Click**: "+ New Project"

---

### Step 4: Create Organization (First Time Only)

If this is your first time, you'll see:
```
┌─────────────────────────────────────┐
│  Create Organization                │
│                                     │
│  Organization name:                 │
│  [your-name] ← Enter your name      │
│                                     │
│  [Create organization]              │
└─────────────────────────────────────┘
```

**Enter**: Your name or company name (e.g., "MyProjects")
**Click**: "Create organization"

---

### Step 5: Project Configuration

**You'll see this form**:
```
┌─────────────────────────────────────┐
│  Create a new project               │
│                                     │
│  Name:                              │
│  [trademate-mvp] ← Enter this       │
│                                     │
│  Database Password:                 │
│  [••••••••••••••] ← Auto-generated  │
│  📋 Copy ← IMPORTANT! Copy this!    │
│                                     │
│  Region:                            │
│  [Australia (Sydney)] ← Choose this │
│                                     │
│  Pricing Plan:                      │
│  [Free] ✅ Selected                 │
│                                     │
│  [Create new project]               │
└─────────────────────────────────────┘
```

**IMPORTANT**:
1. ⚠️ **Copy the database password** and save it somewhere safe (you'll need it later!)
2. Choose **Sydney** region (closest to Melbourne, fastest speed)
3. Leave "Free" plan selected

**Click**: "Create new project"

---

### Step 6: Wait for Provisioning

**You'll see**:
```
┌─────────────────────────────────────┐
│  Setting up your project...         │
│                                     │
│  [■■■■■■░░░░░░░░░░] 40%            │
│                                     │
│  Initializing database              │
│  Estimated time: 2 minutes          │
└─────────────────────────────────────┘
```

**Wait**: ~2 minutes (grab a coffee ☕)

---

### Step 7: Enable PostGIS Extension

**When ready, you'll see the dashboard**:
```
┌─────────────────────────────────────┐
│  trademate-mvp                      │
│  ┌─────────────────────────────┐   │
│  │ SQL Editor    ← Click here  │   │
│  │ Table Editor               │   │
│  │ Database                   │   │
│  │ Storage                    │   │
└─────────────────────────────────────┘
```

**Click**: "SQL Editor" (in left sidebar)

**You'll see**:
```
┌─────────────────────────────────────┐
│  SQL Editor                         │
│                                     │
│  [+ New query] ← Click this         │
│                                     │
│  Type your SQL here...              │
└─────────────────────────────────────┘
```

**Click**: "+ New query"

**Paste this SQL**:
```sql
-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;
```

**Click**: "Run" button (or press Ctrl+Enter)

**You'll see**:
```
Success ✅
No rows returned
```

**Perfect!** PostGIS is now enabled.

---

### Step 8: Create Storage Bucket

**Click**: "Storage" (in left sidebar)

**You'll see**:
```
┌─────────────────────────────────────┐
│  Storage                            │
│                                     │
│  [Create a new bucket] ← Click this │
└─────────────────────────────────────┘
```

**You'll see a form**:
```
┌─────────────────────────────────────┐
│  Create bucket                      │
│                                     │
│  Name:                              │
│  [listings] ← Enter this            │
│                                     │
│  Public bucket:                     │
│  [✓] ← Check this box               │
│                                     │
│  [Create bucket]                    │
└─────────────────────────────────────┘
```

**Enter**: "listings" as name
**Check**: "Public bucket" (so images are accessible)
**Click**: "Create bucket"

---

### Step 9: Copy API Credentials

**Click**: "Settings" (in left sidebar, bottom)
**Click**: "API" (in settings submenu)

**You'll see**:
```
┌─────────────────────────────────────────────────────┐
│  Project API                                        │
│                                                     │
│  Project URL:                                       │
│  https://abcdefgh.supabase.co                      │
│  📋 Copy ← Click to copy                            │
│                                                     │
│  API Keys:                                          │
│                                                     │
│  anon public:                                       │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...           │
│  📋 Copy ← Click to copy                            │
│                                                     │
│  service_role (secret):                             │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...           │
│  [Reveal] 👁️ ← Click to reveal, then copy          │
│  📋 Copy                                            │
└─────────────────────────────────────────────────────┘
```

**Copy these 3 things** and paste them somewhere safe (Notepad, Notes app):

1. **Project URL** (e.g., https://abcdefgh.supabase.co)
2. **anon public key** (the long string starting with eyJ...)
3. **service_role key** (click "Reveal" first, then copy)

---

### Step 10: Get Database URL

**Click**: "Database" (in left sidebar under Settings)
**Scroll down** to "Connection string"

**You'll see**:
```
┌─────────────────────────────────────────────────────┐
│  Connection Info                                    │
│                                                     │
│  Connection string:                                 │
│                                                     │
│  [URI] [Session mode] [Transaction mode]           │
│    ↑ Click this tab                                │
│                                                     │
│  postgresql://postgres:[YOUR-PASSWORD]@            │
│  db.abcdefgh.supabase.co:5432/postgres             │
│                                                     │
│  📋 Copy                                            │
└─────────────────────────────────────────────────────┘
```

**Click**: "URI" tab
**You'll see**: A connection string with `[YOUR-PASSWORD]` in it

**Replace** `[YOUR-PASSWORD]` with the password you saved in Step 5

**Example**:
```
Before:
postgresql://postgres:[YOUR-PASSWORD]@db.xyz.supabase.co:5432/postgres

After:
postgresql://postgres:MySecurePass123@db.xyz.supabase.co:5432/postgres
```

**Copy** the full string and save it.

---

### ✅ Supabase Setup Complete!

You should now have **4 things saved**:

```
1. NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
2. NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
3. SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
4. DATABASE_URL=postgresql://postgres:password@db.xyz.supabase.co:5432/postgres
```

Keep these safe! You'll need them for Vercel.

---

## Part 2: Deploy to Vercel (5 minutes)

### Step 1: Push Code to GitHub

**Open Terminal** in your marketplace-mvp folder:

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub (go to github.com/new)
# Then run:
git remote add origin https://github.com/YOUR-USERNAME/trademate-mvp.git
git branch -M main
git push -u origin main
```

**Or if you already pushed** (you did earlier), you're good! ✅

---

### Step 2: Create Vercel Account

**Go to**: [https://vercel.com](https://vercel.com)

**You'll see**:
```
┌─────────────────────────────────────┐
│  Vercel Homepage                    │
│                                     │
│  [Start Deploying] button           │
│  or                                 │
│  [Sign Up] (top right)              │
└─────────────────────────────────────┘
```

**Click**: "Sign Up" or "Start Deploying"

---

### Step 3: Sign Up with GitHub

**You'll see**:
```
┌─────────────────────────────────────┐
│  Continue with:                     │
│                                     │
│  [GitHub]    ← Click this           │
│  [GitLab]                           │
│  [Bitbucket]                        │
│  [Email]                            │
└─────────────────────────────────────┘
```

**Click**: "GitHub"

**What happens**:
- GitHub will ask: "Authorize Vercel?"
- Click "Authorize"
- You're logged in!

---

### Step 4: Import Git Repository

**You'll see the Vercel dashboard**:
```
┌─────────────────────────────────────┐
│  Let's build something new.         │
│                                     │
│  Import Git Repository              │
│                                     │
│  [Import] ← Click next to your repo │
└─────────────────────────────────────┘
```

**You'll see your GitHub repos**:
```
┌─────────────────────────────────────┐
│  YOUR-USERNAME/trademate-mvp        │
│                        [Import] ←   │
│                                     │
│  YOUR-USERNAME/other-repo           │
│                        [Import]     │
└─────────────────────────────────────┘
```

**Click**: "Import" next to your trademate-mvp repo

---

### Step 5: Configure Project

**You'll see**:
```
┌─────────────────────────────────────────────────────┐
│  Configure Project                                  │
│                                                     │
│  Project Name:                                      │
│  trademate-mvp ✅ (auto-filled)                     │
│                                                     │
│  Framework Preset:                                  │
│  Next.js ✅ (auto-detected)                         │
│                                                     │
│  Root Directory:                                    │
│  marketplace-mvp ← IMPORTANT! Set this              │
│  [Edit] ← Click to change                           │
│                                                     │
│  Build and Output Settings:                         │
│  [defaults are fine]                                │
│                                                     │
│  Environment Variables: ▼ Click to expand          │
│                                                     │
│  [Deploy]                                           │
└─────────────────────────────────────────────────────┘
```

**IMPORTANT**: Click "Edit" next to Root Directory

**Set Root Directory**:
```
┌─────────────────────────────────────┐
│  Root Directory                     │
│                                     │
│  [marketplace-mvp]  ← Enter this    │
│                                     │
│  [Save]                             │
└─────────────────────────────────────┘
```

This tells Vercel your code is in the `marketplace-mvp` folder.

---

### Step 6: Add Environment Variables

**Click**: "Environment Variables" (expand the section)

**You'll see**:
```
┌─────────────────────────────────────────────────────┐
│  Environment Variables                              │
│                                                     │
│  Key                    Value                       │
│  [____________]         [___________________]       │
│                                                     │
│  [+ Add another]                                    │
└─────────────────────────────────────────────────────┘
```

**Add these 5 variables** (use the credentials from Supabase Step 10):

**Variable 1:**
```
Key:   DATABASE_URL
Value: postgresql://postgres:YourPass@db.xyz.supabase.co:5432/postgres
```

**Variable 2:**
```
Key:   NEXT_PUBLIC_SUPABASE_URL
Value: https://abcdefgh.supabase.co
```

**Variable 3:**
```
Key:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Variable 4:**
```
Key:   SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Variable 5 (Optional - Mapbox):**
```
Key:   NEXT_PUBLIC_MAPBOX_TOKEN
Value: (get free token from mapbox.com - can skip for now)
```

**Click**: "+ Add another" after each variable

---

### Step 7: Deploy!

**Click**: "Deploy" button (big blue button at bottom)

**You'll see**:
```
┌─────────────────────────────────────┐
│  Building...                        │
│                                     │
│  [████████████░░░░░░] 60%          │
│                                     │
│  Running build command:             │
│  npm run build                      │
│                                     │
│  ✓ Compiled successfully            │
└─────────────────────────────────────┘
```

**Wait**: ~2-3 minutes

---

### Step 8: Success! 🎉

**You'll see**:
```
┌─────────────────────────────────────┐
│  🎉 Congratulations!                │
│                                     │
│  Your project is live:              │
│                                     │
│  https://trademate-mvp.vercel.app   │
│         ↑ Click to visit            │
│                                     │
│  [Visit] [Analytics] [Continue to Dashboard]  │
└─────────────────────────────────────┘
```

**Click**: "Visit" to see your live app!

---

## Part 3: Set Up Database Schema (2 minutes)

**Now that Vercel is deployed**, let's create the database tables.

### Option A: Use Vercel CLI (Recommended)

**In your terminal**:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
cd marketplace-mvp
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema to Supabase
npm run db:push
```

**You'll see**:
```
Your database is now in sync with your schema.
✔ Generated Prisma Client
```

**Done!** Tables are created.

---

### Option B: Manual (if CLI doesn't work)

**In your local terminal**:

```bash
cd marketplace-mvp

# Create .env.local with your Supabase credentials
# (paste the 4 variables from earlier)

# Push schema
npm run db:push
```

---

## Part 4: Test Your Live App! 🚀

**Visit**: `https://YOUR-APP-NAME.vercel.app/feed`

**You should see**:
```
┌─────────────────────────────────────┐
│  TradeMate                          │
│                                     │
│  [All] [Phones] [Laptops]...        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    (Mock product card)      │   │
│  │                             │   │
│  │    iPhone 14 Pro            │   │
│  │    $1,199                   │   │
│  │                             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**It's live!** 🎉

---

## Troubleshooting

### Build Failed?

**Check**:
1. Root Directory is set to `marketplace-mvp`
2. All 4 environment variables are added correctly
3. No extra spaces in environment variable values

**In Vercel Dashboard**:
- Click "Deployments"
- Click failed deployment
- Scroll down to see error logs

---

### White Screen / Nothing Shows?

**Check**:
1. Visit `/feed` specifically: `https://your-app.vercel.app/feed`
2. Check browser console (F12) for errors
3. Make sure Supabase credentials are correct

---

### Database Connection Error?

**Check**:
1. `DATABASE_URL` has correct password (no `[YOUR-PASSWORD]` placeholder)
2. Run `npm run db:push` to create tables
3. Go to Supabase dashboard → Table Editor → check if tables exist

---

## Next Steps

### 1. Add Real Listings

**Open Prisma Studio**:
```bash
npm run db:studio
```

**Add test listings**:
- Click "Listing" table
- Click "Add record"
- Fill in details
- Save

**Or** create a seed script (see LOCAL_DEV.md)

---

### 2. Configure Supabase Auth

**In Supabase dashboard**:
- Go to Authentication → URL Configuration
- Add Site URL: `https://your-app.vercel.app`
- Add Redirect URL: `https://your-app.vercel.app/auth/callback`

---

### 3. Get Mapbox Token (Optional)

**Go to**: [https://account.mapbox.com](https://account.mapbox.com)
- Sign up (free)
- Copy default token
- Add to Vercel environment variables:
  - Go to Vercel dashboard → Settings → Environment Variables
  - Add: `NEXT_PUBLIC_MAPBOX_TOKEN` = `your-token`
  - Redeploy

---

## 🎉 You're Done!

**Your app is now**:
- ✅ Live on the internet
- ✅ Has a database
- ✅ Auto-deploys on git push
- ✅ Has SSL (https)
- ✅ Global CDN
- ✅ Costs $0/month

**Share your URL** with friends and get feedback!

---

## Automatic Deployments

**Every time you push to GitHub**:
```bash
git add .
git commit -m "Add new feature"
git push
```

**Vercel automatically**:
1. Detects the push
2. Builds your app
3. Deploys to production
4. Updates your URL

**You'll get email notifications** when deployments succeed or fail.

---

## Custom Domain (Optional)

**Want your own domain?** (e.g., trademate.com.au)

**In Vercel dashboard**:
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records (Vercel shows you how)
4. Done! Your app is at your domain

**Cost**: ~$15/year for domain registration

---

## Summary

**What you set up**:

```
Supabase (Backend)
├─ PostgreSQL database ✅
├─ PostGIS extension ✅
├─ Storage bucket ✅
└─ API credentials ✅

Vercel (Frontend)
├─ Next.js deployment ✅
├─ Environment variables ✅
├─ Auto-deploy on push ✅
└─ Live URL ✅

Database Schema
└─ Tables created ✅
```

**Total time**: ~15 minutes
**Total cost**: $0/month
**Capacity**: 10,000+ users

---

## Need Help?

**Common Issues**:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Ask in Supabase Discord
- Ask in Vercel Discord

**Questions?**
- Email me
- Open GitHub issue
- Check the docs

**Happy deploying! 🚀**
