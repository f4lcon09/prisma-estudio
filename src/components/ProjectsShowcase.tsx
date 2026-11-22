"use client";

import { useState } from "react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { buildWhatsAppUrl, siteConfig, type HeroModeId, type ModelProject } from "@/config/site";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { Reveal } from "@/components/Reveal";

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
    cardTint: "hover:border-blue-300 bg-gradient-to-b from-blue-50/50 to-white",
    badgeTint: "border-blue-200 bg-blue-50 text-blue-700",
    frameTint: "border-blue-100 bg-blue-50/40",
  },
  sites: {
    cardTint: "hover:border-amber-300 bg-gradient-to-b from-amber-50/55 to-white",
    badgeTint: "border-amber-200 bg-amber-50 text-amber-800",
    frameTint: "border-amber-100 bg-amber-50/40",
  },
  automacoes: {
    cardTint: "hover:border-emerald-300 bg-gradient-to-b from-emerald-50/50 to-white",
    badgeTint: "border-emerald-200 bg-emerald-50 text-emerald-700",
    frameTint: "border-emerald-100 bg-emerald-50/40",
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
      className="relative border-t border-slate-200/80 bg-gradient-to-b from-white via-[#F4F8FF] to-[#FFFBEB]/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
              Vitrine interativa
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Projetos-Modelo
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1"
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
                      ? "bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-sm"
                      : "text-slate-600 hover:text-blue-700"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`font-tech rounded-full px-1.5 py-0.2 text-[10px] ${
                      selected ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-500"
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
                  className={`group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(37,99,235,0.14)] ${styles.cardTint}`}
                >
                  <div>
                    {/* Scaled Real Software Thumbnail */}
                    <div className={`relative h-52 overflow-hidden rounded-2xl border bg-white ${styles.frameTint}`}>
                      <div className="pointer-events-none w-[181%] origin-top-left scale-[0.55]">
                        <ProjectProgramVariant variant={project.variant} interactive={false} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setInspectProject(project)}
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md transition-all hover:scale-105"
                      >
                        <Maximize2 className="h-3 w-3" aria-hidden="true" />
                        <span>Testar programa</span>
                      </button>
                    </div>

                    {/* Minimal Card Info */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-tech rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badgeTint}`}>
                          {project.badge}
                        </span>
                        <span className="font-tech text-[11px] text-slate-400">
                          {project.stack[0]}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-950">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 px-1 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Prévia interativa: ${inspectProject.title}`}
        >
          <div className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                  Demonstração interativa · {inspectProject.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-950">{inspectProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectProject(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-900 hover:text-white"
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
                    <span className="text-slate-500">{m.label}: </span>
                    <strong className="font-tech text-slate-900">{m.value}</strong>
                  </div>
                ))}
              </div>
              <a
                href={buildWhatsAppUrl(inspectProject.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
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
