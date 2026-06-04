"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { UrlEncoderDecoder } from "@/components/url-encoder-decoder";
import {
  Search,
  Edit3,
  Wrench,
  Type,
  CheckCircle,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  const features = [
    {
      icon: ArrowRight,
      title: t("common.featureEncoder"),
      description: t("common.featureEncoderDesc"),
    },
    {
      icon: Search,
      title: t("common.featureParser"),
      description: t("common.featureParserDesc"),
    },
    {
      icon: Edit3,
      title: t("common.featureQueryEditor"),
      description: t("common.featureQueryEditorDesc"),
    },
    {
      icon: Wrench,
      title: t("common.featureBuilder"),
      description: t("common.featureBuilderDesc"),
    },
    {
      icon: Type,
      title: t("common.featureSlug"),
      description: t("common.featureSlugDesc"),
    },
    {
      icon: CheckCircle,
      title: t("common.featureValidator"),
      description: t("common.featureValidatorDesc"),
    },
    {
      icon: Shield,
      title: t("common.featurePrivate"),
      description: t("common.featurePrivateDesc"),
    },
  ];

  const tools = [
    { name: t("nav.encoderDecoder"), desc: t("common.featureEncoderDesc"), href: "/tools/url-encoder-decoder", icon: ArrowRight },
    { name: t("nav.urlParser"), desc: t("common.featureParserDesc"), href: "/tools/url-parser", icon: Search },
    { name: t("nav.queryEditor"), desc: t("common.featureQueryEditorDesc"), href: "/tools/query-string-editor", icon: Edit3 },
    { name: t("nav.urlBuilder"), desc: t("common.featureBuilderDesc"), href: "/tools/url-builder", icon: Wrench },
    { name: t("nav.slugGenerator"), desc: t("common.featureSlugDesc"), href: "/tools/url-slug-generator", icon: Type },
    { name: t("nav.urlValidator"), desc: t("common.featureValidatorDesc"), href: "/tools/url-validator", icon: CheckCircle },
  ];

  const steps = [
    { step: "1", text: t("common.step1") },
    { step: "2", text: t("common.step2") },
    { step: "3", text: t("common.step3") },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 lg:py-20 px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {t("home.heroTitle")}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {t("home.heroSubtitle")}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" onClick={() => document.getElementById("url-tool")?.scrollIntoView({ behavior: "smooth" })}>
            {t("common.encodeNow")}
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = "/about"}>
            {t("common.learnMore")}
          </Button>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">{t("common.features")}</h2>
        <p className="text-center text-muted-foreground mb-8">
          {t("common.featuresSubtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* URL Parser Tool */}
      <section id="url-tool" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <UrlEncoderDecoder />
      </section>

      {/* Tool Entry Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2">{t("home.toolsTitle")}</h2>
        <p className="text-center text-muted-foreground mb-8">
          {t("home.toolsSubtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <Link key={i} href={tool.href}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <tool.icon className="size-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {tool.desc}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">{t("common.howItWorks")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <p className="text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">{t("home.toolsTitle")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("home.toolsSubtitle")}
        </p>
        <Button size="lg" onClick={() => document.getElementById("url-tool")?.scrollIntoView({ behavior: "smooth" })}>
          {t("common.getStarted")}
        </Button>
      </section>
    </div>
  );
}
