"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig, type HeroModeId } from "@/config/site";
import {
  AutomationProgramScreen,
  MobileProgramMockup,
  SaasProgramScreen,
  SiteProgramScreen,
  TelemetryCardMockup,
} from "@/components/RealMockups";
import "@/components/HeroStage.css";

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
    gradient:
      "from-[#D85D2A] via-[#B44622] to-[#1F2A44] dark:from-[#E05A3A] dark:via-[#F28B6B] dark:to-[#60A5FA]",
    caption: "Prévia responsiva: site publicado em desktop e celular + métricas ao vivo",
  },
  sistemas: {
    label: "Sistemas",
    badge: "SISTEMAS WEB & SAAS · PAINÉIS SOB MEDIDA",
    headlineHighlight: "sistemas de alto nível.",
    gradient:
      "from-[#1F2A44] via-[#2A52BE] to-[#D85D2A] dark:from-[#60A5FA] dark:via-[#93C5FD] dark:to-[#E05A3A]",
    caption: "Software web completo com app mobile e monitoramento em tempo real",
  },
  automacoes: {
    label: "Automações",
    badge: "AUTOMAÇÕES & IA · WHATSAPP E CRM",
    headlineHighlight: "automações com IA.",
    gradient:
      "from-[#D85D2A] via-[#1F2A44] to-[#167953] dark:from-[#E05A3A] dark:via-[#F28B6B] dark:to-[#34D399]",
    caption: "Fluxo conectado de ponta a ponta: WhatsApp, agente de IA e CRM",
  },
};

export function HeroStage() {
  // Monotonic step counter so the 3D roulette drum always spins forward cleanly
  const [stepCount, setStepCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndex = ((stepCount % modeOrder.length) + modeOrder.length) % modeOrder.length;
  const activeMode = modeOrder[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setStepCount((prev) => prev + 1);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function selectMode(targetMode: HeroModeId) {
    const targetIdx = modeOrder.indexOf(targetMode);
    const forwardDelta = (targetIdx - activeIndex + modeOrder.length) % modeOrder.length;
    if (forwardDelta === 0) return;
    setStepCount((prev) => prev + forwardDelta);
  }

  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const tiltX = ((xPct - 50) / 50) * 1.4;
    const tiltY = ((50 - yPct) / 50) * 1.1;
    el.style.setProperty("--mx", `${xPct.toFixed(2)}%`);
    el.style.setProperty("--my", `${yPct.toFixed(2)}%`);
    el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section
      id="vitrine"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="ps-hero-section overflow-hidden bg-[#F4EDE0] pb-14 pt-6 transition-colors duration-300 sm:pb-20 sm:pt-8 dark:bg-[#182032]"
    >
      {/* Architectural Grid + Tactile Studio Grain */}
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_80%_at_50%_35%,black_45%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="ps-hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="ps-hero-light pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Light Mode Structural Navy Band Anchoring the Lower Stage (per Cream/Navy/Terracotta mockup) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[#1F2A44] sm:h-32 dark:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-10">
        {/* Top Studio Spec Tag (crisp registration dot, no generic AI sparkles) */}
        <div className="inline-grid items-center justify-items-center">
          {modeOrder.map((modeId) => {
            const active = activeMode === modeId;
            return (
              <div
                key={modeId}
                aria-hidden={!active}
                className={`font-tech col-start-1 row-start-1 inline-flex items-center gap-2 rounded-md border border-[#1F2A44]/18 bg-[#FAF5EB]/95 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#1F2A44] transition-all duration-500 ease-out dark:border-[#F2EFE6]/18 dark:bg-[#202B42]/95 dark:text-[#F2EFE6] ${
                  active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1.5 opacity-0"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D85D2A] dark:bg-[#E05A3A]" aria-hidden="true" />
                <span>{modeMeta[modeId].badge}</span>
              </div>
            );
          })}
        </div>

        {/* Display Headline with 3D Cylindrical Roulette Drum */}
        <h1 className="mx-auto mt-3.5 flex flex-wrap items-center justify-center gap-x-2.5 text-[22px] font-extrabold tracking-tight text-[#1F2A44] sm:text-4xl lg:text-[48px] lg:leading-[1.15] dark:text-[#F2EFE6]">
          <span>Criamos</span>
          <span
            className="relative inline-block h-[1.28em] overflow-hidden align-middle [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
            style={{ perspective: "900px" }}
          >
            {/* Invisible sizer keeps exact width of the longest phrase without layout jump */}
            <span className="invisible block whitespace-nowrap px-1" aria-hidden="true">
              sistemas de alto nível.
            </span>

            {/* Rotating 3-faced 3D Roulette Drum */}
            <span
              className="absolute inset-0 block transition-transform duration-700 ease-[cubic-bezier(0.22,1.12,0.36,1)]"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(-0.46em) rotateX(${stepCount * 120}deg)`,
              }}
            >
              {modeOrder.map((modeId, idx) => {
                const isFront = idx === activeIndex;
                return (
                  <span
                    key={modeId}
                    aria-hidden={!isFront}
                    className={`absolute inset-0 flex items-center justify-center whitespace-nowrap bg-gradient-to-r ${modeMeta[modeId].gradient} bg-clip-text text-transparent transition-opacity duration-500 ${
                      isFront ? "opacity-100" : "opacity-60"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: `rotateX(${-idx * 120}deg) translateZ(0.46em)`,
                    }}
                  >
                    {modeMeta[modeId].headlineHighlight}
                  </span>
                );
              })}
            </span>
          </span>
        </h1>

        {/* Interactive Mode Switcher */}
        <div className="mt-5 flex justify-center">
          <div
            role="tablist"
            aria-label="Alternar tipo de software na vitrine"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="inline-flex items-center rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB]/95 p-1 shadow-sm backdrop-blur-sm dark:border-[#F2EFE6]/15 dark:bg-[#202B42]/95"
          >
            {modeOrder.map((modeId) => {
              const selected = activeMode === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectMode(modeId)}
                  className={`relative overflow-hidden rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D85D2A]/50 sm:px-5 sm:text-sm ${
                    selected
                      ? "bg-[#D85D2A] text-white shadow-sm dark:bg-[#E05A3A]"
                      : "text-[#515C73] hover:text-[#1F2A44] dark:text-[#A9B4C9] dark:hover:text-[#F2EFE6]"
                  }`}
                >
                  <span className="relative z-10">{modeMeta[modeId].label}</span>
                  {selected && !isPaused && (
                    <span
                      key={`progress-${stepCount}`}
                      aria-hidden="true"
                      className="animate-tab-progress absolute inset-x-2 bottom-0.5 h-[2px] rounded-full bg-white/60"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary 10% Accent CTA */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <a
            href="#orcamento"
            className="ps-hero-cta inline-flex items-center gap-2 rounded-full bg-[#D85D2A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <div className="inline-grid items-center justify-items-center">
            {modeOrder.map((modeId) => {
              const active = activeMode === modeId;
              return (
                <span
                  key={modeId}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 text-[11px] font-medium text-[#515C73] transition-all duration-500 ease-out dark:text-[#A9B4C9] ${
                    active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
                  }`}
                >
                  {modeMeta[modeId].caption}
                </span>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Device Stage with architectural registration marks & dynamic tilt */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="ps-hero-stage-frame mx-auto mt-8 max-w-7xl"
        >
          <span className="ps-hero-tick-tl hidden lg:block" aria-hidden="true" />
          <span className="ps-hero-tick-tr hidden lg:block" aria-hidden="true" />

          <div className="relative flex flex-col items-center justify-center gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
            {/* Left Tilted 3D Phone */}
            <div className="z-20 order-2 grid min-w-0 justify-items-center transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:col-span-3 lg:order-none lg:-rotate-6 lg:justify-self-end lg:translate-y-6">
              {modeOrder.map((modeId, idx) => {
                const rel = (idx - activeIndex + modeOrder.length) % modeOrder.length;
                const active = rel === 0;
                const hiddenTransform =
                  rel === 2
                    ? "pointer-events-none -translate-x-8 translate-y-4 -rotate-12 scale-90 opacity-0"
                    : "pointer-events-none translate-x-6 translate-y-5 rotate-6 scale-90 opacity-0";

                return (
                  <div
                    key={modeId}
                    aria-hidden={!active}
                    className={`col-start-1 row-start-1 min-w-0 origin-bottom-right transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 ${
                      active
                        ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100"
                        : hiddenTransform
                    }`}
                  >
                    <MobileProgramMockup mode={modeId} />
                  </div>
                );
              })}
            </div>

            {/* Center Real Browser Window */}
            <div
              className="ps-hero-center-tilt z-10 order-1 grid w-full min-w-0 max-w-[700px] lg:col-span-6 lg:order-none lg:max-w-none"
            >
              {modeOrder.map((modeId, idx) => {
                const rel = (idx - activeIndex + modeOrder.length) % modeOrder.length;
                const active = rel === 0;
                const hiddenStyle =
                  rel === 2
                    ? "translateX(-48px) rotateY(-10deg) scale(0.94)"
                    : "translateX(48px) rotateY(10deg) scale(0.94)";

                return (
                  <div
                    key={modeId}
                    aria-hidden={!active}
                    style={{
                      transform: active ? "translateX(0px) rotateY(0deg) scale(1)" : hiddenStyle,
                    }}
                    className={`col-start-1 row-start-1 min-w-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    {modeId === "sistemas" && <SaasProgramScreen interactive={active} />}
                    {modeId === "sites" && <SiteProgramScreen interactive={active} />}
                    {modeId === "automacoes" && <AutomationProgramScreen interactive={active} />}
                  </div>
                );
              })}
            </div>

            {/* Right Floating Telemetry Card */}
            <div className="animate-float-slow z-20 order-3 grid min-w-0 justify-items-center transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:col-span-3 lg:order-none lg:rotate-3 lg:justify-self-start lg:translate-y-4">
              {modeOrder.map((modeId, idx) => {
                const rel = (idx - activeIndex + modeOrder.length) % modeOrder.length;
                const active = rel === 0;
                const hiddenTransform =
                  rel === 2
                    ? "pointer-events-none -translate-x-6 translate-y-4 -rotate-6 scale-90 opacity-0"
                    : "pointer-events-none translate-x-8 -translate-y-4 rotate-12 scale-90 opacity-0";

                return (
                  <div
                    key={modeId}
                    aria-hidden={!active}
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-150 ${
                      active
                        ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100"
                        : hiddenTransform
                    }`}
                  >
                    <TelemetryCardMockup mode={modeId} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
