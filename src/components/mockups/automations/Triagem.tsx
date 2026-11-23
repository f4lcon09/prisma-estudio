"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Bot,
  BookOpen,
  Check,
  CheckCheck,
  Database,
  GitBranch,
  KanbanSquare,
  MessageCircle,
  Play,
  Sparkles,
  Sprout,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

const leads = [
  {
    id: "site",
    label: "Lead de site",
    name: "Paula",
    company: "Clínica Sorriso",
    msg: "Oi! Preciso de um site para minha clínica, dá pra ficar pronto este mês?",
    reply: "Oi, Paula! Dá sim: sites ficam prontos em 5 dias úteis. A clínica já tem logo e fotos?",
    answer: "Tenho logo, fotos ainda não.",
    data: { Intenção: "Site", Urgência: "Alta", Porte: "Pequeno", Orçamento: "R$ 2–4 mil" },
    score: 92,
  },
  {
    id: "sistema",
    label: "Lead de sistema",
    name: "Marcos",
    company: "Distribuidora MK",
    msg: "Bom dia, controlamos pedidos em planilha e virou bagunça. Vocês fazem sistema?",
    reply: "Bom dia, Marcos! Fazemos. Quantas pessoas usariam e quantos pedidos por dia vocês têm?",
    answer: "Umas 6 pessoas, uns 80 pedidos por dia.",
    data: { Intenção: "Sistema", Urgência: "Média", Porte: "Médio", Orçamento: "R$ 10–20 mil" },
    score: 96,
  },
  {
    id: "duvida",
    label: "Só dúvida",
    name: "Ana",
    company: "sem empresa",
    msg: "Quanto custa um site simples?",
    reply: "Oi, Ana! Depende do que o site precisa ter. Me conta o seu negócio que eu te passo uma faixa.",
    answer: "Ainda estou pensando em abrir.",
    data: { Intenção: "Pesquisa", Urgência: "Baixa", Porte: "—", Orçamento: "—" },
    score: 38,
  },
] as const;

// Coordenadas do canvas (viewBox 600 x 230)
const N = {
  trigger: { x: 62, y: 115 },
  agent: { x: 200, y: 115 },
  memory: { x: 168, y: 200 },
  kb: { x: 236, y: 200 },
  branch: { x: 330, y: 115 },
  crm: { x: 470, y: 52 },
  notify: { x: 540, y: 128 },
  nurture: { x: 470, y: 196 },
};
const pct = (p: { x: number; y: number }) => ({ left: `${(p.x / 600) * 100}%`, top: `${(p.y / 230) * 100}%` });
const wire = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = (b.x - a.x) / 2;
  return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`;
};

type NodeState = "idle" | "running" | "done" | "skipped";

function Node({
  at,
  icon: Icon,
  title,
  sub,
  state,
  tone = "bg-(--m-ink)",
  small = false,
}: {
  at: { x: number; y: number };
  icon: typeof Bot;
  title: string;
  sub?: string;
  state: NodeState;
  tone?: string;
  small?: boolean;
}) {
  return (
    <div
      style={pct(at)}
      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white shadow-sm transition-all duration-300 ${
        small ? "p-0.5 @[480px]:px-1.5 @[480px]:py-1" : "p-1 @[480px]:px-2 @[480px]:py-1.5"
      } ${state === "running" ? "border-(--m-accent) ring-4 ring-(--m-accent)/25" : state === "done" ? "border-emerald-400" : "border-(--m-ink)/12"} ${
        state === "skipped" ? "opacity-45" : ""
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`flex shrink-0 items-center justify-center rounded-lg text-white ${small ? "h-4 w-4" : "h-5 w-5"} ${tone}`}>
          <Icon className={small ? "h-2.5 w-2.5" : "h-3 w-3"} />
        </span>
        <span className="hidden min-w-0 @[480px]:block">
          <span className={`block whitespace-nowrap font-bold ${small ? "text-[8px]" : "text-[9px]"}`}>{title}</span>
          {sub && !small && <span className="hidden whitespace-nowrap text-[7.5px] text-(--m-ink)/65 @[720px]:block">{sub}</span>}
        </span>
      </div>
      {/* Em telas estreitas o bloco vira só o ícone, com o nome pequeno embaixo */}
      <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold text-(--m-ink)/80 @[480px]:hidden">
        {title}
      </span>
      {state === "done" && (
        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-2 w-2" />
        </span>
      )}
    </div>
  );
}

export function AutomacaoTriagemInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Triagem WhatsApp + IA", (n) => `${n} · Triagem IA`);
  const [leadIdx, setLeadIdx] = useState(1);
  const [phase, setPhase] = useState(interactive ? 0 : 5); // 0 parado · 1 gatilho · 2 IA · 3 decisão · 4 ações · 5 concluído
  const timers = useRef<number[]>([]);
  const lead = leads[leadIdx];
  const hot = lead.score >= 70;

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function run(idx = leadIdx) {
    if (!interactive) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    setLeadIdx(idx);
    setPhase(1);
    timers.current = [2, 3, 4, 5].map((p, i) => window.setTimeout(() => setPhase(p), 750 * (i + 1)));
  }

  const st = (start: number): NodeState => (phase === 0 ? "idle" : phase > start ? "done" : phase === start ? "running" : "idle");
  const branchState = (isHotPath: boolean): NodeState => {
    if (phase < 4) return "idle";
    if (isHotPath !== hot) return "skipped";
    return phase === 4 ? "running" : "done";
  };
  const wireCls = (active: boolean, flowing: boolean) =>
    active ? (flowing ? "wire-flow stroke-(--m-accent)" : "stroke-emerald-400") : "stroke-(--m-ink)/18";

  return (
    <BrowserShell url="flow.prismaestudio.dev/workflows/triagem-ia" palette="triagem">
      <div className="@container flex h-[min(var(--mock-h,540px),560px)] flex-col bg-(--m-bg) text-left text-(--m-ink)">
        {/* Barra do editor */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/10 bg-white px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-(--m-ink) text-white">
              <GitBranch className="h-3 w-3" />
            </span>
            <span className="truncate text-[11px] font-bold">{brand}</span>
            <span className="hidden rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-semibold text-emerald-700 @[480px]:inline">● Ativo · 1.284 execuções</span>
          </div>
          <div className="flex items-center gap-1">
            {leads.map((l, i) => (
              <button
                key={l.id}
                type="button"
                disabled={!interactive}
                onClick={() => run(i)}
                className={`hidden rounded-md border px-1.5 py-0.5 text-[9px] font-semibold @[560px]:inline-block ${
                  leadIdx === i ? "border-(--m-ink) bg-(--m-ink) text-white" : "border-(--m-ink)/15 text-(--m-ink)/75"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              disabled={!interactive}
              onClick={() => run()}
              className="inline-flex items-center gap-1 rounded-md bg-(--m-accent) px-2 py-1 text-[9.5px] font-bold text-(--m-on-accent)"
            >
              <Play className="h-2.5 w-2.5" /> Executar
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1.7fr)_minmax(0,1fr)] @[720px]:grid-cols-[1fr_250px] @[720px]:grid-rows-1">
          {/* Canvas */}
          <div className="bg-canvas-dots relative min-h-0 overflow-hidden">
            <svg viewBox="0 0 600 230" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke">
                <path d={wire(N.trigger, N.agent)} vectorEffect="non-scaling-stroke" className={wireCls(phase >= 1, phase === 1)} />
                <path d={wire(N.agent, N.branch)} vectorEffect="non-scaling-stroke" className={wireCls(phase >= 2, phase === 2)} />
                <path d={`M${N.agent.x},${N.agent.y} L${N.memory.x},${N.memory.y}`} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" className="stroke-(--m-ink)/25" />
                <path d={`M${N.agent.x},${N.agent.y} L${N.kb.x},${N.kb.y}`} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" className="stroke-(--m-ink)/25" />
                <path d={wire(N.branch, N.crm)} vectorEffect="non-scaling-stroke" className={wireCls(phase >= 3 && hot, phase === 3 || phase === 4)} />
                <path d={wire(N.crm, N.notify)} vectorEffect="non-scaling-stroke" className={wireCls(phase >= 4 && hot, phase === 4)} />
                <path d={wire(N.branch, N.nurture)} vectorEffect="non-scaling-stroke" className={wireCls(phase >= 3 && !hot, phase === 3 || phase === 4)} />
              </g>
            </svg>
            <Node at={N.trigger} icon={MessageCircle} title="WhatsApp" sub="Nova mensagem" state={st(1)} tone="bg-emerald-600" />
            <Node at={N.agent} icon={Bot} title="Agente IA" sub="Responde e qualifica" state={st(2)} tone="bg-(--m-ink)" />
            <Node at={N.memory} icon={Database} title="Memória" state={phase >= 2 ? "done" : "idle"} small tone="bg-(--m-ink)/70" />
            <Node at={N.kb} icon={BookOpen} title="Base" state={phase >= 2 ? "done" : "idle"} small tone="bg-(--m-ink)/70" />
            <Node at={N.branch} icon={GitBranch} title="Score ≥ 70?" sub={phase >= 3 ? `score ${lead.score}` : "Decisão"} state={st(3)} tone="bg-amber-500" />
            <Node at={N.crm} icon={KanbanSquare} title="Criar card" sub="CRM · Qualificados" state={branchState(true)} tone="bg-sky-600" />
            <Node at={N.notify} icon={Bell} title="Avisar vendas" sub="WhatsApp da Carla" state={branchState(true)} tone="bg-(--m-accent)" />
            <Node at={N.nurture} icon={Sprout} title="Nutrição" sub="Sequência de conteúdo" state={branchState(false)} tone="bg-lime-600" />
            <span className="absolute bottom-1.5 left-2 rounded bg-white/90 px-1.5 py-0.5 font-mono text-[8px] text-(--m-ink)/65">
              {phase === 0 ? "Pronto para executar" : phase < 5 ? "Executando…" : "Concluído em 2,1 s"}
            </span>
          </div>

          {/* Execução */}
          <div className="grid min-h-0 grid-cols-2 gap-px border-t border-(--m-ink)/10 bg-(--m-ink)/10 @[720px]:grid-cols-1 @[720px]:grid-rows-[1.3fr_1fr] @[720px]:border-l @[720px]:border-t-0">
            <div className="flex min-h-0 flex-col bg-[#ECE5DD]">
              <div className="flex items-center gap-1.5 bg-(--m-ink) px-2 py-1 text-white">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-[8px] font-bold">{lead.name[0]}</span>
                <span className="truncate text-[9px] font-bold">
                  {lead.name} · {lead.company}
                </span>
              </div>
              {/* Conversa alinhada por baixo, como no WhatsApp: as mensagens antigas somem por cima */}
              <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2 pb-1.5 pt-2 text-[8.5px] leading-snug">
                {phase === 0 ? (
                  <p className="m-auto max-w-[22ch] text-center text-(--m-ink)/65">Clique em Executar para ver o atendimento.</p>
                ) : (
                  <>
                    <p className="max-w-[86%] shrink-0 rounded-md rounded-tl-none bg-white px-1.5 py-1 shadow-2xs">{lead.msg}</p>
                    {phase >= 2 && (
                      <p className="ml-auto max-w-[86%] shrink-0 rounded-md rounded-tr-none bg-[#D9FDD3] px-1.5 py-1 shadow-2xs">
                        {phase === 2 ? "digitando…" : lead.reply}
                        {phase > 2 && (
                          <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[7.5px] text-sky-700">
                            <Sparkles className="h-2 w-2" /> IA <CheckCheck className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </p>
                    )}
                    {phase >= 3 && <p className="max-w-[86%] shrink-0 rounded-md rounded-tl-none bg-white px-1.5 py-1 shadow-2xs">{lead.answer}</p>}
                  </>
                )}
              </div>
              <div className="mx-1.5 mb-1.5 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[8.5px] text-(--m-ink)/65">
                <MessageCircle className="h-2.5 w-2.5" /> Mensagem
              </div>
            </div>
            <div className="flex min-h-0 flex-col overflow-hidden bg-white p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-(--m-ink)/65">Extraído pela IA</p>
                <span className="font-mono text-[8px] text-(--m-ink)/65">{phase >= 5 ? "exec. #1.285 · 2,1 s" : phase > 0 ? "executando…" : "aguardando"}</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-1">
                {Object.entries(lead.data).map(([k, v]) => (
                  <div key={k} className="rounded-md bg-(--m-bg) px-1.5 py-1">
                    <p className="text-[7.5px] text-(--m-ink)/65">{k}</p>
                    <p className="truncate text-[9px] font-bold">{phase >= 3 ? v : "—"}</p>
                  </div>
                ))}
              </div>
              {phase >= 4 && (
                <p className={`mt-auto rounded-md px-1.5 py-1.5 text-[8.5px] font-semibold ${hot ? "bg-emerald-50 text-emerald-700" : "bg-lime-50 text-lime-800"}`}>
                  {hot ? `Card criado · score ${lead.score} · vendas avisada` : `Score ${lead.score} · entrou na nutrição`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
