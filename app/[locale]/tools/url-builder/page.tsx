import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { UrlBuilder } from "@/components/url-builder";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/url-builder/`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "URL Builder Online — Construct URLs From Components for Free",
    description:
      "Build a valid URL from a protocol, hostname, port, path, query parameters, and hash. Free, browser-based URL builder using the native WHATWG URL API. No upload, 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function UrlBuilderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Build a URL From Its Components Online",
    description:
      "A guide to assembling a correct URL from a protocol, hostname, port, pathname, query parameters, and hash using a free browser-based builder powered by the WHATWG URL API.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build a URL Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Choose a protocol and hostname", text: "Pick a protocol such as https from the dropdown and type the hostname. The builder needs a hostname before it can produce a result." },
      { "@type": "HowToStep", position: 2, name: "Add path, port, and hash", text: "Fill in the optional port, pathname, and hash fields. Each one is applied through the URL object so the structure stays valid." },
      { "@type": "HowToStep", position: 3, name: "Add query parameters", text: "Click Add Parameter to insert key-value pairs. Each pair is appended with searchParams.append, which percent-encodes values automatically." },
      { "@type": "HowToStep", position: 4, name: "Copy or open the URL", text: "The assembled URL appears instantly. Copy it to your clipboard or open it in a new tab to test it." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does a URL builder do?", acceptedAnswer: { "@type": "Answer", text: "A URL builder assembles a complete, valid URL from separate fields: protocol, hostname, port, pathname, query parameters, and hash. This builder constructs the result with the browser's native URL object, so the output is guaranteed to follow the WHATWG URL Standard." } },
      { "@type": "Question", name: "Which protocols can I choose?", acceptedAnswer: { "@type": "Answer", text: "The protocol dropdown offers https, http, ftp, and file. The hostname is required; once you enter one, the builder produces a URL and applies any port, path, hash, and query parameters you add." } },
      { "@type": "Question", name: "Are query parameter values encoded automatically?", acceptedAnswer: { "@type": "Answer", text: "Yes. Each parameter is added with URLSearchParams append, which percent-encodes reserved characters such as spaces and ampersands. You type the human-readable value and the builder handles the encoding." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. The builder runs entirely in your browser using the built-in URL API. Nothing you type is sent to or stored on any server." } },
      { "@type": "Question", name: "Why is there no result showing?", acceptedAnswer: { "@type": "Answer", text: "The builder only produces output once a hostname is present. If the hostname field is empty, or the combination cannot form a valid URL, the result stays blank until you provide a usable hostname." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "URL Builder", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">URL Builder</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Assemble a valid URL from a protocol, hostname, port, path, query parameters, and hash. Everything is constructed in your browser with the native WHATWG URL API, so your links are built correctly and stay completely private.
        </p>

        <div className="mb-12">
          <UrlBuilder />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Build a URL</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Choose a protocol and hostname</h3>
                <p className="text-muted-foreground">Select a protocol from the dropdown — https, http, ftp, or file — and type the hostname, such as example.com. The hostname is the one required field: until you enter it, the builder leaves the result blank because there is nothing to anchor the URL to.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Fill in the path, port, and hash</h3>
                <p className="text-muted-foreground">Add an optional port for non-standard endpoints, a pathname such as /api/v1/users, and a hash fragment like #section. Each value is applied through the URL object, so the structure is always normalized into a valid link as you type.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Add query parameters</h3>
                <p className="text-muted-foreground">Press Add Parameter to insert as many key-value rows as you need. Each non-empty key is appended with searchParams.append, which percent-encodes values for you. Remove any row with the X button if you change your mind.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <div>
                <h3 className="font-semibold">Copy or open the result</h3>
                <p className="text-muted-foreground">The finished URL appears in the result box the instant it is valid. Use Copy URL to send it to your clipboard, or Open URL to launch it in a new browser tab and confirm it points where you expect.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a URL Builder?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Correct Encoding Every Time</h3>
              <p className="text-sm text-muted-foreground">Hand-writing a URL with special characters is where bugs creep in: a stray space, an unescaped ampersand, a missing question mark. Because the builder appends each parameter through URLSearchParams, reserved characters are percent-encoded automatically, so the URL you get is always well-formed.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Standards-Based Output</h3>
              <p className="text-sm text-muted-foreground">The builder constructs the result with the browser&apos;s native URL constructor, which implements the WHATWG URL Standard. That means the link behaves exactly the way it will in your application code, your server, and every modern browser.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">Everything happens on the client. You can build URLs that contain internal hostnames, signed tokens, or sensitive query values without any of it being logged or transmitted to a server.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">There is nothing to install and no account to create. The builder loads in any modern browser on desktop or mobile, making it a quick companion when you need a precise URL away from your usual tooling.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Constructing API Request URLs by Hand</h3>
              <p className="text-muted-foreground">When you are testing an endpoint in a browser, a REST client, or a quick script, you often need a URL with several query parameters set just so. Filling in the hostname, path, and a handful of key-value pairs in the builder produces a ready-to-paste URL with every value correctly encoded, which saves you from chasing a 400 error caused by an unescaped character.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Creating Campaign and Tracking Links</h3>
              <p className="text-muted-foreground">Marketing links need consistent utm_source, utm_medium, and utm_campaign parameters. The builder lets you start from a clean hostname and path, then add each tracking parameter as its own row, so you can produce a batch of correct links without copy-pasting and editing a long query string in a text editor.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Building Deep Links With Fragments</h3>
              <p className="text-muted-foreground">Single-page apps and documentation sites often rely on hash fragments to jump to a section or restore state. Setting the hash field alongside the path and query parameters gives you a complete deep link in one place, which you can immediately open in a new tab to verify it lands on the right view.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Start With the Hostname</h3>
              <p className="text-muted-foreground">Because the builder produces nothing until a hostname is present, enter that field first. Once it is filled, you will see the URL update live as you add the port, path, hash, and parameters around it.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Type Values, Not Encoded Strings</h3>
              <p className="text-muted-foreground">Put the readable value in the parameter field — a real space, a real ampersand — and let the builder encode it. If you paste an already-encoded value, you can end up double-encoding it, which is a common and confusing bug.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Only Set a Port When You Need One</h3>
              <p className="text-muted-foreground">Standard ports such as 443 for https and 80 for http are implied. Leave the port field empty unless you are targeting a non-default port, otherwise you may add a redundant :443 or :80 to your link.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Pair It With the Parser</h3>
              <p className="text-muted-foreground">After building a URL, paste it into the URL Parser to confirm every component landed where you intended. The builder and parser are mirror images: one assembles, the other inspects.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              The quickest alternative is to type the URL by hand in a text editor or the address bar. That works for a simple link, but the moment you have spaces, non-ASCII characters, or several query parameters, manual editing becomes error-prone — a single missing percent escape can break the request. URL Shuttle&apos;s builder removes that risk by appending each parameter through URLSearchParams, so encoding is never something you have to remember.
            </p>
            <p className="text-muted-foreground mb-4">
              Some developers reach for the browser console and write new URL(...) plus searchParams.append calls themselves. That is accurate and private, but it requires opening devtools, knowing the API, and reassembling the string by hand. This builder gives you the same standards-based result through labelled fields and a live preview, which is faster when you just want a correct link.
            </p>
            <p className="text-muted-foreground mb-4">
              Many online URL builders send the values you enter to a server to assemble the link. That is a problem when a parameter contains a session token or an internal hostname. Because this builder runs entirely in your browser with the URL API your browser already ships, sensitive values never leave the page, while you still get fully standards-compliant output.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What does a URL builder do?</h3>
              <p className="text-muted-foreground">It assembles a complete, valid URL from separate fields: protocol, hostname, port, pathname, query parameters, and hash. The result is constructed with the browser&apos;s native URL object, so the output always follows the WHATWG URL Standard rather than relying on manual string concatenation.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Which protocols can I choose?</h3>
              <p className="text-muted-foreground">The dropdown offers https, http, ftp, and file. A hostname is required; once it is filled in, any port, path, hash, and query parameters you add are applied on top of it to produce the final URL.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Are query parameter values encoded automatically?</h3>
              <p className="text-muted-foreground">Yes. Each parameter is appended with URLSearchParams, which percent-encodes reserved characters such as spaces and ampersands for you. Type the readable value and the builder handles the encoding.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. The builder runs entirely in your browser and never transmits anything you type. You can construct links containing tokens or internal hostnames with no privacy concern.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why is the result box empty?</h3>
              <p className="text-muted-foreground">The builder only produces a URL once a hostname is present. If the hostname field is blank, or the values cannot form a valid URL, the result stays empty until you supply a usable hostname.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I open the URL straight away?</h3>
              <p className="text-muted-foreground">Yes. Alongside Copy URL there is an Open URL button that launches the assembled link in a new browser tab, so you can verify it works without leaving the page.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Ready to build more URLs? Explore the full URL Shuttle toolkit.</p>
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
