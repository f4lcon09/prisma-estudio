import { ArrowUpRight, Clock, Code2, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import "@/components/ServicesStrip.css";

const serviceVisuals = {
  sites: {
    icon: Globe,
    iconBg: "bg-[#D85D2A] text-white dark:bg-[#E05A3A]",
  },
  sistemas: {
    icon: Code2,
    iconBg: "bg-[#1F2A44] text-[#F4EDE0] dark:bg-[#2A52BE] dark:text-white",
  },
  automacoes: {
    icon: Cpu,
    iconBg: "bg-[#167953] text-white dark:bg-[#10B981] dark:text-[#092118]",
  },
  correcoes: {
    icon: Wrench,
    iconBg: "bg-[#B86A22] text-white dark:bg-[#D97706] dark:text-white",
  },
} as const;

export function ServicesStrip() {
  return (
    <section
      id="servicos"
      className="border-t border-[#1F2A44]/15 bg-[#1F2A44] py-20 text-[#F4EDE0] transition-colors duration-300 sm:py-24 dark:border-[#F2EFE6]/12 dark:bg-[#182032] dark:text-[#F2EFE6]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F08B63] dark:text-[#E05A3A]">
            Frentes de entrega
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F4EDE0] sm:text-4xl dark:text-[#F2EFE6]">
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
                  className="ps-service-card flex h-full flex-col justify-between border border-[#F4EDE0]/15 bg-[#FAF5EB] p-6 text-[#1F2A44] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] hover:border-[#D85D2A] dark:border-[#F2EFE6]/12 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:border-[#E05A3A]/70"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${visual.iconBg}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="ps-service-index font-tech inline-flex items-center gap-1 rounded-md border border-[#1F2A44]/15 bg-[#EFE6D6] px-2.5 py-1 text-[10px] font-semibold text-[#1F2A44] dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6]">
                        <Clock className="h-3 w-3 text-[#D85D2A] dark:text-[#E05A3A]" aria-hidden="true" />
                        {service.turnaround}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold tracking-tight text-[#1F2A44] dark:text-[#F2EFE6]">
                        {service.title}
                      </h3>
                      <span className="ps-service-index font-tech text-[10px] font-semibold text-[#515C73]/60 dark:text-[#A9B4C9]/50">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#515C73] dark:text-[#A9B4C9]">
                      {service.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-[#1F2A44]/12 bg-[#EFE6D6]/75 px-2 py-1 text-[11px] font-medium text-[#1F2A44] dark:border-[#F2EFE6]/12 dark:bg-[#182032]/80 dark:text-[#F2EFE6]/90"
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
                    className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[#D85D2A] transition-colors hover:text-[#BF4E20] dark:text-[#E05A3A] dark:hover:text-[#F28B6B]"
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
