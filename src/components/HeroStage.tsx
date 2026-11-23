"use client";

import { useEffect, useRef, useState } from "react";
import { CtaPair } from "@/components/CtaPair";
import type { HeroModeId } from "@/config/site";
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
    badge: "Sites e lojas",
    headlineHighlight: "sites que vendem.",
    gradient:
      "from-[#E3401F] via-[#E5631B] to-[#C8235F]",
    caption: "Prévia responsiva: loja de moda publicada em desktop e celular + métricas ao vivo",
  },
  sistemas: {
    label: "Sistemas",
    badge: "Sistemas web e SaaS",
    headlineHighlight: "sistemas de alto nível.",
    gradient:
      "from-[#0071E3] via-[#4B5BFF] to-[#7A3FE4]",
    caption: "Software web completo com app mobile e monitoramento em tempo real",
  },
  automacoes: {
    label: "Automações",
    badge: "Automações com IA",
    headlineHighlight: "automações com IA.",
    gradient:
      "from-[#0F9F72] via-[#0A93B8] to-[#0071E3]",
    caption: "Fluxo conectado de ponta a ponta: WhatsApp, agente de IA e CRM",
  },
};

export function HeroStage() {
  const [stepCount, setStepCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // largura de cada frase do título: o espaço acompanha a frase ativa (sem vão para as frases curtas)
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [phraseWidths, setPhraseWidths] = useState<number[] | null>(null);
  // os mockups dos outros modos só montam depois que a página carregou
  const [allModesMounted, setAllModesMounted] = useState(false);

  const activeIndex = ((stepCount % modeOrder.length) + modeOrder.length) % modeOrder.length;
  const activeMode = modeOrder[activeIndex];

  useEffect(() => {
    function measure() {
      setPhraseWidths(phraseRefs.current.map((el) => (el ? Math.ceil(el.getBoundingClientRect().width) : 0)));
    }
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setAllModesMounted(true), { timeout: 2500 });
    else window.setTimeout(() => setAllModesMounted(true), 1500);
  }, []);

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
      className="ps-hero-section overflow-hidden bg-(--bg) pb-16 pt-6 transition-colors duration-300 sm:pb-22 sm:pt-8"
    >
      {/* Luz espectral por trás dos aparelhos: o "prisma" que o vidro deixa passar */}
      <div className="ps-hero-prism pointer-events-none absolute inset-x-0 bottom-0 top-[34%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-10 2xl:max-w-[1600px]">
        {/* Top Studio Spec Tag */}
        <div className="inline-grid items-center justify-items-center">
          {modeOrder.map((modeId) => {
            const active = activeMode === modeId;
            return (
              <div
                key={modeId}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full border border-(--glass-border) bg-(--glass) px-3.5 py-1 text-[13px] font-semibold text-(--fg-2) shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-out ${
                  active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1.5 opacity-0"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" aria-hidden="true" />
                <span>{modeMeta[modeId].badge}</span>
              </div>
            );
          })}
        </div>

        {/* Título com troca de palavra em 2D (sem 3D: o Firefox não desenha texto em gradiente dentro de preserve-3d) */}
        <h1 className="mx-auto mt-3.5 flex flex-wrap items-center justify-center gap-x-2.5 text-[clamp(26px,7.6vw,32px)] leading-tight font-semibold tracking-tight text-(--fg) sm:text-4xl lg:text-[56px] lg:leading-[1.12] 2xl:text-[72px]">
          <span>Criamos</span>
          <span
            className="relative inline-block h-[1.28em] overflow-hidden align-middle transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={phraseWidths ? { width: phraseWidths[activeIndex] } : undefined}
          >
            {/* medidores invisíveis (um por frase) e, antes da medição, a frase ativa dá a largura */}
            {modeOrder.map((modeId, idx) => (
              <span
                key={`m-${modeId}`}
                ref={(el) => {
                  phraseRefs.current[idx] = el;
                }}
                aria-hidden="true"
                className="invisible absolute left-0 top-0 whitespace-nowrap px-1"
              >
                {modeMeta[modeId].headlineHighlight}
              </span>
            ))}
            {!phraseWidths && (
              <span className="invisible block whitespace-nowrap px-1" aria-hidden="true">
                {modeMeta[activeMode].headlineHighlight}
              </span>
            )}
            {modeOrder.map((modeId, idx) => {
              const rel = (idx - activeIndex + modeOrder.length) % modeOrder.length;
              const isFront = rel === 0;
              // ativa no centro; a anterior sai por cima; a próxima espera embaixo
              const offset = isFront ? "translateY(0)" : rel === modeOrder.length - 1 ? "translateY(-105%)" : "translateY(105%)";
              return (
                <span
                  key={modeId}
                  aria-hidden={!isFront}
                  style={{ transform: offset }}
                  className={`absolute inset-y-0 left-0 flex items-center whitespace-nowrap px-1 bg-gradient-to-r ${modeMeta[modeId].gradient} bg-clip-text text-transparent transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isFront ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {modeMeta[modeId].headlineHighlight}
                </span>
              );
            })}
          </span>
        </h1>

        {/* Interactive Mode Switcher */}
        <div className="mt-5 flex justify-center">
          <div
            role="tablist"
            aria-label="Alternar tipo de software na vitrine"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="inline-flex items-center rounded-full border border-(--glass-border) bg-(--glass) p-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150"
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
                  className={`relative overflow-hidden rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/60 sm:px-5 sm:text-sm ${
                    selected
                      ? "bg-(--surface) text-(--fg) shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                      : "text-(--fg-2) hover:text-(--fg)"
                  }`}
                >
                  <span className="relative z-10">{modeMeta[modeId].label}</span>
                  {selected && !isPaused && (
                    <span
                      key={`progress-${stepCount}`}
                      aria-hidden="true"
                      className="animate-tab-progress absolute inset-x-2 bottom-0.5 h-[2px] rounded-full bg-(--accent)"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Quiet-Luxury / Editorial CTA */}
        <div className="mt-5 flex flex-col items-center gap-1.5">
          <CtaPair />
          <div className="mt-5 inline-grid items-center justify-items-center">
            {modeOrder.map((modeId) => {
              const active = activeMode === modeId;
              return (
                <span
                  key={modeId}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 text-[11px] font-medium text-(--fg-2) transition-all duration-500 ease-out ${
                    active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
                  }`}
                >
                  {modeMeta[modeId].caption}
                </span>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Device Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="ps-hero-stage-frame mx-auto mt-8 max-w-7xl 2xl:mt-12 2xl:max-w-[1560px]"
        >

          <div className="relative flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap md:items-start lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
            {/* Left Tilted 3D Phone */}
            <div className="relative z-20 order-2 hidden min-w-0 justify-items-center md:grid transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:col-span-3 lg:order-none lg:-rotate-6 lg:justify-self-end lg:translate-y-6 2xl:[zoom:1.18]">
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
            <div className="ps-hero-center-tilt relative z-10 order-1 w-full [--mock-h:440px] min-w-0 2xl:[--mock-h:560px] max-w-[700px] md:basis-full lg:col-span-6 lg:order-none lg:max-w-none lg:basis-auto">
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
                    className={`min-w-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "relative opacity-100" : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                    }`}
                  >
                    {(allModesMounted || active) && modeId === "sistemas" && <SaasProgramScreen interactive={active} />}
                    {(allModesMounted || active) && modeId === "sites" && <SiteProgramScreen interactive={active} />}
                    {(allModesMounted || active) && modeId === "automacoes" && <AutomationProgramScreen interactive={active} />}
                  </div>
                );
              })}
            </div>

            {/* Right Floating Telemetry Card */}
            <div className="animate-float-slow relative z-20 order-3 hidden min-w-0 justify-items-center md:grid md:self-center transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] lg:col-span-3 lg:order-none lg:rotate-3 lg:justify-self-start 2xl:[zoom:1.18] lg:translate-y-4">
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
