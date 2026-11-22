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
      title={isDark ? "Tema claro (Quiet Luxury)" : "Tema escuro (Editorial Noturno)"}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#1A1715]/15 bg-[#FAF6EE] px-2.5 text-xs font-semibold text-[#1A1715] shadow-2xs transition-colors hover:border-[#B08D57] hover:text-[#8E6F3E] dark:border-[#ECE5D8]/16 dark:bg-[#202226] dark:text-[#ECE5D8] dark:hover:border-[#B08D57] dark:hover:text-[#B08D57]"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 text-[#B08D57]" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-[#8E6F3E]" aria-hidden="true" />
      )}
      <span className="hidden lg:inline">{isDark ? "Claro" : "Escuro"}</span>
    </button>
  );
}
