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
      className="relative overflow-hidden border-t border-(--fg)/12 bg-(--bg) py-20 transition-colors duration-300 sm:py-24"
    >
      {/* Architectural drafting pattern */}
      <div
        className="ps-drafting-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_30%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <p className="text-[13px] font-semibold text-(--accent-text)">
                Orçamento rápido
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-(--fg-2) sm:text-base">
                Escolha o formato e o prazo ao lado. A mensagem já abre pronta no WhatsApp para agilizar a conversa.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Escopo direto", "Entrega rápida", "Código no seu nome"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-(--fg)/15 bg-(--surface) px-3 py-1 text-xs font-semibold text-(--fg)"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="ps-ticket-card w-full min-w-0 border border-(--fg)/18 bg-(--surface) p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-(--fg)">
                    Monte seu projeto
                  </h2>
                  <span className="font-tech rounded-full border border-(--ok)/25 bg-(--ok)/10 px-2.5 py-1 text-[10px] font-semibold text-(--ok)">
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
                            ? "border-(--fg) bg-(--ink) text-(--on-ink) shadow-sm"
                            : "border-(--fg)/15 bg-(--bg)/75 text-(--fg) hover:border-(--accent) hover:text-(--accent-text)"
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
                    placeholder="Opcional: conte em 1 frase o que precisa (ex.: loja de moda + WhatsApp)"
                    aria-label="Resumo rápido do projeto"
                    className="w-full rounded-2xl border border-(--fg)/15 bg-(--bg)/55 px-4 py-3 text-sm text-(--fg) placeholder:text-(--fg-2)/70 focus:border-(--accent) focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Step 2: Urgency + Primary Action */}
                <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex w-full flex-wrap justify-between gap-1 rounded-2xl border border-(--fg)/15 bg-(--bg) p-1 sm:inline-flex sm:w-auto sm:rounded-full">
                    {urgencyOptions.map((option) => {
                      const active = urgency === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setUrgency(option)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            active
                              ? "bg-(--accent) text-(--on-accent) shadow-2xs"
                              : "text-(--fg-2) hover:text-(--fg)"
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
                    className="ps-tactile-action inline-flex items-center justify-center gap-2 rounded-full bg-(--ink) px-6 py-3 text-sm font-semibold text-(--on-ink) hover:bg-(--ink-hover)"
                  >
                    <span>Abrir no WhatsApp</span>
                    <ArrowRight className="h-4 w-4 text-(--accent-text)" aria-hidden="true" />
                  </a>
                </div>

                {/* Compact Preview + Copy */}
                <div className="mt-5 flex min-w-0 items-center justify-between gap-3 rounded-xl border border-(--fg)/12 bg-(--bg)/65 px-3.5 py-2.5 text-xs text-(--fg-2)">
                  <p className="min-w-0 flex-1 truncate">{message}</p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-(--fg) hover:text-(--accent-text)"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-(--ok)" />
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
                  <p className="mt-3 text-center text-[11px] text-(--fg-2)">
                    Número de WhatsApp de exemplo em{" "}
                    <code className="font-tech text-(--fg)">src/config/site.ts</code> — substitua pelo seu antes de publicar.
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
