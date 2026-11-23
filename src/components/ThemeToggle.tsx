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
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-(--fg)/15 bg-(--surface) px-2.5 text-xs font-semibold text-(--fg) shadow-2xs transition-colors hover:border-(--accent) hover:text-(--accent-text)"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 text-(--accent-text)" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-(--accent-text)" aria-hidden="true" />
      )}
      <span className="hidden lg:inline">{isDark ? "Claro" : "Escuro"}</span>
    </button>
  );
}
