"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export const UserMenu: React.FC = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/60 border-2 border-[#080808] animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-black text-[#080808] truncate max-w-[130px]">
            {user.name || user.email.split("@")[0]}
          </span>
          <span className="text-[10px] text-[#4B5864] truncate max-w-[120px] font-mono">
            {user.email}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="text-xs font-bold bg-[#FFFFFF] hover:bg-[#FADBD8]"
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm" className="font-bold">
          Log in
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="primary" size="sm" className="font-black">
          Get Started
        </Button>
      </Link>
    </div>
  );
};
