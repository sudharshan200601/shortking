"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentUrls } from "@/components/dashboard/RecentUrls";
import { UrlTable } from "@/components/url/UrlTable";
import { UrlShortener } from "@/components/url/UrlShortener";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useUrls } from "@/hooks/useUrls";
import { KingMascot } from "@/components/illustrations/KingMascot";
import { KingHeadIcon } from "@/components/illustrations/KingHeadIcon";
import type { UrlStatusFilter, UrlSortOption } from "@shortking/shared";

export default function DashboardPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const {
    urls,
    pagination,
    loading: urlsLoading,
    query,
    setQuery,
    fetchUrls,
    deleteUrl,
  } = useUrls({ page: 1, limit: 10, filter: "all", sortBy: "newest" });

  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full border-3 border-[#080808] border-t-[#F5D84A] w-12 h-12" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-8 shadow-[8px_8px_0px_#080808] space-y-4">
          <div className="flex justify-center -mt-2">
            <div className="w-24 h-24">
              <KingMascot />
            </div>
          </div>
          <h1 className="text-2xl font-black text-[#080808]">Sign in to your Dashboard</h1>
          <p className="text-xs text-[#556270] leading-relaxed">
            Monitor real-time click analytics, manage custom vanity aliases, and download print-ready QR codes for all your shortened links.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/login" className="flex-1">
              <Button variant="primary" size="lg" className="w-full font-black">
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button variant="outline" size="lg" className="w-full font-bold">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalClicks = urls.reduce((sum, u) => sum + u.clickCount, 0);
  const activeCount = urls.filter((u) => u.isActive).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = { ...query, page: 1, search: searchInput.trim() || undefined };
    setQuery(newQuery);
    fetchUrls(newQuery);
  };

  const handleFilterChange = (filter: UrlStatusFilter) => {
    const newQuery = { ...query, page: 1, filter };
    setQuery(newQuery);
    fetchUrls(newQuery);
  };

  const handleSortChange = (sortBy: UrlSortOption) => {
    const newQuery = { ...query, page: 1, sortBy };
    setQuery(newQuery);
    fetchUrls(newQuery);
  };

  const handlePageChange = (newPage: number) => {
    const newQuery = { ...query, page: newPage };
    setQuery(newQuery);
    fetchUrls(newQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 text-[#080808]">
      {/* Dashboard Top Banner */}
      <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[6px_6px_0px_#080808]">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <KingHeadIcon size={44} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5D84A] border border-[#080808] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
              <span>👑 Link Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#080808] tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#556270] mt-0.5">
              Welcome back,{" "}
              <span className="font-bold text-[#080808] underline decoration-[#F5D84A] decoration-2">
                {user?.name || user?.email}
              </span>
              . Here is your active link fleet.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowCreateDrawer(!showCreateDrawer)}
          className="font-black"
        >
          {showCreateDrawer ? "✕ Close Form" : "+ Create New Link ✂"}
        </Button>
      </div>

      {/* Inline Shortener Widget Drawer */}
      {showCreateDrawer && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-200">
          <UrlShortener
            autoFocus
            onSuccess={() => {
              fetchUrls();
            }}
          />
        </div>
      )}

      {/* Aggregate Stats */}
      <DashboardStats
        totalUrls={pagination?.total || urls.length}
        totalClicks={totalClicks}
        activeUrls={activeCount}
      />

      {/* Main Grid: Controls + Table + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Search, Filter, Sort Controls */}
          <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#080808] flex flex-col md:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="w-full md:w-80 flex gap-2">
              <input
                type="text"
                placeholder="Search slug, code, or URL..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#F8F7F1] border-2 border-[#080808] rounded-xl text-xs text-[#080808] placeholder:text-[#8898A6] focus:outline-none focus:ring-2 focus:ring-[#F5D84A] font-mono shadow-[1.5px_1.5px_0px_#080808]"
              />
              <Button type="submit" variant="secondary" size="sm" className="font-bold">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[#556270] font-bold">Filter:</span>
                <select
                  value={query.filter || "all"}
                  onChange={(e) => handleFilterChange(e.target.value as UrlStatusFilter)}
                  className="bg-[#F8F7F1] border-2 border-[#080808] rounded-xl px-2.5 py-1.5 text-[#080808] font-bold focus:outline-none focus:ring-2 focus:ring-[#F5D84A] text-xs shadow-[1.5px_1.5px_0px_#080808]"
                >
                  <option value="all">All Links</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[#556270] font-bold">Sort:</span>
                <select
                  value={query.sortBy || "newest"}
                  onChange={(e) => handleSortChange(e.target.value as UrlSortOption)}
                  className="bg-[#F8F7F1] border-2 border-[#080808] rounded-xl px-2.5 py-1.5 text-[#080808] font-bold focus:outline-none focus:ring-2 focus:ring-[#F5D84A] text-xs shadow-[1.5px_1.5px_0px_#080808]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most_clicks">Most Clicks</option>
                  <option value="least_clicks">Least Clicks</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <UrlTable
            urls={urls}
            loading={urlsLoading}
            onDelete={async (id) => {
              if (confirm("Are you sure you want to deactivate this link?")) {
                await deleteUrl(id);
              }
            }}
          />

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs font-mono font-bold text-[#080808]">
              <span>
                Page <strong className="bg-[#F5D84A] px-1.5 py-0.5 rounded border border-[#080808]">{pagination.page}</strong> of{" "}
                <strong>{pagination.totalPages}</strong> ({pagination.total} total links)
              </span>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="font-bold"
                >
                  ← Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="font-bold"
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentUrls urls={urls} />
        </div>
      </div>
    </div>
  );
}
