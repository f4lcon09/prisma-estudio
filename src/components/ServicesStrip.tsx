import { ArrowUpRight, Clock, Code2, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

const serviceVisuals = {
  sites: {
    icon: Globe,
    cardBg: "border-blue-100 bg-gradient-to-b from-blue-50/70 to-white hover:border-blue-300",
    iconBg: "bg-blue-600 text-white shadow-sm shadow-blue-500/30",
    linkColor: "text-blue-700 hover:text-blue-800",
  },
  sistemas: {
    icon: Code2,
    cardBg: "border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-white hover:border-indigo-300",
    iconBg: "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30",
    linkColor: "text-indigo-700 hover:text-indigo-800",
  },
  automacoes: {
    icon: Cpu,
    cardBg: "border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white hover:border-emerald-300",
    iconBg: "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30",
    linkColor: "text-emerald-700 hover:text-emerald-800",
  },
  correcoes: {
    icon: Wrench,
    cardBg: "border-amber-200/80 bg-gradient-to-b from-amber-50/75 to-white hover:border-amber-300",
    iconBg: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
    linkColor: "text-amber-700 hover:text-amber-800",
  },
} as const;

export function ServicesStrip() {
  return (
    <section
      id="servicos"
      className="border-t border-slate-200/80 bg-gradient-to-b from-[#FFFDF7] to-[#F4F8FF] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
            Frentes de entrega
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Do site rápido ao sistema completo
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((service) => {
            const visual =
              serviceVisuals[service.id as keyof typeof serviceVisuals] ?? serviceVisuals.sistemas;
            const Icon = visual.icon;
            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-15px_rgba(37,99,235,0.14)] ${visual.cardBg}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${visual.iconBg}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-tech inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                      <Clock className="h-3 w-3 text-amber-500" aria-hidden="true" />
                      {service.turnaround}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold tracking-tight text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {service.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-200/70 bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700"
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
                  className={`mt-6 inline-flex items-center gap-1 text-xs font-semibold transition-colors ${visual.linkColor}`}
                >
                  <span>Pedir {service.shortTitle.toLowerCase()}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
