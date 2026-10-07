"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { KingMascot } from "@/components/illustrations/KingMascot";
import { HandDrawnStar } from "@/components/illustrations/HandDrawnDoodles";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 text-[#080808] relative">
      {/* Decorative stars */}
      <div className="absolute top-12 left-16 pointer-events-none hidden sm:block">
        <HandDrawnStar size={24} />
      </div>
      <div className="absolute bottom-16 right-20 pointer-events-none hidden sm:block">
        <HandDrawnStar size={28} />
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#080808] text-[#080808] space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center -mt-2 mb-1">
            <div className="w-28 h-28">
              <KingMascot />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#080808] tracking-tight">
            Welcome back, Your Majesty.
          </h1>
          <p className="text-xs text-[#556270]">
            Sign in to manage and analyze your ShortKing link fleet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="developer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 bg-[#FADBD8] border-2 border-[#E14942] rounded-xl text-[#080808] text-xs font-bold shadow-[2px_2px_0px_#E14942] animate-in fade-in">
              <span>⚠️ {error}</span>
            </div>
          )}

          <Button type="submit" isLoading={loading} size="lg" className="w-full font-black mt-2">
            Sign In ✂
          </Button>
        </form>

        <div className="pt-4 border-t-2 border-[#080808]/15 text-center text-xs font-bold text-[#556270]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#080808] underline decoration-[#F5D84A] decoration-2">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
