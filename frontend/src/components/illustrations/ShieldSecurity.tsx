import React from "react";

export const ShieldSecurity: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[160px] drop-shadow-[4px_4px_0px_#080808]"
      >
        {/* Shield Body */}
        <path
          d="M 90 15 C 130 15, 155 30, 155 60 C 155 115, 120 150, 90 165 C 60 150, 25 115, 25 60 C 25 30, 50 15, 90 15 Z"
          fill="#F8F7F1"
          stroke="#080808"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Shield inner yellow quartering */}
        <path
          d="M 90 20 L 90 160 C 115 146, 148 112, 148 60 C 148 35, 125 22, 90 20 Z"
          fill="#F5D84A"
          stroke="#080808"
          strokeWidth="1.5"
        />

        {/* Heraldic Divider Lines */}
        <line x1="90" y1="20" x2="90" y2="160" stroke="#080808" strokeWidth="2.5" />
        <line x1="30" y1="75" x2="150" y2="75" stroke="#080808" strokeWidth="2.5" />

        {/* Center Padlock / Keyhole Emblem */}
        <rect
          x="76"
          y="64"
          width="28"
          height="24"
          rx="4"
          fill="#FFFFFF"
          stroke="#080808"
          strokeWidth="2.5"
        />
        {/* Shackle */}
        <path
          d="M 82 64 L 82 54 C 82 48, 98 48, 98 54 L 98 64"
          stroke="#080808"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Keyhole */}
        <circle cx="90" cy="74" r="2.5" fill="#080808" />
        <path d="M 89 74 L 88 82 L 92 82 L 91 74 Z" fill="#080808" />

        {/* Verification Checkmark Banner at bottom */}
        <g transform="translate(68, 102)">
          <circle cx="22" cy="18" r="14" fill="#C4EBC8" stroke="#080808" strokeWidth="2" />
          <path
            d="M 15 18 L 20 23 L 29 13"
            stroke="#080808"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Stars around shield */}
        <path d="M 18 25 L 22 20 L 26 25 L 21 30 Z" fill="#F5D84A" stroke="#080808" strokeWidth="1" />
        <path d="M 155 125 L 159 120 L 163 125 L 158 130 Z" fill="#F5D84A" stroke="#080808" strokeWidth="1" />
      </svg>
    </div>
  );
};
