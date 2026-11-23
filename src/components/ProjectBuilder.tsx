"use client";

import { useState } from "react";
import { ArrowRight, Check, Code2, Copy, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
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
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
            <div className="min-w-0 max-w-2xl text-center">
              <p className="text-[13px] font-semibold text-(--accent-text)">
                Orçamento rápido
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl lg:text-5xl 2xl:text-[56px] lg:leading-[1.05]">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--fg-2) sm:text-lg">
                Responda 3 perguntas rápidas. A mensagem sai pronta no WhatsApp e você recebe a proposta com prazo e preço fechados.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
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

            <div className="w-full min-w-0">
              <form
                onSubmit={(e) => e.preventDefault()}
                aria-label="Monte seu projeto"
                className="ps-ticket-card w-full min-w-0 rounded-[28px] border border-(--hairline) bg-(--surface) p-5 shadow-[0_30px_60px_-30px_rgba(21,23,28,0.25)] sm:p-8"
              >
                {/* Passo 1 */}
                <fieldset>
                  <legend className="flex items-center gap-2 text-sm font-semibold text-(--fg)">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--ink) text-xs text-(--on-ink)">1</span>
                    O que você precisa?
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {projectTypes.map((item) => {
                      const Icon = item.icon;
                      const active = selectedType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedType(item.id)}
                          className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-3 text-sm font-semibold transition-colors ${
                            active
                              ? "border-(--ink) bg-(--ink) text-(--on-ink)"
                              : "border-(--fg)/15 bg-(--surface) text-(--fg) hover:border-(--fg)/40"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Passo 2 */}
                <fieldset className="mt-6">
                  <legend className="flex items-center gap-2 text-sm font-semibold text-(--fg)">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--ink) text-xs text-(--on-ink)">2</span>
                    Para quando?
                  </legend>
                  <div className="mt-3 grid grid-cols-3 gap-1 rounded-2xl border border-(--fg)/12 bg-(--bg) p-1">
                    {urgencyOptions.map((option) => {
                      const active = urgency === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setUrgency(option)}
                          className={`min-h-10 rounded-xl text-sm font-semibold transition-colors ${
                            active ? "bg-(--surface) text-(--fg) shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-(--fg-2) hover:text-(--fg)"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Passo 3 */}
                <div className="mt-6">
                  <label htmlFor="builder-note" className="flex items-center gap-2 text-sm font-semibold text-(--fg)">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--ink) text-xs text-(--on-ink)">3</span>
                    Conte em uma frase <span className="font-normal text-(--fg-2)">(opcional)</span>
                  </label>
                  <textarea
                    id="builder-note"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex.: loja de roupas com pedido pelo WhatsApp e pagamento no Pix"
                    className="mt-3 w-full resize-none rounded-2xl border border-(--fg)/15 bg-(--surface) px-4 py-3 text-sm text-(--fg) placeholder:text-(--fg-2) focus:border-(--accent) focus:outline-none"
                  />
                </div>

                {/* Envio */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps-prism-cta mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-(--ink) px-6 text-base font-semibold text-(--on-ink) hover:bg-(--ink-hover)"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  Enviar pelo WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <div className="mt-3 flex items-start justify-center gap-2 text-center text-[13px] leading-relaxed text-(--fg-2)">
                  <p className="min-w-0">
                    Vai assim: <span className="text-(--fg)">“{message}”</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copiar mensagem"
                    className="inline-flex shrink-0 items-center gap-1 pt-0.5 font-semibold text-(--fg-2) hover:text-(--fg)"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-(--ok)" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {siteConfig.isPlaceholderContact && (
                  <p className="mt-3 text-center text-[11px] text-(--fg-2)">
                    Número de WhatsApp de exemplo em <code className="font-tech text-(--fg)">src/config/site.ts</code>. Substitua pelo seu antes de publicar.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
