"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: React.ReactNode;
  /** O que aparece até o conteúdo montar (mesmo tamanho, para não pular o layout). */
  placeholder?: React.ReactNode;
  /** Distância antes de entrar na tela em que já começa a montar. */
  rootMargin?: string;
  className?: string;
}

/**
 * Só monta o conteúdo quando ele chega perto da tela.
 * Usado nas miniaturas da vitrine: cada uma é um site ou sistema inteiro.
 */
export function LazyMount({ children, placeholder = null, rootMargin = "400px", className = "" }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div ref={ref} className={className}>
      {show ? children : placeholder}
    </div>
  );
}
