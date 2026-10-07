import React from "react";

export const UrlCompressionMachine: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 460 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Ground shadow */}
        <ellipse cx="230" cy="155" rx="190" ry="8" fill="#080808" opacity="0.12" />

        {/* --- LEFT: LONG CHAOTIC INPUT TAPE --- */}
        <g>
          {/* Tangled ribbon entering */}
          <path
            d="M 10 95 C 40 85, 30 115, 70 95 C 90 85, 100 95, 120 90"
            stroke="#080808"
            strokeWidth="3"
            fill="none"
          />
          {/* Paper ribbon body */}
          <rect
            x="20"
            y="65"
            width="120"
            height="32"
            rx="4"
            fill="#F8F7F1"
            stroke="#080808"
            strokeWidth="2"
            transform="rotate(-4 20 65)"
          />
          <text
            x="25"
            y="85"
            fontFamily="monospace"
            fontSize="8"
            fontWeight="bold"
            fill="#E14942"
            transform="rotate(-4 20 65)"
          >
            https://long.link/lots-of-junk?utm=1...
          </text>

          {/* Dotted cut indicator */}
          <line
            x1="120"
            y1="50"
            x2="120"
            y2="115"
            stroke="#080808"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text x="75" y="45" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#080808">
            CHAOS (180 chars)
          </text>
        </g>

        {/* --- CENTER: SHORTKING COMPRESSION CHAMBER --- */}
        <g>
          {/* Main Chamber housing */}
          <rect
            x="160"
            y="30"
            width="140"
            height="115"
            rx="16"
            fill="#FFFFFF"
            stroke="#080808"
            strokeWidth="3"
          />

          {/* Machine Header plate */}
          <rect
            x="170"
            y="40"
            width="120"
            height="26"
            rx="6"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2"
          />
          <text
            x="185"
            y="57"
            fontFamily="sans-serif"
            fontSize="10"
            fontWeight="900"
            fill="#080808"
            letterSpacing="1"
          >
            ✂ SHORTKING ✂
          </text>

          {/* Barber pole stripes on sides */}
          <g>
            <rect x="165" y="75" width="10" height="55" fill="#F8F7F1" stroke="#080808" strokeWidth="1.5" />
            <path d="M 165 85 L 175 75 M 165 98 L 175 88 M 165 111 L 175 101 M 165 124 L 175 114" stroke="#E14942" strokeWidth="2" />

            <rect x="285" y="75" width="10" height="55" fill="#F8F7F1" stroke="#080808" strokeWidth="1.5" />
            <path d="M 285 85 L 295 75 M 285 98 L 295 88 M 285 111 L 295 101 M 285 124 L 295 114" stroke="#8FC5E5" strokeWidth="2" />
          </g>

          {/* Central Cutting / Compression Gear */}
          <circle cx="230" cy="98" r="22" fill="#F8F7F1" stroke="#080808" strokeWidth="2.5" />
          {/* Shearing blades crossing inside chamber */}
          <path d="M 218 86 L 242 110 M 242 86 L 218 110" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
          <circle cx="230" cy="98" r="4.5" fill="#F5D84A" stroke="#080808" strokeWidth="1.5" />

          {/* Pressure meter gauge on top */}
          <path d="M 230 30 L 230 18" stroke="#080808" strokeWidth="3" />
          <circle cx="230" cy="14" r="12" fill="#F8F7F1" stroke="#080808" strokeWidth="2" />
          <line x1="230" y1="14" x2="236" y2="8" stroke="#E14942" strokeWidth="2" strokeLinecap="round" />
          <circle cx="230" cy="14" r="2" fill="#080808" />

          {/* Sparkles around machine */}
          <path d="M 148 45 L 152 40 L 156 45 L 151 50 Z" fill="#F5D84A" stroke="#080808" strokeWidth="1" />
          <path d="M 308 50 L 312 44 L 316 50 L 311 56 Z" fill="#F5D84A" stroke="#080808" strokeWidth="1" />
        </g>

        {/* --- RIGHT: CRISP SHORT URL OUTPUT --- */}
        <g>
          {/* Ejection conveyor */}
          <path d="M 300 95 L 340 95" stroke="#080808" strokeWidth="3" strokeDasharray="3 3" />

          {/* Clean Shortened URL Badge */}
          <rect
            x="330"
            y="70"
            width="115"
            height="36"
            rx="8"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2.5"
            className="drop-shadow-[2px_2px_0px_#080808]"
          />
          <text
            x="340"
            y="92"
            fontFamily="monospace"
            fontSize="10.5"
            fontWeight="bold"
            fill="#080808"
          >
            shortking.app/x7K2pQ
          </text>

          {/* Success checkmark sticker */}
          <circle cx="438" cy="72" r="10" fill="#FFFFFF" stroke="#080808" strokeWidth="2" />
          <path d="M 434 72 L 437 75 L 443 69" stroke="#080808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          <text x="345" y="125" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#080808">
            ✓ SHORT (24 chars)
          </text>
        </g>
      </svg>
    </div>
  );
};
