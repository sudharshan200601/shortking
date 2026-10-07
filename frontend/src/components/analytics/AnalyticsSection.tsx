"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobeConnections } from "../illustrations/GlobeConnections";
import { ClickChart } from "../dashboard/ClickChart";
import { Button } from "../ui/Button";

export const AnalyticsSection: React.FC = () => {
  const [demoClicks] = useState([
    { date: "2026-09-24", clicks: 38 },
    { date: "2026-09-25", clicks: 74 },
    { date: "2026-09-26", clicks: 112 },
    { date: "2026-09-27", clicks: 189 },
    { date: "2026-09-28", clicks: 145 },
    { date: "2026-09-29", clicks: 230 },
    { date: "2026-09-30", clicks: 310 },
  ]);

  return (
    <section id="analytics" className="px-4 sm:px-6 py-20 max-w-6xl mx-auto text-[#080808]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story + Globe + Real-time Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
            <span> Real-Time Traffic</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808] leading-tight">
            Know where your links travel.
          </h2>

          <p className="text-sm sm:text-base text-[#4B5864] leading-relaxed">
            Gain immediate visibility into visitor device habits, operating systems, browsers, and
            top referral sources without putting a single tracking pixel on their machines.
          </p>

          {/* Illustrated Globe & High-Level Breakdown Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <GlobeConnections className="shrink-0" />

            <div className="space-y-3 w-full">
              {/* Device Metric Box */}
              <div className="p-3.5 bg-[#FFFFFF] border-2 border-[#080808] rounded-xl shadow-[3px_3px_0px_#080808]">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#556270]">
                  <span>DEVICE BREAKDOWN</span>
                  <span className="text-[#080808]">68% / 32%</span>
                </div>
                <div className="w-full bg-[#EDF6FC] h-3 rounded-full mt-2 border border-[#080808] overflow-hidden flex">
                  <div className="bg-[#F5D84A] h-full" style={{ width: "68%" }} />
                  <div className="bg-[#080808] h-full" style={{ width: "32%" }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono mt-1 font-semibold text-[#080808]">
                  <span>Desktop (68%)</span>
                  <span>Mobile (32%)</span>
                </div>
              </div>

              {/* Referrer Metric Box */}
              <div className="p-3.5 bg-[#FFFFFF] border-2 border-[#080808] rounded-xl shadow-[3px_3px_0px_#080808] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#556270] block">
                    Top Traffic Referrer
                  </span>
                  <span className="font-mono text-base font-black text-[#080808]">
                    github.com
                  </span>
                </div>
                <span className="bg-[#C4EBC8] text-[#080808] border border-[#080808] px-2 py-0.5 rounded text-xs font-mono font-bold">
                  4,210 clicks
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/register">
              <Button variant="primary" size="lg" className="font-black">
                Unlock Complete Analytics Console →
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Click Chart Component */}
        <div className="lg:col-span-6">
          <ClickChart
            data={demoClicks}
            title="Global Link Activity: shortking.app/launch"
          />
        </div>
      </div>
    </section>
  );
};
