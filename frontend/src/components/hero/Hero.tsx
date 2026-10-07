"use client";

import React from "react";
import { UrlShortener } from "../url/UrlShortener";
import { HandDrawnArrow } from "../illustrations/HandDrawnDoodles";
import { ScissorsIllustration } from "../illustrations/ScissorsIllustration";
import { HeroBackgroundDecoration } from "./HeroBackgroundDecoration";

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* --- RICH HAND-DRAWN CLOUDS & SEPARATE CARROTS ENVIRONMENT --- */}
      <HeroBackgroundDecoration />

      <section className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Editorial King Tag Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#080808] shadow-[2.5px_2.5px_0px_#080808] text-xs font-black uppercase tracking-wider mb-6 select-none animate-in fade-in duration-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F5D84A] border border-[#080808]" />
        <span>ShortKing v0.1.0 — The Editorial Link Shortener</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#080808] max-w-4xl leading-[1.08] relative">
        Long URLs don&apos;t stand{" "}
        <span className="relative inline-block">
          <span className="relative z-10">a chance.</span>
          <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-4 sm:h-6 bg-[#F5D84A] -z-0 -rotate-1 rounded-sm border-t border-b border-[#080808]/40" />
        </span>
      </h1>

      {/* Supporting Subtitle */}
      <p className="mt-6 text-base sm:text-xl text-[#1E293B] max-w-2xl font-medium leading-relaxed">
        Turn long, messy links into short, memorable URLs in seconds.{" "}
        <span className="font-hand text-xl sm:text-2xl text-[#080808] font-bold block sm:inline mt-1 sm:mt-0">
          Give that bloated link a haircut! 
        </span>
      </p>

      {/* --- CENTRAL HERO SHORTENER WIDGET --- */}
      <div className="w-full mt-10 relative z-20">
        {/* Hand-drawn arrow pointing down at shortener */}
        <div className="absolute -top-12 right-12 hidden lg:flex items-center gap-2 pointer-events-none select-none">
          <span className="font-hand font-bold text-base text-[#080808] rotate-6 bg-[#F5D84A] px-2 py-0.5 rounded border border-[#080808] shadow-[1.5px_1.5px_0px_#080808]">
            Paste your messy link here!
          </span>
          <HandDrawnArrow variant="curve-down" className="w-8 h-12 -rotate-12" />
        </div>

        <UrlShortener />
      </div>

      {/* --- ILLUSTRATED ENVIRONMENT BELOW INPUT --- */}
      {/* Visual story flow: LONG URL -> SCISSORS -> SHORT URL */}
      <div className="mt-14 w-full max-w-4xl hidden md:flex items-center justify-between gap-4 p-5 bg-[#F8F7F1]/85 border-2 border-[#080808] rounded-2xl shadow-[4px_4px_0px_#080808] select-none text-left">
        {/* Step 1: Bloated URL */}
        <div className="flex-1 min-w-0 bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-3 shadow-[2px_2px_0px_#080808]">
          <span className="text-[10px] font-mono font-bold text-[#E14942] uppercase block">
            01. Tangled URL (148 chars)
          </span>
          <p className="text-xs font-mono text-[#556270] truncate mt-0.5">
            https://store.acme.com/item/fall?utm_source=ad&tracking=999...
          </p>
        </div>

        {/* Hand-drawn scissors in the middle */}
        <div className="flex flex-col items-center justify-center shrink-0 px-2">
          <ScissorsIllustration className="w-16 h-14" cutting={true} />
          <span className="font-hand font-bold text-xs text-[#080808] -mt-1">
            *snip snip*
          </span>
        </div>

        {/* Step 2: Clean Short URL */}
        <div className="flex-1 min-w-0 bg-[#F5D84A] border-2 border-[#080808] rounded-xl p-3 shadow-[2px_2px_0px_#080808]">
          <span className="text-[10px] font-mono font-bold text-[#080808] uppercase block">
            02. ShortKing URL (22 chars)
          </span>
          <p className="text-xs font-mono font-black text-[#080808] truncate mt-0.5">
            shortking.app/launch
          </p>
        </div>
      </div>
    </section>
  </div>
  );
};
