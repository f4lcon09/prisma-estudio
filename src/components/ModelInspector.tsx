"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock, MousePointerClick, X } from "lucide-react";
import { buildWhatsAppUrl, type ModelProject } from "@/config/site";
import { modelGuides } from "@/config/modelGuides";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { riskLine } from "@/components/CtaPair";

interface ModelInspectorProps {
  project: ModelProject;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
}

/** Janela do "Testar modelo": prévia interativa + roteiro do que testar + o que o modelo entrega + CTAs. */
export function ModelInspector({ project, position, total, onClose, onStep }: ModelInspectorProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const guide = modelGuides[project.variant];

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !(e.target instanceof HTMLInputElement)) onStep(1);
      if (e.key === "ArrowLeft" && !(e.target instanceof HTMLInputElement)) onStep(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const navBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1715]/15 bg-[#EAE3D5] text-[#1A1715] transition-colors hover:bg-[#1A1715] hover:text-[#EAE3D5] dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:bg-[#B7410E] dark:hover:text-white";

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
      <div className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-[#1A1715]/20 bg-[#FAF6EE] shadow-2xl sm:rounded-3xl dark:border-[#ECE5D8]/15 dark:bg-[#17181A]">
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

        {/* Corpo: prévia + painel */}
        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-12">
          <div className="min-w-0 bg-[#EAE3D5]/60 p-3 sm:p-5 lg:col-span-8 dark:bg-[#202226]/60">
            <ProjectProgramVariant variant={project.variant} interactive={true} />
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#5C5348] dark:text-[#A8A095]">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
              Prévia funcionando de verdade. Clique, digite e teste.
            </p>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 p-5 sm:p-6 lg:col-span-4">
            <div>
              <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E6F3E] dark:text-[#B08D57]">
                Experimente
              </p>
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
              <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E6F3E] dark:text-[#B08D57]">
                O que este modelo entrega
              </p>
              <ul className="mt-3 grid gap-2">
                {guide.delivers.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-[#1A1715] dark:text-[#ECE5D8]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6E5636] dark:text-[#E07A4F]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                href={buildWhatsAppUrl(project.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A1715] px-5 text-sm font-semibold text-[#EAE3D5] transition-colors hover:bg-[#2E2924] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
              >
                Quero um projeto assim
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
