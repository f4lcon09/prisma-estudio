export type HeroModeId = "sites" | "sistemas" | "automacoes";

export type ServiceCategory =
  | "Sites & Landing Pages"
  | "Sistemas Web & SaaS"
  | "Automações & IA"
  | "Correções & Sob Demanda";

export interface ServiceItem {
  id: string;
  title: ServiceCategory;
  shortTitle: string;
  tagline: string;
  turnaround: string;
  highlights: string[];
  whatsappPrompt: string;
}

export interface ModelProject {
  id: string;
  mode: HeroModeId;
  badge: string;
  category: Exclude<ServiceCategory, "Correções & Sob Demanda">;
  title: string;
  subtitle: string;
  turnaround: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  whatsappPrompt: string;
}

export const siteConfig = {
  // EDITE AQUI: substitua pelo nome definitivo do seu estúdio/marca quando escolher
  brandName: "prisma.estudio",
  whatsappNumber: "5547991660276",
  isPlaceholderContact: false,
  locationText: "Brasil · Atendimento remoto",
  copyrightYear: "2026",

  hero: {
    badge: "STUDIO DE SOFTWARE SOB MEDIDA",
    title: "Criamos software de alto nível.",
    primaryCta: "Pedir orçamento",
  },

  services: [
    {
      id: "sites",
      title: "Sites & Landing Pages",
      shortTitle: "Site",
      tagline: "Páginas rápidas desenhadas para transformar visitas em WhatsApp.",
      turnaround: "3 a 7 dias",
      highlights: ["Design sob medida", "SEO & PageSpeed 99", "WhatsApp integrado"],
      whatsappPrompt: "Olá! Quero orçamento para um site ou landing page.",
    },
    {
      id: "sistemas",
      title: "Sistemas Web & SaaS",
      shortTitle: "Sistema",
      tagline: "Painéis, ERPs e portais com login, banco de dados e relatórios.",
      turnaround: "2 a 5 semanas",
      highlights: ["Next.js & PostgreSQL", "Permissões & Pix/Stripe", "Dashboard em tempo real"],
      whatsappPrompt: "Olá! Preciso desenvolver um sistema web ou painel sob medida.",
    },
    {
      id: "automacoes",
      title: "Automações & IA",
      shortTitle: "Automação",
      tagline: "Fluxos que conectam WhatsApp, IA, planilhas e CRM sem trabalho manual.",
      turnaround: "3 a 10 dias",
      highlights: ["Triagem com IA", "Webhooks & APIs", "Logs e alertas ao vivo"],
      whatsappPrompt: "Olá! Quero automatizar processos ou integrar sistemas com IA.",
    },
    {
      id: "correcoes",
      title: "Correções & Sob Demanda",
      shortTitle: "Correção",
      tagline: "Destravamos bugs urgentes, lentidão ou novas telas em código existente.",
      turnaround: "24h a 5 dias",
      highlights: ["Diagnóstico rápido", "Refatoração segura", "Entrega por pacote"],
      whatsappPrompt: "Olá! Tenho uma demanda pontual ou correção urgente em um projeto.",
    },
  ] satisfies ServiceItem[],

  projects: [
    {
      id: "painel-erp",
      mode: "sistemas",
      badge: "Sistema · 3 sem",
      category: "Sistemas Web & SaaS",
      title: "Painel Financeiro & Gestão de Pedidos",
      subtitle: "Controle de caixa, status de clientes e emissão de propostas em um só lugar.",
      turnaround: "3 semanas",
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      metrics: [
        { label: "Faturamento monitorado", value: "R$ 229.150/mês" },
        { label: "Tempo de fechamento", value: "-68% manual" },
      ],
      whatsappPrompt: "Olá! Vi o Painel Financeiro & Gestão de Pedidos no portfólio e quero algo parecido.",
    },
    {
      id: "landing-conversao",
      mode: "sites",
      badge: "Site · 5 dias",
      category: "Sites & Landing Pages",
      title: "Landing Page B2B de Alta Conversão",
      subtitle: "Estrutura visual leve com simulador interativo e captura direta no WhatsApp.",
      turnaround: "5 dias úteis",
      stack: ["Next.js", "Tailwind", "Analytics"],
      metrics: [
        { label: "Performance", value: "99 / 100" },
        { label: "Carregamento", value: "0.7s LCP" },
      ],
      whatsappPrompt: "Olá! Vi a Landing Page B2B no portfólio e quero orçamento para uma página.",
    },
    {
      id: "fluxo-whatsapp-ia",
      mode: "automacoes",
      badge: "Automação · 7 dias",
      category: "Automações & IA",
      title: "Triagem WhatsApp + IA + CRM",
      subtitle: "Atende o lead em segundos, extrai dados estruturados e cria o card no CRM.",
      turnaround: "7 dias úteis",
      stack: ["Node.js", "Webhooks", "OpenAI / CRM"],
      metrics: [
        { label: "Resposta inicial", value: "< 2 segundos" },
        { label: "Leads qualificados", value: "100% registrados" },
      ],
      whatsappPrompt: "Olá! Vi o fluxo WhatsApp + IA + CRM no portfólio e quero automatizar meu atendimento.",
    },
  ] satisfies ModelProject[],
};

export function buildWhatsAppUrl(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
