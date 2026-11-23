import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

/** Barra fixa no rodapé do celular: WhatsApp + orçamento sempre a um toque. */
export function MobileActionBar() {
  const waUrl = buildWhatsAppUrl(`Olá! Vim pelo site (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-(--fg)/12 bg-(--bg)/95 pb-[calc(10px+env(safe-area-inset-bottom,0px))] pl-[max(12px,env(safe-area-inset-left,0px))] pr-[max(12px,env(safe-area-inset-right,0px))] pt-2.5 backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-(--fg)/25 px-4 text-sm font-semibold text-(--fg)"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href="#orcamento"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-(--ink) px-4 text-sm font-semibold text-(--on-ink)"
        >
          Montar meu orçamento
          <ArrowRight className="h-4 w-4 text-(--accent-text)" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
