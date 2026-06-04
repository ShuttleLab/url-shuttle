"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, ArrowDownUp, Trash2, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

// toolhelper-style explicit-action layout: one input box on top, a row of
// big obvious action buttons (Encode / Decode / Swap / Clear), result below.
// Textareas grow with content (field-sizing) instead of fixed heights.
export function UrlEncoderDecoder() {
  const t = useTranslations();
  const [encodeType, setEncodeType] = useState<"component" | "uri">("component");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runEncode = () => {
    setError("");
    setOutput(encodeType === "component" ? encodeURIComponent(input) : encodeURI(input));
  };

  const runDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch {
      setOutput("");
      setError(t("encoder.decodeError"));
    }
  };

  const swap = () => {
    if (!output) return;
    setInput(output);
    setOutput("");
    setError("");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("common.copied"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("encoder.title")}</CardTitle>
        <CardDescription>{t("encoder.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="encoder-input">{t("common.input")}</Label>
          <Textarea
            id="encoder-input"
            placeholder={t("encoder.inputPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-24 field-sizing-content max-h-[60vh] resize-y"
          />
        </div>

        {/* Action row — explicit buttons, the core interaction */}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={runEncode} disabled={!input} className="h-10 px-5">
            <Lock className="size-4" />
            {t("encoder.encode")}
          </Button>
          <Button onClick={runDecode} disabled={!input} variant="secondary" className="h-10 px-5">
            <Unlock className="size-4" />
            {t("encoder.decode")}
          </Button>
          <Button variant="outline" onClick={swap} disabled={!output} className="h-10">
            <ArrowDownUp className="size-4" />
            {t("encoder.swap")}
          </Button>
          <Button
            variant="outline"
            onClick={clearAll}
            disabled={!input && !output}
            className="h-10 text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
            {t("encoder.clear")}
          </Button>

          {/* Encode-mode choice, compact segmented toggle at the row end */}
          <div className="ml-auto inline-flex rounded-lg border bg-muted p-0.5 gap-0.5">
            <Button
              variant={encodeType === "component" ? "default" : "ghost"}
              size="sm"
              className="h-8 rounded-md px-3 text-xs"
              onClick={() => setEncodeType("component")}
              title="encodeURIComponent"
            >
              Component
            </Button>
            <Button
              variant={encodeType === "uri" ? "default" : "ghost"}
              size="sm"
              className="h-8 rounded-md px-3 text-xs"
              onClick={() => setEncodeType("uri")}
              title="encodeURI"
            >
              URI
            </Button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md break-words">
            {error}
          </div>
        )}

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Label htmlFor="encoder-output">{t("encoder.output")}</Label>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!output}>
              <Copy className="size-4" />
              {t("encoder.copy")}
            </Button>
          </div>
          <Textarea
            id="encoder-output"
            value={output}
            readOnly
            placeholder={t("encoder.outputPlaceholder")}
            className="font-mono text-sm min-h-24 field-sizing-content max-h-[60vh] resize-y bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  );
}
