# Contributing to TradeMate

Thanks for your interest in contributing! This is a pet project MVP, but contributions are welcome.

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/yourusername/trademate-mvp/issues)
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment (OS, browser, Node version)

### Suggesting Features

1. Check [ROADMAP.md](./ROADMAP.md) to see if it's already planned
2. Create a new issue with:
   - Use case: Why is this feature needed?
   - Proposed solution: How would it work?
   - Alternatives considered

### Pull Requests

1. Fork the repo
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes:
   - Follow existing code style (use ESLint)
   - Add comments for complex logic
   - Keep components small and focused
   - Use TypeScript (no `any` types)

4. Test locally:
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

5. Commit with clear message:
   ```bash
   git commit -m "Add feature: user can delete their own listings"
   ```

6. Push and create PR:
   ```bash
   git push origin feature/your-feature-name
   ```

7. In PR description, include:
   - What changed
   - Why it's needed
   - Screenshots/GIFs if UI change
   - Related issue number

## Development Guidelines

### Code Style

- **React components**: Functional components with hooks
- **TypeScript**: Strict mode, no `any`
- **CSS**: Tailwind utility classes, avoid custom CSS
- **Naming**: PascalCase for components, camelCase for variables

### File Structure

```
src/
├── app/                 # Next.js pages
│   ├── (auth)/         # Auth-related pages
│   ├── listings/       # Listing pages
│   └── api/            # API routes
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   └── features/      # Feature-specific components
├── lib/               # Utilities
└── types/             # TypeScript types
```

### Component Template

```tsx
'use client' // Only if using hooks/client features

import { useState } from 'react'
import { ComponentProps } from '@/types'

interface Props {
  title: string
  onSubmit: (data: any) => void
}

export default function MyComponent({ title, onSubmit }: Props) {
  const [value, setValue] = useState('')

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {/* Component content */}
    </div>
  )
}
```

### API Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  // Validation schema
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)

    // Business logic

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 })
  }
}
```

## Testing

Currently no automated tests. To test:

1. **Manual testing**: Click through features
2. **Different devices**: Test on mobile + desktop
3. **Different browsers**: Chrome, Safari, Firefox
4. **Edge cases**: Empty states, long text, missing data

## Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add geospatial search with 10km radius
fix: image upload not working on Safari
docs: update SETUP.md with Mapbox instructions
refactor: extract listing card to separate component
```

## Questions?

- Open a GitHub issue
- Email: [your-email]

Thank you for contributing! 🙏
