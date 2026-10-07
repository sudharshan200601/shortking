import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "default" | "yellow";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const styles = {
    default: "bg-[#F8F7F1] text-[#080808] border-[#080808]",
    yellow: "bg-[#F5D84A] text-[#080808] border-[#080808]",
    warning: "bg-[#FDE879] text-[#080808] border-[#080808]",
    success: "bg-[#C4EBC8] text-[#080808] border-[#080808]",
    danger: "bg-[#FADBD8] text-[#080808] border-[#080808]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border-1.5 shadow-[1.5px_1.5px_0px_#080808] ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
