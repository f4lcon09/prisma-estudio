"use client";

import { ChevronLeft, ChevronRight, Lock, Plus } from "lucide-react";
import { paletteVars, type MockupPaletteId } from "@/components/mockups/palettes";
import { brandDomain, paletteOptionVars, useMockupCustomization } from "@/components/mockups/MockupCustomization";

interface BrowserShellProps {
  url: string;
  children: React.ReactNode;
  compact?: boolean;
  rightBadge?: React.ReactNode;
  palette?: MockupPaletteId;
}

export function BrowserShell({
  url,
  children,
  compact = false,
  rightBadge,
  palette,
}: BrowserShellProps) {
  const custom = useMockupCustomization();
  const style = custom.palette ? paletteOptionVars(custom.palette) : palette ? paletteVars(palette) : undefined;
  // Com nome personalizado, a barra mostra a prévia do visitante dentro do endereço do estúdio (nunca um domínio real)
  const shownUrl = custom.brandName?.trim() && brandDomain(custom.brandName) ? `prisma.estudio/previa/${brandDomain(custom.brandName)}` : url;
  return (
    <div
      data-palette={palette}
      style={style}
      className="w-full min-w-0 overflow-hidden rounded-[14px] border border-black/10 bg-(--m-bg,#FFFFFF) shadow-[0_30px_60px_-20px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.06)] dark:border-white/10 dark:shadow-[0_30px_70px_-16px_rgba(0,0,0,0.7)]">
      <div
        className={`flex items-center justify-between gap-2 border-b border-black/8 bg-[#EEF0F3]/90 px-3 backdrop-blur-xl ${
          compact ? "py-2" : "py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] ring-[0.5px] ring-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] ring-[0.5px] ring-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] ring-[0.5px] ring-black/10" />
          </div>
          {!compact && (
            <div className="hidden items-center gap-1 text-black/35 sm:flex" aria-hidden="true">
              <ChevronLeft className="h-3.5 w-3.5" />
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </div>
          )}
        </div>

        <div className="mx-1 flex min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-black/[0.055] px-2.5 py-1 text-[10px] text-black/70 sm:max-w-[340px]">
          <Lock className="h-2.5 w-2.5 shrink-0 text-black/45" aria-hidden="true" />
          <span className="truncate font-medium">{shownUrl}</span>
        </div>

        <div className="flex items-center gap-1.5 text-black/40">
          {rightBadge ?? <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
        </div>
      </div>

      {/* Corpo com rolagem própria: a altura vem de --mock-h (definida por quem exibe o mockup) */}
      <div className="max-h-(--mock-h,560px) overflow-y-auto overscroll-contain [scrollbar-width:thin]">{children}</div>
    </div>
  );
}
