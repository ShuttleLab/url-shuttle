import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { UrlSlug } from "@/components/url-slug";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/url-slug-generator/`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlSlugGenerator" });
    return {
      title: t("title"),
      description: t("subtitle"),
      alternates: {
        canonical: CANONICAL,
        languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
      },
    };
  }
  return {
    title: "URL Slug Generator Online — Free SEO-Friendly Slug Maker",
    description:
      "Turn any title into a clean, SEO-friendly URL slug. Choose a separator, case, optional stop-word removal, and a max length. Free, browser-based, instant, and 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function UrlSlugGeneratorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlSlugGenerator" });
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>
        <div className="mb-12">
          <UrlSlug />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          <Link href="/tools/url-slug-generator/" className="underline hover:text-foreground">
            查看完整英文指南 →
          </Link>
        </p>
      </div>
    );
  }

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Generate an SEO-Friendly URL Slug Online",
    description:
      "A guide to turning a title into a clean URL slug — choosing a separator, case, stop-word removal, special-character handling, and a maximum length — with a free browser-based generator.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate a URL Slug Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Enter your title", text: "Type or paste a title or any text into the input field. The slug regenerates automatically as you type." },
      { "@type": "HowToStep", position: 2, name: "Choose a separator and case", text: "Pick a hyphen, underscore, or dot as the separator, and choose lowercase or uppercase for the output." },
      { "@type": "HowToStep", position: 3, name: "Set the options", text: "Optionally remove a list of common English stop words, strip special characters, and cap the slug at a maximum length." },
      { "@type": "HowToStep", position: 4, name: "Copy the slug", text: "Copy the finished slug with one click and check the preview URL that shows how it looks inside a real path." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is a URL slug?", acceptedAnswer: { "@type": "Answer", text: "A URL slug is the human-readable part of a URL that identifies a page, usually derived from its title. For example, in /blog/how-to-build-a-url the slug is how-to-build-a-url. A clean slug is easier to read and share and is generally better for SEO." } },
      { "@type": "Question", name: "What separators can I choose?", acceptedAnswer: { "@type": "Answer", text: "The generator lets you join words with a hyphen, an underscore, or a dot. A hyphen is the most common choice for web URLs because search engines treat it as a word separator." } },
      { "@type": "Question", name: "What does removing stop words do?", acceptedAnswer: { "@type": "Answer", text: "When enabled, the generator drops a built-in list of 19 common English stop words such as a, an, the, and, or, of, and with. This shortens the slug and focuses it on the meaningful keywords, though it only affects English words." } },
      { "@type": "Question", name: "Does it support non-English characters?", acceptedAnswer: { "@type": "Answer", text: "Yes. The special-character filter is built to keep word characters and Chinese characters, so titles containing Chinese text are preserved rather than stripped. Other scripts may be removed when the strip-special-characters option is on." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. The slug is generated entirely in your browser. Nothing you type is sent to or stored on any server." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "URL Slug Generator", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">URL Slug Generator</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Turn any title into a clean, SEO-friendly URL slug. Choose your separator and case, optionally remove common English stop words, strip special characters, and cap the length. Everything runs in your browser, so your text stays completely private.
        </p>

        <div className="mb-12">
          <UrlSlug />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Generate a URL Slug</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Enter your title</h3>
                <p className="text-muted-foreground">Type or paste a title — a blog headline, a product name, a page heading — into the input box. The slug regenerates live as you type, so you see the result take shape immediately without pressing a button.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Choose a separator and case</h3>
                <p className="text-muted-foreground">Pick how words are joined: a hyphen, an underscore, or a dot. Then choose lowercase or uppercase. A hyphen with lowercase is the conventional choice for web URLs because search engines read hyphens as spaces between words.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Set the options</h3>
                <p className="text-muted-foreground">Toggle Remove Stop Words to drop a built-in list of 19 common English words such as the, and, and of. Toggle Remove Special Characters to strip punctuation while keeping word and Chinese characters. Set a maximum length to cap how long the slug can grow.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <div>
                <h3 className="font-semibold">Copy the slug</h3>
                <p className="text-muted-foreground">The finished slug appears with a copy button, and a preview URL shows how it looks inside a real path such as /blog/your-slug. Copy it in one click and paste it straight into your CMS or routing config.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a Slug Generator?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Consistent, Readable URLs</h3>
              <p className="text-sm text-muted-foreground">Doing this by hand leads to inconsistent slugs — mixed case, stray punctuation, the odd double hyphen. The generator applies the same rules every time: it splits on spaces and existing separators, joins with your chosen character, and collapses consecutive separators so the result is always tidy.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">SEO-Focused Output</h3>
              <p className="text-sm text-muted-foreground">Short, keyword-rich slugs are easier to read in search results and when shared. Optional stop-word removal trims filler words like the and of, and the max-length cap keeps slugs from sprawling, both of which help produce links people and search engines prefer.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">Slug generation runs entirely on the client. You can paste unpublished headlines or internal page titles without any of it being logged or transmitted to a server.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">There is nothing to install and no account to create. The generator loads in any modern browser on desktop or mobile, ready whenever you are drafting a new page or post.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Publishing a New Blog Post</h3>
              <p className="text-muted-foreground">When you write a headline like &quot;The Ultimate Guide to Building Clean URLs&quot;, you want a tidy slug rather than the raw title in the address bar. Paste the headline, switch on stop-word removal, and you get something like ultimate-guide-building-clean-urls — short, lowercase, and focused on the keywords that matter.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Normalizing Imported Content</h3>
              <p className="text-muted-foreground">Migrating articles from one CMS to another often leaves you with inconsistent or missing slugs. Run each title through the generator with a fixed separator, case, and max length to produce uniform slugs across the whole site, which keeps your URL structure predictable after the move.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Creating Slugs for Non-English Titles</h3>
              <p className="text-muted-foreground">Because the special-character filter is built to keep Chinese characters, you can generate a clean slug from a Chinese title without it being stripped away. That makes the tool useful for bilingual sites where some pages have English titles and others do not.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Prefer Hyphens and Lowercase</h3>
              <p className="text-muted-foreground">For web URLs, a hyphen separator with lowercase output is the safest default. Search engines treat hyphens as word boundaries, and lowercase avoids the case-sensitivity surprises that can occur on some servers.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Use Stop-Word Removal Judiciously</h3>
              <p className="text-muted-foreground">Removing stop words shortens a slug and sharpens its keywords, but it only covers a fixed list of 19 English words. Glance at the result to make sure the slug still reads sensibly and has not dropped a word the page actually needs.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Set a Sensible Max Length</h3>
              <p className="text-muted-foreground">A long slug is harder to read and share. The default cap of 60 characters is a good starting point; the generator trims to the limit and removes any trailing separator so the slug never ends on a stray hyphen.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Lock the Slug Before Publishing</h3>
              <p className="text-muted-foreground">Once a page is live and indexed, changing its slug means setting up redirects. Generate and finalize the slug before you publish so you do not have to manage redirects for a URL that was never shared.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Most content management systems generate a slug for you when you save a post, which is convenient but rigid: you usually cannot choose the separator, control stop-word removal, or preview different options before committing. This generator lets you experiment with the separator, case, stop words, and length live, then paste the exact slug you want into the CMS.
            </p>
            <p className="text-muted-foreground mb-4">
              Plenty of online slug makers exist, but many of them send your title to a server to process it, which is not ideal for unpublished headlines or internal page names. URL Shuttle does the whole transformation in your browser, so a draft title never leaves the page while you still get the same clean, configurable output.
            </p>
            <p className="text-muted-foreground mb-4">
              You could also write a quick slugify function yourself, and many developers do. That works, but reimplementing separator collapsing, stop-word filtering, special-character handling, and length trimming each time is busywork — and easy to get subtly wrong. This tool bundles all of those rules behind a few toggles, with a preview URL so you can see the result in context before you ship it.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is a URL slug?</h3>
              <p className="text-muted-foreground">A slug is the readable part of a URL that identifies a page, usually derived from its title — for example how-to-build-a-url in /blog/how-to-build-a-url. A clean slug is easier to read and share and tends to be better for SEO.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What separators can I choose?</h3>
              <p className="text-muted-foreground">You can join words with a hyphen, an underscore, or a dot. A hyphen is the most common choice for web URLs because search engines treat it as a word separator.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What does removing stop words do?</h3>
              <p className="text-muted-foreground">When enabled, the generator drops a built-in list of 19 common English stop words such as a, an, the, and, or, of, and with. That shortens the slug and focuses it on the meaningful keywords, but it only affects those English words.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Does it support non-English characters?</h3>
              <p className="text-muted-foreground">Yes. The special-character filter keeps word characters and Chinese characters, so a Chinese title is preserved rather than stripped. Some other scripts may be removed when the strip-special-characters option is enabled.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. The slug is generated entirely in your browser and nothing you type is transmitted, so you can paste unpublished titles without any privacy concern.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the preview URL for?</h3>
              <p className="text-muted-foreground">The preview shows your slug inside a sample path such as /blog/your-slug, so you can judge how it will look in a real address before you copy it into your site.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Need more clean slugs? Explore the full URL Shuttle toolkit.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to URL Shuttle
          </Link>
        </section>
      </div>
    </>
  );
}
