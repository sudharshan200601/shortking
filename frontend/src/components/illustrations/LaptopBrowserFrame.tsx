import React from "react";
import Link from "next/link";

interface LaptopFrameProps {
  className?: string;
  totalUrls?: number;
  totalClicks?: number;
  activeUrls?: number;
}

export const LaptopBrowserFrame: React.FC<LaptopFrameProps> = ({
  className = "",
  totalUrls = 143,
  totalClicks = 12482,
  activeUrls = 28,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Hand-drawn Illustrated Laptop / Browser Window */}
      <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl shadow-[8px_8px_0px_#080808] overflow-hidden text-[#080808]">
        {/* Browser Top Window Bar */}
        <div className="bg-[#F8F7F1] border-b-2 border-[#080808] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E14942] border border-[#080808] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F5D84A] border border-[#080808] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#2B9348] border border-[#080808] inline-block" />
          </div>

          {/* Browser Address Bar with hand-drawn ink border */}
          <div className="flex-1 max-w-md mx-3 px-3 py-1 bg-[#FFFFFF] border border-[#080808] rounded-lg text-xs font-mono text-[#080808] flex items-center justify-between shadow-[1px_1px_0px_#080808]">
            <span className="flex items-center gap-1.5 truncate">
              <span className="text-[#2B9348]">🔒</span>
              <span className="font-semibold">shortking.app/dashboard</span>
            </span>
            <span className="text-[10px] text-[#8898A6] hidden sm:inline">200 OK</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#080808]">
            <span className="w-2 h-2 rounded-full bg-[#2B9348] animate-ping" />
            <span className="hidden sm:inline">Live</span>
          </div>
        </div>

        {/* Dashboard Content Inside Laptop */}
        <div className="p-5 sm:p-7 space-y-6 bg-[#EDF6FC]/50">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b-2 border-[#080808]/15">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F5D84A] border border-[#080808] text-[10px] font-bold uppercase tracking-wider text-[#080808] mb-1">
                👑 Link HQ
              </div>
              <h4 className="text-xl font-black text-[#080808] tracking-tight">Active Operations</h4>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-bold bg-[#F8F7F1] hover:bg-[#FFFFFF] border-2 border-[#080808] px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_#080808] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              Open Full Console →
            </Link>
          </div>

          {/* Aggregate Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-3.5 shadow-[3px_3px_0px_#080808]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#556270]">
                TOTAL URLS
              </span>
              <p className="text-2xl font-black font-mono text-[#080808] mt-1">{totalUrls}</p>
              <span className="text-[10px] font-semibold text-[#2B9348] mt-0.5 inline-block">
                ↑ 14 this week
              </span>
            </div>

            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-3.5 shadow-[3px_3px_0px_#080808]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#556270]">
                TOTAL CLICKS
              </span>
              <p className="text-2xl font-black font-mono text-[#080808] mt-1">
                {totalClicks.toLocaleString()}
              </p>
              <span className="text-[10px] font-semibold text-[#2B9348] mt-0.5 inline-block">
                ↑ 28% conversion
              </span>
            </div>

            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-3.5 shadow-[3px_3px_0px_#080808]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#556270]">
                ACTIVE LINKS
              </span>
              <p className="text-2xl font-black font-mono text-[#080808] mt-1">{activeUrls}</p>
              <span className="text-[10px] font-semibold text-[#080808] bg-[#F5D84A] px-1.5 py-0.5 rounded border border-[#080808] mt-0.5 inline-block">
                Zero 404s
              </span>
            </div>
          </div>

          {/* Recent Links Table Preview */}
          <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl shadow-[3px_3px_0px_#080808] overflow-hidden">
            <div className="bg-[#F8F7F1] px-4 py-2 border-b-2 border-[#080808] flex items-center justify-between text-xs font-bold text-[#080808]">
              <span>RECENT SHORT LINKS</span>
              <span className="text-[10px] font-mono text-[#556270]">Real-time resolution</span>
            </div>
            <div className="divide-y divide-[#080808]/10 text-xs">
              {[
                { slug: "demo", clicks: 4891, orig: "https://shortking.app/interactive-walkthrough" },
                { slug: "github", clicks: 3120, orig: "https://github.com/Mithun-069/ShortKing" },
                { slug: "project", clicks: 2410, orig: "https://figma.com/file/shortking-design-system" },
                { slug: "docs", clicks: 2061, orig: "https://shortking.app/docs/v1/rest-endpoints" },
              ].map((item) => (
                <div key={item.slug} className="px-4 py-2.5 flex items-center justify-between hover:bg-[#F8F7F1]/80 transition-colors">
                  <div className="truncate flex-1 pr-3">
                    <span className="font-mono font-bold text-[#080808]">shortking.app/{item.slug}</span>
                    <p className="text-[11px] text-[#556270] truncate">{item.orig}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#F5D84A] text-[#080808] border border-[#080808] rounded text-[11px] font-mono font-bold shadow-[1px_1px_0px_#080808]">
                      {item.clicks.toLocaleString()} clicks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Laptop Bottom Lip / Trackpad Frame Stand */}
        <div className="bg-[#F8F7F1] border-t-2 border-[#080808] py-2 flex justify-center">
          <div className="w-20 h-1.5 rounded-full bg-[#080808]/20" />
        </div>
      </div>

      {/* Hand-drawn annotation sticker pointing to dashboard */}
      <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#F5D84A] border-2 border-[#080808] px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#080808] -rotate-3 select-none">
        <span className="text-xs font-hand font-bold text-[#080808]">
          ✨ No tracking cookies or invasive scripts!
        </span>
      </div>
    </div>
  );
};
