"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";

export function UrlEncoderDecoder() {
  const t = useTranslations();
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeType, setEncodeType] = useState<"component" | "uri">("component");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-process on input
    try {
      if (mode === "encode") {
        if (encodeType === "component") {
          setOutput(encodeURIComponent(e.target.value));
        } else {
          setOutput(encodeURI(e.target.value));
        }
      } else {
        setOutput(decodeURIComponent(e.target.value));
      }
    } catch {
      setOutput("");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("encoder.title")}</CardTitle>
        <CardDescription>{t("encoder.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <RadioGroup
            value={mode}
            onValueChange={(value: "encode" | "decode") => setMode(value)}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="encode" id="encode" />
              <Label htmlFor="encode">{t("encoder.encode")}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="decode" id="decode" />
              <Label htmlFor="decode">{t("encoder.decode")}</Label>
            </div>
          </RadioGroup>

          {mode === "encode" && (
            <RadioGroup
              value={encodeType}
              onValueChange={(value: "component" | "uri") => setEncodeType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="component" id="component" />
                <Label htmlFor="component" className="text-sm">
                  {t("encoder.encodeComponent")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="uri" id="uri" />
                <Label htmlFor="uri" className="text-sm">
                  {t("encoder.encodeUri")}
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("common.input")}</Label>
          <Textarea
            placeholder={t("encoder.inputPlaceholder")}
            value={input}
            onChange={handleInputChange}
            className="font-mono text-sm min-h-[100px]"
          />
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={swap}>
            <ArrowDownUp className="size-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{t("encoder.output")}</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(output)}
              disabled={!output}
            >
              <Copy className="size-4 mr-2" />
              {t("encoder.copy")}
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="font-mono text-sm min-h-[100px] bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  );
}
