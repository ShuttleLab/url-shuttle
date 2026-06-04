import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { UrlValidator } from "@/components/url-validator";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/url-validator/`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "URL Validator Online — Free Bulk URL Checker",
    description:
      "Validate many URLs at once. Check each link's format, protocol, port, length, and embedded credentials using the native WHATWG URL API. Free, browser-based, 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function UrlValidatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Validate a List of URLs Online",
    description:
      "A guide to checking a batch of URLs for valid format, supported protocol, port range, excessive length, and embedded credentials using a free browser-based validator built on the WHATWG URL API.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Validate URLs Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Paste one URL per line", text: "Enter your URLs in the text area, putting each link on its own line. Blank lines and surrounding whitespace are ignored." },
      { "@type": "HowToStep", position: 2, name: "Click Validate", text: "Press the Validate button. Each URL is run through the browser's URL constructor and a set of structural checks." },
      { "@type": "HowToStep", position: 3, name: "Read the summary counts", text: "Badges show how many URLs are valid, invalid, and flagged with a warning, giving you an instant overview of the batch." },
      { "@type": "HowToStep", position: 4, name: "Review the per-URL issues", text: "The results table lists each URL with a status icon and any issues found, such as an unsupported protocol or embedded credentials." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does the URL validator check?", acceptedAnswer: { "@type": "Answer", text: "It first parses each URL with the browser's URL constructor to confirm the format is valid. It then checks that the protocol is one of http, https, ftp, ftps, or file; that any port is a number between 0 and 65535; whether the URL embeds a username or password; and whether the URL is longer than 2048 characters." } },
      { "@type": "Question", name: "Can I validate many URLs at once?", acceptedAnswer: { "@type": "Answer", text: "Yes. Paste one URL per line and click Validate. The tool trims whitespace, ignores blank lines, and validates every remaining line, then shows summary counts plus a per-URL results table." } },
      { "@type": "Question", name: "What is the difference between invalid and a warning?", acceptedAnswer: { "@type": "Answer", text: "Invalid means the URL failed a hard check — it could not be parsed, used an unsupported protocol, or had an out-of-range port. A warning means the URL is structurally valid but has something to note, such as embedded credentials or a length over 2048 characters." } },
      { "@type": "Question", name: "Does it check whether a URL is reachable?", acceptedAnswer: { "@type": "Answer", text: "No. The validator checks structure and format only. It does not make network requests, so it will not tell you whether a server responds or returns a 404. This keeps it fast and fully private." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. All validation runs locally in your browser using the native URL API. The URLs you paste are never sent to or stored on any server." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "URL Validator", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">URL Validator</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Check a whole list of URLs at once for valid format, supported protocol, port range, excessive length, and embedded credentials. Everything runs in your browser with the native WHATWG URL API, so your links stay completely private.
        </p>

        <div className="mb-12">
          <UrlValidator />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Validate URLs</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Paste one URL per line</h3>
                <p className="text-muted-foreground">Enter your URLs in the text area with each link on its own line. The validator trims surrounding whitespace and skips blank lines, so you can paste straight from a spreadsheet column or a log file without cleaning it up first.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Click Validate</h3>
                <p className="text-muted-foreground">Press Validate to run the batch. Each URL is passed to the browser&apos;s URL constructor to confirm it parses, and then through checks for the protocol, port range, embedded credentials, and overall length.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Read the summary counts</h3>
                <p className="text-muted-foreground">Coloured badges tell you at a glance how many URLs are fully valid, how many are invalid, and how many passed but carry a warning. This makes it easy to judge the health of a large list before you dig into individual rows.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <div>
                <h3 className="font-semibold">Review the per-URL issues</h3>
                <p className="text-muted-foreground">The results table shows every URL alongside a green, red, or yellow status icon and a list of any issues found — an unsupported protocol, an out-of-range port, embedded credentials, or excessive length — so you know exactly what to fix.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a URL Validator?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Catch Broken Links in Bulk</h3>
              <p className="text-sm text-muted-foreground">Checking links one at a time is slow and easy to get wrong. Paste a whole list and the validator parses every line with the browser&apos;s URL constructor, flagging malformed URLs instantly so you do not ship a campaign or sitemap with broken links.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Spot Risky Patterns</h3>
              <p className="text-sm text-muted-foreground">Beyond a simple valid-or-not verdict, the tool warns about URLs that embed a username and password or run past 2048 characters. Those are not always errors, but they are worth a second look during a review.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">Validation runs entirely on the client and makes no network requests. You can check internal hostnames, signed links, or anything else sensitive without it being logged or transmitted anywhere.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">There is nothing to install and no account to create. The validator loads in any modern browser on desktop or mobile, ready whenever you need to sanity-check a list of links.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Auditing a Batch of Advertising Links</h3>
              <p className="text-muted-foreground">Before a campaign goes live, a marketer often has dozens of destination URLs to confirm. Pasting them all and clicking Validate immediately separates the well-formed links from the ones with a typo, a missing scheme, or an unsupported protocol, turning a tedious one-by-one click-through into a single pass.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Sanity-Checking URLs From a Data Export</h3>
              <p className="text-muted-foreground">CSV exports and database dumps frequently contain URL columns of uneven quality. Drop the column into the validator to find the rows that will not parse, the ones using an unexpected protocol, or the ones that have grown past a reasonable length, so you can clean the data before importing it.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Flagging Credentials in a Link Review</h3>
              <p className="text-muted-foreground">During a security or code review you may inherit a set of links from legacy configuration. The validator warns whenever a URL embeds a username or password, so you can quickly pick out the links that expose secrets which ought to live in a header or a vault instead.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Include the Scheme</h3>
              <p className="text-muted-foreground">The URL constructor needs an absolute URL with a scheme. A bare host like example.com/page will be reported as invalid; add https:// to the front so the validator can parse it and check the rest.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Treat Warnings as Prompts, Not Failures</h3>
              <p className="text-muted-foreground">A yellow warning means the URL is valid but notable — usually embedded credentials or a length over 2048 characters. Decide case by case whether that is acceptable for your use; the validator simply surfaces it.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Remember the Supported Protocols</h3>
              <p className="text-muted-foreground">The protocol check passes only http, https, ftp, ftps, and file. A link using a custom scheme will be marked invalid even if it parses, so use this tool for web-style URLs rather than application-specific deep links.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">It Does Not Test Reachability</h3>
              <p className="text-muted-foreground">The validator checks structure, not whether a server responds. A URL can be perfectly valid here and still return a 404. Use it to catch formatting problems, then verify live links separately if you need to.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Many link-checker services validate URLs by actually fetching each one from their servers. That tells you about reachability, but it is slower, it sends your list to a third party, and it cannot run against internal hostnames. URL Shuttle&apos;s validator takes a different angle: it checks format and structure locally with the WHATWG URL API, so it is instant, private, and works on links that no external crawler could ever reach.
            </p>
            <p className="text-muted-foreground mb-4">
              You could also validate URLs by hand in the browser console, wrapping each one in new URL(...) and inspecting the result. That is accurate but painfully manual for a long list, and it does not bundle the protocol, port, credential, and length checks together. This tool runs all of those across the whole batch at once and presents the outcome in a single table.
            </p>
            <p className="text-muted-foreground mb-4">
              Spreadsheet formulas and quick regex scripts are another common approach, but URL validation by regular expression is notoriously fragile and rarely matches what a browser actually accepts. Validating with the same URL constructor your application uses gives you results that line up with production behaviour, with zero setup on any device.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What does the URL validator check?</h3>
              <p className="text-muted-foreground">It parses each URL with the browser&apos;s URL constructor to confirm the format, then checks that the protocol is http, https, ftp, ftps, or file; that any port falls between 0 and 65535; whether credentials are embedded; and whether the URL exceeds 2048 characters.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I validate many URLs at once?</h3>
              <p className="text-muted-foreground">Yes. Put one URL per line and click Validate. The tool trims whitespace, ignores blank lines, validates every remaining line, and shows summary counts plus a per-URL results table.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between invalid and a warning?</h3>
              <p className="text-muted-foreground">Invalid means a hard failure: the URL could not be parsed, used an unsupported protocol, or had an out-of-range port. A warning means the URL is valid but notable — for example it embeds credentials or runs past 2048 characters.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Does it check whether a URL is reachable?</h3>
              <p className="text-muted-foreground">No. It checks structure and format only and makes no network requests, so it will not tell you whether a server responds. That is what keeps it fast and completely private.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. Validation runs entirely in your browser and the URLs you paste are never transmitted. You can safely check internal or sensitive links.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why is a valid-looking URL marked invalid?</h3>
              <p className="text-muted-foreground">The most common reasons are a missing scheme — add https:// — or a protocol outside the supported set of http, https, ftp, ftps, and file. Both cause the validator to fail the URL even though it may look fine at a glance.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Need to check more links? Explore the full URL Shuttle toolkit.</p>
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
