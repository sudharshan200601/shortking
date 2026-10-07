import React from "react";

export const UrlLuggageCharacter: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="-115 0 495 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-xl"
      >
        {/* Ground shadow doodle under entire scene */}
        <ellipse
          cx="135"
          cy="200"
          rx="245"
          ry="10"
          fill="#080808"
          opacity="0.15"
        />

        {/* --- MASSIVE OVERSIZED SUITCASE / TRUNK --- */}
        <g id="massive-url-suitcase">
          {/* Main Trunk Body */}
          <rect
            x="90"
            y="70"
            width="270"
            height="115"
            rx="12"
            fill="#F8F7F1"
            stroke="#080808"
            strokeWidth="3"
          />

          {/* Trunk corner reinforcements (leather patches) */}
          <path
            d="M 90 90 L 110 70 L 90 70 Z M 360 90 L 340 70 L 360 70 Z M 90 165 L 110 185 L 90 185 Z M 360 165 L 340 185 L 360 185 Z"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2"
          />

          {/* Heavy buckled straps wrapping around the luggage */}
          <rect
            x="145"
            y="68"
            width="14"
            height="119"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2"
          />
          <rect
            x="290"
            y="68"
            width="14"
            height="119"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2"
          />
          {/* Buckles */}
          <rect x="142" y="115" width="20" height="12" rx="2" fill="#FFFFFF" stroke="#080808" strokeWidth="2" />
          <rect x="287" y="115" width="20" height="12" rx="2" fill="#FFFFFF" stroke="#080808" strokeWidth="2" />

          {/* Trunk handle */}
          <path
            d="M 200 68 C 200 50, 240 50, 240 68"
            stroke="#080808"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bloated URL text printed on trunk */}
          <text
            x="170"
            y="98"
            fontFamily="monospace"
            fontSize="10"
            fontWeight="bold"
            fill="#080808"
          >
            https://store.acme.corp/item?
          </text>
          <text
            x="170"
            y="114"
            fontFamily="monospace"
            fontSize="8.5"
            fontWeight="bold"
            fill="#E14942"
          >
            utm_source=meta&utm_medium=cpc
          </text>
          <text
            x="170"
            y="130"
            fontFamily="monospace"
            fontSize="8.5"
            fontWeight="bold"
            fill="#556270"
          >
            &session_token=992837482819129
          </text>
          <text
            x="170"
            y="146"
            fontFamily="monospace"
            fontSize="8.5"
            fontWeight="bold"
            fill="#556270"
          >
            &affiliate=super_long_tracking_id
          </text>
          <text
            x="170"
            y="162"
            fontFamily="monospace"
            fontSize="9"
            fontWeight="bold"
            fill="#E14942"
          >
            ... + 184 more characters!
          </text>

          {/* Flapping luggage baggage tag */}
          <g transform="rotate(12 340 100)">
            <rect
              x="335"
              y="90"
              width="40"
              height="24"
              rx="3"
              fill="#F5D84A"
              stroke="#080808"
              strokeWidth="2"
            />
            <circle cx="342" cy="102" r="3" fill="#FFFFFF" stroke="#080808" strokeWidth="1.5" />
            <line x1="335" y1="90" x2="330" y2="80" stroke="#080808" strokeWidth="1.5" />
            <text x="348" y="105" fontSize="8" fontWeight="bold" fontFamily="sans-serif" fill="#080808">
              HEAVY
            </text>
          </g>

          {/* Wheels struggling underneath */}
          <circle cx="115" cy="190" r="8" fill="#F8F7F1" stroke="#080808" strokeWidth="2.5" />
          <circle cx="115" cy="190" r="3" fill="#080808" />
          <circle cx="335" cy="190" r="8" fill="#F8F7F1" stroke="#080808" strokeWidth="2.5" />
          <circle cx="335" cy="190" r="3" fill="#080808" />
        </g>

        {/* --- OFFICIAL SHORTKING MASCOT STRUGGLING WITH BOTH HANDS --- */}
        <g id="shortking-mascot-struggling">
          {/* Dedicated ground shadow */}
          <ellipse
            cx="-5"
            cy="197"
            rx="60"
            ry="7"
            fill="#080808"
            opacity="0.18"
          />

          {/* Official New ShortKing Pulling Mascot Asset */}
          <g id="shortking-pulling-character">
            <image
              href="/branding/shortking-pulling.webp"
              xlinkHref="/branding/shortking-pulling.png"
              x="-76"
              y="42"
              width="174"
              height="174"
              preserveAspectRatio="xMidYMid meet"
              className="select-none pointer-events-none"
            />
          </g>

          {/* Heavy Brass Anchor Buckle joining the tow cable to the suitcase */}
          <rect
            x="86"
            y="118"
            width="12"
            height="15"
            rx="2.5"
            fill="#F5D84A"
            stroke="#080808"
            strokeWidth="2.2"
          />
          <rect
            x="89.5"
            y="122"
            width="5"
            height="7"
            rx="1"
            fill="#FFFFFF"
            stroke="#080808"
            strokeWidth="1.6"
          />
        </g>
      </svg>
    </div>
  );
};
