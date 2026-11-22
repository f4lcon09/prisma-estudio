"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, PackageSearch, X } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-[#1A1715]/12 bg-[#EAE3D5]/90 backdrop-blur-md transition-colors duration-300 dark:border-[#ECE5D8]/12 dark:bg-[#17181A]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[#1A1715] focus:outline-none dark:text-[#ECE5D8]"
        >
          <BrandLogo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[17px] font-extrabold tracking-tight text-[#1A1715] dark:text-[#ECE5D8]">
            prisma<span className="text-[#8E6F3E] dark:text-[#B08D57]">.estudio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5C5348] transition-colors hover:text-[#1A1715] dark:text-[#A8A095] dark:hover:text-[#ECE5D8]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/acompanhar"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              isTracking
                ? "bg-[#1A1715] text-[#EAE3D5] dark:bg-[#B7410E] dark:text-[#FAF6EE]"
                : "border border-[#1A1715]/15 bg-[#DFD6C5]/75 text-[#1A1715] hover:border-[#B08D57] hover:text-[#8E6F3E] dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:border-[#B08D57] dark:hover:text-[#B08D57]"
            }`}
          >
            <PackageSearch className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acompanhar pedido</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1715] bg-[#1A1715] px-3 py-1.5 text-xs font-semibold text-[#EAE3D5] shadow-2xs transition-all hover:border-[#8E6F3E] hover:bg-[#231F1C] hover:text-[#FAF6EE] sm:gap-2 sm:px-4 sm:py-2 dark:border-[#ECE5D8]/20 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:border-[#B7410E] dark:hover:bg-[#B7410E] dark:hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#B08D57]" aria-hidden="true" />
            <span className="hidden sm:inline">Fale Conosco</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1715]/15 bg-[#FAF6EE] text-[#1A1715] md:hidden dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8]"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#1A1715]/12 bg-[#FAF6EE] px-6 py-4 md:hidden dark:border-[#ECE5D8]/12 dark:bg-[#202226]">
          <nav className="flex flex-col gap-3" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm font-medium text-[#1A1715] dark:text-[#ECE5D8]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/acompanhar"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#1A1715]/15 bg-[#DFD6C5]/70 px-3 py-2 text-sm font-semibold text-[#1A1715] dark:border-[#ECE5D8]/15 dark:bg-[#17181A] dark:text-[#ECE5D8]"
            >
              <PackageSearch className="h-4 w-4 text-[#B08D57]" aria-hidden="true" />
              <span>Acompanhar pedido</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
