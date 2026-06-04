import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { UrlEncoderDecoder } from "@/components/url-encoder-decoder";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://url.shuttlelab.org";
const CANONICAL = `${BASE_URL}/tools/url-encoder-decoder/`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlEncoderDecoder" });
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
    title: "URL Encoder / Decoder Online — Free Percent-Encoding Tool",
    description:
      "Encode and decode URLs and URL components with encodeURIComponent and encodeURI, or decode percent-encoded text. Free, browser-based, instant, and 100% private.",
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, zh: CANONICAL, "x-default": CANONICAL },
    },
  };
}

export default async function UrlEncoderDecoderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages.urlEncoderDecoder" });
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>
        <div className="mb-12">
          <UrlEncoderDecoder />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          <Link href="/tools/url-encoder-decoder/" className="underline hover:text-foreground">
            查看完整英文指南 →
          </Link>
        </p>
      </div>
    );
  }

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Encode and Decode URLs Online",
    description:
      "A guide to percent-encoding and decoding URLs using encodeURIComponent and encodeURI, with a free browser-based tool that processes everything locally.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url: CANONICAL,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Encode or Decode a URL Online",
    step: [
      { "@type": "HowToStep", position: 1, name: "Choose encode or decode", text: "Select the Encode or Decode radio button depending on whether you want to escape text or read it back." },
      { "@type": "HowToStep", position: 2, name: "Pick the encode mode", text: "When encoding, choose Component to escape a single value with encodeURIComponent, or URI to escape a full URL with encodeURI." },
      { "@type": "HowToStep", position: 3, name: "Type or paste your text", text: "Enter text in the input box. The output updates automatically as you type, decoding with decodeURIComponent when in decode mode." },
      { "@type": "HowToStep", position: 4, name: "Copy or swap", text: "Copy the result, or click the swap button to move the output into the input and flip between encode and decode." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is URL encoding?", acceptedAnswer: { "@type": "Answer", text: "URL encoding, also called percent-encoding, replaces characters that are unsafe or reserved in a URL with a percent sign followed by their hexadecimal byte value. For example, a space becomes %20. This tool uses the browser's built-in encodeURIComponent and encodeURI functions to do it accurately." } },
      { "@type": "Question", name: "What is the difference between Component and URI encoding?", acceptedAnswer: { "@type": "Answer", text: "Component mode uses encodeURIComponent, which escapes everything except letters, digits, and a few marks, so it is right for a single value like a query parameter. URI mode uses encodeURI, which leaves structural characters such as : / ? # intact, so it is right for encoding a whole URL." } },
      { "@type": "Question", name: "How does decoding work?", acceptedAnswer: { "@type": "Answer", text: "Decoding always uses decodeURIComponent, which converts percent escapes back into their original characters. So %20 becomes a space and %40 becomes an at sign, regardless of which encode mode produced the string." } },
      { "@type": "Question", name: "What happens if I decode an invalid string?", acceptedAnswer: { "@type": "Answer", text: "If a string contains a malformed percent escape, such as a lone percent sign, decodeURIComponent throws an error. The tool catches this and clears or shows a decode-error message rather than producing broken output." } },
      { "@type": "Question", name: "Is my data uploaded anywhere?", acceptedAnswer: { "@type": "Answer", text: "No. All encoding and decoding happens locally in your browser using the native encodeURIComponent, encodeURI, and decodeURIComponent functions. Nothing you type is sent to or stored on any server." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "URL Encoder / Decoder", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">URL Encoder / Decoder</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Percent-encode text for safe use in URLs, or decode an encoded string back to readable text. Switch between encodeURIComponent and encodeURI, and run everything locally in your browser so your data stays completely private.
        </p>

        <div className="mb-12">
          <UrlEncoderDecoder />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Encode or Decode a URL</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <div>
                <h3 className="font-semibold">Choose encode or decode</h3>
                <p className="text-muted-foreground">Select Encode to turn readable text into a percent-encoded form, or Decode to turn percent escapes back into the original characters. The tool processes your text as you type, so there is no button to press.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <div>
                <h3 className="font-semibold">Pick the encode mode</h3>
                <p className="text-muted-foreground">When you are encoding, a second choice appears: Component or URI. Component uses encodeURIComponent for a single value such as one query parameter, while URI uses encodeURI for an entire URL where you want to keep structural characters like the slashes and the question mark.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <div>
                <h3 className="font-semibold">Type or paste your text</h3>
                <p className="text-muted-foreground">Enter your text in the input box and the result appears immediately below. In decode mode the tool runs decodeURIComponent; if the input contains a malformed escape, it safely clears the output instead of crashing.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <div>
                <h3 className="font-semibold">Copy or swap</h3>
                <p className="text-muted-foreground">Use the copy button to send the result to your clipboard. The swap button moves the current output back into the input and flips between encode and decode, which makes round-tripping a value quick and reliable.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Use a URL Encoder / Decoder?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">The Right Function for the Job</h3>
              <p className="text-sm text-muted-foreground">Choosing between encodeURIComponent and encodeURI by hand is a frequent source of bugs. This tool exposes both as a clear Component-or-URI choice, so you escape a single value or a whole URL with the correct function instead of guessing.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Instant, Live Results</h3>
              <p className="text-sm text-muted-foreground">The output updates the moment you type. There is no submit step, which makes it fast to test how a particular character will be escaped or to confirm that a long encoded blob decodes into what you expected.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">Encoding and decoding run entirely on the client. You can paste tokens, signed parameters, or any other sensitive string and decode it without any of it being logged or sent to a server.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">No Setup, Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">Nothing to install and no account to create. The encoder loads in any modern browser on desktop or mobile, so it is always at hand when you hit a stubborn %25 or %2F while debugging.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Escaping a Value for a Query String</h3>
              <p className="text-muted-foreground">When you need to drop a search term, a redirect target, or a JSON blob into a single query parameter, those values often contain spaces, ampersands, or slashes that would break the URL. Encode the value in Component mode and paste the safe result into your query string, confident that the reserved characters are correctly escaped.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Reading Encoded URLs From Logs</h3>
              <p className="text-muted-foreground">Server logs and analytics exports are full of percent-encoded URLs that are hard to read. Switch to Decode, paste the string, and the tool runs decodeURIComponent to reveal the original text, so you can quickly see exactly what a request contained.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Round-Tripping to Check Double Encoding</h3>
              <p className="text-muted-foreground">Double-encoding — where a value gets escaped twice and shows up as %2520 instead of %20 — is a classic bug. Decode a suspect string once with this tool; if the result still contains percent escapes, you have found the double encoding and can fix it at the source.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips and Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Use Component for Single Values</h3>
              <p className="text-muted-foreground">If you are escaping one piece of data — a parameter value, a path segment, a fragment — choose Component mode. encodeURIComponent escapes the structural characters too, which is exactly what you want when the value sits inside a larger URL.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Use URI for a Whole URL</h3>
              <p className="text-muted-foreground">If you have a complete URL that only needs its unsafe characters escaped while keeping the slashes and question mark intact, choose URI mode. encodeURI is designed for that case and will not mangle the URL&apos;s structure.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Watch for Decode Errors</h3>
              <p className="text-muted-foreground">decodeURIComponent throws on a malformed escape such as a lone percent sign. If the output suddenly goes blank or shows a decode error while decoding, check the input for an incomplete %xx sequence.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Swap to Verify a Round Trip</h3>
              <p className="text-muted-foreground">After encoding a value, click swap to decode it straight back. If you land on your original text, the round trip is clean; if not, the input likely contained something already encoded.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compared to Alternatives</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Plenty of generic online encoder sites such as urlencoder.org will percent-encode a string for you, but most of them send the text you paste to their server to process it. That is a real problem when the value is a token or a signed parameter. URL Shuttle runs encodeURIComponent, encodeURI, and decodeURIComponent locally with the functions your browser already ships, so sensitive text never leaves the page.
            </p>
            <p className="text-muted-foreground mb-4">
              You can also encode in the browser console by calling encodeURIComponent yourself. That is accurate and private, but it means opening devtools and remembering which of the two functions you need. This tool puts the Component-versus-URI choice right in front of you and shows the result live, which removes both the friction and the guesswork.
            </p>
            <p className="text-muted-foreground mb-4">
              Command-line tools and small scripts also keep data local, but they are heavyweight for a one-off escape and awkward on a machine where your environment is not set up. A browser-based encoder hits the sweet spot: the correct standard functions, full privacy, an instant preview, and zero setup on any device.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is URL encoding?</h3>
              <p className="text-muted-foreground">URL encoding, or percent-encoding, replaces characters that are reserved or unsafe in a URL with a percent sign and their hexadecimal byte value, so a space becomes %20. This tool uses the browser&apos;s built-in encodeURIComponent and encodeURI to produce the correct output.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between Component and URI encoding?</h3>
              <p className="text-muted-foreground">Component mode uses encodeURIComponent and escapes nearly everything, making it right for a single value such as a query parameter. URI mode uses encodeURI and preserves structural characters like : / ? #, making it right for encoding a complete URL.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does decoding work?</h3>
              <p className="text-muted-foreground">Decoding always uses decodeURIComponent, which turns percent escapes back into the original characters. %20 becomes a space and %40 becomes an at sign, no matter which mode produced the encoded string.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I decode an invalid string?</h3>
              <p className="text-muted-foreground">If the input has a malformed escape, such as a lone percent sign, decodeURIComponent throws. The tool catches that and clears or flags the output rather than showing broken text, so you know the input needs fixing.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. Every operation runs in your browser and nothing you type is transmitted. You can decode tokens or signed parameters without any privacy concern.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I quickly reverse an operation?</h3>
              <p className="text-muted-foreground">Yes. The swap button moves the output into the input and flips between encode and decode, which makes it easy to round-trip a value and confirm it survives unchanged.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">Need to escape more strings? Explore the full URL Shuttle toolkit.</p>
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
