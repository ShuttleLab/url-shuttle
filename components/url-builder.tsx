"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ExternalLink, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface QueryParam {
  key: string;
  value: string;
}

export function UrlBuilder() {
  const t = useTranslations();
  const [protocol, setProtocol] = useState("https:");
  const [hostname, setHostname] = useState("");
  const [port, setPort] = useState("");
  const [pathname, setPathname] = useState("");
  const [hash, setHash] = useState("");
  const [params, setParams] = useState<QueryParam[]>([]);
  const [resultUrl, setResultUrl] = useState("");

  const buildUrl = useCallback(() => {
    if (!hostname) {
      setResultUrl("");
      return;
    }

    try {
      const url = new URL(`${protocol}//${hostname}`);
      if (port) url.port = port;
      if (pathname) url.pathname = pathname;
      if (hash) url.hash = hash;

      params.forEach(({ key, value }) => {
        if (key) url.searchParams.append(key, value);
      });

      setResultUrl(url.toString());
    } catch {
      setResultUrl("");
    }
  }, [protocol, hostname, port, pathname, hash, params]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- rebuild URL when any part changes
    buildUrl();
  }, [buildUrl]);

  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const updateParam = (index: number, field: "key" | "value", value: string) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("builder.title")}</CardTitle>
        <CardDescription>{t("builder.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("builder.protocol")}</Label>
            <Select value={protocol} onValueChange={(value) => setProtocol(value || "https:")}
>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="https:">https://</SelectItem>
                <SelectItem value="http:">http://</SelectItem>
                <SelectItem value="ftp:">ftp://</SelectItem>
                <SelectItem value="file:">file://</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("builder.hostname")}</Label>
            <Input
              placeholder={t("builder.hostnamePlaceholder")}
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("builder.port")}</Label>
            <Input
              placeholder={t("builder.portPlaceholder")}
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("builder.pathname")}</Label>
            <Input
              placeholder={t("builder.pathnamePlaceholder")}
              value={pathname}
              onChange={(e) => setPathname(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{t("builder.hash")}</Label>
            <Input
              placeholder={t("builder.hashPlaceholder")}
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{t("builder.queryParameters")}</Label>
            <Button variant="outline" size="sm" onClick={addParam}>
              <Plus className="size-4 mr-2" />
              {t("builder.addParameter")}
            </Button>
          </div>
          {params.length > 0 && (
            <div className="border rounded-md divide-y">
              {params.map((param, i) => (
                <div key={i} className="flex items-center gap-2 p-2">
                  <Input
                    placeholder={t("builder.keyPlaceholder")}
                    value={param.key}
                    onChange={(e) => updateParam(i, "key", e.target.value)}
                    className="font-mono flex-1"
                  />
                  <Input
                    placeholder={t("builder.valuePlaceholder")}
                    value={param.value}
                    onChange={(e) => updateParam(i, "value", e.target.value)}
                    className="font-mono flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => removeParam(i)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {resultUrl && (
          <div className="space-y-2">
            <Label>{t("builder.resultUrl")}</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                {resultUrl}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(resultUrl)}
              >
                <Copy className="size-4 mr-2" />
                {t("builder.copyUrl")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(resultUrl, "_blank")}
              >
                <ExternalLink className="size-4 mr-2" />
                {t("builder.openUrl")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
