"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PackageSearch, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <header className="sticky top-0 z-40 border-b border-(--hairline) bg-(--glass) backdrop-blur-xl backdrop-saturate-[1.8] transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-(--fg) focus:outline-none"
        >
          <BrandLogo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[17px] font-extrabold tracking-tight text-(--fg)">
            prisma<span className="text-(--accent-text)">.estudio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-(--fg-2) transition-colors hover:text-(--fg)"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/acompanhar"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              isTracking
                ? "bg-(--ink) text-(--on-ink)"
                : "border border-(--fg)/15 bg-(--bg-alt)/75 text-(--fg) hover:border-(--accent) hover:text-(--accent-text)"
            }`}
          >
            <PackageSearch className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acompanhar pedido</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="#orcamento"
            className="ps-prism-cta hidden items-center rounded-full bg-(--ink) px-4 py-2 text-xs font-semibold text-(--on-ink) transition-colors hover:bg-(--ink-hover) lg:inline-flex"
          >
            Montar orçamento
          </a>

          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-(--hairline) bg-(--surface) px-3 py-1.5 text-xs font-semibold text-(--fg) shadow-2xs transition-colors hover:border-(--fg)/30 md:inline-flex sm:gap-2 sm:px-4 sm:py-2"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
            <span className="hidden sm:inline">Fale Conosco</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--fg)/15 bg-(--surface) text-(--fg) lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-(--fg)/12 bg-(--surface) px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm font-medium text-(--fg)"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/acompanhar"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-(--fg)/15 bg-(--bg-alt)/70 px-3 py-2 text-sm font-semibold text-(--fg)"
            >
              <PackageSearch className="h-4 w-4 text-(--accent-text)" aria-hidden="true" />
              <span>Acompanhar pedido</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
