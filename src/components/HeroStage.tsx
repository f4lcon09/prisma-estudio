"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig, type HeroModeId } from "@/config/site";
import {
  AutomationProgramScreen,
  MobileProgramMockup,
  SaasProgramScreen,
  SiteProgramScreen,
  TelemetryCardMockup,
} from "@/components/RealMockups";

const modeOrder: HeroModeId[] = ["sites", "sistemas", "automacoes"];

const modeMeta: Record<
  HeroModeId,
  {
    label: string;
    badge: string;
    headlineHighlight: string;
    gradient: string;
    caption: string;
  }
> = {
  sites: {
    label: "Sites",
    badge: "SITES & LANDING PAGES · ALTA CONVERSÃO",
    headlineHighlight: "sites que convertem.",
    gradient: "from-[#D97706] via-[#2563EB] to-[#4F46E5]",
    caption: "Prévia responsiva: site publicado em desktop e celular + métricas ao vivo",
  },
  sistemas: {
    label: "Sistemas",
    badge: "SISTEMAS WEB & SAAS · PAINÉIS SOB MEDIDA",
    headlineHighlight: "sistemas de alto nível.",
    gradient: "from-[#2563EB] via-[#4F46E5] to-[#D97706]",
    caption: "Software web completo com app mobile e monitoramento em tempo real",
  },
  automacoes: {
    label: "Automações",
    badge: "AUTOMAÇÕES & IA · WHATSAPP E CRM",
    headlineHighlight: "automações com IA.",
    gradient: "from-[#059669] via-[#2563EB] to-[#D97706]",
    caption: "Fluxo conectado de ponta a ponta: WhatsApp, agente de IA e CRM",
  },
};

export function HeroStage() {
  const [activeMode, setActiveMode] = useState<HeroModeId>("sites");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveMode((current) => {
        const nextIdx = (modeOrder.indexOf(current) + 1) % modeOrder.length;
        return modeOrder[nextIdx];
      });
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentMeta = modeMeta[activeMode];

  return (
    <section
      id="vitrine"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFBEB]/60 via-[#F8FAFC] to-[#EFF6FF]/70 pb-14 pt-6 sm:pb-20 sm:pt-8"
    >
      {/* Architectural Grid Background fading out softly */}
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_35%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Ambient Top Aurora */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 flex -translate-x-1/2 items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-64 w-96 -translate-x-24 rounded-full bg-amber-300/35 blur-[100px]" />
        <div className="h-64 w-96 translate-x-24 rounded-full bg-blue-400/30 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Top Micro-badge synced with current area */}
        <div
          key={`badge-${activeMode}`}
          className="animate-word-flip inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-gradient-to-r from-amber-50/90 via-white to-blue-50/90 px-3.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-700 shadow-2xs backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3 text-amber-500" aria-hidden="true" />
          <span>{currentMeta.badge}</span>
        </div>

        {/* Short Punchy Display Headline with Smooth 3D Word Transition */}
        <h1 className="mx-auto mt-3.5 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
          Criamos{" "}
          <span
            key={`headline-${activeMode}`}
            className={`animate-word-flip bg-gradient-to-r ${currentMeta.gradient} bg-clip-text text-transparent`}
          >
            {currentMeta.headlineHighlight}
          </span>
        </h1>

        {/* Interactive Mode Switcher with subtle auto-rotation progress */}
        <div className="mt-5 flex justify-center">
          <div
            role="tablist"
            aria-label="Alternar tipo de software na vitrine"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="inline-flex items-center rounded-full border border-blue-200/70 bg-white/85 p-1 shadow-sm backdrop-blur-sm"
          >
            {modeOrder.map((modeId) => {
              const selected = activeMode === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveMode(modeId)}
                  className={`relative overflow-hidden rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm ${
                    selected
                      ? "bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-sm"
                      : "text-slate-600 hover:text-blue-700"
                  }`}
                >
                  <span className="relative z-10">{modeMeta[modeId].label}</span>
                  {selected && !isPaused && (
                    <span
                      key={`progress-${activeMode}`}
                      aria-hidden="true"
                      className="animate-tab-progress absolute inset-x-2 bottom-0.5 h-[2px] rounded-full bg-white/55"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Cobalt CTA */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <a
            href="#orcamento"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_-6px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#1D4ED8] hover:to-[#1E40AF]"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <span
            key={`caption-${activeMode}`}
            className="animate-word-flip text-[11px] font-medium text-slate-500"
          >
            {currentMeta.caption}
          </span>
        </div>

        {/* 3D Interactive Device Stage — pauses auto-rotation while user interacts */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="relative mx-auto mt-7 max-w-5xl"
        >
          {/* Warm Amber Glow (Left) + Cobalt Glow (Right) */}
          <div
            className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 -z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="h-80 w-96 -translate-x-24 rounded-full bg-amber-400/50 blur-[90px] transition-all duration-700" />
            <div className="h-80 w-96 translate-x-24 rounded-full bg-blue-500/45 blur-[90px] transition-all duration-700" />
            <div className="absolute bottom-2 h-44 w-72 rounded-full bg-emerald-400/25 blur-[80px]" />
          </div>

          <div className="relative flex flex-col items-center justify-center gap-6 lg:block lg:min-h-[395px]">
            {/* Left Tilted 3D Phone */}
            <div
              key={`left-${activeMode}`}
              className="animate-stage-left z-20 order-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:absolute lg:bottom-2 lg:left-0 lg:order-none lg:-rotate-6"
            >
              <MobileProgramMockup mode={activeMode} />
            </div>

            {/* Center Real Browser Program Window */}
            <div
              key={`center-${activeMode}`}
              className="animate-stage-center z-10 order-1 w-full max-w-[615px] lg:mx-auto"
            >
              {activeMode === "sistemas" && <SaasProgramScreen />}
              {activeMode === "sites" && <SiteProgramScreen />}
              {activeMode === "automacoes" && <AutomationProgramScreen />}
            </div>

            {/* Right Floating 3D Card */}
            <div
              key={`right-${activeMode}`}
              className="animate-stage-right animate-float-slow z-20 order-3 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:absolute lg:bottom-5 lg:right-0 lg:order-none lg:rotate-3"
            >
              <TelemetryCardMockup mode={activeMode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
