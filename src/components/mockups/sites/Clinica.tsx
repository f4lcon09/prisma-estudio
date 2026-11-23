"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Clock,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";
import { MiniMap, MockFooter, SectionHead, Stars } from "@/components/mockups/kit";

const services = [
  { id: "avaliacao", label: "Avaliação completa", duration: "40 min", price: "R$ 120", icon: Stethoscope, text: "Exame clínico, raio-x digital e plano de tratamento por escrito." },
  { id: "clareamento", label: "Clareamento a laser", duration: "60 min", price: "R$ 690", icon: Sparkles, text: "Sessão em consultório com moldeira para manutenção em casa." },
  { id: "limpeza", label: "Limpeza e prevenção", duration: "30 min", price: "R$ 180", icon: Smile, text: "Profilaxia, flúor e orientação de higiene para a família." },
] as const;

const slotsByDay = {
  Hoje: ["14:30", "16:00", "17:30"],
  Amanhã: ["08:30", "10:00", "11:30", "15:00"],
  Sexta: ["09:00", "13:30", "16:30"],
} as const;

type Day = keyof typeof slotsByDay;

export function SiteClinicaInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Aurora Saúde");
  const [serviceId, setServiceId] = useState<(typeof services)[number]["id"]>("avaliacao");
  const [day, setDay] = useState<Day>("Hoje");
  const [slot, setSlot] = useState<string>("14:30");
  const [patientName, setPatientName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const service = services.find((s) => s.id === serviceId) ?? services[0];

  return (
    <BrowserShell url="clinicaaurora.com.br" palette="clinica">
      <div className="bg-white text-left text-(--m-ink)">
        {/* Barra de contato */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-(--m-ink) px-5 py-1.5 text-[9px] text-white/80">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5" /> Rua das Palmeiras, 210 · Centro
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-2.5 w-2.5" /> (11) 4002-8922
            </span>
            <span className="hidden sm:inline">Seg a sáb · 8h às 19h</span>
          </span>
        </div>

        {/* Navegação */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-(--m-ink)/8 bg-white/95 px-5 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-(--m-ink) text-white">
              <HeartPulse className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-extrabold tracking-tight">{brand}</span>
          </div>
          <nav className="hidden items-center gap-4 text-[10.5px] font-medium text-(--m-ink)/75 sm:flex">
            <span>Tratamentos</span>
            <span>Equipe</span>
            <span>Convênios</span>
            <span>Contato</span>
          </nav>
          <span className="rounded-full bg-(--m-accent) px-3 py-1.5 text-[10px] font-bold text-(--m-on-accent)">
            Agendar online
          </span>
        </header>

        {/* Hero */}
        <section className="grid items-center gap-5 bg-(--m-bg) px-5 py-6 sm:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-(--m-accent-ink) shadow-2xs">
              <CheckCircle2 className="h-2.5 w-2.5" /> Horários livres hoje
            </span>
            <h4 className="mt-2.5 text-[24px] font-extrabold leading-[1.08] tracking-tight">
              Seu sorriso cuidado por quem explica cada passo.
            </h4>
            <p className="mt-2 max-w-[38ch] text-[11px] leading-relaxed text-(--m-ink)/72">
              Odontologia e estética com plano de tratamento por escrito, preço antes de começar e consulta confirmada em
              menos de um minuto.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="rounded-full bg-(--m-accent) px-3.5 py-2 text-[10.5px] font-bold text-(--m-on-accent)">
                Agendar avaliação
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-(--m-ink)/20 bg-white px-3.5 py-2 text-[10.5px] font-semibold">
                <MessageCircle className="h-3 w-3" /> WhatsApp
              </span>
            </div>
            <div className="mt-3.5 flex items-center gap-2 text-[10px] text-(--m-ink)/70">
              <Stars />
              <span>
                <strong className="text-(--m-ink)">4,9</strong> no Google · 1.240 avaliações
              </span>
            </div>
          </div>
          <div className="relative h-52 overflow-hidden rounded-2xl sm:h-60">
            <Image src="/models/clinica-dentista.jpg" alt="Dentista da clínica" fill sizes="320px" className="object-cover object-[60%_30%]" />
            <div className="absolute bottom-2.5 left-2.5 rounded-xl bg-white/95 px-3 py-2 shadow-md">
              <p className="text-[9px] text-(--m-ink)/65">Próximo horário livre</p>
              <p className="text-[12px] font-extrabold">Hoje, 14:30</p>
            </div>
          </div>
        </section>

        {/* Faixa de confiança */}
        <div className="grid grid-cols-2 gap-px border-y border-(--m-ink)/8 bg-(--m-ink)/8 sm:grid-cols-4">
          {[
            [ShieldCheck, "CRO-SP 12.345"],
            [Clock, "Atendimento no horário"],
            [Sparkles, "Raio-x digital"],
            [CheckCircle2, "12x sem juros"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={label as string} className="flex items-center justify-center gap-1.5 bg-white px-2 py-2.5 text-[9.5px] font-semibold">
                <I className="h-3 w-3 text-(--m-accent-ink)" /> {label as string}
              </div>
            );
          })}
        </div>

        {/* Agendamento interativo */}
        <section className="px-5 py-6">
          <SectionHead eyebrow="Agende agora" title="Escolha o atendimento e o horário" text="A confirmação chega no seu WhatsApp na hora." />
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1.05fr]">
            <div className="grid gap-2">
              {services.map((s) => {
                const active = s.id === serviceId;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => {
                      setServiceId(s.id);
                      setConfirmed(false);
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors ${
                      active ? "border-(--m-ink) bg-(--m-bg)" : "border-(--m-ink)/12 hover:border-(--m-ink)/35"
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${active ? "bg-(--m-ink) text-white" : "bg-(--m-bg) text-(--m-ink)"}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold">{s.label}</span>
                      <span className="block text-[9.5px] text-(--m-ink)/65">{s.duration}</span>
                    </span>
                    <span className="text-[10.5px] font-bold text-(--m-accent-ink)">{s.price}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-(--m-ink)/12 p-3 shadow-xs">
              {confirmed ? (
                <div className="flex h-full flex-col items-center justify-center gap-1.5 py-4 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="text-[12px] font-extrabold">Consulta confirmada</p>
                  <p className="text-[10px] text-(--m-ink)/70">
                    {service.label} · {day}, {slot}
                    {patientName.trim() ? ` · ${patientName.trim()}` : ""}
                  </p>
                  <p className="text-[9.5px] text-(--m-ink)/60">Lembrete enviado para o seu WhatsApp.</p>
                  <button
                    type="button"
                    disabled={!interactive}
                    onClick={() => setConfirmed(false)}
                    className="mt-1 rounded-full border border-(--m-ink)/20 px-3 py-1 text-[9.5px] font-semibold"
                  >
                    Remarcar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[10.5px] font-bold">Dra. Camila Rocha</p>
                    <span className="text-[9px] text-(--m-ink)/60">CRO 12.345</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-(--m-bg) p-0.5">
                    {(Object.keys(slotsByDay) as Day[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        disabled={!interactive}
                        onClick={() => {
                          setDay(d);
                          setSlot(slotsByDay[d][0]);
                        }}
                        className={`rounded-md py-1 text-[9.5px] font-semibold ${day === d ? "bg-white shadow-2xs" : "text-(--m-ink)/65"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-1">
                    {slotsByDay[day].map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={!interactive}
                        onClick={() => setSlot(s)}
                        className={`rounded-md py-1.5 text-[9.5px] font-bold transition-colors ${
                          slot === s ? "bg-(--m-ink) text-white" : "bg-(--m-bg) text-(--m-ink)/80 hover:bg-(--m-ink)/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <input
                    value={patientName}
                    disabled={!interactive}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-lg border border-(--m-ink)/12 bg-white px-2.5 py-1.5 text-[10px] placeholder:text-(--m-ink)/45 focus:border-(--m-accent) focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={!interactive}
                    onClick={() => setConfirmed(true)}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-(--m-accent) py-2 text-[10.5px] font-bold text-(--m-on-accent) hover:brightness-95"
                  >
                    <Calendar className="h-3 w-3" /> Reservar {day.toLowerCase()} às {slot}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Tratamentos */}
        <section className="bg-(--m-bg) px-5 py-6">
          <SectionHead eyebrow="Tratamentos" title="O que fazemos por você" />
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="rounded-xl bg-white p-3 shadow-2xs">
                  <Icon className="h-4 w-4 text-(--m-accent-ink)" />
                  <p className="mt-2 text-[11.5px] font-bold">{s.label}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-(--m-ink)/70">{s.text}</p>
                  <p className="mt-2 text-[10px] font-bold text-(--m-accent-ink)">a partir de {s.price}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Equipe */}
        <section className="px-5 py-6">
          <SectionHead eyebrow="Equipe" title="Quem vai cuidar de você" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { img: "/models/clinica-dentista.jpg", name: "Dra. Camila Rocha", role: "Estética e clareamento", reg: "CRO-SP 12.345", pos: "object-[60%_25%]" },
              { img: "/models/clinica-medico.jpg", name: "Dr. Rafael Nunes", role: "Implantes e prótese", reg: "CRO-SP 23.456", pos: "object-[50%_20%]" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-xl border border-(--m-ink)/10 p-2.5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.img} alt={p.name} fill sizes="56px" className={`object-cover ${p.pos}`} />
                </div>
                <div>
                  <p className="text-[11.5px] font-bold">{p.name}</p>
                  <p className="text-[10px] text-(--m-ink)/70">{p.role}</p>
                  <p className="text-[9px] text-(--m-ink)/55">{p.reg}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultório + depoimentos */}
        <section className="grid gap-4 bg-(--m-bg) px-5 py-6 sm:grid-cols-2">
          <div className="relative h-40 overflow-hidden rounded-2xl">
            <Image src="/models/clinica-consultorio.jpg" alt="Consultório" fill sizes="300px" className="object-cover" />
          </div>
          <div className="grid gap-2">
            <SectionHead eyebrow="Avaliações" title="O que dizem os pacientes" />
            {[
              ["Mariana S.", "Me explicaram tudo antes de começar e o preço foi exatamente o combinado."],
              ["Paulo R.", "Agendei pelo site em um minuto e fui atendido no horário."],
            ].map(([n, t]) => (
              <div key={n} className="rounded-xl bg-white p-2.5 shadow-2xs">
                <Stars />
                <p className="mt-1 text-[10px] leading-relaxed text-(--m-ink)/80">“{t}”</p>
                <p className="mt-1 text-[9px] font-semibold text-(--m-ink)/60">{n}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Convênios */}
        <section className="px-5 py-5">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.16em] text-(--m-ink)/55">Convênios aceitos</p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            {["OdontoPrev", "Amil Dental", "SulAmérica", "Bradesco Dental", "Porto Seguro"].map((c) => (
              <span key={c} className="rounded-lg border border-(--m-ink)/10 px-2.5 py-1 text-[9.5px] font-semibold text-(--m-ink)/70">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Localização */}
        <section className="grid gap-4 border-t border-(--m-ink)/8 px-5 py-6 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Como chegar" title="Estamos no Centro" />
            <ul className="mt-3 grid gap-1.5 text-[10px] text-(--m-ink)/75">
              <li className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-(--m-accent-ink)" /> Rua das Palmeiras, 210 · sala 4</li>
              <li className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-(--m-accent-ink)" /> Seg a sex 8h–19h · Sáb 8h–13h</li>
              <li className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-(--m-accent-ink)" /> (11) 4002-8922</li>
            </ul>
          </div>
          <MiniMap label={brand} />
        </section>

        <MockFooter
          brand={brand}
          note="Odontologia e estética com plano de tratamento por escrito."
          columns={[
            { title: "Tratamentos", items: ["Avaliação", "Clareamento", "Implantes"] },
            { title: "Clínica", items: ["Equipe", "Convênios", "Blog"] },
            { title: "Contato", items: ["WhatsApp", "(11) 4002-8922", "Instagram"] },
          ]}
        />
      </div>
    </BrowserShell>
  );
}
