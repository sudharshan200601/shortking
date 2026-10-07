import React from "react";

interface DashboardStatsProps {
  totalUrls: number;
  totalClicks: number;
  activeUrls: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalUrls,
  totalClicks,
  activeUrls,
}) => {
  const avgClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Links */}
      <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#556270]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Links</span>
          <span className="text-lg">🔗</span>
        </div>
        <p className="text-3xl font-black text-[#080808] mt-3 font-mono">{totalUrls}</p>
        <span className="text-[11px] font-semibold text-[#556270] mt-1">Shortened endpoints</span>
      </div>

      {/* Total Clicks */}
      <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#556270]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Clicks</span>
          <span className="text-lg">⚡</span>
        </div>
        <p className="text-3xl font-black text-[#080808] mt-3 font-mono bg-[#F5D84A] px-2 py-0.5 rounded-lg border border-[#080808] w-fit shadow-[1.5px_1.5px_0px_#080808]">
          {totalClicks.toLocaleString()}
        </p>
        <span className="text-[11px] font-semibold text-[#2B9348] mt-1">Global impressions</span>
      </div>

      {/* Active Links */}
      <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#556270]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Active Links</span>
          <span className="text-lg">🟢</span>
        </div>
        <p className="text-3xl font-black text-[#080808] mt-3 font-mono">{activeUrls}</p>
        <span className="text-[11px] font-semibold text-[#2B9348] mt-1">Resolving live traffic</span>
      </div>

      {/* Avg Clicks / Link */}
      <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#556270]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Avg Clicks / Link</span>
          <span className="text-lg">📊</span>
        </div>
        <p className="text-3xl font-black text-[#080808] mt-3 font-mono">{avgClicks}</p>
        <span className="text-[11px] font-semibold text-[#556270] mt-1">Performance index</span>
      </div>
    </div>
  );
};
