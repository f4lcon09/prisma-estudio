import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Inter no texto e Inter Tight nos títulos: no espírito da SF, com identidade própria
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  // não aparece na primeira tela: carrega sem pré-carregamento
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  // só o peso 600 é usado (mockup da loja de moda)
  weight: ["600"],
  style: ["normal", "italic"],
  display: "swap",
});

const themeInitScript = `
(() => {
  try {
    const saved = window.localStorage.getItem("prisma-theme");
    const theme = saved === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Sites, Sistemas Web e Automações`,
  description:
    "Studio de software sob medida: sites rápidos, sistemas web completos e automações com IA em Next.js e TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-(--bg) text-(--fg) transition-colors duration-300 selection:bg-(--accent)/20 selection:text-(--fg)">
        {children}
      </body>
    </html>
  );
}
