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
    <footer className="border-t border-[#1A1715]/15 bg-[#1A1715] py-10 text-[#EAE3D5] transition-colors duration-300 dark:border-[#ECE5D8]/12 dark:bg-[#111214] dark:text-[#ECE5D8]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-7 w-7" />
          <div>
            <p className="text-sm font-extrabold tracking-tight text-[#EAE3D5] dark:text-[#ECE5D8]">
              prisma<span className="text-[#B08D57]">.estudio</span>
            </p>
            <p className="mt-0.5 text-xs text-[#EAE3D5]/70 dark:text-[#A8A095]">
              {siteConfig.locationText} · © {siteConfig.copyrightYear}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {showTrackingLink && (
            <Link
              href="/acompanhar"
              className="rounded-full border border-[#EAE3D5]/20 bg-[#231F1C] px-4 py-2 text-xs font-semibold text-[#EAE3D5] transition-colors hover:border-[#B08D57] hover:text-[#B08D57] dark:border-[#ECE5D8]/15 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:border-[#B7410E] dark:hover:text-[#ECE5D8]"
            >
              Acompanhar pedido
            </Link>
          )}
          <a
            href={footerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#B08D57] px-4 py-2 text-xs font-semibold text-[#1A1715] transition-colors hover:bg-[#C6A46E] dark:bg-[#B7410E] dark:text-[#FAF6EE] dark:hover:bg-[#9C3509]"
          >
            <span>WhatsApp direto</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
