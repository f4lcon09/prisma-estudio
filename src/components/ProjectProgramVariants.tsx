"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Download,
  FileText,
  MapPin,
  MessageSquare,
  Plus,
  QrCode,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { ProjectVariantId } from "@/config/site";
import {
  AutomationProgramScreen,
  BrowserShell,
  SaasProgramScreen,
  SiteProgramScreen,
} from "@/components/RealMockups";

function RealEstateSiteScreen({ interactive = true }: { interactive?: boolean }) {
  const [cityFilter, setCityFilter] = useState<"Todos" | "Centro" | "Praia">("Todos");

  const listings = [
    { title: "Cobertura Duplex · 142m²", zone: "Centro", price: "R$ 890.000", beds: "3 suítes" },
    { title: "Apto Vista Mar · 98m²", zone: "Praia", price: "R$ 680.000", beds: "2 vagas" },
  ].filter((item) => cityFilter === "Todos" || item.zone === cityFilter);

  return (
    <BrowserShell url="horizonteimoveis.com.br">
      <div className="min-h-[310px] bg-gradient-to-b from-amber-50/50 via-white to-slate-50 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white">
              <Building2 className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold text-slate-900">Horizonte Imóveis</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-0.5">
            {(["Todos", "Centro", "Praia"] as const).map((zone) => (
              <button
                key={zone}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setCityFilter(zone)}
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold transition-colors ${
                  cityFilter === zone ? "bg-slate-900 text-white" : "text-slate-500"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-400">
          <Search className="h-3 w-3 text-amber-500" />
          <span>Buscar por bairro, condomínio ou código...</span>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {listings.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="flex h-16 items-end justify-between rounded-lg bg-gradient-to-br from-blue-600/90 via-indigo-600 to-amber-500/80 p-2 text-white">
                <span className="inline-flex items-center gap-1 rounded bg-slate-950/50 px-1.5 py-0.5 text-[8px] font-semibold">
                  <MapPin className="h-2.5 w-2.5" /> {item.zone}
                </span>
                <span className="font-tech text-[9px] font-bold">{item.beds}</span>
              </div>
              <p className="mt-2 text-[11px] font-bold text-slate-900">{item.title}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-tech text-xs font-extrabold text-blue-700">{item.price}</span>
                <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[9px] font-semibold text-white">
                  Agendar visita
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  );
}

function CatalogSiteScreen({ interactive = true }: { interactive?: boolean }) {
  const [count, setCount] = useState(2);

  return (
    <BrowserShell url="emporiocentral.com.br/pedido">
      <div className="min-h-[310px] bg-gradient-to-br from-white via-amber-50/35 to-blue-50/40 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white">
              <ShoppingBag className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold text-slate-900">Empório Central</span>
          </div>
          <span className="font-tech rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            Aberto agora · Pix/Cartão
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {[
            { name: "Combo Café Especial 500g", desc: "Moído na hora · Torra média", price: "R$ 64,00" },
            { name: "Kit Degustação Artesanal", desc: "3 pacotes · Frete grátis", price: "R$ 84,00" },
          ].map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2.5"
            >
              <div>
                <p className="text-[11px] font-bold text-slate-900">{product.name}</p>
                <p className="text-[9px] text-slate-500">{product.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-tech text-[11px] font-bold text-slate-900">{product.price}</span>
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setCount((c) => c + 1)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  aria-label={`Adicionar ${product.name}`}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950 px-3.5 py-2.5 text-white">
          <div>
            <p className="text-[9px] text-slate-400">Resumo do pedido</p>
            <p className="font-tech text-xs font-bold">
              {count} itens · R$ {(count * 74).toFixed(2).replace(".", ",")}
            </p>
          </div>
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-slate-950">
            Enviar no WhatsApp →
          </span>
        </div>
      </div>
    </BrowserShell>
  );
}

function ClientPortalScreen({ interactive = true }: { interactive?: boolean }) {
  const [filter, setFilter] = useState<"faturas" | "docs">("faturas");

  return (
    <BrowserShell url="cliente.prismaestudio.dev">
      <div className="min-h-[310px] bg-slate-50 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div>
            <p className="text-xs font-bold text-slate-900">Portal do Assinante · Grupo Vértice</p>
            <p className="text-[10px] text-slate-500">Plano Enterprise · Renovação ativa</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-slate-200/70 p-0.5">
            {(["faturas", "docs"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setFilter(tab)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                  filter === tab ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
                }`}
              >
                {tab === "faturas" ? "Faturas" : "Documentos"}
              </button>
            ))}
          </div>
        </div>

        {filter === "faturas" ? (
          <div className="mt-3 space-y-2">
            {[
              { ref: "Fatura #1042 · Nov/2026", due: "Vence 25/11", val: "R$ 1.850,00", paid: false },
              { ref: "Fatura #1019 · Out/2026", due: "Pago via Pix", val: "R$ 1.850,00", paid: true },
            ].map((inv) => (
              <div
                key={inv.ref}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-900">{inv.ref}</p>
                  <p className="text-[9px] text-slate-500">{inv.due}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-[11px] font-bold text-slate-900">{inv.val}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      inv.paid ? "bg-emerald-50 text-emerald-700" : "bg-blue-600 text-white"
                    }`}
                  >
                    {inv.paid ? "Quitado" : "Pagar Pix"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {["Contrato_Prestacao_2026.pdf", "Manual_API_Integracao.pdf"].map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5"
              >
                <span className="flex items-center gap-2 text-[11px] font-medium text-slate-800">
                  <FileText className="h-3.5 w-3.5 text-indigo-600" />
                  {doc}
                </span>
                <Download className="h-3.5 w-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-[10px]">
          <span className="font-semibold text-indigo-900">1 chamado técnico em andamento</span>
          <span className="font-tech text-indigo-700">SLA 2h</span>
        </div>
      </div>
    </BrowserShell>
  );
}

function TeamScheduleScreen({ interactive = true }: { interactive?: boolean }) {
  const [selectedDay, setSelectedDay] = useState<"Hoje" | "Amanhã">("Hoje");

  return (
    <BrowserShell url="agenda.prismaestudio.dev/equipe">
      <div className="min-h-[310px] bg-slate-50 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">Grade Operacional</span>
          </div>
          <div className="flex gap-1 rounded-lg bg-slate-200/70 p-0.5">
            {(["Hoje", "Amanhã"] as const).map((day) => (
              <button
                key={day}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setSelectedDay(day)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                  selectedDay === day ? "bg-indigo-600 text-white" : "text-slate-600"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {[
            { time: "09:00", title: "Dra. Camila · Avaliação", status: "Confirmado", color: "bg-emerald-50 text-emerald-700" },
            { time: "10:30", title: "Dr. Rafael · Retorno", status: "Em sala", color: "bg-blue-50 text-blue-700" },
            { time: "14:00", title: "Equipe Técnica · Instalação", status: selectedDay === "Hoje" ? "Confirmado" : "Disponível", color: "bg-amber-50 text-amber-700" },
          ].map((slot) => (
            <div
              key={slot.time}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-tech rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                  {slot.time}
                </span>
                <span className="text-[11px] font-semibold text-slate-900">{slot.title}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${slot.color}`}>
                {slot.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
          <span>Ocupação da agenda ({selectedDay})</span>
          <span className="font-tech font-bold text-indigo-700">86% preenchida</span>
        </div>
      </div>
    </BrowserShell>
  );
}

function PixBillingFlowScreen() {
  return (
    <BrowserShell url="flow.prismaestudio.dev/cobranca-pix">
      <div className="bg-canvas-dots min-h-[310px] bg-gradient-to-br from-emerald-50/40 via-slate-50 to-amber-50/40 p-4 text-left">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
          <span className="text-[11px] font-bold text-slate-900">Régua Pix Automática</span>
          <span className="font-tech rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            ● 312 envios/mês
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-amber-300 bg-white p-2.5 shadow-xs">
            <span className="text-[10px] font-bold text-amber-700">1. D-1 Vencimento</span>
            <p className="mt-1 text-[9px] text-slate-500">Detecta fatura aberta no ERP</p>
          </div>
          <div className="rounded-xl border border-blue-300 bg-white p-2.5 shadow-xs">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700">
              <QrCode className="h-3 w-3" /> 2. Gera Pix
            </span>
            <p className="mt-1 text-[9px] text-slate-500">Copia-e-cola único por cliente</p>
          </div>
          <div className="rounded-xl border border-emerald-400 bg-white p-2.5 shadow-xs">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" /> 3. Baixa Auto
            </span>
            <p className="mt-1 text-[9px] text-slate-500">Confirma e envia recibo</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-[9px] text-slate-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-tech">WEBHOOK PIX · 09:14:02</span>
            <span className="font-tech text-emerald-400">LIQUIDADO ✓</span>
          </div>
          <p className="font-tech mt-1.5 text-slate-100">
            Baixa automática #1042 (R$ 1.850,00) + recibo enviado no WhatsApp.
          </p>
        </div>
      </div>
    </BrowserShell>
  );
}

function DailyAiReportFlowScreen() {
  return (
    <BrowserShell url="flow.prismaestudio.dev/resumo-diario">
      <div className="min-h-[310px] bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Resumo Executivo IA · 08:00
          </span>
          <span className="font-tech text-[9px] font-semibold text-emerald-700">Diário automático</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[9px]">
          <div className="rounded-lg border border-slate-200 bg-white p-2">
            <span className="font-semibold text-slate-700">PostgreSQL</span>
            <p className="mt-0.5 text-slate-400">Vendas de ontem</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-2">
            <span className="font-semibold text-slate-700">Meta Ads</span>
            <p className="mt-0.5 text-slate-400">CPA &amp; cliques</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2">
            <span className="font-semibold text-emerald-800">Síntese IA</span>
            <p className="mt-0.5 text-emerald-700">Pronta às 08:00</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-emerald-200 bg-[#E7FCEB] p-3 text-slate-900">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900">
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Mensagem enviada no WhatsApp
            </span>
            <span className="font-tech inline-flex items-center gap-0.5 text-emerald-700">
              <TrendingUp className="h-3 w-3" /> +14%
            </span>
          </div>
          <p className="mt-1.5 text-[10px] leading-relaxed text-slate-800">
            Bom dia! Ontem fechamos <strong>11 pedidos (R$ 14.280)</strong>, custo por lead em R$ 9,40 e 2 faturas pendentes de retorno.
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-800">
            <Check className="h-3 w-3" /> Entregue para Diretoria
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function ProjectProgramVariant({
  variant,
  interactive = true,
}: {
  variant: ProjectVariantId;
  interactive?: boolean;
}) {
  switch (variant) {
    case "clinica":
      return <SiteProgramScreen interactive={interactive} />;
    case "imobiliaria":
      return <RealEstateSiteScreen interactive={interactive} />;
    case "catalogo":
      return <CatalogSiteScreen interactive={interactive} />;
    case "erp":
      return <SaasProgramScreen interactive={interactive} />;
    case "portal":
      return <ClientPortalScreen interactive={interactive} />;
    case "agenda":
      return <TeamScheduleScreen interactive={interactive} />;
    case "triagem":
      return <AutomationProgramScreen interactive={interactive} />;
    case "cobranca":
      return <PixBillingFlowScreen />;
    case "relatorio":
      return <DailyAiReportFlowScreen />;
  }
}
