"use client";

import { useState } from "react";
import { BarChart3, Bell, CalendarDays, ChevronLeft, ChevronRight, MessageCircle, Plus, Settings, Users } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";

type Status = "Confirmado" | "Em atendimento" | "Concluído" | "Aguardando";
type Day = "Hoje" | "Amanhã" | "Sexta";

interface Slot {
  id: string;
  pro: number;
  start: number; // índice da linha de 30 min a partir das 08:00
  len: number;
  client: string;
  service: string;
  status: Status;
}

const pros = ["Ana Lima", "Bruno Costa", "Carla Dias"];
const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];

const seed: Record<Day, Slot[]> = {
  Hoje: [
    { id: "a", pro: 0, start: 0, len: 2, client: "Juliana M.", service: "Corte + escova", status: "Concluído" },
    { id: "b", pro: 1, start: 1, len: 1, client: "Rafael T.", service: "Barba", status: "Em atendimento" },
    { id: "c", pro: 2, start: 2, len: 3, client: "Patrícia O.", service: "Coloração", status: "Confirmado" },
    { id: "d", pro: 0, start: 4, len: 2, client: "Camila R.", service: "Hidratação", status: "Aguardando" },
    { id: "e", pro: 1, start: 5, len: 1, client: "Lucas F.", service: "Corte", status: "Confirmado" },
  ],
  Amanhã: [
    { id: "f", pro: 0, start: 1, len: 2, client: "Bianca S.", service: "Escova", status: "Confirmado" },
    { id: "g", pro: 2, start: 3, len: 2, client: "Renata V.", service: "Manicure", status: "Aguardando" },
  ],
  Sexta: [
    { id: "h", pro: 1, start: 0, len: 1, client: "Diego P.", service: "Corte", status: "Confirmado" },
    { id: "i", pro: 2, start: 4, len: 3, client: "Fernanda L.", service: "Mechas", status: "Confirmado" },
  ],
};

const next: Record<Status, Status> = {
  Aguardando: "Confirmado",
  Confirmado: "Em atendimento",
  "Em atendimento": "Concluído",
  Concluído: "Aguardando",
};

const tone: Record<Status, string> = {
  Aguardando: "border-(--m-ink)/35 bg-(--m-ink)/5 text-(--m-ink)",
  Confirmado: "border-(--m-accent) bg-(--m-accent)/20 text-(--m-ink)",
  "Em atendimento": "border-(--m-ink) bg-(--m-ink) text-white",
  Concluído: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

export function SistemaAgendaInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Studio Bella", (n) => n);
  const [day, setDay] = useState<Day>("Hoje");
  const [slots, setSlots] = useState(seed);

  const today = slots[day];
  const busy = today.reduce((n, s) => n + s.len, 0);
  const occupancy = Math.round((busy / (pros.length * hours.length)) * 100);

  function cycle(id: string) {
    if (!interactive) return;
    setSlots((prev) => ({ ...prev, [day]: prev[day].map((s) => (s.id === id ? { ...s, status: next[s.status] } : s)) }));
  }

  function addQuick() {
    if (!interactive) return;
    for (let row = 0; row < hours.length; row++) {
      for (let pro = 0; pro < pros.length; pro++) {
        const taken = today.some((s) => s.pro === pro && row >= s.start && row < s.start + s.len);
        if (!taken) {
          setSlots((prev) => ({
            ...prev,
            [day]: [...prev[day], { id: `n${Date.now()}`, pro, start: row, len: 1, client: "Encaixe", service: "Corte", status: "Aguardando" }],
          }));
          return;
        }
      }
    }
  }

  return (
    <BrowserShell url="prisma.estudio/modelos/agenda-equipe" palette="agenda">
      <div className="grid min-h-(--mock-h,520px) grid-cols-[44px_1fr] bg-(--m-bg) text-left text-(--m-ink)">
        <aside className="flex flex-col items-center gap-3 bg-(--m-ink) py-3 text-white/70">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--m-accent) text-[10px] font-extrabold text-(--m-on-accent)">
            {brand.slice(0, 1).toUpperCase()}
          </span>
          <CalendarDays className="h-4 w-4 text-white" />
          <Users className="h-4 w-4" />
          <BarChart3 className="h-4 w-4" />
          <Settings className="mt-auto h-4 w-4" />
        </aside>

        <div className="min-w-0 p-3.5">
          {/* Cabeçalho */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-(--m-ink)/65">{brand} · Agenda da equipe</p>
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="h-3.5 w-3.5 text-(--m-ink)/65" />
                <p className="text-[14px] font-extrabold">Terça, 24 de novembro</p>
                <ChevronRight className="h-3.5 w-3.5 text-(--m-ink)/65" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 rounded-lg bg-white p-0.5 shadow-2xs">
                {(["Hoje", "Amanhã", "Sexta"] as Day[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    disabled={!interactive}
                    onClick={() => setDay(d)}
                    className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${day === d ? "bg-(--m-accent) text-(--m-on-accent)" : "text-(--m-ink)/70"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <button type="button" disabled={!interactive} onClick={addQuick} className="inline-flex items-center gap-1 rounded-lg bg-(--m-ink) px-2.5 py-1.5 text-[10px] font-bold text-white">
                <Plus className="h-3 w-3" /> Encaixe
              </button>
              <Bell className="h-3.5 w-3.5 text-(--m-ink)/65" />
            </div>
          </div>

          {/* Indicadores */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              ["Atendimentos", String(today.length)],
              ["Confirmados", String(today.filter((s) => s.status === "Confirmado").length)],
              ["Ocupação", `${occupancy}%`],
              ["Faltas no mês", "2"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-white px-2.5 py-2 shadow-2xs">
                <p className="text-[9px] text-(--m-ink)/60">{l}</p>
                <p className="text-[14px] font-extrabold tabular-nums">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_170px]">
            {/* Grade */}
            <div className="overflow-hidden rounded-xl bg-white shadow-2xs">
              <div className="grid grid-cols-[44px_repeat(3,1fr)] border-b border-(--m-ink)/8 text-[9.5px] font-bold">
                <span />
                {pros.map((p) => (
                  <span key={p} className="flex items-center gap-1.5 px-2 py-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--m-bg) text-[8.5px]">
                      {p.split(" ").map((w) => w[0]).join("")}
                    </span>
                    {p}
                  </span>
                ))}
              </div>
              <div className="relative grid grid-cols-[44px_repeat(3,1fr)]" style={{ gridTemplateRows: `repeat(${hours.length}, 30px)` }}>
                {hours.map((h, row) => (
                  <span key={h} className="border-b border-(--m-ink)/6 pl-2 pt-0.5 font-mono text-[8.5px] text-(--m-ink)/65" style={{ gridRow: row + 1, gridColumn: 1 }}>
                    {h}
                  </span>
                ))}
                {hours.map((h, row) =>
                  pros.map((p, col) => (
                    <span key={`${h}-${p}`} className="border-b border-l border-(--m-ink)/6" style={{ gridRow: row + 1, gridColumn: col + 2 }} />
                  )),
                )}
                {today.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => cycle(s.id)}
                    title="Clique para avançar a etapa"
                    style={{ gridRow: `${s.start + 1} / span ${s.len}`, gridColumn: s.pro + 2 }}
                    className={`z-10 m-0.5 flex flex-col overflow-hidden rounded-lg border-l-[3px] px-1.5 py-1 text-left text-[9px] leading-tight transition-colors ${tone[s.status]}`}
                  >
                    <span className="font-bold">{s.client}</span>
                    <span className="opacity-80">{s.service}</span>
                    {s.len > 1 && <span className="mt-auto text-[8px] font-semibold opacity-80">{s.status}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Próximo */}
            <div className="grid content-start gap-2">
              <div className="rounded-xl bg-white p-2.5 shadow-2xs">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-(--m-ink)/65">Próximo</p>
                <p className="mt-1 text-[11px] font-bold">10:00 · Camila R.</p>
                <p className="text-[9.5px] text-(--m-ink)/65">Hidratação com Ana Lima</p>
                <p className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                  <MessageCircle className="h-2.5 w-2.5" /> Lembrete enviado 9:00
                </p>
              </div>
              <div className="rounded-xl bg-white p-2.5 shadow-2xs">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-(--m-ink)/65">Legenda</p>
                <ul className="mt-1.5 grid gap-1 text-[9px]">
                  {(Object.keys(tone) as Status[]).map((s) => (
                    <li key={s} className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-sm border ${tone[s]}`} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}
