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
  Site: "border-[#D85D2A]/30 bg-[#F9E7DF] text-[#A8431B] dark:border-[#E05A3A]/35 dark:bg-[#E05A3A]/15 dark:text-[#F4A693]",
  Sistema:
    "border-[#1F2A44]/20 bg-[#EFE6D6] text-[#1F2A44] dark:border-[#60A5FA]/30 dark:bg-[#2A52BE]/20 dark:text-[#BFDBFE]",
  Automação:
    "border-emerald-600/25 bg-emerald-500/12 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300",
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
    <section className="relative overflow-hidden bg-[#F4EDE0] py-12 transition-colors duration-300 sm:py-16 dark:bg-[#182032]">
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_20%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Top Heading */}
        <div className="text-center">
          <span className="font-tech inline-flex items-center gap-2 rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F2A44] shadow-2xs dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6]">
            <PackageSearch className="h-3.5 w-3.5 text-[#D85D2A] dark:text-[#E05A3A]" aria-hidden="true" />
            Portal do Cliente
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1F2A44] sm:text-4xl dark:text-[#F2EFE6]">
            Acompanhe seu{" "}
            <span className="bg-gradient-to-r from-[#D85D2A] via-[#B44622] to-[#1F2A44] bg-clip-text text-transparent dark:from-[#E05A3A] dark:via-[#F28B6B] dark:to-[#60A5FA]">
              pedido ao vivo
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#515C73] sm:text-base dark:text-[#A9B4C9]">
            Digite o código enviado no WhatsApp para ver a etapa atual e a data estimada de entrega.
          </p>
        </div>

        {/* Search Form + Quick Demo Codes */}
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-[#1F2A44]/15 bg-[#FAF5EB] p-4 shadow-[0_18px_45px_-15px_rgba(31,42,68,0.14)] backdrop-blur-md sm:p-5 dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:shadow-[0_24px_55px_-18px_rgba(0,0,0,0.45)]">
          <form onSubmit={handleSearch} className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#515C73] dark:text-[#A9B4C9]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: PRISMA-104"
                aria-label="Código do pedido"
                className="font-tech w-full rounded-2xl border border-[#1F2A44]/15 bg-[#EFE6D6]/60 py-3 pl-10 pr-4 text-sm uppercase text-[#1F2A44] placeholder:normal-case placeholder:text-[#515C73]/70 focus:border-[#D85D2A] focus:bg-white focus:outline-none dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6] dark:placeholder:text-[#A9B4C9]/60 dark:focus:border-[#E05A3A]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D85D2A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
            >
              <span>Consultar</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#515C73] dark:text-[#A9B4C9]">Testar modelos:</span>
            {siteConfig.orders.map((order) => {
              const selected = order.code.toUpperCase() === normalized;
              return (
                <button
                  key={order.code}
                  type="button"
                  onClick={() => pickCode(order.code)}
                  className={`font-tech rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                    selected
                      ? "border-[#1F2A44] bg-[#1F2A44] text-[#F4EDE0] dark:border-[#F2EFE6] dark:bg-[#F2EFE6] dark:text-[#182032]"
                      : "border-[#1F2A44]/15 bg-[#EFE6D6]/70 text-[#1F2A44] hover:border-[#D85D2A] hover:text-[#D85D2A] dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6]/85 dark:hover:border-[#E05A3A] dark:hover:text-[#E05A3A]"
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
          <div className="mt-8 rounded-3xl border border-[#1F2A44]/15 bg-[#FAF5EB] p-5 shadow-[0_24px_60px_-15px_rgba(31,42,68,0.14)] sm:p-8 dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:shadow-[0_28px_65px_-18px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col justify-between gap-5 border-b border-[#1F2A44]/12 pb-6 md:flex-row md:items-center dark:border-[#F2EFE6]/12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-tech rounded-full bg-[#1F2A44] px-3 py-1 text-xs font-bold text-[#F4EDE0] dark:bg-[#F2EFE6] dark:text-[#182032]">
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
                    <span className="rounded-full border border-[#1F2A44]/12 bg-[#EFE6D6] px-2.5 py-0.5 text-[11px] font-medium text-[#515C73] dark:border-[#F2EFE6]/12 dark:bg-[#182032] dark:text-[#A9B4C9]">
                      Pedido demonstrativo
                    </span>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#1F2A44] sm:text-2xl dark:text-[#F2EFE6]">
                  {matchedOrder.projectTitle}
                </h2>
                <p className="mt-1 text-sm text-[#515C73] dark:text-[#A9B4C9]">
                  Cliente:{" "}
                  <strong className="font-semibold text-[#1F2A44] dark:text-[#F2EFE6]">
                    {matchedOrder.clientName}
                  </strong>
                </p>
              </div>

              {/* Estimated Delivery Box */}
              <div className="rounded-2xl border border-emerald-600/25 bg-emerald-500/8 px-5 py-4 md:min-w-[240px] dark:border-emerald-400/25 dark:bg-emerald-500/12">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Entrega estimada
                </span>
                <p className="mt-1 text-xl font-extrabold text-[#1F2A44] dark:text-[#F2EFE6]">
                  {matchedOrder.estimatedDelivery}
                </p>
                <p className="font-tech mt-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {matchedOrder.daysRemainingLabel}
                </p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#515C73] dark:text-[#A9B4C9]">
                  Etapa atual:{" "}
                  <span className="text-[#D85D2A] dark:text-[#E05A3A]">
                    {matchedOrder.currentStageTitle}
                  </span>
                </span>
                <span className="font-tech text-[#1F2A44] dark:text-[#F2EFE6]">
                  {matchedOrder.progressPercent}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#EFE6D6] dark:bg-[#182032]">
                <div
                  style={{ width: `${matchedOrder.progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#D85D2A] via-[#1F2A44] to-emerald-600 transition-all duration-500 dark:from-[#E05A3A] dark:via-[#60A5FA] dark:to-emerald-400"
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
                        ? "border-[#D85D2A]/35 bg-[#F9E7DF]/55 dark:border-[#E05A3A]/40 dark:bg-[#E05A3A]/12"
                        : isDone
                        ? "border-emerald-600/20 bg-emerald-500/8 dark:border-emerald-400/20 dark:bg-emerald-500/10"
                        : "border-[#1F2A44]/12 bg-[#EFE6D6]/55 dark:border-[#F2EFE6]/12 dark:bg-[#182032]/70"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D85D2A] text-white ring-4 ring-[#D85D2A]/20 dark:bg-[#E05A3A] dark:ring-[#E05A3A]/20">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {!isDone && !isCurrent && (
                        <span className="font-tech flex h-6 w-6 items-center justify-center rounded-full border border-[#1F2A44]/20 bg-[#FAF5EB] text-[11px] font-bold text-[#515C73] dark:border-[#F2EFE6]/20 dark:bg-[#202B42] dark:text-[#A9B4C9]">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-[#1F2A44] dark:text-[#F2EFE6]">
                          {stage.title}
                        </h3>
                        <span className="font-tech text-[11px] font-semibold text-[#515C73] dark:text-[#A9B4C9]">
                          {stage.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#515C73] sm:text-sm dark:text-[#A9B4C9]">
                        {stage.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Footer Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#1F2A44]/12 pt-5 dark:border-[#F2EFE6]/12">
              {matchedOrder.previewUrl ? (
                <a
                  href={matchedOrder.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D85D2A] hover:text-[#BF4E20] dark:text-[#E05A3A] dark:hover:text-[#F28B6B]"
                >
                  <span>Abrir prévia do projeto</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-xs text-[#515C73] dark:text-[#A9B4C9]">
                  Dúvidas ou ajustes nesta etapa? Fale direto no WhatsApp.
                </span>
              )}

              <a
                href={buildWhatsAppUrl(
                  `Olá! Estou acompanhando o pedido ${matchedOrder.code} (${matchedOrder.projectTitle}) e gostaria de falar sobre o andamento.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#D85D2A] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
              >
                <span>Falar sobre este pedido</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-[#D85D2A]/30 bg-[#FAF5EB] p-6 text-center shadow-sm dark:border-[#E05A3A]/30 dark:bg-[#202B42]">
            <p className="text-base font-bold text-[#1F2A44] dark:text-[#F2EFE6]">
              Pedido <span className="font-tech text-[#D85D2A] dark:text-[#E05A3A]">{normalized || "—"}</span> não encontrado
            </p>
            <p className="mt-1.5 text-sm text-[#515C73] dark:text-[#A9B4C9]">
              Confira se digitou o código exatamente como recebeu (ex.: <code className="font-tech">PRISMA-104</code>) ou fale direto no WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                `Olá! Não encontrei meu código de acompanhamento (${normalized || "sem código"}) no site. Pode me enviar o status?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1F2A44] px-5 py-2.5 text-xs font-semibold text-[#F4EDE0] hover:bg-[#D85D2A] hover:text-white dark:bg-[#E05A3A] dark:text-white dark:hover:bg-[#C94B2D]"
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
