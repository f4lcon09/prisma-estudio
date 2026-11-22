import { ArrowUpRight, Clock, Code2, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import "@/components/ServicesStrip.css";

const serviceVisuals = {
  sites: {
    icon: Globe,
    iconBg: "bg-[#B08D57] text-[#1A1715] dark:bg-[#B7410E] dark:text-[#FAF6EE]",
  },
  sistemas: {
    icon: Code2,
    iconBg: "bg-[#1A1715] text-[#EAE3D5] dark:bg-[#ECE5D8] dark:text-[#17181A]",
  },
  automacoes: {
    icon: Cpu,
    iconBg: "bg-[#263A32] text-[#EAE3D5] dark:bg-[#263A32] dark:text-[#9CAF88]",
  },
  correcoes: {
    icon: Wrench,
    iconBg: "bg-[#6E5636] text-[#FAF6EE] dark:bg-[#B08D57] dark:text-[#17181A]",
  },
} as const;

export function ServicesStrip() {
  return (
    <section
      id="servicos"
      className="border-t border-[#1A1715]/15 bg-[#1A1715] py-20 text-[#EAE3D5] transition-colors duration-300 sm:py-24 dark:border-[#ECE5D8]/12 dark:bg-[#17181A] dark:text-[#ECE5D8]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B08D57]">
            Frentes de entrega
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#EAE3D5] sm:text-4xl dark:text-[#ECE5D8]">
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
                  className="ps-service-card flex h-full flex-col justify-between border border-[#EAE3D5]/14 bg-[#FAF6EE] p-6 text-[#1A1715] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.4)] hover:border-[#B08D57] dark:border-[#ECE5D8]/12 dark:bg-[#1E2421] dark:text-[#ECE5D8] dark:hover:border-[#B7410E]/75"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${visual.iconBg}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="ps-service-index font-tech inline-flex items-center gap-1 rounded-md border border-[#1A1715]/15 bg-[#EAE3D5] px-2.5 py-1 text-[10px] font-semibold text-[#1A1715] dark:border-[#ECE5D8]/15 dark:bg-[#17181A] dark:text-[#ECE5D8]">
                        <Clock className="h-3 w-3 text-[#8E6F3E] dark:text-[#B08D57]" aria-hidden="true" />
                        {service.turnaround}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold tracking-tight text-[#1A1715] dark:text-[#ECE5D8]">
                        {service.title}
                      </h3>
                      <span className="ps-service-index font-tech text-[10px] font-semibold text-[#5C5348]/60 dark:text-[#A8A095]/55">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5C5348] dark:text-[#A8A095]">
                      {service.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-[#1A1715]/12 bg-[#EAE3D5]/75 px-2 py-1 text-[11px] font-medium text-[#1A1715] dark:border-[#ECE5D8]/12 dark:bg-[#17181A]/75 dark:text-[#ECE5D8]/90"
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
                    className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[#8E6F3E] transition-colors hover:text-[#1A1715] dark:text-[#C88B53] dark:hover:text-[#ECE5D8]"
                  >
                    <span>Pedir {service.shortTitle.toLowerCase()}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
