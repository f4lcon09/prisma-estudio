"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "prisma-theme";
const THEME_EVENT = "prisma-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={isDark ? "Tema claro (Creme & Marinho)" : "Tema escuro (Estúdio Noturno)"}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#1F2A44]/15 bg-[#FAF5EB] px-2.5 text-xs font-semibold text-[#1F2A44] shadow-2xs transition-colors hover:border-[#D85D2A]/60 hover:text-[#D85D2A] dark:border-[#F2EFE6]/15 dark:bg-[#202B42] dark:text-[#F2EFE6] dark:hover:border-[#E05A3A]/70 dark:hover:text-[#E05A3A]"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 text-[#E05A3A]" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-[#D85D2A]" aria-hidden="true" />
      )}
      <span className="hidden lg:inline">{isDark ? "Claro" : "Escuro"}</span>
    </button>
  );
}
