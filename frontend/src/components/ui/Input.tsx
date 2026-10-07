import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-[#080808]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full px-3.5 py-2.5 bg-white border-2 ${
              error
                ? "border-[#E14942] focus:ring-[#E14942]"
                : "border-[#080808] focus:border-[#080808] focus:ring-2 focus:ring-[#F5D84A]"
            } rounded-xl text-[#080808] placeholder:text-[#8898A6] text-sm shadow-[2px_2px_0px_#080808] focus:outline-none transition-all ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-semibold text-[#E14942]">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#4B5864]">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
