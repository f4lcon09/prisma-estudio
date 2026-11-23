import type { ProjectVariantId } from "@/config/site";

export interface ModelGuide {
  /** Passo a passo do que testar na prévia (3 ações reais do mockup). */
  tryIt: string[];
  /** O que este modelo entrega para o negócio do cliente. */
  delivers: string[];
}

// EDITE AQUI: roteiro do "Testar modelo" de cada projeto-modelo.
export const modelGuides: Record<ProjectVariantId, ModelGuide> = {
  clinica: {
    tryIt: ["Escolha um atendimento na lista", "Troque o dia e toque num horário livre", "Digite seu nome e clique em Reservar"],
    delivers: ["Agenda de horários na própria página", "Botão direto para o WhatsApp", "Página leve, que abre rápido no celular", "Pronta para Google e anúncios"],
  },
  imobiliaria: {
    tryIt: ["Alterne entre Comprar e Alugar", "Filtre por bairro ou busque por palavra", "Favorite um imóvel e agende a visita"],
    delivers: ["Vitrine de imóveis com filtros", "Favoritos e pedido de visita", "Contato do corretor em um toque", "Cadastro de imóveis pelo painel"],
  },
  catalogo: {
    tryIt: ["Filtre por categoria e ajuste as quantidades", "Escolha retirar ou entregar e o Pix", "Envie o pedido e veja a mensagem pronta"],
    delivers: ["Catálogo com carrinho simples", "Pedido formatado direto no WhatsApp", "Desconto à vista no Pix", "Sem mensalidade de plataforma de loja"],
  },
  erp: {
    tryIt: ["Troque o período do gráfico", "Mude o status de um pedido", "Cadastre um pedido novo"],
    delivers: ["Pedidos, clientes e caixa num só painel", "Gráficos por período", "Login com permissões por usuário", "Exportação de relatórios"],
  },
  portal: {
    tryIt: ["Navegue pelo menu: Início, Faturas, Chamados, Documentos", "Abra o Pix da fatura e simule o pagamento", "Abra um chamado novo"],
    delivers: ["Área do cliente com login", "Segunda via e pagamento por Pix", "Chamados de suporte com histórico", "Contratos e documentos num lugar só"],
  },
  agenda: {
    tryIt: ["Troque o dia da agenda", "Clique num atendimento para avançar a etapa", "Use Encaixe para ocupar o primeiro horário livre"],
    delivers: ["Grade diária por profissional", "Confirmação automática de horário", "Bloqueio de horários", "Histórico de atendimentos"],
  },
  triagem: {
    tryIt: ["Escolha um tipo de lead", "Clique em Simular fluxo e acompanhe a conversa", "Veja o card no CRM e quem foi avisado"],
    delivers: ["Resposta no WhatsApp em segundos", "IA que extrai os dados do lead", "Card criado no CRM automaticamente", "Aviso para a equipe quando o lead é quente"],
  },
  cobranca: {
    tryIt: ["Escolha um cliente na lista", "Envie o lembrete e veja a mensagem com Pix", "Simule o pagamento e veja a baixa automática"],
    delivers: ["Lembretes antes e depois do vencimento", "Pix copia e cola na mensagem", "Baixa automática ao pagar", "Menos cobrança manual"],
  },
  relatorio: {
    tryIt: ["Ligue ou desligue as fontes de dados", "Troque entre resumo direto e detalhado", "Veja a mensagem e o insight mudarem"],
    delivers: ["Resumo diário pronto às 08h", "Lê banco, planilhas e anúncios", "Entrega no WhatsApp", "Destaque do que mudou desde ontem"],
  },
};
