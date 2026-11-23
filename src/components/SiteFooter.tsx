import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { buildWhatsAppUrl, siteConfig } from "@/config/site";

export function SiteFooter({
  waContextMessage,
  showTrackingLink = true,
}: {
  waContextMessage: string;
  showTrackingLink?: boolean;
}) {
  const footerWaUrl = buildWhatsAppUrl(waContextMessage);

  return (
    <footer className="border-t border-(--fg)/15 bg-(--ink) py-10 text-(--on-ink) transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-7 w-7" />
          <div>
            <p className="text-sm font-extrabold tracking-tight text-(--on-ink)">
              prisma<span className="text-(--accent-text)">.estudio</span>
            </p>
            <p className="mt-0.5 text-xs text-(--on-ink)/70">
              {siteConfig.locationText} · © {siteConfig.copyrightYear}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {showTrackingLink && (
            <Link
              href="/acompanhar"
              className="rounded-full border border-(--on-ink)/20 bg-(--ink) px-4 py-2 text-xs font-semibold text-(--on-ink) transition-colors hover:border-(--accent) hover:text-(--accent-text)"
            >
              Acompanhar pedido
            </Link>
          )}
          <a
            href={footerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-(--accent) px-4 py-2 text-xs font-semibold text-(--on-accent) transition-colors hover:bg-(--accent-hover)"
          >
            <span>WhatsApp direto</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
