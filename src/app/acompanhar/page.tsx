import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { OrderTracker } from "@/components/OrderTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Acompanhar pedido — ${siteConfig.brandName}`,
  description:
    "Consulte a etapa atual e a data estimada de entrega do seu site, sistema ou automação.",
};

export default function AcompanharPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#EAE3D5] dark:bg-[#17181A]">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5348] transition-colors hover:text-[#1A1715] dark:text-[#A8A095] dark:hover:text-[#ECE5D8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Voltar para a vitrine</span>
          </Link>
        </div>

        <OrderTracker />
      </main>

      <SiteFooter
        waContextMessage={`Olá! Vim pela página de acompanhamento (${siteConfig.brandName}) e gostaria de conversar.`}
        showTrackingLink={false}
      />
    </div>
  );
}
