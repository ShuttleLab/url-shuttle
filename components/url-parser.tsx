"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface UrlComponents {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: { key: string; value: string }[];
}

export function UrlParser() {
  const t = useTranslations();
  const [url, setUrl] = useState("");
  const [components, setComponents] = useState<UrlComponents | null>(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const parseUrl = useCallback((input: string) => {
    if (!input.trim()) {
      setComponents(null);
      setError("");
      return;
    }

    try {
      const parsed = new URL(input);
      const params: { key: string; value: string }[] = [];
      parsed.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });

      setComponents({
        protocol: parsed.protocol,
        username: parsed.username,
        password: parsed.password,
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        params,
      });
      setError("");
    } catch {
      setComponents(null);
      setError(t("parser.invalidUrl"));
    }
  }, [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    parseUrl(value);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };

  const copyComponent = (label: string, value: string) => {
    copyToClipboard(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("parser.title")}</CardTitle>
        <CardDescription>{t("parser.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder={t("parser.inputPlaceholder")}
            value={url}
            onChange={handleInputChange}
            className="font-mono text-sm"
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {components && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("parser.components")}
              </h3>
              <div className="border rounded-md divide-y">
                {[
                  { label: t("common.protocol"), value: components.protocol },
                  { label: t("common.username"), value: components.username },
                  { label: t("common.password"), value: components.password ? (showPassword ? components.password : "****") : "" },
                  { label: t("common.hostname"), value: components.hostname },
                  { label: t("common.port"), value: components.port },
                  { label: t("common.pathname"), value: components.pathname },
                  { label: t("common.search"), value: components.search },
                  { label: t("common.hash"), value: components.hash },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="flex items-center justify-between p-3">
                      <span className="text-sm font-medium text-muted-foreground w-24">
                        {label}
                      </span>
                      <span className="text-sm font-mono flex-1 truncate mr-2">
                        {value}
                      </span>
                      <div className="flex items-center gap-1">
                        {label === t("common.password") && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => copyComponent(label, label === t("common.password") ? components.password : value)}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {components.params.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("parser.queryParams")}
                </h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-4 p-3 bg-muted text-sm font-medium">
                    <div>{t("common.key")}</div>
                    <div>{t("common.value")}</div>
                    <div className="w-8"></div>
                  </div>
                  {components.params.map((param, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-4 p-3 border-t text-sm">
                      <div className="font-mono truncate">{param.key}</div>
                      <div className="font-mono truncate">{param.value}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => copyToClipboard(param.value)}
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(url)}
              >
                <Copy className="size-4 mr-2" />
                {t("common.copyUrl")}
              </Button>
              {url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(url, "_blank")}
                >
                  <ExternalLink className="size-4 mr-2" />
                  {t("common.openUrl")}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
