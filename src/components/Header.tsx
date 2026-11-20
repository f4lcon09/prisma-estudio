"use client";

import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/BrandLogo";

const navLinks = [
  { href: "#vitrine", label: "Vitrine" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#orcamento", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const defaultWaUrl = buildWhatsAppUrl(
    `Olá! Vim pelo portfólio (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a
          href="#"
          className="group flex items-center gap-2.5 text-slate-900 focus:outline-none"
        >
          <BrandLogo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[17px] font-extrabold tracking-tight text-slate-950">
            prisma<span className="text-[#2563EB]">.estudio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs font-semibold text-emerald-900 shadow-2xs transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600 group-hover:text-white" aria-hidden="true" />
            <span>Fale Conosco</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm font-medium text-slate-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
