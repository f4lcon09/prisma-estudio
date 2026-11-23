"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Bath, BedDouble, Building2, Calendar, Car, Heart, KeyRound, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";
import { MockFooter, SectionHead } from "@/components/mockups/kit";

type Zone = "Todos" | "Centro" | "Praia" | "Jardins";
type Deal = "Comprar" | "Alugar";

const listings = [
  { id: "c1", title: "Casa com piscina", zone: "Jardins", deal: "Comprar", price: 1890000, beds: 4, baths: 3, cars: 3, area: 320, img: "/models/imovel-casa-piscina.jpg", tag: "Exclusivo" },
  { id: "c2", title: "Apartamento vista mar", zone: "Praia", deal: "Comprar", price: 980000, beds: 3, baths: 2, cars: 2, area: 118, img: "/models/imovel-sala-mar.jpg", tag: "Novo" },
  { id: "c3", title: "Casa moderna", zone: "Jardins", deal: "Alugar", price: 8900, beds: 3, baths: 3, cars: 2, area: 210, img: "/models/imovel-fachada.jpg", tag: "Mobiliado" },
  { id: "c4", title: "Sobrado com quintal", zone: "Centro", deal: "Comprar", price: 720000, beds: 3, baths: 2, cars: 2, area: 168, img: "/models/imovel-sobrado.jpg", tag: "Baixou" },
  { id: "c5", title: "Apartamento decorado", zone: "Centro", deal: "Alugar", price: 4200, beds: 2, baths: 2, cars: 1, area: 84, img: "/models/imovel-sala.jpg", tag: "Pet friendly" },
] as const;

const fmt = (v: number, deal: Deal) =>
  deal === "Alugar" ? `R$ ${v.toLocaleString("pt-BR")}/mês` : `R$ ${v.toLocaleString("pt-BR")}`;

export function SiteImobiliariaInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Horizonte Imóveis");
  const [deal, setDeal] = useState<Deal>("Comprar");
  const [zone, setZone] = useState<Zone>("Todos");
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<string[]>(["c2"]);
  const [visit, setVisit] = useState<string | null>(null);

  const results = useMemo(
    () =>
      listings.filter(
        (l) =>
          l.deal === deal &&
          (zone === "Todos" || l.zone === zone) &&
          (query.trim() === "" || `${l.title} ${l.zone}`.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [deal, zone, query],
  );

  function toggleFav(id: string) {
    if (!interactive) return;
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <BrowserShell url="horizonteimoveis.com.br" palette="imobiliaria">
      <div className="bg-white text-left text-(--m-ink)">
        {/* Navegação */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-(--m-ink)/8 bg-white/95 px-5 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--m-ink) text-white">
              <Building2 className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-extrabold tracking-tight">{brand}</span>
          </div>
          <nav className="hidden items-center gap-4 text-[10.5px] font-medium text-(--m-ink)/75 sm:flex">
            <span>Comprar</span>
            <span>Alugar</span>
            <span>Lançamentos</span>
            <span>Anunciar</span>
          </nav>
          <span className="inline-flex items-center gap-1 rounded-full border border-(--m-ink)/20 px-3 py-1.5 text-[10px] font-semibold">
            <Heart className="h-3 w-3" /> {favs.length} favoritos
          </span>
        </header>

        {/* Hero com busca */}
        <section className="relative h-64 overflow-hidden">
          <Image src="/models/imovel-casa-piscina.jpg" alt="Casa com piscina" fill sizes="700px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="absolute inset-x-5 top-6 max-w-[46ch] text-white">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">Imobiliária no litoral desde 2009</p>
            <h4 className="mt-1.5 text-[24px] font-extrabold leading-[1.08] tracking-tight">Encontre o imóvel que combina com a sua vida.</h4>
          </div>
          <div className="absolute inset-x-5 bottom-4 rounded-2xl bg-white p-2.5 shadow-xl">
            <div className="flex items-center gap-1">
              {(["Comprar", "Alugar"] as Deal[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setDeal(d)}
                  className={`rounded-full px-3 py-1 text-[10px] font-bold ${deal === d ? "bg-(--m-ink) text-white" : "text-(--m-ink)/65"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-(--m-ink)/45" />
                <input
                  value={query}
                  disabled={!interactive}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Bairro, tipo ou palavra-chave"
                  className="w-full rounded-lg border border-(--m-ink)/12 py-1.5 pl-7 pr-2 text-[10px] placeholder:text-(--m-ink)/45 focus:border-(--m-accent) focus:outline-none"
                />
              </div>
              <div className="flex gap-1">
                {(["Todos", "Centro", "Praia", "Jardins"] as Zone[]).map((z) => (
                  <button
                    key={z}
                    type="button"
                    disabled={!interactive}
                    onClick={() => setZone(z)}
                    className={`rounded-lg px-2 py-1.5 text-[9.5px] font-semibold ${zone === z ? "bg-(--m-accent) text-(--m-on-accent)" : "bg-(--m-bg) text-(--m-ink)/75"}`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="px-5 py-5">
          <div className="flex items-end justify-between gap-2">
            <SectionHead eyebrow={deal === "Comprar" ? "À venda" : "Para alugar"} title={`${results.length} imóveis encontrados`} />
            <span className="text-[9.5px] text-(--m-ink)/60">Ordenar: mais recentes</span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {results.length === 0 && (
              <p className="rounded-xl border border-dashed border-(--m-ink)/20 p-4 text-center text-[10.5px] text-(--m-ink)/65 sm:col-span-2">
                Nenhum imóvel com esse filtro. Tente outro bairro.
              </p>
            )}
            {results.map((l) => {
              const fav = favs.includes(l.id);
              const booked = visit === l.id;
              return (
                <article key={l.id} className="overflow-hidden rounded-2xl border border-(--m-ink)/10 bg-white shadow-2xs">
                  <div className="relative h-32">
                    <Image src={l.img} alt={l.title} fill sizes="320px" className="object-cover" />
                    <span className="absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-bold">{l.tag}</span>
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => toggleFav(l.id)}
                      aria-label={`Favoritar ${l.title}`}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/95"
                    >
                      <Heart className={`h-3 w-3 ${fav ? "fill-rose-500 text-rose-500" : "text-(--m-ink)"}`} />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[13px] font-extrabold text-(--m-accent-ink)">{fmt(l.price, l.deal)}</p>
                    <p className="text-[11px] font-bold">{l.title}</p>
                    <p className="flex items-center gap-1 text-[9.5px] text-(--m-ink)/65">
                      <MapPin className="h-2.5 w-2.5" /> {l.zone}
                    </p>
                    <div className="mt-2 flex items-center gap-3 border-t border-(--m-ink)/8 pt-2 text-[9.5px] text-(--m-ink)/75">
                      <span className="inline-flex items-center gap-1"><BedDouble className="h-3 w-3" />{l.beds}</span>
                      <span className="inline-flex items-center gap-1"><Bath className="h-3 w-3" />{l.baths}</span>
                      <span className="inline-flex items-center gap-1"><Car className="h-3 w-3" />{l.cars}</span>
                      <span>{l.area} m²</span>
                    </div>
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => setVisit(booked ? null : l.id)}
                      className={`mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-bold transition-colors ${
                        booked ? "bg-emerald-50 text-emerald-700" : "bg-(--m-ink) text-white hover:bg-(--m-ink)/90"
                      }`}
                    >
                      <Calendar className="h-3 w-3" /> {booked ? "Visita pedida · sábado 10h" : "Agendar visita"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-(--m-bg) px-5 py-6">
          <SectionHead eyebrow="Por que a gente" title="Do primeiro clique à chave na mão" />
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {[
              [ShieldCheck, "Documentação conferida", "Matrícula e certidões checadas antes de você visitar."],
              [Sparkles, "Fotos e tour reais", "Todo imóvel com fotos profissionais e medidas certas."],
              [KeyRound, "Financiamento assistido", "Simulamos com os bancos e acompanhamos até a assinatura."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <div key={t as string} className="rounded-xl bg-white p-3 shadow-2xs">
                  <I className="h-4 w-4 text-(--m-accent-ink)" />
                  <p className="mt-2 text-[11px] font-bold">{t as string}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-(--m-ink)/70">{d as string}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["1.800+", "imóveis negociados"],
              ["15 anos", "no litoral"],
              ["4,8 ★", "no Google"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-(--m-ink)/10 bg-white py-2.5">
                <p className="text-[15px] font-extrabold">{n}</p>
                <p className="text-[9px] text-(--m-ink)/60">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Anuncie */}
        <section className="m-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-(--m-ink) p-4 text-white">
          <div>
            <p className="text-[13px] font-extrabold">Quer vender ou alugar seu imóvel?</p>
            <p className="text-[10px] text-white/70">Avaliação gratuita em até 48 horas.</p>
          </div>
          <span className="rounded-full bg-(--m-accent) px-3.5 py-2 text-[10.5px] font-bold text-(--m-on-accent)">Anunciar meu imóvel</span>
        </section>

        <MockFooter
          brand={brand}
          note="CRECI 12.345-J · Atendimento de segunda a sábado."
          columns={[
            { title: "Imóveis", items: ["Comprar", "Alugar", "Lançamentos"] },
            { title: "Empresa", items: ["Sobre", "Corretores", "Blog"] },
            { title: "Contato", items: ["WhatsApp", "(13) 3221-4400", "Av. Beira-Mar, 1200"] },
          ]}
        />
      </div>
    </BrowserShell>
  );
}
