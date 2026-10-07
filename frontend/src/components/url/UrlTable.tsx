"use client";

import React from "react";
import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { QRCodeButton } from "./QRCodeButton";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { formatDate } from "../../lib/utils";
import { KingMascot } from "../illustrations/KingMascot";
import type { ShortUrl } from "@shortking/shared";

interface UrlTableProps {
  urls: ShortUrl[];
  loading: boolean;
  onDelete?: (id: string) => Promise<void>;
  domain?: string;
}

export const UrlTable: React.FC<UrlTableProps> = ({
  urls,
  loading,
  onDelete,
  domain = process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN || "http://localhost:3000",
}) => {
  if (loading) {
    return (
      <div className="w-full bg-[#FFFFFF] border-2 border-[#080808] rounded-2xl p-12 text-center space-y-4 shadow-[4px_4px_0px_#080808]">
        <div className="animate-spin rounded-full border-3 border-[#080808] border-t-[#F5D84A] w-9 h-9 mx-auto" />
        <p className="text-xs font-mono font-bold text-[#080808]">Fetching your shortened links...</p>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] border-3 border-dashed border-[#080808] rounded-2xl p-10 sm:p-14 text-center space-y-3 shadow-[4px_4px_0px_#080808]">
        <div className="flex justify-center mb-1">
          <div className="w-24 h-24">
            <KingMascot />
          </div>
        </div>
        <h3 className="text-xl font-black text-[#080808]">No links yet.</h3>
        <p className="font-hand font-bold text-base text-[#080808] bg-[#F5D84A] px-3 py-0.5 rounded-full border border-[#080808] w-fit mx-auto shadow-[1.5px_1.5px_0px_#080808]">
          &quot;Give your first URL a haircut.&quot;
        </p>
        <p className="text-xs text-[#556270] max-w-sm mx-auto pt-1">
          Shorten your first bloated link using the creator above to start tracking clicks,
          devices, and traffic here.
        </p>
      </div>
    );
  }

  const cleanDomain = domain.replace(/\/$/, "");

  return (
    <div className="w-full overflow-hidden border-3 border-[#080808] rounded-2xl bg-[#FFFFFF] shadow-[6px_6px_0px_#080808] text-[#080808]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#080808]">
          <thead className="bg-[#F8F7F1] text-[11px] uppercase tracking-wider font-mono font-black text-[#080808] border-b-2 border-[#080808]">
            <tr>
              <th className="px-5 py-3.5">Short URL</th>
              <th className="px-5 py-3.5">Original Destination</th>
              <th className="px-5 py-3.5 text-center">Clicks</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Created</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 border-[#080808]/15">
            {urls.map((url) => {
              const fullShortUrl = `${cleanDomain}/${url.customAlias || url.shortCode}`;
              const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

              return (
                <tr key={url.id} className="hover:bg-[#EDF6FC]/60 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/${url.id}`}
                        className="hover:underline decoration-[#F5D84A] decoration-2 flex items-center gap-1 text-[#080808]"
                      >
                        {fullShortUrl}
                      </Link>
                      <CopyButton text={fullShortUrl} size="sm" variant="outline" />
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-xs truncate text-[#556270] font-mono">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#080808] hover:underline transition-colors"
                      title={url.originalUrl}
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-center font-mono font-black">
                    <span className="px-2 py-0.5 bg-[#F5D84A] border border-[#080808] rounded-md text-xs shadow-[1px_1px_0px_#080808]">
                      {url.clickCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {isExpired ? (
                      <Badge variant="warning">Expired</Badge>
                    ) : url.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="danger">Inactive</Badge>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#556270] whitespace-nowrap">
                    {formatDate(url.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/dashboard/${url.id}`}>
                        <Button variant="outline" size="sm" className="font-bold text-xs">
                          📊 Analytics
                        </Button>
                      </Link>

                      <QRCodeButton url={fullShortUrl} shortCode={url.shortCode} size="sm" />

                      {url.isActive && onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(url.id)}
                          className="text-xs text-[#E14942] hover:bg-[#FADBD8] font-bold"
                        >
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
