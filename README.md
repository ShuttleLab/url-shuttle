# URL Shuttle

A small web app to parse, build, encode, validate, and edit URLs. Everything runs on the WHATWG URL API in the browser; no data is sent to any server.

## Features

- **Encoder / Decoder** – percent-encode or decode with explicit buttons, encodeURIComponent / encodeURI modes
- **Parser** – break any URL into protocol, host, port, path, query parameters, and fragment
- **Builder** – assemble URLs from parts with automatic encoding
- **Query editor** – add, edit, sort, and bulk encode/decode query parameters
- **Validator** – batch-check URL lists, one per line, with specific issues reported
- **Slug generator** – turn titles into clean SEO-friendly slugs (stop-word removal, separators, case)
- **Bilingual** – English and Chinese UI

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static export to `out/`.
