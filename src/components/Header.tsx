"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, PackageSearch, X } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/BrandLogo";

const navLinks = [
  { href: "/#vitrine", label: "Vitrine" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#orcamento", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isTracking = pathname === "/acompanhar";

  const defaultWaUrl = buildWhatsAppUrl(
    `Olá! Vim pelo portfólio (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-slate-900 focus:outline-none"
        >
          <BrandLogo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[17px] font-extrabold tracking-tight text-slate-950">
            prisma<span className="text-[#2563EB]">.estudio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/acompanhar"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              isTracking
                ? "bg-blue-600 text-white"
                : "border border-blue-200 bg-blue-50/70 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <PackageSearch className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acompanhar pedido</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs font-semibold text-emerald-900 shadow-2xs transition-all hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            <span className="hidden sm:inline">Fale Conosco</span>
            <span className="sm:hidden">WhatsApp</span>
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm font-medium text-slate-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/acompanhar"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
            >
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
              <span>Acompanhar pedido</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
