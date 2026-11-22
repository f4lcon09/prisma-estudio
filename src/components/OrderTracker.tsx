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
  Site: "border-[#B08D57]/35 bg-[#F2E9D8] text-[#6E5636] dark:border-[#B7410E]/35 dark:bg-[#B7410E]/15 dark:text-[#E09F67]",
  Sistema:
    "border-[#1A1715]/20 bg-[#EAE3D5] text-[#1A1715] dark:border-[#ECE5D8]/20 dark:bg-[#202226] dark:text-[#ECE5D8]",
  Automação:
    "border-[#263A32]/25 bg-[#E3EAE5] text-[#263A32] dark:border-[#9CAF88]/30 dark:bg-[#263A32]/45 dark:text-[#9CAF88]",
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
    <section className="relative overflow-hidden bg-[#EAE3D5] py-12 transition-colors duration-300 sm:py-16 dark:bg-[#17181A]">
      <div
        className="bg-studio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_20%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Top Heading */}
        <div className="text-center">
          <span className="font-tech inline-flex items-center gap-2 rounded-full border border-[#1A1715]/15 bg-[#FAF6EE] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A1715] shadow-2xs dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8]">
            <PackageSearch className="h-3.5 w-3.5 text-[#B08D57] dark:text-[#B7410E]" aria-hidden="true" />
            Portal do Cliente
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1A1715] sm:text-4xl dark:text-[#ECE5D8]">
            Acompanhe seu{" "}
            <span className="bg-gradient-to-r from-[#6E5636] via-[#8E6F3E] to-[#B08D57] bg-clip-text text-transparent dark:from-[#C88B53] dark:via-[#E09F67] dark:to-[#B7410E]">
              pedido ao vivo
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#5C5348] sm:text-base dark:text-[#A8A095]">
            Digite o código enviado no WhatsApp para ver a etapa atual e a data estimada de entrega.
          </p>
        </div>

        {/* Search Form + Quick Demo Codes */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#1A1715]/15 bg-[#FAF6EE] p-4 shadow-[0_18px_45px_-15px_rgba(26,23,21,0.14)] backdrop-blur-md sm:p-5 dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:shadow-[0_24px_55px_-18px_rgba(0,0,0,0.45)]">
          <form onSubmit={handleSearch} className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C5348] dark:text-[#A8A095]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: PRISMA-104"
                aria-label="Código do pedido"
                className="font-tech w-full rounded-xl border border-[#1A1715]/15 bg-[#EAE3D5]/60 py-3 pl-10 pr-4 text-sm uppercase text-[#1A1715] placeholder:normal-case placeholder:text-[#5C5348]/70 focus:border-[#B08D57] focus:bg-white focus:outline-none dark:border-[#ECE5D8]/15 dark:bg-[#17181A] dark:text-[#ECE5D8] dark:placeholder:text-[#A8A095]/60 dark:focus:border-[#B7410E]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A1715] px-6 py-3 text-sm font-semibold text-[#EAE3D5] shadow-sm transition-all hover:bg-[#332D28] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
            >
              <span>Consultar</span>
              <ArrowRight className="h-4 w-4 text-[#B08D57] dark:text-[#FAF6EE]" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#5C5348] dark:text-[#A8A095]">Testar modelos:</span>
            {siteConfig.orders.map((order) => {
              const selected = order.code.toUpperCase() === normalized;
              return (
                <button
                  key={order.code}
                  type="button"
                  onClick={() => pickCode(order.code)}
                  className={`font-tech rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                    selected
                      ? "border-[#1A1715] bg-[#1A1715] text-[#EAE3D5] dark:border-[#ECE5D8] dark:bg-[#ECE5D8] dark:text-[#17181A]"
                      : "border-[#1A1715]/15 bg-[#EAE3D5]/70 text-[#1A1715] hover:border-[#B08D57] hover:text-[#8E6F3E] dark:border-[#ECE5D8]/15 dark:bg-[#17181A] dark:text-[#ECE5D8]/85 dark:hover:border-[#B08D57] dark:hover:text-[#B08D57]"
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
          <div className="mt-8 rounded-2xl border border-[#1A1715]/15 bg-[#FAF6EE] p-5 shadow-[0_24px_60px_-15px_rgba(26,23,21,0.14)] sm:p-8 dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:shadow-[0_28px_65px_-18px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col justify-between gap-5 border-b border-[#1A1715]/12 pb-6 md:flex-row md:items-center dark:border-[#ECE5D8]/12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-tech rounded-full bg-[#1A1715] px-3 py-1 text-xs font-bold text-[#EAE3D5] dark:bg-[#ECE5D8] dark:text-[#17181A]">
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
                    <span className="rounded-full border border-[#1A1715]/12 bg-[#EAE3D5] px-2.5 py-0.5 text-[11px] font-medium text-[#5C5348] dark:border-[#ECE5D8]/12 dark:bg-[#17181A] dark:text-[#A8A095]">
                      Pedido demonstrativo
                    </span>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#1A1715] sm:text-2xl dark:text-[#ECE5D8]">
                  {matchedOrder.projectTitle}
                </h2>
                <p className="mt-1 text-sm text-[#5C5348] dark:text-[#A8A095]">
                  Cliente:{" "}
                  <strong className="font-semibold text-[#1A1715] dark:text-[#ECE5D8]">
                    {matchedOrder.clientName}
                  </strong>
                </p>
              </div>

              {/* Estimated Delivery Box */}
              <div className="rounded-2xl border border-[#263A32]/25 bg-[#263A32]/8 px-5 py-4 md:min-w-[240px] dark:border-[#9CAF88]/25 dark:bg-[#1E2421]">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#263A32] dark:text-[#9CAF88]">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Entrega estimada
                </span>
                <p className="mt-1 text-xl font-extrabold text-[#1A1715] dark:text-[#ECE5D8]">
                  {matchedOrder.estimatedDelivery}
                </p>
                <p className="font-tech mt-0.5 text-xs font-medium text-[#263A32] dark:text-[#9CAF88]">
                  {matchedOrder.daysRemainingLabel}
                </p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#5C5348] dark:text-[#A8A095]">
                  Etapa atual:{" "}
                  <span className="text-[#8E6F3E] dark:text-[#B08D57]">
                    {matchedOrder.currentStageTitle}
                  </span>
                </span>
                <span className="font-tech text-[#1A1715] dark:text-[#ECE5D8]">
                  {matchedOrder.progressPercent}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#EAE3D5] dark:bg-[#17181A]">
                <div
                  style={{ width: `${matchedOrder.progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#B08D57] via-[#1A1715] to-[#263A32] transition-all duration-500 dark:from-[#B7410E] dark:via-[#B08D57] dark:to-[#9CAF88]"
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
                        ? "border-[#B08D57]/45 bg-[#F2E9D8]/65 dark:border-[#B7410E]/45 dark:bg-[#B7410E]/12"
                        : isDone
                        ? "border-[#263A32]/20 bg-[#263A32]/7 dark:border-[#9CAF88]/20 dark:bg-[#1E2421]"
                        : "border-[#1A1715]/12 bg-[#EAE3D5]/55 dark:border-[#ECE5D8]/12 dark:bg-[#17181A]/70"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#263A32] text-[#EAE3D5]">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B08D57] text-[#1A1715] ring-4 ring-[#B08D57]/25 dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:ring-[#B7410E]/25">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                      {!isDone && !isCurrent && (
                        <span className="font-tech flex h-6 w-6 items-center justify-center rounded-full border border-[#1A1715]/20 bg-[#FAF6EE] text-[11px] font-bold text-[#5C5348] dark:border-[#ECE5D8]/20 dark:bg-[#202226] dark:text-[#A8A095]">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-[#1A1715] dark:text-[#ECE5D8]">
                          {stage.title}
                        </h3>
                        <span className="font-tech text-[11px] font-semibold text-[#5C5348] dark:text-[#A8A095]">
                          {stage.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#5C5348] sm:text-sm dark:text-[#A8A095]">
                        {stage.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Footer Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#1A1715]/12 pt-5 dark:border-[#ECE5D8]/12">
              {matchedOrder.previewUrl ? (
                <a
                  href={matchedOrder.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E6F3E] hover:text-[#1A1715] dark:text-[#B08D57] dark:hover:text-[#ECE5D8]"
                >
                  <span>Abrir prévia do projeto</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-xs text-[#5C5348] dark:text-[#A8A095]">
                  Dúvidas ou ajustes nesta etapa? Fale direto no WhatsApp.
                </span>
              )}

              <a
                href={buildWhatsAppUrl(
                  `Olá! Estou acompanhando o pedido ${matchedOrder.code} (${matchedOrder.projectTitle}) e gostaria de falar sobre o andamento.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1715] px-5 py-2.5 text-xs font-semibold text-[#EAE3D5] shadow-sm transition-colors hover:bg-[#332D28] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
              >
                <span>Falar sobre este pedido</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#B08D57] dark:text-[#FAF6EE]" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#B08D57]/35 bg-[#FAF6EE] p-6 text-center shadow-sm dark:border-[#B7410E]/35 dark:bg-[#202226]">
            <p className="text-base font-bold text-[#1A1715] dark:text-[#ECE5D8]">
              Pedido <span className="font-tech text-[#8E6F3E] dark:text-[#B08D57]">{normalized || "—"}</span> não encontrado
            </p>
            <p className="mt-1.5 text-sm text-[#5C5348] dark:text-[#A8A095]">
              Confira se digitou o código exatamente como recebeu (ex.: <code className="font-tech">PRISMA-104</code>) ou fale direto no WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                `Olá! Não encontrei meu código de acompanhamento (${normalized || "sem código"}) no site. Pode me enviar o status?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1A1715] px-5 py-2.5 text-xs font-semibold text-[#EAE3D5] hover:bg-[#332D28] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
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
