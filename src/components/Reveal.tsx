"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Aparece suavemente ao entrar na tela: sobe alguns pixels e ganha opacidade.
 * Quem prefere menos movimento vê o conteúdo direto, sem animação.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.985] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
