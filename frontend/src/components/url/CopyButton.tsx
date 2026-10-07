"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";

interface CopyButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  size = "sm",
  variant = "primary",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={copied ? "secondary" : variant}
      size={size}
      onClick={handleCopy}
      className={`font-bold transition-all cursor-pointer ${
        copied ? "bg-[#C4EBC8] text-[#080808] border-[#080808]" : ""
      } ${className}`}
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <span>✓</span> Copied!
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <span>📋</span> Copy
        </span>
      )}
    </Button>
  );
};
