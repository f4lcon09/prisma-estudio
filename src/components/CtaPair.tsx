import { ArrowRight, MousePointerClick } from "lucide-react";

/** Frase de risco que acompanha todo CTA principal. */
export const riskLine = "Proposta com prazo e preço fechados · Acompanhe cada etapa online · Sem compromisso";

interface CtaPairProps {
  /** "light" para fundos claros, "dark" para a faixa escura de serviços. */
  tone?: "light" | "dark";
  align?: "center" | "start";
  showSecondary?: boolean;
  className?: string;
}

/**
 * Par de CTA repetido no fim de cada seção:
 * principal sólido (monta o orçamento) + secundário em contorno (testa um modelo).
 */
export function CtaPair({ tone = "light", align = "center", showSecondary = true, className = "" }: CtaPairProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-2.5 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <div className={`flex flex-wrap gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href="#orcamento"
          className={`ps-hero-cta inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors sm:min-h-11 sm:text-sm ${
            dark
              ? "bg-[#EAE3D5] text-[#1A1715] hover:bg-[#FAF6EE] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
              : "bg-[#1A1715] text-[#EAE3D5] hover:bg-[#2E2924] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
          }`}
        >
          <span>Montar meu orçamento</span>
          <ArrowRight
            className={`h-4 w-4 ${dark ? "text-[#8E6F3E]" : "text-[#B08D57]"} dark:text-[#FAF6EE]`}
            aria-hidden="true"
          />
        </a>
        {showSecondary && (
          <a
            href="#projetos"
            className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold transition-colors sm:min-h-11 sm:text-sm ${
              dark
                ? "border-[#EAE3D5]/35 text-[#EAE3D5] hover:border-[#EAE3D5] dark:border-[#ECE5D8]/30 dark:text-[#ECE5D8]"
                : "border-[#1A1715]/25 text-[#1A1715] hover:border-[#1A1715] dark:border-[#ECE5D8]/25 dark:text-[#ECE5D8] dark:hover:border-[#ECE5D8]"
            }`}
          >
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            <span>Testar um modelo</span>
          </a>
        )}
      </div>
      <p
        className={`max-w-[46ch] text-xs leading-relaxed ${
          dark ? "text-[#EAE3D5]/70 dark:text-[#A8A095]" : "text-[#5C5348] dark:text-[#A8A095]"
        }`}
      >
        {riskLine}
      </p>
    </div>
  );
}
