import React from "react";

interface ScissorsIllustrationProps {
  className?: string;
  cutting?: boolean;
}

export const ScissorsIllustration: React.FC<ScissorsIllustrationProps> = ({
  className = "",
  cutting = false,
}) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[3px_3px_0px_#080808]"
      >
        {/* Motion snip lines */}
        <g className={cutting ? "animate-pulse" : ""}>
          <path
            d="M 125 35 L 140 25 M 130 50 L 148 48 M 125 65 L 142 75"
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Yellow spark doodle */}
          <path
            d="M 115 15 L 120 25 L 130 20 L 122 30 L 128 40 L 118 32 L 110 38 L 114 28 Z"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="1.5"
          />
        </g>

        {/* Upper blade and lower finger loop */}
        <g
          className={cutting ? "animate-scissors origin-[68px_72px]" : ""}
          style={{ transformOrigin: "68px 72px" }}
        >
          {/* Blade extending top-right */}
          <path
            d="M 68 72 L 126 40 C 132 37, 134 32, 128 30 C 115 28, 85 45, 68 72 Z"
            fill="#F8F7F1"
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Sharpened edge highlight */}
          <path
            d="M 78 65 L 124 38"
            stroke="#F5D84A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Handle shank extending bottom-left */}
          <path
            d="M 68 72 L 42 98"
            stroke="#080808"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Finger loop (bottom) */}
          <ellipse
            cx="32"
            cy="108"
            rx="18"
            ry="14"
            transform="rotate(-30 32 108)"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="3"
          />
          {/* Finger hole cutout */}
          <ellipse
            cx="32"
            cy="108"
            rx="10"
            ry="7"
            transform="rotate(-30 32 108)"
            fill="#8FC5E5"
            stroke="#080808"
            strokeWidth="2.5"
          />
        </g>

        {/* Lower blade and upper finger loop */}
        <g
          style={{ transformOrigin: "68px 72px" }}
        >
          {/* Blade extending bottom-right */}
          <path
            d="M 68 72 L 128 78 C 134 80, 135 86, 127 88 C 114 90, 84 82, 68 72 Z"
            fill="#F8F7F1"
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Sharpened edge highlight */}
          <path
            d="M 76 75 L 123 81"
            stroke="#F5D84A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Handle shank extending top-left */}
          <path
            d="M 68 72 L 40 46"
            stroke="#080808"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Finger loop (top) */}
          <ellipse
            cx="28"
            cy="36"
            rx="18"
            ry="14"
            transform="rotate(30 28 36)"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="3"
          />
          {/* Finger hole cutout */}
          <ellipse
            cx="28"
            cy="36"
            rx="10"
            ry="7"
            transform="rotate(30 28 36)"
            fill="#8FC5E5"
            stroke="#080808"
            strokeWidth="2.5"
          />
        </g>

        {/* Center Pivot Screw */}
        <circle cx="68" cy="72" r="6" fill="#080808" />
        <circle cx="68" cy="72" r="3.5" fill="#F8F7F1" />
        <line x1="66" y1="70" x2="70" y2="74" stroke="#080808" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
