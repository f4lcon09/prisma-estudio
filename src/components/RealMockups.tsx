"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Database,
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Webhook,
  Wifi,
  Zap,
} from "lucide-react";
import type { HeroModeId } from "@/config/site";

interface BrowserShellProps {
  url: string;
  children: React.ReactNode;
  compact?: boolean;
}

export function BrowserShell({ url, children, compact = false }: BrowserShellProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)]">
      {/* macOS Browser Title & Address Bar */}
      <div
        className={`flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-3 ${
          compact ? "py-2" : "py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          {!compact && (
            <div className="hidden items-center gap-1 text-slate-400 sm:flex" aria-hidden="true">
              <ChevronLeft className="h-3.5 w-3.5" />
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </div>
          )}
        </div>

        <div className="mx-2 flex min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-[10px] text-slate-500 shadow-2xs sm:max-w-[320px]">
          <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span className="font-tech truncate">{url}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400" aria-hidden="true">
          <Plus className="h-3.5 w-3.5" />
        </div>
      </div>

      {children}
    </div>
  );
}

type SaasTab = "painel" | "financeiro" | "clientes";

const chartPoints = [
  { month: "Mai", value: 118400, y: 82 },
  { month: "Jun", value: 142000, y: 68 },
  { month: "Jul", value: 136800, y: 72 },
  { month: "Ago", value: 179500, y: 46 },
  { month: "Set", value: 198200, y: 34 },
  { month: "Out", value: 229150, y: 18 },
];

const recentEntries = [
  { client: "Clínica Horizonte", service: "Portal Paciente", value: "R$ 4.800,00", status: "Pago", time: "09:42" },
  { client: "Grupo Vértice", service: "ERP Logística", value: "R$ 12.400,00", status: "Aprovado", time: "08:15" },
  { client: "Studio Atlas", service: "Automação CRM", value: "R$ 3.200,00", status: "Pendente", time: "Ontem" },
];

export function SaasProgramScreen({ interactive = true }: { interactive?: boolean }) {
  const [activeTab, setActiveTab] = useState<SaasTab>("painel");
  const [hoveredIdx, setHoveredIdx] = useState<number>(5);

  const hoveredPoint = chartPoints[hoveredIdx] ?? chartPoints[5];

  return (
    <BrowserShell url="app.prismaestudio.dev/painel">
      <div className="grid min-h-[310px] grid-cols-12 bg-slate-50/70 text-left">
        {/* Dark App Sidebar */}
        <aside className="col-span-4 flex flex-col justify-between bg-[#0F172A] p-3 text-slate-300 sm:col-span-3">
          <div>
            <div className="flex items-center gap-2 px-1.5 py-1">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
                P
              </div>
              <span className="truncate text-[11px] font-semibold text-white">Prisma ERP</span>
            </div>

            <div className="mt-4 space-y-1">
              {(
                [
                  { id: "painel", label: "Painel Geral", icon: LayoutDashboard },
                  { id: "financeiro", label: "Financeiro", icon: CreditCard },
                  { id: "clientes", label: "Clientes", icon: Users, badge: "3" },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => interactive && setActiveTab(item.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[11px] transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-sm"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {"badge" in item && item.badge && (
                      <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] text-slate-500">
                <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Relatórios</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-800/70 p-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-blue-600 text-[10px] font-bold text-white">
              LA
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-white">Lucas A.</p>
              <p className="truncate text-[9px] text-slate-400">Admin · Online</p>
            </div>
          </div>
        </aside>

        {/* Main Program Workspace */}
        <div className="col-span-8 flex flex-col justify-between p-3.5 sm:col-span-9">
          {/* App Topbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {activeTab === "painel" && "Visão Operacional"}
                {activeTab === "financeiro" && "Fluxo de Caixa & Pix"}
                {activeTab === "clientes" && "Pipeline de Clientes"}
              </h3>
              <p className="text-[10px] text-slate-500">Atualizado há 12s via API</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">
                <Search className="h-2.5 w-2.5" />
                <span>⌘K</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white">
                <Plus className="h-2.5 w-2.5" />
                <span>Novo pedido</span>
              </span>
            </div>
          </div>

          {activeTab === "painel" && (
            <>
              {/* KPI Row */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-blue-700">Faturamento</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">
                    R$ 229.150
                  </p>
                  <span className="font-tech inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
                    <TrendingUp className="h-2.5 w-2.5" /> +18,4%
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-emerald-700">Contratos</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">42 ativos</p>
                  <span className="font-tech text-[9px] font-medium text-emerald-600">94% renovação</span>
                </div>
                <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-amber-700">Ticket Médio</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">R$ 5.455</p>
                  <span className="font-tech text-[9px] font-semibold text-amber-600">+R$ 620/mês</span>
                </div>
              </div>

              {/* Interactive Revenue Chart */}
              <div className="mt-2.5 rounded-xl border border-slate-200/80 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-800">
                    Receita Mensal vs Meta
                  </span>
                  <span className="font-tech rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-white">
                    {hoveredPoint.month}: R$ {(hoveredPoint.value / 1000).toFixed(1)}k
                  </span>
                </div>

                <div className="relative mt-2 h-24 w-full">
                  <svg viewBox="0 0 300 100" className="h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="cobaltArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {[25, 55, 85].map((lineY) => (
                      <line
                        key={lineY}
                        x1="0"
                        y1={lineY}
                        x2="300"
                        y2={lineY}
                        stroke="#E2E8F0"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                    ))}
                    {/* Amber target curve */}
                    <path
                      d="M 10 86 Q 70 76, 125 66 T 235 44 T 290 32"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    {/* Cobalt revenue area */}
                    <path
                      d="M 10 82 C 45 78, 55 68, 66 68 C 85 68, 105 74, 122 72 C 145 70, 162 50, 178 46 C 202 40, 218 38, 234 34 C 255 29, 272 22, 290 18 L 290 95 L 10 95 Z"
                      fill="url(#cobaltArea)"
                    />
                    <path
                      d="M 10 82 C 45 78, 55 68, 66 68 C 85 68, 105 74, 122 72 C 145 70, 162 50, 178 46 C 202 40, 218 38, 234 34 C 255 29, 272 22, 290 18"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {chartPoints.map((pt, idx) => {
                      const cx = 10 + idx * 56;
                      const isHovered = hoveredIdx === idx;
                      return (
                        <g
                          key={pt.month}
                          className={interactive ? "cursor-pointer" : ""}
                          onMouseEnter={() => interactive && setHoveredIdx(idx)}
                          onClick={() => interactive && setHoveredIdx(idx)}
                        >
                          <circle cx={cx} cy={pt.y} r="10" fill="transparent" />
                          <circle
                            cx={cx}
                            cy={pt.y}
                            r={isHovered ? 4.5 : 3}
                            fill={isHovered ? "#2563EB" : "#FFFFFF"}
                            stroke="#2563EB"
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </svg>
                  <div className="mt-0.5 flex justify-between px-1 text-[9px] text-slate-400">
                    {chartPoints.map((p) => (
                      <span key={p.month}>{p.month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "financeiro" && (
            <div className="mt-3 space-y-2">
              {recentEntries.map((row) => (
                <div
                  key={row.client}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">{row.client}</p>
                    <p className="text-[10px] text-slate-500">
                      {row.service} · {row.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-tech text-[11px] font-bold text-slate-900">{row.value}</p>
                    <span
                      className={`inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                        row.status === "Pago"
                          ? "bg-emerald-50 text-emerald-700"
                          : row.status === "Aprovado"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "clientes" && (
            <div className="mt-3 space-y-2">
              {[
                { name: "Clínica Horizonte", stage: "Em produção", owner: "Plano Pro", dot: "bg-emerald-500" },
                { name: "Grupo Vértice", stage: "Homologação", owner: "Enterprise", dot: "bg-blue-500" },
                { name: "Café Central", stage: "Proposta enviada", owner: "Site + Pix", dot: "bg-amber-500" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <div>
                      <p className="text-[11px] font-semibold text-slate-900">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.owner}</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                    {c.stage}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom live status strip */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Banco PostgreSQL · 14ms
            </span>
            <span className="font-tech text-slate-400">v2.4.1</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function SiteProgramScreen({ interactive = true }: { interactive?: boolean }) {
  const [plan, setPlan] = useState<"express" | "completo">("express");

  return (
    <BrowserShell url="clinicaaurora.com.br">
      <div className="min-h-[310px] bg-gradient-to-br from-amber-50/60 via-white to-blue-50/70 p-4 text-left">
        {/* Realistic Site Navbar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-blue-600 to-amber-400" />
            <span className="text-xs font-bold tracking-tight text-slate-900">Aurora Saúde</span>
          </div>
          <div className="hidden items-center gap-3 text-[10px] font-medium text-slate-500 sm:flex">
            <span>Especialidades</span>
            <span>Unidades</span>
            <span>Convênios</span>
          </div>
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
            Agendar agora
          </span>
        </div>

        {/* Realistic Published Hero */}
        <div className="mt-4 grid gap-4 sm:grid-cols-12 sm:items-center">
          <div className="sm:col-span-7">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-2.5 w-2.5" /> Atendimento hoje em São Paulo
            </span>
            <h4 className="mt-2 text-base font-extrabold leading-tight tracking-tight text-slate-900 sm:text-lg">
              Sua consulta confirmada em menos de 1 minuto.
            </h4>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
              Escolha o formato de atendimento e receba a confirmação direto no WhatsApp.
            </p>

            {/* Interactive toggle inside preview */}
            <div className="mt-3 inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
              {(["express", "completo"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setPlan(option)}
                  className={`rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                    plan === option ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                  }`}
                >
                  {option === "express" ? "Avaliação Express" : "Check-up Completo"}
                </button>
              ))}
            </div>
          </div>

          {/* Live Booking Widget inside the site */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:col-span-5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold text-slate-800">Próximo horário</span>
              <span className="font-tech rounded bg-blue-50 px-1.5 py-0.5 font-semibold text-blue-700">
                {plan === "express" ? "Hoje 14:30" : "Amanhã 09:00"}
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5 rounded-lg bg-slate-50 p-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Modalidade</span>
                <span className="font-medium text-slate-800">
                  {plan === "express" ? "Presencial · 30m" : "Com exames · 1h"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor estimado</span>
                <span className="font-tech font-bold text-slate-900">
                  {plan === "express" ? "R$ 180,00" : "R$ 340,00"}
                </span>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 text-[10px] font-semibold text-white">
              <span>Reservar horário</span>
            </div>
          </div>
        </div>

        {/* Web Vitals Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-[10px]">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Globe className="h-3.5 w-3.5 text-blue-600" />
            Lighthouse Score
          </span>
          <div className="font-tech flex items-center gap-3 text-[10px]">
            <span className="font-bold text-emerald-600">99 Performance</span>
            <span className="font-bold text-emerald-600">100 SEO</span>
            <span className="text-slate-500">0.6s LCP</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function AutomationProgramScreen({ interactive = true }: { interactive?: boolean }) {
  const [step, setStep] = useState<number>(3);
  const [running, setRunning] = useState(false);

  function triggerTestRun() {
    if (!interactive || running) return;
    setRunning(true);
    setStep(1);
    setTimeout(() => setStep(2), 450);
    setTimeout(() => {
      setStep(3);
      setRunning(false);
    }, 950);
  }

  return (
    <BrowserShell url="flow.prismaestudio.dev/workflows/triagem-ia">
      <div className="flex min-h-[310px] flex-col justify-between bg-slate-50 text-left">
        {/* Workflow Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-slate-900">Triagem WhatsApp + IA</span>
            <span className="font-tech rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
              Ativo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-tech hidden text-[10px] text-slate-500 sm:inline">
              1.248 execuções hoje
            </span>
            <button
              type="button"
              disabled={!interactive}
              onClick={triggerTestRun}
              className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              <span>{running ? "Executando..." : "Testar fluxo"}</span>
            </button>
          </div>
        </div>

        {/* Node Canvas */}
        <div className="bg-canvas-dots relative flex-1 bg-gradient-to-br from-amber-50/40 via-slate-50 to-blue-50/50 p-4">
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-3">
            {/* Node 1 */}
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
              <p className="font-tech mt-1 truncate text-[9px] text-slate-500">
                POST /whatsapp/msg
              </p>
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span>Entrada</span>
                <span className="font-tech">24ms</span>
              </div>
            </div>

            {/* Node 2 */}
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
                <span className="font-tech text-[9px] text-blue-600">JSON</span>
              </div>
              <p className="mt-1 text-[9px] text-slate-500">Classificar escopo + prazo</p>
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span>Score: 94/100</span>
                <span className="font-tech">380ms</span>
              </div>
            </div>

            {/* Node 3 */}
            <div
              className={`rounded-xl border bg-white p-2.5 shadow-sm transition-all ${
                step >= 3 ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900">
                  <Database className="h-3 w-3 text-emerald-600" />
                  CRM + Planilha
                </span>
                <Check className="h-3 w-3 text-emerald-600" />
              </div>
              <p className="mt-1 text-[9px] text-slate-500">Card #482 · Urgente</p>
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span>Sincronizado</span>
                <span className="font-tech">62ms</span>
              </div>
            </div>
          </div>

          {/* Live Payload Console */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-[#0F172A] p-2.5 text-[10px] text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[9px] text-slate-400">
              <span className="font-tech">EXECUTION OUTPUT</span>
              <span className="font-tech text-emerald-400">✓ 466ms total</span>
            </div>
            <pre className="font-tech mt-1.5 whitespace-pre-wrap break-words text-[9px] leading-relaxed text-slate-200">
{`{ "cliente": "Mariana Costa", "servico": "Sistema Web", "urgencia": "Este mês", "crm_id": 482 }`}
            </pre>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function MobileProgramMockup({ mode }: { mode: HeroModeId }) {
  return (
    <div className="w-[188px] overflow-hidden rounded-[28px] border-[5px] border-slate-900 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.3)]">
      {/* iOS Status Bar + Dynamic Island */}
      <div className="flex items-center justify-between bg-white px-3.5 pb-1 pt-2 text-[9px] font-semibold text-slate-900">
        <span>09:41</span>
        <div className="h-3.5 w-14 rounded-full bg-slate-900" aria-hidden="true" />
        <div className="flex items-center gap-1" aria-hidden="true">
          <Wifi className="h-2.5 w-2.5" />
          <span className="inline-block h-2 w-3.5 rounded-[2px] border border-slate-900 bg-slate-900" />
        </div>
      </div>

      {/* Mode-specific real app UI */}
      {mode === "sistemas" && (
        <div className="p-3 text-left">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-slate-400">Resumo diário</p>
              <p className="text-[11px] font-bold text-slate-900">Prisma Mobile</p>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-700">
              LA
            </span>
          </div>

          <div className="mt-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 text-white">
            <p className="text-[9px] text-blue-100">Recebido hoje</p>
            <p className="font-tech mt-0.5 text-sm font-bold">R$ 4.820,00</p>
            <p className="mt-1 text-[8px] text-amber-300">▲ 3 pagamentos Pix</p>
          </div>

          <div className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2">
            <p className="text-[9px] font-semibold text-slate-700">Pedidos na semana</p>
            <div className="mt-2 flex h-10 items-end justify-between gap-1 px-0.5">
              {[40, 65, 52, 85, 70, 95, 78].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-full rounded-t ${i === 5 ? "bg-blue-600" : "bg-blue-200"}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50/70 px-2 py-1.5 text-[9px] font-medium text-emerald-800">
            ● Contrato Studio Atlas assinado
          </div>
        </div>
      )}

      {mode === "sites" && (
        <div className="bg-gradient-to-b from-amber-50/60 via-white to-blue-50/50 p-2.5 text-left">
          {/* Mobile Safari Browser Address Bar */}
          <div className="flex items-center justify-center gap-1 rounded-lg border border-slate-200/80 bg-white px-2 py-1 text-[8px] text-slate-500 shadow-2xs">
            <Lock className="h-2 w-2 text-emerald-600" />
            <span className="font-tech truncate">clinicaaurora.com.br</span>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-gradient-to-tr from-blue-600 to-amber-400" />
              <span className="text-[10px] font-bold text-slate-900">Aurora Saúde</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-700">
              99 Speed
            </span>
          </div>

          <div className="mt-2 rounded-xl border border-blue-100 bg-white p-2.5 shadow-2xs">
            <p className="text-[10px] font-extrabold leading-tight text-slate-900">
              Consulta confirmada em 1 minuto.
            </p>
            <p className="mt-1 text-[8px] leading-snug text-slate-500">
              Versão mobile leve, responsiva e pronta para converter.
            </p>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1 text-[8px]">
              <span className="text-slate-500">Próximo:</span>
              <span className="font-tech font-bold text-blue-700">Hoje 14:30</span>
            </div>
          </div>

          <div className="mt-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 text-center text-[9px] font-semibold text-white shadow-sm">
            Agendar pelo WhatsApp
          </div>
        </div>
      )}

      {mode === "automacoes" && (
        <div className="flex flex-col justify-between bg-[#EFEAE2] p-2.5 text-left">
          <div className="flex items-center gap-1.5 rounded-lg bg-[#075E54] px-2 py-1.5 text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-slate-900">
              IA
            </span>
            <div>
              <p className="text-[9px] font-bold leading-none">Assistente Prisma</p>
              <p className="text-[8px] text-emerald-200">online agora</p>
            </div>
          </div>

          <div className="mt-2 space-y-1.5 text-[9px]">
            <div className="max-w-[88%] rounded-lg bg-white p-1.5 text-slate-800 shadow-2xs">
              Olá! Preciso de um sistema para pedidos.
            </div>
            <div className="ml-auto max-w-[90%] rounded-lg bg-[#D9FDD3] p-1.5 text-slate-800 shadow-2xs">
              Perfeito! Registrei sua demanda no CRM (#482).
            </div>
            <div className="rounded-md bg-blue-600/90 px-2 py-1 text-center text-[8px] font-semibold text-white">
              ✓ Lead qualificado · Score 94
            </div>
          </div>
        </div>
      )}

      {/* iOS Bottom Tab Bar */}
      <div className="flex items-center justify-around border-t border-slate-100 bg-white px-2 py-2 text-slate-400">
        <Home className="h-3 w-3 text-blue-600" />
        <Activity className="h-3 w-3" />
        <FileText className="h-3 w-3" />
        <Settings className="h-3 w-3" />
      </div>
    </div>
  );
}

export function TelemetryCardMockup({ mode }: { mode: HeroModeId }) {
  if (mode === "sites") {
    return (
      <div className="w-[218px] rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white via-white to-amber-50/70 p-3.5 text-left shadow-[0_18px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-900">SEO &amp; Conversão</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            142 online
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2">
            <p className="text-[9px] text-slate-500">Conversão</p>
            <p className="font-tech text-xs font-bold text-blue-600">6,8%</p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-2">
            <p className="text-[9px] text-slate-500">PageSpeed</p>
            <p className="font-tech text-xs font-bold text-emerald-600">99/100</p>
          </div>
        </div>
        <p className="font-tech mt-2.5 text-[9px] text-slate-500">
          +18 cliques no WhatsApp hoje
        </p>
      </div>
    );
  }

  if (mode === "sistemas") {
    return (
      <div className="w-[222px] rounded-2xl border border-blue-200/80 bg-gradient-to-br from-white via-white to-blue-50/80 p-3.5 text-left shadow-[0_18px_40px_-12px_rgba(37,99,235,0.2)] backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-900">
          <span>Monitor do Sistema</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2">
            <p className="text-[9px] text-slate-500">Uptime API</p>
            <p className="font-tech text-xs font-bold text-blue-700">99,98%</p>
          </div>
          <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-2">
            <p className="text-[9px] text-slate-500">Latência DB</p>
            <p className="font-tech text-xs font-bold text-indigo-700">14ms</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-[9px]">
          <span className="font-medium text-slate-700">14 pedidos hoje</span>
          <span className="font-tech font-semibold text-emerald-600">Pix ok</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[226px] rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white via-white to-emerald-50/75 p-3.5 text-left shadow-[0_18px_40px_-12px_rgba(16,185,129,0.22)] backdrop-blur-md">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
        <span>WhatsApp → IA → CRM</span>
        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
      </div>

      {/* Connected Pipeline Steps */}
      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <MessageSquare className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-slate-500">Msg</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-300 via-emerald-400 to-blue-500" />
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Bot className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-slate-500">IA</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-400 to-blue-600" />
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-slate-500">CRM</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-[9px]">
        <span className="flex items-center gap-1 font-medium text-slate-700">
          <Zap className="h-2.5 w-2.5 text-amber-500" />
          Disparo IA · 0.4s
        </span>
        <span className="font-tech font-semibold text-emerald-600">Qualificado</span>
      </div>
    </div>
  );
}
