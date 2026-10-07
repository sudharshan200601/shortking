"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/url/CopyButton";
import { QRCodeButton } from "@/components/url/QRCodeButton";
import { ClickChart } from "@/components/dashboard/ClickChart";
import { formatDate } from "@/lib/utils";
import type { ShortUrl, UrlAnalytics, BreakdownItem } from "@shortking/shared";

interface Props {
  params: Promise<{ id: string }>;
}

export default function UrlDetailsPage({ params }: Props) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const { token, loading: authLoading, isAuthenticated } = useAuth();

  const [url, setUrl] = useState<ShortUrl | null>(null);
  const [analytics, setAnalytics] = useState<UrlAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const domain = (process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN || "http://localhost:3000").replace(
    /\/$/,
    "",
  );

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [urlData, analyticsData] = await Promise.all([
          api.getUrl(id, token!),
          api.getUrlAnalytics(id, token!),
        ]);
        setUrl(urlData);
        setAnalytics(analyticsData);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load link data";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, token, authLoading, isAuthenticated, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full border-3 border-[#080808] border-t-[#F5D84A] w-12 h-12" />
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-8 shadow-[6px_6px_0px_#080808] space-y-4">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-black text-[#080808]">Unable to load link</h2>
          <p className="text-xs text-[#556270]">{error || "Link not found or access denied."}</p>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="font-bold">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const fullShortUrl = `${domain}/${url.customAlias || url.shortCode}`;
  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  const renderBreakdownTable = (title: string, items: BreakdownItem[]) => (
    <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-5 shadow-[4px_4px_0px_#080808] space-y-3">
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#080808]/15">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#080808]">
          {title}
        </h3>
        <span className="text-[10px] font-mono text-[#556270]">
          {items.reduce((s, i) => s + i.count, 0)} clicks
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#556270] py-4 text-center">No data recorded</p>
      ) : (
        <div className="space-y-2.5">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-[#080808] truncate max-w-[160px]">{item.label}</span>
                <span className="text-[#556270] font-semibold">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-[#EDF6FC] h-2.5 rounded-full border border-[#080808] overflow-hidden">
                <div
                  className="bg-[#F5D84A] h-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 text-[#080808]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#080808]">
        <Link href="/dashboard" className="hover:underline decoration-[#F5D84A] decoration-2">
          Dashboard
        </Link>
        <span>/</span>
        <span className="bg-[#F5D84A] px-2 py-0.5 rounded border border-[#080808]">
          {url.shortCode}
        </span>
      </div>

      {/* Header Link Card */}
      <div className="bg-[#FFFFFF] border-3 border-[#080808] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[8px_8px_0px_#080808]">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#080808]">
              {fullShortUrl}
            </h1>
            {isExpired ? (
              <Badge variant="warning">Expired</Badge>
            ) : url.isActive ? (
              <Badge variant="success">Active</Badge>
            ) : (
              <Badge variant="danger">Inactive</Badge>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#556270] truncate max-w-xl font-mono">
            Destination:{" "}
            <a
              href={url.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#080808] hover:underline decoration-[#F5D84A] decoration-2 font-bold"
            >
              {url.originalUrl}
            </a>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <CopyButton text={fullShortUrl} size="md" variant="primary" />
          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="md" className="font-bold flex items-center gap-1">
              <span>Open</span>
              <span>↗</span>
            </Button>
          </a>
          <QRCodeButton url={fullShortUrl} shortCode={url.shortCode} size="md" />
        </div>
      </div>

      {/* Clicks Graph */}
      <div>
        <ClickChart data={analytics?.clicksOverTime || []} title="Click Frequency Timeline" />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderBreakdownTable("Devices", analytics?.devices || [])}
        {renderBreakdownTable("Browsers", analytics?.browsers || [])}
        {renderBreakdownTable("Operating Systems", analytics?.operatingSystems || [])}
        {renderBreakdownTable("Referrers", analytics?.referrers || [])}
      </div>

      {/* Metadata Card */}
      <div className="bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-6 shadow-[4px_4px_0px_#080808] space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#080808] pb-2 border-b-2 border-[#080808]/15">
          Link Details & Technical Metadata
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#F8F7F1] border border-[#080808] rounded-xl">
            <span className="text-[#556270] block font-bold text-[10px]">Short Code</span>
            <span className="text-[#080808] font-black text-sm">{url.shortCode}</span>
          </div>
          <div className="p-3 bg-[#F8F7F1] border border-[#080808] rounded-xl">
            <span className="text-[#556270] block font-bold text-[10px]">Custom Vanity Alias</span>
            <span className="text-[#080808] font-black text-sm">{url.customAlias || "None"}</span>
          </div>
          <div className="p-3 bg-[#F8F7F1] border border-[#080808] rounded-xl">
            <span className="text-[#556270] block font-bold text-[10px]">Created At</span>
            <span className="text-[#080808] font-bold">{formatDate(url.createdAt)}</span>
          </div>
          <div className="p-3 bg-[#F8F7F1] border border-[#080808] rounded-xl">
            <span className="text-[#556270] block font-bold text-[10px]">Expires At</span>
            <span className="text-[#080808] font-bold">
              {url.expiresAt ? formatDate(url.expiresAt) : "Never (Indefinite)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
