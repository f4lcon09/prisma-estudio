"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";
import { MockFooter } from "@/components/mockups/kit";

const fashionItems = {
  blazer: {
    name: "Blazer Linho Cru",
    shortLabel: "Blazer",
    collection: "DROP 04 · LINHO ITALIANO",
    price: 389,
    installment: "3x R$ 129,66",
    swatch: "#DFD1B8",
    image: "/fashion/look-blazer.jpg",
    lookCode: "LOOK 01",
    badge: "Bestseller",
  },
  trench: {
    name: "Trench Terracota",
    shortLabel: "Trench",
    collection: "EDIÇÃO LIMITADA · SÃO PAULO",
    price: 540,
    installment: "3x R$ 180,00",
    swatch: "#B9512A",
    image: "/fashion/look-trench.jpg",
    lookCode: "LOOK 04",
    badge: "Últimas peças",
  },
  conjunto: {
    name: "Conjunto Alfaiataria Noite",
    shortLabel: "Noite",
    collection: "ESSENCIAIS · LÃ FRIA",
    price: 490,
    installment: "3x R$ 163,33",
    swatch: "#1F2A44",
    image: "/fashion/look-conjunto.jpg",
    lookCode: "LOOK 07",
    badge: "Novo drop",
  },
} as const;

const fashionSizes = ["PP", "P", "M", "G", "GG"] as const;

export function SiteModaVendasInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Atelier Verso");
  const [itemKey, setItemKey] = useState<keyof typeof fashionItems>("blazer");
  const [size, setSize] = useState<(typeof fashionSizes)[number]>("M");
  const [bag, setBag] = useState<{ key: keyof typeof fashionItems; size: string; qty: number }[]>([{ key: "blazer", size: "M", qty: 1 }]);
  const [bagOpen, setBagOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bagCount = bag.reduce((n, l) => n + l.qty, 0);
  const subtotal = bag.reduce((n, l) => n + fashionItems[l.key].price * l.qty, 0);
  const freeShipping = 600;

  const product = fashionItems[itemKey];
  const pixPrice = Math.round(product.price * 0.95);

  function openBag() {
    if (!interactive) return;
    // a página do mockup rola dentro da janela: volta ao topo para o painel aparecer inteiro
    rootRef.current?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
    setOrdered(false);
    setBagOpen(true);
  }

  function changeLine(i: number, d: number) {
    setBag((prev) => prev.map((l, idx) => (idx === i ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0));
  }

  function handleAdd() {
    if (!interactive) return;
    setBag((prev) => {
      const i = prev.findIndex((l) => l.key === itemKey && l.size === size);
      if (i >= 0) return prev.map((l, idx) => (idx === i ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { key: itemKey, size, qty: 1 }];
    });
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 1200);
  }

  return (
    <BrowserShell url="prisma.estudio/modelos/atelier-verso" palette="moda">
      <div ref={rootRef} className="relative bg-[#FAF6EE] text-left text-(--m-ink)">
        {/* Top Luxury Campaign Strip */}
        <div className="font-tech flex items-center justify-between gap-3 bg-(--m-ink) px-4 py-1 text-[8.5px] tracking-[0.15em] text-(--m-bg)/90">
          <span className="whitespace-nowrap">COLEÇÃO OUTONO · DROP 04</span>
          <span className="hidden whitespace-nowrap text-(--m-bg) lg:inline">5% NO PIX</span>
          <span className="whitespace-nowrap">ENVIO 24H</span>
        </div>

        {/* Editorial Store Header */}
        <div className="flex items-center justify-between gap-2 border-b border-(--m-ink)/10 px-4 py-2.5">
          <div className="hidden items-center gap-3 text-[9px] font-medium uppercase tracking-[0.12em] text-(--m-ink)/70 sm:flex">
            <span>Novidades</span>
            <span>Lookbook</span>
          </div>

          <span className="font-editorial text-[16px] font-semibold uppercase tracking-[0.2em] text-(--m-ink)">
            {brand}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!interactive}
              onClick={openBag}
              className="inline-flex items-center gap-1 rounded-full border border-(--m-ink)/15 bg-white px-2.5 py-1 text-[9.5px] font-semibold text-(--m-ink) hover:border-(--m-ink)/40"
            >
              <ShoppingBag className="h-2.5 w-2.5 text-(--m-accent-ink)" />
              <span>Sacola ({bagCount})</span>
            </button>
          </div>
        </div>


        {/* Sacola lateral */}
        {bagOpen && (
          <div className="absolute inset-x-0 top-0 z-30 flex h-(--mock-h,560px) max-h-full justify-end">
            <button type="button" aria-label="Fechar sacola" onClick={() => setBagOpen(false)} className="absolute inset-0 bg-(--m-ink)/35" />
            <aside className="relative flex h-full w-[min(82%,300px)] flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-(--m-ink)/10 px-3.5 py-3">
                <p className="font-editorial text-[15px] font-semibold">Sua sacola · {bagCount}</p>
                <button type="button" onClick={() => setBagOpen(false)} aria-label="Fechar" className="rounded-full p-1 hover:bg-(--m-ink)/5">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {ordered ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-1.5 p-4 text-center">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                  <p className="font-editorial text-[16px] font-semibold">Pedido AV-2048 confirmado</p>
                  <p className="text-[10px] text-(--m-ink)/70">Pix de R$ {Math.round(subtotal * 0.95)},00 aprovado. Envio em 24h com rastreio no WhatsApp.</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-3.5 py-2">
                    {bag.length === 0 && <p className="py-6 text-center text-[10.5px] text-(--m-ink)/65">Sua sacola está vazia.</p>}
                    {bag.map((l, i) => {
                      const it = fashionItems[l.key];
                      return (
                        <div key={`${l.key}-${l.size}`} className="flex gap-2.5 border-b border-(--m-ink)/8 py-2.5">
                          <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-[#DFD6C5]">
                            <Image src={it.image} alt={it.name} fill sizes="48px" className="object-cover object-top" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[10.5px] font-semibold">{it.name}</p>
                            <p className="text-[9px] text-(--m-ink)/65">Tam {l.size} · R$ {it.price},00</p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <button type="button" onClick={() => changeLine(i, -1)} aria-label="Diminuir" className="flex h-5 w-5 items-center justify-center rounded border border-(--m-ink)/15">
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <span className="w-3 text-center text-[10px] font-semibold">{l.qty}</span>
                              <button type="button" onClick={() => changeLine(i, 1)} aria-label="Aumentar" className="flex h-5 w-5 items-center justify-center rounded border border-(--m-ink)/15">
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                          <span className="text-[10.5px] font-semibold">R$ {it.price * l.qty}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-(--m-ink)/10 p-3.5">
                    <p className="text-[9.5px] text-(--m-ink)/70">
                      {subtotal >= freeShipping ? "Você ganhou frete grátis." : `Faltam R$ ${freeShipping - subtotal} para frete grátis.`}
                    </p>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-(--m-ink)/10">
                      <div className="h-full bg-(--m-accent)" style={{ width: `${Math.min(100, (subtotal / freeShipping) * 100)}%` }} />
                    </div>
                    <div className="mt-2.5 flex justify-between text-[11px] font-semibold">
                      <span>Subtotal</span>
                      <span>R$ {subtotal},00</span>
                    </div>
                    <p className="text-right text-[9.5px] text-(--m-accent-ink)">R$ {Math.round(subtotal * 0.95)},00 no Pix</p>
                    <button
                      type="button"
                      disabled={bag.length === 0}
                      onClick={() => setOrdered(true)}
                      className="mt-2.5 w-full rounded-lg bg-(--m-ink) py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-(--m-bg) disabled:opacity-40"
                    >
                      Finalizar compra
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        )}

        {/* Asymmetric Split Editorial Hero */}
        <div className="grid gap-3.5 p-3.5 sm:grid-cols-12 sm:items-stretch sm:p-4">
          {/* Left: Typography, Look Switcher & Quick-Buy */}
          <div className="flex flex-col justify-between sm:col-span-6">
            <div>
              <p className="font-tech text-[9px] font-semibold tracking-[0.16em] text-(--m-accent-ink)">
                {product.collection}
              </p>
              <h4 className="font-editorial mt-1.5 text-[24px] font-semibold leading-[1.06] tracking-tight text-(--m-ink)">
                Alfaiataria atemporal em <em className="italic text-(--m-accent-ink)">linho puro.</em>
              </h4>

              {/* Piece & Price */}
              <div className="mt-2.5 flex items-baseline justify-between border-b border-(--m-ink)/10 pb-2">
                <div>
                  <p className="text-[11px] font-bold text-(--m-ink)">{product.name}</p>
                  <p className="text-[9.5px] text-(--m-ink)/70">{product.installment} sem juros</p>
                </div>
                <div className="text-right">
                  <p className="font-tech text-xs font-extrabold text-(--m-ink)">
                    R$ {product.price},00
                  </p>
                  <p className="font-tech text-[9px] font-semibold text-(--m-accent-ink)">
                    R$ {pixPrice} no Pix
                  </p>
                </div>
              </div>

              {/* 3 Real Photo Thumbnails to Swap Editorial Look */}
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {(Object.keys(fashionItems) as (keyof typeof fashionItems)[]).map((key) => {
                  const active = itemKey === key;
                  const entry = fashionItems[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!interactive}
                      onClick={() => interactive && setItemKey(key)}
                      className={`group/thumb flex items-center gap-1.5 rounded-lg border p-1 text-left transition-all ${
                        active
                          ? "border-(--m-ink) bg-white shadow-2xs"
                          : "border-(--m-ink)/10 bg-[#FAF6EE] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="relative h-8 w-6 shrink-0 overflow-hidden rounded">
                        <Image
                          src={entry.image}
                          alt={entry.name}
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="truncate text-[9px] font-semibold text-(--m-ink)">
                        {entry.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Matrix & Buy CTA */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-[9px] text-(--m-ink)/70">
                <span className="font-semibold uppercase tracking-wider">Tamanho</span>
                <span>Guia de medidas</span>
              </div>

              <div className="grid grid-cols-5 gap-1">
                {fashionSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={!interactive}
                    onClick={() => interactive && setSize(s)}
                    className={`font-tech rounded-md border py-1 text-[9.5px] font-bold transition-colors ${
                      size === s
                        ? "border-(--m-ink) bg-(--m-ink) text-(--m-bg)"
                        : "border-(--m-ink)/15 bg-white text-(--m-ink)/70 hover:border-(--m-ink)/40"
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
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-(--m-ink) py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-(--m-bg) transition-colors hover:bg-(--m-accent)"
              >
                <ShoppingBag className="h-3 w-3 text-(--m-bg)" />
                <span>
                  {addedFlash ? "Adicionado à sacola ✓" : `Adicionar · Tam ${size}`}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Full-Bleed Fashion Campaign Photograph */}
          <div className="relative min-h-[252px] overflow-hidden rounded-xl border border-(--m-ink)/12 bg-[#DFD6C5] sm:col-span-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className="object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
              <span className="font-tech rounded bg-(--m-ink)/85 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-(--m-bg) backdrop-blur-xs">
                {product.badge}
              </span>
              <span className="font-tech rounded bg-white/85 px-1.5 py-0.5 text-[8px] font-bold text-(--m-ink) backdrop-blur-xs">
                {product.lookCode}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-(--m-ink)/85 via-(--m-ink)/35 to-transparent p-3 text-(--m-bg)">
              <p className="font-editorial text-sm font-semibold leading-tight">
                {product.name}
              </p>
              <p className="font-tech mt-0.5 text-[8.5px] uppercase tracking-[0.14em] text-(--m-bg)/80">
                Corte exclusivo · Envio imediato
              </p>
            </div>
          </div>
        </div>

        {/* Lookbook */}
        <section className="border-t border-(--m-ink)/10 px-4 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-tech text-[8.5px] uppercase tracking-[0.18em] text-(--m-accent-ink)">Lookbook · Outono</p>
              <h5 className="font-editorial mt-1 text-[20px] font-semibold leading-tight">Três jeitos de usar linho</h5>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4">Ver coleção</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(Object.keys(fashionItems) as (keyof typeof fashionItems)[]).map((key) => {
              const it = fashionItems[key];
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setItemKey(key)}
                  className={`group/look text-left ${itemKey === key ? "opacity-100" : "opacity-85 hover:opacity-100"}`}
                >
                  <span className="relative block h-36 overflow-hidden rounded-lg bg-[#DFD6C5]">
                    <Image src={it.image} alt={it.name} fill sizes="200px" className="object-cover object-top transition-transform duration-500 group-hover/look:scale-[1.04]" />
                  </span>
                  <span className="mt-1.5 block text-[10px] font-semibold">{it.name}</span>
                  <span className="font-tech block text-[9px] text-(--m-ink)/70">R$ {it.price},00</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Benefícios */}
        <div className="grid grid-cols-2 gap-px border-y border-(--m-ink)/10 bg-(--m-ink)/10 text-center sm:grid-cols-4">
          {[
            ["Envio em 24h", "para capitais"],
            ["Troca grátis", "em até 30 dias"],
            ["5% no Pix", "em qualquer peça"],
            ["3x sem juros", "no cartão"],
          ].map(([t, d]) => (
            <div key={t} className="bg-[#FAF6EE] px-2 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em]">{t}</p>
              <p className="text-[9px] text-(--m-ink)/65">{d}</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <section className="grid items-center gap-3 bg-(--m-bg) px-4 py-5 sm:grid-cols-2">
          <div>
            <h5 className="font-editorial text-[18px] font-semibold leading-tight">Receba o próximo drop antes de todo mundo.</h5>
            <p className="mt-1 text-[10px] text-(--m-ink)/70">Uma mensagem por lançamento. Sem spam.</p>
          </div>
          <div className="flex gap-1.5">
            <span className="flex-1 rounded-md border border-(--m-ink)/20 bg-white px-2.5 py-2 text-[10px] text-(--m-ink)/50">seu@email.com</span>
            <span className="rounded-md bg-(--m-ink) px-3 py-2 text-[9.5px] font-bold uppercase tracking-[0.1em] text-(--m-bg)">Quero</span>
          </div>
        </section>

        <MockFooter
          brand={brand}
          note="Alfaiataria atemporal em fibras naturais, feita em pequenos lotes."
          columns={[
            { title: "Loja", items: ["Novidades", "Lookbook", "Essenciais"] },
            { title: "Ajuda", items: ["Trocas", "Guia de medidas", "Envio"] },
            { title: "Ateliê", items: ["Sobre", "Instagram", "Contato"] },
          ]}
        />
      </div>
    </BrowserShell>
  );
}


export { SiteClinicaInteractive } from "@/components/mockups/sites/Clinica";
export { SiteImobiliariaInteractive } from "@/components/mockups/sites/Imobiliaria";
export { SiteCatalogoInteractive } from "@/components/mockups/sites/Catalogo";
