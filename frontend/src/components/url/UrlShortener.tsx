"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { ResultCard } from "../result-card/ResultCard";
import { KingMascot } from "../illustrations/KingMascot";
import { KingHeadIcon } from "../illustrations/KingHeadIcon";
import { api } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import type { CreateUrlResponse } from "@shortking/shared";

interface UrlShortenerProps {
  onSuccess?: (created: CreateUrlResponse) => void;
  className?: string;
  autoFocus?: boolean;
}

export const UrlShortener: React.FC<UrlShortenerProps> = ({
  onSuccess,
  className = "",
  autoFocus = false,
}) => {
  const { token } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateUrlResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = originalUrl.trim();
    if (!trimmed) {
      setError("Please paste a URL to shorten");
      return;
    }

    if (!/^https?:\/\//i.test(trimmed)) {
      setError("Please include http:// or https:// at the beginning of the URL");
      return;
    }

    setIsCompressing(true);

    try {
      const payload: {
        originalUrl: string;
        customAlias?: string;
        expiresAt?: string;
      } = {
        originalUrl: trimmed,
      };

      if (customAlias.trim()) {
        payload.customAlias = customAlias.trim();
      }

      if (expiresAt) {
        payload.expiresAt = new Date(expiresAt).toISOString();
      }

      // Execute actual API request without artificial delay
      const res = await api.shortenUrl(payload, token || undefined);
      setResult(res);
      if (onSuccess) {
        onSuccess(res);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to shorten URL";
      setError(message);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    setOriginalUrl("");
    setCustomAlias("");
    setExpiresAt("");
    setError(null);
    setResult(null);
  };

  return (
    <div id="shorten" className={`w-full max-w-3xl mx-auto ${className}`}>
      {result ? (
        <ResultCard result={result} onReset={handleReset} />
      ) : (
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-5 sm:p-7 shadow-[8px_8px_0px_#080808] text-[#080808] relative transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Visual Compression Active Animation Banner */}
            {isCompressing && (
              <div className="p-3 bg-[#F5D84A] border-2 border-[#080808] rounded-xl flex items-center justify-center gap-3 shadow-[2px_2px_0px_#080808]">
                <div className="w-10 h-10 shrink-0">
                  <KingMascot isChopping={true} />
                </div>
                <span className="font-mono text-xs font-black tracking-wider uppercase text-[#080808]">
                  ShortKing is giving your URL a haircut...
                </span>
                <span className="text-base animate-scissors inline-block">✂️</span>
              </div>
            )}

            {/* Main Hero Input Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base">
                  <span>🔗</span>
                </div>
                <input
                  type="text"
                  autoFocus={autoFocus}
                  placeholder="Paste your long URL here... (e.g. https://example.com/very/long/page)"
                  value={originalUrl}
                  disabled={isCompressing}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3.5 sm:py-4 bg-[#F8F7F1] border-2 border-[#080808] focus:border-[#080808] focus:bg-white rounded-xl text-[#080808] placeholder:text-[#6C7A87] text-sm sm:text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#F5D84A] shadow-[2px_2px_0px_#080808] transition-all disabled:opacity-70 ${
                    isCompressing ? "scale-98 transition-transform" : ""
                  }`}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isCompressing}
                className="whitespace-nowrap font-black text-base px-8 py-3.5 sm:py-4 bg-[#F5D84A] hover:bg-[#ECCB2B] text-[#080808] border-2 border-[#080808] shadow-[4px_4px_0px_#080808] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#080808] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#080808] cursor-pointer"
              >
                {isCompressing ? (
                  <span className="flex items-center gap-1.5">
                    <KingHeadIcon size={20} />
                    <span>Shortening...</span>
                  </span>
                ) : (
                  "Shorten URL ✂"
                )}
              </Button>
            </div>

            {/* Controls Bar: Toggle Custom Alias & Expiration */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="text-[#080808] hover:text-[#080808] font-bold flex items-center gap-1.5 transition-colors underline decoration-[#080808] decoration-1 underline-offset-4 cursor-pointer self-start"
              >
                <span>{showOptions ? "▲ Hide advanced options" : "▼ Custom alias & link expiration"}</span>
              </button>

              <div className="flex items-center gap-2 text-[#4B5864] font-medium text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#2B9348]" />
                <span>Instant fastify redirects • Zero tracking cookies</span>
              </div>
            </div>

            {/* Expandable Advanced Options */}
            {showOptions && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-[#080808]/15 animate-in fade-in slide-in-from-top-2 duration-150">
                <Input
                  label="Custom Vanity Alias (optional)"
                  placeholder="e.g. spring-sale or demo"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  helperText="Letters, numbers, hyphens, and underscores (3-64 chars)"
                />
                <Input
                  label="Expiration Date (optional)"
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  helperText="Link returns semantic HTTP 410 Gone after this date"
                />
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="p-3 bg-[#FADBD8] border-2 border-[#E14942] rounded-xl text-[#080808] text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_#E14942] animate-in fade-in">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
