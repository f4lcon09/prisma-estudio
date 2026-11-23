"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  FileText,
  Home,
  LifeBuoy,
  MessageSquare,
  QrCode,
  Search,
  Send,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type Tab = "inicio" | "faturas" | "chamados" | "documentos";

const nav: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "faturas", label: "Faturas", icon: CreditCard },
  { id: "chamados", label: "Chamados", icon: LifeBuoy },
  { id: "documentos", label: "Documentos", icon: FileText },
];

const invoices = [
  { id: "1042", ref: "Novembro/2026", due: "25/11/2026", value: "R$ 1.850,00" },
  { id: "1019", ref: "Outubro/2026", due: "25/10/2026", value: "R$ 1.850,00", paid: "Pago via Pix em 24/10" },
  { id: "0997", ref: "Setembro/2026", due: "25/09/2026", value: "R$ 1.850,00", paid: "Pago via boleto em 25/09" },
];

const docs = [
  ["Contrato de prestação de serviços", "PDF · 312 KB · assinado em 03/03/2026"],
  ["Aditivo · módulo financeiro", "PDF · 128 KB · assinado em 12/08/2026"],
  ["Nota fiscal nº 4.812", "XML + PDF · outubro/2026"],
  ["Relatório de uso · trimestre 3", "PDF · 1,1 MB"],
];

export function SistemaPortalInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Grupo Vértice");
  const [tab, setTab] = useState<Tab>("inicio");
  const [pixOpen, setPixOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ticketText, setTicketText] = useState("");
  const [tickets, setTickets] = useState([
    { id: 318, title: "Liberar acesso para novo usuário", status: "Em andamento", last: "Equipe: acesso criado, aguardando seu primeiro login." },
    { id: 301, title: "Relatório de vendas por vendedor", status: "Resolvido", last: "Equipe: relatório publicado na aba Documentos." },
  ]);

  function go(t: Tab) {
    if (interactive) setTab(t);
  }

  function addTicket(e: React.FormEvent) {
    e.preventDefault();
    if (!interactive || !ticketText.trim()) return;
    setTickets((prev) => [{ id: 319 + prev.length - 2, title: ticketText.trim(), status: "Aberto", last: "Recebemos seu chamado. Resposta em até 4 horas úteis." }, ...prev]);
    setTicketText("");
  }

  const openInvoice = (
    <div className="rounded-xl border border-(--m-ink)/10 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-(--m-ink)/65">Fatura #1042 · Novembro</p>
          <p className="text-[18px] font-extrabold">R$ 1.850,00</p>
          <p className="text-[9.5px] text-(--m-ink)/65">{paid ? "Pago agora via Pix" : "Vence em 25/11/2026"}</p>
        </div>
        {paid ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            <CheckCircle2 className="h-3 w-3" /> Pago
          </span>
        ) : (
          <button
            type="button"
            disabled={!interactive}
            onClick={() => setPixOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full bg-(--m-accent) px-3 py-1.5 text-[10px] font-bold text-(--m-on-accent)"
          >
            <QrCode className="h-3 w-3" /> {pixOpen ? "Fechar Pix" : "Pagar com Pix"}
          </button>
        )}
      </div>
      {pixOpen && !paid && (
        <div className="mt-3 grid gap-3 border-t border-(--m-ink)/8 pt-3 sm:grid-cols-[auto_1fr]">
          <svg viewBox="0 0 21 21" className="h-20 w-20 rounded-md bg-white p-1 ring-1 ring-(--m-ink)/10" aria-label="QR code de exemplo">
            {Array.from({ length: 21 * 21 }).map((_, i) => {
              const x = i % 21, y = Math.floor(i / 21);
              const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
              const ring = finder && (x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6 || (x % 14 > 1 && x % 14 < 5 && y % 14 > 1 && y % 14 < 5));
              const on = finder ? ring : (x * 7 + y * 13 + x * y) % 3 === 0;
              return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" className="text-(--m-ink)" /> : null;
            })}
          </svg>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold">Pix copia e cola</p>
            <p className="mt-1 truncate rounded-md bg-(--m-bg) px-2 py-1 font-mono text-[9px] text-(--m-ink)/70">
              00020126580014BR.GOV.BCB.PIX0136a1f4…5204000053039865406185000
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button type="button" disabled={!interactive} onClick={() => setCopied(true)} className="inline-flex items-center gap-1 rounded-md border border-(--m-ink)/15 px-2 py-1 text-[9.5px] font-semibold">
                <Copy className="h-2.5 w-2.5" /> {copied ? "Copiado" : "Copiar código"}
              </button>
              <button
                type="button"
                disabled={!interactive}
                onClick={() => {
                  setPaid(true);
                  setPixOpen(false);
                }}
                className="rounded-md bg-(--m-ink) px-2 py-1 text-[9.5px] font-semibold text-white"
              >
                Simular pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <BrowserShell url="cliente.prismaestudio.dev" palette="portal">
      <div className="grid min-h-(--mock-h,520px) grid-cols-[150px_1fr] bg-(--m-bg) text-left text-(--m-ink)">
        {/* Menu lateral */}
        <aside className="flex flex-col justify-between bg-(--m-ink) p-3 text-white">
          <div>
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-(--m-accent) text-[10px] font-extrabold text-(--m-on-accent)">
                {brand.slice(0, 1).toUpperCase()}
              </span>
              <span className="truncate text-[11px] font-bold">{brand}</span>
            </div>
            <nav className="mt-4 grid gap-0.5">
              {nav.map((n) => {
                const Icon = n.icon;
                const active = tab === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => go(n.id)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10.5px] font-medium ${active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8"}`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {n.label}
                    {n.id === "faturas" && !paid && <span className="ml-auto rounded-full bg-(--m-accent) px-1.5 text-[8.5px] font-bold text-(--m-on-accent)">1</span>}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="rounded-lg bg-white/8 p-2 text-[9px] text-white/70">
            <p className="font-semibold text-white">Plano Empresa</p>
            Renova em 03/2027
          </div>
        </aside>

        <div className="min-w-0">
          {/* Barra superior */}
          <div className="flex items-center justify-between gap-2 border-b border-(--m-ink)/8 bg-white px-4 py-2">
            <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-(--m-bg) px-2 py-1 text-[9.5px] text-(--m-ink)/65">
              <Search className="h-3 w-3" /> Buscar faturas, contratos…
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-(--m-ink)/60" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--m-accent) text-[9px] font-bold text-(--m-on-accent)">MS</span>
            </div>
          </div>

          <div className="p-4">
            {tab === "inicio" && (
              <div className="grid gap-3">
                <div>
                  <p className="text-[15px] font-extrabold">Olá, Marina</p>
                  <p className="text-[10px] text-(--m-ink)/65">Tudo da sua conta {brand} em um lugar.</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["Próxima fatura", paid ? "Em dia" : "R$ 1.850", paid ? "nada pendente" : "vence 25/11"],
                    ["Chamados abertos", String(tickets.filter((t) => t.status !== "Resolvido").length), "resposta em 4h"],
                    ["Usuários ativos", "12 de 15", "plano Empresa"],
                  ].map(([l, v, d]) => (
                    <div key={l} className="rounded-xl bg-white p-2.5 shadow-2xs">
                      <p className="text-[9px] text-(--m-ink)/60">{l}</p>
                      <p className="text-[14px] font-extrabold">{v}</p>
                      <p className="text-[9px] text-(--m-ink)/65">{d}</p>
                    </div>
                  ))}
                </div>
                {openInvoice}
                <div className="rounded-xl bg-white p-3 shadow-2xs">
                  <p className="text-[10.5px] font-bold">Atividade recente</p>
                  <ul className="mt-2 grid gap-1.5 text-[10px] text-(--m-ink)/75">
                    <li>• Nota fiscal de outubro disponível em Documentos</li>
                    <li>• Chamado #301 resolvido pela equipe</li>
                    <li>• Pagamento de outubro confirmado</li>
                  </ul>
                </div>
              </div>
            )}

            {tab === "faturas" && (
              <div className="grid gap-2.5">
                <p className="text-[14px] font-extrabold">Faturas</p>
                {openInvoice}
                <div className="overflow-hidden rounded-xl bg-white shadow-2xs">
                  {invoices.slice(1).map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between gap-2 border-b border-(--m-ink)/6 px-3 py-2 last:border-0">
                      <div>
                        <p className="text-[10.5px] font-bold">#{inv.id} · {inv.ref}</p>
                        <p className="text-[9px] text-(--m-ink)/60">{inv.paid}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10.5px] font-bold">{inv.value}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Pago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "chamados" && (
              <div className="grid gap-2.5">
                <p className="text-[14px] font-extrabold">Chamados</p>
                <form onSubmit={addTicket} className="flex gap-1.5">
                  <input
                    value={ticketText}
                    disabled={!interactive}
                    onChange={(e) => setTicketText(e.target.value)}
                    placeholder="Descreva o que você precisa…"
                    className="min-w-0 flex-1 rounded-lg border border-(--m-ink)/12 bg-white px-2.5 py-1.5 text-[10px] placeholder:text-(--m-ink)/45 focus:border-(--m-accent) focus:outline-none"
                  />
                  <button type="submit" disabled={!interactive} className="inline-flex items-center gap-1 rounded-lg bg-(--m-accent) px-3 text-[10px] font-bold text-(--m-on-accent)">
                    <Send className="h-3 w-3" /> Abrir
                  </button>
                </form>
                {tickets.map((t) => (
                  <div key={t.id} className="rounded-xl bg-white p-2.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10.5px] font-bold">#{t.id} · {t.title}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          t.status === "Resolvido" ? "bg-emerald-50 text-emerald-700" : t.status === "Aberto" ? "bg-(--m-accent)/15 text-(--m-accent-ink)" : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <p className="mt-1 flex items-start gap-1 text-[9.5px] text-(--m-ink)/65">
                      <MessageSquare className="mt-0.5 h-2.5 w-2.5 shrink-0" /> {t.last}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "documentos" && (
              <div className="grid gap-2.5">
                <p className="text-[14px] font-extrabold">Documentos</p>
                <div className="overflow-hidden rounded-xl bg-white shadow-2xs">
                  {docs.map(([n, d]) => (
                    <div key={n} className="flex items-center justify-between gap-2 border-b border-(--m-ink)/6 px-3 py-2.5 last:border-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-(--m-accent-ink)" />
                        <div className="min-w-0">
                          <p className="truncate text-[10.5px] font-bold">{n}</p>
                          <p className="text-[9px] text-(--m-ink)/60">{d}</p>
                        </div>
                      </div>
                      <Download className="h-3.5 w-3.5 shrink-0 text-(--m-ink)/65" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
