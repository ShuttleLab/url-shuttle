# SEO Overview: URL Shuttle

> Strategy: ShuttleLab Handbook
> Project type: Free tool

## Project type
- [x] Free tool

## Audience target
- [x] Overseas (English-primary)
- [ ] Domestic Chinese (Chinese-primary)
- [ ] Global (both)

## i18n strategy
- Implementation: URL-based + `localePrefix: "as-needed"` (next-intl)
- Layer 4 language: English only

## Path A pages (internal navigation)
- Layer 1: `/` (Homepage with URL parser)
- Layer 3: `/about`, `/privacy`, `/terms`

## Path B pages (SEO landing)
- Layer 4: `/tools/url-parser`, `/tools/query-string-editor`, `/tools/url-slug-generator`, `/tools/url-validator`, `/tools/url-encoder-decoder`, `/tools/url-builder`

## Schemas applied
- [x] SoftwareApplication (root layout)
- [x] FAQPage (About page + all 6 Layer 4 pages)
- [x] HowTo (About page + all 6 Layer 4 pages)
- [x] TechArticle (all 6 Layer 4 pages)
- [x] BreadcrumbList (all 6 Layer 4 pages)

## SEO Assets
- [x] sitemap.ts with hreflang alternates
- [x] robots.ts
- [x] opengraph-image.tsx (dynamic)
- [x] manifest.ts + PWA icons
- [x] Custom 404 page
- [x] Proper metadata on all pages
- [x] Canonical URLs
- [x] hreflang tags

## Content Strategy
- Layer 1: 500+ words, Hero + features + URL parser tool
- Layer 3: About (200+ words + FAQ + comparison), Privacy, Terms
- Layer 4: 800-1500 words per tool page, English only

### Path B measured word counts (2026-06-04)
All 6 Layer 4 pages now expanded to full-depth (4 schemas each: TechArticle, HowTo, FAQPage, BreadcrumbList).
Visible English word counts (excludes JSON-LD / JSX markup):

| Page | Visible words | Total file words |
|------|--------------|------------------|
| `/tools/url-parser` | ~1200 (prior agent) | 2072 |
| `/tools/url-builder` | ~1194 | 2162 |
| `/tools/url-encoder-decoder` | ~1151 | 2132 |
| `/tools/url-validator` | ~1173 | 2176 |
| `/tools/url-slug-generator` | ~1146 | 2112 |
| `/tools/query-string-editor` | ~1128 | 2088 |

## Key Features
1. URL Parser - Break down any URL into components
2. Query Editor - Visually edit query parameters
3. URL Builder - Construct URLs from components
4. Slug Generator - Create SEO-friendly slugs
5. URL Validator - Batch validate URLs
6. URL Encoder/Decoder - Encode/decode URL strings

## Privacy Focus
- All processing happens client-side
- No data uploaded to servers
- No analytics tracking (optional Cloudflare Web Analytics)
- No cookies (except localStorage for preferences)

## Deployment
- Static export (output: "export")
- Cloudflare Pages
- No server-side processing
- No API routes

## Known gaps
- [ ] Add real product screenshot (public/screenshot.png)
- [ ] Configure Google Search Console verification
- [ ] Submit sitemap to GSC and Bing Webmaster Tools
- [ ] Add cross-promotion links to sibling products

## Last reviewed: 2026-06-04
