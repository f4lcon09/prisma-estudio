"use client";

import {
  Activity,
  Bot,
  CheckCircle2,
  FileText,
  Home,
  Lock,
  MessageSquare,
  Settings,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import type { HeroModeId } from "@/config/site";
import { SiteClinicaInteractive } from "@/components/mockups/SitesMockups";
import { SistemaErpInteractive } from "@/components/mockups/SistemasMockups";
import { AutomacaoTriagemInteractive } from "@/components/mockups/AutomacoesMockups";

export function SiteProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <SiteClinicaInteractive interactive={interactive} />;
}

export function SaasProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <SistemaErpInteractive interactive={interactive} />;
}

export function AutomationProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <AutomacaoTriagemInteractive interactive={interactive} />;
}

export function MobileProgramMockup({ mode }: { mode: HeroModeId }) {
  return (
    <div className="relative w-[184px] select-none">
      {/* Left hardware buttons (Mute + Volume) */}
      <span
        aria-hidden="true"
        className="absolute -left-[2.5px] top-[66px] h-4 w-[3px] rounded-l-sm bg-slate-700"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[2.5px] top-[92px] h-7 w-[3px] rounded-l-sm bg-slate-700"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[2.5px] top-[126px] h-7 w-[3px] rounded-l-sm bg-slate-700"
      />
      {/* Right hardware button (Power) */}
      <span
        aria-hidden="true"
        className="absolute -right-[2.5px] top-[98px] h-10 w-[3px] rounded-r-sm bg-slate-700"
      />

      {/* Titanium outer frame */}
      <div className="rounded-[36px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-700 p-[2.5px] shadow-[0_28px_55px_-12px_rgba(15,23,42,0.45)]">
        {/* Deep OLED black glass bezel */}
        <div className="rounded-[33.5px] bg-[#090D16] p-[6.5px]">
          {/* Tall 19.5:9 smartphone display */}
          <div className="flex h-[346px] flex-col justify-between overflow-hidden rounded-[27px] bg-white">
            {/* iOS Status Bar + Dynamic Island */}
            <div className="flex items-center justify-between bg-white px-3.5 pb-1.5 pt-2.5 text-[9px] font-semibold text-slate-900">
              <span>09:41</span>
              <div
                className="flex h-[15px] w-[54px] items-center justify-end rounded-full bg-[#090D16] pr-1.5"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700 ring-1 ring-slate-600/60" />
              </div>
              <div className="flex items-center gap-1" aria-hidden="true">
                <Wifi className="h-2.5 w-2.5" />
                <span className="inline-block h-2 w-3.5 rounded-[2px] border border-slate-900 bg-slate-900" />
              </div>
            </div>

            {/* Tall Mode-specific App Screen */}
            <div className="flex-1 overflow-hidden">
              {mode === "sistemas" && (
                <div className="flex h-full flex-col justify-between p-3 text-left">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[8px] text-slate-400">Resumo diário</p>
                        <p className="text-[11px] font-bold text-slate-900">Prisma Mobile</p>
                      </div>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-700">
                        LA
                      </span>
                    </div>

                    <div className="mt-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 text-white">
                      <p className="text-[8px] text-blue-100">Recebido hoje</p>
                      <p className="font-tech mt-0.5 text-sm font-bold">R$ 4.820,00</p>
                      <p className="mt-1 text-[8px] text-amber-300">▲ 3 pagamentos Pix</p>
                    </div>

                    <div className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2">
                      <p className="text-[9px] font-semibold text-slate-700">Pedidos na semana</p>
                      <div className="mt-2 flex h-12 items-end justify-between gap-1 px-0.5">
                        {[40, 65, 52, 85, 70, 95, 78].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-t ${i === 5 ? "bg-blue-600" : "bg-blue-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 px-2 py-1.5 text-[8.5px] font-medium text-emerald-800">
                      ● Pix confirmado · R$ 2.400
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-[8.5px] font-medium text-slate-600">
                      ● Contrato Studio Atlas assinado
                    </div>
                  </div>
                </div>
              )}

              {mode === "sites" && (
                <div className="flex h-full flex-col justify-between bg-gradient-to-b from-amber-50/60 via-white to-blue-50/50 p-2.5 text-left">
                  <div>
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

                    <div className="mt-2.5 rounded-xl border border-blue-100 bg-white p-2.5 shadow-2xs">
                      <p className="text-[10px] font-extrabold leading-tight text-slate-900">
                        Consulta confirmada em 1 minuto.
                      </p>
                      <p className="mt-1 text-[8px] leading-snug text-slate-500">
                        Versão mobile leve, responsiva e pronta para converter.
                      </p>
                      <div className="mt-2.5 grid grid-cols-2 gap-1 text-center text-[8px]">
                        <span className="font-tech rounded bg-slate-100 py-1 font-semibold text-slate-700">
                          09:30
                        </span>
                        <span className="font-tech rounded bg-blue-600 py-1 font-semibold text-white">
                          14:30 ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-lg border border-slate-100 bg-white/90 px-2.5 py-1.5 text-[8.5px] text-slate-600">
                      ✓ Sem fila · Confirmação imediata
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2 text-center text-[9px] font-semibold text-white shadow-sm">
                      Agendar pelo WhatsApp
                    </div>
                  </div>
                </div>
              )}

              {mode === "automacoes" && (
                <div className="flex h-full flex-col justify-between bg-[#EFEAE2] p-2.5 text-left">
                  <div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#075E54] px-2 py-1.5 text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-slate-900">
                        IA
                      </span>
                      <div>
                        <p className="text-[9px] font-bold leading-none">Assistente Prisma</p>
                        <p className="text-[7.5px] text-emerald-200">online agora</p>
                      </div>
                    </div>

                    <div className="mt-2.5 space-y-2 text-[8.5px]">
                      <div className="max-w-[88%] rounded-lg bg-white p-2 text-slate-800 shadow-2xs">
                        Olá! Preciso de um sistema para pedidos.
                      </div>
                      <div className="ml-auto max-w-[90%] rounded-lg bg-[#D9FDD3] p-2 text-slate-800 shadow-2xs">
                        Perfeito! Registrei sua demanda no CRM (#482).
                      </div>
                      <div className="max-w-[84%] rounded-lg bg-white p-2 text-slate-800 shadow-2xs">
                        Ótimo, posso ver a prévia?
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="rounded-md bg-blue-600/95 px-2 py-1 text-center text-[8px] font-semibold text-white">
                      ✓ Lead qualificado · Score 94
                    </div>
                    <div className="rounded-full bg-white px-2.5 py-1 text-[8px] text-slate-400">
                      Mensagem automática ativa...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation + iOS Home Indicator */}
            <div className="border-t border-slate-100 bg-white pt-1.5">
              <div className="flex items-center justify-around px-2 pb-1.5 text-slate-400">
                <Home className="h-3 w-3 text-blue-600" />
                <Activity className="h-3 w-3" />
                <FileText className="h-3 w-3" />
                <Settings className="h-3 w-3" />
              </div>
              <div className="mx-auto mb-1.5 h-[3.5px] w-16 rounded-full bg-slate-900/80" aria-hidden="true" />
            </div>
          </div>
        </div>
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
