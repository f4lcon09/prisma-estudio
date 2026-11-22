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
    <header className="sticky top-0 z-40 border-b border-[#1F2A44]/12 bg-[#F4EDE0]/90 backdrop-blur-md transition-colors duration-300 dark:border-[#F2EFE6]/12 dark:bg-[#182032]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[#1F2A44] focus:outline-none dark:text-[#F2EFE6]"
        >
          <BrandLogo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[17px] font-extrabold tracking-tight text-[#1F2A44] dark:text-[#F2EFE6]">
            prisma<span className="text-[#D85D2A] dark:text-[#E05A3A]">.estudio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#515C73] transition-colors hover:text-[#1F2A44] dark:text-[#A9B4C9] dark:hover:text-[#F2EFE6]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/acompanhar"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              isTracking
                ? "bg-[#D85D2A] text-white dark:bg-[#E05A3A]"
                : "border border-[#1F2A44]/15 bg-[#EFE6D6] text-[#1F2A44] hover:border-[#D85D2A]/50 hover:text-[#D85D2A] dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:border-[#E05A3A]/60 dark:hover:text-[#E05A3A]"
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
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2A44] bg-[#1F2A44] px-3 py-1.5 text-xs font-semibold text-[#F4EDE0] shadow-2xs transition-all hover:border-[#D85D2A] hover:bg-[#D85D2A] hover:text-white sm:gap-2 sm:px-4 sm:py-2 dark:border-[#F2EFE6]/20 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:border-[#E05A3A] dark:hover:bg-[#E05A3A] dark:hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#F4EDE0] dark:text-[#E05A3A]" aria-hidden="true" />
            <span className="hidden sm:inline">Fale Conosco</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB] text-[#1F2A44] md:hidden dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6]"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#1F2A44]/12 bg-[#FAF5EB] px-6 py-4 md:hidden dark:border-[#F2EFE6]/12 dark:bg-[#202B42]">
          <nav className="flex flex-col gap-3" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm font-medium text-[#1F2A44] dark:text-[#F2EFE6]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/acompanhar"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#1F2A44]/15 bg-[#EFE6D6] px-3 py-2 text-sm font-semibold text-[#1F2A44] dark:border-[#F2EFE6]/15 dark:bg-[#182032] dark:text-[#F2EFE6]"
            >
              <PackageSearch className="h-4 w-4 text-[#D85D2A] dark:text-[#E05A3A]" aria-hidden="true" />
              <span>Acompanhar pedido</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
