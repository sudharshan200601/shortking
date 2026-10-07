"use client";

import React from "react";
import { Hero } from "@/components/hero/Hero";
import { LongUrlStory } from "@/components/long-url-story/LongUrlStory";
import { UrlTransformation } from "@/components/url-transformation/UrlTransformation";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Features } from "@/components/features/Features";
import { DashboardPreview } from "@/components/dashboard-preview/DashboardPreview";
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { DeveloperApi } from "@/components/developer-api/DeveloperApi";
import { SecuritySection } from "@/components/security/SecuritySection";
import { FinalCta } from "@/components/final-cta/FinalCta";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-[#F5D84A] selection:text-[#080808]">
      {/* 1. Hero Section with immediate URL shortener */}
      <div id="product">
        <Hero />
      </div>

      {/* 2. Long URL Story ("Some URLs need a suitcase") */}
      <LongUrlStory />

      {/* 3. URL Transformation (82 chars -> 24 chars comparison) */}
      <UrlTransformation />

      {/* 4. How It Works (01 Paste, 02 Shorten, 03 Share) */}
      <HowItWorks />

      {/* 5. Features (6 Distinct Visual Treatments) */}
      <Features />

      {/* 6. Dashboard Preview (Laptop Browser Frame) */}
      <DashboardPreview />

      {/* 7. Analytics ("Know where your links travel") */}
      <AnalyticsSection />

      {/* 8. Developer API ("For people who automate things") */}
      <DeveloperApi />

      {/* 9. Security ("Short. Secure. Controlled.") */}
      <SecuritySection />

      {/* 10. Final Illustrated CTA ("Give that URL a haircut") */}
      <FinalCta />

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
