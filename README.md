# URL Shuttle

<div align="center">
  <h1>URL Shuttle</h1>
  <p>
    <strong>Free, Private & Browser-Based URL Toolkit</strong>
  </p>
  <p>
    Parse, build, encode, validate, and edit URLs — entirely in your browser, no uploads.
  </p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

</div>

## About

**URL Shuttle** is a privacy-first toolkit for working with URLs. Every operation runs on the WHATWG `URL` API and native encoding functions directly in your browser — query strings, tokens, and internal links never leave your device.

## Tools

- **URL Parser** — break any URL into protocol, host, path, query parameters, and fragment
- **URL Builder** — assemble URLs from parts with automatic encoding
- **Query String Editor** — add, edit, delete, and bulk encode/decode query parameters
- **URL Encoder/Decoder** — `encodeURIComponent` / `encodeURI` and their inverses
- **URL Validator** — batch-validate URL lists, one per line
- **URL Slug Generator** — convert titles into clean SEO-friendly slugs

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, static export) + [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) primitives
- **i18n**: [next-intl](https://next-intl.dev/) with URL-based routing (English + Chinese)
- **Theming**: System / Light / Dark three-state theme
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) static assets (`output: "export"`)

## Getting Started

```bash
git clone https://github.com/ShuttleLab/url-shuttle.git
cd url-shuttle
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Static-export build into `out/` (incl. locale post-processing) |
| `npm run lint` | Run ESLint |

## Deployment

URL Shuttle deploys as static assets on Cloudflare Workers. The build emits to `out/`, which `wrangler.toml` points at; `scripts/postbuild.mjs` promotes the default-locale pages to the web root and fixes the `lang` attribute on Chinese pages.

## License

This project is licensed under the MIT License.

---

<div align="center">
  Built by <a href="https://github.com/ShuttleLab">ShuttleLab</a>
</div>
