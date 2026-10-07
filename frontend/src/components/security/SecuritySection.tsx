"use client";

import React from "react";
import { ShieldSecurity } from "../illustrations/ShieldSecurity";
import { HandDrawnStar } from "../illustrations/HandDrawnDoodles";

export const SecuritySection: React.FC = () => {
  const verifiedFeatures = [
    {
      title: "Strict URL Validation",
      desc: "Every incoming link is strictly validated for RFC-compliant HTTP/HTTPS protocols and collision safety before indexing.",
    },
    {
      title: "HMAC IP Hash Masking",
      desc: "Visitor IP addresses are immediately salted and hashed via SHA-256 for privacy. Raw IP addresses are never saved to disk.",
    },
    {
      title: "Rate Limiting & Abuse Defense",
      desc: "Built-in sliding-window rate limiters block automated spamming, crawling spikes, and denial of service attempts.",
    },
    {
      title: "Automated Sunset Expiration",
      desc: "Temporary links expire automatically at your designated timestamp, returning semantic HTTP 410 Gone status codes.",
    },
    {
      title: "Bearer Token API Protection",
      desc: "Protected programmatic endpoints require verified cryptographic authentication tokens to create or manage resources.",
    },
    {
      title: "Secure Redirect Handling",
      desc: "Fastify handles redirects directly with HTTP 307 headers, preserving search query integrity with zero payload leaks.",
    },
  ];

  return (
    <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto text-[#080808]">
      <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#080808] relative">
        {/* Hand-drawn decorative star */}
        <div className="absolute top-6 right-8 pointer-events-none hidden sm:block">
          <HandDrawnStar size={24} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Shield Illustration + Header */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <ShieldSecurity className="mb-2" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D84A] border border-[#080808] shadow-[1.5px_1.5px_0px_#080808] text-xs font-mono font-bold uppercase tracking-wider">
              <span> Technical Guardrails</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#080808]">
              Short. Secure. Controlled.
            </h2>

            <p className="text-sm text-[#4B5864] leading-relaxed">
              We focus strictly on verified engineering safeguards. No marketing exaggerations —
              only real cryptographic hashing, strict validation, and reliable endpoint protection.
            </p>
          </div>

          {/* Right Column: 6 Verified Safeguards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {verifiedFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-4 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl shadow-[2.5px_2.5px_0px_#080808] space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#C4EBC8] border border-[#080808] flex items-center justify-center text-[10px] font-bold text-[#080808]">
                    ✓
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#080808]">
                    {feat.title}
                  </h4>
                </div>
                <p className="text-xs text-[#556270] leading-relaxed pl-6">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
