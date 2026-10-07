import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "cream" | "white" | "yellow";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "cream",
  ...props
}) => {
  const bgColors = {
    cream: "bg-[#F8F7F1]",
    white: "bg-[#FFFFFF]",
    yellow: "bg-[#FFF9DB]",
  };

  return (
    <div
      className={`${bgColors[variant]} border-2 border-[#080808] rounded-2xl p-6 shadow-[4px_4px_0px_#080808] text-[#080808] transition-all duration-150 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
