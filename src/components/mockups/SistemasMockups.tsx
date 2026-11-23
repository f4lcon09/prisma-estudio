"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  Plus,
  QrCode,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type SaasTab = "painel" | "financeiro" | "clientes";
type PeriodKey = "30d" | "90d" | "ano";

const periodData: Record<
  PeriodKey,
  {
    label: string;
    total: number;
    growth: string;
    contracts: number;
    ticket: string;
    points: { month: string; value: number; y: number }[];
  }
> = {
  "30d": {
    label: "30 dias",
    total: 229150,
    growth: "+18,4%",
    contracts: 42,
    ticket: "R$ 5.455",
    points: [
      { month: "Mai", value: 118400, y: 82 },
      { month: "Jun", value: 142000, y: 68 },
      { month: "Jul", value: 136800, y: 72 },
      { month: "Ago", value: 179500, y: 46 },
      { month: "Set", value: 198200, y: 34 },
      { month: "Out", value: 229150, y: 18 },
    ],
  },
  "90d": {
    label: "90 dias",
    total: 614800,
    growth: "+24,1%",
    contracts: 58,
    ticket: "R$ 6.120",
    points: [
      { month: "Mai", value: 96000, y: 86 },
      { month: "Jun", value: 130000, y: 72 },
      { month: "Jul", value: 168000, y: 54 },
      { month: "Ago", value: 192000, y: 40 },
      { month: "Set", value: 215000, y: 26 },
      { month: "Out", value: 249000, y: 14 },
    ],
  },
  ano: {
    label: "Ano",
    total: 1840200,
    growth: "+39,7%",
    contracts: 94,
    ticket: "R$ 7.240",
    points: [
      { month: "Mai", value: 110000, y: 84 },
      { month: "Jun", value: 145000, y: 66 },
      { month: "Jul", value: 162000, y: 58 },
      { month: "Ago", value: 188000, y: 42 },
      { month: "Set", value: 221000, y: 24 },
      { month: "Out", value: 268000, y: 12 },
    ],
  },
};

interface OrderRow {
  id: string;
  client: string;
  service: string;
  value: number;
  status: "Pago" | "Pendente";
}

const initialOrders: OrderRow[] = [
  { id: "1", client: "Clínica Horizonte", service: "Portal Paciente", value: 4800, status: "Pago" },
  { id: "2", client: "Grupo Vértice", service: "ERP Logística", value: 12400, status: "Pendente" },
  { id: "3", client: "Studio Atlas", service: "Automação CRM", value: 3200, status: "Pago" },
];

export function SistemaErpInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Prisma ERP", (n) => `${n} · Gestão`);
  const [activeTab, setActiveTab] = useState<SaasTab>("painel");
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const [hoveredIdx, setHoveredIdx] = useState(5);
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [searchClient, setSearchClient] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newValue, setNewValue] = useState("3500");

  const data = periodData[period];
  const hoveredPoint = data.points[hoveredIdx] ?? data.points[5];
  const extraRevenue = orders.slice(initialOrders.length).reduce((acc, row) => acc + row.value, 0);

  function toggleOrderStatus(id: string) {
    if (!interactive) return;
    setOrders((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: row.status === "Pago" ? "Pendente" : "Pago" } : row
      )
    );
  }

  function handleAddOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!interactive) return;
    const parsed = Math.max(200, Number(newValue.replace(/\D/g, "")) || 3500);
    const label = newClient.trim() || "Novo Cliente B2B";
    setOrders((prev) => [
      { id: String(Date.now()), client: label, service: "Sistema Sob Medida", value: parsed, status: "Pago" },
      ...prev,
    ]);
    setNewClient("");
    setShowNewForm(false);
    setActiveTab("financeiro");
  }

  const filteredOrders = orders.filter((row) =>
    row.client.toLowerCase().includes(searchClient.toLowerCase())
  );

  return (
    <BrowserShell url="app.prismaestudio.dev/painel" palette="erp">
      <div className="grid min-h-[330px] grid-cols-12 bg-(--m-bg)/70 text-left">
        {/* Dark App Sidebar */}
        <aside className="col-span-4 flex flex-col justify-between bg-(--m-ink) p-3 text-white/75 sm:col-span-3">
          <div>
            <div className="flex items-center gap-2 px-1.5 py-1">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-(--m-accent) text-[10px] font-bold text-(--m-on-accent)">
                P
              </div>
              <span className="truncate text-[11px] font-semibold text-white">{brand}</span>
            </div>

            <div className="mt-4 space-y-1">
              {(
                [
                  { id: "painel", label: "Painel Geral", icon: LayoutDashboard },
                  { id: "financeiro", label: "Financeiro", icon: CreditCard, badge: String(orders.length) },
                  { id: "clientes", label: "Clientes", icon: Users },
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
                        ? "bg-gradient-to-r from-(--m-accent) to-(--m-accent) font-medium text-(--m-on-accent) shadow-sm"
                        : "text-white/55 hover:bg-white/10 hover:text-white/90"
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
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 p-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-(--m-accent) text-[10px] font-bold text-(--m-on-accent)">
              LA
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-white">Lucas A.</p>
              <p className="truncate text-[9px] text-white/55">Admin · Online</p>
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <div className="col-span-8 flex flex-col justify-between p-3.5 sm:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/10 pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-(--m-ink)">
                {activeTab === "painel" && "Visão Operacional"}
                {activeTab === "financeiro" && "Lançamentos & Pix"}
                {activeTab === "clientes" && "Base de Clientes"}
              </h3>
              <p className="text-[10px] text-(--m-ink)/70">Atualizado em tempo real</p>
            </div>

            <div className="flex items-center gap-1.5">
              {activeTab === "painel" && (
                <div className="hidden rounded-lg border border-(--m-ink)/12 bg-white p-0.5 sm:inline-flex">
                  {(["30d", "90d", "ano"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setPeriod(key)}
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${
                        period === key ? "bg-(--m-accent) text-(--m-on-accent)" : "text-(--m-ink)/70"
                      }`}
                    >
                      {periodData[key].label}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setShowNewForm((v) => !v)}
                className="inline-flex items-center gap-1 rounded-md bg-(--m-ink) px-2 py-1 text-[10px] font-medium text-white hover:bg-(--m-ink)/85"
              >
                <Plus className="h-2.5 w-2.5" />
                <span>Novo pedido</span>
              </button>
            </div>
          </div>

          {showNewForm && interactive && (
            <form
              onSubmit={handleAddOrder}
              className="mt-2.5 flex flex-wrap items-center gap-2 rounded-xl border border-(--m-accent)/35 bg-(--m-accent)/10 p-2"
            >
              <input
                type="text"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                placeholder="Nome do cliente"
                className="min-w-[120px] flex-1 rounded-lg border border-(--m-ink)/12 bg-white px-2.5 py-1 text-[10px] text-(--m-ink) focus:border-(--m-accent) focus:outline-none"
              />
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Valor"
                className="font-tech w-20 rounded-lg border border-(--m-ink)/12 bg-white px-2 py-1 text-[10px] text-(--m-ink) focus:border-(--m-accent) focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-(--m-accent) px-2.5 py-1 text-[10px] font-semibold text-(--m-on-accent) hover:brightness-95"
              >
                Salvar
              </button>
            </form>
          )}

          {activeTab === "painel" && (
            <>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-(--m-accent)/25 bg-gradient-to-br from-(--m-accent)/10 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-(--m-accent-ink)">Faturamento</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-(--m-ink) sm:text-sm">
                    R$ {(data.total + extraRevenue).toLocaleString("pt-BR")}
                  </p>
                  <span className="font-tech inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
                    <TrendingUp className="h-2.5 w-2.5" /> {data.growth}
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-emerald-700">Contratos</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-(--m-ink) sm:text-sm">
                    {data.contracts + orders.length - initialOrders.length} ativos
                  </p>
                  <span className="font-tech text-[9px] font-medium text-emerald-600">94% renovação</span>
                </div>
                <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-2.5">
                  <span className="text-[9px] font-semibold text-amber-700">Ticket Médio</span>
                  <p className="font-tech mt-0.5 text-xs font-bold text-(--m-ink) sm:text-sm">
                    {data.ticket}
                  </p>
                  <span className="font-tech text-[9px] font-semibold text-amber-600">+{data.label}</span>
                </div>
              </div>

              <div className="mt-2.5 rounded-xl border border-(--m-ink)/10 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-(--m-ink)">
                    Receita Mensal vs Meta
                  </span>
                  <span className="font-tech rounded bg-(--m-ink) px-1.5 py-0.5 text-[9px] text-white">
                    {hoveredPoint.month}: R$ {(hoveredPoint.value / 1000).toFixed(1)}k
                  </span>
                </div>

                <div className="relative mt-2 h-24 w-full">
                  <svg viewBox="0 0 300 100" className="h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="cobaltAreaLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00A86B" stopOpacity="0.24" />
                        <stop offset="100%" stopColor="#00A86B" stopOpacity="0.0" />
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
                    <path
                      d="M 10 86 Q 70 76, 125 66 T 235 44 T 290 32"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <path
                      d={`M 10 ${data.points[0].y} L 66 ${data.points[1].y} L 122 ${data.points[2].y} L 178 ${data.points[3].y} L 234 ${data.points[4].y} L 290 ${data.points[5].y} L 290 95 L 10 95 Z`}
                      fill="url(#cobaltAreaLive)"
                    />
                    <path
                      d={`M 10 ${data.points[0].y} L 66 ${data.points[1].y} L 122 ${data.points[2].y} L 178 ${data.points[3].y} L 234 ${data.points[4].y} L 290 ${data.points[5].y}`}
                      fill="none"
                      stroke="#00A86B"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {data.points.map((pt, idx) => {
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
                            fill={isHovered ? "#00A86B" : "#FFFFFF"}
                            stroke="#00A86B"
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </svg>
                  <div className="mt-0.5 flex justify-between px-1 text-[9px] text-(--m-ink)/55">
                    {data.points.map((p) => (
                      <span key={p.month}>{p.month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "financeiro" && (
            <div className="mt-2.5 space-y-2">
              {orders.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between rounded-xl border border-(--m-ink)/10 bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-(--m-ink)">{row.client}</p>
                    <p className="text-[9px] text-(--m-ink)/70">{row.service}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-tech text-[11px] font-bold text-(--m-ink)">
                      R$ {row.value.toLocaleString("pt-BR")}
                    </span>
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => toggleOrderStatus(row.id)}
                      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                        row.status === "Pago"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700 hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                    >
                      {row.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "clientes" && (
            <div className="mt-2.5 space-y-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-(--m-ink)/55" />
                <input
                  type="text"
                  disabled={!interactive}
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  placeholder="Buscar cliente..."
                  className="w-full rounded-lg border border-(--m-ink)/12 bg-white py-1.5 pl-7 pr-3 text-[10px] text-(--m-ink) focus:border-(--m-accent) focus:outline-none"
                />
              </div>
              {filteredOrders.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-xl border border-(--m-ink)/10 bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-(--m-ink)">{c.client}</p>
                    <p className="text-[9px] text-(--m-ink)/70">{c.service}</p>
                  </div>
                  <span className="rounded-md bg-(--m-accent)/10 px-2 py-0.5 text-[9px] font-semibold text-(--m-accent-ink)">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2.5 flex items-center justify-between text-[10px] text-(--m-ink)/70">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Banco PostgreSQL · 14ms
            </span>
            <span className="font-tech text-(--m-ink)/55">Clique nas abas para testar</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function SistemaPortalInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Grupo Vértice");
  const [tab, setTab] = useState<"faturas" | "docs" | "chamados">("faturas");
  const [paid1042, setPaid1042] = useState(false);
  const [showPixBox, setShowPixBox] = useState(false);
  const [tickets, setTickets] = useState([
    { id: "#88", title: "Ajuste de domínio e SSL", status: "Em atendimento · SLA 2h" },
  ]);
  const [ticketText, setTicketText] = useState("");

  function addTicket(e: React.FormEvent) {
    e.preventDefault();
    if (!interactive || !ticketText.trim()) return;
    setTickets((prev) => [
      { id: `#${89 + prev.length}`, title: ticketText.trim(), status: "Aberto agora" },
      ...prev,
    ]);
    setTicketText("");
  }

  return (
    <BrowserShell url="cliente.prismaestudio.dev" palette="portal">
      <div className="min-h-[330px] bg-(--m-bg) p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/12 pb-2.5">
          <div>
            <p className="text-xs font-bold text-(--m-ink)">Portal do Assinante · {brand}</p>
            <p className="text-[10px] text-(--m-ink)/70">Plano Enterprise · Renovação ativa</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-(--m-ink)/10 p-0.5">
            {(["faturas", "docs", "chamados"] as const).map((t) => (
              <button
                key={t}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setTab(t)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-semibold capitalize ${
                  tab === t ? "bg-white text-(--m-ink) shadow-2xs" : "text-(--m-ink)/75"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "faturas" && (
          <div className="mt-3 space-y-2">
            <div className="rounded-xl border border-(--m-ink)/12 bg-white px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-(--m-ink)">Fatura #1042 · Nov/2026</p>
                  <p className="text-[9px] text-(--m-ink)/70">{paid1042 ? "Pago agora via Pix" : "Vence 25/11"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-[11px] font-bold text-(--m-ink)">R$ 1.850,00</span>
                  {paid1042 ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                      Quitado ✓
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setShowPixBox((v) => !v)}
                      className="inline-flex items-center gap-1 rounded-full bg-(--m-accent) px-2.5 py-0.5 text-[9px] font-semibold text-(--m-on-accent) hover:brightness-95"
                    >
                      <QrCode className="h-2.5 w-2.5" />
                      <span>Pagar Pix</span>
                    </button>
                  )}
                </div>
              </div>

              {showPixBox && !paid1042 && interactive && (
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-(--m-accent)/35 bg-(--m-accent)/10 p-2.5 text-[10px]">
                  <span className="font-tech truncate text-(--m-ink)/85">
                    00020126580014BR.GOV.BCB.PIX...PRISMA1042
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPaid1042(true);
                      setShowPixBox(false);
                    }}
                    className="rounded-md bg-emerald-600 px-2.5 py-1 text-[9px] font-semibold text-white hover:bg-emerald-700"
                  >
                    Simular pagamento
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-(--m-ink)/12 bg-white px-3 py-2.5">
              <div>
                <p className="text-[11px] font-semibold text-(--m-ink)">Fatura #1019 · Out/2026</p>
                <p className="text-[9px] text-(--m-ink)/70">Pago via Pix</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-tech text-[11px] font-bold text-(--m-ink)">R$ 1.850,00</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  Quitado
                </span>
              </div>
            </div>
          </div>
        )}

        {tab === "docs" && (
          <div className="mt-3 space-y-2">
            {["Contrato_Prestacao_2026.pdf", "Manual_API_Integracao.pdf"].map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between rounded-xl border border-(--m-ink)/12 bg-white px-3 py-2.5"
              >
                <span className="flex items-center gap-2 text-[11px] font-medium text-(--m-ink)">
                  <FileText className="h-3.5 w-3.5 text-(--m-accent-ink)" />
                  {doc}
                </span>
                <Download className="h-3.5 w-3.5 text-(--m-ink)/55" />
              </div>
            ))}
          </div>
        )}

        {tab === "chamados" && (
          <div className="mt-3 space-y-2">
            {interactive && (
              <form onSubmit={addTicket} className="flex gap-2">
                <input
                  type="text"
                  value={ticketText}
                  onChange={(e) => setTicketText(e.target.value)}
                  placeholder="Descreva um novo chamado..."
                  className="flex-1 rounded-lg border border-(--m-ink)/12 bg-white px-2.5 py-1.5 text-[10px] text-(--m-ink) focus:border-(--m-accent) focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-(--m-accent) px-3 py-1.5 text-[10px] font-semibold text-(--m-on-accent) hover:brightness-95"
                >
                  Abrir
                </button>
              </form>
            )}
            {tickets.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-(--m-accent)/25 bg-white px-3 py-2 text-[10px]"
              >
                <span className="font-semibold text-(--m-ink)">
                  {t.id} · {t.title}
                </span>
                <span className="font-tech text-(--m-accent-ink)">{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </BrowserShell>
  );
}

interface AgendaSlot {
  id: string;
  time: string;
  title: string;
  status: "Confirmado" | "Em sala" | "Concluído";
}

export function SistemaAgendaInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Grade Operacional", (n) => `${n} · Agenda`);
  const [selectedDay, setSelectedDay] = useState<"Hoje" | "Amanhã">("Hoje");
  const [slots, setSlots] = useState<AgendaSlot[]>([
    { id: "1", time: "09:00", title: "Dra. Camila · Avaliação", status: "Confirmado" },
    { id: "2", time: "10:30", title: "Dr. Rafael · Retorno", status: "Em sala" },
    { id: "3", time: "14:00", title: "Equipe Técnica · Instalação", status: "Confirmado" },
  ]);

  function cycleStatus(id: string) {
    if (!interactive) return;
    setSlots((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next: AgendaSlot["status"] =
          s.status === "Confirmado"
            ? "Em sala"
            : s.status === "Em sala"
            ? "Concluído"
            : "Confirmado";
        return { ...s, status: next };
      })
    );
  }

  function addQuickSlot() {
    if (!interactive) return;
    setSlots((prev) => [
      ...prev,
      { id: String(Date.now()), time: "16:30", title: "Novo encaixe · Atendimento", status: "Confirmado" },
    ]);
  }

  return (
    <BrowserShell url="agenda.prismaestudio.dev/equipe" palette="agenda">
      <div className="min-h-[330px] bg-(--m-bg) p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--m-ink)/12 pb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-(--m-accent-ink)" />
            <span className="text-xs font-bold text-(--m-ink)">{brand}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1 rounded-lg bg-(--m-ink)/10 p-0.5">
              {(["Hoje", "Amanhã"] as const).map((day) => (
                <button
                  key={day}
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setSelectedDay(day)}
                  className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                    selectedDay === day ? "bg-(--m-accent) text-(--m-on-accent)" : "text-(--m-ink)/75"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {interactive && (
              <button
                type="button"
                onClick={addQuickSlot}
                className="inline-flex items-center gap-1 rounded-md bg-(--m-ink) px-2 py-1 text-[10px] font-semibold text-white hover:bg-(--m-ink)/85"
              >
                <Plus className="h-3 w-3" /> Encaixe
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between rounded-xl border border-(--m-ink)/12 bg-white px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-tech rounded bg-(--m-ink)/5 px-2 py-0.5 text-[10px] font-bold text-(--m-ink)">
                  {slot.time}
                </span>
                <span className="text-[11px] font-semibold text-(--m-ink)">{slot.title}</span>
              </div>
              <button
                type="button"
                disabled={!interactive}
                onClick={() => cycleStatus(slot.id)}
                title="Clique para alternar etapa"
                className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-colors ${
                  slot.status === "Concluído"
                    ? "bg-emerald-50 text-emerald-700"
                    : slot.status === "Em sala"
                    ? "bg-(--m-accent)/10 text-(--m-accent-ink)"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {slot.status === "Concluído" && <Check className="mr-0.5 inline h-2.5 w-2.5" />}
                {slot.status}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-(--m-ink)/70">
          <span>Clique no status para avançar atendimento ({selectedDay})</span>
          <span className="font-tech inline-flex items-center gap-1 font-bold text-(--m-accent-ink)">
            <CheckCircle2 className="h-3 w-3" /> {slots.length} horários
          </span>
        </div>
      </div>
    </BrowserShell>
  );
}
