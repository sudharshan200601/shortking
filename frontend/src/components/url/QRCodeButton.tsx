"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { QRCodeModal } from "./QRCodeModal";

interface QRCodeButtonProps {
  url: string;
  shortCode?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const QRCodeButton: React.FC<QRCodeButtonProps> = ({
  url,
  shortCode,
  size = "sm",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size={size}
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 font-bold cursor-pointer ${className}`}
      >
        <span>📱</span>
        <span>QR Code</span>
      </Button>

      <QRCodeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={url}
        shortCode={shortCode}
      />
    </>
  );
};
