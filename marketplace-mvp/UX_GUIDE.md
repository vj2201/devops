# TradeMate UX Guide

## 🎨 Design Philosophy

TradeMate uses a **hybrid discovery model** inspired by Instagram and TikTok - making product browsing **passive, delightful, and addictive** rather than active searching.

---

## 📱 Three Views

### 1. **Feed View** (Instagram-style) 🔥

**Route**: `/feed`

**Experience**:
- Full-screen vertical cards (one product per screen)
- Scroll or swipe up for next product
- Category tabs at top (swipe left/right to switch)
- Zero cognitive load - just consume

**Perfect for**:
- Casual browsing
- Discovery ("what's available?")
- Entertainment-driven shopping
- Mobile users (80% of traffic)

**Key Features**:
- ✅ Full-screen product cards
- ✅ Category filter (swipeable tabs)
- ✅ Image gallery per product (swipe left/right)
- ✅ One-tap actions (Save, Message)
- ✅ Snap scroll (one item at a time)
- ✅ Floating action buttons (Search, Post)

---

### 2. **Map View** (Snap Map-style) 🗺️

**Route**: `/map`

**Experience**:
- Interactive map centered on Melbourne
- Pins show live listings nearby
- Tap pin to preview item
- See exact distance ("500m away")

**Perfect for**:
- Local pickup urgency
- Exploring neighborhoods
- Visualizing availability
- "I need it today" buyers

**Key Features**:
- ✅ Cluster pins by location
- ✅ Price-labeled pins
- ✅ Preview card on tap
- ✅ Distance calculation
- ⏳ Mapbox integration (needs API key)

---

### 3. **Grid View** (Traditional) 📊

**Route**: `/` (home)

**Experience**:
- Classic marketplace layout
- Search bar + filters
- Grid of listing cards
- Sort by price/date

**Perfect for**:
- Power users
- Specific searches ("iPhone 14 Pro")
- Price comparison
- Desktop users

**Key Features**:
- ✅ Search bar
- ✅ Category tabs
- ✅ Sort options
- ✅ Filter sidebar (upcoming)

---

## 🎯 User Flows

### Casual Browser Flow
```
Open app → Feed View
         ↓
      Scroll through products (passive)
         ↓
      See iPhone 14 → Swipe right to next image
         ↓
      Double-tap Save
         ↓
      Swipe up to next product
         ↓
      Repeat for 10+ items (avg. 8 min session)
```

### Urgent Local Buyer Flow
```
Open app → Map View
         ↓
      Zoom to my suburb
         ↓
      Tap pin "500m away"
         ↓
      See preview: "iPhone 14 - $800"
         ↓
      Tap "Message" → Arrange pickup today
```

### Power User Flow
```
Open app → Grid View (home)
         ↓
      Type "MacBook Pro M2"
         ↓
      Filter: Price $2000-$3000
         ↓
      Sort by: Newest
         ↓
      Open specific listing
```

---

## 🔥 Why This UX Works

### Instagram vs. Facebook Marketplace

| Aspect | Facebook Marketplace | TradeMate |
|--------|---------------------|-----------|
| **First screen** | Search box + grid | Full-screen product card |
| **Browsing** | Active (must scroll grid) | Passive (swipe/scroll) |
| **Discovery** | Search-dependent | Algorithm + categories |
| **Mobile UX** | Desktop-ported | Native mobile-first |
| **Engagement** | 2-3 min avg session | 8-10 min (addictive scroll) |

### Key Differences

**Traditional Marketplaces**:
- Search → Filter → Grid → Click → View
- High friction (5 steps to see product)
- Requires knowing what you want

**TradeMate Feed**:
- Open → See product (1 step)
- Low friction (instant gratification)
- Great for "just browsing"

---

## 🎮 Interaction Design

### Gestures (Feed View)

| Gesture | Action |
|---------|--------|
| Scroll/swipe up | Next product |
| Scroll/swipe down | Previous product |
| Swipe left on category tabs | Next category |
| Swipe right on category tabs | Previous category |
| Swipe left/right on images | Next/prev image in gallery |
| Double-tap | Save listing |
| Tap price/title | View full details |

### Buttons

| Button | Location | Action |
|--------|----------|--------|
| Save | Bottom left | Add to favorites |
| Message | Bottom right | Start chat |
| Skip (X) | Top right | Next product |
| Search | Floating (bottom right) | Fallback to search |
| Post | Floating (bottom right) | Create listing |

---

## 🧠 Algorithm (Future)

Feed is **category-filtered** now, but will become **algorithmic**:

### Signals to Consider

**User signals**:
- Categories you browse most
- Price range you view
- Items you save
- Sellers you message

**Item signals**:
- Distance from you (hyper-local)
- Posted recently (<24h)
- Good photos (3+ images)
- Reasonable price (not outliers)

**Social signals** (Phase 2):
- Friends who saved this
- Popular in your suburb
- Trending category

---

## 📊 Metrics to Track

### Feed Engagement

- **Session duration**: Target 8+ min (vs 2-3 min grid)
- **Products viewed per session**: Target 15+ (vs 5-8 grid)
- **Save rate**: Target 15% (vs 5% grid)
- **Message rate**: Target 8% (vs 3% grid)

### Conversion Funnel

```
100 visitors
  ↓ 80% browse feed (vs 60% grid)
  ↓ 25% save item (vs 10% grid)
  ↓ 30% message seller (vs 20% of savers)
  ↓ 50% arrange meetup
  = 3 transactions per 100 visitors (vs 0.6 grid)
```

---

## 🚀 Implementation Status

### ✅ Completed

- [x] Feed view with full-screen cards
- [x] Category tabs (swipeable)
- [x] Product card component
- [x] Image gallery (swipe left/right)
- [x] Map view mockup
- [x] Floating action buttons
- [x] Snap scroll behavior
- [x] Touch gestures (basic)

### ⏳ Coming Soon

- [ ] Mapbox integration (needs API key)
- [ ] Save/favorite functionality (needs backend)
- [ ] Real-time messaging (needs Supabase Realtime)
- [ ] Algorithm (personalized feed)
- [ ] Infinite scroll (load more products)
- [ ] Analytics tracking (PostHog/Mixpanel)
- [ ] A/B test: Feed vs Grid conversion rates

---

## 🎨 Visual Design

### Color Psychology

- **Primary (Blue)**: Trust, reliability
- **White overlays**: Clean, modern
- **Gradient backgrounds**: Premium feel
- **Black backdrop**: Photo-first (Instagram-style)

### Typography

- **Product titles**: 2xl, bold (hero)
- **Price**: 4xl, bold (focal point)
- **Metadata**: sm, light (supporting)

### Motion

- **Snap scroll**: Smooth, deliberate
- **Tab transitions**: Fast (150ms)
- **Button hovers**: Instant feedback
- **Image swipes**: Native iOS/Android feel

---

## 📱 Mobile-First Principles

1. **Touch targets**: Minimum 44x44px
2. **Thumb zones**: Key actions in bottom 1/3
3. **No hamburger menus**: Tabs > hidden nav
4. **One-handed use**: Most actions reachable
5. **Safe areas**: Respect notch/home indicator

---

## 🔄 View Switching

Users can switch views anytime:

- **Feed → Grid**: Top-left grid icon
- **Feed → Map**: Top-right map icon
- **Grid → Feed**: Top-right feed icon

**Tip**: Set user preference (localStorage), default to Feed for new users.

---

## 🎯 Best Practices

### For Sellers

**To rank in feed**:
- Upload 3+ high-quality photos
- First photo = hero (fill frame, no text overlay)
- Price competitively (check "Similar items")
- Post in peak hours (6-9pm weekdays)

### For Buyers

**To find best deals**:
- Browse feed daily (new items ranked higher)
- Save items to compare later
- Check map view for urgent pickups
- Use search for specific models

---

## 🧪 A/B Testing Ideas

1. **Feed vs Grid conversion**: Which converts better?
2. **Autoplay videos**: Do 10s videos increase engagement?
3. **"Similar items" carousel**: Does it extend sessions?
4. **Push notifications**: "New item in Phones near you"
5. **Swipe gestures**: Left = skip, right = save (Tinder-style)

---

## 📚 Resources

- **Design inspiration**: Instagram Reels, TikTok, Tinder, Airbnb
- **UX patterns**: https://mobbin.com
- **Color palette**: https://coolors.co
- **Icons**: Lucide React (already installed)

---

**Questions?** See [ROADMAP.md](./ROADMAP.md) for development plan.
