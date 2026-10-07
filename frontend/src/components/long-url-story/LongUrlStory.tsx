"use client";

import React from "react";
import { UrlLuggageCharacter } from "../illustrations/UrlLuggageCharacter";
import { HandDrawnArrow, HandDrawnStar } from "../illustrations/HandDrawnDoodles";

export const LongUrlStory: React.FC = () => {
  return (
    <section id="suitcase-section" className="px-4 sm:px-6 py-20 bg-[#F8F7F1] border-t-3 border-b-3 border-[#080808] text-[#080808] relative overflow-hidden">
      {/* --- HAND-DRAWN DECORATIVE STARS & SPARKLE DOODLES --- */}
      {/* 1. Existing reference star (Top-Right) — Preserved exactly! */}
      <div className="absolute top-10 right-10 pointer-events-none select-none hidden md:block">
        <HandDrawnStar size={26} />
      </div>

      {/* 2. Existing reference star (Bottom-Left) — Preserved exactly! */}
      <div className="absolute bottom-8 left-12 pointer-events-none select-none hidden md:block">
        <HandDrawnStar size={20} />
      </div>

      {/* 3. Upper-Left: Playful 5-point cartoon star */}
      <div className="absolute top-10 left-5 sm:left-12 pointer-events-none select-none animate-star-pulse-a">
        <HandDrawnStar size={22} variant="star-5" rotate={-8} />
      </div>

      {/* 4. Upper-Left: Tiny diamond sparkle (desktop only) */}
      <div className="absolute top-26 left-20 xl:left-28 pointer-events-none select-none hidden lg:block">
        <HandDrawnStar size={13} variant="tiny-sparkle" rotate={12} />
      </div>

      {/* 5. Upper Center-Left: Delicate cross glint (wide desktop only) */}
      <div className="absolute top-5 left-[22%] pointer-events-none select-none hidden xl:block">
        <HandDrawnStar size={14} variant="cross-spark" rotate={6} />
      </div>

      {/* 6. Upper Center-Right: Irregular elongated sparkle (wide desktop only) */}
      <div className="absolute top-5 right-[24%] pointer-events-none select-none hidden xl:block">
        <HandDrawnStar size={14} variant="irregular-sparkle" rotate={-10} />
      </div>

      {/* 7. Upper-Right: Radiating burst spark (desktop only) */}
      <div className="absolute top-28 right-20 xl:right-28 pointer-events-none select-none hidden lg:block animate-star-pulse-b">
        <HandDrawnStar size={16} variant="burst" rotate={14} />
      </div>

      {/* 8. Upper-Right: Tiny cross glint near outer margin */}
      <div className="absolute top-40 right-6 sm:right-8 pointer-events-none select-none hidden lg:block">
        <HandDrawnStar size={12} variant="cross-spark" rotate={-5} />
      </div>

      {/* 9. Mid-Left: Dynamic irregular sparkle in outer whitespace */}
      <div className="absolute top-[46%] left-3 sm:left-8 pointer-events-none select-none animate-star-pulse-c">
        <HandDrawnStar size={20} variant="irregular-sparkle" rotate={10} />
      </div>

      {/* 10. Mid-Left: Tiny sparkle above pull line */}
      <div className="absolute top-[34%] left-16 sm:left-28 pointer-events-none select-none hidden lg:block">
        <HandDrawnStar size={13} variant="tiny-sparkle" rotate={-8} />
      </div>

      {/* 11. Mid-Right: Playful 5-point star beside URL cards */}
      <div className="absolute top-[42%] right-3 sm:right-8 pointer-events-none select-none animate-star-pulse-a">
        <HandDrawnStar size={20} variant="star-5" rotate={14} />
      </div>

      {/* 12. Mid-Right: Tiny sparkle below monster card (desktop only) */}
      <div className="absolute top-[56%] right-12 sm:right-20 pointer-events-none select-none hidden lg:block">
        <HandDrawnStar size={14} variant="tiny-sparkle" rotate={-12} />
      </div>

      {/* 13. Lower-Left: Radiating burst spark */}
      <div className="absolute bottom-24 left-4 sm:left-12 pointer-events-none select-none hidden sm:block">
        <HandDrawnStar size={15} variant="burst" rotate={8} />
      </div>

      {/* 14. Lower-Left: Tiny cross glint */}
      <div className="absolute bottom-6 left-28 sm:left-40 pointer-events-none select-none hidden lg:block">
        <HandDrawnStar size={12} variant="cross-spark" rotate={-6} />
      </div>

      {/* 15. Lower-Right: Classic 4-point yellow sparkle */}
      <div className="absolute bottom-8 right-6 sm:right-14 pointer-events-none select-none animate-star-pulse-b">
        <HandDrawnStar size={24} variant="sparkle-4" rotate={15} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D84A] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
            <span></span>
            <span>The Bloated Link Crisis</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808]">
            Some URLs need a suitcase.
          </h2>

          <p className="text-sm sm:text-lg text-[#4B5864] leading-relaxed">
            Analytics UTM tags, session hashes, referrer parameters, and affiliate IDs turn what
            should be a simple link into a 300-character wall of text that looks terrifying to
            click.
          </p>
        </div>

        {/* Visual Story Display */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Original Hand-Drawn Character Struggling With Suitcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
            <UrlLuggageCharacter className="w-full max-w-md hover:scale-102 transition-transform" />
            <span className="font-hand font-bold text-sm text-[#080808] mt-2 bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#080808] shadow-[1.5px_1.5px_0px_#080808]">
              &quot;Can someone please hold my query parameters?!&quot; 
            </span>
          </div>

          {/* Right: The Transformation Comparison */}
          <div className="lg:col-span-6 space-y-6">
            {/* The Unwieldy Monster URL Card */}
            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#080808]/20">
                <span className="text-[11px] font-mono font-bold uppercase text-[#E14942]">
                   Uncompressed Monster URL (196 characters)
                </span>
                <span className="text-xs bg-[#FADBD8] px-2 py-0.5 rounded font-bold border border-[#080808]">
                  Too Heavy
                </span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#4B5864] break-all leading-relaxed pt-3">
                https://store.acme-corp.global/shop/catalog/category/deluxe-item-model-2026?
                <span className="bg-[#FADBD8] text-[#080808] font-bold">
                  utm_source=facebook&utm_medium=cpc&utm_campaign=black_friday_blowout_v2
                </span>
                &session_id=89231849102938102938102938&affiliate=partner_9921
              </p>
            </div>

            {/* Transition Arrow With Annotation */}
            <div className="flex items-center justify-center gap-3 py-1">
              <HandDrawnArrow variant="curve-down" className="w-8 h-10 text-[#080808]" />
              <div className="bg-[#F5D84A] border-2 border-[#080808] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#080808] -rotate-1">
                <span className="font-hand font-bold text-sm text-[#080808]">
                  ShortKing gives it a clean shave 
                </span>
              </div>
            </div>

            {/* The Clean ShortKing URL Card */}
            <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 shadow-[6px_6px_0px_#080808] relative">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#080808]">
                <span className="text-[11px] font-mono font-bold uppercase text-[#2B9348]">
                  ✓ ShortKing URL (22 characters)
                </span>
                <span className="text-xs bg-[#C4EBC8] px-2 py-0.5 rounded font-bold border border-[#080808]">
                  89% Smaller
                </span>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#080808] bg-[#F5D84A] px-3 py-1.5 rounded-lg border-2 border-[#080808] shadow-[2px_2px_0px_#080808]">
                  shortking.app/x7K2pQ
                </span>
                <span className="text-xs font-bold text-[#556270]">
                  Fits on a business card, SMS, or QR code.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
