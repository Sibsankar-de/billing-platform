"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeHighlightProps {
  code: string;
  language: string;
  className?: string;
  customStyle?: React.CSSProperties;
}

export function CodeHighlight({
  code,
  language,
  className,
  customStyle,
}: CodeHighlightProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      className={className}
      customStyle={{
        margin: 0,
        borderRadius: "0.75rem",
        fontSize: "0.75rem",
        backgroundColor: "#0f172a", // slate-900
        border: "1px solid #1e293b",
        lineHeight: "1.5",
        ...customStyle,
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

