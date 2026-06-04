"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Plus, X, ArrowUpDown, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface QueryParam {
  key: string;
  value: string;
}

export function QueryEditor() {
  const t = useTranslations();
  const [inputUrl, setInputUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<QueryParam[]>([]);
  const [outputUrl, setOutputUrl] = useState("");

  const parseUrl = useCallback((url: string) => {
    if (!url.trim()) {
      setBaseUrl("");
      setParams([]);
      return;
    }

    try {
      const parsed = new URL(url);
      const base = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
      setBaseUrl(base);

      const newParams: QueryParam[] = [];
      parsed.searchParams.forEach((value, key) => {
        newParams.push({ key, value });
      });
      setParams(newParams);
    } catch {
      setBaseUrl(url.split("?")[0] || url);
      setParams([]);
    }
  }, []);

  const buildOutputUrl = useCallback(() => {
    if (!baseUrl) {
      setOutputUrl("");
      return;
    }

    try {
      const url = new URL(baseUrl);
      url.search = "";
      params.forEach(({ key, value }) => {
        if (key) url.searchParams.append(key, value);
      });
      setOutputUrl(url.toString());
    } catch {
      const queryString = params
        .filter((p) => p.key)
        .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
        .join("&");
      setOutputUrl(queryString ? `${baseUrl}?${queryString}` : baseUrl);
    }
  }, [baseUrl, params]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- recompute derived state when input URL changes
    parseUrl(inputUrl);
  }, [inputUrl, parseUrl]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- rebuild output URL when params change
    buildOutputUrl();
  }, [buildOutputUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

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

  const sortParams = () => {
    setParams([...params].sort((a, b) => a.key.localeCompare(b.key)));
  };

  const clearAll = () => {
    setParams([]);
  };

  const encodeAll = () => {
    setParams(
      params.map((p) => ({
        ...p,
        value: encodeURIComponent(p.value),
      }))
    );
  };

  const decodeAll = () => {
    setParams(
      params.map((p) => ({
        ...p,
        value: decodeURIComponent(p.value),
      }))
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("queryEditor.title")}</CardTitle>
        <CardDescription>{t("queryEditor.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="query-editor-input">{t("common.input")}</Label>
          <Input
            id="query-editor-input"
            placeholder={t("queryEditor.inputPlaceholder")}
            value={inputUrl}
            onChange={handleInputChange}
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>{t("common.queryParameters")}</Label>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={addParam}>
                <Plus className="size-4 mr-2" />
                {t("queryEditor.addParameter")}
              </Button>
              <Button variant="outline" size="sm" onClick={sortParams}>
                <ArrowUpDown className="size-4 mr-2" />
                {t("queryEditor.sortAZ")}
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="size-4 mr-2" />
                {t("queryEditor.clearAll")}
              </Button>
              <Button variant="outline" size="sm" onClick={encodeAll}>
                {t("queryEditor.encodeAll")}
              </Button>
              <Button variant="outline" size="sm" onClick={decodeAll}>
                {t("queryEditor.decodeAll")}
              </Button>
            </div>
          </div>

          {params.length > 0 ? (
            <div className="border rounded-md">
              <div className="hidden sm:grid sm:grid-cols-[auto_1fr_1fr_auto] gap-4 p-3 bg-muted text-sm font-medium">
                <div className="w-8">{t("common.number")}</div>
                <div>{t("common.key")}</div>
                <div>{t("common.value")}</div>
                <div className="w-8"></div>
              </div>
              {params.map((param, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-3 border-t text-sm sm:grid sm:grid-cols-[auto_1fr_1fr_auto] sm:gap-4 sm:items-center"
                >
                  <div className="flex items-center gap-2 sm:contents">
                    <div className="w-8 text-muted-foreground shrink-0 sm:order-1">{i + 1}</div>
                    <Input
                      placeholder={t("common.key")}
                      value={param.key}
                      onChange={(e) => updateParam(i, "key", e.target.value)}
                      className="font-mono h-8 min-w-0 flex-1 sm:order-2 sm:flex-none"
                      aria-label={t("common.key")}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 sm:order-4"
                      onClick={() => removeParam(i)}
                      aria-label={t("common.removeParameter")}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder={t("common.value")}
                    value={param.value}
                    onChange={(e) => updateParam(i, "value", e.target.value)}
                    className="font-mono h-8 min-w-0 sm:order-3"
                    aria-label={t("common.value")}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {t("queryEditor.noParams")}
            </div>
          )}
        </div>

        {outputUrl && (
          <div className="space-y-2">
            <Label>{t("queryEditor.outputUrl")}</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                {outputUrl}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(outputUrl)}
            >
              <Copy className="size-4 mr-2" />
              {t("queryEditor.copyUrl")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
