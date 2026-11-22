"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Globe,
  Heart,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
} from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";

const fashionItems = {
  blazer: {
    name: "Blazer Linho Cru",
    collection: "Alfaiataria · Drop 04",
    price: 389,
    swatch: "#D8C8AE",
    accentBg: "from-[#EFE6D6] via-[#E5D7C0] to-[#D4C2A5]",
    garmentTone: "#1F2A44",
    badge: "Mais vendido",
  },
  trench: {
    name: "Trench Terracota",
    collection: "Edição Limitada",
    price: 540,
    swatch: "#D85D2A",
    accentBg: "from-[#F7E3DA] via-[#EFCBC0] to-[#DFAB99]",
    garmentTone: "#9F3E15",
    badge: "Últimas peças",
  },
  conjunto: {
    name: "Conjunto Carvão",
    collection: "Essenciais Noite",
    price: 460,
    swatch: "#1F2A44",
    accentBg: "from-[#DFE3EC] via-[#CBD2E0] to-[#B7C1D4]",
    garmentTone: "#182032",
    badge: "Novo drop",
  },
} as const;

const fashionSizes = ["P", "M", "G", "GG"] as const;

export function SiteModaVendasInteractive({ interactive = true }: { interactive?: boolean }) {
  const [itemKey, setItemKey] = useState<keyof typeof fashionItems>("blazer");
  const [size, setSize] = useState<(typeof fashionSizes)[number]>("M");
  const [bagCount, setBagCount] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);

  const product = fashionItems[itemKey];
  const pixPrice = Math.round(product.price * 0.95);

  function handleAdd() {
    if (!interactive) return;
    setBagCount((c) => c + 1);
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 1200);
  }

  return (
    <BrowserShell url="atelierverso.com.br/drop-04">
      <div className="min-h-[330px] bg-[#FAF7F2] p-4 text-left text-[#1F2A44]">
        {/* Store Header */}
        <div className="flex items-center justify-between border-b border-[#1F2A44]/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1F2A44] text-[9px] font-extrabold tracking-tighter text-[#F4EDE0]">
              AV
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1F2A44]">
              Atelier Verso
            </span>
          </div>
          <div className="hidden items-center gap-3 text-[10px] font-medium text-[#515C73] sm:flex">
            <span>Lançamentos</span>
            <span>Alfaiataria</span>
            <span>Lookbook</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1F2A44] px-2.5 py-1 text-[10px] font-semibold text-[#F4EDE0]">
            <ShoppingBag className="h-2.5 w-2.5 text-[#E05A3A]" />
            <span>Sacola ({bagCount})</span>
          </span>
        </div>

        {/* Editorial Fashion Hero + Live Buy Card */}
        <div className="mt-3.5 grid gap-3.5 sm:grid-cols-12 sm:items-stretch">
          {/* Left Copy & Selectors */}
          <div className="flex flex-col justify-between sm:col-span-6">
            <div>
              <span className="font-tech inline-flex items-center gap-1.5 rounded bg-[#EFE6D6] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A8431B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D85D2A]" />
                {product.collection}
              </span>
              <h4 className="mt-2 text-[15px] font-extrabold leading-tight tracking-tight text-[#1F2A44]">
                Moda autoral pronta para vender no 1º clique.
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-[#515C73]">
                Escolha a peça e o tamanho para testar o checkout direto no WhatsApp.
              </p>

              {/* Collection Swatches */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(Object.keys(fashionItems) as (keyof typeof fashionItems)[]).map((key) => {
                  const active = itemKey === key;
                  const entry = fashionItems[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setItemKey(key)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-semibold transition-all ${
                        active
                          ? "border-[#1F2A44] bg-[#1F2A44] text-[#F4EDE0] shadow-xs"
                          : "border-[#1F2A44]/15 bg-white text-[#515C73] hover:border-[#D85D2A]"
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/15"
                        style={{ backgroundColor: entry.swatch }}
                      />
                      <span>{entry.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size + Price + CTA */}
            <div className="mt-3 rounded-xl border border-[#1F2A44]/12 bg-white p-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#1F2A44]">{product.name}</span>
                <div className="text-right">
                  <span className="font-tech font-extrabold text-[#D85D2A]">
                    R$ {product.price},00
                  </span>
                  <span className="ml-1 text-[9px] text-emerald-700">· R$ {pixPrice} Pix</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="grid flex-1 grid-cols-4 gap-1">
                  {fashionSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setSize(s)}
                      className={`font-tech rounded py-1 text-[9px] font-bold transition-colors ${
                        size === s
                          ? "bg-[#1F2A44] text-[#F4EDE0]"
                          : "bg-[#EFE6D6]/80 text-[#515C73] hover:bg-[#EFE6D6]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={handleAdd}
                  className="shrink-0 rounded-lg bg-[#D85D2A] px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#BF4E20]"
                >
                  {addedFlash ? "Adicionado ✓" : `Comprar ${size}`}
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Lookbook Frame */}
          <div className="flex flex-col justify-between rounded-xl border border-[#1F2A44]/12 bg-white p-2.5 shadow-sm sm:col-span-6">
            <div
              className={`relative flex h-[168px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br ${product.accentBg} p-3`}
            >
              <div className="flex items-center justify-between">
                <span className="font-tech rounded bg-[#1F2A44]/85 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-[#F4EDE0]">
                  {product.badge}
                </span>
                <span className="font-tech text-[9px] font-bold text-[#1F2A44]/75">
                  LOOK 04
                </span>
              </div>

              {/* Minimal Editorial Tailored Coat / Bag Vector Silhouette */}
              <svg
                viewBox="0 0 180 110"
                className="mx-auto my-auto h-24 w-auto drop-shadow-sm"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M68 16L82 10H98L112 16L134 36L124 52L116 44V98H64V44L56 52L46 36L68 16Z"
                  fill={product.garmentTone}
                />
                <path
                  d="M82 10L90 36L98 10M90 36V98"
                  stroke="#F4EDE0"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
                <circle cx="95" cy="54" r="1.8" fill="#E05A3A" />
                <circle cx="95" cy="68" r="1.8" fill="#E05A3A" />
              </svg>

              <div className="flex items-center justify-between text-[9px] font-semibold text-[#1F2A44]">
                <span>Linho &amp; Corte Italiano</span>
                <span className="font-tech rounded-full bg-white/85 px-2 py-0.5 text-[8px] font-bold">
                  Entrega 24h
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between px-0.5 text-[9.5px] text-[#515C73]">
              <span>Frete grátis acima de R$ 299</span>
              <span className="font-tech font-bold text-emerald-700">Pix -5%</span>
            </div>
          </div>
        </div>

        {/* Store Web Vitals Strip */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#1F2A44]/12 bg-white px-3 py-1.5 text-[10px]">
          <span className="flex items-center gap-1.5 font-medium text-[#1F2A44]">
            <Globe className="h-3.5 w-3.5 text-[#D85D2A]" />
            Loja otimizada para tráfego pago
          </span>
          <div className="font-tech flex items-center gap-3 text-[10px]">
            <span className="font-bold text-emerald-700">99 Performance</span>
            <span className="font-bold text-emerald-700">100 SEO</span>
            <span className="text-[#515C73]">0.5s LCP</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

const clinicPlans = {
  express: { label: "Avaliação Express", duration: "30 min", price: "R$ 180,00", doctor: "Dra. Camila" },
  clareamento: { label: "Clareamento LED", duration: "50 min", price: "R$ 490,00", doctor: "Dr. Rafael" },
  completo: { label: "Check-up Completo", duration: "1h", price: "R$ 340,00", doctor: "Dra. Camila" },
} as const;

const clinicSlots = ["09:30", "11:00", "14:30", "16:15"];

export function SiteClinicaInteractive({ interactive = true }: { interactive?: boolean }) {
  const [planKey, setPlanKey] = useState<keyof typeof clinicPlans>("express");
  const [slot, setSlot] = useState("14:30");
  const [patientName, setPatientName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const plan = clinicPlans[planKey];

  return (
    <BrowserShell url="clinicaaurora.com.br">
      <div className="min-h-[330px] bg-gradient-to-br from-amber-50/60 via-white to-blue-50/70 p-4 text-left">
        {/* Site Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-blue-600 to-amber-400" />
            <span className="text-xs font-bold tracking-tight text-slate-900">Aurora Saúde</span>
          </div>
          <div className="hidden items-center gap-3 text-[10px] font-medium text-slate-500 sm:flex">
            <span>Tratamentos</span>
            <span>Especialistas</span>
            <span>Convênios</span>
          </div>
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
            Agendar online
          </span>
        </div>

        {/* Hero + Interactive Booking Widget */}
        <div className="mt-3.5 grid gap-4 sm:grid-cols-12 sm:items-start">
          <div className="sm:col-span-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-2.5 w-2.5" /> Horários disponíveis hoje
            </span>
            <h4 className="mt-2 text-base font-extrabold leading-tight tracking-tight text-slate-900">
              Sua consulta confirmada em menos de 1 minuto.
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Escolha o atendimento e o horário ao lado para simular a reserva ao vivo.
            </p>

            {/* Treatment switcher */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(Object.keys(clinicPlans) as (keyof typeof clinicPlans)[]).map((key) => {
                const active = planKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!interactive}
                    onClick={() => {
                      if (!interactive) return;
                      setPlanKey(key);
                      setConfirmed(false);
                    }}
                    className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-all ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {clinicPlans[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:col-span-6">
            {confirmed ? (
              <div className="space-y-2.5 py-1">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold">Pré-reserva confirmada (#AUR-482)</span>
                </div>
                <div className="rounded-lg bg-emerald-50/70 p-2.5 text-[10px] text-slate-700">
                  <p>
                    <strong>{patientName.trim() || "Visitante"}</strong> · {plan.label}
                  </p>
                  <p className="mt-0.5 text-slate-600">
                    Hoje às <strong>{slot}</strong> com {plan.doctor} ({plan.price})
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setConfirmed(false)}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 py-1.5 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Escolher outro horário</span>
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-slate-800">{plan.doctor}</span>
                  <span className="font-tech font-bold text-blue-700">{plan.price}</span>
                </div>

                {/* Slot Picker */}
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {clinicSlots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setSlot(s)}
                      className={`font-tech rounded-md py-1 text-[9px] font-semibold transition-colors ${
                        slot === s
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {interactive && (
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Seu nome (opcional)"
                    aria-label="Nome do paciente na simulação"
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                )}

                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => interactive && setConfirmed(true)}
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 text-[10px] font-semibold text-white shadow-xs transition-all hover:from-blue-700 hover:to-indigo-700"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Reservar {slot} · {plan.duration}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Web Vitals */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-[10px]">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Globe className="h-3.5 w-3.5 text-blue-600" />
            Lighthouse Score
          </span>
          <div className="font-tech flex items-center gap-3 text-[10px]">
            <span className="font-bold text-emerald-600">99 Performance</span>
            <span className="font-bold text-emerald-600">100 SEO</span>
            <span className="text-slate-500">0.6s LCP</span>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

const properties = [
  { id: "cob", title: "Cobertura Duplex · 142m²", zone: "Centro", price: 890000, beds: "3 suítes" },
  { id: "mar", title: "Apto Vista Mar · 98m²", zone: "Praia", price: 680000, beds: "2 vagas" },
  { id: "cas", title: "Casa Térrea · 180m²", zone: "Jardins", price: 620000, beds: "Piscina" },
];

export function SiteImobiliariaInteractive({ interactive = true }: { interactive?: boolean }) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<"Todos" | "Centro" | "Praia" | "Jardins">("Todos");
  const [favorites, setFavorites] = useState<string[]>(["mar"]);
  const [visitScheduled, setVisitScheduled] = useState<string | null>(null);

  const visible = properties.filter((item) => {
    const matchZone = zone === "Todos" || item.zone === zone;
    const matchText =
      !query.trim() ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.zone.toLowerCase().includes(query.toLowerCase());
    return matchZone && matchText;
  });

  function toggleFav(id: string) {
    if (!interactive) return;
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <BrowserShell url="horizonteimoveis.com.br">
      <div className="min-h-[330px] bg-gradient-to-b from-amber-50/50 via-white to-slate-50 p-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white">
              <Building2 className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold text-slate-900">Horizonte Imóveis</span>
          </div>
          <div className="flex flex-wrap gap-1 rounded-full border border-slate-200 bg-white p-0.5">
            {(["Todos", "Centro", "Praia", "Jardins"] as const).map((z) => (
              <button
                key={z}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setZone(z)}
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold transition-colors ${
                  zone === z ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-2.5">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            disabled={!interactive}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por bairro ou tipo (ex.: Praia, Duplex)..."
            aria-label="Buscar imóveis"
            className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-[10px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {visible.map((item) => {
            const isFav = favorites.includes(item.id);
            const isBooked = visitScheduled === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-2xs"
              >
                <div>
                  <div className="flex h-14 items-start justify-between rounded-lg bg-gradient-to-br from-blue-600/90 via-indigo-600 to-amber-500/85 p-1.5 text-white">
                    <span className="inline-flex items-center gap-0.5 rounded bg-slate-950/50 px-1.5 py-0.5 text-[8px] font-semibold">
                      <MapPin className="h-2.5 w-2.5" /> {item.zone}
                    </span>
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => toggleFav(item.id)}
                      aria-label={`Favoritar ${item.title}`}
                      className="rounded-full bg-slate-950/40 p-1 hover:bg-slate-950/70"
                    >
                      <Heart
                        className={`h-2.5 w-2.5 ${isFav ? "fill-rose-400 text-rose-400" : "text-white"}`}
                      />
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] font-bold leading-snug text-slate-900">{item.title}</p>
                  <p className="text-[9px] text-slate-400">{item.beds}</p>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="font-tech text-[10px] font-extrabold text-blue-700">
                    R$ {(item.price / 1000).toFixed(0)}k
                  </span>
                  <button
                    type="button"
                    disabled={!interactive}
                    onClick={() => interactive && setVisitScheduled(isBooked ? null : item.id)}
                    className={`rounded-md px-2 py-0.5 text-[9px] font-semibold transition-colors ${
                      isBooked
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isBooked ? "Visita ok ✓" : "Visitar"}
                  </button>
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="col-span-3 py-6 text-center text-[11px] text-slate-500">
              Nenhum imóvel encontrado para &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </BrowserShell>
  );
}

const catalogItems = [
  { id: "cafe", name: "Combo Café Especial 500g", cat: "Cafés", price: 64 },
  { id: "kit", name: "Kit Degustação Artesanal", cat: "Kits", price: 84 },
  { id: "drip", name: "Drip Coffee Box (10 un.)", cat: "Cafés", price: 39 },
];

export function SiteCatalogoInteractive({ interactive = true }: { interactive?: boolean }) {
  const [cart, setCart] = useState<Record<string, number>>({ cafe: 1, kit: 1 });
  const [pixDiscount, setPixDiscount] = useState(true);
  const [sentPreview, setSentPreview] = useState(false);

  function changeQty(id: string, delta: number) {
    if (!interactive) return;
    setSentPreview(false);
    setCart((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  }

  const totalCount = Object.values(cart).reduce((acc, q) => acc + q, 0);
  const subtotal = catalogItems.reduce((acc, item) => acc + (cart[item.id] ?? 0) * item.price, 0);
  const finalTotal = pixDiscount ? subtotal * 0.95 : subtotal;

  return (
    <BrowserShell url="emporiocentral.com.br/pedido">
      <div className="min-h-[330px] bg-gradient-to-br from-white via-amber-50/35 to-blue-50/40 p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white">
              <ShoppingBag className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold text-slate-900">Empório Central</span>
          </div>
          <button
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setPixDiscount((v) => !v)}
            className={`font-tech rounded-full border px-2 py-0.5 text-[9px] font-semibold transition-colors ${
              pixDiscount
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {pixDiscount ? "✓ Pix -5% ativo" : "Ativar Pix -5%"}
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {catalogItems.map((product) => {
            const qty = cart[product.id] ?? 0;
            return (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2"
              >
                <div>
                  <p className="text-[11px] font-bold text-slate-900">{product.name}</p>
                  <p className="text-[9px] text-slate-500">
                    {product.cat} · R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={!interactive || qty === 0}
                    onClick={() => changeQty(product.id, -1)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40"
                    aria-label={`Remover ${product.name}`}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-tech w-4 text-center text-[11px] font-bold text-slate-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    disabled={!interactive}
                    onClick={() => changeQty(product.id, 1)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    aria-label={`Adicionar ${product.name}`}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3.5 rounded-xl bg-slate-950 p-3 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[9px] text-slate-400">
                {totalCount} {totalCount === 1 ? "item" : "itens"} {pixDiscount ? "(com 5% Pix)" : ""}
              </p>
              <p className="font-tech text-sm font-bold">
                R$ {finalTotal.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button
              type="button"
              disabled={!interactive || totalCount === 0}
              onClick={() => interactive && setSentPreview((v) => !v)}
              className="rounded-full bg-emerald-500 px-3.5 py-1.5 text-[10px] font-bold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-40"
            >
              {sentPreview ? "Ocultar resumo" : "Gerar resumo WhatsApp →"}
            </button>
          </div>
          {sentPreview && (
            <p className="mt-2 border-t border-slate-800 pt-2 text-[10px] text-emerald-300">
              <Check className="mr-1 inline h-3 w-3" />
              Pedido pronto: {catalogItems.filter((i) => (cart[i.id] ?? 0) > 0).map((i) => `${cart[i.id]}x ${i.name}`).join(" + ")} — Total R$ {finalTotal.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </BrowserShell>
  );
}
