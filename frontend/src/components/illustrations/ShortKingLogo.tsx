"use client";

import React from "react";
import { KingMascot } from "./KingMascot";
import { KingHeadIcon } from "./KingHeadIcon";

interface LogoProps {
  variant?: "full" | "compact" | "icon";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showTagline?: boolean;
  isChopping?: boolean;
  className?: string;
}

export const ShortKingLogo: React.FC<LogoProps> = ({
  variant = "compact",
  size = "md",
  showText = true,
  showTagline = false,
  isChopping = false,
  className = "",
}) => {
  // If variant is "icon", return only the King Head Icon
  if (variant === "icon" || !showText) {
    const iconDimensions = {
      sm: 32,
      md: 44,
      lg: 56,
    };

    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <div className="relative p-0.5 rounded-xl transition-transform hover:scale-105">
          <KingHeadIcon size={iconDimensions[size]} />
        </div>
      </div>
    );
  }

  // Sizing definitions for typography & mascot (+15–20% increase for better brand presence)
  const mascotDimensions = {
    sm: "w-9 h-9 sm:w-10 sm:h-10",
    md: "w-11 h-11 sm:w-14 sm:h-14",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
  };

  const textSizes = {
    sm: "text-lg sm:text-xl",
    md: "text-[21px] sm:text-[27px]",
    lg: "text-2xl sm:text-3xl",
  };

  const tagSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Mascot: Complete official cartoon king mascot with crown, knife & carrot */}
      <div className="relative shrink-0 transition-transform hover:rotate-2">
        {variant === "full" ? (
          <div className={mascotDimensions[size]}>
            <KingMascot isChopping={isChopping} />
          </div>
        ) : (
          <>
            {/* Desktop / Tablet: Full mascot with knife & carrot */}
            <div className={`hidden sm:block ${mascotDimensions[size]}`}>
              <KingMascot isChopping={isChopping} />
            </div>
            {/* Mobile: Full mascot or compact icon according to screen size */}
            <div className={`block sm:hidden ${mascotDimensions[size]}`}>
              <KingMascot isChopping={isChopping} />
            </div>
          </>
        )}
      </div>

      {/* Professional Modern Wordmark: [ KING MASCOT ] SHORT KING */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span
            className={`${textSizes[size]} font-black tracking-tight text-[#080808] uppercase font-sans whitespace-nowrap`}
          >
            Short
            <span className="bg-[#F5D84A] text-[#080808] px-1.5 py-0.5 sm:px-2 ml-0.5 sm:ml-1 rounded-lg border-2 border-[#080808] shadow-[1.5px_1.5px_0px_#080808]">
              King
            </span>
          </span>
        </div>

        {showTagline && (
          <span
            className={`${tagSizes[size]} font-mono font-bold tracking-widest text-[#4B5864] uppercase mt-1`}
          >
            URL Haircut Co.
          </span>
        )}
      </div>
    </div>
  );
};
