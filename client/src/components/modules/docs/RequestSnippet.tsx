"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { cn } from "../../utils";
import { CodeHighlight } from "./CodeHighlight";
import { Endpoint } from "./CollectionAccordion";
import { SpreadText } from "../../ui/SpreadText";

type CodeLang = "curl" | "javascript" | "python";

const TEST_KEY = "sk_easeinv_test_2026_ab89cf";

interface RequestSnippetProps {
  endpoint: Endpoint;
  apiKey: string;
}

const getCodeSnippet = (endpoint: Endpoint, lang: CodeLang, key: string) => {
  const keyToUse = key || TEST_KEY;
  const headers = `-H "Authorization: Bearer ${keyToUse}" \\\n  -H "Content-Type: application/json"`;

  if (lang === "curl") {
    if (endpoint.method === "GET") {
      return `curl -X GET https://api.easeinv.com${endpoint.path} \\\n  -H "Authorization: Bearer ${keyToUse}"`;
    }
    return `curl -X POST https://api.easeinv.com${endpoint.path} \\\n  ${headers} \\\n  -d '${endpoint.defaultBody?.replace(/\n/g, "\n  ")}'`;
  }

  if (lang === "javascript") {
    if (endpoint.method === "GET") {
      return `fetch('https://api.easeinv.com${endpoint.path}', {
  headers: {
    'Authorization': 'Bearer ${keyToUse}'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`;
    }
    return `fetch('https://api.easeinv.com${endpoint.path}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${keyToUse}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${endpoint.defaultBody?.replace(/\n/g, "\n  ")})
})
  .then(res => res.json())
  .then(data => console.log(data));`;
  }

  if (lang === "python") {
    if (endpoint.method === "GET") {
      return `import requests

url = "https://api.easeinv.com${endpoint.path}"
headers = {
    "Authorization": "Bearer ${keyToUse}"
}

response = requests.get(url, headers=headers)
print(response.json())`;
    }
    return `import requests

url = "https://api.easeinv.com${endpoint.path}"
headers = {
    "Authorization": "Bearer ${keyToUse}",
    "Content-Type": "application/json"
}
payload = ${endpoint.defaultBody}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`;
  }

  return "";
};

export function RequestSnippet({ endpoint, apiKey }: RequestSnippetProps) {
  const [codeLang, setCodeLang] = useState<CodeLang>("curl");
  const [isCopied, setIsCopied] = useState(false);

  const codeSnippet = getCodeSnippet(endpoint, codeLang, apiKey);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] overflow-hidden shadow-sm">
      <div
        className={cn(
          "flex items-center justify-between",
          "border-b border-slate-800 bg-slate-950/40 px-4 py-2.5",
        )}
      >
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <SpreadText className="text-xs text-slate-200">
            Request Snippet
          </SpreadText>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {(["curl", "javascript", "python"] as CodeLang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setCodeLang(lang)}
                className={cn(
                  "text-[10px] px-2.5 py-1 rounded font-semibold transition-all capitalize cursor-pointer",
                  codeLang === lang
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200",
                )}
              >
                {lang === "javascript" ? "JS fetch" : lang}
              </button>
            ))}
          </div>
          <button
            onClick={() => copyToClipboard(codeSnippet)}
            className={cn(
              "text-slate-400 p-1.5 bg-slate-900 border border-slate-800 rounded-lg",
              "hover:text-slate-200 transition-all cursor-pointer",
            )}
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <CodeHighlight
        code={codeSnippet}
        language={
          codeLang === "javascript"
            ? "javascript"
            : codeLang === "python"
              ? "python"
              : "bash"
        }
        customStyle={{
          border: "none",
          borderRadius: "0",
          backgroundColor: "transparent",
          padding: "1rem",
        }}
      />
    </div>
  );
}
