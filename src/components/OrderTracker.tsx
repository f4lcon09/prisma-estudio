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
  Site: "border-amber-200 bg-amber-50 text-amber-800",
  Sistema: "border-blue-200 bg-blue-50 text-blue-700",
  Automação: "border-emerald-200 bg-emerald-50 text-emerald-700",
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFBEB]/55 via-[#F8FAFC] to-[#EFF6FF]/60 py-12 sm:py-16">
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_20%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Top Heading */}
        <div className="text-center">
          <span className="font-tech inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-2xs">
            <PackageSearch className="h-3.5 w-3.5" aria-hidden="true" />
            Portal do Cliente
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Acompanhe seu{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#D97706] bg-clip-text text-transparent">
              pedido ao vivo
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
            Digite o código enviado no WhatsApp para ver a etapa atual e a data estimada de entrega.
          </p>
        </div>

        {/* Search Form + Quick Demo Codes */}
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_18px_45px_-15px_rgba(37,99,235,0.14)] backdrop-blur-md sm:p-5">
          <form onSubmit={handleSearch} className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: PRISMA-104"
                aria-label="Código do pedido"
                className="font-tech w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-sm uppercase text-slate-900 placeholder:normal-case placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:from-[#1D4ED8] hover:to-[#4338CA]"
            >
              <span>Consultar</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Testar modelos:</span>
            {siteConfig.orders.map((order) => {
              const selected = order.code.toUpperCase() === normalized;
              return (
                <button
                  key={order.code}
                  type="button"
                  onClick={() => pickCode(order.code)}
                  className={`font-tech rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:text-blue-700"
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
          <div className="mt-8 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.1)] sm:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-slate-200/80 pb-6 md:flex-row md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-tech rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
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
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                      Pedido demonstrativo
                    </span>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                  {matchedOrder.projectTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Cliente: <strong className="font-semibold text-slate-900">{matchedOrder.clientName}</strong>
                </p>
              </div>

              {/* Estimated Delivery Box */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 to-white px-5 py-4 md:min-w-[240px]">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Entrega estimada
                </span>
                <p className="mt-1 text-xl font-extrabold text-slate-950">
                  {matchedOrder.estimatedDelivery}
                </p>
                <p className="font-tech mt-0.5 text-xs font-medium text-emerald-700">
                  {matchedOrder.daysRemainingLabel}
                </p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">
                  Etapa atual:{" "}
                  <span className="text-blue-600">{matchedOrder.currentStageTitle}</span>
                </span>
                <span className="font-tech text-slate-900">{matchedOrder.progressPercent}%</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  style={{ width: `${matchedOrder.progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] via-[#2563EB] to-[#10B981] transition-all duration-500"
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
                        ? "border-blue-200 bg-blue-50/50"
                        : isDone
                        ? "border-emerald-100 bg-emerald-50/30"
                        : "border-slate-200/70 bg-slate-50/50"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-100">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {!isDone && !isCurrent && (
                        <span className="font-tech flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-bold text-slate-500">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-950">{stage.title}</h3>
                        <span className="font-tech text-[11px] font-semibold text-slate-500">
                          {stage.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {stage.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Footer Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
              {matchedOrder.previewUrl ? (
                <a
                  href={matchedOrder.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Abrir prévia do projeto</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">
                  Dúvidas ou ajustes nesta etapa? Fale direto no WhatsApp.
                </span>
              )}

              <a
                href={buildWhatsAppUrl(
                  `Olá! Estou acompanhando o pedido ${matchedOrder.code} (${matchedOrder.projectTitle}) e gostaria de falar sobre o andamento.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                <span>Falar sobre este pedido</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm">
            <p className="text-base font-bold text-slate-950">
              Pedido <span className="font-tech text-blue-600">{normalized || "—"}</span> não encontrado
            </p>
            <p className="mt-1.5 text-sm text-slate-600">
              Confira se digitou o código exatamente como recebeu (ex.: <code className="font-tech">PRISMA-104</code>) ou fale direto no WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                `Olá! Não encontrei meu código de acompanhamento (${normalized || "sem código"}) no site. Pode me enviar o status?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-600"
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
