"use client";

import React from "react";
import { SpreadText } from "../../ui/SpreadText";

interface Param {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

interface QueryParamTableProps {
  params?: Param[];
}

export function QueryParamTable({ params }: QueryParamTableProps) {
  if (!params || params.length === 0) {
    return (
      <div className="p-4 bg-slate-50 border border-border rounded-xl text-center">
        <span className="text-xs text-muted-foreground font-medium">
          No query parameters required for this endpoint.
        </span>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <div className="bg-slate-50 border-b border-border px-4 py-2">
        <SpreadText tracking="widest" className="text-[10px] text-muted-foreground">
          Query Parameters
        </SpreadText>
      </div>
      <div className="p-3 divide-y divide-slate-100">
        {params.map((p) => (
          <div key={p.name} className="py-2.5 flex items-start gap-4">
            <div className="w-1/3 flex flex-col font-mono">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {p.name}
                {p.required && (
                  <span
                    className="h-1.5 w-1.5 bg-rose-500 rounded-full"
                    title="Required"
                  />
                )}
              </span>
              <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                {p.type}
              </span>
            </div>
            <p className="w-2/3 text-xs text-slate-600 leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
