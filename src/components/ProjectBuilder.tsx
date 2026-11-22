"use client";

import { useState } from "react";
import { ArrowRight, Check, Code2, Copy, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import "@/components/ProjectBuilder.css";

const projectTypes = [
  { id: "Site", label: "Site", icon: Globe },
  { id: "Sistema", label: "Sistema", icon: Code2 },
  { id: "Automação", label: "Automação", icon: Cpu },
  { id: "Correção", label: "Correção", icon: Wrench },
] as const;

const urgencyOptions = ["Urgente", "Este mês", "Sem pressa"] as const;

export function ProjectBuilder() {
  const [selectedType, setSelectedType] = useState<(typeof projectTypes)[number]["id"]>("Site");
  const [urgency, setUrgency] = useState<(typeof urgencyOptions)[number]>("Este mês");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const message = [
    `Olá! Vim pelo site (${siteConfig.brandName}).`,
    `Quero cotar: ${selectedType}.`,
    `Prazo: ${urgency}.`,
    note.trim() ? `Resumo: ${note.trim()}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const waUrl = buildWhatsAppUrl(message);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="orcamento"
      className="relative overflow-hidden border-t border-[#1F2A44]/12 bg-[#F4EDE0] py-20 transition-colors duration-300 sm:py-24 dark:border-[#F2EFE6]/12 dark:bg-[#182032]"
    >
      {/* Subtle architectural drafting pattern (replaces fuzzy AI gradient blobs) */}
      <div
        className="ps-drafting-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_30%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D85D2A] dark:text-[#E05A3A]">
                Orçamento rápido
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1F2A44] sm:text-4xl dark:text-[#F2EFE6]">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#515C73] sm:text-base dark:text-[#A9B4C9]">
                Escolha o formato e o prazo ao lado. A mensagem já abre pronta no WhatsApp para agilizar a conversa.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Escopo direto", "Entrega rápida", "Código no seu nome"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB] px-3 py-1 text-xs font-semibold text-[#1F2A44] dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6]"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div
                className="ps-ticket-card w-full min-w-0 border border-[#1F2A44]/18 bg-[#FAF5EB] p-5 sm:p-8 dark:border-[#F2EFE6]/18 dark:bg-[#202B42]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#1F2A44] dark:text-[#F2EFE6]">
                    Monte seu projeto
                  </h2>
                  <span className="font-tech rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 dark:border-emerald-400/25 dark:text-emerald-300">
                    Resposta rápida
                  </span>
                </div>

                {/* Step 1: Type Chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {projectTypes.map((item) => {
                    const Icon = item.icon;
                    const active = selectedType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedType(item.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                          active
                            ? "border-[#1F2A44] bg-[#1F2A44] text-[#F4EDE0] shadow-sm dark:border-[#F2EFE6] dark:bg-[#F2EFE6] dark:text-[#182032]"
                            : "border-[#1F2A44]/15 bg-[#EFE6D6]/70 text-[#1F2A44] hover:border-[#D85D2A] hover:text-[#D85D2A] dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6]/85 dark:hover:border-[#E05A3A] dark:hover:text-[#E05A3A]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Optional 1-line input */}
                <div className="mt-5">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Opcional: conte em 1 frase o que precisa (ex.: painel de pedidos + WhatsApp)"
                    aria-label="Resumo rápido do projeto"
                    className="w-full rounded-2xl border border-[#1F2A44]/15 bg-[#EFE6D6]/55 px-4 py-3 text-sm text-[#1F2A44] placeholder:text-[#515C73]/70 focus:border-[#D85D2A] focus:bg-white focus:outline-none dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6] dark:placeholder:text-[#A9B4C9]/60 dark:focus:border-[#E05A3A]"
                  />
                </div>

                {/* Step 2: Urgency + Primary Action */}
                <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex w-full flex-wrap justify-between gap-1 rounded-2xl border border-[#1F2A44]/15 bg-[#EFE6D6] p-1 sm:inline-flex sm:w-auto sm:rounded-full dark:border-[#F2EFE6]/15 dark:bg-[#182032]">
                    {urgencyOptions.map((option) => {
                      const active = urgency === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setUrgency(option)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#D85D2A] text-white shadow-2xs dark:bg-[#E05A3A]"
                              : "text-[#515C73] hover:text-[#1F2A44] dark:text-[#A9B4C9] dark:hover:text-[#F2EFE6]"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-tactile-action inline-flex items-center justify-center gap-2 rounded-full bg-[#D85D2A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
                  >
                    <span>Abrir no WhatsApp</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                {/* Compact Preview + Copy */}
                <div className="mt-5 flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#1F2A44]/12 bg-[#EFE6D6]/65 px-3.5 py-2.5 text-xs text-[#515C73] dark:border-[#F2EFE6]/12 dark:bg-[#182032] dark:text-[#A9B4C9]">
                  <p className="min-w-0 flex-1 truncate">{message}</p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#1F2A44] hover:text-[#D85D2A] dark:text-[#F2EFE6] dark:hover:text-[#E05A3A]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {siteConfig.isPlaceholderContact && (
                  <p className="mt-3 text-center text-[11px] text-[#515C73] dark:text-[#A9B4C9]">
                    Número de WhatsApp de exemplo em{" "}
                    <code className="font-tech text-[#1F2A44] dark:text-[#F2EFE6]">src/config/site.ts</code> — substitua pelo seu antes de publicar.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
