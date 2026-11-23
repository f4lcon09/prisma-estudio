"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { buildWhatsAppUrl, siteConfig, type HeroModeId, type ModelProject } from "@/config/site";
import { ProjectProgramVariant } from "@/components/ProjectProgramVariants";
import { Reveal } from "@/components/Reveal";
import { CtaPair } from "@/components/CtaPair";
import { ModelInspector } from "@/components/ModelInspector";
import { BrowserChromeContext } from "@/components/mockups/BrowserShell";
import { LazyMount } from "@/components/LazyMount";
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

/** Em "Todos", intercala site, sistema e automação: a primeira tela mostra um de cada. */
function interleaveByMode(projects: readonly ModelProject[]) {
  const order: HeroModeId[] = ["sites", "sistemas", "automacoes"];
  const groups = order.map((mode) => projects.filter((p) => p.mode === mode));
  const longest = Math.max(...groups.map((g) => g.length));
  const out: ModelProject[] = [];
  for (let i = 0; i < longest; i++) for (const g of groups) if (g[i]) out.push(g[i]);
  return out;
}

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("Todos");
  const [inspectProject, setInspectProject] = useState<ModelProject | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  function updateEdges() {
    const el = railRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }

  function slide(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  }

  const visibleProjects = useMemo(
    () =>
      activeFilter === "Todos"
        ? interleaveByMode(siteConfig.projects)
        : siteConfig.projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
    updateEdges();
  }, [activeFilter]);

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
            <h2 className="ps-reveal mt-2 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl lg:text-5xl 2xl:text-[56px] lg:leading-[1.05]">
              Projetos-Modelo
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
        </div>

        {/* Galeria dentro da coluna: mesmas bordas do título e dos filtros, 3 cards por vez no desktop */}
        <div className="relative mt-10">
        {/* Setas laterais: na margem fora da coluna em telas largas; encostadas na borda (sobre o fade) em notebooks; sem setas no toque */}
        {([
          [-1, ChevronLeft, "Modelos anteriores", edges.start, "left-1 min-[1360px]:-left-16"],
          [1, ChevronRight, "Próximos modelos", edges.end, "right-1 min-[1360px]:-right-16"],
        ] as const).map(([dir, Icon, label, atEdge, side]) => (
          <button
            key={label}
            type="button"
            onClick={() => slide(dir)}
            disabled={atEdge}
            aria-label={label}
            className={`absolute top-[121px] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-(--glass-border) bg-(--glass) text-(--fg) shadow-[0_8px_22px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[opacity,scale] duration-300 hover:scale-105 lg:inline-flex ${side} ${
              atEdge ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        ))}
        <div
          ref={railRef}
          onScroll={updateEdges}
          style={{
            // fade só do lado em que ainda há cards, dentro da coluna
            WebkitMaskImage: `linear-gradient(to right, ${edges.start ? "#000" : "transparent"} 0, #000 32px, #000 calc(100% - 32px), ${edges.end ? "#000" : "transparent"} 100%)`,
            maskImage: `linear-gradient(to right, ${edges.start ? "#000" : "transparent"} 0, #000 32px, #000 calc(100% - 32px), ${edges.end ? "#000" : "transparent"} 100%)`,
          }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleProjects.map((project, idx) => {
            const waUrl = buildWhatsAppUrl(project.whatsappPrompt);
            const styles = modeStyles[project.mode];

            return (
              <Reveal key={project.id} delayMs={(idx % 3) * 80} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]">
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
                        {/* miniatura sem barra de navegador: ela volta na prévia (Testar programa) */}
                        <LazyMount placeholder={<div className="h-[380px] animate-pulse bg-(--bg)" />}>
                          <BrowserChromeContext.Provider value={false}>
                            <ProjectProgramVariant variant={project.variant} interactive={false} />
                          </BrowserChromeContext.Provider>
                        </LazyMount>
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
