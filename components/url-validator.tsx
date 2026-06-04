"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ValidationResult {
  url: string;
  valid: boolean;
  warning: boolean;
  issues: string[];
}

export function UrlValidator() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ValidationResult[]>([]);

  const validateUrl = (url: string): ValidationResult => {
    const issues: string[] = [];
    let valid = true;
    let warning = false;

    try {
      const parsed = new URL(url);

      // Check protocol
      const supportedProtocols = ["http:", "https:", "ftp:", "ftps:", "file:"];
      if (!supportedProtocols.includes(parsed.protocol)) {
        issues.push(t("validator.unsupportedProtocol"));
        valid = false;
      }

      // Check port
      if (parsed.port) {
        const portNum = parseInt(parsed.port, 10);
        if (isNaN(portNum) || portNum < 0 || portNum > 65535) {
          issues.push(t("validator.invalidPort"));
          valid = false;
        }
      }

      // Check for credentials
      if (parsed.username || parsed.password) {
        issues.push(t("validator.hasCredentials"));
        warning = true;
      }

      // Check length
      if (url.length > 2048) {
        issues.push(t("validator.tooLong"));
        warning = true;
      }
    } catch {
      issues.push(t("validator.invalidFormat"));
      valid = false;
    }

    return { url, valid, warning, issues };
  };

  const handleValidate = () => {
    const urls = input
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const validationResults = urls.map(validateUrl);
    setResults(validationResults);
  };

  const validCount = results.filter((r) => r.valid && !r.warning).length;
  const invalidCount = results.filter((r) => !r.valid).length;
  const warningCount = results.filter((r) => r.valid && r.warning).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("validator.title")}</CardTitle>
        <CardDescription>{t("validator.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="validator-input">{t("common.enterUrls")}</Label>
          <Textarea
            id="validator-input"
            placeholder={t("validator.inputPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
          />
        </div>

        <Button onClick={handleValidate} disabled={!input.trim()}>
          {t("validator.validate")}
        </Button>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Badge variant="default" className="bg-green-500">
                {validCount} {t("validator.validCount")}
              </Badge>
              {invalidCount > 0 && (
                <Badge variant="destructive">
                  {invalidCount} {t("validator.invalidCount")}
                </Badge>
              )}
              {warningCount > 0 && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  {warningCount} {t("validator.warningCount")}
                </Badge>
              )}
            </div>

            <div className="border rounded-md">
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_minmax(0,1fr)] gap-4 p-3 bg-muted text-sm font-medium">
                <div>{t("validator.url")}</div>
                <div>{t("validator.status")}</div>
                <div>{t("validator.issues")}</div>
              </div>
              {results.map((result, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-3 border-t text-sm sm:grid sm:grid-cols-[1fr_auto_minmax(0,1fr)] sm:gap-4 sm:items-start"
                >
                  <div className="flex items-start gap-2 sm:contents">
                    <div className="shrink-0 sm:order-2">
                      {result.valid && !result.warning ? (
                        <CheckCircle className="size-5 text-green-500" />
                      ) : !result.valid ? (
                        <XCircle className="size-5 text-red-500" />
                      ) : (
                        <AlertCircle className="size-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="font-mono break-all min-w-0 sm:order-1">{result.url}</div>
                  </div>
                  <div className="text-muted-foreground break-words min-w-0 sm:order-3">
                    {result.issues.length > 0 ? result.issues.join(", ") : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
