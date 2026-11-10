"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SPRING = { stiffness: 160, damping: 22, mass: 0.35 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type TiltOptions = {
  /** Geseran maksimum dalam piksel. */
  translate?: number;
  /** Rotasi maksimum dalam derajat. */
  rotate?: number;
  /** "viewport" = kursor di mana pun di layar, "element" = hanya di atas elemen. */
  pointer?: "viewport" | "element";
};

/**
 * Mengubah posisi kursor menjadi nilai gerak (geser piksel + rotasi derajat)
 * yang dihaluskan spring. Hanya aktif untuk pointer presisi.
 */
export function useMotionTilt(
  ref: RefObject<HTMLElement | null>,
  { translate = 4, rotate = 1.2, pointer = "element" }: TiltOptions = {},
) {
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "120px" });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const rotateX = useTransform(y, [-translate, translate], [rotate, -rotate]);
  const rotateY = useTransform(x, [-translate, translate], [-rotate, rotate]);

  const pointerValue = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced || !inView) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const commit = () => {
      rawX.set(clamp(pointerValue.current.x, -1, 1) * translate);
      rawY.set(clamp(pointerValue.current.y, -1, 1) * translate);
    };

    if (!window.matchMedia("(pointer: fine)").matches) return;

    const element = ref.current;
    const resetPointer = () => {
      pointerValue.current = { x: 0, y: 0 };
      commit();
    };

    let cleanup: () => void;

    if (pointer === "viewport" || !element) {
      const onMove = (event: PointerEvent) => {
        pointerValue.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: (event.clientY / window.innerHeight) * 2 - 1,
        };
        commit();
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", resetPointer);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", resetPointer);
      };
    } else {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        pointerValue.current = {
          x: clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
          y: clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1),
        };
        commit();
      };
      element.addEventListener("pointermove", onMove, { passive: true });
      element.addEventListener("pointerleave", resetPointer);
      cleanup = () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", resetPointer);
      };
    }

    return () => {
      cleanup();
      pointerValue.current = { x: 0, y: 0 };
      rawX.set(0);
      rawY.set(0);
    };
  }, [ref, inView, reduced, pointer, translate, rawX, rawY]);

  return { x, y, rotateX, rotateY };
}
