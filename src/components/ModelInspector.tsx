"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MousePointerClick,
  Palette,
  RotateCcw,
  X,
} from "lucide-react";
import { buildWhatsAppUrl, type ModelProject } from "@/config/site";
import { modelGuides } from "@/config/modelGuides";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { riskLine } from "@/components/CtaPair";
import { paletteOptions } from "@/components/mockups/paletteOptions";
import { MockupCustomizationProvider } from "@/components/mockups/MockupCustomization";

interface ModelInspectorProps {
  project: ModelProject;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
}

type PanelTab = "experimente" | "personalizar";

/**
 * Janela do "Testar modelo": prévia interativa ampliada + roteiro do que testar
 * + personalização (cores e nome) + CTAs.
 */
export function ModelInspector({ project, position, total, onClose, onStep }: ModelInspectorProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = useState<PanelTab>("experimente");
  const [brandName, setBrandName] = useState("");
  const [paletteByModel, setPaletteByModel] = useState<Record<string, number>>({});

  const guide = modelGuides[project.variant];
  const options = paletteOptions[project.variant];
  const paletteIdx = paletteByModel[project.variant] ?? 0;
  const chosen = options[paletteIdx];
  const name = brandName.trim();
  const customized = paletteIdx !== 0 || name.length > 0;

  const waMessage = customized
    ? `${project.whatsappPrompt} Personalizei a prévia: combinação "${chosen.name}"${name ? ` com o nome "${name}"` : ""}.`
    : project.whatsappPrompt;

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !typing) onStep(1);
      if (e.key === "ArrowLeft" && !typing) onStep(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const navBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1715]/15 bg-[#EAE3D5] text-[#1A1715] transition-colors hover:bg-[#1A1715] hover:text-[#EAE3D5] dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:bg-[#B7410E] dark:hover:text-white";
  const eyebrow = "font-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E6F3E] dark:text-[#B08D57]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#17181A]/75 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Testar modelo: ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[94dvh] w-full max-w-[1440px] flex-col overflow-hidden rounded-t-3xl border border-[#1A1715]/20 bg-[#FAF6EE] shadow-2xl sm:rounded-3xl dark:border-[#ECE5D8]/15 dark:bg-[#17181A]">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4 border-b border-[#1A1715]/10 px-4 py-3.5 sm:px-6 dark:border-[#ECE5D8]/10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-[#8E6F3E] dark:text-[#B08D57]">
                {project.badge}
              </span>
              <span className="font-tech text-[11px] text-[#5C5348] dark:text-[#A8A095]">
                Modelo {position} de {total}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold leading-snug text-[#1A1715] sm:text-xl dark:text-[#ECE5D8]">
              {project.title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button type="button" onClick={() => onStep(-1)} className={navBtn} aria-label="Modelo anterior">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => onStep(1)} className={navBtn} aria-label="Próximo modelo">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button ref={closeRef} type="button" onClick={onClose} className={navBtn} aria-label="Fechar">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Corpo: prévia ampliada + painel */}
        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex min-w-0 flex-col justify-center bg-[#EAE3D5]/60 p-3 sm:p-5 dark:bg-[#202226]/60">
            {/* zoom amplia o mockup inteiro (texto e cliques) sem distorcer o layout */}
            <div className="min-w-0 md:[zoom:1.15] lg:[zoom:1.25] xl:[zoom:1.4] 2xl:[zoom:1.5]">
              <MockupCustomizationProvider value={{ palette: customized ? chosen : undefined, brandName: name }}>
                <ProjectProgramVariant variant={project.variant} interactive={true} />
              </MockupCustomizationProvider>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#5C5348] dark:text-[#A8A095]">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
              {customized
                ? "Prévia ilustrativa com a sua personalização. O projeto final é desenhado com a sua marca."
                : "Prévia funcionando de verdade. Clique, digite e teste."}
            </p>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 border-t border-[#1A1715]/10 p-5 sm:p-6 lg:border-l lg:border-t-0 dark:border-[#ECE5D8]/10">
            <div
              role="tablist"
              aria-label="Painel do modelo"
              className="grid grid-cols-2 gap-1 rounded-full border border-[#1A1715]/15 bg-[#EAE3D5] p-1 dark:border-[#ECE5D8]/15 dark:bg-[#202226]"
            >
              {(
                [
                  ["experimente", "Experimente"],
                  ["personalizar", "Personalizar"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-colors ${
                    tab === id
                      ? "bg-[#1A1715] text-[#EAE3D5] dark:bg-[#B7410E] dark:text-[#FAF6EE]"
                      : "text-[#5C5348] hover:text-[#1A1715] dark:text-[#A8A095] dark:hover:text-[#ECE5D8]"
                  }`}
                >
                  {id === "personalizar" && <Palette className="h-3.5 w-3.5" aria-hidden="true" />}
                  {label}
                  {id === "personalizar" && customized && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] dark:bg-[#FAF6EE]" aria-label="personalizado" />
                  )}
                </button>
              ))}
            </div>

            {tab === "experimente" ? (
              <>
                <div>
                  <p className={eyebrow}>Experimente</p>
                  <ol className="mt-3 grid gap-2.5">
                    {guide.tryIt.map((step, idx) => (
                      <li key={step} className="flex items-start gap-3 text-sm leading-snug text-[#1A1715] dark:text-[#ECE5D8]">
                        <span className="font-tech flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A1715] text-[11px] font-semibold text-[#EAE3D5] dark:bg-[#ECE5D8] dark:text-[#17181A]">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className={eyebrow}>O que este modelo entrega</p>
                  <ul className="mt-3 grid gap-2">
                    {guide.delivers.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#1A1715] dark:text-[#ECE5D8]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6E5636] dark:text-[#E07A4F]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="grid gap-5">
                <div>
                  <label htmlFor="inspector-brand" className={eyebrow}>
                    Nome do seu negócio
                  </label>
                  <input
                    id="inspector-brand"
                    type="text"
                    value={brandName}
                    maxLength={32}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Ex.: Padaria do João"
                    className="mt-2 w-full rounded-xl border border-[#1A1715]/20 bg-white px-3.5 py-2.5 text-sm text-[#1A1715] placeholder:text-[#5C5348]/70 focus:border-[#1A1715] focus:outline-none dark:border-[#ECE5D8]/20 dark:bg-[#202226] dark:text-[#ECE5D8] dark:placeholder:text-[#A8A095]/70 dark:focus:border-[#ECE5D8]"
                  />
                </div>

                <div>
                  <p className={eyebrow}>Combinação de cores</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {options.map((opt, idx) => {
                      const selected = idx === paletteIdx;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setPaletteByModel((prev) => ({ ...prev, [project.variant]: idx }))}
                          className={`flex flex-col gap-2 rounded-xl border p-2 text-left transition-colors ${
                            selected
                              ? "border-[#1A1715] bg-white dark:border-[#ECE5D8] dark:bg-[#202226]"
                              : "border-[#1A1715]/15 hover:border-[#1A1715]/50 dark:border-[#ECE5D8]/15 dark:hover:border-[#ECE5D8]/50"
                          }`}
                        >
                          <span className="grid h-7 grid-cols-[6fr_3fr_1fr] overflow-hidden rounded-md border border-[#1A1715]/10">
                            <span style={{ background: opt.bg }} />
                            <span style={{ background: opt.ink }} />
                            <span style={{ background: opt.accent }} />
                          </span>
                          <span className="flex items-center justify-between gap-1 text-xs font-semibold text-[#1A1715] dark:text-[#ECE5D8]">
                            {opt.name}
                            {idx === 0 && (
                              <span className="font-tech text-[10px] font-normal text-[#5C5348] dark:text-[#A8A095]">original</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {customized && (
                  <button
                    type="button"
                    onClick={() => {
                      setBrandName("");
                      setPaletteByModel((prev) => ({ ...prev, [project.variant]: 0 }));
                    }}
                    className="inline-flex items-center gap-1.5 justify-self-start text-xs font-semibold text-[#5C5348] underline-offset-4 hover:text-[#1A1715] hover:underline dark:text-[#A8A095] dark:hover:text-[#ECE5D8]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Voltar ao original
                  </button>
                )}

                <p className="text-xs leading-relaxed text-[#5C5348] dark:text-[#A8A095]">
                  É uma prévia para você imaginar o seu projeto. No projeto real, cores, textos e fotos são definidos com
                  a sua marca no briefing.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-[#1A1715]/10 py-3 text-xs dark:border-[#ECE5D8]/10">
              <span className="inline-flex items-center gap-1.5 text-[#5C5348] dark:text-[#A8A095]">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Prazo: <strong className="text-[#1A1715] dark:text-[#ECE5D8]">{project.turnaround}</strong>
              </span>
              {project.metrics.map((m) => (
                <span key={m.label} className="text-[#5C5348] dark:text-[#A8A095]">
                  {m.label}: <strong className="font-tech text-[#1A1715] dark:text-[#ECE5D8]">{m.value}</strong>
                </span>
              ))}
            </div>

            <div className="mt-auto grid gap-2">
              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A1715] px-5 text-sm font-semibold text-[#EAE3D5] transition-colors hover:bg-[#2E2924] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
              >
                {customized ? "Quero assim, personalizado" : "Quero um projeto assim"}
                <ArrowUpRight className="h-4 w-4 text-[#B08D57] dark:text-[#FAF6EE]" aria-hidden="true" />
              </a>
              <a
                href="#orcamento"
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1A1715]/25 px-5 text-sm font-semibold text-[#1A1715] transition-colors hover:border-[#1A1715] dark:border-[#ECE5D8]/25 dark:text-[#ECE5D8] dark:hover:border-[#ECE5D8]"
              >
                Montar meu orçamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-center text-[11px] leading-relaxed text-[#5C5348] dark:text-[#A8A095]">{riskLine}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
