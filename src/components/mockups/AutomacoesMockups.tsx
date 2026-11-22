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
    <BrowserShell url="flow.prismaestudio.dev/workflows/triagem-ia">
      <div className="flex min-h-[330px] flex-col justify-between bg-slate-50 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-slate-900">Triagem WhatsApp + IA</span>
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
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {msg.label}
                </button>
              ))}
            <button
              type="button"
              disabled={!interactive}
              onClick={() => runFlow(selectedIdx)}
              className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              <span>{running ? "Executando..." : "Simular fluxo"}</span>
            </button>
          </div>
        </div>

        <div className="bg-canvas-dots relative flex-1 bg-gradient-to-br from-amber-50/40 via-slate-50 to-blue-50/50 p-3.5">
          <div className="mb-2.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-600">
            <strong className="text-slate-900">Entrada WhatsApp:</strong> &quot;{sample.text}&quot;
          </div>

          <div className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-3">
            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 1 ? "border-amber-400 bg-amber-50/30 ring-2 ring-amber-400/25" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900">
                  <Webhook className="h-3 w-3 text-amber-500" />
                  Webhook
                </span>
                <span className="font-tech text-[9px] text-emerald-600">200 OK</span>
              </div>
              <p className="font-tech mt-1 truncate text-[9px] text-slate-500">POST /whatsapp/msg</p>
            </div>

            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 2 ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900">
                  <Bot className="h-3 w-3 text-blue-600" />
                  Agente IA
                </span>
                <span className="font-tech text-[9px] text-blue-600">Score {sample.score}</span>
              </div>
              <p className="mt-1 truncate text-[9px] text-slate-500">{sample.servico}</p>
            </div>

            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 3 ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900">
                  <Database className="h-3 w-3 text-emerald-600" />
                  CRM + Resposta
                </span>
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <p className="mt-1 truncate text-[9px] text-slate-500">{sample.urgencia}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-800 bg-[#0F172A] p-2.5 text-[10px] text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[9px] text-slate-400">
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
    <BrowserShell url="flow.prismaestudio.dev/cobranca-pix">
      <div className="bg-canvas-dots min-h-[330px] bg-gradient-to-br from-emerald-50/40 via-slate-50 to-amber-50/40 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <span className="text-[11px] font-bold text-slate-900">Régua Pix Automática</span>
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
                  targetIdx === idx ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
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
            <p className="mt-1 text-[9px] text-slate-500">Valor: {target.amount}</p>
          </div>
          <div
            className={`rounded-xl border bg-white p-2.5 shadow-xs ${
              stage !== "idle" ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700">
              <QrCode className="h-3 w-3" /> 2. Pix Enviado
            </span>
            <p className="mt-1 text-[9px] text-slate-500">WhatsApp com copia-e-cola</p>
          </div>
          <div
            className={`rounded-xl border bg-white p-2.5 shadow-xs ${
              stage === "paid" ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200"
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" /> 3. Baixa ERP
            </span>
            <p className="mt-1 text-[9px] text-slate-500">
              {stage === "paid" ? "Quitado & recibo enviado" : "Aguardando webhook"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-[10px] text-slate-200">
          <div>
            <p className="font-tech text-[9px] text-slate-400">
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
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-slate-950 hover:bg-emerald-400"
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
    <BrowserShell url="flow.prismaestudio.dev/resumo-diario">
      <div className="min-h-[330px] bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Resumo Executivo IA · 08:00
          </span>
          <div className="flex gap-1 rounded-lg bg-slate-200/70 p-0.5">
            {(["direto", "detalhado"] as const).map((t) => (
              <button
                key={t}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setTone(t)}
                className={`rounded-md px-2 py-0.5 text-[9px] font-semibold capitalize ${
                  tone === t ? "bg-slate-900 text-white" : "text-slate-600"
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
              includeAds ? "border-blue-200 bg-blue-50/70 text-blue-900" : "border-slate-200 bg-white text-slate-400"
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
              includeCash ? "border-amber-200 bg-amber-50/70 text-amber-900" : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            <span className="font-semibold">{includeCash ? "✓" : "+"} Caixa Pix</span>
            <p className="mt-0.5 opacity-80">Faturas abertas</p>
          </button>
        </div>

        <div className="mt-3 rounded-2xl border border-emerald-200 bg-[#E7FCEB] p-3 text-slate-900">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900">
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Prévia no WhatsApp da Diretoria
            </span>
            <span className="font-tech inline-flex items-center gap-0.5 text-emerald-700">
              <TrendingUp className="h-3 w-3" /> +14%
            </span>
          </div>
          <p className="mt-1.5 text-[10px] leading-relaxed text-slate-800">
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
