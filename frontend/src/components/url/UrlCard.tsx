import React from "react";
import { Card } from "../ui/Card";

interface UrlCardProps {
  shortUrl?: string;
  originalUrl?: string;
  clickCount?: number;
}

export const UrlCard: React.FC<UrlCardProps> = ({
  shortUrl = "shortking.app/demo",
  originalUrl = "https://example.com/very/long/url",
  clickCount = 0,
}) => {
  return (
    <Card variant="white" className="hover:translate-x-[-1px] transition-transform">
      <div className="flex justify-between items-start gap-3">
        <div className="truncate">
          <h4 className="text-[#080808] font-mono font-black text-sm">{shortUrl}</h4>
          <p className="text-xs text-[#556270] truncate max-w-md font-mono mt-0.5">
            {originalUrl}
          </p>
        </div>
        <span className="bg-[#F5D84A] px-2 py-0.5 rounded text-xs font-mono font-bold border border-[#080808]">
          {clickCount}
        </span>
      </div>
    </Card>
  );
};
