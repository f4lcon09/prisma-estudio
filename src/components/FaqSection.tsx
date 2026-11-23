import { Plus } from "lucide-react";

// EDITE AQUI: perguntas e respostas. Não cite valores nem condições de pagamento que não foram aprovados.
const faqs = [
  {
    q: "Quanto custa?",
    a: "Depende do escopo. Você descreve o projeto em 1 minuto no formulário abaixo e recebe uma proposta com prazo e preço fechados, com o que está e o que não está incluso. Se o orçamento estiver apertado, montamos uma versão mais enxuta para começar e evoluir depois.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "Sites e landing pages levam de 3 a 7 dias, automações de 3 a 10 dias, sistemas de 2 a 5 semanas e correções de 24 horas a 5 dias. O prazo começa a contar quando o briefing está completo e os materiais chegaram.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é dividido em etapas, combinadas por escrito na proposta antes de começar. Você acompanha cada etapa online, então sempre sabe o que já foi feito.",
  },
  {
    q: "Não tenho textos, logo ou fotos. E agora?",
    a: "É comum e não trava o projeto. Montamos a estrutura de texto a partir de uma conversa curta e indicamos o caminho para logo e fotos. Isso entra como adicional, orçado à parte, e começamos a estrutura enquanto isso.",
  },
  {
    q: "Como acompanho o andamento?",
    a: "Ao fechar, você recebe um código. Na página Acompanhar pedido você digita esse código e vê a etapa atual e a data estimada de entrega, sem precisar perguntar.",
  },
  {
    q: "E depois que o projeto for entregue?",
    a: "Todo pacote tem suporte pós-entrega para correções, de 7 a 30 dias conforme o pacote. Depois disso, existem planos mensais de manutenção e evolução, se fizer sentido para você.",
  },
];

export function FaqSection() {
  return (
    <section
      id="duvidas"
      className="border-t border-(--fg)/12 bg-(--bg-alt) py-20 text-(--fg) transition-colors duration-300 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="text-[13px] font-semibold text-(--accent-text)">
            Dúvidas
          </p>
          <h2 className="ps-reveal mt-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl 2xl:text-[56px] lg:leading-[1.05]">Antes de pedir o orçamento</h2>
          <p className="mt-3 text-base leading-relaxed text-(--fg-2)">
            As perguntas que mais aparecem na primeira conversa.
          </p>
        </div>

        <div className="grid gap-2.5 lg:col-span-8">
          {faqs.map((item, idx) => (
            <details
              key={item.q}
              name="duvidas"
              open={idx === 0}
              className="ps-reveal group rounded-2xl border border-(--fg)/12 bg-(--surface) px-5 open:pb-5"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <Plus
                  className="h-4 w-4 shrink-0 text-(--accent-text) transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[65ch] text-sm leading-relaxed text-(--fg-2)">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
