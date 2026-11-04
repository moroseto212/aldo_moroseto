"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

const SPRING = { stiffness: 260, damping: 20, mass: 0.3 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Tombol yang bergeser sedikit ke arah kursor, lalu kembali sendiri. */
export default function Magnetic({
  children,
  strength = 4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      x.set(clamp((offsetX / (rect.width / 2)) * strength, -strength, strength));
      y.set(clamp((offsetY / (rect.height / 2)) * strength, -strength, strength));
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", reset);

    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", reset);
      x.set(0);
      y.set(0);
    };
  }, [reduced, strength, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.span>
  );
}
