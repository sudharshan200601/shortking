import React from "react";

// Variant 1: "Fluffy Classic" (Wide 5-puff editorial cloud)
export const HandDrawnCloudV1: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 120, height = 60, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Cloud Body */}
    <path
      d="M 26 48 C 16 48, 7 43, 7 32 C 7 21, 18 18, 26 20 C 31 9, 49 7, 60 16 C 69 9, 87 11, 91 23 C 102 23, 113 32, 107 43 C 102 50, 90 48, 82 48 C 72 50, 52 48, 42 49 C 34 49, 29 48, 26 48 Z"
      fill="#F8F7F1"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Internal sketch contour near bottom */}
    <path
      d="M 34 44 C 44 42, 54 45, 66 43 C 74 42, 82 44, 88 43"
      stroke="#080808"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    {/* Subtle inner arc under top puff */}
    <path
      d="M 52 23 C 58 19, 66 21, 72 26"
      stroke="#080808"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 2: "Cumulus Billow" (Taller puffy cloud with central rise)
export const HandDrawnCloudV2: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 95, height = 65, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 95 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path
      d="M 20 54 C 10 54, 4 47, 5 36 C 6 25, 16 22, 22 24 C 25 10, 44 8, 52 18 C 58 12, 72 13, 76 25 C 87 27, 92 40, 84 50 C 78 55, 68 53, 58 54 C 45 55, 32 53, 20 54 Z"
      fill="#F8F7F1"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lower sketch line */}
    <path
      d="M 28 47 C 38 45, 48 48, 58 46 C 66 45, 72 47, 76 46"
      stroke="#080808"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 3.5"
    />
    {/* Inner billow arc */}
    <path
      d="M 35 25 C 41 20, 49 22, 53 28"
      stroke="#080808"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 3: "Wispy Stratus" (Elongated, gentle floating cloud)
export const HandDrawnCloudV3: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 140, height = 48, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path
      d="M 22 38 C 12 38, 5 33, 6 24 C 7 15, 17 13, 24 15 C 30 7, 48 6, 58 13 C 68 6, 88 7, 94 16 C 104 10, 120 12, 126 22 C 135 25, 136 34, 128 38 C 118 41, 98 38, 80 39 C 62 40, 42 38, 22 38 Z"
      fill="#F8F7F1"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Elongated dash shade */}
    <path
      d="M 32 34 C 48 32, 64 35, 80 33 C 94 32, 108 34, 118 33"
      stroke="#080808"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="5 4"
    />
    <path
      d="M 72 17 C 78 13, 86 15, 92 20"
      stroke="#080808"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Variant 4: "Puffy Petite" (Compact, cute 3-puff accent cloud)
export const HandDrawnCloudV4: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 65, height = 40, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 65 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path
      d="M 16 32 C 8 32, 4 27, 5 20 C 6 13, 14 11, 19 13 C 24 5, 38 4, 45 11 C 52 6, 60 10, 61 18 C 65 24, 62 30, 55 32 C 45 33, 30 32, 16 32 Z"
      fill="#F8F7F1"
      stroke="#080808"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner sketch detail */}
    <path
      d="M 22 28 C 30 26, 40 28, 48 27"
      stroke="#080808"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="2.5 3"
    />
  </svg>
);

// Variant 5: "Bubbly Cloudlet" (Asymmetric 4-puff cloud)
export const HandDrawnCloudV5: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 85, height = 50, className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 85 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path
      d="M 18 42 C 9 42, 4 36, 5 27 C 6 18, 15 16, 21 17 C 26 8, 42 7, 50 15 C 57 10, 71 12, 74 22 C 82 25, 83 36, 75 41 C 67 44, 45 42, 18 42 Z"
      fill="#F8F7F1"
      stroke="#080808"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 26 38 C 36 36, 48 38, 60 36 C 68 35, 72 37, 74 37"
      stroke="#080808"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3.5 3.5"
    />
    <path
      d="M 36 21 C 41 18, 47 19, 51 24"
      stroke="#080808"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Main composite component with easy variant selection and flipping
export interface HandDrawnCloudProps {
  variant?: 1 | 2 | 3 | 4 | 5;
  width?: number;
  height?: number;
  className?: string;
  flip?: boolean;
}

export const HandDrawnCloud: React.FC<HandDrawnCloudProps> = ({
  variant = 1,
  width,
  height,
  className = "",
  flip = false,
}) => {
  const flipClass = flip ? "scale-x-[-1]" : "";
  const combinedClass = `${flipClass} ${className}`.trim();

  switch (variant) {
    case 1:
      return <HandDrawnCloudV1 width={width} height={height} className={combinedClass} />;
    case 2:
      return <HandDrawnCloudV2 width={width} height={height} className={combinedClass} />;
    case 3:
      return <HandDrawnCloudV3 width={width} height={height} className={combinedClass} />;
    case 4:
      return <HandDrawnCloudV4 width={width} height={height} className={combinedClass} />;
    case 5:
      return <HandDrawnCloudV5 width={width} height={height} className={combinedClass} />;
    default:
      return <HandDrawnCloudV1 width={width} height={height} className={combinedClass} />;
  }
};
