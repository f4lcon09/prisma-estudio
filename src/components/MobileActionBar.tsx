import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

/** Barra fixa no rodapé do celular: WhatsApp + orçamento sempre a um toque. */
export function MobileActionBar() {
  const waUrl = buildWhatsAppUrl(`Olá! Vim pelo site (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1A1715]/12 bg-[#EAE3D5]/95 pb-[calc(10px+env(safe-area-inset-bottom,0px))] pl-[max(12px,env(safe-area-inset-left,0px))] pr-[max(12px,env(safe-area-inset-right,0px))] pt-2.5 backdrop-blur-md md:hidden dark:border-[#ECE5D8]/12 dark:bg-[#17181A]/95"
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[#1A1715]/25 px-4 text-sm font-semibold text-[#1A1715] dark:border-[#ECE5D8]/25 dark:text-[#ECE5D8]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href="#orcamento"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A1715] px-4 text-sm font-semibold text-[#EAE3D5] dark:bg-[#B7410E] dark:text-[#FAF6EE]"
        >
          Montar meu orçamento
          <ArrowRight className="h-4 w-4 text-[#B08D57] dark:text-[#FAF6EE]" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
