import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#F8F7F1] border-2 border-[#080808] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-[8px_8px_0px_#080808] animate-in zoom-in-95 duration-150 text-[#080808]">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#080808] mb-5">
          {title && <h3 className="text-xl font-black text-[#080808] tracking-tight">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg border-2 border-[#080808] bg-white hover:bg-[#F5D84A] text-[#080808] flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_#080808] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
