# URL Shuttle - Development Guide

> Free, privacy-first online URL toolkit. All processing happens in the browser.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **i18n**: next-intl (URL-based, localePrefix: "as-needed")
- **Fonts**: Geist + Geist Mono
- **Icons**: lucide-react
- **Toast**: sonner
- **Deployment**: Static export + Cloudflare Pages

### Project Structure

```
url-shuttle/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, JSON-LD, viewport, themeColor)
│   ├── globals.css
│   ├── sitemap.ts                  # SEO sitemap with hreflang alternates
│   ├── robots.ts                   # SEO robots
│   ├── opengraph-image.tsx         # OG image (dynamic, force-static)
│   ├── icon-192.png/route.tsx      # PWA icon
│   ├── icon-512.png/route.tsx      # PWA icon
│   ├── manifest.ts                 # PWA manifest
│   ├── not-found.tsx               # Custom 404
│   └── [locale]/
│       ├── layout.tsx              # Locale layout (next-intl provider, Header, Footer, hreflang)
│       ├── page.tsx                # Layer 1 marketing homepage
│       ├── about/page.tsx          # Layer 3 About
│       ├── privacy/page.tsx        # Layer 3 Privacy
│       ├── terms/page.tsx          # Layer 3 Terms
│       └── tools/                  # Layer 4 SEO landing pages
│           ├── url-parser/page.tsx
│           ├── query-string-editor/page.tsx
│           ├── url-slug-generator/page.tsx
│           ├── url-validator/page.tsx
│           ├── url-encoder-decoder/page.tsx
│           └── url-builder/page.tsx
├── components/
│   ├── header.tsx                  # Navigation bar
│   ├── footer.tsx                  # Footer
│   ├── theme-sync.tsx              # System/Light/Dark theme toggle
│   ├── layout-shell.tsx            # Layout wrapper
│   ├── url-parser.tsx              # URL parser component
│   ├── url-builder.tsx             # URL builder component
│   ├── query-editor.tsx            # Query string editor
│   ├── url-slug.tsx                # URL slug generator
│   ├── url-validator.tsx           # URL validator
│   ├── url-encoder-decoder.tsx     # URL encoder/decoder
│   └── ui/                         # shadcn components
├── i18n/
│   ├── routing.ts                  # next-intl routing config
│   ├── request.ts                  # Server-side request config
│   └── navigation.ts               # Link, useRouter, etc.
├── messages/
│   ├── en.json                     # English translations
│   └── zh.json                     # Chinese translations
├── next.config.ts                  # Next.js config (static export + next-intl)
├── wrangler.toml                   # Cloudflare Pages config
├── package.json
├── tsconfig.json
└── AGENTS.md                       # This file
```

### Key Decisions

1. **Static Export**: `output: "export"` in next.config.ts
2. **i18n**: URL-based with `localePrefix: "as-needed"` (default: `/`, Chinese: `/zh`)
3. **Deployment**: Cloudflare Pages (static assets only, no worker)
4. **Privacy**: All URL processing happens client-side using browser APIs
5. **No Backend**: No API routes, no server-side processing

### Development Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Building
npm run build        # Build for production (outputs to ./out)
npm start            # Start production server

# Linting
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Run TypeScript compiler check
```

### i18n

- Default locale: `en` (at `/`)
- Chinese locale: `zh` (at `/zh`)
- Translation files: `messages/en.json` and `messages/zh.json`
- All UI text must be translated

### SEO

- Layer 1: Homepage (500+ words, Hero + features)
- Layer 3: About, Privacy, Terms
- Layer 4: Tool landing pages (800-1500 words, English only)
- All pages have proper metadata (title, description, canonical, hreflang)
- JSON-LD schemas on About page (FAQPage, HowTo)

### Deployment

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
npx wrangler deploy
```

The build outputs to `./out` directory, which is configured in `wrangler.toml` for Cloudflare Pages static assets.

### Environment Variables

None required. All processing happens client-side.

### Browser APIs Used

- `URL` API for URL parsing
- `URLSearchParams` API for query parameter manipulation
- `encodeURIComponent` / `decodeURIComponent` for URL encoding
- `navigator.clipboard` for copy functionality
- `localStorage` for theme and language preferences

### Performance

- No server-side processing
- All tools work instantly in the browser
- No external API calls
- Static export for fast CDN delivery

### Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance

### Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### License

MIT © ShuttleLab
