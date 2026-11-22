"use client";

import type { ProjectVariantId } from "@/config/site";
import {
  SiteCatalogoInteractive,
  SiteClinicaInteractive,
  SiteImobiliariaInteractive,
} from "@/components/mockups/SitesMockups";
import {
  SistemaAgendaInteractive,
  SistemaErpInteractive,
  SistemaPortalInteractive,
} from "@/components/mockups/SistemasMockups";
import {
  AutomacaoCobrancaInteractive,
  AutomacaoRelatorioInteractive,
  AutomacaoTriagemInteractive,
} from "@/components/mockups/AutomacoesMockups";

export function ProjectProgramVariant({
  variant,
  interactive = true,
}: {
  variant: ProjectVariantId;
  interactive?: boolean;
}) {
  switch (variant) {
    case "clinica":
      return <SiteClinicaInteractive interactive={interactive} />;
    case "imobiliaria":
      return <SiteImobiliariaInteractive interactive={interactive} />;
    case "catalogo":
      return <SiteCatalogoInteractive interactive={interactive} />;
    case "erp":
      return <SistemaErpInteractive interactive={interactive} />;
    case "portal":
      return <SistemaPortalInteractive interactive={interactive} />;
    case "agenda":
      return <SistemaAgendaInteractive interactive={interactive} />;
    case "triagem":
      return <AutomacaoTriagemInteractive interactive={interactive} />;
    case "cobranca":
      return <AutomacaoCobrancaInteractive interactive={interactive} />;
    case "relatorio":
      return <AutomacaoRelatorioInteractive interactive={interactive} />;
  }
}
