"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type Tab = "painel" | "pedidos" | "clientes" | "financeiro";
type Period = "7d" | "30d" | "90d";
type Status = "Pago" | "Pendente" | "Enviado";

const series: Record<Period, { labels: string[]; values: number[]; revenue: number; orders: number; ticket: number; delta: number }> = {
  "7d": { labels: ["Qua", "Qui", "Sex", "Sáb", "Dom", "Seg", "Ter"], values: [21, 24, 31, 28, 12, 26, 34], revenue: 176400, orders: 214, ticket: 824, delta: 12.4 },
  "30d": { labels: ["S1", "S2", "S3", "S4", "S5"], values: [142, 158, 171, 166, 192], revenue: 829500, orders: 968, ticket: 857, delta: 18.2 },
  "90d": { labels: ["Ago", "Set", "Out", "Nov"], values: [610, 684, 742, 829], revenue: 2865000, orders: 3240, ticket: 884, delta: 24.6 },
};

interface Order {
  id: string;
  client: string;
  city: string;
  items: number;
  value: number;
  status: Status;
  when: string;
}

const seedOrders: Order[] = [
  { id: "#8421", client: "Mercado Bom Preço", city: "Campinas", items: 48, value: 12480, status: "Pendente", when: "há 12 min" },
  { id: "#8420", client: "Padaria Trigo Fino", city: "Jundiaí", items: 16, value: 3260, status: "Pago", when: "há 40 min" },
  { id: "#8419", client: "Empório São Jorge", city: "Sorocaba", items: 22, value: 5890, status: "Enviado", when: "há 1 h" },
  { id: "#8418", client: "Rede Super Já", city: "Valinhos", items: 64, value: 18320, status: "Pago", when: "há 2 h" },
  { id: "#8417", client: "Hortifruti Verde", city: "Campinas", items: 9, value: 1740, status: "Pendente", when: "há 3 h" },
];

const clients = [
  { name: "Rede Super Já", city: "Valinhos", ltv: 214000, last: "hoje", orders: 86 },
  { name: "Mercado Bom Preço", city: "Campinas", ltv: 168400, last: "hoje", orders: 71 },
  { name: "Empório São Jorge", city: "Sorocaba", ltv: 92300, last: "ontem", orders: 44 },
  { name: "Padaria Trigo Fino", city: "Jundiaí", ltv: 61800, last: "hoje", orders: 52 },
  { name: "Hortifruti Verde", city: "Campinas", ltv: 23900, last: "há 3 dias", orders: 18 },
];

const ledger = [
  { desc: "Rede Super Já · pedido #8418", value: 18320, kind: "in", via: "Pix" },
  { desc: "Fornecedor Laticínios Serra", value: -9640, kind: "out", via: "Boleto" },
  { desc: "Padaria Trigo Fino · #8420", value: 3260, kind: "in", via: "Pix" },
  { desc: "Frete Transportes Rota 10", value: -1280, kind: "out", via: "TED" },
  { desc: "Empório São Jorge · #8402", value: 7410, kind: "in", via: "Boleto" },
];

const statusTone: Record<Status, string> = {
  Pago: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pendente: "bg-amber-50 text-amber-800 ring-amber-200",
  Enviado: "bg-sky-50 text-sky-700 ring-sky-200",
};
const nextStatus: Record<Status, Status> = { Pendente: "Pago", Pago: "Enviado", Enviado: "Pendente" };

const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
const initials = (s: string) =>
  s
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 60},${18 - ((v - min) / (max - min || 1)) * 16}`).join(" ");
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-14" aria-hidden="true">
      <polyline points={pts} fill="none" strokeWidth="1.6" strokeLinecap="round" className={up ? "stroke-emerald-500" : "stroke-rose-500"} />
    </svg>
  );
}

function AreaChart({ labels, values, hover, onHover, interactive }: { labels: string[]; values: number[]; hover: number; onHover: (i: number) => void; interactive: boolean }) {
  const W = 320, H = 120, P = 8;
  const max = Math.max(...values) * 1.15;
  const x = (i: number) => P + (i / (values.length - 1)) * (W - P * 2);
  const y = (v: number) => H - 16 - (v / max) * (H - 28);
  const line = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(values.length - 1)},${H - 16} L${x(0)},${H - 16} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-label="Gráfico de receita">
      <defs>
        <linearGradient id="erp-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--m-accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--m-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={P} x2={W - P} y1={(H - 16) * f + 4} y2={(H - 16) * f + 4} stroke="var(--m-ink)" strokeOpacity="0.07" />
      ))}
      <path d={area} fill="url(#erp-area)" />
      <path d={line} fill="none" stroke="var(--m-accent)" strokeWidth="2" strokeLinejoin="round" />
      {values.map((v, i) => (
        <g key={i}>
          <rect x={x(i) - 14} y={0} width={28} height={H} fill="transparent" onMouseEnter={() => interactive && onHover(i)} />
          <text x={x(i)} y={H - 3} textAnchor="middle" fontSize="7" fill="var(--m-ink)" fillOpacity="0.6">
            {labels[i]}
          </text>
        </g>
      ))}
      <line x1={x(hover)} x2={x(hover)} y1={8} y2={H - 16} stroke="var(--m-ink)" strokeOpacity="0.2" strokeDasharray="2 2" />
      <circle cx={x(hover)} cy={y(values[hover])} r="3.5" fill="white" stroke="var(--m-accent)" strokeWidth="2" />
    </svg>
  );
}

export function SistemaErpInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Vértice Distribuidora");
  const [tab, setTab] = useState<Tab>("painel");
  const [period, setPeriod] = useState<Period>("30d");
  const [hover, setHover] = useState(series["30d"].values.length - 1);
  const [orders, setOrders] = useState(seedOrders);
  const [filter, setFilter] = useState<Status | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newValue, setNewValue] = useState("");

  const s = series[period];
  const pending = orders.filter((o) => o.status === "Pendente");
  const visibleOrders = filter === "Todos" ? orders : orders.filter((o) => o.status === filter);
  const visibleClients = useMemo(() => clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())), [query]);

  function go(t: Tab) {
    if (interactive) setTab(t);
  }
  function cycle(id: string) {
    if (!interactive) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: nextStatus[o.status] } : o)));
  }
  function addOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!interactive || !newClient.trim()) return;
    const value = Number(newValue.replace(/\D/g, "")) || 1500;
    setOrders((prev) => [{ id: `#${8422 + prev.length - 5}`, client: newClient.trim(), city: "Campinas", items: 12, value, status: "Pendente", when: "agora" }, ...prev]);
    setNewClient("");
    setNewValue("");
    setShowForm(false);
    setTab("pedidos");
    setFilter("Todos");
  }

  const nav: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: "painel", label: "Painel", icon: LayoutDashboard },
    { id: "pedidos", label: "Pedidos", icon: ShoppingCart, badge: pending.length },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: Wallet },
  ];

  const orderTable = (rows: Order[], compact = false) => (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
      <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-(--m-ink)/8 px-3 py-1.5 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-(--m-ink)/60 @[600px]:grid-cols-[0.6fr_1.6fr_0.7fr_0.9fr_0.8fr]">
        <span className="hidden @[600px]:block">Pedido</span>
        <span>Cliente</span>
        <span className="hidden @[600px]:block">Itens</span>
        <span>Valor</span>
        <span>Status</span>
      </div>
      {rows.slice(0, compact ? 4 : rows.length).map((o) => (
        <div key={o.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-(--m-ink)/6 px-3 py-1.5 last:border-0 @[600px]:grid-cols-[0.6fr_1.6fr_0.7fr_0.9fr_0.8fr]">
          <span className="hidden font-mono text-[9px] text-(--m-ink)/65 @[600px]:block">{o.id}</span>
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--m-ink)/8 text-[7.5px] font-bold">{initials(o.client)}</span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold">{o.client}</span>
              <span className="block text-[8.5px] text-(--m-ink)/60">{o.city} · {o.when}</span>
            </span>
          </span>
          <span className="hidden text-[9.5px] text-(--m-ink)/70 @[600px]:block">{o.items} itens</span>
          <span className="whitespace-nowrap text-[10px] font-semibold tabular-nums">{brl(o.value)}</span>
          <button
            type="button"
            disabled={!interactive}
            onClick={() => cycle(o.id)}
            title="Clique para mudar o status"
            className={`w-fit rounded-full px-2 py-0.5 text-[8.5px] font-semibold ${statusTone[o.status]}`}
          >
            {o.status}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <BrowserShell url="prisma.estudio/modelos/erp-vertice" palette="erp">
      <div className="@container">
      <div className="grid h-[min(var(--mock-h,540px),560px)] grid-cols-[46px_1fr] bg-(--m-bg) text-left text-(--m-ink) @[640px]:grid-cols-[168px_1fr]">
        {/* Menu lateral */}
        <aside className="flex min-h-0 flex-col border-r border-(--m-ink)/8 bg-[#F3F5F8] py-3 text-(--m-ink) @[640px]:px-2.5">
          <div className="flex items-center justify-center gap-2 @[640px]:justify-start @[640px]:rounded-xl @[640px]:bg-white @[640px]:shadow-[0_1px_2px_rgba(16,42,67,0.08)] @[640px]:px-2 @[640px]:py-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--m-accent) text-[10px] font-semibold text-(--m-on-accent)">
              {brand.slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden min-w-0 flex-1 @[640px]:block">
              <span className="block truncate text-[10.5px] font-bold">{brand}</span>
              <span className="block text-[8.5px] text-(--m-ink)/60">Matriz · Campinas</span>
            </span>
            <ChevronDown className="hidden h-3 w-3 text-(--m-ink)/60 @[640px]:block" />
          </div>
          <div className="mt-2.5 hidden items-center gap-1.5 rounded-lg bg-(--m-ink)/[0.05] px-2 py-1 text-[9.5px] text-(--m-ink)/60 @[640px]:flex">
            <Search className="h-3 w-3" /> Buscar
            <span className="ml-auto rounded bg-white px-1 font-mono text-[8px]">Ctrl K</span>
          </div>
          <p className="mt-3 hidden px-2 text-[8px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/60 @[640px]:block">Operação</p>
          <nav className="mt-1 grid gap-0.5 px-1.5 @[640px]:px-0">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  disabled={!interactive}
                  onClick={() => go(n.id)}
                  aria-label={n.label}
                  className={`relative flex items-center justify-center gap-2 rounded-lg py-1.5 text-[10.5px] font-medium @[640px]:justify-start @[640px]:px-2 ${
                    active ? "bg-white text-(--m-ink) shadow-[0_1px_2px_rgba(16,42,67,0.1)]" : "text-(--m-ink)/65 hover:bg-(--m-ink)/[0.05] hover:text-(--m-ink)"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden @[640px]:inline">{n.label}</span>
                  {n.badge ? (
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-(--m-accent) @[640px]:static @[640px]:ml-auto @[640px]:h-auto @[640px]:w-auto @[640px]:rounded-full @[640px]:px-1.5 @[640px]:text-[8.5px] @[640px]:font-bold @[640px]:text-(--m-on-accent)">
                      <span className="hidden @[640px]:inline">{n.badge}</span>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
          <p className="mt-3 hidden px-2 text-[8px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/60 @[640px]:block">Mais</p>
          <div className="mt-1 hidden gap-0.5 text-[10.5px] text-(--m-ink)/60 @[640px]:grid">
            <span className="flex items-center gap-2 px-2 py-1.5"><Boxes className="h-3.5 w-3.5" /> Estoque</span>
            <span className="flex items-center gap-2 px-2 py-1.5"><FileText className="h-3.5 w-3.5" /> Notas fiscais</span>
          </div>
          <div className="mt-auto flex items-center justify-center gap-2 @[640px]:justify-start @[640px]:rounded-xl @[640px]:bg-white @[640px]:p-1.5 @[640px]:shadow-[0_1px_2px_rgba(16,42,67,0.08)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-[8.5px] font-bold text-(--m-ink)">LA</span>
            <span className="hidden min-w-0 @[640px]:block">
              <span className="block truncate text-[10px] font-semibold">Lucas Almeida</span>
              <span className="block text-[8.5px] text-(--m-ink)/60">Administrador</span>
            </span>
          </div>
        </aside>

        <div className="@container flex min-h-0 min-w-0 flex-col">
          {/* Barra superior */}
          <div className="flex items-center justify-between gap-2 border-b border-(--m-ink)/6 bg-white/80 px-3 py-2 backdrop-blur-xl">
            <p className="truncate text-[10px] text-(--m-ink)/60">
              {brand} / <span className="font-semibold text-(--m-ink)">{nav.find((n) => n.id === tab)?.label}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 rounded-full bg-(--m-ink)/[0.05] p-0.5">
                {(["7d", "30d", "90d"] as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    disabled={!interactive}
                    onClick={() => {
                      setPeriod(p);
                      setHover(series[p].values.length - 1);
                    }}
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${period === p ? "bg-white shadow-[0_1px_2px_rgba(16,42,67,0.12)]" : "text-(--m-ink)/60"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className="hidden items-center gap-1 rounded-lg border border-(--m-ink)/12 px-2 py-1 text-[9px] font-semibold @[560px]:inline-flex">
                <Download className="h-2.5 w-2.5" /> Exportar
              </span>
              <button
                type="button"
                disabled={!interactive}
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full bg-(--m-ink) px-2.5 py-1 text-[9.5px] font-semibold text-white"
              >
                <Plus className="h-3 w-3" /> Pedido
              </button>
              <span className="relative hidden @[480px]:block">
                <Bell className="h-3.5 w-3.5 text-(--m-ink)/60" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin]">
            {showForm && (
              <form onSubmit={addOrder} className="mb-2.5 flex flex-wrap items-center gap-1.5 rounded-2xl bg-white p-2 shadow-[0_0_0_1.5px_var(--m-accent)]">
                <input value={newClient} disabled={!interactive} onChange={(e) => setNewClient(e.target.value)} placeholder="Cliente" className="min-w-0 flex-1 rounded-md border border-(--m-ink)/12 px-2 py-1 text-[10px] focus:border-(--m-accent) focus:outline-none" />
                <input value={newValue} disabled={!interactive} onChange={(e) => setNewValue(e.target.value)} placeholder="Valor (R$)" className="w-20 rounded-md border border-(--m-ink)/12 px-2 py-1 text-[10px] focus:border-(--m-accent) focus:outline-none" />
                <button type="submit" disabled={!interactive} className="rounded-md bg-(--m-accent) px-2.5 py-1 text-[10px] font-bold text-(--m-on-accent)">
                  Salvar
                </button>
              </form>
            )}

            {tab === "painel" && (
              <div className="grid gap-2.5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[14px] font-semibold tracking-tight">Bom dia, Lucas</p>
                    <p className="text-[9.5px] text-(--m-ink)/60">Resumo dos últimos {period === "7d" ? "7 dias" : period === "30d" ? "30 dias" : "90 dias"}</p>
                  </div>
                  <span className="hidden text-[9px] text-(--m-ink)/60 @[480px]:block">Atualizado há 1 min</span>
                </div>

                <div className="grid grid-cols-2 gap-2 @[500px]:grid-cols-4">
                  {[
                    { l: "Receita", v: brl(s.revenue), d: s.delta, data: s.values },
                    { l: "Pedidos", v: s.orders.toLocaleString("pt-BR"), d: s.delta - 4.1, data: s.values.map((v, i) => v * (0.9 + (i % 2) * 0.1)) },
                    { l: "Ticket médio", v: brl(s.ticket), d: 3.2, data: [3, 4, 3.6, 4.4, 4.2, 4.8] },
                    { l: "Inadimplência", v: "1,8%", d: -0.6, data: [3, 2.6, 2.8, 2.1, 1.9, 1.8] },
                  ].map((k) => {
                    const up = k.l === "Inadimplência" ? k.d < 0 : k.d >= 0;
                    return (
                      <div key={k.l} className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                        <p className="text-[9px] font-medium text-(--m-ink)/60">{k.l}</p>
                        <p className="mt-0.5 truncate text-[17px] font-semibold tracking-tight tabular-nums">{k.v}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 text-[8.5px] font-bold ${up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                            {k.d >= 0 ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                            {Math.abs(k.d).toFixed(1).replace(".", ",")}%
                          </span>
                          <Spark data={k.data} up={up} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-2 @[500px]:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10.5px] font-bold">Receita</p>
                      <span className="rounded-full bg-(--m-ink)/90 px-2 py-0.5 text-[8.5px] font-medium text-white">
                        {s.labels[hover]} · R$ {s.values[hover]} mil
                      </span>
                    </div>
                    <div className="mt-1 h-28">
                      <AreaChart labels={s.labels} values={s.values} hover={hover} onHover={setHover} interactive={interactive} />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                    <p className="text-[10.5px] font-bold">Metas de novembro</p>
                    <div className="mt-2 grid gap-2">
                      {[
                        ["Faturamento", 82],
                        ["Novos clientes", 64],
                        ["Entregas no prazo", 97],
                      ].map(([l, v]) => (
                        <div key={l as string}>
                          <div className="flex justify-between text-[9.5px]">
                            <span className="text-(--m-ink)/70">{l}</span>
                            <span className="font-bold tabular-nums">{v}%</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-(--m-ink)/8">
                            <div className="h-full rounded-full bg-(--m-accent)" style={{ width: `${v}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 @[500px]:grid-cols-[1.6fr_1fr]">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-[10.5px] font-bold">Pedidos recentes</p>
                      <button type="button" disabled={!interactive} onClick={() => go("pedidos")} className="text-[9px] font-semibold text-(--m-accent-ink)">
                        Ver todos
                      </button>
                    </div>
                    {orderTable(orders, true)}
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                    <p className="text-[10.5px] font-bold">Atividade</p>
                    <ul className="mt-2 grid gap-2 text-[9.5px]">
                      {[
                        ["Pix recebido de Rede Super Já", "R$ 18.320", "há 2 h"],
                        ["NF-e 4.812 emitida", "#8418", "há 2 h"],
                        ["Estoque baixo: Farinha 25 kg", "12 un.", "há 4 h"],
                      ].map(([t, v, w]) => (
                        <li key={t} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-(--m-accent)" />
                          <span className="min-w-0">
                            <span className="block truncate font-medium">{t}</span>
                            <span className="block text-(--m-ink)/60">{v} · {w}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tab === "pedidos" && (
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold">Pedidos</p>
                  <div className="flex gap-1">
                    {(["Todos", "Pendente", "Pago", "Enviado"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        disabled={!interactive}
                        onClick={() => setFilter(f)}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${filter === f ? "bg-(--m-ink) text-white" : "bg-white text-(--m-ink)/70 ring-1 ring-(--m-ink)/10"}`}
                      >
                        {f}
                        {f !== "Todos" && ` · ${orders.filter((o) => o.status === f).length}`}
                      </button>
                    ))}
                  </div>
                </div>
                {orderTable(visibleOrders)}
                <p className="text-[9px] text-(--m-ink)/60">Clique no status para avançar: Pendente → Pago → Enviado.</p>
              </div>
            )}

            {tab === "clientes" && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold">Clientes</p>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-(--m-ink)/50" />
                    <input
                      value={query}
                      disabled={!interactive}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar cliente"
                      className="w-36 rounded-lg border border-(--m-ink)/12 bg-white py-1 pl-6 pr-2 text-[10px] placeholder:text-(--m-ink)/45 focus:border-(--m-accent) focus:outline-none"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                  {visibleClients.map((c) => (
                    <div key={c.name} className="flex items-center justify-between gap-2 border-b border-(--m-ink)/6 px-3 py-2 last:border-0">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--m-accent)/20 text-[8.5px] font-bold text-(--m-accent-ink)">{initials(c.name)}</span>
                        <span className="min-w-0">
                          <span className="block truncate text-[10.5px] font-semibold">{c.name}</span>
                          <span className="block text-[9px] text-(--m-ink)/60">{c.city} · {c.orders} pedidos · último {c.last}</span>
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block text-[10.5px] font-bold tabular-nums">{brl(c.ltv)}</span>
                        <span className="block text-[8.5px] text-(--m-ink)/60">no ano</span>
                      </span>
                    </div>
                  ))}
                  {visibleClients.length === 0 && <p className="p-3 text-[10px] text-(--m-ink)/60">Nenhum cliente com esse nome.</p>}
                </div>
              </div>
            )}

            {tab === "financeiro" && (
              <div className="grid gap-2">
                <p className="text-[14px] font-semibold">Financeiro</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["Em caixa", "R$ 142.380", CircleDollarSign],
                    ["A receber · 30d", brl(pending.reduce((n, o) => n + o.value, 0) + 64200), ArrowUpRight],
                    ["A pagar · 30d", "R$ 48.900", ArrowDownRight],
                  ].map(([l, v, Icon]) => {
                    const I = Icon as typeof Wallet;
                    return (
                      <div key={l as string} className="rounded-2xl bg-white p-3 shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                        <I className="h-3.5 w-3.5 text-(--m-accent-ink)" />
                        <p className="mt-1 text-[9px] text-(--m-ink)/60">{l as string}</p>
                        <p className="truncate text-[12.5px] font-semibold tabular-nums">{v as string}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,42,67,0.07)]">
                  {ledger.map((l) => (
                    <div key={l.desc} className="flex items-center justify-between gap-2 border-b border-(--m-ink)/6 px-3 py-2 last:border-0">
                      <span className="min-w-0">
                        <span className="block truncate text-[10.5px] font-semibold">{l.desc}</span>
                        <span className="block text-[9px] text-(--m-ink)/60">via {l.via} · hoje</span>
                      </span>
                      <span className={`text-[10.5px] font-bold tabular-nums ${l.kind === "in" ? "text-emerald-700" : "text-rose-700"}`}>
                        {l.kind === "in" ? "+" : "−"} {brl(Math.abs(l.value))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </BrowserShell>
  );
}
