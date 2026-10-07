"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShortKingLogo } from "../illustrations/ShortKingLogo";
import { UserMenu } from "./UserMenu";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#8FC5E5]/90 backdrop-blur-md border-b-2 border-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <ShortKingLogo size="md" />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F8F7F1] border-2 border-[#080808] rounded-full px-4 py-1.5 shadow-[2px_2px_0px_#080808]">
          <Link
            href="/#product"
            className="px-3 py-1 text-xs font-bold text-[#080808] hover:text-[#080808] hover:bg-[#F5D84A] rounded-full transition-colors"
          >
            Product
          </Link>
          <Link
            href="/#features"
            className="px-3 py-1 text-xs font-bold text-[#080808] hover:text-[#080808] hover:bg-[#F5D84A] rounded-full transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#analytics"
            className="px-3 py-1 text-xs font-bold text-[#080808] hover:text-[#080808] hover:bg-[#F5D84A] rounded-full transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/#api"
            className="px-3 py-1 text-xs font-bold text-[#080808] hover:text-[#080808] hover:bg-[#F5D84A] rounded-full transition-colors"
          >
            API
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-1 text-xs font-bold text-[#080808] hover:bg-[#F5D84A] rounded-full transition-colors flex items-center gap-1"
          >
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Right: Auth & CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <UserMenu />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-10 h-10 rounded-xl bg-[#F8F7F1] border-2 border-[#080808] flex flex-col items-center justify-center gap-1 shadow-[2px_2px_0px_#080808] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            <span
              className={`w-5 h-0.5 bg-[#080808] transition-transform ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#080808] transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#080808] transition-transform ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-6 pt-2 bg-[#8FC5E5] border-b-2 border-[#080808] animate-in slide-in-from-top-2 duration-150">
          <div className="bg-[#F8F7F1] border-2 border-[#080808] rounded-2xl p-4 shadow-[4px_4px_0px_#080808] space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/#product"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#080808] hover:bg-[#F5D84A] rounded-lg transition-colors"
              >
                Product
              </Link>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#080808] hover:bg-[#F5D84A] rounded-lg transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#080808] hover:bg-[#F5D84A] rounded-lg transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/#api"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#080808] hover:bg-[#F5D84A] rounded-lg transition-colors"
              >
                API
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#080808] hover:bg-[#F5D84A] rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            </nav>

            <div className="pt-3 border-t-2 border-[#080808]">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
