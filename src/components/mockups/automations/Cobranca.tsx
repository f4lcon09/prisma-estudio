"use client";

import { useState } from "react";
import { BellRing, CalendarClock, CheckCircle2, Copy, MessageCircle, Send, Zap } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type Stage = "pendente" | "enviado" | "pago";

const clients = [
  { id: "a", name: "Academia Movimento", plan: "Mensalidade · nov", value: 890, due: "Vence hoje" },
  { id: "b", name: "Escola Pequeno Saber", plan: "Parcela 4/12", value: 1450, due: "Venceu há 2 dias" },
  { id: "c", name: "Ótica Visão Clara", plan: "Mensalidade · nov", value: 420, due: "Vence em 3 dias" },
] as const;

const regua = [
  { day: "D-3", title: "Lembrete amigável", channel: "WhatsApp" },
  { day: "D0", title: "Vencimento com Pix", channel: "WhatsApp + e-mail" },
  { day: "D+2", title: "Segunda via gentil", channel: "WhatsApp" },
  { day: "D+7", title: "Aviso para o financeiro", channel: "Tarefa interna" },
];

const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

export function AutomacaoCobrancaInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Régua Pix Automática", (n) => `${n} · Régua Pix`);
  const [sel, setSel] = useState<(typeof clients)[number]["id"]>("a");
  const [stage, setStage] = useState<Record<string, Stage>>({ a: "pendente", b: "enviado", c: "pendente" });
  const [copied, setCopied] = useState(false);

  const client = clients.find((c) => c.id === sel) ?? clients[0];
  const st = stage[sel];
  const received = clients.filter((c) => stage[c.id] === "pago").reduce((n, c) => n + c.value, 0) + 12480;
  const open = clients.filter((c) => stage[c.id] !== "pago").reduce((n, c) => n + c.value, 0);
  const activeStep = client.due.startsWith("Venceu") ? 2 : client.due === "Vence hoje" ? 1 : 0;

  function advance() {
    if (!interactive) return;
    setStage((prev) => ({ ...prev, [sel]: prev[sel] === "pendente" ? "enviado" : prev[sel] === "enviado" ? "pago" : "pendente" }));
    setCopied(false);
  }

  return (
    <BrowserShell url="flow.prismaestudio.dev/cobranca-pix" palette="cobranca">
      <div className="min-h-[min(var(--mock-h,520px),520px)] bg-(--m-bg) p-3 text-left text-(--m-ink)">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-(--m-ink) text-white">
              <Zap className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11.5px] font-extrabold">{brand}</span>
          </div>
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Ativa · roda todo dia às 9h</span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {[
            ["Recebido em novembro", brl(received)],
            ["Em aberto", brl(open)],
            ["Inadimplência", "2,1%"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-white px-2.5 py-2 shadow-2xs">
              <p className="text-[9px] text-(--m-ink)/60">{l}</p>
              <p className="text-[13px] font-extrabold tabular-nums">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1fr_0.95fr_1.05fr]">
          {/* Clientes */}
          <div className="rounded-xl bg-white p-2 shadow-2xs">
            <p className="px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">Cobranças</p>
            <div className="mt-1.5 grid gap-1">
              {clients.map((c) => {
                const s = stage[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => setSel(c.id)}
                    className={`rounded-lg border p-2 text-left ${sel === c.id ? "border-(--m-ink) bg-(--m-bg)" : "border-transparent hover:bg-(--m-bg)"}`}
                  >
                    <span className="flex items-center justify-between gap-1">
                      <span className="truncate text-[10px] font-bold">{c.name}</span>
                      <span
                        className={`shrink-0 rounded px-1 text-[8.5px] font-bold ${
                          s === "pago" ? "bg-emerald-50 text-emerald-700" : s === "enviado" ? "bg-(--m-accent)/20 text-(--m-accent-ink)" : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {s === "pago" ? "Pago" : s === "enviado" ? "Lembrete enviado" : "Pendente"}
                      </span>
                    </span>
                    <span className="block text-[9px] text-(--m-ink)/60">{c.plan} · {brl(c.value)} · {c.due}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Régua */}
          <div className="rounded-xl bg-white p-2.5 shadow-2xs">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">Régua de cobrança</p>
            <ol className="relative mt-2 grid gap-2 before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-px before:bg-(--m-ink)/12">
              {regua.map((r, i) => {
                const on = st !== "pago" && i === activeStep;
                const past = st === "pago" ? i <= activeStep : i < activeStep;
                return (
                  <li key={r.day} className="relative flex items-start gap-2">
                    <span
                      className={`z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold ${
                        on ? "bg-(--m-accent) text-(--m-on-accent)" : past ? "bg-(--m-ink) text-white" : "border border-(--m-ink)/15 bg-white text-(--m-ink)/65"
                      }`}
                    >
                      {r.day}
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold">{r.title}</span>
                      <span className="block text-[9px] text-(--m-ink)/60">{r.channel}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            {st === "pago" && (
              <p className="mt-2 flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" /> Baixa automática feita. Régua encerrada.
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col overflow-hidden rounded-xl bg-[#ECE5DD] shadow-2xs">
            <div className="flex items-center gap-1.5 bg-(--m-ink) px-2.5 py-1.5 text-white">
              <MessageCircle className="h-3 w-3" />
              <span className="truncate text-[10px] font-bold">{client.name}</span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-2 text-[9.5px] leading-snug">
              {st === "pendente" ? (
                <p className="m-auto max-w-[22ch] text-center text-(--m-ink)/60">
                  <CalendarClock className="mx-auto mb-1 h-4 w-4" />
                  Mensagem programada. Clique em Enviar lembrete para ver.
                </p>
              ) : (
                <div className="ml-auto max-w-[94%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-2 py-1.5 shadow-2xs">
                  <p>
                    Olá! Sua cobrança <strong>{client.plan}</strong> de <strong>{brl(client.value)}</strong> {client.due.toLowerCase()}. Pague pelo Pix
                    copia e cola:
                  </p>
                  <p className="mt-1 truncate rounded bg-white/70 px-1.5 py-0.5 font-mono text-[8.5px]">00020126580014BR.GOV.BCB.PIX…6304A1F2</p>
                  <button type="button" disabled={!interactive} onClick={() => setCopied(true)} className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-sky-700">
                    <Copy className="h-2.5 w-2.5" /> {copied ? "Código copiado" : "Copiar código"}
                  </button>
                </div>
              )}
              {st === "pago" && (
                <p className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-2 py-1.5 shadow-2xs">Paguei agora 👍</p>
              )}
              {st === "pago" && (
                <p className="ml-auto max-w-[90%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-2 py-1.5 shadow-2xs">Pagamento confirmado. Obrigado! Recibo no seu e-mail.</p>
              )}
            </div>
            <button
              type="button"
              disabled={!interactive}
              onClick={advance}
              className="m-2 mt-0 inline-flex items-center justify-center gap-1 rounded-lg bg-(--m-accent) py-1.5 text-[10px] font-bold text-(--m-on-accent) hover:brightness-95"
            >
              {st === "pendente" ? (
                <>
                  <Send className="h-3 w-3" /> Enviar lembrete
                </>
              ) : st === "enviado" ? (
                <>
                  <BellRing className="h-3 w-3" /> Simular pagamento Pix
                </>
              ) : (
                "Reiniciar exemplo"
              )}
            </button>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
