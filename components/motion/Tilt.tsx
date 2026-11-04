"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useMotionTilt } from "@/lib/use-motion-tilt";

/** Membungkus konten agar sedikit miring mengikuti kursor. */
export default function Tilt({
  children,
  className,
  translate = 4,
  rotate = 1.2,
}: {
  children: ReactNode;
  className?: string;
  translate?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, rotateX, rotateY } = useMotionTilt(ref, { translate, rotate });

  return (
    <motion.div
      ref={ref}
      style={{ x, y, rotateX, rotateY, transformPerspective: 900 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
