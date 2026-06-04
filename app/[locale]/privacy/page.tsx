"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("privacy.title")}</h1>
      <p className="text-xl text-muted-foreground mb-8">{t("privacy.subtitle")}</p>
      <p className="text-sm text-muted-foreground mb-8">{t("privacy.lastUpdated")}</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.dataCollection")}</h2>
          <p className="text-muted-foreground">{t("privacy.dataCollectionDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.localStorage")}</h2>
          <p className="text-muted-foreground">{t("privacy.localStorageDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.analytics")}</h2>
          <p className="text-muted-foreground">{t("privacy.analyticsDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.thirdParty")}</h2>
          <p className="text-muted-foreground">{t("privacy.thirdPartyDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.yourRights")}</h2>
          <p className="text-muted-foreground">{t("privacy.yourRightsDesc")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.contact")}</h2>
          <p className="text-muted-foreground">
            {t("privacy.contactDesc")}{" "}
            <a href="mailto:support@shuttlelab.org" className="text-primary hover:underline">
              support@shuttlelab.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
