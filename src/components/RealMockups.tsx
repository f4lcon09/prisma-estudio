"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Bot,
  FileText,
  Home,
  LayoutGrid,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  User,
  Wifi,
} from "lucide-react";
import type { HeroModeId } from "@/config/site";
import { SiteModaVendasInteractive } from "@/components/mockups/SitesMockups";
import { SistemaErpInteractive } from "@/components/mockups/SistemasMockups";
import { AutomacaoTriagemInteractive } from "@/components/mockups/AutomacoesMockups";
import { mockupPalettes } from "@/components/mockups/palettes";

export function SiteProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <SiteModaVendasInteractive interactive={interactive} />;
}

export function SaasProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <SistemaErpInteractive interactive={interactive} />;
}

export function AutomationProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <AutomacaoTriagemInteractive interactive={interactive} />;
}

/* ------------------------------------------------------------------ */
/* Celular: o app da mesma empresa do mockup central                   */
/* ------------------------------------------------------------------ */

const moda = mockupPalettes.moda;
const erp = mockupPalettes.erp;
const tri = mockupPalettes.triagem;

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pb-1 pt-2.5 text-[9px] font-semibold text-[#0B0C10]">
      <span>9:41</span>
      <span className="h-[15px] w-[56px] rounded-full bg-black" aria-hidden="true" />
      <span className="flex items-center gap-1" aria-hidden="true">
        <Wifi className="h-2.5 w-2.5" />
        <span className="inline-block h-2 w-3.5 rounded-[2px] bg-[#0B0C10]" />
      </span>
    </div>
  );
}

function TabBar({ color, icons }: { color: string; icons: (typeof Home)[] }) {
  return (
    <div className="mt-auto">
      <div className="flex items-center justify-around px-3 pb-1 pt-2">
        {icons.map((Icon, i) => (
          <Icon key={i} className="h-3 w-3" style={{ color: i === 0 ? color : "rgba(0,0,0,.35)" }} />
        ))}
      </div>
      <div className="mx-auto mb-1.5 h-[3.5px] w-16 rounded-full bg-black/80" aria-hidden="true" />
    </div>
  );
}

function SitesPhone() {
  return (
    <div className="flex h-full flex-col" style={{ background: moda.bg, color: moda.ink }}>
      <StatusBar />
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="font-editorial text-[10px] font-semibold uppercase tracking-[0.22em]">Atelier Verso</span>
        <ShoppingBag className="h-3 w-3" />
      </div>
      <div className="relative mx-2 h-[176px] overflow-hidden rounded-2xl">
        <Image src="/fashion/look-blazer.jpg" alt="" fill sizes="170px" className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 text-white">
          <p className="font-editorial text-[12px] font-semibold leading-tight">Blazer Linho Cru</p>
          <p className="text-[8.5px] opacity-85">R$ 389 · R$ 370 no Pix</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1 px-2 text-center text-[8px] font-semibold">
        {["PP", "P", "M", "G", "GG"].map((s) => (
          <span key={s} className="rounded-md py-1" style={s === "M" ? { background: moda.ink, color: "#fff" } : { background: "#fff" }}>
            {s}
          </span>
        ))}
      </div>
      <div className="mx-2 mt-2 rounded-xl py-2 text-center text-[8.5px] font-bold uppercase tracking-[0.14em] text-white" style={{ background: moda.ink }}>
        Adicionar à sacola
      </div>
      <TabBar color={moda.accent} icons={[Home, Search, ShoppingBag, User]} />
    </div>
  );
}

function SistemasPhone() {
  const bars = [40, 55, 48, 70, 62, 84, 76];
  return (
    <div className="flex h-full flex-col" style={{ background: erp.bg, color: erp.ink }}>
      <StatusBar />
      <div className="flex items-center justify-between px-3 pb-1.5">
        <div>
          <p className="text-[8px] opacity-60">Vértice · terça</p>
          <p className="text-[13px] font-bold tracking-tight">Hoje</p>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-[8px] font-bold">LA</span>
      </div>
      <div className="mx-2 rounded-2xl bg-white p-2.5 shadow-[0_1px_3px_rgba(16,42,67,0.08)]">
        <p className="text-[8px] opacity-60">Vendido hoje</p>
        <p className="text-[18px] font-semibold tracking-tight tabular-nums">R$ 31.480</p>
        <p className="text-[8px] font-semibold" style={{ color: erp.accentInk }}>
          ↗ 12,4% sobre terça passada
        </p>
        <div className="mt-2 flex h-9 items-end gap-1">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === bars.length - 1 ? erp.accent : "rgba(16,42,67,.12)" }} />
          ))}
        </div>
      </div>
      <p className="mt-2 px-3 text-[8.5px] font-bold">Pedidos recentes</p>
      <div className="mx-2 mt-1 overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,42,67,0.08)]">
        {[
          ["MB", "Mercado Bom Preço", "R$ 12.480", "Pendente", "bg-amber-50 text-amber-800"],
          ["TF", "Padaria Trigo Fino", "R$ 3.260", "Pago", "bg-emerald-50 text-emerald-700"],
          ["SJ", "Empório São Jorge", "R$ 5.890", "Enviado", "bg-sky-50 text-sky-700"],
        ].map(([i, n, v, st, tone]) => (
          <div key={n} className="flex items-center gap-1.5 border-b border-black/5 px-2 py-1.5 last:border-0">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/5 text-[6.5px] font-bold">{i}</span>
            <span className="min-w-0 flex-1 truncate text-[8px] font-semibold">{n}</span>
            <span className="text-[8px] font-semibold tabular-nums">{v}</span>
            <span className={`rounded-full px-1 text-[6.5px] font-bold ${tone}`}>{st}</span>
          </div>
        ))}
      </div>
      <TabBar color={erp.accentInk} icons={[LayoutGrid, ShoppingBag, User, FileText]} />
    </div>
  );
}

function AutomacoesPhone() {
  return (
    <div className="flex h-full flex-col" style={{ background: tri.bg, color: tri.ink }}>
      <StatusBar />
      <p className="px-3 text-[8px] opacity-60">CRM · celular da Carla, vendas</p>
      <div className="mx-2 mt-1.5 rounded-2xl bg-white/85 p-2 shadow-sm backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-md text-white" style={{ background: tri.ink }}>
            <Bot className="h-2.5 w-2.5" />
          </span>
          <span className="text-[7.5px] font-semibold opacity-70">TRIAGEM IA · agora</span>
        </div>
        <p className="mt-1 text-[9px] font-bold leading-tight">Lead quente para você</p>
        <p className="text-[8px] leading-snug opacity-80">Marcos, Distribuidora MK, quer um sistema de pedidos.</p>
      </div>
      <div className="mx-2 mt-2 rounded-2xl bg-white p-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: tri.ink }}>
            M
          </span>
          <div className="min-w-0">
            <p className="text-[9.5px] font-bold">Marcos</p>
            <p className="truncate text-[7.5px] opacity-65">Distribuidora MK · Campinas</p>
          </div>
          <span className="ml-auto rounded-full px-1.5 py-0.5 text-[7.5px] font-bold" style={{ background: tri.accent, color: tri.onAccent }}>
            96
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[7.5px]">
          {[
            ["Intenção", "Sistema"],
            ["Orçamento", "R$ 10–20 mil"],
            ["Equipe", "6 pessoas"],
            ["Volume", "80 pedidos/dia"],
          ].map(([k, v]) => (
            <span key={k} className="rounded-md px-1.5 py-1" style={{ background: tri.bg }}>
              <span className="block opacity-60">{k}</span>
              <span className="block font-bold">{v}</span>
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[8px] font-bold">
          <span className="flex items-center justify-center gap-1 rounded-lg bg-[#15803D] py-1.5 text-white">
            <MessageCircle className="h-2.5 w-2.5" /> WhatsApp
          </span>
          <span className="flex items-center justify-center gap-1 rounded-lg border border-black/12 py-1.5">
            <Phone className="h-2.5 w-2.5" /> Ligar
          </span>
        </div>
      </div>
      <TabBar color={tri.accentInk} icons={[Home, MessageCircle, LayoutGrid, User]} />
    </div>
  );
}

export function MobileProgramMockup({ mode }: { mode: HeroModeId }) {
  return (
    <div className="relative w-[184px] select-none">
      {/* moldura fina de metal escuro */}
      <div className="rounded-[38px] bg-gradient-to-b from-[#3A3B40] via-[#1B1C20] to-[#2B2C31] p-[2px] shadow-[0_30px_60px_-18px_rgba(0,0,0,0.45)]">
        <div className="rounded-[36px] bg-black p-[5px]">
          <div className="h-[352px] overflow-hidden rounded-[31px]">
            {mode === "sites" && <SitesPhone />}
            {mode === "sistemas" && <SistemasPhone />}
            {mode === "automacoes" && <AutomacoesPhone />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Notificações em vidro no lugar do antigo cartão de métricas         */
/* ------------------------------------------------------------------ */

const notifications: Record<HeroModeId, { app: string; icon: typeof Bell; tone: string; title: string; body: string; when: string }[]> = {
  sites: [
    { app: "Atelier Verso", icon: ShoppingBag, tone: moda.accent, title: "Novo pedido · R$ 370 no Pix", body: "Blazer Linho Cru, tam M. Envio hoje.", when: "agora" },
    { app: "Atelier Verso", icon: BadgeCheck, tone: "#16794A", title: "Conversão de hoje: 6,8%", body: "142 pessoas na loja agora.", when: "5 min" },
  ],
  sistemas: [
    { app: "Vértice", icon: ArrowUpRight, tone: erp.accentInk, title: "Pix recebido · R$ 18.320", body: "Rede Super Já, pedido #8418. Baixa feita.", when: "agora" },
    { app: "Vértice", icon: FileText, tone: erp.ink, title: "NF-e 4.812 emitida", body: "Enviada ao cliente por e-mail.", when: "2 min" },
  ],
  automacoes: [
    { app: "Triagem IA", icon: Bot, tone: tri.ink, title: "Lead quente · score 96", body: "Marcos, Distribuidora MK. Card criado.", when: "agora" },
    { app: "CRM", icon: LayoutGrid, tone: tri.accentInk, title: "Carla foi avisada", body: "Retorno marcado para 14h.", when: "1 min" },
  ],
};

export function TelemetryCardMockup({ mode }: { mode: HeroModeId }) {
  return (
    <div className="grid w-[236px] gap-2 text-left">
      {notifications[mode].map((n, i) => {
        const Icon = n.icon;
        return (
          <div
            key={n.title}
            className={`rounded-[20px] border border-(--glass-border) bg-(--glass) p-2.5 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150 ${
              i === 1 ? "mx-2 opacity-90" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] text-white" style={{ background: n.tone }}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[10px] font-semibold uppercase tracking-wide text-(--fg-2)">{n.app}</span>
              <span className="text-[10px] text-(--fg-2)">{n.when}</span>
            </div>
            <p className="mt-1.5 text-[12px] font-semibold leading-tight text-(--fg)">{n.title}</p>
            <p className="text-[11px] leading-snug text-(--fg-2)">{n.body}</p>
          </div>
        );
      })}
    </div>
  );
}
