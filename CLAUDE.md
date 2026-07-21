# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Corrections / additions to AGENTS.md

AGENTS.md is the primary guide. A few entries there are stale or incomplete — prefer the facts below where they conflict.

- **License**: AGPL-3.0-only (not MIT). See `LICENSE`, `package.json`, `README.md`. Commercial non-copyleft licensing: support@shuttlelab.org.
- **UI primitives**: `@base-ui/react` (not Radix) under `components/ui/`, plus `next-themes` for theming. shadcn CLI (`components.json`) still scaffolds them.
- **No tests**: there is no test runner. "Verification" = `npm run build` + `npx tsc --noEmit` + `npm run lint`. `npm run lint` is bare `eslint` (config in `eslint.config.mjs`).

## Build pipeline — the critical non-obvious part

`npm run build` = `next build && node scripts/postbuild.mjs`. **The postbuild step is mandatory** — a plain `next build` produces a broken deploy. Static export (`output: "export"`) with next-intl `localePrefix: "as-needed"` emits the default locale under `out/en/`, but all canonical/hreflang/sitemap URLs declare English at the web root. `scripts/postbuild.mjs` reconciles this:

1. Promotes `out/en/*` → `out/` and removes `out/en` (so `/` serves English).
2. Patches `<html lang="en">` → `"zh-CN"` in every `out/zh/**/*.html`.
3. Generates `out/sw.js` (service worker) with a precache list derived from the actual emitted HTML routes + PWA assets, versioned per build.

If you change routes, locales, or canonical-URL conventions, re-check this script — it hardcodes assumptions about the `out/en` ↔ `out/` mapping. The matching client-side registration lives in `components/service-worker-register.tsx`.

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. Deployment is Cloudflare Pages static assets (`wrangler.toml` → `[assets] directory = "./out"`); there is no worker.

## Conventions

- Every tool is a client component in `components/` (e.g. `url-parser.tsx`) rendered by both the homepage and its Layer-4 SEO landing page under `app/[locale]/tools/`. All URL processing uses browser WHATWG `URL`/`URLSearchParams` — never add server/API processing.
- All UI strings live in `messages/en.json` + `messages/zh.json`; both must stay in sync. Use `@/i18n/navigation` (`Link`, `useRouter`) for locale-aware navigation, not `next/link` directly.
