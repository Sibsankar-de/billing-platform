"use client";

import React from "react";
import { ChevronDown, Package, Users, Receipt, LucideIcon } from "lucide-react";
import { cn } from "../../utils";
import { SpreadText } from "../../ui/SpreadText";

export interface Endpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  name: string;
  description: string;
  collection: "products" | "customers" | "invoices";
  params?: { name: string; type: string; required: boolean; desc: string }[];
  defaultBody?: string;
  mockResponse: (body?: string) => object;
}

interface CollectionAccordionProps {
  endpoints: Endpoint[];
  activeEndpointId: string;
  onSelectEndpoint: (id: string) => void;
}

export function CollectionAccordion({
  endpoints,
  activeEndpointId,
  onSelectEndpoint,
}: CollectionAccordionProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    products: true,
    customers: true,
    invoices: true,
  });

  const toggle = (col: string) => {
    setExpanded((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const groups: {
    key: "products" | "customers" | "invoices";
    title: string;
    icon: LucideIcon;
  }[] = [
    { key: "products", title: "Products API", icon: Package },
    { key: "customers", title: "Customers API", icon: Users },
    { key: "invoices", title: "Invoices API", icon: Receipt },
  ];

  return (
    <div className="space-y-3">
      {groups.map((grp) => {
        const isOpen = expanded[grp.key];
        const groupEndpoints = endpoints.filter(
          (ep) => ep.collection === grp.key,
        );
        const Icon = grp.icon;

        return (
          <div
            key={grp.key}
            className={cn(
              "border border-slate-200/80 rounded-xl",
              "overflow-hidden bg-white shadow-sm transition-all",
            )}
          >
            <button
              onClick={() => toggle(grp.key)}
              className={cn(
                "w-full flex items-center justify-between p-3.5",
                "bg-slate-50/50 hover:bg-slate-50 transition-colors text-left",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-slate-500" />
                <SpreadText tracking="wide" className="text-xs text-slate-700">
                  {grp.title}
                </SpreadText>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-200",
                  isOpen && "transform rotate-180",
                )}
              />
            </button>

            {isOpen && (
              <div className="p-1.5 space-y-1 bg-white border-t border-slate-100">
                {groupEndpoints.map((ep) => {
                  const isSelected = activeEndpointId === ep.id;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => onSelectEndpoint(ep.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all",
                        isSelected
                          ? "bg-indigo-50/70 border-l-4 border-indigo-600 text-indigo-900 font-semibold"
                          : "hover:bg-slate-50 border-l-4 border-transparent text-slate-600 hover:text-slate-900",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase tracking-wider",
                            ep.method === "GET"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700",
                          )}
                        >
                          {ep.method}
                        </span>
                        <span className="text-xs font-mono text-slate-800">
                          {ep.path}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {ep.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
