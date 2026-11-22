"use client";

import { useState } from "react";
import { ArrowRight, Check, Code2, Copy, Cpu, Globe, Wrench } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";

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
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-[#F4F8FF] via-white to-[#FFFBEB]/60 py-20 sm:py-24"
    >
      {/* Rich Amber + Cobalt + Emerald Aurora behind the glass card */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-72 w-80 -translate-x-28 rounded-full bg-amber-400/40 blur-[90px]" />
        <div className="h-72 w-80 translate-x-28 rounded-full bg-blue-500/40 blur-[90px]" />
        <div className="absolute h-48 w-64 translate-y-12 rounded-full bg-emerald-400/25 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Orçamento rápido
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Pronto para tirar seu projeto do papel?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Escolha o formato e o prazo ao lado. A mensagem já abre pronta no WhatsApp para agilizar a conversa.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Escopo direto", "Entrega rápida", "Código no seu nome"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-blue-200/70 bg-white/85 p-6 shadow-[0_24px_60px_-15px_rgba(37,99,235,0.16)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              Monte seu projeto
            </h2>
            <span className="font-tech rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
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
                      ? "border-blue-600 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-sm shadow-blue-500/30"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Step 2: Urgency + Primary WhatsApp Action */}
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex w-full flex-wrap justify-between gap-1 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-1 sm:inline-flex sm:w-auto sm:rounded-full">
              {urgencyOptions.map((option) => {
                const active = urgency === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setUrgency(option)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-amber-500 text-white shadow-2xs"
                        : "text-slate-700 hover:text-amber-800"
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700"
            >
              <span>Abrir no WhatsApp</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Compact Preview + Copy */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
            <p className="truncate">{message}</p>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex shrink-0 items-center gap-1 font-semibold text-slate-700 hover:text-blue-600"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
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
            <p className="mt-3 text-center text-[11px] text-slate-400">
              Número de WhatsApp de exemplo em{" "}
              <code className="font-tech text-slate-600">src/config/site.ts</code> — substitua pelo seu antes de publicar.
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
