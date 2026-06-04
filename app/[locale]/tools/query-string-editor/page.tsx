import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { QueryEditor } from "@/components/query-editor";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/query-string-editor/`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Query String Editor Online — Free URL Parameter Editor",
    description:
      "Visually add, remove, edit, sort, encode, and decode the query parameters in a URL. Free, browser-based query string editor using the native URLSearchParams API. 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function QueryStringEditorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Edit the Query String of a URL Online",
    description:
      "A guide to visually editing the query parameters of a URL — adding, removing, sorting, encoding, and decoding key-value pairs — with a free browser-based editor built on URLSearchParams.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Edit a Query String Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Paste a URL", text: "Paste a URL into the input field. The editor parses it and lists its existing query parameters in an editable table automatically." },
      { "@type": "HowToStep", position: 2, name: "Edit the parameters", text: "Change any key or value inline, click Add Parameter to insert a new row, or use the X button to remove a parameter." },
      { "@type": "HowToStep", position: 3, name: "Sort, encode, or decode", text: "Use Sort A-Z to order parameters by key, or Encode All and Decode All to batch percent-encode or decode every value." },
      { "@type": "HowToStep", position: 4, name: "Copy the output URL", text: "The rebuilt URL updates live as you edit. Copy it with one click when it looks right." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What are query parameters?", acceptedAnswer: { "@type": "Answer", text: "Query parameters are the key-value pairs after the ? in a URL. In https://example.com?name=hello&age=25, name and age are keys with the values hello and 25. The editor reads them through URLSearchParams and lets you change them visually." } },
      { "@type": "Question", name: "Can I add and remove parameters?", acceptedAnswer: { "@type": "Answer", text: "Yes. Click Add Parameter to insert a new empty key-value row, edit the key and value inline, and press the X button to delete a row. The output URL rebuilds automatically after every change." } },
      { "@type": "Question", name: "How do the Encode All and Decode All buttons work?", acceptedAnswer: { "@type": "Answer", text: "Encode All runs encodeURIComponent on every parameter value, and Decode All runs decodeURIComponent on every value. They let you batch-handle percent-encoding instead of editing each value by hand." } },
      { "@type": "Question", name: "Can I sort the parameters?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Sort A-Z button orders all parameters alphabetically by their key using a locale-aware comparison, which is handy for producing a canonical, consistent query string." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. The editor runs entirely in your browser using the native URL and URLSearchParams APIs. The URLs you paste are never sent to or stored on any server." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Query String Editor", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Query String Editor</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Visually add, remove, edit, sort, encode, and decode the query parameters of any URL. Everything runs in your browser with the native URL and URLSearchParams APIs, so your links stay completely private.
        </p>

        <div className="mb-12">
          <QueryEditor />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Edit a Query String</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Paste a URL</h3>
                <p className="text-muted-foreground">Paste a URL into the input field. The editor parses it, separates the base from the query string, and lists every existing parameter as an editable key-value row. If the URL cannot be parsed, it falls back to using the part before the question mark as the base.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Edit the parameters</h3>
                <p className="text-muted-foreground">Change any key or value directly in its field, click Add Parameter to insert a new empty row, or press the X button to remove a parameter you no longer want. The rebuilt URL updates live after every change, so there is nothing to submit.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Sort, encode, or decode</h3>
                <p className="text-muted-foreground">Use Sort A-Z to order parameters alphabetically by key, Clear All to empty the list, Encode All Values to percent-encode every value, and Decode All Values to reverse it. These batch actions save you from editing one value at a time.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <div>
                <h3 className="font-semibold">Copy the output URL</h3>
                <p className="text-muted-foreground">The output URL reflects your edits in real time, rebuilt through the URL object so the query string is always well-formed. When it looks right, click Copy URL to send the finished link to your clipboard.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a Query String Editor?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Edit Without Breaking the URL</h3>
              <p className="text-sm text-muted-foreground">Hand-editing a query string in the address bar is risky — one misplaced ampersand or unescaped space breaks the link. The editor rebuilds the URL through URLSearchParams after every change, so the structure and encoding stay correct no matter what you do to the parameters.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Batch Encode, Decode, and Sort</h3>
              <p className="text-sm text-muted-foreground">When a URL carries a dozen parameters, doing anything by hand is tedious. One click encodes or decodes every value, and another sorts them alphabetically, which makes it fast to clean up a messy query string or produce a canonical, comparable form.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">All parsing and rebuilding happens on the client. You can edit URLs containing session tokens, signed parameters, or internal hostnames without any of it being logged or sent to a server.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">There is nothing to install and no account to create. The editor loads in any modern browser on desktop or mobile, ready whenever you need to tweak a link on the spot.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Tweaking Campaign Parameters</h3>
              <p className="text-muted-foreground">When you need to adjust the utm_source or utm_campaign on an existing link, pasting it into the editor lets you change just those values in their own fields and copy the rebuilt URL. There is no risk of accidentally deleting an ampersand or corrupting another parameter while you edit.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Cleaning Up a Bloated Tracking URL</h3>
              <p className="text-muted-foreground">Shared links often arrive with a long tail of tracking parameters you do not want to pass on. Load the URL, remove the rows you do not need with the X button, optionally sort the rest, and copy a clean, minimal link ready to share.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Fixing Encoding Problems</h3>
              <p className="text-muted-foreground">If a value has been double-encoded or left raw, Decode All Values lets you bring every parameter back to readable text, fix what is wrong, and then Encode All Values to re-escape consistently — far quicker than working through each value individually.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Edit Decoded, Copy Encoded</h3>
              <p className="text-muted-foreground">Work with readable values in the fields and let the editor handle encoding when it rebuilds the URL. If you paste an already-encoded value into a field, you can end up double-encoding it, so decode first if you are unsure.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Sort for a Canonical Form</h3>
              <p className="text-muted-foreground">Sorting parameters alphabetically gives two URLs with the same parameters an identical string, which is useful when you are comparing links, generating cache keys, or deduplicating a list.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Mind Duplicate Keys</h3>
              <p className="text-muted-foreground">A URL can legitimately repeat a key, such as tag=a&amp;tag=b. The editor preserves each occurrence as its own row, so review the list before removing what looks like a duplicate — it may be intentional.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Pair It With the Parser</h3>
              <p className="text-muted-foreground">Use the URL Parser first to understand a link, then switch to this editor to change it. The parser inspects, the editor modifies — together they cover the full read-and-write cycle for query strings.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              The most common way to edit a query string is straight in the browser address bar, but that treats the URL as one long string where a single mistyped ampersand or unescaped space silently breaks the link. This editor splits the query into labelled key-value rows and rebuilds the URL through URLSearchParams, so the structure and encoding stay correct however you edit.
            </p>
            <p className="text-muted-foreground mb-4">
              Developers sometimes reach for the console and manipulate searchParams by hand. That is accurate and private, but it means opening devtools and writing append, delete, and sort calls for each change. The editor gives you the same URLSearchParams-backed result through a table and a handful of buttons, which is far faster for interactive editing.
            </p>
            <p className="text-muted-foreground mb-4">
              Many online query-string tools send the URL you paste to a server to parse and rebuild it, which is a problem when a parameter holds a token or a signed value. Because this editor runs entirely in your browser with the APIs your browser already ships, sensitive URLs never leave the page while you still get standards-compliant output and zero setup on any device.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What are query parameters?</h3>
              <p className="text-muted-foreground">They are the key-value pairs after the ? in a URL. In https://example.com?name=hello&amp;age=25, name and age are keys with values hello and 25. The editor reads them with URLSearchParams and lets you change them visually.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I add and remove parameters?</h3>
              <p className="text-muted-foreground">Yes. Add Parameter inserts a new empty key-value row, you edit the key and value inline, and the X button deletes a row. The output URL rebuilds automatically after each change.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do Encode All and Decode All work?</h3>
              <p className="text-muted-foreground">Encode All Values runs encodeURIComponent on every value, and Decode All Values runs decodeURIComponent on every value, so you can batch-handle percent-encoding instead of editing each one by hand.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I sort the parameters?</h3>
              <p className="text-muted-foreground">Yes. Sort A-Z orders all parameters alphabetically by key, which is handy for producing a canonical, consistent query string you can compare or deduplicate.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. The editor runs entirely in your browser and never transmits the URLs you paste, so you can edit links containing tokens or internal hostnames with no privacy concern.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens to duplicate keys?</h3>
              <p className="text-muted-foreground">Each occurrence of a repeated key is kept as its own row, so a URL like tag=a&amp;tag=b is preserved exactly. Review the rows before deleting anything that looks like a duplicate, as it may be intentional.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Need to edit more links? Explore the full URL Shuttle toolkit.</p>
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
