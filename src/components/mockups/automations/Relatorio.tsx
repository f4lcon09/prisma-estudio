"use client";

import { useState } from "react";
import { BarChart3, Clock, Database, Megaphone, MessageCircle, Sparkles, Wallet } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type Tone = "direto" | "detalhado";

const week = [
  ["Qua", 6.1],
  ["Qui", 7.4],
  ["Sex", 9.8],
  ["Sáb", 11.2],
  ["Dom", 5.3],
  ["Seg", 6.9],
  ["Ter", 8.6],
] as const;

export function AutomacaoRelatorioInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Resumo Executivo IA · 08:00", (n) => `${n} · Resumo IA 08:00`);
  const [tone, setTone] = useState<Tone>("direto");
  const [ads, setAds] = useState(true);
  const [cash, setCash] = useState(true);
  const max = Math.max(...week.map(([, v]) => v));

  const sources = [
    { key: "sales", label: "Vendas da loja", sub: "Banco de dados · 312 pedidos", icon: Database, on: true, toggle: undefined },
    { key: "ads", label: "Anúncios", sub: "Meta + Google Ads", icon: Megaphone, on: ads, toggle: () => setAds((v) => !v) },
    { key: "cash", label: "Caixa do dia", sub: "Planilha do financeiro", icon: Wallet, on: cash, toggle: () => setCash((v) => !v) },
  ];

  return (
    <BrowserShell url="prisma.estudio/modelos/resumo-diario" palette="relatorio">
      <div className="grid min-h-[min(var(--mock-h,520px),520px)] gap-2.5 bg-(--m-bg) p-3 text-left text-(--m-ink) sm:grid-cols-[0.9fr_1.1fr]">
        {/* Configuração */}
        <div className="grid content-start gap-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-(--m-ink) text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11.5px] font-extrabold">{brand}</span>
          </div>

          <div className="rounded-xl bg-white p-2.5 shadow-2xs">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">Fontes de dados</p>
            <div className="mt-1.5 grid gap-1">
              {sources.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.key}
                    type="button"
                    disabled={!interactive || !s.toggle}
                    onClick={() => s.toggle?.()}
                    className={`flex items-center gap-2 rounded-lg border p-1.5 text-left ${s.on ? "border-(--m-ink)/20 bg-(--m-bg)" : "border-dashed border-(--m-ink)/15 opacity-60"}`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-(--m-accent-ink)" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold">{s.label}</span>
                      <span className="block text-[9px] text-(--m-ink)/60">{s.sub}</span>
                    </span>
                    <span className={`relative h-3.5 w-6 shrink-0 rounded-full ${s.on ? "bg-(--m-ink)" : "bg-(--m-ink)/20"}`}>
                      <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${s.on ? "left-3" : "left-0.5"}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-white p-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">Estilo do resumo</p>
              <span className="inline-flex items-center gap-1 text-[9px] text-(--m-ink)/60">
                <Clock className="h-2.5 w-2.5" /> todo dia às 08:00
              </span>
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-lg bg-(--m-bg) p-0.5">
              {(["direto", "detalhado"] as Tone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setTone(t)}
                  className={`rounded-md py-1 text-[10px] font-semibold capitalize ${tone === t ? "bg-(--m-ink) text-white" : "text-(--m-ink)/65"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-2.5 shadow-2xs">
            <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-(--m-ink)/65">
              <BarChart3 className="h-3 w-3" /> Vendas · 7 dias (R$ mil)
            </p>
            <div className="mt-2 flex h-16 items-end gap-1.5">
              {week.map(([d, v], i) => (
                <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                  <div style={{ height: `${(v / max) * 100}%` }} className={`w-full rounded-t ${i === week.length - 1 ? "bg-(--m-accent)" : "bg-(--m-ink)/18"}`} />
                  <span className="text-[8px] text-(--m-ink)/65">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mensagem entregue */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-[#ECE5DD] shadow-2xs">
          <div className="flex items-center gap-1.5 bg-(--m-ink) px-2.5 py-1.5 text-white">
            <MessageCircle className="h-3 w-3" />
            <span className="text-[10px] font-bold">Resumo diário · para: Diretoria</span>
          </div>
          <div className="flex-1 p-2.5">
            <div className="ml-auto max-w-[96%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-2.5 py-2 text-[10px] leading-relaxed shadow-2xs">
              <p className="font-bold">☀️ Bom dia! Resumo de ontem (terça):</p>
              <p className="mt-1">
                • Vendas: <strong>R$ 8.640</strong> em 41 pedidos (+25% vs. segunda)
              </p>
              {tone === "detalhado" && <p>• Ticket médio: R$ 210,73 · mais vendido: Kit Café Especial</p>}
              {ads && (
                <p>
                  • Anúncios: R$ 620 investidos, retorno de <strong>6,1×</strong>
                  {tone === "detalhado" ? " · melhor campanha: Remarketing Instagram" : ""}
                </p>
              )}
              {cash && <p>• Caixa: saldo de <strong>R$ 23.410</strong>, 3 boletos vencem hoje</p>}
              <div className="mt-1.5 rounded-md border-l-[3px] border-(--m-accent) bg-white/70 px-2 py-1">
                <p className="text-[9.5px] font-bold">Insight do dia</p>
                <p className="text-[9.5px]">
                  {ads
                    ? "O remarketing trouxe 38% das vendas com 20% da verba. Vale aumentar o orçamento dele hoje."
                    : "Terça vendeu 25% a mais que segunda. Os pedidos se concentraram entre 19h e 22h."}
                </p>
              </div>
              <p className="mt-1 text-right text-[8.5px] text-(--m-ink)/65">08:00 ✓✓</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
