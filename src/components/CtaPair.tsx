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
          className="ps-prism-cta inline-flex min-h-14 items-center gap-2.5 rounded-full bg-(--ink) px-8 text-base font-semibold text-(--on-ink) hover:bg-(--ink-hover)"
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
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-(--glass-border) bg-(--glass) px-6 text-base font-semibold text-(--fg) shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 transition-colors hover:text-(--accent-text)"
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
