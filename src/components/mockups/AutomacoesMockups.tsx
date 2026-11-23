"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  CheckCircle2,
  Database,
  MessageSquare,
  Play,
  QrCode,
  Sparkles,
  TrendingUp,
  Webhook,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";

const sampleMessages = [
  {
    id: "site",
    label: "Lead Site",
    text: "Oi, preciso de um site para minha clínica ainda esse mês",
    servico: "Site / Landing Page",
    urgencia: "Alta (Este mês)",
    score: 94,
    reply: "Olá! Fazemos sites para clínicas em 5 dias. Já separei seu atendimento (#482).",
  },
  {
    id: "erp",
    label: "Lead Sistema",
    text: "Queremos trocar nossas planilhas por um painel de pedidos",
    servico: "Sistema Web & SaaS",
    urgencia: "Média (2–4 sem)",
    score: 91,
    reply: "Perfeito! Montamos painéis sob medida em Next.js. Card #483 criado no CRM.",
  },
  {
    id: "bot",
    label: "Lead Automação",
    text: "Perdemos muitos contatos no WhatsApp fora do horário",
    servico: "Automação + IA",
    urgencia: "Urgente",
    score: 97,
    reply: "Entendido! Criamos triagem 24h no WhatsApp em 7 dias. Prioridade #484 registrada.",
  },
];

export function AutomacaoTriagemInteractive({ interactive = true }: { interactive?: boolean }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [step, setStep] = useState(3);
  const [running, setRunning] = useState(false);

  const sample = sampleMessages[selectedIdx] ?? sampleMessages[0];

  function runFlow(nextIdx = selectedIdx) {
    if (!interactive || running) return;
    setSelectedIdx(nextIdx);
    setRunning(true);
    setStep(1);
    setTimeout(() => setStep(2), 400);
    setTimeout(() => {
      setStep(3);
      setRunning(false);
    }, 850);
  }

  return (
    <BrowserShell url="flow.prismaestudio.dev/workflows/triagem-ia" palette="triagem">
      <div className="flex min-h-[330px] flex-col justify-between bg-(--m-bg) text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/12 bg-white px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-(--m-ink)">Triagem WhatsApp + IA</span>
            <span className="font-tech rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
              Ativo
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {interactive &&
              sampleMessages.map((msg, idx) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => runFlow(idx)}
                  className={`hidden rounded-md border px-2 py-0.5 text-[9px] font-semibold sm:inline-block ${
                    selectedIdx === idx
                      ? "border-(--m-accent) bg-(--m-accent)/10 text-(--m-accent-ink)"
                      : "border-(--m-ink)/12 bg-white text-(--m-ink)/75 hover:border-(--m-accent)/60"
                  }`}
                >
                  {msg.label}
                </button>
              ))}
            <button
              type="button"
              disabled={!interactive}
              onClick={() => runFlow(selectedIdx)}
              className="inline-flex items-center gap-1 rounded-md bg-(--m-accent) px-2.5 py-1 text-[10px] font-semibold text-(--m-on-accent) transition-colors hover:brightness-95"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              <span>{running ? "Executando..." : "Simular fluxo"}</span>
            </button>
          </div>
        </div>

        <div className="bg-canvas-dots relative flex-1 bg-gradient-to-br from-amber-50/40 via-(--m-bg) to-(--m-accent)/8 p-3.5">
          <div className="mb-2.5 rounded-lg border border-(--m-ink)/12 bg-white px-2.5 py-1.5 text-[10px] text-(--m-ink)/75">
            <strong className="text-(--m-ink)">Entrada WhatsApp:</strong> &quot;{sample.text}&quot;
          </div>

          <div className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-3">
            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 1 ? "border-amber-400 bg-amber-50/30 ring-2 ring-amber-400/25" : "border-(--m-ink)/12"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-(--m-ink)">
                  <Webhook className="h-3 w-3 text-amber-500" />
                  Webhook
                </span>
                <span className="font-tech text-[9px] text-emerald-600">200 OK</span>
              </div>
              <p className="font-tech mt-1 truncate text-[9px] text-(--m-ink)/70">POST /whatsapp/msg</p>
            </div>

            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 2 ? "border-(--m-accent) ring-2 ring-(--m-accent)/25" : "border-(--m-ink)/12"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-(--m-ink)">
                  <Bot className="h-3 w-3 text-(--m-accent-ink)" />
                  Agente IA
                </span>
                <span className="font-tech text-[9px] text-(--m-accent-ink)">Score {sample.score}</span>
              </div>
              <p className="mt-1 truncate text-[9px] text-(--m-ink)/70">{sample.servico}</p>
            </div>

            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 3 ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-(--m-ink)/12"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-(--m-ink)">
                  <Database className="h-3 w-3 text-emerald-600" />
                  CRM + Resposta
                </span>
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <p className="mt-1 truncate text-[9px] text-(--m-ink)/70">{sample.urgencia}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-white/10 bg-(--m-ink) p-2.5 text-[10px] text-white/75">
            <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[9px] text-white/55">
              <span className="font-tech">RESPOSTA AUTOMÁTICA ENVIADA</span>
              <span className="font-tech text-emerald-400">✓ 466ms</span>
            </div>
            <p className="mt-1.5 text-[10px] text-emerald-300">&quot;{sample.reply}&quot;</p>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

const billingTargets = [
  { id: "vida", client: "Clínica Vida", amount: "R$ 1.850,00", due: "Vence amanhã (D-1)" },
  { id: "cafe", client: "Café Central", amount: "R$ 940,00", due: "Atraso de 2 dias" },
];

export function AutomacaoCobrancaInteractive({ interactive = true }: { interactive?: boolean }) {
  const [targetIdx, setTargetIdx] = useState(0);
  const [stage, setStage] = useState<"idle" | "sent" | "paid">("sent");

  const target = billingTargets[targetIdx] ?? billingTargets[0];

  return (
    <BrowserShell url="flow.prismaestudio.dev/cobranca-pix" palette="cobranca">
      <div className="bg-canvas-dots min-h-[330px] bg-gradient-to-br from-emerald-50/40 via-(--m-bg) to-amber-50/40 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-(--m-ink)/12 bg-white px-3 py-2">
          <span className="text-[11px] font-bold text-(--m-ink)">Régua Pix Automática</span>
          <div className="flex items-center gap-1.5">
            {billingTargets.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                disabled={!interactive}
                onClick={() => {
                  if (!interactive) return;
                  setTargetIdx(idx);
                  setStage("idle");
                }}
                className={`rounded-md px-2 py-0.5 text-[9px] font-semibold ${
                  targetIdx === idx ? "bg-(--m-ink) text-white" : "bg-(--m-ink)/5 text-(--m-ink)/75"
                }`}
              >
                {b.client}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-amber-300 bg-white p-2.5 shadow-xs">
            <span className="text-[10px] font-bold text-amber-700">1. {target.due}</span>
            <p className="mt-1 text-[9px] text-(--m-ink)/70">Valor: {target.amount}</p>
          </div>
          <div
            className={`rounded-xl border bg-white p-2.5 shadow-xs ${
              stage !== "idle" ? "border-(--m-accent) ring-2 ring-(--m-accent)/20" : "border-(--m-ink)/12"
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-(--m-accent-ink)">
              <QrCode className="h-3 w-3" /> 2. Pix Enviado
            </span>
            <p className="mt-1 text-[9px] text-(--m-ink)/70">WhatsApp com copia-e-cola</p>
          </div>
          <div
            className={`rounded-xl border bg-white p-2.5 shadow-xs ${
              stage === "paid" ? "border-emerald-500 ring-2 ring-emerald-100" : "border-(--m-ink)/12"
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" /> 3. Baixa ERP
            </span>
            <p className="mt-1 text-[9px] text-(--m-ink)/70">
              {stage === "paid" ? "Quitado & recibo enviado" : "Aguardando webhook"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-(--m-ink) p-3 text-[10px] text-white/85">
          <div>
            <p className="font-tech text-[9px] text-white/55">
              {stage === "paid" ? "WEBHOOK PIX · LIQUIDADO ✓" : "SIMULAÇÃO DO FLUXO"}
            </p>
            <p className="mt-0.5 text-[10px] text-emerald-300">
              {stage === "idle" && `Pronto para cobrar ${target.client} (${target.amount}).`}
              {stage === "sent" && `Lembrete Pix enviado para ${target.client} no WhatsApp.`}
              {stage === "paid" && `Pagamento ${target.amount} confirmado! Baixa feita no ERP.`}
            </p>
          </div>
          {interactive && (
            <button
              type="button"
              onClick={() =>
                setStage((s) => (s === "idle" ? "sent" : s === "sent" ? "paid" : "idle"))
              }
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-400"
            >
              {stage === "idle" && "Disparar cobrança"}
              {stage === "sent" && "Simular pagamento Pix"}
              {stage === "paid" && "Reiniciar teste"}
            </button>
          )}
        </div>
      </div>
    </BrowserShell>
  );
}

export function AutomacaoRelatorioInteractive({ interactive = true }: { interactive?: boolean }) {
  const [includeAds, setIncludeAds] = useState(true);
  const [includeCash, setIncludeCash] = useState(true);
  const [tone, setTone] = useState<"direto" | "detalhado">("direto");

  return (
    <BrowserShell url="flow.prismaestudio.dev/resumo-diario" palette="relatorio">
      <div className="min-h-[330px] bg-gradient-to-br from-(--m-bg) via-white to-emerald-50/50 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/12 pb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-(--m-ink)">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Resumo Executivo IA · 08:00
          </span>
          <div className="flex gap-1 rounded-lg bg-(--m-ink)/10 p-0.5">
            {(["direto", "detalhado"] as const).map((t) => (
              <button
                key={t}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setTone(t)}
                className={`rounded-md px-2 py-0.5 text-[9px] font-semibold capitalize ${
                  tone === t ? "bg-(--m-ink) text-white" : "text-(--m-ink)/75"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[9px]">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2">
            <span className="font-semibold text-emerald-900">✓ PostgreSQL</span>
            <p className="mt-0.5 text-emerald-700">Pedidos de ontem</p>
          </div>
          <button
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setIncludeAds((v) => !v)}
            className={`rounded-lg border p-2 text-left transition-colors ${
              includeAds ? "border-(--m-accent)/35 bg-(--m-accent)/10 text-(--m-accent-ink)" : "border-(--m-ink)/12 bg-white text-(--m-ink)/55"
            }`}
          >
            <span className="font-semibold">{includeAds ? "✓" : "+"} Meta Ads</span>
            <p className="mt-0.5 opacity-80">CPA &amp; cliques</p>
          </button>
          <button
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setIncludeCash((v) => !v)}
            className={`rounded-lg border p-2 text-left transition-colors ${
              includeCash ? "border-amber-200 bg-amber-50/70 text-amber-900" : "border-(--m-ink)/12 bg-white text-(--m-ink)/55"
            }`}
          >
            <span className="font-semibold">{includeCash ? "✓" : "+"} Caixa Pix</span>
            <p className="mt-0.5 opacity-80">Faturas abertas</p>
          </button>
        </div>

        <div className="mt-3 rounded-2xl border border-(--m-accent)/40 bg-(--m-accent)/15 p-3 text-(--m-ink)">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900">
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Prévia no WhatsApp da Diretoria
            </span>
            <span className="font-tech inline-flex items-center gap-0.5 text-emerald-700">
              <TrendingUp className="h-3 w-3" /> +14%
            </span>
          </div>
          <p className="mt-1.5 text-[10px] leading-relaxed text-(--m-ink)">
            Bom dia! Ontem fechamos <strong>11 pedidos (R$ 14.280)</strong>
            {includeAds ? ", com custo por lead de R$ 9,40 no Meta Ads" : ""}
            {includeCash ? " e 2 faturas Pix aguardando retorno" : ""}.
            {tone === "detalhado" &&
              " Destaque para o canal orgânico (+22% de cliques no botão de orçamento)."}
          </p>
        </div>
      </div>
    </BrowserShell>
  );
}
