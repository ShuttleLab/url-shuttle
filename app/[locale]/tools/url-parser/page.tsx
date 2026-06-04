import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { UrlParser } from "@/components/url-parser";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/url-parser/`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlParser" });
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
    title: "URL Parser Online — Free WHATWG URL Component Analyzer",
    description:
      "Parse any URL into its protocol, hostname, port, path, query parameters, and hash. Free, browser-based URL parser using the native WHATWG URL API. No upload, 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function UrlParserPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlParser" });
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>
        <div className="mb-12">
          <UrlParser />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          <Link href="/tools/url-parser/" className="underline hover:text-foreground">
            查看完整英文指南 →
          </Link>
        </p>
      </div>
    );
  }

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Parse a URL into Its Components Online",
    description:
      "A guide to breaking a URL down into protocol, hostname, port, pathname, query parameters, and hash using a free browser-based parser built on the WHATWG URL API.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Parse a URL Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Paste your URL", text: "Paste or type a full URL into the input field. The parser reads it the moment you type." },
      { "@type": "HowToStep", position: 2, name: "Review the components", text: "The tool splits the URL into protocol, hostname, port, pathname, search, and hash, plus a table of every query parameter." },
      { "@type": "HowToStep", position: 3, name: "Copy what you need", text: "Click the copy icon next to any component or parameter to send it to your clipboard, or open the URL in a new tab." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is URL parsing?", acceptedAnswer: { "@type": "Answer", text: "URL parsing is the process of breaking a URL string into its individual components: protocol, hostname, port, pathname, query parameters, and hash fragment. This parser uses the browser's native WHATWG URL API to do that accurately." } },
      { "@type": "Question", name: "Which protocols can the parser handle?", acceptedAnswer: { "@type": "Answer", text: "Because it uses the WHATWG URL API, it parses any URL the browser recognizes, including http, https, ftp, file, and mailto. Relative URLs without a scheme cannot be parsed on their own and will show an invalid-URL message." } },
      { "@type": "Question", name: "Does the parser decode query parameters?", acceptedAnswer: { "@type": "Answer", text: "Yes. Query parameters are read through URLSearchParams, which automatically percent-decodes each value, so you see the human-readable value rather than the encoded form." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. All parsing happens locally in your browser using the built-in URL API. The URLs you paste are never sent to or stored on any server." } },
      { "@type": "Question", name: "Can it show the username and password in a URL?", acceptedAnswer: { "@type": "Answer", text: "Yes. If a URL contains embedded credentials, the parser displays the username and a masked password that you can reveal with the eye toggle. This is useful for spotting credentials that should not be in a link." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "URL Parser", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">URL Parser</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Break any URL into its protocol, hostname, port, path, query parameters, and hash. Everything runs in your browser with the native WHATWG URL API, so your links stay completely private.
        </p>

        <div className="mb-12">
          <UrlParser />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Parse a URL</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Paste your URL</h3>
                <p className="text-muted-foreground">Paste or type a complete URL into the input box. The parser reacts as you type, so there is no button to press. Make sure the URL includes a scheme such as https:// — without one, the WHATWG URL API treats the string as invalid and the parser shows an error instead of guessing.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Review every component</h3>
                <p className="text-muted-foreground">The tool lays out the protocol, username, password, hostname, port, pathname, search string, and hash in a clean list. Below that, a key-value table shows each query parameter individually, with values already percent-decoded for readability.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Copy or open the result</h3>
                <p className="text-muted-foreground">Click the copy icon beside any field to put it on your clipboard, copy the full URL in one click, or open the URL in a new tab to test it. Nothing leaves your machine during any of these steps.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a URL Parser?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Accurate Standards-Based Parsing</h3>
              <p className="text-sm text-muted-foreground">The parser relies on the browser&apos;s built-in URL constructor, which implements the WHATWG URL Standard. That means it handles the same edge cases your application code does, so what you see here matches how the URL behaves in production.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Instant Query Parameter Breakdown</h3>
              <p className="text-sm text-muted-foreground">Long query strings packed with tracking and configuration values become a readable table. Each parameter sits on its own row with its decoded value, making it easy to spot duplicates, typos, or unexpected entries.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">Because parsing runs entirely on the client, you can safely inspect URLs that contain session tokens, signed parameters, or internal hostnames without worrying that they will be logged or transmitted anywhere.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">There is nothing to install and no account to create. The parser loads in any modern browser on desktop or mobile, which makes it a handy companion when you are debugging away from your usual development machine.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Decoding URLs From Crawler and Server Logs</h3>
              <p className="text-muted-foreground">Access logs and crawler exports are full of long, percent-encoded URLs that are hard to read at a glance. Paste one into the parser and the query table shows each parameter with its decoded value, so you can immediately tell which campaign, search term, or referrer triggered a request. This turns a wall of %20 and %3D characters into a clear picture of what a visitor actually requested.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Debugging Third-Party API Callback URLs</h3>
              <p className="text-muted-foreground">OAuth redirects, payment callbacks, and webhook URLs often carry a dozen parameters that must be exactly right. Dropping the callback URL into the parser lets you confirm the redirect_uri, state, and signature parameters are present and correctly encoded before you spend time chasing a bug in your own code.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Auditing Links for Leaked Credentials</h3>
              <p className="text-muted-foreground">Some legacy systems still embed a username and password directly in a URL. The parser surfaces those credentials in a dedicated, maskable field, so during a security review you can quickly scan a batch of links and flag any that expose secrets that ought to live in a header or vault instead.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Always Include the Scheme</h3>
              <p className="text-muted-foreground">The WHATWG URL API needs an absolute URL with a scheme such as https://. If you only have a path like /products?id=5, prepend a dummy origin such as https://example.com before pasting so the parser can read the query string.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Watch the Decoded Values</h3>
              <p className="text-muted-foreground">The query table shows decoded values, which is great for readability. If a value still contains percent escapes after decoding, that usually means it was double-encoded — a common bug worth fixing at the source.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Compare Hostname Versus Host</h3>
              <p className="text-muted-foreground">The parser shows hostname and port separately. When a URL uses a non-default port, check both fields together so you do not accidentally point a request at the wrong endpoint during testing.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Use It Alongside the Query Editor</h3>
              <p className="text-muted-foreground">Once you understand a URL with the parser, switch to the Query String Editor to actually add, remove, or re-order parameters. The two tools cover inspection and editing respectively.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Many people reach for an online tool like urlparser.com or a generic &quot;URL components&quot; site when they need to dissect a link. Those services work, but they typically send the URL you paste to their server for processing, which is a problem when the link contains a session token or a signed parameter. URL Shuttle parses everything locally with the same WHATWG URL API your browser already ships, so sensitive URLs never leave the page.
            </p>
            <p className="text-muted-foreground mb-4">
              Browser developer tools are another option — you can open the console and run new URL(...) yourself. That is accurate and private, but it requires opening devtools, knowing the API, and reading the result as a raw object. This parser gives you the same standards-compliant result in a labelled, copyable layout with a dedicated query-parameter table, which is faster when you just want to glance at a link.
            </p>
            <p className="text-muted-foreground mb-4">
              Command-line approaches such as piping a URL through a script also keep data local, but they are overkill for a one-off inspection and awkward on a machine where you have not set up your tooling. A browser-based parser hits the sweet spot: standards-based accuracy, complete privacy, and zero setup, available on any device with a browser.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is URL parsing?</h3>
              <p className="text-muted-foreground">URL parsing breaks a URL string into its individual parts: the protocol, optional username and password, hostname, port, pathname, query string, and hash fragment. This tool uses the browser&apos;s native URL constructor, which follows the WHATWG URL Standard, so the breakdown matches how browsers and servers actually interpret the link.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Which protocols are supported?</h3>
              <p className="text-muted-foreground">Any protocol the WHATWG URL API recognizes will parse, including http, https, ftp, file, and mailto. A bare relative path with no scheme cannot be parsed on its own; prepend an origin such as https://example.com if you only have the path and query portion.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Are query parameter values decoded?</h3>
              <p className="text-muted-foreground">Yes. Parameters are read with URLSearchParams, which percent-decodes values automatically. So %20 appears as a space and %40 as @, giving you the readable value rather than the raw encoded text.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Absolutely. The parser runs entirely in your browser and never transmits the URLs you paste. You can inspect links containing tokens or internal hostnames without any privacy concern.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why does my URL show as invalid?</h3>
              <p className="text-muted-foreground">The most common cause is a missing scheme. URLs like example.com/page are rejected because the standard requires an absolute URL. Add https:// to the front and it will parse correctly.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can it reveal credentials embedded in a URL?</h3>
              <p className="text-muted-foreground">Yes. If a URL includes a username and password, the parser shows the username and a masked password with a toggle to reveal it. This is handy for spotting credentials that should not be present in a shared link.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Ready to inspect more URLs? Explore the full URL Shuttle toolkit.</p>
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
