import React from "react";
import Link from "next/link";
import { CopyButton } from "../url/CopyButton";
import type { ShortUrl } from "@shortking/shared";

interface RecentUrlsProps {
  urls: ShortUrl[];
  domain?: string;
}

export const RecentUrls: React.FC<RecentUrlsProps> = ({
  urls,
  domain = process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN || "http://localhost:3000",
}) => {
  const cleanDomain = domain.replace(/\/$/, "");
  const recent = urls.slice(0, 5);

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-6 shadow-[4px_4px_0px_#080808] space-y-4 text-[#080808]">
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#080808]">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#080808]">
          Recent Activity
        </h3>
        <span className="text-[10px] font-mono font-bold bg-[#F5D84A] px-2 py-0.5 rounded border border-[#080808]">
          {urls.length} total
        </span>
      </div>

      {recent.length === 0 ? (
        <p className="text-xs text-[#556270] py-4 text-center">No shortened links yet.</p>
      ) : (
        <div className="space-y-3">
          {recent.map((url) => {
            const fullShort = `${cleanDomain}/${url.customAlias || url.shortCode}`;
            return (
              <div
                key={url.id}
                className="p-3 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl flex items-center justify-between gap-2 shadow-[2px_2px_0px_#080808] hover:translate-x-[-1px] transition-transform"
              >
                <div className="truncate flex-1 pr-2">
                  <Link
                    href={`/dashboard/${url.id}`}
                    className="text-xs font-mono font-black text-[#080808] hover:underline decoration-[#F5D84A] decoration-2 truncate block"
                  >
                    /{url.customAlias || url.shortCode}
                  </Link>
                  <p className="text-[11px] font-mono text-[#556270] truncate mt-0.5">
                    {url.originalUrl}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#080808] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#080808]">
                    {url.clickCount}
                  </span>
                  <CopyButton text={fullShort} size="sm" variant="outline" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
