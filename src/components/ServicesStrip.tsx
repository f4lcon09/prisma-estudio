import { ArrowUpRight, Clock, Code2, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { CtaPair } from "@/components/CtaPair";
import "@/components/ServicesStrip.css";

const serviceVisuals = {
  sites: {
    icon: Globe,
    iconBg: "bg-(--accent) text-(--on-accent)",
  },
  sistemas: {
    icon: Code2,
    iconBg: "bg-(--ink) text-(--on-ink)",
  },
  automacoes: {
    icon: Cpu,
    iconBg: "bg-(--ok) text-(--on-ink)",
  },
  correcoes: {
    icon: Wrench,
    iconBg: "bg-(--accent) text-(--on-accent)",
  },
} as const;

export function ServicesStrip() {
  return (
    <section
      id="servicos"
      className="band-dark ps-band-glow py-20 text-(--fg) sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="text-[13px] font-semibold text-(--accent-text)">
            Frentes de entrega
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl">
            Do site rápido ao sistema completo
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((service, idx) => {
            const visual =
              serviceVisuals[service.id as keyof typeof serviceVisuals] ?? serviceVisuals.sistemas;
            const Icon = visual.icon;
            return (
              <Reveal key={service.id} delayMs={idx * 75}>
                <article
                  className="ps-service-card flex h-full flex-col justify-between border border-(--on-ink)/14 bg-(--surface) p-6 text-(--fg) shadow-[0_20px_45px_-20px_rgba(0,0,0,0.4)] hover:border-(--accent)"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${visual.iconBg}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="ps-service-index font-tech inline-flex items-center gap-1 rounded-md border border-(--fg)/15 bg-(--bg) px-2.5 py-1 text-[10px] font-semibold text-(--fg)">
                        <Clock className="h-3 w-3 text-(--accent-text)" aria-hidden="true" />
                        {service.turnaround}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold tracking-tight text-(--fg)">
                        {service.title}
                      </h3>
                      <span className="ps-service-index font-tech text-[10px] font-semibold text-(--fg-2)/60">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-(--fg-2)">
                      {service.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-(--fg)/12 bg-(--bg)/75 px-2 py-1 text-[11px] font-medium text-(--fg)"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppUrl(service.whatsappPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-(--accent-text) transition-colors hover:text-(--fg)"
                  >
                    <span>Pedir {service.shortTitle.toLowerCase()}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
        <CtaPair className="mt-12" />
      </div>
    </section>
  );
}
