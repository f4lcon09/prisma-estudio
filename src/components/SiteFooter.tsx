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
    <footer className="border-t border-[#1F2A44]/15 bg-[#1F2A44] py-10 text-[#F4EDE0] transition-colors duration-300 dark:border-[#F2EFE6]/12 dark:bg-[#111726] dark:text-[#F2EFE6]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-7 w-7" />
          <div>
            <p className="text-sm font-extrabold tracking-tight text-[#F4EDE0] dark:text-[#F2EFE6]">
              prisma<span className="text-[#E05A3A]">.estudio</span>
            </p>
            <p className="mt-0.5 text-xs text-[#F4EDE0]/70 dark:text-[#A9B4C9]">
              {siteConfig.locationText} · © {siteConfig.copyrightYear}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {showTrackingLink && (
            <Link
              href="/acompanhar"
              className="rounded-full border border-[#F4EDE0]/20 bg-[#2A3756] px-4 py-2 text-xs font-semibold text-[#F4EDE0] transition-colors hover:border-[#E05A3A] hover:bg-[#D85D2A] hover:text-white dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:bg-[#E05A3A]"
            >
              Acompanhar pedido
            </Link>
          )}
          <a
            href={footerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D85D2A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#BF4E20] dark:bg-[#E05A3A] dark:hover:bg-[#C94B2D]"
          >
            <span>WhatsApp direto</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
