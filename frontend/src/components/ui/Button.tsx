import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#080808] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs border-[1.5px]",
    md: "px-4 py-2 text-sm border-2",
    lg: "px-6 py-3.5 text-base border-2",
  };

  const variantStyles = {
    primary:
      "bg-[#F5D84A] hover:bg-[#ECCB2B] text-[#080808] border-[#080808] shadow-[3px_3px_0px_#080808] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#080808] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#080808]",
    secondary:
      "bg-[#F8F7F1] hover:bg-[#FFFFFF] text-[#080808] border-[#080808] shadow-[3px_3px_0px_#080808] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#080808] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#080808]",
    outline:
      "bg-white/70 hover:bg-white text-[#080808] border-[#080808] shadow-[2px_2px_0px_#080808] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#080808] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_#080808]",
    ghost:
      "bg-transparent hover:bg-black/8 text-[#080808] border-transparent active:bg-black/15",
    danger:
      "bg-[#E14942] hover:bg-[#C83B35] text-white border-[#080808] shadow-[3px_3px_0px_#080808] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#080808] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#080808]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
};
