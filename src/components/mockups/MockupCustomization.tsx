"use client";

import { createContext, useContext, type CSSProperties } from "react";
import type { PaletteOption } from "@/components/mockups/paletteOptions";

interface MockupCustomization {
  /** Paleta escolhida pelo visitante no "Personalizar". */
  palette?: PaletteOption;
  /** Nome do negócio digitado pelo visitante. */
  brandName?: string;
}

const MockupCustomizationContext = createContext<MockupCustomization>({});

export const MockupCustomizationProvider = MockupCustomizationContext.Provider;

export function useMockupCustomization() {
  return useContext(MockupCustomizationContext);
}

/** Nome exibido no mockup: o do visitante, se houver, senão o texto padrão. */
export function useBrandLabel(fallback: string, format?: (name: string) => string) {
  const { brandName } = useMockupCustomization();
  const name = brandName?.trim();
  if (!name) return fallback;
  return format ? format(name) : name;
}

export function paletteOptionVars(p: PaletteOption): CSSProperties {
  return {
    "--m-bg": p.bg,
    "--m-ink": p.ink,
    "--m-accent": p.accent,
    "--m-accent-ink": p.accentInk,
    "--m-on-accent": p.onAccent,
  } as CSSProperties;
}

/** "Padaria do João" -> "padaria-do-joao" (usado só como caminho de prévia) */
export function brandDomain(name: string) {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return slug;
}
