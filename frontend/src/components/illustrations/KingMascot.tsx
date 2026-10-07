"use client";

import React from "react";
import { UrlLuggageCharacter } from "./UrlLuggageCharacter";

export interface KingMascotProps {
  className?: string;
  size?: number | string;
  isChopping?: boolean;
  variant?: "default" | "suitcase" | "pulling";
}

export const KingMascot: React.FC<KingMascotProps> = ({
  className = "",
  size = "100%",
  isChopping = false,
  variant = "default",
}) => {
  if (variant === "suitcase" || variant === "pulling") {
    return <UrlLuggageCharacter className={className} />;
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${
        isChopping ? "animate-pulse" : ""
      } ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size === "100%" ? "100%" : size,
      }}
    >
      <picture className="w-full h-full flex items-center justify-center">
        <source srcSet="/branding/shortking-mascot.webp" type="image/webp" />
        <img
          src="/branding/shortking-mascot.png"
          alt="ShortKing Mascot — Cartoon King with Knife and Carrot"
          width={704}
          height={738}
          className={`w-full h-full object-contain pointer-events-none transition-transform duration-200 ${
            isChopping ? "animate-bounce" : ""
          }`}
          loading="eager"
        />
      </picture>
    </div>
  );
};

// Re-export as ShortKingMascot for flexible usage
export const ShortKingMascot = KingMascot;
