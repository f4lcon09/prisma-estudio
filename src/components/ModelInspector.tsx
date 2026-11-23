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
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--fg)/15 bg-(--bg) text-(--fg) transition-colors hover:bg-(--ink) hover:text-(--on-ink) dark:hover:text-white";
  const eyebrow = "font-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-(--accent-text)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-(--ink)/75 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Testar modelo: ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[94dvh] w-full max-w-[1440px] flex-col overflow-hidden rounded-t-3xl border border-(--fg)/20 bg-(--surface) shadow-2xl sm:rounded-3xl">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4 border-b border-(--fg)/10 px-4 py-3.5 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-(--accent-text)">
                {project.badge}
              </span>
              <span className="font-tech text-[11px] text-(--fg-2)">
                Modelo {position} de {total}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold leading-snug text-(--fg) sm:text-xl">
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
          <div className="flex min-w-0 flex-col justify-center bg-(--bg)/60 p-3 sm:p-5">
            {/* zoom amplia o mockup inteiro (texto e cliques) sem distorcer o layout */}
            <div className="min-w-0 [--mock-h:62dvh] md:[zoom:1.15] md:[--mock-h:58dvh] lg:[zoom:1.25] lg:[--mock-h:54dvh] xl:[zoom:1.4] xl:[--mock-h:50dvh] 2xl:[zoom:1.5] 2xl:[--mock-h:48dvh]">
              <MockupCustomizationProvider value={{ palette: customized ? chosen : undefined, brandName: name }}>
                <ProjectProgramVariant variant={project.variant} interactive={true} />
              </MockupCustomizationProvider>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-(--fg-2)">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
              {customized
                ? "Prévia ilustrativa com a sua personalização. O projeto final é desenhado com a sua marca."
                : "Prévia funcionando de verdade. Clique, digite e teste."}
            </p>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 border-t border-(--fg)/10 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <div
              role="tablist"
              aria-label="Painel do modelo"
              className="grid grid-cols-2 gap-1 rounded-full border border-(--fg)/15 bg-(--bg) p-1"
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
                      ? "bg-(--ink) text-(--on-ink)"
                      : "text-(--fg-2) hover:text-(--fg)"
                  }`}
                >
                  {id === "personalizar" && <Palette className="h-3.5 w-3.5" aria-hidden="true" />}
                  {label}
                  {id === "personalizar" && customized && (
                    <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" aria-label="personalizado" />
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
                      <li key={step} className="flex items-start gap-3 text-sm leading-snug text-(--fg)">
                        <span className="font-tech flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--ink) text-[11px] font-semibold text-(--on-ink)">
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
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-(--fg)">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--accent-text)" aria-hidden="true" />
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
                    className="mt-2 w-full rounded-xl border border-(--fg)/20 bg-white px-3.5 py-2.5 text-sm text-(--fg) placeholder:text-(--fg-2)/70 focus:border-(--fg) focus:outline-none"
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
                              ? "border-(--fg) bg-white"
                              : "border-(--fg)/15 hover:border-(--fg)/50"
                          }`}
                        >
                          <span className="grid h-7 grid-cols-[6fr_3fr_1fr] overflow-hidden rounded-md border border-(--fg)/10">
                            <span style={{ background: opt.bg }} />
                            <span style={{ background: opt.ink }} />
                            <span style={{ background: opt.accent }} />
                          </span>
                          <span className="flex items-center justify-between gap-1 text-xs font-semibold text-(--fg)">
                            {opt.name}
                            {idx === 0 && (
                              <span className="font-tech text-[10px] font-normal text-(--fg-2)">original</span>
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
                    className="inline-flex items-center gap-1.5 justify-self-start text-xs font-semibold text-(--fg-2) underline-offset-4 hover:text-(--fg) hover:underline"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Voltar ao original
                  </button>
                )}

                <p className="text-xs leading-relaxed text-(--fg-2)">
                  É uma prévia para você imaginar o seu projeto. No projeto real, cores, textos e fotos são definidos com
                  a sua marca no briefing.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-(--fg)/10 py-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-(--fg-2)">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Prazo: <strong className="text-(--fg)">{project.turnaround}</strong>
              </span>
              {project.metrics.map((m) => (
                <span key={m.label} className="text-(--fg-2)">
                  {m.label}: <strong className="font-tech text-(--fg)">{m.value}</strong>
                </span>
              ))}
            </div>

            <div className="mt-auto grid gap-2">
              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-(--ink) px-5 text-sm font-semibold text-(--on-ink) transition-colors hover:bg-(--ink-hover)"
              >
                {customized ? "Quero assim, personalizado" : "Quero um projeto assim"}
                <ArrowUpRight className="h-4 w-4 text-(--accent-text)" aria-hidden="true" />
              </a>
              <a
                href="#orcamento"
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-(--fg)/25 px-5 text-sm font-semibold text-(--fg) transition-colors hover:border-(--fg)"
              >
                Montar meu orçamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-center text-[11px] leading-relaxed text-(--fg-2)">{riskLine}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
