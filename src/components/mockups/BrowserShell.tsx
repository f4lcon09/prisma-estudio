"use client";

import { ChevronLeft, ChevronRight, Lock, Plus } from "lucide-react";

interface BrowserShellProps {
  url: string;
  children: React.ReactNode;
  compact?: boolean;
  rightBadge?: React.ReactNode;
}

export function BrowserShell({
  url,
  children,
  compact = false,
  rightBadge,
}: BrowserShellProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#1F2A44]/18 bg-[#FAF5EB] shadow-[0_24px_60px_-15px_rgba(31,42,68,0.22)] dark:border-[#F2EFE6]/18 dark:bg-[#F2EFE6] dark:shadow-[0_28px_65px_-12px_rgba(0,0,0,0.5)]">
      <div
        className={`flex items-center justify-between gap-2 border-b border-[#1F2A44]/25 bg-[#1F2A44] px-3 ${
          compact ? "py-2" : "py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          {!compact && (
            <div className="hidden items-center gap-1 text-[#F4EDE0]/50 sm:flex" aria-hidden="true">
              <ChevronLeft className="h-3.5 w-3.5" />
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </div>
          )}
        </div>

        <div className="mx-1 flex min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-[#F4EDE0]/15 bg-[#2A3756] px-2.5 py-1 text-[10px] text-[#F4EDE0]/90 shadow-2xs sm:max-w-[340px]">
          <Lock className="h-2.5 w-2.5 shrink-0 text-[#34D399]" aria-hidden="true" />
          <span className="font-tech truncate">{url}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#F4EDE0]/60">
          {rightBadge ?? <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
        </div>
      </div>

      {children}
    </div>
  );
}
