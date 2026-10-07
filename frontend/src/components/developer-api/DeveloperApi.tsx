"use client";

import React from "react";
import Link from "next/link";
import { TerminalWindow } from "../illustrations/TerminalWindow";
import { HandDrawnStar } from "../illustrations/HandDrawnDoodles";
import { Button } from "../ui/Button";

export const DeveloperApi: React.FC = () => {
  return (
    <section id="api" className="px-4 sm:px-6 py-20 bg-[#EDF6FC] border-t-3 border-b-3 border-[#080808] text-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border-1.5 border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-black uppercase tracking-wider">
              <span> REST API v1</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808] leading-tight">
              For people who automate things.
            </h2>

            <p className="text-sm sm:text-base text-[#4B5864] leading-relaxed">
              Programmatically compress bloated links directly inside your CI/CD workflows, Slack bots,
              internal tooling, or static site builders with a clean, authenticated JSON interface.
            </p>

            <div className="space-y-2 font-mono text-xs text-[#1E293B]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#F5D84A] border border-[#080808] flex items-center justify-center font-bold text-[10px]">
                  ✓
                </span>
                <span>Predictable JSON payload contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#F5D84A] border border-[#080808] flex items-center justify-center font-bold text-[10px]">
                  ✓
                </span>
                <span>Bearer token authentication & rate limiting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#F5D84A] border border-[#080808] flex items-center justify-center font-bold text-[10px]">
                  ✓
                </span>
                <span>Fastify backend returning semantic HTTP codes</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="font-black">
                  Read the API Docs →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Terminal Column */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-6 -left-6 pointer-events-none hidden md:block">
              <HandDrawnStar size={24} />
            </div>
            <TerminalWindow />
          </div>
        </div>
      </div>
    </section>
  );
};
