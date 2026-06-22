"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../../ui/Button";
import { cn } from "@/components/utils";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <Button
      variant="none"
      onClick={handleCopy}
      className={cn(
        "p-1.5 border border-slate-800 bg-slate-900/80 rounded-md",
        "hover:bg-slate-800 text-slate-400 hover:text-slate-100",
      )}
      tooltip={copied ? "Copied!" : "Copy code"}
      aria-label="Copy code snippet"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
}
