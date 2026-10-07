"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ScissorsIllustration } from "../illustrations/ScissorsIllustration";
import {
  HandDrawnStar,
  PaperAirplane,
  HandDrawnArrow,
  DoodleCloud,
} from "../illustrations/HandDrawnDoodles";

export const FinalCta: React.FC = () => {
  const scrollToTop = () => {
    const el = document.getElementById("shorten");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input");
      if (input) input.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="px-4 sm:px-6 py-24 relative overflow-hidden text-[#080808]">
      {/* Decorative Hand-drawn Background Doodles */}
      <div className="absolute top-12 left-10 pointer-events-none hidden lg:block animate-float-slow">
        <DoodleCloud width={100} height={50} />
      </div>
      <div className="absolute top-16 right-16 pointer-events-none hidden sm:block animate-plane-glide">
        <PaperAirplane size={44} />
      </div>
      <div className="absolute bottom-10 left-16 pointer-events-none hidden md:block animate-star-spin">
        <HandDrawnStar size={26} />
      </div>
      <div className="absolute bottom-12 right-20 pointer-events-none hidden md:block">
        <HandDrawnStar size={20} />
      </div>

      <div className="max-w-4xl mx-auto bg-[#F8F7F1] border-3 border-[#080808] rounded-3xl p-8 sm:p-14 text-center shadow-[10px_10px_0px_#080808] relative">
        {/* Scissor snip icon atop card */}
        <div className="flex justify-center -mt-16 sm:-mt-22 mb-4">
          <div className="bg-[#FFFFFF] p-2 rounded-2xl border-2 border-[#080808] shadow-[3px_3px_0px_#080808]">
            <ScissorsIllustration className="w-18 h-16 sm:w-22 sm:h-20" cutting={true} />
          </div>
        </div>

        <div className="space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D84A] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
            <span>✂️ The Finishing Touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808]">
            Give that URL a haircut.
          </h2>

          <p className="text-base sm:text-xl text-[#4B5864] font-medium font-hand">
            &quot;Paste it. Shorten it. Share it.&quot;
          </p>

          <p className="text-xs sm:text-sm text-[#556270]">
            Free instant shortening, collision-resistant codes, vector QR exports, and zero
            invasive trackers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              onClick={scrollToTop}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-black px-8 text-base shadow-[4px_4px_0px_#080808] cursor-pointer"
            >
              Shorten a URL Now ✂
            </Button>

            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto font-bold px-8 text-base shadow-[4px_4px_0px_#080808] cursor-pointer"
              >
                Create Free Account →
              </Button>
            </Link>
          </div>
        </div>

        {/* Hand-drawn Arrow annotation */}
        <div className="hidden sm:flex items-center justify-center gap-2 mt-8 text-xs font-hand font-bold text-[#080808]">
          <HandDrawnArrow variant="curve-right" className="w-8 h-6 rotate-12" />
          <span>No credit card required • Instant setup</span>
        </div>
      </div>
    </section>
  );
};
