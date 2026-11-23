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
      "bg-[#FAF6EE] hover:border-[#1A1715]/40 dark:bg-[#FAF6EE] dark:hover:border-[#B7410E]/55",
    badgeTint:
      "border-[#1A1715]/15 bg-[#EAE3D5] text-[#1A1715] dark:border-[#17181A]/15 dark:bg-[#E4DDD0] dark:text-[#17181A]",
    frameTint: "border-[#1A1715]/12 bg-white",
  },
  sites: {
    cardTint:
      "bg-[#FAF6EE] hover:border-[#B08D57] dark:bg-[#FAF6EE] dark:hover:border-[#B7410E]/60",
    badgeTint:
      "border-[#B08D57]/35 bg-[#F2E9D8] text-[#6E5636] dark:border-[#B7410E]/30 dark:bg-[#F5E3DA] dark:text-[#8E320A]",
    frameTint: "border-[#1A1715]/12 bg-white",
  },
  automacoes: {
    cardTint:
      "bg-[#FAF6EE] hover:border-[#263A32]/50 dark:bg-[#FAF6EE] dark:hover:border-[#263A32]/55",
    badgeTint:
      "border-[#263A32]/25 bg-[#E3EAE5] text-[#263A32] dark:border-[#263A32]/25 dark:bg-[#E1E8E3] dark:text-[#1E2E27]",
    frameTint: "border-[#1A1715]/12 bg-white",
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
      className="relative border-t border-[#1A1715]/12 bg-[#DFD6C5] py-20 text-[#1A1715] transition-colors duration-300 sm:py-24 dark:border-[#ECE5D8]/15 dark:bg-[#ECE5D8] dark:text-[#17181A]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8E6F3E] dark:text-[#B7410E]">
              Vitrine interativa
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1A1715] sm:text-4xl dark:text-[#17181A]">
              Projetos-Modelo
            </h2>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-[#1A1715]/15 bg-[#FAF6EE] p-1 sm:inline-flex sm:w-auto sm:gap-1.5 sm:rounded-full dark:border-[#17181A]/15 dark:bg-[#DFD8CA]"
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
                      ? "bg-[#1A1715] text-[#EAE3D5] shadow-sm dark:bg-[#17181A] dark:text-[#ECE5D8]"
                      : "text-[#5C5348] hover:text-[#1A1715] dark:text-[#4A453E] dark:hover:text-[#17181A]"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`font-tech rounded-full px-1.5 py-0.2 text-[10px] ${
                      selected
                        ? "bg-[#B08D57] text-[#1A1715] dark:bg-[#B7410E] dark:text-[#FAF6EE]"
                        : "bg-[#1A1715]/10 text-[#5C5348] dark:bg-[#17181A]/10 dark:text-[#4A453E]"
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
                  className={`ps-specimen-card group flex h-full flex-col justify-between overflow-hidden border border-[#1A1715]/15 p-4 shadow-[0_12px_30px_-18px_rgba(26,23,21,0.16)] hover:shadow-[0_20px_40px_-16px_rgba(26,23,21,0.22)] ${styles.cardTint}`}
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
                        className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#B08D57]"
                        aria-label={`Abrir prévia de ${project.title}`}
                      />
                      <button
                        type="button"
                        onClick={() => setInspectProject(project)}
                        className="ps-specimen-btn absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#1A1715] px-3.5 py-1.5 text-[11px] font-semibold text-[#EAE3D5] hover:bg-[#332D28] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
                      >
                        <Maximize2 className="h-3 w-3 text-[#B08D57] dark:text-[#FAF6EE]" aria-hidden="true" />
                        <span>Testar programa</span>
                      </button>
                    </div>

                    {/* Specimen Card Info */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-tech rounded-md border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badgeTint}`}>
                          {project.badge}
                        </span>
                        <span className="ps-specimen-number font-tech text-[10px] font-semibold text-[#5C5348]">
                          {String(idx + 1).padStart(2, "0")} · {project.stack[0]}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold tracking-tight text-[#1A1715] dark:text-[#17181A]">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#5C5348] dark:text-[#4A453E]">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#1A1715]/10 px-1 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech rounded bg-[#EAE3D5] px-2 py-0.5 text-[10px] font-medium text-[#1A1715] dark:bg-[#E4DDD0] dark:text-[#17181A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border border-[#1A1715]/25 px-3.5 text-xs font-semibold text-[#1A1715] transition-colors hover:border-[#1A1715] hover:bg-[#1A1715] hover:text-[#EAE3D5] dark:border-[#17181A]/25 dark:text-[#17181A] dark:hover:bg-[#17181A] dark:hover:text-[#ECE5D8]"
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
