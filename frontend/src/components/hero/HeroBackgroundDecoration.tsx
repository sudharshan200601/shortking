"use client";

import React from "react";
import { HandDrawnCloud } from "../illustrations/HandDrawnClouds";
import { HandDrawnCarrot } from "../illustrations/HandDrawnCarrot";
import { HandDrawnStar, PaperAirplane } from "../illustrations/HandDrawnDoodles";

/**
 * HeroBackgroundDecoration:
 * Implements a rich, hand-drawn editorial poster environment for the ShortKing hero.
 *
 * Requirements strictly satisfied:
 * 1. MANY HAND-DRAWN CLOUDS: 14 distinct clouds distributed around the hero (large, medium, tiny).
 * 2. SEPARATE HAND-DRAWN CARROTS: 8 individual carrots scattered independently in open sky pockets.
 * 3. COMPLETELY SEPARATE: No carrots inside or attached to clouds; no carrot-shaped clouds.
 * 4. KEEP THE HERO CLEAR: Frames the hero content (logo, heading, input, buttons, cards) without covering.
 * 5. POSTER STYLE: Light sky blue background + off-white clouds + orange/green carrots + black ink outlines + yellow doodles.
 * 6. NO EMOJIS: Pure SVG illustrations only.
 * 7. SUBTLE ANIMATION: Slow horizontal drift and gentle bobbing; staggered delays; respects prefers-reduced-motion.
 * 8. RESPONSIVE: Full composition on desktop, tailored on tablet, clean perimeter framing on mobile.
 */
export const HeroBackgroundDecoration: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* 1. HAND-DRAWN CLOUDS (14 CLOUDS DISTRIBUTED TO FRAME THE HERO)            */}
      {/* ========================================================================= */}

      {/* --- TOP LEFT REGION (3 clouds of different sizes) --- */}
      {/* Cloud 1: Top-Left Large Fluffy Cloud (slow horizontal drift) */}
      <div
        className="absolute top-[2%] left-[-15px] sm:left-[1%] lg:left-[2%] opacity-90 hidden sm:block animate-cloud-drift-a"
        style={{ animationDelay: "0s" }}
      >
        <div className="w-[85px] h-[44px] sm:w-[110px] sm:h-[55px] lg:w-[135px] lg:h-[68px]">
          <HandDrawnCloud variant={1} width={135} height={68} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 2: Top-Left Medium Cloud (nestled slightly inward) */}
      <div className="absolute top-[8%] left-[8%] sm:left-[11%] lg:left-[14%] opacity-85 hidden sm:block">
        <div className="w-[65px] h-[40px] lg:w-[85px] lg:h-[52px] -rotate-2">
          <HandDrawnCloud variant={2} width={85} height={52} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 3: Top-Left Tiny Detail Cloud (sitting partially near viewport edge) */}
      <div
        className="absolute top-[14%] left-[-15px] sm:left-[0.5%] lg:left-[1.5%] opacity-80 hidden lg:block animate-cloud-drift-c"
        style={{ animationDelay: "-6s" }}
      >
        <div className="w-[55px] h-[34px] lg:w-[68px] lg:h-[42px] rotate-3">
          <HandDrawnCloud variant={4} width={68} height={42} className="w-full h-full" />
        </div>
      </div>

      {/* --- TOP CENTER REGION (1 small cloud high in the sky) --- */}
      {/* Cloud 4: Top Center Small Cloud (high above badge, framing top sky) */}
      <div
        className="absolute top-[1%] left-[50%] -translate-x-1/2 opacity-75 hidden md:block animate-cloud-drift-b"
        style={{ animationDelay: "-9s" }}
      >
        <div className="w-[52px] h-[32px] lg:w-[62px] lg:h-[38px]">
          <HandDrawnCloud variant={4} width={62} height={38} className="w-full h-full" />
        </div>
      </div>

      {/* --- TOP RIGHT REGION (2 clouds of different sizes) --- */}
      {/* Cloud 5: Top-Right Large Wispy Cloud */}
      <div
        className="absolute top-[2%] right-[-15px] sm:right-[1%] lg:right-[3%] opacity-90 hidden sm:block animate-cloud-drift-b"
        style={{ animationDelay: "-4s" }}
      >
        <div className="w-[85px] h-[36px] sm:w-[110px] sm:h-[44px] lg:w-[140px] lg:h-[54px] -rotate-1">
          <HandDrawnCloud variant={3} width={140} height={54} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 6: Top-Right Medium Cloud (nestled slightly lower right) */}
      <div className="absolute top-[8.5%] right-[8%] sm:right-[11%] lg:right-[14%] opacity-85 hidden sm:block">
        <div className="w-[68px] h-[40px] lg:w-[88px] lg:h-[52px] rotate-2">
          <HandDrawnCloud variant={5} width={88} height={52} flip={true} className="w-full h-full" />
        </div>
      </div>

      {/* --- MID LEFT REGION (2 clouds flanking the hero headline & between hero and input) --- */}
      {/* Cloud 7: Mid-Left Medium Fluffy Cloud (flanking headline) */}
      <div
        className="absolute top-[27%] left-[-15px] sm:left-[0.5%] lg:left-[2.5%] opacity-85 hidden sm:block animate-cloud-drift-a"
        style={{ animationDelay: "-11s" }}
      >
        <div className="w-[75px] h-[40px] sm:w-[95px] sm:h-[50px] lg:w-[115px] lg:h-[58px] rotate-1">
          <HandDrawnCloud variant={1} width={115} height={58} flip={true} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 8: In-Between Cloud (floats between main hero subtitle and URL input) */}
      <div className="absolute top-[37%] left-[10%] sm:left-[15%] lg:left-[21%] opacity-75 hidden lg:block">
        <div className="w-[56px] h-[34px] lg:w-[68px] lg:h-[40px] -rotate-3">
          <HandDrawnCloud variant={4} width={68} height={40} className="w-full h-full" />
        </div>
      </div>

      {/* --- MID RIGHT REGION (2 clouds flanking the hero headline & shortener) --- */}
      {/* Cloud 9: Mid-Right Large Billow Cloud */}
      <div
        className="absolute top-[26%] right-[-15px] sm:right-[0.5%] lg:right-[2%] opacity-90 hidden sm:block animate-cloud-drift-c"
        style={{ animationDelay: "-2s" }}
      >
        <div className="w-[80px] h-[48px] sm:w-[105px] sm:h-[62px] lg:w-[125px] lg:h-[72px] -rotate-2">
          <HandDrawnCloud variant={2} width={125} height={72} flip={true} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 10: Mid-Right Medium Cloudlet */}
      <div className="absolute top-[37%] right-[6%] sm:right-[8%] lg:right-[12%] opacity-80 hidden xl:block">
        <div className="w-[68px] h-[40px] lg:w-[82px] lg:h-[48px] rotate-2">
          <HandDrawnCloud variant={5} width={82} height={48} className="w-full h-full" />
        </div>
      </div>

      {/* --- LOWER LEFT REGION (2 clouds framing the bottom-left / comparison card) --- */}
      {/* Cloud 11: Lower-Left Medium Cloud */}
      <div
        className="absolute top-[56%] left-[-15px] sm:left-[0.5%] lg:left-[2.5%] opacity-85 hidden lg:block animate-cloud-drift-b"
        style={{ animationDelay: "-7s" }}
      >
        <div className="w-[85px] h-[40px] sm:w-[105px] sm:h-[48px] lg:w-[125px] lg:h-[56px] rotate-1">
          <HandDrawnCloud variant={3} width={125} height={56} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 12: Lower-Left Small Cloudlet (in the open margin at the bottom) */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-2 sm:left-[5%] lg:left-[8%] opacity-80">
        <div className="w-[52px] h-[30px] sm:w-[60px] sm:h-[36px] lg:w-[68px] lg:h-[42px] -rotate-2">
          <HandDrawnCloud variant={4} width={68} height={42} className="w-full h-full" />
        </div>
      </div>

      {/* --- LOWER RIGHT REGION (2 clouds framing bottom-right / comparison card) --- */}
      {/* Cloud 13: Lower-Right Large Cloud */}
      <div
        className="absolute top-[58%] right-[-15px] sm:right-[0.5%] lg:right-[2.5%] opacity-90 hidden lg:block animate-cloud-drift-a"
        style={{ animationDelay: "-14s" }}
      >
        <div className="w-[85px] h-[44px] sm:w-[110px] sm:h-[56px] lg:w-[130px] lg:h-[65px] -rotate-1">
          <HandDrawnCloud variant={1} width={130} height={65} className="w-full h-full" />
        </div>
      </div>

      {/* Cloud 14: Lower-Right Small Accent Cloud (in the open margin at the bottom) */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-5 right-2 sm:right-[5%] lg:right-[8%] opacity-80">
        <div className="w-[50px] h-[30px] sm:w-[62px] sm:h-[38px] lg:w-[72px] lg:h-[44px] rotate-3">
          <HandDrawnCloud variant={2} width={72} height={44} className="w-full h-full" />
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. SEPARATE HAND-DRAWN CARROTS (8 INDEPENDENT DOODLE CARROTS)             */}
      {/* ========================================================================= */}

      {/* Carrot 1: Upper-Left small tilted carrot (in open sky between clouds) */}
      <div
        className="absolute top-[5%] left-[20%] sm:left-[21%] lg:left-[23%] opacity-95 hidden sm:block animate-carrot-bob-a"
        style={{ animationDelay: "-1s" }}
      >
        <div className="w-[28px] h-[48px] lg:w-[34px] lg:h-[58px] -rotate-[22deg]">
          <HandDrawnCarrot variant={1} width={34} height={58} className="w-full h-full" />
        </div>
      </div>

      {/* Carrot 2: Upper-Right diagonal carrot with action speed lines */}
      <div
        className="absolute top-[5.5%] right-[22%] sm:right-[23%] lg:right-[25%] opacity-95 hidden sm:block animate-carrot-bob-b"
        style={{ animationDelay: "-5s" }}
      >
        <div className="w-[38px] h-[48px] lg:w-[48px] lg:h-[62px] rotate-[38deg]">
          <HandDrawnCarrot
            variant={4}
            width={48}
            height={62}
            showMotionLines={true}
            showSparkle={true}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Carrot 3: Mid-Left curved carrot (flanking the main headline) */}
      <div
        className="absolute top-[19%] left-[2%] sm:left-[4%] lg:left-[6%] opacity-95 hidden sm:block animate-carrot-bob-a"
        style={{ animationDelay: "-3s" }}
      >
        <div className="w-[28px] h-[48px] sm:w-[34px] sm:h-[58px] lg:w-[40px] lg:h-[68px] -rotate-[8deg]">
          <HandDrawnCarrot variant={2} width={40} height={68} className="w-full h-full" />
        </div>
      </div>

      {/* Carrot 4: Mid-Right cute chunky carrot with sparkle (flanking headline) */}
      <div
        className="absolute top-[18%] right-[2%] sm:right-[4%] lg:right-[6%] opacity-95 hidden sm:block animate-carrot-bob-b"
        style={{ animationDelay: "-7s" }}
      >
        <div className="w-[28px] h-[42px] sm:w-[34px] sm:h-[50px] lg:w-[40px] lg:h-[58px] rotate-[40deg]">
          <HandDrawnCarrot variant={3} width={40} height={58} className="w-full h-full" />
        </div>
      </div>

      {/* Carrot 5: Mid-Lower Left diagonal carrot (beside the shortener input) */}
      <div
        className="absolute top-[44%] left-[1.5%] sm:left-[3%] lg:left-[5%] opacity-95 hidden lg:block animate-carrot-bob-a"
        style={{ animationDelay: "-4s" }}
      >
        <div className="w-[32px] h-[54px] lg:w-[38px] lg:h-[64px] -rotate-[32deg]">
          <HandDrawnCarrot variant={1} width={38} height={64} className="w-full h-full" />
        </div>
      </div>

      {/* Carrot 6: Mid-Lower Right curved carrot with speed lines (beside input) */}
      <div
        className="absolute top-[45%] right-[1.5%] sm:right-[3%] lg:right-[5%] opacity-95 hidden lg:block animate-carrot-bob-b"
        style={{ animationDelay: "-2s" }}
      >
        <div className="w-[38px] h-[48px] lg:w-[48px] lg:h-[62px] rotate-[26deg]">
          <HandDrawnCarrot
            variant={4}
            width={48}
            height={62}
            showMotionLines={true}
            showSparkle={false}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Carrot 7: Lower-Left chunky carrot (around the bottom left framing) */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-[18%] sm:left-[16%] lg:left-[18%] opacity-95 hidden sm:block">
        <div className="w-[24px] h-[38px] sm:w-[28px] sm:h-[44px] lg:w-[34px] lg:h-[50px] -rotate-[42deg]">
          <HandDrawnCarrot variant={3} width={34} height={50} className="w-full h-full" />
        </div>
      </div>

      {/* Carrot 8: Lower-Right diagonal carrot (in the bottom right framing) */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 right-[16%] sm:right-[15%] lg:right-[17%] opacity-95">
        <div className="w-[22px] h-[36px] sm:w-[28px] sm:h-[46px] lg:w-[34px] lg:h-[56px] rotate-[30deg]">
          <HandDrawnCarrot variant={1} width={34} height={56} className="w-full h-full" />
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. SMALL YELLOW DOODLES & SKY ACCENTS (POSTER SKETCHBOOK DETAILS)         */}
      {/* ========================================================================= */}

      {/* Gliding Paper Airplane (high in the top right sky) */}
      <div className="absolute top-[3.5%] right-[7%] sm:right-[9%] lg:right-[11%] hidden sm:block animate-plane-glide opacity-90">
        <PaperAirplane size={44} />
      </div>

      {/* Yellow Sparkle Star: Top Left */}
      <div className="absolute top-[11%] left-[2%] sm:left-[3%] lg:left-[4%] hidden md:block animate-star-spin">
        <HandDrawnStar size={20} filled={true} />
      </div>

      {/* Yellow Sparkle Star: Mid Right near chunky carrot */}
      <div className="absolute top-[14%] right-[2%] sm:right-[3%] lg:right-[3.5%] hidden md:block animate-star-spin">
        <HandDrawnStar size={18} filled={true} />
      </div>

      {/* Yellow Sparkle Star: Lower Left */}
      <div className="absolute top-[62%] left-[12%] hidden xl:block">
        <HandDrawnStar size={22} filled={true} />
      </div>

      {/* Yellow Sparkle Star: Lower Right */}
      <div className="absolute top-[64%] right-[11%] hidden xl:block">
        <HandDrawnStar size={20} filled={true} />
      </div>
    </div>
  );
};
