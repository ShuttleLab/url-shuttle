"use client";

import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("terms.title")}</h1>
      <p className="text-xl text-muted-foreground mb-8">{t("terms.subtitle")}</p>
      <p className="text-sm text-muted-foreground mb-8">{t("terms.lastUpdated")}</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.serviceDescription")}</h2>
          <p className="text-muted-foreground">{t("terms.serviceDescriptionDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.usage")}</h2>
          <p className="text-muted-foreground">{t("terms.usageDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.limitations")}</h2>
          <p className="text-muted-foreground">{t("terms.limitationsDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.intellectualProperty")}</h2>
          <p className="text-muted-foreground">{t("terms.intellectualPropertyDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.changes")}</h2>
          <p className="text-muted-foreground">{t("terms.changesDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("terms.contact")}</h2>
          <p className="text-muted-foreground">
            {t("terms.contactDesc")}{" "}
            <a href="mailto:support@shuttlelab.org" className="text-primary hover:underline">
              support@shuttlelab.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
