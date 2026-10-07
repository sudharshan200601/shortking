"use client";

import React from "react";
import { CopyButton } from "../url/CopyButton";
import { QRCodeButton } from "../url/QRCodeButton";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { HandDrawnStar } from "../illustrations/HandDrawnDoodles";
import type { CreateUrlResponse } from "@shortking/shared";

interface ResultCardProps {
  result: CreateUrlResponse;
  onReset: () => void;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onReset,
  className = "",
}) => {
  const origLength = result.originalUrl.length;
  const shortLength = result.shortUrl.length;
  const savings = Math.max(0, Math.round(((origLength - shortLength) / origLength) * 100));

  return (
    <div
      className={`w-full bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#080808] text-[#080808] relative text-left animate-in fade-in zoom-in-95 duration-200 ${className}`}
    >
      {/* Decorative top badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#080808] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#F5D84A] border-1.5 border-[#080808] flex items-center justify-center text-xs font-black shadow-[1px_1px_0px_#080808]">
            ✂
          </span>
          <span className="text-xs uppercase tracking-widest font-black text-[#080808]">
            YOUR SHORT LINK
          </span>
          <Badge variant="yellow" className="ml-1 text-[11px]">
            Haircut Complete
          </Badge>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-bold text-[#080808] hover:text-[#556270] underline decoration-[#080808] decoration-2 underline-offset-4 cursor-pointer text-left sm:text-right"
        >
          ← Shorten another URL
        </button>
      </div>

      {/* Main Short Link Presentation */}
      <div className="my-6 p-4 sm:p-5 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[3px_3px_0px_#080808]">
        <div className="w-full truncate">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#556270] block mb-1">
            Short URL
          </span>
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl sm:text-2xl font-black text-[#080808] hover:text-[#080808] hover:underline decoration-[#F5D84A] decoration-4 font-mono tracking-tight break-all"
          >
            {result.shortUrl}
          </a>
          <p className="text-xs text-[#556270] truncate mt-1.5 font-mono max-w-lg">
            ↳ {result.originalUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start md:justify-end">
          <CopyButton text={result.shortUrl} size="md" variant="primary" />
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" size="md" className="font-bold flex items-center gap-1.5">
              <span>Open</span>
              <span>↗</span>
            </Button>
          </a>
          <QRCodeButton url={result.shortUrl} shortCode={result.shortCode} size="md" />
        </div>
      </div>

      {/* Compression Metric & Meta Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
        <div className="p-3 bg-[#EDF6FC] border border-[#080808] rounded-lg">
          <span className="text-[#556270] block text-[10px] uppercase font-bold">Characters Saved</span>
          <span className="font-black text-sm text-[#080808]">
            {origLength} → {shortLength} chars ({savings}% smaller)
          </span>
        </div>

        <div className="p-3 bg-[#EDF6FC] border border-[#080808] rounded-lg">
          <span className="text-[#556270] block text-[10px] uppercase font-bold">Short Code</span>
          <span className="font-black text-sm text-[#080808]">{result.shortCode}</span>
        </div>

        <div className="p-3 bg-[#EDF6FC] border border-[#080808] rounded-lg">
          <span className="text-[#556270] block text-[10px] uppercase font-bold">Status</span>
          <span className="font-black text-sm text-[#2B9348] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2B9348] inline-block" />
            Active & Ready to share
          </span>
        </div>
      </div>

      {result.expiresAt && (
        <div className="mt-3 text-xs text-[#E14942] font-semibold bg-[#FADBD8] p-2 rounded-lg border border-[#080808]">
          ⏳ Automatic Sunset: {new Date(result.expiresAt).toLocaleString()}
        </div>
      )}

      {/* Decorative hand-drawn stamp note */}
      <div className="absolute -bottom-3 -right-2 bg-[#F5D84A] border-2 border-[#080808] px-3 py-1 rounded-lg shadow-[2px_2px_0px_#080808] rotate-2 hidden sm:flex items-center gap-1">
        <HandDrawnStar size={14} />
        <span className="text-[11px] font-hand font-bold text-[#080808]">
          URL Haircut Complete!
        </span>
      </div>
    </div>
  );
};
