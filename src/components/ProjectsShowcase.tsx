"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { buildWhatsAppUrl, siteConfig, type HeroModeId, type ModelProject } from "@/config/site";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { Reveal } from "@/components/Reveal";
import { CtaPair } from "@/components/CtaPair";
import { ModelInspector } from "@/components/ModelInspector";
import "@/components/ProjectsShowcase.css";

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
      "bg-(--surface) hover:border-(--fg)/40",
    badgeTint:
      "border-(--fg)/15 bg-(--bg) text-(--fg)",
    frameTint: "border-(--fg)/12 bg-white",
  },
  sites: {
    cardTint:
      "bg-(--surface) hover:border-(--accent)",
    badgeTint:
      "border-(--accent)/35 bg-(--accent)/10 text-(--accent-text)",
    frameTint: "border-(--fg)/12 bg-white",
  },
  automacoes: {
    cardTint:
      "bg-(--surface) hover:border-(--ok)/50",
    badgeTint:
      "border-(--ok)/25 bg-(--ok)/10 text-(--ok)",
    frameTint: "border-(--fg)/12 bg-white",
  },
};

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("Todos");
  const [inspectProject, setInspectProject] = useState<ModelProject | null>(null);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "Todos"
        ? siteConfig.projects
        : siteConfig.projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  const inspectIndex = inspectProject ? visibleProjects.findIndex((p) => p.id === inspectProject.id) : -1;
  const closeInspector = useCallback(() => setInspectProject(null), []);
  const stepInspector = useCallback(
    (delta: 1 | -1) => {
      setInspectProject((current) => {
        if (!current) return current;
        const idx = visibleProjects.findIndex((p) => p.id === current.id);
        return visibleProjects[(idx + delta + visibleProjects.length) % visibleProjects.length];
      });
    },
    [visibleProjects],
  );

  function countFor(value: FilterOption) {
    if (value === "Todos") return siteConfig.projects.length;
    return siteConfig.projects.filter((p) => p.category === value).length;
  }

  return (
    <section
      id="projetos"
      className="relative border-t border-(--fg)/12 bg-(--bg-alt) py-20 text-(--fg) transition-colors duration-300 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold text-(--accent-text)">
              Vitrine interativa
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl">
              Projetos-Modelo
            </h2>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-(--fg)/15 bg-(--surface) p-1 sm:inline-flex sm:w-auto sm:gap-1.5 sm:rounded-full"
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
                  className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[13px] font-semibold transition-colors sm:min-h-0 sm:rounded-full sm:text-xs ${
                    selected
                      ? "bg-(--ink) text-(--on-ink) shadow-sm"
                      : "text-(--fg-2) hover:text-(--fg)"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`font-tech rounded-full px-1.5 py-0.2 text-[10px] ${
                      selected
                        ? "bg-(--accent) text-(--on-accent)"
                        : "bg-(--ink)/10 text-(--fg-2)"
                    }`}
                  >
                    {countFor(f.value)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
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
                  className={`ps-specimen-card group flex h-full flex-col justify-between overflow-hidden border border-(--fg)/15 p-4 shadow-[0_12px_30px_-18px_rgba(26,23,21,0.16)] hover:shadow-[0_20px_40px_-16px_rgba(26,23,21,0.22)] ${styles.cardTint}`}
                >
                  <div>
                    {/* Scaled Real Software Thumbnail */}
                    <div className={`ps-specimen-viewport relative h-52 overflow-hidden border ${styles.frameTint}`}>
                      <div className="pointer-events-none w-[181%] origin-top-left scale-[0.55]">
                        <ProjectProgramVariant variant={project.variant} interactive={false} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setInspectProject(project)}
                        className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-(--accent)"
                        aria-label={`Abrir prévia de ${project.title}`}
                      />
                      <button
                        type="button"
                        onClick={() => setInspectProject(project)}
                        className="ps-specimen-btn absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-(--ink) px-3.5 py-1.5 text-[11px] font-semibold text-(--on-ink) hover:bg-(--ink-hover)"
                      >
                        <Maximize2 className="h-3 w-3 text-(--accent-text)" aria-hidden="true" />
                        <span>Testar programa</span>
                      </button>
                    </div>

                    {/* Specimen Card Info */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-tech rounded-md border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badgeTint}`}>
                          {project.badge}
                        </span>
                        <span className="ps-specimen-number font-tech text-[10px] font-semibold text-(--fg-2)">
                          {String(idx + 1).padStart(2, "0")} · {project.stack[0]}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold tracking-tight text-(--fg)">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-(--fg-2)">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-(--fg)/10 px-1 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech rounded bg-(--bg) px-2 py-0.5 text-[10px] font-medium text-(--fg)"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border border-(--fg)/25 px-3.5 text-xs font-semibold text-(--fg) transition-colors hover:border-(--fg) hover:bg-(--ink) hover:text-(--on-ink)"
                    >
                      <span>Cotar este modelo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <CtaPair showSecondary={false} className="mt-12" />
      </div>

      {inspectProject && inspectIndex >= 0 && (
        <ModelInspector
          project={inspectProject}
          position={inspectIndex + 1}
          total={visibleProjects.length}
          onClose={closeInspector}
          onStep={stepInspector}
        />
      )}
    </section>
  );
}
