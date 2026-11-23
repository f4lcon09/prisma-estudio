"use client";

import Image from "next/image";
import {
  Activity,
  Bot,
  CheckCircle2,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import type { HeroModeId } from "@/config/site";
import { SiteModaVendasInteractive } from "@/components/mockups/SitesMockups";
import { SistemaErpInteractive } from "@/components/mockups/SistemasMockups";
import { AutomacaoTriagemInteractive } from "@/components/mockups/AutomacoesMockups";

export function SiteProgramScreen({ interactive = true }: { interactive?: boolean }) {
  return <SiteModaVendasInteractive interactive={interactive} />;
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
                        <p className="text-[8px] text-[#102A43]/55">Resumo diário</p>
                        <p className="text-[11px] font-bold text-[#102A43]">Prisma Mobile</p>
                      </div>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00A86B]/12 text-[9px] font-bold text-[#008051]">
                        LA
                      </span>
                    </div>

                    <div className="mt-2.5 rounded-xl bg-[#102A43] p-2.5 text-white">
                      <p className="text-[8px] text-white/70">Recebido hoje</p>
                      <p className="font-tech mt-0.5 text-sm font-bold">R$ 4.820,00</p>
                      <p className="mt-1 text-[8px] text-[#5FD3A5]">▲ 3 pagamentos Pix</p>
                    </div>

                    <div className="mt-2.5 rounded-xl border border-[#102A43]/8 bg-[#F5F7FA] p-2">
                      <p className="text-[9px] font-semibold text-[#102A43]">Pedidos na semana</p>
                      <div className="mt-2 flex h-12 items-end justify-between gap-1 px-0.5">
                        {[40, 65, 52, 85, 70, 95, 78].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-t ${i === 5 ? "bg-[#00A86B]" : "bg-[#102A43]/15"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 px-2 py-1.5 text-[8.5px] font-medium text-emerald-800">
                      ● Pix confirmado · R$ 2.400
                    </div>
                    <div className="rounded-lg border border-[#102A43]/8 bg-[#F5F7FA] px-2 py-1.5 text-[8.5px] font-medium text-[#102A43]/75">
                      ● Contrato Studio Atlas assinado
                    </div>
                  </div>
                </div>
              )}

              {mode === "sites" && (
                <div className="flex h-full flex-col justify-between bg-[#F3EEE7] text-left text-[#2B2724]">
                  {/* Full-bleed Lookbook Photo Half */}
                  <div className="relative h-[182px] w-full overflow-hidden bg-[#DFD6C5]">
                    <Image
                      src="/fashion/look-blazer.jpg"
                      alt="Atelier Verso Lookbook"
                      fill
                      sizes="180px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-[#2B2724]/75 to-transparent px-2.5 pb-3 pt-2 text-[#F3EEE7]">
                      <span className="font-editorial text-[9px] font-semibold uppercase tracking-[0.2em]">
                        Atelier Verso
                      </span>
                      <span className="font-tech rounded bg-[#8C4A2F] px-1.5 py-0.5 text-[7px] font-bold text-white">
                        DROP 04
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2724]/90 via-[#2B2724]/45 to-transparent px-2.5 pb-2 pt-5 text-[#F3EEE7]">
                      <p className="font-editorial text-[12px] font-semibold leading-tight">
                        Blazer Linho Cru
                      </p>
                      <div className="mt-0.5 flex items-center justify-between text-[8px]">
                        <span className="font-tech font-bold text-[#F3EEE7]">R$ 389,00</span>
                        <span className="text-[#E7C3A8]">R$ 370 Pix</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick-Buy Bottom Sheet */}
                  <div className="flex flex-1 flex-col justify-between p-2.5">
                    <div className="grid grid-cols-3 gap-1 text-center text-[8px]">
                      <span className="font-tech rounded border border-[#2B2724]/15 bg-white py-1 font-semibold text-[#2B2724]">
                        P
                      </span>
                      <span className="font-tech rounded bg-[#2B2724] py-1 font-semibold text-[#F3EEE7]">
                        M ✓
                      </span>
                      <span className="font-tech rounded border border-[#2B2724]/15 bg-white py-1 font-semibold text-[#2B2724]">
                        G
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#2B2724] py-2 text-center text-[8.5px] font-bold uppercase tracking-[0.12em] text-[#F3EEE7] shadow-sm">
                      Adicionar à sacola
                    </div>
                  </div>
                </div>
              )}

              {mode === "automacoes" && (
                <div className="flex h-full flex-col justify-between bg-[#F2F7F4] p-2.5 text-left">
                  <div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#0B3D2E] px-2 py-1.5 text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A5C] text-[9px] font-bold text-[#0B3D2E]">
                        IA
                      </span>
                      <div>
                        <p className="text-[9px] font-bold leading-none">Assistente Prisma</p>
                        <p className="text-[7.5px] text-white/70">online agora</p>
                      </div>
                    </div>

                    <div className="mt-2.5 space-y-2 text-[8.5px]">
                      <div className="max-w-[88%] rounded-lg bg-white p-2 text-[#0B3D2E] shadow-2xs">
                        Olá! Preciso de um sistema para pedidos.
                      </div>
                      <div className="ml-auto max-w-[90%] rounded-lg bg-[#D9FDD3] p-2 text-[#0B3D2E] shadow-2xs">
                        Perfeito! Registrei sua demanda no CRM (#482).
                      </div>
                      <div className="max-w-[84%] rounded-lg bg-white p-2 text-[#0B3D2E] shadow-2xs">
                        Ótimo, posso ver a prévia?
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="rounded-md bg-[#FF7A5C] px-2 py-1 text-center text-[8px] font-semibold text-[#0B3D2E]">
                      ✓ Lead qualificado · Score 94
                    </div>
                    <div className="rounded-full bg-white px-2.5 py-1 text-[8px] text-[#0B3D2E]/55">
                      Mensagem automática ativa...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation + iOS Home Indicator */}
            <div className="border-t border-slate-100 bg-white pt-1.5">
              <div className="flex items-center justify-around px-2 pb-1.5 text-slate-400">
                <Home className={`h-3 w-3 ${mode === "sistemas" ? "text-[#008051]" : mode === "automacoes" ? "text-[#B35540]" : "text-[#8C4A2F]"}`} />
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
      <div className="w-[218px] rounded-2xl border border-[#B08D57]/30 bg-[#1A1715] p-3.5 text-left text-[#EAE3D5] shadow-[0_22px_45px_-12px_rgba(26,23,21,0.45)] backdrop-blur-md dark:bg-[#1E2421]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#EAE3D5]">Loja &amp; Conversão</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#263A32] px-2 py-0.5 text-[9px] font-semibold text-[#9CAF88]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9CAF88]" />
            142 online
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] p-2 dark:bg-[#262C28]">
            <p className="text-[9px] text-[#EAE3D5]/65">Conversão</p>
            <p className="font-tech text-xs font-bold text-[#E0A486]">6,8%</p>
          </div>
          <div className="rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] p-2 dark:bg-[#262C28]">
            <p className="text-[9px] text-[#EAE3D5]/65">PageSpeed</p>
            <p className="font-tech text-xs font-bold text-[#9CAF88]">99/100</p>
          </div>
        </div>
        <p className="font-tech mt-2.5 text-[9px] text-[#EAE3D5]/65">
          +24 pedidos no WhatsApp hoje
        </p>
      </div>
    );
  }

  if (mode === "sistemas") {
    return (
      <div className="w-[222px] rounded-2xl border border-[#B08D57]/30 bg-[#1A1715] p-3.5 text-left text-[#EAE3D5] shadow-[0_22px_45px_-12px_rgba(26,23,21,0.45)] backdrop-blur-md dark:bg-[#1E2421]">
        <div className="flex items-center justify-between text-[10px] font-bold text-[#EAE3D5]">
          <span>Monitor do Sistema</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#00A86B]/20 px-2 py-0.5 text-[9px] font-semibold text-[#5FD3A5]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5FD3A5]" />
            Online
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] p-2 dark:bg-[#262C28]">
            <p className="text-[9px] text-[#EAE3D5]/65">Uptime API</p>
            <p className="font-tech text-xs font-bold text-[#5FD3A5]">99,98%</p>
          </div>
          <div className="rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] p-2 dark:bg-[#262C28]">
            <p className="text-[9px] text-[#EAE3D5]/65">Latência DB</p>
            <p className="font-tech text-xs font-bold text-[#F5F7FA]">14ms</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] px-2.5 py-1.5 text-[9px] dark:bg-[#262C28]">
          <span className="font-medium text-[#EAE3D5]/85">14 pedidos hoje</span>
          <span className="font-tech font-semibold text-[#5FD3A5]">Pix ok</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[226px] rounded-2xl border border-[#B08D57]/30 bg-[#1A1715] p-3.5 text-left text-[#EAE3D5] shadow-[0_22px_45px_-12px_rgba(26,23,21,0.45)] backdrop-blur-md dark:bg-[#1E2421]">
      <div className="flex items-center justify-between text-[11px] font-bold text-[#EAE3D5]">
        <span>WhatsApp → IA → CRM</span>
        <Sparkles className="h-3.5 w-3.5 text-[#FF7A5C]" />
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2F7F4]/15 text-[#F2F7F4]">
            <MessageSquare className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-[#EAE3D5]/65">Msg</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#F2F7F4]/40 to-[#5FD3A5]" />
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5FD3A5]/20 text-[#5FD3A5]">
            <Bot className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-[#EAE3D5]/65">IA</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#5FD3A5] to-[#FF7A5C]" />
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF7A5C]/25 text-[#FF9B83]">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className="text-[8px] font-medium text-[#EAE3D5]/65">CRM</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-[#EAE3D5]/10 bg-[#231F1C] px-2.5 py-1.5 text-[9px] dark:bg-[#262C28]">
        <span className="flex items-center gap-1 font-medium text-[#EAE3D5]/85">
          <Zap className="h-2.5 w-2.5 text-[#FF7A5C]" />
          Disparo IA · 466ms
        </span>
        <span className="font-tech font-semibold text-[#FF9B83]">Score 94</span>
      </div>
    </div>
  );
}
