"use client";

import React from "react";
import Link from "next/link";
import { LaptopBrowserFrame } from "../illustrations/LaptopBrowserFrame";
import { Button } from "../ui/Button";

export const DashboardPreview: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-20 bg-[#F8F7F1] border-t-3 border-b-3 border-[#080808] text-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D84A] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
              <span>🖥️ Command Center</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808] leading-tight">
              A dashboard built for clarity, not complexity.
            </h2>

            <p className="text-sm sm:text-base text-[#4B5864] leading-relaxed">
              Monitor total link volumes, click conversions, and active endpoints in real time.
              Organize, filter, search, and deactivate sunset campaigns with zero hassle.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4EBC8] border border-[#080808] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs sm:text-sm text-[#1E293B]">
                  <strong>Real-time link status</strong> — Instantly know if links are active, expired, or sunset.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4EBC8] border border-[#080808] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs sm:text-sm text-[#1E293B]">
                  <strong>Search & Filter</strong> — Quickly find campaigns by custom vanity alias, slug, or destination.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4EBC8] border border-[#080808] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs sm:text-sm text-[#1E293B]">
                  <strong>Instant QR code exports</strong> — Download high-resolution vector assets anytime.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="font-black">
                  Explore Your Dashboard →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Illustrated Laptop Frame */}
          <div className="lg:col-span-7">
            <LaptopBrowserFrame totalUrls={143} totalClicks={12482} activeUrls={28} />
          </div>
        </div>
      </div>
    </section>
  );
};
