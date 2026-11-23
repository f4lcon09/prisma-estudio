"use client";

import { useEffect, useRef } from "react";

const SIZE = 220; // diâmetro da gota em px

/**
 * Gota de vidro líquido que segue o mouse no fundo do hero (atrás do conteúdo).
 * Movimento por mola em transform (sem transição de left/top, por isso sem atraso),
 * e estica levemente na direção do movimento, como uma gota.
 */
export function HeroLens() {
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    const host = lens?.parentElement;
    if (!lens || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let running = false;
    let first = true;

    const render = () => {
      const speed = Math.hypot(vel.x, vel.y);
      const stretch = reduced ? 0 : Math.min(speed * 0.006, 0.16);
      const angle = Math.atan2(vel.y, vel.x);
      lens.style.transform =
        `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0) rotate(${angle}rad) ` +
        `scale(${1 + stretch}, ${1 - stretch * 0.6}) rotate(${-angle}rad)`;
    };

    const tick = () => {
      // mola rápida e bem amortecida: acompanha quase colado, sem quicar
      const ax = (target.x - pos.x) * 0.32;
      const ay = (target.y - pos.y) * 0.32;
      vel.x = (vel.x + ax) * 0.62;
      vel.y = (vel.y + ay) * 0.62;
      pos.x += vel.x;
      pos.y += vel.y;
      render();
      if (Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) + Math.abs(vel.x) + Math.abs(vel.y) > 0.2) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (first || reduced) {
        pos.x = target.x;
        pos.y = target.y;
        vel.x = vel.y = 0;
        first = false;
        render();
      }
      lens.dataset.on = "true";
      if (!running && !reduced) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      lens.dataset.on = "false";
      first = true;
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
      <div
        ref={lensRef}
        data-on="false"
        className="ps-hero-lens pointer-events-none absolute left-0 top-0"
        style={{ width: SIZE, height: SIZE }}
        aria-hidden="true"
      />
  );
}
