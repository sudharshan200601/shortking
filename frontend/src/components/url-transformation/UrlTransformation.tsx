"use client";

import React from "react";
import Image from "next/image";
import { ScissorsIllustration } from "../illustrations/ScissorsIllustration";
import { HandDrawnArrow, HandDrawnStar } from "../illustrations/HandDrawnDoodles";

export const UrlTransformation: React.FC = () => {
  return (
    <section id="visual-compression" className="relative overflow-hidden border-t-3 border-b-3 border-[#080808] text-[#080808] pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-24 lg:pb-32">
      {/* 1. Full-width Castle Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/branding/shortking-castle.webp"
          alt="ShortKing Royal Castle Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_top] sm:object-[55%_top] lg:object-[center_top] select-none pointer-events-none"
        />
        {/* Subtle translucent warm wash to harmonize with ShortKing paper palette while preserving rich illustration colors */}
        <div className="absolute inset-0 bg-[#F8F7F1]/20 sm:bg-[#F8F7F1]/15 pointer-events-none" />
      </div>

      {/* 2. Foreground Content Container */}
      <div className="relative z-10 max-w-3xl lg:max-w-[820px] mx-auto px-4 sm:px-6">
        {/* Header floating in the open sky above the castle */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 lg:mb-48 space-y-2.5 relative">
          <div className="absolute -inset-x-8 -inset-y-4 bg-white/70 sm:bg-white/60 rounded-3xl blur-xl -z-10 pointer-events-none" />

          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#080808] bg-[#F5D84A] px-3.5 py-1.5 rounded-full border-1.5 border-[#080808] shadow-[2px_2px_0px_#080808] inline-block">
            Visual Compression
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#080808] leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Before &amp; After the Haircut
          </h2>
          <p className="text-sm sm:text-base text-[#080808] font-bold max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Watch 82 bloated tracking characters get trimmed into an elegant 24-character slug.
          </p>
        </div>

        {/* Interactive-look Comparison Card */}
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#080808,0_20px_35px_rgba(0,0,0,0.12)] space-y-8 relative">
        {/* Hand-drawn annotation badge */}
        <div className="absolute -top-4 right-8 bg-[#F5D84A] border-2 border-[#080808] px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#080808] rotate-2 hidden sm:flex items-center gap-1.5 select-none">
          <HandDrawnStar size={16} />
          <span className="font-hand font-bold text-sm text-[#080808]">
            URL haircut complete!
          </span>
        </div>

        {/* LONG URL BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#E14942] uppercase tracking-wider flex items-center gap-1.5">
              <span>●</span> LONG URL
            </span>
            <span className="bg-[#FADBD8] text-[#080808] px-2 py-0.5 rounded border border-[#080808]">
              82 Characters
            </span>
          </div>

          <div className="w-full bg-[#F8F7F1] border-2 border-[#080808] rounded-xl p-3 sm:p-4 shadow-[3px_3px_0px_#080808] flex items-center">
            <div className="w-full h-8 bg-[#E14942]/20 border border-[#E14942] rounded-lg flex items-center px-3 overflow-hidden">
              <span className="font-mono text-xs text-[#080808] truncate">
                https://store.example.com/products/category/very-long-page-name?id=12345&utm=campaign
              </span>
            </div>
          </div>
        </div>

        {/* THE SHORTKING SHEARING TRANSITION */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2 relative">
          <div className="flex items-center gap-2">
            <ScissorsIllustration className="w-16 h-14" cutting={true} />
            <div className="flex flex-col text-left">
              <span className="font-black text-sm uppercase tracking-wider text-[#080808]">
                ShortKing Engine
              </span>
              <span className="font-hand text-base font-bold text-[#080808]">
                Snips out bloated tracking garbage
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <HandDrawnArrow variant="curve-down" className="w-8 h-10 -rotate-45" />
          </div>
        </div>

        {/* SHORT URL BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#2B9348] uppercase tracking-wider flex items-center gap-1.5">
              <span>●</span> SHORTKING RESULT
            </span>
            <span className="bg-[#C4EBC8] text-[#080808] px-2 py-0.5 rounded border border-[#080808]">
              24 Characters (-71%)
            </span>
          </div>

          <div className="w-full bg-[#F8F7F1] border-2 border-[#080808] rounded-xl p-3 sm:p-4 shadow-[3px_3px_0px_#080808] flex items-center justify-between gap-4">
            <div className="w-48 sm:w-64 h-9 bg-[#F5D84A] border-2 border-[#080808] rounded-lg flex items-center px-3 shadow-[1.5px_1.5px_0px_#080808]">
              <span className="font-mono text-xs sm:text-sm font-black text-[#080808]">
                shortking.app/x7K2pQ
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-hand font-bold text-base text-[#080808] bg-[#F8F7F1] px-2 py-0.5 rounded border border-[#080808]">
                &quot;Much better!&quot; 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
