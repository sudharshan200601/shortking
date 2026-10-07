"use client";

import React from "react";

interface KingHeadIconProps {
  className?: string;
  size?: number | string;
}

export const KingHeadIcon: React.FC<KingHeadIconProps> = ({
  className = "",
  size = 32,
}) => {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{
        width: dimension,
        height: dimension,
      }}
    >
      <picture className="w-full h-full flex items-center justify-center">
        <source srcSet="/branding/shortking-icon.webp" type="image/webp" />
        <img
          src="/branding/shortking-icon.png"
          alt="ShortKing Mascot Head & Crown Icon"
          width={390}
          height={390}
          className="w-full h-full object-contain pointer-events-none"
          loading="eager"
        />
      </picture>
    </div>
  );
};
