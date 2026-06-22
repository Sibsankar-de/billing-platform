import type { MDXComponents } from "mdx/types";
import React from "react";
import {
  Info,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./components/modules/docs/CopyButton";
import { cn } from "./components/utils";

const alertConfigs = {
  NOTE: {
    bg: "bg-blue-50/50",
    border: "border-l-4 border-blue-500",
    text: "text-blue-900",
    icon: Info,
    titleColor: "text-blue-800",
  },
  TIP: {
    bg: "bg-emerald-50/50",
    border: "border-l-4 border-emerald-500",
    text: "text-emerald-900",
    icon: Sparkles,
    titleColor: "text-emerald-800",
  },
  IMPORTANT: {
    bg: "bg-purple-50/50",
    border: "border-l-4 border-purple-500",
    text: "text-purple-900",
    icon: AlertCircle,
    titleColor: "text-purple-800",
  },
  WARNING: {
    bg: "bg-amber-50/50",
    border: "border-l-4 border-amber-500",
    text: "text-amber-900",
    icon: AlertTriangle,
    titleColor: "text-amber-800",
  },
  CAUTION: {
    bg: "bg-rose-50/50",
    border: "border-l-4 border-rose-500",
    text: "text-rose-900",
    icon: ShieldAlert,
    titleColor: "text-rose-800",
  },
};

// Helper function to recursively parse nodes to check for alert prefix [!NOTE], [!WARNING], etc.
function parseAlert(
  nodes: React.ReactNode,
): { type: string; cleanNodes: React.ReactNode } | null {
  if (!nodes) return null;

  // Case 1: nodes is a string
  if (typeof nodes === "string") {
    const match = nodes.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
    if (match) {
      return {
        type: match[1].toUpperCase(),
        cleanNodes: nodes.slice(match[0].length),
      };
    }
    return null;
  }

  // Case 2: nodes is an array
  if (Array.isArray(nodes)) {
    let targetIdx = -1;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (typeof n === "string" && n.trim() === "") {
        continue;
      }
      targetIdx = i;
      break;
    }

    if (targetIdx !== -1) {
      const result = parseAlert(nodes[targetIdx]);
      if (result) {
        const cleanList = nodes.map((n, idx) => {
          const node = idx === targetIdx ? result.cleanNodes : n;
          if (React.isValidElement(node)) {
            return React.cloneElement(node, { key: `alert-child-${idx}` });
          }
          return node;
        });
        return {
          type: result.type,
          cleanNodes: cleanList,
        };
      }
    }
    return null;
  }

  // Case 3: nodes is a React element
  if (React.isValidElement(nodes)) {
    const element = nodes as React.ReactElement<any>;
    const childResult = parseAlert(element.props.children);
    if (childResult) {
      return {
        type: childResult.type,
        cleanNodes: React.cloneElement(element, {}, childResult.cleanNodes),
      };
    }
  }

  return null;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className={cn(
          "text-3xl font-extrabold text-gray-900",
          "tracking-tight mt-8 mb-4 border-b border-border pb-2",
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-base text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline font-medium transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-base">{children}</li>,
    blockquote: ({ children }) => {
      const alert = parseAlert(children);
      if (alert) {
        const { type, cleanNodes } = alert;
        const config =
          alertConfigs[type as keyof typeof alertConfigs] || alertConfigs.NOTE;
        const Icon = config.icon;

        return (
          <div
            className={cn(
              `p-4 rounded-r-xl my-6 border border-border border-l-0 shadow-xs`,
              config.bg,
              config.border,
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn(`w-5 h-5 shrink-0`, config.titleColor)} />
              <span
                className={cn(
                  `text-xs font-bold uppercase tracking-wider`,
                  config.titleColor,
                )}
              >
                {type}
              </span>
            </div>
            <div className={cn(`text-sm leading-relaxed`, config.text)}>
              {cleanNodes}
            </div>
          </div>
        );
      }

      return (
        <blockquote
          className={cn(
            "pl-4 py-2 pr-2 bg-primary/5 text-gray-700 italic",
            "border-l-4 border-primary/40 rounded-r-lg my-4",
          )}
        >
          {children}
        </blockquote>
      );
    },
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className={cn(
              "bg-gray-100 text-red-600 px-1.5 py-0.5 rounded",
              "text-sm font-mono font-medium",
            )}
          >
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      return (
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "inherit",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
    pre: ({ children }) => {
      let codeText = "";
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<any>;
          if (element.props && element.props.children) {
            codeText = String(element.props.children);
          }
        }
      });

      return (
        <pre
          className={cn(
            "bg-slate-800 rounded-xl shadow-md relative group",
            "p-4 my-4 overflow-x-auto border border-slate-800",
          )}
        >
          {codeText && (
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100">
              <CopyButton text={codeText} />
            </div>
          )}
          {children}
        </pre>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
        {children}
      </td>
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  };
}
