import fs from "node:fs";
import path from "node:path";

// Static export (output: "export") with next-intl localePrefix "as-needed"
// emits the default locale under out/en/, yet every canonical / hreflang /
// sitemap URL declares the English pages at the web root. This script makes
// the build output match what the metadata promises:
//   1. Promote out/en/* to out/ (so "/" serves English) and drop out/en.
//   2. Patch <html lang> in out/zh/**/*.html from "en" to "zh-CN" — the
//      root layout hardcodes lang="en", which static export bakes into
//      the Chinese pages too.

const out = path.join(process.cwd(), "out");
const en = path.join(out, "en");
const zh = path.join(out, "zh");

if (fs.existsSync(en)) {
  fs.cpSync(en, out, { recursive: true, force: false, errorOnExist: false });
  fs.rmSync(en, { recursive: true });
  console.log("[postbuild] promoted out/en/* -> out/ and removed out/en");
} else {
  console.log("[postbuild] out/en not found - nothing to promote");
}

function patchLang(dir) {
  let patched = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      patched += patchLang(p);
    } else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(p, "utf8");
      const next = html.replace('<html lang="en"', '<html lang="zh-CN"');
      if (next !== html) {
        fs.writeFileSync(p, next);
        patched += 1;
      }
    }
  }
  return patched;
}

if (fs.existsSync(zh)) {
  const n = patchLang(zh);
  console.log(`[postbuild] patched <html lang> to zh-CN in ${n} file(s) under out/zh`);
}
