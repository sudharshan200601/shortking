"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  shortCode?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, url, shortCode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: "#080808",
          light: "#FFFFFF",
        },
      })
        .then((uri) => {
          setDataUrl(uri);
        })
        .catch((err) => {
          console.error("QR Code generation error:", err);
        });
    }
  }, [isOpen, url]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `shortking-${shortCode || "qr"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ShortKing QR Code">
      <div className="flex flex-col items-center justify-center p-2 sm:p-4 space-y-4">
        {/* Hand-drawn paper framed QR holder */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border-2 border-[#080808] shadow-[4px_4px_0px_#080808] flex items-center justify-center">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt={`QR Code for ${url}`}
              className="w-56 h-56 object-contain"
            />
          ) : (
            <canvas ref={canvasRef} className="w-56 h-56" />
          )}
        </div>

        {/* Short URL badge */}
        <div className="bg-[#F5D84A] px-3.5 py-1 rounded-full border border-[#080808] shadow-[1.5px_1.5px_0px_#080808]">
          <span className="text-xs font-mono font-bold text-[#080808] break-all">{url}</span>
        </div>

        <p className="text-xs text-[#556270] text-center max-w-xs">
          High-resolution PNG formatted for print, menus, business cards, and slide presentations.
        </p>

        {/* Actions */}
        <div className="flex gap-3 w-full pt-2">
          <Button variant="secondary" size="md" className="flex-1 font-bold" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1 font-black"
            onClick={handleDownload}
            disabled={!dataUrl}
          >
            Download PNG ↓
          </Button>
        </div>
      </div>
    </Modal>
  );
};
