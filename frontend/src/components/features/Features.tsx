"use client";

import React from "react";
import Link from "next/link";
import { HandDrawnStar } from "../illustrations/HandDrawnDoodles";
import { QrCodeIllustration } from "../illustrations/QrCodeIllustration";

export const Features: React.FC = () => {
  return (
    <section id="features" className="px-4 sm:px-6 py-20 max-w-6xl mx-auto text-[#080808]">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#080808] bg-[#F5D84A] px-3.5 py-1 rounded-full border border-[#080808] shadow-[1.5px_1.5px_0px_#080808]">
          <HandDrawnStar size={14} />
          <span>Core Capabilities</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080808]">
          Engineered for Speed, Privacy & Precision
        </h2>
        <p className="text-sm sm:text-lg text-[#4B5864]">
          Every feature is built to give you total command over your links without enterprise bloat.
        </p>
      </div>

      {/* Grid of 6 Distinct Feature Treatments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. INSTANT SHORTENING - Speed Meter Style */}
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Header Graphic */}
            <div className="bg-[#EDF6FC] border-2 border-[#080808] rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_#080808]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="font-mono text-xs font-black uppercase text-[#080808]">
                  Fastify Engine
                </span>
              </div>
              <div className="bg-[#F5D84A] border border-[#080808] px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                ~12ms
              </div>
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#080808]">
              Instant Shortening
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5864] leading-relaxed">
              Powered by high-throughput Fastify and in-memory caching. Resolves destination codes
              in sub-milliseconds with collision-resistant Base62 hashes.
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/15 flex items-center gap-1.5 text-xs font-mono font-bold text-[#2B9348]">
            <span></span> Zero database bottleneck
          </div>
        </div>

        {/* 2. CUSTOM ALIASES - Branded Slug Pill Style */}
        <div className="bg-[#F8F7F1] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Header Graphic: Custom URL Pill */}
            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-4 shadow-[2px_2px_0px_#080808] space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#556270]">
                Brand Your Slugs
              </span>
              <div className="bg-[#F5D84A] border border-[#080808] rounded-lg px-2.5 py-1.5 font-mono text-xs font-black text-[#080808] flex items-center justify-between">
                <span>shortking.app/demo</span>
                <span className="text-[10px] bg-[#FFFFFF] px-1 rounded border border-[#080808]">
                  Reserved
                </span>
              </div>
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#080808]">
              Custom Vanity Aliases
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5864] leading-relaxed">
              Swap random hashes for memorable slugs like <code className="font-bold text-[#080808]">/podcast</code> or <code className="font-bold text-[#080808]">/keynote</code> with built-in reserved-word collision guards.
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/15 flex items-center gap-1.5 text-xs font-mono font-bold text-[#080808]">
            <span></span> Clean vanity URLs for socials
          </div>
        </div>

        {/* 3. PRIVACY-FIRST ANALYTICS - Globe & Shield Style */}
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Header Graphic */}
            <div className="bg-[#EDF6FC] border-2 border-[#080808] rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_#080808]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="font-mono text-xs font-black uppercase text-[#080808]">
                  HMAC Salted IPs
                </span>
              </div>
              <span className="text-[10px] font-bold bg-[#C4EBC8] border border-[#080808] px-2 py-0.5 rounded">
                GDPR Safe
              </span>
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#080808]">
              Privacy-First Analytics
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5864] leading-relaxed">
              Zero tracking cookies or invasive finger-printing. Raw visitor IPs are immediately salted and
              hashed via HMAC-SHA256, protecting your audience.
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/15 flex items-center gap-1.5 text-xs font-mono font-bold text-[#2B9348]">
            <span></span> Zero cookies required
          </div>
        </div>

        {/* 4. DYNAMIC QR CODES - Smartphone Scanner Style */}
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Graphic */}
            <div className="bg-[#F8F7F1] border-2 border-[#080808] rounded-xl p-2 flex items-center justify-center shadow-[2px_2px_0px_#080808] overflow-hidden">
              <QrCodeIllustration className="w-28 h-24" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#080808]">
              Instant QR Codes
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5864] leading-relaxed">
              Every link automatically generates an interactive vector QR code. Preview in the modal
              and download crisp PNG assets with a single click.
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/15 flex items-center gap-1.5 text-xs font-mono font-bold text-[#080808]">
            <span></span> Print and mobile ready
          </div>
        </div>

        {/* 5. LINK EXPIRATION - Clock & Sunset Style */}
        <div className="bg-[#F8F7F1] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Graphic: Clock & HTTP 410 */}
            <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_#080808]">
              <div className="flex items-center gap-2">
                <span className="text-2xl"></span>
                <span className="font-mono text-xs font-black uppercase text-[#080808]">
                  Automated Sunset
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold bg-[#FADBD8] border border-[#080808] px-2 py-0.5 rounded">
                HTTP 410
              </span>
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#080808]">
              Automatic Sunset Expiration
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5864] leading-relaxed">
              Set automated expiry dates for flash sales, confidential documents, or seasonal
              campaigns. Expired links cleanly decline traffic.
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/15 flex items-center gap-1.5 text-xs font-mono font-bold text-[#080808]">
            <span></span> Time-sensitive campaign control
          </div>
        </div>

        {/* 6. DEVELOPER REST API - Dark Ink Terminal Style */}
        <div className="bg-[#080808] text-[#F8F7F1] border-3 border-[#080808] rounded-2xl p-6 shadow-[5px_5px_0px_#080808] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="space-y-4">
            {/* Visual Graphic: Code snippet */}
            <div className="bg-[#1C2329] border border-[#3A4A57] rounded-xl p-3 font-mono text-[11px] space-y-1">
              <span className="text-[#F5D84A] font-bold">POST /api/v1/urls</span>
              <p className="text-[#7BE495] truncate">{`{"originalUrl": "https://..."}`}</p>
            </div>

            <h3 className="text-xl font-black tracking-tight text-[#FFFFFF]">
              Developer REST API
            </h3>
            <p className="text-xs sm:text-sm text-[#A4B8C7] leading-relaxed">
              Plug URL creation into your GitHub Actions, Discord bots, internal dashboards, or CLI
              scripts with clear JSON contracts and Bearer tokens.
            </p>
          </div>

          <div className="pt-4 border-t border-[#232E38] flex items-center justify-between text-xs font-mono">
            <span className="text-[#F5D84A] font-bold">Full API Documentation</span>
            <Link href="#api" className="text-[#8FC5E5] hover:underline font-bold">
              Explore →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
