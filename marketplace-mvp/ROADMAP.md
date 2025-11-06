# TradeMate Development Roadmap

## 🎯 90-Day MVP to Launch

### Month 1: Core Features & Supply (Weeks 1-4)

**Week 1-2: Authentication & Listings**
- [ ] Implement Supabase Auth magic links (email)
- [ ] Add phone verification with Twilio (free tier: 15 SMS/month)
- [ ] Create listing detail page with image gallery
- [ ] Implement image upload to Supabase Storage
- [ ] Add edit/delete listing functionality
- [ ] Build user profile page
- [ ] Seed 150 test listings (team + friends)

**Week 3-4: Search & Discovery**
- [ ] Implement geospatial search (10km radius)
- [ ] Add advanced filters (price range, condition, category)
- [ ] Create search results page
- [ ] Add "Sort by distance" feature
- [ ] Implement full-text search (Postgres `tsvector`)
- [ ] Build category browse pages
- [ ] Add saved searches/favorites

**Goal**: 1,000 live listings by end of Month 1

---

### Month 2: Engagement & Liquidity (Weeks 5-8)

**Week 5-6: Messaging System**
- [ ] Build real-time chat UI (Supabase Realtime)
- [ ] Add message notifications (in-app)
- [ ] Create inbox/conversations view
- [ ] Add "Make an Offer" feature
- [ ] Block/report users in chat
- [ ] Add typing indicators
- [ ] Archive/delete conversations

**Week 7-8: Trust & Safety**
- [ ] Build review system (post-transaction only)
- [ ] Add trust score calculation (0-100)
- [ ] Create report/moderation UI
- [ ] Add admin moderation dashboard
- [ ] Implement auto-moderation rules:
  - Block phone numbers in descriptions
  - Flag suspicious pricing (too low/high)
  - Detect duplicate listings
- [ ] Create safety guide page (meetup tips)
- [ ] Add verified badge UI (email + phone)

**Goal**: 30% of listings get inquiry within 7 days

---

### Month 3: Growth & Retention (Weeks 9-12)

**Week 9-10: Growth Features**
- [ ] Implement push notifications (FCM/APNs)
- [ ] Add PWA offline support (service worker)
- [ ] Build referral system ("Invite a friend")
- [ ] Create price drop alerts
- [ ] Add "Similar listings" recommendations
- [ ] Build email notifications (new messages, price drops)
- [ ] Add social sharing (listing share cards)

**Week 11-12: SEO & Polish**
- [ ] Add structured data (schema.org Product/Offer)
- [ ] Create dynamic sitemaps
- [ ] Optimize meta tags per page
- [ ] Add Open Graph images
- [ ] Build landing pages per category
- [ ] Create blog for SEO (buying guides)
- [ ] Add Google Analytics / PostHog events
- [ ] Performance audit (Lighthouse score >90)

**Goal**: <1% scam rate, >4.6★ rating, 25% W2/W4 retention

---

## 📱 Feature Priorities (Post-Launch)

### P0 - Critical (Must-Have)
- [x] User authentication (email magic links)
- [x] Create/edit/delete listings
- [x] Browse/search listings
- [ ] Real-time messaging
- [ ] Image upload
- [ ] User reviews
- [ ] Report/moderation

### P1 - Important (Should-Have)
- [ ] Phone verification
- [ ] Geospatial search (radius)
- [ ] Push notifications
- [ ] Saved listings/favorites
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Price drop alerts

### P2 - Nice-to-Have
- [ ] Video uploads (30-second clips)
- [ ] Listing bumps (re-promote listing)
- [ ] Featured listings (paid)
- [ ] In-app payments (Stripe Connect)
- [ ] Meetup scheduling
- [ ] Delivery integration (Sendle API)
- [ ] Native mobile apps (React Native)

### P3 - Future Ideas
- [ ] AI-powered pricing suggestions
- [ ] Auto-translate listings (for multicultural users)
- [ ] AR product preview (IKEA-style)
- [ ] Expand to Sydney, Brisbane
- [ ] Add more categories (furniture, fashion)
- [ ] Business seller accounts
- [ ] Bulk listing tools

---

## 🔧 Technical Improvements

### Performance
- [ ] Add Redis caching layer (Upstash free tier)
- [ ] Implement image CDN (Cloudflare R2 free tier)
- [ ] Add database connection pooling (PgBouncer)
- [ ] Optimize SQL queries (add missing indexes)
- [ ] Implement lazy loading everywhere
- [ ] Add Edge API routes (Vercel Edge Functions)

### Developer Experience
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Add automated tests (Jest + Playwright)
- [ ] Create component library (Storybook)
- [ ] Add TypeScript strict mode
- [ ] Set up error tracking (Sentry free tier)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Create seed scripts for dev data

### Security
- [ ] Implement Row Level Security (RLS) in Supabase
- [ ] Add rate limiting (Upstash Redis)
- [ ] Set up CAPTCHA (Cloudflare Turnstile free)
- [ ] Add CSP headers
- [ ] Implement CSRF protection
- [ ] Set up automated dependency updates (Dependabot)
- [ ] Add penetration testing

---

## 📊 Growth Milestones

### Milestone 1: Proof of Concept (Month 1)
- 1,000 listings
- 100 active users
- 10 transactions
- **Metric**: Supply established ✓

### Milestone 2: Liquidity (Month 2)
- 2,000 listings
- 500 active users
- 100 transactions
- 30% inquiry rate
- **Metric**: Demand proven ✓

### Milestone 3: Trust (Month 3)
- 5,000 listings
- 2,000 active users
- 500 transactions
- <1% scam rate
- >4.6★ average rating
- **Metric**: Trust established ✓

### Milestone 4: Product-Market Fit (Month 6)
- 10,000 listings
- 5,000 MAU
- 2,000 monthly transactions
- 25% W2/W4 retention
- $60K ARR (if monetized at 3%)
- **Metric**: PMF achieved, ready to scale

---

## 💰 Monetization Strategy (Month 4+)

### Phase 1: Free (Months 1-3)
- Build supply & trust
- No fees, no upsells
- Focus on growth only

### Phase 2: Freemium (Month 4-6)
- **Free tier**: 5 active listings
- **Premium features**:
  - Featured listings: $5/week (top of search)
  - Unlimited listings: $10/month
  - Instant verification: $10 one-time
  - Bump listing: $2 (re-promote after 7 days)
- **Target**: $2K MRR

### Phase 3: Transaction Fees (Month 7+)
- **Stripe Connect**: 3% on protected payments
- **Voluntary only**: Buyers choose "Pay with Protection"
- **Value prop**: 7-day hold, dispute resolution
- **Target**: $10K MRR

### Phase 4: Business Accounts (Month 12+)
- **Small business plan**: $50/month
  - Bulk listing tools
  - Analytics dashboard
  - Priority support
  - Verified business badge
- **Target**: $20K MRR

**Projected Revenue (Month 12)**:
- Transaction fees: $15K/mo (500 transactions × 3%)
- Premium features: $5K/mo (500 users × $10)
- Business accounts: $5K/mo (100 businesses × $50)
- **Total ARR**: $300K

---

## 🌍 Expansion Plan (Year 2)

### Q1: Multi-City
- Expand to Sydney (50% market size of Melbourne)
- Test Brisbane (smaller, lower competition)
- Localize search/filters per city

### Q2: New Categories
- Add furniture (high demand, delivery partnerships)
- Add fashion (high turnover, photo-first)
- Test sports equipment (local pickup focus)

### Q3: Native Apps
- Build iOS app (React Native + Expo)
- Build Android app (share codebase)
- Add app-only features (camera, push notifications)

### Q4: Premium Features
- AI pricing assistant
- Video listings
- Delivery integration (Sendle, AusPost)
- Insurance for high-value items

---

## 🎓 Learning & Validation

### Key Assumptions to Test

**Month 1**:
- ✅ Can we acquire 1,000 listings? (supply)
- ✅ University partnerships work for seeding

**Month 2**:
- ❓ Do 30% of listings get inquiries? (demand)
- ❓ Is 10km radius the right default search?

**Month 3**:
- ❓ Can we keep scam rate <1%?
- ❓ Do users return within 2-4 weeks?

**Month 6**:
- ❓ Will users pay for premium features?
- ❓ Is electronics category enough, or expand?

---

## 🚨 Risk Mitigation

### Risk 1: Low Liquidity
**Impact**: High
**Probability**: Medium
**Mitigation**:
- Pre-seed 200 listings before launch
- Partner with 3 universities (concierge listing)
- Daily listing goals (50/day for 20 days)

### Risk 2: Scams/Fraud
**Impact**: Critical
**Probability**: Medium
**Mitigation**:
- Phone verification required for selling
- Auto-moderation (price anomalies, stock photos)
- Report button on every listing/message
- Insurance fund ($5K/year for fraud reimbursement)

### Risk 3: Gumtree/Facebook Copycat
**Impact**: Medium
**Probability**: Low
**Mitigation**:
- Move fast (90 days to liquidity)
- Lock in university partnerships (exclusivity)
- Focus on trust (verification, reviews, safety)

### Risk 4: Regulatory Issues
**Impact**: High
**Probability**: Low
**Mitigation**:
- Legal review ($3K) before launch
- Use licensed payment providers (Stripe/Zai)
- Clear Terms of Use, Privacy Policy
- OAIC data audit

---

## 🎯 Success Criteria

### Definition of "Success" (Month 12)

- ✅ 10,000 monthly active users
- ✅ 2,000 transactions/month
- ✅ $300K ARR
- ✅ <1% scam rate
- ✅ >4.6★ average rating
- ✅ 30% retention (users return within 30 days)
- ✅ Seed funding viable ($500K @ $3M valuation)

### Go/No-Go Decision Points

**Month 1**: If <500 listings → pivot category or city
**Month 2**: If <15% inquiry rate → UX/trust problem
**Month 3**: If >5% scam rate → shut down (liability risk)
**Month 6**: If <$10K MRR → re-evaluate monetization

---

## 📝 Next Actions (This Week)

1. [ ] Set up Supabase project
2. [ ] Configure environment variables
3. [ ] Push database schema
4. [ ] Create 10 test listings
5. [ ] Test auth flow end-to-end
6. [ ] Deploy to Vercel
7. [ ] Share with 5 friends for feedback

**Let's build! 🚀**
