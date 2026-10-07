"use client";

import React from "react";
import { HandDrawnStar } from "../illustrations/HandDrawnDoodles";

export const HowItWorks: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-20 bg-[#EDF6FC] border-t-3 border-b-3 border-[#080808] text-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
            <span> Simple 3-Step Flow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808]">
            How ShortKing Works
          </h2>
          <p className="text-sm sm:text-lg text-[#4B5864]">
            Three seconds is all it takes to turn link chaos into streamlined simplicity.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* STEP 01 */}
          <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#080808] flex flex-col justify-between relative group hover:translate-y-[-2px] transition-transform">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#080808] bg-[#F5D84A] px-3 py-1 rounded-xl border-2 border-[#080808] shadow-[2.5px_2.5px_0px_#080808]">
                  01
                </span>
                <span className="text-xs font-mono font-bold uppercase text-[#556270]">
                  Input
                </span>
              </div>

              {/* Step 1 Graphic: Clipboard & URL input */}
              <div className="h-32 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                <div className="w-full bg-[#FFFFFF] border border-[#080808] rounded-lg p-2.5 shadow-[1.5px_1.5px_0px_#080808] flex items-center gap-2">
                  <span className="text-sm"></span>
                  <span className="font-mono text-[11px] text-[#556270] truncate">
                    https://long.site/path?id=123
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F5D84A] text-[10px] font-hand font-bold px-2 py-0.5 rounded border border-[#080808]">
                  Paste here!
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tight text-[#080808]">PASTE</h3>
              <p className="text-sm text-[#4B5864] leading-relaxed">
                Drop in your long, unwieldy destination link. Add an optional custom alias or sunset
                date if needed.
              </p>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#080808] flex flex-col justify-between relative group hover:translate-y-[-2px] transition-transform">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#080808] bg-[#F5D84A] px-3 py-1 rounded-xl border-2 border-[#080808] shadow-[2.5px_2.5px_0px_#080808]">
                  02
                </span>
                <span className="text-xs font-mono font-bold uppercase text-[#556270]">
                  Process
                </span>
              </div>

              {/* Step 2 Graphic: Scissors Cutting */}
              <div className="h-32 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-scissors inline-block">✂️</span>
                  <div className="border-b-2 border-dashed border-[#080808] w-20" />
                  <HandDrawnStar size={22} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F5D84A] text-[10px] font-hand font-bold px-2 py-0.5 rounded border border-[#080808]">
                  Trimming...
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tight text-[#080808]">SHORTEN</h3>
              <p className="text-sm text-[#4B5864] leading-relaxed">
                ShortKing shears the bloated fat, generates a collision-resistant short code, and
                indexes it for sub-millisecond redirect speed.
              </p>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#080808] flex flex-col justify-between relative group hover:translate-y-[-2px] transition-transform">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#080808] bg-[#F5D84A] px-3 py-1 rounded-xl border-2 border-[#080808] shadow-[2.5px_2.5px_0px_#080808]">
                  03
                </span>
                <span className="text-xs font-mono font-bold uppercase text-[#556270]">
                  Distribute
                </span>
              </div>

              {/* Step 3 Graphic: Flying Short Link */}
              <div className="h-32 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                <div className="flex items-center gap-2">
                  <div className="bg-[#F5D84A] border border-[#080808] px-2.5 py-1 rounded-lg text-xs font-mono font-bold shadow-[1px_1px_0px_#080808]">
                    shortking.app/go
                  </div>
                  <span className="text-2xl animate-plane-glide inline-block">✈️</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F5D84A] text-[10px] font-hand font-bold px-2 py-0.5 rounded border border-[#080808]">
                  Ready to fly!
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tight text-[#080808]">SHARE</h3>
              <p className="text-sm text-[#4B5864] leading-relaxed">
                One click to copy your short link, download high-res QR codes, or track real-time
                clicks from your privacy-first console.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
