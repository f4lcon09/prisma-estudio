import { Check, ClipboardList, Code2, Gauge, PenTool, Rocket } from "lucide-react";
import { CtaPair } from "@/components/CtaPair";
import { Reveal } from "@/components/Reveal";

// EDITE AQUI: etapas do processo (as mesmas do /acompanhar).
const steps = [
  {
    icon: ClipboardList,
    title: "Briefing e escopo fechado",
    text: "Uma conversa curta para entender o objetivo. Você recebe por escrito o que está incluso, o prazo e o preço.",
  },
  {
    icon: PenTool,
    title: "Protótipo aprovado",
    text: "Você vê e aprova o layout antes de qualquer linha de código.",
  },
  {
    icon: Code2,
    title: "Desenvolvimento",
    text: "Construímos a versão real, pronta para celular e computador, numa prévia que você acessa quando quiser.",
  },
  {
    icon: Gauge,
    title: "Testes",
    text: "Velocidade, formulários, WhatsApp e integrações testados com dados reais.",
  },
  {
    icon: Rocket,
    title: "Publicação e treinamento",
    text: "Colocamos no ar e mostramos como usar, por vídeo ou WhatsApp.",
  },
];

// EDITE AQUI: o que vem em todo projeto (do playbook de ofertas).
const included = [
  "Briefing, estrutura e desenvolvimento",
  "Publicação no ar",
  "Treinamento de uso por vídeo ou WhatsApp",
  "Rodadas de ajuste combinadas na proposta",
  "Suporte pós-entrega para correções, de 7 a 30 dias conforme o pacote",
  "Código do pedido para acompanhar cada etapa online",
];

export function ProcessSection() {
  return (
    <section
      id="como-funciona"
      className="border-t border-(--fg)/12 bg-(--bg) py-20 text-(--fg) transition-colors duration-300 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold text-(--accent-text)">
            Como funciona
          </p>
          <h2 className="ps-reveal mt-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl 2xl:text-[56px] lg:leading-[1.05]">
            Do primeiro contato ao projeto no ar
          </h2>
          <p className="mt-3 text-base leading-relaxed text-(--fg-2)">
            Cinco etapas, sempre na mesma ordem. Em cada uma você sabe o que está acontecendo e pode acompanhar pelo
            código do seu pedido.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delayMs={idx * 60}>
                <li className="flex h-full flex-col gap-3 rounded-2xl border border-(--fg)/12 bg-(--surface) p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--ink) text-(--on-ink)">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-tech text-[11px] font-semibold text-(--accent-text)">
                      Etapa {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-(--fg-2)">{step.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <div className="ps-reveal mt-14 grid gap-8 rounded-3xl border border-(--fg)/12 bg-(--surface) p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-[13px] font-semibold text-(--accent-text)">
              Em todo projeto
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">O que já vem incluso</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--fg-2)">
              O que fica fora do pacote (textos, logo, fotos, taxas de terceiros) aparece separado na proposta, antes de
              você decidir.
            </p>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--accent)/20 text-(--accent-text)">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <CtaPair className="mt-12" />
      </div>
    </section>
  );
}
