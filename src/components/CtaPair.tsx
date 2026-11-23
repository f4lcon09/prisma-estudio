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
export function CtaPair({ align = "center", showSecondary = true, className = "" }: CtaPairProps) {
  return (
    <div
      className={`flex flex-col gap-2.5 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <div className={`flex flex-wrap gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href="#orcamento"
          className={`ps-hero-cta inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors sm:min-h-11 sm:text-sm ${
            "bg-(--accent) text-(--on-accent) hover:bg-(--accent-hover)"
          }`}
        >
          <span>Montar meu orçamento</span>
          <ArrowRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </a>
        {showSecondary && (
          <a
            href="#projetos"
            className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold transition-colors sm:min-h-11 sm:text-sm ${
              "border-(--accent-text) text-(--accent-text) hover:bg-(--accent-text)/8"
            }`}
          >
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            <span>Testar um modelo</span>
          </a>
        )}
      </div>
      <p
        className={`max-w-[46ch] text-xs leading-relaxed ${
          "text-(--fg-2)"
        }`}
      >
        {riskLine}
      </p>
    </div>
  );
}
