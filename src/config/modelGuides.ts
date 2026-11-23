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
    tryIt: ["Escolha um tipo de atendimento", "Toque num horário livre e digite um nome", "Clique em Reservar e veja a confirmação"],
    delivers: ["Agenda de horários na própria página", "Botão direto para o WhatsApp", "Página leve, que abre rápido no celular", "Pronta para Google e anúncios"],
  },
  imobiliaria: {
    tryIt: ["Filtre por bairro nas abas", "Busque por tipo, como Duplex", "Favorite um imóvel e marque uma visita"],
    delivers: ["Vitrine de imóveis com filtros", "Favoritos e pedido de visita", "Contato do corretor em um toque", "Cadastro de imóveis pelo painel"],
  },
  catalogo: {
    tryIt: ["Aumente ou diminua a quantidade dos produtos", "Ative o desconto no Pix", "Gere o resumo do pedido para o WhatsApp"],
    delivers: ["Catálogo com carrinho simples", "Pedido formatado direto no WhatsApp", "Desconto à vista no Pix", "Sem mensalidade de plataforma de loja"],
  },
  erp: {
    tryIt: ["Troque o período do gráfico", "Mude o status de um pedido", "Cadastre um pedido novo"],
    delivers: ["Pedidos, clientes e caixa num só painel", "Gráficos por período", "Login com permissões por usuário", "Exportação de relatórios"],
  },
  portal: {
    tryIt: ["Navegue entre as abas do portal", "Abra a fatura e gere o Pix", "Registre um novo chamado"],
    delivers: ["Área do cliente com login", "Segunda via e pagamento por Pix", "Chamados de suporte com histórico", "Contratos e documentos num lugar só"],
  },
  agenda: {
    tryIt: ["Troque o dia da semana", "Clique num horário para mudar a etapa", "Encaixe um horário novo"],
    delivers: ["Grade diária por profissional", "Confirmação automática de horário", "Bloqueio de horários", "Histórico de atendimentos"],
  },
  triagem: {
    tryIt: ["Escolha um tipo de lead", "Clique em Simular fluxo", "Veja a resposta da IA e o card criado no CRM"],
    delivers: ["Resposta no WhatsApp em segundos", "IA que extrai os dados do lead", "Card criado no CRM automaticamente", "Aviso para a equipe quando o lead é quente"],
  },
  cobranca: {
    tryIt: ["Avance a régua de cobrança", "Veja o lembrete com Pix copia e cola", "Confirme o pagamento e veja a baixa automática"],
    delivers: ["Lembretes antes e depois do vencimento", "Pix copia e cola na mensagem", "Baixa automática ao pagar", "Menos cobrança manual"],
  },
  relatorio: {
    tryIt: ["Troque o tom do resumo", "Inclua ou tire dados de anúncios", "Inclua ou tire o caixa do dia"],
    delivers: ["Resumo diário pronto às 08h", "Lê banco, planilhas e anúncios", "Entrega no WhatsApp", "Destaque do que mudou desde ontem"],
  },
};
