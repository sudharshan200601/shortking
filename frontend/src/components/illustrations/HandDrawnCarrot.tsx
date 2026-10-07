import React from "react";

// Variant 1: "Classic Doodle Carrot" (Tapered body, upright leaves, horizontal creases)
export const HandDrawnCarrotV1: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 44, height = 75, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 50 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Green Leafy Top */}
    <g className="leaf-group">
      {/* Left Leaf Frond */}
      <path
        d="M 22 25 C 16 18, 10 16, 7 8 C 13 9, 19 14, 23 23 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Tall Leaf Frond */}
      <path
        d="M 24 24 C 23 14, 24 7, 26 2 C 28 8, 29 15, 27 24 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Leaf Frond */}
      <path
        d="M 26 24 C 30 16, 37 12, 42 6 C 41 12, 35 18, 27 25 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Leaf Vein Sketch Lines */}
      <path d="M 25 24 L 26 7" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 23 23 L 13 12" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 27 24 L 37 10" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Orange Carrot Body */}
    <path
      d="M 17 25 C 13 26, 12 29, 14 34 C 16 42, 19 56, 22 75 C 23 79, 25 80, 26 79 C 28 75, 33 58, 36 38 C 37 31, 36 26, 31 25 C 28 24, 20 24, 17 25 Z"
      fill="#FF7A1A"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Hand-Drawn Sketch Creases on Body */}
    <path
      d="M 17 36 C 22 34, 27 35, 33 37"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 20 48 C 24 47, 28 47, 31 49"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 21 61 C 24 60, 27 60, 29 62"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 2: "Curved Dynamic Carrot" (Organic curve, swept leafy crown)
export const HandDrawnCarrotV2: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 80, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 55 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Green Leafy Top - swept */}
    <g className="leaf-group">
      <path
        d="M 22 25 C 15 19, 10 14, 9 6 C 16 9, 21 16, 24 24 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 24 24 C 25 15, 30 8, 35 3 C 33 11, 30 18, 26 24 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 26 24 C 33 19, 41 17, 48 13 C 44 20, 36 23, 27 25 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 24 24 L 32 7" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 23 23 L 13 11" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 27 24 L 43 16" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Curved Orange Carrot Body */}
    <path
      d="M 16 26 C 12 28, 12 32, 14 38 C 17 48, 22 62, 29 77 C 31 82, 33 83, 34 81 C 36 76, 39 58, 38 41 C 38 33, 36 27, 30 26 C 26 25, 20 25, 16 26 Z"
      fill="#FF7A1A"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Hand-Drawn Sketch Creases */}
    <path
      d="M 17 38 C 23 37, 30 39, 35 41"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 20 51 C 26 50, 31 52, 36 54"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 24 64 C 28 63, 31 64, 34 66"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 3: "Cute Chunky Carrot" (Shorter, plumper, friendly cartoon style)
export const HandDrawnCarrotV3: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 42, height = 62, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 52 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Bushy Green Leaves */}
    <g className="leaf-group">
      <path
        d="M 22 23 C 14 17, 9 13, 8 5 C 16 7, 20 14, 23 22 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 25 22 C 24 13, 25 6, 26 1 C 28 7, 29 14, 27 22 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 27 22 C 33 15, 39 12, 45 6 C 43 13, 36 18, 28 23 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 25 21 L 26 5" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 22 21 L 13 9" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 28 22 L 39 10" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Chunky Orange Body */}
    <path
      d="M 15 24 C 9 26, 9 32, 12 38 C 16 46, 20 55, 24 63 C 25 66, 27 66, 28 64 C 32 56, 38 46, 40 37 C 42 30, 40 25, 33 24 C 29 23, 19 23, 15 24 Z"
      fill="#FF7A1A"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Cute Creases */}
    <path
      d="M 16 34 C 23 32, 31 33, 36 35"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 19 45 C 24 43, 29 44, 33 46"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 22 54 C 25 53, 28 53, 30 55"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 4: "Action Carrot" (With trailing sketchy speed lines & tiny sparkle doodle)
export const HandDrawnCarrotV4: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  showMotionLines?: boolean;
  showSparkle?: boolean;
}> = ({
  width = 62,
  height = 78,
  className = "",
  showMotionLines = true,
  showSparkle = true,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 76 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Optional Tiny Hand-Drawn Yellow Sparkle Doodle */}
    {showSparkle && (
      <g className="sparkle-doodle">
        <path
          d="M 8 16 C 8.5 20, 12 23, 16 23.5 C 12 24, 8.5 27, 8 31 C 7.5 27, 4 24, 0 23.5 C 4 23, 7.5 20, 8 16 Z"
          fill="#F5D84A"
          stroke="#080808"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    )}

    {/* Green Leafy Top */}
    <g className="leaf-group">
      <path
        d="M 32 27 C 26 20, 20 18, 17 10 C 23 11, 29 16, 33 25 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 34 26 C 33 16, 34 9, 36 4 C 38 10, 39 17, 37 26 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 36 26 C 40 18, 47 14, 52 8 C 51 14, 45 20, 37 27 Z"
        fill="#2B9348"
        stroke="#080808"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 35 26 L 36 8" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 33 25 L 22 13" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 37 26 L 47 11" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" />
    </g>

    {/* Carrot Body */}
    <path
      d="M 27 27 C 23 28, 22 31, 24 36 C 26 44, 29 58, 32 77 C 33 81, 35 82, 36 81 C 38 77, 43 60, 46 40 C 47 33, 46 28, 41 27 C 38 26, 30 26, 27 27 Z"
      fill="#FF7A1A"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Creases */}
    <path
      d="M 27 38 C 32 36, 37 37, 43 39"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 30 50 C 34 49, 38 49, 41 51"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 31 63 C 34 62, 37 62, 39 64"
      stroke="#080808"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Optional Trailing Motion / Speed Lines */}
    {showMotionLines && (
      <g className="motion-lines">
        <path
          d="M 47 62 C 53 64, 59 68, 65 74"
          stroke="#080808"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 52 50 C 58 53, 64 57, 71 63"
          stroke="#080808"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 57 38 C 62 40, 67 43, 73 47"
          stroke="#080808"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
      </g>
    )}
  </svg>
);

// Main composite HandDrawnCarrot component
export interface HandDrawnCarrotProps {
  variant?: 1 | 2 | 3 | 4;
  width?: number;
  height?: number;
  className?: string;
  flip?: boolean;
  showMotionLines?: boolean;
  showSparkle?: boolean;
}

export const HandDrawnCarrot: React.FC<HandDrawnCarrotProps> = ({
  variant = 1,
  width,
  height,
  className = "",
  flip = false,
  showMotionLines = true,
  showSparkle = true,
}) => {
  const flipClass = flip ? "scale-x-[-1]" : "";
  const combinedClass = `${flipClass} ${className}`.trim();

  switch (variant) {
    case 1:
      return <HandDrawnCarrotV1 width={width} height={height} className={combinedClass} />;
    case 2:
      return <HandDrawnCarrotV2 width={width} height={height} className={combinedClass} />;
    case 3:
      return <HandDrawnCarrotV3 width={width} height={height} className={combinedClass} />;
    case 4:
      return (
        <HandDrawnCarrotV4
          width={width}
          height={height}
          className={combinedClass}
          showMotionLines={showMotionLines}
          showSparkle={showSparkle}
        />
      );
    default:
      return <HandDrawnCarrotV1 width={width} height={height} className={combinedClass} />;
  }
};
