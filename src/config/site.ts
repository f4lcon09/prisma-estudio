export type HeroModeId = "sites" | "sistemas" | "automacoes";

export type ProjectVariantId =
  | "erp"
  | "portal"
  | "agenda"
  | "clinica"
  | "imobiliaria"
  | "catalogo"
  | "triagem"
  | "cobranca"
  | "relatorio";

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
  variant: ProjectVariantId;
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
    // Sites (3 modelos)
    {
      id: "landing-conversao",
      mode: "sites",
      variant: "clinica",
      badge: "Site · 5 dias",
      category: "Sites & Landing Pages",
      title: "Landing Page B2B & Agendamento",
      subtitle: "Página rápida com seletor de serviço, horário disponível e botão direto no WhatsApp.",
      turnaround: "5 dias úteis",
      stack: ["Next.js", "Tailwind", "Analytics"],
      metrics: [
        { label: "Performance", value: "99 / 100" },
        { label: "Carregamento", value: "0.6s LCP" },
      ],
      whatsappPrompt: "Olá! Vi a Landing Page B2B & Agendamento no portfólio e quero orçamento para um site.",
    },
    {
      id: "site-imobiliaria",
      mode: "sites",
      variant: "imobiliaria",
      badge: "Site · 7 dias",
      category: "Sites & Landing Pages",
      title: "Portal de Imóveis com Busca & Filtros",
      subtitle: "Vitrine responsiva com filtro por bairro e faixa de valor, levando o interessado ao corretor.",
      turnaround: "7 dias úteis",
      stack: ["Next.js", "TypeScript", "SEO"],
      metrics: [
        { label: "Busca instantânea", value: "< 40ms" },
        { label: "SEO técnico", value: "100 / 100" },
      ],
      whatsappPrompt: "Olá! Vi o Portal de Imóveis com Busca no portfólio e quero algo parecido.",
    },
    {
      id: "catalogo-whatsapp",
      mode: "sites",
      variant: "catalogo",
      badge: "Site · 6 dias",
      category: "Sites & Landing Pages",
      title: "Catálogo Digital com Pedido no WhatsApp",
      subtitle: "Loja leve sem fricção: o cliente monta o carrinho e envia o pedido formatado no WhatsApp.",
      turnaround: "6 dias úteis",
      stack: ["Next.js", "React", "Tailwind"],
      metrics: [
        { label: "Checkout", value: "1 clique" },
        { label: "Conversão mobile", value: "+42%" },
      ],
      whatsappPrompt: "Olá! Vi o Catálogo Digital com Pedido no WhatsApp e quero cotar para o meu negócio.",
    },

    // Sistemas (3 modelos)
    {
      id: "painel-erp",
      mode: "sistemas",
      variant: "erp",
      badge: "Sistema · 3 sem",
      category: "Sistemas Web & SaaS",
      title: "Painel Financeiro & Gestão de Pedidos",
      subtitle: "Controle de caixa, status de clientes e emissão de propostas em um só lugar.",
      turnaround: "3 semanas",
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      metrics: [
        { label: "Faturamento monitorado", value: "R$ 229.150/mês" },
        { label: "Tempo operacional", value: "-68% manual" },
      ],
      whatsappPrompt: "Olá! Vi o Painel Financeiro & Gestão de Pedidos no portfólio e quero algo parecido.",
    },
    {
      id: "portal-assinantes",
      mode: "sistemas",
      variant: "portal",
      badge: "Sistema · 3 sem",
      category: "Sistemas Web & SaaS",
      title: "Portal do Cliente & Área de Faturas",
      subtitle: "Login exclusivo para clientes acessarem contratos, segunda via Pix e chamados de suporte.",
      turnaround: "3 semanas",
      stack: ["Next.js", "Auth", "Pix API"],
      metrics: [
        { label: "Autoatendimento", value: "24/7" },
        { label: "Chamados resolvidos", value: "-54% suporte" },
      ],
      whatsappPrompt: "Olá! Vi o Portal do Cliente & Área de Faturas no portfólio e quero cotar um sistema.",
    },
    {
      id: "agenda-operacional",
      mode: "sistemas",
      variant: "agenda",
      badge: "Sistema · 2 sem",
      category: "Sistemas Web & SaaS",
      title: "Agenda Operacional & Fila de Equipe",
      subtitle: "Grade diária com confirmação automática, bloqueio de horários e histórico por profissional.",
      turnaround: "2 semanas",
      stack: ["Next.js", "PostgreSQL", "API REST"],
      metrics: [
        { label: "Ocupação diária", value: "86% média" },
        { label: "Faltas reduzidas", value: "-39%" },
      ],
      whatsappPrompt: "Olá! Vi a Agenda Operacional & Fila de Equipe no portfólio e quero orçamento.",
    },

    // Automações (3 modelos)
    {
      id: "fluxo-whatsapp-ia",
      mode: "automacoes",
      variant: "triagem",
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
    {
      id: "cobranca-pix-auto",
      mode: "automacoes",
      variant: "cobranca",
      badge: "Automação · 5 dias",
      category: "Automações & IA",
      title: "Régua de Cobrança Pix Automática",
      subtitle: "Envia lembrete no WhatsApp com código Pix copia-e-cola e dá baixa automática ao pagar.",
      turnaround: "5 dias úteis",
      stack: ["Webhooks", "Pix API", "WhatsApp"],
      metrics: [
        { label: "Inadimplência", value: "-35% atrasos" },
        { label: "Baixa automática", value: "Em tempo real" },
      ],
      whatsappPrompt: "Olá! Vi a Régua de Cobrança Pix Automática e quero implantar na minha empresa.",
    },
    {
      id: "resumo-ia-diario",
      mode: "automacoes",
      variant: "relatorio",
      badge: "Automação · 4 dias",
      category: "Automações & IA",
      title: "Relatório Diário de Vendas com IA",
      subtitle: "Lê banco de dados, anúncios e planilhas às 08h e entrega o resumo pronto no WhatsApp.",
      turnaround: "4 dias úteis",
      stack: ["Cron", "SQL / APIs", "IA Generativa"],
      metrics: [
        { label: "Disparo diário", value: "08:00 pontual" },
        { label: "Horas poupadas", value: "6h / semana" },
      ],
      whatsappPrompt: "Olá! Vi o Relatório Diário de Vendas com IA e quero cotar essa automação.",
    },
  ] satisfies ModelProject[],
};

export function buildWhatsAppUrl(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
