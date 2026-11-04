"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { isGyroEnabled, subscribeGyroStore } from "@/lib/gyro";

const SPRING = { stiffness: 160, damping: 22, mass: 0.35 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Sensor HP selalu bergetar sedikit. Nilai di bawah 1.5° dianggap diam,
 * lalu 26° kemiringan = gerakan penuh.
 */
function normalizeSensor(value: number) {
  const magnitude = Math.abs(value) - 1.5;
  if (magnitude <= 0) return 0;
  return Math.sign(value) * clamp(magnitude / 26, 0, 1);
}

type TiltOptions = {
  /** Geseran maksimum dalam piksel. */
  translate?: number;
  /** Rotasi maksimum dalam derajat. */
  rotate?: number;
  /** "viewport" = kursor di mana pun di layar, "element" = hanya di atas elemen. */
  pointer?: "viewport" | "element";
  /** Ikut miringkan elemen saat HP dimiringkan. */
  gyro?: boolean;
};

/**
 * Menggabungkan posisi kursor dan gyro menjadi satu pasang nilai gerak
 * (geser piksel + rotasi derajat) yang sudah dihaluskan spring.
 */
export function useMotionTilt(
  ref: RefObject<HTMLElement | null>,
  { translate = 4, rotate = 1.2, pointer = "element", gyro = false }: TiltOptions = {},
) {
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "120px" });

  const gyroEnabled = useSyncExternalStore(subscribeGyroStore, isGyroEnabled, () => false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const rotateX = useTransform(y, [-translate, translate], [rotate, -rotate]);
  const rotateY = useTransform(x, [-translate, translate], [-rotate, rotate]);

  // Kontribusi tiap sumber disimpan terpisah lalu dijumlahkan.
  const pointerValue = useRef({ x: 0, y: 0 });
  const gyroValue = useRef({ x: 0, y: 0 });
  const baseline = useRef<{ beta: number; gamma: number } | null>(null);

  useEffect(() => {
    if (reduced || !inView) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const commit = () => {
      const totalX = clamp(pointerValue.current.x + gyroValue.current.x, -1, 1);
      const totalY = clamp(pointerValue.current.y + gyroValue.current.y, -1, 1);
      rawX.set(totalX * translate);
      rawY.set(totalY * translate);
    };

    const cleanups: Array<() => void> = [];

    if (window.matchMedia("(pointer: fine)").matches) {
      const element = ref.current;
      const resetPointer = () => {
        pointerValue.current = { x: 0, y: 0 };
        commit();
      };

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
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerleave", resetPointer);
        });
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
        cleanups.push(() => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", resetPointer);
        });
      }
    }

    if (gyro && gyroEnabled && window.DeviceOrientationEvent) {
      baseline.current = null;

      const onOrientation = (event: DeviceOrientationEvent) => {
        if (event.beta === null || event.gamma === null) return;

        // Bacaan pertama jadi titik netral, supaya foto tidak langsung meloncat.
        if (!baseline.current) {
          baseline.current = { beta: event.beta, gamma: event.gamma };
          return;
        }

        gyroValue.current = {
          x: normalizeSensor(event.gamma - baseline.current.gamma),
          y: normalizeSensor(event.beta - baseline.current.beta),
        };
        commit();
      };

      window.addEventListener("deviceorientation", onOrientation);
      cleanups.push(() => {
        window.removeEventListener("deviceorientation", onOrientation);
        baseline.current = null;
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
      gyroValue.current = { x: 0, y: 0 };
      rawX.set(0);
      rawY.set(0);
    };
  }, [ref, inView, reduced, pointer, translate, gyro, gyroEnabled, rawX, rawY]);

  return { x, y, rotateX, rotateY };
}
