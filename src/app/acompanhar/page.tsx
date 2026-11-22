import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Header } from "@/components/Header";
import { OrderTracker } from "@/components/OrderTracker";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Acompanhar pedido — ${siteConfig.brandName}`,
  description:
    "Consulte a etapa atual e a data estimada de entrega do seu site, sistema ou automação.",
};

export default function AcompanharPage() {
  const footerWaUrl = buildWhatsAppUrl(
    `Olá! Vim pela página de acompanhamento (${siteConfig.brandName}) e gostaria de conversar.`
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Voltar para a vitrine</span>
          </Link>
        </div>

        <OrderTracker />
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
      </footer>
    </div>
  );
}
