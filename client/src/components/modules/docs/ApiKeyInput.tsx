"use client";

import { Key, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ApiKeyInputProps {
  apiKey: string;
  onKeyChange: (key: string) => void;
  onReset: () => void;
}

export function ApiKeyInput({
  apiKey,
  onKeyChange,
  onReset,
}: ApiKeyInputProps) {
  return (
    <div className="p-5 rounded-2xl border border-border">
      <div className="flex items-center gap-2 justify-between mb-3">
        <Label className="mb-0">API Key</Label>
        <Badge variant="success">Sandbox</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => onKeyChange(e)}
          icon={<Key className="text-primary" size={18} />}
          placeholder="Enter your api key"
        />
        <Button
          variant="outline"
          className="py-2 whitespace-nowrap"
          onClick={onReset}
        >
          <RotateCcw size={15} />
          Reset Default
        </Button>
      </div>
    </div>
  );
}
