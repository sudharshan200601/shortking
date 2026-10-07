import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScissorsIllustration } from "@/components/illustrations/ScissorsIllustration";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 text-[#080808]">
      <div className="max-w-md w-full bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#080808] text-center space-y-6">
        <div className="flex justify-center">
          <ScissorsIllustration className="w-20 h-18" cutting={false} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold bg-[#FADBD8] px-2.5 py-0.5 rounded border border-[#080808]">
            HTTP 404 • Missing Link
          </span>
          <h1 className="text-3xl font-black text-[#080808] tracking-tight">
            URL Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#556270]">
            Maybe this URL got trimmed a little too short, or the link expired and was deactivated.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full font-black">
              ← Return to ShortKing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
