"use client";

import React from "react";
import Link from "next/link";
import { ShortKingLogo } from "../illustrations/ShortKingLogo";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#F8F7F1] border-t-3 border-[#080808] text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <ShortKingLogo variant="full" size="lg" showTagline={true} />
            <p className="text-sm font-semibold text-[#4B5864] max-w-sm">
              &quot;Long URLs don&apos;t stand a chance.&quot;
            </p>
            <p className="text-xs text-[#556270] max-w-sm leading-relaxed">
              An editorial, developer-grade link management platform providing lightning-fast
              redirects, collision-resistant hashes, and privacy-first analytics.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-bold">
            <div className="space-y-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#556270] block">
                Platform
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="/#product" className="hover:text-[#F5D84A] transition-colors">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-[#F5D84A] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#analytics" className="hover:text-[#F5D84A] transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-[#F5D84A] transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#556270] block">
                Developers
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="/#api" className="hover:text-[#F5D84A] transition-colors">
                    REST API
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F5D84A] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-[#F5D84A] transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#556270] block">
                Legal & Trust
              </span>
              <ul className="space-y-2">
                <li>
                  <span className="text-[#556270] hover:text-[#080808] cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-[#556270] hover:text-[#080808] cursor-pointer">
                    Terms of Service
                  </span>
                </li>
                <li>
                  <span className="text-[#556270] hover:text-[#080808] cursor-pointer">
                    Security Report
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t-2 border-[#080808]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-medium text-[#556270]">
          <div className="flex items-center gap-2">
            <span>✂️</span>
            <span>ShortKing</span>
            <span>—</span>
            <span>All rights reserved.</span>
          </div>
          <div>© 2026 ShortKing</div>
        </div>
      </div>
    </footer>
  );
};
