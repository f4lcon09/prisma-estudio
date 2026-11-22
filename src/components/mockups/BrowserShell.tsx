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
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#1A1715]/16 bg-[#FAF6EE] shadow-[0_24px_55px_-16px_rgba(26,23,21,0.22)] dark:border-[#ECE5D8]/16 dark:bg-[#FAF6EE] dark:shadow-[0_28px_65px_-12px_rgba(0,0,0,0.55)]">
      <div
        className={`flex items-center justify-between gap-2 border-b border-[#1A1715]/25 bg-[#231F1C] px-3 ${
          compact ? "py-2" : "py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D86C5C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#C8A464]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#6FA37A]" />
          </div>
          {!compact && (
            <div className="hidden items-center gap-1 text-[#EAE3D5]/45 sm:flex" aria-hidden="true">
              <ChevronLeft className="h-3.5 w-3.5" />
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </div>
          )}
        </div>

        <div className="mx-1 flex min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-[#EAE3D5]/12 bg-[#1A1715] px-2.5 py-1 text-[10px] text-[#EAE3D5]/90 shadow-2xs sm:max-w-[340px]">
          <Lock className="h-2.5 w-2.5 shrink-0 text-[#9CAF88]" aria-hidden="true" />
          <span className="font-tech truncate">{url}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#EAE3D5]/55">
          {rightBadge ?? <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
        </div>
      </div>

      {children}
    </div>
  );
}
