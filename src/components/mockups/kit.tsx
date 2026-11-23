import { Star } from "lucide-react";

/** Peças comuns dos sites-modelo. Todas as cores vêm das variáveis da paleta (--m-*). */

export function Stars({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-2.5 w-2.5 ${i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-(--m-ink)/20"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-md text-center" : "max-w-md"}>
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-(--m-accent-ink)">{eyebrow}</p>
      <h3 className="mt-1 text-[17px] font-extrabold leading-tight tracking-tight text-(--m-ink)">{title}</h3>
      {text && <p className="mt-1 text-[10.5px] leading-relaxed text-(--m-ink)/70">{text}</p>}
    </div>
  );
}

export function MockFooter({
  brand,
  columns,
  note,
}: {
  brand: string;
  columns: { title: string; items: string[] }[];
  note: string;
}) {
  return (
    <footer className="bg-(--m-ink) px-5 pb-4 pt-6 text-white">
      <div className="grid gap-5 sm:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <p className="text-[13px] font-extrabold tracking-tight">{brand}</p>
          <p className="mt-1.5 max-w-[24ch] text-[10px] leading-relaxed text-white/65">{note}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">{col.title}</p>
            <ul className="mt-1.5 grid gap-1 text-[10px] text-white/80">
              {col.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/12 pt-3 text-[9px] text-white/50">
        <span>© 2026 {brand}. Todos os direitos reservados.</span>
        <span>Política de privacidade · Termos</span>
      </div>
    </footer>
  );
}

/** Mapa estilizado (sem serviço externo) com pino na cor de destaque. */
export function MiniMap({ label }: { label: string }) {
  return (
    <div className="relative h-full min-h-28 overflow-hidden rounded-xl border border-(--m-ink)/10 bg-[#EEF1EC]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="160" fill="#EEF1EC" />
        <path d="M0 110 C60 95 90 130 160 112 S260 70 300 82 L300 160 L0 160Z" fill="#DCE6DA" />
        <g stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M-10 40 L310 62" />
          <path d="M70 -10 L95 170" />
          <path d="M190 -10 L170 170" />
          <path d="M-10 128 L310 118" />
        </g>
        <g stroke="#FFFFFF" strokeWidth="3" fill="none">
          <path d="M20 -10 L35 170" />
          <path d="M250 -10 L240 170" />
          <path d="M-10 88 L310 95" />
        </g>
      </svg>
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full">
        <div className="flex flex-col items-center">
          <span className="whitespace-nowrap rounded-md bg-(--m-ink) px-2 py-1 text-[9px] font-semibold text-white shadow-md">
            {label}
          </span>
          <span className="h-3 w-3 -translate-y-0.5 rotate-45 rounded-sm bg-(--m-accent) ring-2 ring-white" />
        </div>
      </div>
    </div>
  );
}
