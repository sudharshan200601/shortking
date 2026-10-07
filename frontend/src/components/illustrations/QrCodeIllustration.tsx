import React from "react";

export const QrCodeIllustration: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[180px]"
      >
        {/* Phone Frame Mockup */}
        <rect
          x="65"
          y="15"
          width="115"
          height="150"
          rx="18"
          fill="#080808"
          stroke="#080808"
          strokeWidth="2"
        />
        {/* Phone Screen */}
        <rect
          x="72"
          y="26"
          width="101"
          height="128"
          rx="10"
          fill="#8FC5E5"
        />
        {/* Camera Speaker Notch */}
        <rect x="110" y="20" width="25" height="3" rx="1.5" fill="#FFFFFF" opacity="0.4" />

        {/* QR Code Canvas Card inside screen */}
        <rect
          x="82"
          y="40"
          width="80"
          height="80"
          rx="6"
          fill="#F8F7F1"
          stroke="#080808"
          strokeWidth="2"
        />

        {/* QR Code Matrix Elements */}
        {/* Top-Left Finder */}
        <rect x="88" y="46" width="20" height="20" fill="#080808" />
        <rect x="91" y="49" width="14" height="14" fill="#F8F7F1" />
        <rect x="94" y="52" width="8" height="8" fill="#F5D84A" />

        {/* Top-Right Finder */}
        <rect x="136" y="46" width="20" height="20" fill="#080808" />
        <rect x="139" y="49" width="14" height="14" fill="#F8F7F1" />
        <rect x="142" y="52" width="8" height="8" fill="#F5D84A" />

        {/* Bottom-Left Finder */}
        <rect x="88" y="94" width="20" height="20" fill="#080808" />
        <rect x="91" y="97" width="14" height="14" fill="#F8F7F1" />
        <rect x="94" y="100" width="8" height="8" fill="#F5D84A" />

        {/* Data Pixels */}
        <rect x="114" y="48" width="6" height="6" fill="#080808" />
        <rect x="124" y="48" width="6" height="6" fill="#080808" />
        <rect x="114" y="58" width="6" height="6" fill="#080808" />
        <rect x="124" y="68" width="6" height="6" fill="#080808" />
        <rect x="114" y="78" width="16" height="6" fill="#080808" />
        <rect x="136" y="74" width="6" height="10" fill="#080808" />
        <rect x="148" y="74" width="8" height="6" fill="#080808" />
        <rect x="114" y="94" width="6" height="12" fill="#080808" />
        <rect x="126" y="94" width="8" height="6" fill="#080808" />
        <rect x="126" y="104" width="28" height="6" fill="#080808" />

        {/* Scanning Laser Line */}
        <line
          x1="80"
          y1="78"
          x2="164"
          y2="78"
          stroke="#E14942"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />

        {/* Floating Scan Label */}
        <g transform="translate(15, 60)">
          <rect
            x="0"
            y="0"
            width="62"
            height="24"
            rx="5"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="1.5"
          />
          <text x="7" y="16" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#080808">
            SCAN ME 📲
          </text>
        </g>
      </svg>
    </div>
  );
};
