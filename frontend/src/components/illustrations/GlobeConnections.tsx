import React from "react";

export const GlobeConnections: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[260px] drop-shadow-[4px_4px_0px_#080808]"
      >
        {/* Outer Globe Circle */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="#F8F7F1"
          stroke="#080808"
          strokeWidth="3"
        />

        {/* Latitude and Longitude Sketch Lines */}
        <ellipse
          cx="140"
          cy="140"
          rx="120"
          ry="40"
          stroke="#080808"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="140"
          cy="140"
          rx="45"
          ry="120"
          stroke="#080808"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="20"
          y1="140"
          x2="260"
          y2="140"
          stroke="#080808"
          strokeWidth="2"
        />
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="260"
          stroke="#080808"
          strokeWidth="2"
        />

        {/* Hand-drawn Continents with Yellow & Sky-blue Fills */}
        {/* Americas */}
        <path
          d="M 60 70 C 75 75, 85 95, 80 120 C 75 140, 95 160, 100 185 C 90 205, 80 200, 75 180 C 70 160, 50 130, 55 100 Z"
          fill="#8FC5E5"
          stroke="#080808"
          strokeWidth="2"
        />
        {/* Europe / Africa */}
        <path
          d="M 130 80 C 150 75, 170 85, 175 105 C 160 115, 165 130, 160 155 C 155 180, 140 195, 135 170 C 130 150, 125 120, 130 80 Z"
          fill="#F5D84A"
          stroke="#080808"
          strokeWidth="2"
        />
        {/* Asia / Pacific */}
        <path
          d="M 180 85 C 205 75, 230 90, 225 120 C 215 135, 220 155, 205 165 C 190 155, 195 125, 180 85 Z"
          fill="#8FC5E5"
          stroke="#080808"
          strokeWidth="2"
        />

        {/* Arcing Link Flight Paths */}
        <path
          d="M 75 105 C 110 50, 150 60, 165 110"
          stroke="#080808"
          strokeWidth="2.5"
          strokeDasharray="5 3"
          fill="none"
        />
        <path
          d="M 165 110 C 190 80, 210 90, 215 135"
          stroke="#080808"
          strokeWidth="2.5"
          strokeDasharray="5 3"
          fill="none"
        />

        {/* Location Pins with Yellow Heads */}
        {/* Pin 1 (US) */}
        <g>
          <ellipse cx="75" cy="105" rx="5" ry="3" fill="#080808" opacity="0.3" />
          <path d="M 75 105 L 75 92" stroke="#080808" strokeWidth="2" />
          <circle cx="75" cy="90" r="5" fill="#F5D84A" stroke="#080808" strokeWidth="1.5" />
        </g>
        {/* Pin 2 (EU) */}
        <g>
          <ellipse cx="165" cy="110" rx="5" ry="3" fill="#080808" opacity="0.3" />
          <path d="M 165 110 L 165 97" stroke="#080808" strokeWidth="2" />
          <circle cx="165" cy="95" r="5" fill="#E14942" stroke="#080808" strokeWidth="1.5" />
        </g>
        {/* Pin 3 (Tokyo/SG) */}
        <g>
          <ellipse cx="215" cy="135" rx="5" ry="3" fill="#080808" opacity="0.3" />
          <path d="M 215 135 L 215 122" stroke="#080808" strokeWidth="2" />
          <circle cx="215" cy="120" r="5" fill="#F5D84A" stroke="#080808" strokeWidth="1.5" />
        </g>

        {/* Orbiting Paper Plane */}
        <g transform="translate(195, 55) rotate(25)">
          <path d="M 0 10 L 20 0 L 10 18 L 8 12 Z" fill="#FFFFFF" stroke="#080808" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
