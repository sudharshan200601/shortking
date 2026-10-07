import React from "react";

// Hand-drawn doodle arrow with sketchy, imperfect strokes
export const HandDrawnArrow: React.FC<{
  className?: string;
  variant?: "curve-right" | "curve-down" | "loop" | "straight";
  color?: string;
}> = ({ className = "", variant = "curve-right", color = "#080808" }) => {
  if (variant === "curve-down") {
    return (
      <svg
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-12 h-16 ${className}`}
      >
        <path
          d="M 15 5 C 28 20, 48 35, 30 65"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 18 55 L 30 68 L 42 58"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "loop") {
    return (
      <svg
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-16 h-12 ${className}`}
      >
        <path
          d="M 5 35 C 20 5, 45 5, 40 30 C 35 48, 15 45, 25 25 C 35 5, 65 15, 75 35"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 65 30 L 76 38 L 75 25"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "straight") {
    return (
      <svg
        viewBox="0 0 80 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-16 h-6 ${className}`}
      >
        <path
          d="M 4 12 C 25 10, 50 14, 74 12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 64 5 L 75 12 L 64 19"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // curve-right default
  return (
    <svg
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-10 ${className}`}
    >
      <path
        d="M 6 12 C 25 6, 55 12, 70 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 58 36 L 72 38 L 70 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn doodle star variations for editorial decoration
export type StarVariant =
  | "sparkle-4"
  | "star-5"
  | "irregular-sparkle"
  | "burst"
  | "cross-spark"
  | "tiny-sparkle";

export interface HandDrawnStarProps {
  className?: string;
  size?: number;
  variant?: StarVariant;
  filled?: boolean;
  color?: string;
  accentColor?: string;
  rotate?: number;
}

export const HandDrawnStar: React.FC<HandDrawnStarProps> = ({
  className = "",
  size = 28,
  variant = "sparkle-4",
  filled = true,
  color = "#080808",
  accentColor = "#F5D84A",
  rotate = 0,
}) => {
  const rotationStyle = rotate ? { transform: `rotate(${rotate}deg)` } : undefined;

  // Variant: 5-Point Hand-Drawn Cartoon Star
  if (variant === "star-5") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotationStyle}
        className={`inline-block select-none ${className}`}
      >
        <path
          d="M 16 2.5 C 16.8 5.5, 18.2 9.5, 19.5 11.5 C 21.8 11.8, 26.5 12.5, 29.5 13.2 C 27.2 15.5, 23.8 18.2, 22.2 20.2 C 22.8 23.5, 23.8 27.8, 24.2 30 C 21.5 28.2, 17.5 25.5, 15.8 25.2 C 13.8 25.5, 10.2 28.2, 7.8 30 C 8.2 27.5, 9.2 23.2, 9.8 20.2 C 8.2 18.2, 4.8 15.5, 2.5 13.2 C 5.5 12.5, 10.2 11.8, 12.5 11.5 C 13.8 9.5, 15.2 5.5, 16 2.5 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Variant: Irregular / Dynamic Hand-Drawn Sparkle
  if (variant === "irregular-sparkle") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotationStyle}
        className={`inline-block select-none ${className}`}
      >
        <path
          d="M 16 1.5 C 16.6 8.5, 21 14.5, 29 16 C 21 17.5, 16.6 23.5, 16 30.5 C 15.4 23.5, 11 17.5, 3 16 C 11 14.5, 15.4 8.5, 16 1.5 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="1.4" fill={color} />
      </svg>
    );
  }

  // Variant: Small Burst / Radiating Spark
  if (variant === "burst") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotationStyle}
        className={`inline-block select-none ${className}`}
      >
        <path
          d="M 16 7 C 16.5 11.5, 20.5 15.5, 25 16 C 20.5 16.5, 16.5 20.5, 16 25 C 15.5 20.5, 11.5 16.5, 7 16 C 11.5 15.5, 15.5 11.5, 16 7 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line x1="16" y1="2" x2="16" y2="4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="27.5" x2="16" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="16" x2="4.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="27.5" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Variant: Tiny Cross-Shaped Sparkle Glint
  if (variant === "cross-spark") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotationStyle}
        className={`inline-block select-none ${className}`}
      >
        <path
          d="M 12 1.5 C 12.6 6, 14 10.5, 15 12 C 14 13.5, 12.6 18, 12 22.5 C 11.4 18, 10 13.5, 9 12 C 10 10.5, 11.4 6, 12 1.5 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M 1.5 12 C 6 12.6, 10.5 14, 12 15 C 13.5 14, 18 12.6, 22.5 12 C 18 11.4, 13.5 10, 12 9 C 10.5 10, 6 11.4, 1.5 12 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Variant: Tiny 4-Point Diamond Sparkle
  if (variant === "tiny-sparkle") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotationStyle}
        className={`inline-block select-none ${className}`}
      >
        <path
          d="M 10 1.5 C 10.4 5.5, 14.5 9.6, 18.5 10 C 14.5 10.4, 10.4 14.5, 10 18.5 C 9.6 14.5, 5.5 10.4, 1.5 10 C 5.5 9.6, 9.6 5.5, 10 1.5 Z"
          fill={filled ? accentColor : "none"}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default: Classic 4-Point Hand-Drawn Sparkle (Preserves exact reference star)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={rotationStyle}
      className={`inline-block select-none ${className}`}
    >
      <path
        d="M 16 2 C 16.5 9, 23 15.5, 30 16 C 23 16.5, 16.5 23, 16 30 C 15.5 23, 9 16.5, 2 16 C 9 15.5, 15.5 9, 16 2 Z"
        fill={filled ? accentColor : "none"}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Re-export as StarDoodle for explicit component naming
export const StarDoodle = HandDrawnStar;

// Hand-drawn fluffy ink cloud
export const DoodleCloud: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 90, height = 45 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <path
        d="M 22 36 C 14 36, 6 32, 7 22 C 7 14, 16 11, 22 13 C 26 4, 42 3, 50 10 C 58 5, 72 7, 74 18 C 82 19, 84 29, 78 34 C 74 37, 68 36, 65 36 Z"
        fill="#F8F7F1"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tiny internal sketch shadow line */}
      <path
        d="M 28 32 C 38 31, 55 31, 68 32"
        stroke="#080808"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
    </svg>
  );
};

// Hand-drawn paper airplane with looping dotted trail
export const PaperAirplane: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 48 }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Plane Body */}
        <path
          d="M 8 28 L 46 10 L 26 44 L 23 31 Z"
          fill="#F8F7F1"
          stroke="#080808"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Fold line */}
        <path
          d="M 46 10 L 23 31"
          stroke="#080808"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Underwing flap fill with yellow accent */}
        <path
          d="M 23 31 L 30 36 L 46 10 Z"
          fill="#F5D84A"
          stroke="#080808"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Hand-drawn scissors doodle
export const DoodleScissors: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10" cy="11" r="5" fill="#F8F7F1" stroke="#080808" strokeWidth="2" />
      <circle cx="10" cy="25" r="5" fill="#F8F7F1" stroke="#080808" strokeWidth="2" />
      <path d="M 14 13 L 29 25" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 14 23 L 29 11" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="19.5" cy="18" r="2" fill="#F5D84A" stroke="#080808" strokeWidth="1.5" />
    </svg>
  );
};

// Hand-drawn wavy cut line
export const CutLine: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DoodleScissors size={20} className="text-[#080808] shrink-0" />
      <div className="flex-1 border-b-2 border-dashed border-[#080808] h-0" />
      <span className="text-[11px] font-mono font-bold text-[#080808] uppercase tracking-wider bg-[#F5D84A] px-1.5 py-0.5 rounded border border-[#080808]">
        Cut Here
      </span>
    </div>
  );
};
