"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "it", "that", "this", "was", "are",
  "be", "has", "had", "have", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "can", "shall",
]);

export function UrlSlug() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [caseType, setCaseType] = useState("lowercase");
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState(60);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(true);
  const [output, setOutput] = useState("");

  const generateSlug = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let slug = input;

    // Convert to lowercase or uppercase
    if (caseType === "lowercase") {
      slug = slug.toLowerCase();
    } else {
      slug = slug.toUpperCase();
    }

    // Remove special characters if enabled
    if (removeSpecialChars) {
      slug = slug.replace(/[^\w\s\u4e00-\u9fff\u3400-\u4dbf]/g, "");
    }

    // Split into words
    let words = slug.split(/[\s\-_]+/).filter(Boolean);

    // Remove stop words if enabled
    if (removeStopWords) {
      words = words.filter((word) => !STOP_WORDS.has(word.toLowerCase()));
    }

    // Join with separator
    slug = words.join(separator);

    // Remove consecutive separators
    const separatorRegex = new RegExp(`\\${separator}+`, "g");
    slug = slug.replace(separatorRegex, separator);

    // Remove leading/trailing separators
    if (slug.startsWith(separator)) slug = slug.slice(1);
    if (slug.endsWith(separator)) slug = slug.slice(0, -1);

    // Apply max length
    if (slug.length > maxLength) {
      slug = slug.slice(0, maxLength);
      // Remove trailing separator if cut
      if (slug.endsWith(separator)) {
        slug = slug.slice(0, -1);
      }
    }

    setOutput(slug);
  }, [input, separator, caseType, removeStopWords, maxLength, removeSpecialChars]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- regenerate slug when input/options change
    generateSlug();
  }, [generateSlug]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };

  const previewUrl = output
    ? `https://example.com/blog/${output}`
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("slug.title")}</CardTitle>
        <CardDescription>{t("slug.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t("common.input")}</Label>
          <Input
            placeholder={t("slug.inputPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label>{t("slug.options")}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">{t("slug.separator")}</Label>
              <Select value={separator} onValueChange={(value) => setSeparator(value || "-")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">{t("slug.hyphen")}</SelectItem>
                  <SelectItem value="_">{t("slug.underscore")}</SelectItem>
                  <SelectItem value=".">{t("slug.dot")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">{t("slug.case")}</Label>
              <Select value={caseType} onValueChange={(value) => setCaseType(value || "lowercase")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowercase">{t("slug.lowercase")}</SelectItem>
                  <SelectItem value="uppercase">{t("slug.uppercase")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">{t("slug.maxLength")}</Label>
              <Input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                min={1}
                max={200}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={removeStopWords}
                  onCheckedChange={setRemoveStopWords}
                />
                <Label className="text-sm">{t("slug.removeStopWords")}</Label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={removeSpecialChars}
                onCheckedChange={setRemoveSpecialChars}
              />
              <Label className="text-sm">{t("slug.removeSpecialChars")}</Label>
            </div>
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <Label>{t("slug.output")}</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                {output}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-10 shrink-0"
                onClick={() => copyToClipboard(output)}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <Label>{t("slug.previewUrl")}</Label>
            <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground break-all">
              {previewUrl}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
