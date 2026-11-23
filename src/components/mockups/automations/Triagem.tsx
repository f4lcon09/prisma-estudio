"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Bot, CheckCheck, Inbox, KanbanSquare, MessageCircle, Play, Sparkles, UserCheck } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

const leads = [
  {
    id: "site",
    label: "Lead de site",
    name: "Paula · Clínica Sorriso",
    msg: "Oi! Preciso de um site para minha clínica, dá pra ficar pronto este mês?",
    reply: "Oi, Paula! Dá sim: sites ficam prontos em 5 dias úteis. Para te passar o valor, a clínica já tem logo e fotos?",
    answer: "Tenho logo, fotos ainda não.",
    tags: ["Site", "Urgente", "Saúde"],
    score: 92,
    value: "R$ 2.400",
  },
  {
    id: "sistema",
    label: "Lead de sistema",
    name: "Marcos · Distribuidora MK",
    msg: "Bom dia, controlamos pedidos em planilha e está virando bagunça. Vocês fazem sistema?",
    reply: "Bom dia, Marcos! Fazemos. Quantas pessoas usariam o sistema e quantos pedidos por dia vocês têm?",
    answer: "Umas 6 pessoas, uns 80 pedidos por dia.",
    tags: ["Sistema", "B2B", "Alto valor"],
    score: 96,
    value: "R$ 14.000",
  },
  {
    id: "duvida",
    label: "Só dúvida",
    name: "Ana · sem empresa",
    msg: "Quanto custa um site simples?",
    reply: "Oi, Ana! Depende do que o site precisa ter. Me conta o seu negócio que eu te passo uma faixa agora mesmo.",
    answer: "Ainda estou pensando em abrir.",
    tags: ["Pesquisa", "Sem urgência"],
    score: 38,
    value: "—",
  },
] as const;

const steps = [
  { icon: Inbox, title: "Mensagem recebida", detail: "WhatsApp · 0,2 s" },
  { icon: Bot, title: "IA responde e qualifica", detail: "intenção, urgência, porte · 1,4 s" },
  { icon: KanbanSquare, title: "Card criado no CRM", detail: "com tags e score · 0,3 s" },
  { icon: Bell, title: "Vendedor avisado", detail: "só se score ≥ 70" },
];

export function AutomacaoTriagemInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Triagem WhatsApp + IA", (n) => `${n} · Triagem IA`);
  const [leadIdx, setLeadIdx] = useState(0);
  const [phase, setPhase] = useState(interactive ? 0 : 5); // 0 parado · 1..4 etapas · 5 concluído
  const timers = useRef<number[]>([]);
  const lead = leads[leadIdx];

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function run(idx = leadIdx) {
    if (!interactive) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    setLeadIdx(idx);
    setPhase(1);
    timers.current = [2, 3, 4, 5].map((p, i) => window.setTimeout(() => setPhase(p), 700 * (i + 1)));
  }

  const hot = lead.score >= 70;
  const done = phase >= 5;

  return (
    <BrowserShell url="flow.prismaestudio.dev/workflows/triagem-ia" palette="triagem">
      <div className="min-h-[min(var(--mock-h,520px),520px)] bg-(--m-bg) text-left text-(--m-ink)">
        {/* Barra do fluxo */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/10 bg-white px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold">{brand}</span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">Ativo · 1.284 leads este mês</span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {leads.map((l, i) => (
              <button
                key={l.id}
                type="button"
                disabled={!interactive}
                onClick={() => run(i)}
                className={`rounded-md border px-2 py-0.5 text-[9.5px] font-semibold ${leadIdx === i ? "border-(--m-ink) bg-(--m-ink) text-white" : "border-(--m-ink)/15 text-(--m-ink)/75"}`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              disabled={!interactive}
              onClick={() => run()}
              className="inline-flex items-center gap-1 rounded-md bg-(--m-accent) px-2.5 py-1 text-[10px] font-bold text-(--m-on-accent)"
            >
              <Play className="h-2.5 w-2.5" /> Simular fluxo
            </button>
          </div>
        </div>

        <div className="grid gap-2.5 p-3 sm:grid-cols-[1.05fr_0.9fr_1fr]">
          {/* WhatsApp */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-(--m-ink)/10 bg-[#ECE5DD]">
            <div className="flex items-center gap-2 bg-(--m-ink) px-2.5 py-1.5 text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[9px] font-bold">{lead.name.slice(0, 1)}</span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold">{lead.name}</p>
                <p className="text-[8.5px] text-white/65">{phase === 2 ? "digitando…" : "online"}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-2 text-[9.5px] leading-snug">
              {phase === 0 ? (
                <p className="m-auto max-w-[24ch] text-center text-[9.5px] text-(--m-ink)/60">Escolha um tipo de lead e clique em Simular fluxo.</p>
              ) : (
                <>
                  <p className="max-w-[88%] rounded-lg rounded-tl-none bg-white px-2 py-1.5 shadow-2xs">{lead.msg}</p>
                  {phase >= 3 && (
                    <p className="ml-auto max-w-[88%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-2 py-1.5 shadow-2xs">
                      {lead.reply}
                      <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[8px] text-sky-600">
                        <Sparkles className="h-2 w-2" /> IA · <CheckCheck className="h-2.5 w-2.5" />
                      </span>
                    </p>
                  )}
                  {phase >= 4 && <p className="max-w-[88%] rounded-lg rounded-tl-none bg-white px-2 py-1.5 shadow-2xs">{lead.answer}</p>}
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-2 py-1.5 text-[9px] text-(--m-ink)/65">
              <MessageCircle className="h-3 w-3" /> Mensagem
            </div>
          </div>

          {/* Fluxo */}
          <div className="rounded-xl border border-(--m-ink)/10 bg-white p-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">Fluxo</p>
            <ol className="mt-2 grid gap-1.5">
              {steps.map((st, i) => {
                const Icon = st.icon;
                const state = phase > i + 1 || done ? "done" : phase === i + 1 ? "running" : "idle";
                const skipped = i === 3 && done && !hot;
                return (
                  <li key={st.title} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        skipped ? "bg-(--m-ink)/8 text-(--m-ink)/40" : state === "done" ? "bg-(--m-ink) text-white" : state === "running" ? "animate-pulse bg-(--m-accent) text-(--m-on-accent)" : "bg-(--m-ink)/8 text-(--m-ink)/65"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-[10px] font-bold ${skipped ? "text-(--m-ink)/45 line-through" : ""}`}>{st.title}</span>
                      <span className="block text-[9px] text-(--m-ink)/60">{skipped ? "score baixo: segue só a IA" : st.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            {done && (
              <div className="mt-2.5 rounded-lg bg-(--m-bg) p-2 text-[9.5px]">
                <p className="font-bold">Dados extraídos pela IA</p>
                <p className="text-(--m-ink)/70">{lead.tags.join(" · ")}</p>
              </div>
            )}
          </div>

          {/* CRM */}
          <div className="rounded-xl border border-(--m-ink)/10 bg-white p-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">CRM · Funil</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                { col: "Novos", cards: [["Rodrigo A.", "Automação"], ["Sítio Verde", "Site"]] },
                { col: "Qualificados", cards: [["Studio Atlas", "Sistema"]] },
              ].map((c) => (
                <div key={c.col} className="rounded-lg bg-(--m-bg) p-1.5">
                  <p className="text-[9px] font-bold text-(--m-ink)/70">{c.col}</p>
                  <div className="mt-1 grid gap-1">
                    {done && ((c.col === "Qualificados" && hot) || (c.col === "Novos" && !hot)) && (
                      <div className="rounded-md border border-(--m-accent) bg-white p-1.5 shadow-sm">
                        <p className="text-[9.5px] font-bold">{lead.name.split(" · ")[1] ?? lead.name}</p>
                        <p className="text-[8.5px] text-(--m-ink)/60">{lead.tags[0]} · {lead.value}</p>
                        <span className={`mt-1 inline-block rounded px-1 text-[8.5px] font-bold ${hot ? "bg-(--m-accent) text-(--m-on-accent)" : "bg-(--m-ink)/10"}`}>
                          Score {lead.score}
                        </span>
                      </div>
                    )}
                    {c.cards.map(([n, t]) => (
                      <div key={n} className="rounded-md bg-white p-1.5">
                        <p className="text-[9.5px] font-semibold">{n}</p>
                        <p className="text-[8.5px] text-(--m-ink)/60">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {done && hot && (
              <p className="mt-2 flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                <UserCheck className="h-3 w-3" /> Carla (vendas) foi avisada no WhatsApp
              </p>
            )}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
