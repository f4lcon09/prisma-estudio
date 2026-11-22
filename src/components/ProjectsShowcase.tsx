"use client";

import { useState } from "react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { buildWhatsAppUrl, siteConfig, type HeroModeId, type ModelProject } from "@/config/site";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { Reveal } from "@/components/Reveal";
import showcaseStyles from "@/components/ProjectsShowcase.module.css";

type FilterOption = "Todos" | ModelProject["category"];

const filters: { value: FilterOption; label: string }[] = [
  { value: "Todos", label: "Todos" },
  { value: "Sites & Landing Pages", label: "Sites" },
  { value: "Sistemas Web & SaaS", label: "Sistemas" },
  { value: "Automações & IA", label: "Automações" },
];

const modeStyles: Record<
  HeroModeId,
  { cardTint: string; badgeTint: string; frameTint: string }
> = {
  sistemas: {
    cardTint:
      "bg-[#FAF5EB] hover:border-[#1F2A44]/40 dark:bg-[#FAF7F0] dark:hover:border-[#E05A3A]/50",
    badgeTint:
      "border-[#1F2A44]/15 bg-[#EFE6D6] text-[#1F2A44] dark:border-[#182032]/15 dark:bg-[#E8E2D5] dark:text-[#182032]",
    frameTint: "border-[#1F2A44]/12 bg-white",
  },
  sites: {
    cardTint:
      "bg-[#FAF5EB] hover:border-[#D85D2A]/55 dark:bg-[#FAF7F0] dark:hover:border-[#E05A3A]/55",
    badgeTint:
      "border-[#D85D2A]/25 bg-[#F9E7DF] text-[#A8431B] dark:border-[#E05A3A]/25 dark:bg-[#F9E6DF] dark:text-[#B53D21]",
    frameTint: "border-[#D85D2A]/15 bg-white",
  },
  automacoes: {
    cardTint:
      "bg-[#FAF5EB] hover:border-[#1F2A44]/40 dark:bg-[#FAF7F0] dark:hover:border-[#E05A3A]/50",
    badgeTint:
      "border-[#1F2A44]/15 bg-[#E6ECE7] text-[#1D4B3B] dark:border-[#182032]/15 dark:bg-[#E4ECE7] dark:text-[#174233]",
    frameTint: "border-[#1F2A44]/12 bg-white",
  },
};

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("Todos");
  const [inspectProject, setInspectProject] = useState<ModelProject | null>(null);

  const visibleProjects =
    activeFilter === "Todos"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === activeFilter);

  function countFor(value: FilterOption) {
    if (value === "Todos") return siteConfig.projects.length;
    return siteConfig.projects.filter((p) => p.category === value).length;
  }

  return (
    <section
      id="projetos"
      className="relative border-t border-[#1F2A44]/12 bg-[#EFE6D6] py-20 text-[#1F2A44] transition-colors duration-300 sm:py-24 dark:border-[#F2EFE6]/15 dark:bg-[#F2EFE6] dark:text-[#182032]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D85D2A] dark:text-[#E05A3A]">
              Vitrine interativa
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1F2A44] sm:text-4xl dark:text-[#182032]">
              Projetos-Modelo
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-1.5 rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB] p-1 dark:border-[#182032]/15 dark:bg-[#E5DFD2]"
            role="tablist"
            aria-label="Filtrar projetos por categoria"
          >
            {filters.map((f) => {
              const selected = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveFilter(f.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selected
                      ? "bg-[#1F2A44] text-[#F4EDE0] shadow-sm dark:bg-[#182032] dark:text-[#F2EFE6]"
                      : "text-[#515C73] hover:text-[#1F2A44] dark:text-[#3A4459] dark:hover:text-[#182032]"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`font-tech rounded-full px-1.5 py-0.2 text-[10px] ${
                      selected
                        ? "bg-[#D85D2A] text-white dark:bg-[#E05A3A]"
                        : "bg-[#1F2A44]/10 text-[#515C73] dark:bg-[#182032]/10 dark:text-[#3A4459]"
                    }`}
                  >
                    {countFor(f.value)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, idx) => {
            const waUrl = buildWhatsAppUrl(project.whatsappPrompt);
            const styles = modeStyles[project.mode];

            return (
              <Reveal key={project.id} delayMs={(idx % 3) * 80}>
                <article
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--card-mx", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--card-my", `${e.clientY - rect.top}px`);
                  }}
                  className={`${showcaseStyles.specimenCard} group flex h-full flex-col justify-between overflow-hidden border border-[#1F2A44]/15 p-4 shadow-[0_12px_30px_-18px_rgba(31,42,68,0.16)] hover:shadow-[0_20px_40px_-16px_rgba(31,42,68,0.22)] ${styles.cardTint}`}
                >
                  <div>
                    {/* Scaled Real Software Thumbnail */}
                    <div className={`${showcaseStyles.specimenViewport} relative h-52 overflow-hidden border ${styles.frameTint}`}>
                      <div className="pointer-events-none w-[181%] origin-top-left scale-[0.55]">
                        <ProjectProgramVariant variant={project.variant} interactive={false} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setInspectProject(project)}
                        className={`${showcaseStyles.specimenButton} absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#D85D2A] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]`}
                      >
                        <Maximize2 className="h-3 w-3" aria-hidden="true" />
                        <span>Testar programa</span>
                      </button>
                    </div>

                    {/* Specimen Card Info */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-tech rounded-md border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badgeTint}`}>
                          {project.badge}
                        </span>
                        <span className={`${showcaseStyles.specimenNumber} font-tech text-[10px] font-semibold text-[#515C73]`}>
                          {String(idx + 1).padStart(2, "0")} · {project.stack[0]}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold tracking-tight text-[#1F2A44] dark:text-[#182032]">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#515C73] dark:text-[#3A4459]">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#1F2A44]/10 px-1 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech rounded bg-[#EFE6D6] px-2 py-0.5 text-[10px] font-medium text-[#1F2A44] dark:bg-[#E8E2D5] dark:text-[#182032]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#D85D2A] hover:text-[#BF4E20] dark:text-[#E05A3A] dark:hover:text-[#C94B2D]"
                    >
                      <span>Cotar</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Software Modal */}
      {inspectProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#182032]/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Prévia interativa: ${inspectProject.title}`}
        >
          <div className="relative w-full max-w-5xl rounded-3xl border border-[#1F2A44]/20 bg-[#FAF5EB] p-4 shadow-2xl sm:p-6 dark:border-[#F2EFE6]/15 dark:bg-[#182032]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-[#D85D2A] dark:text-[#E05A3A]">
                    {inspectProject.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Simulador interativo — clique e teste os controles abaixo
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-[#1F2A44] dark:text-[#F2EFE6]">
                  {inspectProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectProject(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1F2A44]/15 bg-[#EFE6D6] text-[#1F2A44] hover:bg-[#1F2A44] hover:text-[#F4EDE0] dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:bg-[#E05A3A] dark:hover:text-white"
                aria-label="Fechar prévia"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ProjectProgramVariant variant={inspectProject.variant} interactive={true} />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-4">
                {inspectProject.metrics.map((m) => (
                  <div key={m.label} className="text-xs">
                    <span className="text-[#515C73] dark:text-[#A9B4C9]">{m.label}: </span>
                    <strong className="font-tech text-[#1F2A44] dark:text-[#F2EFE6]">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>
              <a
                href={buildWhatsAppUrl(inspectProject.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D85D2A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
              >
                <span>Quero um projeto assim</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
