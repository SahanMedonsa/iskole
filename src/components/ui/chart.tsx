"use client";
import React, { isValidElement } from "react";
import { ResponsiveContainer } from "recharts";

export type ChartConfig = Record<string, { label: string; color: string }>;

export const ChartContainer = ({ children, config, className = "" }: { children: React.ReactNode; config: ChartConfig; className?: string }) => (
  <div className={`rounded-xl bg-white shadow-lg p-6 ${className}`}>
    {isValidElement(children) ? (
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    ) : (
      children
    )}
  </div>
);

export const ChartTooltip = ({ content }: { content: React.ReactNode }) => (
  <>{content}</>
);

export const ChartTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white p-3 rounded shadow text-sm border border-gray-200">
      <div className="font-semibold mb-1">{label}</div>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: entry.color }} />
          <span>{entry.name}:</span>
          <span className="font-bold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ChartLegend = ({ config }: { config: ChartConfig }) => (
  <div className="flex gap-6 mt-4 items-center justify-center">
    {Object.entries(config).map(([key, { label, color }]) => (
      <div key={key} className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }}></span>
        <span className="text-sm">{label}</span>
      </div>
    ))}
  </div>
);

export const ChartLegendContent = ChartLegend; 