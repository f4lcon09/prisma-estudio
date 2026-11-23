"use client";

import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  PackageSearch,
  Search,
} from "lucide-react";
import { buildWhatsAppUrl, siteConfig, type TrackedOrder } from "@/config/site";

const categoryAccent: Record<TrackedOrder["category"], string> = {
  Site: "border-(--accent)/35 bg-(--accent)/10 text-(--accent-text)",
  Sistema:
    "border-(--fg)/20 bg-(--bg) text-(--fg)",
  Automação:
    "border-(--ok)/25 bg-(--ok)/10 text-(--ok)",
};

export function OrderTracker() {
  const orders: TrackedOrder[] = siteConfig.orders;
  const defaultOrder = orders[0];
  const [query, setQuery] = useState(defaultOrder?.code ?? "");
  const [activeCode, setActiveCode] = useState(defaultOrder?.code ?? "");

  const normalized = activeCode.trim().toUpperCase();
  const matchedOrder = orders.find(
    (order) => order.code.toUpperCase() === normalized
  );

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setActiveCode(query.trim().toUpperCase());
  }

  function pickCode(code: string) {
    setQuery(code);
    setActiveCode(code);
  }

  return (
    <section className="relative overflow-hidden bg-(--bg) py-12 transition-colors duration-300 sm:py-16">
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_20%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Top Heading */}
        <div className="text-center">
          <span className="font-tech inline-flex items-center gap-2 rounded-full border border-(--fg)/15 bg-(--surface) px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--fg) shadow-2xs">
            <PackageSearch className="h-3.5 w-3.5 text-(--accent-text)" aria-hidden="true" />
            Portal do Cliente
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-(--fg) sm:text-4xl">
            Acompanhe seu{" "}
            <span className="bg-gradient-to-r from-(--accent) via-(--accent) to-(--accent) bg-clip-text text-transparent">
              pedido ao vivo
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-(--fg-2) sm:text-base">
            Digite o código enviado no WhatsApp para ver a etapa atual e a data estimada de entrega.
          </p>
        </div>

        {/* Search Form + Quick Demo Codes */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-(--fg)/15 bg-(--surface) p-4 shadow-[0_18px_45px_-15px_rgba(26,23,21,0.14)] backdrop-blur-md sm:p-5">
          <form onSubmit={handleSearch} className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--fg-2)"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: PRISMA-104"
                aria-label="Código do pedido"
                className="font-tech w-full rounded-xl border border-(--fg)/15 bg-(--bg)/60 py-3 pl-10 pr-4 text-sm uppercase text-(--fg) placeholder:normal-case placeholder:text-(--fg-2)/70 focus:border-(--accent) focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--ink) px-6 py-3 text-sm font-semibold text-(--on-ink) shadow-sm transition-all hover:bg-(--ink-hover)"
            >
              <span>Consultar</span>
              <ArrowRight className="h-4 w-4 text-(--accent-text)" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-(--fg-2)">Testar modelos:</span>
            {siteConfig.orders.map((order) => {
              const selected = order.code.toUpperCase() === normalized;
              return (
                <button
                  key={order.code}
                  type="button"
                  onClick={() => pickCode(order.code)}
                  className={`font-tech rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                    selected
                      ? "border-(--fg) bg-(--ink) text-(--on-ink)"
                      : "border-(--fg)/15 bg-(--bg)/70 text-(--fg) hover:border-(--accent) hover:text-(--accent-text)"
                  }`}
                >
                  {order.code} · {order.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Matched Order Card or Not Found State */}
        {matchedOrder ? (
          <div className="mt-8 rounded-2xl border border-(--fg)/15 bg-(--surface) p-5 shadow-[0_24px_60px_-15px_rgba(26,23,21,0.14)] sm:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-(--fg)/12 pb-6 md:flex-row md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-tech rounded-full bg-(--ink) px-3 py-1 text-xs font-bold text-(--on-ink)">
                    {matchedOrder.code}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      categoryAccent[matchedOrder.category]
                    }`}
                  >
                    {matchedOrder.category}
                  </span>
                  {matchedOrder.isExample && (
                    <span className="rounded-full border border-(--fg)/12 bg-(--bg) px-2.5 py-0.5 text-[11px] font-medium text-(--fg-2)">
                      Pedido demonstrativo
                    </span>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-tight text-(--fg) sm:text-2xl">
                  {matchedOrder.projectTitle}
                </h2>
                <p className="mt-1 text-sm text-(--fg-2)">
                  Cliente:{" "}
                  <strong className="font-semibold text-(--fg)">
                    {matchedOrder.clientName}
                  </strong>
                </p>
              </div>

              {/* Estimated Delivery Box */}
              <div className="rounded-2xl border border-(--ok)/25 bg-(--ok)/8 px-5 py-4 md:min-w-[240px]">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-(--ok)">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Entrega estimada
                </span>
                <p className="mt-1 text-xl font-extrabold text-(--fg)">
                  {matchedOrder.estimatedDelivery}
                </p>
                <p className="font-tech mt-0.5 text-xs font-medium text-(--ok)">
                  {matchedOrder.daysRemainingLabel}
                </p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-(--fg-2)">
                  Etapa atual:{" "}
                  <span className="text-(--accent-text)">
                    {matchedOrder.currentStageTitle}
                  </span>
                </span>
                <span className="font-tech text-(--fg)">
                  {matchedOrder.progressPercent}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-(--bg)">
                <div
                  style={{ width: `${matchedOrder.progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-(--accent) via-(--ink) to-(--ok) transition-all duration-500"
                />
              </div>
            </div>

            {/* Stages Timeline */}
            <ol className="mt-8 space-y-4">
              {matchedOrder.stages.map((stage, index) => {
                const isDone = stage.status === "done";
                const isCurrent = stage.status === "current";
                return (
                  <li
                    key={stage.title}
                    className={`flex gap-3.5 rounded-2xl border p-4 transition-colors ${
                      isCurrent
                        ? "border-(--accent)/45 bg-(--accent)/10"
                        : isDone
                        ? "border-(--ok)/20 bg-(--ok)/7"
                        : "border-(--fg)/12 bg-(--bg)/55"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--ok) text-(--on-ink)">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--accent) text-(--on-accent) ring-4 ring-(--accent)/25">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {!isDone && !isCurrent && (
                        <span className="font-tech flex h-6 w-6 items-center justify-center rounded-full border border-(--fg)/20 bg-(--surface) text-[11px] font-bold text-(--fg-2)">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-(--fg)">
                          {stage.title}
                        </h3>
                        <span className="font-tech text-[11px] font-semibold text-(--fg-2)">
                          {stage.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-(--fg-2) sm:text-sm">
                        {stage.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Footer Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-(--fg)/12 pt-5">
              {matchedOrder.previewUrl ? (
                <a
                  href={matchedOrder.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-text) hover:text-(--fg)"
                >
                  <span>Abrir prévia do projeto</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-xs text-(--fg-2)">
                  Dúvidas ou ajustes nesta etapa? Fale direto no WhatsApp.
                </span>
              )}

              <a
                href={buildWhatsAppUrl(
                  `Olá! Estou acompanhando o pedido ${matchedOrder.code} (${matchedOrder.projectTitle}) e gostaria de falar sobre o andamento.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-(--ink) px-5 py-2.5 text-xs font-semibold text-(--on-ink) shadow-sm transition-colors hover:bg-(--ink-hover)"
              >
                <span>Falar sobre este pedido</span>
                <ArrowRight className="h-3.5 w-3.5 text-(--accent-text)" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-(--accent)/35 bg-(--surface) p-6 text-center shadow-sm">
            <p className="text-base font-bold text-(--fg)">
              Pedido <span className="font-tech text-(--accent-text)">{normalized || "—"}</span> não encontrado
            </p>
            <p className="mt-1.5 text-sm text-(--fg-2)">
              Confira se digitou o código exatamente como recebeu (ex.: <code className="font-tech">PRISMA-104</code>) ou fale direto no WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                `Olá! Não encontrei meu código de acompanhamento (${normalized || "sem código"}) no site. Pode me enviar o status?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-(--ink) px-5 py-2.5 text-xs font-semibold text-(--on-ink) hover:bg-(--ink-hover)"
            >
              <span>Consultar no WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
