"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/about" className="hover:text-foreground transition-colors">
              {t("footer.about")}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {t("footer.terms")}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <a href="mailto:support@shuttlelab.org" className="hover:text-foreground transition-colors">
              {t("footer.contact")}
            </a>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="https://github.com/ShuttleLab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t("footer.github")}
            </a>
          </div>
          <p className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-muted-foreground">Also from ShuttleLab:</span>
            <a
              href="https://image.shuttlelab.org"
              rel="noopener"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Image Shuttle
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} ShuttleLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
