import type { CSSProperties } from "react";

/**
 * Paletas 60-30-10 dos projetos-modelo.
 * bg = 60% (fundo), ink = 30% (texto/navegação), accent = 10% (ação),
 * accentInk = tom do destaque seguro para texto sobre o fundo (>= 4,5:1),
 * onAccent = cor do texto em cima do destaque.
 * Estados semânticos (pago, pendente, erro) continuam em verde/âmbar/rosa e não usam estas cores.
 */
export const mockupPalettes = {
  moda: { bg: "#F3EEE7", ink: "#2B2724", accent: "#8C4A2F", accentInk: "#8C4A2F", onAccent: "#FFFFFF" },
  clinica: { bg: "#F4F8F7", ink: "#134E4A", accent: "#F59E80", accentInk: "#98624F", onAccent: "#134E4A" },
  imobiliaria: { bg: "#F7F5F0", ink: "#1F2A44", accent: "#D9823B", accentInk: "#A1602C", onAccent: "#1F2A44" },
  catalogo: { bg: "#FFF8EE", ink: "#3B2A20", accent: "#F47A4B", accentInk: "#B05836", onAccent: "#3B2A20" },
  erp: { bg: "#F5F7FA", ink: "#102A43", accent: "#00A86B", accentInk: "#008051", onAccent: "#102A43" },
  portal: { bg: "#F7F6FB", ink: "#2E2A5A", accent: "#6B4EF0", accentInk: "#6B4EF0", onAccent: "#FFFFFF" },
  agenda: { bg: "#FBF9F4", ink: "#22333B", accent: "#F2B705", accentInk: "#8C6A03", onAccent: "#22333B" },
  triagem: { bg: "#F2F7F4", ink: "#0B3D2E", accent: "#FF7A5C", accentInk: "#B35540", onAccent: "#0B3D2E" },
  cobranca: { bg: "#F3FAF9", ink: "#0E3B43", accent: "#32BCAD", accentInk: "#217C72", onAccent: "#0E3B43" },
  relatorio: { bg: "#F8F7F4", ink: "#1E1B2E", accent: "#E9B949", accentInk: "#876B2A", onAccent: "#1E1B2E" },
} as const;

export type MockupPaletteId = keyof typeof mockupPalettes;

/** Variáveis CSS lidas pelas classes `bg-(--m-bg)`, `text-(--m-ink)` etc. dos mockups. */
export function paletteVars(id: MockupPaletteId): CSSProperties {
  const p = mockupPalettes[id];
  return {
    "--m-bg": p.bg,
    "--m-ink": p.ink,
    "--m-accent": p.accent,
    "--m-accent-ink": p.accentInk,
    "--m-on-accent": p.onAccent,
  } as CSSProperties;
}
