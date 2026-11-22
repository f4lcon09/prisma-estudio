import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServicesStrip } from "@/components/ServicesStrip";
import { ProjectBuilder } from "@/components/ProjectBuilder";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

export default function Home() {
  const footerWaUrl = buildWhatsAppUrl(
    `Olá! Vim pelo site (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <HeroStage />
        <ProjectsShowcase />
        <ServicesStrip />
        <ProjectBuilder />
      </main>

      <footer className="border-t border-slate-200/80 bg-[#F8FAFC] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-7 w-7" />
            <div>
              <p className="text-sm font-extrabold tracking-tight text-slate-950">
                prisma<span className="text-[#2563EB]">.estudio</span>
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {siteConfig.locationText} · © {siteConfig.copyrightYear}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/acompanhar"
              className="rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
            >
              Acompanhar pedido
            </Link>
            <a
              href={footerWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <span>WhatsApp direto</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
