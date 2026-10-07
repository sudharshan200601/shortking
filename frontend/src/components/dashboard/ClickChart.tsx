"use client";

import React from "react";
import type { ClicksOverTimeItem } from "@shortking/shared";

interface ClickChartProps {
  data: ClicksOverTimeItem[];
  title?: string;
  className?: string;
}

export const ClickChart: React.FC<ClickChartProps> = ({
  data,
  title = "Clicks Activity Timeline",
  className = "",
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-6 shadow-[4px_4px_0px_#080808] ${className}`}>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#556270] mb-4">
          {title}
        </h3>
        <div className="h-52 flex flex-col items-center justify-center text-center text-[#556270] border-2 border-dashed border-[#080808]/30 rounded-xl bg-[#F8F7F1]">
          <span className="text-3xl mb-2">📉</span>
          <p className="text-xs font-semibold">No click events recorded for this timeframe yet.</p>
        </div>
      </div>
    );
  }

  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);

  return (
    <div className={`bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#080808] ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-3 border-b-2 border-[#080808]">
        <div>
          <h3 className="text-base font-black text-[#080808] tracking-tight">{title}</h3>
          <span className="text-[11px] font-mono text-[#556270]">Aggregated 7-day click frequency</span>
        </div>
        <div className="bg-[#F5D84A] border border-[#080808] px-2.5 py-1 rounded-md shadow-[1px_1px_0px_#080808] text-xs font-mono font-bold text-[#080808]">
          Peak: {maxClicks} click{maxClicks > 1 ? "s" : ""}
        </div>
      </div>

      <div className="h-56 flex items-end gap-2 sm:gap-4 pt-6 pb-2 border-b-2 border-[#080808]">
        {data.map((item) => {
          const heightPercent = Math.max(12, Math.round((item.clicks / maxClicks) * 100));
          return (
            <div
              key={item.date}
              className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-[#080808] font-bold bg-[#F5D84A] px-1 rounded border border-[#080808]">
                {item.clicks}
              </div>

              <div
                style={{ height: `${heightPercent}%` }}
                className="w-full max-w-[36px] bg-[#F5D84A] hover:bg-[#ECCB2B] border-2 border-[#080808] rounded-t-lg transition-all shadow-[2px_0px_0px_#080808] group-hover:translate-y-[-2px]"
              />

              <span className="text-[10px] font-mono font-bold text-[#080808] truncate w-full text-center">
                {item.date.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
