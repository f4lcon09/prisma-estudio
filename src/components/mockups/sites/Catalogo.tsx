"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, MessageCircle, Minus, Plus, ShoppingBag, Store, Truck } from "lucide-react";
import { BrowserShell } from "@/components/mockups/BrowserShell";
import { useBrandLabel } from "@/components/mockups/MockupCustomization";
import { MockFooter, SectionHead } from "@/components/mockups/kit";

type Category = "Todos" | "Padaria" | "Frios" | "Cafés";

const products = [
  { id: "p1", name: "Pão de fermentação natural", cat: "Padaria", unit: "unid. 800 g", price: 24, img: "/models/emporio-paes.jpg" },
  { id: "p2", name: "Queijo canastra meia-cura", cat: "Frios", unit: "peça 500 g", price: 58, img: "/models/emporio-queijos.jpg" },
  { id: "p3", name: "Café especial torra média", cat: "Cafés", unit: "pacote 250 g", price: 42, img: "/models/emporio-cafe.jpg" },
  { id: "p4", name: "Pão rústico de centeio", cat: "Padaria", unit: "unid. 600 g", price: 19, img: "/models/emporio-pao-tabua.jpg" },
] as const;

const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

export function SiteCatalogoInteractive({ interactive = true }: { interactive?: boolean }) {
  const brand = useBrandLabel("Empório Central");
  const [cat, setCat] = useState<Category>("Todos");
  const [qty, setQty] = useState<Record<string, number>>({ p1: 1, p2: 1 });
  const [pix, setPix] = useState(true);
  const [pickup, setPickup] = useState(true);
  const [sent, setSent] = useState(false);

  function change(id: string, d: number) {
    if (!interactive) return;
    setSent(false);
    setQty((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + d) }));
  }

  const items = products.filter((p) => (qty[p.id] ?? 0) > 0);
  const count = items.reduce((n, p) => n + (qty[p.id] ?? 0), 0);
  const subtotal = items.reduce((n, p) => n + p.price * (qty[p.id] ?? 0), 0);
  const total = subtotal * (pix ? 0.95 : 1) + (pickup || subtotal === 0 ? 0 : 8);
  const visible = products.filter((p) => cat === "Todos" || p.cat === cat);

  return (
    <BrowserShell url="prisma.estudio/modelos/emporio-central" palette="catalogo">
      <div className="bg-white text-left text-(--m-ink)">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-(--m-ink)/8 bg-white/95 px-5 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--m-accent) text-(--m-on-accent)">
              <Store className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-extrabold tracking-tight">{brand}</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--m-ink) px-3 py-1.5 text-[10px] font-bold text-white">
            <ShoppingBag className="h-3 w-3" /> {count} {count === 1 ? "item" : "itens"} · {brl(total)}
          </span>
        </header>

        {/* Hero */}
        <section className="relative h-44 overflow-hidden">
          <Image src="/models/emporio-padaria.jpg" alt="Vitrine do empório" fill sizes="700px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-y-0 left-5 flex max-w-[40ch] flex-col justify-center text-white">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">Padaria · Frios · Cafés</p>
            <h4 className="mt-1.5 text-[22px] font-extrabold leading-[1.08] tracking-tight">Monte seu pedido e retire em 20 minutos.</h4>
            <p className="mt-1.5 text-[10.5px] text-white/80">O pedido chega pronto no nosso WhatsApp. Sem cadastro e sem app.</p>
          </div>
        </section>

        <div className="grid grid-cols-3 border-b border-(--m-ink)/8 text-[9.5px] font-semibold">
          <span className="flex items-center justify-center gap-1 py-2"><Clock className="h-3 w-3 text-(--m-accent-ink)" /> Aberto até 20h</span>
          <span className="flex items-center justify-center gap-1 border-x border-(--m-ink)/8 py-2"><Truck className="h-3 w-3 text-(--m-accent-ink)" /> Entrega no bairro</span>
          <span className="flex items-center justify-center gap-1 py-2"><MapPin className="h-3 w-3 text-(--m-accent-ink)" /> Rua do Comércio, 88</span>
        </div>

        {/* Produtos + sacola */}
        <section className="grid gap-4 px-5 py-5 sm:grid-cols-[1.45fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-1.5">
              {(["Todos", "Padaria", "Frios", "Cafés"] as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold ${cat === c ? "bg-(--m-ink) text-white" : "bg-(--m-bg) text-(--m-ink)/75"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {visible.map((p) => (
                <article key={p.id} className="overflow-hidden rounded-xl border border-(--m-ink)/10">
                  <div className="relative h-24">
                    <Image src={p.img} alt={p.name} fill sizes="200px" className="object-cover" />
                  </div>
                  <div className="p-2">
                    <p className="line-clamp-2 min-h-[2.4em] text-[10.5px] font-bold leading-tight">{p.name}</p>
                    <p className="text-[9px] text-(--m-ink)/60">{p.unit}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold">{brl(p.price)}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" disabled={!interactive} onClick={() => change(p.id, -1)} aria-label={`Tirar ${p.name}`} className="flex h-5 w-5 items-center justify-center rounded-md border border-(--m-ink)/15">
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-3 text-center text-[10px] font-bold">{qty[p.id] ?? 0}</span>
                        <button type="button" disabled={!interactive} onClick={() => change(p.id, 1)} aria-label={`Adicionar ${p.name}`} className="flex h-5 w-5 items-center justify-center rounded-md bg-(--m-accent) text-(--m-on-accent)">
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-(--m-ink)/12 bg-(--m-bg) p-3">
            <p className="text-[11.5px] font-extrabold">Sua sacola</p>
            <ul className="mt-2 grid gap-1 text-[10px]">
              {items.length === 0 && <li className="text-(--m-ink)/60">Adicione produtos ao lado.</li>}
              {items.map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span className="truncate">{qty[p.id]}× {p.name}</span>
                  <span className="font-semibold">{brl(p.price * (qty[p.id] ?? 0))}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 grid grid-cols-2 gap-1 rounded-lg bg-white p-0.5">
              {[
                [true, "Retirar"],
                [false, "Entregar"],
              ].map(([v, l]) => (
                <button
                  key={l as string}
                  type="button"
                  disabled={!interactive}
                  onClick={() => setPickup(v as boolean)}
                  className={`rounded-md py-1 text-[9.5px] font-semibold ${pickup === v ? "bg-(--m-ink) text-white" : "text-(--m-ink)/65"}`}
                >
                  {l as string}
                </button>
              ))}
            </div>
            <label className="mt-2 flex cursor-pointer items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[10px]">
              <span>Pagar no Pix (5% off)</span>
              <input type="checkbox" checked={pix} disabled={!interactive} onChange={() => setPix((v) => !v)} className="accent-(--m-accent)" />
            </label>
            <div className="mt-2 flex justify-between border-t border-(--m-ink)/10 pt-2 text-[11px] font-extrabold">
              <span>Total</span>
              <span>{brl(total)}</span>
            </div>
            <button
              type="button"
              disabled={!interactive || count === 0}
              onClick={() => setSent(true)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-[10.5px] font-bold text-white disabled:opacity-50"
            >
              <MessageCircle className="h-3 w-3" /> Enviar pedido no WhatsApp
            </button>
            {sent && (
              <div className="mt-2 rounded-lg bg-[#DCF8C6] p-2 text-[9.5px] leading-relaxed text-[#1F2C34]">
                <p className="font-bold">Pedido #2471</p>
                {items.map((p) => (
                  <p key={p.id}>{qty[p.id]}× {p.name}</p>
                ))}
                <p>{pickup ? "Retirada na loja" : "Entrega no bairro"} · {pix ? "Pix" : "Cartão"} · {brl(total)}</p>
              </div>
            )}
          </aside>
        </section>

        {/* Como funciona */}
        <section className="bg-(--m-bg) px-5 py-6">
          <SectionHead eyebrow="Como funciona" title="Três passos, sem app" center />
          <ol className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {[
              ["Escolha", "Monte a sacola com o que precisa."],
              ["Envie", "O pedido abre pronto no WhatsApp da loja."],
              ["Retire", "Avisamos quando estiver separado."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-xl bg-white p-3 text-center shadow-2xs">
                <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-(--m-accent) text-[10px] font-bold text-(--m-on-accent)">{i + 1}</span>
                <p className="mt-1.5 text-[11px] font-bold">{t}</p>
                <p className="text-[10px] text-(--m-ink)/70">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <MockFooter
          brand={brand}
          note="Pães de fermentação natural, frios selecionados e cafés especiais."
          columns={[
            { title: "Loja", items: ["Rua do Comércio, 88", "Seg a sáb 7h–20h", "Dom 7h–13h"] },
            { title: "Pedidos", items: ["Retirada", "Entrega no bairro", "Cestas"] },
            { title: "Contato", items: ["WhatsApp", "Instagram", "(41) 3333-1020"] },
          ]}
        />
      </div>
    </BrowserShell>
  );
}
